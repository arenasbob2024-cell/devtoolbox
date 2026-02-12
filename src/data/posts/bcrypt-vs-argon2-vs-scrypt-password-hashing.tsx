'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Bcrypt vs Argon2 vs Scrypt: Which Password Hashing Algorithm Should You Use?',
    intro: 'Choosing the right password hashing algorithm is one of the most critical security decisions you will make in any application that handles user credentials. A weak choice can expose millions of passwords in a data breach, while the right algorithm can make brute-force attacks economically infeasible. This comprehensive guide compares the three leading password hashing algorithms — Bcrypt, Scrypt, and Argon2 — so you can make an informed decision for your project.',

    whyTitle: 'Why Password Hashing Matters',
    whyDesc: 'Password hashing is a one-way transformation that converts a plaintext password into a fixed-length string of characters. Unlike encryption, hashing is irreversible by design — you cannot recover the original password from its hash. When a user logs in, the system hashes the submitted password and compares it to the stored hash.',
    whyPlain: 'Storing passwords in plaintext or using fast general-purpose hash functions like MD5 or SHA-256 is dangerously insecure. Modern GPUs can compute billions of SHA-256 hashes per second, meaning an attacker with a stolen database can crack most passwords in hours or days.',
    whyPurpose: 'Purpose-built password hashing algorithms solve this by being intentionally slow and resource-intensive. They incorporate three key defenses:',
    whySalt: 'Salting: A random value added to each password before hashing, ensuring identical passwords produce different hashes.',
    whyCost: 'Cost factor: A configurable work parameter that controls how slow the hash computation is, allowing you to increase difficulty as hardware improves.',
    whyMemory: 'Memory hardness: Some algorithms require large amounts of RAM, making attacks with specialized hardware (GPUs, ASICs, FPGAs) far more expensive.',

    bcryptTitle: 'Bcrypt: The Battle-Tested Standard',
    bcryptHow: 'How Bcrypt Works',
    bcryptHowDesc: 'Bcrypt was designed in 1999 by Niels Provos and David Mazieres, based on the Blowfish cipher. It uses a cost factor (work factor) that determines the number of iterations: the hash computation runs 2^cost rounds of the expensive key setup phase. The default cost factor is 10 (1,024 rounds), but modern recommendations suggest 12-14 (4,096-16,384 rounds).',
    bcryptStructure: 'A bcrypt hash string contains everything needed for verification:',
    bcryptPros: 'Bcrypt Pros',
    bcryptPro1: 'Extremely well-tested: 25+ years of cryptographic scrutiny with no practical attacks found.',
    bcryptPro2: 'Built-in salt: Automatically generates and stores a 128-bit random salt with each hash.',
    bcryptPro3: 'Adaptive cost: The work factor can be increased over time as hardware gets faster.',
    bcryptPro4: 'Universal library support: Available in virtually every programming language and framework.',
    bcryptPro5: 'Simple API: Easy to use correctly, reducing the chance of implementation mistakes.',
    bcryptCons: 'Bcrypt Cons',
    bcryptCon1: 'CPU-only hardness: Bcrypt is not memory-hard, making it vulnerable to GPU and ASIC-based attacks (though still expensive).',
    bcryptCon2: '72-byte password limit: Bcrypt truncates passwords longer than 72 bytes. This rarely matters in practice but is a design limitation.',
    bcryptCon3: 'Fixed memory usage: Uses only 4KB of RAM regardless of cost factor, which does not increase resistance to parallel attacks.',
    bcryptCon4: 'No parallelism parameter: Cannot leverage multi-core CPUs for legitimate hashing while remaining single-threaded for attackers.',
    bcryptWhen: 'When to Use Bcrypt',
    bcryptWhenDesc: 'Bcrypt is an excellent default choice for most applications. Use it when you need a proven, widely-supported algorithm and your threat model does not require memory hardness. It is the safest "I do not want to think about this too much" choice.',

    scryptTitle: 'Scrypt: Memory-Hard Pioneer',
    scryptHow: 'How Scrypt Works',
    scryptHowDesc: 'Scrypt was designed in 2009 by Colin Percival for the Tarsnap online backup service. Its key innovation is memory hardness: the algorithm requires a large amount of RAM proportional to its difficulty setting. This makes parallel attacks on GPUs, ASICs, and FPGAs significantly more expensive because each parallel instance needs its own block of memory.',
    scryptParams: 'Scrypt has three configurable parameters:',
    scryptParamN: 'N (CPU/memory cost): Determines the memory and CPU cost. Must be a power of 2. Higher N means more memory and time. Common values: 2^14 (16,384) to 2^20 (1,048,576).',
    scryptParamR: 'r (block size): Controls the sequential memory read size. Typical value: 8. Increasing r increases memory usage linearly.',
    scryptParamP: 'p (parallelism): The number of parallel chains. Typical value: 1. Increasing p allows parallelizing computation on the defender side.',
    scryptMemory: 'Memory usage formula: 128 * N * r bytes. With N=2^14 and r=8, that is 128 * 16384 * 8 = 16 MB per hash.',
    scryptPros: 'Scrypt Pros',
    scryptPro1: 'Memory hardness: Requires significant RAM per hash, making GPU/ASIC attacks much more expensive.',
    scryptPro2: 'Configurable parameters: Separate control over CPU cost, memory cost, and parallelism.',
    scryptPro3: 'Proven in production: Used by Litecoin, Dogecoin, and many cryptocurrency systems since 2011.',
    scryptPro4: 'Good security margin: No practical attacks found in 15+ years.',
    scryptCons: 'Scrypt Cons',
    scryptCon1: 'Complex parameter tuning: Three interdependent parameters (N, r, p) make it harder to configure correctly than bcrypt.',
    scryptCon2: 'Time-memory tradeoff vulnerability: An attacker can reduce memory requirements by spending more CPU time, partially defeating the memory-hardness guarantee.',
    scryptCon3: 'Fewer built-in libraries: Not as universally supported as bcrypt, especially in older frameworks.',
    scryptCon4: 'No side-channel resistance: Not specifically designed to resist cache-timing attacks.',
    scryptWhen: 'When to Use Scrypt',
    scryptWhenDesc: 'Use scrypt when you need memory hardness and Argon2 is not available in your environment. It is a solid choice for applications where you want to make GPU-based cracking significantly more expensive.',

    argon2Title: 'Argon2 (Argon2id): The Modern Gold Standard',
    argon2How: 'How Argon2 Works',
    argon2HowDesc: 'Argon2 won the Password Hashing Competition (PHC) in 2015, a multi-year open competition to find the best password hashing algorithm. It was designed by Alex Biryukov, Daniel Dinu, and Dmitry Khovratovich. Argon2 comes in three variants:',
    argon2Variant1: 'Argon2d: Maximizes resistance to GPU cracking attacks. Data-dependent memory access makes it vulnerable to side-channel attacks.',
    argon2Variant2: 'Argon2i: Optimized for resistance to side-channel attacks. Uses data-independent memory access. Better for environments where timing attacks are a concern.',
    argon2Variant3: 'Argon2id: A hybrid that uses Argon2i for the first pass (side-channel resistance) and Argon2d for subsequent passes (GPU resistance). This is the recommended variant for password hashing.',
    argon2Params: 'Argon2 has three main parameters:',
    argon2ParamM: 'm (memory cost): The amount of memory in KiB. OWASP recommends at least 19 MiB (19456 KiB) for Argon2id. Higher is better.',
    argon2ParamT: 't (time cost / iterations): The number of passes over memory. Minimum 2 for Argon2id. More iterations = slower hashing.',
    argon2ParamP: 'p (parallelism): The number of threads. Set to the number of CPU cores available for hashing. Typical value: 1-4.',
    argon2Pros: 'Argon2 Pros',
    argon2Pro1: 'PHC winner: Rigorously evaluated by the global cryptographic community in a multi-year competition.',
    argon2Pro2: 'Superior memory hardness: No known time-memory tradeoff attacks (unlike scrypt).',
    argon2Pro3: 'Side-channel resistance: Argon2id hybrid mode provides both GPU resistance and side-channel resistance.',
    argon2Pro4: 'Three independent parameters: Fine-grained control over memory, time, and parallelism.',
    argon2Pro5: 'Modern design: Incorporates lessons learned from bcrypt and scrypt shortcomings.',
    argon2Pro6: 'OWASP recommended: The primary recommendation in the OWASP Password Storage Cheat Sheet.',
    argon2Cons: 'Argon2 Cons',
    argon2Con1: 'Younger algorithm: Only since 2015, so it has fewer years of real-world deployment than bcrypt (1999).',
    argon2Con2: 'Library availability: Not as universally supported as bcrypt in all languages and frameworks, though adoption is growing rapidly.',
    argon2Con3: 'Parameter complexity: Like scrypt, tuning three parameters requires some understanding of your deployment environment.',
    argon2Con4: 'Memory allocation overhead: Allocating and freeing large blocks of memory per hash can impact performance in high-throughput scenarios.',
    argon2When: 'When to Use Argon2',
    argon2WhenDesc: 'Argon2id is the recommended choice for new applications if your language or framework has a mature library. It provides the best overall security properties. If you are building anything that stores passwords today, Argon2id should be your first choice.',

    comparisonTitle: 'Side-by-Side Comparison',
    compFeature: 'Feature',
    compBcrypt: 'Bcrypt',
    compScrypt: 'Scrypt',
    compArgon2: 'Argon2id',
    compYear: 'Year Introduced',
    compMemory: 'Memory Hardness',
    compSideChannel: 'Side-Channel Resistance',
    compGPU: 'GPU/ASIC Resistance',
    compParams: 'Configurable Parameters',
    compMaxPass: 'Max Password Length',
    compAdoption: 'Library Adoption',
    compOWASP: 'OWASP Recommendation',
    compComplexity: 'Configuration Complexity',
    compSpeed: 'Hashing Speed (default)',

    compYearBcrypt: '1999',
    compYearScrypt: '2009',
    compYearArgon2: '2015',
    compMemoryBcrypt: 'None (4KB fixed)',
    compMemoryScrypt: 'Yes (configurable)',
    compMemoryArgon2: 'Yes (configurable)',
    compSideChannelBcrypt: 'N/A',
    compSideChannelScrypt: 'No',
    compSideChannelArgon2: 'Yes (hybrid mode)',
    compGPUBcrypt: 'Moderate',
    compGPUScrypt: 'High',
    compGPUArgon2: 'Highest',
    compParamsBcrypt: '1 (cost factor)',
    compParamsScrypt: '3 (N, r, p)',
    compParamsArgon2: '3 (m, t, p)',
    compMaxPassBcrypt: '72 bytes',
    compMaxPassScrypt: 'Unlimited',
    compMaxPassArgon2: 'Unlimited',
    compAdoptionBcrypt: 'Universal',
    compAdoptionScrypt: 'Good',
    compAdoptionArgon2: 'Growing rapidly',
    compOWASPBcrypt: 'Acceptable (2nd choice)',
    compOWASPScrypt: 'Acceptable (3rd choice)',
    compOWASPArgon2: 'Primary recommendation',
    compComplexityBcrypt: 'Very Low',
    compComplexityScrypt: 'Medium',
    compComplexityArgon2: 'Medium',
    compSpeedBcrypt: '~300ms (cost=12)',
    compSpeedScrypt: '~100ms (N=2^14)',
    compSpeedArgon2: '~200ms (19MiB, t=2)',

    codeTitle: 'Code Examples',
    codeNodeTitle: 'Node.js Examples',
    codePythonTitle: 'Python Examples',

    recommendTitle: 'Recommendation Decision Guide',
    recommendDesc: 'Use this decision guide to choose the right algorithm for your project:',
    recommendQ1: 'Is Argon2id available in your language/framework with a mature, well-maintained library?',
    recommendQ1Yes: 'YES: Use Argon2id with OWASP-recommended settings (m=19456, t=2, p=1).',
    recommendQ1No: 'NO: Continue to next question.',
    recommendQ2: 'Do you need memory hardness to defend against GPU/ASIC attacks?',
    recommendQ2Yes: 'YES: Use Scrypt with N=2^15, r=8, p=1 (or higher N if your server can handle it).',
    recommendQ2No: 'NO: Use Bcrypt with a cost factor of 12 or higher.',
    recommendQ3: 'Are you migrating from an older algorithm (MD5, SHA-1, SHA-256)?',
    recommendQ3Desc: 'Do not force all users to reset passwords. Instead, wrap the old hash: Argon2id(existing_sha256_hash). On next login, re-hash with Argon2id directly.',
    recommendSummary: 'Summary: For new projects in 2024+, use Argon2id. For existing projects using bcrypt, there is no urgent need to migrate — bcrypt is still secure. If you are choosing between bcrypt and scrypt, bcrypt is simpler and equally safe for most threat models.',

    owaspTitle: 'OWASP Recommended Settings',
    owaspDesc: 'The OWASP Password Storage Cheat Sheet provides these minimum recommended configurations:',
    owaspAlgo: 'Algorithm',
    owaspConfig: 'Recommended Configuration',
    owaspNote: 'Notes',

    migrationTitle: 'Migrating Between Algorithms',
    migrationDesc: 'If you need to migrate from one hashing algorithm to another without forcing password resets, use the "wrap and upgrade" strategy:',
    migrationStep1: 'Step 1: Wrap existing hashes with the new algorithm. For example, if you are migrating from bcrypt to Argon2id, store Argon2id(bcrypt_hash).',
    migrationStep2: 'Step 2: When a user logs in, verify the password against the wrapped hash.',
    migrationStep3: 'Step 3: After successful verification, re-hash the plaintext password directly with Argon2id and update the stored hash.',
    migrationStep4: 'Step 4: Add a version field to your user table to track which hashing scheme each user is on.',
    migrationNote: 'Important: Never store plaintext passwords, even temporarily during migration. The wrapping approach ensures all hashes are always protected by at least one strong algorithm.',

    pitfallsTitle: 'Common Implementation Pitfalls',
    pitfall1Title: 'Using a Global Salt',
    pitfall1Desc: 'A global salt (same salt for all passwords) defeats the purpose. If one password is cracked, all identical passwords are immediately exposed. All three algorithms (bcrypt, scrypt, Argon2) generate unique random salts per hash by default — do not override this behavior.',
    pitfall2Title: 'Cost Factor Too Low',
    pitfall2Desc: 'Using the minimum cost factor makes hashing too fast. Aim for 200-500ms per hash on your production hardware. Benchmark on your actual server and increase the cost factor until you reach the target latency.',
    pitfall3Title: 'Pepper Without Proper Key Management',
    pitfall3Desc: 'A pepper (server-side secret added to passwords before hashing) can add defense-in-depth, but only if stored securely outside the database (e.g., in a hardware security module or environment variable). If the pepper is compromised alongside the database, it provides no benefit.',
    pitfall4Title: 'Not Rehashing on Login',
    pitfall4Desc: 'As hardware improves, you should periodically increase the cost factor. When a user logs in successfully, check if their hash uses an outdated cost factor and re-hash with the current settings.',
    pitfall5Title: 'Timing Attacks on Comparison',
    pitfall5Desc: 'Always use constant-time comparison functions when verifying hashes. All reputable password hashing libraries include this, but if you are comparing hashes manually, use a dedicated constant-time comparison function.',

    benchmarkTitle: 'Performance Benchmarks',
    benchmarkDesc: 'These benchmarks were measured on a standard 4-core server CPU (Intel Xeon E-2236, 3.4GHz) with 16GB RAM. Actual performance will vary by hardware.',
    benchmarkAlgo: 'Algorithm & Config',
    benchmarkTime: 'Time per Hash',
    benchmarkMem: 'Memory per Hash',
    benchmarkCrackRate: 'Attacker Rate (RTX 4090)',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Is bcrypt still safe to use in 2024?',
    faq1a: 'Yes, bcrypt is still considered safe with a cost factor of 12 or higher. No practical attacks have been found against bcrypt in over 25 years. However, for new projects, Argon2id is the preferred choice because it provides additional defense against GPU-based attacks through memory hardness.',
    faq2q: 'What happens if I use SHA-256 for password hashing?',
    faq2a: 'SHA-256 is a general-purpose hash function designed for speed, not for password hashing. A modern GPU can compute over 10 billion SHA-256 hashes per second. This means an attacker can brute-force most passwords in hours. Always use a purpose-built password hashing algorithm (bcrypt, scrypt, or Argon2).',
    faq3q: 'How do I choose the right cost factor / work parameters?',
    faq3a: 'The goal is to make each hash take 200-500 milliseconds on your production server. Start with the recommended defaults and benchmark on your actual hardware. Increase parameters until you reach the target latency. Remember that login endpoints typically do not need to handle thousands of requests per second, so you can afford more expensive hashing.',
    faq4q: 'Can I use Argon2 for anything other than passwords?',
    faq4a: 'Yes, Argon2 can be used for key derivation (deriving encryption keys from passwords), proof-of-work systems, and cryptocurrency mining. The Argon2d variant is specifically designed for use cases where side-channel attacks are not a concern, such as cryptocurrency mining.',
    faq5q: 'Should I add a pepper in addition to a salt?',
    faq5a: 'A pepper (a secret key stored separately from the database) can provide defense-in-depth. If an attacker obtains only the database but not the application server or key management system, the pepper prevents offline cracking. However, it adds complexity and must be managed carefully (key rotation, secure storage). For most applications, a well-configured Argon2id hash with a strong cost factor is sufficient.',
    faq6q: 'How often should I increase the cost factor?',
    faq6a: 'Review your password hashing parameters annually or whenever you upgrade server hardware. Moore\'s Law suggests doubling CPU power roughly every 18 months, which means you should increase your cost factor by 1 (doubling the work) approximately every 18-24 months. Implement "hash upgrading" — re-hash passwords with the new cost factor when users log in successfully.',
  },
  zh: {
    title: 'Bcrypt vs Argon2 vs Scrypt：你应该使用哪种密码哈希算法？',
    intro: '选择正确的密码哈希算法是任何处理用户凭证的应用中最关键的安全决策之一。错误的选择可能在数据泄露中暴露数百万个密码，而正确的算法可以使暴力破解在经济上不可行。本综合指南比较了三种领先的密码哈希算法 — Bcrypt、Scrypt 和 Argon2 — 帮助你为项目做出明智的决策。',

    whyTitle: '为什么密码哈希很重要',
    whyDesc: '密码哈希是一种单向转换，将明文密码转换为固定长度的字符串。与加密不同，哈希在设计上是不可逆的 — 你无法从哈希值恢复原始密码。当用户登录时，系统会对提交的密码进行哈希处理，并与存储的哈希值进行比较。',
    whyPlain: '以明文存储密码或使用 MD5、SHA-256 等快速通用哈希函数是极其不安全的。现代 GPU 每秒可以计算数十亿次 SHA-256 哈希，这意味着攻击者凭借窃取的数据库可以在数小时或数天内破解大多数密码。',
    whyPurpose: '专用密码哈希算法通过故意设计得缓慢且资源密集来解决这个问题。它们包含三种关键防御：',
    whySalt: '加盐（Salting）：在哈希之前为每个密码添加一个随机值，确保相同的密码产生不同的哈希值。',
    whyCost: '成本因子：一个可配置的工作参数，控制哈希计算的速度，允许你随着硬件改进而增加难度。',
    whyMemory: '内存硬度：某些算法需要大量 RAM，使得使用专用硬件（GPU、ASIC、FPGA）的攻击成本大大增加。',

    bcryptTitle: 'Bcrypt：久经考验的标准',
    bcryptHow: 'Bcrypt 的工作原理',
    bcryptHowDesc: 'Bcrypt 由 Niels Provos 和 David Mazieres 于 1999 年设计，基于 Blowfish 密码。它使用成本因子（工作因子）来确定迭代次数：哈希计算运行 2^cost 轮昂贵的密钥设置阶段。默认成本因子为 10（1,024 轮），但现代建议使用 12-14（4,096-16,384 轮）。',
    bcryptStructure: 'bcrypt 哈希字符串包含验证所需的一切信息：',
    bcryptPros: 'Bcrypt 优点',
    bcryptPro1: '经过充分验证：25 年以上的密码学审查，未发现实际可行的攻击。',
    bcryptPro2: '内置盐值：自动为每个哈希生成并存储 128 位随机盐值。',
    bcryptPro3: '自适应成本：工作因子可以随着硬件变快而逐步增加。',
    bcryptPro4: '通用库支持：几乎在所有编程语言和框架中都可用。',
    bcryptPro5: 'API 简单：易于正确使用，减少实现错误的可能性。',
    bcryptCons: 'Bcrypt 缺点',
    bcryptCon1: '仅 CPU 硬度：Bcrypt 不具备内存硬度，容易受到基于 GPU 和 ASIC 的攻击（虽然仍然成本较高）。',
    bcryptCon2: '72 字节密码限制：Bcrypt 会截断超过 72 字节的密码。这在实践中很少有影响，但是一个设计限制。',
    bcryptCon3: '固定内存使用：无论成本因子如何，仅使用 4KB 的 RAM，不会增加对并行攻击的抵抗力。',
    bcryptCon4: '无并行参数：无法利用多核 CPU 进行合法哈希，同时保持对攻击者的单线程限制。',
    bcryptWhen: '何时使用 Bcrypt',
    bcryptWhenDesc: 'Bcrypt 是大多数应用的优秀默认选择。当你需要一个经过验证的、广泛支持的算法，且你的威胁模型不需要内存硬度时，请使用它。它是最安全的"不想过多考虑"的选择。',

    scryptTitle: 'Scrypt：内存硬度先驱',
    scryptHow: 'Scrypt 的工作原理',
    scryptHowDesc: 'Scrypt 由 Colin Percival 于 2009 年为 Tarsnap 在线备份服务设计。其关键创新是内存硬度：该算法需要与其难度设置成正比的大量 RAM。这使得在 GPU、ASIC 和 FPGA 上的并行攻击成本显著增加，因为每个并行实例都需要自己的内存块。',
    scryptParams: 'Scrypt 有三个可配置参数：',
    scryptParamN: 'N（CPU/内存成本）：确定内存和 CPU 成本。必须是 2 的幂。N 越高意味着更多内存和时间。常用值：2^14 (16,384) 到 2^20 (1,048,576)。',
    scryptParamR: 'r（块大小）：控制顺序内存读取大小。典型值：8。增加 r 会线性增加内存使用。',
    scryptParamP: 'p（并行度）：并行链的数量。典型值：1。增加 p 允许在防御方并行化计算。',
    scryptMemory: '内存使用公式：128 * N * r 字节。当 N=2^14 且 r=8 时，即 128 * 16384 * 8 = 16 MB 每次哈希。',
    scryptPros: 'Scrypt 优点',
    scryptPro1: '内存硬度：每次哈希需要大量 RAM，使 GPU/ASIC 攻击成本大大增加。',
    scryptPro2: '可配置参数：对 CPU 成本、内存成本和并行度的独立控制。',
    scryptPro3: '生产环境验证：自 2011 年以来被 Litecoin、Dogecoin 和许多加密货币系统使用。',
    scryptPro4: '良好的安全余量：15 年以上未发现实际可行的攻击。',
    scryptCons: 'Scrypt 缺点',
    scryptCon1: '参数调整复杂：三个相互依赖的参数（N、r、p）使配置比 bcrypt 更困难。',
    scryptCon2: '时间-内存权衡漏洞：攻击者可以通过花费更多 CPU 时间来减少内存需求，部分破坏了内存硬度保证。',
    scryptCon3: '内置库较少：不像 bcrypt 那样在所有语言和框架中普遍支持。',
    scryptCon4: '无侧信道抵抗：未专门设计来抵抗缓存时序攻击。',
    scryptWhen: '何时使用 Scrypt',
    scryptWhenDesc: '当你需要内存硬度且 Argon2 在你的环境中不可用时，使用 Scrypt。对于需要使基于 GPU 的破解成本显著增加的应用，它是一个可靠的选择。',

    argon2Title: 'Argon2 (Argon2id)：现代黄金标准',
    argon2How: 'Argon2 的工作原理',
    argon2HowDesc: 'Argon2 在 2015 年赢得了密码哈希竞赛（PHC），这是一项为期多年的公开竞赛，旨在找到最佳密码哈希算法。它由 Alex Biryukov、Daniel Dinu 和 Dmitry Khovratovich 设计。Argon2 有三个变体：',
    argon2Variant1: 'Argon2d：最大化对 GPU 破解攻击的抵抗力。数据依赖的内存访问使其容易受到侧信道攻击。',
    argon2Variant2: 'Argon2i：优化了对侧信道攻击的抵抗力。使用数据无关的内存访问。更适合时序攻击是关注点的环境。',
    argon2Variant3: 'Argon2id：混合模式，第一轮使用 Argon2i（侧信道抵抗），后续轮次使用 Argon2d（GPU 抵抗）。这是密码哈希的推荐变体。',
    argon2Params: 'Argon2 有三个主要参数：',
    argon2ParamM: 'm（内存成本）：内存量（KiB）。OWASP 建议 Argon2id 至少使用 19 MiB（19456 KiB）。越高越好。',
    argon2ParamT: 't（时间成本/迭代次数）：对内存的遍历次数。Argon2id 最少 2 次。更多迭代 = 更慢的哈希。',
    argon2ParamP: 'p（并行度）：线程数。设置为可用于哈希的 CPU 核心数。典型值：1-4。',
    argon2Pros: 'Argon2 优点',
    argon2Pro1: 'PHC 获胜者：经过全球密码学社区在多年竞赛中的严格评估。',
    argon2Pro2: '卓越的内存硬度：没有已知的时间-内存权衡攻击（不像 scrypt）。',
    argon2Pro3: '侧信道抵抗：Argon2id 混合模式同时提供 GPU 抵抗和侧信道抵抗。',
    argon2Pro4: '三个独立参数：对内存、时间和并行度的细粒度控制。',
    argon2Pro5: '现代设计：汲取了 bcrypt 和 scrypt 缺点的经验教训。',
    argon2Pro6: 'OWASP 推荐：OWASP 密码存储备忘录中的首选推荐。',
    argon2Cons: 'Argon2 缺点',
    argon2Con1: '较年轻的算法：仅从 2015 年开始，因此比 bcrypt（1999）少了很多年的实际部署经验。',
    argon2Con2: '库可用性：不像 bcrypt 在所有语言和框架中那样普遍支持，尽管采用率正在快速增长。',
    argon2Con3: '参数复杂性：与 scrypt 类似，调整三个参数需要对部署环境有一定了解。',
    argon2Con4: '内存分配开销：每次哈希分配和释放大块内存可能影响高吞吐量场景的性能。',
    argon2When: '何时使用 Argon2',
    argon2WhenDesc: '如果你的语言或框架有成熟的库，Argon2id 是新应用的推荐选择。它提供最佳的整体安全属性。如果你今天正在构建任何存储密码的系统，Argon2id 应该是你的首选。',

    comparisonTitle: '并排比较',
    compFeature: '特性',
    compBcrypt: 'Bcrypt',
    compScrypt: 'Scrypt',
    compArgon2: 'Argon2id',
    compYear: '推出年份',
    compMemory: '内存硬度',
    compSideChannel: '侧信道抵抗',
    compGPU: 'GPU/ASIC 抵抗力',
    compParams: '可配置参数',
    compMaxPass: '最大密码长度',
    compAdoption: '库采用度',
    compOWASP: 'OWASP 推荐',
    compComplexity: '配置复杂度',
    compSpeed: '哈希速度（默认）',

    compYearBcrypt: '1999',
    compYearScrypt: '2009',
    compYearArgon2: '2015',
    compMemoryBcrypt: '无（固定 4KB）',
    compMemoryScrypt: '是（可配置）',
    compMemoryArgon2: '是（可配置）',
    compSideChannelBcrypt: '不适用',
    compSideChannelScrypt: '否',
    compSideChannelArgon2: '是（混合模式）',
    compGPUBcrypt: '中等',
    compGPUScrypt: '高',
    compGPUArgon2: '最高',
    compParamsBcrypt: '1（成本因子）',
    compParamsScrypt: '3（N、r、p）',
    compParamsArgon2: '3（m、t、p）',
    compMaxPassBcrypt: '72 字节',
    compMaxPassScrypt: '无限制',
    compMaxPassArgon2: '无限制',
    compAdoptionBcrypt: '通用',
    compAdoptionScrypt: '良好',
    compAdoptionArgon2: '快速增长中',
    compOWASPBcrypt: '可接受（第二选择）',
    compOWASPScrypt: '可接受（第三选择）',
    compOWASPArgon2: '首选推荐',
    compComplexityBcrypt: '非常低',
    compComplexityScrypt: '中等',
    compComplexityArgon2: '中等',
    compSpeedBcrypt: '~300ms（cost=12）',
    compSpeedScrypt: '~100ms（N=2^14）',
    compSpeedArgon2: '~200ms（19MiB，t=2）',

    codeTitle: '代码示例',
    codeNodeTitle: 'Node.js 示例',
    codePythonTitle: 'Python 示例',

    recommendTitle: '推荐决策指南',
    recommendDesc: '使用此决策指南为你的项目选择正确的算法：',
    recommendQ1: '你的语言/框架中是否有成熟、维护良好的 Argon2id 库？',
    recommendQ1Yes: '是：使用 Argon2id，采用 OWASP 推荐设置（m=19456，t=2，p=1）。',
    recommendQ1No: '否：继续下一个问题。',
    recommendQ2: '你是否需要内存硬度来防御 GPU/ASIC 攻击？',
    recommendQ2Yes: '是：使用 Scrypt，N=2^15，r=8，p=1（如果服务器能承受，可使用更高的 N）。',
    recommendQ2No: '否：使用 Bcrypt，成本因子 12 或更高。',
    recommendQ3: '你正在从旧算法（MD5、SHA-1、SHA-256）迁移吗？',
    recommendQ3Desc: '不要强制所有用户重置密码。而是包装旧哈希：Argon2id(existing_sha256_hash)。在下次登录时，直接用 Argon2id 重新哈希。',
    recommendSummary: '总结：对于 2024 年以后的新项目，使用 Argon2id。对于已使用 bcrypt 的现有项目，没有紧迫的迁移需要 — bcrypt 仍然安全。如果你在 bcrypt 和 scrypt 之间选择，bcrypt 更简单，对大多数威胁模型同样安全。',

    owaspTitle: 'OWASP 推荐设置',
    owaspDesc: 'OWASP 密码存储备忘录提供了以下最低推荐配置：',
    owaspAlgo: '算法',
    owaspConfig: '推荐配置',
    owaspNote: '说明',

    migrationTitle: '算法间迁移',
    migrationDesc: '如果你需要在不强制密码重置的情况下从一种哈希算法迁移到另一种，使用"包装并升级"策略：',
    migrationStep1: '步骤 1：用新算法包装现有哈希。例如，如果你从 bcrypt 迁移到 Argon2id，存储 Argon2id(bcrypt_hash)。',
    migrationStep2: '步骤 2：当用户登录时，对照包装后的哈希验证密码。',
    migrationStep3: '步骤 3：验证成功后，直接用 Argon2id 重新哈希明文密码并更新存储的哈希。',
    migrationStep4: '步骤 4：在用户表中添加版本字段以跟踪每个用户使用的哈希方案。',
    migrationNote: '重要：在迁移过程中绝对不要存储明文密码，即使是临时的。包装方法确保所有哈希始终至少受到一种强算法的保护。',

    pitfallsTitle: '常见实现陷阱',
    pitfall1Title: '使用全局盐值',
    pitfall1Desc: '全局盐值（所有密码使用相同的盐）会使盐值失去作用。如果一个密码被破解，所有相同的密码都会立即暴露。三种算法（bcrypt、scrypt、Argon2）默认都会为每个哈希生成唯一的随机盐值 — 不要覆盖这个行为。',
    pitfall2Title: '成本因子太低',
    pitfall2Desc: '使用最低成本因子会使哈希过快。目标是在生产硬件上每次哈希 200-500ms。在实际服务器上进行基准测试，并增加成本因子直到达到目标延迟。',
    pitfall3Title: '无适当密钥管理的 Pepper',
    pitfall3Desc: 'Pepper（在哈希之前添加到密码中的服务端密钥）可以提供纵深防御，但前提是安全存储在数据库之外（例如硬件安全模块或环境变量中）。如果 pepper 与数据库一起泄露，则不提供任何好处。',
    pitfall4Title: '登录时不重新哈希',
    pitfall4Desc: '随着硬件改进，你应该定期增加成本因子。当用户成功登录时，检查其哈希是否使用了过时的成本因子，并使用当前设置重新哈希。',
    pitfall5Title: '比较时的时序攻击',
    pitfall5Desc: '验证哈希时始终使用恒定时间比较函数。所有信誉良好的密码哈希库都包含此功能，但如果你手动比较哈希，请使用专用的恒定时间比较函数。',

    benchmarkTitle: '性能基准测试',
    benchmarkDesc: '这些基准测试在标准 4 核服务器 CPU（Intel Xeon E-2236，3.4GHz）、16GB RAM 上测量。实际性能因硬件而异。',
    benchmarkAlgo: '算法与配置',
    benchmarkTime: '每次哈希时间',
    benchmarkMem: '每次哈希内存',
    benchmarkCrackRate: '攻击者速率（RTX 4090）',

    faqTitle: '常见问题',
    faq1q: 'Bcrypt 在 2024 年还安全吗？',
    faq1a: '是的，使用成本因子 12 或更高时，bcrypt 仍然被认为是安全的。在超过 25 年的时间里，没有发现针对 bcrypt 的实际可行攻击。然而，对于新项目，Argon2id 是首选，因为它通过内存硬度提供了对基于 GPU 攻击的额外防御。',
    faq2q: '如果我使用 SHA-256 进行密码哈希会怎样？',
    faq2a: 'SHA-256 是一种为速度设计的通用哈希函数，不适合密码哈希。现代 GPU 每秒可以计算超过 100 亿次 SHA-256 哈希。这意味着攻击者可以在数小时内暴力破解大多数密码。始终使用专用的密码哈希算法（bcrypt、scrypt 或 Argon2）。',
    faq3q: '如何选择正确的成本因子/工作参数？',
    faq3a: '目标是使每次哈希在生产服务器上耗时 200-500 毫秒。从推荐的默认值开始，在实际硬件上进行基准测试。增加参数直到达到目标延迟。请记住，登录端点通常不需要每秒处理数千个请求，因此你可以承受更昂贵的哈希。',
    faq4q: 'Argon2 除了密码还能用于其他方面吗？',
    faq4a: '是的，Argon2 可用于密钥派生（从密码派生加密密钥）、工作量证明系统和加密货币挖矿。Argon2d 变体专为侧信道攻击不是关注点的用例设计，例如加密货币挖矿。',
    faq5q: '除了盐之外，还应该添加 pepper 吗？',
    faq5a: 'Pepper（存储在数据库之外的密钥）可以提供纵深防御。如果攻击者仅获得数据库而没有获得应用服务器或密钥管理系统，pepper 可以防止离线破解。然而，它增加了复杂性，必须谨慎管理（密钥轮换、安全存储）。对于大多数应用，配置良好的 Argon2id 哈希和强成本因子就已足够。',
    faq6q: '应该多久增加一次成本因子？',
    faq6a: '每年或在升级服务器硬件时审查密码哈希参数。摩尔定律表明 CPU 性能大约每 18 个月翻一番，这意味着你应该大约每 18-24 个月将成本因子增加 1（将工作量翻倍）。实施"哈希升级" — 当用户成功登录时，使用新的成本因子重新哈希密码。',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 };
