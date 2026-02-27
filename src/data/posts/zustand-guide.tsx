'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Zustand Complete Guide: Lightweight State Management for React (2026)',
    description: 'Comprehensive Zustand guide covering store creation, selectors, async actions, middleware (persist, devtools, immer), TypeScript integration, slices pattern, Next.js SSR, testing, performance optimization, and best practices.',
    tldr: 'Zustand is a minimal, unopinionated state management library for React that uses a hook-based API with no providers or boilerplate. Create a store with create(), consume it with a hook, and enjoy automatic re-render optimization through selectors. It supports middleware like persist, devtools, and immer out of the box, works great with TypeScript, and handles SSR in Next.js gracefully. At under 1KB gzipped, Zustand is the go-to choice when Redux feels too heavy and Context re-renders too much.',
    h2WhatIs: 'What Is Zustand and Why Use It?',
    whatIsDesc: 'Zustand (German for "state") is a small, fast, and scalable state management library for React. Created by the team behind Jotai and React Spring, Zustand provides a simple hook-based API that eliminates the need for providers, reducers, or action creators. It stores state outside of React, which means updates only trigger re-renders in components that actually use the changed data.',
    h3Comparison: 'Zustand vs Redux vs Jotai vs Recoil vs Context',
    comparisonDesc: 'Each state management solution has trade-offs. Here is how Zustand compares to the alternatives.',
    thFeature: 'Feature',
    thZustand: 'Zustand',
    thRedux: 'Redux Toolkit',
    thJotai: 'Jotai',
    thRecoil: 'Recoil',
    thContext: 'React Context',
    compBoilerplate: 'Boilerplate',
    compMinimal: 'Minimal',
    compModerate: 'Moderate',
    compLow: 'Low',
    compMedium: 'Medium',
    compProviderNeeded: 'Provider needed',
    compNo: 'No',
    compYes: 'Yes',
    compBundle: 'Bundle size',
    comp1kb: '~1KB',
    comp11kb: '~11KB',
    comp3kb: '~3KB',
    comp14kb: '~14KB',
    comp0kb: '0KB (built-in)',
    compDevtools: 'DevTools',
    compMiddleware: 'Middleware',
    compBuiltIn: 'Built-in',
    compExtension: 'Extension',
    compThirdParty: 'Third party',
    compNone: 'None',
    compTS: 'TypeScript',
    compExcellent: 'Excellent',
    compGood: 'Good',
    compSSR: 'SSR support',
    compNative: 'Native',
    compNeedsSetup: 'Needs setup',
    compLimited: 'Limited',
    h2CreateStore: 'Creating Stores with create()',
    createStoreDesc: 'A Zustand store is created by calling create() with a function that receives set and get. The returned value is a React hook that components use to access the store.',
    h3BasicStore: 'Basic Store',
    basicStoreDesc: 'The simplest store holds state and actions together. The set function merges partial state by default, similar to React setState.',
    h3GetState: 'Accessing State Outside React',
    getStateDesc: 'Zustand stores can be accessed outside of React components. The hook itself has getState() and setState() methods for imperative access.',
    h2Selectors: 'Selectors and Preventing Re-renders',
    selectorsDesc: 'By default, calling useStore() subscribes to the entire store and re-renders on every change. Use selectors to pick only the state slices your component needs.',
    h3BasicSelector: 'Basic Selectors',
    basicSelectorDesc: 'Pass a selector function to the hook to extract specific state. The component only re-renders when the selected value changes (using Object.is comparison).',
    h3ShallowSelector: 'Shallow Equality for Object Selectors',
    shallowSelectorDesc: 'When selecting multiple values, use shallow from zustand/shallow to compare by shallow equality instead of referential equality. This prevents unnecessary re-renders when the object shape is the same.',
    h2Actions: 'Actions and Async Actions',
    actionsDesc: 'Actions in Zustand are just functions inside the store that call set(). There is no dispatch, no action types, no reducers. Async actions are equally straightforward.',
    h3SyncActions: 'Synchronous Actions',
    syncActionsDesc: 'Define actions alongside state. The set function accepts a partial state object or an updater function that receives the current state.',
    h3AsyncActions: 'Asynchronous Actions',
    asyncActionsDesc: 'Async actions are regular async functions. Call set() when the data is ready. You can track loading and error states inside the store.',
    h2Middleware: 'Middleware: persist, devtools, immer, subscribeWithSelector',
    middlewareDesc: 'Zustand supports middleware that wraps the store creator to add functionality. Middleware composes by nesting.',
    h3Persist: 'persist — Automatic Local Storage',
    persistDesc: 'The persist middleware saves state to localStorage (or any storage) and rehydrates it on page load. You can configure which parts of the state to persist.',
    h3Devtools: 'devtools — Redux DevTools Integration',
    devtoolsDesc: 'The devtools middleware connects your store to Redux DevTools for time-travel debugging and action inspection.',
    h3Immer: 'immer — Immutable Updates Made Easy',
    immerDesc: 'The immer middleware lets you write mutable-looking code that produces immutable updates. This is especially helpful for deeply nested state.',
    h3Subscribe: 'subscribeWithSelector — Fine-Grained Subscriptions',
    subscribeDesc: 'The subscribeWithSelector middleware enables subscribing to specific state slices outside of React. This is useful for side effects, logging, or syncing with external systems.',
    h2TypeScript: 'TypeScript Integration and Typed Stores',
    tsDesc: 'Zustand has first-class TypeScript support. Define an interface for your state and pass it as a generic to create().',
    h3TypedStore: 'Fully Typed Store',
    typedStoreDesc: 'Define a State interface that includes both state and actions. Pass it as a generic parameter to create for complete type safety.',
    h3TypedSelectors: 'Typed Selectors',
    typedSelectorsDesc: 'Selectors automatically infer return types. You can also type selector functions explicitly for complex transformations.',
    h2Slices: 'Slices Pattern for Large Stores',
    slicesDesc: 'For large applications, split your store into slices. Each slice manages a subset of state and can access other slices through the full store.',
    h3CreatingSlices: 'Creating and Combining Slices',
    creatingSlicesDesc: 'Each slice is a function that receives set and get and returns a partial state object. Combine slices into a single create() call.',
    h2NextJS: 'Using Zustand with Next.js (SSR Hydration)',
    nextjsDesc: 'Zustand works with Next.js but requires special handling for server-side rendering. The key challenge is avoiding shared state between requests on the server.',
    h3NextSetup: 'SSR-Safe Store Setup',
    nextSetupDesc: 'Create a store factory that produces a new store per request on the server. Use a React context provider to pass the store instance to components.',
    h2Testing: 'Testing Zustand Stores',
    testingDesc: 'Zustand stores are plain JavaScript objects, making them easy to test without React rendering. You can test stores in isolation or with components.',
    h3UnitTesting: 'Unit Testing a Store',
    unitTestingDesc: 'Test store logic by calling actions and checking state directly. No React rendering needed.',
    h3ComponentTesting: 'Testing Components with Stores',
    componentTestingDesc: 'When testing components that use Zustand stores, reset the store before each test to avoid state leaking between tests.',
    h2VsContext: 'Zustand vs React Context',
    vsContextDesc: 'React Context is built-in and simple, but it has a critical performance problem: any update to the context value re-renders every consumer. Zustand solves this by storing state outside React and using selectors for granular subscriptions.',
    vsContextProblem: 'The React Context Problem',
    vsContextProblemDesc: 'With Context, changing a single value re-renders every component that consumes the context, even if that component does not use the changed value. Zustand components only re-render when their selected slice of state changes.',
    h2Performance: 'Performance Optimization',
    perfDesc: 'Zustand is fast by default, but there are patterns to squeeze out maximum performance in large applications.',
    h3AtomicSelectors: 'Atomic Selectors',
    atomicSelectorsDesc: 'Select the smallest unit of state possible. Avoid selecting entire objects when you only need one property.',
    h3TransientUpdates: 'Transient Updates (No Re-render)',
    transientDesc: 'Use subscribe() for updates that should not trigger re-renders, like animations or frequent data streams.',
    h2BestPractices: 'Best Practices and Common Patterns',
    bp1: 'Keep stores small and focused on a single domain — prefer multiple stores over one mega store',
    bp2: 'Always use selectors to prevent unnecessary re-renders — never call useStore() without arguments',
    bp3: 'Colocate actions with the state they modify inside the store',
    bp4: 'Use the immer middleware for deeply nested state updates',
    bp5: 'Reset stores in test setup to prevent state leaking between tests',
    bp6: 'Use persist middleware with partialize to only save essential data to storage',
    bp7: 'Prefer useShallow from zustand/shallow when selecting multiple values',
    bp8: 'For SSR, create store instances per request and pass them via context',
    h2FAQ: 'Frequently Asked Questions',
    faq1Q: 'Is Zustand better than Redux?',
    faq1A: 'Zustand is not universally better but is a strong choice for most applications. Redux Toolkit remains a good option for very large teams that benefit from strict conventions, middleware ecosystem, and established patterns. Zustand excels when you want minimal boilerplate, smaller bundle size, and a simpler mental model. For new projects in 2026, Zustand is often the recommended starting point.',
    faq2Q: 'Does Zustand need a Provider component?',
    faq2A: 'No. Zustand stores exist outside of the React tree by default, so no Provider is needed. This is one of its biggest advantages — you can use the store hook anywhere without wrapping your app. The only exception is SSR scenarios where you need per-request store instances, in which case you create a custom provider.',
    faq3Q: 'Can Zustand replace React Context for global state?',
    faq3A: 'Yes, and it is recommended for most cases. React Context re-renders all consumers when any value changes, while Zustand uses selectors to re-render only the components that use the changed data. For theme toggles or locale, Context is fine. For frequently changing data (form state, real-time data, UI state), Zustand is significantly more performant.',
    faq4Q: 'How does Zustand handle TypeScript?',
    faq4A: 'Zustand has excellent TypeScript support. You define a State interface and pass it as a generic to create(). All selectors, actions, and middleware are fully typed. The create() function infers types from the initial state when no generic is provided, though explicit typing is recommended for complex stores.',
    faq5Q: 'Can Zustand persist state to localStorage?',
    faq5A: 'Yes, using the built-in persist middleware. It automatically saves state to localStorage and rehydrates it on page load. You can customize the storage engine (sessionStorage, AsyncStorage for React Native, or any custom storage), choose which state slices to persist with partialize, and configure migration functions for schema changes.',
    faq6Q: 'How do I use Zustand with Next.js SSR?',
    faq6A: 'Create a store factory function that returns a new store instance. On the server, each request gets its own store to prevent shared state between users. Pass the store via a React context provider and use a custom hook to access it. Zustand provides a createStore function (without the React hook wrapper) specifically for this pattern.',
    faq7Q: 'How does Zustand compare to Jotai?',
    faq7A: 'Both are created by the same team (Poimandres). Zustand uses a top-down approach with stores, while Jotai uses a bottom-up atomic approach similar to Recoil. Choose Zustand when you have well-defined state shapes and want module-level access. Choose Jotai when you prefer atomic, composable pieces of state that are defined close to their consumers.',
    faq8Q: 'Is Zustand production-ready?',
    faq8A: 'Absolutely. Zustand is used in production by thousands of companies and has over 50,000 GitHub stars. It is actively maintained, well-documented, and has a stable API. Major companies use it for everything from small dashboards to large-scale applications.',
    keyTakeaway1: 'Zustand provides the simplest API for React state management — create a store, use a hook, done',
    keyTakeaway2: 'Selectors are the key to performance — always select only what you need',
    keyTakeaway3: 'Built-in middleware (persist, devtools, immer) covers the most common needs without extra packages',
    keyTakeaway4: 'TypeScript support is first-class with full type inference for stores, selectors, and middleware',
    keyTakeaway5: 'At under 1KB gzipped, Zustand adds virtually no overhead to your bundle',
    keyTakeaway6: 'The slices pattern scales to large applications while keeping code organized',
  },
  zh: {
    title: 'Zustand 完全指南：React 轻量级状态管理 (2026)',
    description: 'Zustand 完整指南，涵盖 store 创建、选择器、异步 actions、中间件（persist、devtools、immer）、TypeScript 集成、slices 模式、Next.js SSR、测试、性能优化和最佳实践。',
    tldr: 'Zustand 是一个极简的 React 状态管理库，使用基于 hook 的 API，无需 Provider 或样板代码。通过 create() 创建 store，通过 hook 消费状态，通过选择器自动优化重渲染。内置 persist、devtools 和 immer 中间件，完美支持 TypeScript，优雅处理 Next.js SSR。压缩后不到 1KB，当 Redux 太重而 Context 重渲染太多时，Zustand 是最佳选择。',
    h2WhatIs: '什么是 Zustand？为什么使用它？',
    whatIsDesc: 'Zustand（德语中意为"状态"）是一个小巧、快速、可扩展的 React 状态管理库。由 Jotai 和 React Spring 背后的团队创建，Zustand 提供简单的基于 hook 的 API，无需 Provider、reducer 或 action creator。它将状态存储在 React 外部，更新只会触发实际使用了变更数据的组件重渲染。',
    h3Comparison: 'Zustand vs Redux vs Jotai vs Recoil vs Context',
    comparisonDesc: '每种状态管理方案都有优缺点。以下是 Zustand 与其他方案的对比。',
    thFeature: '特性',
    thZustand: 'Zustand',
    thRedux: 'Redux Toolkit',
    thJotai: 'Jotai',
    thRecoil: 'Recoil',
    thContext: 'React Context',
    compBoilerplate: '样板代码',
    compMinimal: '极少',
    compModerate: '适中',
    compLow: '少',
    compMedium: '中等',
    compProviderNeeded: '需要 Provider',
    compNo: '不需要',
    compYes: '需要',
    compBundle: '包大小',
    comp1kb: '~1KB',
    comp11kb: '~11KB',
    comp3kb: '~3KB',
    comp14kb: '~14KB',
    comp0kb: '0KB（内置）',
    compDevtools: '开发者工具',
    compMiddleware: '中间件',
    compBuiltIn: '内置',
    compExtension: '扩展',
    compThirdParty: '第三方',
    compNone: '无',
    compTS: 'TypeScript',
    compExcellent: '优秀',
    compGood: '良好',
    compSSR: 'SSR 支持',
    compNative: '原生',
    compNeedsSetup: '需配置',
    compLimited: '有限',
    h2CreateStore: '使用 create() 创建 Store',
    createStoreDesc: '通过调用 create() 并传入接收 set 和 get 的函数来创建 Zustand store。返回值是一个 React hook，组件用它来访问 store。',
    h3BasicStore: '基础 Store',
    basicStoreDesc: '最简单的 store 将状态和 actions 放在一起。set 函数默认合并部分状态，类似 React 的 setState。',
    h3GetState: '在 React 外部访问状态',
    getStateDesc: 'Zustand store 可以在 React 组件外部访问。hook 本身有 getState() 和 setState() 方法用于命令式访问。',
    h2Selectors: '选择器和防止重渲染',
    selectorsDesc: '默认情况下，调用 useStore() 会订阅整个 store 并在每次变更时重渲染。使用选择器只选取组件需要的状态片段。',
    h3BasicSelector: '基础选择器',
    basicSelectorDesc: '向 hook 传入选择器函数来提取特定状态。组件只在选中的值变化时重渲染（使用 Object.is 比较）。',
    h3ShallowSelector: '对象选择器的浅比较',
    shallowSelectorDesc: '选择多个值时，使用 zustand/shallow 的 shallow 进行浅比较。这能防止对象结构相同时的不必要重渲染。',
    h2Actions: 'Actions 和异步 Actions',
    actionsDesc: 'Zustand 中的 actions 只是 store 内调用 set() 的函数。没有 dispatch，没有 action types，没有 reducers。异步 actions 同样简单。',
    h3SyncActions: '同步 Actions',
    syncActionsDesc: '将 actions 和状态一起定义。set 函数接受部分状态对象或接收当前状态的更新函数。',
    h3AsyncActions: '异步 Actions',
    asyncActionsDesc: '异步 actions 就是普通的 async 函数。数据准备好后调用 set()。可以在 store 内跟踪 loading 和 error 状态。',
    h2Middleware: '中间件：persist、devtools、immer、subscribeWithSelector',
    middlewareDesc: 'Zustand 支持包裹 store 创建器以添加功能的中间件。中间件通过嵌套进行组合。',
    h3Persist: 'persist — 自动本地存储',
    persistDesc: 'persist 中间件将状态保存到 localStorage（或任何存储）并在页面加载时恢复。可以配置哪些状态需要持久化。',
    h3Devtools: 'devtools — Redux DevTools 集成',
    devtoolsDesc: 'devtools 中间件将 store 连接到 Redux DevTools 进行时间旅行调试和 action 检查。',
    h3Immer: 'immer — 简化不可变更新',
    immerDesc: 'immer 中间件让你编写看起来可变的代码来产生不可变的更新。这对深层嵌套状态特别有用。',
    h3Subscribe: 'subscribeWithSelector — 细粒度订阅',
    subscribeDesc: 'subscribeWithSelector 中间件支持在 React 外部订阅特定的状态片段。适用于副作用、日志记录或与外部系统同步。',
    h2TypeScript: 'TypeScript 集成和类型化 Store',
    tsDesc: 'Zustand 提供一流的 TypeScript 支持。定义状态接口并作为泛型传递给 create()。',
    h3TypedStore: '完全类型化的 Store',
    typedStoreDesc: '定义包含状态和 actions 的 State 接口。作为泛型参数传递给 create 以获得完整的类型安全。',
    h3TypedSelectors: '类型化选择器',
    typedSelectorsDesc: '选择器自动推断返回类型。也可以为复杂转换显式地给选择器函数定类型。',
    h2Slices: '大型 Store 的 Slices 模式',
    slicesDesc: '对于大型应用，将 store 拆分为 slices。每个 slice 管理状态的子集，可以通过完整 store 访问其他 slices。',
    h3CreatingSlices: '创建和组合 Slices',
    creatingSlicesDesc: '每个 slice 是接收 set 和 get 并返回部分状态对象的函数。将 slices 组合到单个 create() 调用中。',
    h2NextJS: '在 Next.js 中使用 Zustand（SSR 水合）',
    nextjsDesc: 'Zustand 可以与 Next.js 配合使用，但需要对服务端渲染进行特殊处理。关键挑战是避免服务器上请求间共享状态。',
    h3NextSetup: 'SSR 安全的 Store 配置',
    nextSetupDesc: '创建一个 store 工厂，在服务器上为每个请求生成新的 store。使用 React context provider 将 store 实例传递给组件。',
    h2Testing: '测试 Zustand Stores',
    testingDesc: 'Zustand stores 是普通的 JavaScript 对象，无需 React 渲染即可轻松测试。可以单独测试 stores 或与组件一起测试。',
    h3UnitTesting: '单元测试 Store',
    unitTestingDesc: '通过调用 actions 并直接检查状态来测试 store 逻辑。无需 React 渲染。',
    h3ComponentTesting: '测试使用 Store 的组件',
    componentTestingDesc: '测试使用 Zustand stores 的组件时，在每个测试前重置 store 以避免测试间状态泄漏。',
    h2VsContext: 'Zustand vs React Context',
    vsContextDesc: 'React Context 是内置且简单的，但有一个关键的性能问题：context 值的任何更新都会重渲染每个消费者。Zustand 通过将状态存储在 React 外部并使用选择器进行细粒度订阅来解决这个问题。',
    vsContextProblem: 'React Context 的问题',
    vsContextProblemDesc: '使用 Context 时，更改单个值会重渲染消费该 context 的每个组件，即使该组件不使用更改的值。Zustand 组件只在其选择的状态片段变化时重渲染。',
    h2Performance: '性能优化',
    perfDesc: 'Zustand 默认就很快，但在大型应用中有一些模式可以榨取最大性能。',
    h3AtomicSelectors: '原子选择器',
    atomicSelectorsDesc: '选择尽可能小的状态单元。当只需要一个属性时，避免选择整个对象。',
    h3TransientUpdates: '瞬态更新（不触发重渲染）',
    transientDesc: '对不需要触发重渲染的更新使用 subscribe()，如动画或频繁的数据流。',
    h2BestPractices: '最佳实践和常见模式',
    bp1: '保持 store 小而专注于单一领域 — 多个 store 优于一个巨型 store',
    bp2: '始终使用选择器防止不必要的重渲染 — 永远不要无参数调用 useStore()',
    bp3: '将 actions 和它们修改的状态放在同一个 store 中',
    bp4: '对深层嵌套状态更新使用 immer 中间件',
    bp5: '在测试设置中重置 stores 以防止测试间状态泄漏',
    bp6: '使用 persist 中间件的 partialize 只保存必要数据到存储',
    bp7: '选择多个值时优先使用 zustand/shallow 的 useShallow',
    bp8: '对于 SSR，为每个请求创建 store 实例并通过 context 传递',
    h2FAQ: '常见问题',
    faq1Q: 'Zustand 比 Redux 好吗？',
    faq1A: 'Zustand 不是普遍更好，但对大多数应用是强有力的选择。Redux Toolkit 仍然适合受益于严格约定和中间件生态的大型团队。Zustand 在你需要最少样板代码、更小包体积和更简单心智模型时表现出色。',
    faq2Q: 'Zustand 需要 Provider 组件吗？',
    faq2A: '不需要。Zustand stores 默认存在于 React 树外部，不需要 Provider。唯一的例外是需要每个请求独立 store 实例的 SSR 场景。',
    faq3Q: 'Zustand 能替代 React Context 管理全局状态吗？',
    faq3A: '可以，而且推荐在大多数情况下使用。React Context 在任何值变化时重渲染所有消费者，而 Zustand 使用选择器只重渲染使用了变更数据的组件。',
    faq4Q: 'Zustand 如何处理 TypeScript？',
    faq4A: 'Zustand 有优秀的 TypeScript 支持。定义 State 接口并作为泛型传给 create()。所有选择器、actions 和中间件都完全类型化。',
    faq5Q: 'Zustand 能将状态持久化到 localStorage 吗？',
    faq5A: '可以，使用内置的 persist 中间件。它自动保存状态到 localStorage 并在页面加载时恢复。可以自定义存储引擎和持久化的状态片段。',
    faq6Q: '如何在 Next.js SSR 中使用 Zustand？',
    faq6A: '创建一个 store 工厂函数返回新的 store 实例。在服务器上，每个请求获得自己的 store 以防止用户间共享状态。通过 React context provider 传递 store。',
    faq7Q: 'Zustand 和 Jotai 有什么区别？',
    faq7A: '两者由同一团队创建。Zustand 使用自上而下的 store 方式，Jotai 使用自下而上的原子方式。当状态结构明确时选 Zustand，当偏好原子化、可组合的状态时选 Jotai。',
    faq8Q: 'Zustand 可以用于生产环境吗？',
    faq8A: '完全可以。Zustand 被数千家公司在生产中使用，在 GitHub 上有超过 50,000 颗星。它积极维护、文档完善且 API 稳定。',
    keyTakeaway1: 'Zustand 提供最简单的 React 状态管理 API — 创建 store，使用 hook，完成',
    keyTakeaway2: '选择器是性能的关键 — 始终只选择你需要的状态',
    keyTakeaway3: '内置中间件（persist、devtools、immer）覆盖最常见需求，无需额外包',
    keyTakeaway4: 'TypeScript 支持一流，stores、选择器和中间件都有完整类型推断',
    keyTakeaway5: '压缩后不到 1KB，Zustand 对包体积几乎零开销',
    keyTakeaway6: 'Slices 模式可扩展到大型应用同时保持代码组织有序',
  },
};

