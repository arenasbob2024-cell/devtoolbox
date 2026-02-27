'use client';
import React from 'react';

const translations = {
  en: {
    title: 'React Design Patterns: 13 Essential Patterns Every Developer Should Know',
    description:
      'A comprehensive guide to React design patterns including Compound Components, Render Props, Custom Hooks, HOCs, Provider Pattern, State Machines, Error Boundaries, and more with practical code examples.',
    tldr: 'Master 13 essential React design patterns to build scalable, maintainable applications. Use Compound Components for flexible APIs, Custom Hooks for reusable logic, Provider Pattern for dependency injection, and Error Boundaries for resilient UIs. Prefer composition over inheritance, extract stateful logic into hooks, and leverage useReducer for complex state transitions. Choose Controlled components for form validation and Render Props when you need dynamic rendering logic shared across components.',
    tldrZh: '掌握 13 种核心 React 设计模式，构建可扩展、可维护的应用。使用复合组件实现灵活的 API，自定义 Hook 复用逻辑，Provider 模式实现依赖注入，Error Boundary 构建弹性 UI。优先选择组合而非继承，将有状态逻辑提取到 Hook 中，利用 useReducer 处理复杂状态转换。选择受控组件进行表单验证，使用 Render Props 在组件间共享动态渲染逻辑。',
  },
  zh: {
    title: 'React 设计模式：每个开发者都应掌握的 13 种核心模式',
    description:
      '全面的 React 设计模式指南，涵盖复合组件、Render Props、自定义 Hook、高阶组件、Provider 模式、状态机、Error Boundary 等，附带实用代码示例。',
    tldr: '掌握 13 种核心 React 设计模式，构建可扩展、可维护的应用。使用复合组件实现灵活的 API，自定义 Hook 复用逻辑，Provider 模式实现依赖注入，Error Boundary 构建弹性 UI。优先选择组合而非继承，将有状态逻辑提取到 Hook 中，利用 useReducer 处理复杂状态转换。选择受控组件进行表单验证，使用 Render Props 在组件间共享动态渲染逻辑。',
    tldrZh: '掌握 13 种核心 React 设计模式，构建可扩展、可维护的应用。使用复合组件实现灵活的 API，自定义 Hook 复用逻辑，Provider 模式实现依赖注入，Error Boundary 构建弹性 UI。优先选择组合而非继承，将有状态逻辑提取到 Hook 中，利用 useReducer 处理复杂状态转换。选择受控组件进行表单验证，使用 Render Props 在组件间共享动态渲染逻辑。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are Compound Components in React?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compound Components is a pattern where a parent component shares implicit state with its children, allowing them to communicate without prop drilling. The parent uses React.Children or Context to pass state. Examples include Select/Option, Tabs/Tab, and Accordion/AccordionItem. This pattern provides a flexible, declarative API while keeping internal logic encapsulated.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use Render Props vs Custom Hooks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Custom Hooks are generally preferred in modern React because they are simpler and avoid wrapper component nesting. Use Custom Hooks when you need to share stateful logic between components. Render Props are still useful when you need dynamic rendering control or when the shared logic needs to influence what JSX is rendered. Both patterns solve the same problem of logic reuse, but hooks have a cleaner API.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Higher-Order Components work in React?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Higher-Order Component (HOC) is a function that takes a component and returns a new component with added functionality. Common examples include withAuth (adding authentication checks), withLoading (adding loading states), and withTheme (injecting theme). HOCs compose well using function composition. However, they can cause prop conflicts and make debugging harder, so custom hooks are often preferred.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Provider Pattern and how does it relate to Context?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Provider Pattern combines React Context with a custom hook to provide dependency injection. A Provider component wraps part of the tree and makes values available to any descendant. A custom hook (like useTheme or useAuth) consumes the context. This avoids prop drilling and keeps the API clean. It is the foundation for state management libraries like Redux and Zustand.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why use useReducer for state machines in React?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'useReducer naturally models finite state machines because it takes (state, action) and returns new state, making transitions explicit and predictable. Each action type represents a valid transition, and invalid transitions can be rejected in the reducer. This prevents impossible states and makes complex UI logic (like multi-step forms, async workflows, or toggle groups) easier to reason about and test.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Controlled and Uncontrolled components?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Controlled components store form values in React state and update via onChange handlers, giving React full control over the form data. Uncontrolled components let the DOM manage values using refs. Use controlled components when you need validation, conditional rendering, or derived state. Use uncontrolled components for simple forms, file inputs, or when integrating with non-React libraries.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does React prefer composition over inheritance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'React recommends composition because it provides more flexibility without the coupling that inheritance creates. The children prop, render props, and slots pattern let you customize component behavior by passing JSX or functions. Inheritance creates tight coupling between parent and child classes, making refactoring difficult. In thousands of React components at Facebook, no use case was found where inheritance was better than composition.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Error Boundaries work in React?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Error Boundaries are class components that catch JavaScript errors in their child component tree using componentDidCatch and getDerivedStateFromError lifecycle methods. They display a fallback UI instead of crashing the entire app. Error Boundaries only catch errors during rendering, in lifecycle methods, and in constructors. They do not catch errors in event handlers, async code, or server-side rendering. Use multiple boundaries to isolate failures in different parts of your UI.',
      },
    },
  ],
};

