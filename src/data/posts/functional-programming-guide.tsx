'use client';

import React from 'react';

const translations = {
  en: {
    title: 'Functional Programming Guide: Pure Functions, Immutability, Monads & More',
    description:
      'Master functional programming concepts: pure functions, immutability, higher-order functions, closures, currying, composition, monads, functors, pattern matching, and algebraic data types — with JavaScript/TypeScript and Haskell/Scala comparisons.',
  },
  zh: {
    title: '函数式编程指南：纯函数、不可变性、Monad 与更多',
    description:
      '掌握函数式编程核心概念：纯函数、不可变性、高阶函数、闭包、柯里化、组合、Monad、Functor、模式匹配和代数数据类型 — 包含 JavaScript/TypeScript 与 Haskell/Scala 对比。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a pure function and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A pure function always returns the same output for the same input and produces no side effects — no mutation of external state, no I/O, no randomness. Pure functions are easier to test, reason about, memoize, and parallelize. They form the foundation of functional programming and enable referential transparency, meaning any expression can be replaced with its value without changing program behavior.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is immutability and how do I achieve it in JavaScript/TypeScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Immutability means data cannot be changed after creation. In JavaScript, use Object.freeze for shallow immutability, spread operators or structuredClone for copies, and const for bindings. In TypeScript, use Readonly<T>, ReadonlyArray<T>, and as const assertions. Libraries like Immer provide convenient immutable updates with a mutable API through structural sharing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between currying and partial application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Currying transforms a function that takes multiple arguments into a chain of single-argument functions: f(a, b, c) becomes f(a)(b)(c). Partial application fixes some arguments and returns a function expecting the remaining ones: partial(f, a) returns g(b, c). Currying always produces unary functions, while partial application can produce functions of any arity. Haskell curries all functions by default.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a Monad and why should developers learn about it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Monad is a design pattern for composing computations that produce wrapped values. It must implement two operations: unit (wrapping a value) and flatMap/bind (chaining computations on wrapped values). Common monads include Maybe/Option (handling nulls), Either/Result (error handling), Promise (async operations), and List (non-determinism). Understanding monads helps manage side effects, error propagation, and async flows in a composable way.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does function composition work and what are its benefits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Function composition combines two or more functions to create a new function where the output of one becomes the input of the next: compose(f, g)(x) = f(g(x)). Pipe works left-to-right: pipe(f, g)(x) = g(f(x)). Benefits include code reuse, readability (describing what rather than how), testability (each piece is independently testable), and the ability to build complex transformations from simple building blocks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are algebraic data types (ADTs) and how are they used?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Algebraic data types (ADTs) combine types using sum types (OR — tagged unions/discriminated unions) and product types (AND — tuples/records). Sum types like type Shape = Circle | Rectangle model exclusive choices. Product types like { radius: number; color: string } combine multiple fields. ADTs enable exhaustive pattern matching, making illegal states unrepresentable. TypeScript supports ADTs via discriminated unions with a tag field.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is pattern matching and how does it compare across languages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pattern matching is a mechanism for checking a value against patterns and destructuring data. Haskell and Scala have built-in pattern matching with exhaustiveness checking. TypeScript achieves similar results using switch on discriminated unions with the never type for exhaustiveness. The TC39 pattern matching proposal (Stage 1) aims to bring native pattern matching to JavaScript with a match expression syntax.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Haskell compare to TypeScript for functional programming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Haskell is a purely functional language with lazy evaluation, algebraic data types, type classes, and monadic I/O by default. TypeScript is a multi-paradigm language that supports functional patterns through libraries and conventions but does not enforce purity or immutability. Haskell has superior type inference (Hindley-Milner), pattern matching, and function composition syntax. TypeScript has a larger ecosystem, lower learning curve, and better industry adoption for web development.',
      },
    },
  ],
};

