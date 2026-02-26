'use client';
import Link from 'next/link';
import React from 'react';

const t: Record<string, Record<string, string>> = {
  en: {
    tldr_title: 'TL;DR',
    tldr: 'Generating TypeScript types from JSON saves hours of manual typing, catches bugs at compile time, and keeps your codebase in sync with APIs. Use our free online tool or libraries like quicktype and json2ts to auto-generate interfaces. Combine generated types with Zod for runtime validation. Always prefer interfaces for object shapes and enable strict mode in tsconfig.json for maximum type safety.',
    takeaways_title: 'Key Takeaways',
    takeaway1: 'TypeScript interfaces generated from JSON catch shape mismatches at compile time, preventing runtime errors.',
    takeaway2: 'Use interface for object shapes (extendable, mergeable) and type alias for unions, intersections, and mapped types.',
    takeaway3: 'Mark fields as optional (?) when they may be absent, and use union types (string | null) for nullable values.',
    takeaway4: 'Tools like quicktype, json2ts, and our online converter handle nested objects, arrays, and union types automatically.',
    takeaway5: 'Zod bridges the gap between compile-time types and runtime validation with z.infer<typeof schema>.',
    takeaway6: 'Enable resolveJsonModule and strict mode in tsconfig.json to import .json files with full type safety.',
    takeaway7: 'Wrap API responses in a generic ApiResponse<T> type for consistent error handling across your app.',
    link_tool: 'Try our free JSON to TypeScript converter',

    h2_why: 'Why Generate TypeScript Types from JSON?',
    why_p1: 'Every modern web application communicates with APIs that return JSON data. Without TypeScript types, you are flying blind: property names could be misspelled, nested objects could be null, and arrays could contain unexpected shapes. TypeScript catches these problems at compile time, but only if you have accurate type definitions.',
    why_p2: 'Manually writing interfaces for complex API responses is tedious and error-prone. A single JSON payload from a REST API can have dozens of nested fields, optional properties, and array structures. Automated generation ensures your types match the actual data shape.',
    why_p3: 'Here are the key benefits of generating TypeScript types from JSON:',
    why_li1: '<strong>Compile-time safety</strong>: Access non-existent properties? TypeScript catches it before your code runs.',
    why_li2: '<strong>IDE autocomplete</strong>: Generated interfaces give you full IntelliSense for every nested field.',
    why_li3: '<strong>Refactoring confidence</strong>: Rename a field in your type and TypeScript flags every usage that needs updating.',
    why_li4: '<strong>Documentation</strong>: Types serve as living documentation of your API contracts.',
    why_li5: '<strong>Team alignment</strong>: Shared types ensure frontend and backend developers agree on data shapes.',

    h2_interface_vs_type: 'Interface vs Type Alias: Which Should You Use for JSON Data?',
    ivt_p1: 'TypeScript offers two ways to define object shapes: <code>interface</code> and <code>type</code>. For JSON-derived types, interfaces are generally preferred, but each has strengths:',
    h3_interface: 'When to Use interface',
    interface_p1: 'Interfaces are the default choice for object shapes. They support declaration merging (augmenting an existing interface) and extends for inheritance. Most JSON-to-TypeScript tools generate interfaces by default.',
    h3_type: 'When to Use type Alias',
    type_p1: 'Type aliases are better for union types, intersection types, mapped types, and conditional types. If your JSON contains fields that can be multiple types (e.g., <code>string | number</code>), a type alias is more natural for expressing that.',
    ivt_p2: '<strong>Rule of thumb</strong>: Use <code>interface</code> for API response objects and <code>type</code> for unions, utility types, and complex transformations.',

    h2_optional: 'Handling Optional and Nullable Fields',
    opt_p1: 'Real-world JSON data often has fields that are sometimes present and sometimes missing, or fields that can be null. TypeScript distinguishes between these cases:',
    h3_optional_fields: 'Optional Fields (?)',
    opt_fields_p: 'Use the <code>?</code> modifier when a field may be absent from the JSON entirely. This is different from a field being present with a null value.',
    h3_nullable: 'Nullable Fields (| null)',
    nullable_p: 'Use a union with <code>null</code> when the field is always present but its value can be null. This is common in database-backed APIs where a column exists but has no value.',
    h3_both: 'Optional AND Nullable',
    both_p: 'Some APIs return fields that are both optional and nullable. Combine <code>?</code> with <code>| null</code>:',

    h2_nested: 'Nested Objects and Arrays',
    nested_p1: 'JSON from APIs typically contains deeply nested structures. TypeScript handles these with nested interface definitions or inline types:',
    h3_nested_obj: 'Nested Object Interfaces',
    nested_obj_p: 'Extract each nested object into its own interface for reusability and clarity:',
    h3_nested_arr: 'Typed Arrays',
    nested_arr_p: 'Arrays in JSON should be typed with the element type. Use <code>Type[]</code> or <code>Array&lt;Type&gt;</code> syntax:',
    h3_tuple: 'Tuple Types for Fixed-Length Arrays',
    tuple_p: 'If your JSON contains arrays with a fixed number of elements of specific types (e.g., coordinates), use tuple types:',

    h2_union: 'Union Types from Varying JSON Values',
    union_p1: 'Some JSON fields can contain different types of values. For example, an ID field might be a string or number, or a status field might be one of several literal values. TypeScript union types handle these naturally:',
    h3_literal_union: 'String Literal Unions',
    literal_p: 'When a field has a fixed set of possible values, use a string literal union for maximum type safety:',
    h3_discriminated: 'Discriminated Unions',
    disc_p: 'When JSON objects have a "type" field that determines their shape, use discriminated unions. This is common in event systems and polymorphic APIs:',

    h2_tools: 'JSON-to-TypeScript Generation Tools',
    tools_p1: 'Several tools can automatically generate TypeScript interfaces from JSON. Here are the most popular options:',
    h3_quicktype: 'quicktype',
    quicktype_p: 'Quicktype is the most powerful JSON-to-TypeScript tool. It infers union types, handles optional fields, and supports many output languages. Available as a CLI, npm package, and web app:',
    h3_json2ts: 'json2ts / json-to-ts',
    json2ts_p: 'A simpler alternative that generates TypeScript interfaces from JSON. Available as an npm package and VS Code extension:',
    h3_online: 'Online Converters',
    online_p: 'For quick one-off conversions, our free online tool lets you paste JSON and get TypeScript interfaces instantly. No installation required:',
    h3_vscode: 'VS Code Extensions',
    vscode_p: 'Several VS Code extensions can convert JSON to TypeScript directly in your editor. Search for "JSON to TS" in the extensions marketplace. The most popular ones include Paste JSON as Code and JSON to TS.',

    h2_zod: 'Zod: Runtime Validation with TypeScript Types',
    zod_p1: 'TypeScript types only exist at compile time. They are erased when your code is compiled to JavaScript. This means runtime data (API responses, user input, environment variables) can still be the wrong shape. Zod solves this by providing runtime validation that also generates TypeScript types:',
    h3_zod_basic: 'Basic Zod Schema',
    zod_basic_p: 'Define a schema and infer the TypeScript type from it. The schema validates at runtime, and the inferred type provides compile-time safety:',
    h3_zod_api: 'Validating API Responses with Zod',
    zod_api_p: 'Use Zod to validate fetch responses before using the data. This catches API contract violations at runtime:',
    h3_zod_transform: 'Zod Transforms',
    zod_transform_p: 'Zod can transform data during validation, converting strings to dates, trimming whitespace, or setting defaults:',

    h2_generic: 'Generic API Response Types',
    generic_p1: 'Most APIs wrap their data in a standard envelope with fields like success, data, error, and pagination. Define a generic type to handle this consistently:',
    h3_generic_basic: 'Basic Generic Response',
    generic_basic_p: 'A generic <code>ApiResponse&lt;T&gt;</code> type lets you reuse the same wrapper for any data type:',
    h3_generic_paginated: 'Paginated Response',
    generic_pag_p: 'Extend the generic pattern for paginated endpoints:',
    h3_generic_usage: 'Using Generic Response Types',
    generic_usage_p: 'Combine generic response types with fetch functions for end-to-end type safety:',

    h2_fetch: 'Working with JSON APIs in TypeScript (fetch + Type Safety)',
    fetch_p1: 'The built-in <code>fetch</code> API returns <code>Response</code> with an untyped <code>.json()</code> method. Here is how to add type safety:',
    h3_typed_fetch: 'Typed Fetch Wrapper',
    typed_fetch_p: 'Create a generic fetch wrapper that validates the response and returns typed data:',
    h3_axios: 'Axios with TypeScript',
    axios_p: 'Axios supports generics out of the box, making typed API calls straightforward:',
    h3_error_handling: 'Type-Safe Error Handling',
    error_p: 'Define error types and use discriminated unions for robust error handling:',

    h2_tsconfig: 'tsconfig Strict Mode and JSON Imports',
    tsconfig_p1: 'Your <code>tsconfig.json</code> settings significantly affect how TypeScript handles JSON data. Here are the critical options:',
    h3_strict: 'Enable Strict Mode',
    strict_p: 'Strict mode enables a set of type-checking options that catch more bugs. For JSON-heavy projects, <code>strictNullChecks</code> is especially important because it forces you to handle null and undefined values explicitly:',
    h3_json_import: 'Importing JSON Files',
    json_import_p: 'With <code>resolveJsonModule</code> enabled, TypeScript can import .json files and infer their types automatically:',
    h3_esmodule: 'esModuleInterop',
    esmodule_p: 'Enable <code>esModuleInterop</code> for cleaner imports of CommonJS modules (including many JSON-related libraries):',

    h2_best: 'Best Practices for Maintaining Generated Types',
    best_p1: 'Auto-generated types need ongoing maintenance to stay in sync with your APIs. Follow these best practices:',
    best_li1: '<strong>Automate generation</strong>: Add a script to your package.json that regenerates types from API schemas (OpenAPI/Swagger) or sample JSON.',
    best_li2: '<strong>Version your types</strong>: Commit generated types to version control so changes are visible in code reviews.',
    best_li3: '<strong>Separate generated from hand-written</strong>: Keep generated types in a <code>types/generated/</code> directory and hand-written types in <code>types/</code>.',
    best_li4: '<strong>Use readonly</strong>: Mark generated types as <code>Readonly&lt;T&gt;</code> or use <code>readonly</code> properties to prevent accidental mutation.',
    best_li5: '<strong>Add JSDoc comments</strong>: Document fields with descriptions from the API documentation for better IDE tooltips.',
    best_li6: '<strong>Validate at boundaries</strong>: Use Zod or io-ts at API boundaries to catch runtime mismatches between expected and actual types.',
    best_li7: '<strong>Run CI type checks</strong>: Add <code>tsc --noEmit</code> to your CI pipeline to catch type errors before deployment.',
    best_li8: '<strong>Keep types DRY</strong>: Use TypeScript utility types (Pick, Omit, Partial, Required) to derive sub-types from base types instead of duplicating definitions.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I convert JSON to TypeScript interfaces online?',
    faq1_a: 'Paste your JSON into our free online JSON to TypeScript converter tool. It automatically generates TypeScript interfaces with proper nesting, optional fields, and array types. You can also use quicktype.io or json2ts.com for similar functionality.',
    faq2_q: 'Should I use interface or type for JSON data in TypeScript?',
    faq2_a: 'Use interface for most JSON object shapes. Interfaces support declaration merging and extends, making them ideal for API response types. Use type aliases for union types (string | number), intersection types, and mapped/conditional types.',
    faq3_q: 'How do I handle optional and nullable fields from JSON in TypeScript?',
    faq3_a: 'Use the ? modifier for fields that may be absent (e.g., middleName?: string). Use union with null for fields that are always present but can be null (e.g., bio: string | null). Combine both for fields that are optional AND nullable: bio?: string | null.',
    faq4_q: 'What is the best tool to auto-generate TypeScript types from JSON?',
    faq4_a: 'quicktype is the most feature-rich tool, supporting union type inference, optional fields, and multiple output languages. For simpler needs, json-to-ts (npm package) or VS Code extensions like Paste JSON as Code work well. Our online tool provides instant browser-based conversion.',
    faq5_q: 'How does Zod help with JSON and TypeScript?',
    faq5_a: 'Zod provides runtime validation schemas that also generate TypeScript types via z.infer<typeof schema>. This means you define your data shape once and get both compile-time type checking and runtime validation. Use Zod to validate API responses, form data, and environment variables.',
    faq6_q: 'How do I import a JSON file in TypeScript with type safety?',
    faq6_a: 'Enable resolveJsonModule and esModuleInterop in your tsconfig.json. Then import JSON files directly: import data from "./data.json". TypeScript will infer the types from the JSON structure automatically. For stricter types, you can assert the import: import data from "./data.json" assert { type: "json" }.',
    faq7_q: 'What tsconfig settings are important for JSON-heavy TypeScript projects?',
    faq7_a: 'Enable strict (especially strictNullChecks), resolveJsonModule (for JSON imports), esModuleInterop (for cleaner imports), and noUncheckedIndexedAccess (for safer object property access). These settings maximize type safety when working with JSON data.',
    faq8_q: 'How do I create a generic API response type in TypeScript?',
    faq8_a: 'Define a generic interface like: interface ApiResponse<T> { success: boolean; data: T; error?: string; }. Then use it with specific types: ApiResponse<User>, ApiResponse<Product[]>. This provides consistent error handling and response structure across your entire application.',

    conclusion_title: 'Conclusion',
    conclusion: 'Generating TypeScript types from JSON is one of the highest-ROI practices in modern web development. It catches bugs at compile time, provides IDE autocomplete, and keeps your frontend in sync with backend APIs. Start with our free online tool for quick conversions, adopt quicktype for CI pipelines, and add Zod for runtime validation at API boundaries. Combined with strict tsconfig settings and generic response types, you will build applications that are both type-safe and maintainable.',
    link_tool_bottom: 'Convert JSON to TypeScript Online',
  },
  zh: {
    tldr_title: '\u6458\u8981',
    tldr: '\u4ece JSON \u751f\u6210 TypeScript \u7c7b\u578b\u53ef\u4ee5\u8282\u7701\u6570\u5c0f\u65f6\u7684\u624b\u52a8\u8f93\u5165\uff0c\u5728\u7f16\u8bd1\u65f6\u6355\u83b7 bug\uff0c\u5e76\u4fdd\u6301\u4ee3\u7801\u5e93\u4e0e API \u540c\u6b65\u3002\u4f7f\u7528\u6211\u4eec\u7684\u514d\u8d39\u5728\u7ebf\u5de5\u5177\u6216 quicktype\u3001json2ts \u7b49\u5e93\u81ea\u52a8\u751f\u6210\u63a5\u53e3\u3002\u7ed3\u5408 Zod \u8fdb\u884c\u8fd0\u884c\u65f6\u9a8c\u8bc1\u3002\u59cb\u7ec8\u4f18\u5148\u4f7f\u7528 interface \u5b9a\u4e49\u5bf9\u8c61\u5f62\u72b6\uff0c\u5e76\u5728 tsconfig.json \u4e2d\u542f\u7528 strict \u6a21\u5f0f\u4ee5\u83b7\u5f97\u6700\u5927\u7c7b\u578b\u5b89\u5168\u6027\u3002',
    takeaways_title: '\u6838\u5fc3\u8981\u70b9',
    takeaway1: '\u4ece JSON \u751f\u6210\u7684 TypeScript \u63a5\u53e3\u53ef\u4ee5\u5728\u7f16\u8bd1\u65f6\u6355\u83b7\u5f62\u72b6\u4e0d\u5339\u914d\uff0c\u9632\u6b62\u8fd0\u884c\u65f6\u9519\u8bef\u3002',
    takeaway2: '\u4f7f\u7528 interface \u5b9a\u4e49\u5bf9\u8c61\u5f62\u72b6\uff08\u53ef\u6269\u5c55\u3001\u53ef\u5408\u5e76\uff09\uff0c\u4f7f\u7528 type \u5b9a\u4e49\u8054\u5408\u7c7b\u578b\u3001\u4ea4\u53c9\u7c7b\u578b\u548c\u6620\u5c04\u7c7b\u578b\u3002',
    takeaway3: '\u5f53\u5b57\u6bb5\u53ef\u80fd\u7f3a\u5931\u65f6\u7528 ? \u6807\u8bb0\u4e3a\u53ef\u9009\uff0c\u5f53\u503c\u53ef\u80fd\u4e3a null \u65f6\u4f7f\u7528\u8054\u5408\u7c7b\u578b (string | null)\u3002',
    takeaway4: 'quicktype\u3001json2ts \u548c\u6211\u4eec\u7684\u5728\u7ebf\u8f6c\u6362\u5668\u53ef\u81ea\u52a8\u5904\u7406\u5d4c\u5957\u5bf9\u8c61\u3001\u6570\u7ec4\u548c\u8054\u5408\u7c7b\u578b\u3002',
    takeaway5: 'Zod \u901a\u8fc7 z.infer<typeof schema> \u5728\u7f16\u8bd1\u65f6\u7c7b\u578b\u548c\u8fd0\u884c\u65f6\u9a8c\u8bc1\u4e4b\u95f4\u67b6\u8d77\u6865\u6881\u3002',
    takeaway6: '\u5728 tsconfig.json \u4e2d\u542f\u7528 resolveJsonModule \u548c strict \u6a21\u5f0f\uff0c\u5b9e\u73b0\u5b8c\u6574\u7c7b\u578b\u5b89\u5168\u7684 .json \u6587\u4ef6\u5bfc\u5165\u3002',
    takeaway7: '\u5c06 API \u54cd\u5e94\u5305\u88c5\u5728\u901a\u7528\u7684 ApiResponse<T> \u7c7b\u578b\u4e2d\uff0c\u5b9e\u73b0\u5168\u5e94\u7528\u7edf\u4e00\u7684\u9519\u8bef\u5904\u7406\u3002',
    link_tool: '\u8bd5\u8bd5\u6211\u4eec\u7684\u514d\u8d39 JSON \u8f6c TypeScript \u8f6c\u6362\u5668',

    h2_why: '\u4e3a\u4ec0\u4e48\u8981\u4ece JSON \u751f\u6210 TypeScript \u7c7b\u578b\uff1f',
    why_p1: '\u6bcf\u4e2a\u73b0\u4ee3 Web \u5e94\u7528\u90fd\u4e0e\u8fd4\u56de JSON \u6570\u636e\u7684 API \u901a\u4fe1\u3002\u6ca1\u6709 TypeScript \u7c7b\u578b\uff0c\u4f60\u5c31\u662f\u5728\u76f2\u98de\uff1a\u5c5e\u6027\u540d\u53ef\u80fd\u62fc\u5199\u9519\u8bef\uff0c\u5d4c\u5957\u5bf9\u8c61\u53ef\u80fd\u4e3a null\uff0c\u6570\u7ec4\u53ef\u80fd\u5305\u542b\u610f\u5916\u7684\u5f62\u72b6\u3002',
    why_p2: '\u4e3a\u590d\u6742\u7684 API \u54cd\u5e94\u624b\u52a8\u7f16\u5199\u63a5\u53e3\u65e2\u4e4f\u5473\u53c8\u5bb9\u6613\u51fa\u9519\u3002\u81ea\u52a8\u751f\u6210\u786e\u4fdd\u7c7b\u578b\u4e0e\u5b9e\u9645\u6570\u636e\u5f62\u72b6\u5339\u914d\u3002',
    why_p3: '\u4ece JSON \u751f\u6210 TypeScript \u7c7b\u578b\u7684\u4e3b\u8981\u4f18\u52bf\uff1a',
    why_li1: '<strong>\u7f16\u8bd1\u65f6\u5b89\u5168</strong>\uff1a\u8bbf\u95ee\u4e0d\u5b58\u5728\u7684\u5c5e\u6027\uff1fTypeScript \u5728\u4ee3\u7801\u8fd0\u884c\u524d\u5c31\u80fd\u6355\u83b7\u3002',
    why_li2: '<strong>IDE \u81ea\u52a8\u8865\u5168</strong>\uff1a\u751f\u6210\u7684\u63a5\u53e3\u4e3a\u6bcf\u4e2a\u5d4c\u5957\u5b57\u6bb5\u63d0\u4f9b\u5b8c\u6574\u7684 IntelliSense\u3002',
    why_li3: '<strong>\u91cd\u6784\u4fe1\u5fc3</strong>\uff1a\u91cd\u547d\u540d\u7c7b\u578b\u4e2d\u7684\u5b57\u6bb5\uff0cTypeScript \u4f1a\u6807\u8bb0\u6240\u6709\u9700\u8981\u66f4\u65b0\u7684\u4f7f\u7528\u3002',
    why_li4: '<strong>\u6587\u6863\u5316</strong>\uff1a\u7c7b\u578b\u4f5c\u4e3a API \u5951\u7ea6\u7684\u6d3b\u6587\u6863\u3002',
    why_li5: '<strong>\u56e2\u961f\u5354\u4f5c</strong>\uff1a\u5171\u4eab\u7c7b\u578b\u786e\u4fdd\u524d\u540e\u7aef\u5f00\u53d1\u8005\u5bf9\u6570\u636e\u5f62\u72b6\u8fbe\u6210\u4e00\u81f4\u3002',

    h2_interface_vs_type: 'interface \u4e0e type \u522b\u540d\uff1a\u54ea\u4e2a\u66f4\u9002\u5408 JSON \u6570\u636e\uff1f',
    ivt_p1: 'TypeScript \u63d0\u4f9b\u4e24\u79cd\u5b9a\u4e49\u5bf9\u8c61\u5f62\u72b6\u7684\u65b9\u5f0f\uff1a<code>interface</code> \u548c <code>type</code>\u3002\u5bf9\u4e8e JSON \u6d3e\u751f\u7c7b\u578b\uff0c\u901a\u5e38\u4f18\u5148\u4f7f\u7528 interface\uff1a',
    h3_interface: '\u4f55\u65f6\u4f7f\u7528 interface',
    interface_p1: 'interface \u662f\u5bf9\u8c61\u5f62\u72b6\u7684\u9ed8\u8ba4\u9009\u62e9\u3002\u5b83\u652f\u6301\u58f0\u660e\u5408\u5e76\u548c extends \u7ee7\u627f\u3002\u5927\u591a\u6570 JSON \u8f6c TypeScript \u5de5\u5177\u9ed8\u8ba4\u751f\u6210 interface\u3002',
    h3_type: '\u4f55\u65f6\u4f7f\u7528 type \u522b\u540d',
    type_p1: 'type \u522b\u540d\u66f4\u9002\u5408\u8054\u5408\u7c7b\u578b\u3001\u4ea4\u53c9\u7c7b\u578b\u3001\u6620\u5c04\u7c7b\u578b\u548c\u6761\u4ef6\u7c7b\u578b\u3002',
    ivt_p2: '<strong>\u7ecf\u9a8c\u6cd5\u5219</strong>\uff1aAPI \u54cd\u5e94\u5bf9\u8c61\u7528 <code>interface</code>\uff0c\u8054\u5408\u7c7b\u578b\u548c\u5de5\u5177\u7c7b\u578b\u7528 <code>type</code>\u3002',

    h2_optional: '\u5904\u7406\u53ef\u9009\u548c\u53ef\u7a7a\u5b57\u6bb5',
    opt_p1: '\u771f\u5b9e\u4e16\u754c\u7684 JSON \u6570\u636e\u7ecf\u5e38\u6709\u65f6\u5b58\u5728\u65f6\u7f3a\u5931\u7684\u5b57\u6bb5\uff0c\u6216\u503c\u53ef\u80fd\u4e3a null \u7684\u5b57\u6bb5\u3002TypeScript \u533a\u5206\u8fd9\u4e9b\u60c5\u51b5\uff1a',
    h3_optional_fields: '\u53ef\u9009\u5b57\u6bb5 (?)',
    opt_fields_p: '\u5f53\u5b57\u6bb5\u53ef\u80fd\u5b8c\u5168\u4e0d\u5b58\u5728\u4e8e JSON \u4e2d\u65f6\uff0c\u4f7f\u7528 <code>?</code> \u4fee\u9970\u7b26\u3002',
    h3_nullable: '\u53ef\u7a7a\u5b57\u6bb5 (| null)',
    nullable_p: '\u5f53\u5b57\u6bb5\u59cb\u7ec8\u5b58\u5728\u4f46\u503c\u53ef\u80fd\u4e3a null \u65f6\uff0c\u4f7f\u7528 <code>null</code> \u8054\u5408\u7c7b\u578b\u3002',
    h3_both: '\u65e2\u53ef\u9009\u53c8\u53ef\u7a7a',
    both_p: '\u67d0\u4e9b API \u8fd4\u56de\u7684\u5b57\u6bb5\u65e2\u53ef\u9009\u53c8\u53ef\u7a7a\u3002\u7ec4\u5408 <code>?</code> \u548c <code>| null</code>\uff1a',

    h2_nested: '\u5d4c\u5957\u5bf9\u8c61\u548c\u6570\u7ec4',
    nested_p1: 'API \u8fd4\u56de\u7684 JSON \u901a\u5e38\u5305\u542b\u6df1\u5c42\u5d4c\u5957\u7ed3\u6784\u3002TypeScript \u901a\u8fc7\u5d4c\u5957\u63a5\u53e3\u5b9a\u4e49\u5904\u7406\u8fd9\u4e9b\uff1a',
    h3_nested_obj: '\u5d4c\u5957\u5bf9\u8c61\u63a5\u53e3',
    nested_obj_p: '\u5c06\u6bcf\u4e2a\u5d4c\u5957\u5bf9\u8c61\u63d0\u53d6\u4e3a\u72ec\u7acb\u7684\u63a5\u53e3\uff0c\u63d0\u9ad8\u53ef\u590d\u7528\u6027\uff1a',
    h3_nested_arr: '\u7c7b\u578b\u5316\u6570\u7ec4',
    nested_arr_p: 'JSON \u4e2d\u7684\u6570\u7ec4\u5e94\u4f7f\u7528\u5143\u7d20\u7c7b\u578b\u3002\u4f7f\u7528 <code>Type[]</code> \u6216 <code>Array&lt;Type&gt;</code> \u8bed\u6cd5\uff1a',
    h3_tuple: '\u56fa\u5b9a\u957f\u5ea6\u6570\u7ec4\u7684\u5143\u7ec4\u7c7b\u578b',
    tuple_p: '\u5982\u679c JSON \u5305\u542b\u56fa\u5b9a\u6570\u91cf\u7279\u5b9a\u7c7b\u578b\u5143\u7d20\u7684\u6570\u7ec4\uff0c\u4f7f\u7528\u5143\u7ec4\u7c7b\u578b\uff1a',

    h2_union: '\u4ece\u4e0d\u540c JSON \u503c\u751f\u6210\u8054\u5408\u7c7b\u578b',
    union_p1: '\u67d0\u4e9b JSON \u5b57\u6bb5\u53ef\u4ee5\u5305\u542b\u4e0d\u540c\u7c7b\u578b\u7684\u503c\u3002TypeScript \u8054\u5408\u7c7b\u578b\u53ef\u4ee5\u81ea\u7136\u5730\u5904\u7406\u8fd9\u4e9b\uff1a',
    h3_literal_union: '\u5b57\u7b26\u4e32\u5b57\u9762\u91cf\u8054\u5408',
    literal_p: '\u5f53\u5b57\u6bb5\u6709\u56fa\u5b9a\u7684\u53ef\u80fd\u503c\u96c6\u65f6\uff0c\u4f7f\u7528\u5b57\u7b26\u4e32\u5b57\u9762\u91cf\u8054\u5408\uff1a',
    h3_discriminated: '\u53ef\u8fa8\u522b\u8054\u5408',
    disc_p: '\u5f53 JSON \u5bf9\u8c61\u6709\u4e00\u4e2a "type" \u5b57\u6bb5\u51b3\u5b9a\u5176\u5f62\u72b6\u65f6\uff0c\u4f7f\u7528\u53ef\u8fa8\u522b\u8054\u5408\uff1a',

    h2_tools: 'JSON \u8f6c TypeScript \u751f\u6210\u5de5\u5177',
    tools_p1: '\u591a\u79cd\u5de5\u5177\u53ef\u4ee5\u81ea\u52a8\u4ece JSON \u751f\u6210 TypeScript \u63a5\u53e3\uff1a',
    h3_quicktype: 'quicktype',
    quicktype_p: 'Quicktype \u662f\u6700\u5f3a\u5927\u7684 JSON \u8f6c TypeScript \u5de5\u5177\u3002\u652f\u6301\u8054\u5408\u7c7b\u578b\u63a8\u65ad\u3001\u53ef\u9009\u5b57\u6bb5\u548c\u591a\u79cd\u8f93\u51fa\u8bed\u8a00\uff1a',
    h3_json2ts: 'json2ts / json-to-ts',
    json2ts_p: '\u4e00\u4e2a\u66f4\u7b80\u5355\u7684\u66ff\u4ee3\u65b9\u6848\uff0c\u53ef\u4f5c\u4e3a npm \u5305\u548c VS Code \u6269\u5c55\u4f7f\u7528\uff1a',
    h3_online: '\u5728\u7ebf\u8f6c\u6362\u5668',
    online_p: '\u5bf9\u4e8e\u5feb\u901f\u7684\u4e00\u6b21\u6027\u8f6c\u6362\uff0c\u6211\u4eec\u7684\u514d\u8d39\u5728\u7ebf\u5de5\u5177\u8ba9\u60a8\u7c98\u8d34 JSON \u5373\u53ef\u83b7\u5f97 TypeScript \u63a5\u53e3\uff1a',
    h3_vscode: 'VS Code \u6269\u5c55',
    vscode_p: '\u591a\u4e2a VS Code \u6269\u5c55\u53ef\u4ee5\u76f4\u63a5\u5728\u7f16\u8f91\u5668\u4e2d\u5c06 JSON \u8f6c\u6362\u4e3a TypeScript\u3002',

    h2_zod: 'Zod\uff1a\u5e26 TypeScript \u7c7b\u578b\u7684\u8fd0\u884c\u65f6\u9a8c\u8bc1',
    zod_p1: 'TypeScript \u7c7b\u578b\u4ec5\u5b58\u5728\u4e8e\u7f16\u8bd1\u65f6\u3002Zod \u901a\u8fc7\u63d0\u4f9b\u540c\u65f6\u751f\u6210 TypeScript \u7c7b\u578b\u7684\u8fd0\u884c\u65f6\u9a8c\u8bc1\u6765\u89e3\u51b3\u8fd9\u4e2a\u95ee\u9898\uff1a',
    h3_zod_basic: '\u57fa\u672c Zod Schema',
    zod_basic_p: '\u5b9a\u4e49 schema \u5e76\u4ece\u4e2d\u63a8\u65ad TypeScript \u7c7b\u578b\uff1a',
    h3_zod_api: '\u7528 Zod \u9a8c\u8bc1 API \u54cd\u5e94',
    zod_api_p: '\u4f7f\u7528 Zod \u5728\u4f7f\u7528\u6570\u636e\u524d\u9a8c\u8bc1 fetch \u54cd\u5e94\uff1a',
    h3_zod_transform: 'Zod \u8f6c\u6362',
    zod_transform_p: 'Zod \u53ef\u4ee5\u5728\u9a8c\u8bc1\u8fc7\u7a0b\u4e2d\u8f6c\u6362\u6570\u636e\uff1a',

    h2_generic: '\u901a\u7528 API \u54cd\u5e94\u7c7b\u578b',
    generic_p1: '\u5927\u591a\u6570 API \u5c06\u6570\u636e\u5305\u88c5\u5728\u6807\u51c6\u4fe1\u5c01\u4e2d\u3002\u5b9a\u4e49\u6cdb\u578b\u7c7b\u578b\u6765\u7edf\u4e00\u5904\u7406\uff1a',
    h3_generic_basic: '\u57fa\u672c\u6cdb\u578b\u54cd\u5e94',
    generic_basic_p: '\u6cdb\u578b <code>ApiResponse&lt;T&gt;</code> \u8ba9\u60a8\u5bf9\u4efb\u4f55\u6570\u636e\u7c7b\u578b\u590d\u7528\u76f8\u540c\u7684\u5305\u88c5\uff1a',
    h3_generic_paginated: '\u5206\u9875\u54cd\u5e94',
    generic_pag_p: '\u4e3a\u5206\u9875\u7aef\u70b9\u6269\u5c55\u6cdb\u578b\u6a21\u5f0f\uff1a',
    h3_generic_usage: '\u4f7f\u7528\u6cdb\u578b\u54cd\u5e94\u7c7b\u578b',
    generic_usage_p: '\u5c06\u6cdb\u578b\u54cd\u5e94\u7c7b\u578b\u4e0e fetch \u51fd\u6570\u7ed3\u5408\u5b9e\u73b0\u7aef\u5230\u7aef\u7c7b\u578b\u5b89\u5168\uff1a',

    h2_fetch: '\u5728 TypeScript \u4e2d\u4f7f\u7528 JSON API\uff08fetch + \u7c7b\u578b\u5b89\u5168\uff09',
    fetch_p1: '\u5185\u7f6e\u7684 <code>fetch</code> API \u8fd4\u56de\u672a\u7c7b\u578b\u5316\u7684 <code>.json()</code>\u3002\u4ee5\u4e0b\u662f\u6dfb\u52a0\u7c7b\u578b\u5b89\u5168\u7684\u65b9\u6cd5\uff1a',
    h3_typed_fetch: '\u7c7b\u578b\u5316 Fetch \u5305\u88c5\u5668',
    typed_fetch_p: '\u521b\u5efa\u4e00\u4e2a\u6cdb\u578b fetch \u5305\u88c5\u5668\uff1a',
    h3_axios: 'Axios \u4e0e TypeScript',
    axios_p: 'Axios \u5f00\u7bb1\u652f\u6301\u6cdb\u578b\uff1a',
    h3_error_handling: '\u7c7b\u578b\u5b89\u5168\u7684\u9519\u8bef\u5904\u7406',
    error_p: '\u5b9a\u4e49\u9519\u8bef\u7c7b\u578b\u5e76\u4f7f\u7528\u53ef\u8fa8\u522b\u8054\u5408\uff1a',

    h2_tsconfig: 'tsconfig strict \u6a21\u5f0f\u548c JSON \u5bfc\u5165',
    tsconfig_p1: '<code>tsconfig.json</code> \u8bbe\u7f6e\u663e\u8457\u5f71\u54cd TypeScript \u5904\u7406 JSON \u6570\u636e\u7684\u65b9\u5f0f\uff1a',
    h3_strict: '\u542f\u7528 Strict \u6a21\u5f0f',
    strict_p: 'strict \u6a21\u5f0f\u542f\u7528\u4e00\u7ec4\u7c7b\u578b\u68c0\u67e5\u9009\u9879\u3002\u5bf9\u4e8e JSON \u9879\u76ee\uff0c<code>strictNullChecks</code> \u5c24\u5176\u91cd\u8981\uff1a',
    h3_json_import: '\u5bfc\u5165 JSON \u6587\u4ef6',
    json_import_p: '\u542f\u7528 <code>resolveJsonModule</code> \u540e\uff0cTypeScript \u53ef\u4ee5\u5bfc\u5165 .json \u6587\u4ef6\u5e76\u81ea\u52a8\u63a8\u65ad\u7c7b\u578b\uff1a',
    h3_esmodule: 'esModuleInterop',
    esmodule_p: '\u542f\u7528 <code>esModuleInterop</code> \u4ee5\u83b7\u5f97\u66f4\u6574\u6d01\u7684 CommonJS \u6a21\u5757\u5bfc\u5165\uff1a',

    h2_best: '\u7ef4\u62a4\u751f\u6210\u7c7b\u578b\u7684\u6700\u4f73\u5b9e\u8df5',
    best_p1: '\u81ea\u52a8\u751f\u6210\u7684\u7c7b\u578b\u9700\u8981\u6301\u7eed\u7ef4\u62a4\u4ee5\u4e0e API \u4fdd\u6301\u540c\u6b65\uff1a',
    best_li1: '<strong>\u81ea\u52a8\u5316\u751f\u6210</strong>\uff1a\u5728 package.json \u4e2d\u6dfb\u52a0\u4ece API Schema \u91cd\u65b0\u751f\u6210\u7c7b\u578b\u7684\u811a\u672c\u3002',
    best_li2: '<strong>\u7248\u672c\u63a7\u5236\u7c7b\u578b</strong>\uff1a\u5c06\u751f\u6210\u7684\u7c7b\u578b\u63d0\u4ea4\u5230\u7248\u672c\u63a7\u5236\u3002',
    best_li3: '<strong>\u5206\u79bb\u751f\u6210\u4e0e\u624b\u5199</strong>\uff1a\u751f\u6210\u7c7b\u578b\u653e\u5728 <code>types/generated/</code>\uff0c\u624b\u5199\u7c7b\u578b\u653e\u5728 <code>types/</code>\u3002',
    best_li4: '<strong>\u4f7f\u7528 readonly</strong>\uff1a\u7528 <code>Readonly&lt;T&gt;</code> \u6807\u8bb0\u751f\u6210\u7c7b\u578b\u4ee5\u9632\u6b62\u610f\u5916\u4fee\u6539\u3002',
    best_li5: '<strong>\u6dfb\u52a0 JSDoc \u6ce8\u91ca</strong>\uff1a\u7528 API \u6587\u6863\u4e2d\u7684\u63cf\u8ff0\u8bb0\u5f55\u5b57\u6bb5\u3002',
    best_li6: '<strong>\u5728\u8fb9\u754c\u9a8c\u8bc1</strong>\uff1a\u5728 API \u8fb9\u754c\u4f7f\u7528 Zod \u6216 io-ts \u6355\u83b7\u8fd0\u884c\u65f6\u4e0d\u5339\u914d\u3002',
    best_li7: '<strong>CI \u7c7b\u578b\u68c0\u67e5</strong>\uff1a\u5728 CI \u7ba1\u9053\u4e2d\u6dfb\u52a0 <code>tsc --noEmit</code>\u3002',
    best_li8: '<strong>\u4fdd\u6301\u7c7b\u578b DRY</strong>\uff1a\u4f7f\u7528 TypeScript \u5de5\u5177\u7c7b\u578b\uff08Pick, Omit, Partial\uff09\u6d3e\u751f\u5b50\u7c7b\u578b\u3002',

    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: '\u5982\u4f55\u5728\u7ebf\u5c06 JSON \u8f6c\u6362\u4e3a TypeScript \u63a5\u53e3\uff1f',
    faq1_a: '\u5c06 JSON \u7c98\u8d34\u5230\u6211\u4eec\u7684\u514d\u8d39\u5728\u7ebf JSON \u8f6c TypeScript \u8f6c\u6362\u5668\u5de5\u5177\u3002\u5b83\u4f1a\u81ea\u52a8\u751f\u6210\u5e26\u6709\u5d4c\u5957\u3001\u53ef\u9009\u5b57\u6bb5\u548c\u6570\u7ec4\u7c7b\u578b\u7684 TypeScript \u63a5\u53e3\u3002',
    faq2_q: 'TypeScript \u4e2d JSON \u6570\u636e\u5e94\u8be5\u7528 interface \u8fd8\u662f type\uff1f',
    faq2_a: '\u5927\u591a\u6570 JSON \u5bf9\u8c61\u5f62\u72b6\u4f7f\u7528 interface\u3002interface \u652f\u6301\u58f0\u660e\u5408\u5e76\u548c extends\u3002\u8054\u5408\u7c7b\u578b\u548c\u5de5\u5177\u7c7b\u578b\u4f7f\u7528 type\u3002',
    faq3_q: '\u5982\u4f55\u5728 TypeScript \u4e2d\u5904\u7406 JSON \u7684\u53ef\u9009\u548c\u53ef\u7a7a\u5b57\u6bb5\uff1f',
    faq3_a: '\u53ef\u80fd\u7f3a\u5931\u7684\u5b57\u6bb5\u7528 ?\uff0c\u503c\u53ef\u80fd\u4e3a null \u7684\u5b57\u6bb5\u7528 | null\uff0c\u4e24\u8005\u90fd\u6709\u5219\u7ec4\u5408\u4f7f\u7528 ?: string | null\u3002',
    faq4_q: '\u81ea\u52a8\u751f\u6210 TypeScript \u7c7b\u578b\u7684\u6700\u4f73\u5de5\u5177\u662f\u4ec0\u4e48\uff1f',
    faq4_a: 'quicktype \u529f\u80fd\u6700\u5f3a\u5927\uff0c\u652f\u6301\u8054\u5408\u7c7b\u578b\u63a8\u65ad\u548c\u591a\u8bed\u8a00\u8f93\u51fa\u3002\u7b80\u5355\u9700\u6c42\u53ef\u7528 json-to-ts \u6216 VS Code \u6269\u5c55\u3002',
    faq5_q: 'Zod \u5982\u4f55\u5e2e\u52a9 JSON \u548c TypeScript\uff1f',
    faq5_a: 'Zod \u63d0\u4f9b\u8fd0\u884c\u65f6\u9a8c\u8bc1 schema\uff0c\u540c\u65f6\u901a\u8fc7 z.infer<typeof schema> \u751f\u6210 TypeScript \u7c7b\u578b\u3002\u4e00\u6b21\u5b9a\u4e49\uff0c\u540c\u65f6\u83b7\u5f97\u7f16\u8bd1\u65f6\u548c\u8fd0\u884c\u65f6\u4fdd\u62a4\u3002',
    faq6_q: '\u5982\u4f55\u5728 TypeScript \u4e2d\u5b89\u5168\u5730\u5bfc\u5165 JSON \u6587\u4ef6\uff1f',
    faq6_a: '\u5728 tsconfig.json \u4e2d\u542f\u7528 resolveJsonModule \u548c esModuleInterop\uff0c\u7136\u540e\u76f4\u63a5 import data from "./data.json"\u3002',
    faq7_q: 'JSON \u9879\u76ee\u7684\u91cd\u8981 tsconfig \u8bbe\u7f6e\u6709\u54ea\u4e9b\uff1f',
    faq7_a: '\u542f\u7528 strict\u3001resolveJsonModule\u3001esModuleInterop \u548c noUncheckedIndexedAccess\u3002',
    faq8_q: '\u5982\u4f55\u5728 TypeScript \u4e2d\u521b\u5efa\u901a\u7528 API \u54cd\u5e94\u7c7b\u578b\uff1f',
    faq8_a: '\u5b9a\u4e49\u6cdb\u578b\u63a5\u53e3\uff1ainterface ApiResponse<T> { success: boolean; data: T; error?: string; }\u3002\u7136\u540e\u7528\u5177\u4f53\u7c7b\u578b\u4f7f\u7528\uff1aApiResponse<User>\u3002',

    conclusion_title: '\u603b\u7ed3',
    conclusion: '\u4ece JSON \u751f\u6210 TypeScript \u7c7b\u578b\u662f\u73b0\u4ee3 Web \u5f00\u53d1\u4e2d\u6295\u5165\u4ea7\u51fa\u6bd4\u6700\u9ad8\u7684\u5b9e\u8df5\u4e4b\u4e00\u3002\u5b83\u5728\u7f16\u8bd1\u65f6\u6355\u83b7 bug\uff0c\u63d0\u4f9b IDE \u81ea\u52a8\u8865\u5168\uff0c\u5e76\u4fdd\u6301\u524d\u7aef\u4e0e\u540e\u7aef API \u540c\u6b65\u3002\u4ece\u6211\u4eec\u7684\u514d\u8d39\u5728\u7ebf\u5de5\u5177\u5f00\u59cb\u5feb\u901f\u8f6c\u6362\uff0c\u5728 CI \u7ba1\u9053\u4e2d\u91c7\u7528 quicktype\uff0c\u5e76\u5728 API \u8fb9\u754c\u6dfb\u52a0 Zod \u8fdb\u884c\u8fd0\u884c\u65f6\u9a8c\u8bc1\u3002',
    link_tool_bottom: '\u5728\u7ebf\u5c06 JSON \u8f6c\u6362\u4e3a TypeScript',
  },
};

