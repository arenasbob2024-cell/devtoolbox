'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'TanStack Router Guide 2026: Type-Safe Routing for React Applications',
    intro: 'TanStack Router is a fully type-safe routing library for React that brings end-to-end type safety to route params, search params, loaders, and navigation. Unlike traditional routers that rely on string-based paths and runtime validation, TanStack Router catches routing errors at compile time. With built-in search param management, data loading, code splitting, and first-class devtools, it is the most advanced routing solution available for React applications today.',
    tldr: 'TanStack Router delivers 100% type-safe routing for React with compile-time validation of route params, search params, loaders, and links. It features file-based routing, built-in search param serialization with Zod validation, automatic code splitting, route-level data loading, structural sharing for search params, first-class devtools, and SSR support via TanStack Start. It replaces React Router with a superior developer experience and zero runtime routing errors.',
    keyTakeaway1: 'TanStack Router provides end-to-end type safety: route params, search params, loaders, context, and Link components are all fully typed at compile time.',
    keyTakeaway2: 'File-based routing with automatic route tree generation eliminates manual route configuration while preserving full type inference.',
    keyTakeaway3: 'Built-in search param management with Zod validation replaces the need for external state libraries for URL-based state.',
    keyTakeaway4: 'Route loaders with automatic caching, invalidation, and deduplication provide a data-fetching layer similar to Remix or Next.js.',
    keyTakeaway5: 'Code splitting is automatic with file-based routing, lazy-loading route components, loaders, and search param validators independently.',
    keyTakeaway6: 'TanStack Router Devtools provide visual route inspection, search param debugging, and cache monitoring during development.',

    h2WhatIs: 'What Is TanStack Router and Why Type-Safe Routing?',
    whatIsDesc: 'TanStack Router is a client-side routing library for React created by Tanner Linsley (the creator of TanStack Query). It was built from the ground up with TypeScript as a first-class citizen, meaning every aspect of your routing is validated by the compiler. Route paths, path parameters, search parameters, loader data, and even Link href props are all type-checked.',
    whatIsDesc2: 'Traditional routers like React Router use string-based paths and provide no compile-time guarantees. A typo in a route path or a missing search parameter only surfaces at runtime. TanStack Router eliminates this entire class of bugs by encoding your route tree into the TypeScript type system.',

    h2Comparison: 'TanStack Router vs React Router vs Next.js Routing',
    comparisonDesc: 'Understanding how TanStack Router compares to other routing solutions helps you decide when to adopt it. Here is a feature-by-feature comparison:',
    compFeature: 'Feature',
    compTanstack: 'TanStack Router',
    compReactRouter: 'React Router v7',
    compNextjs: 'Next.js App Router',
    compRow1f: 'Type-safe params',
    compRow1t: 'Full compile-time',
    compRow1r: 'Partial (loader types)',
    compRow1n: 'None (string-based)',
    compRow2f: 'Type-safe search params',
    compRow2t: 'Full with Zod validation',
    compRow2r: 'Manual parsing',
    compRow2n: 'Manual parsing',
    compRow3f: 'Type-safe navigation',
    compRow3t: 'Link props fully typed',
    compRow3r: 'String-based paths',
    compRow3n: 'String-based paths',
    compRow4f: 'Data loading',
    compRow4t: 'Route loaders with caching',
    compRow4r: 'Loaders (Remix-style)',
    compRow4n: 'Server Components / fetch',
    compRow5f: 'Code splitting',
    compRow5t: 'Automatic per-route',
    compRow5r: 'Manual lazy()',
    compRow5n: 'Automatic per-page',
    compRow6f: 'Search param management',
    compRow6t: 'First-class built-in',
    compRow6r: 'useSearchParams (basic)',
    compRow6n: 'useSearchParams (basic)',
    compRow7f: 'SSR support',
    compRow7t: 'Via TanStack Start',
    compRow7r: 'Built-in (Remix)',
    compRow7n: 'Built-in',
    compRow8f: 'Devtools',
    compRow8t: 'Visual route devtools',
    compRow8r: 'None built-in',
    compRow8n: 'None built-in',

    h2RouteTree: 'Route Tree and File-Based Routing',
    routeTreeDesc: 'TanStack Router organizes routes as a tree structure. You can define routes manually using createRoute and createRouter, or use file-based routing that automatically generates the route tree from your file system. File-based routing is the recommended approach because it eliminates boilerplate and preserves full type safety.',
    routeTreeDesc2: 'With file-based routing, you run the TanStack Router CLI or Vite plugin, which watches your routes directory and generates a routeTree.gen.ts file. This generated file contains the complete type-safe route tree that the router uses.',

    h2Params: 'Route Params and Search Params (Type-Safe)',
    paramsDesc: 'Route parameters (path segments like /posts/$postId) are automatically typed based on your route definitions. There is no need for manual type assertions or runtime casts. When you access params in a loader or component, TypeScript knows the exact shape.',
    h3SearchParams: 'Type-Safe Search Params with Validation',
    searchParamsDesc: 'Search parameters are the killer feature of TanStack Router. Instead of manually parsing URLSearchParams, you define a validation schema (typically with Zod) and TanStack Router handles serialization, deserialization, and type inference automatically. Search params are structurally shared, meaning only changed values trigger re-renders.',

    h2Loaders: 'Loaders and Data Loading',
    loadersDesc: 'TanStack Router has a built-in data loading system similar to Remix loaders. Each route can define a loader function that runs before the route component renders. Loaders receive typed route context, params, and search params. They support caching, invalidation, and deduplication out of the box.',
    loadersDesc2: 'Loaders integrate seamlessly with TanStack Query. You can use ensureQueryData in your loader to prefetch data that your components consume via useQuery, giving you the best of both worlds: route-level prefetching and component-level cache management.',

    h2Context: 'Route Context',
    contextDesc: 'Route context lets you pass typed data down through the route tree. Unlike React context, route context is defined per route and flows from parent routes to child routes. This is ideal for passing authentication state, feature flags, or shared services.',
    contextDesc2: 'You define context at the router level with createRouter and extend it at each route level with beforeLoad. Child routes receive the accumulated context from all parent routes, fully typed.',

    h2Layouts: 'Layout Routes and Outlets',
    layoutsDesc: 'Layout routes wrap child routes with shared UI like navigation bars, sidebars, or footers. In TanStack Router, a layout route renders its component with an Outlet that displays the currently matched child route. File-based routing uses underscore-prefixed directories or pathless route files to define layouts.',
    layoutsDesc2: 'The Outlet component in TanStack Router works similarly to React Router but with full type safety for the rendered child route.',

    h2Navigation: 'Navigation: Link and useNavigate',
    navigationDesc: 'TanStack Router provides a type-safe Link component and a useNavigate hook. The Link component validates the to prop, params, and search params at compile time. If you link to a route that requires a postId param and forget to provide it, TypeScript catches the error immediately.',
    navigationDesc2: 'The useNavigate hook provides programmatic navigation with the same type-safety guarantees. You can navigate to routes, update search params, or replace history entries, all with full autocompletion and validation.',

    h2Guards: 'Route Guards and Authentication',
    guardsDesc: 'TanStack Router handles authentication and route protection through the beforeLoad hook. This function runs before the route loader and component, making it the ideal place to check auth state, redirect unauthenticated users, or validate permissions.',
    guardsDesc2: 'Because beforeLoad has access to the full route context, you can pass authentication services through route context and use them in any route guard without prop drilling or global state.',

    h2CodeSplitting: 'Code Splitting',
    codeSplittingDesc: 'TanStack Router supports automatic code splitting with file-based routing. By creating a .lazy.tsx file alongside your route definition, the router automatically lazy-loads the component, keeping the critical route definition (params, search params, loaders) in the main bundle while deferring the component code.',
    codeSplittingDesc2: 'This approach splits not just components but also loaders and search param validators independently, giving you fine-grained control over bundle sizes.',

    h2Devtools: 'TanStack Router Devtools',
    devtoolsDesc: 'TanStack Router includes a visual devtools panel that displays the current route tree, active route matches, search params state, loader cache, and pending navigations. The devtools are invaluable for debugging complex routing scenarios and understanding data flow.',
    devtoolsDesc2: 'The devtools are tree-shakable and only included in development builds. You add them with a single component that automatically disappears in production.',

    h2SSR: 'SSR Integration with TanStack Start',
    ssrDesc: 'TanStack Start is the full-stack framework built on TanStack Router that adds server-side rendering, server functions, and deployment adapters. It provides the same type-safe routing on the server, enabling features like server-side data loading, streaming SSR, and API routes.',
    ssrDesc2: 'If you need SSR, TanStack Start is the official solution. For client-side single-page applications, TanStack Router works standalone with Vite and any bundler.',

    h2Migration: 'Migration from React Router',
    migrationDesc: 'Migrating from React Router to TanStack Router can be done incrementally. The key changes involve replacing Route components with createRoute calls (or file-based route files), converting useParams/useSearchParams to the typed equivalents, and replacing Link components. The route structure concepts (nested routes, outlets, layouts) map directly.',
    migrationDesc2: 'Start by installing TanStack Router alongside React Router and migrating one route branch at a time. The TanStack Router Vite plugin and route tree generator handle most of the configuration automatically.',

    h2SearchZod: 'Search Param Validation with Zod',
    searchZodDesc: 'Zod is the recommended validation library for TanStack Router search params. You define a Zod schema in your route definition, and TanStack Router automatically validates, serializes, and types your search params. Invalid search params are caught and can be handled with fallback defaults.',
    searchZodDesc2: 'The search param validation runs on every navigation, ensuring your components always receive valid data. Combined with structural sharing, only the search params that actually changed trigger component re-renders.',

    h2PendingError: 'Pending and Error States',
    pendingErrorDesc: 'TanStack Router provides built-in support for pending UI (loading states during navigation) and error boundaries at the route level. Each route can define a pendingComponent that shows during data loading and an errorComponent that renders when loaders fail.',
    pendingErrorDesc2: 'The pendingMs and pendingMinMs options let you control when the pending UI appears and how long it stays visible, preventing flash-of-loading-state for fast navigations.',

    h2BestPractices: 'Best Practices',
    perfDesc: 'Follow these best practices to get the most out of TanStack Router in production applications.',
    bp1: 'Use file-based routing for automatic code splitting, route tree generation, and consistent project structure.',
    bp2: 'Define search param schemas with Zod for every route that uses URL state. This ensures type safety and automatic validation.',
    bp3: 'Use route context to pass authentication state and shared services instead of global React context for route-specific data.',
    bp4: 'Leverage structural sharing in search params to prevent unnecessary re-renders when only some params change.',
    bp5: 'Split route components into .lazy.tsx files to keep the main bundle small and defer heavy component code.',
    bp6: 'Integrate TanStack Query with route loaders using ensureQueryData for optimistic prefetching with component-level cache control.',
    bp7: 'Use beforeLoad for authentication guards instead of wrapping components, as it runs before any rendering or data loading.',
    bp8: 'Configure pendingMs (default 1000ms) and pendingMinMs to avoid flash-of-loading for fast navigations while showing feedback for slow ones.',
    bp9: 'Keep the TanStack Router Devtools enabled during development for visual debugging of route matches, params, and cache state.',
    bp10: 'Use the router.invalidate() method to refetch loader data after mutations instead of manually managing cache invalidation.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is TanStack Router?',
    faq1A: 'TanStack Router is a fully type-safe client-side routing library for React. It provides compile-time validation of route paths, params, search params, loaders, and navigation links. Created by Tanner Linsley, it is part of the TanStack ecosystem alongside TanStack Query, TanStack Table, and TanStack Form.',
    faq2Q: 'How is TanStack Router different from React Router?',
    faq2A: 'TanStack Router provides end-to-end type safety that React Router lacks. Route params, search params, and Link components are fully typed at compile time. TanStack Router also includes built-in search param management with Zod validation, automatic code splitting, route-level data caching, and visual devtools. React Router uses string-based paths with no compile-time validation of params or links.',
    faq3Q: 'Do I need TanStack Start to use TanStack Router?',
    faq3A: 'No. TanStack Router works as a standalone client-side routing library with Vite or any bundler. TanStack Start is only needed if you want server-side rendering, server functions, or a full-stack framework. For single-page applications, TanStack Router alone is sufficient.',
    faq4Q: 'How do search params work in TanStack Router?',
    faq4A: 'Search params in TanStack Router are defined with a validation schema (typically Zod) in the route definition. The router automatically serializes objects to URL search strings and deserializes them back with full type safety. Structural sharing ensures components only re-render when the specific search params they use actually change.',
    faq5Q: 'Can I migrate from React Router to TanStack Router incrementally?',
    faq5A: 'Yes. You can install TanStack Router alongside React Router and migrate one route branch at a time. The route concepts (nested routes, outlets, layouts) map directly between the two libraries. Start with leaf routes and work upward, converting Route components to file-based route definitions.',
    faq6Q: 'Does TanStack Router support code splitting?',
    faq6A: 'Yes. With file-based routing, code splitting is automatic. Create a .lazy.tsx file alongside your route definition, and the router lazy-loads the component while keeping the route configuration (params, search params, loaders) in the main bundle. This gives you optimal bundle splitting without manual lazy() calls.',
    faq7Q: 'How does data loading work in TanStack Router?',
    faq7A: 'Each route can define a loader function that runs before the component renders. Loaders receive typed params, search params, and route context. They support caching, automatic invalidation, and deduplication. For advanced caching, you can integrate TanStack Query by calling ensureQueryData in the loader.',
    faq8Q: 'Is TanStack Router production-ready?',
    faq8A: 'Yes. TanStack Router has reached stable v1 status and is used in production by companies of all sizes. It has comprehensive documentation, active maintenance, and a growing ecosystem. The library is battle-tested with the same quality standards as TanStack Query, which is used by millions of developers.',
  },
  zh: {
    title: 'TanStack Router 指南 2026：React 应用的类型安全路由',
    intro: 'TanStack Router 是一个完全类型安全的 React 路由库，为路由参数、搜索参数、加载器和导航提供端到端的类型安全。与依赖字符串路径和运行时验证的传统路由不同，TanStack Router 在编译时就能捕获路由错误。凭借内置的搜索参数管理、数据加载、代码分割和一流的开发工具，它是目前 React 应用最先进的路由解决方案。',
    tldr: 'TanStack Router 为 React 提供 100% 类型安全路由，编译时验证路由参数、搜索参数、加载器和链接。具备文件路由、Zod 搜索参数验证、自动代码分割、路由级数据加载、结构共享、开发工具和 SSR 支持（通过 TanStack Start）。以更优的开发体验和零运行时路由错误取代 React Router。',
    keyTakeaway1: 'TanStack Router 提供端到端类型安全：路由参数、搜索参数、加载器、上下文和 Link 组件在编译时完全类型化。',
    keyTakeaway2: '文件路由自动生成路由树，消除手动路由配置同时保留完整类型推断。',
    keyTakeaway3: '内置 Zod 搜索参数管理取代了外部状态库进行基于 URL 的状态管理。',
    keyTakeaway4: '路由加载器具备自动缓存、失效和去重功能，提供类似 Remix 或 Next.js 的数据获取层。',
    keyTakeaway5: '文件路由自动代码分割，独立懒加载路由组件、加载器和搜索参数验证器。',
    keyTakeaway6: 'TanStack Router 开发工具提供可视化路由检查、搜索参数调试和缓存监控。',

    h2WhatIs: '什么是 TanStack Router？为什么要类型安全路由？',
    whatIsDesc: 'TanStack Router 是 Tanner Linsley（TanStack Query 的创建者）开发的 React 客户端路由库。它从一开始就将 TypeScript 作为一等公民，路由的每个方面都由编译器验证。路由路径、路径参数、搜索参数、加载器数据甚至 Link 的 href 属性都经过类型检查。',
    whatIsDesc2: '传统路由如 React Router 使用基于字符串的路径，不提供编译时保证。路由路径中的拼写错误或缺失的搜索参数只在运行时才会暴露。TanStack Router 通过将路由树编码到 TypeScript 类型系统中消除了这整类 bug。',

    h2Comparison: 'TanStack Router vs React Router vs Next.js 路由对比',
    comparisonDesc: '了解 TanStack Router 与其他路由方案的对比有助于决定何时采用它。以下是功能逐项对比：',
    compFeature: '功能',
    compTanstack: 'TanStack Router',
    compReactRouter: 'React Router v7',
    compNextjs: 'Next.js App Router',
    compRow1f: '类型安全参数',
    compRow1t: '完整编译时类型',
    compRow1r: '部分（加载器类型）',
    compRow1n: '无（基于字符串）',
    compRow2f: '类型安全搜索参数',
    compRow2t: '完整 Zod 验证',
    compRow2r: '手动解析',
    compRow2n: '手动解析',
    compRow3f: '类型安全导航',
    compRow3t: 'Link 属性完全类型化',
    compRow3r: '基于字符串的路径',
    compRow3n: '基于字符串的路径',
    compRow4f: '数据加载',
    compRow4t: '带缓存的路由加载器',
    compRow4r: '加载器（Remix 风格）',
    compRow4n: '服务端组件 / fetch',
    compRow5f: '代码分割',
    compRow5t: '自动按路由分割',
    compRow5r: '手动 lazy()',
    compRow5n: '自动按页面分割',
    compRow6f: '搜索参数管理',
    compRow6t: '一等内置支持',
    compRow6r: 'useSearchParams（基础）',
    compRow6n: 'useSearchParams（基础）',
    compRow7f: 'SSR 支持',
    compRow7t: '通过 TanStack Start',
    compRow7r: '内置（Remix）',
    compRow7n: '内置',
    compRow8f: '开发工具',
    compRow8t: '可视化路由开发工具',
    compRow8r: '无内置',
    compRow8n: '无内置',

    h2RouteTree: '路由树和文件路由',
    routeTreeDesc: 'TanStack Router 将路由组织为树形结构。你可以使用 createRoute 和 createRouter 手动定义路由，也可以使用文件路由从文件系统自动生成路由树。推荐使用文件路由，因为它消除了样板代码并保留完整的类型安全。',
    routeTreeDesc2: '文件路由下，运行 TanStack Router CLI 或 Vite 插件会监听你的路由目录并生成 routeTree.gen.ts 文件，包含完整的类型安全路由树。',

    h2Params: '路由参数和搜索参数（类型安全）',
    paramsDesc: '路由参数（如 /posts/$postId 中的路径段）根据路由定义自动类型化。无需手动类型断言或运行时转换。在加载器或组件中访问 params 时，TypeScript 知道确切的形状。',
    h3SearchParams: '类型安全搜索参数与验证',
    searchParamsDesc: '搜索参数是 TanStack Router 的杀手级功能。你不需要手动解析 URLSearchParams，只需定义验证模式（通常用 Zod），TanStack Router 自动处理序列化、反序列化和类型推断。搜索参数使用结构共享，只有变化的值才会触发重新渲染。',

    h2Loaders: '加载器和数据加载',
    loadersDesc: 'TanStack Router 有内置数据加载系统，类似 Remix 加载器。每个路由可以定义一个在组件渲染前运行的加载器函数，接收类型化的路由上下文、参数和搜索参数，开箱即用支持缓存、失效和去重。',
    loadersDesc2: '加载器与 TanStack Query 无缝集成。你可以在加载器中使用 ensureQueryData 预获取数据，组件通过 useQuery 消费，兼得路由级预获取和组件级缓存管理。',

    h2Context: '路由上下文',
    contextDesc: '路由上下文允许你在路由树中传递类型化数据。与 React context 不同，路由上下文按路由定义，从父路由流向子路由。适合传递认证状态、功能标志或共享服务。',
    contextDesc2: '在路由器级别用 createRouter 定义上下文，在每个路由级别用 beforeLoad 扩展。子路由接收所有父路由累积的上下文，完全类型化。',

    h2Layouts: '布局路由和 Outlet',
    layoutsDesc: '布局路由用共享 UI（如导航栏、侧边栏或页脚）包装子路由。TanStack Router 中，布局路由渲染其组件并使用 Outlet 显示当前匹配的子路由。文件路由使用下划线前缀目录或无路径路由文件定义布局。',
    layoutsDesc2: 'TanStack Router 中的 Outlet 组件与 React Router 类似，但对渲染的子路由具有完整的类型安全。',

    h2Navigation: '导航：Link 和 useNavigate',
    navigationDesc: 'TanStack Router 提供类型安全的 Link 组件和 useNavigate hook。Link 组件在编译时验证 to 属性、params 和 search params。如果链接到需要 postId 参数的路由但忘记提供，TypeScript 立即捕获错误。',
    navigationDesc2: 'useNavigate hook 提供具有相同类型安全保证的编程导航。可以导航到路由、更新搜索参数或替换历史记录条目，全部具有完整的自动补全和验证。',

    h2Guards: '路由守卫和身份验证',
    guardsDesc: 'TanStack Router 通过 beforeLoad hook 处理身份验证和路由保护。此函数在路由加载器和组件之前运行，是检查认证状态、重定向未认证用户或验证权限的理想位置。',
    guardsDesc2: '因为 beforeLoad 可以访问完整的路由上下文，你可以通过路由上下文传递认证服务，在任何路由守卫中使用，无需 prop drilling 或全局状态。',

    h2CodeSplitting: '代码分割',
    codeSplittingDesc: 'TanStack Router 通过文件路由支持自动代码分割。在路由定义旁创建 .lazy.tsx 文件，路由器自动懒加载组件，将关键路由定义（参数、搜索参数、加载器）保留在主包中，同时延迟组件代码。',
    codeSplittingDesc2: '这种方式不仅分割组件，还独立分割加载器和搜索参数验证器，让你精细控制包大小。',

    h2Devtools: 'TanStack Router 开发工具',
    devtoolsDesc: 'TanStack Router 包含可视化开发工具面板，显示当前路由树、活跃路由匹配、搜索参数状态、加载器缓存和待处理导航。开发工具对于调试复杂路由场景和理解数据流非常有价值。',
    devtoolsDesc2: '开发工具支持 tree-shaking，仅在开发构建中包含。添加一个组件即可在生产环境自动消失。',

    h2SSR: 'SSR 集成与 TanStack Start',
    ssrDesc: 'TanStack Start 是基于 TanStack Router 构建的全栈框架，添加了服务端渲染、服务器函数和部署适配器。它在服务端提供相同的类型安全路由，支持服务端数据加载、流式 SSR 和 API 路由。',
    ssrDesc2: '如果需要 SSR，TanStack Start 是官方解决方案。对于客户端单页应用，TanStack Router 可与 Vite 和任何打包器独立使用。',

    h2Migration: '从 React Router 迁移',
    migrationDesc: '从 React Router 迁移到 TanStack Router 可以增量进行。关键变化包括将 Route 组件替换为 createRoute 调用（或文件路由文件）、将 useParams/useSearchParams 转换为类型化等价物、以及替换 Link 组件。路由结构概念（嵌套路由、outlet、布局）可直接映射。',
    migrationDesc2: '先将 TanStack Router 与 React Router 并行安装，每次迁移一个路由分支。Vite 插件和路由树生成器自动处理大部分配置。',

    h2SearchZod: 'Zod 搜索参数验证',
    searchZodDesc: 'Zod 是 TanStack Router 搜索参数的推荐验证库。在路由定义中定义 Zod 模式，TanStack Router 自动验证、序列化和类型化搜索参数。无效搜索参数会被捕获并可用默认值回退。',
    searchZodDesc2: '搜索参数验证在每次导航时运行，确保组件始终收到有效数据。结合结构共享，只有实际变化的搜索参数才触发组件重新渲染。',

    h2PendingError: '待处理和错误状态',
    pendingErrorDesc: 'TanStack Router 内置支持路由级别的待处理 UI（导航时的加载状态）和错误边界。每个路由可以定义在数据加载时显示的 pendingComponent 和加载器失败时渲染的 errorComponent。',
    pendingErrorDesc2: 'pendingMs 和 pendingMinMs 选项控制待处理 UI 何时出现以及显示多长时间，防止快速导航时的闪烁加载状态。',

    h2BestPractices: '最佳实践',
    perfDesc: '遵循这些最佳实践，在生产应用中充分发挥 TanStack Router 的优势。',
    bp1: '使用文件路由实现自动代码分割、路由树生成和一致的项目结构。',
    bp2: '为每个使用 URL 状态的路由用 Zod 定义搜索参数模式，确保类型安全和自动验证。',
    bp3: '使用路由上下文传递认证状态和共享服务，而非使用全局 React context。',
    bp4: '利用搜索参数的结构共享防止部分参数变化时不必要的重新渲染。',
    bp5: '将路由组件分割到 .lazy.tsx 文件，保持主包小巧并延迟重型组件代码。',
    bp6: '使用 ensureQueryData 集成 TanStack Query 与路由加载器，实现乐观预获取和组件级缓存控制。',
    bp7: '使用 beforeLoad 进行身份验证守卫，而非包装组件，因为它在任何渲染或数据加载之前运行。',
    bp8: '配置 pendingMs（默认 1000ms）和 pendingMinMs，避免快速导航时的闪烁加载同时为慢导航显示反馈。',
    bp9: '开发时保持 TanStack Router 开发工具启用，可视化调试路由匹配、参数和缓存状态。',
    bp10: '使用 router.invalidate() 在变更后重新获取加载器数据，而非手动管理缓存失效。',

    h2Faq: '常见问题',
    faq1Q: '什么是 TanStack Router？',
    faq1A: 'TanStack Router 是一个完全类型安全的 React 客户端路由库。提供路由路径、参数、搜索参数、加载器和导航链接的编译时验证。由 Tanner Linsley 创建，是 TanStack 生态的一部分。',
    faq2Q: 'TanStack Router 与 React Router 有什么不同？',
    faq2A: 'TanStack Router 提供 React Router 缺乏的端到端类型安全。路由参数、搜索参数和 Link 组件在编译时完全类型化，还包含内置 Zod 搜索参数管理、自动代码分割、路由级数据缓存和可视化开发工具。',
    faq3Q: '使用 TanStack Router 需要 TanStack Start 吗？',
    faq3A: '不需要。TanStack Router 可作为独立客户端路由库与 Vite 或任何打包器配合使用。TanStack Start 仅在需要服务端渲染、服务器函数或全栈框架时才需要。',
    faq4Q: 'TanStack Router 的搜索参数如何工作？',
    faq4A: '搜索参数通过路由定义中的验证模式（通常是 Zod）定义。路由器自动序列化对象为 URL 搜索字符串并反序列化，具有完整类型安全。结构共享确保组件仅在使用的特定搜索参数实际变化时重新渲染。',
    faq5Q: '可以从 React Router 增量迁移到 TanStack Router 吗？',
    faq5A: '可以。可以将 TanStack Router 与 React Router 并行安装，每次迁移一个路由分支。路由概念直接映射，从叶子路由开始向上迁移。',
    faq6Q: 'TanStack Router 支持代码分割吗？',
    faq6A: '支持。文件路由下代码分割是自动的。在路由定义旁创建 .lazy.tsx 文件，路由器自动懒加载组件，无需手动 lazy() 调用。',
    faq7Q: 'TanStack Router 的数据加载如何工作？',
    faq7A: '每个路由可定义在组件渲染前运行的加载器函数，接收类型化的参数、搜索参数和路由上下文，支持缓存、自动失效和去重。可集成 TanStack Query 使用 ensureQueryData 实现高级缓存。',
    faq8Q: 'TanStack Router 可以用于生产环境吗？',
    faq8A: '可以。TanStack Router 已达到稳定 v1 状态，被各种规模的公司用于生产。具有完善的文档、活跃的维护和不断增长的生态系统。',
  },
};

