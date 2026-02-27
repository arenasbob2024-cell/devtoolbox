'use client';

import Link from 'next/link';

export default function BcryptGeneratorOnlineGuide({ lang }: { lang: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is bcrypt and why is it used for password hashing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'bcrypt is a password hashing function designed by Niels Provos and David Mazieres in 1999, based on the Blowfish cipher. It is specifically designed to be slow and computationally expensive, making brute-force attacks impractical. Unlike general-purpose hash functions like MD5 or SHA-256 which can compute billions of hashes per second, bcrypt is intentionally designed to take meaningful time (typically 50-500ms) per hash. It automatically handles salting (adding random data to prevent rainbow table attacks) and includes a configurable cost factor (work factor) that allows you to increase the computation cost as hardware gets faster. bcrypt is one of the most widely deployed password hashing algorithms and is supported natively in Node.js, Python, PHP, Ruby, Java, and virtually all other languages.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the bcrypt cost factor (salt rounds) and what value should I use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The bcrypt cost factor (also called work factor or salt rounds) is an integer that controls how computationally expensive the hashing operation is. The number of iterations performed is 2^cost. For example, cost factor 10 means 2^10 = 1,024 iterations; cost factor 12 means 2^12 = 4,096 iterations. As a result, each increment of the cost factor roughly doubles the hashing time. The OWASP recommendation as of 2023 is a minimum cost factor of 10 for bcrypt, with 12 being preferred for higher-security applications. For most web applications, a cost factor between 10 and 12 strikes the right balance: slow enough to deter attackers, fast enough to not degrade user experience. You should benchmark on your specific hardware and target 100-500ms per hash for interactive logins. Never use a cost factor below 10 in production.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I verify a password against a bcrypt hash?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To verify a password against a stored bcrypt hash, you use your language\'s bcrypt library compare function — never hash the password again and compare strings. The bcrypt hash string contains the algorithm version, cost factor, and salt as a prefix, which the library reads automatically. In Node.js: const isMatch = await bcrypt.compare(plainPassword, storedHash). In Python: is_valid = bcrypt.checkpw(password.encode(), stored_hash). In PHP: $isValid = password_verify($password, $hash). The comparison is done in constant time to prevent timing attacks. Never attempt to manually extract and compare parts of the hash string.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between bcrypt, Argon2, and scrypt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'bcrypt (1999): the oldest of the three; configurable time cost via cost factor; output is always 60 characters; max input length is 72 bytes (passwords longer than 72 characters are silently truncated); widely supported in all languages; OWASP recommends it as acceptable. scrypt (2009): adds memory-hardness on top of time cost to resist GPU and ASIC attacks; configurable time cost (N), memory (r), and parallelism (p) parameters; more complex to configure correctly. Argon2 (2015 PHC winner): most modern option; three variants: Argon2i (side-channel resistant), Argon2d (GPU resistant), Argon2id (recommended hybrid); configurable time cost, memory, and parallelism; OWASP first recommendation since 2023; no input length limit. For new applications in 2026, Argon2id is the preferred choice, but bcrypt remains a solid, battle-tested option especially when Argon2 library support is limited.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is bcrypt safe to use in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, bcrypt is still considered safe and acceptable for password hashing in 2026. It has over 25 years of cryptographic review with no known practical attacks against its core algorithm. However, there are two important caveats: (1) bcrypt silently truncates passwords at 72 bytes, which means very long passwords are treated as if they were only 72 bytes — this can be addressed by pre-hashing with SHA-256 before bcrypt, but this requires careful implementation. (2) Argon2id is now the OWASP first recommendation because it offers better memory-hardness against GPU attacks. If you are maintaining an existing application using bcrypt with a cost factor of 10 or higher, it is safe to keep using it. For new applications, consider Argon2id unless bcrypt has better library support in your ecosystem.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can bcrypt hashes be cracked or reversed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'bcrypt hashes cannot be reversed — the function is one-way. However, they can be "cracked" by trying candidate passwords through the bcrypt function and comparing the result. The high cost factor makes this extremely slow: with a cost factor of 12, a modern GPU can only attempt a few thousand bcrypt hashes per second, compared to billions of MD5 hashes per second. This means cracking a single strong password (12+ characters, mixed case, numbers, symbols) with bcrypt at cost 12 would take centuries even on specialized hardware. Weak passwords (dictionary words, simple patterns, short passwords) remain vulnerable even with bcrypt because the search space is small enough to exhaust. This is why password strength still matters alongside bcrypt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does bcrypt truncate passwords at 72 characters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'bcrypt\'s 72-byte limit comes from its underlying Blowfish cipher implementation. During the key setup phase, bcrypt processes the password in 18 4-byte words (72 bytes total) and the password is XORed into these words cyclically. Bytes beyond position 72 are ignored in the computation. In practice, this means that "password_that_is_seventy_three_characters_long_abc" and "password_that_is_seventy_three_characters_long_xyz" would produce the same hash. To mitigate this: (1) if your policy allows passwords longer than 72 bytes, pre-hash with SHA-256 (encoding the result as hex or base64) before passing to bcrypt — this converts any length input to a fixed 64-byte hex or 44-byte base64 string that bcrypt handles safely; (2) alternatively, use Argon2 which has no input length limit.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I migrate existing MD5 or SHA-256 password hashes to bcrypt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You cannot directly convert existing MD5 or SHA-256 hashes to bcrypt because you cannot reverse the old hashes to get the original passwords. The standard migration approach is: (1) On the next successful login, verify the password against the old hash; if it matches, immediately re-hash the password with bcrypt and store the new hash, marking the record as migrated. (2) Optionally, double-hash as a bridge: wrap the old hash in bcrypt (bcrypt(md5_hash, cost=12)) to add bcrypt protection to existing hashes without requiring user action — this works because the old hash is just treated as the "password" string. (3) After a migration deadline, force a password reset for any users who have not logged in. Track migration status with a flag field in your user table.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>bcrypt</strong> is the industry standard for password hashing. It is intentionally slow, automatically salted, and configurable via a <strong>cost factor</strong> (work factor / salt rounds).
          Use a cost factor of <strong>10&ndash;12</strong> for most applications (target 100&ndash;500ms per hash on your hardware).
          Always use your library&apos;s built-in <code>compare()</code> function to verify passwords &mdash; never re-hash and compare strings.
          For new projects in 2026, consider <strong>Argon2id</strong> as OWASP&apos;s first recommendation, but bcrypt at cost&nbsp;12 remains safe and battle-tested.
          You can <Link href={`/${lang}/tools/bcrypt-generator`}>generate and verify bcrypt hashes online</Link> instantly with our free tool.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>Never use MD5, SHA-1, or plain SHA-256</strong> to hash passwords &mdash; they are far too fast for attackers to brute-force.</li>
          <li>bcrypt&apos;s <strong>cost factor</strong> doubles the computation time with each increment: cost 10 = 1,024 rounds; cost 12 = 4,096 rounds.</li>
          <li>bcrypt <strong>automatically generates and embeds a unique 128-bit salt</strong> into every hash, defeating rainbow table attacks.</li>
          <li>A bcrypt hash is always a <strong>60-character string</strong> starting with <code>$2b$</code> (or <code>$2a$</code>) encoding algorithm, cost, salt, and digest.</li>
          <li>bcrypt <strong>silently truncates passwords at 72 bytes</strong> &mdash; mitigate by pre-hashing very long passwords with SHA-256 first.</li>
          <li><strong>Argon2id</strong> is the OWASP 2023 first recommendation; <strong>bcrypt at cost 12</strong> is acceptable; <strong>scrypt</strong> is a good middle ground.</li>
          <li>Use <code>bcrypt.compare()</code> (Node.js), <code>bcrypt.checkpw()</code> (Python), or <code>password_verify()</code> (PHP) &mdash; all perform <strong>constant-time comparison</strong>.</li>
          <li>OWASP minimum: cost factor <strong>10</strong> for bcrypt; recommended: <strong>12</strong> for higher security contexts.</li>
        </ul>
      </div>

      <h2>What Is bcrypt? The Password Hashing Algorithm Explained</h2>
      <p>
        bcrypt is a <strong>password hashing function</strong> created by Niels Provos and David Mazieres and presented at USENIX 1999. Unlike general-purpose cryptographic hash functions like SHA-256 or MD5, bcrypt is specifically designed for one job: making it as expensive as possible for an attacker to guess passwords in a database breach.
      </p>
      <p>
        The fundamental problem with hashing passwords with fast algorithms is that modern GPUs can compute <strong>billions</strong> of SHA-256 hashes per second. If an attacker obtains a database of SHA-256-hashed passwords, they can try every word in a dictionary, every common password variation, and every short combination of characters in seconds or minutes. bcrypt solves this by being <em>intentionally slow</em>: a well-configured bcrypt hash takes 100 to 500 milliseconds to compute, reducing an attacker&apos;s throughput from billions per second to a few hundred per second.
      </p>
      <p>
        bcrypt is built on top of the <strong>Blowfish cipher</strong>&apos;s key scheduling algorithm. The key insight is that Blowfish&apos;s key setup (called Eksblowfish) is designed to be expensive: it iterates many rounds of key expansion. bcrypt exposes this cost as the configurable <strong>work factor</strong> (cost factor), allowing developers to tune the algorithm&apos;s speed to match hardware advances over time.
      </p>
      <p>
        You can immediately try generating bcrypt hashes with our free <Link href={`/${lang}/tools/bcrypt-generator`}>Bcrypt Generator Online</Link> tool, which lets you set the cost factor and verify existing hashes in the browser.
      </p>

      <h2>The bcrypt Hash Format Explained</h2>
      <p>
        Every bcrypt hash is a 60-character string with a specific structure. Understanding this format helps when debugging, migrating systems, or validating hashes. Here is an example hash for the password <code>hunter2</code> with cost factor 12:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`$2b$12$EXAMPLEsalthere22charsXXhashhere31charsXXXXXXXXXXXXX`}</code></pre>
      <p>The format breaks down as follows:</p>
      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95em' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Segment</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Length</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Example</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Algorithm prefix</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>4 chars</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>$2b$</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>bcrypt version (<code>$2b$</code> is preferred; <code>$2a$</code> is older; <code>$2y$</code> is PHP-specific)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Cost factor</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>2 chars + <code>$</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>12$</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Work factor (2^12 = 4,096 iterations); range is typically 4&ndash;31</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Salt</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>22 chars</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>EXAMPLEsalthere22chars</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>128-bit random salt encoded in bcrypt&apos;s modified Base64 alphabet</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Hash digest</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>31 chars</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>XXhashhere31charsXXXXXXXXXXXXX</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>184-bit (23 bytes) of the actual hash, also in bcrypt&apos;s Base64</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The total is <strong>60 characters</strong> (4 + 2 + 1 + 22 + 31). Because the salt is embedded in the hash string, a bcrypt library can verify a password with only two inputs: the plaintext password and the stored hash string. It reads the salt and cost factor from the hash prefix automatically.
      </p>
      <p>
        Note on versions: <code>$2a$</code> had a bug in some PHP implementations with certain Unicode characters. <code>$2b$</code> was introduced to mark the fixed version. <code>$2y$</code> is PHP&apos;s own notation for the same fix. All modern bcrypt libraries use <code>$2b$</code>, and most will accept and correctly verify <code>$2a$</code> hashes as well.
      </p>

      <h2>Understanding the Cost Factor (Work Factor / Salt Rounds)</h2>
      <p>
        The <strong>cost factor</strong> (sometimes called <em>work factor</em> or <em>salt rounds</em> in Node.js bcryptjs documentation) is the single most important parameter you control when using bcrypt. It is an integer, typically between 10 and 14 for production applications.
      </p>
      <p>
        The relationship between cost factor and computation time is <strong>exponential</strong>: each increase of 1 doubles the number of iterations performed, which roughly doubles the time required. The formula is:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`iterations = 2^cost_factor

cost 10 → 2^10  =  1,024 iterations
cost 11 → 2^11  =  2,048 iterations
cost 12 → 2^12  =  4,096 iterations  (OWASP recommended)
cost 13 → 2^13  =  8,192 iterations
cost 14 → 2^14  = 16,384 iterations`}</code></pre>
      <p>
        Here is a real-world benchmark on a typical modern server CPU (approximate values; your hardware will vary):
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95em' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Cost Factor</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Iterations</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>~Time (server)</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Attacker hashes/sec (GPU)</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>8</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>256</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~5 ms</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~200,000/s</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Too weak &mdash; do not use in production</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>10</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>1,024</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~100 ms</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~50,000/s</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>OWASP minimum &mdash; acceptable</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>12</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>4,096</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~300 ms</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~12,000/s</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}><strong>OWASP recommended &mdash; use this</strong></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>13</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>8,192</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~600 ms</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~6,000/s</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>High security, may feel slow for web login</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>14</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>16,384</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~1.2 s</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~3,000/s</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Very high security (banking, healthcare)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The key insight: even at cost factor 12, an attacker with a powerful GPU cluster can only attempt roughly 12,000 bcrypt hashes per second. Cracking a randomly generated 8-character alphanumeric password (62^8 &asymp; 218 trillion combinations) at 12,000 hashes/second would take approximately <strong>578 years</strong>. This is why bcrypt is so effective.
      </p>
      <p>
        <strong>The golden rule</strong>: benchmark bcrypt hashing on your production server hardware and select the highest cost factor that keeps per-hash time under 500ms for interactive login. Revisit and increase the cost factor every 1&ndash;2 years as hardware improves. When you increase the cost factor, you only need to re-hash passwords as users log in (the old hashes remain valid until then).
      </p>

      <h2>How bcrypt Salting Works</h2>
      <p>
        A <strong>salt</strong> is a random value added to the password before hashing to ensure that identical passwords produce different hashes. This defeats <strong>rainbow table attacks</strong> (precomputed lookup tables of common password hashes) and ensures that if two users have the same password, their hashes will be completely different.
      </p>
      <p>
        The critical advantage of bcrypt over naive salting approaches is that bcrypt <strong>generates, stores, and manages the salt automatically</strong>. You do not need to separately generate, store, or manage salts in your database &mdash; the library handles it all. The 128-bit (16-byte) cryptographically random salt is generated fresh for each call to the hash function and embedded directly into the 60-character output string.
      </p>
      <p>
        Here is what this means in practice:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`// Same password, called twice → different hashes (different random salts)
bcrypt.hash("mysecretpassword", 12)
// → "$2b$12$AbCdEfGhIjKlMnOpQrStUu8xY3Z..."

bcrypt.hash("mysecretpassword", 12)
// → "$2b$12$XyZwVuTsRqPoNmLkJiHgFf7hQ1M..."

// Verification still works because the salt is IN the hash string
bcrypt.compare("mysecretpassword", "$2b$12$AbCdEfGhIjKlMnOpQrStUu8xY3Z...")
// → true`}</code></pre>
      <p>
        You only need <strong>one column in your database</strong> to store the complete bcrypt hash (60 characters, a <code>VARCHAR(60)</code> or <code>CHAR(60)</code> is sufficient). The salt column approach used with older password hashing schemes is unnecessary with bcrypt.
      </p>

      <h2>How to Use bcrypt in Node.js</h2>
      <p>
        Node.js has two main bcrypt libraries: <code>bcrypt</code> (native bindings, faster) and <code>bcryptjs</code> (pure JavaScript, no native dependencies). For most applications, both work identically from an API perspective. Use <code>bcrypt</code> for performance-critical applications; use <code>bcryptjs</code> when native bindings are problematic (serverless, containers, cross-compilation).
      </p>

      <h3>Installation</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`# Option 1: native bindings (faster, requires build tools)
npm install bcrypt
npm install --save-dev @types/bcrypt   # TypeScript

# Option 2: pure JavaScript (no native deps)
npm install bcryptjs
npm install --save-dev @types/bcryptjs  # TypeScript`}</code></pre>

      <h3>Hashing a Password (Async)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';
