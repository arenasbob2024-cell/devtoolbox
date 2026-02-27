'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Nuxt.js Complete Guide 2026: Build Full-Stack Vue Apps with Nuxt 3',
    description: 'Master Nuxt 3 with this comprehensive guide covering file-based routing, server routes, composables, Nitro engine, auto-imports, modules, middleware, layouts, plugins, and deployment strategies.',
    intro: 'Nuxt 3 is a powerful full-stack framework built on Vue 3 and Nitro, offering file-based routing, auto-imports, server-side rendering, and a rich module ecosystem. Whether you are building a content site, a SaaS dashboard, or a full-stack application, Nuxt 3 provides the tools to ship fast with minimal configuration. This guide covers everything from project setup to production deployment.',
    tldr: 'Nuxt 3 is a full-stack Vue framework powered by Nitro. It features file-based routing, auto-imports, built-in SSR/SSG/ISR, composables like useState and useFetch, server routes, middleware, layouts, and a module ecosystem. Deploy to Vercel, Cloudflare Workers, or Node.js with zero config.',
    takeaway1: 'Nuxt 3 uses file-based routing under the pages/ directory with dynamic segments, catch-all routes, and nested layouts',
    takeaway2: 'The Nitro server engine powers server routes, API endpoints, and edge deployment with universal output',
    takeaway3: 'Auto-imports eliminate boilerplate for Vue APIs, composables, and utility functions',
    takeaway4: 'Built-in composables like useFetch, useAsyncData, and useState handle data fetching and state management',
    takeaway5: 'Middleware (route guards), layouts, and plugins provide structured application architecture',
    takeaway6: 'Nuxt modules extend functionality: content, image, auth, SEO, and 200+ community modules',
    takeaway7: 'Deploy with a single command to Vercel, Cloudflare Workers, Netlify, or any Node.js server',
    takeaway8: 'Nuxt 3 supports SSR, SSG, ISR, SPA, and hybrid rendering per route',
    h2GettingStarted: 'Getting Started with Nuxt 3',
    gettingStartedDesc: 'Creating a new Nuxt 3 project takes a single command. The CLI scaffolds a minimal project with TypeScript support, dev server, and hot module replacement configured out of the box.',
    h2ProjectStructure: 'Project Structure',
    projectStructureDesc: 'Nuxt uses a convention-based directory structure. Each directory has a specific purpose and Nuxt auto-discovers files placed in them.',
    h2FileRouting: 'File-Based Routing',
    fileRoutingDesc: 'Nuxt generates routes automatically from Vue files in the pages/ directory. The file path maps directly to the URL path, with support for dynamic parameters, catch-all routes, and nested routing.',
    h3DynamicRoutes: 'Dynamic Routes',
    dynamicRoutesDesc: 'Dynamic segments are defined with square brackets in the filename. The parameter is available via the useRoute composable.',
    h3CatchAll: 'Catch-All and Optional Parameters',
    catchAllDesc: 'Use the spread syntax for catch-all routes and question mark for optional parameters.',
    h3NestedRoutes: 'Nested Routes',
    nestedRoutesDesc: 'Create nested layouts by placing a Vue file and a matching directory side by side. The parent file uses NuxtPage to render child routes.',
    h2ServerRoutes: 'Server Routes and API Endpoints',
    serverRoutesDesc: 'Nuxt 3 includes a built-in server powered by Nitro. Define API endpoints by creating files in the server/ directory. Server routes have access to the H3 event object for request handling.',
    h3DefiningAPI: 'Defining API Endpoints',
    definingAPIDesc: 'Create files in server/api/ or server/routes/ to define endpoints. The file name becomes the route path.',
    h3ServerMiddleware: 'Server Middleware',
    serverMiddlewareDesc: 'Server middleware runs on every request before routes are matched. Use it for authentication, logging, or CORS headers.',
    h3DatabaseAccess: 'Database Access in Server Routes',
    databaseAccessDesc: 'Server routes run in a Node.js-compatible environment, giving you access to databases, file systems, and any server-side library.',
    h2Composables: 'Built-In Composables',
    composablesDesc: 'Nuxt provides composables for common tasks like data fetching, state management, and navigation. These are auto-imported and SSR-friendly.',
    h3UseFetch: 'useFetch',
    useFetchDesc: 'The primary composable for data fetching. It handles SSR hydration, caching, and provides reactive data, error, and pending states.',
    h3UseAsyncData: 'useAsyncData',
    useAsyncDataDesc: 'For custom async operations that are not simple HTTP requests. It wraps any async function with SSR hydration support.',
    h3UseState: 'useState',
    useStateDesc: 'A shared, SSR-friendly reactive state composable. Unlike Vue ref, useState is serialized during SSR and shared across components.',
    h3UseHead: 'useHead and useSeoMeta',
    useHeadDesc: 'Manage document head metadata reactively. useSeoMeta provides type-safe SEO meta tag management.',
    h2Nitro: 'Nitro Server Engine',
    nitroDesc: 'Nitro is the server engine that powers Nuxt 3. It provides a universal runtime that works across Node.js, Cloudflare Workers, Deno, Bun, and more. Nitro handles server routes, caching, storage, and output bundling.',
    h3NitroFeatures: 'Key Nitro Features',
    nitroFeaturesDesc: 'Nitro offers hot module replacement for server routes, automatic API route generation, built-in caching with defineCachedEventHandler, storage layer with useStorage, and cross-platform deployment presets.',
    h3CachedRoutes: 'Cached Server Routes',
    cachedRoutesDesc: 'Use defineCachedEventHandler to cache server route responses. This is useful for expensive database queries or external API calls.',
    h3Storage: 'Nitro Storage Layer',
    storageDesc: 'Nitro provides a universal storage layer that works across different drivers: memory, filesystem, Redis, Cloudflare KV, and more.',
    h2AutoImports: 'Auto-Imports',
    autoImportsDesc: 'Nuxt automatically imports Vue APIs, composables, and utility functions. You never need to manually import ref, computed, useFetch, or navigateTo. This applies to your own composables in the composables/ directory as well.',
    h3CustomComposables: 'Custom Composables',
    customComposablesDesc: 'Create composables in the composables/ directory and they are automatically available throughout your application.',
    h2Modules: 'Nuxt Modules',
    modulesDesc: 'Modules extend Nuxt functionality with a plugin system. The Nuxt ecosystem includes over 200 modules for content management, authentication, image optimization, SEO, analytics, and more.',
    h3PopularModules: 'Popular Modules',
    h3InstallingModules: 'Installing Modules',
    installingModulesDesc: 'Install a module from npm and add it to the modules array in nuxt.config.ts.',
    h2Middleware: 'Route Middleware',
    middlewareDesc: 'Middleware are navigation guards that run before rendering a page. Nuxt supports three types: anonymous (inline), named (in middleware/ directory), and global (with .global suffix).',
    h3NamedMiddleware: 'Named Middleware',
    namedMiddlewareDesc: 'Create middleware files in the middleware/ directory and reference them in page components with definePageMeta.',
    h3GlobalMiddleware: 'Global Middleware',
    globalMiddlewareDesc: 'Files with the .global suffix in middleware/ run on every route navigation automatically.',
    h2Layouts: 'Layouts',
    layoutsDesc: 'Layouts are wrapper components that surround pages. They are useful for shared UI elements like headers, sidebars, and footers. Define layouts in the layouts/ directory.',
    h3CustomLayouts: 'Custom Layouts',
    customLayoutsDesc: 'Create multiple layouts for different sections of your application. Pages opt into a layout using definePageMeta.',
    h2Plugins: 'Plugins',
    pluginsDesc: 'Plugins run on application initialization and have access to the Nuxt app instance. Use them to register global components, directives, or third-party libraries.',
    h3CreatingPlugins: 'Creating Plugins',
    creatingPluginsDesc: 'Create files in the plugins/ directory. They are auto-registered and run before rendering the root component.',
    h2Rendering: 'Rendering Modes',
    renderingDesc: 'Nuxt 3 supports multiple rendering strategies that can be configured globally or per route.',
    h3SSR: 'Server-Side Rendering (SSR)',
    ssrDesc: 'The default mode. Pages are rendered on the server for each request, providing fast first contentful paint and SEO benefits.',
    h3SSG: 'Static Site Generation (SSG)',
    ssgDesc: 'Pre-render all pages at build time. Ideal for content sites, documentation, and marketing pages.',
    h3Hybrid: 'Hybrid Rendering',
    hybridDesc: 'Configure different rendering strategies per route using route rules in nuxt.config.ts.',
    h2Deployment: 'Deployment',
    deploymentDesc: 'Nuxt 3 deploys to many platforms with zero-config presets. Nitro detects the deployment platform and optimizes the output automatically.',
    h3Vercel: 'Deploying to Vercel',
    vercelDesc: 'Vercel has first-class Nuxt support. Push to Git and Vercel auto-detects and deploys.',
    h3Cloudflare: 'Deploying to Cloudflare Workers',
    cloudflareDesc: 'Nuxt runs on Cloudflare Workers at the edge for ultra-low latency globally.',
    h3Node: 'Node.js Server',
    nodeDesc: 'Deploy to any Node.js server with PM2, Docker, or a cloud VM.',
    h2Comparison: 'Nuxt vs Next.js',
    comparisonDesc: 'Nuxt and Next.js are the leading meta-frameworks for Vue and React respectively. Here is how they compare.',
    thFeature: 'Feature',
    thNuxt: 'Nuxt 3',
    thNext: 'Next.js 15',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is the difference between Nuxt 2 and Nuxt 3?',
    faq1A: 'Nuxt 3 is a complete rewrite built on Vue 3, Vite, and Nitro. It offers significantly better performance, TypeScript support, auto-imports, the Composition API, hybrid rendering, and a new server engine. Nuxt 2 was built on Vue 2 and webpack.',
    faq2Q: 'Is Nuxt 3 ready for production?',
    faq2A: 'Yes. Nuxt 3 reached stable release in November 2022 and is actively maintained. Major companies use Nuxt 3 in production. The ecosystem has matured with most essential modules ported to Nuxt 3.',
    faq3Q: 'Should I use Nuxt or plain Vue for my project?',
    faq3A: 'Use Nuxt if you need SEO, server-side rendering, file-based routing, or a full-stack framework. Use plain Vue with Vite for client-side SPAs, widgets, or when you want full control over the build configuration.',
    faq4Q: 'How does useFetch differ from useAsyncData?',
    faq4A: 'useFetch is a convenience wrapper around useAsyncData that automatically handles URL-based data fetching with caching. useAsyncData is more flexible and works with any async function, not just HTTP requests. Use useFetch for API calls and useAsyncData for custom async operations.',
    faq5Q: 'Can I use Nuxt for static sites?',
    faq5A: 'Yes. Run npx nuxi generate to pre-render all pages as static HTML files. Nuxt also supports hybrid rendering where some routes are static and others are server-rendered.',
    faq6Q: 'How does auto-import work in Nuxt 3?',
    faq6A: 'Nuxt scans the composables/, components/, and utils/ directories and automatically imports their exports. Vue APIs like ref, computed, and watch are also auto-imported. This is done at build time via code transformation, so there is no runtime overhead.',
    faq7Q: 'What is Nitro and why does it matter?',
    faq7A: 'Nitro is the server engine powering Nuxt 3. It provides a universal runtime that can deploy to Node.js, Cloudflare Workers, Deno, Netlify Functions, and more. Nitro handles server routes, caching, storage, and output optimization for each deployment target.',
    faq8Q: 'How do I add authentication to a Nuxt app?',
    faq8A: 'Use the nuxt-auth-utils module for session-based auth, or sidebase-auth for OAuth providers. You can also implement custom auth using server middleware, useState for session state, and server routes for login and registration endpoints.',
  },
  zh: {
    title: 'Nuxt.js 完整指南 2026：使用 Nuxt 3 构建全栈 Vue 应用',
    description: '掌握 Nuxt 3 的完整指南，涵盖文件路由、服务器路由、组合式函数、Nitro 引擎、自动导入、模块、中间件、布局、插件和部署策略。',
    intro: 'Nuxt 3 是一个构建在 Vue 3 和 Nitro 之上的强大全栈框架，提供基于文件的路由、自动导入、服务端渲染和丰富的模块生态系统。无论你是构建内容站点、SaaS 仪表板还是全栈应用，Nuxt 3 都能让你以最少的配置快速交付。',
    tldr: 'Nuxt 3 是由 Nitro 驱动的全栈 Vue 框架。它具有文件路由、自动导入、内置 SSR/SSG/ISR、useState 和 useFetch 等组合式函数、服务器路由、中间件、布局和模块生态系统。可零配置部署到 Vercel、Cloudflare Workers 或 Node.js。',
    takeaway1: 'Nuxt 3 使用 pages/ 目录下的文件路由，支持动态参数、通配路由和嵌套布局',
    takeaway2: 'Nitro 服务器引擎为服务器路由、API 端点和边缘部署提供通用输出',
    takeaway3: '自动导入消除了 Vue API、组合式函数和工具函数的样板代码',
    takeaway4: '内置的 useFetch、useAsyncData 和 useState 处理数据获取和状态管理',
    takeaway5: '中间件（路由守卫）、布局和插件提供结构化的应用架构',
    takeaway6: 'Nuxt 模块扩展功能：内容、图片、认证、SEO 等 200 多个社区模块',
    takeaway7: '一条命令部署到 Vercel、Cloudflare Workers、Netlify 或任何 Node.js 服务器',
    takeaway8: 'Nuxt 3 支持 SSR、SSG、ISR、SPA 和按路由混合渲染',
    h2GettingStarted: 'Nuxt 3 入门',
    gettingStartedDesc: '创建新的 Nuxt 3 项目只需一条命令。CLI 会生成一个带有 TypeScript 支持、开发服务器和热模块替换的最小项目。',
    h2ProjectStructure: '项目结构',
    projectStructureDesc: 'Nuxt 使用基于约定的目录结构。每个目录都有特定的用途，Nuxt 会自动发现其中的文件。',
    h2FileRouting: '基于文件的路由',
    fileRoutingDesc: 'Nuxt 根据 pages/ 目录中的 Vue 文件自动生成路由。文件路径直接映射到 URL 路径，支持动态参数、通配路由和嵌套路由。',
    h3DynamicRoutes: '动态路由',
    dynamicRoutesDesc: '使用方括号定义文件名中的动态段。参数可通过 useRoute 组合式函数获取。',
    h3CatchAll: '通配路由和可选参数',
    catchAllDesc: '使用展开语法实现通配路由，使用问号标记可选参数。',
    h3NestedRoutes: '嵌套路由',
    nestedRoutesDesc: '将 Vue 文件和匹配的目录并排放置来创建嵌套布局。父文件使用 NuxtPage 渲染子路由。',
    h2ServerRoutes: '服务器路由和 API 端点',
    serverRoutesDesc: 'Nuxt 3 包含由 Nitro 驱动的内置服务器。在 server/ 目录中创建文件来定义 API 端点。',
    h3DefiningAPI: '定义 API 端点',
    definingAPIDesc: '在 server/api/ 或 server/routes/ 中创建文件来定义端点。文件名成为路由路径。',
    h3ServerMiddleware: '服务器中间件',
    serverMiddlewareDesc: '服务器中间件在路由匹配之前运行。用于认证、日志记录或 CORS 头。',
    h3DatabaseAccess: '服务器路由中的数据库访问',
    databaseAccessDesc: '服务器路由在 Node.js 兼容环境中运行，可以访问数据库、文件系统和任何服务端库。',
    h2Composables: '内置组合式函数',
    composablesDesc: 'Nuxt 为数据获取、状态管理和导航等常见任务提供组合式函数。它们是自动导入的且支持 SSR。',
    h3UseFetch: 'useFetch',
    useFetchDesc: '数据获取的主要组合式函数。它处理 SSR 水合、缓存，并提供响应式的 data、error 和 pending 状态。',
    h3UseAsyncData: 'useAsyncData',
    useAsyncDataDesc: '用于非简单 HTTP 请求的自定义异步操作。它用 SSR 水合支持包装任何异步函数。',
    h3UseState: 'useState',
    useStateDesc: '共享的、支持 SSR 的响应式状态组合式函数。与 Vue ref 不同，useState 在 SSR 期间序列化并在组件间共享。',
    h3UseHead: 'useHead 和 useSeoMeta',
    useHeadDesc: '响应式管理文档头部元数据。useSeoMeta 提供类型安全的 SEO 元标签管理。',
    h2Nitro: 'Nitro 服务器引擎',
    nitroDesc: 'Nitro 是驱动 Nuxt 3 的服务器引擎。它提供跨 Node.js、Cloudflare Workers、Deno、Bun 等平台的通用运行时。',
    h3NitroFeatures: 'Nitro 核心特性',
    nitroFeaturesDesc: 'Nitro 提供服务器路由热更新、自动 API 路由生成、内置缓存、存储层和跨平台部署预设。',
    h3CachedRoutes: '缓存的服务器路由',
    cachedRoutesDesc: '使用 defineCachedEventHandler 缓存服务器路由响应。适用于昂贵的数据库查询或外部 API 调用。',
    h3Storage: 'Nitro 存储层',
    storageDesc: 'Nitro 提供通用存储层，支持多种驱动：内存、文件系统、Redis、Cloudflare KV 等。',
    h2AutoImports: '自动导入',
    autoImportsDesc: 'Nuxt 自动导入 Vue API、组合式函数和工具函数。你不需要手动导入 ref、computed、useFetch 或 navigateTo。',
    h3CustomComposables: '自定义组合式函数',
    customComposablesDesc: '在 composables/ 目录中创建组合式函数，它们会自动在整个应用中可用。',
    h2Modules: 'Nuxt 模块',
    modulesDesc: '模块通过插件系统扩展 Nuxt 功能。Nuxt 生态系统包含 200 多个模块。',
    h3PopularModules: '常用模块',
    h3InstallingModules: '安装模块',
    installingModulesDesc: '从 npm 安装模块并添加到 nuxt.config.ts 的 modules 数组中。',
    h2Middleware: '路由中间件',
    middlewareDesc: '中间件是渲染页面前运行的导航守卫。Nuxt 支持三种类型：匿名、命名和全局中间件。',
    h3NamedMiddleware: '命名中间件',
    namedMiddlewareDesc: '在 middleware/ 目录中创建中间件文件，在页面组件中通过 definePageMeta 引用。',
    h3GlobalMiddleware: '全局中间件',
    globalMiddlewareDesc: 'middleware/ 中带 .global 后缀的文件会在每次路由导航时自动运行。',
    h2Layouts: '布局',
    layoutsDesc: '布局是包裹页面的组件。用于共享 UI 元素如页头、侧边栏和页脚。在 layouts/ 目录中定义。',
    h3CustomLayouts: '自定义布局',
    customLayoutsDesc: '为应用的不同部分创建多个布局。页面通过 definePageMeta 选择布局。',
    h2Plugins: '插件',
    pluginsDesc: '插件在应用初始化时运行，可以访问 Nuxt 应用实例。用于注册全局组件、指令或第三方库。',
    h3CreatingPlugins: '创建插件',
    creatingPluginsDesc: '在 plugins/ 目录中创建文件。它们会自动注册并在渲染根组件之前运行。',
    h2Rendering: '渲染模式',
    renderingDesc: 'Nuxt 3 支持多种渲染策略，可以全局配置或按路由配置。',
    h3SSR: '服务端渲染 (SSR)',
    ssrDesc: '默认模式。页面在服务器上为每个请求渲染，提供快速的首次内容绘制和 SEO 优势。',
    h3SSG: '静态站点生成 (SSG)',
    ssgDesc: '在构建时预渲染所有页面为静态 HTML。适合内容站点、文档和营销页面。',
    h3Hybrid: '混合渲染',
    hybridDesc: '使用 nuxt.config.ts 中的路由规则为每个路由配置不同的渲染策略。',
    h2Deployment: '部署',
    deploymentDesc: 'Nuxt 3 通过零配置预设部署到多个平台。Nitro 自动检测部署平台并优化输出。',
    h3Vercel: '部署到 Vercel',
    vercelDesc: 'Vercel 原生支持 Nuxt。推送到 Git 即可自动检测和部署。',
    h3Cloudflare: '部署到 Cloudflare Workers',
    cloudflareDesc: 'Nuxt 可在 Cloudflare Workers 边缘运行，实现全球超低延迟。',
    h3Node: 'Node.js 服务器',
    nodeDesc: '使用 PM2、Docker 或云 VM 部署到任何 Node.js 服务器。',
    h2Comparison: 'Nuxt vs Next.js',
    comparisonDesc: 'Nuxt 和 Next.js 分别是 Vue 和 React 的主流元框架。以下是它们的对比。',
    thFeature: '功能',
    thNuxt: 'Nuxt 3',
    thNext: 'Next.js 15',
    h2Faq: '常见问题',
    faq1Q: 'Nuxt 2 和 Nuxt 3 有什么区别？',
    faq1A: 'Nuxt 3 是基于 Vue 3、Vite 和 Nitro 的完全重写。性能更好，支持 TypeScript、自动导入、组合式 API、混合渲染和新的服务器引擎。',
    faq2Q: 'Nuxt 3 可以用于生产环境吗？',
    faq2A: '可以。Nuxt 3 于 2022 年 11 月发布稳定版，积极维护中。许多大公司在生产环境使用 Nuxt 3。',
    faq3Q: '我的项目应该用 Nuxt 还是普通 Vue？',
    faq3A: '如果需要 SEO、服务端渲染、文件路由或全栈框架，使用 Nuxt。客户端 SPA 或需要完全控制构建配置时使用普通 Vue。',
    faq4Q: 'useFetch 和 useAsyncData 有什么区别？',
    faq4A: 'useFetch 是 useAsyncData 的便捷封装，自动处理基于 URL 的数据获取和缓存。useAsyncData 更灵活，可用于任何异步函数。',
    faq5Q: 'Nuxt 可以用于静态站点吗？',
    faq5A: '可以。运行 npx nuxi generate 将所有页面预渲染为静态 HTML。也支持混合渲染。',
    faq6Q: 'Nuxt 3 的自动导入如何工作？',
    faq6A: 'Nuxt 扫描 composables/、components/ 和 utils/ 目录并自动导入其导出。Vue API 也自动导入。这在构建时通过代码转换完成，无运行时开销。',
    faq7Q: 'Nitro 是什么？为什么重要？',
    faq7A: 'Nitro 是驱动 Nuxt 3 的服务器引擎。它提供可部署到 Node.js、Cloudflare Workers、Deno 等的通用运行时，处理服务器路由、缓存和存储。',
    faq8Q: '如何给 Nuxt 应用添加认证？',
    faq8A: '使用 nuxt-auth-utils 模块实现会话认证，或 sidebase-auth 实现 OAuth。也可以使用服务器中间件和 useState 自定义实现。',
  },
};

