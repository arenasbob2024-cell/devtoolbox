import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Manually writing TypeScript types for your GraphQL API is a recipe for <strong>type drift, runtime errors, and wasted developer time</strong>. Type generation automates this entirely, keeping your frontend types perfectly in sync with your API schema.',
    try_tool: 'Convert GraphQL schemas to TypeScript types instantly \u2192',
    h2_1: '1. Why Type Generation Matters',
    p1_1: 'GraphQL APIs are strongly typed by design \u2014 the schema defines every query, mutation, field, and argument. But without type generation, frontend developers <strong>manually duplicate</strong> these types in TypeScript, creating two sources of truth that inevitably diverge.',
    p1_2: '<strong>Without type generation:</strong> You write TypeScript interfaces by hand, hope they match the schema, and discover mismatches as runtime errors in production. When the API adds a field, your types are stale.',
    p1_3: '<strong>With type generation:</strong> Types are generated automatically from the schema. When the API changes, you regenerate types and the TypeScript compiler tells you exactly what frontend code needs updating. Zero guesswork.',
    p1_4: 'Type generation typically <strong>saves 2\u20135 hours per week</strong> on medium-sized projects and eliminates an entire category of bugs.',
    h2_2: '2. Manual vs Automated Approaches',
    p2_1: 'Here\'s a comparison of the two approaches:',
    p2_table_aspect: 'Aspect',
    p2_table_manual: 'Manual',
    p2_table_auto: 'Automated',
    p2_2: '<strong>The only valid reason for manual types</strong> is when you\'re consuming a small, rarely-changing API and don\'t want to add tooling. For everything else, automate.',
    h2_3: '3. GraphQL SDL Basics',
    p3_1: 'The <strong>Schema Definition Language (SDL)</strong> is how GraphQL schemas are written. Understanding SDL is essential for working with type generators:',
    p3_2: 'SDL supports these key constructs: <code>type</code> (object types), <code>input</code> (input objects), <code>enum</code> (enumeration types), <code>interface</code> (abstract types), <code>union</code> (union types), and <code>scalar</code> (custom scalar types).',
    p3_3: 'The exclamation mark (<code>!</code>) means <strong>non-nullable</strong>. Without it, fields default to nullable \u2014 the opposite of most programming languages.',
    h2_4: '4. Type Mapping Rules',
    p4_1: 'Type generators follow consistent rules to map GraphQL types to TypeScript:',
    p4_table_gql: 'GraphQL',
    p4_table_ts: 'TypeScript',
    p4_table_notes: 'Notes',
    p4_2: 'Understanding these mappings helps you predict and validate generated output, and write better GraphQL schemas that produce cleaner TypeScript types.',
    h2_5: '5. Code Generators',
    p5_1: 'Several tools can generate TypeScript types from GraphQL schemas. The most popular:',
    p5_2: '<strong>GraphQL Code Generator</strong> (<code>@graphql-codegen</code>) is the industry standard. It\'s plugin-based and supports not just types, but also typed hooks for React Query, Apollo, and urql:',
    p5_3: '<strong>Alternative generators:</strong>',
    p5_alt_list: '<li><strong>gql.tada</strong> \u2014 Compile-time type inference without code generation, uses TypeScript template literal types</li><li><strong>Pothos</strong> \u2014 Code-first schema builder that derives types from your resolver code</li><li><strong>genql</strong> \u2014 Generates a fully typed SDK client from any GraphQL endpoint</li>',
    h2_6: '6. Integration Workflow',
    p6_1: 'A typical type generation workflow integrates into your development and CI/CD pipeline:',
    p6_steps: '<li><strong>Development:</strong> Run codegen in watch mode (<code>--watch</code>) alongside your dev server. Types update automatically as you edit <code>.graphql</code> files</li><li><strong>Pre-commit:</strong> Add codegen to a pre-commit hook to ensure generated types are always committed</li><li><strong>CI/CD:</strong> Run codegen and <code>tsc --noEmit</code> in CI to catch schema drift before deployment</li><li><strong>Schema updates:</strong> When the backend updates the schema, regenerate types and fix any TypeScript errors before merging</li>',
    p6_2: '<strong>Recommended <code>package.json</code> scripts:</strong>',
    p6_3: 'Keep generated files in version control. This makes PRs clearly show what schema changes affect, and lets developers work without running codegen locally.',
    h2_7: '7. Tool Recommendation: GraphQL to TypeScript',
    p7_1: 'Need to quickly convert a GraphQL schema to TypeScript types without setting up a full codegen pipeline? Our <strong>GraphQL to TypeScript converter</strong> handles it in seconds:',
    p7_list: '<li>Converts GraphQL object types to TypeScript interfaces</li><li>Maps enums, input types, and union types correctly</li><li>Handles nullable vs non-nullable fields</li><li>Supports nested and recursive type definitions</li>',
    p7_2: 'Paste your GraphQL SDL and get clean TypeScript types instantly. Perfect for quick prototyping, learning, and one-off conversions.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Should I use code generation or gql.tada for type safety?',
    faq1_a: 'For most teams, GraphQL Code Generator is the safer choice \u2014 it has wider ecosystem support, works with any client library, and produces standard TypeScript files. gql.tada is innovative but requires TypeScript 5.0+ and has a steeper learning curve. Choose gql.tada if you want zero-config type safety and your team is comfortable with advanced TypeScript.',
    faq2_q: 'How often should I regenerate types?',
    faq2_a: 'In development, use watch mode for instant regeneration. In CI, run codegen on every push. The key rule: never manually edit generated files. If you need custom types, create a separate file that imports and extends the generated types.',
    faq3_q: 'Can I generate types from a remote GraphQL endpoint?',
    faq3_a: 'Yes. Most code generators support introspection \u2014 they can query a running GraphQL server for its schema and generate types from that. Configure the endpoint URL in your codegen config. For production APIs, you can also export the schema as an SDL file and use that as the source.',
  },
  zh: {
    intro: '\u4e3a GraphQL API \u624b\u52a8\u7f16\u5199 TypeScript \u7c7b\u578b\u5f88\u5bb9\u6613\u5bfc\u81f4<strong>\u7c7b\u578b\u6f02\u79fb\u3001\u8fd0\u884c\u65f6\u9519\u8bef\u548c\u6d6a\u8d39\u5f00\u53d1\u65f6\u95f4</strong>\u3002\u7c7b\u578b\u751f\u6210\u5b8c\u5168\u81ea\u52a8\u5316\u8fd9\u4e00\u8fc7\u7a0b\uff0c\u4f7f\u524d\u7aef\u7c7b\u578b\u4e0e API schema \u5b8c\u7f8e\u540c\u6b65\u3002',
    try_tool: '\u5373\u65f6\u5c06 GraphQL schema \u8f6c\u6362\u4e3a TypeScript \u7c7b\u578b \u2192',
    h2_1: '1. \u4e3a\u4ec0\u4e48\u7c7b\u578b\u751f\u6210\u5f88\u91cd\u8981',
    p1_1: 'GraphQL API \u8bbe\u8ba1\u4e0a\u5c31\u662f\u5f3a\u7c7b\u578b\u7684\u2014\u2014schema \u5b9a\u4e49\u4e86\u6bcf\u4e2a\u67e5\u8be2\u3001\u53d8\u66f4\u3001\u5b57\u6bb5\u548c\u53c2\u6570\u3002\u4f46\u6ca1\u6709\u7c7b\u578b\u751f\u6210\uff0c\u524d\u7aef\u5f00\u53d1\u8005\u4f1a\u5728 TypeScript \u4e2d<strong>\u624b\u52a8\u590d\u5236</strong>\u8fd9\u4e9b\u7c7b\u578b\uff0c\u521b\u5efa\u4e24\u4e2a\u4e0d\u53ef\u907f\u514d\u4f1a\u53d1\u6563\u7684\u771f\u5b9e\u6765\u6e90\u3002',
    p1_2: '<strong>\u6ca1\u6709\u7c7b\u578b\u751f\u6210\uff1a</strong>\u60a8\u624b\u52a8\u7f16\u5199 TypeScript \u63a5\u53e3\uff0c\u5e0c\u671b\u5b83\u4eec\u4e0e schema \u5339\u914d\uff0c\u7136\u540e\u5728\u751f\u4ea7\u73af\u5883\u4e2d\u4ee5\u8fd0\u884c\u65f6\u9519\u8bef\u7684\u5f62\u5f0f\u53d1\u73b0\u4e0d\u5339\u914d\u3002\u5f53 API \u6dfb\u52a0\u5b57\u6bb5\u65f6\uff0c\u60a8\u7684\u7c7b\u578b\u5df2\u7ecf\u8fc7\u65f6\u3002',
    p1_3: '<strong>\u6709\u7c7b\u578b\u751f\u6210\uff1a</strong>\u7c7b\u578b\u4ece schema \u81ea\u52a8\u751f\u6210\u3002\u5f53 API \u66f4\u6539\u65f6\uff0c\u91cd\u65b0\u751f\u6210\u7c7b\u578b\uff0cTypeScript \u7f16\u8bd1\u5668\u4f1a\u51c6\u786e\u544a\u8bc9\u60a8\u54ea\u4e9b\u524d\u7aef\u4ee3\u7801\u9700\u8981\u66f4\u65b0\u3002\u96f6\u731c\u6d4b\u3002',
    p1_4: '\u7c7b\u578b\u751f\u6210\u901a\u5e38\u5728\u4e2d\u578b\u9879\u76ee\u4e0a\u6bcf\u5468<strong>\u8282\u7701 2\u20135 \u5c0f\u65f6</strong>\uff0c\u5e76\u6d88\u9664\u4e86\u4e00\u6574\u7c7b bug\u3002',
    h2_2: '2. \u624b\u52a8 vs \u81ea\u52a8\u65b9\u6cd5',
    p2_1: '\u4ee5\u4e0b\u662f\u4e24\u79cd\u65b9\u6cd5\u7684\u6bd4\u8f83\uff1a',
    p2_table_aspect: '\u65b9\u9762',
    p2_table_manual: '\u624b\u52a8',
    p2_table_auto: '\u81ea\u52a8',
    p2_2: '<strong>\u624b\u52a8\u7c7b\u578b\u7684\u552f\u4e00\u5408\u7406\u539f\u56e0</strong>\u662f\u5f53\u60a8\u4f7f\u7528\u7684\u662f\u4e00\u4e2a\u5c0f\u578b\u3001\u5f88\u5c11\u53d8\u5316\u7684 API \u4e14\u4e0d\u60f3\u6dfb\u52a0\u5de5\u5177\u3002\u5176\u4ed6\u60c5\u51b5\u90fd\u5e94\u81ea\u52a8\u5316\u3002',
    h2_3: '3. GraphQL SDL \u57fa\u7840',
    p3_1: '<strong>Schema \u5b9a\u4e49\u8bed\u8a00\uff08SDL\uff09</strong>\u662f\u7f16\u5199 GraphQL schema \u7684\u65b9\u5f0f\u3002\u7406\u89e3 SDL \u5bf9\u4e8e\u4f7f\u7528\u7c7b\u578b\u751f\u6210\u5668\u81f3\u5173\u91cd\u8981\uff1a',
    p3_2: 'SDL \u652f\u6301\u8fd9\u4e9b\u5173\u952e\u6784\u9020\uff1a<code>type</code>\uff08\u5bf9\u8c61\u7c7b\u578b\uff09\u3001<code>input</code>\uff08\u8f93\u5165\u5bf9\u8c61\uff09\u3001<code>enum</code>\uff08\u679a\u4e3e\u7c7b\u578b\uff09\u3001<code>interface</code>\uff08\u62bd\u8c61\u7c7b\u578b\uff09\u3001<code>union</code>\uff08\u8054\u5408\u7c7b\u578b\uff09\u548c <code>scalar</code>\uff08\u81ea\u5b9a\u4e49\u6807\u91cf\u7c7b\u578b\uff09\u3002',
    p3_3: '\u611f\u53f9\u53f7\uff08<code>!</code>\uff09\u8868\u793a<strong>\u975e\u7a7a</strong>\u3002\u6ca1\u6709\u5b83\uff0c\u5b57\u6bb5\u9ed8\u8ba4\u4e3a\u53ef\u7a7a\u2014\u2014\u8fd9\u4e0e\u5927\u591a\u6570\u7f16\u7a0b\u8bed\u8a00\u76f8\u53cd\u3002',
    h2_4: '4. \u7c7b\u578b\u6620\u5c04\u89c4\u5219',
    p4_1: '\u7c7b\u578b\u751f\u6210\u5668\u9075\u5faa\u4e00\u81f4\u7684\u89c4\u5219\u5c06 GraphQL \u7c7b\u578b\u6620\u5c04\u5230 TypeScript\uff1a',
    p4_table_gql: 'GraphQL',
    p4_table_ts: 'TypeScript',
    p4_table_notes: '\u5907\u6ce8',
    p4_2: '\u7406\u89e3\u8fd9\u4e9b\u6620\u5c04\u6709\u52a9\u4e8e\u9884\u6d4b\u548c\u9a8c\u8bc1\u751f\u6210\u8f93\u51fa\uff0c\u5e76\u7f16\u5199\u80fd\u4ea7\u751f\u66f4\u5e72\u51c0 TypeScript \u7c7b\u578b\u7684 GraphQL schema\u3002',
    h2_5: '5. \u4ee3\u7801\u751f\u6210\u5668',
    p5_1: '\u51e0\u4e2a\u5de5\u5177\u53ef\u4ee5\u4ece GraphQL schema \u751f\u6210 TypeScript \u7c7b\u578b\u3002\u6700\u6d41\u884c\u7684\uff1a',
    p5_2: '<strong>GraphQL Code Generator</strong>\uff08<code>@graphql-codegen</code>\uff09\u662f\u884c\u4e1a\u6807\u51c6\u3002\u5b83\u57fa\u4e8e\u63d2\u4ef6\uff0c\u4e0d\u4ec5\u652f\u6301\u7c7b\u578b\uff0c\u8fd8\u652f\u6301\u4e3a React Query\u3001Apollo \u548c urql \u751f\u6210\u7c7b\u578b\u5316\u7684 hooks\uff1a',
    p5_3: '<strong>\u66ff\u4ee3\u751f\u6210\u5668\uff1a</strong>',
    p5_alt_list: '<li><strong>gql.tada</strong> \u2014 \u65e0\u9700\u4ee3\u7801\u751f\u6210\u7684\u7f16\u8bd1\u65f6\u7c7b\u578b\u63a8\u65ad\uff0c\u4f7f\u7528 TypeScript \u6a21\u677f\u5b57\u9762\u91cf\u7c7b\u578b</li><li><strong>Pothos</strong> \u2014 \u4ee3\u7801\u4f18\u5148\u7684 schema \u6784\u5efa\u5668\uff0c\u4ece\u89e3\u6790\u5668\u4ee3\u7801\u6d3e\u751f\u7c7b\u578b</li><li><strong>genql</strong> \u2014 \u4ece\u4efb\u4f55 GraphQL \u7aef\u70b9\u751f\u6210\u5b8c\u5168\u7c7b\u578b\u5316\u7684 SDK \u5ba2\u6237\u7aef</li>',
    h2_6: '6. \u96c6\u6210\u5de5\u4f5c\u6d41',
    p6_1: '\u5178\u578b\u7684\u7c7b\u578b\u751f\u6210\u5de5\u4f5c\u6d41\u96c6\u6210\u5230\u60a8\u7684\u5f00\u53d1\u548c CI/CD \u7ba1\u9053\u4e2d\uff1a',
    p6_steps: '<li><strong>\u5f00\u53d1\uff1a</strong>\u5728\u5f00\u53d1\u670d\u52a1\u5668\u65c1\u4ee5\u76d1\u89c6\u6a21\u5f0f\uff08<code>--watch</code>\uff09\u8fd0\u884c codegen\u3002\u7f16\u8f91 <code>.graphql</code> \u6587\u4ef6\u65f6\u7c7b\u578b\u81ea\u52a8\u66f4\u65b0</li><li><strong>\u9884\u63d0\u4ea4\uff1a</strong>\u5c06 codegen \u6dfb\u52a0\u5230\u9884\u63d0\u4ea4\u94a9\u5b50\uff0c\u786e\u4fdd\u751f\u6210\u7684\u7c7b\u578b\u59cb\u7ec8\u88ab\u63d0\u4ea4</li><li><strong>CI/CD\uff1a</strong>\u5728 CI \u4e2d\u8fd0\u884c codegen \u548c <code>tsc --noEmit</code>\uff0c\u5728\u90e8\u7f72\u524d\u6355\u83b7 schema \u6f02\u79fb</li><li><strong>Schema \u66f4\u65b0\uff1a</strong>\u5f53\u540e\u7aef\u66f4\u65b0 schema \u65f6\uff0c\u91cd\u65b0\u751f\u6210\u7c7b\u578b\u5e76\u4fee\u590d\u4efb\u4f55 TypeScript \u9519\u8bef\u540e\u518d\u5408\u5e76</li>',
    p6_2: '<strong>\u63a8\u8350\u7684 <code>package.json</code> \u811a\u672c\uff1a</strong>',
    p6_3: '\u5c06\u751f\u6210\u7684\u6587\u4ef6\u7eb3\u5165\u7248\u672c\u63a7\u5236\u3002\u8fd9\u8ba9 PR \u6e05\u6670\u5c55\u793a schema \u53d8\u66f4\u7684\u5f71\u54cd\uff0c\u5e76\u8ba9\u5f00\u53d1\u8005\u65e0\u9700\u672c\u5730\u8fd0\u884c codegen \u5373\u53ef\u5de5\u4f5c\u3002',
    h2_7: '7. \u5de5\u5177\u63a8\u8350\uff1aGraphQL \u8f6c TypeScript',
    p7_1: '\u9700\u8981\u5feb\u901f\u5c06 GraphQL schema \u8f6c\u6362\u4e3a TypeScript \u7c7b\u578b\uff0c\u65e0\u9700\u8bbe\u7f6e\u5b8c\u6574\u7684 codegen \u7ba1\u9053\uff1f\u6211\u4eec\u7684 <strong>GraphQL \u8f6c TypeScript \u8f6c\u6362\u5668</strong>\u51e0\u79d2\u5373\u53ef\u5904\u7406\uff1a',
    p7_list: '<li>\u5c06 GraphQL \u5bf9\u8c61\u7c7b\u578b\u8f6c\u6362\u4e3a TypeScript \u63a5\u53e3</li><li>\u6b63\u786e\u6620\u5c04\u679a\u4e3e\u3001\u8f93\u5165\u7c7b\u578b\u548c\u8054\u5408\u7c7b\u578b</li><li>\u5904\u7406\u53ef\u7a7a\u4e0e\u975e\u7a7a\u5b57\u6bb5</li><li>\u652f\u6301\u5d4c\u5957\u548c\u9012\u5f52\u7c7b\u578b\u5b9a\u4e49</li>',
    p7_2: '\u7c98\u8d34 GraphQL SDL\uff0c\u5373\u65f6\u83b7\u53d6\u5e72\u51c0\u7684 TypeScript \u7c7b\u578b\u3002\u975e\u5e38\u9002\u5408\u5feb\u901f\u539f\u578b\u8bbe\u8ba1\u3001\u5b66\u4e60\u548c\u4e00\u6b21\u6027\u8f6c\u6362\u3002',
    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: '\u5e94\u8be5\u4f7f\u7528\u4ee3\u7801\u751f\u6210\u8fd8\u662f gql.tada \u6765\u5b9e\u73b0\u7c7b\u578b\u5b89\u5168\uff1f',
    faq1_a: '\u5bf9\u4e8e\u5927\u591a\u6570\u56e2\u961f\uff0cGraphQL Code Generator \u662f\u66f4\u5b89\u5168\u7684\u9009\u62e9\u2014\u2014\u5b83\u62e5\u6709\u66f4\u5e7f\u6cdb\u7684\u751f\u6001\u7cfb\u7edf\u652f\u6301\uff0c\u9002\u7528\u4e8e\u4efb\u4f55\u5ba2\u6237\u7aef\u5e93\uff0c\u5e76\u751f\u6210\u6807\u51c6 TypeScript \u6587\u4ef6\u3002gql.tada \u5f88\u521b\u65b0\uff0c\u4f46\u9700\u8981 TypeScript 5.0+ \u4e14\u5b66\u4e60\u66f2\u7ebf\u66f4\u9661\u3002\u5982\u679c\u60a8\u60f3\u8981\u96f6\u914d\u7f6e\u7684\u7c7b\u578b\u5b89\u5168\u4e14\u56e2\u961f\u719f\u6089\u9ad8\u7ea7 TypeScript\uff0c\u53ef\u4ee5\u9009\u62e9 gql.tada\u3002',
    faq2_q: '\u5e94\u8be5\u591a\u4e45\u91cd\u65b0\u751f\u6210\u4e00\u6b21\u7c7b\u578b\uff1f',
    faq2_a: '\u5f00\u53d1\u65f6\u4f7f\u7528\u76d1\u89c6\u6a21\u5f0f\u5373\u65f6\u91cd\u65b0\u751f\u6210\u3002\u5728 CI \u4e2d\u6bcf\u6b21\u63a8\u9001\u65f6\u8fd0\u884c codegen\u3002\u5173\u952e\u89c4\u5219\uff1a\u6c38\u8fdc\u4e0d\u8981\u624b\u52a8\u7f16\u8f91\u751f\u6210\u7684\u6587\u4ef6\u3002\u5982\u679c\u9700\u8981\u81ea\u5b9a\u4e49\u7c7b\u578b\uff0c\u521b\u5efa\u4e00\u4e2a\u5355\u72ec\u7684\u6587\u4ef6\u6765\u5bfc\u5165\u548c\u6269\u5c55\u751f\u6210\u7684\u7c7b\u578b\u3002',
    faq3_q: '\u53ef\u4ee5\u4ece\u8fdc\u7a0b GraphQL \u7aef\u70b9\u751f\u6210\u7c7b\u578b\u5417\uff1f',
    faq3_a: '\u53ef\u4ee5\u3002\u5927\u591a\u6570\u4ee3\u7801\u751f\u6210\u5668\u652f\u6301\u5185\u7701\u2014\u2014\u5b83\u4eec\u53ef\u4ee5\u67e5\u8be2\u8fd0\u884c\u4e2d\u7684 GraphQL \u670d\u52a1\u5668\u83b7\u53d6 schema \u5e76\u4ece\u4e2d\u751f\u6210\u7c7b\u578b\u3002\u5728 codegen \u914d\u7f6e\u4e2d\u914d\u7f6e\u7aef\u70b9 URL \u5373\u53ef\u3002\u5bf9\u4e8e\u751f\u4ea7 API\uff0c\u60a8\u4e5f\u53ef\u4ee5\u5c06 schema \u5bfc\u51fa\u4e3a SDL \u6587\u4ef6\u5e76\u4ee5\u6b64\u4e3a\u6e90\u3002',
  },
};

