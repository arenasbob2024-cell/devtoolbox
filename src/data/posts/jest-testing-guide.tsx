'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Jest Testing Complete Guide — Unit Tests, Mocking, React Testing Library, Coverage',
    description:
      'Complete Jest testing guide covering writing unit tests, mocking modules and functions, testing React components with React Testing Library, async testing, snapshot testing, code coverage, and testing custom hooks.',
    tldr:
      'Jest is a zero-configuration JavaScript testing framework with built-in mocking, snapshot testing, code coverage via Istanbul, and jsdom for DOM simulation. Pair it with React Testing Library for component tests, use jest.fn() and jest.mock() for mocking, and run --coverage to enforce thresholds in CI.',
  },
  zh: {
    title: 'Jest 测试完整指南 — 单元测试、Mock、React Testing Library、代码覆盖率',
    description:
      '完整的 Jest 测试指南，涵盖编写单元测试、模拟模块和函数、使用 React Testing Library 测试 React 组件、异步测试、快照测试、代码覆盖率以及自定义 Hook 测试。',
    tldr:
      'Jest 是一个零配置的 JavaScript 测试框架，内置 Mock、快照测试、通过 Istanbul 实现的代码覆盖率以及用于 DOM 模拟的 jsdom。搭配 React Testing Library 进行组件测试，使用 jest.fn() 和 jest.mock() 进行 Mock，并在 CI 中运行 --coverage 来强制执行覆盖率阈值。',
  },
};

