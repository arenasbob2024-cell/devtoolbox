import Link from 'next/link';

export default function RegexPatterns({ lang }: { lang: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are these regex patterns compatible with all programming languages?',
        acceptedAnswer: { '@type': 'Answer', text: 'These patterns use standard regex syntax compatible with JavaScript, Python, Java, C#, Go, PHP, and Ruby. Minor syntax differences may exist: for example, Python uses re.compile() while JavaScript uses /pattern/flags. The core patterns work across all major languages.' },
      },
      {
        '@type': 'Question',
        name: 'Should I use regex for email validation in production?',
        acceptedAnswer: { '@type': 'Answer', text: 'For basic format checking, the regex patterns provided here work well. However, the only way to truly validate an email address is to send a confirmation email. Use regex for client-side UX validation, but never rely on it as the sole validation method.' },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between greedy and lazy regex quantifiers?',
        acceptedAnswer: { '@type': 'Answer', text: 'Greedy quantifiers (*, +, ?) match as much text as possible. Lazy quantifiers (*?, +?, ??) match as little as possible. For example, given the string "<b>bold</b>", the greedy pattern <.*> matches the entire string, while the lazy pattern <.*?> matches only "<b>".' },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p>
        Stop writing regex patterns from scratch. Here are <strong>20 battle-tested patterns</strong> that
        cover the most common validation and extraction needs. Each pattern includes an explanation and
        example matches.
      </p>

      <p>
        <Link href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600 }}>
          Test any pattern live with our Regex Tester &rarr;
        </Link>
      </p>

      <h2>Validation Patterns</h2>

      <h3>1. Email Address</h3>
      <pre><code>{`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`}</code></pre>
      <p>Matches: <code>user@example.com</code>, <code>john.doe+tag@company.co.uk</code></p>
      <p>Does not match: <code>user@</code>, <code>@example.com</code>, <code>user@.com</code></p>

      <h3>2. URL (HTTP/HTTPS)</h3>
      <pre><code>{`^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$`}</code></pre>
      <p>Matches: <code>https://example.com</code>, <code>http://www.site.co.uk/path?q=1</code></p>

      <h3>3. Phone Number (International E.164)</h3>
      <pre><code>{`^\\+[1-9]\\d{1,14}$`}</code></pre>
      <p>Matches: <code>+14155552671</code>, <code>+442071234567</code></p>
      <p>Use this for international phone numbers. For US-specific, see pattern #4.</p>

      <h3>4. US Phone Number</h3>
      <pre><code>{`^(\\+1)?[\\s.-]?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$`}</code></pre>
      <p>Matches: <code>(415) 555-2671</code>, <code>415-555-2671</code>, <code>+1 415.555.2671</code></p>

      <h3>5. Strong Password</h3>
      <pre><code>{`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$`}</code></pre>
      <p>Requires: 8+ characters, uppercase, lowercase, digit, and special character.</p>
      <p>Matches: <code>MyP@ss1word</code> | Does not match: <code>password</code>, <code>12345678</code></p>

      <h3>6. IPv4 Address</h3>
      <pre><code>{`^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$`}</code></pre>
      <p>Matches: <code>192.168.1.1</code>, <code>10.0.0.255</code></p>
      <p>Does not match: <code>256.1.1.1</code>, <code>192.168.1</code></p>

      <h3>7. IPv6 Address (Simplified)</h3>
      <pre><code>{`^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$`}</code></pre>
      <p>Matches full IPv6 addresses like <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code></p>

      <h3>8. Date (YYYY-MM-DD)</h3>
      <pre><code>{`^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`}</code></pre>
      <p>Matches: <code>2026-01-15</code>, <code>2025-12-31</code></p>
      <p>Does not match: <code>2026-13-01</code>, <code>2026-00-15</code></p>

      <h2>Extraction Patterns</h2>

      <h3>9. Extract All Emails from Text</h3>
      <pre><code>{`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`}</code></pre>
      <p>Use with global flag (<code>g</code>) to find all email addresses in a block of text.</p>

      <h3>10. Extract All URLs from Text</h3>
      <pre><code>{`https?:\\/\\/[^\\s<>\"']+`}</code></pre>
      <p>A simpler, more forgiving URL pattern for extraction (not strict validation).</p>

      <h3>11. Extract HTML Tags</h3>
      <pre><code>{`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>`}</code></pre>
      <p>Captures tag name and content. Use <code>\\1</code> backreference for matching close tags.</p>
      <p><em>Warning: For complex HTML parsing, use a proper parser like DOMParser or cheerio.</em></p>

      <h3>12. Extract Numbers from String</h3>
      <pre><code>{`-?\\d+\\.?\\d*`}</code></pre>
      <p>Matches: integers and decimals, positive and negative. <code>42</code>, <code>-3.14</code>, <code>0.5</code></p>

      <h3>13. Extract Hashtags</h3>
      <pre><code>{`#[a-zA-Z0-9_]+`}</code></pre>
      <p>Matches: <code>#javascript</code>, <code>#dev_tools</code>, <code>#React18</code></p>

      <h2>Format Patterns</h2>

      <h3>14. Credit Card Number (Basic)</h3>
      <pre><code>{`^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$`}</code></pre>
      <p>Matches Visa, Mastercard, Amex, and Discover card formats.</p>
      <p><em>For production, use a payment processor&apos;s validation — never validate cards with regex alone.</em></p>

      <h3>15. Hex Color Code</h3>
      <pre><code>{`^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$`}</code></pre>
      <p>Matches: <code>#FFF</code>, <code>#FF5733</code>, <code>#FF573380</code> (with alpha)</p>

      <h3>16. Semantic Version (SemVer)</h3>
      <pre><code>{`^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$`}</code></pre>
      <p>Matches: <code>1.0.0</code>, <code>2.1.3-beta.1</code>, <code>1.0.0+build.123</code></p>

      <h3>17. UUID (Any Version)</h3>
      <pre><code>{`^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`}</code></pre>
      <p>Matches: <code>f47ac10b-58cc-4372-a567-0e02b2c3d479</code></p>

      <h2>Text Processing Patterns</h2>

      <h3>18. Trim Whitespace (Leading + Trailing)</h3>
      <pre><code>{`^\\s+|\\s+$`}</code></pre>
      <p>Use with replace to trim: <code>text.replace(/^\\s+|\\s+$/g, &apos;&apos;)</code></p>

      <h3>19. Multiple Spaces to Single Space</h3>
      <pre><code>{`\\s{2,}`}</code></pre>
      <p>Replace with single space: <code>text.replace(/\\s&#123;2,&#125;/g, &apos; &apos;)</code></p>

      <h3>20. Markdown Bold Text</h3>
      <pre><code>{`\\*\\*(.+?)\\*\\*`}</code></pre>
      <p>Captures text between <code>**</code> markers. Group 1 contains the bold text.</p>

      <h2>Using These Patterns in Code</h2>
      <pre><code>{`// JavaScript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
emailRegex.test('user@example.com'); // true

// Python
import re
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
re.match(pattern, 'user@example.com')  # Match object

// Java
Pattern pattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$");
pattern.matcher("user@example.com").matches(); // true`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600 }}>
          Test all these patterns live with our Regex Tester &rarr;
        </Link>
      </p>

      {/* FAQ */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <h3>Are these regex patterns compatible with all programming languages?</h3>
        <p>
          These patterns use standard regex syntax compatible with JavaScript, Python, Java, C#, Go,
          PHP, and Ruby. Minor syntax differences may exist: for example, Python uses <code>re.compile()</code>
          while JavaScript uses <code>/pattern/flags</code>. The core patterns work across all major languages.
        </p>

        <h3>Should I use regex for email validation in production?</h3>
        <p>
          For basic format checking, the regex patterns provided here work well. However, the only way
          to truly validate an email address is to send a confirmation email. Use regex for client-side
          UX validation, but never rely on it as the sole validation method.
        </p>

        <h3>What is the difference between greedy and lazy regex quantifiers?</h3>
        <p>
          Greedy quantifiers (<code>*</code>, <code>+</code>, <code>?</code>) match as much text as possible.
          Lazy quantifiers (<code>*?</code>, <code>+?</code>, <code>??</code>) match as little as possible.
          For example, given <code>&lt;b&gt;bold&lt;/b&gt;</code>, the greedy <code>&lt;.*&gt;</code> matches
          the entire string, while lazy <code>&lt;.*?&gt;</code> matches only <code>&lt;b&gt;</code>.
        </p>
      </div>
    </>
  );
}
