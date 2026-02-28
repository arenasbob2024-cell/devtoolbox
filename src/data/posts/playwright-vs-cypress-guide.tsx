'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Playwright vs Cypress 2026: The Complete E2E Testing Guide',
    description: 'A comprehensive comparison of Playwright and Cypress covering architecture, browser support, language support, parallel execution, debugging, CI/CD, pricing, and real-world examples.',
    intro: 'End-to-end testing is essential for shipping reliable web applications, and in 2026 the two dominant frameworks are Playwright and Cypress. Playwright, backed by Microsoft, uses browser-native automation protocols to control Chromium, Firefox, and WebKit from outside the browser. Cypress runs tests directly inside the browser for a uniquely interactive developer experience. Both frameworks have matured significantly, but they make fundamentally different trade-offs. This guide covers every aspect you need to evaluate.',
    tldr: 'TL;DR: Choose Playwright if you need multi-browser and multi-language support, native parallel execution, or mobile web testing. Choose Cypress if you prefer an interactive in-browser debugging experience, are a JavaScript-only team, or want a gentle learning curve. Playwright is 100% free and open source. Cypress is free locally but Cypress Cloud (parallel CI, analytics) is paid.',
    keyTakeaways: 'Key Takeaways',
    kt1: 'Playwright controls browsers via CDP/protocol from outside, supporting Chromium, Firefox, and WebKit natively. Cypress runs inside the browser, supporting Chrome, Firefox, Edge, and experimental WebKit.',
    kt2: 'Playwright supports JS/TS, Python, Java, and C#. Cypress supports JS/TS only.',
    kt3: 'Playwright includes native parallel execution and sharding. Cypress requires Cypress Cloud (paid) for parallel CI.',
    kt4: 'Playwright Trace Viewer provides full timeline with DOM snapshots, network, and console. Cypress Time Travel lets you hover commands to see DOM snapshots inline.',
    kt5: 'Playwright is free (Apache 2.0). Cypress Cloud starts at $75/month for teams.',
    h2Arch: 'Architecture Comparison',
    archIntro: 'The most important difference is how they interact with the browser. This architectural decision shapes everything from browser support to test reliability.',
    h3PwArch: 'Playwright: Out-of-Process Browser Control',
    pwArchDesc: 'Playwright communicates with browsers through native automation protocols: CDP for Chromium, a similar protocol for Firefox, and the WebKit inspection protocol. The test process runs outside the browser via WebSocket. This enables control of multiple browser contexts, tabs, protocol-level network interception, and device emulation.',
    h3CyArch: 'Cypress: In-Browser Test Runner',
    cyArchDesc: 'Cypress injects itself into the browser alongside your application. Tests run in the same JavaScript context as your app, enabling direct DOM access. However, this means single-tab limitation, origin restrictions, and network requests must be proxied through its Node.js server.',
    h2Features: 'Feature Comparison Table',
    h2Setup: 'Installation and Setup',
    h2Browsers: 'Browser Support',
    browsersDesc: 'Playwright ships its own patched browser binaries for Chromium, Firefox, and WebKit (Safari). You can also test branded Chrome and Edge. Cypress uses locally installed browsers: Chrome, Firefox, Edge, Electron, and experimental WebKit (since v12). Cypress does not ship its own binaries.',
    h2Langs: 'Language Support',
    langsDesc: 'Playwright provides first-class bindings for JS/TS, Python, Java, and C#. Each language has its own package and test runner. Cypress is JavaScript/TypeScript only, which is fine for frontend teams but limits adoption in polyglot organizations.',
    h2TestWriting: 'Test Writing Comparison',
    testWritingDesc: 'Here is the same login flow test in both frameworks side by side.',
    h2Selectors: 'Selectors and Locators',
    selectorsDesc: 'Playwright encourages user-facing locators (getByRole, getByText, getByLabel) that are resilient to DOM changes. Cypress uses cy.get() with CSS selectors as the primary method, with cy.contains() for text. The Testing Library plugin adds accessible locators to Cypress.',
    h2AutoWait: 'Auto-Waiting and Retry Mechanisms',
    autoWaitDesc: 'Playwright auto-waits for elements to be visible, stable, enabled, and not obscured before actions. Assertions use web-first auto-retry. Cypress auto-retries DOM queries (cy.get, cy.find) but action commands (click, type) do not retry. Use cy.intercept() with cy.wait() for network-dependent flows.',
    h2Network: 'Network Interception and Mocking',
    networkDesc: 'Both frameworks let you intercept and mock network requests for testing edge cases and isolating frontend from backend.',
    h2Parallel: 'Parallel Execution and Sharding',
    parallelDesc: 'Playwright runs test files in parallel by default using worker processes with configurable sharding across CI machines. No external service required. Cypress runs tests serially by default; parallel execution across CI machines requires Cypress Cloud (paid), which distributes specs with load balancing.',
    h2CICD: 'CI/CD Integration',
    cicdDesc: 'Both integrate well with CI/CD. Here are GitHub Actions examples.',
    h2Component: 'Component Testing',
    componentDesc: 'Playwright has experimental component testing for React, Vue, and Svelte. Cypress Component Testing is more mature, supporting React, Vue, Angular, and Svelte with framework-specific mounting utilities.',
    h2Visual: 'Visual Testing',
    visualDesc: 'Playwright has built-in toHaveScreenshot() for pixel-by-pixel comparison with configurable thresholds and masking. No plugins needed. Cypress requires third-party plugins (cypress-image-snapshot) or paid services (Percy, Applitools).',
    h2Debug: 'Debugging Experience',
    debugDesc: 'Playwright Trace Viewer replays test execution with a full timeline, DOM snapshots, network requests, and console logs. Traces are shareable zip files. Cypress Time Travel is built into the interactive runner: hover any command to see DOM state. Click to pin and inspect in DevTools. Often cited as the best debugging UX in E2E testing.',
    h2Mobile: 'Mobile Testing',
    mobileDesc: 'Playwright provides a device registry with pre-configured viewports, user agents, and device scale factors for dozens of devices. It emulates geolocation, permissions, locale, and color scheme. WebKit support enables real mobile Safari testing. Cypress supports cy.viewport() for screen size simulation but does not emulate device-specific properties like user agent or touch events natively.',
    h2Perf: 'Performance and Speed',
    h2Fixtures: 'Test Isolation and Fixtures',
    fixturesDesc: 'Playwright uses a powerful fixture system inspired by pytest with dependency injection. Each test gets a fresh browser context by default. Cypress uses Mocha-style hooks (before, beforeEach) and cy.session() for caching login state across tests. Custom commands encapsulate reusable logic.',
    h2Api: 'API Testing',
    apiDesc: 'Playwright provides APIRequestContext that shares cookies with browser contexts. Cypress provides cy.request() which shares the browser cookie jar. Both are commonly used in beforeEach hooks for test data setup.',
    h2Pricing: 'Pricing Comparison',
    h2Community: 'Community and Ecosystem',
    h2WhenChoose: 'When to Choose Each Framework',
    pwUseCases: 'Multi-browser testing (Chromium, Firefox, WebKit)|Team uses Python, Java, or C#|Native parallel execution without paid service|Mobile web testing with device emulation|Built-in visual regression testing|Multi-tab or multi-origin scenarios|Free, fully open-source solution',
    cyUseCases: 'JavaScript/TypeScript focused team|Interactive debugging experience priority|Mature component testing needed|Gentle learning curve for junior devs|Tests primarily against Chrome|Managed parallel service (Cypress Cloud)|Large plugin ecosystem|Time Travel debugging important',
    h2Migration: 'Migration Guide',
    migrationDesc: 'Both frameworks can coexist during migration. Install Playwright alongside Cypress and migrate tests one file at a time.',
    h2BP: 'Best Practices',
    pwBP: 'Use user-facing locators (getByRole, getByText)|Use web-first assertions for auto-retry|Create page object models for large suites|Use fixtures for auth and test data|Enable tracing in CI for debugging|Run parallel with sharding|Use projects for multi-browser runs',
    cyBP: 'Use data-cy attributes for stable selectors|Avoid cy.wait(ms) with arbitrary timeouts|Use cy.intercept() for network control|Use cy.session() to cache login state|Keep tests independent with beforeEach cleanup|Use custom commands for reusable logic|Set baseUrl in config to avoid hardcoded URLs',
    h2RealCI: 'Real-World CI Configuration',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Playwright faster than Cypress?',
    faq1A: 'Generally yes. Playwright tests typically execute 2-4x faster due to out-of-process architecture, native parallelism, and fewer serialization roundtrips. The difference narrows for simpler test suites.',
    faq2Q: 'Can Cypress test Safari?',
    faq2A: 'Cypress added experimental WebKit support in v12, but it is not as mature as Playwright WebKit testing which has been a core feature since launch.',
    faq3Q: 'Which framework has better documentation?',
    faq3A: 'Both have excellent documentation. Cypress is praised for beginner-friendliness with guides and videos. Playwright is thorough and well-organized with runnable code examples.',
    faq4Q: 'Can I use both Playwright and Cypress together?',
    faq4A: 'Yes. Some teams use Cypress for component testing and Playwright for cross-browser E2E testing in CI, leveraging strengths of each.',
    faq5Q: 'Is Cypress Cloud required for CI?',
    faq5A: 'No. Cypress tests run fine in CI without Cloud. Cloud is only needed for parallel execution across machines, test recordings, and analytics dashboard.',
    faq6Q: 'Does Playwright support iframe testing?',
    faq6A: 'Yes. Playwright has first-class iframe support through frameLocator(). Cypress supports iframes but requires plugins, making it less ergonomic.',
    faq7Q: 'Which framework is better for beginners?',
    faq7A: 'Cypress is generally more beginner-friendly due to its interactive test runner, intuitive command chain syntax, and excellent onboarding docs. Playwright has a steeper initial curve but becomes very productive.',
    faq8Q: 'Can I migrate from Cypress to Playwright incrementally?',
    faq8A: 'Yes. Both use separate test files so you can install Playwright alongside Cypress and migrate one file at a time. Many teams run both in CI during migration.',
  },
  zh: {
    title: 'Playwright vs Cypress 2026：完整的端到端测试指南',
    description: '全面比较 Playwright 和 Cypress 的架构、浏览器支持、语言支持、并行执行、调试、CI/CD 集成、定价和实际测试示例。',
    intro: '端到端测试对于交付可靠的 Web 应用至关重要。2026 年两个主流框架是 Playwright 和 Cypress。Playwright 由微软支持，使用浏览器原生自动化协议从外部控制 Chromium、Firefox 和 WebKit。Cypress 在浏览器内部运行测试，提供独特的交互式开发者体验。本指南涵盖了你在做出选择前需要评估的所有方面。',
    tldr: 'TL;DR：需要多浏览器和多语言支持、原生并行执行或移动端测试，选 Playwright。喜欢交互式调试、纯 JS 团队或较平缓学习曲线，选 Cypress。Playwright 完全免费开源。Cypress 本地免费，Cloud 需付费。',
    keyTakeaways: '核心要点',
    kt1: 'Playwright 通过 CDP/协议从外部控制浏览器，原生支持 Chromium、Firefox 和 WebKit。Cypress 在浏览器内运行。',
    kt2: 'Playwright 支持 JS/TS、Python、Java 和 C#。Cypress 仅支持 JS/TS。',
    kt3: 'Playwright 开箱即用包含原生并行执行和分片。Cypress 并行 CI 需要 Cypress Cloud（付费）。',
    kt4: 'Playwright Trace Viewer 提供完整时间线。Cypress Time Travel 让你悬停命令查看 DOM 快照。',
    kt5: 'Playwright 免费（Apache 2.0）。Cypress Cloud 团队版从每月 $75 起。',
    h2Arch: '架构比较', archIntro: 'Playwright 和 Cypress 最重要的区别在于它们如何与浏览器交互。',
    h3PwArch: 'Playwright：进程外浏览器控制', pwArchDesc: 'Playwright 通过浏览器原生自动化协议通信，测试进程在浏览器外运行，可控制多个上下文和标签页。',
    h3CyArch: 'Cypress：浏览器内测试运行器', cyArchDesc: 'Cypress 注入浏览器与应用一起运行，可直接访问 DOM，但有单标签页限制。',
    h2Features: '功能比较表', h2Setup: '安装和设置',
    h2Browsers: '浏览器支持', browsersDesc: 'Playwright 自带 Chromium、Firefox、WebKit 二进制文件。Cypress 使用本地安装的浏览器，WebKit 为实验性。',
    h2Langs: '语言支持', langsDesc: 'Playwright 支持 JS/TS、Python、Java、C#。Cypress 仅支持 JS/TS。',
    h2TestWriting: '测试编写对比', testWritingDesc: '以下是同一登录流程测试在两个框架中的写法。',
    h2Selectors: '选择器和定位器', selectorsDesc: 'Playwright 鼓励面向用户的定位器。Cypress 使用 CSS 选择器配合 cy.get()。',
    h2AutoWait: '自动等待和重试', autoWaitDesc: 'Playwright 自动等待元素可操作并自动重试断言。Cypress 重试 DOM 查询但操作命令不重试。',
    h2Network: '网络拦截和模拟', networkDesc: '两者都支持拦截和模拟网络请求。',
    h2Parallel: '并行执行和分片', parallelDesc: 'Playwright 默认并行运行，支持分片。Cypress 默认串行，并行需要 Cypress Cloud。',
    h2CICD: 'CI/CD 集成', cicdDesc: '两者都能很好集成 CI/CD。',
    h2Component: '组件测试', componentDesc: 'Playwright 实验性支持组件测试。Cypress 组件测试更成熟。',
    h2Visual: '视觉测试', visualDesc: 'Playwright 内置截图比较。Cypress 需要第三方插件。',
    h2Debug: '调试体验', debugDesc: 'Playwright Trace Viewer 重放完整时间线。Cypress Time Travel 悬停命令查看 DOM。',
    h2Mobile: '移动端测试', mobileDesc: 'Playwright 提供完整设备模拟。Cypress 仅支持视口调整。',
    h2Perf: '性能和速度',
    h2Fixtures: '测试隔离和 Fixtures', fixturesDesc: 'Playwright 使用 fixture 系统。Cypress 使用 Mocha 钩子和 cy.session()。',
    h2Api: 'API 测试', apiDesc: '两者都可发送 HTTP 请求进行 API 测试。',
    h2Pricing: '定价比较', h2Community: '社区和生态系统',
    h2WhenChoose: '何时选择各框架',
    pwUseCases: '需要跨浏览器测试|团队使用 Python/Java/C#|无付费的原生并行|移动端设备模拟|内置视觉回归测试|多标签/多源场景|免费开源方案',
    cyUseCases: 'JS/TS 专注团队|重视交互式调试|成熟组件测试|初级开发者友好|主要测试 Chrome|托管并行服务|丰富插件生态|Time Travel 调试',
    h2Migration: '迁移指南', migrationDesc: '两个框架可共存，逐文件迁移。',
    h2BP: '最佳实践',
    pwBP: '使用面向用户的定位器|使用 web-first 断言|创建页面对象模型|用 fixtures 做认证|CI 中启用 tracing|分片并行|projects 多浏览器',
    cyBP: '用 data-cy 属性|避免任意 cy.wait(ms)|用 cy.intercept()|用 cy.session() 缓存登录|beforeEach 保持独立|自定义命令封装|设置 baseUrl',
    h2RealCI: '生产环境 CI 配置', h2Faq: '常见问题',
    faq1Q: 'Playwright 比 Cypress 快吗？', faq1A: '通常是的，快 2-4 倍。但简单测试套件差异缩小。',
    faq2Q: 'Cypress 能测试 Safari 吗？', faq2A: '实验性支持 WebKit，但不如 Playwright 成熟。',
    faq3Q: '哪个文档更好？', faq3A: '两者都优秀。Cypress 新手友好，Playwright 全面系统。',
    faq4Q: '可以同时用两者吗？', faq4A: '可以。用 Cypress 做组件测试，Playwright 做跨浏览器 E2E。',
    faq5Q: 'CI 必须用 Cypress Cloud 吗？', faq5A: '不需要，Cloud 仅用于并行和分析。',
    faq6Q: 'Playwright 支持 iframe 吗？', faq6A: '是的，通过 frameLocator() 一等支持。',
    faq7Q: '哪个对初学者更友好？', faq7A: 'Cypress 更适合初学者，有交互式运行器和直观语法。',
    faq8Q: '可以增量迁移吗？', faq8A: '可以，逐文件迁移，迁移期间两者共存。',
  },
};

