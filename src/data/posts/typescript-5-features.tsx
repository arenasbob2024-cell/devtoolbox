'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'TypeScript 5 New Features: Decorators, const Type Parameters, and More',
    intro: 'TypeScript 5 introduced significant new features that improve type safety, developer productivity, and code organization. From standardized ECMAScript decorators to const type parameters, satisfies operator improvements, and module resolution enhancements, TypeScript 5 represents a major step forward. This guide covers every important new feature with practical examples you can use in your projects today.',
    h2Decorators: 'ECMAScript Decorators',
    decoratorsDesc: 'TypeScript 5 implements the TC39 Stage 3 decorator proposal, replacing the experimental decorator implementation from TypeScript 4.x. The new decorators are standardized, do not require experimentalDecorators flag, and work differently from the legacy implementation.',
    h3ClassDecorators: 'Class Decorators',
    classDecoratorsDesc: 'Class decorators receive the class constructor and can return a new class that replaces it. They are called at class definition time.',
    h3MethodDecorators: 'Method Decorators',
    methodDecoratorsDesc: 'Method decorators receive the method function and context information. They can wrap, replace, or modify methods.',
    h3FieldDecorators: 'Field Decorators',
    fieldDecoratorsDesc: 'Field decorators can initialize, validate, or transform class fields. They use an initializer function in the context object.',
    h3AutoAccessor: 'Auto-Accessor Fields',
    autoAccessorDesc: 'The accessor keyword creates auto-accessor fields with automatic getter and setter generation. Decorators can intercept these accessors.',
    h2ConstTypeParams: 'const Type Parameters',
    constTypeParamsDesc: 'The const modifier on type parameters tells TypeScript to infer the most specific (literal) type possible instead of widening to the base type. This eliminates the need for "as const" at call sites.',
    h2Satisfies: 'satisfies Operator Enhancements',
    satisfiesDesc: 'The satisfies operator (introduced in TypeScript 4.9 and enhanced in 5.x) validates that an expression matches a type without changing the inferred type. This gives you type checking and precise inference simultaneously.',
    h2EnumImprovements: 'Enum Improvements',
    enumDesc: 'TypeScript 5 allows all enums to be union enums, even those with computed members. This enables better narrowing and type checking with enum values.',
    h2ModuleResolution: 'Module Resolution: bundler Mode',
    moduleResolutionDesc: 'TypeScript 5 introduces a new module resolution mode called "bundler" that matches how modern bundlers like Vite, Webpack, and esbuild resolve modules. This is more practical than the strict "node16" or "nodenext" modes for frontend projects.',
    h2TypeNarrowing: 'Improved Type Narrowing',
    typeNarrowingDesc: 'TypeScript 5 improves type narrowing in several scenarios, making the type checker smarter about understanding your code.',
    h3SwitchTrue: 'switch(true) Narrowing',
    switchTrueDesc: 'TypeScript 5 properly narrows types in switch(true) patterns, which are a clean alternative to if-else chains.',
    h3ClosureNarrowing: 'Closure Variable Narrowing',
    closureNarrowingDesc: 'TypeScript 5 can narrow variables that are used in closures, tracking type changes across function boundaries more accurately.',
    h2Performance: 'Performance Improvements',
    performanceDesc: 'TypeScript 5 delivers significant performance improvements across the board.',
    perf1: 'Package size reduced by 44% (from 63.8MB to 35.6MB)',
    perf2: 'Build times improved by 10-25% for most projects',
    perf3: 'Editor responsiveness improved due to faster type checking',
    perf4: 'Memory usage reduced through better internal data structures',
    perf5: 'Faster project loading with optimized module resolution caching',
    h2Config: 'New Configuration Options',
    configDesc: 'TypeScript 5 introduces several new tsconfig.json options for better project configuration.',
    h2UtilityTypes: 'New Utility Type Patterns',
    utilityTypesDesc: 'While TypeScript 5 does not add many new built-in utility types, the new features enable powerful type patterns that were previously difficult or impossible.',
    h2Migration: 'Migrating to TypeScript 5',
    migrationDesc: 'Upgrading to TypeScript 5 is straightforward for most projects. Here are the key steps and considerations.',
    h3BreakingChanges: 'Breaking Changes',
    breakingChanges1: 'Runtime requirements: TypeScript 5 requires Node.js 14.17 or later',
    breakingChanges2: 'Deprecated options removed: out, charset, keyofStringsOnly, noImplicitUseStrict, suppressExcessPropertyErrors, suppressImplicitAnyIndexErrors, and prepend in project references',
    breakingChanges3: 'lib.d.ts changes: DOM type definitions updated, some rarely-used types may have changed',
    breakingChanges4: 'Decorators: If using experimentalDecorators, the new standard decorators have different semantics',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Do I need to change my decorator code for TypeScript 5?',
    faq1A: 'Not immediately. TypeScript 5 still supports the legacy experimentalDecorators flag. However, the new standard decorators have different behavior and are recommended for new code. Libraries like class-validator and TypeORM may need updates to use the new decorator format.',
    faq2Q: 'Is TypeScript 5 backward compatible?',
    faq2A: 'Mostly yes. The major breaking changes are removal of deprecated compiler options and updates to lib.d.ts types. Most codebases can upgrade without changes. Run tsc --noEmit after upgrading to catch any issues.',
    faq3Q: 'What is the difference between satisfies and as?',
    faq3A: 'The "as" keyword asserts a type and changes the inferred type. The "satisfies" operator validates against a type but preserves the original inferred type. Use satisfies when you want type checking without losing specificity.',
    faq4Q: 'Should I use the bundler module resolution?',
    faq4A: 'Yes, for most frontend projects using Vite, Webpack, or other bundlers. It more accurately represents how your bundler resolves imports. Use "node16" or "nodenext" for Node.js libraries and applications that run directly in Node.js.',
    faq5Q: 'How do const type parameters differ from as const?',
    faq5A: 'The const modifier on type parameters makes a generic function infer literal types automatically, without the caller needing to add "as const". It is more ergonomic for library authors because it removes the burden from the consumer.',
  },
  zh: {
    title: 'TypeScript 5 新特性：装饰器、const 类型参数等',
    intro: 'TypeScript 5 引入了重大新特性，改进了类型安全、开发者生产力和代码组织。从标准化的 ECMAScript 装饰器到 const 类型参数、satisfies 运算符增强和模块解析改进。',
    h2Decorators: 'ECMAScript 装饰器',
    decoratorsDesc: 'TypeScript 5 实现了 TC39 Stage 3 装饰器提案，替换了 TypeScript 4.x 的实验性装饰器实现。新装饰器已标准化且不需要 experimentalDecorators 标志。',
    h3ClassDecorators: '类装饰器',
    classDecoratorsDesc: '类装饰器接收类构造函数，可以返回替换它的新类。',
    h3MethodDecorators: '方法装饰器',
    methodDecoratorsDesc: '方法装饰器接收方法函数和上下文信息，可以包装、替换或修改方法。',
    h3FieldDecorators: '字段装饰器',
    fieldDecoratorsDesc: '字段装饰器可以初始化、验证或转换类字段。',
    h3AutoAccessor: '自动访问器字段',
    autoAccessorDesc: 'accessor 关键字创建带有自动 getter 和 setter 的字段。',
    h2ConstTypeParams: 'const 类型参数',
    constTypeParamsDesc: '类型参数上的 const 修饰符告诉 TypeScript 推断最具体的（字面量）类型，而不是扩宽到基本类型。',
    h2Satisfies: 'satisfies 运算符增强',
    satisfiesDesc: 'satisfies 运算符验证表达式匹配类型而不更改推断的类型，同时提供类型检查和精确推断。',
    h2EnumImprovements: '枚举改进',
    enumDesc: 'TypeScript 5 允许所有枚举成为联合枚举，即使是那些有计算成员的枚举。',
    h2ModuleResolution: '模块解析：bundler 模式',
    moduleResolutionDesc: 'TypeScript 5 引入了名为 "bundler" 的新模块解析模式，匹配 Vite、Webpack 等现代打包器解析模块的方式。',
    h2TypeNarrowing: '改进的类型收窄',
    typeNarrowingDesc: 'TypeScript 5 在多种场景中改进了类型收窄。',
    h3SwitchTrue: 'switch(true) 收窄',
    switchTrueDesc: 'TypeScript 5 在 switch(true) 模式中正确收窄类型。',
    h3ClosureNarrowing: '闭包变量收窄',
    closureNarrowingDesc: 'TypeScript 5 可以收窄在闭包中使用的变量。',
    h2Performance: '性能改进',
    performanceDesc: 'TypeScript 5 全面提供显著的性能改进。',
    perf1: '包大小减少 44%（从 63.8MB 到 35.6MB）',
    perf2: '大多数项目构建时间改进 10-25%',
    perf3: '编辑器响应性提高',
    perf4: '通过更好的内部数据结构减少内存使用',
    perf5: '优化模块解析缓存加快项目加载',
    h2Config: '新配置选项',
    configDesc: 'TypeScript 5 引入了多个新的 tsconfig.json 选项。',
    h2UtilityTypes: '新工具类型模式',
    utilityTypesDesc: '新特性使得以前困难或不可能的强大类型模式成为可能。',
    h2Migration: '迁移到 TypeScript 5',
    migrationDesc: '对大多数项目来说，升级到 TypeScript 5 是简单的。',
    h3BreakingChanges: '破坏性变更',
    breakingChanges1: '运行时要求：TypeScript 5 需要 Node.js 14.17 或更高版本',
    breakingChanges2: '已移除弃用选项：out、charset 等',
    breakingChanges3: 'lib.d.ts 变更：DOM 类型定义已更新',
    breakingChanges4: '装饰器：新标准装饰器具有不同的语义',
    h2Faq: '常见问题',
    faq1Q: '需要为 TypeScript 5 修改装饰器代码吗？',
    faq1A: '不需要立即修改。TypeScript 5 仍支持旧的 experimentalDecorators。但建议新代码使用新标准装饰器。',
    faq2Q: 'TypeScript 5 向后兼容吗？',
    faq2A: '基本兼容。主要破坏性变更是移除弃用的编译器选项和 lib.d.ts 更新。',
    faq3Q: 'satisfies 和 as 有什么区别？',
    faq3A: 'as 断言类型并改变推断类型。satisfies 验证类型但保留原始推断类型。',
    faq4Q: '应该使用 bundler 模块解析吗？',
    faq4A: '对于使用 Vite 或 Webpack 的前端项目，是的。对于 Node.js 应用使用 node16。',
    faq5Q: 'const 类型参数和 as const 有什么区别？',
    faq5A: 'const 修饰符使泛型函数自动推断字面量类型，无需调用者添加 "as const"。',
  },
};

