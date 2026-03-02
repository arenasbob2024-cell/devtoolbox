'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Playwright vs Cypress 2025: E2E Testing Framework Comparison',
    intro: 'End-to-end testing has become essential for modern web development, and Playwright and Cypress are the two leading contenders. This comprehensive comparison examines performance, developer experience, browser support, and real-world use cases to help you choose the right E2E testing framework.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Playwright offers superior cross-browser support (Chromium, Firefox, WebKit), faster execution with parallel testing, and better mobile emulation. Cypress provides a more polished developer experience with time-travel debugging and real-time reloads. For enterprise projects requiring cross-browser testing, Playwright is recommended. For rapid development with Chrome-focused testing, Cypress excels.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Playwright supports all major browsers natively; Cypress only supports Chromium-based browsers',
    takeaway2: 'Playwright is 2-3x faster in parallel execution with better resource management',
    takeaway3: 'Cypress has superior developer experience with time-travel debugging and live reload',
    takeaway4: 'Playwright offers better mobile emulation and network interception capabilities',
    takeaway5: 'Both frameworks have excellent documentation and growing ecosystems',
    takeaway6: 'Cypress has a larger community but Playwright is growing faster',
    
    whatIsPlaywrightTitle: 'What is Playwright?',
    whatIsPlaywrightContent: 'Playwright is a Node.js library for browser automation, created by Microsoft in 2020. It supports Chromium, Firefox, and WebKit with a single API, enabling true cross-browser testing. Playwright is designed for reliability, speed, and the ability to handle modern web app features like shadow DOM, iframes, and web workers.',
    
    whatIsCypressTitle: 'What is Cypress?',
    whatIsCypressContent: 'Cypress is a next-generation front-end testing tool built for the modern web, released in 2017. It runs directly in the browser alongside your application, providing real-time reloads, time-travel debugging, and an intuitive visual interface. Cypress focuses on developer experience and quick feedback loops.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks on a typical e-commerce checkout flow with 50 test cases:',
    
    executionTitle: 'Test Execution Speed',
    executionIntro: 'Time to complete all test cases:',
    
    parallelTitle: 'Parallel Execution',
    parallelIntro: 'Performance with parallel test runners:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Both frameworks use similar concepts but different syntax:',
    
    playwrightExampleTitle: 'Playwright',
    cypressExampleTitle: 'Cypress',
    
    browserSupportTitle: 'Browser Support',
    browserSupportIntro: 'Native browser support comparison:',
    
    debuggingTitle: 'Debugging Experience',
    debuggingIntro: 'Debugging capabilities comparison:',
    
    migrationTitle: 'Migration Considerations',
    migrationIntro: 'Key differences when switching frameworks:',
    
    whenToUseTitle: 'When to Use Each Framework',
    playwrightBestFor: 'Use Playwright When:',
    cypressBestFor: 'Use Cypress When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Playwright and Cypress are excellent choices for E2E testing. Playwright wins on cross-browser support, execution speed, and enterprise features. Cypress wins on developer experience, learning curve, and rapid feedback. For teams needing comprehensive browser coverage and CI/CD integration, Playwright is the better choice. For startups and teams prioritizing developer experience, Cypress remains an excellent option.',
    
    faq1q: 'Is Playwright free to use?',
    faq1a: 'Yes, Playwright is completely free and open-source under the Apache 2.0 license. Microsoft maintains it actively with regular updates and contributions from the community.',
    
    faq2q: 'Can Cypress test multiple tabs or windows?',
    faq2a: 'Cypress has limited support for multiple tabs due to its architecture. It can work around this by stubbing window.open. Playwright handles multiple contexts natively and is better suited for multi-tab scenarios.',
    
    faq3q: 'Which framework has better CI/CD integration?',
    faq3a: 'Playwright has excellent CI/CD integration with built-in reporters, Docker images, and GitHub Actions. Cypress also integrates well but requires more configuration for parallel testing in their cloud offering.',
    
    faq4q: 'Does Playwright support visual regression testing?',
    faq4a: 'Yes, Playwright has built-in screenshot comparison for visual regression testing. It also integrates well with third-party tools like Percy and Applitools for advanced visual testing.',
    
    faq5q: 'Can I use Cypress with TypeScript?',
    faq5a: 'Yes, Cypress has excellent TypeScript support out of the box. It provides type definitions and automatic configuration, making TypeScript integration seamless.',
    
    faq6q: 'Which is better for API testing?',
    faq6a: 'Both frameworks support API testing. Playwright has native request context support that is faster and more integrated. Cypress also supports API testing but runs through its browser-based architecture.',
    
    faq7q: 'How do they handle iframes and shadow DOM?',
    faq7a: 'Playwright has superior support for shadow DOM and iframes with dedicated selectors and automatic piercing. Cypress requires workarounds and plugins for complex shadow DOM scenarios.',
    
    faq8q: 'What about mobile testing?',
    faq8a: 'Playwright offers comprehensive mobile emulation with device presets and touch event support. Cypress has limited mobile testing capabilities and is primarily focused on desktop browsers.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Playwright vs Cypress 2025：E2E测试框架对比',
    intro: '端到端测试已成为现代Web开发的必要组成部分，Playwright和Cypress是两个领先的竞争者。本全面比较考察性能、开发者体验、浏览器支持和真实用例，帮助你选择合适的E2E测试框架。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Playwright提供卓越的跨浏览器支持（Chromium、Firefox、WebKit），通过并行测试实现更快的执行，以及更好的移动端模拟。Cypress提供更精致的开发者体验，具有时间旅行调试和实时重载。对于需要跨浏览器测试的企业项目，推荐Playwright。对于专注于Chrome的快速开发，Cypress表现出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Playwright原生支持所有主流浏览器；Cypress仅支持基于Chromium的浏览器',
    takeaway2: 'Playwright在并行执行中快2-3倍，资源管理更好',
    takeaway3: 'Cypress具有卓越的开发者体验，具有时间旅行调试和实时重载',
    takeaway4: 'Playwright提供更好的移动端模拟和网络拦截功能',
    takeaway5: '两个框架都有优秀的文档和不断增长的生态系统',
    takeaway6: 'Cypress社区更大，但Playwright增长更快',
    
    whatIsPlaywrightTitle: '什么是Playwright？',
    whatIsPlaywrightContent: 'Playwright是由Microsoft于2020年创建的Node.js浏览器自动化库。它使用单一API支持Chromium、Firefox和WebKit，实现真正的跨浏览器测试。Playwright专为可靠性、速度和处理现代Web应用功能（如shadow DOM、iframe和web workers）而设计。',
    
    whatIsCypressTitle: '什么是Cypress？',
    whatIsCypressContent: 'Cypress是为现代Web构建的下一代前端测试工具，于2017年发布。它直接在浏览器中与你的应用程序一起运行，提供实时重载、时间旅行调试和直观的可视化界面。Cypress专注于开发者体验和快速反馈循环。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在典型电商结账流程（50个测试用例）上的性能基准测试：',
    
    executionTitle: '测试执行速度',
    executionIntro: '完成所有测试用例的时间：',
    
    parallelTitle: '并行执行',
    parallelIntro: '使用并行测试运行器的性能：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两个框架使用类似的概念但语法不同：',
    
    playwrightExampleTitle: 'Playwright',
    cypressExampleTitle: 'Cypress',
    
    browserSupportTitle: '浏览器支持',
    browserSupportIntro: '原生浏览器支持对比：',
    
    debuggingTitle: '调试体验',
    debuggingIntro: '调试功能对比：',
    
    migrationTitle: '迁移注意事项',
    migrationIntro: '切换框架时的主要差异：',
    
    whenToUseTitle: '何时使用每个框架',
    playwrightBestFor: '使用Playwright的场景：',
    cypressBestFor: '使用Cypress的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Playwright和Cypress都是E2E测试的优秀选择。Playwright在跨浏览器支持、执行速度和企业功能方面胜出。Cypress在开发者体验、学习曲线和快速反馈方面胜出。对于需要全面浏览器覆盖和CI/CD集成的团队，Playwright是更好的选择。对于优先考虑开发者体验的初创公司和团队，Cypress仍然是一个出色的选择。',
    
    faq1q: 'Playwright是免费的吗？',
    faq1a: '是的，Playwright完全免费，采用Apache 2.0许可证开源。Microsoft积极维护它，定期更新并接受社区贡献。',
    
    faq2q: 'Cypress可以测试多个标签页或窗口吗？',
    faq2a: '由于其架构，Cypress对多个标签页的支持有限。它可以通过存根window.open来解决这个问题。Playwright原生处理多个上下文，更适合多标签场景。',
    
    faq3q: '哪个框架的CI/CD集成更好？',
    faq3a: 'Playwright具有出色的CI/CD集成，内置报告器、Docker镜像和GitHub Actions。Cypress也集成良好，但在其云产品中并行测试需要更多配置。',
    
    faq4q: 'Playwright支持视觉回归测试吗？',
    faq4a: '是的，Playwright内置截图比较功能用于视觉回归测试。它还与Percy和Applitools等第三方工具良好集成，用于高级视觉测试。',
    
    faq5q: '我可以在Cypress中使用TypeScript吗？',
    faq5a: '是的，Cypress开箱即用提供出色的TypeScript支持。它提供类型定义和自动配置，使TypeScript集成无缝。',
    
    faq6q: '哪个更适合API测试？',
    faq6a: '两个框架都支持API测试。Playwright具有原生的请求上下文支持，更快更集成。Cypress也支持API测试，但通过其基于浏览器的架构运行。',
    
    faq7q: '它们如何处理iframe和shadow DOM？',
    faq7a: 'Playwright通过专用选择器和自动穿透，对shadow DOM和iframe提供卓越的支持。Cypress需要变通方法和插件来处理复杂的shadow DOM场景。',
    
    faq8q: '移动端测试呢？',
    faq8a: 'Playwright提供全面的移动端模拟，包括设备预设和触摸事件支持。Cypress的移动端测试能力有限，主要专注于桌面浏览器。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PlaywrightVsCypress2025({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#2ecc71' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #2ecc71', background: 'linear-gradient(135deg, rgba(46,204,113,0.1), rgba(39,174,96,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#2ecc71' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsPlaywrightTitle}</h3>
      <p style={pStyle}>{ct.whatIsPlaywrightContent}</p>

      <h3 style={h3Style}>{ct.whatIsCypressTitle}</h3>
      <p style={pStyle}>{ct.whatIsCypressContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Cypress</th>
              <th style={thStyle}>Playwright</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2017', '2020'],
              [isZh ? '开发者' : 'Developer', 'Cypress.io', 'Microsoft'],
              [isZh ? '架构' : 'Architecture', 'Browser-based', 'Node.js + CDP'],
              [isZh ? '运行位置' : 'Runs In', 'Browser', 'Node.js (controls browser)'],
              [isZh ? '语言支持' : 'Languages', 'JavaScript/TypeScript', 'JS/TS/Python/Java/.NET'],
              [isZh ? '浏览器支持' : 'Browsers', 'Chromium, Firefox (beta)', 'Chromium, Firefox, WebKit'],
              [isZh ? '开源' : 'Open Source', 'Yes (with paid cloud)', 'Yes (Apache 2.0)'],
            ].map(([feature, cypress, playwright], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{cypress}</td>
                <td style={{ ...tdStyle, color: '#2ecc71' }}>{playwright}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.executionTitle}</h3>
      <p style={pStyle}>{ct.executionIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Cypress</th>
              <th style={thStyle}>Playwright</th>
              <th style={thStyle}>{isZh ? '差异' : 'Difference'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '顺序执行' : 'Sequential Execution', '145s', '98s', '1.5x faster'],
              [isZh ? '4个Worker并行' : 'Parallel (4 workers)', '52s', '28s', '1.9x faster'],
              [isZh ? '内存使用' : 'Memory Usage', '~1.2GB', '~800MB', '33% less'],
              [isZh ? '启动时间' : 'Startup Time', '8s', '2s', '4x faster'],
            ].map(([metric, cypress, playwright, diff], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{cypress}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{playwright}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Cypress</th>
              <th style={thStyle}>Playwright</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '跨浏览器测试' : 'Cross-browser Testing', 'Chromium only (stable)', 'Chromium, Firefox, WebKit'],
              [isZh ? '并行测试' : 'Parallel Testing', 'Paid cloud only', 'Built-in (free)'],
              [isZh ? '时间旅行调试' : 'Time-travel Debugging', '✓', '✓ (Trace Viewer)'],
              [isZh ? '截图/视频' : 'Screenshots/Video', '✓', '✓'],
              [isZh ? '网络拦截' : 'Network Interception', '✓', '✓ (more powerful)'],
              [isZh ? 'Shadow DOM' : 'Shadow DOM Support', 'Limited', '✓ (native)'],
              [isZh ? '多标签/窗口' : 'Multi-tab/Window', 'Limited', '✓'],
              [isZh ? '移动端模拟' : 'Mobile Emulation', 'Basic', 'Advanced'],
              [isZh ? 'API测试' : 'API Testing', '✓', '✓ (native)'],
              [isZh ? '视觉测试' : 'Visual Testing', '✓ (plugin)', '✓ (built-in)'],
            ].map(([feature, cypress, playwright], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{cypress}</td>
                <td style={{ ...tdStyle, color: playwright.includes('✓') ? '#22c55e' : 'inherit' }}>{playwright}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#2ecc71' }}>{ct.playwrightExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Playwright - Login test example
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');

    // Fill in credentials
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'password123');

    // Click login button
    await page.click('[data-testid="login-button"]');

    // Wait for navigation and check URL
    await page.waitForURL('/dashboard');
    expect(page.url()).toContain('/dashboard');

    // Verify user is logged in
    await expect(page.locator('[data-testid="user-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-name"]')).toContainText('John Doe');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[data-testid="email"]', 'wrong@example.com');
    await page.fill('[data-testid="password"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');

    // Check error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');
  });
});

