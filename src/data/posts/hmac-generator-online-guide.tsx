'use client';

import Link from 'next/link';

const translations = {
  en: {
    tldrLabel: 'TL;DR',
    tldrText: 'HMAC (Hash-based Message Authentication Code) combines a secret key with a hash function to verify both the integrity and authenticity of a message. Use HMAC-SHA256 for API request signing, webhook verification (GitHub, Stripe), and JWT HS256 signatures. Never use a plain hash like SHA-256(secret + message) — it is vulnerable to length extension attacks. Always use constant-time comparison to prevent timing attacks. Try our free online HMAC generator, or follow the code examples below for Node.js, Browser Web Crypto API, Python, and Go.',
    keyTakeawaysLabel: 'Key Takeaways',
    takeaway1: 'HMAC requires a secret key — unlike a plain hash, it proves authenticity (only someone with the key could have created it).',
    takeaway2: 'HMAC-SHA256 is the industry standard for webhook verification, API signing, and JWT HS256 — never use HMAC-MD5 or HMAC-SHA1 for new systems.',
    takeaway3: 'Never construct HMAC manually as SHA-256(key + message) — this naive construction is vulnerable to length extension attacks.',
    takeaway4: 'Always use constant-time comparison (timingSafeEqual, hmac.compare_digest, hmac.Equal) when verifying HMAC signatures to prevent timing attacks.',
    takeaway5: 'Secret keys should be at minimum 32 random bytes (256 bits) — never use passwords directly as HMAC keys without key derivation.',
    takeaway6: 'HMAC-SHA512 provides a larger security margin but longer output; use it for high-security contexts where 64-byte signatures are acceptable.',
    takeaway7: 'HKDF (HMAC-based Key Derivation Function) is the recommended way to derive purpose-specific keys from a master secret.',
    takeaway8: 'AWS Signature Version 4 uses a chain of HMAC-SHA256 computations to derive signing keys — understanding HMAC is essential for AWS SDK internals.',
    faq1Q: 'What is HMAC and how is it different from a regular hash?',
    faq1A: 'HMAC (Hash-based Message Authentication Code) is a keyed-hash construction defined in RFC 2104. Unlike a plain hash (e.g., SHA-256("data")), HMAC takes both a message and a secret key as input: HMAC(K, m) = H((K ⊕ opad) || H((K ⊕ ipad) || m)). This construction provides two properties that a plain hash cannot: (1) authenticity — only someone who knows the secret key can produce the correct HMAC, and (2) integrity — any modification to the message changes the HMAC output. Plain hashes only verify integrity if the hash itself is kept secret, which requires a separate channel. HMAC is used for webhook verification (GitHub, Stripe), API request signing, JWT HS256 signatures, and cookie/session token validation.',
    faq2Q: 'Why should I not use SHA-256(secret + message) instead of HMAC?',
    faq2A: 'The naive construction SHA-256(secret || message) is vulnerable to a length extension attack against SHA-2 family hash functions (SHA-256, SHA-512). An attacker who knows SHA-256(secret || message) and the length of the secret can compute SHA-256(secret || message || attacker_data) without knowing the secret key. This is because SHA-2 uses a Merkle-Damgard construction where the internal state can be resumed. HMAC specifically prevents this by applying two rounds of hashing with different key padding (ipad and opad), making the internal state inaccessible. SHA-3 (sponge construction) and BLAKE3 are not vulnerable to length extension attacks, but HMAC-SHA256 remains the standard.',
    faq3Q: 'What is a timing attack and why do I need constant-time comparison?',
    faq3A: 'A timing attack exploits the fact that string comparison with === (or strcmp) returns early as soon as it finds a mismatch. An attacker can measure tiny differences in response time (microseconds to milliseconds) to determine how many bytes of their guessed signature match the correct one, eventually recovering the full signature. This allows signature forgery without the secret key. Constant-time comparison functions (crypto.timingSafeEqual in Node.js, hmac.compare_digest in Python, hmac.Equal in Go) always compare every byte before returning, making the comparison time independent of the data. Always use these functions when comparing HMAC signatures in security-sensitive code.',
    faq4Q: 'What is the minimum recommended key length for HMAC?',
    faq4A: 'RFC 2104 recommends that the HMAC key be at least as long as the hash output. For HMAC-SHA256, that is 32 bytes (256 bits). For HMAC-SHA512, that is 64 bytes (512 bits). In practice, use at least 32 cryptographically random bytes for any HMAC key. Never use human-memorable passwords directly as HMAC keys — passwords have far less entropy than random bytes. If you must derive a key from a password or passphrase, use a proper key derivation function: HKDF for key expansion, PBKDF2 (600,000+ iterations), bcrypt, scrypt, or Argon2 for password-based KDF. Keys should be rotated periodically and stored in a secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.).',
    faq5Q: 'What is the difference between HMAC-SHA256, HMAC-SHA512, HMAC-SHA1, and HMAC-MD5?',
    faq5A: 'HMAC-SHA256 produces a 32-byte (256-bit) signature, provides 128-bit security level, and is the current industry standard. HMAC-SHA512 produces a 64-byte (512-bit) signature, provides 256-bit security level, and is faster than HMAC-SHA256 on 64-bit processors due to SHA-512 using 64-bit operations. HMAC-SHA1 produces a 20-byte signature — while HMAC-SHA1 itself is not broken (unlike raw SHA-1), it provides only 80-bit security and should not be used for new systems. HMAC-MD5 produces a 16-byte signature — again, HMAC construction protects against MD5 collision attacks, but HMAC-MD5 provides only 64-bit security and is deprecated. For new systems, always choose HMAC-SHA256 or HMAC-SHA512.',
    faq6Q: 'How does GitHub webhook verification work with HMAC?',
    faq6A: 'When you configure a GitHub webhook, you provide a secret string. GitHub computes HMAC-SHA256 of the raw request body using your secret as the key, then sends the result in the X-Hub-Signature-256 header as "sha256=<hex-digest>". Your server must: (1) extract the X-Hub-Signature-256 header, (2) compute HMAC-SHA256 of the raw request body using your shared secret, (3) prepend "sha256=" to your computed digest, (4) compare the two strings using a constant-time comparison function. You must use the raw, unparsed request body — parsing JSON first changes whitespace and field ordering. The verification fails if the webhook secret is wrong, if you use the parsed body, or if you use a non-constant-time comparison.',
    faq7Q: 'What is JWT HS256 and how does it relate to HMAC?',
    faq7A: 'JWT (JSON Web Token) with the HS256 algorithm uses HMAC-SHA256 to sign the token. The JWT structure is: base64url(header) + "." + base64url(payload) + "." + base64url(HMAC-SHA256(secret, base64url(header) + "." + base64url(payload))). The "HS" in HS256 stands for HMAC-SHA256. HS384 uses HMAC-SHA384, HS512 uses HMAC-SHA512. All parties that need to verify the JWT must share the same secret key, which is why HS256 is called a symmetric algorithm. This is appropriate for internal microservices sharing a common secret, but for external parties (third-party APIs), use RS256 (RSA-based asymmetric signing) so you can share the public key without revealing the private key.',
    faq8Q: 'How does AWS Signature Version 4 use HMAC-SHA256?',
    faq8A: 'AWS Signature Version 4 (SigV4) uses a chain of HMAC-SHA256 computations to derive a signing key from four inputs: your AWS secret key, the date, the region, and the service name. The derivation is: kDate = HMAC-SHA256("AWS4" + secret_key, date); kRegion = HMAC-SHA256(kDate, region); kService = HMAC-SHA256(kRegion, service); kSigning = HMAC-SHA256(kService, "aws4_request"). The final request signature is then: HMAC-SHA256(kSigning, string_to_sign), where string_to_sign includes the hashed canonical request. This chained derivation means the signing key is specific to the date/region/service combination, limiting the blast radius if a derived key is compromised.',
  },
  zh: {
    tldrLabel: 'TL;DR（快速总结）',
    tldrText: 'HMAC（基于哈希的消息认证码）将密钥与哈希函数结合，同时验证消息的完整性和真实性。使用 HMAC-SHA256 进行 API 请求签名、Webhook 验证（GitHub、Stripe）和 JWT HS256 签名。绝不要使用 SHA-256(secret + message) 的朴素构造——它容易受到长度扩展攻击。验证时务必使用常量时间比较来防止时序攻击。试试我们的免费在线 HMAC 生成器，或参照下方 Node.js、浏览器 Web Crypto API、Python 和 Go 代码示例。',
    keyTakeawaysLabel: '核心要点',
    takeaway1: 'HMAC 需要密钥——与普通哈希不同，它能证明真实性（只有持有密钥的人才能生成正确的 HMAC）。',
    takeaway2: 'HMAC-SHA256 是 Webhook 验证、API 签名和 JWT HS256 的行业标准——新系统不要使用 HMAC-MD5 或 HMAC-SHA1。',
    takeaway3: '永远不要将 HMAC 手动构造为 SHA-256(key + message)——这种朴素构造容易受到长度扩展攻击。',
    takeaway4: '验证 HMAC 签名时务必使用常量时间比较（Node.js 的 timingSafeEqual、Python 的 compare_digest、Go 的 hmac.Equal）以防止时序攻击。',
    takeaway5: '密钥至少应为 32 个随机字节（256 位）——不要直接使用密码作为 HMAC 密钥，需先进行密钥派生。',
    takeaway6: 'HMAC-SHA512 提供更大的安全裕量但输出更长；在可接受 64 字节签名的高安全性场景中使用。',
    takeaway7: 'HKDF（基于 HMAC 的密钥派生函数）是从主密钥派生特定用途密钥的推荐方式。',
    takeaway8: 'AWS 签名版本 4 使用一系列 HMAC-SHA256 计算来派生签名密钥——理解 HMAC 对于掌握 AWS SDK 内部原理至关重要。',
    faq1Q: 'HMAC 是什么？它与普通哈希有何不同？',
    faq1A: 'HMAC（基于哈希的消息认证码）是 RFC 2104 定义的带密钥哈希构造。与普通哈希（如 SHA-256("data")）不同，HMAC 同时接受消息和密钥作为输入。这种构造提供了普通哈希无法实现的两个属性：真实性（只有知道密钥的人才能生成正确的 HMAC）和完整性（对消息的任何修改都会改变 HMAC 输出）。HMAC 广泛用于 Webhook 验证（GitHub、Stripe）、API 请求签名、JWT HS256 签名和 Cookie/会话令牌验证。',
    faq2Q: '为什么不能用 SHA-256(secret + message) 代替 HMAC？',
    faq2A: '朴素构造 SHA-256(secret || message) 容易受到针对 SHA-2 系列哈希函数的长度扩展攻击。知道 SHA-256(secret || message) 和密钥长度的攻击者，无需知道密钥就能计算 SHA-256(secret || message || 攻击者数据)。HMAC 通过对密钥使用不同的填充（ipad 和 opad）进行两轮哈希来防止这种攻击。',
    faq3Q: '什么是时序攻击？为什么需要常量时间比较？',
    faq3A: '时序攻击利用 === 字符串比较在发现不匹配时会提前返回的特性。攻击者可以测量响应时间的微小差异来判断猜测签名与正确签名匹配了多少字节，最终在不知道密钥的情况下恢复完整签名。常量时间比较函数（Node.js 的 crypto.timingSafeEqual、Python 的 hmac.compare_digest、Go 的 hmac.Equal）在返回前始终比较每个字节，使比较时间与数据无关。',
    faq4Q: 'HMAC 密钥的最低推荐长度是多少？',
    faq4A: 'RFC 2104 建议 HMAC 密钥至少与哈希输出一样长。对于 HMAC-SHA256，即 32 字节（256 位）；对于 HMAC-SHA512，即 64 字节（512 位）。实际上，任何 HMAC 密钥都应使用至少 32 个密码学随机字节。不要直接将密码用作 HMAC 密钥。密钥应定期轮换并存储在密钥管理系统中（AWS Secrets Manager、HashiCorp Vault 等）。',
    faq5Q: 'HMAC-SHA256、HMAC-SHA512、HMAC-SHA1 和 HMAC-MD5 有何区别？',
    faq5A: 'HMAC-SHA256 生成 32 字节（256 位）签名，提供 128 位安全级别，是当前行业标准。HMAC-SHA512 生成 64 字节（512 位）签名，提供 256 位安全级别，在 64 位处理器上比 HMAC-SHA256 更快。HMAC-SHA1 仅提供 80 位安全性，新系统不应使用。HMAC-MD5 仅提供 64 位安全性，已被弃用。新系统始终选择 HMAC-SHA256 或 HMAC-SHA512。',
    faq6Q: 'GitHub Webhook 验证如何使用 HMAC？',
    faq6A: '配置 GitHub Webhook 时，您提供一个密钥字符串。GitHub 使用该密钥计算原始请求体的 HMAC-SHA256，并将结果作为 "sha256=<十六进制摘要>" 发送在 X-Hub-Signature-256 请求头中。您的服务器必须：(1) 提取 X-Hub-Signature-256 请求头，(2) 使用共享密钥计算原始请求体的 HMAC-SHA256，(3) 在计算结果前加上 "sha256="，(4) 使用常量时间比较函数比较两个字符串。必须使用原始未解析的请求体——先解析 JSON 会改变空白字符和字段顺序。',
    faq7Q: 'JWT HS256 是什么？它与 HMAC 有何关系？',
    faq7A: '使用 HS256 算法的 JWT（JSON Web Token）使用 HMAC-SHA256 对令牌进行签名。JWT 结构为：base64url(header) + "." + base64url(payload) + "." + base64url(HMAC-SHA256(secret, header.payload))。HS256 中的 "HS" 代表 HMAC-SHA256。所有需要验证 JWT 的方都必须共享同一个密钥，这就是 HS256 被称为对称算法的原因。对于外部方（第三方 API），使用 RS256（基于 RSA 的非对称签名）更合适。',
    faq8Q: 'AWS 签名版本 4 如何使用 HMAC-SHA256？',
    faq8A: 'AWS 签名版本 4（SigV4）使用一系列 HMAC-SHA256 计算从四个输入派生签名密钥：AWS 密钥、日期、区域和服务名称。派生链为：kDate = HMAC-SHA256("AWS4" + secret_key, date)；kRegion = HMAC-SHA256(kDate, region)；kService = HMAC-SHA256(kRegion, service)；kSigning = HMAC-SHA256(kService, "aws4_request")。最终签名为：HMAC-SHA256(kSigning, string_to_sign)。这种链式派生确保签名密钥特定于日期/区域/服务组合。',
  },
};

