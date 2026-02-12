'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'JavaScript <strong>String.prototype.replace()</strong> and <strong>replaceAll()</strong> are two of the most frequently used methods for text manipulation. Combined with <strong>regular expressions</strong>, they unlock powerful pattern-based transformations: capture groups, named groups, callback functions, and more. This guide covers everything from basics to 15 production-ready examples you can copy-paste today.',
    link_tool: 'Test your regex patterns live in our Regex Tester \u2192',

    h2_replace_vs_replaceAll: '1. replace() vs replaceAll() \u2014 Key Difference',
    p_replace_vs_replaceAll: 'The fundamental difference: <code>replace()</code> only replaces the <strong>first</strong> match when given a string argument, while <code>replaceAll()</code> replaces <strong>every</strong> occurrence. When using a regex with the <code>/g</code> flag, both behave identically.',

    h2_basic_regex: '2. Basic Regex Replace: The /g Flag',
    p_basic_regex: 'To replace all occurrences with <code>replace()</code>, pass a regex with the global (<code>g</code>) flag. This has been the standard approach since ES3 and works in every JavaScript environment.',

    h2_capture_groups: '3. Capture Groups: $1, $2 in Replacement String',
    p_capture_groups: 'Capture groups <code>(...)</code> let you reference matched sub-expressions in the replacement string using <code>$1</code>, <code>$2</code>, etc. The entire match is available as <code>$&</code>.',

    h2_named_groups: '4. Named Capture Groups: (?<name>...)',
    p_named_groups: 'Named capture groups (ES2018) improve readability by assigning a name to each group. Reference them in the replacement string with <code>$&lt;name&gt;</code>.',

    h2_callback: '5. Callback Function: replace(regex, fn)',
    p_callback: 'For dynamic replacements, pass a function as the second argument. The callback receives the full match, each capture group, the offset, and the original string.',

    h2_examples: '6. 15 Practical Examples',
    p_examples: 'Each example below is a self-contained, runnable snippet. Copy-paste into your browser console or Node.js REPL to test immediately.',

    h3_ex1: 'Example 1: camelCase to kebab-case',
    h3_ex2: 'Example 2: Remove HTML Tags',
    h3_ex3: 'Example 3: Mask Email Address',
    h3_ex4: 'Example 4: Format Phone Number',
    h3_ex5: 'Example 5: Trim Extra Whitespace',
    h3_ex6: 'Example 6: Slugify a Title',
    h3_ex7: 'Example 7: Capitalize Each Word (Title Case)',
    h3_ex8: 'Example 8: Swap Two Words',
    h3_ex9: 'Example 9: Remove Consecutive Duplicate Words',
    h3_ex10: 'Example 10: Add Commas to Numbers',
    h3_ex11: 'Example 11: Extract Domain from URL',
    h3_ex12: 'Example 12: Replace Only the Nth Occurrence',
    h3_ex13: 'Example 13: Convert Template Variables',
    h3_ex14: 'Example 14: Escape HTML Entities',
    h3_ex15: 'Example 15: Censor Profanity with Asterisks',

    h2_replaceAll_string_vs_regex: '7. replaceAll with String vs Regex',
    p_replaceAll_string_vs_regex: '<code>replaceAll()</code> accepts both a string and a regex. When using a regex, the <code>g</code> flag is <strong>required</strong>, otherwise a <code>TypeError</code> is thrown. With a plain string, no special syntax is needed.',

    h2_performance: '8. Performance Tips',
    p_performance: 'String replacement with regex is fast for most use cases, but there are pitfalls to avoid in performance-critical code.',
    tip1: '<strong>Pre-compile regex outside loops:</strong> Creating a <code>new RegExp()</code> inside a loop is wasteful. Declare it once and reuse it.',
    tip2: '<strong>Avoid catastrophic backtracking:</strong> Patterns like <code>(a+)+b</code> can cause exponential execution time on non-matching input. Use atomic-style patterns or be specific with character classes.',
    tip3: '<strong>Use string methods when possible:</strong> If you are replacing a literal string (no pattern), <code>replaceAll(string, string)</code> is faster than a regex.',
    tip4: '<strong>Prefer non-capturing groups:</strong> Use <code>(?:...)</code> instead of <code>(...)</code> when you do not need backreferences. This reduces memory overhead.',
    tip5: '<strong>Benchmark with realistic data:</strong> Use <code>performance.now()</code> to measure replacement time on actual input sizes.',

    h2_typescript: '9. TypeScript Types for replace',
    p_typescript: 'TypeScript fully supports <code>replace()</code> and <code>replaceAll()</code> with proper type inference. Here are the key type signatures and patterns for type-safe replacements.',

    h2_faq: '10. Frequently Asked Questions',
    faq1_q: 'What is the difference between replace() and replaceAll() in JavaScript?',
    faq1_a: 'replace() with a string argument replaces only the first occurrence. replaceAll() replaces every occurrence. When using a regex with the /g flag, both methods produce the same result. replaceAll() was introduced in ES2021 and requires the /g flag when given a regex argument.',
    faq2_q: 'How do I use capture groups in JavaScript replace?',
    faq2_a: 'Wrap part of your regex in parentheses to create a capture group: /(\\w+)@(\\w+)/. In the replacement string, use $1 for the first group, $2 for the second, and so on. The full match is available as $&. In a callback function, capture groups are passed as the second, third, etc. parameters.',
    faq3_q: 'Can I use a function as the replacement in replace()?',
    faq3_a: 'Yes. Pass a function as the second argument: str.replace(/pattern/g, (match, p1, p2, offset, string) => { ... }). The function is called for every match and its return value is used as the replacement. This is the most powerful form of replace() and is essential for dynamic transformations.',
    faq4_q: 'Why does replaceAll() throw a TypeError with regex?',
    faq4_a: 'replaceAll() requires the /g (global) flag when given a regex argument. If you pass a regex without /g, JavaScript throws a TypeError: "String.prototype.replaceAll called with a non-global RegExp argument". This is by design to prevent accidental single-replacement behavior.',
    faq5_q: 'How do I replace a string in JavaScript without regex?',
    faq5_a: 'Use replaceAll(searchString, newString) for replacing all occurrences of a literal string, or split(search).join(replacement) as a fallback for older environments. For a single replacement, use replace(searchString, newString). These methods do not interpret special regex characters, so they are safer for user-supplied input.',

    p_conclusion: 'Bookmark this guide for your next string manipulation task. For interactive regex testing, try our tool below.',
    link_tool_bottom: 'Try the Regex Tester \u2192',
  },
  zh: {
    intro: 'JavaScript 的 <strong>String.prototype.replace()</strong> 和 <strong>replaceAll()</strong> 是最常用的文本处理方法。结合<strong>正则表达式</strong>，它们可以实现强大的模式匹配替换：捕获组、命名组、回调函数等。本指南涵盖从基础到 15 个可直接复制使用的生产级示例。',
    link_tool: '在我们的正则表达式测试器中在线测试你的正则 \u2192',

    h2_replace_vs_replaceAll: '1. replace() 与 replaceAll() \u2014 核心区别',
    p_replace_vs_replaceAll: '根本区别：当传入字符串参数时，<code>replace()</code> 只替换<strong>第一个</strong>匹配项，而 <code>replaceAll()</code> 替换<strong>所有</strong>匹配项。当使用带 <code>/g</code> 标志的正则时，两者行为完全一致。',

    h2_basic_regex: '2. 基本正则替换：/g 标志',
    p_basic_regex: '要用 <code>replace()</code> 替换所有匹配项，需传入带全局标志（<code>g</code>）的正则表达式。这是自 ES3 以来的标准做法，在所有 JavaScript 环境中都可用。',

    h2_capture_groups: '3. 捕获组：替换字符串中的 $1, $2',
    p_capture_groups: '捕获组 <code>(...)</code> 允许你在替换字符串中使用 <code>$1</code>、<code>$2</code> 等来引用匹配的子表达式。完整匹配可通过 <code>$&</code> 获取。',

    h2_named_groups: '4. 命名捕获组：(?<name>...)',
    p_named_groups: '命名捕获组（ES2018）通过为每个组分配名称来提高可读性。在替换字符串中使用 <code>$&lt;name&gt;</code> 来引用它们。',

    h2_callback: '5. 回调函数：replace(regex, fn)',
    p_callback: '对于动态替换，将函数作为第二个参数传入。回调函数接收完整匹配、每个捕获组、偏移量和原始字符串。',

    h2_examples: '6. 15 个实用示例',
    p_examples: '以下每个示例都是独立可运行的代码片段。复制粘贴到浏览器控制台或 Node.js REPL 中即可立即测试。',

    h3_ex1: '示例 1：camelCase 转 kebab-case',
    h3_ex2: '示例 2：移除 HTML 标签',
    h3_ex3: '示例 3：遮蔽邮箱地址',
    h3_ex4: '示例 4：格式化电话号码',
    h3_ex5: '示例 5：修剪多余空白',
    h3_ex6: '示例 6：生成 URL Slug',
    h3_ex7: '示例 7：每个单词首字母大写（Title Case）',
    h3_ex8: '示例 8：交换两个单词',
    h3_ex9: '示例 9：移除连续重复单词',
    h3_ex10: '示例 10：数字添加千分位逗号',
    h3_ex11: '示例 11：从 URL 提取域名',
    h3_ex12: '示例 12：只替换第 N 次出现',
    h3_ex13: '示例 13：转换模板变量',
    h3_ex14: '示例 14：转义 HTML 实体',
    h3_ex15: '示例 15：用星号屏蔽敏感词',

    h2_replaceAll_string_vs_regex: '7. replaceAll 的字符串与正则用法',
    p_replaceAll_string_vs_regex: '<code>replaceAll()</code> 同时接受字符串和正则表达式。使用正则时，<code>g</code> 标志是<strong>必需的</strong>，否则会抛出 <code>TypeError</code>。使用纯字符串时不需要特殊语法。',

    h2_performance: '8. 性能优化建议',
    p_performance: '正则替换在大多数场景下性能良好，但在性能敏感的代码中有一些需要避免的陷阱。',
    tip1: '<strong>在循环外预编译正则：</strong>在循环内创建 <code>new RegExp()</code> 是浪费的。声明一次并复用。',
    tip2: '<strong>避免灾难性回溯：</strong>像 <code>(a+)+b</code> 这样的模式在非匹配输入上可能导致指数级执行时间。使用原子式模式或更精确的字符类。',
    tip3: '<strong>能用字符串方法就用字符串方法：</strong>如果是替换字面量字符串（无模式），<code>replaceAll(string, string)</code> 比正则更快。',
    tip4: '<strong>优先使用非捕获组：</strong>不需要反向引用时使用 <code>(?:...)</code> 而非 <code>(...)</code>，可减少内存开销。',
    tip5: '<strong>用真实数据做基准测试：</strong>使用 <code>performance.now()</code> 来测量实际输入规模下的替换耗时。',

    h2_typescript: '9. TypeScript 中 replace 的类型',
    p_typescript: 'TypeScript 完全支持 <code>replace()</code> 和 <code>replaceAll()</code> 并提供正确的类型推断。以下是类型安全替换的关键类型签名和模式。',

    h2_faq: '10. 常见问题',
    faq1_q: 'JavaScript 中 replace() 和 replaceAll() 有什么区别？',
    faq1_a: '当传入字符串参数时，replace() 只替换第一个匹配项，replaceAll() 替换所有匹配项。当使用带 /g 标志的正则时，两者结果相同。replaceAll() 在 ES2021 引入，使用正则参数时必须带 /g 标志。',
    faq2_q: '如何在 JavaScript replace 中使用捕获组？',
    faq2_a: '将正则的一部分用圆括号包裹来创建捕获组：/(\\w+)@(\\w+)/。在替换字符串中，$1 表示第一个组，$2 表示第二个组，以此类推。完整匹配可用 $& 获取。在回调函数中，捕获组作为第二个、第三个等参数传入。',
    faq3_q: '可以在 replace() 中使用函数作为替换值吗？',
    faq3_a: '可以。将函数作为第二个参数传入：str.replace(/pattern/g, (match, p1, p2, offset, string) => { ... })。每次匹配都会调用该函数，其返回值用作替换内容。这是 replace() 最强大的形式，对于动态转换至关重要。',
    faq4_q: '为什么 replaceAll() 在使用正则时会抛出 TypeError？',
    faq4_a: '当传入正则参数时，replaceAll() 要求必须带 /g（全局）标志。如果传入不带 /g 的正则，JavaScript 会抛出 TypeError："String.prototype.replaceAll called with a non-global RegExp argument"。这是为了防止意外的单次替换行为而设计的。',
    faq5_q: '如何在 JavaScript 中不使用正则进行字符串替换？',
    faq5_a: '使用 replaceAll(searchString, newString) 替换所有字面量字符串匹配项，或在旧环境中使用 split(search).join(replacement) 作为兼容方案。单次替换用 replace(searchString, newString)。这些方法不会解析特殊正则字符，因此对用户输入更安全。',

    p_conclusion: '收藏本指南，方便下次字符串处理时查阅。要进行交互式正则测试，请试试下面的工具。',
    link_tool_bottom: '试试正则表达式测试器 \u2192',
  },
};

