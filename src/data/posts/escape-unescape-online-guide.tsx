'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'HTML Escape / Unescape: Encode Special Characters Online — Complete Guide',
    description: 'Escape and unescape HTML, URLs, JSON, SQL, and shell strings. Complete guide covering XSS prevention, HTML entities, URL encoding, JSON escaping, SQL injection prevention, and regex escaping.',
    tldrTitle: 'TL;DR',
    tldrText: 'Use our free',
    tldrLink: 'online escape/unescape tool',
    tldrBody: 'to instantly encode or decode HTML entities, URL percent-encoding, JSON strings, and more. For HTML escaping in JavaScript use textContent instead of innerHTML. For Python use html.escape(). Always use parameterized queries to prevent SQL injection. URL-encode with encodeURIComponent() in JavaScript and urllib.parse.quote() in Python.',
    keyTakeaways: 'Key Takeaways',
  },
  zh: {
    title: 'HTML 转义/反转义：在线编码特殊字符 — 完整指南',
    description: 'HTML、URL、JSON、SQL 和 Shell 字符串转义与反转义完整指南。含 XSS 防护、HTML 实体、URL 编码、JSON 转义、SQL 注入防护和正则表达式转义。',
    tldrTitle: '简要总结',
    tldrText: '使用我们免费的',
    tldrLink: '在线转义/反转义工具',
    tldrBody: '即时编解码 HTML 实体、URL 百分比编码、JSON 字符串等。JavaScript 中 HTML 转义使用 textContent 而非 innerHTML。Python 使用 html.escape()。始终使用参数化查询防止 SQL 注入。JavaScript 用 encodeURIComponent()，Python 用 urllib.parse.quote() 进行 URL 编码。',
    keyTakeaways: '关键要点',
  },
};

