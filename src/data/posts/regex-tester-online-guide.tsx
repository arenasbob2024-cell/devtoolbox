'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Regex Tester: Test and Debug Regular Expressions Online — Complete Guide',
    description:
      'Test regular expressions online with instant feedback. Complete guide for JavaScript, Python, Go regex syntax, named groups, lookahead, and common patterns.',
  },
  zh: {
    title: '正则表达式测试器：在线测试和调试正则表达式完整指南',
    description:
      '在线实时测试正则表达式。JavaScript、Python、Go 正则语法、命名分组、前瞻断言和常用模式完整指南。',
  },
  ja: {
    title: 'Regexテスター：正規表現をオンラインでテスト・デバッグする完全ガイド',
    description:
      'リアルタイムフィードバックで正規表現をオンラインテスト。JavaScript、Python、Goの正規表現構文完全ガイド。',
  },
  ko: {
    title: 'Regex 테스터: 정규식을 온라인으로 테스트하고 디버깅하는 완전 가이드',
    description:
      '즉각적인 피드백으로 정규식을 온라인으로 테스트합니다. JavaScript, Python, Go 정규식 구문 완전 가이드.',
  },
  fr: {
    title: 'Testeur Regex : Tester et Déboguer les Expressions Régulières en Ligne',
    description:
      'Testez les expressions régulières en ligne avec un retour instantané. Guide complet pour JavaScript, Python, Go.',
  },
  de: {
    title: 'Regex Tester: Reguläre Ausdrücke Online Testen und Debuggen',
    description:
      'Testen Sie reguläre Ausdrücke online mit sofortigem Feedback. Vollständiger Leitfaden für JavaScript, Python und Go.',
  },
  es: {
    title: 'Probador Regex: Probar y Depurar Expresiones Regulares Online',
    description:
      'Prueba expresiones regulares online con retroalimentación instantánea. Guía completa para JavaScript, Python, Go.',
  },
  pt: {
    title: 'Testador Regex: Testar e Depurar Expressões Regulares Online',
    description:
      'Teste expressões regulares online com feedback instantâneo. Guia completo para JavaScript, Python, Go.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an online regex tester?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An online regex tester is a web tool that lets you write a regular expression pattern and test it against sample text in real time, showing matches, capture groups, and substitution results without writing any boilerplate code.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I test a regex pattern in JavaScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In JavaScript you can test a regex with RegExp.prototype.test() which returns a boolean, or use String.prototype.match() to get all matches. Example: /\\d+/.test("abc123") returns true. An online regex tester shows you the same result instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are named capture groups in regex?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Named capture groups let you assign a label to a group using (?<name>...) syntax. In JavaScript you access them via match.groups.name, and in Python via match.group("name") or (?P<name>...) syntax. They make patterns more readable than numbered groups.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between lookahead and lookbehind in regex?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lookahead (?=...) asserts that the pattern ahead must match without consuming characters. Lookbehind (?<=...) asserts the pattern behind must match. Negative versions (?!...) and (?<!...) assert the pattern must NOT match. They are zero-width assertions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my JavaScript regex only match the first occurrence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Without the g (global) flag, JavaScript regex methods like match() and replace() only operate on the first occurrence. Add the g flag to your pattern (e.g. /pattern/g) or use matchAll() with the g flag to find all matches.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is catastrophic backtracking in regex?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Catastrophic backtracking occurs when a regex engine tries exponentially many paths to match a pattern that ultimately fails. Patterns like (a+)+ on a string like "aaaaaab" can cause this. Always avoid nested quantifiers on overlapping patterns and anchor your patterns.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I match multiline strings with regex?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the m (multiline) flag so that ^ and $ match the start and end of each line rather than the whole string. In JavaScript: /^pattern$/m. In Python: re.compile("^pattern$", re.MULTILINE). The s (dotall) flag makes the dot . match newlines too.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is regex the same in Python and JavaScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The core syntax is similar but there are differences. Python uses (?P<name>...) for named groups while JavaScript uses (?<name>...). Python supports lookbehind with variable-length patterns in newer versions, while JavaScript requires fixed-length lookbehinds. Go uses RE2 syntax which does not support lookahead/lookbehind at all.',
      },
    },
  ],
};

