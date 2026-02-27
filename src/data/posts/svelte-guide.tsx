'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Svelte Guide: Complete Tutorial for Compiler-First Frontend Development (Svelte 5 + SvelteKit)',
    description: 'A comprehensive Svelte guide covering the compiler approach, reactive syntax, component props and events, stores, lifecycle hooks, SvelteKit routing, transitions, animations, and Svelte vs React vs Vue vs SolidJS comparison with real code examples.',
    tldr: 'Svelte is a compiler-first JavaScript framework that shifts work from the browser to the build step. Unlike React or Vue, which ship a runtime to the browser, Svelte compiles your components into highly optimized vanilla JavaScript at build time — resulting in smaller bundle sizes, faster runtime performance, and no virtual DOM overhead. Svelte 5 introduced Runes, a new fine-grained reactivity system. SvelteKit is the official full-stack framework built on Svelte, providing file-based routing, server-side rendering, and form actions. Svelte has consistently ranked as the most loved and wanted framework in Stack Overflow developer surveys.',
    keyTakeaway1: 'Svelte is a compiler, not a runtime library — your components are compiled to optimized vanilla JavaScript, so there is no framework overhead in the browser.',
    keyTakeaway2: 'Reactivity in Svelte is built into the language: assignments to variables automatically trigger DOM updates, and the $ label creates reactive statements that re-run when dependencies change.',
    keyTakeaway3: 'Svelte 5 introduces Runes ($state, $derived, $effect) — a more explicit and powerful reactivity model that works inside and outside of components.',
    keyTakeaway4: 'SvelteKit provides file-based routing, load functions for data fetching, form actions for progressive enhancement, and flexible rendering strategies (SSR, SSG, SPA).',
    keyTakeaway5: 'Svelte stores (writable, readable, derived) provide a simple cross-component state management solution without the complexity of Redux or Zustand.',
    keyTakeaway6: 'Transitions and animations are first-class citizens in Svelte — the built-in transition directives (fade, fly, scale, draw) and spring/tweened stores handle most animation use cases with minimal code.',
  },
  zh: {
    title: 'Svelte 完全指南：编译器优先的前端开发教程（Svelte 5 + SvelteKit）',
    description: '全面的 Svelte 指南，涵盖编译器方法、响应式语法、组件 Props 和事件、Store、生命周期钩子、SvelteKit 路由、过渡动画，以及 Svelte vs React vs Vue vs SolidJS 对比，附真实代码示例。',
    tldr: 'Svelte 是一个编译器优先的 JavaScript 框架，将工作从浏览器转移到构建步骤。与向浏览器发送运行时的 React 或 Vue 不同，Svelte 在构建时将组件编译成高度优化的原生 JavaScript——从而实现更小的包大小、更快的运行时性能，并且没有虚拟 DOM 开销。Svelte 5 引入了 Runes，一个新的细粒度响应性系统。SvelteKit 是基于 Svelte 构建的官方全栈框架，提供文件路由、服务端渲染和表单操作。Svelte 在 Stack Overflow 开发者调查中一直名列最受喜爱和最受期待框架榜首。',
    keyTakeaway1: 'Svelte 是编译器，而非运行时库——组件被编译为优化的原生 JavaScript，因此浏览器中没有框架开销。',
    keyTakeaway2: 'Svelte 的响应性内置于语言中：对变量的赋值自动触发 DOM 更新，$ 标签创建在依赖更改时重新运行的响应式语句。',
    keyTakeaway3: 'Svelte 5 引入了 Runes（$state、$derived、$effect）——一种更明确、更强大的响应性模型，可在组件内外使用。',
    keyTakeaway4: 'SvelteKit 提供文件路由、用于数据获取的 load 函数、用于渐进增强的表单操作，以及灵活的渲染策略（SSR、SSG、SPA）。',
    keyTakeaway5: 'Svelte Store（writable、readable、derived）提供了简单的跨组件状态管理解决方案，没有 Redux 或 Zustand 的复杂性。',
    keyTakeaway6: '过渡和动画是 Svelte 的一等公民——内置的 transition 指令（fade、fly、scale、draw）和 spring/tweened store 以最少的代码处理大多数动画用例。',
  },
};

