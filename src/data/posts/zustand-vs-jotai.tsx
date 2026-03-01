'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Zustand vs Jotai: React State Management Comparison',
    intro: 'React state management has evolved significantly, with Zustand and Jotai emerging as modern alternatives to Redux. Zustand offers a simple, centralized store approach while Jotai provides atomic state management with minimal re-renders. This comparison examines their APIs, performance, and best use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Zustand uses a single store pattern similar to Redux but simpler. Jotai uses atomic state with automatic dependency tracking. Zustand is better for traditional app state; Jotai excels at fine-grained reactivity. Both are much smaller than Redux and require less boilerplate.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Zustand: ~1KB, single store, simple API',
    takeaway2: 'Jotai: ~2KB, atomic state, derived values built-in',
    takeaway3: 'Zustand uses hooks; Jotai uses atoms as primitives',
    takeaway4: 'Jotai minimizes re-renders with atomic subscriptions',
    takeaway5: 'Both support TypeScript out of the box',
    takeaway6: 'Zustand better for traditional Redux migration; Jotai for React-like mental model',
    
    whatIsZustandTitle: 'What is Zustand?',
    whatIsZustandContent: 'Zustand is a lightweight state management library using a simplified flux pattern. Created by Poimandres, it provides a single store with hooks-based access. The API is minimal: create a store, use hooks to access state and actions. It supports middleware, devtools, and persists out of the box.',
    
    whatIsJotaiTitle: 'What is Jotai?',
    whatIsJotaiContent: 'Jotai is an atomic state management library inspired by Recoil. It provides primitives called atoms that hold state. Components subscribe to specific atoms, and only re-render when those atoms change. Derived atoms allow computed values with automatic dependency tracking.',
    
    performanceTitle: 'Performance Characteristics',
    performanceIntro: 'How each handles re-renders and state updates:',
    
    reRenderTitle: 'Re-render Behavior',
    reRenderIntro: 'When state changes, what re-renders:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'See how similar state patterns are implemented:',
    
    zustandExampleTitle: 'Zustand',
    jotaiExampleTitle: 'Jotai',
    
    derivedTitle: 'Derived State & Computed Values',
    derivedIntro: 'Handling computed and derived state:',
    
    persistenceTitle: 'Persistence & DevTools',
    persistenceIntro: 'State persistence and debugging support:',
    
    whenToUseTitle: 'When to Use Each Library',
    zustandBestFor: 'Use Zustand When:',
    jotaiBestFor: 'Use Jotai When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Both Zustand and Jotai are excellent modern alternatives to Redux. Zustand excels with its simple, familiar API and is ideal for teams transitioning from Redux or those who prefer a single store pattern. Jotai shines with its atomic approach, perfect for applications needing fine-grained reactivity and complex derived state. Choose based on your teams mental model preference: centralized store vs atomic primitives.',
    
    faq1q: 'Can I use Zustand and Jotai together?',
    faq1a: 'Yes, you can use both in the same project. Use Zustand for global app state and Jotai for component-specific atomic state. They work well together without conflicts.',
    
    faq2q: 'Which is better for large applications?',
    faq2a: 'Both scale well. Zustand with slices pattern handles large state trees. Jotai atoms naturally organize into features. For very large apps, Zustand might be simpler to reason about.',
    
    faq3q: 'How do they compare to Redux?',
    faq3a: 'Both are simpler than Redux with less boilerplate. Zustand is closest to Redux patterns but simpler. Jotai is fundamentally different with atomic state. Both are smaller and faster than Redux.',
    
    faq4q: 'Do they support async operations?',
    faq4a: 'Yes, both support async. Zustand handles async in actions directly. Jotai provides async atoms that suspend or use loading states automatically.',
    
    faq5q: 'What about React Server Components?',
    faq5a: 'Both work with RSC but differently. Zustand stores must be created on client. Jotai atoms can be defined statically but state lives on client. Neither supports server-side state out of the box.',
    
    faq6q: 'How is TypeScript support?',
    faq6a: 'Both have excellent TypeScript support. Zustand infers types from initial state. Jotai atoms are typed by default. TypeScript users will feel at home with either.',
    
    faq7q: 'Can I persist state to localStorage?',
    faq7a: 'Yes, both support persistence. Zustand has a persist middleware. Jotai provides atomWithStorage. Both support custom storage backends.',
    
    faq8q: 'Which has better devtools?',
    faq8a: 'Zustand has a Redux DevTools integration via middleware. Jotai has its own devtools extension. Both provide good debugging experiences, though Zustand benefits from existing Redux tooling.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Zustand vs Jotai：React 状态管理对比',
    intro: 'React 状态管理已显著演进，Zustand 和 Jotai 成为 Redux 的现代替代品。Zustand 提供简单、集中的存储方法，而 Jotai 提供最小化重渲染的原子状态管理。本比较考察它们的 API、性能和最佳用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Zustand 使用类似 Redux 的单一存储模式但更简单。Jotai 使用原子状态和自动依赖跟踪。Zustand 更适合传统应用状态；Jotai 在细粒度响应性方面表现出色。两者都比 Redux 小得多，需要的样板代码更少。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Zustand：约1KB，单一存储，简单API',
    takeaway2: 'Jotai：约2KB，原子状态，内置派生值',
    takeaway3: 'Zustand 使用 hooks；Jotai 使用原子作为原语',
    takeaway4: 'Jotai 通过原子订阅最小化重渲染',
    takeaway5: '两者都开箱即用支持 TypeScript',
    takeaway6: 'Zustand 更适合传统 Redux 迁移；Jotai 适合类 React 心智模型',
    
    whatIsZustandTitle: '什么是 Zustand？',
    whatIsZustandContent: 'Zustand 是一个使用简化 flux 模式的轻量级状态管理库。由 Poimandres 创建，它提供基于 hooks 访问的单一存储。API 极简：创建存储，使用 hooks 访问状态和操作。它开箱即用支持中间件、devtools 和持久化。',
    
    whatIsJotaiTitle: '什么是 Jotai？',
    whatIsJotaiContent: 'Jotai 是受 Recoil 启发的原子状态管理库。它提供称为 atom 的原语来保存状态。组件订阅特定 atom，只有当这些 atom 变化时才重渲染。派生 atom 允许通过自动依赖跟踪计算值。',
    
    performanceTitle: '性能特性',
    performanceIntro: '各自如何处理重渲染和状态更新：',
    
    reRenderTitle: '重渲染行为',
    reRenderIntro: '当状态变化时，什么会重渲染：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '查看类似状态模式的实现方式：',
    
    zustandExampleTitle: 'Zustand',
    jotaiExampleTitle: 'Jotai',
    
    derivedTitle: '派生状态与计算值',
    derivedIntro: '处理计算和派生状态：',
    
    persistenceTitle: '持久化与 DevTools',
    persistenceIntro: '状态持久化和调试支持：',
    
    whenToUseTitle: '何时使用每个库',
    zustandBestFor: '使用 Zustand 的场景：',
    jotaiBestFor: '使用 Jotai 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Zustand 和 Jotai 都是 Redux 的优秀现代替代品。Zustand 以其简单、熟悉的 API 脱颖而出，非常适合从 Redux 过渡或喜欢单一存储模式的团队。Jotai 以其原子方法著称，非常适合需要细粒度响应性和复杂派生状态的应用。根据团队的心智模型偏好选择：集中存储 vs 原子原语。',
    
    faq1q: '我可以同时使用 Zustand 和 Jotai 吗？',
    faq1a: '可以，你可以在同一个项目中使用两者。Zustand 用于全局应用状态，Jotai 用于组件特定的原子状态。它们可以很好地协同工作而不冲突。',
    
    faq2q: '哪个更适合大型应用？',
    faq2a: '两者都能很好地扩展。Zustand 通过 slices 模式处理大型状态树。Jotai atoms 自然地按功能组织。对于非常大的应用，Zustand 可能更容易理解。',
    
    faq3q: '它们与 Redux 相比如何？',
    faq3a: '两者都比 Redux 更简单，样板代码更少。Zustand 最接近 Redux 模式但更简单。Jotai 与原子状态根本不同。两者都比 Redux 更小更快。',
    
    faq4q: '它们支持异步操作吗？',
    faq4a: '是的，两者都支持异步。Zustand 直接在 actions 中处理异步。Jotai 提供自动挂起或使用加载状态的异步 atoms。',
    
    faq5q: 'React Server Components 支持如何？',
    faq5a: '两者都适用于 RSC 但方式不同。Zustand stores 必须在客户端创建。Jotai atoms 可以静态定义但状态在客户端。两者都不支持开箱即用的服务端状态。',
    
    faq6q: 'TypeScript 支持如何？',
    faq6a: '两者都有出色的 TypeScript 支持。Zustand 从初始状态推断类型。Jotai atoms 默认就是类型化的。TypeScript 用户会对两者都感到满意。',
    
    faq7q: '我可以将状态持久化到 localStorage 吗？',
    faq7a: '是的，两者都支持持久化。Zustand 有 persist 中间件。Jotai 提供 atomWithStorage。两者都支持自定义存储后端。',
    
    faq8q: '哪个有更好的 devtools？',
    faq8a: 'Zustand 通过中间件集成 Redux DevTools。Jotai 有自己的 devtools 扩展。两者都提供良好的调试体验，尽管 Zustand 受益于现有的 Redux 工具。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ZustandVsJotai({ lang }: { lang: string }) {
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

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

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>
      
      <h3 style={h3Style}>{ct.whatIsZustandTitle}</h3>
      <p style={pStyle}>{ct.whatIsZustandContent}</p>

      <h3 style={h3Style}>{ct.whatIsJotaiTitle}</h3>
      <p style={pStyle}>{ct.whatIsJotaiContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Zustand</th>
              <th style={thStyle}>Jotai</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '包大小' : 'Bundle Size', '~1KB', '~2KB'],
              [isZh ? '状态模式' : 'State Model', 'Single store', 'Atomic'],
              [isZh ? 'API风格' : 'API Style', 'Hooks', 'Atoms + Hooks'],
              [isZh ? '派生状态' : 'Derived State', 'Selectors', 'Derived atoms'],
              [isZh ? '重渲染优化' : 'Re-render Opt', 'Selectors', 'Built-in'],
              [isZh ? '中间件' : 'Middleware', 'Yes', 'Via plugins'],
              [isZh ? 'DevTools' : 'DevTools', 'Redux DevTools', 'Jotai DevTools'],
            ].map(([feature, zustand, jotai], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{zustand}</td>
                <td style={{ ...tdStyle, color: '#ec4899' }}>{jotai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.reRenderTitle}</h3>
      <p style={pStyle}>{ct.reRenderIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>Zustand</th>
              <th style={thStyle}>Jotai</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '单一值更新' : 'Single value update', 'With selector: 1 component', '1 component'],
              [isZh ? '多值更新' : 'Multiple values update', 'With selectors: affected only', 'Affected atoms only'],
              [isZh ? '对象属性更新' : 'Object property update', 'Needs shallow compare', 'Automatic'],
              [isZh ? '数组元素更新' : 'Array element update', 'Needs selector', 'Automatic'],
              [isZh ? '派生值重计算' : 'Derived recalc', 'Manual memo', 'Automatic deps'],
            ].map(([scenario, zustand, jotai], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{zustand}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{jotai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Zustand</th>
              <th style={thStyle}>Jotai</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '状态持久化' : 'Persistence', 'persist middleware', 'atomWithStorage'],
              [isZh ? '时间旅行' : 'Time Travel', 'Via DevTools', 'Via DevTools'],
              [isZh ? '异步支持' : 'Async Support', 'In actions', 'Async atoms'],
              [isZh ? '计算值' : 'Computed', 'Selectors', 'Derived atoms'],
              [isZh ? '状态分片' : 'State Slices', 'Slice pattern', 'Atom groups'],
              [isZh ? 'React Native' : 'React Native', 'Yes', 'Yes'],
              [isZh ? '测试友好' : 'Testing', 'Easy reset', 'Reset atoms'],
              [isZh ? 'Context集成' : 'Context', 'Optional', 'Provider scope'],
            ].map(([feature, zustand, jotai], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{zustand}</td>
                <td style={{ ...tdStyle, color: '#ec4899' }}>{jotai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.zustandExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// store/useStore.ts
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface State {
  users: User[];
  loading: boolean;
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        users: [],
        loading: false,

        addUser: (user) => set((state) => ({
          users: [...state.users, user]
        })),

        removeUser: (id) => set((state) => ({
          users: state.users.filter(u => u.id !== id)
        })),

        fetchUsers: async () => {
          set({ loading: true });
          const res = await fetch('/api/users');
          const users = await res.json();
          set({ users, loading: false });
        },
      }),
      { name: 'user-storage' }
    )
  )
);

// Component usage
function UserList() {
  // Selector prevents unnecessary re-renders
  const users = useUserStore(state => state.users);
  const addUser = useUserStore(state => state.addUser);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => addUser({ id: '1', name: 'New', email: 'new@test.com' })}>
        Add User
      </button>
    </div>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#ec4899' }}>{ct.jotaiExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// atoms/userAtoms.ts
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface User {
  id: string;
  name: string;
  email: string;
}

// Base atoms
const usersAtom = atomWithStorage<User[]>('users', []);
const loadingAtom = atom(false);

// Derived atom - automatically tracks dependencies
const userCountAtom = atom((get) => get(usersAtom).length);

// Write-only atom for adding user
const addUserAtom = atom(null, (get, set, user: User) => {
  set(usersAtom, [...get(usersAtom), user]);
});

// Async atom for fetching
const fetchUsersAtom = atom(null, async (get, set) => {
  set(loadingAtom, true);
  const res = await fetch('/api/users');
  const users = await res.json();
  set(usersAtom, users);
  set(loadingAtom, false);
});

// Component usage
function UserList() {
  const users = useAtomValue(usersAtom);
  const userCount = useAtomValue(userCountAtom);
  const addUser = useSetAtom(addUserAtom);

  return (
    <div>
      <p>Total: {userCount}</p>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => addUser({ id: '1', name: 'New', email: 'new@test.com' })}>
        Add User
      </button>
    </div>
  );
}`}</code></pre>

      <h2 style={h2Style}>{ct.derivedTitle}</h2>
      <p style={pStyle}>{ct.derivedIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Zustand - Selectors</strong>
          <pre style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>{`// Manual memoization with selectors
