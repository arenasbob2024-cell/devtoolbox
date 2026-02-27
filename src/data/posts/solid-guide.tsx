'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SolidJS Guide 2026: Fine-Grained Reactivity, Signals, and High-Performance UI',
    intro: 'SolidJS is a declarative JavaScript library for building user interfaces that compiles down to real DOM operations with no virtual DOM overhead. Its fine-grained reactivity system tracks exactly which parts of the UI depend on which pieces of state, updating only the precise DOM nodes that need to change. SolidJS delivers performance on par with hand-optimized vanilla JavaScript while offering a component model and JSX syntax familiar to React developers.',
    tldr: 'SolidJS is a reactive UI library with no virtual DOM that uses fine-grained signals for surgical DOM updates. It compiles JSX to direct DOM instructions, delivering near-vanilla-JS performance. Key primitives include createSignal, createEffect, and createMemo. SolidStart provides a full-stack meta-framework with file-based routing, SSR, and streaming. Solid consistently tops JS framework benchmarks.',
    keyTakeaway1: 'SolidJS uses fine-grained reactivity with signals that update only the exact DOM nodes affected, with no virtual DOM diffing.',
    keyTakeaway2: 'Components in Solid run once during setup and never re-execute, unlike React where components re-render on every state change.',
    keyTakeaway3: 'SolidJS compiles JSX to optimized real DOM operations at build time, achieving performance comparable to hand-written vanilla JavaScript.',
    keyTakeaway4: 'The reactive primitives (createSignal, createMemo, createEffect) compose naturally and form the foundation of all state management.',
    keyTakeaway5: 'SolidStart is the official meta-framework offering file-based routing, server-side rendering, streaming, and API routes.',
    keyTakeaway6: 'Migrating from React to Solid is approachable because Solid uses JSX and a similar component model, but reactivity semantics differ significantly.',

    h2WhatIs: 'What Is SolidJS and Fine-Grained Reactivity?',
    whatIsDesc: 'SolidJS is a UI library created by Ryan Carniato that takes a fundamentally different approach from React. While React uses a virtual DOM to diff and batch updates, Solid compiles your JSX templates into efficient real DOM creation and update code. There is no reconciliation step and no diffing algorithm. When a signal changes, only the specific DOM text node, attribute, or class list that reads that signal is updated directly.',
    whatIsDesc2: 'Fine-grained reactivity means the framework tracks dependencies at the individual expression level, not at the component level. A component function in Solid executes exactly once to set up the reactive graph. After that, updates flow through the graph automatically without re-running the component. This eliminates the need for memoization hooks like useMemo or useCallback because closures never go stale.',

    h2Comparison: 'SolidJS vs React: Key Differences',
    comparisonDesc: 'While Solid and React share JSX syntax and a component-based architecture, their execution models are fundamentally different. Understanding these differences is essential for writing idiomatic Solid code.',
    compFeature: 'Feature',
    compSolid: 'SolidJS',
    compReact: 'React',
    compRow1f: 'Rendering Model',
    compRow1s: 'Fine-grained reactive DOM updates',
    compRow1r: 'Virtual DOM diffing and reconciliation',
    compRow2f: 'Component Execution',
    compRow2s: 'Runs once during setup',
    compRow2r: 'Re-runs on every state change',
    compRow3f: 'State Primitive',
    compRow3s: 'Signals (getter/setter tuple)',
    compRow3r: 'useState hook (value/setter)',
    compRow4f: 'Memoization',
    compRow4s: 'Not needed (no stale closures)',
    compRow4r: 'useMemo, useCallback required',
    compRow5f: 'Bundle Size',
    compRow5s: '~7 KB gzipped',
    compRow5r: '~42 KB gzipped (with react-dom)',
    compRow6f: 'JSX Compilation',
    compRow6s: 'Compiles to DOM instructions',
    compRow6r: 'Compiles to createElement calls',
    compRow7f: 'Control Flow',
    compRow7s: 'Built-in components (Show, For)',
    compRow7r: 'JavaScript expressions (ternary, map)',
    compRow8f: 'Meta-Framework',
    compRow8s: 'SolidStart',
    compRow8r: 'Next.js, Remix',

    h2Signals: 'Signals, Memos, and Effects',
    signalsDesc: 'Solid provides three core reactive primitives that form the foundation of all state management. Signals hold reactive values, memos derive computed values efficiently, and effects run side effects when their dependencies change.',
    h3CreateSignal: 'createSignal: Reactive State',
    createSignalDesc: 'A signal is a reactive value container that returns a getter function and a setter function. Reading the getter inside a reactive context (like JSX or an effect) automatically subscribes to changes. The setter triggers updates only to the exact subscribers.',
    h3CreateMemo: 'createMemo: Derived Computations',
    createMemoDesc: 'A memo is a cached derived value that only recalculates when its dependencies change. Unlike React useMemo, Solid memos are truly reactive and participate in the dependency graph. They prevent redundant computations in complex reactive chains.',
    h3CreateEffect: 'createEffect: Side Effects',
    createEffectDesc: 'An effect runs a function whenever its tracked dependencies change. It automatically detects which signals it reads and re-runs only when those specific signals update. Effects are useful for DOM manipulation, logging, network requests, and other side effects.',

    h2Components: 'Components and JSX (No Virtual DOM)',
    componentsDesc: 'Solid components are plain functions that return JSX. The critical difference from React is that a Solid component function runs exactly once. It sets up the reactive bindings and returns the DOM structure. After that initial run, only the reactive expressions within the JSX update when their dependencies change.',
    componentsDesc2: 'Because components do not re-execute, there are no stale closures, no dependency arrays, and no need for useCallback or useMemo. Props are accessed as getter functions under the hood, so destructuring props at the top level would break reactivity. Always access props inside JSX or reactive contexts.',

    h2ControlFlow: 'Control Flow Components',
    controlFlowDesc: 'Solid provides built-in control flow components instead of relying on JavaScript expressions like ternary operators or Array.map. These components are optimized for fine-grained reactivity and ensure that DOM nodes are created, destroyed, or moved efficiently.',
    h3Show: 'Show: Conditional Rendering',
    showDesc: 'The Show component renders its children when a condition is truthy. It supports a fallback prop for the else case. Unlike a ternary expression, Show only creates the truthy or falsy branch, not both.',
    h3For: 'For: List Rendering',
    forDesc: 'The For component iterates over an array and renders each item. It uses referential identity to track items, so it only updates the DOM nodes for items that actually changed rather than re-rendering the entire list.',
    h3SwitchMatch: 'Switch/Match: Multi-Branch Conditions',
    switchMatchDesc: 'Switch and Match provide a pattern-matching style conditional that is cleaner than nested ternaries. Only the first matching branch renders.',

    h2Stores: 'Stores and Nested Reactivity',
    storesDesc: 'For complex state with nested objects and arrays, Solid provides stores. A store is a deeply reactive proxy object where each property is individually tracked. This means updating a deeply nested field only triggers updates for the specific parts of the UI that read that field.',
    storesDesc2: 'Stores use a path-based setter API that makes immutable-style updates ergonomic. You describe the path to the property you want to update, and Solid handles the reactive notification precisely.',

    h2Context: 'Context and Dependency Injection',
    contextDesc: 'Solid provides a context API similar to React for passing data through the component tree without prop drilling. Because Solid components run once, context values are read once during setup. If the context value is a signal or store, downstream consumers still react to changes automatically.',

    h2SolidStart: 'SolidStart: The Meta-Framework',
    solidStartDesc: 'SolidStart is the official meta-framework for SolidJS, comparable to Next.js for React or Nuxt for Vue. It provides file-based routing, server-side rendering, streaming, API routes, and build optimizations powered by Vinxi and Nitro under the hood.',
    solidStartDesc2: 'SolidStart supports multiple rendering modes including SSR with streaming, static site generation, and client-side rendering. It uses Vinxi as its server layer, giving access to the entire Nitro ecosystem of deployment adapters for Vercel, Netlify, Cloudflare, and more.',
    h3FileRouting: 'File-Based Routing',
    fileRoutingDesc: 'Routes are defined by the file structure in the src/routes directory. SolidStart supports dynamic parameters, catch-all routes, route groups, and nested layouts.',
    h3ServerFunctions: 'Server Functions',
    serverFunctionsDesc: 'SolidStart provides server functions that run exclusively on the server but can be called from client code. They are defined using the "use server" directive and are ideal for database queries, authentication, and API integrations.',

    h2Resource: 'Resource API for Async Data',
    resourceDesc: 'The createResource primitive handles async data fetching with built-in loading and error states. It integrates with Suspense for declarative loading UI and with SolidStart server functions for SSR-friendly data fetching.',

    h2TypeScript: 'TypeScript Integration',
    typescriptDesc: 'SolidJS has first-class TypeScript support. Signals, stores, components, and all APIs are fully typed. The JSX type system uses a custom JSX namespace that maps to real DOM element types rather than React synthetic events.',
    typescriptDesc2: 'Component props are typed using standard TypeScript interfaces or type aliases. Generic components, discriminated unions in props, and strict event typing all work naturally.',

    h2Performance: 'Performance Benchmarks: Why Solid Is Fast',
    perfDesc: 'SolidJS consistently ranks at the top of JavaScript framework benchmarks. In the JS Framework Benchmark, Solid performs within a few percent of hand-optimized vanilla JavaScript implementations. Here is why:',
    perfPoint1: 'No virtual DOM overhead: updates go directly to the real DOM without a diffing step.',
    perfPoint2: 'Compile-time optimization: JSX is compiled to efficient DOM creation code, not generic createElement calls.',
    perfPoint3: 'Fine-grained tracking: only the exact expressions that depend on changed data are re-evaluated.',
    perfPoint4: 'No component re-execution: the component function runs once, so there is no overhead from re-rendering entire subtrees.',
    perfPoint5: 'Minimal memory allocation: no intermediate virtual DOM tree structures are allocated on updates.',
    perfPoint6: 'Small bundle: Solid core is roughly 7 KB gzipped, compared to 42 KB for React plus ReactDOM.',

    h2Ecosystem: 'Ecosystem and Community',
    ecosystemDesc: 'The Solid ecosystem has grown rapidly and includes key libraries for common development needs:',
    ecoLib1: 'solid-router: Official routing library with nested routes, lazy loading, and data functions.',
    ecoLib2: 'solid-primitives: A collection of high-quality reactive utility primitives (media queries, intersection observer, storage, etc.).',
    ecoLib3: 'Kobalte: Accessible, unstyled UI component library (similar to Radix for React).',
    ecoLib4: 'solid-query (TanStack Query): Powerful async state management for data fetching with caching.',
    ecoLib5: 'solid-testing-library: Testing utilities following the Testing Library philosophy.',
    ecoLib6: 'solid-transition-group: Animation and transition components for enter/exit animations.',
    ecoLib7: 'solid-markdown: Markdown renderer component for Solid applications.',

    h2Migration: 'Migration from React to Solid',
    migrationDesc: 'Migrating from React to Solid is more approachable than moving to a completely different paradigm because both use JSX and component-based architecture. However, several key mental model shifts are required:',
    migrationPoint1: 'Replace useState with createSignal. Remember that the getter is a function that must be called: count() not count.',
    migrationPoint2: 'Replace useEffect with createEffect. No dependency arrays are needed because Solid tracks dependencies automatically.',
    migrationPoint3: 'Replace useMemo with createMemo. No dependency arrays needed.',
    migrationPoint4: 'Do not destructure props. Access them as props.name inside JSX or reactive contexts to preserve reactivity.',
    migrationPoint5: 'Replace conditional rendering ternaries with the Show component. Replace array.map with the For component.',
    migrationPoint6: 'Remove useCallback entirely. Closures in Solid never go stale because components do not re-execute.',
    migrationPoint7: 'Replace useRef with a simple let variable for DOM references. Use ref callback to assign them.',

    h2BestPractices: 'Best Practices',
    bpDesc: 'Follow these patterns for idiomatic and performant SolidJS code:',
    bp1: 'Never destructure props at the function parameter level. Use props.x inside JSX or wrap with splitProps/mergeProps.',
    bp2: 'Use createMemo for expensive derived computations to avoid recalculating on every read.',
    bp3: 'Prefer stores over multiple signals for complex nested state to get automatic deep reactivity.',
    bp4: 'Use the For component for lists instead of array.map to get proper keyed updates and minimal DOM operations.',
    bp5: 'Use Show for conditional rendering instead of ternary expressions to avoid creating both branches.',
    bp6: 'Place createEffect calls at the component level, not inside conditionals or loops.',
    bp7: 'Use onCleanup inside effects to properly dispose of subscriptions, timers, and event listeners.',
    bp8: 'Leverage Suspense and ErrorBoundary for declarative async and error handling.',
    bp9: 'Prefer batch() when setting multiple signals synchronously to avoid intermediate updates.',
    bp10: 'Use lazy() for code splitting components in SolidStart routes to reduce initial bundle size.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is SolidJS used for?',
    faq1A: 'SolidJS is used for building fast, interactive web applications and user interfaces. It is suitable for dashboards, single-page applications, real-time data displays, developer tools, and any project where performance and small bundle size matter. SolidStart extends it to full-stack applications with SSR and API routes.',
    faq2Q: 'How does SolidJS differ from React?',
    faq2A: 'SolidJS has no virtual DOM. Components run once during setup instead of re-rendering on every state change. State uses signals (getter/setter functions) instead of hooks. Solid compiles JSX to direct DOM operations rather than createElement calls. This results in significantly better runtime performance and smaller bundle size.',
    faq3Q: 'Is SolidJS faster than React?',
    faq3A: 'Yes. SolidJS consistently outperforms React in benchmarks like the JS Framework Benchmark. Solid performs within a few percent of vanilla JavaScript. The performance advantage comes from fine-grained reactivity, no virtual DOM overhead, compile-time JSX optimization, and components that run only once.',
    faq4Q: 'What are signals in SolidJS?',
    faq4A: 'Signals are the core reactive primitive in SolidJS. A signal is created with createSignal and returns a getter function and a setter function. When you read the getter inside a reactive context like JSX or createEffect, Solid automatically tracks that dependency. When the setter is called, only the exact subscribers of that signal update.',
    faq5Q: 'Does SolidJS have a meta-framework like Next.js?',
    faq5A: 'Yes. SolidStart is the official meta-framework for SolidJS. It provides file-based routing, server-side rendering with streaming, server functions with the use server directive, static site generation, API routes, and deployment adapters for Vercel, Netlify, Cloudflare, and other platforms.',
    faq6Q: 'Can I use TypeScript with SolidJS?',
    faq6A: 'Yes. SolidJS has first-class TypeScript support. All core APIs are fully typed. The JSX type system maps to real DOM element types. Component props, signals, stores, and context are all type-safe. SolidStart also fully supports TypeScript for server functions and routing.',
    faq7Q: 'How do I migrate from React to SolidJS?',
    faq7A: 'Start by replacing useState with createSignal, useEffect with createEffect, and useMemo with createMemo. Remove all dependency arrays since Solid tracks dependencies automatically. Stop destructuring props and use the Show and For components for control flow. Remove useCallback since closures never go stale in Solid.',
    faq8Q: 'Is SolidJS production-ready?',
    faq8A: 'Yes. SolidJS reached version 1.0 in 2021 and has been stable since. It is used in production by companies including eBay, Rakuten, and Cloudflare. SolidStart reached 1.0 in 2024. The ecosystem includes mature libraries for routing, state management, UI components, and testing.',
  },
  zh: {
    title: 'SolidJS 指南 2026：细粒度响应式、信号与高性能 UI',
    intro: 'SolidJS 是一个声明式 JavaScript 库，用于构建用户界面，它编译为真实 DOM 操作，没有虚拟 DOM 开销。其细粒度响应式系统精确追踪 UI 的哪些部分依赖哪些状态，只更新需要变化的精确 DOM 节点。SolidJS 的性能与手工优化的原生 JavaScript 相当，同时提供 React 开发者熟悉的组件模型和 JSX 语法。',
    tldr: 'SolidJS 是一个没有虚拟 DOM 的响应式 UI 库，使用细粒度信号进行精确 DOM 更新。它将 JSX 编译为直接的 DOM 指令，提供接近原生 JS 的性能。核心原语包括 createSignal、createEffect 和 createMemo。SolidStart 提供全栈元框架，支持文件路由、SSR 和流式渲染。Solid 在 JS 框架基准测试中始终名列前茅。',
    keyTakeaway1: 'SolidJS 使用细粒度响应式信号，只更新受影响的精确 DOM 节点，无需虚拟 DOM 差异比较。',
    keyTakeaway2: 'Solid 中的组件在设置期间只运行一次，不像 React 那样每次状态变化都重新渲染。',
    keyTakeaway3: 'SolidJS 在构建时将 JSX 编译为优化的真实 DOM 操作，性能与手写原生 JavaScript 相当。',
    keyTakeaway4: '响应式原语（createSignal、createMemo、createEffect）自然组合，构成所有状态管理的基础。',
    keyTakeaway5: 'SolidStart 是官方元框架，提供文件路由、服务端渲染、流式传输和 API 路由。',
    keyTakeaway6: '从 React 迁移到 Solid 相对容易，因为 Solid 使用 JSX 和类似的组件模型，但响应式语义有显著差异。',

    h2WhatIs: '什么是 SolidJS 和细粒度响应式？',
    whatIsDesc: 'SolidJS 是由 Ryan Carniato 创建的 UI 库，采用了与 React 截然不同的方法。React 使用虚拟 DOM 来差异比较和批量更新，而 Solid 将 JSX 模板编译为高效的真实 DOM 创建和更新代码。没有协调步骤，没有差异算法。',
    whatIsDesc2: '细粒度响应式意味着框架在单个表达式级别追踪依赖，而不是在组件级别。Solid 中的组件函数只执行一次来建立响应式图。之后更新自动通过图传播，无需重新运行组件。',

    h2Comparison: 'SolidJS vs React：关键差异',
    comparisonDesc: '虽然 Solid 和 React 共享 JSX 语法和基于组件的架构，但它们的执行模型有根本性的不同。',
    compFeature: '特性',
    compSolid: 'SolidJS',
    compReact: 'React',
    compRow1f: '渲染模型',
    compRow1s: '细粒度响应式 DOM 更新',
    compRow1r: '虚拟 DOM 差异比较和协调',
    compRow2f: '组件执行',
    compRow2s: '设置时只运行一次',
    compRow2r: '每次状态变化都重新运行',
    compRow3f: '状态原语',
    compRow3s: '信号（getter/setter 元组）',
    compRow3r: 'useState 钩子（值/setter）',
    compRow4f: '记忆化',
    compRow4s: '不需要（无陈旧闭包）',
    compRow4r: '需要 useMemo、useCallback',
    compRow5f: '包体积',
    compRow5s: '~7 KB gzipped',
    compRow5r: '~42 KB gzipped（含 react-dom）',
    compRow6f: 'JSX 编译',
    compRow6s: '编译为 DOM 指令',
    compRow6r: '编译为 createElement 调用',
    compRow7f: '控制流',
    compRow7s: '内置组件（Show、For）',
    compRow7r: 'JavaScript 表达式（三元运算、map）',
    compRow8f: '元框架',
    compRow8s: 'SolidStart',
    compRow8r: 'Next.js、Remix',

    h2Signals: '信号、备忘录和副作用',
    signalsDesc: 'Solid 提供三个核心响应式原语。信号保存响应式值，备忘录高效派生计算值，副作用在依赖变化时运行。',
    h3CreateSignal: 'createSignal：响应式状态',
    createSignalDesc: '信号是一个响应式值容器，返回 getter 函数和 setter 函数。在响应式上下文中读取 getter 会自动订阅变化。',
    h3CreateMemo: 'createMemo：派生计算',
    createMemoDesc: '备忘录是一个缓存的派生值，只在依赖变化时重新计算。与 React useMemo 不同，Solid 备忘录是真正响应式的。',
    h3CreateEffect: 'createEffect：副作用',
    createEffectDesc: '副作用在其追踪的依赖变化时运行函数。它自动检测读取了哪些信号，只在那些信号更新时重新运行。',

    h2Components: '组件和 JSX（无虚拟 DOM）',
    componentsDesc: 'Solid 组件是返回 JSX 的普通函数。关键区别是 Solid 组件函数只执行一次，建立响应式绑定并返回 DOM 结构。',
    componentsDesc2: '因为组件不重新执行，所以没有陈旧闭包、不需要依赖数组、不需要 useCallback 或 useMemo。访问 props 时不要解构。',

    h2ControlFlow: '控制流组件',
    controlFlowDesc: 'Solid 提供内置控制流组件，而不是依赖 JavaScript 表达式。这些组件为细粒度响应式优化，确保 DOM 节点的高效创建和销毁。',
    h3Show: 'Show：条件渲染',
    showDesc: 'Show 组件在条件为真时渲染子元素，支持 fallback 属性作为 else 分支。',
    h3For: 'For：列表渲染',
    forDesc: 'For 组件遍历数组并渲染每个项目。它使用引用身份追踪项目，只更新实际变化的项目。',
    h3SwitchMatch: 'Switch/Match：多分支条件',
    switchMatchDesc: 'Switch 和 Match 提供模式匹配风格的条件渲染，比嵌套三元运算更清晰。',

    h2Stores: '存储与嵌套响应式',
    storesDesc: '对于复杂的嵌套对象和数组状态，Solid 提供存储。存储是深度响应式代理对象，每个属性都被单独追踪。',
    storesDesc2: '存储使用基于路径的 setter API，使不可变风格的更新更加人性化。',

    h2Context: '上下文与依赖注入',
    contextDesc: 'Solid 提供类似 React 的上下文 API，用于在组件树中传递数据而无需逐层传递 props。如果上下文值是信号或存储，下游消费者仍会自动响应变化。',

    h2SolidStart: 'SolidStart：元框架',
    solidStartDesc: 'SolidStart 是 SolidJS 的官方元框架，类似于 React 的 Next.js 或 Vue 的 Nuxt。它提供文件路由、服务端渲染、流式传输、API 路由和构建优化。',
    solidStartDesc2: 'SolidStart 支持多种渲染模式，包括流式 SSR、静态站点生成和客户端渲染。它使用 Vinxi 作为服务层。',
    h3FileRouting: '文件路由',
    fileRoutingDesc: '路由由 src/routes 目录中的文件结构定义，支持动态参数、捕获全部路由、路由分组和嵌套布局。',
    h3ServerFunctions: '服务器函数',
    serverFunctionsDesc: 'SolidStart 提供仅在服务器上运行但可从客户端调用的服务器函数，使用 "use server" 指令定义。',

    h2Resource: 'Resource API 异步数据',
    resourceDesc: 'createResource 原语处理异步数据获取，内置加载和错误状态，与 Suspense 集成实现声明式加载 UI。',

    h2TypeScript: 'TypeScript 集成',
    typescriptDesc: 'SolidJS 拥有一流的 TypeScript 支持。信号、存储、组件和所有 API 都有完整类型。',
    typescriptDesc2: '组件 props 使用标准 TypeScript 接口或类型别名进行类型定义。泛型组件、联合类型 props 和严格事件类型都能自然工作。',

    h2Performance: '性能基准：为什么 Solid 快',
    perfDesc: 'SolidJS 在 JavaScript 框架基准测试中始终名列前茅。在 JS Framework Benchmark 中，Solid 的性能与手工优化的原生 JavaScript 相差不到几个百分点。原因如下：',
    perfPoint1: '无虚拟 DOM 开销：更新直接作用于真实 DOM，无需差异比较。',
    perfPoint2: '编译时优化：JSX 编译为高效的 DOM 创建代码。',
    perfPoint3: '细粒度追踪：只重新计算依赖于变化数据的精确表达式。',
    perfPoint4: '无组件重新执行：组件函数只运行一次，无需重新渲染整个子树。',
    perfPoint5: '最小内存分配：更新时不分配中间虚拟 DOM 树结构。',
    perfPoint6: '小包体积：Solid 核心约 7 KB gzipped，而 React + ReactDOM 约 42 KB。',

    h2Ecosystem: '生态系统和社区',
    ecosystemDesc: 'Solid 生态系统已快速成长，包含常用开发需求的关键库：',
    ecoLib1: 'solid-router：官方路由库，支持嵌套路由、懒加载和数据函数。',
    ecoLib2: 'solid-primitives：高质量响应式实用原语集合。',
    ecoLib3: 'Kobalte：无障碍、无样式 UI 组件库（类似 React 的 Radix）。',
    ecoLib4: 'solid-query（TanStack Query）：强大的异步状态管理和数据缓存。',
    ecoLib5: 'solid-testing-library：遵循 Testing Library 理念的测试工具。',
    ecoLib6: 'solid-transition-group：进入/退出动画的过渡组件。',
    ecoLib7: 'solid-markdown：Solid 应用的 Markdown 渲染组件。',

    h2Migration: '从 React 迁移到 Solid',
    migrationDesc: '从 React 迁移到 Solid 比转向完全不同的范式更容易，因为两者都使用 JSX 和基于组件的架构。但需要几个关键的思维模型转变：',
    migrationPoint1: '用 createSignal 替换 useState。注意 getter 是函数需要调用：count() 而不是 count。',
    migrationPoint2: '用 createEffect 替换 useEffect。不需要依赖数组，Solid 自动追踪依赖。',
    migrationPoint3: '用 createMemo 替换 useMemo。不需要依赖数组。',
    migrationPoint4: '不要解构 props。在 JSX 或响应式上下文中使用 props.name 以保持响应式。',
    migrationPoint5: '用 Show 组件替换条件渲染三元运算符。用 For 组件替换 array.map。',
    migrationPoint6: '完全移除 useCallback。Solid 中的闭包永远不会过期，因为组件不会重新执行。',
    migrationPoint7: '用简单的 let 变量替换 useRef 作为 DOM 引用。使用 ref 回调来赋值。',

    h2BestPractices: '最佳实践',
    bpDesc: '遵循这些模式编写地道且高性能的 SolidJS 代码：',
    bp1: '不要在函数参数级别解构 props。在 JSX 中使用 props.x 或用 splitProps/mergeProps 包装。',
    bp2: '对昂贵的派生计算使用 createMemo，避免每次读取时重新计算。',
    bp3: '对复杂嵌套状态优先使用存储而非多个信号，获得自动深度响应式。',
    bp4: '对列表使用 For 组件而非 array.map，获得正确的键控更新和最小 DOM 操作。',
    bp5: '使用 Show 进行条件渲染而非三元表达式，避免创建两个分支。',
    bp6: '将 createEffect 调用放在组件级别，不要放在条件或循环内。',
    bp7: '在效果中使用 onCleanup 正确清理订阅、定时器和事件监听器。',
    bp8: '利用 Suspense 和 ErrorBoundary 进行声明式异步和错误处理。',
    bp9: '同步设置多个信号时使用 batch() 避免中间更新。',
    bp10: '在 SolidStart 路由中使用 lazy() 代码分割组件，减少初始包大小。',

    h2Faq: '常见问题',
    faq1Q: 'SolidJS 用来做什么？',
    faq1A: 'SolidJS 用于构建快速的交互式 Web 应用和用户界面。适合仪表盘、单页应用、实时数据展示、开发者工具等对性能和包体积要求高的项目。SolidStart 扩展到支持 SSR 和 API 路由的全栈应用。',
    faq2Q: 'SolidJS 和 React 有什么区别？',
    faq2A: 'SolidJS 没有虚拟 DOM。组件在设置期间只运行一次而非每次状态变化都重新渲染。状态使用信号而非钩子。Solid 将 JSX 编译为直接 DOM 操作。因此运行时性能显著更好，包体积更小。',
    faq3Q: 'SolidJS 比 React 快吗？',
    faq3A: '是的。SolidJS 在 JS Framework Benchmark 等基准测试中始终优于 React，性能接近原生 JavaScript。优势来自细粒度响应式、无虚拟 DOM 开销和编译时优化。',
    faq4Q: 'SolidJS 中的信号是什么？',
    faq4A: '信号是 SolidJS 的核心响应式原语。通过 createSignal 创建，返回 getter 和 setter 函数。在响应式上下文中读取 getter 时自动追踪依赖，调用 setter 时只更新该信号的精确订阅者。',
    faq5Q: 'SolidJS 有类似 Next.js 的元框架吗？',
    faq5A: '有。SolidStart 是 SolidJS 的官方元框架，提供文件路由、流式 SSR、服务器函数、静态站点生成、API 路由和部署适配器。',
    faq6Q: 'SolidJS 可以使用 TypeScript 吗？',
    faq6A: '可以。SolidJS 有一流的 TypeScript 支持，所有核心 API 都有完整类型。JSX 类型系统映射到真实 DOM 元素类型。',
    faq7Q: '如何从 React 迁移到 SolidJS？',
    faq7A: '将 useState 替换为 createSignal，useEffect 替换为 createEffect，useMemo 替换为 createMemo。移除所有依赖数组。不要解构 props，使用 Show 和 For 组件。移除 useCallback。',
    faq8Q: 'SolidJS 可以用于生产环境吗？',
    faq8A: '可以。SolidJS 在 2021 年达到 1.0 版本并保持稳定。eBay、Rakuten 和 Cloudflare 等公司在生产中使用。SolidStart 在 2024 年达到 1.0。生态系统包含成熟的路由、状态管理、UI 组件和测试库。',
  },
};

