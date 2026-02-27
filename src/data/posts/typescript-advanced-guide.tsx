'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Advanced TypeScript Guide: Generics, Conditional Types, Template Literals, Decorators & Type-Level Programming',
    subtitle: 'A comprehensive deep-dive into TypeScript\'s most powerful type system features, from advanced generics to type-level programming patterns.',
    tldr: 'TypeScript\'s type system is Turing-complete, enabling expressive compile-time guarantees far beyond basic annotations. This guide covers advanced generics (constraints, defaults, variance), conditional types with infer, mapped types and key remapping, template literal types, utility types deep dive, discriminated unions with exhaustive checks, branded/nominal types, declaration merging, module augmentation, Stage 3 decorators, the satisfies operator, const assertions, type narrowing patterns, covariance/contravariance, and recursive types.',
    takeaway1: 'Generic constraints and defaults make reusable APIs both flexible and type-safe.',
    takeaway2: 'Conditional types with infer enable powerful type extraction and transformation.',
    takeaway3: 'Mapped types with key remapping and template literals create derived types automatically.',
    takeaway4: 'Discriminated unions plus exhaustive checks eliminate entire categories of runtime bugs.',
    takeaway5: 'Branded types provide nominal typing in a structural type system.',
    takeaway6: 'The satisfies operator validates types without widening, preserving literal inference.',
    introTitle: 'Why Advanced TypeScript Matters',
    introP1: 'Basic TypeScript annotations (string, number, boolean) only scratch the surface. The type system includes generics, conditional types, mapped types, template literal types, and recursive types that let you express complex domain rules at compile time.',
    introP2: 'Mastering these features reduces runtime errors, improves API design, and enables patterns like type-safe event systems, validated API responses, and fully typed ORM queries. This guide walks through each feature with practical examples.',
    genericsTitle: '1. Advanced Generics',
    genericsP1: 'Generics are the foundation of reusable typed code. Beyond basic usage, TypeScript supports generic constraints, default type parameters, and variance annotations that give you fine-grained control.',
    genericsP2: 'Generic constraints use the extends keyword to limit what types a generic parameter can accept. This ensures the generic works only with types that have the required shape.',
    genericsP3: 'Default type parameters provide fallback types when the caller does not specify one. This is analogous to default function parameters and reduces boilerplate at call sites.',
    genericsP4: 'Variance annotations (in and out keywords, added in TypeScript 4.7) explicitly mark whether a generic parameter is covariant (out), contravariant (in), or invariant. This improves type checking correctness and performance.',
    conditionalTitle: '2. Conditional Types & Infer',
    conditionalP1: 'Conditional types follow the pattern T extends U ? X : Y. They enable type-level branching, choosing different types based on whether a condition is met.',
    conditionalP2: 'The infer keyword inside conditional types introduces a type variable that TypeScript infers from the checked type. This is how utility types like ReturnType and Parameters work.',
    conditionalP3: 'Distributive conditional types automatically distribute over union types. If T is A | B, then T extends U ? X : Y becomes (A extends U ? X : Y) | (B extends U ? X : Y). Wrap T in [T] to prevent distribution.',
    mappedTitle: '3. Mapped Types & Key Remapping',
    mappedP1: 'Mapped types iterate over the keys of a type to create new types. The basic form is { [K in keyof T]: NewType }. Combined with conditional types and template literals, mapped types become extremely powerful.',
    mappedP2: 'Key remapping (as clause, TypeScript 4.1+) lets you transform keys during mapping. You can rename, filter, or generate new keys using template literal types.',
    mappedP3: 'Template literal types (introduced in TypeScript 4.1) enable string manipulation at the type level. Combined with mapped types, they can generate typed event handlers, API endpoints, or CSS property types.',
    utilityTitle: '4. Utility Types Deep Dive',
    utilityP1: 'TypeScript ships with built-in utility types that are implemented using generics, conditional types, and mapped types. Understanding their internals helps you write your own.',
    utilityP2: 'Partial<T> makes all properties optional. Required<T> makes all required. Pick<T, K> selects specific keys. Omit<T, K> removes keys. Record<K, V> creates object types. These are the most commonly used.',
    utilityP3: 'Exclude<T, U> removes types from a union. Extract<T, U> keeps matching types. ReturnType<T> extracts the return type of a function. Parameters<T> extracts parameter types as a tuple. NonNullable<T> removes null and undefined.',
    utilityP4: 'Awaited<T> (TypeScript 4.5+) unwraps Promise types recursively. NoInfer<T> (TypeScript 5.4+) prevents inference at specific positions. These newer utilities solve common pain points.',
    discriminatedTitle: '5. Discriminated Unions & Exhaustive Checks',
    discriminatedP1: 'Discriminated unions combine union types with a shared literal property (the discriminant). TypeScript narrows the type based on this discriminant, enabling safe access to variant-specific properties.',
    discriminatedP2: 'Exhaustive checking ensures every variant is handled. The never type is key: if a switch statement misses a case, the remaining type is not assignable to never, causing a compile error.',
    discriminatedP3: 'This pattern is ideal for state machines, Redux actions, API responses with different shapes, compiler AST nodes, and any scenario with multiple variants sharing a common interface.',
    brandedTitle: '6. Branded & Nominal Types',
    brandedP1: 'TypeScript uses structural typing: two types with the same shape are compatible. Branded types add a phantom property to create nominal-like types that are structurally incompatible even if their runtime values are identical.',
    brandedP2: 'This is critical for preventing accidental misuse: passing a UserId where an OrderId is expected, or mixing validated and unvalidated strings. The brand exists only at the type level with zero runtime cost.',
    declarationTitle: '7. Declaration Merging & Module Augmentation',
    declarationP1: 'Declaration merging automatically combines multiple declarations of the same name. Interfaces merge their members. Namespaces merge with classes, functions, and enums. This is how TypeScript extends built-in types.',
    declarationP2: 'Module augmentation lets you extend third-party library types without modifying their source. Use declare module to add properties to Express Request, extend Window, or patch library types.',
    decoratorsTitle: '8. Decorators (Stage 3 / TC39)',
    decoratorsP1: 'Stage 3 decorators (TypeScript 5.0+) are a standard proposal for modifying classes, methods, properties, and accessors at definition time. They replace the older experimental decorators that required the --experimentalDecorators flag.',
    decoratorsP2: 'A decorator is a function that receives a target value and a context object. It can return a replacement value or undefined. Class decorators receive the class constructor. Method decorators receive the method function.',
    decoratorsP3: 'Common use cases include logging, validation, memoization, dependency injection, access control, and serialization metadata. Decorators compose naturally when stacked.',
    satisfiesTitle: '9. The satisfies Operator',
    satisfiesP1: 'The satisfies operator (TypeScript 4.9+) validates that an expression matches a type without changing the inferred type. Unlike type annotations (: Type), satisfies preserves literal types and specific union members.',
    satisfiesP2: 'This solves a long-standing tension: you want type checking for correctness but do not want to lose the specific inferred type. With satisfies, you get both.',
    constTitle: '10. Const Assertions & Readonly Patterns',
    constP1: 'The as const assertion (const assertion) converts a value to its most specific literal type. Arrays become readonly tuples, objects get readonly properties with literal types, and string values are narrowed to their exact literal.',
    constP2: 'Combining as const with generic functions enables powerful patterns like type-safe builders, route definitions, and configuration objects where the exact shape is preserved at the type level.',
    narrowingTitle: '11. Type Narrowing Patterns',
    narrowingP1: 'Type narrowing is how TypeScript refines a broad type to a more specific one within a code block. Beyond typeof and instanceof, TypeScript supports custom type guards, assertion functions, and control flow narrowing.',
    narrowingP2: 'User-defined type guards (is keyword) return a boolean and narrow the parameter type. Assertion functions (asserts keyword) throw if the condition fails and narrow the type after the call.',
    narrowingP3: 'The in operator, equality checks, truthiness checks, and assignment narrowing all refine types. TypeScript tracks narrowing through if/else branches, switch statements, and short-circuit evaluation.',
    varianceTitle: '12. Covariance & Contravariance',
    varianceP1: 'Covariance means a subtype can substitute for a supertype (Cat[] assignable to Animal[]). Contravariance means the opposite direction: a supertype can substitute for a subtype. This matters for function parameters and return types.',
    varianceP2: 'Function parameters are contravariant (unless --strictFunctionTypes is off). Return types are covariant. Understanding variance prevents subtle bugs when passing callbacks, comparing function types, or using generic containers.',
    recursiveTitle: '13. Recursive Types',
    recursiveP1: 'Recursive types reference themselves in their definition. They are essential for modeling tree structures, nested JSON, deeply nested configs, linked lists, and any data with unbounded depth.',
    recursiveP2: 'TypeScript supports recursive type aliases (since 3.7) and recursive conditional types (since 4.1). These enable powerful utilities like DeepPartial, DeepReadonly, deep path extraction, and JSON type validation.',
    conclusionTitle: 'Conclusion',
    conclusionP1: 'TypeScript\'s advanced type features form a complete type-level programming language. By mastering generics, conditional types, mapped types, template literals, and the patterns in this guide, you can build APIs that are self-documenting, impossible to misuse, and catch errors at compile time rather than runtime.',
    conclusionP2: 'Start with the patterns most relevant to your current codebase. Discriminated unions and exhaustive checks provide immediate value. Branded types and custom utility types become essential as your domain model grows. Advanced patterns like recursive types and template literal types unlock capabilities that were previously impossible in a statically typed language.',
    faq1Q: 'When should I use generics vs union types?',
    faq1A: 'Use generics when you need to preserve and propagate a specific type through a function or class. Use union types when you have a known, finite set of possible types. Generics maintain the relationship between input and output types; unions simply allow multiple types at a position.',
    faq2Q: 'What is the difference between type and interface in TypeScript?',
    faq2A: 'Interfaces support declaration merging and can be extended with extends. Types support union, intersection, conditional, and mapped types. For object shapes, either works; prefer interface for public APIs (mergeable) and type for complex type operations.',
    faq3Q: 'How do conditional types with infer work?',
    faq3A: 'Conditional types use the pattern T extends U ? X : Y. The infer keyword inside the extends clause introduces a type variable that TypeScript infers from T. For example, T extends Promise<infer R> ? R : T extracts the resolved type from a Promise.',
    faq4Q: 'What are branded types and when should I use them?',
    faq4A: 'Branded types add a phantom property (existing only at compile time) to create nominal-like types in TypeScript\'s structural system. Use them to prevent mixing semantically different values like UserId vs OrderId, or validated vs unvalidated strings.',
    faq5Q: 'How does the satisfies operator differ from a type annotation?',
    faq5A: 'A type annotation (const x: Type) widens the inferred type to match the annotation. The satisfies operator (const x = value satisfies Type) checks the value against the type but preserves the original narrow/literal inference. You get type checking without losing specificity.',
    faq6Q: 'What are Stage 3 decorators and how do they differ from experimental decorators?',
    faq6A: 'Stage 3 decorators (TypeScript 5.0+) follow the TC39 standard proposal and do not require --experimentalDecorators. They receive a value and context object instead of target/key/descriptor. They are not backward-compatible with legacy decorators used by older libraries like Angular or MobX.',
    faq7Q: 'How can I make exhaustive checks in a switch statement?',
    faq7A: 'After handling all known cases, add a default case that assigns the discriminant to a variable typed as never. If you miss a case, TypeScript will error because the remaining type is not assignable to never. This ensures all variants are handled at compile time.',
    faq8Q: 'What are recursive types used for?',
    faq8A: 'Recursive types model self-referencing data like trees, nested JSON, linked lists, and deeply nested configurations. They enable utility types like DeepPartial, DeepReadonly, and deep path extraction that operate on arbitrarily nested structures.',
  },
  zh: {
    title: '高级 TypeScript 指南：泛型、条件类型、模板字面量、装饰器与类型级编程',
    subtitle: '深入探讨 TypeScript 最强大的类型系统特性，从高级泛型到类型级编程模式。',
    tldr: 'TypeScript 的类型系统是图灵完备的，能够在编译时提供远超基本注解的表达性保证。本指南涵盖高级泛型（约束、默认值、变型）、带 infer 的条件类型、映射类型和键重映射、模板字面量类型、内置工具类型深入剖析、可辨识联合与穷举检查、品牌/名义类型、声明合并、模块增强、Stage 3 装饰器、satisfies 运算符、const 断言、类型收窄模式、协变/逆变以及递归类型。',
    takeaway1: '泛型约束和默认类型使可复用 API 既灵活又类型安全。',
    takeaway2: '带 infer 的条件类型实现强大的类型提取和转换。',
    takeaway3: '映射类型配合键重映射和模板字面量自动创建派生类型。',
    takeaway4: '可辨识联合加穷举检查消除整类运行时错误。',
    takeaway5: '品牌类型在结构类型系统中提供名义类型化。',
    takeaway6: 'satisfies 运算符在不拓宽类型的情况下验证类型，保留字面量推断。',
    introTitle: '为什么高级 TypeScript 很重要',
    introP1: '基本的 TypeScript 注解（string、number、boolean）只是冰山一角。类型系统包含泛型、条件类型、映射类型、模板字面量类型和递归类型，让你在编译时表达复杂的领域规则。',
    introP2: '掌握这些特性可以减少运行时错误、改善 API 设计，并实现类型安全的事件系统、经过验证的 API 响应和完全类型化的 ORM 查询等模式。本指南通过实际示例逐一讲解每个特性。',
    genericsTitle: '1. 高级泛型',
    genericsP1: '泛型是可复用类型化代码的基础。除了基本用法外，TypeScript 还支持泛型约束、默认类型参数和变型注解，提供细粒度控制。',
    genericsP2: '泛型约束使用 extends 关键字限制泛型参数可以接受的类型。这确保泛型仅与具有所需结构的类型一起工作。',
    genericsP3: '默认类型参数在调用者未指定时提供回退类型。这类似于默认函数参数，减少调用端的样板代码。',
    genericsP4: '变型注解（in 和 out 关键字，TypeScript 4.7 新增）显式标记泛型参数是协变（out）、逆变（in）还是不变的。这提高了类型检查的正确性和性能。',
    conditionalTitle: '2. 条件类型与 Infer',
    conditionalP1: '条件类型遵循 T extends U ? X : Y 模式。它们实现类型级分支，根据条件是否满足选择不同类型。',
    conditionalP2: '条件类型中的 infer 关键字引入一个类型变量，TypeScript 从被检查的类型中推断它。这就是 ReturnType 和 Parameters 等工具类型的工作原理。',
    conditionalP3: '分布式条件类型自动分布在联合类型上。如果 T 是 A | B，则 T extends U ? X : Y 变为 (A extends U ? X : Y) | (B extends U ? X : Y)。用 [T] 包裹以阻止分布。',
    mappedTitle: '3. 映射类型与键重映射',
    mappedP1: '映射类型遍历类型的键来创建新类型。基本形式是 { [K in keyof T]: NewType }。结合条件类型和模板字面量，映射类型变得极其强大。',
    mappedP2: '键重映射（as 子句，TypeScript 4.1+）允许在映射过程中转换键。你可以使用模板字面量类型重命名、过滤或生成新键。',
    mappedP3: '模板字面量类型（TypeScript 4.1 引入）在类型级别实现字符串操作。结合映射类型，它们可以生成类型化的事件处理器、API 端点或 CSS 属性类型。',
    utilityTitle: '4. 工具类型深入剖析',
    utilityP1: 'TypeScript 内置的工具类型使用泛型、条件类型和映射类型实现。理解其内部原理有助于编写自己的工具类型。',
    utilityP2: 'Partial<T> 使所有属性可选。Required<T> 使所有属性必需。Pick<T, K> 选择特定键。Omit<T, K> 移除键。Record<K, V> 创建对象类型。这些是最常用的。',
    utilityP3: 'Exclude<T, U> 从联合中移除类型。Extract<T, U> 保留匹配的类型。ReturnType<T> 提取函数返回类型。Parameters<T> 提取参数类型为元组。NonNullable<T> 移除 null 和 undefined。',
    utilityP4: 'Awaited<T>（TypeScript 4.5+）递归解包 Promise 类型。NoInfer<T>（TypeScript 5.4+）阻止特定位置的推断。这些较新的工具类型解决常见痛点。',
    discriminatedTitle: '5. 可辨识联合与穷举检查',
    discriminatedP1: '可辨识联合将联合类型与共享的字面量属性（辨识符）结合。TypeScript 根据此辨识符收窄类型，实现对变体特定属性的安全访问。',
    discriminatedP2: '穷举检查确保处理了每个变体。never 类型是关键：如果 switch 语句遗漏了一个 case，剩余类型不能赋值给 never，导致编译错误。',
    discriminatedP3: '此模式非常适合状态机、Redux action、不同形状的 API 响应、编译器 AST 节点以及任何具有多个变体共享公共接口的场景。',
    brandedTitle: '6. 品牌类型与名义类型',
    brandedP1: 'TypeScript 使用结构类型：两个具有相同结构的类型是兼容的。品牌类型添加一个幻影属性来创建名义类型，即使运行时值相同也结构不兼容。',
    brandedP2: '这对防止意外误用至关重要：在需要 OrderId 的地方传递 UserId，或混淆已验证和未验证的字符串。品牌仅存在于类型级别，零运行时开销。',
    declarationTitle: '7. 声明合并与模块增强',
    declarationP1: '声明合并自动组合同名的多个声明。接口合并其成员。命名空间与类、函数和枚举合并。这就是 TypeScript 扩展内置类型的方式。',
    declarationP2: '模块增强允许在不修改源码的情况下扩展第三方库类型。使用 declare module 为 Express Request 添加属性、扩展 Window 或修补库类型。',
    decoratorsTitle: '8. 装饰器（Stage 3 / TC39）',
    decoratorsP1: 'Stage 3 装饰器（TypeScript 5.0+）是用于在定义时修改类、方法、属性和访问器的标准提案。它们替代了需要 --experimentalDecorators 标志的旧实验性装饰器。',
    decoratorsP2: '装饰器是接收目标值和上下文对象的函数。它可以返回替代值或 undefined。类装饰器接收类构造函数。方法装饰器接收方法函数。',
    decoratorsP3: '常见用例包括日志记录、验证、记忆化、依赖注入、访问控制和序列化元数据。装饰器在堆叠时自然组合。',
    satisfiesTitle: '9. satisfies 运算符',
    satisfiesP1: 'satisfies 运算符（TypeScript 4.9+）验证表达式匹配类型而不改变推断类型。与类型注解（: Type）不同，satisfies 保留字面量类型和特定联合成员。',
    satisfiesP2: '这解决了长期存在的矛盾：你需要类型检查以确保正确性，但不想丢失特定的推断类型。使用 satisfies，两者兼得。',
    constTitle: '10. Const 断言与只读模式',
    constP1: 'as const 断言将值转换为最具体的字面量类型。数组变为只读元组，对象获得只读属性和字面量类型，字符串值被收窄为其精确字面量。',
    constP2: '将 as const 与泛型函数结合可实现强大的模式，如类型安全的构建器、路由定义和配置对象，其中精确的形状在类型级别得以保留。',
    narrowingTitle: '11. 类型收窄模式',
    narrowingP1: '类型收窄是 TypeScript 在代码块中将宽泛类型细化为更具体类型的方式。除了 typeof 和 instanceof，TypeScript 还支持自定义类型守卫、断言函数和控制流收窄。',
    narrowingP2: '用户定义的类型守卫（is 关键字）返回布尔值并收窄参数类型。断言函数（asserts 关键字）在条件失败时抛出异常，并在调用后收窄类型。',
    narrowingP3: 'in 运算符、等值检查、真值检查和赋值收窄都能细化类型。TypeScript 通过 if/else 分支、switch 语句和短路求值跟踪收窄。',
    varianceTitle: '12. 协变与逆变',
    varianceP1: '协变意味着子类型可以替代超类型（Cat[] 可赋值给 Animal[]）。逆变意味着相反方向：超类型可以替代子类型。这对函数参数和返回类型很重要。',
    varianceP2: '函数参数是逆变的（除非关闭 --strictFunctionTypes）。返回类型是协变的。理解变型可以防止在传递回调、比较函数类型或使用泛型容器时出现微妙的 bug。',
    recursiveTitle: '13. 递归类型',
    recursiveP1: '递归类型在其定义中引用自身。它们对于建模树结构、嵌套 JSON、深层嵌套配置、链表以及任何无限深度的数据至关重要。',
    recursiveP2: 'TypeScript 支持递归类型别名（3.7 起）和递归条件类型（4.1 起）。这些使得 DeepPartial、DeepReadonly、深层路径提取和 JSON 类型验证等强大工具类型成为可能。',
    conclusionTitle: '总结',
    conclusionP1: 'TypeScript 的高级类型特性构成了完整的类型级编程语言。通过掌握泛型、条件类型、映射类型、模板字面量以及本指南中的模式，你可以构建自文档化、不可能误用、在编译时而非运行时捕获错误的 API。',
    conclusionP2: '从与当前代码库最相关的模式开始。可辨识联合和穷举检查提供即时价值。品牌类型和自定义工具类型随领域模型的增长变得必不可少。递归类型和模板字面量类型等高级模式解锁了以前在静态类型语言中不可能实现的能力。',
    faq1Q: '何时应该使用泛型而非联合类型？',
    faq1A: '当需要在函数或类中保留并传播特定类型时使用泛型。当有已知的、有限的可能类型集时使用联合类型。泛型维护输入和输出类型之间的关系；联合只是在一个位置允许多种类型。',
    faq2Q: 'TypeScript 中 type 和 interface 的区别是什么？',
    faq2A: '接口支持声明合并，可以用 extends 扩展。类型支持联合、交叉、条件和映射类型。对于对象形状，两者都可以；公共 API 优先用 interface（可合并），复杂类型操作用 type。',
    faq3Q: '带 infer 的条件类型如何工作？',
    faq3A: '条件类型使用 T extends U ? X : Y 模式。extends 子句中的 infer 关键字引入一个类型变量，TypeScript 从 T 中推断它。例如，T extends Promise<infer R> ? R : T 从 Promise 中提取解析后的类型。',
    faq4Q: '什么是品牌类型，何时应该使用？',
    faq4A: '品牌类型添加一个幻影属性（仅在编译时存在）来在 TypeScript 的结构类型系统中创建类似名义的类型。用它们防止混淆语义不同的值，如 UserId 与 OrderId，或已验证与未验证的字符串。',
    faq5Q: 'satisfies 运算符与类型注解有什么不同？',
    faq5A: '类型注解（const x: Type）将推断类型拓宽为匹配注解。satisfies 运算符（const x = value satisfies Type）检查值是否匹配类型但保留原始的窄/字面量推断。你得到类型检查而不失去具体性。',
    faq6Q: 'Stage 3 装饰器是什么，与实验性装饰器有何不同？',
    faq6A: 'Stage 3 装饰器（TypeScript 5.0+）遵循 TC39 标准提案，不需要 --experimentalDecorators。它们接收值和上下文对象而非 target/key/descriptor。它们与 Angular 或 MobX 等旧库使用的遗留装饰器不向后兼容。',
    faq7Q: '如何在 switch 语句中进行穷举检查？',
    faq7A: '处理所有已知 case 后，添加一个 default case，将辨识符赋值给类型为 never 的变量。如果遗漏了一个 case，TypeScript 会报错，因为剩余类型不能赋值给 never。这确保在编译时处理所有变体。',
    faq8Q: '递归类型有什么用途？',
    faq8A: '递归类型建模自引用数据，如树、嵌套 JSON、链表和深层嵌套配置。它们使 DeepPartial、DeepReadonly 和深层路径提取等工具类型能够操作任意嵌套的结构。',
  },
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '2rem',
};

const headingStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#1e293b',
  marginBottom: '1rem',
  marginTop: '2.5rem',
  lineHeight: 1.3,
};

const subHeadingStyle: React.CSSProperties = {
  fontSize: '1.35rem',
  fontWeight: 600,
  color: '#334155',
  marginBottom: '0.75rem',
  marginTop: '2rem',
  lineHeight: 1.4,
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.8,
  color: '#374151',
  marginBottom: '1rem',
};

const codeBlockStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#e2e8f0',
  padding: '1.25rem',
  borderRadius: '8px',
  overflowX: 'auto',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  marginBottom: '1.5rem',
  fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
};

const tldrBoxStyle: React.CSSProperties = {
  background: '#f0f9ff',
  borderLeft: '4px solid #0ea5e9',
  padding: '1.25rem 1.5rem',
  borderRadius: '0 8px 8px 0',
  marginBottom: '2rem',
  fontSize: '1.05rem',
  lineHeight: 1.7,
  color: '#0c4a6e',
};

const takeawaysBoxStyle: React.CSSProperties = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  padding: '1.5rem',
  borderRadius: '8px',
  marginBottom: '2rem',
};

const takeawayItemStyle: React.CSSProperties = {
  fontSize: '1rem',
  lineHeight: 1.7,
  color: '#334155',
  marginBottom: '0.5rem',
  paddingLeft: '0.5rem',
};