export default function HmacGeneratorOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is HMAC and how is it different from a regular hash?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HMAC (Hash-based Message Authentication Code) is a keyed-hash construction defined in RFC 2104. Unlike a plain hash (e.g., SHA-256("data")), HMAC takes both a message and a secret key as input: HMAC(K, m) = H((K ⊕ opad) || H((K ⊕ ipad) || m)). This construction provides two properties that a plain hash cannot: (1) authenticity — only someone who knows the secret key can produce the correct HMAC, and (2) integrity — any modification to the message changes the HMAC output. HMAC is used for webhook verification (GitHub, Stripe), API request signing, JWT HS256 signatures, and cookie/session token validation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I not use SHA-256(secret + message) instead of HMAC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The naive construction SHA-256(secret || message) is vulnerable to a length extension attack against SHA-2 family hash functions. An attacker who knows SHA-256(secret || message) and the length of the secret can compute SHA-256(secret || message || attacker_data) without knowing the secret key. HMAC specifically prevents this by applying two rounds of hashing with different key padding (ipad and opad). Always use an HMAC library, never construct it manually.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a timing attack and why do I need constant-time comparison?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A timing attack exploits the fact that string comparison with === returns early as soon as it finds a mismatch. An attacker can measure tiny differences in response time to determine how many bytes of their guessed signature match the correct one, eventually recovering the full signature without the secret key. Constant-time comparison functions (crypto.timingSafeEqual in Node.js, hmac.compare_digest in Python, hmac.Equal in Go) always compare every byte before returning, making the comparison time independent of the data values.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the minimum recommended key length for HMAC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RFC 2104 recommends that the HMAC key be at least as long as the hash output. For HMAC-SHA256, that is 32 bytes (256 bits). For HMAC-SHA512, that is 64 bytes (512 bits). Use cryptographically random bytes generated by crypto.randomBytes() or os.urandom(). Never use human-memorable passwords directly as HMAC keys without key derivation. Keys should be stored in a secrets manager and rotated periodically.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between HMAC-SHA256, HMAC-SHA512, HMAC-SHA1, and HMAC-MD5?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HMAC-SHA256 produces a 32-byte signature with 128-bit security — the current industry standard. HMAC-SHA512 produces a 64-byte signature with 256-bit security and can be faster on 64-bit processors. HMAC-SHA1 provides only 80-bit security and should not be used for new systems. HMAC-MD5 provides only 64-bit security and is deprecated. For new systems, always choose HMAC-SHA256 or HMAC-SHA512.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does GitHub webhook verification work with HMAC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When you configure a GitHub webhook with a secret, GitHub computes HMAC-SHA256 of the raw request body and sends it in the X-Hub-Signature-256 header as "sha256=<hex-digest>". Your server must compute HMAC-SHA256 of the raw body using your shared secret and compare the result using constant-time comparison. You must use the raw, unparsed request body — parsing JSON first changes whitespace and field ordering which breaks the verification.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is JWT HS256 and how does it relate to HMAC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JWT HS256 uses HMAC-SHA256 to sign the token. The signature covers base64url(header) + "." + base64url(payload). HS384 uses HMAC-SHA384, HS512 uses HMAC-SHA512. Since all parties must share the same secret key, HS256 is a symmetric algorithm — suitable for internal microservices. For external parties, use RS256 (asymmetric RSA signing) so you can share the public key without exposing the private key.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does AWS Signature Version 4 use HMAC-SHA256?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AWS SigV4 derives a signing key through a chain of HMAC-SHA256 operations: kDate = HMAC-SHA256("AWS4" + secret_key, date); kRegion = HMAC-SHA256(kDate, region); kService = HMAC-SHA256(kRegion, service); kSigning = HMAC-SHA256(kService, "aws4_request"). The final signature is HMAC-SHA256(kSigning, string_to_sign). This chained derivation scopes the signing key to a specific date/region/service, limiting impact if a derived key is compromised.',
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

      <link rel="canonical" href="https://viadreams.cc/en/blog/hmac-generator-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>{t.tldrLabel}</p>
        <p style={{ margin: 0 }}>
          {t.tldrText.split('free online HMAC generator')[0]}
          <Link href={`/${lang}/tools/hmac-generator`} style={{ color: '#0284c7' }}>
            free online HMAC generator
          </Link>
          {t.tldrText.split('free online HMAC generator')[1] || ''}
        </p>
      </div>

      {/* Section 1: What Is HMAC */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        What Is HMAC? Hash-based Message Authentication Code Explained
      </h2>
      <p>
        <strong>HMAC (Hash-based Message Authentication Code)</strong> is a cryptographic construction defined in{' '}
        <strong>RFC 2104</strong> that combines a secret key with a hash function to produce a message authentication code.
        While a plain hash like SHA-256 verifies only <em>integrity</em> (detecting accidental or deliberate data corruption),
        HMAC verifies both <em>integrity</em> and <em>authenticity</em> — proving that the message was created by someone
        who possesses the secret key.
      </p>
      <p>
        The formal definition of HMAC is:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`HMAC(K, m) = H((K' ⊕ opad) || H((K' ⊕ ipad) || m))

Where:
  K  = secret key (padded or hashed to block size as K')
  m  = the message to authenticate
  H  = hash function (SHA-256, SHA-512, etc.)
  ⊕  = XOR operation
  || = concatenation
  ipad = 0x36 repeated to block size (inner padding)
  opad = 0x5C repeated to block size (outer padding)

The double-hashing with different paddings prevents:
  - Length extension attacks (common with naive key || message constructions)
  - Related-key attacks
  - Weak key attacks`}</code></pre>
      <p>
        The two rounds of hashing with distinct key pads (ipad for the inner hash, opad for the outer hash) are what make
        HMAC provably secure even when the underlying hash function has certain weaknesses. This is why HMAC-SHA256 remained
        secure even as researchers found vulnerabilities in SHA-2 variants — the construction itself adds security beyond
        the underlying hash.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        The Two Core Properties HMAC Provides
      </h3>
      <ul>
        <li>
          <strong>Message integrity</strong>: Any modification to the message — even a single bit — produces a completely
          different HMAC output. The receiver can detect tampering by recomputing the HMAC and comparing.
        </li>
        <li>
          <strong>Message authenticity</strong>: Only a party that knows the secret key can produce the correct HMAC for
          a given message. This is fundamentally different from a plain hash — anyone can compute SHA-256("hello"), but
          only the key-holder can compute HMAC-SHA256(secret_key, "hello") correctly.
        </li>
      </ul>
      <p>
        Note what HMAC does <em>not</em> provide: it does not provide <strong>non-repudiation</strong> (since both
        sender and receiver share the same key, either could have created the HMAC) and it does not provide{' '}
        <strong>confidentiality</strong> (the message is not encrypted). For non-repudiation, use digital signatures
        (RSA, ECDSA, Ed25519). For confidentiality, use authenticated encryption (AES-GCM, ChaCha20-Poly1305).
      </p>

      {/* Section 2: HMAC vs Hash vs Digital Signature */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        HMAC vs Hash vs Digital Signature — Comparison Table
      </h2>
      <p>
        Understanding when to use each cryptographic primitive is essential. Here is a comprehensive comparison:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Property</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Plain Hash (SHA-256)</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>HMAC-SHA256</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Digital Signature (RSA/ECDSA)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Key required?</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No (anyone can compute)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Yes (symmetric secret key)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Yes (private key to sign, public key to verify)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Verifies integrity</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Verifies authenticity</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes (symmetric)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes (asymmetric)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Non-repudiation</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No (both parties share key)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes (only private key owner can sign)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Key distribution</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>N/A</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Requires secure out-of-band key sharing</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Public key can be shared openly</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Performance</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Very fast</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Very fast (~2x hash)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#ca8a04' }}>Slower (RSA: ~1000x slower than hash)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Common use cases</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>File checksums, content addressing</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>API signing, webhooks, JWT HS256, session tokens</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>TLS certificates, code signing, JWT RS256</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Length extension attack</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Vulnerable (SHA-2)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Not vulnerable</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Not vulnerable</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 3: HMAC Algorithms */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        HMAC Algorithm Variants — SHA256, SHA512, SHA1, MD5
      </h2>
      <p>
        HMAC is a construction, not a specific algorithm — it can be used with any hash function. The security of
        HMAC depends on both the hash function and the key length:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Algorithm</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Output Size</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Security Level</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>HMAC-SHA256</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>32 bytes (256 bits)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>128-bit</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Recommended</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Webhooks, API signing, JWT HS256, AWS SigV4</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>HMAC-SHA512</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>64 bytes (512 bits)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>256-bit</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Recommended (high security)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>High-security APIs, JWT HS512, long-term keys</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>HMAC-SHA384</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>48 bytes (384 bits)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>192-bit</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Acceptable</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>JWT HS384, intermediate security needs</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>HMAC-SHA1</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>20 bytes (160 bits)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>80-bit</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#ca8a04' }}>Deprecated (legacy only)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>TOTP (RFC 4226), legacy OAuth 1.0 — avoid for new systems</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>HMAC-MD5</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>16 bytes (128 bits)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>64-bit</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Do not use</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Legacy systems only — never for new code</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        A key insight: HMAC-SHA1 and HMAC-MD5 are <em>not broken in the same way</em> as raw SHA-1 and MD5. The HMAC
        construction prevents collision attacks from being directly applicable. However, their small output sizes (80-bit
        and 64-bit security respectively) make them insufficiently secure against modern brute-force attacks. Stick with
        HMAC-SHA256 or HMAC-SHA512.
      </p>

      {/* Section 4: Node.js crypto module */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript — Node.js crypto Module
      </h2>
      <p>
        Node.js provides built-in HMAC support via the <code>crypto</code> module. The <code>createHmac</code> function
        returns an HMAC object that supports streaming (chunked) input via <code>.update()</code>.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import crypto from 'crypto';

// --- Basic HMAC-SHA256 ---
function hmacSha256(secret: string, message: string): string {
  return crypto.createHmac('sha256', secret)
    .update(message, 'utf8')
    .digest('hex');
}

const signature = hmacSha256('my-secret-key-32-bytes-minimum!!', 'payload data');
console.log(signature);
// => "a6b4f7c9d2e1..." (64 hex chars = 32 bytes)

// --- HMAC-SHA256 with Base64 encoding ---
function hmacSha256Base64(secret: string, message: string): string {
  return crypto.createHmac('sha256', secret)
    .update(message)
    .digest('base64');
}

// --- HMAC-SHA512 ---
function hmacSha512(secret: string, message: string): string {
  return crypto.createHmac('sha512', secret)
    .update(message, 'utf8')
    .digest('hex');
}

// --- Streaming HMAC (for large payloads) ---
import { createReadStream } from 'fs';

async function hmacFile(secret: string, filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hmac = crypto.createHmac('sha256', secret);
    const stream = createReadStream(filePath);
    stream.on('data', chunk => hmac.update(chunk));
    stream.on('end', () => resolve(hmac.digest('hex')));
    stream.on('error', reject);
  });
}

