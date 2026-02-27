'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Cypress E2E Testing Guide 2026: Setup, Commands, Intercepts, and CI Integration',
    intro: 'Cypress is a powerful end-to-end testing framework built for the modern web. Unlike traditional testing tools that run outside the browser, Cypress executes directly inside the browser alongside your application, giving it native access to the DOM, network requests, and every JavaScript object. This architecture eliminates the flakiness caused by network latency between a test runner and a browser driver. This guide covers everything you need to write reliable, maintainable Cypress tests from initial setup through CI deployment.',
    tldr: 'Cypress runs inside the browser for fast, flake-free E2E tests. Install with npm install cypress, write tests using cy.visit/cy.get/cy.contains, mock API responses with cy.intercept, use fixtures for test data, add custom commands for reusable logic, leverage component testing for isolated UI validation, and integrate into CI with cypress run. Cypress provides automatic waiting, time-travel debugging, real-time reload, and built-in screenshot/video capture on failure.',
    keyTakeaway1: 'Cypress runs directly in the browser, eliminating the WebDriver layer and providing native DOM access with automatic waiting.',
    keyTakeaway2: 'Use data-cy attributes for selectors instead of CSS classes or IDs to create tests that are resilient to UI changes.',
    keyTakeaway3: 'cy.intercept() lets you stub, spy on, and modify network requests to test edge cases without a running backend.',
    keyTakeaway4: 'Fixtures (cypress/fixtures/) externalize test data into JSON files, keeping tests clean and data reusable across specs.',
    keyTakeaway5: 'Custom commands (Cypress.Commands.add) encapsulate common workflows like login, reducing duplication across test files.',
    keyTakeaway6: 'Cypress Component Testing validates UI components in isolation with real browser rendering, complementing E2E tests.',

    h2WhyIs: 'Why Cypress for E2E Testing?',
    whyIsDesc: 'Cypress was designed from the ground up for end-to-end testing of web applications. It operates within the same run loop as your application, which means it has synchronous access to everything happening in the browser. There is no network hop between the test runner and the browser, no WebDriver protocol overhead, and no external process orchestrating commands. The test code and the application code share the same JavaScript execution context.',
    whyIsDesc2: 'This architecture provides several practical advantages: automatic waiting for DOM elements, network requests, and animations without explicit waits or sleeps; time-travel debugging where you can hover over each command to see the application state at that exact moment; real-time reloading that re-runs tests instantly when you save a file; and consistent, deterministic test execution that eliminates the flaky tests plaguing Selenium-based setups.',

    h2Comparison: 'Cypress vs Playwright vs Selenium',
    compDesc: 'Understanding how Cypress compares to other popular testing frameworks helps you make an informed choice for your project.',
    compCol1: 'Feature',
    compCol2: 'Cypress',
    compCol3: 'Playwright',
    compCol4: 'Selenium',
    compR1: 'Architecture',
    compR1V2: 'In-browser',
    compR1V3: 'CDP/WebSocket',
    compR1V4: 'WebDriver protocol',
    compR2: 'Browsers',
    compR2V2: 'Chrome, Firefox, Edge, WebKit',
    compR2V3: 'Chromium, Firefox, WebKit',
    compR2V4: 'All major browsers',
    compR3: 'Language',
    compR3V2: 'JavaScript/TypeScript',
    compR3V3: 'JS/TS, Python, Java, C#',
    compR3V4: 'Many languages',
    compR4: 'Auto-waiting',
    compR4V2: 'Built-in (all commands)',
    compR4V3: 'Built-in (all actions)',
    compR4V4: 'Manual waits required',
    compR5: 'Network mocking',
    compR5V2: 'cy.intercept (built-in)',
    compR5V3: 'page.route (built-in)',
    compR5V4: 'External tools needed',
    compR6: 'Time-travel debug',
    compR6V2: 'Yes (GUI snapshots)',
    compR6V3: 'Trace viewer',
    compR6V4: 'No',
    compR7: 'Multi-tab support',
    compR7V2: 'Limited (workarounds)',
    compR7V3: 'Full support',
    compR7V4: 'Full support',
    compR8: 'Component testing',
    compR8V2: 'Built-in',
    compR8V3: 'Experimental',
    compR8V4: 'No',
    compR9: 'Parallel execution',
    compR9V2: 'Cypress Cloud (paid)',
    compR9V3: 'Built-in (free)',
    compR9V4: 'Selenium Grid',
    compSummary: 'Cypress excels at developer experience, debugging, and component testing. Playwright wins on multi-browser support, multi-tab scenarios, and free parallelism. Choose Cypress when developer experience and debugging speed are priorities; choose Playwright when you need cross-browser coverage or multi-tab workflows.',

    h2Setup: 'Installation and Project Setup',
    setupDesc: 'Cypress is installed as a dev dependency and ships with its own bundled Electron browser for instant setup. It can also run tests against Chrome, Firefox, Edge, and WebKit (experimental).',

    h2Config: 'Configuration',
    configDesc: 'The cypress.config.ts file (or .js) is the central configuration point. It controls timeouts, viewport size, base URL, environment variables, and plugin setup.',

    h2WritingTests: 'Writing Your First Test',
    writingTestsDesc: 'Cypress test files live in the cypress/e2e directory and use the .cy.ts or .cy.js extension. Tests follow the familiar Mocha-style describe/it structure. Every command in Cypress is asynchronous but uses a chainable API that reads synchronously.',

    h2Selectors: 'Selectors and Best Practices',
    selectorsDesc: 'Reliable selectors are the foundation of maintainable tests. CSS classes and IDs change frequently during refactoring, breaking tests unnecessarily. Cypress recommends using dedicated data attributes.',
    selectorsBest: 'The selector priority from most to least resilient:',
    sel1: 'data-cy, data-testid, or data-test attributes (best: purpose-built for testing)',
    sel2: 'Accessible roles and labels via cy.contains() or cy.findByRole()',
    sel3: 'HTML element tags with specific attributes',
    sel4: 'CSS class names or IDs (least resilient: change with design updates)',

    h2Commands: 'Essential Cypress Commands',
    commandsDesc: 'Cypress provides a rich set of built-in commands for interacting with your application. Every command automatically retries until the assertion passes or the timeout expires.',

    h2CustomCommands: 'Custom Commands',
    customCommandsDesc: 'Custom commands let you encapsulate repeatable workflows into reusable functions. They are defined in cypress/support/commands.ts and become available as cy.yourCommand() in every test file.',

    h2Fixtures: 'Fixtures and Test Data',
    fixturesDesc: 'Fixtures are external data files (usually JSON) stored in the cypress/fixtures directory. They keep test data separate from test logic, making tests cleaner and data reusable across multiple spec files.',

    h2Intercepts: 'Network Interception with cy.intercept()',
    interceptsDesc: 'cy.intercept() is one of Cypress\'s most powerful features. It lets you stub API responses, spy on network traffic, and simulate error conditions without needing a running backend server. This makes tests faster, more reliable, and capable of testing edge cases that are difficult to reproduce with a real API.',

    h2ComponentTesting: 'Component Testing',
    componentTestingDesc: 'Cypress Component Testing lets you mount and test individual UI components in isolation, using a real browser instead of a simulated DOM like jsdom. This catches rendering issues, CSS problems, and interaction bugs that unit tests miss. Component tests run much faster than E2E tests because they do not require a full application server.',

    h2CI: 'CI/CD Integration',
    ciDesc: 'Running Cypress in CI requires a headless browser and proper caching configuration. Cypress provides official Docker images and GitHub Actions for seamless CI integration.',

    h2BestPractices: 'Best Practices',
    bestPracticesDesc: 'Follow these practices to write tests that are reliable, fast, and maintainable as your application grows.',
    bp1: 'Use data-cy attributes for all selectors. Never rely on CSS classes, element structure, or generated IDs that may change.',
    bp2: 'Keep tests independent. Each test should set up its own state using cy.intercept(), cy.session(), or API calls. Never depend on the order of tests.',
    bp3: 'Avoid cy.wait() with fixed milliseconds. Use cy.intercept() aliasing and cy.wait("@alias") to wait for specific network responses.',
    bp4: 'Use beforeEach for common setup. Login flows, page navigation, and data seeding should happen in beforeEach, not repeated in each test.',
    bp5: 'Write small, focused tests. Each it() block should test one specific behavior. Avoid multi-step mega-tests that are hard to debug.',
    bp6: 'Use cy.session() for authentication. It caches session data across tests, eliminating the need to log in before every spec file.',
    bp7: 'Organize fixtures by feature. Use directories like cypress/fixtures/users/, cypress/fixtures/products/ to keep test data manageable.',
    bp8: 'Run tests in CI with video disabled unless debugging. Videos slow down CI runs and consume storage. Enable them only when investigating failures.',
    bp9: 'Retry failed tests in CI. Use retries: { runMode: 2 } to handle transient CI environment issues without masking real bugs.',
    bp10: 'Use TypeScript for tests. Type inference on cy commands, custom commands, and fixtures catches errors before tests run.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'How does Cypress differ from Selenium?',
    faq1A: 'Cypress runs inside the browser in the same execution loop as your application, while Selenium sends commands to the browser over the WebDriver protocol from an external process. This means Cypress has native access to the DOM, network layer, and JavaScript context. It automatically waits for elements, does not require explicit waits or sleep statements, and provides time-travel debugging. Selenium supports more languages and browsers but requires more setup and is more prone to flaky tests.',
    faq2Q: 'Can Cypress test applications that require login?',
    faq2A: 'Yes. Cypress provides cy.session() which caches authentication state across tests. You can log in once programmatically (via API calls or UI interaction), and Cypress will restore the session for subsequent tests. This is much faster than logging in through the UI before every test. You can also use cy.intercept() to mock authentication responses for specific test scenarios.',
    faq3Q: 'Does Cypress support multiple browsers?',
    faq3A: 'Cypress supports Chrome, Chromium, Edge, Firefox, and WebKit (experimental). You can specify the browser with --browser chrome or --browser firefox when running tests. In CI, you can run tests in parallel across multiple browsers. Note that WebKit support is experimental and may not cover all test scenarios. Electron (a Chromium variant) is the default browser and requires no additional setup.',
    faq4Q: 'How do I handle flaky tests in Cypress?',
    faq4A: 'First, identify the root cause. Common causes are: race conditions with network requests (fix with cy.intercept and aliases), animation interference (set waitForAnimations: true in config), and shared state between tests (fix by making each test independent). Use the retries configuration for CI environments. Enable video recording and screenshots on failure to diagnose issues. The Cypress Dashboard (Cloud) provides analytics to identify consistently flaky tests.',
    faq5Q: 'Can Cypress test API endpoints directly?',
    faq5A: 'Yes. cy.request() makes HTTP requests directly without going through the browser UI. This is useful for API testing, setting up test data, and authenticating before UI tests. Unlike cy.visit(), cy.request() does not render a page. It returns the response body, headers, and status code for assertions. You can chain multiple cy.request() calls to test complete API workflows.',
    faq6Q: 'How do I test file uploads with Cypress?',
    faq6A: 'Use the cypress-file-upload plugin or the native selectFile command (Cypress 9.3+). The selectFile command works with standard file input elements: cy.get("input[type=file]").selectFile("path/to/file.pdf"). For drag-and-drop uploads, use .selectFile("file.pdf", { action: "drag-drop" }). You can also create files programmatically using cy.fixture() to load test files from the fixtures directory.',
    faq7Q: 'What is the difference between cy.intercept() and cy.request()?',
    faq7A: 'cy.intercept() intercepts network requests that the browser makes naturally during page interaction. It can stub responses, delay requests, or spy on traffic. cy.request() makes HTTP requests directly from the test code, bypassing the browser entirely. Use cy.intercept() when testing how your UI handles different API responses. Use cy.request() for setting up test data, authenticating, or testing APIs without a UI.',
    faq8Q: 'How do I integrate Cypress with TypeScript?',
    faq8A: 'Cypress has built-in TypeScript support since version 10. Create a tsconfig.json in your cypress directory with the appropriate compiler options. Install @types/cypress if needed. For custom commands, extend the Cypress namespace in a global.d.ts file to get type inference. All spec files can use .cy.ts extension. The cypress.config.ts file itself can be written in TypeScript without additional configuration.',
  },
  zh: {
    title: 'Cypress E2E 测试指南 2026：安装配置、命令、拦截与 CI 集成',
    intro: 'Cypress 是为现代 Web 构建的强大端到端测试框架。与在浏览器外运行的传统测试工具不同，Cypress 直接在浏览器内与应用一起执行，原生访问 DOM、网络请求和所有 JavaScript 对象。这种架构消除了测试运行器和浏览器驱动之间网络延迟导致的不稳定性。本指南涵盖从初始设置到 CI 部署所需的一切。',
    tldr: 'Cypress 在浏览器中运行，实现快速、无抖动的 E2E 测试。使用 npm install cypress 安装，使用 cy.visit/cy.get/cy.contains 编写测试，使用 cy.intercept 模拟 API 响应，使用 fixtures 管理测试数据，通过自定义命令封装可复用逻辑，利用组件测试进行隔离 UI 验证，并通过 cypress run 集成到 CI 中。',
    keyTakeaway1: 'Cypress 直接在浏览器中运行，消除了 WebDriver 层，提供原生 DOM 访问和自动等待。',
    keyTakeaway2: '使用 data-cy 属性作为选择器，而非 CSS 类或 ID，以创建对 UI 变更有弹性的测试。',
    keyTakeaway3: 'cy.intercept() 允许存根、监听和修改网络请求，无需运行后端即可测试边界情况。',
    keyTakeaway4: 'Fixtures（cypress/fixtures/）将测试数据外部化为 JSON 文件，保持测试整洁且数据可跨规格复用。',
    keyTakeaway5: '自定义命令（Cypress.Commands.add）封装常见工作流如登录，减少测试文件间的重复。',
    keyTakeaway6: 'Cypress 组件测试在真实浏览器中隔离验证 UI 组件，补充 E2E 测试。',

    h2WhyIs: '为什么选择 Cypress 进行 E2E 测试？',
    whyIsDesc: 'Cypress 从零开始为 Web 应用的端到端测试而设计。它在与应用相同的运行循环中运行，可以同步访问浏览器中发生的一切。没有测试运行器和浏览器之间的网络跳转，没有 WebDriver 协议开销，也没有外部进程编排命令。',
    whyIsDesc2: '这种架构提供了多项优势：自动等待 DOM 元素、网络请求和动画；时间旅行调试可查看每个命令的应用状态；保存文件后实时重载；以及一致的确定性测试执行。',

    h2Comparison: 'Cypress vs Playwright vs Selenium',
    compDesc: '了解 Cypress 与其他流行测试框架的比较，帮助你做出明智的选择。',
    compCol1: '特性',
    compCol2: 'Cypress',
    compCol3: 'Playwright',
    compCol4: 'Selenium',
    compR1: '架构',
    compR1V2: '浏览器内运行',
    compR1V3: 'CDP/WebSocket',
    compR1V4: 'WebDriver 协议',
    compR2: '浏览器',
    compR2V2: 'Chrome, Firefox, Edge, WebKit',
    compR2V3: 'Chromium, Firefox, WebKit',
    compR2V4: '所有主流浏览器',
    compR3: '语言',
    compR3V2: 'JavaScript/TypeScript',
    compR3V3: 'JS/TS, Python, Java, C#',
    compR3V4: '多种语言',
    compR4: '自动等待',
    compR4V2: '内置（所有命令）',
    compR4V3: '内置（所有操作）',
    compR4V4: '需要手动等待',
    compR5: '网络模拟',
    compR5V2: 'cy.intercept（内置）',
    compR5V3: 'page.route（内置）',
    compR5V4: '需要外部工具',
    compR6: '时间旅行调试',
    compR6V2: '是（GUI 快照）',
    compR6V3: 'Trace viewer',
    compR6V4: '否',
    compR7: '多标签页支持',
    compR7V2: '有限（需变通）',
    compR7V3: '完全支持',
    compR7V4: '完全支持',
    compR8: '组件测试',
    compR8V2: '内置',
    compR8V3: '实验性',
    compR8V4: '否',
    compR9: '并行执行',
    compR9V2: 'Cypress Cloud（付费）',
    compR9V3: '内置（免费）',
    compR9V4: 'Selenium Grid',
    compSummary: 'Cypress 在开发者体验、调试和组件测试方面表现出色。Playwright 在多浏览器支持、多标签页场景和免费并行方面领先。当开发者体验和调试速度是优先时选择 Cypress；当需要跨浏览器覆盖时选择 Playwright。',

    h2Setup: '安装和项目配置',
    setupDesc: 'Cypress 作为开发依赖安装，自带 Electron 浏览器，可即时启动。也可以在 Chrome、Firefox、Edge 和 WebKit（实验性）上运行测试。',

    h2Config: '配置',
    configDesc: 'cypress.config.ts 文件是核心配置点，控制超时、视口大小、基础 URL、环境变量和插件设置。',

    h2WritingTests: '编写第一个测试',
    writingTestsDesc: 'Cypress 测试文件位于 cypress/e2e 目录，使用 .cy.ts 或 .cy.js 扩展名。测试遵循熟悉的 Mocha 风格 describe/it 结构。每个 Cypress 命令都是异步的，但使用可链式调用的 API。',

    h2Selectors: '选择器和最佳实践',
    selectorsDesc: '可靠的选择器是可维护测试的基础。CSS 类和 ID 在重构时经常变化，导致测试不必要地失败。Cypress 推荐使用专用的 data 属性。',
    selectorsBest: '选择器优先级从最稳定到最不稳定：',
    sel1: 'data-cy、data-testid 或 data-test 属性（最佳：专为测试构建）',
    sel2: '通过 cy.contains() 或 cy.findByRole() 使用可访问角色和标签',
    sel3: '带特定属性的 HTML 元素标签',
    sel4: 'CSS 类名或 ID（最不稳定：随设计更新而变化）',

    h2Commands: '核心 Cypress 命令',
    commandsDesc: 'Cypress 提供丰富的内置命令与应用交互。每个命令自动重试直到断言通过或超时。',

    h2CustomCommands: '自定义命令',
    customCommandsDesc: '自定义命令将可重复的工作流封装为可复用函数。在 cypress/support/commands.ts 中定义，可在每个测试文件中使用 cy.yourCommand()。',

    h2Fixtures: 'Fixtures 和测试数据',
    fixturesDesc: 'Fixtures 是存储在 cypress/fixtures 目录中的外部数据文件（通常是 JSON）。它们将测试数据与测试逻辑分离，使测试更整洁，数据可跨多个规格文件复用。',

    h2Intercepts: '使用 cy.intercept() 进行网络拦截',
    interceptsDesc: 'cy.intercept() 是 Cypress 最强大的功能之一。它可以存根 API 响应、监听网络流量和模拟错误条件，无需运行后端服务器。这使测试更快、更可靠，能够测试真实 API 难以重现的边界情况。',

    h2ComponentTesting: '组件测试',
    componentTestingDesc: 'Cypress 组件测试让你在隔离环境中挂载和测试单个 UI 组件，使用真实浏览器而非 jsdom 模拟 DOM。这能捕获单元测试遗漏的渲染问题、CSS 问题和交互 Bug。组件测试比 E2E 测试快得多。',

    h2CI: 'CI/CD 集成',
    ciDesc: '在 CI 中运行 Cypress 需要无头浏览器和适当的缓存配置。Cypress 提供官方 Docker 镜像和 GitHub Actions。',

    h2BestPractices: '最佳实践',
    bestPracticesDesc: '遵循这些实践来编写随应用增长仍然可靠、快速和可维护的测试。',
    bp1: '所有选择器使用 data-cy 属性。绝不依赖可能变化的 CSS 类、元素结构或生成的 ID。',
    bp2: '保持测试独立。每个测试应使用 cy.intercept()、cy.session() 或 API 调用设置自己的状态。',
    bp3: '避免使用固定毫秒数的 cy.wait()。使用 cy.intercept() 别名和 cy.wait("@alias") 等待特定网络响应。',
    bp4: '使用 beforeEach 进行通用设置。登录流程、页面导航和数据预置应在 beforeEach 中，而非在每个测试中重复。',
    bp5: '编写小而专注的测试。每个 it() 块应测试一个特定行为。避免难以调试的多步骤大型测试。',
    bp6: '使用 cy.session() 进行身份验证。它跨测试缓存会话数据，无需在每个规格文件前登录。',
    bp7: '按功能组织 fixtures。使用目录如 cypress/fixtures/users/、cypress/fixtures/products/ 来管理测试数据。',
    bp8: '在 CI 中禁用视频录制除非调试。视频会减慢 CI 运行并消耗存储。仅在调查失败时启用。',
    bp9: '在 CI 中重试失败的测试。使用 retries: { runMode: 2 } 处理临时 CI 环境问题。',
    bp10: '使用 TypeScript 编写测试。对 cy 命令、自定义命令和 fixtures 的类型推断可在测试运行前捕获错误。',

    h2Faq: '常见问题',
    faq1Q: 'Cypress 和 Selenium 有什么区别？',
    faq1A: 'Cypress 在浏览器内与应用在同一执行循环中运行，而 Selenium 从外部进程通过 WebDriver 协议发送命令。Cypress 原生访问 DOM、网络层和 JavaScript 上下文，自动等待元素，提供时间旅行调试。Selenium 支持更多语言和浏览器，但需要更多设置且更容易产生不稳定测试。',
    faq2Q: 'Cypress 能测试需要登录的应用吗？',
    faq2A: '可以。Cypress 提供 cy.session() 跨测试缓存认证状态。你可以通过 API 调用或 UI 交互登录一次，Cypress 会为后续测试恢复会话。也可以使用 cy.intercept() 模拟认证响应。',
    faq3Q: 'Cypress 支持多种浏览器吗？',
    faq3A: 'Cypress 支持 Chrome、Chromium、Edge、Firefox 和 WebKit（实验性）。可以在运行测试时使用 --browser 参数指定浏览器。Electron 是默认浏览器，无需额外设置。',
    faq4Q: '如何处理 Cypress 中的不稳定测试？',
    faq4A: '首先找到根本原因。常见原因包括：网络请求竞态条件（用 cy.intercept 和别名解决）、动画干扰（在配置中设置 waitForAnimations: true）和测试间共享状态（让每个测试独立）。在 CI 环境中使用 retries 配置。',
    faq5Q: 'Cypress 能直接测试 API 端点吗？',
    faq5A: '可以。cy.request() 直接发送 HTTP 请求而不经过浏览器 UI。这对 API 测试、设置测试数据和 UI 测试前认证很有用。它返回响应体、头部和状态码供断言使用。',
    faq6Q: '如何用 Cypress 测试文件上传？',
    faq6A: '使用 selectFile 命令（Cypress 9.3+）：cy.get("input[type=file]").selectFile("path/to/file.pdf")。对于拖放上传，使用 { action: "drag-drop" } 选项。也可以用 cy.fixture() 从 fixtures 目录加载测试文件。',
    faq7Q: 'cy.intercept() 和 cy.request() 有什么区别？',
    faq7A: 'cy.intercept() 拦截浏览器在页面交互时自然发出的网络请求，可以存根响应或监听流量。cy.request() 从测试代码直接发送 HTTP 请求，绕过浏览器。测试 UI 如何处理不同 API 响应时用 cy.intercept()，设置测试数据或测试 API 时用 cy.request()。',
    faq8Q: '如何将 Cypress 与 TypeScript 集成？',
    faq8A: 'Cypress 从版本 10 起内置 TypeScript 支持。在 cypress 目录创建 tsconfig.json。对于自定义命令，在 global.d.ts 文件中扩展 Cypress 命名空间以获得类型推断。所有规格文件可使用 .cy.ts 扩展名。cypress.config.ts 本身也可以用 TypeScript 编写。',
  },
};

