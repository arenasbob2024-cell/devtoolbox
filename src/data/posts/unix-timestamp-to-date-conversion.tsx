'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Unix Timestamp to Date: Convert in JavaScript, Python, Bash, SQL & More',
    intro: 'A <strong>Unix timestamp</strong> (also called Epoch time or POSIX time) is one of the most universal ways to represent a point in time in computing. This comprehensive guide shows you how to convert Unix timestamps to human-readable dates in <strong>JavaScript, Python, Bash, SQL, PHP, and Go</strong> with ready-to-copy code examples.',
    link_tool: 'Try our Unix Timestamp Converter tool',

    h2_what: '1. What Is a Unix Timestamp?',
    p_what_1: 'A Unix timestamp is the number of <strong>seconds</strong> that have elapsed since <strong>January 1, 1970, 00:00:00 UTC</strong> (known as the Unix Epoch). It is a single integer that unambiguously represents a moment in time, regardless of timezone.',
    p_what_2: 'Some systems (notably JavaScript and Java) use <strong>milliseconds</strong> since the epoch instead of seconds. A millisecond timestamp is 1000x larger, for example: <code>1700000000</code> (seconds) vs <code>1700000000000</code> (milliseconds).',
    p_what_3: 'Key properties: Unix timestamps are always in UTC, always integers (or floats for sub-second precision), and always count from the same epoch. Negative values represent dates before 1970.',

    h2_js: '2. JavaScript: new Date(), toISOString(), Intl.DateTimeFormat',
    p_js: 'JavaScript\'s <code>Date</code> constructor accepts <strong>milliseconds</strong> since epoch. If you have a Unix timestamp in seconds, multiply by 1000 first.',
    js_label_basic: 'Basic conversion (seconds to date)',
    js_label_iso: 'ISO 8601 string',
    js_label_locale: 'Locale-aware formatting with Intl.DateTimeFormat',
    js_label_parts: 'Extract individual date parts',

    h2_python: '3. Python: datetime.fromtimestamp(), Timezone-Aware',
    p_python: 'Python\'s <code>datetime</code> module provides clean timestamp conversion. Always use timezone-aware methods to avoid ambiguity.',
    py_label_basic: 'Basic conversion',
    py_label_tz: 'Timezone-aware (recommended)',
    py_label_other_tz: 'Convert to other timezones',
    py_label_ms: 'Millisecond timestamps',

    h2_bash: '4. Bash/Shell: date -d @timestamp, macOS date -r',
    p_bash: 'Linux and macOS have different <code>date</code> command syntax for converting timestamps. Here are both approaches.',
    bash_label_linux: 'Linux (GNU date)',
    bash_label_macos: 'macOS (BSD date)',
    bash_label_current: 'Get current Unix timestamp',
    bash_label_custom: 'Custom format',

    h2_sql: '5. SQL: MySQL, PostgreSQL, SQLite',
    p_sql: 'Every major SQL database has built-in functions to convert between Unix timestamps and dates.',
    sql_label_mysql: 'MySQL: FROM_UNIXTIME()',
    sql_label_pg: 'PostgreSQL: to_timestamp()',
    sql_label_sqlite: 'SQLite: datetime()',
    sql_label_reverse: 'Reverse: Date to Unix timestamp',

    h2_php: '6. PHP: date(), Carbon',
    p_php: 'PHP has excellent built-in date/time functions and the popular Carbon library for more expressive code.',
    php_label_basic: 'Built-in date()',
    php_label_datetime: 'DateTime class',
    php_label_carbon: 'Carbon library (Laravel)',

    h2_go: '7. Go: time.Unix()',
    p_go: 'Go\'s <code>time</code> package provides the <code>Unix()</code> function for clean timestamp conversion.',
    go_label_basic: 'Basic conversion',
    go_label_format: 'Custom formatting',
    go_label_ms: 'Millisecond timestamps',

    h2_ms_vs_s: '8. Milliseconds vs Seconds: How to Detect and Convert',
    p_ms_vs_s: 'One of the most common bugs when working with timestamps is mixing up seconds and milliseconds. Here is how to tell them apart and convert between them.',
    ms_rule_1: 'Seconds timestamps are typically <strong>10 digits</strong> (e.g., <code>1700000000</code>) and represent dates in the 2020s range.',
    ms_rule_2: 'Millisecond timestamps are typically <strong>13 digits</strong> (e.g., <code>1700000000000</code>).',
    ms_rule_3: 'If a timestamp produces a date in the year 50000+, you probably passed milliseconds to a function expecting seconds.',
    ms_rule_4: 'If a timestamp produces a date in January 1970, you probably passed seconds to a function expecting milliseconds.',
    ms_label_convert: 'Quick conversion formulas',

    h2_notable: '9. Notable Unix Timestamps',
    p_notable: 'Some Unix timestamps have special significance in computing history and future.',
    notable_col_ts: 'Timestamp',
    notable_col_date: 'Date (UTC)',
    notable_col_event: 'Significance',
    notable_epoch: 'Unix Epoch (the beginning)',
    notable_billion: 'First billionth second',
    notable_y2k: 'Y2K (Year 2000)',
    notable_32bit: '32-bit overflow (Year 2038 Problem)',
    notable_2billion: 'Two billionth second',
    notable_negative: 'Moon landing (negative timestamp)',
    notable_max_signed: 'Max signed 32-bit int',

    h2_tz: '10. Timezone Gotchas: UTC vs Local',
    p_tz: 'Timezone handling is the #1 source of timestamp-related bugs. Here are the critical rules to remember.',
    tz_rule_1: '<strong>Unix timestamps are always UTC.</strong> There is no such thing as a "local" Unix timestamp.',
    tz_rule_2: 'When you call <code>new Date(ts * 1000)</code> in JavaScript, the Date object stores UTC internally but <code>.toString()</code> displays in the user\'s local timezone.',
    tz_rule_3: 'Python\'s <code>datetime.fromtimestamp()</code> returns <strong>local</strong> time by default. Use <code>datetime.fromtimestamp(ts, tz=timezone.utc)</code> for UTC.',
    tz_rule_4: 'Always store timestamps in UTC and convert to local time only for display.',
    tz_rule_5: 'Be careful with daylight saving time (DST) transitions. The same local time can occur twice (fall back) or not at all (spring forward).',
    tz_label_comparison: 'JavaScript: UTC vs Local output',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is a Unix timestamp?',
    faq1_a: 'A Unix timestamp (also called Epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. It is a timezone-independent way to represent a specific moment in time as a single integer.',
    faq2_q: 'Why does JavaScript use milliseconds instead of seconds?',
    faq2_a: 'JavaScript\'s Date object was designed to match Java\'s java.util.Date, which uses milliseconds for higher precision. When working with Unix timestamps in JavaScript, always multiply seconds by 1000: new Date(timestamp * 1000).',
    faq3_q: 'What is the Year 2038 problem?',
    faq3_a: 'Systems that store Unix timestamps as a signed 32-bit integer will overflow on January 19, 2038 at 03:14:07 UTC, when the value exceeds 2,147,483,647. The timestamp will wrap to a negative number, causing the date to jump back to 1901. Most modern systems now use 64-bit integers, which won\'t overflow for 292 billion years.',
    faq4_q: 'How do I get the current Unix timestamp?',
    faq4_a: 'JavaScript: Math.floor(Date.now() / 1000). Python: import time; int(time.time()). Bash: date +%s. PHP: time(). Go: time.Now().Unix(). All return seconds since epoch in UTC.',
    faq5_q: 'Can Unix timestamps be negative?',
    faq5_a: 'Yes. Negative Unix timestamps represent dates before January 1, 1970. For example, -1 represents December 31, 1969 at 23:59:59 UTC. The Moon landing on July 20, 1969 has the timestamp -14182940. Most modern languages and databases support negative timestamps correctly.',
  },
  zh: {
    title: 'Unix 时间戳转日期：JavaScript、Python、Bash、SQL 等多语言转换指南',
    intro: '<strong>Unix 时间戳</strong>（也称 Epoch 时间或 POSIX 时间）是计算机中最通用的时间表示方式之一。本指南将展示如何在 <strong>JavaScript、Python、Bash、SQL、PHP 和 Go</strong> 中将 Unix 时间戳转换为可读日期，附带可直接复制的代码示例。',
    link_tool: '试试我们的 Unix 时间戳转换工具',

    h2_what: '1. 什么是 Unix 时间戳？',
    p_what_1: 'Unix 时间戳是从 <strong>1970 年 1 月 1 日 00:00:00 UTC</strong>（即 Unix 纪元）起经过的<strong>秒数</strong>。它是一个整数，可以无歧义地表示一个时间点，不受时区影响。',
    p_what_2: '某些系统（特别是 JavaScript 和 Java）使用<strong>毫秒</strong>而非秒。毫秒时间戳是秒的 1000 倍，例如：<code>1700000000</code>（秒）vs <code>1700000000000</code>（毫秒）。',
    p_what_3: '关键特性：Unix 时间戳始终是 UTC 时间，始终是整数（或浮点数用于亚秒精度），始终从同一纪元开始计数。负值表示 1970 年之前的日期。',

    h2_js: '2. JavaScript：new Date()、toISOString()、Intl.DateTimeFormat',
    p_js: 'JavaScript 的 <code>Date</code> 构造函数接受<strong>毫秒</strong>时间戳。如果你有秒级 Unix 时间戳，需要先乘以 1000。',
    js_label_basic: '基本转换（秒转日期）',
    js_label_iso: 'ISO 8601 字符串',
    js_label_locale: '使用 Intl.DateTimeFormat 进行本地化格式化',
    js_label_parts: '提取日期各部分',

    h2_python: '3. Python：datetime.fromtimestamp()，时区感知',
    p_python: 'Python 的 <code>datetime</code> 模块提供了简洁的时间戳转换。始终使用时区感知方法以避免歧义。',
    py_label_basic: '基本转换',
    py_label_tz: '时区感知（推荐）',
    py_label_other_tz: '转换到其他时区',
    py_label_ms: '毫秒时间戳',

    h2_bash: '4. Bash/Shell：date -d @timestamp、macOS date -r',
    p_bash: 'Linux 和 macOS 的 <code>date</code> 命令语法不同。以下是两种方式。',
    bash_label_linux: 'Linux（GNU date）',
    bash_label_macos: 'macOS（BSD date）',
    bash_label_current: '获取当前 Unix 时间戳',
    bash_label_custom: '自定义格式',

    h2_sql: '5. SQL：MySQL、PostgreSQL、SQLite',
    p_sql: '每个主流 SQL 数据库都有内置函数在 Unix 时间戳和日期之间转换。',
    sql_label_mysql: 'MySQL：FROM_UNIXTIME()',
    sql_label_pg: 'PostgreSQL：to_timestamp()',
    sql_label_sqlite: 'SQLite：datetime()',
    sql_label_reverse: '反向：日期转 Unix 时间戳',

    h2_php: '6. PHP：date()、Carbon',
    p_php: 'PHP 有出色的内置日期/时间函数，以及流行的 Carbon 库提供更具表达力的代码。',
    php_label_basic: '内置 date()',
    php_label_datetime: 'DateTime 类',
    php_label_carbon: 'Carbon 库（Laravel）',

    h2_go: '7. Go：time.Unix()',
    p_go: 'Go 的 <code>time</code> 包提供了 <code>Unix()</code> 函数进行简洁的时间戳转换。',
    go_label_basic: '基本转换',
    go_label_format: '自定义格式化',
    go_label_ms: '毫秒时间戳',

    h2_ms_vs_s: '8. 毫秒 vs 秒：如何识别和转换',
    p_ms_vs_s: '处理时间戳时最常见的 Bug 之一就是混淆秒和毫秒。以下是区分和转换方法。',
    ms_rule_1: '秒级时间戳通常是 <strong>10 位数字</strong>（如 <code>1700000000</code>），表示 2020 年代的日期。',
    ms_rule_2: '毫秒时间戳通常是 <strong>13 位数字</strong>（如 <code>1700000000000</code>）。',
    ms_rule_3: '如果时间戳产生了公元 50000 年以后的日期，你可能把毫秒传给了期望秒的函数。',
    ms_rule_4: '如果时间戳产生了 1970 年 1 月的日期，你可能把秒传给了期望毫秒的函数。',
    ms_label_convert: '快速转换公式',

    h2_notable: '9. 值得关注的 Unix 时间戳',
    p_notable: '一些 Unix 时间戳在计算机历史和未来中具有特殊意义。',
    notable_col_ts: '时间戳',
    notable_col_date: '日期（UTC）',
    notable_col_event: '意义',
    notable_epoch: 'Unix 纪元（起点）',
    notable_billion: '第 10 亿秒',
    notable_y2k: '千年虫（Y2K，2000年）',
    notable_32bit: '32 位溢出（2038 年问题）',
    notable_2billion: '第 20 亿秒',
    notable_negative: '人类登月（负时间戳）',
    notable_max_signed: '有符号 32 位整数最大值',

    h2_tz: '10. 时区陷阱：UTC vs 本地时间',
    p_tz: '时区处理是时间戳相关 Bug 的头号来源。以下是需要记住的关键规则。',
    tz_rule_1: '<strong>Unix 时间戳始终是 UTC。</strong>不存在"本地" Unix 时间戳。',
    tz_rule_2: '在 JavaScript 中调用 <code>new Date(ts * 1000)</code> 时，Date 对象内部存储 UTC，但 <code>.toString()</code> 会以用户的本地时区显示。',
    tz_rule_3: 'Python 的 <code>datetime.fromtimestamp()</code> 默认返回<strong>本地</strong>时间。使用 <code>datetime.fromtimestamp(ts, tz=timezone.utc)</code> 获取 UTC。',
    tz_rule_4: '始终以 UTC 存储时间戳，仅在显示时转换为本地时间。',
    tz_rule_5: '注意夏令时（DST）转换。同一本地时间可能出现两次（秋季回拨）或完全不存在（春季前拨）。',
    tz_label_comparison: 'JavaScript：UTC vs 本地输出对比',

    h2_faq: '常见问题',
    faq1_q: '什么是 Unix 时间戳？',
    faq1_a: 'Unix 时间戳（也称 Epoch 时间或 POSIX 时间）是从 1970 年 1 月 1 日 00:00:00 UTC 起经过的秒数。它是一种不依赖时区的方式，用一个整数表示特定的时间点。',
    faq2_q: '为什么 JavaScript 使用毫秒而不是秒？',
    faq2_a: 'JavaScript 的 Date 对象设计上与 Java 的 java.util.Date 一致，使用毫秒以获得更高精度。在 JavaScript 中处理 Unix 时间戳时，始终将秒乘以 1000：new Date(timestamp * 1000)。',
    faq3_q: '什么是 2038 年问题？',
    faq3_a: '将 Unix 时间戳存储为有符号 32 位整数的系统将在 2038 年 1 月 19 日 03:14:07 UTC 发生溢出，届时值超过 2,147,483,647。时间戳将变为负数，导致日期跳回 1901 年。大多数现代系统已使用 64 位整数，不会在 2920 亿年内溢出。',
    faq4_q: '如何获取当前 Unix 时间戳？',
    faq4_a: 'JavaScript：Math.floor(Date.now() / 1000)。Python：import time; int(time.time())。Bash：date +%s。PHP：time()。Go：time.Now().Unix()。都返回 UTC 自纪元以来的秒数。',
    faq5_q: 'Unix 时间戳可以是负数吗？',
    faq5_a: '可以。负 Unix 时间戳表示 1970 年 1 月 1 日之前的日期。例如，-1 表示 1969 年 12 月 31 日 23:59:59 UTC。1969 年 7 月 20 日的人类登月时间戳为 -14182940。大多数现代语言和数据库都能正确处理负时间戳。',
  },
};

