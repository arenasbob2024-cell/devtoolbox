import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Formatter & Validator: The Complete Guide for Developers',
    intro: 'A <strong>JSON formatter</strong> is an essential tool for developers working with APIs, configuration files, and data exchange. Whether you need to <strong>format JSON</strong> for readability, <strong>validate JSON online</strong> to catch syntax errors, or use a <strong>JSON beautifier</strong> to debug complex data structures, this comprehensive guide covers everything. Our free <strong>JSON formatter online</strong> tool provides instant formatting, validation, and minification directly in your browser.',
    linkTool: 'Try our free JSON Formatter & Validator tool →',

    h2_whatIsJson: 'What is JSON?',
    whatIsJsonDesc1: '<strong>JSON</strong> (JavaScript Object Notation) is a lightweight, text-based data format that is easy for humans to read and write, and easy for machines to parse and generate. It has become the de facto standard for data exchange in web APIs, configuration files, and NoSQL databases like MongoDB.',
    whatIsJsonDesc2: 'JSON consists of two primary structures: <strong>objects</strong> (unordered collections of name-value pairs) and <strong>arrays</strong> (ordered lists of values). Values can be strings, numbers, booleans, null, objects, or arrays. This simplicity makes JSON universally supported across virtually every programming language.',

    h2_whyNeedFormatter: 'Why You Need a JSON Formatter',
    whyNeedFormatterDesc1: '<strong>Readability</strong>: Raw JSON from APIs is often minified into a single line. A JSON formatter adds proper indentation and line breaks, making nested structures visually parseable. This is crucial when debugging API responses or analyzing large JSON files.',
    whyNeedFormatterDesc2: '<strong>Validation</strong>: A <strong>JSON validator</strong> catches syntax errors like trailing commas, missing quotes, or mismatched brackets before they cause runtime failures in your application.',
    whyNeedFormatterDesc3: '<strong>Debugging</strong>: When something goes wrong with an API, the first step is often to format and inspect the JSON structure. Proper formatting helps you spot missing fields, incorrect data types, or unexpected null values.',
    whyNeedFormatterDesc4: '<strong>Minification</strong>: When deploying to production, you want to <strong>minify JSON</strong> by removing whitespace to reduce file size and improve transmission speed over the network.',

    h2_commonErrors: 'Common JSON Syntax Errors',
    commonErrorsDesc: 'These are the most frequent mistakes that cause JSON parsing failures:',
    commonError1: '<strong>Trailing commas</strong>: JSON does not allow commas after the last item in an object or array. <code>{"a": 1, "b": 2,}</code> is invalid.',
    commonError2: '<strong>Single quotes</strong>: JSON requires double quotes for all strings and keys. <code>{\'name\': \'John\'}</code> is invalid.',
    commonError3: '<strong>Unquoted keys</strong>: Object keys must be double-quoted strings. <code>{name: "John"}</code> is invalid.',
    commonError4: '<strong>Comments</strong>: Standard JSON does not support comments. Use JSONC (JSON with Comments) if you need this feature.',
    commonError5: '<strong>Undefined or NaN</strong>: JSON only supports <code>null</code>, not <code>undefined</code>, <code>NaN</code>, or <code>Infinity</code>.',

    h2_howToFormat: 'How to Format JSON',
    howToFormatDesc: 'There are multiple ways to format JSON depending on your workflow:',
    howToFormatMethod1: '<strong>Online JSON formatter</strong>: Paste your data into our free tool for instant formatting and validation. No installation required.',
    howToFormatMethod2: '<strong>Command line with jq</strong>: Use <code>cat file.json | jq .</code> to pretty print JSON in the terminal.',
    howToFormatMethod3: '<strong>Python</strong>: Use <code>python -m json.tool file.json</code> or <code>json.dumps(data, indent=2)</code> in your scripts.',
    howToFormatMethod4: '<strong>JavaScript</strong>: Use <code>JSON.stringify(obj, null, 2)</code> to format with 2-space indentation.',
    howToFormatMethod5: '<strong>VS Code</strong>: Built-in JSON formatting with Shift+Alt+F or right-click → Format Document.',

    h2_bestPractices: 'JSON Best Practices',
    bestPractice1: '<strong>Use consistent naming</strong>: Choose camelCase or snake_case and apply it throughout your API.',
    bestPractice2: '<strong>Keep nesting shallow</strong>: Avoid deeply nested structures (more than 3-4 levels) as they become hard to read and parse.',
    bestPractice3: '<strong>Validate before deployment</strong>: Always validate JSON configuration files before deploying to production.',
    bestPractice4: '<strong>Use JSON Schema</strong>: Define schemas for your JSON data to enable automated validation and better documentation.',
    bestPractice5: '<strong>Handle dates carefully</strong>: Use ISO 8601 format (e.g., "2025-01-15T10:30:00Z") for dates in JSON.',

    h2_codeExamples: 'Code Examples',
    codeJsTitle: 'JavaScript: Format and Validate',
    codePythonTitle: 'Python: Format and Validate',
    codeCliTitle: 'Command Line: jq',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I format JSON online?',
    faq1_a: 'Simply paste your raw JSON into our online JSON formatter tool. It will automatically validate the syntax, add proper indentation, and highlight any errors with line numbers. You can choose between 2-space or 4-space indentation.',
    faq2_q: 'What is the difference between JSON and YAML?',
    faq2_a: 'JSON uses explicit syntax with braces, brackets, and quotes, making it ideal for machine parsing. YAML uses indentation and is more human-readable but can be ambiguous. JSON is a strict subset of YAML, meaning valid JSON is also valid YAML.',
    faq3_q: 'Why is my JSON invalid?',
    faq3_a: 'The most common causes are: trailing commas, using single quotes instead of double quotes, unquoted object keys, comments (not allowed in standard JSON), undefined values, and mismatched brackets.',

    conclusion: 'Mastering <strong>JSON formatting</strong> and <strong>JSON validation</strong> is an essential skill for modern developers. Whether you are debugging API responses, writing configuration files, or building data pipelines, understanding how to format JSON properly will save you countless hours.',
    linkToolBottom: 'Format, validate, and minify JSON with our free online tool →',
  },
  zh: {
    title: 'JSON 格式化工具与验证器：开发者完全指南',
    intro: '<strong>JSON 格式化工具</strong>是处理 API、配置文件和数据交换的开发者必备工具。无论你需要<strong>格式化 JSON</strong>以提高可读性、<strong>在线验证 JSON</strong>以捕获语法错误，还是使用 <strong>JSON 美化器</strong>来调试复杂数据结构，本综合指南涵盖了你所需的一切。我们的免费<strong>在线 JSON 格式化工具</strong>可直接在浏览器中提供即时格式化、验证和压缩功能。',
    linkTool: '立即试用我们的免费 JSON 格式化与验证工具 →',

    h2_whatIsJson: '什么是 JSON？',
    whatIsJsonDesc1: '<strong>JSON</strong>（JavaScript Object Notation）是一种轻量级、基于文本的数据格式，人类易于读写，机器易于解析和生成。它已成为 Web API、配置文件和 MongoDB 等 NoSQL 数据库中数据交换的事实标准。',
    whatIsJsonDesc2: 'JSON 由两种主要结构组成：<strong>对象</strong>（无序的键值对集合）和<strong>数组</strong>（有序的值列表）。值可以是字符串、数字、布尔值、null、对象或数组。这种简洁性使 JSON 几乎被所有编程语言普遍支持。',

    h2_whyNeedFormatter: '为什么需要 JSON 格式化工具',
    whyNeedFormatterDesc1: '<strong>可读性</strong>：来自 API 的原始 JSON 通常被压缩成一行。JSON 格式化工具添加适当的缩进和换行，使嵌套结构一目了然。这在调试 API 响应或分析大型 JSON 文件时至关重要。',
    whyNeedFormatterDesc2: '<strong>验证</strong>：<strong>JSON 验证器</strong>可以在语法错误导致应用程序运行时失败之前捕获它们，如尾部逗号、缺失引号或不匹配的括号。',
    whyNeedFormatterDesc3: '<strong>调试</strong>：当 API 出现问题时，第一步通常是格式化并检查 JSON 结构。正确的格式可以帮助你发现缺失的字段、错误的数据类型或意外的 null 值。',
    whyNeedFormatterDesc4: '<strong>压缩</strong>：部署到生产环境时，你需要通过移除空格来<strong>压缩 JSON</strong>，以减小文件大小并提高网络传输速度。',

    h2_commonErrors: '常见 JSON 语法错误',
    commonErrorsDesc: '以下是导致 JSON 解析失败的最常见错误：',
    commonError1: '<strong>尾部逗号</strong>：JSON 不允许在对象或数组的最后一项后面有逗号。<code>{"a": 1, "b": 2,}</code> 是无效的。',
    commonError2: '<strong>单引号</strong>：JSON 要求所有字符串和键使用双引号。<code>{\'name\': \'John\'}</code> 是无效的。',
    commonError3: '<strong>未加引号的键</strong>：对象键必须是双引号字符串。<code>{name: "John"}</code> 是无效的。',
    commonError4: '<strong>注释</strong>：标准 JSON 不支持注释。如需此功能，请使用 JSONC（带注释的 JSON）。',
    commonError5: '<strong>Undefined 或 NaN</strong>：JSON 只支持 <code>null</code>，不支持 <code>undefined</code>、<code>NaN</code> 或 <code>Infinity</code>。',

    h2_howToFormat: '如何格式化 JSON',
    howToFormatDesc: '根据你的工作流程，有多种方式可以格式化 JSON：',
    howToFormatMethod1: '<strong>在线 JSON 格式化工具</strong>：将数据粘贴到我们的免费工具中，即时格式化和验证。无需安装。',
    howToFormatMethod2: '<strong>命令行 jq</strong>：使用 <code>cat file.json | jq .</code> 在终端中美化打印 JSON。',
    howToFormatMethod3: '<strong>Python</strong>：使用 <code>python -m json.tool file.json</code> 或在脚本中使用 <code>json.dumps(data, indent=2)</code>。',
    howToFormatMethod4: '<strong>JavaScript</strong>：使用 <code>JSON.stringify(obj, null, 2)</code> 进行 2 空格缩进格式化。',
    howToFormatMethod5: '<strong>VS Code</strong>：内置 JSON 格式化，使用 Shift+Alt+F 或右键 → 格式化文档。',

    h2_bestPractices: 'JSON 最佳实践',
    bestPractice1: '<strong>使用一致的命名规范</strong>：选择 camelCase 或 snake_case 并在整个 API 中统一应用。',
    bestPractice2: '<strong>保持嵌套浅层</strong>：避免深度嵌套的结构（超过 3-4 层），因为它们难以阅读和解析。',
    bestPractice3: '<strong>部署前验证</strong>：在部署到生产环境之前，始终验证 JSON 配置文件。',
    bestPractice4: '<strong>使用 JSON Schema</strong>：为 JSON 数据定义模式，以实现自动验证和更好的文档。',
    bestPractice5: '<strong>小心处理日期</strong>：在 JSON 中使用 ISO 8601 格式（例如 "2025-01-15T10:30:00Z"）表示日期。',

    h2_codeExamples: '代码示例',
    codeJsTitle: 'JavaScript：格式化和验证',
    codePythonTitle: 'Python：格式化和验证',
    codeCliTitle: '命令行：jq',

    h2_faq: '常见问题',
    faq1_q: '如何在线格式化 JSON？',
    faq1_a: '只需将原始 JSON 粘贴到我们的在线 JSON 格式化工具中。它会自动验证语法、添加适当的缩进，并用行号高亮显示任何错误。你可以选择 2 空格或 4 空格缩进。',
    faq2_q: 'JSON 和 YAML 有什么区别？',
    faq2_a: 'JSON 使用显式语法，包括花括号、方括号和引号，非常适合机器解析。YAML 使用缩进，对人类更友好，但可能产生歧义。JSON 是 YAML 的严格子集，意味着有效的 JSON 也是有效的 YAML。',
    faq3_q: '为什么我的 JSON 无效？',
    faq3_a: '最常见的原因包括：尾部逗号、使用单引号而不是双引号、未加引号的对象键、注释（标准 JSON 不允许）、undefined 值和不匹配的括号。',

    conclusion: '掌握 <strong>JSON 格式化</strong>和 <strong>JSON 验证</strong>是现代开发者的必备技能。无论你是调试 API 响应、编写配置文件还是构建数据管道，了解如何正确格式化 JSON 都将为你节省无数时间。',
    linkToolBottom: '使用我们的免费在线工具格式化、验证和压缩 JSON →',
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
const ctaStyle: React.CSSProperties = { padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center' as const, margin: '24px 0' };

export default function JsonFormatterGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JSON Formatter & Validator',
    description: 'Free online JSON formatter, validator, and beautifier tool',
    applicationCategory: 'DeveloperApplication',
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
        <Link href={`/${lang}/tools/json-formatter`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 16 }}>
          {s.linkTool}
        </Link>
      </div>

      {/* Section 1: What is JSON */}
      <h2 style={h2Style}>{s.h2_whatIsJson}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: s.whatIsJsonDesc1 }} />
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: s.whatIsJsonDesc2 }} />

      {/* Section 2: Why You Need a JSON Formatter */}
      <h2 style={h2Style}>{s.h2_whyNeedFormatter}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[s.whyNeedFormatterDesc1, s.whyNeedFormatterDesc2, s.whyNeedFormatterDesc3, s.whyNeedFormatterDesc4].map((desc, i) => (
          <div key={i} style={{ ...cardStyle, borderLeft: '4px solid var(--accent-blue)', marginBottom: 0 }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: desc }} />
          </div>
        ))}
      </div>

      {/* Section 3: Common Errors */}
      <h2 style={h2Style}>{s.h2_commonErrors}</h2>
      <p style={pStyle}>{s.commonErrorsDesc}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[s.commonError1, s.commonError2, s.commonError3, s.commonError4, s.commonError5].map((error, i) => (
          <div key={i} style={{ ...cardStyle, marginBottom: 0 }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: error }} />
          </div>
        ))}
      </div>

      <pre style={codeStyle}><code>{`// ❌ INVALID: Trailing comma
{
  "name": "John",
  "age": 30,
}

// ✅ VALID: No trailing comma
{
  "name": "John",
  "age": 30
}

// ❌ INVALID: Single quotes
{'name': 'John'}

// ✅ VALID: Double quotes
{"name": "John"}`}</code></pre>

      {/* Section 4: How to Format */}
      <h2 style={h2Style}>{s.h2_howToFormat}</h2>
      <p style={pStyle}>{s.howToFormatDesc}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li dangerouslySetInnerHTML={{ __html: s.howToFormatMethod1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.howToFormatMethod2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.howToFormatMethod3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.howToFormatMethod4 }} />
        <li dangerouslySetInnerHTML={{ __html: s.howToFormatMethod5 }} />
      </ul>

      {/* Section 5: Code Examples */}
      <h2 style={h2Style}>{s.h2_codeExamples}</h2>

      <h3 style={h3Style}>{s.codeJsTitle}</h3>
      <pre style={codeStyle}><code>{`// Parse and validate JSON
const jsonString = '{"name": "Alice", "age": 30}';
const data = JSON.parse(jsonString);

// Format JSON with indentation
const formatted = JSON.stringify(data, null, 2);
console.log(formatted);

// Minify JSON (no whitespace)
const minified = JSON.stringify(data);

// Safe parsing with error handling
try {
  const data = JSON.parse(possiblyInvalidJson);
} catch (e) {
  console.error('Invalid JSON:', e.message);
}`}</code></pre>

      <h3 style={h3Style}>{s.codePythonTitle}</h3>
      <pre style={codeStyle}><code>{`import json

# Parse and validate
json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)

# Format with indentation
formatted = json.dumps(data, indent=2)
print(formatted)

# Minify
minified = json.dumps(data, separators=(',', ':'))

# Command line formatting
# python -m json.tool input.json output.json`}</code></pre>

      <h3 style={h3Style}>{s.codeCliTitle}</h3>
      <pre style={codeStyle}><code>{`# Format JSON file
jq . input.json > formatted.json

# Format from stdin
cat file.json | jq .

# Minify JSON
jq -c . input.json > minified.json

# Validate JSON (returns exit code 0 if valid)
jq . input.json > /dev/null 2>&1 && echo "Valid" || echo "Invalid"

# Pretty print API response
curl -s https://api.example.com/data | jq .`}</code></pre>

      {/* Section 6: Best Practices */}
      <h2 style={h2Style}>{s.h2_bestPractices}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li dangerouslySetInnerHTML={{ __html: s.bestPractice1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.bestPractice2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.bestPractice3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.bestPractice4 }} />
        <li dangerouslySetInnerHTML={{ __html: s.bestPractice5 }} />
      </ul>

      <div style={ctaStyle}>
        <p style={{ margin: '0 0 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{s.linkToolBottom}</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={`/${lang}/tools/json-formatter`} style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
            JSON Formatter
          </Link>
          <Link href={`/${lang}/tools/json-validator`} style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
            JSON Validator
          </Link>
          <Link href={`/${lang}/tools/json-minifier`} style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
            JSON Minifier
          </Link>
        </div>
      </div>

      {/* Section 7: FAQ */}
      <h2 style={h2Style}>{s.h2_faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {[
          [s.faq1_q, s.faq1_a],
          [s.faq2_q, s.faq2_a],
          [s.faq3_q, s.faq3_a],
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
