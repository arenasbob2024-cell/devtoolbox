'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'date-fns vs Day.js: Modern Date Library Comparison 2025',
    intro: 'Date handling in JavaScript has evolved significantly. date-fns and Day.js represent two modern approaches to replace the legacy Moment.js. This comprehensive comparison examines performance, bundle size, API design, and real-world use cases to help you choose the right date library for your next project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'date-fns offers a functional, modular approach with excellent tree-shaking (75KB total, import only what you need). Day.js provides a lightweight, chainable API (2KB) as a direct Moment.js replacement. For bundle-conscious projects, Day.js wins on size. For TypeScript projects needing individual functions, date-fns is superior.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Day.js is dramatically smaller (2KB vs 75KB) with a familiar Moment.js API',
    takeaway2: 'date-fns is fully modular - tree-shaking reduces actual bundle impact significantly',
    takeaway3: 'date-fns offers superior TypeScript support with precise type inference',
    takeaway4: 'Day.js provides chainable API, date-fns uses pure functions',
    takeaway5: 'Both are immutable and support modern JavaScript environments',
    takeaway6: 'date-fns has more utility functions (200+) vs Day.js plugins approach',
    
    whatIsDateFnsTitle: 'What is date-fns?',
    whatIsDateFnsContent: 'date-fns is a modern JavaScript date utility library that provides comprehensive toolset for manipulating dates. Created in 2015, it follows a functional programming paradigm where each function is a separate module. This design enables excellent tree-shaking, meaning you only bundle the functions you actually use. With over 200 functions, it covers virtually every date manipulation need.',
    
    whatIsDayJsTitle: 'What is Day.js?',
    whatIsDayJsContent: 'Day.js is a minimalist JavaScript library for parsing, validating, manipulating, and displaying dates. Created in 2018 as a lightweight alternative to Moment.js, it maintains a nearly identical API while being just 2KB minified and gzipped. It uses a chainable API pattern and achieves most functionality through optional plugins, keeping the core extremely lean.',
    
    performanceTitle: 'Performance & Bundle Size Comparison',
    performanceIntro: 'Bundle size and runtime performance metrics:',
    
    bundleSizeTitle: 'Bundle Size Impact',
    bundleSizeIntro: 'Actual bundle sizes in production builds:',
    
    runtimeTitle: 'Runtime Performance',
    runtimeIntro: 'Operations per second (higher is better):',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing core capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Side-by-side comparison of common date operations:',
    
    dateFormattingTitle: 'Date Formatting',
    dateManipulationTitle: 'Date Manipulation',
    dateParsingTitle: 'Date Parsing',
    dateDifferenceTitle: 'Date Difference',
    
    apiStyleTitle: 'API Style Comparison',
    apiStyleIntro: 'Understanding the fundamental differences:',
    
    typescriptTitle: 'TypeScript Experience',
    typescriptIntro: 'TypeScript support comparison:',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'How to migrate from Moment.js or between libraries:',
    
    whenToUseTitle: 'When to Use Each Library',
    dateFnsBestFor: 'Use date-fns When:',
    dayjsBestFor: 'Use Day.js When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both date-fns and Day.js are excellent choices, serving different needs. Day.js is ideal for projects prioritizing minimal bundle size and developers familiar with Moment.js API. date-fns excels in TypeScript projects, applications needing many date operations, and teams preferring functional programming. The choice ultimately depends on your specific requirements: bundle size sensitivity vs comprehensive functionality.',
    
    faq1q: 'Which library is better for bundle size?',
    faq1a: 'Day.js wins for minimal bundle impact at just 2KB. However, date-fns tree-shaking means you only include functions you use. For 5-10 commonly used functions, date-fns adds only 5-15KB to your bundle.',
    
    faq2q: 'Can I use Day.js as a drop-in replacement for Moment.js?',
    faq2a: 'Yes, Day.js API is intentionally designed to be nearly identical to Moment.js. Most code can be migrated by simply changing the import. Some advanced features require plugins, but common operations work the same way.',
    
    faq3q: 'Which library has better TypeScript support?',
    faq3a: 'date-fns has superior TypeScript support with precise type inference for all functions. Each function has explicit parameter and return types. Day.js types are good but less granular, especially with plugin-added methods.',
    
    faq4q: 'How do I handle timezones?',
    faq4a: 'date-fns-tz provides comprehensive timezone support for date-fns. Day.js has a timezone plugin. Both handle timezone conversions and formatting well, though date-fns-tz offers more granular control.',
    
    faq5q: 'Are both libraries immutable?',
    faq5a: 'Yes, both libraries are immutable by default. date-fns functions always return new Date objects. Day.js returns new Day.js objects for all operations, unlike the mutable Moment.js.',
    
    faq6q: 'Which library is faster?',
    faq6a: 'Day.js is generally faster for simple operations due to its minimal overhead. date-fns can be faster for complex operations because each function is optimized independently. Performance differences are negligible for most applications.',
    
    faq7q: 'Can I use these libraries in Node.js and browsers?',
    faq7a: 'Yes, both libraries work in Node.js, browsers, and are compatible with bundlers like webpack, Vite, and Rollup. They also support edge runtimes like Cloudflare Workers.',
    
    faq8q: 'How do I format dates for different locales?',
    faq8a: 'date-fns has built-in locale support with 100+ locales. Day.js requires the localizedFormat plugin and locale files. Both handle internationalization well, with date-fns having slightly better locale typing.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'date-fns vs Day.js：现代日期库对比 2025',
    intro: 'JavaScript 中的日期处理已经显著演进。date-fns 和 Day.js 代表了替代传统 Moment.js 的两种现代方法。本全面对比考察性能、包大小、API 设计和实际用例，帮助你为下一个项目选择合适的日期库。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'date-fns 提供函数式、模块化方法，具有出色的 tree-shaking（总计 75KB，只导入需要的部分）。Day.js 提供轻量级、链式 API（2KB）作为 Moment.js 的直接替代品。对于注重包大小的项目，Day.js 在体积上胜出。对于需要单独函数的 TypeScript 项目，date-fns 更优。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Day.js 体积极小（2KB vs 75KB），API 与 Moment.js 相似',
    takeaway2: 'date-fns 完全模块化 - tree-shaking 显著降低实际打包体积',
    takeaway3: 'date-fns 提供卓越的 TypeScript 支持和精确的类型推断',
    takeaway4: 'Day.js 提供链式 API，date-fns 使用纯函数',
    takeaway5: '两者都是不可变的，支持现代 JavaScript 环境',
    takeaway6: 'date-fns 有更多工具函数（200+）vs Day.js 的插件方法',
    
    whatIsDateFnsTitle: '什么是 date-fns？',
    whatIsDateFnsContent: 'date-fns 是一个现代 JavaScript 日期工具库，提供全面的日期操作工具集。创建于 2015 年，它遵循函数式编程范式，每个函数都是独立模块。这种设计实现了出色的 tree-shaking，意味着你只打包实际使用的函数。拥有超过 200 个函数，它几乎涵盖了所有日期操作需求。',
    
    whatIsDayJsTitle: '什么是 Day.js？',
    whatIsDayJsContent: 'Day.js 是一个极简的 JavaScript 日期解析、验证、操作和显示库。创建于 2018 年作为 Moment.js 的轻量级替代品，它保持几乎相同的 API，同时压缩后仅 2KB。它使用链式 API 模式，通过可选插件实现大多数功能，保持核心极其精简。',
    
    performanceTitle: '性能与包大小对比',
    performanceIntro: '包大小和运行时性能指标：',
    
    bundleSizeTitle: '包大小影响',
    bundleSizeIntro: '生产构建中的实际包大小：',
    
    runtimeTitle: '运行时性能',
    runtimeIntro: '每秒操作数（越高越好）：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较核心功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '常见日期操作的并排比较：',
    
    dateFormattingTitle: '日期格式化',
    dateManipulationTitle: '日期操作',
    dateParsingTitle: '日期解析',
    dateDifferenceTitle: '日期差值',
    
    apiStyleTitle: 'API 风格对比',
    apiStyleIntro: '理解根本差异：',
    
    typescriptTitle: 'TypeScript 体验',
    typescriptIntro: 'TypeScript 支持对比：',
    
    migrationTitle: '迁移指南',
    migrationIntro: '如何从 Moment.js 迁移或在库之间迁移：',
    
    whenToUseTitle: '何时使用每个库',
    dateFnsBestFor: '使用 date-fns 的场景：',
    dayjsBestFor: '使用 Day.js 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在 2025 年，date-fns 和 Day.js 都是优秀的选择，满足不同的需求。Day.js 适合优先考虑最小包大小和熟悉 Moment.js API 的开发者的项目。date-fns 在 TypeScript 项目、需要大量日期操作的应用和偏好函数式编程的团队中表现出色。最终选择取决于你的具体需求：包大小敏感度 vs 全面功能性。',
    
    faq1q: '哪个库对包大小更友好？',
    faq1a: 'Day.js 在最小包大小方面胜出，仅 2KB。然而，date-fns 的 tree-shaking 意味着你只包含使用的函数。对于 5-10 个常用函数，date-fns 只增加 5-15KB 到你的包中。',
    
    faq2q: '我可以将 Day.js 作为 Moment.js 的直接替代品吗？',
    faq2a: '可以，Day.js API 专门设计为与 Moment.js 几乎相同。大多数代码只需更改导入即可迁移。一些高级功能需要插件，但常见操作的工作方式相同。',
    
    faq3q: '哪个库有更好的 TypeScript 支持？',
    faq3a: 'date-fns 有卓越的 TypeScript 支持，所有函数都有精确的类型推断。每个函数都有明确的参数和返回类型。Day.js 的类型也不错但不够精细，特别是插件添加的方法。',
    
    faq4q: '如何处理时区？',
    faq4a: 'date-fns-tz 为 date-fns 提供全面的时区支持。Day.js 有时区插件。两者都能很好地处理时区转换和格式化，不过 date-fns-tz 提供更精细的控制。',
    
    faq5q: '两个库都是不可变的吗？',
    faq5a: '是的，两个库默认都是不可变的。date-fns 函数总是返回新的 Date 对象。Day.js 对所有操作返回新的 Day.js 对象，不同于可变的 Moment.js。',
    
    faq6q: '哪个库更快？',
    faq6a: 'Day.js 在简单操作上通常更快，因为它的开销最小。date-fns 在复杂操作上可能更快，因为每个函数都独立优化。对于大多数应用程序，性能差异可以忽略不计。',
    
    faq7q: '我可以在 Node.js 和浏览器中使用这些库吗？',
    faq7a: '可以，两个库都可以在 Node.js、浏览器中使用，并与 webpack、Vite 和 Rollup 等打包工具兼容。它们还支持 Cloudflare Workers 等边缘运行时。',
    
    faq8q: '如何为不同区域设置格式化日期？',
    faq8a: 'date-fns 内置支持 100+ 种区域设置。Day.js 需要 localizedFormat 插件和区域文件。两者都能很好地处理国际化，date-fns 的区域类型稍好。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function DateFnsVsDayjs({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsDateFnsTitle}</h3>
      <p style={pStyle}>{ct.whatIsDateFnsContent}</p>

      <h3 style={h3Style}>{ct.whatIsDayJsTitle}</h3>
      <p style={pStyle}>{ct.whatIsDayJsContent}</p>

      {/* Bundle Size Comparison */}
      <h2 style={h2Style}>{ct.bundleSizeTitle}</h2>
      <p style={pStyle}>{ct.bundleSizeIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '配置' : 'Configuration'}</th>
              <th style={thStyle}>date-fns</th>
              <th style={thStyle}>Day.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '完整库' : 'Full library', '75KB', '2KB'],
              [isZh ? '仅格式化' : 'Formatting only', '3.2KB', '2KB'],
              [isZh ? '格式化 + 解析' : 'Format + Parse', '5.1KB', '2KB'],
              [isZh ? '常见操作 (5个函数)' : 'Common ops (5 functions)', '8-12KB', '2KB + plugins'],
              [isZh ? '时区支持' : 'Timezone support', 'date-fns-tz: 12KB', 'plugin: 3KB'],
              [isZh ? '本地化支持' : 'Locale support', 'per locale: 1-3KB', 'per locale: 0.5KB'],
            ].map(([config, dateFns, dayjs], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{config}</td>
                <td style={tdStyle}>{dateFns}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{dayjs}</td>
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
              <th style={thStyle}>date-fns</th>
              <th style={thStyle}>Day.js</th>
              <th style={thStyle}>{isZh ? '胜者' : 'Winner'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '创建日期对象' : 'Create date', '1,200,000', '1,500,000', 'Day.js'],
              [isZh ? '格式化日期' : 'Format date', '850,000', '920,000', 'Day.js'],
              [isZh ? '解析日期字符串' : 'Parse string', '720,000', '680,000', 'date-fns'],
              [isZh ? '日期加减' : 'Add/Subtract', '1,100,000', '1,300,000', 'Day.js'],
              [isZh ? '计算日期差值' : 'Difference', '950,000', '780,000', 'date-fns'],
              [isZh ? '日期比较' : 'Compare dates', '1,400,000', '1,600,000', 'Day.js'],
            ].map(([op, dateFns, dayjs, winner], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{op}</td>
                <td style={winner === 'date-fns' ? { ...tdStyle, color: '#22c55e' } : tdStyle}>{dateFns}</td>
                <td style={winner === 'Day.js' ? { ...tdStyle, color: '#22c55e' } : tdStyle}>{dayjs}</td>
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
              <th style={thStyle}>date-fns</th>
              <th style={thStyle}>Day.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'API 风格' : 'API Style', isZh ? '函数式' : 'Functional', isZh ? '链式/面向对象' : 'Chainable/OOP'],
              [isZh ? '不可变性' : 'Immutability', '✓', '✓'],
              [isZh ? 'Tree-shaking' : 'Tree-shaking', '✓ ' + (isZh ? '原生' : 'native'), '✓'],
              [isZh ? 'TypeScript' : 'TypeScript', '✓ ' + (isZh ? '优秀' : 'excellent'), '✓ ' + (isZh ? '良好' : 'good')],
              [isZh ? '函数数量' : 'Functions count', '200+', 'Core + plugins'],
              [isZh ? '本地化' : 'Locales', '100+', '100+ (plugin)'],
              [isZh ? '时区' : 'Timezone', 'date-fns-tz', 'plugin'],
              [isZh ? '插件系统' : 'Plugin system', '✗', '✓'],
              [isZh ? 'ISO 8601' : 'ISO 8601', '✓', '✓'],
              [isZh ? '相对时间' : 'Relative time', 'formatDistance', 'fromNow()'],
            ].map(([feature, dateFns, dayjs], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{dateFns}</td>
                <td style={tdStyle}>{dayjs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.dateFormattingTitle}</h3>
      <pre style={codeStyle}><code>{`// date-fns - Functional approach
import { format, formatDistance, formatRelative } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const now = new Date();

// Basic formatting
format(now, 'yyyy-MM-dd');           // '2025-01-15'
format(now, 'MMM dd, yyyy');         // 'Jan 15, 2025'
format(now, 'EEEE, MMMM do');        // 'Wednesday, January 15th'

// With locale
format(now, 'PPPP', { locale: zhCN }); // '2025年1月15日星期三'

// Relative time
formatDistance(now, new Date(2024, 0, 1));
// 'about 1 year'

// Day.js - Chainable approach
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const now = dayjs();

// Basic formatting
now.format('YYYY-MM-DD');            // '2025-01-15'
now.format('MMM DD, YYYY');          // 'Jan 15, 2025'
now.format('dddd, MMMM Do');         // 'Wednesday, January 15th'

// With locale
dayjs.locale('zh-cn');
now.format('LLLL');                  // '2025年1月15日星期三...'

// Relative time
dayjs('2024-01-01').fromNow();       // 'a year ago'`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.dateManipulationTitle}</h3>
      <pre style={codeStyle}><code>{`// date-fns - Pure functions
import { addDays, addMonths, addYears, subDays, startOfWeek, endOfMonth } from 'date-fns';

const date = new Date();

// Add time
addDays(date, 7);        // Add 7 days
addMonths(date, 1);      // Add 1 month
addYears(date, 1);       // Add 1 year

// Subtract time
subDays(date, 7);        // Subtract 7 days

// Get boundaries
startOfWeek(date);       // Start of week
endOfMonth(date);        // End of month

// Combine operations (functional composition)
import { addDays, startOfWeek, format } from 'date-fns';

const result = format(
  addDays(startOfWeek(new Date()), 3),
  'yyyy-MM-dd'
);

// Day.js - Chainable methods
import dayjs from 'dayjs';

const date = dayjs();

// Add time
date.add(7, 'day');      // Add 7 days
date.add(1, 'month');    // Add 1 month
date.add(1, 'year');     // Add 1 year

// Subtract time
date.subtract(7, 'day'); // Subtract 7 days

// Get boundaries
date.startOf('week');    // Start of week
date.endOf('month');     // End of month

// Chain operations
const result = dayjs()
  .startOf('week')
  .add(3, 'day')
  .format('YYYY-MM-DD');`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.dateParsingTitle}</h3>
      <pre style={codeStyle}><code>{`// date-fns - Multiple parse functions
import { parse, parseISO, parseJSON } from 'date-fns';

// Parse ISO string
parseISO('2025-01-15T10:30:00Z');

// Parse with format
parse('15-01-2025', 'dd-MM-yyyy', new Date());
parse('January 15, 2025', 'MMMM dd, yyyy', new Date());

// Parse JSON date
parseJSON('2025-01-15T10:30:00.000Z');

// Day.js - Constructor based
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

// Parse ISO string
dayjs('2025-01-15T10:30:00Z');

// Parse with format
dayjs('15-01-2025', 'DD-MM-YYYY');
dayjs('January 15, 2025', 'MMMM D, YYYY');

// Current time
dayjs();`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.dateDifferenceTitle}</h3>
      <pre style={codeStyle}><code>{`// date-fns - Specific difference functions
import { differenceInDays, differenceInMonths, differenceInYears, differenceInMinutes, interval } from 'date-fns';

const start = new Date(2024, 0, 1);
const end = new Date(2025, 0, 15);

differenceInDays(end, start);      // 379 days
differenceInMonths(end, start);    // 12 months
differenceInYears(end, start);     // 1 year
differenceInMinutes(end, start);   // 545,760 minutes

// Get interval object
interval(start, end);
// { start: Date, end: Date }

// Day.js - General diff method
import dayjs from 'dayjs';

const start = dayjs('2024-01-01');
const end = dayjs('2025-01-15');

end.diff(start, 'day');            // 379 days
end.diff(start, 'month');          // 12 months
end.diff(start, 'year');           // 1 year
end.diff(start, 'minute');         // 545,760 minutes

// Get milliseconds difference
end.diff(start);                   // 47347200000 ms`}</code></pre>

      {/* API Style */}
      <h2 style={h2Style}>{ct.apiStyleTitle}</h2>
      <p style={pStyle}>{ct.apiStyleIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>date-fns {isZh ? '函数式' : 'Functional'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '纯函数设计，每个操作都是独立函数。易于测试、组合和 tree-shaking。函数名明确表达意图，代码更易读。' : 'Pure functions, each operation is a separate module. Easy to test, compose, and tree-shake. Function names clearly express intent, code is more readable.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Day.js {isZh ? '链式' : 'Chainable'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '链式 API，类似于 Moment.js。代码简洁流畅，适合连续操作。需要熟悉方法链和插件系统。' : 'Chainable API, similar to Moment.js. Concise and fluent code, perfect for sequential operations. Requires familiarity with method chaining and plugin system.'}
          </p>
        </div>
      </div>

      {/* TypeScript */}
      <h2 style={h2Style}>{ct.typescriptTitle}</h2>
      <p style={pStyle}>{ct.typescriptIntro}</p>

      <pre style={codeStyle}><code>{`// date-fns TypeScript example
import { 
  format, 
  addDays, 
  differenceInDays, 
  FormatOptions 
} from 'date-fns';

// Type-safe date operations
const date: Date = new Date();
const formatted: string = format(date, 'yyyy-MM-dd');
const futureDate: Date = addDays(date, 7);
const days: number = differenceInDays(futureDate, date);

// Options are typed
const options: FormatOptions = {
  locale: undefined,
  weekStartsOn: 1,
};

// Day.js TypeScript example
import dayjs from 'dayjs';
import type { Dayjs, OpUnitType } from 'dayjs';

// Type-safe operations
const date: Dayjs = dayjs();
const formatted: string = date.format('YYYY-MM-DD');
const futureDate: Dayjs = date.add(7, 'day');
const diff: number = futureDate.diff(date, 'day');

// Unit types are enforced
const unit: OpUnitType = 'day'; // Type-checked`}</code></pre>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// From Moment.js to Day.js (Easy migration)
// Before (Moment.js):
import moment from 'moment';

const date = moment();
date.format('YYYY-MM-DD');
date.add(7, 'days');
date.startOf('month');

// After (Day.js):
import dayjs from 'dayjs';

const date = dayjs();
date.format('YYYY-MM-DD');
date.add(7, 'day');    // Note: 'day' not 'days'
date.startOf('month');

// From Moment.js to date-fns (Different approach)
// Before (Moment.js):
import moment from 'moment';

const date = moment();
date.format('YYYY-MM-DD');
date.add(7, 'days');

// After (date-fns):
import { format, addDays } from 'date-fns';

const date = new Date();
format(date, 'yyyy-MM-dd');
addDays(date, 7);`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.dateFnsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>TypeScript {isZh ? '项目' : 'projects'}</li>
            <li>{isZh ? '需要大量日期操作' : 'Heavy date manipulation'}</li>
            <li>{isZh ? '函数式编程偏好' : 'Functional programming preference'}</li>
            <li>{isZh ? '需要精细的 tree-shaking' : 'Precise tree-shaking needed'}</li>
            <li>{isZh ? '复杂日期逻辑' : 'Complex date logic'}</li>
            <li>{isZh ? '测试友好的纯函数' : 'Test-friendly pure functions'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.dayjsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '最小包大小要求' : 'Minimal bundle size required'}</li>
            <li>{isZh ? 'Moment.js 迁移' : 'Moment.js migration'}</li>
            <li>{isZh ? '简单日期操作' : 'Simple date operations'}</li>
            <li>{isZh ? '链式 API 偏好' : 'Chainable API preference'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '移动端应用' : 'Mobile applications'}</li>
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
        <a href={'/' + lang + '/tools/date-diff-calculator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Date Diff Calculator</a> • {' '}
        <a href={'/' + lang + '/tools/iso-8601-converter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>ISO 8601 Converter</a>
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
