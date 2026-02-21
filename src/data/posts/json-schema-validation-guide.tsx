import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Need to <strong>create JSON Schema from JSON</strong> data? JSON Schema is the industry standard for describing and validating JSON data structures. Whether you want to <strong>generate JSON Schema from JSON</strong> automatically, build REST APIs, validate form inputs, or generate documentation, understanding JSON Schema is a <strong>must-have skill</strong> for modern developers. Our free online tool lets you create a JSON Schema from any JSON data instantly.',
    try_tool: 'Create JSON Schema from JSON instantly (free online tool) \u2192',
    h2_1: '1. What is JSON Schema?',
    p1_1: 'JSON Schema is a <strong>vocabulary for annotating and validating JSON documents</strong>. It describes the shape of your data \u2014 what fields exist, what types they are, which are required, and what constraints apply. Think of it as TypeScript types, but for JSON data at runtime.',
    p1_2: 'JSON Schema is defined in JSON itself, making it language-agnostic. The same schema works in JavaScript, Python, Go, Java, and any other language with a JSON Schema validator.',
    p1_3: '<strong>Common use cases:</strong> API request/response validation, form validation, configuration file validation, data migration verification, and auto-generating documentation.',
    h2_2: '2. Basic Types and Structure',
    p2_1: 'JSON Schema supports six primitive types: <code>string</code>, <code>number</code>, <code>integer</code>, <code>boolean</code>, <code>null</code>, and <code>array</code>. Objects are defined with <code>"type": "object"</code> and <code>properties</code>.',
    p2_2: 'Each type supports specific validation keywords. For example, strings can have <code>minLength</code>, <code>maxLength</code>, and <code>pattern</code> (regex). Numbers support <code>minimum</code>, <code>maximum</code>, and <code>multipleOf</code>.',
    h2_3: '3. Required Fields and Defaults',
    p3_1: 'The <code>required</code> keyword takes an array of property names that must be present in the JSON object. Properties not listed in <code>required</code> are optional by default.',
    p3_2: '<strong>Best practice:</strong> Always explicitly define <code>required</code> fields rather than relying on defaults. This makes your schema self-documenting and prevents subtle bugs.',
    p3_3: 'You can also set <code>default</code> values for optional properties. Some validators and code generators use these defaults when a field is missing.',
    h2_4: '4. Nested Schemas and Composition',
    p4_1: 'Real-world data is rarely flat. JSON Schema handles nested objects naturally, and provides powerful composition keywords:',
    p4_list: '<li><code>$ref</code> \u2014 Reference another schema definition (DRY principle)</li><li><code>allOf</code> \u2014 Must match all listed schemas (intersection / extend)</li><li><code>oneOf</code> \u2014 Must match exactly one schema (discriminated union)</li><li><code>anyOf</code> \u2014 Must match at least one schema (union)</li><li><code>not</code> \u2014 Must NOT match the given schema</li>',
    p4_2: 'Use <code>$defs</code> (or the older <code>definitions</code>) to define reusable sub-schemas within the same document:',
    h2_5: '5. Common Validators',
    p5_1: 'Several mature libraries implement JSON Schema validation. Here are the most popular ones:',
    p5_table_lib: 'Library',
    p5_table_lang: 'Language',
    p5_table_notes: 'Notes',
    p5_2: '<strong>Ajv</strong> is the go-to choice for JavaScript/TypeScript projects. It\'s the fastest JSON Schema validator and supports all draft versions through plugins.',
    p5_3: 'Most validators follow the same pattern: compile the schema once, then validate multiple documents against it for maximum performance.',
    h2_6: '6. OpenAPI Integration',
    p6_1: 'OpenAPI (formerly Swagger) uses a <strong>superset of JSON Schema</strong> to define API request and response bodies. If you know JSON Schema, you already understand 90% of OpenAPI data modeling.',
    p6_2: 'Key differences in OpenAPI: <code>nullable</code> replaces <code>"type": ["string", "null"]</code>, <code>discriminator</code> provides explicit union type handling, and <code>example</code>/<code>examples</code> are first-class keywords.',
    p6_3: '<strong>Workflow tip:</strong> Start with JSON Schema for your data models, then extend to OpenAPI for API documentation. Many tools can generate one from the other.',
    h2_7: '7. How to Create JSON Schema from JSON Automatically',
    p7_1: 'Writing JSON Schema by hand is tedious, especially for complex nested objects. The fastest way to <strong>create JSON Schema from JSON</strong> is to use an automatic generator. Our free <strong>JSON to JSON Schema generator</strong> analyzes your sample data and produces a complete schema:',
    p7_list: '<li>Automatically infers types from your JSON data</li><li>Detects required vs. optional fields from multiple samples</li><li>Handles nested objects and arrays recursively</li><li>Outputs valid JSON Schema draft-07 compatible schemas</li><li>Works entirely in your browser - no data is sent to any server</li>',
    p7_2: 'To <strong>generate JSON Schema from JSON</strong>, simply paste your JSON data into the tool and get a production-ready schema in seconds. Then customize the generated schema to add constraints like patterns, min/max values, and descriptions.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Which JSON Schema draft version should I use?',
    faq1_a: 'For new projects, use Draft 2020-12 (the latest) if your tooling supports it. Otherwise, Draft-07 has the widest support across validators, code generators, and API tools. The differences between recent drafts are minor for most use cases.',
    faq2_q: 'Can JSON Schema validate deeply nested data?',
    faq2_a: 'Yes. JSON Schema supports unlimited nesting. Use <code>properties</code> for object fields, <code>items</code> for array elements, and <code>$ref</code> for recursive or shared structures. Validators handle deep nesting efficiently.',
    faq3_q: 'What is the difference between JSON Schema and TypeScript types?',
    faq3_a: 'TypeScript types exist only at compile time and are removed when code runs. JSON Schema validates data at runtime \u2014 it checks actual values against the schema. Use TypeScript for compile-time safety in your code, and JSON Schema for validating external data (API inputs, config files, user submissions).',
  },
  zh: {
    intro: 'JSON Schema \u662f\u63cf\u8ff0\u548c\u9a8c\u8bc1 JSON \u6570\u636e\u7ed3\u6784\u7684\u884c\u4e1a\u6807\u51c6\u3002\u65e0\u8bba\u60a8\u662f\u6784\u5efa REST API\u3001\u9a8c\u8bc1\u8868\u5355\u8f93\u5165\u8fd8\u662f\u751f\u6210\u6587\u6863\uff0c\u7406\u89e3 JSON Schema \u90fd\u662f\u73b0\u4ee3\u5f00\u53d1\u8005\u7684<strong>\u5fc5\u5907\u6280\u80fd</strong>\u3002',
    try_tool: '\u4ece\u60a8\u7684\u6570\u636e\u5373\u65f6\u751f\u6210 JSON Schema \u2192',
    h2_1: '1. \u4ec0\u4e48\u662f JSON Schema\uff1f',
    p1_1: 'JSON Schema \u662f\u4e00\u5957\u7528\u4e8e<strong>\u6ce8\u89e3\u548c\u9a8c\u8bc1 JSON \u6587\u6863\u7684\u8bcd\u6c47\u8868</strong>\u3002\u5b83\u63cf\u8ff0\u6570\u636e\u7684\u5f62\u72b6\u2014\u2014\u5b58\u5728\u54ea\u4e9b\u5b57\u6bb5\u3001\u7c7b\u578b\u662f\u4ec0\u4e48\u3001\u54ea\u4e9b\u662f\u5fc5\u9700\u7684\u3001\u4ee5\u53ca\u9002\u7528\u54ea\u4e9b\u7ea6\u675f\u3002\u53ef\u4ee5\u628a\u5b83\u7406\u89e3\u4e3a TypeScript \u7c7b\u578b\uff0c\u4f46\u7528\u4e8e\u8fd0\u884c\u65f6\u7684 JSON \u6570\u636e\u3002',
    p1_2: 'JSON Schema \u672c\u8eab\u7528 JSON \u5b9a\u4e49\uff0c\u56e0\u6b64\u4e0e\u8bed\u8a00\u65e0\u5173\u3002\u540c\u4e00\u4e2a schema \u53ef\u4ee5\u5728 JavaScript\u3001Python\u3001Go\u3001Java \u4ee5\u53ca\u4efb\u4f55\u5177\u6709 JSON Schema \u9a8c\u8bc1\u5668\u7684\u8bed\u8a00\u4e2d\u4f7f\u7528\u3002',
    p1_3: '<strong>\u5e38\u89c1\u7528\u4f8b\uff1a</strong>API \u8bf7\u6c42/\u54cd\u5e94\u9a8c\u8bc1\u3001\u8868\u5355\u9a8c\u8bc1\u3001\u914d\u7f6e\u6587\u4ef6\u9a8c\u8bc1\u3001\u6570\u636e\u8fc1\u79fb\u6821\u9a8c\u548c\u81ea\u52a8\u751f\u6210\u6587\u6863\u3002',
    h2_2: '2. \u57fa\u672c\u7c7b\u578b\u548c\u7ed3\u6784',
    p2_1: 'JSON Schema \u652f\u6301\u516d\u79cd\u539f\u59cb\u7c7b\u578b\uff1a<code>string</code>\u3001<code>number</code>\u3001<code>integer</code>\u3001<code>boolean</code>\u3001<code>null</code> \u548c <code>array</code>\u3002\u5bf9\u8c61\u7528 <code>"type": "object"</code> \u548c <code>properties</code> \u5b9a\u4e49\u3002',
    p2_2: '\u6bcf\u79cd\u7c7b\u578b\u652f\u6301\u7279\u5b9a\u7684\u9a8c\u8bc1\u5173\u952e\u5b57\u3002\u4f8b\u5982\uff0c\u5b57\u7b26\u4e32\u53ef\u4ee5\u6709 <code>minLength</code>\u3001<code>maxLength</code> \u548c <code>pattern</code>\uff08\u6b63\u5219\uff09\u3002\u6570\u5b57\u652f\u6301 <code>minimum</code>\u3001<code>maximum</code> \u548c <code>multipleOf</code>\u3002',
    h2_3: '3. \u5fc5\u586b\u5b57\u6bb5\u548c\u9ed8\u8ba4\u503c',
    p3_1: '<code>required</code> \u5173\u952e\u5b57\u63a5\u53d7\u4e00\u4e2a\u5c5e\u6027\u540d\u6570\u7ec4\uff0c\u8868\u793a JSON \u5bf9\u8c61\u4e2d\u5fc5\u987b\u5b58\u5728\u7684\u5c5e\u6027\u3002\u672a\u5217\u5728 <code>required</code> \u4e2d\u7684\u5c5e\u6027\u9ed8\u8ba4\u4e3a\u53ef\u9009\u3002',
    p3_2: '<strong>\u6700\u4f73\u5b9e\u8df5\uff1a</strong>\u59cb\u7ec8\u660e\u786e\u5b9a\u4e49 <code>required</code> \u5b57\u6bb5\uff0c\u800c\u4e0d\u662f\u4f9d\u8d56\u9ed8\u8ba4\u503c\u3002\u8fd9\u8ba9\u60a8\u7684 schema \u81ea\u6211\u6587\u6863\u5316\u5e76\u9632\u6b62\u5fae\u5999\u7684 bug\u3002',
    p3_3: '\u60a8\u8fd8\u53ef\u4ee5\u4e3a\u53ef\u9009\u5c5e\u6027\u8bbe\u7f6e <code>default</code> \u503c\u3002\u67d0\u4e9b\u9a8c\u8bc1\u5668\u548c\u4ee3\u7801\u751f\u6210\u5668\u5728\u5b57\u6bb5\u7f3a\u5931\u65f6\u4f1a\u4f7f\u7528\u8fd9\u4e9b\u9ed8\u8ba4\u503c\u3002',
    h2_4: '4. \u5d4c\u5957 Schema \u548c\u7ec4\u5408',
    p4_1: '\u73b0\u5b9e\u4e16\u754c\u7684\u6570\u636e\u5f88\u5c11\u662f\u6241\u5e73\u7684\u3002JSON Schema \u81ea\u7136\u5730\u5904\u7406\u5d4c\u5957\u5bf9\u8c61\uff0c\u5e76\u63d0\u4f9b\u5f3a\u5927\u7684\u7ec4\u5408\u5173\u952e\u5b57\uff1a',
    p4_list: '<li><code>$ref</code> \u2014 \u5f15\u7528\u53e6\u4e00\u4e2a schema \u5b9a\u4e49\uff08DRY \u539f\u5219\uff09</li><li><code>allOf</code> \u2014 \u5fc5\u987b\u5339\u914d\u6240\u6709\u5217\u51fa\u7684 schema\uff08\u4ea4\u96c6/\u7ee7\u627f\uff09</li><li><code>oneOf</code> \u2014 \u5fc5\u987b\u6070\u597d\u5339\u914d\u4e00\u4e2a schema\uff08\u533a\u5206\u8054\u5408\uff09</li><li><code>anyOf</code> \u2014 \u5fc5\u987b\u5339\u914d\u81f3\u5c11\u4e00\u4e2a schema\uff08\u8054\u5408\uff09</li><li><code>not</code> \u2014 \u4e0d\u5f97\u5339\u914d\u7ed9\u5b9a\u7684 schema</li>',
    p4_2: '\u4f7f\u7528 <code>$defs</code>\uff08\u6216\u65e7\u7248\u7684 <code>definitions</code>\uff09\u5728\u540c\u4e00\u6587\u6863\u4e2d\u5b9a\u4e49\u53ef\u590d\u7528\u7684\u5b50 schema\uff1a',
    h2_5: '5. \u5e38\u7528\u9a8c\u8bc1\u5668',
    p5_1: '\u51e0\u4e2a\u6210\u719f\u7684\u5e93\u5b9e\u73b0\u4e86 JSON Schema \u9a8c\u8bc1\u3002\u4ee5\u4e0b\u662f\u6700\u6d41\u884c\u7684\uff1a',
    p5_table_lib: '\u5e93',
    p5_table_lang: '\u8bed\u8a00',
    p5_table_notes: '\u5907\u6ce8',
    p5_2: '<strong>Ajv</strong> \u662f JavaScript/TypeScript \u9879\u76ee\u7684\u9996\u9009\u3002\u5b83\u662f\u6700\u5feb\u7684 JSON Schema \u9a8c\u8bc1\u5668\uff0c\u901a\u8fc7\u63d2\u4ef6\u652f\u6301\u6240\u6709 draft \u7248\u672c\u3002',
    p5_3: '\u5927\u591a\u6570\u9a8c\u8bc1\u5668\u9075\u5faa\u76f8\u540c\u7684\u6a21\u5f0f\uff1a\u7f16\u8bd1\u4e00\u6b21 schema\uff0c\u7136\u540e\u5bf9\u591a\u4e2a\u6587\u6863\u8fdb\u884c\u9a8c\u8bc1\u4ee5\u83b7\u5f97\u6700\u4f73\u6027\u80fd\u3002',
    h2_6: '6. OpenAPI \u96c6\u6210',
    p6_1: 'OpenAPI\uff08\u539f Swagger\uff09\u4f7f\u7528 JSON Schema \u7684<strong>\u8d85\u96c6</strong>\u6765\u5b9a\u4e49 API \u8bf7\u6c42\u548c\u54cd\u5e94\u4f53\u3002\u5982\u679c\u60a8\u4e86\u89e3 JSON Schema\uff0c\u60a8\u5df2\u7ecf\u7406\u89e3\u4e86 90% \u7684 OpenAPI \u6570\u636e\u5efa\u6a21\u3002',
    p6_2: 'OpenAPI \u4e2d\u7684\u5173\u952e\u5dee\u5f02\uff1a<code>nullable</code> \u66ff\u4ee3 <code>"type": ["string", "null"]</code>\uff0c<code>discriminator</code> \u63d0\u4f9b\u660e\u786e\u7684\u8054\u5408\u7c7b\u578b\u5904\u7406\uff0c<code>example</code>/<code>examples</code> \u662f\u4e00\u7b49\u5173\u952e\u5b57\u3002',
    p6_3: '<strong>\u5de5\u4f5c\u6d41\u63d0\u793a\uff1a</strong>\u5148\u4e3a\u6570\u636e\u6a21\u578b\u7f16\u5199 JSON Schema\uff0c\u7136\u540e\u6269\u5c55\u4e3a OpenAPI \u7528\u4e8e API \u6587\u6863\u3002\u8bb8\u591a\u5de5\u5177\u53ef\u4ee5\u4ece\u4e00\u4e2a\u751f\u6210\u53e6\u4e00\u4e2a\u3002',
    h2_7: '7. \u5de5\u5177\u63a8\u8350\uff1aJSON \u8f6c JSON Schema',
    p7_1: '\u624b\u5199 JSON Schema \u5f88\u7e41\u7410\uff0c\u5c24\u5176\u662f\u5bf9\u4e8e\u590d\u6742\u7684\u5d4c\u5957\u5bf9\u8c61\u3002\u6211\u4eec\u7684 <strong>JSON \u8f6c JSON Schema \u751f\u6210\u5668</strong>\u5206\u6790\u60a8\u7684\u793a\u4f8b\u6570\u636e\u5e76\u751f\u6210\u5b8c\u6574\u7684 schema\uff1a',
    p7_list: '<li>\u81ea\u52a8\u4ece JSON \u6570\u636e\u63a8\u65ad\u7c7b\u578b</li><li>\u4ece\u591a\u4e2a\u793a\u4f8b\u68c0\u6d4b\u5fc5\u586b\u4e0e\u53ef\u9009\u5b57\u6bb5</li><li>\u9012\u5f52\u5904\u7406\u5d4c\u5957\u5bf9\u8c61\u548c\u6570\u7ec4</li><li>\u8f93\u51fa\u517c\u5bb9 JSON Schema draft-07 \u7684\u6709\u6548 schema</li>',
    p7_2: '\u7c98\u8d34\u60a8\u7684 JSON \u6570\u636e\uff0c\u51e0\u79d2\u5185\u5373\u53ef\u83b7\u5f97\u53ef\u7528\u4e8e\u751f\u4ea7\u7684 schema\u3002\u7136\u540e\u81ea\u5b9a\u4e49\u751f\u6210\u7684 schema\uff0c\u6dfb\u52a0\u6a21\u5f0f\u3001\u6700\u5c0f/\u6700\u5927\u503c\u548c\u63cf\u8ff0\u7b49\u7ea6\u675f\u3002',
    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: '\u5e94\u8be5\u4f7f\u7528\u54ea\u4e2a JSON Schema draft \u7248\u672c\uff1f',
    faq1_a: '\u5bf9\u4e8e\u65b0\u9879\u76ee\uff0c\u5982\u679c\u5de5\u5177\u652f\u6301\uff0c\u8bf7\u4f7f\u7528 Draft 2020-12\uff08\u6700\u65b0\u7248\uff09\u3002\u5426\u5219\uff0cDraft-07 \u5728\u9a8c\u8bc1\u5668\u3001\u4ee3\u7801\u751f\u6210\u5668\u548c API \u5de5\u5177\u4e2d\u62e5\u6709\u6700\u5e7f\u6cdb\u7684\u652f\u6301\u3002\u8fd1\u671f draft \u4e4b\u95f4\u7684\u5dee\u5f02\u5bf9\u5927\u591a\u6570\u7528\u4f8b\u6765\u8bf4\u5f88\u5c0f\u3002',
    faq2_q: 'JSON Schema \u53ef\u4ee5\u9a8c\u8bc1\u6df1\u5c42\u5d4c\u5957\u6570\u636e\u5417\uff1f',
    faq2_a: '\u53ef\u4ee5\u3002JSON Schema \u652f\u6301\u65e0\u9650\u5d4c\u5957\u3002\u4f7f\u7528 <code>properties</code> \u5b9a\u4e49\u5bf9\u8c61\u5b57\u6bb5\uff0c<code>items</code> \u5b9a\u4e49\u6570\u7ec4\u5143\u7d20\uff0c<code>$ref</code> \u5904\u7406\u9012\u5f52\u6216\u5171\u4eab\u7ed3\u6784\u3002\u9a8c\u8bc1\u5668\u80fd\u9ad8\u6548\u5904\u7406\u6df1\u5c42\u5d4c\u5957\u3002',
    faq3_q: 'JSON Schema \u548c TypeScript \u7c7b\u578b\u6709\u4ec0\u4e48\u533a\u522b\uff1f',
    faq3_a: 'TypeScript \u7c7b\u578b\u4ec5\u5b58\u5728\u4e8e\u7f16\u8bd1\u65f6\uff0c\u4ee3\u7801\u8fd0\u884c\u65f6\u4f1a\u88ab\u5220\u9664\u3002JSON Schema \u5728\u8fd0\u884c\u65f6\u9a8c\u8bc1\u6570\u636e\u2014\u2014\u5b83\u68c0\u67e5\u5b9e\u9645\u503c\u662f\u5426\u7b26\u5408 schema\u3002\u5728\u4ee3\u7801\u4e2d\u4f7f\u7528 TypeScript \u83b7\u5f97\u7f16\u8bd1\u65f6\u5b89\u5168\uff0c\u4f7f\u7528 JSON Schema \u9a8c\u8bc1\u5916\u90e8\u6570\u636e\uff08API \u8f93\u5165\u3001\u914d\u7f6e\u6587\u4ef6\u3001\u7528\u6237\u63d0\u4ea4\uff09\u3002',
  },
};

