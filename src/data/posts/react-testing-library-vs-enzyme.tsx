'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'React Testing Library vs Enzyme: React Testing Framework Comparison',
    intro: 'React Testing Library and Enzyme are two popular testing utilities for React applications. Enzyme, created by Airbnb in 2015, focuses on component internals and shallow rendering. React Testing Library, maintained by the Testing Library team, emphasizes testing user behavior and accessibility. This comparison examines their philosophies, APIs, and best use cases in 2025.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose React Testing Library for new projects, better testing practices, and alignment with user behavior. Choose Enzyme for legacy codebases or when you need to test implementation details. React Testing Library is the modern standard, while Enzyme is in maintenance mode.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'React Testing Library tests user behavior; Enzyme tests implementation',
    takeaway2: 'Enzyme is in maintenance mode; RTL is actively developed',
    takeaway3: 'RTL encourages better testing practices',
    takeaway4: 'Enzyme requires adapters for React versions',
    takeaway5: 'RTL has better accessibility testing support',
    takeaway6: 'Both work with Jest and other test runners',
    
    whatIsRtlTitle: 'What is React Testing Library?',
    whatIsRtlContent: 'React Testing Library (RTL) is part of the Testing Library family, designed to test React components in a way that resembles how users interact with your application. It provides utilities to query elements by accessible names, text content, and roles, encouraging tests that are resilient to refactoring and focus on user experience.',
    
    whatIsEnzymeTitle: 'What is Enzyme?',
    whatIsEnzymeContent: 'Enzyme is a JavaScript testing utility for React developed by Airbnb. It provides utilities to traverse, manipulate, and assert React component output. Enzyme offers shallow rendering, full DOM rendering, and static rendering, allowing developers to test component internals, state, and props directly.',
    
    philosophyTitle: 'Testing Philosophy',
    philosophyIntro: 'Fundamental differences in testing approach:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of capabilities:',
    
    codeExampleTitle: 'Test Examples',
    codeExampleIntro: 'Writing tests with each library:',
    
    rtlExampleTitle: 'React Testing Library Example',
    enzymeExampleTitle: 'Enzyme Example',
    
    migrationTitle: 'Migration Considerations',
    migrationIntro: 'Moving from Enzyme to RTL:',
    
    useCasesTitle: 'Best Use Cases',
    rtlBestFor: 'React Testing Library is Best For:',
    enzymeBestFor: 'Enzyme is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'React Testing Library has become the industry standard for testing React applications in 2025. Its philosophy of testing user behavior rather than implementation details leads to more maintainable and valuable tests. Enzyme remains useful for legacy codebases and specific scenarios requiring implementation detail testing, but its maintenance mode status and lack of React 18+ support make RTL the clear choice for new projects. The Testing Library ecosystem also provides consistent patterns across frontend frameworks.',
    
    faq1q: 'Should I migrate from Enzyme to React Testing Library?',
    faq1a: 'For new features, definitely use RTL. For existing tests, migration can be gradual. Focus on migrating when refactoring components or when tests become brittle. The migration effort often pays off in more maintainable tests.',
    
    faq2q: 'Can I use both libraries together?',
    faq2a: 'Yes, you can have both installed and use them in different test files. This is common during migration. However, mixing them in the same test file is not recommended as it can lead to confusing test patterns.',
    
    faq3q: 'How do they handle async operations?',
    faq3a: 'RTL provides findBy queries that wait for elements to appear, making async testing straightforward. Enzyme requires manual waiting or additional utilities. RTL\'s built-in async handling is more intuitive and requires less boilerplate.',
    
    faq4q: 'Which is better for testing hooks?',
    faq4a: 'RTL tests hooks indirectly through components, which aligns with how hooks are used. For isolated hook testing, @testing-library/react-hooks is recommended. Enzyme can test hooks but requires more setup and encourages testing implementation.',
    
    faq5q: 'What about snapshot testing?',
    faq5a: 'Both support snapshot testing. RTL\'s approach creates snapshots of rendered output accessible to users. Enzyme\'s shallow rendering can create component tree snapshots. RTL snapshots tend to be more meaningful and less brittle.',
    
    faq6q: 'How do they compare for testing Redux?',
    faq6a: 'RTL encourages testing connected components with a real or mock store, focusing on user interactions. Enzyme can test mapStateToProps/mapDispatchToProps directly. RTL\'s approach leads to better integration tests.',
    
    faq7q: 'Which has better TypeScript support?',
    faq7a: 'Both have good TypeScript support. RTL\'s types are maintained with the library and work well with Jest. Enzyme\'s types are also available but may lag behind React version updates due to maintenance mode.',
    
    faq8q: 'Is Enzyme dead?',
    faq8a: 'Enzyme is in maintenance mode and does not officially support React 18+. While it still works, the React team and community recommend RTL. For long-term project health, RTL is the better investment.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'React Testing Library vs Enzyme：React 测试框架对比',
    intro: 'React Testing Library和Enzyme是两个流行的React应用测试工具。Enzyme由Airbnb于2015年创建，专注于组件内部和浅层渲染。React Testing Library由Testing Library团队维护，强调测试用户行为和可访问性。本比较考察它们在2025年的理念、API和最佳用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为新项目、更好的测试实践和与用户行为一致选择React Testing Library。为遗留代码库或需要测试实现细节时选择Enzyme。React Testing Library是现代标准，而Enzyme处于维护模式。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'React Testing Library测试用户行为；Enzyme测试实现',
    takeaway2: 'Enzyme处于维护模式；RTL积极开发中',
    takeaway3: 'RTL鼓励更好的测试实践',
    takeaway4: 'Enzyme需要针对React版本的适配器',
    takeaway5: 'RTL有更好的可访问性测试支持',
    takeaway6: '两者都与Jest和其他测试运行器配合使用',
    
    whatIsRtlTitle: '什么是React Testing Library？',
    whatIsRtlContent: 'React Testing Library（RTL）是Testing Library家族的一部分，设计用于以类似用户与应用程序交互的方式测试React组件。它提供通过可访问名称、文本内容和角色查询元素的实用工具，鼓励具有重构弹性并专注于用户体验的测试。',
    
    whatIsEnzymeTitle: '什么是Enzyme？',
    whatIsEnzymeContent: 'Enzyme是Airbnb开发的React JavaScript测试实用工具。它提供遍历、操作和断言React组件输出的实用工具。Enzyme提供浅层渲染、完整DOM渲染和静态渲染，允许开发者直接测试组件内部、状态和props。',
    
    philosophyTitle: '测试理念',
    philosophyIntro: '测试方法的根本差异：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '功能并排比较：',
    
    codeExampleTitle: '测试示例',
    codeExampleIntro: '使用每个库编写测试：',
    
    rtlExampleTitle: 'React Testing Library示例',
    enzymeExampleTitle: 'Enzyme示例',
    
    migrationTitle: '迁移考虑',
    migrationIntro: '从Enzyme迁移到RTL：',
    
    useCasesTitle: '最佳用例',
    rtlBestFor: 'React Testing Library最适合：',
    enzymeBestFor: 'Enzyme最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'React Testing Library已成为2025年测试React应用程序的行业标准。其测试用户行为而非实现细节的理念产生了更可维护和有价值的测试。Enzyme对于遗留代码库和需要实现细节测试的特定场景仍然有用，但其维护模式状态和缺乏React 18+支持使RTL成为新项目的明确选择。Testing Library生态系统还提供了跨前端框架的一致模式。',
    
    faq1q: '我应该从Enzyme迁移到React Testing Library吗？',
    faq1a: '对于新功能，绝对使用RTL。对于现有测试，迁移可以逐步进行。在重构组件或测试变得脆弱时专注于迁移。迁移努力通常会通过更可维护的测试得到回报。',
    
    faq2q: '我可以同时使用两个库吗？',
    faq2a: '是的，你可以同时安装它们并在不同的测试文件中使用。这在迁移期间很常见。但是，不建议在同一个测试文件中混合使用，因为这可能导致令人困惑的测试模式。',
    
    faq3q: '它们如何处理异步操作？',
    faq3a: 'RTL提供findBy查询，等待元素出现，使异步测试变得简单。Enzyme需要手动等待或额外的实用工具。RTL的内置异步处理更直观，需要更少的样板代码。',
    
    faq4q: '哪个更适合测试hooks？',
    faq4a: 'RTL通过组件间接测试hooks，这与hooks的使用方式一致。对于隔离的hook测试，推荐使用@testing-library/react-hooks。Enzyme可以测试hooks但需要更多设置并鼓励测试实现。',
    
    faq5q: '快照测试如何？',
    faq5a: '两者都支持快照测试。RTL的方法创建用户可访问的渲染输出快照。Enzyme的浅层渲染可以创建组件树快照。RTL快照往往更有意义，不那么脆弱。',
    
    faq6q: '测试Redux如何比较？',
    faq6a: 'RTL鼓励使用真实或模拟存储测试连接的组件，专注于用户交互。Enzyme可以直接测试mapStateToProps/mapDispatchToProps。RTL的方法产生更好的集成测试。',
    
    faq7q: '哪个TypeScript支持更好？',
    faq7a: '两者都有良好的TypeScript支持。RTL的类型与库一起维护，与Jest配合良好。Enzyme的类型也可用，但由于维护模式可能落后于React版本更新。',
    
    faq8q: 'Enzyme已经死了吗？',
    faq8a: 'Enzyme处于维护模式，不正式支持React 18+。虽然它仍然有效，但React团队和社区推荐RTL。为了项目的长期健康，RTL是更好的投资。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ReactTestingLibraryVsEnzyme({ lang }: { lang: string }) {
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

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsRtlTitle}</h3>
      <p style={pStyle}>{ct.whatIsRtlContent}</p>

      <h3 style={h3Style}>{ct.whatIsEnzymeTitle}</h3>
      <p style={pStyle}>{ct.whatIsEnzymeContent}</p>

      {/* Philosophy Table */}
      <h2 style={h2Style}>{ct.philosophyTitle}</h2>
      <p style={pStyle}>{ct.philosophyIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>React Testing Library</th>
              <th style={thStyle}>Enzyme</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '测试焦点' : 'Test Focus', isZh ? '用户行为' : 'User Behavior', isZh ? '实现细节' : 'Implementation Details'],
              [isZh ? '查询方式' : 'Query Method', isZh ? '角色、文本、标签' : 'Role, Text, Label', isZh ? 'CSS选择器、组件' : 'CSS Selector, Component'],
              [isZh ? '渲染策略' : 'Render Strategy', isZh ? '完整DOM' : 'Full DOM', isZh ? '浅层、完整、静态' : 'Shallow, Full, Static'],
              [isZh ? '重构弹性' : 'Refactor Resilience', isZh ? '高' : 'High', isZh ? '低' : 'Low'],
              [isZh ? '可访问性' : 'Accessibility', isZh ? '核心关注' : 'Core Focus', isZh ? '次要' : 'Secondary'],
            ].map(([aspect, rtl, enzyme], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{rtl}</td>
                <td style={tdStyle}>{enzyme}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features Table */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>React Testing Library</th>
              <th style={thStyle}>Enzyme</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'React版本支持' : 'React Version Support', '16.8+, 17, 18', '16.x (维护模式)'],
              [isZh ? '状态访问' : 'State Access', isZh ? '不推荐' : 'Discouraged', isZh ? '完全支持' : 'Full Support'],
              [isZh ? 'Props检查' : 'Props Inspection', isZh ? '不推荐' : 'Discouraged', isZh ? '完全支持' : 'Full Support'],
              [isZh ? '事件模拟' : 'Event Simulation', 'fireEvent, userEvent', 'simulate()'],
              [isZh ? '异步工具' : 'Async Utilities', 'waitFor, findBy*', isZh ? '需要额外工具' : 'Requires extra utils'],
              [isZh ? '快照测试' : 'Snapshot Testing', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '适配器需求' : 'Adapter Required', isZh ? '否' : 'No', isZh ? '是' : 'Yes'],
              [isZh ? '维护状态' : 'Maintenance Status', isZh ? '活跃开发' : 'Active Dev', isZh ? '维护模式' : 'Maintenance Mode'],
            ].map(([feature, rtl, enzyme], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{rtl}</td>
                <td style={tdStyle}>{enzyme}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#61dafb' }}>{ct.rtlExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// React Testing Library Test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('should submit form with valid credentials', async () => {
    const mockOnSubmit = jest.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    // Query by role and label - user-centric
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    // Simulate user interactions
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);
    
    // Assert behavior
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123',
      });
    });
  });

  it('should show error for invalid email', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    await userEvent.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(submitButton);
    
    // findBy for async elements
    const errorMessage = await screen.findByText(/invalid email/i);
    expect(errorMessage).toBeVisible();
  });

  it('should render accessible form', () => {
    render(<LoginForm />);
    
    // Test accessibility
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
    
    // Check labels are associated
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
  });
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#9c27b0' }}>{ct.enzymeExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Enzyme Test
import { shallow, mount } from 'enzyme';
import LoginForm from './LoginForm';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('LoginForm', () => {
  it('should update state on input change', () => {
    const wrapper = shallow(<LoginForm />);
    
    // Access component internals directly
    const emailInput = wrapper.find('input[type="email"]');
    emailInput.simulate('change', {
      target: { value: 'user@example.com', name: 'email' }
    });
    
    // Check internal state
    expect(wrapper.state('email')).toBe('user@example.com');
    expect(wrapper.state('password')).toBe('');
  });

  it('should call onSubmit with form data', () => {
    const mockOnSubmit = jest.fn();
    const wrapper = shallow(<LoginForm onSubmit={mockOnSubmit} />);
    
    // Set state directly
    wrapper.setState({
      email: 'user@example.com',
      password: 'password123'
    });
    
    // Find and simulate
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
  });

  it('should render with correct props', () => {
    const wrapper = shallow(
      <LoginForm title="Login" showRememberMe={true} />
    );
    
    // Check props
    expect(wrapper.prop('title')).toBe('Login');
    
    // Check conditional rendering
    expect(wrapper.find('.remember-me').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
  });
});`}</code></pre>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #61dafb' }}>
          <strong style={{ color: '#61dafb' }}>{isZh ? '常见迁移模式' : 'Common Migration Patterns'}</strong>
          <ul style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
            <li><code>wrapper.find(&apos;selector&apos;)</code> → <code>screen.getByRole/Text</code></li>
            <li><code>wrapper.state()</code> → {isZh ? '测试副作用和输出' : 'Test side effects and output'}</li>
            <li><code>wrapper.prop()</code> → {isZh ? '测试渲染输出' : 'Test rendered output'}</li>
            <li><code>.simulate(&apos;click&apos;)</code> → <code>fireEvent.click</code> / <code>userEvent.click</code></li>
            <li><code>.setProps()</code> → <code>rerender(&lt;Component .../&gt;)</code></li>
          </ul>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>{isZh ? '迁移建议' : 'Migration Tips'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '从关键用户路径开始迁移。优先迁移失败的测试。删除测试实现细节的测试，编写关注用户行为的新测试。使用eslint-plugin-testing-library强制执行最佳实践。' : 'Start migration with critical user paths. Prioritize failing tests. Delete tests that check implementation details and write new tests focused on user behavior. Use eslint-plugin-testing-library to enforce best practices.'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #61dafb' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#61dafb' }}>{ct.rtlBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目' : 'New projects'}</li>
            <li>{isZh ? 'React 17/18应用' : 'React 17/18 apps'}</li>
            <li>{isZh ? '集成测试' : 'Integration tests'}</li>
            <li>{isZh ? '可访问性测试' : 'Accessibility testing'}</li>
            <li>{isZh ? '用户行为测试' : 'User behavior testing'}</li>
            <li>{isZh ? '跨框架一致性' : 'Cross-framework consistency'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #9c27b0' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#9c27b0' }}>{ct.enzymeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '遗留代码库' : 'Legacy codebases'}</li>
            <li>{isZh ? 'React 16项目' : 'React 16 projects'}</li>
            <li>{isZh ? '单元测试内部逻辑' : 'Unit testing internal logic'}</li>
            <li>{isZh ? '快速组件检查' : 'Quick component inspection'}</li>
            <li>{isZh ? '状态管理测试' : 'State management testing'}</li>
            <li>{isZh ? '渐进式迁移' : 'Gradual migration'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/javascript-minifier"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JavaScript Minifier</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a>
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
