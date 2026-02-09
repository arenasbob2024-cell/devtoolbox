import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'TypeScript has become the default choice for new JavaScript projects, but millions of lines of JS code still power production apps. This guide covers the <strong>key differences, when to choose each language, and how to migrate</strong> \u2014 including what actually happens when TypeScript compiles to JavaScript.',
    try_tool: 'Convert TypeScript to JavaScript instantly \u2192',
    h2_1: '1. TypeScript vs JavaScript: Key Differences',
    p1_1: 'TypeScript is a <strong>strict syntactical superset</strong> of JavaScript. Every valid JS file is already valid TS. TypeScript adds an optional static type system that catches errors at compile time rather than runtime.',
    p1_table_feature: 'Feature',
    p1_table_js: 'JavaScript',
    p1_table_ts: 'TypeScript',
    p1_2: 'The critical insight: TypeScript types exist <strong>only at compile time</strong>. After compilation, all type annotations are removed and you\'re left with standard JavaScript. There is zero runtime overhead.',
    h2_2: '2. When to Use Each',
    p2_1: '<strong>Choose TypeScript when:</strong>',
    p2_ts_list: '<li>Your project has more than a few hundred lines of code</li><li>Multiple developers work on the same codebase</li><li>You\'re building libraries or APIs consumed by others</li><li>You want better IDE support (autocomplete, refactoring)</li><li>Your project will be maintained long-term</li>',
    p2_2: '<strong>Choose JavaScript when:</strong>',
    p2_js_list: '<li>Quick prototypes or scripts (under 200 lines)</li><li>Simple serverless functions or small utilities</li><li>Your team has no TypeScript experience and deadlines are tight</li><li>Configuration files and build scripts</li><li>You need maximum ecosystem compatibility (some older tools struggle with TS)</li>',
    p2_3: '<strong>Bottom line:</strong> For any project you\'ll maintain beyond a month, TypeScript pays for itself through fewer bugs and better refactoring confidence.',
    h2_3: '3. Gradual Migration Strategy',
    p3_1: 'You don\'t have to convert an entire project at once. TypeScript supports <strong>gradual adoption</strong>:',
    p3_steps: '<li><strong>Step 1:</strong> Add <code>tsconfig.json</code> with <code>"allowJs": true</code> and <code>"strict": false</code></li><li><strong>Step 2:</strong> Rename files one by one from <code>.js</code> to <code>.ts</code></li><li><strong>Step 3:</strong> Add types to the renamed files, starting with public-facing APIs</li><li><strong>Step 4:</strong> Gradually enable stricter compiler options</li><li><strong>Step 5:</strong> Enable <code>"strict": true</code> when most files are converted</li>',
    p3_2: 'This approach lets you keep shipping features while improving type safety incrementally.',
    p3_3: '<strong>Pro tip:</strong> Start by adding types to shared utility functions and data models. These provide the most value because they\'re imported throughout the codebase.',
    h2_4: '4. What TypeScript Compiles To',
    p4_1: 'Understanding the TypeScript compiler output demystifies the whole system. Here\'s what happens to common TS features:',
    p4_2: '<strong>Type annotations</strong> are simply removed:',
    p4_3: '<strong>Interfaces and type aliases</strong> are completely erased \u2014 they produce zero JavaScript output:',
    p4_4: '<strong>Enums</strong> are one of the few TS features that produce runtime code:',
    h2_5: '5. Common TypeScript Syntax Removed During Compilation',
    p5_1: 'These TypeScript-only constructs are <strong>stripped entirely</strong> during compilation and produce no JavaScript output:',
    p5_list: '<li><code>type</code> aliases \u2014 <code>type User = {{ name: string }}</code></li><li><code>interface</code> declarations \u2014 <code>interface Props {{ title: string }}</code></li><li>Type annotations \u2014 <code>const x: number = 5</code> becomes <code>const x = 5</code></li><li>Generic type parameters \u2014 <code>function identity&lt;T&gt;(x: T)</code> becomes <code>function identity(x)</code></li><li><code>as</code> type assertions \u2014 <code>value as string</code> becomes <code>value</code></li><li><code>!</code> non-null assertions \u2014 <code>element!.click()</code> becomes <code>element.click()</code></li><li><code>declare</code> blocks \u2014 ambient declarations for external code</li>',
    p5_2: '<strong>Important:</strong> Some TS features like <code>enum</code>, <code>namespace</code>, and parameter decorators <em>do</em> produce runtime JavaScript. These are the exception, not the rule.',
    h2_6: '6. Project Setup Tips',
    p6_1: 'Whether you\'re starting fresh or migrating, these <code>tsconfig.json</code> settings are recommended:',
    p6_2: '<strong>Key settings explained:</strong>',
    p6_settings: '<li><code>"strict": true</code> \u2014 Enables all strict type checks (the whole point of using TS)</li><li><code>"noUncheckedIndexedAccess": true</code> \u2014 Array and object index access returns <code>T | undefined</code></li><li><code>"forceConsistentCasingInFileNames"</code> \u2014 Prevents bugs on case-sensitive file systems (Linux)</li><li><code>"skipLibCheck": true</code> \u2014 Skips type-checking <code>node_modules</code> for faster builds</li>',
    p6_3: 'For Next.js, Vite, and other frameworks, the framework\'s default <code>tsconfig.json</code> is usually a good starting point. Only customize what you need.',
    h2_7: '7. Tool Recommendation: TypeScript to JavaScript Converter',
    p7_1: 'Need to quickly see what your TypeScript compiles to, or convert a TS snippet for a JS-only project? Our <strong>TypeScript to JavaScript converter</strong> handles it instantly:',
    p7_list: '<li>Strips all type annotations, interfaces, and type aliases</li><li>Converts enums to their JavaScript equivalents</li><li>Preserves all runtime logic and formatting</li><li>Shows you exactly what the TypeScript compiler produces</li>',
    p7_2: 'Paste your TypeScript code and see the clean JavaScript output immediately. Great for learning, debugging, and sharing code with JS-only teams.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Does TypeScript make my code run slower?',
    faq1_a: 'No. TypeScript has zero runtime performance overhead. All type information is removed during compilation. The resulting JavaScript runs at exactly the same speed as hand-written JavaScript. The only cost is a slightly longer build step.',
    faq2_q: 'Can I use TypeScript without a build step?',
    faq2_a: 'Recent Node.js versions (22.6+) support running TypeScript directly with <code>--experimental-strip-types</code>. Deno and Bun support TypeScript natively. For browsers, you still need a compilation step, which tools like Vite handle transparently.',
    faq3_q: 'Should I convert all my JavaScript files to TypeScript at once?',
    faq3_a: 'No. Gradual migration is strongly recommended. Start with <code>"allowJs": true</code> in your tsconfig, rename files one at a time, and add types progressively. Converting everything at once creates a massive PR that\'s hard to review and may introduce bugs.',
  },
  zh: {
    intro: 'TypeScript \u5df2\u6210\u4e3a\u65b0 JavaScript \u9879\u76ee\u7684\u9ed8\u8ba4\u9009\u62e9\uff0c\u4f46\u4ecd\u6709\u6570\u767e\u4e07\u884c JS \u4ee3\u7801\u5728\u751f\u4ea7\u73af\u5883\u4e2d\u8fd0\u884c\u3002\u672c\u6307\u5357\u6db5\u76d6<strong>\u5173\u952e\u5dee\u5f02\u3001\u4f55\u65f6\u9009\u62e9\u54ea\u79cd\u8bed\u8a00\u4ee5\u53ca\u5982\u4f55\u8fc1\u79fb</strong>\u2014\u2014\u5305\u62ec TypeScript \u7f16\u8bd1\u4e3a JavaScript \u65f6\u5b9e\u9645\u53d1\u751f\u4e86\u4ec0\u4e48\u3002',
    try_tool: '\u5373\u65f6\u5c06 TypeScript \u8f6c\u6362\u4e3a JavaScript \u2192',
    h2_1: '1. TypeScript \u4e0e JavaScript\uff1a\u5173\u952e\u5dee\u5f02',
    p1_1: 'TypeScript \u662f JavaScript \u7684<strong>\u4e25\u683c\u8bed\u6cd5\u8d85\u96c6</strong>\u3002\u6bcf\u4e2a\u6709\u6548\u7684 JS \u6587\u4ef6\u5df2\u7ecf\u662f\u6709\u6548\u7684 TS\u3002TypeScript \u6dfb\u52a0\u4e86\u4e00\u4e2a\u53ef\u9009\u7684\u9759\u6001\u7c7b\u578b\u7cfb\u7edf\uff0c\u5728\u7f16\u8bd1\u65f6\u800c\u975e\u8fd0\u884c\u65f6\u6355\u83b7\u9519\u8bef\u3002',
    p1_table_feature: '\u7279\u6027',
    p1_table_js: 'JavaScript',
    p1_table_ts: 'TypeScript',
    p1_2: '\u5173\u952e\u89c1\u89e3\uff1aTypeScript \u7c7b\u578b\u4ec5\u5b58\u5728\u4e8e<strong>\u7f16\u8bd1\u65f6</strong>\u3002\u7f16\u8bd1\u540e\uff0c\u6240\u6709\u7c7b\u578b\u6ce8\u89e3\u90fd\u4f1a\u88ab\u5220\u9664\uff0c\u7559\u4e0b\u7684\u662f\u6807\u51c6 JavaScript\u3002\u8fd0\u884c\u65f6\u96f6\u5f00\u9500\u3002',
    h2_2: '2. \u4f55\u65f6\u4f7f\u7528\u54ea\u79cd',
    p2_1: '<strong>\u9009\u62e9 TypeScript \u7684\u60c5\u51b5\uff1a</strong>',
    p2_ts_list: '<li>\u9879\u76ee\u8d85\u8fc7\u51e0\u767e\u884c\u4ee3\u7801</li><li>\u591a\u4e2a\u5f00\u53d1\u8005\u5728\u540c\u4e00\u4ee3\u7801\u5e93\u5de5\u4f5c</li><li>\u6784\u5efa\u4f9b\u4ed6\u4eba\u4f7f\u7528\u7684\u5e93\u6216 API</li><li>\u60f3\u8981\u66f4\u597d\u7684 IDE \u652f\u6301\uff08\u81ea\u52a8\u5b8c\u6210\u3001\u91cd\u6784\uff09</li><li>\u9879\u76ee\u5c06\u957f\u671f\u7ef4\u62a4</li>',
    p2_2: '<strong>\u9009\u62e9 JavaScript \u7684\u60c5\u51b5\uff1a</strong>',
    p2_js_list: '<li>\u5feb\u901f\u539f\u578b\u6216\u811a\u672c\uff08200 \u884c\u4ee5\u4e0b\uff09</li><li>\u7b80\u5355\u7684 serverless \u51fd\u6570\u6216\u5c0f\u5de5\u5177</li><li>\u56e2\u961f\u6ca1\u6709 TypeScript \u7ecf\u9a8c\u4e14\u622a\u6b62\u65e5\u671f\u7d27\u8feb</li><li>\u914d\u7f6e\u6587\u4ef6\u548c\u6784\u5efa\u811a\u672c</li><li>\u9700\u8981\u6700\u5927\u751f\u6001\u7cfb\u7edf\u517c\u5bb9\u6027\uff08\u67d0\u4e9b\u65e7\u5de5\u5177\u5bf9 TS \u652f\u6301\u4e0d\u4f73\uff09</li>',
    p2_3: '<strong>\u603b\u7ed3\uff1a</strong>\u5bf9\u4e8e\u4efb\u4f55\u7ef4\u62a4\u8d85\u8fc7\u4e00\u4e2a\u6708\u7684\u9879\u76ee\uff0cTypeScript \u901a\u8fc7\u51cf\u5c11 bug \u548c\u63d0\u9ad8\u91cd\u6784\u4fe1\u5fc3\u6765\u56de\u62a5\u6295\u5165\u3002',
    h2_3: '3. \u6e10\u8fdb\u5f0f\u8fc1\u79fb\u7b56\u7565',
    p3_1: '\u4e0d\u5fc5\u4e00\u6b21\u6027\u8f6c\u6362\u6574\u4e2a\u9879\u76ee\u3002TypeScript \u652f\u6301<strong>\u6e10\u8fdb\u5f0f\u91c7\u7528</strong>\uff1a',
    p3_steps: '<li><strong>\u7b2c 1 \u6b65\uff1a</strong>\u6dfb\u52a0 <code>tsconfig.json</code>\uff0c\u8bbe\u7f6e <code>"allowJs": true</code> \u548c <code>"strict": false</code></li><li><strong>\u7b2c 2 \u6b65\uff1a</strong>\u9010\u4e2a\u5c06\u6587\u4ef6\u4ece <code>.js</code> \u91cd\u547d\u540d\u4e3a <code>.ts</code></li><li><strong>\u7b2c 3 \u6b65\uff1a</strong>\u4e3a\u91cd\u547d\u540d\u7684\u6587\u4ef6\u6dfb\u52a0\u7c7b\u578b\uff0c\u4ece\u516c\u5171 API \u5f00\u59cb</li><li><strong>\u7b2c 4 \u6b65\uff1a</strong>\u9010\u6b65\u542f\u7528\u66f4\u4e25\u683c\u7684\u7f16\u8bd1\u5668\u9009\u9879</li><li><strong>\u7b2c 5 \u6b65\uff1a</strong>\u5f53\u5927\u591a\u6570\u6587\u4ef6\u8f6c\u6362\u5b8c\u6210\u540e\u542f\u7528 <code>"strict": true</code></li>',
    p3_2: '\u8fd9\u79cd\u65b9\u6cd5\u8ba9\u60a8\u5728\u9010\u6b65\u63d0\u9ad8\u7c7b\u578b\u5b89\u5168\u6027\u7684\u540c\u65f6\u7ee7\u7eed\u4ea4\u4ed8\u529f\u80fd\u3002',
    p3_3: '<strong>\u4e13\u4e1a\u63d0\u793a\uff1a</strong>\u4ece\u5171\u4eab\u5de5\u5177\u51fd\u6570\u548c\u6570\u636e\u6a21\u578b\u5f00\u59cb\u6dfb\u52a0\u7c7b\u578b\u3002\u8fd9\u4e9b\u63d0\u4f9b\u6700\u5927\u4ef7\u503c\uff0c\u56e0\u4e3a\u5b83\u4eec\u5728\u6574\u4e2a\u4ee3\u7801\u5e93\u4e2d\u88ab\u5bfc\u5165\u3002',
    h2_4: '4. TypeScript \u7f16\u8bd1\u4e3a\u4ec0\u4e48',
    p4_1: '\u7406\u89e3 TypeScript \u7f16\u8bd1\u5668\u8f93\u51fa\u53ef\u4ee5\u63ed\u5f00\u6574\u4e2a\u7cfb\u7edf\u7684\u795e\u79d8\u9762\u7eb1\u3002\u4ee5\u4e0b\u662f\u5e38\u89c1 TS \u7279\u6027\u7684\u7f16\u8bd1\u7ed3\u679c\uff1a',
    p4_2: '<strong>\u7c7b\u578b\u6ce8\u89e3</strong>\u88ab\u7b80\u5355\u5220\u9664\uff1a',
    p4_3: '<strong>\u63a5\u53e3\u548c\u7c7b\u578b\u522b\u540d</strong>\u88ab\u5b8c\u5168\u64e6\u9664\u2014\u2014\u4e0d\u4f1a\u4ea7\u751f\u4efb\u4f55 JavaScript \u8f93\u51fa\uff1a',
    p4_4: '<strong>\u679a\u4e3e</strong>\u662f\u5c11\u6570\u4f1a\u4ea7\u751f\u8fd0\u884c\u65f6\u4ee3\u7801\u7684 TS \u7279\u6027\u4e4b\u4e00\uff1a',
    h2_5: '5. \u7f16\u8bd1\u65f6\u5220\u9664\u7684\u5e38\u89c1 TypeScript \u8bed\u6cd5',
    p5_1: '\u8fd9\u4e9b\u4ec5\u5c5e\u4e8e TypeScript \u7684\u6784\u9020\u5728\u7f16\u8bd1\u65f6\u88ab<strong>\u5b8c\u5168\u5254\u9664</strong>\uff0c\u4e0d\u4f1a\u4ea7\u751f JavaScript \u8f93\u51fa\uff1a',
    p5_list: '<li><code>type</code> \u522b\u540d \u2014 <code>type User = {{ name: string }}</code></li><li><code>interface</code> \u58f0\u660e \u2014 <code>interface Props {{ title: string }}</code></li><li>\u7c7b\u578b\u6ce8\u89e3 \u2014 <code>const x: number = 5</code> \u53d8\u4e3a <code>const x = 5</code></li><li>\u6cdb\u578b\u7c7b\u578b\u53c2\u6570 \u2014 <code>function identity&lt;T&gt;(x: T)</code> \u53d8\u4e3a <code>function identity(x)</code></li><li><code>as</code> \u7c7b\u578b\u65ad\u8a00 \u2014 <code>value as string</code> \u53d8\u4e3a <code>value</code></li><li><code>!</code> \u975e\u7a7a\u65ad\u8a00 \u2014 <code>element!.click()</code> \u53d8\u4e3a <code>element.click()</code></li><li><code>declare</code> \u5757 \u2014 \u5916\u90e8\u4ee3\u7801\u7684\u73af\u5883\u58f0\u660e</li>',
    p5_2: '<strong>\u91cd\u8981\uff1a</strong>\u67d0\u4e9b TS \u7279\u6027\u5982 <code>enum</code>\u3001<code>namespace</code> \u548c\u53c2\u6570\u88c5\u9970\u5668<em>\u4f1a</em>\u4ea7\u751f\u8fd0\u884c\u65f6 JavaScript\u3002\u8fd9\u4e9b\u662f\u4f8b\u5916\u800c\u975e\u89c4\u5219\u3002',
    h2_6: '6. \u9879\u76ee\u8bbe\u7f6e\u6280\u5de7',
    p6_1: '\u65e0\u8bba\u662f\u4ece\u96f6\u5f00\u59cb\u8fd8\u662f\u8fc1\u79fb\uff0c\u4ee5\u4e0b <code>tsconfig.json</code> \u8bbe\u7f6e\u503c\u5f97\u63a8\u8350\uff1a',
    p6_2: '<strong>\u5173\u952e\u8bbe\u7f6e\u8bf4\u660e\uff1a</strong>',
    p6_settings: '<li><code>"strict": true</code> \u2014 \u542f\u7528\u6240\u6709\u4e25\u683c\u7c7b\u578b\u68c0\u67e5\uff08\u4f7f\u7528 TS \u7684\u6838\u5fc3\u76ee\u7684\uff09</li><li><code>"noUncheckedIndexedAccess": true</code> \u2014 \u6570\u7ec4\u548c\u5bf9\u8c61\u7d22\u5f15\u8bbf\u95ee\u8fd4\u56de <code>T | undefined</code></li><li><code>"forceConsistentCasingInFileNames"</code> \u2014 \u9632\u6b62\u5728\u533a\u5206\u5927\u5c0f\u5199\u7684\u6587\u4ef6\u7cfb\u7edf\uff08Linux\uff09\u4e0a\u51fa\u73b0 bug</li><li><code>"skipLibCheck": true</code> \u2014 \u8df3\u8fc7 <code>node_modules</code> \u7c7b\u578b\u68c0\u67e5\u4ee5\u52a0\u5feb\u6784\u5efa</li>',
    p6_3: '\u5bf9\u4e8e Next.js\u3001Vite \u548c\u5176\u4ed6\u6846\u67b6\uff0c\u6846\u67b6\u9ed8\u8ba4\u7684 <code>tsconfig.json</code> \u901a\u5e38\u662f\u5f88\u597d\u7684\u8d77\u70b9\u3002\u53ea\u81ea\u5b9a\u4e49\u60a8\u9700\u8981\u7684\u90e8\u5206\u3002',
    h2_7: '7. \u5de5\u5177\u63a8\u8350\uff1aTypeScript \u8f6c JavaScript \u8f6c\u6362\u5668',
    p7_1: '\u9700\u8981\u5feb\u901f\u67e5\u770b TypeScript \u7f16\u8bd1\u7ed3\u679c\uff0c\u6216\u4e3a\u7eaf JS \u9879\u76ee\u8f6c\u6362 TS \u4ee3\u7801\u7247\u6bb5\uff1f\u6211\u4eec\u7684 <strong>TypeScript \u8f6c JavaScript \u8f6c\u6362\u5668</strong>\u5373\u65f6\u5904\u7406\uff1a',
    p7_list: '<li>\u5254\u9664\u6240\u6709\u7c7b\u578b\u6ce8\u89e3\u3001\u63a5\u53e3\u548c\u7c7b\u578b\u522b\u540d</li><li>\u5c06\u679a\u4e3e\u8f6c\u6362\u4e3a JavaScript \u7b49\u6548\u5f62\u5f0f</li><li>\u4fdd\u7559\u6240\u6709\u8fd0\u884c\u65f6\u903b\u8f91\u548c\u683c\u5f0f</li><li>\u51c6\u786e\u5c55\u793a TypeScript \u7f16\u8bd1\u5668\u7684\u8f93\u51fa</li>',
    p7_2: '\u7c98\u8d34 TypeScript \u4ee3\u7801\uff0c\u7acb\u5373\u67e5\u770b\u5e72\u51c0\u7684 JavaScript \u8f93\u51fa\u3002\u975e\u5e38\u9002\u5408\u5b66\u4e60\u3001\u8c03\u8bd5\u548c\u4e0e\u7eaf JS \u56e2\u961f\u5171\u4eab\u4ee3\u7801\u3002',
    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: 'TypeScript \u4f1a\u8ba9\u4ee3\u7801\u8fd0\u884c\u66f4\u6162\u5417\uff1f',
    faq1_a: '\u4e0d\u4f1a\u3002TypeScript \u7684\u8fd0\u884c\u65f6\u6027\u80fd\u5f00\u9500\u4e3a\u96f6\u3002\u6240\u6709\u7c7b\u578b\u4fe1\u606f\u5728\u7f16\u8bd1\u65f6\u88ab\u5220\u9664\u3002\u751f\u6210\u7684 JavaScript \u8fd0\u884c\u901f\u5ea6\u4e0e\u624b\u5199 JavaScript \u5b8c\u5168\u76f8\u540c\u3002\u552f\u4e00\u7684\u6210\u672c\u662f\u7a0d\u5fae\u52a0\u957f\u7684\u6784\u5efa\u6b65\u9aa4\u3002',
    faq2_q: '\u53ef\u4ee5\u4e0d\u7528\u6784\u5efa\u6b65\u9aa4\u76f4\u63a5\u4f7f\u7528 TypeScript \u5417\uff1f',
    faq2_a: '\u8fd1\u671f\u7684 Node.js \u7248\u672c\uff0822.6+\uff09\u652f\u6301\u901a\u8fc7 <code>--experimental-strip-types</code> \u76f4\u63a5\u8fd0\u884c TypeScript\u3002Deno \u548c Bun \u539f\u751f\u652f\u6301 TypeScript\u3002\u5bf9\u4e8e\u6d4f\u89c8\u5668\uff0c\u4ecd\u7136\u9700\u8981\u7f16\u8bd1\u6b65\u9aa4\uff0cVite \u7b49\u5de5\u5177\u4f1a\u900f\u660e\u5730\u5904\u7406\u3002',
    faq3_q: '\u5e94\u8be5\u4e00\u6b21\u6027\u5c06\u6240\u6709 JavaScript \u6587\u4ef6\u8f6c\u6362\u4e3a TypeScript \u5417\uff1f',
    faq3_a: '\u4e0d\u5e94\u8be5\u3002\u5f3a\u70c8\u5efa\u8bae\u6e10\u8fdb\u5f0f\u8fc1\u79fb\u3002\u4ece tsconfig \u4e2d\u8bbe\u7f6e <code>"allowJs": true</code> \u5f00\u59cb\uff0c\u9010\u4e2a\u91cd\u547d\u540d\u6587\u4ef6\uff0c\u9010\u6b65\u6dfb\u52a0\u7c7b\u578b\u3002\u4e00\u6b21\u6027\u8f6c\u6362\u6240\u6709\u5185\u5bb9\u4f1a\u4ea7\u751f\u4e00\u4e2a\u96be\u4ee5\u5ba1\u67e5\u7684\u5de8\u5927 PR\uff0c\u5e76\u53ef\u80fd\u5f15\u5165 bug\u3002',
  },
};

