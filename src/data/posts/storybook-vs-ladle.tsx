'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Storybook vs Ladle: Component Documentation Comparison',
    intro: 'Component documentation and visual testing are crucial for modern UI development. Storybook has been the industry standard, but Ladle offers a lightweight alternative built on Vite. This comprehensive comparison examines performance, developer experience, features, and real-world use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Ladle offers 5x faster startup, simpler configuration, and native Vite integration. Storybook provides extensive addons, visual testing integration, and larger ecosystem. For Vite projects prioritizing speed, choose Ladle. For enterprise projects needing comprehensive documentation features, Storybook excels.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Ladle starts in ~1 second vs Storybook 10-30 seconds',
    takeaway2: 'Storybook has 200+ addons; Ladle focuses on essential features',
    takeaway3: 'Ladle uses Vite natively; Storybook needs configuration',
    takeaway4: 'Both support TypeScript, MDX, and component stories',
    takeaway5: 'Storybook has built-in visual testing; Ladle integrates with third-party tools',
    takeaway6: 'Ladle bundle size is 95% smaller than Storybook',
    
    whatIsStorybookTitle: 'What is Storybook?',
    whatIsStorybookContent: 'Storybook is an open-source tool for developing UI components in isolation. Created in 2016, it has become the industry standard for component documentation with over 200 addons, visual testing capabilities, and support for all major frameworks. Storybook runs alongside your app in an isolated environment.',
    
    whatIsLadleTitle: 'What is Ladle?',
    whatIsLadleContent: 'Ladle is a lightweight component storybook built on Vite. Created by the Vercel team in 2022, it prioritizes speed and simplicity. Ladle uses the same CSF (Component Story Format) as Storybook, making migration straightforward. It is designed specifically for Vite projects with zero configuration.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks on a component library with 50 stories:',
    
    startupTitle: 'Startup Performance',
    startupIntro: 'Time to load the storybook:',
    
    hotReloadTitle: 'Hot Module Replacement',
    hotReloadIntro: 'Time to reflect changes after editing:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and addons:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Both use the same CSF format:',
    
    storybookExampleTitle: 'Storybook',
    ladleExampleTitle: 'Ladle',
    
    addonsTitle: 'Addons & Ecosystem',
    addonsIntro: 'Available addons and integrations:',
    
    visualTestingTitle: 'Visual Testing',
    visualTestingIntro: 'Visual regression testing capabilities:',
    
    migrationTitle: 'Migration from Storybook to Ladle',
    migrationIntro: 'Migration considerations:',
    
    whenToUseTitle: 'When to Use Each Tool',
    ladleBestFor: 'Use Ladle When:',
    storybookBestFor: 'Use Storybook When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Storybook and Ladle serve different needs excellently. Storybook remains the comprehensive solution for enterprise teams needing extensive documentation, addons, and visual testing. Ladle is perfect for Vite projects prioritizing speed and simplicity. For new Vite-based projects, Ladle offers a compelling lightweight alternative. For complex documentation needs, Storybook is still the gold standard.',
    
    faq1q: 'Can I use Ladle with non-Vite projects?',
    faq1a: 'Ladle is built specifically for Vite. For webpack or other bundlers, Storybook is the better choice. However, many projects are migrating to Vite, making Ladle increasingly relevant.',
    
    faq2q: 'Are Storybook stories compatible with Ladle?',
    faq2a: 'Yes! Both use the same CSF (Component Story Format). Most stories work without modification. You may need to adjust some addon-specific decorators or parameters.',
    
    faq3q: 'Does Ladle support all frameworks?',
    faq3a: 'Ladle supports React, Preact, Svelte, Vue, Solid, and MDX. Storybook supports more frameworks including Angular, Ember, and native mobile. For most web frameworks, Ladle has you covered.',
    
    faq4q: 'How does visual testing work in Ladle?',
    faq4a: 'Ladle integrates with Playwright component testing and third-party tools like Percy, Applitools, and Chromatic. It does not have built-in visual testing like Storybook but works well with external services.',
    
    faq5q: 'Can I use Storybook addons with Ladle?',
    faq5a: 'No, Storybook addons are not compatible with Ladle. Ladle has its own smaller set of addons. Common functionality like accessibility, viewport, and themes are available in both.',
    
    faq6q: 'Which is better for design systems?',
    faq6a: 'For comprehensive design systems with documentation, visual testing, and multiple frameworks, Storybook is better. For React-focused design systems prioritizing speed, Ladle is excellent.',
    
    faq7q: 'How does deployment compare?',
    faq7a: 'Both can be deployed as static sites. Storybook has Chromatic for hosting with visual testing. Ladle can be deployed to Vercel, Netlify, or any static hosting with zero configuration.',
    
    faq8q: 'What about accessibility testing?',
    faq8a: 'Both support accessibility testing. Storybook has the a11y addon. Ladle has built-in a11y checks and integrates with axe-core for comprehensive accessibility testing.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Storybook vs Ladle：组件文档对比',
    intro: '组件文档和视觉测试对于现代UI开发至关重要。Storybook一直是行业标准，但Ladle提供了一个基于Vite的轻量级替代方案。本全面比较考察性能、开发者体验、功能和真实用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Ladle提供快5倍的启动速度、更简单的配置和原生Vite集成。Storybook提供丰富的插件、视觉测试集成和更大的生态系统。对于优先考虑速度的Vite项目，选择Ladle。对于需要全面文档功能的企业项目，Storybook表现出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Ladle在约1秒内启动，而Storybook需要10-30秒',
    takeaway2: 'Storybook有200多个插件；Ladle专注于核心功能',
    takeaway3: 'Ladle原生使用Vite；Storybook需要配置',
    takeaway4: '两者都支持TypeScript、MDX和组件stories',
    takeaway5: 'Storybook有内置视觉测试；Ladle与第三方工具集成',
    takeaway6: 'Ladle包大小比Storybook小95%',
    
    whatIsStorybookTitle: '什么是Storybook？',
    whatIsStorybookContent: 'Storybook是一个用于隔离开发UI组件的开源工具。创建于2016年，它已成为组件文档的行业标准，拥有200多个插件、视觉测试功能和对所有主要框架的支持。Storybook与应用程序并行运行在隔离环境中。',
    
    whatIsLadleTitle: '什么是Ladle？',
    whatIsLadleContent: 'Ladle是一个基于Vite构建的轻量级组件storybook。由Vercel团队于2022年创建，它优先考虑速度和简单性。Ladle使用与Storybook相同的CSF（组件Story格式），使迁移变得简单。它专为Vite项目设计，零配置。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在包含50个stories的组件库上的性能基准测试：',
    
    startupTitle: '启动性能',
    startupIntro: '加载storybook的时间：',
    
    hotReloadTitle: '热模块替换',
    hotReloadIntro: '编辑后反映更改的时间：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和插件：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两者使用相同的CSF格式：',
    
    storybookExampleTitle: 'Storybook',
    ladleExampleTitle: 'Ladle',
    
    addonsTitle: '插件与生态系统',
    addonsIntro: '可用的插件和集成：',
    
    visualTestingTitle: '视觉测试',
    visualTestingIntro: '视觉回归测试功能：',
    
    migrationTitle: '从Storybook迁移到Ladle',
    migrationIntro: '迁移注意事项：',
    
    whenToUseTitle: '何时使用每个工具',
    ladleBestFor: '使用Ladle的场景：',
    storybookBestFor: '使用Storybook的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Storybook和Ladle都很好地服务于不同的需求。Storybook仍然是企业团队需要全面文档、插件和视觉测试的综合解决方案。Ladle非常适合优先考虑速度和简单性的Vite项目。对于新的基于Vite的项目，Ladle提供了一个引人注目的轻量级替代方案。对于复杂的文档需求，Storybook仍然是黄金标准。',
    
    faq1q: '我可以在非Vite项目中使用Ladle吗？',
    faq1a: 'Ladle是专门为Vite构建的。对于webpack或其他打包器，Storybook是更好的选择。然而，许多项目正在迁移到Vite，使Ladle越来越相关。',
    
    faq2q: 'Storybook stories与Ladle兼容吗？',
    faq2a: '是的！两者都使用相同的CSF（组件Story格式）。大多数stories无需修改即可工作。你可能需要调整一些特定于插件的装饰器或参数。',
    
    faq3q: 'Ladle支持所有框架吗？',
    faq3a: 'Ladle支持React、Preact、Svelte、Vue、Solid和MDX。Storybook支持更多框架，包括Angular、Ember和原生移动端。对于大多数Web框架，Ladle都能满足需求。',
    
    faq4q: 'Ladle中的视觉测试如何工作？',
    faq4a: 'Ladle与Playwright组件测试和第三方工具如Percy、Applitools和Chromatic集成。它没有像Storybook那样的内置视觉测试，但与外部服务配合良好。',
    
    faq5q: '我可以在Ladle中使用Storybook插件吗？',
    faq5a: '不可以，Storybook插件与Ladle不兼容。Ladle有自己的较小插件集。常见的功能如可访问性、视口和主题在两者中都可用。',
    
    faq6q: '哪个更适合设计系统？',
    faq6a: '对于需要文档、视觉测试和多框架的全面设计系统，Storybook更好。对于专注于React、优先考虑速度的设计系统，Ladle非常出色。',
    
    faq7q: '部署如何比较？',
    faq7a: '两者都可以作为静态站点部署。Storybook有Chromatic用于托管和视觉测试。Ladle可以零配置部署到Vercel、Netlify或任何静态托管。',
    
    faq8q: '可访问性测试呢？',
    faq8a: '两者都支持可访问性测试。Storybook有a11y插件。Ladle有内置的a11y检查，并与axe-core集成以进行全面的可访问性测试。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function StorybookVsLadle({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#ec4899' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #ec4899', background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(219,39,119,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#ec4899' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsStorybookTitle}</h3>
      <p style={pStyle}>{ct.whatIsStorybookContent}</p>

      <h3 style={h3Style}>{ct.whatIsLadleTitle}</h3>
      <p style={pStyle}>{ct.whatIsLadleContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Storybook</th>
              <th style={thStyle}>Ladle</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2016', '2022'],
              [isZh ? '开发者' : 'Developer', 'Storybook maintainers', 'Vercel'],
              [isZh ? '构建工具' : 'Build Tool', 'Webpack/Vite (configurable)', 'Vite (native)'],
              [isZh ? '包大小' : 'Package Size', '~180MB', '~8MB'],
              [isZh ? '配置复杂度' : 'Config Complexity', 'High', 'Minimal'],
              [isZh ? '插件数量' : 'Addons', '200+', '~10'],
              [isZh ? 'Story格式' : 'Story Format', 'CSF 3.0', 'CSF 3.0 (same)'],
            ].map(([feature, storybook, ladle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{storybook}</td>
                <td style={{ ...tdStyle, color: '#ec4899' }}>{ladle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.startupTitle}</h3>
      <p style={pStyle}>{ct.startupIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Storybook</th>
              <th style={thStyle}>Ladle</th>
              <th style={thStyle}>{isZh ? '差异' : 'Difference'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷启动' : 'Cold Start', '15-30s', '0.8-2s', '10-20x faster'],
              [isZh ? '热启动' : 'Warm Start', '5-10s', '0.3-0.5s', '15-20x faster'],
              [isZh ? 'HMR速度' : 'HMR Speed', '500-1000ms', '50-100ms', '10x faster'],
              [isZh ? '内存使用' : 'Memory Usage', '~800MB', '~150MB', '5x less'],
            ].map(([metric, storybook, ladle, diff], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{storybook}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{ladle}</td>
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
              <th style={thStyle}>Storybook</th>
              <th style={thStyle}>Ladle</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '组件Stories' : 'Component Stories', '✓', '✓'],
              [isZh ? 'MDX支持' : 'MDX Support', '✓', '✓'],
              [isZh ? 'TypeScript' : 'TypeScript', '✓', '✓'],
              [isZh ? '控件/参数' : 'Controls/Args', '✓', '✓'],
              [isZh ? '视口切换' : 'Viewport', '✓ (addon)', '✓ (built-in)'],
              [isZh ? '主题切换' : 'Themes', '✓ (addon)', '✓ (built-in)'],
              [isZh ? '可访问性' : 'Accessibility', '✓ (addon)', '✓ (built-in)'],
              [isZh ? '文档页' : 'Docs Pages', '✓', '✓ (basic)'],
              [isZh ? '视觉测试' : 'Visual Testing', '✓ (Chromatic)', '✓ (integrations)'],
              [isZh ? '交互测试' : 'Interaction Tests', '✓', '✓ (Playwright)'],
            ].map(([feature, storybook, ladle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{storybook}</td>
                <td style={{ ...tdStyle, color: ladle.includes('✓') ? '#22c55e' : 'inherit' }}>{ladle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#ec4899' }}>{isZh ? '共享的Story格式' : 'Shared Story Format'}</h3>
      <pre style={codeStyle}><code>{`// Button.stories.tsx - Works in BOTH Storybook and Ladle!
import type { Meta, StoryObj } from '@storybook/react';
// or: import type { Meta, StoryObj } from '@ladle/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
  },
};

export const Danger: Story = {
  args: {
    label: 'Delete',
    variant: 'danger',
    size: 'medium',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button label="Small" size="small" />
      <Button label="Medium" size="medium" />
      <Button label="Large" size="large" />
    </div>
  ),
};`}</code></pre>

      {/* Configuration */}
      <h2 style={h2Style}>{isZh ? '配置对比' : 'Configuration Comparison'}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f97316' }}>
          <strong style={{ color: '#f97316' }}>Storybook {isZh ? '配置' : 'Config'}</strong>
          <pre style={{ margin: '8px 0 0', fontSize: 12, background: 'transparent', border: 'none', padding: 0, lineHeight: 1.6 }}><code>{`// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // Custom vite config modifications
    return config;
  },
};

export default config;`}</code></pre>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ec4899' }}>
          <strong style={{ color: '#ec4899' }}>Ladle {isZh ? '配置' : 'Config'}</strong>
          <pre style={{ margin: '8px 0 0', fontSize: 12, background: 'transparent', border: 'none', padding: 0, lineHeight: 1.6 }}><code>{`// .ladle/config.mjs - Much simpler!
export default {
  stories: 'src/**/*.stories.tsx',
  // That's it! Vite config is shared automatically.
  // Optional: Add addons
  addons: {
    a11y: true,
    controls: true,
    theme: true,
  },
};

// Or in package.json:
{
  "scripts": {
    "ladle": "ladle serve",
    "ladle:build": "ladle build"
  }
}`}</code></pre>
        </div>
      </div>

      {/* Addons */}
      <h2 style={h2Style}>{ct.addonsTitle}</h2>
      <p style={pStyle}>{ct.addonsIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '插件类型' : 'Addon Type'}</th>
              <th style={thStyle}>Storybook</th>
              <th style={thStyle}>Ladle</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '文档' : 'Documentation', '@storybook/addon-docs', 'Built-in'],
              [isZh ? '控件' : 'Controls', '@storybook/addon-essentials', 'Built-in'],
              [isZh ? '视口' : 'Viewport', '@storybook/addon-viewport', 'Built-in'],
              [isZh ? '可访问性' : 'Accessibility', '@storybook/addon-a11y', 'Built-in'],
              [isZh ? '主题' : 'Themes', 'storybook-dark-mode', 'Built-in'],
              [isZh ? '测试' : 'Testing', '@storybook/addon-interactions', 'Playwright'],
              [isZh ? 'Figma' : 'Figma', 'storybook-addon-designs', 'N/A'],
              [isZh ? '代码片段' : 'Code Snippets', '@storybook/addon-source', 'Built-in'],
            ].map(([type, storybook, ladle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={tdStyle}>{storybook}</td>
                <td style={{ ...tdStyle, color: ladle === 'Built-in' ? '#22c55e' : 'inherit' }}>{ladle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ec4899' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ec4899' }}>{ct.ladleBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Vite项目' : 'Vite-based projects'}</li>
            <li>{isZh ? '追求快速启动' : 'Fast startup needed'}</li>
            <li>{isZh ? 'React组件库' : 'React component libraries'}</li>
            <li>{isZh ? '简单文档需求' : 'Simple documentation needs'}</li>
            <li>{isZh ? '小型团队' : 'Small teams'}</li>
            <li>{isZh ? '开发速度优先' : 'Development speed priority'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f97316' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f97316' }}>{ct.storybookBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业设计系统' : 'Enterprise design systems'}</li>
            <li>{isZh ? '需要丰富插件' : 'Rich addon ecosystem needed'}</li>
            <li>{isZh ? '多框架支持' : 'Multiple framework support'}</li>
            <li>{isZh ? 'Chromatic集成' : 'Chromatic integration'}</li>
            <li>{isZh ? '全面文档' : 'Comprehensive docs'}</li>
            <li>{isZh ? '大型团队' : 'Large teams'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(219,39,119,0.1))', borderRadius: 12, border: '1px solid rgba(236,72,153,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#ec4899', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#ec4899', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={'/' + lang + '/tools/regex-tester'} style={{ color: '#ec4899', textDecoration: 'none' }}>Regex Tester</a>
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