const tableContainerStyle: React.CSSProperties = {
  overflowX: 'auto',
  marginBottom: '2rem',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.95rem',
  lineHeight: 1.6,
};

const thStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#f8fafc',
  padding: '0.75rem 1rem',
  textAlign: 'left',
  fontWeight: 600,
  borderBottom: '2px solid #334155',
};

const tdStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e2e8f0',
  color: '#374151',
};

const tdAltStyle: React.CSSProperties = {
  ...tdStyle,
  background: '#f8fafc',
};

const tipBoxStyle: React.CSSProperties = {
  background: '#f0fdf4',
  borderLeft: '4px solid #22c55e',
  padding: '1rem 1.25rem',
  borderRadius: '0 8px 8px 0',
  marginBottom: '1.5rem',
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: '#14532d',
};

const warningBoxStyle: React.CSSProperties = {
  background: '#fffbeb',
  borderLeft: '4px solid #f59e0b',
  padding: '1rem 1.25rem',
  borderRadius: '0 8px 8px 0',
  marginBottom: '1.5rem',
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: '#78350f',
};

const inlineCodeStyle: React.CSSProperties = {
  background: '#f1f5f9',
  color: '#dc2626',
  padding: '0.15rem 0.4rem',
  borderRadius: '4px',
  fontSize: '0.9em',
  fontFamily: "'Fira Code', Consolas, monospace",
};

