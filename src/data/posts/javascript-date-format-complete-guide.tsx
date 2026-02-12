'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'JavaScript Date Format: Complete Guide to Formatting Dates in JS',
    intro: 'Formatting dates in <strong>JavaScript</strong> is one of the most common tasks in web development — and one of the most error-prone. From the quirky 0-indexed months to timezone pitfalls, there are many ways to get it wrong. This comprehensive guide covers every approach to <strong>JavaScript date formatting</strong>: native methods, <code>Intl.DateTimeFormat</code>, custom format functions, and popular libraries like <strong>date-fns</strong> and <strong>Day.js</strong>, all with runnable code examples.',
    link_tool: 'Try our Timestamp Converter tool',

    h2_constructor: '1. The Date Constructor: Creating Dates in JavaScript',
    p_constructor_1: 'JavaScript\'s <code>Date</code> object is the foundation of all date/time operations. There are several ways to create a <code>Date</code> instance, each with different behaviors and gotchas.',
    p_constructor_2: 'Key things to remember: <code>new Date()</code> with no arguments returns the current date/time. <code>Date.now()</code> returns the current timestamp in <strong>milliseconds</strong>. <code>Date.parse()</code> returns milliseconds from a date string (or <code>NaN</code> if invalid).',
    p_constructor_3: 'When passing a string to the Date constructor, always use <strong>ISO 8601 format</strong> (<code>YYYY-MM-DDTHH:mm:ss.sssZ</code>) for consistent cross-browser behavior. Other formats like <code>"March 5, 2024"</code> or <code>"03/05/2024"</code> are implementation-dependent and may behave differently across engines.',
    constructor_label_ways: 'Different ways to create a Date',
    constructor_label_parse: 'Date.parse() and ISO 8601 strings',
    constructor_label_pitfalls: 'Common constructor pitfalls',

    h2_getters: '2. Getter Methods: Extracting Date Components',
    p_getters_1: 'Once you have a <code>Date</code> object, you can extract individual components using getter methods. The most important gotcha: <strong><code>getMonth()</code> returns 0-11</strong>, not 1-12. January is 0, December is 11.',
    p_getters_2: 'Every getter has a UTC counterpart (e.g., <code>getUTCFullYear()</code>, <code>getUTCMonth()</code>) that returns values in UTC instead of local time. Always use the UTC variants when working with server-side dates or timestamps.',
    getters_label_all: 'All getter methods with output',
    getters_label_utc: 'UTC vs Local getters',

    h2_locale: '3. toLocaleDateString & Intl.DateTimeFormat: Locale-Aware Formatting',
    p_locale_1: '<code>toLocaleDateString()</code> and <code>Intl.DateTimeFormat</code> are the modern, built-in way to format dates for different locales without any library. They automatically handle locale-specific number systems, calendar systems, and formatting conventions.',
    p_locale_2: 'The <code>options</code> object lets you control exactly which parts of the date/time are shown and how. Use <code>dateStyle</code>/<code>timeStyle</code> for quick presets, or specify individual components for full control.',
    locale_label_basic: 'toLocaleDateString() basics',
    locale_label_intl: 'Intl.DateTimeFormat with options',
    locale_label_parts: 'formatToParts() for custom assembly',

    h2_iso: '4. ISO 8601 Format: toISOString() and toJSON()',
    p_iso_1: 'ISO 8601 is the international standard for date/time representation. It is unambiguous, sortable, and universally parseable. JavaScript\'s <code>toISOString()</code> outputs in the format <code>YYYY-MM-DDTHH:mm:ss.sssZ</code>, always in UTC.',
    p_iso_2: '<code>toJSON()</code> calls <code>toISOString()</code> internally, making it the default format when serializing dates with <code>JSON.stringify()</code>. This is the safest format for APIs and data exchange.',
    iso_label_methods: 'ISO 8601 methods',
    iso_label_utc_local: 'UTC vs Local: the critical difference',

    h2_custom: '5. Custom Format Function: Building "YYYY-MM-DD HH:mm:ss" Manually',
    p_custom_1: 'Sometimes you need a specific format string that built-in methods cannot produce. Building your own format function using <code>padStart()</code> is straightforward and avoids adding a library dependency.',
    p_custom_2: 'The key technique is using <code>String.prototype.padStart(2, \'0\')</code> to ensure single-digit months, days, hours, minutes, and seconds are zero-padded.',
    custom_label_basic: 'Basic custom format function',
    custom_label_advanced: 'Advanced: token-based formatter',

    h2_datefns: '6. date-fns: Modern, Modular Date Formatting',
    p_datefns_1: '<strong>date-fns</strong> is a modern JavaScript date utility library that is modular (tree-shakeable), immutable, and works with native <code>Date</code> objects. It is the most popular alternative to Moment.js.',
    p_datefns_2: 'Install with <code>npm install date-fns</code>. Each function can be imported individually, so your bundle only includes what you use.',
    datefns_label_format: 'format() — the main formatting function',
    datefns_label_parse: 'parse() — parsing custom strings',
    datefns_label_diff: 'differenceInDays() and other calculations',

    h2_dayjs: '7. Day.js: Lightweight Moment.js Alternative',
    p_dayjs_1: '<strong>Day.js</strong> is a 2KB immutable date library with a Moment.js-compatible API. It is ideal when you need a chainable API with a tiny footprint.',
    p_dayjs_2: 'Install with <code>npm install dayjs</code>. Day.js uses a plugin system for extended functionality like relative time, custom formats, and timezone support.',
    dayjs_label_basic: 'Basic formatting',
    dayjs_label_relative: 'Relative time with fromNow()',
    dayjs_label_plugins: 'Plugin system',

    h2_patterns: '8. Common Date Format Patterns Reference',
    p_patterns: 'Here is a quick reference table showing the most commonly used date format patterns across JavaScript and popular libraries.',
    patterns_col_pattern: 'Pattern',
    patterns_col_example: 'Example Output',
    patterns_col_method: 'Method / Library',
    patterns_col_notes: 'Notes',

    h2_timezone: '9. Timezone Handling: Intl.DateTimeFormat with timeZone',
    p_timezone_1: 'Timezone handling is one of the trickiest aspects of JavaScript date formatting. The <code>Date</code> object internally stores time in UTC, but most display methods convert to the user\'s local timezone.',
    p_timezone_2: '<code>Intl.DateTimeFormat</code> with the <code>timeZone</code> option is the most reliable way to format dates in a specific timezone without external libraries.',
    p_timezone_3: 'Common pitfalls: <code>new Date("2024-03-15")</code> is parsed as UTC midnight, but <code>new Date("2024-03-15T00:00:00")</code> is parsed as local midnight. This difference can shift the displayed date by a whole day depending on the user\'s timezone.',
    tz_label_intl: 'Formatting in specific timezones',
    tz_label_utc: 'UTC conversion pitfalls',
    tz_label_offset: 'Getting the timezone offset',

    h2_validation: '10. Date Validation: Checking for Invalid Dates',
    p_validation_1: 'JavaScript\'s <code>Date</code> constructor never throws an error — it returns an "Invalid Date" object instead. You need to explicitly check for this using <code>isNaN()</code> or <code>Number.isNaN()</code>.',
    p_validation_2: 'Edge cases abound: <code>new Date("2024-02-30")</code> silently rolls over to March 1st. <code>new Date("")</code> returns Invalid Date, but <code>new Date(0)</code> returns January 1, 1970.',
    validation_label_check: 'Checking for Invalid Date',
    validation_label_edge: 'Edge cases and silent rollovers',
    validation_label_robust: 'Robust validation function',

    h2_performance: '11. Performance Tips: Optimizing Date Operations',
    p_performance_1: 'Date operations can become a bottleneck when processing large datasets or rendering many date values. Here are practical tips to keep your date formatting fast.',
    p_performance_2: 'The most impactful optimization is <strong>caching <code>Intl.DateTimeFormat</code> instances</strong>. Creating a new formatter is expensive; reusing one is nearly free.',
    perf_label_cache: 'Cache Intl.DateTimeFormat instances',
    perf_label_loop: 'Avoid new Date() in tight loops',
    perf_label_tips: 'More performance tips',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I format a date as "YYYY-MM-DD" in JavaScript?',
    faq1_a: 'The simplest way is to use toISOString().slice(0, 10), which returns the date portion of the ISO 8601 string. For more control, build a custom function: const pad = n => String(n).padStart(2, "0"); const formatted = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`. Alternatively, use date-fns format(date, "yyyy-MM-dd") or dayjs(date).format("YYYY-MM-DD").',
    faq2_q: 'Why does getMonth() return 0 for January?',
    faq2_a: 'JavaScript inherited its Date API from Java 1.0 (1995), which used 0-indexed months. This was a design decision to make months work as array indices. While Java later deprecated this in favor of java.time, JavaScript kept the original behavior. Always remember to add 1 when displaying months: getMonth() + 1.',
    faq3_q: 'What is the best JavaScript date library in 2024?',
    faq3_a: 'For most projects, the built-in Intl.DateTimeFormat is sufficient and requires no dependencies. If you need a library: date-fns is best for tree-shaking and functional style (import only what you need); Day.js is best for a tiny bundle with Moment.js-compatible API; Luxon is best for complex timezone operations. Moment.js is in maintenance mode and should not be used in new projects.',
    faq4_q: 'How do I convert a date string to a Date object safely?',
    faq4_a: 'Always use ISO 8601 format for parsing: new Date("2024-03-15T10:30:00Z"). For other formats, use date-fns parse() or Day.js with the customParseFormat plugin. Never rely on new Date("03/15/2024") as it is locale-dependent. After parsing, always validate: if (isNaN(date.getTime())) throw new Error("Invalid date").',
    faq5_q: 'How do I display a date in a specific timezone?',
    faq5_a: 'Use Intl.DateTimeFormat with the timeZone option: new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Tokyo", dateStyle: "full", timeStyle: "long" }).format(date). This works in all modern browsers without external libraries. For more complex timezone math, consider the Temporal API (Stage 3 proposal) or the Luxon library.',
  },
  zh: {
    title: 'JavaScript 日期格式化完全指南：所有 JS 日期格式化方法详解',
    intro: '在 <strong>JavaScript</strong> 中格式化日期是 Web 开发中最常见的任务之一，也是最容易出错的。从奇怪的 0 索引月份到时区陷阱，有很多容易踩的坑。本指南全面介绍了 <strong>JavaScript 日期格式化</strong>的所有方法：原生方法、<code>Intl.DateTimeFormat</code>、自定义格式化函数，以及 <strong>date-fns</strong> 和 <strong>Day.js</strong> 等流行库，均配有可运行的代码示例。',
    link_tool: '试试我们的时间戳转换工具',

    h2_constructor: '1. Date 构造函数：在 JavaScript 中创建日期',
    p_constructor_1: 'JavaScript 的 <code>Date</code> 对象是所有日期/时间操作的基础。创建 <code>Date</code> 实例有多种方式，每种方式都有不同的行为和注意事项。',
    p_constructor_2: '关键要点：不带参数的 <code>new Date()</code> 返回当前日期/时间。<code>Date.now()</code> 返回当前时间戳（<strong>毫秒</strong>）。<code>Date.parse()</code> 从日期字符串返回毫秒数（无效时返回 <code>NaN</code>）。',
    p_constructor_3: '向 Date 构造函数传递字符串时，务必使用 <strong>ISO 8601 格式</strong>（<code>YYYY-MM-DDTHH:mm:ss.sssZ</code>）以确保跨浏览器的一致行为。其他格式如 <code>"March 5, 2024"</code> 或 <code>"03/05/2024"</code> 依赖具体实现，在不同引擎中可能行为不同。',
    constructor_label_ways: '创建 Date 的不同方式',
    constructor_label_parse: 'Date.parse() 和 ISO 8601 字符串',
    constructor_label_pitfalls: '常见构造函数陷阱',

    h2_getters: '2. Getter 方法：提取日期组件',
    p_getters_1: '获得 <code>Date</code> 对象后，可以使用 getter 方法提取各个组件。最重要的注意事项：<strong><code>getMonth()</code> 返回 0-11</strong>，而不是 1-12。一月是 0，十二月是 11。',
    p_getters_2: '每个 getter 都有 UTC 对应版本（如 <code>getUTCFullYear()</code>、<code>getUTCMonth()</code>），返回 UTC 时间而非本地时间的值。处理服务器端日期或时间戳时，请始终使用 UTC 变体。',
    getters_label_all: '所有 getter 方法及输出',
    getters_label_utc: 'UTC vs 本地 getter',

    h2_locale: '3. toLocaleDateString 与 Intl.DateTimeFormat：本地化格式',
    p_locale_1: '<code>toLocaleDateString()</code> 和 <code>Intl.DateTimeFormat</code> 是现代内置的日期本地化格式化方式，无需任何库。它们自动处理特定区域的数字系统、日历系统和格式约定。',
    p_locale_2: '<code>options</code> 对象可以精确控制显示日期/时间的哪些部分及其方式。使用 <code>dateStyle</code>/<code>timeStyle</code> 快速预设，或指定各个组件进行完全控制。',
    locale_label_basic: 'toLocaleDateString() 基础',
    locale_label_intl: 'Intl.DateTimeFormat 配置选项',
    locale_label_parts: 'formatToParts() 自定义组装',

    h2_iso: '4. ISO 8601 格式：toISOString() 和 toJSON()',
    p_iso_1: 'ISO 8601 是日期/时间表示的国际标准。它无歧义、可排序、可被普遍解析。JavaScript 的 <code>toISOString()</code> 输出格式为 <code>YYYY-MM-DDTHH:mm:ss.sssZ</code>，始终为 UTC。',
    p_iso_2: '<code>toJSON()</code> 内部调用 <code>toISOString()</code>，使其成为 <code>JSON.stringify()</code> 序列化日期时的默认格式。这是 API 和数据交换最安全的格式。',
    iso_label_methods: 'ISO 8601 方法',
    iso_label_utc_local: 'UTC vs 本地：关键区别',

    h2_custom: '5. 自定义格式函数：手动构建 "YYYY-MM-DD HH:mm:ss"',
    p_custom_1: '有时你需要内置方法无法生成的特定格式字符串。使用 <code>padStart()</code> 构建自己的格式化函数很简单，而且避免了添加库依赖。',
    p_custom_2: '关键技巧是使用 <code>String.prototype.padStart(2, \'0\')</code> 确保个位数的月、日、时、分、秒补零。',
    custom_label_basic: '基础自定义格式函数',
    custom_label_advanced: '进阶：基于 token 的格式化器',

    h2_datefns: '6. date-fns：现代模块化日期格式化',
    p_datefns_1: '<strong>date-fns</strong> 是一个现代 JavaScript 日期工具库，模块化（可 tree-shake）、不可变，且使用原生 <code>Date</code> 对象。它是 Moment.js 最流行的替代品。',
    p_datefns_2: '通过 <code>npm install date-fns</code> 安装。每个函数都可以单独导入，因此打包体积仅包含你实际使用的部分。',
    datefns_label_format: 'format() — 主要格式化函数',
    datefns_label_parse: 'parse() — 解析自定义字符串',
    datefns_label_diff: 'differenceInDays() 及其他计算',

    h2_dayjs: '7. Day.js：轻量级 Moment.js 替代方案',
    p_dayjs_1: '<strong>Day.js</strong> 是一个 2KB 的不可变日期库，API 与 Moment.js 兼容。在需要链式 API 且包体积要求极小时非常理想。',
    p_dayjs_2: '通过 <code>npm install dayjs</code> 安装。Day.js 使用插件系统扩展功能，包括相对时间、自定义格式和时区支持。',
    dayjs_label_basic: '基础格式化',
    dayjs_label_relative: '使用 fromNow() 的相对时间',
    dayjs_label_plugins: '插件系统',

    h2_patterns: '8. 常见日期格式模式参考',
    p_patterns: '以下是 JavaScript 和流行库中最常用的日期格式模式速查表。',
    patterns_col_pattern: '格式模式',
    patterns_col_example: '示例输出',
    patterns_col_method: '方法 / 库',
    patterns_col_notes: '备注',

    h2_timezone: '9. 时区处理：使用 Intl.DateTimeFormat 的 timeZone',
    p_timezone_1: '时区处理是 JavaScript 日期格式化中最棘手的方面之一。<code>Date</code> 对象内部以 UTC 存储时间，但大多数显示方法会转换为用户的本地时区。',
    p_timezone_2: '使用 <code>timeZone</code> 选项的 <code>Intl.DateTimeFormat</code> 是无需外部库即可在特定时区格式化日期的最可靠方式。',
    p_timezone_3: '常见陷阱：<code>new Date("2024-03-15")</code> 被解析为 UTC 午夜，但 <code>new Date("2024-03-15T00:00:00")</code> 被解析为本地午夜。这种差异可能会因用户的时区不同而导致显示日期相差一整天。',
    tz_label_intl: '在特定时区格式化',
    tz_label_utc: 'UTC 转换陷阱',
    tz_label_offset: '获取时区偏移量',

    h2_validation: '10. 日期验证：检查无效日期',
    p_validation_1: 'JavaScript 的 <code>Date</code> 构造函数永远不会抛出错误——它返回一个 "Invalid Date" 对象。你需要使用 <code>isNaN()</code> 或 <code>Number.isNaN()</code> 显式检查。',
    p_validation_2: '边界情况很多：<code>new Date("2024-02-30")</code> 会默默滚动到 3 月 1 日。<code>new Date("")</code> 返回 Invalid Date，但 <code>new Date(0)</code> 返回 1970 年 1 月 1 日。',
    validation_label_check: '检查 Invalid Date',
    validation_label_edge: '边界情况与静默滚动',
    validation_label_robust: '健壮的验证函数',

    h2_performance: '11. 性能优化技巧：优化日期操作',
    p_performance_1: '处理大型数据集或渲染大量日期值时，日期操作可能成为性能瓶颈。以下是保持日期格式化快速运行的实用技巧。',
    p_performance_2: '最有效的优化是<strong>缓存 <code>Intl.DateTimeFormat</code> 实例</strong>。创建新的格式化器很昂贵；重用则几乎零成本。',
    perf_label_cache: '缓存 Intl.DateTimeFormat 实例',
    perf_label_loop: '避免在紧密循环中使用 new Date()',
    perf_label_tips: '更多性能技巧',

    h2_faq: '常见问题',
    faq1_q: '如何在 JavaScript 中将日期格式化为 "YYYY-MM-DD"？',
    faq1_a: '最简单的方式是使用 toISOString().slice(0, 10)，它返回 ISO 8601 字符串的日期部分。更灵活的方式是构建自定义函数：const pad = n => String(n).padStart(2, "0"); const formatted = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`。也可以使用 date-fns 的 format(date, "yyyy-MM-dd") 或 dayjs(date).format("YYYY-MM-DD")。',
    faq2_q: '为什么 getMonth() 对一月返回 0？',
    faq2_a: 'JavaScript 的 Date API 继承自 Java 1.0（1995 年），后者使用 0 索引月份。这是一个设计决策，使月份可以作为数组索引使用。虽然 Java 后来废弃了这种方式转而使用 java.time，但 JavaScript 保留了原始行为。显示月份时务必记得加 1：getMonth() + 1。',
    faq3_q: '2024 年最好的 JavaScript 日期库是什么？',
    faq3_a: '对于大多数项目，内置的 Intl.DateTimeFormat 就足够了，无需任何依赖。如果需要库：date-fns 最适合 tree-shaking 和函数式风格（只导入需要的）；Day.js 最适合极小包体积且兼容 Moment.js API；Luxon 最适合复杂时区操作。Moment.js 处于维护模式，不应在新项目中使用。',
    faq4_q: '如何安全地将日期字符串转换为 Date 对象？',
    faq4_a: '解析时务必使用 ISO 8601 格式：new Date("2024-03-15T10:30:00Z")。对于其他格式，使用 date-fns 的 parse() 或 Day.js 的 customParseFormat 插件。切勿依赖 new Date("03/15/2024")，因为它依赖于区域设置。解析后务必验证：if (isNaN(date.getTime())) throw new Error("Invalid date")。',
    faq5_q: '如何在特定时区显示日期？',
    faq5_a: '使用带 timeZone 选项的 Intl.DateTimeFormat：new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Tokyo", dateStyle: "full", timeStyle: "long" }).format(date)。这在所有现代浏览器中都能工作，无需外部库。对于更复杂的时区计算，可以考虑 Temporal API（Stage 3 提案）或 Luxon 库。',
  },
};