const activeUsers = useUserStore(
  state => state.users.filter(u => u.active),
  (a, b) => a.length === b.length // shallow compare
);

// Or use zustand's shallow compare
import { shallow } from 'zustand/shallow';
const { users, loading } = useUserStore(
  state => ({ users: state.users, loading: state.loading }),
  shallow
);`}</pre>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ec4899' }}>
          <strong style={{ color: '#ec4899' }}>Jotai - Derived Atoms</strong>
          <pre style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>{`// Automatic dependency tracking
const activeUsersAtom = atom((get) => 
  get(usersAtom).filter(u => u.active)
);

// Composed derived atoms
const statsAtom = atom((get) => ({
  total: get(usersAtom).length,
  active: get(activeUsersAtom).length,
  inactive: get(usersAtom).length - get(activeUsersAtom).length,
}));`}</pre>
        </div>
      </div>

      <h2 style={h2Style}>{ct.persistenceTitle}</h2>
      <p style={pStyle}>{ct.persistenceIntro}</p>

      <pre style={codeStyle}><code>{`// Zustand persistence
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((s) => ({ count: s.count + 1 })),
    }),
    {
      name: 'my-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ count: state.count }),
    }
  )
);

// Jotai persistence
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const countAtom = atomWithStorage('count', 0, createJSONStorage(() => localStorage));`}</code></pre>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.zustandBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '从 Redux 迁移' : 'Migrating from Redux'}</li>
            <li>{isZh ? '单一存储偏好' : 'Single store preference'}</li>
            <li>{isZh ? '简单应用状态' : 'Simple app state'}</li>
            <li>{isZh ? '熟悉 flux 模式' : 'Familiar with flux pattern'}</li>
            <li>{isZh ? '需要中间件' : 'Need middleware support'}</li>
            <li>{isZh ? '最小学习曲线' : 'Minimal learning curve'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ec4899' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ec4899' }}>{ct.jotaiBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂派生状态' : 'Complex derived state'}</li>
            <li>{isZh ? '细粒度响应性' : 'Fine-grained reactivity'}</li>
            <li>{isZh ? '类 React 心智模型' : 'React-like mental model'}</li>
            <li>{isZh ? '原子化状态需求' : 'Atomic state needs'}</li>
            <li>{isZh ? '自动依赖跟踪' : 'Automatic dep tracking'}</li>
            <li>{isZh ? 'Suspense集成' : 'Suspense integration'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
      </div>

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
