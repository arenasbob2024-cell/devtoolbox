import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>Hash functions</strong> are among the most important building blocks in computer science and cybersecurity. Every day, developers and security professionals rely on <strong>MD5 hash generators</strong>, <strong>SHA-256 hash</strong> computations, and other hashing algorithms to verify file integrity, store passwords securely, sign digital documents, and power blockchain technology. Whether you need a quick <strong>hash generator online</strong> to compute a checksum or want to deeply understand the internals of cryptographic hashing, this comprehensive guide covers everything from fundamental theory to practical code examples in JavaScript, Python, Bash, and PowerShell. If you are looking to <strong>generate hash</strong> values instantly, our free tool supports MD5, SHA-1, SHA-256, SHA-512, and more.',
    linkTool: 'Try our free online Hash Generator tool — supports MD5, SHA-1, SHA-256, SHA-512 instantly.',
    h2_what: 'What Is a Hash Function?',
    whatDesc1: 'A <strong>hash function</strong> is a mathematical algorithm that takes an input (or "message") of any size and produces a fixed-size output called a hash value, hash digest, or simply a hash. The output is often represented as a hexadecimal string. For example, the <strong>MD5 hash</strong> of the word "hello" is always the 32-character hex string <code>5d41402abc4b2a76b9719d911017c592</code>, regardless of when or where you compute it.',
    whatDesc2: 'Hash functions have four essential properties that make them useful across computing: <strong>Deterministic</strong> — the same input always produces the same output; <strong>Fixed output length</strong> — no matter how large or small the input, the hash has a constant length (e.g., 128 bits for MD5, 256 bits for SHA-256); <strong>One-way (preimage resistance)</strong> — given a hash value, it is computationally infeasible to reverse-engineer the original input; <strong>Avalanche effect</strong> — a tiny change in the input (even one bit) completely changes the output hash.',
    whatDesc3: 'A fifth property, <strong>collision resistance</strong>, is critical for cryptographic hash functions. A collision occurs when two different inputs produce the same hash value. Strong hash functions like <strong>SHA-256</strong> are designed so that finding collisions is computationally infeasible, while older algorithms like <strong>MD5</strong> and <strong>SHA-1</strong> have known collision vulnerabilities. Understanding these properties is key to choosing the right <strong>hash generator</strong> for your use case.',
    h2_algorithms: 'Common Hash Algorithms Compared',
    algorithmsDesc: 'There are several widely used hash algorithms, each with different output sizes, security levels, and performance characteristics. Here is a comparison of the most popular <strong>hash algorithms</strong> used today:',
    algorithmsTableNote: 'The table above summarizes the key differences. <strong>MD5</strong> produces a 128-bit (32 hex character) digest and is extremely fast, but it has been cryptographically broken since 2004 — collisions can be generated in seconds. <strong>SHA-1</strong> outputs a 160-bit (40 hex character) hash and was the standard for years, but Google demonstrated a practical collision attack (SHAttered) in 2017. <strong>SHA-256</strong> belongs to the SHA-2 family, produces a 256-bit (64 hex character) digest, and remains secure with no known practical attacks. <strong>SHA-512</strong>, also in the SHA-2 family, outputs 512 bits (128 hex characters) and offers a larger security margin.',
    algorithmsAdvice: 'For any security-sensitive application, use <strong>SHA-256</strong> or <strong>SHA-512</strong>. MD5 and SHA-1 should only be used for non-security purposes like checksums and data deduplication where collision attacks are not a concern.',
    h2_howWorks: 'How Hash Functions Work',
    howWorksDesc: 'While the full mathematical details of cryptographic hash functions are complex, understanding the high-level process helps you appreciate why they are so effective. Most modern hash functions follow the <strong>Merkle-Damgard construction</strong>, which works in three main stages:',
    howWorksStep1: '<strong>1. Message Padding</strong>: The input message is padded so its length becomes a multiple of the block size (512 bits for MD5/SHA-1/SHA-256, or 1024 bits for SHA-512). Padding involves appending a single <code>1</code> bit, followed by <code>0</code> bits, and then a 64-bit (or 128-bit) representation of the original message length. This ensures every input, regardless of size, is processed uniformly.',
    howWorksStep2: '<strong>2. Block Processing</strong>: The padded message is divided into fixed-size blocks. Each block is fed through a <strong>compression function</strong> along with the output (called the chaining value or intermediate hash state) from the previous block. The first block uses a predefined <strong>initialization vector (IV)</strong>. The compression function involves multiple rounds of bitwise operations (AND, OR, XOR, NOT), modular addition, and bit rotations that thoroughly mix the input data. SHA-256 uses 64 rounds per block, while MD5 uses 64 rounds organized into four groups of 16.',
    howWorksStep3: '<strong>3. Final Output</strong>: After all blocks have been processed, the final chaining value is the hash digest. For SHA-256, this is a 256-bit value typically displayed as a 64-character hexadecimal string. The entire process is deterministic — identical inputs always yield identical outputs — yet the internal mixing makes it infeasible to reverse.',
    howWorksSummary: 'The beauty of this construction is that even a single bit change in the input causes a completely different hash output (the avalanche effect). For instance, the <strong>SHA-256 hash</strong> of "hello" and "Hello" differ in every character of the 64-hex-digit output, despite differing by only one bit in the capitalization of the first letter.',
    h2_useCases: 'Practical Use Cases for Hash Functions',
    useCasesDesc: '<strong>Hash functions</strong> are used everywhere in modern computing. Here are the most important real-world applications:',
    useCase1: '<strong>File Integrity Verification (<strong>MD5 checksum</strong> / SHA-256 checksum)</strong>: When you download software, the provider often publishes a hash (usually MD5 or SHA-256). You can use a <strong>file hash checker</strong> to compute the hash of the downloaded file and compare it to the published value. If they match, the file was not corrupted or tampered with during transit. Linux distributions, ISO images, and open-source packages commonly use SHA-256 checksums for this purpose.',
    useCase2: '<strong>Password Storage</strong>: Secure applications never store passwords in plain text. Instead, they hash the password and store only the hash. When a user logs in, the application hashes the submitted password and compares it to the stored hash. However, simple hashing is not enough — modern best practices require <strong>salted hashes</strong> using dedicated password hashing algorithms like bcrypt, scrypt, or Argon2 to defend against rainbow table and brute-force attacks.',
    useCase3: '<strong>Digital Signatures and Certificates</strong>: Hash functions are a core component of digital signature schemes. When you sign a document digitally, the software first computes a hash of the document, then encrypts that hash with your private key. The recipient can verify the signature by decrypting with your public key and comparing hashes. TLS/SSL certificates, code signing, and email signatures (S/MIME, PGP) all depend on hash functions.',
    useCase4: '<strong>Git Version Control</strong>: Git uses <strong>SHA-1 hashes</strong> (and is transitioning to SHA-256) to uniquely identify every commit, tree, blob, and tag object. Each commit ID is a SHA-1 hash of the commit content, parent hashes, author information, and timestamp. This creates an immutable, verifiable history where any modification to past commits changes all subsequent hashes.',
    useCase5: '<strong>Blockchain and Cryptocurrency</strong>: Blockchain technology relies fundamentally on <strong>SHA-256 hashing</strong>. Bitcoin uses double SHA-256 (hashing the hash) for block headers and transaction verification. The proof-of-work mining process involves finding a nonce that produces a SHA-256 hash below a target threshold. Ethereum originally used Keccak-256 (a SHA-3 variant) for similar purposes.',
    useCase6: '<strong>Data Deduplication and Caching</strong>: Cloud storage systems and backup tools use hash functions to detect duplicate files without comparing them byte-by-byte. By computing the hash of each file, the system can instantly determine whether two files are identical. Content delivery networks (CDNs) use hashes in ETags and cache keys to efficiently manage cached content.',
    h2_codeExamples: 'Hash Generator Code Examples',
    codeJsTitle: 'JavaScript Hash Generation (Browser & Node.js)',
    codeJsDesc: 'In the browser, use the Web Crypto API (<code>crypto.subtle.digest</code>) for <strong>SHA-256 hash</strong> generation. In Node.js, use the built-in <code>crypto</code> module for <strong>MD5 hash</strong>, SHA-1, SHA-256, and SHA-512:',
    codePyTitle: 'Python Hash Generation (hashlib)',
    codePyDesc: 'Python provides the <code>hashlib</code> module for generating <strong>MD5</strong>, <strong>SHA-1</strong>, <strong>SHA-256</strong>, and other hashes. It supports both string and file hashing:',
    codeBashTitle: 'Bash / Linux Hash Commands',
    codeBashDesc: 'Linux and macOS provide built-in commands like <code>md5sum</code>, <code>sha256sum</code>, and <code>openssl dgst</code> for computing hashes directly from the terminal. These are essential tools for <strong>file hash checking</strong>:',
    codePsTitle: 'PowerShell Hash Generation (Get-FileHash)',
    codePsDesc: 'Windows PowerShell provides <code>Get-FileHash</code> for file hashing and .NET classes for string hashing. <code>Get-FileHash</code> supports MD5, SHA1, SHA256, SHA384, and SHA512:',
    h2_md5vsSha: 'MD5 vs SHA-256: Which Should You Use?',
    md5vsShaDesc1: 'The choice between <strong>MD5</strong> and <strong>SHA-256</strong> depends entirely on your use case. MD5 is cryptographically broken — researchers can generate MD5 collisions in seconds using commodity hardware. In 2008, a team demonstrated a rogue CA certificate attack using MD5 collisions, and in 2012, the Flame malware exploited MD5 weaknesses in Windows Update signing. For any application where security matters, <strong>MD5 is not safe</strong>.',
    md5vsShaDesc2: '<strong>When MD5 is still acceptable</strong>: Non-cryptographic checksums for data integrity (detecting accidental corruption, not malicious tampering), cache key generation, content-addressable storage deduplication, ETags in HTTP caching, and hash table distribution. In these scenarios, the speed advantage of MD5 (roughly 2-3x faster than SHA-256) can be beneficial, and collision attacks are not a threat model concern.',
    md5vsShaDesc3: '<strong>When SHA-256 is required</strong>: Digital signatures, certificate validation, password hashing (as the underlying primitive), file integrity verification where tampering is a concern, blockchain applications, code signing, secure random number generation seeding, HMAC construction for API authentication, and any compliance-driven context (FIPS 140-2, PCI-DSS, HIPAA). SHA-256 has no known practical attacks and provides a 128-bit security level against collision attacks.',
    md5vsShaDesc4: '<strong>Bottom line</strong>: When in doubt, always choose SHA-256. The performance difference is negligible for most applications, and the security gap between MD5 and SHA-256 is enormous. Many organizations and standards bodies have formally deprecated MD5 for all cryptographic uses.',
    h2_bestPractices: 'Hash Security Best Practices',
    bestPracticesDesc: 'Using hash functions correctly is just as important as choosing the right algorithm. Here are essential best practices for developers:',
    bestPractice1: '<strong>Never hash passwords with plain MD5/SHA-256</strong>: While SHA-256 is cryptographically secure, it is designed to be <em>fast</em>, which is the opposite of what you want for password hashing. Attackers can compute billions of SHA-256 hashes per second on modern GPUs. Instead, use purpose-built password hashing functions: <strong>bcrypt</strong> (widely supported, configurable work factor), <strong>scrypt</strong> (memory-hard, resists GPU attacks), or <strong>Argon2</strong> (winner of the Password Hashing Competition, resists both GPU and ASIC attacks). These algorithms are intentionally slow and memory-intensive.',
    bestPractice2: '<strong>Always use salts for password hashing</strong>: A <strong>salt</strong> is a random value unique to each user, prepended or appended to the password before hashing. Salting prevents rainbow table attacks (precomputed hash-to-password lookup tables) and ensures that two users with the same password have different stored hashes. The salt is stored alongside the hash in the database — it does not need to be secret, only unique. bcrypt, scrypt, and Argon2 handle salting automatically.',
    bestPractice3: '<strong>Use HMAC for message authentication</strong>: When you need to verify both the integrity and authenticity of a message (e.g., API requests, webhooks, cookies), use <strong>HMAC (Hash-based Message Authentication Code)</strong> rather than a plain hash. HMAC combines a secret key with the hash function: <code>HMAC(key, message) = Hash((key XOR opad) || Hash((key XOR ipad) || message))</code>. This prevents attackers from forging valid hashes without knowing the secret key. HMAC-SHA256 is the industry standard for API authentication (used by AWS, Stripe, GitHub webhooks, etc.).',
    bestPractice4: '<strong>Avoid length extension attacks</strong>: Simple constructions like <code>Hash(secret + message)</code> are vulnerable to length extension attacks with Merkle-Damgard hash functions (MD5, SHA-1, SHA-256). An attacker who knows <code>Hash(secret + message)</code> can compute <code>Hash(secret + message + padding + attacker_data)</code> without knowing the secret. Always use HMAC instead of naive secret-prefixed hashing. Alternatively, SHA-3 (Keccak) is immune to length extension attacks by design.',
    bestPractice5: '<strong>Verify hashes in constant time</strong>: When comparing hash values in code (e.g., verifying HMAC signatures), always use a constant-time comparison function to prevent timing side-channel attacks. In Node.js, use <code>crypto.timingSafeEqual()</code>; in Python, use <code>hmac.compare_digest()</code>. A naive <code>===</code> string comparison can leak information about how many characters matched before the comparison failed.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between MD5 and SHA-256?',
    faq1_a: 'MD5 produces a 128-bit (32 hex character) hash and is cryptographically broken — collisions can be generated in seconds. SHA-256 produces a 256-bit (64 hex character) hash and remains fully secure with no known practical attacks. MD5 is faster but should only be used for non-security checksums. SHA-256 is required for digital signatures, certificates, password hashing primitives, and any security-sensitive application. The performance difference is small for most workloads, so SHA-256 is the recommended default.',
    faq2_q: 'Is MD5 still safe to use?',
    faq2_a: 'MD5 is NOT safe for any cryptographic or security purpose. It has been broken since 2004, and practical collision attacks can be performed in seconds. However, MD5 is still acceptable for non-security use cases such as checksums for detecting accidental data corruption, cache keys, content-addressable storage, and hash table distribution. For these scenarios, MD5 collisions are not a realistic threat. If there is any possibility of adversarial manipulation, use SHA-256 instead.',
    faq3_q: 'Can you reverse a hash?',
    faq3_a: 'No, cryptographic hash functions are designed to be one-way (preimage resistant). Given a hash value, it is computationally infeasible to find the original input. However, weak or short passwords can be "cracked" by trying every possible input and comparing hashes (brute-force attack) or by using precomputed lookup tables (rainbow tables). This is why passwords should be hashed with slow, salted algorithms like bcrypt or Argon2 — not with fast hash functions like MD5 or SHA-256 alone.',
    conclusion: 'Hash functions are a fundamental pillar of modern computing and cybersecurity. From verifying file downloads with <strong>MD5 checksums</strong> to securing blockchain transactions with <strong>SHA-256</strong>, understanding how to <strong>generate hash</strong> values and apply them correctly is essential knowledge for every developer. Remember to use SHA-256 or stronger for any security context, never hash passwords with plain SHA-256 (use bcrypt/Argon2), and always use HMAC for message authentication. Bookmark this guide for reference, and use our free online tool for instant hash generation.',
    linkToolBottom: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly with our free online tool.',
  },
  zh: {
    intro: '<strong>哈希函数</strong>是计算机科学和网络安全中最重要的基础构建块之一。每天，开发者和安全专家依赖 <strong>MD5 哈希生成器</strong>、<strong>SHA-256 哈希</strong>计算及其他哈希算法来验证文件完整性、安全存储密码、签署数字文档以及驱动区块链技术。无论你需要一个快速的在线哈希生成器来计算校验和，还是想深入了解加密哈希的内部原理，本综合指南涵盖了从基础理论到 JavaScript、Python、Bash 和 PowerShell 实际代码示例的所有内容。',
    linkTool: '立即试用我们的免费在线哈希生成器工具 — 支持 MD5、SHA-1、SHA-256、SHA-512。',
    h2_what: '什么是哈希函数？',
    whatDesc1: '<strong>哈希函数</strong>是一种数学算法，接受任意大小的输入（或"消息"），产生固定大小的输出，称为哈希值、哈希摘要或简称哈希。输出通常表示为十六进制字符串。例如，单词"hello"的 <strong>MD5 哈希</strong>始终是 32 字符的十六进制字符串 <code>5d41402abc4b2a76b9719d911017c592</code>，无论何时何地计算。',
    whatDesc2: '哈希函数有四个基本属性：<strong>确定性</strong> — 相同输入始终产生相同输出；<strong>固定输出长度</strong> — 无论输入多大或多小，哈希长度恒定（如 MD5 为 128 位，SHA-256 为 256 位）；<strong>单向性（原像抗性）</strong> — 给定哈希值，在计算上不可能逆向推导原始输入；<strong>雪崩效应</strong> — 输入的微小变化（即使一个位）会完全改变输出哈希。',
    whatDesc3: '第五个属性 <strong>抗碰撞性</strong> 对加密哈希函数至关重要。碰撞是指两个不同输入产生相同哈希值。强哈希函数如 <strong>SHA-256</strong> 的设计使得碰撞在计算上不可行，而旧算法如 <strong>MD5</strong> 和 <strong>SHA-1</strong> 已有已知的碰撞漏洞。',
    h2_algorithms: '常见哈希算法对比',
    algorithmsDesc: '目前有几种广泛使用的哈希算法，各有不同的输出大小、安全级别和性能特征。以下是最流行哈希算法的对比：',
    algorithmsTableNote: '<strong>MD5</strong> 产生 128 位（32 个十六进制字符）摘要，速度极快，但自 2004 年以来已被破解——碰撞可在数秒内生成。<strong>SHA-1</strong> 输出 160 位（40 个十六进制字符），2017 年 Google 展示了实际碰撞攻击。<strong>SHA-256</strong> 属于 SHA-2 家族，产生 256 位摘要，目前仍然安全。<strong>SHA-512</strong> 输出 512 位，提供更大的安全余量。',
    algorithmsAdvice: '对于任何安全敏感应用，使用 <strong>SHA-256</strong> 或 <strong>SHA-512</strong>。MD5 和 SHA-1 仅应用于校验和和数据去重等非安全目的。',
    h2_howWorks: '哈希函数工作原理',
    howWorksDesc: '大多数现代哈希函数遵循 <strong>Merkle-Damgard 构造</strong>，分为三个主要阶段：',
    howWorksStep1: '<strong>1. 消息填充</strong>：输入消息被填充使其长度成为块大小的倍数（MD5/SHA-1/SHA-256 为 512 位，SHA-512 为 1024 位）。填充包括追加一个 <code>1</code> 位、若干 <code>0</code> 位，以及原始消息长度的 64 位（或 128 位）表示。',
    howWorksStep2: '<strong>2. 分块处理</strong>：填充后的消息被分成固定大小的块。每个块与前一个块的输出（链接值）一起通过压缩函数处理。第一个块使用预定义的初始化向量。压缩函数涉及多轮位运算（AND、OR、XOR、NOT）、模加法和位旋转。SHA-256 每块使用 64 轮。',
    howWorksStep3: '<strong>3. 最终输出</strong>：所有块处理完后，最终链接值就是哈希摘要。对于 SHA-256，这是一个 256 位值，通常显示为 64 个十六进制字符。整个过程是确定性的，但内部混合使逆向不可行。',
    howWorksSummary: '这种构造的精妙之处在于，输入中即使一个位的变化也会导致完全不同的哈希输出（雪崩效应）。例如，"hello"和"Hello"的 SHA-256 哈希在 64 个十六进制字符中的每一个都不同。',
    h2_useCases: '哈希函数的实际应用场景',
    useCasesDesc: '<strong>哈希函数</strong>在现代计算中无处不在。以下是最重要的实际应用：',
    useCase1: '<strong>文件完整性验证（MD5 校验和 / SHA-256 校验和）</strong>：下载软件时，提供者通常发布哈希值（通常是 MD5 或 SHA-256）。你可以使用文件哈希检查器计算下载文件的哈希并与发布值比较。Linux 发行版和开源软件包通常使用 SHA-256 校验和。',
    useCase2: '<strong>密码存储</strong>：安全应用从不以明文存储密码，而是哈希密码并仅存储哈希。但简单哈希不够——现代最佳实践要求使用 bcrypt、scrypt 或 Argon2 等专用密码哈希算法的加盐哈希。',
    useCase3: '<strong>数字签名和证书</strong>：哈希函数是数字签名方案的核心组件。签署文档时，软件先计算文档哈希，然后用私钥加密该哈希。TLS/SSL 证书、代码签名和电子邮件签名都依赖哈希函数。',
    useCase4: '<strong>Git 版本控制</strong>：Git 使用 SHA-1 哈希来唯一标识每个提交、树、blob 和标签对象。每个提交 ID 都是提交内容、父哈希、作者信息和时间戳的 SHA-1 哈希。',
    useCase5: '<strong>区块链和加密货币</strong>：区块链技术从根本上依赖 SHA-256 哈希。比特币使用双重 SHA-256 进行区块头和交易验证。工作量证明挖矿过程涉及找到使 SHA-256 哈希低于目标阈值的随机数。',
    useCase6: '<strong>数据去重和缓存</strong>：云存储系统和备份工具使用哈希函数检测重复文件，无需逐字节比较。CDN 使用哈希作为 ETag 和缓存键来高效管理缓存内容。',
    h2_codeExamples: '哈希生成代码示例',
    codeJsTitle: 'JavaScript 哈希生成（浏览器和 Node.js）',
    codeJsDesc: '在浏览器中使用 Web Crypto API（<code>crypto.subtle.digest</code>）生成 SHA-256 哈希。在 Node.js 中使用内置 <code>crypto</code> 模块生成 MD5、SHA-1、SHA-256 和 SHA-512：',
    codePyTitle: 'Python 哈希生成（hashlib）',
    codePyDesc: 'Python 提供 <code>hashlib</code> 模块生成 MD5、SHA-1、SHA-256 等哈希。支持字符串和文件哈希：',
    codeBashTitle: 'Bash / Linux 哈希命令',
    codeBashDesc: 'Linux 和 macOS 提供 <code>md5sum</code>、<code>sha256sum</code> 和 <code>openssl dgst</code> 等内置命令，可直接在终端计算哈希：',
    codePsTitle: 'PowerShell 哈希生成（Get-FileHash）',
    codePsDesc: 'Windows PowerShell 提供 <code>Get-FileHash</code> 用于文件哈希，.NET 类用于字符串哈希。支持 MD5、SHA1、SHA256、SHA384 和 SHA512：',
    h2_md5vsSha: 'MD5 vs SHA-256：应该使用哪个？',
    md5vsShaDesc1: '<strong>MD5</strong> 和 <strong>SHA-256</strong> 的选择完全取决于用例。MD5 在密码学上已被破解——研究人员可在数秒内生成碰撞。对于任何安全相关应用，MD5 都不安全。',
    md5vsShaDesc2: '<strong>MD5 仍可接受的场景</strong>：非加密校验和（检测意外损坏而非恶意篡改）、缓存键生成、内容寻址存储去重、HTTP 缓存中的 ETag 和哈希表分布。这些场景中 MD5 的速度优势（比 SHA-256 快约 2-3 倍）有益。',
    md5vsShaDesc3: '<strong>必须使用 SHA-256 的场景</strong>：数字签名、证书验证、密码哈希、涉及篡改的文件完整性验证、区块链应用、代码签名、HMAC 构造用于 API 认证，以及任何合规驱动的场景（FIPS 140-2、PCI-DSS、HIPAA）。',
    md5vsShaDesc4: '<strong>总结</strong>：如有疑问，始终选择 SHA-256。大多数应用中性能差异可忽略，而 MD5 和 SHA-256 之间的安全差距巨大。',
    h2_bestPractices: '哈希安全最佳实践',
    bestPracticesDesc: '正确使用哈希函数与选择正确算法同样重要。以下是开发者的基本最佳实践：',
    bestPractice1: '<strong>永远不要用普通 MD5/SHA-256 哈希密码</strong>：SHA-256 虽然安全，但设计为快速——攻击者可在现代 GPU 上每秒计算数十亿次 SHA-256 哈希。应使用专用密码哈希函数：<strong>bcrypt</strong>、<strong>scrypt</strong> 或 <strong>Argon2</strong>。',
    bestPractice2: '<strong>密码哈希始终使用盐</strong>：盐是每个用户唯一的随机值，在哈希前附加到密码上。加盐防止彩虹表攻击，确保相同密码的两个用户有不同的存储哈希。bcrypt、scrypt 和 Argon2 自动处理加盐。',
    bestPractice3: '<strong>使用 HMAC 进行消息认证</strong>：需要验证消息的完整性和真实性时（如 API 请求、Webhook），使用 <strong>HMAC</strong> 而非普通哈希。HMAC-SHA256 是 API 认证的行业标准（AWS、Stripe、GitHub Webhook 等使用）。',
    bestPractice4: '<strong>避免长度扩展攻击</strong>：<code>Hash(secret + message)</code> 这样的简单构造容易受到长度扩展攻击。始终使用 HMAC 而非简单的密钥前缀哈希。SHA-3（Keccak）在设计上不受长度扩展攻击影响。',
    bestPractice5: '<strong>使用常量时间比较哈希值</strong>：比较哈希值时（如验证 HMAC 签名），始终使用常量时间比较函数以防止时序侧信道攻击。Node.js 中使用 <code>crypto.timingSafeEqual()</code>；Python 中使用 <code>hmac.compare_digest()</code>。',
    h2_faq: '常见问题',
    faq1_q: 'MD5 和 SHA-256 有什么区别？',
    faq1_a: 'MD5 产生 128 位（32 个十六进制字符）哈希，已被密码学破解——碰撞可在数秒内生成。SHA-256 产生 256 位（64 个十六进制字符）哈希，目前完全安全。MD5 更快但仅应用于非安全校验和。SHA-256 是数字签名、证书和安全应用的必需。',
    faq2_q: 'MD5 还安全吗？',
    faq2_a: 'MD5 对于任何加密或安全目的都不安全。自 2004 年以来已被破解，实际碰撞攻击可在数秒内完成。但 MD5 对于非安全用途仍可接受，如检测意外数据损坏的校验和、缓存键和哈希表分布。如果存在对抗性操纵的可能，请使用 SHA-256。',
    faq3_q: '可以反转哈希吗？',
    faq3_a: '不可以，加密哈希函数设计为单向（原像抗性）。给定哈希值，在计算上不可能找到原始输入。但弱密码或短密码可通过暴力攻击或彩虹表"破解"。这就是为什么密码应使用 bcrypt 或 Argon2 等慢速加盐算法哈希。',
    conclusion: '哈希函数是现代计算和网络安全的基础支柱。从用 MD5 校验和验证文件下载到用 SHA-256 保护区块链交易，理解如何生成和正确应用哈希值是每个开发者的必备知识。记住在安全场景中使用 SHA-256 或更强算法，密码使用 bcrypt/Argon2，消息认证使用 HMAC。',
    linkToolBottom: '使用我们的免费在线工具即时生成 MD5、SHA-1、SHA-256 和 SHA-512 哈希。',
  },
  fr: {
    intro: 'Les <strong>fonctions de hachage</strong> sont parmi les composants les plus importants en informatique et en cybersecurite. Chaque jour, les developpeurs utilisent des <strong>generateurs de hachage MD5</strong>, des calculs de <strong>hachage SHA-256</strong> et d\'autres algorithmes pour verifier l\'integrite des fichiers, stocker les mots de passe de maniere securisee et alimenter la blockchain. Ce guide complet couvre la theorie fondamentale et les exemples de code pratiques en JavaScript, Python, Bash et PowerShell.',
    linkTool: 'Essayez notre generateur de hachage en ligne gratuit — MD5, SHA-1, SHA-256, SHA-512.',
    h2_what: 'Qu\'est-ce qu\'une fonction de hachage ?',
    whatDesc1: 'Une <strong>fonction de hachage</strong> est un algorithme mathematique qui prend une entree de toute taille et produit une sortie de taille fixe appelee valeur de hachage. Par exemple, le <strong>hachage MD5</strong> du mot "hello" est toujours <code>5d41402abc4b2a76b9719d911017c592</code>.',
    whatDesc2: 'Les fonctions de hachage ont quatre proprietes essentielles : <strong>Deterministe</strong>, <strong>Longueur de sortie fixe</strong>, <strong>Unidirectionnelle</strong> (resistance a la preimage), et <strong>Effet avalanche</strong> — un petit changement dans l\'entree change completement le hachage.',
    whatDesc3: 'La <strong>resistance aux collisions</strong> est critique pour les fonctions de hachage cryptographiques. <strong>SHA-256</strong> reste securise tandis que <strong>MD5</strong> et <strong>SHA-1</strong> ont des vulnerabilites de collision connues.',
    h2_algorithms: 'Comparaison des algorithmes de hachage courants',
    algorithmsDesc: 'Voici une comparaison des algorithmes de hachage les plus populaires utilises aujourd\'hui :',
    algorithmsTableNote: '<strong>MD5</strong> produit un digest de 128 bits et est cryptographiquement casse depuis 2004. <strong>SHA-1</strong> produit 160 bits et Google a demontre une attaque en 2017. <strong>SHA-256</strong> produit 256 bits et reste securise. <strong>SHA-512</strong> produit 512 bits avec une marge de securite superieure.',
    algorithmsAdvice: 'Pour toute application sensible a la securite, utilisez <strong>SHA-256</strong> ou <strong>SHA-512</strong>.',
    h2_howWorks: 'Comment fonctionnent les fonctions de hachage',
    howWorksDesc: 'La plupart des fonctions de hachage modernes suivent la <strong>construction de Merkle-Damgard</strong> en trois etapes principales :',
    howWorksStep1: '<strong>1. Remplissage du message</strong> : Le message est complete pour que sa longueur devienne un multiple de la taille du bloc (512 bits pour SHA-256).',
    howWorksStep2: '<strong>2. Traitement par blocs</strong> : Le message est divise en blocs de taille fixe, chacun traite par une fonction de compression avec des operations binaires et des rotations.',
    howWorksStep3: '<strong>3. Sortie finale</strong> : Apres le traitement de tous les blocs, la valeur finale est le digest de hachage.',
    howWorksSummary: 'Meme un seul bit de changement dans l\'entree produit un hachage completement different (effet avalanche).',
    h2_useCases: 'Cas d\'utilisation pratiques',
    useCasesDesc: 'Les fonctions de hachage sont utilisees partout dans l\'informatique moderne :',
    useCase1: '<strong>Verification d\'integrite des fichiers</strong> : Comparez le hachage SHA-256 d\'un fichier telecharge avec la valeur publiee pour verifier qu\'il n\'a pas ete corrompu.',
    useCase2: '<strong>Stockage des mots de passe</strong> : Les applications securisees hachent les mots de passe avec bcrypt, scrypt ou Argon2 au lieu de les stocker en clair.',
    useCase3: '<strong>Signatures numeriques</strong> : Le logiciel calcule un hachage du document puis le chiffre avec la cle privee. Les certificats TLS/SSL dependent des fonctions de hachage.',
    useCase4: '<strong>Controle de version Git</strong> : Git utilise les hachages SHA-1 pour identifier de maniere unique chaque commit et objet.',
    useCase5: '<strong>Blockchain</strong> : Bitcoin utilise le double SHA-256 pour les en-tetes de blocs et la verification des transactions.',
    useCase6: '<strong>Deduplication et cache</strong> : Les systemes de stockage cloud utilisent les hachages pour detecter les fichiers en double sans comparaison octet par octet.',
    h2_codeExamples: 'Exemples de code de generation de hachage',
    codeJsTitle: 'JavaScript (navigateur et Node.js)',
    codeJsDesc: 'Utilisez <code>crypto.subtle.digest</code> dans le navigateur et le module <code>crypto</code> dans Node.js :',
    codePyTitle: 'Python (hashlib)',
    codePyDesc: 'Python fournit le module <code>hashlib</code> pour MD5, SHA-1, SHA-256 et autres :',
    codeBashTitle: 'Bash / Linux',
    codeBashDesc: 'Linux et macOS fournissent <code>md5sum</code>, <code>sha256sum</code> et <code>openssl dgst</code> :',
    codePsTitle: 'PowerShell (Get-FileHash)',
    codePsDesc: 'PowerShell fournit <code>Get-FileHash</code> pour les fichiers et les classes .NET pour les chaines :',
    h2_md5vsSha: 'MD5 vs SHA-256 : lequel utiliser ?',
    md5vsShaDesc1: 'MD5 est cryptographiquement casse — les collisions peuvent etre generees en secondes. Pour toute application ou la securite compte, MD5 n\'est pas sur.',
    md5vsShaDesc2: '<strong>MD5 acceptable</strong> : sommes de controle non cryptographiques, cles de cache, deduplication, ETags HTTP.',
    md5vsShaDesc3: '<strong>SHA-256 requis</strong> : signatures numeriques, certificats, hachage de mots de passe, blockchain, signature de code, HMAC pour l\'authentification API.',
    md5vsShaDesc4: '<strong>Conclusion</strong> : En cas de doute, choisissez toujours SHA-256.',
    h2_bestPractices: 'Bonnes pratiques de securite des hachages',
    bestPracticesDesc: 'Voici les bonnes pratiques essentielles pour les developpeurs :',
    bestPractice1: '<strong>Ne hachez jamais les mots de passe avec MD5/SHA-256 simple</strong> : Utilisez <strong>bcrypt</strong>, <strong>scrypt</strong> ou <strong>Argon2</strong> qui sont intentionnellement lents.',
    bestPractice2: '<strong>Utilisez toujours des sels</strong> : Un sel est une valeur aleatoire unique ajoutee au mot de passe avant le hachage, empechant les attaques par tables arc-en-ciel.',
    bestPractice3: '<strong>Utilisez HMAC pour l\'authentification des messages</strong> : HMAC-SHA256 est la norme industrielle pour l\'authentification API (AWS, Stripe, GitHub).',
    bestPractice4: '<strong>Evitez les attaques par extension de longueur</strong> : Utilisez HMAC au lieu de <code>Hash(secret + message)</code>.',
    bestPractice5: '<strong>Comparez les hachages en temps constant</strong> : Utilisez <code>crypto.timingSafeEqual()</code> en Node.js ou <code>hmac.compare_digest()</code> en Python.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Quelle est la difference entre MD5 et SHA-256 ?',
    faq1_a: 'MD5 produit un hachage de 128 bits et est cryptographiquement casse. SHA-256 produit un hachage de 256 bits et reste securise. MD5 est plus rapide mais ne doit etre utilise que pour des sommes de controle non securitaires.',
    faq2_q: 'MD5 est-il encore sur ?',
    faq2_a: 'MD5 n\'est PAS sur pour un usage cryptographique. Il est acceptable pour les sommes de controle non securitaires, les cles de cache et la deduplication.',
    faq3_q: 'Peut-on inverser un hachage ?',
    faq3_a: 'Non, les fonctions de hachage sont unidirectionnelles. Cependant, les mots de passe faibles peuvent etre "craques" par force brute ou tables arc-en-ciel. Utilisez bcrypt ou Argon2 pour les mots de passe.',
    conclusion: 'Les fonctions de hachage sont un pilier fondamental de l\'informatique et de la cybersecurite. Utilisez SHA-256 pour la securite, bcrypt/Argon2 pour les mots de passe et HMAC pour l\'authentification des messages.',
    linkToolBottom: 'Generez des hachages MD5, SHA-1, SHA-256 et SHA-512 instantanement avec notre outil gratuit.',
  },
  de: {
    intro: '<strong>Hash-Funktionen</strong> gehoren zu den wichtigsten Bausteinen in der Informatik und Cybersicherheit. Taglich verlassen sich Entwickler auf <strong>MD5-Hash-Generatoren</strong>, <strong>SHA-256-Hash</strong>-Berechnungen und andere Hashing-Algorithmen zur Uberprufung der Dateiintegritat, sicheren Passwortspeicherung und Blockchain-Technologie. Dieser umfassende Leitfaden deckt alles ab, von der grundlegenden Theorie bis zu praktischen Codebeispielen in JavaScript, Python, Bash und PowerShell.',
    linkTool: 'Testen Sie unseren kostenlosen Online-Hash-Generator — MD5, SHA-1, SHA-256, SHA-512.',
    h2_what: 'Was ist eine Hash-Funktion?',
    whatDesc1: 'Eine <strong>Hash-Funktion</strong> ist ein mathematischer Algorithmus, der eine Eingabe beliebiger Grosse nimmt und eine Ausgabe fester Grosse erzeugt. Zum Beispiel ist der <strong>MD5-Hash</strong> von "hello" immer <code>5d41402abc4b2a76b9719d911017c592</code>.',
    whatDesc2: 'Hash-Funktionen haben vier wesentliche Eigenschaften: <strong>Deterministisch</strong>, <strong>Feste Ausgabelange</strong>, <strong>Einweg</strong> (Preimage-Resistenz) und <strong>Lawineneffekt</strong> — eine kleine Anderung der Eingabe andert den Hash komplett.',
    whatDesc3: '<strong>Kollisionsresistenz</strong> ist entscheidend fur kryptografische Hash-Funktionen. <strong>SHA-256</strong> bleibt sicher, wahrend <strong>MD5</strong> und <strong>SHA-1</strong> bekannte Kollisionsschwachstellen haben.',
    h2_algorithms: 'Vergleich gangiger Hash-Algorithmen',
    algorithmsDesc: 'Hier ist ein Vergleich der popularsten Hash-Algorithmen:',
    algorithmsTableNote: '<strong>MD5</strong> erzeugt einen 128-Bit-Digest und ist seit 2004 kryptografisch gebrochen. <strong>SHA-1</strong> erzeugt 160 Bit und wurde 2017 durch Google praktisch angegriffen. <strong>SHA-256</strong> erzeugt 256 Bit und bleibt sicher. <strong>SHA-512</strong> erzeugt 512 Bit mit groesserem Sicherheitsspielraum.',
    algorithmsAdvice: 'Fur sicherheitskritische Anwendungen verwenden Sie <strong>SHA-256</strong> oder <strong>SHA-512</strong>.',
    h2_howWorks: 'Wie Hash-Funktionen funktionieren',
    howWorksDesc: 'Die meisten modernen Hash-Funktionen folgen der <strong>Merkle-Damgard-Konstruktion</strong> in drei Hauptphasen:',
    howWorksStep1: '<strong>1. Nachrichtenpadding</strong>: Die Nachricht wird aufgefullt, damit ihre Lange ein Vielfaches der Blockgrosse wird (512 Bit fur SHA-256).',
    howWorksStep2: '<strong>2. Blockverarbeitung</strong>: Die aufgefullte Nachricht wird in Blocke fester Grosse geteilt und durch eine Kompressionsfunktion mit Bitoperationen und Rotationen verarbeitet.',
    howWorksStep3: '<strong>3. Endausgabe</strong>: Nach Verarbeitung aller Blocke ist der letzte Verkettungswert der Hash-Digest.',
    howWorksSummary: 'Selbst eine einzelne Bitanderung in der Eingabe erzeugt einen vollig anderen Hash (Lawineneffekt).',
    h2_useCases: 'Praktische Anwendungsfalle',
    useCasesDesc: 'Hash-Funktionen werden uberall in der modernen Informatik verwendet:',
    useCase1: '<strong>Dateiintegritatsprufung</strong>: Vergleichen Sie den SHA-256-Hash einer heruntergeladenen Datei mit dem veroffentlichten Wert.',
    useCase2: '<strong>Passwortspeicherung</strong>: Sichere Anwendungen hashen Passworter mit bcrypt, scrypt oder Argon2 statt sie im Klartext zu speichern.',
    useCase3: '<strong>Digitale Signaturen</strong>: Die Software berechnet einen Hash des Dokuments und verschlusselt ihn mit dem privaten Schlussel. TLS/SSL-Zertifikate basieren auf Hash-Funktionen.',
    useCase4: '<strong>Git-Versionskontrolle</strong>: Git verwendet SHA-1-Hashes zur eindeutigen Identifizierung jedes Commits.',
    useCase5: '<strong>Blockchain</strong>: Bitcoin verwendet doppeltes SHA-256 fur Blockheader und Transaktionsverifizierung.',
    useCase6: '<strong>Deduplizierung und Caching</strong>: Cloud-Speicher verwenden Hashes zur Erkennung doppelter Dateien ohne Byte-fur-Byte-Vergleich.',
    h2_codeExamples: 'Hash-Generierung Codebeispiele',
    codeJsTitle: 'JavaScript (Browser und Node.js)',
    codeJsDesc: 'Verwenden Sie <code>crypto.subtle.digest</code> im Browser und das <code>crypto</code>-Modul in Node.js:',
    codePyTitle: 'Python (hashlib)',
    codePyDesc: 'Python bietet das <code>hashlib</code>-Modul fur MD5, SHA-1, SHA-256 und andere:',
    codeBashTitle: 'Bash / Linux',
    codeBashDesc: 'Linux und macOS bieten <code>md5sum</code>, <code>sha256sum</code> und <code>openssl dgst</code>:',
    codePsTitle: 'PowerShell (Get-FileHash)',
    codePsDesc: 'PowerShell bietet <code>Get-FileHash</code> fur Dateien und .NET-Klassen fur Strings:',
    h2_md5vsSha: 'MD5 vs SHA-256: Was sollten Sie verwenden?',
    md5vsShaDesc1: 'MD5 ist kryptografisch gebrochen — Kollisionen konnen in Sekunden generiert werden. Fur sicherheitsrelevante Anwendungen ist MD5 nicht sicher.',
    md5vsShaDesc2: '<strong>MD5 akzeptabel</strong>: Nicht-kryptografische Prufsummen, Cache-Schlussel, Deduplizierung, HTTP-ETags.',
    md5vsShaDesc3: '<strong>SHA-256 erforderlich</strong>: Digitale Signaturen, Zertifikate, Passwort-Hashing, Blockchain, Code-Signierung, HMAC fur API-Authentifizierung.',
    md5vsShaDesc4: '<strong>Fazit</strong>: Im Zweifelsfall immer SHA-256 wahlen.',
    h2_bestPractices: 'Best Practices fur Hash-Sicherheit',
    bestPracticesDesc: 'Hier sind wesentliche Best Practices fur Entwickler:',
    bestPractice1: '<strong>Hashen Sie Passworter nie mit einfachem MD5/SHA-256</strong>: Verwenden Sie <strong>bcrypt</strong>, <strong>scrypt</strong> oder <strong>Argon2</strong>.',
    bestPractice2: '<strong>Verwenden Sie immer Salts</strong>: Ein Salt ist ein zufalliger, benutzerspezifischer Wert, der vor dem Hashen angehangt wird und Rainbow-Table-Angriffe verhindert.',
    bestPractice3: '<strong>Verwenden Sie HMAC fur Nachrichtenauthentifizierung</strong>: HMAC-SHA256 ist der Industriestandard fur API-Authentifizierung.',
    bestPractice4: '<strong>Vermeiden Sie Length-Extension-Angriffe</strong>: Verwenden Sie HMAC statt <code>Hash(secret + message)</code>.',
    bestPractice5: '<strong>Vergleichen Sie Hashes in konstanter Zeit</strong>: Verwenden Sie <code>crypto.timingSafeEqual()</code> in Node.js oder <code>hmac.compare_digest()</code> in Python.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Was ist der Unterschied zwischen MD5 und SHA-256?',
    faq1_a: 'MD5 erzeugt einen 128-Bit-Hash und ist kryptografisch gebrochen. SHA-256 erzeugt einen 256-Bit-Hash und bleibt sicher. MD5 ist schneller, aber nur fur nicht-sicherheitsrelevante Prufsummen geeignet.',
    faq2_q: 'Ist MD5 noch sicher?',
    faq2_a: 'MD5 ist fur kryptografische Zwecke NICHT sicher. Es ist akzeptabel fur nicht-sicherheitsrelevante Prufsummen, Cache-Schlussel und Deduplizierung.',
    faq3_q: 'Kann man einen Hash umkehren?',
    faq3_a: 'Nein, Hash-Funktionen sind Einwegfunktionen. Schwache Passworter konnen jedoch durch Brute-Force oder Rainbow-Tables geknackt werden. Verwenden Sie bcrypt oder Argon2 fur Passworter.',
    conclusion: 'Hash-Funktionen sind ein grundlegender Pfeiler der modernen Informatik und Cybersicherheit. Verwenden Sie SHA-256 fur Sicherheit, bcrypt/Argon2 fur Passworter und HMAC fur Nachrichtenauthentifizierung.',
    linkToolBottom: 'Generieren Sie MD5-, SHA-1-, SHA-256- und SHA-512-Hashes sofort mit unserem kostenlosen Tool.',
  },
  es: {
    intro: 'Las <strong>funciones hash</strong> son de los componentes mas importantes en informatica y ciberseguridad. Cada dia, los desarrolladores utilizan <strong>generadores de hash MD5</strong>, calculos de <strong>hash SHA-256</strong> y otros algoritmos para verificar la integridad de archivos, almacenar contrasenas de forma segura y alimentar la blockchain. Esta guia completa cubre desde la teoria fundamental hasta ejemplos de codigo practicos en JavaScript, Python, Bash y PowerShell.',
    linkTool: 'Prueba nuestro generador de hash en linea gratuito — MD5, SHA-1, SHA-256, SHA-512.',
    h2_what: 'Que es una funcion hash?',
    whatDesc1: 'Una <strong>funcion hash</strong> es un algoritmo matematico que toma una entrada de cualquier tamano y produce una salida de tamano fijo llamada valor hash. Por ejemplo, el <strong>hash MD5</strong> de "hello" es siempre <code>5d41402abc4b2a76b9719d911017c592</code>.',
    whatDesc2: 'Las funciones hash tienen cuatro propiedades esenciales: <strong>Determinista</strong>, <strong>Longitud de salida fija</strong>, <strong>Unidireccional</strong> (resistencia a preimagen) y <strong>Efecto avalancha</strong> — un pequeno cambio en la entrada cambia completamente el hash.',
    whatDesc3: 'La <strong>resistencia a colisiones</strong> es critica para funciones hash criptograficas. <strong>SHA-256</strong> permanece seguro mientras que <strong>MD5</strong> y <strong>SHA-1</strong> tienen vulnerabilidades de colision conocidas.',
    h2_algorithms: 'Comparacion de algoritmos hash comunes',
    algorithmsDesc: 'Aqui hay una comparacion de los algoritmos hash mas populares:',
    algorithmsTableNote: '<strong>MD5</strong> produce un digest de 128 bits y esta criptograficamente roto desde 2004. <strong>SHA-1</strong> produce 160 bits y fue atacado por Google en 2017. <strong>SHA-256</strong> produce 256 bits y permanece seguro. <strong>SHA-512</strong> produce 512 bits con mayor margen de seguridad.',
    algorithmsAdvice: 'Para cualquier aplicacion sensible a la seguridad, use <strong>SHA-256</strong> o <strong>SHA-512</strong>.',
    h2_howWorks: 'Como funcionan las funciones hash',
    howWorksDesc: 'La mayoria de las funciones hash modernas siguen la <strong>construccion Merkle-Damgard</strong> en tres etapas:',
    howWorksStep1: '<strong>1. Relleno del mensaje</strong>: El mensaje se rellena para que su longitud sea multiplo del tamano del bloque (512 bits para SHA-256).',
    howWorksStep2: '<strong>2. Procesamiento por bloques</strong>: El mensaje se divide en bloques de tamano fijo, procesados por una funcion de compresion con operaciones bit a bit y rotaciones.',
    howWorksStep3: '<strong>3. Salida final</strong>: Despues de procesar todos los bloques, el valor final es el digest hash.',
    howWorksSummary: 'Incluso un solo bit de cambio en la entrada produce un hash completamente diferente (efecto avalancha).',
    h2_useCases: 'Casos de uso practicos',
    useCasesDesc: 'Las funciones hash se usan en todas partes en la informatica moderna:',
    useCase1: '<strong>Verificacion de integridad de archivos</strong>: Compare el hash SHA-256 de un archivo descargado con el valor publicado.',
    useCase2: '<strong>Almacenamiento de contrasenas</strong>: Las aplicaciones seguras hashean contrasenas con bcrypt, scrypt o Argon2.',
    useCase3: '<strong>Firmas digitales</strong>: El software calcula un hash del documento y lo cifra con la clave privada. Los certificados TLS/SSL dependen de funciones hash.',
    useCase4: '<strong>Control de versiones Git</strong>: Git usa hashes SHA-1 para identificar de forma unica cada commit.',
    useCase5: '<strong>Blockchain</strong>: Bitcoin usa doble SHA-256 para encabezados de bloques y verificacion de transacciones.',
    useCase6: '<strong>Deduplicacion y cache</strong>: Los sistemas de almacenamiento cloud usan hashes para detectar archivos duplicados sin comparacion byte a byte.',
    h2_codeExamples: 'Ejemplos de codigo de generacion de hash',
    codeJsTitle: 'JavaScript (navegador y Node.js)',
    codeJsDesc: 'Use <code>crypto.subtle.digest</code> en el navegador y el modulo <code>crypto</code> en Node.js:',
    codePyTitle: 'Python (hashlib)',
    codePyDesc: 'Python proporciona el modulo <code>hashlib</code> para MD5, SHA-1, SHA-256 y otros:',
    codeBashTitle: 'Bash / Linux',
    codeBashDesc: 'Linux y macOS proporcionan <code>md5sum</code>, <code>sha256sum</code> y <code>openssl dgst</code>:',
    codePsTitle: 'PowerShell (Get-FileHash)',
    codePsDesc: 'PowerShell proporciona <code>Get-FileHash</code> para archivos y clases .NET para cadenas:',
    h2_md5vsSha: 'MD5 vs SHA-256: cual usar?',
    md5vsShaDesc1: 'MD5 esta criptograficamente roto — las colisiones se pueden generar en segundos. Para aplicaciones de seguridad, MD5 no es seguro.',
    md5vsShaDesc2: '<strong>MD5 aceptable</strong>: sumas de verificacion no criptograficas, claves de cache, deduplicacion, ETags HTTP.',
    md5vsShaDesc3: '<strong>SHA-256 requerido</strong>: firmas digitales, certificados, hashing de contrasenas, blockchain, firma de codigo, HMAC para autenticacion API.',
    md5vsShaDesc4: '<strong>Conclusion</strong>: En caso de duda, siempre elija SHA-256.',
    h2_bestPractices: 'Mejores practicas de seguridad hash',
    bestPracticesDesc: 'Estas son las mejores practicas esenciales para desarrolladores:',
    bestPractice1: '<strong>Nunca hashee contrasenas con MD5/SHA-256 simple</strong>: Use <strong>bcrypt</strong>, <strong>scrypt</strong> o <strong>Argon2</strong>.',
    bestPractice2: '<strong>Use siempre sales</strong>: Una sal es un valor aleatorio unico anadido a la contrasena antes del hashing, previniendo ataques de tablas arcoiris.',
    bestPractice3: '<strong>Use HMAC para autenticacion de mensajes</strong>: HMAC-SHA256 es el estandar de la industria para autenticacion API.',
    bestPractice4: '<strong>Evite ataques de extension de longitud</strong>: Use HMAC en lugar de <code>Hash(secret + message)</code>.',
    bestPractice5: '<strong>Compare hashes en tiempo constante</strong>: Use <code>crypto.timingSafeEqual()</code> en Node.js o <code>hmac.compare_digest()</code> en Python.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Cual es la diferencia entre MD5 y SHA-256?',
    faq1_a: 'MD5 produce un hash de 128 bits y esta criptograficamente roto. SHA-256 produce un hash de 256 bits y permanece seguro. MD5 es mas rapido pero solo debe usarse para sumas de verificacion no de seguridad.',
    faq2_q: 'MD5 sigue siendo seguro?',
    faq2_a: 'MD5 NO es seguro para uso criptografico. Es aceptable para sumas de verificacion no de seguridad, claves de cache y deduplicacion.',
    faq3_q: 'Se puede revertir un hash?',
    faq3_a: 'No, las funciones hash son unidireccionales. Sin embargo, las contrasenas debiles pueden ser "descifradas" por fuerza bruta o tablas arcoiris. Use bcrypt o Argon2 para contrasenas.',
    conclusion: 'Las funciones hash son un pilar fundamental de la informatica y la ciberseguridad. Use SHA-256 para seguridad, bcrypt/Argon2 para contrasenas y HMAC para autenticacion de mensajes.',
    linkToolBottom: 'Genere hashes MD5, SHA-1, SHA-256 y SHA-512 al instante con nuestra herramienta gratuita.',
  },
  ja: {
    intro: '<strong>ハッシュ関数</strong>はコンピュータサイエンスとサイバーセキュリティにおける最も重要な基盤の一つです。毎日、開発者とセキュリティ専門家が<strong>MD5ハッシュジェネレーター</strong>、<strong>SHA-256ハッシュ</strong>計算、その他のハッシュアルゴリズムを使用して、ファイルの完全性検証、パスワードの安全な保存、デジタル署名、ブロックチェーン技術を支えています。この包括的なガイドでは、基礎理論からJavaScript、Python、Bash、PowerShellの実践的なコード例まで、すべてをカバーします。',
    linkTool: '無料オンラインハッシュジェネレーターツールをお試しください — MD5、SHA-1、SHA-256、SHA-512対応。',
    h2_what: 'ハッシュ関数とは？',
    whatDesc1: '<strong>ハッシュ関数</strong>は、任意のサイズの入力を受け取り、固定サイズの出力（ハッシュ値）を生成する数学的アルゴリズムです。例えば、"hello"の<strong>MD5ハッシュ</strong>は常に<code>5d41402abc4b2a76b9719d911017c592</code>です。',
    whatDesc2: 'ハッシュ関数には4つの基本的な特性があります：<strong>決定性</strong>、<strong>固定長出力</strong>、<strong>一方向性</strong>（原像耐性）、<strong>雪崩効果</strong> — 入力のわずかな変更で出力が完全に変わります。',
    whatDesc3: '<strong>衝突耐性</strong>は暗号学的ハッシュ関数にとって重要です。<strong>SHA-256</strong>は安全なままですが、<strong>MD5</strong>と<strong>SHA-1</strong>には既知の衝突脆弱性があります。',
    h2_algorithms: '一般的なハッシュアルゴリズムの比較',
    algorithmsDesc: '最も一般的なハッシュアルゴリズムの比較です：',
    algorithmsTableNote: '<strong>MD5</strong>は128ビットのダイジェストを生成し、2004年以降暗号学的に破られています。<strong>SHA-1</strong>は160ビットで、2017年にGoogleが実用的な攻撃を実証しました。<strong>SHA-256</strong>は256ビットで安全なまま。<strong>SHA-512</strong>は512ビットでより大きなセキュリティマージンを提供します。',
    algorithmsAdvice: 'セキュリティに敏感なアプリケーションには<strong>SHA-256</strong>または<strong>SHA-512</strong>を使用してください。',
    h2_howWorks: 'ハッシュ関数の仕組み',
    howWorksDesc: 'ほとんどの現代のハッシュ関数は<strong>Merkle-Damgard構造</strong>に従い、3つの主要段階で動作します：',
    howWorksStep1: '<strong>1. メッセージパディング</strong>：メッセージはブロックサイズの倍数になるようパディングされます（SHA-256では512ビット）。',
    howWorksStep2: '<strong>2. ブロック処理</strong>：パディングされたメッセージは固定サイズのブロックに分割され、ビット演算とローテーションを含む圧縮関数で処理されます。',
    howWorksStep3: '<strong>3. 最終出力</strong>：すべてのブロック処理後、最終的な連鎖値がハッシュダイジェストとなります。',
    howWorksSummary: '入力の1ビットの変更でも完全に異なるハッシュ出力が生成されます（雪崩効果）。',
    h2_useCases: '実用的なユースケース',
    useCasesDesc: 'ハッシュ関数は現代のコンピューティングのあらゆる場所で使用されています：',
    useCase1: '<strong>ファイル整合性検証</strong>：ダウンロードしたファイルのSHA-256ハッシュを公開値と比較します。',
    useCase2: '<strong>パスワード保存</strong>：安全なアプリケーションはパスワードをbcrypt、scrypt、またはArgon2でハッシュ化します。',
    useCase3: '<strong>デジタル署名</strong>：ソフトウェアはドキュメントのハッシュを計算し、秘密鍵で暗号化します。TLS/SSL証明書はハッシュ関数に依存しています。',
    useCase4: '<strong>Gitバージョン管理</strong>：GitはSHA-1ハッシュを使用して各コミットを一意に識別します。',
    useCase5: '<strong>ブロックチェーン</strong>：Bitcoinはブロックヘッダーとトランザクション検証にダブルSHA-256を使用します。',
    useCase6: '<strong>重複排除とキャッシュ</strong>：クラウドストレージシステムはハッシュを使用してバイト単位の比較なしに重複ファイルを検出します。',
    h2_codeExamples: 'ハッシュ生成コード例',
    codeJsTitle: 'JavaScript（ブラウザとNode.js）',
    codeJsDesc: 'ブラウザでは<code>crypto.subtle.digest</code>を、Node.jsでは<code>crypto</code>モジュールを使用します：',
    codePyTitle: 'Python（hashlib）',
    codePyDesc: 'Pythonは<code>hashlib</code>モジュールでMD5、SHA-1、SHA-256などを提供します：',
    codeBashTitle: 'Bash / Linux',
    codeBashDesc: 'LinuxとmacOSは<code>md5sum</code>、<code>sha256sum</code>、<code>openssl dgst</code>を提供します：',
    codePsTitle: 'PowerShell（Get-FileHash）',
    codePsDesc: 'PowerShellはファイル用の<code>Get-FileHash</code>と文字列用の.NETクラスを提供します：',
    h2_md5vsSha: 'MD5 vs SHA-256：どちらを使うべきか？',
    md5vsShaDesc1: 'MD5は暗号学的に破られています — 衝突は数秒で生成できます。セキュリティが重要なアプリケーションにMD5は安全ではありません。',
    md5vsShaDesc2: '<strong>MD5が許容される場面</strong>：非暗号チェックサム、キャッシュキー、重複排除、HTTP ETag。',
    md5vsShaDesc3: '<strong>SHA-256が必要な場面</strong>：デジタル署名、証明書、パスワードハッシュ、ブロックチェーン、コード署名、API認証用HMAC。',
    md5vsShaDesc4: '<strong>結論</strong>：迷ったら常にSHA-256を選択してください。',
    h2_bestPractices: 'ハッシュセキュリティのベストプラクティス',
    bestPracticesDesc: '開発者のための基本的なベストプラクティスです：',
    bestPractice1: '<strong>パスワードをプレーンなMD5/SHA-256でハッシュしない</strong>：<strong>bcrypt</strong>、<strong>scrypt</strong>、または<strong>Argon2</strong>を使用してください。',
    bestPractice2: '<strong>常にソルトを使用する</strong>：ソルトはハッシュ前にパスワードに追加されるユーザー固有のランダム値で、レインボーテーブル攻撃を防ぎます。',
    bestPractice3: '<strong>メッセージ認証にHMACを使用する</strong>：HMAC-SHA256はAPI認証の業界標準です（AWS、Stripe、GitHub Webhookなど）。',
    bestPractice4: '<strong>長さ拡張攻撃を避ける</strong>：<code>Hash(secret + message)</code>の代わりにHMACを使用してください。',
    bestPractice5: '<strong>定数時間でハッシュを比較する</strong>：Node.jsでは<code>crypto.timingSafeEqual()</code>、Pythonでは<code>hmac.compare_digest()</code>を使用してください。',
    h2_faq: 'よくある質問',
    faq1_q: 'MD5とSHA-256の違いは何ですか？',
    faq1_a: 'MD5は128ビットのハッシュを生成し暗号学的に破られています。SHA-256は256ビットのハッシュを生成し安全なままです。MD5は高速ですが非セキュリティ用途のチェックサムにのみ使用すべきです。',
    faq2_q: 'MD5はまだ安全ですか？',
    faq2_a: 'MD5は暗号用途には安全ではありません。非セキュリティチェックサム、キャッシュキー、重複排除には許容されます。',
    faq3_q: 'ハッシュを逆変換できますか？',
    faq3_a: 'いいえ、ハッシュ関数は一方向に設計されています。ただし、弱いパスワードはブルートフォースやレインボーテーブルで「クラック」される可能性があります。パスワードにはbcryptやArgon2を使用してください。',
    conclusion: 'ハッシュ関数は現代のコンピューティングとサイバーセキュリティの基本的な柱です。セキュリティにはSHA-256を、パスワードにはbcrypt/Argon2を、メッセージ認証にはHMACを使用してください。',
    linkToolBottom: '無料オンラインツールでMD5、SHA-1、SHA-256、SHA-512ハッシュを即座に生成。',
  },
  ko: {
    intro: '<strong>해시 함수</strong>는 컴퓨터 과학과 사이버 보안에서 가장 중요한 기본 구성 요소 중 하나입니다. 매일 개발자와 보안 전문가들이 <strong>MD5 해시 생성기</strong>, <strong>SHA-256 해시</strong> 계산 및 기타 해싱 알고리즘을 사용하여 파일 무결성 검증, 안전한 비밀번호 저장, 디지털 서명, 블록체인 기술을 지원합니다. 이 종합 가이드는 기본 이론부터 JavaScript, Python, Bash, PowerShell의 실용적인 코드 예제까지 모든 것을 다룹니다.',
    linkTool: '무료 온라인 해시 생성기 도구를 사용해 보세요 — MD5, SHA-1, SHA-256, SHA-512 지원.',
    h2_what: '해시 함수란?',
    whatDesc1: '<strong>해시 함수</strong>는 임의 크기의 입력을 받아 고정 크기의 출력(해시 값)을 생성하는 수학적 알고리즘입니다. 예를 들어, "hello"의 <strong>MD5 해시</strong>는 항상 <code>5d41402abc4b2a76b9719d911017c592</code>입니다.',
    whatDesc2: '해시 함수에는 네 가지 기본 속성이 있습니다: <strong>결정적</strong>, <strong>고정 길이 출력</strong>, <strong>일방향</strong>(역상 저항), <strong>눈사태 효과</strong> — 입력의 작은 변경이 해시를 완전히 바꿉니다.',
    whatDesc3: '<strong>충돌 저항</strong>은 암호학적 해시 함수에 중요합니다. <strong>SHA-256</strong>은 안전하지만 <strong>MD5</strong>와 <strong>SHA-1</strong>에는 알려진 충돌 취약점이 있습니다.',
    h2_algorithms: '일반적인 해시 알고리즘 비교',
    algorithmsDesc: '가장 인기 있는 해시 알고리즘의 비교입니다:',
    algorithmsTableNote: '<strong>MD5</strong>는 128비트 다이제스트를 생성하며 2004년부터 암호학적으로 깨졌습니다. <strong>SHA-1</strong>은 160비트이며 2017년 Google이 실용적 공격을 시연했습니다. <strong>SHA-256</strong>은 256비트로 안전합니다. <strong>SHA-512</strong>는 512비트로 더 큰 보안 마진을 제공합니다.',
    algorithmsAdvice: '보안에 민감한 애플리케이션에는 <strong>SHA-256</strong> 또는 <strong>SHA-512</strong>를 사용하세요.',
    h2_howWorks: '해시 함수의 작동 원리',
    howWorksDesc: '대부분의 현대 해시 함수는 <strong>Merkle-Damgard 구조</strong>를 따르며 세 가지 주요 단계로 작동합니다:',
    howWorksStep1: '<strong>1. 메시지 패딩</strong>: 메시지는 블록 크기의 배수가 되도록 패딩됩니다(SHA-256의 경우 512비트).',
    howWorksStep2: '<strong>2. 블록 처리</strong>: 패딩된 메시지는 고정 크기 블록으로 나뉘어 비트 연산과 회전을 포함하는 압축 함수로 처리됩니다.',
    howWorksStep3: '<strong>3. 최종 출력</strong>: 모든 블록 처리 후 최종 체이닝 값이 해시 다이제스트가 됩니다.',
    howWorksSummary: '입력의 단 1비트 변경만으로도 완전히 다른 해시 출력이 생성됩니다(눈사태 효과).',
    h2_useCases: '실용적인 사용 사례',
    useCasesDesc: '해시 함수는 현대 컴퓨팅 곳곳에서 사용됩니다:',
    useCase1: '<strong>파일 무결성 검증</strong>: 다운로드한 파일의 SHA-256 해시를 공개된 값과 비교합니다.',
    useCase2: '<strong>비밀번호 저장</strong>: 안전한 애플리케이션은 비밀번호를 bcrypt, scrypt 또는 Argon2로 해시합니다.',
    useCase3: '<strong>디지털 서명</strong>: 소프트웨어가 문서의 해시를 계산하고 개인 키로 암호화합니다. TLS/SSL 인증서는 해시 함수에 의존합니다.',
    useCase4: '<strong>Git 버전 관리</strong>: Git은 SHA-1 해시를 사용하여 각 커밋을 고유하게 식별합니다.',
    useCase5: '<strong>블록체인</strong>: Bitcoin은 블록 헤더와 트랜잭션 검증에 이중 SHA-256을 사용합니다.',
    useCase6: '<strong>중복 제거 및 캐싱</strong>: 클라우드 스토리지 시스템은 바이트 단위 비교 없이 해시로 중복 파일을 감지합니다.',
    h2_codeExamples: '해시 생성 코드 예제',
    codeJsTitle: 'JavaScript (브라우저 및 Node.js)',
    codeJsDesc: '브라우저에서 <code>crypto.subtle.digest</code>를, Node.js에서 <code>crypto</code> 모듈을 사용합니다:',
    codePyTitle: 'Python (hashlib)',
    codePyDesc: 'Python은 <code>hashlib</code> 모듈로 MD5, SHA-1, SHA-256 등을 제공합니다:',
    codeBashTitle: 'Bash / Linux',
    codeBashDesc: 'Linux와 macOS는 <code>md5sum</code>, <code>sha256sum</code>, <code>openssl dgst</code>를 제공합니다:',
    codePsTitle: 'PowerShell (Get-FileHash)',
    codePsDesc: 'PowerShell은 파일용 <code>Get-FileHash</code>와 문자열용 .NET 클래스를 제공합니다:',
    h2_md5vsSha: 'MD5 vs SHA-256: 어떤 것을 사용해야 할까?',
    md5vsShaDesc1: 'MD5는 암호학적으로 깨졌습니다 — 충돌이 몇 초 만에 생성될 수 있습니다. 보안이 중요한 애플리케이션에 MD5는 안전하지 않습니다.',
    md5vsShaDesc2: '<strong>MD5가 허용되는 경우</strong>: 비암호 체크섬, 캐시 키, 중복 제거, HTTP ETag.',
    md5vsShaDesc3: '<strong>SHA-256이 필요한 경우</strong>: 디지털 서명, 인증서, 비밀번호 해싱, 블록체인, 코드 서명, API 인증용 HMAC.',
    md5vsShaDesc4: '<strong>결론</strong>: 의심스러우면 항상 SHA-256을 선택하세요.',
    h2_bestPractices: '해시 보안 모범 사례',
    bestPracticesDesc: '개발자를 위한 필수 모범 사례입니다:',
    bestPractice1: '<strong>비밀번호를 일반 MD5/SHA-256으로 해시하지 마세요</strong>: <strong>bcrypt</strong>, <strong>scrypt</strong> 또는 <strong>Argon2</strong>를 사용하세요.',
    bestPractice2: '<strong>항상 솔트를 사용하세요</strong>: 솔트는 해싱 전에 비밀번호에 추가되는 사용자별 고유 랜덤 값으로, 레인보우 테이블 공격을 방지합니다.',
    bestPractice3: '<strong>메시지 인증에 HMAC을 사용하세요</strong>: HMAC-SHA256은 API 인증의 업계 표준입니다(AWS, Stripe, GitHub Webhook 등).',
    bestPractice4: '<strong>길이 확장 공격을 피하세요</strong>: <code>Hash(secret + message)</code> 대신 HMAC을 사용하세요.',
    bestPractice5: '<strong>해시를 상수 시간으로 비교하세요</strong>: Node.js에서 <code>crypto.timingSafeEqual()</code>, Python에서 <code>hmac.compare_digest()</code>를 사용하세요.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'MD5와 SHA-256의 차이점은 무엇인가요?',
    faq1_a: 'MD5는 128비트 해시를 생성하며 암호학적으로 깨졌습니다. SHA-256은 256비트 해시를 생성하며 안전합니다. MD5는 빠르지만 비보안 체크섬에만 사용해야 합니다.',
    faq2_q: 'MD5는 아직 안전한가요?',
    faq2_a: 'MD5는 암호 용도로 안전하지 않습니다. 비보안 체크섬, 캐시 키, 중복 제거에는 허용됩니다.',
    faq3_q: '해시를 역변환할 수 있나요?',
    faq3_a: '아닙니다, 해시 함수는 일방향으로 설계되었습니다. 하지만 약한 비밀번호는 무차별 대입이나 레인보우 테이블로 "크랙"될 수 있습니다. 비밀번호에는 bcrypt나 Argon2를 사용하세요.',
    conclusion: '해시 함수는 현대 컴퓨팅과 사이버 보안의 기본적인 기둥입니다. 보안에는 SHA-256을, 비밀번호에는 bcrypt/Argon2를, 메시지 인증에는 HMAC을 사용하세요.',
    linkToolBottom: '무료 온라인 도구로 MD5, SHA-1, SHA-256, SHA-512 해시를 즉시 생성하세요.',
  },
};

