'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vue 3 Complete Guide: Composition API, Pinia, Vue Router 4, and TypeScript (2024/2025)',
    description: 'A comprehensive Vue 3 guide covering the Composition API, script setup syntax, Vue Router 4, Pinia state management, composables, template directives, performance optimization, and Vue 3 vs Vue 2 vs React vs Angular comparison with real TypeScript code examples.',
    tldr: 'Vue 3 is a progressive JavaScript framework that excels at being incrementally adoptable. Its Composition API (replacing the Options API) enables better TypeScript integration, logic reuse via composables, and fine-grained reactivity. Vue 3 is 41% smaller than Vue 2, supports tree-shaking, and includes powerful new features like Teleport, Suspense, and defineAsyncComponent. The script setup syntax dramatically reduces boilerplate. Pinia has replaced Vuex as the official state management solution. If you are building a new project, use Vue 3 with script setup, TypeScript, Pinia, and Vue Router 4.',
    keyTakeaway1: 'The Composition API is the recommended way to write Vue 3 components — it groups logic by feature rather than by lifecycle hook, making large components far easier to maintain and test.',
    keyTakeaway2: 'script setup is syntactic sugar over the Composition API that eliminates boilerplate: no need to return values, defineProps/defineEmits replace the options object, and TypeScript inference works automatically.',
    keyTakeaway3: 'Pinia is the official Vue state management library — it uses the Composition API, is fully TypeScript-typed, supports Vue DevTools, and is simpler than Vuex with no mutations.',
    keyTakeaway4: 'Composables (useXxx functions) are the Vue 3 pattern for reusable stateful logic — they replace mixins and provide/inject for most use cases and are fully typed with TypeScript.',
    keyTakeaway5: 'Vue 3 is 41% smaller than Vue 2 with full tree-shaking support, meaning unused features are not included in your production bundle.',
    keyTakeaway6: 'Vue Router 4 is designed for Vue 3 with first-class TypeScript support, composition API integration (useRoute, useRouter), and improved navigation guards.',
    intro: 'Vue 3, released in September 2020, is a complete redesign of Vue 2 focused on performance, TypeScript support, and developer experience. Created by Evan You and maintained by an active open-source community, Vue 3 powers applications at companies like Alibaba, Xiaomi, Gitlab, and thousands of other organizations worldwide. The framework strikes a unique balance: it is approachable for beginners (the template syntax is close to plain HTML), powerful for advanced use cases (the Composition API rivals React hooks in expressiveness), and progressive by design (you can adopt it incrementally in any project). This guide is your complete reference for Vue 3 in 2024/2025, covering everything from the basics of ref and reactive to advanced patterns like custom composables, Pinia stores, and performance optimization.',
    h2WhatIsVue: 'What is Vue 3? The Progressive Framework',
    whatIsDesc: 'Vue 3 describes itself as "the progressive JavaScript framework." This means it is designed to be adoptable at different scales: use it as a standalone script to add interactivity to a static HTML page, or use it as a full-featured SPA framework with routing, state management, and server-side rendering. Unlike Angular (which is opinionated about every layer of your stack) or React (which is just a rendering library requiring third-party decisions for everything), Vue occupies a sweet middle ground — it provides sensible defaults and official solutions for routing (Vue Router) and state (Pinia) while remaining flexible.',
    h3VueSRP: 'Vue 3 Core Improvements Over Vue 2',
    vueSRPDesc: 'Vue 3 rewrites the entire framework in TypeScript and introduces a new virtual DOM implementation (inspired by Inferno) that is significantly faster. Key improvements include: 41% smaller bundle size, up to 55% faster rendering, up to 133% faster component initialization, Proxy-based reactivity (replacing Object.defineProperty — no more Vue.set() hacks), the Composition API for better logic organization, Fragments (multiple root elements in templates), Teleport for portal-like rendering, and Suspense for async component handling.',
    h3VueEcosystem: 'The Vue 3 Ecosystem',
    vueEcosystemDesc: 'The official Vue 3 ecosystem includes: Vue Router 4 (client-side routing), Pinia (state management, successor to Vuex), Vite (build tool, created by Evan You), Vitest (unit testing), Vue DevTools (browser extension for debugging), VueUse (collection of 200+ composable utilities), Nuxt 3 (full-stack framework built on Vue 3, similar to Next.js for React), and Quasar/Vuetify/PrimeVue for UI component libraries.',
    h2CompositionAPI: 'Composition API Basics: ref, reactive, computed, watch',
    compositionDesc: 'The Composition API is a set of functions that allows you to organize component logic by feature rather than by lifecycle hook. In the Options API, logic for a single feature (e.g., a search function) is split across data, methods, computed, and watch options. The Composition API puts all related logic together inside the setup() function, making components easier to understand, test, and extract into reusable composables.',
    h3RefReactive: 'ref() and reactive(): Reactive State',
    refReactiveDesc: 'ref() creates a reactive reference to a primitive value (string, number, boolean). Access and mutate the value via .value in JavaScript. In templates, Vue automatically unwraps ref so you do not need .value. reactive() creates a reactive object — it is Proxy-based and deeply reactive. Use ref() for primitive values and when you need to reassign the whole value; use reactive() for complex objects where you always access properties. A key rule: never destructure a reactive() object without using toRefs() or storeToRefs(), as destructuring breaks reactivity.',
    h3ComputedWatch: 'computed(), watch(), and watchEffect()',
    computedWatchDesc: 'computed() creates a memoized derived value — it automatically tracks dependencies and only recomputes when they change. Use it for any value derived from reactive state. watch() explicitly watches one or more reactive sources and runs a callback when they change — it is lazy by default (does not run on initial render) and receives both the new and old values. watchEffect() immediately runs its callback and automatically tracks any reactive dependencies accessed inside it — it is ideal for side effects that should synchronize with state. Use { immediate: true } on watch() to replicate watchEffect() behavior.',
    h2ScriptSetup: '<script setup> Syntax: Eliminating Boilerplate',
    scriptSetupDesc: 'The <script setup> syntax (introduced in Vue 3.2) is compiled syntactic sugar for the Composition API inside a Single File Component. It is the recommended way to write Vue 3 components because it is more concise, has better TypeScript inference, and performs better at runtime. Variables, functions, and imports declared at the top level are automatically available in the template — no explicit return statement needed.',
    h3DefinePropsEmits: 'defineProps, defineEmits, and defineExpose',
    definePropsDesc: 'Inside <script setup>, props are declared with defineProps() and emits with defineEmits() — both are compiler macros that are available without importing. With TypeScript, you can define props using the generic type syntax: defineProps<{ title: string; count: number }>() — this provides full type safety and IDE autocompletion. defineEmits<{ change: [value: string]; submit: [] }>() similarly types your emitted events. defineExpose() explicitly exposes component internals to the parent via template refs (since script setup components are closed by default).',
    h3UseTemplateRef: 'useTemplateRef() and Template Refs',
    templateRefDesc: 'useTemplateRef() (Vue 3.5+) is the new way to get a reference to a DOM element or child component instance. Use it with the ref attribute in templates: const el = useTemplateRef("myEl"). Before Vue 3.5, the pattern was const el = ref<HTMLElement | null>(null) with the matching ref="el" in the template. Template refs are populated after the component mounts, so always use them inside onMounted() or watch them for null checks.',
    h2VueRouter: 'Vue Router 4: Navigation, Guards, and Dynamic Routes',
    routerDesc: 'Vue Router 4 is the official router for Vue 3, rebuilt with TypeScript and the Composition API in mind. It provides declarative, component-based routing for single-page applications. createRouter() replaces new VueRouter(), and createWebHistory() replaces mode: "history". The Composition API integration via useRoute() and useRouter() replaces the this.$route / this.$router options API accessors.',
    h3RouterSetup: 'Setting Up Vue Router 4',
    routerSetupDesc: 'Configure Vue Router 4 by defining route records, creating the router with createRouter(), and installing it with app.use(router). Each route record maps a path to a component. The history mode (createWebHistory) uses the HTML5 History API for clean URLs without hash. The hash mode (createWebHashHistory) uses the URL hash for environments without server-side URL rewriting support. The memory mode (createMemoryHistory) is used for SSR and testing.',
    h3NavigationGuards: 'Navigation Guards and Route Meta',
    navigationGuardsDesc: 'Navigation guards run before navigation is confirmed, allowing you to redirect or cancel. Global guards (router.beforeEach) run on every navigation. Per-route guards (beforeEnter on route records) run only for specific routes. Component guards (onBeforeRouteLeave, onBeforeRouteUpdate from the Composition API) run for component navigation events. Route meta fields (meta: { requiresAuth: true }) store arbitrary data about a route, commonly used to protect routes with authentication checks in global guards.',
    h3DynamicRoutes: 'Dynamic Routes, Params, and Nested Routes',
    dynamicRoutesDesc: 'Dynamic route segments use the colon syntax (/users/:id). Access the current param via useRoute().params.id in script setup. Catch-all routes use (:path)* or :pathMatch(.*)*. Nested routes are defined by adding a children array to a route record — the parent route renders a <RouterView> for the child. Named routes (name: "user-detail") with router.push({ name: "user-detail", params: { id: 1 } }) are more maintainable than hardcoded path strings as your route structure evolves.',
    h2Pinia: 'Pinia State Management: The Vuex Successor',
    piniaDesc: 'Pinia is the official state management library for Vue 3, recommended by the Vue core team to replace Vuex 4. It is designed around the Composition API, has no mutations (only actions and state), is fully TypeScript-typed out of the box, supports Vue DevTools for time-travel debugging, is modular by design (no single large store file), and has a tiny footprint (~1.5KB gzipped). Pinia stores can be used in components, other stores, and outside components.',
    h3DefineStore: 'defineStore: Creating a Pinia Store',
    defineStoreDesc: 'Use defineStore() to create a store. The first argument is a unique string ID used by DevTools. The second argument is either an Options object (with state, getters, and actions — similar to Vuex) or a Setup function (using the Composition API with ref, computed, and functions — the preferred approach). Both approaches produce stores that integrate fully with Vue DevTools, support plugins, and can be used with storeToRefs() for reactive destructuring.',
    h3StoreToRefs: 'storeToRefs, Actions, and DevTools',
    storeToRefsDesc: 'To destructure reactive properties from a Pinia store while maintaining reactivity, use storeToRefs() — this wraps each state property and getter in a ref. Methods (actions) can be destructured directly without storeToRefs(). Pinia actions replace both Vuex mutations and actions — they can be synchronous or asynchronous, can access this (the store instance), and are automatically tracked in Vue DevTools timeline. Use $patch() for batch state updates without going through actions.',
    h2Directives: 'Vue 3 Template Directives',
    directivesDesc: 'Vue directives are special HTML attributes prefixed with v- that apply reactive behavior to the DOM. They are the bridge between your reactive data and the HTML template. Vue 3 provides built-in directives for conditional rendering, list rendering, two-way binding, event handling, and attribute binding. Custom directives allow you to encapsulate direct DOM manipulations into reusable, declarative HTML attributes.',
    h3ConditionalList: 'v-if, v-else, v-show, v-for',
    conditionalListDesc: 'v-if / v-else / v-else-if conditionally renders elements — the element is destroyed and recreated in the DOM when the condition changes (best for elements that toggle infrequently). v-show toggles CSS display:none — the element stays in the DOM (best for elements that toggle frequently). v-for renders a list with item in items or (item, index) in items syntax. Always provide a :key attribute to v-for for efficient DOM diffing — use unique IDs from your data, not array indexes, to avoid rendering bugs when items are reordered or removed.',
    h3VModel: 'v-model, v-bind, v-on',
    vModelDesc: 'v-model creates two-way data binding between a form input and reactive state. In Vue 3, v-model on a component expands to :modelValue="value" @update:modelValue="value = $event" — components should accept a modelValue prop and emit update:modelValue. Multiple v-model bindings are supported on a single component: v-model:title="title" v-model:content="content". v-bind (shorthand :) dynamically binds an attribute or prop. v-on (shorthand @) attaches event listeners. The .prevent, .stop, .once, .passive modifiers handle common event scenarios without boilerplate.',
    h3VSlot: 'v-slot and Component Slots',
    vSlotDesc: 'Slots allow components to receive template content from their parents. The default slot renders any content placed between component tags. Named slots (<template #header>) allow multiple content areas. Scoped slots expose data from the child to the parent template — v-slot="slotProps" receives the data. Slots are the primary composition mechanism for layout components (cards, dialogs, tables) — they are more flexible and composable than prop-based rendering.',
    h2Composables: 'Composables and Reusable Logic',
    composablesDesc: 'Composables are functions that use the Vue Composition API to encapsulate and reuse stateful logic. Named with a "use" prefix (useCounter, useFetch, useLocalStorage), they are the Vue 3 equivalent of React hooks and replace mixins entirely. Unlike mixins, composables have explicit data flow (you can see exactly what they return), do not pollute the component namespace, can accept and return reactive state, and can call each other for composition.',
    h3ComposablePatterns: 'The useXxx Pattern and VueUse',
    composablePatternsDesc: 'A composable follows a simple pattern: it is a function that uses Vue reactivity APIs (ref, reactive, computed, watch, lifecycle hooks) and returns reactive state or methods. Composables should not have external side effects when initialized — they should be pure from the component\'s perspective. The VueUse library (vueuse.org) provides 200+ ready-made composables for common browser APIs, sensors, animation, state, and utilities — useFetch, useLocalStorage, useIntersectionObserver, useDark, useWindowSize, and many more.',
    h3ProvideInject: 'provide() and inject() for Deep Prop Passing',
    provideInjectDesc: 'provide() and inject() solve prop drilling — passing props through many component layers just to reach a deeply nested component. A parent calls provide("key", value) to make a value available to all descendants. Any descendant calls inject("key") to receive it. In Vue 3 with TypeScript, use typed injection keys created with InjectionKey<T> from Vue for full type safety. Pinia stores eliminate most need for provide/inject for shared state, but it remains useful for component library APIs (e.g., a form component providing validation context to its inputs).',
    h2Performance: 'Vue 3 Performance: Teleport, Suspense, and Async Components',
    performanceDesc: 'Vue 3 includes several built-in performance features beyond the faster virtual DOM. The compiler performs static analysis and hoists static virtual nodes, skipping them entirely during re-renders. It also uses patch flags to mark dynamic bindings, allowing the runtime to skip diffing static parts. These compiler optimizations happen automatically — you just write normal Vue templates.',
    h3Teleport: 'Teleport: Rendering Outside the Component Tree',
    teleportDesc: 'The <Teleport> component renders its content at a different location in the DOM than where it is declared in the component tree. Use it to render modals, toasts, and tooltips at the document.body level (avoiding z-index and overflow issues caused by ancestor CSS) while keeping the modal logic co-located with the component that controls it. The to prop accepts a CSS selector or DOM element. Multiple Teleports can target the same destination — they append in order.',
    h3Suspense: 'Suspense and Async Components',
    suspenseDesc: 'The <Suspense> component handles async dependencies in the component tree, displaying a fallback slot while the async operations complete. defineAsyncComponent() lazy-loads components on demand, splitting them into separate bundles. When used with <Suspense>, the parent can show a single loading state while multiple async components load simultaneously. This pattern eliminates scattered v-if="loading" checks and provides a clean loading/error boundary model (similar to React Suspense/Error Boundaries).',
    h3TreeShaking: 'Vue 3 Tree-Shaking and Bundle Optimization',
    treeShakingDesc: 'Vue 3 is fully tree-shakable — built-in APIs (Transition, KeepAlive, Teleport) are imported as needed rather than always included. If your application does not use Teleport, it is not in your bundle. This is why Vue 3\'s baseline bundle is 41% smaller than Vue 2. With Vite (the recommended build tool), development builds use native ESM for instant hot module replacement, and production builds use Rollup for aggressive tree-shaking and code splitting. Use defineAsyncComponent() and route-level code splitting to further reduce initial bundle size.',
    h2Comparison: 'Vue 3 vs Vue 2 vs React vs Angular Comparison',
    comparisonDesc: 'Choosing the right framework depends on team expertise, project scale, and ecosystem requirements. Here is a comprehensive comparison across critical dimensions for Vue 3, Vue 2, React, and Angular.',
    h2FAQ: 'Frequently Asked Questions About Vue 3',
    faq1Q: 'Should I migrate from Vue 2 to Vue 3?',
    faq1A: 'Yes — Vue 2 reached end of life on December 31, 2023, meaning no more security patches or bug fixes. Migration difficulty depends on your codebase size. Small-to-medium projects can migrate directly using the @vue/compat migration build, which enables Vue 3 with Vue 2-compatible behavior and console warnings for deprecated APIs. Large projects should plan a phased migration: first update to Vue 2.7 (which backports the Composition API), then migrate to Vue 3. The key breaking changes are: the Options API still works in Vue 3, but filters are removed, $on/$off/$once are removed, and some directives have syntax changes.',
    faq2Q: 'What is the difference between the Composition API and the Options API?',
    faq2A: 'The Options API organizes component logic into predefined option buckets: data, methods, computed, watch, mounted, etc. This is familiar and works well for simple components but can make large components hard to follow as related logic is scattered across multiple options. The Composition API uses setup() (or script setup) as a single entry point where you organize logic by feature rather than by option type. A "user search" feature\'s state, computed values, and fetch logic can all live together in one place. The Composition API also enables better TypeScript inference and composables for logic reuse. Both APIs are fully supported in Vue 3 — you can even mix them in the same component.',
    faq3Q: 'Is Vue 3 good with TypeScript?',
    faq3A: 'Vue 3 has excellent TypeScript support. The entire Vue 3 framework is written in TypeScript. The script setup syntax with defineProps<Props>() provides full generic type inference for props. The Composition API provides natural TypeScript integration — ref<string>(), computed<number>(), and typed reactive objects all work with full IDE autocompletion. Pinia is completely TypeScript-native. Volar (the official VSCode extension) provides template type-checking and autocompletion that rivals Angular\'s type system. For new projects, Vue 3 + TypeScript + Volar provides a first-class typed development experience.',
    faq4Q: 'What is Nuxt 3 and when should I use it?',
    faq4A: 'Nuxt 3 is the full-stack Vue framework, analogous to Next.js for React. It is built on Vue 3, Vite, and Nitro (a universal server engine). Nuxt 3 provides server-side rendering (SSR) for improved SEO and initial load performance, static site generation (SSG), file-based routing, auto-imports for Vue, Pinia, and VueUse composables, a server API layer (similar to Next.js API routes), and isomorphic data fetching (useFetch, useAsyncData). Use Nuxt 3 when SEO matters (marketing sites, e-commerce, blogs), when you need a backend API co-located with your frontend, or when you want a batteries-included Vue 3 experience.',
    faq5Q: 'How does Vue 3 reactivity work under the hood?',
    faq5A: 'Vue 3 reactivity is based on ES6 Proxy. When you create a reactive() object, Vue wraps it in a Proxy with get/set traps. When a computed property or watch effect accesses a reactive property (get trap), Vue tracks it as a dependency. When you update the property (set trap), Vue notifies all tracked dependents. ref() works similarly — it wraps the value in an object with a .value getter/setter. This Proxy-based approach eliminates Vue 2\'s limitations: deep reactivity without explicit Vue.set(), array index mutations work, and new properties added to objects are reactive. Computed values are memoized lazy: they only compute when a dependency changes AND the computed is accessed.',
    faq6Q: 'What replaced Vuex in Vue 3?',
    faq6A: 'Pinia is the official replacement for Vuex in Vue 3, recommended by the Vue core team. It was created by Eduardo San Martin Morote (a Vue core team member) and is designed around the Vue 3 Composition API. The key differences from Vuex are: no mutations (only state, getters, and actions), full TypeScript support without complex type workarounds, no nested modules (just separate stores that can import each other), lighter API, and native Vue DevTools integration. Vuex 4 still works with Vue 3 but is in maintenance mode — all new projects should use Pinia.',
    faq7Q: 'Can I use Vue 3 without a build step?',
    faq7A: 'Yes — Vue 3 can be used as a plain CDN script for progressive enhancement of existing HTML pages, no build tools required. The global build (vue.global.js) exposes all APIs on the Vue global. The ESM browser build (vue.esm-browser.js) can be used directly in native ES modules. For complex applications with Single File Components (.vue files), you need a build step — Vite is the recommended tool and provides near-instant development server startup, sub-second hot module replacement, and optimized production builds. Vue Playground (play.vuejs.org) lets you try Vue 3 online without any setup.',
    faq8Q: 'What is the difference between v-if and v-show?',
    faq8A: 'v-if fully renders or destroys the element and its children when the condition changes. When false, the element does not exist in the DOM — it runs lifecycle hooks (onMounted/onUnmounted), handles child components being created/destroyed, and has higher toggle cost. v-show always renders the element but toggles CSS display:none. It has lower toggle cost but higher initial render cost (always renders). Use v-if when the condition rarely changes or when you want to lazy-render heavy components. Use v-show for frequently toggled content (tabs, accordion) where you want to avoid re-rendering cost.',
  },
  zh: {
    title: 'Vue 3 完全指南：Composition API、Pinia、Vue Router 4 和 TypeScript（2024/2025）',
    description: '全面的 Vue 3 指南，涵盖 Composition API、script setup 语法、Vue Router 4、Pinia 状态管理、组合式函数、模板指令、性能优化，以及 Vue 3 vs Vue 2 vs React vs Angular 对比，附真实 TypeScript 代码示例。',
    tldr: 'Vue 3 是一个渐进式 JavaScript 框架，专注于可增量采用。其 Composition API（替代 Options API）实现了更好的 TypeScript 集成、通过组合式函数复用逻辑以及细粒度响应性。Vue 3 比 Vue 2 小 41%，支持 tree-shaking，并包含 Teleport、Suspense 和 defineAsyncComponent 等强大新特性。script setup 语法大幅减少了样板代码。Pinia 已取代 Vuex 成为官方状态管理方案。如果你在构建新项目，请使用 Vue 3 + script setup + TypeScript + Pinia + Vue Router 4。',
    keyTakeaway1: 'Composition API 是编写 Vue 3 组件的推荐方式——它按功能而非生命周期钩子组织逻辑，使大型组件更易于维护和测试。',
    keyTakeaway2: 'script setup 是 Composition API 的语法糖，消除了样板代码：无需显式返回值，defineProps/defineEmits 替代选项对象，TypeScript 类型推断自动工作。',
    keyTakeaway3: 'Pinia 是官方 Vue 状态管理库——使用 Composition API，完全 TypeScript 类型化，支持 Vue DevTools，比 Vuex 更简单，没有 mutations。',
    keyTakeaway4: '组合式函数（useXxx 函数）是 Vue 3 中可复用有状态逻辑的模式——它们替代了 mixins，在大多数用例中提供完整的 TypeScript 类型支持。',
    keyTakeaway5: 'Vue 3 比 Vue 2 小 41%，完全支持 tree-shaking，意味着未使用的特性不会包含在生产包中。',
    keyTakeaway6: 'Vue Router 4 专为 Vue 3 设计，提供一流的 TypeScript 支持、Composition API 集成（useRoute、useRouter）和改进的导航守卫。',
    intro: 'Vue 3 于 2020 年 9 月发布，是对 Vue 2 的全面重新设计，专注于性能、TypeScript 支持和开发者体验。由尤雨溪创建并由活跃的开源社区维护，Vue 3 驱动着阿里巴巴、小米、GitLab 以及全球数千个其他组织的应用程序。这个框架达到了独特的平衡：对初学者友好（模板语法接近纯 HTML），对高级用例强大（Composition API 在表现力上与 React hooks 相当），并且在设计上是渐进式的（可以在任何项目中增量采用）。本指南是您 2024/2025 年 Vue 3 的完整参考，涵盖从 ref 和 reactive 基础到自定义组合式函数、Pinia store 和性能优化等高级模式的所有内容。',
    h2WhatIsVue: 'Vue 3 是什么？渐进式框架',
    whatIsDesc: 'Vue 3 将自己描述为"渐进式 JavaScript 框架"。这意味着它被设计为可在不同规模下采用：作为独立脚本为静态 HTML 页面添加交互，或作为具有路由、状态管理和服务器端渲染的全功能 SPA 框架。与 Angular（对技术栈每一层都有强约定）或 React（只是一个渲染库，需要第三方决策）不同，Vue 占据了一个甜蜜的中间地带——它为路由（Vue Router）和状态（Pinia）提供合理的默认值和官方解决方案，同时保持灵活性。',
    h3VueSRP: 'Vue 3 相对 Vue 2 的核心改进',
    vueSRPDesc: 'Vue 3 用 TypeScript 重写了整个框架，并引入了全新的虚拟 DOM 实现（受 Inferno 启发），速度显著更快。主要改进包括：包体积减少 41%、渲染速度提升最高 55%、组件初始化速度提升最高 133%、基于 Proxy 的响应性（替换 Object.defineProperty——不再需要 Vue.set() 技巧）、用于更好逻辑组织的 Composition API、Fragments（模板中的多个根元素）、用于类似 portal 渲染的 Teleport，以及用于异步组件处理的 Suspense。',
    h3VueEcosystem: 'Vue 3 生态系统',
    vueEcosystemDesc: '官方 Vue 3 生态系统包括：Vue Router 4（客户端路由）、Pinia（状态管理，Vuex 的继任者）、Vite（构建工具，由尤雨溪创建）、Vitest（单元测试）、Vue DevTools（用于调试的浏览器扩展）、VueUse（200+ 组合式工具集合）、Nuxt 3（构建在 Vue 3 上的全栈框架，类似于 React 的 Next.js），以及 Quasar/Vuetify/PrimeVue 等 UI 组件库。',
    h2CompositionAPI: 'Composition API 基础：ref、reactive、computed、watch',
    compositionDesc: 'Composition API 是一组函数，允许你按功能而非生命周期钩子组织组件逻辑。在 Options API 中，单个功能（例如搜索功能）的逻辑分散在 data、methods、computed 和 watch 选项中。Composition API 将所有相关逻辑放在 setup() 函数内部，使组件更易于理解、测试，并提取为可复用的组合式函数。',
    h3RefReactive: 'ref() 和 reactive()：响应式状态',
    refReactiveDesc: 'ref() 为基本类型值（字符串、数字、布尔值）创建响应式引用。在 JavaScript 中通过 .value 访问和修改值。在模板中，Vue 自动解包 ref，不需要 .value。reactive() 创建响应式对象——基于 Proxy 且深度响应。对基本类型值使用 ref()，当需要重新赋整个值时也用 ref()；对始终访问属性的复杂对象使用 reactive()。关键规则：在不使用 toRefs() 或 storeToRefs() 的情况下永远不要解构 reactive() 对象，因为解构会破坏响应性。',
    h3ComputedWatch: 'computed()、watch() 和 watchEffect()',
    computedWatchDesc: 'computed() 创建一个记忆化的派生值——它自动跟踪依赖项，只在依赖项变化时重新计算。对从响应式状态派生的任何值使用它。watch() 显式监听一个或多个响应式源，并在它们变化时运行回调——默认是惰性的（不在初始渲染时运行），并接收新值和旧值。watchEffect() 立即运行其回调并自动跟踪内部访问的任何响应式依赖——非常适合应与状态同步的副作用。在 watch() 上使用 { immediate: true } 来复制 watchEffect() 的行为。',
    h2ScriptSetup: '<script setup> 语法：消除样板代码',
    scriptSetupDesc: '<script setup> 语法（Vue 3.2 引入）是在单文件组件中用于 Composition API 的编译语法糖。这是编写 Vue 3 组件的推荐方式，因为它更简洁，具有更好的 TypeScript 推断，并且运行时性能更好。顶层声明的变量、函数和导入自动在模板中可用——不需要显式的 return 语句。',
    h3DefinePropsEmits: 'defineProps、defineEmits 和 defineExpose',
    definePropsDesc: '在 <script setup> 内部，props 用 defineProps() 声明，emits 用 defineEmits() 声明——两者都是无需导入即可使用的编译器宏。使用 TypeScript 时，可以用泛型类型语法定义 props：defineProps<{ title: string; count: number }>()——这提供了完整的类型安全和 IDE 自动补全。defineEmits<{ change: [value: string]; submit: [] }>() 同样对发出的事件进行类型化。defineExpose() 显式地将组件内部暴露给父组件的模板 ref（因为 script setup 组件默认是封闭的）。',
    h3UseTemplateRef: 'useTemplateRef() 和模板 Ref',
    templateRefDesc: 'useTemplateRef()（Vue 3.5+）是获取 DOM 元素或子组件实例引用的新方式。在模板中与 ref 属性一起使用：const el = useTemplateRef("myEl")。Vue 3.5 之前，模式是 const el = ref<HTMLElement | null>(null)，模板中配以 ref="el"。模板 ref 在组件挂载后填充，因此始终在 onMounted() 内部使用它们，或监视它们进行 null 检查。',
    h2VueRouter: 'Vue Router 4：导航、守卫和动态路由',
    routerDesc: 'Vue Router 4 是 Vue 3 的官方路由器，以 TypeScript 和 Composition API 为核心重建。它为单页应用程序提供声明式、基于组件的路由。createRouter() 替代 new VueRouter()，createWebHistory() 替代 mode: "history"。通过 useRoute() 和 useRouter() 进行的 Composition API 集成替代了 this.$route / this.$router Options API 访问器。',
    h3RouterSetup: '设置 Vue Router 4',
    routerSetupDesc: '通过定义路由记录、使用 createRouter() 创建路由器并使用 app.use(router) 安装来配置 Vue Router 4。每个路由记录将路径映射到组件。history 模式（createWebHistory）使用 HTML5 History API 提供无哈希的干净 URL。hash 模式（createWebHashHistory）对不支持服务器端 URL 重写的环境使用 URL 哈希。memory 模式（createMemoryHistory）用于 SSR 和测试。',
    h3NavigationGuards: '导航守卫和路由元信息',
    navigationGuardsDesc: '导航守卫在导航确认之前运行，允许你重定向或取消。全局守卫（router.beforeEach）在每次导航时运行。路由独享守卫（路由记录上的 beforeEnter）只对特定路由运行。组件守卫（来自 Composition API 的 onBeforeRouteLeave、onBeforeRouteUpdate）在组件导航事件时运行。路由元信息字段（meta: { requiresAuth: true }）存储关于路由的任意数据，通常用于在全局守卫中通过身份验证检查保护路由。',
    h3DynamicRoutes: '动态路由、路由参数和嵌套路由',
    dynamicRoutesDesc: '动态路由段使用冒号语法（/users/:id）。在 script setup 中通过 useRoute().params.id 访问当前参数。通配路由使用 (:path)* 或 :pathMatch(.*)*。嵌套路由通过向路由记录添加 children 数组定义——父路由为子路由渲染 <RouterView>。命名路由（name: "user-detail"）配合 router.push({ name: "user-detail", params: { id: 1 } }) 比硬编码路径字符串更易维护，随着路由结构演进。',
    h2Pinia: 'Pinia 状态管理：Vuex 的继任者',
    piniaDesc: 'Pinia 是 Vue 3 的官方状态管理库，由 Vue 核心团队推荐取代 Vuex 4。它围绕 Composition API 设计，没有 mutations（只有 actions 和 state），开箱即用完全 TypeScript 类型化，支持 Vue DevTools 进行时间旅行调试，设计上是模块化的（没有单一大型 store 文件），并且体积极小（约 1.5KB 压缩后）。Pinia store 可以在组件、其他 store 和组件外部使用。',
    h3DefineStore: 'defineStore：创建 Pinia Store',
    defineStoreDesc: '使用 defineStore() 创建 store。第一个参数是 DevTools 使用的唯一字符串 ID。第二个参数是 Options 对象（包含 state、getters 和 actions——类似于 Vuex）或 Setup 函数（使用带有 ref、computed 和函数的 Composition API——首选方式）。两种方式都产生与 Vue DevTools 完全集成、支持插件，并可与 storeToRefs() 一起使用进行响应式解构的 store。',
    h3StoreToRefs: 'storeToRefs、Actions 和 DevTools',
    storeToRefsDesc: '要在保持响应性的同时从 Pinia store 解构响应式属性，使用 storeToRefs()——它将每个 state 属性和 getter 包装在 ref 中。方法（actions）可以直接解构而无需 storeToRefs()。Pinia actions 替代了 Vuex 的 mutations 和 actions——它们可以是同步或异步的，可以访问 this（store 实例），并在 Vue DevTools 时间线中自动追踪。使用 $patch() 进行批量状态更新，无需通过 actions。',
    h2Directives: 'Vue 3 模板指令',
    directivesDesc: 'Vue 指令是以 v- 为前缀的特殊 HTML 属性，将响应式行为应用于 DOM。它们是响应式数据和 HTML 模板之间的桥梁。Vue 3 提供内置指令，用于条件渲染、列表渲染、双向绑定、事件处理和属性绑定。自定义指令允许你将直接的 DOM 操作封装为可复用的声明式 HTML 属性。',
    h3ConditionalList: 'v-if、v-else、v-show、v-for',
    conditionalListDesc: 'v-if / v-else / v-else-if 条件渲染元素——当条件改变时，元素在 DOM 中被销毁并重新创建（最适合不频繁切换的元素）。v-show 切换 CSS display:none——元素保留在 DOM 中（最适合频繁切换的元素）。v-for 使用 item in items 或 (item, index) in items 语法渲染列表。始终为 v-for 提供 :key 属性以实现高效的 DOM diff——使用数据中的唯一 ID 而非数组索引，以避免重新排序或删除项目时的渲染 bug。',
    h3VModel: 'v-model、v-bind、v-on',
    vModelDesc: 'v-model 在表单输入和响应式状态之间创建双向数据绑定。在 Vue 3 中，组件上的 v-model 展开为 :modelValue="value" @update:modelValue="value = $event"——组件应接受 modelValue prop 并发出 update:modelValue。单个组件支持多个 v-model 绑定：v-model:title="title" v-model:content="content"。v-bind（简写 :）动态绑定属性或 prop。v-on（简写 @）附加事件监听器。.prevent、.stop、.once、.passive 修饰符无需样板代码即可处理常见事件场景。',
    h3VSlot: 'v-slot 和组件插槽',
    vSlotDesc: '插槽允许组件从父组件接收模板内容。默认插槽渲染放置在组件标签之间的任何内容。具名插槽（<template #header>）允许多个内容区域。作用域插槽将子组件的数据暴露给父模板——v-slot="slotProps" 接收数据。插槽是布局组件（卡片、对话框、表格）的主要组合机制——它们比基于 prop 的渲染更灵活和可组合。',
    h2Composables: '组合式函数和可复用逻辑',
    composablesDesc: '组合式函数是使用 Vue Composition API 封装和复用有状态逻辑的函数。以 "use" 前缀命名（useCounter、useFetch、useLocalStorage），它们是 Vue 3 中 React hooks 的等价物，完全替代了 mixins。与 mixins 不同，组合式函数具有显式数据流（可以清楚地看到它们返回什么），不污染组件命名空间，可以接受和返回响应式状态，并且可以相互调用以进行组合。',
    h3ComposablePatterns: 'useXxx 模式和 VueUse',
    composablePatternsDesc: '组合式函数遵循简单模式：它是一个使用 Vue 响应性 API（ref、reactive、computed、watch、生命周期钩子）并返回响应式状态或方法的函数。组合式函数在初始化时不应有外部副作用——从组件的角度来看它们应该是纯粹的。VueUse 库（vueuse.org）提供 200+ 现成的组合式函数，用于常见浏览器 API、传感器、动画、状态和工具——useFetch、useLocalStorage、useIntersectionObserver、useDark、useWindowSize 等等。',
    h3ProvideInject: '用于深层 prop 传递的 provide() 和 inject()',
    provideInjectDesc: 'provide() 和 inject() 解决了 prop 钻取问题——通过许多组件层传递 props 只是为了到达深层嵌套的组件。父组件调用 provide("key", value) 使值对所有后代可用。任何后代调用 inject("key") 来接收它。在 Vue 3 和 TypeScript 中，使用 Vue 的 InjectionKey<T> 创建的类型化注入键以获得完整类型安全。Pinia store 消除了大多数共享状态使用 provide/inject 的需求，但它对组件库 API 仍然有用（例如，表单组件向其输入提供验证上下文）。',
    h2Performance: 'Vue 3 性能：Teleport、Suspense 和异步组件',
    performanceDesc: 'Vue 3 包含几个超越更快虚拟 DOM 的内置性能特性。编译器执行静态分析并提升静态虚拟节点，在重新渲染期间完全跳过它们。它还使用补丁标志标记动态绑定，允许运行时跳过对静态部分的 diff。这些编译器优化自动发生——你只需编写普通的 Vue 模板。',
    h3Teleport: 'Teleport：在组件树外渲染',
    teleportDesc: '<Teleport> 组件在 DOM 中与在组件树中声明的位置不同的地方渲染其内容。使用它在 document.body 级别渲染模态框、提示和工具提示（避免祖先 CSS 造成的 z-index 和 overflow 问题），同时保持模态框逻辑与控制它的组件协同定位。to prop 接受 CSS 选择器或 DOM 元素。多个 Teleport 可以定位同一目标——它们按顺序追加。',
    h3Suspense: 'Suspense 和异步组件',
    suspenseDesc: '<Suspense> 组件处理组件树中的异步依赖，在异步操作完成时显示 fallback 插槽。defineAsyncComponent() 按需懒加载组件，将它们拆分为单独的包。与 <Suspense> 一起使用时，父组件可以在多个异步组件同时加载时显示单一加载状态。此模式消除了分散的 v-if="loading" 检查，并提供了干净的 loading/error 边界模型（类似于 React Suspense/Error Boundaries）。',
    h3TreeShaking: 'Vue 3 Tree-Shaking 和包优化',
    treeShakingDesc: 'Vue 3 完全支持 tree-shaking——内置 API（Transition、KeepAlive、Teleport）按需导入而非始终包含。如果你的应用不使用 Teleport，它就不在你的包中。这就是为什么 Vue 3 的基准包比 Vue 2 小 41%。使用 Vite（推荐的构建工具），开发构建使用原生 ESM 实现即时热模块替换，生产构建使用 Rollup 进行激进的 tree-shaking 和代码分割。使用 defineAsyncComponent() 和路由级代码分割进一步减小初始包大小。',
    h2Comparison: 'Vue 3 vs Vue 2 vs React vs Angular 对比',
    comparisonDesc: '选择正确的框架取决于团队专业知识、项目规模和生态系统需求。以下是 Vue 3、Vue 2、React 和 Angular 在关键维度上的全面对比。',
    h2FAQ: '关于 Vue 3 的常见问题',
    faq1Q: '我应该从 Vue 2 迁移到 Vue 3 吗？',
    faq1A: '是的——Vue 2 于 2023 年 12 月 31 日达到生命周期终点，意味着不再有安全补丁或 bug 修复。迁移难度取决于代码库大小。中小型项目可以使用 @vue/compat 迁移构建直接迁移，该构建启用具有 Vue 2 兼容行为的 Vue 3，并对废弃 API 提供控制台警告。大型项目应规划分阶段迁移：首先更新到 Vue 2.7（它向后移植了 Composition API），然后迁移到 Vue 3。主要破坏性变更：Options API 在 Vue 3 中仍然有效，但 filters 被删除，$on/$off/$once 被删除，一些指令语法发生了变化。',
    faq2Q: 'Composition API 和 Options API 有什么区别？',
    faq2A: 'Options API 将组件逻辑组织到预定义的选项桶中：data、methods、computed、watch、mounted 等。这很熟悉，对简单组件有效，但随着相关逻辑散布在多个选项中，可能使大型组件难以理解。Composition API 使用 setup()（或 script setup）作为单一入口点，在那里按功能而非按选项类型组织逻辑。"用户搜索"功能的状态、计算值和 fetch 逻辑都可以放在一起。Composition API 还实现了更好的 TypeScript 推断和用于逻辑复用的组合式函数。两个 API 在 Vue 3 中都完全支持——甚至可以在同一组件中混合使用。',
    faq3Q: 'Vue 3 对 TypeScript 支持好吗？',
    faq3A: 'Vue 3 具有出色的 TypeScript 支持。整个 Vue 3 框架用 TypeScript 编写。带有 defineProps<Props>() 的 script setup 语法为 props 提供完整的泛型类型推断。Composition API 提供自然的 TypeScript 集成——ref<string>()、computed<number>() 和类型化的响应式对象都支持完整的 IDE 自动补全。Pinia 完全是 TypeScript 原生的。Volar（官方 VSCode 扩展）提供与 Angular 类型系统相媲美的模板类型检查和自动补全。对于新项目，Vue 3 + TypeScript + Volar 提供一流的类型化开发体验。',
    faq4Q: 'Nuxt 3 是什么，什么时候应该使用它？',
    faq4A: 'Nuxt 3 是全栈 Vue 框架，类似于 React 的 Next.js。它构建在 Vue 3、Vite 和 Nitro（通用服务器引擎）之上。Nuxt 3 提供服务器端渲染（SSR）以改善 SEO 和初始加载性能、静态站点生成（SSG）、基于文件的路由、Vue/Pinia/VueUse 组合式函数的自动导入、服务器 API 层（类似于 Next.js API 路由）以及同构数据获取（useFetch、useAsyncData）。当 SEO 重要时（营销网站、电商、博客）、当你需要与前端协同定位的后端 API 时，或当你想要内置电池的 Vue 3 体验时，使用 Nuxt 3。',
    faq5Q: 'Vue 3 响应性在底层是如何工作的？',
    faq5A: 'Vue 3 响应性基于 ES6 Proxy。当你创建 reactive() 对象时，Vue 用带有 get/set 拦截器的 Proxy 包装它。当 computed 属性或 watch effect 访问响应式属性时（get 拦截器），Vue 将其追踪为依赖项。当你更新属性时（set 拦截器），Vue 通知所有追踪的依赖项。ref() 类似地工作——它将值包装在带有 .value getter/setter 的对象中。这种基于 Proxy 的方式消除了 Vue 2 的限制：不需要显式 Vue.set() 的深度响应性、数组索引修改有效、添加到对象的新属性是响应式的。Computed 值是记忆化惰性的：只有在依赖项变化且 computed 被访问时才计算。',
    faq6Q: 'Vue 3 中什么取代了 Vuex？',
    faq6A: 'Pinia 是 Vue 3 中 Vuex 的官方替代品，由 Vue 核心团队推荐。它由 Eduardo San Martin Morote（Vue 核心团队成员）创建，围绕 Vue 3 Composition API 设计。与 Vuex 的主要区别：没有 mutations（只有 state、getters 和 actions）、无需复杂类型解决方案的完整 TypeScript 支持、没有嵌套模块（只是可以相互导入的独立 store）、更轻量的 API，以及原生 Vue DevTools 集成。Vuex 4 仍然适用于 Vue 3，但处于维护模式——所有新项目应使用 Pinia。',
    faq7Q: '我可以在没有构建步骤的情况下使用 Vue 3 吗？',
    faq7A: '可以——Vue 3 可以作为纯 CDN 脚本使用，用于现有 HTML 页面的渐进增强，不需要构建工具。全局构建（vue.global.js）在 Vue 全局上暴露所有 API。ESM 浏览器构建（vue.esm-browser.js）可以直接在原生 ES 模块中使用。对于使用单文件组件（.vue 文件）的复杂应用，你需要构建步骤——Vite 是推荐工具，提供近乎即时的开发服务器启动、亚秒级热模块替换和优化的生产构建。Vue Playground（play.vuejs.org）让你无需任何设置即可在线试用 Vue 3。',
    faq8Q: 'v-if 和 v-show 有什么区别？',
    faq8A: '当条件变化时，v-if 完全渲染或销毁元素及其子元素。当为 false 时，元素不存在于 DOM 中——它运行生命周期钩子（onMounted/onUnmounted），处理子组件的创建/销毁，并具有更高的切换成本。v-show 始终渲染元素但切换 CSS display:none。它具有更低的切换成本但更高的初始渲染成本（始终渲染）。当条件很少变化或想要懒渲染重量级组件时使用 v-if。对于频繁切换的内容（标签页、手风琴），在想要避免重新渲染成本时使用 v-show。',
  },
};

