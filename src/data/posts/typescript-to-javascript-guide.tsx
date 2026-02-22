import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Converting <strong>TypeScript to JavaScript</strong> is a common task when publishing npm packages, supporting legacy environments, or removing type overhead from production bundles. Whether you need to <strong>convert TS to JS online</strong> quickly or set up an automated build pipeline, understanding what gets stripped and what stays is essential. This comprehensive guide covers the TypeScript compiler (<code>tsc</code>), Babel, esbuild, online conversion tools, enum handling, project migration strategies, and best practices for <strong>TypeScript to JavaScript</strong> conversion.',
    linkTool: 'Try our free online TypeScript to JavaScript Converter.',
    h2_why: 'Why Convert TypeScript to JavaScript?',
    whyDesc1: '<strong>TypeScript</strong> is a superset of JavaScript that adds static type checking, interfaces, enums, generics, and other features. However, browsers and Node.js runtimes execute JavaScript, not TypeScript. Every TypeScript file must be compiled (or transpiled) to JavaScript before it can run. This conversion removes all type annotations while preserving the runtime logic.',
    whyDesc2: 'Common scenarios for <strong>TS to JS</strong> conversion include: publishing an npm library that must work in plain JavaScript projects, deploying to environments that do not support TypeScript natively, debugging compiled output to understand what TypeScript generates, migrating away from TypeScript in legacy projects, and reducing build complexity in small scripts or prototypes.',
    whyDesc3: 'Understanding what changes during conversion helps you write better TypeScript. Type annotations, interfaces, type aliases, and <code>declare</code> blocks are erased completely. Enums, decorators, class fields, and namespace declarations generate runtime JavaScript code. Knowing this distinction is key to predicting your output.',
    h2_whatStripped: 'What Gets Stripped: Types vs Runtime Code',
    whatStrippedDesc: 'When converting <strong>TypeScript to JavaScript</strong>, it is critical to understand which TypeScript features are erased (type-only) and which produce runtime code:',
    whatStrippedTable: '<table><thead><tr><th>TypeScript Feature</th><th>Erased?</th><th>JavaScript Output</th></tr></thead><tbody><tr><td>Type annotations (<code>: string</code>, <code>: number</code>)</td><td>Yes</td><td>Removed entirely</td></tr><tr><td>Interfaces (<code>interface User {}</code>)</td><td>Yes</td><td>Removed entirely</td></tr><tr><td>Type aliases (<code>type ID = string</code>)</td><td>Yes</td><td>Removed entirely</td></tr><tr><td>Generics (<code>&lt;T&gt;</code>)</td><td>Yes</td><td>Removed entirely</td></tr><tr><td><code>as</code> type assertions</td><td>Yes</td><td>Expression kept, assertion removed</td></tr><tr><td>Enums (<code>enum Direction {}</code>)</td><td>No</td><td>Generates IIFE or object</td></tr><tr><td><code>const enum</code></td><td>Depends</td><td>Inlined at usage sites by default</td></tr><tr><td>Decorators (<code>@Injectable()</code>)</td><td>No</td><td>Generates decorator call code</td></tr><tr><td>Namespace (<code>namespace Foo {}</code>)</td><td>No</td><td>Generates IIFE</td></tr><tr><td>Class fields with <code>declare</code></td><td>Yes</td><td>Removed entirely</td></tr><tr><td>Parameter properties (<code>constructor(public name: string)</code>)</td><td>No</td><td>Generates assignment in constructor</td></tr></tbody></table>',
    h2_methods: 'Methods to Convert TypeScript to JavaScript',
    methodTscTitle: 'Method 1: TypeScript Compiler (tsc)',
    methodTscDesc: 'The official <strong>TypeScript compiler</strong> (<code>tsc</code>) is the most reliable way to convert TypeScript to JavaScript. It performs full type checking before emitting JavaScript output. Install with <code>npm install -D typescript</code>:',
    methodBabelTitle: 'Method 2: Babel with @babel/preset-typescript',
    methodBabelDesc: '<strong>Babel</strong> strips TypeScript types without performing type checking, making it faster than <code>tsc</code> for build pipelines where type checking runs separately. Install with <code>npm install -D @babel/core @babel/cli @babel/preset-typescript</code>:',
    methodEsbuildTitle: 'Method 3: esbuild (Fastest)',
    methodEsbuildDesc: '<strong>esbuild</strong> is an extremely fast JavaScript bundler written in Go that natively supports TypeScript. It strips types without type checking, similar to Babel but orders of magnitude faster:',
    methodOnlineTitle: 'Method 4: Online Converter',
    methodOnlineDesc: 'For quick one-off conversions, an <strong>online TypeScript to JavaScript converter</strong> lets you paste TypeScript code and instantly see the JavaScript output. Our free tool at DevToolBox handles all TypeScript syntax including enums, decorators, and generic type parameters. No installation needed.',
    h2_enums: 'Handling TypeScript Enums in JavaScript',
    enumsDesc1: 'TypeScript enums are one of the few TypeScript features that generate runtime JavaScript code. Understanding their compiled output helps you work with the converted JavaScript:',
    enumsDesc2: '<strong>Numeric enums</strong> compile to an IIFE (Immediately Invoked Function Expression) that creates a bidirectional mapping object. This means you can look up both the name by value and the value by name.',
    enumsDesc3: '<strong>String enums</strong> compile to a simpler object with only forward mappings (name to value). There is no reverse mapping because string values are not guaranteed to be unique.',
    enumsDesc4: '<strong>const enums</strong> are inlined at usage sites by default, meaning the enum declaration is completely removed and each reference is replaced with its literal value. This produces the most efficient JavaScript but means you lose the runtime object. Use <code>--preserveConstEnums</code> to keep the runtime object if needed.',
    h2_preserveRuntime: 'Preserving Runtime Behavior',
    preserveRuntimeDesc1: 'When converting TypeScript to JavaScript, certain patterns require special attention to preserve correct runtime behavior:',
    preserveRuntimeDesc2: '<strong>Optional chaining and nullish coalescing</strong>: TypeScript\'s <code>?.</code> and <code>??</code> operators are standard JavaScript (ES2020). If your target is ES2019 or earlier, <code>tsc</code> will emit polyfilled versions. If targeting ES2020+, they pass through unchanged.',
    preserveRuntimeDesc3: '<strong>Parameter properties</strong>: TypeScript\'s <code>constructor(public name: string)</code> shorthand generates assignment statements in the constructor body. The resulting JavaScript is equivalent to manually writing <code>this.name = name</code>.',
    preserveRuntimeDesc4: '<strong>Import elision</strong>: TypeScript automatically removes imports that are only used as types. If an import is used both as a type and a value, TypeScript keeps it. Use <code>import type { Foo }</code> to explicitly mark type-only imports and avoid accidental side effects.',
    h2_migration: 'Project Migration: TypeScript to JavaScript',
    migrationDesc: 'Migrating an entire project from TypeScript to JavaScript is a larger undertaking. Here is a practical approach:',
    migrationSteps: '<ol><li><strong>Compile with <code>tsc --declaration</code></strong>: Generate both <code>.js</code> and <code>.d.ts</code> files. The <code>.d.ts</code> files preserve type information for any TypeScript consumers.</li><li><strong>Verify output</strong>: Run your test suite against the compiled JavaScript to ensure behavior is identical.</li><li><strong>Replace source files</strong>: Swap <code>.ts</code> files with the compiled <code>.js</code> files. Keep <code>.d.ts</code> files if the project is consumed as a library.</li><li><strong>Update build tooling</strong>: Remove TypeScript from devDependencies, update build scripts, and remove <code>tsconfig.json</code> if fully migrating away.</li><li><strong>Add JSDoc annotations</strong>: For projects that still want type checking without TypeScript, use JSDoc comments with <code>// @ts-check</code> and <code>jsconfig.json</code> to get IDE support.</li></ol>',
    h2_bestPractices: 'Best Practices for TypeScript to JavaScript Conversion',
    bp1: '<strong>Use <code>tsc</code> for correctness, esbuild for speed</strong>: Run <code>tsc --noEmit</code> for type checking in CI, and use esbuild or Babel for fast builds in development. This gives you both safety and speed.',
    bp2: '<strong>Set the correct <code>target</code></strong>: The <code>target</code> in <code>tsconfig.json</code> determines which JavaScript version is emitted. Use <code>ES2020</code> or later for modern environments, <code>ES5</code> for legacy browser support.',
    bp3: '<strong>Use <code>module: "ESNext"</code> for tree shaking</strong>: ES modules enable bundlers to eliminate unused exports. Avoid <code>"CommonJS"</code> unless targeting Node.js without ESM support.',
    bp4: '<strong>Prefer <code>import type</code> for type-only imports</strong>: This ensures type imports are always erased and prevents accidentally importing runtime code from type-only modules.',
    bp5: '<strong>Be cautious with enums</strong>: If you plan to convert to JavaScript, prefer union types (<code>type Direction = "up" | "down"</code>) over enums, as unions are erased completely while enums generate runtime code.',
    bp6: '<strong>Test the compiled output</strong>: Always run your tests against the compiled JavaScript, not just the TypeScript source. This catches issues with enum compilation, decorator output, and module resolution.',
    bp7: '<strong>Use source maps</strong>: Enable <code>"sourceMap": true</code> in tsconfig.json so you can debug the original TypeScript when issues arise in the compiled JavaScript.',
    relatedTools: 'Related tools: <strong>JSON to TypeScript</strong> for generating interfaces, <strong>JSON Formatter</strong> for validating JSON, and <strong>Diff Checker</strong> for comparing TypeScript and JavaScript output.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Can I convert TypeScript to JavaScript online without installing anything?',
    faq1_a: 'Yes. Our free <strong>TypeScript to JavaScript converter</strong> at DevToolBox lets you paste any TypeScript code and instantly see the compiled JavaScript output. It handles all TypeScript features including generics, enums, interfaces, type aliases, and decorators. No Node.js or npm installation required.',
    faq2_q: 'What is the difference between tsc, Babel, and esbuild for TypeScript compilation?',
    faq2_a: '<code>tsc</code> is the official TypeScript compiler that performs full type checking and emits JavaScript. It is the most correct but slowest option. Babel with <code>@babel/preset-typescript</code> strips types without checking them, offering faster builds. esbuild is written in Go and is the fastest option (10-100x faster than tsc), also stripping types without checking. For production, use <code>tsc --noEmit</code> for type checking plus esbuild for fast JavaScript emission.',
    faq3_q: 'What happens to TypeScript interfaces and type aliases when converted to JavaScript?',
    faq3_a: 'Interfaces and type aliases are completely erased during compilation. They exist only at compile time for type checking and generate zero JavaScript output. This is true for all conversion methods (tsc, Babel, esbuild). Only runtime constructs like enums, decorators, and namespace declarations produce JavaScript code.',
    faq4_q: 'How do TypeScript enums compile to JavaScript?',
    faq4_a: 'Numeric enums compile to an IIFE that creates a bidirectional mapping object (you can look up name by value and value by name). String enums compile to a forward-only mapping object. <code>const enum</code> values are inlined at usage sites, removing the enum object entirely. Use <code>--preserveConstEnums</code> to keep the runtime object.',
    faq5_q: 'Should I convert an existing TypeScript project to JavaScript?',
    faq5_a: 'In most cases, no. TypeScript provides significant benefits for code quality, refactoring safety, and developer experience. Consider converting only if: the project is very small and TypeScript adds unnecessary complexity, the team has no TypeScript expertise, or you are publishing a library and want to provide pre-compiled JavaScript with .d.ts type definitions.',
    conclusion: 'Converting <strong>TypeScript to JavaScript</strong> is straightforward once you understand what gets stripped (types, interfaces, aliases) and what generates runtime code (enums, decorators, namespaces). Use <code>tsc</code> for correctness, esbuild for speed, and our free online converter for quick one-off tasks. This guide covers everything you need for confident <strong>TS to JS</strong> conversion.',
    linkToolBottom: 'Convert TypeScript to JavaScript instantly with our free online tool.',
  },
  zh: {
    intro: '将 <strong>TypeScript 转换为 JavaScript</strong> 是发布 npm 包、支持旧环境或从生产包中移除类型开销时的常见任务。本指南涵盖 TypeScript 编译器（tsc）、Babel、esbuild、在线转换工具、枚举处理、项目迁移策略和最佳实践。',
    linkTool: '试用我们免费的在线 TypeScript 转 JavaScript 转换器。',
    h2_why: '为什么要将 TypeScript 转换为 JavaScript？',
    whyDesc1: '<strong>TypeScript</strong> 是 JavaScript 的超集，添加了静态类型检查、接口、枚举、泛型等特性。但浏览器和 Node.js 运行时执行的是 JavaScript，每个 TypeScript 文件必须编译为 JavaScript 才能运行。',
    whyDesc2: '常见的 TS 转 JS 场景包括：发布必须在纯 JavaScript 项目中工作的 npm 库、部署到不原生支持 TypeScript 的环境、调试编译输出、从遗留项目中迁移 TypeScript、以及简化小脚本的构建复杂度。',
    whyDesc3: '理解转换过程中的变化有助于编写更好的 TypeScript。类型注解、接口、类型别名和 declare 块会被完全擦除。枚举、装饰器、类字段和命名空间声明会生成运行时 JavaScript 代码。',
    h2_whatStripped: '被移除的内容：类型 vs 运行时代码',
    whatStrippedDesc: '转换 TypeScript 到 JavaScript 时，理解哪些特性被擦除、哪些生成运行时代码至关重要：',
    whatStrippedTable: '<table><thead><tr><th>TypeScript 特性</th><th>擦除？</th><th>JavaScript 输出</th></tr></thead><tbody><tr><td>类型注解</td><td>是</td><td>完全移除</td></tr><tr><td>接口</td><td>是</td><td>完全移除</td></tr><tr><td>类型别名</td><td>是</td><td>完全移除</td></tr><tr><td>泛型</td><td>是</td><td>完全移除</td></tr><tr><td>枚举</td><td>否</td><td>生成 IIFE 或对象</td></tr><tr><td>const 枚举</td><td>视情况</td><td>默认内联到使用处</td></tr><tr><td>装饰器</td><td>否</td><td>生成装饰器调用代码</td></tr><tr><td>命名空间</td><td>否</td><td>生成 IIFE</td></tr></tbody></table>',
    h2_methods: 'TypeScript 转 JavaScript 的方法',
    methodTscTitle: '方法 1：TypeScript 编译器（tsc）',
    methodTscDesc: '官方 TypeScript 编译器是最可靠的转换方式，在生成 JavaScript 前执行完整的类型检查：',
    methodBabelTitle: '方法 2：Babel + @babel/preset-typescript',
    methodBabelDesc: 'Babel 在不执行类型检查的情况下去除 TypeScript 类型，构建速度更快：',
    methodEsbuildTitle: '方法 3：esbuild（最快）',
    methodEsbuildDesc: 'esbuild 是用 Go 编写的极速 JavaScript 打包工具，原生支持 TypeScript：',
    methodOnlineTitle: '方法 4：在线转换器',
    methodOnlineDesc: '对于快速的一次性转换，在线转换器让你粘贴 TypeScript 代码并立即查看 JavaScript 输出。',
    h2_enums: '在 JavaScript 中处理 TypeScript 枚举',
    enumsDesc1: 'TypeScript 枚举是少数几个生成运行时 JavaScript 代码的 TypeScript 特性之一：',
    enumsDesc2: '<strong>数字枚举</strong>编译为 IIFE，创建双向映射对象。',
    enumsDesc3: '<strong>字符串枚举</strong>编译为简单的正向映射对象。',
    enumsDesc4: '<strong>const 枚举</strong>默认在使用处内联，声明被完全移除。使用 <code>--preserveConstEnums</code> 保留运行时对象。',
    h2_preserveRuntime: '保持运行时行为',
    preserveRuntimeDesc1: '转换时某些模式需要特别注意以保持正确的运行时行为：',
    preserveRuntimeDesc2: '<strong>可选链和空值合并</strong>：<code>?.</code> 和 <code>??</code> 是标准 JavaScript（ES2020）。',
    preserveRuntimeDesc3: '<strong>参数属性</strong>：<code>constructor(public name: string)</code> 生成构造函数中的赋值语句。',
    preserveRuntimeDesc4: '<strong>导入擦除</strong>：TypeScript 自动移除仅用作类型的导入。使用 <code>import type</code> 明确标记。',
    h2_migration: '项目迁移：TypeScript 到 JavaScript',
    migrationDesc: '将整个项目从 TypeScript 迁移到 JavaScript 是一项较大的工作：',
    migrationSteps: '<ol><li><strong>使用 <code>tsc --declaration</code></strong> 生成 .js 和 .d.ts 文件。</li><li><strong>验证输出</strong>：对编译后的 JavaScript 运行测试套件。</li><li><strong>替换源文件</strong>：用编译的 .js 文件替换 .ts 文件。</li><li><strong>更新构建工具</strong>：移除 TypeScript 依赖。</li><li><strong>添加 JSDoc 注解</strong>：使用 JSDoc 和 @ts-check 获得 IDE 支持。</li></ol>',
    h2_bestPractices: 'TypeScript 转 JavaScript 最佳实践',
    bp1: '<strong>用 tsc 保证正确性，用 esbuild 提升速度</strong>：CI 中运行 tsc --noEmit 进行类型检查，开发中使用 esbuild 快速构建。',
    bp2: '<strong>设置正确的 target</strong>：tsconfig.json 中的 target 决定输出的 JavaScript 版本。',
    bp3: '<strong>使用 module: "ESNext" 支持 tree shaking</strong>。',
    bp4: '<strong>使用 import type 处理仅类型导入</strong>。',
    bp5: '<strong>谨慎使用枚举</strong>：考虑用联合类型替代枚举，联合类型会被完全擦除。',
    bp6: '<strong>测试编译输出</strong>：始终对编译后的 JavaScript 运行测试。',
    bp7: '<strong>使用 source maps</strong>：启用 sourceMap: true 以便调试。',
    relatedTools: '相关工具：<strong>JSON 转 TypeScript</strong>、<strong>JSON 格式化器</strong>、<strong>Diff 比较器</strong>。',
    h2_faq: '常见问题',
    faq1_q: '可以在线将 TypeScript 转换为 JavaScript 吗？',
    faq1_a: '可以。我们的免费在线工具支持所有 TypeScript 特性，包括泛型、枚举、接口、类型别名和装饰器，无需安装任何工具。',
    faq2_q: 'tsc、Babel 和 esbuild 有什么区别？',
    faq2_a: 'tsc 是官方编译器，执行完整类型检查，最正确但最慢。Babel 去除类型不检查，更快。esbuild 用 Go 编写，是最快的选择（比 tsc 快 10-100 倍），也不检查类型。',
    faq3_q: '接口和类型别名转换后会怎样？',
    faq3_a: '接口和类型别名在编译时被完全擦除，不生成任何 JavaScript 输出。只有枚举、装饰器和命名空间声明会产生 JavaScript 代码。',
    faq4_q: 'TypeScript 枚举如何编译为 JavaScript？',
    faq4_a: '数字枚举编译为双向映射对象的 IIFE。字符串枚举编译为正向映射对象。const 枚举的值在使用处内联。',
    faq5_q: '应该将现有 TypeScript 项目转换为 JavaScript 吗？',
    faq5_a: '大多数情况下不建议。TypeScript 为代码质量和重构安全性提供重大好处。仅在项目很小、团队无 TypeScript 经验或需要发布预编译库时考虑转换。',
    conclusion: '理解什么被擦除（类型、接口、别名）和什么生成运行时代码（枚举、装饰器、命名空间）后，TypeScript 到 JavaScript 的转换就很简单。使用 tsc 保证正确性，esbuild 提升速度，在线转换器处理快速任务。',
    linkToolBottom: '使用我们的免费在线工具即时将 TypeScript 转换为 JavaScript。',
  },
  fr: {
    intro: 'Convertir <strong>TypeScript en JavaScript</strong> est une tache courante pour publier des packages npm ou supporter des environnements legacy. Ce guide couvre tsc, Babel, esbuild, les outils en ligne et les bonnes pratiques.',
    linkTool: 'Essayez notre convertisseur gratuit TypeScript vers JavaScript.',
    h2_why: 'Pourquoi convertir TypeScript en JavaScript ?',
    whyDesc1: '<strong>TypeScript</strong> est un sur-ensemble de JavaScript avec le typage statique. Les navigateurs executent du JavaScript, chaque fichier TypeScript doit etre compile.',
    whyDesc2: 'Scenarios courants : publication de librairies npm, deploiement sans support TypeScript, debogage du code compile, migration de projets legacy.',
    whyDesc3: 'Les annotations de type, interfaces et alias sont effaces. Les enums, decorateurs et namespaces generent du code JavaScript.',
    h2_whatStripped: 'Ce qui est supprime : Types vs Code runtime',
    whatStrippedDesc: 'Comprendre quelles fonctionnalites sont effacees et lesquelles produisent du code :',
    whatStrippedTable: '<table><thead><tr><th>Fonctionnalite</th><th>Effacee ?</th><th>Sortie JS</th></tr></thead><tbody><tr><td>Annotations de type</td><td>Oui</td><td>Supprimees</td></tr><tr><td>Interfaces</td><td>Oui</td><td>Supprimees</td></tr><tr><td>Enums</td><td>Non</td><td>Genere IIFE</td></tr><tr><td>Decorateurs</td><td>Non</td><td>Genere appels</td></tr></tbody></table>',
    h2_methods: 'Methodes de conversion TypeScript vers JavaScript',
    methodTscTitle: 'Methode 1 : Compilateur TypeScript (tsc)',
    methodTscDesc: 'Le compilateur officiel est la methode la plus fiable avec verification de types :',
    methodBabelTitle: 'Methode 2 : Babel',
    methodBabelDesc: 'Babel supprime les types sans verification, plus rapide pour les pipelines de build :',
    methodEsbuildTitle: 'Methode 3 : esbuild (le plus rapide)',
    methodEsbuildDesc: 'esbuild est extremement rapide et supporte nativement TypeScript :',
    methodOnlineTitle: 'Methode 4 : Convertisseur en ligne',
    methodOnlineDesc: 'Pour des conversions rapides, notre outil en ligne gere toute la syntaxe TypeScript.',
    h2_enums: 'Gerer les enums TypeScript en JavaScript',
    enumsDesc1: 'Les enums generent du code JavaScript runtime :',
    enumsDesc2: '<strong>Enums numeriques</strong> compilent en IIFE avec mapping bidirectionnel.',
    enumsDesc3: '<strong>Enums string</strong> compilent en objet de mapping unidirectionnel.',
    enumsDesc4: '<strong>const enum</strong> sont inlines aux sites d\'utilisation.',
    h2_preserveRuntime: 'Preserver le comportement runtime',
    preserveRuntimeDesc1: 'Certains patterns necessitent une attention particuliere :',
    preserveRuntimeDesc2: '<strong>Chainage optionnel</strong> : <code>?.</code> et <code>??</code> sont du JavaScript standard (ES2020).',
    preserveRuntimeDesc3: '<strong>Proprietes de parametres</strong> generent des assignations dans le constructeur.',
    preserveRuntimeDesc4: '<strong>Elision des imports</strong> : TypeScript supprime les imports utilises uniquement comme types.',
    h2_migration: 'Migration de projet TypeScript vers JavaScript',
    migrationDesc: 'Migrer un projet entier est une tache plus importante :',
    migrationSteps: '<ol><li>Compiler avec <code>tsc --declaration</code></li><li>Verifier la sortie avec les tests</li><li>Remplacer les fichiers source</li><li>Mettre a jour les outils de build</li><li>Ajouter des annotations JSDoc</li></ol>',
    h2_bestPractices: 'Bonnes pratiques de conversion',
    bp1: '<strong>tsc pour la correction, esbuild pour la vitesse</strong>.',
    bp2: '<strong>Definir le bon target</strong> dans tsconfig.json.',
    bp3: '<strong>Utiliser module: "ESNext"</strong> pour le tree shaking.',
    bp4: '<strong>Preferer import type</strong> pour les imports de types uniquement.',
    bp5: '<strong>Prudence avec les enums</strong> : preferez les union types.',
    bp6: '<strong>Tester la sortie compilee</strong>.',
    bp7: '<strong>Utiliser les source maps</strong>.',
    relatedTools: 'Outils connexes : <strong>JSON to TypeScript</strong>, <strong>JSON Formatter</strong>, <strong>Diff Checker</strong>.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Peut-on convertir TypeScript en JavaScript en ligne ?',
    faq1_a: 'Oui, notre outil gratuit gere toutes les fonctionnalites TypeScript sans installation.',
    faq2_q: 'Quelle difference entre tsc, Babel et esbuild ?',
    faq2_a: 'tsc verifie les types et est le plus correct. Babel et esbuild sont plus rapides mais sans verification de types.',
    faq3_q: 'Que deviennent les interfaces apres conversion ?',
    faq3_a: 'Elles sont completement effacees, aucune sortie JavaScript.',
    faq4_q: 'Comment les enums TypeScript compilent-ils ?',
    faq4_a: 'Les enums numeriques generent un IIFE bidirectionnel. Les string enums un objet unidirectionnel. Les const enums sont inlines.',
    faq5_q: 'Faut-il convertir un projet TypeScript existant ?',
    faq5_a: 'Generalement non. TypeScript apporte des benefices significatifs pour la qualite du code.',
    conclusion: 'La conversion TypeScript vers JavaScript est simple une fois compris ce qui est efface et ce qui genere du code runtime.',
    linkToolBottom: 'Convertissez TypeScript en JavaScript instantanement avec notre outil gratuit.',
  },
};