export default function GraphqlTypeGeneration({ lang }: { lang: string }) {
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
        <Link href={`/${lang}/tools/graphql-to-typescript`} style={{ fontWeight: 600 }}>
          {tx.try_tool}
        </Link>
      </p>

      <h2>{tx.h2_1}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p1_1 }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p1_2 }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p1_3 }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p1_4 }} />

      <h2>{tx.h2_2}</h2>
      <p>{tx.p2_1}</p>
      <table>
        <thead>
          <tr><th>{tx.p2_table_aspect}</th><th>{tx.p2_table_manual}</th><th>{tx.p2_table_auto}</th></tr>
        </thead>
        <tbody>
          <tr><td>Accuracy</td><td>Error-prone</td><td>Always matches schema</td></tr>
          <tr><td>Maintenance</td><td>Manual updates needed</td><td>One command to sync</td></tr>
          <tr><td>Setup Cost</td><td>None</td><td>~15 min one-time setup</td></tr>
          <tr><td>Ongoing Cost</td><td>Hours per week</td><td>Near zero</td></tr>
          <tr><td>Schema Drift Detection</td><td>At runtime (production)</td><td>At compile time (CI)</td></tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_2 }} />

      <h2>{tx.h2_3}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_1 }} />
      <pre><code>{`type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
  role: Role!
}

type Post {
  id: ID!
  title: String!
  content: String
  author: User!
  tags: [String!]
  createdAt: DateTime!
}

enum Role {
  ADMIN
  EDITOR
  VIEWER
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int
  role: Role = VIEWER
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_2 }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p3_3 }} />

      <h2>{tx.h2_4}</h2>
      <p>{tx.p4_1}</p>
      <table>
        <thead>
          <tr><th>{tx.p4_table_gql}</th><th>{tx.p4_table_ts}</th><th>{tx.p4_table_notes}</th></tr>
        </thead>
        <tbody>
          <tr><td><code>String!</code></td><td><code>string</code></td><td>Non-nullable string</td></tr>
          <tr><td><code>String</code></td><td><code>string | null</code></td><td>Nullable string</td></tr>
          <tr><td><code>Int! / Float!</code></td><td><code>number</code></td><td>JS has one number type</td></tr>
          <tr><td><code>Boolean!</code></td><td><code>boolean</code></td><td>Direct mapping</td></tr>
          <tr><td><code>ID!</code></td><td><code>string</code></td><td>IDs are serialized as strings</td></tr>
          <tr><td><code>[String!]!</code></td><td><code>string[]</code></td><td>Non-null array of non-null strings</td></tr>
          <tr><td><code>[String]</code></td><td><code>(string | null)[] | null</code></td><td>Nullable array of nullable strings</td></tr>
          <tr><td><code>enum Role</code></td><td><code>enum Role</code></td><td>TS enum or string union</td></tr>
        </tbody>
      </table>
      <p>{tx.p4_2}</p>

      <h2>{tx.h2_5}</h2>
      <p>{tx.p5_1}</p>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_2 }} />
      <pre><code>{`# codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',        // or a URL
  documents: 'src/**/*.graphql',     // your queries/mutations
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',    // optional: typed hooks
      ],
    },
  },
};

export default config;`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_3 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p5_alt_list }} />

      <h2>{tx.h2_6}</h2>
      <p>{tx.p6_1}</p>
      <ol dangerouslySetInnerHTML={{ __html: tx.p6_steps }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p6_2 }} />
      <pre><code>{`{
  "scripts": {
    "codegen": "graphql-codegen",
    "codegen:watch": "graphql-codegen --watch",
    "typecheck": "tsc --noEmit",
    "precommit": "npm run codegen && npm run typecheck"
  }
}`}</code></pre>
      <p>{tx.p6_3}</p>

      <h2>{tx.h2_7}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p7_1 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p7_list }} />
      <p>{tx.p7_2}</p>
      <p>
        <Link href={`/${lang}/tools/graphql-to-typescript`} style={{ fontWeight: 600 }}>
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
    </>
  );
}