// or: import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12; // OWASP recommended cost factor

/**
 * Hash a plain-text password
 */
async function hashPassword(plainPassword: string): Promise<string> {
  // bcrypt.hash() generates a random salt internally
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
  // Returns something like:
  // "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW"
}

/**
 * Verify a password against a stored hash
 */
async function verifyPassword(
  plainPassword: string,
  storedHash: string
): Promise<boolean> {
  // bcrypt.compare() extracts the salt from storedHash automatically
  // Uses constant-time comparison to prevent timing attacks
  const isMatch = await bcrypt.compare(plainPassword, storedHash);
  return isMatch;
}

// Usage example
const password = 'my_secure_password_123!';
const hash = await hashPassword(password);
console.log('Hash:', hash);
// Hash: $2b$12$...

const isValid = await verifyPassword(password, hash);
console.log('Valid:', isValid); // true

const isInvalid = await verifyPassword('wrong_password', hash);
console.log('Invalid:', isInvalid); // false`}</code></pre>

      <h3>Sync vs Async API</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';

// ✅ PREFER: Async API (non-blocking, use in web servers)
const hashAsync = await bcrypt.hash('password', 12);
const validAsync = await bcrypt.compare('password', hashAsync);

// ⚠️ Use with caution: Sync API blocks the event loop!
// Only acceptable in scripts, CLI tools, or tests
const hashSync = bcrypt.hashSync('password', 12);
const validSync = bcrypt.compareSync('password', hashSync);

