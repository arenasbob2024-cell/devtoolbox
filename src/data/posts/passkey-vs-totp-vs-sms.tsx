'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Passkey vs TOTP vs SMS: Multi-Factor Authentication Comparison',
    intro: 'Passkeys, TOTP (Time-based One-Time Passwords), and SMS are three primary methods for multi-factor authentication (MFA). Each offers different security levels, user experience, and implementation complexity. This comparison examines their strengths, weaknesses, and ideal use cases to help you choose the right MFA method.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Passkeys offer the best security and user experience but require modern device support. TOTP is the most widely compatible and cost-effective. SMS is the most accessible but has significant security vulnerabilities. Choose passkeys for maximum security, TOTP for broad compatibility, and SMS only for low-risk scenarios or as a fallback.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Passkeys are phishing-resistant and offer the highest security level',
    takeaway2: 'TOTP works offline and is supported by most authenticator apps',
    takeaway3: 'SMS is vulnerable to SIM swapping and interception attacks',
    takeaway4: 'Passkeys provide the best user experience with biometric authentication',
    takeaway5: 'TOTP is the most cost-effective for organizations',
    takeaway6: 'SMS has the lowest barrier to entry but highest security risk',
    
    whatIsPasskeyTitle: 'What are Passkeys?',
    whatIsPasskeyContent: 'Passkeys are a passwordless authentication method based on FIDO2/WebAuthn standards. They use public-key cryptography with biometrics (Face ID, Touch ID, Windows Hello) or device PINs. Passkeys are stored securely on devices and synced across ecosystems (iCloud Keychain, Google Password Manager). They are phishing-resistant and provide the highest security level.',
    
    whatIsTOTPTitle: 'What is TOTP?',
    whatIsTOTPContent: 'TOTP (Time-based One-Time Password) generates 6-8 digit codes that change every 30 seconds. Based on RFC 6238, it uses a shared secret and current time to generate codes. Popular apps include Google Authenticator, Authy, and 1Password. TOTP works offline and is widely supported across platforms.',
    
    whatIsSMSTitle: 'What is SMS Authentication?',
    whatIsSMSTitleContent: 'SMS authentication sends one-time codes via text message to the user phone number. While convenient and universally accessible, it relies on cellular network security. SMS is vulnerable to SIM swapping attacks, SS7 protocol vulnerabilities, and interception. It should be used as a fallback rather than primary MFA method.',
    
    performanceTitle: 'Security Comparison',
    performanceIntro: 'Comparing security characteristics:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Implementation Examples',
    codeExampleIntro: 'How to implement each MFA method:',
    
    passkeyExampleTitle: 'Passkey Implementation',
    totpExampleTitle: 'TOTP Implementation',
    smsExampleTitle: 'SMS Implementation',
    
    userExperienceTitle: 'User Experience',
    userExperienceIntro: 'Comparison of user journey and friction:',
    
    useCasesTitle: 'Best Use Cases',
    passkeyBestFor: 'Passkeys are Best For:',
    totpBestFor: 'TOTP is Best For:',
    smsBestFor: 'SMS is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'For new implementations, prioritize passkeys for the best security and UX, with TOTP as a fallback. Avoid SMS as a primary method due to security vulnerabilities. Consider your user base: passkeys require modern devices, TOTP needs authenticator apps, while SMS works on any phone. A layered approach offering multiple options often provides the best balance of security and accessibility.',
    
    faq1q: 'Which MFA method is most secure?',
    faq1a: 'Passkeys are the most secure because they are phishing-resistant and use public-key cryptography. The private key never leaves the device, and authentication requires biometric verification or device PIN. TOTP is secure against phishing if users verify the site URL, but codes can be stolen. SMS is least secure due to SIM swapping and interception vulnerabilities.',
    
    faq2q: 'Do passkeys work across devices?',
    faq2a: 'Yes, passkeys sync across devices within the same ecosystem (Apple, Google, Microsoft). iCloud Keychain syncs passkeys across Apple devices, Google Password Manager syncs across Android/Chrome. Cross-ecosystem sync is limited, but you can create passkeys on multiple devices for the same account.',
    
    faq3q: 'Is TOTP still secure in 2024?',
    faq3a: 'TOTP remains secure for most use cases when implemented correctly. It is resistant to replay attacks and works offline. However, it is vulnerable to real-time phishing if users enter codes on fake sites. Using a hardware security key or passkeys provides better protection against sophisticated attacks.',
    
    faq4q: 'Why is SMS considered insecure?',
    faq4a: 'SMS is vulnerable to several attacks: SIM swapping (attackers transfer your number to their SIM), SS7 protocol vulnerabilities (intercepting messages), and malware that reads SMS. NIST deprecated SMS as a primary MFA method in 2016. Use it only as a fallback or for low-risk accounts.',
    
    faq5q: 'What happens if I lose my phone with TOTP?',
    faq5a: 'You need backup codes or account recovery options. Best practices: store backup codes securely, use a cloud-synced authenticator (Authy, 1Password), or register multiple devices. Some services allow multiple TOTP devices for redundancy.',
    
    faq6q: 'Can I use all three methods together?',
    faq6a: 'Yes, many services offer multiple MFA options. You can enable passkeys as primary, TOTP as backup, and SMS as last resort. This provides flexibility and ensures account recovery even if one method fails. However, security is only as strong as the weakest enabled method.',
    
    faq7q: 'Which method has the best user experience?',
    faq7a: 'Passkeys offer the best UX with single-tap authentication using biometrics. No codes to enter, no app switching. TOTP requires opening an app and typing codes. SMS is convenient but requires cellular signal and introduces friction with code entry. Passkeys are the most seamless experience.',
    
    faq8q: 'What is the cost of implementing each method?',
    faq8a: 'TOTP is cheapest (free to implement, users install free apps). Passkeys require WebAuthn implementation effort but no per-user cost. SMS has per-message costs ($0.005-0.05 per SMS) that scale with user base. For large organizations, SMS costs can be significant compared to free alternatives.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Passkey vs TOTP vs SMS：多因素认证对比',
    intro: 'Passkeys、TOTP（基于时间的一次性密码）和 SMS 是三种主要的多因素认证（MFA）方法。每种方法提供不同的安全级别、用户体验和实现复杂性。本比较将考察它们的优势、劣势和理想用例，帮助你选择合适的 MFA 方法。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Passkeys 提供最佳的安全性和用户体验，但需要现代设备支持。TOTP 兼容性最广且最具成本效益。SMS 最易访问但存在重大安全漏洞。为最大安全性选择 passkeys，为广泛兼容性选择 TOTP，SMS 仅用于低风险场景或作为备用。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Passkeys 抗钓鱼攻击，提供最高安全级别',
    takeaway2: 'TOTP 离线工作，被大多数认证器应用支持',
    takeaway3: 'SMS 容易受到 SIM 交换和拦截攻击',
    takeaway4: 'Passkeys 通过生物识别提供最佳用户体验',
    takeaway5: 'TOTP 对组织来说最具成本效益',
    takeaway6: 'SMS 进入门槛最低但安全风险最高',
    
    whatIsPasskeyTitle: '什么是 Passkeys？',
    whatIsPasskeyContent: 'Passkeys 是一种基于 FIDO2/WebAuthn 标准的无密码认证方法。它们使用公钥加密和生物识别（Face ID、Touch ID、Windows Hello）或设备 PIN。Passkeys 安全地存储在设备上并在生态系统内同步（iCloud 钥匙串、Google 密码管理器）。它们抗钓鱼攻击并提供最高安全级别。',
    
    whatIsTOTPTitle: '什么是 TOTP？',
    whatIsTOTPContent: 'TOTP（基于时间的一次性密码）生成每 30 秒变化的 6-8 位数字代码。基于 RFC 6238，它使用共享密钥和当前时间生成代码。流行的应用包括 Google Authenticator、Authy 和 1Password。TOTP 离线工作并广泛支持各平台。',
    
    whatIsSMSTitle: '什么是 SMS 认证？',
    whatIsSMSTitleContent: 'SMS 认证通过短信向用户手机号码发送一次性代码。虽然方便且普遍可访问，但它依赖蜂窝网络安全。SMS 容易受到 SIM 交换攻击、SS7 协议漏洞和拦截。它应该作为备用而不是主要 MFA 方法使用。',
    
    performanceTitle: '安全对比',
    performanceIntro: '比较安全特性：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '实现示例',
    codeExampleIntro: '如何实现每种 MFA 方法：',
    
    passkeyExampleTitle: 'Passkey 实现',
    totpExampleTitle: 'TOTP 实现',
    smsExampleTitle: 'SMS 实现',
    
    userExperienceTitle: '用户体验',
    userExperienceIntro: '用户旅程和摩擦比较：',
    
    useCasesTitle: '最佳用例',
    passkeyBestFor: 'Passkeys 最适合：',
    totpBestFor: 'TOTP 最适合：',
    smsBestFor: 'SMS 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: '对于新实现，优先使用 passkeys 获得最佳安全性和 UX，TOTP 作为备用。避免将 SMS 作为主要方法，因为安全漏洞。考虑你的用户群：passkeys 需要现代设备，TOTP 需要认证器应用，而 SMS 可在任何手机上工作。提供多种选项的分层方法通常提供最佳的安全性和可访问性平衡。',
    
    faq1q: '哪种 MFA 方法最安全？',
    faq1a: 'Passkeys 最安全，因为它们抗钓鱼攻击并使用公钥加密。私钥从不离开设备，认证需要生物识别验证或设备 PIN。如果用户验证站点 URL，TOTP 对钓鱼是安全的，但代码可能被盗。SMS 由于 SIM 交换和拦截漏洞最不安全。',
    
    faq2q: 'Passkeys 可以跨设备工作吗？',
    faq2a: '是的，passkeys 在同一生态系统内跨设备同步（Apple、Google、Microsoft）。iCloud 钥匙串在 Apple 设备间同步 passkeys，Google 密码管理器在 Android/Chrome 间同步。跨生态系统同步有限，但你可以在多个设备上为同一账户创建 passkeys。',
    
    faq3q: 'TOTP 在 2024 年仍然安全吗？',
    faq3a: '如果正确实现，TOTP 对大多数用例仍然安全。它抗重放攻击并离线工作。然而，如果用户在假网站上输入代码，它容易受到实时钓鱼攻击。使用硬件安全密钥或 passkeys 提供更好的防护以抵御复杂攻击。',
    
    faq4q: '为什么 SMS 被认为不安全？',
    faq4a: 'SMS 容易受到多种攻击：SIM 交换（攻击者将你的号码转移到他们的 SIM）、SS7 协议漏洞（拦截消息）和读取 SMS 的恶意软件。NIST 在 2016 年弃用 SMS 作为主要 MFA 方法。仅将其用作备用或低风险账户。',
    
    faq5q: '如果丢失有 TOTP 的手机会怎样？',
    faq5a: '你需要备份代码或账户恢复选项。最佳实践：安全地存储备份代码，使用云同步认证器（Authy、1Password），或注册多个设备。某些服务允许冗余的多个 TOTP 设备。',
    
    faq6q: '我可以同时使用三种方法吗？',
    faq6a: '是的，许多服务提供多种 MFA 选项。你可以启用 passkeys 作为主要方法，TOTP 作为备份，SMS 作为最后手段。这提供了灵活性并确保即使一种方法失败也能账户恢复。然而，安全性仅与启用的最弱方法一样强。',
    
    faq7q: '哪种方法用户体验最好？',
    faq7a: 'Passkeys 通过生物识别提供最佳 UX，单次点击认证。无需输入代码，无需切换应用。TOTP 需要打开应用并输入代码。SMS 方便但需要蜂窝信号并通过代码输入引入摩擦。Passkeys 是最无缝的体验。',
    
    faq8q: '实现每种方法的成本是多少？',
    faq8a: 'TOTP 最便宜（免费实现，用户安装免费应用）。Passkeys 需要 WebAuthn 实现工作但没有每用户成本。SMS 有每条消息成本（每条 SMS $0.005-0.05），随用户群扩展。对于大型组织，SMS 成本可能比免费替代方案显著。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PasskeyVsTOTPVsSMS({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsPasskeyTitle}</h3>
      <p style={pStyle}>{ct.whatIsPasskeyContent}</p>

      <h3 style={h3Style}>{ct.whatIsTOTPTitle}</h3>
      <p style={pStyle}>{ct.whatIsTOTPContent}</p>

      <h3 style={h3Style}>{ct.whatIsSMSTitle}</h3>
      <p style={pStyle}>{ct.whatIsSMSTitleContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Passkeys</th>
              <th style={thStyle}>TOTP</th>
              <th style={thStyle}>SMS</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '安全级别' : 'Security Level', isZh ? '最高' : 'Highest', isZh ? '高' : 'High', isZh ? '低' : 'Low'],
              [isZh ? '抗钓鱼' : 'Phishing Resistant', '✅', '❌', '❌'],
              [isZh ? '离线工作' : 'Works Offline', '✅', '✅', '❌'],
              [isZh ? '需要网络' : 'Network Required', '❌', '❌', '✅'],
              [isZh ? 'SIM 交换风险' : 'SIM Swap Risk', isZh ? '无' : 'None', isZh ? '无' : 'None', isZh ? '高' : 'High'],
              [isZh ? '设备要求' : 'Device Requirements', isZh ? '现代设备' : 'Modern device', isZh ? '智能手机' : 'Smartphone', isZh ? '任何手机' : 'Any phone'],
              [isZh ? '实现成本' : 'Implementation Cost', isZh ? '中等' : 'Medium', isZh ? '低' : 'Low', isZh ? '每条费用' : 'Per-message'],
            ].map(([feature, passkey, totp, sms], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{passkey}</td>
                <td style={tdStyle}>{totp}</td>
                <td style={tdStyle}>{sms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#4285f4' }}>{ct.passkeyExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// WebAuthn Passkey Registration
const registerPasskey = async () => {
  const challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);
  
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge,
      rp: { name: "My App", id: window.location.hostname },
      user: {
        id: new TextEncoder().encode(userId),
        name: userEmail,
        displayName: userName
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },  // ES256
        { type: "public-key", alg: -257 } // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required"
      },
      attestation: "direct"
    }
  });
  
  // Send credential to server for storage
  await fetch(\\u0060/api/register-passkey\\u0060, {
    method: 'POST',
    body: JSON.stringify({
      id: credential.id,
      rawId: Array.from(new Uint8Array(credential.rawId)),
      type: credential.type
    })
  });
};

