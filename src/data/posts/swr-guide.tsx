'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SWR Guide 2026: Stale-While-Revalidate Data Fetching for React',
    intro: 'SWR is a React Hooks library for data fetching created by Vercel. The name SWR comes from stale-while-revalidate, an HTTP cache invalidation strategy that first returns cached (stale) data, then sends the fetch request (revalidate), and finally delivers the up-to-date result. SWR provides a simple yet powerful API for fetching, caching, and revalidating data in React applications with built-in support for pagination, prefetching, SSR, and real-time updates.',
    tldr: 'SWR is a lightweight React data fetching library by Vercel that implements the stale-while-revalidate caching strategy. It provides automatic caching, request deduplication, focus revalidation, interval polling, optimistic UI updates, pagination with useSWRInfinite, SSR/SSG support for Next.js, and TypeScript-first design. At under 4KB gzipped, SWR delivers a fast and reliable data layer for modern React applications.',
    keyTakeaway1: 'SWR returns cached data instantly while revalidating in the background, providing a snappy user experience with always-fresh data.',
    keyTakeaway2: 'Built-in request deduplication means multiple components using the same key share a single network request automatically.',
    keyTakeaway3: 'Focus revalidation, interval polling, and reconnect revalidation keep data fresh without manual intervention.',
    keyTakeaway4: 'useSWRMutation separates remote mutations from data fetching, enabling optimistic updates and rollback on error.',
    keyTakeaway5: 'useSWRInfinite provides a first-class API for infinite scrolling and paginated data loading patterns.',
    keyTakeaway6: 'SWR integrates seamlessly with Next.js for server-side rendering and static generation with client-side revalidation.',

    h2WhatIs: 'What Is SWR and How Does Stale-While-Revalidate Work?',
    whatIsDesc: 'SWR is a strategy where the cache (stale data) is returned immediately when a request is made, then a revalidation request is fired in the background, and finally the cache is updated with the fresh response. This means users see data instantly from cache while the library quietly ensures that data stays up to date.',
    whatIsDesc2: 'The useSWR hook is the core API. You give it a key (usually a URL) and a fetcher function. SWR handles caching, deduplication, revalidation, error retries, and focus tracking automatically. When the same key is used across multiple components, they share the same cache entry and only one network request is made.',

    h2Comparison: 'SWR vs React Query (TanStack Query) Comparison',
    comparisonDesc: 'SWR and TanStack Query (formerly React Query) are the two most popular data fetching libraries for React. Both solve similar problems but take different approaches in complexity and feature scope.',
    thFeature: 'Feature',
    thSWR: 'SWR',
    thReactQuery: 'TanStack Query',
    compBundleSize: 'Bundle Size',
    compSWRBundle: '~4KB gzipped',
    compRQBundle: '~13KB gzipped',
    compCaching: 'Caching',
    compSWRCaching: 'Stale-while-revalidate',
    compRQCaching: 'Stale-while-revalidate + GC',
    compDevtools: 'Devtools',
    compSWRDevtools: 'Community (SWRDevTools)',
    compRQDevtools: 'Official (built-in)',
    compMutations: 'Mutations',
    compSWRMutations: 'useSWRMutation + mutate',
    compRQMutations: 'useMutation (full lifecycle)',
    compPagination: 'Pagination',
    compSWRPagination: 'useSWRInfinite',
    compRQPagination: 'useInfiniteQuery + paginated',
    compSSR: 'SSR Support',
    compSWRSSR: 'Next.js first-class',
    compRQSSR: 'Framework-agnostic SSR',
    compTS: 'TypeScript',
    compSWRTS: 'Excellent (built-in)',
    compRQTS: 'Excellent (built-in)',
    compGC: 'Garbage Collection',
    compSWRGC: 'Manual (cache provider)',
    compRQGC: 'Automatic (configurable)',
    compOffline: 'Offline Support',
    compSWROffline: 'Basic (via config)',
    compRQOffline: 'Advanced (mutations queue)',
    compLearning: 'Learning Curve',
    compSWRLearning: 'Low (simple API)',
    compRQLearning: 'Medium (more concepts)',

    h2BasicUsage: 'Basic Usage: useSWR Hook',
    basicUsageDesc: 'The useSWR hook takes a key and a fetcher function. The key is a unique string that identifies the data (typically an API URL). The fetcher is a function that actually performs the data retrieval. SWR returns data, error, isLoading, and isValidating states.',
    basicUsageDesc2: 'The fetcher function receives the key as its argument and returns a Promise. You can use fetch, axios, graphql-request, or any async function as your fetcher.',

    h2GlobalConfig: 'Global Configuration with SWRConfig',
    globalConfigDesc: 'SWRConfig provides a context for setting default options for all SWR hooks within your application. This avoids repeating the same fetcher, error retry logic, or revalidation intervals across every useSWR call.',
    globalConfigDesc2: 'You can nest SWRConfig providers to override options for specific sections of your app. Child configs merge with parent configs, so you only need to specify the options you want to change.',

    h2ConditionalFetching: 'Conditional Fetching',
    conditionalDesc: 'SWR supports conditional fetching by passing null or a falsy value as the key. When the key is null, SWR will not start the request. This is useful for scenarios where data depends on user authentication, feature flags, or other runtime conditions.',
    conditionalDesc2: 'You can also pass a function as the key. If the function throws an error or returns a falsy value, SWR pauses the request. This is the recommended pattern for dependent fetching.',

    h2DependentRequests: 'Dependent Requests',
    dependentDesc: 'Dependent requests are fetches that depend on the result of a previous request. SWR handles this elegantly by using a function as the key. If the function throws (because the dependency is not yet available), SWR pauses until the dependency resolves.',
    dependentDesc2: 'SWR guarantees that dependent requests are made in the correct order and that each step is properly cached. When the parent data changes, the dependent request automatically revalidates.',

    h2Mutation: 'Mutation: mutate and useSWRMutation',
    mutationDesc: 'SWR provides two approaches for modifying remote data. The bound mutate function (returned by useSWR) revalidates the specific key. The global mutate function can revalidate any key. For dedicated mutations with loading states, use the useSWRMutation hook.',
    h3BoundMutate: 'Bound Mutate',
    boundMutateDesc: 'The mutate function returned by useSWR is bound to the current key. Call it to revalidate the data or pass new data to update the cache directly.',
    h3GlobalMutate: 'Global Mutate',
    globalMutateDesc: 'The global mutate function from useSWRConfig can mutate any key from anywhere in your application. This is useful for updating related caches after a mutation.',
    h3UseSWRMutation: 'useSWRMutation Hook',
    useSWRMutationDesc: 'useSWRMutation is designed for remote mutations (POST, PUT, DELETE). Unlike useSWR, it does not automatically fetch data. Instead, it provides a trigger function that you call manually.',

    h2OptimisticUpdates: 'Optimistic Updates',
    optimisticDesc: 'Optimistic updates improve perceived performance by updating the UI immediately before the server confirms the change. If the server request fails, SWR automatically rolls back to the previous data. This pattern is essential for responsive UIs in collaborative and real-time applications.',

    h2Pagination: 'Pagination with useSWRInfinite',
    paginationDesc: 'useSWRInfinite is purpose-built for paginated and infinite scrolling interfaces. It manages an array of pages, each with its own cache key. You provide a getKey function that returns the key for each page index, and SWR handles loading, caching, and merging pages automatically.',
    paginationDesc2: 'The hook returns size (current number of pages loaded), setSize (function to load more), and the combined data array. It also supports parallel fetching of multiple pages for faster loading.',

    h2Prefetching: 'Prefetching Data',
    prefetchingDesc: 'SWR supports several prefetching patterns to load data before the user needs it. You can prefetch on hover, on route change, or at the application level. Prefetched data is stored in the cache and instantly returned when a component mounts with the same key.',
    prefetchingDesc2: 'The preload function from SWR triggers a fetch and stores the result in cache. When a component later calls useSWR with the same key, the cached data is returned immediately without any loading state.',

    h2Revalidation: 'Revalidation Strategies',
    revalidationDesc: 'SWR provides multiple automatic revalidation strategies to keep data fresh without manual intervention. These can be configured globally or per-hook.',
    h3Focus: 'Revalidate on Focus',
    focusDesc: 'When the user switches back to your browser tab, SWR automatically revalidates all active data. This ensures that stale data from background tabs is refreshed. Enabled by default.',
    h3Interval: 'Revalidate on Interval',
    intervalDesc: 'Set a polling interval to periodically refresh data. Useful for dashboards, live feeds, and real-time data. SWR is smart enough to pause polling when the tab is not visible.',
    h3Reconnect: 'Revalidate on Reconnect',
    reconnectDesc: 'When the browser regains network connectivity, SWR automatically revalidates all data. This ensures that data fetched during an offline period is updated once the connection is restored.',

    h2ErrorHandling: 'Error Handling and Retry',
    errorDesc: 'SWR provides built-in error handling with automatic retry. When a fetcher throws an error, SWR catches it and exposes it through the error return value. By default, SWR retries failed requests using exponential backoff.',
    errorDesc2: 'You can customize retry behavior with onErrorRetry, set a maximum retry count, or disable retries entirely. SWR also supports global error handling through the onError callback in SWRConfig.',

    h2TypeScript: 'TypeScript Integration',
    tsDesc: 'SWR is written in TypeScript and provides excellent type inference out of the box. The useSWR hook is generic, allowing you to specify the data type and error type. When you provide a typed fetcher, SWR automatically infers the return type.',
    tsDesc2: 'For more complex scenarios, you can use SWRResponse, Key, Fetcher, and other exported types to build strongly typed abstractions on top of SWR.',

    h2SSR: 'Server-Side Rendering with Next.js',
    ssrDesc: 'SWR integrates deeply with Next.js for server-side rendering and static generation. The fallback option in SWRConfig lets you pass server-fetched data to useSWR hooks on the client. The client receives the pre-fetched data immediately and then revalidates in the background.',
    ssrDesc2: 'For App Router (Server Components), you can fetch data on the server and pass it as the fallback prop. SWR will use this data for the initial render and revalidate client-side.',

    h2CachingDedup: 'Caching and Deduplication',
    cachingDesc: 'SWR uses an in-memory cache by default, keyed by the string key you pass to useSWR. When multiple components use the same key, they all share the same cache entry. SWR deduplicates concurrent requests automatically: if three components mount simultaneously with the same key, only one network request is made.',
    cachingDesc2: 'You can customize the cache provider to use localStorage, IndexedDB, or any storage backend. The dedupingInterval option controls how long SWR considers requests as duplicates (default is 2 seconds).',

    h2Middleware: 'SWR Middleware',
    middlewareDesc: 'SWR middleware lets you intercept and modify the behavior of useSWR hooks. A middleware is a function that wraps the useSWR hook, giving you access to the key, fetcher, and options before and after the hook executes. This enables logging, analytics, request modification, and custom caching logic.',

    h2Testing: 'Testing SWR Components',
    testingDesc: 'Testing components that use SWR requires wrapping them in an SWRConfig with a fresh cache provider to isolate tests. You can mock the fetcher, pre-populate the cache with fallback data, or use a mock service worker for network-level mocking.',

    h2BestPractices: 'Best Practices',
    bp1: 'Define your fetcher once in SWRConfig rather than repeating it in every useSWR call to keep your code DRY.',
    bp2: 'Use stable key strings. Avoid constructing keys with objects or arrays because SWR uses string comparison for cache keys.',
    bp3: 'Use useSWRMutation for POST/PUT/DELETE operations instead of manually calling mutate after fetch.',
    bp4: 'Enable optimistic updates for user-facing mutations (likes, comments, toggles) to improve perceived performance.',
    bp5: 'Use useSWRInfinite for paginated data instead of manually managing page state with useSWR.',
    bp6: 'Set appropriate dedupingInterval values to prevent excessive network requests during rapid component mounting.',
    bp7: 'Wrap test components in SWRConfig with a fresh Map cache provider to prevent test pollution.',
    bp8: 'Leverage the fallback option in SWRConfig for SSR and preloading data from the server.',
    bp9: 'Use conditional fetching (null key) instead of adding if-statements around useSWR to avoid React hooks order issues.',
    bp10: 'Use middleware for cross-cutting concerns like logging, analytics, and authentication token injection.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What does SWR stand for?',
    faq1A: 'SWR stands for stale-while-revalidate. It is an HTTP cache invalidation strategy defined in RFC 5861. The approach returns cached (stale) data first for instant display, then fetches fresh data in the background, and finally swaps in the updated result. This gives users an immediate response while ensuring data freshness.',
    faq2Q: 'How is SWR different from React Query (TanStack Query)?',
    faq2A: 'SWR is smaller (4KB vs 13KB gzipped) and has a simpler API focused on data fetching with the stale-while-revalidate pattern. TanStack Query offers more features including built-in devtools, automatic garbage collection, advanced mutation lifecycle hooks, and offline mutation queuing. Choose SWR for simplicity and small bundle size; choose TanStack Query for complex data management needs.',
    faq3Q: 'Does SWR work with Next.js App Router and Server Components?',
    faq3A: 'Yes. SWR works with Next.js App Router. You fetch data in Server Components and pass it as the fallback prop to SWRConfig in a Client Component. SWR uses the server data for the initial render and revalidates on the client. Note that useSWR itself must be used in Client Components since it is a React hook.',
    faq4Q: 'How does SWR handle request deduplication?',
    faq4A: 'When multiple components call useSWR with the same key within the dedupingInterval (default 2 seconds), SWR only sends one network request. All components share the same cached data and update simultaneously when the response arrives. This happens automatically without any configuration.',
    faq5Q: 'Can I use SWR with GraphQL?',
    faq5A: 'Yes. SWR is transport-agnostic. You can use any async function as the fetcher, including graphql-request, Apollo Client, or a custom fetch wrapper for GraphQL. The key can be the query string or a combination of query and variables. SWR handles caching and revalidation regardless of the underlying protocol.',
    faq6Q: 'How do I handle pagination with SWR?',
    faq6A: 'Use the useSWRInfinite hook for paginated and infinite scroll interfaces. It accepts a getKey function that receives the page index and previous page data, and returns the key for each page. The hook manages an array of page responses and provides setSize to load more pages. It supports both offset-based and cursor-based pagination.',
    faq7Q: 'Does SWR support offline mode?',
    faq7A: 'SWR provides basic offline support through its caching layer. Cached data remains available when the network is offline. When connectivity is restored, SWR automatically revalidates all data via the onReconnect event. For advanced offline support with persistent cache, you can implement a custom cache provider using localStorage or IndexedDB.',
    faq8Q: 'How do I prevent SWR from fetching on mount?',
    faq8A: 'Pass revalidateOnMount: false in the options to prevent SWR from fetching when the component mounts. You can also use useSWRImmutable (or set revalidateOnFocus, revalidateOnReconnect, and revalidateIfStale all to false) for data that rarely changes. To conditionally skip fetching entirely, pass null as the key.',
  },
  zh: {
    title: 'SWR 指南 2026：React 的 Stale-While-Revalidate 数据获取',
    intro: 'SWR 是由 Vercel 创建的 React Hooks 数据获取库。SWR 的名称来自 stale-while-revalidate，这是一种 HTTP 缓存失效策略：首先返回缓存（陈旧）数据，然后发送获取请求（重新验证），最终返回最新结果。SWR 为 React 应用提供了简单而强大的 API，内置支持分页、预取、SSR 和实时更新。',
    tldr: 'SWR 是 Vercel 出品的轻量级 React 数据获取库，实现了 stale-while-revalidate 缓存策略。它提供自动缓存、请求去重、焦点重新验证、轮询、乐观更新、useSWRInfinite 分页、Next.js SSR/SSG 支持，以及 TypeScript 优先设计。压缩后不到 4KB，为现代 React 应用提供快速可靠的数据层。',
    keyTakeaway1: 'SWR 立即返回缓存数据并在后台重新验证，提供即时响应体验和始终新鲜的数据。',
    keyTakeaway2: '内置请求去重意味着多个使用相同 key 的组件自动共享单个网络请求。',
    keyTakeaway3: '焦点重新验证、轮询和重连重新验证无需手动干预即可保持数据新鲜。',
    keyTakeaway4: 'useSWRMutation 将远程变更与数据获取分离，支持乐观更新和错误回滚。',
    keyTakeaway5: 'useSWRInfinite 为无限滚动和分页数据加载提供一流 API。',
    keyTakeaway6: 'SWR 与 Next.js 无缝集成，支持服务端渲染和静态生成以及客户端重新验证。',

    h2WhatIs: '什么是 SWR，Stale-While-Revalidate 如何工作？',
    whatIsDesc: 'SWR 是一种策略：请求时立即返回缓存（陈旧）数据，然后在后台发送重新验证请求，最后用新响应更新缓存。用户立即从缓存看到数据，同时库静默确保数据保持最新。',
    whatIsDesc2: 'useSWR hook 是核心 API。你给它一个 key（通常是 URL）和一个 fetcher 函数。SWR 自动处理缓存、去重、重新验证、错误重试和焦点跟踪。当多个组件使用相同 key 时，它们共享同一个缓存条目，只发送一个网络请求。',

    h2Comparison: 'SWR 与 React Query（TanStack Query）对比',
    comparisonDesc: 'SWR 和 TanStack Query（前身为 React Query）是 React 中最流行的两个数据获取库。两者解决类似问题，但在复杂度和功能范围上有所不同。',
    thFeature: '特性',
    thSWR: 'SWR',
    thReactQuery: 'TanStack Query',
    compBundleSize: '包大小',
    compSWRBundle: '~4KB gzipped',
    compRQBundle: '~13KB gzipped',
    compCaching: '缓存',
    compSWRCaching: 'Stale-while-revalidate',
    compRQCaching: 'Stale-while-revalidate + GC',
    compDevtools: '开发工具',
    compSWRDevtools: '社区版（SWRDevTools）',
    compRQDevtools: '官方内置',
    compMutations: '变更操作',
    compSWRMutations: 'useSWRMutation + mutate',
    compRQMutations: 'useMutation（完整生命周期）',
    compPagination: '分页',
    compSWRPagination: 'useSWRInfinite',
    compRQPagination: 'useInfiniteQuery + 分页',
    compSSR: 'SSR 支持',
    compSWRSSR: 'Next.js 一流支持',
    compRQSSR: '框架无关 SSR',
    compTS: 'TypeScript',
    compSWRTS: '优秀（内置）',
    compRQTS: '优秀（内置）',
    compGC: '垃圾回收',
    compSWRGC: '手动（cache provider）',
    compRQGC: '自动（可配置）',
    compOffline: '离线支持',
    compSWROffline: '基础（通过配置）',
    compRQOffline: '高级（变更队列）',
    compLearning: '学习曲线',
    compSWRLearning: '低（简单 API）',
    compRQLearning: '中等（概念较多）',

    h2BasicUsage: '基本用法：useSWR Hook',
    basicUsageDesc: 'useSWR hook 接受一个 key 和一个 fetcher 函数。key 是标识数据的唯一字符串（通常是 API URL）。fetcher 是实际执行数据获取的函数。SWR 返回 data、error、isLoading 和 isValidating 状态。',
    basicUsageDesc2: 'fetcher 函数接收 key 作为参数并返回 Promise。你可以使用 fetch、axios、graphql-request 或任何异步函数作为 fetcher。',

    h2GlobalConfig: '全局配置：SWRConfig',
    globalConfigDesc: 'SWRConfig 提供上下文来设置应用中所有 SWR hook 的默认选项。避免在每个 useSWR 调用中重复相同的 fetcher、错误重试逻辑或重新验证间隔。',
    globalConfigDesc2: '可以嵌套 SWRConfig 来覆盖特定部分的选项。子配置与父配置合并，只需指定要更改的选项。',

    h2ConditionalFetching: '条件获取',
    conditionalDesc: 'SWR 支持通过传递 null 或假值作为 key 进行条件获取。当 key 为 null 时，SWR 不会发起请求。适用于数据依赖于用户认证、功能开关或其他运行时条件的场景。',
    conditionalDesc2: '也可以传递函数作为 key。如果函数抛出错误或返回假值，SWR 会暂停请求。这是依赖获取的推荐模式。',

    h2DependentRequests: '依赖请求',
    dependentDesc: '依赖请求是依赖前一个请求结果的获取。SWR 通过使用函数作为 key 来优雅处理。如果函数抛出异常（因为依赖尚不可用），SWR 会暂停直到依赖解析完成。',
    dependentDesc2: 'SWR 保证依赖请求按正确顺序发起，每一步都被正确缓存。当父数据更改时，依赖请求自动重新验证。',

    h2Mutation: '变更：mutate 和 useSWRMutation',
    mutationDesc: 'SWR 提供两种修改远程数据的方式。绑定的 mutate 函数（useSWR 返回）重新验证特定 key。全局 mutate 函数可以重新验证任何 key。对于带加载状态的专用变更，使用 useSWRMutation hook。',
    h3BoundMutate: '绑定 Mutate',
    boundMutateDesc: 'useSWR 返回的 mutate 函数绑定到当前 key。调用它来重新验证数据或传递新数据直接更新缓存。',
    h3GlobalMutate: '全局 Mutate',
    globalMutateDesc: 'useSWRConfig 中的全局 mutate 函数可以从应用任何位置变更任何 key。适用于变更后更新相关缓存。',
    h3UseSWRMutation: 'useSWRMutation Hook',
    useSWRMutationDesc: 'useSWRMutation 专为远程变更（POST、PUT、DELETE）设计。与 useSWR 不同，它不会自动获取数据，而是提供一个手动调用的 trigger 函数。',

    h2OptimisticUpdates: '乐观更新',
    optimisticDesc: '乐观更新通过在服务器确认之前立即更新 UI 来改善感知性能。如果服务器请求失败，SWR 自动回滚到之前的数据。这种模式对于协作和实时应用中的响应式 UI 至关重要。',

    h2Pagination: '分页：useSWRInfinite',
    paginationDesc: 'useSWRInfinite 专为分页和无限滚动界面构建。它管理一个页面数组，每个页面有自己的缓存 key。你提供一个 getKey 函数为每个页面索引返回 key，SWR 自动处理加载、缓存和合并页面。',
    paginationDesc2: 'hook 返回 size（当前加载的页数）、setSize（加载更多的函数）和合并的 data 数组。还支持并行获取多个页面以加速加载。',

    h2Prefetching: '预取数据',
    prefetchingDesc: 'SWR 支持多种预取模式，在用户需要之前加载数据。可以在悬停时、路由切换时或应用级别预取。预取的数据存储在缓存中，当组件使用相同 key 挂载时立即返回。',
    prefetchingDesc2: 'SWR 的 preload 函数触发获取并将结果存入缓存。当组件随后使用相同 key 调用 useSWR 时，缓存数据立即返回，无需加载状态。',

    h2Revalidation: '重新验证策略',
    revalidationDesc: 'SWR 提供多种自动重新验证策略，无需手动干预即可保持数据新鲜。可以全局配置或按 hook 配置。',
    h3Focus: '焦点重新验证',
    focusDesc: '当用户切换回浏览器标签时，SWR 自动重新验证所有活跃数据。确保后台标签中的陈旧数据被刷新。默认启用。',
    h3Interval: '轮询重新验证',
    intervalDesc: '设置轮询间隔定期刷新数据。适用于仪表盘、实时动态和实时数据。SWR 会在标签不可见时暂停轮询。',
    h3Reconnect: '重连重新验证',
    reconnectDesc: '当浏览器恢复网络连接时，SWR 自动重新验证所有数据。确保离线期间获取的数据在连接恢复后更新。',

    h2ErrorHandling: '错误处理与重试',
    errorDesc: 'SWR 提供内置错误处理和自动重试。当 fetcher 抛出错误时，SWR 捕获它并通过 error 返回值暴露。默认情况下，SWR 使用指数退避重试失败请求。',
    errorDesc2: '可以通过 onErrorRetry 自定义重试行为、设置最大重试次数或完全禁用重试。SWR 还支持通过 SWRConfig 中的 onError 回调进行全局错误处理。',

    h2TypeScript: 'TypeScript 集成',
    tsDesc: 'SWR 用 TypeScript 编写，提供开箱即用的优秀类型推断。useSWR hook 是泛型的，允许指定数据类型和错误类型。当提供类型化的 fetcher 时，SWR 自动推断返回类型。',
    tsDesc2: '对于更复杂的场景，可以使用 SWRResponse、Key、Fetcher 和其他导出类型在 SWR 之上构建强类型抽象。',

    h2SSR: 'Next.js 服务端渲染',
    ssrDesc: 'SWR 与 Next.js 深度集成，支持服务端渲染和静态生成。SWRConfig 中的 fallback 选项让你将服务端获取的数据传递给客户端的 useSWR hook。客户端立即收到预获取的数据，然后在后台重新验证。',
    ssrDesc2: '对于 App Router（Server Components），可以在服务端获取数据并作为 fallback prop 传递。SWR 使用此数据进行初始渲染并在客户端重新验证。',

    h2CachingDedup: '缓存与去重',
    cachingDesc: 'SWR 默认使用内存缓存，以传递给 useSWR 的字符串 key 为键。当多个组件使用相同 key 时，它们共享同一个缓存条目。SWR 自动去重并发请求：如果三个组件同时使用相同 key 挂载，只发送一个网络请求。',
    cachingDesc2: '可以自定义 cache provider 使用 localStorage、IndexedDB 或任何存储后端。dedupingInterval 选项控制 SWR 将请求视为重复的时长（默认 2 秒）。',

    h2Middleware: 'SWR 中间件',
    middlewareDesc: 'SWR 中间件让你拦截和修改 useSWR hook 的行为。中间件是一个包装 useSWR hook 的函数，在 hook 执行前后可以访问 key、fetcher 和选项。支持日志、分析、请求修改和自定义缓存逻辑。',

    h2Testing: '测试 SWR 组件',
    testingDesc: '测试使用 SWR 的组件需要将它们包装在带有新 cache provider 的 SWRConfig 中以隔离测试。可以模拟 fetcher、用 fallback 数据预填充缓存，或使用 mock service worker 进行网络级模拟。',

    h2BestPractices: '最佳实践',
    bp1: '在 SWRConfig 中定义一次 fetcher，而不是在每个 useSWR 调用中重复。',
    bp2: '使用稳定的 key 字符串。避免用对象或数组构造 key，因为 SWR 使用字符串比较缓存键。',
    bp3: '使用 useSWRMutation 处理 POST/PUT/DELETE 操作，而不是在 fetch 后手动调用 mutate。',
    bp4: '为面向用户的变更（点赞、评论、开关）启用乐观更新以改善感知性能。',
    bp5: '使用 useSWRInfinite 处理分页数据，而不是用 useSWR 手动管理页面状态。',
    bp6: '设置适当的 dedupingInterval 值，防止快速组件挂载期间的过多网络请求。',
    bp7: '在测试中用新 Map 缓存提供者的 SWRConfig 包装组件，防止测试污染。',
    bp8: '利用 SWRConfig 中的 fallback 选项进行 SSR 和服务端数据预加载。',
    bp9: '使用条件获取（null key）而非在 useSWR 周围添加 if 语句，避免 hooks 顺序问题。',
    bp10: '使用中间件处理横切关注点，如日志、分析和认证令牌注入。',

    h2Faq: '常见问题',
    faq1Q: 'SWR 代表什么？',
    faq1A: 'SWR 代表 stale-while-revalidate，是 RFC 5861 中定义的 HTTP 缓存失效策略。该方法首先返回缓存（陈旧）数据以立即显示，然后在后台获取新数据，最后替换为更新的结果。',
    faq2Q: 'SWR 与 React Query（TanStack Query）有什么不同？',
    faq2A: 'SWR 更小（4KB vs 13KB）且 API 更简单，专注于 stale-while-revalidate 模式的数据获取。TanStack Query 提供更多功能，包括内置开发工具、自动垃圾回收、高级变更生命周期和离线变更队列。简单场景选 SWR，复杂数据管理选 TanStack Query。',
    faq3Q: 'SWR 是否支持 Next.js App Router 和 Server Components？',
    faq3A: '是的。在 Server Components 中获取数据并作为 fallback 传递给 Client Component 中的 SWRConfig。SWR 使用服务端数据进行初始渲染并在客户端重新验证。注意 useSWR 本身必须在 Client Components 中使用。',
    faq4Q: 'SWR 如何处理请求去重？',
    faq4A: '当多个组件在 dedupingInterval（默认 2 秒）内使用相同 key 调用 useSWR 时，SWR 只发送一个网络请求。所有组件共享相同的缓存数据，响应到达时同时更新。',
    faq5Q: 'SWR 能用于 GraphQL 吗？',
    faq5A: '可以。SWR 与传输协议无关。可以使用 graphql-request、Apollo Client 或自定义 fetch 包装器作为 fetcher。key 可以是查询字符串或查询与变量的组合。',
    faq6Q: '如何用 SWR 处理分页？',
    faq6A: '使用 useSWRInfinite hook。它接受一个 getKey 函数，接收页面索引和前一页数据并返回每页的 key。hook 管理页面响应数组并提供 setSize 加载更多页面。',
    faq7Q: 'SWR 支持离线模式吗？',
    faq7A: 'SWR 通过缓存层提供基本离线支持。网络离线时缓存数据仍然可用。连接恢复时 SWR 自动重新验证所有数据。要获得高级离线支持和持久缓存，可以实现自定义 cache provider。',
    faq8Q: '如何阻止 SWR 在挂载时获取？',
    faq8A: '在选项中传递 revalidateOnMount: false。也可以使用 useSWRImmutable（或将 revalidateOnFocus、revalidateOnReconnect 和 revalidateIfStale 都设为 false）。要完全跳过获取，传递 null 作为 key。',
  },
};