export default function VueGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations['en'];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: translations['en']['faq1Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq1A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq2Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq2A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq3Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq3A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq4Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq4A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq5Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq5A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq6Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq6A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq7Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq7A'] },
      },
      {
        '@type': 'Question',
        name: translations['en']['faq8Q'],
        acceptedAnswer: { '@type': 'Answer', text: translations['en']['faq8A'] },
      },
    ],
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', lineHeight: '1.7' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', lineHeight: '1.25' }}>
        {t.title}
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2rem' }}>{t.description}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '0 8px 8px 0', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ fontWeight: 700, color: '#0369a1', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '1rem' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '1rem' }}>
          {lang === 'zh' ? '核心要点' : 'Key Takeaways'}
        </h2>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <li style={{ color: '#334155' }}>{t.keyTakeaway1}</li>
          <li style={{ color: '#334155' }}>{t.keyTakeaway2}</li>
          <li style={{ color: '#334155' }}>{t.keyTakeaway3}</li>
          <li style={{ color: '#334155' }}>{t.keyTakeaway4}</li>
          <li style={{ color: '#334155' }}>{t.keyTakeaway5}</li>
          <li style={{ color: '#334155' }}>{t.keyTakeaway6}</li>
        </ul>
      </div>

      {/* Intro */}
      <p style={{ fontSize: '1.05rem', color: '#334155', marginBottom: '2.5rem' }}>{t.intro}</p>

      {/* Section 1: What is Vue 3 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2WhatIsVue}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.whatIsDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3VueSRP}</h3>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.vueSRPDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3VueEcosystem}</h3>
      <p style={{ color: '#334155', marginBottom: '2rem' }}>{t.vueEcosystemDesc}</p>

      {/* Section 2: Composition API */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2CompositionAPI}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.compositionDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3RefReactive}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.refReactiveDesc}</p>

      {/* Code: ref and reactive */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '// ref() for primitives\n' +
            'import { ref, reactive, computed, watch, watchEffect } from \'vue\';\n\n' +
            'const count = ref(0);\n' +
            'const message = ref(\'Hello Vue 3\');\n\n' +
            '// Access via .value in <script>\n' +
            'count.value++; // 1\n' +
            'console.log(count.value); // 1\n\n' +
            '// In template, Vue auto-unwraps: {{ count }} not {{ count.value }}\n\n' +
            '// reactive() for objects\n' +
            'const user = reactive({\n' +
            '  name: \'Alice\',\n' +
            '  age: 30,\n' +
            '  address: { city: \'Paris\' },\n' +
            '});\n\n' +
            '// Mutate directly (no .value needed)\n' +
            'user.name = \'Bob\';\n' +
            'user.address.city = \'London\'; // deep reactivity works\n\n' +
            '// WRONG: breaking reactivity by destructuring\n' +
            '// const { name } = user; // name is no longer reactive!\n\n' +
            '// CORRECT: use toRefs to maintain reactivity\n' +
            'import { toRefs } from \'vue\';\n' +
            'const { name, age } = toRefs(user); // still reactive'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3ComputedWatch}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.computedWatchDesc}</p>

      {/* Code: computed, watch, watchEffect */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            'import { ref, computed, watch, watchEffect } from \'vue\';\n\n' +
            'const firstName = ref(\'Evan\');\n' +
            'const lastName = ref(\'You\');\n\n' +
            '// computed: auto-tracks dependencies, memoized\n' +
            'const fullName = computed(() => firstName.value + \' \' + lastName.value);\n' +
            'console.log(fullName.value); // "Evan You"\n\n' +
            '// Writable computed\n' +
            'const reversedName = computed({\n' +
            '  get: () => firstName.value.split(\'\').reverse().join(\'\'),\n' +
            '  set: (val: string) => { firstName.value = val.split(\'\').reverse().join(\'\'); },\n' +
            '});\n\n' +
            '// watch: explicit deps, receives old + new value\n' +
            'watch(firstName, (newVal, oldVal) => {\n' +
            '  console.log(\'firstName changed from \' + oldVal + \' to \' + newVal);\n' +
            '});\n\n' +
            '// watch multiple sources\n' +
            'watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {\n' +
            '  console.log(\'Name changed\');\n' +
            '});\n\n' +
            '// watch with immediate: true\n' +
            'watch(firstName, (val) => { document.title = val; }, { immediate: true });\n\n' +
            '// watchEffect: auto-tracks, runs immediately\n' +
            'watchEffect(() => {\n' +
            '  console.log(\'firstName is now:\', firstName.value); // runs on mount + changes\n' +
            '  console.log(\'lastName is now:\', lastName.value);\n' +
            '});'
          }</code>
        </pre>
      </div>

      {/* Section 3: script setup */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2ScriptSetup}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.scriptSetupDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3DefinePropsEmits}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.definePropsDesc}</p>

      {/* Code: script setup */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<!-- UserCard.vue -->\n' +
            '<script setup lang="ts">\n' +
            'import { ref, computed } from \'vue\';\n\n' +
            '// Props with TypeScript generics — no import needed for defineProps\n' +
            'const props = defineProps<{\n' +
            '  name: string;\n' +
            '  age: number;\n' +
            '  role?: string; // optional prop\n' +
            '}>();\n\n' +
            '// Default values with withDefaults\n' +
            'const propsWithDefaults = withDefaults(defineProps<{ role?: string }>(), {\n' +
            '  role: \'viewer\',\n' +
            '});\n\n' +
            '// Emits with TypeScript\n' +
            'const emit = defineEmits<{\n' +
            '  select: [userId: number];    // named tuple syntax\n' +
            '  update: [name: string, age: number];\n' +
            '  close: [];                    // no payload\n' +
            '}>();\n\n' +
            'const isExpanded = ref(false);\n' +
            'const initials = computed(() =>\n' +
            '  props.name.split(\' \').map(n => n[0]).join(\'\')\n' +
            ');\n\n' +
            'function handleSelect() {\n' +
            '  emit(\'select\', 42);\n' +
            '}\n\n' +
            '// defineExpose: make internal state accessible via template ref\n' +
            'defineExpose({ isExpanded, initials });\n' +
            '</script>\n\n' +
            '<template>\n' +
            '  <div @click="handleSelect">\n' +
            '    <span>{{ initials }}</span>\n' +
            '    <p>{{ props.name }}, {{ props.age }}</p>\n' +
            '  </div>\n' +
            '</template>'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3UseTemplateRef}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.templateRefDesc}</p>

      {/* Code: useTemplateRef */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<script setup lang="ts">\n' +
            'import { useTemplateRef, onMounted, ref } from \'vue\';\n\n' +
            '// Vue 3.5+ approach\n' +
            'const inputEl = useTemplateRef<HTMLInputElement>(\'myInput\');\n\n' +
            '// Pre-3.5 approach (still works)\n' +
            'const legacyInputEl = ref<HTMLInputElement | null>(null);\n\n' +
            'onMounted(() => {\n' +
            '  // Populated after mount\n' +
            '  inputEl.value?.focus();\n' +
            '  legacyInputEl.value?.select();\n' +
            '});\n' +
            '</script>\n\n' +
            '<template>\n' +
            '  <!-- ref attribute matches the string in useTemplateRef() -->\n' +
            '  <input ref="myInput" type="text" placeholder="Auto-focused on mount" />\n' +
            '  <input ref="legacyInputEl" type="text" placeholder="Legacy approach" />\n' +
            '</template>'
          }</code>
        </pre>
      </div>

      {/* Section 4: Vue Router */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2VueRouter}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.routerDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3RouterSetup}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.routerSetupDesc}</p>

      {/* Code: Vue Router 4 setup */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '// src/router/index.ts\n' +
            'import { createRouter, createWebHistory, RouteRecordRaw } from \'vue-router\';\n\n' +
            'const routes: RouteRecordRaw[] = [\n' +
            '  {\n' +
            '    path: \'/\',\n' +
            '    name: \'home\',\n' +
            '    component: () => import(\'../views/HomeView.vue\'), // lazy-loaded\n' +
            '  },\n' +
            '  {\n' +
            '    path: \'/users\',\n' +
            '    component: () => import(\'../views/UsersLayout.vue\'),\n' +
            '    children: [\n' +
            '      { path: \'\', name: \'user-list\', component: () => import(\'../views/UserList.vue\') },\n' +
            '      { path: \':id\', name: \'user-detail\', component: () => import(\'../views/UserDetail.vue\') },\n' +
            '    ],\n' +
            '  },\n' +
            '  {\n' +
            '    path: \'/admin\',\n' +
            '    component: () => import(\'../views/AdminView.vue\'),\n' +
            '    meta: { requiresAuth: true, requiresAdmin: true },\n' +
            '  },\n' +
            '  { path: \'/:pathMatch(.*)*\', name: \'not-found\', component: () => import(\'../views/NotFound.vue\') },\n' +
            '];\n\n' +
            'const router = createRouter({\n' +
            '  history: createWebHistory(import.meta.env.BASE_URL),\n' +
            '  routes,\n' +
            '  scrollBehavior(to, from, savedPosition) {\n' +
            '    if (savedPosition) return savedPosition;\n' +
            '    return { top: 0 };\n' +
            '  },\n' +
            '});\n\n' +
            'export default router;'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3NavigationGuards}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.navigationGuardsDesc}</p>

      {/* Code: Navigation Guards */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '// Global navigation guard — authentication check\n' +
            'router.beforeEach(async (to, from) => {\n' +
            '  const authStore = useAuthStore();\n' +
            '  if (to.meta.requiresAuth && !authStore.isLoggedIn) {\n' +
            '    return { name: \'login\', query: { redirect: to.fullPath } };\n' +
            '  }\n' +
            '  if (to.meta.requiresAdmin && !authStore.isAdmin) {\n' +
            '    return { name: \'forbidden\' };\n' +
            '  }\n' +
            '  // return undefined or true to proceed\n' +
            '});\n\n' +
            '// In-component guards (Composition API)\n' +
            '<script setup lang="ts">\n' +
            'import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from \'vue-router\';\n\n' +
            'const route = useRoute();   // reactive current route\n' +
            'const router = useRouter(); // router instance for programmatic navigation\n\n' +
            'console.log(route.params.id);  // current :id param\n' +
            'console.log(route.query.page); // ?page= query param\n' +
            'console.log(route.meta);       // typed route meta\n\n' +
            'onBeforeRouteLeave((to, from) => {\n' +
            '  if (hasUnsavedChanges.value) {\n' +
            '    return confirm(\'You have unsaved changes. Leave?\');\n' +
            '  }\n' +
            '});\n\n' +
            'onBeforeRouteUpdate((to, from) => {\n' +
            '  // fires when same component used for different params\n' +
            '  fetchUser(to.params.id as string);\n' +
            '});\n\n' +
            '// Programmatic navigation\n' +
            'router.push({ name: \'user-detail\', params: { id: 42 } });\n' +
            'router.replace(\'/dashboard\');\n' +
            'router.go(-1); // go back\n' +
            '</script>'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3DynamicRoutes}</h3>
      <p style={{ color: '#334155', marginBottom: '2rem' }}>{t.dynamicRoutesDesc}</p>

      {/* Section 5: Pinia */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Pinia}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.piniaDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3DefineStore}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.defineStoreDesc}</p>

      {/* Code: Pinia store */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '// src/stores/counter.ts — Setup Store (preferred)\n' +
            'import { defineStore } from \'pinia\';\n' +
            'import { ref, computed } from \'vue\';\n\n' +
            'export const useCounterStore = defineStore(\'counter\', () => {\n' +
            '  // state\n' +
            '  const count = ref(0);\n' +
            '  const history = ref<number[]>([]);\n\n' +
            '  // getters (computed)\n' +
            '  const doubleCount = computed(() => count.value * 2);\n' +
            '  const isPositive = computed(() => count.value > 0);\n\n' +
            '  // actions\n' +
            '  function increment() {\n' +
            '    history.value.push(count.value);\n' +
            '    count.value++;\n' +
            '  }\n\n' +
            '  async function fetchAndSet(id: number) {\n' +
            '    const data = await fetch(\'/api/counts/\' + id).then(r => r.json());\n' +
            '    count.value = data.value;\n' +
            '  }\n\n' +
            '  function $reset() { count.value = 0; history.value = []; }\n\n' +
            '  return { count, history, doubleCount, isPositive, increment, fetchAndSet, $reset };\n' +
            '});\n\n' +
            '// src/stores/user.ts — Options Store style\n' +
            'export const useUserStore = defineStore(\'user\', {\n' +
            '  state: () => ({ name: \'\', email: \'\', isLoggedIn: false }),\n' +
            '  getters: {\n' +
            '    displayName: (state) => state.name || \'Guest\',\n' +
            '  },\n' +
            '  actions: {\n' +
            '    async login(email: string, password: string) {\n' +
            '      const user = await authService.login(email, password);\n' +
            '      this.name = user.name;\n' +
            '      this.email = user.email;\n' +
            '      this.isLoggedIn = true;\n' +
            '    },\n' +
            '    logout() {\n' +
            '      this.$patch({ name: \'\', email: \'\', isLoggedIn: false });\n' +
            '    },\n' +
            '  },\n' +
            '});'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3StoreToRefs}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.storeToRefsDesc}</p>

      {/* Code: Using store in component */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<script setup lang="ts">\n' +
            'import { storeToRefs } from \'pinia\';\n' +
            'import { useCounterStore } from \'@/stores/counter\';\n\n' +
            'const counterStore = useCounterStore();\n\n' +
            '// storeToRefs preserves reactivity for state + getters\n' +
            'const { count, doubleCount, isPositive } = storeToRefs(counterStore);\n\n' +
            '// Actions can be destructured directly (they are not reactive)\n' +
            'const { increment, fetchAndSet } = counterStore;\n\n' +
            '// Batch update with $patch\n' +
            'counterStore.$patch({ count: 10 });\n\n' +
            '// $patch with mutation function for complex updates\n' +
            'counterStore.$patch((state) => {\n' +
            '  state.count += 5;\n' +
            '  state.history.push(state.count);\n' +
            '});\n\n' +
            '// Subscribe to store changes\n' +
            'counterStore.$subscribe((mutation, state) => {\n' +
            '  console.log(\'Store mutated:\', mutation.type, state.count);\n' +
            '  localStorage.setItem(\'counter\', JSON.stringify(state));\n' +
            '});\n' +
            '</script>\n\n' +
            '<template>\n' +
            '  <p>Count: {{ count }} | Double: {{ doubleCount }}</p>\n' +
            '  <button @click="increment">Increment</button>\n' +
            '</template>'
          }</code>
        </pre>
      </div>

      {/* Section 6: Template Directives */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Directives}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.directivesDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3ConditionalList}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.conditionalListDesc}</p>

      {/* Code: Directives */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<template>\n' +
            '  <!-- v-if / v-else-if / v-else: element destroyed+recreated -->\n' +
            '  <div v-if="role === \'admin\'">Admin Panel</div>\n' +
            '  <div v-else-if="role === \'editor\'">Editor Panel</div>\n' +
            '  <div v-else>Viewer Panel</div>\n\n' +
            '  <!-- v-show: always rendered, toggles display:none -->\n' +
            '  <div v-show="isExpanded">Expandable Content</div>\n\n' +
            '  <!-- v-for with :key (use unique ID, not array index) -->\n' +
            '  <ul>\n' +
            '    <li v-for="item in items" :key="item.id">\n' +
            '      {{ item.name }} — ${{ item.price }}\n' +
            '    </li>\n' +
            '  </ul>\n\n' +
            '  <!-- v-for with index -->\n' +
            '  <ol>\n' +
            '    <li v-for="(item, index) in items" :key="item.id">\n' +
            '      {{ index + 1 }}. {{ item.name }}\n' +
            '    </li>\n' +
            '  </ol>\n\n' +
            '  <!-- v-for on a range -->\n' +
            '  <span v-for="n in 5" :key="n">{{ n }} </span>\n\n' +
            '  <!-- Use <template> to group without extra DOM elements -->\n' +
            '  <template v-for="item in items" :key="item.id">\n' +
            '    <dt>{{ item.term }}</dt>\n' +
            '    <dd>{{ item.definition }}</dd>\n' +
            '  </template>\n' +
            '</template>'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3VModel}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.vModelDesc}</p>

      {/* Code: v-model */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<script setup lang="ts">\n' +
            'import { ref } from \'vue\';\n' +
            'const inputValue = ref(\'\');\n' +
            'const isChecked = ref(false);\n' +
            'const selected = ref(\'option1\');\n' +
            '</script>\n\n' +
            '<template>\n' +
            '  <!-- Basic v-model on input -->\n' +
            '  <input v-model="inputValue" type="text" />\n\n' +
            '  <!-- v-model modifiers -->\n' +
            '  <input v-model.trim="inputValue" /> <!-- trims whitespace -->\n' +
            '  <input v-model.number="price" type="number" /> <!-- coerce to number -->\n' +
            '  <input v-model.lazy="search" /> <!-- sync on change, not input -->\n\n' +
            '  <!-- v-bind shorthand: -->\n' +
            '  <img :src="user.avatar" :alt="user.name" />\n' +
            '  <button :disabled="isLoading">{{ isLoading ? \'Loading...\' : \'Submit\' }}</button>\n\n' +
            '  <!-- Bind object of attributes -->\n' +
            '  <div v-bind="{ id: \'main\', class: \'container\', tabindex: 0 }">...</div>\n\n' +
            '  <!-- v-on shorthand @ -->\n' +
            '  <button @click="handleClick">Click</button>\n' +
            '  <form @submit.prevent="handleSubmit">...</form>\n' +
            '  <input @keyup.enter="search" @keyup.escape="clearSearch" />\n' +
            '  <div @click.self="onOverlayClick">...</div> <!-- only fires on exact element -->\n\n' +
            '  <!-- v-model on custom component (Vue 3) -->\n' +
            '  <!-- Expands to: :modelValue="title" @update:modelValue="title = $event" -->\n' +
            '  <MyInput v-model="title" />\n\n' +
            '  <!-- Multiple v-model bindings -->\n' +
            '  <UserForm v-model:name="user.name" v-model:email="user.email" />\n' +
            '</template>'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3VSlot}</h3>
      <p style={{ color: '#334155', marginBottom: '2rem' }}>{t.vSlotDesc}</p>

      {/* Section 7: Composables */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Composables}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.composablesDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3ComposablePatterns}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.composablePatternsDesc}</p>

      {/* Code: Composable */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '// src/composables/useFetch.ts\n' +
            'import { ref, watchEffect, type Ref } from \'vue\';\n\n' +
            'interface UseFetchReturn<T> {\n' +
            '  data: Ref<T | null>;\n' +
            '  error: Ref<Error | null>;\n' +
            '  isLoading: Ref<boolean>;\n' +
            '  refetch: () => void;\n' +
            '}\n\n' +
            'export function useFetch<T>(url: Ref<string> | string): UseFetchReturn<T> {\n' +
            '  const data = ref<T | null>(null);\n' +
            '  const error = ref<Error | null>(null);\n' +
            '  const isLoading = ref(false);\n' +
            '  let controller: AbortController;\n\n' +
            '  async function fetchData() {\n' +
            '    controller?.abort(); // cancel previous request\n' +
            '    controller = new AbortController();\n' +
            '    isLoading.value = true;\n' +
            '    error.value = null;\n' +
            '    try {\n' +
            '      const endpoint = typeof url === \'string\' ? url : url.value;\n' +
            '      const res = await fetch(endpoint, { signal: controller.signal });\n' +
            '      if (!res.ok) throw new Error(\'HTTP \' + res.status);\n' +
            '      data.value = await res.json() as T;\n' +
            '    } catch (e) {\n' +
            '      if ((e as Error).name !== \'AbortError\') error.value = e as Error;\n' +
            '    } finally {\n' +
            '      isLoading.value = false;\n' +
            '    }\n' +
            '  }\n\n' +
            '  watchEffect(() => { fetchData(); });\n\n' +
            '  return { data, error, isLoading, refetch: fetchData };\n' +
            '}\n\n' +
            '// Usage in component\n' +
            '<script setup lang="ts">\n' +
            'import { ref } from \'vue\';\n' +
            'import { useFetch } from \'@/composables/useFetch\';\n\n' +
            'interface User { id: number; name: string; email: string; }\n\n' +
            'const userId = ref(1);\n' +
            'const url = computed(() => \'/api/users/\' + userId.value);\n' +
            'const { data: user, isLoading, error } = useFetch<User>(url);\n' +
            '</script>'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3ProvideInject}</h3>
      <p style={{ color: '#334155', marginBottom: '2rem' }}>{t.provideInjectDesc}</p>

      {/* Section 8: Performance */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Performance}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.performanceDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3Teleport}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.teleportDesc}</p>

      {/* Code: Teleport + Suspense */}
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.6', fontFamily: '"Fira Code", "Cascadia Code", monospace' }}>
          <code>{
            '<!-- Modal component using Teleport -->\n' +
            '<script setup lang="ts">\n' +
            'defineProps<{ isOpen: boolean; title: string }>();\n' +
            'defineEmits<{ close: [] }>();\n' +
            '</script>\n\n' +
            '<template>\n' +
            '  <!-- Renders at document.body, not in component tree -->\n' +
            '  <Teleport to="body">\n' +
            '    <div v-if="isOpen" class="modal-overlay" @click.self="$emit(\'close\')">\n' +
            '      <div class="modal">\n' +
            '        <h2>{{ title }}</h2>\n' +
            '        <slot />\n' +
            '        <button @click="$emit(\'close\')">Close</button>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </Teleport>\n' +
            '</template>\n\n' +
            '<!-- Suspense + defineAsyncComponent -->\n' +
            '<script setup lang="ts">\n' +
            'import { defineAsyncComponent } from \'vue\';\n\n' +
            'const HeavyChart = defineAsyncComponent({\n' +
            '  loader: () => import(\'./HeavyChart.vue\'),\n' +
            '  loadingComponent: LoadingSpinner,\n' +
            '  errorComponent: ErrorDisplay,\n' +
            '  delay: 200,        // show loading after 200ms\n' +
            '  timeout: 10000,    // error after 10s\n' +
            '});\n' +
            '</script>\n\n' +
            '<template>\n' +
            '  <!-- Suspense with fallback slot -->\n' +
            '  <Suspense>\n' +
            '    <template #default>\n' +
            '      <HeavyChart :data="chartData" />\n' +
            '    </template>\n' +
            '    <template #fallback>\n' +
            '      <div>Loading chart...</div>\n' +
            '    </template>\n' +
            '  </Suspense>\n' +
            '</template>'
          }</code>
        </pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3Suspense}</h3>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>{t.suspenseDesc}</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{t.h3TreeShaking}</h3>
      <p style={{ color: '#334155', marginBottom: '2rem' }}>{t.treeShakingDesc}</p>

      {/* Section 9: Comparison Table */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {t.h2Comparison}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>{t.comparisonDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '640px' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #334155' }}>
                {lang === 'zh' ? '维度' : 'Dimension'}
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #334155', color: '#4ade80' }}>Vue 3</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #334155', color: '#94a3b8' }}>Vue 2</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #334155', color: '#60a5fa' }}>React 18</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #334155', color: '#f87171' }}>Angular 17</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                dim: lang === 'zh' ? '类型' : 'Type',
                vue3: lang === 'zh' ? '渐进式框架' : 'Progressive Framework',
                vue2: lang === 'zh' ? '渐进式框架' : 'Progressive Framework',
                react: lang === 'zh' ? 'UI 库' : 'UI Library',
                angular: lang === 'zh' ? '完整框架' : 'Full Framework',
              },
              {
                dim: lang === 'zh' ? 'TypeScript' : 'TypeScript',
                vue3: lang === 'zh' ? '优秀（内置）' : 'Excellent (built-in)',
                vue2: lang === 'zh' ? '一般（需配置）' : 'Fair (needs config)',
                react: lang === 'zh' ? '良好（JSX）' : 'Good (with JSX)',
                angular: lang === 'zh' ? '原生强制' : 'Native, enforced',
              },
              {
                dim: lang === 'zh' ? '学习曲线' : 'Learning Curve',
                vue3: lang === 'zh' ? '低–中' : 'Low–Medium',
                vue2: lang === 'zh' ? '低' : 'Low',
                react: lang === 'zh' ? '中' : 'Medium',
                angular: lang === 'zh' ? '高' : 'High',
              },
              {
                dim: lang === 'zh' ? '状态管理' : 'State Management',
                vue3: lang === 'zh' ? 'Pinia（官方）' : 'Pinia (official)',
                vue2: lang === 'zh' ? 'Vuex（官方）' : 'Vuex (official)',
                react: lang === 'zh' ? 'Redux / Zustand / Jotai' : 'Redux / Zustand / Jotai',
                angular: lang === 'zh' ? 'NgRx / Signals' : 'NgRx / Signals',
              },
              {
                dim: lang === 'zh' ? '路由' : 'Routing',
                vue3: lang === 'zh' ? 'Vue Router 4（官方）' : 'Vue Router 4 (official)',
                vue2: lang === 'zh' ? 'Vue Router 3（官方）' : 'Vue Router 3 (official)',
                react: lang === 'zh' ? 'React Router / TanStack' : 'React Router / TanStack',
                angular: lang === 'zh' ? '@angular/router（内置）' : '@angular/router (built-in)',
              },
              {
                dim: lang === 'zh' ? '全栈框架' : 'Full-Stack Framework',
                vue3: 'Nuxt 3',
                vue2: 'Nuxt 2',
                react: 'Next.js',
                angular: 'Angular Universal',
              },
              {
                dim: lang === 'zh' ? '包大小（基准）' : 'Bundle Size (baseline)',
                vue3: '~22KB gzipped',
                vue2: '~33KB gzipped',
                react: '~42KB gzipped',
                angular: '~75KB gzipped',
              },
              {
                dim: lang === 'zh' ? '性能' : 'Performance',
                vue3: lang === 'zh' ? '极快' : 'Very Fast',
                vue2: lang === 'zh' ? '快' : 'Fast',
                react: lang === 'zh' ? '快（Concurrent）' : 'Fast (Concurrent)',
                angular: lang === 'zh' ? '好（Signals）' : 'Good (Signals)',
              },
              {
                dim: lang === 'zh' ? '模板语法' : 'Template Syntax',
                vue3: lang === 'zh' ? 'HTML 模板 + JSX' : 'HTML Templates + JSX',
                vue2: lang === 'zh' ? 'HTML 模板' : 'HTML Templates',
                react: lang === 'zh' ? 'JSX（必须）' : 'JSX (required)',
                angular: lang === 'zh' ? 'HTML 模板（Angular 特有）' : 'HTML Templates (Angular-specific)',
              },
              {
                dim: lang === 'zh' ? '企业采用' : 'Enterprise Adoption',
                vue3: lang === 'zh' ? '中（阿里巴巴、小米）' : 'Medium (Alibaba, Xiaomi)',
                vue2: lang === 'zh' ? '中（遗留）' : 'Medium (legacy)',
                react: lang === 'zh' ? '极高（Meta、Netflix）' : 'Very High (Meta, Netflix)',
                angular: lang === 'zh' ? '高（Google、企业）' : 'High (Google, enterprise)',
              },
              {
                dim: lang === 'zh' ? '生命周期' : 'Lifecycle Status',
                vue3: lang === 'zh' ? '活跃维护' : 'Actively maintained',
                vue2: lang === 'zh' ? 'EOL（2023-12）' : 'EOL (Dec 2023)',
                react: lang === 'zh' ? '活跃维护' : 'Actively maintained',
                angular: lang === 'zh' ? '活跃维护' : 'Actively maintained',
              },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '0.7rem 1rem', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{row.dim}</td>
                <td style={{ padding: '0.7rem 1rem', color: '#15803d', borderBottom: '1px solid #e5e7eb' }}>{row.vue3}</td>
                <td style={{ padding: '0.7rem 1rem', color: '#64748b', borderBottom: '1px solid #e5e7eb' }}>{row.vue2}</td>
                <td style={{ padding: '0.7rem 1rem', color: '#1d4ed8', borderBottom: '1px solid #e5e7eb' }}>{row.react}</td>
                <td style={{ padding: '0.7rem 1rem', color: '#b91c1c', borderBottom: '1px solid #e5e7eb' }}>{row.angular}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 10: FAQ */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        {t.h2FAQ}
      </h2>

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
        <div key={i} style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: i < 7 ? '1px solid #f1f5f9' : 'none' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem', marginTop: 0 }}>
            {faq.q}
          </h3>
          <p style={{ color: '#475569', margin: 0, lineHeight: '1.75' }}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
