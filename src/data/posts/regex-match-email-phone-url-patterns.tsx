'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'Stop writing regex from scratch every time. This guide gives you <strong>battle-tested, copy-paste-ready regex patterns</strong> for the most common validation tasks: email addresses, phone numbers, URLs, IP addresses, credit card formats, dates, passwords, and usernames. Every pattern includes an explanation, edge-case notes, and code examples in JavaScript and Python.',
    link_test: 'Test any pattern live in our Regex Tester ->',

    h2_how_to_use: 'How to Use These Patterns',
    p_how_to_use: 'Each pattern below is shown inside a code block. Copy the raw pattern string directly into your code. In JavaScript, wrap it in forward slashes <code>/pattern/</code> or pass it to <code>new RegExp()</code>. In Python, use a raw string <code>r"pattern"</code> with <code>re.match()</code> or <code>re.fullmatch()</code>. Always test against both valid and invalid inputs before deploying to production.',
    pre_js_quick: `// JavaScript quick start
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
if (emailRegex.test(userInput)) {
  console.log('Valid email');
}`,
    pre_py_quick: `# Python quick start
import re
email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
if re.match(email_pattern, user_input):
    print('Valid email')`,

    h2_email: 'Email Validation',
    p_email_intro: 'Email validation is the most common regex use case. There is no single regex that handles 100% of RFC 5322, but the patterns below cover the vast majority of real-world addresses.',
    h3_email_basic: 'Basic Email Pattern',
    p_email_basic: 'Good enough for most web forms. Catches obvious typos without being overly strict.',
    pre_email_basic: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`,
    p_email_basic_note: 'Matches: <code>user@example.com</code>, <code>john.doe+tag@sub.domain.org</code>. Does not match: <code>user@.com</code>, <code>@example.com</code>, <code>user@com</code>.',
    h3_email_rfc: 'RFC 5322 Compliant (Simplified)',
    p_email_rfc: 'A more thorough pattern that handles quoted local parts and longer TLDs. Still not 100% RFC-compliant (a true RFC 5322 regex is over 6,000 characters), but covers edge cases that the basic pattern misses.',
    pre_email_rfc: `^(?:[a-zA-Z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$`,
    h3_email_common: 'Common Domains Only',
    p_email_common: 'When you want to restrict to well-known providers (e.g., for consumer sign-up forms).',
    pre_email_common: `^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail|icloud|protonmail)\\.[a-z]{2,}$`,

    h2_phone: 'Phone Number Validation',
    p_phone_intro: 'Phone number formats vary widely by country. Use these patterns as a starting point and adjust for your target locale.',
    h3_phone_us: 'US Phone Number',
    p_phone_us: 'Matches common US formats with or without country code.',
    pre_phone_us: `^(\\+1[-\\s.]?)?\\(?[2-9]\\d{2}\\)?[-\\s.]?\\d{3}[-\\s.]?\\d{4}$`,
    p_phone_us_note: 'Matches: <code>+1 (555) 123-4567</code>, <code>555-123-4567</code>, <code>5551234567</code>, <code>+1.555.123.4567</code>.',
    h3_phone_intl: 'International Phone Number',
    p_phone_intl: 'A general pattern that allows country codes and various separators.',
    pre_phone_intl: `^\\+?[1-9]\\d{0,2}[-\\s.]?\\(?\\d{1,4}\\)?[-\\s.]?\\d{1,4}[-\\s.]?\\d{1,9}$`,
    h3_phone_e164: 'E.164 Format (Strict)',
    p_phone_e164: 'The international standard for phone numbers. Used by Twilio, Stripe, and most APIs.',
    pre_phone_e164: `^\\+[1-9]\\d{1,14}$`,
    p_phone_e164_note: 'Matches: <code>+14155552671</code>, <code>+442071234567</code>. Maximum 15 digits total (including country code).',

    h2_url: 'URL Validation',
    p_url_intro: 'URL validation can be as simple or complex as needed. Choose the pattern that fits your requirements.',
    h3_url_http: 'HTTP/HTTPS URL',
    p_url_http: 'Requires the http or https protocol prefix.',
    pre_url_http: `^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$`,
    h3_url_noproto: 'URL With or Without Protocol',
    p_url_noproto: 'Matches URLs that may omit http:// or https://.',
    pre_url_noproto: `^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$`,
    h3_url_localhost: 'Localhost URL',
    p_url_localhost: 'For development environments -- matches localhost with optional port and path.',
    pre_url_localhost: `^https?:\\/\\/(localhost|127\\.0\\.0\\.1)(:\\d{1,5})?(\\/[^\\s]*)?$`,
    p_url_localhost_note: 'Matches: <code>http://localhost:3000/api</code>, <code>https://127.0.0.1:8080</code>.',

    h2_ip: 'IP Address Validation',
    p_ip_intro: 'IP address validation requires careful range checking for each octet (IPv4) or group (IPv6).',
    h3_ip_v4: 'IPv4 Address',
    p_ip_v4: 'Validates each octet is between 0 and 255.',
    pre_ip_v4: `^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.){3}(25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)$`,
    p_ip_v4_note: 'Matches: <code>192.168.1.1</code>, <code>10.0.0.255</code>. Rejects: <code>256.1.1.1</code>, <code>192.168.1</code>.',
    h3_ip_v6: 'IPv6 Address (Simplified)',
    p_ip_v6: 'A simplified pattern for standard IPv6 notation. Full IPv6 validation (with :: shorthand) is extremely complex.',
    pre_ip_v6: `^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$`,
    h3_ip_v6_full: 'IPv6 Address (Full with :: Shorthand)',
    p_ip_v6_full: 'Handles the :: zero-compression notation used in most real-world IPv6 addresses.',
    pre_ip_v6_full: `^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$`,
    h3_ip_port: 'IP Address with Port',
    p_ip_port: 'IPv4 address followed by an optional port number (1-65535).',
    pre_ip_port: `^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.){3}(25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)(:(6553[0-5]|655[0-2]\\d|65[0-4]\\d{2}|6[0-4]\\d{3}|[1-5]\\d{4}|[1-9]\\d{0,3}))?$`,

    h2_credit_card: 'Credit Card Number Patterns',
    p_credit_card_intro: '<strong>Important:</strong> These patterns validate the <em>format</em> only (correct number of digits and prefix). They do NOT verify that a card number is real. Always use the <strong>Luhn algorithm</strong> for checksum validation in addition to regex.',
    h3_cc_visa: 'Visa',
    pre_cc_visa: `^4[0-9]{12}(?:[0-9]{3})?$`,
    p_cc_visa_note: 'Starts with 4. Either 13 or 16 digits.',
    h3_cc_mc: 'MasterCard',
    pre_cc_mc: `^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9]\\d)|[3-6]\\d\\d|7(?:[01]\\d|20))[0-9]{12}$`,
    p_cc_mc_note: 'Starts with 51-55 or 2221-2720. Always 16 digits.',
    h3_cc_amex: 'American Express',
    pre_cc_amex: `^3[47][0-9]{13}$`,
    p_cc_amex_note: 'Starts with 34 or 37. Always 15 digits.',
    h3_cc_any: 'Any Major Card (Combined)',
    pre_cc_any: `^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12})$`,
    p_cc_any_note: 'Covers Visa, MasterCard, AMEX, Diners Club, and Discover.',

    h2_date: 'Date Format Patterns',
    p_date_intro: 'These patterns validate the <em>format</em> of dates. For actual date validity (e.g., February 30), you should also validate with a date library.',
    h3_date_iso: 'YYYY-MM-DD (ISO 8601)',
    pre_date_iso: `^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`,
    p_date_iso_note: 'Matches: <code>2026-01-15</code>, <code>2026-12-31</code>. Rejects: <code>2026-13-01</code>, <code>2026-00-10</code>.',
    h3_date_us: 'MM/DD/YYYY',
    pre_date_us: `^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}$`,
    h3_date_eu: 'DD.MM.YYYY',
    pre_date_eu: `^(0[1-9]|[12]\\d|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4}$`,
    p_date_eu_note: 'Common in Germany, Switzerland, and other European countries.',

    h2_password: 'Password Strength Validation',
    p_password_intro: 'Use lookaheads to enforce multiple requirements in a single pattern. Adjust the minimum length and character requirements to match your security policy.',
    h3_pw_strong: 'Strong Password (Min 8 chars, uppercase, lowercase, digit, special)',
    pre_pw_strong: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$`,
    p_pw_strong_note: 'Requires at least: 1 lowercase, 1 uppercase, 1 digit, 1 special character from <code>@$!%*?&</code>, and minimum 8 characters total.',
    h3_pw_medium: 'Medium Password (Min 6 chars, letter + digit)',
    pre_pw_medium: `^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$`,
    h3_pw_custom: 'Custom Length Range (8-64 chars, all requirements)',
    pre_pw_custom: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,64}$`,
    p_pw_custom_note: 'The <code>[^\\w\\s]</code> class matches any special character (broader than a specific list).',

    h2_username: 'Username Validation',
    p_username_intro: 'Username patterns enforce a consistent format for user identifiers.',
    h3_user_basic: 'Alphanumeric + Underscore (3-16 chars)',
    pre_user_basic: `^[a-zA-Z0-9_]{3,16}$`,
    h3_user_start_letter: 'Must Start with a Letter',
    pre_user_start_letter: `^[a-zA-Z][a-zA-Z0-9_]{2,15}$`,
    h3_user_allow_dot: 'Allow Dots and Hyphens (No Consecutive)',
    pre_user_allow_dot: `^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$`,
    p_user_allow_dot_note: 'Must start and end with alphanumeric. No consecutive dots/hyphens. Similar to GitHub username rules.',

    h2_comparison: 'Comparison Table: All Patterns at a Glance',
    p_comparison_intro: 'Use this quick-reference table to find the right pattern for your use case.',

    h2_testing: 'Testing Your Regex',
    p_testing_intro: 'Always test regex patterns against both valid and invalid inputs before using them in production.',
    h3_test_js: 'JavaScript Testing',
    pre_test_js: `// Method 1: RegExp.test() - returns boolean
