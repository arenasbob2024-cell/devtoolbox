'use client';

import Link from 'next/link';

export default function TimestampConverterOnlineGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A Unix timestamp is the number of seconds elapsed since January 1, 1970 00:00:00 UTC (the Unix epoch). It is a universal, timezone-independent way to represent a point in time. In JavaScript use <code>Date.now()</code> (milliseconds) or <code>Math.floor(Date.now() / 1000)</code> (seconds). In Python use <code>time.time()</code> or <code>datetime.now().timestamp()</code>. Watch out for millisecond vs second confusion, the Y2K38 overflow on 32-bit systems, and always store timestamps in UTC. Use our free <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: '#2563eb', textDecoration: 'underline' }}>Unix Timestamp Converter</Link> to instantly convert between timestamps and human-readable dates.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Unix timestamps</strong> count seconds (or milliseconds) since 1970-01-01T00:00:00Z, providing a timezone-neutral time representation.</li>
          <li><strong>JavaScript</strong> uses millisecond timestamps natively (<code>Date.now()</code>), while most Unix tools and databases use seconds.</li>
          <li><strong>Python</strong> provides <code>time.time()</code> for a float timestamp in seconds and <code>datetime.fromtimestamp()</code> for conversion back to dates.</li>
          <li><strong>The Y2K38 problem</strong> will cause 32-bit signed integer timestamps to overflow on January 19, 2038. Use 64-bit integers for future-proof storage.</li>
          <li><strong>Always store timestamps in UTC</strong> and convert to local time only at the presentation layer to avoid daylight-saving and timezone bugs.</li>
          <li><strong>ISO 8601</strong> (<code>2026-02-27T12:00:00Z</code>) is the standard human-readable format that pairs well with Unix timestamps.</li>
          <li><strong>APIs</strong> should document whether timestamps are in seconds or milliseconds, and prefer ISO 8601 strings for JSON responses.</li>
        </ul>
      </div>

      <h2>What Is a Unix Timestamp?</h2>
      <p>
        A <strong>Unix timestamp</strong> (also called Epoch time, POSIX time, or Unix time) is a system for tracking time as a single integer: the total number of seconds that have elapsed since the <strong>Unix epoch</strong> — January 1, 1970, at 00:00:00 Coordinated Universal Time (UTC). This moment in time was chosen as the starting point for the Unix operating system and has since become the de facto standard for time representation across virtually all programming languages, databases, and operating systems.
      </p>
      <p>
        For example, the timestamp <code>1709049600</code> represents February 27, 2024, 12:00:00 PM UTC. Every second that passes increments this counter by one. The Unix timestamp does not account for leap seconds (a deliberate design decision), making arithmetic on timestamps straightforward: the difference between two timestamps is the number of elapsed seconds.
      </p>
      <p>
        Need to quickly convert a timestamp? Try our free <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: '#2563eb', textDecoration: 'underline' }}>Unix Timestamp Converter</Link> tool for instant conversions between timestamps and human-readable dates.
      </p>

      <h2>Why Developers Use Unix Timestamps</h2>
      <p>
        Unix timestamps are popular for several practical reasons:
      </p>
      <ul>
        <li><strong>Timezone independence:</strong> A Unix timestamp is always UTC. There is no ambiguity about which timezone a value refers to, unlike strings like &quot;2026-02-27 3:00 PM&quot; which could mean different moments depending on the timezone.</li>
        <li><strong>Compact storage:</strong> A single 32-bit or 64-bit integer is far smaller than a date string like <code>&quot;2026-02-27T15:00:00+05:30&quot;</code>.</li>
        <li><strong>Easy arithmetic:</strong> Adding 86400 to a timestamp gives you exactly one day later. Subtracting two timestamps gives the duration in seconds. No need to worry about month lengths or leap years.</li>
        <li><strong>Universal support:</strong> Every major programming language, database, and operating system supports Unix timestamps natively.</li>
        <li><strong>Sorting:</strong> Numeric timestamps sort naturally — you can use a simple integer comparison to order events chronologically.</li>
      </ul>

      <h2>Millisecond vs Second Timestamps</h2>
      <p>
        One of the most common sources of confusion (and bugs) is the difference between <strong>second-precision</strong> and <strong>millisecond-precision</strong> timestamps.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Format</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Digits</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Example (2026-02-27)</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Used By</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Seconds</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>10 digits</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1772150400</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Unix, PHP, Python, C, MySQL, PostgreSQL</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Milliseconds</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>13 digits</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1772150400000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>JavaScript, Java, Dart, Elasticsearch</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Microseconds</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>16 digits</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1772150400000000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>PostgreSQL (interval), Go (time.UnixMicro)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Nanoseconds</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>19 digits</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1772150400000000000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Go (time.UnixNano), InfluxDB</td>
          </tr>
        </tbody>
      </table>

      <p>
        A quick way to tell them apart: if the number has <strong>10 digits</strong>, it is in seconds. If it has <strong>13 digits</strong>, it is in milliseconds. If you accidentally treat a millisecond timestamp as seconds (or vice versa), you will get dates that are either in the distant future (year 50,000+) or clustered around January 1970. This is by far the most common timestamp debugging issue.
      </p>

      <h2>Converting Timestamps in JavaScript</h2>
      <p>
        JavaScript is one of the most timestamp-heavy languages because the built-in <code>Date</code> object works with <strong>millisecond timestamps</strong> internally. Here are the essential patterns:
      </p>

      <h3>Getting the Current Timestamp</h3>
      <pre><code>{`// Current timestamp in milliseconds
const msTimestamp = Date.now();
console.log(msTimestamp); // 1772150400000

// Current timestamp in seconds (Unix standard)
const unixTimestamp = Math.floor(Date.now() / 1000);
console.log(unixTimestamp); // 1772150400

// Using Date object
const now = new Date();
console.log(now.getTime()); // 1772150400000 (ms)`}</code></pre>

      <h3>Converting a Timestamp to a Date</h3>
      <pre><code>{`// From seconds to Date
const timestamp = 1772150400;
const date = new Date(timestamp * 1000); // multiply by 1000!
console.log(date.toISOString());
// "2026-02-27T00:00:00.000Z"

// From milliseconds to Date (no multiplication needed)
const msTimestamp = 1772150400000;
const date2 = new Date(msTimestamp);
console.log(date2.toISOString());
// "2026-02-27T00:00:00.000Z"

// Common mistake: forgetting to multiply
const wrong = new Date(1772150400);
console.log(wrong.toISOString());
// "1970-01-21T12:15:50.400Z" -- January 1970!`}</code></pre>

      <h3>Converting a Date to a Timestamp</h3>
      <pre><code>{`// Date string to timestamp
const date = new Date("2026-02-27T12:00:00Z");
const seconds = Math.floor(date.getTime() / 1000);
console.log(seconds); // 1772193600

// Parse a date with timezone offset
const localDate = new Date("2026-02-27T12:00:00+08:00");
const utcSeconds = Math.floor(localDate.getTime() / 1000);
console.log(utcSeconds); // 1772164800`}</code></pre>

      <h3>Formatting Timestamps</h3>
      <pre><code>{`const date = new Date(1772150400 * 1000);

// ISO 8601 (UTC)
console.log(date.toISOString());
// "2026-02-27T00:00:00.000Z"

// Locale-aware string
console.log(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
// "2/26/2026, 7:00:00 PM"

// Intl.DateTimeFormat for full control
const fmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/London',
  timeZoneName: 'short',
});
console.log(fmt.format(date));
// "February 27, 2026, 12:00 AM GMT"`}</code></pre>

      <p>
        For quick conversions during development, use our <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: '#2563eb', textDecoration: 'underline' }}>online timestamp converter</Link> to avoid manual math.
      </p>

      <h2>Converting Timestamps in Python</h2>
      <p>
        Python provides two primary modules for timestamp operations: <code>time</code> (low-level) and <code>datetime</code> (high-level).
      </p>

      <h3>Getting the Current Timestamp</h3>
      <pre><code>{`import time
from datetime import datetime, timezone

# Current timestamp in seconds (float)
ts = time.time()
print(ts)  # 1772150400.123456

# Integer seconds
ts_int = int(time.time())
print(ts_int)  # 1772150400

# Using datetime
ts_dt = datetime.now(timezone.utc).timestamp()
print(ts_dt)  # 1772150400.123456`}</code></pre>

      <h3>Converting Between Timestamps and Dates</h3>
      <pre><code>{`from datetime import datetime, timezone

# Timestamp to datetime (UTC)
ts = 1772150400
dt = datetime.fromtimestamp(ts, tz=timezone.utc)
print(dt)  # 2026-02-27 00:00:00+00:00

# Timestamp to datetime (local timezone)
dt_local = datetime.fromtimestamp(ts)
print(dt_local)  # Depends on system timezone

# Datetime to timestamp
dt = datetime(2026, 2, 27, 12, 0, 0, tzinfo=timezone.utc)
ts = dt.timestamp()
print(int(ts))  # 1772193600

# ISO 8601 format
print(dt.isoformat())  # "2026-02-27T12:00:00+00:00"

# Parse ISO 8601 string
parsed = datetime.fromisoformat("2026-02-27T12:00:00+00:00")
print(int(parsed.timestamp()))  # 1772193600`}</code></pre>

      <h3>Working with Millisecond Timestamps in Python</h3>
      <pre><code>{`from datetime import datetime, timezone

# JavaScript-style millisecond timestamp
ms_ts = 1772150400000

# Convert to datetime
dt = datetime.fromtimestamp(ms_ts / 1000, tz=timezone.utc)
print(dt)  # 2026-02-27 00:00:00+00:00

# Convert datetime to millisecond timestamp
ms = int(dt.timestamp() * 1000)
print(ms)  # 1772150400000`}</code></pre>

      <h2>Converting Timestamps in SQL</h2>
      <p>
        Databases have their own timestamp types and conversion functions. Here are the most common patterns for PostgreSQL and MySQL.
      </p>

      <h3>PostgreSQL</h3>
      <pre><code>{`-- Current Unix timestamp (seconds)
SELECT EXTRACT(EPOCH FROM NOW())::bigint;
-- 1772150400

-- Unix timestamp to timestamp with timezone
SELECT TO_TIMESTAMP(1772150400);
-- 2026-02-27 00:00:00+00

-- Timestamp to Unix timestamp
SELECT EXTRACT(EPOCH FROM TIMESTAMP WITH TIME ZONE
  '2026-02-27T12:00:00Z')::bigint;
-- 1772193600

-- Date arithmetic with timestamps
SELECT TO_TIMESTAMP(1772150400) + INTERVAL '7 days';
-- 2026-03-06 00:00:00+00

-- Store as bigint for millisecond precision
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at_ms BIGINT DEFAULT
    (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);`}</code></pre>

      <h3>MySQL</h3>
      <pre><code>{`-- Current Unix timestamp (seconds)
SELECT UNIX_TIMESTAMP();
-- 1772150400

-- Unix timestamp to datetime
SELECT FROM_UNIXTIME(1772150400);
-- '2026-02-27 00:00:00'

-- Datetime to Unix timestamp
SELECT UNIX_TIMESTAMP('2026-02-27 12:00:00');
-- 1772193600

-- With timezone conversion
SELECT CONVERT_TZ(
  FROM_UNIXTIME(1772150400),
  '+00:00',
  'America/New_York'
);
-- '2026-02-26 19:00:00'

-- TIMESTAMP column (auto-converts to UTC)
CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}</code></pre>

      <h2>Timezone Handling Best Practices</h2>
      <p>
        Timezones are the number one source of date-related bugs. Here are the rules every developer should follow:
      </p>

      <h3>The Golden Rule: Store UTC, Display Local</h3>
      <p>
        <strong>Always store timestamps in UTC</strong> (either as Unix timestamps or as <code>TIMESTAMP WITH TIME ZONE</code> in your database). Convert to the user&apos;s local timezone only when displaying the value in the UI. This eliminates an entire class of bugs related to daylight saving time transitions, server migrations across regions, and user relocation.
      </p>

      <pre><code>{`// Backend: always work in UTC
const createdAt = Math.floor(Date.now() / 1000); // UTC seconds
// Store in database as integer or TIMESTAMPTZ

// Frontend: convert to user's local timezone for display
const date = new Date(createdAt * 1000);
const localString = date.toLocaleString('en-US', {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});`}</code></pre>

      <h3>Common Timezone Pitfalls</h3>
      <ul>
        <li><strong>DST transitions:</strong> On the day clocks spring forward, 2:00 AM to 3:00 AM does not exist. On the day clocks fall back, 1:00 AM to 2:00 AM occurs twice. If you store local times instead of UTC, these transitions cause duplicate or missing events.</li>
        <li><strong>Server timezone:</strong> Never assume your server is in a specific timezone. A cloud migration or container restart could change the system timezone. Always set <code>TZ=UTC</code> in your server environment or application config.</li>
        <li><strong>Date-only values:</strong> If you only need a date (no time component), be aware that <code>new Date(&quot;2026-02-27&quot;)</code> in JavaScript is interpreted as midnight UTC, which might display as February 26 in western hemispheres. Always specify the time component to avoid this ambiguity.</li>
        <li><strong>Offset vs. timezone name:</strong> <code>+05:30</code> is a fixed offset. <code>Asia/Kolkata</code> is a timezone name that correctly handles historical changes and DST rules. Always prefer IANA timezone names (like <code>America/New_York</code>) over fixed offsets.</li>
      </ul>

      <h3>Using dayjs for Timezone Conversions</h3>
      <pre><code>{`import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Parse a UTC timestamp
const ts = 1772150400;
const d = dayjs.unix(ts).utc();
console.log(d.format()); // "2026-02-27T00:00:00Z"

// Convert to a specific timezone
const tokyo = d.tz('Asia/Tokyo');
console.log(tokyo.format('YYYY-MM-DD HH:mm:ss z'));
// "2026-02-27 09:00:00 JST"

// Convert from local timezone to UTC timestamp
const local = dayjs.tz('2026-02-27 15:00:00', 'America/Los_Angeles');
console.log(local.unix()); // Unix timestamp in seconds`}</code></pre>

      <h2>ISO 8601 Format</h2>
      <p>
        <strong>ISO 8601</strong> is the international standard for date and time representation. It is the recommended format for APIs, log files, and any human-readable date string that needs to be unambiguous.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Format</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Example</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Date only</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>2026-02-27</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>YYYY-MM-DD</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>UTC datetime</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>2026-02-27T12:00:00Z</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Z suffix means UTC</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>With offset</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>2026-02-27T12:00:00+05:30</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>India Standard Time offset</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>With milliseconds</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>2026-02-27T12:00:00.123Z</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Sub-second precision</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Week date</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>2026-W09-5</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Year-Week-DayOfWeek</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Duration</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>P1Y2M3DT4H5M6S</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1 year 2 months 3 days 4h 5m 6s</td>
          </tr>
        </tbody>
      </table>

      <p>
        The relationship between Unix timestamps and ISO 8601 is straightforward: a Unix timestamp represents a single moment in time, and the ISO 8601 string is the human-readable representation of that moment. Converting between them:
      </p>
      <pre><code>{`// JavaScript
const ts = 1772150400;
const iso = new Date(ts * 1000).toISOString();
// "2026-02-27T00:00:00.000Z"

const backToTs = Math.floor(new Date(iso).getTime() / 1000);
// 1772150400`}</code></pre>

      <h2>Timestamps in APIs (REST and GraphQL)</h2>
      <p>
        How you represent timestamps in your API has a major impact on developer experience and bug frequency. Here are the common approaches:
      </p>

      <h3>Option 1: Unix Timestamps (Integer)</h3>
      <pre><code>{`{
  "id": "evt_abc123",
  "created_at": 1772150400,
  "updated_at": 1772193600
}`}</code></pre>
      <p>
        <strong>Pros:</strong> Compact, unambiguous, easy to sort and compare, no timezone confusion. <strong>Cons:</strong> Not human-readable in API responses, requires client-side conversion, second vs millisecond ambiguity.
      </p>

      <h3>Option 2: ISO 8601 Strings</h3>
      <pre><code>{`{
  "id": "evt_abc123",
  "created_at": "2026-02-27T00:00:00Z",
  "updated_at": "2026-02-27T12:00:00Z"
}`}</code></pre>
      <p>
        <strong>Pros:</strong> Human-readable, self-documenting, includes timezone information, widely supported by JSON parsers. <strong>Cons:</strong> Slightly larger payload, requires parsing for comparisons.
      </p>

      <h3>Option 3: Both (Recommended for Large APIs)</h3>
      <pre><code>{`{
  "id": "evt_abc123",
  "created_at": "2026-02-27T00:00:00Z",
  "created_at_unix": 1772150400,
  "updated_at": "2026-02-27T12:00:00Z",
  "updated_at_unix": 1772193600
}`}</code></pre>

      <h3>GraphQL Custom Scalar</h3>
      <pre><code>{`# Schema definition
scalar DateTime  # ISO 8601 string
scalar Timestamp # Unix seconds integer

type Event {
  id: ID!
  name: String!
  createdAt: DateTime!
  startTime: Timestamp!
}

# Query
{
  event(id: "evt_abc123") {
    name
    createdAt  # "2026-02-27T00:00:00Z"
    startTime  # 1772150400
  }
}`}</code></pre>

      <p>
        Whichever format you choose, <strong>document it clearly</strong> in your API specification. Stripe uses seconds, Twitter used seconds, Slack uses seconds with a decimal portion for sub-second precision, and most modern APIs are moving toward ISO 8601 strings. The key is consistency within your API.
      </p>

      <h2>The Y2K38 Problem (Year 2038 Bug)</h2>
      <p>
        The <strong>Year 2038 problem</strong> (also known as Y2K38, the Epochalypse, or the Unix Millennium Bug) is a critical limitation of 32-bit systems that store Unix timestamps as signed 32-bit integers. The maximum value of a signed 32-bit integer is <code>2,147,483,647</code>, which corresponds to:
      </p>
      <pre><code>{`// The last moment a 32-bit signed integer can represent
// Tuesday, January 19, 2038 at 03:14:07 UTC
const maxInt32 = 2147483647;
console.log(new Date(maxInt32 * 1000).toISOString());
// "2038-01-19T03:14:07.000Z"

// One second later, the integer overflows to -2147483648
// which maps to December 13, 1901
const overflow = -2147483648;
console.log(new Date(overflow * 1000).toISOString());
// "1901-12-13T20:45:52.000Z"`}</code></pre>

      <p>
        After 03:14:07 UTC on January 19, 2038, a 32-bit signed timestamp wraps around to a negative number, causing the date to jump back to 1901. This will affect:
      </p>
      <ul>
        <li><strong>Embedded systems:</strong> IoT devices, industrial controllers, and network equipment with 32-bit processors.</li>
        <li><strong>Legacy databases:</strong> MySQL <code>TIMESTAMP</code> columns are limited to 2038-01-19 03:14:07 UTC (use <code>DATETIME</code> or <code>BIGINT</code> instead).</li>
        <li><strong>C programs:</strong> Code using <code>time_t</code> as a 32-bit type (most modern 64-bit systems already use 64-bit <code>time_t</code>).</li>
        <li><strong>File formats:</strong> ZIP, ext3 filesystem timestamps, and other formats with 32-bit time fields.</li>
      </ul>

      <h3>How to Protect Your Code</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Language / System</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>JavaScript</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Already safe. <code>Date</code> uses 64-bit floating point internally.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Python</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Already safe. Python integers have arbitrary precision.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>C / C++</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Compile on 64-bit platform or use <code>int64_t</code> instead of <code>time_t</code> on 32-bit.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>MySQL</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Use <code>DATETIME</code> (range to 9999-12-31) or <code>BIGINT</code> instead of <code>TIMESTAMP</code>.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>PostgreSQL</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Already safe. Uses 64-bit integer microseconds internally.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Go</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Already safe. <code>time.Time</code> uses 64-bit wall clock and monotonic clock.</td>
          </tr>
        </tbody>
      </table>

      <h2>Common Debugging: Why Is My Date Showing 1970?</h2>
      <p>
        If you are seeing dates near January 1, 1970, you are almost certainly making one of these mistakes:
      </p>

      <h3>Mistake 1: Treating a Second Timestamp as Milliseconds</h3>
      <pre><code>{`// BUG: passing seconds where milliseconds are expected
const ts = 1772150400; // seconds
const date = new Date(ts); // JavaScript expects milliseconds!
console.log(date.toISOString());
// "1970-01-21T12:15:50.400Z" -- WRONG!

// FIX: multiply by 1000
const dateFixed = new Date(ts * 1000);
console.log(dateFixed.toISOString());
// "2026-02-27T00:00:00.000Z" -- CORRECT`}</code></pre>

      <h3>Mistake 2: Null or Zero Timestamp</h3>
      <pre><code>{`// A timestamp of 0 = the Unix epoch itself
const date = new Date(0);
console.log(date.toISOString());
// "1970-01-01T00:00:00.000Z"

// This often happens when:
// - A database column has a default of 0
// - An API returns null/undefined and you don't check
// - A string is parsed as NaN, which becomes 0

// FIX: always validate before converting
function safeTimestampToDate(ts) {
  if (!ts || ts <= 0) return null;
  // Auto-detect seconds vs milliseconds
  const ms = ts > 1e12 ? ts : ts * 1000;
  return new Date(ms);
}`}</code></pre>

      <h3>Mistake 3: String Parsing Fails Silently</h3>
      <pre><code>{`// Some date strings parse to NaN/Invalid Date
const date = new Date("27/02/2026"); // DD/MM/YYYY is ambiguous
console.log(date.getTime()); // NaN in most engines

// FIX: always use ISO 8601 format
const dateFixed = new Date("2026-02-27");
console.log(dateFixed.toISOString());
// "2026-02-27T00:00:00.000Z"`}</code></pre>

      <h3>Mistake 4: Timezone Offset Double-Applied</h3>
      <pre><code>{`// Suppose you have a UTC timestamp
const utcTs = 1772150400;

// BUG: converting to local then treating as UTC
const localDate = new Date(utcTs * 1000);
const wrongUtc = Date.UTC(
  localDate.getFullYear(),
  localDate.getMonth(),
  localDate.getDate(),
  localDate.getHours(),
  localDate.getMinutes()
);
// This double-applies the timezone offset!

// FIX: just use the timestamp directly
const correct = new Date(utcTs * 1000);
console.log(correct.toISOString());
// Always returns UTC, no offset issues`}</code></pre>

      <p>
        When debugging timestamp issues, our <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: '#2563eb', textDecoration: 'underline' }}>Unix Timestamp Converter</Link> is invaluable for quickly checking what a given numeric value actually represents.
      </p>

      <h2>Timestamps in Different Languages: Quick Reference</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Language</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Get Current Timestamp</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>JavaScript</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>Date.now()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Milliseconds</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Python</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>time.time()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Seconds (float)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>PHP</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>time()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Seconds</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Ruby</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>Time.now.to_i</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Seconds</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Java</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>System.currentTimeMillis()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Milliseconds</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Go</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>time.Now().Unix()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Seconds</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Rust</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>SystemTime::now().duration_since(UNIX_EPOCH)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Duration (seconds + nanos)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>C</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>time(NULL)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Seconds</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Bash</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>date +%s</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Seconds</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>SQL (PostgreSQL)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>EXTRACT(EPOCH FROM NOW())</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Seconds (float)</td>
          </tr>
        </tbody>
      </table>

      <h2>Notable Timestamps and Milestones</h2>
      <p>
        Some timestamps hold special significance in the computing world:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Timestamp</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Date (UTC)</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Significance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>0</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1970-01-01 00:00:00</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>The Unix Epoch</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1000000000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2001-09-09 01:46:40</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Billennium (10-digit milestone)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1234567890</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2009-02-13 23:31:30</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Sequential digits</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>1700000000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2023-11-14 22:13:20</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1.7 billion seconds</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>2000000000</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2033-05-18 03:33:20</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2 billion seconds</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>2147483647</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2038-01-19 03:14:07</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>32-bit signed integer max (Y2K38)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>4294967295</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2106-02-07 06:28:15</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>32-bit unsigned integer max</td>
          </tr>
        </tbody>
      </table>

      <p>
        You can verify any of these using our <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: '#2563eb', textDecoration: 'underline' }}>Timestamp Converter tool</Link>.
      </p>

      <h2>Negative Timestamps: Dates Before 1970</h2>
      <p>
        Unix timestamps can be negative to represent dates before January 1, 1970. For example, <code>-86400</code> represents December 31, 1969, and <code>-2208988800</code> represents January 1, 1900. Most modern languages handle negative timestamps correctly:
      </p>
      <pre><code>{`// JavaScript: supports negative timestamps
const moonLanding = new Date("1969-07-20T20:17:00Z");
console.log(Math.floor(moonLanding.getTime() / 1000));
// -14182580

// Python: supports negative timestamps
from datetime import datetime, timezone
dt = datetime(1969, 7, 20, 20, 17, 0, tzinfo=timezone.utc)
print(int(dt.timestamp()))
# -14182580`}</code></pre>

      <h2>Timestamp Precision: When Seconds Are Not Enough</h2>
      <p>
        For applications that require sub-second precision (distributed tracing, financial trading, high-frequency logging), you will need timestamps with more than second-level granularity:
      </p>
      <pre><code>{`// JavaScript: Performance API for microsecond precision
const highResTs = performance.now(); // milliseconds, sub-ms precision
console.log(highResTs); // 1234.567890

// Node.js: nanosecond precision
const [seconds, nanoseconds] = process.hrtime();
console.log(seconds, nanoseconds); // 123456 789012345

// Go: nanosecond precision
import "time"
ts := time.Now().UnixNano()
// 1772150400000000000

// Rust: nanosecond precision
use std::time::{SystemTime, UNIX_EPOCH};
let ts = SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .unwrap()
    .as_nanos();
// 1772150400000000000`}</code></pre>

      <h2>Database Timestamp Types: A Comparison</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Database</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Type</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Range</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Precision</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>PostgreSQL</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>TIMESTAMPTZ</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>4713 BC to 294276 AD</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Microsecond</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>MySQL</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>TIMESTAMP</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1970-01-01 to 2038-01-19</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Second</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>MySQL</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>DATETIME</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1000-01-01 to 9999-12-31</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Second</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>SQLite</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>INTEGER</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Full 64-bit range</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Second</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>MongoDB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>Date</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>64-bit ms since epoch</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Millisecond</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Recommendation:</strong> For PostgreSQL, always use <code>TIMESTAMPTZ</code> (timestamp with timezone). For MySQL, prefer <code>DATETIME</code> over <code>TIMESTAMP</code> to avoid the 2038 limit. If you need precise control and want to avoid ORM timezone surprises, store Unix timestamps as <code>BIGINT</code>.
      </p>

      <h2>Auto-Detecting Timestamp Precision</h2>
      <p>
        When receiving timestamps from external APIs or user input, you often need to auto-detect whether the value is in seconds, milliseconds, or microseconds. Here is a reliable approach:
      </p>
      <pre><code>{`function normalizeTimestamp(ts: number): Date {
  // Microseconds: 16 digits (e.g., 1772150400000000)
  if (ts > 1e15) {
    return new Date(ts / 1000);
  }
  // Milliseconds: 13 digits (e.g., 1772150400000)
  if (ts > 1e12) {
    return new Date(ts);
  }
  // Seconds: 10 digits (e.g., 1772150400)
  return new Date(ts * 1000);
}

// Usage
console.log(normalizeTimestamp(1772150400).toISOString());
// "2026-02-27T00:00:00.000Z"
console.log(normalizeTimestamp(1772150400000).toISOString());
// "2026-02-27T00:00:00.000Z"
console.log(normalizeTimestamp(1772150400000000).toISOString());
// "2026-02-27T00:00:00.000Z"`}</code></pre>

      <h2>Generating Timestamps on the Command Line</h2>
      <p>
        Sometimes you need to quickly get or convert timestamps from the terminal:
      </p>
      <pre><code>{`# Current Unix timestamp (seconds)
date +%s
# 1772150400

# Current timestamp in milliseconds
date +%s%3N
# 1772150400000

# Convert timestamp to human-readable date (Linux/GNU)
date -d @1772150400
# Fri Feb 27 00:00:00 UTC 2026

# Convert timestamp to human-readable date (macOS/BSD)
date -r 1772150400
# Fri Feb 27 00:00:00 UTC 2026

# Convert date string to timestamp (Linux/GNU)
date -d "2026-02-27T12:00:00Z" +%s
# 1772193600

# Convert date string to timestamp (macOS/BSD)
date -j -f "%Y-%m-%dT%H:%M:%SZ" "2026-02-27T12:00:00Z" +%s
# 1772193600`}</code></pre>

      <h2>Best Practices Summary</h2>
      <ol>
        <li><strong>Store UTC:</strong> Always store and transmit timestamps in UTC. Convert to local time only for display.</li>
        <li><strong>Use 64-bit integers:</strong> Avoid 32-bit timestamps to prevent Y2K38 issues. Use <code>BIGINT</code> in databases.</li>
        <li><strong>Document your precision:</strong> Explicitly state whether your API uses seconds or milliseconds in your documentation.</li>
        <li><strong>Validate inputs:</strong> Auto-detect timestamp precision using digit count (10 = seconds, 13 = milliseconds).</li>
        <li><strong>Use ISO 8601 for human-readable formats:</strong> Always output dates in ISO 8601 format when a string representation is needed.</li>
        <li><strong>Prefer timezone names over offsets:</strong> Use IANA timezone names (<code>America/New_York</code>) instead of fixed offsets (<code>-05:00</code>).</li>
        <li><strong>Test edge cases:</strong> Test with timestamps near DST transitions, the Unix epoch (0), negative timestamps, and the Y2K38 boundary.</li>
        <li><strong>Use libraries for complex operations:</strong> For anything beyond basic conversions, use established libraries like <code>dayjs</code>, <code>date-fns</code>, or <code>Luxon</code> in JavaScript, or <code>pendulum</code> / <code>arrow</code> in Python.</li>
      </ol>

      <p>
        For quick timestamp conversions during development and debugging, bookmark our <Link href={`/${lang}/tools/timestamp-converter`} style={{ color: '#2563eb', textDecoration: 'underline' }}>Unix Timestamp Converter</Link> tool. It handles seconds, milliseconds, and microsecond timestamps and shows the result in multiple timezones simultaneously.
      </p>

      {/* FAQ Section with Schema.org FAQPage JSON-LD */}
      <h2>Frequently Asked Questions</h2>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>What is a Unix timestamp?</h3>
        <p>
          A Unix timestamp (also called Epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. It provides a timezone-independent, integer-based way to represent a specific moment in time. For example, the timestamp 1772150400 represents February 27, 2026, at midnight UTC.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>How do I convert a Unix timestamp to a date in JavaScript?</h3>
        <p>
          Use <code>new Date(timestamp * 1000)</code> if your timestamp is in seconds, or <code>new Date(timestamp)</code> if it is in milliseconds. JavaScript&apos;s Date constructor expects milliseconds, so you must multiply second-precision timestamps by 1000. Then call <code>.toISOString()</code> for UTC or <code>.toLocaleString()</code> for a localized format.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>Why is my date showing January 1, 1970?</h3>
        <p>
          This happens when a timestamp value of 0 (or near zero) is converted to a date, since timestamp 0 equals the Unix epoch (January 1, 1970). Common causes include: passing a second-precision timestamp to a function that expects milliseconds, using a null or undefined value that defaults to 0, or a failed string-to-number conversion that produces NaN (which may be coerced to 0).
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>What is the difference between seconds and milliseconds timestamps?</h3>
        <p>
          A second-precision Unix timestamp is a 10-digit number (e.g., 1772150400) counting seconds since the epoch. A millisecond-precision timestamp is a 13-digit number (e.g., 1772150400000) counting milliseconds. JavaScript, Java, and Dart use milliseconds natively, while Python, PHP, C, Go, and most Unix tools use seconds. Always check your digit count to determine which format you are working with.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>What is the Y2K38 problem?</h3>
        <p>
          The Y2K38 problem (Year 2038 problem) occurs because 32-bit signed integers can only represent timestamps up to 2,147,483,647, which corresponds to January 19, 2038 at 03:14:07 UTC. After this moment, the integer overflows and wraps to a negative number, causing the date to jump back to December 1901. To avoid this, use 64-bit integers for timestamp storage. Most modern 64-bit systems, JavaScript, and Python are already safe.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>Should I use Unix timestamps or ISO 8601 strings in my API?</h3>
        <p>
          Both are valid choices. Unix timestamps (integers) are compact, unambiguous, and easy to sort. ISO 8601 strings (e.g., &quot;2026-02-27T12:00:00Z&quot;) are human-readable and self-documenting. Many modern APIs prefer ISO 8601 for JSON responses because they are immediately understandable without conversion. Some large APIs provide both formats. The key is to be consistent and document your choice clearly.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>How do I handle timezones correctly with Unix timestamps?</h3>
        <p>
          Unix timestamps are inherently UTC, so there is no timezone ambiguity in the stored value. The best practice is to always store and transmit timestamps in UTC, then convert to the user&apos;s local timezone only in the presentation layer (frontend). Use IANA timezone names like &quot;America/New_York&quot; instead of fixed offsets like &quot;-05:00&quot; because timezone names correctly handle daylight saving time transitions.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>Can Unix timestamps represent dates before 1970?</h3>
        <p>
          Yes, negative Unix timestamps represent dates before the epoch. For example, -86400 represents December 31, 1969, and -2208988800 represents January 1, 1900. Most modern programming languages (JavaScript, Python, Go, Rust) handle negative timestamps correctly. However, some older systems and database types may not support negative timestamps, so test your specific platform.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a Unix timestamp?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Unix timestamp (also called Epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. It provides a timezone-independent, integer-based way to represent a specific moment in time."
                }
              },
              {
                "@type": "Question",
                "name": "How do I convert a Unix timestamp to a date in JavaScript?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use new Date(timestamp * 1000) if your timestamp is in seconds, or new Date(timestamp) if it is in milliseconds. JavaScript's Date constructor expects milliseconds, so you must multiply second-precision timestamps by 1000."
                }
              },
              {
                "@type": "Question",
                "name": "Why is my date showing January 1, 1970?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This happens when a timestamp value of 0 (or near zero) is converted to a date, since timestamp 0 equals the Unix epoch (January 1, 1970). Common causes include passing a second-precision timestamp to a function that expects milliseconds, or using a null/undefined value that defaults to 0."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between seconds and milliseconds timestamps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A second-precision Unix timestamp is a 10-digit number counting seconds since the epoch. A millisecond-precision timestamp is a 13-digit number counting milliseconds. JavaScript, Java, and Dart use milliseconds natively, while Python, PHP, C, Go, and most Unix tools use seconds."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Y2K38 problem?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Y2K38 problem occurs because 32-bit signed integers can only represent timestamps up to 2,147,483,647, which corresponds to January 19, 2038 at 03:14:07 UTC. After this moment, the integer overflows. Use 64-bit integers for future-proof timestamp storage."
                }
              },
              {
                "@type": "Question",
                "name": "Should I use Unix timestamps or ISO 8601 strings in my API?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Both are valid. Unix timestamps are compact and unambiguous. ISO 8601 strings are human-readable and self-documenting. Many modern APIs prefer ISO 8601 for JSON responses. Some large APIs provide both formats. The key is consistency and clear documentation."
                }
              },
              {
                "@type": "Question",
                "name": "How do I handle timezones correctly with Unix timestamps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Unix timestamps are inherently UTC. Always store and transmit in UTC, then convert to the user's local timezone only in the presentation layer. Use IANA timezone names like 'America/New_York' instead of fixed offsets because they correctly handle daylight saving time."
                }
              },
              {
                "@type": "Question",
                "name": "Can Unix timestamps represent dates before 1970?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, negative Unix timestamps represent dates before the epoch. For example, -86400 represents December 31, 1969. Most modern programming languages handle negative timestamps correctly, but some older systems may not support them."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
