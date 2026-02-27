'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Software Testing Strategies: Unit, Integration, E2E, TDD, BDD & CI Testing Complete Guide',
    description:
      'Master software testing strategies: unit testing with Jest/Vitest, integration testing, E2E with Playwright/Cypress, TDD/BDD workflows, test pyramids, mocking patterns, test coverage, CI testing pipelines, performance testing, and snapshot/visual regression testing with real-world examples.',
  },
  zh: {
    title: '软件测试策略完全指南：单元测试、集成测试、E2E、TDD、BDD 与 CI 测试',
    description:
      '掌握软件测试策略：使用 Jest/Vitest 进行单元测试、集成测试、Playwright/Cypress E2E 测试、TDD/BDD 工作流、测试金字塔、Mock 模式、测试覆盖率、CI 测试管道、性能测试以及快照/视觉回归测试的实战示例。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between unit testing, integration testing, and E2E testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unit tests verify individual functions or components in isolation, running fast with mocked dependencies. Integration tests check how multiple modules work together with real dependencies like databases or APIs. End-to-end (E2E) tests simulate real user workflows through the entire application stack. The test pyramid recommends many unit tests, fewer integration tests, and minimal E2E tests for optimal cost-to-confidence ratio.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Test-Driven Development (TDD) and how does it work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TDD follows a Red-Green-Refactor cycle: first write a failing test that defines desired behavior (Red), then write the minimum code to make it pass (Green), then refactor for quality while keeping tests green (Refactor). TDD ensures every line of production code is driven by a test, leading to better design, higher coverage, and fewer regressions.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use Jest vs Vitest for JavaScript testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vitest is recommended for Vite-based projects as it shares the same config and transform pipeline, runs significantly faster with native ESM support, and has a Jest-compatible API. Jest remains the standard for non-Vite projects, has the largest ecosystem of plugins and matchers, and is well-supported in Create React App and Next.js. Both support mocking, snapshots, code coverage, and parallel execution.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Playwright and Cypress compare for E2E testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Playwright supports Chromium, Firefox, and WebKit with native multi-tab, multi-origin, and network interception. It runs faster with auto-wait and parallel browser contexts. Cypress has an excellent developer experience with time-travel debugging, real-time reloading, and a visual test runner, but only supports Chromium-based browsers and Chrome natively. Choose Playwright for cross-browser coverage and CI speed; choose Cypress for developer experience and interactive debugging.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is BDD and how does it differ from TDD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Behavior-Driven Development (BDD) extends TDD by writing tests in natural language (Given-When-Then) that both developers and stakeholders can understand. While TDD focuses on technical correctness from a developer perspective, BDD focuses on business behavior and acceptance criteria. BDD tools like Cucumber and Jest-Cucumber translate Gherkin feature files into executable test steps.',
      },
    },
    {
      '@type': 'Question',
      name: 'What test coverage percentage should I aim for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aim for 80% line and branch coverage as a practical target. 100% coverage is rarely worth the effort as it leads to brittle tests on trivial code. Focus coverage on business-critical paths, complex algorithms, and error handling rather than getters/setters or boilerplate. Use coverage tools (Istanbul/c8/v8) to identify untested code paths, not as a quality metric alone — high coverage does not guarantee meaningful tests.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I set up testing in a CI/CD pipeline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In CI, run unit tests first (fastest feedback), then integration tests, then E2E tests. Use parallelization to split test suites across workers. Cache node_modules and build artifacts between steps. Set coverage thresholds to fail the pipeline if coverage drops. Store test reports and artifacts (screenshots, videos) for debugging. Use GitHub Actions, GitLab CI, or CircleCI with matrix builds for cross-environment testing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best practices for mocking in tests?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mock external dependencies (APIs, databases, file system) but avoid mocking internal implementation details. Use dependency injection to make code testable. Prefer spies over mocks when you only need to verify calls. Reset mocks between tests to prevent state leakage. Use MSW (Mock Service Worker) for API mocking in both tests and development. Keep mocks close to their real behavior to avoid false confidence.',
      },
    },
  ],
};