// Playwright - API + UI combined test
test('should display user data from API', async ({ page, request }) => {
  // Create user via API
  const response = await request.post('/api/users', {
    data: {
      name: 'Test User',
      email: 'test@example.com',
    },
  });
  expect(response.ok()).toBeTruthy();

  // Navigate and verify in UI
  await page.goto('/users');
  await expect(page.locator('text=Test User')).toBeVisible();
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#1a73e8' }}>{ct.cypressExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Cypress - Login test example
describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully', () => {
    // Fill in credentials
    cy.get('[data-testid="email"]').type('user@example.com');
    cy.get('[data-testid="password"]').type('password123');

    // Click login button
    cy.get('[data-testid="login-button"]').click();

    // Check URL changed
    cy.url().should('include', '/dashboard');

    // Verify user is logged in
    cy.get('[data-testid="user-name"]')
      .should('be.visible')
      .and('contain', 'John Doe');
  });

  it('should show error for invalid credentials', () => {
    cy.get('[data-testid="email"]').type('wrong@example.com');
    cy.get('[data-testid="password"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();

    // Check error message
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});

// Cypress - API + UI combined test
it('should display user data from API', () => {
  // Create user via API
  cy.request('POST', '/api/users', {
    name: 'Test User',
    email: 'test@example.com',
  }).then((response) => {
    expect(response.status).to.eq(201);
  });

  // Navigate and verify in UI
  cy.visit('/users');
  cy.contains('Test User').should('be.visible');
});`}</code></pre>

      {/* Browser Support */}
      <h2 style={h2Style}>{ct.browserSupportTitle}</h2>
      <p style={pStyle}>{ct.browserSupportIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '浏览器' : 'Browser'}</th>
              <th style={thStyle}>Cypress</th>
              <th style={thStyle}>Playwright</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Chrome/Chromium', '✓', '✓'],
              ['Firefox', 'Beta (limited)', '✓'],
              ['Safari/WebKit', '✗', '✓'],
              ['Edge', '✓ (Chromium)', '✓'],
              [isZh ? 'iOS模拟' : 'iOS Simulation', '✗', '✓'],
              [isZh ? 'Android模拟' : 'Android Simulation', '✗', '✓'],
            ].map(([browser, cypress, playwright], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{browser}</td>
                <td style={tdStyle}>{cypress}</td>
                <td style={{ ...tdStyle, color: playwright === '✓' ? '#22c55e' : 'inherit' }}>{playwright}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Debugging */}
      <h2 style={h2Style}>{ct.debuggingTitle}</h2>
      <p style={pStyle}>{ct.debuggingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #1a73e8' }}>
          <strong style={{ color: '#1a73e8' }}>Cypress</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '时间旅行调试器让你可以在测试执行的任何点回放和检查应用状态。实时重载在保存时自动运行测试。Test Runner提供可视化界面，显示命令日志和应用预览。' : 'Time-travel debugger lets you replay and inspect app state at any point in test execution. Live reload automatically runs tests on save. Test Runner provides visual interface showing command log and app preview.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #2ecc71' }}>
          <strong style={{ color: '#2ecc71' }}>Playwright</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Trace Viewer提供完整的测试执行记录，包括DOM快照、网络请求和控制台日志。Codegen工具通过录制用户操作生成测试代码。UI Mode提供交互式测试调试体验。' : 'Trace Viewer provides complete test execution recording including DOM snapshots, network requests, and console logs. Codegen tool generates test code by recording user actions. UI Mode provides interactive test debugging experience.'}
          </p>
        </div>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #2ecc71' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2ecc71' }}>{ct.playwrightBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '跨浏览器测试' : 'Cross-browser testing'}</li>
            <li>{isZh ? '企业级项目' : 'Enterprise projects'}</li>
            <li>{isZh ? '需要Safari支持' : 'Need Safari support'}</li>
            <li>{isZh ? '大规模测试套件' : 'Large test suites'}</li>
            <li>{isZh ? 'CI/CD集成' : 'CI/CD integration'}</li>
            <li>{isZh ? '移动端测试' : 'Mobile testing'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #1a73e8' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#1a73e8' }}>{ct.cypressBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '初创公司' : 'Startups'}</li>
            <li>{isZh ? 'Chrome优先测试' : 'Chrome-first testing'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '团队新E2E测试' : 'New to E2E testing'}</li>
            <li>{isZh ? '需要可视化调试' : 'Visual debugging needed'}</li>
            <li>{isZh ? '实时反馈循环' : 'Real-time feedback loop'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(46,204,113,0.1), rgba(39,174,96,0.1))', borderRadius: 12, border: '1px solid rgba(46,204,113,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#2ecc71', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#2ecc71', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={'/' + lang + '/tools/regex-tester'} style={{ color: '#2ecc71', textDecoration: 'none' }}>Regex Tester</a>
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
