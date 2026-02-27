'use client';

const translations = {
  en: {
    title: 'URL Encoder/Decoder: Encode and Decode URLs Online — Complete Guide',
    description: 'Encode and decode URLs with encodeURI, encodeURIComponent, and URLSearchParams. Complete guide for JavaScript, Python, Go URL encoding and query strings.',
  },
  zh: {
    title: 'URL 编码/解码器：在线编码和解码 URL 完整指南',
    description: '使用 encodeURI、encodeURIComponent 和 URLSearchParams 编码解码 URL。JavaScript、Python、Go URL 编码和查询字符串完整指南。',
  },
  fr: {
    title: 'Encodeur/Décodeur URL : Encoder et Décoder les URLs en Ligne',
    description: 'Encodez et décodez les URLs avec encodeURI, encodeURIComponent et URLSearchParams. Guide complet pour JavaScript, Python, Go.',
  },
  de: {
    title: 'URL Encoder/Decoder: URLs Online Kodieren und Dekodieren',
    description: 'Kodieren und dekodieren Sie URLs mit encodeURI, encodeURIComponent und URLSearchParams. Vollständiger Leitfaden für JavaScript, Python, Go.',
  },
  es: {
    title: 'Codificador/Decodificador URL: Codificar y Decodificar URLs Online',
    description: 'Codifica y decodifica URLs con encodeURI, encodeURIComponent y URLSearchParams. Guía completa para JavaScript, Python, Go.',
  },
  ja: {
    title: 'URLエンコーダー/デコーダー：URLをオンラインでエンコード・デコードする完全ガイド',
    description: 'encodeURI、encodeURIComponent、URLSearchParamsでURLをエンコード・デコードします。JavaScript、Python、GoのURL完全ガイド。',
  },
  ko: {
    title: 'URL 인코더/디코더: URL을 온라인으로 인코딩/디코딩하는 완전 가이드',
    description: 'encodeURI, encodeURIComponent, URLSearchParams로 URL을 인코딩/디코딩합니다. JavaScript, Python, Go 완전 가이드.',
  },
};

