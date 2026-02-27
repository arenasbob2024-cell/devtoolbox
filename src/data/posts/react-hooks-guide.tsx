'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'React Hooks Complete Guide: useState, useEffect, useCallback, useMemo, Custom Hooks and More',
    description: 'Master every React Hook with real code examples, performance tips, anti-patterns to avoid, and practical custom hooks for data fetching, debouncing, local storage, and forms.',

    intro: 'React Hooks, introduced in React 16.8, fundamentally changed how we write React components. Instead of class components with lifecycle methods, we now have a composable, functional approach to managing state, side effects, context, and more. This comprehensive guide covers every built-in hook, custom hook patterns, React 18 concurrent hooks, and practical patterns used in production applications.',

    tldr_1: 'Hooks are functions that let you use React features in functional components.',
    tldr_2: 'Rules of Hooks: only call at top level, only call from React functions.',
    tldr_3: 'useState for local state, useEffect for side effects, useRef for mutable values.',
    tldr_4: 'useCallback and useMemo optimize performance by memoizing values and functions.',
    tldr_5: 'Custom hooks extract and share stateful logic between components without adding component hierarchy.',

    kt_1: 'Never call hooks inside loops, conditions, or nested functions.',
    kt_2: 'useEffect cleanup functions prevent memory leaks and stale event listeners.',
    kt_3: 'Stale closures in useEffect are the most common React bug — always declare dependencies correctly.',
    kt_4: 'useCallback and useMemo only help when passing to memoized children or in expensive computations.',
    kt_5: 'useReducer is better than multiple useState calls for complex, related state.',
    kt_6: 'Custom hooks are just functions that call other hooks — test them independently.',
    kt_7: 'React 18 useTransition and useDeferredValue enable non-blocking UI updates.',

    rulesTitle: 'Rules of Hooks',
    rulesDesc: 'React enforces two critical rules for hooks. Violating them causes bugs that are hard to diagnose. The ESLint plugin eslint-plugin-react-hooks enforces these rules automatically.',
    rule1: 'Only call hooks at the top level — never inside loops, conditionals, or nested functions.',
    rule2: 'Only call hooks from React function components or custom hooks — not from regular JavaScript functions.',
    rulesWhyTitle: 'Why These Rules Exist',
    rulesWhyDesc: "React relies on the order in which hooks are called to correctly associate state with the component instance. If you call a hook conditionally, the order can change between renders, breaking React's internal state tracking.",

    useStateTitle: 'useState: Managing Local State',
    useStateDesc: 'useState is the most fundamental hook. It returns a stateful value and a function to update it. Every time you call the setter, React re-renders the component with the new state.',
    useStateBasicTitle: 'Basic Usage',
    useStateFuncTitle: 'Functional Updates',
    useStateFuncDesc: 'When new state depends on the previous state, use the functional update form. This guarantees you are working with the most recent state, avoiding bugs in concurrent scenarios.',
    useStateLazyTitle: 'Lazy Initialization',
    useStateLazyDesc: 'If computing the initial state is expensive, pass a function to useState. The function runs only on the first render, not on every re-render.',
    useStateObjectTitle: 'Object State — Always Spread',
    useStateObjectDesc: 'useState does not merge objects like this.setState did in class components. You must spread the existing state manually or you will lose other properties.',

    useEffectTitle: 'useEffect: Handling Side Effects',
    useEffectDesc: 'useEffect runs after every render by default. It handles side effects: API calls, subscriptions, DOM manipulation, timers, and anything that interacts with the outside world.',
    useEffectDepTitle: 'Dependency Array',
    useEffectDepDesc: 'The second argument controls when the effect runs. An empty array means "run once after mount." An array with values means "run when those values change." Omitting the array means "run after every render."',
    useEffectCleanupTitle: 'Cleanup Functions',
    useEffectCleanupDesc: 'Return a function from useEffect to clean up subscriptions, timers, or event listeners. React calls the cleanup before re-running the effect and when the component unmounts.',
    useEffectStaleTitle: 'Stale Closures — The #1 Pitfall',
    useEffectStaleDesc: "A stale closure occurs when an effect captures an outdated value. The effect's callback is created during render and closes over the values at that time. If dependencies are missing, the effect never sees updated values.",

    useRefTitle: 'useRef: DOM Refs and Mutable Values',
    useRefDesc: 'useRef returns a mutable object with a .current property. It persists across renders without triggering re-renders — unlike state. Use it for DOM references or any mutable value you need to track without causing re-renders.',
    useRefDomTitle: 'DOM References',
    useRefMutableTitle: 'Mutable Values Without Re-render',
    useRefMutableDesc: 'Storing a value in useRef does not cause re-renders. Use it for interval IDs, previous values, or any tracking variable.',
    forwardRefTitle: 'forwardRef: Exposing Refs to Parents',
    forwardRefDesc: 'By default, ref props are not passed to child components. Use forwardRef to expose a DOM node or component API to the parent.',

    useCallbackTitle: 'useCallback: Memoizing Functions',
    useCallbackDesc: 'useCallback returns a memoized version of a callback function. The memoized function only changes when one of the dependencies changes. This is critical when passing callbacks to deeply nested or memoized child components.',
    useCallbackWhenTitle: 'When to Use useCallback',
    useCallbackWhenDesc: 'useCallback has a cost: it adds complexity and the memoization computation itself. Only use it when the callback is passed to a React.memo-wrapped child or is listed as a useEffect dependency.',

    useMemoTitle: 'useMemo: Memoizing Computed Values',
    useMemoDesc: 'useMemo memoizes the result of a computation and only recomputes it when dependencies change. Use it for expensive calculations or when creating objects/arrays that are passed as props to memoized children.',
    useMemoWhenTitle: 'When useMemo Helps',
    useMemoWhenDesc: 'useMemo is not free — it has overhead. Profile first. Use it for genuinely expensive calculations (filtering thousands of items, complex transformations) or to maintain referential stability for objects/arrays used as effect dependencies.',

    useContextTitle: 'useContext: Consuming Context',
    useContextDesc: 'useContext subscribes to React context and returns its current value. Every component that calls useContext re-renders whenever the context value changes. Compose context with custom hooks for a clean API.',
    useContextPatternTitle: 'Context + Custom Hook Pattern',

    useReducerTitle: 'useReducer: Complex State Management',
    useReducerDesc: 'useReducer is a useState alternative for complex state logic. It takes a reducer function and an initial state, returning the current state and a dispatch function. It is the local equivalent of Redux-style state management.',
    useReducerWhenTitle: 'When to Use useReducer',
    useReducerWhen1: 'State has multiple sub-values that change together',
    useReducerWhen2: 'Next state depends on previous state in complex ways',
    useReducerWhen3: 'State transitions have names (action types) that make code readable',
    useReducerWhen4: 'Testing: reducers are pure functions — easy to unit test',

    customHooksTitle: 'Custom Hooks: Extracting Reusable Logic',
    customHooksDesc: 'Custom hooks are JavaScript functions whose name starts with "use" and that may call other hooks. They are the primary mechanism for sharing stateful logic between components without adding component layers (no render props or HOCs needed).',
    customHooksFetchTitle: 'useFetch: Data Fetching Hook',
    customHooksDebounceTitle: 'useDebounce: Debounce Hook',
    customHooksLocalStorageTitle: 'useLocalStorage: Persistent State Hook',
    customHooksFormTitle: 'useForm: Form State Hook',

    useTransitionTitle: 'useTransition and useDeferredValue (React 18)',
    useTransitionDesc: 'React 18 introduced concurrent rendering. useTransition marks state updates as non-urgent, letting React interrupt them to handle more urgent updates. useDeferredValue defers re-rendering a part of the UI.',
    useTransitionWhenTitle: 'When to Use Concurrent Hooks',
    useTransition_when1: 'useTransition: search-as-you-type, tab switching, large list filtering',
    useTransition_when2: 'useDeferredValue: when you cannot modify the state update that triggers re-renders',

    useIdTitle: 'useId, useLayoutEffect, useImperativeHandle',
    useIdDesc: 'useId generates unique IDs that are stable across server and client, solving hydration mismatches. Perfect for accessibility attributes like htmlFor/id pairs.',
    useLayoutEffectDesc: 'useLayoutEffect fires synchronously after DOM mutations but before the browser paints. Use it for measuring DOM elements or making DOM changes that need to happen before the user sees the UI.',
    useLayoutEffectWarning: 'Prefer useEffect over useLayoutEffect. useLayoutEffect blocks the browser from painting, which can hurt performance. Only use it when you need to prevent visual flicker.',
    useImperativeHandleDesc: 'useImperativeHandle customizes the instance value exposed to parents when using ref. It works with forwardRef to expose a specific API instead of the raw DOM node.',

    comparisonTitle: 'React Hooks vs Class Lifecycle Methods',
    comparisonDesc: "Understanding the mapping between hooks and class lifecycle methods helps when migrating existing code or understanding React's mental model.",

    antiPatternsTitle: 'Common Anti-Patterns to Avoid',
    antiPattern1Title: 'Missing Dependencies in useEffect',
    antiPattern1Desc: 'Always include all reactive values used inside effects in the dependency array. The ESLint rule react-hooks/exhaustive-deps catches these mistakes.',
    antiPattern2Title: 'Object/Array in Dependency Array',
    antiPattern2Desc: 'Objects and arrays are compared by reference. Creating them inline in JSX creates a new reference every render, causing infinite effect loops.',
    antiPattern3Title: 'Overusing useCallback and useMemo',
    antiPattern3Desc: 'Wrapping everything in useCallback and useMemo adds complexity without benefit if children are not memoized. Profile first, then optimize.',
    antiPattern4Title: 'State That Can Be Derived',
    antiPattern4Desc: 'Do not store derived values in state. Compute them during render. Derived state causes synchronization bugs.',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between useEffect and useLayoutEffect?',
    faq1a: 'useEffect runs asynchronously after the browser has painted the screen. useLayoutEffect runs synchronously after DOM mutations but before painting. Use useLayoutEffect only when you need to prevent visual flicker, such as measuring DOM elements and adjusting layout. For data fetching, subscriptions, and most side effects, useEffect is the correct choice.',
    faq2q: 'When should I use useReducer instead of useState?',
    faq2a: 'Use useReducer when: you have multiple related state values that change together, the next state depends on the previous state in complex ways, you want to name state transitions (action types) for readability, or you want to test state logic independently. useState is sufficient for simple, independent values.',
    faq3q: 'Why does my useEffect run twice in development?',
    faq3a: 'In React 18 Strict Mode, effects are intentionally mounted, unmounted, and remounted to detect side effects that are not properly cleaned up. This only happens in development, not in production. It helps you find bugs like missing cleanup functions or subscriptions that leak.',
    faq4q: 'How do I fetch data on component mount with hooks?',
    faq4a: 'Use useEffect with an empty dependency array to run once after mount. Create an async function inside the effect and call it immediately. Always handle cleanup with an AbortController to cancel requests if the component unmounts before the request completes. Consider libraries like SWR or React Query for production data fetching.',
    faq5q: 'What causes infinite re-render loops with useEffect?',
    faq5a: 'Infinite loops occur when an effect updates state that is listed as a dependency of the same effect. Another common cause is including object or array literals in the dependency array — they create new references every render. Fix by stabilizing references with useRef, useMemo, or useCallback, or by restructuring the effect.',
    faq6q: 'Can I call hooks conditionally?',
    faq6a: 'No. React requires hooks to be called in the same order on every render. You cannot call hooks inside if statements, loops, or nested functions. If you want conditional behavior, put the condition inside the hook: call useEffect unconditionally but return early inside the effect body if a condition is not met.',
    faq7q: 'What is the difference between useCallback and useMemo?',
    faq7a: 'useCallback(fn, deps) memoizes a function and returns the same function reference until dependencies change. useMemo(() => value, deps) memoizes the return value of a function. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Use useCallback for functions, useMemo for computed values.',
    faq8q: 'How do custom hooks differ from regular functions?',
    faq8a: 'Custom hooks can call other hooks (useState, useEffect, etc.) — regular functions cannot. By convention, custom hooks start with "use" so React and ESLint can enforce the Rules of Hooks. Custom hooks enable you to share stateful logic between components without adding component hierarchy (no render props or HOCs).',
  },
  zh: {
    title: 'React Hooks 完整指南：useState、useEffect、useCallback、useMemo、自定义 Hooks 详解',
    description: '通过真实代码示例、性能技巧、反模式规避和实用自定义 Hooks（数据请求、防抖、本地存储、表单）全面掌握每个 React Hook。',

    intro: 'React Hooks 于 React 16.8 引入，从根本上改变了我们编写 React 组件的方式。我们不再需要使用带有生命周期方法的类组件，而是有了一种可组合的、函数式的方式来管理状态、副作用、上下文等。本指南涵盖每个内置 Hook、自定义 Hook 模式、React 18 并发 Hooks 以及生产应用中使用的实用模式。',

    tldr_1: 'Hooks 是让你在函数组件中使用 React 特性的函数。',
    tldr_2: 'Hooks 规则：只在顶层调用，只在 React 函数中调用。',
    tldr_3: 'useState 管理本地状态，useEffect 处理副作用，useRef 用于可变值。',
    tldr_4: 'useCallback 和 useMemo 通过记忆化值和函数来优化性能。',
    tldr_5: '自定义 Hooks 在组件之间提取和共享有状态逻辑，无需添加组件层次结构。',

    kt_1: '绝不在循环、条件或嵌套函数内调用 Hooks。',
    kt_2: 'useEffect 的清理函数可防止内存泄漏和过时的事件监听器。',
    kt_3: 'useEffect 中的过时闭包是最常见的 React 错误——始终正确声明依赖项。',
    kt_4: 'useCallback 和 useMemo 仅在传递给记忆化子组件或昂贵计算时才有帮助。',
    kt_5: '对于复杂的相关状态，useReducer 比多个 useState 调用更好。',
    kt_6: '自定义 Hooks 只是调用其他 Hooks 的函数——可以独立测试它们。',
    kt_7: 'React 18 的 useTransition 和 useDeferredValue 支持非阻塞 UI 更新。',

    rulesTitle: 'Hooks 规则',
    rulesDesc: 'React 强制执行两条关键规则。违反这些规则会导致难以诊断的错误。ESLint 插件 eslint-plugin-react-hooks 会自动强制执行这些规则。',
    rule1: '只在顶层调用 Hooks——绝不在循环、条件或嵌套函数内调用。',
    rule2: '只从 React 函数组件或自定义 Hooks 调用 Hooks——不从常规 JavaScript 函数调用。',
    rulesWhyTitle: '为什么存在这些规则',
    rulesWhyDesc: 'React 依靠调用 Hooks 的顺序来正确地将状态与组件实例关联。如果你有条件地调用 Hook，顺序可能在渲染之间改变，破坏 React 的内部状态跟踪。',

    useStateTitle: 'useState：管理本地状态',
    useStateDesc: 'useState 是最基础的 Hook。它返回一个有状态的值和一个更新它的函数。每次调用 setter 时，React 都会用新状态重新渲染组件。',
    useStateBasicTitle: '基本用法',
    useStateFuncTitle: '函数式更新',
    useStateFuncDesc: '当新状态依赖于前一个状态时，使用函数式更新形式。这保证你使用的是最新状态，避免并发场景中的错误。',
    useStateLazyTitle: '惰性初始化',
    useStateLazyDesc: '如果计算初始状态很耗时，将函数传递给 useState。该函数只在第一次渲染时运行，而不是每次重新渲染。',
    useStateObjectTitle: '对象状态——始终展开',
    useStateObjectDesc: 'useState 不像类组件中的 this.setState 那样合并对象。你必须手动展开现有状态，否则会丢失其他属性。',

    useEffectTitle: 'useEffect：处理副作用',
    useEffectDesc: 'useEffect 默认在每次渲染后运行。它处理副作用：API 调用、订阅、DOM 操作、计时器以及任何与外部世界交互的内容。',
    useEffectDepTitle: '依赖数组',
    useEffectDepDesc: '第二个参数控制 effect 何时运行。空数组表示"挂载后运行一次"。带有值的数组表示"当这些值改变时运行"。省略数组表示"每次渲染后运行"。',
    useEffectCleanupTitle: '清理函数',
    useEffectCleanupDesc: '从 useEffect 返回一个函数来清理订阅、计时器或事件监听器。React 在重新运行 effect 之前和组件卸载时调用清理函数。',
    useEffectStaleTitle: '过时闭包——最大陷阱',
    useEffectStaleDesc: '过时闭包发生在 effect 捕获了过时值的情况下。effect 的回调在渲染期间创建，并关闭当时的值。如果缺少依赖项，effect 将永远看不到更新的值。',

    useRefTitle: 'useRef：DOM 引用和可变值',
    useRefDesc: 'useRef 返回一个带有 .current 属性的可变对象。它在渲染之间持久存在而不触发重新渲染——与状态不同。用于 DOM 引用或任何需要跟踪而不引起重新渲染的可变值。',
    useRefDomTitle: 'DOM 引用',
    useRefMutableTitle: '不触发重渲染的可变值',
    useRefMutableDesc: '在 useRef 中存储值不会导致重新渲染。用于间隔 ID、前一个值或任何跟踪变量。',
    forwardRefTitle: 'forwardRef：向父级暴露 Refs',
    forwardRefDesc: '默认情况下，ref 属性不传递给子组件。使用 forwardRef 向父级暴露 DOM 节点或组件 API。',

    useCallbackTitle: 'useCallback：记忆化函数',
    useCallbackDesc: 'useCallback 返回回调函数的记忆化版本。记忆化函数只在依赖项之一改变时才会改变。这在将回调传递给深度嵌套或记忆化子组件时至关重要。',
    useCallbackWhenTitle: '何时使用 useCallback',
    useCallbackWhenDesc: 'useCallback 有成本：它增加复杂性和记忆化计算本身。只在回调传递给 React.memo 包装的子组件或列为 useEffect 依赖项时使用。',

    useMemoTitle: 'useMemo：记忆化计算值',
    useMemoDesc: 'useMemo 记忆化计算结果，只在依赖项改变时重新计算。用于昂贵的计算，或创建作为 props 传递给记忆化子组件的对象/数组。',
    useMemoWhenTitle: 'useMemo 何时有帮助',
    useMemoWhenDesc: 'useMemo 不是免费的——它有开销。先做性能分析。用于真正昂贵的计算（过滤数千个项目、复杂转换）或保持用作 effect 依赖项的对象/数组的引用稳定性。',

    useContextTitle: 'useContext：消费 Context',
    useContextDesc: 'useContext 订阅 React context 并返回其当前值。每个调用 useContext 的组件在 context 值改变时都会重新渲染。将 context 与自定义 Hooks 组合以获得简洁的 API。',
    useContextPatternTitle: 'Context + 自定义 Hook 模式',

    useReducerTitle: 'useReducer：复杂状态管理',
    useReducerDesc: 'useReducer 是复杂状态逻辑的 useState 替代方案。它接受 reducer 函数和初始状态，返回当前状态和 dispatch 函数。它是 Redux 风格状态管理的本地等价物。',
    useReducerWhenTitle: '何时使用 useReducer',
    useReducerWhen1: '状态有多个一起改变的子值',
    useReducerWhen2: '下一个状态以复杂方式依赖于前一个状态',
    useReducerWhen3: '状态转换有名称（action 类型），使代码可读',
    useReducerWhen4: '测试：reducer 是纯函数——易于单元测试',

    customHooksTitle: '自定义 Hooks：提取可重用逻辑',
    customHooksDesc: '自定义 Hooks 是名称以 "use" 开头且可以调用其他 Hooks 的 JavaScript 函数。它们是在组件之间共享有状态逻辑的主要机制，无需添加组件层（无需 render props 或 HOC）。',
    customHooksFetchTitle: 'useFetch：数据请求 Hook',
    customHooksDebounceTitle: 'useDebounce：防抖 Hook',
    customHooksLocalStorageTitle: 'useLocalStorage：持久状态 Hook',
    customHooksFormTitle: 'useForm：表单状态 Hook',

    useTransitionTitle: 'useTransition 和 useDeferredValue（React 18）',
    useTransitionDesc: 'React 18 引入了并发渲染。useTransition 将状态更新标记为非紧急的，让 React 可以中断它们来处理更紧急的更新。useDeferredValue 延迟 UI 某部分的重新渲染。',
    useTransitionWhenTitle: '何时使用并发 Hooks',
    useTransition_when1: 'useTransition：输入时搜索、标签切换、大列表过滤',
    useTransition_when2: 'useDeferredValue：当你无法修改触发重渲染的状态更新时',

    useIdTitle: 'useId、useLayoutEffect、useImperativeHandle',
    useIdDesc: 'useId 生成在服务器和客户端之间稳定的唯一 ID，解决水合不匹配问题。非常适合 htmlFor/id 对等可访问性属性。',
    useLayoutEffectDesc: 'useLayoutEffect 在 DOM 变更后但在浏览器绘制前同步触发。用于测量 DOM 元素或进行需要在用户看到 UI 之前发生的 DOM 更改。',
    useLayoutEffectWarning: '优先使用 useEffect 而非 useLayoutEffect。useLayoutEffect 会阻止浏览器绘制，可能影响性能。只在需要防止视觉闪烁时使用。',
    useImperativeHandleDesc: 'useImperativeHandle 自定义使用 ref 时向父级暴露的实例值。它与 forwardRef 一起工作，暴露特定 API 而不是原始 DOM 节点。',

    comparisonTitle: 'React Hooks 与类生命周期方法对比',
    comparisonDesc: '理解 Hooks 和类生命周期方法之间的映射，有助于迁移现有代码或理解 React 的心智模型。',

    antiPatternsTitle: '需要避免的常见反模式',
    antiPattern1Title: 'useEffect 缺少依赖项',
    antiPattern1Desc: '始终在依赖数组中包含 effect 内部使用的所有响应式值。ESLint 规则 react-hooks/exhaustive-deps 会自动捕获这些错误。',
    antiPattern2Title: '依赖数组中的对象/数组',
    antiPattern2Desc: '对象和数组通过引用比较。在 JSX 中内联创建它们会在每次渲染时创建新引用，导致无限 effect 循环。',
    antiPattern3Title: '过度使用 useCallback 和 useMemo',
    antiPattern3Desc: '如果子组件没有被记忆化，将所有内容包装在 useCallback 和 useMemo 中只会增加复杂性而没有好处。先进行性能分析，再优化。',
    antiPattern4Title: '可推导的状态',
    antiPattern4Desc: '不要在状态中存储可以推导的值。在渲染期间计算它们。推导状态会导致同步错误。',

    faqTitle: '常见问题',
    faq1q: 'useEffect 和 useLayoutEffect 有什么区别？',
    faq1a: 'useEffect 在浏览器绘制屏幕后异步运行。useLayoutEffect 在 DOM 变更后但在绘制前同步运行。只在需要防止视觉闪烁时使用 useLayoutEffect，例如测量 DOM 元素并调整布局。对于数据请求、订阅和大多数副作用，useEffect 是正确选择。',
    faq2q: '什么时候应该用 useReducer 而不是 useState？',
    faq2a: '在以下情况使用 useReducer：有多个一起改变的相关状态值；下一个状态以复杂方式依赖于前一个状态；你想命名状态转换（action 类型）以提高可读性；或者你想独立测试状态逻辑。对于简单的独立值，useState 就足够了。',
    faq3q: '为什么我的 useEffect 在开发中运行两次？',
    faq3a: '在 React 18 Strict Mode 中，effect 被有意地挂载、卸载然后重新挂载，以检测没有正确清理的副作用。这只在开发环境中发生，不在生产环境中。它帮助你找到缺少清理函数或订阅泄漏等错误。',
    faq4q: '如何在组件挂载时用 Hooks 请求数据？',
    faq4a: '使用带空依赖数组的 useEffect 在挂载后运行一次。在 effect 内部创建 async 函数并立即调用它。始终使用 AbortController 处理清理，以便在请求完成前组件卸载时取消请求。考虑在生产数据请求中使用 SWR 或 React Query 等库。',
    faq5q: '什么导致 useEffect 的无限重渲染循环？',
    faq5a: '当 effect 更新被列为同一 effect 依赖项的状态时，会发生无限循环。另一个常见原因是在依赖数组中包含对象或数组字面量——它们每次渲染都会创建新引用。通过用 useRef、useMemo 或 useCallback 稳定引用来修复，或重构 effect。',
    faq6q: '我可以有条件地调用 Hooks 吗？',
    faq6a: '不可以。React 要求每次渲染时以相同顺序调用 Hooks。你不能在 if 语句、循环或嵌套函数内调用 Hooks。如果你想要条件行为，将条件放在 Hook 内部：无条件调用 useEffect，但如果条件不满足，在 effect 主体内提前返回。',
    faq7q: 'useCallback 和 useMemo 有什么区别？',
    faq7a: 'useCallback(fn, deps) 记忆化函数并在依赖项改变之前返回相同的函数引用。useMemo(() => value, deps) 记忆化函数的返回值。useCallback(fn, deps) 等价于 useMemo(() => fn, deps)。对函数使用 useCallback，对计算值使用 useMemo。',
    faq8q: '自定义 Hooks 与普通函数有何不同？',
    faq8a: '自定义 Hooks 可以调用其他 Hooks（useState、useEffect 等）——普通函数不能。按照约定，自定义 Hooks 以 "use" 开头，这样 React 和 ESLint 可以强制执行 Hooks 规则。自定义 Hooks 使你能够在组件之间共享有状态逻辑，而不需要添加组件层次结构（无需 render props 或 HOC）。',
  },
};

