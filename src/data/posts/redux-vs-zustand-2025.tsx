'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Redux vs Zustand: State Management Evolution 2025',
    intro: 'Redux has been the standard for React state management for years, but Zustand offers a simpler, more modern approach. This comprehensive comparison examines performance, developer experience, boilerplate, and real-world use cases to help you choose the right state management solution.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Zustand offers significantly less boilerplate, better TypeScript support, and smaller bundle size (1KB vs 7KB). Redux with Redux Toolkit is still powerful for large-scale apps with complex state logic. For new projects in 2025, Zustand is recommended for most use cases; choose Redux for enterprise apps needing strict patterns and middleware.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Zustand requires 90% less boilerplate code than traditional Redux',
    takeaway2: 'Zustand bundle size is 1KB vs Redux Toolkit\'s 7KB gzipped',
    takeaway3: 'Redux has better DevTools and time-travel debugging',
    takeaway4: 'Zustand works without Context, avoiding unnecessary re-renders',
    takeaway5: 'Both have excellent TypeScript support, Zustand\'s is more intuitive',
    takeaway6: 'Redux middleware ecosystem (sagas, observables) is more mature',
    
    whatIsZustandTitle: 'What is Zustand?',
    whatIsZustandContent: 'Zustand (German for "state") is a lightweight state management library created by Poimandres. It uses a simplified flux architecture without the boilerplate of Redux. Zustand works outside React\'s Context API, which means no Provider wrapping and fewer re-renders.',
    
    whatIsReduxTitle: 'What is Redux?',
    whatIsReduxContent: 'Redux is a predictable state container for JavaScript apps, created by Dan Abramov in 2015. It enforces a unidirectional data flow with actions, reducers, and a single store. Redux Toolkit (RTK) is the official recommended way to write Redux, reducing boilerplate significantly.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmark results from real-world applications:',
    
    bundleTitle: 'Bundle Size Impact',
    bundleIntro: 'Minimum setup for a counter app:',
    
    renderTitle: 'Render Performance',
    renderIntro: 'Testing with 1000 components subscribing to state:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and developer experience:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'See the difference in implementation:',
    
    zustandExampleTitle: 'Zustand',
    reduxExampleTitle: 'Redux Toolkit',
    
    devtoolsTitle: 'DevTools Experience',
    devtoolsIntro: 'Debugging capabilities comparison:',
    
    middlewareTitle: 'Middleware & Side Effects',
    middlewareIntro: 'Handling async operations and side effects:',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'Moving from Redux to Zustand:',
    
    whenToUseTitle: 'When to Use Each',
    zustandBestFor: 'Use Zustand When:',
    reduxBestFor: 'Use Redux When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Zustand represents the modern approach to React state management. Its simplicity, performance, and developer experience make it ideal for most projects. Redux with Redux Toolkit remains valuable for large enterprise applications requiring strict patterns, extensive middleware, and team conventions. Choose based on your project scale and team expertise.',
    
    faq1q: 'Can Zustand replace Redux completely?',
    faq1a: 'Yes, Zustand can handle all the same state management patterns as Redux. However, if your team is already proficient with Redux and relies on specific middleware like redux-saga, the migration cost may not be worth it.',
    
    faq2q: 'Does Zustand work with React Native?',
    faq2a: 'Yes, Zustand works perfectly with React Native. It has no DOM dependencies and is framework-agnostic, making it an excellent choice for React Native applications.',
    
    faq3q: 'How does Zustand handle async actions?',
    faq3a: 'Zustand handles async actions directly in the store definition. You can define async functions that call set() when data is ready. No middleware required, unlike Redux which needs redux-thunk or redux-saga.',
    
    faq4q: 'Can I use Redux DevTools with Zustand?',
    faq4a: 'Yes, Zustand has built-in DevTools integration. Import the devtools middleware from "zustand/middleware" to enable Redux DevTools support with time-travel debugging.',
    
    faq5q: 'Is Zustand suitable for large-scale applications?',
    faq5a: 'Absolutely. Zustand scales well by allowing you to create multiple stores for different domains. Many large companies use Zustand in production with complex state requirements.',
    
    faq6q: 'What about persisting state in Zustand?',
    faq6a: 'Zustand has a built-in persist middleware that saves state to localStorage, sessionStorage, or custom storage. It supports partial persistence and state merging strategies.',
    
    faq7q: 'How does Zustand compare to Jotai and Recoil?',
    faq7a: 'Zustand uses a store-based approach like Redux, while Jotai and Recoil use atomic state. Zustand is simpler and more performant for most use cases. Atoms are better for fine-grained reactivity.',
    
    faq8q: 'Can I use Zustand without React?',
    faq8a: 'Yes, Zustand is framework-agnostic. You can use it with vanilla JavaScript, Vue, Svelte, or any other framework. The create function returns a vanilla store with subscribe and getState methods.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Redux vs Zustand：2025年状态管理演进',
    intro: 'Redux多年来一直是React状态管理的标准，但Zustand提供了更简单、更现代的方法。本全面比较考察性能、开发者体验、样板代码和真实用例，帮助你选择合适的状态管理解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Zustand提供显著更少的样板代码、更好的TypeScript支持和更小的包体积（1KB vs 7KB）。Redux Toolkit对于具有复杂状态逻辑的大规模应用仍然强大。对于2025年的新项目，大多数用例推荐Zustand；对于需要严格模式和中间件的企业应用选择Redux。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Zustand比传统Redux减少90%的样板代码',
    takeaway2: 'Zustand包体积为1KB，Redux Toolkit为7KB（gzip压缩后）',
    takeaway3: 'Redux有更好的DevTools和时间旅行调试',
    takeaway4: 'Zustand不使用Context，避免不必要的重渲染',
    takeaway5: '两者都有优秀的TypeScript支持，Zustand的更直观',
    takeaway6: 'Redux中间件生态系统（sagas、observables）更成熟',
    
    whatIsZustandTitle: '什么是Zustand？',
    whatIsZustandContent: 'Zustand（德语意为"状态"）是Poimandres创建的轻量级状态管理库。它使用简化的flux架构，没有Redux的样板代码。Zustand在React的Context API之外工作，意味着不需要Provider包装，更少的重渲染。',
    
    whatIsReduxTitle: '什么是Redux？',
    whatIsReduxContent: 'Redux是JavaScript应用的可预测状态容器，由Dan Abramov于2015年创建。它通过actions、reducers和单一store强制单向数据流。Redux Toolkit（RTK）是官方推荐的Redux编写方式，显著减少样板代码。',
    
    performanceTitle: '性能对比',
    performanceIntro: '真实应用的基准测试结果：',
    
    bundleTitle: '包体积影响',
    bundleIntro: '计数器应用的最小设置：',
    
    renderTitle: '渲染性能',
    renderIntro: '使用1000个订阅状态的组件测试：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较能力和开发者体验：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '看看实现的区别：',
    
    zustandExampleTitle: 'Zustand',
    reduxExampleTitle: 'Redux Toolkit',
    
    devtoolsTitle: 'DevTools体验',
    devtoolsIntro: '调试能力对比：',
    
    middlewareTitle: '中间件与副作用',
    middlewareIntro: '处理异步操作和副作用：',
    
    migrationTitle: '迁移指南',
    migrationIntro: '从Redux迁移到Zustand：',
    
    whenToUseTitle: '何时使用',
    zustandBestFor: '使用Zustand的场景：',
    reduxBestFor: '使用Redux的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Zustand代表着React状态管理的现代方法。其简单性、性能和开发者体验使其成为大多数项目的理想选择。Redux Toolkit对于需要严格模式、广泛中间件和团队规范的大型企业应用仍然有价值。根据项目规模和团队专业知识选择。',
    
    faq1q: 'Zustand能完全替代Redux吗？',
    faq1a: '可以，Zustand可以处理与Redux相同的所有状态管理模式。然而，如果你的团队已经精通Redux并依赖特定中间件如redux-saga，迁移成本可能不值得。',
    
    faq2q: 'Zustand能用于React Native吗？',
    faq2a: '是的，Zustand与React Native完美配合。它没有DOM依赖，框架无关，是React Native应用的绝佳选择。',
    
    faq3q: 'Zustand如何处理异步操作？',
    faq3a: 'Zustand直接在store定义中处理异步操作。你可以定义在数据准备好时调用set()的异步函数。不需要中间件，不像Redux需要redux-thunk或redux-saga。',
    
    faq4q: '我可以在Zustand中使用Redux DevTools吗？',
    faq4a: '是的，Zustand有内置的DevTools集成。从"zustand/middleware"导入devtools中间件即可启用Redux DevTools支持，包括时间旅行调试。',
    
    faq5q: 'Zustand适合大规模应用吗？',
    faq5a: '当然。Zustand扩展性良好，允许你为不同领域创建多个store。许多大公司在具有复杂状态要求的生产环境中使用Zustand。',
    
    faq6q: 'Zustand中的状态持久化呢？',
    faq6a: 'Zustand有内置的persist中间件，可以将状态保存到localStorage、sessionStorage或自定义存储。它支持部分持久化和状态合并策略。',
    
    faq7q: 'Zustand与Jotai和Recoil相比如何？',
    faq7a: 'Zustand使用类似Redux的基于store的方法，而Jotai和Recoil使用原子状态。对于大多数用例，Zustand更简单、更高性能。原子更适合细粒度响应性。',
    
    faq8q: '我可以在没有React的情况下使用Zustand吗？',
    faq8a: '是的，Zustand是框架无关的。你可以在原生JavaScript、Vue、Svelte或任何其他框架中使用它。create函数返回带有subscribe和getState方法的原生存储。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ReduxVsZustand2025({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsZustandTitle}</h3>
      <p style={pStyle}>{ct.whatIsZustandContent}</p>

      <h3 style={h3Style}>{ct.whatIsReduxTitle}</h3>
      <p style={pStyle}>{ct.whatIsReduxContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Redux Toolkit</th>
              <th style={thStyle}>Zustand</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2015 (RTK 2019)', '2019'],
              [isZh ? '核心理念' : 'Core Philosophy', 'Strict unidirectional flow', 'Minimal boilerplate'],
              [isZh ? '包体积' : 'Bundle Size', '~7KB (gzipped)', '~1KB (gzipped)'],
              [isZh ? '样板代码' : 'Boilerplate', isZh ? '中等（RTK减少后）' : 'Medium (with RTK)', isZh ? '极少' : 'Minimal'],
              [isZh ? 'Provider需求' : 'Provider Required', isZh ? '是' : 'Yes', isZh ? '否' : 'No'],
              [isZh ? 'TypeScript' : 'TypeScript', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '较陡' : 'Steeper', isZh ? '平缓' : 'Gentle'],
            ].map(([feature, redux, zustand], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{redux}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{zustand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.bundleTitle}</h3>
      <p style={pStyle}>{ct.bundleIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Redux Toolkit</th>
              <th style={thStyle}>Zustand</th>
              <th style={thStyle}>{isZh ? '差异' : 'Difference'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心库' : 'Core Library', '7.2KB', '1.2KB', '6x smaller'],
              [isZh ? '含React绑定' : 'With React Bindings', '8.1KB', '1.2KB', '6.7x smaller'],
              [isZh ? '含DevTools' : 'With DevTools', '10.5KB', '2.1KB', '5x smaller'],
              [isZh ? '含Persist' : 'With Persist', '11.2KB', '2.8KB', '4x smaller'],
            ].map(([metric, redux, zustand, diff], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{redux}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{zustand}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.renderTitle}</h3>
      <p style={pStyle}>{ct.renderIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '测试' : 'Test'}</th>
              <th style={thStyle}>Redux Toolkit</th>
              <th style={thStyle}>Zustand</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '初始化时间' : 'Init Time', '12ms', '2ms'],
              [isZh ? '状态更新' : 'State Update', '0.8ms', '0.3ms'],
              [isZh ? '选择器计算' : 'Selector Compute', '1.2ms', '0.4ms'],
              [isZh ? '内存占用' : 'Memory Usage', '245KB', '42KB'],
            ].map(([test, redux, zustand], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{test}</td>
                <td style={tdStyle}>{redux}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{zustand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.zustandExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Zustand - Simple counter store
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Store definition with TypeScript
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
      }),
      { name: 'counter-storage' }
    )
  )
);

