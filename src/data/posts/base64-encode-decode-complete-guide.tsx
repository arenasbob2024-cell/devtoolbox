'use client';

import Link from 'next/link';

export default function Base64EncodeDecodeCompleteGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters. It is used everywhere: embedding images in HTML/CSS, encoding API authentication headers, transmitting binary data in JSON, and storing secrets in Kubernetes. Base64 is <strong>not</strong> encryption and provides zero security. Use our <Link href={`/${lang}/tools/base64`}>free Base64 encoder/decoder</Link> to convert strings instantly, or check our <Link href={`/${lang}/tools/image-base64`}>Image to Base64 converter</Link> for embedding images.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Base64 encodes binary data into a string of 64 ASCII characters (A-Z, a-z, 0-9, +, /) plus <code>=</code> for padding.</li>
          <li>Encoded output is approximately 33% larger than the original input due to the 6-bit-to-8-bit expansion.</li>
          <li>In JavaScript, use <code>btoa()</code>/<code>atob()</code> for simple ASCII strings, and <code>TextEncoder</code> + manual conversion for Unicode.</li>
          <li>In Python, use the built-in <code>base64</code> module: <code>base64.b64encode()</code> and <code>base64.b64decode()</code>.</li>
          <li>On the command line, use <code>base64</code> (macOS/Linux) or <code>openssl base64</code> for quick conversions.</li>
          <li>URL-safe Base64 replaces <code>+</code> with <code>-</code> and <code>/</code> with <code>_</code> per RFC 4648.</li>
          <li>Base64 is an encoding scheme, NOT encryption. Anyone can decode it. Never use it for security.</li>
        </ul>
      </div>

      <h2>What Is Base64 Encoding?</h2>
      <p>
        Base64 is a group of binary-to-text encoding schemes that represent binary data in a printable ASCII string format. The name comes from the fact that the encoding uses a set of <strong>64 characters</strong> to represent arbitrary binary sequences. These 64 characters are the uppercase letters A through Z, the lowercase letters a through z, the digits 0 through 9, and two additional symbols: <code>+</code> (plus) and <code>/</code> (slash). A 65th character, <code>=</code> (equals), is used as a padding suffix.
      </p>
      <p>
        The primary purpose of Base64 encoding is to allow binary data to travel safely through text-based protocols and systems. Email (MIME), HTTP headers, JSON payloads, XML documents, and URL query parameters were all designed to handle text, not raw binary. When you need to embed a JPEG image inside an HTML document, send a PDF through a REST API, or store a cryptographic key in a configuration file, Base64 provides the bridge between binary and text worlds.
      </p>
      <p>
        Base64 is defined in multiple RFCs. <strong>RFC 4648</strong> is the most commonly referenced standard and defines both the standard Base64 alphabet and the URL-safe variant. <strong>RFC 2045</strong> defines MIME Base64 used in email attachments. The algorithm itself is straightforward: take three bytes of input (24 bits), split them into four 6-bit groups, and map each group to one of the 64 characters. The result is always 33% larger than the input.
      </p>

      <h2>How Base64 Works: The Algorithm Explained</h2>
      <p>
        Understanding the inner workings of Base64 helps you debug encoding issues, calculate output sizes, and choose the right variant for your use case. Here is a step-by-step breakdown of how the encoding process transforms binary data into a Base64 string.
      </p>
      <p><strong>Step 1: Convert input to binary</strong></p>
      <p>
        Each byte of input data is represented as 8 bits. For example, the ASCII string <code>Man</code> consists of three bytes: <code>M</code> = 77 (01001101), <code>a</code> = 97 (01100001), <code>n</code> = 110 (01101110).
      </p>
      <p><strong>Step 2: Concatenate all bits</strong></p>
      <p>
        Join the binary representations into a single bit stream: <code>010011010110000101101110</code> (24 bits total).
      </p>
      <p><strong>Step 3: Split into 6-bit groups</strong></p>
      <p>
        Divide the stream into groups of 6 bits each: <code>010011</code>, <code>010110</code>, <code>000101</code>, <code>101110</code>. Each 6-bit group can represent a value from 0 to 63.
      </p>
      <p><strong>Step 4: Map to Base64 characters</strong></p>
      <p>
        Use the Base64 index table to convert each 6-bit value to a character: 19 = <code>T</code>, 22 = <code>W</code>, 5 = <code>F</code>, 46 = <code>u</code>. The result is <code>TWFu</code>.
      </p>

      <h3>The Base64 Alphabet Table</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '6px 10px', textAlign: 'left' }}>Value</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '6px 10px', textAlign: 'left' }}>Char</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '6px 10px', textAlign: 'left' }}>Value</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '6px 10px', textAlign: 'left' }}>Char</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '6px 10px', textAlign: 'left' }}>Value</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '6px 10px', textAlign: 'left' }}>Char</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '6px 10px', textAlign: 'left' }}>Value</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '6px 10px', textAlign: 'left' }}>Char</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>0</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>A</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>16</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>Q</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>32</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>g</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>48</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>w</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>1</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>B</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>17</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>R</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>33</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>h</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>49</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>x</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>...</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>...</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>...</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>...</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>...</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>...</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>...</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>...</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>25</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>Z</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>51</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>z</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>62</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>+</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>63</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}><code>/</code></td>
          </tr>
        </tbody>
      </table>

      <h3>Padding with the = Character</h3>
      <p>
        Base64 processes input in blocks of 3 bytes (24 bits). When the input length is not a multiple of 3, padding is required. If there is 1 remaining byte (8 bits), the encoder adds two zero bits to make 12 bits, producing 2 Base64 characters followed by <code>==</code>. If there are 2 remaining bytes (16 bits), the encoder adds four zero bits to make 24 bits, producing 3 Base64 characters followed by <code>=</code>. This is why you often see trailing equals signs in Base64 strings.
      </p>
      <pre><code>{`Input:     "M"     → 1 byte  → 2 chars + "==" → "TQ=="
Input:     "Ma"    → 2 bytes → 3 chars + "="  → "TWE="
Input:     "Man"   → 3 bytes → 4 chars         → "TWFu"
Input:     "Many"  → 4 bytes → 6 chars + "==" → "TWFueQ=="`}</code></pre>

      <h3>Output Size Formula</h3>
      <p>
        The encoded output size can be calculated precisely. For <code>n</code> input bytes, the output length (including padding) is <code>4 * ceil(n / 3)</code> characters. This means Base64 output is always approximately <strong>33% larger</strong> than the input. For a 1 MB file, the Base64 representation will be about 1.33 MB.
      </p>

      <h2>Base64 Encode and Decode Online</h2>
      <p>
        If you need to quickly <strong>base64 encode</strong> or <strong>base64 decode</strong> a string without writing any code, use our free <Link href={`/${lang}/tools/base64`}>Base64 Online Encoder/Decoder</Link>. It runs entirely in your browser with no server-side processing, so your data stays private. Features include:
      </p>
      <ul>
        <li><strong>Instant encoding and decoding</strong> as you type</li>
        <li><strong>UTF-8 support</strong> for international characters and emoji</li>
        <li><strong>URL-safe Base64</strong> option (replaces + and / with - and _)</li>
        <li><strong>File upload</strong> support for encoding binary files</li>
        <li><strong>One-click copy</strong> to clipboard</li>
      </ul>
      <p>
        For image-specific conversions, try our <Link href={`/${lang}/tools/image-base64`}>Image to Base64 converter</Link> which generates ready-to-use data URIs for HTML <code>&lt;img&gt;</code> tags and CSS <code>background-image</code> properties.
      </p>

      <h2>Base64 in JavaScript: btoa, atob, Buffer, and TextEncoder</h2>
      <p>
        JavaScript provides several ways to encode and decode Base64, depending on whether you are working in a browser environment or Node.js. Here are the main approaches with code examples.
      </p>

      <h3>Browser: btoa() and atob()</h3>
      <p>
        The global functions <code>btoa()</code> (binary to ASCII) and <code>atob()</code> (ASCII to binary) are available in all modern browsers. They work with ASCII strings only.
      </p>
      <pre><code className="language-javascript">{`// Encode a string to Base64
const encoded = btoa("Hello, World!");
console.log(encoded); // "SGVsbG8sIFdvcmxkIQ=="

// Decode a Base64 string
const decoded = atob("SGVsbG8sIFdvcmxkIQ==");
console.log(decoded); // "Hello, World!"

// WARNING: btoa() fails with non-ASCII characters!
// btoa("Hello, \u4e16\u754c") → throws InvalidCharacterError`}</code></pre>

      <h3>Handling Unicode in the Browser</h3>
      <p>
        Since <code>btoa()</code> only handles characters in the Latin-1 range (code points 0-255), you need an extra step for Unicode strings. The standard approach uses <code>TextEncoder</code> and <code>TextDecoder</code>:
      </p>
      <pre><code className="language-javascript">{`// Encode Unicode string to Base64
function encodeBase64Unicode(str) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = '';
  bytes.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary);
}

// Decode Base64 to Unicode string
function decodeBase64Unicode(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

// Works with any Unicode:
console.log(encodeBase64Unicode("Hello, \u4e16\u754c"));
// "SGVsbG8sIOS4lueVjA=="`}</code></pre>

      <h3>Node.js: Buffer</h3>
      <p>
        In Node.js, the <code>Buffer</code> class provides the most straightforward way to handle Base64 encoding and decoding. It supports all character encodings natively.
      </p>
      <pre><code className="language-javascript">{`// Encode to Base64 in Node.js
const encoded = Buffer.from("Hello, World!").toString('base64');
console.log(encoded); // "SGVsbG8sIFdvcmxkIQ=="

// Decode from Base64 in Node.js
const decoded = Buffer.from("SGVsbG8sIFdvcmxkIQ==", 'base64').toString('utf-8');
console.log(decoded); // "Hello, World!"

// Works with Unicode out of the box
const unicodeEncoded = Buffer.from("Hello, \u4e16\u754c").toString('base64');
console.log(unicodeEncoded); // "SGVsbG8sIOS4lueVjA=="

// URL-safe Base64 in Node.js
const urlSafe = Buffer.from("Hello, World!").toString('base64url');
console.log(urlSafe); // "SGVsbG8sIFdvcmxkIQ"

// Encode a file to Base64
const fs = require('fs');
const fileBase64 = fs.readFileSync('image.png').toString('base64');
console.log(\`data:image/png;base64,\${fileBase64}\`);`}</code></pre>

      <h3>Modern Browser Alternative: Uint8Array</h3>
      <p>
        Starting in 2024, modern browsers support <code>Uint8Array.prototype.toBase64()</code> and <code>Uint8Array.fromBase64()</code> (TC39 proposal, now shipping in Chrome 128+, Firefox 133+, Safari 18.2+):
      </p>
      <pre><code className="language-javascript">{`// Modern browser API (2024+)
const bytes = new TextEncoder().encode("Hello, World!");
const base64 = bytes.toBase64();
console.log(base64); // "SGVsbG8sIFdvcmxkIQ=="

// Decode
const decoded = Uint8Array.fromBase64("SGVsbG8sIFdvcmxkIQ==");
const text = new TextDecoder().decode(decoded);
console.log(text); // "Hello, World!"

// URL-safe variant
const urlSafe = bytes.toBase64({ alphabet: "base64url" });`}</code></pre>

      <h2>Base64 in Python</h2>
      <p>
        Python includes a <code>base64</code> module in its standard library that supports multiple encoding variants. Here are the most common operations:
      </p>
      <pre><code className="language-python">{`import base64

# Encode a string to Base64
text = "Hello, World!"
encoded = base64.b64encode(text.encode('utf-8'))
print(encoded)  # b'SGVsbG8sIFdvcmxkIQ=='
print(encoded.decode('ascii'))  # "SGVsbG8sIFdvcmxkIQ=="

# Decode a Base64 string
decoded = base64.b64decode("SGVsbG8sIFdvcmxkIQ==")
print(decoded.decode('utf-8'))  # "Hello, World!"

# URL-safe Base64 encoding
url_safe = base64.urlsafe_b64encode(text.encode('utf-8'))
print(url_safe.decode('ascii'))  # "SGVsbG8sIFdvcmxkIQ=="

# URL-safe Base64 decoding
decoded_url = base64.urlsafe_b64decode(url_safe)
print(decoded_url.decode('utf-8'))  # "Hello, World!"

# Encode binary file to Base64
with open("image.png", "rb") as f:
    file_base64 = base64.b64encode(f.read()).decode('ascii')
    print(f"data:image/png;base64,{file_base64[:50]}...")

# Decode Base64 to file
with open("output.png", "wb") as f:
    f.write(base64.b64decode(file_base64))

# Encode with Unicode characters
unicode_text = "Hello, \u4e16\u754c"
unicode_encoded = base64.b64encode(unicode_text.encode('utf-8'))
print(unicode_encoded.decode('ascii'))  # "SGVsbG8sIOS4lueVjA=="`}</code></pre>

      <h3>Python base64 Module Variants</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Function</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Description</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Alphabet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>b64encode()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Standard Base64 encoding</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>A-Z, a-z, 0-9, +, /</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>urlsafe_b64encode()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>URL-safe Base64 encoding</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>A-Z, a-z, 0-9, -, _</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>b32encode()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Base32 encoding</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>A-Z, 2-7</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>b16encode()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Base16 (hex) encoding</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>0-9, A-F</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>a85encode()</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Ascii85 encoding</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>85 printable ASCII chars</td>
          </tr>
        </tbody>
      </table>

      <h2>Base64 on the Command Line (Linux/macOS)</h2>
      <p>
        The <code>base64</code> command is available by default on Linux and macOS. It is one of the fastest ways to encode and decode Base64 strings and files directly from the terminal. Check our detailed guide on <Link href={`/${lang}/blog/base64-encode-decode-command-line`}>Base64 encode/decode on the command line</Link>.
      </p>

      <h3>Encoding Strings</h3>
      <pre><code className="language-bash">{`# Encode a string (Linux)
echo -n "Hello, World!" | base64
# Output: SGVsbG8sIFdvcmxkIQ==

# Encode a string (macOS)
echo -n "Hello, World!" | base64
# Output: SGVsbG8sIFdvcmxkIQ==

# IMPORTANT: Always use -n flag with echo to avoid
# encoding a trailing newline character!

# Without -n:
echo "Hello" | base64     # SGVsbG8K (includes \\n)
# With -n:
echo -n "Hello" | base64  # SGVsbG8= (correct)`}</code></pre>

      <h3>Decoding Strings</h3>
      <pre><code className="language-bash">{`# Decode on Linux
echo "SGVsbG8sIFdvcmxkIQ==" | base64 -d
# Output: Hello, World!

# Decode on macOS
echo "SGVsbG8sIFdvcmxkIQ==" | base64 -D
# Output: Hello, World!

# Note: macOS uses -D (uppercase) while Linux uses -d (lowercase)`}</code></pre>

      <h3>Encoding and Decoding Files</h3>
      <pre><code className="language-bash">{`# Encode a file to Base64
base64 image.png > image.b64

# Decode a Base64 file back to binary
base64 -d image.b64 > image_restored.png  # Linux
base64 -D image.b64 > image_restored.png  # macOS

# Encode and pipe to clipboard (macOS)
base64 < image.png | pbcopy

# Encode from stdin using openssl
openssl base64 -in image.png -out image.b64
openssl base64 -d -in image.b64 -out image_restored.png

# Inline in a curl command (HTTP Basic Auth)
curl -H "Authorization: Basic $(echo -n 'user:pass' | base64)" \\
  https://api.example.com/data`}</code></pre>

      <h2>Base64 URL-Safe Encoding (RFC 4648)</h2>
      <p>
        Standard Base64 uses <code>+</code> and <code>/</code> characters which have special meanings in URLs. The <code>+</code> character is interpreted as a space in URL query parameters, and <code>/</code> is a path separator. <strong>URL-safe Base64</strong> (also called Base64url) solves this by replacing these characters:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Standard Base64</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>URL-Safe Base64</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>+</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>-</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>+</code> is URL-encoded as <code>%2B</code> or interpreted as space</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>/</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>_</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>/</code> is a path separator in URLs</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>=</code> (padding)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Omitted or kept</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>=</code> must be percent-encoded as <code>%3D</code></td>
          </tr>
        </tbody>
      </table>
      <p>
        URL-safe Base64 is used extensively in JWTs (JSON Web Tokens), OAuth tokens, file names, and any context where the encoded string must be URL-safe. The JWT standard specifically requires Base64url encoding without padding for all three segments (header, payload, signature).
      </p>
      <pre><code className="language-javascript">{`// JavaScript: Convert between standard and URL-safe Base64
function toBase64Url(base64) {
  return base64
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(base64url) {
  let base64 = base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  // Add padding
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return base64;
}

// Node.js native support
Buffer.from("Hello!").toString('base64url'); // "SGVsbG8h"
Buffer.from("SGVsbG8h", 'base64url').toString(); // "Hello!"`}</code></pre>

      <h2>Common Use Cases for Base64 Encoding</h2>
      <p>
        Base64 encoding appears throughout modern web development. Here are the most important use cases every developer should know:
      </p>

      <h3>1. Data URIs (Embedding Images in HTML/CSS)</h3>
      <p>
        Data URIs allow you to embed small files directly in HTML or CSS without additional HTTP requests. This is particularly useful for small icons, logos, and decorative images. Use our <Link href={`/${lang}/tools/image-base64`}>Image to Base64 converter</Link> for this.
      </p>
      <pre><code className="language-html">{`<!-- HTML: Embed image directly -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
     alt="Small icon" width="16" height="16" />

<!-- CSS: Background image -->
<style>
.icon {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxu...");
  width: 24px;
  height: 24px;
}
</style>`}</code></pre>
      <p>
        <strong>When to use data URIs:</strong> Files under 2-5 KB (the 33% size overhead is offset by eliminating an HTTP request). For larger files, traditional URLs with HTTP/2 multiplexing are more efficient.
      </p>

      <h3>2. HTTP Basic Authentication</h3>
      <p>
        The HTTP Basic authentication scheme transmits credentials as a Base64-encoded string in the <code>Authorization</code> header. The format is <code>Basic {'{base64(username:password)}'}</code>.
      </p>
      <pre><code className="language-javascript">{`// JavaScript
const credentials = btoa('admin:secretpassword');
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Basic \${credentials}\`
    // "Authorization: Basic YWRtaW46c2VjcmV0cGFzc3dvcmQ="
  }
});`}</code></pre>
      <p>
        <strong>Security warning:</strong> Base64-encoded credentials can be instantly decoded by anyone who intercepts the request. Always use HTTPS when sending Basic auth headers.
      </p>

      <h3>3. Email Attachments (MIME)</h3>
      <p>
        The MIME (Multipurpose Internet Mail Extensions) standard uses Base64 to encode binary attachments in email messages. When you attach a PDF or image to an email, your email client Base64-encodes the file and includes it in the message body with a <code>Content-Transfer-Encoding: base64</code> header.
      </p>

      <h3>4. Kubernetes Secrets</h3>
      <p>
        Kubernetes stores secret values as Base64-encoded strings in YAML manifests. This is not for security but to allow binary data in YAML (which is a text format).
      </p>
      <pre><code className="language-yaml">{`apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=       # base64("admin")
  password: cDRzc3cwcmQ=   # base64("p4ssw0rd")`}</code></pre>

      <h3>5. JSON Payloads with Binary Data</h3>
      <p>
        JSON does not support binary data natively. When APIs need to transmit images, documents, or other binary content within a JSON body, Base64 encoding is the standard approach.
      </p>
      <pre><code className="language-json">{`{
  "filename": "report.pdf",
  "contentType": "application/pdf",
  "data": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZS..."
}`}</code></pre>

      <h3>6. JWT (JSON Web Tokens)</h3>
      <p>
        JWTs consist of three Base64url-encoded parts separated by dots: <code>header.payload.signature</code>. The header and payload are JSON objects encoded with URL-safe Base64 (without padding).
      </p>
      <pre><code className="language-text">{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.    ← Base64url(header)
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpv  ← Base64url(payload)
aG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← Base64url(signature)`}</code></pre>

      <h2>Base64 Image Encoding</h2>
      <p>
        Converting images to Base64 is one of the most common encoding tasks for frontend developers. Base64-encoded images can be embedded directly in HTML, CSS, JSON APIs, and even database fields. Use our <Link href={`/${lang}/tools/image-base64`}>Image to Base64 tool</Link> to convert any image format.
      </p>
      <pre><code className="language-javascript">{`// Browser: Convert uploaded image to Base64
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result;
    // "data:image/png;base64,iVBORw0KGgo..."
    document.querySelector('img').src = base64String;
  };
  reader.readAsDataURL(file);
});