export default function EscapeUnescapeOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is HTML escaping and why is it needed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HTML escaping converts special characters like <, >, &, " and \' into their HTML entity equivalents (&lt;, &gt;, &amp;, &quot;, &apos;). It is required whenever user-supplied text is inserted into HTML to prevent the browser from interpreting it as markup. Without escaping, an attacker can inject arbitrary HTML or JavaScript — a vulnerability called XSS (Cross-Site Scripting). Always escape untrusted data before inserting it into HTML.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between encodeURIComponent and encodeURI in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'encodeURIComponent() encodes ALL special characters except letters, digits, and - _ . ! ~ * \' ( ), making it suitable for encoding individual query parameter values. encodeURI() leaves characters that have special meaning in URIs intact (such as :, /, ?, #, @, &, =, +) and is only suitable for encoding a complete URL. Rule: use encodeURIComponent() for individual parameter values, use encodeURI() only if you need to encode an entire URL while keeping its structure intact.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I prevent XSS (Cross-Site Scripting) attacks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'XSS prevention requires output encoding appropriate to the context: (1) HTML context — escape &, <, >, ", \' using HTML entities. (2) HTML attribute context — additionally escape single quotes and use quoted attributes. (3) JavaScript context — use JSON.stringify() or a dedicated JS encoder. (4) URL context — use encodeURIComponent() for parameter values. (5) CSS context — use CSS.escape() or whitelist numeric/safe values only. Never use innerHTML with untrusted data — use textContent instead. Implement a Content Security Policy (CSP) header as a defense-in-depth layer.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between URL encoding plus (+) and percent-encoding (%20) for spaces?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The plus sign (+) is used to represent spaces in the application/x-www-form-urlencoded format (HTML form submissions). Percent-encoding %20 is the RFC 3986 standard for encoding spaces in URIs. In practice: query strings in HTML forms use + for spaces, while path segments always use %20. JavaScript\'s encodeURIComponent() always uses %20. URLSearchParams uses + in query strings. Both decode correctly with modern libraries, but when in doubt use %20 for path segments and + only in form-encoded query strings.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I escape strings in SQL to prevent SQL injection?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Never escape SQL strings manually — always use parameterized queries (prepared statements). In Node.js with node-postgres: use $1 placeholders and pass values as an array: client.query("SELECT * FROM users WHERE id = $1", [userId]). In Python with psycopg2: use %s placeholders: cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,)). ORMs like Prisma, SQLAlchemy, and Django ORM automatically use parameterized queries. Manual escaping is error-prone and can be bypassed with encoding tricks. Parameterized queries are the only reliable defense.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the most important HTML named entities?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The five essential HTML entities for escaping are: &amp; for & (ampersand), &lt; for < (less-than), &gt; for > (greater-than), &quot; for " (double quote), and &apos; for \' (single quote, HTML5 only). Additional useful entities: &nbsp; for non-breaking space, &copy; for © copyright, &reg; for ® registered trademark, &trade; for ™ trademark, &mdash; for — em dash, &ndash; for – en dash, &hellip; for … ellipsis, &ldquo; and &rdquo; for curly double quotes. Numeric entities &#60; (decimal) and &#x3C; (hex) work for any Unicode codepoint.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I escape special characters in regular expressions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Regular expression special characters that must be escaped with a backslash are: . * + ? ^ $ { } [ ] | ( ) \\. In JavaScript, use a utility function: function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&"); } or use the upcoming RegExp.escape() proposal. In Python, use re.escape(pattern) which handles all special characters automatically. Never construct regex patterns by concatenating untrusted user input without escaping first.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are bidirectional text and homograph attacks in Unicode?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bidirectional (Bidi) text attacks exploit Unicode control characters like U+202E (RIGHT-TO-LEFT OVERRIDE) that reverse text display order, making "evil.txt" appear as "txt.live" in filenames. Homograph attacks use visually similar characters from different Unicode scripts (e.g., Cyrillic "а" vs Latin "a") to register look-alike domain names (punycode attacks). Defenses: normalize Unicode input with NFC/NFKC normalization, detect and strip Bidi override characters in filenames and identifiers, use Unicode confusables detection for domain names and usernames.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>{t.tldrTitle}</p>
        <p style={{ margin: 0 }}>
          {t.tldrText}{' '}
          <Link href={`/${lang}/tools/escape-unescape`} style={{ color: '#0284c7' }}>{t.tldrLink}</Link>{' '}
          {t.tldrBody}
        </p>
      </div>

      {/* Section 1: HTML Entities Overview */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        HTML Entities Overview — Named, Numeric, and Hex
      </h2>
      <p>
        HTML entities are special sequences that represent characters with special meaning in HTML or characters that
        cannot easily be typed. They begin with an ampersand (<code>&amp;</code>) and end with a semicolon
        (<code>;</code>). There are three forms: <strong>named entities</strong> (&amp;amp;), <strong>decimal numeric
        entities</strong> (&amp;#60;), and <strong>hexadecimal numeric entities</strong> (&amp;#x3C;).
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        The Five Essential Escaping Characters
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Character</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Named Entity</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Decimal</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Hex</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Why Escape?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;</code> ampersand</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;amp;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;#38;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;#x26;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Starts entity sequences</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&lt;</code> less-than</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;lt;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;#60;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;#x3C;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Opens HTML tags</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&gt;</code> greater-than</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;gt;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;#62;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;#x3E;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Closes HTML tags</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&quot;</code> double quote</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;quot;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;#34;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;#x22;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Breaks attribute values</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&apos;</code> single quote</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;apos;</code> (HTML5)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;#39;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>&amp;#x27;</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Breaks single-quoted attributes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Common Named Entities for Typography
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Entity</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Renders As</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['&amp;nbsp;', '\u00A0', 'Non-breaking space'],
              ['&amp;copy;', '©', 'Copyright'],
              ['&amp;reg;', '®', 'Registered trademark'],
              ['&amp;trade;', '™', 'Trademark'],
              ['&amp;mdash;', '—', 'Em dash'],
              ['&amp;ndash;', '–', 'En dash'],
              ['&amp;hellip;', '…', 'Ellipsis'],
              ['&amp;ldquo; / &amp;rdquo;', '\u201C\u201D', 'Curly double quotes'],
              ['&amp;lsquo; / &amp;rsquo;', '\u2018\u2019', 'Curly single quotes'],
              ['&amp;euro;', '€', 'Euro sign'],
              ['&amp;pound;', '£', 'Pound sign'],
              ['&amp;yen;', '¥', 'Yen sign'],
            ].map(([entity, render, desc], i) => (
              <tr key={i} style={{ background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace' }}>{entity}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>{render}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <strong>Numeric entities</strong> work for any Unicode code point. <code>&amp;#x1F600;</code> renders as
        the grinning face emoji, and <code>&amp;#9731;</code> renders as ☃ (snowman). Use numeric entities when no
        named entity exists or when you need to avoid encoding-related issues in legacy systems.
      </p>

      {/* Section 2: HTML Escaping in JavaScript */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        HTML Escaping in JavaScript — innerHTML vs textContent and XSS
      </h2>
      <p>
        The most important rule in JavaScript web development: <strong>never insert untrusted data using
        innerHTML</strong>. Use <code>textContent</code> instead, which automatically treats the value as plain text
        and never interprets it as HTML markup.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// DANGEROUS — XSS vulnerability
const userInput = '<img src=x onerror="alert(document.cookie)">';
document.getElementById('output').innerHTML = userInput;
// This executes the onerror handler and steals cookies!

// SAFE — always use textContent for plain text
document.getElementById('output').textContent = userInput;
// Displays the literal string without executing anything

// SAFE — manual HTML escape function (when innerHTML is truly needed)
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const safeHtml = \`<p>\${escapeHtml(userInput)}</p>\`;
document.getElementById('output').innerHTML = safeHtml;
// Now safe to use with innerHTML

// Unescape HTML entities back to characters
function unescapeHtml(str: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
  // Uses the browser's own parser — handles all named entities
}

unescapeHtml('&lt;script&gt;alert(1)&lt;/script&gt;');
// => '<script>alert(1)</script>'`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        DOMPurify — Full HTML Sanitization
      </h3>
      <p>
        When you need to allow a subset of HTML (e.g., a rich-text editor allowing bold and italic but not scripts),
        use <strong>DOMPurify</strong> — the industry-standard HTML sanitizer for JavaScript.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Install: npm install dompurify @types/dompurify
import DOMPurify from 'dompurify';

// Allow only safe formatting HTML
const dirty = '<b>Hello</b> <script>alert("XSS")</script> <i>world</i>';
const clean = DOMPurify.sanitize(dirty);
// => '<b>Hello</b>  <i>world</i>'   (script tag removed)

// Strict mode — strip all HTML tags, plain text only
const textOnly = DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
// => 'Hello  world'

// Custom allow-list — allow specific tags and attributes
const limited = DOMPurify.sanitize(dirty, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
  ALLOWED_ATTR: ['href', 'title'],
});

// Force all links to open in new tab (with rel=noopener)
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

// Server-side (Node.js) — use jsdom
import { JSDOM } from 'jsdom';
const { window } = new JSDOM('');
const serverDOMPurify = DOMPurify(window as unknown as Window);
const serverClean = serverDOMPurify.sanitize(dirty);`}</code></pre>

      {/* Section 3: HTML Escaping in Python */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        HTML Escaping in Python — html.escape(), MarkupSafe, and Bleach
      </h2>
      <p>
        Python&apos;s standard library provides <code>html.escape()</code> and <code>html.unescape()</code> for basic
        HTML entity conversion. For template engines and full sanitization, use <strong>MarkupSafe</strong> and{' '}
        <strong>Bleach</strong>.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import html

# Basic HTML escaping
user_input = '<script>alert("XSS")</script>'
escaped = html.escape(user_input)
print(escaped)
# => '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'

# Also escape single quotes (quote=True is default)
html.escape("it's a test", quote=True)
# => "it&#x27;s a test"

# Unescape HTML entities
html.unescape('&lt;b&gt;Hello&lt;/b&gt; &amp; &quot;world&quot;')
# => '<b>Hello</b> & "world"'

# MarkupSafe — Jinja2 / Flask integration
# pip install markupsafe
from markupsafe import escape, Markup

safe_html = escape(user_input)
print(safe_html)
# => Markup('&lt;script&gt;alert(&#34;XSS&#34;)&lt;/script&gt;')

# Mark trusted HTML as safe (skip auto-escaping)
trusted = Markup('<b>Bold text</b>')
# Jinja2 auto-escapes everything unless wrapped in Markup()

# Django's conditional_escape
from django.utils.html import conditional_escape, format_html, mark_safe

# conditional_escape — escapes strings, passes Markup through
def render_user_name(name):
    return format_html('<span class="user">{}</span>', name)
    # format_html auto-escapes all {} arguments

# Bleach — allow safe HTML subset (pip install bleach)
import bleach

dirty = '<b>Hello</b> <script>alert(1)</script> <a href="javascript:void(0)">click</a>'
clean = bleach.clean(dirty, tags=['b', 'i', 'a'], attributes={'a': ['href']})
# => '<b>Hello</b> &lt;script&gt;alert(1)&lt;/script&gt; <a>click</a>'
# Note: javascript: href was stripped from the allowed tag

# Linkify text and sanitize
linkified = bleach.linkify(bleach.clean("Visit https://example.com safely"))
# => 'Visit <a href="https://example.com" rel="nofollow">https://example.com</a> safely'`}</code></pre>

      {/* Section 4: Go html/template */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Go — html/template Package and Automatic Context-Aware Escaping
      </h2>
      <p>
        Go&apos;s <code>html/template</code> package provides <strong>context-aware automatic escaping</strong> —
        it analyzes where a value is inserted in the template (HTML, attribute, JavaScript, CSS, URL) and applies
        the correct escaping automatically. This makes it one of the safest template engines available.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "html/template"
    "os"
    "strings"
)

// template.HTMLEscapeString — escape for HTML contexts
func main() {
    // Manual escaping
    input := \`<script>alert("XSS")</script>\`
    escaped := template.HTMLEscapeString(input)
    // => "&lt;script&gt;alert(&#34;XSS&#34;)&lt;/script&gt;"

    // Escape into a writer
    template.HTMLEscape(os.Stdout, []byte(input))

    // template.HTML type — marks a string as safe HTML (skip escaping)
    // Use ONLY for trusted, pre-sanitized HTML
    type PageData struct {
        Title   string
        Content template.HTML // will NOT be escaped
        UserText string       // WILL be escaped
    }

    tmpl := template.Must(template.New("page").Parse(\`
<!DOCTYPE html>
<html>
<head><title>{{.Title}}</title></head>
<body>
  <div>{{.Content}}</div>
  <p>{{.UserText}}</p>
</body>
</html>
    \`))

    data := PageData{
        Title:   "My Page <unsafe>",       // auto-escaped in <title>
        Content: template.HTML("<b>Bold</b>"), // trusted HTML, not escaped
        UserText: input,                    // auto-escaped in <p>
    }
    tmpl.Execute(os.Stdout, data)
}

// Context-aware escaping examples:
// In HTML body: {{.Val}} => auto HTML-escaped
// In attribute: <a href="{{.URL}}"> => auto URL-escaped
// In script: var x = {{.JSON}}; => auto JSON-escaped
// In style: color: {{.Color}}; => auto CSS-escaped

// URL escaping
url := template.URLQueryEscaper("hello world & more")
// => "hello+world+%26+more"

path := template.URLPathEscaper("path/with spaces")
// => "path%2Fwith%20spaces"

// JSEscapeString — escape for inline JavaScript strings
js := template.JSEscapeString(\`alert("test") // comment\`)
// => \`alert(\\u0022test\\u0022) \\u002F\\u002F comment\``}</code></pre>

      {/* Section 5: XSS Prevention */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        XSS Prevention — Output Encoding Per Context
      </h2>
      <p>
        <strong>Cross-Site Scripting (XSS)</strong> is one of the most prevalent web vulnerabilities. An attacker
        injects malicious scripts into trusted websites, which then execute in victims&apos; browsers. The defense
        requires context-specific output encoding — the correct escaping depends entirely on where the data is inserted.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        The Five Output Encoding Contexts
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// 1. HTML BODY CONTEXT
// Escape: & < > " '
element.textContent = userInput; // safest: use textContent
element.innerHTML = escapeHtml(userInput); // or manual escape

// 2. HTML ATTRIBUTE CONTEXT
// Must use quoted attributes AND escape & < > " '
const safe = \`<div title="\${escapeHtml(userInput)}">\`;
// Never: <div title=\${userInput}> (unquoted attributes bypass most escapers)

// 3. JAVASCRIPT CONTEXT (data in <script> tags or event handlers)
// Use JSON.stringify — never string concatenation
const safeJson = JSON.stringify(userInput); // auto-escapes " and special chars
const htmlSafe = safeJson.replace(/</g, '\\u003C').replace(/>/g, '\\u003E');
// <script>var data = \${htmlSafe};</script>

// 4. URL CONTEXT
const safeParam = encodeURIComponent(userInput); // for parameter values
const safeUrl = \`https://example.com/search?q=\${safeParam}\`;

// 5. CSS CONTEXT
// Never allow user input in CSS unless you use CSS.escape()
const safeCssId = CSS.escape(userInput); // for IDs/class names
// document.getElementById(safeCssId)
// NEVER: element.style.cssText = userInput; // arbitrary CSS injection risk

// Content Security Policy header (defense-in-depth)
// Set in HTTP response headers or <meta> tag:
// Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}';

// Common XSS injection patterns to block:
const xssPatterns = [
  '<script>alert(1)</script>',                          // classic script injection
  '<img src=x onerror=alert(1)>',                      // event handler injection
  'javascript:alert(1)',                                 // javascript: URI
  '\\"\\u003Cscript\\u003Ealert(1)\\u003C/script\\u003E', // unicode bypass
  '<svg onload=alert(1)>',                              // SVG event handler
  '"><script>alert(1)</script>',                        // attribute breakout
];`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Content Security Policy (CSP)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Nginx — strict CSP header
add_header Content-Security-Policy "
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM_NONCE}';
  style-src 'self' 'nonce-{RANDOM_NONCE}';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
" always;

// Next.js — CSP with nonces (app/middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

export function middleware(request: NextRequest) {
  const nonce = crypto.randomBytes(16).toString('base64');
  const csp = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-\${nonce}';
    img-src 'self' blob: data:;
  \`.replace(/\\s{2,}/g, ' ').trim();

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Nonce', nonce);
  return response;
}`}</code></pre>

      {/* Section 6: URL Encoding */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        URL Encoding — encodeURIComponent vs encodeURI and urllib.parse
      </h2>
      <p>
        URL encoding (percent-encoding) converts characters that are not allowed in URLs into a
        <code>%XX</code> format, where XX is the hexadecimal value of the byte. Understanding when to use
        different encoding functions is critical for building correct URLs.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// JavaScript URL encoding

// encodeURIComponent — encode a SINGLE component value
// Encodes everything except: A-Z a-z 0-9 - _ . ! ~ * ' ( )
encodeURIComponent('hello world & more');
// => 'hello%20world%20%26%20more'

encodeURIComponent('email@example.com');
// => 'email%40example.com'

encodeURIComponent('path/to/resource');
// => 'path%2Fto%2Fresource'  (/ is also encoded)

// encodeURI — encode an ENTIRE URL (keeps structural chars intact)
// Does NOT encode: ; , / ? : @ & = + $ # A-Z a-z 0-9 - _ . ! ~ * ' ( )
encodeURI('https://example.com/search?q=hello world&lang=en');
// => 'https://example.com/search?q=hello%20world&lang=en'
// Note: & and = are NOT encoded (they have URL structure meaning)

// URLSearchParams — handles query string building correctly
const params = new URLSearchParams({
  q: 'hello world',
  filter: 'a&b=c',
  tag: 'node.js',
});
console.log(params.toString());
// => 'q=hello+world&filter=a%26b%3Dc&tag=node.js'
// Uses application/x-www-form-urlencoded encoding (+ for spaces)

// Build full URL safely
const url = new URL('https://api.example.com/search');
url.searchParams.set('q', 'hello world & more');
url.searchParams.set('page', '2');
console.log(url.toString());
// => 'https://api.example.com/search?q=hello+world+%26+more&page=2'

// Decode
decodeURIComponent('hello%20world%20%26%20more');
// => 'hello world & more'

decodeURI('https://example.com/hello%20world?q=test');
// => 'https://example.com/hello world?q=test'`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python URL encoding

from urllib.parse import quote, unquote, quote_plus, unquote_plus, urlencode, urljoin

# quote — encode a path segment or query value
# safe='' means encode EVERYTHING except letters and digits
quote('hello world & more', safe='')
# => 'hello%20world%20%26%20more'

# safe='/' for path segments (don't encode forward slashes)
quote('/path/to/resource with spaces', safe='/')
# => '/path/to/resource%20with%20spaces'

# quote_plus — encode for application/x-www-form-urlencoded
# (uses + for spaces, like HTML form submissions)
quote_plus('hello world & more')
# => 'hello+world+%26+more'

# Decode
unquote('hello%20world%20%26%20more')
# => 'hello world & more'

unquote_plus('hello+world+%26+more')
# => 'hello world & more'

# Build query strings
params = {'q': 'hello world', 'filter': 'a&b', 'page': 2}
query_string = urlencode(params)
# => 'q=hello+world&filter=a%26b&page=2'

# Join URLs safely
from urllib.parse import urljoin
urljoin('https://example.com/api/', 'v2/users')
# => 'https://example.com/api/v2/users'

# Parse and manipulate URLs
from urllib.parse import urlparse, urlunparse, parse_qs
parsed = urlparse('https://example.com/search?q=hello+world&page=2')
print(parsed.scheme)   # => 'https'
print(parsed.netloc)   # => 'example.com'
print(parsed.path)     # => '/search'
params = parse_qs(parsed.query)
print(params)          # => {'q': ['hello world'], 'page': ['2']}`}</code></pre>

      {/* Section 7: JSON String Escaping */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JSON String Escaping — Backslash Sequences and Unicode
      </h2>
      <p>
        JSON strings must escape certain characters using backslash sequences. Knowing these is essential for
        debugging JSON parse errors and generating valid JSON programmatically.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Sequence</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Character</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['\\\\n', 'LF \\u000A', 'Newline (line feed)'],
              ['\\\\r', 'CR \\u000D', 'Carriage return'],
              ['\\\\t', 'HT \\u0009', 'Horizontal tab'],
              ['\\\\\\\\', '\\\\', 'Backslash itself'],
              ['\\\\"', '"', 'Double quote (required in strings)'],
              ['\\\\/', '/', 'Forward slash (optional)'],
              ['\\\\b', 'BS \\u0008', 'Backspace'],
              ['\\\\f', 'FF \\u000C', 'Form feed'],
              ['\\\\uXXXX', 'Unicode', '4-digit hex Unicode codepoint'],
            ].map(([seq, char, desc], i) => (
              <tr key={i} style={{ background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace' }}>{seq}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace' }}>{char}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// JavaScript JSON escaping

// JSON.stringify handles all required escaping
const data = {
  message: 'Hello "world"\nNew line\tTabbed',
  path: 'C:\\\\Users\\\\alice',
  emoji: '😀',  // encoded as \\uD83D\\uDE00 (surrogate pair in JSON)
};
const json = JSON.stringify(data);
// => '{"message":"Hello \\"world\\"\\nNew line\\tTabbed","path":"C:\\\\Users\\\\alice","emoji":"😀"}'

// Pretty print
JSON.stringify(data, null, 2);

// Custom replacer — exclude null values
JSON.stringify(data, (key, value) => value === null ? undefined : value);

// Reviver — transform values during parsing
JSON.parse(json, (key, value) => {
  if (typeof value === 'string' && /^\\d{4}-\\d{2}-\\d{2}/.test(value)) {
    return new Date(value); // auto-convert date strings
  }
  return value;
});

// DANGER: JSON in HTML <script> tags needs additional escaping
// JSON.stringify does NOT escape </script> which could end the tag early
const htmlSafeJson = JSON.stringify(data)
  .replace(/</g, '\\u003C')
  .replace(/>/g, '\\u003E')
  .replace(/&/g, '\\u0026');
// Safe to embed in: <script>var config = \${htmlSafeJson};</script>`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python JSON escaping

import json

data = {
    "message": 'Hello "world"\nNew line\tTabbed',
    "path": "C:\\\\Users\\\\alice",
    "emoji": "😀",
}

# json.dumps handles all escaping
json_str = json.dumps(data)
print(json_str)
# => '{"message": "Hello \\"world\\"\\nNew line\\tTabbed", "path": "C:\\\\Users\\\\alice", "emoji": "\\ud83d\\ude00"}'

# ensure_ascii=False — preserve Unicode characters instead of \\uXXXX
json_str = json.dumps(data, ensure_ascii=False)
# => '{"message": "Hello \\"world\\"\\nNew line\\tTabbed", "emoji": "😀"}'

# indent for pretty printing
pretty = json.dumps(data, indent=2, ensure_ascii=False)

# Custom encoder for special types
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, 'isoformat'):
            return obj.isoformat()
        return super().default(obj)

from datetime import datetime
json.dumps({"ts": datetime.now()}, cls=DateEncoder)
# => '{"ts": "2026-02-27T12:00:00"}'

# Parse with object_hook
def parse_dates(d):
    for k, v in d.items():
        if isinstance(v, str) and len(v) == 10 and v[4] == '-':
            try: d[k] = datetime.fromisoformat(v)
            except: pass
    return d

json.loads('{"date": "2026-02-27"}', object_hook=parse_dates)`}</code></pre>

      {/* Section 8: SQL Escaping */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        SQL Escaping — Parameterized Queries and Injection Prevention
      </h2>
      <p>
        SQL injection remains one of the most dangerous vulnerabilities. The defense is straightforward:{' '}
        <strong>always use parameterized queries, never string concatenation</strong>. No amount of manual
        escaping is as reliable as parameterized queries — encoding tricks and character set attacks can bypass
        manual escaping.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// VULNERABLE — never do this
const userId = "1 OR 1=1 --";
const query = "SELECT * FROM users WHERE id = " + userId;
// Executes: SELECT * FROM users WHERE id = 1 OR 1=1 --
// Returns all users!

// SAFE — Node.js with node-postgres (pg)
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Named $1 placeholders — values passed separately
const { rows } = await pool.query(
  'SELECT id, name, email FROM users WHERE id = $1',
  [userId]  // userId is passed as a parameter, never interpolated
);

// Multiple parameters
const result = await pool.query(
  'SELECT * FROM products WHERE category = $1 AND price < $2 AND active = $3',
  [category, maxPrice, true]
);

// INSERT with RETURNING
const newUser = await pool.query(
  'INSERT INTO users (name, email, created_at) VALUES ($1, $2, NOW()) RETURNING id',
  [name, email]
);

// SAFE — Prisma ORM (auto-parameterized)
const user = await prisma.user.findFirst({
  where: { id: parseInt(userId) }
}); // Prisma always uses parameterized queries

// SAFE — Drizzle ORM
import { eq } from 'drizzle-orm';
const user = await db.select().from(users).where(eq(users.id, userId));

// LIKE queries — % and _ wildcards must be escaped in the VALUE
const searchTerm = userInput.replace(/%/g, '\\\\%').replace(/_/g, '\\\\_');
await pool.query('SELECT * FROM products WHERE name LIKE $1', [\`%\${searchTerm}%\`]);`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python — psycopg2 (PostgreSQL)
import psycopg2

conn = psycopg2.connect("dbname=mydb user=postgres")
cur = conn.cursor()

# %s placeholders — always pass values as tuple/list
user_id = "1 OR 1=1 --"
cur.execute("SELECT * FROM users WHERE id = %s", (user_id,))
# psycopg2 automatically quotes and escapes the value

# Multiple parameters
cur.execute(
    "SELECT * FROM products WHERE category = %s AND price < %s",
    (category, max_price)
)

# Named parameters with %(name)s
cur.execute(
    "INSERT INTO users (name, email) VALUES (%(name)s, %(email)s)",
    {"name": user_name, "email": user_email}
)

# SQLAlchemy ORM — auto-parameterized
from sqlalchemy import select, and_
from sqlalchemy.orm import Session

with Session(engine) as session:
    stmt = select(User).where(and_(
        User.email == user_email,
        User.active == True
    ))
    user = session.execute(stmt).scalar_one_or_none()

# Django ORM — auto-parameterized
User.objects.filter(id=user_id)  # safe
User.objects.filter(name__contains=search_term)  # also safe, handles LIKE escaping

# Raw SQL in Django — use params argument
from django.db import connection
with connection.cursor() as cursor:
    cursor.execute("SELECT * FROM users WHERE id = %s", [user_id])`}</code></pre>

      {/* Section 9: Shell/Command Escaping */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Shell / Command Escaping — shlex.quote and child_process
      </h2>
      <p>
        Shell injection is as dangerous as SQL injection. When user input is passed to shell commands, an attacker
        can execute arbitrary commands. The safest approach is to avoid shell interpretation entirely by passing
        arguments as arrays.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python — NEVER use os.system() or subprocess with shell=True and user input

import os
import subprocess
import shlex

# VULNERABLE — shell=True passes the string through /bin/sh
filename = "file.txt; rm -rf /"
os.system("cat " + filename)          # DANGEROUS!
subprocess.run("cat " + filename, shell=True)  # DANGEROUS!

# SAFE — pass args as a list, shell=False (default)
subprocess.run(["cat", filename])     # filename is passed as literal argument

# SAFE — if you must use shell=True, use shlex.quote()
safe_filename = shlex.quote(filename)
# => "'file.txt; rm -rf /'"  (single-quoted, semicolon is literal)
os.system("cat " + safe_filename)    # now safe

# shlex.split — parse shell command strings safely
command = "grep -n 'search term' file.txt"
args = shlex.split(command)
# => ['grep', '-n', 'search term', 'file.txt']
subprocess.run(args)  # safe execution

# shlex.join — join args back to a shell-safe string
safe_cmd = shlex.join(["echo", "hello world; rm -rf /"])
# => "echo 'hello world; rm -rf /'"

# For file operations, use os.path functions instead of shell
import pathlib
p = pathlib.Path(filename)
content = p.read_text()  # no shell involved at all`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Node.js — avoid shell injection with child_process

import { execFile, spawn } from 'child_process';
import { promisify } from 'util';
const execFileAsync = promisify(execFile);

const filename = 'user-file.txt; rm -rf /';

// VULNERABLE — exec() passes through /bin/sh
import { exec } from 'child_process';
exec('cat ' + filename);   // DANGEROUS!

// SAFE — execFile() does NOT use a shell
// argv[0] = 'cat', argv[1] = literal filename string
await execFileAsync('cat', [filename]);

// SAFE — spawn() with array of args
const proc = spawn('grep', ['-n', searchTerm, filePath], {
  stdio: ['pipe', 'pipe', 'pipe'],
});

proc.stdout.on('data', (data) => {
  console.log(data.toString());
});

await new Promise((resolve, reject) => {
  proc.on('close', (code) => code === 0 ? resolve(code) : reject(code));
});

// If you absolutely must use shell: true, escape every argument
function shellEscape(s: string): string {
  return "'" + s.replace(/'/g, "'\\''") + "'";
}
// Even better: just never use shell: true with user input`}</code></pre>

      {/* Section 10: Regex Escaping */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Regex Escaping — Special Characters and ReDoS Prevention
      </h2>
      <p>
        Regular expressions have 12 special metacharacters that must be escaped with a backslash when you want
        to match them literally: <code>. * + ? ^ $ {'{'} {'}'} [ ] | ( ) \</code>. Forgetting to escape these
        can cause incorrect matching or, worse, ReDoS (Regular Expression Denial of Service) vulnerabilities.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{[
  '// JavaScript regex escaping',
  '',
  '// The 12 metacharacters that must be escaped: . * + ? ^ $ {} [] | ( ) \\\\',
  'function escapeRegex(s) {',
  "  // Each special char escaped with backslash: . * + ? ^ $ { } [ ] | ( ) \\\\",
  "  return s.replace(/[.\\\\*\\\\+\\\\?\\\\^\\\\$\\\\{\\\\}\\\\(\\\\)\\\\|\\\\[\\\\]\\\\\\\\]/g, '\\\\\\\\$&');",
  '}',
  '',
  "// Examples",
  "escapeRegex('file.txt');   // => 'file\\\\.txt'",
  "escapeRegex('(hello)');    // => '\\\\\\\\(hello\\\\\\\\)'",
  "escapeRegex('$100.00');    // => '\\\\\\\\$100\\\\.00'",
  "escapeRegex('a+b*c');      // => 'a\\\\\\\\+b\\\\\\\\*c'",
  '',
  '// Use in dynamic regex for search highlighting',
  "const search = 'user@example.com';",
  'const regex = new RegExp(escapeRegex(search), "gi");',
  "text.replace(regex, '<mark>$&</mark>');",
  '',
  '// RegExp.escape() proposal (TC39 Stage 2 as of 2026)',
  '// const safe = RegExp.escape(userInput);  // built-in once standardized',
  '',
  '// ReDoS prevention — avoid catastrophic backtracking',
  '// VULNERABLE to ReDoS: /^(a+)+$/ tested against "aaaa...X"',
  '// SAFE: use linear-time patterns or set timeouts via worker threads',
].join('\n')}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python regex escaping

import re

# re.escape() — escape all special characters automatically
pattern = re.escape('file.txt')
print(pattern)  # => 'file\\.txt'

re.escape('(hello)')      # => '\\\\(hello\\\\)'
re.escape('$100.00')      # => '\\\\$100\\.00'
re.escape('user@host')    # => 'user@host'  (@ not special in Python regex)

# Use in dynamic search
search_term = input("Search: ")  # e.g., "C++ programming"
safe_pattern = re.escape(search_term)
matches = re.findall(safe_pattern, text, re.IGNORECASE)

# Highlight matches in text
def highlight(text: str, query: str) -> str:
    escaped = re.escape(query)
    return re.sub(f'({escaped})', r'**\\1**', text, flags=re.IGNORECASE)

# ReDoS prevention — use timeout with signal (Unix only)
import signal
from contextlib import contextmanager

@contextmanager
def regex_timeout(seconds: int):
    def handler(signum, frame): raise TimeoutError("Regex took too long")
    signal.signal(signal.SIGALRM, handler)
    signal.alarm(seconds)
    try:
        yield
    finally:
        signal.alarm(0)

with regex_timeout(1):
    match = re.search(potentially_dangerous_pattern, untrusted_input)

# Or use the 'timeout-decorator' package for cross-platform support`}</code></pre>

      {/* Section 11: CSS Escaping */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSS Escaping — CSS.escape() and Identifier Safety
      </h2>
      <p>
        CSS identifiers (IDs and class names) have strict naming rules. Using user input as CSS selectors without
        escaping can cause broken selectors or injection vulnerabilities. The <code>CSS.escape()</code> API
        handles this correctly.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// CSS.escape() — available in all modern browsers

// Problem: IDs with special characters break querySelector
const userId = '123:special.user';
document.querySelector('#' + userId);
// SyntaxError: '#123:special.user' is not a valid selector

// Solution: CSS.escape()
const safeId = CSS.escape(userId);
// => '123\\:special\\.user'
document.querySelector('#' + safeId);  // works correctly

// Dynamic class name with special chars
const className = 'price[usd]';
CSS.escape(className);
// => 'price\\[usd\\]'

// Polyfill for environments without CSS.escape()
function cssEscape(s: string): string {
  if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(s);
  return s.replace(/([!"#$%&'()*+,./:;<=>?@[\\\\\\]^{|}~\`])/g, '\\\\$1')
           .replace(/^(-?\\d)/, '\\\\3$1 ');
}

// CSS property values — whitelist approach is safer than escaping
// NEVER: element.style.cssText = userInput;  // arbitrary CSS injection!
// NEVER: element.setAttribute('style', 'background: url("' + userInput + '")');

// SAFE: whitelist specific values
const allowedColors = ['red', 'blue', 'green', '#ff0000'];
if (allowedColors.includes(userColor)) {
  element.style.color = userColor;
}

// SAFE: use CSS custom properties (variables) with sanitization
element.style.setProperty('--user-accent', userColor.replace(/[^#a-zA-Z0-9]/g, ''));

// For inline styles with user content, use numeric values only
const opacity = Math.max(0, Math.min(1, parseFloat(userOpacity) || 1));
element.style.opacity = opacity.toString();`}</code></pre>

      {/* Section 12: Markdown Escaping */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Markdown Escaping — Backslash Sequences and Code Fences
      </h2>
      <p>
        Markdown has its own set of special characters that control formatting. When you need to display these
        characters literally, escape them with a backslash.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Markdown special characters — escape with backslash \\

# These characters trigger Markdown formatting:
\\*   asterisk (bold/italic)
\\_   underscore (bold/italic)
\\#   hash (headings)
\\-   hyphen (lists, horizontal rules)
\\+   plus (lists)
\\[   bracket (links)
\\]   bracket (links)
\\(   parenthesis (link URL)
\\)   parenthesis (link URL)
\\!   exclamation (images)
\\>   greater-than (blockquotes)
\`   backtick (inline code)
\\|   pipe (table cells)

# Examples
\\*not italic\\*    => *not italic*  (displayed literally)
\\_not italic\\_   => _not italic_  (displayed literally)
\\#not heading     => #not heading  (displayed literally)

# Code fences with backticks — use more backticks than the content
# Content with one backtick:
\`\`
\`code with backtick\`\`
\`\`

# Content with triple backticks (use 4 backticks for the fence):
\`\`\`\`
\`\`\`python
print("hello")
\`\`\`
\`\`\`\`

# Hugo/Jekyll frontmatter — use raw blocks to prevent processing
{{% raw %}}
{{ variable }} will not be processed by Hugo
{{% endraw %}}

# GitHub Actions YAML — string escaping
env:
  MESSAGE: 'It''s a test'        # single quotes in YAML single-quoted string
  QUERY: "SELECT * FROM \"users\"" # double quotes escaped in YAML
  MULTILINE: |
    Line 1
    Line 2 with $VARIABLE (literal dollar sign in literal block)`}</code></pre>

      {/* Section 13: Unicode and Special Characters */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Unicode and Special Characters — Normalization, Bidi Attacks, Homographs
      </h2>
      <p>
        Unicode introduces subtle security vulnerabilities beyond simple character escaping. Understanding these
        attacks is important for applications that process user-generated content, filenames, or identifiers.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Unicode Normalization
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// JavaScript — Unicode normalization

// The same character can be represented multiple ways
const a1 = 'é';      // U+00E9 — precomposed (single codepoint)
const a2 = 'e\u0301'; // 'e' + combining accent (two codepoints)

console.log(a1 === a2);            // => false (different bytes!)
console.log(a1.length);            // => 1
console.log(a2.length);            // => 2

// Normalize to NFC for consistent comparison
console.log(a1.normalize('NFC') === a2.normalize('NFC')); // => true

// Normalization forms:
// NFC  — Canonical Decomposition, followed by Canonical Composition (most common for display)
// NFD  — Canonical Decomposition (composed chars split into base + combining)
// NFKC — Compatibility Decomposition + Composition (collapses ligatures, etc.)
// NFKD — Compatibility Decomposition (most aggressive normalization)

// NFKC collapses visually similar characters
'ﬁ'.normalize('NFKC');  // fi ligature => 'fi' (two chars)
'Ａ'.normalize('NFKC');  // Fullwidth A => 'A'
'²'.normalize('NFKC');   // Superscript 2 => '2'

// Python
import unicodedata
a1 = '\u00e9'    # é precomposed
a2 = 'e\u0301'  # e + combining accent

unicodedata.normalize('NFC', a2) == a1   # => True
unicodedata.normalize('NFKC', 'ﬁ')       # => 'fi'
unicodedata.normalize('NFKD', 'Ａ')       # => 'A'

// Always normalize user input before comparing, storing, or using as identifiers
function normalizeUserInput(s: string): string {
  return s.normalize('NFC').trim();
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Bidirectional Text (Bidi) Attacks
      </h3>
      <p>
        Unicode bidirectional control characters can reverse the display order of text, making malicious content
        appear benign. The <strong>Trojan Source</strong> attack (CVE-2021-42574) demonstrated how these characters
        could hide malicious code in source files that appears harmless to human reviewers.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Bidirectional control characters
const BIDI_CHARS = [
  '\u200F',  // RIGHT-TO-LEFT MARK
  '\u200E',  // LEFT-TO-RIGHT MARK
  '\u202A',  // LEFT-TO-RIGHT EMBEDDING
  '\u202B',  // RIGHT-TO-LEFT EMBEDDING
  '\u202C',  // POP DIRECTIONAL FORMATTING
  '\u202D',  // LEFT-TO-RIGHT OVERRIDE
  '\u202E',  // RIGHT-TO-LEFT OVERRIDE  ← most dangerous
  '\u2066',  // LEFT-TO-RIGHT ISOLATE
  '\u2067',  // RIGHT-TO-LEFT ISOLATE
  '\u2068',  // FIRST STRONG ISOLATE
  '\u2069',  // POP DIRECTIONAL ISOLATE
  '\u061C',  // ARABIC LETTER MARK
];

// Detect bidi characters in a string
function hasBidiChars(s: string): boolean {
  return BIDI_CHARS.some(c => s.includes(c));
}

// Strip bidi control characters from user-supplied filenames and identifiers
function stripBidi(s: string): string {
  return s.replace(/[\\u200E\\u200F\\u202A-\\u202E\\u2066-\\u2069\\u061C]/g, '');
}

// Example attack: filename appears as "document.pdf" but is actually "fdp.tnemucod"
// by inserting U+202E (RIGHT-TO-LEFT OVERRIDE) before "document"
const malicious = 'fdp.\\u202Etnemucod';
console.log(malicious); // may display as "document.pdf" in some terminals!

// Python — strip bidi chars
import unicodedata
def is_safe_string(s: str) -> bool:
    for char in s:
        if unicodedata.bidirectional(char) in ('RLO', 'LRO', 'RLE', 'LRE', 'PDF', 'FSI', 'RLI', 'LRI', 'PDI'):
            return False
    return True`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Homograph Attacks and Zero-Width Characters
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Homograph attack — visually identical but different codepoints
// Latin 'a' (U+0061) vs Cyrillic 'а' (U+0430)
const latin_a = 'apple.com';       // legitimate
const cyrillic_a = '\u0430pple.com'; // looks identical!

console.log(latin_a === cyrillic_a);    // => false (different bytes)
console.log([...cyrillic_a][0].charCodeAt(0).toString(16)); // => '430' (Cyrillic)

// Detect non-ASCII in domain names (punycode)
function isHomographSuspect(domain: string): boolean {
  return /[^\\x00-\\x7F]/.test(domain); // contains non-ASCII
}
// Legitimate IDN domains also contain non-ASCII, so use punycode comparison

// Convert to punycode for comparison
// import { toASCII } from 'punycode';
// toASCII('аpple.com') => 'xn--pple-43d.com' (not apple.com!)

// Zero-width characters — invisible but change string equality
const ZERO_WIDTH = [
  '\u200B',  // ZERO WIDTH SPACE
  '\u200C',  // ZERO WIDTH NON-JOINER
  '\u200D',  // ZERO WIDTH JOINER (used in emoji sequences)
  '\uFEFF',  // ZERO WIDTH NO-BREAK SPACE (BOM)
  '\u2060',  // WORD JOINER
];

// Strip zero-width chars from usernames and identifiers
function stripZeroWidth(s: string): string {
  return s.replace(/[\\u200B-\\u200D\\uFEFF\\u2060]/g, '');
}

// 'admin\\u200B' looks like 'admin' but is a different string
// An attacker could register 'admin​' (with zero-width space) to impersonate 'admin'
const normalizedUsername = stripZeroWidth(username.normalize('NFKC').toLowerCase().trim());`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>{t.keyTakeaways}</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li>Use <strong>textContent</strong> (not innerHTML) when inserting user text into HTML — it never interprets markup.</li>
          <li>When innerHTML is required, escape <code>&amp;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&quot;</code>, and <code>&apos;</code> using their HTML entities.</li>
          <li>Use <strong>DOMPurify</strong> (JS) or <strong>Bleach</strong> (Python) to sanitize rich HTML from users.</li>
          <li>Use <strong>encodeURIComponent()</strong> for URL parameter values; <strong>URLSearchParams</strong> for query string building.</li>
          <li>Python&apos;s <strong>urllib.parse.quote()</strong> encodes URL components; <strong>html.escape()</strong> for HTML entities.</li>
          <li>Go&apos;s <strong>html/template</strong> package provides context-aware automatic escaping in templates.</li>
          <li>Always use <strong>parameterized queries</strong> to prevent SQL injection — never concatenate user input into SQL strings.</li>
          <li>Avoid <code>shell=True</code> in subprocess calls; pass arguments as arrays instead, or use <strong>shlex.quote()</strong>.</li>
          <li>Use <strong>re.escape()</strong> (Python) or a custom escapeRegex function (JS) before inserting user input into regex patterns.</li>
          <li>Use <strong>CSS.escape()</strong> when using user input as CSS selectors or identifiers.</li>
          <li>Normalize Unicode to <strong>NFC or NFKC</strong> and strip Bidi control characters and zero-width characters from user identifiers.</li>
          <li>Implement a <strong>Content Security Policy (CSP)</strong> header as a defense-in-depth layer against XSS attacks.</li>
          <li>JSON embedded in HTML <code>&lt;script&gt;</code> tags needs additional escaping of <code>&lt;</code>, <code>&gt;</code>, and <code>&amp;</code>.</li>
        </ul>
      </div>
    </article>
  );
}
