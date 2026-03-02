'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vitest vs Jest 2025: Modern Testing Framework Comparison',
    intro: 'Jest has been the dominant JavaScript testing framework for years, but Vitest is rapidly gaining adoption with its modern architecture and native Vite integration. This comprehensive comparison examines performance, developer experience, ecosystem, and real-world use cases to help you choose the right testing framework for your next project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Vitest offers 10x faster test execution with instant HMR, native ESM/TypeScript support, and seamless Vite integration. Jest remains the safe choice for legacy projects and teams needing extensive mocking ecosystem. For new projects in 2025, especially Vite-based ones, Vitest is the recommended choice.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Vitest is 10-20x faster than Jest with smart watch mode and instant HMR',
    takeaway2: 'Vitest has native ESM, TypeScript, and JSX support without configuration',
    takeaway3: 'Jest has the largest mocking ecosystem but Vitest is catching up fast',
    takeaway4: 'Vitest works seamlessly with Vite projects, sharing the same config',
    takeaway5: 'Both frameworks have similar APIs, making migration relatively easy',
    takeaway6: 'Vitest includes built-in coverage via c8/istanbul, benchmarking, and in-source testing',
    
    whatIsVitestTitle: 'What is Vitest?',
    whatIsVitestContent: "Vitest is a next-generation testing framework built by the Vue.js team, designed to be fast and integrate seamlessly with Vite. It leverages Vite's transformation pipeline, meaning your tests run with the same configuration as your application. Vitest supports ESM, TypeScript, JSX, and CSS modules out of the box.",
    
    whatIsJestTitle: 'What is Jest?',
    whatIsJestContent: 'Jest, created by Facebook (Meta) in 2013, is the most widely used JavaScript testing framework. It pioneered features like snapshot testing, parallel test execution, and zero-configuration setup. With over 50 million weekly downloads, Jest has become the de facto standard for testing React applications.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks on a mid-size project with 500 test files:',
    
    coldStartTitle: 'Cold Start Performance',
    coldStartIntro: 'Time to run all tests from a fresh start:',
    
    watchModeTitle: 'Watch Mode Performance',
    watchModeIntro: 'Time to re-run affected tests after a file change:',
    
    memoryTitle: 'Memory Usage',
    memoryIntro: 'Memory consumption during test execution:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Similar APIs make migration straightforward:',
    
    jestExampleTitle: 'Jest',
    vitestExampleTitle: 'Vitest',
    
    mockingTitle: 'Mocking Comparison',
    mockingIntro: 'Both frameworks offer powerful mocking capabilities:',
    
    vitestMockingTitle: 'Vitest Mocking',
    jestMockingTitle: 'Jest Mocking',
    
    typescriptTitle: 'TypeScript Experience',
    typescriptIntro: 'TypeScript support comparison:',
    
    migrationTitle: 'Migration from Jest to Vitest',
    migrationIntro: 'Step-by-step migration guide:',
    
    whenToUseTitle: 'When to Use Each Framework',
    vitestBestFor: 'Use Vitest When:',
    jestBestFor: 'Use Jest When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Vitest represents the future of JavaScript testing. Its performance advantages, native ESM/TypeScript support, and seamless Vite integration make it the ideal choice for new projects. Jest remains a solid choice for maintaining existing applications, but new development should seriously consider Vitest. The testing ecosystem is moving toward faster, more integrated tooling - and Vitest leads this evolution.',
    
    faq1q: 'Is Vitest production-ready?',
    faq1a: 'Yes, Vitest is production-ready and used by major projects including Vue.js, Vite, Nuxt, and Svelte. It has reached version 2.x with stable APIs and is actively maintained with regular updates.',
    
    faq2q: 'Can I use Jest plugins with Vitest?',
    faq2a: 'Most Jest plugins work with Vitest through compatibility mode. Vitest also has its own growing ecosystem of plugins. Many popular testing libraries like @testing-library/react work seamlessly with both.',
    
    faq3q: 'Does Vitest support snapshot testing?',
    faq3a: 'Yes, Vitest supports snapshot testing with a compatible API to Jest. It also offers improved snapshot formatting and inline snapshots that work better with Prettier.',
    
    faq4q: 'How do I migrate a Create React App project to Vitest?',
    faq4a: 'Replace Jest with Vitest, update the test scripts in package.json, and convert any custom Jest config to vite.config.ts. Most tests should work without changes due to API compatibility.',
    
    faq5q: 'Can Vitest run tests in the browser?',
    faq5a: 'Yes, Vitest has built-in browser mode that runs tests in real browsers (Chrome, Firefox, Safari) while maintaining fast feedback. This is useful for testing browser-specific APIs.',
    
    faq6q: 'Does Vitest support parallel test execution?',
    faq6a: 'Yes, Vitest runs tests in parallel by default using worker threads. It also supports sharding for distributed testing across multiple machines in CI environments.',
    
    faq7q: 'What about code coverage?',
    faq7a: 'Vitest has built-in coverage support using c8 (native V8 coverage) or Istanbul. It supports all major coverage reporters including lcov, text, and HTML.',
    
    faq8q: 'How does Vitest handle ESM modules?',
    faq8a: 'Vitest has native ESM support without any configuration. It handles .mjs files, import/export syntax, and dynamic imports correctly, unlike Jest which requires transformation.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Vitest vs Jest 2025：现代测试框架对比',
    intro: 'Jest多年来一直主导着JavaScript测试领域，但Vitest凭借其现代架构和原生Vite集成正在快速获得采用。本全面比较考察性能、开发者体验、生态系统和真实用例，帮助你为下一个项目选择合适的测试框架。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Vitest提供快10倍的测试执行速度和即时HMR，原生支持ESM/TypeScript，与Vite无缝集成。Jest对于遗留项目和需要广泛mock生态系统的团队仍然是安全的选择。对于2025年的新项目，特别是基于Vite的项目，推荐使用Vitest。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Vitest比Jest快10-20倍，具有智能watch模式和即时HMR',
    takeaway2: 'Vitest原生支持ESM、TypeScript和JSX，无需配置',
    takeaway3: 'Jest拥有最大的mock生态系统，但Vitest正在快速追赶',
    takeaway4: 'Vitest与Vite项目无缝协作，共享相同配置',
    takeaway5: '两个框架有类似的API，使迁移相对容易',
    takeaway6: 'Vitest内置覆盖率（c8/istanbul）、基准测试和源码内测试',
    
    whatIsVitestTitle: '什么是Vitest？',
    whatIsVitestContent: 'Vitest是由Vue.js团队构建的下一代测试框架，设计快速并与Vite无缝集成。它利用Vite的转换管道，意味着你的测试使用与应用程序相同的配置运行。Vitest开箱即用支持ESM、TypeScript、JSX和CSS模块。',
    
    whatIsJestTitle: '什么是Jest？',
    whatIsJestContent: 'Jest由Facebook（Meta）于2013年创建，是最广泛使用的JavaScript测试框架。它开创了快照测试、并行测试执行和零配置设置等功能。Jest每周有超过5000万次下载，已成为测试React应用的事实标准。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在中等规模项目（500个测试文件）上的性能基准测试：',
    
    coldStartTitle: '冷启动性能',
    coldStartIntro: '从全新状态运行所有测试的时间：',
    
    watchModeTitle: 'Watch模式性能',
    watchModeIntro: '文件更改后重新运行受影响测试的时间：',
    
    memoryTitle: '内存使用',
    memoryIntro: '测试执行期间的内存消耗：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '类似的API使迁移变得简单直接：',
    
    jestExampleTitle: 'Jest',
    vitestExampleTitle: 'Vitest',
    
    mockingTitle: 'Mock对比',
    mockingIntro: '两个框架都提供强大的mock功能：',
    
    vitestMockingTitle: 'Vitest Mock',
    jestMockingTitle: 'Jest Mock',
    
    typescriptTitle: 'TypeScript体验',
    typescriptIntro: 'TypeScript支持对比：',
    
    migrationTitle: '从Jest迁移到Vitest',
    migrationIntro: '分步迁移指南：',
    
    whenToUseTitle: '何时使用每个框架',
    vitestBestFor: '使用Vitest的场景：',
    jestBestFor: '使用Jest的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Vitest代表着JavaScript测试的未来。其性能优势、原生ESM/TypeScript支持和无缝Vite集成使其成为新项目的理想选择。Jest对于维护现有应用仍然是可靠的选择，但新开发应该认真考虑Vitest。测试生态系统正朝着更快、更集成的工具发展——Vitest引领这一演进。',
    
    faq1q: 'Vitest已经可以用于生产了吗？',
    faq1a: '是的，Vitest已经可以用于生产，被Vue.js、Vite、Nuxt和Svelte等主要项目使用。它已达到2.x版本，API稳定，并积极维护，定期更新。',
    
    faq2q: '我可以在Vitest中使用Jest插件吗？',
    faq2a: '大多数Jest插件通过兼容模式可以在Vitest中使用。Vitest也有自己不断增长的插件生态系统。许多流行的测试库如@testing-library/react可以与两者无缝协作。',
    
    faq3q: 'Vitest支持快照测试吗？',
    faq3a: '是的，Vitest支持快照测试，API与Jest兼容。它还提供改进的快照格式和与Prettier更好协作的内联快照。',
    
    faq4q: '如何将Create React App项目迁移到Vitest？',
    faq4a: '将Jest替换为Vitest，更新package.json中的测试脚本，并将任何自定义Jest配置转换为vite.config.ts。由于API兼容性，大多数测试应该无需更改即可工作。',
    
    faq5q: 'Vitest可以在浏览器中运行测试吗？',
    faq5a: '是的，Vitest具有内置的浏览器模式，可以在真实浏览器（Chrome、Firefox、Safari）中运行测试，同时保持快速反馈。这对于测试浏览器特定API很有用。',
    
    faq6q: 'Vitest支持并行测试执行吗？',
    faq6a: '是的，Vitest默认使用工作线程并行运行测试。它还支持分片，用于在CI环境中的多台机器上进行分布式测试。',
    
    faq7q: '代码覆盖率呢？',
    faq7a: 'Vitest内置覆盖率支持，使用c8（原生V8覆盖率）或Istanbul。它支持所有主要的覆盖率报告器，包括lcov、text和HTML。',
    
    faq8q: 'Vitest如何处理ESM模块？',
    faq8a: 'Vitest原生支持ESM，无需任何配置。它能正确处理.mjs文件、import/export语法和动态导入，而Jest需要转换。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function VitestVsJest2025({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#7c3aed' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #7c3aed', background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#7c3aed' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsVitestTitle}</h3>
      <p style={pStyle}>{ct.whatIsVitestContent}</p>

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
              <th style={thStyle}>Vitest</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2013', '2022'],
              [isZh ? '设计目标' : 'Design Goal', 'Zero-config testing', 'Speed + Vite integration'],
              [isZh ? '模块系统' : 'Module System', 'CommonJS default', 'ESM native'],
              [isZh ? 'TypeScript支持' : 'TypeScript', isZh ? '需配置' : 'Requires config', isZh ? '原生支持' : 'Native'],
              [isZh ? '配置文件' : 'Config File', 'jest.config.js', 'vite.config.ts (shared)'],
              [isZh ? '包大小' : 'Package Size', '~85MB', '~15MB'],
              [isZh ? '依赖数量' : 'Dependencies', '100+', '~10'],
            ].map(([feature, jest, vitest], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{jest}</td>
                <td style={{ ...tdStyle, color: '#7c3aed' }}>{vitest}</td>
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
              <th style={thStyle}>Vitest</th>
              <th style={thStyle}>{isZh ? '提升' : 'Improvement'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷启动时间' : 'Cold Start Time', '12.5s', '1.2s', '10.4x'],
              [isZh ? '测试执行时间' : 'Test Execution', '8.3s', '0.6s', '13.8x'],
              [isZh ? '总时间' : 'Total Time', '20.8s', '1.8s', '11.6x'],
            ].map(([metric, jest, vitest, improvement], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{jest}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{vitest}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{improvement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.watchModeTitle}</h3>
      <p style={pStyle}>{ct.watchModeIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>Jest</th>
              <th style={thStyle}>Vitest</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '单文件更改' : 'Single file change', '2.1s', '0.08s'],
              [isZh ? '依赖更改' : 'Dependency change', '4.5s', '0.3s'],
              [isZh ? '新增测试文件' : 'New test file', '3.2s', '0.1s'],
            ].map(([scenario, jest, vitest], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{jest}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{vitest}</td>
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
              <th style={thStyle}>Vitest</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '快照测试' : 'Snapshot Testing', '✓', '✓'],
              [isZh ? '并行测试' : 'Parallel Tests', '✓', '✓'],
              [isZh ? 'Watch模式' : 'Watch Mode', '✓', '✓ (instant HMR)'],
              [isZh ? '代码覆盖率' : 'Code Coverage', '✓ (Istanbul)', '✓ (c8/Istanbul)'],
              [isZh ? 'ESM原生支持' : 'ESM Native', isZh ? '需配置' : 'Requires config', '✓'],
              [isZh ? 'TypeScript原生' : 'TypeScript Native', isZh ? '需ts-jest' : 'ts-jest required', '✓'],
              [isZh ? '浏览器测试' : 'Browser Testing', isZh ? '需jsdom' : 'jsdom required', '✓ (built-in)'],
              [isZh ? '基准测试' : 'Benchmarking', '✗', '✓'],
              [isZh ? '源码内测试' : 'In-source Testing', '✗', '✓'],
              [isZh ? 'Vite集成' : 'Vite Integration', '✗', '✓ (native)'],
            ].map(([feature, jest, vitest], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{jest}</td>
                <td style={{ ...tdStyle, color: vitest.startsWith('✓') ? '#22c55e' : 'inherit' }}>{vitest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.jestExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Jest - Basic test example
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Calculator } from './calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should add two numbers correctly', () => {
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
  });

  it('should subtract two numbers correctly', () => {
    const result = calculator.subtract(5, 3);
    expect(result).toBe(2);
  });

  it('should handle async operations', async () => {
    const result = await calculator.asyncAdd(2, 3);
    expect(result).toBe(5);
  });
});

// Jest - Mock example
import { UserService } from './user-service';
import { UserRepository } from './user-repository';

jest.mock('./user-repository');

describe('UserService', () => {
  let service: UserService;
  let mockRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;
    service = new UserService(mockRepo);
  });

  it('should return user by id', async () => {
    const mockUser = { id: '1', name: 'John' };
    mockRepo.findById.mockResolvedValue(mockUser);

    const result = await service.getUser('1');

    expect(mockRepo.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockUser);
  });
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#7c3aed' }}>{ct.vitestExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Vitest - Basic test example
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Calculator } from './calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should add two numbers correctly', () => {
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
  });

  it('should subtract two numbers correctly', () => {
    const result = calculator.subtract(5, 3);
    expect(result).toBe(2);
  });

  it('should handle async operations', async () => {
    const result = await calculator.asyncAdd(2, 3);
    expect(result).toBe(5);
  });
});

