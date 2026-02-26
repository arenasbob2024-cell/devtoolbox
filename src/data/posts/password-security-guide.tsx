import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Password Security Best Practices: How to Create Strong Passwords in 2025',
    intro: 'Creating a <strong>strong password</strong> is your first line of defense against cyber attacks. With data breaches becoming increasingly common, understanding <strong>password security</strong> best practices is essential for protecting your online accounts. This comprehensive guide covers how to generate secure passwords, use a <strong>password generator</strong> effectively, and implement modern password management strategies.',
    linkTool: 'Try our free Password Generator tool →',

    h2_whatIsStrongPassword: 'What is a Strong Password?',
    whatIsStrongPasswordDesc1: 'A <strong>strong password</strong> is one that is difficult for attackers to guess or crack through brute-force methods. According to NIST (National Institute of Standards and Technology) guidelines, password length matters more than complexity.',
    whatIsStrongPasswordDesc2: 'Modern recommendations suggest passwords should be at least 12-16 characters long. A 12-character password with random characters provides significantly more security than an 8-character password with special symbols.',

    h2_characteristics: 'Characteristics of a Secure Password',
    characteristic1: '<strong>Length</strong>: Aim for at least 12 characters. Each additional character exponentially increases the time needed to crack the password.',
    characteristic2: '<strong>Unpredictability</strong>: Avoid dictionary words, names, dates, and common phrases. Use random combinations or passphrases.',
    characteristic3: '<strong>Uniqueness</strong>: Never reuse passwords across different accounts. One breach should not compromise multiple services.',
    characteristic4: '<strong>No personal information</strong>: Avoid birthdays, pet names, addresses, or anything that can be found on social media.',
    characteristic5: '<strong>Randomness</strong>: Use a cryptographically secure password generator rather than creating passwords yourself.',

    h2_passwordGenerator: 'How to Use a Password Generator',
    passwordGeneratorDesc1: 'A <strong>password generator</strong> creates truly random, high-entropy passwords that are virtually impossible to guess. Our free tool generates passwords with configurable length and character sets.',
    passwordGeneratorDesc2: 'When using a password generator:',
    generatorTip1: 'Generate passwords with at least 16 characters for maximum security',
    generatorTip2: 'Include all character types (uppercase, lowercase, numbers, symbols) when the service allows',
    generatorTip3: 'Use passphrases (4-6 random words) for passwords you need to memorize',
    generatorTip4: 'Generate a unique password for every account',

    h2_passphrase: 'Passphrases: The Better Alternative',
    passphraseDesc1: 'A <strong>passphrase</strong> is a sequence of random words that creates a long, memorable password. The famous XKCD comic demonstrated that "correct horse battery staple" is both easier to remember and more secure than "Tr0ub4dor&3".',
    passphraseDesc2: 'A 4-word passphrase from a 7,776-word dictionary provides about 52 bits of entropy, comparable to an 8-character random password. A 6-word passphrase provides approximately 78 bits of entropy, making it extremely secure.',
    passphraseExample: 'Example passphrase: "alpine usable flock dizzy clout snare"',

    h2_passwordManagers: 'Password Managers: Essential for Security',
    passwordManagerDesc1: 'With the average person having 100+ online accounts, remembering unique strong passwords for each is impossible. A <strong>password manager</strong> securely stores and autofills your passwords.',
    passwordManagerDesc2: 'Benefits of password managers:',
    pmBenefit1: 'Generate and store unique, complex passwords for every account',
    pmBenefit2: 'Auto-fill passwords to prevent phishing attacks',
    pmBenefit3: 'Alert you when a password has been compromised in a data breach',
    pmBenefit4: 'Securely share passwords with family members when necessary',
    pmBenefit5: 'Only require you to remember one strong master password',

    h2_commonMistakes: 'Common Password Mistakes to Avoid',
    mistake1: '<strong>Password reuse</strong>: Using the same password across multiple sites means one breach compromises all your accounts.',
    mistake2: '<strong>Simple substitutions</strong>: "P@ssw0rd" is just as easy to crack as "Password" — attackers know these patterns.',
    mistake3: '<strong>Sequential characters</strong>: "123456", "qwerty", and "abcdef" are among the first passwords attackers try.',
    mistake4: '<strong>Short passwords</strong>: Passwords under 8 characters can be cracked in minutes with modern hardware.',
    mistake5: '<strong>Personal information</strong>: Birthdays, anniversaries, and pet names are easily discoverable through social media.',

    h2_breachProtection: 'Protecting Against Data Breaches',
    breachDesc1: 'Even with strong passwords, data breaches can occur. Here is how to protect yourself:',
    breachTip1: '<strong>Enable Two-Factor Authentication (2FA)</strong>: Adds a second layer of security beyond your password',
    breachTip2: '<strong>Use a password manager</strong>: Alerts you when a service you use has been breached',
    breachTip3: '<strong>Check breach databases</strong>: Use "Have I Been Pwned" to see if your credentials have been leaked',
    breachTip4: '<strong>Change passwords immediately</strong>: When you hear about a breach affecting a service you use',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How long should my password be?',
    faq1_a: 'NIST recommends a minimum of 8 characters, but modern security experts suggest at least 12-16 characters. Each additional character exponentially increases the difficulty of cracking your password.',
    faq2_q: 'Should I change my passwords regularly?',
    faq2_a: 'NIST no longer recommends forced periodic password changes unless there is evidence of compromise. Changing passwords too frequently leads to predictable patterns and weaker passwords.',
    faq3_q: 'Are password managers safe?',
    faq3_a: 'Yes, reputable password managers use strong encryption (AES-256) and zero-knowledge architecture. They are significantly safer than reusing passwords or writing them down.',
    faq4_q: 'What makes a password strong?',
    faq4_a: 'Length is the most important factor. A 16-character password of only lowercase letters is stronger than an 8-character password with mixed characters. Add unpredictability by using random characters or words.',
    faq5_q: 'Is it safe to use a browser\'s built-in password manager?',
    faq5_a: 'Browser password managers are better than nothing but lack features of dedicated password managers like breach monitoring, secure sharing, and cross-platform sync. For maximum security, use a dedicated password manager.',

    conclusion: 'Creating and managing <strong>strong passwords</strong> is fundamental to online security. Use a <strong>password generator</strong> to create unique, random passwords for each account, store them in a reputable password manager, and enable two-factor authentication whenever possible. These practices will significantly reduce your risk of falling victim to credential-based attacks.',
    linkToolBottom: 'Generate secure passwords with our free tool →',
  },
  zh: {
    title: '密码安全最佳实践：2025 年如何创建强密码',
    intro: '创建<strong>强密码</strong>是抵御网络攻击的第一道防线。随着数据泄露事件越来越普遍，了解<strong>密码安全</strong>最佳实践对于保护你的在线账户至关重要。本综合指南涵盖如何生成安全密码、有效使用<strong>密码生成器</strong>以及实施现代密码管理策略。',
    linkTool: '立即试用我们的免费密码生成器 →',

    h2_whatIsStrongPassword: '什么是强密码？',
    whatIsStrongPasswordDesc1: '<strong>强密码</strong>是指攻击者难以猜测或通过暴力破解方法破解的密码。根据 NIST（美国国家标准与技术研究院）指南，密码长度比复杂性更重要。',
    whatIsStrongPasswordDesc2: '现代建议密码长度至少为 12-16 个字符。一个 12 字符的随机字符密码比带有特殊符号的 8 字符密码提供更高的安全性。',

    h2_characteristics: '安全密码的特征',
    characteristic1: '<strong>长度</strong>：至少 12 个字符。每增加一个字符，破解密码所需的时间都会呈指数级增长。',
    characteristic2: '<strong>不可预测性</strong>：避免使用字典单词、姓名、日期和常见短语。使用随机组合或密码短语。',
    characteristic3: '<strong>唯一性</strong>：切勿在不同账户间重复使用密码。一次泄露不应危及多个服务。',
    characteristic4: '<strong>不包含个人信息</strong>：避免使用生日、宠物名、地址或任何可以在社交媒体上找到的信息。',
    characteristic5: '<strong>随机性</strong>：使用加密安全的密码生成器，而不是自己创建密码。',

    h2_passwordGenerator: '如何使用密码生成器',
    passwordGeneratorDesc1: '<strong>密码生成器</strong>创建真正随机、高熵的密码，几乎不可能被猜到。我们的免费工具生成可配置长度和字符集的密码。',
    passwordGeneratorDesc2: '使用密码生成器时：',
    generatorTip1: '为获得最大安全性，生成至少 16 个字符的密码',
    generatorTip2: '当服务允许时，包含所有字符类型（大写、小写、数字、符号）',
    generatorTip3: '对于需要记忆的密码，使用密码短语（4-6 个随机词）',
    generatorTip4: '为每个账户生成唯一的密码',

    h2_passphrase: '密码短语：更好的替代方案',
    passphraseDesc1: '<strong>密码短语</strong>是一串随机单词，构成一个长而易记的密码。著名的 XKCD 漫画证明 "correct horse battery staple" 比 "Tr0ub4dor&3" 更容易记住且更安全。',
    passphraseDesc2: '从包含 7,776 个单词的字典中选取的 4 个词的密码短语提供约 52 比特的熵，与 8 字符随机密码相当。6 个词的密码短语提供约 78 比特的熵，使其极其安全。',
    passphraseExample: '密码短语示例："alpine usable flock dizzy clout snare"',

    h2_passwordManagers: '密码管理器：安全必需品',
    passwordManagerDesc1: '普通人有 100 多个在线账户，为每个账户记住唯一的强密码是不可能的。<strong>密码管理器</strong>可以安全地存储和自动填充你的密码。',
    passwordManagerDesc2: '密码管理器的好处：',
    pmBenefit1: '为每个账户生成和存储唯一的复杂密码',
    pmBenefit2: '自动填充密码以防止网络钓鱼攻击',
    pmBenefit3: '当密码在数据泄露中被泄露时提醒你',
    pmBenefit4: '必要时与家人安全共享密码',
    pmBenefit5: '只需要记住一个强主密码',

    h2_commonMistakes: '需要避免的常见密码错误',
    mistake1: '<strong>密码重复使用</strong>：在多个网站使用相同密码意味着一次泄露就会危及你的所有账户。',
    mistake2: '<strong>简单替换</strong>："P@ssw0rd" 和 "Password" 一样容易被破解——攻击者知道这些模式。',
    mistake3: '<strong>连续字符</strong>："123456"、"qwerty" 和 "abcdef" 是攻击者首先尝试的密码。',
    mistake4: '<strong>短密码</strong>：少于 8 个字符的密码可以用现代硬件在几分钟内破解。',
    mistake5: '<strong>个人信息</strong>：生日、纪念日和宠物名可以通过社交媒体轻易发现。',

    h2_breachProtection: '防范数据泄露',
    breachDesc1: '即使有强密码，数据泄露也可能发生。以下是保护自己的方法：',
    breachTip1: '<strong>启用双因素认证 (2FA)</strong>：在密码之外增加第二层安全保护',
    breachTip2: '<strong>使用密码管理器</strong>：当你使用的服务被泄露时提醒你',
    breachTip3: '<strong>检查泄露数据库</strong>：使用 "Have I Been Pwned" 查看你的凭证是否已被泄露',
    breachTip4: '<strong>立即更改密码</strong>：当你听说影响你使用的服务的泄露事件时',

    h2_faq: '常见问题',
    faq1_q: '我的密码应该多长？',
    faq1_a: 'NIST 建议最少 8 个字符，但现代安全专家建议至少 12-16 个字符。每增加一个字符都会指数级增加破解密码的难度。',
    faq2_q: '我应该定期更改密码吗？',
    faq2_a: 'NIST 不再建议强制定期更改密码，除非有泄露证据。过于频繁地更改密码会导致可预测的模式和更弱的密码。',
    faq3_q: '密码管理器安全吗？',
    faq3_a: '是的，信誉良好的密码管理器使用强大的加密（AES-256）和零知识架构。它们比重复使用密码或写下密码要安全得多。',
    faq4_q: '什么使密码变强？',
    faq4_a: '长度是最重要的因素。一个仅包含小写字母的 16 字符密码比混合字符的 8 字符密码更强。通过使用随机字符或单词增加不可预测性。',
    faq5_q: '使用浏览器内置密码管理器安全吗？',
    faq5_a: '浏览器密码管理器比没有好，但缺少专用密码管理器的功能，如泄露监控、安全共享和跨平台同步。为了最大安全性，使用专用密码管理器。',

    conclusion: '创建和管理<strong>强密码</strong>是在线安全的基础。使用<strong>密码生成器</strong>为每个账户创建唯一的随机密码，将它们存储在信誉良好的密码管理器中，并尽可能启用双因素认证。这些做法将显著降低你成为基于凭证攻击受害者的风险。',
    linkToolBottom: '使用我们的免费工具生成安全密码 →',
  },
};