export default function PlaywrightVsCypressGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
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
  const h2s = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' } as const;
  const h3s = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' } as const;
  const pre = { backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem' };
  const td = { border: '1px solid #374151', padding: '0.5rem 1rem' };
  const th = { ...td, textAlign: 'left' as const };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem', margin: '1.5rem 0' }}>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.7', color: '#0c4a6e' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 0, marginBottom: '0.75rem' }}>{t.keyTakeaways}</h3>
        <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
          {[t.kt1, t.kt2, t.kt3, t.kt4, t.kt5].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Architecture */}
      <h2 style={h2s}>{t.h2Arch}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.archIntro}</p>
      <h3 style={h3s}>{t.h3PwArch}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.pwArchDesc}</p>
      <pre style={pre}><code>{
        '┌──────────────────┐    WebSocket/CDP    ┌──────────────┐\n' +
        '│  Test Process    │ ◄─────────────────► │   Browser    │\n' +
        '│  (Node.js)       │                     │  Chromium    │\n' +
        '│  - Test code     │                     │  Firefox     │\n' +
        '│  - Assertions    │                     │  WebKit      │\n' +
        '│  - Fixtures      │                     │  [Your App]  │\n' +
        '└──────────────────┘                     └──────────────┘\n' +
        'Tests run OUTSIDE the browser → full lifecycle control'
      }</code></pre>
      <h3 style={h3s}>{t.h3CyArch}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cyArchDesc}</p>
      <pre style={pre}><code>{
        '┌───────────────────────────────────────────┐\n' +
        '│                 Browser                    │\n' +
        '│  ┌─────────────┐  ┌────────────────────┐  │\n' +
        '│  │ Cypress      │  │   Your App         │  │\n' +
        '│  │ Test Runner  │  │   (iframe)         │  │\n' +
        '│  │ - Commands   │  │   Same JS context  │  │\n' +
        '│  └─────────────┘  └────────────────────┘  │\n' +
        '│  ┌─────────────────────────────────────┐   │\n' +
        '│  │ Node.js Proxy (network + filesystem)│   │\n' +
        '│  └─────────────────────────────────────┘   │\n' +
        '└───────────────────────────────────────────┘\n' +
        'Tests run INSIDE the browser → direct DOM access'
      }</code></pre>

      {/* Feature Table */}
      <h2 style={h2s}>{t.h2Features}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr><th style={th}>Feature</th><th style={th}>Playwright</th><th style={th}>Cypress</th></tr>
          </thead>
          <tbody>
            {[
              ['Browser support', 'Chromium, Firefox, WebKit', 'Chrome, Firefox, Edge, WebKit (exp.)'],
              ['Language support', 'JS/TS, Python, Java, C#', 'JS/TS only'],
              ['Parallel execution', 'Native (workers + sharding)', 'Cypress Cloud (paid)'],
              ['Network interception', 'Protocol-level (route)', 'Proxy-level (intercept)'],
              ['Mobile testing', 'Device emulation (viewport, UA, touch)', 'Viewport only'],
              ['Visual testing', 'Built-in (toHaveScreenshot)', 'Plugin required'],
              ['Component testing', 'Experimental (React, Vue, Svelte)', 'Stable (React, Vue, Angular, Svelte)'],
              ['API testing', 'Built-in (APIRequestContext)', 'Built-in (cy.request)'],
              ['Trace/debug', 'Trace Viewer + UI mode', 'Time Travel + interactive runner'],
              ['Auto-waiting', 'All actions + assertions', 'DOM queries + assertions'],
              ['Multi-tab', 'Native', 'Not supported'],
              ['iframe', 'Native (frameLocator)', 'Plugin required'],
              ['Test generator', 'Codegen (records actions)', 'Cypress Studio (limited)'],
              ['License', 'Apache 2.0', 'MIT (core) + proprietary (Cloud)'],
            ].map(([f, pw, cy], i) => (
              <tr key={i}><td style={{ ...td, fontWeight: 500 }}>{f}</td><td style={td}>{pw}</td><td style={td}>{cy}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Setup */}
      <h2 style={h2s}>{t.h2Setup}</h2>
      <h3 style={h3s}>Playwright Setup</h3>
      <pre style={pre}><code>{
        '# Initialize project\n' +
        'npm init playwright@latest\n' +
        '\n' +
        '# playwright.config.ts\n' +
        'import { defineConfig, devices } from \'@playwright/test\';\n' +
        'export default defineConfig({\n' +
        '  testDir: \'./tests\',\n' +
        '  fullyParallel: true,\n' +
        '  retries: process.env.CI ? 2 : 0,\n' +
        '  reporter: \'html\',\n' +
        '  use: { baseURL: \'http://localhost:3000\', trace: \'on-first-retry\' },\n' +
        '  projects: [\n' +
        '    { name: \'chromium\', use: { ...devices[\'Desktop Chrome\'] } },\n' +
        '    { name: \'firefox\', use: { ...devices[\'Desktop Firefox\'] } },\n' +
        '    { name: \'webkit\', use: { ...devices[\'Desktop Safari\'] } },\n' +
        '  ],\n' +
        '});'
      }</code></pre>
      <h3 style={h3s}>Cypress Setup</h3>
      <pre style={pre}><code>{
        '# Install and open wizard\n' +
        'npm install cypress --save-dev\n' +
        'npx cypress open\n' +
        '\n' +
        '// cypress.config.ts\n' +
        'import { defineConfig } from \'cypress\';\n' +
        'export default defineConfig({\n' +
        '  e2e: {\n' +
        '    baseUrl: \'http://localhost:3000\',\n' +
        '    viewportWidth: 1280,\n' +
        '    viewportHeight: 720,\n' +
        '    retries: { runMode: 2, openMode: 0 },\n' +
        '    setupNodeEvents(on, config) {},\n' +
        '  },\n' +
        '});'
      }</code></pre>

      {/* Browser + Language Support */}
      <h2 style={h2s}>{t.h2Browsers}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.browsersDesc}</p>
      <h2 style={h2s}>{t.h2Langs}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.langsDesc}</p>
      <pre style={pre}><code>{
        '# Playwright multi-language install\n' +
        'npm init playwright@latest          # JS/TS\n' +
        'pip install playwright              # Python\n' +
        'dotnet add package Microsoft.Playwright  # C#\n' +
        '# Maven: com.microsoft.playwright   # Java'
      }</code></pre>

      {/* Test Writing */}
      <h2 style={h2s}>{t.h2TestWriting}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.testWritingDesc}</p>
      <h3 style={h3s}>Playwright Test</h3>
      <pre style={pre}><code>{
        'import { test, expect } from \'@playwright/test\';\n\n' +
        'test(\'login and see dashboard\', async ({ page }) => {\n' +
        '  await page.goto(\'/login\');\n' +
        '  await page.getByLabel(\'Email\').fill(\'user@example.com\');\n' +
        '  await page.getByLabel(\'Password\').fill(\'password123\');\n' +
        '  await page.getByRole(\'button\', { name: \'Sign In\' }).click();\n' +
        '  await expect(page).toHaveURL(\'/dashboard\');\n' +
        '  await expect(page.getByRole(\'heading\', { name: \'Welcome back\' })).toBeVisible();\n' +
        '  await expect(page.getByTestId(\'user-menu\')).toContainText(\'user@example.com\');\n' +
        '});'
      }</code></pre>
      <h3 style={h3s}>Cypress Test</h3>
      <pre style={pre}><code>{
        'describe(\'Login Flow\', () => {\n' +
        '  it(\'login and see dashboard\', () => {\n' +
        '    cy.visit(\'/login\');\n' +
        '    cy.get(\'[data-cy="email-input"]\').type(\'user@example.com\');\n' +
        '    cy.get(\'[data-cy="password-input"]\').type(\'password123\');\n' +
        '    cy.get(\'[data-cy="login-button"]\').click();\n' +
        '    cy.url().should(\'include\', \'/dashboard\');\n' +
        '    cy.contains(\'h1\', \'Welcome back\').should(\'be.visible\');\n' +
        '    cy.get(\'[data-cy="user-menu"]\').should(\'contain\', \'user@example.com\');\n' +
        '  });\n' +
        '});'
      }</code></pre>

      {/* Selectors */}
      <h2 style={h2s}>{t.h2Selectors}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.selectorsDesc}</p>
      <pre style={pre}><code>{
        '// Playwright locators (best → fallback)\n' +
        'page.getByRole(\'button\', { name: \'Submit\' })  // accessible\n' +
        'page.getByLabel(\'Email\')                       // form fields\n' +
        'page.getByText(\'Welcome\')                      // visible text\n' +
        'page.getByTestId(\'submit-btn\')                 // test IDs\n' +
        'page.locator(\'css=button.primary\')             // CSS fallback\n\n' +
        '// Cypress selectors (best → fallback)\n' +
        'cy.get(\'[data-cy="submit-btn"]\')        // dedicated test attr\n' +
        'cy.contains(\'button\', \'Submit\')          // text content\n' +
        'cy.get(\'#submit-button\')                 // ID selector\n' +
        'cy.findByRole(\'button\', { name: \'Submit\' }) // @testing-library plugin'
      }</code></pre>

      {/* Auto-Waiting */}
      <h2 style={h2s}>{t.h2AutoWait}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.autoWaitDesc}</p>
      <pre style={pre}><code>{
        '// Playwright: auto-waits for actionability\n' +
        'await page.getByRole(\'button\', { name: \'Save\' }).click(); // waits visible+stable\n' +
        'await expect(page.getByText(\'Saved!\')).toBeVisible();     // auto-retry\n\n' +
        '// Cypress: queries retry, actions don\'t\n' +
        'cy.get(\'[data-cy="save-btn"]\').click();                   // retries cy.get()\n' +
        'cy.get(\'[data-cy="status"]\').should(\'contain\', \'Saved!\'); // assertion retries\n' +
        'cy.intercept(\'POST\', \'/api/save\').as(\'save\');             // wait for network\n' +
        'cy.get(\'[data-cy="save-btn"]\').click();\n' +
        'cy.wait(\'@save\');'
      }</code></pre>

      {/* Page Object Model */}
      <h2 style={h2s}>Page Object Model Comparison</h2>
      <p style={{ marginBottom: '1rem' }}>Both frameworks benefit from the Page Object pattern to encapsulate page interactions and reduce test duplication.</p>
      <h3 style={h3s}>Playwright Page Object</h3>
      <pre style={pre}><code>{
        '// pages/login.page.ts\n' +
        'import { Page, Locator, expect } from \'@playwright/test\';\n\n' +
        'export class LoginPage {\n' +
        '  readonly page: Page;\n' +
        '  readonly emailInput: Locator;\n' +
        '  readonly passwordInput: Locator;\n' +
        '  readonly submitButton: Locator;\n\n' +
        '  constructor(page: Page) {\n' +
        '    this.page = page;\n' +
        '    this.emailInput = page.getByLabel(\'Email\');\n' +
        '    this.passwordInput = page.getByLabel(\'Password\');\n' +
        '    this.submitButton = page.getByRole(\'button\', { name: \'Sign In\' });\n' +
        '  }\n\n' +
        '  async goto() { await this.page.goto(\'/login\'); }\n\n' +
        '  async login(email: string, password: string) {\n' +
        '    await this.emailInput.fill(email);\n' +
        '    await this.passwordInput.fill(password);\n' +
        '    await this.submitButton.click();\n' +
        '    await expect(this.page).toHaveURL(\'/dashboard\');\n' +
        '  }\n' +
        '}\n\n' +
        '// Usage in test:\n' +
        'test(\'login via page object\', async ({ page }) => {\n' +
        '  const loginPage = new LoginPage(page);\n' +
        '  await loginPage.goto();\n' +
        '  await loginPage.login(\'user@test.com\', \'pass123\');\n' +
        '});'
      }</code></pre>
      <h3 style={h3s}>Cypress Page Object</h3>
      <pre style={pre}><code>{
        '// pages/login.page.ts\n' +
        'export class LoginPage {\n' +
        '  get emailInput() { return cy.get(\'[data-cy="email"]\'); }\n' +
        '  get passwordInput() { return cy.get(\'[data-cy="password"]\'); }\n' +
        '  get submitButton() { return cy.get(\'[data-cy="login-btn"]\'); }\n\n' +
        '  goto() { cy.visit(\'/login\'); }\n\n' +
        '  login(email: string, password: string) {\n' +
        '    this.emailInput.type(email);\n' +
        '    this.passwordInput.type(password);\n' +
        '    this.submitButton.click();\n' +
        '    cy.url().should(\'include\', \'/dashboard\');\n' +
        '  }\n' +
        '}\n\n' +
        '// Usage in test:\n' +
        'const loginPage = new LoginPage();\n' +
        'it(\'login via page object\', () => {\n' +
        '  loginPage.goto();\n' +
        '  loginPage.login(\'user@test.com\', \'pass123\');\n' +
        '});'
      }</code></pre>

      {/* Network Interception */}
      <h2 style={h2s}>{t.h2Network}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.networkDesc}</p>
      <h3 style={h3s}>Playwright Network Mocking</h3>
      <pre style={pre}><code>{
        'await page.route(\'/api/users\', async (route) => {\n' +
        '  await route.fulfill({\n' +
        '    status: 200,\n' +
        '    contentType: \'application/json\',\n' +
        '    body: JSON.stringify([{ id: 1, name: \'Alice\' }]),\n' +
        '  });\n' +
        '});\n\n' +
        '// Modify real response\n' +
        'await page.route(\'/api/config\', async (route) => {\n' +
        '  const response = await route.fetch();\n' +
        '  const json = await response.json();\n' +
        '  json.featureFlag = true;\n' +
        '  await route.fulfill({ response, json });\n' +
        '});\n\n' +
        '// Block resources\n' +
        'await page.route(\'**/*.{png,jpg}\', route => route.abort());'
      }</code></pre>
      <h3 style={h3s}>Cypress Network Mocking</h3>
      <pre style={pre}><code>{
        'cy.intercept(\'GET\', \'/api/users\', {\n' +
        '  statusCode: 200,\n' +
        '  body: [{ id: 1, name: \'Alice\' }],\n' +
        '}).as(\'getUsers\');\n\n' +
        '// Modify real response\n' +
        'cy.intercept(\'GET\', \'/api/config\', (req) => {\n' +
        '  req.continue((res) => { res.body.featureFlag = true; });\n' +
        '}).as(\'getConfig\');\n\n' +
        '// Use fixture file\n' +
        'cy.intercept(\'GET\', \'/api/users\', { fixture: \'users.json\' }).as(\'getUsers\');\n' +
        'cy.visit(\'/dashboard\');\n' +
        'cy.wait(\'@getUsers\');'
      }</code></pre>

      {/* Parallel */}
      <h2 style={h2s}>{t.h2Parallel}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.parallelDesc}</p>
      <pre style={pre}><code>{
        '// Playwright: native parallel + sharding\n' +
        'export default defineConfig({ fullyParallel: true, workers: 4 });\n' +
        '# npx playwright test --shard=1/3  (machine 1)\n' +
        '# npx playwright test --shard=2/3  (machine 2)\n' +
        '# npx playwright test --shard=3/3  (machine 3)\n\n' +
        '# Cypress: serial by default, Cloud for parallel\n' +
        '# npx cypress run                              (serial)\n' +
        '# npx cypress run --record --parallel --key KEY (Cloud required)'
      }</code></pre>

      {/* CI/CD */}
      <h2 style={h2s}>{t.h2CICD}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.cicdDesc}</p>
      <h3 style={h3s}>Playwright GitHub Actions</h3>
      <pre style={pre}><code>{
        'name: Playwright Tests\n' +
        'on: [push, pull_request]\n' +
        'jobs:\n' +
        '  test:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - uses: actions/setup-node@v4\n' +
        '        with: { node-version: 20 }\n' +
        '      - run: npm ci\n' +
        '      - run: npx playwright install --with-deps\n' +
        '      - run: npx playwright test\n' +
        '      - uses: actions/upload-artifact@v4\n' +
        '        if: failure()\n' +
        '        with: { name: playwright-report, path: playwright-report/ }'
      }</code></pre>
      <h3 style={h3s}>Cypress GitHub Actions</h3>
      <pre style={pre}><code>{
        'name: Cypress Tests\n' +
        'on: [push, pull_request]\n' +
        'jobs:\n' +
        '  test:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - uses: cypress-io/github-action@v6\n' +
        '        with:\n' +
        '          build: npm run build\n' +
        '          start: npm start\n' +
        '          wait-on: http://localhost:3000\n' +
        '      - uses: actions/upload-artifact@v4\n' +
        '        if: failure()\n' +
        '        with: { name: cypress-screenshots, path: cypress/screenshots/ }'
      }</code></pre>

      {/* Component Testing */}
      <h2 style={h2s}>{t.h2Component}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.componentDesc}</p>
      <pre style={pre}><code>{
        '// Cypress Component Test (React)\n' +
        'import { mount } from \'cypress/react18\';\n' +
        'import TodoList from \'./TodoList\';\n\n' +
        'it(\'adds a new todo\', () => {\n' +
        '  mount(<TodoList />);\n' +
        '  cy.get(\'[data-cy="todo-input"]\').type(\'Buy groceries{enter}\');\n' +
        '  cy.get(\'[data-cy="todo-list"] li\').should(\'have.length\', 1);\n' +
        '});'
      }</code></pre>

      {/* Visual Testing */}
      <h2 style={h2s}>{t.h2Visual}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.visualDesc}</p>
      <pre style={pre}><code>{
        '// Playwright: built-in visual regression\n' +
        'test(\'homepage visual\', async ({ page }) => {\n' +
        '  await page.goto(\'/\');\n' +
        '  await expect(page).toHaveScreenshot(\'homepage.png\', { maxDiffPixels: 100 });\n' +
        '  await expect(page.getByTestId(\'hero\')).toHaveScreenshot(\'hero.png\');\n' +
        '  // Mask dynamic content\n' +
        '  await expect(page).toHaveScreenshot(\'page.png\', {\n' +
        '    mask: [page.getByTestId(\'timestamp\')],\n' +
        '  });\n' +
        '});'
      }</code></pre>

      {/* Debugging */}
      <h2 style={h2s}>{t.h2Debug}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.debugDesc}</p>
      <h3 style={h3s}>Playwright Trace Viewer</h3>
      <pre style={pre}><code>{
        '# Record traces in CI (recommended: on-first-retry)\n' +
        '# playwright.config.ts: use: { trace: \'on-first-retry\' }\n\n' +
        '# Record trace for all tests\n' +
        'npx playwright test --trace on\n\n' +
        '# View trace locally (opens a web app)\n' +
        'npx playwright show-trace trace.zip\n\n' +
        '# Or upload to trace.playwright.dev for sharing\n\n' +
        '# Debug with headed browser + Playwright Inspector\n' +
        'npx playwright test --debug\n\n' +
        '# UI Mode: interactive test development\n' +
        'npx playwright test --ui\n' +
        '# - Watch mode with live reload\n' +
        '# - Click to filter tests\n' +
        '# - Timeline + DOM snapshots + network'
      }</code></pre>
      <h3 style={h3s}>Cypress Time Travel + DevTools</h3>
      <pre style={pre}><code>{
        '# Open interactive test runner\n' +
        'npx cypress open\n\n' +
        '# In the runner:\n' +
        '# - Every command logged in left panel\n' +
        '# - Hover command → DOM snapshot appears\n' +
        '# - Click command → pin and inspect in DevTools\n\n' +
        '// Programmatic debugging in tests:\n' +
        'cy.get(\'[data-cy="element"]\').then(($el) => {\n' +
        '  debugger; // pauses in browser DevTools\n' +
        '});\n\n' +
        'cy.get(\'[data-cy="element"]\').debug(); // Cypress debug helper\n\n' +
        '// Log custom messages to command log\n' +
        'cy.log(\'About to submit the form\');\n' +
        'cy.get(\'[data-cy="submit"]\').click();'
      }</code></pre>

      {/* Mobile Testing */}
      <h2 style={h2s}>{t.h2Mobile}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.mobileDesc}</p>
      <h3 style={h3s}>Playwright Mobile Emulation</h3>
      <pre style={pre}><code>{
        'import { devices } from \'@playwright/test\';\n\n' +
        '// Config: test on real device profiles\n' +
        'export default defineConfig({\n' +
        '  projects: [\n' +
        '    { name: \'Desktop Chrome\', use: { ...devices[\'Desktop Chrome\'] } },\n' +
        '    { name: \'iPhone 14\', use: { ...devices[\'iPhone 14\'] } },\n' +
        '    { name: \'Pixel 7\', use: { ...devices[\'Pixel 7\'] } },\n' +
        '    { name: \'iPad Pro\', use: { ...devices[\'iPad Pro 11\'] } },\n' +
        '  ],\n' +
        '});\n\n' +
        '// Test with geolocation + permissions\n' +
        'test(\'mobile map\', async ({ page, context }) => {\n' +
        '  await context.grantPermissions([\'geolocation\']);\n' +
        '  await context.setGeolocation({ latitude: 37.77, longitude: -122.42 });\n' +
        '  await page.goto(\'/map\');\n' +
        '});'
      }</code></pre>
      <h3 style={h3s}>Cypress Mobile Testing</h3>
      <pre style={pre}><code>{
        '// Cypress: viewport-based only\n' +
        'describe(\'Mobile responsive\', () => {\n' +
        '  it(\'shows mobile menu\', () => {\n' +
        '    cy.viewport(\'iphone-14\');\n' +
        '    cy.visit(\'/\');\n' +
        '    cy.get(\'[data-cy="desktop-nav"]\').should(\'not.be.visible\');\n' +
        '    cy.get(\'[data-cy="mobile-menu-btn"]\').should(\'be.visible\').click();\n' +
        '    cy.get(\'[data-cy="mobile-nav"]\').should(\'be.visible\');\n' +
        '  });\n\n' +
        '  it(\'tablet layout\', () => {\n' +
        '    cy.viewport(768, 1024);\n' +
        '    cy.visit(\'/\');\n' +
        '  });\n' +
        '});'
      }</code></pre>

      {/* Performance */}
      <h2 style={h2s}>{t.h2Perf}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr><th style={th}>Metric</th><th style={th}>Playwright</th><th style={th}>Cypress</th></tr>
          </thead>
          <tbody>
            {[
              ['Cold start', '~2-4s', '~5-8s'],
              ['100 E2E tests (serial)', '~2-4 min', '~5-10 min'],
              ['100 E2E tests (4x parallel)', '~30s-1min', 'Requires Cloud'],
              ['Memory usage', 'Lower (out-of-process)', 'Higher (in-browser)'],
              ['Network intercept cost', 'Minimal (protocol)', 'Moderate (proxy hop)'],
            ].map(([m, pw, cy], i) => (
              <tr key={i}><td style={td}>{m}</td><td style={td}>{pw}</td><td style={td}>{cy}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fixtures */}
      <h2 style={h2s}>{t.h2Fixtures}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.fixturesDesc}</p>
      <pre style={pre}><code>{
        '// Playwright: custom fixtures\n' +
        'const test = base.extend({\n' +
        '  authenticatedPage: async ({ browser }, use) => {\n' +
        '    const ctx = await browser.newContext({ storageState: \'auth.json\' });\n' +
        '    const page = await ctx.newPage();\n' +
        '    await use(page);\n' +
        '    await ctx.close();\n' +
        '  },\n' +
        '});\n\n' +
        '// Cypress: session caching\n' +
        'Cypress.Commands.add(\'login\', (email, pw) => {\n' +
        '  cy.session([email, pw], () => {\n' +
        '    cy.visit(\'/login\');\n' +
        '    cy.get(\'[data-cy="email"]\').type(email);\n' +
        '    cy.get(\'[data-cy="password"]\').type(pw);\n' +
        '    cy.get(\'[data-cy="submit"]\').click();\n' +
        '    cy.url().should(\'include\', \'/dashboard\');\n' +
        '  });\n' +
        '});'
      }</code></pre>

      {/* API Testing */}
      <h2 style={h2s}>{t.h2Api}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.apiDesc}</p>
      <h3 style={h3s}>Playwright API Testing</h3>
      <pre style={pre}><code>{
        'import { test, expect } from \'@playwright/test\';\n\n' +
        'test(\'create and verify user\', async ({ request }) => {\n' +
        '  // Create via API\n' +
        '  const response = await request.post(\'/api/users\', {\n' +
        '    data: { name: \'Alice\', email: \'alice@test.com\' },\n' +
        '  });\n' +
        '  expect(response.ok()).toBeTruthy();\n' +
        '  const user = await response.json();\n' +
        '  expect(user.name).toBe(\'Alice\');\n\n' +
        '  // Verify via GET\n' +
        '  const getRes = await request.get(\'/api/users/\' + user.id);\n' +
        '  const fetched = await getRes.json();\n' +
        '  expect(fetched.email).toBe(\'alice@test.com\');\n' +
        '});\n\n' +
        '// API + Browser: set up data then verify in UI\n' +
        'test(\'API setup + UI verify\', async ({ request, page }) => {\n' +
        '  await request.post(\'/api/todos\', { data: { title: \'Buy milk\' } });\n' +
        '  await page.goto(\'/todos\');\n' +
        '  await expect(page.getByText(\'Buy milk\')).toBeVisible();\n' +
        '});'
      }</code></pre>
      <h3 style={h3s}>Cypress API Testing</h3>
      <pre style={pre}><code>{
        'describe(\'API: Users\', () => {\n' +
        '  it(\'creates and verifies a user\', () => {\n' +
        '    cy.request(\'POST\', \'/api/users\', {\n' +
        '      name: \'Alice\', email: \'alice@test.com\',\n' +
        '    }).then((res) => {\n' +
        '      expect(res.status).to.eq(201);\n' +
        '      expect(res.body.name).to.eq(\'Alice\');\n\n' +
        '      // Verify via GET\n' +
        '      cy.request(\'/api/users/\' + res.body.id)\n' +
        '        .its(\'body.email\')\n' +
        '        .should(\'eq\', \'alice@test.com\');\n' +
        '    });\n' +
        '  });\n\n' +
        '  // Setup via API, verify in UI\n' +
        '  it(\'API setup + UI verify\', () => {\n' +
        '    cy.request(\'POST\', \'/api/todos\', { title: \'Buy milk\' });\n' +
        '    cy.visit(\'/todos\');\n' +
        '    cy.contains(\'Buy milk\').should(\'be.visible\');\n' +
        '  });\n' +
        '});'
      }</code></pre>

      {/* Pricing */}
      <h2 style={h2s}>{t.h2Pricing}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr><th style={th}>Tier</th><th style={th}>Price</th><th style={th}>Includes</th></tr>
          </thead>
          <tbody>
            {[
              ['Playwright (all)', 'Free (Apache 2.0)', 'All browsers, parallel, sharding, tracing, visual, API, codegen'],
              ['Cypress (open source)', 'Free (MIT)', 'Local testing, all browsers, component testing, time travel'],
              ['Cypress Cloud Free', 'Free', '3 users, 500 results/month'],
              ['Cypress Cloud Team', '$75/month', '5 users, unlimited results, parallel, flake detection'],
              ['Cypress Cloud Business', '$200/month', '10 users, SSO, priority support'],
              ['Cypress Cloud Enterprise', 'Custom', 'Unlimited users, SLA, on-premise'],
            ].map(([tier, price, inc], i) => (
              <tr key={i}><td style={{ ...td, fontWeight: 500 }}>{tier}</td><td style={td}>{price}</td><td style={td}>{inc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Community */}
      <h2 style={h2s}>{t.h2Community}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr><th style={th}>Metric</th><th style={th}>Playwright</th><th style={th}>Cypress</th></tr>
          </thead>
          <tbody>
            {[
              ['GitHub stars', '~70K+', '~48K+'],
              ['npm weekly downloads', '~8M+', '~5M+'],
              ['First release', '2020', '2017'],
              ['Backed by', 'Microsoft', 'Cypress.io (venture-backed)'],
              ['Stack Overflow', '~25K+ questions', '~35K+ questions'],
              ['Plugin ecosystem', 'Growing (fewer needed)', 'Mature (large registry)'],
            ].map(([m, pw, cy], i) => (
              <tr key={i}><td style={td}>{m}</td><td style={td}>{pw}</td><td style={td}>{cy}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Choose */}
      <h2 style={h2s}>{t.h2WhenChoose}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#4ade80' }}>Choose Playwright When:</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
            {t.pwUseCases.split('|').map((item, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#60a5fa' }}>Choose Cypress When:</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
            {t.cyUseCases.split('|').map((item, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>)}
          </ul>
        </div>
      </div>

      {/* Migration */}
      <h2 style={h2s}>{t.h2Migration}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.migrationDesc}</p>
      <pre style={pre}><code>{
        '// Cypress → Playwright cheat sheet\n' +
        'cy.visit(\'/page\')             →  await page.goto(\'/page\')\n' +
        'cy.get(\'[data-cy="x"]\')       →  page.getByTestId(\'x\')\n' +
        'cy.contains(\'Submit\')          →  page.getByText(\'Submit\')\n' +
        'cy.get(\'input\').type(\'hi\')     →  await locator.fill(\'hi\')\n' +
        '.should(\'be.visible\')          →  await expect(loc).toBeVisible()\n' +
        '.should(\'have.text\', \'X\')      →  await expect(loc).toHaveText(\'X\')\n' +
        'cy.intercept(method, url)       →  await page.route(url, handler)\n' +
        'cy.wait(\'@alias\')              →  await page.waitForResponse(url)\n' +
        'beforeEach(() => {...})          →  test.beforeEach(async ({page}) => {...})\n\n' +
        '// Playwright → Cypress: reverse the above, remove async/await\n' +
        '// Cypress commands are automatically queued'
      }</code></pre>

      {/* Best Practices */}
      <h2 style={h2s}>{t.h2BP}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem' }}>Playwright</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem' }}>
            {t.pwBP.split('|').map((item, i) => <li key={i} style={{ marginBottom: '0.25rem', lineHeight: '1.5' }}>{item}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem' }}>Cypress</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem' }}>
            {t.cyBP.split('|').map((item, i) => <li key={i} style={{ marginBottom: '0.25rem', lineHeight: '1.5' }}>{item}</li>)}
          </ul>
        </div>
      </div>

      {/* Real-World CI */}
      <h2 style={h2s}>{t.h2RealCI}</h2>
      <h3 style={h3s}>Playwright: Sharded Multi-Browser CI</h3>
      <pre style={pre}><code>{
        'name: Playwright E2E\n' +
        'on: { push: { branches: [main] }, pull_request: { branches: [main] } }\n' +
        'jobs:\n' +
        '  test:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    strategy:\n' +
        '      matrix: { shard: [1/4, 2/4, 3/4, 4/4] }\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - uses: actions/setup-node@v4\n' +
        '        with: { node-version: 20, cache: npm }\n' +
        '      - run: npm ci && npx playwright install --with-deps\n' +
        '      - run: npx playwright test --shard=\\${{ matrix.shard }}\n' +
        '      - uses: actions/upload-artifact@v4\n' +
        '        if: always()\n' +
        '        with: { name: report-\\${{ strategy.job-index }}, path: playwright-report/, retention-days: 7 }'
      }</code></pre>
      <h3 style={h3s}>Cypress: Parallel CI with Cloud</h3>
      <pre style={pre}><code>{
        'name: Cypress E2E\n' +
        'on: { push: { branches: [main] }, pull_request: { branches: [main] } }\n' +
        'jobs:\n' +
        '  test:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    strategy:\n' +
        '      matrix: { containers: [1, 2, 3, 4] }\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - uses: cypress-io/github-action@v6\n' +
        '        with:\n' +
        '          build: npm run build\n' +
        '          start: npm start\n' +
        '          wait-on: http://localhost:3000\n' +
        '          record: true\n' +
        '          parallel: true\n' +
        '          group: e2e-tests\n' +
        '        env:\n' +
        '          CYPRESS_RECORD_KEY: \\${{ secrets.CYPRESS_RECORD_KEY }}\n' +
        '      - uses: actions/upload-artifact@v4\n' +
        '        if: failure()\n' +
        '        with: { name: cypress-artifacts, path: cypress/screenshots/ }'
      }</code></pre>

      {/* FAQ */}
      <h2 style={h2s}>{t.h2Faq}</h2>
      {[[t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A]].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
          <p style={{ marginBottom: '0.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>{a}</p>
        </div>
      ))}
    </article>
  );
}