export default function SwrGuide({ lang }: { lang: string }) {
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
  const thStyle: React.CSSProperties = { padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600 };
  const tdStyle: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0' };

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

      {/* What Is SWR */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>
      <pre style={codeBlock}><code>{'import useSWR from \'swr\';\n\n'
        + '// Define a fetcher function\n'
        + 'const fetcher = (url) => fetch(url).then((res) => res.json());\n\n'
        + 'function UserProfile({ userId }) {\n'
        + '  const { data, error, isLoading } = useSWR(\n'
        + '    \'/api/users/\' + userId,\n'
        + '    fetcher\n'
        + '  );\n\n'
        + '  if (isLoading) return <div>Loading...</div>;\n'
        + '  if (error) return <div>Error loading user</div>;\n\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <h1>{data.name}</h1>\n'
        + '      <p>{data.email}</p>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Comparison Table */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={thStyle}>{t.thFeature}</th>
              <th style={thStyle}>{t.thSWR}</th>
              <th style={thStyle}>{t.thReactQuery}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>{t.compBundleSize}</td><td style={tdStyle}>{t.compSWRBundle}</td><td style={tdStyle}>{t.compRQBundle}</td></tr>
            <tr><td style={tdStyle}>{t.compCaching}</td><td style={tdStyle}>{t.compSWRCaching}</td><td style={tdStyle}>{t.compRQCaching}</td></tr>
            <tr><td style={tdStyle}>{t.compDevtools}</td><td style={tdStyle}>{t.compSWRDevtools}</td><td style={tdStyle}>{t.compRQDevtools}</td></tr>
            <tr><td style={tdStyle}>{t.compMutations}</td><td style={tdStyle}>{t.compSWRMutations}</td><td style={tdStyle}>{t.compRQMutations}</td></tr>
            <tr><td style={tdStyle}>{t.compPagination}</td><td style={tdStyle}>{t.compSWRPagination}</td><td style={tdStyle}>{t.compRQPagination}</td></tr>
            <tr><td style={tdStyle}>{t.compSSR}</td><td style={tdStyle}>{t.compSWRSSR}</td><td style={tdStyle}>{t.compRQSSR}</td></tr>
            <tr><td style={tdStyle}>{t.compTS}</td><td style={tdStyle}>{t.compSWRTS}</td><td style={tdStyle}>{t.compRQTS}</td></tr>
            <tr><td style={tdStyle}>{t.compGC}</td><td style={tdStyle}>{t.compSWRGC}</td><td style={tdStyle}>{t.compRQGC}</td></tr>
            <tr><td style={tdStyle}>{t.compOffline}</td><td style={tdStyle}>{t.compSWROffline}</td><td style={tdStyle}>{t.compRQOffline}</td></tr>
            <tr><td style={tdStyle}>{t.compLearning}</td><td style={tdStyle}>{t.compSWRLearning}</td><td style={tdStyle}>{t.compRQLearning}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Basic Usage */}
      <h2 style={sectionTitle}>{t.h2BasicUsage}</h2>
      <p style={para}>{t.basicUsageDesc}</p>
      <p style={para}>{t.basicUsageDesc2}</p>
      <pre style={codeBlock}><code>{'import useSWR from \'swr\';\n\n'
        + '// Fetcher with error handling\n'
        + 'const fetcher = async (url) => {\n'
        + '  const res = await fetch(url);\n'
        + '  if (!res.ok) {\n'
        + '    const error = new Error(\'Failed to fetch\');\n'
        + '    error.info = await res.json();\n'
        + '    error.status = res.status;\n'
        + '    throw error;\n'
        + '  }\n'
        + '  return res.json();\n'
        + '};\n\n'
        + 'function Dashboard() {\n'
        + '  // data: response data (undefined if not yet loaded)\n'
        + '  // error: error thrown by fetcher (undefined if no error)\n'
        + '  // isLoading: true on first fetch with no cached data\n'
        + '  // isValidating: true whenever a request is in flight\n'
        + '  const { data, error, isLoading, isValidating, mutate } = useSWR(\n'
        + '    \'/api/dashboard\',\n'
        + '    fetcher,\n'
        + '    {\n'
        + '      revalidateOnFocus: true,\n'
        + '      revalidateOnReconnect: true,\n'
        + '      refreshInterval: 30000, // poll every 30 seconds\n'
        + '    }\n'
        + '  );\n\n'
        + '  if (isLoading) return <div>Loading dashboard...</div>;\n'
        + '  if (error) return <div>Error: {error.message}</div>;\n\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <h1>Dashboard</h1>\n'
        + '      {isValidating && <span>Refreshing...</span>}\n'
        + '      <p>Total users: {data.userCount}</p>\n'
        + '      <p>Revenue: {data.revenue}</p>\n'
        + '      <button onClick={() => mutate()}>Refresh</button>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Global Configuration */}
      <h2 style={sectionTitle}>{t.h2GlobalConfig}</h2>
      <p style={para}>{t.globalConfigDesc}</p>
      <p style={para}>{t.globalConfigDesc2}</p>
      <pre style={codeBlock}><code>{'import { SWRConfig } from \'swr\';\n\n'
        + 'const globalFetcher = (url) => fetch(url).then((r) => r.json());\n\n'
        + 'function App() {\n'
        + '  return (\n'
        + '    <SWRConfig\n'
        + '      value={{\n'
        + '        fetcher: globalFetcher,\n'
        + '        revalidateOnFocus: true,\n'
        + '        revalidateOnReconnect: true,\n'
        + '        dedupingInterval: 2000,\n'
        + '        errorRetryCount: 3,\n'
        + '        onError: (error, key) => {\n'
        + '          if (error.status === 403) {\n'
        + '            // Handle auth errors globally\n'
        + '            redirectToLogin();\n'
        + '          }\n'
        + '        },\n'
        + '      }}\n'
        + '    >\n'
        + '      <Dashboard />\n'
        + '    </SWRConfig>\n'
        + '  );\n'
        + '}\n\n'
        + '// No fetcher needed — uses global config\n'
        + 'function Dashboard() {\n'
        + '  const { data } = useSWR(\'/api/dashboard\');\n'
        + '  return <div>{data?.title}</div>;\n'
        + '}'}</code></pre>

      {/* Conditional Fetching */}
      <h2 style={sectionTitle}>{t.h2ConditionalFetching}</h2>
      <p style={para}>{t.conditionalDesc}</p>
      <p style={para}>{t.conditionalDesc2}</p>
      <pre style={codeBlock}><code>{'// Pass null to disable fetching\n'
        + 'function ProtectedData({ isLoggedIn }) {\n'
        + '  const { data } = useSWR(\n'
        + '    isLoggedIn ? \'/api/protected\' : null,\n'
        + '    fetcher\n'
        + '  );\n'
        + '  if (!isLoggedIn) return <div>Please log in</div>;\n'
        + '  return <div>{data?.message}</div>;\n'
        + '}\n\n'
        + '// Use a function key that throws when dependency is missing\n'
        + 'function UserOrders({ userId }) {\n'
        + '  const { data } = useSWR(\n'
        + '    () => userId ? \'/api/users/\' + userId + \'/orders\' : null,\n'
        + '    fetcher\n'
        + '  );\n'
        + '  return <div>{data?.orders.length} orders</div>;\n'
        + '}'}</code></pre>

      {/* Dependent Requests */}
      <h2 style={sectionTitle}>{t.h2DependentRequests}</h2>
      <p style={para}>{t.dependentDesc}</p>
      <p style={para}>{t.dependentDesc2}</p>
      <pre style={codeBlock}><code>{'function UserDashboard() {\n'
        + '  // First: fetch the current user\n'
        + '  const { data: user } = useSWR(\'/api/me\', fetcher);\n\n'
        + '  // Second: fetch projects only when user is loaded\n'
        + '  const { data: projects } = useSWR(\n'
        + '    () => user ? \'/api/users/\' + user.id + \'/projects\' : null,\n'
        + '    fetcher\n'
        + '  );\n\n'
        + '  // Third: fetch team only when user is loaded\n'
        + '  const { data: team } = useSWR(\n'
        + '    () => user ? \'/api/teams/\' + user.teamId : null,\n'
        + '    fetcher\n'
        + '  );\n\n'
        + '  if (!user) return <div>Loading user...</div>;\n\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <h1>Welcome, {user.name}</h1>\n'
        + '      <p>{projects?.length ?? \'...\'} projects</p>\n'
        + '      <p>Team: {team?.name ?? \'Loading...\'}</p>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Mutation */}
      <h2 style={sectionTitle}>{t.h2Mutation}</h2>
      <p style={para}>{t.mutationDesc}</p>

      <h3 style={subTitle}>{t.h3BoundMutate}</h3>
      <p style={para}>{t.boundMutateDesc}</p>
      <pre style={codeBlock}><code>{'function TodoList() {\n'
        + '  const { data: todos, mutate } = useSWR(\'/api/todos\', fetcher);\n\n'
        + '  const addTodo = async (text) => {\n'
        + '    // Revalidate after mutation (refetch from server)\n'
        + '    await fetch(\'/api/todos\', {\n'
        + '      method: \'POST\',\n'
        + '      body: JSON.stringify({ text }),\n'
        + '    });\n'
        + '    mutate(); // triggers revalidation\n'
        + '  };\n\n'
        + '  // Or update cache directly without revalidation\n'
        + '  const toggleTodo = async (id) => {\n'
        + '    await fetch(\'/api/todos/\' + id + \'/toggle\', { method: \'PATCH\' });\n'
        + '    mutate(\n'
        + '      todos.map((t) => t.id === id ? { ...t, done: !t.done } : t),\n'
        + '      false // set to false to skip revalidation\n'
        + '    );\n'
        + '  };\n\n'
        + '  return todos?.map((todo) => (\n'
        + '    <div key={todo.id} onClick={() => toggleTodo(todo.id)}>\n'
        + '      {todo.text}\n'
        + '    </div>\n'
        + '  ));\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3GlobalMutate}</h3>
      <p style={para}>{t.globalMutateDesc}</p>
      <pre style={codeBlock}><code>{'import { useSWRConfig } from \'swr\';\n\n'
        + 'function CreateProject() {\n'
        + '  const { mutate } = useSWRConfig();\n\n'
        + '  const handleCreate = async (formData) => {\n'
        + '    await fetch(\'/api/projects\', {\n'
        + '      method: \'POST\',\n'
        + '      body: JSON.stringify(formData),\n'
        + '    });\n\n'
        + '    // Revalidate the projects list\n'
        + '    mutate(\'/api/projects\');\n\n'
        + '    // Revalidate all keys matching a filter\n'
        + '    mutate(\n'
        + '      (key) => typeof key === \'string\' && key.startsWith(\'/api/projects\'),\n'
        + '      undefined,\n'
        + '      { revalidate: true }\n'
        + '    );\n'
        + '  };\n\n'
        + '  return <button onClick={() => handleCreate({ name: \'New\' })}>Create</button>;\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3UseSWRMutation}</h3>
      <p style={para}>{t.useSWRMutationDesc}</p>
      <pre style={codeBlock}><code>{'import useSWRMutation from \'swr/mutation\';\n\n'
        + '// Mutation fetcher receives (key, { arg })\n'
        + 'async function createTodo(url, { arg }) {\n'
        + '  const res = await fetch(url, {\n'
        + '    method: \'POST\',\n'
        + '    body: JSON.stringify(arg),\n'
        + '  });\n'
        + '  return res.json();\n'
        + '}\n\n'
        + 'function AddTodo() {\n'
        + '  const { trigger, isMutating, error } = useSWRMutation(\n'
        + '    \'/api/todos\',\n'
        + '    createTodo\n'
        + '  );\n\n'
        + '  const handleSubmit = async (e) => {\n'
        + '    e.preventDefault();\n'
        + '    try {\n'
        + '      const newTodo = await trigger({ text: \'Buy groceries\' });\n'
        + '      console.log(\'Created:\', newTodo);\n'
        + '    } catch (err) {\n'
        + '      console.error(\'Failed:\', err);\n'
        + '    }\n'
        + '  };\n\n'
        + '  return (\n'
        + '    <form onSubmit={handleSubmit}>\n'
        + '      <button disabled={isMutating}>\n'
        + '        {isMutating ? \'Adding...\' : \'Add Todo\'}\n'
        + '      </button>\n'
        + '      {error && <span>Error: {error.message}</span>}\n'
        + '    </form>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Optimistic Updates */}
      <h2 style={sectionTitle}>{t.h2OptimisticUpdates}</h2>
      <p style={para}>{t.optimisticDesc}</p>
      <pre style={codeBlock}><code>{'function LikeButton({ postId }) {\n'
        + '  const { data, mutate } = useSWR(\'/api/posts/\' + postId, fetcher);\n\n'
        + '  const handleLike = async () => {\n'
        + '    // Optimistic update: immediately show the new state\n'
        + '    const optimisticData = { ...data, likes: data.likes + 1, liked: true };\n\n'
        + '    await mutate(\n'
        + '      async () => {\n'
        + '        // This runs in the background\n'
        + '        const res = await fetch(\'/api/posts/\' + postId + \'/like\', {\n'
        + '          method: \'POST\',\n'
        + '        });\n'
        + '        return res.json();\n'
        + '      },\n'
        + '      {\n'
        + '        optimisticData,\n'
        + '        rollbackOnError: true, // revert if server fails\n'
        + '        populateCache: true,\n'
        + '        revalidate: false,\n'
        + '      }\n'
        + '    );\n'
        + '  };\n\n'
        + '  return (\n'
        + '    <button onClick={handleLike}>\n'
        + '      {data?.liked ? \'Liked\' : \'Like\'} ({data?.likes})\n'
        + '    </button>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Pagination */}
      <h2 style={sectionTitle}>{t.h2Pagination}</h2>
      <p style={para}>{t.paginationDesc}</p>
      <p style={para}>{t.paginationDesc2}</p>
      <pre style={codeBlock}><code>{'import useSWRInfinite from \'swr/infinite\';\n\n'
        + 'const PAGE_SIZE = 10;\n\n'
        + '// getKey receives page index and previous page data\n'
        + 'function getKey(pageIndex, previousPageData) {\n'
        + '  // Reached the end\n'
        + '  if (previousPageData && !previousPageData.length) return null;\n\n'
        + '  // First page, no previous data\n'
        + '  if (pageIndex === 0) return \'/api/posts?limit=\' + PAGE_SIZE;\n\n'
        + '  // Use cursor from last item\n'
        + '  return \'/api/posts?cursor=\'\n'
        + '    + previousPageData[previousPageData.length - 1].id\n'
        + '    + \'&limit=\' + PAGE_SIZE;\n'
        + '}\n\n'
        + 'function PostFeed() {\n'
        + '  const { data, size, setSize, isValidating, isLoading } =\n'
        + '    useSWRInfinite(getKey, fetcher);\n\n'
        + '  // Flatten all pages into a single array\n'
        + '  const posts = data ? data.flat() : [];\n'
        + '  const isEnd = data && data[data.length - 1]?.length < PAGE_SIZE;\n'
        + '  const isLoadingMore = isLoading\n'
        + '    || (size > 0 && data && typeof data[size - 1] === \'undefined\');\n\n'
        + '  return (\n'
        + '    <div>\n'
        + '      {posts.map((post) => (\n'
        + '        <article key={post.id}>{post.title}</article>\n'
        + '      ))}\n'
        + '      <button\n'
        + '        onClick={() => setSize(size + 1)}\n'
        + '        disabled={isLoadingMore || isEnd}\n'
        + '      >\n'
        + '        {isLoadingMore ? \'Loading...\' : isEnd ? \'No more\' : \'Load More\'}\n'
        + '      </button>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Prefetching */}
      <h2 style={sectionTitle}>{t.h2Prefetching}</h2>
      <p style={para}>{t.prefetchingDesc}</p>
      <p style={para}>{t.prefetchingDesc2}</p>
      <pre style={codeBlock}><code>{'import { preload } from \'swr\';\n\n'
        + '// Prefetch on module load\n'
        + 'preload(\'/api/config\', fetcher);\n\n'
        + '// Prefetch on hover\n'
        + 'function ProjectLink({ projectId }) {\n'
        + '  return (\n'
        + '    <a\n'
        + '      href={\'/projects/\' + projectId}\n'
        + '      onMouseEnter={() =>\n'
        + '        preload(\'/api/projects/\' + projectId, fetcher)\n'
        + '      }\n'
        + '    >\n'
        + '      View Project\n'
        + '    </a>\n'
        + '  );\n'
        + '}\n\n'
        + '// The component uses the prefetched data instantly\n'
        + 'function ProjectDetail({ projectId }) {\n'
        + '  const { data } = useSWR(\'/api/projects/\' + projectId, fetcher);\n'
        + '  // If preloaded, data is available immediately\n'
        + '  return <div>{data?.name}</div>;\n'
        + '}'}</code></pre>

      {/* Revalidation Strategies */}
      <h2 style={sectionTitle}>{t.h2Revalidation}</h2>
      <p style={para}>{t.revalidationDesc}</p>

      <h3 style={subTitle}>{t.h3Focus}</h3>
      <p style={para}>{t.focusDesc}</p>

      <h3 style={subTitle}>{t.h3Interval}</h3>
      <p style={para}>{t.intervalDesc}</p>

      <h3 style={subTitle}>{t.h3Reconnect}</h3>
      <p style={para}>{t.reconnectDesc}</p>
      <pre style={codeBlock}><code>{'// Configure revalidation strategies\n'
        + 'const { data } = useSWR(\'/api/stock-price\', fetcher, {\n'
        + '  // Revalidate on window focus (default: true)\n'
        + '  revalidateOnFocus: true,\n\n'
        + '  // Poll every 5 seconds\n'
        + '  refreshInterval: 5000,\n\n'
        + '  // Pause polling when tab is hidden\n'
        + '  refreshWhenHidden: false,\n\n'
        + '  // Continue polling when offline (default: false)\n'
        + '  refreshWhenOffline: false,\n\n'
        + '  // Revalidate on network reconnect (default: true)\n'
        + '  revalidateOnReconnect: true,\n\n'
        + '  // Skip revalidation on mount if cached data exists\n'
        + '  revalidateIfStale: true,\n'
        + '});\n\n'
        + '// useSWRImmutable — for data that never changes\n'
        + 'import useSWRImmutable from \'swr/immutable\';\n\n'
        + 'const { data: config } = useSWRImmutable(\'/api/config\', fetcher);\n'
        + '// Equivalent to:\n'
        + '// useSWR(key, fetcher, {\n'
        + '//   revalidateIfStale: false,\n'
        + '//   revalidateOnFocus: false,\n'
        + '//   revalidateOnReconnect: false,\n'
        + '// })'}</code></pre>

      {/* Error Handling */}
      <h2 style={sectionTitle}>{t.h2ErrorHandling}</h2>
      <p style={para}>{t.errorDesc}</p>
      <p style={para}>{t.errorDesc2}</p>
      <pre style={codeBlock}><code>{'import { SWRConfig } from \'swr\';\n\n'
        + '// Global error retry configuration\n'
        + '<SWRConfig\n'
        + '  value={{\n'
        + '    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {\n'
        + '      // Never retry on 404\n'
        + '      if (error.status === 404) return;\n\n'
        + '      // Never retry for a specific key\n'
        + '      if (key === \'/api/user\') return;\n\n'
        + '      // Stop after 10 retries\n'
        + '      if (retryCount >= 10) return;\n\n'
        + '      // Retry with exponential backoff\n'
        + '      setTimeout(\n'
        + '        () => revalidate({ retryCount }),\n'
        + '        Math.min(1000 * Math.pow(2, retryCount), 30000)\n'
        + '      );\n'
        + '    },\n'
        + '  }}\n'
        + '>\n'
        + '  <App />\n'
        + '</SWRConfig>\n\n'
        + '// Component-level error handling\n'
        + 'function UserData() {\n'
        + '  const { data, error, isLoading } = useSWR(\'/api/user\', fetcher, {\n'
        + '    errorRetryCount: 3,\n'
        + '    errorRetryInterval: 5000,\n'
        + '  });\n\n'
        + '  if (error) {\n'
        + '    return (\n'
        + '      <div role="alert">\n'
        + '        <h2>Something went wrong</h2>\n'
        + '        <p>{error.message}</p>\n'
        + '        <pre>{JSON.stringify(error.info, null, 2)}</pre>\n'
        + '      </div>\n'
        + '    );\n'
        + '  }\n\n'
        + '  return <div>{data?.name}</div>;\n'
        + '}'}</code></pre>

      {/* TypeScript */}
      <h2 style={sectionTitle}>{t.h2TypeScript}</h2>
      <p style={para}>{t.tsDesc}</p>
      <p style={para}>{t.tsDesc2}</p>
      <pre style={codeBlock}><code>{'import useSWR, { Fetcher, SWRResponse } from \'swr\';\n\n'
        + '// Define your data types\n'
        + 'interface User {\n'
        + '  id: number;\n'
        + '  name: string;\n'
        + '  email: string;\n'
        + '}\n\n'
        + 'interface ApiError {\n'
        + '  message: string;\n'
        + '  status: number;\n'
        + '}\n\n'
        + '// Typed fetcher\n'
        + 'const fetcher: Fetcher<User, string> = async (url) => {\n'
        + '  const res = await fetch(url);\n'
        + '  if (!res.ok) throw { message: \'Not found\', status: res.status };\n'
        + '  return res.json();\n'
        + '};\n\n'
        + '// SWR infers data as User and error as ApiError\n'
        + 'function UserProfile({ id }: { id: number }) {\n'
        + '  const { data, error } = useSWR<User, ApiError>(\n'
        + '    \'/api/users/\' + id,\n'
        + '    fetcher\n'
        + '  );\n\n'
        + '  // data is User | undefined\n'
        + '  // error is ApiError | undefined\n'
        + '  return <div>{data?.name}</div>;\n'
        + '}\n\n'
        + '// Reusable typed hook\n'
        + 'function useUser(id: number): SWRResponse<User, ApiError> {\n'
        + '  return useSWR<User, ApiError>(\'/api/users/\' + id, fetcher);\n'
        + '}'}</code></pre>

      {/* SSR with Next.js */}
      <h2 style={sectionTitle}>{t.h2SSR}</h2>
      <p style={para}>{t.ssrDesc}</p>
      <p style={para}>{t.ssrDesc2}</p>
      <pre style={codeBlock}><code>{'// app/page.tsx (Server Component)\n'
        + 'import { UserList } from \'./user-list\';\n\n'
        + 'export default async function Page() {\n'
        + '  // Fetch on the server\n'
        + '  const users = await fetch(\'https://api.example.com/users\').then(\n'
        + '    (r) => r.json()\n'
        + '  );\n\n'
        + '  return (\n'
        + '    <UserList fallbackData={users} />\n'
        + '  );\n'
        + '}\n\n'
        + '// app/user-list.tsx (Client Component)\n'
        + '\'use client\';\n'
        + 'import { SWRConfig } from \'swr\';\n'
        + 'import useSWR from \'swr\';\n\n'
        + 'function UserListInner() {\n'
        + '  // Uses fallback data on initial render, then revalidates\n'
        + '  const { data: users } = useSWR(\'/api/users\', fetcher);\n'
        + '  return users?.map((u) => <div key={u.id}>{u.name}</div>);\n'
        + '}\n\n'
        + 'export function UserList({ fallbackData }) {\n'
        + '  return (\n'
        + '    <SWRConfig value={{ fallback: { \'/api/users\': fallbackData } }}>\n'
        + '      <UserListInner />\n'
        + '    </SWRConfig>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Caching and Deduplication */}
      <h2 style={sectionTitle}>{t.h2CachingDedup}</h2>
      <p style={para}>{t.cachingDesc}</p>
      <p style={para}>{t.cachingDesc2}</p>
      <pre style={codeBlock}><code>{'import { SWRConfig } from \'swr\';\n\n'
        + '// Custom cache provider with localStorage persistence\n'
        + 'function localStorageCacheProvider() {\n'
        + '  const map = new Map(\n'
        + '    JSON.parse(localStorage.getItem(\'swr-cache\') || \'[]\')\n'
        + '  );\n\n'
        + '  // Save to localStorage before unload\n'
        + '  window.addEventListener(\'beforeunload\', () => {\n'
        + '    const entries = JSON.stringify(Array.from(map.entries()));\n'
        + '    localStorage.setItem(\'swr-cache\', entries);\n'
        + '  });\n\n'
        + '  return map;\n'
        + '}\n\n'
        + 'function App() {\n'
        + '  return (\n'
        + '    <SWRConfig\n'
        + '      value={{\n'
        + '        provider: localStorageCacheProvider,\n'
        + '        dedupingInterval: 5000, // 5-second dedup window\n'
        + '      }}\n'
        + '    >\n'
        + '      <Dashboard />\n'
        + '    </SWRConfig>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Middleware */}
      <h2 style={sectionTitle}>{t.h2Middleware}</h2>
      <p style={para}>{t.middlewareDesc}</p>
      <pre style={codeBlock}><code>{'// Logging middleware\n'
        + 'function logger(useSWRNext) {\n'
        + '  return (key, fetcher, config) => {\n'
        + '    const swr = useSWRNext(key, fetcher, config);\n\n'
        + '    // Log whenever data changes\n'
        + '    React.useEffect(() => {\n'
        + '      console.log(\'[SWR]\', key, swr.data);\n'
        + '    }, [key, swr.data]);\n\n'
        + '    return swr;\n'
        + '  };\n'
        + '}\n\n'
        + '// Auth token injection middleware\n'
        + 'function withAuth(useSWRNext) {\n'
        + '  return (key, fetcher, config) => {\n'
        + '    const authFetcher = (url) => {\n'
        + '      const token = getAuthToken();\n'
        + '      return fetch(url, {\n'
        + '        headers: { Authorization: \'Bearer \' + token },\n'
        + '      }).then((r) => r.json());\n'
        + '    };\n'
        + '    return useSWRNext(key, authFetcher, config);\n'
        + '  };\n'
        + '}\n\n'
        + '// Use middleware globally or per-hook\n'
        + '<SWRConfig value={{ use: [logger, withAuth] }}>\n'
        + '  <App />\n'
        + '</SWRConfig>\n\n'
        + '// Or per-hook\n'
        + 'useSWR(\'/api/data\', fetcher, { use: [logger] });'}</code></pre>

      {/* Testing */}
      <h2 style={sectionTitle}>{t.h2Testing}</h2>
      <p style={para}>{t.testingDesc}</p>
      <pre style={codeBlock}><code>{'import { render, screen, waitFor } from \'@testing-library/react\';\n'
        + 'import { SWRConfig } from \'swr\';\n\n'
        + '// Wrapper to isolate SWR cache between tests\n'
        + 'function SWRWrapper({ children }) {\n'
        + '  return (\n'
        + '    <SWRConfig\n'
        + '      value={{\n'
        + '        provider: () => new Map(),\n'
        + '        dedupingInterval: 0,\n'
        + '      }}\n'
        + '    >\n'
        + '      {children}\n'
        + '    </SWRConfig>\n'
        + '  );\n'
        + '}\n\n'
        + '// Test with mock fetcher\n'
        + 'test(\'renders user name\', async () => {\n'
        + '  const mockUser = { id: 1, name: \'Alice\' };\n\n'
        + '  render(\n'
        + '    <SWRConfig value={{\n'
        + '      provider: () => new Map(),\n'
        + '      fallback: { \'/api/user\': mockUser },\n'
        + '    }}>\n'
        + '      <UserProfile />\n'
        + '    </SWRConfig>\n'
        + '  );\n\n'
        + '  await waitFor(() => {\n'
        + '    expect(screen.getByText(\'Alice\')).toBeInTheDocument();\n'
        + '  });\n'
        + '});'}</code></pre>

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