export default function JsonToTypescriptOnlineGuide({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: s.faq6_q, acceptedAnswer: { '@type': 'Answer', text: s.faq6_a } },
      { '@type': 'Question', name: s.faq7_q, acceptedAnswer: { '@type': 'Answer', text: s.faq7_a } },
      { '@type': 'Question', name: s.faq8_q, acceptedAnswer: { '@type': 'Answer', text: s.faq8_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong style={{ fontSize: 16 }}>{s.tldr_title}</strong>
        <p style={{ margin: '8px 0 0 0', lineHeight: 1.7 }}>{s.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong style={{ fontSize: 16 }}>{s.takeaways_title}</strong>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
          <li>{s.takeaway1}</li>
          <li>{s.takeaway2}</li>
          <li>{s.takeaway3}</li>
          <li>{s.takeaway4}</li>
          <li>{s.takeaway5}</li>
          <li>{s.takeaway6}</li>
          <li>{s.takeaway7}</li>
        </ul>
      </div>

      <p><Link href={`/${lang}/tools/json-to-typescript`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 1: Why Generate TypeScript Types from JSON */}
      <h2>{s.h2_why}</h2>
      <p>{s.why_p1}</p>
      <p>{s.why_p2}</p>
      <p>{s.why_p3}</p>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.why_li1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.why_li2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.why_li3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.why_li4 }} />
        <li dangerouslySetInnerHTML={{ __html: s.why_li5 }} />
      </ul>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Without types - runtime errors waiting to happen
const user = await fetch("/api/user").then(r => r.json());
console.log(user.nme);     // Typo! No error until runtime
console.log(user.address.city); // Crashes if address is null

// With generated types - caught at compile time
interface User {
  name: string;
  email: string;
  address: Address | null;
}
const user: User = await fetch("/api/user").then(r => r.json());
console.log(user.nme);     // TS Error: Property 'nme' does not exist
console.log(user.address.city); // TS Error: 'address' is possibly null`}</code></pre>

      {/* Section 2: Interface vs Type */}
      <h2>{s.h2_interface_vs_type}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.ivt_p1 }} />

      <h3>{s.h3_interface}</h3>
      <p>{s.interface_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Interface: extendable and mergeable
interface User {
  id: number;
  name: string;
  email: string;
}

// Extend an interface
interface AdminUser extends User {
  role: "admin";
  permissions: string[];
}

// Declaration merging: add fields to existing interface
interface User {
  avatar?: string; // Merged with the original User interface
}

// Now User has: id, name, email, avatar`}</code></pre>

      <h3>{s.h3_type}</h3>
      <p>{s.type_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Type alias: ideal for unions and intersections
type Status = "active" | "inactive" | "pending";
type ID = string | number;

// Intersection type
type UserWithPosts = User & { posts: Post[] };

// Mapped type (only possible with type)
type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
type UserKeys = keyof User; // "id" | "name" | "email"

// Conditional type
type ApiResult<T> = T extends Error ? ErrorResponse : SuccessResponse<T>;`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.ivt_p2 }} />

      {/* Section 3: Optional and Nullable Fields */}
      <h2>{s.h2_optional}</h2>
      <p>{s.opt_p1}</p>

      <h3>{s.h3_optional_fields}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.opt_fields_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// JSON may or may not have "middleName" and "phone"
// { "name": "Alice", "email": "alice@example.com" }
// { "name": "Bob", "email": "bob@example.com", "middleName": "J.", "phone": "+1234" }

interface User {
  name: string;
  email: string;
  middleName?: string; // May be absent from JSON
  phone?: string;      // May be absent from JSON
}

// Usage: must check before accessing
function getDisplayName(user: User): string {
  if (user.middleName) {
    return \`\${user.name} \${user.middleName}\`;
  }
  return user.name;
}`}</code></pre>

      <h3>{s.h3_nullable}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.nullable_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// JSON always has "bio" but it can be null
// { "name": "Alice", "bio": "Software engineer" }
// { "name": "Bob", "bio": null }

interface UserProfile {
  name: string;
  bio: string | null;       // Always present, may be null
  avatarUrl: string | null;  // Always present, may be null
}

// Usage: narrow the type before using
function renderBio(profile: UserProfile): string {
  return profile.bio ?? "No bio provided";
}`}</code></pre>

      <h3>{s.h3_both}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.both_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`interface UserSettings {
  theme: "light" | "dark";
  nickname?: string | null;     // May be absent OR present as null
  customColor?: string | null;  // May be absent OR present as null
}

// All of these are valid:
const a: UserSettings = { theme: "dark" };                        // nickname absent
const b: UserSettings = { theme: "dark", nickname: null };        // nickname is null
const c: UserSettings = { theme: "dark", nickname: "CoolUser" }; // nickname has value`}</code></pre>

      {/* Section 4: Nested Objects and Arrays */}
      <h2>{s.h2_nested}</h2>
      <p>{s.nested_p1}</p>

      <h3>{s.h3_nested_obj}</h3>
      <p>{s.nested_obj_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// JSON with nested structure:
// {
//   "id": 1,
//   "name": "Alice",
//   "address": { "street": "123 Main", "city": "NYC", "geo": { "lat": 40.7, "lng": -74.0 } },
//   "company": { "name": "Acme", "department": "Engineering" }
// }

interface GeoLocation {
  lat: number;
  lng: number;
}

interface Address {
  street: string;
  city: string;
  state?: string;
  zipCode?: string;
  geo: GeoLocation;
}

interface Company {
  name: string;
  department: string;
}

interface User {
  id: number;
  name: string;
  address: Address;
  company: Company;
}`}</code></pre>

      <h3>{s.h3_nested_arr}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.nested_arr_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`interface BlogPost {
  id: number;
  title: string;
  tags: string[];           // Array of primitives
  comments: Comment[];      // Array of objects
  images: Image[];          // Array of objects
}

interface Comment {
  id: number;
  author: string;
  body: string;
  replies: Comment[];       // Recursive type: comments can have replies
}

interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
}

// Type[] vs Array<Type> - both are equivalent
type StringArray = string[];
type StringArray2 = Array<string>;

// ReadonlyArray prevents push/pop/splice
type ImmutableTags = ReadonlyArray<string>;`}</code></pre>

      <h3>{s.h3_tuple}</h3>
      <p>{s.tuple_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// JSON: { "coordinates": [40.7128, -74.0060] }
// JSON: { "range": [1, 100] }

type Coordinates = [number, number];       // [latitude, longitude]
type Range = [number, number];             // [min, max]
type RGB = [number, number, number];       // [red, green, blue]
type NameAge = [string, number];           // ["Alice", 30]

interface Location {
  name: string;
  coordinates: Coordinates;
}

// Labeled tuple elements (TypeScript 4.0+)
type Point = [x: number, y: number, z?: number];`}</code></pre>

      {/* Section 5: Union Types */}
      <h2>{s.h2_union}</h2>
      <p>{s.union_p1}</p>

      <h3>{s.h3_literal_union}</h3>
      <p>{s.literal_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// String literal union for status field
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  status: OrderStatus;      // Only these 5 values allowed
  priority: "low" | "medium" | "high";
}