export default function HashGeneratorMd5Sha256Guide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/hash-generator`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is a Hash Function? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: Common Hash Algorithms Compared */}
      <h2>{s.h2_algorithms}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.algorithmsDesc }} />
      <table>
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Output Size</th>
            <th>Hex Length</th>
            <th>Security Status</th>
            <th>Speed</th>
            <th>Use Cases</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>MD5</strong></td>
            <td>128 bits</td>
            <td>32 chars</td>
            <td>Broken (2004)</td>
            <td>Very Fast</td>
            <td>Checksums, caching</td>
          </tr>
          <tr>
            <td><strong>SHA-1</strong></td>
            <td>160 bits</td>
            <td>40 chars</td>
            <td>Broken (2017)</td>
            <td>Fast</td>
            <td>Git (legacy), fingerprints</td>
          </tr>
          <tr>
            <td><strong>SHA-256</strong></td>
            <td>256 bits</td>
            <td>64 chars</td>
            <td>Secure</td>
            <td>Moderate</td>
            <td>Signatures, blockchain, TLS</td>
          </tr>
          <tr>
            <td><strong>SHA-512</strong></td>
            <td>512 bits</td>
            <td>128 chars</td>
            <td>Secure</td>
            <td>Moderate</td>
            <td>High-security applications</td>
          </tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: s.algorithmsTableNote }} />
      <p dangerouslySetInnerHTML={{ __html: s.algorithmsAdvice }} />

      {/* Section 3: How Hash Functions Work */}
      <h2>{s.h2_howWorks}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksStep1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksStep2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksStep3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksSummary }} />

      {/* Section 4: Practical Use Cases */}
      <h2>{s.h2_useCases}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.useCasesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase6 }} />

      {/* Section 5: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`// ===== Browser: Web Crypto API (SHA-256) =====