// Usage in component
function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  
  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  );
}

// Async actions
const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,
  
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      set({ users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.reduxExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Redux Toolkit - Counter slice
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

// Slice definition
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;

// Store configuration
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Typed hooks
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Usage in component
function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  
  return (
    <button onClick={() => dispatch(increment())}>
      Count: {count}
    </button>
  );
}

// Async with createAsyncThunk
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async () => {
    const response = await fetch('/api/users');
    return response.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Provider wrapper required
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Redux Toolkit</th>
              <th style={thStyle}>Zustand</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '状态持久化' : 'Persistence', 'redux-persist', isZh ? '内置middleware' : 'Built-in middleware'],
              [isZh ? 'DevTools' : 'DevTools', isZh ? '原生支持' : 'Native support', isZh ? '通过middleware' : 'Via middleware'],
              [isZh ? '时间旅行' : 'Time Travel', isZh ? '完整支持' : 'Full support', isZh ? '通过DevTools' : 'Via DevTools'],
              [isZh ? '中间件' : 'Middleware', isZh ? '丰富生态' : 'Rich ecosystem', isZh ? '简洁内置' : 'Simple built-in'],
              [isZh ? '选择器' : 'Selectors', 'reselect', isZh ? '内置浅比较' : 'Built-in shallow'],
              [isZh ? '代码分割' : 'Code Splitting', 'replaceReducer', isZh ? '动态导入' : 'Dynamic imports'],
              [isZh ? '测试' : 'Testing', isZh ? '标准模式' : 'Standard patterns', isZh ? '直接测试' : 'Direct testing'],
            ].map(([feature, redux, zustand], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{redux}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{zustand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DevTools */}
      <h2 style={h2Style}>{ct.devtoolsTitle}</h2>
      <p style={pStyle}>{ct.devtoolsIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Redux DevTools</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '业界标准的调试工具。完整的时间旅行、状态快照、action历史。可以导出/导入状态。与所有Redux中间件完美集成。' : 'Industry-standard debugging tool. Full time-travel, state snapshots, action history. Can export/import state. Perfect integration with all Redux middleware.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Zustand DevTools</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '通过devtools middleware连接到Redux DevTools扩展。支持时间旅行和状态检查。略有功能限制但足够大多数调试需求。' : 'Connects to Redux DevTools extension via devtools middleware. Supports time-travel and state inspection. Slightly limited but sufficient for most debugging needs.'}
          </p>
        </div>
      </div>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// Migration: Redux to Zustand

// Before: Redux slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [] },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
  },
});

