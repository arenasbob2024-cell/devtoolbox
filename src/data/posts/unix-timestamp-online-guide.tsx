'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Unix Timestamp Converter: Convert to Date Online — Complete Guide',
    description: 'Convert Unix timestamps to dates and back. Complete guide for JavaScript, Python, Go, and databases with timezone handling and milliseconds vs seconds.',
  },
  zh: {
    title: 'Unix 时间戳转换器：在线转换为日期完整指南',
    description: '将 Unix 时间戳转换为日期和反向转换。JavaScript、Python、Go 和数据库时区处理与毫秒/秒完整指南。',
  },
};

export default function UnixTimestampOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a Unix timestamp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Unix timestamp is the number of seconds elapsed since January 1, 1970, 00:00:00 UTC (the Unix epoch). It is a timezone-independent integer used to represent a moment in time universally across all programming languages and operating systems.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I get the current Unix timestamp in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In JavaScript, use Date.now() to get the current timestamp in milliseconds (13 digits), or Math.floor(Date.now() / 1000) to get it in seconds (10 digits). The built-in Date object works with milliseconds by default.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert a Unix timestamp to a date in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Python, use datetime.fromtimestamp(ts) to convert a Unix timestamp to a local datetime, or datetime.utcfromtimestamp(ts) for UTC. With pytz or zoneinfo you can convert to any timezone: datetime.fromtimestamp(ts, tz=ZoneInfo("America/New_York")).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between milliseconds and seconds in Unix timestamps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unix timestamps are traditionally in seconds (10 digits, ~1.7 billion in 2024), but JavaScript uses milliseconds (13 digits, ~1.7 trillion). To detect: if ts > 1e10, it is in milliseconds. Convert with Math.floor(ms / 1000). Mixing them up is a very common bug.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Y2K38 problem?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Y2K38 problem occurs on January 19, 2038, at 03:14:07 UTC when 32-bit signed integers used to store Unix timestamps overflow. Systems using 32-bit time_t will malfunction. The fix is to use 64-bit timestamps, which modern languages like Python, Go, and databases like PostgreSQL already do.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I get a Unix timestamp in Go?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Go, use time.Now().Unix() for seconds, time.Now().UnixMilli() for milliseconds, or time.Now().UnixNano() for nanoseconds. To convert back: time.Unix(ts, 0) creates a time.Time from a Unix second timestamp.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I store Unix timestamps in a database?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In MySQL use UNIX_TIMESTAMP() to get and FROM_UNIXTIME(ts) to convert. In PostgreSQL use EXTRACT(EPOCH FROM timestamp) and TO_TIMESTAMP(ts). In SQLite use strftime(\'%s\', \'now\'). Store as INTEGER (not VARCHAR) for efficient indexing and arithmetic.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I store timestamps in UTC or local time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Always store timestamps in UTC. Unix timestamps are inherently UTC — use new Date(ts * 1000).toISOString() in JavaScript or datetime.utcfromtimestamp(ts) in Python for UTC output. Convert to local time only at the display layer using the user\'s timezone preference.',
        },
      },
    ],
  };

  return (
    <article>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Canonical meta */}
      <link rel="canonical" href="https://viadreams.cc/en/blog/unix-timestamp-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A Unix timestamp counts the seconds since <strong>1970-01-01 00:00:00 UTC</strong>. JavaScript uses milliseconds — divide by 1000 for seconds. Python has <code>time.time()</code>, Go has <code>time.Now().Unix()</code>. Always store UTC, always check if you have ms (13 digits) or s (10 digits). Use our free{' '}
          <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: '#2563eb', textDecoration: 'underline' }}>Unix Timestamp Converter</Link>{' '}
          to instantly convert between timestamps and human-readable dates online.
        </p>
      </div>

      {/* Section 1 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        What Is a Unix Timestamp?
      </h2>
      <p>
        A <strong>Unix timestamp</strong> (also known as Epoch time, POSIX time, or Unix time) is an integer representing the number of seconds elapsed since the <strong>Unix epoch</strong> — January 1, 1970, at 00:00:00 Coordinated Universal Time (UTC). This starting point was chosen for the Unix operating system and has since become the universal standard for machine-readable time across every programming language, database, and operating system.
      </p>
      <p>
        As of 2024, the current Unix timestamp is approximately <strong>1.7 billion</strong> (seconds). This grows by 1 every second. Unlike human-readable date strings, a Unix timestamp carries no ambiguity about timezone — it is always UTC.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Unix Timestamp vs ISO 8601 vs RFC 2822
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Format</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Example</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Human Readable</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Timezone</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Unix Timestamp</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1709049600</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Always UTC</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Storage, arithmetic, APIs</td>
          </tr>
          <tr style={{ background: '#f8fafc' }}>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>ISO 8601</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>2024-02-27T12:00:00Z</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Explicit (Z = UTC)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>JSON APIs, logs, HTML datetime</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>RFC 2822</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>Tue, 27 Feb 2024 12:00:00 +0000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Offset required</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Email headers, HTTP Date header</td>
          </tr>
        </tbody>
      </table>

      {/* Section 2 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Get the Current Unix Timestamp
      </h2>
      <p>
        Here is how to get the current timestamp in the most popular languages:
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>JavaScript</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Milliseconds (13 digits) — JavaScript's native unit
const ms = Date.now();
console.log(ms); // e.g. 1709049600000

// Seconds (10 digits) — standard Unix timestamp
const s = Math.floor(Date.now() / 1000);
console.log(s); // e.g. 1709049600

// Alternative using new Date()
const s2 = Math.floor(new Date().getTime() / 1000);`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Python</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import time
from datetime import datetime

# Float (seconds with fractional part)
ts_float = time.time()
print(ts_float)  # e.g. 1709049600.123456

# Integer seconds
ts_int = int(time.time())
print(ts_int)  # e.g. 1709049600

# Using datetime
ts_dt = int(datetime.now().timestamp())
print(ts_dt)  # e.g. 1709049600`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Go</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "fmt"
    "time"
)

func main() {
    // Seconds
    s := time.Now().Unix()
    fmt.Println(s) // e.g. 1709049600

    // Milliseconds
    ms := time.Now().UnixMilli()
    fmt.Println(ms) // e.g. 1709049600000

    // Nanoseconds
    ns := time.Now().UnixNano()
    fmt.Println(ns)
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Bash</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Standard Unix timestamp (seconds)
date +%s
# Output: 1709049600

# With milliseconds (GNU date)
date +%s%3N
# Output: 1709049600123`}</code></pre>

      {/* Section 3 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Convert a Unix Timestamp to a Date
      </h2>
      <p>
        Converting a Unix timestamp back to a human-readable date is a daily developer task. Here are the idiomatic ways in each language. Try our{' '}
        <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: '#2563eb', textDecoration: 'underline' }}>timestamp converter tool</Link>{' '}
        for instant online conversions.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>JavaScript</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const ts = 1709049600; // Unix seconds

// Multiply by 1000 — JS Date expects milliseconds!
const date = new Date(ts * 1000);

// ISO 8601 string (UTC)
console.log(date.toISOString()); // "2024-02-27T12:00:00.000Z"

// Locale-specific string (user's browser timezone)
console.log(date.toLocaleString()); // "2/27/2024, 12:00:00 PM" (varies)

// Custom formatting
const formatted = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});
console.log(formatted); // "February 27, 2024"`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Python</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from datetime import datetime

ts = 1709049600

# Local time (uses system timezone — be careful!)
local_dt = datetime.fromtimestamp(ts)
print(local_dt)  # 2024-02-27 12:00:00 (local)

# UTC time (always safe)
utc_dt = datetime.utcfromtimestamp(ts)
print(utc_dt)  # 2024-02-27 12:00:00

# ISO 8601 format
print(utc_dt.strftime('%Y-%m-%dT%H:%M:%SZ'))  # 2024-02-27T12:00:00Z

# With timezone using zoneinfo (Python 3.9+)
from zoneinfo import ZoneInfo
tz_dt = datetime.fromtimestamp(ts, tz=ZoneInfo('America/New_York'))
print(tz_dt)  # 2024-02-27 07:00:00-05:00`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Go</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "fmt"
    "time"
)

func main() {
    ts := int64(1709049600)

    // Convert Unix seconds to time.Time (UTC)
    t := time.Unix(ts, 0).UTC()
    fmt.Println(t)                          // 2024-02-27 12:00:00 +0000 UTC
    fmt.Println(t.Format(time.RFC3339))     // 2024-02-27T12:00:00Z
    fmt.Println(t.Format("2006-01-02"))     // 2024-02-27

    // Convert Unix milliseconds to time.Time
    ms := int64(1709049600000)
    tms := time.UnixMilli(ms).UTC()
    fmt.Println(tms.Format(time.RFC3339))   // 2024-02-27T12:00:00Z
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>PHP</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<?php
$ts = 1709049600;

// Format directly from Unix timestamp
echo date('Y-m-d H:i:s', $ts);      // 2024-02-27 12:00:00 (local TZ)

// With DateTimeImmutable (recommended)
$dt = new DateTimeImmutable('@' . $ts); // '@' prefix = Unix timestamp
echo $dt->format('Y-m-d H:i:s');        // 2024-02-27 12:00:00

// Force UTC
$dtUtc = new DateTimeImmutable('@' . $ts, new DateTimeZone('UTC'));
echo $dtUtc->format(DateTime::ATOM);    // 2024-02-27T12:00:00+00:00`}</code></pre>

      {/* Section 4 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Convert a Date to a Unix Timestamp
      </h2>
      <p>
        The reverse conversion — from a human-readable date to a Unix timestamp — is equally common, especially when building search filters, expiry dates, or scheduled tasks.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>JavaScript</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// From a date string — returns seconds
const ts = Math.floor(new Date('2024-01-15').getTime() / 1000);
console.log(ts); // 1705276800

// From explicit UTC values (avoids local timezone ambiguity)
const tsUtc = Math.floor(Date.UTC(2024, 0, 15) / 1000); // month is 0-indexed!
console.log(tsUtc); // 1705276800

// From a specific time
const tsWithTime = Math.floor(new Date('2024-01-15T10:30:00Z').getTime() / 1000);
console.log(tsWithTime); // 1705314600`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Python</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from datetime import datetime, timezone
import calendar

# Local time (system timezone) — can be surprising!
dt_local = datetime(2024, 1, 15)
ts_local = int(dt_local.timestamp())
print(ts_local)  # varies by system timezone

# UTC (always explicit)
dt_utc = datetime(2024, 1, 15, tzinfo=timezone.utc)
ts_utc = int(dt_utc.timestamp())
print(ts_utc)  # 1705276800

# Using calendar.timegm for naive UTC datetime
dt_naive = datetime(2024, 1, 15, 10, 30, 0)
ts_cal = calendar.timegm(dt_naive.timetuple())
print(ts_cal)  # 1705314600`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Go</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "fmt"
    "time"
)

func main() {
    // Create a specific UTC date and get its Unix timestamp
    t := time.Date(2024, 1, 15, 0, 0, 0, 0, time.UTC)
    fmt.Println(t.Unix()) // 1705276800

    // Parse from ISO 8601 string
    parsed, _ := time.Parse(time.RFC3339, "2024-01-15T10:30:00Z")
    fmt.Println(parsed.Unix()) // 1705314600
}`}</code></pre>

      {/* Section 5 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Milliseconds vs Seconds — The #1 Source of Timestamp Bugs
      </h2>
      <p>
        The single most common timestamp bug is mixing up <strong>millisecond</strong> and <strong>second</strong> precision. JavaScript natively works with milliseconds, while the Unix standard and most other languages use seconds.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Unit</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Digits (2024)</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Example</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Languages / Systems</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Seconds</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>10 digits</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1709049600</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Unix, Python, PHP, Go, C, MySQL, PostgreSQL</td>
          </tr>
          <tr style={{ background: '#f8fafc' }}>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Milliseconds</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>13 digits</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1709049600000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>JavaScript, Java, Dart, Kotlin, Elasticsearch</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Microseconds</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>16 digits</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1709049600000000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>PostgreSQL TIMESTAMPTZ, C++ chrono</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        How to Detect the Unit at Runtime
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// JavaScript: detect ms vs s
function toSeconds(ts) {
  // If the timestamp is greater than 1e10, it's in milliseconds
  return ts > 1e10 ? Math.floor(ts / 1000) : ts;
}

console.log(toSeconds(1709049600));     // 1709049600 (already seconds)
console.log(toSeconds(1709049600000));  // 1709049600 (converted from ms)

// Python equivalent
def to_seconds(ts):
    return ts // 1000 if ts > 1e10 else ts`}</code></pre>

      {/* Section 6 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Timezone Handling — Avoid the UTC vs Local Trap
      </h2>
      <p>
        Unix timestamps are always UTC. The confusion arises when converting them to human-readable strings — some APIs produce local time, others UTC. Understanding this is essential for avoiding subtle timezone bugs.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>JavaScript — UTC vs Browser Timezone</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const ts = 1709049600; // 2024-02-27 12:00:00 UTC
const date = new Date(ts * 1000);

// ALWAYS UTC — safe for storage/display in UTC contexts
console.log(date.toISOString()); // "2024-02-27T12:00:00.000Z"

// USES BROWSER TIMEZONE — output depends on user's locale!
console.log(date.toLocaleDateString()); // varies: "2/27/2024" or "27.02.2024"

// Explicit timezone using Intl.DateTimeFormat
const fmt = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  dateStyle: 'full',
  timeStyle: 'long',
});
console.log(fmt.format(date)); // "Tuesday, February 27, 2024 at 7:00:00 AM EST"`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Python — Local vs UTC vs Named Timezone</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from datetime import datetime, timezone
from zoneinfo import ZoneInfo  # Python 3.9+

ts = 1709049600

# Local (system timezone — avoid in production code)
print(datetime.fromtimestamp(ts))               # Local time

# UTC (always explicit, always the same)
print(datetime.fromtimestamp(ts, tz=timezone.utc))  # 2024-02-27 12:00:00+00:00

# Named timezone
ny = ZoneInfo('America/New_York')
print(datetime.fromtimestamp(ts, tz=ny))        # 2024-02-27 07:00:00-05:00

tokyo = ZoneInfo('Asia/Tokyo')
print(datetime.fromtimestamp(ts, tz=tokyo))     # 2024-02-27 21:00:00+09:00

# Using pytz (older projects)
import pytz
eastern = pytz.timezone('America/New_York')
dt = datetime.fromtimestamp(ts, tz=eastern)
print(dt)  # 2024-02-27 07:00:00-05:00`}</code></pre>

      <p>
        <strong>Best practice:</strong> Always store timestamps as UTC integers in your database. Convert to the user&apos;s timezone only at the presentation layer using their stored preference.
      </p>

      {/* Section 7 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript Date Arithmetic
      </h2>
      <p>
        Adding and subtracting time intervals is straightforward with Unix timestamps — simply use arithmetic on the integer values.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const now = Date.now(); // milliseconds

// Add 7 days
const sevenDaysLater = new Date(now + 7 * 24 * 60 * 60 * 1000);
console.log(sevenDaysLater.toISOString());

// Subtract 30 days
const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
console.log(thirtyDaysAgo.toISOString());

// Calculate duration between two timestamps (in seconds)
const start = 1709049600;
const end   = 1709136000;
const durationSecs = end - start;
const hours  = Math.floor(durationSecs / 3600);
const minutes = Math.floor((durationSecs % 3600) / 60);
console.log(\`Duration: \${hours}h \${minutes}m\`); // Duration: 24h 0m

// Using date-fns library (recommended for complex date math)
// import { addDays, subDays, differenceInDays } from 'date-fns';
// const nextWeek = addDays(new Date(), 7);
// const diff = differenceInDays(new Date('2024-12-31'), new Date('2024-01-01'));
// console.log(diff); // 365`}</code></pre>

      {/* Section 8 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Go — The time Package
      </h2>
      <p>
        Go&apos;s <code>time</code> package provides comprehensive timestamp functionality. A key detail: Go&apos;s reference time is <code>Mon Jan 2 15:04:05 MST 2006</code> — use these exact values in format strings.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "fmt"
    "time"
)

func main() {
    // Current timestamp
    nowUnix  := time.Now().Unix()      // seconds
    nowMilli := time.Now().UnixMilli() // milliseconds
    nowNano  := time.Now().UnixNano()  // nanoseconds
    fmt.Println(nowUnix, nowMilli, nowNano)

    // Timestamp to time.Time
    ts := int64(1709049600)
    t := time.Unix(ts, 0).UTC()

    // Formatting (Go uses the reference time Mon Jan 2 15:04:05 MST 2006)
    fmt.Println(t.Format(time.RFC3339))          // 2024-02-27T12:00:00Z
    fmt.Println(t.Format("2006-01-02"))          // 2024-02-27
    fmt.Println(t.Format("Jan 2, 2006 3:04 PM")) // Feb 27, 2024 12:00 PM

    // Parsing a string to time.Time
    parsed, err := time.Parse(time.RFC3339, "2024-01-15T10:30:00Z")
    if err == nil {
        fmt.Println(parsed.Unix()) // 1705314600
    }

    // Date arithmetic
    tomorrow := t.Add(24 * time.Hour)
    fmt.Println(tomorrow.Format("2006-01-02")) // 2024-02-28

    lastWeek := t.Add(-7 * 24 * time.Hour)
    fmt.Println(lastWeek.Format("2006-01-02")) // 2024-02-20

    // Duration between two times
    t2, _ := time.Parse(time.RFC3339, "2024-03-01T00:00:00Z")
    duration := t2.Sub(t)
    fmt.Printf("%.0f hours\n", duration.Hours()) // 36 hours
}`}</code></pre>

      {/* Section 9 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Database Timestamps — MySQL, PostgreSQL, SQLite
      </h2>
      <p>
        Each database has its own functions for working with Unix timestamps. Store timestamps as integers (<code>INT</code> or <code>BIGINT</code>) when you want fast arithmetic, or as <code>TIMESTAMP WITH TIME ZONE</code> for richer date operations.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>MySQL</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- Current timestamp (seconds)
SELECT UNIX_TIMESTAMP();                    -- e.g. 1709049600

-- Timestamp to human-readable date
SELECT FROM_UNIXTIME(1709049600);           -- 2024-02-27 12:00:00
SELECT FROM_UNIXTIME(1709049600, '%Y-%m-%d'); -- 2024-02-27

-- Date string to Unix timestamp
SELECT UNIX_TIMESTAMP('2024-02-27 12:00:00'); -- 1709049600

-- Rows within the last 30 days (using integer column 'created_at')
SELECT * FROM events WHERE created_at > UNIX_TIMESTAMP() - 30 * 86400;

-- Add 7 days using timestamps
SELECT FROM_UNIXTIME(1709049600 + 7 * 86400); -- 2024-03-05 12:00:00`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>PostgreSQL</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- Current Unix timestamp (seconds, as float)
SELECT EXTRACT(EPOCH FROM NOW());           -- 1709049600.0

-- Integer version
SELECT FLOOR(EXTRACT(EPOCH FROM NOW()))::BIGINT;

-- Timestamp column to Unix seconds
SELECT EXTRACT(EPOCH FROM created_at) FROM events;

-- Unix seconds to timestamptz
SELECT TO_TIMESTAMP(1709049600);            -- 2024-02-27 12:00:00+00

-- Current time as Unix integer
SELECT UNIX_TIMESTAMP;  -- PostgreSQL 16+
-- Or:
SELECT (EXTRACT(EPOCH FROM now()))::BIGINT;

-- Last 30 days (using timestamptz column)
SELECT * FROM events
WHERE created_at > NOW() - INTERVAL '30 days';

-- Last 30 days (using integer unix column)
SELECT * FROM events
WHERE unix_ts > FLOOR(EXTRACT(EPOCH FROM NOW()))::BIGINT - 30 * 86400;`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>SQLite</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- Current Unix timestamp
SELECT strftime('%s', 'now');          -- e.g. 1709049600

-- Unix timestamp to ISO 8601 string
SELECT datetime(1709049600, 'unixepoch');          -- 2024-02-27 12:00:00
SELECT datetime(1709049600, 'unixepoch', 'localtime'); -- local time

-- Date string to Unix timestamp
SELECT strftime('%s', '2024-02-27 12:00:00');

-- Records from the last 7 days (unix integer column)
SELECT * FROM logs WHERE created_at > strftime('%s', 'now') - 7 * 86400;`}</code></pre>

      {/* Section 10 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Notable Epoch Timestamps Reference
      </h2>
      <p>
        These are commonly referenced Unix timestamps that have cultural or technical significance:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Unix Timestamp</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Human Date (UTC)</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Significance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>0</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1970-01-01 00:00:00</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>The Unix Epoch — the beginning of time for Unix</td>
          </tr>
          <tr style={{ background: '#f8fafc' }}>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1,000,000,000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2001-09-09 01:46:40</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Unix billennium — celebrated by programmers worldwide</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1,234,567,890</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2009-02-13 23:31:30</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Famous sequential timestamp milestone</td>
          </tr>
          <tr style={{ background: '#f8fafc' }}>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1,500,000,000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2017-07-14 02:40:00</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1.5 billion seconds milestone</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>2,000,000,000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2033-05-18 03:33:20</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2 billion seconds milestone</td>
          </tr>
          <tr style={{ background: '#f8fafc' }}>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>2,147,483,647</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2038-01-19 03:14:07</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Max 32-bit signed integer — Y2K38 overflow point</td>
          </tr>
        </tbody>
      </table>

      {/* Section 11 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        The Y2K38 Problem — The Next Big Date Bug
      </h2>
      <p>
        On <strong>January 19, 2038, at 03:14:07 UTC</strong>, 32-bit signed integers used to store Unix timestamps will overflow. The value will wrap from <code>2,147,483,647</code> (the maximum 32-bit signed integer) to <code>-2,147,483,648</code> — a negative number representing December 13, 1901. This is analogous to the Y2K bug.
      </p>
      <p>
        <strong>Affected systems:</strong>
      </p>
      <ul>
        <li>Embedded Linux systems using 32-bit <code>time_t</code> (e.g., older IoT devices, industrial controllers)</li>
        <li>MySQL TIMESTAMP columns (limited to 2038-01-19; use DATETIME instead for dates beyond that)</li>
        <li>32-bit PHP installations with 32-bit integers</li>
        <li>Some legacy C/C++ code using <code>int</code> for timestamps</li>
        <li>Old file systems that store modification times as 32-bit integers</li>
      </ul>
      <p>
        <strong>Already safe (64-bit timestamps):</strong>
      </p>
      <ul>
        <li>Python — uses 64-bit floats internally, safe far beyond 2038</li>
        <li>Go — <code>time.Time</code> uses 64-bit internally, handles dates up to year 292 billion</li>
        <li>JavaScript — uses 64-bit IEEE 754 floats, safe until year 275,760</li>
        <li>PostgreSQL TIMESTAMPTZ — 64-bit, safe until year 294,276</li>
        <li>64-bit Linux — <code>time_t</code> is 64-bit on 64-bit systems</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Fix: Always Use 64-bit Integer Columns</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- MySQL: avoid TIMESTAMP (32-bit), use BIGINT or DATETIME
-- BAD (overflows 2038):
CREATE TABLE events (created_at TIMESTAMP);

-- GOOD (64-bit, safe):
CREATE TABLE events (created_at BIGINT UNSIGNED);
-- Or:
CREATE TABLE events (created_at DATETIME);  -- supports up to 9999-12-31

-- PostgreSQL: TIMESTAMPTZ is already 64-bit — no changes needed
CREATE TABLE events (created_at TIMESTAMPTZ DEFAULT NOW());`}</code></pre>

      {/* Section 12 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Common Mistakes and How to Avoid Them
      </h2>
      <p>
        These are the most frequently encountered timestamp bugs in production code:
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        1. Forgetting to Multiply by 1000 in JavaScript
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const ts = 1709049600; // Unix seconds from an API

// WRONG — new Date() expects milliseconds, produces year 1970!
const wrong = new Date(ts);
console.log(wrong.toISOString()); // "1970-01-20T18:44:09.600Z" — WRONG!

// CORRECT — multiply by 1000
const correct = new Date(ts * 1000);
console.log(correct.toISOString()); // "2024-02-27T12:00:00.000Z" — correct`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        2. Comparing Timestamps from Different Systems with Different Precisions
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// API returns seconds, your DB stores milliseconds
const apiTimestamp = 1709049600;   // seconds
const dbTimestamp  = 1709049600000; // milliseconds

// WRONG — direct comparison is always false!
if (apiTimestamp === dbTimestamp) { ... } // never true

// CORRECT — normalize to the same unit first
const normalize = ts => ts > 1e10 ? Math.floor(ts / 1000) : ts;
if (normalize(apiTimestamp) === normalize(dbTimestamp)) { ... } // true`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        3. Storing Timestamps as Strings Instead of Integers
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// WRONG — string storage: slow sorting, no arithmetic, locale-dependent
-- MySQL:
CREATE TABLE events (created_at VARCHAR(20));  -- stores "2024-02-27 12:00:00"

-- CORRECT — integer storage: fast, sortable, arithmetic-friendly
CREATE TABLE events (created_at BIGINT UNSIGNED NOT NULL);

-- ALSO CORRECT — native datetime type
CREATE TABLE events (created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        4. Using Local Time When You Mean UTC
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python gotcha — datetime(2024, 1, 15) is LOCAL, not UTC
import calendar
from datetime import datetime, timezone

# WRONG — interprets date as local time (depends on server timezone)
wrong = int(datetime(2024, 1, 15).timestamp())

# CORRECT — explicitly UTC
correct = int(datetime(2024, 1, 15, tzinfo=timezone.utc).timestamp())
print(correct)  # 1705276800 — always the same regardless of server timezone`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        5. Using 32-bit Integer Columns for Future Dates
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- MySQL TIMESTAMP column max is 2038-01-19 — don't use for subscription expiry, etc.
-- WRONG for long-term dates:
CREATE TABLE subscriptions (expires_at TIMESTAMP);

-- CORRECT:
CREATE TABLE subscriptions (
  expires_at DATETIME,        -- or BIGINT for Unix seconds
  expires_ts BIGINT UNSIGNED  -- Unix seconds, 64-bit safe
);`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Unix timestamps</strong> count seconds since 1970-01-01 00:00:00 UTC — always timezone-neutral.</li>
          <li><strong>JavaScript uses milliseconds</strong> natively (<code>Date.now()</code>) — always multiply by 1000 when passing to <code>new Date()</code> if you have Unix seconds.</li>
          <li><strong>Python</strong>: <code>time.time()</code> for seconds (float), <code>datetime.fromtimestamp(ts, tz=timezone.utc)</code> for safe UTC conversion.</li>
          <li><strong>Go</strong>: <code>time.Now().Unix()</code> for seconds, <code>time.Unix(ts, 0)</code> to convert back — all 64-bit safe.</li>
          <li><strong>Detect ms vs s</strong>: if <code>ts &gt; 1e10</code>, it&apos;s milliseconds — divide by 1000 to normalize.</li>
          <li><strong>Always store UTC</strong>; convert to local time only at display time using the user&apos;s timezone preference.</li>
          <li><strong>Use 64-bit columns</strong> in databases — MySQL TIMESTAMP overflows in 2038, use DATETIME or BIGINT instead.</li>
          <li><strong>Y2K38</strong> affects 32-bit systems — modern languages and 64-bit databases are already safe.</li>
          <li>Use our free <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: '#2563eb', textDecoration: 'underline' }}>Unix Timestamp Converter</Link> for quick online conversions.</li>
        </ul>
      </div>
    </article>
  );
}