async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Usage
const hash = await sha256('Hello World');
console.log(hash);
// "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"

// Supports SHA-1, SHA-256, SHA-384, SHA-512
async function hashDigest(message, algorithm = 'SHA-256') {
  const data = new TextEncoder().encode(message);
  const buffer = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

await hashDigest('hello', 'SHA-1');    // "aaf4c61d..."
await hashDigest('hello', 'SHA-256');  // "2cf24dba..."
await hashDigest('hello', 'SHA-512');  // "9b71d224..."

// ===== Node.js: crypto module =====

const crypto = require('crypto');

// MD5 hash
const md5 = crypto.createHash('md5').update('Hello World').digest('hex');
console.log(md5); // "b10a8db164e0754105b7a99be72e3fe5"

// SHA-1 hash
const sha1 = crypto.createHash('sha1').update('Hello World').digest('hex');
console.log(sha1); // "0a4d55a8d778e5022fab701977c5d840bbc486d0"

// SHA-256 hash
const sha256 = crypto.createHash('sha256').update('Hello World').digest('hex');
console.log(sha256); // "a591a6d40bf420404a011733cfb7b190..."

// SHA-512 hash
const sha512 = crypto.createHash('sha512').update('Hello World').digest('hex');
console.log(sha512); // "2c74fd17edafd80e8447b0d46741ee24..."

// Hash a file
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

const fileHash = await hashFile('./package.json', 'sha256');`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`import hashlib

# MD5 hash
md5_hash = hashlib.md5("Hello World".encode('utf-8')).hexdigest()
print(md5_hash)  # "b10a8db164e0754105b7a99be72e3fe5"

# SHA-1 hash
sha1_hash = hashlib.sha1("Hello World".encode('utf-8')).hexdigest()
print(sha1_hash)  # "0a4d55a8d778e5022fab701977c5d840bbc486d0"

# SHA-256 hash
sha256_hash = hashlib.sha256("Hello World".encode('utf-8')).hexdigest()
print(sha256_hash)  # "a591a6d40bf420404a011733cfb7b190..."

# SHA-512 hash
sha512_hash = hashlib.sha512("Hello World".encode('utf-8')).hexdigest()
print(sha512_hash)  # "2c74fd17edafd80e8447b0d46741ee24..."

# Hash a file (memory-efficient for large files)
def hash_file(filepath, algorithm='sha256'):
    h = hashlib.new(algorithm)
    with open(filepath, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            h.update(chunk)
    return h.hexdigest()

file_hash = hash_file('document.pdf', 'sha256')
print(f"SHA-256: {file_hash}")

# Compare file hashes for integrity verification
def verify_integrity(filepath, expected_hash, algorithm='sha256'):
    actual_hash = hash_file(filepath, algorithm)
    return actual_hash == expected_hash

# List all available hash algorithms
print(hashlib.algorithms_available)
# {'md5', 'sha1', 'sha256', 'sha512', 'sha3_256', ...}`}</code></pre>

      <h3>{s.codeBashTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeBashDesc }} />
      <pre><code>{`# MD5 hash of a string
echo -n "Hello World" | md5sum
# b10a8db164e0754105b7a99be72e3fe5  -

# SHA-1 hash of a string
echo -n "Hello World" | sha1sum
# 0a4d55a8d778e5022fab701977c5d840bbc486d0  -

# SHA-256 hash of a string
echo -n "Hello World" | sha256sum
# a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e  -

# SHA-512 hash of a string
echo -n "Hello World" | sha512sum
# 2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f2...  -

# Hash a file
md5sum package.json
sha256sum package.json
sha512sum package.json

# Using openssl (works on both Linux and macOS)
echo -n "Hello World" | openssl dgst -md5
echo -n "Hello World" | openssl dgst -sha1
echo -n "Hello World" | openssl dgst -sha256
echo -n "Hello World" | openssl dgst -sha512

# Hash a file with openssl
openssl dgst -sha256 package.json

# macOS uses shasum instead of sha256sum
echo -n "Hello World" | shasum -a 256
echo -n "Hello World" | shasum -a 512

# Verify a downloaded file against a known hash
echo "expected_hash_here  filename" | sha256sum --check

# Hash all files in a directory
find . -type f -exec sha256sum {} \\;`}</code></pre>

      <h3>{s.codePsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePsDesc }} />
      <pre><code>{`# Hash a file with Get-FileHash (SHA-256 is default)
Get-FileHash -Path "C:\\document.pdf"
Get-FileHash -Path "C:\\document.pdf" -Algorithm MD5
Get-FileHash -Path "C:\\document.pdf" -Algorithm SHA1
Get-FileHash -Path "C:\\document.pdf" -Algorithm SHA256
Get-FileHash -Path "C:\\document.pdf" -Algorithm SHA512

# Hash a string (MD5)
$md5 = [System.Security.Cryptography.MD5]::Create()
$bytes = [System.Text.Encoding]::UTF8.GetBytes("Hello World")
$hash = $md5.ComputeHash($bytes)
$hashString = [BitConverter]::ToString($hash).Replace("-", "").ToLower()
Write-Output $hashString
# "b10a8db164e0754105b7a99be72e3fe5"

# Hash a string (SHA-256)
$sha256 = [System.Security.Cryptography.SHA256]::Create()
$bytes = [System.Text.Encoding]::UTF8.GetBytes("Hello World")
$hash = $sha256.ComputeHash($bytes)
$hashString = [BitConverter]::ToString($hash).Replace("-", "").ToLower()
Write-Output $hashString
# "a591a6d40bf420404a011733cfb7b190..."

# Reusable function for string hashing
function Get-StringHash {
    param(
        [string]$InputString,
        [string]$Algorithm = "SHA256"
    )
    $hasher = [System.Security.Cryptography.HashAlgorithm]::Create($Algorithm)
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($InputString)
    $hash = $hasher.ComputeHash($bytes)
    return [BitConverter]::ToString($hash).Replace("-", "").ToLower()
}

Get-StringHash "Hello World" "MD5"
Get-StringHash "Hello World" "SHA256"
Get-StringHash "Hello World" "SHA512"

# Verify file integrity
$expected = "a591a6d40bf420404a011733cfb7b190..."
$actual = (Get-FileHash -Path "file.zip" -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "MATCH" } else { "MISMATCH" }`}</code></pre>

      {/* Section 6: MD5 vs SHA-256 */}
      <h2>{s.h2_md5vsSha}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.md5vsShaDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.md5vsShaDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.md5vsShaDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.md5vsShaDesc4 }} />

      {/* Section 7: Hash Security Best Practices */}
      <h2>{s.h2_bestPractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bestPracticesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice5 }} />

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/hash-generator`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