// Number literal union
type HttpStatus = 200 | 201 | 400 | 401 | 403 | 404 | 500;

// Mixed type union
type ID = string | number;  // API returns ID as string or number

interface Product {
  id: ID;
  price: number;
  discount: number | null;  // null means no discount
}`}</code></pre>

      <h3>{s.h3_discriminated}</h3>
      <p>{s.disc_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Discriminated union: "type" field determines the shape
interface TextMessage {
  type: "text";
  content: string;
}

interface ImageMessage {
  type: "image";
  url: string;
  width: number;
  height: number;
}

interface VideoMessage {
  type: "video";
  url: string;
  duration: number;
  thumbnail: string;
}

type Message = TextMessage | ImageMessage | VideoMessage;

// TypeScript narrows the type based on the discriminant
function renderMessage(msg: Message) {
  switch (msg.type) {
    case "text":
      return msg.content;        // TypeScript knows this is TextMessage
    case "image":
      return msg.url;            // TypeScript knows this is ImageMessage
    case "video":
      return msg.thumbnail;      // TypeScript knows this is VideoMessage
  }
}`}</code></pre>

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/json-to-typescript`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 6: Generation Tools */}
      <h2>{s.h2_tools}</h2>
      <p>{s.tools_p1}</p>

      <h3>{s.h3_quicktype}</h3>
      <p>{s.quicktype_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Install quicktype CLI
npm install -g quicktype

# Generate TypeScript from a JSON file
quicktype -s json -o types.ts --lang ts data.json

# Generate from a JSON URL (API endpoint)
quicktype -s json -o types.ts --lang ts "https://api.example.com/users"

# Generate with runtime type checks (io-ts)
quicktype -s json -o types.ts --lang ts --just-types data.json

# Generate interfaces (not classes)
quicktype -s json -o types.ts --lang ts --just-types --interfaces-only data.json

# Add to package.json scripts
# "generate:types": "quicktype -s json -o src/types/api.ts --lang ts --just-types api-response.json"`}</code></pre>

      <h3>{s.h3_json2ts}</h3>
      <p>{s.json2ts_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Install json-to-ts
npm install -g json-to-ts

# Use programmatically in Node.js
const JsonToTS = require("json-to-ts");

const json = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  address: {
    street: "123 Main St",
    city: "New York"
  },
  tags: ["developer", "designer"]
};