// In Express.js / Fastify routes, ALWAYS use the async API
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate password strength first
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password too short' });
  }

  const hash = await bcrypt.hash(password, 12);

  await db.users.create({ username, passwordHash: hash });
  res.json({ success: true });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await db.users.findOne({ username });
  if (!user) {
    // Still run bcrypt to prevent timing-based username enumeration
    await bcrypt.hash(password, 12);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateJWT(user);
  res.json({ token });
});`}</code></pre>

      <h3>Handling the 72-Byte Limit in Node.js</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';
import crypto from 'crypto';

/**
 * Pre-hash with SHA-256 to handle passwords longer than 72 bytes.
 * The SHA-256 hex output (64 chars) is always within bcrypt's 72-byte limit.
 */
function prehashPassword(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('hex'); // 64 hex chars, always < 72 bytes
}

async function hashPasswordSafe(password: string): Promise<string> {
  const prehashed = prehashPassword(password);
  return bcrypt.hash(prehashed, 12);
}

async function verifyPasswordSafe(
  password: string,
  storedHash: string
): Promise<boolean> {
  const prehashed = prehashPassword(password);
  return bcrypt.compare(prehashed, storedHash);
}

// IMPORTANT: If you switch to this approach on an existing system,
// ALL existing users must reset their passwords (old hashes are incompatible).
// Use this pattern only for new systems or after a coordinated migration.`}</code></pre>

      <h3>Upgrading Cost Factor on Next Login</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';

const CURRENT_COST = 12;

async function loginWithCostUpgrade(
  password: string,
  storedHash: string,
  userId: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, storedHash);
  if (!isValid) return false;

  // Check if the stored hash uses an outdated cost factor
  const hashCost = parseInt(storedHash.split('$')[2], 10);
  if (hashCost < CURRENT_COST) {
    // Re-hash with the new cost factor transparently
    const newHash = await bcrypt.hash(password, CURRENT_COST);
    await db.users.update({ id: userId, passwordHash: newHash });
    console.log(\`Upgraded password hash for user \${userId}: cost \${hashCost} → \${CURRENT_COST}\`);
  }

  return true;
}`}</code></pre>

      <h2>How to Use bcrypt in Python</h2>
      <p>
        Python&apos;s primary bcrypt library is the <code>bcrypt</code> package, which wraps OpenBSD&apos;s native bcrypt C implementation. It is fast, well-maintained, and straightforward to use.
      </p>

      <h3>Installation</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`pip install bcrypt

# For Django projects, use Django's built-in hasher instead:
# PASSWORD_HASHERS in settings.py
# Django supports bcrypt natively when bcrypt is installed`}</code></pre>

      <h3>Hashing and Verifying Passwords</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt

COST_FACTOR = 12  # OWASP recommended