export default function JsStringReplaceRegex({ lang }: { lang: string }) {
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
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      <p>
        <a href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool}
        </a>
      </p>

      {/* ============================================================ */}
      {/* 1. replace() vs replaceAll() */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_replace_vs_replaceAll}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_replace_vs_replaceAll }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// replace() — only replaces the FIRST match with a string argument
const str = 'foo bar foo baz foo';

console.log(str.replace('foo', 'qux'));
// Output: "qux bar foo baz foo"

// replaceAll() — replaces EVERY match (ES2021)
console.log(str.replaceAll('foo', 'qux'));
// Output: "qux bar qux baz qux"

// replace() with regex /g — also replaces every match
console.log(str.replace(/foo/g, 'qux'));
// Output: "qux bar qux baz qux"`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Quick comparison table:
// ┌──────────────────────────────┬────────────────────┬──────────────────┐
// │ Method                       │ String arg         │ Regex /g arg     │
// ├──────────────────────────────┼────────────────────┼──────────────────┤
// │ str.replace(search, rep)     │ First match only   │ All matches      │
// │ str.replaceAll(search, rep)  │ All matches        │ All matches      │
// └──────────────────────────────┴────────────────────┴──────────────────┘`}</code></pre>

      {/* ============================================================ */}
      {/* 2. Basic Regex Replace */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_basic_regex}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_basic_regex }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Replace all digits with '#'