export default function TypeScript5Features({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* Decorators */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Decorators}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.decoratorsDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ClassDecorators}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.classDecoratorsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Class decorator: adds metadata and logging
function sealed(target: Function, context: ClassDecoratorContext) {
  Object.seal(target);
  Object.seal(target.prototype);
  console.log(\`Class \${String(context.name)} has been sealed\`);
}

function withTimestamp<T extends new (...args: any[]) => {}>(
  target: T,
  context: ClassDecoratorContext
) {
  return class extends target {
    createdAt = new Date();
  };
}

@sealed
@withTimestamp
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const user = new User("Alice");
console.log(user.createdAt); // Date object`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3MethodDecorators}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.methodDecoratorsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Method decorator: logging and timing
function log(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  return function (this: any, ...args: any[]) {
    console.log(\`Calling \${String(context.name)} with\`, args);
    const result = target.apply(this, args);
    console.log(\`\${String(context.name)} returned\`, result);
    return result;
  };
}

function memoize(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  const cache = new Map();
  return function (this: any, ...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = target.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

class MathService {
  @log
  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3AutoAccessor}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.autoAccessorDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Auto-accessor with decorator
function observable(
  target: ClassAccessorDecoratorTarget<any, any>,
  context: ClassAccessorDecoratorContext
) {
  return {
    get(this: any) {
      return target.get.call(this);
    },
    set(this: any, value: any) {
      console.log(\`\${String(context.name)} changed to \${value}\`);
      target.set.call(this, value);
    },
  };
}

class Settings {
  @observable
  accessor theme: string = "dark";

  @observable
  accessor fontSize: number = 14;
}

const settings = new Settings();
settings.theme = "light"; // logs: "theme changed to light"`}</code></pre>

      {/* const Type Parameters */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2ConstTypeParams}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.constTypeParamsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Without const: types are widened
function createRoutes<T extends Record<string, string>>(routes: T): T {
  return routes;
}
const routes1 = createRoutes({ home: "/", about: "/about" });
// Type: { home: string; about: string }  (widened!)

// With const: literal types preserved
function createRoutes2<const T extends Record<string, string>>(routes: T): T {
  return routes;
}
const routes2 = createRoutes2({ home: "/", about: "/about" });
// Type: { readonly home: "/"; readonly about: "/about" }  (exact!)

// Practical example: type-safe event system
function defineEvents<const T extends Record<string, (...args: any[]) => void>>(
  events: T
): T {
  return events;
}

const events = defineEvents({
  click: (x: number, y: number) => {},
  keypress: (key: string) => {},
  scroll: (offset: number) => {},
});
// events.click is typed as (x: number, y: number) => void
// Object.keys(events) preserves "click" | "keypress" | "scroll"

// Array literal types
function firstElement<const T extends readonly unknown[]>(arr: T): T[0] {
  return arr[0];
}
const first = firstElement([1, "hello", true] as const);
// Type: 1 (not number)`}</code></pre>

      {/* satisfies */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Satisfies}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.satisfiesDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Problem: type annotation loses specificity
type Colors = Record<string, string | number[]>;

const colors1: Colors = {
  red: "#ff0000",
  green: [0, 255, 0],
};
// colors1.red is string | number[] -- lost specificity!

// Solution: satisfies preserves inferred types
const colors2 = {
  red: "#ff0000",
  green: [0, 255, 0],
} satisfies Colors;

colors2.red.toUpperCase();    // OK! TypeScript knows it's a string
colors2.green.map(x => x);   // OK! TypeScript knows it's number[]

// satisfies catches errors while preserving types
const config = {
  port: 3000,
  host: "localhost",
  debug: true,
  // timeout: "not a number",  // Error! Does not satisfy Config type
} satisfies {
  port: number;
  host: string;
  debug: boolean;
};
// config.port is number (not string | number)
// config.debug is true (not boolean)`}</code></pre>

      {/* Module Resolution */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2ModuleResolution}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.moduleResolutionDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// tsconfig.json for bundler projects (Vite, Webpack)
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "module": "esnext",
    "target": "esnext",
    "noEmit": true,
    // Bundler mode supports:
    // - Package.json "exports" and "imports" fields
    // - Extensionless imports (import "./utils" resolves to "./utils.ts")
    // - Directory imports (import "./components" resolves to "./components/index.ts")
    // - .ts extension in imports (optional)
  }
}

// tsconfig.json for Node.js applications
{
  "compilerOptions": {
    "moduleResolution": "nodenext",
    "module": "nodenext",
    // Strict mode: requires file extensions in imports
    // import "./utils.js"  (not "./utils")
  }
}`}</code></pre>

      {/* Type Narrowing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2TypeNarrowing}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.typeNarrowingDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3SwitchTrue}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.switchTrueDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// switch(true) narrowing - now works in TypeScript 5
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  switch (true) {
    case shape.kind === "circle":
      return Math.PI * shape.radius ** 2;  // shape is narrowed to circle
    case shape.kind === "rect":
      return shape.width * shape.height;    // shape is narrowed to rect
    case shape.kind === "triangle":
      return (shape.base * shape.height) / 2; // shape is narrowed to triangle
  }
}`}</code></pre>

      {/* Performance */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Performance}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.performanceDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.perf1, t.perf2, t.perf3, t.perf4, t.perf5].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      {/* New Config Options */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Config}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.configDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// tsconfig.json - recommended TypeScript 5 settings
{
  "compilerOptions": {
    // New in TS 5
    "moduleResolution": "bundler",       // For Vite/Webpack projects
    "verbatimModuleSyntax": true,         // Replaces importsNotUsedAsValues
    "allowImportingTsExtensions": true,   // Allow .ts imports (with noEmit)

    // Recommended strict settings
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Modern output
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],

    // Other
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "jsx": "react-jsx"
  }
}`}</code></pre>

      {/* Migration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Migration}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.migrationDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3BreakingChanges}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.breakingChanges1, t.breakingChanges2, t.breakingChanges3, t.breakingChanges4].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Upgrade to TypeScript 5
npm install typescript@latest

# Check for issues without emitting
npx tsc --noEmit

# If using deprecated options, remove them from tsconfig.json
# "out" -> use "outDir" instead
# "keyofStringsOnly" -> removed, no replacement needed

# Run your test suite to catch any runtime issues
npm test`}</code></pre>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A],
          [t.faq4Q, t.faq4A], [t.faq5Q, t.faq5A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