export default function TanstackRouterGuide({ lang }: { lang: string }) {
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
  const cellStyle: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' };
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 700, background: '#f1f5f9' };

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

      {/* What Is TanStack Router */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>
      <pre style={codeBlock}><code>{'# Install TanStack Router\n'
        + 'npm install @tanstack/react-router\n'
        + '\n'
        + '# Install the Vite plugin for file-based routing\n'
        + 'npm install -D @tanstack/router-plugin @tanstack/router-devtools\n'
        + '\n'
        + '# vite.config.ts\n'
        + 'import { defineConfig } from "vite";\n'
        + 'import react from "@vitejs/plugin-react";\n'
        + 'import { TanStackRouterVite } from "@tanstack/router-plugin/vite";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  plugins: [\n'
        + '    TanStackRouterVite(),\n'
        + '    react(),\n'
        + '  ],\n'
        + '});'}</code></pre>

      {/* Comparison Table */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
          <thead>
            <tr>
              <th style={headerCell}>{t.compFeature}</th>
              <th style={headerCell}>{t.compTanstack}</th>
              <th style={headerCell}>{t.compReactRouter}</th>
              <th style={headerCell}>{t.compNextjs}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compRow1f, t.compRow1t, t.compRow1r, t.compRow1n],
              [t.compRow2f, t.compRow2t, t.compRow2r, t.compRow2n],
              [t.compRow3f, t.compRow3t, t.compRow3r, t.compRow3n],
              [t.compRow4f, t.compRow4t, t.compRow4r, t.compRow4n],
              [t.compRow5f, t.compRow5t, t.compRow5r, t.compRow5n],
              [t.compRow6f, t.compRow6t, t.compRow6r, t.compRow6n],
              [t.compRow7f, t.compRow7t, t.compRow7r, t.compRow7n],
              [t.compRow8f, t.compRow8t, t.compRow8r, t.compRow8n],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, fontWeight: 600 }}>{row[0]}</td>
                <td style={cellStyle}>{row[1]}</td>
                <td style={cellStyle}>{row[2]}</td>
                <td style={cellStyle}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Route Tree and File-Based Routing */}
      <h2 style={sectionTitle}>{t.h2RouteTree}</h2>
      <p style={para}>{t.routeTreeDesc}</p>
      <p style={para}>{t.routeTreeDesc2}</p>
      <pre style={codeBlock}><code>{'// File-based routing directory structure\n'
        + '// src/routes/\n'
        + '//   __root.tsx          -> Root layout\n'
        + '//   index.tsx           -> / (home page)\n'
        + '//   about.tsx           -> /about\n'
        + '//   posts.tsx           -> /posts (layout)\n'
        + '//   posts.index.tsx     -> /posts (index)\n'
        + '//   posts.$postId.tsx   -> /posts/:postId\n'
        + '//   _auth.tsx           -> Auth layout (pathless)\n'
        + '//   _auth.login.tsx     -> /login\n'
        + '//   _auth.register.tsx  -> /register\n'
        + '\n'
        + '// src/routes/__root.tsx\n'
        + 'import { createRootRoute, Outlet } from "@tanstack/react-router";\n'
        + '\n'
        + 'export const Route = createRootRoute({\n'
        + '  component: () => (\n'
        + '    <div>\n'
        + '      <nav>\n'
        + '        <Link to="/">Home</Link>\n'
        + '        <Link to="/posts">Posts</Link>\n'
        + '        <Link to="/about">About</Link>\n'
        + '      </nav>\n'
        + '      <Outlet />\n'
        + '    </div>\n'
        + '  ),\n'
        + '});'}</code></pre>

      <pre style={codeBlock}><code>{'// Manual route tree definition (alternative to file-based)\n'
        + 'import {\n'
        + '  createRouter,\n'
        + '  createRootRoute,\n'
        + '  createRoute,\n'
        + '} from "@tanstack/react-router";\n'
        + '\n'
        + 'const rootRoute = createRootRoute({\n'
        + '  component: RootLayout,\n'
        + '});\n'
        + '\n'
        + 'const indexRoute = createRoute({\n'
        + '  getParentRoute: () => rootRoute,\n'
        + '  path: "/",\n'
        + '  component: HomePage,\n'
        + '});\n'
        + '\n'
        + 'const postsRoute = createRoute({\n'
        + '  getParentRoute: () => rootRoute,\n'
        + '  path: "posts",\n'
        + '  component: PostsLayout,\n'
        + '});\n'
        + '\n'
        + 'const postRoute = createRoute({\n'
        + '  getParentRoute: () => postsRoute,\n'
        + '  path: "\\$postId",\n'
        + '  component: PostDetail,\n'
        + '});\n'
        + '\n'
        + 'const routeTree = rootRoute.addChildren([\n'
        + '  indexRoute,\n'
        + '  postsRoute.addChildren([postRoute]),\n'
        + ']);\n'
        + '\n'
        + 'const router = createRouter({ routeTree });'}</code></pre>

      {/* Route Params and Search Params */}
      <h2 style={sectionTitle}>{t.h2Params}</h2>
      <p style={para}>{t.paramsDesc}</p>
      <pre style={codeBlock}><code>{'// src/routes/posts.$postId.tsx\n'
        + 'import { createFileRoute } from "@tanstack/react-router";\n'
        + '\n'
        + 'export const Route = createFileRoute("/posts/\\$postId")({\n'
        + '  loader: async ({ params }) => {\n'
        + '    // params.postId is typed as string automatically\n'
        + '    const post = await fetchPost(params.postId);\n'
        + '    return { post };\n'
        + '  },\n'
        + '  component: PostDetail,\n'
        + '});\n'
        + '\n'
        + 'function PostDetail() {\n'
        + '  const { post } = Route.useLoaderData();\n'
        + '  const { postId } = Route.useParams();\n'
        + '  // postId is typed as string, post is typed from loader\n'
        + '  return <h1>{post.title}</h1>;\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3SearchParams}</h3>
      <p style={para}>{t.searchParamsDesc}</p>
      <pre style={codeBlock}><code>{'// src/routes/posts.index.tsx\n'
        + 'import { createFileRoute } from "@tanstack/react-router";\n'
        + 'import { z } from "zod";\n'
        + '\n'
        + 'const postsSearchSchema = z.object({\n'
        + '  page: z.number().default(1),\n'
        + '  sort: z.enum(["newest", "oldest", "popular"]).default("newest"),\n'
        + '  filter: z.string().optional(),\n'
        + '  tags: z.array(z.string()).default([]),\n'
        + '});\n'
        + '\n'
        + 'export const Route = createFileRoute("/posts/")({\n'
        + '  validateSearch: postsSearchSchema,\n'
        + '  component: PostsList,\n'
        + '});\n'
        + '\n'
        + 'function PostsList() {\n'
        + '  // All search params are fully typed!\n'
        + '  const { page, sort, filter, tags } = Route.useSearch();\n'
        + '  // page: number, sort: "newest" | "oldest" | "popular"\n'
        + '  // filter: string | undefined, tags: string[]\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <Link\n'
        + '        to="/posts"\n'
        + '        search={{ page: page + 1, sort, filter, tags }}\n'
        + '      >\n'
        + '        Next Page\n'
        + '      </Link>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Loaders */}
      <h2 style={sectionTitle}>{t.h2Loaders}</h2>
      <p style={para}>{t.loadersDesc}</p>
      <p style={para}>{t.loadersDesc2}</p>
      <pre style={codeBlock}><code>{'// Route loader with TanStack Query integration\n'
        + 'import { createFileRoute } from "@tanstack/react-router";\n'
        + 'import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";\n'
        + '\n'
        + 'const postQueryOptions = (postId: string) =>\n'
        + '  queryOptions({\n'
        + '    queryKey: ["post", postId],\n'
        + '    queryFn: () => fetchPost(postId),\n'
        + '  });\n'
        + '\n'
        + 'export const Route = createFileRoute("/posts/\\$postId")({\n'
        + '  loader: async ({ params, context }) => {\n'
        + '    // Prefetch the data into TanStack Query cache\n'
        + '    await context.queryClient.ensureQueryData(\n'
        + '      postQueryOptions(params.postId)\n'
        + '    );\n'
        + '  },\n'
        + '  component: PostDetail,\n'
        + '});\n'
        + '\n'
        + 'function PostDetail() {\n'
        + '  const { postId } = Route.useParams();\n'
        + '  // Data is already cached from the loader\n'
        + '  const { data: post } = useSuspenseQuery(\n'
        + '    postQueryOptions(postId)\n'
        + '  );\n'
        + '  return <h1>{post.title}</h1>;\n'
        + '}'}</code></pre>

      {/* Route Context */}
      <h2 style={sectionTitle}>{t.h2Context}</h2>
      <p style={para}>{t.contextDesc}</p>
      <p style={para}>{t.contextDesc2}</p>
      <pre style={codeBlock}><code>{'// Define router context with auth and queryClient\n'
        + 'import { createRouter } from "@tanstack/react-router";\n'
        + 'import { QueryClient } from "@tanstack/react-query";\n'
        + '\n'
        + 'interface RouterContext {\n'
        + '  queryClient: QueryClient;\n'
        + '  auth: { user: User | null; isAuthenticated: boolean };\n'
        + '}\n'
        + '\n'
        + 'const router = createRouter({\n'
        + '  routeTree,\n'
        + '  context: {\n'
        + '    queryClient: new QueryClient(),\n'
        + '    auth: undefined!,  // Will be provided in <RouterProvider>\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// In your app entry point\n'
        + 'function App() {\n'
        + '  const auth = useAuth();\n'
        + '  return (\n'
        + '    <RouterProvider\n'
        + '      router={router}\n'
        + '      context={{ auth }}\n'
        + '    />\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Layout Routes */}
      <h2 style={sectionTitle}>{t.h2Layouts}</h2>
      <p style={para}>{t.layoutsDesc}</p>
      <p style={para}>{t.layoutsDesc2}</p>
      <pre style={codeBlock}><code>{'// src/routes/posts.tsx - Layout route for /posts/*\n'
        + 'import { createFileRoute, Outlet, Link } from "@tanstack/react-router";\n'
        + '\n'
        + 'export const Route = createFileRoute("/posts")({\n'
        + '  component: PostsLayout,\n'
        + '});\n'
        + '\n'
        + 'function PostsLayout() {\n'
        + '  return (\n'
        + '    <div style={{ display: "flex" }}>\n'
        + '      <aside>\n'
        + '        <h2>Posts</h2>\n'
        + '        <nav>\n'
        + '          <Link to="/posts" search={{ sort: "newest" }}>\n'
        + '            All Posts\n'
        + '          </Link>\n'
        + '          <Link to="/posts" search={{ sort: "popular" }}>\n'
        + '            Popular\n'
        + '          </Link>\n'
        + '        </nav>\n'
        + '      </aside>\n'
        + '      <main>\n'
        + '        {/* Child routes render here */}\n'
        + '        <Outlet />\n'
        + '      </main>\n'
        + '    </div>\n'
        + '  );\n'
        + '}\n'
        + '\n'
        + '// src/routes/_auth.tsx - Pathless layout (no URL segment)\n'
        + 'import { createFileRoute, Outlet } from "@tanstack/react-router";\n'
        + '\n'
        + 'export const Route = createFileRoute("/_auth")({\n'
        + '  component: () => (\n'
        + '    <div style={{ maxWidth: 400, margin: "0 auto" }}>\n'
        + '      <h1>Welcome</h1>\n'
        + '      <Outlet />\n'
        + '    </div>\n'
        + '  ),\n'
        + '});'}</code></pre>

      {/* Navigation */}
      <h2 style={sectionTitle}>{t.h2Navigation}</h2>
      <p style={para}>{t.navigationDesc}</p>
      <p style={para}>{t.navigationDesc2}</p>
      <pre style={codeBlock}><code>{'// Type-safe Link component\n'
        + 'import { Link, useNavigate } from "@tanstack/react-router";\n'
        + '\n'
        + 'function Navigation() {\n'
        + '  const navigate = useNavigate();\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      {/* TypeScript validates all props */}\n'
        + '      <Link to="/posts/\\$postId" params={{ postId: "123" }}>\n'
        + '        View Post\n'
        + '      </Link>\n'
        + '\n'
        + '      {/* Search params are type-checked too */}\n'
        + '      <Link\n'
        + '        to="/posts"\n'
        + '        search={{ page: 1, sort: "newest" }}\n'
        + '        activeProps={{ style: { fontWeight: "bold" } }}\n'
        + '      >\n'
        + '        Posts\n'
        + '      </Link>\n'
        + '\n'
        + '      {/* Programmatic navigation */}\n'
        + '      <button\n'
        + '        onClick={() =>\n'
        + '          navigate({\n'
        + '            to: "/posts/\\$postId",\n'
        + '            params: { postId: "456" },\n'
        + '            search: { tab: "comments" },\n'
        + '          })\n'
        + '        }\n'
        + '      >\n'
        + '        Go to Post\n'
        + '      </button>\n'
        + '\n'
        + '      {/* Update only search params (keep current route) */}\n'
        + '      <button\n'
        + '        onClick={() =>\n'
        + '          navigate({\n'
        + '            search: (prev) => ({ ...prev, page: prev.page + 1 }),\n'
        + '          })\n'
        + '        }\n'
        + '      >\n'
        + '        Next Page\n'
        + '      </button>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Route Guards */}
      <h2 style={sectionTitle}>{t.h2Guards}</h2>
      <p style={para}>{t.guardsDesc}</p>
      <p style={para}>{t.guardsDesc2}</p>
      <pre style={codeBlock}><code>{'// src/routes/_authenticated.tsx\n'
        + 'import { createFileRoute, redirect } from "@tanstack/react-router";\n'
        + '\n'
        + 'export const Route = createFileRoute("/_authenticated")({\n'
        + '  beforeLoad: async ({ context, location }) => {\n'
        + '    if (!context.auth.isAuthenticated) {\n'
        + '      throw redirect({\n'
        + '        to: "/login",\n'
        + '        search: { redirect: location.href },\n'
        + '      });\n'
        + '    }\n'
        + '  },\n'
        + '  component: () => <Outlet />,\n'
        + '});\n'
        + '\n'
        + '// src/routes/_authenticated.dashboard.tsx\n'
        + '// This route is automatically protected by the parent guard\n'
        + 'export const Route = createFileRoute("/_authenticated/dashboard")({\n'
        + '  component: Dashboard,\n'
        + '});\n'
        + '\n'
        + 'function Dashboard() {\n'
        + '  // context.auth.user is guaranteed to exist here\n'
        + '  return <h1>Dashboard</h1>;\n'
        + '}'}</code></pre>

      {/* Code Splitting */}
      <h2 style={sectionTitle}>{t.h2CodeSplitting}</h2>
      <p style={para}>{t.codeSplittingDesc}</p>
      <p style={para}>{t.codeSplittingDesc2}</p>
      <pre style={codeBlock}><code>{'// src/routes/posts.$postId.tsx - Critical route config (main bundle)\n'
        + 'import { createFileRoute } from "@tanstack/react-router";\n'
        + '\n'
        + 'export const Route = createFileRoute("/posts/\\$postId")({\n'
        + '  // Loader stays in main bundle for prefetching\n'
        + '  loader: async ({ params }) => fetchPost(params.postId),\n'
        + '});\n'
        + '\n'
        + '// src/routes/posts.$postId.lazy.tsx - Lazy component (separate chunk)\n'
        + 'import { createLazyFileRoute } from "@tanstack/react-router";\n'
        + '\n'
        + 'export const Route = createLazyFileRoute("/posts/\\$postId")({\n'
        + '  component: PostDetail,\n'
        + '  pendingComponent: () => <div>Loading post...</div>,\n'
        + '  errorComponent: ({ error }) => (\n'
        + '    <div>Error: {error.message}</div>\n'
        + '  ),\n'
        + '});\n'
        + '\n'
        + 'function PostDetail() {\n'
        + '  const post = Route.useLoaderData();\n'
        + '  return (\n'
        + '    <article>\n'
        + '      <h1>{post.title}</h1>\n'
        + '      <p>{post.content}</p>\n'
        + '    </article>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Devtools */}
      <h2 style={sectionTitle}>{t.h2Devtools}</h2>
      <p style={para}>{t.devtoolsDesc}</p>
      <p style={para}>{t.devtoolsDesc2}</p>
      <pre style={codeBlock}><code>{'// Add devtools to your app\n'
        + 'import { TanStackRouterDevtools } from "@tanstack/router-devtools";\n'
        + '\n'
        + '// In your root route component\n'
        + 'export const Route = createRootRoute({\n'
        + '  component: () => (\n'
        + '    <>\n'
        + '      <Outlet />\n'
        + '      {/* Only rendered in development */}\n'
        + '      <TanStackRouterDevtools position="bottom-right" />\n'
        + '    </>\n'
        + '  ),\n'
        + '});'}</code></pre>

      {/* SSR */}
      <h2 style={sectionTitle}>{t.h2SSR}</h2>
      <p style={para}>{t.ssrDesc}</p>
      <p style={para}>{t.ssrDesc2}</p>
      <pre style={codeBlock}><code>{'// TanStack Start - app.config.ts\n'
        + 'import { defineConfig } from "@tanstack/react-start/config";\n'
        + 'import tsConfigPaths from "vite-tsconfig-paths";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  vite: {\n'
        + '    plugins: [tsConfigPaths()],\n'
        + '  },\n'
        + '  server: {\n'
        + '    preset: "node-server",  // or vercel, netlify, cloudflare\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// Server function example\n'
        + 'import { createServerFn } from "@tanstack/react-start";\n'
        + '\n'
        + 'const getServerTime = createServerFn()\n'
        + '  .validator(z.object({ timezone: z.string() }))\n'
        + '  .handler(async ({ data }) => {\n'
        + '    return new Date().toLocaleString("en-US", {\n'
        + '      timeZone: data.timezone,\n'
        + '    });\n'
        + '  });'}</code></pre>

      {/* Migration */}
      <h2 style={sectionTitle}>{t.h2Migration}</h2>
      <p style={para}>{t.migrationDesc}</p>
      <p style={para}>{t.migrationDesc2}</p>
      <pre style={codeBlock}><code>{'// BEFORE: React Router v6\n'
        + 'import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";\n'
        + '\n'
        + 'function App() {\n'
        + '  return (\n'
        + '    <BrowserRouter>\n'
        + '      <Routes>\n'
        + '        <Route path="/" element={<Home />} />\n'
        + '        <Route path="/posts" element={<PostsLayout />}>\n'
        + '          <Route index element={<PostsList />} />\n'
        + '          <Route path=":postId" element={<PostDetail />} />\n'
        + '        </Route>\n'
        + '      </Routes>\n'
        + '    </BrowserRouter>\n'
        + '  );\n'
        + '}\n'
        + '\n'
        + 'function PostDetail() {\n'
        + '  const { postId } = useParams(); // postId: string | undefined\n'
        + '  // No type safety!\n'
        + '}\n'
        + '\n'
        + '// AFTER: TanStack Router (file-based)\n'
        + '// src/routes/__root.tsx\n'
        + '// src/routes/index.tsx\n'
        + '// src/routes/posts.tsx\n'
        + '// src/routes/posts.index.tsx\n'
        + '// src/routes/posts.$postId.tsx\n'
        + '\n'
        + '// Each file exports a typed Route - params are guaranteed'}</code></pre>

      {/* Search Param Validation with Zod */}
      <h2 style={sectionTitle}>{t.h2SearchZod}</h2>
      <p style={para}>{t.searchZodDesc}</p>
      <p style={para}>{t.searchZodDesc2}</p>
      <pre style={codeBlock}><code>{'import { createFileRoute } from "@tanstack/react-router";\n'
        + 'import { z } from "zod";\n'
        + '\n'
        + 'const productSearchSchema = z.object({\n'
        + '  category: z.enum(["electronics", "clothing", "books"]).catch("electronics"),\n'
        + '  priceMin: z.number().min(0).catch(0),\n'
        + '  priceMax: z.number().max(10000).catch(10000),\n'
        + '  inStock: z.boolean().catch(true),\n'
        + '  q: z.string().optional(),\n'
        + '});\n'
        + '\n'
        + 'type ProductSearch = z.infer<typeof productSearchSchema>;\n'
        + '\n'
        + 'export const Route = createFileRoute("/products")({\n'
        + '  validateSearch: productSearchSchema,\n'
        + '  component: ProductsPage,\n'
        + '});\n'
        + '\n'
        + 'function ProductsPage() {\n'
        + '  const search = Route.useSearch();\n'
        + '  // search is fully typed as ProductSearch\n'
        + '  // Invalid URL params are caught and replaced with defaults\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <Link\n'
        + '        to="/products"\n'
        + '        search={(prev) => ({ ...prev, category: "books" })}\n'
        + '      >\n'
        + '        Books\n'
        + '      </Link>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Pending and Error States */}
      <h2 style={sectionTitle}>{t.h2PendingError}</h2>
      <p style={para}>{t.pendingErrorDesc}</p>
      <p style={para}>{t.pendingErrorDesc2}</p>
      <pre style={codeBlock}><code>{'// src/routes/posts.$postId.tsx\n'
        + 'export const Route = createFileRoute("/posts/\\$postId")({\n'
        + '  loader: async ({ params }) => {\n'
        + '    const post = await fetchPost(params.postId);\n'
        + '    if (!post) throw new Error("Post not found");\n'
        + '    return { post };\n'
        + '  },\n'
        + '  // Show after 1s of loading (avoid flash for fast loads)\n'
        + '  pendingMs: 1000,\n'
        + '  // Show for at least 500ms once visible\n'
        + '  pendingMinMs: 500,\n'
        + '  pendingComponent: () => (\n'
        + '    <div style={{ padding: "2rem", textAlign: "center" }}>\n'
        + '      <span>Loading post...</span>\n'
        + '    </div>\n'
        + '  ),\n'
        + '  errorComponent: ({ error, reset }) => (\n'
        + '    <div style={{ padding: "2rem", color: "red" }}>\n'
        + '      <h2>Something went wrong</h2>\n'
        + '      <p>{error.message}</p>\n'
        + '      <button onClick={reset}>Try again</button>\n'
        + '    </div>\n'
        + '  ),\n'
        + '  component: PostDetail,\n'
        + '});'}</code></pre>

      {/* Best Practices */}
      <h2 style={sectionTitle}>{t.h2BestPractices}</h2>
      <p style={para}>{t.perfDesc}</p>
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
