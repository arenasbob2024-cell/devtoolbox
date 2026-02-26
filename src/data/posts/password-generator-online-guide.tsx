'use client';
import Link from 'next/link';
import React from 'react';

const translations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'Password Generator Online: How to Create Strong, Secure, Random Passwords',
    intro: 'In a world where data breaches expose billions of credentials every year, using strong, unique passwords for every account is no longer optional. Yet most people still rely on weak, reused passwords that attackers can crack in seconds. A random password generator eliminates human bias and creates cryptographically strong passwords that resist brute-force, dictionary, and rainbow table attacks. This comprehensive guide covers everything you need to know about generating secure passwords: the math behind password strength, how modern attacks work, NIST guidelines for 2024, generating passwords programmatically in JavaScript and Python, the passphrase vs. password debate, password manager integration, and two-factor authentication. Whether you are a developer securing user accounts or an individual protecting personal data, this guide will give you the knowledge to make informed decisions about password security.',

    tldrTitle: 'TL;DR',
    tldr1: 'Use a random password generator for every account. Never create passwords from memory.',
    tldr2: 'Minimum 16 characters with uppercase, lowercase, digits, and symbols for maximum entropy.',
    tldr3: 'Passphrases (4-6 random words) are equally strong and easier to type on mobile.',
    tldr4: 'Store all passwords in a password manager. Memorize only the master password.',
    tldr5: 'Enable two-factor authentication (TOTP or hardware key) on every account that supports it.',
    tldr6: 'NIST 2024 says: longer is better, no forced rotation, check against breach databases.',

    keyTitle: 'Key Takeaways',
    key1: 'A 16-character random password with mixed characters has over 105 bits of entropy, requiring trillions of years to brute-force.',
    key2: 'Dictionary attacks crack human-chosen passwords in minutes. Random generation is the only reliable defense.',
    key3: 'Password entropy = log2(pool_size ^ length). Every additional character multiplies the search space exponentially.',
    key4: 'NIST SP 800-63B (2024 update) recommends allowing 64+ character passwords and checking against breach lists.',
    key5: 'Passphrases using 6 Diceware words provide 77+ bits of entropy with better memorability.',
    key6: 'Two-factor authentication reduces account compromise by over 99% even if the password is leaked.',

    whyTitle: '1. Why Strong Passwords Matter More Than Ever',
    whyDesc: 'The scale of credential theft has reached staggering proportions. In 2024 alone, over 1.5 billion unique username-password combinations were leaked in data breaches. The RockYou2024 compilation contained nearly 10 billion entries. Attackers use these leaked credentials in automated credential-stuffing attacks, trying each stolen password across hundreds of popular services. If you reuse a password, a single breach compromises every account that shares it.',
    whyPoint1: 'Credential stuffing attacks test millions of stolen passwords per hour against login forms.',
    whyPoint2: 'A single reused password can cascade into email, banking, cloud storage, and social media compromise.',
    whyPoint3: 'Automated tools like Hashcat can test 100 billion password hashes per second on consumer GPUs.',
    whyPoint4: 'The average cost of a data breach reached $4.88 million in 2024 according to IBM.',
    whyConclusion: 'The solution is straightforward: use a different, randomly generated password for every account. A password generator removes human predictability and creates passwords that are mathematically resistant to all known attack methods.',

    entropyTitle: '2. Password Entropy Explained: The Math Behind Security',
    entropyDesc: 'Password entropy measures the unpredictability of a password in bits. It is calculated using the formula: H = L * log2(R), where L is the password length and R is the size of the character pool (the number of possible characters for each position). Higher entropy means the password is exponentially harder to guess.',
    entropyPoolTitle: 'Character Pool Sizes and Their Entropy Per Character',
    entropyPoolCol1: 'Character Set',
    entropyPoolCol2: 'Pool Size (R)',
    entropyPoolCol3: 'Bits Per Character',
    entropyPoolCol4: 'Example',
    entropyPoolRow1: ['Digits only (0-9)', '10', '3.32', '7291048365'],
    entropyPoolRow2: ['Lowercase (a-z)', '26', '4.70', 'qmxbftzdkw'],
    entropyPoolRow3: ['Upper + Lower (A-Za-z)', '52', '5.70', 'kRmBpTzYdW'],
    entropyPoolRow4: ['Alphanumeric (A-Za-z0-9)', '62', '5.95', 'k9mB2TzY0W'],
    entropyPoolRow5: ['Full ASCII printable', '95', '6.57', 'k9$B2!zY@W'],
    entropyCalcTitle: 'Total Entropy for Common Password Lengths',
    entropyCalcCol1: 'Length',
    entropyCalcCol2: 'Digits Only',
    entropyCalcCol3: 'Lowercase',
    entropyCalcCol4: 'Alphanumeric',
    entropyCalcCol5: 'Full ASCII',
    entropyCalcRow1: ['8 chars', '26.6 bits', '37.6 bits', '47.6 bits', '52.6 bits'],
    entropyCalcRow2: ['12 chars', '39.9 bits', '56.4 bits', '71.5 bits', '78.8 bits'],
    entropyCalcRow3: ['16 chars', '53.2 bits', '75.2 bits', '95.3 bits', '105.1 bits'],
    entropyCalcRow4: ['20 chars', '66.4 bits', '94.0 bits', '119.1 bits', '131.4 bits'],
    entropyCalcRow5: ['24 chars', '79.7 bits', '112.8 bits', '142.9 bits', '157.7 bits'],
    entropyNote: 'These calculations assume every character is chosen uniformly at random. Human-chosen passwords have far lower effective entropy because humans follow predictable patterns: dictionary words, names, dates, keyboard walks (qwerty), and common substitutions (@ for a, 3 for e). A password like "P@ssw0rd!" looks complex but has very low effective entropy because attackers already test these patterns first.',
    entropyTarget: 'Recommended entropy targets for 2024-2025:',
    entropyTarget1: 'General web accounts: 60+ bits (16-char alphanumeric or 12-char full ASCII)',
    entropyTarget2: 'Financial and email accounts: 80+ bits (16-char full ASCII or 6-word passphrase)',
    entropyTarget3: 'Encryption keys and master passwords: 100+ bits (20-char full ASCII or 8-word passphrase)',

    strongTitle: '3. What Makes a Password Strong',
    strongDesc: 'A strong password has three essential properties: length, randomness, and uniqueness. Complexity (mixing character types) is helpful but secondary to these three.',
    strongProp1Title: 'Length Is the Most Important Factor',
    strongProp1Desc: 'Each additional character multiplies the search space by the pool size. Going from 8 to 16 characters with full ASCII increases the search space from 6.6 quadrillion to 44 octillion possibilities. NIST recommends allowing passwords up to 64 characters or more. For generated passwords, 16-20 characters is the sweet spot between security and usability.',
    strongProp2Title: 'True Randomness Eliminates Patterns',
    strongProp2Desc: 'Humans are terrible at generating random sequences. We gravitate toward dictionary words, names, dates, and keyboard patterns. A cryptographically secure random number generator (CSPRNG) produces output that is computationally indistinguishable from true randomness, eliminating all predictable patterns that attackers exploit.',
    strongProp3Title: 'Uniqueness Prevents Credential Stuffing',
    strongProp3Desc: 'Every account must have a different password. If you use the same password for your email and a small forum site, a breach of the forum gives attackers your email password. Since email is the recovery mechanism for most accounts, this single reuse can compromise your entire digital identity.',
    strongProp4Title: 'Character Diversity Increases Pool Size',
    strongProp4Desc: 'Including uppercase, lowercase, digits, and symbols increases the per-character entropy from 4.70 bits (lowercase only) to 6.57 bits (full ASCII). At 16 characters, that difference means 75.2 bits vs 105.1 bits of entropy, roughly a trillion-fold increase in the search space.',

    lengthTitle: '4. Password Length vs. Complexity: Which Matters More?',
    lengthDesc: 'This is one of the most common questions in password security. The answer is clear: length wins. A longer password with a smaller character set is almost always stronger than a shorter password with a larger character set.',
    lengthExample: 'Consider these two passwords:',
    lengthEx1: 'k9$B (4 chars, full ASCII, 95 pool): entropy = 4 * 6.57 = 26.3 bits',
    lengthEx2: 'correcthorsebatterystaple (25 lowercase chars, 26 pool): entropy = 25 * 4.70 = 117.5 bits',
    lengthExConclusion: 'The 25-character lowercase password is billions of times stronger than the 4-character complex one. This is why NIST moved away from complexity requirements and toward length-based policies.',
    lengthTable: 'Breaking point analysis: at what length does each character set reach 80 bits of entropy (recommended minimum for important accounts)?',
    lengthTableCol1: 'Character Set',
    lengthTableCol2: 'Pool Size',
    lengthTableCol3: 'Chars Needed for 80 Bits',
    lengthTableCol4: 'Chars Needed for 100 Bits',
    lengthTableRow1: ['Digits (0-9)', '10', '25 chars', '31 chars'],
    lengthTableRow2: ['Lowercase (a-z)', '26', '18 chars', '22 chars'],
    lengthTableRow3: ['Alphanumeric (A-Za-z0-9)', '62', '14 chars', '17 chars'],
    lengthTableRow4: ['Full ASCII printable', '95', '13 chars', '16 chars'],
    lengthBest: 'Best practice: Use full ASCII character set with 16+ characters. This achieves 105+ bits of entropy, providing an enormous security margin against all known and foreseeable attacks.',

    nistTitle: '5. NIST Password Guidelines 2024: What Has Changed',
    nistDesc: 'The National Institute of Standards and Technology (NIST) updated its Digital Identity Guidelines (SP 800-63B) with significant changes that reflect modern understanding of password security. These guidelines are mandatory for US federal agencies and widely adopted by the private sector.',
    nistChange1Title: 'Minimum 8 characters, recommend 15+',
    nistChange1Desc: 'NIST sets 8 characters as the absolute floor but explicitly states that longer passwords should be encouraged. Many organizations now set 12-16 as their minimum following this guidance.',
    nistChange2Title: 'Allow up to 64+ characters',
    nistChange2Desc: 'Password fields must accept at least 64 characters. There is no security reason to limit password length. Truncating passwords is explicitly prohibited.',
    nistChange3Title: 'No composition rules',
    nistChange3Desc: 'Requiring uppercase, lowercase, digits, and symbols is no longer recommended. These rules lead to predictable patterns without meaningfully improving security.',
    nistChange4Title: 'No forced periodic rotation',
    nistChange4Desc: 'Passwords should only be changed when there is evidence of compromise. Forced rotation leads to weaker passwords through predictable increment patterns.',
    nistChange5Title: 'Check against breach databases',
    nistChange5Desc: 'When users set or change passwords, the system must check them against known breached password lists. The Have I Been Pwned API provides a free, privacy-preserving way to do this.',
    nistChange6Title: 'Allow paste in password fields',
    nistChange6Desc: 'Blocking paste in password fields actively harms security by preventing password manager usage. NIST explicitly requires that paste be allowed.',
    nistSummary: 'The overall theme is clear: make it easy for users to use long, unique, randomly generated passwords. Remove barriers (complexity rules, paste blocking, short max lengths) and add protections (breach checking, rate limiting, MFA).',

    attacksTitle: '6. Common Password Attacks and How Random Passwords Defend Against Them',
    attacksDesc: 'Understanding how attackers crack passwords helps explain why random generation is essential. There are four primary attack methods, and each exploits different weaknesses in password creation.',
    attack1Title: 'Brute-Force Attacks',
    attack1Desc: 'A brute-force attack systematically tries every possible combination of characters until the correct password is found. Modern GPUs running tools like Hashcat can test billions of combinations per second against leaked password hashes. Defense: length. A 16-character random password with full ASCII has 95^16 possible combinations, which would take longer than the age of the universe to brute-force even at 100 billion attempts per second.',
    attack2Title: 'Dictionary Attacks',
    attack2Desc: 'Dictionary attacks try common words, names, phrases, and known passwords from previous breaches. They also apply common transformations: capitalizing the first letter, appending numbers, replacing letters with symbols (l33t speak). This is why "Password123!" is cracked instantly despite having 12 characters and multiple character types. Defense: randomness. A truly random password contains no dictionary words or predictable patterns for dictionary attacks to exploit.',
    attack3Title: 'Rainbow Table Attacks',
    attack3Desc: 'A rainbow table is a precomputed lookup table that maps hash values back to their original passwords. Instead of computing hashes at attack time, the attacker looks up the hash in the table. This trades computation time for storage space. Defense: salting (handled by the server) and length. Modern password hashing algorithms like Argon2id and bcrypt automatically apply unique salts, making rainbow tables useless. Long random passwords are also too numerous to precompute.',
    attack4Title: 'Credential Stuffing',
    attack4Desc: 'Credential stuffing uses username-password pairs leaked from one service to attempt login on other services. It exploits the fact that people reuse passwords across multiple accounts. Automated tools can test millions of stolen credentials per hour. Defense: uniqueness. If every account has a different randomly generated password, a breach of one service cannot compromise any other account.',
    attacksSummary: 'A randomly generated password of 16+ characters effectively neutralizes all four attack types. Brute-force is mathematically infeasible, dictionary attacks find no patterns, rainbow tables cannot contain it, and uniqueness prevents credential stuffing.',

    programTitle: '7. Generating Passwords Programmatically',
    programDesc: 'If you need to generate passwords in your applications, it is critical to use a cryptographically secure random number generator (CSPRNG). Standard random functions (Math.random() in JavaScript, random.random() in Python) are not cryptographically secure and must never be used for password generation.',
    programJsTitle: 'JavaScript / Node.js (using Web Crypto API)',
    programPyTitle: 'Python (using secrets module)',
    programNote: 'Critical: Always use crypto.getRandomValues() in JavaScript or the secrets module in Python for password generation. The standard Math.random() and random.random() are pseudorandom number generators that can be predicted if the internal state is known. They are not suitable for any security-sensitive purpose.',
    programBrowserTitle: 'Quick password generation in the browser console',
    programBrowserNote: 'For everyday use, simply use our online password generator tool which implements all these best practices with a user-friendly interface.',

    passphraseTitle: '8. Passphrase vs. Password: Which Is Better?',
    passphraseDesc: 'A passphrase is a password composed of multiple randomly selected words instead of random characters. The most well-known method is Diceware, which uses physical dice to select words from a list of 7,776 words. The security of a passphrase comes from the number of words and the size of the word list.',
    passphraseCompTitle: 'Passphrase vs Random Password Comparison',
    passphraseCompCol1: 'Type',
    passphraseCompCol2: 'Example',
    passphraseCompCol3: 'Entropy',
    passphraseCompCol4: 'Memorability',
    passphraseCompRow1: ['16-char random', 'k9$Bm2!zYp@W7xQf', '105 bits', 'Very hard to memorize'],
    passphraseCompRow2: ['4-word passphrase', 'correct horse battery staple', '51.7 bits', 'Easy to memorize'],
    passphraseCompRow3: ['6-word passphrase', 'pencil tornado marble silk anchor cloud', '77.5 bits', 'Moderate to memorize'],
    passphraseCompRow4: ['8-word passphrase', 'trophy canal wagon planet lemon oxide fern quartz', '103.4 bits', 'Harder to memorize'],
    passphrasePros: 'When to use a passphrase:',
    passphrasePro1: 'Master passwords for password managers (you need to memorize this one)',
    passphrasePro2: 'Full-disk encryption passwords (typed frequently before OS loads)',
    passphrasePro3: 'SSH key passphrases (typed manually without autofill)',
    passphrasePro4: 'Any situation where you must type the password manually without a password manager',
    passphraseConsTitle: 'When to use random character passwords:',
    passphraseCon1: 'All accounts managed by a password manager (autofilled, no need to type)',
    passphraseCon2: 'API keys and service tokens (never typed manually)',
    passphraseCon3: 'When maximum entropy per character is needed (short max-length fields)',
    passphraseConclusion: 'The key insight: passphrases sacrifice entropy density for memorability. A 6-word passphrase has 77.5 bits of entropy spread across roughly 35 characters, while a 12-character random password achieves 78.8 bits. Both are strong, but the passphrase is easier to remember and type.',

    managerTitle: '9. Password Managers: The Essential Companion to Password Generators',
    managerDesc: 'A random password generator is only useful if you have a way to store and retrieve the passwords it creates. This is where password managers come in. A password manager is an encrypted vault that stores all your passwords, auto-fills them in login forms, and syncs across your devices.',
    managerWhy: 'Why you need a password manager:',
    managerReason1: 'The average person has 100+ online accounts. You cannot memorize 100 unique 16-character random passwords.',
    managerReason2: 'Password managers auto-fill credentials, which is both faster and more secure than typing passwords. Auto-fill also protects against phishing because the manager verifies the domain before filling.',
    managerReason3: 'Most password managers include a built-in password generator, making it trivial to create a unique random password for every new account.',
    managerReason4: 'Password managers encrypt your vault with your master password using algorithms like Argon2id or PBKDF2. Even if the encrypted vault is stolen, the passwords remain secure.',
    managerTips: 'Tips for using a password manager securely:',
    managerTip1: 'Choose a master password of 5-6 Diceware words (77+ bits of entropy). This is the one password you must memorize.',
    managerTip2: 'Enable two-factor authentication on your password manager account. Use a hardware key if possible.',
    managerTip3: 'Set up emergency access so a trusted person can retrieve your vault if something happens to you.',
    managerTip4: 'Run the built-in security audit periodically. Most managers flag reused, weak, or breached passwords.',
    managerTip5: 'Never store your master password digitally. Write it down and keep it in a physical safe until memorized.',

    twoFaTitle: '10. Two-Factor Authentication: The Essential Second Layer',
    twoFaDesc: 'Even the strongest password can be compromised through phishing, malware, or server-side breaches. Two-factor authentication (2FA) adds a second verification step that an attacker cannot bypass with just the password. According to Google, enabling 2FA blocks over 99% of automated attacks.',
    twoFaTypesTitle: '2FA Methods Ranked by Security',
    twoFaTypeCol1: 'Method',
    twoFaTypeCol2: 'Security Level',
    twoFaTypeCol3: 'Pros',
    twoFaTypeCol4: 'Cons',
    twoFaTypeRow1: ['Hardware key (FIDO2/WebAuthn)', 'Highest', 'Phishing-proof, no shared secrets', 'Physical device cost, can be lost'],
    twoFaTypeRow2: ['TOTP app (Google Authenticator, Authy)', 'High', 'Free, works offline, widely supported', 'Phishable, seed can be extracted'],
    twoFaTypeRow3: ['Push notification (Duo, MS Authenticator)', 'High', 'Easy to use, shows login context', 'Requires internet, fatigue attacks'],
    twoFaTypeRow4: ['SMS one-time code', 'Moderate', 'Universal, no app needed', 'SIM swap attacks, SS7 vulnerabilities'],
    twoFaTypeRow5: ['Email one-time code', 'Low-Moderate', 'No app or device needed', 'Email compromise defeats it'],
    twoFaRecommend: 'For maximum security, use a FIDO2 hardware key (YubiKey, Google Titan) as your primary 2FA method and a TOTP app as backup. NIST classifies SMS as a "restricted" authenticator due to known vulnerabilities and recommends app-based or hardware methods instead.',
    twoFaTip: 'Developer tip: When implementing 2FA in your application, support WebAuthn/FIDO2 as the primary method. It is the only 2FA method that is inherently phishing-resistant because the browser cryptographically binds the authentication to the correct domain.',

    toolTitle: '11. Using Our Online Password Generator',
    toolDesc: 'Our free online password generator creates cryptographically secure random passwords directly in your browser. No passwords are sent to any server. The generator uses the Web Crypto API (crypto.getRandomValues) to ensure true cryptographic randomness.',
    toolFeature1: 'Configurable length from 4 to 128 characters',
    toolFeature2: 'Toggle uppercase, lowercase, digits, and symbols independently',
    toolFeature3: 'Exclude ambiguous characters (0/O, 1/l/I) for readability',
    toolFeature4: 'Real-time entropy calculation and strength indicator',
    toolFeature5: 'One-click copy to clipboard',
    toolFeature6: 'Runs entirely in the browser with no server communication',
    toolCta: 'Try the Password Generator Tool',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How long should a password be in 2024-2025?',
    faq1a: 'For randomly generated passwords, 16 characters with mixed character types (uppercase, lowercase, digits, symbols) provides over 105 bits of entropy, which is more than sufficient for any use case. NIST SP 800-63B requires a minimum of 8 characters but recommends much longer. For passphrases, 5-6 randomly selected words from a large word list provides comparable security. If you are using a password manager (which you should be), there is no reason not to use 16-20 character random passwords for everything.',
    faq2q: 'Is a random password generator safe to use online?',
    faq2a: 'A well-built online password generator that uses the Web Crypto API (crypto.getRandomValues) generates passwords entirely in your browser. The password never leaves your device and is never transmitted to any server. Our password generator works this way. However, you should verify this by checking the network tab in your browser developer tools. Avoid any generator that requires you to click "generate" and waits for a server response, as this means the password was generated server-side.',
    faq3q: 'What is the difference between a random password and a passphrase?',
    faq3a: 'A random password uses individual characters (letters, digits, symbols) chosen randomly, like "k9$Bm2!zYp@W". A passphrase uses randomly selected whole words, like "pencil tornado marble silk". Random passwords have higher entropy per character (6.57 bits vs 4.70 bits for lowercase), making them shorter for the same security level. Passphrases are easier to memorize and type but longer. Use random passwords when a password manager handles storage, and passphrases when you need to remember and type the password yourself.',
    faq4q: 'How often should I change my passwords?',
    faq4a: 'According to NIST SP 800-63B (2024), you should NOT change passwords on a regular schedule. Forced periodic rotation leads to predictable password mutations that reduce security. Change a password only when there is a specific reason: you suspect it has been compromised, it appears in a data breach database, you shared it with someone, or the service reports a security incident. If you use unique random passwords from a generator, the only reason to change one is evidence of compromise.',
    faq5q: 'Can a quantum computer crack my password?',
    faq5a: 'Quantum computers using Grover algorithm can reduce the effective entropy of a password by half (searching in square root of the keyspace). A 128-bit password would have 64 bits of effective quantum security. At 16 characters with full ASCII (105 bits), you would still have roughly 52 bits of quantum security, which is sufficient. For long-term security, use 20+ character passwords (131+ bits, 65+ quantum bits). However, practical large-scale quantum computers capable of running Grover at this scale are still years away.',
    faq6q: 'Should I use special characters in my password?',
    faq6a: 'If your password is randomly generated, including special characters increases the character pool from 62 (alphanumeric) to 95 (full ASCII), adding about 0.62 bits of entropy per character. At 16 characters, that is roughly 10 extra bits of entropy. So yes, include them. However, if you are choosing between a 12-character password with special characters and a 16-character alphanumeric password, the 16-character one is stronger (95.3 bits vs 78.8 bits). Length always beats complexity.',
    faq7q: 'What is the strongest possible password?',
    faq7a: 'The strongest password is one that is as long as the service allows (up to 64-128 characters), uses all available character types (full ASCII or Unicode), is generated by a cryptographically secure random number generator, is unique to a single account, and is stored in an encrypted password manager. In practice, a 20-character random password with full ASCII (131 bits of entropy) exceeds the security level of 128-bit AES encryption keys and is more than strong enough for any foreseeable threat.',
    faq8q: 'Are password generators better than making up my own password?',
    faq8a: 'Yes, dramatically. Research consistently shows that human-chosen passwords have far lower effective entropy than their length and character set would suggest. Humans use dictionary words, names, dates, keyboard patterns, and predictable substitutions. A study by Carnegie Mellon University found that passwords created under strict complexity rules were only marginally harder to crack than those with no rules at all. A random generator eliminates all human bias and achieves the theoretical maximum entropy for any given length and character set.',
  },
  zh: {
    title: '在线密码生成器：如何创建强大、安全、随机的密码',
    intro: '在每年有数十亿凭证在数据泄露中曝光的世界里，为每个账户使用强大、唯一的密码已不再是可选项。然而，大多数人仍然依赖弱密码和重复使用的密码，攻击者可以在几秒内破解。随机密码生成器消除了人类偏见，创建能够抵抗暴力破解、字典攻击和彩虹表攻击的密码学强密码。本综合指南涵盖了生成安全密码所需的一切知识。',

    tldrTitle: 'TL;DR',
    tldr1: '为每个账户使用随机密码生成器，永远不要凭记忆创建密码。',
    tldr2: '至少 16 个字符，包含大写、小写、数字和符号以获得最大熵。',
    tldr3: '密码短语（4-6 个随机词）同样强大且更易于在移动设备上输入。',
    tldr4: '将所有密码存储在密码管理器中，只记住主密码。',
    tldr5: '在每个支持的账户上启用双因素认证（TOTP 或硬件密钥）。',
    tldr6: 'NIST 2024 指南：越长越好，不强制轮换，检查泄露数据库。',

    keyTitle: '核心要点',
    key1: '16 字符的混合字符随机密码具有超过 105 位熵，需要数万亿年才能暴力破解。',
    key2: '字典攻击可在几分钟内破解人类选择的密码。随机生成是唯一可靠的防御。',
    key3: '密码熵 = log2(字符池大小 ^ 长度)。每增加一个字符，搜索空间呈指数增长。',
    key4: 'NIST SP 800-63B（2024 更新）建议允许 64 字符以上的密码并检查泄露列表。',
    key5: '使用 6 个 Diceware 词的密码短语提供 77+ 位熵，且更易记忆。',
    key6: '双因素认证即使密码泄露也能减少超过 99% 的账户入侵。',

    whyTitle: '1. 为什么强密码比以往更重要',
    whyDesc: '凭证盗窃的规模已达到惊人的程度。仅 2024 年，就有超过 15 亿个唯一的用户名-密码组合在数据泄露中泄露。攻击者利用这些泄露的凭证进行自动化凭证填充攻击，在数百个热门服务上尝试每个被盗密码。',
    whyPoint1: '凭证填充攻击每小时测试数百万个被盗密码。',
    whyPoint2: '一个重复使用的密码可能导致电子邮件、银行、云存储和社交媒体全面沦陷。',
    whyPoint3: 'Hashcat 等自动化工具在消费级 GPU 上每秒可测试 1000 亿个密码哈希。',
    whyPoint4: '根据 IBM 的数据，2024 年数据泄露的平均成本达到 488 万美元。',
    whyConclusion: '解决方案很简单：为每个账户使用不同的随机生成密码。密码生成器消除人类可预测性，创建在数学上能抵抗所有已知攻击方法的密码。',

    entropyTitle: '2. 密码熵详解：安全背后的数学',
    entropyDesc: '密码熵以比特为单位衡量密码的不可预测性。计算公式为：H = L * log2(R)，其中 L 是密码长度，R 是字符池大小。更高的熵意味着密码更难猜测。',
    entropyPoolTitle: '字符池大小及每字符熵',
    entropyPoolCol1: '字符集',
    entropyPoolCol2: '池大小 (R)',
    entropyPoolCol3: '每字符比特数',
    entropyPoolCol4: '示例',
    entropyPoolRow1: ['仅数字 (0-9)', '10', '3.32', '7291048365'],
    entropyPoolRow2: ['小写字母 (a-z)', '26', '4.70', 'qmxbftzdkw'],
    entropyPoolRow3: ['大小写 (A-Za-z)', '52', '5.70', 'kRmBpTzYdW'],
    entropyPoolRow4: ['字母数字 (A-Za-z0-9)', '62', '5.95', 'k9mB2TzY0W'],
    entropyPoolRow5: ['完整 ASCII 可打印', '95', '6.57', 'k9$B2!zY@W'],
    entropyCalcTitle: '常见密码长度的总熵',
    entropyCalcCol1: '长度',
    entropyCalcCol2: '仅数字',
    entropyCalcCol3: '小写字母',
    entropyCalcCol4: '字母数字',
    entropyCalcCol5: '完整 ASCII',
    entropyCalcRow1: ['8 字符', '26.6 位', '37.6 位', '47.6 位', '52.6 位'],
    entropyCalcRow2: ['12 字符', '39.9 位', '56.4 位', '71.5 位', '78.8 位'],
    entropyCalcRow3: ['16 字符', '53.2 位', '75.2 位', '95.3 位', '105.1 位'],
    entropyCalcRow4: ['20 字符', '66.4 位', '94.0 位', '119.1 位', '131.4 位'],
    entropyCalcRow5: ['24 字符', '79.7 位', '112.8 位', '142.9 位', '157.7 位'],
    entropyNote: '这些计算假设每个字符都是均匀随机选择的。人类选择的密码有效熵要低得多，因为人类遵循可预测的模式。',
    entropyTarget: '2024-2025 年推荐熵目标：',
    entropyTarget1: '一般网络账户：60+ 位',
    entropyTarget2: '金融和电子邮件账户：80+ 位',
    entropyTarget3: '加密密钥和主密码：100+ 位',

    strongTitle: '3. 什么使密码变得强大',
    strongDesc: '强密码有三个基本属性：长度、随机性和唯一性。复杂性（混合字符类型）有帮助但次要于这三个属性。',
    strongProp1Title: '长度是最重要的因素',
    strongProp1Desc: '每增加一个字符，搜索空间乘以字符池大小。NIST 建议允许最多 64 字符或更多。对于生成的密码，16-20 字符是安全性和可用性之间的最佳点。',
    strongProp2Title: '真正的随机性消除模式',
    strongProp2Desc: '人类在生成随机序列方面表现很差。密码学安全随机数生成器产生的输出在计算上与真正的随机性无法区分。',
    strongProp3Title: '唯一性防止凭证填充',
    strongProp3Desc: '每个账户必须有不同的密码。如果你在电子邮件和小论坛使用相同的密码，论坛的泄露就等于给了攻击者你的电子邮件密码。',
    strongProp4Title: '字符多样性增加池大小',
    strongProp4Desc: '包含大写、小写、数字和符号将每字符熵从 4.70 位增加到 6.57 位。',

    lengthTitle: '4. 密码长度 vs 复杂性：哪个更重要？',
    lengthDesc: '答案很明确：长度胜出。更长但字符集较小的密码几乎总是比更短但字符集较大的密码更强。',
    lengthExample: '看这两个密码：',
    lengthEx1: 'k9$B（4 字符，完整 ASCII）：熵 = 4 * 6.57 = 26.3 位',
    lengthEx2: 'correcthorsebatterystaple（25 个小写字符）：熵 = 25 * 4.70 = 117.5 位',
    lengthExConclusion: '25 字符的小写密码比 4 字符的复杂密码强数十亿倍。',
    lengthTable: '各字符集达到 80 位熵所需长度：',
    lengthTableCol1: '字符集',
    lengthTableCol2: '池大小',
    lengthTableCol3: '80 位所需字符',
    lengthTableCol4: '100 位所需字符',
    lengthTableRow1: ['数字 (0-9)', '10', '25 字符', '31 字符'],
    lengthTableRow2: ['小写 (a-z)', '26', '18 字符', '22 字符'],
    lengthTableRow3: ['字母数字', '62', '14 字符', '17 字符'],
    lengthTableRow4: ['完整 ASCII', '95', '13 字符', '16 字符'],
    lengthBest: '最佳实践：使用完整 ASCII 字符集加 16 字符以上，可达到 105+ 位熵。',

    nistTitle: '5. NIST 2024 密码指南：有什么变化',
    nistDesc: 'NIST 更新了其数字身份指南（SP 800-63B），反映了对密码安全的现代理解。',
    nistChange1Title: '最少 8 字符，建议 15+',
    nistChange1Desc: 'NIST 设定 8 字符为绝对下限，但明确表示应鼓励更长的密码。',
    nistChange2Title: '允许最多 64+ 字符',
    nistChange2Desc: '密码字段必须接受至少 64 个字符。截断密码被明确禁止。',
    nistChange3Title: '无组合规则',
    nistChange3Desc: '不再建议要求大写、小写、数字和符号。',
    nistChange4Title: '不强制定期轮换',
    nistChange4Desc: '只有在有泄露证据时才应更改密码。',
    nistChange5Title: '检查泄露数据库',
    nistChange5Desc: '设置或更改密码时，系统必须检查已知泄露密码列表。',
    nistChange6Title: '允许密码字段粘贴',
    nistChange6Desc: '阻止密码字段粘贴会积极损害安全性。NIST 明确要求允许粘贴。',
    nistSummary: '总体主题很清楚：让用户更容易使用长的、唯一的、随机生成的密码。',

    attacksTitle: '6. 常见密码攻击及随机密码如何防御',
    attacksDesc: '了解攻击者如何破解密码有助于解释为什么随机生成是必要的。',
    attack1Title: '暴力破解攻击',
    attack1Desc: '暴力破解攻击系统地尝试每种可能的字符组合。现代 GPU 每秒可测试数十亿个组合。防御：长度。16 字符的完整 ASCII 随机密码即使以每秒 1000 亿次尝试也需要超过宇宙年龄的时间来破解。',
    attack2Title: '字典攻击',
    attack2Desc: '字典攻击尝试常见单词、名字、短语和已知密码。它们还应用常见转换。防御：随机性。真正随机的密码不包含任何字典攻击可利用的模式。',
    attack3Title: '彩虹表攻击',
    attack3Desc: '彩虹表是预计算的查找表，将哈希值映射回原始密码。防御：加盐（由服务器处理）和长度。',
    attack4Title: '凭证填充',
    attack4Desc: '凭证填充使用从一个服务泄露的用户名-密码对尝试登录其他服务。防御：唯一性。',
    attacksSummary: '16 字符以上的随机生成密码有效地中和了所有四种攻击类型。',

    programTitle: '7. 以编程方式生成密码',
    programDesc: '如果你需要在应用中生成密码，必须使用密码学安全随机数生成器（CSPRNG）。',
    programJsTitle: 'JavaScript / Node.js（使用 Web Crypto API）',
    programPyTitle: 'Python（使用 secrets 模块）',
    programNote: '关键：始终使用 crypto.getRandomValues()（JavaScript）或 secrets 模块（Python）。标准的 Math.random() 和 random.random() 不适合任何安全敏感用途。',
    programBrowserTitle: '在浏览器控制台快速生成密码',
    programBrowserNote: '日常使用时，只需使用我们的在线密码生成器工具。',

    passphraseTitle: '8. 密码短语 vs 密码：哪个更好？',
    passphraseDesc: '密码短语是由多个随机选择的单词组成的密码。最著名的方法是 Diceware。',
    passphraseCompTitle: '密码短语与随机密码对比',
    passphraseCompCol1: '类型',
    passphraseCompCol2: '示例',
    passphraseCompCol3: '熵',
    passphraseCompCol4: '可记忆性',
    passphraseCompRow1: ['16字符随机', 'k9$Bm2!zYp@W7xQf', '105 位', '很难记忆'],
    passphraseCompRow2: ['4词密码短语', 'correct horse battery staple', '51.7 位', '容易记忆'],
    passphraseCompRow3: ['6词密码短语', 'pencil tornado marble silk anchor cloud', '77.5 位', '中等难度'],
    passphraseCompRow4: ['8词密码短语', 'trophy canal wagon planet lemon oxide fern quartz', '103.4 位', '较难记忆'],
    passphrasePros: '何时使用密码短语：',
    passphrasePro1: '密码管理器的主密码',
    passphrasePro2: '全盘加密密码',
    passphrasePro3: 'SSH 密钥密码短语',
    passphrasePro4: '任何需要手动输入密码的场景',
    passphraseConsTitle: '何时使用随机字符密码：',
    passphraseCon1: '密码管理器管理的所有账户',
    passphraseCon2: 'API 密钥和服务令牌',
    passphraseCon3: '需要每字符最大熵时',
    passphraseConclusion: '关键洞察：密码短语牺牲熵密度换取可记忆性。两种方式都可以很安全。',

    managerTitle: '9. 密码管理器：密码生成器的必备搭档',
    managerDesc: '随机密码生成器只有在你有办法存储和检索密码时才有用。这就是密码管理器的作用。',
    managerWhy: '为什么你需要密码管理器：',
    managerReason1: '普通人有 100+ 个在线账户，无法记住 100 个独特的随机密码。',
    managerReason2: '密码管理器自动填充凭证，比手动输入更快更安全。',
    managerReason3: '大多数密码管理器包含内置密码生成器。',
    managerReason4: '密码管理器使用 Argon2id 或 PBKDF2 等算法加密你的保管库。',
    managerTips: '安全使用密码管理器的提示：',
    managerTip1: '选择 5-6 个 Diceware 词的主密码。',
    managerTip2: '在密码管理器账户上启用双因素认证。',
    managerTip3: '设置紧急访问。',
    managerTip4: '定期运行内置安全审计。',
    managerTip5: '永远不要以数字方式存储主密码。',

    twoFaTitle: '10. 双因素认证：必要的第二层防护',
    twoFaDesc: '即使最强的密码也可能通过钓鱼、恶意软件或服务端泄露而被攻破。双因素认证添加了仅凭密码无法绕过的第二道验证。',
    twoFaTypesTitle: '2FA 方法安全性排名',
    twoFaTypeCol1: '方法',
    twoFaTypeCol2: '安全级别',
    twoFaTypeCol3: '优点',
    twoFaTypeCol4: '缺点',
    twoFaTypeRow1: ['硬件密钥 (FIDO2/WebAuthn)', '最高', '防钓鱼，无共享密钥', '设备成本，可能丢失'],
    twoFaTypeRow2: ['TOTP 应用', '高', '免费，离线可用', '可被钓鱼'],
    twoFaTypeRow3: ['推送通知', '高', '易用', '需要网络'],
    twoFaTypeRow4: ['SMS 一次性代码', '中等', '通用', 'SIM 卡交换攻击'],
    twoFaTypeRow5: ['电子邮件一次性代码', '中低', '无需应用', '邮箱被攻破则失效'],
    twoFaRecommend: '为获得最大安全性，使用 FIDO2 硬件密钥作为主要 2FA 方法，TOTP 应用作为备份。',
    twoFaTip: '开发者提示：实施 2FA 时，支持 WebAuthn/FIDO2 作为主要方法。它是唯一本质上防钓鱼的 2FA 方法。',

    toolTitle: '11. 使用我们的在线密码生成器',
    toolDesc: '我们的免费在线密码生成器直接在浏览器中创建密码学安全的随机密码。不会向任何服务器发送密码。',
    toolFeature1: '可配置 4 到 128 字符的长度',
    toolFeature2: '独立切换大写、小写、数字和符号',
    toolFeature3: '排除易混淆字符（0/O, 1/l/I）',
    toolFeature4: '实时熵计算和强度指示器',
    toolFeature5: '一键复制到剪贴板',
    toolFeature6: '完全在浏览器中运行，无服务器通信',
    toolCta: '试用密码生成器工具',

    faqTitle: '常见问题',
    faq1q: '2024-2025 年密码应该多长？',
    faq1a: '对于随机生成的密码，16 个字符混合字符类型提供超过 105 位熵。NIST SP 800-63B 要求最少 8 字符但建议更长。对于密码短语，5-6 个随机词提供可比的安全性。如果使用密码管理器，没有理由不使用 16-20 字符的随机密码。',
    faq2q: '在线使用随机密码生成器安全吗？',
    faq2a: '使用 Web Crypto API 的良好在线密码生成器完全在浏览器中生成密码，永远不会离开你的设备。你可以通过浏览器开发者工具的网络标签来验证。',
    faq3q: '随机密码和密码短语有什么区别？',
    faq3a: '随机密码使用随机选择的单个字符，如 "k9$Bm2!zYp@W"。密码短语使用随机选择的完整单词，如 "pencil tornado marble silk"。用密码管理器时用随机密码，需要记忆时用密码短语。',
    faq4q: '我应该多久更改一次密码？',
    faq4a: '根据 NIST SP 800-63B（2024），不应按固定时间表更改密码。只有在有具体原因时才更改：怀疑泄露、出现在泄露数据库中、或服务报告安全事件。',
    faq5q: '量子计算机能破解我的密码吗？',
    faq5a: '量子计算机的 Grover 算法可将密码的有效熵减半。16 字符完整 ASCII 密码仍有约 52 位量子安全性。实用的大规模量子计算机仍在数年之后。',
    faq6q: '我应该在密码中使用特殊字符吗？',
    faq6a: '如果密码是随机生成的，包含特殊字符将字符池从 62 增加到 95，每字符增加约 0.62 位熵。16 字符大约多 10 位熵。所以是的，包含它们。但长度始终比复杂性更重要。',
    faq7q: '最强的密码是什么？',
    faq7a: '最强的密码是：尽可能长（最多 64-128 字符）、使用所有可用字符类型、由 CSPRNG 生成、每个账户唯一、存储在加密的密码管理器中。实际上，20 字符的完整 ASCII 随机密码（131 位熵）超过了 128 位 AES 加密密钥的安全级别。',
    faq8q: '密码生成器比自己编密码好吗？',
    faq8a: '是的，明显更好。研究一致表明人类选择的密码有效熵远低于其长度和字符集所暗示的。随机生成器消除所有人类偏见，达到理论最大熵。',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 };