export default function SvelteGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Svelte 5 Runes and how do they differ from Svelte 4 reactivity?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Svelte 5 Runes are special compiler instructions ($state, $derived, $effect, $props, $bindable) that replace Svelte 4\'s implicit reactivity model. In Svelte 4, any top-level variable in a component was automatically reactive. In Svelte 5, you explicitly declare reactive state with $state(), derived values with $derived(), and side effects with $effect(). Runes work inside and outside components (in .svelte.js/.svelte.ts files), making them more versatile for sharing logic across components.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does SvelteKit differ from plain Svelte?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Svelte is a component compiler — it handles the UI layer. SvelteKit is the full-stack application framework built on top of Svelte, analogous to Next.js for React. SvelteKit adds file-based routing, server-side rendering (SSR), static site generation (SSG), API routes (+server.ts files), load functions for data fetching, form actions for server-side form handling, and adapters for deploying to different platforms (Vercel, Netlify, Node, Cloudflare). For anything beyond a single-page prototype, SvelteKit is the recommended way to build Svelte applications.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Svelte support TypeScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Svelte has first-class TypeScript support. Add lang="ts" to the script tag: <script lang="ts">. Component props can be typed with TypeScript interfaces. SvelteKit generates types for your routes automatically in .svelte-kit/types, so load function return types, page data types, and route params are all fully typed. The $props() rune in Svelte 5 provides excellent TypeScript ergonomics for component interfaces.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Svelte good for large applications?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Svelte scales well for large applications when used with SvelteKit. The main considerations are: the ecosystem is smaller than React (fewer third-party component libraries), the team needs Svelte-specific knowledge, and Svelte\'s compiler approach means JavaScript bundle size advantages diminish as your application grows (the compiled output per component is larger than React\'s JSX). However, SvelteKit\'s code splitting, route-level SSR, and the simplicity of Svelte stores keep large applications manageable. Companies like The New York Times, Apple, and GoDaddy use Svelte in production.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Svelte handle server-side rendering?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SvelteKit handles SSR automatically. By default, every page is server-rendered on first load and then hydrated on the client. You control rendering strategy per-page with page options: export const ssr = false disables SSR (SPA mode), export const prerender = true enables static generation at build time, export const csr = false disables client-side JavaScript entirely. Load functions run on the server and pass data to the page component. This flexibility makes SvelteKit suitable for content sites, e-commerce, dashboards, and everything in between.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Svelte stores and the Context API?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Svelte stores are module-level singletons — they are created once and shared across all components that import them. They are ideal for application-wide state (user authentication, theme, cart). The Context API (setContext/getContext) shares values within a component tree without importing a module, making it suitable for component-library state that should not be global (e.g., a Form component providing context to its Input children). Use stores for global state, context for component-tree-scoped state.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Svelte transitions work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Svelte transitions are applied with the transition:, in:, and out: directives on DOM elements. Built-in transitions include fade, fly, slide, scale, blur, and draw (for SVG). They activate when an element enters or leaves the DOM (controlled by {#if} blocks). Custom transitions are functions that return an object with delay, duration, easing, css, and tick properties. The crossfade transition handles shared element transitions between list items. All transitions are CSS-based by default, running off the main thread for smooth 60fps animations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use Svelte 4 or Svelte 5 for a new project?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use Svelte 5 for new projects started in 2025 and beyond. Svelte 5 is stable (released October 2024) and offers significant improvements: Runes provide more explicit and powerful reactivity, snippets replace slots for content projection, and the reactivity model is more predictable. Svelte 5 is backward compatible — Svelte 4 component syntax still works. The official SvelteKit documentation now defaults to Svelte 5 syntax. The migration from Svelte 4 to 5 is incremental and the official migration guide and codemods automate most changes.',
        },
      },
    ],
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '2.5rem',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: '1rem',
    marginTop: '2rem',
    lineHeight: 1.3,
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '0.75rem',
    marginTop: '1.5rem',
  };

  const pStyle: React.CSSProperties = {
    fontSize: '1rem',
    lineHeight: 1.75,
    color: '#374151',
    marginBottom: '1rem',
  };

  const codeBlockStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    borderRadius: '0.5rem',
    padding: '1.25rem 1.5rem',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: 1.7,
    marginBottom: '1.25rem',
    fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#0369a1',
    padding: '0.125rem 0.375rem',
    borderRadius: '0.25rem',
    fontSize: '0.875em',
    fontFamily: '"Fira Code", Consolas, monospace',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    borderRadius: '0 0.5rem 0.5rem 0',
    padding: '1.25rem 1.5rem',
    marginBottom: '2rem',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '2rem',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
    overflowX: 'auto',
    display: 'block',
  };

  const thStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#f8fafc',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.7rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  const tdAltStyle: React.CSSProperties = {
    ...tdStyle,
    background: '#f8fafc',
  };

  const badgeGreenStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#dcfce7',
    color: '#166534',
    borderRadius: '9999px',
    padding: '0.125rem 0.5rem',
    fontSize: '0.8rem',
    fontWeight: 600,
  };

  const badgeYellowStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#fef9c3',
    color: '#854d0e',
    borderRadius: '9999px',
    padding: '0.125rem 0.5rem',
    fontSize: '0.8rem',
    fontWeight: 600,
  };

  const badgeBlueStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#dbeafe',
    color: '#1e40af',
    borderRadius: '9999px',
    padding: '0.125rem 0.5rem',
    fontSize: '0.8rem',
    fontWeight: 600,
  };

  const faqItemStyle: React.CSSProperties = {
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '1.25rem',
    marginBottom: '1.25rem',
  };

  const isZh = lang === 'zh';

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <strong style={{ display: 'block', fontSize: '0.875rem', color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          TL;DR
        </strong>
        <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.7, color: '#0c4a6e' }}>
          {t.tldr}
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ display: 'block', fontSize: '1rem', color: '#0f172a', marginBottom: '0.75rem' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#374151', lineHeight: 1.8 }}>
          <li>{t.keyTakeaway1}</li>
          <li>{t.keyTakeaway2}</li>
          <li>{t.keyTakeaway3}</li>
          <li>{t.keyTakeaway4}</li>
          <li>{t.keyTakeaway5}</li>
          <li>{t.keyTakeaway6}</li>
        </ul>
      </div>

      {/* Section 1: What is Svelte */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? 'Svelte 是什么？编译器方法的革命' : 'What is Svelte? The Compiler Approach Revolution'}</h2>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 是由 Rich Harris 于 2016 年创建的前端编译器框架。与 React、Vue 和 Angular 不同，这些框架在浏览器中运行时解释你的组件，Svelte 在构建时将组件编译成高度优化的原生 JavaScript。最终结果：没有框架运行时，没有虚拟 DOM，没有差异算法——只有直接操作 DOM 的精确 JavaScript。'
            : 'Svelte is a frontend compiler framework created by Rich Harris in 2016. Unlike React, Vue, and Angular — which ship a runtime to the browser that interprets your components — Svelte compiles your components into highly optimized vanilla JavaScript at build time. The result: no framework runtime, no virtual DOM, no diffing algorithm — just precise JavaScript that directly manipulates the DOM.'}
        </p>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 的核心理念是：框架应该在编译时消失。当用户加载你的应用时，他们下载的是纯 JavaScript，而不是 Svelte。这带来了显著的性能优势——特别是在初始加载时间、内存使用和运行时速度方面。Svelte 连续多年在 Stack Overflow 开发者调查中被评为最受喜爱的 Web 框架。'
            : 'The core philosophy of Svelte is that frameworks should disappear at compile time. When users load your app, they download pure JavaScript, not Svelte. This yields measurable performance advantages — especially in initial load time, memory usage, and runtime speed. Svelte has been voted the most loved web framework in Stack Overflow developer surveys multiple years running.'}
        </p>

        <h3 style={h3Style}>{isZh ? '无虚拟 DOM：为什么这很重要' : 'No Virtual DOM: Why It Matters'}</h3>
        <p style={pStyle}>
          {isZh
            ? 'React 和 Vue 维护一个 DOM 的内存表示（虚拟 DOM）。每次状态更新时，它们重新渲染组件树，将新的虚拟 DOM 与旧的进行比较（差异算法），然后仅将必要的更改应用于真实 DOM。这种方法对开发体验很好，但会引入开销。Svelte 完全跳过这个步骤——它生成的代码知道哪些 DOM 节点在特定状态变化时会受到影响，并以外科手术般的精确方式直接更新它们。'
            : 'React and Vue maintain an in-memory representation of the DOM (virtual DOM). On each state update, they re-render the component tree, diff the new virtual DOM against the old one, and apply only necessary changes to the real DOM. This approach is great for developer experience but introduces overhead. Svelte skips this entirely — the code it generates knows exactly which DOM nodes are affected by a given state change and updates them with surgical precision.'}
        </p>

        <h3 style={h3Style}>{isZh ? 'Svelte 5 与 Runes：新的响应性模型' : 'Svelte 5 and Runes: The New Reactivity Model'}</h3>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 5（2024 年 10 月稳定版）引入了 Runes——以 $ 前缀的特殊编译器指令，使响应性更加明确。在 Svelte 4 中，组件中的每个顶级变量都是隐式响应式的。Svelte 5 用显式的 $state()、$derived()、$effect() 和 $props() 替换了这种隐式魔法，提供了更可预测的行为，尤其是在复杂应用中。'
            : 'Svelte 5 (stable October 2024) introduced Runes — special compiler directives prefixed with $ that make reactivity more explicit. In Svelte 4, every top-level variable in a component was implicitly reactive. Svelte 5 replaces this implicit magic with explicit $state(), $derived(), $effect(), and $props(), providing more predictable behavior especially in complex applications.'}
        </p>
        <pre style={codeBlockStyle}><code>{
'// Svelte 4 - implicit reactivity\n' +
'<script>\n' +
'  let count = 0;           // automatically reactive\n' +
'  $: doubled = count * 2;  // reactive statement\n' +
'  $: console.log(count);   // reactive side effect\n' +
'</' + 'script>\n\n' +
'// Svelte 5 - explicit Runes\n' +
'<script>\n' +
'  let count = $state(0);              // explicit reactive state\n' +
'  let doubled = $derived(count * 2); // explicit derived value\n' +
'  $effect(() => console.log(count)); // explicit side effect\n' +
'</' + 'script>'
}</code></pre>
      </section>

      {/* Section 2: Svelte Syntax Basics */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? 'Svelte 语法基础：script、style 和模板' : 'Svelte Syntax Basics: Script, Style, and Template'}</h2>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 组件是扩展名为 .svelte 的单文件组件（SFC）。每个组件由三个部分组成：<script> 块（组件逻辑和响应式状态）、<style> 块（作用域 CSS，默认情况下不会泄漏到子组件）和模板（HTML 标记，支持 Svelte 的模板语法）。这三个部分都是可选的。'
            : 'Svelte components are single-file components (SFCs) with a .svelte extension. Each component has up to three sections: the <script> block (component logic and reactive state), the <style> block (scoped CSS that does not leak to child components by default), and the template (HTML markup with Svelte\'s template syntax). All three sections are optional.'}
        </p>
        <pre style={codeBlockStyle}><code>{
'<!-- Counter.svelte -->\n' +
'<script>\n' +
'  // Svelte 5 Runes syntax\n' +
'  let count = $state(0);\n' +
'  let doubled = $derived(count * 2);\n\n' +
'  function increment() {\n' +
'    count++; // assignment triggers DOM update\n' +
'  }\n' +
'</' + 'script>\n\n' +
'<!-- Template: plain HTML with {expressions} -->\n' +
'<button onclick={increment}>\n' +
'  Clicked {count} times (doubled: {doubled})\n' +
'</button>\n\n' +
'<style>\n' +
'  /* Scoped CSS - only applies to this component */\n' +
'  button {\n' +
'    background: #0ea5e9;\n' +
'    color: white;\n' +
'    padding: 0.5rem 1rem;\n' +
'    border: none;\n' +
'    border-radius: 0.25rem;\n' +
'    cursor: pointer;\n' +
'  }\n' +
'</' + 'style>'
}</code></pre>

        <h3 style={h3Style}>{isZh ? '模板语法：条件、循环和插槽' : 'Template Syntax: Conditionals, Loops, and Slots'}</h3>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 的模板语法使用 {#if}、{#each} 和 {#await} 块来处理条件渲染、列表和异步数据。这些是编译器特性，不是运行时函数——它们被编译为高效的 DOM 操作。'
            : "Svelte's template syntax uses {#if}, {#each}, and {#await} blocks for conditional rendering, lists, and async data. These are compiler features, not runtime functions — they compile to efficient DOM operations."}
        </p>
        <pre style={codeBlockStyle}><code>{
'<script>\n' +
'  let user = $state({ name: "Alice", loggedIn: true });\n' +
'  let items = $state(["Apple", "Banana", "Cherry"]);\n' +
'  let promise = fetch("/api/data").then(r => r.json());\n' +
'</' + 'script>\n\n' +
'<!-- Conditional rendering -->\n' +
'{#if user.loggedIn}\n' +
'  <p>Welcome, {user.name}!</p>\n' +
'{:else}\n' +
'  <p>Please log in.</p>\n' +
'{/if}\n\n' +
'<!-- List rendering with key -->\n' +
'{#each items as item, i (item)}\n' +
'  <li>{i + 1}. {item}</li>\n' +
'{:else}\n' +
'  <p>No items found.</p>\n' +
'{/each}\n\n' +
'<!-- Async block -->\n' +
'{#await promise}\n' +
'  <p>Loading...</p>\n' +
'{:then data}\n' +
'  <p>Data: {JSON.stringify(data)}</p>\n' +
'{:catch error}\n' +
'  <p>Error: {error.message}</p>\n' +
'{/await}'
}</code></pre>

        <h3 style={h3Style}>{isZh ? '作用域样式和 :global 修饰符' : 'Scoped Styles and the :global Modifier'}</h3>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 通过向组件添加唯一的哈希属性来自动作用域化 CSS。组件中的 button 样式不会影响子组件或父组件中的按钮。使用 :global() 修饰符来针对全局元素，或使用 :global 在 <style> 中创建全局 CSS。'
            : 'Svelte automatically scopes CSS by adding a unique hash attribute to the component. A button style in your component will not affect buttons in child or parent components. Use the :global() modifier to target global elements, or :global at the top of <style> for global CSS.'}
        </p>
        <pre style={codeBlockStyle}><code>{
'<style>\n' +
'  /* Scoped: only affects <p> in this component */\n' +
'  p { color: blue; }\n\n' +
'  /* Global: affects all <h1> on the page */\n' +
'  :global(h1) { font-size: 2rem; }\n\n' +
'  /* Target child component elements */\n' +
'  .wrapper :global(.child-class) {\n' +
'    margin: 0;\n' +
'  }\n' +
'</' + 'style>'
}</code></pre>
      </section>

      {/* Section 3: Component Props and Events */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? '组件 Props 和事件：通信模式' : 'Component Props and Events: Communication Patterns'}</h2>
        <p style={pStyle}>
          {isZh
            ? '在 Svelte 4 中，组件 props 通过 export let 声明。在 Svelte 5 中，$props() rune 提供了一种更明确、类型安全的方式来声明 props。事件通过 createEventDispatcher（Svelte 4）或回调 props（Svelte 5 推荐方式）处理。'
            : 'In Svelte 4, component props are declared with export let. In Svelte 5, the $props() rune provides a more explicit, type-safe way to declare props. Events are handled with createEventDispatcher (Svelte 4) or callback props (Svelte 5 recommended approach).'}
        </p>
        <pre style={codeBlockStyle}><code>{
'<!-- Button.svelte - Svelte 5 style -->\n' +
'<script lang="ts">\n' +
'  interface Props {\n' +
'    label: string;\n' +
'    variant?: "primary" | "secondary";\n' +
'    disabled?: boolean;\n' +
'    onclick?: () => void;\n' +
'  }\n\n' +
'  let {\n' +
'    label,\n' +
'    variant = "primary",\n' +
'    disabled = false,\n' +
'    onclick\n' +
'  }: Props = $props();\n' +
'</' + 'script>\n\n' +
'<button\n' +
'  class={variant}\n' +
'  {disabled}\n' +
'  {onclick}\n' +
'>\n' +
'  {label}\n' +
'</button>'
}</code></pre>

        <h3 style={h3Style}>{isZh ? '双向绑定：bind: 指令' : 'Two-Way Binding: The bind: Directive'}</h3>
        <p style={pStyle}>
          {isZh
            ? 'bind: 指令在父组件和子组件之间创建双向数据绑定。它可以用于表单输入（bind:value、bind:checked、bind:group）、DOM 属性（bind:clientWidth、bind:scrollY）和组件 props（当子组件将 prop 声明为可绑定时）。'
            : 'The bind: directive creates two-way data binding between a parent and child. It can be used for form inputs (bind:value, bind:checked, bind:group), DOM properties (bind:clientWidth, bind:scrollY), and component props (when the child declares the prop as bindable).'}
        </p>
        <pre style={codeBlockStyle}><code>{
'<script>\n' +
'  let name = $state("");\n' +
'  let agreed = $state(false);\n' +
'  let color = $state("red");\n' +
'  let width = $state(0);\n' +
'</' + 'script>\n\n' +
'<!-- Bind to input value -->\n' +
'<input bind:value={name} placeholder="Your name" />\n' +
'<p>Hello, {name}!</p>\n\n' +
'<!-- Bind to checkbox -->\n' +
'<input type="checkbox" bind:checked={agreed} />\n' +
'<label>I agree</label>\n\n' +
'<!-- Bind to select -->\n' +
'<select bind:value={color}>\n' +
'  <option value="red">Red</option>\n' +
'  <option value="blue">Blue</option>\n' +
'</select>\n\n' +
'<!-- Bind to element dimensions -->\n' +
'<div bind:clientWidth={width}>\n' +
'  This div is {width}px wide\n' +
'</div>'
}</code></pre>

        <h3 style={h3Style}>{isZh ? '组件事件：Svelte 4 vs Svelte 5' : 'Component Events: Svelte 4 vs Svelte 5'}</h3>
        <pre style={codeBlockStyle}><code>{
'<!-- Svelte 4: createEventDispatcher -->\n' +
'<script>\n' +
'  import { createEventDispatcher } from "svelte";\n' +
'  const dispatch = createEventDispatcher();\n\n' +
'  function handleClick() {\n' +
'    dispatch("customEvent", { value: 42 });\n' +
'  }\n' +
'</' + 'script>\n' +
'<button on:click={handleClick}>Click</button>\n\n' +
'<!-- Parent usage -->\n' +
'<Child on:customEvent={(e) => console.log(e.detail.value)} />\n\n' +
'<!-- --------------------------------------- -->\n\n' +
'<!-- Svelte 5: callback props (recommended) -->\n' +
'<script>\n' +
'  let { oncustomevent } = $props();\n\n' +
'  function handleClick() {\n' +
'    oncustomevent?.({ value: 42 });\n' +
'  }\n' +
'</' + 'script>\n' +
'<button onclick={handleClick}>Click</button>\n\n' +
'<!-- Parent usage -->\n' +
'<Child oncustomevent={(data) => console.log(data.value)} />'
}</code></pre>
      </section>

      {/* Section 4: Reactive Statements and Stores */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? '响应式语句和 Store：状态管理基础' : 'Reactive Statements and Stores: State Management Foundations'}</h2>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 的响应性模型是其最独特的特性之一。在 Svelte 4 中，$ 标签标记的语句在依赖项更改时重新运行。在 Svelte 5 中，$derived() 和 $effect() rune 提供了相同的功能，但更明确。Svelte Store 提供了跨组件共享响应式状态的机制。'
            : "Svelte's reactivity model is one of its most distinctive features. In Svelte 4, statements marked with the $ label re-run when their dependencies change. In Svelte 5, $derived() and $effect() runes provide the same functionality more explicitly. Svelte Stores provide a mechanism for sharing reactive state across components."}
        </p>

        <h3 style={h3Style}>{isZh ? 'writable、readable 和 derived Store' : 'writable, readable, and derived Stores'}</h3>
        <pre style={codeBlockStyle}><code>{
'// stores.ts\n' +
'import { writable, readable, derived, get } from "svelte/store";\n\n' +
'// Writable store: external code can set/update\n' +
'export const count = writable(0);\n\n' +
'// Methods: set, update, subscribe\n' +
'count.set(5);\n' +
'count.update(n => n + 1);\n' +
'const current = get(count); // synchronous read\n\n' +
'// Readable store: set internally, read-only externally\n' +
'export const time = readable(new Date(), (set) => {\n' +
'  const interval = setInterval(() => set(new Date()), 1000);\n' +
'  return () => clearInterval(interval); // cleanup\n' +
'});\n\n' +
'// Derived store: computed from other stores\n' +
'export const doubled = derived(count, $count => $count * 2);\n\n' +
'// Derived from multiple stores\n' +
'export const summary = derived(\n' +
'  [count, time],\n' +
'  ([$count, $time]) => `Count: ${$count} at ${$time.toLocaleTimeString()}`\n' +
');'
}</code></pre>

        <h3 style={h3Style}>{isZh ? '在组件中使用 Store：$ 前缀自动订阅' : 'Using Stores in Components: The $ Auto-Subscription'}</h3>
        <p style={pStyle}>
          {isZh
            ? '在 Svelte 组件中，以 $ 为前缀引用 store 会自动订阅它并在组件销毁时取消订阅。这消除了手动 subscribe/unsubscribe 调用，防止内存泄漏。$store 语法只在 .svelte 文件中有效。'
            : 'In a Svelte component, prefixing a store with $ automatically subscribes to it and unsubscribes when the component is destroyed. This eliminates manual subscribe/unsubscribe calls and prevents memory leaks. The $store syntax only works in .svelte files.'}
        </p>
        <pre style={codeBlockStyle}><code>{
'<script>\n' +
'  import { count, doubled, time } from "./stores";\n' +
'  // No manual subscription needed!\n' +
'  // $count, $doubled, $time are auto-subscribed\n' +
'</' + 'script>\n\n' +
'<p>Count: {$count}</p>\n' +
'<p>Doubled: {$doubled}</p>\n' +
'<p>Time: {$time.toLocaleTimeString()}</p>\n\n' +
'<!-- Bind directly to writable store -->\n' +
'<input bind:value={$count} type="number" />\n\n' +
'<!-- Update store from event -->\n' +
'<button onclick={() => count.update(n => n + 1)}>\n' +
'  Increment\n' +
'</button>'
}</code></pre>

        <h3 style={h3Style}>{isZh ? '自定义 Store：封装业务逻辑' : 'Custom Stores: Encapsulating Business Logic'}</h3>
        <pre style={codeBlockStyle}><code>{
'// cart.ts - custom store with methods\n' +
'import { writable, derived } from "svelte/store";\n\n' +
'interface CartItem {\n' +
'  id: string;\n' +
'  name: string;\n' +
'  price: number;\n' +
'  quantity: number;\n' +
'}\n\n' +
'function createCart() {\n' +
'  const { subscribe, set, update } = writable<CartItem[]>([]);\n\n' +
'  return {\n' +
'    subscribe,\n' +
'    addItem: (item: CartItem) => update(items => {\n' +
'      const existing = items.find(i => i.id === item.id);\n' +
'      if (existing) {\n' +
'        return items.map(i =>\n' +
'          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i\n' +
'        );\n' +
'      }\n' +
'      return [...items, { ...item, quantity: 1 }];\n' +
'    }),\n' +
'    removeItem: (id: string) => update(items =>\n' +
'      items.filter(i => i.id !== id)\n' +
'    ),\n' +
'    clear: () => set([]),\n' +
'  };\n' +
'}\n\n' +
'export const cart = createCart();\n' +
'export const cartTotal = derived(cart, $cart =>\n' +
'  $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)\n' +
');'
}</code></pre>
      </section>

      {/* Section 5: Lifecycle Hooks */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? '生命周期钩子：onMount、onDestroy 和更多' : 'Lifecycle Hooks: onMount, onDestroy, and More'}</h2>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 提供了四个生命周期函数：onMount（组件挂载到 DOM 后运行）、onDestroy（组件从 DOM 卸载前运行）、beforeUpdate（DOM 更新前运行）和 afterUpdate（DOM 更新后运行）。Svelte 5 中的 $effect() rune 结合了 onMount、onDestroy 和 afterUpdate 的功能。'
            : 'Svelte provides four lifecycle functions: onMount (runs after the component is mounted to the DOM), onDestroy (runs before the component is removed from the DOM), beforeUpdate (runs before the DOM is updated), and afterUpdate (runs after the DOM is updated). In Svelte 5, the $effect() rune combines the functionality of onMount, onDestroy, and afterUpdate.'}
        </p>
        <pre style={codeBlockStyle}><code>{
'<script>\n' +
'  import { onMount, onDestroy, beforeUpdate, afterUpdate, tick } from "svelte";\n\n' +
'  let canvas: HTMLCanvasElement;\n' +
'  let intervalId: number;\n\n' +
'  onMount(() => {\n' +
'    // Runs after component is mounted\n' +
'    // DOM elements are accessible here\n' +
'    const ctx = canvas.getContext("2d");\n' +
'    intervalId = setInterval(() => {\n' +
'      // animation loop\n' +
'    }, 16);\n\n' +
'    // Return cleanup function (like useEffect in React)\n' +
'    return () => clearInterval(intervalId);\n' +
'  });\n\n' +
'  onDestroy(() => {\n' +
'    // Additional cleanup when component unmounts\n' +
'    clearInterval(intervalId);\n' +
'  });\n\n' +
'  let prevCount = 0;\n' +
'  let count = $state(0);\n\n' +
'  beforeUpdate(() => {\n' +
'    // Capture state before DOM update\n' +
'    prevCount = count;\n' +
'  });\n\n' +
'  afterUpdate(() => {\n' +
'    // DOM has been updated\n' +
'    console.log("Count changed from", prevCount, "to", count);\n' +
'  });\n' +
'</' + 'script>\n\n' +
'<canvas bind:this={canvas} width={400} height={300} />'
}</code></pre>

        <h3 style={h3Style}>{isZh ? 'tick() 函数：等待 DOM 更新' : 'The tick() Function: Waiting for DOM Updates'}</h3>
        <p style={pStyle}>
          {isZh
            ? 'tick() 返回一个 Promise，在所有挂起的状态更改应用于 DOM 后解析。当你需要在状态更新后立即读取更新后的 DOM 时，这很有用——例如，在聚焦动态显示的输入时或在调整滚动位置时。'
            : 'tick() returns a Promise that resolves after all pending state changes have been applied to the DOM. This is useful when you need to read the updated DOM immediately after a state update — for example, when focusing a dynamically revealed input or when adjusting scroll position.'}
        </p>
        <pre style={codeBlockStyle}><code>{
'<script>\n' +
'  import { tick } from "svelte";\n\n' +
'  let showInput = $state(false);\n' +
'  let inputEl: HTMLInputElement;\n\n' +
'  async function revealAndFocus() {\n' +
'    showInput = true;\n' +
'    await tick(); // wait for DOM update\n' +
'    inputEl.focus(); // now inputEl is in the DOM\n' +
'  }\n' +
'</' + 'script>\n\n' +
'{#if showInput}\n' +
'  <input bind:this={inputEl} placeholder="Type here..." />\n' +
'{/if}\n' +
'<button onclick={revealAndFocus}>Show input</button>'
}</code></pre>

        <h3 style={h3Style}>{isZh ? 'Svelte 5 中的 $effect Rune' : '$effect Rune in Svelte 5'}</h3>
        <pre style={codeBlockStyle}><code>{
'<script>\n' +
'  // $effect replaces onMount + reactive statements for side effects\n' +
'  let userId = $state(1);\n' +
'  let userData = $state(null);\n\n' +
'  $effect(() => {\n' +
'    // Runs on mount and whenever userId changes\n' +
'    let cancelled = false;\n\n' +
'    fetch(`/api/users/${userId}`)\n' +
'      .then(r => r.json())\n' +
'      .then(data => {\n' +
'        if (!cancelled) userData = data;\n' +
'      });\n\n' +
'    // Return cleanup function\n' +
'    return () => { cancelled = true; };\n' +
'  });\n\n' +
'  // $effect.pre runs before DOM updates (like beforeUpdate)\n' +
'  $effect.pre(() => {\n' +
'    console.log("Before DOM update");\n' +
'  });\n' +
'</' + 'script>'
}</code></pre>
      </section>

      {/* Section 6: SvelteKit Routing */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? 'SvelteKit 路由：文件路由、load 函数和表单操作' : 'SvelteKit Routing: File-Based Routing, Load Functions, and Form Actions'}</h2>
        <p style={pStyle}>
          {isZh
            ? 'SvelteKit 使用文件系统路由——src/routes/ 目录中的文件结构决定你的 URL。特殊文件名（+page.svelte、+layout.svelte、+server.ts、+page.ts）定义路由的不同部分。这种约定使路由直观且自文档化。'
            : 'SvelteKit uses filesystem routing — the file structure inside src/routes/ determines your URLs. Special filenames (+page.svelte, +layout.svelte, +server.ts, +page.ts) define different parts of a route. This convention makes routing intuitive and self-documenting.'}
        </p>
        <pre style={codeBlockStyle}><code>{
'src/routes/\n' +
'├── +page.svelte          → /\n' +
'├── +layout.svelte        → root layout (wraps all pages)\n' +
'├── about/\n' +
'│   └── +page.svelte      → /about\n' +
'├── blog/\n' +
'│   ├── +page.svelte      → /blog\n' +
'│   └── [slug]/\n' +
'│       ├── +page.svelte  → /blog/my-post\n' +
'│       └── +page.ts      → load function for /blog/[slug]\n' +
'├── api/\n' +
'│   └── posts/\n' +
'│       └── +server.ts    → GET/POST /api/posts\n' +
'└── (auth)/               → route group (no URL segment)\n' +
'    ├── login/\n' +
'    │   └── +page.svelte  → /login\n' +
'    └── +layout.svelte    → layout for auth pages only'
}</code></pre>

        <h3 style={h3Style}>{isZh ? 'Load 函数：数据获取' : 'Load Functions: Data Fetching'}</h3>
        <pre style={codeBlockStyle}><code>{
'// src/routes/blog/[slug]/+page.ts\n' +
'import type { PageLoad } from "./$types";\n' +
'import { error } from "@sveltejs/kit";\n\n' +
'export const load: PageLoad = async ({ params, fetch }) => {\n' +
'  const res = await fetch(`/api/posts/${params.slug}`);\n\n' +
'  if (!res.ok) {\n' +
'    error(404, { message: "Post not found" });\n' +
'  }\n\n' +
'  const post = await res.json();\n\n' +
'  return {\n' +
'    post,\n' +
'    // Returned object is typed and passed to +page.svelte\n' +
'  };\n' +
'};\n\n' +
'// src/routes/blog/[slug]/+page.svelte\n' +
'<script lang="ts">\n' +
'  import type { PageData } from "./$types";\n' +
'  let { data }: { data: PageData } = $props();\n' +
'</' + 'script>\n\n' +
'<article>\n' +
'  <h1>{data.post.title}</h1>\n' +
'  <div>{@html data.post.content}</div>\n' +
'</article>'
}</code></pre>

        <h3 style={h3Style}>{isZh ? '表单操作：服务端表单处理' : 'Form Actions: Server-Side Form Handling'}</h3>
        <p style={pStyle}>
          {isZh
            ? '表单操作是 SvelteKit 中处理 HTML 表单提交的方式。它们运行在服务器上，提供渐进增强（即使没有 JavaScript 也能工作），并与 use:enhance 结合使用以获得无刷新的 SPA 体验。'
            : 'Form actions are how SvelteKit handles HTML form submissions. They run on the server, provide progressive enhancement (work without JavaScript), and combine with use:enhance for a no-refresh SPA experience.'}
        </p>
        <pre style={codeBlockStyle}><code>{
'// src/routes/login/+page.server.ts\n' +
'import type { Actions } from "./$types";\n' +
'import { fail, redirect } from "@sveltejs/kit";\n\n' +
'export const actions: Actions = {\n' +
'  login: async ({ request, cookies }) => {\n' +
'    const data = await request.formData();\n' +
'    const email = data.get("email");\n' +
'    const password = data.get("password");\n\n' +
'    if (!email || !password) {\n' +
'      return fail(400, { error: "All fields required" });\n' +
'    }\n\n' +
'    // Verify credentials...\n' +
'    const user = await verifyUser(email, password);\n' +
'    if (!user) {\n' +
'      return fail(401, { error: "Invalid credentials" });\n' +
'    }\n\n' +
'    cookies.set("session", user.token, { path: "/" });\n' +
'    redirect(303, "/dashboard");\n' +
'  }\n' +
'};\n\n' +
'// +page.svelte\n' +
'<script>\n' +
'  import { enhance } from "$app/forms";\n' +
'  let { form } = $props(); // contains action return value\n' +
'</' + 'script>\n\n' +
'<form method="POST" action="?/login" use:enhance>\n' +
'  {#if form?.error}\n' +
'    <p style="color: red">{form.error}</p>\n' +
'  {/if}\n' +
'  <input name="email" type="email" required />\n' +
'  <input name="password" type="password" required />\n' +
'  <button type="submit">Log in</button>\n' +
'</form>'
}</code></pre>
      </section>

      {/* Section 7: Transitions and Animations */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? '过渡和动画：Svelte 的视觉超能力' : 'Transitions and Animations: Svelte\'s Visual Superpower'}</h2>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 将过渡和动画作为语言的一等公民。transition: 指令在元素进入或离开 DOM 时（通过 {#if} 块控制）应用动画。内置过渡（fade、fly、slide、scale、blur、draw）涵盖了 80% 的使用场景，对于其余场景，自定义过渡函数很容易编写。'
            : 'Svelte treats transitions and animations as first-class citizens of the language. The transition: directive applies animations when elements enter or leave the DOM (controlled by {#if} blocks). Built-in transitions (fade, fly, slide, scale, blur, draw) cover 80% of use cases, and for the rest, custom transition functions are straightforward to write.'}
        </p>
        <pre style={codeBlockStyle}><code>{
'<script>\n' +
'  import { fade, fly, slide, scale, blur, draw } from "svelte/transition";\n' +
'  import { elasticOut, bounceOut } from "svelte/easing";\n\n' +
'  let visible = $state(true);\n' +
'</' + 'script>\n\n' +
'<button onclick={() => (visible = !visible)}>Toggle</button>\n\n' +
'<!-- Fade in/out -->\n' +
'{#if visible}\n' +
'  <div transition:fade={{ duration: 300 }}>Fade</div>\n' +
'{/if}\n\n' +
'<!-- Fly from below with elastic easing -->\n' +
'{#if visible}\n' +
'  <div\n' +
'    transition:fly={{ y: 50, duration: 400, easing: elasticOut }}\n' +
'  >\n' +
'    Fly up\n' +
'  </div>\n' +
'{/if}\n\n' +
'<!-- Different in/out transitions -->\n' +
'{#if visible}\n' +
'  <div\n' +
'    in:fly={{ x: -100, duration: 300 }}\n' +
'    out:scale={{ duration: 200 }}\n' +
'  >\n' +
'    Asymmetric\n' +
'  </div>\n' +
'{/if}\n\n' +
'<!-- SVG path drawing animation -->\n' +
'{#if visible}\n' +
'  <svg viewBox="0 0 100 100">\n' +
'    <path\n' +
'      transition:draw={{ duration: 1000 }}\n' +
'      d="M 10,50 L 90,50"\n' +
'      stroke="black"\n' +
'      fill="none"\n' +
'    />\n' +
'  </svg>\n' +
'{/if}'
}</code></pre>

        <h3 style={h3Style}>{isZh ? '列表动画：flip 和 animate: 指令' : 'List Animations: flip and the animate: Directive'}</h3>
        <pre style={codeBlockStyle}><code>{
'<script>\n' +
'  import { flip } from "svelte/animate";\n' +
'  import { fade } from "svelte/transition";\n\n' +
'  let items = $state([\n' +
'    { id: 1, text: "Apple" },\n' +
'    { id: 2, text: "Banana" },\n' +
'    { id: 3, text: "Cherry" },\n' +
'  ]);\n\n' +
'  function shuffle() {\n' +
'    items = [...items].sort(() => Math.random() - 0.5);\n' +
'  }\n\n' +
'  function remove(id: number) {\n' +
'    items = items.filter(item => item.id !== id);\n' +
'  }\n' +
'</' + 'script>\n\n' +
'<button onclick={shuffle}>Shuffle</button>\n\n' +
'<ul>\n' +
'  {#each items as item (item.id)}\n' +
'    <!-- flip: smooth position transitions when list reorders -->\n' +
'    <!-- transition:fade: elements fade when added/removed -->\n' +
'    <li\n' +
'      animate:flip={{ duration: 300 }}\n' +
'      transition:fade={{ duration: 200 }}\n' +
'    >\n' +
'      {item.text}\n' +
'      <button onclick={() => remove(item.id)}>Remove</button>\n' +
'    </li>\n' +
'  {/each}\n' +
'</ul>'
}</code></pre>

        <h3 style={h3Style}>{isZh ? 'spring 和 tweened Store：物理动画' : 'spring and tweened Stores: Physics-Based Animation'}</h3>
        <pre style={codeBlockStyle}><code>{
'<script>\n' +
'  import { spring, tweened } from "svelte/motion";\n' +
'  import { cubicOut } from "svelte/easing";\n\n' +
'  // Spring: physics-based, bouncy movement\n' +
'  const coords = spring({ x: 50, y: 50 }, {\n' +
'    stiffness: 0.1,\n' +
'    damping: 0.25,\n' +
'  });\n\n' +
'  // Tweened: smooth interpolated value\n' +
'  const progress = tweened(0, {\n' +
'    duration: 400,\n' +
'    easing: cubicOut,\n' +
'  });\n\n' +
'  function handleMousemove(event: MouseEvent) {\n' +
'    coords.set({ x: event.clientX, y: event.clientY });\n' +
'  }\n' +
'</' + 'script>\n\n' +
'<svelte:window on:mousemove={handleMousemove} />\n\n' +
'<!-- Dot follows cursor with spring physics -->\n' +
'<div\n' +
'  style={"position: fixed; width: 16px; height: 16px;" +\n' +
'    "border-radius: 50%; background: #0ea5e9;" +\n' +
'    "left: " + $coords.x + "px; top: " + $coords.y + "px;" +\n' +
'    "transform: translate(-50%, -50%);"}\n' +
'/>\n\n' +
'<!-- Progress bar -->\n' +
'<progress value={$progress} />\n' +
'<button onclick={() => progress.set(100)}>Load</button>'
}</code></pre>
      </section>

      {/* Section 8: State Management — Stores vs Context */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? 'Store 与 Context API：何时使用哪个' : 'Stores vs Context API: When to Use Which'}</h2>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 提供两种主要的跨组件状态共享机制：Store（模块级单例）和 Context API（组件树作用域值）。理解它们的区别对于设计良好的 Svelte 应用至关重要。'
            : 'Svelte provides two primary mechanisms for sharing state across components: Stores (module-level singletons) and the Context API (component-tree-scoped values). Understanding the difference between them is critical for well-architected Svelte applications.'}
        </p>

        <h3 style={h3Style}>{isZh ? 'Context API：setContext 和 getContext' : 'Context API: setContext and getContext'}</h3>
        <p style={pStyle}>
          {isZh
            ? 'Context 在 onMount 之前（在组件初始化期间）设置，并且只对组件树中调用组件之下的后代可用。它非常适合组件库模式——例如，<Tabs> 组件为其 <Tab> 子组件提供当前活动标签的上下文。与 Store 不同，Context 不是全局的，允许同一组件的多个实例各自拥有独立的状态。'
            : "Context is set before onMount (during component initialization) and is only available to descendants below the calling component in the component tree. It's ideal for component library patterns — for example, a <Tabs> component providing the currently active tab to its <Tab> children. Unlike stores, context is not global, allowing multiple instances of the same component to each have independent state."}
        </p>
        <pre style={codeBlockStyle}><code>{
'<!-- Tabs.svelte - parent sets context -->\n' +
'<script>\n' +
'  import { setContext } from "svelte";\n' +
'  import { writable } from "svelte/store";\n\n' +
'  let activeTab = $state("tab1");\n\n' +
'  // Provide reactive value to all descendants\n' +
'  setContext("tabs", {\n' +
'    activeTab: {\n' +
'      subscribe: (fn: (value: string) => void) => {\n' +
'        // simplified reactive subscription\n' +
'        fn(activeTab);\n' +
'        return () => {};\n' +
'      }\n' +
'    },\n' +
'    setActive: (id: string) => (activeTab = id),\n' +
'  });\n' +
'</' + 'script>\n\n' +
'<div class="tabs"><slot /></div>\n\n' +
'<!-- Tab.svelte - child reads context -->\n' +
'<script>\n' +
'  import { getContext } from "svelte";\n\n' +
'  let { id, label } = $props();\n' +
'  const { activeTab, setActive } = getContext("tabs");\n' +
'</' + 'script>\n\n' +
'<button\n' +
'  class={$activeTab === id ? "active" : ""}\n' +
'  onclick={() => setActive(id)}\n' +
'>\n' +
'  {label}\n' +
'</button>'
}</code></pre>

        <h3 style={h3Style}>{isZh ? '选择指南：Store vs Context vs Props' : 'Decision Guide: Store vs Context vs Props'}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
                <th style={thStyle}>{isZh ? '推荐方案' : 'Recommended'}</th>
                <th style={thStyle}>{isZh ? '原因' : 'Reason'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>{isZh ? '用户认证状态' : 'User auth state'}</td>
                <td style={tdStyle}><span style={badgeBlueStyle}>Store</span></td>
                <td style={tdStyle}>{isZh ? '全局，整个应用共享' : 'Global, shared app-wide'}</td>
              </tr>
              <tr>
                <td style={tdAltStyle}>{isZh ? '父子通信' : 'Parent-child communication'}</td>
                <td style={tdAltStyle}><span style={badgeGreenStyle}>Props</span></td>
                <td style={tdAltStyle}>{isZh ? '直接关系，显式数据流' : 'Direct relationship, explicit flow'}</td>
              </tr>
              <tr>
                <td style={tdStyle}>{isZh ? '组件库内部状态' : 'Component library internal state'}</td>
                <td style={tdStyle}><span style={badgeYellowStyle}>Context</span></td>
                <td style={tdStyle}>{isZh ? '作用域化，多实例安全' : 'Scoped, safe for multiple instances'}</td>
              </tr>
              <tr>
                <td style={tdAltStyle}>{isZh ? '主题/语言偏好' : 'Theme / language preference'}</td>
                <td style={tdAltStyle}><span style={badgeBlueStyle}>Store</span></td>
                <td style={tdAltStyle}>{isZh ? '全局，需要持久化' : 'Global, needs persistence'}</td>
              </tr>
              <tr>
                <td style={tdStyle}>{isZh ? 'SSR 中避免状态污染' : 'Avoid state pollution in SSR'}</td>
                <td style={tdStyle}><span style={badgeYellowStyle}>Context</span></td>
                <td style={tdStyle}>{isZh ? '每个请求独立的状态' : 'Per-request isolated state'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 9: Comparison Table */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? 'Svelte vs React vs Vue vs SolidJS：全面对比' : 'Svelte vs React vs Vue vs SolidJS: Full Comparison'}</h2>
        <p style={pStyle}>
          {isZh
            ? '选择前端框架时，了解每个框架在性能、开发体验、生态系统和适用场景方面的取舍至关重要。以下是 2025 年四个主要框架的详细对比。'
            : 'When choosing a frontend framework, understanding the tradeoffs each makes in performance, developer experience, ecosystem, and use cases is critical. Here is a detailed comparison of the four major frameworks as of 2025.'}
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{isZh ? '维度' : 'Dimension'}</th>
                <th style={{ ...thStyle, background: '#ff3e00' }}>Svelte 5</th>
                <th style={{ ...thStyle, background: '#0070f3' }}>React 19</th>
                <th style={{ ...thStyle, background: '#42b883' }}>Vue 3</th>
                <th style={{ ...thStyle, background: '#2c4f7c' }}>SolidJS 1.x</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{isZh ? '方法' : 'Approach'}</td>
                <td style={tdStyle}>{isZh ? '编译器' : 'Compiler'}</td>
                <td style={tdStyle}>{isZh ? '运行时 + 虚拟 DOM' : 'Runtime + VDOM'}</td>
                <td style={tdStyle}>{isZh ? '运行时 + 虚拟 DOM' : 'Runtime + VDOM'}</td>
                <td style={tdStyle}>{isZh ? '编译器 + 细粒度响应性' : 'Compiler + fine-grained reactivity'}</td>
              </tr>
              <tr>
                <td style={{ ...tdAltStyle, fontWeight: 600 }}>{isZh ? '打包大小（最小 Hello World）' : 'Bundle size (min Hello World)'}</td>
                <td style={tdAltStyle}>~3 KB</td>
                <td style={tdAltStyle}>~45 KB</td>
                <td style={tdAltStyle}>~22 KB</td>
                <td style={tdAltStyle}>~7 KB</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{isZh ? '运行时性能' : 'Runtime performance'}</td>
                <td style={tdStyle}><span style={badgeGreenStyle}>{isZh ? '极快' : 'Excellent'}</span></td>
                <td style={tdStyle}><span style={badgeYellowStyle}>{isZh ? '良好' : 'Good'}</span></td>
                <td style={tdStyle}><span style={badgeYellowStyle}>{isZh ? '良好' : 'Good'}</span></td>
                <td style={tdStyle}><span style={badgeGreenStyle}>{isZh ? '极快' : 'Excellent'}</span></td>
              </tr>
              <tr>
                <td style={{ ...tdAltStyle, fontWeight: 600 }}>{isZh ? '学习曲线' : 'Learning curve'}</td>
                <td style={tdAltStyle}><span style={badgeGreenStyle}>{isZh ? '低' : 'Low'}</span></td>
                <td style={tdAltStyle}><span style={badgeYellowStyle}>{isZh ? '中' : 'Medium'}</span></td>
                <td style={tdAltStyle}><span style={badgeGreenStyle}>{isZh ? '低-中' : 'Low-Medium'}</span></td>
                <td style={tdAltStyle}><span style={badgeYellowStyle}>{isZh ? '中' : 'Medium'}</span></td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{isZh ? '生态系统' : 'Ecosystem'}</td>
                <td style={tdStyle}><span style={badgeYellowStyle}>{isZh ? '成长中' : 'Growing'}</span></td>
                <td style={tdStyle}><span style={badgeGreenStyle}>{isZh ? '最大' : 'Largest'}</span></td>
                <td style={tdStyle}><span style={badgeYellowStyle}>{isZh ? '成熟' : 'Mature'}</span></td>
                <td style={tdStyle}><span style={badgeYellowStyle}>{isZh ? '小但活跃' : 'Small but active'}</span></td>
              </tr>
              <tr>
                <td style={{ ...tdAltStyle, fontWeight: 600 }}>{isZh ? 'TypeScript 支持' : 'TypeScript support'}</td>
                <td style={tdAltStyle}><span style={badgeGreenStyle}>{isZh ? '一流' : 'First-class'}</span></td>
                <td style={tdAltStyle}><span style={badgeGreenStyle}>{isZh ? '一流' : 'First-class'}</span></td>
                <td style={tdAltStyle}><span style={badgeGreenStyle}>{isZh ? '一流' : 'First-class'}</span></td>
                <td style={tdAltStyle}><span style={badgeGreenStyle}>{isZh ? '一流' : 'First-class'}</span></td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{isZh ? '全栈框架' : 'Full-stack framework'}</td>
                <td style={tdStyle}>SvelteKit</td>
                <td style={tdStyle}>Next.js / Remix</td>
                <td style={tdStyle}>Nuxt 3</td>
                <td style={tdStyle}>SolidStart</td>
              </tr>
              <tr>
                <td style={{ ...tdAltStyle, fontWeight: 600 }}>{isZh ? 'SSR 支持' : 'SSR support'}</td>
                <td style={tdAltStyle}><span style={badgeGreenStyle}>{isZh ? '内置（SvelteKit）' : 'Built-in (SvelteKit)'}</span></td>
                <td style={tdAltStyle}><span style={badgeGreenStyle}>{isZh ? '内置（Next.js）' : 'Built-in (Next.js)'}</span></td>
                <td style={tdAltStyle}><span style={badgeGreenStyle}>{isZh ? '内置（Nuxt）' : 'Built-in (Nuxt)'}</span></td>
                <td style={tdAltStyle}><span style={badgeYellowStyle}>{isZh ? '支持（SolidStart）' : 'Supported (SolidStart)'}</span></td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{isZh ? '动画系统' : 'Animation system'}</td>
                <td style={tdStyle}><span style={badgeGreenStyle}>{isZh ? '内置' : 'Built-in'}</span></td>
                <td style={tdStyle}>{isZh ? '第三方（Framer Motion）' : 'Third-party (Framer Motion)'}</td>
                <td style={tdStyle}>{isZh ? '内置 + 第三方' : 'Built-in + third-party'}</td>
                <td style={tdStyle}>{isZh ? '第三方' : 'Third-party'}</td>
              </tr>
              <tr>
                <td style={{ ...tdAltStyle, fontWeight: 600 }}>{isZh ? '最适合' : 'Best for'}</td>
                <td style={tdAltStyle}>{isZh ? '性能关键型应用、内容站点' : 'Performance-critical apps, content sites'}</td>
                <td style={tdAltStyle}>{isZh ? '大型企业应用、复杂 SPA' : 'Large enterprise, complex SPAs'}</td>
                <td style={tdAltStyle}>{isZh ? '中型应用、渐进迁移' : 'Mid-size apps, progressive adoption'}</td>
                <td style={tdAltStyle}>{isZh ? '对性能有极端要求的应用' : 'Apps with extreme performance needs'}</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{isZh ? 'npm 周下载量（2025）' : 'Weekly npm downloads (2025)'}</td>
                <td style={tdStyle}>~1M</td>
                <td style={tdStyle}>~30M</td>
                <td style={tdStyle}>~5M</td>
                <td style={tdStyle}>~300K</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 在 JS 框架基准测试中通常排名靠前，与 SolidJS 一起位居性能榜首。React 凭借其庞大的生态系统和就业市场主导地位保持领先。Vue 在亚洲市场特别受欢迎，拥有出色的中文文档。SolidJS 拥有最接近 Svelte 的性能数字，但生态系统更小。'
            : 'Svelte consistently ranks near the top of JS framework benchmarks, alongside SolidJS at the performance apex. React maintains dominance due to its massive ecosystem and job market presence. Vue is particularly popular in Asian markets with excellent Chinese documentation. SolidJS has the closest performance numbers to Svelte but with a smaller ecosystem.'}
        </p>
      </section>

      {/* Section 10: FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? '常见问题解答' : 'Frequently Asked Questions'}</h2>

        <div style={faqItemStyle}>
          <h3 style={{ ...h3Style, marginTop: 0 }}>
            {isZh ? 'Svelte 5 Runes 是什么，与 Svelte 4 响应性有何不同？' : 'What are Svelte 5 Runes and how do they differ from Svelte 4 reactivity?'}
          </h3>
          <p style={pStyle}>
            {isZh
              ? 'Svelte 5 Runes 是特殊的编译器指令（$state、$derived、$effect、$props、$bindable），使响应性更加明确。在 Svelte 4 中，组件中的任何顶级变量都是自动响应式的。在 Svelte 5 中，你用 $state() 显式声明响应式状态，用 $derived() 声明派生值，用 $effect() 声明副作用。Runes 可以在组件内外使用（在 .svelte.js/.svelte.ts 文件中），使它们在组件间共享逻辑时更加通用。'
              : 'Svelte 5 Runes are special compiler instructions ($state, $derived, $effect, $props, $bindable) that make reactivity explicit. In Svelte 4, any top-level variable in a component was automatically reactive. In Svelte 5, you explicitly declare reactive state with $state(), derived values with $derived(), and side effects with $effect(). Runes work inside and outside components (in .svelte.js/.svelte.ts files), making them more versatile for sharing logic across components.'}
          </p>
        </div>

        <div style={faqItemStyle}>
          <h3 style={h3Style}>
            {isZh ? 'SvelteKit 与普通 Svelte 有什么区别？' : 'How does SvelteKit differ from plain Svelte?'}
          </h3>
          <p style={pStyle}>
            {isZh
              ? 'Svelte 是组件编译器——处理 UI 层。SvelteKit 是构建在 Svelte 之上的全栈应用框架，类似于 React 的 Next.js。SvelteKit 增加了文件路由、服务端渲染（SSR）、静态站点生成（SSG）、API 路由（+server.ts 文件）、用于数据获取的 load 函数、用于服务端表单处理的表单操作，以及用于部署到不同平台的适配器（Vercel、Netlify、Node、Cloudflare）。对于超出单页原型的任何项目，SvelteKit 是构建 Svelte 应用的推荐方式。'
              : 'Svelte is a component compiler — it handles the UI layer. SvelteKit is the full-stack application framework built on top of Svelte, analogous to Next.js for React. SvelteKit adds file-based routing, server-side rendering (SSR), static site generation (SSG), API routes (+server.ts files), load functions for data fetching, form actions for server-side form handling, and adapters for deploying to different platforms (Vercel, Netlify, Node, Cloudflare). For anything beyond a single-page prototype, SvelteKit is the recommended way to build Svelte applications.'}
          </p>
        </div>

        <div style={faqItemStyle}>
          <h3 style={h3Style}>
            {isZh ? 'Svelte 支持 TypeScript 吗？' : 'Does Svelte support TypeScript?'}
          </h3>
          <p style={pStyle}>
            {isZh
              ? '是的，Svelte 具有一流的 TypeScript 支持。在 script 标签中添加 lang="ts"：<script lang="ts">。组件 props 可以用 TypeScript 接口进行类型化。SvelteKit 在 .svelte-kit/types 中自动为你的路由生成类型，因此 load 函数返回类型、页面数据类型和路由参数都完全类型化。Svelte 5 中的 $props() rune 为组件接口提供了出色的 TypeScript 人体工程学。'
              : 'Yes, Svelte has first-class TypeScript support. Add lang="ts" to the script tag: <script lang="ts">. Component props can be typed with TypeScript interfaces. SvelteKit generates types for your routes automatically in .svelte-kit/types, so load function return types, page data types, and route params are all fully typed. The $props() rune in Svelte 5 provides excellent TypeScript ergonomics for component interfaces.'}
          </p>
        </div>

        <div style={faqItemStyle}>
          <h3 style={h3Style}>
            {isZh ? 'Svelte 适合大型应用吗？' : 'Is Svelte good for large applications?'}
          </h3>
          <p style={pStyle}>
            {isZh
              ? '与 SvelteKit 配合使用时，Svelte 对大型应用扩展良好。主要考虑因素是：生态系统比 React 小（第三方组件库较少），团队需要 Svelte 特定知识，以及 Svelte 的编译器方法意味着随着应用增长，JavaScript 包大小优势会减弱（每个组件的编译输出比 React 的 JSX 大）。然而，SvelteKit 的代码分割、路由级 SSR 和 Svelte Store 的简单性使大型应用保持可管理。《纽约时报》、Apple 和 GoDaddy 等公司在生产环境中使用 Svelte。'
              : "Svelte scales well for large applications when used with SvelteKit. The main considerations are: the ecosystem is smaller than React (fewer third-party component libraries), the team needs Svelte-specific knowledge, and Svelte's compiler approach means JavaScript bundle size advantages diminish as your application grows (the compiled output per component is larger than React's JSX). However, SvelteKit's code splitting, route-level SSR, and the simplicity of Svelte stores keep large applications manageable. Companies like The New York Times, Apple, and GoDaddy use Svelte in production."}
          </p>
        </div>

        <div style={faqItemStyle}>
          <h3 style={h3Style}>
            {isZh ? 'SvelteKit 如何处理服务端渲染？' : 'How does SvelteKit handle server-side rendering?'}
          </h3>
          <p style={pStyle}>
            {isZh
              ? 'SvelteKit 自动处理 SSR。默认情况下，每个页面在首次加载时服务端渲染，然后在客户端进行水合。你可以通过页面选项控制每个页面的渲染策略：export const ssr = false 禁用 SSR（SPA 模式），export const prerender = true 在构建时启用静态生成，export const csr = false 完全禁用客户端 JavaScript。Load 函数在服务器上运行并将数据传递给页面组件。这种灵活性使 SvelteKit 适用于内容站点、电商、仪表板等各种场景。'
              : 'SvelteKit handles SSR automatically. By default, every page is server-rendered on first load and then hydrated on the client. You control rendering strategy per-page with page options: export const ssr = false disables SSR (SPA mode), export const prerender = true enables static generation at build time, export const csr = false disables client-side JavaScript entirely. Load functions run on the server and pass data to the page component. This flexibility makes SvelteKit suitable for content sites, e-commerce, dashboards, and everything in between.'}
          </p>
        </div>

        <div style={faqItemStyle}>
          <h3 style={h3Style}>
            {isZh ? 'Svelte Store 和 Context API 有什么区别？' : 'What is the difference between Svelte stores and the Context API?'}
          </h3>
          <p style={pStyle}>
            {isZh
              ? 'Svelte Store 是模块级单例——创建一次并在所有导入它们的组件间共享。它们非常适合应用范围的状态（用户认证、主题、购物车）。Context API（setContext/getContext）在组件树中共享值，而不需要导入模块，使其适合不应该是全局的组件库状态（例如，Form 组件为其 Input 子组件提供上下文）。对于全局状态使用 Store，对于组件树作用域状态使用 Context。'
              : "Svelte stores are module-level singletons — they are created once and shared across all components that import them. They are ideal for application-wide state (user authentication, theme, cart). The Context API (setContext/getContext) shares values within a component tree without importing a module, making it suitable for component-library state that should not be global (e.g., a Form component providing context to its Input children). Use stores for global state, context for component-tree-scoped state."}
          </p>
        </div>

        <div style={faqItemStyle}>
          <h3 style={h3Style}>
            {isZh ? 'Svelte 过渡是如何工作的？' : 'How do Svelte transitions work?'}
          </h3>
          <p style={pStyle}>
            {isZh
              ? 'Svelte 过渡使用 transition:、in: 和 out: 指令应用于 DOM 元素。内置过渡包括 fade、fly、slide、scale、blur 和 draw（用于 SVG）。当元素进入或离开 DOM 时（由 {#if} 块控制）激活。自定义过渡是返回具有 delay、duration、easing、css 和 tick 属性对象的函数。crossfade 过渡处理列表项之间的共享元素过渡。默认情况下，所有过渡基于 CSS，在主线程之外运行以实现流畅的 60fps 动画。'
              : 'Svelte transitions are applied with the transition:, in:, and out: directives on DOM elements. Built-in transitions include fade, fly, slide, scale, blur, and draw (for SVG). They activate when an element enters or leaves the DOM (controlled by {#if} blocks). Custom transitions are functions that return an object with delay, duration, easing, css, and tick properties. The crossfade transition handles shared element transitions between list items. All transitions are CSS-based by default, running off the main thread for smooth 60fps animations.'}
          </p>
        </div>

        <div style={{ ...faqItemStyle, borderBottom: 'none' }}>
          <h3 style={h3Style}>
            {isZh ? '新项目应该使用 Svelte 4 还是 Svelte 5？' : 'Should I use Svelte 4 or Svelte 5 for a new project?'}
          </h3>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            {isZh
              ? '对于 2025 年及以后启动的新项目，使用 Svelte 5。Svelte 5 已稳定（2024 年 10 月发布），提供了显著改进：Runes 提供更明确和强大的响应性，snippets 替代 slots 用于内容投影，响应性模型更可预测。Svelte 5 向后兼容——Svelte 4 组件语法仍然有效。官方 SvelteKit 文档现在默认使用 Svelte 5 语法。从 Svelte 4 到 5 的迁移是渐进式的，官方迁移指南和 codemod 自动化了大多数更改。'
              : 'Use Svelte 5 for new projects started in 2025 and beyond. Svelte 5 is stable (released October 2024) and offers significant improvements: Runes provide more explicit and powerful reactivity, snippets replace slots for content projection, and the reactivity model is more predictable. Svelte 5 is backward compatible — Svelte 4 component syntax still works. The official SvelteKit documentation now defaults to Svelte 5 syntax. The migration from Svelte 4 to 5 is incremental and the official migration guide and codemods automate most changes.'}
          </p>
        </div>
      </section>

      {/* Conclusion */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{isZh ? '总结：为什么选择 Svelte？' : 'Conclusion: Why Choose Svelte?'}</h2>
        <p style={pStyle}>
          {isZh
            ? 'Svelte 代表了前端开发的一个根本性转变：从框架运行时到编译器。通过在构建时将组件编译为优化的原生 JavaScript，Svelte 实现了其他框架在运行时难以匹敌的性能。SvelteKit 构建在这个坚实基础之上，提供了构建现代全栈 Web 应用所需的一切。'
            : 'Svelte represents a fundamental shift in frontend development: from framework runtime to compiler. By compiling components to optimized vanilla JavaScript at build time, Svelte achieves performance that runtime frameworks struggle to match. SvelteKit builds on this foundation to provide everything needed for modern full-stack web applications.'}
        </p>
        <p style={pStyle}>
          {isZh
            ? '无论你是在构建高性能内容站点、交互式仪表板还是完整的 Web 应用程序，Svelte 的简洁语法、内置动画系统和 SvelteKit 的服务端功能都提供了愉快的开发体验和出色的最终用户性能。Svelte 5 的 Runes 系统在不牺牲 Svelte 以简单著称的情况下进一步改进了响应性模型。'
            : "Whether you are building a high-performance content site, an interactive dashboard, or a full web application, Svelte's clean syntax, built-in animation system, and SvelteKit's server capabilities provide a delightful developer experience with excellent end-user performance. Svelte 5's Runes system further improves the reactivity model without sacrificing the simplicity that Svelte is known for."}
        </p>
        <p style={pStyle}>
          {isZh
            ? '随着 Svelte 5 的稳定和 SvelteKit 生态系统的持续成熟，现在是学习和采用 Svelte 的绝佳时机——无论你是构建下一个 SaaS 产品、开源工具还是个人项目。'
            : 'With Svelte 5 stable and the SvelteKit ecosystem continuing to mature, there has never been a better time to learn and adopt Svelte — whether you are building the next SaaS product, an open-source tool, or a personal project.'}
        </p>
      </section>
    </article>
  );
}