const interfaces = JsonToTS(json);
console.log(interfaces.join("\\n\\n"));
// interface RootObject {
//   id: number;
//   name: string;
//   email: string;
//   address: Address;
//   tags: string[];
// }
//
// interface Address {
//   street: string;
//   city: string;
// }`}</code></pre>

      <h3>{s.h3_online}</h3>
      <p>{s.online_p}</p>
      <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '16px 20px', marginBottom: 16 }}>
        <p style={{ margin: 0 }}><Link href={`/${lang}/tools/json-to-typescript`} style={{ fontWeight: 600, color: '#16a34a' }}>{s.link_tool} &rarr;</Link></p>
      </div>

      <h3>{s.h3_vscode}</h3>
      <p>{s.vscode_p}</p>

      {/* Section 7: Zod */}
      <h2>{s.h2_zod}</h2>
      <p>{s.zod_p1}</p>

      <h3>{s.h3_zod_basic}</h3>
      <p>{s.zod_basic_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import { z } from "zod";

// Define a schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
  role: z.enum(["admin", "user", "moderator"]),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zipCode: z.string().regex(/^\\d{5}(-\\d{4})?$/),
  }).nullable(),
});

// Infer the TypeScript type from the schema
type User = z.infer<typeof UserSchema>;
// Equivalent to:
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   age?: number | undefined;
//   role: "admin" | "user" | "moderator";
//   address: { street: string; city: string; zipCode: string } | null;
// }