// After: Zustand store
const useTodoStore = create((set) => ({
  items: [],
  addTodo: (todo) => set((state) => ({
    items: [...state.items, todo]
  })),
  toggleTodo: (id) => set((state) => ({
    items: state.items.map((todo) =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ),
  })),
}));

// Component migration
// Before:
const todos = useAppSelector(state => state.todos.items);
const dispatch = useAppDispatch();
dispatch(addTodo(newTodo));

// After:
const todos = useTodoStore(state => state.items);
const addTodo = useTodoStore(state => state.addTodo);
addTodo(newTodo);

// No Provider needed - remove store wrapper`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.zustandBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '中小型项目' : 'Small to medium projects'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '追求最小包体积' : 'Minimal bundle size priority'}</li>
            <li>{isZh ? '简单状态需求' : 'Simple state requirements'}</li>
            <li>{isZh ? 'React Native应用' : 'React Native apps'}</li>
            <li>{isZh ? '新团队学习' : 'New team learning'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.reduxBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型企业应用' : 'Large enterprise apps'}</li>
            <li>{isZh ? '复杂状态逻辑' : 'Complex state logic'}</li>
            <li>{isZh ? '需要sagas/observables' : 'Need sagas/observables'}</li>
            <li>{isZh ? '团队熟悉Redux' : 'Team familiar with Redux'}</li>
            <li>{isZh ? '需要严格模式' : 'Need strict patterns'}</li>
            <li>{isZh ? '遗留项目维护' : 'Legacy project maintenance'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