def hash_password(plain_password: str) -> bytes:
    """Hash a password with bcrypt. Returns the hash as bytes."""
    # Encode the string to bytes first (bcrypt requires bytes)
    password_bytes = plain_password.encode('utf-8')
    # bcrypt.gensalt() generates a random 128-bit salt with the given rounds
    salt = bcrypt.gensalt(rounds=COST_FACTOR)
    # bcrypt.hashpw() computes the hash
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed
    # Returns: b'$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW'

def verify_password(plain_password: str, stored_hash: bytes) -> bool:
    """Verify a password against a stored bcrypt hash."""
    password_bytes = plain_password.encode('utf-8')
    # checkpw() handles salt extraction and constant-time comparison
    return bcrypt.checkpw(password_bytes, stored_hash)

# Usage
password = "my_secure_password_123!"
hashed = hash_password(password)
print(f"Hash: {hashed}")
# b'$2b$12$...'

print(verify_password(password, hashed))       # True
print(verify_password("wrong_password", hashed))  # False`}</code></pre>

      <h3>Storing bcrypt Hashes in a Database (Python)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt
import sqlite3

# bcrypt returns bytes; store as TEXT in the database (decode to str)
def hash_password_for_db(plain_password: str) -> str:
    hashed_bytes = bcrypt.hashpw(
        plain_password.encode('utf-8'),
        bcrypt.gensalt(rounds=12)
    )
    return hashed_bytes.decode('utf-8')  # Store as string

def verify_from_db(plain_password: str, stored_hash_str: str) -> bool:
    # Re-encode the stored string to bytes for checkpw()
    return bcrypt.checkpw(
        plain_password.encode('utf-8'),
        stored_hash_str.encode('utf-8')
    )

# Database example (SQLite)
conn = sqlite3.connect('users.db')
conn.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL  -- VARCHAR(60) is sufficient
    )