// Validate data at runtime
const result = UserSchema.safeParse(jsonData);
if (result.success) {
  const user = result.data; // Fully typed as User
} else {
  console.error(result.error.issues);
}`}</code></pre>

      <h3>{s.h3_zod_api}</h3>
      <p>{s.zod_api_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import { z } from "zod";

const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number().positive(),
  inStock: z.boolean(),
  categories: z.array(z.string()),
});

type Product = z.infer<typeof ProductSchema>;

async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(\`/api/products/\${id}\`);
  const json = await response.json();

  // Validate at runtime - throws if shape is wrong
  return ProductSchema.parse(json);
}

// Safe version that does not throw
async function fetchProductSafe(id: string) {
  const response = await fetch(\`/api/products/\${id}\`);
  const json = await response.json();
  const result = ProductSchema.safeParse(json);

  if (!result.success) {
    console.error("API response validation failed:", result.error.flatten());
    return null;
  }
  return result.data;
}`}</code></pre>

      <h3>{s.h3_zod_transform}</h3>
      <p>{s.zod_transform_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`const EventSchema = z.object({
  id: z.number(),
  title: z.string().trim(),           // Auto-trim whitespace
  // Transform ISO string to Date object
  startDate: z.string().transform((s) => new Date(s)),
  endDate: z.string().transform((s) => new Date(s)),
  // Default value if missing
  maxAttendees: z.number().default(100),
  // Coerce string to number (common in form data / query params)
  ticketPrice: z.coerce.number(),
});

// Input type (what the API returns)
type EventInput = z.input<typeof EventSchema>;
// { id: number; title: string; startDate: string; endDate: string; ... }

// Output type (what you get after parsing)
type Event = z.output<typeof EventSchema>;
// { id: number; title: string; startDate: Date; endDate: Date; ... }`}</code></pre>

      {/* Section 8: Generic API Response Types */}
      <h2>{s.h2_generic}</h2>
      <p>{s.generic_p1}</p>

      <h3>{s.h3_generic_basic}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.generic_basic_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Generic API response wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    requestId: string;
    timestamp: string;
  };
}