export default function JavaScriptDateFormatGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, marginBottom: 16 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 12, color: 'var(--text-primary)' };
  const pStyle: React.CSSProperties = { fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };

  const formatPatterns = [
    ['YYYY-MM-DD', '2024-03-15', 'toISOString().slice(0,10)', lang === 'zh' ? 'ISO 标准，适合排序和 API' : 'ISO standard, sortable, API-friendly'],
    ['MM/DD/YYYY', '03/15/2024', lang === 'zh' ? '自定义函数' : 'Custom function', lang === 'zh' ? '美国常用格式' : 'US common format'],
    ['DD/MM/YYYY', '15/03/2024', lang === 'zh' ? '自定义函数' : 'Custom function', lang === 'zh' ? '欧洲/亚洲常用格式' : 'Europe/Asia common format'],
    ['DD MMM YYYY', '15 Mar 2024', 'Intl.DateTimeFormat', lang === 'zh' ? '人类可读的简短格式' : 'Human-readable short format'],
    ['MMMM D, YYYY', 'March 15, 2024', 'Intl.DateTimeFormat', lang === 'zh' ? '正式的长格式' : 'Formal long format'],
    ['HH:mm:ss', '14:30:45', lang === 'zh' ? '自定义函数' : 'Custom function', lang === 'zh' ? '24 小时制时间' : '24-hour time'],
    ['hh:mm A', '02:30 PM', 'Intl.DateTimeFormat', lang === 'zh' ? '12 小时制带 AM/PM' : '12-hour with AM/PM'],
    ['YYYY-MM-DDTHH:mm:ssZ', '2024-03-15T14:30:45Z', 'toISOString()', lang === 'zh' ? '完整 ISO 8601 带时区' : 'Full ISO 8601 with timezone'],
    [lang === 'zh' ? '相对时间' : 'Relative', lang === 'zh' ? '3 天前' : '3 days ago', 'Day.js / date-fns', lang === 'zh' ? '需要库支持' : 'Requires library'],
    ['Unix Timestamp', '1710505845', 'Date.now() / 1000', lang === 'zh' ? '自 epoch 以来的秒数' : 'Seconds since epoch'],
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }} dangerouslySetInnerHTML={{ __html: t.intro }} />

      <div style={{ padding: 16, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginBottom: 30 }}>
        <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.link_tool} &rarr;
        </Link>
      </div>

      {/* Section 1: Date Constructor */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_constructor }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_constructor_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_constructor_2 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_constructor_3 }} />

      <h3 style={h3Style}>{t.constructor_label_ways}</h3>
      <pre style={codeStyle}><code>{`// 1. No arguments — current date and time
const now = new Date();
console.log(now);
// e.g. "Fri Mar 15 2024 14:30:45 GMT+0800"

// 2. Milliseconds since epoch (Jan 1, 1970 UTC)
const fromMs = new Date(1710505845000);
console.log(fromMs.toISOString());
// "2024-03-15T14:30:45.000Z"

// 3. Date.now() — current timestamp in milliseconds
const timestamp = Date.now();
console.log(timestamp);
// e.g. 1710505845000

// 4. Year, month (0-indexed!), day, hours, minutes, seconds, ms
const specific = new Date(2024, 2, 15, 14, 30, 45);
//                        ^^^^  ^  ^^
//                        year  month=March (0=Jan, 2=Mar)
console.log(specific);

// 5. ISO 8601 string (recommended for parsing)
const fromISO = new Date("2024-03-15T14:30:45.000Z");
console.log(fromISO.toISOString());
// "2024-03-15T14:30:45.000Z"`}</code></pre>

      <h3 style={h3Style}>{t.constructor_label_parse}</h3>
      <pre style={codeStyle}><code>{`// Date.parse() returns milliseconds (or NaN for invalid strings)
const ms1 = Date.parse("2024-03-15T14:30:45.000Z");
console.log(ms1);       // 1710505845000

const ms2 = Date.parse("2024-03-15");
console.log(ms2);       // 1710460800000 (midnight UTC)

const ms3 = Date.parse("not a date");
console.log(ms3);       // NaN

// ISO 8601 variants that all work
Date.parse("2024-03-15");                  // date only (UTC)
Date.parse("2024-03-15T14:30:45Z");        // with time and Z (UTC)
Date.parse("2024-03-15T14:30:45+08:00");   // with timezone offset
Date.parse("2024-03-15T14:30:45.123Z");    // with milliseconds`}</code></pre>

      <h3 style={h3Style}>{t.constructor_label_pitfalls}</h3>
      <pre style={codeStyle}><code>{`// PITFALL 1: Month is 0-indexed
const jan = new Date(2024, 0, 1);  // January 1 (NOT month 0!)
const dec = new Date(2024, 11, 31); // December 31

// PITFALL 2: Date-only strings are parsed as UTC
const utcMidnight = new Date("2024-03-15");
console.log(utcMidnight.toISOString());
// "2024-03-15T00:00:00.000Z" — UTC midnight

// But date-time strings WITHOUT Z are parsed as LOCAL
const localMidnight = new Date("2024-03-15T00:00:00");
console.log(localMidnight.toISOString());
// "2024-03-14T16:00:00.000Z" — if you are in UTC+8

// PITFALL 3: Two-digit years
const twoDigit = new Date(99, 0, 1);
console.log(twoDigit.getFullYear());
// 1999 (NOT 99 or 2099!)

// PITFALL 4: Invalid dates don't throw
const invalid = new Date("banana");
console.log(invalid);            // Invalid Date
console.log(invalid.getTime());  // NaN`}</code></pre>

      {/* Section 2: Getter Methods */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_getters }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_getters_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_getters_2 }} />

      <h3 style={h3Style}>{t.getters_label_all}</h3>
      <pre style={codeStyle}><code>{`const date = new Date("2024-03-15T14:30:45.123Z");

// Year
date.getFullYear();     // 2024 (always 4 digits)
date.getUTCFullYear();  // 2024

// Month (0-INDEXED! January = 0, December = 11)
date.getMonth();        // 2 (March, NOT 3!)
date.getUTCMonth();     // 2
// To display: date.getMonth() + 1  => 3

// Day of month (1-31)
date.getDate();         // 15
date.getUTCDate();      // 15

// Day of week (0 = Sunday, 6 = Saturday)
date.getDay();          // 5 (Friday)
date.getUTCDay();       // 5

// Hours (0-23)
date.getHours();        // depends on local timezone
date.getUTCHours();     // 14

// Minutes (0-59)
date.getMinutes();      // depends on local timezone
date.getUTCMinutes();   // 30

// Seconds (0-59)
date.getSeconds();      // 45
date.getUTCSeconds();   // 45

// Milliseconds (0-999)
date.getMilliseconds();      // 123
date.getUTCMilliseconds();   // 123

// Timestamp (milliseconds since epoch)
date.getTime();         // 1710505845123
date.valueOf();         // 1710505845123 (same as getTime)

// Timezone offset (minutes from UTC, sign is reversed!)
date.getTimezoneOffset(); // -480 for UTC+8 (negative = east of UTC)`}</code></pre>

      <h3 style={h3Style}>{t.getters_label_utc}</h3>
      <pre style={codeStyle}><code>{`// If your local timezone is UTC+8 (e.g., Beijing, Singapore)
const date = new Date("2024-03-15T22:30:00Z"); // 10:30 PM UTC

// LOCAL getters (depend on the machine's timezone)
console.log(date.getDate());    // 16 (next day in UTC+8!)
console.log(date.getHours());   // 6  (6:30 AM local time)

// UTC getters (always consistent)
console.log(date.getUTCDate()); // 15
console.log(date.getUTCHours()); // 22

// Rule of thumb:
// - Use UTC getters for data processing, storage, APIs
// - Use local getters only for displaying in the user's timezone`}</code></pre>

      {/* Section 3: toLocaleDateString & Intl.DateTimeFormat */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_locale }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_locale_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_locale_2 }} />

      <h3 style={h3Style}>{t.locale_label_basic}</h3>
      <pre style={codeStyle}><code>{`const date = new Date("2024-03-15T14:30:45Z");

// Default (uses browser locale)
date.toLocaleDateString();
// "3/15/2024" (en-US) or "2024/3/15" (zh-CN)

// Specify locale
date.toLocaleDateString('en-US');    // "3/15/2024"
date.toLocaleDateString('en-GB');    // "15/03/2024"
date.toLocaleDateString('de-DE');    // "15.3.2024"
date.toLocaleDateString('ja-JP');    // "2024/3/15"
date.toLocaleDateString('zh-CN');    // "2024/3/15"
date.toLocaleDateString('ko-KR');    // "2024. 3. 15."

// With options
date.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
// "Friday, March 15, 2024"

// toLocaleTimeString for time only
date.toLocaleTimeString('en-US');
// "2:30:45 PM" (or adjusted for timezone)

// toLocaleString for both date and time
date.toLocaleString('en-US');
// "3/15/2024, 2:30:45 PM"`}</code></pre>

      <h3 style={h3Style}>{t.locale_label_intl}</h3>
      <pre style={codeStyle}><code>{`const date = new Date("2024-03-15T14:30:45Z");

// Quick presets with dateStyle / timeStyle
new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
  timeStyle: 'long',
  timeZone: 'America/New_York'
}).format(date);
// "Friday, March 15, 2024 at 10:30:45 AM EDT"

// Individual component control
new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'UTC'
}).format(date);
// "03/15/2024, 14:30:45"

// Chinese format with era
new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timeZone: 'Asia/Shanghai'
}).format(date);
// "2024\u5E743\u670815\u65E5\u661F\u671F\u4E94"

// Month names
new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
// "March"
new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
// "Mar"
new Intl.DateTimeFormat('en-US', { month: 'narrow' }).format(date);
// "M"`}</code></pre>

      <h3 style={h3Style}>{t.locale_label_parts}</h3>
      <pre style={codeStyle}><code>{`const date = new Date("2024-03-15T14:30:45Z");

// formatToParts returns an array of { type, value } objects
const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'UTC'
});

const parts = formatter.formatToParts(date);
console.log(parts);
// [
//   { type: 'month', value: 'March' },
//   { type: 'literal', value: ' ' },
//   { type: 'day', value: '15' },
//   { type: 'literal', value: ', ' },
//   { type: 'year', value: '2024' },
//   { type: 'literal', value: ', ' },
//   { type: 'hour', value: '2' },
//   { type: 'literal', value: ':' },
//   { type: 'minute', value: '30' },
//   { type: 'literal', value: '\u202f' },
//   { type: 'dayPeriod', value: 'PM' }
// ]

// Extract specific parts
const month = parts.find(p => p.type === 'month')?.value; // "March"
const year = parts.find(p => p.type === 'year')?.value;   // "2024"

// Build custom format: "March 2024"
const custom = \`\${month} \${year}\`;`}</code></pre>

      {/* Section 4: ISO 8601 */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_iso }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_iso_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_iso_2 }} />

      <h3 style={h3Style}>{t.iso_label_methods}</h3>
      <pre style={codeStyle}><code>{`const date = new Date("2024-03-15T14:30:45.123Z");

// toISOString() — always UTC, always 24 characters
date.toISOString();
// "2024-03-15T14:30:45.123Z"

// toJSON() — same output, used by JSON.stringify()
date.toJSON();
// "2024-03-15T14:30:45.123Z"

// Proof that JSON.stringify uses toJSON:
const obj = { created: date, name: "test" };
JSON.stringify(obj);
// '{"created":"2024-03-15T14:30:45.123Z","name":"test"}'

// Extract date only from ISO string
date.toISOString().slice(0, 10);
// "2024-03-15"

// Extract time only
date.toISOString().slice(11, 19);
// "14:30:45"

// Other built-in string methods
date.toUTCString();
// "Fri, 15 Mar 2024 14:30:45 GMT"

date.toDateString();
// "Fri Mar 15 2024" (local)

date.toTimeString();
// "22:30:45 GMT+0800 (China Standard Time)" (local)`}</code></pre>

      <h3 style={h3Style}>{t.iso_label_utc_local}</h3>
      <pre style={codeStyle}><code>{`// The same moment in time, displayed differently:
const date = new Date("2024-03-15T23:30:00Z"); // 11:30 PM UTC

// UTC representations (always March 15)
date.toISOString();     // "2024-03-15T23:30:00.000Z"
date.toUTCString();     // "Fri, 15 Mar 2024 23:30:00 GMT"

// Local representations (if you are in UTC+8)
date.toString();
// "Sat Mar 16 2024 07:30:00 GMT+0800 (China Standard Time)"
// Notice: it shows March 16! Because 23:30 UTC = 07:30 next day in UTC+8

date.toLocaleDateString('en-US');
// "3/16/2024" — different date!

// This is why you should ALWAYS use UTC for storage/APIs
// and only convert to local for display`}</code></pre>

      {/* Section 5: Custom Format Function */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_custom }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_custom_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_custom_2 }} />

      <h3 style={h3Style}>{t.custom_label_basic}</h3>
      <pre style={codeStyle}><code>{`// Simple "YYYY-MM-DD HH:mm:ss" formatter
function formatDate(date) {
  const pad = (n) => String(n).padStart(2, '0');

  const year  = date.getFullYear();
  const month = pad(date.getMonth() + 1); // +1 because 0-indexed
  const day   = pad(date.getDate());
  const hours = pad(date.getHours());
  const mins  = pad(date.getMinutes());
  const secs  = pad(date.getSeconds());

  return \`\${year}-\${month}-\${day} \${hours}:\${mins}:\${secs}\`;
}

console.log(formatDate(new Date()));
// "2024-03-15 14:30:45"

// UTC version
function formatDateUTC(date) {
  const pad = (n) => String(n).padStart(2, '0');

  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate())
  ].join('-') + ' ' + [
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds())
  ].join(':');
}

console.log(formatDateUTC(new Date()));
// "2024-03-15 06:30:45" (UTC)`}</code></pre>

      <h3 style={h3Style}>{t.custom_label_advanced}</h3>
      <pre style={codeStyle}><code>{`// Token-based formatter (like date-fns / moment)
function formatDateTokens(date, format) {
  const pad = (n, len = 2) => String(n).padStart(len, '0');

  const tokens = {
    'YYYY': () => date.getFullYear(),
    'YY':   () => String(date.getFullYear()).slice(-2),
    'MM':   () => pad(date.getMonth() + 1),
    'M':    () => date.getMonth() + 1,
    'DD':   () => pad(date.getDate()),
    'D':    () => date.getDate(),
    'HH':   () => pad(date.getHours()),
    'H':    () => date.getHours(),
    'hh':   () => pad(date.getHours() % 12 || 12),
    'h':    () => date.getHours() % 12 || 12,
    'mm':   () => pad(date.getMinutes()),
    'ss':   () => pad(date.getSeconds()),
    'SSS':  () => pad(date.getMilliseconds(), 3),
    'A':    () => date.getHours() < 12 ? 'AM' : 'PM',
    'a':    () => date.getHours() < 12 ? 'am' : 'pm',
  };

  // Replace longest tokens first to avoid partial matches
  let result = format;
  for (const [token, fn] of Object.entries(tokens).sort(
    (a, b) => b[0].length - a[0].length
  )) {
    result = result.replace(new RegExp(token, 'g'), String(fn()));
  }
  return result;
}

// Usage
const now = new Date("2024-03-15T14:30:45.123Z");
formatDateTokens(now, 'YYYY-MM-DD');          // "2024-03-15"
formatDateTokens(now, 'MM/DD/YYYY');          // "03/15/2024"
formatDateTokens(now, 'HH:mm:ss');            // "14:30:45"
formatDateTokens(now, 'hh:mm A');             // "02:30 PM"
formatDateTokens(now, 'YYYY-MM-DD HH:mm:ss.SSS'); // "2024-03-15 14:30:45.123"`}</code></pre>

      {/* Section 6: date-fns */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_datefns }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_datefns_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_datefns_2 }} />

      <h3 style={h3Style}>{t.datefns_label_format}</h3>
      <pre style={codeStyle}><code>{`import { format } from 'date-fns';

const date = new Date("2024-03-15T14:30:45Z");

// Basic format patterns (date-fns uses different tokens than moment!)
format(date, 'yyyy-MM-dd');            // "2024-03-15"
format(date, 'dd/MM/yyyy');            // "15/03/2024"
format(date, 'MMMM d, yyyy');         // "March 15, 2024"
format(date, 'EEE, MMM d, yyyy');     // "Fri, Mar 15, 2024"
format(date, 'yyyy-MM-dd HH:mm:ss');  // "2024-03-15 14:30:45"
format(date, 'hh:mm a');              // "02:30 PM"
format(date, "yyyy-MM-dd'T'HH:mm:ssXXX"); // "2024-03-15T14:30:45+00:00"

// date-fns token reference:
// yyyy = 4-digit year    yy = 2-digit year
// MM   = 2-digit month   M  = 1-2 digit month
// MMMM = full month name MMM = abbreviated month
// dd   = 2-digit day     d  = 1-2 digit day
// HH   = 24-hour         hh = 12-hour
// mm   = minutes         ss = seconds
// a    = am/pm           EEEE = full weekday name

// With locale
import { ja } from 'date-fns/locale';
format(date, 'PPP', { locale: ja });
// "2024\u5E743\u670815\u65E5"`}</code></pre>

      <h3 style={h3Style}>{t.datefns_label_parse}</h3>
      <pre style={codeStyle}><code>{`import { parse, isValid } from 'date-fns';

// Parse a custom-formatted string into a Date
const date1 = parse('15/03/2024', 'dd/MM/yyyy', new Date());
console.log(date1.toISOString());
// "2024-03-15T00:00:00.000Z"

const date2 = parse('March 15, 2024 2:30 PM', 'MMMM d, yyyy h:mm a', new Date());
console.log(date2.toISOString());
// "2024-03-15T14:30:00.000Z"

// Validate parsed date
const result = parse('31/02/2024', 'dd/MM/yyyy', new Date());
console.log(isValid(result)); // false (Feb 31 doesn't exist)

// parseISO for ISO strings (faster than parse)
import { parseISO } from 'date-fns';
const date3 = parseISO('2024-03-15T14:30:45Z');
console.log(isValid(date3)); // true`}</code></pre>

      <h3 style={h3Style}>{t.datefns_label_diff}</h3>
      <pre style={codeStyle}><code>{`import {
  differenceInDays,
  differenceInHours,
  differenceInYears,
  addDays,
  subMonths,
  isAfter,
  isBefore,
  formatDistanceToNow
} from 'date-fns';

const date1 = new Date('2024-03-15');
const date2 = new Date('2024-01-01');

// Difference calculations
differenceInDays(date1, date2);    // 74
differenceInHours(date1, date2);   // 1776
differenceInYears(date1, date2);   // 0

// Date arithmetic
addDays(date1, 30);                // April 14, 2024
subMonths(date1, 2);               // January 15, 2024

// Comparisons
isAfter(date1, date2);   // true
isBefore(date1, date2);  // false

// Relative time (human-readable)
formatDistanceToNow(new Date('2024-01-01'));
// "3 months ago" (varies by current date)

// formatDistance between two dates
import { formatDistance } from 'date-fns';
formatDistance(date2, date1);
// "3 months"`}</code></pre>

      {/* Section 7: Day.js */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_dayjs }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_dayjs_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_dayjs_2 }} />

      <h3 style={h3Style}>{t.dayjs_label_basic}</h3>
      <pre style={codeStyle}><code>{`import dayjs from 'dayjs';

const date = dayjs('2024-03-15T14:30:45Z');

// Format (uses Moment.js-compatible tokens)
date.format('YYYY-MM-DD');            // "2024-03-15"
date.format('DD/MM/YYYY');            // "15/03/2024"
date.format('MMMM D, YYYY');         // "March 15, 2024"
date.format('ddd, MMM D, YYYY');     // "Fri, Mar 15, 2024"
date.format('YYYY-MM-DD HH:mm:ss'); // "2024-03-15 14:30:45"
date.format('hh:mm A');              // "02:30 PM"

// Day.js token reference:
// YYYY = 4-digit year    YY = 2-digit year
// MM   = 2-digit month   M  = 1-2 digit month
// MMMM = full month      MMM = abbreviated month
// DD   = 2-digit day     D  = 1-2 digit day
// HH   = 24-hour         hh = 12-hour
// mm   = minutes         ss = seconds
// A    = AM/PM           dddd = full weekday

// Getters
date.year();      // 2024
date.month();     // 2 (0-indexed, like native Date)
date.date();      // 15
date.day();       // 5 (Friday)
date.hour();      // 14
date.minute();    // 30
date.second();    // 45`}</code></pre>

      <h3 style={h3Style}>{t.dayjs_label_relative}</h3>
      <pre style={codeStyle}><code>{`import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// fromNow() — relative to current time
dayjs('2024-01-01').fromNow();        // "3 months ago"
dayjs('2025-01-01').fromNow();        // "in 10 months"
dayjs().subtract(2, 'hour').fromNow(); // "2 hours ago"

// from() — relative to another date
const start = dayjs('2024-01-01');
const end = dayjs('2024-03-15');
end.from(start);                       // "3 months ago"
start.to(end);                         // "in 3 months"

// toNow() — inverse of fromNow
dayjs('2024-01-01').toNow();           // "in 3 months"

// Without suffix
dayjs('2024-01-01').fromNow(true);     // "3 months"`}</code></pre>

      <h3 style={h3Style}>{t.dayjs_label_plugins}</h3>
      <pre style={codeStyle}><code>{`import dayjs from 'dayjs';

// UTC plugin
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.utc('2024-03-15T14:30:45Z').format();
// "2024-03-15T14:30:45Z"

// Timezone plugin (requires utc plugin first)
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);
dayjs('2024-03-15T14:30:45Z').tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss');
// "2024-03-15 23:30:45"

// CustomParseFormat plugin
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
dayjs('15-03-2024', 'DD-MM-YYYY').format('YYYY-MM-DD');
// "2024-03-15"

// Duration plugin
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
const dur = dayjs.duration(3661000); // milliseconds
dur.hours();   // 1
dur.minutes(); // 1
dur.seconds(); // 1
dur.humanize(); // "an hour"

// Locale
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
dayjs('2024-03-15').format('MMMM D, YYYY dddd');
// "三月 15, 2024 星期五"`}</code></pre>

      {/* Section 8: Common Format Patterns Table */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_patterns }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_patterns }} />

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.patterns_col_pattern}</th>
              <th style={thStyle}>{t.patterns_col_example}</th>
              <th style={thStyle}>{t.patterns_col_method}</th>
              <th style={thStyle}>{t.patterns_col_notes}</th>
            </tr>
          </thead>
          <tbody>
            {formatPatterns.map(([pattern, example, method, notes], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={tdStyle}><code style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{pattern}</code></td>
                <td style={tdStyle}><code>{example}</code></td>
                <td style={tdStyle}>{method}</td>
                <td style={tdStyle}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre style={codeStyle}><code>{`// Quick reference: achieving each format in vanilla JS

const d = new Date("2024-03-15T14:30:45Z");
const pad = n => String(n).padStart(2, '0');

// YYYY-MM-DD
d.toISOString().slice(0, 10);  // "2024-03-15"

// MM/DD/YYYY
\`\${pad(d.getUTCMonth()+1)}/\${pad(d.getUTCDate())}/\${d.getUTCFullYear()}\`;
// "03/15/2024"

// DD MMM YYYY
new Intl.DateTimeFormat('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'
}).format(d);  // "15 Mar 2024"

// Full date with weekday
new Intl.DateTimeFormat('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  timeZone: 'UTC'
}).format(d);  // "Friday, March 15, 2024"

// 12-hour time
new Intl.DateTimeFormat('en-US', {
  hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC'
}).format(d);  // "2:30 PM"`}</code></pre>

      {/* Section 9: Timezone Handling */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_timezone }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_timezone_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_timezone_2 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_timezone_3 }} />

      <h3 style={h3Style}>{t.tz_label_intl}</h3>
      <pre style={codeStyle}><code>{`const date = new Date("2024-03-15T14:30:45Z");

// Format in different timezones
const timezones = [
  'UTC',
  'America/New_York',
  'Europe/London',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Australia/Sydney'
];

const fmt = (tz) => new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: false, timeZone: tz, timeZoneName: 'short'
}).format(date);

timezones.forEach(tz => console.log(\`\${tz.padEnd(22)} \${fmt(tz)}\`));
// UTC                    03/15/2024, 14:30:45 UTC
// America/New_York       03/15/2024, 10:30:45 EDT
// Europe/London          03/15/2024, 14:30:45 GMT
// Asia/Shanghai          03/15/2024, 22:30:45 GMT+8
// Asia/Tokyo             03/15/2024, 23:30:45 JST
// Australia/Sydney       03/16/2024, 01:30:45 AEDT`}</code></pre>

      <h3 style={h3Style}>{t.tz_label_utc}</h3>
      <pre style={codeStyle}><code>{`// TRAP 1: Date-only string vs date-time string
const dateOnly = new Date("2024-03-15");          // Parsed as UTC midnight
const dateTime = new Date("2024-03-15T00:00:00"); // Parsed as LOCAL midnight

// In UTC+8, these are 8 hours apart!
console.log(dateOnly.toISOString());
// "2024-03-15T00:00:00.000Z"
console.log(dateTime.toISOString());
// "2024-03-14T16:00:00.000Z"  <-- previous day in UTC!

// TRAP 2: getDate() can return a different day
const lateUTC = new Date("2024-03-15T23:00:00Z");
// In UTC+8:
console.log(lateUTC.getDate());     // 16 (next day locally!)
console.log(lateUTC.getUTCDate());  // 15 (correct UTC date)

// SOLUTION: Always be explicit about timezone
// Use toISOString() for UTC, Intl with timeZone for specific zones
const safeFormat = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric', month: '2-digit', day: '2-digit',
  timeZone: 'UTC'
}).format(lateUTC);
// "2024-03-15" (correct, because we specified UTC)`}</code></pre>

      <h3 style={h3Style}>{t.tz_label_offset}</h3>
      <pre style={codeStyle}><code>{`const date = new Date();

// getTimezoneOffset() returns minutes FROM local TO UTC
// CAREFUL: the sign is reversed from what you might expect!
const offsetMinutes = date.getTimezoneOffset();
// -480 for UTC+8 (negative means east of UTC)
// 300 for UTC-5 (positive means west of UTC)

// Convert to hours
const offsetHours = -offsetMinutes / 60;
// 8 for UTC+8
// -5 for UTC-5

// Format as "+HH:MM" / "-HH:MM"
function getTimezoneString(date) {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
  const minutes = String(Math.abs(offset) % 60).padStart(2, '0');
  return \`\${sign}\${hours}:\${minutes}\`;
}

console.log(getTimezoneString(new Date()));
// "+08:00" (for UTC+8)

// Get IANA timezone name
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(tz);
// "Asia/Shanghai" (varies by system)`}</code></pre>

      {/* Section 10: Date Validation */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_validation }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_validation_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_validation_2 }} />

      <h3 style={h3Style}>{t.validation_label_check}</h3>
      <pre style={codeStyle}><code>{`// Method 1: isNaN() — most common
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// Method 2: Number.isNaN() — stricter
function isValidDate2(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

// Method 3: getTime() check
function isValidDate3(date) {
  return date instanceof Date && isFinite(date.getTime());
}

// Test cases
isValidDate(new Date("2024-03-15"));      // true
isValidDate(new Date("not a date"));      // false
isValidDate(new Date(""));                // false
isValidDate(new Date(NaN));               // false
isValidDate(new Date(0));                 // true (Jan 1, 1970)
isValidDate(new Date(Infinity));          // false`}</code></pre>

      <h3 style={h3Style}>{t.validation_label_edge}</h3>
      <pre style={codeStyle}><code>{`// JavaScript silently "fixes" out-of-range values by rolling over

// Feb 30 -> rolls to March 1
const feb30 = new Date(2024, 1, 30); // month 1 = February
console.log(feb30.toISOString().slice(0, 10));
// "2024-03-01" (silently rolled over!)

// Month 13 -> rolls to next year
const month13 = new Date(2024, 12, 1); // month 12 = January next year
console.log(month13.toISOString().slice(0, 10));
// "2025-01-01"

// Day 0 -> last day of previous month
const day0 = new Date(2024, 2, 0); // March 0 = Feb 29 (leap year!)
console.log(day0.toISOString().slice(0, 10));
// "2024-02-29"

// Negative day -> further back
const dayNeg = new Date(2024, 2, -1); // March -1 = Feb 28
console.log(dayNeg.toISOString().slice(0, 10));
// "2024-02-28"`}</code></pre>

      <h3 style={h3Style}>{t.validation_label_robust}</h3>
      <pre style={codeStyle}><code>{`// Robust validation that catches silent rollovers
function isValidDateStrict(year, month, day) {
  // month is 1-based here (1=Jan, 12=Dec)
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

// Test cases
isValidDateStrict(2024, 3, 15);   // true  — March 15 exists
isValidDateStrict(2024, 2, 29);   // true  — 2024 is a leap year
isValidDateStrict(2023, 2, 29);   // false — 2023 is NOT a leap year
isValidDateStrict(2024, 2, 30);   // false — Feb 30 never exists
isValidDateStrict(2024, 13, 1);   // false — month 13 doesn't exist

// Validate an ISO string
function isValidISODate(str) {
  if (typeof str !== 'string') return false;
  const date = new Date(str);
  return !isNaN(date.getTime()) && date.toISOString().startsWith(str.slice(0, 10));
}

isValidISODate("2024-03-15");           // true
isValidISODate("2024-02-30");           // false (rolls to Mar 1)
isValidISODate("2024-13-01");           // false
isValidISODate("not-a-date");           // false`}</code></pre>

      {/* Section 11: Performance Tips */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_performance }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_performance_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_performance_2 }} />

      <h3 style={h3Style}>{t.perf_label_cache}</h3>
      <pre style={codeStyle}><code>{`// BAD: creating a new Intl.DateTimeFormat every time
function formatDateSlow(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  }).format(date);
}

// GOOD: cache the formatter instance
const cachedFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'short', day: 'numeric'
});

function formatDateFast(date) {
  return cachedFormatter.format(date);
}

// Even better: cache per locale + options
const formatterCache = new Map();

function getFormatter(locale, options) {
  const key = locale + JSON.stringify(options);
  if (!formatterCache.has(key)) {
    formatterCache.set(key, new Intl.DateTimeFormat(locale, options));
  }
  return formatterCache.get(key);
}

function formatDateCached(date, locale = 'en-US', options = {}) {
  return getFormatter(locale, options).format(date);
}

// Benchmark: ~100x faster for repeated calls`}</code></pre>

      <h3 style={h3Style}>{t.perf_label_loop}</h3>
      <pre style={codeStyle}><code>{`// BAD: creating Date objects in a loop
const timestamps = [1710505845, 1710592245, 1710678645 /* ... thousands */];

// Slow: new Date + new Intl.DateTimeFormat on every iteration
const slow = timestamps.map(ts => {
  return new Intl.DateTimeFormat('en-US').format(new Date(ts * 1000));
});

// FAST: cache the formatter, reuse Date objects
const fmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'short', day: 'numeric'
});

const fast = timestamps.map(ts => fmt.format(new Date(ts * 1000)));
// Up to 50x faster for large arrays

// Even faster for simple formats: avoid Date entirely
function timestampToYMD(ts) {
  // Quick math for UTC date (no Date object needed)
  const days = Math.floor(ts / 86400);
  // ... but this gets complex. Use Date for correctness.
  return new Date(ts * 1000).toISOString().slice(0, 10);
}`}</code></pre>

      <h3 style={h3Style}>{t.perf_label_tips}</h3>
      <pre style={codeStyle}><code>{`// TIP 1: Use Date.now() instead of new Date().getTime()
const now1 = new Date().getTime();  // Slower (creates object)
const now2 = Date.now();            // Faster (no object creation)

// TIP 2: Compare timestamps, not Date objects
const d1 = new Date('2024-03-15');
const d2 = new Date('2024-03-16');

// Slow: string comparison
d1.toISOString() < d2.toISOString(); // true, but slow

// Fast: number comparison
d1.getTime() < d2.getTime();         // true, fast

// TIP 3: Memoize formatted results if the same dates are displayed repeatedly
const formatMemo = new Map();
function formatWithMemo(date, locale = 'en-US') {
  const key = date.getTime() + locale;
  if (!formatMemo.has(key)) {
    formatMemo.set(key, getFormatter(locale, {
      dateStyle: 'medium'
    }).format(date));
  }
  return formatMemo.get(key);
}

// TIP 4: For server-side rendering, consider pre-formatting dates
// to avoid hydration mismatches between server and client timezones`}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>{t.h2_faq}</h2>
      {[
        [t.faq1_q, t.faq1_a],
        [t.faq2_q, t.faq2_a],
        [t.faq3_q, t.faq3_a],
        [t.faq4_q, t.faq4_a],
        [t.faq5_q, t.faq5_a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}

      {/* Bottom CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30 }}>
        <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.link_tool} &rarr;
        </Link>
      </div>
    </div>
  );
}
