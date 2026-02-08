import Link from 'next/link';

export default function Base64Uses({ lang }: { lang: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Base64 encoding the same as encryption?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Base64 is an encoding scheme, not encryption. Anyone can decode Base64 data — it provides no security. Base64 is designed for safe data transport through text-only channels, not for protecting sensitive information.' },
      },
      {
        '@type': 'Question',
        name: 'Why does Base64 increase data size by ~33%?',
        acceptedAnswer: { '@type': 'Answer', text: 'Base64 converts 3 bytes of binary data into 4 ASCII characters (6 bits per character instead of 8). This 3:4 ratio means Base64-encoded data is approximately 33% larger than the original binary data. The trade-off is universal text compatibility.' },
      },
      {
        '@type': 'Question',
        name: 'When should I NOT use Base64?',
        acceptedAnswer: { '@type': 'Answer', text: 'Avoid Base64 for large files (images over 10KB, videos, documents) as it significantly increases payload size. Also avoid it for data that will be stored long-term in databases — use binary columns (BLOB/BYTEA) instead. Base64 is best for small data that needs to travel through text-only channels.' },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p>
        Base64 is everywhere in web development, but most tutorials only explain <em>how</em> it works.
        This article focuses on the <strong>7 real-world scenarios</strong> where you&apos;ll actually use
        Base64 encoding in your daily development work, with code examples you can copy directly.
      </p>

      <p>
        <Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>
          Try our Base64 Encoder/Decoder tool &rarr;
        </Link>
      </p>

      <h2>1. Embedding Images in HTML/CSS (Data URIs)</h2>
      <p>
        Data URIs let you embed small images directly in your HTML or CSS, eliminating an HTTP request.
        This is particularly useful for icons, logos, and tiny UI elements.
      </p>
      <pre><code>{`<!-- Embed a small icon directly in HTML -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEU..." alt="icon" />

/* Embed in CSS */
.icon {
  background-image: url('data:image/svg+xml;base64,PHN2Zy...');
}`}</code></pre>
      <p><strong>When to use:</strong> Images under 10KB (icons, small logos, UI elements).</p>
      <p><strong>When NOT to use:</strong> Images over 10KB — the 33% size increase outweighs the saved HTTP request.</p>

      <pre><code>{`// Node.js: Convert image file to Base64 data URI
const fs = require('fs');
const imageBuffer = fs.readFileSync('icon.png');
const base64 = imageBuffer.toString('base64');
const dataUri = \`data:image/png;base64,\${base64}\`;
console.log(dataUri);`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>
          Convert images to Base64 with our encoder &rarr;
        </Link>
      </p>

      <h2>2. JWT Token Structure</h2>
      <p>
        JSON Web Tokens (JWT) use <strong>Base64URL encoding</strong> (a URL-safe variant) for their
        three parts: header, payload, and signature. Understanding this is essential for debugging
        authentication issues.
      </p>
      <pre><code>{`// A JWT token:
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiam9obiJ9.signature
//  ^^^^^ header ^^^^^   ^^^^^ payload ^^^^^

// Decoding the header (Base64URL → JSON):
atob('eyJhbGciOiJIUzI1NiJ9');
// → '{"alg":"HS256"}'

// Decoding the payload:
atob('eyJ1c2VyIjoiam9obiJ9');
// → '{"user":"john"}'`}</code></pre>
      <p>
        <strong>Key insight:</strong> JWT tokens are <em>not encrypted</em>. Anyone can decode the
        header and payload with a simple Base64 decode. The signature verifies integrity, not secrecy.
      </p>
      <p>
        <Link href={`/${lang}/tools/jwt-decoder`} style={{ fontWeight: 600 }}>
          Decode JWT tokens with our JWT Decoder &rarr;
        </Link>
      </p>

      <h2>3. Kubernetes Secrets</h2>
      <p>
        Kubernetes stores secret values as Base64-encoded strings in YAML manifests. This is one of
        the most common Base64 use cases in DevOps.
      </p>
      <pre><code>{`# Creating a Kubernetes Secret
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  DB_PASSWORD: c3VwZXItc2VjcmV0  # echo -n 'super-secret' | base64
  DB_USER: YWRtaW4=              # echo -n 'admin' | base64`}</code></pre>
      <pre><code>{`# Encode a value for Kubernetes secrets
echo -n 'my-password' | base64
# → bXktcGFzc3dvcmQ=

# Decode a Kubernetes secret value
echo -n 'bXktcGFzc3dvcmQ=' | base64 --decode
# → my-password

# IMPORTANT: Always use -n with echo to avoid trailing newline!`}</code></pre>
      <blockquote>
        <p>
          <strong>Security warning:</strong> Base64 in Kubernetes secrets is for encoding, not
          encryption. Use solutions like Sealed Secrets, External Secrets, or Vault for real security.
        </p>
      </blockquote>

      <h2>4. API Request/Response Payloads</h2>
      <p>
        When APIs need to transmit binary data (images, files, certificates) within JSON payloads,
        Base64 encoding is the standard approach since JSON only supports text.
      </p>
      <pre><code>{`// Uploading an image via API
const fileInput = document.getElementById('avatar');
const file = fileInput.files[0];

const reader = new FileReader();
reader.onload = async () => {
  const base64 = reader.result.split(',')[1]; // Remove data URI prefix

  await fetch('/api/upload-avatar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      data: base64,        // Base64-encoded file content
      contentType: file.type,
    }),
  });
};
reader.readAsDataURL(file);`}</code></pre>

      <h2>5. HTTP Basic Authentication</h2>
      <p>
        The HTTP Basic Authentication scheme transmits credentials as a Base64-encoded string
        in the <code>Authorization</code> header. This is still used in many APIs.
      </p>
      <pre><code>{`// Constructing Basic Auth header
const username = 'admin';
const password = 'secret123';
const credentials = btoa(\`\${username}:\${password}\`);
// → "YWRtaW46c2VjcmV0MTIz"

// Using in fetch
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Basic \${credentials}\`,
  },
});

// curl equivalent
// curl -u admin:secret123 https://api.example.com/data
// (curl Base64-encodes automatically with -u)`}</code></pre>
      <blockquote>
        <p>
          <strong>Always use HTTPS</strong> with Basic Auth. Over plain HTTP, Base64 credentials
          can be trivially decoded by anyone intercepting the traffic.
        </p>
      </blockquote>

      <h2>6. Email Attachments (MIME)</h2>
      <p>
        Email protocols (SMTP) were designed for ASCII text only. Binary attachments — images,
        PDFs, documents — are Base64-encoded before being included in email messages via MIME.
      </p>
      <pre><code>{`// Node.js: Sending email with attachment (nodemailer)
const nodemailer = require('nodemailer');
const fs = require('fs');

const pdfBuffer = fs.readFileSync('report.pdf');

await transporter.sendMail({
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Monthly Report',
  attachments: [
    {
      filename: 'report.pdf',
      content: pdfBuffer,
      // nodemailer handles Base64 encoding internally
      encoding: 'base64',
    },
  ],
});`}</code></pre>
      <p>
        Behind the scenes, the MIME message looks like:
      </p>
      <pre><code>{`Content-Type: application/pdf
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="report.pdf"

JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMg
MCBSPj4Kc3RyZWFtCkJUCi9GMS...`}</code></pre>

      <h2>7. Storing Binary Data in Text-Only Systems</h2>
      <p>
        Some systems — environment variables, JSON config files, CSV exports — only support text.
        Base64 lets you safely embed binary data in these text-only contexts.
      </p>
      <pre><code>{`# .env file: Store SSL certificate as Base64
SSL_CERT=LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0t...
SSL_KEY=LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0t...

# In your application:
# const cert = Buffer.from(process.env.SSL_CERT, 'base64');`}</code></pre>
      <pre><code>{`// Storing binary config in JSON
{
  "favicon": "iVBORw0KGgoAAAANSUhEUgAAA...",
  "sslCert": "LS0tLS1CRUdJTiBDRVJUSUZJ..."
}`}</code></pre>
      <p>
        This pattern is commonly used in cloud platforms (Heroku, Railway, Fly.io) where
        environment variables are the primary configuration mechanism.
      </p>

      <h2>Base64 vs Base64URL</h2>
      <p>
        Standard Base64 uses <code>+</code> and <code>/</code> which are not safe in URLs.
        Base64URL replaces them with <code>-</code> and <code>_</code>:
      </p>
      <table>
        <thead>
          <tr><th>Variant</th><th>Alphabet</th><th>Padding</th><th>Used In</th></tr>
        </thead>
        <tbody>
          <tr><td>Base64</td><td>A-Z, a-z, 0-9, +, /</td><td>= padding</td><td>Email, data URIs, K8s secrets</td></tr>
          <tr><td>Base64URL</td><td>A-Z, a-z, 0-9, -, _</td><td>No padding</td><td>JWT tokens, URL parameters</td></tr>
        </tbody>
      </table>

      <h2>Quick Reference: Base64 Commands</h2>
      <pre><code>{`# Encode a string
echo -n 'Hello World' | base64
# → SGVsbG8gV29ybGQ=

# Decode a string
echo -n 'SGVsbG8gV29ybGQ=' | base64 --decode
# → Hello World

# Encode a file
base64 < input.bin > output.txt

# Decode a file
base64 --decode < encoded.txt > output.bin

# JavaScript (browser)
btoa('Hello World')        // encode
atob('SGVsbG8gV29ybGQ=')  // decode

# Python
import base64
base64.b64encode(b'Hello World')
base64.b64decode(b'SGVsbG8gV29ybGQ=')`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>
          Encode and decode Base64 instantly with our tool &rarr;
        </Link>
      </p>

      {/* FAQ */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <h3>Is Base64 encoding the same as encryption?</h3>
        <p>
          No. Base64 is an encoding scheme, not encryption. Anyone can decode Base64 data — it provides
          no security. Base64 is designed for safe data transport through text-only channels, not for
          protecting sensitive information.
        </p>

        <h3>Why does Base64 increase data size by ~33%?</h3>
        <p>
          Base64 converts 3 bytes of binary data into 4 ASCII characters (6 bits per character instead
          of 8). This 3:4 ratio means Base64-encoded data is approximately 33% larger than the original
          binary data. The trade-off is universal text compatibility.
        </p>

        <h3>When should I NOT use Base64?</h3>
        <p>
          Avoid Base64 for large files (images over 10KB, videos, documents) as it significantly
          increases payload size. Also avoid it for long-term storage in databases — use binary columns
          (BLOB/BYTEA) instead. Base64 is best for small data traveling through text-only channels.
        </p>
      </div>
    </>
  );
}