export default function ReactDesignPatternsGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
  const t = translations[isZh ? 'zh' : 'en'];

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };

  const tipStyle: React.CSSProperties = {
    background: '#fefce8',
    borderLeft: '4px solid #eab308',
    padding: '12px 16px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.9rem',
    lineHeight: '1.7',
    color: '#713f12',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={tldrBoxStyle}>
        <strong>TL;DR: </strong>
        {isZh ? t.tldrZh : t.tldr}
      </div>

      <div style={keyTakeawaysStyle}>
        <strong>{isZh ? '核心要点' : 'Key Takeaways'}:</strong>
        <ul style={{ ...ulStyle, marginTop: '8px', marginBottom: '0' }}>
          <li>{isZh ? '复合组件为组件库提供灵活且声明式的 API' : 'Compound Components provide flexible, declarative APIs for component libraries'}</li>
          <li>{isZh ? '自定义 Hook 是现代 React 中最通用的逻辑复用模式' : 'Custom Hooks are the most versatile pattern for logic reuse in modern React'}</li>
          <li>{isZh ? 'Provider 模式通过 Context + Hook 实现简洁的依赖注入' : 'Provider Pattern enables clean dependency injection via Context + custom hook'}</li>
          <li>{isZh ? 'useReducer 自然地建模有限状态机，防止不可能的状态' : 'useReducer naturally models finite state machines and prevents impossible states'}</li>
          <li>{isZh ? '优先选择组合而非继承——使用 children、render props 和 slot 模式' : 'Prefer composition over inheritance — use children, render props, and slots'}</li>
          <li>{isZh ? 'Error Boundary 隔离故障，防止整个应用崩溃' : 'Error Boundaries isolate failures and prevent full-app crashes'}</li>
        </ul>
      </div>

      {/* 1. Compound Components */}
      <h2 style={h2Style}>{isZh ? '1. 复合组件模式' : '1. Compound Components'}</h2>
      <p style={pStyle}>
        {isZh
          ? '复合组件模式允许父组件通过隐式状态与子组件通信。父组件管理内部状态，子组件通过 Context 或 React.Children 访问该状态。这种模式常见于 Select/Option、Tabs/Tab 和 Accordion 等组件库中，它使 API 保持声明式且灵活。'
          : 'The Compound Components pattern lets a parent component share implicit state with its children. The parent manages internal state while children access it through Context or React.Children. This pattern is common in component libraries for Select/Option, Tabs/Tab, and Accordion components, keeping APIs declarative and flexible.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '与通过 props 传递大量配置不同，复合组件让消费者通过组合子组件来声明意图。这种方式更接近原生 HTML（如 <select> + <option>），降低了使用门槛。'
          : 'Rather than passing large configuration objects through props, compound components let consumers declare intent by composing child components. This approach mirrors native HTML patterns like <select> + <option> and lowers the learning curve.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：Select 和 Option' : 'Example: Select and Option'}</h3>
      <pre style={preStyle}><code>{'function Select({ children, onChange }) {\n' +
'  const [value, setValue] = React.useState(null);\n' +
'  const handleSelect = (val) => {\n' +
'    setValue(val);\n' +
'    onChange?.(val);\n' +
'  };\n' +
'  return (\n' +
'    <SelectContext.Provider value={{ value, onSelect: handleSelect }}>\n' +
'      <div role="listbox">{children}</div>\n' +
'    </SelectContext.Provider>\n' +
'  );\n' +
'}\n\n' +
'function Option({ value, children }) {\n' +
'  const ctx = React.useContext(SelectContext);\n' +
'  const selected = ctx.value === value;\n' +
'  return (\n' +
'    <div role="option" onClick={() => ctx.onSelect(value)}\n' +
'      style={{ fontWeight: selected ? "bold" : "normal" }}>\n' +
'      {children}\n' +
'    </div>\n' +
'  );\n' +
'}'}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '优先使用 Context 而非 React.Children.map，因为 Context 在深层嵌套和条件渲染时更可靠。'
          : 'Prefer Context over React.Children.map because Context works reliably with deeply nested and conditionally rendered children.'}
      </div>

      {/* 2. Render Props */}
      <h2 style={h2Style}>{isZh ? '2. Render Props 模式' : '2. Render Props'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Render Props 是一种通过函数 prop 共享渲染逻辑的技术。组件接收一个返回 JSX 的函数作为 prop，将内部状态传递给该函数。这种模式适用于数据获取、鼠标追踪和交叉观察等需要将逻辑与渲染解耦的场景。'
          : 'Render Props is a technique for sharing rendering logic via a function prop. A component receives a function that returns JSX and passes its internal state to that function. This pattern works well for data fetching, mouse tracking, and intersection observer use cases where logic and rendering need to be decoupled.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '虽然自定义 Hook 在很多场景下已取代 Render Props，但当你需要根据共享逻辑动态决定渲染内容时，Render Props 仍然有其独特价值。'
          : 'While custom hooks have replaced render props in many scenarios, render props remain uniquely valuable when shared logic needs to dynamically determine what gets rendered.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：鼠标位置追踪' : 'Example: Mouse Position Tracker'}</h3>
      <pre style={preStyle}><code>{'function MouseTracker({ render }) {\n' +
'  const [pos, setPos] = React.useState({ x: 0, y: 0 });\n' +
'  React.useEffect(() => {\n' +
'    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });\n' +
'    window.addEventListener("mousemove", handler);\n' +
'    return () => window.removeEventListener("mousemove", handler);\n' +
'  }, []);\n' +
'  return render(pos);\n' +
'}\n\n' +
'// Usage:\n' +
'<MouseTracker\n' +
'  render={({ x, y }) => (\n' +
'    <p>Cursor at: {x}, {y}</p>\n' +
'  )}\n' +
'/>'}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '命名 render prop 时可以使用 children 作为函数，这样调用更自然：<MouseTracker>{(pos) => ...}</MouseTracker>'
          : 'You can use children as a function for a more natural API: <MouseTracker>{(pos) => ...}</MouseTracker>'}
      </div>

      {/* 3. Custom Hooks */}
      <h2 style={h2Style}>{isZh ? '3. 自定义 Hook 模式' : '3. Custom Hooks'}</h2>
      <p style={pStyle}>
        {isZh
          ? '自定义 Hook 是现代 React 中最推荐的逻辑复用模式。将有状态逻辑封装到以 use 开头的函数中，可以在多个组件间共享而不改变组件层级。常见的自定义 Hook 包括 useDebounce、useLocalStorage 和 useMediaQuery。'
          : 'Custom Hooks are the most recommended pattern for logic reuse in modern React. By encapsulating stateful logic into functions prefixed with use, you can share it across components without altering the component hierarchy. Common examples include useDebounce, useLocalStorage, and useMediaQuery.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '自定义 Hook 的优势在于：它们可以调用其他 Hook、返回任意值、并且不会产生额外的组件嵌套。每个使用自定义 Hook 的组件都有独立的状态副本。'
          : 'The advantages of custom hooks are: they can call other hooks, return any value, and do not add extra component nesting. Each component using a custom hook gets its own independent copy of the state.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：useDebounce 和 useLocalStorage' : 'Example: useDebounce and useLocalStorage'}</h3>
      <pre style={preStyle}><code>{'function useDebounce(value, delay = 300) {\n' +
'  const [debounced, setDebounced] = React.useState(value);\n' +
'  React.useEffect(() => {\n' +
'    const id = setTimeout(() => setDebounced(value), delay);\n' +
'    return () => clearTimeout(id);\n' +
'  }, [value, delay]);\n' +
'  return debounced;\n' +
'}\n\n' +
'function useLocalStorage(key, initial) {\n' +
'  const [val, setVal] = React.useState(() => {\n' +
'    const stored = localStorage.getItem(key);\n' +
'    return stored ? JSON.parse(stored) : initial;\n' +
'  });\n' +
'  React.useEffect(() => {\n' +
'    localStorage.setItem(key, JSON.stringify(val));\n' +
'  }, [key, val]);\n' +
'  return [val, setVal];\n' +
'}'}</code></pre>

      {/* 4. Higher-Order Components */}
      <h2 style={h2Style}>{isZh ? '4. 高阶组件 (HOC)' : '4. Higher-Order Components (HOC)'}</h2>
      <p style={pStyle}>
        {isZh
          ? '高阶组件是一个接收组件并返回新组件的函数，为原组件添加额外功能。常见的 HOC 包括 withAuth（鉴权）、withLoading（加载状态）和 withTheme（主题注入）。多个 HOC 可以通过 compose 函数组合使用。'
          : 'A Higher-Order Component is a function that takes a component and returns a new component with added capabilities. Common HOCs include withAuth (authentication guard), withLoading (loading state), and withTheme (theme injection). Multiple HOCs can be composed together using a compose utility.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'HOC 的缺点包括：可能导致 prop 名冲突、使组件树变深导致调试困难、以及静态方法不会自动传递。在现代 React 中，优先使用自定义 Hook，仅在需要包裹渲染逻辑时使用 HOC。'
          : 'Downsides of HOCs include potential prop name collisions, deeper component trees that complicate debugging, and static methods not being forwarded automatically. In modern React, prefer custom hooks and only use HOCs when you need to wrap rendering logic.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：withAuth 高阶组件' : 'Example: withAuth HOC'}</h3>
      <pre style={preStyle}><code>{'function withAuth(WrappedComponent) {\n' +
'  return function AuthenticatedComponent(props) {\n' +
'    const { user, loading } = useAuth();\n' +
'    if (loading) return <Spinner />;\n' +
'    if (!user) return <Redirect to="/login" />;\n' +
'    return <WrappedComponent {...props} user={user} />;\n' +
'  };\n' +
'}\n\n' +
'// Compose multiple HOCs:\n' +
'const compose = (...fns) =>\n' +
'  fns.reduce((f, g) => (...args) => f(g(...args)));\n\n' +
'const EnhancedPage = compose(\n' +
'  withAuth,\n' +
'  withTheme,\n' +
'  withLoading\n' +
')(DashboardPage);'}</code></pre>

      {/* 5. Container/Presentational */}
      <h2 style={h2Style}>{isZh ? '5. 容器组件/展示组件' : '5. Container / Presentational'}</h2>
      <p style={pStyle}>
        {isZh
          ? '容器/展示组件模式将数据逻辑与 UI 渲染分离。容器组件负责获取数据、管理状态和处理副作用，展示组件只接收 props 并渲染 UI。虽然 Hook 减少了对此模式的依赖，但在大型代码库中它仍然有助于保持清晰的关注点分离。'
          : 'The Container/Presentational pattern separates data logic from UI rendering. Container components handle data fetching, state management, and side effects, while presentational components receive props and render UI. Although hooks have reduced the need for this pattern, it still helps maintain clear separation of concerns in large codebases.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '展示组件通常是纯函数组件，容易测试和复用。容器组件可以替换为自定义 Hook，但这种分离思想仍然有价值——将"做什么"与"怎么呈现"分开。'
          : 'Presentational components are usually pure functional components that are easy to test and reuse. Containers can be replaced with custom hooks, but the separation principle remains valuable — keeping "what to do" separate from "how to display it".'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：用户列表分离' : 'Example: User List Separation'}</h3>
      <pre style={preStyle}><code>{'// Container: handles data and state\n' +
'function UserListContainer() {\n' +
'  const [users, setUsers] = React.useState([]);\n' +
'  React.useEffect(() => {\n' +
'    fetch("/api/users").then(r => r.json()).then(setUsers);\n' +
'  }, []);\n' +
'  return <UserListView users={users} />;\n' +
'}\n\n' +
'// Presentational: pure UI rendering\n' +
'function UserListView({ users }) {\n' +
'  return (\n' +
'    <ul>\n' +
'      {users.map(u => (\n' +
'        <li key={u.id}>{u.name} — {u.email}</li>\n' +
'      ))}\n' +
'    </ul>\n' +
'  );\n' +
'}'}</code></pre>

      {/* 6. Provider Pattern */}
      <h2 style={h2Style}>{isZh ? '6. Provider 模式' : '6. Provider Pattern'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Provider 模式将 React Context 与自定义 Hook 结合，实现简洁的依赖注入。Provider 组件包裹组件树的一部分，使值对所有后代组件可用。自定义 Hook（如 useTheme）消费该 Context，避免了 prop drilling 的问题。'
          : 'The Provider Pattern combines React Context with a custom hook for clean dependency injection. A Provider component wraps part of the tree, making values available to all descendants. A custom hook like useTheme consumes the context, eliminating prop drilling entirely.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '这是 Redux、Zustand、React Query 等状态管理库的基础架构。在自定义 Hook 中添加错误检查（确保在 Provider 内使用）是一个最佳实践，能在开发时提供清晰的错误信息。'
          : 'This is the foundational architecture behind state management libraries like Redux, Zustand, and React Query. Adding an error check in the custom hook to ensure it is used within the Provider is a best practice that provides clear error messages during development.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：主题 Provider' : 'Example: Theme Provider'}</h3>
      <pre style={preStyle}><code>{'const ThemeContext = React.createContext(null);\n\n' +
'function ThemeProvider({ children }) {\n' +
'  const [theme, setTheme] = React.useState("light");\n' +
'  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");\n' +
'  return (\n' +
'    <ThemeContext.Provider value={{ theme, toggle }}>\n' +
'      {children}\n' +
'    </ThemeContext.Provider>\n' +
'  );\n' +
'}\n\n' +
'function useTheme() {\n' +
'  const ctx = React.useContext(ThemeContext);\n' +
'  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");\n' +
'  return ctx;\n' +
'}'}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '将 Context value 用 useMemo 包裹，避免 Provider 的父组件重新渲染时导致所有消费者不必要地重新渲染。'
          : 'Wrap the Context value with useMemo to prevent unnecessary re-renders of all consumers when the Provider parent re-renders.'}
      </div>

      {/* 7. State Machines */}
      <h2 style={h2Style}>{isZh ? '7. 状态机模式' : '7. State Machines'}</h2>
      <p style={pStyle}>
        {isZh
          ? '状态机模式使用有限状态和明确的转换规则来管理复杂 UI 逻辑。useReducer 天然适合建模状态机，因为每个 action 代表一个有效的状态转换。这种模式可以防止不可能的状态，使多步表单、异步工作流和复杂交互更容易推理和测试。'
          : 'The State Machine pattern uses finite states and explicit transitions to manage complex UI logic. useReducer is a natural fit because each action represents a valid state transition. This pattern prevents impossible states and makes multi-step forms, async workflows, and complex interactions easier to reason about and test.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '对于更复杂的状态机需求，可以使用 XState 库，它提供可视化调试工具和更严格的类型安全。简单场景下，useReducer 配合 switch 语句已经足够。'
          : 'For more complex state machine requirements, consider using the XState library which provides visual debugging tools and stricter type safety. For simpler scenarios, useReducer with a switch statement is sufficient.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：异步请求状态机' : 'Example: Async Request State Machine'}</h3>
      <pre style={preStyle}><code>{'function fetchReducer(state, action) {\n' +
'  switch (state.status) {\n' +
'    case "idle":\n' +
'      if (action.type === "FETCH") return { status: "loading" };\n' +
'      break;\n' +
'    case "loading":\n' +
'      if (action.type === "SUCCESS")\n' +
'        return { status: "success", data: action.data };\n' +
'      if (action.type === "ERROR")\n' +
'        return { status: "error", error: action.error };\n' +
'      break;\n' +
'    case "error":\n' +
'      if (action.type === "RETRY") return { status: "loading" };\n' +
'      break;\n' +
'  }\n' +
'  return state;\n' +
'}\n\n' +
'const [state, dispatch] = React.useReducer(\n' +
'  fetchReducer, { status: "idle" }\n' +
');'}</code></pre>

      {/* 8. Controlled vs Uncontrolled */}
      <h2 style={h2Style}>{isZh ? '8. 受控组件 vs 非受控组件' : '8. Controlled vs Uncontrolled'}</h2>
      <p style={pStyle}>
        {isZh
          ? '受控组件将表单值存储在 React 状态中，通过 onChange 更新；非受控组件让 DOM 管理值，通过 ref 读取。受控组件适合需要验证、条件渲染或派生状态的场景；非受控组件适合简单表单、文件输入或与非 React 库集成。'
          : 'Controlled components store form values in React state and update via onChange handlers. Uncontrolled components let the DOM manage values and read them via refs. Use controlled components when you need validation, conditional rendering, or derived state. Use uncontrolled for simple forms, file inputs, or integrating with non-React libraries.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'React.forwardRef 和 useImperativeHandle 可以让父组件通过 ref 访问非受控组件的内部方法，这在需要命令式操作（如聚焦输入框或重置表单）时非常有用。'
          : 'React.forwardRef and useImperativeHandle allow parent components to access internal methods of uncontrolled components via refs. This is useful for imperative operations like focusing inputs or resetting forms.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：受控与非受控对比' : 'Example: Controlled vs Uncontrolled'}</h3>
      <pre style={preStyle}><code>{'// Controlled: React owns the value\n' +
'function ControlledInput() {\n' +
'  const [value, setValue] = React.useState("");\n' +
'  return (\n' +
'    <input\n' +
'      value={value}\n' +
'      onChange={(e) => setValue(e.target.value)}\n' +
'    />\n' +
'  );\n' +
'}\n\n' +
'// Uncontrolled: DOM owns the value\n' +
'const UncontrolledInput = React.forwardRef((props, ref) => {\n' +
'  const inputRef = React.useRef(null);\n' +
'  React.useImperativeHandle(ref, () => ({\n' +
'    getValue: () => inputRef.current.value,\n' +
'  }));\n' +
'  return <input ref={inputRef} defaultValue={props.initial} />;\n' +
'});'}</code></pre>

      {/* 9. Composition vs Inheritance */}
      <h2 style={h2Style}>{isZh ? '9. 组合 vs 继承' : '9. Composition vs Inheritance'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'React 官方推荐组合而非继承。通过 children prop、render props 和 slot 模式，可以在不创建紧耦合的情况下自定义组件行为。在 Facebook 数千个 React 组件中，没有发现继承优于组合的场景。'
          : 'React officially recommends composition over inheritance. Through the children prop, render props, and slots pattern, you can customize component behavior without creating tight coupling. Across thousands of React components at Facebook, no use case was found where inheritance was superior to composition.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Slot 模式通过命名 props 传递 JSX 片段，提供了类似 Vue slot 的能力。这比继承更灵活，因为每个"槽位"可以是任意 JSX，而继承只能沿类层次结构扩展。'
          : 'The Slots pattern passes JSX fragments through named props, providing capabilities similar to Vue slots. This is more flexible than inheritance because each slot can be arbitrary JSX, while inheritance can only extend along the class hierarchy.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：Slot 模式' : 'Example: Slots Pattern'}</h3>
      <pre style={preStyle}><code>{'// Slots pattern: named regions via props\n' +
'function Card({ header, body, footer }) {\n' +
'  return (\n' +
'    <div style={{ border: "1px solid #ccc", borderRadius: 8 }}>\n' +
'      <div style={{ padding: 16, borderBottom: "1px solid #eee" }}>\n' +
'        {header}\n' +
'      </div>\n' +
'      <div style={{ padding: 16 }}>{body}</div>\n' +
'      {footer && (\n' +
'        <div style={{ padding: 16, borderTop: "1px solid #eee" }}>\n' +
'          {footer}\n' +
'        </div>\n' +
'      )}\n' +
'    </div>\n' +
'  );\n' +
'}\n\n' +
'// Usage: fully customizable without inheritance\n' +
'<Card\n' +
'  header={<h3>Title</h3>}\n' +
'  body={<p>Content here</p>}\n' +
'  footer={<button>Save</button>}\n' +
'/>'}</code></pre>

      {/* 10. Observer Pattern */}
      <h2 style={h2Style}>{isZh ? '10. 观察者模式' : '10. Observer Pattern'}</h2>
      <p style={pStyle}>
        {isZh
          ? '观察者模式（发布/订阅）在 React 中用于解耦组件间的通信。通过事件发射器，组件可以发布事件而不需要知道谁在监听，订阅者也不需要知道事件来自哪里。这在跨组件树通信和与外部系统集成时非常有用。'
          : 'The Observer Pattern (pub/sub) decouples component communication in React. Through an event emitter, components can publish events without knowing who listens, and subscribers do not need to know where events originate. This is useful for cross-tree communication and integration with external systems.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '在 React 中使用观察者模式时，务必在 useEffect 的清理函数中取消订阅，避免内存泄漏。对于简单的跨组件通信，Context 或状态管理库通常是更好的选择。'
          : 'When using the Observer Pattern in React, always unsubscribe in the useEffect cleanup function to prevent memory leaks. For simple cross-component communication, Context or state management libraries are usually a better choice.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：事件发射器' : 'Example: Event Emitter'}</h3>
      <pre style={preStyle}><code>{'function createEventBus() {\n' +
'  const listeners = new Map();\n' +
'  return {\n' +
'    on(event, cb) {\n' +
'      if (!listeners.has(event)) listeners.set(event, new Set());\n' +
'      listeners.get(event).add(cb);\n' +
'      return () => listeners.get(event).delete(cb);\n' +
'    },\n' +
'    emit(event, data) {\n' +
'      listeners.get(event)?.forEach(cb => cb(data));\n' +
'    },\n' +
'  };\n' +
'}\n\n' +
'// Usage in a hook:\n' +
'function useEventBus(bus, event, handler) {\n' +
'  React.useEffect(() => bus.on(event, handler),\n' +
'    [bus, event, handler]);\n' +
'}'}</code></pre>

      {/* 11. Proxy Pattern */}
      <h2 style={h2Style}>{isZh ? '11. 代理模式' : '11. Proxy Pattern'}</h2>
      <p style={pStyle}>
        {isZh
          ? '代理模式在 React 中用于延迟加载和虚拟化。代理组件作为真实组件的替代，在满足条件时（如进入视口）才加载实际内容。React.lazy 和 Intersection Observer 是实现代理模式的常用工具。'
          : 'The Proxy Pattern in React enables lazy loading and virtualization. A proxy component acts as a stand-in for the real component, loading the actual content only when conditions are met (e.g., entering the viewport). React.lazy and Intersection Observer are common tools for implementing this pattern.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '虚拟滚动也是代理模式的一种应用：只渲染视口内的列表项，用占位元素代替不可见的部分。这对包含数千条目的长列表至关重要。'
          : 'Virtual scrolling is another application of the Proxy Pattern: only list items within the viewport are rendered, while invisible portions are replaced with placeholder elements. This is essential for long lists with thousands of entries.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：视口延迟加载' : 'Example: Viewport Lazy Loading'}</h3>
      <pre style={preStyle}><code>{'function LazyVisible({ children, fallback = null }) {\n' +
'  const ref = React.useRef(null);\n' +
'  const [visible, setVisible] = React.useState(false);\n' +
'  React.useEffect(() => {\n' +
'    const obs = new IntersectionObserver(([entry]) => {\n' +
'      if (entry.isIntersecting) {\n' +
'        setVisible(true);\n' +
'        obs.disconnect();\n' +
'      }\n' +
'    });\n' +
'    if (ref.current) obs.observe(ref.current);\n' +
'    return () => obs.disconnect();\n' +
'  }, []);\n' +
'  return (\n' +
'    <div ref={ref}>\n' +
'      {visible ? children : fallback}\n' +
'    </div>\n' +
'  );\n' +
'}'}</code></pre>

      {/* 12. Module Pattern */}
      <h2 style={h2Style}>{isZh ? '12. 模块模式' : '12. Module Pattern'}</h2>
      <p style={pStyle}>
        {isZh
          ? '模块模式在 React 中体现为桶导出、功能模块和代码分割。通过将相关组件、Hook 和工具函数组织在同一目录下，使用 index.ts 作为公共 API，可以保持代码整洁且易于维护。React.lazy 和动态 import 实现按需加载。'
          : 'The Module Pattern in React manifests as barrel exports, feature modules, and code splitting. By organizing related components, hooks, and utilities in a single directory with index.ts as the public API, you keep code clean and maintainable. React.lazy and dynamic imports enable on-demand loading.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '功能模块的好处是：团队成员可以独立开发各自负责的模块，模块间通过明确的公共 API 交互，内部实现细节被封装起来。这也使得代码分割的边界更加清晰。'
          : 'The benefit of feature modules is that team members can independently develop their assigned modules. Modules interact through well-defined public APIs while internal implementation details are encapsulated. This also makes code splitting boundaries much clearer.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：功能模块结构' : 'Example: Feature Module Structure'}</h3>
      <pre style={preStyle}><code>{'// features/auth/index.ts — barrel export\n' +
'export { AuthProvider } from "./AuthProvider";\n' +
'export { useAuth } from "./useAuth";\n' +
'export { LoginForm } from "./LoginForm";\n' +
'export { SignupForm } from "./SignupForm";\n\n' +
'// Lazy loading a feature module:\n' +
'const AuthModule = React.lazy(() => import("./features/auth"));\n\n' +
'function App() {\n' +
'  return (\n' +
'    <React.Suspense fallback={<Spinner />}>\n' +
'      <AuthModule />\n' +
'    </React.Suspense>\n' +
'  );\n' +
'}'}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '注意桶导出可能影响 tree-shaking。对于大型库，考虑使用直接导入路径而非桶导出。'
          : 'Be aware that barrel exports can impact tree-shaking. For large libraries, consider using direct import paths instead of barrel exports.'}
      </div>

      {/* 13. Error Boundary */}
      <h2 style={h2Style}>{isZh ? '13. Error Boundary 模式' : '13. Error Boundary Pattern'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Error Boundary 是捕获子组件树中 JavaScript 错误的类组件，显示降级 UI 而不是让整个应用崩溃。它们使用 componentDidCatch 和 getDerivedStateFromError 生命周期方法。在不同的 UI 区域使用多个 Error Boundary 可以隔离故障。'
          : 'Error Boundaries are class components that catch JavaScript errors in their child component tree and display a fallback UI instead of crashing the entire app. They use componentDidCatch and getDerivedStateFromError lifecycle methods. Using multiple Error Boundaries across different UI sections isolates failures.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Error Boundary 只能捕获渲染期间、生命周期方法和构造函数中的错误。它们无法捕获事件处理器、异步代码或服务端渲染中的错误。对于这些场景，需要使用 try/catch 或全局错误处理。'
          : 'Error Boundaries only catch errors during rendering, lifecycle methods, and constructors. They cannot catch errors in event handlers, async code, or server-side rendering. For those scenarios, use try/catch or global error handlers.'}
      </p>
      <h3 style={h3Style}>{isZh ? '示例：带重试功能的 Error Boundary' : 'Example: Error Boundary with Retry'}</h3>
      <pre style={preStyle}><code>{'class ErrorBoundary extends React.Component {\n' +
'  state = { hasError: false, error: null };\n\n' +
'  static getDerivedStateFromError(error) {\n' +
'    return { hasError: true, error };\n' +
'  }\n\n' +
'  componentDidCatch(error, info) {\n' +
'    console.error("Caught:", error, info.componentStack);\n' +
'  }\n\n' +
'  handleRetry = () => this.setState({ hasError: false, error: null });\n\n' +
'  render() {\n' +
'    if (this.state.hasError) {\n' +
'      return (\n' +
'        <div style={{ padding: 20, textAlign: "center" }}>\n' +
'          <h3>Something went wrong</h3>\n' +
'          <button onClick={this.handleRetry}>Try Again</button>\n' +
'        </div>\n' +
'      );\n' +
'    }\n' +
'    return this.props.children;\n' +
'  }\n' +
'}'}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '在生产环境中，将 componentDidCatch 中的错误发送到错误监控服务（如 Sentry），以便及时发现和修复问题。'
          : 'In production, send errors from componentDidCatch to an error monitoring service like Sentry for timely detection and resolution.'}
      </div>

      {/* Pattern Evolution */}
      <h2 style={h2Style}>{isZh ? '模式演进：从 Mixins 到 Hooks' : 'Pattern Evolution: From Mixins to Hooks'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'React 的设计模式随着框架的发展而不断演进。理解这个演进过程有助于你明白为什么某些模式被推荐，以及何时使用旧模式仍然合理。'
          : 'React design patterns have evolved alongside the framework itself. Understanding this evolution helps explain why certain patterns are recommended and when older patterns still make sense.'}
      </p>
      <ul style={ulStyle}>
        <li><strong>Mixins (2013-2015):</strong> {isZh ? 'React 最早的逻辑复用方式，仅支持 createClass。因为命名冲突和隐式依赖问题被废弃。' : 'The earliest logic reuse mechanism in React, only supported with createClass. Deprecated due to naming conflicts and implicit dependencies.'}</li>
        <li><strong>HOC (2015-2018):</strong> {isZh ? '用函数包裹组件来注入行为。解决了 Mixins 的问题，但引入了 wrapper hell 和 prop 冲突。' : 'Wrapping components in functions to inject behavior. Solved Mixin issues but introduced wrapper hell and prop collisions.'}</li>
        <li><strong>Render Props (2017-2019):</strong> {isZh ? '通过函数 prop 共享逻辑。比 HOC 更显式，但仍然有组件嵌套问题。' : 'Sharing logic via function props. More explicit than HOCs but still had component nesting issues.'}</li>
        <li><strong>Hooks (2019-present):</strong> {isZh ? '革命性的逻辑复用方案。无嵌套、无命名冲突、可组合性强。是目前推荐的首选方式。' : 'Revolutionary logic reuse solution. No nesting, no naming conflicts, highly composable. The currently recommended approach.'}</li>
      </ul>
      <p style={pStyle}>
        {isZh
          ? '尽管 Hook 是首选方案，但 HOC 在某些场景（如路由守卫、权限控制）中仍然有用，Render Props 在需要动态渲染决策时仍然有价值，Error Boundary 仍然必须使用类组件。'
          : 'While hooks are the preferred approach, HOCs remain useful in certain scenarios like route guards and permission control, Render Props retain value when dynamic render decisions are needed, and Error Boundaries still require class components.'}
      </p>

      {/* Real-World Combinations */}
      <h2 style={h2Style}>{isZh ? '实战组合模式' : 'Real-World Pattern Combinations'}</h2>
      <p style={pStyle}>
        {isZh
          ? '在实际项目中，设计模式很少单独使用。以下是几种常见的模式组合方式：'
          : 'In real projects, design patterns are rarely used in isolation. Here are common pattern combinations:'}
      </p>
      <h3 style={h3Style}>{isZh ? 'Provider + Custom Hook + Error Boundary' : 'Provider + Custom Hook + Error Boundary'}</h3>
      <p style={pStyle}>
        {isZh
          ? '这是最常见的组合。Provider 提供数据源，自定义 Hook 封装访问逻辑，Error Boundary 处理加载失败。例如一个数据获取层：AuthProvider 提供用户信息，useAuth Hook 让组件访问认证状态，Error Boundary 在 API 异常时显示降级 UI。'
          : 'This is the most common combination. The Provider supplies the data source, a custom hook encapsulates access logic, and an Error Boundary handles load failures. For example, an auth layer: AuthProvider supplies user info, useAuth hook lets components access auth state, and an Error Boundary shows fallback UI on API failures.'}
      </p>
      <h3 style={h3Style}>{isZh ? 'Compound Components + Provider + State Machine' : 'Compound Components + Provider + State Machine'}</h3>
      <p style={pStyle}>
        {isZh
          ? '构建复杂的表单向导时，外层使用复合组件定义步骤（Wizard + Step），内部通过 Provider 共享向导状态，用 useReducer 状态机管理步骤转换和验证逻辑。'
          : 'When building a multi-step form wizard, the outer layer uses compound components to define steps (Wizard + Step), the Provider shares wizard state internally, and a useReducer state machine manages step transitions and validation logic.'}
      </p>
      <h3 style={h3Style}>{isZh ? 'Module Pattern + Proxy + Code Splitting' : 'Module Pattern + Proxy + Code Splitting'}</h3>
      <p style={pStyle}>
        {isZh
          ? '大型应用通过模块模式组织功能边界，使用代理模式（React.lazy + Suspense）按需加载模块，结合路由级代码分割实现最优的首屏加载性能。'
          : 'Large applications use the Module Pattern to organize feature boundaries, the Proxy Pattern (React.lazy + Suspense) to load modules on demand, and route-level code splitting to achieve optimal initial load performance.'}
      </p>

      {/* Testing Design Patterns */}
      <h2 style={h2Style}>{isZh ? '如何测试设计模式' : 'Testing Design Patterns'}</h2>
      <p style={pStyle}>
        {isZh
          ? '良好的设计模式应该使测试更容易而非更困难。以下是每种模式的测试建议：'
          : 'Good design patterns should make testing easier, not harder. Here are testing tips for each pattern:'}
      </p>
      <ul style={ulStyle}>
        <li><strong>{isZh ? '自定义 Hook：' : 'Custom Hooks: '}</strong>{isZh ? '使用 renderHook 从 @testing-library/react 独立测试 Hook 逻辑。' : 'Use renderHook from @testing-library/react to test hook logic independently.'}</li>
        <li><strong>{isZh ? '复合组件：' : 'Compound Components: '}</strong>{isZh ? '将父子组件一起渲染测试，验证交互行为而非实现细节。' : 'Render parent and children together, testing interaction behavior rather than implementation details.'}</li>
        <li><strong>{isZh ? 'Provider 模式：' : 'Provider Pattern: '}</strong>{isZh ? '创建测试用的 Provider wrapper，注入模拟数据，测试消费组件的行为。' : 'Create test Provider wrappers, inject mock data, and test consumer component behavior.'}</li>
        <li><strong>{isZh ? '状态机：' : 'State Machines: '}</strong>{isZh ? 'Reducer 是纯函数，可以脱离 React 直接单元测试每个状态转换。' : 'Reducers are pure functions that can be unit tested for each state transition without React.'}</li>
        <li><strong>{isZh ? 'Error Boundary：' : 'Error Boundaries: '}</strong>{isZh ? '故意渲染抛出错误的子组件，验证降级 UI 是否正确显示。' : 'Intentionally render children that throw errors and verify the fallback UI renders correctly.'}</li>
        <li><strong>{isZh ? '展示组件：' : 'Presentational: '}</strong>{isZh ? '使用快照测试或视觉回归测试，因为展示组件是纯函数。' : 'Use snapshot or visual regression tests since presentational components are pure functions.'}</li>
      </ul>

      {/* Pattern Selection Guide */}
      <h2 style={h2Style}>{isZh ? '模式选择指南' : 'Pattern Selection Guide'}</h2>
      <p style={pStyle}>
        {isZh
          ? '选择正确的设计模式取决于你的具体需求。以下是按用途分类的快速参考：'
          : 'Choosing the right design pattern depends on your specific needs. Here is a quick reference organized by use case:'}
      </p>
      <ul style={ulStyle}>
        <li><strong>{isZh ? '逻辑复用' : 'Logic Reuse'}</strong>{isZh ? ' → 自定义 Hook（首选）或 Render Props' : ' → Custom Hooks (preferred) or Render Props'}</li>
        <li><strong>{isZh ? '组件库 API' : 'Component Library APIs'}</strong>{isZh ? ' → 复合组件' : ' → Compound Components'}</li>
        <li><strong>{isZh ? '全局状态/依赖注入' : 'Global State / DI'}</strong>{isZh ? ' → Provider 模式' : ' → Provider Pattern'}</li>
        <li><strong>{isZh ? '复杂状态逻辑' : 'Complex State Logic'}</strong>{isZh ? ' → 状态机 (useReducer / XState)' : ' → State Machines (useReducer / XState)'}</li>
        <li><strong>{isZh ? '跨功能增强' : 'Cross-Cutting Concerns'}</strong>{isZh ? ' → 高阶组件（少用，优先 Hook）' : ' → HOCs (use sparingly, prefer hooks)'}</li>
        <li><strong>{isZh ? '错误恢复' : 'Error Recovery'}</strong>{isZh ? ' → Error Boundary' : ' → Error Boundaries'}</li>
        <li><strong>{isZh ? '性能优化' : 'Performance'}</strong>{isZh ? ' → 代理模式（懒加载/虚拟化）' : ' → Proxy Pattern (lazy load / virtualization)'}</li>
        <li><strong>{isZh ? '代码组织' : 'Code Organization'}</strong>{isZh ? ' → 模块模式（桶导出 + 代码分割）' : ' → Module Pattern (barrel exports + code splitting)'}</li>
        <li><strong>{isZh ? '表单处理' : 'Form Handling'}</strong>{isZh ? ' → 受控（验证）/ 非受控（简单场景）' : ' → Controlled (validation) / Uncontrolled (simple forms)'}</li>
        <li><strong>{isZh ? '松耦合通信' : 'Loose Coupling'}</strong>{isZh ? ' → 观察者模式（事件总线）' : ' → Observer Pattern (event bus)'}</li>
      </ul>

      {/* Common Anti-Patterns */}
      <h2 style={h2Style}>{isZh ? '常见反模式' : 'Common Anti-Patterns to Avoid'}</h2>
      <p style={pStyle}>
        {isZh
          ? '了解反模式与了解设计模式同样重要。避免以下常见陷阱可以显著提升代码质量：'
          : 'Understanding anti-patterns is just as important as understanding design patterns. Avoiding these common pitfalls significantly improves code quality:'}
      </p>
      <ul style={ulStyle}>
        <li><strong>{isZh ? 'Prop Drilling：' : 'Prop Drilling: '}</strong>{isZh ? '传递 props 超过 3 层时，考虑使用 Context 或状态管理库。过深的 prop 传递使组件耦合，重构困难。' : 'When passing props more than 3 levels deep, consider Context or a state management library. Deep prop passing creates coupling and makes refactoring difficult.'}</li>
        <li><strong>{isZh ? '过度抽象：' : 'Premature Abstraction: '}</strong>{isZh ? '不要在只有一个使用场景时就创建抽象，遵循"三次法则"——只有当模式重复三次时才提取。' : 'Do not create abstractions with only one use case. Follow the Rule of Three — only extract when a pattern repeats three times.'}</li>
        <li><strong>{isZh ? '巨型组件：' : 'Giant Components: '}</strong>{isZh ? '超过 200 行的组件应该被拆分为更小的子组件或自定义 Hook。大组件难以测试、难以维护。' : 'Components exceeding 200 lines should be split into smaller subcomponents or custom hooks. Large components are hard to test and maintain.'}</li>
        <li><strong>{isZh ? '在 render 中定义组件：' : 'Components in Render: '}</strong>{isZh ? '在 render 函数内部定义组件会导致每次渲染都创建新的组件实例，破坏 reconciliation 和状态保持。' : 'Defining components inside render creates new instances each render, breaking reconciliation and state persistence.'}</li>
        <li><strong>{isZh ? '滥用 useEffect：' : 'useEffect Abuse: '}</strong>{isZh ? '不要用 useEffect 来同步派生状态。如果一个值可以从 props 或 state 计算得出，直接在渲染中计算即可。' : 'Do not use useEffect to synchronize derived state. If a value can be computed from props or state, compute it directly during rendering.'}</li>
      </ul>

      {/* Performance Considerations */}
      <h2 style={h2Style}>{isZh ? '性能注意事项' : 'Performance Considerations'}</h2>
      <p style={pStyle}>
        {isZh
          ? '设计模式不仅影响代码的可维护性，还直接影响运行时性能。以下是使用各模式时需要注意的性能问题：'
          : 'Design patterns affect not only code maintainability but also runtime performance. Here are performance considerations for each pattern:'}
      </p>
      <ul style={ulStyle}>
        <li><strong>Context: </strong>{isZh ? '每次 Context value 变化时，所有消费者都会重新渲染。通过拆分 Context（读写分离）或使用 useMemo 包裹 value 来优化。' : 'Every consumer re-renders when the Context value changes. Optimize by splitting Context (separate read and write) or wrapping the value with useMemo.'}</li>
        <li><strong>{isZh ? '复合组件：' : 'Compound Components: '}</strong>{isZh ? '使用 React.memo 包裹子组件，避免父组件状态变化导致所有子组件不必要地重新渲染。' : 'Wrap child components with React.memo to prevent unnecessary re-renders when parent state changes.'}</li>
        <li><strong>HOC: </strong>{isZh ? '确保 HOC 返回的组件被正确 memo 化。避免在每次渲染时创建新的 HOC 实例。' : 'Ensure the component returned by the HOC is properly memoized. Avoid creating new HOC instances on each render.'}</li>
        <li><strong>{isZh ? '事件总线：' : 'Event Bus: '}</strong>{isZh ? '频繁触发的事件（如鼠标移动）应该使用节流或防抖来限制回调执行频率。' : 'Frequently triggered events like mouse movements should use throttle or debounce to limit callback execution frequency.'}</li>
        <li><strong>{isZh ? '代码分割：' : 'Code Splitting: '}</strong>{isZh ? 'React.lazy 产生的网络请求会影响感知性能。使用预加载策略（如 hover 时预加载）减少用户等待时间。' : 'Network requests from React.lazy affect perceived performance. Use preloading strategies like loading on hover to reduce user wait times.'}</li>
      </ul>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '使用 React DevTools Profiler 来识别不必要的重新渲染。先保证正确性，再考虑优化——不要过早优化。'
          : 'Use the React DevTools Profiler to identify unnecessary re-renders. Ensure correctness first, then optimize — do not optimize prematurely.'}
      </div>

      {/* When Not to Use Patterns */}
      <h2 style={h2Style}>{isZh ? '何时不使用设计模式' : 'When Not to Use Patterns'}</h2>
      <p style={pStyle}>
        {isZh
          ? '设计模式是解决特定问题的工具，而非炫技的手段。在以下场景中，简单直接的代码比精心设计的模式更好：'
          : 'Design patterns are tools for solving specific problems, not tools for showing off. In the following scenarios, simple straightforward code is better than elaborate patterns:'}
      </p>
      <ul style={ulStyle}>
        <li>{isZh ? '原型或 MVP 阶段——快速验证想法比代码架构更重要' : 'Prototype or MVP phase — validating ideas quickly is more important than code architecture'}</li>
        <li>{isZh ? '只有一个组件使用的逻辑——不需要提取自定义 Hook' : 'Logic used by only one component — no need to extract a custom hook'}</li>
        <li>{isZh ? 'Props 只传两层——不需要引入 Context' : 'Props passed only two levels deep — no need to introduce Context'}</li>
        <li>{isZh ? '状态只有两个分支——不需要状态机，简单的 useState + if/else 就够了' : 'State with only two branches — no need for a state machine, a simple useState + if/else is enough'}</li>
        <li>{isZh ? '团队不熟悉某个模式——可读性和团队效率比"最佳实践"更重要' : 'The team is unfamiliar with a pattern — readability and team velocity matter more than "best practices"'}</li>
      </ul>

      {/* Conclusion */}
      <h2 style={h2Style}>{isZh ? '总结' : 'Conclusion'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'React 设计模式不是互斥的——它们经常组合使用。一个典型的 React 应用可能同时使用 Provider 模式管理主题和认证、自定义 Hook 共享业务逻辑、复合组件构建可复用的 UI 组件库、Error Boundary 处理异常情况。'
          : 'React design patterns are not mutually exclusive — they are often combined. A typical React application might use the Provider Pattern for theming and auth, Custom Hooks for shared business logic, Compound Components for reusable UI libraries, and Error Boundaries for handling exceptions.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '关键是理解每种模式解决的问题，选择最适合你场景的方案，并避免过度工程化。从简单开始，随着需求增长逐步引入更高级的模式。记住：最好的模式是你的团队能理解和维护的模式。'
          : 'The key is understanding what problem each pattern solves, choosing the best fit for your scenario, and avoiding over-engineering. Start simple and gradually introduce more advanced patterns as requirements grow. Remember: the best pattern is one that your team can understand and maintain.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '随着 React Server Components 和新的编译器优化（React Compiler）的引入，某些模式可能会继续演进。但核心原则不会改变：关注点分离、单一职责、组合优于继承、以及保持 API 的简洁性。掌握这些模式的本质思想，你就能在任何新框架或新范式中快速适应。'
          : 'With the introduction of React Server Components and new compiler optimizations (React Compiler), some patterns may continue to evolve. But the core principles remain unchanged: separation of concerns, single responsibility, composition over inheritance, and keeping APIs simple. Master the underlying ideas behind these patterns, and you will adapt quickly to any new framework or paradigm.'}
      </p>

      {/* Recommended Resources */}
      <h2 style={h2Style}>{isZh ? '推荐学习资源' : 'Recommended Resources'}</h2>
      <ul style={ulStyle}>
        <li><strong>React Official Docs:</strong> {isZh ? 'react.dev 的"Thinking in React"和"Reusing Logic with Custom Hooks"章节是理解模式思想的最佳起点。' : 'The "Thinking in React" and "Reusing Logic with Custom Hooks" sections on react.dev are the best starting point for understanding pattern philosophy.'}</li>
        <li><strong>Patterns.dev:</strong> {isZh ? '由 Lydia Hallie 和 Addy Osmani 维护的免费资源，提供交互式的设计模式和渲染模式讲解。' : 'A free resource maintained by Lydia Hallie and Addy Osmani with interactive explanations of design and rendering patterns.'}</li>
        <li><strong>XState:</strong> {isZh ? '如果你对状态机感兴趣，XState 提供了可视化编辑器和完整的有限状态机实现。' : 'If state machines interest you, XState provides a visual editor and complete finite state machine implementation.'}</li>
        <li><strong>Testing Library:</strong> {isZh ? '@testing-library/react 的文档展示了如何以用户为中心的方式测试各种模式。' : 'The @testing-library/react docs demonstrate how to test various patterns in a user-centric way.'}</li>
      </ul>
      <p style={pStyle}>
        {isZh
          ? '设计模式是经验的结晶。多读开源代码（如 Radix UI、Headless UI、React Query 的源码），观察这些成熟的库如何运用这些模式，是提升架构能力的最有效方法之一。'
          : 'Design patterns are distilled experience. Reading open source code from libraries like Radix UI, Headless UI, and React Query to observe how these mature libraries apply these patterns is one of the most effective ways to improve your architecture skills.'}
      </p>
    </>
  );
}