export default function JsonSchemaValidationGuide({ lang }: { lang: string }) {
  const tx = t[lang] || t['en'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: tx.faq1_q, acceptedAnswer: { '@type': 'Answer', text: tx.faq1_a } },
      { '@type': 'Question', name: tx.faq2_q, acceptedAnswer: { '@type': 'Answer', text: tx.faq2_a } },
      { '@type': 'Question', name: tx.faq3_q, acceptedAnswer: { '@type': 'Answer', text: tx.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: tx.intro }} />

      <p>
        <Link href={`/${lang}/tools/json-to-json-schema`} style={{ fontWeight: 600 }}>
          {tx.try_tool}
        </Link>
      </p>

      <h2>{tx.h2_1}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p1_1 }} />
      <p>{tx.p1_2}</p>
      <p dangerouslySetInnerHTML={{ __html: tx.p1_3 }} />

      <h2>{tx.h2_2}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_1 }} />
      <pre><code>{`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name":  { "type": "string", "minLength": 1 },
    "email": { "type": "string", "format": "email" },
    "age":   { "type": "integer", "minimum": 0, "maximum": 150 },
    "active": { "type": "boolean" },
    "tags":  { "type": "array", "items": { "type": "string" } }
  },
  "required": ["name", "email"]
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_2 }} />

      <h2>{tx.h2_3}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_1 }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p3_2 }} />
      <pre><code>{`{
  "type": "object",
  "properties": {
    "username": { "type": "string" },
    "nickname": { "type": "string", "default": "Anonymous" },
    "role":     { "type": "string", "enum": ["admin", "user", "guest"], "default": "user" }
  },
  "required": ["username"]
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_3 }} />

      <h2>{tx.h2_4}</h2>
      <p>{tx.p4_1}</p>
      <ul dangerouslySetInnerHTML={{ __html: tx.p4_list }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p4_2 }} />
      <pre><code>{`{
  "type": "object",
  "properties": {
    "billing_address":  { "$ref": "#/$defs/address" },
    "shipping_address": { "$ref": "#/$defs/address" }
  },
  "$defs": {
    "address": {
      "type": "object",
      "properties": {
        "street":  { "type": "string" },
        "city":    { "type": "string" },
        "country": { "type": "string" }
      },
      "required": ["street", "city", "country"]
    }
  }
}`}</code></pre>

      <h2>{tx.h2_5}</h2>
      <p>{tx.p5_1}</p>
      <table>
        <thead>
          <tr><th>{tx.p5_table_lib}</th><th>{tx.p5_table_lang}</th><th>{tx.p5_table_notes}</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Ajv</strong></td><td>JavaScript / TypeScript</td><td>Fastest, supports all drafts</td></tr>
          <tr><td><strong>jsonschema</strong></td><td>Python</td><td>Most popular Python validator</td></tr>
          <tr><td><strong>everit-org/json-schema</strong></td><td>Java</td><td>Full draft-07 support</td></tr>
          <tr><td><strong>gojsonschema</strong></td><td>Go</td><td>Idiomatic Go API</td></tr>
          <tr><td><strong>Newtonsoft.Json.Schema</strong></td><td>C# / .NET</td><td>Commercial, full-featured</td></tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_2 }} />
      <pre><code>{`import Ajv from 'ajv';

const ajv = new Ajv();
const validate = ajv.compile(schema); // compile once

const valid = validate(data);
if (!valid) {
  console.log(validate.errors);
  // [{ instancePath: '/email', message: 'must match format "email"' }]
}`}</code></pre>
      <p>{tx.p5_3}</p>

      <h2>{tx.h2_6}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p6_1 }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p6_2 }} />
      <pre><code>{`# OpenAPI 3.0 component schema
components:
  schemas:
    User:
      type: object
      required: [id, email]
      properties:
        id:
          type: integer
          format: int64
        email:
          type: string
          format: email
        name:
          type: string
          nullable: true`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p6_3 }} />

      <h2>{tx.h2_7}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p7_1 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p7_list }} />
      <p>{tx.p7_2}</p>
      <p>
        <Link href={`/${lang}/tools/json-to-json-schema`} style={{ fontWeight: 600 }}>
          {tx.try_tool}
        </Link>
      </p>

      <h2>{tx.h2_faq}</h2>
      <h3>{tx.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.faq1_a }} />
      <h3>{tx.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.faq2_a }} />
      <h3>{tx.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.faq3_a }} />

      {lang === 'en' && (
        <>
          <h3>How do I create JSON Schema from JSON automatically?</h3>
          <p>The fastest way to create JSON Schema from JSON is to use an automatic generator tool. Paste your sample JSON data into our <Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema generator</Link>, and it will analyze the structure, infer types for every field, determine which fields are required, and output a valid JSON Schema draft-07 document. This is much faster than writing schemas by hand, especially for complex nested objects.</p>

          <h3>Can I generate JSON Schema from multiple JSON samples?</h3>
          <p>Yes. Advanced JSON Schema generators can analyze multiple JSON samples to produce a more accurate schema. By comparing several documents, the generator determines which fields are always present (required) versus sometimes absent (optional), and whether fields have consistent types or mixed types. Our tool handles single samples with smart inference for nullability and optionality.</p>
        </>
      )}

      {/* Internal links for SEO */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema Generator</Link> - Create JSON Schema from JSON data automatically</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate JSON data</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript Converter</Link> - Generate TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-zod`}>JSON to Zod Converter</Link> - Generate Zod validation schemas from JSON</li>
        <li><Link href={`/${lang}/blog/json-to-typescript-complete-guide`}>JSON to TypeScript: Complete Guide</Link></li>
        <li><Link href={`/${lang}/blog/json-formatter-validator-guide`}>JSON Formatter and Validator Guide</Link></li>
      </ul>
    </>
  );
}