const shortLocales: Record<string, Partial<typeof t.en>> = {};
for (const locale of ['de','it','es','pt','nl','pl','sv','no','ja','ko','id','th']) {
  shortLocales[locale] = { ...t.fr };
}
Object.assign(t, shortLocales);

export default function TypescriptToJavascriptGuide({ lang }: { lang: string }) {
  const s = t[lang] || t.en;
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p>
        <Link href={`/${lang}/tools/typescript-to-javascript`} style={{ fontWeight: 600 }}>
          {s.linkTool}
        </Link>
      </p>

      {/* Section 1: Why Convert */}
      <h2>{s.h2_why}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc3 }} />

      {/* Section 2: What Gets Stripped */}
      <h2>{s.h2_whatStripped}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatStrippedDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.whatStrippedTable }} />

      {/* Section 3: Methods */}
      <h2>{s.h2_methods}</h2>

      <h3>{s.methodTscTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.methodTscDesc }} />
      <pre><code>{`# Install TypeScript
npm install -D typescript

# Create tsconfig.json
npx tsc --init

# tsconfig.json key settings for conversion
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,       // Generate .d.ts files
    "sourceMap": true,          // Generate source maps
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}

# Compile single file
npx tsc src/app.ts --outDir dist

# Compile entire project
npx tsc

# Type-check only (no output)
npx tsc --noEmit`}</code></pre>

      <h3>{s.methodBabelTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.methodBabelDesc }} />
      <pre><code>{`# Install Babel with TypeScript preset
npm install -D @babel/core @babel/cli @babel/preset-typescript

# babel.config.json
{
  "presets": ["@babel/preset-typescript"]
}

# Compile a single file
npx babel src/app.ts --out-file dist/app.js --extensions ".ts,.tsx"

# Compile entire directory
npx babel src --out-dir dist --extensions ".ts,.tsx"

# Note: Babel does NOT type-check!
# Run tsc separately for type safety:
npx tsc --noEmit && npx babel src --out-dir dist --extensions ".ts,.tsx"`}</code></pre>

      <h3>{s.methodEsbuildTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.methodEsbuildDesc }} />
      <pre><code>{`# Install esbuild
npm install -D esbuild

# Bundle a TypeScript entry point to JavaScript
npx esbuild src/app.ts --bundle --outfile=dist/app.js --platform=node

# Transpile without bundling (preserves module structure)
npx esbuild src/**/*.ts --outdir=dist --format=esm

# Watch mode for development
npx esbuild src/app.ts --bundle --outfile=dist/app.js --watch

# Build with minification for production
npx esbuild src/app.ts --bundle --minify --outfile=dist/app.min.js`}</code></pre>

      <h3>{s.methodOnlineTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.methodOnlineDesc }} />

      {/* Section 4: Enums */}
      <h2>{s.h2_enums}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.enumsDesc1 }} />
      <pre><code>{`// === TypeScript: Numeric enum ===
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

// === Compiled JavaScript ===
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
// Direction[0] === "Up"   (reverse lookup)
// Direction.Up === 0      (forward lookup)

// === TypeScript: String enum ===
enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}

// === Compiled JavaScript ===
var Color;
(function (Color) {
    Color["Red"] = "#FF0000";
    Color["Green"] = "#00FF00";
    Color["Blue"] = "#0000FF";
})(Color || (Color = {}));
// No reverse mapping for string enums

// === TypeScript: const enum (inlined) ===
const enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}
const s = Status.Active;

// === Compiled JavaScript (const enum is inlined) ===
const s = "ACTIVE"; // enum declaration removed entirely`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.enumsDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.enumsDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.enumsDesc4 }} />

      {/* Section 5: Preserving Runtime */}
      <h2>{s.h2_preserveRuntime}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.preserveRuntimeDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.preserveRuntimeDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.preserveRuntimeDesc3 }} />
      <pre><code>{`// === TypeScript: Parameter properties ===
class User {
  constructor(
    public name: string,
    private age: number,
    readonly id: string
  ) {}
}

// === Compiled JavaScript ===
class User {
  constructor(name, age, id) {
    this.name = name;
    this.age = age;
    this.id = id;
  }
}

// === TypeScript: import type (always erased) ===
import type { UserType } from './types';  // Erased completely
import { createUser } from './utils';     // Kept (runtime value)`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.preserveRuntimeDesc4 }} />

      {/* Section 6: Migration */}
      <h2>{s.h2_migration}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.migrationDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.migrationSteps }} />

      {/* Section 7: Best Practices */}
      <h2>{s.h2_bestPractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bp1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp6 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp7 }} />
      <p dangerouslySetInnerHTML={{ __html: s.relatedTools }} />

      <p>
        <Link href={`/${lang}/tools/typescript-to-javascript`} style={{ marginRight: 16 }}>TypeScript to JavaScript</Link>
        <Link href={`/${lang}/tools/json-to-typescript`} style={{ marginRight: 16 }}>JSON to TypeScript</Link>
        <Link href={`/${lang}/tools/json-formatter`} style={{ marginRight: 16 }}>JSON Formatter</Link>
        <Link href={`/${lang}/tools/diff-checker`}>Diff Checker</Link>
      </p>

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

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/typescript-to-javascript`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>

      {/* Internal links for SEO */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/typescript-to-javascript`}>TypeScript to JavaScript Converter</Link> - Convert TS to JS online instantly</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript Converter</Link> - Generate TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate JSON data</li>
        <li><Link href={`/${lang}/tools/diff-checker`}>Diff Checker</Link> - Compare TypeScript and JavaScript output</li>
        <li><Link href={`/${lang}/tools/json-to-go`}>JSON to Go Converter</Link> - Create Go structs from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin Converter</Link> - Generate Kotlin data classes</li>
        <li><Link href={`/${lang}/tools/regex-tester`}>Regex Tester</Link> - Test regular expressions online</li>
        <li><Link href={`/${lang}/tools/base64`}>Base64 Encoder/Decoder</Link> - Encode and decode Base64</li>
        <li><Link href={`/${lang}/blog/json-to-typescript-complete-guide`}>JSON to TypeScript Guide</Link> - Complete guide to generating TS interfaces</li>
        <li><Link href={`/${lang}/blog/typescript-vs-javascript-when-to-convert`}>TypeScript vs JavaScript</Link> - When to use TypeScript</li>
      </ul>
    </>
  );
}