// --- CRITICAL: Constant-time comparison to prevent timing attacks ---
function verifyHmac(
  secret: string,
  message: string,
  receivedSignature: string
): boolean {
  const expected = hmacSha256(secret, message);
  // Both buffers must have the same length for timingSafeEqual
  // If lengths differ, they can't be equal anyway — but we still
  // must not leak timing information about which byte failed
  const expectedBuf = Buffer.from(expected, 'hex');
  let receivedBuf: Buffer;
  try {
    receivedBuf = Buffer.from(receivedSignature, 'hex');
  } catch {
    return false;
  }
  if (expectedBuf.length !== receivedBuf.length) {
    return false; // lengths differ — definitely not equal
  }
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
  // NEVER use: expected === receivedSignature (vulnerable to timing attack)
}

// --- Generate a cryptographically random HMAC key ---
function generateHmacKey(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
  // 32 bytes = 64 hex chars = 256 bits of entropy
}

const key = generateHmacKey(32);
console.log(\`Generated key: \${key}\`);`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Node.js — HMAC with Binary Keys
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import crypto from 'crypto';

// Keys can be strings, Buffers, or KeyObjects
// Using a Buffer key (raw bytes, not hex string)
const rawKey = crypto.randomBytes(32); // 32-byte Buffer
const hmac = crypto.createHmac('sha256', rawKey);
hmac.update('message to authenticate');
const sig = hmac.digest('hex');

// KeyObject API (Node.js 15+) — more explicit key handling
const key = crypto.createSecretKey(rawKey);
const hmac2 = crypto.createHmac('sha256', key);
hmac2.update('message');
const sig2 = hmac2.digest('hex');

// Multiple update() calls — useful for structured data
function hmacStructuredPayload(
  secret: string,
  method: string,
  path: string,
  timestamp: string,
  body: string
): string {
  const hmac = crypto.createHmac('sha256', secret);
  // Update with each field separately — equivalent to concatenated string
  hmac.update(method);
  hmac.update('\\n');
  hmac.update(path);
  hmac.update('\\n');
  hmac.update(timestamp);
  hmac.update('\\n');
  hmac.update(body);
  return hmac.digest('hex');
}`}</code></pre>

      {/* Section 5: Browser Web Crypto API */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript — Browser Web Crypto API (SubtleCrypto)
      </h2>
      <p>
        The <strong>Web Crypto API</strong> is available natively in all modern browsers (Chrome 37+, Firefox 34+,
        Safari 11+, Edge 12+) and in Node.js 18+ as <code>globalThis.crypto.subtle</code>. It uses{' '}
        <code>SubtleCrypto.sign()</code> for HMAC generation and <code>SubtleCrypto.verify()</code> for verification.
        All operations return Promises and use <code>ArrayBuffer</code> for binary data.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Web Crypto API — works in all modern browsers and Node.js 18+
// No dependencies required!

// Helper: ArrayBuffer to hex string
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Helper: ArrayBuffer to base64 string
function bufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

// --- HMAC-SHA256 sign ---
async function hmacSha256Sign(
  secret: string,
  message: string
): Promise<string> {
  const encoder = new TextEncoder();

  // Step 1: Import the key
  const key = await crypto.subtle.importKey(
    'raw',                           // key format
    encoder.encode(secret),          // key material as ArrayBuffer
    { name: 'HMAC', hash: 'SHA-256' }, // algorithm descriptor
    false,                           // not extractable
    ['sign']                         // key usage
  );

  // Step 2: Sign the message
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message)
  );

  return bufferToHex(signature);
}

// Usage
const sig = await hmacSha256Sign('my-secret-key', 'hello world');
console.log(sig); // => "3b5f..." (64 hex chars)

// --- HMAC-SHA256 verify (built-in constant-time comparison!) ---
async function hmacSha256Verify(
  secret: string,
  message: string,
  signatureHex: string
): Promise<boolean> {
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']                       // key usage: verify
  );

  // Convert hex signature back to ArrayBuffer
  const sigBytes = new Uint8Array(
    signatureHex.match(/.{2}/g)!.map(b => parseInt(b, 16))
  );

  // SubtleCrypto.verify() uses constant-time comparison internally!
  return crypto.subtle.verify(
    'HMAC',
    key,
    sigBytes,
    encoder.encode(message)
  );
}

// --- HMAC-SHA512 (just change the hash parameter) ---
async function hmacSha512Sign(
  secret: string,
  message: string
): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-512' }, // <-- SHA-512 here
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return bufferToHex(sig);
}

// --- Reuse imported keys for performance ---
// Importing a key is relatively expensive — cache it when signing many messages
async function createHmacSigner(secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );

  return {
    sign: async (message: string): Promise<string> => {
      const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
      return bufferToHex(sig);
    },
    verify: async (message: string, sigHex: string): Promise<boolean> => {
      const sigBytes = new Uint8Array(sigHex.match(/.{2}/g)!.map(b => parseInt(b, 16)));
      return crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(message));
    }
  };
}

const signer = await createHmacSigner('my-secret-key');
const sig1 = await signer.sign('message 1');
const sig2 = await signer.sign('message 2');
const valid = await signer.verify('message 1', sig1); // => true`}</code></pre>

      {/* Section 6: Python */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python — hmac Module
      </h2>
      <p>
        Python&apos;s built-in <code>hmac</code> module provides HMAC generation and constant-time comparison via{' '}
        <code>hmac.compare_digest()</code>. Unlike Node.js&apos;s streaming API, Python&apos;s HMAC object also
        supports chunked updates via the <code>.update()</code> method, compatible with the hashlib API.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import hmac
import hashlib
import os
import secrets

# --- Basic HMAC-SHA256 ---
def hmac_sha256(secret: bytes, message: bytes) -> str:
    """Compute HMAC-SHA256 and return hex digest."""
    h = hmac.new(secret, message, hashlib.sha256)
    return h.hexdigest()

# Usage — note: both secret and message must be bytes
secret = b"my-secret-key-32-bytes-minimum!!"
message = b"payload data"

signature = hmac_sha256(secret, message)
print(signature)  # => "a6b4..." (64 hex chars)

# --- HMAC-SHA512 ---
def hmac_sha512(secret: bytes, message: bytes) -> str:
    h = hmac.new(secret, message, hashlib.sha512)
    return h.hexdigest()

# --- HMAC with string inputs (encode to bytes) ---
def hmac_sha256_str(secret: str, message: str) -> str:
    return hmac_sha256(secret.encode('utf-8'), message.encode('utf-8'))

# --- Base64 output ---
import base64

def hmac_sha256_base64(secret: bytes, message: bytes) -> str:
    h = hmac.new(secret, message, hashlib.sha256)
    return base64.b64encode(h.digest()).decode()

# --- Streaming / chunked update ---
def hmac_sha256_chunked(secret: bytes, chunks: list[bytes]) -> str:
    h = hmac.new(secret, digestmod=hashlib.sha256)
    for chunk in chunks:
        h.update(chunk)
    return h.hexdigest()

# For large files:
def hmac_file(secret: bytes, filepath: str) -> str:
    h = hmac.new(secret, digestmod=hashlib.sha256)
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

# --- CRITICAL: Constant-time comparison ---
def verify_hmac(secret: bytes, message: bytes, received: str) -> bool:
    """Verify HMAC using constant-time comparison."""
    expected = hmac_sha256(secret, message)
    # hmac.compare_digest prevents timing attacks
    # It compares byte-by-byte in constant time
    return hmac.compare_digest(expected, received)
    # NEVER use: expected == received  (timing attack vulnerable!)

# --- Generate a cryptographically random key ---
def generate_key(length: int = 32) -> bytes:
    """Generate a cryptographically secure random HMAC key."""
    return secrets.token_bytes(length)
    # OR: return os.urandom(length)

key = generate_key(32)
print(key.hex())  # => 64 hex chars (256-bit key)

# --- Practical example: API request signing ---
import time
import json

def sign_api_request(
    secret: bytes,
    method: str,
    path: str,
    body: str = ""
) -> dict[str, str]:
    timestamp = str(int(time.time()))
    payload = f"{method}\\n{path}\\n{timestamp}\\n{body}"
    signature = hmac_sha256(secret, payload.encode('utf-8'))
    return {
        "X-Timestamp": timestamp,
        "X-Signature": signature,
    }

headers = sign_api_request(
    secret=b"api-signing-secret-key-32bytes!!",
    method="POST",
    path="/api/v1/orders",
    body=json.dumps({"qty": 1, "item": "widget"})
)
print(headers)`}</code></pre>

      {/* Section 7: Go */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Go — crypto/hmac Package
      </h2>
      <p>
        Go&apos;s standard library provides the <code>crypto/hmac</code> package with <code>hmac.New()</code> for creation
        and <code>hmac.Equal()</code> for constant-time comparison. The package follows Go&apos;s io.Writer interface,
        allowing streaming updates.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "crypto/hmac"
    "crypto/rand"
    "crypto/sha256"
    "crypto/sha512"
    "encoding/hex"
    "fmt"
    "io"
    "os"
    "time"
)

// --- Basic HMAC-SHA256 ---
func HmacSha256(secret, message []byte) string {
    mac := hmac.New(sha256.New, secret)
    mac.Write(message)
    return hex.EncodeToString(mac.Sum(nil))
}

// --- HMAC-SHA512 ---
func HmacSha512(secret, message []byte) string {
    mac := hmac.New(sha512.New, secret)
    mac.Write(message)
    return hex.EncodeToString(mac.Sum(nil))
}

// --- CRITICAL: Constant-time HMAC verification ---
func VerifyHmacSha256(secret, message []byte, receivedHex string) bool {
    expected := HmacSha256(secret, message)
    receivedBytes, err := hex.DecodeString(receivedHex)
    if err != nil {
        return false
    }
    expectedBytes, _ := hex.DecodeString(expected)
    // hmac.Equal uses constant-time comparison (subtle.ConstantTimeCompare)
    return hmac.Equal(expectedBytes, receivedBytes)
    // NEVER use: expected == receivedHex  (timing attack vulnerable!)
}

// --- Streaming HMAC for large data ---
func HmacSha256Stream(secret []byte, reader io.Reader) (string, error) {
    mac := hmac.New(sha256.New, secret)
    if _, err := io.Copy(mac, reader); err != nil {
        return "", fmt.Errorf("hmac stream error: %w", err)
    }
    return hex.EncodeToString(mac.Sum(nil)), nil
}

// --- File HMAC ---
func HmacFile(secret []byte, path string) (string, error) {
    f, err := os.Open(path)
    if err != nil {
        return "", err
    }
    defer f.Close()
    return HmacSha256Stream(secret, f)
}

// --- Generate cryptographically random key ---
func GenerateKey(size int) ([]byte, error) {
    key := make([]byte, size)
    if _, err := rand.Read(key); err != nil {
        return nil, fmt.Errorf("key generation failed: %w", err)
    }
    return key, nil
}

// --- API request signing pattern ---
func SignRequest(secret []byte, method, path, body string) (string, string) {
    timestamp := fmt.Sprintf("%d", time.Now().Unix())
    payload := fmt.Sprintf("%s\\n%s\\n%s\\n%s", method, path, timestamp, body)
    mac := hmac.New(sha256.New, secret)
    mac.Write([]byte(payload))
    return timestamp, hex.EncodeToString(mac.Sum(nil))
}

func main() {
    // Generate a secure key
    key, err := GenerateKey(32)
    if err != nil {
        panic(err)
    }
    fmt.Printf("Key: %s\\n", hex.EncodeToString(key))

    // Sign a message
    sig := HmacSha256(key, []byte("hello, world"))
    fmt.Printf("HMAC-SHA256: %s\\n", sig)

    // Verify
    valid := VerifyHmacSha256(key, []byte("hello, world"), sig)
    fmt.Printf("Valid: %v\\n", valid) // => true

    // Tampered message
    invalid := VerifyHmacSha256(key, []byte("hello, world!"), sig)
    fmt.Printf("Tampered: %v\\n", invalid) // => false

    // API signing
    ts, requestSig := SignRequest(key, "POST", "/api/orders", \`{"qty":1}\`)
    fmt.Printf("Timestamp: %s\\nSignature: %s\\n", ts, requestSig)
}`}</code></pre>

      {/* Section 8: GitHub Webhook Verification */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        GitHub Webhook Verification — Complete Implementation
      </h2>
      <p>
        GitHub webhooks are one of the most common real-world applications of HMAC. When a repository event occurs
        (push, pull request, release, etc.), GitHub sends an HTTP POST request to your endpoint with the payload
        signed using HMAC-SHA256.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// GitHub Webhook Verification — Node.js/Express
import crypto from 'crypto';
import express from 'express';

const app = express();

// CRITICAL: Use express.raw() to get the raw body buffer
// express.json() or body-parser would parse and re-serialize JSON,
// changing whitespace and field ordering which breaks HMAC verification
app.use('/webhook', express.raw({ type: 'application/json' }));

app.post('/webhook', (req, res) => {
  const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET!;

  // 1. Get the signature GitHub sent
  const githubSignature = req.headers['x-hub-signature-256'] as string;
  if (!githubSignature) {
    return res.status(401).json({ error: 'Missing X-Hub-Signature-256 header' });
  }

  // 2. Compute HMAC-SHA256 of the raw body
  const rawBody = req.body; // Buffer (because of express.raw())
  const computedHmac = crypto.createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');
  const computedSignature = \`sha256=\${computedHmac}\`;

  // 3. Constant-time comparison — prevent timing attacks
  const sigBuf = Buffer.from(githubSignature, 'utf8');
  const computedBuf = Buffer.from(computedSignature, 'utf8');

  if (sigBuf.length !== computedBuf.length) {
    return res.status(401).json({ error: 'Signature length mismatch' });
  }

  if (!crypto.timingSafeEqual(sigBuf, computedBuf)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // 4. Signature valid — process the event
  const event = req.headers['x-github-event'];
  const payload = JSON.parse(rawBody.toString('utf8'));

  console.log(\`GitHub event: \${event}, repo: \${payload.repository?.full_name}\`);

  res.status(200).json({ received: true });
});`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# GitHub Webhook Verification — Python (Flask)
import hmac
import hashlib
import os
from flask import Flask, request, abort, jsonify

app = Flask(__name__)

def verify_github_webhook(payload_body: bytes, signature_header: str | None) -> bool:
    """Verify that the webhook payload was sent from GitHub."""
    if not signature_header:
        return False

    webhook_secret = os.environ.get('GITHUB_WEBHOOK_SECRET', '').encode('utf-8')

    # Compute expected HMAC-SHA256
    expected_sig = 'sha256=' + hmac.new(
        webhook_secret,
        payload_body,
        hashlib.sha256
    ).hexdigest()

    # Constant-time comparison
    return hmac.compare_digest(expected_sig, signature_header)

@app.route('/webhook', methods=['POST'])
def github_webhook():
    # Use request.data (raw bytes), NOT request.json (parsed dict)
    payload_body = request.data
    signature = request.headers.get('X-Hub-Signature-256')

    if not verify_github_webhook(payload_body, signature):
        abort(401, 'Invalid webhook signature')

    event = request.headers.get('X-GitHub-Event')
    import json
    payload = json.loads(payload_body)

    print(f"GitHub event: {event}, repo: {payload.get('repository', {}).get('full_name')}")
    return jsonify({'received': True})`}</code></pre>

      {/* Section 9: AWS Signature v4 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        AWS Signature Version 4 — HMAC-SHA256 Chain
      </h2>
      <p>
        AWS Signature Version 4 (SigV4) is one of the most sophisticated real-world HMAC applications. It uses a
        chain of HMAC-SHA256 operations to derive a signing key that is scoped to a specific date, region, and service.
        Understanding this helps with debugging AWS SDK authentication issues.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import crypto from 'crypto';

// AWS Signature Version 4 — HMAC-SHA256 key derivation chain
// This is what the AWS SDK does internally for every request

function hmacSha256(key: Buffer | string, data: string): Buffer {
  return crypto.createHmac('sha256', key).update(data, 'utf8').digest();
}

function sha256Hex(data: string): string {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  service: string;
}

function deriveSigningKey(
  credentials: AwsCredentials,
  dateString: string  // format: YYYYMMDD
): Buffer {
  // 4-step HMAC-SHA256 key derivation
  const kDate    = hmacSha256('AWS4' + credentials.secretAccessKey, dateString);
  const kRegion  = hmacSha256(kDate, credentials.region);
  const kService = hmacSha256(kRegion, credentials.service);
  const kSigning = hmacSha256(kService, 'aws4_request');
  return kSigning;
}

function signRequest(
  credentials: AwsCredentials,
  method: string,
  canonicalUri: string,
  canonicalQueryString: string,
  headers: Record<string, string>,
  body: string
): string {
  const now = new Date();
  const dateString = now.toISOString().slice(0, 10).replace(/-/g, '');  // YYYYMMDD
  const datetimeString = now.toISOString().replace(/[:-]/g, '').slice(0, 15) + 'Z';  // YYYYMMDDTHHmmssZ

  // Step 1: Canonical request
  const signedHeaders = Object.keys(headers).sort().join(';');
  const canonicalHeaders = Object.entries(headers)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => \`\${k.toLowerCase()}:\${v.trim()}\\n\`)
    .join('');
  const payloadHash = sha256Hex(body);
  const canonicalRequest = [
    method, canonicalUri, canonicalQueryString,
    canonicalHeaders, signedHeaders, payloadHash
  ].join('\\n');

  // Step 2: String to sign
  const credentialScope = \`\${dateString}/\${credentials.region}/\${credentials.service}/aws4_request\`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    datetimeString,
    credentialScope,
    sha256Hex(canonicalRequest)
  ].join('\\n');

  // Step 3: Signing key (derived from the HMAC chain)
  const signingKey = deriveSigningKey(credentials, dateString);

  // Step 4: Final HMAC-SHA256 signature
  const signature = crypto.createHmac('sha256', signingKey)
    .update(stringToSign, 'utf8')
    .digest('hex');

  return \`AWS4-HMAC-SHA256 Credential=\${credentials.accessKeyId}/\${credentialScope}, SignedHeaders=\${signedHeaders}, Signature=\${signature}\`;
}`}</code></pre>

      {/* Section 10: JWT HS256 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JWT HS256 — HMAC-SHA256 Token Signing
      </h2>
      <p>
        JWT (JSON Web Token) with the HS256 algorithm uses HMAC-SHA256 to sign the token. The &ldquo;HS&rdquo; prefix
        indicates HMAC-SHA256; HS384 uses HMAC-SHA384; HS512 uses HMAC-SHA512. Here is the complete implementation
        from scratch to understand exactly how it works:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import crypto from 'crypto';

// JWT HS256 from scratch — understanding the internals
// (In production, use a library like jose or jsonwebtoken)

function base64UrlEncode(data: string | Buffer): string {
  const b64 = Buffer.from(data).toString('base64');
  return b64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(b64url: string): Buffer {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '='.repeat((4 - b64.length % 4) % 4);
  return Buffer.from(padded, 'base64');
}

interface JwtPayload {
  sub?: string;
  name?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

function createJwt(secret: string, payload: JwtPayload): string {
  const header = { alg: 'HS256', typ: 'JWT' };

  // Add issued-at time if not present
  if (!payload.iat) {
    payload = { ...payload, iat: Math.floor(Date.now() / 1000) };
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = \`\${encodedHeader}.\${encodedPayload}\`;

  // HMAC-SHA256 of the signing input (header.payload)
  const signature = crypto.createHmac('sha256', secret)
    .update(signingInput, 'utf8')
    .digest();

  return \`\${signingInput}.\${base64UrlEncode(signature)}\`;
}

function verifyJwt(
  secret: string,
  token: string
): { valid: boolean; payload?: JwtPayload; error?: string } {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Invalid JWT format' };
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const signingInput = \`\${encodedHeader}.\${encodedPayload}\`;

  // Recompute expected HMAC
  const expectedSig = crypto.createHmac('sha256', secret)
    .update(signingInput, 'utf8')
    .digest();
  const receivedSig = base64UrlDecode(encodedSignature);

  // Constant-time comparison
  if (expectedSig.length !== receivedSig.length) {
    return { valid: false, error: 'Signature length mismatch' };
  }
  if (!crypto.timingSafeEqual(expectedSig, receivedSig)) {
    return { valid: false, error: 'Invalid signature' };
  }

  // Decode and validate payload
  const payload = JSON.parse(base64UrlDecode(encodedPayload).toString('utf8')) as JwtPayload;

  // Check expiration
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    return { valid: false, error: 'Token expired' };
  }

  return { valid: true, payload };
}

// Usage
const secret = 'my-jwt-secret-key-32-bytes-min!!';
const token = createJwt(secret, {
  sub: 'user123',
  name: 'Alice',
  exp: Math.floor(Date.now() / 1000) + 3600  // 1 hour
});

console.log(\`JWT: \${token}\`);
// => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIi4uLn0.abc123..."

const result = verifyJwt(secret, token);
console.log(result);
// => { valid: true, payload: { sub: 'user123', name: 'Alice', ... } }`}</code></pre>

      {/* Section 11: API Authentication Headers */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        HMAC in HTTP API Authentication Headers
      </h2>
      <p>
        Many APIs (Stripe, Twilio, Shopify, AWS, Bitbucket) use HMAC for request signing instead of sending API keys
        in headers. The canonical pattern includes the timestamp to prevent replay attacks:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import crypto from 'crypto';

// --- HMAC-based API Client (sending signed requests) ---
class HmacApiClient {
  constructor(
    private readonly apiKeyId: string,
    private readonly apiSecret: string,
    private readonly baseUrl: string
  ) {}

  private sign(method: string, path: string, body: string, timestamp: string): string {
    // Include method, path, timestamp, and body hash in the signed payload
    const bodyHash = crypto.createHash('sha256').update(body).digest('hex');
    const payload = [method.toUpperCase(), path, timestamp, bodyHash].join('\\n');
    return crypto.createHmac('sha256', this.apiSecret).update(payload).digest('hex');
  }

  async request(method: string, path: string, body?: object): Promise<Response> {
    const timestamp = Date.now().toString();
    const bodyString = body ? JSON.stringify(body) : '';
    const signature = this.sign(method, path, bodyString, timestamp);

    return fetch(this.baseUrl + path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKeyId,
        'X-Timestamp': timestamp,
        'X-Signature': signature,
        // Alternative: put all in Authorization header
        // 'Authorization': \`HMAC-SHA256 keyId="\${this.apiKeyId}",timestamp="\${timestamp}",signature="\${signature}"\`
      },
      body: bodyString || undefined,
    });
  }
}

// --- HMAC-based API Server (verifying incoming requests) ---
function createHmacVerifyMiddleware(secretResolver: (keyId: string) => Promise<string>) {
  return async (req: Request, keyId: string): Promise<boolean> => {
    const timestamp = req.headers.get('X-Timestamp');
    const receivedSig = req.headers.get('X-Signature');

    if (!timestamp || !receivedSig) return false;

    // Replay attack prevention: reject requests older than 5 minutes
    const requestAge = Date.now() - parseInt(timestamp);
    if (requestAge > 5 * 60 * 1000 || requestAge < -60 * 1000) {
      return false; // Clock skew tolerance: ±1 minute
    }

    const secret = await secretResolver(keyId);
    const body = await req.text();
    const bodyHash = crypto.createHash('sha256').update(body).digest('hex');
    const url = new URL(req.url);
    const payload = [req.method, url.pathname, timestamp, bodyHash].join('\\n');

    const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    const expectedBuf = Buffer.from(expectedSig);
    const receivedBuf = Buffer.from(receivedSig);

    if (expectedBuf.length !== receivedBuf.length) return false;
    return crypto.timingSafeEqual(expectedBuf, receivedBuf);
  };
}`}</code></pre>

      {/* Section 12: Security Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Security Best Practices for HMAC
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        1. Key Management
      </h3>
      <ul>
        <li>
          <strong>Minimum key length</strong>: 32 cryptographically random bytes (256 bits) for HMAC-SHA256.
          RFC 2104 requires the key to be at least as long as the hash output size.
        </li>
        <li>
          <strong>Use a CSPRNG</strong>: Generate keys with <code>crypto.randomBytes(32)</code> (Node.js),{' '}
          <code>secrets.token_bytes(32)</code> (Python), or <code>crypto/rand</code> (Go). Never use{' '}
          <code>Math.random()</code> or <code>random.random()</code>.
        </li>
        <li>
          <strong>Store in secrets manager</strong>: AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager,
          or Azure Key Vault. Never hardcode secrets in source code or store in environment variables in production.
        </li>
        <li>
          <strong>Key rotation</strong>: Implement a key rotation strategy. During rotation, accept signatures from
          both old and new keys for a transition period (e.g., 24 hours), then retire the old key.
        </li>
        <li>
          <strong>Never use passwords directly</strong>: If you must derive a key from a password, use HKDF, PBKDF2
          (600,000+ iterations with SHA-256), scrypt, or Argon2. Plain passwords have much less entropy than random bytes.
        </li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        2. Always Use Constant-Time Comparison
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// WRONG — vulnerable to timing attack
if (computedSig === receivedSig) { ... }         // JavaScript
if computed_sig == received_sig:                  # Python
if computedSig == receivedSig { ... }             // Go

// CORRECT — constant-time comparison
crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))  // Node.js
hmac.compare_digest(a, b)                               # Python
hmac.Equal([]byte(a), []byte(b))                        // Go
crypto.subtle.verify('HMAC', key, sig, data)            // Browser`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        3. Prevent Replay Attacks with Timestamps
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Include a timestamp in the signed payload to prevent replay attacks
// An attacker who intercepts a valid signed request cannot replay it later

const timestamp = Date.now().toString(); // milliseconds since epoch
const payload = \`\${method}\\n\${path}\\n\${timestamp}\\n\${bodyHash}\`;
const signature = hmacSha256(secret, payload);

// Server-side: reject if timestamp is too old or in the future
function isTimestampValid(timestamp: string, toleranceMs = 300_000): boolean {
  const ts = parseInt(timestamp);
  const now = Date.now();
  return Math.abs(now - ts) < toleranceMs; // within ±5 minutes
}

// For even stronger replay protection: track used nonces in a cache
// const usedNonces = new Set<string>(); // or Redis with TTL
// if (usedNonces.has(nonce)) return false;
// usedNonces.add(nonce);`}</code></pre>

      {/* Section 13: HKDF Key Derivation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        HKDF — HMAC-based Key Derivation Function
      </h2>
      <p>
        <strong>HKDF (RFC 5869)</strong> uses HMAC to derive multiple purpose-specific keys from a single master secret.
        It is the recommended way to derive session keys, encryption keys, or authentication keys from a shared secret
        (e.g., from a Diffie-Hellman exchange or a master key).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import crypto from 'crypto';

// HKDF — Derive purpose-specific keys from a master secret
// hkdfSync is available in Node.js 15.0.0+

function deriveKey(
  masterSecret: Buffer,
  info: string,           // context/purpose string (e.g., "session-key", "api-signing")
  salt?: Buffer,          // optional random salt
  length = 32            // output key length in bytes
): Buffer {
  // Node.js built-in hkdf
  return crypto.hkdfSync('sha256', masterSecret, salt || Buffer.alloc(0), info, length);
}

// Example: derive multiple keys from one master secret
const masterKey = crypto.randomBytes(32);

const sessionKey     = deriveKey(masterKey, 'session-encryption', undefined, 32);
const signingKey     = deriveKey(masterKey, 'request-signing', undefined, 32);
const cookieKey      = deriveKey(masterKey, 'cookie-authentication', undefined, 32);

// These are all cryptographically independent — compromising one does not
// compromise the others, even though they share the same master secret

// Python — HKDF (requires cryptography library: pip install cryptography)
/*
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
import os

def derive_key(master_secret: bytes, info: bytes, length: int = 32) -> bytes:
    hkdf = HKDF(
        algorithm=hashes.SHA256(),
        length=length,
        salt=None,  # or os.urandom(32) for random salt
        info=info,
    )
    return hkdf.derive(master_secret)

master = os.urandom(32)
signing_key = derive_key(master, b"request-signing")
session_key = derive_key(master, b"session-encryption")
*/`}</code></pre>

      {/* Section 14: Timing Attacks Deep Dive */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Timing Attacks — Why String Comparison is Dangerous
      </h2>
      <p>
        A timing attack is a side-channel attack where an attacker measures the time taken by cryptographic operations
        to extract secret information. For HMAC verification, the danger is in how strings are compared.
      </p>
      <p>
        Consider a naive implementation of string comparison:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// How a typical string comparison works internally:
// (This is conceptually similar to early-exit string comparison)

function naiveCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false; // EXITS EARLY on first mismatch!
  }
  return true;
}

// If a secret HMAC is "abc123def456..." and an attacker tries "xxxxxxxx...":
// - Try starting with 'a': comparison exits after 1 char (fast)  => starts with 'a'
// - Try starting with 'x': comparison exits after 0 chars (fast) => doesn't start with 'x'
// In practice, differences are nanoseconds to microseconds, but measurable with
// enough samples over a network.

// Constant-time comparison — always iterates all bytes:
function constantTimeCompare(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i]; // XOR: 0 if equal, non-zero if different
    // Bitwise OR accumulates differences — never short-circuits
  }
  return result === 0;
}

// Node.js provides this as crypto.timingSafeEqual(a, b)
// Use it for ALL HMAC verification!`}</code></pre>

      {/* Section 15: Testing HMAC */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Testing Your HMAC Implementation — Test Vectors
      </h2>
      <p>
        RFC 2104 and RFC 4231 provide official test vectors for HMAC. Always verify your implementation against these
        before deploying to production:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// RFC 4231 Test Vectors for HMAC-SHA256

const testVectors = [
  {
    // Test Case 1: Basic test
    key:     Buffer.from('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b', 'hex'),
    message: Buffer.from('4869205468657265', 'hex'), // "Hi There"
    expected: 'b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7',
  },
  {
    // Test Case 2: Key shorter than hash block size
    key:     Buffer.from('4a656665', 'hex'), // "Jefe"
    message: Buffer.from('7768617420646f2079612077616e7420666f72206e6f7468696e673f', 'hex'),
    // "what do ya want for nothing?"
    expected: '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964a72424',
  },
  {
    // Test Case 3: Data and key = 20 bytes of 0xaa and 0xdd
    key:     Buffer.alloc(20, 0xaa),
    message: Buffer.alloc(50, 0xdd),
    expected: '773ea91e36800e46854db8ebd09181a72959098b3ef8c122d9635514ced565fe',
  },
];

import crypto from 'crypto';

for (const [i, vec] of testVectors.entries()) {
  const computed = crypto.createHmac('sha256', vec.key)
    .update(vec.message)
    .digest('hex');

  const pass = computed === vec.expected;
  console.log(\`Test \${i + 1}: \${pass ? '✓ PASS' : '✗ FAIL'}\`);
  if (!pass) {
    console.log(\`  Expected: \${vec.expected}\`);
    console.log(\`  Got:      \${computed}\`);
  }
}

// Quick sanity check — compare with known values
// HMAC-SHA256(key="key", data="The quick brown fox jumps over the lazy dog")
// = f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8

const quickCheck = crypto.createHmac('sha256', 'key')
  .update('The quick brown fox jumps over the lazy dog')
  .digest('hex');
console.log(quickCheck);
// => "f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8"`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>{t.keyTakeawaysLabel}</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li>{t.takeaway1}</li>
          <li>{t.takeaway2}</li>
          <li>{t.takeaway3}</li>
          <li>{t.takeaway4}</li>
          <li>{t.takeaway5}</li>
          <li>{t.takeaway6}</li>
          <li>{t.takeaway7}</li>
          <li>{t.takeaway8}</li>
        </ul>
      </div>

      {/* FAQs */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {t.faq1Q}
      </h3>
      <p>{t.faq1A}</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {t.faq2Q}
      </h3>
      <p>{t.faq2A}</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {t.faq3Q}
      </h3>
      <p>{t.faq3A}</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {t.faq4Q}
      </h3>
      <p>{t.faq4A}</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {t.faq5Q}
      </h3>
      <p>{t.faq5A}</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {t.faq6Q}
      </h3>
      <p>{t.faq6A}</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {t.faq7Q}
      </h3>
      <p>{t.faq7A}</p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {t.faq8Q}
      </h3>
      <p>{t.faq8A}</p>
    </article>
  );
}