export default function TypescriptAdvancedGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Title */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '0.75rem' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: 1.6 }}>
          {t.subtitle}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#0369a1', fontSize: '1.1rem' }}>
          TL;DR
        </strong>
        {t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={takeawaysBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '0.75rem', color: '#1e293b', fontSize: '1.1rem' }}>
          Key Takeaways
        </strong>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway1}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway2}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway3}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway4}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway5}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway6}</li>
        </ul>
      </div>

      {/* Introduction */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.introTitle}</h2>
        <p style={paragraphStyle}>{t.introP1}</p>
        <p style={paragraphStyle}>{t.introP2}</p>
      </section>

      {/* 1. Advanced Generics */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.genericsTitle}</h2>
        <p style={paragraphStyle}>{t.genericsP1}</p>

        <h3 style={subHeadingStyle}>Generic Constraints</h3>
        <p style={paragraphStyle}>{t.genericsP2}</p>
        <pre style={codeBlockStyle}><code>{
          '// Generic constraint: T must have a length property\n'
          + 'function longest<T extends { length: number }>(a: T, b: T): T {\n'
          + '  return a.length >= b.length ? a : b;\n'
          + '}\n\n'
          + 'longest("hello", "hi");        // OK: string has length\n'
          + 'longest([1, 2, 3], [1]);       // OK: array has length\n'
          + '// longest(10, 20);            // Error: number has no length\n\n'
          + '// Constraint with keyof\n'
          + 'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n'
          + '  return obj[key];\n'
          + '}\n\n'
          + 'const user = { name: "Alice", age: 30 };\n'
          + 'getProperty(user, "name");     // type: string\n'
          + 'getProperty(user, "age");      // type: number\n'
          + '// getProperty(user, "email"); // Error: "email" not in keyof User'
        }</code></pre>

        <h3 style={subHeadingStyle}>Default Type Parameters</h3>
        <p style={paragraphStyle}>{t.genericsP3}</p>
        <pre style={codeBlockStyle}><code>{
          '// Default type parameter\n'
          + 'interface ApiResponse<TData = unknown, TError = Error> {\n'
          + '  data: TData | null;\n'
          + '  error: TError | null;\n'
          + '  status: number;\n'
          + '}\n\n'
          + '// Uses defaults: ApiResponse<unknown, Error>\n'
          + 'const res1: ApiResponse = { data: null, error: null, status: 200 };\n\n'
          + '// Override only TData\n'
          + 'const res2: ApiResponse<User[]> = {\n'
          + '  data: [{ id: 1, name: "Alice" }],\n'
          + '  error: null,\n'
          + '  status: 200,\n'
          + '};'
        }</code></pre>

        <h3 style={subHeadingStyle}>Variance Annotations</h3>
        <p style={paragraphStyle}>{t.genericsP4}</p>
        <pre style={codeBlockStyle}><code>{
          '// Variance annotations (TypeScript 4.7+)\n'
          + 'interface Producer<out T> {\n'
          + '  produce(): T;    // T is in output (covariant) position\n'
          + '}\n\n'
          + 'interface Consumer<in T> {\n'
          + '  consume(value: T): void;  // T is in input (contravariant) position\n'
          + '}\n\n'
          + 'interface Transform<in T, out U> {\n'
          + '  transform(input: T): U;   // T contravariant, U covariant\n'
          + '}'
        }</code></pre>
      </section>

      {/* 2. Conditional Types */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.conditionalTitle}</h2>
        <p style={paragraphStyle}>{t.conditionalP1}</p>
        <pre style={codeBlockStyle}><code>{
          '// Basic conditional type\n'
          + 'type IsString<T> = T extends string ? true : false;\n\n'
          + 'type A = IsString<"hello">;   // true\n'
          + 'type B = IsString<42>;        // false\n'
          + 'type C = IsString<string>;    // true\n\n'
          + '// Nested conditional types\n'
          + 'type TypeName<T> =\n'
          + '  T extends string ? "string" :\n'
          + '  T extends number ? "number" :\n'
          + '  T extends boolean ? "boolean" :\n'
          + '  T extends undefined ? "undefined" :\n'
          + '  T extends Function ? "function" :\n'
          + '  "object";'
        }</code></pre>

        <h3 style={subHeadingStyle}>The infer Keyword</h3>
        <p style={paragraphStyle}>{t.conditionalP2}</p>
        <pre style={codeBlockStyle}><code>{
          '// Extract return type using infer\n'
          + 'type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n\n'
          + 'type R1 = MyReturnType<() => string>;          // string\n'
          + 'type R2 = MyReturnType<(x: number) => boolean>; // boolean\n\n'
          + '// Extract Promise inner type\n'
          + 'type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;\n\n'
          + 'type P1 = UnwrapPromise<Promise<string>>;      // string\n'
          + 'type P2 = UnwrapPromise<Promise<number[]>>;    // number[]\n'
          + 'type P3 = UnwrapPromise<string>;               // string\n\n'
          + '// Extract array element type\n'
          + 'type ElementOf<T> = T extends (infer E)[] ? E : never;\n\n'
          + 'type E1 = ElementOf<string[]>;    // string\n'
          + 'type E2 = ElementOf<[1, 2, 3]>;   // 1 | 2 | 3'
        }</code></pre>

        <h3 style={subHeadingStyle}>Distributive Conditional Types</h3>
        <p style={paragraphStyle}>{t.conditionalP3}</p>
        <pre style={codeBlockStyle}><code>{
          '// Distributive: T distributes over union\n'
          + 'type ToArray<T> = T extends any ? T[] : never;\n\n'
          + 'type D1 = ToArray<string | number>;\n'
          + '// Result: string[] | number[]  (distributed)\n\n'
          + '// Non-distributive: wrap in tuple\n'
          + 'type ToArrayND<T> = [T] extends [any] ? T[] : never;\n\n'
          + 'type D2 = ToArrayND<string | number>;\n'
          + '// Result: (string | number)[]  (not distributed)'
        }</code></pre>
      </section>

      {/* 3. Mapped Types */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.mappedTitle}</h2>
        <p style={paragraphStyle}>{t.mappedP1}</p>
        <pre style={codeBlockStyle}><code>{
          '// Basic mapped type: make all properties optional\n'
          + 'type MyPartial<T> = {\n'
          + '  [K in keyof T]?: T[K];\n'
          + '};\n\n'
          + '// Make all properties readonly\n'
          + 'type MyReadonly<T> = {\n'
          + '  readonly [K in keyof T]: T[K];\n'
          + '};\n\n'
          + '// Mapped type with conditional value\n'
          + 'type NullableProps<T> = {\n'
          + '  [K in keyof T]: T[K] | null;\n'
          + '};'
        }</code></pre>

        <h3 style={subHeadingStyle}>Key Remapping (as clause)</h3>
        <p style={paragraphStyle}>{t.mappedP2}</p>
        <pre style={codeBlockStyle}><code>{
          '// Key remapping with as (TypeScript 4.1+)\n'
          + 'type Getters<T> = {\n'
          + '  [K in keyof T as `get\${Capitalize<string & K>}`]: () => T[K];\n'
          + '};\n\n'
          + 'interface Person {\n'
          + '  name: string;\n'
          + '  age: number;\n'
          + '}\n\n'
          + 'type PersonGetters = Getters<Person>;\n'
          + '// { getName: () => string; getAge: () => number }\n\n'
          + '// Filter keys: remove methods\n'
          + 'type DataOnly<T> = {\n'
          + '  [K in keyof T as T[K] extends Function ? never : K]: T[K];\n'
          + '};'
        }</code></pre>

        <h3 style={subHeadingStyle}>Template Literal Types</h3>
        <p style={paragraphStyle}>{t.mappedP3}</p>
        <pre style={codeBlockStyle}><code>{
          '// Template literal types\n'
          + 'type EventName<T extends string> = `on\${Capitalize<T>}`;\n\n'
          + 'type ClickEvent = EventName<"click">;     // "onClick"\n'
          + 'type FocusEvent = EventName<"focus">;     // "onFocus"\n\n'
          + '// Combining with union types\n'
          + 'type Color = "red" | "blue" | "green";\n'
          + 'type Size = "small" | "medium" | "large";\n\n'
          + 'type ColorSize = `\${Color}-\${Size}`;\n'
          + '// "red-small" | "red-medium" | "red-large"\n'
          + '// | "blue-small" | "blue-medium" | ...\n\n'
          + '// Built-in string manipulation types\n'
          + 'type U = Uppercase<"hello">;       // "HELLO"\n'
          + 'type L = Lowercase<"HELLO">;       // "hello"\n'
          + 'type Cap = Capitalize<"hello">;    // "Hello"\n'
          + 'type Unc = Uncapitalize<"Hello">;  // "hello"'
        }</code></pre>
      </section>

      {/* 4. Utility Types */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.utilityTitle}</h2>
        <p style={paragraphStyle}>{t.utilityP1}</p>

        <div style={tipBoxStyle}>
          <strong>Tip: </strong>{t.utilityP2}
        </div>

        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Utility Type</th>
                <th style={thStyle}>Implementation</th>
                <th style={thStyle}>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}><code style={inlineCodeStyle}>{'Partial<T>'}</code></td>
                <td style={tdStyle}><code style={inlineCodeStyle}>{'{ [K in keyof T]?: T[K] }'}</code></td>
                <td style={tdStyle}>All properties optional</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><code style={inlineCodeStyle}>{'Required<T>'}</code></td>
                <td style={tdAltStyle}><code style={inlineCodeStyle}>{'{ [K in keyof T]-?: T[K] }'}</code></td>
                <td style={tdAltStyle}>All properties required</td>
              </tr>
              <tr>
                <td style={tdStyle}><code style={inlineCodeStyle}>{'Pick<T, K>'}</code></td>
                <td style={tdStyle}><code style={inlineCodeStyle}>{'{ [P in K]: T[P] }'}</code></td>
                <td style={tdStyle}>Select specific keys</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><code style={inlineCodeStyle}>{'Omit<T, K>'}</code></td>
                <td style={tdAltStyle}><code style={inlineCodeStyle}>{'Pick<T, Exclude<keyof T, K>>'}</code></td>
                <td style={tdAltStyle}>Remove specific keys</td>
              </tr>
              <tr>
                <td style={tdStyle}><code style={inlineCodeStyle}>{'Record<K, V>'}</code></td>
                <td style={tdStyle}><code style={inlineCodeStyle}>{'{ [P in K]: V }'}</code></td>
                <td style={tdStyle}>Object with key type K, value type V</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><code style={inlineCodeStyle}>{'ReturnType<T>'}</code></td>
                <td style={tdAltStyle}><code style={inlineCodeStyle}>{'T extends (...) => infer R ? R : any'}</code></td>
                <td style={tdAltStyle}>Extract function return type</td>
              </tr>
              <tr>
                <td style={tdStyle}><code style={inlineCodeStyle}>{'Parameters<T>'}</code></td>
                <td style={tdStyle}><code style={inlineCodeStyle}>{'T extends (...args: infer P) => any ? P : never'}</code></td>
                <td style={tdStyle}>Extract parameter types as tuple</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><code style={inlineCodeStyle}>{'Awaited<T>'}</code></td>
                <td style={tdAltStyle}><code style={inlineCodeStyle}>Recursive Promise unwrap</code></td>
                <td style={tdAltStyle}>Unwrap nested Promises</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={paragraphStyle}>{t.utilityP3}</p>

        <pre style={codeBlockStyle}><code>{
          '// Practical utility type compositions\n'
          + 'type UpdatePayload<T> = Partial<Omit<T, "id" | "createdAt">>;\n\n'
          + 'interface User {\n'
          + '  id: string;\n'
          + '  name: string;\n'
          + '  email: string;\n'
          + '  createdAt: Date;\n'
          + '}\n\n'
          + 'type UserUpdate = UpdatePayload<User>;\n'
          + '// { name?: string; email?: string }\n\n'
          + '// Custom utility: make specific keys required\n'
          + 'type RequireKeys<T, K extends keyof T> =\n'
          + '  Omit<T, K> & Required<Pick<T, K>>;\n\n'
          + 'type UserWithEmail = RequireKeys<Partial<User>, "email">;\n'
          + '// { id?: string; name?: string; email: string; createdAt?: Date }'
        }</code></pre>

        <p style={paragraphStyle}>{t.utilityP4}</p>
      </section>

      {/* 5. Discriminated Unions */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.discriminatedTitle}</h2>
        <p style={paragraphStyle}>{t.discriminatedP1}</p>
        <pre style={codeBlockStyle}><code>{
          '// Discriminated union with "type" discriminant\n'
          + 'type Shape =\n'
          + '  | { type: "circle"; radius: number }\n'
          + '  | { type: "rectangle"; width: number; height: number }\n'
          + '  | { type: "triangle"; base: number; height: number };\n\n'
          + 'function area(shape: Shape): number {\n'
          + '  switch (shape.type) {\n'
          + '    case "circle":\n'
          + '      return Math.PI * shape.radius ** 2;\n'
          + '    case "rectangle":\n'
          + '      return shape.width * shape.height;\n'
          + '    case "triangle":\n'
          + '      return (shape.base * shape.height) / 2;\n'
          + '  }\n'
          + '}'
        }</code></pre>

        <h3 style={subHeadingStyle}>Exhaustive Checking with never</h3>
        <p style={paragraphStyle}>{t.discriminatedP2}</p>
        <pre style={codeBlockStyle}><code>{
          '// Exhaustive check helper\n'
          + 'function assertNever(x: never): never {\n'
          + '  throw new Error("Unexpected value: " + x);\n'
          + '}\n\n'
          + 'function getShapeColor(shape: Shape): string {\n'
          + '  switch (shape.type) {\n'
          + '    case "circle":    return "red";\n'
          + '    case "rectangle": return "blue";\n'
          + '    case "triangle":  return "green";\n'
          + '    default:\n'
          + '      // If a new variant is added to Shape but not handled,\n'
          + '      // TypeScript will error here at compile time\n'
          + '      return assertNever(shape);\n'
          + '  }\n'
          + '}'
        }</code></pre>

        <p style={paragraphStyle}>{t.discriminatedP3}</p>

        <div style={tipBoxStyle}>
          <strong>Tip: </strong>Use discriminated unions for Redux actions, API responses, AST nodes, and any domain model with multiple variants. The compiler guarantees every variant is handled.
        </div>
      </section>

      {/* 6. Branded Types */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.brandedTitle}</h2>
        <p style={paragraphStyle}>{t.brandedP1}</p>
        <pre style={codeBlockStyle}><code>{
          '// Branded type pattern\n'
          + 'type Brand<T, B extends string> = T & { readonly __brand: B };\n\n'
          + 'type UserId = Brand<string, "UserId">;\n'
          + 'type OrderId = Brand<string, "OrderId">;\n'
          + 'type Email = Brand<string, "Email">;\n\n'
          + '// Constructor functions with validation\n'
          + 'function createUserId(id: string): UserId {\n'
          + '  if (!id.startsWith("usr_")) {\n'
          + '    throw new Error("Invalid user ID format");\n'
          + '  }\n'
          + '  return id as UserId;\n'
          + '}\n\n'
          + 'function createEmail(value: string): Email {\n'
          + '  if (!value.includes("@")) {\n'
          + '    throw new Error("Invalid email");\n'
          + '  }\n'
          + '  return value as Email;\n'
          + '}\n\n'
          + 'function getUser(id: UserId): void { /* ... */ }\n'
          + 'function getOrder(id: OrderId): void { /* ... */ }\n\n'
          + 'const userId = createUserId("usr_123");\n'
          + 'const orderId = "ord_456" as OrderId;\n\n'
          + 'getUser(userId);   // OK\n'
          + '// getUser(orderId); // Error: OrderId not assignable to UserId'
        }</code></pre>
        <p style={paragraphStyle}>{t.brandedP2}</p>

        <div style={warningBoxStyle}>
          <strong>Warning: </strong>The brand property is purely a compile-time construct. At runtime, branded values are just regular strings/numbers. Never access the __brand property directly.
        </div>
      </section>

      {/* 7. Declaration Merging */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.declarationTitle}</h2>
        <p style={paragraphStyle}>{t.declarationP1}</p>
        <pre style={codeBlockStyle}><code>{
          '// Interface merging\n'
          + 'interface Window {\n'
          + '  analytics: {\n'
          + '    track(event: string, data?: object): void;\n'
          + '  };\n'
          + '}\n\n'
          + '// Now window.analytics.track() is typed\n'
          + 'window.analytics.track("page_view", { path: "/" });'
        }</code></pre>

        <h3 style={subHeadingStyle}>Module Augmentation</h3>
        <p style={paragraphStyle}>{t.declarationP2}</p>
        <pre style={codeBlockStyle}><code>{
          '// Augment Express Request type\n'
          + 'declare module "express" {\n'
          + '  interface Request {\n'
          + '    user?: {\n'
          + '      id: string;\n'
          + '      role: "admin" | "user";\n'
          + '    };\n'
          + '    requestId: string;\n'
          + '  }\n'
          + '}\n\n'
          + '// Augment a CSS module\n'
          + 'declare module "*.module.css" {\n'
          + '  const classes: Record<string, string>;\n'
          + '  export default classes;\n'
          + '}\n\n'
          + '// Augment environment variables\n'
          + 'declare namespace NodeJS {\n'
          + '  interface ProcessEnv {\n'
          + '    DATABASE_URL: string;\n'
          + '    API_KEY: string;\n'
          + '    NODE_ENV: "development" | "production" | "test";\n'
          + '  }\n'
          + '}'
        }</code></pre>
      </section>

      {/* 8. Decorators */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.decoratorsTitle}</h2>
        <p style={paragraphStyle}>{t.decoratorsP1}</p>
        <p style={paragraphStyle}>{t.decoratorsP2}</p>
        <pre style={codeBlockStyle}><code>{
          '// Stage 3 decorator: method logging\n'
          + 'function log<T extends (...args: any[]) => any>(\n'
          + '  target: T,\n'
          + '  context: ClassMethodDecoratorContext\n'
          + '): T {\n'
          + '  const methodName = String(context.name);\n'
          + '  return function (this: any, ...args: any[]) {\n'
          + '    console.log(`Calling \${methodName} with`, args);\n'
          + '    const result = target.apply(this, args);\n'
          + '    console.log(`\${methodName} returned`, result);\n'
          + '    return result;\n'
          + '  } as T;\n'
          + '}\n\n'
          + '// Class decorator: sealed\n'
          + 'function sealed<T extends new (...args: any[]) => any>(\n'
          + '  target: T,\n'
          + '  _context: ClassDecoratorContext\n'
          + '): T {\n'
          + '  Object.seal(target);\n'
          + '  Object.seal(target.prototype);\n'
          + '  return target;\n'
          + '}'
        }</code></pre>

        <pre style={codeBlockStyle}><code>{
          '// Using decorators\n'
          + '@sealed\n'
          + 'class UserService {\n'
          + '  @log\n'
          + '  findById(id: string): User | null {\n'
          + '    // ... database lookup\n'
          + '    return null;\n'
          + '  }\n\n'
          + '  @log\n'
          + '  create(data: CreateUserDto): User {\n'
          + '    // ... insert logic\n'
          + '    return { id: "1", ...data } as User;\n'
          + '  }\n'
          + '}'
        }</code></pre>
        <p style={paragraphStyle}>{t.decoratorsP3}</p>
      </section>

      {/* 9. satisfies */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.satisfiesTitle}</h2>
        <p style={paragraphStyle}>{t.satisfiesP1}</p>
        <pre style={codeBlockStyle}><code>{
          '// Without satisfies: type annotation widens\n'
          + 'type ColorMap = Record<string, [number, number, number] | string>;\n\n'
          + 'const colorsAnnotated: ColorMap = {\n'
          + '  red: [255, 0, 0],\n'
          + '  green: "#00ff00",\n'
          + '  blue: [0, 0, 255],\n'
          + '};\n'
          + '// colorsAnnotated.red is [number, number, number] | string\n'
          + '// Cannot call .toUpperCase() even on green!\n\n'
          + '// With satisfies: preserves literal inference\n'
          + 'const colors = {\n'
          + '  red: [255, 0, 0],\n'
          + '  green: "#00ff00",\n'
          + '  blue: [0, 0, 255],\n'
          + '} satisfies ColorMap;\n\n'
          + 'colors.green.toUpperCase();  // OK! TypeScript knows it is string\n'
          + 'colors.red[0];              // OK! TypeScript knows it is number'
        }</code></pre>
        <p style={paragraphStyle}>{t.satisfiesP2}</p>

        <pre style={codeBlockStyle}><code>{
          '// Route config with satisfies\n'
          + 'type Route = { path: string; component: string; auth?: boolean };\n\n'
          + 'const routes = {\n'
          + '  home:    { path: "/",        component: "HomePage" },\n'
          + '  profile: { path: "/profile", component: "ProfilePage", auth: true },\n'
          + '  login:   { path: "/login",   component: "LoginPage" },\n'
          + '} satisfies Record<string, Route>;\n\n'
          + '// routes.home.path is "/", not just string!\n'
          + '// routes.profile.auth is true, not just boolean | undefined!'
        }</code></pre>
      </section>

      {/* 10. Const Assertions */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.constTitle}</h2>
        <p style={paragraphStyle}>{t.constP1}</p>
        <pre style={codeBlockStyle}><code>{
          '// as const narrows to literal types\n'
          + 'const config = {\n'
          + '  endpoint: "https://api.example.com",\n'
          + '  retries: 3,\n'
          + '  methods: ["GET", "POST"],\n'
          + '} as const;\n\n'
          + '// typeof config:\n'
          + '// {\n'
          + '//   readonly endpoint: "https://api.example.com";\n'
          + '//   readonly retries: 3;\n'
          + '//   readonly methods: readonly ["GET", "POST"];\n'
          + '// }\n\n'
          + '// Derive union type from const array\n'
          + 'const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;\n'
          + 'type HttpMethod = (typeof HTTP_METHODS)[number];\n'
          + '// "GET" | "POST" | "PUT" | "DELETE"'
        }</code></pre>
        <p style={paragraphStyle}>{t.constP2}</p>

        <pre style={codeBlockStyle}><code>{
          '// Type-safe route builder with as const\n'
          + 'function defineRoutes<\n'
          + '  T extends Record<string, { path: string }>\n'
          + '>(routes: T): T {\n'
          + '  return routes;\n'
          + '}\n\n'
          + 'const appRoutes = defineRoutes({\n'
          + '  home:    { path: "/" },\n'
          + '  about:   { path: "/about" },\n'
          + '  blog:    { path: "/blog" },\n'
          + '} as const);\n\n'
          + '// appRoutes.home.path is exactly "/", not string'
        }</code></pre>
      </section>

      {/* 11. Type Narrowing */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.narrowingTitle}</h2>
        <p style={paragraphStyle}>{t.narrowingP1}</p>

        <h3 style={subHeadingStyle}>User-Defined Type Guards</h3>
        <p style={paragraphStyle}>{t.narrowingP2}</p>
        <pre style={codeBlockStyle}><code>{
          '// Type guard with is keyword\n'
          + 'interface Fish { swim(): void }\n'
          + 'interface Bird { fly(): void }\n\n'
          + 'function isFish(pet: Fish | Bird): pet is Fish {\n'
          + '  return (pet as Fish).swim !== undefined;\n'
          + '}\n\n'
          + 'function move(pet: Fish | Bird) {\n'
          + '  if (isFish(pet)) {\n'
          + '    pet.swim();  // TypeScript knows pet is Fish\n'
          + '  } else {\n'
          + '    pet.fly();   // TypeScript knows pet is Bird\n'
          + '  }\n'
          + '}\n\n'
          + '// Assertion function (asserts keyword)\n'
          + 'function assertDefined<T>(\n'
          + '  value: T | null | undefined,\n'
          + '  message?: string\n'
          + '): asserts value is T {\n'
          + '  if (value == null) {\n'
          + '    throw new Error(message ?? "Value is null or undefined");\n'
          + '  }\n'
          + '}\n\n'
          + 'function processUser(user: User | null) {\n'
          + '  assertDefined(user, "User not found");\n'
          + '  // After this line, user is narrowed to User\n'
          + '  console.log(user.name);\n'
          + '}'
        }</code></pre>

        <h3 style={subHeadingStyle}>Advanced Narrowing Patterns</h3>
        <p style={paragraphStyle}>{t.narrowingP3}</p>
        <pre style={codeBlockStyle}><code>{
          '// in operator narrowing\n'
          + 'type Admin = { role: "admin"; permissions: string[] };\n'
          + 'type Guest = { role: "guest"; visitCount: number };\n\n'
          + 'function greet(user: Admin | Guest) {\n'
          + '  if ("permissions" in user) {\n'
          + '    // user is Admin\n'
          + '    console.log("Admin with", user.permissions.length, "perms");\n'
          + '  } else {\n'
          + '    // user is Guest\n'
          + '    console.log("Guest visit #", user.visitCount);\n'
          + '  }\n'
          + '}'
        }</code></pre>
      </section>

      {/* 12. Covariance & Contravariance */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.varianceTitle}</h2>
        <p style={paragraphStyle}>{t.varianceP1}</p>
        <pre style={codeBlockStyle}><code>{
          '// Covariance: subtype in output position\n'
          + 'class Animal { name = "animal"; }\n'
          + 'class Dog extends Animal { breed = "labrador"; }\n\n'
          + '// Return type is covariant:\n'
          + '// () => Dog is assignable to () => Animal\n'
          + 'type AnimalFactory = () => Animal;\n'
          + 'const dogFactory: AnimalFactory = (): Dog => new Dog();\n\n'
          + '// Contravariance: supertype in input position\n'
          + '// (with --strictFunctionTypes)\n'
          + 'type AnimalHandler = (animal: Animal) => void;\n'
          + 'type DogHandler = (dog: Dog) => void;\n\n'
          + '// AnimalHandler is NOT assignable to DogHandler\n'
          + '// (contravariant: parameter types go in opposite direction)\n'
          + '// const handler: DogHandler = (a: Animal) => {}; // Error'
        }</code></pre>
        <p style={paragraphStyle}>{t.varianceP2}</p>

        <div style={warningBoxStyle}>
          <strong>Watch out: </strong>Without --strictFunctionTypes, function parameters are bivariant (both co- and contravariant), which is unsound. Always enable strict mode for correct variance checking.
        </div>
      </section>

      {/* 13. Recursive Types */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.recursiveTitle}</h2>
        <p style={paragraphStyle}>{t.recursiveP1}</p>
        <pre style={codeBlockStyle}><code>{
          '// Recursive type: JSON value\n'
          + 'type JsonValue =\n'
          + '  | string\n'
          + '  | number\n'
          + '  | boolean\n'
          + '  | null\n'
          + '  | JsonValue[]\n'
          + '  | { [key: string]: JsonValue };\n\n'
          + '// Recursive type: tree structure\n'
          + 'type TreeNode<T> = {\n'
          + '  value: T;\n'
          + '  children: TreeNode<T>[];\n'
          + '};\n\n'
          + 'const tree: TreeNode<string> = {\n'
          + '  value: "root",\n'
          + '  children: [\n'
          + '    { value: "child1", children: [] },\n'
          + '    {\n'
          + '      value: "child2",\n'
          + '      children: [\n'
          + '        { value: "grandchild", children: [] }\n'
          + '      ],\n'
          + '    },\n'
          + '  ],\n'
          + '};'
        }</code></pre>

        <p style={paragraphStyle}>{t.recursiveP2}</p>
        <pre style={codeBlockStyle}><code>{
          '// DeepPartial: recursively make all properties optional\n'
          + 'type DeepPartial<T> = {\n'
          + '  [K in keyof T]?: T[K] extends object\n'
          + '    ? DeepPartial<T[K]>\n'
          + '    : T[K];\n'
          + '};\n\n'
          + '// DeepReadonly: recursively make all properties readonly\n'
          + 'type DeepReadonly<T> = {\n'
          + '  readonly [K in keyof T]: T[K] extends object\n'
          + '    ? DeepReadonly<T[K]>\n'
          + '    : T[K];\n'
          + '};\n\n'
          + '// Recursive path extraction\n'
          + 'type Path<T, Prefix extends string = ""> = {\n'
          + '  [K in keyof T & string]: T[K] extends object\n'
          + '    ? Path<T[K], `\${Prefix}\${K}.`>\n'
          + '    : `\${Prefix}\${K}`;\n'
          + '}[keyof T & string];\n\n'
          + 'interface Config {\n'
          + '  db: { host: string; port: number };\n'
          + '  cache: { ttl: number };\n'
          + '}\n\n'
          + 'type ConfigPaths = Path<Config>;\n'
          + '// "db.host" | "db.port" | "cache.ttl"'
        }</code></pre>
      </section>

      {/* Conclusion */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.conclusionTitle}</h2>
        <p style={paragraphStyle}>{t.conclusionP1}</p>
        <p style={paragraphStyle}>{t.conclusionP2}</p>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>FAQ</h2>

        {[
          { q: t.faq1Q, a: t.faq1A },
          { q: t.faq2Q, a: t.faq2A },
          { q: t.faq3Q, a: t.faq3A },
          { q: t.faq4Q, a: t.faq4A },
          { q: t.faq5Q, a: t.faq5A },
          { q: t.faq6Q, a: t.faq6A },
          { q: t.faq7Q, a: t.faq7A },
          { q: t.faq8Q, a: t.faq8A },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>
              {faq.q}
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#475569' }}>
              {faq.a}
            </p>
          </div>
        ))}
      </section>
    </article>
  );
}
