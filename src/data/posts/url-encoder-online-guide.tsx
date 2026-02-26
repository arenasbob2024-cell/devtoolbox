'use client';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  URL Encoder/Decoder Online Guide                                   */
/* ------------------------------------------------------------------ */

export default function UrlEncoderOnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/url-encoder`;

  /* ---------- common encoded characters table ---------- */
  const encodedCharsTable: [string, string, string][] = [
    ['(space)', '%20', 'Space character (also + in form data)'],
    ['!', '%21', 'Exclamation mark'],
    ['"', '%22', 'Double quote'],
    ['#', '%23', 'Hash / Fragment identifier'],
    ['$', '%24', 'Dollar sign'],
    ['%', '%25', 'Percent sign (escape character itself)'],
    ['&', '%26', 'Ampersand (query parameter separator)'],
    ["'", '%27', 'Single quote / Apostrophe'],
    ['(', '%28', 'Opening parenthesis'],
    [')', '%29', 'Closing parenthesis'],
    ['*', '%2A', 'Asterisk'],
    ['+', '%2B', 'Plus sign (space in form encoding)'],
    [',', '%2C', 'Comma'],
    ['/', '%2F', 'Forward slash (path separator)'],
    [':', '%3A', 'Colon (scheme separator)'],
    [';', '%3B', 'Semicolon'],
    ['<', '%3C', 'Less than'],
    ['=', '%3D', 'Equals sign (key=value separator)'],
    ['>', '%3E', 'Greater than'],
    ['?', '%3F', 'Question mark (query string start)'],
    ['@', '%40', 'At sign (userinfo delimiter)'],
    ['[', '%5B', 'Opening bracket'],
    [']', '%5D', 'Closing bracket'],
    ['{', '%7B', 'Opening brace'],
    ['|', '%7C', 'Pipe / Vertical bar'],
    ['}', '%7D', 'Closing brace'],
    ['~', '%7E', 'Tilde (unreserved but sometimes encoded)'],
  ];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: 'What is URL encoding (percent encoding)?',
      a: 'URL encoding, also called percent encoding, is a mechanism defined in RFC 3986 that replaces unsafe or reserved characters in a URL with a percent sign (%) followed by two hexadecimal digits representing the character\'s byte value. For example, a space becomes %20 and an ampersand becomes %26. This ensures URLs only contain characters from the allowed ASCII subset.',
    },
    {
      q: 'What is the difference between encodeURI() and encodeURIComponent() in JavaScript?',
      a: 'encodeURI() encodes a full URI but preserves characters with special URL meaning (like :, /, ?, #, &). encodeURIComponent() encodes a URI component (such as a query parameter value) and encodes all reserved characters including &, =, +, and /. Use encodeURIComponent() for query parameter values and encodeURI() only when encoding an entire URL where you want to preserve the structure.',
    },
    {
      q: 'Why does a space become %20 in some cases and + in others?',
      a: 'The %20 encoding comes from RFC 3986 percent encoding and is used in URL path segments and modern applications. The + encoding for spaces comes from the application/x-www-form-urlencoded format used by HTML forms. When a browser submits a form with method GET or POST, spaces in form values are encoded as +. Both representations decode to a space, but the context determines which one is correct.',
    },
    {
      q: 'What is double encoding and how do I fix it?',
      a: 'Double encoding occurs when an already-encoded string is encoded again. For example, %20 becomes %2520 because the % character itself gets encoded to %25. To fix double encoding, first check if your input is already encoded before encoding it. You can detect double encoding by looking for %25 sequences in the URL. Decode the string first with decodeURIComponent(), then re-encode it once with encodeURIComponent().',
    },
    {
      q: 'What is URL-safe Base64 and how does it differ from URL encoding?',
      a: 'URL-safe Base64 (Base64URL) is a variant of Base64 encoding that replaces + with - and / with _ to avoid conflicts with URL reserved characters. It is used in JWT tokens and data URIs. URL encoding (percent encoding) is a completely different mechanism that escapes individual characters with %XX notation. Use URL-safe Base64 when transmitting binary data in URLs, and use URL encoding when escaping special characters in URL components.',
    },
    {
      q: 'How do I URL-encode characters in Python?',
      a: 'In Python 3, use urllib.parse.quote() to percent-encode a string (encodes everything except unreserved characters), or urllib.parse.quote_plus() to encode spaces as + (for form data). For encoding query string dictionaries, use urllib.parse.urlencode(). To decode, use urllib.parse.unquote() or urllib.parse.unquote_plus().',
    },
    {
      q: 'Which characters need to be URL encoded?',
      a: 'According to RFC 3986, only unreserved characters do NOT need encoding: letters (A-Z, a-z), digits (0-9), hyphen (-), underscore (_), period (.), and tilde (~). All other characters, including reserved characters (:, /, ?, #, [, ], @, !, $, &, \', (, ), *, +, ,, ;, =) when used outside their special purpose, and all non-ASCII characters, must be percent-encoded.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto', lineHeight: 1.75 }}>
      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ---- TL;DR Box ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 32,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, marginTop: 0 }}>TL;DR</p>
        <p style={{ margin: 0, fontSize: 15 }}>
          URL encoding (percent encoding) converts special and reserved characters into a
          <code style={{ background: '#e0f2fe', padding: '1px 5px', borderRadius: 3 }}>%XX</code> format
          so they can be safely transmitted in URLs. It is defined by RFC 3986 and is essential for
          building correct query strings, API calls, and form submissions. Use{' '}
          <code style={{ background: '#e0f2fe', padding: '1px 5px', borderRadius: 3 }}>encodeURIComponent()</code> in
          JavaScript for parameter values, <code style={{ background: '#e0f2fe', padding: '1px 5px', borderRadius: 3 }}>urllib.parse.quote()</code> in
          Python, and <code style={{ background: '#e0f2fe', padding: '1px 5px', borderRadius: 3 }}>URLEncoder.encode()</code> in Java.
          Avoid double encoding, understand the difference between <code style={{ background: '#e0f2fe', padding: '1px 5px', borderRadius: 3 }}>%20</code> and <code style={{ background: '#e0f2fe', padding: '1px 5px', borderRadius: 3 }}>+</code> for
          spaces, and know when to use URL-safe Base64 instead.{' '}
          <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
            Try our free URL Encoder/Decoder tool &rarr;
          </Link>
        </p>
      </div>

      {/* ---- Key Takeaways ---- */}
      <div style={{
        background: '#f8fafc',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 40,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, marginTop: 0 }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li>URL encoding replaces unsafe characters with <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>%</code> followed by two hex digits (e.g., space = <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>%20</code>).</li>
          <li>RFC 3986 defines which characters are reserved (18 characters with special meaning) and unreserved (letters, digits, <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>- _ . ~</code>).</li>
          <li>In JavaScript, use <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>encodeURIComponent()</code> for query parameter values, not <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>encodeURI()</code>.</li>
          <li>HTML form submissions use <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>application/x-www-form-urlencoded</code> where spaces become <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>+</code> instead of <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>%20</code>.</li>
          <li>Double encoding (%20 becoming %2520) is a common, hard-to-debug problem. Always check if input is already encoded.</li>
          <li>URL-safe Base64 (Base64URL) and URL encoding are different mechanisms for different purposes.</li>
        </ul>
      </div>

      {/* ---- Section: What is URL Encoding ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        What Is URL Encoding (Percent Encoding)?
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        URL encoding, officially called <strong>percent encoding</strong>, is a mechanism for converting characters
        into a format that can be safely included in a Uniform Resource Identifier (URI). It works by replacing
        each unsafe character with a percent sign (<code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>%</code>)
        followed by two hexadecimal digits representing the character&apos;s byte value in ASCII or UTF-8.
      </p>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        For example, a space character (ASCII 32, hex 0x20) becomes <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>%20</code>,
        the ampersand <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>&amp;</code> (ASCII 38, hex 0x26)
        becomes <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>%26</code>, and the forward
        slash <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>/</code> (ASCII 47, hex 0x2F)
        becomes <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>%2F</code>.
      </p>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        This mechanism is defined in <strong>RFC 3986</strong> (Uniform Resource Identifier: Generic Syntax).
        URLs were designed to contain only a limited set of characters from the US-ASCII character set. Any character
        outside this allowed set, or any reserved character used outside its designated purpose, must be percent-encoded
        to avoid ambiguity.
      </p>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        For multi-byte characters (like Chinese, Japanese, emoji, or accented letters), each byte of the UTF-8
        representation is encoded separately. For example, the euro sign (&euro;, U+20AC) in UTF-8
        is three bytes: <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>E2 82 AC</code>,
        so it becomes <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>%E2%82%AC</code>.
      </p>
      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Encode or decode any URL instantly with our free online tool &rarr;
        </Link>
      </p>

      {/* ---- Section: RFC 3986 Reserved vs Unreserved ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        RFC 3986: Reserved vs Unreserved Characters
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        RFC 3986 classifies URI characters into two groups that determine when encoding is required:
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Reserved Characters (18)</h3>
      <p style={{ fontSize: 15, marginBottom: 8 }}>
        These characters carry special meaning in the URI syntax. If you want to use them <em>literally</em> (not
        for their structural purpose), they must be percent-encoded:
      </p>
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 6,
        padding: '12px 16px',
        marginBottom: 16,
        fontFamily: 'monospace',
        fontSize: 15,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        {[': / ? # [ ] @ ! $ & \' ( ) * + , ; ='].map((chars, i) => (
          <span key={i}>{chars}</span>
        ))}
      </div>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>
        <strong>Sub-delimiters:</strong> ! $ &amp; &apos; ( ) * + , ; = &nbsp;|&nbsp;
        <strong>Gen-delimiters:</strong> : / ? # [ ] @
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Unreserved Characters</h3>
      <p style={{ fontSize: 15, marginBottom: 8 }}>
        These characters can appear in a URI without encoding. They have no special syntactic meaning:
      </p>
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 6,
        padding: '12px 16px',
        marginBottom: 16,
        fontSize: 15,
      }}>
        <p style={{ margin: '0 0 4px 0' }}><strong>Letters:</strong> A-Z, a-z</p>
        <p style={{ margin: '0 0 4px 0' }}><strong>Digits:</strong> 0-9</p>
        <p style={{ margin: 0 }}><strong>Special:</strong> <code>-</code> <code>_</code> <code>.</code> <code>~</code></p>
      </div>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Everything else &mdash; including spaces, non-ASCII characters, and control characters &mdash; must always be
        percent-encoded when appearing in a URI.
      </p>

      {/* ---- Section: Common Encoded Characters Table ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Common URL Encoded Characters Reference Table
      </h2>
      <p style={{ fontSize: 15, marginBottom: 16 }}>
        Below is a quick-reference table of frequently encoded characters. Bookmark this page for instant lookup:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 14,
          textAlign: 'left',
        }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Character</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Encoded</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {encodedCharsTable.map(([char, enc, desc], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontWeight: 600 }}>{char}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', color: '#2563eb' }}>{enc}</td>
                <td style={{ padding: '8px 14px' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Section: encodeURIComponent vs encodeURI ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        encodeURIComponent vs encodeURI in JavaScript
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        JavaScript provides two built-in functions for URL encoding. Using the wrong one is one of the most common
        sources of URL-related bugs:
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>encodeURI()</h3>
      <p style={{ fontSize: 15, marginBottom: 8 }}>
        Encodes a <strong>complete URI</strong>. It preserves characters that have special meaning in a URL, including:{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>: / ? # [ ] @ ! $ &amp; &apos; ( ) * + , ; =</code>
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// encodeURI preserves URL structure characters
encodeURI('https://example.com/path?name=John Doe&city=New York')
// "https://example.com/path?name=John%20Doe&city=New%20York"
// Notice: ://?&= are NOT encoded`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>encodeURIComponent()</h3>
      <p style={{ fontSize: 15, marginBottom: 8 }}>
        Encodes a <strong>URI component</strong> (such as a query parameter value). It encodes all reserved characters
        including <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>&amp;</code>,{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>=</code>,{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>+</code>, and{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>/</code>:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// encodeURIComponent encodes everything for use as a value
const query = 'price=100&currency=USD';
encodeURIComponent(query)
// "price%3D100%26currency%3DUSD"

// Building a URL with parameters:
const baseUrl = 'https://api.example.com/search';
const param = 'C++ programming & algorithms';
const url = baseUrl + '?q=' + encodeURIComponent(param);
// "https://api.example.com/search?q=C%2B%2B%20programming%20%26%20algorithms"`}
      </pre>

      <div style={{
        background: '#fefce8',
        border: '1px solid #fde047',
        borderRadius: 6,
        padding: '12px 16px',
        marginBottom: 24,
        fontSize: 14,
      }}>
        <strong>Rule of thumb:</strong> Use <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>encodeURIComponent()</code> for
        query parameter values and individual path segments. Use <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>encodeURI()</code> only
        when encoding a complete URL where you want to preserve the structure. When in doubt, use{' '}
        <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>encodeURIComponent()</code>.
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Side-by-Side Comparison</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Character</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>encodeURI</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>encodeURIComponent</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['(space)', '%20', '%20'],
              ['&', '&', '%26'],
              ['=', '=', '%3D'],
              ['+', '+', '%2B'],
              ['/', '/', '%2F'],
              ['?', '?', '%3F'],
              ['#', '#', '%23'],
              ['@', '@', '%40'],
              [':', ':', '%3A'],
            ].map(([char, uri, comp], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontWeight: 600 }}>{char}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', color: uri === char ? '#ef4444' : '#16a34a' }}>{uri}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', color: '#2563eb' }}>{comp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>
        Red = not encoded (dangerous for parameter values). Green = not encoded (safe for full URLs). Blue = encoded.
      </p>

      {/* ---- Section: Python URL Encoding ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        URL Encoding in Python (urllib.parse)
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Python 3 provides the <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>urllib.parse</code> module
        with several URL encoding functions:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`from urllib.parse import quote, quote_plus, urlencode, unquote

# quote() - Percent-encode a string (like encodeURIComponent)
quote('hello world & goodbye')
# 'hello%20world%20%26%20goodbye'

# quote_plus() - Same but encodes spaces as + (for form data)
quote_plus('hello world & goodbye')
# 'hello+world+%26+goodbye'

# urlencode() - Encode a dictionary as query string
params = {'name': 'John Doe', 'city': 'New York', 'q': 'C++'}
urlencode(params)
# 'name=John+Doe&city=New+York&q=C%2B%2B'

# unquote() - Decode a percent-encoded string
unquote('hello%20world%20%26%20goodbye')
# 'hello world & goodbye'

# quote with safe parameter - specify characters NOT to encode
quote('/path/to/resource', safe='/')
# '/path/to/resource'  (slashes preserved)
quote('/path/to/resource', safe='')
# '%2Fpath%2Fto%2Fresource'  (slashes encoded)`}
      </pre>

      {/* ---- Section: Java URL Encoding ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        URL Encoding in Java (URLEncoder)
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Java provides <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>java.net.URLEncoder</code> and{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>java.net.URLDecoder</code> for URL encoding:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`import java.net.URLEncoder;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

// Encode a parameter value
String encoded = URLEncoder.encode(
    "hello world & goodbye", StandardCharsets.UTF_8);
// "hello+world+%26+goodbye"
// Note: URLEncoder encodes spaces as + (form encoding)

// Decode
String decoded = URLDecoder.decode(
    "hello+world+%26+goodbye", StandardCharsets.UTF_8);
// "hello world & goodbye"

// For RFC 3986 encoding (spaces as %20), replace + after encoding:
String rfc3986 = URLEncoder.encode(
    "hello world", StandardCharsets.UTF_8).replace("+", "%20");
// "hello%20world"

// Building a query string
String query = "q=" + URLEncoder.encode("C++ & Java", StandardCharsets.UTF_8);
// "q=C%2B%2B+%26+Java"`}
      </pre>
      <div style={{
        background: '#fefce8',
        border: '1px solid #fde047',
        borderRadius: 6,
        padding: '12px 16px',
        marginBottom: 24,
        fontSize: 14,
      }}>
        <strong>Important:</strong> Java&apos;s <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>URLEncoder.encode()</code> uses
        application/x-www-form-urlencoded format (spaces as +), not RFC 3986 percent encoding
        (spaces as %20). If you need strict RFC 3986 compliance, replace + with %20 after encoding.
        Always specify the charset parameter; the single-argument version is deprecated.
      </div>

      {/* ---- Section: URL Encoding in Forms ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        URL Encoding in HTML Forms (application/x-www-form-urlencoded)
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        When an HTML form is submitted with the default content type{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>application/x-www-form-urlencoded</code>,
        the browser encodes form field values with these rules:
      </p>
      <ul style={{ fontSize: 15, marginBottom: 16, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li>Spaces are encoded as <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>+</code> (not <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>%20</code>)</li>
        <li>Non-alphanumeric characters are percent-encoded</li>
        <li>Field names and values are joined with <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>=</code></li>
        <li>Key-value pairs are separated by <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>&amp;</code></li>
        <li>Line breaks are represented as <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>%0D%0A</code> (CR+LF)</li>
      </ul>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`<!-- HTML form -->
<form action="/search" method="GET">
  <input name="q" value="C++ tutorials & guides" />
  <input name="lang" value="en" />
</form>

<!-- Browser encodes and sends as: -->
<!-- /search?q=C%2B%2B+tutorials+%26+guides&lang=en -->

<!-- In JavaScript, URLSearchParams handles form encoding: -->
const params = new URLSearchParams();
params.set('q', 'C++ tutorials & guides');
params.set('lang', 'en');
params.toString();
// "q=C%2B%2B+tutorials+%26+guides&lang=en"
// Note: URLSearchParams uses + for spaces (form encoding)`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        <strong>Key difference:</strong> The <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>URLSearchParams</code> API
        in modern browsers uses application/x-www-form-urlencoded format (spaces as +), while{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>encodeURIComponent()</code> uses
        RFC 3986 percent encoding (spaces as %20). Both are correct in their respective contexts.
      </p>

      {/* ---- Section: URL Encoding in APIs ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        URL Encoding in APIs: Query Parameters and Path Segments
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        When building API requests, you need to properly encode two types of URL components:
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Query Parameters</h3>
      <p style={{ fontSize: 15, marginBottom: 8 }}>
        Query parameter values must be encoded so that reserved characters like{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>&amp;</code> and{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>=</code> do not break the query string structure:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// WRONG: unencoded parameter breaks the query string
fetch('/api/search?q=rock&roll&page=1')
// Server sees: q="rock", roll="", page="1" (3 params instead of 2)

// CORRECT: encode the parameter value
fetch('/api/search?q=' + encodeURIComponent('rock&roll') + '&page=1')
// Server sees: q="rock&roll", page="1" (2 params, correct)

// BEST: use URL and URLSearchParams
const url = new URL('https://api.example.com/search');
url.searchParams.set('q', 'rock&roll');
url.searchParams.set('page', '1');
fetch(url.toString());
// "https://api.example.com/search?q=rock%26roll&page=1"`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Path Segments</h3>
      <p style={{ fontSize: 15, marginBottom: 8 }}>
        Path segments may also contain characters that need encoding. For example, if a resource name
        contains a slash, it must be encoded to avoid creating an unintended path:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// Resource name: "AC/DC" - the / would create a wrong path
const artist = 'AC/DC';

// WRONG: creates /api/artists/AC/DC (two path segments)
fetch('/api/artists/' + artist);

// CORRECT: encode the path segment
fetch('/api/artists/' + encodeURIComponent(artist));
// /api/artists/AC%2FDC (single path segment)`}
      </pre>

      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Test your URL encoding with our free online tool &rarr;
        </Link>
      </p>

      {/* ---- Section: Double Encoding ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Double Encoding: The Most Common URL Bug
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Double encoding happens when you encode a string that is already percent-encoded. The{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>%</code> character itself gets encoded
        to <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>%25</code>, corrupting
        the previously encoded values:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// Original string
const original = 'hello world';

// First encoding (correct)
const encoded = encodeURIComponent(original);
// "hello%20world"

// Double encoding (BUG!)
const doubleEncoded = encodeURIComponent(encoded);
// "hello%2520world"
//       ^^ %25 = encoded %, 20 stays as literal text

// When decoded once, you get the encoded string, not the original:
decodeURIComponent(doubleEncoded);
// "hello%20world"  (not "hello world"!)

// Real-world scenario: encoding a URL that already has parameters
const apiUrl = 'https://example.com/search?q=hello%20world';
// WRONG: encoding the whole thing again
encodeURI(apiUrl);
// "https://example.com/search?q=hello%2520world"  (corrupted!)

// CORRECT: the URL is already properly encoded, don't encode again`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>How to Detect Double Encoding</h3>
      <ul style={{ fontSize: 15, marginBottom: 16, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li>Look for <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>%25</code> in your URL &mdash; this is an encoded percent sign, which is the hallmark of double encoding.</li>
        <li>Common patterns: <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>%2520</code> (double-encoded space), <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>%253A</code> (double-encoded colon), <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>%252F</code> (double-encoded slash).</li>
        <li>If decoding a URL once produces another percent-encoded string, it was double-encoded.</li>
      </ul>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>How to Prevent Double Encoding</h3>
      <ul style={{ fontSize: 15, marginBottom: 24, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li><strong>Decode first, then encode:</strong> If you are unsure whether input is already encoded, decode it first, then encode once.</li>
        <li><strong>Encode at the boundary:</strong> Encode values only when constructing the URL, not before. Let each layer encode exactly once.</li>
        <li><strong>Use URL/URLSearchParams:</strong> Modern APIs like JavaScript&apos;s <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>URL</code> and <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>URLSearchParams</code> handle encoding automatically and prevent double encoding.</li>
        <li><strong>Avoid encoding whole URLs:</strong> Never pass a complete, already-constructed URL through <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>encodeURIComponent()</code>.</li>
      </ul>

      {/* ---- Section: URL-Safe Base64 vs URL Encoding ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        URL-Safe Base64 vs URL Encoding
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        URL-safe Base64 (Base64URL) and URL encoding (percent encoding) are two different mechanisms that
        serve different purposes. Here is when to use each:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Feature</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>URL Encoding (%XX)</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>URL-Safe Base64</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Purpose', 'Escape special characters in URLs', 'Encode binary data for URL-safe transport'],
              ['Input', 'Text with special characters', 'Binary data (images, tokens, hashes)'],
              ['Output', 'Same text with %XX replacements', 'A-Z, a-z, 0-9, -, _ (no + or /)'],
              ['Size change', 'Up to 3x (each byte -> %XX)', '~33% increase (3 bytes -> 4 chars)'],
              ['Reversible', 'Yes (decode per-character)', 'Yes (decode entire string)'],
              ['Use case', 'Query params, form data, path segments', 'JWT tokens, URL query data, filenames'],
              ['Standard', 'RFC 3986', 'RFC 4648 Section 5'],
            ].map(([feat, url, b64], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontWeight: 600 }}>{feat}</td>
                <td style={{ padding: '8px 14px' }}>{url}</td>
                <td style={{ padding: '8px 14px' }}>{b64}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// Standard Base64 vs URL-Safe Base64
// Standard:  "SGVsbG8gV29ybGQ+"  (contains + which means space in URLs)
// URL-safe:  "SGVsbG8gV29ybGQ-"  (+ replaced with -, / replaced with _)

// In Node.js:
const data = Buffer.from('binary data here');

// Standard Base64
data.toString('base64');      // may contain + and /

// URL-safe Base64
data.toString('base64url');   // uses - and _ instead

// In Python:
import base64
data = b'binary data here'
base64.urlsafe_b64encode(data)  # URL-safe variant
base64.b64encode(data)          # standard variant`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        <strong>When to use URL-safe Base64:</strong> Use it when you need to embed binary or encoded data in a URL
        (JWT tokens, cryptographic hashes, image data). The standard Base64 alphabet includes{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>+</code> and{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>/</code> which have special meaning
        in URLs and would require additional percent encoding.
      </p>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        <strong>When to use URL encoding:</strong> Use it when you need to include text with special characters in a URL
        component (query parameters, path segments, form data).
      </p>

      {/* ---- Section: Other Languages ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        URL Encoding in Other Languages
      </h2>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Go</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`package main

import (
    "fmt"
    "net/url"
)

func main() {
    // Encode a query parameter value
    encoded := url.QueryEscape("hello world & goodbye")
    fmt.Println(encoded) // "hello+world+%26+goodbye"

    // Encode for path segments (spaces as %20)
    pathEncoded := url.PathEscape("hello world & goodbye")
    fmt.Println(pathEncoded) // "hello%20world%20&%20goodbye"

    // Build a complete URL with query parameters
    u, _ := url.Parse("https://api.example.com/search")
    q := u.Query()
    q.Set("q", "C++ & Go")
    q.Set("page", "1")
    u.RawQuery = q.Encode()
    fmt.Println(u.String())
    // "https://api.example.com/search?page=1&q=C%2B%2B+%26+Go"
}`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>PHP</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`<?php
// urlencode() - spaces as + (form encoding)
echo urlencode("hello world & goodbye");
// "hello+world+%26+goodbye"

// rawurlencode() - spaces as %20 (RFC 3986)
echo rawurlencode("hello world & goodbye");
// "hello%20world%20%26%20goodbye"

// http_build_query() - build query string from array
$params = ['q' => 'C++ tutorials', 'page' => 1];
echo http_build_query($params);
// "q=C%2B%2B+tutorials&page=1"

// Decode
echo urldecode("hello+world+%26+goodbye");
// "hello world & goodbye"
?>`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>C# (.NET)</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`using System;
using System.Net;
using System.Web;

// Uri.EscapeDataString() - RFC 3986 (recommended)
Uri.EscapeDataString("hello world & goodbye");
// "hello%20world%20%26%20goodbye"

// HttpUtility.UrlEncode() - form encoding (spaces as +)
HttpUtility.UrlEncode("hello world & goodbye");
// "hello+world+%26+goodbye"

// WebUtility.UrlEncode() - similar to HttpUtility
WebUtility.UrlEncode("hello world & goodbye");
// "hello+world+%26+goodbye"`}
      </pre>

      {/* ---- Section: Debugging Tips ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Debugging URL Encoding Issues
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        URL encoding bugs are among the hardest to diagnose because the symptoms (broken links, garbled data, 404 errors)
        can have many causes. Here is a systematic approach to debugging:
      </p>
      <p style={{ marginTop: 12, fontSize: 15 }}>{lang === 'zh' ? '另请参阅：' : 'See also: '}<Link href={`/${lang}/blog/base64-online-guide`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Base64 encoding guide</Link></p>
          <div style={{
        background: '#f8fafc',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 24,
      }}>
        <ol style={{ fontSize: 15, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, margin: 0 }}>
          <li>
            <strong>Inspect the raw URL</strong> in your browser&apos;s developer tools (Network tab). The browser
            address bar often decodes URLs for display, hiding encoding issues.
          </li>
          <li>
            <strong>Check for %25</strong> sequences &mdash; this is the telltale sign of double encoding.
            If you see <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>%2520</code>, your code
            is encoding an already-encoded URL.
          </li>
          <li>
            <strong>Verify which function you are using:</strong> Are you using{' '}
            <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>encodeURI()</code> where you should
            use <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>encodeURIComponent()</code>?
          </li>
          <li>
            <strong>Check the server side:</strong> Is the server decoding the URL correctly? Some frameworks
            auto-decode parameters while others require manual decoding.
          </li>
          <li>
            <strong>Test with special characters:</strong> Include &amp;, =, +, /, #, and non-ASCII characters
            in your test data to catch encoding issues early.
          </li>
          <li>
            <strong>Use the URL API:</strong> Modern JavaScript&apos;s <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>URL</code> and{' '}
            <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>URLSearchParams</code> handle
            encoding/decoding automatically and prevent most common bugs.
          </li>
        </ol>
      </div>

      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Use our URL Encoder/Decoder to test and debug your URLs &rarr;
        </Link>
      </p>

      {/* ---- Section: Best Practices ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        URL Encoding Best Practices
      </h2>
      <ul style={{ fontSize: 15, marginBottom: 24, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <li>
          <strong>Encode values, not keys or structure:</strong> Only encode parameter values and path segments.
          Do not encode the entire URL including its structure characters (://?#&amp;=).
        </li>
        <li>
          <strong>Use the right function:</strong> Use <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>encodeURIComponent()</code> for
          parameter values, <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>encodeURI()</code> for
          complete URLs, and <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>URLSearchParams</code> for
          building query strings.
        </li>
        <li>
          <strong>Encode at construction time:</strong> Apply encoding when building the URL, not before or after.
          This prevents double encoding.
        </li>
        <li>
          <strong>Always specify UTF-8:</strong> When using language-specific encoding functions, always specify
          UTF-8 as the character encoding to handle international characters correctly.
        </li>
        <li>
          <strong>Prefer URL/URLSearchParams APIs:</strong> These handle encoding automatically and are less
          error-prone than manual string concatenation.
        </li>
        <li>
          <strong>Be consistent:</strong> Pick one encoding strategy across your application. Mixing + and %20 for
          spaces in the same codebase leads to confusion.
        </li>
        <li>
          <strong>Test with edge cases:</strong> Always test with strings that contain &amp;, =, +, /, #, ?, @,
          spaces, and Unicode characters.
        </li>
        <li>
          <strong>Do not encode URLs received from users:</strong> If a user provides a full URL (e.g., a callback URL),
          validate it rather than encoding it. Encoding a complete URL would break its structure.
        </li>
      </ul>

      {/* ---- FAQ Section ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Frequently Asked Questions
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
        {faqItems.map((item, idx) => (
          <div key={idx} style={{
            background: idx % 2 === 0 ? '#f8fafc' : '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: '16px 20px',
          }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 0, marginBottom: 8 }}>{item.q}</h3>
            <p style={{ fontSize: 15, margin: 0, lineHeight: 1.7 }}>{item.a}</p>
          </div>
        ))}
      </div>

      {/* ---- CTA ---- */}
      <div style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
        border: '1px solid #bae6fd',
        borderRadius: 12,
        padding: '24px 28px',
        textAlign: 'center',
        marginBottom: 32,
      }}>
        <p style={{ fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 8 }}>
          Ready to encode and decode URLs?
        </p>
        <p style={{ fontSize: 15, marginBottom: 16, color: '#475569' }}>
          Paste any URL or text string and get instant results. Supports both RFC 3986 and form encoding.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Open URL Encoder/Decoder Tool
        </Link>
      </div>
    </article>
  );
}
