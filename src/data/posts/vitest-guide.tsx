'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vitest: The Complete Guide to Vite-Native Testing in 2026',
    description:
      'Master Vitest, the blazing-fast Vite-native testing framework. Learn setup, mocking, async testing, snapshot testing, coverage, component testing, workspaces, benchmarking, and CI/CD integration with practical code examples.',
    tldr:
      'Vitest is a Vite-native unit testing framework that reuses your Vite config for instant HMR-powered test execution. It provides a Jest-compatible API (describe, it, expect) with native ESM support, TypeScript out of the box, and built-in mocking, snapshot testing, code coverage, and benchmarking. This guide covers everything from basic setup to advanced patterns like workspace testing, in-source testing, and CI/CD integration.',
    keyTakeaway1: 'Vitest reuses your Vite config so there is zero duplicate configuration for transforms, aliases, and plugins.',
    keyTakeaway2: 'The Jest-compatible API (describe, it, expect, vi) means almost zero learning curve if you already know Jest.',
    keyTakeaway3: 'Native ESM and TypeScript support eliminates the need for babel-jest or ts-jest transforms.',
    keyTakeaway4: 'Watch mode uses Vite HMR to re-run only affected tests, making the feedback loop nearly instant.',
    keyTakeaway5: 'Built-in code coverage via v8 or istanbul with no extra configuration needed.',
    keyTakeaway6: 'Workspace mode lets you configure different test environments per package in a monorepo.',
    keyTakeaway7: 'In-source testing lets you co-locate tests inside your source files and tree-shake them out of production builds.',
    keyTakeaway8: 'vitest bench provides built-in benchmarking with statistical analysis for performance testing.',
  },
  zh: {
    title: 'Vitest: 2026年 Vite 原生测试框架完全指南',
    description:
      '掌握 Vitest，这个极速 Vite 原生测试框架。学习配置、模拟、异步测试、快照测试、覆盖率、组件测试、工作区、基准测试和 CI/CD 集成。',
    tldr:
      'Vitest 是一个 Vite 原生的单元测试框架，复用你的 Vite 配置来实现即时的 HMR 驱动测试执行。它提供 Jest 兼容的 API（describe、it、expect），原生支持 ESM 和 TypeScript，内置模拟、快照测试、代码覆盖率和基准测试。本指南涵盖从基础配置到高级模式的所有内容。',
    keyTakeaway1: 'Vitest 复用你的 Vite 配置，转换、别名和插件无需重复配置。',
    keyTakeaway2: 'Jest 兼容 API（describe、it、expect、vi）意味着几乎零学习成本。',
    keyTakeaway3: '原生 ESM 和 TypeScript 支持，无需 babel-jest 或 ts-jest 转换。',
    keyTakeaway4: '监听模式使用 Vite HMR 仅重新运行受影响的测试，反馈循环几乎即时。',
    keyTakeaway5: '通过 v8 或 istanbul 内置代码覆盖率，无需额外配置。',
    keyTakeaway6: '工作区模式允许为 monorepo 中的每个包配置不同的测试环境。',
    keyTakeaway7: '源码内测试允许在源文件中共置测试，并在生产构建中摇树移除。',
    keyTakeaway8: 'vitest bench 提供内置基准测试和统计分析。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Vitest and how is it different from Jest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vitest is a Vite-native testing framework that reuses your Vite config and plugins. Unlike Jest which requires separate transform configuration (babel-jest, ts-jest), Vitest shares the same pipeline as your dev server, providing native ESM support, TypeScript out of the box, and HMR-powered watch mode for near-instant test re-runs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install and set up Vitest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install Vitest with npm install -D vitest, then add a test script to your package.json. Vitest reads your vite.config.ts automatically. You can add test-specific options under the test key using the defineConfig helper from vitest/config. No additional transform plugins are needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Vitest with React or Vue components?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Vitest works with @testing-library/react and @testing-library/vue. Set the environment to jsdom or happy-dom in your Vitest config, install the corresponding testing library, and write component tests using render, screen, and userEvent. Vitest handles JSX/TSX transforms automatically through Vite.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does mocking work in Vitest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vitest provides vi.fn() for creating mock functions, vi.mock() for mocking entire modules, and vi.spyOn() for spying on object methods. The vi object is globally available when globals is true. vi.mock() calls are hoisted to the top of the file automatically, and you can use vi.mocked() for type-safe access to mocked functions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate code coverage reports with Vitest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Run vitest --coverage to generate coverage reports. Vitest supports both v8 (default, faster) and istanbul providers. Configure thresholds, include/exclude patterns, and reporters (text, html, lcov, json) under test.coverage in your Vitest config. Install @vitest/coverage-v8 or @vitest/coverage-istanbul as needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is in-source testing in Vitest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In-source testing lets you write tests directly in your source files inside an if (import.meta.vitest) block. Vitest will discover and run these tests, but the block is tree-shaken out of production builds. Enable it by setting define: { "import.meta.vitest": "undefined" } in your Vite config for production.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Vitest handle workspaces and monorepos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vitest supports workspace configuration via vitest.workspace.ts where you define multiple projects with different configs. Each project can have its own environment (node, jsdom, happy-dom), include patterns, and setup files. This is ideal for monorepos where frontend and backend packages need different test environments.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I run Vitest in CI/CD pipelines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Run vitest run (non-watch mode) in CI. Use the --reporter=junit flag to output JUnit XML for CI systems. Add --coverage to enforce coverage thresholds. Vitest also supports --shard=1/4 for parallelizing tests across CI nodes. For GitHub Actions, use vitest --reporter=github-actions to get inline annotations on PRs.',
      },
    },
  ],
};