export default function UnixTimestampToDate({ lang }: { lang: string }) {
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

  const notableTimestamps = [
    ['0', '1970-01-01 00:00:00', t.notable_epoch],
    ['-14182940', '1969-07-20 20:17:40', t.notable_negative],
    ['946684800', '2000-01-01 00:00:00', t.notable_y2k],
    ['1000000000', '2001-09-09 01:46:40', t.notable_billion],
    ['2000000000', '2033-05-18 03:33:20', t.notable_2billion],
    ['2147483647', '2038-01-19 03:14:07', `${t.notable_32bit} (${t.notable_max_signed})`],
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }} dangerouslySetInnerHTML={{ __html: t.intro }} />

      <div style={{ padding: 16, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginBottom: 30 }}>
        <Link href={`/${lang}/tools/unix-timestamp`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.link_tool} &rarr;
        </Link>
      </div>

      {/* Section 1: What Is a Unix Timestamp? */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_what }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_what_1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_what_2 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_what_3 }} />
      <pre style={codeStyle}><code>{`Unix Epoch:  January 1, 1970 00:00:00 UTC
Timestamp:   0

Current:     ~1700000000  (November 2023)
             = 1,700,000,000 seconds since epoch

In milliseconds: 1700000000000  (13 digits)
In seconds:      1700000000     (10 digits)`}</code></pre>

      {/* Section 2: JavaScript */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_js }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_js }} />

      <h3 style={h3Style}>{t.js_label_basic}</h3>
      <pre style={codeStyle}><code>{`const timestamp = 1700000000; // seconds

// Convert to Date object (multiply by 1000 for milliseconds)
const date = new Date(timestamp * 1000);

console.log(date);
// Tue Nov 14 2023 22:13:20 GMT+0000 (UTC)

console.log(date.toUTCString());
// "Tue, 14 Nov 2023 22:13:20 GMT"

console.log(date.toLocaleDateString());
// "11/14/2023" (varies by locale)`}</code></pre>

      <h3 style={h3Style}>{t.js_label_iso}</h3>
      <pre style={codeStyle}><code>{`const timestamp = 1700000000;
const date = new Date(timestamp * 1000);

console.log(date.toISOString());
// "2023-11-14T22:13:20.000Z"

// Parse back to timestamp
const parsed = Date.parse("2023-11-14T22:13:20.000Z");
console.log(parsed / 1000);
// 1700000000`}</code></pre>

      <h3 style={h3Style}>{t.js_label_locale}</h3>
      <pre style={codeStyle}><code>{`const timestamp = 1700000000;
const date = new Date(timestamp * 1000);

// US English
const usFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
  timeStyle: 'long',
  timeZone: 'America/New_York'
}).format(date);
// "Tuesday, November 14, 2023 at 5:13:20 PM EST"

// Japanese
const jpFormat = new Intl.DateTimeFormat('ja-JP', {
  dateStyle: 'full',
  timeStyle: 'long',
  timeZone: 'Asia/Tokyo'
}).format(date);
// "2023\u5E7411\u670815\u65E5\u6C34\u66DC\u65E5 7:13:20 JST"

// Chinese
const cnFormat = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  timeZone: 'Asia/Shanghai'
}).format(date);
// "2023/11/15 06:13:20"`}</code></pre>

      <h3 style={h3Style}>{t.js_label_parts}</h3>
      <pre style={codeStyle}><code>{`const timestamp = 1700000000;
const date = new Date(timestamp * 1000);

const year   = date.getUTCFullYear();  // 2023
const month  = date.getUTCMonth() + 1; // 11 (0-indexed, so +1)
const day    = date.getUTCDate();       // 14
const hours  = date.getUTCHours();      // 22
const mins   = date.getUTCMinutes();    // 13
const secs   = date.getUTCSeconds();    // 20

// Get current timestamp
const now = Math.floor(Date.now() / 1000);`}</code></pre>

      {/* Section 3: Python */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_python }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_python }} />

      <h3 style={h3Style}>{t.py_label_basic}</h3>
      <pre style={codeStyle}><code>{`from datetime import datetime

timestamp = 1700000000

# Basic conversion (returns local time!)
dt = datetime.fromtimestamp(timestamp)
print(dt)
# 2023-11-14 22:13:20 (in your local timezone)

# Format as string
print(dt.strftime("%Y-%m-%d %H:%M:%S"))
# "2023-11-14 22:13:20"`}</code></pre>

      <h3 style={h3Style}>{t.py_label_tz}</h3>
      <pre style={codeStyle}><code>{`from datetime import datetime, timezone

timestamp = 1700000000

# UTC (recommended approach)
dt_utc = datetime.fromtimestamp(timestamp, tz=timezone.utc)
print(dt_utc)
# 2023-11-14 22:13:20+00:00

print(dt_utc.isoformat())
# "2023-11-14T22:13:20+00:00"

# Get current UTC timestamp
import time
current_ts = int(time.time())
print(current_ts)`}</code></pre>

      <h3 style={h3Style}>{t.py_label_other_tz}</h3>
      <pre style={codeStyle}><code>{`from datetime import datetime, timezone
from zoneinfo import ZoneInfo  # Python 3.9+

timestamp = 1700000000

# Convert to Tokyo time
tokyo = datetime.fromtimestamp(timestamp, tz=ZoneInfo("Asia/Tokyo"))
print(tokyo)
# 2023-11-15 07:13:20+09:00

# Convert to New York time
ny = datetime.fromtimestamp(timestamp, tz=ZoneInfo("America/New_York"))
print(ny)
# 2023-11-14 17:13:20-05:00

# Convert to Shanghai time
shanghai = datetime.fromtimestamp(timestamp, tz=ZoneInfo("Asia/Shanghai"))
print(shanghai)
# 2023-11-15 06:13:20+08:00`}</code></pre>

      <h3 style={h3Style}>{t.py_label_ms}</h3>
      <pre style={codeStyle}><code>{`from datetime import datetime, timezone

ms_timestamp = 1700000000000  # 13 digits = milliseconds

# Divide by 1000 to get seconds
dt = datetime.fromtimestamp(ms_timestamp / 1000, tz=timezone.utc)
print(dt)
# 2023-11-14 22:13:20+00:00`}</code></pre>

      {/* Section 4: Bash */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_bash }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_bash }} />

      <h3 style={h3Style}>{t.bash_label_linux}</h3>
      <pre style={codeStyle}><code>{`# Linux (GNU coreutils date)
date -d @1700000000
# Tue Nov 14 22:13:20 UTC 2023

# With UTC explicitly
date -u -d @1700000000
# Tue Nov 14 22:13:20 UTC 2023

# ISO 8601 format
date -d @1700000000 --iso-8601=seconds
# 2023-11-14T22:13:20+00:00`}</code></pre>

      <h3 style={h3Style}>{t.bash_label_macos}</h3>
      <pre style={codeStyle}><code>{`# macOS (BSD date) - uses -r instead of -d @
date -r 1700000000
# Tue Nov 14 22:13:20 UTC 2023

# With UTC
date -u -r 1700000000
# Tue Nov 14 22:13:20 UTC 2023`}</code></pre>

      <h3 style={h3Style}>{t.bash_label_current}</h3>
      <pre style={codeStyle}><code>{`# Works on both Linux and macOS
date +%s
# 1700000000 (current timestamp in seconds)

# Milliseconds (Linux)
date +%s%N | cut -b1-13

# Milliseconds (macOS with Python)
python3 -c "import time; print(int(time.time() * 1000))"`}</code></pre>

      <h3 style={h3Style}>{t.bash_label_custom}</h3>
      <pre style={codeStyle}><code>{`# Linux
date -d @1700000000 "+%Y-%m-%d %H:%M:%S"
# 2023-11-14 22:13:20

# macOS
date -r 1700000000 "+%Y-%m-%d %H:%M:%S"
# 2023-11-14 22:13:20

# Common format specifiers:
# %Y = 4-digit year    %m = month (01-12)
# %d = day (01-31)     %H = hour (00-23)
# %M = minute (00-59)  %S = second (00-59)
# %Z = timezone name   %z = timezone offset`}</code></pre>

      {/* Section 5: SQL */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_sql }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_sql }} />

      <h3 style={h3Style}>{t.sql_label_mysql}</h3>
      <pre style={codeStyle}><code>{`-- MySQL: Convert timestamp to datetime
SELECT FROM_UNIXTIME(1700000000);
-- '2023-11-14 22:13:20'

-- With custom format
SELECT FROM_UNIXTIME(1700000000, '%Y-%m-%d %H:%i:%s');
-- '2023-11-14 22:13:20'

-- In a query
SELECT id, name, FROM_UNIXTIME(created_at) AS created_date
FROM users
WHERE created_at > UNIX_TIMESTAMP('2023-01-01');`}</code></pre>

      <h3 style={h3Style}>{t.sql_label_pg}</h3>
      <pre style={codeStyle}><code>{`-- PostgreSQL: Convert timestamp to date
SELECT to_timestamp(1700000000);
-- '2023-11-14 22:13:20+00'

-- With timezone
SELECT to_timestamp(1700000000) AT TIME ZONE 'America/New_York';
-- '2023-11-14 17:13:20'

-- Format output
SELECT to_char(to_timestamp(1700000000), 'YYYY-MM-DD HH24:MI:SS');
-- '2023-11-14 22:13:20'`}</code></pre>

      <h3 style={h3Style}>{t.sql_label_sqlite}</h3>
      <pre style={codeStyle}><code>{`-- SQLite: Convert timestamp to datetime string
SELECT datetime(1700000000, 'unixepoch');
-- '2023-11-14 22:13:20'

-- In local time
SELECT datetime(1700000000, 'unixepoch', 'localtime');
-- '2023-11-14 17:13:20' (depends on server timezone)

-- With strftime
SELECT strftime('%Y-%m-%d %H:%M:%S', 1700000000, 'unixepoch');
-- '2023-11-14 22:13:20'`}</code></pre>

      <h3 style={h3Style}>{t.sql_label_reverse}</h3>
      <pre style={codeStyle}><code>{`-- MySQL: Date to Unix timestamp
SELECT UNIX_TIMESTAMP('2023-11-14 22:13:20');
-- 1700000000

-- PostgreSQL: Date to Unix timestamp
SELECT EXTRACT(EPOCH FROM TIMESTAMP '2023-11-14 22:13:20');
-- 1700000000

-- SQLite: Date to Unix timestamp
SELECT strftime('%s', '2023-11-14 22:13:20');
-- '1700000000'`}</code></pre>

      {/* Section 6: PHP */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_php }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_php }} />

      <h3 style={h3Style}>{t.php_label_basic}</h3>
      <pre style={codeStyle}><code>{`<?php
$timestamp = 1700000000;

// Basic date() function
echo date('Y-m-d H:i:s', $timestamp);
// "2023-11-14 22:13:20"

// ISO 8601
echo date('c', $timestamp);
// "2023-11-14T22:13:20+00:00"

// RFC 2822 (email headers)
echo date('r', $timestamp);
// "Tue, 14 Nov 2023 22:13:20 +0000"

// Current timestamp
echo time();
// current Unix timestamp in seconds`}</code></pre>

      <h3 style={h3Style}>{t.php_label_datetime}</h3>
      <pre style={codeStyle}><code>{`<?php
$timestamp = 1700000000;

// DateTime class (more flexible)
$dt = new DateTime("@$timestamp");
$dt->setTimezone(new DateTimeZone('UTC'));
echo $dt->format('Y-m-d H:i:s T');
// "2023-11-14 22:13:20 UTC"

// Convert to other timezone
$dt->setTimezone(new DateTimeZone('Asia/Shanghai'));
echo $dt->format('Y-m-d H:i:s T');
// "2023-11-15 06:13:20 CST"

// DateTimeImmutable (thread-safe)
$dti = (new DateTimeImmutable("@$timestamp"))
    ->setTimezone(new DateTimeZone('America/New_York'));
echo $dti->format('Y-m-d H:i:s T');
// "2023-11-14 17:13:20 EST"`}</code></pre>

      <h3 style={h3Style}>{t.php_label_carbon}</h3>
      <pre style={codeStyle}><code>{`<?php
use Carbon\\Carbon;

$timestamp = 1700000000;

// Carbon (popular in Laravel)
$date = Carbon::createFromTimestamp($timestamp);
echo $date->toDateTimeString();
// "2023-11-14 22:13:20"

echo $date->diffForHumans();
// "X months ago"

echo $date->timezone('Asia/Tokyo')->format('Y-m-d H:i:s');
// "2023-11-15 07:13:20"

// From milliseconds
$ms = Carbon::createFromTimestampMs(1700000000000);`}</code></pre>

      {/* Section 7: Go */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_go }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_go }} />

      <h3 style={h3Style}>{t.go_label_basic}</h3>
      <pre style={codeStyle}><code>{`package main

import (
    "fmt"
    "time"
)

func main() {
    timestamp := int64(1700000000)

    // Convert seconds to time.Time
    t := time.Unix(timestamp, 0)
    fmt.Println(t.UTC())
    // 2023-11-14 22:13:20 +0000 UTC

    fmt.Println(t.UTC().String())
    // "2023-11-14 22:13:20 +0000 UTC"
}`}</code></pre>

      <h3 style={h3Style}>{t.go_label_format}</h3>
      <pre style={codeStyle}><code>{`package main

import (
    "fmt"
    "time"
)

func main() {
    t := time.Unix(1700000000, 0).UTC()

    // Go uses a reference time: Mon Jan 2 15:04:05 MST 2006
    fmt.Println(t.Format("2006-01-02 15:04:05"))
    // "2023-11-14 22:13:20"

    fmt.Println(t.Format(time.RFC3339))
    // "2023-11-14T22:13:20Z"

    fmt.Println(t.Format(time.RFC1123))
    // "Tue, 14 Nov 2023 22:13:20 UTC"

    // With timezone
    loc, _ := time.LoadLocation("Asia/Tokyo")
    fmt.Println(t.In(loc).Format("2006-01-02 15:04:05 MST"))
    // "2023-11-15 07:13:20 JST"

    // Get current timestamp
    now := time.Now().Unix()
    fmt.Println(now)
}`}</code></pre>

      <h3 style={h3Style}>{t.go_label_ms}</h3>
      <pre style={codeStyle}><code>{`package main

import (
    "fmt"
    "time"
)

func main() {
    msTimestamp := int64(1700000000000) // milliseconds

    // Unix() takes (seconds, nanoseconds)
    t := time.Unix(0, msTimestamp*int64(time.Millisecond))
    fmt.Println(t.UTC())
    // 2023-11-14 22:13:20 +0000 UTC

    // Or divide by 1000
    t2 := time.Unix(msTimestamp/1000, 0)
    fmt.Println(t2.UTC())
    // 2023-11-14 22:13:20 +0000 UTC
}`}</code></pre>

      {/* Section 8: Milliseconds vs Seconds */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_ms_vs_s }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_ms_vs_s }} />

      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li dangerouslySetInnerHTML={{ __html: t.ms_rule_1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.ms_rule_2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.ms_rule_3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.ms_rule_4 }} />
      </ul>

      <h3 style={h3Style}>{t.ms_label_convert}</h3>
      <pre style={codeStyle}><code>{`// Detect: count digits
function isMilliseconds(ts) {
  return ts.toString().length >= 13;
}

// Seconds to milliseconds
const ms = seconds * 1000;

// Milliseconds to seconds
const sec = Math.floor(milliseconds / 1000);

// Auto-detect and normalize to seconds
function toSeconds(ts) {
  return ts > 9999999999 ? Math.floor(ts / 1000) : ts;
}

// Python equivalent
def to_seconds(ts):
    return ts // 1000 if ts > 9999999999 else ts`}</code></pre>

      {/* Section 9: Notable Timestamps Table */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_notable }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_notable }} />

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.notable_col_ts}</th>
              <th style={thStyle}>{t.notable_col_date}</th>
              <th style={thStyle}>{t.notable_col_event}</th>
            </tr>
          </thead>
          <tbody>
            {notableTimestamps.map(([ts, date, event], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={tdStyle}><code style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{ts}</code></td>
                <td style={tdStyle}><code>{date}</code></td>
                <td style={tdStyle}>{event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre style={codeStyle}><code>{`# Verify notable timestamps yourself:

# Bash (Linux)
date -u -d @0                # Thu Jan  1 00:00:00 UTC 1970
date -u -d @946684800        # Sat Jan  1 00:00:00 UTC 2000
date -u -d @2147483647       # Tue Jan 19 03:14:07 UTC 2038

# Python
from datetime import datetime, timezone
datetime.fromtimestamp(2147483647, tz=timezone.utc)
# datetime(2038, 1, 19, 3, 14, 7, tzinfo=timezone.utc)

# JavaScript
new Date(2147483647 * 1000).toISOString()
// "2038-01-19T03:14:07.000Z"`}</code></pre>

      {/* Section 10: Timezone Gotchas */}
      <h2 style={h2Style} dangerouslySetInnerHTML={{ __html: t.h2_tz }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.p_tz }} />

      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li dangerouslySetInnerHTML={{ __html: t.tz_rule_1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.tz_rule_2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.tz_rule_3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.tz_rule_4 }} />
        <li dangerouslySetInnerHTML={{ __html: t.tz_rule_5 }} />
      </ul>

      <h3 style={h3Style}>{t.tz_label_comparison}</h3>
      <pre style={codeStyle}><code>{`const timestamp = 1700000000;
const date = new Date(timestamp * 1000);

// These are DIFFERENT if you're not in UTC:
console.log(date.toString());
// "Tue Nov 14 2023 17:13:20 GMT-0500 (Eastern Standard Time)"
//  ^ Local time

console.log(date.toUTCString());
// "Tue, 14 Nov 2023 22:13:20 GMT"
//  ^ UTC time

console.log(date.toISOString());
// "2023-11-14T22:13:20.000Z"
//  ^ Always UTC (the Z means Zulu/UTC)

// Safe: always use UTC methods
console.log(date.getUTCHours());   // 22 (UTC)
console.log(date.getHours());       // 17 (local, if EST)`}</code></pre>

      <pre style={codeStyle}><code>{`# Python timezone comparison
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

ts = 1700000000

# WRONG: naive datetime (no timezone info)
naive = datetime.fromtimestamp(ts)
print(naive)  # ambiguous - depends on server timezone

# RIGHT: timezone-aware
utc = datetime.fromtimestamp(ts, tz=timezone.utc)
print(utc)    # 2023-11-14 22:13:20+00:00

# Convert between zones safely
eastern = utc.astimezone(ZoneInfo("America/New_York"))
print(eastern)  # 2023-11-14 17:13:20-05:00

# The underlying timestamp is always the same
print(utc.timestamp() == eastern.timestamp())  # True`}</code></pre>

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
        <Link href={`/${lang}/tools/unix-timestamp`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.link_tool} &rarr;
        </Link>
      </div>
    </div>
  );
}
