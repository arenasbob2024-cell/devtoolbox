import Link from 'next/link';

export default function UuidComparison({ lang }: { lang: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Should I migrate from UUID v4 to UUID v7?',
        acceptedAnswer: { '@type': 'Answer', text: 'If your application uses UUIDs as database primary keys and you experience index fragmentation or slow inserts at scale, migrating to UUID v7 is worth considering. For small-to-medium apps, UUID v4 works fine.' },
      },
      {
        '@type': 'Question',
        name: 'Is NanoID safe for database primary keys?',
        acceptedAnswer: { '@type': 'Answer', text: 'NanoID is cryptographically secure and has a configurable length, but it lacks time-ordering. For database primary keys where insert performance matters, UUID v7 or ULID are better choices. NanoID shines in frontend applications and URL shorteners.' },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between UUID v7 and ULID?',
        acceptedAnswer: { '@type': 'Answer', text: 'Both are time-ordered unique identifiers. UUID v7 follows RFC 9562 and is compatible with existing UUID infrastructure (128-bit, standard format). ULID uses Crockford Base32 encoding (26 characters) and has built-in monotonicity within the same millisecond. UUID v7 is better for systems expecting UUID format; ULID is more compact as a string.' },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p>
        Choosing the right unique identifier format for your application is a decision that affects
        database performance, scalability, and developer experience. With <strong>UUID v7</strong> now
        an official standard (RFC 9562, published 2024), the landscape of ID generation has changed
        significantly. This guide compares the four most popular options.
      </p>

      <h2>Quick Comparison Table</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>UUID v4</th>
            <th>UUID v7</th>
            <th>ULID</th>
            <th>NanoID</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Size (bytes)</td><td>16</td><td>16</td><td>16</td><td>Configurable (default 21 chars)</td></tr>
          <tr><td>String length</td><td>36 chars</td><td>36 chars</td><td>26 chars</td><td>21 chars (default)</td></tr>
          <tr><td>Time-ordered</td><td>No</td><td>Yes (ms precision)</td><td>Yes (ms precision)</td><td>No</td></tr>
          <tr><td>Standard</td><td>RFC 9562</td><td>RFC 9562</td><td>Community spec</td><td>Community spec</td></tr>
          <tr><td>DB index friendly</td><td>Poor</td><td>Excellent</td><td>Excellent</td><td>Poor</td></tr>
          <tr><td>Collision resistance</td><td>122 random bits</td><td>74 random bits + timestamp</td><td>80 random bits + timestamp</td><td>Configurable</td></tr>
          <tr><td>URL-safe</td><td>Yes (with encoding)</td><td>Yes (with encoding)</td><td>Yes (native)</td><td>Yes (native)</td></tr>
          <tr><td>Language support</td><td>Universal</td><td>Growing rapidly</td><td>Good</td><td>Excellent (JS/TS)</td></tr>
        </tbody>
      </table>

      <h2>UUID v4: The Established Standard</h2>
      <p>
        UUID v4 has been the default choice for over a decade. It generates 128-bit identifiers using
        122 bits of randomness, producing the familiar <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code> format.
      </p>
      <p><strong>Strengths:</strong></p>
      <ul>
        <li>Universal library support in every programming language</li>
        <li>No coordination needed — generate anywhere, anytime</li>
        <li>Simple and well-understood</li>
      </ul>
      <p><strong>Weaknesses:</strong></p>
      <ul>
        <li>Random distribution causes B-tree index fragmentation in databases</li>
        <li>No time information — cannot sort by creation order</li>
        <li>At scale (millions of rows), insert performance degrades significantly</li>
      </ul>
      <pre><code>{`// JavaScript
crypto.randomUUID();
// → "f47ac10b-58cc-4372-a567-0e02b2c3d479"`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/uuid-generator`} style={{ fontWeight: 600 }}>
          Try our UUID Generator tool &rarr;
        </Link>
      </p>

      <h2>UUID v7: The New Standard (RFC 9562)</h2>
      <p>
        UUID v7, finalized in RFC 9562 (2024), is designed specifically for use as database keys.
        It combines a <strong>48-bit Unix timestamp (millisecond precision)</strong> with 74 bits of randomness,
        producing time-ordered UUIDs that are fully compatible with existing UUID infrastructure.
      </p>
      <p><strong>Strengths:</strong></p>
      <ul>
        <li>Time-ordered — naturally sorts by creation time</li>
        <li>Excellent database insert performance (no index fragmentation)</li>
        <li>Compatible with all existing UUID columns and tools</li>
        <li>Native support in PostgreSQL 17+</li>
      </ul>
      <p><strong>Weaknesses:</strong></p>
      <ul>
        <li>Fewer random bits (74 vs 122) — still astronomically collision-resistant</li>
        <li>Timestamp is embedded — reveals approximate creation time</li>
        <li>Library support still growing (but rapidly)</li>
      </ul>
      <pre><code>{`// Node.js (uuid library v9+)
import { v7 as uuidv7 } from 'uuid';
uuidv7();
// → "018e4f5c-6a7b-7000-8000-1234abcd5678"
//    ^^^^^^^^^^^^^^^^ timestamp portion`}</code></pre>

      <h2>ULID: Lexicographically Sortable</h2>
      <p>
        ULID (Universally Unique Lexicographically Sortable Identifier) predates UUID v7 and
        shares a similar design: 48-bit timestamp + 80 bits of randomness. The key difference is its
        encoding: <strong>Crockford Base32</strong>, producing compact 26-character strings like <code>01ARZ3NDEKTSV4RRFFQ69G5FAV</code>.
      </p>
      <p><strong>Strengths:</strong></p>
      <ul>
        <li>Compact string representation (26 chars vs UUID&apos;s 36)</li>
        <li>Built-in monotonicity — IDs generated in the same millisecond are still ordered</li>
        <li>Lexicographically sortable as strings (no special comparison needed)</li>
        <li>Case-insensitive and URL-safe</li>
      </ul>
      <p><strong>Weaknesses:</strong></p>
      <ul>
        <li>Not an RFC standard — community specification only</li>
        <li>Not compatible with UUID columns without conversion</li>
        <li>Less library support than UUID</li>
      </ul>
      <pre><code>{`// JavaScript
import { ulid } from 'ulid';
ulid();
// → "01ARZ3NDEKTSV4RRFFQ69G5FAV"`}</code></pre>

      <h2>NanoID: Compact and Customizable</h2>
      <p>
        NanoID takes a different approach: instead of a fixed format, it generates compact,
        URL-safe random strings with a <strong>configurable alphabet and length</strong>. The default
        is 21 characters using <code>A-Za-z0-9_-</code>.
      </p>
      <p><strong>Strengths:</strong></p>
      <ul>
        <li>Very compact (21 chars default, customizable)</li>
        <li>URL-safe by default</li>
        <li>Customizable alphabet and length</li>
        <li>Tiny library (~130 bytes gzipped) — perfect for frontend</li>
        <li>Cryptographically strong (uses crypto.getRandomValues)</li>
      </ul>
      <p><strong>Weaknesses:</strong></p>
      <ul>
        <li>No time-ordering — same B-tree fragmentation issues as UUID v4</li>
        <li>No standard specification</li>
        <li>Not compatible with UUID infrastructure</li>
      </ul>
      <pre><code>{`// JavaScript
import { nanoid } from 'nanoid';
nanoid();
// → "V1StGXR8_Z5jdHi6B-myT"`}</code></pre>

      <h2>Decision Guide: Which Should You Choose?</h2>

      <h3>Use UUID v7 when:</h3>
      <ul>
        <li>Building a new application with a relational database</li>
        <li>You need time-ordered IDs for efficient indexing</li>
        <li>Your system expects standard UUID format (PostgreSQL, MySQL, etc.)</li>
        <li>You want the best balance of compatibility and performance</li>
      </ul>

      <h3>Use UUID v4 when:</h3>
      <ul>
        <li>Working with systems that only support UUID v4</li>
        <li>You need maximum randomness with no timestamp leakage</li>
        <li>Database scale is small-to-medium (&lt; 1M rows)</li>
      </ul>

      <h3>Use ULID when:</h3>
      <ul>
        <li>You need shorter string representations</li>
        <li>Working with systems that sort strings lexicographically</li>
        <li>Monotonicity within the same millisecond is important</li>
        <li>You don&apos;t need UUID column compatibility</li>
      </ul>

      <h3>Use NanoID when:</h3>
      <ul>
        <li>Generating IDs in the browser or frontend</li>
        <li>Bundle size matters (NanoID is 130 bytes)</li>
        <li>You need short, URL-friendly identifiers</li>
        <li>Building URL shorteners, invite codes, or session tokens</li>
      </ul>

      <h2>Performance Benchmark: Database Inserts</h2>
      <p>
        The most impactful difference between these formats is database insert performance.
        Time-ordered IDs (UUID v7, ULID) maintain sequential B-tree inserts, while random
        IDs (UUID v4, NanoID) cause random page splits:
      </p>
      <table>
        <thead>
          <tr>
            <th>ID Format</th>
            <th>1M Inserts (PostgreSQL)</th>
            <th>Index Size</th>
            <th>Insert Pattern</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Auto-increment</td><td>~12s (baseline)</td><td>21 MB</td><td>Sequential</td></tr>
          <tr><td>UUID v7</td><td>~15s (+25%)</td><td>56 MB</td><td>Nearly sequential</td></tr>
          <tr><td>ULID</td><td>~15s (+25%)</td><td>56 MB</td><td>Nearly sequential</td></tr>
          <tr><td>UUID v4</td><td>~28s (+133%)</td><td>56 MB</td><td>Random</td></tr>
          <tr><td>NanoID (21 chars)</td><td>~30s (+150%)</td><td>62 MB</td><td>Random</td></tr>
        </tbody>
      </table>
      <p>
        <em>Benchmark data is approximate and varies by hardware, database version, and table structure. The relative difference is consistent across environments.</em>
      </p>

      <h2>Migration Path: UUID v4 to UUID v7</h2>
      <p>
        If you&apos;re considering migrating from UUID v4 to UUID v7, the good news is they share
        the same 128-bit format and string representation. In most databases, you can start generating
        UUID v7 values for new rows while existing UUID v4 values remain valid:
      </p>
      <pre><code>{`-- PostgreSQL 17+
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid_v7() PRIMARY KEY,
  name TEXT NOT NULL
);

-- Older PostgreSQL with uuid-ossp or pgcrypto
-- Use application-level UUID v7 generation`}</code></pre>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <h3>Should I migrate from UUID v4 to UUID v7?</h3>
        <p>
          If your application uses UUIDs as database primary keys and you experience index
          fragmentation or slow inserts at scale, migrating to UUID v7 is worth considering.
          For small-to-medium apps, UUID v4 works fine.
        </p>

        <h3>Is NanoID safe for database primary keys?</h3>
        <p>
          NanoID is cryptographically secure and has a configurable length, but it lacks time-ordering.
          For database primary keys where insert performance matters, UUID v7 or ULID are better choices.
          NanoID shines in frontend applications and URL shorteners.
        </p>

        <h3>What is the difference between UUID v7 and ULID?</h3>
        <p>
          Both are time-ordered unique identifiers. UUID v7 follows RFC 9562 and is compatible with
          existing UUID infrastructure (128-bit, standard format). ULID uses Crockford Base32 encoding
          (26 characters) and has built-in monotonicity within the same millisecond. UUID v7 is better
          for systems expecting UUID format; ULID is more compact as a string.
        </p>
      </div>
    </>
  );
}