export default function JestTestingGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I mock an ES module with Jest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use jest.mock() at the top of your test file with the module path as the first argument. For named exports, provide a factory function: jest.mock("./myModule", () => ({ myFunction: jest.fn().mockReturnValue(42) })). For default exports: jest.mock("./myModule", () => ({ __esModule: true, default: jest.fn() })). If you use Babel or ts-jest, hoisting happens automatically. For ESM projects without Babel, use --experimental-vm-modules and jest.unstable_mockModule() instead.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I set up Jest in a CI/CD pipeline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Add a test script to package.json: "test:ci": "jest --ci --coverage --forceExit". The --ci flag disables interactive watch mode and fails if snapshots are outdated. Set coverage thresholds in jest.config.js under coverageThreshold. In GitHub Actions, add a step: "run: npm run test:ci" after installing dependencies. Use jest-junit reporter to emit JUnit XML for test result parsing. Cache node_modules between runs with actions/cache to speed up installations.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I test that a function throws an error in Jest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wrap the call in an arrow function and use expect(() => myFunction()).toThrow(). To assert on error message: expect(() => myFunction()).toThrow("expected message"). To match a regex: expect(() => myFunction()).toThrow(/pattern/). To check error type: expect(() => myFunction()).toThrow(TypeError). For async functions that reject: await expect(asyncFunction()).rejects.toThrow("error message").',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between jest.fn(), jest.mock(), and jest.spyOn()?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'jest.fn() creates a standalone mock function with no implementation. jest.mock() replaces an entire module with an auto-mocked or manually defined version — it affects all imports of that module in the test file. jest.spyOn() wraps an existing method on an object, allowing you to track calls while keeping the original implementation (or replacing it). Use jest.fn() for dependency injection, jest.mock() for module-level mocking, and jest.spyOn() when you need to restore the original after the test with mockRestore().',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I achieve test isolation between Jest tests?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use beforeEach/afterEach to set up and tear down state. Call jest.clearAllMocks() in afterEach to reset mock call counts, or configure clearMocks: true in jest.config.js. Use jest.resetAllMocks() to also reset return values, or jest.restoreAllMocks() to restore spies. Avoid module-level mutable state. For database tests, wrap each test in a transaction and roll it back. Jest runs each test file in a separate Node.js worker by default, providing file-level isolation automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I test asynchronous code with timers in Jest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use jest.useFakeTimers() to replace setTimeout, setInterval, Date, and other timer globals with Jest-controlled versions. Advance time with jest.advanceTimersByTime(ms) or run all pending timers with jest.runAllTimers(). Call jest.useRealTimers() in afterEach to restore real timers. For debounced or throttled functions, fake timers let you test them without actual delays. Combine with async/await: call the function, then await act(async () => { jest.advanceTimersByTime(300); }) in React component tests.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I update Jest snapshots?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Update snapshots when you intentionally change the component output: run jest --updateSnapshot or jest -u. Never blindly update all snapshots — review the diff first to ensure changes are expected. Prefer inline snapshots (toMatchInlineSnapshot) for small, focused assertions that are easy to review in code review. For large components, consider using specific property assertions instead of full snapshots to avoid brittle tests that break on every UI tweak.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I improve slow Jest test suites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Several techniques speed up Jest: (1) Use --runInBand for debugging but maxWorkers for CI (e.g., --maxWorkers=50%). (2) Enable caching: cache: true in jest.config.js. (3) Use moduleNameMapper to stub heavy dependencies like CSS files, images, or SVGs. (4) Limit coverage collection with collectCoverageFrom to only source files. (5) Use jest.mock() to avoid real I/O and network calls. (6) Split large test suites with projects configuration. (7) Switch to Vitest for ESM-native projects — it is significantly faster for Vite-based projects.',
        },
      },
    ],
  };

  const codeStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    borderRadius: '8px',
    padding: '1.25rem',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
    fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
  };

  const inlineCode: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#0f172a',
    borderRadius: '4px',
    padding: '2px 6px',
    fontSize: '0.85em',
    fontFamily: "'Fira Code', Consolas, monospace",
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginTop: '2.5rem',
    marginBottom: '1rem',
    color: '#1e293b',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.15rem',
    fontWeight: '700',
    marginTop: '1.75rem',
    marginBottom: '0.75rem',
    color: '#1e293b',
  };

  const tdStyle: React.CSSProperties = {
    padding: '10px 12px',
    borderBottom: '1px solid #e2e8f0',
    verticalAlign: 'top',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 12px',
    textAlign: 'left',
    borderBottom: '2px solid #e2e8f0',
    fontWeight: '600',
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href={'https://viadreams.cc/' + lang + '/blog/jest-testing-guide'} />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', margin: '0 0 0.5rem 0' }}>
          TL;DR
        </p>
        <p style={{ margin: 0 }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b', margin: '0 0 0.75rem 0' }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li style={{ marginBottom: '0.4rem' }}>
            Jest works out of the box with zero configuration for most JavaScript and TypeScript projects
          </li>
          <li style={{ marginBottom: '0.4rem' }}>
            Use <code style={inlineCode}>describe</code> / <code style={inlineCode}>it</code> blocks and{' '}
            <code style={inlineCode}>expect</code> matchers for expressive, readable tests
          </li>
          <li style={{ marginBottom: '0.4rem' }}>
            <code style={inlineCode}>jest.fn()</code>, <code style={inlineCode}>jest.mock()</code>, and{' '}
            <code style={inlineCode}>jest.spyOn()</code> cover virtually all mocking scenarios
          </li>
          <li style={{ marginBottom: '0.4rem' }}>
            React Testing Library encourages testing behavior over implementation details
          </li>
          <li style={{ marginBottom: '0.4rem' }}>
            Enforce coverage thresholds in CI with <code style={inlineCode}>--coverage</code> and{' '}
            <code style={inlineCode}>coverageThreshold</code>
          </li>
          <li style={{ marginBottom: '0.4rem' }}>
            Fake timers let you test debounce, throttle, and polling without real delays
          </li>
          <li style={{ marginBottom: '0' }}>
            Vitest is a fast drop-in alternative for Vite-based projects, sharing most of Jest&apos;s API
          </li>
        </ul>
      </div>

      {/* Section 1: What is Jest */}
      <h2 style={h2Style}>What Is Jest? Zero-Config Testing for JavaScript</h2>
      <p>
        Jest is a JavaScript testing framework maintained by Meta (formerly Facebook). It was designed with
        developer experience as the top priority: install it, run{' '}
        <code style={inlineCode}>npx jest</code>, and it finds and runs every{' '}
        <code style={inlineCode}>*.test.js</code>, <code style={inlineCode}>*.spec.js</code>, or file inside a{' '}
        <code style={inlineCode}>__tests__</code> folder automatically — no config file required for most
        projects.
      </p>
      <p>
        Under the hood, Jest ships with several integrated capabilities that other frameworks require you to
        assemble yourself:
      </p>
      <ul style={{ paddingLeft: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Test runner</strong> — finds, executes, and reports results for all test files in parallel
          using worker processes
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Assertion library</strong> — the <code style={inlineCode}>expect</code> API with 30+
          built-in matchers plus third-party extensions via{' '}
          <code style={inlineCode}>expect.extend()</code>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Mocking system</strong> — <code style={inlineCode}>jest.fn()</code>,{' '}
          <code style={inlineCode}>jest.mock()</code>, auto-mocking, and manual mocks via{' '}
          <code style={inlineCode}>__mocks__</code> directories
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Snapshot testing</strong> — serialize any JavaScript value to a text file and detect
          unintended changes across commits
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Code coverage</strong> — powered by Istanbul/NYC, reports lines, statements, branches, and
          functions with threshold enforcement
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>jsdom environment</strong> — simulates a browser DOM in Node.js so you can test React,
          Vue, and Angular components without a real browser
        </li>
        <li style={{ marginBottom: '0' }}>
          <strong>Fake timers</strong> — replace <code style={inlineCode}>setTimeout</code>,{' '}
          <code style={inlineCode}>setInterval</code>, and <code style={inlineCode}>Date</code> with
          controllable test versions
        </li>
      </ul>

      <h3 style={h3Style}>Installation</h3>
      <pre style={codeStyle}><code>{`# npm
npm install --save-dev jest

# TypeScript support
npm install --save-dev jest @types/jest ts-jest

# For React + TypeScript projects
npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`}</code></pre>

      <h3 style={h3Style}>jest.config.ts (TypeScript)</h3>
      <pre style={codeStyle}><code>{`import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',           // use 'node' for server-side tests
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/\$1',  // path alias support
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
};

export default config;`}</code></pre>

      <pre style={codeStyle}><code>{`// jest.setup.ts
import '@testing-library/jest-dom';`}</code></pre>

      {/* Section 2: Writing Tests */}
      <h2 style={h2Style}>Writing Tests — describe, it, expect, and Matchers</h2>
      <p>
        Every Jest test file is structured using three primary globals: <code style={inlineCode}>describe</code>{' '}
        for grouping related tests, <code style={inlineCode}>it</code> (or{' '}
        <code style={inlineCode}>test</code>) for individual test cases, and{' '}
        <code style={inlineCode}>expect</code> for assertions.
      </p>

      <h3 style={h3Style}>Basic Test Structure</h3>
      <pre style={codeStyle}><code>{`// src/utils/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function divide(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

// src/utils/math.test.ts
import { add, divide } from './math';

describe('add()', () => {
  it('returns the sum of two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('handles negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  it('returns the first argument when adding zero', () => {
    expect(add(7, 0)).toBe(7);
  });
});

describe('divide()', () => {
  it('divides two numbers correctly', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('throws on division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });
});`}</code></pre>

      <h3 style={h3Style}>Essential Matchers Reference</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={thStyle}>Matcher</th>
              <th style={thStyle}>Use Case</th>
              <th style={thStyle}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['toBe(val)', 'Strict equality (===)', 'expect(1 + 1).toBe(2)'],
              ['toEqual(val)', 'Deep equality for objects/arrays', 'expect({a:1}).toEqual({a:1})'],
              ['toStrictEqual(val)', 'Deep equality + checks undefined properties', 'expect(obj).toStrictEqual(expected)'],
              ['toBeTruthy() / toBeFalsy()', 'Truthy or falsy check', 'expect("hello").toBeTruthy()'],
              ['toBeNull() / toBeUndefined()', 'Checks for null or undefined', 'expect(null).toBeNull()'],
              ['toContain(item)', 'Array or string contains value', 'expect([1,2,3]).toContain(2)'],
              ['toHaveLength(n)', 'Array or string length', 'expect("abc").toHaveLength(3)'],
              ['toThrow(err?)', 'Function throws an error', 'expect(() => fn()).toThrow()'],
              ['toBeGreaterThan(n)', 'Number comparison', 'expect(5).toBeGreaterThan(3)'],
              ['toMatch(regex)', 'String matches regex or substring', 'expect("hello").toMatch(/ell/)'],
              ['toHaveProperty(path)', 'Object has a property', "expect(obj).toHaveProperty('a.b')"],
              ['toBeCloseTo(n, digits?)', 'Floating point comparison', 'expect(0.1 + 0.2).toBeCloseTo(0.3)'],
              ['toHaveBeenCalled()', 'Mock function was called', 'expect(mockFn).toHaveBeenCalled()'],
              ['toHaveBeenCalledWith(...)', 'Mock called with specific args', "expect(fn).toHaveBeenCalledWith(42, 'x')"],
              ['toHaveBeenCalledTimes(n)', 'Mock call count', 'expect(fn).toHaveBeenCalledTimes(3)'],
            ].map(([matcher, use, example], i) => (
              <tr key={matcher} style={{ background: i % 2 === 1 ? '#fafafa' : 'transparent' }}>
                <td style={tdStyle}><code style={inlineCode}>{matcher}</code></td>
                <td style={tdStyle}>{use}</td>
                <td style={tdStyle}><code style={{ fontSize: '0.82em', fontFamily: 'monospace' }}>{example}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Lifecycle Hooks</h3>
      <pre style={codeStyle}><code>{`describe('Database service', () => {
  let db: DatabaseService;

  beforeAll(async () => {
    // Runs once before all tests in this describe block
    db = await DatabaseService.connect('sqlite::memory:');
  });

  afterAll(async () => {
    // Runs once after all tests in this describe block
    await db.disconnect();
  });

  beforeEach(async () => {
    // Runs before EACH test — seed fresh data
    await db.seed(testFixtures);
  });

  afterEach(async () => {
    // Runs after EACH test — clean up
    await db.truncate();
  });

  it('finds a user by id', async () => {
    const user = await db.findUser(1);
    expect(user).toHaveProperty('email');
  });
});`}</code></pre>

      {/* Section 3: Mocking */}
      <h2 style={h2Style}>Mocking — jest.fn(), jest.mock(), and jest.spyOn()</h2>
      <p>
        Mocking replaces real dependencies with controlled substitutes, enabling tests to run in isolation
        without hitting databases, external APIs, or the filesystem. Jest provides three complementary tools
        for this.
      </p>

      <h3 style={h3Style}>jest.fn() — Standalone Mock Functions</h3>
      <pre style={codeStyle}><code>{`// Create a mock function
const mockCallback = jest.fn();

// Call it like a real function
mockCallback('hello', 42);

// Inspect how it was called
expect(mockCallback).toHaveBeenCalledTimes(1);
expect(mockCallback).toHaveBeenCalledWith('hello', 42);
console.log(mockCallback.mock.calls);   // [['hello', 42]]
console.log(mockCallback.mock.results); // [{ type: 'return', value: undefined }]

// Control return values
const mockFetch = jest.fn()
  .mockReturnValueOnce({ data: 'first call' })
  .mockReturnValueOnce({ data: 'second call' })
  .mockReturnValue({ data: 'subsequent calls' });

// Async return values
const mockApi = jest.fn()
  .mockResolvedValue({ status: 200, body: { id: 1 } });

const result = await mockApi();
expect(result.status).toBe(200);

// Reject with an error
const mockFailing = jest.fn()
  .mockRejectedValue(new Error('Network error'));`}</code></pre>

      <h3 style={h3Style}>jest.mock() — Module-Level Mocking</h3>
      <pre style={codeStyle}><code>{`// Auto-mock: all exports become jest.fn()
jest.mock('./emailService');

// Manual mock with factory function
jest.mock('./userRepository', () => ({
  findById: jest.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
  save: jest.fn().mockResolvedValue(undefined),
}));

// Mock a third-party module
jest.mock('axios', () => ({
  default: {
    get: jest.fn().mockResolvedValue({ data: { users: [] } }),
    post: jest.fn().mockResolvedValue({ data: { id: 42 } }),
  },
}));

// Mock module with default export (ES module)
jest.mock('./config', () => ({
  __esModule: true,
  default: { apiUrl: 'http://test.local', timeout: 1000 },
}));

// Partial mock — keep some real implementations
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),  // keep real helpers
  generateId: jest.fn().mockReturnValue('test-id-123'),
}));`}</code></pre>

      <h3 style={h3Style}>jest.spyOn() — Wrapping Existing Methods</h3>
      <pre style={codeStyle}><code>{`import * as fs from 'fs';

describe('FileProcessor', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // restore original implementations
  });

  it('reads a file and processes its content', () => {
    // Spy on fs.readFileSync without replacing the entire module
    const readSpy = jest.spyOn(fs, 'readFileSync')
      .mockReturnValue('mocked file content');

    const processor = new FileProcessor();
    const result = processor.processFile('/path/to/file.txt');

    expect(readSpy).toHaveBeenCalledWith('/path/to/file.txt', 'utf-8');
    expect(result).toBe('MOCKED FILE CONTENT');
  });

  it('logs errors when file is missing', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('ENOENT: no such file');
    });

    new FileProcessor().processFile('/missing.txt');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('ENOENT')
    );
  });
});`}</code></pre>

      <h3 style={h3Style}>Manual Mocks with __mocks__ Directory</h3>
      <pre style={codeStyle}><code>{`// __mocks__/axios.ts  (placed next to node_modules)
const axios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  create: jest.fn().mockReturnThis(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
};
export default axios;

// In test files — jest.mock('axios') uses __mocks__/axios.ts automatically
jest.mock('axios');
import axios from 'axios';

test('fetches user data', async () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({
    data: { id: 1, name: 'Alice' },
  });
  const user = await fetchUser(1);
  expect(user.name).toBe('Alice');
});`}</code></pre>

      {/* Section 4: Testing React Components */}
      <h2 style={h2Style}>Testing React Components with React Testing Library</h2>
      <p>
        React Testing Library (RTL) builds on Jest&apos;s jsdom environment and provides utilities that
        encourage testing components the way users interact with them — by finding elements through accessible
        roles, labels, and text rather than CSS selectors or component internals.
      </p>

      <h3 style={h3Style}>Queries: Finding Elements the Right Way</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={thStyle}>Query</th>
              <th style={thStyle}>When to Use</th>
              <th style={thStyle}>Throws if Missing?</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['getByRole', 'Preferred — matches ARIA roles (button, textbox, heading…)', 'Yes'],
              ['getByLabelText', 'Form inputs with associated <label>', 'Yes'],
              ['getByPlaceholderText', 'Inputs with placeholder attribute', 'Yes'],
              ['getByText', 'Non-interactive elements: headings, paragraphs, spans', 'Yes'],
              ['getByDisplayValue', 'Current value of input/select/textarea', 'Yes'],
              ['getByAltText', 'Images with alt attribute', 'Yes'],
              ['getByTestId', 'Last resort — requires data-testid attribute', 'Yes'],
              ['queryBy*', 'Same as getBy* but returns null instead of throwing', 'No'],
              ['findBy*', 'Async — waits for element to appear (returns Promise)', 'Yes (async)'],
              ['getAllBy* / queryAllBy* / findAllBy*', 'Returns array of all matching elements', 'Varies'],
            ].map(([query, when, throws], i) => (
              <tr key={query} style={{ background: i % 2 === 1 ? '#fafafa' : 'transparent' }}>
                <td style={tdStyle}><code style={inlineCode}>{query}</code></td>
                <td style={tdStyle}>{when}</td>
                <td style={{ ...tdStyle, color: throws === 'Yes' ? '#16a34a' : throws === 'No' ? '#dc2626' : '#d97706' }}>{throws}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Component Test Example</h3>
      <pre style={codeStyle}><code>{`// components/LoginForm.tsx
import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email}
        onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password}
        onChange={e => setPassword(e.target.value)} />
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}`}</code></pre>

      <pre style={codeStyle}><code>{`// components/LoginForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('submits email and password when form is filled and submitted', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);

    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText('Email'), 'alice@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('alice@example.com', 'secret123');
    });
  });

  it('shows an error message when login fails', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Unauthorized'));

    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText('Email'), 'bad@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid credentials');
  });

  it('disables the submit button while loading', async () => {
    const user = userEvent.setup();
    // Never resolves so we can check the loading state
    const mockOnSubmit = jest.fn().mockReturnValue(new Promise(() => {}));

    render(<LoginForm onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'pass');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(screen.getByRole('button', { name: 'Signing in…' })).toBeDisabled();
  });
});`}</code></pre>

      {/* Section 5: Async Testing */}
      <h2 style={h2Style}>Async Testing — Promises, async/await, and Fake Timers</h2>
      <p>
        Modern JavaScript is heavily asynchronous. Jest handles async code through native{' '}
        <code style={inlineCode}>async/await</code>, promise matchers, and a powerful fake timer system.
      </p>

      <h3 style={h3Style}>async/await and Promise Matchers</h3>
      <pre style={codeStyle}><code>{`// Testing a function that returns a Promise
async function fetchUser(id: number) {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

// Option 1: async/await (clearest syntax)
it('fetches a user successfully', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
  });

  const user = await fetchUser(1);
  expect(user.name).toBe('Alice');
});

// Option 2: resolves / rejects matchers
it('resolves with the correct user', () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
  });
  return expect(fetchUser(1)).resolves.toMatchObject({ name: 'Alice' });
});

it('rejects when server returns 404', () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });
  return expect(fetchUser(99)).rejects.toThrow('HTTP 404');
});`}</code></pre>

      <h3 style={h3Style}>Fake Timers for setTimeout and setInterval</h3>
      <pre style={codeStyle}><code>{`// utils/debounce.ts
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// utils/debounce.test.ts
import { debounce } from './debounce';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('calls the function after the delay', () => {
  const fn = jest.fn();
  const debounced = debounce(fn, 300);

  debounced();
  expect(fn).not.toHaveBeenCalled();  // not yet

  jest.advanceTimersByTime(300);
  expect(fn).toHaveBeenCalledTimes(1);
});

it('only calls once if invoked multiple times within delay', () => {
  const fn = jest.fn();
  const debounced = debounce(fn, 300);

  debounced();
  debounced();
  debounced();
  jest.advanceTimersByTime(300);

  expect(fn).toHaveBeenCalledTimes(1);
});

it('runs all pending timers with runAllTimers()', () => {
  const fn = jest.fn();
  const debounced = debounce(fn, 5000);

  debounced();
  jest.runAllTimers();
  expect(fn).toHaveBeenCalledTimes(1);
});`}</code></pre>

      <h3 style={h3Style}>waitFor and findBy for DOM Updates</h3>
      <pre style={codeStyle}><code>{`import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBox } from './SearchBox';

it('shows search results after typing', async () => {
  const user = userEvent.setup();
  render(<SearchBox />);

  await user.type(screen.getByRole('searchbox'), 'jest');

  // waitFor keeps polling until assertion passes or times out (default 1000ms)
  await waitFor(() => {
    expect(screen.getByText('jest-circus')).toBeInTheDocument();
  });

  // findBy* is syntactic sugar for waitFor + getBy*
  const result = await screen.findByText('jest-circus');
  expect(result).toBeInTheDocument();
});`}</code></pre>

      {/* Section 6: Snapshot Testing */}
      <h2 style={h2Style}>Snapshot Testing — toMatchSnapshot and Inline Snapshots</h2>
      <p>
        Snapshot tests capture the rendered output of a component (or any serializable value) to a{' '}
        <code style={inlineCode}>.snap</code> file. On subsequent test runs, Jest compares the current output
        to the stored snapshot and fails if they differ, protecting against accidental regressions.
      </p>

      <h3 style={h3Style}>File Snapshots</h3>
      <pre style={codeStyle}><code>{`// components/Badge.tsx
export function Badge({ label, variant }: { label: string; variant: 'success' | 'error' }) {
  const bg = variant === 'success' ? '#dcfce7' : '#fee2e2';
  const color = variant === 'success' ? '#166534' : '#991b1b';
  return <span style={{ background: bg, color, padding: '2px 8px', borderRadius: '9999px' }}>{label}</span>;
}

// components/Badge.test.tsx
import { render } from '@testing-library/react';
import { Badge } from './Badge';

it('renders a success badge', () => {
  const { asFragment } = render(<Badge label="Passing" variant="success" />);
  expect(asFragment()).toMatchSnapshot();
  // Creates __snapshots__/Badge.test.tsx.snap on first run
});

// To update after intentional UI changes:
// npx jest --updateSnapshot  or  npx jest -u`}</code></pre>

      <h3 style={h3Style}>Inline Snapshots (Preferred for Small Values)</h3>
      <pre style={codeStyle}><code>{`it('serializes a config object', () => {
  const config = buildConfig({ env: 'test', debug: false });
  expect(config).toMatchInlineSnapshot(\`
    {
      "debug": false,
      "env": "test",
      "logLevel": "warn",
      "retries": 3,
    }
  \`);
  // Jest writes the snapshot directly into the test file on first run
});`}</code></pre>

      <h3 style={h3Style}>Snapshot Best Practices</h3>
      <ul style={{ paddingLeft: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Review every snapshot diff in code review</strong> — blindly running{' '}
          <code style={inlineCode}>-u</code> defeats the purpose of snapshot testing
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          Prefer <strong>inline snapshots</strong> for small, focused values; they are easier to review
          in pull requests
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Commit snapshot files</strong> to version control alongside your test code
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          Avoid snapshotting <strong>large component trees</strong> — they become brittle and obscure
          real regressions in noise. Target specific sub-trees or data structures instead
        </li>
        <li style={{ marginBottom: '0' }}>
          Use <code style={inlineCode}>expect.any(String)</code> or property matchers in snapshots to
          avoid failing on dynamic values like timestamps or UUIDs
        </li>
      </ul>

      <pre style={codeStyle}><code>{`// Property matchers — ignore dynamic values
it('creates a user with a generated id', () => {
  const user = createUser({ name: 'Alice' });
  expect(user).toMatchSnapshot({
    id: expect.any(String),      // ignore random UUID
    createdAt: expect.any(Date), // ignore timestamp
  });
  // Only non-matched properties are snapshotted
});`}</code></pre>

      {/* Section 7: Code Coverage */}
      <h2 style={h2Style}>Code Coverage — Istanbul, Thresholds, and CI Integration</h2>
      <p>
        Run <code style={inlineCode}>jest --coverage</code> to generate a coverage report powered by Istanbul
        (NYC). Jest instruments your source code on the fly and tracks which lines, statements, branches, and
        functions are exercised during the test run.
      </p>

      <h3 style={h3Style}>Coverage Commands</h3>
      <pre style={codeStyle}><code>{`# Generate coverage report (HTML, lcov, text)
npx jest --coverage

# Specify reporters
npx jest --coverage --coverageReporters=text --coverageReporters=html --coverageReporters=lcov

# Open HTML report
open coverage/index.html

# Fail if coverage drops below thresholds
npx jest --coverage --coverageThreshold='{"global":{"lines":80}}'`}</code></pre>

      <h3 style={h3Style}>Coverage Configuration in jest.config.ts</h3>
      <pre style={codeStyle}><code>{`const config: Config = {
  // ...
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',  // exclude Storybook files
    '!src/**/index.ts',       // exclude barrel files
    '!src/generated/**',      // exclude generated code
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/__tests__/',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // Per-file threshold (stricter for critical modules)
    './src/lib/auth.ts': {
      branches: 90,
      lines: 95,
    },
  },
};`}</code></pre>

      <h3 style={h3Style}>Coverage in GitHub Actions CI</h3>
      <pre style={codeStyle}><code>{`# .github/workflows/test.yml
name: Tests

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
        env:
          CI: true
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/lcov.info`}</code></pre>

      <h3 style={h3Style}>Understanding the Coverage Report</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={thStyle}>Metric</th>
              <th style={thStyle}>What it Measures</th>
              <th style={thStyle}>Typical Target</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Statements', 'Percentage of executed statements', '80%+'],
              ['Branches', 'Percentage of if/else/ternary branches taken', '75%+'],
              ['Functions', 'Percentage of functions called at least once', '80%+'],
              ['Lines', 'Percentage of source lines executed', '80%+'],
            ].map(([metric, what, target], i) => (
              <tr key={metric} style={{ background: i % 2 === 1 ? '#fafafa' : 'transparent' }}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{what}</td>
                <td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>{target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 8: Testing Custom Hooks */}
      <h2 style={h2Style}>Testing Custom Hooks with renderHook and act</h2>
      <p>
        Custom hooks often encapsulate complex stateful logic. React Testing Library&apos;s{' '}
        <code style={inlineCode}>renderHook</code> utility lets you test hooks in isolation without needing
        a full component wrapper. Wrap state-changing calls in <code style={inlineCode}>act()</code> to
        flush React&apos;s update queue.
      </p>

      <pre style={codeStyle}><code>{`// hooks/useCounter.ts
import { useState, useCallback } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, decrement, reset };
}

// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with the provided value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('increments the counter', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('decrements the counter', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(4);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => { result.current.increment(); });
    act(() => { result.current.increment(); });
    act(() => { result.current.reset(); });
    expect(result.current.count).toBe(3);
  });
});`}</code></pre>

      <h3 style={h3Style}>Testing Hooks with Context Providers</h3>
      <pre style={codeStyle}><code>{`// hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

// hooks/useAuth.test.tsx
import { renderHook } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from './useAuth';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider initialUser={{ id: '1', name: 'Alice', role: 'admin' }}>
    {children}
  </AuthProvider>
);

it('returns the current user from AuthContext', () => {
  const { result } = renderHook(() => useAuth(), { wrapper });
  expect(result.current.user).toMatchObject({ name: 'Alice', role: 'admin' });
});

it('throws when used outside AuthProvider', () => {
  // renderHook without wrapper — no provider present
  expect(() => renderHook(() => useAuth())).toThrow(
    'useAuth must be used within an AuthProvider'
  );
});`}</code></pre>

      {/* Section 9: Comparison Table */}
      <h2 style={h2Style}>Jest vs Vitest vs Mocha vs Jasmine — Framework Comparison</h2>
      <p>
        Choosing a test framework depends on your project&apos;s bundler, runtime, and team preferences.
        Here is a direct comparison of the four most popular JavaScript testing frameworks in 2025.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ ...thStyle, minWidth: '140px' }}>Feature</th>
              <th style={{ ...thStyle, minWidth: '110px' }}>Jest</th>
              <th style={{ ...thStyle, minWidth: '110px' }}>Vitest</th>
              <th style={{ ...thStyle, minWidth: '110px' }}>Mocha</th>
              <th style={{ ...thStyle, minWidth: '110px' }}>Jasmine</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Maintained by', 'Meta (Facebook)', 'Vitest team / Anthony Fu', 'Community', 'Pivotal / Community'],
              ['Initial release', '2014', '2021', '2011', '2010'],
              ['Zero config', 'Yes', 'Yes (Vite projects)', 'No — needs assertion lib + runner', 'Yes'],
              ['TypeScript support', 'Via ts-jest or Babel', 'Native (Vite)', 'Via ts-node / Babel', 'Via types + Babel'],
              ['Built-in assertions', 'Yes (expect)', 'Yes (expect — Jest-compatible)', 'No (use Chai, etc.)', 'Yes (expect)'],
              ['Built-in mocking', 'Yes (jest.fn, jest.mock)', 'Yes (vi.fn, vi.mock)', 'No (use Sinon)', 'Yes (spyOn)'],
              ['Snapshot testing', 'Yes', 'Yes (Jest-compatible)', 'Plugin needed', 'Plugin needed'],
              ['Code coverage', 'Yes (Istanbul)', 'Yes (V8 or Istanbul)', 'Plugin (nyc)', 'Plugin needed'],
              ['Fake timers', 'Yes', 'Yes', 'Via Sinon', 'Yes'],
              ['Watch mode', 'Yes', 'Yes (HMR-powered)', 'Plugin (nodemon)', 'Via CLI'],
              ['jsdom support', 'Yes (built-in)', 'Yes (via jsdom pool)', 'Via jsdom package', 'Via jsdom package'],
              ['ESM support', 'Experimental', 'Native', 'Yes (v10+)', 'Limited'],
              ['Speed', 'Good (parallel workers)', 'Fastest (Vite HMR)', 'Moderate', 'Good'],
              ['Best for', 'React / CRA / large apps', 'Vite / Vue / Svelte', 'Custom setups / Node.js', 'Angular / legacy'],
              ['GitHub stars (2025)', '~44K', '~13K', '~23K', '~16K'],
            ].map(([feature, jest, vitest, mocha, jasmine], i) => (
              <tr key={feature} style={{ background: i % 2 === 1 ? '#fafafa' : 'transparent' }}>
                <td style={{ ...tdStyle, fontWeight: 600, whiteSpace: 'nowrap' }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#0f766e' }}>{jest}</td>
                <td style={{ ...tdStyle, color: '#7c3aed' }}>{vitest}</td>
                <td style={tdStyle}>{mocha}</td>
                <td style={tdStyle}>{jasmine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Migration from Jest to Vitest</h3>
      <p>
        Vitest is API-compatible with Jest for most use cases. The migration steps are minimal:
      </p>
      <pre style={codeStyle}><code>{`# 1. Install Vitest
npm install --save-dev vitest @vitest/coverage-v8 jsdom

# 2. Update vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,             // no need to import describe/it/expect
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: { lines: 80, functions: 80, branches: 75 },
    },
  },
});

# 3. Replace jest.fn() with vi.fn(), jest.mock() with vi.mock()
# Most code requires no changes — the API is intentionally compatible`}</code></pre>

      {/* Section 10: Advanced Patterns */}
      <h2 style={h2Style}>Advanced Patterns — Test Factories, Custom Matchers, and Projects</h2>

      <h3 style={h3Style}>Test Data Factories</h3>
      <pre style={codeStyle}><code>{`// test/factories/userFactory.ts
import { v4 as uuid } from 'uuid';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: uuid(),
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    createdAt: new Date('2024-01-01'),
    ...overrides,
  };
}

// Usage in tests
const admin = createUser({ role: 'admin', name: 'Alice Admin' });
const users = Array.from({ length: 10 }, (_, i) => createUser({ name: \`User \${i}\` }));`}</code></pre>

      <h3 style={h3Style}>Custom Matchers with expect.extend()</h3>
      <pre style={codeStyle}><code>{`// test/matchers/customMatchers.ts
expect.extend({
  toBeValidEmail(received: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);
    return {
      pass,
      message: () =>
        pass
          ? \`expected \${received} not to be a valid email\`
          : \`expected \${received} to be a valid email\`,
    };
  },
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    return {
      pass,
      message: () =>
        \`expected \${received} \${pass ? 'not ' : ''}to be within range \${floor} - \${ceiling}\`,
    };
  },
});

// Extend TypeScript types
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidEmail(): R;
      toBeWithinRange(floor: number, ceiling: number): R;
    }
  }
}

// Usage
expect('user@example.com').toBeValidEmail();
expect(75).toBeWithinRange(0, 100);`}</code></pre>

      <h3 style={h3Style}>Jest Projects Configuration (Monorepo)</h3>
      <pre style={codeStyle}><code>{`// jest.config.ts (root of monorepo)
const config: Config = {
  projects: [
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/packages/frontend/**/*.test.tsx'],
      setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
    },
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/backend/**/*.test.ts'],
    },
    {
      displayName: 'shared',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/shared/**/*.test.ts'],
    },
  ],
  coverageThreshold: {
    global: { lines: 80 },
  },
};`}</code></pre>

      {/* Section 11: Debugging */}
      <h2 style={h2Style}>Debugging and Troubleshooting Common Jest Issues</h2>

      <h3 style={h3Style}>Debugging with VS Code</h3>
      <pre style={codeStyle}><code>{`// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest: Debug current file",
      "program": "\${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "\${relativeFile}",
        "--no-coverage",
        "--runInBand",
        "--watchAll=false"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}`}</code></pre>

      <h3 style={h3Style}>Common Issues and Fixes</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={thStyle}>Issue</th>
              <th style={thStyle}>Cause</th>
              <th style={thStyle}>Fix</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                'SyntaxError: Cannot use import statement',
                'Jest runs in CommonJS by default; ESM modules not transformed',
                'Add transformIgnorePatterns override or use Babel/ts-jest',
              ],
              [
                'Cannot find module "X" from test file',
                'moduleNameMapper not configured for path aliases',
                'Add alias mapping to moduleNameMapper in jest.config',
              ],
              [
                'ReferenceError: document is not defined',
                'testEnvironment defaults to "node" for non-browser tests',
                'Set testEnvironment: "jsdom" or add @jest-environment jsdom docblock',
              ],
              [
                'act() warning: An update was not wrapped in act()',
                'State update triggered outside React\'s rendering cycle',
                'Wrap state-triggering calls in act() or use userEvent',
              ],
              [
                'Snapshot tests fail every time',
                'Dynamic values (Date, UUID) stored in snapshots',
                'Use expect.any(Date) property matchers to ignore dynamic values',
              ],
              [
                'Tests hang and do not exit',
                'Open handles: DB connections, HTTP servers not closed',
                'Use --forceExit or close connections in afterAll',
              ],
              [
                'Mock not resetting between tests',
                'clearMocks not configured, shared module-level mock state',
                'Set clearMocks: true in config or call jest.clearAllMocks() in afterEach',
              ],
            ].map(([issue, cause, fix], i) => (
              <tr key={issue} style={{ background: i % 2 === 1 ? '#fafafa' : 'transparent' }}>
                <td style={{ ...tdStyle, color: '#dc2626', fontWeight: 500 }}>{issue}</td>
                <td style={tdStyle}>{cause}</td>
                <td style={{ ...tdStyle, color: '#15803d' }}>{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 12: FAQ */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>

      <h3 style={h3Style}>How do I mock an ES module with Jest?</h3>
      <p>
        Use <code style={inlineCode}>jest.mock()</code> at the top of the test file. For named exports,
        provide a factory function. For default exports, set <code style={inlineCode}>__esModule: true</code>{' '}
        in the factory. For projects using native ESM (without Babel), use{' '}
        <code style={inlineCode}>jest.unstable_mockModule()</code> with{' '}
        <code style={inlineCode}>--experimental-vm-modules</code>.
      </p>

      <h3 style={h3Style}>How do I set up Jest in a CI/CD pipeline?</h3>
      <p>
        Add a <code style={inlineCode}>test:ci</code> script:{' '}
        <code style={inlineCode}>jest --ci --coverage --forceExit</code>. The{' '}
        <code style={inlineCode}>--ci</code> flag disables interactive mode and fails on outdated snapshots.
        Set <code style={inlineCode}>coverageThreshold</code> in <code style={inlineCode}>jest.config.js</code>{' '}
        to enforce minimum coverage. Use the <code style={inlineCode}>jest-junit</code> reporter to emit
        JUnit XML for test result parsing in GitHub Actions or Jenkins.
      </p>

      <h3 style={h3Style}>What is the difference between jest.fn(), jest.mock(), and jest.spyOn()?</h3>
      <p>
        <code style={inlineCode}>jest.fn()</code> creates a standalone mock function for dependency
        injection. <code style={inlineCode}>jest.mock()</code> replaces an entire module for all imports
        within a test file. <code style={inlineCode}>jest.spyOn()</code> wraps an existing method on an
        object, allowing tracking while optionally keeping the original implementation. Use{' '}
        <code style={inlineCode}>mockRestore()</code> to undo spies in <code style={inlineCode}>afterEach</code>.
      </p>

      <h3 style={h3Style}>How do I achieve test isolation between Jest tests?</h3>
      <p>
        Configure <code style={inlineCode}>clearMocks: true</code> (reset call counts) or{' '}
        <code style={inlineCode}>resetMocks: true</code> (also reset return values) in{' '}
        <code style={inlineCode}>jest.config.js</code>. Use <code style={inlineCode}>beforeEach</code> to
        set up fresh state. Jest runs each test file in a separate Node.js worker by default, providing
        automatic file-level isolation. For database tests, wrap each test in a transaction and roll it back.
      </p>

      <h3 style={h3Style}>How do I test async code with fake timers?</h3>
      <p>
        Call <code style={inlineCode}>jest.useFakeTimers()</code> in <code style={inlineCode}>beforeEach</code>{' '}
        and <code style={inlineCode}>jest.useRealTimers()</code> in <code style={inlineCode}>afterEach</code>.
        Advance time with <code style={inlineCode}>jest.advanceTimersByTime(ms)</code> or flush all pending
        timers with <code style={inlineCode}>jest.runAllTimers()</code>. In React component tests, combine
        with <code style={inlineCode}>act()</code> to flush state updates.
      </p>

      <h3 style={h3Style}>When should I update snapshots?</h3>
      <p>
        Only update snapshots when you intentionally changed the output. Run{' '}
        <code style={inlineCode}>jest --updateSnapshot</code> (or <code style={inlineCode}>-u</code>) and
        review every diff carefully. Never batch-update all snapshots without reviewing changes — this
        defeats the regression-detection purpose. Prefer inline snapshots for small values that are
        easier to review in pull requests.
      </p>

      <h3 style={h3Style}>How do I improve slow Jest test suites?</h3>
      <p>
        Key optimizations: (1) enable <code style={inlineCode}>cache: true</code> in config, (2) stub heavy
        modules (CSS, images) via <code style={inlineCode}>moduleNameMapper</code>, (3) use{' '}
        <code style={inlineCode}>jest.mock()</code> to avoid real I/O, (4) set{' '}
        <code style={inlineCode}>maxWorkers</code> to 50% of CPU cores in CI, (5) limit{' '}
        <code style={inlineCode}>collectCoverageFrom</code> to source files only, and (6) consider switching
        to Vitest for Vite-based projects where native ESM and HMR make reruns significantly faster.
      </p>

      <h3 style={h3Style}>What is the best way to test API calls in React components?</h3>
      <p>
        Use <strong>Mock Service Worker (MSW)</strong> to intercept HTTP requests at the network level
        using a service worker or Node.js interceptor. MSW works transparently with any HTTP library
        (fetch, axios, ky) and makes tests realistic without depending on a real server. Set up MSW
        handlers in <code style={inlineCode}>jest.setup.ts</code>, define request handlers for test
        scenarios, and use <code style={inlineCode}>server.use()</code> for per-test overrides. Alternatively,
        use <code style={inlineCode}>jest.mock('axios')</code> for simpler scenarios where full network
        interception is unnecessary.
      </p>

      {/* Related Tools */}
      <h2 style={h2Style}>Related Developer Tools</h2>
      <p>
        When writing tests you often need to generate test data, validate JSON schemas, or format output.
        DevToolBox provides several free tools to streamline your testing workflow:
      </p>
      <ul style={{ paddingLeft: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link href={'/' + lang + '/tools/json-formatter'} style={{ color: '#0284c7' }}>
            JSON Formatter
          </Link>{' '}
          — Validate and format JSON responses returned by mocked API calls
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link href={'/' + lang + '/tools/regex-tester'} style={{ color: '#0284c7' }}>
            Regex Tester
          </Link>{' '}
          — Build and test regular expressions used in custom Jest matchers
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#0284c7' }}>
            UUID Generator
          </Link>{' '}
          — Generate test UUIDs for use in test fixtures and factories
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link href={'/' + lang + '/tools/base64'} style={{ color: '#0284c7' }}>
            Base64 Encoder/Decoder
          </Link>{' '}
          — Encode and decode test payloads and authorization headers
        </li>
        <li style={{ marginBottom: '0' }}>
          <Link href={'/' + lang + '/tools/hash-generator'} style={{ color: '#0284c7' }}>
            Hash Generator
          </Link>{' '}
          — Generate SHA-256 hashes for testing cryptographic utilities
        </li>
      </ul>
    </article>
  );
}