// Usage with specific types
type UserResponse = ApiResponse<User>;
type ProductListResponse = ApiResponse<Product[]>;
type DeleteResponse = ApiResponse<null>;`}</code></pre>

      <h3>{s.h3_generic_paginated}</h3>
      <p>{s.generic_pag_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
}

// Usage
type PaginatedUsers = PaginatedResponse<User>;
type PaginatedProducts = PaginatedResponse<Product>;

// Example response shape:
// {
//   "success": true,
//   "data": [{ "id": 1, "name": "Alice" }, ...],
//   "pagination": { "page": 1, "perPage": 20, "total": 150, ... }
// }`}</code></pre>

      <h3>{s.h3_generic_usage}</h3>
      <p>{s.generic_usage_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Typed API client using generic response types
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<ApiResponse<T>> {
    const res = await fetch(\`\${this.baseUrl}\${path}\`);
    return res.json() as Promise<ApiResponse<T>>;
  }

  async getPaginated<T>(path: string, page = 1): Promise<PaginatedResponse<T>> {
    const res = await fetch(\`\${this.baseUrl}\${path}?page=\${page}\`);
    return res.json() as Promise<PaginatedResponse<T>>;
  }
}

// Usage - fully typed
const api = new ApiClient("https://api.example.com");

const userRes = await api.get<User>("/users/1");
// userRes.data is typed as User

const productsRes = await api.getPaginated<Product>("/products");
// productsRes.data is typed as Product[]
// productsRes.pagination is typed as PaginationMeta`}</code></pre>

      {/* Section 9: Working with JSON APIs */}
      <h2>{s.h2_fetch}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.fetch_p1 }} />

      <h3>{s.h3_typed_fetch}</h3>
      <p>{s.typed_fetch_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Type-safe fetch wrapper
async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }

  return response.json() as Promise<T>;
}

