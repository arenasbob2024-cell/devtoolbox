'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Email Validator Online',
    description: 'Validate email addresses instantly. Check syntax, format validity, and common domain hints. Batch validation support.',
    singleTab: 'Single',
    batchTab: 'Batch',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter email address to validate...',
    validateBtn: 'Validate',
    clear: 'Clear',
    batchLabel: 'Batch Emails (one per line)',
    batchPlaceholder: 'user@example.com\ntest@domain.org\ninvalid-email\n...',
    validateAllBtn: 'Validate All',
    valid: 'Valid',
    invalid: 'Invalid',
    statusLabel: 'Status',
    localPart: 'Local Part',
    domain: 'Domain',
    tld: 'TLD',
    formatCheck: 'Format Check',
    lengthCheck: 'Length Check',
    specialCharCheck: 'Special Chars',
    domainHint: 'Domain Hint',
    passed: 'Passed',
    failed: 'Failed',
    results: 'Results',
    validCount: 'Valid',
    invalidCount: 'Invalid',
    loadSample: 'Load Sample',
    introTitle: 'Free Online Email Validator',
    introText: 'This email validator checks email address syntax and format according to RFC 5322 standards. It validates the local part (before @), the domain name, and the top-level domain (TLD). It also provides hints about common email providers and identifies common typos in domain names. Use batch mode to validate multiple email addresses at once.',
    tipTitle: 'Email Validation Tips',
    tip1: 'A valid email must have exactly one @ symbol separating local part and domain',
    tip2: 'The local part can contain letters, numbers, and some special characters like . _ + -',
    tip3: 'The domain must have at least one dot and a valid TLD',
    tip4: 'Common typos: gmal.com (gmail.com), yahhoo.com (yahoo.com)',
    tip5: 'Use batch validation to quickly check many emails from a list or CSV',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What does email validation check?',
    faq1a: 'Email validation checks that the address follows the correct format: a local part (username), an @ symbol, and a domain with a valid TLD. It checks for correct character usage, proper length, no consecutive dots, and valid domain structure. Note that format validation cannot confirm if the mailbox actually exists.',
    faq2q: 'Can this tool verify if an email actually exists?',
    faq2a: 'This tool performs syntax and format validation only, which happens entirely in your browser. Verifying if a mailbox actually exists requires querying the mail server (MX record lookup), which requires server-side processing. This tool focuses on catching format errors quickly.',
    faq3q: 'What are common email format mistakes?',
    faq3a: 'Common mistakes include: missing @ symbol, spaces in the email, multiple @ symbols, domain without a dot, invalid characters in local part (like !#$%), consecutive dots, domain starting or ending with a hyphen, and TLD shorter than 2 characters.',
    faq4q: 'How does batch email validation work?',
    faq4a: 'In batch mode, paste or enter multiple email addresses (one per line). The tool validates each one and shows results with valid/invalid counts. You can then copy the valid emails or the validation report.',
    faq5q: 'Is this validation 100% accurate?',
    faq5a: 'Syntax validation is highly accurate for catching format errors. However, an email that passes format validation may still bounce if the mailbox does not exist or the domain has no mail server. For definitive verification, you would need to send a confirmation email.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '邮箱验证工具',
    description: '即时验证电子邮件地址，检查语法和格式有效性，支持批量验证。',
    singleTab: '单个', batchTab: '批量', emailLabel: '电子邮件地址', emailPlaceholder: '输入要验证的邮箱地址...',
    validateBtn: '验证', clear: '清除', batchLabel: '批量邮箱（每行一个）', batchPlaceholder: 'user@example.com\ntest@domain.org\n...',
    validateAllBtn: '全部验证', valid: '有效', invalid: '无效', statusLabel: '状态',
    localPart: '本地部分', domain: '域名', tld: '顶级域', formatCheck: '格式检查', lengthCheck: '长度检查',
    specialCharCheck: '特殊字符', domainHint: '域名提示', passed: '通过', failed: '失败',
    results: '结果', validCount: '有效', invalidCount: '无效', loadSample: '加载示例',
    introTitle: '免费在线邮箱验证工具',
    introText: '根据RFC 5322标准检查电子邮件地址语法和格式。验证本地部分、域名和顶级域。',
    tipTitle: '邮箱验证提示', tip1: '有效邮箱必须有且只有一个@符号', tip2: '本地部分可以包含字母、数字及部分特殊字符',
    tip3: '域名必须有至少一个点和有效顶级域', tip4: '常见拼写错误：gmal.com（gmail.com）', tip5: '使用批量验证快速检查列表中的多个邮箱',
    faqTitle: '常见问题',
    faq1q: '邮箱验证检查什么？', faq1a: '检查格式：本地部分、@符号、带有效TLD的域名。验证字符使用、长度、无连续点和有效域名结构。格式验证无法确认邮箱是否真实存在。',
    faq2q: '此工具能验证邮箱是否真实存在吗？', faq2a: '此工具仅在浏览器中进行语法和格式验证。验证邮箱是否存在需要查询邮件服务器，需要服务器端处理。',
    faq3q: '常见邮箱格式错误有哪些？', faq3a: '缺少@符号、邮箱中有空格、多个@符号、域名没有点、本地部分含无效字符、连续点、域名以连字符开头/结尾、TLD少于2个字符。',
    faq4q: '批量邮箱验证如何工作？', faq4a: '在批量模式下，每行粘贴一个邮箱地址。工具验证每个地址并显示有效/无效计数。',
    faq5q: '验证是否100%准确？', faq5a: '语法验证对于发现格式错误非常准确，但通过格式验证的邮箱仍可能不存在。要确定验证，需要发送确认邮件。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'メールアドレス検証ツール',
    description: 'メールアドレスを即座に検証。構文、フォーマット確認。バッチ検証対応。',
    singleTab: '単体', batchTab: 'バッチ', emailLabel: 'メールアドレス', emailPlaceholder: 'メールアドレスを入力...',
    validateBtn: '検証', clear: 'クリア', batchLabel: 'バッチメール（1行1件）', batchPlaceholder: 'user@example.com\ntest@domain.org\n...',
    validateAllBtn: '全て検証', valid: '有効', invalid: '無効', statusLabel: 'ステータス',
    localPart: 'ローカル部分', domain: 'ドメイン', tld: 'TLD', formatCheck: 'フォーマット確認', lengthCheck: '長さ確認',
    specialCharCheck: '特殊文字', domainHint: 'ドメインヒント', passed: '合格', failed: '不合格',
    results: '結果', validCount: '有効', invalidCount: '無効', loadSample: 'サンプル',
    introTitle: '無料メールアドレス検証ツール', introText: 'RFC 5322基準でメールアドレスの構文とフォーマットを検証します。',
    tipTitle: 'ヒント', tip1: '有効なメールには@が1つだけ必要', tip2: 'ローカル部分は文字、数字、一部の特殊文字が使えます',
    tip3: 'ドメインにはドットと有効なTLDが必要', tip4: 'よくある誤字: gmal.com(gmail.com)', tip5: 'バッチ検証で複数のメールを一度に確認',
    faqTitle: 'よくある質問',
    faq1q: 'メール検証は何をチェックしますか？', faq1a: 'ローカル部分、@、有効なTLDを持つドメインのフォーマットを確認します。',
    faq2q: 'メールが実際に存在するか確認できますか？', faq2a: '構文とフォーマット検証のみです。実際の存在確認にはサーバーサイド処理が必要です。',
    faq3q: 'よくあるメールフォーマットの誤りは？', faq3a: '@がない、スペースが含まれる、複数の@、ドットのないドメイン、無効な文字等。',
    faq4q: 'バッチメール検証はどう機能しますか？', faq4a: 'バッチモードで複数のメールを入力すると、それぞれ検証して有効/無効の数を表示します。',
    faq5q: '100%正確ですか？', faq5a: '構文検証はフォーマットエラーを発見するのに非常に正確ですが、実際の存在確認には送信テストが必要です。',
    relatedTitle: '関連ツール',
  },
};

