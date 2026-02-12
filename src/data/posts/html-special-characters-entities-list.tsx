'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'HTML entities let you display reserved characters, symbols, and special glyphs that would otherwise be interpreted as HTML code. This <strong>complete HTML special characters and entities reference</strong> provides copy-paste-ready tables covering essential characters, currency symbols, math operators, arrows, Greek letters, and typographic marks.',
    link_tool: 'Encode and decode HTML entities instantly with our HTML Escape / Unescape Tool \u2192',

    h2_what: 'What Are HTML Entities?',
    p_what_1: 'An <strong>HTML entity</strong> is a string that begins with <code>&amp;</code> and ends with <code>;</code>. It renders as a single character in the browser. Entities exist because certain characters are reserved in HTML (like <code>&lt;</code> and <code>&gt;</code>) or are not available on a standard keyboard (like <code>\u2022</code> or <code>\u00a9</code>).',
    p_what_2: 'Every entity can be written in three forms:',
    what_form_named: '<strong>Named entity</strong> \u2014 e.g. <code>&amp;amp;</code> (human-readable, but not every character has a name)',
    what_form_decimal: '<strong>Decimal numeric</strong> \u2014 e.g. <code>&amp;#38;</code> (works for any Unicode code point)',
    what_form_hex: '<strong>Hexadecimal numeric</strong> \u2014 e.g. <code>&amp;#x26;</code> (same coverage as decimal, shorter for large code points)',

    h2_essential: 'Essential Characters',
    p_essential: 'These six characters are the most frequently used HTML entities. The first five are critical because they have special meaning in HTML syntax.',
    th_char: 'Character',
    th_name: 'Named Entity',
    th_decimal: 'Decimal',
    th_hex: 'Hex',
    th_description: 'Description',

    h2_currency: 'Currency Symbols',
    p_currency: 'A comprehensive table of currency symbols used in international web development. Use these entities to ensure correct rendering regardless of font or encoding.',

    h2_math: 'Math Symbols & Operators',
    p_math: 'Mathematical symbols commonly used in documentation, scientific content, and UI labels.',

    h2_arrows: 'Arrows',
    p_arrows: 'Arrow characters for navigation, UI indicators, flow diagrams, and decorative purposes.',

    h2_greek: 'Greek Letters',
    p_greek: 'Greek letters are widely used in mathematics, science, and engineering documentation. Both uppercase and lowercase forms are listed.',

    h2_typography: 'Typography & Punctuation',
    p_typography: 'Typographic characters for professional-quality text rendering, including dashes, quotation marks, and legal symbols.',

    h2_howto: 'How to Use HTML Entities',
    p_howto_1: 'You can use any of the three forms interchangeably in your HTML. Here are examples:',
    howto_named_title: 'Named Entity (when available)',
    howto_decimal_title: 'Decimal Numeric Entity',
    howto_hex_title: 'Hexadecimal Numeric Entity',
    p_howto_2: 'All three lines above render the same <code>\u00a9</code> symbol. <strong>Named entities</strong> are the most readable in source code, but <strong>numeric entities</strong> support every Unicode character, including emoji and CJK characters.',
    p_howto_3: '<strong>Best practice:</strong> Always escape <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, and <code>&quot;</code> in user-generated content to prevent XSS attacks. Use named entities in hand-written HTML for readability, and numeric entities in generated output for maximum compatibility.',

    h2_js: 'Escaping HTML in JavaScript',
    p_js_1: 'When inserting user-provided text into the DOM, you must escape HTML special characters to prevent <strong>Cross-Site Scripting (XSS)</strong> attacks. Here are reliable approaches:',
    js_approach_1: 'Manual String Replacement',
    js_approach_2: 'Using the DOM (Browser-Safe)',
    js_approach_3: 'Decoding Entities Back to Text',
    js_approach_4: 'In React / JSX',
    p_js_react: 'React escapes text content by default. You only need to be careful with <code>dangerouslySetInnerHTML</code>:',
    p_js_2: '<strong>Rule of thumb:</strong> Never use <code>innerHTML</code> or <code>dangerouslySetInnerHTML</code> with unsanitized user input. Always sanitize with a library like <strong>DOMPurify</strong> if you must render HTML from external sources.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Do I need to use HTML entities for characters like \u00e9 or \u00f1 in UTF-8 pages?',
    faq1_a: 'No. If your page is served with <code>&lt;meta charset="UTF-8"&gt;</code> (which is the modern default), you can type accented characters directly. Entities are only required for HTML-reserved characters (<code>&lt; &gt; &amp; &quot;</code>) and characters not available on your keyboard.',
    faq2_q: 'What is the difference between &amp;nbsp; and a regular space?',
    faq2_a: 'A regular space (<code>U+0020</code>) can be collapsed by the browser \u2014 multiple spaces become one, and lines can break at spaces. A non-breaking space (<code>&amp;nbsp;</code>, <code>U+00A0</code>) prevents collapsing and prevents line breaks at that position. Use it to keep two words on the same line (e.g., "100&nbsp;km") or to add extra spacing in HTML.',
    faq3_q: 'Can I use emoji as HTML entities?',
    faq3_a: 'Yes. Every emoji has a Unicode code point. For example, the rocket emoji can be written as <code>&amp;#x1F680;</code> which renders as \uD83D\uDE80. However, modern browsers and UTF-8 encoding mean you can simply paste the emoji character directly.',
    faq4_q: 'Why does my HTML show &amp;amp; instead of &amp; on the page?',
    faq4_a: 'This means the text has been <strong>double-escaped</strong>. The source code contains <code>&amp;amp;amp;</code> instead of <code>&amp;amp;</code>. This commonly happens when a server or template engine escapes content that was already escaped. Check your rendering pipeline for redundant escaping steps.',
    faq5_q: 'Are HTML entities case-sensitive?',
    faq5_a: 'Yes, named entities are case-sensitive. <code>&amp;Amp;</code> is not valid \u2014 it must be <code>&amp;amp;</code>. Similarly, <code>&amp;Alpha;</code> (\u0391) and <code>&amp;alpha;</code> (\u03B1) are different characters (uppercase vs lowercase Greek alpha). Numeric entities are case-insensitive for the <code>x</code> prefix: <code>&amp;#X26;</code> and <code>&amp;#x26;</code> both work.',

    conclusion: 'Bookmark this page as your go-to reference for HTML entities. For quick encoding and decoding, use our tool below.',
    link_tool_bottom: 'Encode / Decode HTML entities with our HTML Escape Tool \u2192',
  },
  zh: {
    intro: 'HTML 实体让你能显示保留字符、符号和特殊字形，否则这些字符会被浏览器解释为 HTML 代码。本<strong>完整 HTML 特殊字符与实体参考表</strong>提供可直接复制的表格，涵盖必备字符、货币符号、数学运算符、箭头、希腊字母和排版符号。',
    link_tool: '使用我们的 HTML 转义/反转义工具即时编码和解码 HTML 实体 \u2192',

    h2_what: '什么是 HTML 实体？',
    p_what_1: '<strong>HTML 实体</strong>是以 <code>&amp;</code> 开头、以 <code>;</code> 结尾的字符串，在浏览器中渲染为单个字符。实体的存在是因为某些字符在 HTML 中是保留的（如 <code>&lt;</code> 和 <code>&gt;</code>），或者无法通过标准键盘输入（如 <code>\u2022</code> 或 <code>\u00a9</code>）。',
    p_what_2: '每个实体可以用三种形式书写：',
    what_form_named: '<strong>命名实体</strong> \u2014 例如 <code>&amp;amp;</code>（可读性好，但并非每个字符都有名称）',
    what_form_decimal: '<strong>十进制数字实体</strong> \u2014 例如 <code>&amp;#38;</code>（适用于任何 Unicode 码位）',
    what_form_hex: '<strong>十六进制数字实体</strong> \u2014 例如 <code>&amp;#x26;</code>（与十进制覆盖范围相同，大码位时更短）',

    h2_essential: '必备字符',
    p_essential: '这六个字符是最常用的 HTML 实体。前五个至关重要，因为它们在 HTML 语法中有特殊含义。',
    th_char: '字符',
    th_name: '命名实体',
    th_decimal: '十进制',
    th_hex: '十六进制',
    th_description: '说明',

    h2_currency: '货币符号',
    p_currency: '国际化网页开发中常用的货币符号综合表。使用这些实体可确保在任何字体和编码下正确渲染。',

    h2_math: '数学符号和运算符',
    p_math: '文档、科技内容和界面标签中常用的数学符号。',

    h2_arrows: '箭头符号',
    p_arrows: '用于导航、UI 指示器、流程图和装饰用途的箭头字符。',

    h2_greek: '希腊字母',
    p_greek: '希腊字母广泛应用于数学、科学和工程文档。下表列出大写和小写形式。',

    h2_typography: '排版与标点符号',
    p_typography: '用于专业排版的字符，包括破折号、引号和法律符号。',

    h2_howto: '如何使用 HTML 实体',
    p_howto_1: '你可以在 HTML 中互换使用这三种形式。以下是示例：',
    howto_named_title: '命名实体（如果可用）',
    howto_decimal_title: '十进制数字实体',
    howto_hex_title: '十六进制数字实体',
    p_howto_2: '以上三行渲染出相同的 <code>\u00a9</code> 符号。<strong>命名实体</strong>在源代码中最易读，但<strong>数字实体</strong>支持每个 Unicode 字符，包括表情符号和 CJK 字符。',
    p_howto_3: '<strong>最佳实践：</strong>在用户生成的内容中始终转义 <code>&lt;</code>、<code>&gt;</code>、<code>&amp;</code> 和 <code>&quot;</code> 以防止 XSS 攻击。在手写 HTML 中使用命名实体提高可读性，在自动生成的输出中使用数字实体以获得最大兼容性。',

    h2_js: '在 JavaScript 中转义 HTML',
    p_js_1: '将用户提供的文本插入 DOM 时，必须转义 HTML 特殊字符以防止<strong>跨站脚本攻击（XSS）</strong>。以下是可靠的方法：',
    js_approach_1: '手动字符串替换',
    js_approach_2: '使用 DOM（浏览器安全方式）',
    js_approach_3: '将实体解码回文本',
    js_approach_4: '在 React / JSX 中',
    p_js_react: 'React 默认会转义文本内容。只有使用 <code>dangerouslySetInnerHTML</code> 时才需要注意：',
    p_js_2: '<strong>经验法则：</strong>永远不要对未净化的用户输入使用 <code>innerHTML</code> 或 <code>dangerouslySetInnerHTML</code>。如果必须渲染来自外部源的 HTML，请使用 <strong>DOMPurify</strong> 等库进行净化。',

    h2_faq: '常见问题',
    faq1_q: '在 UTF-8 页面中，像 \u00e9 或 \u00f1 这样的字符需要使用 HTML 实体吗？',
    faq1_a: '不需要。如果你的页面使用 <code>&lt;meta charset="UTF-8"&gt;</code>（这是现代默认设置），可以直接输入带重音符号的字符。实体仅在 HTML 保留字符（<code>&lt; &gt; &amp; &quot;</code>）和键盘上无法输入的字符时才需要。',
    faq2_q: '&amp;nbsp; 和普通空格有什么区别？',
    faq2_a: '普通空格（<code>U+0020</code>）会被浏览器折叠——多个空格变成一个，行可以在空格处断开。不间断空格（<code>&amp;nbsp;</code>，<code>U+00A0</code>）防止折叠并防止在该位置断行。用于保持两个词在同一行（如"100&nbsp;km"）或在 HTML 中添加额外间距。',
    faq3_q: '可以将表情符号作为 HTML 实体使用吗？',
    faq3_a: '可以。每个表情符号都有 Unicode 码位。例如，火箭表情可以写成 <code>&amp;#x1F680;</code>，渲染为 \uD83D\uDE80。不过，现代浏览器和 UTF-8 编码意味着你可以直接粘贴表情字符。',
    faq4_q: '为什么我的 HTML 页面显示 &amp;amp; 而不是 &amp;？',
    faq4_a: '这意味着文本被<strong>双重转义</strong>了。源代码包含 <code>&amp;amp;amp;</code> 而不是 <code>&amp;amp;</code>。这通常发生在服务器或模板引擎转义了已经转义过的内容时。检查你的渲染管道是否有多余的转义步骤。',
    faq5_q: 'HTML 实体区分大小写吗？',
    faq5_a: '是的，命名实体区分大小写。<code>&amp;Amp;</code> 无效，必须写成 <code>&amp;amp;</code>。类似地，<code>&amp;Alpha;</code>（\u0391）和 <code>&amp;alpha;</code>（\u03B1）是不同的字符（大写与小写希腊字母 alpha）。数字实体中的 <code>x</code> 前缀不区分大小写：<code>&amp;#X26;</code> 和 <code>&amp;#x26;</code> 都有效。',

    conclusion: '收藏此页面作为你的 HTML 实体快速参考。如需快速编码和解码，请使用下方工具。',
    link_tool_bottom: '使用我们的 HTML 转义工具编码/解码 HTML 实体 \u2192',
  },
};