const codeStyle = {
  background: '#1e293b',
  color: '#e2e8f0',
  padding: '1rem',
  borderRadius: '6px',
  overflowX: 'auto' as const,
  fontSize: '0.875rem',
  lineHeight: '1.6',
  marginBottom: '1.5rem',
};

const h2Style = {
  fontSize: '1.5rem',
  fontWeight: '700' as const,
  marginTop: '2rem',
  marginBottom: '1rem',
  color: '#1e293b',
};

const h3Style = {
  fontSize: '1.15rem',
  fontWeight: '700' as const,
  marginTop: '1.5rem',
  marginBottom: '0.75rem',
  color: '#1e293b',
};

export default function VitestGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Introduction */}
      <p>
        Testing JavaScript and TypeScript applications has traditionally been dominated by Jest.
        While Jest is excellent, it was built before ES modules, Vite, and native TypeScript became
        mainstream. Configuring Jest for modern projects often requires <code>babel-jest</code>,{' '}
        <code>ts-jest</code>, and custom transform mappings that duplicate your build tool
        configuration. Vitest solves this by building directly on top of Vite.
      </p>
      <p>
        This guide covers everything you need to know about Vitest in 2026: from initial setup to
        advanced patterns like workspace testing, in-source testing, benchmarking, and CI/CD
        integration. Every section includes practical, copy-paste code examples.
      </p>

      {/* 1. What is Vitest */}
      <h2 style={h2Style}>1. What Is Vitest and Why Use It Over Jest?</h2>
      <p>
        Vitest is a blazing-fast unit testing framework powered by Vite. It reuses your existing{' '}
        <code>vite.config.ts</code> for transforms, resolve aliases, and plugins, which means zero
        duplicate configuration. Here is what makes Vitest stand out:
      </p>
      <ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
        <li><strong>Vite-native</strong>: Shares the same transform pipeline as your dev server and build tool.</li>
        <li><strong>Jest-compatible API</strong>: <code>describe</code>, <code>it</code>, <code>expect</code>, <code>vi</code> work the same way.</li>
        <li><strong>Native ESM</strong>: No CJS/ESM interop issues. Import/export works out of the box.</li>
        <li><strong>TypeScript built-in</strong>: No <code>ts-jest</code> or <code>@swc/jest</code> needed.</li>
        <li><strong>HMR watch mode</strong>: Only re-runs tests affected by your changes.</li>
        <li><strong>Built-in coverage</strong>: v8 and istanbul providers with zero extra config.</li>
        <li><strong>Snapshot testing</strong>: Inline and file snapshots, same as Jest.</li>
        <li><strong>Benchmarking</strong>: Built-in <code>vitest bench</code> command.</li>
        <li><strong>Workspace support</strong>: Different configs per package in monorepos.</li>
      </ul>

      <h3 style={h3Style}>Vitest vs Jest: Quick Comparison</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Jest</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Vitest</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['ESM Support', 'Experimental flag', 'Native'],
              ['TypeScript', 'ts-jest / @swc/jest', 'Built-in via Vite'],
              ['Config', 'jest.config.js', 'Reuses vite.config.ts'],
              ['Watch Mode', 'File-based', 'HMR-based (faster)'],
              ['Coverage', 'Separate package', 'Built-in (v8 / istanbul)'],
              ['Benchmarking', 'Not included', 'Built-in (vitest bench)'],
              ['In-source Testing', 'Not supported', 'Supported'],
              ['Workspace', 'projects array', 'vitest.workspace.ts'],
              ['Concurrent Tests', 'Per-file only', 'Per-test with .concurrent'],
            ].map(([feature, jest, vitest], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontWeight: 600 }}>{feature}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{jest}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{vitest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Setup */}
      <h2 style={h2Style}>2. Installation and Configuration</h2>
      <p>
        Getting started with Vitest takes under a minute. Install it as a dev dependency and add a
        test script:
      </p>
      <pre style={codeStyle}><code>{'# Install Vitest\n' +
        'npm install -D vitest\n' +
        '\n' +
        '# Or with pnpm / yarn\n' +
        'pnpm add -D vitest\n' +
        'yarn add -D vitest'}</code></pre>

      <p>Add test scripts to your <code>package.json</code>:</p>
      <pre style={codeStyle}><code>{'{\n' +
        '  "scripts": {\n' +
        '    "test": "vitest",\n' +
        '    "test:run": "vitest run",\n' +
        '    "test:coverage": "vitest run --coverage"\n' +
        '  }\n' +
        '}'}</code></pre>

      <p>
        Vitest reads your <code>vite.config.ts</code> automatically. To add test-specific options,
        use the <code>test</code> key:
      </p>
      <pre style={codeStyle}><code>{'/// <reference types="vitest" />\n' +
        'import { defineConfig } from \'vitest/config\';\n' +
        '\n' +
        'export default defineConfig({\n' +
        '  test: {\n' +
        '    globals: true,\n' +
        '    environment: \'node\',\n' +
        '    include: [\'src/**/*.{test,spec}.{ts,tsx}\'],\n' +
        '    coverage: {\n' +
        '      provider: \'v8\',\n' +
        '      reporter: [\'text\', \'html\', \'lcov\'],\n' +
        '    },\n' +
        '  },\n' +
        '});'}</code></pre>

      <p>
        When <code>globals: true</code> is set, <code>describe</code>, <code>it</code>,{' '}
        <code>expect</code>, and <code>vi</code> are available globally without importing. Add{' '}
        <code>vitest/globals</code> to your <code>tsconfig.json</code> types for proper IntelliSense:
      </p>
      <pre style={codeStyle}><code>{'{\n' +
        '  "compilerOptions": {\n' +
        '    "types": ["vitest/globals"]\n' +
        '  }\n' +
        '}'}</code></pre>

      {/* 3. Writing Tests */}
      <h2 style={h2Style}>3. Writing Tests: describe, it, expect</h2>
      <p>
        Vitest uses the same BDD-style API as Jest. Here is a complete example testing a utility
        function:
      </p>
      <pre style={codeStyle}><code>{'// src/utils/math.test.ts\n' +
        'import { describe, it, expect } from \'vitest\';\n' +
        'import { add, divide } from \'./math\';\n' +
        '\n' +
        'describe(\'add\', () => {\n' +
        '  it(\'adds two positive numbers\', () => {\n' +
        '    expect(add(2, 3)).toBe(5);\n' +
        '  });\n' +
        '  it(\'handles negative numbers\', () => {\n' +
        '    expect(add(-1, -2)).toBe(-3);\n' +
        '  });\n' +
        '});\n' +
        '\n' +
        'describe(\'divide\', () => {\n' +
        '  it(\'divides two numbers\', () => {\n' +
        '    expect(divide(10, 2)).toBe(5);\n' +
        '  });\n' +
        '  it(\'throws on division by zero\', () => {\n' +
        '    expect(() => divide(10, 0)).toThrow(\'Division by zero\');\n' +
        '  });\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>Common Matchers</h3>
      <p>Vitest provides all the matchers you know from Jest:</p>
      <pre style={codeStyle}><code>{'expect(value).toBe(42);              // strict ===\n' +
        'expect(obj).toEqual({ a: 1 });       // deep equality\n' +
        'expect(value).toBeTruthy();           // truthy check\n' +
        'expect(value).toBeNull();             // null check\n' +
        'expect(0.1 + 0.2).toBeCloseTo(0.3);  // floating point\n' +
        'expect(str).toMatch(/regex/);         // regex match\n' +
        'expect(str).toContain(\'sub\');         // substring\n' +
        'expect(arr).toHaveLength(3);          // array length\n' +
        'expect(obj).toHaveProperty(\'key\');    // property check\n' +
        'expect(() => fn()).toThrow(\'msg\');     // exception'}</code></pre>

      <h3 style={h3Style}>Test Lifecycle Hooks</h3>
      <pre style={codeStyle}><code>{'beforeAll(async () => { await setupDatabase(); });\n' +
        'afterAll(async () => { await teardownDatabase(); });\n' +
        'beforeEach(() => { resetState(); });\n' +
        'afterEach(() => { cleanup(); });'}</code></pre>

      {/* 4. Mocking */}
      <h2 style={h2Style}>4. Mocking: vi.fn(), vi.mock(), vi.spyOn()</h2>
      <p>
        Vitest provides a powerful mocking system through the <code>vi</code> object. It supports
        function mocks, module mocks, and spies.
      </p>

      <h3 style={h3Style}>vi.fn() - Mock Functions</h3>
      <pre style={codeStyle}><code>{'import { describe, it, expect, vi } from \'vitest\';\n' +
        '\n' +
        'describe(\'callback handling\', () => {\n' +
        '  it(\'calls the callback with correct args\', () => {\n' +
        '    const callback = vi.fn();\n' +
        '\n' +
        '    // Use the mock\n' +
        '    callback(\'hello\', 42);\n' +
        '    callback(\'world\');\n' +
        '\n' +
        '    // Assertions\n' +
        '    expect(callback).toHaveBeenCalledTimes(2);\n' +
        '    expect(callback).toHaveBeenCalledWith(\'hello\', 42);\n' +
        '    expect(callback).toHaveBeenLastCalledWith(\'world\');\n' +
        '  });\n' +
        '\n' +
        '  it(\'can define return values\', () => {\n' +
        '    const getPrice = vi.fn()\n' +
        '      .mockReturnValueOnce(9.99)\n' +
        '      .mockReturnValueOnce(19.99)\n' +
        '      .mockReturnValue(0);\n' +
        '\n' +
        '    expect(getPrice()).toBe(9.99);\n' +
        '    expect(getPrice()).toBe(19.99);\n' +
        '    expect(getPrice()).toBe(0);  // default\n' +
        '  });\n' +
        '\n' +
        '  it(\'can mock implementations\', () => {\n' +
        '    const multiply = vi.fn()\n' +
        '      .mockImplementation((a: number, b: number) => a * b);\n' +
        '\n' +
        '    expect(multiply(3, 4)).toBe(12);\n' +
        '  });\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>vi.mock() - Module Mocks</h3>
      <pre style={codeStyle}><code>{'// Automatically mock an entire module\n' +
        'vi.mock(\'./api-client\');\n' +
        '\n' +
        '// vi.mock calls are hoisted to the top of the file\n' +
        '// so this works even though the import is above\n' +
        'import { fetchUser } from \'./api-client\';\n' +
        '\n' +
        'describe(\'user service\', () => {\n' +
        '  it(\'calls fetchUser with the correct id\', async () => {\n' +
        '    // Type-safe access to mock\n' +
        '    const mockedFetch = vi.mocked(fetchUser);\n' +
        '    mockedFetch.mockResolvedValue({ id: 1, name: \'Alice\' });\n' +
        '\n' +
        '    const user = await fetchUser(1);\n' +
        '    expect(user.name).toBe(\'Alice\');\n' +
        '    expect(mockedFetch).toHaveBeenCalledWith(1);\n' +
        '  });\n' +
        '});\n' +
        '\n' +
        '// Partial mock with factory function\n' +
        'vi.mock(\'./utils\', () => ({\n' +
        '  formatDate: vi.fn(() => \'2026-01-01\'),\n' +
        '  // Keep original implementation for other exports\n' +
        '  ...vi.importActual(\'./utils\'),\n' +
        '}));'}</code></pre>

      <h3 style={h3Style}>vi.spyOn() - Spying on Methods</h3>
      <pre style={codeStyle}><code>{'import { describe, it, expect, vi, afterEach } from \'vitest\';\n' +
        '\n' +
        'describe(\'spying\', () => {\n' +
        '  afterEach(() => {\n' +
        '    vi.restoreAllMocks();\n' +
        '  });\n' +
        '\n' +
        '  it(\'spies on console.log\', () => {\n' +
        '    const spy = vi.spyOn(console, \'log\');\n' +
        '\n' +
        '    console.log(\'hello\');\n' +
        '\n' +
        '    expect(spy).toHaveBeenCalledWith(\'hello\');\n' +
        '  });\n' +
        '\n' +
        '  it(\'spies on and replaces implementation\', () => {\n' +
        '    const spy = vi.spyOn(Math, \'random\')\n' +
        '      .mockReturnValue(0.5);\n' +
        '\n' +
        '    expect(Math.random()).toBe(0.5);\n' +
        '    expect(spy).toHaveBeenCalled();\n' +
        '  });\n' +
        '});'}</code></pre>

      {/* 5. Async Testing */}
      <h2 style={h2Style}>5. Testing Async Code</h2>
      <p>
        Vitest handles promises, async/await, callbacks, timers, and fetch calls seamlessly.
      </p>

      <h3 style={h3Style}>Promises and async/await</h3>
      <pre style={codeStyle}><code>{'import { describe, it, expect } from \'vitest\';\n' +
        '\n' +
        'async function fetchTodo(id: number) {\n' +
        '  const res = await fetch(\n' +
        '    \'https://jsonplaceholder.typicode.com/todos/\' + id\n' +
        '  );\n' +
        '  return res.json();\n' +
        '}\n' +
        '\n' +
        'describe(\'async tests\', () => {\n' +
        '  it(\'resolves a promise\', async () => {\n' +
        '    const result = await Promise.resolve(42);\n' +
        '    expect(result).toBe(42);\n' +
        '  });\n' +
        '\n' +
        '  it(\'rejects with an error\', async () => {\n' +
        '    await expect(\n' +
        '      Promise.reject(new Error(\'fail\'))\n' +
        '    ).rejects.toThrow(\'fail\');\n' +
        '  });\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>Fake Timers</h3>
      <pre style={codeStyle}><code>{'describe(\'debounce\', () => {\n' +
        '  beforeEach(() => vi.useFakeTimers());\n' +
        '  afterEach(() => vi.useRealTimers());\n' +
        '\n' +
        '  it(\'only calls fn after delay\', () => {\n' +
        '    const fn = vi.fn();\n' +
        '    const debounced = debounce(fn, 300);\n' +
        '\n' +
        '    debounced(); debounced(); debounced();\n' +
        '    expect(fn).not.toHaveBeenCalled();\n' +
        '\n' +
        '    vi.advanceTimersByTime(300);\n' +
        '    expect(fn).toHaveBeenCalledTimes(1);\n' +
        '  });\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>Mocking Fetch</h3>
      <pre style={codeStyle}><code>{'it(\'mocks a GET request\', async () => {\n' +
        '  const mockData = { id: 1, title: \'Test Todo\' };\n' +
        '  global.fetch = vi.fn().mockResolvedValue({\n' +
        '    ok: true,\n' +
        '    json: () => Promise.resolve(mockData),\n' +
        '  });\n' +
        '  const res = await fetch(\'/api/todos/1\');\n' +
        '  const data = await res.json();\n' +
        '  expect(data).toEqual(mockData);\n' +
        '  expect(fetch).toHaveBeenCalledWith(\'/api/todos/1\');\n' +
        '});'}</code></pre>

      {/* 6. Snapshot Testing */}
      <h2 style={h2Style}>6. Snapshot Testing</h2>
      <p>
        Snapshot tests capture the output of a function or component and compare it against a stored
        reference. If the output changes, the test fails until you update the snapshot.
      </p>

      <pre style={codeStyle}><code>{'import { describe, it, expect } from \'vitest\';\n' +
        '\n' +
        'function generateConfig(env: string) {\n' +
        '  return {\n' +
        '    apiUrl: env === \'production\'\n' +
        '      ? \'https://api.example.com\'\n' +
        '      : \'http://localhost:3000\',\n' +
        '    debug: env !== \'production\',\n' +
        '    logLevel: env === \'production\' ? \'error\' : \'debug\',\n' +
        '  };\n' +
        '}\n' +
        '\n' +
        'describe(\'generateConfig\', () => {\n' +
        '  // File snapshot (saved to __snapshots__/)\n' +
        '  it(\'matches production config snapshot\', () => {\n' +
        '    expect(generateConfig(\'production\')).toMatchSnapshot();\n' +
        '  });\n' +
        '\n' +
        '  // Inline snapshot (stored in the test file)\n' +
        '  it(\'matches dev config inline snapshot\', () => {\n' +
        '    expect(generateConfig(\'development\')).toMatchInlineSnapshot();\n' +
        '    // Vitest fills in the snapshot on first run\n' +
        '  });\n' +
        '});\n' +
        '\n' +
        '// Update snapshots: vitest run --update\n' +
        '// Or press u in watch mode'}</code></pre>

      {/* 7. Coverage */}
      <h2 style={h2Style}>7. Code Coverage with v8 / Istanbul</h2>
      <p>
        Vitest has built-in coverage support. Install the provider package and configure thresholds:
      </p>

      <pre style={codeStyle}><code>{'# Install the coverage provider\n' +
        'npm install -D @vitest/coverage-v8\n' +
        '# Or for istanbul:\n' +
        'npm install -D @vitest/coverage-istanbul'}</code></pre>

      <pre style={codeStyle}><code>{'// vitest.config.ts\n' +
        'import { defineConfig } from \'vitest/config\';\n' +
        '\n' +
        'export default defineConfig({\n' +
        '  test: {\n' +
        '    coverage: {\n' +
        '      provider: \'v8\',  // or \'istanbul\'\n' +
        '      reporter: [\'text\', \'html\', \'lcov\', \'json\'],\n' +
        '      include: [\'src/**/*.ts\'],\n' +
        '      exclude: [\n' +
        '        \'src/**/*.test.ts\',\n' +
        '        \'src/**/*.d.ts\',\n' +
        '        \'src/types/**\',\n' +
        '      ],\n' +
        '      thresholds: {\n' +
        '        branches: 80,\n' +
        '        functions: 80,\n' +
        '        lines: 80,\n' +
        '        statements: 80,\n' +
        '      },\n' +
        '    },\n' +
        '  },\n' +
        '});'}</code></pre>

      <p>Run coverage with:</p>
      <pre style={codeStyle}><code>{'# Generate coverage report\n' +
        'npx vitest run --coverage\n' +
        '\n' +
        '# Open the HTML report\n' +
        'open coverage/index.html'}</code></pre>

      <p>
        The <code>v8</code> provider is faster because it uses V8 engine built-in coverage. The{' '}
        <code>istanbul</code> provider instruments code at the AST level and is more accurate for
        edge cases like branch coverage in ternary expressions.
      </p>

      {/* 8. Component Testing */}
      <h2 style={h2Style}>8. Testing React and Vue Components</h2>
      <p>
        Vitest works seamlessly with <code>@testing-library</code> for component testing. Set the
        environment to <code>jsdom</code> or <code>happy-dom</code> in your config.
      </p>

      <h3 style={h3Style}>React Component Testing</h3>
      <pre style={codeStyle}><code>{'# Install dependencies\n' +
        'npm install -D @testing-library/react @testing-library/jest-dom \\\n' +
        '  @testing-library/user-event jsdom\n' +
        '\n' +
        '# Setup: vitest.config.ts\n' +
        '# plugins: [react()], test: { environment: \'jsdom\', setupFiles: [\'./src/test/setup.ts\'] }\n' +
        '# src/test/setup.ts: import \'@testing-library/jest-dom/vitest\';'}</code></pre>

      <pre style={codeStyle}><code>{'// src/components/Counter.test.tsx\n' +
        'import { render, screen } from \'@testing-library/react\';\n' +
        'import userEvent from \'@testing-library/user-event\';\n' +
        'import { describe, it, expect } from \'vitest\';\n' +
        'import { Counter } from \'./Counter\';\n' +
        '\n' +
        'describe(\'Counter\', () => {\n' +
        '  it(\'renders initial count of 0\', () => {\n' +
        '    render(<Counter />);\n' +
        '    expect(screen.getByTestId(\'count\')).toHaveTextContent(\'Count: 0\');\n' +
        '  });\n' +
        '\n' +
        '  it(\'increments on click\', async () => {\n' +
        '    render(<Counter />);\n' +
        '    const user = userEvent.setup();\n' +
        '    await user.click(screen.getByText(\'Increment\'));\n' +
        '    await user.click(screen.getByText(\'Increment\'));\n' +
        '    expect(screen.getByTestId(\'count\')).toHaveTextContent(\'Count: 2\');\n' +
        '  });\n' +
        '});\n' +
        '\n' +
        '// Vue: npm install -D @testing-library/vue happy-dom\n' +
        '// Config: plugins: [vue()], test: { environment: \'happy-dom\' }'}</code></pre>

      {/* 9. In-source Testing */}
      <h2 style={h2Style}>9. In-Source Testing</h2>
      <p>
        Vitest supports writing tests directly inside your source files. The tests are
        tree-shaken out of production builds, so they have zero impact on bundle size.
      </p>

      <pre style={codeStyle}><code>{'// src/utils/slug.ts\n' +
        'export function slugify(text: string): string {\n' +
        '  return text\n' +
        '    .toLowerCase()\n' +
        '    .replace(/[^a-z0-9]+/g, \'-\')\n' +
        '    .replace(/^-|-\\$/g, \'\');\n' +
        '}\n' +
        '\n' +
        '// In-source tests — only run by Vitest\n' +
        'if (import.meta.vitest) {\n' +
        '  const { describe, it, expect } = import.meta.vitest;\n' +
        '\n' +
        '  describe(\'slugify\', () => {\n' +
        '    it(\'converts text to slug\', () => {\n' +
        '      expect(slugify(\'Hello World\')).toBe(\'hello-world\');\n' +
        '    });\n' +
        '\n' +
        '    it(\'removes special characters\', () => {\n' +
        '      expect(slugify(\'Hello, World!\')).toBe(\'hello-world\');\n' +
        '    });\n' +
        '\n' +
        '    it(\'trims leading/trailing hyphens\', () => {\n' +
        '      expect(slugify(\'--hello--\')).toBe(\'hello\');\n' +
        '    });\n' +
        '  });\n' +
        '}'}</code></pre>

      <p>Enable in-source testing in your config:</p>
      <pre style={codeStyle}><code>{'// vitest.config.ts\n' +
        'export default defineConfig({\n' +
        '  test: {\n' +
        '    includeSource: [\'src/**/*.ts\'],\n' +
        '  },\n' +
        '  define: {\n' +
        '    // Tree-shake in production\n' +
        '    \'import.meta.vitest\': \'undefined\',\n' +
        '  },\n' +
        '});'}</code></pre>

      {/* 10. Workspace */}
      <h2 style={h2Style}>10. Workspace and Monorepo Testing</h2>
      <p>
        For monorepos with packages that need different test environments, Vitest workspaces let you
        define per-project configurations in a single file:
      </p>

      <pre style={codeStyle}><code>{'// vitest.workspace.ts\n' +
        'import { defineWorkspace } from \'vitest/config\';\n' +
        '\n' +
        'export default defineWorkspace([\n' +
        '  {\n' +
        '    test: {\n' +
        '      name: \'api\',\n' +
        '      root: \'./packages/api\',\n' +
        '      environment: \'node\',\n' +
        '      include: [\'src/**/*.test.ts\'],\n' +
        '    },\n' +
        '  },\n' +
        '  {\n' +
        '    test: {\n' +
        '      name: \'web\',\n' +
        '      root: \'./packages/web\',\n' +
        '      environment: \'jsdom\',\n' +
        '      include: [\'src/**/*.test.tsx\'],\n' +
        '      setupFiles: [\'./src/test/setup.ts\'],\n' +
        '    },\n' +
        '  },\n' +
        ']);'}</code></pre>

      <p>Run tests for a specific project:</p>
      <pre style={codeStyle}><code>{'# Run all workspace tests\n' +
        'npx vitest\n' +
        '\n' +
        '# Run only the web project\n' +
        'npx vitest --project web\n' +
        '\n' +
        '# Run only the api project\n' +
        'npx vitest --project api'}</code></pre>

      {/* 11. Watch Mode */}
      <h2 style={h2Style}>11. Watch Mode and Test Filtering</h2>
      <p>
        Vitest runs in watch mode by default during development. It uses Vite HMR to detect which
        tests are affected by your changes and only re-runs those tests.
      </p>

      <pre style={codeStyle}><code>{'# Start watch mode (default)\n' +
        'npx vitest\n' +
        '\n' +
        '# Run tests matching a name pattern\n' +
        'npx vitest -t "should validate email"\n' +
        '\n' +
        '# Run only specific test files\n' +
        'npx vitest src/utils/math.test.ts\n' +
        '\n' +
        '# Run tests matching a file pattern\n' +
        'npx vitest --reporter=verbose utils\n' +
        '\n' +
        '# Run in single-run mode (no watch)\n' +
        'npx vitest run'}</code></pre>

      <p>In watch mode, you can use these keyboard shortcuts:</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Key</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['a', 'Re-run all tests'],
              ['f', 'Re-run only failed tests'],
              ['u', 'Update snapshots'],
              ['p', 'Filter by filename'],
              ['t', 'Filter by test name'],
              ['q', 'Quit watch mode'],
              ['h', 'Show help'],
            ].map(([key, action], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600 }}>{key}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>You can also use <code>.only</code>, <code>.skip</code>, <code>.todo</code>, and <code>.concurrent</code> modifiers:</p>
      <pre style={codeStyle}><code>{'describe(\'my suite\', () => {\n' +
        '  it.only(\'runs only this test\', () => { /* ... */ });\n' +
        '  it.skip(\'skipped test\', () => { /* ... */ });\n' +
        '  it.todo(\'not implemented yet\');\n' +
        '  it.concurrent(\'runs in parallel\', async () => { /* ... */ });\n' +
        '});'}</code></pre>

      {/* 12. Benchmarking */}
      <h2 style={h2Style}>12. Benchmarking with vitest bench</h2>
      <p>
        Vitest includes a built-in benchmarking tool powered by Tinybench. Create{' '}
        <code>.bench.ts</code> files and run them with <code>vitest bench</code>:
      </p>

      <pre style={codeStyle}><code>{'// src/utils/search.bench.ts\n' +
        'import { bench, describe } from \'vitest\';\n' +
        '\n' +
        'function linearSearch(arr: number[], target: number) {\n' +
        '  for (let i = 0; i < arr.length; i++) {\n' +
        '    if (arr[i] === target) return i;\n' +
        '  }\n' +
        '  return -1;\n' +
        '}\n' +
        '\n' +
        'function binarySearch(arr: number[], target: number) {\n' +
        '  let lo = 0, hi = arr.length - 1;\n' +
        '  while (lo <= hi) {\n' +
        '    const mid = (lo + hi) >>> 1;\n' +
        '    if (arr[mid] === target) return mid;\n' +
        '    if (arr[mid] < target) lo = mid + 1;\n' +
        '    else hi = mid - 1;\n' +
        '  }\n' +
        '  return -1;\n' +
        '}\n' +
        '\n' +
        'const sorted = Array.from({ length: 10000 }, (_, i) => i);\n' +
        '\n' +
        'describe(\'search algorithms\', () => {\n' +
        '  bench(\'linear search\', () => {\n' +
        '    linearSearch(sorted, 9999);\n' +
        '  });\n' +
        '\n' +
        '  bench(\'binary search\', () => {\n' +
        '    binarySearch(sorted, 9999);\n' +
        '  });\n' +
        '});'}</code></pre>

      <pre style={codeStyle}><code>{'# Run benchmarks\n' +
        'npx vitest bench\n' +
        '\n' +
        '# Output shows ops/sec, min, max, mean, p75, p99 for each bench'}</code></pre>

      {/* 13. CI/CD */}
      <h2 style={h2Style}>13. CI/CD Integration</h2>
      <p>
        Running Vitest in CI requires non-watch mode and proper reporting. Here are configurations
        for the most popular CI systems:
      </p>

      <h3 style={h3Style}>GitHub Actions</h3>
      <pre style={codeStyle}><code>{'# .github/workflows/test.yml\n' +
        'name: Tests\n' +
        'on: [push, pull_request]\n' +
        '\n' +
        'jobs:\n' +
        '  test:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - uses: actions/setup-node@v4\n' +
        '        with:\n' +
        '          node-version: 20\n' +
        '          cache: npm\n' +
        '      - run: npm ci\n' +
        '      - run: npx vitest run --reporter=github-actions --coverage\n' +
        '      - uses: actions/upload-artifact@v4\n' +
        '        if: always()\n' +
        '        with:\n' +
        '          name: coverage-report\n' +
        '          path: coverage/'}</code></pre>

      <h3 style={h3Style}>Test Sharding and Reporters</h3>
      <pre style={codeStyle}><code>{'# Split tests across parallel CI jobs\n' +
        'npx vitest run --shard=1/4  # Job 1 of 4\n' +
        'npx vitest run --shard=2/4  # Job 2 of 4\n' +
        '\n' +
        '# JUnit XML for CI dashboards\n' +
        'npx vitest run --reporter=junit --outputFile=test-results.xml\n' +
        '\n' +
        '# Multiple reporters simultaneously\n' +
        'npx vitest run --reporter=default --reporter=junit \\\n' +
        '  --outputFile.junit=test-results.xml'}</code></pre>

      {/* 14. Best Practices */}
      <h2 style={h2Style}>14. Best Practices</h2>

      <h3 style={h3Style}>File Organization</h3>
      <p>
        Co-locate tests with source files (<code>math.ts</code> + <code>math.test.ts</code>) and
        keep shared test setup in a <code>src/test/</code> directory. Use <code>.bench.ts</code>{' '}
        for benchmark files alongside their source.
      </p>

      <h3 style={h3Style}>Testing Patterns</h3>
      <pre style={codeStyle}><code>{'// 1. Arrange-Act-Assert pattern\n' +
        'it(\'calculates total price\', () => {\n' +
        '  const items = [{ price: 9.99, qty: 2 }, { price: 24.99, qty: 1 }];\n' +
        '  const total = calculateTotal(items);\n' +
        '  expect(total).toBeCloseTo(44.97, 2);\n' +
        '});\n' +
        '\n' +
        '// 2. Parameterized tests with test.each\n' +
        'it.each([\n' +
        '  [1, 1, 2], [2, 3, 5], [-1, 1, 0],\n' +
        '])(\'add(%i, %i) = %i\', (a, b, expected) => {\n' +
        '  expect(add(a, b)).toBe(expected);\n' +
        '});\n' +
        '\n' +
        '// 3. Always clean up mocks\n' +
        'afterEach(() => { vi.restoreAllMocks(); });'}</code></pre>

      <h3 style={h3Style}>Performance Tips</h3>
      <ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
        <li>
          <strong>Use happy-dom over jsdom</strong> when possible. It is significantly faster for
          simple DOM operations.
        </li>
        <li>
          <strong>Avoid importing heavy modules</strong> in test setup files. Use{' '}
          <code>vi.mock()</code> to stub them instead.
        </li>
        <li>
          <strong>Use <code>--pool=forks</code></strong> for CPU-intensive tests to isolate them in
          separate processes.
        </li>
        <li>
          <strong>Use <code>--shard</code></strong> in CI to split tests across multiple runners.
        </li>
        <li>
          <strong>Minimize <code>beforeEach</code></strong> work. Only set up what each test actually
          needs.
        </li>
        <li>
          <strong>Use <code>.concurrent</code></strong> for tests that do not share mutable state to
          run them in parallel.
        </li>
      </ul>

      {/* Key Takeaways Box */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05em' }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>{t.keyTakeaway1}</li>
          <li>{t.keyTakeaway2}</li>
          <li>{t.keyTakeaway3}</li>
          <li>{t.keyTakeaway4}</li>
          <li>{t.keyTakeaway5}</li>
          <li>{t.keyTakeaway6}</li>
          <li>{t.keyTakeaway7}</li>
          <li>{t.keyTakeaway8}</li>
        </ul>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>Conclusion</h2>
      <p>
        Vitest has become the de facto testing framework for Vite-based projects and is rapidly
        gaining adoption across the JavaScript ecosystem. Its key advantage is eliminating the
        configuration duplication between your build tool and test runner. If you are using Vite for
        development and production builds, Vitest is the natural choice for testing.
      </p>
      <p>
        Start with the basics — <code>describe</code>, <code>it</code>, <code>expect</code> — then
        gradually adopt advanced features like in-source testing, workspace mode, and benchmarking
        as your project grows. The Jest-compatible API means you can migrate existing tests with
        minimal changes, often just swapping the import statements.
      </p>
    </article>
  );
}