// Node.js: Read image file and create data URI
const fs = require('fs');
const imagePath = './logo.png';
const imageBuffer = fs.readFileSync(imagePath);
const mimeType = 'image/png';
const dataUri = \`data:\${mimeType};base64,\${imageBuffer.toString('base64')}\`;
console.log(dataUri);`}</code></pre>

      <h3>Image Size Comparison</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Original Size</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Base64 Size</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Overhead</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Recommendation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1 KB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1.33 KB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>+333 bytes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Inline (saves HTTP request)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>5 KB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>6.67 KB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>+1.67 KB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Borderline (consider HTTP/2)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>50 KB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>66.7 KB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>+16.7 KB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Use external URL</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1 MB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>1.33 MB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>+333 KB</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Always use external URL</td>
          </tr>
        </tbody>
      </table>

      <h2>Performance Considerations: The 33% Size Increase</h2>
      <p>
        The biggest downside of Base64 encoding is the inherent <strong>33% size increase</strong>. Every 3 bytes of input produce 4 bytes of output. This overhead has real performance implications that developers must consider:
      </p>
      <ul>
        <li><strong>Bandwidth:</strong> A 100 KB image becomes 133 KB when Base64-encoded. Over millions of requests, this adds up to significant additional bandwidth costs.</li>
        <li><strong>Parse time:</strong> Browsers must decode Base64 strings before rendering, adding CPU overhead. For large files, this can cause noticeable delays.</li>
        <li><strong>Caching:</strong> Base64 images embedded in HTML or CSS cannot be cached independently. If the image changes, the entire document cache is invalidated.</li>
        <li><strong>Memory:</strong> The entire Base64 string must be held in memory during decoding. For server-side processing of large files, this can cause memory pressure.</li>
        <li><strong>Bundle size:</strong> Base64 images in JavaScript bundles increase download and parse time for the entire application.</li>
      </ul>
      <p><strong>Rules of thumb:</strong></p>
      <ul>
        <li>Inline images smaller than 2-4 KB as data URIs (the HTTP request overhead exceeds the Base64 overhead).</li>
        <li>For images over 10 KB, use external URLs and let the browser cache them.</li>
        <li>In APIs, consider streaming binary content or using multipart uploads instead of Base64-encoded JSON.</li>
        <li>Gzip and Brotli compression partially offset the Base64 size increase in HTTP responses (Base64 compresses reasonably well).</li>
      </ul>

      <h2>Base64 vs Hex vs Binary: Encoding Comparison</h2>
      <p>
        Base64 is not the only way to represent binary data as text. Here is how it compares to hexadecimal and raw binary representations:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Property</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Base64</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Hex (Base16)</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Binary (raw)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Characters used</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>64 (A-Z, a-z, 0-9, +, /)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>16 (0-9, a-f)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>256 (all byte values)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Size overhead</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>+33%</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>+100%</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>0%</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Bits per character</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>6</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>4</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>8</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Human readable</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Not really</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes (for developers)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>URL safe</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No (Base64url variant is)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Common use</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Data URIs, JWT, email</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Hashes, colors, debugging</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>File storage, network</td>
          </tr>
        </tbody>
      </table>
      <pre><code className="language-text">{`Example: Encoding the bytes [72, 101, 108, 108, 111]  ("Hello")

Binary (raw):  48 65 6c 6c 6f  (5 bytes)
Hex string:    "48656c6c6f"     (10 characters, +100%)
Base64:        "SGVsbG8="       (8 characters, +60%)

For comparison, encoding 3 bytes [77, 97, 110] ("Man"):
Binary (raw):  4d 61 6e         (3 bytes)
Hex string:    "4d616e"         (6 characters, +100%)
Base64:        "TWFu"           (4 characters, +33%)`}</code></pre>

      <h2>Security: Base64 Is NOT Encryption</h2>
      <p>
        This is one of the most common misconceptions in software development. <strong>Base64 encoding provides absolutely zero security.</strong> It is a reversible encoding scheme, not an encryption algorithm. Anyone can decode a Base64 string instantly without any key, password, or secret.
      </p>
      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', color: '#991b1b' }}>Security Warning</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Never use Base64 to &ldquo;hide&rdquo; passwords, API keys, or sensitive data.</li>
          <li>Kubernetes Secrets are Base64-encoded, not encrypted. Anyone with access to the manifest can read the values.</li>
          <li>HTTP Basic Authentication sends Base64-encoded credentials in plain text. Without HTTPS, credentials are exposed.</li>
          <li>Base64-encoded data in localStorage, URL parameters, or cookies is fully readable by anyone.</li>
          <li>For actual security, use proper encryption (AES-256-GCM), hashing (bcrypt, Argon2), or TLS.</li>
        </ul>
      </div>
      <pre><code className="language-javascript">{`// Demonstration: Base64 is trivially reversible
const secret = btoa("my-api-key-12345");
console.log(secret);  // "bXktYXBpLWtleS0xMjM0NQ=="

// Anyone can decode it:
console.log(atob("bXktYXBpLWtleS0xMjM0NQ=="));
// "my-api-key-12345"  ← Zero security!

// For actual encryption, use the Web Crypto API:
async function encryptData(data, key) {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(data)
  );
  return { iv, encrypted };
}`}</code></pre>

      <h2>Base64 in Different Programming Languages</h2>
      <p>
        Beyond JavaScript and Python, here is how to encode and decode Base64 in other popular languages:
      </p>

      <h3>Java</h3>
      <pre><code className="language-java">{`import java.util.Base64;

// Encode
String encoded = Base64.getEncoder()
    .encodeToString("Hello, World!".getBytes("UTF-8"));
// "SGVsbG8sIFdvcmxkIQ=="

// Decode
byte[] decoded = Base64.getDecoder().decode(encoded);
String text = new String(decoded, "UTF-8");
// "Hello, World!"

// URL-safe
String urlSafe = Base64.getUrlEncoder()
    .withoutPadding()
    .encodeToString("Hello, World!".getBytes("UTF-8"));`}</code></pre>

      <h3>Go</h3>
      <pre><code className="language-go">{`package main

import (
    "encoding/base64"
    "fmt"
)

func main() {
    // Encode
    encoded := base64.StdEncoding.EncodeToString(
        []byte("Hello, World!"))
    fmt.Println(encoded) // "SGVsbG8sIFdvcmxkIQ=="

    // Decode
    decoded, _ := base64.StdEncoding.DecodeString(encoded)
    fmt.Println(string(decoded)) // "Hello, World!"

    // URL-safe
    urlSafe := base64.URLEncoding.EncodeToString(
        []byte("Hello, World!"))
    fmt.Println(urlSafe)
}`}</code></pre>

      <h3>PHP</h3>
      <pre><code className="language-php">{`<?php
// Encode
$encoded = base64_encode("Hello, World!");
echo $encoded; // "SGVsbG8sIFdvcmxkIQ=="

// Decode
$decoded = base64_decode($encoded);
echo $decoded; // "Hello, World!"

// Validate before decoding
if (base64_decode($input, true) !== false) {
    echo "Valid Base64";
}`}</code></pre>

      <h3>C# / .NET</h3>
      <pre><code className="language-csharp">{`using System;
using System.Text;

// Encode
byte[] bytes = Encoding.UTF8.GetBytes("Hello, World!");
string encoded = Convert.ToBase64String(bytes);
// "SGVsbG8sIFdvcmxkIQ=="

// Decode
byte[] decoded = Convert.FromBase64String(encoded);
string text = Encoding.UTF8.GetString(decoded);
// "Hello, World!"`}</code></pre>

      <h3>Ruby</h3>
      <pre><code className="language-ruby">{`require 'base64'

# Encode (strict = no line breaks)
encoded = Base64.strict_encode64("Hello, World!")
# "SGVsbG8sIFdvcmxkIQ=="

# Decode
decoded = Base64.decode64(encoded)
# "Hello, World!"

# URL-safe
url_safe = Base64.urlsafe_encode64("Hello, World!")
decoded_url = Base64.urlsafe_decode64(url_safe)`}</code></pre>

      <h2>Troubleshooting Common Base64 Issues</h2>
      <p>
        When working with Base64, developers frequently encounter these problems:
      </p>

      <h3>1. Invalid Character Errors</h3>
      <p>
        The most common cause is whitespace or line breaks in the encoded string. MIME Base64 inserts a newline every 76 characters, but standard decoders may not handle this. Solution: strip all whitespace before decoding.
      </p>
      <pre><code className="language-javascript">{`// Fix: Remove whitespace before decoding
const cleanBase64 = dirtyBase64.replace(/\\s/g, '');
const decoded = atob(cleanBase64);`}</code></pre>

      <h3>2. Unicode/UTF-8 Encoding Errors</h3>
      <p>
        Using <code>btoa()</code> with non-ASCII characters throws <code>InvalidCharacterError</code>. Always encode the string to UTF-8 bytes first (see the Unicode section above).
      </p>

      <h3>3. Missing or Incorrect Padding</h3>
      <p>
        Some systems strip the trailing <code>=</code> padding. If decoding fails, try adding padding back:
      </p>
      <pre><code className="language-javascript">{`// Fix: Add missing padding
function addPadding(base64) {
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return base64;
}

const decoded = atob(addPadding("SGVsbG8"));`}</code></pre>

      <h3>4. Newline Character in Input</h3>
      <p>
        Forgetting <code>-n</code> with <code>echo</code> on the command line is extremely common. <code>echo &ldquo;Hello&rdquo; | base64</code> encodes <code>Hello\n</code> (with a newline), giving a different result than <code>echo -n &ldquo;Hello&rdquo; | base64</code>.
      </p>

      <h2>Frequently Asked Questions</h2>

      <div itemScope itemType="https://schema.org/FAQPage">
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is Base64 encoding used for?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Base64 encoding converts binary data into a text-safe format using 64 ASCII characters. Common uses include embedding images in HTML/CSS as data URIs, encoding email attachments (MIME), transmitting binary data in JSON APIs, encoding HTTP Basic authentication credentials, storing secrets in Kubernetes manifests, and encoding JWT token segments. It allows binary content to pass safely through text-only channels.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">How do I encode a string to Base64 in JavaScript?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              In the browser, use <code>btoa()</code> for ASCII strings: <code>btoa(&ldquo;Hello&rdquo;)</code> returns <code>&ldquo;SGVsbG8=&rdquo;</code>. For Unicode strings, first encode to UTF-8 bytes using <code>TextEncoder</code>, then convert to Base64. In Node.js, use <code>Buffer.from(&ldquo;Hello&rdquo;).toString(&lsquo;base64&rsquo;)</code> which handles all character encodings natively.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">How do I decode Base64 in JavaScript?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              In the browser, use <code>atob()</code>: <code>atob(&ldquo;SGVsbG8=&rdquo;)</code> returns <code>&ldquo;Hello&rdquo;</code>. For UTF-8 content, decode with <code>atob()</code> first, then use <code>TextDecoder</code> to handle multi-byte characters. In Node.js, use <code>Buffer.from(&ldquo;SGVsbG8=&rdquo;, &lsquo;base64&rsquo;).toString(&lsquo;utf-8&rsquo;)</code>.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Is Base64 encryption?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              No, Base64 is absolutely not encryption. It is a reversible encoding scheme that anyone can decode instantly without any key or password. Never use Base64 to protect passwords, API keys, or sensitive information. For actual security, use proper encryption algorithms like AES-256, or hashing algorithms like bcrypt or Argon2.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Why is Base64 output 33% larger than the input?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Base64 works by converting every 3 bytes (24 bits) of input into 4 characters (32 bits) of output. Each output character represents only 6 bits of data but takes up 8 bits of storage. This 6-to-8 bit expansion means the output is always 4/3 (approximately 1.33) times the size of the input, resulting in a 33% size increase. With padding, the actual overhead can be slightly higher for small inputs.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is the difference between Base64 and Base64url?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Standard Base64 uses the characters <code>+</code> and <code>/</code> which have special meanings in URLs (plus becomes a space, slash is a path separator). Base64url (RFC 4648) replaces <code>+</code> with <code>-</code> and <code>/</code> with <code>_</code>, and typically omits the <code>=</code> padding. Base64url is used in JWTs, OAuth tokens, and any context where the encoded string appears in a URL.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">How do I encode a file to Base64 on the command line?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              On Linux, use <code>base64 filename.ext</code> to encode or <code>base64 -d encoded.txt</code> to decode. On macOS, the syntax is the same for encoding but use <code>base64 -D</code> (uppercase D) to decode. You can also pipe data: <code>echo -n &ldquo;text&rdquo; | base64</code>. Always use <code>-n</code> with echo to avoid encoding a trailing newline.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">How do I encode Base64 in Python?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Use Python&rsquo;s built-in <code>base64</code> module: <code>import base64; base64.b64encode(b&ldquo;Hello&rdquo;)</code> returns <code>b&lsquo;SGVsbG8=&rsquo;</code>. For strings, encode to bytes first: <code>base64.b64encode(&ldquo;Hello&rdquo;.encode(&lsquo;utf-8&rsquo;))</code>. For URL-safe encoding, use <code>base64.urlsafe_b64encode()</code>. The decode counterparts are <code>b64decode()</code> and <code>urlsafe_b64decode()</code>.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">When should I use Base64 for images?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Use Base64 data URIs for very small images (under 2-4 KB) like icons and simple graphics, where the 33% size overhead is offset by eliminating an HTTP request. For images over 10 KB, use traditional external URLs. With HTTP/2 multiplexing, the benefit of inlining decreases since multiple resources can be fetched in parallel over a single connection.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What does the = sign at the end of Base64 mean?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              The <code>=</code> character is padding. Base64 processes input in groups of 3 bytes. When the input length is not a multiple of 3, padding is added to make the output length a multiple of 4 characters. One remaining byte produces two <code>=</code> signs, two remaining bytes produce one <code>=</code>. Some implementations (like Base64url in JWTs) omit the padding entirely.
            </p>
          </div>
        </div>
      </div>

      <h2>Summary: When to Use Base64</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Use Base64 When</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Avoid Base64 When</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Embedding small images in HTML/CSS ({'<'}4 KB)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Large files ({'>'}10 KB) where bandwidth matters</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Transmitting binary data in JSON APIs</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Trying to &ldquo;secure&rdquo; or &ldquo;encrypt&rdquo; data</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>HTTP Basic Authentication headers</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Storing large files in databases as text</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Email attachments (MIME encoding)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>High-performance streaming of binary data</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>JWT token segments</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Situations where raw binary transfer is possible</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Configuration values that may contain binary</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>As a replacement for proper compression</td>
          </tr>
        </tbody>
      </table>
      <p>
        Base64 is a fundamental tool in every developer&rsquo;s toolkit. Use our <Link href={`/${lang}/tools/base64`}>free Base64 encoder and decoder online</Link> for quick conversions, or our <Link href={`/${lang}/tools/image-base64`}>Image to Base64 tool</Link> for embedding images. Understanding when and how to use Base64 (and when not to) will help you build more efficient, more secure applications.
      </p>
    </>
  );
}
