'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vue 3 Composition API Complete Guide 2026: From Options to Composition',
    intro: 'The Vue 3 Composition API is the modern way to build Vue applications. It provides better TypeScript support, improved code reuse through composables, and more flexible component organization. This guide covers everything from reactive primitives to advanced patterns like Pinia, Vue Router 4, testing with Vitest, and performance optimization techniques that help you ship production-ready Vue applications.',
    tldr: 'The Composition API replaces Options API with function-based setup logic. Use ref() for primitives, reactive() for objects, computed() for derived state. Extract reusable logic into composables. Use Pinia for state management, Vue Router 4 for navigation, and Vitest for testing. Optimize with shallowRef, v-memo, and virtual scrolling.',
    takeaway1: 'Composition API enables better code organization by grouping related logic together instead of splitting across options.',
    takeaway2: 'Composables (use* functions) replace mixins as the primary code reuse pattern with full TypeScript support.',
    takeaway3: 'Pinia is the official state management solution, offering a simpler API than Vuex with full TypeScript inference.',
    takeaway4: 'Script setup with defineProps and defineEmits is the recommended syntax for single-file components.',
    takeaway5: 'Performance tools like shallowRef, v-memo, and computed caching prevent unnecessary re-renders.',
    takeaway6: 'Vue Router 4 composables (useRouter, useRoute) integrate seamlessly with the Composition API for navigation.',
    takeaway7: 'Teleport and Suspense are built-in components that solve common UI patterns without third-party libraries.',

    h2CompVsOpt: '1. Composition API vs Options API',
    compVsOptDesc: 'The Options API organizes code by option type (data, methods, computed, watch), while the Composition API groups code by logical concern. This makes large components easier to maintain and enables better code extraction. In a 500-line component, related logic for a single feature might be scattered across data, computed, methods, and watch options. The Composition API lets you keep all that logic together in a single function.',
    compVsOptExtra: 'Both APIs have access to the same underlying Vue reactivity system. The Composition API does not deprecate the Options API. You can even use both in the same component during incremental migration. The key advantage is that composition functions can be extracted, tested, and shared independently.',
    compVsOptExtra2: 'In real-world applications, the Composition API shines when a component handles multiple concerns. For example, a dashboard component might manage user preferences, real-time data fetching, and chart rendering. With Options API, these three concerns would be interleaved across data, methods, and watchers. With Composition API, each concern lives in its own composable: usePreferences(), useRealtimeData(), and useChartRenderer().',
    compVsOptTip: 'Migration tip: You can use both APIs in the same component during migration. The Composition API setup() runs before Options API hooks, and they share the same component instance.',

    h2Reactive: '2. Reactive System: ref, reactive, computed, watch',
    reactiveDesc: 'Vue 3 provides multiple reactive primitives. Use ref() for primitive values (strings, numbers, booleans) and reactive() for objects. computed() creates cached derived state that only recalculates when dependencies change, while watch() and watchEffect() handle side effects when reactive data changes.',
    reactiveExtra: 'The key difference between watch and watchEffect is dependency tracking. watch() requires you to specify the source explicitly and provides both old and new values. watchEffect() automatically tracks all reactive dependencies used inside its callback, which is simpler but less precise.',
    reactiveExtra2: 'toRef() and toRefs() are essential utilities for destructuring reactive objects without losing reactivity. toRef creates a ref linked to a specific property of a reactive object, while toRefs converts all properties to individual refs. This is particularly useful when returning state from composables.',
    reactiveTip: 'Best practice: Prefer ref() over reactive() for top-level state. ref() works with primitives and objects, and its .value convention makes reactivity explicit. Use reactive() for local objects that you never need to reassign.',

    h2Composables: '3. Composables: Reusable Logic',
    composablesDesc: 'Composables are functions prefixed with "use" that encapsulate and reuse stateful logic using the Composition API. They replace mixins from Vue 2 with a cleaner, type-safe pattern that avoids naming conflicts. Each composable is a standalone function with explicit inputs and outputs.',
    composablesExtra: 'Common composable patterns include useFetch for data fetching, useLocalStorage for persisted state, useEventListener for DOM events, useMediaQuery for responsive design, and useIntersectionObserver for visibility detection. The VueUse library provides over 200 production-ready composables.',
    composablesExtra2: 'When building composables, follow the cleanup pattern: if your composable sets up event listeners, intervals, or subscriptions, use onUnmounted to clean them up. Accept ref or getter arguments for reactive inputs using toValue() from Vue 3.3, which handles both ref values and getter functions uniformly.',
    composablesTip: 'Convention: Always prefix composable names with "use" (useFetch, useAuth, useLocalStorage). Return reactive refs and functions as a plain object, never a reactive wrapper. Composables can call other composables to compose complex behavior.',

    h2PropsEmits: '4. Props & Emits with defineProps and defineEmits',
    propsEmitsDesc: 'Script setup provides compiler macros defineProps and defineEmits for type-safe component communication. These macros are compiled away at build time and do not need to be imported. withDefaults sets default prop values while maintaining full type inference.',
    propsEmitsExtra: 'Vue 3.3 introduced the defineModel macro for two-way binding, simplifying the v-model pattern. Instead of manually declaring a prop and emit, defineModel creates a ref that automatically syncs with the parent v-model value.',
    propsEmitsExtra2: 'For complex components with many props, consider grouping related props into an interface and importing it. This keeps prop definitions clean and reusable across multiple components. The defineSlots macro provides type-safe scoped slots, enabling full TypeScript checking for slot content.',
    propsEmitsTip: 'Type-only props: defineProps supports both runtime declaration and type-only declaration. The type-only approach provides better TypeScript integration and is recommended for TypeScript projects.',

    h2ProvideInject: '5. Provide/Inject: Dependency Injection',
    provideInjectDesc: 'Provide and inject enable passing data through the component tree without prop drilling. With TypeScript, you can use InjectionKey for full type safety across the provider and consumer. This pattern is especially useful for plugins, theme systems, and shared services.',
    provideInjectExtra: 'Unlike props, provided values are not reactive by default. To make them reactive, provide a ref or reactive object. The injecting component will then automatically track changes. You can also provide functions to allow child components to update shared state.',
    provideInjectExtra2: 'A common pattern is creating a useProvide/useInject pair for each context. The provider composable calls provide() and the consumer composable calls inject() with proper error handling. This encapsulates the injection key and types, making the API clean for consumers who just call useTheme() or useAuth().',
    provideInjectTip: 'Safety tip: Always provide a default value or handle the undefined case when using inject(). Use InjectionKey<T> from vue to ensure the provided and injected types match at compile time.',

    h2Router: '6. Vue Router 4: Composition API Integration',
    routerDesc: 'Vue Router 4 provides composable functions like useRouter() and useRoute() for navigation and route access inside setup(). Navigation guards can be defined per-component using onBeforeRouteLeave and onBeforeRouteUpdate.',
    routerExtra: 'Route-level code splitting with lazy loading is essential for performance. Use dynamic imports in your route definitions to split each page into a separate chunk. Combined with prefetching, this ensures fast initial load while keeping navigation instant.',
    routerExtra2: 'Vue Router 4 supports typed route definitions with the RouteRecordRaw interface. Define your routes in a separate file for better organization and use route meta fields for authentication guards, breadcrumbs, or page titles. The beforeEach global guard checks meta.requiresAuth to protect routes.',
    routerTip: 'Performance tip: Use defineAsyncComponent with dynamic imports for route-level code splitting. This loads each route component only when the user navigates to it, significantly reducing the initial bundle size.',

    h2Pinia: '7. Pinia State Management',
    piniaDesc: 'Pinia is the official Vue state management library, replacing Vuex. It offers a simple API with defineStore, supports both options and setup syntax, and provides full TypeScript type inference without extra configuration.',
    piniaExtra: 'Pinia stores are automatically tree-shakeable, meaning unused stores are excluded from the production bundle. Stores can subscribe to each other, support plugins for persistence or logging, and integrate with Vue DevTools for time-travel debugging.',
    piniaExtra2: 'Pinia supports server-side rendering out of the box. In SSR applications, each request gets its own Pinia instance to avoid state leaking between users. Use the storeToRefs() helper to destructure store state while maintaining reactivity, similar to toRefs() for reactive objects.',
    piniaTip: 'Architecture tip: Keep stores small and focused on a single domain (useCartStore, useAuthStore). Use the setup store syntax for better TypeScript inference and to leverage the full Composition API inside your stores.',

    h2ScriptSetup: '8. Script Setup: defineExpose, defineOptions, Top-Level Await',
    scriptSetupDesc: 'Script setup is syntactic sugar that compiles the entire script block into the setup() function. Variables, functions, and imports declared at the top level are automatically available in the template without explicit return statements.',
    scriptSetupExtra: 'defineExpose is critical when using template refs to call child component methods. Without it, nothing in the script setup is accessible to the parent. defineOptions sets component-level options like name and inheritAttrs that cannot be declared in script setup otherwise.',
    scriptSetupExtra2: 'When migrating from the Options API, note that script setup components no longer have a this context. Instead of this.$refs, use template ref variables. Instead of this.$emit, use the emit function from defineEmits. The Vue DevTools fully support script setup components with the same inspection capabilities.',
    scriptSetupTip: 'Important: Top-level await requires a Suspense boundary in the parent component. The component will not render until the awaited promise resolves, and Suspense will display the fallback content during loading.',

    h2TeleportSuspense: '9. Teleport & Suspense',
    teleportSuspenseDesc: 'Teleport renders its slot content to a different DOM location specified by a CSS selector, solving the common z-index and overflow issues with modals and tooltips. Suspense handles async dependencies in the component tree with built-in loading states.',
    teleportSuspenseExtra: 'Suspense can handle multiple async dependencies at once. If a component tree has three async children, Suspense waits for all of them before switching from fallback to default content. You can also nest Suspense boundaries for more granular loading states.',
    teleportSuspenseExtra2: 'Teleport supports a disabled prop that conditionally keeps the content in its original location. This is useful for responsive designs where a modal should only teleport on larger screens. You can also teleport to multiple targets by using multiple Teleport components with different to props.',
    teleportSuspenseTip: 'Pattern: Combine Teleport with Transition for animated modals. The Teleport renders the modal at the body level, while Transition handles enter and leave animations seamlessly.',

    h2Directives: '10. Custom Directives',
    directivesDesc: 'Custom directives provide low-level DOM access when you need direct manipulation beyond what templates offer. In Vue 3, directives use lifecycle hooks that mirror component hooks: created, beforeMount, mounted, beforeUpdate, updated, beforeUnmount, and unmounted.',
    directivesExtra: 'Directives receive three arguments: the DOM element, a binding object containing the value, argument, and modifiers, and the virtual node. For simple cases where you only need mounted and updated with the same behavior, use the shorthand function syntax.',
    directivesExtra2: 'In script setup, any camelCase variable starting with "v" is automatically available as a custom directive in the template. For example, declaring const vFocus = { mounted: el => el.focus() } makes v-focus available without any registration step. Global directives should be registered on the app instance.',
    directivesTip: 'When to use: Prefer composables for most reusable logic. Use directives only when you need direct DOM manipulation that cannot be achieved through template bindings, such as focus management or intersection observation.',

    h2Transitions: '11. Transition & Animation',
    transitionsDesc: 'Vue provides built-in Transition and TransitionGroup components for applying CSS and JavaScript animations when elements enter, leave, or move within the DOM. They automatically apply CSS classes at specific stages of the transition lifecycle.',
    transitionsExtra: 'TransitionGroup renders an actual element (specified by the tag prop) and applies move transitions using FLIP animation technique. This enables smooth list reordering animations. JavaScript hooks (onBeforeEnter, onEnter, onLeave) allow integration with animation libraries like GSAP.',
    transitionsExtra2: 'For complex multi-step animations, use the mode prop on Transition. The out-in mode waits for the current element to leave before the new one enters, preventing layout glitches. The in-out mode does the opposite. Without mode, both transitions happen simultaneously, which can cause visual overlap.',
    transitionsTip: 'Performance tip: Use CSS transitions over JavaScript hooks when possible. For TransitionGroup list animations, add the move class for smooth FLIP animations. Set appear prop to animate on initial render.',

    h2Testing: '12. Testing with Vitest',
    testingDesc: 'Vitest is the recommended testing framework for Vue 3 projects, built on top of Vite for instant test execution. It integrates seamlessly with Vue Test Utils for component testing and supports snapshot testing, mocking, and code coverage.',
    testingExtra: 'For end-to-end testing, pair Vitest unit tests with Playwright or Cypress. Vitest handles component and composable testing, while E2E tools verify the full user journey. Use Vitest coverage reports to identify untested code paths in your application.',
    testingExtra2: 'Use vi.mock() to mock API calls and external dependencies in your tests. Vitest supports both timer mocking (vi.useFakeTimers) for testing debounced composables and DOM environment simulation through happy-dom or jsdom. Always test both the happy path and error states.',
    testingTip: 'Testing strategy: Test composables as pure functions when they have no lifecycle dependencies. For composables that use onMounted or watch, mount them inside a simple wrapper component using Vue Test Utils.',

    h2Performance: '13. Performance Optimization',
    performanceDesc: 'Vue 3 provides several tools for optimizing rendering performance. shallowRef avoids deep reactivity tracking for large objects, computed caches expensive calculations and only re-evaluates when dependencies change, v-memo skips re-rendering list items when specified values stay the same.',
    performanceExtra: 'For lists with thousands of items, implement virtual scrolling using libraries like vue-virtual-scroller. This renders only the visible items in the viewport, dramatically reducing DOM nodes and improving scroll performance. Combine with shallowRef for the list data to avoid deep reactivity overhead.',
    performanceExtra2: 'Another important optimization is using markRaw() for large objects that should never be reactive, such as third-party class instances, large constant datasets, or Web Worker references. This tells Vue to skip the reactivity proxy entirely, avoiding the overhead of deep observation on objects that will never change.',
    performanceTip: 'Profiling: Use Vue DevTools Performance tab to identify slow components. Look for components that re-render frequently without visible changes. These are candidates for shallowRef, v-memo, or computed optimization.',

    h2Summary: 'Summary: Building Modern Vue 3 Applications',
    summaryP1: 'The Composition API fundamentally changes how we organize Vue components. By grouping logic by feature rather than by option type, components become easier to read, maintain, and refactor. The key building blocks are ref and reactive for state, computed for derived values, and watch/watchEffect for side effects.',
    summaryP2: 'Composables are the cornerstone of code reuse in Vue 3. They provide a clean, type-safe alternative to mixins with explicit dependencies and return values. Combined with Pinia for global state and Vue Router 4 for navigation, the Composition API delivers a cohesive, scalable development experience.',
    summaryP3: 'For production applications, always consider performance from the start. Use shallowRef for large data structures, computed for expensive derivations, v-memo for list rendering optimization, and lazy loading for route-level code splitting. Test your components with Vitest and Vue Test Utils to maintain confidence as your application grows.',
    summaryP4: 'The Vue ecosystem in 2026 is mature and cohesive. With official tools like Pinia, Vue Router, Vitest, and VitePress all designed around the Composition API, you get a consistent developer experience from state management to documentation. Start with script setup, build composables for shared logic, and gradually adopt advanced patterns as your application demands them.',
  },
  zh: {
    title: 'Vue 3 组合式 API 完全指南 2026：从选项式到组合式',
    intro: 'Vue 3 组合式 API 是构建 Vue 应用的现代方式。它提供了更好的 TypeScript 支持、通过组合函数实现更好的代码复用，以及更灵活的组件组织方式。本指南涵盖了从响应式原语到 Pinia、Vue Router 4、Vitest 测试和性能优化等高级模式，帮助你构建生产级 Vue 应用。',
    tldr: '组合式 API 用基于函数的 setup 逻辑替代了选项式 API。使用 ref() 处理原始值，reactive() 处理对象，computed() 处理派生状态。将可复用逻辑提取为组合函数。使用 Pinia 进行状态管理，Vue Router 4 进行导航，Vitest 进行测试。通过 shallowRef、v-memo 和虚拟滚动进行优化。',
    takeaway1: '组合式 API 通过将相关逻辑组织在一起而非分散在各选项中，实现了更好的代码组织。',
    takeaway2: '组合函数（use* 函数）以完整的 TypeScript 支持取代混入，成为主要的代码复用模式。',
    takeaway3: 'Pinia 是官方状态管理方案，提供比 Vuex 更简洁的 API 和完整的 TypeScript 类型推断。',
    takeaway4: '使用 defineProps 和 defineEmits 的 script setup 是单文件组件的推荐语法。',
    takeaway5: 'shallowRef、v-memo 和 computed 缓存等性能工具可防止不必要的重新渲染。',
    takeaway6: 'Vue Router 4 组合函数（useRouter、useRoute）与组合式 API 无缝集成进行导航。',
    takeaway7: 'Teleport 和 Suspense 是内置组件，无需第三方库即可解决常见 UI 模式。',

    h2CompVsOpt: '1. 组合式 API 与选项式 API',
    compVsOptDesc: '选项式 API 按选项类型（data、methods、computed、watch）组织代码，而组合式 API 按逻辑关注点分组。在一个 500 行的组件中，单个功能的相关逻辑可能分散在 data、computed、methods 和 watch 中。组合式 API 让你将所有相关逻辑放在一起。',
    compVsOptExtra: '两种 API 都使用相同的底层 Vue 响应式系统。组合式 API 不会废弃选项式 API。你甚至可以在增量迁移期间在同一组件中同时使用两者。关键优势是组合函数可以独立提取、测试和共享。',
    compVsOptExtra2: '在实际应用中，当组件处理多个关注点时，组合式 API 优势明显。例如仪表板组件可能管理用户偏好、实时数据获取和图表渲染。使用选项式 API，这三个关注点会交织在 data、methods 和 watchers 中。使用组合式 API，每个关注点都在自己的组合函数中：usePreferences()、useRealtimeData() 和 useChartRenderer()。',
    compVsOptTip: '迁移提示：迁移期间可以在同一组件中同时使用两种 API。组合式 API 的 setup() 在选项式 API 钩子之前运行，它们共享同一组件实例。',

    h2Reactive: '2. 响应式系统：ref、reactive、computed、watch',
    reactiveDesc: 'Vue 3 提供多种响应式原语。使用 ref() 处理原始值（字符串、数字、布尔值），reactive() 处理对象。computed() 创建缓存的派生状态，仅在依赖变化时重新计算。watch() 和 watchEffect() 处理响应式数据变化时的副作用。',
    reactiveExtra: 'watch 和 watchEffect 的关键区别在于依赖追踪。watch() 需要你明确指定源并提供旧值和新值。watchEffect() 自动追踪回调中使用的所有响应式依赖，更简单但不那么精确。',
    reactiveExtra2: 'toRef() 和 toRefs() 是解构响应式对象而不丢失响应性的重要工具。toRef 创建链接到 reactive 对象特定属性的 ref，而 toRefs 将所有属性转换为独立的 ref。这在从组合函数返回状态时特别有用。',
    reactiveTip: '最佳实践：顶层状态优先使用 ref() 而非 reactive()。ref() 同时支持原始值和对象，其 .value 约定使响应式更明确。仅对不需要重新赋值的局部对象使用 reactive()。',

    h2Composables: '3. 组合函数：可复用逻辑',
    composablesDesc: '组合函数是以 "use" 为前缀的函数，使用组合式 API 封装和复用有状态逻辑。它们以更干净、类型安全的模式替代 Vue 2 的混入，避免命名冲突。每个组合函数都是独立的函数，具有明确的输入和输出。',
    composablesExtra: '常见的组合函数模式包括 useFetch 用于数据获取、useLocalStorage 用于持久化状态、useEventListener 用于 DOM 事件、useMediaQuery 用于响应式设计。VueUse 库提供了 200 多个生产就绪的组合函数。',
    composablesExtra2: '构建组合函数时，遵循清理模式：如果组合函数设置了事件监听器、定时器或订阅，使用 onUnmounted 进行清理。使用 Vue 3.3 的 toValue() 接受 ref 或 getter 参数作为响应式输入，它统一处理 ref 值和 getter 函数。',
    composablesTip: '命名约定：始终以 "use" 为前缀命名组合函数。以普通对象返回响应式 ref 和函数，而非 reactive 包装器。组合函数可以调用其他组合函数来组合复杂行为。',

    h2PropsEmits: '4. Props 与 Emits：defineProps 和 defineEmits',
    propsEmitsDesc: 'script setup 提供编译器宏 defineProps 和 defineEmits，实现类型安全的组件通信。这些宏在构建时编译掉，无需导入。withDefaults 在保持完整类型推断的同时设置默认属性值。',
    propsEmitsExtra: 'Vue 3.3 引入了 defineModel 宏用于双向绑定，简化了 v-model 模式。无需手动声明 prop 和 emit，defineModel 创建一个自动与父组件 v-model 值同步的 ref。',
    propsEmitsExtra2: '对于具有大量 props 的复杂组件，考虑将相关 props 分组到接口中并导入。这使 props 定义保持干净且可在多个组件间复用。defineSlots 宏提供类型安全的作用域插槽，实现插槽内容的完整 TypeScript 检查。',
    propsEmitsTip: '类型声明 Props：defineProps 支持运行时声明和仅类型声明。仅类型方式提供更好的 TypeScript 集成，推荐用于 TypeScript 项目。',

    h2ProvideInject: '5. Provide/Inject：依赖注入',
    provideInjectDesc: 'provide 和 inject 允许在组件树中传递数据而无需逐层传递 props。使用 TypeScript 的 InjectionKey 可在提供者和消费者之间实现完整的类型安全。此模式特别适用于插件、主题系统和共享服务。',
    provideInjectExtra: '与 props 不同，提供的值默认不是响应式的。要使其响应式，提供 ref 或 reactive 对象。注入组件将自动追踪变化。你也可以提供函数让子组件更新共享状态。',
    provideInjectExtra2: '常见模式是为每个上下文创建 useProvide/useInject 对。提供者组合函数调用 provide()，消费者组合函数调用 inject() 并进行适当的错误处理。这封装了注入键和类型，使消费者只需调用 useTheme() 或 useAuth() 即可。',
    provideInjectTip: '安全提示：使用 inject() 时始终提供默认值或处理 undefined 情况。使用 InjectionKey<T> 确保提供和注入的类型在编译时匹配。',

    h2Router: '6. Vue Router 4：组合式 API 集成',
    routerDesc: 'Vue Router 4 提供 useRouter() 和 useRoute() 等组合函数在 setup() 中进行导航和路由访问。导航守卫可通过 onBeforeRouteLeave 和 onBeforeRouteUpdate 在组件级别定义。',
    routerExtra: '使用懒加载的路由级代码分割对性能至关重要。在路由定义中使用动态导入将每个页面分割为单独的块。结合预取，确保快速初始加载的同时保持导航即时性。',
    routerExtra2: 'Vue Router 4 通过 RouteRecordRaw 接口支持类型化的路由定义。将路由定义在单独的文件中以更好地组织代码，使用路由 meta 字段进行认证守卫、面包屑或页面标题。全局 beforeEach 守卫检查 meta.requiresAuth 来保护路由。',
    routerTip: '性能提示：使用 defineAsyncComponent 配合动态导入进行路由级代码分割。仅在用户导航到该路由时才加载对应组件，显著减少初始包大小。',

    h2Pinia: '7. Pinia 状态管理',
    piniaDesc: 'Pinia 是 Vue 官方状态管理库，替代 Vuex。它通过 defineStore 提供简洁的 API，同时支持选项式和 setup 语法，无需额外配置即可提供完整的 TypeScript 类型推断。',
    piniaExtra: 'Pinia store 自动支持 tree-shaking，未使用的 store 会从生产包中排除。Store 可以相互订阅，支持用于持久化或日志记录的插件，并与 Vue DevTools 集成进行时间旅行调试。',
    piniaExtra2: 'Pinia 开箱即用支持服务端渲染。在 SSR 应用中，每个请求获得自己的 Pinia 实例以避免用户之间的状态泄露。使用 storeToRefs() 辅助函数解构 store 状态同时保持响应式，类似于 reactive 对象的 toRefs()。',
    piniaTip: '架构提示：保持 store 小而专注于单一领域。使用 setup store 语法获得更好的 TypeScript 推断，并在 store 中充分利用组合式 API。',

    h2ScriptSetup: '8. Script Setup：defineExpose、defineOptions、顶层 await',
    scriptSetupDesc: 'script setup 是语法糖，将整个脚本块编译为 setup() 函数。顶层声明的变量、函数和导入自动在模板中可用，无需显式 return 语句。',
    scriptSetupExtra: '使用模板 ref 调用子组件方法时 defineExpose 至关重要。没有它，script setup 中的内容对父组件不可访问。defineOptions 设置组件名称和 inheritAttrs 等选项。',
    scriptSetupExtra2: '从选项式 API 迁移时，注意 script setup 组件不再有 this 上下文。使用模板 ref 变量替代 this.$refs，使用 defineEmits 的 emit 函数替代 this.$emit。Vue DevTools 完全支持 script setup 组件，具有相同的检查功能。',
    scriptSetupTip: '注意：顶层 await 需要父组件中的 Suspense 边界。组件在 await 的 promise 解决前不会渲染，Suspense 会在加载期间显示回退内容。',

    h2TeleportSuspense: '9. Teleport 与 Suspense',
    teleportSuspenseDesc: 'Teleport 将插槽内容渲染到 CSS 选择器指定的不同 DOM 位置，解决模态框和工具提示常见的 z-index 和 overflow 问题。Suspense 提供了处理组件树中异步依赖的方式，内置加载状态。',
    teleportSuspenseExtra: 'Suspense 可以同时处理多个异步依赖。如果组件树有三个异步子组件，Suspense 等待所有子组件完成后才从回退切换到默认内容。你也可以嵌套 Suspense 边界实现更精细的加载状态。',
    teleportSuspenseExtra2: 'Teleport 支持 disabled 属性，可条件性地将内容保留在原始位置。这对于响应式设计很有用，模态框仅在大屏幕上才进行 teleport。你也可以通过使用多个具有不同 to 属性的 Teleport 组件来传送到多个目标。',
    teleportSuspenseTip: '模式：将 Teleport 与 Transition 结合用于动画模态框。Teleport 在 body 层渲染模态框，Transition 无缝处理进入和离开动画。',

    h2Directives: '10. 自定义指令',
    directivesDesc: '当需要模板之外的直接 DOM 操作时，自定义指令提供底层 DOM 访问。Vue 3 中指令使用与组件生命周期对应的钩子：created、beforeMount、mounted、beforeUpdate、updated、beforeUnmount 和 unmounted。',
    directivesExtra: '指令接收三个参数：DOM 元素、包含值、参数和修饰符的绑定对象，以及虚拟节点。对于只需要 mounted 和 updated 且行为相同的简单情况，可以使用简写函数语法。',
    directivesExtra2: '在 script setup 中，任何以 "v" 开头的驼峰式变量自动作为自定义指令在模板中可用。例如声明 const vFocus = { mounted: el => el.focus() } 就可以使用 v-focus，无需任何注册步骤。全局指令应在 app 实例上注册。',
    directivesTip: '使用时机：大多数可复用逻辑优先使用组合函数。仅在无法通过模板绑定实现的直接 DOM 操作时使用指令，如焦点管理或交叉观察。',

    h2Transitions: '11. 过渡与动画',
    transitionsDesc: 'Vue 提供内置的 Transition 和 TransitionGroup 组件，在元素进入、离开或在 DOM 中移动时应用 CSS 和 JavaScript 动画。它们在过渡生命周期的特定阶段自动应用 CSS 类。',
    transitionsExtra: 'TransitionGroup 渲染实际元素（由 tag 属性指定），使用 FLIP 动画技术应用移动过渡。这实现了流畅的列表重排动画。JavaScript 钩子允许集成 GSAP 等动画库。',
    transitionsExtra2: '对于复杂的多步骤动画，在 Transition 上使用 mode 属性。out-in 模式等待当前元素离开后新元素再进入，防止布局闪烁。in-out 模式相反。不设置 mode 时，两个过渡同时进行，可能导致视觉重叠。',
    transitionsTip: '性能提示：尽可能使用 CSS 过渡而非 JavaScript 钩子。对于 TransitionGroup 列表动画，添加 move 类来流畅处理 FLIP 动画。设置 appear 属性以在初始渲染时添加动画。',

    h2Testing: '12. 使用 Vitest 测试',
    testingDesc: 'Vitest 是 Vue 3 项目推荐的测试框架，基于 Vite 构建，实现即时测试执行。它与 Vue Test Utils 无缝集成进行组件测试，支持快照测试、模拟和代码覆盖率。',
    testingExtra: '对于端到端测试，将 Vitest 单元测试与 Playwright 或 Cypress 配对。Vitest 处理组件和组合函数测试，E2E 工具验证完整的用户旅程。使用 Vitest 覆盖率报告识别应用中未测试的代码路径。',
    testingExtra2: '使用 vi.mock() 模拟测试中的 API 调用和外部依赖。Vitest 支持定时器模拟（vi.useFakeTimers）用于测试防抖组合函数，以及通过 happy-dom 或 jsdom 模拟 DOM 环境。始终测试正常路径和错误状态。',
    testingTip: '测试策略：当组合函数没有生命周期依赖时，作为纯函数测试。对于使用 onMounted 或 watch 的组合函数，使用 Vue Test Utils 将它们挂载在简单的包装组件中。',

    h2Performance: '13. 性能优化',
    performanceDesc: 'Vue 3 提供多种工具优化渲染性能。shallowRef 避免大对象的深层响应式追踪，computed 缓存昂贵的计算并仅在依赖变化时重新求值，v-memo 在指定值未变化时跳过列表项的重新渲染。',
    performanceExtra: '对于有数千项的列表，使用 vue-virtual-scroller 等库实现虚拟滚动。这只渲染视口中可见的项，大幅减少 DOM 节点并提高滚动性能。结合 shallowRef 用于列表数据以避免深层响应式开销。',
    performanceExtra2: '另一个重要优化是使用 markRaw() 处理永远不应该是响应式的大对象，如第三方类实例、大型常量数据集或 Web Worker 引用。这告诉 Vue 完全跳过响应式代理，避免对永不改变的对象进行深度观察的开销。',
    performanceTip: '性能分析：使用 Vue DevTools 性能面板识别慢组件。寻找频繁重新渲染但无可见变化的组件，它们是 shallowRef、v-memo 或 computed 优化的候选者。',

    faq1Q: '应该使用选项式 API 还是组合式 API？',
    faq1A: '新项目推荐使用组合式 API。它提供更好的 TypeScript 支持、通过组合函数改善代码复用，以及更灵活的代码组织方式。选项式 API 仍然受支持，适合简单组件，但组合式 API 在复杂应用中扩展性更好。',
    faq2Q: 'ref 和 reactive 有什么区别？',
    faq2A: 'ref() 将任何值包装在通过 .value 访问的响应式引用中。reactive() 使对象深度响应式，无需 .value。原始值使用 ref，需要重新赋值整个值时也用 ref。复杂对象就地修改时使用 reactive。',
    faq3Q: '组合函数与混入有什么不同？',
    faq3A: '组合函数是返回响应式状态和方法的普通函数。与混入不同，它们有明确的输入输出、无命名冲突、完整的 TypeScript 支持和清晰的数据流。它们可以组合在一起，不会出现混入的隐式合并行为。',
    faq4Q: 'Pinia 比 Vuex 好吗？',
    faq4A: '是的，Pinia 是 Vue 3 官方推荐的状态管理方案。它拥有更简洁的 API（无需 mutations）、完整的 TypeScript 推断、模块化设计，并支持选项式和组合式 API 模式。Vuex 已进入维护模式。',
    faq5Q: '什么时候用 provide/inject，什么时候用 props？',
    faq5A: '直接的父子通信使用 props。当数据需要跳过多个层级（避免 prop 逐层传递）或插件级依赖注入时使用 provide/inject。层级较浅时始终优先使用 props。',
    faq6Q: '如何测试组合函数？',
    faq6A: '在组件上下文中调用组合函数进行测试。使用 Vue Test Utils 的辅助工具或创建简单包装组件。对于没有生命周期钩子的组合函数，可直接作为函数测试。',
    faq7Q: '什么是 script setup，应该使用它吗？',
    faq7A: 'script setup 是减少单文件组件样板代码的编译时语法。变量和导入自动在模板中可用。它是所有使用组合式 API 的新 Vue 3 组件的推荐方式。',
    faq8Q: '如何优化 Vue 3 性能？',
    faq8A: '对整体变化的大对象使用 shallowRef，对昂贵的派生计算使用 computed，用 v-memo 跳过未变化列表项的重新渲染，对数千项的列表使用虚拟滚动。避免不必要的 watcher，尽可能使用 computed。',

    h2Summary: '总结：构建现代 Vue 3 应用',
    summaryP1: '组合式 API 从根本上改变了我们组织 Vue 组件的方式。通过按功能而非按选项类型分组逻辑，组件变得更易于阅读、维护和重构。关键构建块是 ref 和 reactive 用于状态，computed 用于派生值，watch/watchEffect 用于副作用。',
    summaryP2: '组合函数是 Vue 3 代码复用的基石。它们提供了干净、类型安全的混入替代方案，具有明确的依赖和返回值。结合 Pinia 用于全局状态和 Vue Router 4 用于导航，组合式 API 提供了一致、可扩展的开发体验。',
    summaryP3: '对于生产应用，始终从一开始就考虑性能。使用 shallowRef 处理大型数据结构，computed 处理昂贵的派生计算，v-memo 优化列表渲染，懒加载实现路由级代码分割。使用 Vitest 和 Vue Test Utils 测试组件，在应用增长时保持信心。',
    summaryP4: '2026 年的 Vue 生态系统成熟且紧密连接。Pinia、Vue Router、Vitest 和 VitePress 等官方工具都围绕组合式 API 设计，从状态管理到文档提供一致的开发体验。从 script setup 开始，为共享逻辑构建组合函数，随着应用需求逐步采用高级模式。',
  },
};