const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
console.log(pattern.test('user@example.com'));  // true
console.log(pattern.test('invalid@'));          // false

// Method 2: String.match() - returns match array or null
const result = 'user@example.com'.match(pattern);
if (result) {
  console.log('Matched:', result[0]);
}

// Method 3: String.matchAll() - for multiple matches with /g flag
const text = 'Contact us at info@test.com or help@test.com';
const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;
for (const m of text.matchAll(emailPattern)) {
  console.log('Found:', m[0]);
}`,
    h3_test_py: 'Python Testing',
    pre_test_py: `import re

# Method 1: re.match() - match at start of string
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
result = re.match(pattern, 'user@example.com')
print(bool(result))  # True

# Method 2: re.fullmatch() - match entire string (Python 3.4+)
result = re.fullmatch(pattern, 'user@example.com')
print(bool(result))  # True

# Method 3: re.findall() - find all matches
text = 'Contact us at info@test.com or help@test.com'
emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', text)
print(emails)  # ['info@test.com', 'help@test.com']

# Method 4: Compiled pattern (best for repeated use)
email_re = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
for addr in ['valid@test.com', 'bad@', 'ok@domain.org']:
    print(f'{addr}: {bool(email_re.match(addr))}')`,
    h3_test_online: 'Online Testing Tools',
    p_test_online: 'For interactive, visual regex testing, use our <strong>Regex Tester</strong> tool. You can also use sites like regex101.com or regexr.com for detailed breakdowns. Our tool supports JavaScript regex syntax with real-time highlighting.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Should I use regex for email validation?',
    faq1_a: 'Regex is a great first-pass filter for email validation on the client side. It catches obvious typos (missing @, no domain, etc.) before the form is submitted. However, the only way to truly validate an email is to send a confirmation message to it. Use a basic regex pattern for UX, and verification emails for correctness.',
    faq2_q: 'Why are there so many different email regex patterns?',
    faq2_a: 'The email specification (RFC 5322) is extremely permissive -- it allows quoted strings, comments, IP address domains, and unusual characters. A fully compliant regex would be thousands of characters long and impractical. Most developers use a simplified pattern that covers 99.9% of real-world addresses. Choose your pattern based on how strict you need to be.',
    faq3_q: 'Can regex validate that a phone number actually exists?',
    faq3_a: 'No. Regex can only validate the format (correct number of digits, valid country code prefix, proper separators). It cannot verify that a number is assigned to a real line. For production phone validation, use a library like libphonenumber (Google) which has per-country rules and carrier validation.',
    faq4_q: 'How do I validate an IPv6 address with :: shorthand?',
    faq4_a: 'IPv6 with :: shorthand (zero compression) is notoriously difficult to validate with regex because the :: can appear anywhere and replaces one or more groups of zeros. The full pattern in this guide handles most cases. For production systems, consider using your language built-in IP parsing (e.g., Python ipaddress module, Node.js net.isIP()) instead of regex.',
    faq5_q: 'Is it safe to use regex for password strength validation?',
    faq5_a: 'Yes, regex with lookaheads is an efficient way to enforce password complexity rules (minimum length, required character types). However, password strength is about more than character diversity -- consider also checking against breached password databases (like HaveIBeenPwned) and using entropy-based scoring. Regex handles format rules; pair it with additional security checks.',
  },
  zh: {
    intro: '不要每次都从头写正则表达式。本指南提供了<strong>经过实战验证、可直接复制粘贴的正则模式</strong>，覆盖最常见的验证场景：邮箱地址、电话号码、URL、IP 地址、信用卡格式、日期、密码和用户名。每个模式都附带解释、边界情况说明，以及 JavaScript 和 Python 的代码示例。',
    link_test: '在我们的 Regex 测试器中实时测试任何模式 ->',

    h2_how_to_use: '如何使用这些模式',
    p_how_to_use: '下面每个模式都显示在代码块中。直接将原始模式字符串复制到你的代码中即可。在 JavaScript 中，用正斜杠包裹 <code>/pattern/</code> 或传递给 <code>new RegExp()</code>。在 Python 中，使用原始字符串 <code>r"pattern"</code> 配合 <code>re.match()</code> 或 <code>re.fullmatch()</code>。部署到生产环境前，务必针对有效和无效输入进行测试。',
    pre_js_quick: `// JavaScript 快速开始
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
if (emailRegex.test(userInput)) {
  console.log('有效邮箱');
}`,
    pre_py_quick: `# Python 快速开始