const codeStyle: React.CSSProperties = { 
  background: 'var(--bg-input)', 
  borderRadius: 8, 
  padding: 16, 
  overflowX: 'auto', 
  fontSize: 13, 
  lineHeight: 1.7, 
  fontFamily: 'monospace', 
  color: 'var(--text-primary)', 
  border: '1px solid var(--border-color)', 
  margin: '16px 0' 
};

const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 };
const cardStyle: React.CSSProperties = { padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', marginBottom: 12 };
const ctaStyle: React.CSSProperties = { padding: 20, background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(59,130,246,0.1))', borderRadius: 12, border: '1px solid rgba(34,197,94,0.3)', textAlign: 'center' as const, margin: '24px 0' };
const warningCardStyle: React.CSSProperties = { padding: 16, background: 'rgba(239,68,68,0.08)', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', marginBottom: 12 };

export default function PasswordSecurityGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Password Generator',
    description: 'Free online password generator for creating strong, secure passwords',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }} dangerouslySetInnerHTML={{ __html: s.intro }} />
      
      <div style={ctaStyle}>
        <Link href={`/${lang}/tools/password-generator`} style={{ color: '#22c55e', fontWeight: 700, fontSize: 16 }}>
          {s.linkTool}
        </Link>
      </div>

      {/* Section 1: What is a Strong Password */}
      <h2 style={h2Style}>{s.h2_whatIsStrongPassword}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: s.whatIsStrongPasswordDesc1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: s.whatIsStrongPasswordDesc2 }} />

      <pre style={codeStyle}><code>{`Password Strength Comparison (Time to Crack):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8 chars, mixed:       ~8 hours       ❌ Too weak
10 chars, mixed:      ~3 months      ⚠️  Minimum
12 chars, mixed:      ~300 years     ✅ Good
16 chars, mixed:      ~100 million years ✅ Excellent
20 chars, mixed:      Practically unbreakable 🔒

Note: Assumes 100 billion guesses/second (modern GPU)`}</code></pre>

      {/* Section 2: Characteristics */}
      <h2 style={h2Style}>{s.h2_characteristics}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[s.characteristic1, s.characteristic2, s.characteristic3, s.characteristic4, s.characteristic5].map((char, i) => (
          <div key={i} style={{ ...cardStyle, borderLeft: '4px solid #22c55e', marginBottom: 0 }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: char }} />
          </div>
        ))}
      </div>

      {/* Section 3: Password Generator */}
      <h2 style={h2Style}>{s.h2_passwordGenerator}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: s.passwordGeneratorDesc1 }} />
      <p style={pStyle}>{s.passwordGeneratorDesc2}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li dangerouslySetInnerHTML={{ __html: s.generatorTip1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.generatorTip2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.generatorTip3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.generatorTip4 }} />
      </ul>

      {/* Section 4: Passphrase */}
      <h2 style={h2Style}>{s.h2_passphrase}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: s.passphraseDesc1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: s.passphraseDesc2 }} />
      <div style={{ ...cardStyle, background: 'rgba(59,130,246,0.08)', borderColor: 'rgba(59,130,246,0.3)' }}>
        <p style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{s.passphraseExample}</p>
      </div>

      {/* Section 5: Password Managers */}
      <h2 style={h2Style}>{s.h2_passwordManagers}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: s.passwordManagerDesc1 }} />
      <p style={pStyle}>{s.passwordManagerDesc2}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li dangerouslySetInnerHTML={{ __html: s.pmBenefit1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.pmBenefit2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.pmBenefit3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.pmBenefit4 }} />
        <li dangerouslySetInnerHTML={{ __html: s.pmBenefit5 }} />
      </ul>

      <pre style={codeStyle}><code>{`Popular Password Managers (2025):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1Password     - User-friendly, great for families
Bitwarden     - Open source, free tier available
Dashlane      - Built-in VPN, dark web monitoring
Proton Pass   - Privacy-focused, from Proton
KeePassXC     - Free, open source, local storage`}</code></pre>

      {/* Section 6: Common Mistakes */}
      <h2 style={h2Style}>{s.h2_commonMistakes}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[s.mistake1, s.mistake2, s.mistake3, s.mistake4, s.mistake5].map((mistake, i) => (
          <div key={i} style={{ ...warningCardStyle, marginBottom: 0 }}>
            <p style={{ margin: 0, color: '#ef4444', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: mistake }} />
          </div>
        ))}
      </div>

      <pre style={codeStyle}><code>{`❌ WORST PASSWORDS OF 2024 (Never use these!):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
123456
password
12345678
qwerty
123456789
letmein
1234567
football
iloveyou
admin

Source: SplashData annual password survey`}</code></pre>

      {/* Section 7: Breach Protection */}
      <h2 style={h2Style}>{s.h2_breachProtection}</h2>
      <p style={pStyle}>{s.breachDesc1}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li dangerouslySetInnerHTML={{ __html: s.breachTip1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.breachTip2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.breachTip3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.breachTip4 }} />
      </ul>

      <div style={ctaStyle}>
        <p style={{ margin: '0 0 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{s.linkToolBottom}</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={`/${lang}/tools/password-generator`} style={{ color: '#22c55e', fontWeight: 600 }}>
            Password Generator
          </Link>
          <Link href={`/${lang}/tools/random-string`} style={{ color: '#22c55e', fontWeight: 600 }}>
            Random String Generator
          </Link>
          <Link href={`/${lang}/tools/hash-generator`} style={{ color: '#22c55e', fontWeight: 600 }}>
            Hash Generator
          </Link>
        </div>
      </div>

      {/* Section 8: FAQ */}
      <h2 style={h2Style}>{s.h2_faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {[
          [s.faq1_q, s.faq1_a],
          [s.faq2_q, s.faq2_a],
          [s.faq3_q, s.faq3_a],
          [s.faq4_q, s.faq4_a],
          [s.faq5_q, s.faq5_a],
        ].map(([q, a], i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }} dangerouslySetInnerHTML={{ __html: a }} />
          </div>
        ))}
      </div>

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
    </>
  );
}