// Usage
const user = await fetchJson<User>("/api/users/1");
// user is typed as User

const products = await fetchJson<Product[]>("/api/products");
// products is typed as Product[]

// POST with typed body
const newUser = await fetchJson<User>("/api/users", {
  method: "POST",
  body: JSON.stringify({ name: "Alice", email: "alice@test.com" }),
});`}</code></pre>

      <h3>{s.h3_axios}</h3>
      <p>{s.axios_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import axios from "axios";

// Axios supports generics for response typing
const { data: user } = await axios.get<User>("/api/users/1");
// user is typed as User

const { data: products } = await axios.get<Product[]>("/api/products");
// products is typed as Product[]

// POST with typed request and response
interface CreateUserRequest {
  name: string;
  email: string;
}

const { data: created } = await axios.post<User, { data: User }, CreateUserRequest>(
  "/api/users",
  { name: "Alice", email: "alice@test.com" }
);`}</code></pre>

      <h3>{s.h3_error_handling}</h3>
      <p>{s.error_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Discriminated union for API results
type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E };

interface ApiError {
  code: string;
  message: string;
  statusCode: number;
}

async function fetchSafe<T>(url: string): Promise<Result<T, ApiError>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        ok: false,
        error: {
          code: "HTTP_ERROR",
          message: response.statusText,
          statusCode: response.status,
        },
      };
    }
    const data = (await response.json()) as T;
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      error: {
        code: "NETWORK_ERROR",
        message: err instanceof Error ? err.message : "Unknown error",
        statusCode: 0,
      },
    };
  }
}