''')

def register_user(username: str, password: str):
    hash_str = hash_password_for_db(password)
    conn.execute(
        'INSERT INTO users (username, password_hash) VALUES (?, ?)',
        (username, hash_str)
    )
    conn.commit()

def login_user(username: str, password: str) -> bool:
    row = conn.execute(
        'SELECT password_hash FROM users WHERE username = ?',
        (username,)
    ).fetchone()
    if not row:
        # Prevent timing-based username enumeration with a dummy comparison
        bcrypt.checkpw(
            password.encode('utf-8'),
            bcrypt.hashpw(b'dummy', bcrypt.gensalt(rounds=4))
        )
        return False
    return verify_from_db(password, row[0])`}</code></pre>

      <h3>bcrypt with Django</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`# 1. Install: pip install django[bcrypt]  or  pip install bcrypt

# 2. In settings.py, add BCryptSHA256PasswordHasher FIRST in the list:
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',  # fallback for old hashes
]

# 3. Django handles everything automatically:
from django.contrib.auth import authenticate, get_user_model

User = get_user_model()

# Creating a user — Django hashes the password automatically
user = User.objects.create_user(username='alice', password='SecurePass123!')
# user.password now stores: bcrypt$$2b$12$...

# Verifying — Django uses checkpw() internally
auth_user = authenticate(username='alice', password='SecurePass123!')
# Returns the user object if valid, None if invalid

# Django's BCryptSHA256PasswordHasher wraps the password with HMAC-SHA256
# before passing to bcrypt, which both handles the 72-byte limit AND
# adds an extra layer of keyed hashing using Django's SECRET_KEY`}</code></pre>

      <h2>How to Use bcrypt in PHP</h2>
      <p>
        PHP has included bcrypt support natively since PHP 5.5 through the <code>password_hash()</code> and <code>password_verify()</code> functions. These are the <strong>recommended</strong> functions &mdash; you should never use the older <code>crypt()</code> function directly.
      </p>

      <h3>Basic Hashing and Verification</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`<?php

/**
 * Hash a password using bcrypt via PHP's password_hash()
 */
function hashPassword(string $password): string {
    $options = [
        'cost' => 12, // OWASP recommended cost factor
    ];
    $hash = password_hash($password, PASSWORD_BCRYPT, $options);

    if ($hash === false) {
        throw new RuntimeException('Failed to hash password');
    }

    return $hash;
    // Returns: "$2y$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW"
    // Note: PHP uses $2y$ prefix (equivalent to $2b$ from other implementations)
}

/**
 * Verify a password against a stored bcrypt hash
 */
function verifyPassword(string $password, string $storedHash): bool {
    return password_verify($password, $storedHash);
    // Returns true/false; uses constant-time comparison internally
}

// Usage
$password = 'my_secure_password_123!';
$hash = hashPassword($password);
echo "Hash: $hash\n";

var_dump(verifyPassword($password, $hash));       // bool(true)
var_dump(verifyPassword('wrong_password', $hash)); // bool(false)

/**
 * Check if a hash needs to be re-hashed with updated options
 * Use this on each successful login to upgrade old hashes
 */
function rehashIfNeeded(string $password, string $storedHash, PDO $db, int $userId): void {
    $options = ['cost' => 12];
    if (password_needs_rehash($storedHash, PASSWORD_BCRYPT, $options)) {
        $newHash = password_hash($password, PASSWORD_BCRYPT, $options);
        $stmt = $db->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
        $stmt->execute([$newHash, $userId]);
    }
}`}</code></pre>

      <h3>Complete PHP Login System</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`<?php
// config.php
define('BCRYPT_COST', 12);
define('MIN_PASSWORD_LENGTH', 8);

class UserAuth {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function register(string $username, string $password): array {
        // Validate input
        if (strlen($password) < MIN_PASSWORD_LENGTH) {
            return ['success' => false, 'error' => 'Password too short'];
        }
        if (strlen($username) < 3) {
            return ['success' => false, 'error' => 'Username too short'];
        }

        // Check if username already exists
        $stmt = $this->db->prepare('SELECT id FROM users WHERE username = ?');
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            return ['success' => false, 'error' => 'Username already taken'];
        }

        // Hash password with bcrypt
        $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => BCRYPT_COST]);

        // Store user
        $stmt = $this->db->prepare(
            'INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, NOW())'
        );
        $stmt->execute([$username, $hash]);

        return ['success' => true, 'user_id' => $this->db->lastInsertId()];
    }

    public function login(string $username, string $password): array {
        $stmt = $this->db->prepare(
            'SELECT id, password_hash FROM users WHERE username = ?'
        );
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            // Prevent timing attack: run a dummy hash even when user doesn't exist
            password_verify($password, '$2y$12$invalid.hash.for.timing.prevention.only');
            return ['success' => false, 'error' => 'Invalid credentials'];
        }

        if (!password_verify($password, $user['password_hash'])) {
            return ['success' => false, 'error' => 'Invalid credentials'];
        }

        // Upgrade hash if cost factor has changed
        if (password_needs_rehash($user['password_hash'], PASSWORD_BCRYPT, ['cost' => BCRYPT_COST])) {
            $newHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => BCRYPT_COST]);
            $update = $this->db->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
            $update->execute([$newHash, $user['id']]);
        }

        return ['success' => true, 'user_id' => $user['id']];
    }
}`}</code></pre>

      <h2>bcrypt vs Argon2 vs scrypt: Which Should You Use in 2026?</h2>
      <p>
        Choosing the right password hashing algorithm in 2026 depends on your language ecosystem, infrastructure constraints, and security requirements. Here is a detailed comparison of all three major algorithms:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Property</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>bcrypt</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Argon2id</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>scrypt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Year created</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>1999</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>2015</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>2009</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>OWASP 2023 recommendation</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Acceptable (2nd choice)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a', fontWeight: 700 }}>First choice (Argon2id)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Acceptable (3rd choice)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Memory-hardness</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>None (CPU-only)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes (configurable memory)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes (configurable memory)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>GPU resistance</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Moderate (CPU-heavy ops)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Excellent</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Excellent</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>ASIC resistance</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Low</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>High</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Moderate</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Password length limit</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>72 bytes (silent truncation)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Unlimited</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Unlimited</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Output length</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Always 60 chars</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Configurable</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Configurable</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Tuning parameters</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>1 (cost factor)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>3 (time, memory, parallelism)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>3 (N, r, p)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Configuration difficulty</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Simple (just cost)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Moderate</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Complex (easy to misconfigure)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Library availability</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Excellent (all ecosystems)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Good (growing rapidly)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Moderate</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Built-in language support</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>PHP, Ruby, many frameworks</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Python (passlib), PHP 8.2+</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Python (hashlib), Node.js (crypto)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>OWASP min params (2023)</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>cost ≥ 10</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>m=19 MiB, t=2, p=1</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>N=2^17, r=8, p=1</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Best for</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Existing systems, PHP/Ruby apps, maximum compatibility</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>New applications, maximum security</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Systems where Argon2 is unavailable but memory-hardness is needed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Recommendation for 2026</strong>: Use <strong>Argon2id</strong> for new applications if your language/framework supports it well. Use <strong>bcrypt at cost 12</strong> if you are maintaining an existing system or if Argon2id library support is limited in your ecosystem. Avoid scrypt unless you have a specific reason &mdash; its configuration is error-prone and Argon2id supersedes it in every respect.
      </p>
      <p>
        Note: you can also compare raw hash algorithms using our <Link href={`/${lang}/tools/hash-generator`}>Hash Generator Online</Link> to understand how MD5, SHA-256, and SHA-512 differ from password-hashing algorithms.
      </p>

      <h2>Argon2 in Node.js: A Modern Alternative</h2>
      <p>
        If you are starting a new Node.js application in 2026 and want to use Argon2id (the OWASP first recommendation), here is how:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`npm install argon2`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import argon2 from 'argon2';

// OWASP Argon2id minimum settings (2023):
// Memory: 19 MiB (19456 KiB), Time: 2 iterations, Parallelism: 1
const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19456,  // 19 MiB in KiB
  timeCost: 2,        // 2 iterations
  parallelism: 1,
};

async function hashPasswordArgon2(password: string): Promise<string> {
  return argon2.hash(password, ARGON2_OPTIONS);
  // Returns: "$argon2id$v=19$m=19456,t=2,p=1$..."
}

async function verifyPasswordArgon2(
  password: string,
  hash: string
): Promise<boolean> {
  return argon2.verify(hash, password);
}

// Argon2id has no password length limit and is more GPU-resistant than bcrypt
// It is the better choice for new applications in 2026`}</code></pre>

      <h2>Common Bcrypt Mistakes and How to Avoid Them</h2>

      <h3>Mistake 1: Comparing Hash Strings Directly</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';

// ❌ WRONG: Never do this
const hash1 = await bcrypt.hash('password', 12);
const hash2 = await bcrypt.hash('password', 12);
// hash1 !== hash2 because they have different random salts!
if (hash1 === hash2) { /* This will NEVER be true */ }

// ❌ ALSO WRONG: Never hash then compare
const inputHash = await bcrypt.hash(userInput, 12);
if (inputHash === storedHash) { /* Different salts → never matches */ }

// ✅ CORRECT: Always use compare()
const isValid = await bcrypt.compare(userInput, storedHash);`}</code></pre>

      <h3>Mistake 2: Using a Too-Low Cost Factor</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`// ❌ WRONG: Default cost of 10 is the MINIMUM, not a good choice
const hash = await bcrypt.hash(password, 10); // Barely acceptable

// ❌ VERY WRONG: Cost of 4 or 5 is dangerously weak
const weakHash = await bcrypt.hash(password, 5); // Never in production!

// ✅ CORRECT: Use at least 12 for meaningful security
const secureHash = await bcrypt.hash(password, 12); // OWASP recommended

// ✅ BEST: Benchmark on your hardware and target 100-500ms
import { performance } from 'perf_hooks';

for (let cost = 10; cost <= 14; cost++) {
  const start = performance.now();
  await bcrypt.hash('benchmark_password', cost);
  const ms = performance.now() - start;
  console.log(\`Cost \${cost}: \${ms.toFixed(0)}ms\`);
}
// Pick the highest cost that stays under 500ms on your server`}</code></pre>

      <h3>Mistake 3: Blocking the Event Loop with Sync Hashing</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';

// ❌ WRONG: bcrypt.hashSync() blocks Node.js event loop for ~300ms!
// During this time, your server cannot handle ANY other requests.
app.post('/login', (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 12); // BLOCKS EVERYTHING
  // ...
});

// ✅ CORRECT: Always use the async API in request handlers
app.post('/login', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12); // Non-blocking
    // ...
  } catch (err) {
    res.status(500).json({ error: 'Internal error' });
  }
});

// Note: Even the async API uses a thread pool (via libuv) to offload CPU work,
// so it doesn't truly block Node's event loop.`}</code></pre>

      <h3>Mistake 4: Not Handling the 72-Byte Limit</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';

// ❌ POTENTIAL ISSUE: Passwords longer than 72 bytes are silently truncated
// "A_very_long_password_that_is_exactly_73_bytes_long_abc" and
// "A_very_long_password_that_is_exactly_73_bytes_long_xyz" hash identically!

// Test if a string exceeds 72 bytes (UTF-8 characters can be multibyte!)
function exceedsBcryptLimit(password: string): boolean {
  return Buffer.byteLength(password, 'utf8') > 72;
}

// ✅ OPTION 1: Reject passwords > 72 bytes
if (exceedsBcryptLimit(password)) {
  throw new Error('Password too long (maximum 72 bytes for bcrypt)');
}

// ✅ OPTION 2: Pre-hash with SHA-256 (converts any length to 64 hex chars)
import crypto from 'crypto';

function prehash(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
  // Always returns a 64-char hex string — safely within 72-byte limit
}

const safeHash = await bcrypt.hash(prehash(password), 12);
const isValid = await bcrypt.compare(prehash(userInput), safeHash);`}</code></pre>

      <h3>Mistake 5: Username Enumeration via Timing Differences</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';

// ❌ WRONG: Returns immediately for non-existent users
// An attacker can time the response to determine if a username exists:
// - Existing user: ~300ms (bcrypt runs)
// - Non-existent user: ~1ms (immediate return)
app.post('/login', async (req, res) => {
  const user = await db.findUser(req.body.username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' }); // Too fast!
  }
  const valid = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  // ...
});

// ✅ CORRECT: Always run bcrypt even for non-existent users
const DUMMY_HASH = '$2b$12$invalidhashfortimingatk1234567890123456789012345';

app.post('/login', async (req, res) => {
  const user = await db.findUser(req.body.username);
  const hashToCheck = user ? user.passwordHash : DUMMY_HASH;

  // Always runs bcrypt — takes ~300ms regardless of whether user exists
  const isValid = user && await bcrypt.compare(req.body.password, hashToCheck);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // ...
});`}</code></pre>

      <h3>Mistake 6: Storing Plaintext Passwords in Logs</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`// ❌ CATASTROPHIC: Never log passwords
app.post('/login', async (req, res) => {
  console.log('Login attempt:', req.body); // LOGS THE PASSWORD!
  console.log('Password:', req.body.password); // NEVER DO THIS
});

// ✅ CORRECT: Log only what you need, never the password
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for user:', username); // Safe
  const isValid = await bcrypt.compare(password, storedHash);
  console.log('Login result:', isValid ? 'success' : 'failure'); // Safe
});`}</code></pre>

      <h2>When to Use bcrypt vs When Not To</h2>

      <h3>Use bcrypt (or Argon2id) for:</h3>
      <ul>
        <li><strong>User account passwords</strong> &mdash; this is bcrypt&apos;s primary use case</li>
        <li><strong>API keys stored in databases</strong> &mdash; if you store user-provided API keys, hash them like passwords</li>
        <li><strong>Security tokens that must be looked up</strong> &mdash; password reset tokens, magic login links</li>
        <li><strong>PIN codes</strong> &mdash; 4&ndash;6 digit PINs have tiny search spaces; bcrypt&apos;s slowness is critical</li>
        <li><strong>Security questions</strong> (though security questions are generally poor practice)</li>
      </ul>

      <h3>Do NOT use bcrypt for:</h3>
      <ul>
        <li><strong>General-purpose data hashing</strong> &mdash; use SHA-256 for file integrity, ETags, cache keys</li>
        <li><strong>HMAC / API request signing</strong> &mdash; use HMAC-SHA256 instead (see our <Link href={`/${lang}/tools/hmac-generator`}>HMAC Generator</Link>)</li>
        <li><strong>Large data hashing</strong> &mdash; bcrypt has a 72-byte limit; use SHA-256 or SHA-3 for files</li>
        <li><strong>High-frequency hashing</strong> &mdash; bcrypt is too slow for use in caching layers or stream processing</li>
        <li><strong>Symmetric encryption</strong> &mdash; bcrypt is a hash function, not encryption; use AES-256-GCM</li>
        <li><strong>Key derivation for encryption</strong> &mdash; use PBKDF2, scrypt, or Argon2 with a proper KDF context</li>
        <li><strong>Token signing</strong> &mdash; use HMAC-SHA256 or RSA/ECDSA for JWTs</li>
      </ul>

      <h2>Password Strength Still Matters with bcrypt</h2>
      <p>
        bcrypt dramatically slows down attackers, but it is not a substitute for strong passwords. If a user chooses the password <code>password1</code>, an attacker who obtains the bcrypt hash can still crack it because the search space is so small. Here is the math:
      </p>
      <p>
        With bcrypt at cost 12, an attacker can attempt roughly 12,000 hashes per second on a modern GPU. The most common 10 million passwords can be tried in approximately <strong>14 minutes</strong>. A dictionary of 1 billion common passwords/patterns could be exhausted in about <strong>23 hours</strong>.
      </p>
      <p>
        A randomly generated 8-character password using lowercase only (26^8 &asymp; 208 billion combinations) would take about <strong>200 days</strong> at 12,000 hashes/second. A 12-character mixed-case alphanumeric password (62^12 &asymp; 3.2 x 10^21) would take over <strong>8 trillion years</strong>.
      </p>
      <p>
        This is why you need <strong>both</strong> bcrypt (or Argon2id) AND password strength requirements. Use our <Link href={`/${lang}/tools/password-generator`}>Password Generator Online</Link> to create strong, random passwords, and enforce minimum length and complexity requirements in your application.
      </p>

      <h2>Migrating from MD5 / SHA-256 to bcrypt</h2>
      <p>
        Many legacy applications store passwords as unsalted MD5 or SHA-256 hashes. Migrating these to bcrypt without forcing all users to reset their passwords requires a careful approach:
      </p>

      <h3>Strategy 1: Hash-on-Login Migration</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Add a column: hash_version ENUM('md5', 'sha256', 'bcrypt') NOT NULL DEFAULT 'md5'

async function legacyLogin(
  password: string,
  user: { id: string; passwordHash: string; hashVersion: string }
): Promise<boolean> {
  let isValid = false;

  if (user.hashVersion === 'bcrypt') {
    // Modern path: direct bcrypt compare
    isValid = await bcrypt.compare(password, user.passwordHash);
  } else if (user.hashVersion === 'sha256') {
    // Legacy SHA-256: compare then upgrade
    const sha256 = crypto.createHash('sha256').update(password).digest('hex');
    isValid = (sha256 === user.passwordHash);
  } else if (user.hashVersion === 'md5') {
    // Legacy MD5: compare then upgrade
    const md5 = crypto.createHash('md5').update(password).digest('hex');
    isValid = (md5 === user.passwordHash);
  }

  if (isValid && user.hashVersion !== 'bcrypt') {
    // Silently upgrade to bcrypt on next successful login
    const bcryptHash = await bcrypt.hash(password, 12);
    await db.users.update({
      id: user.id,
      passwordHash: bcryptHash,
      hashVersion: 'bcrypt',
    });
  }

  return isValid;
}`}</code></pre>

      <h3>Strategy 2: Double-Hash Bridge (No Migration Column Needed)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Wrap ALL existing MD5 hashes in bcrypt immediately (no user action required)
// Run this migration script ONCE against your database:

async function migrateMd5ToBcrypt(userId: string, existingMd5Hash: string) {
  // The MD5 hash becomes the "password" that bcrypt hashes
  // (md5 output is 32 hex chars, safely within bcrypt's 72-byte limit)
  const bcryptWrapped = await bcrypt.hash(existingMd5Hash, 12);
  await db.execute(
    'UPDATE users SET password_hash = ?, hash_version = ? WHERE id = ?',
    [bcryptWrapped, 'bcrypt_over_md5', userId]
  );
}

// Login verification for migrated users:
async function verifyMigratedUser(
  password: string,
  storedBcryptHash: string
): Promise<boolean> {
  // Re-compute the MD5 hash of the password, then bcrypt.compare
  const md5 = crypto.createHash('md5').update(password).digest('hex');
  return bcrypt.compare(md5, storedBcryptHash);
  // On next login, you can further migrate to pure bcrypt
}`}</code></pre>

      <h2>How to Use the Bcrypt Generator Online Tool</h2>
      <p>
        Our free <Link href={`/${lang}/tools/bcrypt-generator`}>Bcrypt Generator Online</Link> tool makes it easy to generate and verify bcrypt hashes directly in your browser without installing any software. Here is how to use it:
      </p>
      <ol>
        <li>
          <strong>Generate a hash</strong>: Enter the password or string you want to hash in the input field. Select your desired cost factor (10, 11, or 12 are most common). Click <strong>Generate Hash</strong>. The tool computes the bcrypt hash entirely in your browser using the WebAssembly bcrypt implementation &mdash; your password never leaves your device.
        </li>
        <li>
          <strong>Verify a hash</strong>: Paste an existing bcrypt hash into the Hash field, enter the password to test in the Password field, and click <strong>Verify</strong>. The tool will tell you whether the password matches the hash. This is useful for testing your application&apos;s hash generation, debugging authentication issues, or verifying hashes from external systems.
        </li>
        <li>
          <strong>Experiment with cost factors</strong>: Try generating the same password at cost 10, 11, and 12 to see how the hash changes (it will, due to the different salt and iterations) and observe the time difference in your browser.
        </li>
      </ol>
      <p>
        Use this tool alongside our <Link href={`/${lang}/tools/hash-generator`}>Hash Generator</Link> (for SHA-256, MD5, SHA-512) and <Link href={`/${lang}/tools/hmac-generator`}>HMAC Generator</Link> (for API signing) to cover all your cryptographic hashing needs.
      </p>

      <h2>bcrypt in Other Languages and Frameworks</h2>

      <h3>Java / Spring Boot</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`// Maven dependency:
// <dependency>
//   <groupId>org.springframework.security</groupId>
//   <artifactId>spring-security-crypto</artifactId>
// </dependency>

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// Cost factor 12 (Spring's default is 10; always specify explicitly)
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

String rawPassword = "my_secure_password";
String hashedPassword = encoder.encode(rawPassword);
// "$2a$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW"

boolean matches = encoder.matches(rawPassword, hashedPassword);
// true

// In Spring Security configuration:
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
}

// Spring Security uses this automatically for:
// userDetailsService.loadUserByUsername() → password check
// authenticationManager.authenticate() → login`}</code></pre>

      <h3>Ruby on Rails</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`# Gemfile
gem 'bcrypt', '~> 3.1.7'

# In your User model (has_secure_password uses bcrypt automatically)
class User < ApplicationRecord
  has_secure_password  # adds password_digest column, authenticate() method

  # Configure cost (default is 12 in bcrypt gem)
  # In config/environments/production.rb:
  # BCrypt::Engine.cost = 12
end

# Usage:
user = User.create(password: 'secure_password_123!')
# user.password_digest = "$2a$12$..."

user.authenticate('secure_password_123!')  # Returns user object (truthy)
user.authenticate('wrong_password')         # Returns false

# Direct bcrypt usage (without has_secure_password):
require 'bcrypt'

password = BCrypt::Password.create('my_password', cost: 12)
# "$2a$12$..."

password.is_password?('my_password')   # true
password.is_password?('wrong_pass')    # false`}</code></pre>

      <h3>Go</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`// go get golang.org/x/crypto/bcrypt

package main

import (
    "fmt"
    "golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
    // bcrypt.DefaultCost is 10; use 12 for OWASP recommendation
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
    if err != nil {
        return "", err
    }
    return string(bytes), nil
}

func verifyPassword(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil // nil means password matches
}

func main() {
    hash, err := hashPassword("my_secure_password")
    if err != nil {
        panic(err)
    }
    fmt.Println("Hash:", hash)

    fmt.Println("Valid:", verifyPassword("my_secure_password", hash))  // true
    fmt.Println("Invalid:", verifyPassword("wrong_password", hash))    // false

    // Get cost factor from existing hash
    cost, err := bcrypt.Cost([]byte(hash))
    if err != nil {
        panic(err)
    }
    fmt.Println("Cost factor:", cost) // 12
}`}</code></pre>

      <h2>Database Schema Best Practices for bcrypt</h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`-- PostgreSQL / MySQL: users table with bcrypt
CREATE TABLE users (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username       VARCHAR(50) UNIQUE NOT NULL,
    email          VARCHAR(255) UNIQUE NOT NULL,
    -- CHAR(60) is ideal: bcrypt output is always exactly 60 characters
    password_hash  CHAR(60) NOT NULL,
    -- Track hash version to support future algorithm upgrades
    hash_version   VARCHAR(20) NOT NULL DEFAULT 'bcrypt_12',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login     TIMESTAMPTZ,
    login_attempts INT NOT NULL DEFAULT 0,
    locked_until   TIMESTAMPTZ
);

-- Index for login lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- IMPORTANT: Never store the plaintext password.
-- Never index password_hash (it never needs to be queried directly).
-- Always query by username/email to find the user, THEN call bcrypt.compare().`}</code></pre>

      <h2>Rate Limiting and Brute-Force Protection</h2>
      <p>
        bcrypt makes individual hash attempts expensive, but it does not protect against distributed brute-force attacks where an attacker tries millions of passwords from thousands of different IP addresses. You need additional layers of protection:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

// 1. Rate limiting per IP address
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // Max 10 login attempts per IP per 15 min
  message: 'Too many login attempts, please try again later',
  store: new RedisStore({ /* redis client */ }), // Use Redis for distributed systems
});

app.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  // 2. Per-account lockout (database-level)
  const user = await db.findUserByEmail(email);
  if (!user) {
    await bcrypt.hash(password, 12); // Timing protection
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return res.status(423).json({
      error: 'Account temporarily locked',
      retryAfter: user.lockedUntil,
    });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    // 3. Increment failed attempt counter and lock if threshold exceeded
    const attempts = user.loginAttempts + 1;
    const lockUntil = attempts >= 5
      ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 min after 5 failures
      : null;

    await db.updateUser(user.id, {
      loginAttempts: attempts,
      lockedUntil: lockUntil,
    });

    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // 4. Reset counter on success
  await db.updateUser(user.id, {
    loginAttempts: 0,
    lockedUntil: null,
    lastLogin: new Date(),
  });

  const token = generateJWT(user);
  res.json({ token });
});`}</code></pre>

      <h2>Testing bcrypt in Your Application</h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em', lineHeight: 1.6 }}><code>{`import bcrypt from 'bcrypt';
import { describe, it, expect, beforeAll } from 'vitest';

describe('Password hashing', () => {
  // ✅ Use a LOW cost factor in tests (cost 4 = minimum) to avoid slow tests
  // NEVER use cost 4 in production!
  const TEST_COST = 4;

  it('should hash a password and return a bcrypt string', async () => {
    const hash = await bcrypt.hash('test_password', TEST_COST);
    expect(hash).toMatch(/^\$2b\$04\$/); // Starts with $2b$04$
    expect(hash).toHaveLength(60);       // Always 60 chars
  });

  it('should produce different hashes for the same password', async () => {
    const hash1 = await bcrypt.hash('same_password', TEST_COST);
    const hash2 = await bcrypt.hash('same_password', TEST_COST);
    expect(hash1).not.toBe(hash2); // Different salts
  });

  it('should verify correct passwords', async () => {
    const hash = await bcrypt.hash('correct_password', TEST_COST);
    const result = await bcrypt.compare('correct_password', hash);
    expect(result).toBe(true);
  });

  it('should reject wrong passwords', async () => {
    const hash = await bcrypt.hash('correct_password', TEST_COST);
    const result = await bcrypt.compare('wrong_password', hash);
    expect(result).toBe(false);
  });

  it('should verify a hash from a different cost factor', async () => {
    // Hashes generated with cost 10 should still verify correctly
    const legacyHash = await bcrypt.hash('my_password', 10);
    const result = await bcrypt.compare('my_password', legacyHash);
    expect(result).toBe(true);
  });

  // Tip: Mock bcrypt in integration tests that don't need real hashing
  // Use vi.mock('bcrypt', () => ({ hash: vi.fn().mockResolvedValue('$2b$fake...'), compare: vi.fn().mockResolvedValue(true) }))
});`}</code></pre>

      <h2>Related Tools and Further Reading</h2>
      <p>
        bcrypt is one piece of a comprehensive security toolkit. Explore these related tools on DevToolBox:
      </p>
      <ul>
        <li>
          <Link href={`/${lang}/tools/bcrypt-generator`}><strong>Bcrypt Generator Online</strong></Link> &mdash; generate and verify bcrypt hashes instantly in your browser.
        </li>
        <li>
          <Link href={`/${lang}/tools/hash-generator`}><strong>Hash Generator</strong></Link> &mdash; generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes. See our <Link href={`/${lang}/blog/hash-generator-online-guide`}>Hash Generator Guide</Link> for a detailed explanation of each algorithm.
        </li>
        <li>
          <Link href={`/${lang}/tools/password-generator`}><strong>Password Generator</strong></Link> &mdash; generate cryptographically strong random passwords to pair with bcrypt.
        </li>
        <li>
          <Link href={`/${lang}/tools/hmac-generator`}><strong>HMAC Generator</strong></Link> &mdash; generate HMAC-SHA256 codes for API signing and webhook verification.
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3 id="faq-what-is-bcrypt">What is bcrypt and why is it used for password hashing?</h3>
      <p>
        bcrypt is a password hashing function designed in 1999 by Niels Provos and David Mazieres. It is based on the Blowfish cipher&apos;s key scheduling algorithm and is intentionally designed to be slow and configurable &mdash; properties that are the opposite of what you want in a general-purpose hash function but exactly what you want for passwords. See the full answer above in &quot;What Is bcrypt?&quot;
      </p>

      <h3 id="faq-cost-factor">What cost factor should I use for bcrypt in 2026?</h3>
      <p>
        OWASP&apos;s 2023 recommendation is a minimum cost factor of <strong>10</strong>, with <strong>12</strong> being preferred. Benchmark on your production hardware: pick the highest cost that keeps per-hash time under 500ms for interactive login. Revisit every 1&ndash;2 years as hardware improves.
      </p>

      <h3 id="faq-verify">How do I verify a password against a bcrypt hash?</h3>
      <p>
        Use your library&apos;s built-in compare function: <code>bcrypt.compare()</code> in Node.js, <code>bcrypt.checkpw()</code> in Python, <code>password_verify()</code> in PHP, <code>BCryptPasswordEncoder.matches()</code> in Java. Never hash the input and compare strings directly &mdash; each bcrypt hash has a unique salt so re-hashing will always produce a different hash.
      </p>

      <h3 id="faq-vs-argon2">What is the difference between bcrypt, Argon2, and scrypt?</h3>
      <p>
        bcrypt uses CPU time only (no memory-hardness), has a 72-byte password limit, and is simplest to configure. Argon2id adds memory-hardness and parallelism for superior GPU/ASIC resistance, has no password limit, and is OWASP&apos;s 2023 first choice. scrypt adds memory-hardness but is harder to configure correctly. See the full comparison table above.
      </p>

      <h3 id="faq-safe-2026">Is bcrypt still safe in 2026?</h3>
      <p>
        Yes. No practical attacks against bcrypt&apos;s core algorithm have been found in 25+ years. The main concerns are the 72-byte password limit and that Argon2id offers better memory-hardness. For existing applications using bcrypt at cost 12, it remains safe. New applications should consider Argon2id.
      </p>

      <h3 id="faq-crack">Can bcrypt hashes be cracked?</h3>
      <p>
        bcrypt hashes cannot be reversed, but they can be cracked by guessing. The high cost factor makes this extremely slow: roughly 12,000 attempts/second at cost 12 on a GPU. Weak or common passwords remain vulnerable even with bcrypt. Strong, random passwords paired with bcrypt at cost 12 are effectively uncrackable with current technology.
      </p>

      <h3 id="faq-72-bytes">Why does bcrypt truncate at 72 bytes?</h3>
      <p>
        bcrypt&apos;s underlying Blowfish cipher processes the password in 18 four-byte words (72 bytes). Any bytes beyond position 72 are ignored. Mitigate by pre-hashing with SHA-256 (the 64-char hex output is always within the limit) or by using Argon2 which has no limit.
      </p>

      <h3 id="faq-migrate">How do I migrate from MD5/SHA-256 to bcrypt?</h3>
      <p>
        You cannot reverse old hashes, but you have two options: (1) <strong>Hash-on-login</strong>: when a user logs in, verify against the old hash, then immediately re-hash and store the bcrypt version; (2) <strong>Double-hash bridge</strong>: bcrypt-wrap all existing MD5/SHA-256 hashes immediately (the old hash becomes the input to bcrypt), then gradually migrate fully on next login. See the full code examples in the migration section above.
      </p>
    </>
  );
}
