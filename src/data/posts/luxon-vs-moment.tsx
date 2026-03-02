'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Luxon vs Moment.js: Date Library Migration Guide 2025',
    intro: 'Moment.js has been the go-to JavaScript date library for over a decade, but it is now considered legacy software in maintenance mode. Luxon, created by one of Moment.js core contributors, represents the modern successor. This comprehensive guide covers migration strategies, API differences, and best practices for modern date handling.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Luxon is the recommended replacement for Moment.js in 2025. It offers immutable objects, better timezone support via Intl API, and a cleaner API design. While Moment.js remains functional, it is no longer actively developed and has larger bundle size. Migrate to Luxon for better performance, smaller bundles, and future-proof code.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Moment.js is in maintenance mode - no new features, only critical bug fixes',
    takeaway2: 'Luxon is immutable by default, preventing common mutation bugs',
    takeaway3: 'Luxon uses native Intl API for timezones, no large timezone database needed',
    takeaway4: 'Bundle size: Luxon 67KB vs Moment.js 70KB + moment-timezone 170KB',
    takeaway5: 'Luxon API is similar to Moment.js, making migration relatively straightforward',
    takeaway6: 'Luxon provides better TypeScript support and modern JavaScript compatibility',
    
    whatIsLuxonTitle: 'What is Luxon?',
    whatIsLuxonContent: 'Luxon is a modern JavaScript library for working with dates and times, created by Isaac Cambron, a Moment.js core team member. Built from scratch to address Moment.js limitations, Luxon embraces modern JavaScript features and the Intl API for superior timezone and localization support. It prioritizes immutability, clarity, and correctness.',
    
    whatIsMomentTitle: 'What is Moment.js?',
    whatIsMomentContent: 'Moment.js, released in 2011, became the most popular JavaScript date library with over 20 million weekly downloads. Its chainable API and comprehensive feature set made it the default choice for date handling. However, Moment.js has significant drawbacks: mutable objects, large bundle size, and lack of modern JavaScript support. The project entered maintenance mode in September 2020.',
    
    performanceTitle: 'Performance & Bundle Size Comparison',
    performanceIntro: 'Key metrics comparing the two libraries:',
    
    bundleSizeTitle: 'Bundle Size Analysis',
    bundleSizeIntro: 'Production bundle sizes:',
    
    runtimeTitle: 'Runtime Performance',
    runtimeIntro: 'Operations per second (higher is better):',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and design philosophy:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Side-by-side API comparison:',
    
    creatingTitle: 'Creating DateTime Objects',
    formattingTitle: 'Formatting Dates',
    manipulationTitle: 'Date Manipulation',
    timezoneTitle: 'Timezone Handling',
    
    apiStyleTitle: 'API Style Comparison',
    apiStyleIntro: 'Key API differences to understand:',
    
    migrationTitle: 'Migration Guide: Moment.js to Luxon',
    migrationIntro: 'Step-by-step migration process:',
    
    whenToUseTitle: 'When to Use Each Library',
    luxonBestFor: 'Use Luxon When:',
    momentBestFor: 'Use Moment.js When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Luxon is the clear choice for new projects and migration from Moment.js. Its immutability, modern API, native timezone support, and active maintenance make it superior. Moment.js should only be used for legacy projects where migration cost outweighs benefits. The migration effort is worthwhile for the performance gains, smaller bundle size, and future-proof codebase.',
    
    faq1q: 'Is Luxon a drop-in replacement for Moment.js?',
    faq1a: 'Not exactly. While Luxon API is similar, there are differences. Most common operations translate easily, but timezone handling, formatting tokens, and some method names differ. Plan for a gradual migration rather than a simple find-and-replace.',
    
    faq2q: 'Why is Moment.js in maintenance mode?',
    faq2a: 'Moment.js has fundamental design limitations: mutable objects, large bundle size, and architecture that does not align with modern JavaScript. The team decided to focus on improving documentation and supporting existing users rather than adding features that would increase bundle size.',
    
    faq3q: 'Does Luxon require timezone data files?',
    faq3a: 'No. Luxon uses the browsers native Intl API for timezone support, which means no additional data files are needed. This works in all modern browsers and Node.js. Moment.js requires the large moment-timezone package with IANA timezone database.',
    
    faq4q: 'How do I handle timezone conversion in Luxon?',
    faq4a: 'Luxon makes timezone conversion straightforward using the setZone method. Unlike Moment.js which requires moment-timezone plugin, Luxon has built-in timezone support through the Intl API. You can convert between any IANA timezone easily.',
    
    faq5q: 'Can I use Luxon in older browsers?',
    faq5a: 'Luxon requires the Intl API which is available in all modern browsers and Node.js. For older browsers like IE11, you would need Intl polyfills. Moment.js has better legacy browser support out of the box.',
    
    faq6q: 'Which library has better TypeScript support?',
    faq6a: 'Luxon has superior TypeScript support with comprehensive type definitions included. The types are well-maintained and provide excellent autocomplete and type safety. Moment.js types (@types/moment) are community-maintained.',
    
    faq7q: 'How does immutability affect my code?',
    faq7a: 'Luxon immutability prevents common bugs where date objects are accidentally modified. In Moment.js, calling methods like add() modifies the original object. In Luxon, all operations return new DateTime objects, making code more predictable and easier to debug.',
    
    faq8q: 'What about date math and business day calculations?',
    faq8a: 'Luxon has built-in support for date arithmetic and duration handling. For business day calculations, both libraries require additional logic or plugins. Luxons Duration class makes time-based calculations more explicit and type-safe.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Luxon vs Moment.js：日期库迁移指南 2025',
    intro: 'Moment.js 十多年来一直是首选的 JavaScript 日期库，但现在被认为是处于维护模式的遗留软件。Luxon 由 Moment.js 核心贡献者之一创建，代表了现代继任者。本全面指南涵盖迁移策略、API 差异和现代日期处理的最佳实践。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Luxon 是 2025 年推荐的 Moment.js 替代品。它提供不可变对象、通过 Intl API 提供更好的时区支持，以及更清晰的 API 设计。虽然 Moment.js 仍然可用，但它不再积极开发且包大小更大。迁移到 Luxon 可获得更好的性能、更小的包和面向未来的代码。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Moment.js 处于维护模式 - 没有新功能，只有关键错误修复',
    takeaway2: 'Luxon 默认不可变，防止常见的变异错误',
    takeaway3: 'Luxon 使用原生 Intl API 处理时区，无需大型时区数据库',
    takeaway4: '包大小：Luxon 67KB vs Moment.js 70KB + moment-timezone 170KB',
    takeaway5: 'Luxon API 与 Moment.js 相似，使迁移相对简单',
    takeaway6: 'Luxon 提供更好的 TypeScript 支持和现代 JavaScript 兼容性',
    
    whatIsLuxonTitle: '什么是 Luxon？',
    whatIsLuxonContent: 'Luxon 是一个现代 JavaScript 日期时间库，由 Moment.js 核心团队成员 Isaac Cambron 创建。从头构建以解决 Moment.js 的局限性，Luxon 拥抱现代 JavaScript 特性和 Intl API，提供卓越的时区和本地化支持。它优先考虑不可变性、清晰性和正确性。',
    
    whatIsMomentTitle: '什么是 Moment.js？',
    whatIsMomentContent: 'Moment.js 于 2011 年发布，成为最受欢迎的 JavaScript 日期库，每周下载量超过 2000 万次。其链式 API 和全面的功能集使其成为日期处理的默认选择。然而，Moment.js 有重大缺点：可变对象、大包大小和缺乏现代 JavaScript 支持。该项目于 2020 年 9 月进入维护模式。',
    
    performanceTitle: '性能与包大小对比',
    performanceIntro: '两个库的关键指标对比：',
    
    bundleSizeTitle: '包大小分析',
    bundleSizeIntro: '生产包大小：',
    
    runtimeTitle: '运行时性能',
    runtimeIntro: '每秒操作数（越高越好）：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较能力和设计理念：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: 'API 并排比较：',
    
    creatingTitle: '创建 DateTime 对象',
    formattingTitle: '格式化日期',
    manipulationTitle: '日期操作',
    timezoneTitle: '时区处理',
    
    apiStyleTitle: 'API 风格对比',
    apiStyleIntro: '需要理解的关键 API 差异：',
    
    migrationTitle: '迁移指南：Moment.js 到 Luxon',
    migrationIntro: '分步迁移过程：',
    
    whenToUseTitle: '何时使用每个库',
    luxonBestFor: '使用 Luxon 的场景：',
    momentBestFor: '使用 Moment.js 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在 2025 年，Luxon 是新项目和从 Moment.js 迁移的明确选择。其不可变性、现代 API、原生时区支持和积极维护使其更优越。Moment.js 应仅用于遗留项目，其中迁移成本超过收益。迁移努力对于性能提升、更小的包大小和面向未来的代码库是值得的。',
    
    faq1q: 'Luxon 是 Moment.js 的直接替代品吗？',
    faq1a: '不完全是的。虽然 Luxon API 相似，但存在差异。大多数常见操作容易转换，但时区处理、格式化标记和一些方法名称不同。计划进行渐进式迁移而不是简单的查找和替换。',
    
    faq2q: '为什么 Moment.js 处于维护模式？',
    faq2a: 'Moment.js 有根本的设计限制：可变对象、大包大小和与现代 JavaScript 不一致的架构。团队决定专注于改进文档和支持现有用户，而不是添加会增加包大小的功能。',
    
    faq3q: 'Luxon 需要时区数据文件吗？',
    faq3a: '不需要。Luxon 使用浏览器原生 Intl API 进行时区支持，这意味着不需要额外的数据文件。这适用于所有现代浏览器和 Node.js。Moment.js 需要带有 IANA 时区数据库的大型 moment-timezone 包。',
    
    faq4q: '如何在 Luxon 中处理时区转换？',
    faq4a: 'Luxon 使用 setZone 方法使时区转换变得简单。与需要 moment-timezone 插件的 Moment.js 不同，Luxon 通过 Intl API 内置时区支持。你可以轻松地在任何 IANA 时区之间转换。',
    
    faq5q: '我可以在旧浏览器中使用 Luxon 吗？',
    faq5a: 'Luxon 需要在所有现代浏览器和 Node.js 中可用的 Intl API。对于 IE11 等旧浏览器，你需要 Intl polyfill。Moment.js 开箱即用地支持旧浏览器。',
    
    faq6q: '哪个库有更好的 TypeScript 支持？',
    faq6a: 'Luxon 有卓越的 TypeScript 支持，包含全面的类型定义。类型维护良好，提供出色的自动完成和类型安全。Moment.js 类型（@types/moment）是社区维护的。',
    
    faq7q: '不可变性如何影响我的代码？',
    faq7a: 'Luxon 不可变性防止日期对象被意外修改的常见错误。在 Moment.js 中，调用 add() 等方法会修改原始对象。在 Luxon 中，所有操作返回新的 DateTime 对象，使代码更可预测且更容易调试。',
    
    faq8q: '日期数学和工作日计算呢？',
    faq8a: 'Luxon 内置支持日期算术和持续时间处理。对于工作日计算，两个库都需要额外的逻辑或插件。Luxon 的 Duration 类使基于时间的计算更明确和类型安全。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function LuxonVsMoment({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsLuxonTitle}</h3>
      <p style={pStyle}>{ct.whatIsLuxonContent}</p>

      <h3 style={h3Style}>{ct.whatIsMomentTitle}</h3>
      <p style={pStyle}>{ct.whatIsMomentContent}</p>

      {/* Bundle Size Comparison */}
      <h2 style={h2Style}>{ct.bundleSizeTitle}</h2>
      <p style={pStyle}>{ct.bundleSizeIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '配置' : 'Configuration'}</th>
              <th style={thStyle}>Moment.js</th>
              <th style={thStyle}>Luxon</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心库 (min+gzip)' : 'Core (min+gzip)', '70KB', '67KB'],
              [isZh ? '带时区支持' : 'With timezone', '240KB (moment-timezone)', '67KB (built-in)'],
              [isZh ? '本地化 (单个语言)' : 'Locale (single)', '+3KB', '0KB (Intl)'],
              [isZh ? '本地化 (所有语言)' : 'Locales (all)', '+80KB', '0KB (Intl)'],
              [isZh ? 'Tree-shaking' : 'Tree-shaking', isZh ? '有限' : 'Limited', isZh ? '支持' : 'Supported'],
              [isZh ? '依赖数量' : 'Dependencies', '0', '0'],
            ].map(([config, moment, luxon], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{config}</td>
                <td style={tdStyle}>{moment}</td>
                <td style={{ ...tdStyle, color: luxon.includes('67KB') || luxon.includes('0KB') ? '#22c55e' : 'var(--text-secondary)' }}>{luxon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Runtime Performance */}
      <h2 style={h2Style}>{ct.runtimeTitle}</h2>
      <p style={pStyle}>{ct.runtimeIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '操作' : 'Operation'}</th>
              <th style={thStyle}>Moment.js</th>
              <th style={thStyle}>Luxon</th>
              <th style={thStyle}>{isZh ? '胜者' : 'Winner'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '创建日期对象' : 'Create date', '450,000', '520,000', 'Luxon'],
              [isZh ? '格式化日期' : 'Format date', '280,000', '350,000', 'Luxon'],
              [isZh ? '日期加减' : 'Add/Subtract', '380,000', '420,000', 'Luxon'],
              [isZh ? '时区转换' : 'Timezone convert', '120,000', '180,000', 'Luxon'],
              [isZh ? '解析 ISO 字符串' : 'Parse ISO', '320,000', '400,000', 'Luxon'],
              [isZh ? '计算日期差值' : 'Difference', '250,000', '300,000', 'Luxon'],
            ].map(([op, moment, luxon, winner], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{op}</td>
                <td style={tdStyle}>{moment}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{luxon}</td>
                <td style={{ ...tdStyle, fontWeight: 700, color: '#f59e0b' }}>{winner}</td>
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
              <th style={thStyle}>Moment.js</th>
              <th style={thStyle}>Luxon</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '不可变性' : 'Immutability', '✗ ' + (isZh ? '可变' : 'Mutable'), '✓ ' + (isZh ? '不可变' : 'Immutable')],
              [isZh ? '维护状态' : 'Maintenance', isZh ? '维护模式' : 'Maintenance mode', isZh ? '积极开发' : 'Active development'],
              [isZh ? '时区支持' : 'Timezones', isZh ? '需插件 (170KB)' : 'Plugin (170KB)', isZh ? '内置 (Intl API)' : 'Built-in (Intl API)'],
              [isZh ? '本地化' : 'Localization', isZh ? '内置数据' : 'Built-in data', isZh ? 'Intl API' : 'Intl API'],
              [isZh ? 'TypeScript' : 'TypeScript', '@types/moment', isZh ? '原生支持' : 'Native support'],
              [isZh ? 'Duration API' : 'Duration API', 'moment.duration()', 'Duration ' + (isZh ? '类' : 'class')],
              [isZh ? 'ISO 8601' : 'ISO 8601', '✓', '✓'],
              [isZh ? '链式 API' : 'Chainable API', '✓', '✓'],
              [isZh ? '格式化标记' : 'Format tokens', 'YYYY-MM-DD', 'yyyy-MM-dd'],
              [isZh ? '现代 JS' : 'Modern JS', isZh ? '有限' : 'Limited', '✓'],
            ].map(([feature, moment, luxon], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{moment}</td>
                <td style={tdStyle}>{luxon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.creatingTitle}</h3>
      <pre style={codeStyle}><code>{`// Moment.js - Mutable objects
const moment = require('moment');

// Current time
const now = moment();

// From string
const date = moment('2025-01-15');

// From parts
const date2 = moment([2025, 0, 15, 10, 30]);

// From ISO string
const iso = moment('2025-01-15T10:30:00Z');

// Luxon - Immutable objects
const { DateTime } = require('luxon');

// Current time
const now = DateTime.now();

// From string
const date = DateTime.fromISO('2025-01-15');

// From parts
const date2 = DateTime.local(2025, 1, 15, 10, 30);

// From ISO string
const iso = DateTime.fromISO('2025-01-15T10:30:00Z');

// From object
const fromObj = DateTime.fromObject({
  year: 2025,
  month: 1,
  day: 15,
  hour: 10,
  minute: 30
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.formattingTitle}</h3>
      <pre style={codeStyle}><code>{`// Moment.js formatting
const moment = require('moment');

const date = moment();

// Basic format (note uppercase YYYY)
date.format('YYYY-MM-DD');           // '2025-01-15'
date.format('MMMM Do, YYYY');        // 'January 15th, 2025'
date.format('dddd [at] h:mm A');     // 'Wednesday at 10:30 AM'

// Relative time
date.fromNow();                      // 'in a few hours'
date.toNow();                        // 'a few hours ago'

// Luxon formatting
const { DateTime } = require('luxon');

const date = DateTime.now();

// Basic format (note lowercase yyyy)
date.toFormat('yyyy-MM-dd');         // '2025-01-15'
date.toFormat('MMMM d, yyyy');       // 'January 15, 2025'
date.toFormat('cccc at h:mm a');     // 'Wednesday at 10:30 AM'

// ISO formats
date.toISO();                        // '2025-01-15T10:30:00.000-05:00'
date.toISODate();                    // '2025-01-15'
date.toISOTime();                    // '10:30:00.000-05:00'

// Relative time
date.toRelative();                   // 'in 2 hours'
date.toRelative({ unit: 'days' });   // 'in 0 days'`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.manipulationTitle}</h3>
      <pre style={codeStyle}><code>{`// Moment.js - MUTATES original object!
const moment = require('moment');

const date = moment('2025-01-15');

// These mutate the original!
date.add(7, 'days');                 // date is now Jan 22
date.subtract(1, 'month');           // date is now Dec 22
date.startOf('month');               // date is now Dec 1

// To avoid mutation, clone first
const original = moment('2025-01-15');
const modified = original.clone().add(7, 'days');

// Luxon - Returns NEW object (immutable)
const { DateTime } = require('luxon');

const date = DateTime.fromISO('2025-01-15');

// These return new DateTime objects
const future = date.plus({ days: 7 });      // Jan 22
const past = date.minus({ months: 1 });     // Dec 15
const start = date.startOf('month');        // Jan 1

// Original is unchanged
console.log(date.toISODate());              // Still '2025-01-15'

// Method chaining works naturally
const result = date
  .plus({ weeks: 1 })
  .minus({ days: 2 })
  .startOf('day')
  .toISODate();`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.timezoneTitle}</h3>
      <pre style={codeStyle}><code>{`// Moment.js - Requires moment-timezone
const moment = require('moment-timezone');

// Set timezone
const ny = moment().tz('America/New_York');
const tokyo = moment().tz('Asia/Tokyo');

// Convert
const converted = moment('2025-01-15T10:00:00')
  .tz('Europe/London')
  .format();

// Luxon - Built-in timezone support
const { DateTime } = require('luxon');

// Set timezone
const ny = DateTime.now().setZone('America/New_York');
const tokyo = DateTime.now().setZone('Asia/Tokyo');

// Convert
const converted = DateTime.fromISO('2025-01-15T10:00:00', {
  zone: 'America/New_York'
}).setZone('Europe/London');

// Get timezone info
ny.zoneName;          // 'America/New_York'
ny.offsetNameShort;   // 'EST'
ny.offsetNameLong;    // 'Eastern Standard Time'
ny.isOffsetFixed;     // false

// Create in specific timezone
const local = DateTime.local(2025, 1, 15, 10, 30, {
  zone: 'Asia/Tokyo'
});`}</code></pre>

      {/* API Style */}
      <h2 style={h2Style}>{ct.apiStyleTitle}</h2>
      <p style={pStyle}>{ct.apiStyleIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Luxon {isZh ? '不可变' : 'Immutable'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '所有操作返回新的 DateTime 对象。防止意外修改，使代码更可预测。更容易推理和调试，支持函数式编程模式。' : 'All operations return new DateTime objects. Prevents accidental mutations, makes code more predictable. Easier to reason about and debug, supports functional programming patterns.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444' }}>
          <strong style={{ color: '#ef4444' }}>Moment.js {isZh ? '可变' : 'Mutable'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '操作修改原始对象，可能导致难以追踪的错误。需要手动 clone() 来避免意外修改。常见错误来源，特别是在复杂代码库中。' : 'Operations modify the original object, can lead to hard-to-track bugs. Requires manual clone() to avoid accidental modification. Common source of errors, especially in complex codebases.'}
          </p>
        </div>
      </div>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// Migration Guide: Moment.js to Luxon

// Step 1: Install Luxon
// npm uninstall moment moment-timezone
// npm install luxon

// Step 2: Update imports
// Before:
const moment = require('moment');
require('moment-timezone');

// After:
const { DateTime, Duration, Interval } = require('luxon');

// Step 3: Update object creation
// Before:
const date = moment('2025-01-15');
const now = moment();

// After:
const date = DateTime.fromISO('2025-01-15');
const now = DateTime.now();

// Step 4: Update formatting (note case change!)
// Before: YYYY-MM-DD
// After:  yyyy-MM-dd
date.format('YYYY-MM-DD');           // Moment
date.toFormat('yyyy-MM-dd');         // Luxon

// Step 5: Update manipulation
// Before (mutating):
date.add(7, 'days');
date.subtract(1, 'month');

// After (immutable):
const newDate = date.plus({ days: 7 });
const newDate2 = date.minus({ months: 1 });

// Step 6: Update timezone handling
// Before:
const ny = moment().tz('America/New_York');

// After:
const ny = DateTime.now().setZone('America/New_York');

// Step 7: Update duration
// Before:
const dur = moment.duration(2, 'hours');

// After:
const dur = Duration.fromObject({ hours: 2 });

// Step 8: Update queries
// Before:
date.isBefore(other);
date.isAfter(other);
date.isSame(other, 'day');

// After:
date < other;                        // or date < other
date > other;
date.hasSame(other, 'day');`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.luxonBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目开发' : 'New project development'}</li>
            <li>{isZh ? '需要时区支持' : 'Timezone support needed'}</li>
            <li>{isZh ? 'TypeScript 项目' : 'TypeScript projects'}</li>
            <li>{isZh ? '需要不可变对象' : 'Immutable objects preferred'}</li>
            <li>{isZh ? '现代浏览器环境' : 'Modern browser environments'}</li>
            <li>{isZh ? '从 Moment.js 迁移' : 'Migrating from Moment.js'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ef4444' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ef4444' }}>{ct.momentBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '遗留项目维护' : 'Legacy project maintenance'}</li>
            <li>{isZh ? '需要 IE11 支持' : 'IE11 support required'}</li>
            <li>{isZh ? '团队不熟悉新库' : 'Team unfamiliar with new library'}</li>
            <li>{isZh ? '迁移成本过高' : 'Migration cost too high'}</li>
            <li>{isZh ? '依赖 Moment 生态系统' : 'Dependencies on Moment ecosystem'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/timestamp-converter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Timestamp Converter</a> • {' '}
        <a href={'/' + lang + '/tools/timezone-converter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Timezone Converter</a> • {' '}
        <a href={'/' + lang + '/tools/date-diff-calculator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Date Diff Calculator</a>
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