const noteBoxStyle: React.CSSProperties = { background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const warningBoxStyle: React.CSSProperties = { background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };

export default function BcryptVsArgon2VsScrypt({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      {/* Section 1: Why Password Hashing Matters */}
      <h2 style={h2Style}>{t.whyTitle}</h2>
      <p style={pStyle}>{t.whyDesc}</p>
      <p style={pStyle}>{t.whyPlain}</p>
      <p style={pStyle}>{t.whyPurpose}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li><strong>Salt:</strong> {t.whySalt}</li>
        <li><strong>Cost:</strong> {t.whyCost}</li>
        <li><strong>Memory:</strong> {t.whyMemory}</li>
      </ul>

      <pre style={codeStyle}><code>{`# Comparison: General-purpose vs Password hashing speed
SHA-256:    ~10,000,000,000 hashes/sec  (GPU)  ← Dangerously fast
MD5:        ~25,000,000,000 hashes/sec  (GPU)  ← Even worse
Bcrypt:     ~       50,000 hashes/sec  (GPU)  ← 200,000x slower
Argon2id:   ~        1,000 hashes/sec  (GPU)  ← 10,000,000x slower (with 19MB memory)`}</code></pre>

      {/* Section 2: Bcrypt */}
      <h2 style={h2Style}>{t.bcryptTitle}</h2>
      <h3 style={h3Style}>{t.bcryptHow}</h3>
      <p style={pStyle}>{t.bcryptHowDesc}</p>

      <p style={pStyle}>{t.bcryptStructure}</p>
      <pre style={codeStyle}><code>{`$2b$12$LJ3m4ys3Lg2VBe8EWdKFTe8x7N3fWs0YhW1qDZGhIJFG3rJ1/Bxiy

 ││  ││ └────────────────────── Hash (31 chars, Base64)
 ││  │└──────────────────────── Salt (22 chars, Base64, 128-bit)
 ││  └───────────────────────── Cost factor (12 = 2^12 = 4,096 rounds)
 │└──────────────────────────── Version (2b = current)
 └───────────────────────────── Algorithm identifier ($2b$ = bcrypt)`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.bcryptPros}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.bcryptPro1}</li>
        <li>{t.bcryptPro2}</li>
        <li>{t.bcryptPro3}</li>
        <li>{t.bcryptPro4}</li>
        <li>{t.bcryptPro5}</li>
      </ul>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{t.bcryptCons}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.bcryptCon1}</li>
        <li>{t.bcryptCon2}</li>
        <li>{t.bcryptCon3}</li>
        <li>{t.bcryptCon4}</li>
      </ul>

      <h3 style={h3Style}>{t.bcryptWhen}</h3>
      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.bcryptWhenDesc}</p>
      </div>

      {/* Section 3: Scrypt */}
      <h2 style={h2Style}>{t.scryptTitle}</h2>
      <h3 style={h3Style}>{t.scryptHow}</h3>
      <p style={pStyle}>{t.scryptHowDesc}</p>

      <p style={pStyle}>{t.scryptParams}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li><strong>N:</strong> {t.scryptParamN}</li>
        <li><strong>r:</strong> {t.scryptParamR}</li>
        <li><strong>p:</strong> {t.scryptParamP}</li>
      </ul>

      <pre style={codeStyle}><code>{`# Scrypt memory calculation
Memory = 128 * N * r bytes

N = 2^14 (16384), r = 8:
  128 * 16384 * 8 = 16,777,216 bytes = 16 MB per hash

N = 2^15 (32768), r = 8:
  128 * 32768 * 8 = 33,554,432 bytes = 32 MB per hash

N = 2^20 (1048576), r = 8:
  128 * 1048576 * 8 = 1,073,741,824 bytes = 1 GB per hash`}</code></pre>
      <p style={pStyle}>{t.scryptMemory}</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.scryptPros}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.scryptPro1}</li>
        <li>{t.scryptPro2}</li>
        <li>{t.scryptPro3}</li>
        <li>{t.scryptPro4}</li>
      </ul>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{t.scryptCons}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.scryptCon1}</li>
        <li>{t.scryptCon2}</li>
        <li>{t.scryptCon3}</li>
        <li>{t.scryptCon4}</li>
      </ul>

      <h3 style={h3Style}>{t.scryptWhen}</h3>
      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.scryptWhenDesc}</p>
      </div>

      {/* Section 4: Argon2 */}
      <h2 style={h2Style}>{t.argon2Title}</h2>
      <h3 style={h3Style}>{t.argon2How}</h3>
      <p style={pStyle}>{t.argon2HowDesc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[
          { text: t.argon2Variant1, color: '#ef4444' },
          { text: t.argon2Variant2, color: '#3b82f6' },
          { text: t.argon2Variant3, color: '#22c55e' },
        ].map((v, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${v.color}`, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: v.color }}>{v.text.split(':')[0]}:</strong>{v.text.substring(v.text.indexOf(':') + 1)}
          </div>
        ))}
      </div>

      <p style={pStyle}>{t.argon2Params}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li><strong>m:</strong> {t.argon2ParamM}</li>
        <li><strong>t:</strong> {t.argon2ParamT}</li>
        <li><strong>p:</strong> {t.argon2ParamP}</li>
      </ul>

      <pre style={codeStyle}><code>{`# Argon2id hash format
$argon2id$v=19$m=19456,t=2,p=1$c2FsdHNhbHRzYWx0$W1BLEn4OWxCjU2F...

 ││        ││  ││       ││     ││                   └── Hash (Base64)
 ││        ││  ││       ││     │└── Salt (Base64)
 ││        ││  ││       ││     └──── p=1 (parallelism)
 ││        ││  ││       │└────────── t=2 (iterations)
 ││        ││  ││       └─────────── m=19456 (memory in KiB = 19 MiB)
 ││        ││  │└─────────────────── v=19 (version 1.3)
 ││        │└──┘──────────────────── argon2id (variant)
 └┘────────┘──────────────────────── Algorithm identifier`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.argon2Pros}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.argon2Pro1}</li>
        <li>{t.argon2Pro2}</li>
        <li>{t.argon2Pro3}</li>
        <li>{t.argon2Pro4}</li>
        <li>{t.argon2Pro5}</li>
        <li>{t.argon2Pro6}</li>
      </ul>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{t.argon2Cons}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.argon2Con1}</li>
        <li>{t.argon2Con2}</li>
        <li>{t.argon2Con3}</li>
        <li>{t.argon2Con4}</li>
      </ul>

      <h3 style={h3Style}>{t.argon2When}</h3>
      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.argon2WhenDesc}</p>
      </div>

      {/* Section 5: Side-by-Side Comparison */}
      <h2 style={h2Style}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.compFeature}</th>
              <th style={thStyle}>{t.compBcrypt}</th>
              <th style={thStyle}>{t.compScrypt}</th>
              <th style={thStyle}>{t.compArgon2}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compYear, t.compYearBcrypt, t.compYearScrypt, t.compYearArgon2],
              [t.compMemory, t.compMemoryBcrypt, t.compMemoryScrypt, t.compMemoryArgon2],
              [t.compSideChannel, t.compSideChannelBcrypt, t.compSideChannelScrypt, t.compSideChannelArgon2],
              [t.compGPU, t.compGPUBcrypt, t.compGPUScrypt, t.compGPUArgon2],
              [t.compParams, t.compParamsBcrypt, t.compParamsScrypt, t.compParamsArgon2],
              [t.compMaxPass, t.compMaxPassBcrypt, t.compMaxPassScrypt, t.compMaxPassArgon2],
              [t.compAdoption, t.compAdoptionBcrypt, t.compAdoptionScrypt, t.compAdoptionArgon2],
              [t.compOWASP, t.compOWASPBcrypt, t.compOWASPScrypt, t.compOWASPArgon2],
              [t.compComplexity, t.compComplexityBcrypt, t.compComplexityScrypt, t.compComplexityArgon2],
              [t.compSpeed, t.compSpeedBcrypt, t.compSpeedScrypt, t.compSpeedArgon2],
            ].map(([feature, bcrypt, scrypt, argon2], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{bcrypt}</td>
                <td style={tdStyle}>{scrypt}</td>
                <td style={tdStyle}>{argon2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 6: Code Examples */}
      <h2 style={h2Style}>{t.codeTitle}</h2>

      <h3 style={h3Style}>{t.codeNodeTitle}</h3>
      <pre style={codeStyle}><code>{`// ============================================
// Bcrypt (Node.js) - using 'bcrypt' package
// ============================================
const bcrypt = require('bcrypt');

// Hash a password
const saltRounds = 12; // Cost factor: 2^12 = 4,096 iterations
const password = 'mySecurePassword123';

// Async (recommended)
const hash = await bcrypt.hash(password, saltRounds);
// => "$2b$12$LJ3m4ys3Lg2VBe8EWdKFTe..."

// Verify a password
const isMatch = await bcrypt.compare(password, hash);
// => true

// ============================================
// Scrypt (Node.js) - built-in crypto module
// ============================================
const crypto = require('crypto');

// Hash a password
const salt = crypto.randomBytes(16);
const N = 32768;  // CPU/memory cost (2^15)
const r = 8;      // Block size
const p = 1;      // Parallelism
const keyLen = 64; // Output length in bytes

const scryptHash = crypto.scryptSync(password, salt, keyLen, { N, r, p });

// Store both salt and hash (e.g., as hex strings)
const stored = salt.toString('hex') + ':' + scryptHash.toString('hex');

// Verify: split stored value, re-derive, and compare
const [storedSalt, storedHash] = stored.split(':');
const derivedHash = crypto.scryptSync(
  password,
  Buffer.from(storedSalt, 'hex'),
  keyLen,
  { N, r, p }
);
const isValid = crypto.timingSafeEqual(
  Buffer.from(storedHash, 'hex'),
  derivedHash
);

// ============================================
// Argon2 (Node.js) - using 'argon2' package
// ============================================
const argon2 = require('argon2');

// Hash a password (Argon2id is the default)
const argon2Hash = await argon2.hash(password, {
  type: argon2.argon2id,   // Use Argon2id variant
  memoryCost: 19456,        // 19 MiB (OWASP minimum)
  timeCost: 2,              // 2 iterations
  parallelism: 1,           // 1 thread
});
// => "$argon2id$v=19$m=19456,t=2,p=1$..."

// Verify a password
const isArgon2Match = await argon2.verify(argon2Hash, password);
// => true

// Check if hash needs rehashing (e.g., after config change)
const needsRehash = argon2.needsRehash(argon2Hash, {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
});`}</code></pre>

      <h3 style={h3Style}>{t.codePythonTitle}</h3>
      <pre style={codeStyle}><code>{`# ============================================
# Bcrypt (Python) - using 'bcrypt' package
# ============================================
import bcrypt

password = b"mySecurePassword123"

# Hash a password
salt = bcrypt.gensalt(rounds=12)  # Cost factor 12
hashed = bcrypt.hashpw(password, salt)
# => b"$2b$12$LJ3m4ys3Lg2VBe8EWdKFTe..."

# Verify a password
is_valid = bcrypt.checkpw(password, hashed)
# => True

# ============================================
# Scrypt (Python) - using hashlib (built-in)
# ============================================
import hashlib
import os
import hmac

password = b"mySecurePassword123"
salt = os.urandom(16)

# Hash a password
scrypt_hash = hashlib.scrypt(
    password,
    salt=salt,
    n=32768,     # CPU/memory cost (2^15)
    r=8,         # Block size
    p=1,         # Parallelism
    dklen=64     # Output length
)

# Store salt + hash together
stored = salt.hex() + ":" + scrypt_hash.hex()

# Verify: re-derive and use constant-time comparison
stored_salt, stored_hash = stored.split(":")
derived = hashlib.scrypt(
    password,
    salt=bytes.fromhex(stored_salt),
    n=32768, r=8, p=1, dklen=64
)
is_valid = hmac.compare_digest(
    bytes.fromhex(stored_hash), derived
)

# ============================================
# Argon2 (Python) - using 'argon2-cffi' package
# ============================================
from argon2 import PasswordHasher

ph = PasswordHasher(
    time_cost=2,        # 2 iterations
    memory_cost=19456,  # 19 MiB
    parallelism=1,      # 1 thread
    hash_len=32,        # Output hash length
    salt_len=16,        # Salt length
)

# Hash a password
argon2_hash = ph.hash("mySecurePassword123")
# => "$argon2id$v=19$m=19456,t=2,p=1$..."

# Verify a password
try:
    ph.verify(argon2_hash, "mySecurePassword123")
    print("Password is correct")
except Exception:
    print("Password is incorrect")

# Check if hash needs rehashing
if ph.check_needs_rehash(argon2_hash):
    # Re-hash with current parameters
    new_hash = ph.hash("mySecurePassword123")
    # Update stored hash in database`}</code></pre>

      {/* Section 7: Recommendation Decision Guide */}
      <h2 style={h2Style}>{t.recommendTitle}</h2>
      <p style={pStyle}>{t.recommendDesc}</p>

      <pre style={codeStyle}><code>{`┌─────────────────────────────────────────────────────────────┐
│         Password Hashing Algorithm Decision Guide           │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
               ┌──────────────────────────────┐
               │  Is Argon2id available with   │
               │  a mature library in your     │
               │  language / framework?         │
               └──────┬────────────┬───────────┘
                      │            │
                    YES            NO
                      │            │
                      ▼            ▼
         ┌─────────────────┐   ┌──────────────────────────┐
         │  Use Argon2id    │   │  Do you need memory       │
         │  m=19456 (19MB)  │   │  hardness for GPU/ASIC    │
         │  t=2, p=1        │   │  resistance?              │
         └─────────────────┘   └──────┬──────────┬─────────┘
                                      │          │
                                    YES          NO
                                      │          │
                                      ▼          ▼
                          ┌───────────────┐  ┌─────────────────┐
                          │  Use Scrypt    │  │  Use Bcrypt      │
                          │  N=2^15, r=8   │  │  cost factor=12+ │
                          │  p=1           │  │                  │
                          └───────────────┘  └─────────────────┘`}</code></pre>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <strong style={{ color: '#22c55e' }}>Q: </strong><span style={{ color: 'var(--text-secondary)' }}>{t.recommendQ1}</span>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: '#22c55e' }}>{t.recommendQ1Yes}</p>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: '#ef4444' }}>{t.recommendQ1No}</p>
        </div>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <strong style={{ color: '#3b82f6' }}>Q: </strong><span style={{ color: 'var(--text-secondary)' }}>{t.recommendQ2}</span>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: '#22c55e' }}>{t.recommendQ2Yes}</p>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: '#ef4444' }}>{t.recommendQ2No}</p>
        </div>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <strong style={{ color: '#f59e0b' }}>Q: </strong><span style={{ color: 'var(--text-secondary)' }}>{t.recommendQ3}</span>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.recommendQ3Desc}</p>
        </div>
      </div>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 600 }}>{t.recommendSummary}</p>
      </div>

      {/* Section 8: OWASP Recommended Settings */}
      <h2 style={h2Style}>{t.owaspTitle}</h2>
      <p style={pStyle}>{t.owaspDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.owaspAlgo}</th>
              <th style={thStyle}>{t.owaspConfig}</th>
              <th style={thStyle}>{t.owaspNote}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Argon2id</td>
              <td style={tdStyle}><code>m=19456 (19 MiB), t=2, p=1</code></td>
              <td style={tdStyle}>Primary recommendation. Increase m if server RAM allows.</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Bcrypt</td>
              <td style={tdStyle}><code>cost=12</code> (minimum 10)</td>
              <td style={tdStyle}>Second choice. Increase cost factor to target 200-500ms.</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Scrypt</td>
              <td style={tdStyle}><code>N=2^17 (131072), r=8, p=1</code></td>
              <td style={tdStyle}>Third choice. Memory = 128 * N * r = 128 MB per hash.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 9: Migrating Between Algorithms */}
      <h2 style={h2Style}>{t.migrationTitle}</h2>
      <p style={pStyle}>{t.migrationDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[t.migrationStep1, t.migrationStep2, t.migrationStep3, t.migrationStep4].map((step, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {step}
          </div>
        ))}
      </div>

      <pre style={codeStyle}><code>{`// Migration example: bcrypt → Argon2id (Node.js)
const bcrypt = require('bcrypt');
const argon2 = require('argon2');

async function verifyAndUpgrade(password, storedHash, userId) {
  // Check hash version
  if (storedHash.startsWith('$argon2id$')) {
    // Already using Argon2id — verify directly
    return await argon2.verify(storedHash, password);
  }

  if (storedHash.startsWith('$2b$')) {
    // Still using bcrypt — verify with bcrypt
    const isValid = await bcrypt.compare(password, storedHash);

    if (isValid) {
      // Upgrade: re-hash directly with Argon2id
      const newHash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 19456,
        timeCost: 2,
        parallelism: 1,
      });

      // Update database
      await db.query(
        'UPDATE users SET password_hash = $1, hash_version = $2 WHERE id = $3',
        [newHash, 'argon2id', userId]
      );
    }

    return isValid;
  }

  throw new Error('Unknown hash format');
}`}</code></pre>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>Important:</strong> {t.migrationNote}</p>
      </div>

      {/* Section 10: Common Pitfalls */}
      <h2 style={h2Style}>{t.pitfallsTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: t.pitfall1Title, desc: t.pitfall1Desc, color: '#ef4444' },
          { title: t.pitfall2Title, desc: t.pitfall2Desc, color: '#f59e0b' },
          { title: t.pitfall3Title, desc: t.pitfall3Desc, color: '#8b5cf6' },
          { title: t.pitfall4Title, desc: t.pitfall4Desc, color: '#3b82f6' },
          { title: t.pitfall5Title, desc: t.pitfall5Desc, color: '#22c55e' },
        ].map((v, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${v.color}` }}>
            <strong style={{ color: v.color }}>{v.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Section 11: Performance Benchmarks */}
      <h2 style={h2Style}>{t.benchmarkTitle}</h2>
      <p style={pStyle}>{t.benchmarkDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.benchmarkAlgo}</th>
              <th style={thStyle}>{t.benchmarkTime}</th>
              <th style={thStyle}>{t.benchmarkMem}</th>
              <th style={thStyle}>{t.benchmarkCrackRate}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Bcrypt (cost=10)', '~75ms', '4 KB', '~150K hashes/sec'],
              ['Bcrypt (cost=12)', '~300ms', '4 KB', '~38K hashes/sec'],
              ['Bcrypt (cost=14)', '~1.2s', '4 KB', '~9.5K hashes/sec'],
              ['Scrypt (N=2^14, r=8)', '~100ms', '16 MB', '~5K hashes/sec'],
              ['Scrypt (N=2^15, r=8)', '~200ms', '32 MB', '~2.5K hashes/sec'],
              ['Scrypt (N=2^17, r=8)', '~800ms', '128 MB', '~300 hashes/sec'],
              ['Argon2id (19MiB, t=2)', '~200ms', '19 MB', '~1K hashes/sec'],
              ['Argon2id (64MiB, t=3)', '~800ms', '64 MB', '~150 hashes/sec'],
              ['Argon2id (256MiB, t=4)', '~3.5s', '256 MB', '~20 hashes/sec'],
            ].map(([algo, time, mem, rate], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600, fontFamily: 'monospace', fontSize: 13 }}>{algo}</td>
                <td style={tdStyle}>{time}</td>
                <td style={tdStyle}>{mem}</td>
                <td style={tdStyle}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 12: FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a], [t.faq5q, t.faq5a], [t.faq6q, t.faq6a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
