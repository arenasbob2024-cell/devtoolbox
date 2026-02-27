'use client';

import React from 'react'

const translations = {
  en: {
    title: 'React Testing Guide 2026: RTL, Jest, Vitest, Playwright & E2E',
    description:
      'A comprehensive guide to testing React applications covering React Testing Library, Jest, Vitest, Mock Service Worker, async testing, hooks testing, Redux/Zustand state management testing, snapshot testing, Playwright and Cypress for end-to-end tests, and code coverage strategies.'
  },
  zh: {
    title: 'React 测试完整指南 2026：RTL、Jest、Vitest、Playwright 与端到端测试',
    description:
      '全面介绍 React 应用测试的完整指南，涵盖 React Testing Library、Jest、Vitest、Mock Service Worker、异步测试、Hook 测试、Redux/Zustand 状态管理测试、快照测试、Playwright 与 Cypress 端到端测试以及代码覆盖率策略。'
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between React Testing Library and Enzyme?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'React Testing Library (RTL) tests components from a user perspective by querying the DOM the way a user would — by role, label, or visible text. Enzyme tests implementation details like component state and lifecycle methods. RTL is the modern standard and aligns with the "test behavior, not implementation" philosophy. Enzyme is largely unmaintained for React 18+.'
      }
    },
    {
      '@type': 'Question',
      name: 'When should I use userEvent over fireEvent in React Testing Library?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prefer userEvent over fireEvent in almost all cases. userEvent simulates real browser interactions including hover, focus, keyboard navigation, and pointer events — just like a real user. fireEvent dispatches single synthetic events and can miss intermediate events (e.g., focus before a click). Use fireEvent only for low-level edge cases that userEvent does not support.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is Mock Service Worker (MSW) and why should I use it for API mocking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MSW intercepts network requests at the Service Worker level (in browser) or Node.js http module level (in tests). Unlike mocking fetch or axios directly, MSW lets your application code remain unchanged — the same handlers work for unit tests, integration tests, and local development. It produces more realistic tests because the actual HTTP stack is exercised up to the network boundary.'
      }
    },
    {
      '@type': 'Question',
      name: 'Should I use Jest or Vitest for React testing in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For new Vite-based projects, Vitest is the natural choice — it is faster, has native ESM support, and shares Vite\'s configuration. For Create React App or Next.js projects already using Jest, migration is optional but Vitest offers significantly faster test runs especially for large suites. Both support the same expect API so tests are portable.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I test custom React hooks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use renderHook from @testing-library/react. It renders a minimal component that calls your hook, exposes result.current for the return value, and act() to trigger updates. For hooks with context dependencies, pass a wrapper option with a provider component. Example: const { result } = renderHook(() => useCounter(0)); act(() => result.current.increment()); expect(result.current.count).toBe(1);'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the testing pyramid and how does it apply to React apps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The testing pyramid recommends many fast unit tests at the base, fewer integration tests in the middle, and a small number of slow E2E tests at the top. For React: unit tests cover individual components, utility functions, and hooks in isolation; integration tests cover feature slices with real component trees and mocked APIs; E2E tests with Playwright or Cypress cover critical user journeys end-to-end in a real browser.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I achieve good code coverage without over-testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Target 70-80% coverage as a guideline, not a goal. Focus on critical business logic, edge cases, and error paths. Avoid testing library code, trivial getters/setters, and auto-generated code. Use branch coverage (not just line coverage) to ensure conditional logic is exercised. Configure Istanbul/nyc thresholds in jest.config.js to fail CI when coverage drops below acceptable levels.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Playwright and Cypress for E2E testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Playwright supports Chromium, Firefox, and WebKit with a single API, runs tests in parallel natively, and has excellent TypeScript support. Cypress runs exclusively in a browser with a real-time interactive test runner great for debugging, but is limited to Chromium/Firefox and has weaker parallelism. Playwright is generally preferred for CI/CD pipelines; Cypress shines for local development and debugging complex interactions.'
      }
    }
  ]
}