// WebAuthn Passkey Authentication
const authenticateWithPasskey = async () => {
  const challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);
  
  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge,
      rpId: window.location.hostname,
      userVerification: "required",
      allowCredentials: [] // Empty = any passkey
    }
  });
  
  // Verify assertion with server
  const response = await fetch(\\u0060/api/verify-passkey\\u0060, {
    method: 'POST',
    body: JSON.stringify({
      id: assertion.id,
      rawId: Array.from(new Uint8Array(assertion.rawId)),
      response: {
        clientDataJSON: assertion.response.clientDataJSON,
        authenticatorData: assertion.response.authenticatorData,
        signature: assertion.response.signature,
        userHandle: assertion.response.userHandle
      }
    })
  });
};`}</code></pre>

      <h3 style={{ ...h3Style, color: '#34a853' }}>{ct.totpExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// TOTP Secret Generation (Node.js)
import * as crypto from \\u0060crypto\\u0060;
import * as base32 from \\u0060hi-base32\\u0060;

function generateTOTPSecret(userEmail: string) {
  const buffer = crypto.randomBytes(20);
  const base32Secret = base32.encode(buffer).replace(/=/g, '');
  
  return {
    secret: base32Secret,
    qrCodeUrl: 'otpauth://totp/MyApp:' + userEmail + '?secret=' + base32Secret + '&issuer=MyApp'
  };
}

// TOTP Verification (Node.js)
import * as otpauth from \\u0060otpauth\\u0060;

function verifyTOTP(secret: string, token: string): boolean {
  const totp = new otpauth.TOTP({
    secret: otpauth.Secret.fromBase32(secret),
    digits: 6,
    period: 30,
    algorithm: \\u0060SHA-1\\u0060
  });
  
  // Check current and adjacent windows for clock drift
  const window = 1;
  for (let i = -window; i <= window; i++) {
    const expectedToken = totp.generate({ timestamp: Date.now() + i * 30000 });
    if (expectedToken === token) {
      return true;
    }
  }
  
  return false;
}

// Frontend: Display QR Code
import QRCode from \\u0060qrcode\\u0060;

async function displayQRCode(secret: string, email: string) {
  const url = 'otpauth://totp/MyApp:' + email + '?secret=' + secret + '&issuer=MyApp';
  const qrDataUrl = await QRCode.toDataURL(url);
  
  return (
    <div>
      <img src={qrDataUrl} alt="TOTP QR Code" />
      <p>Or enter manually: {secret}</p>
    </div>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#ea4335' }}>{ct.smsExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// SMS OTP with Twilio (Node.js)
import Twilio from \\u0060twilio\\u0060;

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSMSOTP(phoneNumber: string): Promise<string> {
  // Generate 6-digit code
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP with expiration (e.g., in Redis)
  await redis.setex(\\u0060otp:${phoneNumber}\\u0060, 300, otp);
  
  // Send SMS
  await twilioClient.messages.create({
    body: \\u0060Your verification code is: ${otp}\\u0060,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  });
  
  return otp;
}

async function verifySMSOTP(phoneNumber: string, code: string): Promise<boolean> {
  const storedOTP = await redis.get(\\u0060otp:${phoneNumber}\\u0060);
  
  if (!storedOTP) {
    return false; // Expired or not found
  }
  
  // Rate limiting: prevent brute force
  const attempts = await redis.incr(\\u0060otp:attempts:${phoneNumber}\\u0060);
  if (attempts > 3) {
    await redis.expire(\\u0060otp:attempts:${phoneNumber}\\u0060, 300);
    throw new Error('Too many attempts');
  }
  
  if (storedOTP === code) {
    await redis.del(\\u0060otp:${phoneNumber}\\u0060);
    await redis.del(\\u0060otp:attempts:${phoneNumber}\\u0060);
    return true;
  }
  
  return false;
}

// Frontend usage
const handleSMSLogin = async (phone: string) => {
  // Request OTP
  await fetch(\\u0060/api/send-sms-otp\\u0060, {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: phone })
  });
  
  // User enters code
  const code = await getUserInput();
  
  // Verify
  const response = await fetch(\\u0060/api/verify-sms-otp\\u0060, {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: phone, code })
  });
};`}</code></pre>

      <h2 style={h2Style}>{ct.userExperienceTitle}</h2>
      <p style={pStyle}>{ct.userExperienceIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #4285f4' }}>
          <strong style={{ color: '#4285f4' }}>Passkeys</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '一步认证：点击"使用 Passkey 登录" → 生物识别验证（Face ID/指纹）→ 完成。无需输入代码，无需切换应用。最快最流畅的体验。' : 'One-step authentication: Click "Sign in with Passkey" → Biometric verification (Face ID/Fingerprint) → Done. No code entry, no app switching. Fastest and smoothest experience.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #34a853' }}>
          <strong style={{ color: '#34a853' }}>TOTP</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '多步认证：打开认证器应用 → 找到账户 → 复制 6 位代码 → 切回网站 → 粘贴代码。约 10-15 秒，需要应用切换。' : 'Multi-step authentication: Open authenticator app → Find account → Copy 6-digit code → Switch back to website → Paste code. About 10-15 seconds, requires app switching.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ea4335' }}>
          <strong style={{ color: '#ea4335' }}>SMS</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '等待依赖：请求代码 → 等待短信到达（5-30 秒）→ 查看消息 → 输入代码。依赖网络信号，可能延迟。' : 'Wait-dependent: Request code → Wait for SMS to arrive (5-30 seconds) → View message → Enter code. Dependent on network signal, potential delays.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4285f4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4285f4' }}>{ct.passkeyBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高安全应用' : 'High-security applications'}</li>
            <li>{isZh ? '金融机构' : 'Financial institutions'}</li>
            <li>{isZh ? '企业内部系统' : 'Enterprise internal systems'}</li>
            <li>{isZh ? '面向未来的应用' : 'Future-proof applications'}</li>
            <li>{isZh ? '现代设备用户群' : 'Modern device user base'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #34a853' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#34a853' }}>{ct.totpBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '通用兼容性' : 'Universal compatibility'}</li>
            <li>{isZh ? '离线场景' : 'Offline scenarios'}</li>
            <li>{isZh ? '成本敏感组织' : 'Cost-sensitive organizations'}</li>
            <li>{isZh ? '开发者工具' : 'Developer tools'}</li>
            <li>{isZh ? '现有系统集成' : 'Existing system integration'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ea4335' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ea4335' }}>{ct.smsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '备用认证方法' : 'Fallback authentication'}</li>
            <li>{isZh ? '低风险账户' : 'Low-risk accounts'}</li>
            <li>{isZh ? '非技术用户' : 'Non-technical users'}</li>
            <li>{isZh ? '紧急访问' : 'Emergency access'}</li>
            <li>{isZh ? '功能手机用户' : 'Feature phone users'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a> • {' '}
        <a href={"/" + lang + "/tools/jwt-decoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