const codeStyle: React.CSSProperties = {
  background: '#1e1e1e',
  borderRadius: 8,
  padding: 16,
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.7,
  fontFamily: 'monospace',
  color: '#d4d4d4',
  border: '1px solid #333',
  margin: '12px 0',
  display: 'block',
  whiteSpace: 'pre',
};
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 24, marginBottom: 10, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 };
const ulStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 24, marginBottom: 12 };
const liStyle: React.CSSProperties = { marginBottom: 6 };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 };
const thStyle: React.CSSProperties = { background: '#f1f5f9', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700, color: '#1e293b' };
const tdStyle: React.CSSProperties = { padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: 'var(--text-secondary)', verticalAlign: 'top' };
const tdCodeStyle: React.CSSProperties = { padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#0369a1', fontFamily: 'monospace', fontSize: 13, verticalAlign: 'top' };

export default function ReactHooksGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
      { '@type': 'Question', name: t.faq7q, acceptedAnswer: { '@type': 'Answer', text: t.faq7a } },
      { '@type': 'Question', name: t.faq8q, acceptedAnswer: { '@type': 'Answer', text: t.faq8a } },
    ],
  };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto', lineHeight: 1.8 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #0ea5e9', borderRadius: 10, padding: '16px 20px', marginBottom: 28 }}>
        <strong style={{ color: '#0369a1', fontSize: 15, display: 'block', marginBottom: 8 }}>TL;DR</strong>
        <ul style={{ margin: 0, paddingLeft: 20, color: '#0c4a6e', lineHeight: 1.8 }}>
          <li>{t.tldr_1}</li>
          <li>{t.tldr_2}</li>
          <li>{t.tldr_3}</li>
          <li>{t.tldr_4}</li>
          <li>{t.tldr_5}</li>
        </ul>
      </div>

      <p style={pStyle}>{t.intro}</p>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 20px', marginBottom: 28 }}>
        <strong style={{ color: '#1e293b', fontSize: 15, display: 'block', marginBottom: 8 }}>
          {lang === 'zh' ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: 20, color: '#475569', lineHeight: 1.8 }}>
          <li>{t.kt_1}</li>
          <li>{t.kt_2}</li>
          <li>{t.kt_3}</li>
          <li>{t.kt_4}</li>
          <li>{t.kt_5}</li>
          <li>{t.kt_6}</li>
          <li>{t.kt_7}</li>
        </ul>
      </div>

      {/* Rules of Hooks */}
      <h2 style={h2Style}>{t.rulesTitle}</h2>
      <p style={pStyle}>{t.rulesDesc}</p>
      <ul style={ulStyle}>
        <li style={liStyle}>{t.rule1}</li>
        <li style={liStyle}>{t.rule2}</li>
      </ul>
      <h3 style={h3Style}>{t.rulesWhyTitle}</h3>
      <p style={pStyle}>{t.rulesWhyDesc}</p>
      <pre style={codeStyle}><code>{`// WRONG — hook called conditionally
function BadComponent({ show }: { show: boolean }) {
  if (show) {
    const [count, setCount] = useState(0); // React Error!
  }
  return <div />;
}

// CORRECT — hook always called, condition inside
function GoodComponent({ show }: { show: boolean }) {
  const [count, setCount] = useState(0);

  if (!show) return null;
  return <div>{count}</div>;
}

// WRONG — hook called in a loop
function BadList({ items }: { items: string[] }) {
  return items.map(item => {
    const [active, setActive] = useState(false); // React Error!
    return <span key={item}>{item}</span>;
  });
}

// CORRECT — extract to a component
function ItemComponent({ item }: { item: string }) {
  const [active, setActive] = useState(false);
  return <span onClick={() => setActive(!active)}>{item}</span>;
}`}</code></pre>

      {/* useState */}
      <h2 style={h2Style}>{t.useStateTitle}</h2>
      <p style={pStyle}>{t.useStateDesc}</p>

      <h3 style={h3Style}>{t.useStateBasicTitle}</h3>
      <pre style={codeStyle}><code>{`import { useState } from 'react';

function Counter() {
  // [currentValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setIsVisible(v => !v)}>Toggle</button>
      {isVisible && <p>Hello, {name}!</p>}
    </div>
  );
}`}</code></pre>

      <h3 style={h3Style}>{t.useStateFuncTitle}</h3>
      <p style={pStyle}>{t.useStateFuncDesc}</p>
      <pre style={codeStyle}><code>{`function SafeCounter() {
  const [count, setCount] = useState(0);

  // BAD: uses 'count' from closure — can be stale in async context
  const handleBad = () => {
    setCount(count + 1);
    setCount(count + 1); // Both use stale 'count', result: +1 not +2
  };

  // GOOD: functional update — always uses latest state
  const handleGood = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // Result: +2 as expected
  };

  // GOOD: async scenarios benefit especially from functional updates
  const handleAsync = async () => {
    await someAsyncOperation();
    setCount(prev => prev + 1); // Safe: uses state at call time
  };

  return <button onClick={handleGood}>Count: {count}</button>;
}`}</code></pre>

      <h3 style={h3Style}>{t.useStateLazyTitle}</h3>
      <p style={pStyle}>{t.useStateLazyDesc}</p>
      <pre style={codeStyle}><code>{`// BAD: getExpensiveInitialValue() runs on every render
function BadComponent() {
  const [data, setData] = useState(getExpensiveInitialValue());
  return <div>{data}</div>;
}

// GOOD: lazy initializer — function runs once on mount only
function GoodComponent() {
  const [data, setData] = useState(() => getExpensiveInitialValue());
  return <div>{data}</div>;
}

// Practical: reading from localStorage on init
function PersistentCounter() {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const stored = localStorage.getItem('count');
    return stored ? parseInt(stored, 10) : 0;
  });

  const increment = () => {
    setCount(prev => {
      const next = prev + 1;
      localStorage.setItem('count', String(next));
      return next;
    });
  };

  return <button onClick={increment}>Count: {count}</button>;
}`}</code></pre>

      <h3 style={h3Style}>{t.useStateObjectTitle}</h3>
      <p style={pStyle}>{t.useStateObjectDesc}</p>
      <pre style={codeStyle}><code>{`interface FormState {
  name: string;
  email: string;
  age: number;
}

function UserForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', age: 0 });

  // BAD: replaces entire state — loses other fields
  const handleNameBad = (name: string) => {
    setForm({ name } as FormState); // Missing email and age!
  };

  // GOOD: spread existing state, override changed field
  const handleChange = (field: keyof FormState, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form>
      <input value={form.name} onChange={e => handleChange('name', e.target.value)} />
      <input value={form.email} onChange={e => handleChange('email', e.target.value)} />
      <input type="number" value={form.age}
        onChange={e => handleChange('age', parseInt(e.target.value))} />
    </form>
  );
}`}</code></pre>

      {/* useEffect */}
      <h2 style={h2Style}>{t.useEffectTitle}</h2>
      <p style={pStyle}>{t.useEffectDesc}</p>

      <h3 style={h3Style}>{t.useEffectDepTitle}</h3>
      <p style={pStyle}>{t.useEffectDepDesc}</p>
      <pre style={codeStyle}><code>{`import { useEffect, useState } from 'react';

function EffectExamples({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [time, setTime] = useState(new Date());

  // Runs after EVERY render (no deps array)
  useEffect(() => {
    document.title = 'Page updated';
  });

  // Runs ONCE after mount (empty array)
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted');
  }, []);

  // Runs when userId changes
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(setUser);
  }, [userId]); // Re-runs whenever userId changes

  // Timer with cleanup
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []); // Timer set up once, cleaned up on unmount

  return <div>{time.toLocaleTimeString()}</div>;
}`}</code></pre>

      <h3 style={h3Style}>{t.useEffectCleanupTitle}</h3>
      <p style={pStyle}>{t.useEffectCleanupDesc}</p>
      <pre style={codeStyle}><code>{`function SubscriptionComponent({ channel }: { channel: string }) {
  const [messages, setMessages] = useState<string[]>([]);

  // WebSocket cleanup
  useEffect(() => {
    const socket = new WebSocket(\`wss://api.example.com/\${channel}\`);
    socket.addEventListener('message', event => {
      setMessages(prev => [...prev, event.data]);
    });
    return () => socket.close(); // Cleanup on unmount or channel change
  }, [channel]);

  // Event listener cleanup
  useEffect(() => {
    const handleResize = () => console.log('resized');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // AbortController for fetch cleanup
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/data', { signal: controller.signal })
      .then(r => r.json())
      .then(data => setMessages(data))
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });
    return () => controller.abort(); // Cancel in-flight request
  }, [channel]);

  return <ul>{messages.map((m, i) => <li key={i}>{m}</li>)}</ul>;
}`}</code></pre>

      <h3 style={h3Style}>{t.useEffectStaleTitle}</h3>
      <p style={pStyle}>{t.useEffectStaleDesc}</p>
      <pre style={codeStyle}><code>{`// BUG: stale closure — count is always 0 in the effect
function StaleClosure() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log('count:', count); // Always prints 0! Stale closure.
      setCount(count + 1);          // Always sets to 1, never increments
    }, 1000);
    return () => clearInterval(id);
  }, []); // Missing 'count' dependency

  return <p>{count}</p>;
}

// FIX 1: Add count to dependencies (re-creates interval each update)
function FixedV1() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [count]); // Correct but heavy
  return <p>{count}</p>;
}

// FIX 2: Use functional update (preferred)
function FixedV2() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev + 1); // Always uses latest state — no dep needed
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{count}</p>;
}

// FIX 3: useRef for callbacks needed in effects
function FixedV3({ onTick }: { onTick: (count: number) => void }) {
  const [count, setCount] = useState(0);
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick; // Always up to date

  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => {
        const next = prev + 1;
        onTickRef.current(next); // Latest callback, stable interval
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []); // onTick not in deps — no stale closure

  return <p>{count}</p>;
}`}</code></pre>

      {/* useRef */}
      <h2 style={h2Style}>{t.useRefTitle}</h2>
      <p style={pStyle}>{t.useRefDesc}</p>

      <h3 style={h3Style}>{t.useRefDomTitle}</h3>
      <pre style={codeStyle}><code>{`import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  // Focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handlePlay = () => videoRef.current?.play();

  // Measuring DOM elements
  const measureHeight = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      console.log('Height:', rect.height, 'Width:', rect.width);
    }
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Auto-focused on mount" />
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={handlePlay}>Play</button>
      <div ref={divRef} onClick={measureHeight}>Measure me</div>
    </div>
  );
}`}</code></pre>

      <h3 style={h3Style}>{t.useRefMutableTitle}</h3>
      <p style={pStyle}>{t.useRefMutableDesc}</p>
      <pre style={codeStyle}><code>{`function StopwatchWithRef() {
  const [display, setDisplay] = useState(0);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const renderCountRef = useRef(0); // Tracks renders without causing them

  renderCountRef.current += 1; // Does NOT trigger re-render

  const start = () => {
    startTimeRef.current = Date.now() - display;
    intervalIdRef.current = setInterval(() => {
      setDisplay(Date.now() - startTimeRef.current);
    }, 10);
  };

  const stop = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  return (
    <div>
      <p>Time: {(display / 1000).toFixed(2)}s</p>
      <p>Renders: {renderCountRef.current}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

// usePrevious pattern
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => { ref.current = value; });
  return ref.current; // Returns value from previous render
}`}</code></pre>

      <h3 style={h3Style}>{t.forwardRefTitle}</h3>
      <p style={pStyle}>{t.forwardRefDesc}</p>
      <pre style={codeStyle}><code>{`import { forwardRef } from 'react';

// Basic forwardRef
const FancyInput = forwardRef<HTMLInputElement, { placeholder?: string }>(
  ({ placeholder }, ref) => (
    <input
      ref={ref}
      placeholder={placeholder}
      style={{ border: '2px solid #0ea5e9', borderRadius: 4, padding: 8 }}
    />
  )
);
FancyInput.displayName = 'FancyInput'; // Recommended for React DevTools

// Parent using the forwarded ref
function ParentComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => inputRef.current?.focus();

  return (
    <div>
      <FancyInput ref={inputRef} placeholder="Fancy input" />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}`}</code></pre>

      {/* useCallback */}
      <h2 style={h2Style}>{t.useCallbackTitle}</h2>
      <p style={pStyle}>{t.useCallbackDesc}</p>
      <pre style={codeStyle}><code>{`import { useCallback, useState, memo } from 'react';

// Child is memoized — re-renders only when props change by reference
const MemoChild = memo(({ onClick }: { onClick: () => void }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});

function Parent({ userId }: { userId: string }) {
  const [count, setCount] = useState(0);

  // BAD: new function every render — memo on child is useless
  const handleClickBad = () => {
    console.log('clicked', userId);
  };

  // GOOD: stable reference — only recreated when userId changes
  const handleClickGood = useCallback(() => {
    console.log('clicked', userId);
  }, [userId]);

  // useCallback as useEffect dependency
  const fetchData = useCallback(async () => {
    const data = await fetch(\`/api/users/\${userId}\`);
    return data.json();
  }, [userId]); // Stable — only changes when userId changes

  useEffect(() => {
    fetchData().then(console.log);
  }, [fetchData]); // Effect re-runs only when userId changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment parent</button>
      <MemoChild onClick={handleClickGood} />
    </div>
  );
}`}</code></pre>

      <h3 style={h3Style}>{t.useCallbackWhenTitle}</h3>
      <p style={pStyle}>{t.useCallbackWhenDesc}</p>

      {/* useMemo */}
      <h2 style={h2Style}>{t.useMemoTitle}</h2>
      <p style={pStyle}>{t.useMemoDesc}</p>
      <pre style={codeStyle}><code>{`import { useMemo, useState } from 'react';

interface Product { id: string; name: string; price: number; active: boolean; }

function ProductList({ items, filter }: { items: Product[]; filter: string }) {
  // Recomputes only when items or filter change
  const filteredItems = useMemo(
    () => items.filter(item =>
      item.active && item.name.toLowerCase().includes(filter.toLowerCase())
    ),
    [items, filter]
  );

  // Expensive derived stats
  const stats = useMemo(() => {
    if (filteredItems.length === 0) return { total: 0, avg: 0, max: 0 };
    const prices = filteredItems.map(i => i.price);
    return {
      total: filteredItems.length,
      avg: prices.reduce((s, p) => s + p, 0) / prices.length,
      max: Math.max(...prices),
    };
  }, [filteredItems]);

  return (
    <div>
      <p>Found: {stats.total} | Avg: \${stats.avg.toFixed(2)} | Max: \${stats.max}</p>
      {filteredItems.map(item => <div key={item.id}>{item.name} — \${item.price}</div>)}
    </div>
  );
}

// useMemo for referential stability in useEffect deps
function DataComponent({ url, method }: { url: string; method: string }) {
  // GOOD: stabilize object to avoid infinite effect loop
  const fetchOptions = useMemo(
    () => ({ url, method }),
    [url, method]
  );

  useEffect(() => {
    fetch(fetchOptions.url, { method: fetchOptions.method });
  }, [fetchOptions]); // Stable reference — no infinite loop

  return null;
}`}</code></pre>

      <h3 style={h3Style}>{t.useMemoWhenTitle}</h3>
      <p style={pStyle}>{t.useMemoWhenDesc}</p>

      {/* useContext */}
      <h2 style={h2Style}>{t.useContextTitle}</h2>
      <p style={pStyle}>{t.useContextDesc}</p>
      <h3 style={h3Style}>{t.useContextPatternTitle}</h3>
      <pre style={codeStyle}><code>{`import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// 1. Define context type
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Create context — null helps detect missing provider
const ThemeContext = createContext<ThemeContextValue | null>(null);

// 3. Custom hook — throws if used outside provider
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 4. Provider with memoized value
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []);

  // Memoize to prevent re-rendering all consumers on every parent render
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 5. Consumer — clean, type-safe API
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      style={{
        background: theme === 'dark' ? '#1e293b' : '#f1f5f9',
        color: theme === 'dark' ? '#f8fafc' : '#1e293b',
        padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer'
      }}
      onClick={toggleTheme}
    >
      Theme: {theme}
    </button>
  );
}`}</code></pre>

      {/* useReducer */}
      <h2 style={h2Style}>{t.useReducerTitle}</h2>
      <p style={pStyle}>{t.useReducerDesc}</p>
      <pre style={codeStyle}><code>{`import { useReducer } from 'react';

interface CartItem { id: string; name: string; price: number; quantity: number; }

interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Pure reducer — easy to test in isolation
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      const items = existing
        ? state.items.map(i => i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 } : i)
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { ...state, items, total: calculateTotal(items) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.id !== action.payload);
      return { ...state, items, total: calculateTotal(items) };
    }
    case 'UPDATE_QUANTITY': {
      const items = state.items.map(i =>
        i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
      );
      return { ...state, items, total: calculateTotal(items) };
    }
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

const initialState: CartState = { items: [], total: 0, isLoading: false, error: null };

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div>
      <p>Total: \${cart.total.toFixed(2)} ({cart.items.length} items)</p>
      {cart.items.map(item => (
        <div key={item.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>{item.name}</span>
          <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY',
            payload: { id: item.id, quantity: item.quantity - 1 } })}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY',
            payload: { id: item.id, quantity: item.quantity + 1 } })}>+</button>
          <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
    </div>
  );
}`}</code></pre>

      <h3 style={h3Style}>{t.useReducerWhenTitle}</h3>
      <ul style={ulStyle}>
        <li style={liStyle}>{t.useReducerWhen1}</li>
        <li style={liStyle}>{t.useReducerWhen2}</li>
        <li style={liStyle}>{t.useReducerWhen3}</li>
        <li style={liStyle}>{t.useReducerWhen4}</li>
      </ul>

      {/* Custom Hooks */}
      <h2 style={h2Style}>{t.customHooksTitle}</h2>
      <p style={pStyle}>{t.customHooksDesc}</p>

      <h3 style={h3Style}>{t.customHooksFetchTitle}</h3>
      <pre style={codeStyle}><code>{`import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger(t => t + 1), []);

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
        return res.json() as Promise<T>;
      })
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err as Error);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url, trigger]);

  return { data, loading, error, refetch };
}

// Usage
interface User { id: string; name: string; email: string; }

function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error, refetch } = useFetch<User>(
    \`/api/users/\${userId}\`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div>
      Error: {error.message}
      <button onClick={refetch}>Retry</button>
    </div>
  );
  return <div>{user?.name} — {user?.email}</div>;
}`}</code></pre>

      <h3 style={h3Style}>{t.customHooksDebounceTitle}</h3>
      <pre style={codeStyle}><code>{`import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // Clear on value/delay change
  }, [value, delay]);

  return debouncedValue;
}

// Usage: search input — only fires API call after user stops typing
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300); // 300ms debounce

  const { data: results } = useFetch<string[]>(
    debouncedQuery ? \`/api/search?q=\${encodeURIComponent(debouncedQuery)}\` : ''
  );

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search... (debounced)"
      />
      {query !== debouncedQuery && <span>Typing...</span>}
      {results?.map((r, i) => <div key={i}>{r}</div>)}
    </div>
  );
}`}</code></pre>

      <h3 style={h3Style}>{t.customHooksLocalStorageTitle}</h3>
      <pre style={codeStyle}><code>{`import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Lazy init: read from localStorage once on mount
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      setStoredValue(newValue);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.error(\`useLocalStorage error for key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    localStorage.removeItem(key);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

// Usage
function ThemeToggle() {
  const [theme, setTheme, resetTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  return (
    <div>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Theme: {theme}
      </button>
      <button onClick={resetTheme}>Reset</button>
    </div>
  );
}`}</code></pre>

      <h3 style={h3Style}>{t.customHooksFormTitle}</h3>
      <pre style={codeStyle}><code>{`import { useState, useCallback } from 'react';

interface FormConfig<T extends Record<string, unknown>> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void | Promise<void>;
}

function useForm<T extends Record<string, unknown>>({
  initialValues, validate, onSubmit
}: FormConfig<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback((field: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }, [errors]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }
    setSubmitting(true);
    try { await onSubmit(values); }
    finally { setSubmitting(false); }
  }, [values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, submitting, handleChange, handleBlur, handleSubmit, reset };
}

// Usage
function LoginForm() {
  const { values, errors, touched, submitting, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues: { email: '', password: '' } as { email: string; password: string },
    validate: ({ email, password }) => {
      const e: Record<string, string> = {};
      if (!email.includes('@')) e.email = 'Invalid email address';
      if (password.length < 8) e.password = 'Password must be at least 8 characters';
      return e;
    },
    onSubmit: async (values) => {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Login failed');
    },
  });

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <input
          type="email"
          value={values.email}
          onChange={e => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="Email"
        />
        {touched.email && errors.email && (
          <span style={{ color: '#ef4444', fontSize: 13 }}>{errors.email}</span>
        )}
      </div>
      <div>
        <input
          type="password"
          value={values.password}
          onChange={e => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <span style={{ color: '#ef4444', fontSize: 13 }}>{errors.password}</span>
        )}
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}`}</code></pre>

      {/* useTransition + useDeferredValue */}
      <h2 style={h2Style}>{t.useTransitionTitle}</h2>
      <p style={pStyle}>{t.useTransitionDesc}</p>
      <pre style={codeStyle}><code>{`import { useState, useTransition, useDeferredValue, memo } from 'react';

// useTransition: mark updates as non-urgent
function TabSwitcher() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const tabs = ['home', 'posts', 'contact', 'settings'];

  const selectTab = (tab: string) => {
    startTransition(() => {
      setActiveTab(tab); // Non-urgent — React can interrupt to handle user input
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => selectTab(tab)}
            style={{
              opacity: isPending ? 0.6 : 1,
              fontWeight: activeTab === tab ? 700 : 400,
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      {isPending && <span style={{ color: '#94a3b8' }}>Loading...</span>}
      <HeavyTabContent tab={activeTab} />
    </div>
  );
}

// useDeferredValue: defer re-rendering slow parts
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // query vs deferredQuery tells us if results are stale
  const isStale = query !== deferredQuery;

  return (
    <div>
      {/* Input always stays responsive */}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {/* Results may briefly show stale data while updating */}
      <div style={{ opacity: isStale ? 0.5 : 1, transition: 'opacity 0.2s' }}>
        <SlowSearchResults query={deferredQuery} />
      </div>
    </div>
  );
}`}</code></pre>

      <h3 style={h3Style}>{t.useTransitionWhenTitle}</h3>
      <ul style={ulStyle}>
        <li style={liStyle}>{t.useTransition_when1}</li>
        <li style={liStyle}>{t.useTransition_when2}</li>
      </ul>

      {/* useId, useLayoutEffect, useImperativeHandle */}
      <h2 style={h2Style}>{t.useIdTitle}</h2>
      <p style={pStyle}>{t.useIdDesc}</p>
      <pre style={codeStyle}><code>{`import { useId, useLayoutEffect, useImperativeHandle, forwardRef, useRef, useState } from 'react';

// useId: stable IDs for accessibility — no hydration mismatch
function FormField({ label, type = 'text' }: { label: string; type?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
}

// Multiple IDs from one useId call
function MultiFieldForm() {
  const id = useId();
  return (
    <form>
      <label htmlFor={\`\${id}-email\`}>Email</label>
      <input id={\`\${id}-email\`} type="email" />
      <label htmlFor={\`\${id}-name\`}>Name</label>
      <input id={\`\${id}-name\`} />
      <span id={\`\${id}-hint\`}>Enter your full name</span>
      <input aria-describedby={\`\${id}-hint\`} />
    </form>
  );
}

// useLayoutEffect: synchronous DOM measurement before paint
function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  // Runs before browser paints — prevents position flicker
  useLayoutEffect(() => {
    if (tooltipRef.current && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tipRect = tooltipRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - tipRect.height - 8,
        left: rect.left + rect.width / 2 - tipRect.width / 2,
      });
    }
  });

  return (
    <>
      <span ref={triggerRef}>{children}</span>
      <div ref={tooltipRef}
        style={{ position: 'fixed', top: position.top, left: position.left,
          background: '#1e293b', color: '#fff', padding: '4px 8px', borderRadius: 4 }}>
        {text}
      </div>
    </>
  );
}

// useImperativeHandle: expose specific API through ref
interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getTime: () => number;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, { src: string }>(
  ({ src }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      seek: (time) => { if (videoRef.current) videoRef.current.currentTime = time; },
      getTime: () => videoRef.current?.currentTime ?? 0,
    }), []); // Empty deps: API functions are stable

    return <video ref={videoRef} src={src} controls />;
  }
);
VideoPlayer.displayName = 'VideoPlayer';

function VideoController() {
  const playerRef = useRef<VideoPlayerHandle>(null);
  return (
    <div>
      <VideoPlayer ref={playerRef} src="/demo.mp4" />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={() => playerRef.current?.play()}>Play</button>
        <button onClick={() => playerRef.current?.pause()}>Pause</button>
        <button onClick={() => playerRef.current?.seek(0)}>Restart</button>
      </div>
    </div>
  );
}`}</code></pre>

      {/* Comparison Table */}
      <h2 style={h2Style}>{t.comparisonTitle}</h2>
      <p style={pStyle}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{lang === 'zh' ? '类生命周期' : 'Class Lifecycle'}</th>
              <th style={thStyle}>{lang === 'zh' ? 'Hooks 等价写法' : 'Hooks Equivalent'}</th>
              <th style={thStyle}>{lang === 'zh' ? '说明' : 'Notes'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdCodeStyle}>constructor</td>
              <td style={tdCodeStyle}>useState / useReducer</td>
              <td style={tdStyle}>{lang === 'zh' ? '初始状态作为 useState 参数传入' : 'Initial state passed as argument to useState'}</td>
            </tr>
            <tr>
              <td style={tdCodeStyle}>componentDidMount</td>
              <td style={tdCodeStyle}>{'useEffect(() => {}, [])'}</td>
              <td style={tdStyle}>{lang === 'zh' ? '空依赖数组——仅挂载后运行一次' : 'Empty deps array — runs once after first render'}</td>
            </tr>
            <tr>
              <td style={tdCodeStyle}>componentDidUpdate</td>
              <td style={tdCodeStyle}>{'useEffect(() => {}, [dep])'}</td>
              <td style={tdStyle}>{lang === 'zh' ? '列出依赖项——值变化时运行' : 'List dependencies — runs when they change'}</td>
            </tr>
            <tr>
              <td style={tdCodeStyle}>componentWillUnmount</td>
              <td style={tdCodeStyle}>useEffect cleanup</td>
              <td style={tdStyle}>{lang === 'zh' ? '从 useEffect 返回清理函数' : 'Return a function from useEffect'}</td>
            </tr>
            <tr>
              <td style={tdCodeStyle}>shouldComponentUpdate</td>
              <td style={tdCodeStyle}>React.memo + useMemo</td>
              <td style={tdStyle}>{lang === 'zh' ? 'memo 包装组件，useMemo 用于计算值' : 'memo wraps component, useMemo for computed values'}</td>
            </tr>
            <tr>
              <td style={tdCodeStyle}>getDerivedStateFromProps</td>
              <td style={tdCodeStyle}>{lang === 'zh' ? '渲染期间直接计算' : 'Compute directly during render'}</td>
              <td style={tdStyle}>{lang === 'zh' ? '避免推导状态——直接在 render 中计算' : 'Avoid derived state — compute inline'}</td>
            </tr>
            <tr>
              <td style={tdCodeStyle}>getSnapshotBeforeUpdate</td>
              <td style={tdCodeStyle}>useLayoutEffect</td>
              <td style={tdStyle}>{lang === 'zh' ? 'DOM 更新后、绘制前同步读取布局' : 'Read layout synchronously after DOM update, before paint'}</td>
            </tr>
            <tr>
              <td style={tdCodeStyle}>componentDidCatch</td>
              <td style={tdCodeStyle}>{lang === 'zh' ? '暂无 Hook（仍需类组件）' : 'No Hook equivalent (class component required)'}</td>
              <td style={tdStyle}>{lang === 'zh' ? 'Error Boundaries 仍需类组件' : 'Error Boundaries still require class components'}</td>
            </tr>
            <tr>
              <td style={tdCodeStyle}>this.setState</td>
              <td style={tdCodeStyle}>useState / useReducer</td>
              <td style={tdStyle}>{lang === 'zh' ? 'Hooks 不自动合并对象——需手动展开' : 'Hooks do not auto-merge objects — spread manually'}</td>
            </tr>
            <tr>
              <td style={tdCodeStyle}>this.forceUpdate</td>
              <td style={tdCodeStyle}>{'useReducer dispatch'}</td>
              <td style={tdStyle}>{lang === 'zh' ? '分发任何 action 触发重渲染' : 'Dispatch any action to force a re-render'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Anti-Patterns */}
      <h2 style={h2Style}>{t.antiPatternsTitle}</h2>

      <h3 style={h3Style}>{t.antiPattern1Title}</h3>
      <p style={pStyle}>{t.antiPattern1Desc}</p>
      <pre style={codeStyle}><code>{`// BAD: missing 'query' dependency — stale closure
function SearchBad({ query }: { query: string }) {
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    // 'query' is used but not listed in deps
    fetch(\`/api/search?q=\${query}\`)
      .then(r => r.json())
      .then(setResults);
  }, []); // ESLint: react-hooks/exhaustive-deps warning!

  return <ul>{results.map((r, i) => <li key={i}>{r}</li>)}</ul>;
}

// GOOD: all reactive values in deps
function SearchGood({ query }: { query: string }) {
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    fetch(\`/api/search?q=\${query}\`, { signal: controller.signal })
      .then(r => r.json())
      .then(setResults)
      .catch(err => { if (err.name !== 'AbortError') console.error(err); });
    return () => controller.abort();
  }, [query]); // Correct — re-runs when query changes

  return <ul>{results.map((r, i) => <li key={i}>{r}</li>)}</ul>;
}`}</code></pre>

      <h3 style={h3Style}>{t.antiPattern2Title}</h3>
      <p style={pStyle}>{t.antiPattern2Desc}</p>
      <pre style={codeStyle}><code>{`// BAD: object/array literal in deps — new reference every render → infinite loop
function BadEffect({ userId }: { userId: string }) {
  useEffect(() => {
    fetch('/api/data', { body: JSON.stringify({ userId, version: 2 }) });
  }, [{ userId, version: 2 }]); // New object reference every render!
}

// GOOD: use primitive values as dependencies
function GoodEffect({ userId }: { userId: string }) {
  useEffect(() => {
    fetch('/api/data', { body: JSON.stringify({ userId, version: 2 }) });
  }, [userId]); // Primitive string — stable comparison

  // Alternative: memoize the object if you must use it directly
  const requestBody = useMemo(() => ({ userId, version: 2 }), [userId]);
  useEffect(() => {
    fetch('/api/data', { body: JSON.stringify(requestBody) });
  }, [requestBody]); // Stable reference now
}`}</code></pre>

      <h3 style={h3Style}>{t.antiPattern3Title}</h3>
      <p style={pStyle}>{t.antiPattern3Desc}</p>
      <pre style={codeStyle}><code>{`// OVER-OPTIMIZATION: adds complexity without benefit
function OverOptimized({ items }: { items: string[] }) {
  // Useless: just reading a property — zero computation cost
  const itemCount = useMemo(() => items.length, [items]);

  // Useless: child is not wrapped in memo — stability doesn't matter
  const handleClick = useCallback(() => console.log('click'), []);

  return <div onClick={handleClick}>{itemCount} items</div>;
}

// APPROPRIATE optimization
const ExpensiveChild = memo(({ onClick }: { onClick: () => void }) => {
  // Imagine heavy rendering logic
  return <button onClick={onClick}>Action</button>;
});

function WellOptimized({ products }: { products: Product[] }) {
  // Justified: filtering thousands of items is expensive
  const activeProducts = useMemo(
    () => products.filter(p => p.active && p.price > 0).sort((a, b) =>
      a.name.localeCompare(b.name)),
    [products]
  );

  // Justified: passed to memoized child
  const handleAdd = useCallback((id: string) => addToCart(id), []);

  return (
    <div>
      {activeProducts.map(p => (
        <ExpensiveChild key={p.id} onClick={() => handleAdd(p.id)} />
      ))}
    </div>
  );
}`}</code></pre>

      <h3 style={h3Style}>{t.antiPattern4Title}</h3>
      <p style={pStyle}>{t.antiPattern4Desc}</p>
      <pre style={codeStyle}><code>{`// BAD: derived state — synchronization nightmare
interface User { firstName: string; lastName: string; items: string[]; }

function BadComponent({ user }: { user: User }) {
  const [fullName, setFullName] = useState('');
  const [sortedItems, setSortedItems] = useState<string[]>([]);

  // Synchronization bugs: what if user prop changes?
  useEffect(() => {
    setFullName(\`\${user.firstName} \${user.lastName}\`);
  }, [user.firstName, user.lastName]);

  useEffect(() => {
    setSortedItems([...user.items].sort());
  }, [user.items]);

  return <div>{fullName}</div>;
}

// GOOD: compute during render — always in sync
function GoodComponent({ user }: { user: User }) {
  // Compute synchronously — no state, no effect, no sync issues
  const fullName = \`\${user.firstName} \${user.lastName}\`;

  // useMemo only if genuinely expensive
  const sortedItems = useMemo(
    () => [...user.items].sort(),
    [user.items]
  );

  return (
    <div>
      <h2>{fullName}</h2>
      <ul>{sortedItems.map(item => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}`}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>

      <h3 style={h3Style}>{t.faq1q}</h3>
      <p style={pStyle}>{t.faq1a}</p>

      <h3 style={h3Style}>{t.faq2q}</h3>
      <p style={pStyle}>{t.faq2a}</p>

      <h3 style={h3Style}>{t.faq3q}</h3>
      <p style={pStyle}>{t.faq3a}</p>

      <h3 style={h3Style}>{t.faq4q}</h3>
      <p style={pStyle}>{t.faq4a}</p>

      <h3 style={h3Style}>{t.faq5q}</h3>
      <p style={pStyle}>{t.faq5a}</p>

      <h3 style={h3Style}>{t.faq6q}</h3>
      <p style={pStyle}>{t.faq6a}</p>

      <h3 style={h3Style}>{t.faq7q}</h3>
      <p style={pStyle}>{t.faq7a}</p>

      <h3 style={h3Style}>{t.faq8q}</h3>
      <p style={pStyle}>{t.faq8a}</p>
    </article>
  );
}