import re
email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
if re.match(email_pattern, user_input):
    print('有效邮箱')`,

    h2_email: '邮箱验证',
    p_email_intro: '邮箱验证是最常见的正则使用场景。没有任何单个正则能 100% 处理 RFC 5322，但以下模式覆盖了绝大多数真实邮箱地址。',
    h3_email_basic: '基础邮箱模式',
    p_email_basic: '对大多数 Web 表单来说足够好。能捕获明显的拼写错误，同时不会过于严格。',
    pre_email_basic: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`,
    p_email_basic_note: '匹配：<code>user@example.com</code>、<code>john.doe+tag@sub.domain.org</code>。不匹配：<code>user@.com</code>、<code>@example.com</code>、<code>user@com</code>。',
    h3_email_rfc: 'RFC 5322 兼容（简化版）',
    p_email_rfc: '更全面的模式，能处理带引号的本地部分和较长的 TLD。仍然不是 100% RFC 兼容（完整的 RFC 5322 正则超过 6,000 个字符），但覆盖了基础模式遗漏的边界情况。',
    pre_email_rfc: `^(?:[a-zA-Z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$`,
    h3_email_common: '仅限常见域名',
    p_email_common: '当你想限制为知名邮箱提供商时（例如消费者注册表单）。',
    pre_email_common: `^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail|icloud|protonmail)\\.[a-z]{2,}$`,

    h2_phone: '电话号码验证',
    p_phone_intro: '电话号码格式因国家/地区而异。以下模式可作为起点，根据你的目标地区进行调整。',
    h3_phone_us: '美国电话号码',
    p_phone_us: '匹配带或不带国家代码的常见美国格式。',
    pre_phone_us: `^(\\+1[-\\s.]?)?\\(?[2-9]\\d{2}\\)?[-\\s.]?\\d{3}[-\\s.]?\\d{4}$`,
    p_phone_us_note: '匹配：<code>+1 (555) 123-4567</code>、<code>555-123-4567</code>、<code>5551234567</code>、<code>+1.555.123.4567</code>。',
    h3_phone_intl: '国际电话号码',
    p_phone_intl: '通用模式，允许国家代码和各种分隔符。',
    pre_phone_intl: `^\\+?[1-9]\\d{0,2}[-\\s.]?\\(?\\d{1,4}\\)?[-\\s.]?\\d{1,4}[-\\s.]?\\d{1,9}$`,
    h3_phone_e164: 'E.164 格式（严格）',
    p_phone_e164: '国际电话号码标准。被 Twilio、Stripe 和大多数 API 使用。',
    pre_phone_e164: `^\\+[1-9]\\d{1,14}$`,
    p_phone_e164_note: '匹配：<code>+14155552671</code>、<code>+442071234567</code>。总共最多 15 位数字（包括国家代码）。',

    h2_url: 'URL 验证',
    p_url_intro: 'URL 验证可简可繁。选择适合你需求的模式。',
    h3_url_http: 'HTTP/HTTPS URL',
    p_url_http: '要求 http 或 https 协议前缀。',
    pre_url_http: `^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$`,
    h3_url_noproto: '有无协议均可的 URL',
    p_url_noproto: '匹配可能省略 http:// 或 https:// 的 URL。',
    pre_url_noproto: `^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$`,
    h3_url_localhost: 'Localhost URL',
    p_url_localhost: '用于开发环境——匹配 localhost 及可选端口和路径。',
    pre_url_localhost: `^https?:\\/\\/(localhost|127\\.0\\.0\\.1)(:\\d{1,5})?(\\/[^\\s]*)?$`,
    p_url_localhost_note: '匹配：<code>http://localhost:3000/api</code>、<code>https://127.0.0.1:8080</code>。',

    h2_ip: 'IP 地址验证',
    p_ip_intro: 'IP 地址验证需要仔细检查每个八位组（IPv4）或组（IPv6）的范围。',
    h3_ip_v4: 'IPv4 地址',
    p_ip_v4: '验证每个八位组在 0 到 255 之间。',
    pre_ip_v4: `^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.){3}(25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)$`,
    p_ip_v4_note: '匹配：<code>192.168.1.1</code>、<code>10.0.0.255</code>。拒绝：<code>256.1.1.1</code>、<code>192.168.1</code>。',
    h3_ip_v6: 'IPv6 地址（简化版）',
    p_ip_v6: '标准 IPv6 表示法的简化模式。完整的 IPv6 验证（含 :: 缩写）极为复杂。',
    pre_ip_v6: `^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$`,
    h3_ip_v6_full: 'IPv6 地址（完整版含 :: 缩写）',
    p_ip_v6_full: '处理大多数真实 IPv6 地址中使用的 :: 零压缩表示法。',
    pre_ip_v6_full: `^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$`,
    h3_ip_port: 'IP 地址带端口',
    p_ip_port: 'IPv4 地址后跟可选端口号（1-65535）。',
    pre_ip_port: `^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.){3}(25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)(:(6553[0-5]|655[0-2]\\d|65[0-4]\\d{2}|6[0-4]\\d{3}|[1-5]\\d{4}|[1-9]\\d{0,3}))?$`,

    h2_credit_card: '信用卡号码模式',
    p_credit_card_intro: '<strong>重要提示：</strong>这些模式仅验证<em>格式</em>（正确的位数和前缀），不能验证卡号是否真实。除了正则外，务必使用 <strong>Luhn 算法</strong>进行校验和验证。',
    h3_cc_visa: 'Visa',
    pre_cc_visa: `^4[0-9]{12}(?:[0-9]{3})?$`,
    p_cc_visa_note: '以 4 开头。13 或 16 位数字。',
    h3_cc_mc: 'MasterCard',
    pre_cc_mc: `^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9]\\d)|[3-6]\\d\\d|7(?:[01]\\d|20))[0-9]{12}$`,
    p_cc_mc_note: '以 51-55 或 2221-2720 开头。始终 16 位数字。',
    h3_cc_amex: 'American Express',
    pre_cc_amex: `^3[47][0-9]{13}$`,
    p_cc_amex_note: '以 34 或 37 开头。始终 15 位数字。',
    h3_cc_any: '所有主要卡种（组合）',
    pre_cc_any: `^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12})$`,
    p_cc_any_note: '涵盖 Visa、MasterCard、AMEX、Diners Club 和 Discover。',

    h2_date: '日期格式模式',
    p_date_intro: '这些模式验证日期的<em>格式</em>。对于实际日期有效性（例如 2 月 30 日），还需要使用日期库进行验证。',
    h3_date_iso: 'YYYY-MM-DD（ISO 8601）',
    pre_date_iso: `^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`,
    p_date_iso_note: '匹配：<code>2026-01-15</code>、<code>2026-12-31</code>。拒绝：<code>2026-13-01</code>、<code>2026-00-10</code>。',
    h3_date_us: 'MM/DD/YYYY',
    pre_date_us: `^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}$`,
    h3_date_eu: 'DD.MM.YYYY',
    pre_date_eu: `^(0[1-9]|[12]\\d|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4}$`,
    p_date_eu_note: '在德国、瑞士及其他欧洲国家常用。',

    h2_password: '密码强度验证',
    p_password_intro: '使用前瞻断言在单个模式中强制执行多项要求。根据你的安全策略调整最小长度和字符要求。',
    h3_pw_strong: '强密码（至少 8 个字符，含大写、小写、数字、特殊字符）',
    pre_pw_strong: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$`,
    p_pw_strong_note: '至少需要：1 个小写字母、1 个大写字母、1 个数字、1 个 <code>@$!%*?&</code> 中的特殊字符，总长度至少 8 个字符。',
    h3_pw_medium: '中等密码（至少 6 个字符，字母 + 数字）',
    pre_pw_medium: `^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$`,
    h3_pw_custom: '自定义长度范围（8-64 个字符，全部要求）',
    pre_pw_custom: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,64}$`,
    p_pw_custom_note: '<code>[^\\w\\s]</code> 字符类匹配任何特殊字符（比特定列表更广泛）。',

    h2_username: '用户名验证',
    p_username_intro: '用户名模式为用户标识符强制执行一致的格式。',
    h3_user_basic: '字母数字 + 下划线（3-16 个字符）',
    pre_user_basic: `^[a-zA-Z0-9_]{3,16}$`,
    h3_user_start_letter: '必须以字母开头',
    pre_user_start_letter: `^[a-zA-Z][a-zA-Z0-9_]{2,15}$`,
    h3_user_allow_dot: '允许点和连字符（不连续）',
    pre_user_allow_dot: `^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$`,
    p_user_allow_dot_note: '必须以字母数字开头和结尾。不允许连续的点/连字符。类似于 GitHub 用户名规则。',

    h2_comparison: '对比表：所有模式一览',
    p_comparison_intro: '使用此速查表找到适合你用例的正确模式。',

    h2_testing: '测试你的正则',
    p_testing_intro: '在生产环境使用前，务必针对有效和无效输入测试正则模式。',
    h3_test_js: 'JavaScript 测试',
    pre_test_js: `// 方法 1: RegExp.test() - 返回布尔值
const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
console.log(pattern.test('user@example.com'));  // true
console.log(pattern.test('invalid@'));          // false

// 方法 2: String.match() - 返回匹配数组或 null
const result = 'user@example.com'.match(pattern);
if (result) {
  console.log('匹配:', result[0]);
}

// 方法 3: String.matchAll() - 使用 /g 标志获取多个匹配
const text = '联系我们 info@test.com 或 help@test.com';
const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;
for (const m of text.matchAll(emailPattern)) {
  console.log('找到:', m[0]);
}`,
    h3_test_py: 'Python 测试',
    pre_test_py: `import re

# 方法 1: re.match() - 从字符串开头匹配
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
result = re.match(pattern, 'user@example.com')
print(bool(result))  # True

# 方法 2: re.fullmatch() - 匹配整个字符串 (Python 3.4+)
result = re.fullmatch(pattern, 'user@example.com')
print(bool(result))  # True

# 方法 3: re.findall() - 查找所有匹配
text = '联系我们 info@test.com 或 help@test.com'
emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', text)
print(emails)  # ['info@test.com', 'help@test.com']

# 方法 4: 编译模式（重复使用时最佳）
email_re = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
for addr in ['valid@test.com', 'bad@', 'ok@domain.org']:
    print(f'{addr}: {bool(email_re.match(addr))}')`,
    h3_test_online: '在线测试工具',
    p_test_online: '要进行交互式、可视化的正则测试，请使用我们的 <strong>Regex 测试器</strong>工具。你也可以使用 regex101.com 或 regexr.com 获取详细分析。我们的工具支持 JavaScript 正则语法和实时高亮显示。',

    h2_faq: '常见问题',
    faq1_q: '应该使用正则验证邮箱吗？',
    faq1_a: '正则是客户端邮箱验证的优秀初步过滤器。它能在表单提交前捕获明显的拼写错误（缺少 @、没有域名等）。然而，真正验证邮箱的唯一方法是向其发送确认邮件。使用基础正则模式改善用户体验，用验证邮件确保正确性。',
    faq2_q: '为什么有这么多不同的邮箱正则模式？',
    faq2_a: '邮箱规范（RFC 5322）非常宽松——它允许引号字符串、注释、IP 地址域和不常见的字符。一个完全兼容的正则会有数千个字符长，不切实际。大多数开发者使用简化模式，覆盖 99.9% 的真实邮箱地址。根据你需要的严格程度选择模式。',
    faq3_q: '正则能验证电话号码是否真实存在吗？',
    faq3_a: '不能。正则只能验证格式（正确的位数、有效的国家代码前缀、正确的分隔符）。它无法验证号码是否分配给了真实线路。对于生产环境的电话验证，请使用 libphonenumber（Google）等库，它具有按国家/地区的规则和运营商验证。',
    faq4_q: '如何验证带 :: 缩写的 IPv6 地址？',
    faq4_a: '带 :: 缩写（零压缩）的 IPv6 用正则验证非常困难，因为 :: 可以出现在任何位置，并替代一个或多个零组。本指南中的完整模式处理了大多数情况。对于生产系统，考虑使用语言内置的 IP 解析（例如 Python 的 ipaddress 模块、Node.js 的 net.isIP()）而非正则。',
    faq5_q: '用正则做密码强度验证安全吗？',
    faq5_a: '是的，使用前瞻断言的正则是强制执行密码复杂度规则（最小长度、必需字符类型）的高效方式。然而，密码强度不仅仅是字符多样性——还应考虑检查泄露密码数据库（如 HaveIBeenPwned）和使用基于熵的评分。正则处理格式规则，将其与额外的安全检查配合使用。',
  },
};