export default function ZustandGuide({ lang }: { lang: string }) {
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

  const preStyle: React.CSSProperties = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' };
  const h2Style: React.CSSProperties = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' };
  const h3Style: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem', color: '#334155' };
  const pStyle: React.CSSProperties = { marginBottom: '1rem', lineHeight: '1.75' };
  const thStyle: React.CSSProperties = { padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600 };
  const tdStyle: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0' };

  return (
    <article style={{ maxWidth: '820px', lineHeight: '1.75', color: '#334155' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0369a1' }}>TL;DR</strong>
        <p style={{ margin: 0 }}>{t.tldr}</p>
      </div>

      {/* What Is Zustand */}
      <h2 style={h2Style}>{t.h2WhatIs}</h2>
      <p style={pStyle}>{t.whatIsDesc}</p>
      <pre style={preStyle}><code>{'npm install zustand\n' + '# or\n' + 'yarn add zustand\n' + '# or\n' + 'pnpm add zustand'}</code></pre>

      {/* Comparison Table */}
      <h3 style={h3Style}>{t.h3Comparison}</h3>
      <p style={pStyle}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={thStyle}>{t.thFeature}</th>
              <th style={thStyle}>{t.thZustand}</th>
              <th style={thStyle}>{t.thRedux}</th>
              <th style={thStyle}>{t.thJotai}</th>
              <th style={thStyle}>{t.thRecoil}</th>
              <th style={thStyle}>{t.thContext}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>{t.compBoilerplate}</td><td style={tdStyle}>{t.compMinimal}</td><td style={tdStyle}>{t.compModerate}</td><td style={tdStyle}>{t.compMinimal}</td><td style={tdStyle}>{t.compMedium}</td><td style={tdStyle}>{t.compLow}</td></tr>
            <tr><td style={tdStyle}>{t.compProviderNeeded}</td><td style={tdStyle}>{t.compNo}</td><td style={tdStyle}>{t.compYes}</td><td style={tdStyle}>{t.compYes}</td><td style={tdStyle}>{t.compYes}</td><td style={tdStyle}>{t.compYes}</td></tr>
            <tr><td style={tdStyle}>{t.compBundle}</td><td style={tdStyle}>{t.comp1kb}</td><td style={tdStyle}>{t.comp11kb}</td><td style={tdStyle}>{t.comp3kb}</td><td style={tdStyle}>{t.comp14kb}</td><td style={tdStyle}>{t.comp0kb}</td></tr>
            <tr><td style={tdStyle}>{t.compDevtools}</td><td style={tdStyle}>{t.compMiddleware}</td><td style={tdStyle}>{t.compBuiltIn}</td><td style={tdStyle}>{t.compThirdParty}</td><td style={tdStyle}>{t.compExtension}</td><td style={tdStyle}>{t.compNone}</td></tr>
            <tr><td style={tdStyle}>{t.compTS}</td><td style={tdStyle}>{t.compExcellent}</td><td style={tdStyle}>{t.compGood}</td><td style={tdStyle}>{t.compExcellent}</td><td style={tdStyle}>{t.compGood}</td><td style={tdStyle}>{t.compExcellent}</td></tr>
            <tr><td style={tdStyle}>{t.compSSR}</td><td style={tdStyle}>{t.compNative}</td><td style={tdStyle}>{t.compNeedsSetup}</td><td style={tdStyle}>{t.compNative}</td><td style={tdStyle}>{t.compLimited}</td><td style={tdStyle}>{t.compNative}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Creating Stores */}
      <h2 style={h2Style}>{t.h2CreateStore}</h2>
      <p style={pStyle}>{t.createStoreDesc}</p>

      <h3 style={h3Style}>{t.h3BasicStore}</h3>
      <p style={pStyle}>{t.basicStoreDesc}</p>
      <pre style={preStyle}><code>{'import { create } from \'zustand\';\n\n' + '// Create a counter store\n' + 'const useCounterStore = create((set) => ({\n' + '  count: 0,\n' + '  increment: () => set((state) => ({ count: state.count + 1 })),\n' + '  decrement: () => set((state) => ({ count: state.count - 1 })),\n' + '  reset: () => set({ count: 0 }),\n' + '}));\n\n' + '// Use in a component — no Provider needed!\n' + 'function Counter() {\n' + '  const count = useCounterStore((state) => state.count);\n' + '  const increment = useCounterStore((state) => state.increment);\n' + '  const decrement = useCounterStore((state) => state.decrement);\n\n' + '  return (\n' + '    <div>\n' + '      <span>{count}</span>\n' + '      <button onClick={increment}>+</button>\n' + '      <button onClick={decrement}>-</button>\n' + '    </div>\n' + '  );\n' + '}'}</code></pre>

      <h3 style={h3Style}>{t.h3GetState}</h3>
      <p style={pStyle}>{t.getStateDesc}</p>
      <pre style={preStyle}><code>{'// Access state outside React\n' + 'const currentCount = useCounterStore.getState().count;\n\n' + '// Update state imperatively\n' + 'useCounterStore.setState({ count: 10 });\n\n' + '// Subscribe to all changes\n' + 'const unsub = useCounterStore.subscribe((state) => {\n' + '  console.log(\'Count changed:\', state.count);\n' + '});\n\n' + '// Unsubscribe when done\n' + 'unsub();'}</code></pre>

      {/* Selectors */}
      <h2 style={h2Style}>{t.h2Selectors}</h2>
      <p style={pStyle}>{t.selectorsDesc}</p>

      <h3 style={h3Style}>{t.h3BasicSelector}</h3>
      <p style={pStyle}>{t.basicSelectorDesc}</p>
      <pre style={preStyle}><code>{'const useTodoStore = create((set) => ({\n' + '  todos: [],\n' + '  filter: \'all\',\n' + '  addTodo: (text) => set((state) => ({\n' + '    todos: [...state.todos, { id: Date.now(), text, done: false }],\n' + '  })),\n' + '  toggleTodo: (id) => set((state) => ({\n' + '    todos: state.todos.map((t) =>\n' + '      t.id === id ? { ...t, done: !t.done } : t\n' + '    ),\n' + '  })),\n' + '  setFilter: (filter) => set({ filter }),\n' + '}));\n\n' + '// Only re-renders when todos array changes\n' + 'function TodoList() {\n' + '  const todos = useTodoStore((state) => state.todos);\n' + '  return todos.map((todo) => <div key={todo.id}>{todo.text}</div>);\n' + '}\n\n' + '// Only re-renders when filter changes\n' + 'function FilterBar() {\n' + '  const filter = useTodoStore((state) => state.filter);\n' + '  const setFilter = useTodoStore((state) => state.setFilter);\n' + '  return <select value={filter} onChange={(e) => setFilter(e.target.value)} />;\n' + '}'}</code></pre>

      <h3 style={h3Style}>{t.h3ShallowSelector}</h3>
      <p style={pStyle}>{t.shallowSelectorDesc}</p>
      <pre style={preStyle}><code>{'import { useShallow } from \'zustand/shallow\';\n\n' + '// BAD: creates a new object every render -> infinite re-renders\n' + '// const { name, email } = useUserStore((s) => ({ name: s.name, email: s.email }));\n\n' + '// GOOD: useShallow compares each property individually\n' + 'function UserProfile() {\n' + '  const { name, email } = useUserStore(\n' + '    useShallow((state) => ({ name: state.name, email: state.email }))\n' + '  );\n' + '  return <div>{name} ({email})</div>;\n' + '}\n\n' + '// Also works with arrays\n' + 'function UserActions() {\n' + '  const [updateName, updateEmail] = useUserStore(\n' + '    useShallow((s) => [s.updateName, s.updateEmail])\n' + '  );\n' + '  // ...\n' + '}'}</code></pre>

      {/* Actions */}
      <h2 style={h2Style}>{t.h2Actions}</h2>
      <p style={pStyle}>{t.actionsDesc}</p>

      <h3 style={h3Style}>{t.h3SyncActions}</h3>
      <p style={pStyle}>{t.syncActionsDesc}</p>
      <pre style={preStyle}><code>{'const useCartStore = create((set, get) => ({\n' + '  items: [],\n' + '  totalPrice: 0,\n\n' + '  addItem: (product) => set((state) => {\n' + '    const existing = state.items.find((i) => i.id === product.id);\n' + '    if (existing) {\n' + '      return {\n' + '        items: state.items.map((i) =>\n' + '          i.id === product.id ? { ...i, qty: i.qty + 1 } : i\n' + '        ),\n' + '      };\n' + '    }\n' + '    return { items: [...state.items, { ...product, qty: 1 }] };\n' + '  }),\n\n' + '  removeItem: (id) => set((state) => ({\n' + '    items: state.items.filter((i) => i.id !== id),\n' + '  })),\n\n' + '  // Use get() to read current state inside an action\n' + '  calculateTotal: () => {\n' + '    const { items } = get();\n' + '    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);\n' + '    set({ totalPrice: total });\n' + '  },\n' + '}));'}</code></pre>

      <h3 style={h3Style}>{t.h3AsyncActions}</h3>
      <p style={pStyle}>{t.asyncActionsDesc}</p>
      <pre style={preStyle}><code>{'const usePostStore = create((set) => ({\n' + '  posts: [],\n' + '  loading: false,\n' + '  error: null,\n\n' + '  fetchPosts: async () => {\n' + '    set({ loading: true, error: null });\n' + '    try {\n' + '      const res = await fetch(\'/api/posts\');\n' + '      const posts = await res.json();\n' + '      set({ posts, loading: false });\n' + '    } catch (err) {\n' + '      set({ error: err.message, loading: false });\n' + '    }\n' + '  },\n\n' + '  createPost: async (data) => {\n' + '    const res = await fetch(\'/api/posts\', {\n' + '      method: \'POST\',\n' + '      headers: { \'Content-Type\': \'application/json\' },\n' + '      body: JSON.stringify(data),\n' + '    });\n' + '    const newPost = await res.json();\n' + '    set((state) => ({ posts: [newPost, ...state.posts] }));\n' + '  },\n' + '}));'}</code></pre>

      {/* Middleware */}
      <h2 style={h2Style}>{t.h2Middleware}</h2>
      <p style={pStyle}>{t.middlewareDesc}</p>

      <h3 style={h3Style}>{t.h3Persist}</h3>
      <p style={pStyle}>{t.persistDesc}</p>
      <pre style={preStyle}><code>{'import { create } from \'zustand\';\n' + 'import { persist, createJSONStorage } from \'zustand/middleware\';\n\n' + 'const useSettingsStore = create(\n' + '  persist(\n' + '    (set) => ({\n' + '      theme: \'light\',\n' + '      fontSize: 16,\n' + '      language: \'en\',\n' + '      setTheme: (theme) => set({ theme }),\n' + '      setFontSize: (fontSize) => set({ fontSize }),\n' + '      setLanguage: (language) => set({ language }),\n' + '    }),\n' + '    {\n' + '      name: \'app-settings\', // localStorage key\n' + '      storage: createJSONStorage(() => localStorage),\n' + '      // Only persist these fields\n' + '      partialize: (state) => ({\n' + '        theme: state.theme,\n' + '        fontSize: state.fontSize,\n' + '        language: state.language,\n' + '      }),\n' + '    }\n' + '  )\n' + ');'}</code></pre>

      <h3 style={h3Style}>{t.h3Devtools}</h3>
      <p style={pStyle}>{t.devtoolsDesc}</p>
      <pre style={preStyle}><code>{'import { create } from \'zustand\';\n' + 'import { devtools } from \'zustand/middleware\';\n\n' + 'const useStore = create(\n' + '  devtools(\n' + '    (set) => ({\n' + '      count: 0,\n' + '      increment: () => set(\n' + '        (state) => ({ count: state.count + 1 }),\n' + '        false,        // replace: false (merge)\n' + '        \'increment\'   // action name in DevTools\n' + '      ),\n' + '    }),\n' + '    { name: \'MyAppStore\' } // DevTools instance name\n' + '  )\n' + ');'}</code></pre>

      <h3 style={h3Style}>{t.h3Immer}</h3>
      <p style={pStyle}>{t.immerDesc}</p>
      <pre style={preStyle}><code>{'import { create } from \'zustand\';\n' + 'import { immer } from \'zustand/middleware/immer\';\n\n' + 'const useNestedStore = create(\n' + '  immer((set) => ({\n' + '    user: {\n' + '      profile: {\n' + '        name: \'Alice\',\n' + '        address: { city: \'NYC\', zip: \'10001\' },\n' + '      },\n' + '      settings: { notifications: true },\n' + '    },\n\n' + '    // Without immer you would need:\n' + '    // set((s) => ({ user: { ...s.user, profile: { ...s.user.profile,\n' + '    //   address: { ...s.user.profile.address, city: newCity } } } }))\n\n' + '    // With immer, just mutate the draft:\n' + '    updateCity: (city) => set((state) => {\n' + '      state.user.profile.address.city = city;\n' + '    }),\n\n' + '    toggleNotifications: () => set((state) => {\n' + '      state.user.settings.notifications =\n' + '        !state.user.settings.notifications;\n' + '    }),\n' + '  }))\n' + ');\n\n' + '// Combine middleware: immer + devtools + persist\n' + 'const useAppStore = create(\n' + '  devtools(\n' + '    persist(\n' + '      immer((set) => ({\n' + '        // your state and actions\n' + '      })),\n' + '      { name: \'app-storage\' }\n' + '    ),\n' + '    { name: \'AppStore\' }\n' + '  )\n' + ');'}</code></pre>

      <h3 style={h3Style}>{t.h3Subscribe}</h3>
      <p style={pStyle}>{t.subscribeDesc}</p>
      <pre style={preStyle}><code>{'import { create } from \'zustand\';\n' + 'import { subscribeWithSelector } from \'zustand/middleware\';\n\n' + 'const useStore = create(\n' + '  subscribeWithSelector((set) => ({\n' + '    count: 0,\n' + '    increment: () => set((s) => ({ count: s.count + 1 })),\n' + '  }))\n' + ');\n\n' + '// Subscribe to a specific slice\n' + 'const unsub = useStore.subscribe(\n' + '  (state) => state.count,        // selector\n' + '  (count, prevCount) => {         // listener\n' + '    console.log(\'Count:\', prevCount, \'->\', count);\n' + '    if (count >= 10) {\n' + '      console.log(\'Reached 10!\');\n' + '    }\n' + '  },\n' + '  { fireImmediately: true }       // options\n' + ');'}</code></pre>

      {/* TypeScript */}
      <h2 style={h2Style}>{t.h2TypeScript}</h2>
      <p style={pStyle}>{t.tsDesc}</p>

      <h3 style={h3Style}>{t.h3TypedStore}</h3>
      <p style={pStyle}>{t.typedStoreDesc}</p>
      <pre style={preStyle}><code>{'interface AuthState {\n' + '  user: { id: string; name: string; email: string } | null;\n' + '  token: string | null;\n' + '  isAuthenticated: boolean;\n' + '  login: (email: string, password: string) => Promise<void>;\n' + '  logout: () => void;\n' + '  updateProfile: (data: Partial<{ name: string; email: string }>) => void;\n' + '}\n\n' + 'const useAuthStore = create<AuthState>()((set) => ({\n' + '  user: null,\n' + '  token: null,\n' + '  isAuthenticated: false,\n\n' + '  login: async (email, password) => {\n' + '    const res = await fetch(\'/api/login\', {\n' + '      method: \'POST\',\n' + '      body: JSON.stringify({ email, password }),\n' + '    });\n' + '    const { user, token } = await res.json();\n' + '    set({ user, token, isAuthenticated: true });\n' + '  },\n\n' + '  logout: () => set({\n' + '    user: null, token: null, isAuthenticated: false,\n' + '  }),\n\n' + '  updateProfile: (data) => set((state) => ({\n' + '    user: state.user ? { ...state.user, ...data } : null,\n' + '  })),\n' + '}));'}</code></pre>

      <h3 style={h3Style}>{t.h3TypedSelectors}</h3>
      <p style={pStyle}>{t.typedSelectorsDesc}</p>
      <pre style={preStyle}><code>{'// Type is inferred automatically\n' + 'function NavBar() {\n' + '  // userName: string | undefined (inferred)\n' + '  const userName = useAuthStore((s) => s.user?.name);\n' + '  // isAuth: boolean (inferred)\n' + '  const isAuth = useAuthStore((s) => s.isAuthenticated);\n\n' + '  return isAuth ? <span>Hello, {userName}</span> : <LoginButton />;\n' + '}\n\n' + '// Explicit selector type for complex derivations\n' + 'const selectUserDisplay = (state: AuthState): string => {\n' + '  if (!state.user) return \'Guest\';\n' + '  return state.user.name + \' (\' + state.user.email + \')\';\n' + '};\n\n' + 'function UserBadge() {\n' + '  const display = useAuthStore(selectUserDisplay);\n' + '  return <span>{display}</span>;\n' + '}'}</code></pre>

      {/* Slices Pattern */}
      <h2 style={h2Style}>{t.h2Slices}</h2>
      <p style={pStyle}>{t.slicesDesc}</p>

      <h3 style={h3Style}>{t.h3CreatingSlices}</h3>
      <p style={pStyle}>{t.creatingSlicesDesc}</p>
      <pre style={preStyle}><code>{'// types.ts\n' + 'interface UserSlice {\n' + '  user: { name: string } | null;\n' + '  setUser: (user: { name: string }) => void;\n' + '}\n\n' + 'interface CartSlice {\n' + '  items: Array<{ id: string; name: string; qty: number }>;\n' + '  addItem: (item: { id: string; name: string }) => void;\n' + '  clearCart: () => void;\n' + '}\n\n' + 'type AppState = UserSlice & CartSlice;\n\n' + '// slices/userSlice.ts\n' + 'const createUserSlice = (set: any): UserSlice => ({\n' + '  user: null,\n' + '  setUser: (user) => set({ user }),\n' + '});\n\n' + '// slices/cartSlice.ts\n' + 'const createCartSlice = (set: any, get: any): CartSlice => ({\n' + '  items: [],\n' + '  addItem: (item) => set((state: AppState) => ({\n' + '    items: [...state.items, { ...item, qty: 1 }],\n' + '  })),\n' + '  // Access user slice from cart slice via get()\n' + '  clearCart: () => {\n' + '    const user = get().user;\n' + '    console.log(\'Clearing cart for:\', user?.name);\n' + '    set({ items: [] });\n' + '  },\n' + '});\n\n' + '// store.ts — combine slices\n' + 'import { create } from \'zustand\';\n\n' + 'const useAppStore = create<AppState>()((...args) => ({\n' + '  ...createUserSlice(...args),\n' + '  ...createCartSlice(...args),\n' + '}));'}</code></pre>

      {/* Next.js SSR */}
      <h2 style={h2Style}>{t.h2NextJS}</h2>
      <p style={pStyle}>{t.nextjsDesc}</p>

      <h3 style={h3Style}>{t.h3NextSetup}</h3>
      <p style={pStyle}>{t.nextSetupDesc}</p>
      <pre style={preStyle}><code>{'// store.ts\n' + 'import { createStore } from \'zustand\';\n\n' + 'interface AppState {\n' + '  count: number;\n' + '  increment: () => void;\n' + '}\n\n' + '// Factory: creates a NEW store instance each call\n' + 'export const createAppStore = (initialCount = 0) => {\n' + '  return createStore<AppState>()((set) => ({\n' + '    count: initialCount,\n' + '    increment: () => set((s) => ({ count: s.count + 1 })),\n' + '  }));\n' + '};\n\n' + 'export type AppStore = ReturnType<typeof createAppStore>;\n\n' + '// provider.tsx\n' + '\'use client\';\n' + 'import { createContext, useContext, useRef } from \'react\';\n' + 'import { useStore } from \'zustand\';\n\n' + 'const StoreContext = createContext<AppStore | null>(null);\n\n' + 'export function StoreProvider({\n' + '  children,\n' + '  initialCount,\n' + '}: {\n' + '  children: React.ReactNode;\n' + '  initialCount: number;\n' + '}) {\n' + '  const storeRef = useRef<AppStore>(null);\n' + '  if (!storeRef.current) {\n' + '    storeRef.current = createAppStore(initialCount);\n' + '  }\n' + '  return (\n' + '    <StoreContext.Provider value={storeRef.current}>\n' + '      {children}\n' + '    </StoreContext.Provider>\n' + '  );\n' + '}\n\n' + '// Custom hook for accessing the store\n' + 'export function useAppStore<T>(selector: (state: AppState) => T): T {\n' + '  const store = useContext(StoreContext);\n' + '  if (!store) throw new Error(\'Missing StoreProvider\');\n' + '  return useStore(store, selector);\n' + '}'}</code></pre>

      {/* Testing */}
      <h2 style={h2Style}>{t.h2Testing}</h2>
      <p style={pStyle}>{t.testingDesc}</p>

      <h3 style={h3Style}>{t.h3UnitTesting}</h3>
      <p style={pStyle}>{t.unitTestingDesc}</p>
      <pre style={preStyle}><code>{'// counterStore.test.ts\n' + 'import { useCounterStore } from \'./counterStore\';\n\n' + 'describe(\'counterStore\', () => {\n' + '  // Reset store before each test\n' + '  beforeEach(() => {\n' + '    useCounterStore.setState({ count: 0 });\n' + '  });\n\n' + '  it(\'increments count\', () => {\n' + '    useCounterStore.getState().increment();\n' + '    expect(useCounterStore.getState().count).toBe(1);\n' + '  });\n\n' + '  it(\'decrements count\', () => {\n' + '    useCounterStore.setState({ count: 5 });\n' + '    useCounterStore.getState().decrement();\n' + '    expect(useCounterStore.getState().count).toBe(4);\n' + '  });\n\n' + '  it(\'resets count\', () => {\n' + '    useCounterStore.setState({ count: 99 });\n' + '    useCounterStore.getState().reset();\n' + '    expect(useCounterStore.getState().count).toBe(0);\n' + '  });\n' + '});'}</code></pre>

      <h3 style={h3Style}>{t.h3ComponentTesting}</h3>
      <p style={pStyle}>{t.componentTestingDesc}</p>
      <pre style={preStyle}><code>{'// Counter.test.tsx\n' + 'import { render, screen, fireEvent } from \'@testing-library/react\';\n' + 'import { useCounterStore } from \'./counterStore\';\n' + 'import { Counter } from \'./Counter\';\n\n' + '// Reset store before each test\n' + 'const initialState = useCounterStore.getState();\n' + 'beforeEach(() => {\n' + '  useCounterStore.setState(initialState, true);\n' + '});\n\n' + 'it(\'displays the count and increments on click\', () => {\n' + '  render(<Counter />);\n' + '  expect(screen.getByText(\'0\')).toBeInTheDocument();\n' + '  fireEvent.click(screen.getByText(\'+\'));\n' + '  expect(screen.getByText(\'1\')).toBeInTheDocument();\n' + '});'}</code></pre>

      {/* Zustand vs React Context */}
      <h2 style={h2Style}>{t.h2VsContext}</h2>
      <p style={pStyle}>{t.vsContextDesc}</p>

      <h3 style={h3Style}>{t.vsContextProblem}</h3>
      <p style={pStyle}>{t.vsContextProblemDesc}</p>
      <pre style={preStyle}><code>{'// PROBLEM: React Context re-renders all consumers\n' + 'const AppContext = React.createContext(null);\n\n' + 'function App() {\n' + '  const [state, setState] = useState({\n' + '    theme: \'dark\',\n' + '    user: \'Alice\',\n' + '    count: 0,\n' + '  });\n' + '  return (\n' + '    <AppContext.Provider value={{ state, setState }}>\n' + '      {/* ALL children re-render when ANY value changes */}\n' + '      <ThemeDisplay />  {/* re-renders on count change */}\n' + '      <UserDisplay />   {/* re-renders on count change */}\n' + '      <Counter />       {/* re-renders on theme change */}\n' + '    </AppContext.Provider>\n' + '  );\n' + '}\n\n' + '// SOLUTION: Zustand with selectors\n' + 'const useAppStore = create((set) => ({\n' + '  theme: \'dark\',\n' + '  user: \'Alice\',\n' + '  count: 0,\n' + '  increment: () => set((s) => ({ count: s.count + 1 })),\n' + '}));\n\n' + '// Only re-renders when theme changes\n' + 'function ThemeDisplay() {\n' + '  const theme = useAppStore((s) => s.theme);\n' + '  return <div>Theme: {theme}</div>;\n' + '}\n\n' + '// Only re-renders when count changes\n' + 'function Counter() {\n' + '  const count = useAppStore((s) => s.count);\n' + '  const increment = useAppStore((s) => s.increment);\n' + '  return <button onClick={increment}>{count}</button>;\n' + '}'}</code></pre>

      {/* Performance */}
      <h2 style={h2Style}>{t.h2Performance}</h2>
      <p style={pStyle}>{t.perfDesc}</p>

      <h3 style={h3Style}>{t.h3AtomicSelectors}</h3>
      <p style={pStyle}>{t.atomicSelectorsDesc}</p>
      <pre style={preStyle}><code>{'// BAD: selects the entire user object\n' + '// Re-renders when ANY user property changes\n' + 'function Avatar() {\n' + '  const user = useStore((s) => s.user);\n' + '  return <img src={user.avatar} />;\n' + '}\n\n' + '// GOOD: selects only what is needed\n' + '// Only re-renders when avatar URL changes\n' + 'function Avatar() {\n' + '  const avatar = useStore((s) => s.user.avatar);\n' + '  return <img src={avatar} />;\n' + '}'}</code></pre>

      <h3 style={h3Style}>{t.h3TransientUpdates}</h3>
      <p style={pStyle}>{t.transientDesc}</p>
      <pre style={preStyle}><code>{'// Transient updates: update DOM directly without re-rendering\n' + 'import { useEffect, useRef } from \'react\';\n\n' + 'const useMouseStore = create((set) => ({\n' + '  x: 0,\n' + '  y: 0,\n' + '  setPosition: (x, y) => set({ x, y }),\n' + '}));\n\n' + '// This component NEVER re-renders from mouse moves\n' + 'function Cursor() {\n' + '  const ref = useRef(null);\n\n' + '  useEffect(() => {\n' + '    // Subscribe to store changes and update DOM directly\n' + '    const unsub = useMouseStore.subscribe((state) => {\n' + '      if (ref.current) {\n' + '        ref.current.style.transform =\n' + '          \'translate(\' + state.x + \'px, \' + state.y + \'px)\';\n' + '      }\n' + '    });\n' + '    return unsub;\n' + '  }, []);\n\n' + '  return <div ref={ref} style={{ width: 20, height: 20 }} />;\n' + '}'}</code></pre>

      {/* Best Practices */}
      <h2 style={h2Style}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '2' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
        <li>{t.bp6}</li>
        <li>{t.bp7}</li>
        <li>{t.bp8}</li>
      </ul>

      {/* FAQ */}
      <h2 style={h2Style}>{t.h2FAQ}</h2>
      {[
        [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.4rem', color: '#1e293b' }}>{q}</h3>
          <p style={{ margin: 0, lineHeight: '1.75' }}>{a}</p>
        </div>
      ))}

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.9' }}>
          <li>{t.keyTakeaway1}</li>
          <li>{t.keyTakeaway2}</li>
          <li>{t.keyTakeaway3}</li>
          <li>{t.keyTakeaway4}</li>
          <li>{t.keyTakeaway5}</li>
          <li>{t.keyTakeaway6}</li>
        </ul>
      </div>
    </article>
  );
}
