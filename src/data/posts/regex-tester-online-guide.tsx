'use client';

import Link from 'next/link';

export default function RegexTesterOnlineGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>regex tester</strong> lets you write, debug, and validate regular expressions against sample text in real time. Instead of guessing whether your pattern works, you get instant visual feedback showing every match, capture group, and substitution. Our free <Link href={`/${lang}/tools/regex-tester`}>online regex tester</Link> supports JavaScript, Python, and Go flavors with live highlighting, flag toggles, and a built-in cheat sheet. This guide covers regex syntax fundamentals, the 10 most useful patterns, language-specific APIs, common mistakes, performance tips, and when to skip regex entirely.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>An online <strong>regex tester</strong> provides instant match highlighting, group extraction, and error feedback without writing boilerplate code.</li>
          <li>Regex flavors differ across languages: JavaScript uses <code>/pattern/flags</code>, Python uses <code>re.compile()</code>, Go uses <code>regexp.MustCompile()</code> with RE2 syntax.</li>
          <li>The 10 most common regex patterns (email, URL, IP, phone, date, etc.) cover the vast majority of real-world validation tasks.</li>
          <li>Catastrophic backtracking is the number one regex performance pitfall; use atomic groups, possessive quantifiers, or rewrite nested quantifiers.</li>
          <li>For simple substring checks, <code>string.includes()</code>, <code>startsWith()</code>, or <code>indexOf()</code> outperform regex in both speed and readability.</li>
          <li>Always test edge cases: empty strings, Unicode input, extremely long input, and boundary conditions.</li>
        </ul>
      </div>

      <h2>What Is a Regex Tester and Why Use One?</h2>
      <p>
        A <strong>regular expression tester</strong> (regex tester) is a tool that lets you type a regex pattern and a test string, then instantly see which parts of the string match. It highlights matches in real time, shows numbered capture groups, reports syntax errors, and often lets you toggle flags like case-insensitive (<code>i</code>), global (<code>g</code>), or multiline (<code>m</code>) with a single click.
      </p>
      <p>
        Without a <strong>regex tester online</strong>, developers typically write a small script, run it, inspect the output, tweak the pattern, and repeat. That feedback loop is slow and error-prone. A dedicated tester tool collapses that cycle into a single screen where every keystroke updates the results instantly. This is especially valuable when you are learning regex for the first time, debugging a complex pattern that handles nested groups, or validating a pattern against dozens of edge-case inputs simultaneously.
      </p>
      <p>
        There are several categories of regex testers available: browser-based tools like the one at DevToolBox, IDE plugins (VS Code Regex Previewer), command-line utilities (<code>grep -P</code>, <code>ripgrep</code>), and language REPLs. Browser-based testers are the most accessible because they require zero setup and work on any operating system. They also tend to offer the best visual feedback: color-coded matches, hover tooltips for groups, and side-by-side substitution previews.
      </p>
      <p>
        Key features to look for in a <strong>regex checker</strong> include: support for multiple regex flavors (PCRE, JavaScript, Python, Go RE2), real-time match highlighting, capture group numbering, substitution preview, a shareable URL so you can send your pattern to a colleague, and a built-in syntax reference. The DevToolBox <Link href={`/${lang}/tools/regex-tester`}>regex tester</Link> provides all of these features for free, with no account required.
      </p>

      <h2>DevToolBox Regex Tester &mdash; Test Patterns Instantly</h2>
      <p>
        The <Link href={`/${lang}/tools/regex-tester`}>DevToolBox Regex Tester</Link> is a free, privacy-friendly tool that runs entirely in your browser. No data is sent to any server. Here is what you get:
      </p>
      <ul>
        <li><strong>Live match highlighting</strong> &mdash; matches light up as you type the pattern or the test string.</li>
        <li><strong>Flag toggles</strong> &mdash; enable or disable <code>g</code>, <code>i</code>, <code>m</code>, <code>s</code>, <code>u</code>, and <code>y</code> flags with a single click.</li>
        <li><strong>Capture group table</strong> &mdash; see every numbered and named group extracted from each match.</li>
        <li><strong>Replace mode</strong> &mdash; preview substitution results (<code>$1</code>, <code>$&amp;</code>, named backreferences) alongside the original text.</li>
        <li><strong>Quick reference</strong> &mdash; a collapsible cheat sheet of metacharacters, quantifiers, anchors, and character classes.</li>
        <li><strong>Shareable URL</strong> &mdash; the pattern and test string are encoded in the URL hash so you can bookmark or share them.</li>
      </ul>
      <p>
        To get started, open the <Link href={`/${lang}/tools/regex-tester`}>regex tester</Link>, paste your pattern, paste your test string, and watch the matches appear. Try adjusting flags, adding capture groups, or switching to replace mode to see substitution results in real time.
      </p>
      <p>
        Below is an example workflow. Suppose you need to extract all email addresses from a log file. You would enter the pattern and test input like this:
      </p>
      <pre><code className="language-text">{`Pattern: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}
Flags:   g

Test string:
Contact alice@example.com or bob.jones@company.co.uk for details.
Invalid: @missing.com, noatsign.com, hello@.com

Matches found:
  1. alice@example.com
  2. bob.jones@company.co.uk`}</code></pre>

      <h2>Regex Syntax Quick Reference</h2>
      <p>
        The table below summarizes the most important regex metacharacters, quantifiers, and assertions. Bookmark this page or keep the <Link href={`/${lang}/tools/regex-tester`}>regex tester</Link> cheat sheet open while you work.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Symbol</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Description</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>.</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Dot</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Any character except newline</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>a.c</code> matches <code>abc</code>, <code>a1c</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>^</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Caret</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Start of string (or line in multiline mode)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>^Hello</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>$</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Dollar</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>End of string (or line in multiline mode)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>world$</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>*</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Star</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>0 or more of previous token</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>ab*c</code> matches <code>ac</code>, <code>abc</code>, <code>abbc</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>+</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Plus</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1 or more of previous token</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>ab+c</code> matches <code>abc</code>, <code>abbc</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>?</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Question</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>0 or 1 of previous token (optional)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>colou?r</code> matches <code>color</code> and <code>colour</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'{n,m}'}</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Quantifier</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Between n and m of previous token</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'a{2,4}'}</code> matches <code>aa</code>, <code>aaa</code>, <code>aaaa</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>[abc]</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Character class</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Any one of the listed characters</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>[aeiou]</code> matches any vowel</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>[^abc]</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Negated class</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Any character NOT in the class</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>[^0-9]</code> matches non-digits</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>\d</code>, <code>\w</code>, <code>\s</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Shorthand classes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Digit, word char, whitespace</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>\d+</code> matches <code>42</code>, <code>100</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Capture group</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Groups and captures matched text</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>(\d+)-(\d+)</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'(?<name>)'}</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Named group</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Capture with a name instead of a number</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'(?<year>\\d{4})'}</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>(?:)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Non-capturing group</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Groups without capturing</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>(?:http|https)://</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>\b</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Word boundary</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Position between a word char and a non-word char</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>\bcat\b</code> matches &quot;cat&quot; but not &quot;catch&quot;</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>(?=)</code>, <code>(?!)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Lookahead</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Positive/negative lookahead assertion</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>\d+(?= USD)</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'(?<=)'}</code>, <code>{'(?<!)'}</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Lookbehind</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Positive/negative lookbehind assertion</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'(?<=\\$)\\d+'}</code></td>
          </tr>
        </tbody>
      </table>

      <h2>10 Most Useful Regex Patterns</h2>
      <p>
        The following patterns cover the most common validation and extraction tasks developers encounter daily. Copy them directly into the <Link href={`/${lang}/tools/regex-tester`}>regex tester</Link> to experiment.
      </p>

      <h3>1. Email Address</h3>
      <pre><code className="language-regex">{`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`}</code></pre>
      <p>
        Matches standard email addresses like <code>user@example.com</code>. This pattern validates the local part (letters, digits, dots, hyphens, underscores), the <code>@</code> symbol, the domain, and a TLD of at least two characters. For production email validation, consider using a dedicated library since RFC 5322 email addresses can be far more complex than this pattern handles.
      </p>

      <h3>2. URL (HTTP/HTTPS)</h3>
      <pre><code className="language-regex">{`https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\/\\w\\-.~:?#\\[\\]@!$&'()*+,;=%]*`}</code></pre>
      <p>
        Matches HTTP and HTTPS URLs with optional paths, query strings, and fragments. The <code>s?</code> makes the &quot;s&quot; in &quot;https&quot; optional. Use this when you need to extract links from plain text.
      </p>

      <h3>3. IPv4 Address</h3>
      <pre><code className="language-regex">{`^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$`}</code></pre>
      <p>
        Validates IPv4 addresses like <code>192.168.1.1</code>. Each octet is constrained to the 0-255 range using alternation. A simpler pattern like <code>\d+\.\d+\.\d+\.\d+</code> would match invalid values like <code>999.999.999.999</code>.
      </p>

      <h3>4. Phone Number (International)</h3>
      <pre><code className="language-regex">{`^\\+?[1-9]\\d{0,2}[\\s.-]?\\(?\\d{1,4}\\)?[\\s.-]?\\d{1,4}[\\s.-]?\\d{1,9}$`}</code></pre>
      <p>
        A flexible pattern that matches international phone numbers with optional country code, area code, and various separators (spaces, dots, hyphens). For strict validation of specific country formats, use more specific patterns or a phone number library.
      </p>

      <h3>5. Date (YYYY-MM-DD)</h3>
      <pre><code className="language-regex">{`^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`}</code></pre>
      <p>
        Matches ISO 8601 dates like <code>2026-02-27</code>. The month is constrained to 01-12 and the day to 01-31. Note that this does not validate calendar correctness (e.g., February 30 would still match), so combine with date parsing for full validation.
      </p>

      <h3>6. Hex Color Code</h3>
      <pre><code className="language-regex">{`^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$`}</code></pre>
      <p>
        Matches CSS hex colors in 3-digit (<code>#fff</code>), 6-digit (<code>#ff00aa</code>), and 8-digit (<code>#ff00aa80</code>) formats. The <code>#</code> prefix is required.
      </p>

      <h3>7. Strong Password</h3>
      <pre><code className="language-regex">{`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$`}</code></pre>
      <p>
        Enforces at least 8 characters with one lowercase letter, one uppercase letter, one digit, and one special character. Uses lookahead assertions to check each requirement independently.
      </p>

      <h3>8. Slug (URL-Friendly String)</h3>
      <pre><code className="language-regex">{`^[a-z0-9]+(?:-[a-z0-9]+)*$`}</code></pre>
      <p>
        Matches URL slugs like <code>my-blog-post</code> or <code>regex-tester-online-guide</code>. Only lowercase letters, digits, and hyphens are allowed, and hyphens cannot appear at the start or end.
      </p>

      <h3>9. HTML Tag</h3>
      <pre><code className="language-regex">{`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>`}</code></pre>
      <p>
        Matches an opening HTML tag, its content, and the matching closing tag using a backreference (<code>\1</code>). This is useful for quick extraction but should not replace a proper HTML parser for production use.
      </p>

      <h3>10. UUID v4</h3>
      <pre><code className="language-regex">{`^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$`}</code></pre>
      <p>
        Validates UUID version 4 format. The third group always starts with <code>4</code> (version), and the fourth group starts with <code>8</code>, <code>9</code>, <code>a</code>, or <code>b</code> (variant).
      </p>

      <h2>JavaScript Regex: RegExp Methods and Flags</h2>
      <p>
        JavaScript provides two ways to create regular expressions: the literal syntax <code>/pattern/flags</code> and the constructor <code>new RegExp(pattern, flags)</code>. The literal syntax is preferred when the pattern is known at compile time; the constructor is used when the pattern is dynamic (e.g., built from user input).
      </p>

      <h3>Core Methods</h3>
      <pre><code className="language-javascript">{`// test() — returns true/false
const emailRegex = /^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$/;
emailRegex.test('user@example.com'); // true

// match() — returns matches array or null
const text = 'Call 555-1234 or 555-5678';
text.match(/\\d{3}-\\d{4}/g);
// ['555-1234', '555-5678']

// matchAll() — returns iterator of detailed matches (ES2020)
const dates = '2026-01-15 and 2026-02-27';
const dateRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/g;
for (const m of dates.matchAll(dateRegex)) {
  console.log(m.groups);
  // { year: '2026', month: '01', day: '15' }
  // { year: '2026', month: '02', day: '27' }
}

// replace() — substitute matches
'hello world'.replace(/(\\w+)/, (match) => match.toUpperCase());
// 'HELLO world'

// replaceAll() — substitute all matches (ES2021)
'aabbcc'.replaceAll(/[bc]/g, 'X');
// 'aaXXXX'

// split() — split string by pattern
'one, two,  three'.split(/,\\s*/);
// ['one', 'two', 'three']

// exec() — stateful iteration with RegExp object
const re = /\\d+/g;
let m;
while ((m = re.exec('a1b22c333')) !== null) {
  console.log(m[0], m.index);
  // '1' 1, '22' 3, '333' 6
}`}</code></pre>

      <h3>JavaScript Regex Flags</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Flag</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>g</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Global</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Find all matches, not just the first</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>i</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Case-insensitive</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Ignore letter case when matching</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>m</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Multiline</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>^</code> and <code>$</code> match line boundaries</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>DotAll</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>.</code> matches newlines too</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>u</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Unicode</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Enable full Unicode matching and <code>\p{'{...}'}</code> escapes</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>v</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>UnicodeSets</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Extended Unicode sets syntax (ES2024)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>y</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Sticky</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Match only at <code>lastIndex</code> position</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>d</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>HasIndices</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Generate indices for group matches (ES2022)</td>
          </tr>
        </tbody>
      </table>

      <h2>Python Regex: re Module Guide</h2>
      <p>
        Python&apos;s <code>re</code> module provides a comprehensive set of functions for working with regular expressions. Python uses PCRE-like syntax with a few differences from JavaScript.
      </p>
      <pre><code className="language-python">{`import re

# re.search() — find first match anywhere in string
match = re.search(r'(\\d{4})-(\\d{2})-(\\d{2})', 'Date: 2026-02-27')
if match:
    print(match.group(0))  # '2026-02-27'
    print(match.group(1))  # '2026'
    print(match.groups())  # ('2026', '02', '27')

# re.match() — match at the BEGINNING of string only
m = re.match(r'\\d+', '42 is the answer')
print(m.group())  # '42'

# re.fullmatch() — entire string must match
re.fullmatch(r'\\d+', '42')      # Match
re.fullmatch(r'\\d+', '42abc')   # None

# re.findall() — return all matches as a list
text = 'alice@a.com, bob@b.org, charlie@c.net'
emails = re.findall(r'[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}', text)
# ['alice@a.com', 'bob@b.org', 'charlie@c.net']

# re.finditer() — return an iterator of Match objects
for m in re.finditer(r'\\b\\w{5}\\b', 'Hello world regex match'):
    print(m.group(), m.span())

# re.sub() — search and replace
result = re.sub(r'(\\w+)@(\\w+)', r'\\1 [at] \\2', 'user@host')
print(result)  # 'user [at] host'

# Named groups
pattern = r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})'
m = re.search(pattern, '2026-02-27')
print(m.group('year'))   # '2026'
print(m.groupdict())     # {'year': '2026', 'month': '02', 'day': '27'}

# Compile for repeated use
email_re = re.compile(r'^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$')
email_re.match('user@example.com')  # Match

# Flags
re.search(r'hello', 'HELLO', re.IGNORECASE)     # Match
re.findall(r'^\\w+', 'one\\ntwo', re.MULTILINE)   # ['one', 'two']
re.search(r'a.b', 'a\\nb', re.DOTALL)             # Match

# Verbose mode for readable patterns
phone_re = re.compile(r"""
    ^\\+?          # optional country code
    (\\d{1,3})     # area code
    [\\s.-]?       # optional separator
    (\\d{3,4})     # first part
    [\\s.-]?       # optional separator
    (\\d{4})       # second part
    $
""", re.VERBOSE)`}</code></pre>
      <p>
        The key difference from JavaScript: Python uses raw strings (<code>r&apos;...&apos;</code>) to avoid double-escaping backslashes. Always use raw strings for regex patterns in Python. Also note that <code>re.match()</code> only matches at the start of the string, whereas <code>re.search()</code> scans the entire string.
      </p>

      <h2>Go Regex: regexp Package</h2>
      <p>
        Go&apos;s <code>regexp</code> package implements the RE2 syntax, which guarantees linear-time execution by excluding features like backreferences and lookahead/lookbehind assertions. This makes Go regex predictable in performance but slightly less expressive than PCRE.
      </p>
      <pre><code className="language-go">{`package main

import (
    "fmt"
    "regexp"
)

func main() {
    // Compile — returns error if pattern is invalid
    re, err := regexp.Compile(\`\\d{4}-\\d{2}-\\d{2}\`)
    if err != nil {
        panic(err)
    }

    // MustCompile — panics on invalid pattern (use for constants)
    emailRe := regexp.MustCompile(
        \`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\`,
    )

    // MatchString — test if pattern matches
    fmt.Println(emailRe.MatchString("user@example.com")) // true
    fmt.Println(emailRe.MatchString("invalid"))           // false

    // FindString — return first match
    text := "Date: 2026-02-27, Updated: 2026-03-15"
    fmt.Println(re.FindString(text)) // "2026-02-27"

    // FindAllString — return all matches
    dates := re.FindAllString(text, -1)
    fmt.Println(dates) // ["2026-02-27", "2026-03-15"]

    // FindStringSubmatch — return match with capture groups
    dateRe := regexp.MustCompile(\`(\\d{4})-(\\d{2})-(\\d{2})\`)
    groups := dateRe.FindStringSubmatch("2026-02-27")
    fmt.Println(groups) // ["2026-02-27", "2026", "02", "27"]

    // Named capture groups
    namedRe := regexp.MustCompile(
        \`(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})\`,
    )
    match := namedRe.FindStringSubmatch("2026-02-27")
    for i, name := range namedRe.SubexpNames() {
        if name != "" {
            fmt.Printf("%s: %s\\n", name, match[i])
        }
    }

    // ReplaceAllString — substitution
    result := dateRe.ReplaceAllString(
        "Date: 2026-02-27",
        "\${1}/\${2}/\${3}",
    )
    fmt.Println(result) // "Date: 2026/02/27"

    // Split
    csvRe := regexp.MustCompile(\`,\\s*\`)
    parts := csvRe.Split("a, b,  c,d", -1)
    fmt.Println(parts) // ["a", "b", "c", "d"]
}`}</code></pre>
      <p>
        Important Go regex considerations: the <code>regexp</code> package does not support lookahead (<code>(?=...)</code>), lookbehind (<code>{'(?<=...)'}</code>), or backreferences (<code>\1</code>). If you need these features, consider the <code>regexp2</code> third-party package which implements full .NET-compatible regex. Always use raw string literals (backticks) to avoid escaping issues.
      </p>

      <h2>Common Regex Mistakes and How to Fix Them</h2>
      <p>
        Even experienced developers make regex mistakes. Here are the most common pitfalls and their solutions:
      </p>

      <h3>1. Forgetting to Escape Special Characters</h3>
      <pre><code className="language-javascript">{`// WRONG: . matches ANY character
/192.168.1.1/.test('192X168Y1Z1'); // true!

// CORRECT: escape the dots
/192\\.168\\.1\\.1/.test('192X168Y1Z1'); // false
/192\\.168\\.1\\.1/.test('192.168.1.1'); // true`}</code></pre>

      <h3>2. Greedy vs. Lazy Quantifiers</h3>
      <pre><code className="language-javascript">{`const html = '<b>bold</b> and <i>italic</i>';

// GREEDY: .* matches as much as possible
html.match(/<.*>/);
// ['<b>bold</b> and <i>italic</i>'] — captured everything!

// LAZY: .*? matches as little as possible
html.match(/<.*?>/g);
// ['<b>', '</b>', '<i>', '</i>'] — individual tags`}</code></pre>

      <h3>3. Not Anchoring the Pattern</h3>
      <pre><code className="language-javascript">{`// WRONG: partial match passes validation
/\\d{3}/.test('abc123def'); // true — found "123" inside

// CORRECT: anchor to match full string
/^\\d{3}$/.test('abc123def'); // false
/^\\d{3}$/.test('123');       // true`}</code></pre>

      <h3>4. Using Capture Groups When You Don&apos;t Need Them</h3>
      <pre><code className="language-javascript">{`// UNNECESSARY captures — adds overhead
/(http|https):\\/\\/(www\\.)?(.+)/

// BETTER: non-capturing groups
/(?:https?):\\/\\/(?:www\\.)?(.+)/
// Only $1 (the domain+path) is captured`}</code></pre>

      <h3>5. Not Handling Unicode Properly</h3>
      <pre><code className="language-javascript">{`// WRONG: \\w doesn't match Unicode letters by default
/^\\w+$/.test('cafe'); // true (ASCII only)

// In JavaScript, use the u flag for Unicode
/^[\\p{L}\\p{N}_]+$/u.test('cafe'); // true — matches Unicode letters`}</code></pre>

      <h3>6. Nested Quantifiers Causing Catastrophic Backtracking</h3>
      <pre><code className="language-javascript">{`// DANGEROUS: nested quantifiers
/(a+)+b/.test('aaaaaaaaaaaaaaaaac');
// Exponential backtracking! Can freeze your browser.

// SAFE: flatten the pattern
/a+b/.test('aaaaaaaaaaaaaaaaac');
// Linear time, same logical result`}</code></pre>

      <h2>Regex Performance: When Patterns Become Slow</h2>
      <p>
        Regex engines in most languages (JavaScript, Python, Java, .NET) use backtracking algorithms (NFA-based). This means certain patterns can exhibit exponential time complexity on specific inputs. Go&apos;s <code>regexp</code> package is a notable exception: it uses RE2 (DFA-based), which guarantees linear-time matching but sacrifices some advanced features.
      </p>
      <p>
        The most common performance problem is <strong>catastrophic backtracking</strong>, which occurs when a pattern has ambiguous quantifiers that can match the same input in multiple ways. When the overall match fails, the engine tries every possible permutation before giving up.
      </p>

      <h3>Patterns That Trigger Backtracking</h3>
      <pre><code className="language-text">{`# Dangerous patterns (avoid these):
(a+)+          # Nested quantifiers
(a|a)+         # Overlapping alternation
(.*)(.*)(.*) # Multiple greedy wildcards with backrefs

# Safe alternatives:
a+             # Flattened quantifier
a+             # Remove redundant alternation
(.+?)          # Lazy quantifier where appropriate`}</code></pre>

      <h3>Performance Tips</h3>
      <ul>
        <li><strong>Be specific</strong> &mdash; use <code>[a-z0-9]</code> instead of <code>.</code> when you know the character set.</li>
        <li><strong>Anchor patterns</strong> &mdash; <code>^pattern$</code> fails faster on non-matching input.</li>
        <li><strong>Avoid nested quantifiers</strong> &mdash; <code>(a+)+</code> is almost always a bug.</li>
        <li><strong>Use non-capturing groups</strong> &mdash; <code>(?:...)</code> is slightly faster than <code>(...)</code> when you don&apos;t need the capture.</li>
        <li><strong>Compile once, use many</strong> &mdash; in Python use <code>re.compile()</code>, in Go use <code>regexp.MustCompile()</code>, in JavaScript assign to a <code>const</code>.</li>
        <li><strong>Test with pathological input</strong> &mdash; paste very long strings and edge cases into the <Link href={`/${lang}/tools/regex-tester`}>regex tester</Link> to check for slowdowns.</li>
        <li><strong>Set timeouts</strong> &mdash; .NET and some other engines support regex timeouts; use them for untrusted patterns.</li>
      </ul>

      <h3>Benchmarking Regex vs Alternatives</h3>
      <pre><code className="language-javascript">{`// Benchmark: regex vs includes() for simple substring check
const text = 'The quick brown fox jumps over the lazy dog';

// Regex approach (~0.15 microseconds)
/fox/.test(text);

// String method approach (~0.03 microseconds)
text.includes('fox');

// For simple substring checks, string methods are ~5x faster.
// Use regex only when you need pattern matching capabilities.`}</code></pre>

      <h2>Regex vs String Methods: When You Don&apos;t Need Regex</h2>
      <p>
        Regex is powerful, but it is not always the right tool. Using regex for tasks that built-in string methods handle natively makes code harder to read, slower to execute, and more prone to bugs. Here is a comparison:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Task</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Regex Approach</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>String Method</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Prefer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Check if string contains &quot;foo&quot;</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>/foo/.test(s)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.includes(&apos;foo&apos;)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>String method</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Check if string starts with &quot;http&quot;</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>/^http/.test(s)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.startsWith(&apos;http&apos;)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>String method</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Replace first occurrence</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.replace(/foo/, &apos;bar&apos;)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.replace(&apos;foo&apos;, &apos;bar&apos;)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>String method</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Replace all occurrences</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.replace(/foo/g, &apos;bar&apos;)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.replaceAll(&apos;foo&apos;, &apos;bar&apos;)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>String method</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Trim whitespace</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.replace(/^\s+|\s+$/g, &apos;&apos;)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.trim()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>String method</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Split by comma</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.split(/,/)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.split(&apos;,&apos;)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>String method</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Extract all numbers</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>s.match(/\d+/g)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No clean alternative</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Regex</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Validate email format</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>emailRegex.test(s)</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No clean alternative</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Regex</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Complex pattern matching</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Regex</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Not feasible</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Regex</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Rule of thumb:</strong> if you are matching a fixed string (no wildcards, no quantifiers, no character classes), use string methods. If you need pattern matching, use regex. When in doubt, open the <Link href={`/${lang}/tools/regex-tester`}>regex tester</Link> to verify your pattern is correct before putting it in production code.
      </p>

      <h2>Frequently Asked Questions</h2>
      <div itemScope itemType="https://schema.org/FAQPage">
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is a regex tester?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              A regex tester is an online tool that lets you write a regular expression pattern and test it against sample text in real time. It shows you exactly which parts of your text match the pattern, highlights capture groups, and helps you debug syntax errors. The <Link href={`/${lang}/tools/regex-tester`}>DevToolBox Regex Tester</Link> runs entirely in your browser with support for JavaScript, Python, and Go flavors.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">How do I test a regex online?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Open an online regex tester like <Link href={`/${lang}/tools/regex-tester`}>DevToolBox&apos;s Regex Tester</Link>, type or paste your regular expression pattern in the pattern field, enter your test string in the text area, and toggle the flags you need (global, case-insensitive, multiline, etc.). Matches are highlighted instantly as you type. You can also use the replace mode to preview substitution results.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is the difference between regex flavors (JavaScript, Python, PCRE)?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Regex flavors differ in which features they support and how they handle edge cases. JavaScript regex supports lookahead, lookbehind (ES2018+), and named groups but lacks atomic groups and possessive quantifiers. Python&apos;s <code>re</code> module uses PCRE-like syntax with features like verbose mode (<code>re.VERBOSE</code>) and conditional patterns. Go&apos;s <code>regexp</code> package uses RE2 syntax, which guarantees linear-time execution but does not support lookahead, lookbehind, or backreferences.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What does the g flag do in regex?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              The <code>g</code> (global) flag tells the regex engine to find all matches in the input string instead of stopping after the first match. Without the <code>g</code> flag, methods like <code>match()</code> in JavaScript return only the first occurrence. With the <code>g</code> flag, they return an array of all matches.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">How do I match an email address with regex?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              A commonly used pattern is <code>{'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'}</code>. This validates the local part (before @), the domain, and ensures a TLD of at least two characters. For real-world applications, consider that RFC 5322 allows many edge cases this pattern misses; using a dedicated email validation library alongside regex is recommended for production systems.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is catastrophic backtracking in regex?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Catastrophic backtracking occurs when a regex engine tries exponentially many ways to match a pattern against input that ultimately does not match. It is caused by nested quantifiers like <code>(a+)+</code> or overlapping alternation like <code>(a|a)+</code>. The engine keeps trying different combinations before concluding there is no match, which can freeze your application. The fix is to rewrite the pattern to remove ambiguity, use atomic groups or possessive quantifiers where supported, or switch to a linear-time engine like Go&apos;s RE2.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Can I use regex to parse HTML?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Regex can extract simple patterns from HTML (like matching a specific tag), but it cannot reliably parse arbitrary HTML because HTML is not a regular language. Nested tags, attributes with special characters, and malformed markup will break regex-based parsers. For production HTML processing, use a proper parser like DOMParser in the browser, BeautifulSoup in Python, or goquery in Go. Use regex only for quick, one-off extraction from known, simple HTML structures.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Is the DevToolBox regex tester free?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Yes. The <Link href={`/${lang}/tools/regex-tester`}>DevToolBox Regex Tester</Link> is completely free, requires no signup, and runs entirely in your browser. Your patterns and test strings are never sent to any server, making it safe for testing patterns against sensitive data.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