export default function TestingStrategiesGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

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

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7' }}>
          {t.description}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          {isZh ? 'TL;DR — 60 秒速览软件测试策略' : 'TL;DR — Software Testing Strategies in 60 Seconds'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.9' }}>
          <li>{isZh ? '测试金字塔：大量单元测试 > 适量集成测试 > 少量 E2E 测试' : 'Test Pyramid: Many unit tests > Some integration tests > Few E2E tests'}</li>
          <li>{isZh ? 'TDD（红-绿-重构）确保每行代码都由测试驱动，提高设计质量' : 'TDD (Red-Green-Refactor) ensures every line of code is test-driven, improving design quality'}</li>
          <li>{isZh ? 'Jest/Vitest 用于单元和集成测试；Playwright/Cypress 用于 E2E 测试' : 'Jest/Vitest for unit & integration tests; Playwright/Cypress for E2E testing'}</li>
          <li>{isZh ? 'Mock 外部依赖，而非内部实现；使用 MSW 进行 API Mock' : 'Mock external dependencies, not internals; use MSW for API mocking'}</li>
          <li>{isZh ? '目标 80% 覆盖率，聚焦业务关键路径和错误处理' : 'Target 80% coverage, focus on business-critical paths and error handling'}</li>
          <li>{isZh ? 'CI 中按速度分层运行：单元 → 集成 → E2E，并行化加速' : 'Layer CI by speed: unit → integration → E2E, parallelize for speed'}</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ fontSize: '1rem', color: '#334155', display: 'block', marginBottom: '10px' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
          <li>{isZh ? '测试金字塔是平衡速度、成本和信心的最佳策略' : 'The test pyramid is the best strategy for balancing speed, cost, and confidence'}</li>
          <li>{isZh ? 'TDD 不仅是测试方法，更是一种设计方法论' : 'TDD is not just a testing method — it is a design methodology'}</li>
          <li>{isZh ? 'Vitest 是 Vite 项目的首选；Jest 是非 Vite 项目的标准' : 'Vitest is the go-to for Vite projects; Jest is the standard for non-Vite projects'}</li>
          <li>{isZh ? 'Playwright 胜在跨浏览器和 CI 速度；Cypress 胜在开发体验' : 'Playwright wins on cross-browser & CI speed; Cypress wins on developer experience'}</li>
          <li>{isZh ? '好的 Mock 策略让测试既可靠又易于维护' : 'A good mocking strategy makes tests both reliable and maintainable'}</li>
          <li>{isZh ? '覆盖率是发现盲区的工具，而非质量的唯一指标' : 'Coverage is a tool for finding blind spots, not the sole indicator of quality'}</li>
          <li>{isZh ? 'CI 测试管道应该快速、可靠、并提供清晰的失败报告' : 'CI test pipelines should be fast, reliable, and provide clear failure reports'}</li>
        </ul>
      </div>

      {/* --- Section 1: Test Pyramid --- */}
      <h2 style={h2Style}>
        {isZh ? '1. 测试金字塔与测试策略' : '1. The Test Pyramid & Testing Strategy'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '测试金字塔由 Mike Cohn 提出，是组织测试层次的经典模型。底层是大量快速的单元测试，中层是适量的集成测试，顶层是少量但覆盖完整用户流程的端到端测试。'
          : 'The test pyramid, introduced by Mike Cohn, is the classic model for organizing test layers. The base consists of many fast unit tests, the middle has a moderate number of integration tests, and the top has a few end-to-end tests covering complete user flows.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '层级' : 'Layer'}</th>
            <th style={thStyle}>{isZh ? '速度' : 'Speed'}</th>
            <th style={thStyle}>{isZh ? '成本' : 'Cost'}</th>
            <th style={thStyle}>{isZh ? '信心' : 'Confidence'}</th>
            <th style={thStyle}>{isZh ? '占比' : 'Proportion'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '单元测试' : 'Unit Tests'}</td>
            <td style={tdStyle}>{isZh ? '极快 (<10ms)' : 'Very Fast (<10ms)'}</td>
            <td style={tdStyle}>{isZh ? '低' : 'Low'}</td>
            <td style={tdStyle}>{isZh ? '中等' : 'Medium'}</td>
            <td style={tdStyle}>70%</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '集成测试' : 'Integration Tests'}</td>
            <td style={tdStyle}>{isZh ? '中等 (100ms-5s)' : 'Medium (100ms-5s)'}</td>
            <td style={tdStyle}>{isZh ? '中等' : 'Medium'}</td>
            <td style={tdStyle}>{isZh ? '高' : 'High'}</td>
            <td style={tdStyle}>20%</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? 'E2E 测试' : 'E2E Tests'}</td>
            <td style={tdStyle}>{isZh ? '慢 (5s-60s)' : 'Slow (5s-60s)'}</td>
            <td style={tdStyle}>{isZh ? '高' : 'High'}</td>
            <td style={tdStyle}>{isZh ? '最高' : 'Highest'}</td>
            <td style={tdStyle}>10%</td>
          </tr>
        </tbody>
      </table>

      <p style={pStyle}>
        {isZh
          ? '测试奖杯（Testing Trophy）是 Kent C. Dodds 提出的替代模型，强调集成测试是最有价值的层级，因为它以合理的成本提供了最高的信心。在现代前端开发中，这种策略尤其适用。'
          : 'The Testing Trophy, proposed by Kent C. Dodds, is an alternative model that emphasizes integration tests as the most valuable layer, providing the highest confidence at a reasonable cost. This strategy is especially relevant in modern frontend development.'}
      </p>

      {/* --- Section 2: Unit Testing --- */}
      <h2 style={h2Style}>
        {isZh ? '2. 单元测试：Jest 与 Vitest' : '2. Unit Testing: Jest & Vitest'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '单元测试验证独立函数或组件的行为。测试应该快速、确定性、且不依赖外部服务。'
          : 'Unit tests verify the behavior of individual functions or components. Tests should be fast, deterministic, and independent of external services.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Jest 基础示例' : 'Jest Basic Example'}</h3>
      <pre style={preStyle}><code>
        {'// math.ts\n'}
        {'export function add(a: number, b: number): number {\n'}
        {'  return a + b;\n'}
        {'}\n\n'}
        {'export function divide(a: number, b: number): number {\n'}
        {'  if (b === 0) throw new Error("Division by zero");\n'}
        {'  return a / b;\n'}
        {'}\n\n'}
        {'export function fibonacci(n: number): number {\n'}
        {'  if (n <= 1) return n;\n'}
        {'  return fibonacci(n - 1) + fibonacci(n - 2);\n'}
        {'}\n\n'}
        {'// math.test.ts\n'}
        {'import { add, divide, fibonacci } from "./math";\n\n'}
        {'describe("Math utilities", () => {\n'}
        {'  describe("add", () => {\n'}
        {'    it("adds two positive numbers", () => {\n'}
        {'      expect(add(2, 3)).toBe(5);\n'}
        {'    });\n\n'}
        {'    it("handles negative numbers", () => {\n'}
        {'      expect(add(-1, -2)).toBe(-3);\n'}
        {'    });\n\n'}
        {'    it("handles zero", () => {\n'}
        {'      expect(add(0, 5)).toBe(5);\n'}
        {'    });\n'}
        {'  });\n\n'}
        {'  describe("divide", () => {\n'}
        {'    it("divides two numbers", () => {\n'}
        {'      expect(divide(10, 2)).toBe(5);\n'}
        {'    });\n\n'}
        {'    it("throws on division by zero", () => {\n'}
        {'      expect(() => divide(10, 0)).toThrow("Division by zero");\n'}
        {'    });\n'}
        {'  });\n\n'}
        {'  describe("fibonacci", () => {\n'}
        {'    it.each([\n'}
        {'      [0, 0], [1, 1], [2, 1], [5, 5], [10, 55],\n'}
        {'    ])("fibonacci(%i) === %i", (input, expected) => {\n'}
        {'      expect(fibonacci(input)).toBe(expected);\n'}
        {'    });\n'}
        {'  });\n'}
        {'});'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? 'Vitest 配置与示例' : 'Vitest Setup & Example'}</h3>
      <pre style={preStyle}><code>
        {'// vitest.config.ts\n'}
        {'import { defineConfig } from "vitest/config";\n\n'}
        {'export default defineConfig({\n'}
        {'  test: {\n'}
        {'    globals: true,\n'}
        {'    environment: "jsdom",\n'}
        {'    setupFiles: ["./src/test/setup.ts"],\n'}
        {'    coverage: {\n'}
        {'      provider: "v8",\n'}
        {'      reporter: ["text", "json", "html"],\n'}
        {'      thresholds: {\n'}
        {'        lines: 80,\n'}
        {'        branches: 80,\n'}
        {'        functions: 80,\n'}
        {'        statements: 80,\n'}
        {'      },\n'}
        {'    },\n'}
        {'    include: ["src/**/*.{test,spec}.{ts,tsx}"],\n'}
        {'  },\n'}
        {'});\n\n'}
        {'// src/utils/string.ts\n'}
        {'export function slugify(text: string): string {\n'}
        {'  return text\n'}
        {'    .toLowerCase()\n'}
        {'    .trim()\n'}
        {'    .replace(/[^\\w\\s-]/g, "")\n'}
        {'    .replace(/[\\s_]+/g, "-")\n'}
        {'    .replace(/-+/g, "-");\n'}
        {'}\n\n'}
        {'// src/utils/string.test.ts\n'}
        {'import { describe, it, expect } from "vitest";\n'}
        {'import { slugify } from "./string";\n\n'}
        {'describe("slugify", () => {\n'}
        {'  it("converts text to kebab-case", () => {\n'}
        {'    expect(slugify("Hello World")).toBe("hello-world");\n'}
        {'  });\n\n'}
        {'  it("removes special characters", () => {\n'}
        {'    expect(slugify("Hello! @World#")).toBe("hello-world");\n'}
        {'  });\n\n'}
        {'  it("collapses multiple dashes", () => {\n'}
        {'    expect(slugify("a---b")).toBe("a-b");\n'}
        {'  });\n\n'}
        {'  it("trims whitespace", () => {\n'}
        {'    expect(slugify("  hello  ")).toBe("hello");\n'}
        {'  });\n'}
        {'});'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? 'Jest vs Vitest 对比' : 'Jest vs Vitest Comparison'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>Jest</th>
            <th style={thStyle}>Vitest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '速度' : 'Speed'}</td>
            <td style={tdStyle}>{isZh ? '较快（使用 worker 并行）' : 'Fast (worker parallel)'}</td>
            <td style={tdStyle}>{isZh ? '极快（原生 ESM + Vite）' : 'Very fast (native ESM + Vite)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? 'ESM 支持' : 'ESM Support'}</td>
            <td style={tdStyle}>{isZh ? '实验性' : 'Experimental'}</td>
            <td style={tdStyle}>{isZh ? '原生支持' : 'Native'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? 'TypeScript' : 'TypeScript'}</td>
            <td style={tdStyle}>{isZh ? '需要 ts-jest / babel' : 'Requires ts-jest / babel'}</td>
            <td style={tdStyle}>{isZh ? '内置支持' : 'Built-in'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '配置' : 'Config'}</td>
            <td style={tdStyle}>jest.config.ts</td>
            <td style={tdStyle}>{isZh ? '共用 vite.config.ts' : 'Shares vite.config.ts'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '覆盖率' : 'Coverage'}</td>
            <td style={tdStyle}>Istanbul / c8</td>
            <td style={tdStyle}>v8 / Istanbul</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '生态系统' : 'Ecosystem'}</td>
            <td style={tdStyle}>{isZh ? '最大（插件、匹配器）' : 'Largest (plugins, matchers)'}</td>
            <td style={tdStyle}>{isZh ? '增长中，兼容 Jest API' : 'Growing, Jest-compatible API'}</td>
          </tr>
        </tbody>
      </table>

      {/* --- Section 3: Testing React Components --- */}
      <h2 style={h2Style}>
        {isZh ? '3. React 组件测试' : '3. Testing React Components'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '使用 React Testing Library 测试组件的行为而非实现细节。遵循"用户如何交互"的原则编写测试。'
          : 'Use React Testing Library to test component behavior rather than implementation details. Write tests following the principle of "how users interact" with your components.'}
      </p>

      <pre style={preStyle}><code>
        {'// LoginForm.tsx\n'}
        {'import { useState } from "react";\n\n'}
        {'interface LoginFormProps {\n'}
        {'  onSubmit: (email: string, password: string) => Promise<void>;\n'}
        {'}\n\n'}
        {'export function LoginForm({ onSubmit }: LoginFormProps) {\n'}
        {'  const [email, setEmail] = useState("");\n'}
        {'  const [password, setPassword] = useState("");\n'}
        {'  const [error, setError] = useState("");\n'}
        {'  const [loading, setLoading] = useState(false);\n\n'}
        {'  const handleSubmit = async (e: React.FormEvent) => {\n'}
        {'    e.preventDefault();\n'}
        {'    setError("");\n'}
        {'    setLoading(true);\n'}
        {'    try {\n'}
        {'      await onSubmit(email, password);\n'}
        {'    } catch (err) {\n'}
        {'      setError(err instanceof Error ? err.message : "Login failed");\n'}
        {'    } finally {\n'}
        {'      setLoading(false);\n'}
        {'    }\n'}
        {'  };\n\n'}
        {'  return (\n'}
        {'    <form onSubmit={handleSubmit}>\n'}
        {'      <input\n'}
        {'        type="email" placeholder="Email"\n'}
        {'        value={email} onChange={(e) => setEmail(e.target.value)}\n'}
        {'      />\n'}
        {'      <input\n'}
        {'        type="password" placeholder="Password"\n'}
        {'        value={password} onChange={(e) => setPassword(e.target.value)}\n'}
        {'      />\n'}
        {'      {error && <div role="alert">{error}</div>}\n'}
        {'      <button type="submit" disabled={loading}>\n'}
        {'        {loading ? "Signing in..." : "Sign In"}\n'}
        {'      </button>\n'}
        {'    </form>\n'}
        {'  );\n'}
        {'}\n\n'}
        {'// LoginForm.test.tsx\n'}
        {'import { render, screen, waitFor } from "@testing-library/react";\n'}
        {'import userEvent from "@testing-library/user-event";\n'}
        {'import { LoginForm } from "./LoginForm";\n\n'}
        {'describe("LoginForm", () => {\n'}
        {'  const user = userEvent.setup();\n\n'}
        {'  it("submits with email and password", async () => {\n'}
        {'    const mockSubmit = vi.fn().mockResolvedValue(undefined);\n'}
        {'    render(<LoginForm onSubmit={mockSubmit} />);\n\n'}
        {'    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");\n'}
        {'    await user.type(screen.getByPlaceholderText("Password"), "secret123");\n'}
        {'    await user.click(screen.getByRole("button", { name: /sign in/i }));\n\n'}
        {'    await waitFor(() => {\n'}
        {'      expect(mockSubmit).toHaveBeenCalledWith("test@example.com", "secret123");\n'}
        {'    });\n'}
        {'  });\n\n'}
        {'  it("shows error message on failure", async () => {\n'}
        {'    const mockSubmit = vi.fn().mockRejectedValue(new Error("Invalid credentials"));\n'}
        {'    render(<LoginForm onSubmit={mockSubmit} />);\n\n'}
        {'    await user.type(screen.getByPlaceholderText("Email"), "bad@example.com");\n'}
        {'    await user.type(screen.getByPlaceholderText("Password"), "wrong");\n'}
        {'    await user.click(screen.getByRole("button", { name: /sign in/i }));\n\n'}
        {'    expect(await screen.findByRole("alert")).toHaveTextContent("Invalid credentials");\n'}
        {'  });\n\n'}
        {'  it("disables button while loading", async () => {\n'}
        {'    const mockSubmit = vi.fn(() => new Promise(() => {})); // never resolves\n'}
        {'    render(<LoginForm onSubmit={mockSubmit} />);\n\n'}
        {'    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");\n'}
        {'    await user.type(screen.getByPlaceholderText("Password"), "secret123");\n'}
        {'    await user.click(screen.getByRole("button", { name: /sign in/i }));\n\n'}
        {'    expect(screen.getByRole("button")).toBeDisabled();\n'}
        {'    expect(screen.getByRole("button")).toHaveTextContent("Signing in...");\n'}
        {'  });\n'}
        {'});'}
      </code></pre>

      {/* --- Section 4: TDD --- */}
      <h2 style={h2Style}>
        {isZh ? '4. 测试驱动开发（TDD）' : '4. Test-Driven Development (TDD)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'TDD 遵循"红-绿-重构"循环：先写失败测试，再写最少代码使其通过，最后重构。这个过程确保你只写必要的代码，并且每行代码都有对应的测试。'
          : 'TDD follows the Red-Green-Refactor cycle: write a failing test first, then write the minimum code to make it pass, then refactor. This process ensures you only write necessary code, with every line backed by a test.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'TDD 实战：构建购物车' : 'TDD in Practice: Building a Shopping Cart'}</h3>
      <pre style={preStyle}><code>
        {'// Step 1: RED — Write a failing test\n'}
        {'// cart.test.ts\n'}
        {'import { Cart } from "./cart";\n\n'}
        {'describe("Cart", () => {\n'}
        {'  let cart: Cart;\n\n'}
        {'  beforeEach(() => {\n'}
        {'    cart = new Cart();\n'}
        {'  });\n\n'}
        {'  it("starts empty", () => {\n'}
        {'    expect(cart.items).toEqual([]);\n'}
        {'    expect(cart.total).toBe(0);\n'}
        {'  });\n\n'}
        {'  it("adds an item", () => {\n'}
        {'    cart.add({ id: "1", name: "Widget", price: 9.99, quantity: 1 });\n'}
        {'    expect(cart.items).toHaveLength(1);\n'}
        {'    expect(cart.total).toBe(9.99);\n'}
        {'  });\n\n'}
        {'  it("increases quantity for duplicate items", () => {\n'}
        {'    cart.add({ id: "1", name: "Widget", price: 9.99, quantity: 1 });\n'}
        {'    cart.add({ id: "1", name: "Widget", price: 9.99, quantity: 2 });\n'}
        {'    expect(cart.items).toHaveLength(1);\n'}
        {'    expect(cart.items[0].quantity).toBe(3);\n'}
        {'  });\n\n'}
        {'  it("removes an item", () => {\n'}
        {'    cart.add({ id: "1", name: "Widget", price: 9.99, quantity: 1 });\n'}
        {'    cart.remove("1");\n'}
        {'    expect(cart.items).toHaveLength(0);\n'}
        {'  });\n\n'}
        {'  it("applies percentage discount", () => {\n'}
        {'    cart.add({ id: "1", name: "Widget", price: 100, quantity: 1 });\n'}
        {'    cart.applyDiscount({ type: "percent", value: 10 });\n'}
        {'    expect(cart.total).toBe(90);\n'}
        {'  });\n'}
        {'});\n\n'}
        {'// Step 2: GREEN — Implement minimum code\n'}
        {'// cart.ts\n'}
        {'interface CartItem {\n'}
        {'  id: string;\n'}
        {'  name: string;\n'}
        {'  price: number;\n'}
        {'  quantity: number;\n'}
        {'}\n\n'}
        {'interface Discount {\n'}
        {'  type: "percent" | "fixed";\n'}
        {'  value: number;\n'}
        {'}\n\n'}
        {'export class Cart {\n'}
        {'  items: CartItem[] = [];\n'}
        {'  private discount: Discount | null = null;\n\n'}
        {'  get total(): number {\n'}
        {'    const subtotal = this.items.reduce(\n'}
        {'      (sum, item) => sum + item.price * item.quantity, 0\n'}
        {'    );\n'}
        {'    if (!this.discount) return subtotal;\n'}
        {'    if (this.discount.type === "percent") {\n'}
        {'      return subtotal * (1 - this.discount.value / 100);\n'}
        {'    }\n'}
        {'    return Math.max(0, subtotal - this.discount.value);\n'}
        {'  }\n\n'}
        {'  add(item: CartItem): void {\n'}
        {'    const existing = this.items.find((i) => i.id === item.id);\n'}
        {'    if (existing) {\n'}
        {'      existing.quantity += item.quantity;\n'}
        {'    } else {\n'}
        {'      this.items.push({ ...item });\n'}
        {'    }\n'}
        {'  }\n\n'}
        {'  remove(id: string): void {\n'}
        {'    this.items = this.items.filter((i) => i.id !== id);\n'}
        {'  }\n\n'}
        {'  applyDiscount(discount: Discount): void {\n'}
        {'    this.discount = discount;\n'}
        {'  }\n'}
        {'}'}
      </code></pre>

      {/* --- Section 5: BDD --- */}
      <h2 style={h2Style}>
        {isZh ? '5. 行为驱动开发（BDD）' : '5. Behavior-Driven Development (BDD)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'BDD 使用 Given-When-Then 结构编写人人可读的测试规格。Gherkin 语法让产品经理和开发者可以共同定义验收标准。'
          : 'BDD uses the Given-When-Then structure to write human-readable test specifications. Gherkin syntax allows product managers and developers to collaboratively define acceptance criteria.'}
      </p>

      <pre style={preStyle}><code>
        {'# features/login.feature (Gherkin)\n'}
        {'Feature: User Login\n'}
        {'  As a registered user\n'}
        {'  I want to log in to my account\n'}
        {'  So that I can access my dashboard\n\n'}
        {'  Scenario: Successful login\n'}
        {'    Given I am on the login page\n'}
        {'    When I enter "user@example.com" as email\n'}
        {'    And I enter "validpass123" as password\n'}
        {'    And I click the "Sign In" button\n'}
        {'    Then I should be redirected to the dashboard\n'}
        {'    And I should see "Welcome back" message\n\n'}
        {'  Scenario: Failed login with wrong password\n'}
        {'    Given I am on the login page\n'}
        {'    When I enter "user@example.com" as email\n'}
        {'    And I enter "wrongpass" as password\n'}
        {'    And I click the "Sign In" button\n'}
        {'    Then I should see "Invalid credentials" error\n'}
        {'    And I should remain on the login page\n\n'}
        {'// step-definitions/login.steps.ts (Jest-Cucumber)\n'}
        {'import { defineFeature, loadFeature } from "jest-cucumber";\n'}
        {'import { render, screen } from "@testing-library/react";\n'}
        {'import userEvent from "@testing-library/user-event";\n\n'}
        {'const feature = loadFeature("./features/login.feature");\n\n'}
        {'defineFeature(feature, (test) => {\n'}
        {'  test("Successful login", ({ given, when, and, then }) => {\n'}
        {'    given("I am on the login page", () => {\n'}
        {'      render(<LoginPage />);\n'}
        {'    });\n\n'}
        {'    when(/I enter "(.*)" as email/, (email) => {\n'}
        {'      userEvent.type(screen.getByLabelText("Email"), email);\n'}
        {'    });\n\n'}
        {'    and(/I enter "(.*)" as password/, (password) => {\n'}
        {'      userEvent.type(screen.getByLabelText("Password"), password);\n'}
        {'    });\n\n'}
        {'    and(/I click the "(.*)" button/, (buttonText) => {\n'}
        {'      userEvent.click(screen.getByRole("button", { name: buttonText }));\n'}
        {'    });\n\n'}
        {'    then("I should be redirected to the dashboard", () => {\n'}
        {'      expect(window.location.pathname).toBe("/dashboard");\n'}
        {'    });\n'}
        {'  });\n'}
        {'});'}
      </code></pre>

      {/* --- Section 6: Mocking --- */}
      <h2 style={h2Style}>
        {isZh ? '6. Mock 策略与模式' : '6. Mocking Strategies & Patterns'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Mock 的核心原则：Mock 你不拥有的东西（外部 API、数据库），不要 Mock 你拥有的东西（内部模块）。优先使用依赖注入使代码可测试。'
          : 'The core principle of mocking: mock what you do not own (external APIs, databases), do not mock what you own (internal modules). Prefer dependency injection to make code testable.'}
      </p>

      <h3 style={h3Style}>{isZh ? '函数 Mock 与 Spy' : 'Function Mocks & Spies'}</h3>
      <pre style={preStyle}><code>
        {'// Mocking modules\n'}
        {'import { vi, describe, it, expect, beforeEach } from "vitest";\n'}
        {'import { fetchUser } from "./api";\n'}
        {'import { UserService } from "./user-service";\n\n'}
        {'// Mock the entire api module\n'}
        {'vi.mock("./api", () => ({\n'}
        {'  fetchUser: vi.fn(),\n'}
        {'}));\n\n'}
        {'describe("UserService", () => {\n'}
        {'  beforeEach(() => {\n'}
        {'    vi.clearAllMocks(); // Reset between tests\n'}
        {'  });\n\n'}
        {'  it("returns user data", async () => {\n'}
        {'    const mockUser = { id: 1, name: "Alice", email: "alice@test.com" };\n'}
        {'    vi.mocked(fetchUser).mockResolvedValue(mockUser);\n\n'}
        {'    const service = new UserService();\n'}
        {'    const user = await service.getUser(1);\n\n'}
        {'    expect(fetchUser).toHaveBeenCalledWith(1);\n'}
        {'    expect(user).toEqual(mockUser);\n'}
        {'  });\n\n'}
        {'  it("handles API errors gracefully", async () => {\n'}
        {'    vi.mocked(fetchUser).mockRejectedValue(new Error("Network error"));\n\n'}
        {'    const service = new UserService();\n'}
        {'    const user = await service.getUser(1);\n\n'}
        {'    expect(user).toBeNull();\n'}
        {'  });\n'}
        {'});\n\n'}
        {'// Spies — verify calls without replacing implementation\n'}
        {'it("logs when user is fetched", async () => {\n'}
        {'  const consoleSpy = vi.spyOn(console, "log");\n'}
        {'  const service = new UserService();\n'}
        {'  await service.getUser(1);\n\n'}
        {'  expect(consoleSpy).toHaveBeenCalledWith("Fetching user:", 1);\n'}
        {'  consoleSpy.mockRestore();\n'}
        {'});'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? 'MSW（Mock Service Worker）' : 'MSW (Mock Service Worker)'}</h3>
      <pre style={preStyle}><code>
        {'// mocks/handlers.ts\n'}
        {'import { http, HttpResponse } from "msw";\n\n'}
        {'export const handlers = [\n'}
        {'  http.get("/api/users/:id", ({ params }) => {\n'}
        {'    return HttpResponse.json({\n'}
        {'      id: Number(params.id),\n'}
        {'      name: "Alice",\n'}
        {'      email: "alice@test.com",\n'}
        {'    });\n'}
        {'  }),\n\n'}
        {'  http.post("/api/users", async ({ request }) => {\n'}
        {'    const body = await request.json();\n'}
        {'    return HttpResponse.json(\n'}
        {'      { id: 42, ...body },\n'}
        {'      { status: 201 }\n'}
        {'    );\n'}
        {'  }),\n\n'}
        {'  http.get("/api/users", ({ request }) => {\n'}
        {'    const url = new URL(request.url);\n'}
        {'    const page = url.searchParams.get("page") || "1";\n'}
        {'    return HttpResponse.json({\n'}
        {'      users: [{ id: 1, name: "Alice" }],\n'}
        {'      page: Number(page),\n'}
        {'      totalPages: 5,\n'}
        {'    });\n'}
        {'  }),\n'}
        {'];\n\n'}
        {'// mocks/server.ts\n'}
        {'import { setupServer } from "msw/node";\n'}
        {'import { handlers } from "./handlers";\n\n'}
        {'export const server = setupServer(...handlers);\n\n'}
        {'// test/setup.ts\n'}
        {'import { beforeAll, afterEach, afterAll } from "vitest";\n'}
        {'import { server } from "../mocks/server";\n\n'}
        {'beforeAll(() => server.listen({ onUnhandledRequest: "error" }));\n'}
        {'afterEach(() => server.resetHandlers());\n'}
        {'afterAll(() => server.close());'}
      </code></pre>

      {/* --- Section 7: Integration Testing --- */}
      <h2 style={h2Style}>
        {isZh ? '7. 集成测试' : '7. Integration Testing'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '集成测试验证多个模块协同工作的正确性。与单元测试不同，集成测试使用真实（或接近真实）的依赖。'
          : 'Integration tests verify that multiple modules work correctly together. Unlike unit tests, integration tests use real (or near-real) dependencies.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'API 路由集成测试' : 'API Route Integration Testing'}</h3>
      <pre style={preStyle}><code>
        {'// Testing Express/Fastify API routes with Supertest\n'}
        {'import request from "supertest";\n'}
        {'import { app } from "./app";\n'}
        {'import { db } from "./database";\n\n'}
        {'describe("POST /api/users", () => {\n'}
        {'  beforeAll(async () => {\n'}
        {'    await db.migrate.latest();      // Run migrations\n'}
        {'  });\n\n'}
        {'  afterEach(async () => {\n'}
        {'    await db("users").truncate();    // Clean between tests\n'}
        {'  });\n\n'}
        {'  afterAll(async () => {\n'}
        {'    await db.destroy();              // Close connection\n'}
        {'  });\n\n'}
        {'  it("creates a new user", async () => {\n'}
        {'    const response = await request(app)\n'}
        {'      .post("/api/users")\n'}
        {'      .send({ name: "Alice", email: "alice@test.com" })\n'}
        {'      .expect(201);\n\n'}
        {'    expect(response.body).toMatchObject({\n'}
        {'      id: expect.any(Number),\n'}
        {'      name: "Alice",\n'}
        {'      email: "alice@test.com",\n'}
        {'    });\n\n'}
        {'    // Verify database state\n'}
        {'    const user = await db("users")\n'}
        {'      .where("email", "alice@test.com").first();\n'}
        {'    expect(user).toBeDefined();\n'}
        {'  });\n\n'}
        {'  it("rejects duplicate email", async () => {\n'}
        {'    await request(app)\n'}
        {'      .post("/api/users")\n'}
        {'      .send({ name: "Alice", email: "alice@test.com" });\n\n'}
        {'    const response = await request(app)\n'}
        {'      .post("/api/users")\n'}
        {'      .send({ name: "Bob", email: "alice@test.com" })\n'}
        {'      .expect(409);\n\n'}
        {'    expect(response.body.error).toBe("Email already exists");\n'}
        {'  });\n\n'}
        {'  it("validates required fields", async () => {\n'}
        {'    const response = await request(app)\n'}
        {'      .post("/api/users")\n'}
        {'      .send({ name: "" })\n'}
        {'      .expect(400);\n\n'}
        {'    expect(response.body.errors).toContainEqual(\n'}
        {'      expect.objectContaining({ field: "email", message: "Required" })\n'}
        {'    );\n'}
        {'  });\n'}
        {'});'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? '数据库集成测试（Testcontainers）' : 'Database Integration Testing (Testcontainers)'}</h3>
      <pre style={preStyle}><code>
        {'// Using Testcontainers for real database testing\n'}
        {'import { PostgreSqlContainer } from "@testcontainers/postgresql";\n'}
        {'import { Pool } from "pg";\n\n'}
        {'describe("UserRepository", () => {\n'}
        {'  let container;\n'}
        {'  let pool: Pool;\n\n'}
        {'  beforeAll(async () => {\n'}
        {'    container = await new PostgreSqlContainer()\n'}
        {'      .withDatabase("testdb")\n'}
        {'      .start();\n\n'}
        {'    pool = new Pool({\n'}
        {'      connectionString: container.getConnectionUri(),\n'}
        {'    });\n\n'}
        {'    // Run migrations\n'}
        {'    await pool.query(`\n'}
        {'      CREATE TABLE users (\n'}
        {'        id SERIAL PRIMARY KEY,\n'}
        {'        name VARCHAR(255) NOT NULL,\n'}
        {'        email VARCHAR(255) UNIQUE NOT NULL\n'}
        {'      )\n'}
        {'    `);\n'}
        {'  }, 60000); // Testcontainers can take time to start\n\n'}
        {'  afterAll(async () => {\n'}
        {'    await pool.end();\n'}
        {'    await container.stop();\n'}
        {'  });\n\n'}
        {'  it("inserts and retrieves a user", async () => {\n'}
        {'    await pool.query(\n'}
        {'      "INSERT INTO users (name, email) VALUES ($1, $2)",\n'}
        {'      ["Alice", "alice@test.com"]\n'}
        {'    );\n\n'}
        {'    const result = await pool.query(\n'}
        {'      "SELECT * FROM users WHERE email = $1",\n'}
        {'      ["alice@test.com"]\n'}
        {'    );\n\n'}
        {'    expect(result.rows[0]).toMatchObject({\n'}
        {'      name: "Alice",\n'}
        {'      email: "alice@test.com",\n'}
        {'    });\n'}
        {'  });\n'}
        {'});'}
      </code></pre>

      {/* --- Section 8: E2E Testing --- */}
      <h2 style={h2Style}>
        {isZh ? '8. 端到端测试：Playwright 与 Cypress' : '8. E2E Testing: Playwright & Cypress'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'E2E 测试模拟真实用户操作，验证从 UI 到后端的完整流程。Playwright 和 Cypress 是两大主流 E2E 框架。'
          : 'E2E tests simulate real user interactions, verifying the complete flow from UI to backend. Playwright and Cypress are the two leading E2E frameworks.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Playwright 示例' : 'Playwright Example'}</h3>
      <pre style={preStyle}><code>
        {'// playwright.config.ts\n'}
        {'import { defineConfig, devices } from "@playwright/test";\n\n'}
        {'export default defineConfig({\n'}
        {'  testDir: "./e2e",\n'}
        {'  fullyParallel: true,\n'}
        {'  forbidOnly: !!process.env.CI,\n'}
        {'  retries: process.env.CI ? 2 : 0,\n'}
        {'  workers: process.env.CI ? 1 : undefined,\n'}
        {'  reporter: [\n'}
        {'    ["html"],\n'}
        {'    ["junit", { outputFile: "results/e2e.xml" }],\n'}
        {'  ],\n'}
        {'  use: {\n'}
        {'    baseURL: "http://localhost:3000",\n'}
        {'    trace: "on-first-retry",\n'}
        {'    screenshot: "only-on-failure",\n'}
        {'  },\n'}
        {'  projects: [\n'}
        {'    { name: "chromium", use: { ...devices["Desktop Chrome"] } },\n'}
        {'    { name: "firefox", use: { ...devices["Desktop Firefox"] } },\n'}
        {'    { name: "webkit", use: { ...devices["Desktop Safari"] } },\n'}
        {'    { name: "mobile", use: { ...devices["iPhone 14"] } },\n'}
        {'  ],\n'}
        {'  webServer: {\n'}
        {'    command: "npm run dev",\n'}
        {'    port: 3000,\n'}
        {'    reuseExistingServer: !process.env.CI,\n'}
        {'  },\n'}
        {'});\n\n'}
        {'// e2e/checkout.spec.ts\n'}
        {'import { test, expect } from "@playwright/test";\n\n'}
        {'test.describe("Checkout Flow", () => {\n'}
        {'  test.beforeEach(async ({ page }) => {\n'}
        {'    await page.goto("/products");\n'}
        {'  });\n\n'}
        {'  test("complete purchase flow", async ({ page }) => {\n'}
        {'    // Add item to cart\n'}
        {'    await page.getByRole("button", { name: "Add to Cart" }).first().click();\n'}
        {'    await expect(page.getByTestId("cart-count")).toHaveText("1");\n\n'}
        {'    // Go to cart\n'}
        {'    await page.getByRole("link", { name: "Cart" }).click();\n'}
        {'    await expect(page).toHaveURL(/\\/cart/);\n\n'}
        {'    // Proceed to checkout\n'}
        {'    await page.getByRole("button", { name: "Checkout" }).click();\n\n'}
        {'    // Fill shipping info\n'}
        {'    await page.getByLabel("Full Name").fill("Alice Smith");\n'}
        {'    await page.getByLabel("Address").fill("123 Main St");\n'}
        {'    await page.getByLabel("City").fill("Portland");\n'}
        {'    await page.getByRole("button", { name: "Continue" }).click();\n\n'}
        {'    // Confirm order\n'}
        {'    await expect(page.getByText("Order Summary")).toBeVisible();\n'}
        {'    await page.getByRole("button", { name: "Place Order" }).click();\n\n'}
        {'    // Verify success\n'}
        {'    await expect(page.getByText("Order Confirmed")).toBeVisible();\n'}
        {'    await expect(page.getByTestId("order-number")).toBeVisible();\n'}
        {'  });\n\n'}
        {'  test("handles empty cart", async ({ page }) => {\n'}
        {'    await page.goto("/cart");\n'}
        {'    await expect(page.getByText("Your cart is empty")).toBeVisible();\n'}
        {'    await expect(\n'}
        {'      page.getByRole("link", { name: "Continue Shopping" })\n'}
        {'    ).toBeVisible();\n'}
        {'  });\n'}
        {'});'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? 'Cypress 示例' : 'Cypress Example'}</h3>
      <pre style={preStyle}><code>
        {'// cypress/e2e/auth.cy.ts\n'}
        {'describe("Authentication", () => {\n'}
        {'  beforeEach(() => {\n'}
        {'    cy.visit("/login");\n'}
        {'  });\n\n'}
        {'  it("logs in successfully", () => {\n'}
        {'    cy.intercept("POST", "/api/auth/login", {\n'}
        {'      statusCode: 200,\n'}
        {'      body: { token: "fake-jwt-token", user: { name: "Alice" } },\n'}
        {'    }).as("loginRequest");\n\n'}
        {'    cy.get("[data-testid=email-input]").type("alice@test.com");\n'}
        {'    cy.get("[data-testid=password-input]").type("password123");\n'}
        {'    cy.get("[data-testid=submit-btn]").click();\n\n'}
        {'    cy.wait("@loginRequest");\n'}
        {'    cy.url().should("include", "/dashboard");\n'}
        {'    cy.contains("Welcome, Alice").should("be.visible");\n'}
        {'  });\n\n'}
        {'  it("shows validation errors", () => {\n'}
        {'    cy.get("[data-testid=submit-btn]").click();\n'}
        {'    cy.contains("Email is required").should("be.visible");\n'}
        {'    cy.contains("Password is required").should("be.visible");\n'}
        {'  });\n\n'}
        {'  it("handles network errors gracefully", () => {\n'}
        {'    cy.intercept("POST", "/api/auth/login", {\n'}
        {'      forceNetworkError: true,\n'}
        {'    }).as("loginFailure");\n\n'}
        {'    cy.get("[data-testid=email-input]").type("alice@test.com");\n'}
        {'    cy.get("[data-testid=password-input]").type("password123");\n'}
        {'    cy.get("[data-testid=submit-btn]").click();\n\n'}
        {'    cy.contains("Network error").should("be.visible");\n'}
        {'  });\n'}
        {'});'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? 'Playwright vs Cypress 对比' : 'Playwright vs Cypress Comparison'}</h3>
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
            <td style={tdStyle}>Chrome, Edge, Firefox</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '多标签/多源' : 'Multi-tab/Multi-origin'}</td>
            <td style={tdStyle}>{isZh ? '原生支持' : 'Native'}</td>
            <td style={tdStyle}>{isZh ? '有限支持' : 'Limited'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '等待策略' : 'Wait Strategy'}</td>
            <td style={tdStyle}>{isZh ? '自动等待 + Web-first 断言' : 'Auto-wait + Web-first assertions'}</td>
            <td style={tdStyle}>{isZh ? '内置重试' : 'Built-in retry'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '调试' : 'Debugging'}</td>
            <td style={tdStyle}>Trace Viewer, Inspector</td>
            <td style={tdStyle}>{isZh ? '时间旅行调试器' : 'Time-travel debugger'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '网络拦截' : 'Network Interception'}</td>
            <td style={tdStyle}>{isZh ? '强大（route, fulfill, abort）' : 'Powerful (route, fulfill, abort)'}</td>
            <td style={tdStyle}>{isZh ? '强大（intercept）' : 'Powerful (intercept)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? 'CI 速度' : 'CI Speed'}</td>
            <td style={tdStyle}>{isZh ? '更快（无头 + 并行上下文）' : 'Faster (headless + parallel contexts)'}</td>
            <td style={tdStyle}>{isZh ? '较慢（需要 Xvfb）' : 'Slower (requires Xvfb)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '语言' : 'Language'}</td>
            <td style={tdStyle}>TS, JS, Python, C#, Java</td>
            <td style={tdStyle}>TS, JS</td>
          </tr>
        </tbody>
      </table>

      {/* --- Section 9: Test Coverage --- */}
      <h2 style={h2Style}>
        {isZh ? '9. 测试覆盖率' : '9. Test Coverage'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '覆盖率工具衡量有多少代码被测试执行到。主要指标包括：行覆盖率、分支覆盖率、函数覆盖率和语句覆盖率。'
          : 'Coverage tools measure how much code is exercised by tests. Key metrics include line coverage, branch coverage, function coverage, and statement coverage.'}
      </p>

      <pre style={preStyle}><code>
        {'// Configure coverage in Vitest\n'}
        {'// vitest.config.ts\n'}
        {'export default defineConfig({\n'}
        {'  test: {\n'}
        {'    coverage: {\n'}
        {'      provider: "v8",\n'}
        {'      reporter: ["text", "json-summary", "html", "lcov"],\n'}
        {'      include: ["src/**/*.{ts,tsx}"],\n'}
        {'      exclude: [\n'}
        {'        "src/**/*.test.{ts,tsx}",\n'}
        {'        "src/**/*.d.ts",\n'}
        {'        "src/test/**",\n'}
        {'        "src/types/**",\n'}
        {'      ],\n'}
        {'      thresholds: {\n'}
        {'        lines: 80,\n'}
        {'        branches: 75,\n'}
        {'        functions: 80,\n'}
        {'        statements: 80,\n'}
        {'      },\n'}
        {'      // Watermarks for color-coding in reports\n'}
        {'      watermarks: {\n'}
        {'        lines: [60, 80],\n'}
        {'        branches: [50, 75],\n'}
        {'        functions: [60, 80],\n'}
        {'        statements: [60, 80],\n'}
        {'      },\n'}
        {'    },\n'}
        {'  },\n'}
        {'});\n\n'}
        {'// Run coverage:\n'}
        {'// vitest run --coverage\n'}
        {'// jest --coverage\n\n'}
        {'// Configure coverage in Jest\n'}
        {'// jest.config.ts\n'}
        {'export default {\n'}
        {'  collectCoverageFrom: [\n'}
        {'    "src/**/*.{ts,tsx}",\n'}
        {'    "!src/**/*.d.ts",\n'}
        {'    "!src/**/*.test.{ts,tsx}",\n'}
        {'  ],\n'}
        {'  coverageThreshold: {\n'}
        {'    global: {\n'}
        {'      branches: 75,\n'}
        {'      functions: 80,\n'}
        {'      lines: 80,\n'}
        {'      statements: 80,\n'}
        {'    },\n'}
        {'    // Per-file thresholds for critical modules\n'}
        {'    "./src/services/payment.ts": {\n'}
        {'      branches: 95,\n'}
        {'      functions: 100,\n'}
        {'      lines: 95,\n'}
        {'    },\n'}
        {'  },\n'}
        {'  coverageReporters: ["text", "lcov", "json-summary"],\n'}
        {'};'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? '覆盖率最佳实践' : 'Coverage Best Practices'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '实践' : 'Practice'}</th>
            <th style={thStyle}>{isZh ? '说明' : 'Description'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '设定合理阈值' : 'Set reasonable thresholds'}</td>
            <td style={tdStyle}>{isZh ? '全局 80% 行覆盖率，关键模块 95%+' : 'Global 80% line coverage, 95%+ for critical modules'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '关注分支覆盖' : 'Focus on branch coverage'}</td>
            <td style={tdStyle}>{isZh ? '分支覆盖比行覆盖更能发现缺失的边界情况' : 'Branch coverage reveals missing edge cases better than line coverage'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '不追求 100%' : 'Do not chase 100%'}</td>
            <td style={tdStyle}>{isZh ? '对 getter/setter 和样板代码测试没有意义' : 'Testing getters/setters and boilerplate code adds no value'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? 'CI 中强制阈值' : 'Enforce in CI'}</td>
            <td style={tdStyle}>{isZh ? '覆盖率下降时 CI 失败，防止回退' : 'Fail CI when coverage drops, preventing regressions'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '报告到 PR' : 'Report to PRs'}</td>
            <td style={tdStyle}>{isZh ? '使用 Codecov/Coveralls 在 PR 中展示覆盖率变化' : 'Use Codecov/Coveralls to show coverage diff in PRs'}</td>
          </tr>
        </tbody>
      </table>

      {/* --- Section 10: CI Testing --- */}
      <h2 style={h2Style}>
        {isZh ? '10. CI/CD 测试管道' : '10. CI/CD Testing Pipeline'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '在 CI 中构建高效的测试管道是保证代码质量的关键。按速度分层运行测试，尽早获得反馈。'
          : 'Building an efficient test pipeline in CI is key to maintaining code quality. Layer tests by speed to get feedback as early as possible.'}
      </p>

      <pre style={preStyle}><code>
        {'# .github/workflows/test.yml\n'}
        {'name: Test Pipeline\n\n'}
        {'on:\n'}
        {'  push:\n'}
        {'    branches: [main]\n'}
        {'  pull_request:\n'}
        {'    branches: [main]\n\n'}
        {'jobs:\n'}
        {'  lint-and-typecheck:\n'}
        {'    runs-on: ubuntu-latest\n'}
        {'    steps:\n'}
        {'      - uses: actions/checkout@v4\n'}
        {'      - uses: actions/setup-node@v4\n'}
        {'        with:\n'}
        {'          node-version: 20\n'}
        {'          cache: "npm"\n'}
        {'      - run: npm ci\n'}
        {'      - run: npm run lint\n'}
        {'      - run: npm run typecheck\n\n'}
        {'  unit-tests:\n'}
        {'    runs-on: ubuntu-latest\n'}
        {'    needs: lint-and-typecheck\n'}
        {'    steps:\n'}
        {'      - uses: actions/checkout@v4\n'}
        {'      - uses: actions/setup-node@v4\n'}
        {'        with:\n'}
        {'          node-version: 20\n'}
        {'          cache: "npm"\n'}
        {'      - run: npm ci\n'}
        {'      - run: npx vitest run --coverage\n'}
        {'      - uses: actions/upload-artifact@v4\n'}
        {'        with:\n'}
        {'          name: coverage-report\n'}
        {'          path: coverage/\n\n'}
        {'  integration-tests:\n'}
        {'    runs-on: ubuntu-latest\n'}
        {'    needs: unit-tests\n'}
        {'    services:\n'}
        {'      postgres:\n'}
        {'        image: postgres:16\n'}
        {'        env:\n'}
        {'          POSTGRES_USER: test\n'}
        {'          POSTGRES_PASSWORD: test\n'}
        {'          POSTGRES_DB: testdb\n'}
        {'        ports:\n'}
        {'          - 5432:5432\n'}
        {'        options: >-\n'}
        {'          --health-cmd pg_isready\n'}
        {'          --health-interval 10s\n'}
        {'          --health-timeout 5s\n'}
        {'          --health-retries 5\n'}
        {'    steps:\n'}
        {'      - uses: actions/checkout@v4\n'}
        {'      - uses: actions/setup-node@v4\n'}
        {'        with:\n'}
        {'          node-version: 20\n'}
        {'          cache: "npm"\n'}
        {'      - run: npm ci\n'}
        {'      - run: npx vitest run --config vitest.integration.config.ts\n'}
        {'        env:\n'}
        {'          DATABASE_URL: postgresql://test:test@localhost:5432/testdb\n\n'}
        {'  e2e-tests:\n'}
        {'    runs-on: ubuntu-latest\n'}
        {'    needs: integration-tests\n'}
        {'    steps:\n'}
        {'      - uses: actions/checkout@v4\n'}
        {'      - uses: actions/setup-node@v4\n'}
        {'        with:\n'}
        {'          node-version: 20\n'}
        {'          cache: "npm"\n'}
        {'      - run: npm ci\n'}
        {'      - run: npx playwright install --with-deps chromium\n'}
        {'      - run: npx playwright test\n'}
        {'      - uses: actions/upload-artifact@v4\n'}
        {'        if: failure()\n'}
        {'        with:\n'}
        {'          name: playwright-report\n'}
        {'          path: playwright-report/'}
      </code></pre>

      {/* --- Section 11: Performance Testing --- */}
      <h2 style={h2Style}>
        {isZh ? '11. 性能测试' : '11. Performance Testing'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '性能测试确保应用在负载下的响应时间和吞吐量符合要求。包括负载测试、压力测试和前端性能基准。'
          : 'Performance testing ensures your application meets response time and throughput requirements under load. This includes load testing, stress testing, and frontend performance benchmarks.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'k6 负载测试' : 'k6 Load Testing'}</h3>
      <pre style={preStyle}><code>
        {'// load-test.js (k6)\n'}
        {'import http from "k6/http";\n'}
        {'import { check, sleep } from "k6";\n'}
        {'import { Rate, Trend } from "k6/metrics";\n\n'}
        {'const errorRate = new Rate("errors");\n'}
        {'const responseTime = new Trend("response_time");\n\n'}
        {'export const options = {\n'}
        {'  stages: [\n'}
        {'    { duration: "30s", target: 20 },   // Ramp up\n'}
        {'    { duration: "1m", target: 50 },     // Steady load\n'}
        {'    { duration: "30s", target: 100 },   // Peak load\n'}
        {'    { duration: "30s", target: 0 },     // Ramp down\n'}
        {'  ],\n'}
        {'  thresholds: {\n'}
        {'    http_req_duration: ["p(95)<500", "p(99)<1000"],\n'}
        {'    errors: ["rate<0.05"],\n'}
        {'    http_req_failed: ["rate<0.01"],\n'}
        {'  },\n'}
        {'};\n\n'}
        {'export default function () {\n'}
        {'  // GET request\n'}
        {'  const listRes = http.get("http://localhost:3000/api/products");\n'}
        {'  check(listRes, {\n'}
        {'    "status is 200": (r) => r.status === 200,\n'}
        {'    "response time < 500ms": (r) => r.timings.duration < 500,\n'}
        {'  });\n'}
        {'  errorRate.add(listRes.status !== 200);\n'}
        {'  responseTime.add(listRes.timings.duration);\n\n'}
        {'  // POST request\n'}
        {'  const payload = JSON.stringify({ query: "test item" });\n'}
        {'  const searchRes = http.post(\n'}
        {'    "http://localhost:3000/api/search",\n'}
        {'    payload,\n'}
        {'    { headers: { "Content-Type": "application/json" } }\n'}
        {'  );\n'}
        {'  check(searchRes, {\n'}
        {'    "search returns results": (r) => {\n'}
        {'      const body = JSON.parse(r.body);\n'}
        {'      return body.results && body.results.length > 0;\n'}
        {'    },\n'}
        {'  });\n\n'}
        {'  sleep(1);\n'}
        {'}'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? 'Lighthouse CI 前端性能' : 'Lighthouse CI Frontend Performance'}</h3>
      <pre style={preStyle}><code>
        {'// lighthouserc.js\n'}
        {'module.exports = {\n'}
        {'  ci: {\n'}
        {'    collect: {\n'}
        {'      url: [\n'}
        {'        "http://localhost:3000",\n'}
        {'        "http://localhost:3000/products",\n'}
        {'        "http://localhost:3000/login",\n'}
        {'      ],\n'}
        {'      numberOfRuns: 3,\n'}
        {'      startServerCommand: "npm run start",\n'}
        {'    },\n'}
        {'    assert: {\n'}
        {'      assertions: {\n'}
        {'        "categories:performance": ["error", { minScore: 0.9 }],\n'}
        {'        "categories:accessibility": ["warn", { minScore: 0.9 }],\n'}
        {'        "categories:seo": ["warn", { minScore: 0.9 }],\n'}
        {'        "first-contentful-paint": ["error", { maxNumericValue: 2000 }],\n'}
        {'        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],\n'}
        {'        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],\n'}
        {'        "total-blocking-time": ["error", { maxNumericValue: 300 }],\n'}
        {'      },\n'}
        {'    },\n'}
        {'    upload: {\n'}
        {'      target: "temporary-public-storage",\n'}
        {'    },\n'}
        {'  },\n'}
        {'};'}
      </code></pre>

      {/* --- Section 12: Snapshot & Visual Regression --- */}
      <h2 style={h2Style}>
        {isZh ? '12. 快照测试与视觉回归' : '12. Snapshot & Visual Regression Testing'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '快照测试捕获输出的"快照"并在后续运行中比较差异。视觉回归测试对 UI 截图进行像素级比较，防止意外的视觉变化。'
          : 'Snapshot testing captures a "snapshot" of output and compares against it in subsequent runs. Visual regression testing performs pixel-level comparison of UI screenshots to prevent unintended visual changes.'}
      </p>

      <pre style={preStyle}><code>
        {'// Inline snapshot testing (Vitest/Jest)\n'}
        {'import { describe, it, expect } from "vitest";\n'}
        {'import { render } from "@testing-library/react";\n'}
        {'import { Button } from "./Button";\n\n'}
        {'describe("Button", () => {\n'}
        {'  it("matches snapshot", () => {\n'}
        {'    const { container } = render(\n'}
        {'      <Button variant="primary" size="lg">Click me</Button>\n'}
        {'    );\n'}
        {'    expect(container.firstChild).toMatchSnapshot();\n'}
        {'  });\n\n'}
        {'  it("matches inline snapshot", () => {\n'}
        {'    const { container } = render(\n'}
        {'      <Button variant="outline">Cancel</Button>\n'}
        {'    );\n'}
        {'    expect(container.innerHTML).toMatchInlineSnapshot();\n'}
        {'    // Vitest auto-fills the snapshot on first run\n'}
        {'  });\n'}
        {'});\n\n'}
        {'// Playwright visual regression\n'}
        {'import { test, expect } from "@playwright/test";\n\n'}
        {'test("homepage visual regression", async ({ page }) => {\n'}
        {'  await page.goto("/");\n'}
        {'  await expect(page).toHaveScreenshot("homepage.png", {\n'}
        {'    maxDiffPixels: 100,\n'}
        {'  });\n'}
        {'});\n\n'}
        {'test("responsive layout", async ({ page }) => {\n'}
        {'  await page.setViewportSize({ width: 375, height: 812 });\n'}
        {'  await page.goto("/");\n'}
        {'  await expect(page).toHaveScreenshot("homepage-mobile.png", {\n'}
        {'    maxDiffPixelRatio: 0.01,\n'}
        {'  });\n'}
        {'});\n\n'}
        {'test("component visual test", async ({ page }) => {\n'}
        {'  await page.goto("/storybook/button");\n'}
        {'  const button = page.getByRole("button", { name: "Primary" });\n'}
        {'  await expect(button).toHaveScreenshot("button-primary.png");\n'}
        {'});'}
      </code></pre>

      {/* --- Section 13: Test Organization --- */}
      <h2 style={h2Style}>
        {isZh ? '13. 测试组织与最佳实践' : '13. Test Organization & Best Practices'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '良好的测试组织让测试套件易于维护和扩展。遵循 AAA（Arrange-Act-Assert）模式和 FIRST（Fast-Independent-Repeatable-Self-validating-Timely）原则。'
          : 'Good test organization makes test suites easy to maintain and extend. Follow the AAA (Arrange-Act-Assert) pattern and FIRST (Fast-Independent-Repeatable-Self-validating-Timely) principles.'}
      </p>

      <pre style={preStyle}><code>
        {'// Recommended project structure\n'}
        {'// src/\n'}
        {'//   components/\n'}
        {'//     Button/\n'}
        {'//       Button.tsx\n'}
        {'//       Button.test.tsx        ← Unit test (co-located)\n'}
        {'//   services/\n'}
        {'//     payment.ts\n'}
        {'//     payment.test.ts          ← Unit test (co-located)\n'}
        {'//   __tests__/\n'}
        {'//     integration/\n'}
        {'//       checkout.test.ts       ← Integration test\n'}
        {'//       user-flow.test.ts\n'}
        {'// e2e/\n'}
        {'//   checkout.spec.ts           ← E2E test\n'}
        {'//   auth.spec.ts\n'}
        {'// mocks/\n'}
        {'//   handlers.ts               ← MSW handlers\n'}
        {'//   server.ts\n\n'}
        {'// Test utilities — custom render with providers\n'}
        {'// src/test/utils.tsx\n'}
        {'import { render, RenderOptions } from "@testing-library/react";\n'}
        {'import { QueryClient, QueryClientProvider } from "@tanstack/react-query";\n'}
        {'import { ThemeProvider } from "./ThemeProvider";\n\n'}
        {'function AllProviders({ children }: { children: React.ReactNode }) {\n'}
        {'  const queryClient = new QueryClient({\n'}
        {'    defaultOptions: {\n'}
        {'      queries: { retry: false },\n'}
        {'    },\n'}
        {'  });\n\n'}
        {'  return (\n'}
        {'    <QueryClientProvider client={queryClient}>\n'}
        {'      <ThemeProvider>{children}</ThemeProvider>\n'}
        {'    </QueryClientProvider>\n'}
        {'  );\n'}
        {'}\n\n'}
        {'export function renderWithProviders(\n'}
        {'  ui: React.ReactElement,\n'}
        {'  options?: Omit<RenderOptions, "wrapper">\n'}
        {') {\n'}
        {'  return render(ui, { wrapper: AllProviders, ...options });\n'}
        {'}\n\n'}
        {'// Usage in tests:\n'}
        {'import { renderWithProviders } from "../test/utils";\n\n'}
        {'it("renders with providers", () => {\n'}
        {'  renderWithProviders(<MyComponent />);\n'}
        {'  // All providers (React Query, Theme, etc.) are available\n'}
        {'});'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? '测试命名规范' : 'Test Naming Conventions'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '模式' : 'Pattern'}</th>
            <th style={thStyle}>{isZh ? '示例' : 'Example'}</th>
            <th style={thStyle}>{isZh ? '使用场景' : 'Use Case'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '行为描述' : 'Behavior description'}</td>
            <td style={tdStyle}>&quot;adds item to cart&quot;</td>
            <td style={tdStyle}>{isZh ? '单元测试、集成测试' : 'Unit, Integration tests'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? 'should + 动作' : 'should + action'}</td>
            <td style={tdStyle}>&quot;should redirect after login&quot;</td>
            <td style={tdStyle}>{isZh ? 'E2E 测试' : 'E2E tests'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? 'given-when-then' : 'given-when-then'}</td>
            <td style={tdStyle}>&quot;given empty cart, when add item, then total updates&quot;</td>
            <td style={tdStyle}>{isZh ? 'BDD 风格' : 'BDD style'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '边界描述' : 'Edge case description'}</td>
            <td style={tdStyle}>&quot;handles empty string input&quot;</td>
            <td style={tdStyle}>{isZh ? '边界条件' : 'Edge cases'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '错误描述' : 'Error description'}</td>
            <td style={tdStyle}>&quot;throws on invalid email&quot;</td>
            <td style={tdStyle}>{isZh ? '错误处理' : 'Error handling'}</td>
          </tr>
        </tbody>
      </table>

      {/* --- Section 14: Advanced Patterns --- */}
      <h2 style={h2Style}>
        {isZh ? '14. 高级测试模式' : '14. Advanced Testing Patterns'}
      </h2>

      <h3 style={h3Style}>{isZh ? 'Fixture 与工厂模式' : 'Fixtures & Factory Pattern'}</h3>
      <pre style={preStyle}><code>
        {'// test/factories.ts — Test data factories\n'}
        {'import { faker } from "@faker-js/faker";\n\n'}
        {'interface User {\n'}
        {'  id: string;\n'}
        {'  name: string;\n'}
        {'  email: string;\n'}
        {'  role: "admin" | "user";\n'}
        {'  createdAt: Date;\n'}
        {'}\n\n'}
        {'export function createUser(overrides: Partial<User> = {}): User {\n'}
        {'  return {\n'}
        {'    id: faker.string.uuid(),\n'}
        {'    name: faker.person.fullName(),\n'}
        {'    email: faker.internet.email(),\n'}
        {'    role: "user",\n'}
        {'    createdAt: faker.date.past(),\n'}
        {'    ...overrides,\n'}
        {'  };\n'}
        {'}\n\n'}
        {'export function createProduct(overrides = {}) {\n'}
        {'  return {\n'}
        {'    id: faker.string.uuid(),\n'}
        {'    name: faker.commerce.productName(),\n'}
        {'    price: Number(faker.commerce.price()),\n'}
        {'    inStock: true,\n'}
        {'    ...overrides,\n'}
        {'  };\n'}
        {'}\n\n'}
        {'// Usage in tests\n'}
        {'it("displays user profile", () => {\n'}
        {'  const admin = createUser({ role: "admin", name: "Alice" });\n'}
        {'  renderWithProviders(<UserProfile user={admin} />);\n'}
        {'  expect(screen.getByText("Alice")).toBeInTheDocument();\n'}
        {'  expect(screen.getByText("Admin")).toBeInTheDocument();\n'}
        {'});'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? '异步测试与重试' : 'Async Testing & Retries'}</h3>
      <pre style={preStyle}><code>
        {'// Polling and async assertions\n'}
        {'import { waitFor, screen } from "@testing-library/react";\n\n'}
        {'it("loads data after delay", async () => {\n'}
        {'  renderWithProviders(<AsyncDataComponent />);\n\n'}
        {'  // waitFor retries until assertion passes or timeout\n'}
        {'  await waitFor(\n'}
        {'    () => {\n'}
        {'      expect(screen.getByText("Data loaded")).toBeInTheDocument();\n'}
        {'    },\n'}
        {'    { timeout: 3000, interval: 100 }\n'}
        {'  );\n'}
        {'});\n\n'}
        {'// Playwright retries with toPass\n'}
        {'import { test, expect } from "@playwright/test";\n\n'}
        {'test("waits for API to be ready", async ({ request }) => {\n'}
        {'  await expect(async () => {\n'}
        {'    const response = await request.get("/api/health");\n'}
        {'    expect(response.status()).toBe(200);\n'}
        {'  }).toPass({\n'}
        {'    intervals: [1000, 2000, 5000],\n'}
        {'    timeout: 30000,\n'}
        {'  });\n'}
        {'});\n\n'}
        {'// Vitest retry configuration\n'}
        {'// vitest.config.ts\n'}
        {'export default defineConfig({\n'}
        {'  test: {\n'}
        {'    retry: process.env.CI ? 2 : 0,  // Retry flaky tests in CI\n'}
        {'    testTimeout: 10000,\n'}
        {'  },\n'}
        {'});'}
      </code></pre>

      {/* --- Conclusion --- */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '一个成熟的测试策略应覆盖从单元测试到 E2E 测试的完整金字塔。TDD 和 BDD 不仅是测试方法，更是提升代码质量和团队协作的设计方法论。选择合适的工具——Jest/Vitest 用于单元测试，Playwright/Cypress 用于 E2E 测试，MSW 用于 API Mock——并在 CI 中自动化整个流程。记住：好的测试不是越多越好，而是在正确的层级测试正确的东西。'
          : 'A mature testing strategy should cover the full pyramid from unit tests to E2E tests. TDD and BDD are not just testing methods — they are design methodologies that improve code quality and team collaboration. Choose the right tools — Jest/Vitest for unit tests, Playwright/Cypress for E2E tests, MSW for API mocking — and automate the entire workflow in CI. Remember: good testing is not about quantity, but about testing the right things at the right level.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '持续投入测试基础设施——自定义渲染函数、工厂函数、MSW Handler、CI 管道——会让你的测试套件更易维护。当测试成为开发流程的自然部分而非负担时，你就建立了真正的质量文化。'
          : 'Continuously invest in testing infrastructure — custom render functions, factory functions, MSW handlers, CI pipelines — to make your test suite maintainable. When testing becomes a natural part of the development workflow rather than a burden, you have built a true quality culture.'}
      </p>

      {/* FAQ */}
      <h2 style={h2Style}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqSchema.mainEntity.map((faq, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px 24px',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: '0 0 10px 0' }}>
              {faq.name}
            </h3>
            <p style={{ color: '#475569', lineHeight: '1.7', margin: '0' }}>
              {faq.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
