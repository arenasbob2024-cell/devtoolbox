'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'URL encoding (also called <strong>percent encoding</strong>) converts special characters into a format that can be safely transmitted in a URL. Every developer encounters URL encoding issues at some point — broken links, garbled parameters, or API errors caused by unencoded characters. This <strong>complete URL encoding reference</strong> gives you the definitive table of all special characters and their encoded forms, plus practical examples in every major programming language.',
    linkTool: 'Encode or decode any URL instantly with our URL Encoder/Decoder tool →',

    h2_what: 'What Is URL Encoding (Percent Encoding)?',
    what_p1: 'URL encoding replaces unsafe or reserved characters with a <code>%</code> sign followed by two hexadecimal digits representing the character\'s ASCII/UTF-8 byte value. For example, a space becomes <code>%20</code>, and an ampersand becomes <code>%26</code>.',
    what_p2: 'This mechanism is defined in <strong>RFC 3986</strong> (Uniform Resource Identifier: Generic Syntax). URLs can only contain a limited set of characters from the US-ASCII character set. Any character outside this set — or any reserved character used outside its special meaning — must be percent-encoded.',
    what_p3: 'The general format is: <code>%XX</code> where <code>XX</code> is the hexadecimal value of the byte. For multi-byte UTF-8 characters (like Chinese or emoji), each byte is encoded separately. For example, the Chinese character "中" (U+4E2D) encodes to <code>%E4%B8%AD</code> (three bytes in UTF-8).',

    h2_table: 'Complete URL Encoding Reference Table',
    table_desc: 'Below is a comprehensive table of all commonly encountered special characters and their percent-encoded forms. Bookmark this page for quick reference.',
    th_char: 'Character',
    th_encoded: 'Encoded Form',
    th_desc: 'Description',
    th_ascii: 'ASCII Code',

    h2_reserved: 'Reserved vs Unreserved Characters (RFC 3986)',
    reserved_p1: 'RFC 3986 defines two categories of characters that determine when encoding is necessary:',
    reserved_h3: 'Reserved Characters',
    reserved_p2: 'These characters have special meaning in URLs. If you want to use them <em>literally</em> (not for their special purpose), you must percent-encode them.',
    reserved_list: '<code>:</code> <code>/</code> <code>?</code> <code>#</code> <code>[</code> <code>]</code> <code>@</code> <code>!</code> <code>$</code> <code>&amp;</code> <code>\'</code> <code>(</code> <code>)</code> <code>*</code> <code>+</code> <code>,</code> <code>;</code> <code>=</code>',
    unreserved_h3: 'Unreserved Characters',
    unreserved_p: 'These characters can be used in a URL without encoding. They have no special meaning:',
    unreserved_list: '<strong>Letters:</strong> A-Z, a-z &nbsp; <strong>Digits:</strong> 0-9 &nbsp; <strong>Special:</strong> <code>-</code> <code>_</code> <code>.</code> <code>~</code>',
    reserved_p3: 'Everything else — including spaces, non-ASCII characters, and control characters — must always be percent-encoded.',

    h2_encodeuri: 'encodeURI vs encodeURIComponent in JavaScript',
    encodeuri_p1: 'JavaScript provides two built-in functions for URL encoding, and using the wrong one is one of the most common mistakes:',
    encodeuri_h3_1: 'encodeURI()',
    encodeuri_desc1: 'Encodes a <strong>complete URI</strong>. It does NOT encode characters that have special meaning in a URL: <code>: / ? # [ ] @ ! $ & \' ( ) * + , ; =</code>',
    encodeuri_h3_2: 'encodeURIComponent()',
    encodeuri_desc2: 'Encodes a <strong>URI component</strong> (such as a query parameter value). It DOES encode reserved characters like <code>& = + /</code> — which is exactly what you want for parameter values.',
    encodeuri_rule: '<strong>Rule of thumb:</strong> Use <code>encodeURIComponent()</code> for query parameter values and path segments. Use <code>encodeURI()</code> only when encoding an entire URL where you want to preserve the structure.',

    h2_languages: 'URL Encoding in Different Programming Languages',
    lang_python: 'Python',
    lang_java: 'Java',
    lang_go: 'Go',
    lang_php: 'PHP',
    lang_csharp: 'C#',
    lang_ruby: 'Ruby',

    h2_mistakes: 'Common URL Encoding Mistakes',
    mistake1_h3: '1. Double Encoding',
    mistake1_p: 'Double encoding happens when you encode an already-encoded string. For example, <code>%20</code> becomes <code>%2520</code> (the <code>%</code> gets encoded to <code>%25</code>). This is one of the most common and hardest-to-debug URL issues.',
    mistake2_h3: '2. Encoding the Entire URL',
    mistake2_p: 'Never pass an entire URL to <code>encodeURIComponent()</code>. It will encode the <code>://</code>, <code>/</code>, <code>?</code>, and <code>=</code> characters, breaking the URL structure. Only encode individual parameter values.',
    mistake3_h3: '3. Forgetting + vs %20 for Spaces',
    mistake3_p: 'In the <code>application/x-www-form-urlencoded</code> format (HTML forms), spaces are encoded as <code>+</code>. In standard percent encoding (RFC 3986), spaces are <code>%20</code>. Most server-side frameworks handle both, but APIs may be strict. When in doubt, use <code>%20</code>.',
    mistake4_h3: '4. Not Encoding Non-ASCII Characters',
    mistake4_p: 'Characters like <code>cafe\u0301</code>, <code>\u00fc</code>, or CJK characters must be UTF-8 encoded first, then each byte is percent-encoded. Forgetting this causes mojibake (garbled text) in URLs.',
    mistake5_h3: '5. Encoding Hash Fragments on the Server',
    mistake5_p: 'The fragment (<code>#section</code>) is never sent to the server — it is client-side only. Encoding or processing it server-side is pointless.',
    mistake6_h3: '6. Using Deprecated escape() in JavaScript',
    mistake6_p: 'The <code>escape()</code> function is deprecated and does not handle UTF-8 properly. Always use <code>encodeURI()</code> or <code>encodeURIComponent()</code> instead.',

    h2_when: 'When to URL Encode: Query Params, Path Segments, Fragment',
    when_p1: 'Different parts of a URL have different encoding rules:',
    when_h3_1: 'Query Parameters',
    when_p2: 'Always encode parameter keys and values. This is the most common place where encoding is needed.',
    when_h3_2: 'Path Segments',
    when_p3: 'Encode each path segment individually. Forward slashes (<code>/</code>) that are part of the URL structure should NOT be encoded, but slashes within a segment value must be.',
    when_h3_3: 'Fragment Identifier',
    when_p4: 'The fragment (after <code>#</code>) follows the same encoding rules as query strings. Note that fragments are never sent to the server.',
    when_h3_4: 'Domain Name (Hostname)',
    when_p5: 'Domain names use <strong>Punycode</strong> (not percent encoding) for internationalized domain names (IDN). For example, <code>muenchen.de</code> with an umlaut becomes <code>xn--mnchen-3ya.de</code>.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between %20 and + for spaces?',
    faq1_a: 'Both represent a space, but they come from different standards. <code>%20</code> is defined by RFC 3986 (URI standard) and is used in path segments and modern APIs. <code>+</code> is defined by the <code>application/x-www-form-urlencoded</code> format (HTML forms). In query strings, most servers accept both. For maximum compatibility, use <code>%20</code>.',
    faq2_q: 'Should I encode forward slashes (/) in URL paths?',
    faq2_a: 'Only if the slash is part of a data value, not a path separator. For example, if a filename contains a slash, it must be encoded as <code>%2F</code> in the path segment. The structural slashes that separate path segments should never be encoded.',
    faq3_q: 'How do I encode Unicode characters (e.g., Chinese, Arabic) in URLs?',
    faq3_a: 'First convert the character to its UTF-8 byte sequence, then percent-encode each byte. For example, "cafe\u0301" → UTF-8 bytes <code>63 61 66 C3 A9</code> → the e\u0301 becomes <code>%C3%A9</code>. Modern programming languages handle this automatically with their URL encoding functions.',
    faq4_q: 'Is URL encoding case-sensitive?',
    faq4_a: 'The hexadecimal digits in percent encoding are case-insensitive (<code>%2f</code> and <code>%2F</code> are equivalent). However, RFC 3986 recommends using uppercase letters (<code>%2F</code>) for consistency and normalization.',
    faq5_q: 'Do I need to encode the entire URL or just parts of it?',
    faq5_a: 'Never encode an entire URL at once. Encode only the individual components — query parameter values, path segments containing special characters, and fragment identifiers. The structural characters (<code>://</code>, <code>/</code>, <code>?</code>, <code>=</code>, <code>&</code>) must remain unencoded to preserve the URL structure.',

    conclusion: 'URL encoding is a fundamental skill for web development. Keep this reference table handy for quick lookups, and use our tool to encode and decode URLs in real time.',
    linkToolBottom: 'Encode & decode any URL with our URL Encoder/Decoder →',
  },
  zh: {
    intro: 'URL 编码（也叫<strong>百分号编码</strong>）将特殊字符转换为可以在 URL 中安全传输的格式。每个开发者都会遇到 URL 编码问题——链接损坏、参数乱码、或因未编码字符导致的 API 错误。本<strong>完整 URL 编码参考指南</strong>为你提供所有特殊字符及其编码形式的权威对照表，以及各主流编程语言的实用示例。',
    linkTool: '使用我们的 URL 编码/解码工具即时编码或解码任何 URL →',

    h2_what: '什么是 URL 编码（百分号编码）？',
    what_p1: 'URL 编码用 <code>%</code> 符号加上两个十六进制数字（代表字符的 ASCII/UTF-8 字节值）来替换不安全或保留字符。例如，空格变为 <code>%20</code>，& 符号变为 <code>%26</code>。',
    what_p2: '这个机制在 <strong>RFC 3986</strong>（统一资源标识符：通用语法）中定义。URL 只能包含 US-ASCII 字符集中的有限字符集。任何超出此集合的字符——或任何在特殊含义之外使用的保留字符——都必须进行百分号编码。',
    what_p3: '通用格式为：<code>%XX</code>，其中 <code>XX</code> 是字节的十六进制值。对于多字节 UTF-8 字符（如中文或 emoji），每个字节分别编码。例如，汉字"中"（U+4E2D）编码为 <code>%E4%B8%AD</code>（UTF-8 中的三个字节）。',

    h2_table: '完整 URL 编码参考表',
    table_desc: '以下是所有常见特殊字符及其百分号编码形式的完整对照表。收藏此页面以便快速查阅。',
    th_char: '字符',
    th_encoded: '编码形式',
    th_desc: '说明',
    th_ascii: 'ASCII 码',

    h2_reserved: '保留字符与非保留字符（RFC 3986）',
    reserved_p1: 'RFC 3986 定义了两类字符，决定何时需要编码：',
    reserved_h3: '保留字符',
    reserved_p2: '这些字符在 URL 中有特殊含义。如果你想<em>按字面意思</em>使用它们（而非其特殊用途），必须进行百分号编码。',
    reserved_list: '<code>:</code> <code>/</code> <code>?</code> <code>#</code> <code>[</code> <code>]</code> <code>@</code> <code>!</code> <code>$</code> <code>&amp;</code> <code>\'</code> <code>(</code> <code>)</code> <code>*</code> <code>+</code> <code>,</code> <code>;</code> <code>=</code>',
    unreserved_h3: '非保留字符',
    unreserved_p: '这些字符可以在 URL 中直接使用而无需编码，它们没有特殊含义：',
    unreserved_list: '<strong>字母：</strong>A-Z、a-z &nbsp; <strong>数字：</strong>0-9 &nbsp; <strong>特殊：</strong><code>-</code> <code>_</code> <code>.</code> <code>~</code>',
    reserved_p3: '其他所有字符——包括空格、非 ASCII 字符和控制字符——都必须进行百分号编码。',

    h2_encodeuri: 'JavaScript 中的 encodeURI 与 encodeURIComponent',
    encodeuri_p1: 'JavaScript 提供两个内置 URL 编码函数，使用错误的那个是最常见的错误之一：',
    encodeuri_h3_1: 'encodeURI()',
    encodeuri_desc1: '编码<strong>完整 URI</strong>。不会编码在 URL 中有特殊含义的字符：<code>: / ? # [ ] @ ! $ & \' ( ) * + , ; =</code>',
    encodeuri_h3_2: 'encodeURIComponent()',
    encodeuri_desc2: '编码 <strong>URI 组件</strong>（如查询参数值）。会编码保留字符如 <code>& = + /</code> ——这正是处理参数值时所需要的。',
    encodeuri_rule: '<strong>经验法则：</strong>对查询参数值和路径段使用 <code>encodeURIComponent()</code>。仅在编码希望保留结构的完整 URL 时使用 <code>encodeURI()</code>。',

    h2_languages: '不同编程语言中的 URL 编码',
    lang_python: 'Python',
    lang_java: 'Java',
    lang_go: 'Go',
    lang_php: 'PHP',
    lang_csharp: 'C#',
    lang_ruby: 'Ruby',

    h2_mistakes: '常见 URL 编码错误',
    mistake1_h3: '1. 重复编码（Double Encoding）',
    mistake1_p: '重复编码发生在对已编码的字符串再次编码时。例如，<code>%20</code> 变成 <code>%2520</code>（<code>%</code> 被编码为 <code>%25</code>）。这是最常见且最难调试的 URL 问题之一。',
    mistake2_h3: '2. 编码整个 URL',
    mistake2_p: '永远不要将整个 URL 传给 <code>encodeURIComponent()</code>。它会编码 <code>://</code>、<code>/</code>、<code>?</code> 和 <code>=</code> 字符，破坏 URL 结构。只编码单个参数值。',
    mistake3_h3: '3. 忘记 + 与 %20 的区别',
    mistake3_p: '在 <code>application/x-www-form-urlencoded</code> 格式（HTML 表单）中，空格编码为 <code>+</code>。在标准百分号编码（RFC 3986）中，空格为 <code>%20</code>。大多数服务端框架两者都支持，但 API 可能较严格。不确定时使用 <code>%20</code>。',
    mistake4_h3: '4. 未编码非 ASCII 字符',
    mistake4_p: '如中文、日文、表情符号等字符必须先转换为 UTF-8 编码，然后对每个字节进行百分号编码。忘记这一步会导致 URL 中出现乱码。',
    mistake5_h3: '5. 在服务端编码 Hash 片段',
    mistake5_p: '片段标识符（<code>#section</code>）不会发送到服务器——它仅在客户端使用。在服务端编码或处理它是无意义的。',
    mistake6_h3: '6. 在 JavaScript 中使用已弃用的 escape()',
    mistake6_p: '<code>escape()</code> 函数已被弃用，且不能正确处理 UTF-8。请始终使用 <code>encodeURI()</code> 或 <code>encodeURIComponent()</code>。',

    h2_when: '何时进行 URL 编码：查询参数、路径段、片段',
    when_p1: 'URL 的不同部分有不同的编码规则：',
    when_h3_1: '查询参数',
    when_p2: '始终编码参数的键和值。这是最常需要编码的地方。',
    when_h3_2: '路径段',
    when_p3: '分别编码每个路径段。作为 URL 结构的正斜杠（<code>/</code>）不应编码，但段值中的斜杠必须编码。',
    when_h3_3: '片段标识符',
    when_p4: '片段（<code>#</code> 之后的部分）遵循与查询字符串相同的编码规则。注意片段不会发送到服务器。',
    when_h3_4: '域名（主机名）',
    when_p5: '域名对国际化域名（IDN）使用 <strong>Punycode</strong>（而非百分号编码）。例如，带变音符的 <code>m\u00fcnchen.de</code> 变为 <code>xn--mnchen-3ya.de</code>。',

    h2_faq: '常见问题',
    faq1_q: '%20 和 + 表示空格有什么区别？',
    faq1_a: '两者都表示空格，但来自不同标准。<code>%20</code> 由 RFC 3986（URI 标准）定义，用于路径段和现代 API。<code>+</code> 由 <code>application/x-www-form-urlencoded</code> 格式（HTML 表单）定义。在查询字符串中，大多数服务器两者都接受。为了最大兼容性，使用 <code>%20</code>。',
    faq2_q: '应该编码 URL 路径中的正斜杠（/）吗？',
    faq2_a: '仅当斜杠是数据值的一部分（而非路径分隔符）时才需编码。例如，如果文件名包含斜杠，必须在路径段中编码为 <code>%2F</code>。分隔路径段的结构性斜杠永远不应编码。',
    faq3_q: '如何在 URL 中编码 Unicode 字符（如中文、阿拉伯文）？',
    faq3_a: '先将字符转换为 UTF-8 字节序列，然后对每个字节进行百分号编码。例如，"caf\u00e9"→ UTF-8 字节 <code>63 61 66 C3 A9</code> → e\u0301 变为 <code>%C3%A9</code>。现代编程语言的 URL 编码函数会自动处理这些。',
    faq4_q: 'URL 编码区分大小写吗？',
    faq4_a: '百分号编码中的十六进制数字不区分大小写（<code>%2f</code> 和 <code>%2F</code> 等价）。但 RFC 3986 建议使用大写字母（<code>%2F</code>）以保持一致性和规范化。',
    faq5_q: '需要编码整个 URL 还是只编码部分？',
    faq5_a: '永远不要一次性编码整个 URL。只编码各个组件——查询参数值、包含特殊字符的路径段和片段标识符。结构性字符（<code>://</code>、<code>/</code>、<code>?</code>、<code>=</code>、<code>&</code>）必须保持未编码以保留 URL 结构。',

    conclusion: 'URL 编码是 Web 开发的基础技能。收藏此参考表以便快速查阅，并使用我们的工具实时编码和解码 URL。',
    linkToolBottom: '使用我们的 URL 编码/解码工具编码和解码任何 URL →',
  },
};

