'use client';

import Link from 'next/link';

export default function HashGeneratorOnlineGuide({ lang }: { lang: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a hash generator and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A hash generator is a tool that takes any input data (text, file, or binary) and produces a fixed-size output called a hash digest using a mathematical algorithm. The process is one-way, meaning you cannot reverse the hash to recover the original input. Hash generators typically support algorithms like MD5 (128-bit output), SHA-1 (160-bit), SHA-256 (256-bit), and SHA-512 (512-bit). The same input always produces the same hash, but even a tiny change in the input produces a completely different output (the avalanche effect).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between MD5, SHA-256, and SHA-512?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MD5 produces a 128-bit (32 hex character) hash and is very fast, but it has been cryptographically broken since 2004. SHA-256 produces a 256-bit (64 hex character) hash and is part of the SHA-2 family; it remains secure with no known practical attacks and is the most widely recommended algorithm for security applications. SHA-512 produces a 512-bit (128 hex character) hash, offers a larger security margin, and can be faster than SHA-256 on 64-bit processors. For security-critical applications, use SHA-256 or SHA-512. MD5 should only be used for non-security purposes like checksums and cache keys.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can a hash be reversed or decrypted?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Cryptographic hash functions are designed to be one-way functions (preimage resistant). Given a hash output, it is computationally infeasible to determine the original input. However, weak or short inputs (like common passwords) can be "cracked" by trying all possible inputs and comparing hashes (brute-force) or by using precomputed lookup tables (rainbow tables). This is why passwords must always be hashed with slow, salted, memory-hard algorithms like bcrypt, scrypt, or Argon2 rather than general-purpose hash functions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is MD5 still safe to use in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MD5 is NOT safe for any cryptographic or security purpose. Practical collision attacks can be performed in under a second on a modern laptop. MD5 should never be used for digital signatures, certificate validation, password hashing, or any context where an adversary could craft collisions. However, MD5 remains acceptable for non-security use cases: file checksums to detect accidental corruption (not malicious tampering), cache key generation, content deduplication in storage systems, ETag generation in HTTP caching, and hash table distribution. If there is any possibility of adversarial manipulation, choose SHA-256 instead.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is HMAC and when should I use it instead of a plain hash?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HMAC (Hash-based Message Authentication Code) combines a secret key with a hash function to produce an authentication code that verifies both the integrity and authenticity of a message. Use HMAC whenever you need to prove that a message was not tampered with AND that it was sent by someone who possesses the secret key. Common use cases include API request signing (used by AWS, Stripe, GitHub webhooks), JWT signature verification, cookie and session token validation, and webhook payload verification. Never use a plain hash like SHA-256(secret + message) for authentication because it is vulnerable to length extension attacks. HMAC-SHA256 is the industry standard.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I use bcrypt or Argon2 instead of SHA-256 for password hashing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SHA-256 is designed to be extremely fast, which is the opposite of what you want for password hashing. An attacker with a modern GPU can compute billions of SHA-256 hashes per second, making brute-force attacks on passwords practical. bcrypt, scrypt, and Argon2 are purpose-built password hashing functions that are intentionally slow and computationally expensive. bcrypt includes a configurable work factor that can be increased over time. scrypt adds memory-hardness to resist GPU attacks. Argon2 (winner of the 2015 Password Hashing Competition) provides configurable time cost, memory cost, and parallelism, making it resistant to both GPU and ASIC attacks. All three automatically handle salting.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I verify file integrity using hash checksums?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To verify file integrity: (1) Download the file and its published hash checksum (usually SHA-256) from the official source. (2) Compute the hash of the downloaded file using a hash generator tool or command line (sha256sum on Linux, shasum -a 256 on macOS, Get-FileHash on Windows). (3) Compare the computed hash with the published hash. If they match exactly, the file has not been corrupted or tampered with during transit. Many Linux distributions, software packages, and ISO images publish SHA-256 checksums for this purpose.',
        },
      },
      {
        '@type': 'Question',
        name: 'What hash algorithm does Bitcoin and blockchain use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bitcoin uses double SHA-256 (SHA-256 applied twice: SHA-256(SHA-256(data))) for block header hashing, transaction verification, and its proof-of-work mining algorithm. Miners must find a nonce value that, when combined with the block data and hashed with double SHA-256, produces a hash below a target threshold. Ethereum originally used Keccak-256 (a SHA-3 variant, not identical to the NIST SHA-3 standard) for its hashing. Other blockchains use different algorithms: Litecoin uses scrypt, Monero uses RandomX, and newer chains may use BLAKE2b or BLAKE3.',
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
          A <strong>hash generator</strong> converts any input into a fixed-size cryptographic fingerprint using algorithms like MD5, SHA-1, SHA-256, or SHA-512.
          Use <strong>SHA-256</strong> for security-critical applications (digital signatures, blockchain, file verification).
          Use <strong>bcrypt or Argon2</strong> for password hashing (never plain SHA-256).
          Use <strong>HMAC-SHA256</strong> for API authentication and message signing.
          MD5 is broken for security but acceptable for non-adversarial checksums.
          You can <Link href={`/${lang}/tools/hash-generator`}>generate hashes online</Link> instantly with our free tool, or use built-in libraries in JavaScript, Python, and Go.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>SHA-256</strong> is the gold standard for general-purpose cryptographic hashing with a 256-bit output and no known practical attacks.</li>
          <li><strong>SHA-512</strong> provides a larger 512-bit output and can outperform SHA-256 on 64-bit processors due to its native 64-bit word size.</li>
          <li><strong>MD5</strong> (128-bit) and <strong>SHA-1</strong> (160-bit) are cryptographically broken and must not be used for security purposes.</li>
          <li>For <strong>password hashing</strong>, always use bcrypt, scrypt, or Argon2 instead of general-purpose hash functions.</li>
          <li>Use <strong>HMAC</strong> (Hash-based Message Authentication Code) for API signing and webhook verification instead of plain hashing.</li>
          <li><strong>File integrity</strong> verification relies on comparing computed hash checksums against published values.</li>
          <li><strong>Blockchain</strong> technology is built on SHA-256 hashing for proof-of-work, block validation, and transaction Merkle trees.</li>
          <li>All major languages provide built-in hash libraries: Web Crypto API and <code>crypto</code> in JavaScript, <code>hashlib</code> in Python, <code>crypto/sha256</code> in Go.</li>
        </ul>
      </div>

      <h2>What Are Hash Functions? A Developer Primer</h2>
      <p>
        A <strong>hash function</strong> is a mathematical algorithm that accepts an input of arbitrary size and produces a fixed-size output called a <strong>hash value</strong>, <strong>hash digest</strong>, or simply a <strong>hash</strong>. The output is typically represented as a hexadecimal string. For instance, the SHA-256 hash of the word &quot;hello&quot; is always the 64-character hex string <code>2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824</code>, no matter when or where you compute it.
      </p>
      <p>
        Hash functions possess five critical properties that make them indispensable across computing. First, they are <strong>deterministic</strong>: the same input always yields the same output. Second, they produce a <strong>fixed-length output</strong> regardless of input size. Third, they are <strong>one-way</strong> (preimage resistant): given a hash, it is computationally infeasible to recover the original input. Fourth, they exhibit the <strong>avalanche effect</strong>: changing even a single bit in the input drastically alters the output. Fifth, strong hash functions are <strong>collision resistant</strong>: it is computationally infeasible to find two different inputs that produce the same hash.
      </p>
      <p>
        These properties enable a wide range of applications, from verifying downloaded files to securing passwords, signing digital certificates, powering blockchain consensus, and authenticating API requests. Understanding hash functions deeply is essential knowledge for every software developer, DevOps engineer, and security professional.
      </p>
      <p>
        If you need to quickly compute a hash, try our free <Link href={`/${lang}/tools/hash-generator`}>Hash Generator Online</Link> tool that supports MD5, SHA-1, SHA-256, SHA-384, and SHA-512.
      </p>

      <h2>Hash Algorithms Compared: MD5 vs SHA-1 vs SHA-256 vs SHA-512</h2>
      <p>
        Not all hash algorithms are created equal. Each has different output sizes, security guarantees, and performance characteristics. Choosing the right algorithm depends on your use case and threat model. Here is a detailed comparison of the four most widely used hash algorithms:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95em' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Algorithm</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Output Size</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Hex Chars</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Security Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Relative Speed</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Primary Use Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>MD5</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>128 bits</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>32</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Broken (2004)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Very Fast</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Legacy checksums, cache keys, ETags</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>SHA-1</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>160 bits</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>40</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Broken (2017)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Fast</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Git (legacy), TOTP, fingerprints</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>SHA-256</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>256 bits</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>64</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Secure</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Moderate</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Digital signatures, blockchain, TLS, file verification</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>SHA-512</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>512 bits</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>128</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Secure</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Moderate (fast on 64-bit)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>High-security apps, Ed25519 signatures</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>MD5 (Message Digest Algorithm 5)</h3>
      <p>
        MD5 was designed by Ronald Rivest in 1991 and produces a 128-bit (32 hex character) hash. It was the de facto standard for file checksums and digital signatures for over a decade. However, in 2004, Xiaoyun Wang and her team demonstrated practical collision attacks against MD5, finding two different inputs that produce the same hash. By 2008, researchers used MD5 collisions to create a rogue Certificate Authority certificate, and in 2012, the Flame malware exploited MD5 weaknesses in the Windows Update signing process. Today, MD5 collisions can be generated in under a second on commodity hardware. MD5 should never be used for any security purpose.
      </p>
      <p>
        Despite its cryptographic weakness, MD5 remains widely used for non-security purposes. It serves as a fast checksum for detecting accidental data corruption (not intentional tampering), as a cache key generator, for content-addressable storage deduplication, and for ETag generation in HTTP caching. In these contexts, the ability to craft collisions is not a meaningful threat because attackers have no incentive to create collisions against non-security checksums.
      </p>

      <h3>SHA-1 (Secure Hash Algorithm 1)</h3>
      <p>
        SHA-1 was designed by the NSA and published by NIST in 1995. It produces a 160-bit (40 hex character) hash. SHA-1 was widely adopted in SSL/TLS certificates, Git version control, and software signing. However, theoretical weaknesses were identified as early as 2005, and in 2017, Google and CWI Amsterdam published the SHAttered attack, demonstrating the first practical SHA-1 collision by creating two different PDF files with the same SHA-1 hash. Major browsers deprecated SHA-1 certificates in 2017.
      </p>
      <p>
        Git still uses SHA-1 as its object identifier by default, though it is transitioning to SHA-256 via the <code>object-format</code> option. TOTP (Time-based One-Time Passwords) in RFC 6238 defaults to HMAC-SHA1 for compatibility, though HMAC-SHA256 is recommended for new implementations. For any new project, avoid SHA-1 in favor of SHA-256 or SHA-512.
      </p>

      <h3>SHA-256 (SHA-2 Family, 256-bit)</h3>
      <p>
        SHA-256 is part of the SHA-2 family, designed by the NSA and published by NIST in 2001. It produces a 256-bit (64 hex character) hash. SHA-256 has no known practical attacks. Its collision resistance provides a 128-bit security level, meaning an attacker would need approximately 2^128 operations to find a collision (far beyond the capability of any foreseeable technology). SHA-256 is used in TLS/SSL certificates, Bitcoin mining, digital signatures, code signing, HMAC-SHA256 for API authentication, and compliance frameworks like FIPS 140-2, PCI-DSS, and HIPAA. It is the recommended default choice for virtually all hashing needs.
      </p>

      <h3>SHA-512 (SHA-2 Family, 512-bit)</h3>
      <p>
        SHA-512 produces a 512-bit (128 hex character) hash and operates on 64-bit words internally. This means SHA-512 can actually be faster than SHA-256 on 64-bit processors because it processes data in larger chunks. SHA-512 provides a 256-bit security level against collision attacks, offering a larger safety margin than SHA-256. It is used in Ed25519 digital signatures, high-security government applications, and situations where the extra security margin is desired. For most applications, SHA-256 provides sufficient security, but SHA-512 is the stronger choice when performance on 64-bit systems is not a concern or when maximum security is required.
      </p>

      <h3>Beyond SHA-2: SHA-3 and BLAKE3</h3>
      <p>
        <strong>SHA-3 (Keccak)</strong> was standardized by NIST in 2015 as a completely different design from SHA-2, using a sponge construction instead of Merkle-Damgard. SHA-3 is immune to length extension attacks by design and serves as a fallback if SHA-2 is ever compromised. <strong>BLAKE3</strong> is a recent (2020) hash function that is dramatically faster than SHA-256 (up to 15x on modern CPUs using SIMD) while providing 128-bit security against collisions. BLAKE3 is gaining adoption in build tools, content addressing, and high-throughput applications. Neither SHA-3 nor BLAKE3 are as widely supported in standard libraries as SHA-256, but both are excellent choices for new applications.
      </p>

      <h2>How Hash Functions Work Under the Hood</h2>
      <p>
        Understanding the internal mechanics of hash functions helps explain why they are so effective and what makes one algorithm more secure than another. Most widely used hash functions (MD5, SHA-1, SHA-256) follow the <strong>Merkle-Damgard construction</strong>, which processes data in three stages:
      </p>

      <h3>Step 1: Message Padding</h3>
      <p>
        The input message is padded so that its total length is a multiple of the block size. For SHA-256, the block size is 512 bits (64 bytes). Padding appends a <code>1</code> bit, then enough <code>0</code> bits, and finally a 64-bit representation of the original message length. This ensures that every input, regardless of size, is processed uniformly and that the padding itself does not create ambiguity between different inputs.
      </p>

      <h3>Step 2: Block Processing (Compression Function)</h3>
      <p>
        The padded message is divided into fixed-size blocks (512 bits for SHA-256, 1024 bits for SHA-512). Each block is processed through a <strong>compression function</strong> that combines the block data with the output from the previous block (called the <strong>chaining value</strong>). The first block uses a predefined <strong>initialization vector (IV)</strong>. The compression function applies multiple rounds of bitwise operations (AND, OR, XOR, NOT), modular addition, and bit rotations that thoroughly mix the data. SHA-256 uses 64 rounds per block. Each round uses a different round constant derived from the fractional parts of cube roots of the first 64 prime numbers, ensuring no regularities exist in the transformation.
      </p>

      <h3>Step 3: Final Hash Output</h3>
      <p>
        After all blocks have been processed, the final chaining value is the hash digest. For SHA-256, this is a 256-bit value (eight 32-bit words) typically displayed as a 64-character hexadecimal string. The entire process is deterministic, yet the cascading mixing makes it computationally infeasible to reverse-engineer the input or find collisions.
      </p>

      <h3>The Avalanche Effect in Practice</h3>
      <p>
        The avalanche effect is one of the most important properties of a good hash function. Even a single-bit change in the input produces a wildly different output. For example, consider the SHA-256 hashes of two nearly identical strings:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em' }}><code>{`SHA-256("hello")  = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
SHA-256("Hello")  = 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969
SHA-256("hello!") = ce06092fb948d9ffac7d1a376f7b656b7c35146188ee37c37a2b4e1b3b8b4140`}</code></pre>
      <p>
        Despite differing by only one character (capitalization or an added exclamation mark), every character of the 64-hex-digit output is completely different. This makes it impossible to infer anything about the input from the output or to predict how a change in the input will affect the hash.
      </p>

      <h2>Practical Use Cases for Hash Functions</h2>
      <p>
        Hash functions are used extensively across modern computing. Here are the most important real-world applications that every developer encounters:
      </p>

      <h3>1. File Integrity Verification (Checksums)</h3>
      <p>
        When you download software, the provider typically publishes a hash checksum (usually SHA-256) alongside the download link. After downloading, you compute the hash of the file and compare it with the published value. If they match, the file has not been corrupted during transit or tampered with at the distribution server. Linux distributions, ISO images, package managers (npm, pip, cargo), and security-critical software all use SHA-256 checksums. For example, verifying a downloaded file on Linux:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em' }}><code>{`# Download the file and its published checksum
wget https://example.com/software-v2.0.tar.gz
wget https://example.com/software-v2.0.tar.gz.sha256

# Verify the hash matches
sha256sum -c software-v2.0.tar.gz.sha256
# software-v2.0.tar.gz: OK`}</code></pre>

      <h3>2. Password Hashing and Storage</h3>
      <p>
        Responsible applications never store passwords in plain text. Instead, the password is processed through a hashing algorithm and only the hash is stored. When a user logs in, the application hashes the submitted password and compares it with the stored hash. However, using a general-purpose hash function like SHA-256 directly is insufficient because SHA-256 is designed to be fast. Attackers can compute billions of SHA-256 hashes per second on modern GPUs. Modern password hashing requires:
      </p>
      <ul>
        <li><strong>Salting</strong>: A unique random value (salt) is generated for each user and prepended to the password before hashing. This prevents rainbow table attacks and ensures identical passwords produce different hashes.</li>
        <li><strong>Slow algorithms</strong>: Purpose-built password hashing functions like <strong>bcrypt</strong>, <strong>scrypt</strong>, and <strong>Argon2</strong> are intentionally slow and memory-intensive to make brute-force attacks impractical.</li>
        <li><strong>Configurable cost</strong>: These algorithms allow you to increase the computational cost over time as hardware improves, keeping the hashing slow enough to deter attacks.</li>
      </ul>

      <h3>3. HMAC for API Authentication and Webhooks</h3>
      <p>
        <strong>HMAC (Hash-based Message Authentication Code)</strong> combines a secret key with a hash function to produce a code that verifies both the integrity and authenticity of a message. The construction is: <code>HMAC(K, m) = H((K XOR opad) || H((K XOR ipad) || m))</code>. HMAC is used by virtually every major API platform:
      </p>
      <ul>
        <li><strong>AWS Signature V4</strong>: Signs every API request with HMAC-SHA256</li>
        <li><strong>Stripe webhooks</strong>: Verifies webhook payloads using HMAC-SHA256</li>
        <li><strong>GitHub webhooks</strong>: Signs payloads with HMAC-SHA256 using a webhook secret</li>
        <li><strong>JWT tokens</strong>: Uses HMAC-SHA256 (HS256) for symmetric signing</li>
      </ul>
      <p>
        HMAC is essential because a plain hash like <code>SHA-256(secret + message)</code> is vulnerable to <strong>length extension attacks</strong> with Merkle-Damgard hash functions. An attacker who knows <code>SHA-256(secret + message)</code> can compute <code>SHA-256(secret + message + padding + attacker_data)</code> without knowing the secret. HMAC prevents this by design.
      </p>

      <h3>4. Digital Signatures and Certificates</h3>
      <p>
        Hash functions are the core of digital signature schemes. When signing a document, the signer first computes a hash of the document content, then encrypts that hash with their private key. The recipient decrypts with the public key and compares hashes to verify the signature. This approach is used in TLS/SSL certificates that secure HTTPS, code signing certificates for software distribution, email signing with S/MIME and PGP, PDF document signing, and Git commit signing with GPG keys.
      </p>

      <h3>5. Git Version Control</h3>
      <p>
        Git identifies every object (commit, tree, blob, tag) with a SHA-1 hash. Each commit ID is the SHA-1 hash of the commit content, parent hashes, author info, and timestamp. This creates a tamper-evident chain: modifying any past commit changes its hash and invalidates all subsequent commit hashes. Git is actively transitioning to SHA-256 as the default object format.
      </p>

      <h3>6. Blockchain and Cryptocurrency</h3>
      <p>
        Bitcoin uses <strong>double SHA-256</strong> (applying SHA-256 twice) for block header hashing and building Merkle trees of transactions. The proof-of-work mining algorithm requires finding a nonce that, when included in the block header and double-hashed, produces a value below a difficulty target. This process consumes enormous computational resources and secures the network. Ethereum uses Keccak-256 (a SHA-3 variant). Newer blockchains experiment with BLAKE2b, BLAKE3, and other modern hash functions for improved performance.
      </p>

      <h3>7. Data Deduplication and Content Addressing</h3>
      <p>
        Cloud storage systems (AWS S3, Google Cloud Storage), version control systems, and backup tools use hash functions to detect duplicate data without byte-by-byte comparison. Content-addressable storage (CAS) systems like IPFS use the hash of content as its address, meaning identical content always resolves to the same address. Docker uses SHA-256 digests to identify image layers, enabling efficient layer sharing across images.
      </p>

      <h2>Hash Generator Code Examples</h2>
      <p>
        Below are production-ready code examples for generating hashes in JavaScript, Python, and Go. Each example covers string hashing, file hashing, and HMAC generation.
      </p>

      <h3>JavaScript / Node.js Hash Generation</h3>
      <p>
        In the browser, use the <strong>Web Crypto API</strong>. In Node.js, use the built-in <code>crypto</code> module. Both support SHA-1, SHA-256, SHA-384, and SHA-512. The Node.js <code>crypto</code> module also supports MD5.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em' }}><code>{`// ========== Browser: Web Crypto API ==========

async function hashText(message, algorithm = 'SHA-256') {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Usage
await hashText('hello', 'SHA-256');
// "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"

await hashText('hello', 'SHA-512');
// "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2..."

// ========== Node.js: crypto module ==========

const crypto = require('crypto');

// String hashing (supports md5, sha1, sha256, sha512)
function hashString(input, algorithm = 'sha256') {
  return crypto.createHash(algorithm).update(input).digest('hex');
}

console.log(hashString('hello', 'md5'));
// "5d41402abc4b2a76b9719d911017c592"

console.log(hashString('hello', 'sha256'));
// "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"

// File hashing (streaming, memory-efficient)
const fs = require('fs');
function hashFile(filePath, algorithm = 'sha256') {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);
    stream.on('data', data => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

const fileHash = await hashFile('./package.json');

// HMAC-SHA256 for API signing
function hmacSign(message, secretKey) {
  return crypto.createHmac('sha256', secretKey)
    .update(message)
    .digest('hex');
}

const signature = hmacSign('payload-data', 'my-secret-key');

// Constant-time comparison (prevents timing attacks)
function verifyHmac(received, expected) {
  const a = Buffer.from(received, 'hex');
  const b = Buffer.from(expected, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}`}</code></pre>

      <h3>Python Hash Generation (hashlib, hmac)</h3>
      <p>
        Python provides the <code>hashlib</code> module for all common hash algorithms and the <code>hmac</code> module for HMAC generation. Both are part of the standard library.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em' }}><code>{`import hashlib
import hmac

# ========== String Hashing ==========
text = "hello"

md5_hash    = hashlib.md5(text.encode()).hexdigest()
sha1_hash   = hashlib.sha1(text.encode()).hexdigest()
sha256_hash = hashlib.sha256(text.encode()).hexdigest()
sha512_hash = hashlib.sha512(text.encode()).hexdigest()

print(f"MD5:    {md5_hash}")
# "5d41402abc4b2a76b9719d911017c592"
print(f"SHA-1:  {sha1_hash}")
# "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d"
print(f"SHA-256: {sha256_hash}")
# "2cf24dba5fb0a30e26e83b2ac5b9e29e..."
print(f"SHA-512: {sha512_hash}")
# "9b71d224bd62f3785d96d46ad3ea3d73..."

# ========== File Hashing (memory-efficient) ==========
def hash_file(filepath, algorithm='sha256'):
    h = hashlib.new(algorithm)
    with open(filepath, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            h.update(chunk)
    return h.hexdigest()

checksum = hash_file('document.pdf', 'sha256')
print(f"File SHA-256: {checksum}")

# Verify file integrity
def verify_file(filepath, expected_hash, algorithm='sha256'):
    actual = hash_file(filepath, algorithm)
    return hmac.compare_digest(actual, expected_hash)

# ========== HMAC-SHA256 ==========
secret_key = b'my-secret-key'
message = b'payload-data'

mac = hmac.new(secret_key, message, hashlib.sha256).hexdigest()
print(f"HMAC-SHA256: {mac}")

# Constant-time comparison (prevents timing attacks)
def verify_hmac(received_mac, expected_mac):
    return hmac.compare_digest(received_mac, expected_mac)

# ========== Password Hashing with bcrypt ==========
# pip install bcrypt
import bcrypt

password = b"my-secure-password"
salt = bcrypt.gensalt(rounds=12)
hashed = bcrypt.hashpw(password, salt)

# Verify password
is_valid = bcrypt.checkpw(password, hashed)
print(f"Password valid: {is_valid}")

# List available algorithms
print(hashlib.algorithms_available)`}</code></pre>

      <h3>Go Hash Generation (crypto packages)</h3>
      <p>
        Go provides hash support through the <code>crypto</code> standard library packages: <code>crypto/md5</code>, <code>crypto/sha1</code>, <code>crypto/sha256</code>, <code>crypto/sha512</code>, and <code>crypto/hmac</code>.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em' }}><code>{`package main

import (
    "crypto/hmac"
    "crypto/md5"
    "crypto/sha1"
    "crypto/sha256"
    "crypto/sha512"
    "encoding/hex"
    "fmt"
    "io"
    "os"
)

// ========== String Hashing ==========
func hashMD5(input string) string {
    h := md5.Sum([]byte(input))
    return hex.EncodeToString(h[:])
}

func hashSHA1(input string) string {
    h := sha1.Sum([]byte(input))
    return hex.EncodeToString(h[:])
}

func hashSHA256(input string) string {
    h := sha256.Sum256([]byte(input))
    return hex.EncodeToString(h[:])
}

func hashSHA512(input string) string {
    h := sha512.Sum512([]byte(input))
    return hex.EncodeToString(h[:])
}

// ========== File Hashing (streaming) ==========
func hashFileSHA256(filepath string) (string, error) {
    f, err := os.Open(filepath)
    if err != nil {
        return "", err
    }
    defer f.Close()

    h := sha256.New()
    if _, err := io.Copy(h, f); err != nil {
        return "", err
    }
    return hex.EncodeToString(h.Sum(nil)), nil
}

// ========== HMAC-SHA256 ==========
func hmacSHA256(message, secret string) string {
    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write([]byte(message))
    return hex.EncodeToString(mac.Sum(nil))
}

// Constant-time HMAC comparison
func verifyHMAC(message, receivedMAC, secret string) bool {
    expectedMAC := hmacSHA256(message, secret)
    return hmac.Equal(
        []byte(receivedMAC),
        []byte(expectedMAC),
    )
}

func main() {
    text := "hello"
    fmt.Println("MD5:    ", hashMD5(text))
    fmt.Println("SHA-1:  ", hashSHA1(text))
    fmt.Println("SHA-256:", hashSHA256(text))
    fmt.Println("SHA-512:", hashSHA512(text))

    // File hash
    hash, _ := hashFileSHA256("go.mod")
    fmt.Println("File SHA-256:", hash)

    // HMAC
    sig := hmacSHA256("payload", "secret-key")
    fmt.Println("HMAC-SHA256:", sig)
}`}</code></pre>

      <h2>Password Hashing: bcrypt, scrypt, and Argon2</h2>
      <p>
        General-purpose hash functions like SHA-256 are designed to be fast, which is precisely the wrong property for password hashing. A fast hash enables attackers to try billions of password guesses per second. Purpose-built password hashing functions address this by being intentionally slow and resource-intensive.
      </p>

      <h3>bcrypt</h3>
      <p>
        Based on the Blowfish cipher, bcrypt has been the go-to password hashing algorithm since 1999. It uses a configurable <strong>work factor</strong> (cost parameter) that doubles the computation time with each increment. A work factor of 12 takes roughly 250ms on modern hardware, making brute-force attacks impractical. bcrypt automatically generates and stores a 128-bit salt, produces a 184-bit hash, and encodes everything in a single portable string. It is supported by virtually every programming language and framework. The main limitation of bcrypt is a 72-byte password length limit and its vulnerability to GPU acceleration (though much less than SHA-256).
      </p>

      <h3>scrypt</h3>
      <p>
        Designed by Colin Percival in 2009, scrypt adds <strong>memory-hardness</strong> to the cost model. It requires a configurable amount of RAM to compute, making it expensive to parallelize on GPUs and ASICs, which have limited per-core memory. scrypt has three parameters: N (CPU/memory cost), r (block size), and p (parallelization). It is used as the proof-of-work algorithm in Litecoin and several other cryptocurrencies.
      </p>

      <h3>Argon2 (Recommended)</h3>
      <p>
        <strong>Argon2</strong> won the Password Hashing Competition in 2015 and is the current best practice for new applications. It provides three configurable dimensions: <strong>time cost</strong> (number of iterations), <strong>memory cost</strong> (kilobytes of RAM required), and <strong>parallelism</strong> (number of threads). Argon2 comes in three variants: <strong>Argon2d</strong> (data-dependent, highest GPU resistance), <strong>Argon2i</strong> (data-independent, resistant to side-channel attacks), and <strong>Argon2id</strong> (hybrid, recommended default). Argon2 handles salting automatically.
      </p>
      <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', padding: '16px 20px', marginBottom: '16px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', color: '#92400e' }}>Important Security Rule</p>
        <p style={{ margin: 0 }}>
          Never hash passwords with plain MD5, SHA-1, or SHA-256. Always use bcrypt (work factor 12+), scrypt, or Argon2id with appropriate cost parameters. These algorithms handle salting automatically. See our <Link href={`/${lang}/tools/bcrypt-generator`}>bcrypt Generator</Link> tool to experiment with different work factors.
        </p>
      </div>

      <h2>HMAC: Hash-Based Message Authentication</h2>
      <p>
        HMAC (Hash-based Message Authentication Code), defined in RFC 2104, combines a secret key with a hash function to create a message authentication code. Unlike a plain hash, HMAC proves that the message was created by someone who knows the secret key and has not been altered in transit. The construction prevents length extension attacks that affect naive <code>hash(key + message)</code> schemes.
      </p>
      <p>
        <strong>HMAC-SHA256</strong> is the industry standard for API authentication and webhook verification. Here is how major platforms use HMAC:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em' }}><code>{`// Verifying a GitHub webhook signature (Node.js)
const crypto = require('crypto');

function verifyGitHubWebhook(payload, signature, secret) {
  const expectedSig = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  // CRITICAL: Use constant-time comparison
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSig)
  );
}

// Verifying a Stripe webhook signature
function verifyStripeWebhook(payload, header, secret) {
  const [timestamp, sig] = parseStripeHeader(header);
  const signedPayload = timestamp + '.' + payload;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(sig),
    Buffer.from(expected)
  );
}`}</code></pre>
      <p>
        Try our <Link href={`/${lang}/tools/hmac-generator`}>HMAC Generator</Link> tool to experiment with different algorithms and keys.
      </p>

      <h2>Hashing in Blockchain Technology</h2>
      <p>
        Blockchain technology is fundamentally built on cryptographic hash functions. Understanding how hashing works in blockchain illuminates why hash functions are so important for distributed trust.
      </p>

      <h3>Block Hashing and Chain Integrity</h3>
      <p>
        Each block in a blockchain contains the hash of the previous block, creating a cryptographic chain. If anyone modifies the data in a historical block, its hash changes, which invalidates every subsequent block in the chain. This makes the blockchain tamper-evident. Bitcoin uses double SHA-256 for block headers, meaning the header is hashed with SHA-256, and then the result is hashed again with SHA-256.
      </p>

      <h3>Merkle Trees</h3>
      <p>
        Transactions within a block are organized in a <strong>Merkle tree</strong> (hash tree). Each leaf node is the hash of a transaction. Each parent node is the hash of its two children concatenated. The root of the tree (the Merkle root) is included in the block header. This structure enables efficient verification: you can prove a transaction is in a block by providing only log(N) hashes (a Merkle proof) instead of all N transactions.
      </p>

      <h3>Proof-of-Work Mining</h3>
      <p>
        Bitcoin mining involves finding a nonce value such that <code>SHA-256(SHA-256(block_header + nonce))</code> produces a hash with a specific number of leading zero bits. The number of required leading zeros determines the mining difficulty, which adjusts approximately every two weeks to maintain a 10-minute average block time. This process is computationally intensive by design, providing Sybil resistance and economic security.
      </p>

      <h2>Hash Security Best Practices for Developers</h2>
      <p>
        Knowing which algorithm to use is only half the battle. Applying hash functions correctly is equally critical. Here are essential best practices:
      </p>

      <h3>1. Choose the Right Algorithm for the Job</h3>
      <ul>
        <li><strong>File checksums (no adversary)</strong>: MD5 or SHA-256</li>
        <li><strong>File integrity (adversarial)</strong>: SHA-256 or SHA-512</li>
        <li><strong>Password hashing</strong>: bcrypt, scrypt, or Argon2id (never plain SHA-256)</li>
        <li><strong>API authentication</strong>: HMAC-SHA256</li>
        <li><strong>Digital signatures</strong>: SHA-256 or SHA-512 (with RSA, ECDSA, or Ed25519)</li>
        <li><strong>Content addressing</strong>: SHA-256 or BLAKE3</li>
        <li><strong>High-performance hashing</strong>: BLAKE3 or xxHash (non-cryptographic)</li>
      </ul>

      <h3>2. Always Use Constant-Time Comparison</h3>
      <p>
        When comparing hash values or HMAC signatures in code, never use <code>===</code> or <code>==</code> for string comparison. A naive comparison leaks information through timing: if the first character differs, it returns faster than if the first 30 characters match. An attacker can use this timing side-channel to reconstruct the expected hash byte by byte. Always use constant-time comparison functions:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9em' }}><code>{`// Node.js - constant time comparison
crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

# Python - constant time comparison
import hmac
hmac.compare_digest(a, b)

// Go - constant time comparison
import "crypto/subtle"
subtle.ConstantTimeCompare([]byte(a), []byte(b))`}</code></pre>

      <h3>3. Never Use Hash(secret + message) for Authentication</h3>
      <p>
        The naive construction <code>SHA-256(secret + message)</code> is vulnerable to <strong>length extension attacks</strong>. An attacker who knows the hash output (but not the secret) can compute <code>SHA-256(secret + message + padding + attacker_data)</code>. Always use HMAC instead. Note that SHA-3 (Keccak) is immune to length extension attacks by design, but HMAC is still the standard practice for interoperability.
      </p>

      <h3>4. Use Salts for All Password Hashing</h3>
      <p>
        A <strong>salt</strong> is a unique random value generated for each password hash. It is prepended (or appended) to the password before hashing and stored alongside the hash. Salting defeats rainbow table attacks (precomputed hash-to-password lookup tables) and ensures that two users with identical passwords have different stored hashes. bcrypt, scrypt, and Argon2 handle salting automatically.
      </p>

      <h3>5. Increase Work Factors Over Time</h3>
      <p>
        As hardware gets faster, password hashing work factors must increase. bcrypt work factor 10 was reasonable in 2010; today, work factor 12 or higher is recommended. Schedule periodic reviews (annually) to evaluate whether your password hashing parameters still provide adequate protection. When upgrading, rehash passwords on the next successful login.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What is a hash generator and how does it work?</h3>
      <p>
        A hash generator takes any input data and produces a fixed-size output called a hash digest. The process uses a mathematical algorithm (like SHA-256) that is deterministic (same input always gives the same output), one-way (cannot reverse the hash to get the input), and exhibits the avalanche effect (tiny input changes produce completely different outputs). Our <Link href={`/${lang}/tools/hash-generator`}>online hash generator</Link> supports MD5, SHA-1, SHA-256, SHA-384, and SHA-512.
      </p>

      <h3>What is the difference between MD5, SHA-256, and SHA-512?</h3>
      <p>
        MD5 produces a 128-bit hash and is cryptographically broken since 2004 (collisions can be generated in under a second). SHA-256 produces a 256-bit hash with no known practical attacks and is the recommended standard for security. SHA-512 produces a 512-bit hash, provides a larger security margin, and can be faster on 64-bit processors. For security applications, always use SHA-256 or SHA-512.
      </p>

      <h3>Can a hash be reversed or decrypted?</h3>
      <p>
        No. Cryptographic hash functions are one-way by design. However, short or weak inputs (like common passwords) can be found through brute-force attacks or rainbow table lookups. This is why passwords must be hashed with slow, salted algorithms like bcrypt or Argon2 rather than fast hash functions.
      </p>

      <h3>Is MD5 still safe to use in 2026?</h3>
      <p>
        MD5 is not safe for any cryptographic or security purpose. It is only acceptable for non-adversarial use cases like checksums for detecting accidental corruption, cache key generation, content deduplication, and ETag headers. If there is any chance of adversarial manipulation, use SHA-256 instead.
      </p>

      <h3>What is HMAC and when should I use it?</h3>
      <p>
        HMAC (Hash-based Message Authentication Code) combines a secret key with a hash function to verify both integrity and authenticity of a message. Use HMAC for API request signing, webhook payload verification, JWT token signing, and any scenario where you need to prove that data came from a trusted source and has not been modified. HMAC-SHA256 is the industry standard.
      </p>

      <h3>Why should I use bcrypt or Argon2 instead of SHA-256 for passwords?</h3>
      <p>
        SHA-256 is designed to be fast, enabling attackers to try billions of guesses per second on GPUs. bcrypt, scrypt, and Argon2 are intentionally slow and memory-intensive, making brute-force attacks impractical. Argon2id is the current recommendation for new applications. Try our <Link href={`/${lang}/tools/bcrypt-generator`}>bcrypt Generator</Link> to see the difference.
      </p>

      <h3>How do I verify file integrity using hash checksums?</h3>
      <p>
        Download the file and its published SHA-256 checksum. On Linux, run <code>sha256sum filename</code>. On macOS, use <code>shasum -a 256 filename</code>. On Windows, use <code>Get-FileHash filename</code> in PowerShell. Compare the output with the published checksum. If they match, the file is intact.
      </p>

      <h3>What hash algorithm does Bitcoin use?</h3>
      <p>
        Bitcoin uses double SHA-256 (applying SHA-256 twice) for block header hashing, proof-of-work mining, and Merkle tree construction. Ethereum uses Keccak-256. Litecoin uses scrypt. Different blockchains choose different hash functions based on their security and performance requirements.
      </p>

      <h2>Conclusion</h2>
      <p>
        Hash functions are a foundational pillar of modern computing and cybersecurity. From verifying downloaded files with SHA-256 checksums to securing passwords with Argon2, authenticating API requests with HMAC-SHA256, and powering blockchain consensus, understanding how to generate and apply hashes correctly is essential knowledge for every developer. Always use SHA-256 or stronger for security contexts, purpose-built algorithms for password hashing, HMAC for message authentication, and constant-time comparison to prevent timing attacks. Bookmark this guide for reference, and use our free online tools to generate hashes instantly.
      </p>
      <p>
        <Link href={`/${lang}/tools/hash-generator`} style={{ fontWeight: 600 }}>
          Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly with our free Hash Generator Online tool.
        </Link>
      </p>
    </>
  );
}
