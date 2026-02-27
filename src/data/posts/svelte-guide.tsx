'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Svelte Guide: Reactivity, Components, Stores, SvelteKit, Transitions, Actions & Performance',
    intro: 'Svelte is a radical approach to building user interfaces. Unlike React or Vue, Svelte shifts work from the browser to the compile step, producing highly optimized vanilla JavaScript with no virtual DOM overhead. With Svelte 5 introducing runes and SvelteKit providing a full-stack framework, Svelte has become a compelling choice for modern web development in 2026.',
    tldr: 'Svelte compiles components into efficient imperative code at build time, eliminating virtual DOM diffing. Its reactivity system is built into the language with reactive declarations ($:) and Svelte 5 runes ($state, $derived, $effect). SvelteKit provides file-based routing, SSR, form actions, and progressive enhancement. Svelte consistently outperforms React and Vue in bundle size and runtime benchmarks.',
    takeaway1: 'Svelte compiles to vanilla JS with no runtime framework overhead',
    takeaway2: 'Reactivity is built into the language, not a library API',
    takeaway3: 'Svelte 5 runes provide fine-grained universal reactivity',
    takeaway4: 'SvelteKit offers SSR, file-based routing, and form actions',
    takeaway5: 'Transitions and animations are first-class with built-in directives',
    takeaway6: 'Stores provide simple, framework-integrated state management',
    h2Reactivity: 'Svelte Reactivity System',
    reactivityDesc: 'Svelte tracks reactive dependencies at compile time. When you assign to a variable declared with let, Svelte automatically updates the DOM. Reactive declarations ($:) let you define computed values and run side effects that re-execute whenever their dependencies change.',
    h3ReactiveDecl: 'Reactive Declarations & Statements',
    h3Assignments: 'Reactive Assignments',
    assignmentsDesc: 'In Svelte, assignments trigger reactivity. The compiler instruments each assignment to schedule a DOM update. Array and object mutations require reassignment to trigger updates.',
    h2Components: 'Components: Props, Events, Slots & Lifecycle',
    componentsDesc: 'Svelte components are written in .svelte files combining HTML, CSS, and JavaScript in a single file. Props flow down, events bubble up, and slots allow content composition.',
    h3Props: 'Component Props',
    h3Events: 'Custom Events',
    eventsDesc: 'Components dispatch custom events using createEventDispatcher. Parent components listen with the on: directive.',
    h3Slots: 'Slots & Named Slots',
    slotsDesc: 'Slots allow parent components to inject content into child components. Named slots provide multiple insertion points.',
    h3Lifecycle: 'Lifecycle Functions',
    lifecycleDesc: 'Svelte provides onMount, onDestroy, beforeUpdate, afterUpdate, and tick for managing component lifecycle.',
    h2Stores: 'Svelte Stores',
    storesDesc: 'Stores are Svelte\'s built-in state management solution. They are reactive objects that can be subscribed to and updated from any component. The auto-subscription syntax ($store) makes them seamless to use.',
    h3Writable: 'Writable Stores',
    h3Readable: 'Readable & Derived Stores',
    h3Custom: 'Custom Stores',
    customDesc: 'Custom stores encapsulate logic by wrapping a writable store and exposing a controlled API.',
    h2SvelteKit: 'SvelteKit: Routing, Layouts & Load Functions',
    svelteKitDesc: 'SvelteKit is the official full-stack framework for Svelte. It provides file-based routing, server-side rendering, API routes, and a powerful load function system for data fetching.',
    h3Routing: 'File-Based Routing',
    routingDesc: 'SvelteKit uses the filesystem for routing. Each +page.svelte file in src/routes becomes a page. Dynamic parameters use [brackets] in folder names.',
    h3Layouts: 'Layouts',
    layoutsDesc: 'Layouts wrap pages and persist across navigation. Nested layouts allow shared UI at different route levels.',
    h3Load: 'Load Functions',
    loadDesc: 'Load functions fetch data before rendering. They run on the server during SSR and in the browser during client-side navigation.',
    h2FormActions: 'Form Actions & Progressive Enhancement',
    formActionsDesc: 'SvelteKit form actions handle form submissions on the server. They work without JavaScript and can be progressively enhanced with use:enhance.',
    h2Transitions: 'Transitions & Animations',
    transitionsDesc: 'Svelte has built-in support for transitions and animations via directives. Elements can smoothly enter and leave the DOM with minimal code.',
    h3BuiltIn: 'Built-in Transitions',
    h3Custom2: 'Custom Transitions',
    custom2Desc: 'Create custom transitions by returning an object with css or tick functions.',
    h3Animate: 'The animate Directive',
    animateDesc: 'The animate directive smoothly moves elements when their position changes in a keyed each block.',
    h2Actions: 'Actions (use: Directive)',
    actionsDesc: 'Actions are functions that run when an element is mounted to the DOM. They are useful for integrating third-party libraries, adding event listeners, or implementing reusable DOM behaviors.',
    h2Context: 'Context API',
    contextDesc: 'The Context API passes data through the component tree without prop drilling. Unlike stores, context is scoped to a component subtree.',
    h2Runes: 'Svelte 5 Runes',
    runesDesc: 'Svelte 5 introduces runes, a set of compiler-level primitives that provide universal fine-grained reactivity. Runes replace reactive declarations ($:), export let for props, and stores for many use cases.',
    h3State: '$state & $derived',
    h3Effect: '$effect',
    effectDesc: 'The $effect rune replaces reactive statements and onMount for side effects. It automatically tracks its dependencies and re-runs when they change.',
    h3Props2: '$props',
    props2Desc: 'The $props rune replaces export let for declaring component props in Svelte 5.',
    h2SSR: 'Server-Side Rendering & Hydration',
    ssrDesc: 'SvelteKit renders pages on the server by default and hydrates them on the client. This provides fast initial loads, good SEO, and progressive enhancement.',
    h2Composition: 'Component Composition Patterns',
    compositionDesc: 'Svelte supports several composition patterns for building reusable, maintainable component architectures.',
    h2Testing: 'Testing with Vitest & Playwright',
    testingDesc: 'Svelte components can be tested with Vitest for unit and integration tests, and Playwright for end-to-end tests. SvelteKit scaffolds both by default.',
    h2Performance: 'Performance Comparison',
    performanceDesc: 'Svelte consistently outperforms React and Vue in benchmarks due to its compile-time approach and lack of virtual DOM overhead.',
    thMetric: 'Metric',
    thSvelte: 'Svelte',
    thReact: 'React',
    thVue: 'Vue',
    h2BestPractices: 'Best Practices',
    bp1: 'Use reactive declarations ($:) for computed values instead of manual updates',
    bp2: 'Keep components small and focused on a single responsibility',
    bp3: 'Use stores for cross-component state, context for subtree state',
    bp4: 'Leverage SvelteKit form actions for progressive enhancement',
    bp5: 'Use transitions sparingly to avoid motion sickness issues',
    bp6: 'Prefer $derived over $effect for computed values in Svelte 5',
    bp7: 'Use load functions for data fetching instead of onMount',
    bp8: 'Enable prerendering for static content with export const prerender = true',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Svelte better than React?',
    faq1A: 'Svelte offers smaller bundles, faster runtime performance, and simpler syntax compared to React. However, React has a larger ecosystem, more job opportunities, and more third-party libraries. Svelte is excellent for performance-critical applications and teams that value developer experience.',
    faq2Q: 'What is the difference between Svelte and SvelteKit?',
    faq2A: 'Svelte is the component framework and compiler. SvelteKit is the full-stack application framework built on top of Svelte, providing routing, SSR, API routes, form actions, and deployment adapters. SvelteKit is to Svelte what Next.js is to React.',
    faq3Q: 'How does Svelte reactivity work without a virtual DOM?',
    faq3A: 'Svelte compiles components into imperative JavaScript at build time. The compiler analyzes your code, identifies reactive dependencies, and generates surgical DOM updates. When a reactive variable changes, only the specific DOM nodes that depend on it are updated directly, bypassing the need for virtual DOM diffing.',
    faq4Q: 'What are Svelte 5 runes?',
    faq4A: 'Runes are compiler-level primitives introduced in Svelte 5: $state for reactive state, $derived for computed values, $effect for side effects, and $props for component props. They provide fine-grained reactivity that works everywhere, not just in .svelte files, and replace the older $: syntax and export let pattern.',
    faq5Q: 'Can I use TypeScript with Svelte?',
    faq5A: 'Yes, Svelte has first-class TypeScript support. Add lang="ts" to your script tags in .svelte files. SvelteKit projects scaffold with TypeScript by default, and the Svelte language server provides full IDE support for type checking, autocompletion, and refactoring.',
    faq6Q: 'How do Svelte stores compare to Redux or Zustand?',
    faq6A: 'Svelte stores are much simpler than Redux. A writable store is just a few lines of code, and the $ auto-subscription syntax eliminates boilerplate. For most Svelte applications, built-in stores are sufficient. For complex state logic, custom stores provide similar encapsulation to Zustand slices.',
    faq7Q: 'Is SvelteKit ready for production?',
    faq7A: 'Yes, SvelteKit reached version 1.0 in December 2022 and has been production-ready since then. It is used by companies like Apple, Spotify, The New York Times, and Ikea. SvelteKit 2.0 brought Vite 5, shallow routing, and improved performance.',
    faq8Q: 'How do I deploy a SvelteKit application?',
    faq8A: 'SvelteKit uses adapters for deployment. adapter-auto detects the platform automatically. Dedicated adapters exist for Vercel, Netlify, Cloudflare Pages, Node.js servers, and static site generation. You can also build a Docker container using adapter-node.',
  },
  zh: {
    title: 'Svelte 指南：响应式系统、组件、Store、SvelteKit、过渡动画、Actions 与性能优化',
    intro: 'Svelte 是一种构建用户界面的创新方法。与 React 或 Vue 不同，Svelte 将工作从浏览器转移到编译步骤，生成高度优化的原生 JavaScript，没有虚拟 DOM 开销。随着 Svelte 5 引入 runes 和 SvelteKit 提供全栈框架，Svelte 已成为 2026 年现代 Web 开发的引人注目的选择。',
    tldr: 'Svelte 在构建时将组件编译为高效的命令式代码，消除虚拟 DOM diff。其响应式系统内置于语言中，包括响应式声明（$:）和 Svelte 5 runes（$state、$derived、$effect）。SvelteKit 提供基于文件的路由、SSR、表单 actions 和渐进增强。',
    takeaway1: 'Svelte 编译为原生 JS，没有运行时框架开销',
    takeaway2: '响应式是内置于语言的，而非库 API',
    takeaway3: 'Svelte 5 runes 提供细粒度的通用响应式',
    takeaway4: 'SvelteKit 提供 SSR、基于文件的路由和表单 actions',
    takeaway5: '过渡和动画是内置指令的一等公民',
    takeaway6: 'Store 提供简单的、框架集成的状态管理',
    h2Reactivity: 'Svelte 响应式系统',
    reactivityDesc: 'Svelte 在编译时跟踪响应式依赖。当你给 let 声明的变量赋值时，Svelte 会自动更新 DOM。响应式声明（$:）让你定义计算值和副作用。',
    h3ReactiveDecl: '响应式声明与语句',
    h3Assignments: '响应式赋值',
    assignmentsDesc: '在 Svelte 中，赋值触发响应式。编译器会对每个赋值进行插桩以调度 DOM 更新。数组和对象变更需要重新赋值才能触发更新。',
    h2Components: '组件：Props、事件、Slots 与生命周期',
    componentsDesc: 'Svelte 组件写在 .svelte 文件中，将 HTML、CSS 和 JavaScript 组合在一个文件中。Props 向下传递，事件向上冒泡，slots 允许内容组合。',
    h3Props: '组件 Props',
    h3Events: '自定义事件',
    eventsDesc: '组件使用 createEventDispatcher 分发自定义事件。父组件使用 on: 指令监听。',
    h3Slots: 'Slots 与命名 Slots',
    slotsDesc: 'Slots 允许父组件向子组件注入内容。命名 slots 提供多个插入点。',
    h3Lifecycle: '生命周期函数',
    lifecycleDesc: 'Svelte 提供 onMount、onDestroy、beforeUpdate、afterUpdate 和 tick 来管理组件生命周期。',
    h2Stores: 'Svelte Stores',
    storesDesc: 'Store 是 Svelte 内置的状态管理方案。它们是可订阅和更新的响应式对象。自动订阅语法（$store）使其使用非常流畅。',
    h3Writable: '可写 Store',
    h3Readable: '可读 Store 与派生 Store',
    h3Custom: '自定义 Store',
    customDesc: '自定义 store 通过包装可写 store 并暴露受控 API 来封装逻辑。',
    h2SvelteKit: 'SvelteKit：路由、布局与 Load 函数',
    svelteKitDesc: 'SvelteKit 是 Svelte 的官方全栈框架，提供基于文件的路由、服务端渲染、API 路由和强大的 load 函数数据获取系统。',
    h3Routing: '基于文件的路由',
    routingDesc: 'SvelteKit 使用文件系统进行路由。src/routes 中的每个 +page.svelte 文件都成为一个页面。',
    h3Layouts: '布局',
    layoutsDesc: '布局包裹页面并在导航间持久存在。嵌套布局允许在不同路由级别共享 UI。',
    h3Load: 'Load 函数',
    loadDesc: 'Load 函数在渲染前获取数据。它们在 SSR 期间在服务器上运行，在客户端导航时在浏览器中运行。',
    h2FormActions: '表单 Actions 与渐进增强',
    formActionsDesc: 'SvelteKit 表单 actions 在服务器上处理表单提交。它们无需 JavaScript 即可工作，并可通过 use:enhance 渐进增强。',
    h2Transitions: '过渡与动画',
    transitionsDesc: 'Svelte 通过指令内置支持过渡和动画。元素可以用最少的代码平滑地进入和离开 DOM。',
    h3BuiltIn: '内置过渡',
    h3Custom2: '自定义过渡',
    custom2Desc: '通过返回包含 css 或 tick 函数的对象来创建自定义过渡。',
    h3Animate: 'animate 指令',
    animateDesc: 'animate 指令在键控 each 块中元素位置变化时平滑移动元素。',
    h2Actions: 'Actions（use: 指令）',
    actionsDesc: 'Actions 是元素挂载到 DOM 时运行的函数。它们适用于集成第三方库、添加事件监听器或实现可复用的 DOM 行为。',
    h2Context: 'Context API',
    contextDesc: 'Context API 在组件树中传递数据而无需 prop 逐层传递。与 store 不同，context 作用域限定于组件子树。',
    h2Runes: 'Svelte 5 Runes',
    runesDesc: 'Svelte 5 引入了 runes，一组编译器级别的原语，提供通用的细粒度响应式。Runes 替代了响应式声明（$:）、export let props 和许多 store 用例。',
    h3State: '$state 与 $derived',
    h3Effect: '$effect',
    effectDesc: '$effect rune 替代响应式语句和 onMount 用于副作用。它自动跟踪依赖并在变化时重新运行。',
    h3Props2: '$props',
    props2Desc: '$props rune 替代 export let 来在 Svelte 5 中声明组件 props。',
    h2SSR: '服务端渲染与 Hydration',
    ssrDesc: 'SvelteKit 默认在服务器端渲染页面并在客户端进行 hydration。这提供了快速的初始加载、良好的 SEO 和渐进增强。',
    h2Composition: '组件组合模式',
    compositionDesc: 'Svelte 支持多种组合模式来构建可复用、可维护的组件架构。',
    h2Testing: '使用 Vitest 和 Playwright 测试',
    testingDesc: 'Svelte 组件可以使用 Vitest 进行单元和集成测试，使用 Playwright 进行端到端测试。',
    h2Performance: '性能对比',
    performanceDesc: '由于编译时方法和没有虚拟 DOM 开销，Svelte 在基准测试中始终优于 React 和 Vue。',
    thMetric: '指标',
    thSvelte: 'Svelte',
    thReact: 'React',
    thVue: 'Vue',
    h2BestPractices: '最佳实践',
    bp1: '使用响应式声明（$:）来计算值，而非手动更新',
    bp2: '保持组件小而聚焦于单一职责',
    bp3: '使用 store 进行跨组件状态管理，使用 context 进行子树状态管理',
    bp4: '利用 SvelteKit 表单 actions 实现渐进增强',
    bp5: '谨慎使用过渡以避免晕动症问题',
    bp6: '在 Svelte 5 中优先使用 $derived 而非 $effect 来计算值',
    bp7: '使用 load 函数获取数据，而非 onMount',
    bp8: '使用 export const prerender = true 为静态内容启用预渲染',
    h2Faq: '常见问题',
    faq1Q: 'Svelte 比 React 好吗？',
    faq1A: '与 React 相比，Svelte 提供更小的包体积、更快的运行时性能和更简单的语法。但 React 拥有更大的生态系统和更多的就业机会。Svelte 非常适合性能关键型应用和重视开发体验的团队。',
    faq2Q: 'Svelte 和 SvelteKit 有什么区别？',
    faq2A: 'Svelte 是组件框架和编译器。SvelteKit 是构建在 Svelte 之上的全栈应用框架，提供路由、SSR、API 路由、表单 actions 和部署适配器。SvelteKit 之于 Svelte 就像 Next.js 之于 React。',
    faq3Q: 'Svelte 没有虚拟 DOM 如何实现响应式？',
    faq3A: 'Svelte 在构建时将组件编译为命令式 JavaScript。编译器分析代码，识别响应式依赖，并生成精确的 DOM 更新。当响应式变量改变时，只有依赖它的特定 DOM 节点会被直接更新。',
    faq4Q: '什么是 Svelte 5 runes？',
    faq4A: 'Runes 是 Svelte 5 引入的编译器级原语：$state 用于响应式状态，$derived 用于计算值，$effect 用于副作用，$props 用于组件 props。它们提供了在任何地方都可用的细粒度响应式。',
    faq5Q: '可以在 Svelte 中使用 TypeScript 吗？',
    faq5A: '可以，Svelte 对 TypeScript 有一等支持。在 .svelte 文件的 script 标签中添加 lang="ts" 即可。SvelteKit 项目默认使用 TypeScript 脚手架。',
    faq6Q: 'Svelte store 与 Redux 或 Zustand 相比如何？',
    faq6A: 'Svelte store 比 Redux 简单得多。$ 自动订阅语法消除了样板代码。对于大多数 Svelte 应用，内置 store 就足够了。',
    faq7Q: 'SvelteKit 可以用于生产环境吗？',
    faq7A: '可以，SvelteKit 于 2022 年 12 月达到 1.0 版本。Apple、Spotify、纽约时报和宜家等公司都在使用。',
    faq8Q: '如何部署 SvelteKit 应用？',
    faq8A: 'SvelteKit 使用适配器进行部署。adapter-auto 自动检测平台。有专门的适配器用于 Vercel、Netlify、Cloudflare Pages、Node.js 服务器和静态站点生成。',
  },
};