export default function VueCompositionGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
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

  const sectionStyle: React.CSSProperties = {
    marginBottom: '2rem',
  };
  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginTop: '2.5rem',
    marginBottom: '1rem',
    lineHeight: '1.3',
  };
  const pStyle: React.CSSProperties = {
    marginBottom: '1rem',
    lineHeight: '1.7',
    color: '#1f2937',
  };
  const preStyle: React.CSSProperties = {
    backgroundColor: '#111827',
    color: '#e5e7eb',
    padding: '1rem',
    borderRadius: '0.5rem',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  };
  const tldrStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '1rem 1.25rem',
    borderRadius: '0.5rem',
    marginBottom: '2rem',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };
  const takeawayStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    marginBottom: '2rem',
  };
  const ulStyle: React.CSSProperties = {
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
    listStyleType: 'disc',
    lineHeight: '1.7',
  };
  const liStyle: React.CSSProperties = {
    marginBottom: '0.5rem',
    lineHeight: '1.7',
    color: '#374151',
  };
  const tipStyle: React.CSSProperties = {
    background: '#fffbeb',
    borderLeft: '4px solid #f59e0b',
    padding: '0.75rem 1rem',
    borderRadius: '0.375rem',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    lineHeight: '1.6',
  };
  const faqBoxStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
  };
  const faqQStyle: React.CSSProperties = {
    fontWeight: 600,
    marginBottom: '0.5rem',
    fontSize: '1.05rem',
    color: '#111827',
  };
  const summaryBoxStyle: React.CSSProperties = {
    ...sectionStyle,
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    marginTop: '2.5rem',
  };

  const introStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    lineHeight: '1.75',
    marginBottom: '2rem',
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={introStyle}>{t.intro}</p>

      {/* TL;DR */}
      <div style={tldrStyle}>
        <strong>TL;DR: </strong>{t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={takeawayStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </h3>
        <ul style={ulStyle}>
          <li style={liStyle}>{t.takeaway1}</li>
          <li style={liStyle}>{t.takeaway2}</li>
          <li style={liStyle}>{t.takeaway3}</li>
          <li style={liStyle}>{t.takeaway4}</li>
          <li style={liStyle}>{t.takeaway5}</li>
          <li style={liStyle}>{t.takeaway6}</li>
          <li style={liStyle}>{t.takeaway7}</li>
        </ul>
      </div>

      {/* Section 1: Composition vs Options */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2CompVsOpt}</h2>
        <p style={pStyle}>{t.compVsOptDesc}</p>
        <p style={pStyle}>{t.compVsOptExtra}</p>
        <p style={pStyle}>{t.compVsOptExtra2}</p>
        <pre style={preStyle}><code>{'// Options API (Vue 2 style)\n' +
'export default {\n' +
'  data() {\n' +
'    return { count: 0, name: "Vue" };\n' +
'  },\n' +
'  computed: {\n' +
'    double() { return this.count * 2; }\n' +
'  },\n' +
'  methods: {\n' +
'    increment() { this.count++; }\n' +
'  }\n' +
'};\n\n' +
'// Composition API (Vue 3)\n' +
'import { ref, computed } from "vue";\n' +
'const count = ref(0);\n' +
'const name = ref("Vue");\n' +
'const double = computed(() => count.value * 2);\n' +
'const increment = () => count.value++;'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.compVsOptTip}
        </div>
      </div>

      {/* Section 2: Reactive System */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2Reactive}</h2>
        <p style={pStyle}>{t.reactiveDesc}</p>
        <p style={pStyle}>{t.reactiveExtra}</p>
        <p style={pStyle}>{t.reactiveExtra2}</p>
        <pre style={preStyle}><code>{'import { ref, reactive, computed,\n' +
'  watch, watchEffect } from "vue";\n\n' +
'// ref: wraps primitives (access via .value)\n' +
'const count = ref(0);\n' +
'count.value++; // 1\n\n' +
'// reactive: deep reactive object (no .value)\n' +
'const state = reactive({ items: [], loading: false });\n' +
'state.loading = true;\n\n' +
'// computed: cached derived state\n' +
'const total = computed(() => state.items.length);\n\n' +
'// watch: react to specific source changes\n' +
'watch(count, (newVal, oldVal) => {\n' +
'  console.log(`Changed: \\${oldVal} -> \\${newVal}`);\n' +
'});\n\n' +
'// watchEffect: auto-tracks dependencies\n' +
'watchEffect(() => {\n' +
'  console.log("Count:", count.value);\n' +
'});'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.reactiveTip}
        </div>
      </div>

      {/* Section 3: Composables */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2Composables}</h2>
        <p style={pStyle}>{t.composablesDesc}</p>
        <p style={pStyle}>{t.composablesExtra}</p>
        <p style={pStyle}>{t.composablesExtra2}</p>
        <pre style={preStyle}><code>{'// composables/useFetch.ts\n' +
'import { ref, watchEffect } from "vue";\n\n' +
'export function useFetch<T>(url: string) {\n' +
'  const data = ref<T | null>(null);\n' +
'  const error = ref<string | null>(null);\n' +
'  const loading = ref(true);\n\n' +
'  watchEffect(async () => {\n' +
'    loading.value = true;\n' +
'    try {\n' +
'      const res = await fetch(url);\n' +
'      data.value = await res.json();\n' +
'    } catch (e: any) {\n' +
'      error.value = e.message;\n' +
'    } finally {\n' +
'      loading.value = false;\n' +
'    }\n' +
'  });\n' +
'  return { data, error, loading };\n' +
'}'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.composablesTip}
        </div>
      </div>

      {/* Section 4: Props & Emits */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2PropsEmits}</h2>
        <p style={pStyle}>{t.propsEmitsDesc}</p>
        <p style={pStyle}>{t.propsEmitsExtra}</p>
        <p style={pStyle}>{t.propsEmitsExtra2}</p>
        <pre style={preStyle}><code>{'<script setup lang="ts">\n' +
'// defineProps with TypeScript types\n' +
'interface Props {\n' +
'  title: string;\n' +
'  count?: number;\n' +
'  items: string[];\n' +
'}\n' +
'const props = withDefaults(defineProps<Props>(), {\n' +
'  count: 0,\n' +
'  items: () => [],\n' +
'});\n\n' +
'// defineEmits with typed events\n' +
'const emit = defineEmits<{\n' +
'  update: [value: string];\n' +
'  delete: [id: number];\n' +
'  submit: [];\n' +
'}>(); \n\n' +
'emit("update", "new value");\n' +
'emit("delete", 42);\n' +
'</script>'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.propsEmitsTip}
        </div>
      </div>

      {/* Section 5: Provide/Inject */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2ProvideInject}</h2>
        <p style={pStyle}>{t.provideInjectDesc}</p>
        <p style={pStyle}>{t.provideInjectExtra}</p>
        <p style={pStyle}>{t.provideInjectExtra2}</p>
        <pre style={preStyle}><code>{'// types/injection-keys.ts\n' +
'import type { InjectionKey, Ref } from "vue";\n\n' +
'export interface UserContext {\n' +
'  name: Ref<string>;\n' +
'  logout: () => void;\n' +
'}\n' +
'export const UserKey: InjectionKey<UserContext>\n' +
'  = Symbol("UserContext");\n\n' +
'// ParentComponent.vue\n' +
'import { provide, ref } from "vue";\n' +
'import { UserKey } from "./types/injection-keys";\n' +
'const name = ref("Alice");\n' +
'provide(UserKey, {\n' +
'  name,\n' +
'  logout: () => { /* clear session */ }\n' +
'});\n\n' +
'// ChildComponent.vue (any depth)\n' +
'import { inject } from "vue";\n' +
'import { UserKey } from "./types/injection-keys";\n' +
'const user = inject(UserKey); // fully typed'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.provideInjectTip}
        </div>
      </div>

      {/* Section 6: Vue Router 4 */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2Router}</h2>
        <p style={pStyle}>{t.routerDesc}</p>
        <p style={pStyle}>{t.routerExtra}</p>
        <p style={pStyle}>{t.routerExtra2}</p>
        <pre style={preStyle}><code>{'import { useRouter, useRoute,\n' +
'  onBeforeRouteLeave } from "vue-router";\n\n' +
'const router = useRouter();\n' +
'const route = useRoute();\n\n' +
'// Programmatic navigation\n' +
'router.push({ name: "user", params: { id: "123" } });\n' +
'router.replace("/dashboard");\n\n' +
'// Access route params reactively\n' +
'watch(() => route.params.id, (newId) => {\n' +
'  fetchUser(newId as string);\n' +
'});\n\n' +
'// Per-component navigation guard\n' +
'onBeforeRouteLeave((to, from) => {\n' +
'  if (hasUnsavedChanges.value) {\n' +
'    return confirm("Discard unsaved changes?");\n' +
'  }\n' +
'});'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.routerTip}
        </div>
      </div>

      {/* Section 7: Pinia */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2Pinia}</h2>
        <p style={pStyle}>{t.piniaDesc}</p>
        <p style={pStyle}>{t.piniaExtra}</p>
        <p style={pStyle}>{t.piniaExtra2}</p>
        <pre style={preStyle}><code>{'import { defineStore } from "pinia";\n' +
'import { ref, computed } from "vue";\n\n' +
'// Setup store syntax (recommended)\n' +
'export const useCartStore = defineStore("cart", () => {\n' +
'  const items = ref<CartItem[]>([]);\n\n' +
'  const total = computed(() =>\n' +
'    items.value.reduce((s, i) => s + i.price * i.qty, 0)\n' +
'  );\n\n' +
'  function addItem(product: Product) {\n' +
'    const existing = items.value.find(\n' +
'      i => i.id === product.id\n' +
'    );\n' +
'    if (existing) existing.qty++;\n' +
'    else items.value.push({ ...product, qty: 1 });\n' +
'  }\n\n' +
'  function clear() { items.value = []; }\n\n' +
'  return { items, total, addItem, clear };\n' +
'});'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.piniaTip}
        </div>
      </div>

      {/* Section 8: Script Setup */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2ScriptSetup}</h2>
        <p style={pStyle}>{t.scriptSetupDesc}</p>
        <p style={pStyle}>{t.scriptSetupExtra}</p>
        <p style={pStyle}>{t.scriptSetupExtra2}</p>
        <pre style={preStyle}><code>{'<script setup lang="ts">\n' +
'import { ref } from "vue";\n\n' +
'// defineOptions: set component name, inheritAttrs\n' +
'defineOptions({\n' +
'  name: "MyDialog",\n' +
'  inheritAttrs: false\n' +
'});\n\n' +
'// Component logic\n' +
'const visible = ref(false);\n' +
'const open = () => (visible.value = true);\n' +
'const close = () => (visible.value = false);\n\n' +
'// defineExpose: expose methods to parent via ref\n' +
'defineExpose({ open, close });\n\n' +
'// Top-level await (needs Suspense parent)\n' +
'const config = await fetch("/api/config")\n' +
'  .then(r => r.json());\n' +
'</script>'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.scriptSetupTip}
        </div>
      </div>

      {/* Section 9: Teleport & Suspense */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2TeleportSuspense}</h2>
        <p style={pStyle}>{t.teleportSuspenseDesc}</p>
        <p style={pStyle}>{t.teleportSuspenseExtra}</p>
        <p style={pStyle}>{t.teleportSuspenseExtra2}</p>
        <pre style={preStyle}><code>{'<!-- Teleport: render modal at document body -->\n' +
'<template>\n' +
'  <button @click="showModal = true">Open</button>\n' +
'  <Teleport to="body">\n' +
'    <div v-if="showModal" class="modal-overlay">\n' +
'      <div class="modal-content">\n' +
'        <slot />\n' +
'        <button @click="showModal = false">\n' +
'          Close\n' +
'        </button>\n' +
'      </div>\n' +
'    </div>\n' +
'  </Teleport>\n' +
'</template>\n\n' +
'<!-- Suspense: async component with fallback -->\n' +
'<Suspense>\n' +
'  <template #default><AsyncDashboard /></template>\n' +
'  <template #fallback>\n' +
'    <div>Loading dashboard...</div>\n' +
'  </template>\n' +
'</Suspense>'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.teleportSuspenseTip}
        </div>
      </div>

      {/* Section 10: Custom Directives */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2Directives}</h2>
        <p style={pStyle}>{t.directivesDesc}</p>
        <p style={pStyle}>{t.directivesExtra}</p>
        <p style={pStyle}>{t.directivesExtra2}</p>
        <pre style={preStyle}><code>{'// directives/vFocus.ts\n' +
'import type { Directive } from "vue";\n\n' +
'export const vFocus: Directive<HTMLInputElement> = {\n' +
'  mounted(el) { el.focus(); }\n' +
'};\n\n' +
'// directives/vIntersection.ts\n' +
'export const vIntersection: Directive<\n' +
'  HTMLElement, () => void\n' +
'> = {\n' +
'  mounted(el, binding) {\n' +
'    const observer = new IntersectionObserver(\n' +
'      ([entry]) => {\n' +
'        if (entry.isIntersecting) binding.value();\n' +
'      },\n' +
'      { threshold: 0.1 }\n' +
'    );\n' +
'    observer.observe(el);\n' +
'    (el as any).__ob = observer;\n' +
'  },\n' +
'  unmounted(el) {\n' +
'    (el as any).__ob?.disconnect();\n' +
'  }\n' +
'};'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.directivesTip}
        </div>
      </div>

      {/* Section 11: Transition & Animation */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2Transitions}</h2>
        <p style={pStyle}>{t.transitionsDesc}</p>
        <p style={pStyle}>{t.transitionsExtra}</p>
        <p style={pStyle}>{t.transitionsExtra2}</p>
        <pre style={preStyle}><code>{'<!-- CSS Transition -->\n' +
'<Transition name="fade">\n' +
'  <p v-if="show">Hello</p>\n' +
'</Transition>\n\n' +
'<style>\n' +
'.fade-enter-active,\n' +
'.fade-leave-active {\n' +
'  transition: opacity 0.3s ease;\n' +
'}\n' +
'.fade-enter-from,\n' +
'.fade-leave-to {\n' +
'  opacity: 0;\n' +
'}\n' +
'</style>\n\n' +
'<!-- TransitionGroup for lists -->\n' +
'<TransitionGroup name="list" tag="ul">\n' +
'  <li v-for="item in items" :key="item.id">\n' +
'    {{ item.text }}\n' +
'  </li>\n' +
'</TransitionGroup>'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.transitionsTip}
        </div>
      </div>

      {/* Section 12: Testing with Vitest */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2Testing}</h2>
        <p style={pStyle}>{t.testingDesc}</p>
        <p style={pStyle}>{t.testingExtra}</p>
        <p style={pStyle}>{t.testingExtra2}</p>
        <pre style={preStyle}><code>{'import { describe, it, expect } from "vitest";\n' +
'import { mount } from "@vue/test-utils";\n' +
'import Counter from "./Counter.vue";\n\n' +
'// Component test\n' +
'describe("Counter", () => {\n' +
'  it("increments on click", async () => {\n' +
'    const w = mount(Counter);\n' +
'    await w.find("button").trigger("click");\n' +
'    expect(w.text()).toContain("1");\n' +
'  });\n\n' +
'  it("renders with props", () => {\n' +
'    const w = mount(Counter, {\n' +
'      props: { initial: 5 }\n' +
'    });\n' +
'    expect(w.text()).toContain("5");\n' +
'  });\n' +
'});'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.testingTip}
        </div>
      </div>

      {/* Section 13: Performance */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2Performance}</h2>
        <p style={pStyle}>{t.performanceDesc}</p>
        <p style={pStyle}>{t.performanceExtra}</p>
        <p style={pStyle}>{t.performanceExtra2}</p>
        <pre style={preStyle}><code>{'import { shallowRef, computed,\n' +
'  defineAsyncComponent } from "vue";\n\n' +
'// shallowRef: only triggers on reassignment\n' +
'const bigList = shallowRef<Item[]>([]);\n' +
'// This triggers reactivity:\n' +
'bigList.value = [...bigList.value, newItem];\n' +
'// This does NOT trigger:\n' +
'bigList.value.push(newItem);\n\n' +
'// computed: cached, only recalculates on change\n' +
'const sorted = computed(() =>\n' +
'  [...items.value].sort((a, b) =>\n' +
'    a.name.localeCompare(b.name)\n' +
'  )\n' +
');\n\n' +
'// Lazy-load heavy components\n' +
'const Chart = defineAsyncComponent(\n' +
'  () => import("./HeavyChart.vue")\n' +
');\n\n' +
'<!-- v-memo: skip re-render if unchanged -->\n' +
'<div v-for="item in list" :key="item.id"\n' +
'  v-memo="[item.id, item.selected]">\n' +
'  {{ item.name }}\n' +
'</div>'}</code></pre>
        <div style={tipStyle}>
          <strong>{isZh ? '提示: ' : 'Tip: '}</strong>{t.performanceTip}
        </div>
      </div>

      {/* Summary: Final recommendations and best practices */}
      <div style={summaryBoxStyle}>
        <h2 style={{ ...h2Style, marginTop: '0' }}>{t.h2Summary}</h2>
        <p style={pStyle}>{t.summaryP1}</p>
        <p style={pStyle}>{t.summaryP2}</p>
        <p style={pStyle}>{t.summaryP3}</p>
        <p style={{ ...pStyle, marginBottom: 0 }}>{t.summaryP4}</p>
      </div>

      {/* FAQ Section */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>
          {isZh ? '常见问题' : 'Frequently Asked Questions'}
        </h2>

        <div style={faqBoxStyle}>
          <p style={faqQStyle}>{t.faq1Q}</p>
          <p style={pStyle}>{t.faq1A}</p>
        </div>

        <div style={faqBoxStyle}>
          <p style={faqQStyle}>{t.faq2Q}</p>
          <p style={pStyle}>{t.faq2A}</p>
        </div>

        <div style={faqBoxStyle}>
          <p style={faqQStyle}>{t.faq3Q}</p>
          <p style={pStyle}>{t.faq3A}</p>
        </div>

        <div style={faqBoxStyle}>
          <p style={faqQStyle}>{t.faq4Q}</p>
          <p style={pStyle}>{t.faq4A}</p>
        </div>

        <div style={faqBoxStyle}>
          <p style={faqQStyle}>{t.faq5Q}</p>
          <p style={pStyle}>{t.faq5A}</p>
        </div>

        <div style={faqBoxStyle}>
          <p style={faqQStyle}>{t.faq6Q}</p>
          <p style={pStyle}>{t.faq6A}</p>
        </div>

        <div style={faqBoxStyle}>
          <p style={faqQStyle}>{t.faq7Q}</p>
          <p style={pStyle}>{t.faq7A}</p>
        </div>

        <div style={faqBoxStyle}>
          <p style={faqQStyle}>{t.faq8Q}</p>
          <p style={pStyle}>{t.faq8A}</p>
        </div>
      </div>
    </article>
  );
}