export default function HtmlSpecialCharactersList({ lang }: { lang: string }) {
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

  const codeStyle: React.CSSProperties = { display: 'inline', background: 'rgba(139,92,246,0.1)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: 13 };
  const thStyle: React.CSSProperties = { padding: '8px 12px', textAlign: 'left' };
  const tdStyle: React.CSSProperties = { padding: '8px 12px' };
  const headTr: React.CSSProperties = { borderBottom: '2px solid var(--border-color)' };
  const bodyTr: React.CSSProperties = { borderBottom: '1px solid var(--border-color)' };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: 24 };

  const R = ({ children }: { children: React.ReactNode }) => (
    <tr style={bodyTr}>{children}</tr>
  );
  const C = ({ children }: { children: React.ReactNode }) => (
    <td style={tdStyle}>{children}</td>
  );
  const Cd = ({ children }: { children: React.ReactNode }) => (
    <td style={tdStyle}><code style={codeStyle}>{children}</code></td>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />
      <p><a href={`/${lang}/tools/escape-unescape`} style={{ fontWeight: 600 }}>{t.link_tool}</a></p>

      {/* Section 1: What Are HTML Entities? */}
      <h2>{t.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_what_1 }} />
      <p>{t.p_what_2}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.what_form_named }} />
        <li dangerouslySetInnerHTML={{ __html: t.what_form_decimal }} />
        <li dangerouslySetInnerHTML={{ __html: t.what_form_hex }} />
      </ul>

      {/* Section 2: Essential Characters */}
      <h2>{t.h2_essential}</h2>
      <p>{t.p_essential}</p>
      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_char}</th>
            <th style={thStyle}>{t.th_name}</th>
            <th style={thStyle}>{t.th_decimal}</th>
            <th style={thStyle}>{t.th_hex}</th>
            <th style={thStyle}>{t.th_description}</th>
          </tr>
        </thead>
        <tbody>
          <R><C>&lt;</C><Cd>&amp;lt;</Cd><Cd>&amp;#60;</Cd><Cd>&amp;#x3C;</Cd><C>Less-than sign (opens HTML tags)</C></R>
          <R><C>&gt;</C><Cd>&amp;gt;</Cd><Cd>&amp;#62;</Cd><Cd>&amp;#x3E;</Cd><C>Greater-than sign (closes HTML tags)</C></R>
          <R><C>&amp;</C><Cd>&amp;amp;</Cd><Cd>&amp;#38;</Cd><Cd>&amp;#x26;</Cd><C>Ampersand (starts entity references)</C></R>
          <R><C>&quot;</C><Cd>&amp;quot;</Cd><Cd>&amp;#34;</Cd><Cd>&amp;#x22;</Cd><C>Double quotation mark (attribute delimiter)</C></R>
          <R><C>&apos;</C><Cd>&amp;apos;</Cd><Cd>&amp;#39;</Cd><Cd>&amp;#x27;</Cd><C>Apostrophe / single quote</C></R>
          <R><C>(space)</C><Cd>&amp;nbsp;</Cd><Cd>&amp;#160;</Cd><Cd>&amp;#xA0;</Cd><C>Non-breaking space</C></R>
        </tbody>
      </table>

      {/* Section 3: Currency Symbols */}
      <h2>{t.h2_currency}</h2>
      <p>{t.p_currency}</p>
      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_char}</th>
            <th style={thStyle}>{t.th_name}</th>
            <th style={thStyle}>{t.th_decimal}</th>
            <th style={thStyle}>{t.th_hex}</th>
            <th style={thStyle}>{t.th_description}</th>
          </tr>
        </thead>
        <tbody>
          <R><C>$</C><Cd>&amp;dollar;</Cd><Cd>&amp;#36;</Cd><Cd>&amp;#x24;</Cd><C>Dollar sign</C></R>
          <R><C>&euro;</C><Cd>&amp;euro;</Cd><Cd>&amp;#8364;</Cd><Cd>&amp;#x20AC;</Cd><C>Euro sign</C></R>
          <R><C>&pound;</C><Cd>&amp;pound;</Cd><Cd>&amp;#163;</Cd><Cd>&amp;#xA3;</Cd><C>Pound sterling</C></R>
          <R><C>&yen;</C><Cd>&amp;yen;</Cd><Cd>&amp;#165;</Cd><Cd>&amp;#xA5;</Cd><C>Yen / Yuan sign</C></R>
          <R><C>&#8377;</C><Cd>&amp;#8377;</Cd><Cd>&amp;#8377;</Cd><Cd>&amp;#x20B9;</Cd><C>Indian Rupee</C></R>
          <R><C>&#8382;</C><Cd>&amp;#8382;</Cd><Cd>&amp;#8382;</Cd><Cd>&amp;#x20BE;</Cd><C>Georgian Lari</C></R>
          <R><C>&#8381;</C><Cd>&amp;#8381;</Cd><Cd>&amp;#8381;</Cd><Cd>&amp;#x20BD;</Cd><C>Russian Ruble</C></R>
          <R><C>&#8378;</C><Cd>&amp;#8378;</Cd><Cd>&amp;#8378;</Cd><Cd>&amp;#x20BA;</Cd><C>Turkish Lira</C></R>
          <R><C>&#8369;</C><Cd>&amp;#8369;</Cd><Cd>&amp;#8369;</Cd><Cd>&amp;#x20B1;</Cd><C>Philippine Peso</C></R>
          <R><C>&#8363;</C><Cd>&amp;#8363;</Cd><Cd>&amp;#8363;</Cd><Cd>&amp;#x20AB;</Cd><C>Vietnamese Dong</C></R>
          <R><C>&#8361;</C><Cd>&amp;#8361;</Cd><Cd>&amp;#8361;</Cd><Cd>&amp;#x20A9;</Cd><C>Korean Won</C></R>
          <R><C>&#8362;</C><Cd>&amp;#8362;</Cd><Cd>&amp;#8362;</Cd><Cd>&amp;#x20AA;</Cd><C>Israeli New Sheqel</C></R>
          <R><C>&cent;</C><Cd>&amp;cent;</Cd><Cd>&amp;#162;</Cd><Cd>&amp;#xA2;</Cd><C>Cent sign</C></R>
          <R><C>&curren;</C><Cd>&amp;curren;</Cd><Cd>&amp;#164;</Cd><Cd>&amp;#xA4;</Cd><C>General currency sign</C></R>
          <R><C>&#8383;</C><Cd>&amp;#8383;</Cd><Cd>&amp;#8383;</Cd><Cd>&amp;#x20BF;</Cd><C>Bitcoin sign</C></R>
          <R><C>&#8371;</C><Cd>&amp;#8371;</Cd><Cd>&amp;#8371;</Cd><Cd>&amp;#x20B3;</Cd><C>Austral sign</C></R>
          <R><C>&#402;</C><Cd>&amp;fnof;</Cd><Cd>&amp;#402;</Cd><Cd>&amp;#x192;</Cd><C>Florin / Guilder sign</C></R>
          <R><C>&#8370;</C><Cd>&amp;#8370;</Cd><Cd>&amp;#8370;</Cd><Cd>&amp;#x20B2;</Cd><C>Guarani sign</C></R>
        </tbody>
      </table>

      {/* Section 4: Math Symbols */}
      <h2>{t.h2_math}</h2>
      <p>{t.p_math}</p>
      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_char}</th>
            <th style={thStyle}>{t.th_name}</th>
            <th style={thStyle}>{t.th_decimal}</th>
            <th style={thStyle}>{t.th_hex}</th>
            <th style={thStyle}>{t.th_description}</th>
          </tr>
        </thead>
        <tbody>
          <R><C>&plusmn;</C><Cd>&amp;plusmn;</Cd><Cd>&amp;#177;</Cd><Cd>&amp;#xB1;</Cd><C>Plus-minus sign</C></R>
          <R><C>&times;</C><Cd>&amp;times;</Cd><Cd>&amp;#215;</Cd><Cd>&amp;#xD7;</Cd><C>Multiplication sign</C></R>
          <R><C>&divide;</C><Cd>&amp;divide;</Cd><Cd>&amp;#247;</Cd><Cd>&amp;#xF7;</Cd><C>Division sign</C></R>
          <R><C>=</C><Cd>&amp;equals;</Cd><Cd>&amp;#61;</Cd><Cd>&amp;#x3D;</Cd><C>Equals sign</C></R>
          <R><C>&ne;</C><Cd>&amp;ne;</Cd><Cd>&amp;#8800;</Cd><Cd>&amp;#x2260;</Cd><C>Not equal to</C></R>
          <R><C>&lt;</C><Cd>&amp;lt;</Cd><Cd>&amp;#60;</Cd><Cd>&amp;#x3C;</Cd><C>Less than</C></R>
          <R><C>&gt;</C><Cd>&amp;gt;</Cd><Cd>&amp;#62;</Cd><Cd>&amp;#x3E;</Cd><C>Greater than</C></R>
          <R><C>&le;</C><Cd>&amp;le;</Cd><Cd>&amp;#8804;</Cd><Cd>&amp;#x2264;</Cd><C>Less than or equal to</C></R>
          <R><C>&ge;</C><Cd>&amp;ge;</Cd><Cd>&amp;#8806;</Cd><Cd>&amp;#x2265;</Cd><C>Greater than or equal to</C></R>
          <R><C>&asymp;</C><Cd>&amp;asymp;</Cd><Cd>&amp;#8776;</Cd><Cd>&amp;#x2248;</Cd><C>Approximately equal</C></R>
          <R><C>&infin;</C><Cd>&amp;infin;</Cd><Cd>&amp;#8734;</Cd><Cd>&amp;#x221E;</Cd><C>Infinity</C></R>
          <R><C>&radic;</C><Cd>&amp;radic;</Cd><Cd>&amp;#8730;</Cd><Cd>&amp;#x221A;</Cd><C>Square root</C></R>
          <R><C>&sum;</C><Cd>&amp;sum;</Cd><Cd>&amp;#8721;</Cd><Cd>&amp;#x2211;</Cd><C>Summation (sigma)</C></R>
          <R><C>&prod;</C><Cd>&amp;prod;</Cd><Cd>&amp;#8719;</Cd><Cd>&amp;#x220F;</Cd><C>Product (pi)</C></R>
          <R><C>&int;</C><Cd>&amp;int;</Cd><Cd>&amp;#8747;</Cd><Cd>&amp;#x222B;</Cd><C>Integral</C></R>
          <R><C>&part;</C><Cd>&amp;part;</Cd><Cd>&amp;#8706;</Cd><Cd>&amp;#x2202;</Cd><C>Partial differential</C></R>
          <R><C>&nabla;</C><Cd>&amp;nabla;</Cd><Cd>&amp;#8711;</Cd><Cd>&amp;#x2207;</Cd><C>Nabla / gradient</C></R>
          <R><C>&permil;</C><Cd>&amp;permil;</Cd><Cd>&amp;#8240;</Cd><Cd>&amp;#x2030;</Cd><C>Per mille (per thousand)</C></R>
          <R><C>&deg;</C><Cd>&amp;deg;</Cd><Cd>&amp;#176;</Cd><Cd>&amp;#xB0;</Cd><C>Degree sign</C></R>
          <R><C>&micro;</C><Cd>&amp;micro;</Cd><Cd>&amp;#181;</Cd><Cd>&amp;#xB5;</Cd><C>Micro sign</C></R>
          <R><C>&sup2;</C><Cd>&amp;sup2;</Cd><Cd>&amp;#178;</Cd><Cd>&amp;#xB2;</Cd><C>Superscript two (squared)</C></R>
          <R><C>&sup3;</C><Cd>&amp;sup3;</Cd><Cd>&amp;#179;</Cd><Cd>&amp;#xB3;</Cd><C>Superscript three (cubed)</C></R>
          <R><C>&frac12;</C><Cd>&amp;frac12;</Cd><Cd>&amp;#189;</Cd><Cd>&amp;#xBD;</Cd><C>Fraction one half</C></R>
          <R><C>&frac14;</C><Cd>&amp;frac14;</Cd><Cd>&amp;#188;</Cd><Cd>&amp;#xBC;</Cd><C>Fraction one quarter</C></R>
          <R><C>&frac34;</C><Cd>&amp;frac34;</Cd><Cd>&amp;#190;</Cd><Cd>&amp;#xBE;</Cd><C>Fraction three quarters</C></R>
          <R><C>&isin;</C><Cd>&amp;isin;</Cd><Cd>&amp;#8712;</Cd><Cd>&amp;#x2208;</Cd><C>Element of</C></R>
          <R><C>&notin;</C><Cd>&amp;notin;</Cd><Cd>&amp;#8713;</Cd><Cd>&amp;#x2209;</Cd><C>Not an element of</C></R>
          <R><C>&sub;</C><Cd>&amp;sub;</Cd><Cd>&amp;#8834;</Cd><Cd>&amp;#x2282;</Cd><C>Subset of</C></R>
          <R><C>&sup;</C><Cd>&amp;sup;</Cd><Cd>&amp;#8835;</Cd><Cd>&amp;#x2283;</Cd><C>Superset of</C></R>
          <R><C>&cap;</C><Cd>&amp;cap;</Cd><Cd>&amp;#8745;</Cd><Cd>&amp;#x2229;</Cd><C>Intersection</C></R>
          <R><C>&cup;</C><Cd>&amp;cup;</Cd><Cd>&amp;#8746;</Cd><Cd>&amp;#x222A;</Cd><C>Union</C></R>
          <R><C>&and;</C><Cd>&amp;and;</Cd><Cd>&amp;#8743;</Cd><Cd>&amp;#x2227;</Cd><C>Logical AND</C></R>
          <R><C>&or;</C><Cd>&amp;or;</Cd><Cd>&amp;#8744;</Cd><Cd>&amp;#x2228;</Cd><C>Logical OR</C></R>
          <R><C>&not;</C><Cd>&amp;not;</Cd><Cd>&amp;#172;</Cd><Cd>&amp;#xAC;</Cd><C>Logical NOT</C></R>
          <R><C>&there4;</C><Cd>&amp;there4;</Cd><Cd>&amp;#8756;</Cd><Cd>&amp;#x2234;</Cd><C>Therefore</C></R>
          <R><C>&empty;</C><Cd>&amp;empty;</Cd><Cd>&amp;#8709;</Cd><Cd>&amp;#x2205;</Cd><C>Empty set</C></R>
        </tbody>
      </table>

      {/* Section 5: Arrows */}
      <h2>{t.h2_arrows}</h2>
      <p>{t.p_arrows}</p>
      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_char}</th>
            <th style={thStyle}>{t.th_name}</th>
            <th style={thStyle}>{t.th_decimal}</th>
            <th style={thStyle}>{t.th_hex}</th>
            <th style={thStyle}>{t.th_description}</th>
          </tr>
        </thead>
        <tbody>
          <R><C>&larr;</C><Cd>&amp;larr;</Cd><Cd>&amp;#8592;</Cd><Cd>&amp;#x2190;</Cd><C>Left arrow</C></R>
          <R><C>&uarr;</C><Cd>&amp;uarr;</Cd><Cd>&amp;#8593;</Cd><Cd>&amp;#x2191;</Cd><C>Up arrow</C></R>
          <R><C>&rarr;</C><Cd>&amp;rarr;</Cd><Cd>&amp;#8594;</Cd><Cd>&amp;#x2192;</Cd><C>Right arrow</C></R>
          <R><C>&darr;</C><Cd>&amp;darr;</Cd><Cd>&amp;#8595;</Cd><Cd>&amp;#x2193;</Cd><C>Down arrow</C></R>
          <R><C>&harr;</C><Cd>&amp;harr;</Cd><Cd>&amp;#8596;</Cd><Cd>&amp;#x2194;</Cd><C>Left-right arrow</C></R>
          <R><C>&#8597;</C><Cd>&amp;#8597;</Cd><Cd>&amp;#8597;</Cd><Cd>&amp;#x2195;</Cd><C>Up-down arrow</C></R>
          <R><C>&lArr;</C><Cd>&amp;lArr;</Cd><Cd>&amp;#8656;</Cd><Cd>&amp;#x21D0;</Cd><C>Left double arrow</C></R>
          <R><C>&uArr;</C><Cd>&amp;uArr;</Cd><Cd>&amp;#8657;</Cd><Cd>&amp;#x21D1;</Cd><C>Up double arrow</C></R>
          <R><C>&rArr;</C><Cd>&amp;rArr;</Cd><Cd>&amp;#8658;</Cd><Cd>&amp;#x21D2;</Cd><C>Right double arrow (implies)</C></R>
          <R><C>&dArr;</C><Cd>&amp;dArr;</Cd><Cd>&amp;#8659;</Cd><Cd>&amp;#x21D3;</Cd><C>Down double arrow</C></R>
          <R><C>&hArr;</C><Cd>&amp;hArr;</Cd><Cd>&amp;#8660;</Cd><Cd>&amp;#x21D4;</Cd><C>Left-right double arrow (iff)</C></R>
          <R><C>&#8629;</C><Cd>&amp;#8629;</Cd><Cd>&amp;#8629;</Cd><Cd>&amp;#x21B5;</Cd><C>Carriage return arrow</C></R>
          <R><C>&#8634;</C><Cd>&amp;#8634;</Cd><Cd>&amp;#8634;</Cd><Cd>&amp;#x21BA;</Cd><C>Counter-clockwise arrow</C></R>
          <R><C>&#8635;</C><Cd>&amp;#8635;</Cd><Cd>&amp;#8635;</Cd><Cd>&amp;#x21BB;</Cd><C>Clockwise arrow</C></R>
          <R><C>&#10140;</C><Cd>&amp;#10140;</Cd><Cd>&amp;#10140;</Cd><Cd>&amp;#x279C;</Cd><C>Heavy right arrow</C></R>
          <R><C>&#10132;</C><Cd>&amp;#10132;</Cd><Cd>&amp;#10132;</Cd><Cd>&amp;#x2794;</Cd><C>Right arrow heavy head</C></R>
          <R><C>&#8599;</C><Cd>&amp;#8599;</Cd><Cd>&amp;#8599;</Cd><Cd>&amp;#x2197;</Cd><C>North-east arrow</C></R>
          <R><C>&#8600;</C><Cd>&amp;#8600;</Cd><Cd>&amp;#8600;</Cd><Cd>&amp;#x2198;</Cd><C>South-east arrow</C></R>
          <R><C>&#8601;</C><Cd>&amp;#8601;</Cd><Cd>&amp;#8601;</Cd><Cd>&amp;#x2199;</Cd><C>South-west arrow</C></R>
          <R><C>&#8598;</C><Cd>&amp;#8598;</Cd><Cd>&amp;#8598;</Cd><Cd>&amp;#x2196;</Cd><C>North-west arrow</C></R>
        </tbody>
      </table>

      {/* Section 6: Greek Letters */}
      <h2>{t.h2_greek}</h2>
      <p>{t.p_greek}</p>
      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_char}</th>
            <th style={thStyle}>{t.th_name}</th>
            <th style={thStyle}>{t.th_decimal}</th>
            <th style={thStyle}>{t.th_hex}</th>
            <th style={thStyle}>{t.th_description}</th>
          </tr>
        </thead>
        <tbody>
          <R><C>&Alpha; / &alpha;</C><Cd>&amp;Alpha; / &amp;alpha;</Cd><Cd>&amp;#913; / &amp;#945;</Cd><Cd>&amp;#x391; / &amp;#x3B1;</Cd><C>Alpha</C></R>
          <R><C>&Beta; / &beta;</C><Cd>&amp;Beta; / &amp;beta;</Cd><Cd>&amp;#914; / &amp;#946;</Cd><Cd>&amp;#x392; / &amp;#x3B2;</Cd><C>Beta</C></R>
          <R><C>&Gamma; / &gamma;</C><Cd>&amp;Gamma; / &amp;gamma;</Cd><Cd>&amp;#915; / &amp;#947;</Cd><Cd>&amp;#x393; / &amp;#x3B3;</Cd><C>Gamma</C></R>
          <R><C>&Delta; / &delta;</C><Cd>&amp;Delta; / &amp;delta;</Cd><Cd>&amp;#916; / &amp;#948;</Cd><Cd>&amp;#x394; / &amp;#x3B4;</Cd><C>Delta</C></R>
          <R><C>&Epsilon; / &epsilon;</C><Cd>&amp;Epsilon; / &amp;epsilon;</Cd><Cd>&amp;#917; / &amp;#949;</Cd><Cd>&amp;#x395; / &amp;#x3B5;</Cd><C>Epsilon</C></R>
          <R><C>&Zeta; / &zeta;</C><Cd>&amp;Zeta; / &amp;zeta;</Cd><Cd>&amp;#918; / &amp;#950;</Cd><Cd>&amp;#x396; / &amp;#x3B6;</Cd><C>Zeta</C></R>
          <R><C>&Eta; / &eta;</C><Cd>&amp;Eta; / &amp;eta;</Cd><Cd>&amp;#919; / &amp;#951;</Cd><Cd>&amp;#x397; / &amp;#x3B7;</Cd><C>Eta</C></R>
          <R><C>&Theta; / &theta;</C><Cd>&amp;Theta; / &amp;theta;</Cd><Cd>&amp;#920; / &amp;#952;</Cd><Cd>&amp;#x398; / &amp;#x3B8;</Cd><C>Theta</C></R>
          <R><C>&Iota; / &iota;</C><Cd>&amp;Iota; / &amp;iota;</Cd><Cd>&amp;#921; / &amp;#953;</Cd><Cd>&amp;#x399; / &amp;#x3B9;</Cd><C>Iota</C></R>
          <R><C>&Kappa; / &kappa;</C><Cd>&amp;Kappa; / &amp;kappa;</Cd><Cd>&amp;#922; / &amp;#954;</Cd><Cd>&amp;#x39A; / &amp;#x3BA;</Cd><C>Kappa</C></R>
          <R><C>&Lambda; / &lambda;</C><Cd>&amp;Lambda; / &amp;lambda;</Cd><Cd>&amp;#923; / &amp;#955;</Cd><Cd>&amp;#x39B; / &amp;#x3BB;</Cd><C>Lambda</C></R>
          <R><C>&Mu; / &mu;</C><Cd>&amp;Mu; / &amp;mu;</Cd><Cd>&amp;#924; / &amp;#956;</Cd><Cd>&amp;#x39C; / &amp;#x3BC;</Cd><C>Mu</C></R>
          <R><C>&Nu; / &nu;</C><Cd>&amp;Nu; / &amp;nu;</Cd><Cd>&amp;#925; / &amp;#957;</Cd><Cd>&amp;#x39D; / &amp;#x3BD;</Cd><C>Nu</C></R>
          <R><C>&Xi; / &xi;</C><Cd>&amp;Xi; / &amp;xi;</Cd><Cd>&amp;#926; / &amp;#958;</Cd><Cd>&amp;#x39E; / &amp;#x3BE;</Cd><C>Xi</C></R>
          <R><C>&Omicron; / &omicron;</C><Cd>&amp;Omicron; / &amp;omicron;</Cd><Cd>&amp;#927; / &amp;#959;</Cd><Cd>&amp;#x39F; / &amp;#x3BF;</Cd><C>Omicron</C></R>
          <R><C>&Pi; / &pi;</C><Cd>&amp;Pi; / &amp;pi;</Cd><Cd>&amp;#928; / &amp;#960;</Cd><Cd>&amp;#x3A0; / &amp;#x3C0;</Cd><C>Pi</C></R>
          <R><C>&Rho; / &rho;</C><Cd>&amp;Rho; / &amp;rho;</Cd><Cd>&amp;#929; / &amp;#961;</Cd><Cd>&amp;#x3A1; / &amp;#x3C1;</Cd><C>Rho</C></R>
          <R><C>&Sigma; / &sigma;</C><Cd>&amp;Sigma; / &amp;sigma;</Cd><Cd>&amp;#931; / &amp;#963;</Cd><Cd>&amp;#x3A3; / &amp;#x3C3;</Cd><C>Sigma</C></R>
          <R><C>&Tau; / &tau;</C><Cd>&amp;Tau; / &amp;tau;</Cd><Cd>&amp;#932; / &amp;#964;</Cd><Cd>&amp;#x3A4; / &amp;#x3C4;</Cd><C>Tau</C></R>
          <R><C>&Upsilon; / &upsilon;</C><Cd>&amp;Upsilon; / &amp;upsilon;</Cd><Cd>&amp;#933; / &amp;#965;</Cd><Cd>&amp;#x3A5; / &amp;#x3C5;</Cd><C>Upsilon</C></R>
          <R><C>&Phi; / &phi;</C><Cd>&amp;Phi; / &amp;phi;</Cd><Cd>&amp;#934; / &amp;#966;</Cd><Cd>&amp;#x3A6; / &amp;#x3C6;</Cd><C>Phi</C></R>
          <R><C>&Chi; / &chi;</C><Cd>&amp;Chi; / &amp;chi;</Cd><Cd>&amp;#935; / &amp;#967;</Cd><Cd>&amp;#x3A7; / &amp;#x3C7;</Cd><C>Chi</C></R>
          <R><C>&Psi; / &psi;</C><Cd>&amp;Psi; / &amp;psi;</Cd><Cd>&amp;#936; / &amp;#968;</Cd><Cd>&amp;#x3A8; / &amp;#x3C8;</Cd><C>Psi</C></R>
          <R><C>&Omega; / &omega;</C><Cd>&amp;Omega; / &amp;omega;</Cd><Cd>&amp;#937; / &amp;#969;</Cd><Cd>&amp;#x3A9; / &amp;#x3C9;</Cd><C>Omega</C></R>
        </tbody>
      </table>

      {/* Section 7: Typography & Punctuation */}
      <h2>{t.h2_typography}</h2>
      <p>{t.p_typography}</p>
      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_char}</th>
            <th style={thStyle}>{t.th_name}</th>
            <th style={thStyle}>{t.th_decimal}</th>
            <th style={thStyle}>{t.th_hex}</th>
            <th style={thStyle}>{t.th_description}</th>
          </tr>
        </thead>
        <tbody>
          <R><C>&mdash;</C><Cd>&amp;mdash;</Cd><Cd>&amp;#8212;</Cd><Cd>&amp;#x2014;</Cd><C>Em dash</C></R>
          <R><C>&ndash;</C><Cd>&amp;ndash;</Cd><Cd>&amp;#8211;</Cd><Cd>&amp;#x2013;</Cd><C>En dash</C></R>
          <R><C>&hellip;</C><Cd>&amp;hellip;</Cd><Cd>&amp;#8230;</Cd><Cd>&amp;#x2026;</Cd><C>Horizontal ellipsis</C></R>
          <R><C>&copy;</C><Cd>&amp;copy;</Cd><Cd>&amp;#169;</Cd><Cd>&amp;#xA9;</Cd><C>Copyright sign</C></R>
          <R><C>&reg;</C><Cd>&amp;reg;</Cd><Cd>&amp;#174;</Cd><Cd>&amp;#xAE;</Cd><C>Registered trademark</C></R>
          <R><C>&trade;</C><Cd>&amp;trade;</Cd><Cd>&amp;#8482;</Cd><Cd>&amp;#x2122;</Cd><C>Trademark sign</C></R>
          <R><C>&bull;</C><Cd>&amp;bull;</Cd><Cd>&amp;#8226;</Cd><Cd>&amp;#x2022;</Cd><C>Bullet</C></R>
          <R><C>&middot;</C><Cd>&amp;middot;</Cd><Cd>&amp;#183;</Cd><Cd>&amp;#xB7;</Cd><C>Middle dot</C></R>
          <R><C>&sect;</C><Cd>&amp;sect;</Cd><Cd>&amp;#167;</Cd><Cd>&amp;#xA7;</Cd><C>Section sign</C></R>
          <R><C>&para;</C><Cd>&amp;para;</Cd><Cd>&amp;#182;</Cd><Cd>&amp;#xB6;</Cd><C>Pilcrow / paragraph sign</C></R>
          <R><C>&dagger;</C><Cd>&amp;dagger;</Cd><Cd>&amp;#8224;</Cd><Cd>&amp;#x2020;</Cd><C>Dagger</C></R>
          <R><C>&Dagger;</C><Cd>&amp;Dagger;</Cd><Cd>&amp;#8225;</Cd><Cd>&amp;#x2021;</Cd><C>Double dagger</C></R>
          <R><C>&lsquo;</C><Cd>&amp;lsquo;</Cd><Cd>&amp;#8216;</Cd><Cd>&amp;#x2018;</Cd><C>Left single quotation mark</C></R>
          <R><C>&rsquo;</C><Cd>&amp;rsquo;</Cd><Cd>&amp;#8217;</Cd><Cd>&amp;#x2019;</Cd><C>Right single quotation mark</C></R>
          <R><C>&ldquo;</C><Cd>&amp;ldquo;</Cd><Cd>&amp;#8220;</Cd><Cd>&amp;#x201C;</Cd><C>Left double quotation mark</C></R>
          <R><C>&rdquo;</C><Cd>&amp;rdquo;</Cd><Cd>&amp;#8221;</Cd><Cd>&amp;#x201D;</Cd><C>Right double quotation mark</C></R>
          <R><C>&laquo;</C><Cd>&amp;laquo;</Cd><Cd>&amp;#171;</Cd><Cd>&amp;#xAB;</Cd><C>Left guillemet (French quote)</C></R>
          <R><C>&raquo;</C><Cd>&amp;raquo;</Cd><Cd>&amp;#187;</Cd><Cd>&amp;#xBB;</Cd><C>Right guillemet (French quote)</C></R>
          <R><C>&lsaquo;</C><Cd>&amp;lsaquo;</Cd><Cd>&amp;#8249;</Cd><Cd>&amp;#x2039;</Cd><C>Single left-pointing angle quote</C></R>
          <R><C>&rsaquo;</C><Cd>&amp;rsaquo;</Cd><Cd>&amp;#8250;</Cd><Cd>&amp;#x203A;</Cd><C>Single right-pointing angle quote</C></R>
          <R><C>&ordf;</C><Cd>&amp;ordf;</Cd><Cd>&amp;#170;</Cd><Cd>&amp;#xAA;</Cd><C>Feminine ordinal indicator</C></R>
          <R><C>&ordm;</C><Cd>&amp;ordm;</Cd><Cd>&amp;#186;</Cd><Cd>&amp;#xBA;</Cd><C>Masculine ordinal indicator</C></R>
          <R><C>&iexcl;</C><Cd>&amp;iexcl;</Cd><Cd>&amp;#161;</Cd><Cd>&amp;#xA1;</Cd><C>Inverted exclamation mark</C></R>
          <R><C>&iquest;</C><Cd>&amp;iquest;</Cd><Cd>&amp;#191;</Cd><Cd>&amp;#xBF;</Cd><C>Inverted question mark</C></R>
          <R><C>&#9744;</C><Cd>&amp;#9744;</Cd><Cd>&amp;#9744;</Cd><Cd>&amp;#x2610;</Cd><C>Ballot box (unchecked)</C></R>
          <R><C>&#9745;</C><Cd>&amp;#9745;</Cd><Cd>&amp;#9745;</Cd><Cd>&amp;#x2611;</Cd><C>Ballot box with check</C></R>
          <R><C>&#9746;</C><Cd>&amp;#9746;</Cd><Cd>&amp;#9746;</Cd><Cd>&amp;#x2612;</Cd><C>Ballot box with X</C></R>
          <R><C>&#9733;</C><Cd>&amp;#9733;</Cd><Cd>&amp;#9733;</Cd><Cd>&amp;#x2605;</Cd><C>Black star</C></R>
          <R><C>&#9734;</C><Cd>&amp;#9734;</Cd><Cd>&amp;#9734;</Cd><Cd>&amp;#x2606;</Cd><C>White star</C></R>
          <R><C>&#9829;</C><Cd>&amp;hearts;</Cd><Cd>&amp;#9829;</Cd><Cd>&amp;#x2665;</Cd><C>Black heart</C></R>
          <R><C>&#9830;</C><Cd>&amp;diams;</Cd><Cd>&amp;#9830;</Cd><Cd>&amp;#x2666;</Cd><C>Black diamond</C></R>
          <R><C>&#9827;</C><Cd>&amp;clubs;</Cd><Cd>&amp;#9827;</Cd><Cd>&amp;#x2663;</Cd><C>Black club</C></R>
          <R><C>&#9824;</C><Cd>&amp;spades;</Cd><Cd>&amp;#9824;</Cd><Cd>&amp;#x2660;</Cd><C>Black spade</C></R>
        </tbody>
      </table>

      {/* Section 8: How to Use */}
      <h2>{t.h2_howto}</h2>
      <p>{t.p_howto_1}</p>

      <h3>{t.howto_named_title}</h3>
      <pre><code>{`<p>Copyright &copy; 2025 My Company</p>
<!-- Renders: Copyright \u00a9 2025 My Company -->`}</code></pre>

      <h3>{t.howto_decimal_title}</h3>
      <pre><code>{`<p>Copyright &#169; 2025 My Company</p>
<!-- Renders: Copyright \u00a9 2025 My Company -->`}</code></pre>

      <h3>{t.howto_hex_title}</h3>
      <pre><code>{`<p>Copyright &#xA9; 2025 My Company</p>
<!-- Renders: Copyright \u00a9 2025 My Company -->`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_howto_2 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_howto_3 }} />

      <pre><code>{`<!-- Always escape user content to prevent XSS -->
<p>User said: &lt;script&gt;alert('xss')&lt;/script&gt;</p>

<!-- Use entities for special typography -->
<p>Price: &pound;19.99 &mdash; Limited offer</p>
<p>Temperature: 72&deg;F &plusmn; 2&deg;</p>
<p>&copy; 2025 Company&trade; &bull; All rights reserved</p>

<!-- Non-breaking spaces to keep units together -->
<p>The file is 4.5&nbsp;GB in size.</p>
<p>The speed limit is 100&nbsp;km/h.</p>`}</code></pre>

      {/* Section 9: JavaScript Escaping */}
      <h2>{t.h2_js}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_js_1 }} />

      <h3>{t.js_approach_1}</h3>
      <pre><code>{`function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Usage
const userInput = '<script>alert("xss")</script>';
const safe = escapeHtml(userInput);
// Result: "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
document.getElementById('output').innerHTML = safe;`}</code></pre>

      <h3>{t.js_approach_2}</h3>
      <pre><code>{`function escapeHtmlDOM(text) {
  const div = document.createElement('div');
  div.textContent = text;     // textContent auto-escapes
  return div.innerHTML;        // returns escaped HTML
}

// Usage
const escaped = escapeHtmlDOM('<img onerror="alert(1)">');
// Result: "&lt;img onerror=&quot;alert(1)&quot;&gt;"`}</code></pre>

      <h3>{t.js_approach_3}</h3>
      <pre><code>{`function decodeHtmlEntities(html) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
}

// Usage
const decoded = decodeHtmlEntities('&lt;p&gt;Hello &amp; welcome&lt;/p&gt;');
// Result: "<p>Hello & welcome</p>"`}</code></pre>

      <h3>{t.js_approach_4}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_js_react }} />
      <pre><code>{`// SAFE: React auto-escapes this
function SafeComponent({ userInput }) {
  return <p>{userInput}</p>;
  // <script> tags in userInput are rendered as text, not executed
}

// DANGEROUS: Only use with sanitized HTML
import DOMPurify from 'dompurify';

function RichContent({ htmlContent }) {
  const clean = DOMPurify.sanitize(htmlContent);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// Node.js / Server-Side (no DOM available)
function escapeHtmlNode(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_js_2 }} />

      {/* Section 10: FAQ */}
      <h2>{t.h2_faq}</h2>
      <h3>{t.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq1_a }} />
      <h3>{t.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq2_a }} />
      <h3>{t.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq3_a }} />
      <h3>{t.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq4_a }} />
      <h3>{t.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq5_a }} />

      <p style={{ marginTop: 32 }}>{t.conclusion}</p>
      <p><a href={`/${lang}/tools/escape-unescape`} style={{ fontWeight: 600 }}>{t.link_tool_bottom}</a></p>
    </>
  );
}