const noteBoxStyle: React.CSSProperties = { background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const warningBoxStyle: React.CSSProperties = { background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const ulStyle: React.CSSProperties = { paddingLeft: 24, margin: '8px 0 16px', color: 'var(--text-secondary)', lineHeight: 1.8 };

export default function PasswordGeneratorOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqKeys.map(k => ({
      '@type': 'Question',
      name: t[k + 'q'] as string,
      acceptedAnswer: { '@type': 'Answer', text: t[k + 'a'] as string },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: 20, margin: '24px 0' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 12, color: '#0369a1' }}>{t.tldrTitle}</h3>
        <ul style={{ ...ulStyle, margin: 0, color: '#0c4a6e' }}>
          {['tldr1', 'tldr2', 'tldr3', 'tldr4', 'tldr5', 'tldr6'].map(k => (
            <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
          ))}
        </ul>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 8, padding: 20, margin: '24px 0' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 12, color: 'var(--text-primary)' }}>{t.keyTitle}</h3>
        <ul style={{ ...ulStyle, margin: 0 }}>
          {['key1', 'key2', 'key3', 'key4', 'key5', 'key6'].map(k => (
            <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
          ))}
        </ul>
      </div>

      {/* Section 1: Why Strong Passwords Matter */}
      <h2 style={h2Style}>{t.whyTitle}</h2>
      <p style={pStyle}>{t.whyDesc}</p>
      <ul style={ulStyle}>
        {['whyPoint1', 'whyPoint2', 'whyPoint3', 'whyPoint4'].map(k => (
          <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
        ))}
      </ul>
      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.whyConclusion}</p>
      </div>

      {/* Section 2: Password Entropy */}
      <h2 style={h2Style}>{t.entropyTitle}</h2>
      <p style={pStyle}>{t.entropyDesc}</p>

      <h3 style={h3Style}>{t.entropyPoolTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.entropyPoolCol1}</th>
              <th style={thStyle}>{t.entropyPoolCol2}</th>
              <th style={thStyle}>{t.entropyPoolCol3}</th>
              <th style={thStyle}>{t.entropyPoolCol4}</th>
            </tr>
          </thead>
          <tbody>
            {['entropyPoolRow1', 'entropyPoolRow2', 'entropyPoolRow3', 'entropyPoolRow4', 'entropyPoolRow5'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row[1]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row[2]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 13 }}>{row[3]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{t.entropyCalcTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.entropyCalcCol1}</th>
              <th style={thStyle}>{t.entropyCalcCol2}</th>
              <th style={thStyle}>{t.entropyCalcCol3}</th>
              <th style={thStyle}>{t.entropyCalcCol4}</th>
              <th style={thStyle}>{t.entropyCalcCol5}</th>
            </tr>
          </thead>
          <tbody>
            {['entropyCalcRow1', 'entropyCalcRow2', 'entropyCalcRow3', 'entropyCalcRow4', 'entropyCalcRow5'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', color: i < 1 ? '#ef4444' : i < 2 ? '#f59e0b' : '#22c55e' }}>{row[1]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', color: i < 2 ? '#ef4444' : i < 3 ? '#f59e0b' : '#22c55e' }}>{row[2]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', color: i < 1 ? '#f59e0b' : '#22c55e' }}>{row[3]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', color: '#22c55e' }}>{row[4]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.entropyNote}</p>
      </div>

      <p style={{ ...pStyle, fontWeight: 600, marginTop: 16 }}>{t.entropyTarget}</p>
      <ul style={ulStyle}>
        {['entropyTarget1', 'entropyTarget2', 'entropyTarget3'].map(k => (
          <li key={k}>{t[k] as string}</li>
        ))}
      </ul>

      <pre style={codeStyle}><code>{`# Entropy Formula
H = L * log2(R)

# Example: 16-char password, full ASCII (95 chars)
H = 16 * log2(95) = 16 * 6.57 = 105.1 bits

# Time to brute-force at 100 billion hashes/sec:
# 2^105.1 / 100,000,000,000 = ~1.29 * 10^21 seconds
# = ~40.9 trillion years

# For comparison, the universe is ~13.8 billion years old`}</code></pre>

      {/* Section 3: What Makes a Password Strong */}
      <h2 style={h2Style}>{t.strongTitle}</h2>
      <p style={pStyle}>{t.strongDesc}</p>

      {[
        { title: t.strongProp1Title as string, desc: t.strongProp1Desc as string, color: '#22c55e' },
        { title: t.strongProp2Title as string, desc: t.strongProp2Desc as string, color: '#3b82f6' },
        { title: t.strongProp3Title as string, desc: t.strongProp3Desc as string, color: '#f59e0b' },
        { title: t.strongProp4Title as string, desc: t.strongProp4Desc as string, color: '#8b5cf6' },
      ].map((item, i) => (
        <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}`, marginBottom: 12 }}>
          <strong style={{ color: item.color }}>{item.title}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
        </div>
      ))}

      {/* Section 4: Length vs Complexity */}
      <h2 style={h2Style}>{t.lengthTitle}</h2>
      <p style={pStyle}>{t.lengthDesc}</p>
      <p style={{ ...pStyle, fontWeight: 600 }}>{t.lengthExample}</p>
      <pre style={codeStyle}><code>{`${t.lengthEx1 as string}
${t.lengthEx2 as string}`}</code></pre>
      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.lengthExConclusion}</p>
      </div>

      <p style={{ ...pStyle, fontWeight: 600, marginTop: 20 }}>{t.lengthTable}</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.lengthTableCol1}</th>
              <th style={thStyle}>{t.lengthTableCol2}</th>
              <th style={thStyle}>{t.lengthTableCol3}</th>
              <th style={thStyle}>{t.lengthTableCol4}</th>
            </tr>
          </thead>
          <tbody>
            {['lengthTableRow1', 'lengthTableRow2', 'lengthTableRow3', 'lengthTableRow4'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row[1]}</td>
                  <td style={tdStyle}>{row[2]}</td>
                  <td style={tdStyle}>{row[3]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ ...noteBoxStyle, background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 600 }}>{t.lengthBest}</p>
      </div>

      {/* Section 5: NIST Guidelines */}
      <h2 style={h2Style}>{t.nistTitle}</h2>
      <p style={pStyle}>{t.nistDesc}</p>

      {[
        { title: t.nistChange1Title as string, desc: t.nistChange1Desc as string, icon: '1' },
        { title: t.nistChange2Title as string, desc: t.nistChange2Desc as string, icon: '2' },
        { title: t.nistChange3Title as string, desc: t.nistChange3Desc as string, icon: '3' },
        { title: t.nistChange4Title as string, desc: t.nistChange4Desc as string, icon: '4' },
        { title: t.nistChange5Title as string, desc: t.nistChange5Desc as string, icon: '5' },
        { title: t.nistChange6Title as string, desc: t.nistChange6Desc as string, icon: '6' },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', marginBottom: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{item.icon}</div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>{item.title}</strong>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        </div>
      ))}

      <div style={{ ...noteBoxStyle, marginTop: 16 }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.nistSummary}</p>
      </div>

      <pre style={codeStyle}><code>{`# NIST SP 800-63B (2024) Summary
+----------------------------------+----------------------------------+
| REMOVED (DO NOT)                 | REQUIRED / RECOMMENDED           |
+----------------------------------+----------------------------------+
| Composition rules                | Min 8 chars (recommend 15+)      |
| Forced periodic rotation         | Allow 64+ characters             |
| Password hints                   | Check against breach databases   |
| Security questions (KBA)         | Allow paste in password fields   |
| Truncating passwords             | Support all Unicode characters   |
| Blocking paste                   | Rate-limit failed attempts       |
+----------------------------------+----------------------------------+`}</code></pre>

      {/* Section 6: Common Password Attacks */}
      <h2 style={h2Style}>{t.attacksTitle}</h2>
      <p style={pStyle}>{t.attacksDesc}</p>

      {[
        { title: t.attack1Title as string, desc: t.attack1Desc as string, color: '#ef4444' },
        { title: t.attack2Title as string, desc: t.attack2Desc as string, color: '#f59e0b' },
        { title: t.attack3Title as string, desc: t.attack3Desc as string, color: '#8b5cf6' },
        { title: t.attack4Title as string, desc: t.attack4Desc as string, color: '#3b82f6' },
      ].map((item, i) => (
        <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}`, marginBottom: 12 }}>
          <strong style={{ color: item.color, fontSize: 16 }}>{item.title}</strong>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
        </div>
      ))}

      <div style={{ ...noteBoxStyle, background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 600 }}>{t.attacksSummary}</p>
      </div>

      <pre style={codeStyle}><code>{`# Attack Speed Reference (2024 Hardware)
# ─────────────────────────────────────────────────
# Hash Type        │ Speed (hashes/sec)  │ Hardware
# ─────────────────┼─────────────────────┼─────────
# MD5              │ 150 billion         │ RTX 4090
# SHA-256          │ 22 billion          │ RTX 4090
# bcrypt (cost=12) │ 32,000              │ RTX 4090
# Argon2id         │ ~1,000              │ RTX 4090
# ─────────────────────────────────────────────────
# A 16-char full ASCII password (95^16):
# MD5:      95^16 / 150e9 = ~2.9e17 seconds = ~9.2 billion years
# Argon2id: 95^16 / 1000  = ~4.4e25 seconds = ~1.4e18 years`}</code></pre>

      {/* Section 7: Generating Passwords Programmatically */}
      <h2 style={h2Style}>{t.programTitle}</h2>
      <p style={pStyle}>{t.programDesc}</p>

      <h3 style={h3Style}>{t.programJsTitle}</h3>
      <pre style={codeStyle}><code>{`// Password Generator using Web Crypto API (browser & Node.js 19+)
function generatePassword(length = 16, options = {}) {
  const {
    uppercase = true,
    lowercase = true,
    digits = true,
    symbols = true,
  } = options;

  let charset = '';
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (digits)    charset += '0123456789';
  if (symbols)   charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (charset.length === 0) {
    throw new Error('At least one character type must be enabled');
  }

  // Use crypto.getRandomValues for cryptographic security
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
}

// Usage
console.log(generatePassword(16));
// Example output: "k9$Bm2!zYp@W7xQf"

console.log(generatePassword(20, { symbols: false }));
// Example output: "kR9mB2pTzY0WdXf7Qa4J"

// Calculate entropy
const poolSize = 95; // full ASCII
const length = 16;
const entropy = length * Math.log2(poolSize);
console.log(\`Entropy: \${entropy.toFixed(1)} bits\`);
// Output: "Entropy: 105.1 bits"`}</code></pre>

      <h3 style={h3Style}>{t.programPyTitle}</h3>
      <pre style={codeStyle}><code>{`import secrets
import string
import math

def generate_password(length=16, uppercase=True, lowercase=True,
                      digits=True, symbols=True):
    """Generate a cryptographically secure random password."""
    charset = ''
    if uppercase: charset += string.ascii_uppercase
    if lowercase: charset += string.ascii_lowercase
    if digits:    charset += string.digits
    if symbols:   charset += string.punctuation

    if not charset:
        raise ValueError('At least one character type must be enabled')

    # secrets.choice uses os.urandom (CSPRNG)
    password = ''.join(secrets.choice(charset) for _ in range(length))
    return password


def generate_passphrase(num_words=6, separator='-'):
    """Generate a Diceware-style passphrase."""
    # In production, use a proper Diceware word list
    # This is a simplified example
    import pathlib
    wordlist_path = '/usr/share/dict/words'
    words = [w.strip().lower() for w in open(wordlist_path)
             if 3 <= len(w.strip()) <= 8 and w.strip().isalpha()]
    return separator.join(secrets.choice(words) for _ in range(num_words))


def password_entropy(password, pool_size):
    """Calculate password entropy in bits."""
    return len(password) * math.log2(pool_size)


# Usage
pw = generate_password(16)
print(f"Password: {pw}")
print(f"Entropy:  {password_entropy(pw, 95):.1f} bits")

pp = generate_passphrase(6)
print(f"Passphrase: {pp}")
# Example: "marble-tornado-pencil-silk-anchor-cloud"`}</code></pre>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>Warning:</strong> {t.programNote}</p>
      </div>

      <h3 style={h3Style}>{t.programBrowserTitle}</h3>
      <pre style={codeStyle}><code>{`// Quick one-liner for browser console
// Generates a 20-char password with full ASCII
Array.from(crypto.getRandomValues(new Uint32Array(20)),
  v => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"[v % 72]
).join('')`}</code></pre>
      <p style={pStyle}>{t.programBrowserNote}</p>

      {/* Section 8: Passphrase vs Password */}
      <h2 style={h2Style}>{t.passphraseTitle}</h2>
      <p style={pStyle}>{t.passphraseDesc}</p>

      <h3 style={h3Style}>{t.passphraseCompTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.passphraseCompCol1}</th>
              <th style={thStyle}>{t.passphraseCompCol2}</th>
              <th style={thStyle}>{t.passphraseCompCol3}</th>
              <th style={thStyle}>{t.passphraseCompCol4}</th>
            </tr>
          </thead>
          <tbody>
            {['passphraseCompRow1', 'passphraseCompRow2', 'passphraseCompRow3', 'passphraseCompRow4'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{row[1]}</td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: parseFloat(row[2]) >= 100 ? '#22c55e' : parseFloat(row[2]) >= 70 ? '#3b82f6' : '#f59e0b' }}>{row[2]}</td>
                  <td style={tdStyle}>{row[3]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p style={{ ...pStyle, fontWeight: 600 }}>{t.passphrasePros}</p>
      <ul style={ulStyle}>
        {['passphrasePro1', 'passphrasePro2', 'passphrasePro3', 'passphrasePro4'].map(k => (
          <li key={k}>{t[k] as string}</li>
        ))}
      </ul>

      <p style={{ ...pStyle, fontWeight: 600 }}>{t.passphraseConsTitle}</p>
      <ul style={ulStyle}>
        {['passphraseCon1', 'passphraseCon2', 'passphraseCon3'].map(k => (
          <li key={k}>{t[k] as string}</li>
        ))}
      </ul>

      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.passphraseConclusion}</p>
      </div>

      <pre style={codeStyle}><code>{`# Entropy comparison: Passphrase vs Random Password
# ─────────────────────────────────────────────────────────────
# Type                  │ Characters │ Entropy    │ Brute-force
# ──────────────────────┼────────────┼────────────┼────────────
# 4-word Diceware       │ ~22 chars  │ 51.7 bits  │ ~71 years
# 6-word Diceware       │ ~35 chars  │ 77.5 bits  │ ~4.7e15 yrs
# 8-word Diceware       │ ~47 chars  │ 103.4 bits │ ~3.2e23 yrs
# 12-char random ASCII  │ 12 chars   │ 78.8 bits  │ ~9.5e15 yrs
# 16-char random ASCII  │ 16 chars   │ 105.1 bits │ ~1.3e24 yrs
# 20-char random ASCII  │ 20 chars   │ 131.4 bits │ ~1.1e31 yrs
# ─────────────────────────────────────────────────────────────
# (Assuming 100 billion hashes/sec with SHA-256)`}</code></pre>

      {/* Section 9: Password Managers */}
      <h2 style={h2Style}>{t.managerTitle}</h2>
      <p style={pStyle}>{t.managerDesc}</p>

      <p style={{ ...pStyle, fontWeight: 600 }}>{t.managerWhy}</p>
      <ul style={ulStyle}>
        {['managerReason1', 'managerReason2', 'managerReason3', 'managerReason4'].map(k => (
          <li key={k} style={{ marginBottom: 8 }}>{t[k] as string}</li>
        ))}
      </ul>

      <p style={{ ...pStyle, fontWeight: 600 }}>{t.managerTips}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['managerTip1', 'managerTip2', 'managerTip3', 'managerTip4', 'managerTip5'].map((k, i) => (
          <div key={k} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 6, border: '1px solid var(--border-color)' }}>
            <span style={{ background: '#22c55e', color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{t[k] as string}</span>
          </div>
        ))}
      </div>

      {/* Section 10: Two-Factor Authentication */}
      <h2 style={h2Style}>{t.twoFaTitle}</h2>
      <p style={pStyle}>{t.twoFaDesc}</p>

      <h3 style={h3Style}>{t.twoFaTypesTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.twoFaTypeCol1}</th>
              <th style={thStyle}>{t.twoFaTypeCol2}</th>
              <th style={thStyle}>{t.twoFaTypeCol3}</th>
              <th style={thStyle}>{t.twoFaTypeCol4}</th>
            </tr>
          </thead>
          <tbody>
            {['twoFaTypeRow1', 'twoFaTypeRow2', 'twoFaTypeRow3', 'twoFaTypeRow4', 'twoFaTypeRow5'].map((k, i) => {
              const row = t[k] as string[];
              const secColor = i === 0 ? '#22c55e' : i <= 2 ? '#3b82f6' : i === 3 ? '#f59e0b' : '#ef4444';
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: secColor }}>{row[1]}</td>
                  <td style={{ ...tdStyle, fontSize: 13 }}>{row[2]}</td>
                  <td style={{ ...tdStyle, fontSize: 13 }}>{row[3]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.twoFaRecommend}</p>
      </div>
      <div style={{ ...warningBoxStyle, marginTop: 12 }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.twoFaTip}</p>
      </div>

      {/* Section 11: Tool CTA */}
      <h2 style={h2Style}>{t.toolTitle}</h2>
      <p style={pStyle}>{t.toolDesc}</p>
      <ul style={ulStyle}>
        {['toolFeature1', 'toolFeature2', 'toolFeature3', 'toolFeature4', 'toolFeature5', 'toolFeature6'].map(k => (
          <li key={k}>{t[k] as string}</li>
        ))}
      </ul>

      <div style={{ textAlign: 'center', margin: '32px 0' }}>
        <Link
          href={`/${lang}/tools/password-generator`}
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'var(--accent-blue)',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
        >
          {t.toolCta}
        </Link>
      </div>

      {/* FAQ Section */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {faqKeys.map(k => (
          <details key={k} style={{ background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <summary style={{ padding: '14px 16px', cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)', fontSize: 15 }}>{t[k + 'q'] as string}</summary>
            <div style={{ padding: '0 16px 14px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{t[k + 'a'] as string}</div>
          </details>
        ))}
      </div>

      {/* Final CTA */}
      <div style={{ marginTop: 40, padding: 24, background: 'linear-gradient(135deg, #f0f9ff 0%, #f8fafc 100%)', borderRadius: 12, border: '1px solid #bae6fd', textAlign: 'center' }}>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#0369a1', marginBottom: 8, marginTop: 0 }}>
          {lang === 'zh' ? '立即生成安全密码' : 'Generate a Secure Password Now'}
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 16, marginTop: 0 }}>
          {lang === 'zh'
            ? '使用我们免费的在线密码生成器创建密码学安全的随机密码，完全在浏览器中运行。'
            : 'Use our free online password generator to create cryptographically secure random passwords, entirely in your browser.'}
        </p>
        <Link
          href={`/${lang}/tools/password-generator`}
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: '#0369a1',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          {t.toolCta} &rarr;
        </Link>
      </div>
    </div>
  );
}
