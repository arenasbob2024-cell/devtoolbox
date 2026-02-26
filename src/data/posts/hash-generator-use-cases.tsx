import Link from 'next/link';

const translations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'Online Hash Generator Use Cases: SHA256, MD5, and Multi-Hash Applications',
    intro: 'Hash generators are essential tools for developers, security professionals, and anyone who needs to verify data integrity. From checking file downloads to storing passwords securely, hash functions like SHA256 and MD5 play a crucial role in modern computing. This guide explores the most common use cases for online hash generators and when to use different hash algorithms.',
    h2_what: 'What Is a Hash Generator?',
    whatDesc1: 'A hash generator is a tool that takes an input (text, file, or data) and produces a fixed-length string of characters called a hash value or digest. This process is one-way — you cannot reverse a hash to get the original input. A multi hash generator can compute multiple hash algorithms simultaneously, such as MD5, SHA1, SHA256, and SHA512.',
    whatDesc2: 'Hash functions are deterministic — the same input always produces the same output. Even a tiny change in the input (like adding a single space) results in a completely different hash. This property makes hashes perfect for verifying data integrity and detecting tampering.',
    h2_useCases: 'Common Use Cases for Hash Generators',
    uc1Title: 'File Integrity Verification',
    uc1Desc: 'When downloading software, ISO images, or important files, publishers often provide hash values (usually SHA256). By generating the hash of your downloaded file and comparing it to the published value, you can verify the file was not corrupted or tampered with during transfer.',
    uc1Example: 'Example: Linux distributions like Ubuntu publish SHA256 hashes for their ISO files. Users can verify downloads before installation.',
    uc2Title: 'Password Storage (Development)',
    uc2Desc: 'When building applications, developers need to hash passwords before storing them in databases. Hash generators help test and verify that your hashing implementation is working correctly. However, for production use, always use dedicated password hashing algorithms like bcrypt or Argon2 instead of plain SHA256.',
    uc3Title: 'API Authentication (HMAC)',
    uc3Desc: 'Many APIs use HMAC (Hash-based Message Authentication Code) for request signing. Developers use hash generators to test their HMAC implementation. Services like AWS, Stripe, and GitHub webhooks use HMAC-SHA256 to verify request authenticity.',
    uc4Title: 'Data Deduplication',
    uc4Desc: 'Storage systems use hash generators to identify duplicate files without comparing their entire contents. By comparing hashes, systems can quickly determine if two files are identical, saving storage space and bandwidth.',
    uc5Title: 'Blockchain and Cryptocurrency',
    uc5Desc: 'Blockchain technology relies heavily on SHA256 hashing. Bitcoin uses double SHA256 for block headers and transaction verification. Developers working with blockchain applications frequently use hash generators for testing and debugging.',
    uc6Title: 'Digital Signatures',
    uc6Desc: 'Digital signature systems hash documents before signing them with a private key. The recipient verifies the signature by hashing the received document and comparing it to the signed hash. This ensures document integrity and authenticity.',
    h2_algorithms: 'Hash Algorithms: When to Use Each',
    algoIntro: 'Different hash algorithms serve different purposes. Here is when to use each:',
    md5Title: 'MD5 (Message Digest 5)',
    md5Desc: 'MD5 produces a 128-bit hash (32 hex characters). While it is fast, MD5 is cryptographically broken and should not be used for security purposes. Acceptable uses include:',
    md5Use1: 'File integrity checks for non-security purposes',
    md5Use2: 'Cache key generation',
    md5Use3: 'Data deduplication in internal systems',
    md5Warning: '⚠️ Do NOT use MD5 for passwords, certificates, or any security-critical applications.',
    sha1Title: 'SHA1 (Secure Hash Algorithm 1)',
    sha1Desc: 'SHA1 produces a 160-bit hash (40 hex characters). Like MD5, SHA1 is considered broken for security purposes. Google demonstrated a practical collision attack in 2017. Use only for legacy compatibility or non-security checksums.',
    sha256Title: 'SHA256 (Secure Hash Algorithm 256)',
    sha256Desc: 'SHA256 produces a 256-bit hash (64 hex characters) and is currently considered secure. It is the recommended choice for:',
    sha256Use1: 'File integrity verification',
    sha256Use2: 'Digital signatures',
    sha256Use3: 'Certificate validation',
    sha256Use4: 'Blockchain applications',
    sha256Use5: 'API authentication (HMAC)',
    sha512Title: 'SHA512 (Secure Hash Algorithm 512)',
    sha512Desc: 'SHA512 produces a 512-bit hash (128 hex characters) and offers a larger security margin than SHA256. Use when you need maximum security or when working with systems that require longer hashes.',
    h2_multiHash: 'Benefits of a Multi Hash Generator',
    multiDesc: 'A multi hash generator computes multiple hash algorithms at once, providing several advantages:',
    multiBenefit1: 'Compatibility: Different systems may require different hash formats',
    multiBenefit2: 'Future-proofing: If one algorithm becomes compromised, you have alternatives',
    multiBenefit3: 'Verification: Cross-check integrity using multiple algorithms',
    multiBenefit4: 'Efficiency: Generate all needed hashes in a single operation',
    h2_bestPractices: 'Best Practices for Using Hash Generators',
    bp1Title: 'Verify File Integrity',
    bp1Desc: 'Always compare hashes in a case-insensitive manner. Use timing-safe comparison functions to prevent side-channel attacks.',
    bp2Title: 'Never Rely on Hash Alone for Security',
    bp2Desc: 'Hashes verify integrity, not authenticity. A malicious actor can replace both the file and its published hash. Use digital signatures or trusted HTTPS sources for security-critical downloads.',
    bp3Title: 'Use Salt for Password Hashing',
    bp3Desc: 'If you must hash passwords for testing, always add a unique salt. Never store plain SHA256 hashes of passwords — use bcrypt, Argon2, or scrypt instead.',
    bp4Title: 'Choose the Right Algorithm',
    bp4Desc: 'Use SHA256 or SHA512 for security purposes. Use MD5 only for non-security checksums where speed matters.',
    h2_faq: 'Frequently Asked Questions',
    faq1q: 'What is the difference between MD5 and SHA256?',
    faq1a: 'MD5 produces a 128-bit hash and is cryptographically broken — collisions can be generated in seconds. SHA256 produces a 256-bit hash and is currently secure. MD5 is faster but should only be used for non-security purposes. SHA256 is recommended for file verification and security applications.',
    faq2q: 'Can I reverse a hash to get the original data?',
    faq2a: 'No, hash functions are designed to be one-way. However, you can use rainbow tables or brute-force attacks to guess simple inputs. For password verification, always use slow hashing algorithms like bcrypt or Argon2.',
    faq3q: 'Why do different hash generators give different results?',
    faq3a: 'Hash inputs are case-sensitive and whitespace-sensitive. "Hello" and "hello" produce different hashes. Also, some generators include newlines or encoding differences. Always verify the exact input bytes being hashed.',
    faq4q: 'Is SHA512 better than SHA256?',
    faq4a: 'SHA512 provides a larger security margin (512 bits vs 256 bits) but produces longer hashes. Both are considered secure. SHA512 is slightly slower but offers more future-proofing against quantum computing advances.',
    faq5q: 'Can a hash generator be used for passwords?',
    faq5a: 'For testing and verification, yes. For production password storage, no — use dedicated password hashing algorithms like bcrypt, Argon2, or scrypt which are intentionally slow to resist brute-force attacks.',
    conclusion: 'Hash generators are versatile tools with applications ranging from simple file verification to complex cryptographic systems. By understanding the strengths and limitations of different hash algorithms, you can choose the right tool for your specific use case.',
    ctaText: 'Generate hashes instantly with our free tool',
    ctaButton: 'Try Our Multi Hash Generator →',
  },
  zh: {
    title: '在线哈希生成器应用场景：SHA256、MD5 和多哈希应用',
    intro: '哈希生成器是开发者、安全专业人员以及任何需要验证数据完整性人员的必备工具。从检查文件下载到安全存储密码，SHA256 和 MD5 等哈希函数在现代计算中发挥着关键作用。本指南探讨在线哈希生成器的最常见用例，以及何时使用不同的哈希算法。',
    h2_what: '什么是哈希生成器？',
    whatDesc1: '哈希生成器是一种工具，它接受输入（文本、文件或数据）并生成固定长度的字符字符串，称为哈希值或摘要。这个过程是单向的 —— 您无法反转哈希来获取原始输入。多哈希生成器可以同时计算多种哈希算法，如 MD5、SHA1、SHA256 和 SHA512。',
    whatDesc2: '哈希函数是确定性的 —— 相同的输入始终产生相同的输出。即使输入的微小变化（如添加一个空格）也会导致完全不同的哈希。这一特性使哈希成为验证数据完整性和检测篡改的理想选择。',
    h2_useCases: '哈希生成器的常见用例',
    uc1Title: '文件完整性验证',
    uc1Desc: '下载软件、ISO 镜像或重要文件时，发布者通常会提供哈希值（通常是 SHA256）。通过生成下载文件的哈希并与发布值进行比较，您可以验证文件在传输过程中是否被损坏或篡改。',
    uc1Example: '示例：Ubuntu 等 Linux 发行版为其 ISO 文件发布 SHA256 哈希。用户可以在安装前验证下载。',
    uc2Title: '密码存储（开发）',
    uc2Desc: '构建应用程序时，开发者需要在将密码存储到数据库之前对其进行哈希处理。哈希生成器有助于测试和验证您的哈希实现是否正常工作。但是，对于生产用途，请始终使用专用的密码哈希算法，如 bcrypt 或 Argon2，而不是纯 SHA256。',
    uc3Title: 'API 认证（HMAC）',
    uc3Desc: '许多 API 使用 HMAC（基于哈希的消息认证码）进行请求签名。开发者使用哈希生成器测试他们的 HMAC 实现。AWS、Stripe 和 GitHub Webhook 等服务使用 HMAC-SHA256 来验证请求的真实性。',
    uc4Title: '数据去重',
    uc4Desc: '存储系统使用哈希生成器来识别重复文件，而无需比较其全部内容。通过比较哈希，系统可以快速确定两个文件是否相同，从而节省存储空间和带宽。',
    uc5Title: '区块链和加密货币',
    uc5Desc: '区块链技术严重依赖 SHA256 哈希。比特币使用双重 SHA256 进行区块头和交易验证。从事区块链应用程序的开发者经常使用哈希生成器进行测试和调试。',
    uc6Title: '数字签名',
    uc6Desc: '数字签名系统在签署文档之前对其进行哈希处理。接收者通过哈希接收到的文档并将其与签名的哈希进行比较来验证签名。这确保了文档的完整性和真实性。',
    h2_algorithms: '哈希算法：何时使用哪种',
    algoIntro: '不同的哈希算法服务于不同的目的。以下是每种算法的使用场景：',
    md5Title: 'MD5（消息摘要5）',
    md5Desc: 'MD5 生成128位哈希（32个十六进制字符）。虽然速度很快，但 MD5 在密码学上已被破解，不应用于安全目的。可接受的用途包括：',
    md5Use1: '非安全用途的文件完整性检查',
    md5Use2: '缓存键生成',
    md5Use3: '内部系统的数据去重',
    md5Warning: '⚠️ 请勿将 MD5 用于密码、证书或任何安全关键应用。',
    sha1Title: 'SHA1（安全哈希算法1）',
    sha1Desc: 'SHA1 生成160位哈希（40个十六进制字符）。与 MD5 一样，SHA1 在安全用途上被认为已损坏。Google 在2017年展示了实际的碰撞攻击。仅用于遗留兼容性或非安全校验和。',
    sha256Title: 'SHA256（安全哈希算法256）',
    sha256Desc: 'SHA256 生成256位哈希（64个十六进制字符），目前被认为是安全的。它是以下用途的推荐选择：',
    sha256Use1: '文件完整性验证',
    sha256Use2: '数字签名',
    sha256Use3: '证书验证',
    sha256Use4: '区块链应用',
    sha256Use5: 'API 认证（HMAC）',
    sha512Title: 'SHA512（安全哈希算法512）',
    sha512Desc: 'SHA512 生成512位哈希（128个十六进制字符），比 SHA256 提供更大的安全余量。当您需要最大安全性或与需要更长哈希的系统配合使用时使用。',
    h2_multiHash: '多哈希生成器的优势',
    multiDesc: '多哈希生成器一次计算多种哈希算法，提供以下几个优势：',
    multiBenefit1: '兼容性：不同系统可能需要不同的哈希格式',
    multiBenefit2: '面向未来：如果一种算法被破解，您有替代方案',
    multiBenefit3: '验证：使用多种算法交叉检查完整性',
    multiBenefit4: '效率：在一次操作中生成所有需要的哈希',
    h2_bestPractices: '使用哈希生成器的最佳实践',
    bp1Title: '验证文件完整性',
    bp1Desc: '始终以不区分大小写的方式比较哈希。使用时序安全比较函数以防止侧信道攻击。',
    bp2Title: '不要单独依赖哈希来保证安全',
    bp2Desc: '哈希验证完整性，而非真实性。恶意行为者可以替换文件及其发布的哈希。对于安全关键下载，请使用数字签名或受信任的 HTTPS 来源。',
    bp3Title: '密码哈希使用盐值',
    bp3Desc: '如果您必须测试哈希密码，请始终添加唯一的盐。切勿存储密码的纯 SHA256 哈希 —— 改用 bcrypt、Argon2 或 scrypt。',
    bp4Title: '选择正确的算法',
    bp4Desc: '安全用途使用 SHA256 或 SHA512。仅在速度重要的非安全校验和时使用 MD5。',
    h2_faq: '常见问题',
    faq1q: 'MD5 和 SHA256 有什么区别？',
    faq1a: 'MD5 生成128位哈希，在密码学上已被破解 —— 碰撞可以在数秒内生成。SHA256 生成256位哈希，目前被认为是安全的。MD5 更快，但仅应用于非安全用途。文件验证和安全应用推荐使用 SHA256。',
    faq2q: '我可以反转哈希来获取原始数据吗？',
    faq2a: '不可以，哈希函数设计为单向。但是，您可以使用彩虹表或暴力攻击来猜测简单输入。对于密码验证，请始终使用慢速哈希算法，如 bcrypt 或 Argon2。',
    faq3q: '为什么不同的哈希生成器给出不同的结果？',
    faq3a: '哈希输入区分大小写和空白。"Hello"和"hello"产生不同的哈希。此外，某些生成器包含换行符或编码差异。始终验证正在哈希的确切输入字节。',
    faq4q: 'SHA512 比 SHA256 更好吗？',
    faq4a: 'SHA512 提供更大的安全余量（512位对256位），但产生更长的哈希。两者都被认为是安全的。SHA512 稍慢，但针对量子计算的进展提供了更好的未来保护。',
    faq5q: '哈希生成器可以用于密码吗？',
    faq5a: '对于测试和验证，可以。对于生产密码存储，不可以 —— 使用专用的密码哈希算法，如 bcrypt、Argon2 或 scrypt，这些算法故意设计得较慢以抵抗暴力攻击。',
    conclusion: '哈希生成器是多功能的工具，应用范围从简单的文件验证到复杂的加密系统。通过了解不同哈希算法的优势和局限性，您可以为特定用例选择正确的工具。',
    ctaText: '使用我们的免费工具即时生成哈希',
    ctaButton: '立即试用我们的多哈希生成器 →',
  },
};