export default function RegexTesterOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <article>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Canonical / SEO meta — rendered as comment for reference */}
      {/* canonical: https://viadreams.cc/en/blog/regex-tester-online-guide */}

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>regex tester</strong> lets you write, debug, and validate regular expressions
          against sample text in real time. Use our free{' '}
          <Link href={`/${lang}/tools/regex-tester`}>online regex tester</Link> to get instant match
          highlighting, capture group extraction, and substitution previews for JavaScript, Python,
          and Go. This guide covers the full regex syntax — character classes, quantifiers, anchors,
          named groups, lookahead/lookbehind — plus language-specific APIs, multiline mode,
          performance pitfalls, and 8 copy-paste patterns for email, URL, IP, phone, date, hex
          color, passwords, and slugs.
        </p>
      </div>

      {/* Intro */}
      <p>
        Regular expressions are one of the most powerful text-processing tools available to
        developers, yet they are notoriously easy to get wrong. A single missing escape character or
        a misplaced quantifier can silently match the wrong data or cause a server to hang. An{' '}
        <strong>online regex tester</strong> eliminates the guesswork by giving you instant visual
        feedback before you ever deploy code.
      </p>
      <p>
        This guide is organized into twelve sections. Whether you need a quick syntax reference, a
        production-ready email pattern, or an explanation of catastrophic backtracking, you can jump
        directly to the section you need.
      </p>

      {/* 1. Regex Syntax Quick Reference */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        1. Regex Syntax Quick Reference
      </h2>
      <p>
        The table below summarises the most commonly used regex building blocks. All examples use
        standard PCRE-compatible syntax supported by JavaScript, Python, and most other languages.
      </p>

      {/* Character Classes */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Character Classes
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Pattern</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Matches</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['.', 'Any character except newline', '/./ matches "a", "9", "!"'],
              ['\\d', 'Digit [0-9]', '/\\d+/ matches "42" in "foo42bar"'],
              ['\\D', 'Non-digit', '/\\D+/ matches "foo" in "foo42bar"'],
              ['\\w', 'Word char [a-zA-Z0-9_]', '/\\w+/ matches "hello_42"'],
              ['\\W', 'Non-word char', '/\\W/ matches " " and "-"'],
              ['\\s', 'Whitespace (space, tab, newline)', '/\\s+/ matches "  \\t"'],
              ['\\S', 'Non-whitespace', '/\\S+/ matches "hello"'],
              ['[a-z]', 'Any lowercase letter', '/[a-z]+/ matches "abc"'],
              ['[A-Z]', 'Any uppercase letter', '/[A-Z]+/ matches "ABC"'],
              ['[0-9]', 'Any digit (same as \\d)', '/[0-9]+/ matches "123"'],
              ['[abc]', 'Any of a, b, or c', '/[abc]/ matches "b" in "bat"'],
              ['[^abc]', 'Any char NOT a, b, or c', '/[^abc]+/ matches "xyz"'],
              ['[a-zA-Z]', 'Any letter', '/[a-zA-Z]+/ matches "Hello"'],
            ].map(([pat, desc, ex], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace' }}>{pat}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{desc}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.82rem' }}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quantifiers */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Quantifiers
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Quantifier</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Meaning</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Lazy version</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['*', 'Zero or more (greedy)', '*?'],
              ['+', 'One or more (greedy)', '+?'],
              ['?', 'Zero or one', '??'],
              ['{n}', 'Exactly n times', '{n}? (no effect)'],
              ['{n,}', 'n or more', '{n,}?'],
              ['{n,m}', 'Between n and m', '{n,m}?'],
            ].map(([q, meaning, lazy], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace' }}>{q}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{meaning}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace' }}>{lazy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Anchors */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Anchors
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Anchor</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Matches</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['^', 'Start of string (or line in multiline mode)'],
              ['$', 'End of string (or line in multiline mode)'],
              ['\\b', 'Word boundary (between \\w and \\W)'],
              ['\\B', 'Non-word boundary'],
              ['\\A', 'Start of entire string (Python only)'],
              ['\\Z', 'End of entire string (Python only)'],
            ].map(([anchor, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace' }}>{anchor}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Groups */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Groups and Alternation
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Syntax</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['(abc)', 'Capturing group — captures "abc" as group 1'],
              ['(?:abc)', 'Non-capturing group — groups without capturing'],
              ['(?<name>abc)', 'Named capturing group (JS/Python) — access via groups.name'],
              ['(?P<name>abc)', 'Named capturing group (Python alternative syntax)'],
              ['(?=abc)', 'Positive lookahead — must be followed by "abc"'],
              ['(?!abc)', 'Negative lookahead — must NOT be followed by "abc"'],
              ['(?<=abc)', 'Positive lookbehind — must be preceded by "abc"'],
              ['(?<!abc)', 'Negative lookbehind — must NOT be preceded by "abc"'],
              ['a|b', 'Alternation — matches "a" or "b"'],
            ].map(([syn, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace' }}>{syn}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Special characters */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Special Characters
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`\\.   Literal dot (escape . to match it literally)
\\n   Newline character
\\r   Carriage return
\\t   Tab character
\\0   Null character
\\\\  Literal backslash
\\(   Literal opening parenthesis (escape special chars)
\\[   Literal opening bracket`}</code></pre>

      {/* 2. Common Regex Patterns */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        2. Common Regex Patterns (Copy-Paste Ready)
      </h2>
      <p>
        The patterns below are production-tested and cover the most common validation and extraction
        tasks. Test them instantly in our{' '}
        <Link href={`/${lang}/tools/regex-tester`}>free regex tester</Link>.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Email Address
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/

// Matches: user@example.com, first.last+tag@sub.domain.io
// Misses intentionally: IP-address emails, quoted local parts`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        URL
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/(https?:\\/\\/)?([\\/\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*\\/?/i

// Matches: http://example.com, https://sub.domain.co.uk/path?q=1
// Use URL constructor for strict validation in production`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        IPv4 Address
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/^(\\d{1,3}\\.){3}\\d{1,3}$/

// Fast syntax check only — does not validate range (0-255)
// For strict validation add: each octet (?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)
const ipStrict = /^(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(?:\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)){3}$/;`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        US Phone Number
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/^\\+?1?\\s?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/

// Matches: (555) 123-4567, +1 555.123.4567, 5551234567
// Does not match international formats outside North America`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        ISO 8601 Date (YYYY-MM-DD)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$/

// Matches: 2026-02-27, 2000-12-31
// Does not validate month/day combinations (Feb 30 would pass syntax check)`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Hex Color
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

// Matches: #fff, #FFF, #1a2b3c
// Extend to support 4/8 digit forms: {3,4}|{6,8}`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Strong Password
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/

// Requires: 8+ chars, at least one lowercase, one uppercase,
// one digit, and one special character (@$!%*?&)
// Uses four lookaheads — each checked independently`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        URL Slug
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Matches: hello-world, my-blog-post-2026
// Rejects: -leading-dash, double--dash, UPPERCASE`}</code></pre>

      {/* 3. JavaScript Regex */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        3. JavaScript Regex API
      </h2>
      <p>
        JavaScript has first-class regex support built into the language. Patterns can be written as
        literals or constructed dynamically.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Literal vs Constructor
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Literal — compiled once at parse time, preferred for static patterns
const re = /\\d+/g;

// Constructor — use when the pattern is dynamic (user input, config)
const pattern = '\\\\d+';
const re2 = new RegExp(pattern, 'g'); // note: double-escape in strings`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Core Methods
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const str = 'Order: 42 items, total: 189';

// .test() — returns boolean, fastest for existence check
/\\d+/.test(str);                  // true

// .exec() — returns first match array with groups, or null
/\\d+/g.exec(str);                 // ['42', index: 7, ...]

// str.match() — without g: first match + groups; with g: all matches (no groups)
str.match(/\\d+/);                 // ['42', index: 7, ...]
str.match(/\\d+/g);                // ['42', '189']

// str.matchAll() — iterator of all matches with groups (requires g flag)
const matches = [...str.matchAll(/\\d+/g)];
// [['42', index:7], ['189', index:24]]

// str.replace() — replace first match (no g) or all (with g)
str.replace(/\\d+/, 'N');          // 'Order: N items, total: 189'
str.replace(/\\d+/g, 'N');         // 'Order: N items, total: N'

// str.replaceAll() — replaces all occurrences; pattern must have g flag if regex
str.replaceAll(/\\d+/g, 'N');      // 'Order: N items, total: N'

// str.split() — split on regex delimiter
'a1b2c3'.split(/\\d/);             // ['a', 'b', 'c', '']`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Flags Reference
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Flag</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Effect</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['g', 'global', 'Find all matches, not just the first'],
              ['i', 'ignoreCase', 'Case-insensitive matching'],
              ['m', 'multiline', '^ and $ match line start/end'],
              ['s', 'dotAll', '. matches newlines too'],
              ['u', 'unicode', 'Enable full Unicode support'],
              ['d', 'hasIndices', 'Add .indices to match results (ES2022)'],
              ['v', 'unicodeSets', 'Enhanced Unicode sets (ES2024)'],
            ].map(([flag, name, effect], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace' }}>{flag}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace' }}>{name}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Named Capture Groups */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        4. Named Capture Groups
      </h2>
      <p>
        Named capture groups were introduced in ES2018 for JavaScript and have long been available
        in Python. They make patterns self-documenting and protect against index-shifting when you
        add or remove groups later.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Pattern with three named groups
const dateRe = /(?<year>\\d{4})-(?<month>0[1-9]|1[0-2])-(?<day>0[1-9]|[12]\\d|3[01])/;

const m = '2026-02-27'.match(dateRe);
if (m) {
  const { year, month, day } = m.groups;
  console.log(year, month, day); // '2026', '02', '27'
}

// Using named groups in replaceAll (reference with $<name>)
const reformat = (iso) =>
  iso.replace(
    /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/,
    '$<day>/$<month>/$<year>'   // rearrange to DD/MM/YYYY
  );
console.log(reformat('2026-02-27')); // '27/02/2026'

// Using a function in replace for complex transformations
const result = '2026-02-27'.replace(
  /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/,
  (_, year, month, day, offset, input, groups) =>
    \`\${groups.day} \${groups.month} \${groups.year}\`
);
console.log(result); // '27 02 2026'`}</code></pre>

      <p>
        <strong>Tip:</strong> Named groups are also available in <code>matchAll()</code> — each
        iteration object exposes a <code>groups</code> property.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const text = 'Dates: 2026-01-01 and 2026-06-15';
for (const match of text.matchAll(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/g)) {
  console.log(match.groups); // { year: '2026', month: '01', day: '01' } ...
}`}</code></pre>

      {/* 5. Lookahead and Lookbehind */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        5. Lookahead and Lookbehind
      </h2>
      <p>
        Lookahead and lookbehind are <strong>zero-width assertions</strong> — they check surrounding
        context without consuming characters. This makes them ideal for conditional matching.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Positive Lookahead — (?=...)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Match "foo" only when followed by "bar"
/foo(?=bar)/.test('foobar'); // true
/foo(?=bar)/.test('foobaz'); // false

// Password: must contain at least one digit (lookahead doesn't consume)
/^(?=.*\\d).{8,}$/.test('password1'); // true
/^(?=.*\\d).{8,}$/.test('password');  // false`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Negative Lookahead — (?!...)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Match "foo" NOT followed by "bar"
/foo(?!bar)/.test('foobaz'); // true
/foo(?!bar)/.test('foobar'); // false

// Match any word not followed by a digit
/\\b\\w+(?!\\d)\\b/g`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Positive Lookbehind — (?&lt;=...)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Match digits preceded by "$"
const prices = 'Price: $42 and $189';
const nums = prices.match(/(?<=\\$)\\d+/g);
console.log(nums); // ['42', '189']

// Extract value after "key:" in a config string
const val = 'port: 3000'.match(/(?<=port: )\\d+/)?.[0];
console.log(val); // '3000'`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Negative Lookbehind — (?&lt;!...)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Match digits NOT preceded by "$"
'Price: $42 count: 7'.match(/(?<!\\$)\\d+/g); // ['7']

// Strong password: ensure the string doesn't START with a digit
// (negative lookbehind at position 0)
/^(?<!\\d)(?=.*[A-Z])(?=.*\\d).{8,}$/.test('Pass1word'); // true
/^(?<!\\d)(?=.*[A-Z])(?=.*\\d).{8,}$/.test('1Password'); // false`}</code></pre>

      <p>
        <strong>Browser support note:</strong> Lookbehind is supported in all modern browsers
        (Chrome 62+, Firefox 78+, Safari 16.4+). Go&apos;s RE2 engine does NOT support any form of
        lookbehind.
      </p>

      {/* 6. Python Regex */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        6. Python Regex with the re Module
      </h2>
      <p>
        Python&apos;s built-in <code>re</code> module provides a complete regex API. The main
        difference from JavaScript is that Python uses string flags and slightly different named
        group syntax.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import re

text = "Order: 42 items, total: 189"

# re.search() — find FIRST match anywhere in string
m = re.search(r'\\d+', text)
print(m.group())     # '42'
print(m.start())     # 7

# re.match() — match at START of string only
m = re.match(r'Order', text)
print(bool(m))       # True

# re.fullmatch() — entire string must match
re.fullmatch(r'\\d+', '12345')  # Match object
re.fullmatch(r'\\d+', '123x')   # None

# re.findall() — return list of all matches
re.findall(r'\\d+', text)        # ['42', '189']

# re.finditer() — iterator of match objects (more info than findall)
for m in re.finditer(r'\\d+', text):
    print(m.group(), m.start(), m.end())

# re.sub() — replace matches
re.sub(r'\\d+', 'N', text)       # 'Order: N items, total: N'

# re.compile() — compile for reuse (significant speedup in loops)
pattern = re.compile(r'\\d+', re.IGNORECASE)
pattern.findall(text)`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Python Flags
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`re.IGNORECASE  (re.I)   # Case-insensitive
re.MULTILINE   (re.M)   # ^ and $ match line boundaries
re.DOTALL      (re.S)   # . matches newlines
re.VERBOSE     (re.X)   # Allow whitespace and comments in pattern
re.UNICODE     (re.U)   # Default in Python 3, enables \\w to match Unicode
re.ASCII       (re.A)   # Restrict \\w, \\d etc. to ASCII range

# Combine flags with |
re.compile(r'pattern', re.I | re.M)`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Named Groups in Python
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python uses (?P<name>...) syntax
date_re = re.compile(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})')
m = date_re.search('Today is 2026-02-27')
if m:
    print(m.group('year'))   # '2026'
    print(m.groupdict())     # {'year': '2026', 'month': '02', 'day': '27'}

# Use in re.sub with \\g<name> back-reference
date_re.sub(r'\\g<day>/\\g<month>/\\g<year>', '2026-02-27')
# Returns '27/02/2026'`}</code></pre>

      {/* 7. Multiline Mode */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        7. Multiline Mode
      </h2>
      <p>
        By default, <code>^</code> matches the start of the entire string and <code>$</code> matches
        the end. In <strong>multiline mode</strong>, they match the start and end of each line. This
        is essential for processing files, logs, and config blocks.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// JavaScript — m flag
const log = \`[INFO] Server started
[ERROR] Connection refused
[INFO] Retry attempt 1\`;

// Without m flag — ^ only matches very start of string
log.match(/^\\[ERROR\\].*/)    // null (doesn't start at position 0)

// With m flag — ^ matches after each newline
log.match(/^\\[ERROR\\].*/m)   // ['[ERROR] Connection refused']
log.match(/^\\[ERROR\\].*/mg)  // all ERROR lines`}</code></pre>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python — re.MULTILINE
import re

log = """[INFO] Server started
[ERROR] Connection refused
[INFO] Retry attempt 1"""

errors = re.findall(r'^\\[ERROR\\].*', log, re.MULTILINE)
print(errors)  # ['[ERROR] Connection refused']

# Combining MULTILINE and DOTALL
# re.MULTILINE: ^ and $ per line
# re.DOTALL: . matches \\n
# These are independent — use both when needed
block_re = re.compile(r'^START.*?END$', re.MULTILINE | re.DOTALL)`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Practical: Extract Log Entries
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Extract all timestamps and levels from an access log
const logPattern = /^(?<timestamp>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}) (?<level>INFO|WARN|ERROR) (?<message>.+)$/mg;

const entries = [...log.matchAll(logPattern)].map(m => ({
  timestamp: m.groups.timestamp,
  level: m.groups.level,
  message: m.groups.message,
}));`}</code></pre>

      {/* 8. Performance Tips */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        8. Performance Tips and Avoiding Catastrophic Backtracking
      </h2>
      <p>
        A poorly written regex can take exponential time to evaluate, effectively hanging your
        application. This is called <strong>catastrophic backtracking</strong> or{' '}
        <strong>ReDoS</strong> (Regular Expression Denial of Service).
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        The Danger Pattern: Nested Quantifiers
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// DANGEROUS — exponential backtracking on 'aaaaaab'
/(a+)+$/.test('aaaaaab')   // hangs on long non-matching strings

// Why: the outer + and inner + both expand 'a' differently
// For 'aaaa', the engine tries: (aaaa), (aaa)(a), (aa)(aa), (a)(aaa)... etc.

// SAFE alternative — use an anchor to prevent backtracking space
/^a+$/.test('aaaaaab')     // false, fast (fails at 'b' immediately)`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Performance Best Practices
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Rule</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Why</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Anchor your patterns with ^ and $', 'Prevents the engine from trying every position in the string'],
              ['Prefer specific character classes over .', '/[a-z]+/ is faster than /.+/ for letter-only data'],
              ['Use lazy quantifiers (*?, +?) only when needed', 'Greedy is often faster when anchored correctly'],
              ['Avoid nested quantifiers on overlapping patterns', '(a+)+ on non-matching input causes exponential time'],
              ['Compile patterns outside loops', 're.compile() in Python, const re = /pattern/ at module level in JS'],
              ['Test with ReDoS checkers', 'Tools like vuln-regex-detector or regex101 flag catastrophic patterns'],
              ['Use atomic groups (?>...) in PHP/PCRE', 'Prevents backtracking into the group once it matches'],
              ['Use possessive quantifiers in Java/Perl', '/a++/ prevents backtracking into the quantifier'],
            ].map(([rule, why], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontWeight: '500' }}>{rule}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 9. Regex in Other Languages */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        9. Regex in Other Languages
      </h2>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Go — regexp Package (RE2 Engine)
      </h3>
      <p>
        Go uses the RE2 engine, which guarantees linear time matching but does NOT support
        lookahead, lookbehind, or backreferences. This is a deliberate safety tradeoff.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "fmt"
    "regexp"
)

func main() {
    // Compile — panics on invalid pattern, use MustCompile for static patterns
    re := regexp.MustCompile(\`\\d+\`)

    // Compile with error handling for dynamic patterns
    re2, err := regexp.Compile(\`\\d+\`)
    if err != nil { /* handle */ }
    _ = re2

    text := "Order: 42 items, total: 189"

    // MatchString — equivalent to test()
    fmt.Println(re.MatchString(text))         // true

    // FindString — first match
    fmt.Println(re.FindString(text))           // "42"

    // FindAllString — all matches
    fmt.Println(re.FindAllString(text, -1))    // ["42", "189"]

    // FindStringSubmatch — first match + groups
    re3 := regexp.MustCompile(\`(\\d+)-(\\d+)\`)
    m := re3.FindStringSubmatch("Range: 10-99")
    fmt.Println(m) // ["10-99", "10", "99"]

    // Named groups — use (?P<name>...)
    re4 := regexp.MustCompile(\`(?P<year>\\d{4})-(?P<month>\\d{2})\`)
    match := re4.FindStringSubmatch("2026-02")
    names := re4.SubexpNames()
    for i, name := range names {
        if name != "" && i < len(match) {
            fmt.Printf("%s: %s\\n", name, match[i])
        }
    }

    // ReplaceAllString
    result := re.ReplaceAllString(text, "N")
    fmt.Println(result) // "Order: N items, total: N"
}`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Rust — regex Crate
      </h3>
      <p>
        The Rust <code>regex</code> crate also uses RE2 semantics (no lookahead/lookbehind) for
        guaranteed linear-time matching.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use regex::Regex;

fn main() {
    let re = Regex::new(r"\\d+").unwrap();

    // is_match — boolean test
    println!("{}", re.is_match("foo42"));     // true

    // find — first match with position
    if let Some(m) = re.find("foo42bar") {
        println!("{}", m.as_str());           // "42"
        println!("{}", m.start());            // 3
    }

    // find_iter — iterator of all matches
    for mat in re.find_iter("42 items and 189 units") {
        println!("{}", mat.as_str());
    }

    // captures — first match with groups
    let date_re = Regex::new(r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})").unwrap();
    if let Some(caps) = date_re.captures("Date: 2026-02-27") {
        println!("{}", &caps["year"]);        // 2026
        println!("{}", &caps["month"]);       // 02
    }

    // replace / replace_all
    let result = re.replace_all("42 and 189", "N");
    println!("{}", result);                   // "N and N"
}`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Java — java.util.regex
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import java.util.regex.*;

public class RegexDemo {
    public static void main(String[] args) {
        String text = "Order: 42 items, total: 189";

        // Quick match check
        System.out.println(text.matches(".*\\\\d+.*")); // true
        // .matches() tests the ENTIRE string

        // Pattern + Matcher for more control
        Pattern p = Pattern.compile("\\\\d+");
        Matcher m = p.matcher(text);

        // find() moves to next match, group() returns it
        while (m.find()) {
            System.out.println(m.group() + " at " + m.start());
        }

        // Named groups (Java 7+)
        Pattern dp = Pattern.compile("(?<year>\\\\d{4})-(?<month>\\\\d{2})-(?<day>\\\\d{2})");
        Matcher dm = dp.matcher("2026-02-27");
        if (dm.matches()) {
            System.out.println(dm.group("year")); // 2026
        }

        // replaceAll
        System.out.println(text.replaceAll("\\\\d+", "N"));
    }
}`}</code></pre>

      {/* 10. Regex for Text Processing */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        10. Regex for Text Processing Tasks
      </h2>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Log File Parsing
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Apache/Nginx combined log format
const apacheLogRe = /^(?<ip>[\\d.]+) \\S+ \\S+ \\[(?<time>[^\\]]+)\\] "(?<method>\\w+) (?<path>[^ "]+)[^"]*" (?<status>\\d{3}) (?<size>\\d+|-)/mg;

const entries = [...log.matchAll(apacheLogRe)].map(m => m.groups);
const errors = entries.filter(e => e.status.startsWith('5'));`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Markdown Link Extraction
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Extract [text](url) markdown links
const mdLinkRe = /\\[(?<text>[^\\]]+)\\]\\((?<url>[^)]+)\\)/g;

const markdown = 'See [DevToolBox](https://viadreams.cc) and [docs](https://docs.example.com)';
const links = [...markdown.matchAll(mdLinkRe)].map(m => ({
  text: m.groups.text,
  url: m.groups.url,
}));
// [{text:'DevToolBox', url:'https://viadreams.cc'}, ...]`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        HTML Attribute Extraction (with Caveats)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Extract href values — works for simple, well-formed HTML only
const hrefRe = /href=["'](?<url>[^"']+)["']/gi;

// WARNING: Regex is NOT a substitute for a proper HTML parser.
// Nested quotes, CDATA sections, comments, and malformed HTML
// will all break simple regex approaches.
// Use DOMParser, cheerio, or htmlparser2 for production HTML parsing.

// Safe use case: extracting from KNOWN, CONTROLLED template output
const template = '<a href="/about">About</a>';
const href = template.match(/href="([^"]+)"/)?.[1]; // '/about'`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Code Comment Removal
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Remove single-line // comments (naive — breaks on // inside strings)
code.replace(/\\/\\/.*$/mg, '');

// Remove /* block */ comments (non-greedy to avoid over-matching)
code.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '');

// NOTE: For production code stripping, use a proper AST parser
// (Babel, esprima, acorn) — regex cannot handle all edge cases
// like // inside string literals or nested block comments.`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        CSV Parsing Pitfalls
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Simple CSV split — FAILS on quoted fields containing commas
'a,b,c'.split(','); // ['a', 'b', 'c'] ✓

// Quoted field with comma — simple split fails
'"hello, world",foo,bar'.split(','); // ['"hello', ' world"', 'foo', 'bar'] ✗

// Better regex for quoted CSV fields
const csvFieldRe = /(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))/g;
// Still not RFC 4180 compliant — use Papa Parse or csv-parse for production`}</code></pre>

      {/* 11. Testing Strategies */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        11. Testing Strategies for Regex Patterns
      </h2>
      <p>
        A regex that works on your test case may fail on edge cases in production. Use our{' '}
        <Link href={`/${lang}/tools/regex-tester`}>online regex tester</Link> to systematically test
        all of the following categories.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Email Regex Test Cases
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Input</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Expected</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['user@example.com', 'MATCH', 'Standard email'],
              ['first.last@domain.co.uk', 'MATCH', 'Subdomain + country TLD'],
              ['user+tag@example.org', 'MATCH', 'Plus-addressing'],
              ['user@subdomain.example.com', 'MATCH', 'Subdomain'],
              ['@example.com', 'NO MATCH', 'Missing local part'],
              ['user@', 'NO MATCH', 'Missing domain'],
              ['user@.com', 'NO MATCH', 'Domain starts with dot'],
              ['user@example', 'NO MATCH', 'No TLD'],
              ['user @example.com', 'NO MATCH', 'Space in local part'],
              ['"user@name"@example.com', 'DEPENDS', 'Quoted local parts — RFC allows, most regex reject'],
              ['user@[192.168.1.1]', 'DEPENDS', 'IP address domain — technically valid per RFC'],
              ['', 'NO MATCH', 'Empty string'],
              ['a'.repeat(255) + '@example.com', 'DEPENDS', 'Very long local part'],
            ].map(([input, expected, notes], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.8rem', wordBreak: 'break-all' }}>{input}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', color: expected === 'MATCH' ? '#16a34a' : expected === 'NO MATCH' ? '#dc2626' : '#d97706', fontWeight: '600' }}>{expected}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontSize: '0.82rem' }}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        General Testing Checklist
      </h3>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
        <li><strong>Empty string:</strong> Does your pattern handle <code>""</code> correctly?</li>
        <li><strong>Minimum valid input:</strong> Single character, shortest possible match.</li>
        <li><strong>Maximum valid input:</strong> Very long strings — check performance.</li>
        <li><strong>Boundary conditions:</strong> Exactly at min/max length limits.</li>
        <li><strong>Unicode:</strong> Emojis, accented characters, CJK — does <code>\w</code> behave as expected?</li>
        <li><strong>Newlines:</strong> Does <code>.</code> match <code>\n</code>? Do you need the <code>s</code> flag?</li>
        <li><strong>Non-matching input:</strong> Confirm false positives don&apos;t sneak through.</li>
        <li><strong>Anchoring:</strong> Test <code>"xpatternx"</code> to confirm anchors prevent partial matches.</li>
      </ul>

      {/* 12. Common Mistakes */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        12. Common Regex Mistakes and How to Fix Them
      </h2>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Mistake 1: Forgetting to Escape the Dot
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// WRONG — matches "3.14" but also "3X14", "3914"
/3.14/.test('3X14'); // true (. matches any char)

// RIGHT
/3\\.14/.test('3X14'); // false
/3\\.14/.test('3.14'); // true`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Mistake 2: Greedy When You Need Lazy
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const html = '<b>bold</b> and <i>italic</i>';

// WRONG — greedy .* matches as much as possible
html.match(/<.+>/)?.[0];   // '<b>bold</b> and <i>italic</i>'

// RIGHT — lazy .*? stops at first >
html.match(/<.+?>/)?.[0];  // '<b>'
html.match(/<.+?>/g);      // ['<b>', '</b>', '<i>', '</i>']`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Mistake 3: Not Anchoring Validation Patterns
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// WRONG — passes "abc123xyz" because \\d+ matches "123" anywhere
/\\d+/.test('abc123xyz'); // true — not a validation pattern!

// RIGHT — validate the ENTIRE input
/^\\d+$/.test('abc123xyz'); // false
/^\\d+$/.test('123');       // true`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Mistake 4: Forgetting the g Flag in JavaScript
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const text = 'foo bar baz';

// WRONG — only replaces first match
text.replace(/\\b\\w+\\b/, 'X');   // 'X bar baz'

// RIGHT — global flag replaces all
text.replace(/\\b\\w+\\b/g, 'X');  // 'X X X'

// Also affects match() — without g, returns match object
text.match(/\\w+/);    // ['foo', index: 0, ...]
text.match(/\\w+/g);   // ['foo', 'bar', 'baz']`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Mistake 5: Catastrophic Backtracking with (a+)+
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// DANGEROUS — exponential time on non-matching input
const evil = /(a+)+b/;

// Test with progressively longer strings to see performance degrade:
evil.test('aaab');          // fast
evil.test('aaaaaaaaaab');   // slower
evil.test('aaaaaaaaaaaaaaaaaaaab'); // very slow
evil.test('aaaaaaaaaaaaaaaaaaaac'); // HANGS — no 'b' to end the match

// FIX: Rewrite to eliminate ambiguity
// Option 1: atomic group (not in JS/Python)
// Option 2: possessive quantifier (not in JS/Python)
// Option 3: restructure to remove nested quantifiers
/a+b/.test('aaab'); // works correctly, no ambiguity`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Mistake 6: Unicode Issues with \\w and \\d
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// In JavaScript (without u flag), \\w = [a-zA-Z0-9_] — ASCII only
/^\\w+$/.test('café');    // false — accented char not in \\w
/^\\w+$/.test('hello');   // true

// The u flag enables Unicode matching for some features but \\w is still ASCII in JS
// Use explicit ranges for Unicode letter matching:
/^[\\p{L}\\p{N}]+$/u.test('café'); // true (with u flag and \\p Unicode category)

// Python with re.UNICODE (default in Python 3):
// \\w matches all Unicode word characters including accented letters
import re
bool(re.match(r'^\\w+$', 'café'))  # True in Python 3`}</code></pre>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>
            Use an <strong>online regex tester</strong> to get instant visual feedback before adding
            patterns to your codebase.
          </li>
          <li>
            Always <strong>anchor validation patterns</strong> with <code>^</code> and <code>$</code> to
            prevent partial matches.
          </li>
          <li>
            <strong>Named capture groups</strong> (<code>{'(?<name>...)'}</code>) make patterns
            self-documenting and protect against index shifts.
          </li>
          <li>
            <strong>Lookahead/lookbehind</strong> are zero-width assertions — they check context
            without consuming characters, perfect for password validation.
          </li>
          <li>
            <strong>Avoid nested quantifiers</strong> on overlapping patterns like <code>(a+)+</code> —
            they cause catastrophic backtracking on non-matching input.
          </li>
          <li>
            <strong>Go uses RE2</strong> (no lookahead/lookbehind); JavaScript and Python support
            full PCRE-compatible features.
          </li>
          <li>
            <strong>Compile patterns outside loops</strong> with <code>re.compile()</code> (Python)
            or module-level literals (JavaScript) for maximum performance.
          </li>
          <li>
            Always add the <strong>g flag</strong> in JavaScript when you want to replace or match
            all occurrences, not just the first.
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div
        style={{
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '1.5rem',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0 }}>
          Ready to build and test your own patterns?{' '}
          <Link
            href={`/${lang}/tools/regex-tester`}
            style={{ fontWeight: 700, color: '#0369a1' }}
          >
            Open the free Regex Tester
          </Link>{' '}
          — no signup required, instant match highlighting, and a built-in cheat sheet.
        </p>
      </div>
    </article>
  );
}
