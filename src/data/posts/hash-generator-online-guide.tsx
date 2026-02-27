'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Hash Generator: Generate SHA-256, MD5, and HMAC Online — Complete Guide',
    description: 'Generate cryptographic hashes online with SHA-256, MD5, HMAC. Complete guide for JavaScript, Python, Go, password hashing, and file integrity checking.',
  },
  zh: {
    title: '哈希生成器：在线生成 SHA-256、MD5 和 HMAC 完整指南',
    description: '在线使用 SHA-256、MD5、HMAC 生成密码哈希。JavaScript、Python、Go、密码哈希和文件完整性验证完整指南。',
  },
};

export default function HashGeneratorOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a hash function and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A hash function takes any input data (text, file, binary) and produces a fixed-size output called a hash digest using a mathematical algorithm. The process is deterministic (same input always produces same output), one-way (you cannot reverse the hash to recover the original input), and exhibits the avalanche effect (even a single bit change produces a completely different output). Common algorithms include MD5 (128-bit), SHA-1 (160-bit), SHA-256 (256-bit), SHA-512 (512-bit), SHA-3, and BLAKE3.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between MD5, SHA-256, SHA-512, and BLAKE3?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MD5 produces a 128-bit hash and is cryptographically broken since 2004 — only safe for non-security checksums. SHA-1 (160-bit) was broken in 2017 with the SHAttered attack. SHA-256 (256-bit, SHA-2 family) is the current industry standard with no known practical attacks. SHA-512 (512-bit) offers a larger security margin and can be faster than SHA-256 on 64-bit processors. SHA-3 uses a completely different sponge construction and is immune to length extension attacks. BLAKE3 is extremely fast (up to 15x faster than SHA-256 on modern CPUs with SIMD) while maintaining 128-bit security.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can a hash be reversed or decrypted?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Cryptographic hash functions are designed to be one-way (preimage resistant). It is computationally infeasible to determine the original input from a hash output. However, weak or short inputs like common passwords can be "cracked" using brute-force attacks or rainbow tables. This is why passwords must use slow, salted, memory-hard algorithms like bcrypt, scrypt, or Argon2 — never plain SHA-256 or MD5.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is MD5 still safe to use in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MD5 is NOT safe for any security purpose. Practical collision attacks can be performed in under a second on modern hardware. Never use MD5 for digital signatures, certificate validation, password hashing, or any context with adversarial risk. However, MD5 remains acceptable for non-security use cases: detecting accidental file corruption, cache key generation, content deduplication, ETag generation, and hash table distribution. When adversarial manipulation is possible, use SHA-256 instead.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is HMAC and when should I use it instead of a plain hash?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HMAC (Hash-based Message Authentication Code) combines a secret key with a hash function to produce an authentication code that verifies both integrity AND authenticity of a message. Use HMAC when you need to prove a message was not tampered with AND was sent by someone with the secret key. Common use cases: API request signing (AWS, Stripe, GitHub webhooks), JWT signature verification, cookie/session token validation, and webhook payload verification. Never use a plain hash like SHA-256(secret + message) for authentication — it is vulnerable to length extension attacks. HMAC-SHA256 is the industry standard.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I use bcrypt or Argon2 instead of SHA-256 for password hashing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SHA-256 is designed to be extremely fast — the opposite of what you want for password hashing. An attacker with a modern GPU can compute billions of SHA-256 hashes per second, making brute-force attacks practical. bcrypt, scrypt, and Argon2 are intentionally slow and computationally expensive. bcrypt has a configurable work factor. Argon2 (winner of the 2015 Password Hashing Competition) provides configurable time cost, memory cost, and parallelism, resisting both GPU and ASIC attacks. All three automatically handle salting. Never store passwords as MD5 or plain SHA-256.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I verify file integrity using hash checksums?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To verify file integrity: (1) Download the file and its published SHA-256 checksum from the official source. (2) Compute the hash of your downloaded file using sha256sum on Linux, shasum -a 256 on macOS, or certutil -hashfile on Windows. (3) Compare your computed hash with the published value — if they match exactly, the file is intact. Many Linux distributions, software packages, and security-critical downloads publish SHA-256 checksums for this purpose.',
        },
      },
      {
        '@type': 'Question',
        name: 'What hash algorithm does Git, Docker, and IPFS use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Git traditionally uses SHA-1 to identify commits, trees, blobs, and tags (transitioning to SHA-256 via object-format=sha256). Docker uses SHA-256 for image layer digests (e.g., sha256:abc123...) enabling content-addressable layer sharing. IPFS uses CIDs (Content Identifiers) based on multihash, typically SHA-256 or SHA3-256, creating self-describing content addresses. Webpack uses content hashes ([contenthash]) for cache-busting filenames. Bitcoin uses double SHA-256 for block headers and Merkle trees.',
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

      {/* Canonical meta */}
      <link rel="canonical" href="https://viadreams.cc/en/blog/hash-generator-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>hash generator</strong> converts any input into a fixed-size cryptographic fingerprint. Use <strong>SHA-256</strong> for
          security-critical applications (file verification, digital signatures, blockchain). Use <strong>bcrypt or Argon2</strong> for
          password hashing — never plain SHA-256 or MD5. Use <strong>HMAC-SHA256</strong> for API authentication and webhook verification.
          MD5 is broken for security but acceptable for non-adversarial checksums. Try our free{' '}
          <Link href={`/${lang}/tools/hash-generator`} style={{ color: '#0284c7' }}>online hash generator</Link> for instant results,
          or follow the code examples below for JavaScript, Python, Go, and Rust.
        </p>
      </div>

      {/* Section 1: Hashing Overview */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        What Is a Hash Function? Core Properties Explained
      </h2>
      <p>
        A <strong>hash function</strong> is a mathematical algorithm that accepts an input of arbitrary size and produces a
        fixed-size output called a <strong>hash digest</strong>. The output is typically represented as a hexadecimal string.
        For example, SHA-256(&ldquo;hello&rdquo;) always equals{' '}
        <code>2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824</code>, regardless of when or where you compute it.
      </p>
      <p>Hash functions have five critical properties that make them essential across modern computing:</p>
      <ul>
        <li><strong>Deterministic</strong>: The same input always yields the same output.</li>
        <li><strong>Fixed-length output</strong>: Regardless of input size, the output is always the same length (e.g., 64 hex chars for SHA-256).</li>
        <li><strong>One-way (preimage resistant)</strong>: Given a hash, it is computationally infeasible to recover the original input.</li>
        <li><strong>Avalanche effect</strong>: Changing even a single bit in the input drastically alters the output.</li>
        <li><strong>Collision resistant</strong>: Computationally infeasible to find two different inputs producing the same hash.</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Algorithm Comparison Table
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Algorithm</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Output Bits</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Speed</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Security Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Primary Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>MD5</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>128</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Very Fast</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Broken (2004)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Legacy checksums, cache keys, ETags</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>SHA-1</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>160</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Fast</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Broken (2017)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Git (legacy), TOTP, fingerprints</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>SHA-256</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>256</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Moderate</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Secure</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Digital signatures, blockchain, TLS, file verification</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>SHA-512</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>512</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Fast on 64-bit</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Secure</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>High-security apps, Ed25519 signatures</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>SHA-3</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>224–512</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Moderate</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Secure (sponge)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>SHA-2 fallback, Ethereum (Keccak)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>BLAKE3</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>256 (default)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Extremely Fast</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Secure</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Build tools, content addressing, high-throughput</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        MD5 and SHA-1 are <strong>broken for security</strong> purposes but remain acceptable for non-adversarial checksums,
        cache keys, and legacy compatibility. SHA-256 is the recommended default for all new security-critical applications.
      </p>

      {/* Section 2: JavaScript Web Crypto API */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript — Web Crypto API (Browser and Node.js 18+)
      </h2>
      <p>
        The <strong>Web Crypto API</strong> is available natively in all modern browsers and in Node.js 18+ via the global{' '}
        <code>crypto.subtle</code> object. It supports SHA-1, SHA-256, SHA-384, and SHA-512 (not MD5). Use{' '}
        <code>TextEncoder</code> to convert strings to bytes before hashing.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Web Crypto API — works in browsers and Node.js 18+
async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Usage
const hash = await sha256('hello');
// => "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"

// SHA-512 — same pattern, different algorithm string
async function sha512(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Supported algorithms: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'
// Note: MD5 is NOT supported by Web Crypto API (use Node.js crypto module)`}</code></pre>
      <p>
        The Web Crypto API is asynchronous by design (returning Promises). The <code>TextEncoder</code> converts a UTF-8 string
        into a <code>Uint8Array</code>, which is what <code>crypto.subtle.digest</code> expects. The hex conversion maps each
        byte to a two-character hex string with leading zero padding.
      </p>

      {/* Section 3: Node.js crypto module */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript — Node.js crypto Module
      </h2>
      <p>
        The built-in <code>crypto</code> module in Node.js provides synchronous and streaming hash generation. It supports
        MD5, SHA-1, SHA-256, SHA-512, and many other algorithms via <code>crypto.getHashes()</code>.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import crypto from 'crypto';
import { createReadStream } from 'fs';

// String hashing — synchronous
function hashString(input: string, algorithm = 'sha256'): string {
  return crypto.createHash(algorithm).update(input, 'utf8').digest('hex');
}

console.log(hashString('hello', 'md5'));
// => "5d41402abc4b2a76b9719d911017c592"

console.log(hashString('hello', 'sha256'));
// => "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"

// Base64 output instead of hex
function hashBase64(input: string): string {
  return crypto.createHash('sha256').update(input).digest('base64');
}

// File hashing — streaming (memory-efficient for large files)
function hashFile(filePath: string, algorithm = 'sha256'): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream = createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

// Usage
const fileHash = await hashFile('./package.json', 'sha256');
console.log(\`SHA-256: \${fileHash}\`);

// List all supported algorithms
console.log(crypto.getHashes());
// [ 'md5', 'sha1', 'sha256', 'sha512', 'sha3-256', 'blake2b512', ... ]`}</code></pre>

      {/* Section 4: HMAC */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        HMAC — Message Authentication Code
      </h2>
      <p>
        <strong>HMAC (Hash-based Message Authentication Code)</strong> is a keyed-hash construction that verifies both the{' '}
        <em>integrity</em> and <em>authenticity</em> of a message. Unlike a plain hash which anyone can compute,
        HMAC requires knowledge of a secret key. Never use <code>SHA-256(secret + message)</code> — it is vulnerable to
        length extension attacks with Merkle-Damgard hash functions. HMAC prevents this by design.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import crypto from 'crypto';

// Node.js HMAC — used in API signing, webhooks, JWT
function hmacSha256(secret: string, message: string): string {
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

const signature = hmacSha256('my-secret-key', 'payload data');
// => "a6b4f7c9d2e1..." (32-byte / 64-char hex)

// GitHub webhook verification example
function verifyGithubWebhook(secret: string, payload: string, signature: string): boolean {
  const expected = 'sha256=' + hmacSha256(secret, payload);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

// Web Crypto API HMAC (browser)
async function hmacSha256Browser(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey(
    'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

// When to use HMAC vs plain hash:
// - Plain hash: file integrity where no adversary can modify the file
// - HMAC: API authentication, webhooks, JWT signing, session tokens`}</code></pre>

      {/* Section 5: Python hashlib */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python — hashlib
      </h2>
      <p>
        Python&apos;s built-in <code>hashlib</code> module provides access to all major hash algorithms including MD5,
        SHA-1, SHA-256, SHA-512, SHA-3 variants, and BLAKE2. It also includes <code>pbkdf2_hmac</code> for key derivation.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import hashlib
import hmac
import os

# Basic string hashing — always encode to bytes first
text = "hello"

sha256_hash = hashlib.sha256(text.encode('utf-8')).hexdigest()
print(sha256_hash)
# => "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"

md5_hash = hashlib.md5(text.encode()).hexdigest()
print(md5_hash)
# => "5d41402abc4b2a76b9719d911017c592"

# SHA-3 (different from SHA-2, sponge construction)
sha3_hash = hashlib.sha3_256(text.encode()).hexdigest()
print(sha3_hash)

# BLAKE2b — fast, secure, variable output
blake2b_hash = hashlib.blake2b(text.encode(), digest_size=32).hexdigest()

# File hashing with streaming (memory-efficient for large files)
def hash_file(filepath: str, algorithm: str = 'sha256') -> str:
    h = hashlib.new(algorithm)
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

file_hash = hash_file('/path/to/largefile.iso', 'sha256')
print(f"SHA-256: {file_hash}")

# PBKDF2 for key derivation (not for passwords — use bcrypt/argon2 instead)
password = b"my-password"
salt = os.urandom(16)
key = hashlib.pbkdf2_hmac('sha256', password, salt, iterations=600000)
# Use argon2-cffi for password hashing in production

# List all supported algorithms
print(hashlib.algorithms_guaranteed)
# {'sha256', 'sha512', 'sha3_256', 'blake2b', 'md5', ...}`}</code></pre>

      {/* Section 6: Password Hashing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Password Hashing — bcrypt and Argon2
      </h2>
      <p>
        <strong>SHA-256 is completely wrong for passwords.</strong> SHA-256 is designed to be fast — an attacker with
        a modern GPU can compute 10+ billion SHA-256 hashes per second, making brute-force attacks against password
        databases trivially easy. Proper password hashing uses intentionally slow, memory-hard algorithms.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python: bcrypt (install: pip install bcrypt)
import bcrypt

def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt(rounds=12)  # work factor 12 (~250ms on modern hardware)
    return bcrypt.hashpw(password.encode('utf-8'), salt)

def verify_password(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

hashed = hash_password("correct-horse-battery-staple")
print(hashed)
# => b'$2b$12$...' (60-char bcrypt hash with embedded salt and cost)

is_valid = verify_password("correct-horse-battery-staple", hashed)
print(is_valid)  # => True

# Python: argon2-cffi (install: pip install argon2-cffi)
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

ph = PasswordHasher(
    time_cost=3,       # number of iterations
    memory_cost=65536, # 64 MB memory
    parallelism=4,     # threads
)

hashed_pw = ph.hash("my-password")
# => "$argon2id$v=19$m=65536,t=3,p=4$..."

try:
    ph.verify(hashed_pw, "my-password")  # raises on failure
    print("Valid!")
except VerifyMismatchError:
    print("Invalid password")`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Node.js: bcryptjs (pure JS, no native deps)
import bcrypt from 'bcryptjs';

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12; // work factor — increase every few years
  return bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

const hash = await hashPassword('my-secure-password');
// => "$2a$12$..." (60-char bcrypt string)

const isValid = await verifyPassword('my-secure-password', hash);
// => true

// RULE: Never store plain passwords or MD5/SHA-256 password hashes
// RULE: The work factor should be tuned so hashing takes ~250-500ms
// RULE: bcrypt has a 72-byte input limit — use Argon2 for longer inputs`}</code></pre>

      {/* Section 7: Go */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Go — crypto Package
      </h2>
      <p>
        Go&apos;s standard library provides <code>crypto/sha256</code>, <code>crypto/sha512</code>, <code>crypto/sha1</code>,
        <code>crypto/md5</code>, and <code>crypto/hmac</code>. Use <code>fmt.Sprintf(&quot;%x&quot;, hash)</code> for hex encoding.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "crypto/sha512"
    "encoding/hex"
    "fmt"
    "io"
    "os"
)

// SHA-256 of a string — one-shot
func hashStringSHA256(s string) string {
    h := sha256.Sum256([]byte(s))
    return fmt.Sprintf("%x", h)
}

// SHA-256 streaming — for large data
func hashStreamSHA256(r io.Reader) (string, error) {
    h := sha256.New()
    if _, err := io.Copy(h, r); err != nil {
        return "", err
    }
    return hex.EncodeToString(h.Sum(nil)), nil
}

// File integrity check
func hashFile(path string) (string, error) {
    f, err := os.Open(path)
    if err != nil {
        return "", err
    }
    defer f.Close()
    return hashStreamSHA256(f)
}

// HMAC-SHA256 for API signing
func hmacSHA256(key, message []byte) string {
    mac := hmac.New(sha256.New, key)
    mac.Write(message)
    return hex.EncodeToString(mac.Sum(nil))
}

func main() {
    fmt.Println(hashStringSHA256("hello"))
    // => 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

    // SHA-512
    h512 := sha512.Sum512([]byte("hello"))
    fmt.Printf("%x\\n", h512)

    // HMAC
    sig := hmacSHA256([]byte("secret"), []byte("payload"))
    fmt.Println(sig)
}`}</code></pre>

      {/* Section 8: File Integrity Checking */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        File Integrity Checking — Command Line
      </h2>
      <p>
        Every major operating system provides command-line tools for computing file checksums. These are essential for
        verifying downloaded software, ISO images, and release artifacts.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Linux — sha256sum (coreutils)
sha256sum file.txt
# => 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824  file.txt

# Verify against a published checksum file
sha256sum -c SHA256SUMS
# => ubuntu-24.04.iso: OK

# Compute multiple algorithms at once
sha1sum file.txt    # SHA-1 (160-bit)
md5sum file.txt     # MD5 (128-bit, not for security)

# macOS — shasum
shasum -a 256 file.txt           # SHA-256
shasum -a 512 file.txt           # SHA-512
shasum -a 256 -c SHA256SUMS      # verify

# Windows PowerShell
Get-FileHash file.txt -Algorithm SHA256
Get-FileHash file.txt -Algorithm MD5

# Windows Command Prompt (certutil)
certutil -hashfile file.txt SHA256
certutil -hashfile file.txt MD5

# Verify a download — compare these two values:
shasum -a 256 ubuntu-24.04.iso
# vs the value published at https://releases.ubuntu.com/24.04/SHA256SUMS`}</code></pre>

      {/* Section 9: Content Addressing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Content Addressing — Git, IPFS, Docker, Webpack
      </h2>
      <p>
        Content-addressable systems use hash digests as identifiers, making it impossible for content to be silently
        replaced without changing its address.
      </p>
      <ul>
        <li>
          <strong>Git</strong>: Each commit, tree, and blob is identified by its SHA-1 hash (SHA-256 via{' '}
          <code>git init --object-format=sha256</code> in newer versions). The commit hash is the SHA-1 of the commit
          content plus parent hashes, making the entire history tamper-evident.
        </li>
        <li>
          <strong>IPFS</strong>: Files are addressed by CID (Content Identifier) based on multihash (typically SHA-256 or
          SHA3-256). The same content always resolves to the same CID globally, enabling deduplication across nodes.
        </li>
        <li>
          <strong>Docker</strong>: Image layers are identified by their SHA-256 digest (e.g.,{' '}
          <code>sha256:abc123def456...</code>). The same layer can be shared between images, saving storage and bandwidth.
        </li>
        <li>
          <strong>Webpack / build tools</strong>: The <code>[contenthash]</code> placeholder generates a short hash
          of file content for cache-busting filenames (e.g., <code>main.a3f7b2.js</code>). Browsers cache files
          indefinitely, and the hash changes only when content changes.
        </li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Git — view the hash of a commit or file
git log --oneline -5
# a3f7b2c Fix authentication bug
# 8e1d9f2 Add password hashing

git cat-file -t a3f7b2c    # => commit
git cat-file -p a3f7b2c    # => show commit content

# Docker — pull by digest (pinned, immutable)
docker pull nginx@sha256:abc123def456...
docker inspect nginx:latest | jq '.[0].RepoDigests'

# Webpack config — content hashing for cache busting
// webpack.config.js
module.exports = {
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
  }
};
// => main.a3f7b2c8.js (8-char truncated SHA-256)`}</code></pre>

      {/* Section 10: Hash Collisions and Security */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Hash Collisions and Security — What You Need to Know
      </h2>
      <p>
        A <strong>collision</strong> occurs when two different inputs produce the same hash output. Collision resistance
        is a fundamental security requirement for hash functions used in digital signatures, certificates, and code signing.
      </p>
      <ul>
        <li>
          <strong>MD5 (2004)</strong>: Xiaoyun Wang demonstrated practical collision attacks. By 2008, MD5 collisions
          were used to forge a rogue Certificate Authority certificate. In 2012, the Flame malware exploited MD5
          weaknesses in Windows Update. MD5 collisions can now be generated in under a second on commodity hardware.
        </li>
        <li>
          <strong>SHA-1 SHAttered (2017)</strong>: Google and CWI Amsterdam published the first practical SHA-1
          collision, creating two different PDF files with the same SHA-1 hash. The attack cost approximately{' '}
          $110,000 in cloud computing. Major browsers deprecated SHA-1 certificates in 2017.
        </li>
        <li>
          <strong>What &ldquo;collision-resistant&rdquo; means</strong>: SHA-256 provides 128-bit collision resistance,
          meaning an attacker needs ~2^128 operations to find a collision — far beyond the capability of all current and
          foreseeable computing resources. SHA-512 provides 256-bit resistance.
        </li>
        <li>
          <strong>Why it matters</strong>: If an attacker can create a collision, they can craft a malicious document
          with the same hash as a legitimate one, bypassing digital signature verification. This has real consequences
          for code signing certificates, software distribution, and document authentication.
        </li>
      </ul>
      <p>
        <strong>Recommended algorithms today</strong>: SHA-256 (widely supported, secure), SHA-512 (larger security margin),
        SHA-3 (sponge construction, no length extension attacks), BLAKE3 (fastest, excellent for high-throughput).
        Avoid MD5 and SHA-1 for any security purpose.
      </p>

      {/* Section 11: Rust */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Rust — sha2 and blake3 Crates
      </h2>
      <p>
        Rust has excellent cryptographic library support via the <code>sha2</code>, <code>blake3</code>, and{' '}
        <code>hmac</code> crates from the RustCrypto project. BLAKE3 is particularly popular in Rust because the
        official <code>blake3</code> crate is authored by the BLAKE3 designers.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Cargo.toml
[dependencies]
sha2 = "0.10"
sha3 = "0.10"
blake3 = "1"
hmac = "0.12"
hex = "0.4"
digest = "0.10"`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use sha2::{Sha256, Sha512, Digest};
use sha3::Sha3_256;
use hmac::{Hmac, Mac};
use sha2::Sha256 as HmacSha256;

fn main() {
    // SHA-256 one-shot
    let hash = Sha256::digest(b"hello");
    println!("{:x}", hash);
    // => 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

    // SHA-256 streaming (for large inputs)
    let mut hasher = Sha256::new();
    hasher.update(b"first chunk");
    hasher.update(b"second chunk");
    let result = hasher.finalize();
    println!("{:x}", result);

    // SHA-512
    let hash512 = Sha512::digest(b"hello");
    println!("{:x}", hash512);

    // SHA-3 (Keccak-based, sponge construction)
    let sha3 = Sha3_256::digest(b"hello");
    println!("{:x}", sha3);

    // BLAKE3 — extremely fast
    let b3 = blake3::hash(b"hello");
    println!("{}", b3.to_hex());

    // HMAC-SHA256
    type HmacSha256Type = Hmac<HmacSha256>;
    let mut mac = HmacSha256Type::new_from_slice(b"my-secret-key")
        .expect("HMAC accepts any key length");
    mac.update(b"payload data");
    let signature = mac.finalize().into_bytes();
    println!("{}", hex::encode(signature));
}`}</code></pre>

      {/* Section 12: Practical Use Cases */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Practical Use Cases — Patterns Every Developer Should Know
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        API Request Signing
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// API request signing — include signature in header
import crypto from 'crypto';

function signRequest(
  method: string,
  path: string,
  body: string,
  secret: string,
  timestamp: string
): string {
  const payload = \`\${method}\\n\${path}\\n\${timestamp}\\n\${body}\`;
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

// Client sends:
const timestamp = Date.now().toString();
const signature = signRequest('POST', '/api/orders', '{"qty":1}', apiSecret, timestamp);
// Headers: { 'X-Timestamp': timestamp, 'X-Signature': signature }

// Server verifies:
function verifyRequest(receivedSig: string, ...args: Parameters<typeof signRequest>): boolean {
  const expected = signRequest(...args);
  return crypto.timingSafeEqual(Buffer.from(receivedSig), Buffer.from(expected));
  // Use timingSafeEqual to prevent timing attacks
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Content Deduplication and Cache Keys
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import crypto from 'crypto';

// Content deduplication — detect duplicates without full comparison
function contentKey(content: string | Buffer): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

const files = new Map<string, string>(); // hash -> filename
async function deduplicatedUpload(filename: string, content: Buffer) {
  const hash = contentKey(content);
  if (files.has(hash)) {
    console.log(\`Duplicate detected: \${filename} = \${files.get(hash)}\`);
    return; // skip upload
  }
  files.set(hash, filename);
  // await s3.upload(hash, content);
}

// Cache key generation — short MD5 for non-security use
function cacheKey(params: Record<string, unknown>): string {
  const normalized = JSON.stringify(params, Object.keys(params).sort());
  return crypto.createHash('md5').update(normalized).digest('hex').slice(0, 12);
  // e.g. "a3f7b2c8d1e4" (12-char is plenty for cache keys)
}

// File change detection — hash before and after
async function hasFileChanged(path: string, previousHash: string): Promise<boolean> {
  const current = await hashFile(path);
  return current !== previousHash;
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        URL-Safe IDs and Random Tokens
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import crypto from 'crypto';

// Cryptographically secure random token (for password reset links, API keys)
function generateToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
  // 32 bytes => 64-char hex token with 256 bits of entropy
}

// URL-safe base64 token
function generateUrlSafeToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('base64url');
  // e.g. "xK7mZp2QrNvBwLfAeHqIuT..."
}

// Deterministic ID from content (content-addressable)
function contentId(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex').slice(0, 16);
  // 16-char hex (64 bits) — safe for millions of items
}

// UUID v4 is fine for most cases (not hash-based)
const uuid = crypto.randomUUID();
// => "550e8400-e29b-41d4-a716-446655440000"`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>SHA-256</strong> is the industry-standard choice for general-purpose cryptographic hashing with no known practical attacks.</li>
          <li><strong>MD5 and SHA-1</strong> are cryptographically broken — never use them for security, signatures, or certificates.</li>
          <li>Use <strong>bcrypt or Argon2</strong> (never SHA-256) for password hashing — they are intentionally slow and memory-hard.</li>
          <li>Use <strong>HMAC-SHA256</strong> (not plain SHA-256) for API request signing and webhook verification to prevent length extension attacks.</li>
          <li>The <strong>Web Crypto API</strong> works natively in browsers and Node.js 18+ without any dependencies.</li>
          <li><strong>Python hashlib</strong>, <strong>Go crypto package</strong>, and <strong>Rust sha2 crate</strong> all provide high-quality hash implementations.</li>
          <li>Content-addressable systems (Git, Docker, IPFS, Webpack) use SHA-256 digests as tamper-evident identifiers.</li>
          <li><strong>BLAKE3</strong> is the fastest modern hash function — ideal for high-throughput use cases where SHA-256 is a bottleneck.</li>
          <li>Use <code>crypto.timingSafeEqual()</code> when comparing HMAC signatures to prevent timing-based side-channel attacks.</li>
        </ul>
      </div>
    </article>
  );
}