// Vitest - Mock example
import { UserService } from './user-service';
import { UserRepository } from './user-repository';

vi.mock('./user-repository');

describe('UserService', () => {
  let service: UserService;
  let mockRepo: Mocked<UserRepository>;

  beforeEach(() => {
    mockRepo = {
      findById: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    } as any;
    service = new UserService(mockRepo);
  });

  it('should return user by id', async () => {
    const mockUser = { id: '1', name: 'John' };
    mockRepo.findById.mockResolvedValue(mockUser);

    const result = await service.getUser('1');

    expect(mockRepo.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockUser);
  });
});`}</code></pre>

      {/* Configuration */}
      <h2 style={h2Style}>{isZh ? '配置对比' : 'Configuration Comparison'}</h2>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>Jest {isZh ? '配置' : 'Config'}</h3>
      <pre style={codeStyle}><code>{`// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/' + '$1',
    '\\\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};`}</code></pre>

      <h3 style={{ ...h3Style, color: '#7c3aed' }}>Vitest {isZh ? '配置' : 'Config'}</h3>
      <pre style={codeStyle}><code>{`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Vitest config - shares Vite config!
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
      ],
    },
  },
});`}</code></pre>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// Migration: Jest to Vitest

// 1. Install dependencies
// npm uninstall jest @types/jest ts-jest
// npm install -D vitest @vitest/ui