export default function UrlEncodeSpecialCharacters({ lang }: { lang: string }) {
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

  const codeStyle: React.CSSProperties = { display: 'inline', background: 'rgba(139,92,246,0.1)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: 13 };
  const thStyle: React.CSSProperties = { padding: '8px 12px', textAlign: 'left' };
  const tdStyle: React.CSSProperties = { padding: '8px 12px' };
  const rowStyle: React.CSSProperties = { borderBottom: '1px solid var(--border-color)' };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: 24 };

  const encodingTable = [
    { char: '(space)', encoded: '%20', desc: lang === 'zh' ? '空格（也可用 + 表示）' : 'Space (also + in form data)', ascii: '32' },
    { char: '!', encoded: '%21', desc: lang === 'zh' ? '感叹号' : 'Exclamation mark', ascii: '33' },
    { char: '"', encoded: '%22', desc: lang === 'zh' ? '双引号' : 'Double quote', ascii: '34' },
    { char: '#', encoded: '%23', desc: lang === 'zh' ? '井号 / 片段标识符' : 'Hash / Fragment identifier', ascii: '35' },
    { char: '$', encoded: '%24', desc: lang === 'zh' ? '美元符号' : 'Dollar sign', ascii: '36' },
    { char: '%', encoded: '%25', desc: lang === 'zh' ? '百分号（编码的转义字符本身）' : 'Percent sign (the escape character itself)', ascii: '37' },
    { char: '&', encoded: '%26', desc: lang === 'zh' ? '与号 / 参数分隔符' : 'Ampersand / Parameter separator', ascii: '38' },
    { char: "'", encoded: '%27', desc: lang === 'zh' ? '单引号' : 'Single quote (apostrophe)', ascii: '39' },
    { char: '(', encoded: '%28', desc: lang === 'zh' ? '左圆括号' : 'Left parenthesis', ascii: '40' },
    { char: ')', encoded: '%29', desc: lang === 'zh' ? '右圆括号' : 'Right parenthesis', ascii: '41' },
    { char: '*', encoded: '%2A', desc: lang === 'zh' ? '星号' : 'Asterisk', ascii: '42' },
    { char: '+', encoded: '%2B', desc: lang === 'zh' ? '加号（表单中表示空格）' : 'Plus sign (space in form data)', ascii: '43' },
    { char: ',', encoded: '%2C', desc: lang === 'zh' ? '逗号' : 'Comma', ascii: '44' },
    { char: '/', encoded: '%2F', desc: lang === 'zh' ? '正斜杠 / 路径分隔符' : 'Forward slash / Path separator', ascii: '47' },
    { char: ':', encoded: '%3A', desc: lang === 'zh' ? '冒号（协议分隔符）' : 'Colon (scheme separator)', ascii: '58' },
    { char: ';', encoded: '%3B', desc: lang === 'zh' ? '分号' : 'Semicolon', ascii: '59' },
    { char: '<', encoded: '%3C', desc: lang === 'zh' ? '小于号' : 'Less than', ascii: '60' },
    { char: '=', encoded: '%3D', desc: lang === 'zh' ? '等号（键值分隔符）' : 'Equals sign (key-value separator)', ascii: '61' },
    { char: '>', encoded: '%3E', desc: lang === 'zh' ? '大于号' : 'Greater than', ascii: '62' },
    { char: '?', encoded: '%3F', desc: lang === 'zh' ? '问号（查询字符串起始符）' : 'Question mark (query string start)', ascii: '63' },
    { char: '@', encoded: '%40', desc: lang === 'zh' ? '@ 符号（邮箱 / 用户信息分隔）' : 'At sign (email / userinfo separator)', ascii: '64' },
    { char: '[', encoded: '%5B', desc: lang === 'zh' ? '左方括号' : 'Left square bracket', ascii: '91' },
    { char: '\\', encoded: '%5C', desc: lang === 'zh' ? '反斜杠' : 'Backslash', ascii: '92' },
    { char: ']', encoded: '%5D', desc: lang === 'zh' ? '右方括号' : 'Right square bracket', ascii: '93' },
    { char: '^', encoded: '%5E', desc: lang === 'zh' ? '脱字符' : 'Caret', ascii: '94' },
    { char: '`', encoded: '%60', desc: lang === 'zh' ? '反引号' : 'Backtick (grave accent)', ascii: '96' },
    { char: '{', encoded: '%7B', desc: lang === 'zh' ? '左花括号' : 'Left curly brace', ascii: '123' },
    { char: '|', encoded: '%7C', desc: lang === 'zh' ? '竖线' : 'Pipe (vertical bar)', ascii: '124' },
    { char: '}', encoded: '%7D', desc: lang === 'zh' ? '右花括号' : 'Right curly brace', ascii: '125' },
    { char: '~', encoded: '%7E', desc: lang === 'zh' ? '波浪号（RFC 3986 中为非保留字符）' : 'Tilde (unreserved in RFC 3986)', ascii: '126' },
    { char: '\\n', encoded: '%0A', desc: lang === 'zh' ? '换行符（LF）' : 'Line feed (newline)', ascii: '10' },
    { char: '\\r', encoded: '%0D', desc: lang === 'zh' ? '回车符（CR）' : 'Carriage return', ascii: '13' },
    { char: '\\t', encoded: '%09', desc: lang === 'zh' ? '制表符（Tab）' : 'Horizontal tab', ascii: '9' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/url-encoder`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What Is URL Encoding */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.what_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.what_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.what_p3 }} />

      <pre><code>{`// URL encoding example
Original:  https://example.com/search?q=hello world&lang=en
Encoded:   https://example.com/search?q=hello%20world&lang=en

// The space in "hello world" becomes %20
// The & and = remain unencoded (they are structural)`}</code></pre>

      {/* Section 2: Complete Reference Table */}
      <h2>{s.h2_table}</h2>
      <p>{s.table_desc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ ...thStyle, width: 90 }}>{s.th_char}</th>
              <th style={{ ...thStyle, width: 120 }}>{s.th_encoded}</th>
              <th style={{ ...thStyle, width: 70 }}>{s.th_ascii}</th>
              <th style={thStyle}>{s.th_desc}</th>
            </tr>
          </thead>
          <tbody>
            {encodingTable.map((row, i) => (
              <tr key={i} style={rowStyle}>
                <td style={tdStyle}><code style={codeStyle}>{row.char}</code></td>
                <td style={tdStyle}><code style={{ ...codeStyle, color: '#e53e3e', fontWeight: 600 }}>{row.encoded}</code></td>
                <td style={tdStyle}>{row.ascii}</td>
                <td style={tdStyle}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: Reserved vs Unreserved */}
      <h2>{s.h2_reserved}</h2>
      <p>{s.reserved_p1}</p>

      <h3>{s.reserved_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.reserved_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.reserved_list }} />

      <pre><code>{`// Reserved characters in RFC 3986
gen-delims  = : / ? # [ ] @
sub-delims  = ! $ & ' ( ) * + , ; =

// Example: & is reserved (parameter separator)
// To use & literally in a value, encode it:
?search=Tom%26Jerry    // searching for "Tom&Jerry"
?search=Tom&Jerry      // WRONG: "Jerry" becomes a separate param`}</code></pre>

      <h3>{s.unreserved_h3}</h3>
      <p>{s.unreserved_p}</p>
      <p dangerouslySetInnerHTML={{ __html: s.unreserved_list }} />

      <pre><code>{`// Unreserved characters (RFC 3986) — never need encoding
ALPHA  = A-Z / a-z
DIGIT  = 0-9
other  = - . _ ~

// These are always safe in any part of a URL:
https://example.com/my-file_name.v2~backup`}</code></pre>

      <p>{s.reserved_p3}</p>

      {/* Section 4: encodeURI vs encodeURIComponent */}
      <h2>{s.h2_encodeuri}</h2>
      <p>{s.encodeuri_p1}</p>

      <h3>{s.encodeuri_h3_1}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.encodeuri_desc1 }} />

      <pre><code>{`// encodeURI() — for complete URLs
const url = 'https://example.com/path name/file?q=hello world';
encodeURI(url);
// → "https://example.com/path%20name/file?q=hello%20world"
// Note: :, /, ?, = are NOT encoded (URL structure preserved)`}</code></pre>

      <h3>{s.encodeuri_h3_2}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.encodeuri_desc2 }} />

      <pre><code>{`// encodeURIComponent() — for parameter values
const query = 'price=100&currency=USD';
encodeURIComponent(query);
// → "price%3D100%26currency%3DUSD"
// Note: = and & ARE encoded (they're data, not structure)

// Correct usage: build URL piece by piece
const base = 'https://api.example.com/search';
const param = 'Tom & Jerry: The Movie';
const fullUrl = base + '?q=' + encodeURIComponent(param);
// → "https://api.example.com/search?q=Tom%20%26%20Jerry%3A%20The%20Movie"`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.encodeuri_rule }} />

      <pre><code>{`// Side-by-side comparison
const text = 'hello world & goodbye=fun';

encodeURI(text);
// → "hello%20world%20&%20goodbye=fun"
//    & and = are NOT encoded

encodeURIComponent(text);
// → "hello%20world%20%26%20goodbye%3Dfun"
//    & and = ARE encoded

// decodeURI() and decodeURIComponent() reverse the process
decodeURIComponent('%E4%B8%AD%E6%96%87'); // → "中文"`}</code></pre>

      {/* Section 5: URL Encoding in Different Languages */}
      <h2>{s.h2_languages}</h2>

      <h3>{s.lang_python}</h3>
      <pre><code>{`# Python 3 — urllib.parse
from urllib.parse import quote, quote_plus, unquote, urlencode

# Encode a path segment (spaces → %20)
quote('hello world/file name')
# → 'hello%20world/file%20name'   (/ is safe by default)

# Encode a path segment including /
quote('hello world/file name', safe='')
# → 'hello%20world%2Ffile%20name'

# Encode a query parameter value (spaces → +)
quote_plus('hello world&foo=bar')
# → 'hello+world%26foo%3Dbar'

# Build query string from dict
urlencode({'q': 'Tom & Jerry', 'page': '1'})
# → 'q=Tom+%26+Jerry&page=1'

# Decode
unquote('%E4%B8%AD%E6%96%87')  # → '中文'`}</code></pre>

      <h3>{s.lang_java}</h3>
      <pre><code>{`// Java — URLEncoder / URI
import java.net.URLEncoder;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

// Encode a query parameter value (spaces → +)
String encoded = URLEncoder.encode(
    "hello world&foo=bar", StandardCharsets.UTF_8
);
// → "hello+world%26foo%3Dbar"

// Decode
String decoded = URLDecoder.decode(
    "hello+world%26foo%3Dbar", StandardCharsets.UTF_8
);
// → "hello world&foo=bar"

// For path segments, use URI class
import java.net.URI;
URI uri = new URI("https", "example.com", "/path with spaces", "q=hello world", null);
// → https://example.com/path%20with%20spaces?q=hello%20world`}</code></pre>

      <h3>{s.lang_go}</h3>
      <pre><code>{`// Go — net/url package
package main

import (
    "fmt"
    "net/url"
)

func main() {
    // Encode a query parameter value
    encoded := url.QueryEscape("hello world&foo=bar")
    // → "hello+world%26foo%3Dbar"

    // Encode a path segment
    pathEncoded := url.PathEscape("hello world/file")
    // → "hello%20world%2Ffile"

    // Build a complete URL safely
    u := &url.URL{
        Scheme: "https",
        Host:   "example.com",
        Path:   "/search",
    }
    q := u.Query()
    q.Set("q", "Tom & Jerry")
    q.Set("lang", "en")
    u.RawQuery = q.Encode()
    fmt.Println(u.String())
    // → "https://example.com/search?lang=en&q=Tom+%26+Jerry"
}`}</code></pre>

      <h3>{s.lang_php}</h3>
      <pre><code>{`<?php
// PHP — urlencode / rawurlencode

// Query parameter encoding (spaces → +)
echo urlencode('hello world&foo=bar');
// → "hello+world%26foo%3Dbar"

// Path segment encoding (spaces → %20, RFC 3986)
echo rawurlencode('hello world&foo=bar');
// → "hello%20world%26foo%3Dbar"

// Build query string from array
echo http_build_query([
    'q' => 'Tom & Jerry',
    'page' => 1
]);
// → "q=Tom+%26+Jerry&page=1"

// Decode
echo urldecode('hello+world%26foo%3Dbar');
// → "hello world&foo=bar"

echo rawurldecode('hello%20world%26foo%3Dbar');
// → "hello world&foo=bar"
?>`}</code></pre>

      <h3>{s.lang_csharp}</h3>
      <pre><code>{`// C# — Uri.EscapeDataString / HttpUtility
using System;
using System.Web;

// Encode a URI component (RFC 3986)
string encoded = Uri.EscapeDataString("hello world&foo=bar");
// → "hello%20world%26foo%3Dbar"

// Encode for query string (spaces → +)
string queryEncoded = HttpUtility.UrlEncode("hello world&foo=bar");
// → "hello+world%26foo%3Dbar"

// Decode
string decoded = Uri.UnescapeDataString("hello%20world%26foo%3Dbar");
// → "hello world&foo=bar"

// Build query string
var query = HttpUtility.ParseQueryString(string.Empty);
query["q"] = "Tom & Jerry";
query["page"] = "1";
string queryString = query.ToString();
// → "q=Tom+%26+Jerry&page=1"`}</code></pre>

      <h3>{s.lang_ruby}</h3>
      <pre><code>{`# Ruby — URI / CGI
require 'uri'
require 'cgi'

# Encode a component (spaces → %20)
URI.encode_www_form_component('hello world&foo=bar')
# → "hello+world%26foo%3Dbar"

# Encode for path (spaces → %20)
URI::DEFAULT_PARSER.escape('hello world')
# → "hello%20world"

# Build query string
URI.encode_www_form('q' => 'Tom & Jerry', 'page' => '1')
# → "q=Tom+%26+Jerry&page=1"

# Decode
CGI.unescape('hello%20world%26foo%3Dbar')
# → "hello world&foo=bar"`}</code></pre>

      {/* Section 6: Common Mistakes */}
      <h2>{s.h2_mistakes}</h2>

      <h3>{s.mistake1_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.mistake1_p }} />
      <pre><code>{`// Double encoding example
const value = 'hello world';

// First encoding (correct)
const encoded = encodeURIComponent(value);
// → "hello%20world"

// Accidentally encoding again (BUG!)
const doubleEncoded = encodeURIComponent(encoded);
// → "hello%2520world"
//   %20 → %25 (the %) + 20 → %2520

// The server receives "hello%20world" instead of "hello world"
// Fix: only encode once, at the point where you build the URL`}</code></pre>

      <h3>{s.mistake2_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.mistake2_p }} />
      <pre><code>{`// WRONG: encoding the entire URL
const url = 'https://example.com/api?q=hello world';
encodeURIComponent(url);
// → "https%3A%2F%2Fexample.com%2Fapi%3Fq%3Dhello%20world"
// Completely broken URL!

// CORRECT: only encode the parameter value
const base = 'https://example.com/api';
const query = 'hello world';
const correctUrl = base + '?q=' + encodeURIComponent(query);
// → "https://example.com/api?q=hello%20world"`}</code></pre>

      <h3>{s.mistake3_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.mistake3_p }} />
      <pre><code>{`// + vs %20 for spaces
// Form data (application/x-www-form-urlencoded):
// "hello world" → "hello+world"

// RFC 3986 (URI standard):
// "hello world" → "hello%20world"

// In JavaScript:
encodeURIComponent('hello world');  // → "hello%20world"
// To get + for form data, replace after:
encodeURIComponent('hello world').replace(/%20/g, '+');
// → "hello+world"

// URLSearchParams automatically uses + for spaces:
new URLSearchParams({ q: 'hello world' }).toString();
// → "q=hello+world"`}</code></pre>

      <h3>{s.mistake4_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.mistake4_p }} />
      <pre><code>{`// Non-ASCII characters must be UTF-8 encoded first
encodeURIComponent('café');
// → "caf%C3%A9"   (é = 2 UTF-8 bytes: C3 A9)

encodeURIComponent('中文');
// → "%E4%B8%AD%E6%96%87"  (中 = 3 bytes, 文 = 3 bytes)

encodeURIComponent('🚀');
// → "%F0%9F%9A%80"   (rocket emoji = 4 UTF-8 bytes)`}</code></pre>

      <h3>{s.mistake5_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.mistake5_p }} />

      <h3>{s.mistake6_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.mistake6_p }} />
      <pre><code>{`// DEPRECATED — do NOT use
escape('hello world');   // → "hello%20world" (works for ASCII)
escape('café');          // → "caf%E9" (WRONG! not UTF-8)

// CORRECT alternatives
encodeURIComponent('café');  // → "caf%C3%A9" (correct UTF-8)`}</code></pre>

      {/* Section 7: When to Encode */}
      <h2>{s.h2_when}</h2>
      <p>{s.when_p1}</p>

      <pre><code>{`// URL anatomy and encoding zones
https://user:pass@example.com:8080/path/to/page?key=value&k2=v2#section
|____| |_______| |__________| |__||____________||________________||______|
scheme  userinfo    host      port    path         query string   fragment

// Each part has different encoding rules:`}</code></pre>

      <h3>{s.when_h3_1}</h3>
      <p>{s.when_p2}</p>
      <pre><code>{`// Query parameters: ALWAYS encode keys and values
const params = new URLSearchParams();
params.set('search', 'C++ programming');    // auto-encodes
params.set('filter', 'price>100&sale=true'); // auto-encodes
params.toString();
// → "search=C%2B%2B+programming&filter=price%3E100%26sale%3Dtrue"

// Or manually:
'?q=' + encodeURIComponent('price > $100 & discount = 20%')
// → "?q=price%20%3E%20%24100%20%26%20discount%20%3D%2020%25"`}</code></pre>

      <h3>{s.when_h3_2}</h3>
      <p>{s.when_p3}</p>
      <pre><code>{`// Path segments: encode each segment individually
const fileName = 'my report (final).pdf';
const path = '/files/' + encodeURIComponent(fileName);
// → "/files/my%20report%20(final).pdf"

// DO NOT encode the structural slashes:
// WRONG: encodeURIComponent('/files/my report.pdf')
// → "%2Ffiles%2Fmy%20report.pdf" (broken path)`}</code></pre>

      <h3>{s.when_h3_3}</h3>
      <p>{s.when_p4}</p>
      <pre><code>{`// Fragment: encode like query string values
const section = 'Q&A Section';
const url = '/page#' + encodeURIComponent(section);
// → "/page#Q%26A%20Section"

// Remember: browsers never send fragments to the server
// window.location.hash gives you the raw fragment`}</code></pre>

      <h3>{s.when_h3_4}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.when_p5 }} />
      <pre><code>{`// International Domain Names use Punycode, NOT percent encoding
// münchen.de → xn--mnchen-3ya.de
// 中文.com    → xn--fiq228c.com
// 日本語.jp   → xn--wgv71a309e.jp

// In JavaScript:
const url = new URL('https://münchen.de/path');
url.hostname;  // → "xn--mnchen-3ya.de" (auto-converted)`}</code></pre>

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />
      <h3>{s.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq4_a }} />
      <h3>{s.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq5_a }} />

      <p style={{ marginTop: 32 }}>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/url-encoder`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