export default function FunctionalProgrammingGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.7', margin: '0' }}>
          {t.description}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          {isZh ? 'TL;DR — 60 秒速览函数式编程' : 'TL;DR — Functional Programming in 60 Seconds'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.9' }}>
          <li>{isZh ? '纯函数：相同输入 → 相同输出，无副作用，可缓存、可并行' : 'Pure functions: same input → same output, no side effects — cacheable & parallelizable'}</li>
          <li>{isZh ? '不可变性：数据创建后不可修改；使用 spread、Immer 或 persistent 数据结构' : 'Immutability: data never changes after creation; use spread, Immer, or persistent data structures'}</li>
          <li>{isZh ? '高阶函数：map、filter、reduce 是核心工具；函数是一等公民' : 'Higher-order functions: map, filter, reduce are core tools; functions are first-class citizens'}</li>
          <li>{isZh ? '柯里化与组合：将多参数函数转化为单参数链，通过 pipe/compose 构建管道' : 'Currying & composition: transform multi-arg functions into unary chains, build pipelines with pipe/compose'}</li>
          <li>{isZh ? 'Monad（Maybe、Either、Promise）：以可组合的方式处理空值、错误和异步' : 'Monads (Maybe, Either, Promise): handle nulls, errors, and async in a composable way'}</li>
          <li>{isZh ? '代数数据类型 + 模式匹配：让非法状态不可表示' : 'ADTs + pattern matching: make illegal states unrepresentable'}</li>
          <li>{isZh ? 'Haskell 是纯函数式标杆；TypeScript 通过库和约定支持 FP 风格' : 'Haskell is the pure FP gold standard; TypeScript supports FP style through libraries and conventions'}</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px 24px', borderRadius: '8px', marginBottom: '32px' }}>
        <strong style={{ fontSize: '1.05rem', color: '#1e293b', display: 'block', marginBottom: '10px' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.9' }}>
          <li>{isZh ? '函数式编程是一种声明式范式，强调表达式而非语句' : 'FP is a declarative paradigm emphasizing expressions over statements'}</li>
          <li>{isZh ? '引用透明性使代码像数学方程一样可推理' : 'Referential transparency makes code reason-able like math equations'}</li>
          <li>{isZh ? 'TypeScript 的 Readonly、as const、discriminated unions 是实用 FP 工具' : 'TypeScript\'s Readonly, as const, discriminated unions are practical FP tools'}</li>
          <li>{isZh ? 'fp-ts、Effect-TS、Ramda 和 Lodash/fp 将 FP 带入 JS/TS 生态' : 'fp-ts, Effect-TS, Ramda, and Lodash/fp bring FP to the JS/TS ecosystem'}</li>
          <li>{isZh ? 'Scala 融合 OOP 和 FP；Haskell 强制纯函数式' : 'Scala blends OOP and FP; Haskell enforces pure functional style'}</li>
          <li>{isZh ? '学习 FP 思想可改善所有范式中的代码质量' : 'Learning FP concepts improves code quality across all paradigms'}</li>
        </ul>
      </div>

      {/* Section 1: Pure Functions */}
      <h2 style={h2Style}>
        {isZh ? '1. 纯函数与引用透明性' : '1. Pure Functions & Referential Transparency'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '纯函数是函数式编程的基石。一个函数是"纯"的，当且仅当：(1) 对于相同的输入，总是返回相同的输出；(2) 不产生任何可观察的副作用（不修改外部状态、不做 I/O、不依赖随机数或时间）。引用透明性意味着你可以用函数的返回值替换函数调用本身，而不改变程序行为。'
          : 'Pure functions are the cornerstone of functional programming. A function is "pure" if and only if: (1) it always returns the same output for the same input, and (2) it produces no observable side effects — no mutation of external state, no I/O, no dependency on randomness or time. Referential transparency means you can replace a function call with its return value without changing program behavior.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'JavaScript/TypeScript 中的纯函数' : 'Pure Functions in JavaScript/TypeScript'}</h3>
      <pre style={preStyle}><code>{
        '// Pure: same input → same output, no side effects\n' +
        'const add = (a: number, b: number): number => a + b;\n' +
        'const toUpper = (s: string): string => s.toUpperCase();\n\n' +
        '// Impure: depends on external state\n' +
        'let tax = 0.1;\n' +
        'const calcPrice = (price: number) => price * (1 + tax); // reads external var\n\n' +
        '// Impure: side effect (mutates input)\n' +
        'const addItem = (arr: number[], item: number) => {\n' +
        '  arr.push(item); // mutates original array!\n' +
        '  return arr;\n' +
        '};\n\n' +
        '// Pure alternative: returns new array\n' +
        'const addItemPure = (arr: readonly number[], item: number): number[] => [\n' +
        '  ...arr,\n' +
        '  item,\n' +
        '];'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Haskell 中的纯函数' : 'Pure Functions in Haskell'}</h3>
      <pre style={preStyle}><code>{
        '-- All Haskell functions are pure by default\n' +
        '-- Side effects are tracked by the type system (IO monad)\n\n' +
        'add :: Int -> Int -> Int\n' +
        'add a b = a + b\n\n' +
        'double :: Int -> Int\n' +
        'double = (*2)  -- point-free style\n\n' +
        '-- Referential transparency:\n' +
        '-- double 5 can always be replaced with 10\n' +
        '-- This enables equational reasoning and compiler optimizations'
      }</code></pre>

      {/* Section 2: Immutability */}
      <h2 style={h2Style}>
        {isZh ? '2. 不可变性与持久化数据结构' : '2. Immutability & Persistent Data Structures'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '不可变数据一旦创建就不能被修改。任何"变更"都会产生一个新的副本。这消除了共享可变状态带来的 bug，使并发安全，并简化了撤销/重做功能。持久化数据结构通过结构共享来高效地创建"修改后"的副本，避免了完全复制的性能开销。'
          : 'Immutable data cannot be modified after creation. Any "change" produces a new copy. This eliminates bugs from shared mutable state, makes concurrency safe, and simplifies undo/redo features. Persistent data structures use structural sharing to efficiently create "modified" copies, avoiding the performance cost of full copies.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'TypeScript 中的不可变性' : 'Immutability in TypeScript'}</h3>
      <pre style={preStyle}><code>{
        '// 1. Object.freeze — shallow immutability\n' +
        'const config = Object.freeze({ host: "localhost", port: 3000 });\n' +
        '// config.port = 8080; // TypeError in strict mode\n\n' +
        '// 2. Readonly<T> — compile-time enforcement\n' +
        'interface User {\n' +
        '  readonly id: string;\n' +
        '  readonly name: string;\n' +
        '  readonly email: string;\n' +
        '}\n\n' +
        '// 3. ReadonlyArray and as const\n' +
        'const colors = ["red", "green", "blue"] as const;\n' +
        '// type: readonly ["red", "green", "blue"]\n\n' +
        '// 4. Spread-based updates (pure)\n' +
        'const updateUser = (user: User, name: string): User => ({\n' +
        '  ...user,\n' +
        '  name,\n' +
        '});\n\n' +
        '// 5. Immer — mutable API, immutable result\n' +
        'import { produce } from "immer";\n' +
        'const nextState = produce(state, (draft) => {\n' +
        '  draft.users[0].name = "Alice"; // looks mutable, but produces new object\n' +
        '});'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Haskell/Scala 的默认不可变性' : 'Default Immutability in Haskell/Scala'}</h3>
      <pre style={preStyle}><code>{
        '-- Haskell: all values are immutable by default\n' +
        'let xs = [1, 2, 3]\n' +
        'let ys = 0 : xs          -- [0, 1, 2, 3] — xs is unchanged\n' +
        'let zs = map (*2) xs     -- [2, 4, 6]   — xs is unchanged\n\n' +
        '// Scala: val (immutable) vs var (mutable)\n' +
        'val xs = List(1, 2, 3)          // immutable List\n' +
        'val ys = 0 :: xs                // List(0, 1, 2, 3)\n' +
        'val zs = xs.map(_ * 2)          // List(2, 4, 6)\n\n' +
        '// Scala case classes are immutable by default\n' +
        'case class User(name: String, age: Int)\n' +
        'val alice = User("Alice", 30)\n' +
        'val older = alice.copy(age = 31) // new instance, alice unchanged'
      }</code></pre>

      {/* Section 3: Higher-Order Functions */}
      <h2 style={h2Style}>
        {isZh ? '3. 高阶函数' : '3. Higher-Order Functions'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '高阶函数要么接受函数作为参数，要么返回函数，或者两者兼有。它们是函数式编程中代码复用的主要机制。map、filter 和 reduce 是三个最基本的高阶函数，几乎所有数据转换都可以用它们来表达。'
          : 'Higher-order functions either take functions as arguments, return functions, or both. They are the primary mechanism for code reuse in functional programming. map, filter, and reduce are the three most fundamental higher-order functions — nearly all data transformations can be expressed through them.'}
      </p>

      <pre style={preStyle}><code>{
        '// TypeScript higher-order functions\n' +
        'const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n' +
        '// map: transform each element\n' +
        'const doubled = numbers.map((n) => n * 2);\n' +
        '// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]\n\n' +
        '// filter: select elements matching predicate\n' +
        'const evens = numbers.filter((n) => n % 2 === 0);\n' +
        '// [2, 4, 6, 8, 10]\n\n' +
        '// reduce: fold into single value\n' +
        'const sum = numbers.reduce((acc, n) => acc + n, 0);\n' +
        '// 55\n\n' +
        '// Returning a function (function factory)\n' +
        'const multiplier = (factor: number) => (n: number) => n * factor;\n' +
        'const triple = multiplier(3);\n' +
        'triple(7); // 21\n\n' +
        '// Generic higher-order function\n' +
        'function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {\n' +
        '  return arr.map(fn);\n' +
        '}\n' +
        'const lengths = mapArray(["hello", "world"], (s) => s.length);\n' +
        '// [5, 5]'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Haskell 中的高阶函数' : 'Higher-Order Functions in Haskell'}</h3>
      <pre style={preStyle}><code>{
        '-- Haskell: functions are curried by default\n' +
        'map (*2) [1..10]          -- [2,4,6,8,10,12,14,16,18,20]\n' +
        'filter even [1..10]       -- [2,4,6,8,10]\n' +
        'foldl (+) 0 [1..10]       -- 55\n\n' +
        '-- Function composition with (.)\n' +
        'sumOfDoubledEvens :: [Int] -> Int\n' +
        'sumOfDoubledEvens = foldl (+) 0 . map (*2) . filter even\n\n' +
        '-- ($) eliminates parentheses\n' +
        'print $ map (*2) $ filter even [1..10]\n' +
        '-- equivalent to: print (map (*2) (filter even [1..10]))\n\n' +
        '-- Custom higher-order function\n' +
        'applyTwice :: (a -> a) -> a -> a\n' +
        'applyTwice f x = f (f x)\n' +
        'applyTwice (+3) 10   -- 16\n' +
        'applyTwice (*2) 3    -- 12'
      }</code></pre>

      {/* Section 4: Closures */}
      <h2 style={h2Style}>
        {isZh ? '4. 闭包' : '4. Closures'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '闭包是一个函数加上它引用的外部作用域中的变量。闭包"捕获"了创建时的环境，即使外部函数已经返回，被捕获的变量仍然存活。闭包是柯里化、偏函数应用和模块模式的基础。'
          : 'A closure is a function bundled together with references to variables from its surrounding scope. The closure "captures" the environment at creation time — captured variables remain alive even after the outer function returns. Closures are the foundation of currying, partial application, and the module pattern.'}
      </p>

      <pre style={preStyle}><code>{
        '// Closure: inner function captures variables from outer scope\n' +
        'function makeCounter(initial = 0) {\n' +
        '  let count = initial; // captured by returned functions\n' +
        '  return {\n' +
        '    increment: () => ++count,\n' +
        '    decrement: () => --count,\n' +
        '    getCount: () => count,\n' +
        '  };\n' +
        '}\n' +
        'const counter = makeCounter(10);\n' +
        'counter.increment(); // 11\n' +
        'counter.increment(); // 12\n\n' +
        '// Closure for configuration (curried logger)\n' +
        'const createLogger = (prefix: string) => (msg: string) =>\n' +
        '  console.log(`[\${prefix}] \${msg}`);\n\n' +
        'const dbLog = createLogger("DB");\n' +
        'dbLog("Connected");  // [DB] Connected'
      }</code></pre>

      {/* Section 5: Currying & Partial Application */}
      <h2 style={h2Style}>
        {isZh ? '5. 柯里化与偏函数应用' : '5. Currying & Partial Application'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '柯里化将一个多参数函数转换为一系列单参数函数的链。偏函数应用固定一些参数后返回一个接受剩余参数的新函数。Haskell 中所有函数都是自动柯里化的；在 JavaScript/TypeScript 中需要手动实现或使用库。'
          : 'Currying transforms a multi-argument function into a chain of single-argument functions. Partial application fixes some arguments and returns a new function expecting the remaining ones. In Haskell, all functions are automatically curried; in JavaScript/TypeScript, you need to implement it manually or use a library.'}
      </p>

      <pre style={preStyle}><code>{
        '// Manual currying in TypeScript\n' +
        'const add = (a: number) => (b: number) => a + b;\n' +
        'const add5 = add(5);\n' +
        'add5(3);  // 8\n' +
        'add(2)(3); // 5\n\n' +
        '// Generic curry function (for 2-arg functions)\n' +
        'function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {\n' +
        '  return (a: A) => (b: B) => fn(a, b);\n' +
        '}\n\n' +
        'const curriedMultiply = curry((a: number, b: number) => a * b);\n' +
        'const double = curriedMultiply(2);\n' +
        'double(10); // 20\n\n' +
        '// Partial application — fix first argument\n' +
        'function partial<A, B extends unknown[], C>(\n' +
        '  fn: (a: A, ...rest: B) => C,\n' +
        '  a: A\n' +
        '): (...rest: B) => C {\n' +
        '  return (...rest: B) => fn(a, ...rest);\n' +
        '}\n\n' +
        'const log = (level: string, module: string, msg: string) =>\n' +
        '  `[\${level}][\${module}] \${msg}`;\n\n' +
        'const errorLog = partial(log, "ERROR");\n' +
        'errorLog("DB", "Connection failed");\n' +
        '// [ERROR][DB] Connection failed'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Haskell 的自动柯里化' : 'Haskell\'s Automatic Currying'}</h3>
      <pre style={preStyle}><code>{
        '-- All functions are curried: add :: Int -> Int -> Int = Int -> (Int -> Int)\n' +
        'add a b = a + b\n' +
        'add5 = add 5             -- partial application is trivial\n' +
        'add5 3                   -- 8\n\n' +
        '-- Sections: partially apply operators\n' +
        'map (*2) [1,2,3]         -- [2,4,6]\n' +
        'filter (>0) [-2,0,3,5]   -- [3,5]'
      }</code></pre>

      {/* Section 6: Function Composition */}
      <h2 style={h2Style}>
        {isZh ? '6. 函数组合与管道' : '6. Function Composition & Pipelines'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '函数组合是将两个或多个函数合并成一个新函数，其中一个函数的输出成为下一个函数的输入。compose(f, g)(x) = f(g(x)) 从右到左执行，而 pipe(f, g)(x) = g(f(x)) 从左到右执行。组合让代码像搭积木一样构建复杂变换。'
          : 'Function composition combines two or more functions into a new function where the output of one becomes the input of the next. compose(f, g)(x) = f(g(x)) executes right-to-left, while pipe(f, g)(x) = g(f(x)) executes left-to-right. Composition lets you build complex transformations like building blocks.'}
      </p>

      <pre style={preStyle}><code>{
        '// compose: right-to-left\n' +
        'const compose = <T>(...fns: Array<(arg: T) => T>) =>\n' +
        '  (x: T): T => fns.reduceRight((acc, fn) => fn(acc), x);\n\n' +
        '// pipe: left-to-right (more readable)\n' +
        'const pipe = <T>(...fns: Array<(arg: T) => T>) =>\n' +
        '  (x: T): T => fns.reduce((acc, fn) => fn(acc), x);\n\n' +
        '// Building a text processing pipeline\n' +
        'const trim = (s: string) => s.trim();\n' +
        'const toLower = (s: string) => s.toLowerCase();\n' +
        'const replaceSpaces = (s: string) => s.replace(/\\s+/g, "-");\n\n' +
        'const slugify = pipe(trim, toLower, replaceSpaces);\n\n' +
        'slugify("  Hello World  "); // "hello-world"'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Haskell 中的组合' : 'Composition in Haskell'}</h3>
      <pre style={preStyle}><code>{
        '-- (.) is the composition operator: (f . g) x = f (g x)\n' +
        'sumOfSquares :: [Int] -> Int\n' +
        'sumOfSquares = sum . map (^2)   -- point-free style\n\n' +
        '-- ($) eliminates parentheses: f $ x = f x\n' +
        'main = print $ sumOfSquares [1,2,3,4,5]  -- 55\n\n' +
        '-- Scala: f andThen g (left-to-right) or f compose g (right-to-left)'
      }</code></pre>

      {/* Section 7: Monads */}
      <h2 style={h2Style}>
        {isZh ? '7. Monad：管理副作用与链式计算' : '7. Monads: Managing Side Effects & Chained Computation'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Monad 是一种设计模式，用于将带有上下文（可能为空、可能失败、异步等）的计算进行组合。一个 Monad 需要实现两个操作：unit（也叫 return / of，将值包装进容器）和 flatMap（也叫 bind / chain / >>=，将函数应用到包装值并扁平化结果）。Promise 就是 JavaScript 中最常见的 Monad。'
          : 'A Monad is a design pattern for composing computations that carry context — possibly null, possibly failed, asynchronous, etc. A Monad needs two operations: unit (also called return / of — wrapping a value) and flatMap (also called bind / chain / >>= — applying a function to a wrapped value and flattening the result). Promise is the most common Monad in JavaScript.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Maybe Monad（处理空值）' : 'Maybe Monad (Handling Nulls)'}</h3>
      <pre style={preStyle}><code>{
        '// Maybe monad in TypeScript\n' +
        'type Maybe<T> = { tag: "Just"; value: T } | { tag: "Nothing" };\n\n' +
        'const Just = <T>(value: T): Maybe<T> => ({ tag: "Just", value });\n' +
        'const Nothing = <T>(): Maybe<T> => ({ tag: "Nothing" });\n\n' +
        '// unit: wrap a value\n' +
        'const of = <T>(value: T | null | undefined): Maybe<T> =>\n' +
        '  value != null ? Just(value) : Nothing();\n\n' +
        '// flatMap (bind): chain computations\n' +
        'const flatMap = <T, U>(\n' +
        '  maybe: Maybe<T>,\n' +
        '  fn: (value: T) => Maybe<U>\n' +
        '): Maybe<U> =>\n' +
        '  maybe.tag === "Just" ? fn(maybe.value) : Nothing();\n\n' +
        '// map: apply function without flattening\n' +
        'const map = <T, U>(maybe: Maybe<T>, fn: (value: T) => U): Maybe<U> =>\n' +
        '  flatMap(maybe, (v) => Just(fn(v)));\n\n' +
        '// Usage: safe chained property access\n' +
        'const getCity = (co: { address?: { city?: string } }): Maybe<string> =>\n' +
        '  flatMap(of(co.address), (addr) => of(addr.city));\n\n' +
        'getCity({ address: { city: "NYC" } }); // { tag: "Just", value: "NYC" }\n' +
        'getCity({});                             // { tag: "Nothing" }'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Either Monad（错误处理）' : 'Either Monad (Error Handling)'}</h3>
      <pre style={preStyle}><code>{
        '// Either: Right = success, Left = error\n' +
        'type Either<E, A> =\n' +
        '  | { tag: "Left"; error: E }\n' +
        '  | { tag: "Right"; value: A };\n\n' +
        'const Left = <E, A>(error: E): Either<E, A> => ({ tag: "Left", error });\n' +
        'const Right = <E, A>(value: A): Either<E, A> => ({ tag: "Right", value });\n\n' +
        'const flatMap = <E, A, B>(\n' +
        '  either: Either<E, A>, fn: (a: A) => Either<E, B>\n' +
        '): Either<E, B> =>\n' +
        '  either.tag === "Right" ? fn(either.value) : either;\n\n' +
        '// Railway-oriented programming: chain validations\n' +
        'const parseAge = (s: string): Either<string, number> => {\n' +
        '  const n = parseInt(s, 10);\n' +
        '  return isNaN(n) ? Left("Invalid number") : Right(n);\n' +
        '};\n' +
        'const validateRange = (n: number): Either<string, number> =>\n' +
        '  n >= 0 && n <= 150 ? Right(n) : Left("Out of range");\n\n' +
        'flatMap(parseAge("25"), validateRange); // { tag: "Right", value: 25 }'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Haskell 中的 Monad' : 'Monads in Haskell'}</h3>
      <pre style={preStyle}><code>{
        '-- Monad typeclass: return + (>>=)\n' +
        'safeDivide :: Double -> Double -> Maybe Double\n' +
        'safeDivide _ 0 = Nothing\n' +
        'safeDivide a b = Just (a / b)\n\n' +
        '-- do notation (syntactic sugar for >>=)\n' +
        'result :: Maybe Double\n' +
        'result = do\n' +
        '  x <- Just 100\n' +
        '  y <- safeDivide x 5\n' +
        '  safeDivide y 2         -- Just 10.0\n\n' +
        '-- desugared: Just 100 >>= \\x -> safeDivide x 5 >>= \\y -> safeDivide y 2'
      }</code></pre>

      {/* Section 8: Functors */}
      <h2 style={h2Style}>
        {isZh ? '8. Functor：可映射的容器' : '8. Functors: Mappable Containers'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Functor 是一个实现了 map 操作的容器类型，它可以在不改变容器结构的前提下对内部值进行变换。数组、Maybe、Either、Promise 都是 Functor。Functor 必须遵守两条法则：恒等法则（map(id) === id）和组合法则（map(f . g) === map(f) . map(g)）。'
          : 'A Functor is a container type that implements a map operation, transforming inner values without changing the container\'s structure. Arrays, Maybe, Either, and Promise are all Functors. Functors must obey two laws: identity (map(id) === id) and composition (map(f . g) === map(f) . map(g)).'}
      </p>

      <pre style={preStyle}><code>{
        '// Functor interface in TypeScript\n' +
        'interface Functor<A> {\n' +
        '  map<B>(fn: (a: A) => B): Functor<B>;\n' +
        '}\n\n' +
        '// Box functor: simplest possible container\n' +
        'class Box<A> implements Functor<A> {\n' +
        '  constructor(private value: A) {}\n\n' +
        '  map<B>(fn: (a: A) => B): Box<B> {\n' +
        '    return new Box(fn(this.value));\n' +
        '  }\n\n' +
        '  getValue(): A {\n' +
        '    return this.value;\n' +
        '  }\n' +
        '}\n\n' +
        '// Chain transformations\n' +
        'const result = new Box(5)\n' +
        '  .map((n) => n * 2)      // Box(10)\n' +
        '  .map((n) => n + 1)      // Box(11)\n' +
        '  .map(String)             // Box("11")\n' +
        '  .getValue();             // "11"\n\n' +
        '// Functor laws verification:\n' +
        '// 1. Identity: box.map(x => x) ≡ box\n' +
        '// 2. Composition: box.map(f).map(g) ≡ box.map(x => g(f(x)))'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Haskell 中的 Functor' : 'Functors in Haskell'}</h3>
      <pre style={preStyle}><code>{
        '-- class Functor f where fmap :: (a -> b) -> f a -> f b\n\n' +
        'fmap (*2) (Just 5)      -- Just 10\n' +
        'fmap (*2) Nothing       -- Nothing\n' +
        'fmap (*2) [1,2,3]       -- [2,4,6]\n\n' +
        '-- <$> is infix fmap\n' +
        '(*2) <$> Just 5         -- Just 10\n\n' +
        '-- Custom Functor: derive fmap for your own types\n' +
        'data Tree a = Leaf a | Branch (Tree a) (Tree a)\n' +
        'instance Functor Tree where\n' +
        '  fmap f (Leaf x)     = Leaf (f x)\n' +
        '  fmap f (Branch l r) = Branch (fmap f l) (fmap f r)'
      }</code></pre>

      {/* Section 9: Pattern Matching */}
      <h2 style={h2Style}>
        {isZh ? '9. 模式匹配' : '9. Pattern Matching'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '模式匹配是一种检查值的形状并解构数据的机制。它比 if/else 或 switch 更强大，因为它可以同时进行类型检查、解构和条件判断。Haskell 和 Scala 内置了完整的模式匹配并带有穷尽性检查。TypeScript 通过 discriminated unions 加 switch 可以实现类似效果。'
          : 'Pattern matching is a mechanism for checking a value\'s shape and destructuring data. It is more powerful than if/else or switch because it combines type checking, destructuring, and conditional logic simultaneously. Haskell and Scala have built-in pattern matching with exhaustiveness checking. TypeScript achieves similar results through discriminated unions with switch.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'TypeScript Discriminated Unions' : 'TypeScript Discriminated Unions'}</h3>
      <pre style={preStyle}><code>{
        '// Algebraic Data Type via discriminated union\n' +
        'type Shape =\n' +
        '  | { kind: "circle"; radius: number }\n' +
        '  | { kind: "rectangle"; width: number; height: number }\n' +
        '  | { kind: "triangle"; base: number; height: number };\n\n' +
        '// Exhaustive pattern matching\n' +
        'function area(shape: Shape): number {\n' +
        '  switch (shape.kind) {\n' +
        '    case "circle":\n' +
        '      return Math.PI * shape.radius ** 2;\n' +
        '    case "rectangle":\n' +
        '      return shape.width * shape.height;\n' +
        '    case "triangle":\n' +
        '      return 0.5 * shape.base * shape.height;\n' +
        '    default:\n' +
        '      // Exhaustiveness check: this will error if a case is missed\n' +
        '      const _exhaustive: never = shape;\n' +
        '      return _exhaustive;\n' +
        '  }\n' +
        '}\n\n' +
        '// Result type: another common discriminated union\n' +
        'type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Haskell 的模式匹配' : 'Pattern Matching in Haskell'}</h3>
      <pre style={preStyle}><code>{
        'data Shape = Circle Double | Rectangle Double Double | Triangle Double Double\n\n' +
        'area :: Shape -> Double\n' +
        'area (Circle r)      = pi * r^2\n' +
        'area (Rectangle w h) = w * h\n' +
        'area (Triangle b h)  = 0.5 * b * h\n\n' +
        '-- Guards: conditions within pattern matches\n' +
        'bmi :: Double -> String\n' +
        'bmi x | x < 18.5 = "Underweight" | x < 25.0 = "Normal" | otherwise = "Overweight"\n\n' +
        '-- Nested pattern matching\n' +
        'describe :: Maybe (Either String Int) -> String\n' +
        'describe Nothing          = "Empty"\n' +
        'describe (Just (Left s))  = "Error: " ++ s\n' +
        'describe (Just (Right n)) = "Value: " ++ show n'
      }</code></pre>

      {/* Section 10: Algebraic Data Types */}
      <h2 style={h2Style}>
        {isZh ? '10. 代数数据类型 (ADTs)' : '10. Algebraic Data Types (ADTs)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '代数数据类型通过两种方式组合类型：积类型（AND — 记录/元组，所有字段都存在）和和类型（OR — 标签联合，恰好是其中一种变体）。ADTs 的核心优势在于"让非法状态不可表示" — 通过类型系统强制约束，使运行时错误在编译期就被捕获。'
          : 'Algebraic data types combine types in two ways: product types (AND — records/tuples, all fields present) and sum types (OR — tagged unions, exactly one variant). The key advantage of ADTs is "making illegal states unrepresentable" — using the type system to enforce constraints that catch runtime errors at compile time.'}
      </p>

      <pre style={preStyle}><code>{
        '// Product type: all fields present (AND)\n' +
        'type User = {\n' +
        '  id: string;\n' +
        '  name: string;\n' +
        '  email: string;\n' +
        '};\n\n' +
        '// Sum type: exactly one variant (OR)\n' +
        'type LoadingState<T> =\n' +
        '  | { status: "idle" }\n' +
        '  | { status: "loading" }\n' +
        '  | { status: "success"; data: T }\n' +
        '  | { status: "error"; error: Error };\n\n' +
        '// Making illegal states unrepresentable\n' +
        '// BAD: both data and error could be set simultaneously\n' +
        'type BadState = {\n' +
        '  loading: boolean;\n' +
        '  data: string | null;\n' +
        '  error: Error | null;\n' +
        '};\n\n' +
        '// GOOD: exactly one state at a time\n' +
        'function renderState<T>(state: LoadingState<T>): string {\n' +
        '  switch (state.status) {\n' +
        '    case "idle":    return "Ready";\n' +
        '    case "loading": return "Loading...";\n' +
        '    case "success": return `Data: \${String(state.data)}`;\n' +
        '    case "error":   return `Error: \${state.error.message}`;\n' +
        '  }\n' +
        '}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Haskell ADTs' : 'Haskell ADTs'}</h3>
      <pre style={preStyle}><code>{
        '-- Sum type (OR)\n' +
        'data Color = Red | Green | Blue\n\n' +
        '-- Product type (AND)\n' +
        'data Point = Point { x :: Double, y :: Double }\n\n' +
        '-- Parameterized ADTs\n' +
        'data Maybe a = Nothing | Just a\n' +
        'data Either a b = Left a | Right b\n\n' +
        '-- Recursive ADT (binary tree)\n' +
        'data Tree a = Empty | Node a (Tree a) (Tree a)\n\n' +
        '-- Pattern match on ADTs\n' +
        'depth :: Tree a -> Int\n' +
        'depth Empty          = 0\n' +
        'depth (Node _ l r)   = 1 + max (depth l) (depth r)'
      }</code></pre>

      {/* Section 11: FP in Practice */}
      <h2 style={h2Style}>
        {isZh ? '11. 实用 FP 模式与库' : '11. Practical FP Patterns & Libraries'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '在真实项目中，你可能不会从头实现 Maybe 和 Either。以下是 JavaScript/TypeScript 生态中主流的函数式编程库，它们提供了经过实战检验的函数式工具。'
          : 'In real projects, you likely will not implement Maybe and Either from scratch. Here are the mainstream functional programming libraries in the JavaScript/TypeScript ecosystem that provide battle-tested functional utilities.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '库' : 'Library'}</th>
            <th style={thStyle}>{isZh ? '特点' : 'Features'}</th>
            <th style={thStyle}>{isZh ? '适合场景' : 'Best For'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>fp-ts</strong></td>
            <td style={tdStyle}>{isZh ? 'Option, Either, Task, IO, pipe, 类型类' : 'Option, Either, Task, IO, pipe, type classes'}</td>
            <td style={tdStyle}>{isZh ? 'Haskell 风格的严格 FP' : 'Haskell-style strict FP'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Effect-TS</strong></td>
            <td style={tdStyle}>{isZh ? 'Effect 系统, 依赖注入, 并发, 流处理' : 'Effect system, DI, concurrency, streams'}</td>
            <td style={tdStyle}>{isZh ? '大型应用的副作用管理' : 'Side-effect management in large apps'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Ramda</strong></td>
            <td style={tdStyle}>{isZh ? '自动柯里化, 数据在后, 镜头 (lenses)' : 'Auto-curry, data-last, lenses'}</td>
            <td style={tdStyle}>{isZh ? '数据转换管道' : 'Data transformation pipelines'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Lodash/fp</strong></td>
            <td style={tdStyle}>{isZh ? 'Lodash 的 FP 版本, 自动柯里化, 不可变' : 'FP build of Lodash, auto-curried, immutable'}</td>
            <td style={tdStyle}>{isZh ? '已用 Lodash 的项目迁移' : 'Projects already using Lodash'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Immer</strong></td>
            <td style={tdStyle}>{isZh ? '结构共享, 可变 API → 不可变结果' : 'Structural sharing, mutable API → immutable result'}</td>
            <td style={tdStyle}>{isZh ? 'React 状态管理' : 'React state management'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Zod</strong></td>
            <td style={tdStyle}>{isZh ? '运行时类型验证, parse-don\'t-validate' : 'Runtime validation, parse-don\'t-validate'}</td>
            <td style={tdStyle}>{isZh ? 'API 边界验证' : 'API boundary validation'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'fp-ts 实战示例' : 'fp-ts in Practice'}</h3>
      <pre style={preStyle}><code>{
        'import { pipe } from "fp-ts/function";\n' +
        'import * as O from "fp-ts/Option";\n' +
        'import * as E from "fp-ts/Either";\n\n' +
        '// Option: safe property access\n' +
        'const getCity = (user: User): O.Option<string> =>\n' +
        '  pipe(\n' +
        '    O.fromNullable(user.address),\n' +
        '    O.flatMap((addr) => O.fromNullable(addr.city))\n' +
        '  );\n\n' +
        '// Either: validation pipeline\n' +
        'const validateInput = (input: string) =>\n' +
        '  pipe(\n' +
        '    E.right(input),\n' +
        '    E.flatMap((s) => s.length >= 5 ? E.right(s) : E.left("Too short")),\n' +
        '    E.flatMap((s) => s.includes("@") ? E.right(s) : E.left("Invalid email"))\n' +
        '  );'
      }</code></pre>

      {/* Section 12: Comparison Table */}
      <h2 style={h2Style}>
        {isZh ? '12. 语言对比：TypeScript vs Haskell vs Scala' : '12. Language Comparison: TypeScript vs Haskell vs Scala'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '下表对比了三种语言在函数式编程支持方面的差异。Haskell 是纯函数式语言，Scala 是多范式 JVM 语言，TypeScript 是多范式但偏向 FP 友好的 JavaScript 超集。'
          : 'The table below compares how three languages support functional programming. Haskell is a pure functional language, Scala is a multi-paradigm JVM language, and TypeScript is a multi-paradigm JavaScript superset with good FP support.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>TypeScript</th>
            <th style={thStyle}>Haskell</th>
            <th style={thStyle}>Scala</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '纯函数式' : 'Pure FP'}</td>
            <td style={tdStyle}>{isZh ? '约定，不强制' : 'Convention, not enforced'}</td>
            <td style={tdStyle}>{isZh ? '强制（IO monad）' : 'Enforced (IO monad)'}</td>
            <td style={tdStyle}>{isZh ? '可选，不强制' : 'Optional, not enforced'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '不可变性' : 'Immutability'}</td>
            <td style={tdStyle}>Readonly, as const</td>
            <td style={tdStyle}>{isZh ? '默认不可变' : 'Default immutable'}</td>
            <td style={tdStyle}>val, case class</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '类型推断' : 'Type Inference'}</td>
            <td style={tdStyle}>{isZh ? '局部推断' : 'Local inference'}</td>
            <td style={tdStyle}>Hindley-Milner</td>
            <td style={tdStyle}>{isZh ? '局部 + 高级推断' : 'Local + advanced'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '模式匹配' : 'Pattern Matching'}</td>
            <td style={tdStyle}>switch + never</td>
            <td style={tdStyle}>{isZh ? '内置 + 穷尽检查' : 'Built-in + exhaustive'}</td>
            <td style={tdStyle}>{isZh ? 'match 表达式' : 'match expression'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '柯里化' : 'Currying'}</td>
            <td style={tdStyle}>{isZh ? '手动或使用库' : 'Manual or library'}</td>
            <td style={tdStyle}>{isZh ? '默认自动柯里化' : 'Auto-curried by default'}</td>
            <td style={tdStyle}>{isZh ? '多参数列表' : 'Multiple param lists'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '类型类' : 'Type Classes'}</td>
            <td style={tdStyle}>{isZh ? '无（用接口模拟）' : 'None (interfaces)'}</td>
            <td style={tdStyle}>{isZh ? '一等支持' : 'First-class support'}</td>
            <td style={tdStyle}>{isZh ? 'given/using (Scala 3)' : 'given/using (Scala 3)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>ADTs</td>
            <td style={tdStyle}>Discriminated unions</td>
            <td style={tdStyle}>data + |</td>
            <td style={tdStyle}>sealed trait + case class</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '学习曲线' : 'Learning Curve'}</td>
            <td style={tdStyle}>{isZh ? '低' : 'Low'}</td>
            <td style={tdStyle}>{isZh ? '高' : 'High'}</td>
            <td style={tdStyle}>{isZh ? '中等' : 'Medium'}</td>
          </tr>
        </tbody>
      </table>

      {/* Section 13: Advanced Patterns */}
      <h2 style={h2Style}>
        {isZh ? '13. 高级模式：Lens、Optics 与 Transducers' : '13. Advanced Patterns: Lenses, Optics & Transducers'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Lens（透镜）是一种可组合的 getter/setter 抽象，用于在不可变嵌套数据结构中优雅地读取和更新深层字段。Optics 是更广泛的概念，包括 Prism（处理和类型）、Traversal（遍历多个目标）等。Transducer 是可组合的转换，独立于数据源。'
          : 'A Lens is a composable getter/setter abstraction for elegantly reading and updating deep fields in immutable nested structures. Optics is the broader concept, including Prisms (for sum types), Traversals (for multiple targets), and more. Transducers are composable transformations independent of the data source.'}
      </p>

      <pre style={preStyle}><code>{
        '// Lens: composable getter/setter for nested immutable data\n' +
        'type Lens<S, A> = {\n' +
        '  get: (s: S) => A;\n' +
        '  set: (a: A) => (s: S) => S;\n' +
        '};\n\n' +
        'const lensProp = <S, K extends keyof S>(key: K): Lens<S, S[K]> => ({\n' +
        '  get: (s) => s[key],\n' +
        '  set: (a) => (s) => ({ ...s, [key]: a }),\n' +
        '});\n\n' +
        '// Compose lenses for deep nested access\n' +
        'const composeLens = <A, B, C>(\n' +
        '  ab: Lens<A, B>, bc: Lens<B, C>\n' +
        '): Lens<A, C> => ({\n' +
        '  get: (a) => bc.get(ab.get(a)),\n' +
        '  set: (c) => (a) => ab.set(bc.set(c)(ab.get(a)))(a),\n' +
        '});\n\n' +
        '// Usage: update deeply nested field immutably\n' +
        'const addressLens = lensProp<Company, "address">("address");\n' +
        'const cityLens = lensProp<Company["address"], "city">("city");\n' +
        'const companyCityLens = composeLens(addressLens, cityLens);\n\n' +
        'companyCityLens.get(company);           // "NYC"\n' +
        'companyCityLens.set("LA")(company);     // { ...company, address: { ...city: "LA" } }'
      }</code></pre>

      {/* Section 14: Recursion & Tail Calls */}
      <h2 style={h2Style}>
        {isZh ? '14. 递归与尾调用优化' : '14. Recursion & Tail Call Optimization'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '函数式编程用递归替代循环。尾递归（递归调用是函数的最后一个操作）可以被编译器优化为常量栈空间。Haskell 和 Scala 支持尾调用优化；JavaScript 仅 Safari 引擎支持 TCO。在 JS/TS 中，可使用 trampoline 模式模拟 TCO。'
          : 'Functional programming replaces loops with recursion. Tail recursion (where the recursive call is the last operation) can be optimized by the compiler to use constant stack space. Haskell and Scala support tail call optimization; JavaScript only supports TCO in Safari. In JS/TS, you can use the trampoline pattern to simulate TCO.'}
      </p>

      <pre style={preStyle}><code>{
        '// Naive recursion: O(n) stack space — can overflow\n' +
        'const factorial = (n: number): number =>\n' +
        '  n <= 1 ? 1 : n * factorial(n - 1);\n\n' +
        '// Tail-recursive version: last operation is the recursive call\n' +
        'const factorialTail = (n: number, acc: number = 1): number =>\n' +
        '  n <= 1 ? acc : factorialTail(n - 1, n * acc);\n\n' +
        '// Trampoline: simulate TCO in JS environments without it\n' +
        'type Thunk<T> = T | (() => Thunk<T>);\n\n' +
        'function trampoline<T>(fn: Thunk<T>): T {\n' +
        '  let result = fn;\n' +
        '  while (typeof result === "function") {\n' +
        '    result = (result as () => Thunk<T>)();\n' +
        '  }\n' +
        '  return result;\n' +
        '}\n\n' +
        'const factTrampoline = (n: number, acc = 1): Thunk<number> =>\n' +
        '  n <= 1 ? acc : () => factTrampoline(n - 1, n * acc);\n\n' +
        'trampoline(factTrampoline(100000)); // Works without stack overflow!'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Haskell/Scala 的递归' : 'Recursion in Haskell/Scala'}</h3>
      <pre style={preStyle}><code>{
        '-- Haskell: tail-recursive with accumulator\n' +
        'factTail :: Integer -> Integer\n' +
        'factTail n = go n 1\n' +
        '  where go 0 acc = acc\n' +
        '        go n acc = go (n-1) (n*acc)\n\n' +
        '// Scala: @tailrec ensures compiler optimizes tail calls\n' +
        'import scala.annotation.tailrec\n' +
        '@tailrec\n' +
        'def factorial(n: Long, acc: Long = 1): Long =\n' +
        '  if (n <= 1) acc else factorial(n - 1, n * acc)'
      }</code></pre>

      {/* Section 15: FP + React */}
      <h2 style={h2Style}>
        {isZh ? '15. 函数式编程与 React' : '15. Functional Programming & React'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'React 的核心设计深受函数式编程影响：组件是纯函数（props → JSX），状态是不可变的（通过 setState/useReducer 更新），Hooks 是高阶函数模式，React 18/19 的 Suspense 和 Server Components 体现了 Effect 系统的思想。'
          : 'React\'s core design is deeply influenced by functional programming: components are pure functions (props to JSX), state is immutable (updated via setState/useReducer), Hooks are higher-order function patterns, and React 18/19\'s Suspense and Server Components embody Effect system ideas.'}
      </p>

      <pre style={preStyle}><code>{
        '// React: FP patterns everywhere\n\n' +
        '// 1. Pure component: function from props to UI\n' +
        'const Greeting = ({ name }: { name: string }) => <h1>Hello, {name}!</h1>;\n\n' +
        '// 2. Reducer: pure function (state, action) => newState\n' +
        'type Action = { type: "inc" } | { type: "dec" } | { type: "reset" };\n' +
        'const reducer = (state: { count: number }, action: Action) => {\n' +
        '  switch (action.type) {\n' +
        '    case "inc":   return { count: state.count + 1 };\n' +
        '    case "dec":   return { count: state.count - 1 };\n' +
        '    case "reset": return { count: 0 };\n' +
        '  }\n' +
        '};\n\n' +
        '// 3. useMemo: memoize pure computation\n' +
        'const result = useMemo(() => expensiveCompute(data), [data]);\n\n' +
        '// 4. Immer: mutable API → immutable result\n' +
        'import { produce } from "immer";\n' +
        'const next = produce(state, (draft) => {\n' +
        '  draft.todos.push(newTodo); // looks mutable, produces new object\n' +
        '});'
      }</code></pre>

      {/* Section 16: Common Pitfalls */}
      <h2 style={h2Style}>
        {isZh ? '16. 常见陷阱与最佳实践' : '16. Common Pitfalls & Best Practices'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px solid #fecaca' }}>
          <strong style={{ color: '#dc2626', display: 'block', marginBottom: '8px' }}>
            {isZh ? '常见错误' : 'Common Mistakes'}
          </strong>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#991b1b', lineHeight: '1.9', fontSize: '0.9rem' }}>
            <li>{isZh ? '在 map/filter 回调中产生副作用' : 'Side effects inside map/filter callbacks'}</li>
            <li>{isZh ? '忘记 Object.freeze 是浅冻结' : 'Forgetting Object.freeze is shallow'}</li>
            <li>{isZh ? '过度柯里化导致可读性下降' : 'Over-currying hurting readability'}</li>
            <li>{isZh ? '无界递归导致栈溢出' : 'Unbounded recursion causing stack overflow'}</li>
            <li>{isZh ? '滥用 point-free 风格让代码难以理解' : 'Abusing point-free style making code cryptic'}</li>
            <li>{isZh ? '在性能敏感的循环中使用 reduce 替代 for' : 'Using reduce over for in performance-critical loops'}</li>
          </ul>
        </div>
        <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
          <strong style={{ color: '#16a34a', display: 'block', marginBottom: '8px' }}>
            {isZh ? '最佳实践' : 'Best Practices'}
          </strong>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', lineHeight: '1.9', fontSize: '0.9rem' }}>
            <li>{isZh ? '优先使用 pipe 而非嵌套函数调用' : 'Prefer pipe over nested function calls'}</li>
            <li>{isZh ? '用 TypeScript strict 模式确保类型安全' : 'Use TypeScript strict mode for type safety'}</li>
            <li>{isZh ? '小函数 + 组合 > 大函数' : 'Small functions + composition > large functions'}</li>
            <li>{isZh ? '用 ADTs 建模业务逻辑，让非法状态不可表示' : 'Model business logic with ADTs, make illegal states unrepresentable'}</li>
            <li>{isZh ? '在团队项目中渐进式引入 FP，不要全盘重写' : 'Adopt FP incrementally in team projects, avoid full rewrites'}</li>
            <li>{isZh ? '为纯函数编写属性测试（property-based testing）' : 'Write property-based tests for pure functions'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '函数式编程不仅仅是一种编程范式，更是一种思维方式。它教会我们如何通过纯函数、不可变数据和可组合的抽象来构建可靠、可维护的软件。你不需要切换到 Haskell 来享受 FP 的好处 — TypeScript 搭配 fp-ts 或 Effect-TS 已经可以在日常开发中应用大部分 FP 概念。从纯函数和不可变性开始，逐步引入 Maybe/Either 进行错误处理，用 pipe 和 compose 构建数据管道，最终你会发现代码变得更加可预测、可测试和可组合。'
          : 'Functional programming is not just a programming paradigm — it is a way of thinking. It teaches us how to build reliable, maintainable software through pure functions, immutable data, and composable abstractions. You do not need to switch to Haskell to enjoy FP benefits — TypeScript with fp-ts or Effect-TS already lets you apply most FP concepts in daily development. Start with pure functions and immutability, gradually introduce Maybe/Either for error handling, build data pipelines with pipe and compose, and you will find your code becomes more predictable, testable, and composable.'}
      </p>

      {/* FAQ */}
      <h2 style={h2Style}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqSchema.mainEntity.map((faq, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px 24px',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: '0 0 10px 0' }}>
              {faq.name}
            </h3>
            <p style={{ color: '#475569', lineHeight: '1.7', margin: '0' }}>
              {faq.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