export default function SvelteGuide({ lang }: { lang: string }) {
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

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <strong style={{ fontSize: '1.125rem' }}>TL;DR</strong>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <strong style={{ fontSize: '1.125rem' }}>Key Takeaways</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>{t.takeaway1}</li>
          <li>{t.takeaway2}</li>
          <li>{t.takeaway3}</li>
          <li>{t.takeaway4}</li>
          <li>{t.takeaway5}</li>
          <li>{t.takeaway6}</li>
        </ul>
      </div>

      {/* Reactivity System */}
      <h2 style={sectionTitle}>{t.h2Reactivity}</h2>
      <p style={para}>{t.reactivityDesc}</p>

      <h3 style={subTitle}>{t.h3ReactiveDecl}</h3>
      <pre style={codeBlock}><code>{'<script>\n' +
        '  let count = 0;\n' +
        '\n' +
        '  // Reactive declaration: recomputes when count changes\n' +
        '  $: doubled = count * 2;\n' +
        '  $: quadrupled = doubled * 2;\n' +
        '\n' +
        '  // Reactive statement: runs side effect\n' +
        '  $: if (count >= 10) {\n' +
        '    console.log("Count reached 10!");\n' +
        '    count = 0;\n' +
        '  }\n' +
        '\n' +
        '  // Reactive block\n' +
        '  $: {\n' +
        '    console.log("count is", count);\n' +
        '    console.log("doubled is", doubled);\n' +
        '  }\n' +
        '\n' +
        '  function increment() {\n' +
        '    count += 1; // assignment triggers reactivity\n' +
        '  }\n' +
        '</script>\n' +
        '\n' +
        '<button on:click={increment}>\n' +
        '  Clicked {count} times\n' +
        '</button>\n' +
        '<p>{count} x 2 = {doubled}</p>\n' +
        '<p>{count} x 4 = {quadrupled}</p>'}</code></pre>

      <h3 style={subTitle}>{t.h3Assignments}</h3>
      <p style={para}>{t.assignmentsDesc}</p>
      <pre style={codeBlock}><code>{'<script>\n' +
        '  let items = ["apple", "banana"];\n' +
        '\n' +
        '  function addItem() {\n' +
        '    // Reassignment triggers reactivity\n' +
        '    items = [...items, "cherry"];\n' +
        '\n' +
        '    // This will NOT trigger reactivity:\n' +
        '    // items.push("cherry");\n' +
        '\n' +
        '    // Idiomatic: push then reassign\n' +
        '    items.push("date");\n' +
        '    items = items; // trigger update\n' +
        '  }\n' +
        '\n' +
        '  let user = { name: "Alice", age: 30 };\n' +
        '\n' +
        '  function birthday() {\n' +
        '    user.age += 1; // property assignment works\n' +
        '  }\n' +
        '</script>'}</code></pre>

      {/* Components */}
      <h2 style={sectionTitle}>{t.h2Components}</h2>
      <p style={para}>{t.componentsDesc}</p>

      <h3 style={subTitle}>{t.h3Props}</h3>
      <pre style={codeBlock}><code>{'<!-- UserCard.svelte -->\n' +
        '<script>\n' +
        '  export let name;         // required prop\n' +
        '  export let age = 25;     // optional with default\n' +
        '  export let role = "user";\n' +
        '</script>\n' +
        '\n' +
        '<div class="card">\n' +
        '  <h3>{name}</h3>\n' +
        '  <p>Age: {age} | Role: {role}</p>\n' +
        '</div>\n' +
        '\n' +
        '<style>\n' +
        '  .card { padding: 1rem; border: 1px solid #ddd; }\n' +
        '</style>\n' +
        '\n' +
        '<!-- Parent.svelte -->\n' +
        '<script>\n' +
        '  import UserCard from "./UserCard.svelte";\n' +
        '</script>\n' +
        '\n' +
        '<UserCard name="Alice" age={30} role="admin" />\n' +
        '<UserCard name="Bob" />'}</code></pre>

      <h3 style={subTitle}>{t.h3Events}</h3>
      <p style={para}>{t.eventsDesc}</p>
      <pre style={codeBlock}><code>{'<!-- SearchInput.svelte -->\n' +
        '<script>\n' +
        '  import { createEventDispatcher } from "svelte";\n' +
        '  const dispatch = createEventDispatcher();\n' +
        '  let query = "";\n' +
        '\n' +
        '  function handleInput() {\n' +
        '    dispatch("search", { query });\n' +
        '  }\n' +
        '</script>\n' +
        '\n' +
        '<input bind:value={query} on:input={handleInput}\n' +
        '  placeholder="Search..." />\n' +
        '\n' +
        '<!-- App.svelte -->\n' +
        '<script>\n' +
        '  import SearchInput from "./SearchInput.svelte";\n' +
        '  function onSearch(event) {\n' +
        '    console.log("Searching:", event.detail.query);\n' +
        '  }\n' +
        '</script>\n' +
        '<SearchInput on:search={onSearch} />'}</code></pre>

      <h3 style={subTitle}>{t.h3Slots}</h3>
      <p style={para}>{t.slotsDesc}</p>
      <pre style={codeBlock}><code>{'<!-- Modal.svelte -->\n' +
        '<script>\n' +
        '  export let title = "Dialog";\n' +
        '</script>\n' +
        '\n' +
        '<div class="modal-backdrop">\n' +
        '  <div class="modal">\n' +
        '    <header>\n' +
        '      <slot name="header"><h2>{title}</h2></slot>\n' +
        '    </header>\n' +
        '    <main><slot /></main>\n' +
        '    <footer>\n' +
        '      <slot name="footer">\n' +
        '        <button>Close</button>\n' +
        '      </slot>\n' +
        '    </footer>\n' +
        '  </div>\n' +
        '</div>\n' +
        '\n' +
        '<!-- Usage -->\n' +
        '<Modal>\n' +
        '  <h2 slot="header">Confirm Delete</h2>\n' +
        '  <p>Are you sure?</p>\n' +
        '  <div slot="footer">\n' +
        '    <button>Cancel</button>\n' +
        '    <button>Delete</button>\n' +
        '  </div>\n' +
        '</Modal>'}</code></pre>

      <h3 style={subTitle}>{t.h3Lifecycle}</h3>
      <p style={para}>{t.lifecycleDesc}</p>
      <pre style={codeBlock}><code>{'<script>\n' +
        '  import { onMount, onDestroy, beforeUpdate,\n' +
        '    afterUpdate, tick } from "svelte";\n' +
        '  let data = null;\n' +
        '\n' +
        '  onMount(async () => {\n' +
        '    const res = await fetch("/api/data");\n' +
        '    data = await res.json();\n' +
        '    return () => { /* cleanup */ };\n' +
        '  });\n' +
        '\n' +
        '  onDestroy(() => { /* remove listeners */ });\n' +
        '  beforeUpdate(() => { /* before DOM update */ });\n' +
        '  afterUpdate(() => { /* after DOM update */ });\n' +
        '\n' +
        '  async function handleClick() {\n' +
        '    data = newValue;\n' +
        '    await tick(); // wait for DOM to update\n' +
        '  }\n' +
        '</script>'}</code></pre>

      {/* Stores */}
      <h2 style={sectionTitle}>{t.h2Stores}</h2>
      <p style={para}>{t.storesDesc}</p>

      <h3 style={subTitle}>{t.h3Writable}</h3>
      <pre style={codeBlock}><code>{'// stores.js\n' +
        'import { writable } from "svelte/store";\n' +
        '\n' +
        'export const count = writable(0);\n' +
        'export const user = writable({ name: "", loggedIn: false });\n' +
        '\n' +
        '// Component.svelte\n' +
        '<script>\n' +
        '  import { count, user } from "./stores.js";\n' +
        '\n' +
        '  // $ prefix auto-subscribes and unsubscribes\n' +
        '  function increment() {\n' +
        '    $count += 1;\n' +
        '    // equivalent to: count.update(n => n + 1);\n' +
        '  }\n' +
        '</script>\n' +
        '\n' +
        '<p>Count: {$count}</p>\n' +
        '<p>User: {$user.name}</p>\n' +
        '<button on:click={increment}>+1</button>'}</code></pre>

      <h3 style={subTitle}>{t.h3Readable}</h3>
      <pre style={codeBlock}><code>{'import { readable, derived } from "svelte/store";\n' +
        '\n' +
        '// Readable store: external data source\n' +
        'export const time = readable(new Date(), (set) => {\n' +
        '  const interval = setInterval(() => {\n' +
        '    set(new Date());\n' +
        '  }, 1000);\n' +
        '  return () => clearInterval(interval);\n' +
        '});\n' +
        '\n' +
        '// Derived store: computed from other stores\n' +
        'export const elapsed = derived(time, ($time) =>\n' +
        '  Math.round(($time.getTime() - start) / 1000)\n' +
        ');\n' +
        '\n' +
        '// Derived from multiple stores\n' +
        'export const summary = derived(\n' +
        '  [count, user],\n' +
        '  ([$count, $user]) =>\n' +
        '    `\\${$user.name} clicked \\${$count} times`\n' +
        ');'}</code></pre>

      <h3 style={subTitle}>{t.h3Custom}</h3>
      <p style={para}>{t.customDesc}</p>
      <pre style={codeBlock}><code>{'import { writable } from "svelte/store";\n' +
        '\n' +
        'function createTodoStore() {\n' +
        '  const { subscribe, update, set } = writable([]);\n' +
        '  return {\n' +
        '    subscribe,\n' +
        '    add: (text) => update(todos =>\n' +
        '      [...todos, { id: Date.now(), text, done: false }]\n' +
        '    ),\n' +
        '    toggle: (id) => update(todos =>\n' +
        '      todos.map(t =>\n' +
        '        t.id === id ? { ...t, done: !t.done } : t\n' +
        '      )\n' +
        '    ),\n' +
        '    remove: (id) => update(todos =>\n' +
        '      todos.filter(t => t.id !== id)\n' +
        '    ),\n' +
        '    reset: () => set([])\n' +
        '  };\n' +
        '}\n' +
        '\n' +
        'export const todos = createTodoStore();'}</code></pre>

      {/* SvelteKit */}
      <h2 style={sectionTitle}>{t.h2SvelteKit}</h2>
      <p style={para}>{t.svelteKitDesc}</p>

      <h3 style={subTitle}>{t.h3Routing}</h3>
      <p style={para}>{t.routingDesc}</p>
      <pre style={codeBlock}><code>{'src/routes/\n' +
        '  +page.svelte          → /\n' +
        '  +layout.svelte        → shared layout\n' +
        '  about/+page.svelte    → /about\n' +
        '  blog/\n' +
        '    +page.svelte        → /blog\n' +
        '    [slug]/\n' +
        '      +page.svelte      → /blog/:slug\n' +
        '      +page.server.ts   → server load\n' +
        '  api/users/\n' +
        '    +server.ts          → /api/users\n' +
        '  (auth)/\n' +
        '    login/+page.svelte  → /login\n' +
        '    register/+page.svelte → /register'}</code></pre>

      <h3 style={subTitle}>{t.h3Layouts}</h3>
      <p style={para}>{t.layoutsDesc}</p>
      <pre style={codeBlock}><code>{'<!-- src/routes/+layout.svelte -->\n' +
        '<script>\n' +
        '  import Header from "$lib/Header.svelte";\n' +
        '  import Footer from "$lib/Footer.svelte";\n' +
        '</script>\n' +
        '\n' +
        '<Header />\n' +
        '<main><slot /></main>\n' +
        '<Footer />\n' +
        '\n' +
        '<!-- src/routes/dashboard/+layout.svelte -->\n' +
        '<script>\n' +
        '  import Sidebar from "$lib/Sidebar.svelte";\n' +
        '</script>\n' +
        '<div class="dashboard">\n' +
        '  <Sidebar />\n' +
        '  <div class="content"><slot /></div>\n' +
        '</div>'}</code></pre>

      <h3 style={subTitle}>{t.h3Load}</h3>
      <p style={para}>{t.loadDesc}</p>
      <pre style={codeBlock}><code>{'// src/routes/blog/[slug]/+page.server.ts\n' +
        'import type { PageServerLoad } from "./$types";\n' +
        'import { error } from "@sveltejs/kit";\n' +
        '\n' +
        'export const load: PageServerLoad = async ({\n' +
        '  params, fetch\n' +
        '}) => {\n' +
        '  const res = await fetch(\n' +
        '    `/api/posts/\\${params.slug}`\n' +
        '  );\n' +
        '  if (!res.ok) throw error(404, "Not found");\n' +
        '  return { post: await res.json() };\n' +
        '};\n' +
        '\n' +
        '// src/routes/blog/[slug]/+page.svelte\n' +
        '<script>\n' +
        '  export let data;\n' +
        '</script>\n' +
        '<article>\n' +
        '  <h1>{data.post.title}</h1>\n' +
        '  <div>{@html data.post.content}</div>\n' +
        '</article>'}</code></pre>

      {/* Form Actions */}
      <h2 style={sectionTitle}>{t.h2FormActions}</h2>
      <p style={para}>{t.formActionsDesc}</p>
      <pre style={codeBlock}><code>{'// src/routes/login/+page.server.ts\n' +
        'import { fail, redirect } from "@sveltejs/kit";\n' +
        '\n' +
        'export const actions = {\n' +
        '  default: async ({ request, cookies }) => {\n' +
        '    const data = await request.formData();\n' +
        '    const email = data.get("email");\n' +
        '    const password = data.get("password");\n' +
        '\n' +
        '    if (!email)\n' +
        '      return fail(400, { email, missing: true });\n' +
        '\n' +
        '    const user = await authenticate(email, password);\n' +
        '    if (!user)\n' +
        '      return fail(401, { email, incorrect: true });\n' +
        '\n' +
        '    cookies.set("session", user.token, { path: "/" });\n' +
        '    throw redirect(303, "/dashboard");\n' +
        '  }\n' +
        '};\n' +
        '\n' +
        '// src/routes/login/+page.svelte\n' +
        '<script>\n' +
        '  import { enhance } from "$app/forms";\n' +
        '  export let form;\n' +
        '</script>\n' +
        '\n' +
        '<form method="POST" use:enhance>\n' +
        '  <input name="email" value={form?.email ?? ""} />\n' +
        '  {#if form?.missing}\n' +
        '    <p class="error">Email is required</p>\n' +
        '  {/if}\n' +
        '  <input name="password" type="password" />\n' +
        '  <button>Log In</button>\n' +
        '</form>'}</code></pre>

      {/* Transitions */}
      <h2 style={sectionTitle}>{t.h2Transitions}</h2>
      <p style={para}>{t.transitionsDesc}</p>

      <h3 style={subTitle}>{t.h3BuiltIn}</h3>
      <pre style={codeBlock}><code>{'<script>\n' +
        '  import { fade, fly, slide, scale }\n' +
        '    from "svelte/transition";\n' +
        '  import { quintOut } from "svelte/easing";\n' +
        '  let visible = true;\n' +
        '</script>\n' +
        '\n' +
        '<button on:click={() => visible = !visible}>\n' +
        '  Toggle\n' +
        '</button>\n' +
        '\n' +
        '{#if visible}\n' +
        '  <div transition:fade={{ duration: 300 }}>\n' +
        '    Fades in and out\n' +
        '  </div>\n' +
        '\n' +
        '  <div transition:fly={{ y: 200, duration: 500,\n' +
        '    easing: quintOut }}>\n' +
        '    Flies in from below\n' +
        '  </div>\n' +
        '\n' +
        '  <div in:fly={{ x: -200 }} out:fade>\n' +
        '    Flies in, fades out\n' +
        '  </div>\n' +
        '\n' +
        '  <div transition:slide={{ duration: 300 }}>\n' +
        '    Slides open and closed\n' +
        '  </div>\n' +
        '{/if}'}</code></pre>

      <h3 style={subTitle}>{t.h3Custom2}</h3>
      <p style={para}>{t.custom2Desc}</p>
      <pre style={codeBlock}><code>{'<script>\n' +
        '  function typewriter(node, { speed = 1 }) {\n' +
        '    const text = node.textContent;\n' +
        '    const duration = text.length / (speed * 0.01);\n' +
        '    return {\n' +
        '      duration,\n' +
        '      tick: (t) => {\n' +
        '        const i = Math.trunc(text.length * t);\n' +
        '        node.textContent = text.slice(0, i);\n' +
        '      }\n' +
        '    };\n' +
        '  }\n' +
        '</script>\n' +
        '\n' +
        '{#if visible}\n' +
        '  <p transition:typewriter={{ speed: 2 }}>\n' +
        '    This text types itself out!\n' +
        '  </p>\n' +
        '{/if}'}</code></pre>

      <h3 style={subTitle}>{t.h3Animate}</h3>
      <p style={para}>{t.animateDesc}</p>
      <pre style={codeBlock}><code>{'<script>\n' +
        '  import { flip } from "svelte/animate";\n' +
        '  import { fade } from "svelte/transition";\n' +
        '  let list = [1, 2, 3, 4, 5];\n' +
        '\n' +
        '  function shuffle() {\n' +
        '    list = list.sort(() => Math.random() - 0.5);\n' +
        '  }\n' +
        '</script>\n' +
        '\n' +
        '<button on:click={shuffle}>Shuffle</button>\n' +
        '{#each list as item (item)}\n' +
        '  <div animate:flip={{ duration: 300 }}\n' +
        '    transition:fade>{item}</div>\n' +
        '{/each}'}</code></pre>

      {/* Actions */}
      <h2 style={sectionTitle}>{t.h2Actions}</h2>
      <p style={para}>{t.actionsDesc}</p>
      <pre style={codeBlock}><code>{'<script>\n' +
        '  // Tooltip action\n' +
        '  function tooltip(node, text) {\n' +
        '    let tip;\n' +
        '    function show() {\n' +
        '      tip = document.createElement("div");\n' +
        '      tip.textContent = text;\n' +
        '      tip.style.cssText = `position:absolute;\n' +
        '        background:#333;color:#fff;padding:4px 8px;\n' +
        '        border-radius:4px;font-size:12px`;\n' +
        '      node.appendChild(tip);\n' +
        '    }\n' +
        '    function hide() { tip?.remove(); }\n' +
        '\n' +
        '    node.addEventListener("mouseenter", show);\n' +
        '    node.addEventListener("mouseleave", hide);\n' +
        '\n' +
        '    return {\n' +
        '      update(newText) { text = newText; },\n' +
        '      destroy() {\n' +
        '        tip?.remove();\n' +
        '        node.removeEventListener("mouseenter", show);\n' +
        '        node.removeEventListener("mouseleave", hide);\n' +
        '      }\n' +
        '    };\n' +
        '  }\n' +
        '\n' +
        '  // Click-outside action\n' +
        '  function clickOutside(node, callback) {\n' +
        '    function onClick(e) {\n' +
        '      if (!node.contains(e.target)) callback();\n' +
        '    }\n' +
        '    document.addEventListener("click", onClick, true);\n' +
        '    return {\n' +
        '      destroy() {\n' +
        '        document.removeEventListener("click",\n' +
        '          onClick, true);\n' +
        '      }\n' +
        '    };\n' +
        '  }\n' +
        '</script>\n' +
        '\n' +
        '<button use:tooltip={"Click me!"}>Hover</button>\n' +
        '<div use:clickOutside={() => open = false}>\n' +
        '  Dropdown content\n' +
        '</div>'}</code></pre>

      {/* Context API */}
      <h2 style={sectionTitle}>{t.h2Context}</h2>
      <p style={para}>{t.contextDesc}</p>
      <pre style={codeBlock}><code>{'<!-- ThemeProvider.svelte -->\n' +
        '<script>\n' +
        '  import { setContext } from "svelte";\n' +
        '  import { writable } from "svelte/store";\n' +
        '\n' +
        '  const theme = writable("light");\n' +
        '  setContext("theme", {\n' +
        '    theme,\n' +
        '    toggle: () => theme.update(t =>\n' +
        '      t === "light" ? "dark" : "light"\n' +
        '    )\n' +
        '  });\n' +
        '</script>\n' +
        '<slot />\n' +
        '\n' +
        '<!-- DeepChild.svelte -->\n' +
        '<script>\n' +
        '  import { getContext } from "svelte";\n' +
        '  const { theme, toggle } = getContext("theme");\n' +
        '</script>\n' +
        '<p>Current theme: {$theme}</p>\n' +
        '<button on:click={toggle}>Toggle Theme</button>'}</code></pre>

      {/* Svelte 5 Runes */}
      <h2 style={sectionTitle}>{t.h2Runes}</h2>
      <p style={para}>{t.runesDesc}</p>

      <h3 style={subTitle}>{t.h3State}</h3>
      <pre style={codeBlock}><code>{'<script>\n' +
        '  // $state: reactive state (replaces let)\n' +
        '  let count = $state(0);\n' +
        '  let items = $state(["apple", "banana"]);\n' +
        '\n' +
        '  // $derived: computed value (replaces $:)\n' +
        '  let doubled = $derived(count * 2);\n' +
        '  let total = $derived(items.length);\n' +
        '\n' +
        '  // Complex derived expression\n' +
        '  let summary = $derived.by(() => {\n' +
        '    if (count > 10) return "Many clicks";\n' +
        '    if (count > 5) return "Some clicks";\n' +
        '    return "Few clicks";\n' +
        '  });\n' +
        '\n' +
        '  // Deep reactivity in Svelte 5\n' +
        '  function addItem() {\n' +
        '    items.push("cherry"); // works in Svelte 5!\n' +
        '  }\n' +
        '</script>\n' +
        '\n' +
        '<button onclick={() => count++}>\n' +
        '  {count} (doubled: {doubled})\n' +
        '</button>\n' +
        '<p>{summary} — {total} items</p>'}</code></pre>

      <h3 style={subTitle}>{t.h3Effect}</h3>
      <p style={para}>{t.effectDesc}</p>
      <pre style={codeBlock}><code>{'<script>\n' +
        '  let count = $state(0);\n' +
        '  let title = $state("My App");\n' +
        '\n' +
        '  // Auto-tracks dependencies\n' +
        '  $effect(() => {\n' +
        '    document.title = `\\${title} (\\${count})`;\n' +
        '  });\n' +
        '\n' +
        '  // With cleanup\n' +
        '  $effect(() => {\n' +
        '    const id = setInterval(() => count++, 1000);\n' +
        '    return () => clearInterval(id);\n' +
        '  });\n' +
        '\n' +
        '  // Pre-effect (runs before DOM update)\n' +
        '  $effect.pre(() => {\n' +
        '    console.log("about to update DOM");\n' +
        '  });\n' +
        '</script>'}</code></pre>

      <h3 style={subTitle}>{t.h3Props2}</h3>
      <p style={para}>{t.props2Desc}</p>
      <pre style={codeBlock}><code>{'<!-- Svelte 5 component with $props -->\n' +
        '<script>\n' +
        '  // Destructure with defaults\n' +
        '  let { name, age = 25, role = "user", ...rest }\n' +
        '    = $props();\n' +
        '\n' +
        '  // With TypeScript:\n' +
        '  // interface Props {\n' +
        '  //   name: string;\n' +
        '  //   age?: number;\n' +
        '  //   role?: "user" | "admin";\n' +
        '  // }\n' +
        '  // let { name, age = 25, role = "user" }\n' +
        '  //   = $props<Props>();\n' +
        '</script>\n' +
        '\n' +
        '<div {...rest}>\n' +
        '  <h3>{name}</h3>\n' +
        '  <p>Age: {age} | Role: {role}</p>\n' +
        '</div>'}</code></pre>

      {/* SSR */}
      <h2 style={sectionTitle}>{t.h2SSR}</h2>
      <p style={para}>{t.ssrDesc}</p>
      <pre style={codeBlock}><code>{'// src/routes/+page.server.ts\n' +
        'export const load = async ({ fetch }) => {\n' +
        '  const res = await fetch("/api/products");\n' +
        '  return { products: await res.json() };\n' +
        '};\n' +
        '\n' +
        '// Page options\n' +
        'export const prerender = true;  // static at build\n' +
        'export const ssr = true;        // default: SSR on\n' +
        'export const csr = true;        // default: hydrate\n' +
        '\n' +
        '// +page.svelte\n' +
        '<script>\n' +
        '  import { browser } from "$app/environment";\n' +
        '  export let data;\n' +
        '  if (browser) {\n' +
        '    console.log("Client-side hydrated!");\n' +
        '  }\n' +
        '</script>\n' +
        '\n' +
        '{#each data.products as product}\n' +
        '  <div>{product.name} — ${product.price}</div>\n' +
        '{/each}'}</code></pre>

      {/* Composition Patterns */}
      <h2 style={sectionTitle}>{t.h2Composition}</h2>
      <p style={para}>{t.compositionDesc}</p>
      <pre style={codeBlock}><code>{'<!-- Compound Components: Tabs -->\n' +
        '<!-- Tabs.svelte -->\n' +
        '<script>\n' +
        '  import { setContext } from "svelte";\n' +
        '  import { writable } from "svelte/store";\n' +
        '  const activeTab = writable(0);\n' +
        '  setContext("tabs", { activeTab });\n' +
        '</script>\n' +
        '<div class="tabs"><slot /></div>\n' +
        '\n' +
        '<!-- Tab.svelte -->\n' +
        '<script>\n' +
        '  import { getContext } from "svelte";\n' +
        '  export let index;\n' +
        '  const { activeTab } = getContext("tabs");\n' +
        '</script>\n' +
        '<button on:click={() => $activeTab = index}\n' +
        '  class:active={$activeTab === index}>\n' +
        '  <slot />\n' +
        '</button>\n' +
        '\n' +
        '<!-- TabPanel.svelte -->\n' +
        '<script>\n' +
        '  import { getContext } from "svelte";\n' +
        '  export let index;\n' +
        '  const { activeTab } = getContext("tabs");\n' +
        '</script>\n' +
        '{#if $activeTab === index}\n' +
        '  <div class="panel"><slot /></div>\n' +
        '{/if}\n' +
        '\n' +
        '<!-- Usage -->\n' +
        '<Tabs>\n' +
        '  <Tab index={0}>General</Tab>\n' +
        '  <Tab index={1}>Settings</Tab>\n' +
        '  <TabPanel index={0}>General content</TabPanel>\n' +
        '  <TabPanel index={1}>Settings content</TabPanel>\n' +
        '</Tabs>'}</code></pre>

      {/* Testing */}
      <h2 style={sectionTitle}>{t.h2Testing}</h2>
      <p style={para}>{t.testingDesc}</p>
      <pre style={codeBlock}><code>{'// counter.test.ts (Vitest + testing-library)\n' +
        'import { render, fireEvent } from\n' +
        '  "@testing-library/svelte";\n' +
        'import { describe, it, expect } from "vitest";\n' +
        'import Counter from "./Counter.svelte";\n' +
        '\n' +
        'describe("Counter", () => {\n' +
        '  it("increments on click", async () => {\n' +
        '    const { getByText } = render(Counter,\n' +
        '      { props: { initial: 0 } });\n' +
        '    const btn = getByText("Count: 0");\n' +
        '    await fireEvent.click(btn);\n' +
        '    expect(getByText("Count: 1")).toBeTruthy();\n' +
        '  });\n' +
        '});\n' +
        '\n' +
        '// e2e/home.test.ts (Playwright)\n' +
        'import { test, expect } from "@playwright/test";\n' +
        '\n' +
        'test("home page loads", async ({ page }) => {\n' +
        '  await page.goto("/");\n' +
        '  await expect(page.locator("h1"))\n' +
        '    .toContainText("Welcome");\n' +
        '  await page.click("button:text(\\\"Increment\\\")");\n' +
        '  await expect(page.locator("[data-count]"))\n' +
        '    .toHaveAttribute("data-count", "1");\n' +
        '});'}</code></pre>

      {/* Performance Comparison */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={para}>{t.performanceDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.thMetric}</th>
              <th style={thStyle}>{t.thSvelte}</th>
              <th style={thStyle}>{t.thReact}</th>
              <th style={thStyle}>{t.thVue}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Bundle Size (min+gzip)</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>1.6 KB</td><td style={tdStyle}>44+ KB</td><td style={tdStyle}>34+ KB</td></tr>
            <tr><td style={tdStyle}>Runtime Overhead</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>None (compiled)</td><td style={tdStyle}>Virtual DOM</td><td style={tdStyle}>Virtual DOM</td></tr>
            <tr><td style={tdStyle}>Startup Time (TTI)</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>~50ms</td><td style={tdStyle}>~120ms</td><td style={tdStyle}>~100ms</td></tr>
            <tr><td style={tdStyle}>Memory Usage</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>Low</td><td style={tdStyle}>Medium-High</td><td style={tdStyle}>Medium</td></tr>
            <tr><td style={tdStyle}>DOM Update Speed</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>Direct mutation</td><td style={tdStyle}>Reconciliation</td><td style={tdStyle}>Proxy-based</td></tr>
            <tr><td style={tdStyle}>JS Benchmark Score</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>1.02</td><td style={tdStyle}>1.38</td><td style={tdStyle}>1.21</td></tr>
            <tr><td style={tdStyle}>TodoMVC Lines</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>~60</td><td style={tdStyle}>~120</td><td style={tdStyle}>~90</td></tr>
            <tr><td style={tdStyle}>Learning Curve</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>Gentle</td><td style={tdStyle}>Moderate</td><td style={tdStyle}>Gentle-Moderate</td></tr>
            <tr><td style={tdStyle}>Ecosystem Size</td><td style={tdStyle}>Growing</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>Largest</td><td style={tdStyle}>Large</td></tr>
            <tr><td style={tdStyle}>TypeScript</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>First-class</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>First-class</td><td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>First-class</td></tr>
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h2 style={sectionTitle}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>{t.bp1}</li>
        <li style={{ marginBottom: '0.5rem' }}>{t.bp2}</li>
        <li style={{ marginBottom: '0.5rem' }}>{t.bp3}</li>
        <li style={{ marginBottom: '0.5rem' }}>{t.bp4}</li>
        <li style={{ marginBottom: '0.5rem' }}>{t.bp5}</li>
        <li style={{ marginBottom: '0.5rem' }}>{t.bp6}</li>
        <li style={{ marginBottom: '0.5rem' }}>{t.bp7}</li>
        <li style={{ marginBottom: '0.5rem' }}>{t.bp8}</li>
      </ul>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
      {[
        [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
          <p style={{ lineHeight: '1.7', color: '#374151' }}>{a}</p>
        </div>
      ))}
    </article>
  );
}