export default function TypescriptVsJavascriptWhenToConvert({ lang }: { lang: string }) {
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
        <Link href={`/${lang}/tools/typescript-to-javascript`} style={{ fontWeight: 600 }}>
          {tx.try_tool}
        </Link>
      </p>

      <h2>{tx.h2_1}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p1_1 }} />
      <table>
        <thead>
          <tr><th>{tx.p1_table_feature}</th><th>{tx.p1_table_js}</th><th>{tx.p1_table_ts}</th></tr>
        </thead>
        <tbody>
          <tr><td>Type System</td><td>Dynamic (runtime)</td><td>Static (compile-time)</td></tr>
          <tr><td>Type Annotations</td><td>None (JSDoc optional)</td><td>Built-in syntax</td></tr>
          <tr><td>Compilation</td><td>Not required</td><td>Required (tsc, esbuild, swc)</td></tr>
          <tr><td>IDE Support</td><td>Good</td><td>Excellent (autocomplete, errors)</td></tr>
          <tr><td>Learning Curve</td><td>Lower</td><td>Moderate (types take time)</td></tr>
          <tr><td>Runtime Output</td><td>Runs as-is</td><td>Compiles to JavaScript</td></tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: tx.p1_2 }} />

      <h2>{tx.h2_2}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_1 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p2_ts_list }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p2_2 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p2_js_list }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p2_3 }} />

      <h2>{tx.h2_3}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_1 }} />
      <ol dangerouslySetInnerHTML={{ __html: tx.p3_steps }} />
      <p>{tx.p3_2}</p>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_3 }} />

      <h2>{tx.h2_4}</h2>
      <p>{tx.p4_1}</p>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_2 }} />
      <pre><code>{`// TypeScript
function greet(name: string, age: number): string {
  return \`Hello \${name}, you are \${age}\`;
}

// Compiled JavaScript
function greet(name, age) {
  return \`Hello \${name}, you are \${age}\`;
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_3 }} />
      <pre><code>{`// TypeScript
interface User {
  id: number;
  name: string;
  email: string;
}
type Status = 'active' | 'inactive';

// Compiled JavaScript
// (nothing — both are completely erased)`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_4 }} />
      <pre><code>{`// TypeScript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// Compiled JavaScript
var Direction;
(function (Direction) {
  Direction["Up"] = "UP";
  Direction["Down"] = "DOWN";
  Direction["Left"] = "LEFT";
  Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));`}</code></pre>

      <h2>{tx.h2_5}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_1 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p5_list }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p5_2 }} />

      <h2>{tx.h2_6}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p6_1 }} />
      <pre><code>{`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  }
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p6_2 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p6_settings }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p6_3 }} />

      <h2>{tx.h2_7}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p7_1 }} />
      <ul dangerouslySetInnerHTML={{ __html: tx.p7_list }} />
      <p>{tx.p7_2}</p>
      <p>
        <Link href={`/${lang}/tools/typescript-to-javascript`} style={{ fontWeight: 600 }}>
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