export default function NuxtGuide({ lang }: { lang: string }) {
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
  const subTitle: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' };
  const para: React.CSSProperties = { marginBottom: '1rem', lineHeight: '1.7' };
  const codeBlock: React.CSSProperties = { backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' };
  const thStyle: React.CSSProperties = { backgroundColor: '#f1f5f9', padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600 };
  const tdStyle: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0' };
  const listStyle: React.CSSProperties = { marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.8' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong>TL;DR:</strong> {t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Key Takeaways</h3>
        <ul style={listStyle}>
          <li>{t.takeaway1}</li>
          <li>{t.takeaway2}</li>
          <li>{t.takeaway3}</li>
          <li>{t.takeaway4}</li>
          <li>{t.takeaway5}</li>
          <li>{t.takeaway6}</li>
          <li>{t.takeaway7}</li>
          <li>{t.takeaway8}</li>
        </ul>
      </div>

      {/* Getting Started */}
      <h2 style={sectionTitle}>{t.h2GettingStarted}</h2>
      <p style={para}>{t.gettingStartedDesc}</p>
      <pre style={codeBlock}><code>{'# Create a new Nuxt 3 project\n' +
        'npx nuxi@latest init my-nuxt-app\n' +
        '\n' +
        '# Navigate into the project\n' +
        'cd my-nuxt-app\n' +
        '\n' +
        '# Install dependencies\n' +
        'npm install\n' +
        '\n' +
        '# Start development server (http://localhost:3000)\n' +
        'npm run dev\n' +
        '\n' +
        '# Build for production\n' +
        'npm run build\n' +
        '\n' +
        '# Preview production build\n' +
        'npm run preview'}</code></pre>

      {/* Project Structure */}
      <h2 style={sectionTitle}>{t.h2ProjectStructure}</h2>
      <p style={para}>{t.projectStructureDesc}</p>
      <pre style={codeBlock}><code>{'my-nuxt-app/\n' +
        '  nuxt.config.ts          # Nuxt configuration\n' +
        '  app.vue                  # Root component\n' +
        '  pages/                   # File-based routing\n' +
        '    index.vue              # / route\n' +
        '    about.vue              # /about route\n' +
        '    blog/\n' +
        '      index.vue            # /blog route\n' +
        '      [slug].vue           # /blog/:slug route\n' +
        '  components/              # Auto-imported components\n' +
        '    AppHeader.vue\n' +
        '    AppFooter.vue\n' +
        '  composables/             # Auto-imported composables\n' +
        '    useAuth.ts\n' +
        '    useApi.ts\n' +
        '  layouts/                 # Page layouts\n' +
        '    default.vue\n' +
        '    admin.vue\n' +
        '  middleware/              # Route middleware\n' +
        '    auth.ts\n' +
        '  plugins/                 # App plugins\n' +
        '    analytics.ts\n' +
        '  server/                  # Server routes (Nitro)\n' +
        '    api/\n' +
        '      users.get.ts         # GET /api/users\n' +
        '      users.post.ts        # POST /api/users\n' +
        '    middleware/\n' +
        '      log.ts\n' +
        '  public/                  # Static assets\n' +
        '  assets/                  # Build-processed assets'}</code></pre>

      {/* File-Based Routing */}
      <h2 style={sectionTitle}>{t.h2FileRouting}</h2>
      <p style={para}>{t.fileRoutingDesc}</p>
      <pre style={codeBlock}><code>{'<!-- pages/index.vue -->\n' +
        '<template>\n' +
        '  <div>\n' +
        '    <h1>Welcome to Nuxt 3</h1>\n' +
        '    <NuxtLink to="/about">About</NuxtLink>\n' +
        '    <NuxtLink to="/blog">Blog</NuxtLink>\n' +
        '  </div>\n' +
        '</template>'}</code></pre>

      <h3 style={subTitle}>{t.h3DynamicRoutes}</h3>
      <p style={para}>{t.dynamicRoutesDesc}</p>
      <pre style={codeBlock}><code>{'<!-- pages/blog/[slug].vue -->\n' +
        '<script setup lang="ts">\n' +
        '// Access the dynamic route parameter\n' +
        'const route = useRoute()\n' +
        'const slug = route.params.slug\n' +
        '\n' +
        '// Fetch blog post data\n' +
        'const { data: post } = await useFetch(\n' +
        '  `/api/blog/\\${slug}`\n' +
        ')\n' +
        '</script>\n' +
        '\n' +
        '<template>\n' +
        '  <article v-if="post">\n' +
        '    <h1>{{ post.title }}</h1>\n' +
        '    <div v-html="post.content" />\n' +
        '  </article>\n' +
        '</template>'}</code></pre>

      <h3 style={subTitle}>{t.h3CatchAll}</h3>
      <p style={para}>{t.catchAllDesc}</p>
      <pre style={codeBlock}><code>{'# Catch-all route: matches /docs/a, /docs/a/b, /docs/a/b/c\n' +
        'pages/docs/[...slug].vue\n' +
        '\n' +
        '# Optional parameter: matches /users and /users/123\n' +
        'pages/users/[[id]].vue\n' +
        '\n' +
        '# Route mapping examples:\n' +
        '# pages/index.vue            -> /\n' +
        '# pages/about.vue            -> /about\n' +
        '# pages/blog/index.vue       -> /blog\n' +
        '# pages/blog/[slug].vue      -> /blog/:slug\n' +
        '# pages/blog/[...slug].vue   -> /blog/*\n' +
        '# pages/users-[group]/[id].vue -> /users-:group/:id'}</code></pre>

      <h3 style={subTitle}>{t.h3NestedRoutes}</h3>
      <p style={para}>{t.nestedRoutesDesc}</p>
      <pre style={codeBlock}><code>{'<!-- pages/dashboard.vue (parent layout) -->\n' +
        '<template>\n' +
        '  <div>\n' +
        '    <nav>\n' +
        '      <NuxtLink to="/dashboard">Overview</NuxtLink>\n' +
        '      <NuxtLink to="/dashboard/analytics">Analytics</NuxtLink>\n' +
        '      <NuxtLink to="/dashboard/settings">Settings</NuxtLink>\n' +
        '    </nav>\n' +
        '    <!-- Child routes render here -->\n' +
        '    <NuxtPage />\n' +
        '  </div>\n' +
        '</template>\n' +
        '\n' +
        '<!-- pages/dashboard/index.vue -->\n' +
        '<template>\n' +
        '  <div>Dashboard Overview</div>\n' +
        '</template>\n' +
        '\n' +
        '<!-- pages/dashboard/analytics.vue -->\n' +
        '<template>\n' +
        '  <div>Analytics Page</div>\n' +
        '</template>'}</code></pre>

      {/* Server Routes */}
      <h2 style={sectionTitle}>{t.h2ServerRoutes}</h2>
      <p style={para}>{t.serverRoutesDesc}</p>

      <h3 style={subTitle}>{t.h3DefiningAPI}</h3>
      <p style={para}>{t.definingAPIDesc}</p>
      <pre style={codeBlock}><code>{'// server/api/users.get.ts\n' +
        'export default defineEventHandler(async (event) => {\n' +
        '  const query = getQuery(event)\n' +
        '  const page = Number(query.page) || 1\n' +
        '  return {\n' +
        '    users: await fetchUsersFromDB(page),\n' +
        '    total: await countUsers(),\n' +
        '  }\n' +
        '})\n' +
        '\n' +
        '// server/api/users.post.ts\n' +
        'export default defineEventHandler(async (event) => {\n' +
        '  const body = await readBody(event)\n' +
        '  if (!body.email || !body.name) {\n' +
        '    throw createError({\n' +
        '      statusCode: 400,\n' +
        '      statusMessage: "Name and email are required",\n' +
        '    })\n' +
        '  }\n' +
        '  return { user: await createUser(body) }\n' +
        '})\n' +
        '\n' +
        '// server/api/users/[id].get.ts\n' +
        'export default defineEventHandler(async (event) => {\n' +
        '  const id = getRouterParam(event, "id")\n' +
        '  const user = await getUserById(id)\n' +
        '  if (!user) {\n' +
        '    throw createError({ statusCode: 404, statusMessage: "User not found" })\n' +
        '  }\n' +
        '  return { user }\n' +
        '})'}</code></pre>

      <h3 style={subTitle}>{t.h3ServerMiddleware}</h3>
      <p style={para}>{t.serverMiddlewareDesc}</p>
      <pre style={codeBlock}><code>{'// server/middleware/auth.ts\n' +
        'export default defineEventHandler((event) => {\n' +
        '  const token = getHeader(event, "authorization")\n' +
        '\n' +
        '  // Skip auth for public routes\n' +
        '  if (event.path.startsWith("/api/public")) return\n' +
        '\n' +
        '  if (!token) {\n' +
        '    throw createError({\n' +
        '      statusCode: 401,\n' +
        '      statusMessage: "Unauthorized",\n' +
        '    })\n' +
        '  }\n' +
        '\n' +
        '  // Attach user info to the event context\n' +
        '  event.context.user = verifyToken(token)\n' +
        '})\n' +
        '\n' +
        '// server/middleware/logger.ts\n' +
        'export default defineEventHandler((event) => {\n' +
        '  console.log(\n' +
        '    `[\\${new Date().toISOString()}] \\${event.method} \\${event.path}`\n' +
        '  )\n' +
        '})'}</code></pre>

      <h3 style={subTitle}>{t.h3DatabaseAccess}</h3>
      <p style={para}>{t.databaseAccessDesc}</p>
      <pre style={codeBlock}><code>{'// server/utils/db.ts\n' +
        'import { drizzle } from "drizzle-orm/node-postgres"\n' +
        'import { Pool } from "pg"\n' +
        '\n' +
        'const pool = new Pool({\n' +
        '  connectionString: process.env.DATABASE_URL,\n' +
        '})\n' +
        '\n' +
        'export const db = drizzle(pool)\n' +
        '\n' +
        '// server/api/posts.get.ts\n' +
        'import { db } from "~~/server/utils/db"\n' +
        'import { posts } from "~~/server/db/schema"\n' +
        '\n' +
        'export default defineEventHandler(async () => {\n' +
        '  return await db.select().from(posts).orderBy(posts.createdAt)\n' +
        '})'}</code></pre>

      {/* Composables */}
      <h2 style={sectionTitle}>{t.h2Composables}</h2>
      <p style={para}>{t.composablesDesc}</p>

      <h3 style={subTitle}>{t.h3UseFetch}</h3>
      <p style={para}>{t.useFetchDesc}</p>
      <pre style={codeBlock}><code>{'<script setup lang="ts">\n' +
        '// Basic usage - returns reactive data, pending, error, refresh\n' +
        'const { data, pending, error, refresh } = await useFetch("/api/posts")\n' +
        '\n' +
        '// With options: query params, transform, caching\n' +
        'const { data: users } = await useFetch("/api/users", {\n' +
        '  query: { page: 1, limit: 20 },\n' +
        '  transform: (response) => response.users,\n' +
        '  key: "users-page-1",\n' +
        '})\n' +
        '\n' +
        '// Lazy fetch (non-blocking, loads after navigation)\n' +
        'const { data: comments } = useLazyFetch("/api/comments")\n' +
        '\n' +
        '// Watch reactive source and refetch automatically\n' +
        'const page = ref(1)\n' +
        'const { data: items } = await useFetch("/api/items", {\n' +
        '  query: { page },\n' +
        '  watch: [page],\n' +
        '})\n' +
        '</script>\n' +
        '\n' +
        '<template>\n' +
        '  <div v-if="pending">Loading...</div>\n' +
        '  <div v-else-if="error">Error: {{ error.message }}</div>\n' +
        '  <ul v-else>\n' +
        '    <li v-for="post in data" :key="post.id">{{ post.title }}</li>\n' +
        '  </ul>\n' +
        '</template>'}</code></pre>

      <h3 style={subTitle}>{t.h3UseAsyncData}</h3>
      <p style={para}>{t.useAsyncDataDesc}</p>
      <pre style={codeBlock}><code>{'<script setup lang="ts">\n' +
        '// Fetch from an external service\n' +
        'const { data: weather } = await useAsyncData(\n' +
        '  "weather",  // unique key for caching\n' +
        '  () => $fetch("https://api.weather.com/current", {\n' +
        '    params: { city: "london" }\n' +
        '  })\n' +
        ')\n' +
        '\n' +
        '// Combine multiple async operations\n' +
        'const { data: dashboard } = await useAsyncData(\n' +
        '  "dashboard",\n' +
        '  async () => {\n' +
        '    const [users, orders, revenue] = await Promise.all([\n' +
        '      $fetch("/api/users/count"),\n' +
        '      $fetch("/api/orders/recent"),\n' +
        '      $fetch("/api/revenue/monthly"),\n' +
        '    ])\n' +
        '    return { users, orders, revenue }\n' +
        '  }\n' +
        ')\n' +
        '</script>'}</code></pre>

      <h3 style={subTitle}>{t.h3UseState}</h3>
      <p style={para}>{t.useStateDesc}</p>
      <pre style={codeBlock}><code>{'// composables/useCounter.ts\n' +
        'export const useCounter = () => {\n' +
        '  const count = useState("counter", () => 0)\n' +
        '  const increment = () => count.value++\n' +
        '  const decrement = () => count.value--\n' +
        '  return { count, increment, decrement }\n' +
        '}\n' +
        '\n' +
        '// composables/useAuth.ts\n' +
        'export const useAuth = () => {\n' +
        '  const user = useState("auth-user", () => null)\n' +
        '  const isLoggedIn = computed(() => !!user.value)\n' +
        '\n' +
        '  const login = async (email: string, password: string) => {\n' +
        '    const data = await $fetch("/api/auth/login", {\n' +
        '      method: "POST", body: { email, password },\n' +
        '    })\n' +
        '    user.value = data.user\n' +
        '  }\n' +
        '\n' +
        '  const logout = () => {\n' +
        '    user.value = null\n' +
        '    navigateTo("/login")\n' +
        '  }\n' +
        '  return { user, isLoggedIn, login, logout }\n' +
        '}'}</code></pre>

      <h3 style={subTitle}>{t.h3UseHead}</h3>
      <p style={para}>{t.useHeadDesc}</p>
      <pre style={codeBlock}><code>{'<script setup lang="ts">\n' +
        '// Basic head management\n' +
        'useHead({\n' +
        '  title: "My Page Title",\n' +
        '  meta: [\n' +
        '    { name: "description", content: "Page description here" },\n' +
        '  ],\n' +
        '  link: [\n' +
        '    { rel: "canonical", href: "https://example.com/page" },\n' +
        '  ],\n' +
        '})\n' +
        '\n' +
        '// Type-safe SEO meta tags\n' +
        'useSeoMeta({\n' +
        '  title: "Nuxt 3 Guide",\n' +
        '  ogTitle: "Nuxt 3 Guide",\n' +
        '  description: "Complete guide to building with Nuxt 3",\n' +
        '  ogDescription: "Complete guide to building with Nuxt 3",\n' +
        '  ogImage: "https://example.com/og.png",\n' +
        '  twitterCard: "summary_large_image",\n' +
        '})\n' +
        '</script>'}</code></pre>

      {/* Nitro */}
      <h2 style={sectionTitle}>{t.h2Nitro}</h2>
      <p style={para}>{t.nitroDesc}</p>

      <h3 style={subTitle}>{t.h3NitroFeatures}</h3>
      <p style={para}>{t.nitroFeaturesDesc}</p>

      <h3 style={subTitle}>{t.h3CachedRoutes}</h3>
      <p style={para}>{t.cachedRoutesDesc}</p>
      <pre style={codeBlock}><code>{'// server/api/popular-posts.get.ts\n' +
        'export default defineCachedEventHandler(\n' +
        '  async () => {\n' +
        '    const posts = await db.select().from(postsTable)\n' +
        '      .orderBy(desc(postsTable.views)).limit(20)\n' +
        '    return { posts }\n' +
        '  },\n' +
        '  { maxAge: 60 * 10, name: "popular-posts" }\n' +
        ')'}</code></pre>

      <h3 style={subTitle}>{t.h3Storage}</h3>
      <p style={para}>{t.storageDesc}</p>
      <pre style={codeBlock}><code>{'// nuxt.config.ts - configure storage\n' +
        'export default defineNuxtConfig({\n' +
        '  nitro: {\n' +
        '    storage: {\n' +
        '      redis: { driver: "redis", host: "localhost", port: 6379 },\n' +
        '      fs: { driver: "fs", base: "./data" },\n' +
        '    },\n' +
        '  },\n' +
        '})\n' +
        '\n' +
        '// server/api/cache.ts - use storage\n' +
        'export default defineEventHandler(async () => {\n' +
        '  const storage = useStorage("redis")\n' +
        '  await storage.setItem("user:123", { name: "Alice", role: "admin" })\n' +
        '  const user = await storage.getItem("user:123")\n' +
        '  const keys = await storage.getKeys("user:")\n' +
        '  return { user, keys }\n' +
        '})'}</code></pre>

      {/* Auto-Imports */}
      <h2 style={sectionTitle}>{t.h2AutoImports}</h2>
      <p style={para}>{t.autoImportsDesc}</p>
      <pre style={codeBlock}><code>{'<script setup lang="ts">\n' +
        '// All auto-imported - no import statements needed!\n' +
        'const count = ref(0)                          // Vue API\n' +
        'const doubled = computed(() => count.value * 2)\n' +
        'watch(count, (val) => console.log("Count:", val))\n' +
        '\n' +
        'const route = useRoute()                      // Nuxt composables\n' +
        'const config = useRuntimeConfig()\n' +
        'const { data } = await useFetch("/api/data")\n' +
        'const goHome = () => navigateTo("/")           // Navigation\n' +
        '</script>'}</code></pre>

      <h3 style={subTitle}>{t.h3CustomComposables}</h3>
      <p style={para}>{t.customComposablesDesc}</p>
      <pre style={codeBlock}><code>{'// composables/useApi.ts\n' +
        'export const useApi = <T>(url: string, options = {}) => {\n' +
        '  const config = useRuntimeConfig()\n' +
        '  return useFetch<T>(url, {\n' +
        '    baseURL: config.public.apiBase,\n' +
        '    headers: {\n' +
        '      Authorization: `Bearer \\${useAuth().token.value}`,\n' +
        '    },\n' +
        '    ...options,\n' +
        '  })\n' +
        '}\n' +
        '\n' +
        '// composables/useLocalStorage.ts\n' +
        'export const useLocalStorage = <T>(key: string, defaultValue: T) => {\n' +
        '  const data = useState<T>(key, () => defaultValue)\n' +
        '  if (import.meta.client) {\n' +
        '    const stored = localStorage.getItem(key)\n' +
        '    if (stored) data.value = JSON.parse(stored)\n' +
        '    watch(data, (val) => {\n' +
        '      localStorage.setItem(key, JSON.stringify(val))\n' +
        '    }, { deep: true })\n' +
        '  }\n' +
        '  return data\n' +
        '}'}</code></pre>

      {/* Modules */}
      <h2 style={sectionTitle}>{t.h2Modules}</h2>
      <p style={para}>{t.modulesDesc}</p>

      <h3 style={subTitle}>{t.h3PopularModules}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Module</th>
              <th style={thStyle}>Purpose</th>
              <th style={thStyle}>Package</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Nuxt Content</td><td style={tdStyle}>File-based CMS with Markdown, MDX, YAML</td><td style={tdStyle}>@nuxt/content</td></tr>
            <tr><td style={tdStyle}>Nuxt Image</td><td style={tdStyle}>Automatic image optimization and resizing</td><td style={tdStyle}>@nuxt/image</td></tr>
            <tr><td style={tdStyle}>Nuxt UI</td><td style={tdStyle}>Component library with Tailwind CSS</td><td style={tdStyle}>@nuxt/ui</td></tr>
            <tr><td style={tdStyle}>Nuxt Auth Utils</td><td style={tdStyle}>Session-based authentication</td><td style={tdStyle}>nuxt-auth-utils</td></tr>
            <tr><td style={tdStyle}>Nuxt SEO</td><td style={tdStyle}>All-in-one SEO toolkit</td><td style={tdStyle}>@nuxtjs/seo</td></tr>
            <tr><td style={tdStyle}>VueUse</td><td style={tdStyle}>Collection of Vue composition utilities</td><td style={tdStyle}>@vueuse/nuxt</td></tr>
            <tr><td style={tdStyle}>Pinia</td><td style={tdStyle}>State management for Vue</td><td style={tdStyle}>@pinia/nuxt</td></tr>
            <tr><td style={tdStyle}>Nuxt i18n</td><td style={tdStyle}>Internationalization and localization</td><td style={tdStyle}>@nuxtjs/i18n</td></tr>
          </tbody>
        </table>
      </div>

      <h3 style={subTitle}>{t.h3InstallingModules}</h3>
      <p style={para}>{t.installingModulesDesc}</p>
      <pre style={codeBlock}><code>{'# Install a module\n' +
        'npx nuxi module add @nuxt/content\n' +
        '\n' +
        '# Or manually install and configure\n' +
        'npm install @nuxt/image @pinia/nuxt'}</code></pre>
      <pre style={codeBlock}><code>{'// nuxt.config.ts\n' +
        'export default defineNuxtConfig({\n' +
        '  modules: [\n' +
        '    "@nuxt/content",\n' +
        '    "@nuxt/image",\n' +
        '    "@pinia/nuxt",\n' +
        '    "@nuxtjs/i18n",\n' +
        '  ],\n' +
        '\n' +
        '  // Module-specific configuration\n' +
        '  content: {\n' +
        '    highlight: {\n' +
        '      theme: "github-dark",\n' +
        '    },\n' +
        '  },\n' +
        '\n' +
        '  image: {\n' +
        '    quality: 80,\n' +
        '    formats: ["avif", "webp"],\n' +
        '  },\n' +
        '\n' +
        '  i18n: {\n' +
        '    locales: ["en", "fr", "de"],\n' +
        '    defaultLocale: "en",\n' +
        '  },\n' +
        '})'}</code></pre>

      {/* Middleware */}
      <h2 style={sectionTitle}>{t.h2Middleware}</h2>
      <p style={para}>{t.middlewareDesc}</p>

      <h3 style={subTitle}>{t.h3NamedMiddleware}</h3>
      <p style={para}>{t.namedMiddlewareDesc}</p>
      <pre style={codeBlock}><code>{'// middleware/auth.ts\n' +
        'export default defineNuxtRouteMiddleware((to, from) => {\n' +
        '  const { isLoggedIn } = useAuth()\n' +
        '  if (!isLoggedIn.value) return navigateTo("/login")\n' +
        '})\n' +
        '\n' +
        '// middleware/role.ts\n' +
        'export default defineNuxtRouteMiddleware((to) => {\n' +
        '  const { user } = useAuth()\n' +
        '  if (to.meta.role && user.value?.role !== to.meta.role) {\n' +
        '    return navigateTo("/unauthorized")\n' +
        '  }\n' +
        '})'}</code></pre>
      <pre style={codeBlock}><code>{'<!-- pages/dashboard.vue -->\n' +
        '<script setup lang="ts">\n' +
        'definePageMeta({ middleware: ["auth"] })\n' +
        '</script>\n' +
        '\n' +
        '<!-- pages/admin.vue - multiple middleware -->\n' +
        '<script setup lang="ts">\n' +
        'definePageMeta({ middleware: ["auth", "role"], role: "admin" })\n' +
        '</script>'}</code></pre>

      <h3 style={subTitle}>{t.h3GlobalMiddleware}</h3>
      <p style={para}>{t.globalMiddlewareDesc}</p>
      <pre style={codeBlock}><code>{'// middleware/analytics.global.ts\n' +
        'export default defineNuxtRouteMiddleware((to, from) => {\n' +
        '  // Runs on every route change\n' +
        '  if (import.meta.client) {\n' +
        '    trackPageView(to.fullPath)\n' +
        '  }\n' +
        '})'}</code></pre>

      {/* Layouts */}
      <h2 style={sectionTitle}>{t.h2Layouts}</h2>
      <p style={para}>{t.layoutsDesc}</p>
      <pre style={codeBlock}><code>{'<!-- layouts/default.vue -->\n' +
        '<template>\n' +
        '  <div>\n' +
        '    <AppHeader />\n' +
        '    <main>\n' +
        '      <slot />\n' +
        '    </main>\n' +
        '    <AppFooter />\n' +
        '  </div>\n' +
        '</template>'}</code></pre>

      <h3 style={subTitle}>{t.h3CustomLayouts}</h3>
      <p style={para}>{t.customLayoutsDesc}</p>
      <pre style={codeBlock}><code>{'<!-- layouts/admin.vue -->\n' +
        '<template>\n' +
        '  <div style="display: flex">\n' +
        '    <AdminSidebar />\n' +
        '    <main style="flex: 1; padding: 2rem">\n' +
        '      <slot />\n' +
        '    </main>\n' +
        '  </div>\n' +
        '</template>\n' +
        '\n' +
        '<!-- pages/admin/index.vue -->\n' +
        '<script setup lang="ts">\n' +
        'definePageMeta({\n' +
        '  layout: "admin",\n' +
        '})\n' +
        '</script>\n' +
        '\n' +
        '<template>\n' +
        '  <div>\n' +
        '    <h1>Admin Dashboard</h1>\n' +
        '  </div>\n' +
        '</template>'}</code></pre>

      {/* Plugins */}
      <h2 style={sectionTitle}>{t.h2Plugins}</h2>
      <p style={para}>{t.pluginsDesc}</p>

      <h3 style={subTitle}>{t.h3CreatingPlugins}</h3>
      <p style={para}>{t.creatingPluginsDesc}</p>
      <pre style={codeBlock}><code>{'// plugins/api.ts\n' +
        'export default defineNuxtPlugin(() => {\n' +
        '  const config = useRuntimeConfig()\n' +
        '  const api = $fetch.create({\n' +
        '    baseURL: config.public.apiBase,\n' +
        '    onRequest({ options }) {\n' +
        '      const token = useCookie("auth-token")\n' +
        '      if (token.value) {\n' +
        '        options.headers.set("Authorization", `Bearer \\${token.value}`)\n' +
        '      }\n' +
        '    },\n' +
        '    onResponseError({ response }) {\n' +
        '      if (response.status === 401) navigateTo("/login")\n' +
        '    },\n' +
        '  })\n' +
        '  return { provide: { api } }\n' +
        '})\n' +
        '\n' +
        '// Usage: const { $api } = useNuxtApp()\n' +
        '// const data = await $api("/users")'}</code></pre>

      {/* Rendering Modes */}
      <h2 style={sectionTitle}>{t.h2Rendering}</h2>
      <p style={para}>{t.renderingDesc}</p>

      <h3 style={subTitle}>{t.h3SSR}</h3>
      <p style={para}>{t.ssrDesc}</p>
      <pre style={codeBlock}><code>{'// nuxt.config.ts - SSR is enabled by default\n' +
        'export default defineNuxtConfig({\n' +
        '  ssr: true, // default\n' +
        '})'}</code></pre>

      <h3 style={subTitle}>{t.h3SSG}</h3>
      <p style={para}>{t.ssgDesc}</p>
      <pre style={codeBlock}><code>{'# Pre-render all pages as static HTML\n' +
        'npx nuxi generate\n' +
        '\n' +
        '# Output is in .output/public/ - deploy to any CDN'}</code></pre>

      <h3 style={subTitle}>{t.h3Hybrid}</h3>
      <p style={para}>{t.hybridDesc}</p>
      <pre style={codeBlock}><code>{'// nuxt.config.ts - hybrid rendering\n' +
        'export default defineNuxtConfig({\n' +
        '  routeRules: {\n' +
        '    "/": { prerender: true },           // Static at build\n' +
        '    "/about": { prerender: true },\n' +
        '    "/blog/**": { isr: 60 },            // ISR: regen every 60s\n' +
        '    "/admin/**": { ssr: false },         // SPA: client-only\n' +
        '    "/api/**": { cache: { maxAge: 300 }, cors: true },\n' +
        '    "/old-page": { redirect: "/new-page" },\n' +
        '  },\n' +
        '})'}</code></pre>

      {/* Deployment */}
      <h2 style={sectionTitle}>{t.h2Deployment}</h2>
      <p style={para}>{t.deploymentDesc}</p>

      <h3 style={subTitle}>{t.h3Vercel}</h3>
      <p style={para}>{t.vercelDesc}</p>
      <pre style={codeBlock}><code>{'# Vercel auto-detects Nuxt - just push to Git\n' +
        'npx vercel\n' +
        '\n' +
        '# Or set preset explicitly in nuxt.config.ts:\n' +
        '# nitro: { preset: "vercel" }'}</code></pre>

      <h3 style={subTitle}>{t.h3Cloudflare}</h3>
      <p style={para}>{t.cloudflareDesc}</p>
      <pre style={codeBlock}><code>{'// nuxt.config.ts\n' +
        'export default defineNuxtConfig({\n' +
        '  nitro: {\n' +
        '    preset: "cloudflare-pages",\n' +
        '  },\n' +
        '})\n' +
        '\n' +
        '// Deploy with Wrangler\n' +
        '// npx wrangler pages deploy .output/public'}</code></pre>

      <h3 style={subTitle}>{t.h3Node}</h3>
      <p style={para}>{t.nodeDesc}</p>
      <pre style={codeBlock}><code>{'# Build and start\n' +
        'npm run build\n' +
        'node .output/server/index.mjs\n' +
        '\n' +
        '# PM2 process management\n' +
        'pm2 start .output/server/index.mjs --name my-nuxt-app\n' +
        '\n' +
        '# Dockerfile\n' +
        'FROM node:20-alpine\n' +
        'WORKDIR /app\n' +
        'COPY .output .output\n' +
        'EXPOSE 3000\n' +
        'CMD ["node", ".output/server/index.mjs"]'}</code></pre>

      {/* Nuxt vs Next.js Comparison */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.thFeature}</th>
              <th style={thStyle}>{t.thNuxt}</th>
              <th style={thStyle}>{t.thNext}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Base Framework</td><td style={tdStyle}>Vue 3</td><td style={tdStyle}>React 19</td></tr>
            <tr><td style={tdStyle}>Build Tool</td><td style={tdStyle}>Vite</td><td style={tdStyle}>Turbopack / webpack</td></tr>
            <tr><td style={tdStyle}>Server Engine</td><td style={tdStyle}>Nitro (H3)</td><td style={tdStyle}>Built-in (Node.js)</td></tr>
            <tr><td style={tdStyle}>Auto-Imports</td><td style={tdStyle}>Built-in (composables, components, Vue APIs)</td><td style={tdStyle}>Not built-in</td></tr>
            <tr><td style={tdStyle}>File Routing</td><td style={tdStyle}>pages/ directory</td><td style={tdStyle}>app/ directory</td></tr>
            <tr><td style={tdStyle}>Data Fetching</td><td style={tdStyle}>useFetch, useAsyncData</td><td style={tdStyle}>Server Components, fetch()</td></tr>
            <tr><td style={tdStyle}>State Management</td><td style={tdStyle}>useState (built-in) + Pinia</td><td style={tdStyle}>React Context + Zustand/Jotai</td></tr>
            <tr><td style={tdStyle}>Rendering Modes</td><td style={tdStyle}>SSR, SSG, ISR, SPA, Hybrid per-route</td><td style={tdStyle}>SSR, SSG, ISR, SPA, Streaming</td></tr>
            <tr><td style={tdStyle}>Edge Deployment</td><td style={tdStyle}>Cloudflare Workers, Deno, Bun</td><td style={tdStyle}>Vercel Edge, Cloudflare</td></tr>
            <tr><td style={tdStyle}>TypeScript</td><td style={tdStyle}>Built-in, auto-generated types</td><td style={tdStyle}>Built-in</td></tr>
            <tr><td style={tdStyle}>Module Ecosystem</td><td style={tdStyle}>200+ modules</td><td style={tdStyle}>npm packages (no module system)</td></tr>
            <tr><td style={tdStyle}>Learning Curve</td><td style={tdStyle}>Lower (Vue is simpler)</td><td style={tdStyle}>Moderate (React + RSC complexity)</td></tr>
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>

      <h3 style={subTitle}>{t.faq1Q}</h3>
      <p style={para}>{t.faq1A}</p>

      <h3 style={subTitle}>{t.faq2Q}</h3>
      <p style={para}>{t.faq2A}</p>

      <h3 style={subTitle}>{t.faq3Q}</h3>
      <p style={para}>{t.faq3A}</p>

      <h3 style={subTitle}>{t.faq4Q}</h3>
      <p style={para}>{t.faq4A}</p>

      <h3 style={subTitle}>{t.faq5Q}</h3>
      <p style={para}>{t.faq5A}</p>

      <h3 style={subTitle}>{t.faq6Q}</h3>
      <p style={para}>{t.faq6A}</p>

      <h3 style={subTitle}>{t.faq7Q}</h3>
      <p style={para}>{t.faq7A}</p>

      <h3 style={subTitle}>{t.faq8Q}</h3>
      <p style={para}>{t.faq8A}</p>
    </article>
  );
}