export default function ReactTestingGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en
  const isZh = lang === 'zh'

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#0f172a',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '0.5rem',
    marginTop: '2.5rem'
  }
  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1e293b',
    marginTop: '1.75rem'
  }
  const pStyle: React.CSSProperties = {
    color: '#334155',
    lineHeight: 1.8,
    marginBottom: '1rem'
  }
  const codeStyle: React.CSSProperties = {
    background: '#0f172a',
    borderRadius: '8px',
    padding: '1.25rem 1.5rem',
    overflowX: 'auto',
    fontSize: '0.85rem',
    lineHeight: 1.7,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    color: '#e2e8f0',
    border: '1px solid #1e293b',
    margin: '1rem 0 1.5rem'
  }
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.92rem',
    margin: '1.5rem 0'
  }
  const thStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    padding: '0.6rem 1rem',
    textAlign: 'left',
    background: '#f1f5f9',
    fontWeight: 600,
    color: '#0f172a'
  }
  const tdStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    padding: '0.6rem 1rem',
    color: '#334155'
  }
  const tdAltStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    padding: '0.6rem 1rem',
    color: '#334155',
    background: '#f8fafc'
  }

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', fontFamily: 'system-ui, sans-serif', color: '#1e293b', lineHeight: 1.7 }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ color: '#0369a1', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</strong>
        <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#0c4a6e' }}>
          <li>Use React Testing Library (RTL) for component tests — query by role, label, and text like a real user</li>
          <li>Prefer <code>userEvent</code> over <code>fireEvent</code> for realistic interaction simulation</li>
          <li>Use MSW (Mock Service Worker) to mock API calls without touching application code</li>
          <li>Vitest is the modern choice for Vite projects; Jest remains dominant in Next.js / CRA ecosystems</li>
          <li>Test hooks with <code>renderHook</code> from <code>@testing-library/react</code></li>
          <li>Follow the testing pyramid: many unit tests, fewer integration tests, minimal E2E tests</li>
          <li>Use Playwright or Cypress for end-to-end tests against a running browser</li>
          <li>Aim for 70–80% meaningful coverage; enforce thresholds in CI via Istanbul/nyc</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Takeaways</strong>
        <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#334155' }}>
          <li>Tests are documentation — a well-named test tells you exactly what the component should do</li>
          <li>Test behavior, not implementation details; avoid testing internal state or private methods</li>
          <li>Async components require <code>waitFor</code>, <code>findBy*</code> queries, or <code>act()</code> wrappers</li>
          <li>Snapshot tests are best for stable UI components; avoid them for frequently changing layouts</li>
          <li>Integration tests with real Redux/Zustand stores are more valuable than mocking the store</li>
          <li>E2E tests should cover the critical user paths: login, checkout, core CRUD workflows</li>
        </ul>
      </div>

      {/* Introduction */}
      <p style={{ fontSize: '1.1rem', color: '#334155', marginBottom: '1.5rem' }}>
        {isZh
          ? 'React 测试生态系统在过去几年经历了快速演变。React Testing Library 已成为组件测试的事实标准，Vitest 的崛起重新定义了测试运行速度，而 Playwright 和 Cypress 则将端到端测试带入了主流。本指南将带你系统了解 React 应用测试的全貌——从单元测试到集成测试，再到端到端测试。'
          : 'The React testing ecosystem has evolved rapidly. React Testing Library has become the de facto standard for component testing, Vitest has redefined test execution speed, and Playwright and Cypress have brought end-to-end testing into the mainstream. This guide gives you a complete picture of testing React applications — from unit tests to integration tests to end-to-end tests — with practical code examples you can use in real projects.'}
      </p>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '测试金字塔：单元、集成与端到端测试' : 'The Testing Pyramid: Unit, Integration, and E2E Tests'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '测试金字塔是一个帮助团队平衡测试投资的框架。底层是大量快速的单元测试，中层是适量的集成测试，顶层是少量缓慢但高价值的端到端测试。'
          : 'The testing pyramid is a framework that helps teams balance their testing investment. At the base are many fast unit tests, in the middle are fewer integration tests, and at the top are a small number of slow but high-value end-to-end tests.'}
      </p>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '测试类型' : 'Test Type'}</th>
              <th style={thStyle}>{isZh ? '测试范围' : 'Scope'}</th>
              <th style={thStyle}>{isZh ? '速度' : 'Speed'}</th>
              <th style={thStyle}>{isZh ? '工具' : 'Tools'}</th>
              <th style={thStyle}>{isZh ? '数量比例' : 'Volume'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>{isZh ? '单元测试' : 'Unit'}</td>
              <td style={tdStyle}>{isZh ? '单一函数/组件' : 'Single function/component'}</td>
              <td style={tdStyle}>{isZh ? '极快（毫秒）' : 'Very fast (ms)'}</td>
              <td style={tdStyle}>Jest / Vitest + RTL</td>
              <td style={tdStyle}>70%</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '集成测试' : 'Integration'}</td>
              <td style={tdAltStyle}>{isZh ? '多个组件 + API 模拟' : 'Multiple components + mocked API'}</td>
              <td style={tdAltStyle}>{isZh ? '快（秒）' : 'Fast (seconds)'}</td>
              <td style={tdAltStyle}>Jest / Vitest + RTL + MSW</td>
              <td style={tdAltStyle}>20%</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? '端到端测试' : 'E2E'}</td>
              <td style={tdStyle}>{isZh ? '完整用户流程' : 'Full user journey'}</td>
              <td style={tdStyle}>{isZh ? '慢（分钟）' : 'Slow (minutes)'}</td>
              <td style={tdStyle}>Playwright / Cypress</td>
              <td style={tdStyle}>10%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={pStyle}>
        {isZh
          ? '对于 React 应用，单元测试覆盖独立的组件、工具函数和自定义 Hook；集成测试覆盖功能模块（如带有 API 调用的表单提交）；端到端测试覆盖核心用户路径（如登录流程、购物车结算）。'
          : 'For React applications: unit tests cover individual components, utility functions, and custom hooks in isolation; integration tests cover feature slices such as a form that makes API calls; E2E tests cover critical user journeys like login flows and checkout processes.'}
      </p>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? 'React Testing Library 核心理念与安装' : 'React Testing Library: Philosophy and Setup'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'React Testing Library (RTL) 基于一个核心原则："你的测试越像软件的真实使用方式，它们就越能给你信心。" 这意味着通过用户可见的元素（角色、标签、文本）查询 DOM，而不是组件内部状态或 CSS 类名。'
          : 'React Testing Library (RTL) is built on one core principle: "The more your tests resemble the way your software is used, the more confidence they can give you." This means querying the DOM through user-visible elements — roles, labels, text — rather than component internals, CSS classes, or test IDs.'}
      </p>

      <h3 style={h3Style}>{isZh ? '安装与配置' : 'Installation and Configuration'}</h3>
      <pre style={codeStyle}><code>{`# Install React Testing Library + Jest DOM matchers
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom

# For Vitest projects
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom vitest @vitest/coverage-v8 jsdom

# For Jest projects (Next.js, CRA)
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom jest jest-environment-jsdom`}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Jest 配置（jest.config.ts）' : 'Jest Configuration (jest.config.ts)'}</h3>
      <pre style={codeStyle}><code>{`import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/main.tsx',
  ],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;`}</code></pre>

      <pre style={codeStyle}><code>{`// jest.setup.ts
import '@testing-library/jest-dom';`}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Vitest 配置（vite.config.ts）' : 'Vitest Configuration (vite.config.ts)'}</h3>
      <pre style={codeStyle}><code>{`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 80,
        statements: 80,
      },
    },
  },
});`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '使用 render() 和 screen 查询渲染组件' : 'Rendering Components with render() and screen Queries'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'RTL 的 render() 函数将组件挂载到虚拟 DOM 中，screen 对象提供了多种查询方法来定位元素。查询方法有三种变体：getBy（找不到则立即报错）、queryBy（找不到返回 null）、findBy（异步等待出现）。'
          : 'RTL\'s render() function mounts a component into a virtual DOM, and the screen object provides various query methods to locate elements. Queries come in three variants: getBy (throws if not found), queryBy (returns null if not found), and findBy (async, waits for the element to appear).'}
      </p>

      <pre style={codeStyle}><code>{`// src/components/UserCard.tsx
interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export function UserCard({ user, onEdit }: { user: User; onEdit: () => void }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {user.role === 'admin' && <span>Admin</span>}
      <button onClick={onEdit}>Edit Profile</button>
    </div>
  );
}

// src/components/UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

const mockUser = { name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' as const };

test('renders user name and email', () => {
  render(<UserCard user={mockUser} onEdit={() => {}} />);

  // getBy* — throws if not found (use for elements that must exist)
  expect(screen.getByRole('heading', { name: 'Alice Johnson' })).toBeInTheDocument();
  expect(screen.getByText('alice@example.com')).toBeInTheDocument();
});

test('shows admin badge for admin users', () => {
  render(<UserCard user={mockUser} onEdit={() => {}} />);
  expect(screen.getByText('Admin')).toBeInTheDocument();
});

test('hides admin badge for regular users', () => {
  const regularUser = { ...mockUser, role: 'user' as const };
  render(<UserCard user={regularUser} onEdit={() => {}} />);

  // queryBy* — returns null if not found (use for elements that may not exist)
  expect(screen.queryByText('Admin')).not.toBeInTheDocument();
});

test('calls onEdit when Edit Profile button is clicked', async () => {
  const handleEdit = jest.fn();
  render(<UserCard user={mockUser} onEdit={handleEdit} />);

  // getByRole is the preferred query — matches accessible roles
  const button = screen.getByRole('button', { name: /edit profile/i });
  button.click();

  expect(handleEdit).toHaveBeenCalledTimes(1);
});`}</code></pre>

      <h3 style={h3Style}>{isZh ? '查询优先级' : 'Query Priority Guide'}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '查询方法' : 'Query'}</th>
              <th style={thStyle}>{isZh ? '用途' : 'Use For'}</th>
              <th style={thStyle}>{isZh ? '优先级' : 'Priority'}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>getByRole</td><td style={tdStyle}>{isZh ? '按 ARIA 角色查询（button、heading、textbox 等）' : 'ARIA roles (button, heading, textbox, etc.)'}</td><td style={tdStyle}>1st</td></tr>
            <tr><td style={tdAltStyle}>getByLabelText</td><td style={tdAltStyle}>{isZh ? '表单输入框（关联 label）' : 'Form inputs associated with labels'}</td><td style={tdAltStyle}>2nd</td></tr>
            <tr><td style={tdStyle}>getByPlaceholderText</td><td style={tdStyle}>{isZh ? '有 placeholder 的输入框' : 'Inputs with placeholder text'}</td><td style={tdStyle}>3rd</td></tr>
            <tr><td style={tdAltStyle}>getByText</td><td style={tdAltStyle}>{isZh ? '按可见文本内容查询' : 'Visible text content'}</td><td style={tdAltStyle}>4th</td></tr>
            <tr><td style={tdStyle}>getByDisplayValue</td><td style={tdStyle}>{isZh ? '当前值（input/select/textarea）' : 'Current value (input/select/textarea)'}</td><td style={tdStyle}>5th</td></tr>
            <tr><td style={tdAltStyle}>getByAltText</td><td style={tdAltStyle}>{isZh ? '图片 alt 属性' : 'Image alt attributes'}</td><td style={tdAltStyle}>6th</td></tr>
            <tr><td style={tdStyle}>getByTitle</td><td style={tdStyle}>{isZh ? 'title 属性' : 'title attribute'}</td><td style={tdStyle}>7th</td></tr>
            <tr><td style={tdAltStyle}>getByTestId</td><td style={tdAltStyle}>{isZh ? 'data-testid（最后手段）' : 'data-testid (last resort)'}</td><td style={tdAltStyle}>8th</td></tr>
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '触发用户事件：userEvent vs fireEvent' : 'Firing Events: userEvent vs fireEvent'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'userEvent 是测试用户交互的首选方式。它模拟真实浏览器行为，包括 pointer down/up、focus、blur 等中间事件。fireEvent 只发送单个合成事件，可能遗漏真实浏览器触发的中间步骤。'
          : 'userEvent is the preferred way to test user interactions. It simulates real browser behavior including pointer down/up, focus, blur, and other intermediate events that a real user would trigger. fireEvent only dispatches a single synthetic event and can miss the intermediate steps that real browsers fire.'}
      </p>

      <pre style={codeStyle}><code>{`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

// Always set up userEvent with userEvent.setup() for better control
const user = userEvent.setup();

test('submits login form with email and password', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  // userEvent.type() simulates real keystroke-by-keystroke typing
  await user.type(screen.getByLabelText(/email/i), 'alice@example.com');
  await user.type(screen.getByLabelText(/password/i), 'secret123');

  // userEvent.click() fires pointer events + focus + click
  await user.click(screen.getByRole('button', { name: /sign in/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'alice@example.com',
    password: 'secret123',
  });
});

test('clears input and types new value', async () => {
  render(<SearchInput />);
  const input = screen.getByRole('textbox');

  await user.type(input, 'first query');
  expect(input).toHaveValue('first query');

  // clear() empties the input before typing
  await user.clear(input);
  await user.type(input, 'second query');
  expect(input).toHaveValue('second query');
});

test('selects from dropdown', async () => {
  render(<CountrySelect />);
  await user.selectOptions(
    screen.getByRole('combobox', { name: /country/i }),
    'United States'
  );
  expect(screen.getByRole('combobox')).toHaveValue('US');
});

test('uploads a file', async () => {
  render(<FileUpload />);
  const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
  const input = screen.getByLabelText(/upload file/i);

  await user.upload(input, file);
  expect(input.files[0]).toBe(file);
});

// fireEvent: only for cases userEvent cannot handle
import { fireEvent } from '@testing-library/react';

test('handles scroll event', () => {
  render(<InfiniteList />);
  const list = screen.getByRole('list');
  fireEvent.scroll(list, { target: { scrollTop: 500 } });
  // Assert something happens on scroll
});`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '测试 React Hooks：renderHook 详解' : 'Testing React Hooks with renderHook'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'renderHook 允许在测试中直接调用和测试自定义 Hook，无需创建完整的组件。它会渲染一个最小化的包装组件来调用 Hook，通过 result.current 访问返回值，并用 act() 触发状态更新。'
          : 'renderHook lets you call and test custom hooks directly in tests without creating a full component. It renders a minimal wrapper component that calls your hook, exposes the return value through result.current, and uses act() to trigger state updates.'}
      </p>

      <pre style={codeStyle}><code>{`// src/hooks/useCounter.ts
import { useState, useCallback } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, decrement, reset };
}

// src/hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('initializes with provided value', () => {
  const { result } = renderHook(() => useCounter(10));
  expect(result.current.count).toBe(10);
});

test('increments count', () => {
  const { result } = renderHook(() => useCounter(0));
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
});

test('decrements count', () => {
  const { result } = renderHook(() => useCounter(5));
  act(() => {
    result.current.decrement();
  });
  expect(result.current.count).toBe(4);
});

test('resets to initial value', () => {
  const { result } = renderHook(() => useCounter(3));
  act(() => {
    result.current.increment();
    result.current.increment();
    result.current.reset();
  });
  expect(result.current.count).toBe(3);
});

// Testing hooks that use context
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from './useTheme';

test('useTheme reads from ThemeContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  );
  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.current.theme).toBe('dark');
});

// Testing async hooks
import { useUserData } from './useUserData';

test('fetches and returns user data', async () => {
  const { result } = renderHook(() => useUserData('user-123'));

  // Initially loading
  expect(result.current.loading).toBe(true);
  expect(result.current.user).toBeNull();

  // Wait for async update
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.user).toMatchObject({ id: 'user-123' });
});`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? 'Mocking：jest.mock() 与 Mock Service Worker' : 'Mocking: jest.mock() and Mock Service Worker (MSW)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '测试中的 Mock 有两种主要方式：jest.mock() 用于模块级别的模拟（如替换整个模块或函数），MSW 用于网络层模拟（拦截 HTTP 请求并返回模拟响应）。MSW 更接近真实行为，因为它不修改应用代码。'
          : 'Mocking in tests comes in two main flavors: jest.mock() for module-level mocking (replacing entire modules or functions), and MSW for network-layer mocking (intercepting HTTP requests and returning mocked responses). MSW produces more realistic tests because application code remains unchanged.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'jest.mock() 基础用法' : 'jest.mock() Basics'}</h3>
      <pre style={codeStyle}><code>{`// Mocking an entire module
jest.mock('../api/userService', () => ({
  fetchUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

import { fetchUser } from '../api/userService';
import { UserProfile } from './UserProfile';

test('displays user data after fetch', async () => {
  (fetchUser as jest.Mock).mockResolvedValue({
    id: '1',
    name: 'Bob Smith',
    email: 'bob@example.com',
  });

  render(<UserProfile userId="1" />);

  await screen.findByText('Bob Smith'); // findBy* is async
  expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  expect(fetchUser).toHaveBeenCalledWith('1');
});

test('shows error state when fetch fails', async () => {
  (fetchUser as jest.Mock).mockRejectedValue(new Error('Network error'));

  render(<UserProfile userId="1" />);

  await screen.findByText(/something went wrong/i);
});

// Mocking specific named exports
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    pathname: '/dashboard',
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/dashboard',
}));

// Mocking with factory and partial override
jest.mock('../utils/date', () => ({
  ...jest.requireActual('../utils/date'),
  getCurrentDate: jest.fn(() => new Date('2026-01-01')),
}));

// Mock timer functions
jest.useFakeTimers();
test('debounce waits before calling handler', () => {
  const handler = jest.fn();
  const debouncedHandler = debounce(handler, 300);

  debouncedHandler('a');
  debouncedHandler('b');
  debouncedHandler('c');

  expect(handler).not.toHaveBeenCalled();
  jest.advanceTimersByTime(300);
  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenCalledWith('c');
});
jest.useRealTimers();`}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Mock Service Worker (MSW) 配置' : 'Mock Service Worker (MSW) Setup'}</h3>
      <pre style={codeStyle}><code>{`# Install MSW
npm install --save-dev msw`}</code></pre>

      <pre style={codeStyle}><code>{`// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET /api/users/:id
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'admin',
    });
  }),

  // POST /api/users
  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { id: 'new-user-id', ...body },
      { status: 201 }
    );
  }),

  // Simulate error
  http.delete('/api/users/:id', () => {
    return HttpResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    );
  }),
];`}</code></pre>

      <pre style={codeStyle}><code>{`// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);`}</code></pre>

      <pre style={codeStyle}><code>{`// src/test/setup.ts (add to setupFiles in config)
import { server } from '../mocks/server';
import '@testing-library/jest-dom';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers()); // Reset per-test overrides
afterAll(() => server.close());`}</code></pre>

      <pre style={codeStyle}><code>{`// src/components/UserProfile.test.tsx
import { render, screen } from '@testing-library/react';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { UserProfile } from './UserProfile';

test('displays user profile from API', async () => {
  render(<UserProfile userId="42" />);

  // findBy* waits for the element to appear (async)
  expect(await screen.findByText('Alice Johnson')).toBeInTheDocument();
  expect(screen.getByText('alice@example.com')).toBeInTheDocument();
});

test('shows error when API returns 500', async () => {
  // Override handler for this test only
  server.use(
    http.get('/api/users/:id', () => {
      return HttpResponse.json({ error: 'Server Error' }, { status: 500 });
    })
  );

  render(<UserProfile userId="42" />);
  expect(await screen.findByText(/error loading profile/i)).toBeInTheDocument();
});`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? 'Vitest：Jest 的现代替代方案' : 'Vitest: The Modern Alternative to Jest'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Vitest 由 Vite 团队开发，与 Vite 共享配置，原生支持 ESM，测试速度通常比 Jest 快 2–5 倍。它与 Jest 的 API 完全兼容（相同的 describe/test/expect 语法），迁移成本极低。'
          : 'Vitest is built by the Vite team, shares Vite\'s configuration, has native ESM support, and typically runs 2–5x faster than Jest. It is fully API-compatible with Jest (same describe/test/expect syntax), making migration straightforward for projects already using Jest.'}
      </p>

      <pre style={codeStyle}><code>{`// vitest.config.ts — full configuration example
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,           // No need to import describe/test/expect
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/**/*.stories.tsx', 'src/main.tsx'],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});`}</code></pre>

      <pre style={codeStyle}><code>{`// Vitest-specific features
import { vi, describe, test, expect, beforeEach } from 'vitest';

// vi.fn() replaces jest.fn()
const mockFetch = vi.fn();

// vi.mock() replaces jest.mock()
vi.mock('../api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

// vi.spyOn() replaces jest.spyOn()
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

// Fake timers
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();

// Inline snapshots (Vitest supports these natively)
test('renders correctly', () => {
  const { container } = render(<Button label="Click me" />);
  expect(container).toMatchInlineSnapshot(\`
    <div>
      <button>Click me</button>
    </div>
  \`);
});

// Run tests in parallel with concurrent
describe.concurrent('parallel tests', () => {
  test('test 1', async () => { /* runs in parallel */ });
  test('test 2', async () => { /* runs in parallel */ });
});

// Bench testing (unique to Vitest)
import { bench } from 'vitest';
bench('sort array', () => {
  [3, 1, 2].sort();
});`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '测试异步组件与数据获取' : 'Testing Async Components and Data Fetching'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '异步组件（使用 useEffect + fetch、React Query、SWR 等）需要特殊处理。RTL 提供了 waitFor、findBy* 查询和 act() 来处理异步状态更新。'
          : 'Async components that use useEffect + fetch, React Query, SWR, or similar patterns require special handling. RTL provides waitFor, findBy* queries, and act() to handle asynchronous state updates.'}
      </p>

      <pre style={codeStyle}><code>{`// Testing a component with useEffect + fetch
import { render, screen, waitFor } from '@testing-library/react';

test('loads and displays posts list', async () => {
  render(<PostsList />);

  // Loading state appears first
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for async update (MSW will intercept the fetch)
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  // Alternatively, use findBy* which combines waitFor + getBy
  const posts = await screen.findAllByRole('listitem');
  expect(posts).toHaveLength(3);
});

// Testing React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },  // Disable retries for faster test failures
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

test('displays user list from React Query', async () => {
  render(<UserList />, { wrapper: createWrapper() });

  // React Query starts in loading state
  expect(screen.getByText(/loading users/i)).toBeInTheDocument();

  // MSW handles the API call, React Query caches the result
  const userItems = await screen.findAllByRole('article');
  expect(userItems).toHaveLength(5);
});

// Testing error boundaries
test('renders error boundary on fetch failure', async () => {
  // MSW already configured to return 500 for this route
  server.use(
    http.get('/api/posts', () => HttpResponse.error())
  );

  render(
    <ErrorBoundary fallback={<p>Failed to load</p>}>
      <PostsList />
    </ErrorBoundary>
  );

  expect(await screen.findByText('Failed to load')).toBeInTheDocument();
});

// waitFor with custom timeout and interval
await waitFor(
  () => expect(screen.getByTestId('chart')).toBeVisible(),
  { timeout: 5000, interval: 100 }
);`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '快照测试' : 'Snapshot Testing with Jest'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '快照测试捕获组件渲染输出并将其保存到文件中。后续测试运行时会与保存的快照对比，差异会导致测试失败。快照测试最适合稳定的展示型组件，不适合频繁变化的布局。'
          : 'Snapshot testing captures a component\'s rendered output and saves it to a file. Subsequent test runs compare against the saved snapshot, and any difference causes the test to fail. Snapshot tests are best for stable presentational components and should be avoided for frequently changing layouts.'}
      </p>

      <pre style={codeStyle}><code>{`// Basic snapshot test
import { render } from '@testing-library/react';
import { Badge } from './Badge';

test('Badge renders correctly', () => {
  const { container } = render(<Badge label="New" variant="success" />);
  expect(container.firstChild).toMatchSnapshot();
});

// Inline snapshot — snapshot stored in the test file itself
test('Badge inline snapshot', () => {
  const { container } = render(<Badge label="New" variant="success" />);
  expect(container.firstChild).toMatchInlineSnapshot(\`
    <span
      class="badge badge-success"
    >
      New
    </span>
  \`);
});

// Snapshot with serializer for better diffs
import { render } from '@testing-library/react';
import pretty from 'pretty-format';

test('renders with specific props', () => {
  const { baseElement } = render(
    <Modal title="Confirm Delete" isOpen={true}>
      Are you sure you want to delete this item?
    </Modal>
  );
  expect(pretty(baseElement.innerHTML)).toMatchSnapshot();
});

// Update snapshots when intentional change is made:
// jest --updateSnapshot  or  jest -u
// vitest --update-snapshots  or  vitest -u

// When to use snapshots:
// - Design system components (Button, Badge, Card)
// - Email templates
// - Static data transformations
// When NOT to use:
// - Components with dynamic dates/IDs
// - Complex interactive components
// - Components under active development`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '测试 Redux 和 Zustand 状态管理' : 'Testing Redux and Zustand State Management'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '测试状态管理时，最好使用真实的 store 而不是模拟它。这样可以测试组件与状态层的真实集成，避免假阳性测试。'
          : 'When testing state management, prefer using a real store rather than mocking it. This tests the genuine integration between your components and the state layer, avoiding false-positive tests that pass even when the real integration is broken.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Redux Toolkit 测试' : 'Testing with Redux Toolkit'}</h3>
      <pre style={codeStyle}><code>{`// src/store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, status: 'idle' as 'idle' | 'loading' },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Test the slice directly (pure function tests)
import { counterSlice } from './counterSlice';
const { increment, decrement, incrementByAmount } = counterSlice.actions;
const reducer = counterSlice.reducer;

describe('counterSlice', () => {
  test('increments value', () => {
    expect(reducer({ value: 5, status: 'idle' }, increment())).toEqual({
      value: 6, status: 'idle'
    });
  });

  test('increments by amount', () => {
    expect(reducer({ value: 0, status: 'idle' }, incrementByAmount(10))).toEqual({
      value: 10, status: 'idle'
    });
  });
});

// src/test/renderWithRedux.tsx — helper for component tests
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import { counterReducer } from '../store/counterSlice';
import type { RootState } from '../store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
}

export function renderWithRedux(
  ui: React.ReactElement,
  { preloadedState = {}, ...renderOptions }: ExtendedRenderOptions = {}
) {
  const store = configureStore({
    reducer: { counter: counterReducer },
    preloadedState,
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Component test with preloaded Redux state
import { renderWithRedux } from '../test/renderWithRedux';
import { Counter } from './Counter';

test('displays initial count from Redux store', () => {
  renderWithRedux(<Counter />, { preloadedState: { counter: { value: 42, status: 'idle' } } });
  expect(screen.getByText('42')).toBeInTheDocument();
});

test('increments count when button clicked', async () => {
  const { store } = renderWithRedux(<Counter />);
  await user.click(screen.getByRole('button', { name: /increment/i }));
  expect(store.getState().counter.value).toBe(1);
  expect(screen.getByText('1')).toBeInTheDocument();
});`}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Zustand 测试' : 'Testing with Zustand'}</h3>
      <pre style={codeStyle}><code>{`// src/store/useCartStore.ts
import { create } from 'zustand';

interface CartItem { id: string; name: string; price: number; quantity: number; }
interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  addItem: (item) => set((state) => {
    const existing = state.items.find(i => i.id === item.id);
    const items = existing
      ? state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...state.items, { ...item, quantity: 1 }];
    return { items, total: items.reduce((sum, i) => sum + i.price * i.quantity, 0) };
  }),
  removeItem: (id) => set((state) => {
    const items = state.items.filter(i => i.id !== id);
    return { items, total: items.reduce((sum, i) => sum + i.price * i.quantity, 0) };
  }),
  clearCart: () => set({ items: [], total: 0 }),
}));

// Testing Zustand store directly
import { act, renderHook } from '@testing-library/react';
import { useCartStore } from './useCartStore';

beforeEach(() => {
  // Reset store state between tests
  useCartStore.setState({ items: [], total: 0 });
});

test('adds item to cart', () => {
  const { result } = renderHook(() => useCartStore());
  act(() => {
    result.current.addItem({ id: 'p1', name: 'Widget', price: 9.99 });
  });
  expect(result.current.items).toHaveLength(1);
  expect(result.current.total).toBeCloseTo(9.99);
});

test('increments quantity for duplicate items', () => {
  const { result } = renderHook(() => useCartStore());
  act(() => {
    result.current.addItem({ id: 'p1', name: 'Widget', price: 9.99 });
    result.current.addItem({ id: 'p1', name: 'Widget', price: 9.99 });
  });
  expect(result.current.items[0].quantity).toBe(2);
  expect(result.current.total).toBeCloseTo(19.98);
});

// Testing component with Zustand (no wrapper needed — Zustand is global)
import { render, screen } from '@testing-library/react';
import { CartIcon } from './CartIcon';

test('shows item count badge', () => {
  useCartStore.setState({
    items: [{ id: 'p1', name: 'Widget', price: 9.99, quantity: 3 }],
    total: 29.97,
  });
  render(<CartIcon />);
  expect(screen.getByText('3')).toBeInTheDocument();
});`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? 'Playwright 与 Cypress：端到端测试' : 'Playwright and Cypress: End-to-End Testing'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '端到端测试在真实浏览器中运行，测试完整的用户流程。Playwright 和 Cypress 是最主流的两个工具，各有优缺点。'
          : 'End-to-end tests run in a real browser and test complete user journeys. Playwright and Cypress are the two leading tools, each with distinct strengths.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Playwright 配置与示例' : 'Playwright Setup and Examples'}</h3>
      <pre style={codeStyle}><code>{`# Install Playwright
npm init playwright@latest
# or
npm install --save-dev @playwright/test
npx playwright install`}</code></pre>

      <pre style={codeStyle}><code>{`// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});`}</code></pre>

      <pre style={codeStyle}><code>{`// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel(/email/i).fill('alice@example.com');
    await page.getByLabel(/password/i).fill('secret123');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for navigation
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome, Alice')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel(/email/i).fill('wrong@example.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
    await expect(page).toHaveURL('/login'); // Stays on login page
  });

  test('redirects to login when accessing protected route', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login?redirect=/dashboard');
  });
});

// e2e/checkout.spec.ts
test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login via API to avoid repeating UI login in every test
    await page.request.post('/api/auth/login', {
      data: { email: 'alice@example.com', password: 'secret123' },
    });
  });

  test('completes purchase with saved payment method', async ({ page }) => {
    await page.goto('/products/widget');
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.getByRole('link', { name: /checkout/i }).click();

    await expect(page.getByText('Widget')).toBeVisible();
    await expect(page.getByText('\$9.99')).toBeVisible();

    await page.getByRole('button', { name: /place order/i }).click();

    await expect(page.getByText(/order confirmed/i)).toBeVisible();
    await expect(page.getByText(/order #/i)).toBeVisible();
  });
});

// Page Object Model (POM) pattern
// e2e/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.submitButton = page.getByRole('button', { name: /sign in/i });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}`}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Cypress 配置与示例' : 'Cypress Setup and Examples'}</h3>
      <pre style={codeStyle}><code>{`// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    experimentalStudio: true,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});`}</code></pre>

      <pre style={codeStyle}><code>{`// cypress/e2e/dashboard.cy.ts
describe('Dashboard', () => {
  beforeEach(() => {
    // Custom command for login
    cy.login('alice@example.com', 'secret123');
    cy.visit('/dashboard');
  });

  it('displays user statistics', () => {
    cy.getByTestId('stats-card').should('have.length', 4);
    cy.contains('Total Revenue').should('be.visible');
    cy.getByTestId('revenue-chart').should('be.visible');
  });

  it('filters data by date range', () => {
    cy.getByTestId('date-range-picker').click();
    cy.contains('Last 30 days').click();
    cy.getByTestId('revenue-chart').should('be.visible');
    cy.getByTestId('loading-spinner').should('not.exist');
  });
});

// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      getByTestId(id: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { email, password },
  }).then(({ body }) => {
    window.localStorage.setItem('authToken', body.token);
  });
});

Cypress.Commands.add('getByTestId', (id: string) => {
  return cy.get(\`[data-testid="\${id}"]\`);
});`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '代码覆盖率：Istanbul/nyc 配置' : 'Code Coverage with Istanbul/nyc'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '代码覆盖率衡量测试执行了多少代码。Istanbul（通过 nyc 或 Babel 插件使用）是 React 生态中最广泛使用的覆盖率工具。覆盖率有四种维度：语句、分支、函数和行。'
          : 'Code coverage measures how much of your code is executed by tests. Istanbul (used via nyc, Babel plugin, or V8 provider) is the most widely used coverage tool in the React ecosystem. Coverage has four dimensions: statements, branches, functions, and lines.'}
      </p>

      <pre style={codeStyle}><code>{`# Run tests with coverage
npm test -- --coverage          # Jest
npx vitest run --coverage       # Vitest

# Generate HTML report
npx nyc report --reporter=html`}</code></pre>

      <pre style={codeStyle}><code>{`// jest.config.ts — coverage configuration
export default {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/main.tsx',
    '!src/test/**',
    '!src/**/__mocks__/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  coverageThresholds: {
    global: {
      statements: 80,
      branches: 70,
      functions: 75,
      lines: 80,
    },
    // Per-file thresholds for critical modules
    './src/utils/auth.ts': {
      statements: 95,
      branches: 90,
      functions: 95,
      lines: 95,
    },
  },
};`}</code></pre>

      <pre style={codeStyle}><code>{`// Coverage annotations — tell Istanbul to ignore specific code
/* istanbul ignore next */
function developmentOnlyHelper() {
  if (process.env.NODE_ENV !== 'production') {
    console.debug('Debug info');
  }
}

/* istanbul ignore if */
if (process.env.NODE_ENV === 'test') {
  // Test setup code
}

// Vitest coverage configuration
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',       // or 'istanbul'
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.*', 'src/test/**'],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 75,
        lines: 80,
      },
    },
  },
});`}</code></pre>

      <h3 style={h3Style}>{isZh ? '在 CI 中集成覆盖率' : 'Coverage in CI/CD'}</h3>
      <pre style={codeStyle}><code>{`# .github/workflows/test.yml
name: Test & Coverage

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm test -- --coverage --ci --forceExit

      # Upload coverage to Codecov
      - uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/lcov.info
          fail_ci_if_error: true

      # Or upload to Coveralls
      - uses: coverallsapp/github-action@v2
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '测试框架横向对比：RTL vs Enzyme vs Cypress' : 'Testing Tool Comparison: RTL vs Enzyme vs Cypress'}
      </h2>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>React Testing Library</th>
              <th style={thStyle}>Enzyme</th>
              <th style={thStyle}>Cypress Component</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>{isZh ? '测试哲学' : 'Philosophy'}</td>
              <td style={tdStyle}>{isZh ? '用户行为导向' : 'User behavior'}</td>
              <td style={tdStyle}>{isZh ? '实现细节导向' : 'Implementation details'}</td>
              <td style={tdStyle}>{isZh ? '真实浏览器渲染' : 'Real browser rendering'}</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? 'React 18 支持' : 'React 18 Support'}</td>
              <td style={tdAltStyle}>{isZh ? '完全支持' : 'Full support'}</td>
              <td style={tdAltStyle}>{isZh ? '不支持（已弃用）' : 'Not supported (deprecated)'}</td>
              <td style={tdAltStyle}>{isZh ? '完全支持' : 'Full support'}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? '测试速度' : 'Speed'}</td>
              <td style={tdStyle}>{isZh ? '快（jsdom）' : 'Fast (jsdom)'}</td>
              <td style={tdStyle}>{isZh ? '快（jsdom）' : 'Fast (jsdom)'}</td>
              <td style={tdStyle}>{isZh ? '中等（真实浏览器）' : 'Medium (real browser)'}</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '调试体验' : 'Debugging'}</td>
              <td style={tdAltStyle}>{isZh ? '中等（CLI 输出）' : 'Medium (CLI output)'}</td>
              <td style={tdAltStyle}>{isZh ? '中等' : 'Medium'}</td>
              <td style={tdAltStyle}>{isZh ? '极佳（时间旅行调试器）' : 'Excellent (time-travel)'}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? '测试内部状态' : 'Test Internal State'}</td>
              <td style={tdStyle}>{isZh ? '不推荐' : 'Discouraged'}</td>
              <td style={tdStyle}>{isZh ? '支持（.state() .props()）' : 'Yes (.state() .props())'}</td>
              <td style={tdStyle}>{isZh ? '不推荐' : 'Discouraged'}</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '社区活跃度' : 'Community'}</td>
              <td style={tdAltStyle}>{isZh ? '非常活跃' : 'Very active'}</td>
              <td style={tdAltStyle}>{isZh ? '基本不维护' : 'Largely unmaintained'}</td>
              <td style={tdAltStyle}>{isZh ? '活跃' : 'Active'}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? '推荐场景' : 'Best For'}</td>
              <td style={tdStyle}>{isZh ? '单元和集成测试' : 'Unit & integration'}</td>
              <td style={tdStyle}>{isZh ? '遗留项目维护' : 'Legacy codebase maintenance'}</td>
              <td style={tdStyle}>{isZh ? '视觉组件调试' : 'Visual component debugging'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Playwright</th>
              <th style={thStyle}>Cypress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>{isZh ? '浏览器支持' : 'Browser Support'}</td>
              <td style={tdStyle}>Chromium, Firefox, WebKit</td>
              <td style={tdStyle}>Chromium, Firefox (partial)</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '并行执行' : 'Parallelism'}</td>
              <td style={tdAltStyle}>{isZh ? '原生支持' : 'Native built-in'}</td>
              <td style={tdAltStyle}>{isZh ? '需要 Cypress Cloud（付费）' : 'Cypress Cloud (paid) or plugins'}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? 'TypeScript 支持' : 'TypeScript'}</td>
              <td style={tdStyle}>{isZh ? '原生一流支持' : 'First-class'}</td>
              <td style={tdStyle}>{isZh ? '支持（需配置）' : 'Supported (config needed)'}</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '调试体验' : 'Debugging'}</td>
              <td style={tdAltStyle}>{isZh ? '追踪查看器、截图、视频' : 'Trace viewer, screenshots, videos'}</td>
              <td style={tdAltStyle}>{isZh ? '时间旅行调试器（交互式）' : 'Time-travel debugger (interactive)'}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? 'CI/CD 集成' : 'CI/CD'}</td>
              <td style={tdStyle}>{isZh ? '优秀' : 'Excellent'}</td>
              <td style={tdStyle}>{isZh ? '良好（需 Docker 镜像）' : 'Good (needs Docker image)'}</td>
            </tr>
            <tr>
              <td style={tdAltStyle}>{isZh ? '移动端模拟' : 'Mobile Emulation'}</td>
              <td style={tdAltStyle}>{isZh ? '内置设备列表' : 'Built-in device list'}</td>
              <td style={tdAltStyle}>{isZh ? '有限支持' : 'Limited'}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{isZh ? '推荐场景' : 'Best For'}</td>
              <td style={tdStyle}>CI/CD, cross-browser testing</td>
              <td style={tdStyle}>{isZh ? '本地开发、调试复杂交互' : 'Local dev, debugging interactions'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '最佳实践' : 'Testing Best Practices'}
      </h2>

      <h3 style={h3Style}>{isZh ? '组织测试文件' : 'Organizing Test Files'}</h3>
      <pre style={codeStyle}><code>{`# Co-locate tests with source files (recommended)
src/
  components/
    UserCard/
      UserCard.tsx
      UserCard.test.tsx     # Unit/integration test
      UserCard.stories.tsx  # Storybook stories
  hooks/
    useCounter.ts
    useCounter.test.ts
  utils/
    formatDate.ts
    formatDate.test.ts
  test/
    setup.ts                # Test setup (jest-dom, MSW server)
    renderWithProviders.tsx # Shared render helper
    factories.ts            # Test data factories

e2e/
  auth.spec.ts
  checkout.spec.ts
  pages/
    LoginPage.ts            # Page Object Models`}</code></pre>

      <h3 style={h3Style}>{isZh ? '测试数据工厂' : 'Test Data Factories'}</h3>
      <pre style={codeStyle}><code>{`// src/test/factories.ts
// Use factory functions to create test data — avoids brittle hardcoded objects

let idCounter = 0;

export function createUser(overrides: Partial<User> = {}): User {
  idCounter++;
  return {
    id: \`user-\${idCounter}\`,
    name: \`Test User \${idCounter}\`,
    email: \`user\${idCounter}@example.com\`,
    role: 'user',
    createdAt: new Date('2026-01-01'),
    ...overrides,
  };
}

export function createProduct(overrides: Partial<Product> = {}): Product {
  idCounter++;
  return {
    id: \`product-\${idCounter}\`,
    name: \`Test Product \${idCounter}\`,
    price: 9.99,
    stock: 100,
    ...overrides,
  };
}

// Usage in tests
const adminUser = createUser({ role: 'admin', name: 'Alice' });
const outOfStockProduct = createProduct({ stock: 0 });`}</code></pre>

      <h3 style={h3Style}>{isZh ? '避免常见测试反模式' : 'Avoiding Common Testing Anti-Patterns'}</h3>
      <pre style={codeStyle}><code>{`// BAD: Testing implementation details
test('sets loading state', () => {
  const wrapper = shallow(<UserProfile />);
  wrapper.setState({ loading: true }); // Don't test internal state
  expect(wrapper.state('loading')).toBe(true);
});

// GOOD: Test what the user sees
test('shows loading spinner while fetching', async () => {
  render(<UserProfile userId="1" />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await screen.findByText('Alice Johnson'); // Wait for data
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

// BAD: Too many assertions in one test (hard to diagnose failures)
test('UserCard', () => {
  render(<UserCard user={user} />);
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  expect(screen.getByText('Admin')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeEnabled();
  // ... 10 more assertions
});

// GOOD: Focused, single-concern tests
test('renders user name', () => { /* ... */ });
test('renders user email', () => { /* ... */ });
test('shows admin badge for admin users', () => { /* ... */ });
test('hides admin badge for regular users', () => { /* ... */ });

// BAD: Depending on test order
let sharedState = null;
test('creates item', () => { sharedState = createItem(); });
test('deletes item', () => { deleteItem(sharedState.id); }); // Depends on previous test!

// GOOD: Each test is independent and self-contained
test('deletes item', () => {
  const item = createItem(); // Each test creates its own data
  deleteItem(item.id);
  expect(getItem(item.id)).toBeNull();
});`}</code></pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '构建一个健壮的 React 测试策略需要在速度、置信度和维护成本之间取得平衡。使用 React Testing Library 进行以用户为中心的组件测试，用 MSW 模拟 API 而不修改应用代码，用 renderHook 测试自定义 Hook，用真实 store 测试 Redux/Zustand 集成，最后用 Playwright 或 Cypress 覆盖关键的端到端用户路径。'
          : 'Building a robust React testing strategy requires balancing speed, confidence, and maintenance cost. Use React Testing Library for user-centric component tests, MSW to mock APIs without touching application code, renderHook to test custom hooks, real stores to test Redux/Zustand integration, and Playwright or Cypress to cover critical end-to-end user paths. Follow the testing pyramid, write tests that resemble real usage, and enforce coverage thresholds in CI to prevent regressions over time.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '遵循测试金字塔，编写贴近真实使用场景的测试，并在 CI 中设置覆盖率门控以防止回归。记住，好的测试不仅是质量保障工具——它们也是系统行为的活体文档。'
          : 'Remember that good tests are not just quality gates — they are living documentation of your system\'s expected behavior. A well-tested React application gives your team the confidence to refactor aggressively, ship features quickly, and sleep soundly at night.'}
      </p>

      {/* FAQ */}
      <h2 style={h2Style}>{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>
      {faqSchema.mainEntity.map((faq, i) => (
        <details
          key={i}
          style={{ marginBottom: '12px', padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}
        >
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: '#0f172a' }}>{faq.name}</summary>
          <p style={{ marginTop: '8px', color: '#475569', lineHeight: 1.7 }}>{faq.acceptedAnswer.text}</p>
        </details>
      ))}
    </article>
  )
}