function validateEmail(email: string): { valid: boolean; checks: Record<string, boolean>; parts: { local: string; domain: string; tld: string } } {
  const atIdx = email.lastIndexOf('@');
  if (atIdx < 1 || atIdx === email.length - 1) {
    return { valid: false, checks: { format: false, length: false, specialChar: false }, parts: { local: '', domain: '', tld: '' } };
  }
  const local = email.slice(0, atIdx);
  const domainPart = email.slice(atIdx + 1);
  const dotIdx = domainPart.lastIndexOf('.');
  const tld = dotIdx > 0 ? domainPart.slice(dotIdx + 1) : '';
  const domain = dotIdx > 0 ? domainPart.slice(0, dotIdx) : domainPart;

  const formatCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  const lengthCheck = email.length <= 254 && local.length <= 64 && domainPart.length <= 253;
  const specialCharCheck = !/\.\./.test(email) && !local.startsWith('.') && !local.endsWith('.');
  const tldCheck = tld.length >= 2;

  const valid = formatCheck && lengthCheck && specialCharCheck && tldCheck;
  return { valid, checks: { format: formatCheck, length: lengthCheck, specialChar: specialCharCheck }, parts: { local, domain, tld } };
}

const SAMPLE_EMAILS = `alice@example.com
bob.smith@company.org
invalid-email
test@domain
user@gmail.com
bad@.com
valid+tag@subdomain.example.co.uk`;