export default function UrlEncoderOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is URL encoding (percent encoding)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'URL encoding, also called percent encoding, is a method defined in RFC 3986 that replaces special and reserved characters in a URL with a percent sign (%) followed by two hexadecimal digits representing the character byte value. For example, a space becomes %20, an ampersand becomes %26, and a plus sign becomes %2B. This ensures URLs contain only ASCII characters that all systems can safely transmit.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between encodeURI() and encodeURIComponent()?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'encodeURI() is designed to encode a complete URL and does NOT encode characters that have special meaning in a URL structure: : / ? # [ ] @ ! $ & \' ( ) * + , ; = and ~. encodeURIComponent() is designed to encode a single URL component (like a query parameter value) and encodes everything except unreserved characters: letters (A-Z, a-z), digits (0-9), and - _ . ~. Use encodeURIComponent() for individual parameter values and encodeURI() for full URLs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between %20 and + for encoding spaces in URLs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '%20 is the correct percent-encoded representation of a space per RFC 3986 and is valid in any part of a URL (path, query, fragment). The + character represents a space only in the query string under the application/x-www-form-urlencoded encoding (used by HTML forms). Using + for a space in a URL path is incorrect and will be interpreted as a literal plus sign. Always use %20 for spaces in paths; either %20 or + may work in query strings depending on the server.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I build a query string safely in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The safest way is to use the URLSearchParams API: new URLSearchParams({ q: "hello world", page: "1" }).toString() which produces "q=hello+world&page=1". For full URL construction, use the URL constructor: const url = new URL("https://example.com"); url.searchParams.set("q", "hello world"); url.toString() which auto-encodes values correctly. Avoid manual string concatenation with + or template literals as these skip encoding.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is double encoding and how do I fix it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Double encoding happens when you call encodeURIComponent() (or any encoder) on an already-encoded string. The % sign itself gets encoded to %25, so %20 becomes %2520. The result looks like a valid URL but contains a literal %25 followed by 20 instead of a space. To fix it: decode first with decodeURIComponent(), then re-encode once. Better yet, only encode raw (decoded) values and avoid encoding values that might already be encoded.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I URL-encode in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Python\'s urllib.parse module provides several functions: urllib.parse.quote(string) encodes a string using %XX escaping (safe="/" by default, preserving slashes). urllib.parse.quote_plus(string) is like quote() but encodes spaces as + instead of %20 (for form data). urllib.parse.urlencode({"q": "hello world", "page": 1}) builds a complete query string. urllib.parse.unquote() and urllib.parse.unquote_plus() decode these back.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between url.QueryEscape and url.PathEscape in Go?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Go\'s net/url package, url.QueryEscape() encodes a string for use in query parameters and encodes spaces as + (following form-encoding rules). url.PathEscape() encodes a string for use in a URL path segment and encodes spaces as %20 (not +). Use PathEscape for path segments and QueryEscape for query parameter values. url.PathEscape also does not encode forward slashes, while QueryEscape does.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are Internationalized Domain Names (IDN) encoded in URLs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non-ASCII domain names are encoded using Punycode, an ASCII-compatible encoding defined in RFC 3492. For example, "münchen.de" becomes "xn--mnchen-3ya.de" in the wire format. Modern browsers display the Unicode form in the address bar but send the Punycode form in HTTP requests. Non-ASCII path segments and query values use UTF-8 percent encoding: each byte of the UTF-8 representation is encoded as %XX.',
        },
      },
    ],
  };

  const codeStyle: React.CSSProperties = {
    background: '#1e293b',
    color: '#e2e8f0',
    padding: '1rem',
    borderRadius: '6px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    lineHeight: '1.6',
    margin: '1rem 0',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#1e293b',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: '700',
    marginTop: '1.5rem',
    marginBottom: '0.75rem',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    marginBottom: '1rem',
    lineHeight: '1.75',
    color: '#374151',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.5rem',
    fontSize: '0.875rem',
  };

  const thStyle: React.CSSProperties = {
    background: '#f1f5f9',
    padding: '0.5rem 0.75rem',
    textAlign: 'left',
    fontWeight: '700',
    borderBottom: '2px solid #e2e8f0',
    color: '#1e293b',
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.5rem 0.75rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  const inlineCode: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#0f172a',
    padding: '0.125rem 0.375rem',
    borderRadius: '4px',
    fontSize: '0.875em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Canonical + SEO meta via page title */}
      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a', lineHeight: '1.25' }}>
        {t.title}
      </h1>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <strong style={{ color: '#0369a1', display: 'block', marginBottom: '0.5rem' }}>TL;DR</strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.75', color: '#374151' }}>
          <li>URLs can only contain ASCII characters; everything else must be percent-encoded (<code style={inlineCode}>%XX</code>).</li>
          <li>Use <code style={inlineCode}>encodeURIComponent()</code> for individual query values, <code style={inlineCode}>encodeURI()</code> for full URLs.</li>
          <li>Use <code style={inlineCode}>URLSearchParams</code> in JavaScript to build query strings safely — no manual encoding needed.</li>
          <li>In Python, use <code style={inlineCode}>urllib.parse.quote()</code> for paths and <code style={inlineCode}>urllib.parse.urlencode()</code> for query strings.</li>
          <li>In Go, use <code style={inlineCode}>url.PathEscape()</code> for path segments and <code style={inlineCode}>url.QueryEscape()</code> for query values.</li>
          <li>Never double-encode: encoding an already-encoded string turns <code style={inlineCode}>%20</code> into <code style={inlineCode}>%2520</code>.</li>
        </ul>
      </div>

      {/* Section 1: URL Encoding Basics */}
      <h2 style={h2Style}>1. URL Encoding Basics</h2>
      <p style={pStyle}>
        A URL (Uniform Resource Locator) can only contain a restricted subset of ASCII characters. Characters outside this set — including spaces, non-ASCII characters, and many punctuation marks — must be <strong>percent-encoded</strong> before they can appear in a URL. Percent encoding, defined in <strong>RFC 3986</strong>, replaces each forbidden character with a <code style={inlineCode}>%</code> sign followed by two uppercase hexadecimal digits representing the character&apos;s byte value in ASCII or UTF-8.
      </p>
      <p style={pStyle}>
        For example, a space character (ASCII 32, or 0x20) becomes <code style={inlineCode}>%20</code>. An at-sign (<code style={inlineCode}>@</code>, ASCII 64, 0x40) becomes <code style={inlineCode}>%40</code>. For non-ASCII characters, the UTF-8 bytes are percent-encoded individually: the Chinese character 你 (U+4F60, UTF-8: 0xE4 0xBD 0xA0) becomes <code style={inlineCode}>%E4%BD%A0</code>.
      </p>

      <h3 style={h3Style}>RFC 3986: Reserved vs Unreserved Characters</h3>
      <p style={pStyle}>
        RFC 3986 divides URL characters into two categories. <strong>Unreserved characters</strong> may appear in a URL without encoding. <strong>Reserved characters</strong> have a special syntactic purpose and must be encoded when used as data rather than as delimiters.
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Characters</th>
            <th style={thStyle}>Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Unreserved</td>
            <td style={tdStyle}><code style={inlineCode}>A-Z a-z 0-9 - _ . ~</code></td>
            <td style={tdStyle}>Never encode these — always safe</td>
          </tr>
          <tr>
            <td style={tdStyle}>Reserved — general delimiters</td>
            <td style={tdStyle}><code style={inlineCode}>: / ? # [ ] @</code></td>
            <td style={tdStyle}>Encode when used as data, not as URL structure</td>
          </tr>
          <tr>
            <td style={tdStyle}>Reserved — sub-delimiters</td>
            <td style={tdStyle}><code style={inlineCode}>! $ &amp; &apos; ( ) * + , ; =</code></td>
            <td style={tdStyle}>Encode when used as data in query values</td>
          </tr>
          <tr>
            <td style={tdStyle}>Other ASCII</td>
            <td style={tdStyle}>Space, <code style={inlineCode}>&quot; &lt; &gt; \ ^ ` {'{'} | {'}'}</code></td>
            <td style={tdStyle}>Always encode — never allowed in raw form</td>
          </tr>
          <tr>
            <td style={tdStyle}>Non-ASCII</td>
            <td style={tdStyle}>Any byte &gt; 0x7F</td>
            <td style={tdStyle}>UTF-8 encode, then percent-encode each byte</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>Common Encoded Characters Reference</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Character</th>
            <th style={thStyle}>Encoded</th>
            <th style={thStyle}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Space', '%20', 'In query strings, also encoded as + (form encoding)'],
            ['+', '%2B', 'Literal plus sign — encode or it may be decoded as space'],
            ['#', '%23', 'Fragment start — always encode in query values'],
            ['&', '%26', 'Query separator — must encode in values'],
            ['=', '%3D', 'Key-value separator — encode in keys/values'],
            ['?', '%3F', 'Query start — encode when in path'],
            ['/', '%2F', 'Path separator — encode in path segments'],
            [':', '%3A', 'Scheme/port separator — encode in query values'],
            ['@', '%40', 'User info delimiter — encode in query values'],
            ['%', '%25', 'Escape character itself — always encode'],
            ['"', '%22', 'Double quote — always encode'],
            ['<', '%3C', 'Less-than — always encode'],
            ['>', '%3E', 'Greater-than — always encode'],
            ['[', '%5B', 'Array notation — encode in most contexts'],
            [']', '%5D', 'Array notation — encode in most contexts'],
          ].map(([char, encoded, notes]) => (
            <tr key={encoded}>
              <td style={tdStyle}><code style={inlineCode}>{char}</code></td>
              <td style={tdStyle}><code style={inlineCode}>{encoded}</code></td>
              <td style={tdStyle}>{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 2: encodeURI vs encodeURIComponent */}
      <h2 style={h2Style}>2. encodeURI vs encodeURIComponent</h2>
      <p style={pStyle}>
        JavaScript provides two built-in encoding functions that serve different purposes. Understanding when to use each is critical for correct URL handling.
      </p>

      <h3 style={h3Style}>encodeURI() — Encode a Full URL</h3>
      <p style={pStyle}>
        <code style={inlineCode}>encodeURI()</code> is designed to encode a complete URL. It leaves untouched all characters that are valid parts of URL syntax: letters, digits, and the characters <code style={inlineCode}>; , / ? : @ &amp; = + $ - _ . ! ~ * &apos; ( ) #</code>. It only encodes characters that are never valid in a URL (spaces, non-ASCII, etc.).
      </p>

      <h3 style={h3Style}>encodeURIComponent() — Encode a URL Component</h3>
      <p style={pStyle}>
        <code style={inlineCode}>encodeURIComponent()</code> is designed to encode a single component of a URL, such as a query parameter name or value. It encodes everything except unreserved characters: <code style={inlineCode}>A-Z a-z 0-9 - _ . ~</code>. This means it also encodes <code style={inlineCode}>: / ? # [ ] @ ! $ &amp; &apos; ( ) * + , ; =</code>, which <code style={inlineCode}>encodeURI()</code> would preserve.
      </p>

      <pre style={codeStyle}><code>{`// Encoding: https://example.com?q=hello world&lang=zh

// encodeURI — preserves URL structure characters
encodeURI('https://example.com?q=hello world&lang=zh')
// → 'https://example.com?q=hello%20world&lang=zh'
// ✓ & and = are preserved (they are URL structure)
// ✓ :// is preserved

// encodeURIComponent — encodes everything including & = : /
encodeURIComponent('https://example.com?q=hello world&lang=zh')
// → 'https%3A%2F%2Fexample.com%3Fq%3Dhello%20world%26lang%3Dzh'
// The entire URL is treated as a value — not suitable for use as a URL

// Correct pattern: use encodeURIComponent on individual values
const base = 'https://example.com';
const query = '?q=' + encodeURIComponent('hello world') + '&lang=' + encodeURIComponent('zh');
// → 'https://example.com?q=hello%20world&lang=zh'

// Even better: use URLSearchParams (see Section 4)
const params = new URLSearchParams({ q: 'hello world', lang: 'zh' });
const url = base + '?' + params.toString();
// → 'https://example.com?q=hello+world&lang=zh'`}</code></pre>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Function</th>
            <th style={thStyle}>Use case</th>
            <th style={thStyle}>Does NOT encode</th>
            <th style={thStyle}>Encodes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><code style={inlineCode}>encodeURI()</code></td>
            <td style={tdStyle}>Full URL</td>
            <td style={tdStyle}><code style={inlineCode}>A-Z a-z 0-9 ; , / ? : @ &amp; = + $ - _ . ! ~ * &apos; ( ) #</code></td>
            <td style={tdStyle}>Spaces, non-ASCII, <code style={inlineCode}>&quot; &lt; &gt; {'{'} | {'}'} \ ^ ` </code></td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={inlineCode}>encodeURIComponent()</code></td>
            <td style={tdStyle}>Single component (query value, path segment)</td>
            <td style={tdStyle}><code style={inlineCode}>A-Z a-z 0-9 - _ . ~</code></td>
            <td style={tdStyle}>Everything else, including <code style={inlineCode}>: / ? # &amp; = + @ , ;</code></td>
          </tr>
        </tbody>
      </table>

      {/* Section 3: decodeURI vs decodeURIComponent */}
      <h2 style={h2Style}>3. decodeURI vs decodeURIComponent</h2>
      <p style={pStyle}>
        Each encoding function has a matching decode function. The rule is symmetric: decode with the same function you used to encode.
      </p>

      <pre style={codeStyle}><code>{`// decodeURI — decodes only sequences that encodeURI would have encoded
decodeURI('https://example.com?q=hello%20world')
// → 'https://example.com?q=hello world'

// decodeURIComponent — decodes all percent-encoded sequences
decodeURIComponent('hello%20world%26lang%3Dzh')
// → 'hello world&lang=zh'

// Pitfall: using decodeURIComponent on a full URL
// will decode structural characters like %2F (/) which can break the URL
decodeURIComponent('https%3A%2F%2Fexample.com%2Fpath')
// → 'https://example.com/path'  ← technically correct here, but risky

// Double-encoding pitfall
const value = 'hello%20world'; // already encoded
encodeURIComponent(value)
// → 'hello%2520world'  ← %25 is encoded %, giving %2520 instead of %20

// Fix: always encode raw (decoded) values
const rawValue = 'hello world'; // raw, not yet encoded
encodeURIComponent(rawValue)
// → 'hello%20world'  ← correct

// If you receive an encoded value and need to re-encode it:
const incoming = 'hello%20world';
const reEncoded = encodeURIComponent(decodeURIComponent(incoming));
// → 'hello%20world'  ← idempotent`}</code></pre>

      <p style={pStyle}>
        The <strong>double-encoding pitfall</strong> is one of the most common URL bugs. When you see <code style={inlineCode}>%2520</code> in a URL, it almost always means a value was encoded twice. The server will decode it to <code style={inlineCode}>%20</code> instead of a space.
      </p>

      {/* Section 4: JavaScript URL and URLSearchParams */}
      <h2 style={h2Style}>4. JavaScript — URL and URLSearchParams</h2>
      <p style={pStyle}>
        Modern JavaScript provides the <code style={inlineCode}>URL</code> constructor and <code style={inlineCode}>URLSearchParams</code> API, which handle encoding automatically and are the preferred approach for URL manipulation.
      </p>

      <h3 style={h3Style}>The URL Constructor</h3>
      <pre style={codeStyle}><code>{`// URL constructor auto-encodes when you set properties
const url = new URL('https://example.com');
url.pathname = '/search results'; // has a space
console.log(url.pathname); // → '/search%20results'  (auto-encoded)
console.log(url.href);     // → 'https://example.com/search%20results'

// Parsing an existing URL
const parsed = new URL('https://example.com?q=hello%20world&page=2');
console.log(parsed.searchParams.get('q')); // → 'hello world'  (auto-decoded!)
console.log(parsed.hostname);  // → 'example.com'
console.log(parsed.pathname);  // → '/'
console.log(parsed.search);    // → '?q=hello%20world&page=2'  (encoded form)

// URL.canParse() — safe check without try/catch (modern browsers/Node 19+)
URL.canParse('https://example.com'); // → true
URL.canParse('not a url');           // → false`}</code></pre>

      <h3 style={h3Style}>URLSearchParams — Building Query Strings</h3>
      <pre style={codeStyle}><code>{`// Create from an object
const params = new URLSearchParams({ q: 'hello world', page: '1', lang: 'zh' });
console.log(params.toString());
// → 'q=hello+world&page=1&lang=zh'
// Note: URLSearchParams uses + for spaces (form encoding), not %20

// Append, set, delete
params.append('tag', 'javascript');
params.append('tag', 'webdev');  // supports multiple values for same key
params.set('page', '2');         // overwrites existing
params.delete('lang');
console.log(params.toString());
// → 'q=hello+world&page=2&tag=javascript&tag=webdev'

// Iterate
for (const [key, value] of params) {
  console.log(key, '=', value);
}

// Get all values for a key
params.getAll('tag'); // → ['javascript', 'webdev']

// Attach to a URL
const url = new URL('https://example.com/search');
url.search = params.toString();
console.log(url.href);
// → 'https://example.com/search?q=hello+world&page=2&tag=javascript&tag=webdev'

// Or use url.searchParams directly
const url2 = new URL('https://api.example.com/data');
url2.searchParams.set('query', 'hello world');
url2.searchParams.set('format', 'json');
console.log(url2.href);
// → 'https://api.example.com/data?query=hello+world&format=json'`}</code></pre>

      {/* Section 5: Building Query Strings */}
      <h2 style={h2Style}>5. Building Query Strings</h2>
      <p style={pStyle}>
        Building query strings correctly is critical for API calls, form submissions, and link generation. There are several approaches with important differences.
      </p>

      <h3 style={h3Style}>Manual vs URLSearchParams</h3>
      <pre style={codeStyle}><code>{`// BAD: Manual string concatenation (error-prone, no encoding)
const search = 'hello & world';
const badUrl = 'https://api.example.com?q=' + search;
// → 'https://api.example.com?q=hello & world'  ← invalid: unencoded &

// BETTER: Manual with encodeURIComponent
const betterUrl = 'https://api.example.com?q=' + encodeURIComponent(search);
// → 'https://api.example.com?q=hello%20%26%20world'  ← correct but verbose

// BEST: URLSearchParams handles encoding automatically
const url = new URL('https://api.example.com');
url.searchParams.set('q', search);
// → 'https://api.example.com?q=hello+%26+world'  ← correct, concise`}</code></pre>

      <h3 style={h3Style}>Handling Arrays in Query Strings</h3>
      <pre style={codeStyle}><code>{`// Arrays can be represented multiple ways — no single standard
const tags = ['javascript', 'webdev', 'react'];

// 1. Repeated keys (most common, supported by most frameworks)
// ?tags=javascript&tags=webdev&tags=react
const params1 = new URLSearchParams();
tags.forEach(tag => params1.append('tags', tag));
params1.toString(); // → 'tags=javascript&tags=webdev&tags=react'

// 2. Bracket notation (PHP / Laravel style)
// ?tags[]=javascript&tags[]=webdev&tags[]=react
const params2 = new URLSearchParams();
tags.forEach(tag => params2.append('tags[]', tag));
params2.toString(); // → 'tags%5B%5D=javascript&tags%5B%5D=webdev...'

// 3. Comma-separated (compact but less universal)
// ?tags=javascript,webdev,react
const params3 = new URLSearchParams({ tags: tags.join(',') });
params3.toString(); // → 'tags=javascript%2Cwebdev%2Creact'

// 4. JSON-encoded (for complex objects)
// ?filter={"tags":["javascript","webdev"]}
const params4 = new URLSearchParams({ filter: JSON.stringify({ tags }) });
params4.toString(); // → 'filter=%7B%22tags%22...%7D'`}</code></pre>

      <h3 style={h3Style}>Handling Empty and Null Values</h3>
      <pre style={codeStyle}><code>{`// Undefined and null handling
const filters = { status: 'active', category: null, page: 1, search: '' };

// Omit null/undefined, include empty strings
const params = new URLSearchParams();
Object.entries(filters).forEach(([key, value]) => {
  if (value !== null && value !== undefined) {
    params.set(key, String(value));
  }
});
params.toString(); // → 'status=active&page=1&search='`}</code></pre>

      {/* Section 6: Python — urllib.parse */}
      <h2 style={h2Style}>6. Python — urllib.parse</h2>
      <p style={pStyle}>
        Python&apos;s standard library <code style={inlineCode}>urllib.parse</code> module provides comprehensive URL encoding and parsing utilities. No third-party libraries are needed for basic URL work.
      </p>

      <pre style={codeStyle}><code>{`from urllib.parse import (
    quote, quote_plus, unquote, unquote_plus,
    urlencode, urlparse, parse_qs, parse_qsl, urljoin
)

# --- Encoding ---

# quote(): percent-encode, safe="/" by default (preserves slashes)
quote('hello world/path')           # → 'hello%20world/path'
quote('hello world/path', safe='')  # → 'hello%20world%2Fpath'  (encode slashes too)
quote('café')                       # → 'caf%C3%A9'  (UTF-8 bytes)

# quote_plus(): like quote(), but spaces become + (for form/query data)
quote_plus('hello world&more')      # → 'hello+world%26more'
quote_plus('hello world', safe='')  # → 'hello+world'

# --- Decoding ---
unquote('hello%20world')            # → 'hello world'
unquote_plus('hello+world%26more')  # → 'hello world&more'

# --- Building query strings ---
params = {'q': 'hello world', 'page': 1, 'tag': ['python', 'webdev']}

# Single values
urlencode({'q': 'hello world', 'page': 1})
# → 'q=hello+world&page=1'

# Multiple values for same key (doseq=True)
urlencode({'tag': ['python', 'webdev']}, doseq=True)
# → 'tag=python&tag=webdev'

# --- Parsing URLs ---
result = urlparse('https://user:pass@example.com:8080/path?q=hello&page=2#section')
result.scheme    # → 'https'
result.netloc    # → 'user:pass@example.com:8080'
result.hostname  # → 'example.com'
result.port      # → 8080
result.path      # → '/path'
result.query     # → 'q=hello&page=2'
result.fragment  # → 'section'

# --- Parsing query strings ---
parse_qs('q=hello+world&page=2&tag=a&tag=b')
# → {'q': ['hello world'], 'page': ['2'], 'tag': ['a', 'b']}
# Note: parse_qs always returns lists

parse_qsl('q=hello+world&page=2')
# → [('q', 'hello world'), ('page', '2')]  (ordered list of tuples)

# --- Building full URLs ---
from urllib.parse import urlencode, urlparse, urlunparse
base = 'https://api.example.com/search'
query = urlencode({'q': 'hello world', 'limit': 10})
full_url = f'{base}?{query}'
# → 'https://api.example.com/search?q=hello+world&limit=10'`}</code></pre>

      {/* Section 7: Go — net/url */}
      <h2 style={h2Style}>7. Go — net/url</h2>
      <p style={pStyle}>
        Go&apos;s <code style={inlineCode}>net/url</code> package provides robust URL parsing and encoding. Unlike JavaScript, Go distinguishes between path escaping and query escaping with separate functions.
      </p>

      <pre style={codeStyle}><code>{`package main

import (
    "fmt"
    "net/url"
)

func main() {
    // --- Path encoding ---
    // url.PathEscape: encodes a path segment, spaces → %20
    fmt.Println(url.PathEscape("hello world"))    // → "hello%20world"
    fmt.Println(url.PathEscape("café/résumé"))    // → "caf%C3%A9%2Fr%C3%A9sum%C3%A9"
    // Note: PathEscape encodes / as %2F within a segment

    // url.PathUnescape: decodes path segments
    s, _ := url.PathUnescape("hello%20world")
    fmt.Println(s) // → "hello world"

    // --- Query encoding ---
    // url.QueryEscape: encodes for query params, spaces → +
    fmt.Println(url.QueryEscape("hello world"))   // → "hello+world"
    fmt.Println(url.QueryEscape("a&b=c"))         // → "a%26b%3Dc"

    // url.QueryUnescape: decodes query params
    s2, _ := url.QueryUnescape("hello+world%26more")
    fmt.Println(s2) // → "hello world&more"

    // --- Building URLs with url.Values ---
    v := url.Values{}
    v.Set("q", "hello world")
    v.Set("page", "1")
    v.Add("tag", "golang")
    v.Add("tag", "webdev")
    fmt.Println(v.Encode()) // → "page=1&q=hello+world&tag=golang&tag=webdev"
    // Note: keys are sorted alphabetically

    // --- Parsing URLs ---
    u, err := url.Parse("https://example.com/search?q=hello+world&page=2#top")
    if err != nil {
        panic(err)
    }
    fmt.Println(u.Scheme)               // → "https"
    fmt.Println(u.Host)                 // → "example.com"
    fmt.Println(u.Path)                 // → "/search"
    fmt.Println(u.RawQuery)             // → "q=hello+world&page=2"
    fmt.Println(u.Fragment)             // → "top"
    fmt.Println(u.Query().Get("q"))     // → "hello world"  (auto-decoded)
    fmt.Println(u.Query()["tag"])       // → []  (or all values for "tag")

    // --- Building a URL from parts ---
    base := &url.URL{
        Scheme: "https",
        Host:   "api.example.com",
        Path:   "/v1/search results",  // has a space
    }
    params := url.Values{"q": {"hello world"}, "limit": {"10"}}
    base.RawQuery = params.Encode()
    fmt.Println(base.String())
    // → "https://api.example.com/v1/search%20results?limit=10&q=hello+world"

    // --- Joining URLs ---
    ref, _ := url.Parse("../other-page")
    result := u.ResolveReference(ref)
    fmt.Println(result.String())
}`}</code></pre>

      {/* Section 8: Form Data Encoding */}
      <h2 style={h2Style}>8. Form Data Encoding</h2>
      <p style={pStyle}>
        HTML forms can submit data in different encodings depending on the <code style={inlineCode}>enctype</code> attribute. Understanding these formats is essential for building APIs and handling form submissions.
      </p>

      <h3 style={h3Style}>application/x-www-form-urlencoded</h3>
      <p style={pStyle}>
        This is the <strong>default encoding</strong> for HTML forms (when <code style={inlineCode}>method=&quot;POST&quot;</code> or <code style={inlineCode}>method=&quot;GET&quot;</code> without a file upload). Key characteristics:
      </p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.75', color: '#374151' }}>
        <li>Spaces are encoded as <code style={inlineCode}>+</code> (not <code style={inlineCode}>%20</code>)</li>
        <li>Key-value pairs separated by <code style={inlineCode}>&amp;</code></li>
        <li>Keys and values separated by <code style={inlineCode}>=</code></li>
        <li>All other special characters are percent-encoded</li>
      </ul>

      <pre style={codeStyle}><code>{`<!-- Default form encoding — application/x-www-form-urlencoded -->
<form method="POST" action="/search">
  <input name="q" value="hello world" />
  <input name="lang" value="zh" />
</form>
<!-- POST body: q=hello+world&lang=zh -->

<!-- For GET forms, same encoding but in the URL query string -->
<form method="GET" action="/search">
  <input name="q" value="hello world" />
</form>
<!-- URL: /search?q=hello+world -->

// Equivalent in JavaScript with fetch():
const formData = new URLSearchParams({ q: 'hello world', lang: 'zh' });
fetch('/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: formData.toString(),
  // body: 'q=hello+world&lang=zh'
});`}</code></pre>

      <h3 style={h3Style}>multipart/form-data</h3>
      <p style={pStyle}>
        Required for file uploads (<code style={inlineCode}>{'<input type="file" />'}</code>). Each field is a separate MIME part with its own headers. Values are NOT percent-encoded; the binary data is transmitted as-is within boundaries.
      </p>

      <h3 style={h3Style}>application/json</h3>
      <p style={pStyle}>
        Modern REST APIs commonly accept JSON bodies instead of form encoding. JSON handles all character escaping internally via backslash escaping, not percent-encoding.
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Encoding type</th>
            <th style={thStyle}>Space encoded as</th>
            <th style={thStyle}>File upload</th>
            <th style={thStyle}>Best for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><code style={inlineCode}>application/x-www-form-urlencoded</code></td>
            <td style={tdStyle}><code style={inlineCode}>+</code></td>
            <td style={tdStyle}>No</td>
            <td style={tdStyle}>Simple HTML forms, small data</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={inlineCode}>multipart/form-data</code></td>
            <td style={tdStyle}>Literal (in boundaries)</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>File uploads, binary data</td>
          </tr>
          <tr>
            <td style={tdStyle}><code style={inlineCode}>application/json</code></td>
            <td style={tdStyle}>Literal (in JSON strings)</td>
            <td style={tdStyle}>No (use base64)</td>
            <td style={tdStyle}>REST APIs, structured data</td>
          </tr>
        </tbody>
      </table>

      {/* Section 9: URL Parts Reference */}
      <h2 style={h2Style}>9. URL Parts Reference</h2>
      <p style={pStyle}>
        A URL has several distinct parts, each with different encoding rules. Understanding which part needs which encoding prevents common mistakes.
      </p>

      <pre style={codeStyle}><code>{`// Full URL anatomy:
// https://user:password@example.com:8080/path/to/page?key=value&k2=v2#section
//   |       |      |         |       |   |              |                  |
//  scheme  user  password  host    port path           query            fragment

// In JavaScript, the URL object exposes each part:
const url = new URL('https://user:pass@example.com:8080/path/to?k=v#frag');
url.protocol   // → 'https:'
url.username   // → 'user'   (decoded)
url.password   // → 'pass'   (decoded)
url.hostname   // → 'example.com'
url.port       // → '8080'
url.host       // → 'example.com:8080'
url.pathname   // → '/path/to'  (decoded)
url.search     // → '?k=v'      (encoded, includes ?)
url.searchParams.get('k')  // → 'v'  (decoded)
url.hash       // → '#frag'     (encoded, includes #)
url.href       // → full URL string (encoded)`}</code></pre>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>URL Part</th>
            <th style={thStyle}>Example</th>
            <th style={thStyle}>Encoding rule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Scheme</td>
            <td style={tdStyle}><code style={inlineCode}>https</code></td>
            <td style={tdStyle}>Always lowercase ASCII letters, digits, <code style={inlineCode}>+ - .</code> — no encoding needed</td>
          </tr>
          <tr>
            <td style={tdStyle}>Username / Password</td>
            <td style={tdStyle}><code style={inlineCode}>user:pass</code></td>
            <td style={tdStyle}>Encode with <code style={inlineCode}>encodeURIComponent()</code>; avoid using in URLs</td>
          </tr>
          <tr>
            <td style={tdStyle}>Host (ASCII)</td>
            <td style={tdStyle}><code style={inlineCode}>example.com</code></td>
            <td style={tdStyle}>No encoding; use Punycode for non-ASCII</td>
          </tr>
          <tr>
            <td style={tdStyle}>Port</td>
            <td style={tdStyle}><code style={inlineCode}>8080</code></td>
            <td style={tdStyle}>Digits only — no encoding</td>
          </tr>
          <tr>
            <td style={tdStyle}>Path segment</td>
            <td style={tdStyle}><code style={inlineCode}>/path/to page/</code></td>
            <td style={tdStyle}>Encode each segment with <code style={inlineCode}>encodeURIComponent()</code> or <code style={inlineCode}>url.PathEscape()</code>; do NOT encode the <code style={inlineCode}>/</code> separators</td>
          </tr>
          <tr>
            <td style={tdStyle}>Query key/value</td>
            <td style={tdStyle}><code style={inlineCode}>?q=hello world</code></td>
            <td style={tdStyle}>Encode with <code style={inlineCode}>encodeURIComponent()</code> or <code style={inlineCode}>URLSearchParams</code></td>
          </tr>
          <tr>
            <td style={tdStyle}>Fragment</td>
            <td style={tdStyle}><code style={inlineCode}>#section id</code></td>
            <td style={tdStyle}>Encode with <code style={inlineCode}>encodeURIComponent()</code>; never sent to server</td>
          </tr>
        </tbody>
      </table>

      {/* Section 10: Internationalized URLs (IDN) */}
      <h2 style={h2Style}>10. Internationalized URLs (IDN)</h2>
      <p style={pStyle}>
        The original URL specification only allowed ASCII characters. As the internet became global, two standards emerged to handle non-ASCII in URLs: <strong>Punycode</strong> for domain names and <strong>percent-encoding of UTF-8 bytes</strong> for paths and queries.
      </p>

      <h3 style={h3Style}>Punycode for Non-ASCII Domains</h3>
      <p style={pStyle}>
        Internationalized domain names (IDN) use Punycode encoding (RFC 3492) to represent Unicode characters using ASCII-compatible encoding (ACE). The encoded domain starts with the prefix <code style={inlineCode}>xn--</code>.
      </p>

      <pre style={codeStyle}><code>{`// Punycode examples:
// münchen.de  →  xn--mnchen-3ya.de
// 日本語.jp    →  xn--wgv71a309e.jp
// مثال.إختبار →  xn--mgbh0fb.xn--kgbechtv

// In the browser: you type münchen.de, the browser sends xn--mnchen-3ya.de
// The browser displays the Unicode form in the address bar for readability

// JavaScript — URL API handles IDN automatically
const url = new URL('https://münchen.de/path');
console.log(url.hostname);   // → 'xn--mnchen-3ya.de'  (wire format)
console.log(url.host);       // → 'xn--mnchen-3ya.de'
console.log(url.href);       // → 'https://xn--mnchen-3ya.de/path'

// Node.js — check if URL is parseable
URL.canParse('https://münchen.de');  // → true (Node 19+)

// Python — encode IDN domains
import encodings.idna
'münchen'.encode('idna').decode('ascii')  # → 'xn--mnchen-3ya'`}</code></pre>

      <h3 style={h3Style}>Unicode Path Segments</h3>
      <p style={pStyle}>
        Unlike domains, non-ASCII path segments and query values use UTF-8 percent-encoding. Each byte of the UTF-8 encoding is represented as <code style={inlineCode}>%XX</code>.
      </p>

      <pre style={codeStyle}><code>{`// Unicode in paths and queries uses UTF-8 percent-encoding
// 'résumé' in UTF-8:
//   r  →  72   →  r
//   é  →  0xC3 0xA9  →  %C3%A9
//   s  →  73   →  s
//   u  →  75   →  u
//   m  →  6D   →  m
//   é  →  0xC3 0xA9  →  %C3%A9

encodeURIComponent('résumé')  // → 'r%C3%A9sum%C3%A9'
encodeURIComponent('你好世界') // → '%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C'

// Modern browsers display the decoded form in address bar
// Wire format: GET /%E4%BD%A0%E5%A5%BD HTTP/1.1
// Display:     example.com/你好

// Python equivalent
from urllib.parse import quote
quote('résumé')   # → 'r%C3%A9sum%C3%A9'
quote('你好世界')  # → '%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C'`}</code></pre>

      {/* Section 11: API Design Best Practices */}
      <h2 style={h2Style}>11. API Design — URL Encoding Best Practices</h2>
      <p style={pStyle}>
        These practices prevent encoding bugs in production systems.
      </p>

      <h3 style={h3Style}>Always Use URLSearchParams Over Manual Concatenation</h3>
      <pre style={codeStyle}><code>{`// NEVER do this:
const query = '?search=' + userInput + '&page=' + page;
// If userInput = "cats & dogs", the URL breaks

// ALWAYS do this:
const params = new URLSearchParams({ search: userInput, page: String(page) });
const query = '?' + params.toString();
// userInput = "cats & dogs" → ?search=cats+%26+dogs&page=1  ✓`}</code></pre>

      <h3 style={h3Style}>Log Decoded URLs for Readability</h3>
      <pre style={codeStyle}><code>{`// For logging, decode the URL for human readability
const rawUrl = req.url; // may contain %20, %26, etc.
const displayUrl = decodeURIComponent(rawUrl);
console.log('Request:', displayUrl); // shows readable form`}</code></pre>

      <h3 style={h3Style}>Store Decoded Values in Database</h3>
      <pre style={codeStyle}><code>{`// Decode URL parameters before storing in DB
// The DB should store the actual value, not the encoded form
app.get('/search', (req, res) => {
  // req.query.q is already decoded by Express
  const query = req.query.q; // 'hello world', not 'hello%20world'
  db.save({ searchTerm: query }); // store decoded
});`}</code></pre>

      <h3 style={h3Style}>Validate Before Decoding</h3>
      <pre style={codeStyle}><code>{`// Always validate that the encoded string is valid before decoding
function safeDecodeURIComponent(str: string): string | null {
  try {
    return decodeURIComponent(str);
  } catch {
    // URIError: malformed percent encoding
    return null;
  }
}

safeDecodeURIComponent('hello%20world'); // → 'hello world'
safeDecodeURIComponent('hello%ZZworld'); // → null (invalid hex)
safeDecodeURIComponent('%E4%BD');        // → null (incomplete UTF-8)`}</code></pre>

      <h3 style={h3Style}>Never Trust Decoded User Input Without Sanitization</h3>
      <pre style={codeStyle}><code>{`// A user can encode a malicious payload:
// ?redirect=%2F%2Fevil.com%2Fphish  (decoded: //evil.com/phish)

// Always validate after decoding
function safeRedirect(url: string): string {
  const decoded = decodeURIComponent(url);
  // Only allow relative URLs (start with /) or known domains
  if (decoded.startsWith('/') && !decoded.startsWith('//')) {
    return decoded;
  }
  return '/'; // fallback to home
}`}</code></pre>

      {/* Section 12: Common Mistakes */}
      <h2 style={h2Style}>12. Common Mistakes</h2>

      <h3 style={h3Style}>Double Encoding (%2520)</h3>
      <pre style={codeStyle}><code>{`// Problem: encoding an already-encoded string
const value = encodeURIComponent('hello world'); // → 'hello%20world'
const doubled = encodeURIComponent(value);       // → 'hello%2520world'
// %25 is the encoding of %, so %20 → %2520

// Fix: only encode raw (decoded) values
const raw = 'hello world';
const safe = encodeURIComponent(raw); // → 'hello%20world'  ✓`}</code></pre>

      <h3 style={h3Style}>Using + for Space in Path (Only Valid in Query)</h3>
      <pre style={codeStyle}><code>{`// + means a literal plus sign in a URL path
// It only means space in application/x-www-form-urlencoded query strings

// WRONG: /search+results  (might be interpreted as "/search+results" literally)
// RIGHT: /search%20results  ✓

// In query string, both are usually accepted:
// /search?q=hello+world  ✓  (form encoding)
// /search?q=hello%20world  ✓  (percent encoding)`}</code></pre>

      <h3 style={h3Style}>Encoding Slashes in Paths</h3>
      <pre style={codeStyle}><code>{`// Never encode the / separators in a URL path
// WRONG:
'https://example.com' + encodeURIComponent('/path/to/page')
// → 'https://example.com%2Fpath%2Fto%2Fpage'  — browser may reject this

// RIGHT: encode each segment individually
const segments = ['path', 'to', 'my page'];
const path = '/' + segments.map(encodeURIComponent).join('/');
// → '/path/to/my%20page'  ✓`}</code></pre>

      <h3 style={h3Style}>Forgetting to Decode Before Display</h3>
      <pre style={codeStyle}><code>{`// Never display raw encoded URLs to users
const url = '/search?q=hello%20world%20%26%20more';

// BAD:
document.title = 'Search: ' + new URL(url, location.origin).searchParams.get('q');
// If not decoded: "Search: hello%20world%20%26%20more"

// GOOD:
const q = new URL(url, location.origin).searchParams.get('q');
// URLSearchParams auto-decodes: q = 'hello world & more'
document.title = 'Search: ' + q; // ✓`}</code></pre>

      <h3 style={h3Style}>XSS via URL Injection</h3>
      <pre style={codeStyle}><code>{`// URL parameters can contain XSS payloads after decoding
// ?name=<script>alert(1)</script>
// Decoded: name = '<script>alert(1)</script>'

// NEVER insert decoded URL params directly into HTML:
// document.innerHTML = '<p>Hello ' + req.query.name + '</p>';  // XSS!

// ALWAYS escape HTML entities:
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
// Or use a trusted HTML sanitizer library`}</code></pre>

      {/* FAQ Section */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        {[
          {
            q: 'What is URL encoding (percent encoding)?',
            a: 'URL encoding (percent encoding) replaces characters that cannot appear in a URL with a % sign followed by two hexadecimal digits representing the byte value. For example, a space (byte 0x20) becomes %20. It is defined in RFC 3986 and ensures URLs only contain valid ASCII.',
          },
          {
            q: 'What is the difference between encodeURI() and encodeURIComponent()?',
            a: 'encodeURI() encodes a full URL and preserves URL structure characters like : / ? # & = + @ ,. encodeURIComponent() encodes a single URL component (a query value or path segment) and encodes everything except A-Z a-z 0-9 - _ . ~. Use encodeURIComponent() for individual parameter values.',
          },
          {
            q: 'Why do I see %2520 in my URL instead of %20?',
            a: "This is double encoding. You encoded an already-encoded string. The % in %20 got encoded to %25, producing %2520. Fix: only encode raw (not yet encoded) strings. If you receive an encoded value, decode it first with decodeURIComponent() before re-encoding.",
          },
          {
            q: 'Should I use %20 or + for spaces in URLs?',
            a: 'Use %20 in URL paths — always. In query strings, both %20 and + are usually accepted by servers, but URLSearchParams uses + (form encoding convention). In URL paths, + is treated as a literal plus sign, not a space.',
          },
          {
            q: 'How do I build a safe query string in JavaScript?',
            a: 'Use URLSearchParams: new URLSearchParams({ q: "hello world", page: "1" }).toString(). This auto-encodes all values. For URL construction, use the URL constructor: const url = new URL("https://example.com"); url.searchParams.set("q", "hello world"); url.toString().',
          },
          {
            q: 'How do I URL-encode in Python?',
            a: 'Use urllib.parse: quote("hello world") → "hello%20world" for paths; quote_plus("hello world") → "hello+world" for query strings; urlencode({"q": "hello world", "page": 1}) → "q=hello+world&page=1" for building complete query strings.',
          },
          {
            q: 'What is the difference between QueryEscape and PathEscape in Go?',
            a: 'url.QueryEscape() encodes for query params (spaces as +), while url.PathEscape() encodes for path segments (spaces as %20). Use PathEscape for URL paths and QueryEscape (or url.Values.Encode()) for query string values.',
          },
          {
            q: 'How are non-ASCII domains like münchen.de encoded?',
            a: 'Non-ASCII domains use Punycode encoding (RFC 3492). münchen.de becomes xn--mnchen-3ya.de. Browsers display the Unicode form in the address bar but send the Punycode form over the network. Non-ASCII path segments and query values use UTF-8 percent-encoding instead.',
          },
        ].map(({ q, a }) => (
          <details key={q} style={{ marginBottom: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
            <summary style={{ fontWeight: '700', cursor: 'pointer', color: '#1e293b', paddingBottom: '0.25rem' }}>
              {q}
            </summary>
            <p style={{ marginTop: '0.5rem', color: '#374151', lineHeight: '1.75', marginBottom: 0 }}>{a}</p>
          </details>
        ))}
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <strong style={{ color: '#1e293b', display: 'block', marginBottom: '0.75rem', fontSize: '1rem' }}>
          Key Takeaways
        </strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.75', color: '#374151' }}>
          <li><strong>RFC 3986 unreserved chars</strong> (<code style={inlineCode}>A-Z a-z 0-9 - _ . ~</code>) never need encoding.</li>
          <li>Use <strong><code style={inlineCode}>encodeURIComponent()</code></strong> for individual query values and path segments; use <strong><code style={inlineCode}>encodeURI()</code></strong> for complete URLs.</li>
          <li><strong><code style={inlineCode}>URLSearchParams</code></strong> is the safest way to build query strings in JavaScript — no manual encoding required.</li>
          <li>In Python, <code style={inlineCode}>urllib.parse.urlencode()</code> builds query strings; <code style={inlineCode}>urllib.parse.quote()</code> encodes path segments.</li>
          <li>In Go, <code style={inlineCode}>url.PathEscape()</code> for paths (space → <code style={inlineCode}>%20</code>), <code style={inlineCode}>url.QueryEscape()</code> for queries (space → <code style={inlineCode}>+</code>).</li>
          <li>Spaces in paths must be <code style={inlineCode}>%20</code>; <code style={inlineCode}>+</code> for spaces is only valid in <code style={inlineCode}>application/x-www-form-urlencoded</code> query strings.</li>
          <li><strong>Double encoding</strong> (<code style={inlineCode}>%2520</code>) happens when you encode an already-encoded string; always encode raw values.</li>
          <li>Non-ASCII domains use <strong>Punycode</strong>; non-ASCII path/query values use <strong>UTF-8 percent-encoding</strong>.</li>
          <li>Always sanitize decoded URL parameters before using them in HTML to prevent XSS.</li>
        </ul>
      </div>
    </article>
  );
}
