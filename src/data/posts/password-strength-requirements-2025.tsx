'use client';
import React from 'react';

const translations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'Password Strength Requirements in 2025: NIST Guidelines & Best Practices',
    intro: 'Password policies have undergone a radical transformation in recent years. The old rules — forced special characters, mandatory 90-day rotations, security questions — have been officially retired by NIST (National Institute of Standards and Technology). In their place, a new evidence-based approach focuses on length, breach-list checking, and multi-factor authentication. This comprehensive guide covers everything you need to know about modern password requirements in 2025, from the latest NIST SP 800-63B guidelines to practical implementation strategies.',

    nistTitle: '1. NIST SP 800-63B: What Changed',
    nistDesc: 'NIST Special Publication 800-63B (Digital Identity Guidelines: Authentication and Lifecycle Management) was first revised in 2017 and updated through 2024. It fundamentally changed how organizations should think about password security. The key insight: most traditional password rules made passwords harder for humans but not meaningfully harder for attackers.',
    nistChange1Title: 'No More Forced Rotation',
    nistChange1Desc: 'NIST explicitly states that verifiers SHALL NOT require periodic password changes unless there is evidence of compromise. Research showed that forced rotation leads to predictable patterns: users append incrementing numbers (Password1, Password2, Password3) or make minimal changes that attackers can easily guess. A strong password that is not compromised does not become weaker over time.',
    nistChange2Title: 'No Composition Rules',
    nistChange2Desc: 'NIST removed the requirement for specific character types (uppercase, lowercase, digits, special characters). These rules led to predictable patterns like "Password1!" that satisfy complexity requirements but are trivially guessable. Instead, NIST emphasizes length and checking against known-compromised passwords.',
    nistChange3Title: 'No Password Hints or Knowledge-Based Authentication',
    nistChange3Desc: 'Security questions like "What is your mother\'s maiden name?" are no longer acceptable. This information is often publicly available or easily guessable. NIST requires that memorized secret verifiers SHALL NOT use knowledge-based authentication (KBA) for verification.',
    nistChange4Title: 'Must Check Against Breach Lists',
    nistChange4Desc: 'When a user sets or changes a password, NIST requires that the password SHALL be compared against a list of commonly-used, expected, or compromised values. This includes passwords from previous breach corpuses, dictionary words, repetitive or sequential characters, and context-specific words like the service name or username.',

    lengthTitle: '2. Minimum Length: 8 Is Dead, 12-16 Is the New Standard',
    lengthDesc: 'NIST SP 800-63B requires a minimum of 8 characters for user-chosen passwords, but security experts and modern frameworks have moved well beyond this floor. The mathematical reality is simple: every additional character exponentially increases the search space an attacker must cover.',
    lengthTable: 'Here is how password length affects brute-force time assuming 95 printable ASCII characters and an attacker hashing at 10 billion attempts per second (modern GPU cluster against a fast hash):',
    lengthCol1: 'Password Length',
    lengthCol2: 'Possible Combinations',
    lengthCol3: 'Time to Brute Force',
    lengthCol4: 'Verdict',
    lengthRow1: ['6 chars', '95^6 = 735 billion', '~1.2 minutes', 'Instantly crackable'],
    lengthRow2: ['8 chars', '95^8 = 6.6 quadrillion', '~7.6 days', 'Too weak for 2025'],
    lengthRow3: ['10 chars', '95^10 = 59.9 quintillion', '~190 years', 'Minimum acceptable'],
    lengthRow4: ['12 chars', '95^12 = 540 sextillion', '~1.7 million years', 'Good'],
    lengthRow5: ['16 chars', '95^16 = 44 octillion', '~139 trillion years', 'Excellent'],
    lengthRow6: ['20 chars', '95^20 = 3.6 x 10^39', '~11.4 x 10^21 years', 'Overkill (but great)'],
    lengthNote: 'Important: These calculations assume a fast hash like SHA-256. With a proper password hashing algorithm like Argon2id (which reduces attacker speed to roughly 1,000 hashes/sec), even an 8-character password takes significantly longer. However, length remains the single most effective defense against brute-force attacks.',
    lengthRecommend: 'Modern recommendations by organization:',
    lengthNIST: 'NIST SP 800-63B: Minimum 8 characters (but recommends allowing up to 64+)',
    lengthOWASP: 'OWASP: Minimum 8 characters, recommends 12+',
    lengthPCI: 'PCI-DSS v4.0: Minimum 12 characters (increased from 7 in v3.2)',
    lengthMS: 'Microsoft: Minimum 12 characters for Azure AD',
    lengthGoogle: 'Google: Minimum 8 characters, recommends 12+',
    lengthBest: 'Best practice for 2025: Set your minimum to 12 characters. Allow (and encourage) up to 64 or more. Never truncate passwords.',

    recommendsTitle: '3. What NIST Recommends: Allow All Characters, Check Breach Lists, No Hints',
    recommendsDesc: 'The NIST guidelines take a fundamentally different approach than traditional password policies. Instead of making passwords hard to create, they focus on making passwords hard to guess.',
    rec1Title: 'Allow All Characters',
    rec1Desc: 'Verifiers SHALL accept all printable ASCII characters, the space character, and all Unicode characters (including emoji). There SHALL be no rules limiting which characters can appear where. This enables passphrases, non-English passwords, and creative password construction.',
    rec2Title: 'Support Long Passwords',
    rec2Desc: 'Verifiers SHALL permit passwords of at least 64 characters in length. There is no reason to set an upper limit below this. Longer passwords should be encouraged through UI design — show a strength meter that rewards length rather than complexity.',
    rec3Title: 'Check Against Breach Databases',
    rec3Desc: 'When a user creates or changes a password, check it against a list of known-compromised passwords. If the password appears in a breach database, reject it and explain why. The Have I Been Pwned API provides a free, privacy-preserving way to do this using k-anonymity.',
    rec4Title: 'No Truncation',
    rec4Desc: 'Verifiers SHALL NOT truncate passwords. Every character the user enters must be part of the stored hash. Bcrypt has a 72-byte limit — if using bcrypt, pre-hash the password with SHA-256 before passing it to bcrypt.',
    rec5Title: 'No Hints or Recovery Questions',
    rec5Desc: 'Verifiers SHALL NOT use password hints, security questions, or knowledge-based authentication. These provide attack vectors that undermine password security. Use email-based or MFA-based account recovery instead.',
    rec6Title: 'Show the Password Option',
    rec6Desc: 'Verifiers SHOULD allow users to temporarily display (unmask) their password while typing. This reduces errors from hidden input and helps users create and enter long, complex passwords correctly.',

    removedTitle: '4. What NIST Removed: Forced Special Characters, Periodic Expiration, Security Questions',
    removedDesc: 'Understanding what was removed is just as important as understanding what was added. Each removed requirement was based on assumptions that research proved wrong.',
    removed1Title: 'Forced Special Characters',
    removed1Desc: 'The old requirement to include at least one uppercase, one lowercase, one digit, and one special character led to entirely predictable patterns. "Password1!" satisfies every traditional complexity rule while being one of the most commonly breached passwords. Users overwhelmingly place the uppercase letter first, the digit near the end, and the special character at the very end. Attackers know this and optimize their cracking strategies accordingly.',
    removed2Title: 'Periodic Password Expiration',
    removed2Desc: 'Forcing users to change passwords every 30, 60, or 90 days causes security fatigue and predictable password mutations. A Carnegie Mellon University study found that users who were forced to change passwords chose passwords that were statistically similar to their previous ones, making them vulnerable to targeted guessing. NIST now says: change passwords only when there is evidence of compromise.',
    removed3Title: 'Security Questions',
    removed3Desc: 'Security questions are fundamentally broken. The answers to questions like "What is your mother\'s maiden name?" or "What city were you born in?" are often publicly available through social media, public records, or data breaches. Even "secret" questions like "What is your favorite movie?" have a surprisingly small answer space. Google research showed that 19.7% of English speakers would answer "pizza" to "What is your favorite food?".',
    removed4Title: 'SMS-Only Two-Factor Authentication',
    removed4Desc: 'While NIST did not remove SMS 2FA entirely, it is classified as a "restricted" authenticator due to known vulnerabilities: SIM swapping, SS7 protocol attacks, and social engineering of carrier employees. NIST recommends app-based TOTP or hardware security keys instead.',
    removedSummary: 'The pattern is clear: NIST removed requirements that created a false sense of security while adding friction for legitimate users. Every removed rule was replaced with evidence-based guidance that actually improves security.',

    entropyTitle: '5. Entropy Calculator: How to Estimate Password Strength in Bits',
    entropyDesc: 'Password entropy measures the unpredictability of a password in bits. Higher entropy means the password is harder to guess. Entropy is calculated as: H = log2(R^L), where R is the size of the character pool and L is the password length.',
    entropyPoolTitle: 'Character Pool Sizes',
    entropyPool: 'Pool',
    entropyPoolSize: 'Size (R)',
    entropyExample: 'Example',
    entropyPoolDigits: 'Digits only (0-9)',
    entropyPoolLower: 'Lowercase letters (a-z)',
    entropyPoolUpper: 'Upper + lowercase (A-Za-z)',
    entropyPoolAlphaNum: 'Alphanumeric (A-Za-z0-9)',
    entropyPoolFull: 'Full printable ASCII',
    entropyPoolDiceware: 'Diceware word list',
    entropyCalcTitle: 'Entropy Calculations for Common Passwords',
    entropyCalcType: 'Password Type',
    entropyCalcLength: 'Length',
    entropyCalcFormula: 'Entropy Formula',
    entropyCalcBits: 'Entropy (bits)',
    entropyCalcStrength: 'Strength',
    entropyCalcRow1: ['4-digit PIN', '4', 'log2(10^4)', '13.3 bits', 'Very Weak'],
    entropyCalcRow2: ['6-char lowercase', '6', 'log2(26^6)', '28.2 bits', 'Weak'],
    entropyCalcRow3: ['8-char mixed case + digits', '8', 'log2(62^8)', '47.6 bits', 'Moderate'],
    entropyCalcRow4: ['12-char full ASCII', '12', 'log2(95^12)', '78.8 bits', 'Strong'],
    entropyCalcRow5: ['16-char full ASCII', '16', 'log2(95^16)', '105.1 bits', 'Very Strong'],
    entropyCalcRow6: ['4-word passphrase (Diceware)', '4 words', 'log2(7776^4)', '51.7 bits', 'Moderate'],
    entropyCalcRow7: ['6-word passphrase (Diceware)', '6 words', 'log2(7776^6)', '77.5 bits', 'Strong'],
    entropyCalcRow8: ['8-word passphrase (Diceware)', '8 words', 'log2(7776^8)', '103.4 bits', 'Very Strong'],
    entropyNote: 'Note: These calculations assume truly random password generation. Human-chosen passwords have much lower effective entropy because humans are predictable — they use dictionary words, names, dates, and common substitutions (a→@, e→3). A password strength meter that only checks length and character classes will drastically overestimate the entropy of human-chosen passwords.',
    entropyRecommend: 'Target entropy levels for 2025:',
    entropyRec1: 'Online attacks (rate-limited): 30+ bits is sufficient with account lockout',
    entropyRec2: 'Offline attacks (stolen hash, fast hash): 60+ bits minimum',
    entropyRec3: 'Offline attacks (stolen hash, Argon2id): 40+ bits is acceptable',
    entropyRec4: 'High-security accounts: 80+ bits recommended',

    comparisonTitle: '6. Comparison Table: NIST vs OWASP vs PCI-DSS vs Old Standards',
    comparisonDesc: 'Different standards and frameworks have different requirements. Here is how they compare as of 2025:',
    compFeature: 'Requirement',
    compNIST: 'NIST SP 800-63B (2024)',
    compOWASP: 'OWASP ASVS v4.0',
    compPCI: 'PCI-DSS v4.0',
    compOld: 'Traditional (pre-2017)',
    compMinLen: 'Minimum Length',
    compMinLenNIST: '8 characters',
    compMinLenOWASP: '8 characters (12+ recommended)',
    compMinLenPCI: '12 characters',
    compMinLenOld: '6-8 characters',
    compMaxLen: 'Maximum Length',
    compMaxLenNIST: '64+ characters',
    compMaxLenOWASP: '128+ characters',
    compMaxLenPCI: 'Not specified',
    compMaxLenOld: 'Often 16-20 characters',
    compComplexity: 'Complexity Rules',
    compComplexityNIST: 'SHALL NOT require',
    compComplexityOWASP: 'Not required',
    compComplexityPCI: 'Numeric + alphabetic',
    compComplexityOld: 'Upper + lower + digit + special',
    compRotation: 'Forced Rotation',
    compRotationNIST: 'SHALL NOT require',
    compRotationOWASP: 'Not recommended',
    compRotationPCI: 'Every 90 days (if no MFA)',
    compRotationOld: 'Every 30-90 days',
    compBreach: 'Breach List Check',
    compBreachNIST: 'SHALL check',
    compBreachOWASP: 'Required',
    compBreachPCI: 'Not required',
    compBreachOld: 'Not required',
    compMFA: 'MFA',
    compMFANIST: 'Required for AAL2+',
    compMFAOWASP: 'Required for Level 2+',
    compMFAPCI: 'Required for admin access',
    compMFAOld: 'Optional',
    compHints: 'Password Hints',
    compHintsNIST: 'SHALL NOT use',
    compHintsOWASP: 'Prohibited',
    compHintsPCI: 'Not addressed',
    compHintsOld: 'Commonly used',
    compHash: 'Password Hashing',
    compHashNIST: 'Approved algorithms only',
    compHashOWASP: 'Argon2id, bcrypt, scrypt',
    compHashPCI: 'Strong one-way hash',
    compHashOld: 'MD5 or SHA-1 common',
    compUnicode: 'Unicode Support',
    compUnicodeNIST: 'SHALL accept',
    compUnicodeOWASP: 'Required',
    compUnicodePCI: 'Not addressed',
    compUnicodeOld: 'Often ASCII-only',
    compNote: 'Key takeaway: NIST leads the way with the most modern, evidence-based approach. PCI-DSS v4.0 still requires complexity rules and periodic rotation (unless MFA is used), reflecting its slower adoption of research-based recommendations. If you can only follow one standard, choose NIST SP 800-63B.',

    passphraseTitle: '7. Passphrase vs Password: Why "correct horse battery staple" Wins',
    passphraseDesc: 'The famous XKCD comic (#936) made a compelling case for passphrases over passwords. The math supports it: a randomly selected 4-word passphrase from a 7,776-word Diceware list has 51.7 bits of entropy — comparable to a random 8-character mixed-case alphanumeric password — while being dramatically easier to remember.',
    passCompTitle: 'Passphrase vs Traditional Password Comparison',
    passCompType: 'Type',
    passCompExample: 'Example',
    passCompEntropy: 'Entropy',
    passCompMemorability: 'Memorability',
    passCompTyping: 'Typing Ease',
    passCompRow1: ['Traditional complex', 'j7#Kp!2x', '~52 bits', 'Very hard', 'Slow, error-prone'],
    passCompRow2: ['4-word Diceware', 'correct horse battery staple', '~52 bits', 'Easy', 'Fast, natural'],
    passCompRow3: ['6-word Diceware', 'atlas usable flock dizzy clout snare', '~78 bits', 'Moderate', 'Fast, natural'],
    passCompRow4: ['8-word Diceware', 'embody quote cider clap virus gag yoyo wheat', '~103 bits', 'Harder', 'Fast, natural'],
    passWhyBetter: 'Why passphrases are better:',
    passReason1: 'Equal or greater entropy: A 4-word passphrase matches an 8-character random password in entropy. A 6-word passphrase exceeds most traditional passwords.',
    passReason2: 'Easier to remember: Humans are better at remembering sequences of words than random characters. A passphrase creates a mental image.',
    passReason3: 'Easier to type: Especially on mobile devices, typing words is faster and less error-prone than switching between character types.',
    passReason4: 'Resistant to shoulder surfing: A long string of words is harder to memorize from a brief glance than a short random string.',
    passReason5: 'Naturally long: Even a 4-word passphrase is typically 20+ characters, providing excellent protection against brute-force attacks.',
    passWarning: 'Warning: The passphrase words MUST be randomly selected, not chosen by the user. Human-chosen phrases like "iloveyouforever" or "letmeinplease" have extremely low entropy because attackers know common phrases. Use a Diceware word list with actual dice or a cryptographically secure random number generator.',
    passDiceware: 'How to generate a Diceware passphrase:',
    passDice1: 'Get a Diceware word list (7,776 words, each mapped to a 5-digit dice roll).',
    passDice2: 'Roll 5 dice (or one die 5 times) for each word you need.',
    passDice3: 'Look up each 5-digit number in the word list.',
    passDice4: 'Combine the words with spaces. That is your passphrase.',
    passDice5: 'For most purposes, 5-6 words provide excellent security (64.6 - 77.5 bits).',

    implementTitle: '8. Implementing Password Policies: Bcrypt Cost, Rate Limiting, MFA',
    implementDesc: 'Knowing the guidelines is one thing; implementing them correctly is another. Here is a practical checklist for implementing a modern, NIST-compliant password policy in 2025.',
    implHash: 'Password Hashing',
    implHashDesc: 'Choose Argon2id as your primary hashing algorithm. If Argon2id is not available, use bcrypt with a cost factor of 12 or higher. Target 200-500ms per hash on your production hardware. Never use MD5, SHA-1, SHA-256, or any fast hash function for password storage.',
    implRate: 'Rate Limiting',
    implRateDesc: 'Implement rate limiting on authentication endpoints to prevent online brute-force attacks. After 5-10 failed attempts, introduce progressive delays or temporary account lockout. Use a CAPTCHA after 3 failed attempts. Implement IP-based rate limiting (e.g., 100 attempts per IP per hour) and account-based rate limiting (e.g., 10 attempts per account per 15 minutes).',
    implMFA: 'Multi-Factor Authentication (MFA)',
    implMFADesc: 'MFA is the single most effective defense against credential-based attacks. Even if an attacker obtains a password (through phishing, breach reuse, or brute force), MFA blocks unauthorized access. Prefer app-based TOTP (Google Authenticator, Authy) or hardware keys (YubiKey, Passkeys) over SMS-based 2FA.',
    implValidation: 'Server-Side Validation Checklist',
    implVal1: 'Minimum length: 12 characters (8 absolute minimum per NIST)',
    implVal2: 'Maximum length: 64+ characters (never truncate)',
    implVal3: 'Accept all Unicode characters including spaces and emoji',
    implVal4: 'Check against breach database (Have I Been Pwned API)',
    implVal5: 'Reject passwords that match the username, email, or service name',
    implVal6: 'Reject common passwords from a blocklist (top 100K most common)',
    implVal7: 'Do NOT require specific character types',
    implVal8: 'Do NOT force periodic password changes',
    implVal9: 'Show a password strength meter that rewards length',
    implVal10: 'Provide a "show password" toggle',
    implCost: 'Bcrypt / Argon2id Cost Tuning',
    implCostDesc: 'The cost parameter should be tuned to your specific hardware. Run benchmarks on your production server and choose a cost that results in 200-500ms per hash. This provides a good balance between user experience (login latency) and attacker cost.',

    breachTitle: '9. Checking Against Breach Databases: Have I Been Pwned API, k-Anonymity',
    breachDesc: 'One of NIST\'s most impactful requirements is checking passwords against known breach databases. The Have I Been Pwned (HIBP) Passwords API makes this both practical and privacy-preserving using a technique called k-anonymity.',
    breachHow: 'How k-Anonymity Works',
    breachHowDesc: 'The HIBP Passwords API never sees the actual password or even the full hash. Instead, it uses a range search based on the first 5 characters of the SHA-1 hash:',
    breachStep1: 'Hash the password with SHA-1 (used only for lookup, not for storage).',
    breachStep2: 'Send only the first 5 characters of the hex-encoded hash to the HIBP API.',
    breachStep3: 'The API returns all hash suffixes that match the 5-character prefix (typically 500-800 results).',
    breachStep4: 'Compare the full hash against the returned suffixes locally.',
    breachStep5: 'If a match is found, the password has been seen in a breach. Reject it.',
    breachPrivacy: 'Privacy guarantee: The API only sees a 5-character hash prefix that matches hundreds of different passwords. It never learns which specific password was checked. The full hash comparison happens entirely on your server.',
    breachStats: 'As of 2025, the HIBP Passwords database contains over 900 million unique compromised passwords. If a user tries to set a password that appears in this list, it should be rejected with a clear explanation.',
    breachAlternatives: 'Alternatives to HIBP',
    breachAlt1: 'Self-hosted: Download the full HIBP password hash file (~35GB compressed) and query it locally. Eliminates external API dependency but requires storage and update management.',
    breachAlt2: 'Cloudflare: Offers a free compromised credentials check as part of their WAF. Works automatically without code changes for sites behind Cloudflare.',
    breachAlt3: 'Custom blocklist: Maintain your own list of the top 100,000 most common passwords. Less comprehensive than HIBP but simpler to implement and has zero external dependencies.',

    managerTitle: '10. Password Manager Recommendations',
    managerDesc: 'With passwords becoming longer and more unique (never reused across sites), password managers are no longer optional — they are essential. A password manager generates, stores, and auto-fills strong unique passwords for every account.',
    managerWhy: 'Why password managers are critical:',
    managerReason1: 'The average person has 100+ online accounts. No one can remember 100 unique, strong passwords.',
    managerReason2: 'Password reuse is the #1 cause of credential-based breaches. A password manager eliminates reuse entirely.',
    managerReason3: 'Password managers generate truly random passwords with maximum entropy, not human-predictable patterns.',
    managerReason4: 'Auto-fill prevents phishing: a password manager will not fill credentials on a lookalike phishing domain.',
    managerFeature: 'Feature',
    managerLook: 'What to Look For',
    managerFeat1: 'Zero-knowledge architecture',
    managerFeat1Desc: 'The service cannot read your passwords. Everything is encrypted locally with your master password.',
    managerFeat2: 'Cross-platform sync',
    managerFeat2Desc: 'Works on all your devices (desktop, mobile, browser extension) with seamless syncing.',
    managerFeat3: 'Breach monitoring',
    managerFeat3Desc: 'Alerts you when a stored password appears in a data breach.',
    managerFeat4: 'Secure password generation',
    managerFeat4Desc: 'Built-in generator for random passwords and passphrases with configurable length and character sets.',
    managerFeat5: 'Emergency access',
    managerFeat5Desc: 'Allows a trusted contact to access your vault if you are incapacitated.',
    managerFeat6: 'Open source / audited',
    managerFeat6Desc: 'Code is publicly reviewable and has been independently audited by security firms.',
    managerTip: 'Master password tip: Your password manager\'s master password is the one password you MUST memorize. Use a 5-6 word Diceware passphrase (77+ bits of entropy). Write it down and store it in a physical safe until you have memorized it. Do NOT store it digitally.',
    managerDeveloper: 'For developers building applications: Do not fight password managers. Ensure your login forms use standard HTML input types (<input type="password">) and autocomplete attributes (autocomplete="current-password" for login, autocomplete="new-password" for registration). Never disable paste on password fields.',

    faqTitle: '11. Frequently Asked Questions',
    faq1q: 'Is an 8-character password still acceptable in 2025?',
    faq1a: 'Technically, NIST SP 800-63B sets 8 characters as the absolute minimum for user-chosen memorized secrets. However, most modern frameworks (PCI-DSS v4.0, Microsoft, Google) have moved to 12 characters as the minimum. An 8-character password has only about 52 bits of entropy even with full ASCII, which provides marginal security against offline attacks with modern hardware. We recommend 12 characters as the minimum for any new application in 2025.',
    faq2q: 'Should I still require special characters in passwords?',
    faq2a: 'No. NIST explicitly states that verifiers SHALL NOT impose composition rules requiring specific character types. These rules lead to predictable patterns ("Password1!") and add friction for users without meaningfully improving security. Instead, enforce a minimum length of 12+ characters and check against breach databases. Allow users to include any characters they want, but do not require specific types.',
    faq3q: 'How often should users be forced to change their passwords?',
    faq3a: 'Never, unless there is evidence of a compromise. NIST SP 800-63B states that verifiers SHALL NOT require periodic password changes. Research consistently shows that forced rotation leads to weaker passwords (predictable mutations) and security fatigue. Passwords should only be changed when there is a specific reason: a known breach, suspicious account activity, or the user voluntarily wants to change it.',
    faq4q: 'What is the best password hashing algorithm to use in 2025?',
    faq4a: 'Argon2id is the current gold standard, recommended by OWASP as the primary choice. Configure it with at least 19 MiB of memory (m=19456), 2 iterations (t=2), and 1 thread (p=1). If Argon2id is not available in your framework, use bcrypt with a cost factor of 12 or higher. Never use MD5, SHA-1, or SHA-256 for password storage — these are general-purpose hash functions, not password hashing algorithms.',
    faq5q: 'Are passkeys going to replace passwords entirely?',
    faq5a: 'Passkeys (based on FIDO2/WebAuthn) are a significant advancement in authentication and are being adopted by major platforms (Apple, Google, Microsoft). They eliminate passwords entirely by using public-key cryptography tied to a device. However, passwords will coexist with passkeys for years to come. Many services still require password-based authentication as a fallback, and passkey support is not yet universal. For now, implement passkey support alongside strong password policies rather than replacing one with the other.',
    faq6q: 'How do I convince my organization to adopt NIST guidelines?',
    faq6a: 'Present the evidence: (1) NIST is the definitive authority on security standards in the US and is widely respected globally. (2) Research from Carnegie Mellon, Google, and Microsoft confirms that traditional password rules reduce security. (3) The old rules increase support costs (password resets are the #1 help desk call). (4) Major companies (Apple, Google, Microsoft) have already adopted these guidelines. (5) PCI-DSS v4.0 removed the mandatory rotation requirement when MFA is used, showing industry convergence. Frame it as a cost reduction and security improvement, not just a policy change.',
  },
  zh: {
    title: '2025 年密码强度要求：NIST 指南与最佳实践',
    intro: '近年来，密码策略经历了根本性的转变。旧规则 — 强制特殊字符、强制 90 天轮换、安全问题 — 已被 NIST（美国国家标准与技术研究院）正式废弃。取而代之的是基于证据的新方法，重点关注长度、泄露列表检查和多因素认证。本综合指南涵盖了 2025 年现代密码要求的所有知识，从最新的 NIST SP 800-63B 指南到实际实施策略。',

    nistTitle: '1. NIST SP 800-63B：发生了什么变化',
    nistDesc: 'NIST 特别出版物 800-63B（数字身份指南：认证和生命周期管理）于 2017 年首次修订，并在 2024 年持续更新。它从根本上改变了组织应该如何思考密码安全。关键洞察：大多数传统密码规则使密码对人类更难记忆，但对攻击者来说并没有明显增加破解难度。',
    nistChange1Title: '不再强制轮换',
    nistChange1Desc: 'NIST 明确指出，验证方不得要求定期更改密码，除非有证据表明密码已泄露。研究表明，强制轮换导致可预测的模式：用户附加递增数字（Password1、Password2、Password3）或做出攻击者容易猜到的最小更改。未泄露的强密码不会随时间变弱。',
    nistChange2Title: '不再有组合规则',
    nistChange2Desc: 'NIST 取消了对特定字符类型（大写、小写、数字、特殊字符）的要求。这些规则导致了可预测的模式，如 "Password1!" — 满足所有传统复杂性要求，但极易被猜到。NIST 转而强调长度和已知泄露密码的检查。',
    nistChange3Title: '不再使用密码提示或基于知识的认证',
    nistChange3Desc: '诸如"你母亲的娘家姓是什么？"之类的安全问题不再被接受。这些信息通常可以公开获取或容易猜到。NIST 要求验证方不得使用基于知识的认证（KBA）进行验证。',
    nistChange4Title: '必须检查泄露列表',
    nistChange4Desc: '当用户设置或更改密码时，NIST 要求将密码与常用、预期或已泄露值列表进行比较。这包括来自先前泄露数据库的密码、字典单词、重复或顺序字符，以及上下文特定的词（如服务名称或用户名）。',

    lengthTitle: '2. 最小长度：8 位已过时，12-16 位是新标准',
    lengthDesc: 'NIST SP 800-63B 要求用户选择的密码最少 8 个字符，但安全专家和现代框架已经远远超过这个底线。数学现实很简单：每增加一个字符，攻击者必须覆盖的搜索空间就呈指数级增长。',
    lengthTable: '以下是在假设 95 个可打印 ASCII 字符且攻击者以每秒 100 亿次尝试（现代 GPU 集群对快速哈希）进行暴力破解时，密码长度如何影响暴力破解时间：',
    lengthCol1: '密码长度',
    lengthCol2: '可能的组合数',
    lengthCol3: '暴力破解时间',
    lengthCol4: '评级',
    lengthRow1: ['6 字符', '95^6 = 7350 亿', '~1.2 分钟', '瞬间可破解'],
    lengthRow2: ['8 字符', '95^8 = 6.6 千万亿', '~7.6 天', '2025 年已太弱'],
    lengthRow3: ['10 字符', '95^10 = 59.9 百京', '~190 年', '最低可接受'],
    lengthRow4: ['12 字符', '95^12 = 540 十垓', '~170 万年', '良好'],
    lengthRow5: ['16 字符', '95^16 = 44 涧', '~139 万亿年', '优秀'],
    lengthRow6: ['20 字符', '95^20 = 3.6 x 10^39', '~11.4 x 10^21 年', '极致（但很好）'],
    lengthNote: '重要：这些计算假设使用 SHA-256 等快速哈希。使用 Argon2id 等适当的密码哈希算法（将攻击者速度降低到约每秒 1,000 次哈希），即使 8 字符的密码也需要更长时间。然而，长度仍然是对抗暴力破解攻击最有效的防御。',
    lengthRecommend: '各组织的现代建议：',
    lengthNIST: 'NIST SP 800-63B：最少 8 字符（但建议允许最多 64 字符以上）',
    lengthOWASP: 'OWASP：最少 8 字符，建议 12 字符以上',
    lengthPCI: 'PCI-DSS v4.0：最少 12 字符（从 v3.2 的 7 字符提高）',
    lengthMS: 'Microsoft：Azure AD 最少 12 字符',
    lengthGoogle: 'Google：最少 8 字符，建议 12 字符以上',
    lengthBest: '2025 年最佳实践：将最小长度设为 12 字符。允许（并鼓励）64 字符或更多。永远不要截断密码。',

    recommendsTitle: '3. NIST 推荐什么：允许所有字符、检查泄露列表、无提示',
    recommendsDesc: 'NIST 指南采取了与传统密码策略根本不同的方法。它们不是让密码难以创建，而是专注于让密码难以猜测。',
    rec1Title: '允许所有字符',
    rec1Desc: '验证方应接受所有可打印 ASCII 字符、空格字符和所有 Unicode 字符（包括表情符号）。不得有限制哪些字符可以出现在何处的规则。这使得密码短语、非英语密码和创造性密码构造成为可能。',
    rec2Title: '支持长密码',
    rec2Desc: '验证方应允许密码长度至少 64 个字符。没有理由将上限设置在此以下。应通过 UI 设计鼓励更长的密码 — 显示奖励长度而非复杂性的密码强度指示器。',
    rec3Title: '检查泄露数据库',
    rec3Desc: '当用户创建或更改密码时，将其与已知泄露密码列表进行比较。如果密码出现在泄露数据库中，拒绝它并解释原因。Have I Been Pwned API 提供了一种免费的、保护隐私的方式，使用 k-匿名性来实现这一点。',
    rec4Title: '不截断',
    rec4Desc: '验证方不得截断密码。用户输入的每个字符都必须成为存储哈希的一部分。Bcrypt 有 72 字节的限制 — 如果使用 bcrypt，在传递给 bcrypt 之前先用 SHA-256 对密码进行预哈希。',
    rec5Title: '无提示或恢复问题',
    rec5Desc: '验证方不得使用密码提示、安全问题或基于知识的认证。这些提供了削弱密码安全性的攻击向量。改用基于电子邮件或基于 MFA 的账户恢复。',
    rec6Title: '显示密码选项',
    rec6Desc: '验证方应允许用户在输入时临时显示（取消遮蔽）密码。这减少了隐藏输入导致的错误，帮助用户正确创建和输入长而复杂的密码。',

    removedTitle: '4. NIST 移除了什么：强制特殊字符、定期过期、安全问题',
    removedDesc: '理解被移除的内容与理解被添加的内容同样重要。每个被移除的要求都基于研究证明是错误的假设。',
    removed1Title: '强制特殊字符',
    removed1Desc: '要求至少包含一个大写字母、一个小写字母、一个数字和一个特殊字符的旧要求导致了完全可预测的模式。"Password1!" 满足所有传统复杂性规则，却是最常见的泄露密码之一。用户绝大多数将大写字母放在首位、数字放在末尾附近、特殊字符放在最后。攻击者知道这一点并据此优化破解策略。',
    removed2Title: '定期密码过期',
    removed2Desc: '强制用户每 30、60 或 90 天更改密码会导致安全疲劳和可预测的密码变异。卡内基梅隆大学的研究发现，被迫更改密码的用户选择的密码在统计上与之前的密码相似，使其容易受到定向猜测攻击。NIST 现在说：仅在有泄露证据时才更改密码。',
    removed3Title: '安全问题',
    removed3Desc: '安全问题从根本上就是有缺陷的。"你母亲的娘家姓是什么？"或"你出生在哪个城市？"等问题的答案通常可以通过社交媒体、公共记录或数据泄露公开获取。即使是"秘密"问题，如"你最喜欢的电影是什么？"也有令人惊讶的小答案空间。Google 的研究表明，19.7% 的英语使用者会对"你最喜欢的食物是什么？"回答"pizza"。',
    removed4Title: '仅 SMS 的双因素认证',
    removed4Desc: '虽然 NIST 没有完全移除 SMS 2FA，但由于已知漏洞（SIM 卡交换、SS7 协议攻击、对运营商员工的社会工程），它被归类为"受限"认证方式。NIST 建议使用基于应用的 TOTP 或硬件安全密钥。',
    removedSummary: '模式很清楚：NIST 移除了那些在给合法用户增加摩擦的同时制造虚假安全感的要求。每个被移除的规则都被实际改善安全性的循证指导所取代。',

    entropyTitle: '5. 熵计算器：如何以比特为单位估计密码强度',
    entropyDesc: '密码熵以比特为单位衡量密码的不可预测性。更高的熵意味着密码更难猜测。熵的计算公式为：H = log2(R^L)，其中 R 是字符池的大小，L 是密码长度。',
    entropyPoolTitle: '字符池大小',
    entropyPool: '字符池',
    entropyPoolSize: '大小 (R)',
    entropyExample: '示例',
    entropyPoolDigits: '仅数字 (0-9)',
    entropyPoolLower: '小写字母 (a-z)',
    entropyPoolUpper: '大小写字母 (A-Za-z)',
    entropyPoolAlphaNum: '字母数字 (A-Za-z0-9)',
    entropyPoolFull: '完整可打印 ASCII',
    entropyPoolDiceware: 'Diceware 词表',
    entropyCalcTitle: '常见密码类型的熵计算',
    entropyCalcType: '密码类型',
    entropyCalcLength: '长度',
    entropyCalcFormula: '熵计算公式',
    entropyCalcBits: '熵（比特）',
    entropyCalcStrength: '强度',
    entropyCalcRow1: ['4 位 PIN', '4', 'log2(10^4)', '13.3 比特', '非常弱'],
    entropyCalcRow2: ['6 字符小写', '6', 'log2(26^6)', '28.2 比特', '弱'],
    entropyCalcRow3: ['8 字符混合大小写+数字', '8', 'log2(62^8)', '47.6 比特', '中等'],
    entropyCalcRow4: ['12 字符完整 ASCII', '12', 'log2(95^12)', '78.8 比特', '强'],
    entropyCalcRow5: ['16 字符完整 ASCII', '16', 'log2(95^16)', '105.1 比特', '非常强'],
    entropyCalcRow6: ['4 词密码短语 (Diceware)', '4 个词', 'log2(7776^4)', '51.7 比特', '中等'],
    entropyCalcRow7: ['6 词密码短语 (Diceware)', '6 个词', 'log2(7776^6)', '77.5 比特', '强'],
    entropyCalcRow8: ['8 词密码短语 (Diceware)', '8 个词', 'log2(7776^8)', '103.4 比特', '非常强'],
    entropyNote: '注意：这些计算假设密码是真正随机生成的。人类选择的密码有效熵要低得多，因为人类是可预测的 — 他们使用字典词、名字、日期和常见替换（a→@、e→3）。仅检查长度和字符类别的密码强度计会大大高估人类选择密码的熵。',
    entropyRecommend: '2025 年目标熵级别：',
    entropyRec1: '在线攻击（限速）：有账户锁定的情况下 30+ 比特就足够',
    entropyRec2: '离线攻击（被盗哈希，快速哈希）：至少 60+ 比特',
    entropyRec3: '离线攻击（被盗哈希，Argon2id）：40+ 比特可以接受',
    entropyRec4: '高安全账户：建议 80+ 比特',

    comparisonTitle: '6. 对比表：NIST vs OWASP vs PCI-DSS vs 旧标准',
    comparisonDesc: '不同的标准和框架有不同的要求。以下是截至 2025 年的比较：',
    compFeature: '要求',
    compNIST: 'NIST SP 800-63B (2024)',
    compOWASP: 'OWASP ASVS v4.0',
    compPCI: 'PCI-DSS v4.0',
    compOld: '传统（2017 年前）',
    compMinLen: '最小长度',
    compMinLenNIST: '8 字符',
    compMinLenOWASP: '8 字符（建议 12+）',
    compMinLenPCI: '12 字符',
    compMinLenOld: '6-8 字符',
    compMaxLen: '最大长度',
    compMaxLenNIST: '64+ 字符',
    compMaxLenOWASP: '128+ 字符',
    compMaxLenPCI: '未指定',
    compMaxLenOld: '通常 16-20 字符',
    compComplexity: '复杂性规则',
    compComplexityNIST: '不得要求',
    compComplexityOWASP: '不要求',
    compComplexityPCI: '数字 + 字母',
    compComplexityOld: '大写 + 小写 + 数字 + 特殊字符',
    compRotation: '强制轮换',
    compRotationNIST: '不得要求',
    compRotationOWASP: '不建议',
    compRotationPCI: '每 90 天（无 MFA 时）',
    compRotationOld: '每 30-90 天',
    compBreach: '泄露列表检查',
    compBreachNIST: '必须检查',
    compBreachOWASP: '必需',
    compBreachPCI: '不要求',
    compBreachOld: '不要求',
    compMFA: 'MFA',
    compMFANIST: 'AAL2+ 必需',
    compMFAOWASP: 'Level 2+ 必需',
    compMFAPCI: '管理员访问必需',
    compMFAOld: '可选',
    compHints: '密码提示',
    compHintsNIST: '不得使用',
    compHintsOWASP: '禁止',
    compHintsPCI: '未涉及',
    compHintsOld: '常用',
    compHash: '密码哈希',
    compHashNIST: '仅限批准的算法',
    compHashOWASP: 'Argon2id、bcrypt、scrypt',
    compHashPCI: '强单向哈希',
    compHashOld: 'MD5 或 SHA-1 常见',
    compUnicode: 'Unicode 支持',
    compUnicodeNIST: '必须接受',
    compUnicodeOWASP: '必需',
    compUnicodePCI: '未涉及',
    compUnicodeOld: '通常仅 ASCII',
    compNote: '关键要点：NIST 以最现代、基于证据的方法引领潮流。PCI-DSS v4.0 仍然要求复杂性规则和定期轮换（除非使用 MFA），反映了其对基于研究建议的较慢采纳。如果你只能遵循一个标准，选择 NIST SP 800-63B。',

    passphraseTitle: '7. 密码短语 vs 密码：为什么 "correct horse battery staple" 胜出',
    passphraseDesc: '著名的 XKCD 漫画（#936）有力地支持了密码短语优于传统密码的观点。数学支持这一点：从 7,776 个词的 Diceware 列表中随机选择的 4 个词的密码短语具有 51.7 比特的熵 — 与随机的 8 字符混合大小写字母数字密码相当 — 同时更容易记忆。',
    passCompTitle: '密码短语与传统密码比较',
    passCompType: '类型',
    passCompExample: '示例',
    passCompEntropy: '熵',
    passCompMemorability: '可记忆性',
    passCompTyping: '输入便捷性',
    passCompRow1: ['传统复杂密码', 'j7#Kp!2x', '~52 比特', '非常难', '慢、易出错'],
    passCompRow2: ['4 词 Diceware', 'correct horse battery staple', '~52 比特', '容易', '快速、自然'],
    passCompRow3: ['6 词 Diceware', 'atlas usable flock dizzy clout snare', '~78 比特', '中等', '快速、自然'],
    passCompRow4: ['8 词 Diceware', 'embody quote cider clap virus gag yoyo wheat', '~103 比特', '较难', '快速、自然'],
    passWhyBetter: '密码短语更好的原因：',
    passReason1: '相等或更大的熵：4 个词的密码短语在熵方面与 8 字符的随机密码相当。6 个词的密码短语超过大多数传统密码。',
    passReason2: '更容易记忆：人类更擅长记住词语序列而非随机字符。密码短语创造了心理图像。',
    passReason3: '更容易输入：特别是在移动设备上，输入单词比在字符类型之间切换更快且更不容易出错。',
    passReason4: '抵抗肩窥：一长串单词比短的随机字符串更难从短暂一瞥中记住。',
    passReason5: '自然很长：即使 4 个词的密码短语通常也有 20+ 字符，提供了对暴力破解攻击的出色保护。',
    passWarning: '警告：密码短语的词语必须是随机选择的，而不是由用户选择的。用户选择的短语如 "iloveyouforever" 或 "letmeinplease" 的熵极低，因为攻击者知道常见短语。使用 Diceware 词表配合实际骰子或加密安全的随机数生成器。',
    passDiceware: '如何生成 Diceware 密码短语：',
    passDice1: '获取一个 Diceware 词表（7,776 个词，每个对应一个 5 位骰子数）。',
    passDice2: '为每个需要的词掷 5 个骰子（或 1 个骰子掷 5 次）。',
    passDice3: '在词表中查找每个 5 位数字。',
    passDice4: '用空格组合这些词。这就是你的密码短语。',
    passDice5: '对于大多数用途，5-6 个词提供出色的安全性（64.6 - 77.5 比特）。',

    implementTitle: '8. 实施密码策略：Bcrypt 成本、速率限制、MFA',
    implementDesc: '了解指南是一回事；正确实施是另一回事。以下是在 2025 年实施符合 NIST 标准的现代密码策略的实用清单。',
    implHash: '密码哈希',
    implHashDesc: '选择 Argon2id 作为主要哈希算法。如果 Argon2id 不可用，使用成本因子 12 或更高的 bcrypt。在生产硬件上目标每次哈希 200-500ms。永远不要使用 MD5、SHA-1、SHA-256 或任何快速哈希函数进行密码存储。',
    implRate: '速率限制',
    implRateDesc: '在认证端点实施速率限制以防止在线暴力破解攻击。在 5-10 次失败尝试后，引入渐进延迟或临时账户锁定。在 3 次失败尝试后使用 CAPTCHA。实施基于 IP 的速率限制（例如每个 IP 每小时 100 次尝试）和基于账户的速率限制（例如每个账户每 15 分钟 10 次尝试）。',
    implMFA: '多因素认证 (MFA)',
    implMFADesc: 'MFA 是对抗基于凭证攻击最有效的单一防御。即使攻击者获得了密码（通过网络钓鱼、泄露重用或暴力破解），MFA 也能阻止未授权访问。优先选择基于应用的 TOTP（Google Authenticator、Authy）或硬件密钥（YubiKey、Passkeys），而非基于 SMS 的 2FA。',
    implValidation: '服务端验证清单',
    implVal1: '最小长度：12 字符（NIST 绝对最低 8 字符）',
    implVal2: '最大长度：64+ 字符（永不截断）',
    implVal3: '接受所有 Unicode 字符，包括空格和表情符号',
    implVal4: '检查泄露数据库（Have I Been Pwned API）',
    implVal5: '拒绝与用户名、电子邮件或服务名匹配的密码',
    implVal6: '拒绝来自黑名单的常见密码（最常见的 10 万个）',
    implVal7: '不要求特定字符类型',
    implVal8: '不强制定期密码更改',
    implVal9: '显示奖励长度的密码强度指示器',
    implVal10: '提供"显示密码"切换',
    implCost: 'Bcrypt / Argon2id 成本调优',
    implCostDesc: '成本参数应根据你的特定硬件进行调优。在生产服务器上运行基准测试，选择使每次哈希耗时 200-500ms 的成本。这在用户体验（登录延迟）和攻击者成本之间提供了良好的平衡。',

    breachTitle: '9. 检查泄露数据库：Have I Been Pwned API、k-匿名性',
    breachDesc: 'NIST 最具影响力的要求之一是检查密码是否在已知泄露数据库中。Have I Been Pwned (HIBP) 密码 API 使用一种称为 k-匿名性的技术，使这一过程既实用又保护隐私。',
    breachHow: 'k-匿名性如何工作',
    breachHowDesc: 'HIBP 密码 API 从不查看实际密码甚至完整哈希。相反，它使用基于 SHA-1 哈希前 5 个字符的范围搜索：',
    breachStep1: '用 SHA-1 对密码进行哈希（仅用于查找，不用于存储）。',
    breachStep2: '仅将十六进制编码哈希的前 5 个字符发送到 HIBP API。',
    breachStep3: 'API 返回所有匹配 5 字符前缀的哈希后缀（通常 500-800 个结果）。',
    breachStep4: '在本地将完整哈希与返回的后缀进行比较。',
    breachStep5: '如果找到匹配，则该密码已在泄露中出现。拒绝它。',
    breachPrivacy: '隐私保证：API 只看到匹配数百个不同密码的 5 字符哈希前缀。它永远不会知道检查的是哪个具体密码。完整的哈希比较完全在你的服务器上进行。',
    breachStats: '截至 2025 年，HIBP 密码数据库包含超过 9 亿个唯一的已泄露密码。如果用户尝试设置出现在此列表中的密码，应该用清晰的解释拒绝它。',
    breachAlternatives: 'HIBP 的替代方案',
    breachAlt1: '自托管：下载完整的 HIBP 密码哈希文件（压缩约 35GB）并在本地查询。消除了外部 API 依赖，但需要存储和更新管理。',
    breachAlt2: 'Cloudflare：作为其 WAF 的一部分提供免费的泄露凭证检查。对于 Cloudflare 后面的站点，无需代码更改即可自动工作。',
    breachAlt3: '自定义黑名单：维护你自己的最常见 10 万个密码列表。不如 HIBP 全面，但实施更简单，零外部依赖。',

    managerTitle: '10. 密码管理器推荐',
    managerDesc: '随着密码变得更长且更独特（从不在站点间重复使用），密码管理器不再是可选的 — 它们是必需的。密码管理器为每个账户生成、存储和自动填充强大的唯一密码。',
    managerWhy: '为什么密码管理器至关重要：',
    managerReason1: '普通人有 100 多个在线账户。没有人能记住 100 个独特的强密码。',
    managerReason2: '密码重用是基于凭证泄露的首要原因。密码管理器完全消除了重用。',
    managerReason3: '密码管理器生成具有最大熵的真正随机密码，而非人类可预测的模式。',
    managerReason4: '自动填充防止网络钓鱼：密码管理器不会在相似的钓鱼域名上填充凭证。',
    managerFeature: '功能',
    managerLook: '选择标准',
    managerFeat1: '零知识架构',
    managerFeat1Desc: '服务无法读取你的密码。所有内容都使用你的主密码在本地加密。',
    managerFeat2: '跨平台同步',
    managerFeat2Desc: '在所有设备（桌面、移动、浏览器扩展）上运行，无缝同步。',
    managerFeat3: '泄露监控',
    managerFeat3Desc: '当存储的密码出现在数据泄露中时发出警告。',
    managerFeat4: '安全密码生成',
    managerFeat4Desc: '内置随机密码和密码短语生成器，可配置长度和字符集。',
    managerFeat5: '紧急访问',
    managerFeat5Desc: '允许受信任的联系人在你丧失能力时访问你的保管库。',
    managerFeat6: '开源/已审计',
    managerFeat6Desc: '代码可公开审查，并已由安全公司进行独立审计。',
    managerTip: '主密码提示：你的密码管理器的主密码是你必须记住的唯一密码。使用 5-6 个词的 Diceware 密码短语（77+ 比特熵）。写下来并存放在实体保险箱中，直到你记住为止。不要以数字方式存储它。',
    managerDeveloper: '对于开发应用的开发者：不要对抗密码管理器。确保你的登录表单使用标准 HTML 输入类型（<input type="password">）和 autocomplete 属性（登录用 autocomplete="current-password"，注册用 autocomplete="new-password"）。永远不要禁用密码字段的粘贴功能。',

    faqTitle: '11. 常见问题',
    faq1q: '2025 年 8 字符密码还可以接受吗？',
    faq1a: '从技术上讲，NIST SP 800-63B 将 8 字符设为用户选择的记忆密码的绝对最低要求。然而，大多数现代框架（PCI-DSS v4.0、Microsoft、Google）已将 12 字符作为最低要求。即使使用完整 ASCII，8 字符密码也只有约 52 比特的熵，对于使用现代硬件的离线攻击来说安全性有限。我们建议 2025 年任何新应用的最低要求为 12 字符。',
    faq2q: '我还应该要求密码中包含特殊字符吗？',
    faq2a: '不应该。NIST 明确指出验证方不得施加要求特定字符类型的组合规则。这些规则导致可预测的模式（"Password1!"），给用户增加摩擦而不会有意义地提高安全性。相反，强制执行 12 字符以上的最小长度并检查泄露数据库。允许用户包含任何他们想要的字符，但不要求特定类型。',
    faq3q: '应该多久强制用户更改一次密码？',
    faq3a: '除非有泄露证据，否则永远不要。NIST SP 800-63B 指出验证方不得要求定期密码更改。研究一致表明，强制轮换导致更弱的密码（可预测的变异）和安全疲劳。密码只应在有具体原因时更改：已知泄露、可疑账户活动，或用户自愿想要更改。',
    faq4q: '2025 年最好使用哪种密码哈希算法？',
    faq4a: 'Argon2id 是当前的黄金标准，被 OWASP 推荐为首选。配置至少 19 MiB 内存（m=19456）、2 次迭代（t=2）和 1 个线程（p=1）。如果你的框架中没有 Argon2id，使用成本因子 12 或更高的 bcrypt。永远不要使用 MD5、SHA-1 或 SHA-256 进行密码存储 — 这些是通用哈希函数，不是密码哈希算法。',
    faq5q: 'Passkeys 会完全取代密码吗？',
    faq5a: 'Passkeys（基于 FIDO2/WebAuthn）是认证领域的重大进步，正在被主要平台（Apple、Google、Microsoft）采用。它们通过使用绑定到设备的公钥加密完全消除密码。然而，密码将与 passkeys 共存多年。许多服务仍然需要基于密码的认证作为后备，而 passkey 支持尚未普及。目前，应在强密码策略的同时实施 passkey 支持，而不是用一个替换另一个。',
    faq6q: '如何说服我的组织采用 NIST 指南？',
    faq6a: '展示证据：(1) NIST 是美国安全标准的权威机构，在全球受到广泛尊重。(2) 来自卡内基梅隆大学、Google 和 Microsoft 的研究确认传统密码规则降低了安全性。(3) 旧规则增加了支持成本（密码重置是排名第一的帮助台电话）。(4) 主要公司（Apple、Google、Microsoft）已经采用了这些指南。(5) PCI-DSS v4.0 在使用 MFA 时取消了强制轮换要求，显示了行业趋同。将其定义为成本降低和安全改善，而不仅仅是策略变更。',
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

export default function PasswordStrength2025({ lang }: { lang: string }) {
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

      {/* Section 1: NIST SP 800-63B: What Changed */}
      <h2 style={h2Style}>{t.nistTitle}</h2>
      <p style={pStyle}>{t.nistDesc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: t.nistChange1Title, desc: t.nistChange1Desc, color: '#22c55e' },
          { title: t.nistChange2Title, desc: t.nistChange2Desc, color: '#3b82f6' },
          { title: t.nistChange3Title, desc: t.nistChange3Desc, color: '#f59e0b' },
          { title: t.nistChange4Title, desc: t.nistChange4Desc, color: '#8b5cf6' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <pre style={codeStyle}><code>{`# NIST SP 800-63B Summary of Key Changes
┌─────────────────────────────────────────────────────────────────────┐
│  REMOVED (SHALL NOT)              │  ADDED (SHALL / SHOULD)         │
├───────────────────────────────────┼─────────────────────────────────┤
│  Forced periodic rotation         │  Check against breach lists     │
│  Composition rules (upper+lower   │  Minimum 8 chars (12+ better)   │
│    +digit+special)                │  Allow 64+ character passwords  │
│  Password hints                   │  Accept all Unicode + spaces    │
│  Security questions (KBA)         │  Allow paste in password fields │
│  Truncating passwords             │  Offer "show password" option   │
│  SMS as primary 2FA (restricted)  │  Use approved hash algorithms   │
└───────────────────────────────────┴─────────────────────────────────┘`}</code></pre>

      {/* Section 2: Minimum Length */}
      <h2 style={h2Style}>{t.lengthTitle}</h2>
      <p style={pStyle}>{t.lengthDesc}</p>
      <p style={pStyle}>{t.lengthTable}</p>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.lengthCol1}</th>
              <th style={thStyle}>{t.lengthCol2}</th>
              <th style={thStyle}>{t.lengthCol3}</th>
              <th style={thStyle}>{t.lengthCol4}</th>
            </tr>
          </thead>
          <tbody>
            {[t.lengthRow1, t.lengthRow2, t.lengthRow3, t.lengthRow4, t.lengthRow5, t.lengthRow6].map((row, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{(row as string[])[0]}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 13 }}>{(row as string[])[1]}</td>
                <td style={tdStyle}>{(row as string[])[2]}</td>
                <td style={{ ...tdStyle, fontWeight: 600, color: i < 2 ? '#ef4444' : i < 3 ? '#f59e0b' : '#22c55e' }}>{(row as string[])[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>Note:</strong> {t.lengthNote}</p>
      </div>

      <p style={{ ...pStyle, marginTop: 16 }}><strong>{t.lengthRecommend}</strong></p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{t.lengthNIST}</li>
        <li>{t.lengthOWASP}</li>
        <li>{t.lengthPCI}</li>
        <li>{t.lengthMS}</li>
        <li>{t.lengthGoogle}</li>
      </ul>

      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 600 }}>{t.lengthBest}</p>
      </div>

      {/* Section 3: What NIST Recommends */}
      <h2 style={h2Style}>{t.recommendsTitle}</h2>
      <p style={pStyle}>{t.recommendsDesc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: t.rec1Title, desc: t.rec1Desc, color: '#22c55e' },
          { title: t.rec2Title, desc: t.rec2Desc, color: '#3b82f6' },
          { title: t.rec3Title, desc: t.rec3Desc, color: '#8b5cf6' },
          { title: t.rec4Title, desc: t.rec4Desc, color: '#f59e0b' },
          { title: t.rec5Title, desc: t.rec5Desc, color: '#ef4444' },
          { title: t.rec6Title, desc: t.rec6Desc, color: '#06b6d4' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Section 4: What NIST Removed */}
      <h2 style={h2Style}>{t.removedTitle}</h2>
      <p style={pStyle}>{t.removedDesc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        {[
          { title: t.removed1Title, desc: t.removed1Desc, color: '#ef4444' },
          { title: t.removed2Title, desc: t.removed2Desc, color: '#f59e0b' },
          { title: t.removed3Title, desc: t.removed3Desc, color: '#8b5cf6' },
          { title: t.removed4Title, desc: t.removed4Desc, color: '#3b82f6' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 600 }}>{t.removedSummary}</p>
      </div>

      {/* Section 5: Entropy Calculator */}
      <h2 style={h2Style}>{t.entropyTitle}</h2>
      <p style={pStyle}>{t.entropyDesc}</p>

      <pre style={codeStyle}><code>{`# Password Entropy Formula
H = log2(R^L) = L * log2(R)

Where:
  H = Entropy in bits
  R = Size of the character pool
  L = Password length

# Example: 12-character password using full ASCII (95 chars)
H = 12 * log2(95) = 12 * 6.57 = 78.8 bits

# Example: 4-word Diceware passphrase (7776-word list)
H = 4 * log2(7776) = 4 * 12.92 = 51.7 bits`}</code></pre>

      <h3 style={h3Style}>{t.entropyPoolTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.entropyPool}</th>
              <th style={thStyle}>{t.entropyPoolSize}</th>
              <th style={thStyle}>{t.entropyExample}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.entropyPoolDigits, '10', '0-9'],
              [t.entropyPoolLower, '26', 'a-z'],
              [t.entropyPoolUpper, '52', 'A-Za-z'],
              [t.entropyPoolAlphaNum, '62', 'A-Za-z0-9'],
              [t.entropyPoolFull, '95', '!-~, space'],
              [t.entropyPoolDiceware, '7,776', 'correct, horse, battery...'],
            ].map(([pool, size, example], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{pool}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{size}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 13 }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{t.entropyCalcTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.entropyCalcType}</th>
              <th style={thStyle}>{t.entropyCalcLength}</th>
              <th style={thStyle}>{t.entropyCalcFormula}</th>
              <th style={thStyle}>{t.entropyCalcBits}</th>
              <th style={thStyle}>{t.entropyCalcStrength}</th>
            </tr>
          </thead>
          <tbody>
            {[t.entropyCalcRow1, t.entropyCalcRow2, t.entropyCalcRow3, t.entropyCalcRow4, t.entropyCalcRow5, t.entropyCalcRow6, t.entropyCalcRow7, t.entropyCalcRow8].map((row, i) => {
              const r = row as string[];
              const strengthColor = r[4].includes('Very Weak') || r[4].includes('Weak') || r[4].includes('非常弱') || r[4].includes('弱')
                ? '#ef4444'
                : r[4].includes('Moderate') || r[4].includes('中等')
                ? '#f59e0b'
                : '#22c55e';
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{r[0]}</td>
                  <td style={tdStyle}>{r[1]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 13 }}>{r[2]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{r[3]}</td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: strengthColor }}>{r[4]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.entropyNote}</p>
      </div>

      <p style={{ ...pStyle, marginTop: 16 }}><strong>{t.entropyRecommend}</strong></p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.entropyRec1}</li>
        <li>{t.entropyRec2}</li>
        <li>{t.entropyRec3}</li>
        <li>{t.entropyRec4}</li>
      </ul>

      {/* Section 6: Comparison Table */}
      <h2 style={h2Style}>{t.comparisonTitle}</h2>
      <p style={pStyle}>{t.comparisonDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.compFeature}</th>
              <th style={thStyle}>{t.compNIST}</th>
              <th style={thStyle}>{t.compOWASP}</th>
              <th style={thStyle}>{t.compPCI}</th>
              <th style={thStyle}>{t.compOld}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compMinLen, t.compMinLenNIST, t.compMinLenOWASP, t.compMinLenPCI, t.compMinLenOld],
              [t.compMaxLen, t.compMaxLenNIST, t.compMaxLenOWASP, t.compMaxLenPCI, t.compMaxLenOld],
              [t.compComplexity, t.compComplexityNIST, t.compComplexityOWASP, t.compComplexityPCI, t.compComplexityOld],
              [t.compRotation, t.compRotationNIST, t.compRotationOWASP, t.compRotationPCI, t.compRotationOld],
              [t.compBreach, t.compBreachNIST, t.compBreachOWASP, t.compBreachPCI, t.compBreachOld],
              [t.compMFA, t.compMFANIST, t.compMFAOWASP, t.compMFAPCI, t.compMFAOld],
              [t.compHints, t.compHintsNIST, t.compHintsOWASP, t.compHintsPCI, t.compHintsOld],
              [t.compHash, t.compHashNIST, t.compHashOWASP, t.compHashPCI, t.compHashOld],
              [t.compUnicode, t.compUnicodeNIST, t.compUnicodeOWASP, t.compUnicodePCI, t.compUnicodeOld],
            ].map(([feature, nist, owasp, pci, old], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{nist}</td>
                <td style={tdStyle}>{owasp}</td>
                <td style={tdStyle}>{pci}</td>
                <td style={{ ...tdStyle, color: 'var(--text-tertiary)' }}>{old}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 600 }}>{t.compNote}</p>
      </div>

      {/* Section 7: Passphrase vs Password */}
      <h2 style={h2Style}>{t.passphraseTitle}</h2>
      <p style={pStyle}>{t.passphraseDesc}</p>

      <h3 style={h3Style}>{t.passCompTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.passCompType}</th>
              <th style={thStyle}>{t.passCompExample}</th>
              <th style={thStyle}>{t.passCompEntropy}</th>
              <th style={thStyle}>{t.passCompMemorability}</th>
              <th style={thStyle}>{t.passCompTyping}</th>
            </tr>
          </thead>
          <tbody>
            {[t.passCompRow1, t.passCompRow2, t.passCompRow3, t.passCompRow4].map((row, i) => {
              const r = row as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{r[0]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 13 }}>{r[1]}</td>
                  <td style={tdStyle}>{r[2]}</td>
                  <td style={tdStyle}>{r[3]}</td>
                  <td style={tdStyle}>{r[4]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p style={pStyle}><strong>{t.passWhyBetter}</strong></p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{t.passReason1}</li>
        <li>{t.passReason2}</li>
        <li>{t.passReason3}</li>
        <li>{t.passReason4}</li>
        <li>{t.passReason5}</li>
      </ul>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>Warning:</strong> {t.passWarning}</p>
      </div>

      <p style={{ ...pStyle, marginTop: 16 }}><strong>{t.passDiceware}</strong></p>
      <ol style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{t.passDice1}</li>
        <li>{t.passDice2}</li>
        <li>{t.passDice3}</li>
        <li>{t.passDice4}</li>
        <li>{t.passDice5}</li>
      </ol>

      <pre style={codeStyle}><code>{`# Diceware passphrase generation example
$ dice rolls: 1-6-2-3-4  →  "atlas"
$ dice rolls: 5-4-1-1-6  →  "usable"
$ dice rolls: 2-5-3-1-2  →  "flock"
$ dice rolls: 2-1-4-6-5  →  "dizzy"

Passphrase: "atlas usable flock dizzy"
Entropy: 4 * log2(7776) = 51.7 bits
Length: 24 characters (spaces included)

# Compare to traditional password
"j7#Kp!2x" = 8 chars * log2(95) = 52.6 bits
# Same entropy, but much harder to remember and type!`}</code></pre>

      {/* Section 8: Implementing Password Policies */}
      <h2 style={h2Style}>{t.implementTitle}</h2>
      <p style={pStyle}>{t.implementDesc}</p>

      <h3 style={h3Style}>{t.implHash}</h3>
      <p style={pStyle}>{t.implHashDesc}</p>

      <pre style={codeStyle}><code>{`// Argon2id configuration (OWASP recommended)
const argon2 = require('argon2');

const hashConfig = {
  type: argon2.argon2id,
  memoryCost: 19456,    // 19 MiB
  timeCost: 2,          // 2 iterations
  parallelism: 1,       // 1 thread
};

// Hash on registration
const hash = await argon2.hash(password, hashConfig);

// Verify on login
const isValid = await argon2.verify(hash, password);

// ── Bcrypt alternative (if Argon2 unavailable) ──
const bcrypt = require('bcrypt');
const COST_FACTOR = 12;  // Target: 200-500ms

const bcryptHash = await bcrypt.hash(password, COST_FACTOR);
const bcryptValid = await bcrypt.compare(password, bcryptHash);`}</code></pre>

      <h3 style={h3Style}>{t.implRate}</h3>
      <p style={pStyle}>{t.implRateDesc}</p>

      <pre style={codeStyle}><code>{`// Rate limiting example (Express.js with express-rate-limit)
const rateLimit = require('express-rate-limit');

// IP-based rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 10,                     // 10 attempts per IP per window
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Account-based rate limiting (in-memory example)
const accountAttempts = new Map();

async function checkAccountRateLimit(username) {
  const key = username.toLowerCase();
  const attempts = accountAttempts.get(key) || { count: 0, lastAttempt: 0 };

  if (attempts.count >= 5) {
    const cooldown = 15 * 60 * 1000; // 15 minutes
    if (Date.now() - attempts.lastAttempt < cooldown) {
      throw new Error('Account temporarily locked. Try again later.');
    }
    attempts.count = 0; // Reset after cooldown
  }

  return attempts;
}

app.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const attempts = await checkAccountRateLimit(username);

  const isValid = await verifyPassword(username, password);

  if (!isValid) {
    attempts.count++;
    attempts.lastAttempt = Date.now();
    accountAttempts.set(username.toLowerCase(), attempts);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  accountAttempts.delete(username.toLowerCase());
  // ... generate session / JWT
});`}</code></pre>

      <h3 style={h3Style}>{t.implMFA}</h3>
      <p style={pStyle}>{t.implMFADesc}</p>

      <h3 style={h3Style}>{t.implValidation}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        {[t.implVal1, t.implVal2, t.implVal3, t.implVal4, t.implVal5, t.implVal6, t.implVal7, t.implVal8, t.implVal9, t.implVal10].map((val, i) => (
          <div key={i} style={{ padding: '8px 12px', background: i < 6 ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)', borderRadius: 6, border: `1px solid ${i < 6 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: i < 6 ? '#22c55e' : '#ef4444' }}>{i < 6 ? 'DO: ' : 'DO NOT: '}</strong>{val}
          </div>
        ))}
      </div>

      <h3 style={h3Style}>{t.implCost}</h3>
      <p style={pStyle}>{t.implCostDesc}</p>

      <pre style={codeStyle}><code>{`# Benchmarking password hashing on your server
# Goal: 200-500ms per hash

# Node.js benchmark script
const argon2 = require('argon2');
const bcrypt = require('bcrypt');

async function benchmark() {
  const password = 'benchmarkPassword123';

  // Argon2id benchmarks
  for (const mem of [19456, 47104, 65536]) {
    const start = Date.now();
    for (let i = 0; i < 10; i++) {
      await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: mem,
        timeCost: 2,
        parallelism: 1,
      });
    }
    const avg = (Date.now() - start) / 10;
    console.log(\`Argon2id (m=\${mem}): \${avg.toFixed(0)}ms\`);
  }

  // Bcrypt benchmarks
  for (const cost of [10, 11, 12, 13, 14]) {
    const start = Date.now();
    for (let i = 0; i < 10; i++) {
      await bcrypt.hash(password, cost);
    }
    const avg = (Date.now() - start) / 10;
    console.log(\`Bcrypt (cost=\${cost}): \${avg.toFixed(0)}ms\`);
  }
}

benchmark();

# Expected output (varies by hardware):
# Argon2id (m=19456): ~150ms
# Argon2id (m=47104): ~350ms   ← Good target
# Argon2id (m=65536): ~500ms
# Bcrypt (cost=10):   ~75ms
# Bcrypt (cost=11):   ~150ms
# Bcrypt (cost=12):   ~300ms   ← Good target
# Bcrypt (cost=13):   ~600ms
# Bcrypt (cost=14):   ~1200ms`}</code></pre>

      {/* Section 9: Checking Against Breach Databases */}
      <h2 style={h2Style}>{t.breachTitle}</h2>
      <p style={pStyle}>{t.breachDesc}</p>

      <h3 style={h3Style}>{t.breachHow}</h3>
      <p style={pStyle}>{t.breachHowDesc}</p>

      <ol style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{t.breachStep1}</li>
        <li>{t.breachStep2}</li>
        <li>{t.breachStep3}</li>
        <li>{t.breachStep4}</li>
        <li>{t.breachStep5}</li>
      </ol>

      <pre style={codeStyle}><code>{`// Check password against Have I Been Pwned API (Node.js)
const crypto = require('crypto');

async function isPasswordBreached(password) {
  // Step 1: SHA-1 hash the password
  const sha1 = crypto.createHash('sha1')
    .update(password)
    .digest('hex')
    .toUpperCase();

  // Step 2: Split into prefix (5 chars) and suffix
  const prefix = sha1.substring(0, 5);
  const suffix = sha1.substring(5);

  // Step 3: Query the HIBP API with only the prefix
  const response = await fetch(
    \`https://api.pwnedpasswords.com/range/\${prefix}\`,
    {
      headers: { 'Add-Padding': 'true' }  // Prevents response-length analysis
    }
  );
  const text = await response.text();

  // Step 4: Check if our suffix appears in the results
  const lines = text.split('\\n');
  for (const line of lines) {
    const [hashSuffix, count] = line.split(':');
    if (hashSuffix.trim() === suffix) {
      return {
        breached: true,
        count: parseInt(count.trim(), 10),  // How many times seen
      };
    }
  }

  return { breached: false, count: 0 };
}

// Usage in password validation
async function validatePassword(password, username) {
  // Check length
  if (password.length < 12) {
    return { valid: false, reason: 'Password must be at least 12 characters.' };
  }

  // Check against username / email
  if (password.toLowerCase().includes(username.toLowerCase())) {
    return { valid: false, reason: 'Password must not contain your username.' };
  }

  // Check against breach database
  const breach = await isPasswordBreached(password);
  if (breach.breached) {
    return {
      valid: false,
      reason: \`This password has appeared in \${breach.count.toLocaleString()} data breaches. Please choose a different password.\`,
    };
  }

  return { valid: true };
}`}</code></pre>

      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>Privacy:</strong> {t.breachPrivacy}</p>
      </div>

      <p style={pStyle}>{t.breachStats}</p>

      <h3 style={h3Style}>{t.breachAlternatives}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {[
          { desc: t.breachAlt1, color: '#3b82f6' },
          { desc: t.breachAlt2, color: '#22c55e' },
          { desc: t.breachAlt3, color: '#f59e0b' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}`, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {item.desc}
          </div>
        ))}
      </div>

      {/* Section 10: Password Manager Recommendations */}
      <h2 style={h2Style}>{t.managerTitle}</h2>
      <p style={pStyle}>{t.managerDesc}</p>

      <p style={pStyle}><strong>{t.managerWhy}</strong></p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{t.managerReason1}</li>
        <li>{t.managerReason2}</li>
        <li>{t.managerReason3}</li>
        <li>{t.managerReason4}</li>
      </ul>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.managerFeature}</th>
              <th style={thStyle}>{t.managerLook}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.managerFeat1, t.managerFeat1Desc],
              [t.managerFeat2, t.managerFeat2Desc],
              [t.managerFeat3, t.managerFeat3Desc],
              [t.managerFeat4, t.managerFeat4Desc],
              [t.managerFeat5, t.managerFeat5Desc],
              [t.managerFeat6, t.managerFeat6Desc],
            ].map(([feat, desc], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feat}</td>
                <td style={tdStyle}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>Tip:</strong> {t.managerTip}</p>
      </div>

      <div style={{ ...warningBoxStyle, marginTop: 12 }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}><strong>For Developers:</strong> {t.managerDeveloper}</p>
      </div>

      {/* Section 11: FAQ */}
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