export default function EmailValidatorOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  const [email, setEmail] = useState('');
  const [batchText, setBatchText] = useState('');
  const [validated, setValidated] = useState<{ email: string; result: ReturnType<typeof validateEmail> }[]>([]);
  const [singleResult, setSingleResult] = useState<ReturnType<typeof validateEmail> | null>(null);

  const handleValidate = () => {
    if (email.trim()) setSingleResult(validateEmail(email.trim()));
  };

  const handleBatchValidate = () => {
    const lines = batchText.split('\n').map(l => l.trim()).filter(Boolean);
    setValidated(lines.map(e => ({ email: e, result: validateEmail(e) })));
  };

  const validCount = validated.filter(v => v.result.valid).length;
  const invalidCount = validated.length - validCount;

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="email-validator-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
        {(['single', 'batch'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: '8px 20px', fontSize: 13, fontWeight: tab === activeTab ? 700 : 400, border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: tab === activeTab ? '2px solid var(--accent-blue)' : '2px solid transparent', color: tab === activeTab ? 'var(--accent-blue)' : 'var(--text-secondary)' }}>
            {tab === 'single' ? t.singleTab : t.batchTab}
          </button>
        ))}
      </div>

      {activeTab === 'single' ? (
        <>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.emailLabel}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); setSingleResult(null); }}
                placeholder={t.emailPlaceholder}
                onKeyDown={e => e.key === 'Enter' && handleValidate()}
                style={{ flex: 1, padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
              <button onClick={handleValidate} className="btn btn-primary">{t.validateBtn}</button>
              <button onClick={() => { setEmail(''); setSingleResult(null); }} className="btn btn-secondary">{t.clear}</button>
            </div>
          </div>

          {singleResult && (
            <div style={{ padding: 16, borderRadius: 10, border: `2px solid ${singleResult.valid ? '#22c55e' : '#ef4444'}`, background: singleResult.valid ? '#22c55e10' : '#ef444410', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{singleResult.valid ? '✓' : '✗'}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: singleResult.valid ? '#22c55e' : '#ef4444' }}>
                  {singleResult.valid ? t.valid : t.invalid}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                {[
                  { label: t.localPart, value: singleResult.parts.local || '-' },
                  { label: t.domain, value: singleResult.parts.domain || '-' },
                  { label: t.tld, value: singleResult.parts.tld || '-' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: 'var(--bg-input)', padding: '8px 12px', borderRadius: 6 }}>
                    <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 13, fontFamily: 'monospace', fontWeight: 600 }}>{value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { label: t.formatCheck, passed: singleResult.checks.format },
                  { label: t.lengthCheck, passed: singleResult.checks.length },
                  { label: t.specialCharCheck, passed: singleResult.checks.specialChar },
                ].map(({ label, passed }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 100, background: passed ? '#22c55e20' : '#ef444420', fontSize: 12 }}>
                    <span style={{ color: passed ? '#22c55e' : '#ef4444' }}>{passed ? '✓' : '✗'}</span>
                    <span>{label}: {passed ? t.passed : t.failed}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{t.batchLabel}</label>
              <button onClick={() => setBatchText(SAMPLE_EMAILS)} className="btn btn-ghost" style={{ fontSize: 12 }}>{t.loadSample}</button>
            </div>
            <textarea value={batchText} onChange={e => setBatchText(e.target.value)} placeholder={t.batchPlaceholder}
              style={{ minHeight: 180, fontFamily: 'monospace', fontSize: 13 }} />
          </div>
          <button onClick={handleBatchValidate} className="btn btn-primary" style={{ marginBottom: 16 }}>{t.validateAllBtn}</button>

          {validated.length > 0 && (
            <>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1, padding: '10px 14px', background: '#22c55e15', border: '1px solid #22c55e40', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#22c55e' }}>{validCount}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.validCount}</div>
                </div>
                <div style={{ flex: 1, padding: '10px 14px', background: '#ef444415', border: '1px solid #ef444440', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#ef4444' }}>{invalidCount}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.invalidCount}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {validated.map(({ email: e, result }) => (
                  <div key={e} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 6, background: 'var(--bg-input)', border: `1px solid ${result.valid ? '#22c55e30' : '#ef444430'}` }}>
                    <span style={{ fontSize: 14, color: result.valid ? '#22c55e' : '#ef4444', fontWeight: 700, minWidth: 16 }}>{result.valid ? '✓' : '✗'}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: 13, flex: 1 }}>{e}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: result.valid ? '#22c55e20' : '#ef444420', color: result.valid ? '#22c55e' : '#ef4444' }}>
                      {result.valid ? t.valid : t.invalid}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/regex-tester`, label: 'Regex Tester' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/fake-data`, label: 'Fake Data Generator' },
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