const masked = 'Order 12345, ID 67890'.replace(/\\d/g, '#');
console.log(masked);
// Output: "Order #####, ID #####"

// Replace all vowels (case-insensitive with 'i' flag)
const noVowels = 'Hello World'.replace(/[aeiou]/gi, '_');
console.log(noVowels);
// Output: "H_ll_ W_rld"

// Replace all whitespace sequences with a single space
const cleaned = 'too   many    spaces   here'.replace(/\\s+/g, ' ');
console.log(cleaned);
// Output: "too many spaces here"

// Remove all non-alphanumeric characters
const alphaOnly = 'Hello, World! @2024'.replace(/[^a-zA-Z0-9]/g, '');
console.log(alphaOnly);
// Output: "HelloWorld2024"

// Case-insensitive replacement
const result = 'Hello HELLO hello'.replace(/hello/gi, 'hi');
console.log(result);
// Output: "hi hi hi"`}</code></pre>

      {/* ============================================================ */}
      {/* 3. Capture Groups */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_capture_groups}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_capture_groups }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Swap first and last name using $1 and $2
const name = 'John Smith';
const swapped = name.replace(/(\\w+) (\\w+)/, '$2, $1');
console.log(swapped);
// Output: "Smith, John"

// Reformat a date: MM/DD/YYYY → YYYY-MM-DD
const date = '12/25/2024';
const isoDate = date.replace(/(\\d{2})\\/(\\d{2})\\/(\\d{4})/, '$3-$1-$2');
console.log(isoDate);
// Output: "2024-12-25"

