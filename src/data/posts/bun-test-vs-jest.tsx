'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Bun Test vs Jest: Built-in vs External Test Runner Comparison',
    intro: "Bun has entered the testing arena with its built-in test runner, challenging Jest's dominance. This comprehensive comparison examines performance, developer experience, ecosystem compatibility, and real-world use cases to help you decide between a built-in solution and the established Jest ecosystem.",
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Bun Test offers native integration with the Bun runtime, 3-5x faster execution, and zero configuration. Jest remains the standard for Node.js projects with the largest ecosystem and community support. For new Bun projects, use Bun Test. For existing Node.js projects or teams needing extensive mocking, Jest is still the choice.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Bun Test is 3-5x faster than Jest with no external dependencies',
    takeaway2: 'Bun Test has Jest-compatible API, making migration easy',
    takeaway3: 'Jest has the largest testing ecosystem with extensive plugins',
    takeaway4: 'Bun Test is built into Bun runtime - no separate installation needed',
    takeaway5: 'Both support TypeScript, snapshot testing, and mocking out of the box',
    takeaway6: 'Bun Test works best with Bun runtime; Jest is universal for Node.js',
    
    whatIsBunTestTitle: 'What is Bun Test?',
    whatIsBunTestContent: 'Bun Test is the built-in testing framework included with the Bun runtime. Released in 2023, it provides a Jest-compatible API with native TypeScript support and zero configuration. Being integrated into Bun means tests run directly without external dependencies, resulting in significantly faster execution times.',
    
    whatIsJestTitle: 'What is Jest?',
    whatIsJestContent: 'Jest, created by Facebook (Meta) in 2013, is the most widely used JavaScript testing framework. With over 50 million weekly downloads, it has become the de facto standard for testing React applications and Node.js projects. Its extensive ecosystem includes plugins for every testing scenario.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks on a project with 300 test files:',
    
    coldStartTitle: 'Cold Start Performance',
    coldStartIntro: 'Time to run all tests from scratch:',
    
    watchModeTitle: 'Watch Mode Performance',
    watchModeIntro: 'Time to re-run tests after a file change:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Both frameworks use similar APIs:',
    
    jestExampleTitle: 'Jest',
    bunTestExampleTitle: 'Bun Test',
    
    ecosystemTitle: 'Ecosystem & Compatibility',
    ecosystemIntro: 'Community and plugin support comparison:',
    
    typescriptTitle: 'TypeScript Experience',
    typescriptIntro: 'TypeScript support comparison:',
    
    migrationTitle: 'Migration from Jest to Bun Test',
    migrationIntro: 'Key considerations when switching:',
    
    whenToUseTitle: 'When to Use Each Framework',
    bunTestBestFor: 'Use Bun Test When:',
    jestBestFor: 'Use Jest When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the choice between Bun Test and Jest largely depends on your runtime choice. For new Bun projects, Bun Test is the obvious choice with its speed and native integration. For Node.js projects and teams requiring extensive ecosystem support, Jest remains the reliable standard. The testing landscape is becoming runtime-specific, and both tools serve their ecosystems excellently.',
    
    faq1q: 'Can I use Bun Test with Node.js projects?',
    faq1a: 'Bun Test requires the Bun runtime to execute tests. While it can test Node.js-compatible code, you need to run tests using Bun. For pure Node.js projects without Bun, Jest is the better choice.',
    
    faq2q: 'Does Bun Test support all Jest features?',
    faq2a: 'Bun Test supports most common Jest features including describe/it blocks, expect assertions, mocks, and snapshots. Some advanced features like custom snapshot serializers may not be available yet, but core functionality is well-covered.',
    
    faq3q: 'How does Bun Test handle mocking?',
    faq3a: 'Bun Test provides built-in mocking with a Jest-compatible API. You can use mockFn, spyOn, and module mocking. The implementation is native to Bun, making it faster than Jest transforms.',
    
    faq4q: 'Can I migrate from Jest to Bun Test?',
    faq4a: 'Yes, migration is straightforward due to API compatibility. Most tests work without changes. You may need to adjust configuration and some advanced mocking patterns, but the core test syntax is identical.',
    
    faq5q: 'Does Bun Test have code coverage?',
    faq5a: 'Yes, Bun Test has built-in code coverage support. Run tests with the --coverage flag to generate coverage reports. It supports lcov and text reporters similar to Jest.',
    
    faq6q: 'What about React Testing Library?',
    faq6a: 'Bun Test works well with React Testing Library. You need to configure jsdom or happy-dom as the test environment. Most @testing-library/react patterns work identically to Jest.',
    
    faq7q: 'Is Bun Test production-ready?',
    faq7a: 'Bun Test is production-ready for many use cases, though it is newer than Jest. Major projects are adopting it successfully. For critical enterprise applications, evaluate your specific needs against current limitations.',
    
    faq8q: 'How does snapshot testing compare?',
    faq8a: 'Both frameworks support snapshot testing with similar APIs. Bun Test snapshot format is compatible with Jest, making migration easier. Inline snapshots and snapshot updating work the same way.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Bun Test vs Jest：内置与外部测试运行器对比',
    intro: 'Bun带着其内置测试运行器进入测试领域，挑战Jest的主导地位。本全面比较考察性能、开发者体验、生态系统兼容性和真实用例，帮助你决定是选择内置解决方案还是使用成熟的Jest生态系统。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Bun Test提供与Bun运行时的原生集成、快3-5倍的执行速度和零配置。Jest仍然是Node.js项目的标准，拥有最大的生态系统和社区支持。对于新的Bun项目，使用Bun Test。对于现有的Node.js项目或需要广泛mock的团队，Jest仍然是选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Bun Test比Jest快3-5倍，无需外部依赖',
    takeaway2: 'Bun Test具有Jest兼容的API，使迁移变得容易',
    takeaway3: 'Jest拥有最大的测试生态系统，插件丰富',
    takeaway4: 'Bun Test内置于Bun运行时——无需单独安装',
    takeaway5: '两者都开箱即用支持TypeScript、快照测试和mock',
    takeaway6: 'Bun Test最适合Bun运行时；Jest是Node.js的通用选择',
    
    whatIsBunTestTitle: '什么是Bun Test？',
    whatIsBunTestContent: 'Bun Test是Bun运行时内置的测试框架。于2023年发布，它提供Jest兼容的API，原生支持TypeScript，零配置。由于集成到Bun中，测试可以直接运行，无需外部依赖，从而显著提高执行速度。',
    
    whatIsJestTitle: '什么是Jest？',
    whatIsJestContent: 'Jest由Facebook（Meta）于2013年创建，是最广泛使用的JavaScript测试框架。每周有超过5000万次下载，它已成为测试React应用和Node.js项目的事实标准。其丰富的生态系统包括适用于各种测试场景的插件。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在300个测试文件的项目上的性能基准测试：',
    
    coldStartTitle: '冷启动性能',
    coldStartIntro: '从零开始运行所有测试的时间：',
    
    watchModeTitle: 'Watch模式性能',
    watchModeIntro: '文件更改后重新运行测试的时间：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两个框架使用类似的API：',
    
    jestExampleTitle: 'Jest',
    bunTestExampleTitle: 'Bun Test',
    
    ecosystemTitle: '生态系统与兼容性',
    ecosystemIntro: '社区和插件支持对比：',
    
    typescriptTitle: 'TypeScript体验',
    typescriptIntro: 'TypeScript支持对比：',
    
    migrationTitle: '从Jest迁移到Bun Test',
    migrationIntro: '切换时的主要考虑事项：',
    
    whenToUseTitle: '何时使用每个框架',
    bunTestBestFor: '使用Bun Test的场景：',
    jestBestFor: '使用Jest的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Bun Test和Jest之间的选择很大程度上取决于你的运行时选择。对于新的Bun项目，Bun Test因其速度和原生集成而是明显选择。对于Node.js项目和需要广泛生态系统支持的团队，Jest仍然是可靠的标准。测试领域正在变得特定于运行时，两个工具都很好地服务于它们的生态系统。',
    
    faq1q: '我可以在Node.js项目中使用Bun Test吗？',
    faq1a: 'Bun Test需要Bun运行时来执行测试。虽然它可以测试与Node.js兼容的代码，但你需要使用Bun来运行测试。对于没有Bun的纯Node.js项目，Jest是更好的选择。',
    
    faq2q: 'Bun Test支持所有Jest功能吗？',
    faq2a: 'Bun Test支持大多数常见的Jest功能，包括describe/it块、expect断言、mock和快照。一些高级功能如自定义快照序列化器可能尚不可用，但核心功能已很好地覆盖。',
    
    faq3q: 'Bun Test如何处理mock？',
    faq3a: 'Bun Test提供内置mock，使用Jest兼容的API。你可以使用mockFn、spyOn和模块mock。该实现是Bun原生的，比Jest转换更快。',
    
    faq4q: '我可以从Jest迁移到Bun Test吗？',
    faq4a: '是的，由于API兼容性，迁移很简单。大多数测试无需更改即可工作。你可能需要调整配置和一些高级mock模式，但核心测试语法是相同的。',
    
    faq5q: 'Bun Test有代码覆盖率吗？',
    faq5a: '是的，Bun Test内置代码覆盖率支持。使用--coverage标志运行测试以生成覆盖率报告。它支持类似于Jest的lcov和text报告器。',
    
    faq6q: 'React Testing Library呢？',
    faq6a: 'Bun Test与React Testing Library配合良好。你需要配置jsdom或happy-dom作为测试环境。大多数@testing-library/react模式与Jest完全相同。',
    
    faq7q: 'Bun Test已经可以用于生产了吗？',
    faq7a: 'Bun Test对于许多用例已经可以用于生产，尽管它比Jest更新。主要项目正在成功采用它。对于关键的企业应用，请根据当前限制评估你的特定需求。',
    
    faq8q: '快照测试如何比较？',
    faq8a: '两个框架都支持快照测试，API类似。Bun Test快照格式与Jest兼容，使迁移更容易。内联快照和快照更新工作方式相同。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function BunTestVsJest({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#fb923c' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #fb923c', background: 'linear-gradient(135deg, rgba(251,146,60,0.1), rgba(249,115,22,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#fb923c' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsBunTestTitle}</h3>
      <p style={pStyle}>{ct.whatIsBunTestContent}</p>

      <h3 style={h3Style}>{ct.whatIsJestTitle}</h3>
      <p style={pStyle}>{ct.whatIsJestContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Jest</th>
              <th style={thStyle}>Bun Test</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2013', '2023'],
              [isZh ? '开发者' : 'Developer', 'Meta', 'Bun (Jarred Sumner)'],
              [isZh ? '安装方式' : 'Installation', 'npm install -D jest', 'Built into Bun'],
              [isZh ? '运行时要求' : 'Runtime Required', 'Node.js', 'Bun'],
              [isZh ? '配置需求' : 'Configuration', 'Often needed', 'Zero-config'],
              [isZh ? '包大小' : 'Package Size', '~85MB', '0 (built-in)'],
              [isZh ? 'API兼容' : 'API Compatibility', 'Jest native', 'Jest-compatible'],
            ].map(([feature, jest, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{jest}</td>
                <td style={{ ...tdStyle, color: '#fb923c' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.coldStartTitle}</h3>
      <p style={pStyle}>{ct.coldStartIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Jest</th>
              <th style={thStyle}>Bun Test</th>
              <th style={thStyle}>{isZh ? '提升' : 'Improvement'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷启动时间' : 'Cold Start Time', '8.5s', '1.8s', '4.7x'],
              [isZh ? '测试执行' : 'Test Execution', '5.2s', '1.1s', '4.7x'],
              [isZh ? 'Watch模式重启' : 'Watch Restart', '2.8s', '0.15s', '18.7x'],
              [isZh ? '内存使用' : 'Memory Usage', '~450MB', '~120MB', '3.8x'],
            ].map(([metric, jest, bun, improvement], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{jest}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{bun}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{improvement}</td>
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
              <th style={thStyle}>Jest</th>
              <th style={thStyle}>Bun Test</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'describe/it语法' : 'describe/it blocks', '✓', '✓'],
              [isZh ? 'expect断言' : 'expect assertions', '✓', '✓ (compatible)'],
              [isZh ? '快照测试' : 'Snapshot Testing', '✓', '✓'],
              [isZh ? 'Mock函数' : 'Mock Functions', '✓', '✓'],
              [isZh ? '模块Mock' : 'Module Mocking', '✓', '✓'],
              [isZh ? '代码覆盖率' : 'Code Coverage', '✓ (Istanbul)', '✓ (built-in)'],
              [isZh ? 'Watch模式' : 'Watch Mode', '✓', '✓'],
              [isZh ? '并行测试' : 'Parallel Tests', '✓', '✓'],
              [isZh ? 'TypeScript原生' : 'TypeScript Native', isZh ? '需ts-jest' : 'ts-jest required', '✓'],
              [isZh ? 'DOM测试' : 'DOM Testing', isZh ? '需jsdom' : 'jsdom/happy-dom', '✓ (happy-dom)'],
            ].map(([feature, jest, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{jest}</td>
                <td style={{ ...tdStyle, color: bun === '✓' || bun.includes('✓') ? '#22c55e' : 'inherit' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.jestExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Jest - Test example
import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { Calculator } from './calculator';
import { Logger } from './logger';

jest.mock('./logger');

describe('Calculator', () => {
  let calculator: Calculator;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(() => {
    mockLogger = {
      log: jest.fn(),
      error: jest.fn(),
    } as any;
    calculator = new Calculator(mockLogger);
  });

  test('should add numbers correctly', () => {
    expect(calculator.add(2, 3)).toBe(5);
    expect(mockLogger.log).toHaveBeenCalledWith('Adding 2 and 3');
  });

  test('should handle division by zero', () => {
    expect(() => calculator.divide(1, 0)).toThrow('Division by zero');
    expect(mockLogger.error).toHaveBeenCalledWith('Division by zero attempted');
  });

  test('snapshot example', () => {
    const result = calculator.getResult();
    expect(result).toMatchSnapshot();
  });
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#fb923c' }}>{ct.bunTestExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Bun Test - Same test, same API!
import { describe, test, expect, mock, beforeEach } from 'bun:test';
import { Calculator } from './calculator';
import { Logger } from './logger';

mock.module('./logger', () => {
  return {
    Logger: mock(() => ({
      log: mock(() => {}),
      error: mock(() => {}),
    })),
  };
});

describe('Calculator', () => {
  let calculator: Calculator;
  let mockLogger: { log: () => void; error: () => void };

  beforeEach(() => {
    mockLogger = {
      log: mock(() => {}),
      error: mock(() => {}),
    };
    calculator = new Calculator(mockLogger as any);
  });

  test('should add numbers correctly', () => {
    expect(calculator.add(2, 3)).toBe(5);
    expect(mockLogger.log).toHaveBeenCalledWith('Adding 2 and 3');
  });

  test('should handle division by zero', () => {
    expect(() => calculator.divide(1, 0)).toThrow('Division by zero');
    expect(mockLogger.error).toHaveBeenCalledWith('Division by zero attempted');
  });

  test('snapshot example', () => {
    const result = calculator.getResult();
    expect(result).toMatchSnapshot();
  });
});`}</code></pre>

      {/* Running Tests */}
      <h2 style={h2Style}>{isZh ? '运行测试命令' : 'Running Tests'}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Jest</strong>
          <pre style={{ margin: '8px 0 0', fontSize: 13, background: 'transparent', border: 'none', padding: 0 }}><code>{`# Install first
npm install -D jest

# Run tests
npx jest

# Watch mode
npx jest --watch

# Coverage
npx jest --coverage`}</code></pre>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #fb923c' }}>
          <strong style={{ color: '#fb923c' }}>Bun Test</strong>
          <pre style={{ margin: '8px 0 0', fontSize: 13, background: 'transparent', border: 'none', padding: 0 }}><code>{`# No installation needed!

# Run tests
bun test

# Watch mode
bun test --watch

# Coverage
bun test --coverage`}</code></pre>
        </div>
      </div>

      {/* Ecosystem */}
      <h2 style={h2Style}>{ct.ecosystemTitle}</h2>
      <p style={pStyle}>{ct.ecosystemIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Jest</th>
              <th style={thStyle}>Bun Test</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '周下载量' : 'Weekly Downloads', '50M+', 'N/A (built-in)'],
              [isZh ? 'GitHub Stars' : 'GitHub Stars', '44k+', 'Bun: 70k+'],
              [isZh ? '社区大小' : 'Community Size', 'Very Large', 'Growing'],
              [isZh ? '插件数量' : 'Plugin Count', '100+', 'Built-in covers most'],
              [isZh ? 'Stack Overflow' : 'Stack Overflow', '50k+ questions', 'Growing'],
              [isZh ? '企业采用' : 'Enterprise Adoption', 'Widespread', 'Emerging'],
            ].map(([aspect, jest, bun], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{jest}</td>
                <td style={{ ...tdStyle, color: '#fb923c' }}>{bun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #fb923c' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#fb923c' }}>{ct.bunTestBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新Bun项目' : 'New Bun projects'}</li>
            <li>{isZh ? '追求极致速度' : 'Maximum speed needed'}</li>
            <li>{isZh ? '零配置需求' : 'Zero-config desired'}</li>
            <li>{isZh ? 'TypeScript项目' : 'TypeScript projects'}</li>
            <li>{isZh ? '快速反馈循环' : 'Fast feedback loops'}</li>
            <li>{isZh ? '资源受限环境' : 'Resource-constrained environments'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.jestBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Node.js项目' : 'Node.js projects'}</li>
            <li>{isZh ? '遗留代码库' : 'Legacy codebases'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '需要特定插件' : 'Specific plugins needed'}</li>
            <li>{isZh ? '团队熟悉Jest' : 'Team familiar with Jest'}</li>
            <li>{isZh ? '复杂mock需求' : 'Complex mocking needs'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(251,146,60,0.1), rgba(249,115,22,0.1))', borderRadius: 12, border: '1px solid rgba(251,146,60,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#fb923c', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#fb923c', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={'/' + lang + '/tools/regex-tester'} style={{ color: '#fb923c', textDecoration: 'none' }}>Regex Tester</a>
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