// Usage: TypeScript narrows based on ok field
const result = await fetchSafe<User>("/api/users/1");
if (result.ok) {
  console.log(result.data.name); // Typed as User
} else {
  console.error(result.error.code); // Typed as ApiError
}`}</code></pre>

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/json-to-typescript`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 10: tsconfig */}
      <h2>{s.h2_tsconfig}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.tsconfig_p1 }} />

      <h3>{s.h3_strict}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.strict_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// tsconfig.json - recommended for JSON-heavy projects
{
  "compilerOptions": {
    "strict": true,
    // strict enables all of these:
    // "strictNullChecks": true,       // Forces null/undefined handling
    // "strictFunctionTypes": true,    // Stricter function type checking
    // "strictBindCallApply": true,    // Stricter bind/call/apply
    // "strictPropertyInitialization": true,
    // "noImplicitAny": true,          // No implicit any types
    // "noImplicitThis": true,
    // "alwaysStrict": true,

    // Additional recommended options
    "noUncheckedIndexedAccess": true,  // obj[key] returns T | undefined
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true
  }
}

// With strictNullChecks, this is an error:
const user: User = await fetchJson("/api/users/1");
console.log(user.address.city);
//          ~~~~~~~~~~~~~ Error: Object is possibly 'null'

// Must handle null:
console.log(user.address?.city ?? "Unknown");`}</code></pre>

      <h3>{s.h3_json_import}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.json_import_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// tsconfig.json
{
  "compilerOptions": {
    "resolveJsonModule": true,  // Enable JSON imports
    "esModuleInterop": true     // Enable default imports
  }
}

// Now you can import JSON files with full type inference
import config from "./config.json";
// TypeScript infers: { port: number; host: string; debug: boolean }

import countries from "./countries.json";
// TypeScript infers the full shape of the JSON

// The imported values are fully typed
console.log(config.port);     // number
console.log(config.host);     // string
console.log(config.unknown);  // Error: Property 'unknown' does not exist`}</code></pre>

      <h3>{s.h3_esmodule}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.esmodule_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Without esModuleInterop:
import * as fs from "fs";         // Namespace import required
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

// With esModuleInterop:
import fs from "fs";              // Clean default import
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

// Works for JSON-related libraries too:
import Ajv from "ajv";            // JSON Schema validator
import yaml from "js-yaml";       // YAML parser
import csvParser from "csv-parser"; // CSV parser`}</code></pre>

      {/* Section 11: Best Practices */}
      <h2>{s.h2_best}</h2>
      <p>{s.best_p1}</p>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.best_li1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.best_li2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.best_li3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.best_li4 }} />
        <li dangerouslySetInnerHTML={{ __html: s.best_li5 }} />
        <li dangerouslySetInnerHTML={{ __html: s.best_li6 }} />
        <li dangerouslySetInnerHTML={{ __html: s.best_li7 }} />
        <li dangerouslySetInnerHTML={{ __html: s.best_li8 }} />
      </ul>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Example: project structure for generated types
src/
  types/
    generated/
      api-users.ts       // Auto-generated from OpenAPI spec
      api-products.ts    // Auto-generated from JSON samples
    index.ts             // Re-exports all types
    utils.ts             // Hand-written utility types

// package.json scripts
{
  "scripts": {
    "generate:types": "quicktype -s schema api/openapi.yaml -o src/types/generated/api.ts --lang ts --just-types",
    "typecheck": "tsc --noEmit",
    "prebuild": "npm run generate:types && npm run typecheck"
  }
}

// Use Readonly to prevent mutation of API data
type ReadonlyUser = Readonly<User>;
type DeepReadonlyUser = {
  readonly [K in keyof User]: User[K] extends object
    ? Readonly<User[K]>
    : User[K];
};

// Use utility types to derive sub-types
type CreateUserPayload = Omit<User, "id" | "createdAt">;
type UpdateUserPayload = Partial<Omit<User, "id">>;
type UserSummary = Pick<User, "id" | "name" | "email">;`}</code></pre>

      {/* FAQ Section */}
      <h2>{s.h2_faq}</h2>
      {[
        { q: s.faq1_q, a: s.faq1_a },
        { q: s.faq2_q, a: s.faq2_a },
        { q: s.faq3_q, a: s.faq3_a },
        { q: s.faq4_q, a: s.faq4_a },
        { q: s.faq5_q, a: s.faq5_a },
        { q: s.faq6_q, a: s.faq6_a },
        { q: s.faq7_q, a: s.faq7_a },
        { q: s.faq8_q, a: s.faq8_a },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: 20, borderBottom: '1px solid #e2e8f0', paddingBottom: 16 }}>
          <h3 style={{ fontSize: 16, margin: '0 0 8px 0' }}>{faq.q}</h3>
          <p style={{ margin: 0, color: '#475569', lineHeight: 1.7 }}>{faq.a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <h2>{s.conclusion_title}</h2>
      <p>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/json-to-typescript`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool_bottom} &rarr;</Link></p>
    </>
  );
}