export default function CypressGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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

  const sectionTitle: React.CSSProperties = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const subTitle: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const para: React.CSSProperties = { marginBottom: '1rem', lineHeight: '1.7' };
  const codeBlock: React.CSSProperties = { backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem', color: '#e5e7eb' };
  const listItem: React.CSSProperties = { marginBottom: '0.5rem', lineHeight: '1.6' };
  const cellStyle: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0', textAlign: 'left' };
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, background: '#f1f5f9' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong style={{ fontSize: '1.1rem' }}>TL;DR</strong>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <strong style={{ fontSize: '1.1rem' }}>Key Takeaways</strong>
        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
          <li style={listItem}>{t.keyTakeaway1}</li>
          <li style={listItem}>{t.keyTakeaway2}</li>
          <li style={listItem}>{t.keyTakeaway3}</li>
          <li style={listItem}>{t.keyTakeaway4}</li>
          <li style={listItem}>{t.keyTakeaway5}</li>
          <li style={listItem}>{t.keyTakeaway6}</li>
        </ul>
      </div>

      {/* Why Cypress */}
      <h2 style={sectionTitle}>{t.h2WhyIs}</h2>
      <p style={para}>{t.whyIsDesc}</p>
      <p style={para}>{t.whyIsDesc2}</p>

      {/* Comparison Table */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.compDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={headerCell}>{t.compCol1}</th>
              <th style={headerCell}>{t.compCol2}</th>
              <th style={headerCell}>{t.compCol3}</th>
              <th style={headerCell}>{t.compCol4}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={cellStyle}>{t.compR1}</td><td style={cellStyle}>{t.compR1V2}</td><td style={cellStyle}>{t.compR1V3}</td><td style={cellStyle}>{t.compR1V4}</td></tr>
            <tr><td style={cellStyle}>{t.compR2}</td><td style={cellStyle}>{t.compR2V2}</td><td style={cellStyle}>{t.compR2V3}</td><td style={cellStyle}>{t.compR2V4}</td></tr>
            <tr><td style={cellStyle}>{t.compR3}</td><td style={cellStyle}>{t.compR3V2}</td><td style={cellStyle}>{t.compR3V3}</td><td style={cellStyle}>{t.compR3V4}</td></tr>
            <tr><td style={cellStyle}>{t.compR4}</td><td style={cellStyle}>{t.compR4V2}</td><td style={cellStyle}>{t.compR4V3}</td><td style={cellStyle}>{t.compR4V4}</td></tr>
            <tr><td style={cellStyle}>{t.compR5}</td><td style={cellStyle}>{t.compR5V2}</td><td style={cellStyle}>{t.compR5V3}</td><td style={cellStyle}>{t.compR5V4}</td></tr>
            <tr><td style={cellStyle}>{t.compR6}</td><td style={cellStyle}>{t.compR6V2}</td><td style={cellStyle}>{t.compR6V3}</td><td style={cellStyle}>{t.compR6V4}</td></tr>
            <tr><td style={cellStyle}>{t.compR7}</td><td style={cellStyle}>{t.compR7V2}</td><td style={cellStyle}>{t.compR7V3}</td><td style={cellStyle}>{t.compR7V4}</td></tr>
            <tr><td style={cellStyle}>{t.compR8}</td><td style={cellStyle}>{t.compR8V2}</td><td style={cellStyle}>{t.compR8V3}</td><td style={cellStyle}>{t.compR8V4}</td></tr>
            <tr><td style={cellStyle}>{t.compR9}</td><td style={cellStyle}>{t.compR9V2}</td><td style={cellStyle}>{t.compR9V3}</td><td style={cellStyle}>{t.compR9V4}</td></tr>
          </tbody>
        </table>
      </div>
      <p style={para}>{t.compSummary}</p>

      {/* Installation and Setup */}
      <h2 style={sectionTitle}>{t.h2Setup}</h2>
      <p style={para}>{t.setupDesc}</p>
      <pre style={codeBlock}><code>{'# Install Cypress\n'
        + 'npm install --save-dev cypress\n'
        + '\n'
        + '# Open Cypress interactive runner\n'
        + 'npx cypress open\n'
        + '\n'
        + '# Run tests headlessly (CI mode)\n'
        + 'npx cypress run\n'
        + '\n'
        + '# Run with specific browser\n'
        + 'npx cypress run --browser chrome\n'
        + 'npx cypress run --browser firefox\n'
        + '\n'
        + '# Run a single spec file\n'
        + 'npx cypress run --spec "cypress/e2e/login.cy.ts"\n'
        + '\n'
        + '# Project structure after first open:\n'
        + '# cypress/\n'
        + '#   e2e/           — test spec files\n'
        + '#   fixtures/      — test data (JSON)\n'
        + '#   support/\n'
        + '#     commands.ts  — custom commands\n'
        + '#     e2e.ts       — global hooks/setup\n'
        + '# cypress.config.ts — configuration'}</code></pre>

      {/* Configuration */}
      <h2 style={sectionTitle}>{t.h2Config}</h2>
      <p style={para}>{t.configDesc}</p>
      <pre style={codeBlock}><code>{'import { defineConfig } from "cypress";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  e2e: {\n'
        + '    baseUrl: "http://localhost:3000",\n'
        + '    specPattern: "cypress/e2e/**/*.cy.{ts,js}",\n'
        + '    supportFile: "cypress/support/e2e.ts",\n'
        + '\n'
        + '    // Timeouts\n'
        + '    defaultCommandTimeout: 10000,\n'
        + '    requestTimeout: 15000,\n'
        + '    responseTimeout: 30000,\n'
        + '    pageLoadTimeout: 60000,\n'
        + '\n'
        + '    // Viewport\n'
        + '    viewportWidth: 1280,\n'
        + '    viewportHeight: 720,\n'
        + '\n'
        + '    // Retry configuration\n'
        + '    retries: {\n'
        + '      runMode: 2,    // CI retries\n'
        + '      openMode: 0,   // No retries in interactive mode\n'
        + '    },\n'
        + '\n'
        + '    // Screenshots and videos\n'
        + '    screenshotOnRunFailure: true,\n'
        + '    video: false,           // Disable in CI for speed\n'
        + '    screenshotsFolder: "cypress/screenshots",\n'
        + '    videosFolder: "cypress/videos",\n'
        + '\n'
        + '    // Environment variables\n'
        + '    env: {\n'
        + '      apiUrl: "http://localhost:4000/api",\n'
        + '      coverage: false,\n'
        + '    },\n'
        + '\n'
        + '    setupNodeEvents(on, config) {\n'
        + '      // Register plugins here\n'
        + '      // on("task", { ... })\n'
        + '      return config;\n'
        + '    },\n'
        + '  },\n'
        + '\n'
        + '  component: {\n'
        + '    devServer: {\n'
        + '      framework: "react",\n'
        + '      bundler: "vite",       // or "webpack"\n'
        + '    },\n'
        + '    specPattern: "src/**/*.cy.{ts,tsx}",\n'
        + '  },\n'
        + '});'}</code></pre>

      {/* Writing Tests */}
      <h2 style={sectionTitle}>{t.h2WritingTests}</h2>
      <p style={para}>{t.writingTestsDesc}</p>
      <pre style={codeBlock}><code>{'// cypress/e2e/homepage.cy.ts\n'
        + 'describe("Homepage", () => {\n'
        + '  beforeEach(() => {\n'
        + '    cy.visit("/");\n'
        + '  });\n'
        + '\n'
        + '  it("displays the hero section", () => {\n'
        + '    cy.get("[data-cy=hero-title]")\n'
        + '      .should("be.visible")\n'
        + '      .and("contain", "Welcome");\n'
        + '\n'
        + '    cy.get("[data-cy=hero-subtitle]")\n'
        + '      .should("exist");\n'
        + '  });\n'
        + '\n'
        + '  it("navigates to the about page", () => {\n'
        + '    cy.get("[data-cy=nav-about]").click();\n'
        + '    cy.url().should("include", "/about");\n'
        + '    cy.get("h1").should("contain", "About Us");\n'
        + '  });\n'
        + '\n'
        + '  it("submits the contact form", () => {\n'
        + '    cy.get("[data-cy=contact-name]").type("Jane Doe");\n'
        + '    cy.get("[data-cy=contact-email]").type("jane@example.com");\n'
        + '    cy.get("[data-cy=contact-message]").type("Hello!");\n'
        + '    cy.get("[data-cy=contact-submit]").click();\n'
        + '\n'
        + '    cy.get("[data-cy=success-message]")\n'
        + '      .should("be.visible")\n'
        + '      .and("contain", "Thank you");\n'
        + '  });\n'
        + '\n'
        + '  it("loads products from the API", () => {\n'
        + '    cy.get("[data-cy=product-card]")\n'
        + '      .should("have.length.greaterThan", 0);\n'
        + '\n'
        + '    cy.get("[data-cy=product-card]")\n'
        + '      .first()\n'
        + '      .find("[data-cy=product-name]")\n'
        + '      .should("not.be.empty");\n'
        + '  });\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>Login Test Example</h3>
      <pre style={codeBlock}><code>{'// cypress/e2e/auth/login.cy.ts\n'
        + 'describe("Authentication", () => {\n'
        + '  beforeEach(() => {\n'
        + '    cy.visit("/login");\n'
        + '  });\n'
        + '\n'
        + '  it("logs in with valid credentials", () => {\n'
        + '    cy.get("[data-cy=email-input]").type("user@example.com");\n'
        + '    cy.get("[data-cy=password-input]").type("securePass123");\n'
        + '    cy.get("[data-cy=login-button]").click();\n'
        + '\n'
        + '    // Should redirect to dashboard\n'
        + '    cy.url().should("include", "/dashboard");\n'
        + '    cy.get("[data-cy=welcome-message]")\n'
        + '      .should("contain", "Welcome back");\n'
        + '  });\n'
        + '\n'
        + '  it("shows error for invalid credentials", () => {\n'
        + '    cy.get("[data-cy=email-input]").type("user@example.com");\n'
        + '    cy.get("[data-cy=password-input]").type("wrongPassword");\n'
        + '    cy.get("[data-cy=login-button]").click();\n'
        + '\n'
        + '    cy.get("[data-cy=error-message]")\n'
        + '      .should("be.visible")\n'
        + '      .and("contain", "Invalid credentials");\n'
        + '    cy.url().should("include", "/login");\n'
        + '  });\n'
        + '\n'
        + '  it("validates required fields", () => {\n'
        + '    cy.get("[data-cy=login-button]").click();\n'
        + '    cy.get("[data-cy=email-error]")\n'
        + '      .should("contain", "Email is required");\n'
        + '    cy.get("[data-cy=password-error]")\n'
        + '      .should("contain", "Password is required");\n'
        + '  });\n'
        + '});'}</code></pre>

      {/* Selectors */}
      <h2 style={sectionTitle}>{t.h2Selectors}</h2>
      <p style={para}>{t.selectorsDesc}</p>
      <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>{t.selectorsBest}</p>
      <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.sel1}</li>
        <li style={listItem}>{t.sel2}</li>
        <li style={listItem}>{t.sel3}</li>
        <li style={listItem}>{t.sel4}</li>
      </ol>
      <pre style={codeBlock}><code>{'// BAD: fragile selectors\n'
        + 'cy.get(".btn-primary");           // CSS class changes\n'
        + 'cy.get("#submit");                // ID may be generated\n'
        + 'cy.get("div > form > button");    // DOM structure changes\n'
        + 'cy.get(":nth-child(3)");          // Position changes\n'
        + '\n'
        + '// GOOD: resilient selectors\n'
        + 'cy.get("[data-cy=submit-button]");     // Purpose-built\n'
        + 'cy.get("[data-testid=user-name]");     // Testing Library convention\n'
        + 'cy.contains("Submit Order");            // Text content\n'
        + 'cy.findByRole("button", { name: /submit/i });  // Accessible role\n'
        + '\n'
        + '// Add data-cy to your components:\n'
        + '// <button data-cy="submit-button">Submit</button>\n'
        + '// <input data-cy="search-input" type="text" />\n'
        + '// <div data-cy="product-card">...</div>'}</code></pre>

      {/* Essential Commands */}
      <h2 style={sectionTitle}>{t.h2Commands}</h2>
      <p style={para}>{t.commandsDesc}</p>
      <pre style={codeBlock}><code>{'// --- Navigation ---\n'
        + 'cy.visit("/products");           // Navigate to URL\n'
        + 'cy.visit("/products?page=2");    // With query params\n'
        + 'cy.go("back");                   // Browser back\n'
        + 'cy.go("forward");                // Browser forward\n'
        + 'cy.reload();                     // Reload page\n'
        + '\n'
        + '// --- Querying ---\n'
        + 'cy.get("[data-cy=item]");        // CSS selector\n'
        + 'cy.contains("Add to Cart");      // Text content\n'
        + 'cy.get("ul").find("li");         // Scoped query\n'
        + 'cy.get("li").first();            // First element\n'
        + 'cy.get("li").last();             // Last element\n'
        + 'cy.get("li").eq(2);              // Nth element (0-indexed)\n'
        + 'cy.get("li").filter(".active");   // Filter by selector\n'
        + '\n'
        + '// --- Actions ---\n'
        + 'cy.get("input").type("hello");           // Type text\n'
        + 'cy.get("input").clear();                  // Clear input\n'
        + 'cy.get("input").type("hello{enter}");     // Type + press Enter\n'
        + 'cy.get("button").click();                 // Click\n'
        + 'cy.get("button").dblclick();              // Double click\n'
        + 'cy.get("button").rightclick();            // Right click\n'
        + 'cy.get("select").select("Option 1");      // Select dropdown\n'
        + 'cy.get("input[type=checkbox]").check();    // Check checkbox\n'
        + 'cy.get("input[type=checkbox]").uncheck();  // Uncheck\n'
        + 'cy.get("input[type=file]")\n'
        + '  .selectFile("cypress/fixtures/doc.pdf"); // File upload\n'
        + 'cy.get("element").scrollIntoView();        // Scroll to element\n'
        + '\n'
        + '// --- Assertions ---\n'
        + 'cy.get("h1").should("exist");                      // Exists in DOM\n'
        + 'cy.get("h1").should("be.visible");                 // Visible on screen\n'
        + 'cy.get("h1").should("contain", "Welcome");         // Contains text\n'
        + 'cy.get("h1").should("have.text", "Welcome Home");  // Exact text\n'
        + 'cy.get("input").should("have.value", "hello");     // Input value\n'
        + 'cy.get("li").should("have.length", 5);             // Count elements\n'
        + 'cy.get("button").should("be.disabled");            // Disabled state\n'
        + 'cy.get("div").should("have.css", "color", "rgb(255, 0, 0)");\n'
        + 'cy.url().should("include", "/dashboard");          // URL check\n'
        + 'cy.title().should("eq", "My App");                 // Page title'}</code></pre>

      {/* Custom Commands */}
      <h2 style={sectionTitle}>{t.h2CustomCommands}</h2>
      <p style={para}>{t.customCommandsDesc}</p>
      <pre style={codeBlock}><code>{'// cypress/support/commands.ts\n'
        + '\n'
        + '// Login command — reusable across all test files\n'
        + 'Cypress.Commands.add("login", (email: string, password: string) => {\n'
        + '  cy.session([email, password], () => {\n'
        + '    cy.visit("/login");\n'
        + '    cy.get("[data-cy=email-input]").type(email);\n'
        + '    cy.get("[data-cy=password-input]").type(password);\n'
        + '    cy.get("[data-cy=login-button]").click();\n'
        + '    cy.url().should("include", "/dashboard");\n'
        + '  });\n'
        + '});\n'
        + '\n'
        + '// API login — faster, bypasses UI\n'
        + 'Cypress.Commands.add("loginByApi", (email: string, password: string) => {\n'
        + '  cy.request("POST", "/api/auth/login", { email, password })\n'
        + '    .then((response) => {\n'
        + '      window.localStorage.setItem("token", response.body.token);\n'
        + '    });\n'
        + '});\n'
        + '\n'
        + '// Get by data-cy shortcut\n'
        + 'Cypress.Commands.add("getByCy", (selector: string) => {\n'
        + '  return cy.get(\'[data-cy="\' + selector + \'"]\');\n'
        + '});\n'
        + '\n'
        + '// TypeScript declarations\n'
        + '// cypress/support/index.d.ts\n'
        + 'declare namespace Cypress {\n'
        + '  interface Chainable {\n'
        + '    login(email: string, password: string): Chainable<void>;\n'
        + '    loginByApi(email: string, password: string): Chainable<void>;\n'
        + '    getByCy(selector: string): Chainable<JQuery<HTMLElement>>;\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Usage in tests:\n'
        + '// cy.login("admin@example.com", "password123");\n'
        + '// cy.getByCy("submit-button").click();'}</code></pre>

      {/* Fixtures */}
      <h2 style={sectionTitle}>{t.h2Fixtures}</h2>
      <p style={para}>{t.fixturesDesc}</p>
      <pre style={codeBlock}><code>{'// cypress/fixtures/users.json\n'
        + '{\n'
        + '  "admin": {\n'
        + '    "email": "admin@example.com",\n'
        + '    "password": "adminPass123",\n'
        + '    "role": "admin"\n'
        + '  },\n'
        + '  "regular": {\n'
        + '    "email": "user@example.com",\n'
        + '    "password": "userPass456",\n'
        + '    "role": "user"\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// cypress/fixtures/products.json\n'
        + '[\n'
        + '  { "id": 1, "name": "Widget A", "price": 29.99, "stock": 150 },\n'
        + '  { "id": 2, "name": "Widget B", "price": 49.99, "stock": 75 },\n'
        + '  { "id": 3, "name": "Widget C", "price": 99.99, "stock": 0 }\n'
        + ']\n'
        + '\n'
        + '// Using fixtures in tests\n'
        + 'describe("Product Listing", () => {\n'
        + '  beforeEach(() => {\n'
        + '    // Load fixture and use it to stub the API\n'
        + '    cy.fixture("products").then((products) => {\n'
        + '      cy.intercept("GET", "/api/products", {\n'
        + '        statusCode: 200,\n'
        + '        body: products,\n'
        + '      }).as("getProducts");\n'
        + '    });\n'
        + '    cy.visit("/products");\n'
        + '    cy.wait("@getProducts");\n'
        + '  });\n'
        + '\n'
        + '  it("displays all products", () => {\n'
        + '    cy.get("[data-cy=product-card]").should("have.length", 3);\n'
        + '  });\n'
        + '\n'
        + '  it("shows out-of-stock badge", () => {\n'
        + '    cy.get("[data-cy=product-card]")\n'
        + '      .last()\n'
        + '      .find("[data-cy=out-of-stock-badge]")\n'
        + '      .should("be.visible");\n'
        + '  });\n'
        + '\n'
        + '  // Shorthand: cy.fixture as intercept body\n'
        + '  it("can use fixture shorthand", () => {\n'
        + '    cy.intercept("GET", "/api/products", {\n'
        + '      fixture: "products.json",\n'
        + '    }).as("getProducts");\n'
        + '  });\n'
        + '});'}</code></pre>

      {/* Network Interception */}
      <h2 style={sectionTitle}>{t.h2Intercepts}</h2>
      <p style={para}>{t.interceptsDesc}</p>
      <pre style={codeBlock}><code>{'// --- Stubbing API responses ---\n'
        + 'cy.intercept("GET", "/api/users", {\n'
        + '  statusCode: 200,\n'
        + '  body: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],\n'
        + '}).as("getUsers");\n'
        + '\n'
        + 'cy.visit("/users");\n'
        + 'cy.wait("@getUsers");  // Wait for the request\n'
        + 'cy.get("[data-cy=user-row]").should("have.length", 2);\n'
        + '\n'
        + '// --- Simulating errors ---\n'
        + 'cy.intercept("POST", "/api/orders", {\n'
        + '  statusCode: 500,\n'
        + '  body: { error: "Internal server error" },\n'
        + '}).as("createOrder");\n'
        + '\n'
        + 'cy.get("[data-cy=place-order]").click();\n'
        + 'cy.wait("@createOrder");\n'
        + 'cy.get("[data-cy=error-toast]")\n'
        + '  .should("contain", "Something went wrong");\n'
        + '\n'
        + '// --- Simulating network delay ---\n'
        + 'cy.intercept("GET", "/api/dashboard", (req) => {\n'
        + '  req.reply({\n'
        + '    delay: 3000,  // 3 second delay\n'
        + '    statusCode: 200,\n'
        + '    body: { stats: { users: 100 } },\n'
        + '  });\n'
        + '}).as("getDashboard");\n'
        + '\n'
        + 'cy.visit("/dashboard");\n'
        + 'cy.get("[data-cy=loading-spinner]").should("be.visible");\n'
        + 'cy.wait("@getDashboard");\n'
        + 'cy.get("[data-cy=loading-spinner]").should("not.exist");\n'
        + '\n'
        + '// --- Spying (observe without modifying) ---\n'
        + 'cy.intercept("POST", "/api/analytics").as("analytics");\n'
        + 'cy.get("[data-cy=buy-button]").click();\n'
        + 'cy.wait("@analytics").then((interception) => {\n'
        + '  expect(interception.request.body).to.have.property("event", "purchase");\n'
        + '  expect(interception.response.statusCode).to.equal(200);\n'
        + '});\n'
        + '\n'
        + '// --- Modifying requests ---\n'
        + 'cy.intercept("GET", "/api/products*", (req) => {\n'
        + '  // Add auth header to all product requests\n'
        + '  req.headers["Authorization"] = "Bearer test-token";\n'
        + '  req.continue();\n'
        + '});\n'
        + '\n'
        + '// --- Conditional responses ---\n'
        + 'let callCount = 0;\n'
        + 'cy.intercept("GET", "/api/status", (req) => {\n'
        + '  callCount += 1;\n'
        + '  if (callCount === 1) {\n'
        + '    req.reply({ status: "pending" });\n'
        + '  } else {\n'
        + '    req.reply({ status: "complete" });\n'
        + '  }\n'
        + '}).as("checkStatus");'}</code></pre>

      {/* Component Testing */}
      <h2 style={sectionTitle}>{t.h2ComponentTesting}</h2>
      <p style={para}>{t.componentTestingDesc}</p>
      <pre style={codeBlock}><code>{'// src/components/Button.cy.tsx\n'
        + 'import Button from "./Button";\n'
        + '\n'
        + 'describe("<Button />", () => {\n'
        + '  it("renders with default props", () => {\n'
        + '    cy.mount(<Button>Click Me</Button>);\n'
        + '    cy.get("button")\n'
        + '      .should("contain", "Click Me")\n'
        + '      .and("not.be.disabled");\n'
        + '  });\n'
        + '\n'
        + '  it("fires onClick handler", () => {\n'
        + '    const onClick = cy.stub().as("clickHandler");\n'
        + '    cy.mount(<Button onClick={onClick}>Submit</Button>);\n'
        + '    cy.get("button").click();\n'
        + '    cy.get("@clickHandler").should("have.been.calledOnce");\n'
        + '  });\n'
        + '\n'
        + '  it("renders disabled state", () => {\n'
        + '    cy.mount(<Button disabled>Disabled</Button>);\n'
        + '    cy.get("button")\n'
        + '      .should("be.disabled")\n'
        + '      .and("have.css", "opacity", "0.5");\n'
        + '  });\n'
        + '\n'
        + '  it("renders different variants", () => {\n'
        + '    cy.mount(<Button variant="danger">Delete</Button>);\n'
        + '    cy.get("button")\n'
        + '      .should("have.css", "background-color", "rgb(239, 68, 68)");\n'
        + '  });\n'
        + '});\n'
        + '\n'
        + '// src/components/SearchBar.cy.tsx\n'
        + 'import SearchBar from "./SearchBar";\n'
        + '\n'
        + 'describe("<SearchBar />", () => {\n'
        + '  it("calls onSearch after debounce", () => {\n'
        + '    const onSearch = cy.stub().as("searchHandler");\n'
        + '    cy.mount(<SearchBar onSearch={onSearch} debounceMs={300} />);\n'
        + '\n'
        + '    cy.get("[data-cy=search-input]").type("cypress testing");\n'
        + '    cy.get("@searchHandler").should("not.have.been.called");\n'
        + '\n'
        + '    // Wait for debounce\n'
        + '    cy.wait(350);\n'
        + '    cy.get("@searchHandler")\n'
        + '      .should("have.been.calledWith", "cypress testing");\n'
        + '  });\n'
        + '\n'
        + '  it("clears input on escape key", () => {\n'
        + '    cy.mount(<SearchBar onSearch={cy.stub()} />);\n'
        + '    cy.get("[data-cy=search-input]")\n'
        + '      .type("test{esc}")\n'
        + '      .should("have.value", "");\n'
        + '  });\n'
        + '});'}</code></pre>

      {/* CI/CD Integration */}
      <h2 style={sectionTitle}>{t.h2CI}</h2>
      <p style={para}>{t.ciDesc}</p>
      <h3 style={subTitle}>GitHub Actions</h3>
      <pre style={codeBlock}><code>{'# .github/workflows/cypress.yml\n'
        + 'name: Cypress Tests\n'
        + '\n'
        + 'on:\n'
        + '  push:\n'
        + '    branches: [main]\n'
        + '  pull_request:\n'
        + '    branches: [main]\n'
        + '\n'
        + 'jobs:\n'
        + '  cypress-run:\n'
        + '    runs-on: ubuntu-latest\n'
        + '    steps:\n'
        + '      - uses: actions/checkout@v4\n'
        + '\n'
        + '      - uses: actions/setup-node@v4\n'
        + '        with:\n'
        + '          node-version: 22\n'
        + '          cache: "npm"\n'
        + '\n'
        + '      - name: Install dependencies\n'
        + '        run: npm ci\n'
        + '\n'
        + '      - name: Cypress run\n'
        + '        uses: cypress-io/github-action@v6\n'
        + '        with:\n'
        + '          build: npm run build\n'
        + '          start: npm start\n'
        + '          wait-on: "http://localhost:3000"\n'
        + '          wait-on-timeout: 120\n'
        + '          browser: chrome\n'
        + '          record: false\n'
        + '\n'
        + '      - name: Upload screenshots on failure\n'
        + '        uses: actions/upload-artifact@v4\n'
        + '        if: failure()\n'
        + '        with:\n'
        + '          name: cypress-screenshots\n'
        + '          path: cypress/screenshots\n'
        + '          retention-days: 7'}</code></pre>

      <h3 style={subTitle}>Docker</h3>
      <pre style={codeBlock}><code>{'# Dockerfile.cypress\n'
        + 'FROM cypress/included:13.6.0\n'
        + 'WORKDIR /app\n'
        + 'COPY package*.json ./\n'
        + 'RUN npm ci\n'
        + 'COPY . .\n'
        + '\n'
        + '# Run tests\n'
        + 'CMD ["npx", "cypress", "run", "--browser", "chrome"]\n'
        + '\n'
        + '# docker-compose.yml\n'
        + '# services:\n'
        + '#   app:\n'
        + '#     build: .\n'
        + '#     ports:\n'
        + '#       - "3000:3000"\n'
        + '#   cypress:\n'
        + '#     image: cypress/included:13.6.0\n'
        + '#     depends_on:\n'
        + '#       - app\n'
        + '#     environment:\n'
        + '#       - CYPRESS_baseUrl=http://app:3000\n'
        + '#     volumes:\n'
        + '#       - ./cypress:/app/cypress\n'
        + '#       - ./cypress.config.ts:/app/cypress.config.ts'}</code></pre>

      <h3 style={subTitle}>package.json Scripts</h3>
      <pre style={codeBlock}><code>{'{\n'
        + '  "scripts": {\n'
        + '    "cy:open": "cypress open",\n'
        + '    "cy:run": "cypress run",\n'
        + '    "cy:run:chrome": "cypress run --browser chrome",\n'
        + '    "cy:run:firefox": "cypress run --browser firefox",\n'
        + '    "cy:component": "cypress run --component",\n'
        + '    "cy:headed": "cypress run --headed",\n'
        + '    "test:e2e": "start-server-and-test start http://localhost:3000 cy:run",\n'
        + '    "test:e2e:dev": "start-server-and-test dev http://localhost:3000 cy:open"\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Best Practices */}
      <h2 style={sectionTitle}>{t.h2BestPractices}</h2>
      <p style={para}>{t.bestPracticesDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.bp1}</li>
        <li style={listItem}>{t.bp2}</li>
        <li style={listItem}>{t.bp3}</li>
        <li style={listItem}>{t.bp4}</li>
        <li style={listItem}>{t.bp5}</li>
        <li style={listItem}>{t.bp6}</li>
        <li style={listItem}>{t.bp7}</li>
        <li style={listItem}>{t.bp8}</li>
        <li style={listItem}>{t.bp9}</li>
        <li style={listItem}>{t.bp10}</li>
      </ul>

      <h3 style={subTitle}>Anti-Patterns to Avoid</h3>
      <pre style={codeBlock}><code>{'// ANTI-PATTERN: Fixed waits\n'
        + 'cy.wait(5000);  // Never do this\n'
        + '\n'
        + '// CORRECT: Wait for specific condition\n'
        + 'cy.intercept("GET", "/api/data").as("getData");\n'
        + 'cy.wait("@getData");\n'
        + '\n'
        + '// ANTI-PATTERN: Testing implementation details\n'
        + 'cy.get("div.MuiButton-root.MuiButton-contained");\n'
        + '\n'
        + '// CORRECT: Test user-facing behavior\n'
        + 'cy.get("[data-cy=submit-button]");\n'
        + '\n'
        + '// ANTI-PATTERN: Shared state between tests\n'
        + 'let savedId;\n'
        + 'it("creates item", () => { savedId = "..."; });\n'
        + 'it("uses item", () => { cy.visit("/item/" + savedId); });\n'
        + '\n'
        + '// CORRECT: Each test sets up its own state\n'
        + 'it("edits an item", () => {\n'
        + '  // Create via API, then test\n'
        + '  cy.request("POST", "/api/items", { name: "Test" })\n'
        + '    .then((res) => {\n'
        + '      cy.visit("/item/" + res.body.id);\n'
        + '    });\n'
        + '});\n'
        + '\n'
        + '// ANTI-PATTERN: Giant multi-step test\n'
        + 'it("does everything", () => {\n'
        + '  // login, navigate, create, edit, delete...\n'
        + '  // 100 lines of commands\n'
        + '});\n'
        + '\n'
        + '// CORRECT: Focused tests with shared setup\n'
        + 'describe("Item management", () => {\n'
        + '  beforeEach(() => {\n'
        + '    cy.login("admin@test.com", "password");\n'
        + '    cy.visit("/items");\n'
        + '  });\n'
        + '  it("creates an item", () => { /* ... */ });\n'
        + '  it("edits an item", () => { /* ... */ });\n'
        + '  it("deletes an item", () => { /* ... */ });\n'
        + '});'}</code></pre>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
      {[
        { q: t.faq1Q, a: t.faq1A },
        { q: t.faq2Q, a: t.faq2A },
        { q: t.faq3Q, a: t.faq3A },
        { q: t.faq4Q, a: t.faq4A },
        { q: t.faq5Q, a: t.faq5A },
        { q: t.faq6Q, a: t.faq6A },
        { q: t.faq7Q, a: t.faq7A },
        { q: t.faq8Q, a: t.faq8A },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{faq.q}</h3>
          <p style={{ lineHeight: '1.7' }}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