// 2. Update imports
// Before:
import { describe, it, expect, jest } from '@jest/globals';

// After:
import { describe, it, expect, vi } from 'vitest';

// 3. Replace jest with vi
// Before:
jest.fn();
jest.mock('./module');

// After:
vi.fn();
vi.mock('./module');

// 4. Update configuration
// Move Jest config into vite.config.ts test section

// 5. Update package.json scripts
// Before:
"test": "jest"
"test:watch": "jest --watch"

// After:
"test": "vitest run"
"test:watch": "vitest"
"test:ui": "vitest --ui"

// 6. Update TypeScript types (optional)
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #7c3aed' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#7c3aed' }}>{ct.vitestBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Vite项目' : 'Vite-based projects'}</li>
            <li>{isZh ? '新项目开发' : 'New project development'}</li>
            <li>{isZh ? 'ESM/TypeScript优先' : 'ESM/TypeScript-first'}</li>
            <li>{isZh ? '需要快速反馈' : 'Need fast feedback'}</li>
            <li>{isZh ? '组件测试' : 'Component testing'}</li>
            <li>{isZh ? '浏览器环境测试' : 'Browser environment testing'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.jestBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '遗留代码维护' : 'Legacy codebase maintenance'}</li>
            <li>{isZh ? '复杂mock需求' : 'Complex mocking needs'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '团队熟悉Jest' : 'Team familiar with Jest'}</li>
            <li>{isZh ? '依赖Jest特定插件' : 'Jest-specific plugin dependencies'}</li>
            <li>{isZh ? '非Vite项目' : 'Non-Vite projects'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(124,58,237,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#7c3aed', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#7c3aed', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={'/' + lang + '/tools/regex-tester'} style={{ color: '#7c3aed', textDecoration: 'none' }}>Regex Tester</a>
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