// Wrap each word in <strong> tags using $&
const bold = 'hello world'.replace(/\\w+/g, '<strong>$&</strong>');
console.log(bold);
// Output: "<strong>hello</strong> <strong>world</strong>"

// Use $\` (before match) and $' (after match)
const demo = 'abc-def-ghi'.replace(/-def-/, '[$\`|$&|$\\']');
console.log(demo);
// Output: "abc[abc|-def-|ghi]ghi"

// Multiple capture groups: restructure a log entry
const log = '[ERROR] 2024-01-15 Connection timeout';
const parsed = log.replace(
  /\\[(\\w+)\\] (\\d{4}-\\d{2}-\\d{2}) (.+)/,
  'Date: $2 | Level: $1 | Message: $3'
);
console.log(parsed);
// Output: "Date: 2024-01-15 | Level: ERROR | Message: Connection timeout"`}</code></pre>

      {/* ============================================================ */}
      {/* 4. Named Capture Groups */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_named_groups}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_named_groups }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Named capture groups with $<name> syntax (ES2018+)
const dateStr = '2024-12-25';
const formatted = dateStr.replace(
  /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/,
  '$<month>/$<day>/$<year>'
);
console.log(formatted);
// Output: "12/25/2024"

// Named groups in a callback function
const url = 'https://example.com:8080/path';
const parts = url.replace(
  /(?<protocol>https?):\\/\\/(?<host>[^:]+):(?<port>\\d+)/,
  (match, _p1, _p2, _p3, _offset, _str, groups) => {
    return \`Protocol=\${groups.protocol} Host=\${groups.host} Port=\${groups.port}\`;
  }
);
console.log(parts);
// Output: "Protocol=https Host=example.com Port=8080/path"

// Combining named and numbered groups
const input = 'John Doe, age 30';
const output = input.replace(
  /(?<first>\\w+) (?<last>\\w+), age (?<age>\\d+)/,
  '$<last>, $<first> (age: $<age>)'
);
console.log(output);
// Output: "Doe, John (age: 30)"`}</code></pre>

      {/* ============================================================ */}
      {/* 5. Callback Function */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_callback}</h2>
      <p>{t.p_callback}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Callback signature:
// replace(regex, (match, p1, p2, ..., offset, string, groups) => newString)

// Uppercase every word
const title = 'the quick brown fox'.replace(
  /\\b\\w/g,
  (char) => char.toUpperCase()
);
console.log(title);
// Output: "The Quick Brown Fox"

// Double every number found in a string
const doubled = 'I have 3 cats and 12 fish'.replace(
  /\\d+/g,
  (match) => String(Number(match) * 2)
);
console.log(doubled);
// Output: "I have 6 cats and 24 fish"

// Convert hex color to rgb
const hexToRgb = '#ff8800'.replace(
  /#([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})/i,
  (_match, r, g, b) => {
    return \`rgb(\${parseInt(r, 16)}, \${parseInt(g, 16)}, \${parseInt(b, 16)})\`;
  }
);
console.log(hexToRgb);
// Output: "rgb(255, 136, 0)"

// Use offset parameter: show match positions
const positions: string[] = [];
'abcabc'.replace(/b/g, (match, offset) => {
  positions.push(\`"\${match}" at index \${offset}\`);
  return match;
});
console.log(positions);
// Output: ['"b" at index 1', '"b" at index 4']

// Conditional replacement based on capture groups
const env = 'DB_HOST=localhost DB_PORT=5432 DB_PASS=secret123';
const redacted = env.replace(
  /(\\w+)=(\\S+)/g,
  (_match, key, value) => {
    return key.includes('PASS') ? \`\${key}=****\` : \`\${key}=\${value}\`;
  }
);
console.log(redacted);
// Output: "DB_HOST=localhost DB_PORT=5432 DB_PASS=****"`}</code></pre>

      {/* ============================================================ */}
      {/* 6. 15 Practical Examples */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_examples}</h2>
      <p>{t.p_examples}</p>

      {/* Example 1 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex1}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

console.log(camelToKebab('backgroundColor'));  // "background-color"
console.log(camelToKebab('fontSize'));          // "font-size"
console.log(camelToKebab('borderTopWidth'));    // "border-top-width"
console.log(camelToKebab('XMLHttpRequest'));    // "xmlhttp-request"`}</code></pre>

      {/* Example 2 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex2}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}

console.log(stripHtml('<p>Hello <b>world</b></p>'));
// Output: "Hello world"

console.log(stripHtml('<div class="test">Content <br/> here</div>'));
// Output: "Content  here"

// Also remove &entities;
function stripHtmlFull(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-zA-Z]+;/g, ' ')
    .replace(/\\s+/g, ' ')
    .trim();
}

console.log(stripHtmlFull('<p>Price:&nbsp;$100&amp;up</p>'));
// Output: "Price: $100 up"`}</code></pre>

      {/* Example 3 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex3}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function maskEmail(email) {
  return email.replace(
    /^(.)(.*)(@.+)$/,
    (_match, first, middle, domain) => {
      return first + '*'.repeat(middle.length) + domain;
    }
  );
}

console.log(maskEmail('alice@example.com'));   // "a****@example.com"
console.log(maskEmail('bob@gmail.com'));       // "b**@gmail.com"
console.log(maskEmail('charlie@company.io')); // "c******@company.io"`}</code></pre>

      {/* Example 4 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex4}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function formatPhone(phone) {
  // Strip all non-digits first
  const digits = phone.replace(/\\D/g, '');
  // Format as (xxx) xxx-xxxx
  return digits.replace(/(\\d{3})(\\d{3})(\\d{4})/, '($1) $2-$3');
}

console.log(formatPhone('1234567890'));     // "(123) 456-7890"
console.log(formatPhone('123-456-7890'));   // "(123) 456-7890"
console.log(formatPhone('(123) 456 7890')); // "(123) 456-7890"
console.log(formatPhone('+1-234-567-8901')); // "(123) 456-7890" (first digit stripped)

// International format variant
function formatPhoneIntl(phone) {
  const digits = phone.replace(/\\D/g, '');
  return digits.replace(/(\\d{1})(\\d{3})(\\d{3})(\\d{4})/, '+$1 ($2) $3-$4');
}

console.log(formatPhoneIntl('12345678901')); // "+1 (234) 567-8901"`}</code></pre>

      {/* Example 5 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex5}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function trimWhitespace(str) {
  return str
    .replace(/^\\s+|\\s+$/g, '')   // trim leading & trailing
    .replace(/\\s+/g, ' ');         // collapse internal spaces
}

console.log(trimWhitespace('  hello   world  '));
// Output: "hello world"

console.log(trimWhitespace('\\t  line1  \\n  line2  \\t'));
// Output: "line1 line2"

// Remove blank lines from multiline text
function removeBlankLines(text) {
  return text.replace(/^\\s*\\n/gm, '');
}

console.log(removeBlankLines('line1\\n\\n\\nline2\\n\\nline3'));
// Output: "line1\\nline2\\nline3"`}</code></pre>

      {/* Example 6 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex6}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\\s-]/g, '')   // remove special chars
    .replace(/\\s+/g, '-')            // spaces to hyphens
    .replace(/-+/g, '-')             // collapse multiple hyphens
    .replace(/^-|-$/g, '');          // trim leading/trailing hyphens
}

console.log(slugify('Hello World!'));
// Output: "hello-world"

console.log(slugify('  JavaScript String Replace --- with Regex!  '));
// Output: "javascript-string-replace-with-regex"

console.log(slugify('10 Tips & Tricks for React.js'));
// Output: "10-tips--tricks-for-reactjs"`}</code></pre>

      {/* Example 7 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex7}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function titleCase(str) {
  return str
    .toLowerCase()
    .replace(/\\b\\w/g, (char) => char.toUpperCase());
}

console.log(titleCase('hello world'));           // "Hello World"
console.log(titleCase('JAVASCRIPT IS FUN'));     // "Javascript Is Fun"
console.log(titleCase('the quick brown fox'));   // "The Quick Brown Fox"

// Smarter version: skip small words (a, an, the, in, on, etc.)
function smartTitleCase(str) {
  const small = new Set(['a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'but', 'or']);
  return str
    .toLowerCase()
    .replace(/\\b\\w+/g, (word, index) => {
      if (index > 0 && small.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
}

console.log(smartTitleCase('the lord of the rings'));
// Output: "The Lord of the Rings"`}</code></pre>

      {/* Example 8 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex8}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function swapWords(str, word1, word2) {
  const regex = new RegExp(\`\\\\b(\${word1}|\${word2})\\\\b\`, 'gi');
  return str.replace(regex, (match) => {
    return match.toLowerCase() === word1.toLowerCase() ? word2 : word1;
  });
}

console.log(swapWords('Hello World', 'Hello', 'World'));
// Output: "World Hello"

console.log(swapWords('left is right and right is left', 'left', 'right'));
// Output: "right is left and left is right"

// Swap using capture groups only (no function needed)
const swapped = 'foo bar'.replace(/(\\w+) (\\w+)/, '$2 $1');
console.log(swapped);
// Output: "bar foo"`}</code></pre>

      {/* Example 9 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex9}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function removeDuplicateWords(str) {
  return str.replace(/\\b(\\w+)\\s+\\1\\b/gi, '$1');
}

console.log(removeDuplicateWords('the the quick brown fox'));
// Output: "the quick brown fox"

console.log(removeDuplicateWords('hello hello world world'));
// Output: "hello world"

console.log(removeDuplicateWords('I I am am very very happy'));
// Output: "I am very happy"

// Remove all consecutive duplicates (even more than 2)
function removeAllDuplicateWords(str) {
  return str.replace(/\\b(\\w+)(?:\\s+\\1)+\\b/gi, '$1');
}

console.log(removeAllDuplicateWords('no no no no duplicates'));
// Output: "no duplicates"`}</code></pre>

      {/* Example 10 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex10}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function addCommas(num) {
  return num.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
}

console.log(addCommas(1234567));       // "1,234,567"
console.log(addCommas(1000));          // "1,000"
console.log(addCommas(100));           // "100"
console.log(addCommas(1234567890));    // "1,234,567,890"

// Handle decimals too
function addCommasDecimal(numStr) {
  const [integer, decimal] = numStr.split('.');
  const formatted = integer.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
  return decimal ? \`\${formatted}.\${decimal}\` : formatted;
}

console.log(addCommasDecimal('1234567.89'));  // "1,234,567.89"
console.log(addCommasDecimal('1000000.5'));   // "1,000,000.5"`}</code></pre>

      {/* Example 11 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex11}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function extractDomain(url) {
  return url.replace(/^(?:https?:\\/\\/)?(?:www\\.)?([^\\/:]+).*$/, '$1');
}

console.log(extractDomain('https://www.example.com/path'));
// Output: "example.com"

console.log(extractDomain('http://blog.example.com:8080/post'));
// Output: "blog.example.com"

console.log(extractDomain('https://sub.domain.co.uk/page?q=1'));
// Output: "sub.domain.co.uk"

// Extract just the root domain (without subdomains)
function extractRootDomain(url) {
  const domain = url.replace(/^(?:https?:\\/\\/)?(?:www\\.)?([^\\/:]+).*$/, '$1');
  const parts = domain.split('.');
  return parts.slice(-2).join('.');
}

console.log(extractRootDomain('https://blog.shop.example.com'));
// Output: "example.com"`}</code></pre>

      {/* Example 12 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex12}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function replaceNth(str, pattern, replacement, n) {
  let count = 0;
  return str.replace(new RegExp(pattern, 'g'), (match) => {
    count++;
    return count === n ? replacement : match;
  });
}

console.log(replaceNth('a-b-c-d-e', '-', ' | ', 3));
// Output: "a-b-c | d-e"

console.log(replaceNth('foo bar foo baz foo', 'foo', 'QUX', 2));
// Output: "foo bar QUX baz foo"

// Replace every Nth occurrence
function replaceEveryNth(str, pattern, replacement, n) {
  let count = 0;
  return str.replace(new RegExp(pattern, 'g'), (match) => {
    count++;
    return count % n === 0 ? replacement : match;
  });
}

console.log(replaceEveryNth('a,b,c,d,e,f', ',', ' | ', 2));
// Output: "a,b | c,d | e,f"`}</code></pre>

      {/* Example 13 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex13}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function interpolate(template, data) {
  return template.replace(
    /\\{\\{\\s*(\\w+)\\s*\\}\\}/g,
    (_match, key) => data[key] ?? \`{{$\{key\}}}\`
  );
}

const tpl = 'Hello {{ name }}, welcome to {{ city }}!';
const data = { name: 'Alice', city: 'Tokyo' };

console.log(interpolate(tpl, data));
// Output: "Hello Alice, welcome to Tokyo!"

// With missing key fallback
console.log(interpolate('Hi {{name}}, your role is {{role}}', { name: 'Bob' }));
// Output: "Hi Bob, your role is {{role}}"

// Dollar-sign template syntax
function interpolateDollar(template, data) {
  return template.replace(
    /\\$\\{(\\w+)\\}/g,
    (_match, key) => data[key] ?? ''
  );
}

console.log(interpolateDollar('User: \${user}, ID: \${id}', { user: 'admin', id: '42' }));
// Output: "User: admin, ID: 42"`}</code></pre>

      {/* Example 14 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex14}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function escapeHtml(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, (char) => map[char]);
}

console.log(escapeHtml('<script>alert("XSS")</script>'));
// Output: "&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;"

console.log(escapeHtml('Price: $5 < $10 & "free" > \'nothing\''));
// Output: "Price: $5 &lt; $10 &amp; &quot;free&quot; &gt; &#039;nothing&#039;"

// Reverse: unescape HTML entities
function unescapeHtml(str) {
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
  };
  return str.replace(/&(?:amp|lt|gt|quot|#039);/g, (entity) => map[entity]);
}

console.log(unescapeHtml('&lt;p&gt;Hello&lt;/p&gt;'));
// Output: "<p>Hello</p>"`}</code></pre>

      {/* Example 15 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ex15}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`function censorWords(text, wordList) {
  const pattern = new RegExp(
    '\\\\b(' + wordList.join('|') + ')\\\\b',
    'gi'
  );
  return text.replace(pattern, (match) => '*'.repeat(match.length));
}

console.log(censorWords('This is a damn bad example', ['damn', 'bad']));
// Output: "This is a **** *** example"

console.log(censorWords('Foo and Bar walked into a baz', ['foo', 'bar', 'baz']));
// Output: "*** and *** walked into a ***"

// Partial censoring: keep first and last letter
function partialCensor(text, wordList) {
  const pattern = new RegExp('\\\\b(' + wordList.join('|') + ')\\\\b', 'gi');
  return text.replace(pattern, (match) => {
    if (match.length <= 2) return '*'.repeat(match.length);
    return match[0] + '*'.repeat(match.length - 2) + match[match.length - 1];
  });
}

console.log(partialCensor('That was a damn bad move', ['damn', 'bad']));
// Output: "That was a d**n b*d move"`}</code></pre>

      {/* ============================================================ */}
      {/* 7. replaceAll String vs Regex */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_replaceAll_string_vs_regex}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_replaceAll_string_vs_regex }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// ✅ replaceAll with a string — simple and effective
const str1 = 'foo.bar.baz';
console.log(str1.replaceAll('.', '/'));
// Output: "foo/bar/baz"

// ✅ replaceAll with regex + /g flag — works fine
const str2 = 'foo123bar456baz';
console.log(str2.replaceAll(/\\d+/g, '#'));
// Output: "foo#bar#baz"

// ❌ replaceAll with regex WITHOUT /g — throws TypeError!
try {
  'hello'.replaceAll(/hello/, 'world');
} catch (e) {
  console.log(e.message);
  // "String.prototype.replaceAll called with a non-global RegExp argument"
}

// String replaceAll does NOT interpret regex special chars
const str3 = 'price is $100.00 (USD)';
console.log(str3.replaceAll('$100.00', '€85.50'));
// Output: "price is €85.50 (USD)"
// No need to escape $ or . — they are treated as literal characters

// But replace() with string also only matches literally
const str4 = 'a.b.c';
console.log(str4.replace('.', '-'));  // "a-b.c" (first only)
console.log(str4.replaceAll('.', '-')); // "a-b-c" (all)`}</code></pre>

      {/* ============================================================ */}
      {/* 8. Performance Tips */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_performance}</h2>
      <p>{t.p_performance}</p>

      <ul className="list-disc pl-6 space-y-2">
        <li dangerouslySetInnerHTML={{ __html: t.tip1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.tip2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.tip3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.tip4 }} />
        <li dangerouslySetInnerHTML={{ __html: t.tip5 }} />
      </ul>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// ❌ Bad: regex created inside loop
function processItemsBad(items) {
  return items.map(item => item.replace(new RegExp('\\\\s+', 'g'), '-'));
}

// ✅ Good: regex pre-compiled outside loop
const WHITESPACE_RE = /\\s+/g;
function processItemsGood(items) {
  return items.map(item => item.replace(WHITESPACE_RE, '-'));
}

// ⚠️ Catastrophic backtracking example
// This pattern can hang the browser on non-matching input:
// const badRegex = /^(a+)+b$/;
// badRegex.test('aaaaaaaaaaaaaaaaaaaaaaaaaac'); // extremely slow!

// ✅ Safe equivalent:
const goodRegex = /^a+b$/;

// Benchmark template
function benchmark(fn, iterations = 100000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  const end = performance.now();
  console.log(\`\${iterations} iterations: \${(end - start).toFixed(2)}ms\`);
}

// Compare string vs regex performance
const testStr = 'hello world hello world hello world';
benchmark(() => testStr.replaceAll('hello', 'hi'));      // string method
benchmark(() => testStr.replace(/hello/g, 'hi'));         // regex method`}</code></pre>

      {/* ============================================================ */}
      {/* 9. TypeScript Types */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_typescript}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_typescript }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// TypeScript signatures for replace and replaceAll:
//
// interface String {
//   replace(searchValue: string | RegExp, replaceValue: string): string;
//   replace(searchValue: string | RegExp,
//           replacer: (substring: string, ...args: any[]) => string): string;
//   replaceAll(searchValue: string | RegExp, replaceValue: string): string;
//   replaceAll(searchValue: string | RegExp,
//              replacer: (substring: string, ...args: any[]) => string): string;
// }

// Type-safe replacement function
function safeReplace(
  input: string,
  pattern: string | RegExp,
  replacement: string
): string {
  return input.replace(pattern, replacement);
}

// Type-safe callback replacement
function mapReplace(
  input: string,
  pattern: RegExp,
  fn: (match: string, ...groups: string[]) => string
): string {
  return input.replace(pattern, fn);
}

// Usage examples
const result1: string = safeReplace('hello world', /world/g, 'TypeScript');
console.log(result1); // "hello TypeScript"

const result2: string = mapReplace('3 + 5 = 8', /\\d+/g, (match) => {
  return String(Number(match) * 10);
});
console.log(result2); // "30 + 50 = 80"

// Generic template literal type (TypeScript 4.1+)
type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends \`\${infer Before}\${From}\${infer After}\`
  ? \`\${Before}\${To}\${After}\`
  : S;

// Compile-time string replacement:
type Result = Replace<'Hello World', 'World', 'TS'>;
// type Result = "Hello TS"`}</code></pre>

      {/* ============================================================ */}
      {/* 10. FAQ */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq1_q}</h3>
      <p>{t.faq1_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq2_q}</h3>
      <p>{t.faq2_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq3_q}</h3>
      <p>{t.faq3_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq4_q}</h3>
      <p>{t.faq4_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq5_q}</h3>
      <p>{t.faq5_a}</p>

      {/* ============================================================ */}
      {/* CONCLUSION */}
      {/* ============================================================ */}
      <p className="mt-8">{t.p_conclusion}</p>
      <p>
        <a href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool_bottom}
        </a>
      </p>
    </article>
  );
}
