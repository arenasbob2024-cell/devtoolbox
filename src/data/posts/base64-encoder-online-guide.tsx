'use client';

const translations = {
  en: {
    title: 'Base64 Encoder/Decoder: Encode and Decode Online — Complete Guide',
    description: 'Encode and decode Base64 online with JavaScript, Python, Go, and Node.js. Complete guide covering Base64URL, images, JWT, and common pitfalls.',
  },
  zh: {
    title: 'Base64 编码/解码器：在线编解码完整指南',
    description: '使用 JavaScript、Python、Go 在线 Base64 编解码。涵盖 Base64URL、图片嵌入、JWT 和常见陷阱的完整指南。',
  },
};

export default function Base64EncoderOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Base64 encoding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It converts every 3 bytes of input into 4 ASCII characters. The output is always 33% larger than the input.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I encode a string to Base64 in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In a browser, use btoa("your string") to encode and atob("encoded") to decode. For Unicode strings, use encodeURIComponent first: btoa(encodeURIComponent("hello 🌍")). In Node.js, use Buffer.from("your string").toString("base64").',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Base64 and Base64URL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Base64URL replaces + with - and / with _ to make the output safe for URLs and filenames. It also typically omits the = padding. Base64URL is used in JWT tokens, URL parameters, and email-safe contexts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Base64 the same as encryption?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Base64 is encoding, not encryption. Anyone can decode Base64 without a key. It provides zero security. Never use Base64 to protect sensitive data — use proper encryption like AES-256 instead.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does btoa() fail on Unicode strings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'btoa() only handles ASCII characters (code points 0-255). Characters outside this range throw "InvalidCharacterError". Fix by using encodeURIComponent(str) before btoa(), or use TextEncoder to convert to bytes first.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I encode a file to Base64 in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the built-in base64 module: import base64; with open("file.pdf", "rb") as f: encoded = base64.b64encode(f.read()).decode("utf-8"). This reads the file as bytes and encodes it.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I embed images as Base64 in HTML?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only for small images (icons, tiny logos under 5KB). Base64 increases file size by 33%, prevents browser caching of the image separately, and bloats your HTML. For larger images, use regular src URLs instead.',
        },
      },
      {
        '@type': 'Question',
        name: 'What chunk size should I use for streaming Base64 encoding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Always use chunk sizes that are multiples of 3 bytes (e.g., 3072, 6144, 57 bytes). Each group of 3 bytes becomes exactly 4 Base64 characters. Using non-multiples of 3 will produce incorrect padding in intermediate chunks.',
        },
      },
    ],
  };

  const codeBlockStyle: React.CSSProperties = {
    background: '#1e293b',
    color: '#e2e8f0',
    padding: '1rem',
    borderRadius: '6px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#1e293b',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginTop: '1.5rem',
    marginBottom: '0.75rem',
    color: '#1e293b',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.25rem',
    fontSize: '0.875rem',
  };

  const thStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    padding: '8px 12px',
    background: '#f1f5f9',
    textAlign: 'left',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    padding: '8px 12px',
    verticalAlign: 'top',
  };

  return (
    <article style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.7', color: '#374151' }}>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Canonical meta */}
      <meta name="description" content={t.description} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: '700', marginBottom: '0.5rem', fontSize: '1rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          Base64 converts 3 bytes into 4 ASCII characters using a 64-character alphabet (A-Z, a-z, 0-9, +/). Use <code>btoa()</code>/<code>atob()</code> in the browser, <code>Buffer.from()</code> in Node.js, and the built-in <code>base64</code> module in Python. Base64URL swaps <code>+</code> for <code>-</code> and <code>/</code> for <code>_</code> for URL safety. Base64 is encoding, NOT encryption — anyone can decode it.
        </p>
      </div>

      {/* Section 1: What is Base64? */}
      <h2 style={h2Style}>What Is Base64?</h2>
      <p>
        Base64 is a binary-to-text encoding scheme defined in <strong>RFC 4648</strong>. It represents arbitrary binary data using only 64 printable ASCII characters, making it safe to transmit through text-based protocols like HTTP, SMTP, and JSON. The name comes directly from the 64-character alphabet it uses.
      </p>
      <p>
        The algorithm takes <strong>3 bytes (24 bits)</strong> of input at a time and splits them into <strong>4 groups of 6 bits</strong>. Each 6-bit group (values 0–63) maps to one character in the Base64 alphabet. Since 6 bits can represent 64 distinct values, this perfectly covers the full alphabet.
      </p>

      <h3 style={h3Style}>How 3 Bytes Become 4 Characters</h3>
      <p>
        Example: encoding the string <code>"Man"</code>:
      </p>
      <ul>
        <li><code>M</code> = 77 = <code>01001101</code></li>
        <li><code>a</code> = 97 = <code>01100001</code></li>
        <li><code>n</code> = 110 = <code>01101110</code></li>
      </ul>
      <p>
        Concatenated: <code>010011010110000101101110</code> → split into 6-bit groups: <code>010011</code> (19=T), <code>010110</code> (22=W), <code>000101</code> (5=F), <code>101110</code> (46=u) → result: <strong>TWFu</strong>
      </p>

      <h3 style={h3Style}>The Base64 Alphabet</h3>
      <p>
        The standard alphabet: <code>A–Z</code> (0–25), <code>a–z</code> (26–51), <code>0–9</code> (52–61), <code>+</code> (62), <code>/</code> (63). The <code>=</code> character is used as padding when the input is not a multiple of 3 bytes.
      </p>
      <ul>
        <li>1 remaining byte → 2 Base64 chars + <code>==</code></li>
        <li>2 remaining bytes → 3 Base64 chars + <code>=</code></li>
        <li>3 bytes exactly → 4 Base64 chars, no padding</li>
      </ul>

      <h3 style={h3Style}>Base64 vs Base64URL vs Base32 vs Hex</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Format</th>
            <th style={thStyle}>Alphabet</th>
            <th style={thStyle}>URL Safe</th>
            <th style={thStyle}>Padding</th>
            <th style={thStyle}>Size Increase</th>
            <th style={thStyle}>Primary Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>Base64</strong></td>
            <td style={tdStyle}>A-Z, a-z, 0-9, +/</td>
            <td style={tdStyle}>No</td>
            <td style={tdStyle}><code>=</code></td>
            <td style={tdStyle}>~33%</td>
            <td style={tdStyle}>Email attachments, data URIs, API payloads</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Base64URL</strong></td>
            <td style={tdStyle}>A-Z, a-z, 0-9, -_</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>Optional</td>
            <td style={tdStyle}>~33%</td>
            <td style={tdStyle}>JWT tokens, URL params, filenames</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Base32</strong></td>
            <td style={tdStyle}>A-Z, 2-7</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}><code>=</code></td>
            <td style={tdStyle}>~60%</td>
            <td style={tdStyle}>TOTP secrets, case-insensitive systems</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Hex</strong></td>
            <td style={tdStyle}>0-9, a-f</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>None</td>
            <td style={tdStyle}>~100%</td>
            <td style={tdStyle}>Hashes, colors, binary inspection</td>
          </tr>
        </tbody>
      </table>

      {/* Section 2: JavaScript Browser */}
      <h2 style={h2Style}>JavaScript — Browser (btoa / atob)</h2>
      <p>
        Modern browsers provide two global functions for Base64 encoding and decoding:
      </p>
      <ul>
        <li><code>btoa(string)</code> — encodes a binary string to Base64 ("binary to ASCII")</li>
        <li><code>atob(base64)</code> — decodes a Base64 string back to binary ("ASCII to binary")</li>
      </ul>

      <h3 style={h3Style}>Basic ASCII Encoding</h3>
      <pre style={codeBlockStyle}><code>{`// Encode
const encoded = btoa('Hello, World!');
console.log(encoded); // "SGVsbG8sIFdvcmxkIQ=="

// Decode
const decoded = atob('SGVsbG8sIFdvcmxkIQ==');
console.log(decoded); // "Hello, World!"

// Encode binary string (e.g., from fetch response)
const response = await fetch('/api/data');
const arrayBuffer = await response.arrayBuffer();
const bytes = new Uint8Array(arrayBuffer);
const binaryString = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
const b64 = btoa(binaryString);`}</code></pre>

      <h3 style={h3Style}>Why btoa() Fails on Unicode</h3>
      <p>
        <code>btoa()</code> was designed for binary strings where each character has a code point between 0 and 255. Passing characters outside this range (emoji, Chinese characters, etc.) throws a <code>InvalidCharacterError</code>:
      </p>
      <pre style={codeBlockStyle}><code>{`// This throws: "InvalidCharacterError: Failed to execute 'btoa'"
btoa('Hello 🌍'); // ERROR!
btoa('中文');     // ERROR!`}</code></pre>

      <h3 style={h3Style}>Fix: Encoding Unicode with encodeURIComponent</h3>
      <pre style={codeBlockStyle}><code>{`// Encode Unicode to Base64
function encodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
    String.fromCharCode('0x' + p1)
  ));
}

// Decode Base64 to Unicode
function decodeUnicode(b64) {
  return decodeURIComponent(
    atob(b64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
}

const encoded = encodeUnicode('Hello 🌍');
console.log(encoded);               // "SGVsbG8g8J+MjQ=="
console.log(decodeUnicode(encoded)); // "Hello 🌍"`}</code></pre>

      <h3 style={h3Style}>Modern Approach: TextEncoder for Binary Data</h3>
      <pre style={codeBlockStyle}><code>{`// Encode any string using TextEncoder (handles all Unicode)
function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}

// Decode Base64 back to string using TextDecoder
function fromBase64(b64) {
  const binString = atob(b64);
  const bytes = Uint8Array.from(binString, m => m.codePointAt(0));
  return new TextDecoder().decode(bytes);
}

console.log(toBase64('Hello 🌍'));  // Properly encoded
console.log(fromBase64(toBase64('Hello 🌍'))); // "Hello 🌍"`}</code></pre>

      {/* Section 3: Node.js */}
      <h2 style={h2Style}>JavaScript — Node.js (Buffer)</h2>
      <p>
        Node.js uses the <code>Buffer</code> class for Base64 operations. This works for both text and binary data without any Unicode workarounds.
      </p>

      <h3 style={h3Style}>String Encoding and Decoding</h3>
      <pre style={codeBlockStyle}><code>{`// Encode string to Base64
const encoded = Buffer.from('Hello, World!').toString('base64');
console.log(encoded); // "SGVsbG8sIFdvcmxkIQ=="

// Decode Base64 to string
const decoded = Buffer.from('SGVsbG8sIFdvcmxkIQ==', 'base64').toString('utf8');
console.log(decoded); // "Hello, World!"

// Unicode strings work natively
const unicodeEncoded = Buffer.from('Hello 🌍').toString('base64');
const unicodeDecoded = Buffer.from(unicodeEncoded, 'base64').toString('utf8');
console.log(unicodeDecoded); // "Hello 🌍"`}</code></pre>

      <h3 style={h3Style}>URL-Safe Base64 (base64url)</h3>
      <pre style={codeBlockStyle}><code>{`// Node.js 16+ natively supports 'base64url'
const urlSafe = Buffer.from('Hello+World/Test==').toString('base64url');
console.log(urlSafe); // No +, /, or = characters

// Decode base64url
const original = Buffer.from(urlSafe, 'base64url').toString('utf8');

// Manual conversion for older Node.js versions
function toBase64url(b64) {
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function fromBase64url(b64url) {
  const pad = b64url.length % 4;
  const padded = b64url + (pad ? '='.repeat(4 - pad) : '');
  return padded.replace(/-/g, '+').replace(/_/g, '/');
}`}</code></pre>

      <h3 style={h3Style}>File Encoding with fs + Buffer</h3>
      <pre style={codeBlockStyle}><code>{`const fs = require('fs');

// Encode file to Base64
const fileBuffer = fs.readFileSync('./image.png');
const base64String = fileBuffer.toString('base64');
console.log(\`data:image/png;base64,\${base64String}\`);

// Decode Base64 back to file
const base64Data = 'iVBORw0KGgo...'; // your base64 string
const buffer = Buffer.from(base64Data, 'base64');
fs.writeFileSync('./decoded-image.png', buffer);
console.log('File saved successfully');`}</code></pre>

      {/* Section 4: Base64URL */}
      <h2 style={h2Style}>Base64URL — URL-Safe Encoding</h2>
      <p>
        Standard Base64 uses <code>+</code> and <code>/</code> which have special meanings in URLs and filenames. Base64URL (defined in RFC 4648 Section 5) solves this:
      </p>
      <ul>
        <li><code>+</code> is replaced with <code>-</code> (hyphen)</li>
        <li><code>/</code> is replaced with <code>_</code> (underscore)</li>
        <li>Padding <code>=</code> is usually omitted</li>
      </ul>

      <h3 style={h3Style}>When to Use Base64URL</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Use Case</th>
            <th style={thStyle}>Why Base64URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>JWT tokens</strong></td>
            <td style={tdStyle}>Token appears in Authorization headers and URLs without escaping</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>URL query parameters</strong></td>
            <td style={tdStyle}><code>+</code> would be interpreted as a space in some parsers</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Filenames</strong></td>
            <td style={tdStyle}><code>/</code> would create directory separators on Unix</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Email-safe tokens</strong></td>
            <td style={tdStyle}>Avoids characters that email clients might treat specially</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>Conversion Code</h3>
      <pre style={codeBlockStyle}><code>{`// Standard Base64 → Base64URL
function base64ToBase64url(b64) {
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Base64URL → Standard Base64
function base64urlToBase64(b64url) {
  const padLen = (4 - (b64url.length % 4)) % 4;
  return b64url.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padLen);
}

// Examples
const standard = 'SGVsbG8+V29ybGQv';
const urlSafe = base64ToBase64url(standard); // "SGVsbG8-V29ybGQv"
const back = base64urlToBase64(urlSafe);     // "SGVsbG8+V29ybGQv"`}</code></pre>

      {/* Section 5: Python */}
      <h2 style={h2Style}>Python — base64 Module</h2>
      <p>
        Python includes a built-in <code>base64</code> module that handles standard Base64, URL-safe Base64, Base32, and more. All functions work with <code>bytes</code> objects.
      </p>

      <h3 style={h3Style}>Standard Encoding and Decoding</h3>
      <pre style={codeBlockStyle}><code>{`import base64

# Encode bytes to Base64
data = b"Hello, World!"
encoded = base64.b64encode(data)
print(encoded)         # b'SGVsbG8sIFdvcmxkIQ=='
print(encoded.decode('utf-8'))  # String: "SGVsbG8sIFdvcmxkIQ=="

# Decode Base64 to bytes
decoded = base64.b64decode(b'SGVsbG8sIFdvcmxkIQ==')
print(decoded)          # b'Hello, World!'
print(decoded.decode('utf-8'))  # String: "Hello, World!"

# Encode a string (convert to bytes first)
text = "Hello 🌍"
encoded = base64.b64encode(text.encode('utf-8'))
decoded_text = base64.b64decode(encoded).decode('utf-8')
print(decoded_text)     # "Hello 🌍"`}</code></pre>

      <h3 style={h3Style}>URL-Safe Base64</h3>
      <pre style={codeBlockStyle}><code>{`import base64

# URL-safe encoding (replaces + with - and / with _)
data = b"Hello+World/Test"
url_safe = base64.urlsafe_b64encode(data)
print(url_safe)  # b'SGVsbG8rV29ybGQvVGVzdA=='

# URL-safe decoding
decoded = base64.urlsafe_b64decode(url_safe)
print(decoded)   # b'Hello+World/Test'

# Remove padding for JWT-style encoding
no_pad = url_safe.rstrip(b'=').decode('utf-8')
print(no_pad)    # "SGVsbG8rV29ybGQvVGVzdA"

# Add padding back before decoding
def decode_base64url(b64url):
    padded = b64url + '=' * (4 - len(b64url) % 4)
    return base64.urlsafe_b64decode(padded)`}</code></pre>

      <h3 style={h3Style}>Encoding Files in Python</h3>
      <pre style={codeBlockStyle}><code>{`import base64

# Encode a file to Base64
with open('document.pdf', 'rb') as f:
    file_data = f.read()
    encoded = base64.b64encode(file_data).decode('utf-8')
    print(f"Encoded length: {len(encoded)} chars")

# Decode and save Base64 back to file
with open('output.pdf', 'wb') as f:
    f.write(base64.b64decode(encoded))

# Encode image for data URI
with open('logo.png', 'rb') as img:
    img_data = base64.b64encode(img.read()).decode('utf-8')
    data_uri = f"data:image/png;base64,{img_data}"
    print(data_uri[:100] + '...')`}</code></pre>

      {/* Section 6: Image to Base64 */}
      <h2 style={h2Style}>Image to Base64 — Browser File API</h2>
      <p>
        Embedding images as Base64 data URIs allows them to be used inline in HTML, CSS, and JavaScript without separate HTTP requests. This is useful for small icons, email templates, and offline-capable apps.
      </p>

      <h3 style={h3Style}>Using FileReader to Convert an Uploaded Image</h3>
      <pre style={codeBlockStyle}><code>{`// HTML: <input type="file" id="imageInput" accept="image/*">
// HTML: <img id="preview" src="" alt="Preview">

document.getElementById('imageInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(event) {
    // event.target.result is "data:image/png;base64,iVBORw0..."
    const dataURL = event.target.result;

    // Display the image
    document.getElementById('preview').src = dataURL;

    // Extract just the Base64 string (without the data URI prefix)
    const base64String = dataURL.split(',')[1];
    console.log('Base64 length:', base64String.length);
    console.log('MIME type:', file.type);

    // Send to server
    fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64String, mimeType: file.type }),
    });
  };

  reader.readAsDataURL(file); // This triggers encoding
});`}</code></pre>

      <h3 style={h3Style}>Using Canvas for Image Transformation</h3>
      <pre style={codeBlockStyle}><code>{`// Convert image URL to Base64 using Canvas
function imageUrlToBase64(url) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Required for cross-origin images

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png')); // data:image/png;base64,...
    };
    img.onerror = reject;
    img.src = url;
  });
}

// Usage
const dataUrl = await imageUrlToBase64('https://example.com/logo.png');
document.querySelector('img').src = dataUrl;`}</code></pre>

      <h3 style={h3Style}>Using Inline Base64 Images in HTML and CSS</h3>
      <pre style={codeBlockStyle}><code>{`<!-- Inline in HTML img tag -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEA..." alt="1px dot">

<!-- Inline in CSS background -->
<style>
.icon {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL...");
  width: 24px;
  height: 24px;
}
</style>

<!-- SVG can also be used directly without base64 -->
<img src="data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg'><circle cx='5' cy='5' r='5'/></svg>" alt="circle">`}</code></pre>

      <h3 style={h3Style}>When to Use vs When NOT to Use Image Base64</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Scenario</th>
            <th style={thStyle}>Use Base64?</th>
            <th style={thStyle}>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Small icons (&lt;5KB)</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>Reduces HTTP requests, negligible size penalty</td>
          </tr>
          <tr>
            <td style={tdStyle}>Email template images</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>External images often blocked by email clients</td>
          </tr>
          <tr>
            <td style={tdStyle}>Offline PWA assets</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>Avoids network dependency for critical assets</td>
          </tr>
          <tr>
            <td style={tdStyle}>Large photos (&gt;10KB)</td>
            <td style={tdStyle}>No</td>
            <td style={tdStyle}>33% larger, no browser caching, slow initial load</td>
          </tr>
          <tr>
            <td style={tdStyle}>Page hero images</td>
            <td style={tdStyle}>No</td>
            <td style={tdStyle}>Blocks HTML parsing, cannot be cached separately</td>
          </tr>
          <tr>
            <td style={tdStyle}>CDN-served images</td>
            <td style={tdStyle}>No</td>
            <td style={tdStyle}>CDN caching provides better performance</td>
          </tr>
        </tbody>
      </table>

      {/* Section 7: Go */}
      <h2 style={h2Style}>Go — encoding/base64</h2>
      <p>
        Go's standard library includes the <code>encoding/base64</code> package with support for standard Base64, URL-safe Base64, and raw (no padding) variants.
      </p>

      <pre style={codeBlockStyle}><code>{`package main

import (
    "encoding/base64"
    "fmt"
)

func main() {
    input := []byte("Hello, World!")

    // Standard Base64 (with padding)
    encoded := base64.StdEncoding.EncodeToString(input)
    fmt.Println(encoded) // "SGVsbG8sIFdvcmxkIQ=="

    // Decode
    decoded, err := base64.StdEncoding.DecodeString(encoded)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(decoded)) // "Hello, World!"

    // URL-safe Base64 (with padding)
    urlEncoded := base64.URLEncoding.EncodeToString(input)
    fmt.Println(urlEncoded)

    // URL-safe Base64 WITHOUT padding (for JWT)
    rawURLEncoded := base64.RawURLEncoding.EncodeToString(input)
    fmt.Println(rawURLEncoded) // No = at the end

    // Decode raw URL-safe
    rawDecoded, _ := base64.RawURLEncoding.DecodeString(rawURLEncoded)
    fmt.Println(string(rawDecoded))

    // Standard Base64 WITHOUT padding
    rawStdEncoded := base64.RawStdEncoding.EncodeToString(input)
    fmt.Println(rawStdEncoded)
}`}</code></pre>

      <h3 style={h3Style}>Go Base64 Encoding Variants Summary</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Go Constant</th>
            <th style={thStyle}>Alphabet</th>
            <th style={thStyle}>Padding</th>
            <th style={thStyle}>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><code>base64.StdEncoding</code></td>
            <td style={tdStyle}>A-Z, a-z, 0-9, +/</td>
            <td style={tdStyle}>Yes (=)</td>
            <td style={tdStyle}>Standard MIME / file encoding</td>
          </tr>
          <tr>
            <td style={tdStyle}><code>base64.URLEncoding</code></td>
            <td style={tdStyle}>A-Z, a-z, 0-9, -_</td>
            <td style={tdStyle}>Yes (=)</td>
            <td style={tdStyle}>URL parameters</td>
          </tr>
          <tr>
            <td style={tdStyle}><code>base64.RawURLEncoding</code></td>
            <td style={tdStyle}>A-Z, a-z, 0-9, -_</td>
            <td style={tdStyle}>No</td>
            <td style={tdStyle}>JWT tokens, compact URLs</td>
          </tr>
          <tr>
            <td style={tdStyle}><code>base64.RawStdEncoding</code></td>
            <td style={tdStyle}>A-Z, a-z, 0-9, +/</td>
            <td style={tdStyle}>No</td>
            <td style={tdStyle}>Compact data transfer</td>
          </tr>
        </tbody>
      </table>

      {/* Section 8: Rust */}
      <h2 style={h2Style}>Rust — base64 Crate</h2>
      <p>
        Rust uses the <code>base64</code> crate (not in std library). Add it to your <code>Cargo.toml</code>: <code>base64 = "0.22"</code>
      </p>

      <pre style={codeBlockStyle}><code>{`use base64::{Engine as _, engine::general_purpose};

fn main() {
    let input = b"Hello, World!";

    // Standard Base64 encode
    let encoded = general_purpose::STANDARD.encode(input);
    println!("{}", encoded); // "SGVsbG8sIFdvcmxkIQ=="

    // Standard Base64 decode
    let decoded = general_purpose::STANDARD.decode(&encoded).unwrap();
    println!("{}", String::from_utf8(decoded).unwrap()); // "Hello, World!"

    // URL-safe Base64 with padding
    let url_encoded = general_purpose::URL_SAFE.encode(input);
    println!("{}", url_encoded);

    // URL-safe WITHOUT padding (for JWT)
    let jwt_encoded = general_purpose::URL_SAFE_NO_PAD.encode(input);
    println!("{}", jwt_encoded); // No = padding

    // Decode URL-safe without padding
    let jwt_decoded = general_purpose::URL_SAFE_NO_PAD.decode(&jwt_encoded).unwrap();
    println!("{}", String::from_utf8(jwt_decoded).unwrap());
}

// Custom engine example
use base64::engine::general_purpose::GeneralPurpose;
use base64::alphabet;

let custom_engine = GeneralPurpose::new(
    &alphabet::URL_SAFE,
    base64::engine::general_purpose::NO_PAD,
);
let encoded = custom_engine.encode(b"test data");`}</code></pre>

      {/* Section 9: Base64 in HTTP */}
      <h2 style={h2Style}>Base64 in HTTP — Authentication, Data URIs, MIME</h2>

      <h3 style={h3Style}>HTTP Basic Authentication</h3>
      <p>
        HTTP Basic Auth encodes credentials as Base64 in the Authorization header. Note: this is not encryption — the credentials are trivially decodable. Always use HTTPS.
      </p>
      <pre style={codeBlockStyle}><code>{`// Format: "username:password" → Base64
const username = 'admin';
const password = 'secret123';
const credentials = btoa(\`\${username}:\${password}\`);
// credentials = "YWRtaW46c2VjcmV0MTIz"

// HTTP request with Basic Auth
const response = await fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Basic \${credentials}\`,
    'Content-Type': 'application/json',
  },
});

// Server-side decoding (Node.js)
const authHeader = req.headers.authorization; // "Basic YWRtaW46c2VjcmV0MTIz"
const base64Credentials = authHeader.split(' ')[1];
const [user, pass] = Buffer.from(base64Credentials, 'base64').toString('utf8').split(':');
console.log(user, pass); // "admin" "secret123"`}</code></pre>

      <h3 style={h3Style}>CSS Data URIs</h3>
      <pre style={codeBlockStyle}><code>{`/* Inline SVG as Base64 in CSS */
.icon-home {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEwIDIwdi02aDR2Nmg1di04aDNMMTIgM0wyIDEyaDN2OHoiLz48L3N2Zz4=");
  background-size: contain;
  width: 24px;
  height: 24px;
}

/* Inline PNG as Base64 */
.logo {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...");
}

/* Font as Base64 for offline use */
@font-face {
  font-family: 'CustomFont';
  src: url("data:font/woff2;base64,d09GMgABAAA...") format('woff2');
}`}</code></pre>

      <h3 style={h3Style}>MIME Email Attachments</h3>
      <pre style={codeBlockStyle}><code>{`// Email attachment using Node.js (nodemailer)
const nodemailer = require('nodemailer');
const fs = require('fs');

const pdfBuffer = fs.readFileSync('report.pdf');
const pdfBase64 = pdfBuffer.toString('base64');

const mailOptions = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Monthly Report',
  text: 'Please find the report attached.',
  attachments: [
    {
      filename: 'report.pdf',
      content: pdfBase64,
      encoding: 'base64',
      contentType: 'application/pdf',
    },
  ],
};

// Raw MIME format (Content-Transfer-Encoding: base64)
/*
Content-Type: application/pdf; name="report.pdf"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="report.pdf"

JVBERi0xLjQKJeLjz9MKNSAwIG9iago8PAovRmlsdGVyIC9GbGF0ZURlY29kZQov...
*/`}</code></pre>

      {/* Section 10: Streaming / Large Files */}
      <h2 style={h2Style}>Streaming and Large File Encoding</h2>
      <p>
        Loading large files entirely into memory before encoding is inefficient and may crash for very large files. Use streaming approaches instead.
      </p>
      <p>
        <strong>Critical rule:</strong> Chunk sizes for streaming Base64 encoding must be multiples of 3 bytes. Each 3-byte group maps to exactly 4 Base64 characters. Using non-multiples produces incorrect padding characters in intermediate chunks.
      </p>

      <h3 style={h3Style}>Node.js Streams</h3>
      <pre style={codeBlockStyle}><code>{`const fs = require('fs');
const { Transform } = require('stream');

// Custom Base64 encoding stream
class Base64Encoder extends Transform {
  constructor() {
    super();
    this._buffer = Buffer.alloc(0);
  }

  _transform(chunk, encoding, callback) {
    // Combine with leftover bytes
    this._buffer = Buffer.concat([this._buffer, chunk]);

    // Process in multiples of 3
    const safeLength = Math.floor(this._buffer.length / 3) * 3;
    if (safeLength > 0) {
      this.push(this._buffer.slice(0, safeLength).toString('base64'));
      this._buffer = this._buffer.slice(safeLength);
    }
    callback();
  }

  _flush(callback) {
    if (this._buffer.length > 0) {
      this.push(this._buffer.toString('base64'));
    }
    callback();
  }
}

// Usage: stream file through encoder
const readStream = fs.createReadStream('large-video.mp4');
const encoder = new Base64Encoder();
const writeStream = fs.createWriteStream('large-video.b64');

readStream.pipe(encoder).pipe(writeStream);
writeStream.on('finish', () => console.log('Streaming encode complete'));`}</code></pre>

      <h3 style={h3Style}>Python Chunked Encoding</h3>
      <pre style={codeBlockStyle}><code>{`import base64

def encode_file_streaming(input_path, output_path, chunk_size=57):
    """
    Encode a large file using chunked streaming.
    chunk_size must be a multiple of 3 (57 = 3 * 19 → produces 76 char lines, MIME standard).
    """
    with open(input_path, 'rb') as infile, open(output_path, 'w') as outfile:
        while True:
            chunk = infile.read(chunk_size)
            if not chunk:
                break
            # Each 57-byte chunk produces 76 Base64 characters
            encoded_chunk = base64.b64encode(chunk).decode('utf-8')
            outfile.write(encoded_chunk + '\\n')  # MIME adds newlines

# base64.encodebytes() automatically adds newlines every 76 chars
with open('large-file.bin', 'rb') as f:
    encoded = base64.encodebytes(f.read())
    print(encoded[:100])  # b'SGVsbG8...'

# Streaming decode
def decode_file_streaming(input_path, output_path):
    with open(input_path, 'r') as infile, open(output_path, 'wb') as outfile:
        for line in infile:
            chunk = base64.b64decode(line.strip())
            outfile.write(chunk)`}</code></pre>

      {/* Section 11: Performance Comparison */}
      <h2 style={h2Style}>Performance Comparison</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Format</th>
            <th style={thStyle}>Output Size Increase</th>
            <th style={thStyle}>Encoding Speed</th>
            <th style={thStyle}>URL Safe</th>
            <th style={thStyle}>Best Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>Hex</strong></td>
            <td style={tdStyle}>+100% (2x size)</td>
            <td style={tdStyle}>Very Fast</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>Hash values, debugging binary data</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Base64</strong></td>
            <td style={tdStyle}>+33%</td>
            <td style={tdStyle}>Fast</td>
            <td style={tdStyle}>No</td>
            <td style={tdStyle}>Email attachments, data URIs, API payloads</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Base64URL</strong></td>
            <td style={tdStyle}>+33%</td>
            <td style={tdStyle}>Fast</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>JWT tokens, URL params, filenames</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Base32</strong></td>
            <td style={tdStyle}>+60%</td>
            <td style={tdStyle}>Moderate</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>TOTP secrets, human-readable codes</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Base64 vs raw binary:</strong> If your protocol supports binary data (e.g., WebSockets, HTTP/2, gRPC), always prefer raw binary over Base64 encoded text. You avoid the 33% overhead and the CPU cost of encoding/decoding.
      </p>
      <p>
        <strong>Browser performance:</strong> Native <code>btoa()</code>/<code>atob()</code> are implemented in C++ and are very fast. For data under 1MB, they are typically instantaneous. For larger data, consider a Web Worker to avoid blocking the main thread.
      </p>

      {/* Section 12: Common Mistakes */}
      <h2 style={h2Style}>Common Mistakes and How to Fix Them</h2>

      <h3 style={h3Style}>1. Using btoa() on Unicode Strings</h3>
      <pre style={codeBlockStyle}><code>{`// WRONG — throws InvalidCharacterError
const encoded = btoa("Hello 🌍");  // Error!

// CORRECT — encode URI components first
const encoded = btoa(encodeURIComponent("Hello 🌍")
  .replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode('0x' + p1)));

// OR use TextEncoder (modern approach)
const bytes = new TextEncoder().encode("Hello 🌍");
const encoded = btoa(String.fromCodePoint(...bytes));`}</code></pre>

      <h3 style={h3Style}>2. Forgetting Padding When Decoding</h3>
      <pre style={codeBlockStyle}><code>{`// Some APIs return Base64 without padding
const b64NoPad = "SGVsbG8"; // Missing ==

// WRONG
atob(b64NoPad);  // May throw or return incorrect data

// CORRECT — add padding before decoding
function safeDecode(b64) {
  const padded = b64 + '='.repeat((4 - b64.length % 4) % 4);
  return atob(padded);
}
console.log(safeDecode("SGVsbG8")); // "Hello"`}</code></pre>

      <h3 style={h3Style}>3. Treating Base64 as Encryption</h3>
      <pre style={codeBlockStyle}><code>{`// WRONG — Base64 is NOT encryption
const "secret" = btoa("password123");  // Anyone can decode this!
// btoa("password123") = "cGFzc3dvcmQxMjM=" — trivially reversible

// CORRECT — use actual encryption
const key = await crypto.subtle.generateKey(
  { name: 'AES-GCM', length: 256 },
  true,
  ['encrypt', 'decrypt']
);
const encrypted = await crypto.subtle.encrypt(
  { name: 'AES-GCM', iv: crypto.getRandomValues(new Uint8Array(12)) },
  key,
  new TextEncoder().encode("password123")
);
// Now encode the encrypted bytes as Base64 for storage/transport
const encryptedB64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));`}</code></pre>

      <h3 style={h3Style}>4. Confusing Base64URL with Standard Base64</h3>
      <pre style={codeBlockStyle}><code>{`// JWT tokens use Base64URL (- and _ instead of + and /)
const jwtPayload = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

// WRONG — trying to decode JWT part with standard atob()
atob(jwtPayload);  // May fail if it contains - or _

// CORRECT — convert Base64URL to standard Base64 first
function decodeBase64url(b64url) {
  const padded = b64url.replace(/-/g, '+').replace(/_/g, '/')
    + '='.repeat((4 - b64url.length % 4) % 4);
  return JSON.parse(atob(padded));
}

const payload = decodeBase64url(jwtPayload);
console.log(payload); // { alg: 'HS256', typ: 'JWT' }`}</code></pre>

      <h3 style={h3Style}>5. MIME Base64 Line Breaks</h3>
      <pre style={codeBlockStyle}><code>{`// MIME/email Base64 adds \\r\\n every 76 characters
// Some implementations choke on these line breaks

// Python's base64.encodebytes() adds newlines automatically
import base64
encoded_with_newlines = base64.encodebytes(b"Hello World " * 100)
# b'SGVsbG8gV29ybGQgSGVsbG8gV29ybGQg...'
# Note: each 76-char line ends with \\n

# To get clean Base64 without newlines, use b64encode
clean = base64.b64encode(b"Hello World " * 100)

# Node.js does NOT add line breaks — this is safe
Buffer.from(data).toString('base64')  // No line breaks

// If you receive MIME Base64, strip whitespace before decoding
const cleanB64 = mimeB64.replace(/[\\r\\n\\s]/g, '');
const decoded = atob(cleanB64);`}</code></pre>

      <h3 style={h3Style}>6. Using Non-Multiple-of-3 Chunk Sizes for Streaming</h3>
      <pre style={codeBlockStyle}><code>{`// WRONG — chunk size 1000 is not a multiple of 3
// This produces incorrect = padding after each chunk
const chunks = [];
for (let i = 0; i < data.length; i += 1000) {
  chunks.push(btoa(String.fromCharCode(...data.slice(i, i + 1000))));
}
// Concatenating these produces WRONG output!

// CORRECT — use multiples of 3: 3, 6, 57, 3072, etc.
const CHUNK_SIZE = 3072; // 3 * 1024
const chunks = [];
for (let i = 0; i < data.length; i += CHUNK_SIZE) {
  chunks.push(btoa(String.fromCharCode(...data.slice(i, i + CHUNK_SIZE))));
}
// Only the LAST chunk may have = padding — this is correct!`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: '700', marginBottom: '0.75rem', fontSize: '1rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li>Base64 converts 3 bytes → 4 characters using a 64-char alphabet; output is always ~33% larger than input.</li>
          <li>Browser: use <code>btoa()</code>/<code>atob()</code> for ASCII, <code>TextEncoder</code>+<code>TextDecoder</code> for Unicode strings.</li>
          <li>Node.js: <code>Buffer.from(str).toString('base64')</code> and <code>Buffer.from(b64, 'base64').toString('utf8')</code> handle all cases.</li>
          <li>Python: <code>base64.b64encode()</code> and <code>base64.b64decode()</code> work with <code>bytes</code> objects; encode strings with <code>.encode('utf-8')</code> first.</li>
          <li>Go: use <code>base64.StdEncoding</code>, <code>base64.URLEncoding</code>, or <code>base64.RawURLEncoding</code> from <code>encoding/base64</code>.</li>
          <li>Rust: use the <code>base64</code> crate with <code>general_purpose::STANDARD</code> or <code>URL_SAFE_NO_PAD</code> engines.</li>
          <li>Base64URL replaces <code>+</code>→<code>-</code> and <code>/</code>→<code>_</code> for JWT tokens and URL parameters.</li>
          <li>For streaming/large files, always use chunk sizes that are multiples of 3 bytes.</li>
          <li>Base64 is encoding, NOT encryption — never use it to protect sensitive data.</li>
          <li>Inline Base64 images are only worthwhile for assets under ~5KB; larger images lose browser caching benefits.</li>
        </ul>
      </div>
    </article>
  );
}