export default function RegexMatchPatterns({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      <p>
        <Link href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600 }}>
          {t.link_test}
        </Link>
      </p>

      {/* -- Section 1: How to Use -- */}
      <h2>{t.h2_how_to_use}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_how_to_use }} />
      <pre><code>{t.pre_js_quick}</code></pre>
      <pre><code>{t.pre_py_quick}</code></pre>

      {/* -- Section 2: Email Validation -- */}
      <h2>{t.h2_email}</h2>
      <p>{t.p_email_intro}</p>

      <h3>{t.h3_email_basic}</h3>
      <p>{t.p_email_basic}</p>
      <pre><code>{t.pre_email_basic}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p_email_basic_note }} />

      <h3>{t.h3_email_rfc}</h3>
      <p>{t.p_email_rfc}</p>
      <pre><code>{t.pre_email_rfc}</code></pre>

      <h3>{t.h3_email_common}</h3>
      <p>{t.p_email_common}</p>
      <pre><code>{t.pre_email_common}</code></pre>

      {/* -- Section 3: Phone Number -- */}
      <h2>{t.h2_phone}</h2>
      <p>{t.p_phone_intro}</p>

      <h3>{t.h3_phone_us}</h3>
      <p>{t.p_phone_us}</p>
      <pre><code>{t.pre_phone_us}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p_phone_us_note }} />

      <h3>{t.h3_phone_intl}</h3>
      <p>{t.p_phone_intl}</p>
      <pre><code>{t.pre_phone_intl}</code></pre>

      <h3>{t.h3_phone_e164}</h3>
      <p>{t.p_phone_e164}</p>
      <pre><code>{t.pre_phone_e164}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p_phone_e164_note }} />

      {/* -- Section 4: URL Validation -- */}
      <h2>{t.h2_url}</h2>
      <p>{t.p_url_intro}</p>

      <h3>{t.h3_url_http}</h3>
      <p>{t.p_url_http}</p>
      <pre><code>{t.pre_url_http}</code></pre>

      <h3>{t.h3_url_noproto}</h3>
      <p>{t.p_url_noproto}</p>
      <pre><code>{t.pre_url_noproto}</code></pre>

      <h3>{t.h3_url_localhost}</h3>
      <p>{t.p_url_localhost}</p>
      <pre><code>{t.pre_url_localhost}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p_url_localhost_note }} />

      {/* -- Section 5: IP Address -- */}
      <h2>{t.h2_ip}</h2>
      <p>{t.p_ip_intro}</p>

      <h3>{t.h3_ip_v4}</h3>
      <p>{t.p_ip_v4}</p>
      <pre><code>{t.pre_ip_v4}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p_ip_v4_note }} />

      <h3>{t.h3_ip_v6}</h3>
      <p>{t.p_ip_v6}</p>
      <pre><code>{t.pre_ip_v6}</code></pre>

      <h3>{t.h3_ip_v6_full}</h3>
      <p>{t.p_ip_v6_full}</p>
      <pre><code>{t.pre_ip_v6_full}</code></pre>

      <h3>{t.h3_ip_port}</h3>
      <p>{t.p_ip_port}</p>
      <pre><code>{t.pre_ip_port}</code></pre>

      {/* -- Section 6: Credit Card -- */}
      <h2>{t.h2_credit_card}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_credit_card_intro }} />

      <h3>{t.h3_cc_visa}</h3>
      <pre><code>{t.pre_cc_visa}</code></pre>
      <p>{t.p_cc_visa_note}</p>

      <h3>{t.h3_cc_mc}</h3>
      <pre><code>{t.pre_cc_mc}</code></pre>
      <p>{t.p_cc_mc_note}</p>

      <h3>{t.h3_cc_amex}</h3>
      <pre><code>{t.pre_cc_amex}</code></pre>
      <p>{t.p_cc_amex_note}</p>

      <h3>{t.h3_cc_any}</h3>
      <pre><code>{t.pre_cc_any}</code></pre>
      <p>{t.p_cc_any_note}</p>

      {/* -- Section 7: Date Formats -- */}
      <h2>{t.h2_date}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_date_intro }} />

      <h3>{t.h3_date_iso}</h3>
      <pre><code>{t.pre_date_iso}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p_date_iso_note }} />

      <h3>{t.h3_date_us}</h3>
      <pre><code>{t.pre_date_us}</code></pre>

      <h3>{t.h3_date_eu}</h3>
      <pre><code>{t.pre_date_eu}</code></pre>
      <p>{t.p_date_eu_note}</p>

      {/* -- Section 8: Password -- */}
      <h2>{t.h2_password}</h2>
      <p>{t.p_password_intro}</p>

      <h3>{t.h3_pw_strong}</h3>
      <pre><code>{t.pre_pw_strong}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p_pw_strong_note }} />

      <h3>{t.h3_pw_medium}</h3>
      <pre><code>{t.pre_pw_medium}</code></pre>

      <h3>{t.h3_pw_custom}</h3>
      <pre><code>{t.pre_pw_custom}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p_pw_custom_note }} />

      {/* -- Section 9: Username -- */}
      <h2>{t.h2_username}</h2>
      <p>{t.p_username_intro}</p>

      <h3>{t.h3_user_basic}</h3>
      <pre><code>{t.pre_user_basic}</code></pre>

      <h3>{t.h3_user_start_letter}</h3>
      <pre><code>{t.pre_user_start_letter}</code></pre>

      <h3>{t.h3_user_allow_dot}</h3>
      <pre><code>{t.pre_user_allow_dot}</code></pre>
      <p>{t.p_user_allow_dot_note}</p>

      {/* -- Section 10: Comparison Table -- */}
      <h2>{t.h2_comparison}</h2>
      <p>{t.p_comparison_intro}</p>
      <table>
        <thead>
          <tr><th>Use Case</th><th>Pattern</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>Email (basic)</td><td><code>{`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`}</code></td><td>Most web forms</td></tr>
          <tr><td>Phone (US)</td><td><code>{`^(\\+1[-\\s.]?)?\\(?[2-9]\\d{2}\\)?[-\\s.]?\\d{3}[-\\s.]?\\d{4}$`}</code></td><td>Multiple formats</td></tr>
          <tr><td>Phone (E.164)</td><td><code>{`^\\+[1-9]\\d{1,14}$`}</code></td><td>API standard</td></tr>
          <tr><td>URL (HTTP/S)</td><td><code>{`^https?:\\/\\/[^\\s]+$`}</code></td><td>Quick check</td></tr>
          <tr><td>IPv4</td><td><code>{`^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.){3}(25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)$`}</code></td><td>0-255 per octet</td></tr>
          <tr><td>IPv6 (simple)</td><td><code>{`^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$`}</code></td><td>No :: shorthand</td></tr>
          <tr><td>Visa</td><td><code>{`^4[0-9]{12}(?:[0-9]{3})?$`}</code></td><td>13 or 16 digits</td></tr>
          <tr><td>MasterCard</td><td><code>{`^5[1-5][0-9]{14}$`}</code></td><td>16 digits</td></tr>
          <tr><td>AMEX</td><td><code>{`^3[47][0-9]{13}$`}</code></td><td>15 digits</td></tr>
          <tr><td>Date (ISO)</td><td><code>{`^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`}</code></td><td>YYYY-MM-DD</td></tr>
          <tr><td>Date (US)</td><td><code>{`^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}$`}</code></td><td>MM/DD/YYYY</td></tr>
          <tr><td>Date (EU)</td><td><code>{`^(0[1-9]|[12]\\d|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4}$`}</code></td><td>DD.MM.YYYY</td></tr>
          <tr><td>Strong Password</td><td><code>{`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$`}</code></td><td>All requirements</td></tr>
          <tr><td>Username</td><td><code>{`^[a-zA-Z][a-zA-Z0-9_]{2,15}$`}</code></td><td>Letter start, 3-16 chars</td></tr>
        </tbody>
      </table>

      {/* -- Section 11: Testing -- */}
      <h2>{t.h2_testing}</h2>
      <p>{t.p_testing_intro}</p>

      <h3>{t.h3_test_js}</h3>
      <pre><code>{t.pre_test_js}</code></pre>

      <h3>{t.h3_test_py}</h3>
      <pre><code>{t.pre_test_py}</code></pre>

      <h3>{t.h3_test_online}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_test_online }} />
      <p>
        <Link href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600 }}>
          {t.link_test}
        </Link>
      </p>

      {/* -- Section 12: FAQ -- */}
      <div className="faq-section">
        <h2>{t.h2_faq}</h2>
        <h3>{t.faq1_q}</h3>
        <p>{t.faq1_a}</p>
        <h3>{t.faq2_q}</h3>
        <p>{t.faq2_a}</p>
        <h3>{t.faq3_q}</h3>
        <p>{t.faq3_a}</p>
        <h3>{t.faq4_q}</h3>
        <p>{t.faq4_a}</p>
        <h3>{t.faq5_q}</h3>
        <p>{t.faq5_a}</p>
      </div>
    </>
  );
}