export default function SolidGuide({ lang }: { lang: string }) {
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
  const thStyle: React.CSSProperties = { padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600, fontSize: '0.875rem' };
  const tdStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' };

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

      {/* What Is SolidJS */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>
      <pre style={codeBlock}><code>{'// How Solid compiles JSX - conceptual overview\n'
        + '// Your JSX code:\n'
        + 'function Counter() {\n'
        + '  const [count, setCount] = createSignal(0);\n'
        + '  return <button onClick={() => setCount(c => c + 1)}>\n'
        + '    Clicks: {count()}\n'
        + '  </button>;\n'
        + '}\n'
        + '\n'
        + '// Solid compiles this to (simplified):\n'
        + 'function Counter() {\n'
        + '  const [count, setCount] = createSignal(0);\n'
        + '  const button = document.createElement("button");\n'
        + '  button.onclick = () => setCount(c => c + 1);\n'
        + '  const text = document.createTextNode("");\n'
        + '  // Only this expression re-runs when count changes:\n'
        + '  createEffect(() => text.data = "Clicks: " + count());\n'
        + '  button.appendChild(text);\n'
        + '  return button;\n'
        + '}'}</code></pre>

      {/* Comparison Table */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={thStyle}>{t.compFeature}</th>
              <th style={thStyle}>{t.compSolid}</th>
              <th style={thStyle}>{t.compReact}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>{t.compRow1f}</td><td style={tdStyle}>{t.compRow1s}</td><td style={tdStyle}>{t.compRow1r}</td></tr>
            <tr><td style={tdStyle}>{t.compRow2f}</td><td style={tdStyle}>{t.compRow2s}</td><td style={tdStyle}>{t.compRow2r}</td></tr>
            <tr><td style={tdStyle}>{t.compRow3f}</td><td style={tdStyle}>{t.compRow3s}</td><td style={tdStyle}>{t.compRow3r}</td></tr>
            <tr><td style={tdStyle}>{t.compRow4f}</td><td style={tdStyle}>{t.compRow4s}</td><td style={tdStyle}>{t.compRow4r}</td></tr>
            <tr><td style={tdStyle}>{t.compRow5f}</td><td style={tdStyle}>{t.compRow5s}</td><td style={tdStyle}>{t.compRow5r}</td></tr>
            <tr><td style={tdStyle}>{t.compRow6f}</td><td style={tdStyle}>{t.compRow6s}</td><td style={tdStyle}>{t.compRow6r}</td></tr>
            <tr><td style={tdStyle}>{t.compRow7f}</td><td style={tdStyle}>{t.compRow7s}</td><td style={tdStyle}>{t.compRow7r}</td></tr>
            <tr><td style={tdStyle}>{t.compRow8f}</td><td style={tdStyle}>{t.compRow8s}</td><td style={tdStyle}>{t.compRow8r}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Signals, Memos, Effects */}
      <h2 style={sectionTitle}>{t.h2Signals}</h2>
      <p style={para}>{t.signalsDesc}</p>

      <h3 style={subTitle}>{t.h3CreateSignal}</h3>
      <p style={para}>{t.createSignalDesc}</p>
      <pre style={codeBlock}><code>{'import { createSignal } from "solid-js";\n'
        + '\n'
        + 'function Counter() {\n'
        + '  // Returns [getter, setter] - getter is a function!\n'
        + '  const [count, setCount] = createSignal(0);\n'
        + '  const [name, setName] = createSignal("World");\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      {/* count() calls the getter function */}\n'
        + '      <p>Count: {count()}</p>\n'
        + '      <p>Hello, {name()}!</p>\n'
        + '\n'
        + '      {/* Setter accepts value or updater function */}\n'
        + '      <button onClick={() => setCount(count() + 1)}>+1</button>\n'
        + '      <button onClick={() => setCount(c => c + 1)}>+1 (updater)</button>\n'
        + '      <input\n'
        + '        value={name()}\n'
        + '        onInput={(e) => setName(e.target.value)}\n'
        + '      />\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3CreateMemo}</h3>
      <p style={para}>{t.createMemoDesc}</p>
      <pre style={codeBlock}><code>{'import { createSignal, createMemo } from "solid-js";\n'
        + '\n'
        + 'function FilteredList() {\n'
        + '  const [items, setItems] = createSignal([\n'
        + '    { name: "Apple", category: "fruit" },\n'
        + '    { name: "Carrot", category: "vegetable" },\n'
        + '    { name: "Banana", category: "fruit" },\n'
        + '  ]);\n'
        + '  const [filter, setFilter] = createSignal("fruit");\n'
        + '\n'
        + '  // Only recalculates when items() or filter() change\n'
        + '  const filtered = createMemo(() =>\n'
        + '    items().filter(item => item.category === filter())\n'
        + '  );\n'
        + '\n'
        + '  // Derived from memo - cached, no redundant work\n'
        + '  const count = createMemo(() => filtered().length);\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <p>Showing {count()} items</p>\n'
        + '      <For each={filtered()}>\n'
        + '        {(item) => <p>{item.name}</p>}\n'
        + '      </For>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3CreateEffect}</h3>
      <p style={para}>{t.createEffectDesc}</p>
      <pre style={codeBlock}><code>{'import { createSignal, createEffect, onCleanup } from "solid-js";\n'
        + '\n'
        + 'function Timer() {\n'
        + '  const [count, setCount] = createSignal(0);\n'
        + '  const [running, setRunning] = createSignal(false);\n'
        + '\n'
        + '  // Effect tracks running() automatically\n'
        + '  createEffect(() => {\n'
        + '    if (running()) {\n'
        + '      const id = setInterval(() => setCount(c => c + 1), 1000);\n'
        + '      // Cleanup runs before next effect or on disposal\n'
        + '      onCleanup(() => clearInterval(id));\n'
        + '    }\n'
        + '  });\n'
        + '\n'
        + '  // Effect for document title - tracks count()\n'
        + '  createEffect(() => {\n'
        + '    document.title = "Count: " + count();\n'
        + '  });\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <p>{count()}</p>\n'
        + '      <button onClick={() => setRunning(r => !r)}>\n'
        + '        {running() ? "Stop" : "Start"}\n'
        + '      </button>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Components */}
      <h2 style={sectionTitle}>{t.h2Components}</h2>
      <p style={para}>{t.componentsDesc}</p>
      <p style={para}>{t.componentsDesc2}</p>
      <pre style={codeBlock}><code>{'import { createSignal } from "solid-js";\n'
        + '\n'
        + '// Props must NOT be destructured at parameter level\n'
        + '// BAD:  function Greeting({ name, greeting }) { ... }\n'
        + '// GOOD: function Greeting(props) { ... }\n'
        + '\n'
        + 'function Greeting(props: { name: string; greeting?: string }) {\n'
        + '  // Access props inside JSX to keep reactivity\n'
        + '  return (\n'
        + '    <p>{props.greeting || "Hello"}, {props.name}!</p>\n'
        + '  );\n'
        + '}\n'
        + '\n'
        + 'function App() {\n'
        + '  const [name, setName] = createSignal("Solid");\n'
        + '\n'
        + '  // This component function runs ONCE\n'
        + '  console.log("App setup - runs only once");\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      {/* When name() changes, only the text node updates */}\n'
        + '      <Greeting name={name()} greeting="Welcome" />\n'
        + '      <input\n'
        + '        value={name()}\n'
        + '        onInput={(e) => setName(e.target.value)}\n'
        + '      />\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Control Flow */}
      <h2 style={sectionTitle}>{t.h2ControlFlow}</h2>
      <p style={para}>{t.controlFlowDesc}</p>

      <h3 style={subTitle}>{t.h3Show}</h3>
      <p style={para}>{t.showDesc}</p>
      <pre style={codeBlock}><code>{'import { Show, createSignal } from "solid-js";\n'
        + '\n'
        + 'function UserProfile() {\n'
        + '  const [user, setUser] = createSignal(null);\n'
        + '  const [loading, setLoading] = createSignal(true);\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <Show when={loading()} fallback={\n'
        + '        <Show when={user()} fallback={<p>No user found</p>}>\n'
        + '          {(u) => (\n'
        + '            <div>\n'
        + '              <h2>{u().name}</h2>\n'
        + '              <p>{u().email}</p>\n'
        + '            </div>\n'
        + '          )}\n'
        + '        </Show>\n'
        + '      }>\n'
        + '        <p>Loading...</p>\n'
        + '      </Show>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3For}</h3>
      <p style={para}>{t.forDesc}</p>
      <pre style={codeBlock}><code>{'import { For, createSignal } from "solid-js";\n'
        + '\n'
        + 'function TodoList() {\n'
        + '  const [todos, setTodos] = createSignal([\n'
        + '    { id: 1, text: "Learn Solid", done: false },\n'
        + '    { id: 2, text: "Build an app", done: false },\n'
        + '  ]);\n'
        + '\n'
        + '  const addTodo = (text: string) => {\n'
        + '    setTodos(prev => [...prev, {\n'
        + '      id: Date.now(), text, done: false\n'
        + '    }]);\n'
        + '  };\n'
        + '\n'
        + '  return (\n'
        + '    <ul>\n'
        + '      {/* For tracks items by reference */}\n'
        + '      <For each={todos()}>\n'
        + '        {(todo, index) => (\n'
        + '          <li>\n'
        + '            {index() + 1}. {todo.text}\n'
        + '            {todo.done ? " (done)" : ""}\n'
        + '          </li>\n'
        + '        )}\n'
        + '      </For>\n'
        + '    </ul>\n'
        + '  );\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3SwitchMatch}</h3>
      <p style={para}>{t.switchMatchDesc}</p>
      <pre style={codeBlock}><code>{'import { Switch, Match, createSignal } from "solid-js";\n'
        + '\n'
        + 'function StatusBadge() {\n'
        + '  const [status, setStatus] = createSignal("loading");\n'
        + '\n'
        + '  return (\n'
        + '    <Switch fallback={<span>Unknown status</span>}>\n'
        + '      <Match when={status() === "loading"}>\n'
        + '        <span style={{ color: "orange" }}>Loading...</span>\n'
        + '      </Match>\n'
        + '      <Match when={status() === "success"}>\n'
        + '        <span style={{ color: "green" }}>Success</span>\n'
        + '      </Match>\n'
        + '      <Match when={status() === "error"}>\n'
        + '        <span style={{ color: "red" }}>Error</span>\n'
        + '      </Match>\n'
        + '    </Switch>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Stores */}
      <h2 style={sectionTitle}>{t.h2Stores}</h2>
      <p style={para}>{t.storesDesc}</p>
      <p style={para}>{t.storesDesc2}</p>
      <pre style={codeBlock}><code>{'import { createStore, produce } from "solid-js/store";\n'
        + '\n'
        + 'function TodoApp() {\n'
        + '  const [state, setState] = createStore({\n'
        + '    user: { name: "Alice", theme: "dark" },\n'
        + '    todos: [\n'
        + '      { id: 1, text: "Learn Solid stores", done: false },\n'
        + '      { id: 2, text: "Build something", done: false },\n'
        + '    ],\n'
        + '    filter: "all" as "all" | "active" | "done",\n'
        + '  });\n'
        + '\n'
        + '  // Path-based updates - only affected subscribers update\n'
        + '  const toggleTodo = (id: number) => {\n'
        + '    setState("todos", t => t.id === id, "done", d => !d);\n'
        + '  };\n'
        + '\n'
        + '  // Using produce for mutable-style syntax\n'
        + '  const addTodo = (text: string) => {\n'
        + '    setState(produce(s => {\n'
        + '      s.todos.push({ id: Date.now(), text, done: false });\n'
        + '    }));\n'
        + '  };\n'
        + '\n'
        + '  // Nested update - only rerenders theme subscribers\n'
        + '  const toggleTheme = () => {\n'
        + '    setState("user", "theme", t => t === "dark" ? "light" : "dark");\n'
        + '  };\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <p>Theme: {state.user.theme}</p>\n'
        + '      <For each={state.todos}>\n'
        + '        {(todo) => (\n'
        + '          <div onClick={() => toggleTodo(todo.id)}>\n'
        + '            {todo.text} {todo.done ? "(done)" : ""}\n'
        + '          </div>\n'
        + '        )}\n'
        + '      </For>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Context */}
      <h2 style={sectionTitle}>{t.h2Context}</h2>
      <p style={para}>{t.contextDesc}</p>
      <pre style={codeBlock}><code>{'import { createContext, useContext, createSignal } from "solid-js";\n'
        + 'import type { ParentComponent } from "solid-js";\n'
        + '\n'
        + '// Define the context with a type\n'
        + 'type ThemeContextType = {\n'
        + '  theme: () => string;\n'
        + '  setTheme: (t: string) => void;\n'
        + '};\n'
        + '\n'
        + 'const ThemeContext = createContext<ThemeContextType>();\n'
        + '\n'
        + '// Provider component\n'
        + 'const ThemeProvider: ParentComponent = (props) => {\n'
        + '  const [theme, setTheme] = createSignal("light");\n'
        + '  return (\n'
        + '    <ThemeContext.Provider value={{ theme, setTheme }}>\n'
        + '      {props.children}\n'
        + '    </ThemeContext.Provider>\n'
        + '  );\n'
        + '};\n'
        + '\n'
        + '// Consumer hook\n'
        + 'function useTheme() {\n'
        + '  const ctx = useContext(ThemeContext);\n'
        + '  if (!ctx) throw new Error("useTheme: no ThemeProvider");\n'
        + '  return ctx;\n'
        + '}\n'
        + '\n'
        + '// Usage in a component\n'
        + 'function ThemeToggle() {\n'
        + '  const { theme, setTheme } = useTheme();\n'
        + '  return (\n'
        + '    <button onClick={() => setTheme(\n'
        + '      theme() === "light" ? "dark" : "light"\n'
        + '    )}>\n'
        + '      Current: {theme()}\n'
        + '    </button>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* SolidStart */}
      <h2 style={sectionTitle}>{t.h2SolidStart}</h2>
      <p style={para}>{t.solidStartDesc}</p>
      <p style={para}>{t.solidStartDesc2}</p>

      <h3 style={subTitle}>{t.h3FileRouting}</h3>
      <p style={para}>{t.fileRoutingDesc}</p>
      <pre style={codeBlock}><code>{'// SolidStart file-based routing structure\n'
        + 'src/routes/\n'
        + '  index.tsx          // -> /\n'
        + '  about.tsx          // -> /about\n'
        + '  blog/\n'
        + '    index.tsx        // -> /blog\n'
        + '    [slug].tsx       // -> /blog/:slug\n'
        + '  users/\n'
        + '    [id].tsx         // -> /users/:id\n'
        + '    [...rest].tsx    // -> /users/* (catch-all)\n'
        + '  (auth)/            // route group (no URL segment)\n'
        + '    login.tsx        // -> /login\n'
        + '    register.tsx     // -> /register'}</code></pre>

      <pre style={codeBlock}><code>{'// src/routes/blog/[slug].tsx\n'
        + 'import { useParams } from "@solidjs/router";\n'
        + 'import { createAsync } from "@solidjs/router";\n'
        + '\n'
        + 'const getPost = async (slug: string) => {\n'
        + '  "use server";\n'
        + '  return db.query("SELECT * FROM posts WHERE slug = ?", [slug]);\n'
        + '};\n'
        + '\n'
        + 'export default function BlogPost() {\n'
        + '  const params = useParams();\n'
        + '  const post = createAsync(() => getPost(params.slug));\n'
        + '\n'
        + '  return (\n'
        + '    <Show when={post()}>\n'
        + '      {(p) => (\n'
        + '        <article>\n'
        + '          <h1>{p().title}</h1>\n'
        + '          <div innerHTML={p().content} />\n'
        + '        </article>\n'
        + '      )}\n'
        + '    </Show>\n'
        + '  );\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3ServerFunctions}</h3>
      <p style={para}>{t.serverFunctionsDesc}</p>
      <pre style={codeBlock}><code>{'// Server functions with "use server" directive\n'
        + 'import { action, redirect } from "@solidjs/router";\n'
        + '\n'
        + '// Server function for data fetching\n'
        + 'async function getUsers() {\n'
        + '  "use server";\n'
        + '  return db.query("SELECT id, name, email FROM users");\n'
        + '}\n'
        + '\n'
        + '// Server action for mutations\n'
        + 'const createUser = action(async (formData: FormData) => {\n'
        + '  "use server";\n'
        + '  const name = formData.get("name") as string;\n'
        + '  const email = formData.get("email") as string;\n'
        + '  await db.query(\n'
        + '    "INSERT INTO users (name, email) VALUES (?, ?)",\n'
        + '    [name, email]\n'
        + '  );\n'
        + '  throw redirect("/users");\n'
        + '});\n'
        + '\n'
        + '// Using in a component\n'
        + 'export default function NewUser() {\n'
        + '  return (\n'
        + '    <form action={createUser} method="post">\n'
        + '      <input name="name" placeholder="Name" />\n'
        + '      <input name="email" type="email" placeholder="Email" />\n'
        + '      <button type="submit">Create User</button>\n'
        + '    </form>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Resource API */}
      <h2 style={sectionTitle}>{t.h2Resource}</h2>
      <p style={para}>{t.resourceDesc}</p>
      <pre style={codeBlock}><code>{'import { createResource, createSignal, Suspense, ErrorBoundary } from "solid-js";\n'
        + '\n'
        + 'const fetchUser = async (id: number) => {\n'
        + '  const res = await fetch("/api/users/" + id);\n'
        + '  if (!res.ok) throw new Error("Failed to fetch user");\n'
        + '  return res.json();\n'
        + '};\n'
        + '\n'
        + 'function UserCard() {\n'
        + '  const [userId, setUserId] = createSignal(1);\n'
        + '\n'
        + '  // Re-fetches when userId() changes\n'
        + '  const [user, { refetch, mutate }] = createResource(\n'
        + '    userId,\n'
        + '    fetchUser\n'
        + '  );\n'
        + '\n'
        + '  return (\n'
        + '    <ErrorBoundary fallback={(err) => <p>Error: {err.message}</p>}>\n'
        + '      <Suspense fallback={<p>Loading user...</p>}>\n'
        + '        <Show when={user()}>\n'
        + '          {(u) => (\n'
        + '            <div>\n'
        + '              <h2>{u().name}</h2>\n'
        + '              <p>{u().email}</p>\n'
        + '              <button onClick={refetch}>Refresh</button>\n'
        + '            </div>\n'
        + '          )}\n'
        + '        </Show>\n'
        + '      </Suspense>\n'
        + '      <button onClick={() => setUserId(id => id + 1)}>\n'
        + '        Next User\n'
        + '      </button>\n'
        + '    </ErrorBoundary>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* TypeScript */}
      <h2 style={sectionTitle}>{t.h2TypeScript}</h2>
      <p style={para}>{t.typescriptDesc}</p>
      <p style={para}>{t.typescriptDesc2}</p>
      <pre style={codeBlock}><code>{'import { Component, JSX } from "solid-js";\n'
        + '\n'
        + '// Typed component props\n'
        + 'interface ButtonProps {\n'
        + '  variant: "primary" | "secondary" | "danger";\n'
        + '  size?: "sm" | "md" | "lg";\n'
        + '  disabled?: boolean;\n'
        + '  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;\n'
        + '  children: JSX.Element;\n'
        + '}\n'
        + '\n'
        + 'const Button: Component<ButtonProps> = (props) => {\n'
        + '  return (\n'
        + '    <button\n'
        + '      disabled={props.disabled}\n'
        + '      onClick={props.onClick}\n'
        + '      data-variant={props.variant}\n'
        + '      data-size={props.size || "md"}\n'
        + '    >\n'
        + '      {props.children}\n'
        + '    </button>\n'
        + '  );\n'
        + '};'}</code></pre>

      {/* Performance */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={para}>{t.perfDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.perfPoint1}</li>
        <li style={listItem}>{t.perfPoint2}</li>
        <li style={listItem}>{t.perfPoint3}</li>
        <li style={listItem}>{t.perfPoint4}</li>
        <li style={listItem}>{t.perfPoint5}</li>
        <li style={listItem}>{t.perfPoint6}</li>
      </ul>

      <pre style={codeBlock}><code>{'// Benchmark-style comparison (conceptual)\n'
        + '// Creating 1000 rows and updating every 10th row\n'
        + '\n'
        + '// React: re-renders entire list component\n'
        + '// - Calls component function\n'
        + '// - Creates new virtual DOM tree (1000 nodes)\n'
        + '// - Diffs old vs new tree\n'
        + '// - Patches 100 real DOM nodes\n'
        + '\n'
        + '// Solid: updates only affected DOM nodes\n'
        + '// - No component re-execution\n'
        + '// - No virtual DOM tree allocation\n'
        + '// - No diffing algorithm\n'
        + '// - Directly updates 100 text nodes via signal subscriptions\n'
        + '\n'
        + '// JS Framework Benchmark results (lower is better):\n'
        + '// vanilla JS:    1.00 (baseline)\n'
        + '// Solid:         1.04\n'
        + '// Svelte:        1.19\n'
        + '// Vue:           1.36\n'
        + '// React:         1.55\n'
        + '// Angular:       1.42'}</code></pre>

      {/* Ecosystem */}
      <h2 style={sectionTitle}>{t.h2Ecosystem}</h2>
      <p style={para}>{t.ecosystemDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>solid-router</strong>{' - ' + t.ecoLib1.split(': ')[1]}</li>
        <li style={listItem}><strong>solid-primitives</strong>{' - ' + t.ecoLib2.split(': ')[1]}</li>
        <li style={listItem}><strong>Kobalte</strong>{' - ' + t.ecoLib3.split(': ')[1]}</li>
        <li style={listItem}><strong>solid-query</strong>{' - ' + t.ecoLib4.split(': ')[1]}</li>
        <li style={listItem}><strong>solid-testing-library</strong>{' - ' + t.ecoLib5.split(': ')[1]}</li>
        <li style={listItem}><strong>solid-transition-group</strong>{' - ' + t.ecoLib6.split(': ')[1]}</li>
        <li style={listItem}><strong>solid-markdown</strong>{' - ' + t.ecoLib7.split(': ')[1]}</li>
      </ul>

      <pre style={codeBlock}><code>{'// Getting started with SolidJS\n'
        + '# Create a new Solid project\n'
        + 'npx degit solidjs/templates/ts my-solid-app\n'
        + 'cd my-solid-app\n'
        + 'npm install\n'
        + 'npm run dev\n'
        + '\n'
        + '# Create a SolidStart project\n'
        + 'npm init solid@latest my-solid-start-app\n'
        + 'cd my-solid-start-app\n'
        + 'npm install\n'
        + 'npm run dev\n'
        + '\n'
        + '# Key packages to install\n'
        + 'npm install @solidjs/router          # routing\n'
        + 'npm install solid-primitives          # utility primitives\n'
        + 'npm install @kobalte/core            # UI components'}</code></pre>

      {/* Migration */}
      <h2 style={sectionTitle}>{t.h2Migration}</h2>
      <p style={para}>{t.migrationDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.migrationPoint1}</li>
        <li style={listItem}>{t.migrationPoint2}</li>
        <li style={listItem}>{t.migrationPoint3}</li>
        <li style={listItem}>{t.migrationPoint4}</li>
        <li style={listItem}>{t.migrationPoint5}</li>
        <li style={listItem}>{t.migrationPoint6}</li>
        <li style={listItem}>{t.migrationPoint7}</li>
      </ul>

      <pre style={codeBlock}><code>{'// React version                          // Solid equivalent\n'
        + '// useState("") + dep arrays              // createSignal("") - no dep arrays\n'
        + '// useMemo(() => ..., [items, query])      // createMemo(() => ...)\n'
        + '// useCallback((e) => ..., [])             // Not needed in Solid\n'
        + '// useEffect(() => ..., [filtered.length]) // createEffect(() => ...)\n'
        + '// value={query}                           // value={query()}\n'
        + '// onChange={handler}                      // onInput={e => setQuery(...)}\n'
        + '// filtered.map(i => <p key={i.id}>...)    // <For each={filtered()}>...\n'
        + '\n'
        + 'import { createSignal, createMemo, createEffect, For } from "solid-js";\n'
        + '\n'
        + 'function SearchSolid(props) {\n'
        + '  const [query, setQuery] = createSignal("");\n'
        + '  const filtered = createMemo(\n'
        + '    () => props.items.filter(i => i.name.includes(query()))\n'
        + '  );\n'
        + '  createEffect(() => {\n'
        + '    document.title = "Results: " + filtered().length;\n'
        + '  });\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <input value={query()} onInput={e => setQuery(e.target.value)} />\n'
        + '      <For each={filtered()}>\n'
        + '        {(i) => <p>{i.name}</p>}\n'
        + '      </For>\n'
        + '    </div>\n'
        + '  );\n'
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