const h2Style: React.CSSProperties = { 
  fontSize: 22, 
  fontWeight: 700, 
  marginTop: 40, 
  marginBottom: 16, 
  color: 'var(--text-primary)' 
};

const h3Style: React.CSSProperties = { 
  fontSize: 18, 
  fontWeight: 600, 
  marginTop: 24, 
  marginBottom: 12, 
  color: 'var(--text-primary)' 
};

export default function HashGeneratorUseCases({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{t.intro}</p>

      <h2 style={h2Style}>{t.h2_what}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.whatDesc1}</p>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>{t.whatDesc2}</p>

      <h2 style={h2Style}>{t.h2_useCases}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
        {[
          { title: t.uc1Title, desc: t.uc1Desc, example: t.uc1Example },
          { title: t.uc2Title, desc: t.uc2Desc },
          { title: t.uc3Title, desc: t.uc3Desc },
          { title: t.uc4Title, desc: t.uc4Desc },
          { title: t.uc5Title, desc: t.uc5Desc },
          { title: t.uc6Title, desc: t.uc6Desc },
        ].map((uc, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{uc.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{uc.desc}</p>
            {'example' in uc && uc.example && (
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6, marginTop: 8, fontStyle: 'italic' }}>{uc.example}</p>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.ctaText}</p>
        <Link href={`/${lang}/tools/hash-generator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.ctaButton}
        </Link>
      </div>

      <h2 style={h2Style}>{t.h2_algorithms}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.algoIntro}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'rgba(234, 179, 8, 0.08)', borderRadius: 8, border: '1px solid rgba(234, 179, 8, 0.3)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#f59e0b' }}>{t.md5Title}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 8 }}>{t.md5Desc}</p>
          <ul style={{ lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 13 }}>
            <li>{t.md5Use1}</li>
            <li>{t.md5Use2}</li>
            <li>{t.md5Use3}</li>
          </ul>
          <p style={{ fontSize: 13, color: '#ef4444', marginTop: 12, fontWeight: 600 }}>{t.md5Warning}</p>
        </div>

        <div style={{ padding: 16, background: 'rgba(234, 179, 8, 0.08)', borderRadius: 8, border: '1px solid rgba(234, 179, 8, 0.3)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#f59e0b' }}>{t.sha1Title}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{t.sha1Desc}</p>
        </div>

        <div style={{ padding: 16, background: 'rgba(34, 197, 94, 0.08)', borderRadius: 8, border: '1px solid rgba(34, 197, 94, 0.3)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#22c55e' }}>{t.sha256Title}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 8 }}>{t.sha256Desc}</p>
          <ul style={{ lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 13 }}>
            <li>{t.sha256Use1}</li>
            <li>{t.sha256Use2}</li>
            <li>{t.sha256Use3}</li>
            <li>{t.sha256Use4}</li>
            <li>{t.sha256Use5}</li>
          </ul>
        </div>

        <div style={{ padding: 16, background: 'rgba(59, 130, 246, 0.08)', borderRadius: 8, border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#3b82f6' }}>{t.sha512Title}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{t.sha512Desc}</p>
        </div>
      </div>

      <h2 style={h2Style}>{t.h2_multiHash}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.multiDesc}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.multiBenefit1}</li>
        <li>{t.multiBenefit2}</li>
        <li>{t.multiBenefit3}</li>
        <li>{t.multiBenefit4}</li>
      </ul>

      <h2 style={h2Style}>{t.h2_bestPractices}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {[
          { title: t.bp1Title, desc: t.bp1Desc },
          { title: t.bp2Title, desc: t.bp2Desc },
          { title: t.bp3Title, desc: t.bp3Desc },
          { title: t.bp4Title, desc: t.bp4Desc },
        ].map((bp, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid var(--accent-blue)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{bp.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{bp.desc}</p>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>{t.h2_faq}</h2>
      {[
        [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a], [t.faq4q, t.faq4a], [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 30 }}>{t.conclusion}</p>
    </div>
  );
}
