'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'TypeScript Advanced Guide: Generics, Conditional Types, Mapped Types, Decorators, and Expert Patterns — 2026',
    description:
      'Master advanced TypeScript: generic constraints, infer keyword, mapped types, template literal types, discriminated unions, utility types deep dive, decorators (Stage 3 vs experimental), module augmentation, type narrowing, function overloads, covariance/contravariance, satisfies operator, and strict mode settings.',
  },
  zh: {
    title: 'TypeScript 高级指南：泛型、条件类型、映射类型、装饰器与专家模式 — 2026',
    description:
      '深入掌握 TypeScript 高级特性：泛型约束、infer 关键字、映射类型、模板字面量类型、可辨识联合、工具类型详解、装饰器（Stage 3 vs experimental）、模块增强、类型收窄、函数重载、协变/逆变、satisfies 运算符与严格模式配置。',
  },
};

export default function TypescriptAdvancedGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the infer keyword in TypeScript conditional types?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The infer keyword captures a type variable from within a conditional type pattern. It can only appear in the extends clause of a conditional type. For example: type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never extracts R — the actual return type — when T is a function. TypeScript\'s built-in ReturnType, Parameters, InstanceType, and Awaited all use infer internally. When infer appears in covariant positions multiple times, TypeScript infers a union; in contravariant positions (function parameters), it infers an intersection.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Partial, Required, Pick, Omit, and Record utility types?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Partial<T> makes all properties optional. Required<T> makes all properties required (removes ?). Pick<T, K> creates a type with only the listed keys K from T. Omit<T, K> creates a type without the listed keys K. Record<K, V> creates an object type with keys K and values V. All are implemented as mapped types internally. Partial and Required use modifier syntax: [K in keyof T]?: T[K] and [K in keyof T]-?: T[K] respectively. Combining them covers most API modeling needs: Omit<User, "id"> for create requests, Partial<Omit<User, "id">> for update requests.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do template literal types work in TypeScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Template literal types (TypeScript 4.1+) construct new string types using backtick syntax at the type level. They distribute over union members automatically: type EventName = `on${Capitalize<"click" | "focus">}` produces "onClick" | "onFocus". Built-in intrinsic string types include Uppercase<S>, Lowercase<S>, Capitalize<S>, and Uncapitalize<S>. Template literal types are used for strongly-typed CSS values, API route patterns, event handler names, and discriminated union string prefixes. They can also extract parts of strings via conditional types with infer.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are discriminated unions and exhaustive checks in TypeScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A discriminated union is a union of types that share a common literal property (the discriminant). For example: type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number }. TypeScript narrows the type automatically when you check the discriminant in a switch/if. Exhaustive checks ensure all union members are handled: add a default case that assigns the value to a never variable — if you miss a case, TypeScript reports an assignment error. The pattern assertNever(x: never): never { throw new Error(...) } is the standard helper.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between TypeScript experimental decorators and TC39 Stage 3 decorators?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Legacy experimentalDecorators (enabled via "experimentalDecorators": true in tsconfig) use an older API: method decorators receive (target, propertyKey, descriptor). TC39 Stage 3 decorators (TypeScript 5.0+, no tsconfig flag needed) use a new API: decorators receive (value, context) where context has kind, name, metadata, and addInitializer. They are incompatible and cannot be mixed in the same file. NestJS and Angular still use legacy decorators; TC39 decorators also introduce the "accessor" keyword for auto-accessor fields. New projects should use TC39 decorators where frameworks permit.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the satisfies operator in TypeScript 4.9+?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The satisfies operator (TypeScript 4.9) validates that an expression matches a type without widening the inferred type. Syntax: const value = expression satisfies Type. Unlike a type annotation (const value: Type = expression), satisfies keeps the narrow inferred type while still checking compatibility. Example: const palette = { red: [255,0,0], green: "#00ff00" } satisfies Record<string, string | number[]>. With an annotation, palette.red is string | number[]; with satisfies, palette.red remains number[] (the actual inferred type). This is ideal for config objects where you want both validation and precise type inference.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is noUncheckedIndexedAccess and why should I enable it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'noUncheckedIndexedAccess is a TypeScript compiler option that adds undefined to the type of array index access and string index signature access. Without it, items[0] has type string when items is string[], which is wrong if the array is empty. With it, items[0] has type string | undefined, forcing you to handle the undefined case. This catches a large class of runtime errors at compile time. It is not included in strict: true, so you must enable it explicitly. It is one of the most impactful strictness settings available beyond the standard strict bundle.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does covariance and contravariance work in TypeScript function types?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Variance describes how subtype relationships flow through generic types. TypeScript function return types are covariant: if Dog extends Animal, then () => Dog is assignable to () => Animal. Function parameter types are contravariant (under strictFunctionTypes): (x: Animal) => void is assignable to (x: Dog) => void, not the other way around. Method syntax (method(x: T)) is bivariant for historical reasons. TypeScript 4.7 introduced explicit variance annotations with in and out: out T marks covariant positions, in T marks contravariant, in out T marks invariant. These annotations improve type-checking accuracy and compiler performance.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/typescript-advanced-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', margin: '0 0 0.5rem 0' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          Advanced TypeScript is a type-level programming language layered on top of JavaScript. Master{' '}
          <strong>generic constraints</strong> and the <strong>infer keyword</strong> for extracting
          types; use <strong>mapped types</strong> to transform object shapes; apply{' '}
          <strong>discriminated unions</strong> for exhaustive domain modeling; leverage the{' '}
          <strong>satisfies operator</strong> for type validation without widening; enable{' '}
          <strong>noUncheckedIndexedAccess</strong> and all strict mode settings; understand{' '}
          <strong>covariance/contravariance</strong> to write correct higher-order function types.
          Use our{' '}
          <Link href={'/' + lang + '/tools/typescript-to-javascript'} style={{ color: '#0284c7' }}>
            TypeScript to JavaScript converter
          </Link>{' '}
          to inspect compiled output.
        </p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b', margin: '0 0 0.75rem 0' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li><code>infer</code> captures type variables inside conditional types — the basis of ReturnType, Parameters, Awaited</li>
          <li>Mapped types with modifier syntax (<code>+?</code>, <code>-?</code>, <code>+readonly</code>) implement Partial, Required, Readonly</li>
          <li>Template literal types distribute over unions automatically, enabling typed event/route patterns</li>
          <li>Discriminated unions + exhaustive <code>never</code> checks eliminate unhandled-case bugs at compile time</li>
          <li>The <code>satisfies</code> operator validates against a type without losing the narrow inferred type</li>
          <li>TC39 Stage 3 decorators (TS 5.0+) need no flag; legacy <code>experimentalDecorators</code> is still required by NestJS/Angular</li>
          <li><code>noUncheckedIndexedAccess</code> adds <code>| undefined</code> to array/index-signature access — enable it on every project</li>
          <li>Function parameters are contravariant; return types are covariant (under <code>strictFunctionTypes</code>)</li>
        </ul>
      </div>

      {/* Section 1: Generics and Constraints */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Generic Types and Constraints
      </h2>
      <p>
        Generics are TypeScript&#39;s mechanism for writing reusable, type-safe code that works across multiple
        types. A generic <em>constraint</em> (<code>T extends Something</code>) restricts which types are valid
        for a type parameter while granting access to the constrained properties inside the function body.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Basic constraint: T must have a .length property
function logLength<T extends { length: number }>(value: T): T {
  console.log(value.length);
  return value;
}
logLength('hello');       // string has .length ✓
logLength([1, 2, 3]);     // array has .length ✓
logLength({ length: 5 }); // object with length ✓
// logLength(42);         // number has no .length ✗

// keyof constraint: K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { name: 'Alice', age: 30 };
const name = getProperty(user, 'name'); // string
const age  = getProperty(user, 'age');  // number
// getProperty(user, 'email');           // compile error ✗

// Multiple constraints via intersection
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}
const merged = merge({ id: 1 }, { name: 'Alice' });
// merged: { id: number } & { name: string }

// Default type parameters (TypeScript 2.3+)
interface Container<T = string> {
  value: T;
  label: string;
}
const c1: Container = { value: 'hello', label: 'greeting' }; // T = string
const c2: Container<number> = { value: 42, label: 'count' }; // T = number

// Conditional default: infer from usage
function createPair<T, U = T>(first: T, second: U): [T, U] {
  return [first, second];
}
createPair(1, 2);         // [number, number]
createPair(1, 'hello');   // [number, string]`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Variance Annotations: in, out, in out
      </h3>
      <p>
        TypeScript 4.7 introduced explicit variance markers for type parameters. Use <code>out T</code> for
        covariant positions (producer/return), <code>in T</code> for contravariant positions (consumer/param),
        and <code>in out T</code> for invariant (read and write). These annotations improve both type-checking
        accuracy and compiler performance for large codebases.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// out = covariant (produces T, can be widened)
interface Producer<out T> {
  produce(): T;
}

// in = contravariant (consumes T, can be narrowed)
interface Consumer<in T> {
  consume(value: T): void;
}

// in out = invariant (reads and writes T, no variance)
interface ReadWrite<in out T> {
  get(): T;
  set(value: T): void;
}

// Practical example
class Animal { breathe() {} }
class Dog extends Animal { bark() {} }

const dogProducer: Producer<Dog> = { produce: () => new Dog() };
const animalProducer: Producer<Animal> = dogProducer; // OK — covariant

const animalConsumer: Consumer<Animal> = { consume: (a) => a.breathe() };
const dogConsumer: Consumer<Dog> = animalConsumer; // OK — contravariant`}</code></pre>

      {/* Section 2: Conditional Types and infer */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Conditional Types and the infer Keyword
      </h2>
      <p>
        Conditional types are type-level <code>if/else</code> expressions evaluated at compile time.
        Syntax: <code>T extends U ? X : Y</code>. When <code>T</code> is a union, conditional types
        <em>distribute</em> over each union member automatically. The <strong>infer</strong> keyword
        captures a type variable from within the extends pattern.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Basic conditional type
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;  // true
type B = IsString<number>;  // false
type C = IsString<'hello'>; // true (literal extends string)

// Distribution over unions
type Distribute<T> = T extends string ? 'S' : 'N';
type D = Distribute<string | number>; // 'S' | 'N'
// (string extends string ? 'S' : 'N') | (number extends string ? 'S' : 'N')

// Disable distribution with brackets
type NoDistribute<T> = [T] extends [string] ? 'S' : 'N';
type E = NoDistribute<string | number>; // 'N' (the union is not string)

// infer: extract return type
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type R1 = MyReturnType<() => number>;        // number
type R2 = MyReturnType<(x: string) => void>; // void
type R3 = MyReturnType<string>;              // never

// infer: extract parameter types
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;
type P1 = MyParameters<(a: string, b: number) => void>; // [string, number]

// infer: extract first parameter
type FirstParam<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;
type FP = FirstParam<(x: number, y: string) => void>; // number

// infer: extract array element type
type ElementType<T> = T extends (infer E)[] ? E : T;
type ET1 = ElementType<string[]>;  // string
type ET2 = ElementType<number>;    // number

// infer: unwrap Promise (like Awaited<T>)
type Unwrap<T> = T extends Promise<infer U> ? Unwrap<U> : T;
type W1 = Unwrap<Promise<Promise<number>>>;  // number

// infer: extract object property types
type ValueOf<T, K extends keyof T = keyof T> =
  T extends Record<K, infer V> ? V : never;`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Built-in Utility Types That Use infer
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// ReturnType<T>
type RT = ReturnType<typeof JSON.parse>; // any

// Parameters<T>
type PT = Parameters<typeof parseInt>; // [string: string, radix?: number]

// ConstructorParameters<T>
type CP = ConstructorParameters<typeof Date>; // string | number | Date | ...

// InstanceType<T>
type IT = InstanceType<typeof Map>; // Map<any, any>

// Awaited<T> (TypeScript 4.5+) — recursively unwraps Promises
type AW = Awaited<Promise<Promise<string>>>;   // string
type AW2 = Awaited<ReturnType<typeof fetch>>;  // Response

// Combining ReturnType + Awaited for async functions
async function fetchUser(id: string) {
  return { id, name: 'Alice' };
}
type UserType = Awaited<ReturnType<typeof fetchUser>>; // { id: string; name: string }

// infer in covariant vs contravariant position
// Covariant (return types) → union of inferred types
type Covariant<T> = T extends { a: infer U; b: infer U } ? U : never;
type C1 = Covariant<{ a: string; b: number }>; // string | number

// Contravariant (parameter types) → intersection of inferred types
type Contravariant<T> = T extends {
  fn1: (a: infer U) => void;
  fn2: (a: infer U) => void;
} ? U : never;
type C2 = Contravariant<{
  fn1: (a: string) => void;
  fn2: (a: number) => void;
}>; // string & number = never`}</code></pre>

      {/* Section 3: Mapped Types */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Mapped Types: Partial, Required, Pick, Omit, Record and Beyond
      </h2>
      <p>
        Mapped types iterate over the keys of an existing type and transform each property. The syntax{' '}
        <code>{'{ [K in keyof T]: NewType }'}</code> creates a new type by mapping over keys. Modifier
        syntax (<code>+?</code>, <code>-?</code>, <code>+readonly</code>, <code>-readonly</code>) adds or
        removes optional/readonly modifiers. The <code>as</code> clause (TypeScript 4.1+) enables key
        remapping and filtering.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Understanding the built-in implementations
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyRequired<T> = { [K in keyof T]-?: T[K] };         // -? removes optional
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type MyMutable<T> = { -readonly [K in keyof T]: T[K] };  // -readonly removes readonly

type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
type MyOmit<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>;
type MyRecord<K extends keyof any, V> = { [P in K]: V };

// Key remapping with 'as' clause (TypeScript 4.1+)
// Remove keys where value is never/undefined
type FilterNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

// Prefix all keys
type Prefixed<T, P extends string> = {
  [K in keyof T as \`\${P}\${string & K}\`]: T[K];
};
type PrefixedUser = Prefixed<{ name: string; age: number }, 'user_'>;
// { user_name: string; user_age: number }

// Create getter/setter pairs from an object type
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
type Setters<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

interface UserFields {
  name: string;
  age: number;
  email: string;
}
type UserGetters = Getters<UserFields>;
// { getName: () => string; getAge: () => number; getEmail: () => string }

// Deep variants
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[K]>
    : T[K];
};

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};

// Nullable: make all properties nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Extract only optional keys
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Extract only required keys
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Mapped Types for API Modeling
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

// Create request: omit server-generated fields
type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// Update request: all editable fields optional, id required
type UpdateUserRequest = Pick<User, 'id'> &
  Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

// Response: ensure specific fields always present
type UserResponse = Required<Pick<User, 'id' | 'email' | 'name' | 'role'>>;

// Paginated wrapper
interface Page<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
type UserPage = Page<UserResponse>;

// Make specific keys required in an otherwise optional type
type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

type Config = {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
};
// Production config requires apiKey and baseUrl
type ProductionConfig = RequireKeys<Config, 'apiKey' | 'baseUrl'>;`}</code></pre>

      {/* Section 4: Template Literal Types */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Template Literal Types
      </h2>
      <p>
        Template literal types (TypeScript 4.1) construct new string types using backtick template syntax at
        the type level. They distribute over union members to produce all combinations. Combined with intrinsic
        string manipulation types (<code>Uppercase</code>, <code>Lowercase</code>, <code>Capitalize</code>,{' '}
        <code>Uncapitalize</code>), they enable expressive string-pattern typing.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Basic template literal type
type Greeting = \`Hello, \${string}!\`;
const g: Greeting = 'Hello, World!'; // OK

// Distribution: produces all combinations
type Color = 'red' | 'green' | 'blue';
type Size = 'sm' | 'md' | 'lg';
type ClassName = \`\${Color}-\${Size}\`;
// "red-sm" | "red-md" | "red-lg" | "green-sm" | ... (9 types)

// Intrinsic string types
type Shout = Uppercase<'hello'>;        // "HELLO"
type Whisper = Lowercase<'WORLD'>;       // "world"
type TitleCase = Capitalize<'hello'>;    // "Hello"
type UnCap = Uncapitalize<'Hello'>;      // "hello"

// Event handler naming pattern
type EventNames = 'click' | 'focus' | 'blur' | 'change';
type HandlerNames = \`on\${Capitalize<EventNames>}\`;
// "onClick" | "onFocus" | "onBlur" | "onChange"

// Typed CSS units
type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'vh' | 'vw';
type CSSLength = \`\${number}\${CSSUnit}\`;
function setWidth(el: HTMLElement, width: CSSLength) {
  el.style.width = width;
}
setWidth(document.body, '100%');   // OK
setWidth(document.body, '1.5rem'); // OK
// setWidth(document.body, '100'); // Error: no unit

// API route typing
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ApiRoute = \`/api/\${string}\`;
type VersionedRoute = \`/api/v\${number}/\${string}\`;

// Extracting parts of string types with infer + template literals
type GetParam<S extends string> =
  S extends \`\${string}:\${infer Param}/\${string}\`
    ? Param
    : S extends \`\${string}:\${infer Param}\`
      ? Param
      : never;

type P1 = GetParam<'/users/:id/posts'>;  // "id"
type P2 = GetParam<'/users/:userId'>;    // "userId"

// Mapped type + template literal = typed event emitter
type EventMap = {
  click: { x: number; y: number };
  keydown: { key: string; code: string };
  resize: { width: number; height: number };
};

type OnHandlers = {
  [K in keyof EventMap as \`on\${Capitalize<string & K>}\`]: (event: EventMap[K]) => void;
};
// { onClick: (e: {x:number;y:number}) => void; onKeydown: ...; onResize: ... }

// Recursive: split a path string into tuple of segments
type Split<S extends string, D extends string> =
  S extends \`\${infer Head}\${D}\${infer Tail}\`
    ? [Head, ...Split<Tail, D>]
    : [S];

type Parts = Split<'a/b/c', '/'>; // ["a", "b", "c"]`}</code></pre>

      {/* Section 5: Discriminated Unions and Exhaustive Checks */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Discriminated Unions and Exhaustive Checks
      </h2>
      <p>
        A <strong>discriminated union</strong> is a union of types sharing a common literal-typed property
        (the <em>discriminant</em>). TypeScript narrows the type automatically when you check the
        discriminant. Adding an exhaustive check with <code>never</code> guarantees that adding a new
        union member causes a compile error if you forget to handle it.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Shape example — classic discriminated union
type Circle = { kind: 'circle'; radius: number };
type Square = { kind: 'square'; side: number };
type Triangle = { kind: 'triangle'; base: number; height: number };
type Shape = Circle | Square | Triangle;

// Exhaustive switch — assertNever enforces completeness
function assertNever(x: never): never {
  throw new Error('Unhandled case: ' + JSON.stringify(x));
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      return assertNever(shape); // If you add a new Shape variant and forget to
                                 // handle it here, TypeScript reports an error
  }
}

// API result modeling
type ApiResult<T, E = string> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: E; code: number };

function handleResult<T>(result: ApiResult<T>): string {
  switch (result.status) {
    case 'idle':    return 'Ready';
    case 'loading': return 'Loading...';
    case 'success': return 'Got data at ' + result.timestamp;
    case 'error':   return 'Error ' + result.code + ': ' + result.error;
    default:        return assertNever(result);
  }
}

// Domain event bus with discriminated union
type DomainEvent =
  | { type: 'USER_CREATED';  payload: { userId: string; email: string } }
  | { type: 'USER_UPDATED';  payload: { userId: string; changes: Record<string, unknown> } }
  | { type: 'USER_DELETED';  payload: { userId: string; deletedAt: Date } }
  | { type: 'ORDER_PLACED';  payload: { orderId: string; total: number } };

// Extract payload type for a specific event type
type ExtractPayload<E extends DomainEvent, T extends DomainEvent['type']> =
  Extract<E, { type: T }>['payload'];

type UserCreatedPayload = ExtractPayload<DomainEvent, 'USER_CREATED'>;
// { userId: string; email: string }

// Type-safe handler map
type EventHandlerMap = {
  [K in DomainEvent['type']]: (
    payload: ExtractPayload<DomainEvent, K>
  ) => void;
};

const handlers: EventHandlerMap = {
  USER_CREATED:  ({ userId, email }) => console.log('New user', email),
  USER_UPDATED:  ({ userId, changes }) => console.log('Updated', userId),
  USER_DELETED:  ({ userId, deletedAt }) => console.log('Deleted', userId),
  ORDER_PLACED:  ({ orderId, total }) => console.log('Order', orderId, total),
};`}</code></pre>

      {/* Section 6: Utility Types Deep Dive */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Utility Types Deep Dive
      </h2>
      <p>
        Beyond the common Partial/Pick/Omit, TypeScript ships a full library of utility types for
        function introspection, set operations on unions, and object manipulation. Understanding their
        internals helps you compose custom utilities confidently.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Comparison Table: Essential Utility Types
      </h3>
      <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#e2e8f0' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Utility Type</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Input</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Output</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Partial<T>', 'T', 'All properties optional', 'Patch/update requests'],
              ['Required<T>', 'T', 'All properties required', 'Enforce complete data'],
              ['Readonly<T>', 'T', 'All properties readonly', 'Immutable snapshots'],
              ['Pick<T, K>', 'T, keys K', 'Only keys K from T', 'Projection / DTO shaping'],
              ['Omit<T, K>', 'T, keys K', 'T without keys K', 'Create requests without id'],
              ['Record<K, V>', 'Keys K, value V', 'Object type with K keys', 'Lookup tables, caches'],
              ['Exclude<T, U>', 'Union T, type U', 'Members of T not in U', 'Filter union members'],
              ['Extract<T, U>', 'Union T, type U', 'Members of T assignable to U', 'Narrow union members'],
              ['NonNullable<T>', 'T', 'T without null/undefined', 'Ensure defined value'],
              ['ReturnType<F>', 'Function F', 'Return type of F', 'Infer response type'],
              ['Parameters<F>', 'Function F', 'Tuple of param types', 'Infer arg types'],
              ['ConstructorParameters<C>', 'Class C', 'Constructor arg tuple', 'Factory helpers'],
              ['InstanceType<C>', 'Class C', 'Instance type', 'Generic class utils'],
              ['Awaited<T>', 'T (possibly Promise)', 'Resolved value type', 'Async return types'],
              ['NoInfer<T>', 'T', 'Prevents type inference at site', 'Prevent widening (TS 5.4+)'],
            ].map(([util, input, output, use], i) => (
              <tr key={util} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 14px' }}><code>{util}</code></td>
                <td style={{ padding: '8px 14px', color: '#64748b' }}>{input}</td>
                <td style={{ padding: '8px 14px', color: '#64748b' }}>{output}</td>
                <td style={{ padding: '8px 14px', color: '#64748b' }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Exclude and Extract — set operations on unions
type Primitive = string | number | boolean | null | undefined;
type NonNullPrimitive = Exclude<Primitive, null | undefined>; // string | number | boolean
type StringOrNumber = Extract<Primitive, string | number>;    // string | number

// NonNullable<T> = Exclude<T, null | undefined>
type Safe = NonNullable<string | null | undefined>; // string

// Awaited<T> — recursively unwraps promises
type A1 = Awaited<Promise<string>>;                     // string
type A2 = Awaited<Promise<Promise<number>>>;             // number
type A3 = Awaited<string | Promise<number>>;             // string | number

// Combine Awaited + ReturnType for async functions
async function loadConfig() {
  return { debug: true, apiUrl: 'https://api.example.com' };
}
type Config = Awaited<ReturnType<typeof loadConfig>>;
// { debug: boolean; apiUrl: string }

// NoInfer<T> (TypeScript 5.4) — prevent inference widening
function createStore<T>(initial: T, transform: (val: NoInfer<T>) => NoInfer<T>): T {
  return transform(initial);
}
// Without NoInfer, T would be widened by the 'transform' parameter type
// With NoInfer, T is solely inferred from 'initial'

// Combining utility types for sophisticated patterns
interface ApiSchema {
  users: { id: string; name: string; email: string; role: 'admin' | 'user' };
  posts: { id: string; title: string; body: string; authorId: string };
  comments: { id: string; text: string; postId: string; userId: string };
}

type ApiResource = keyof ApiSchema;

// Create: all fields except id
type CreatePayload<R extends ApiResource> = Omit<ApiSchema[R], 'id'>;

// Update: id required, all others optional
type UpdatePayload<R extends ApiResource> =
  Pick<ApiSchema[R], 'id'> &
  Partial<Omit<ApiSchema[R], 'id'>>;

type CreateUser = CreatePayload<'users'>;
// { name: string; email: string; role: 'admin' | 'user' }

type UpdatePost = UpdatePayload<'posts'>;
// { id: string; title?: string; body?: string; authorId?: string }`}</code></pre>

      {/* Section 7: Decorators */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Decorators: Experimental vs TC39 Stage 3
      </h2>
      <p>
        TypeScript supports two decorator systems. <strong>Legacy experimental decorators</strong> require{' '}
        <code>experimentalDecorators: true</code> in tsconfig and are used by NestJS, Angular, and TypeORM.
        <strong>TC39 Stage 3 decorators</strong> (TypeScript 5.0+) require no flag and implement the
        finalized ECMAScript proposal. The two systems are <em>incompatible</em> and cannot coexist in
        the same file.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Comparison: Legacy vs TC39 Stage 3
      </h3>
      <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#e2e8f0' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Aspect</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Legacy (experimentalDecorators)</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>TC39 Stage 3 (TS 5.0+)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['tsconfig flag', '"experimentalDecorators": true', 'None required'],
              ['Method signature', '(target, key, descriptor)', '(value, context)'],
              ['Context object', 'No context', 'name, kind, metadata, addInitializer'],
              ['accessor keyword', 'Not supported', 'Supported'],
              ['Metadata', 'Via reflect-metadata', 'Built-in decorator metadata proposal'],
              ['Framework support', 'NestJS, Angular, TypeORM, InversifyJS', 'Growing — check framework docs'],
              ['Stability', 'Stable (frozen API)', 'Finalized ECMAScript proposal'],
              ['Mixing in same file', 'N/A', 'Cannot mix with legacy'],
            ].map(([aspect, legacy, tc39], i) => (
              <tr key={aspect} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 14px', fontWeight: 600 }}>{aspect}</td>
                <td style={{ padding: '8px 14px', color: '#64748b' }}>{legacy}</td>
                <td style={{ padding: '8px 14px', color: '#64748b' }}>{tc39}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// ── TC39 Stage 3 Decorators (TypeScript 5.0+) ──────────────────────────

// Class decorator: replace or augment the class
function sealed(target: typeof SomeClass, context: ClassDecoratorContext) {
  context.addInitializer(function(this: typeof SomeClass) {
    Object.seal(this);
  });
}

// Method decorator: wrap the method
function log(target: Function, context: ClassMethodDecoratorContext) {
  const name = String(context.name);
  return function(this: unknown, ...args: unknown[]) {
    console.log(\`Calling \${name} with\`, args);
    const result = (target as Function).apply(this, args);
    console.log(\`\${name} returned\`, result);
    return result;
  };
}

// Field decorator
function required<T>(target: undefined, context: ClassFieldDecoratorContext<unknown, T>) {
  return function(this: unknown, value: T) {
    if (value === undefined || value === null) {
      throw new Error(\`Field \${String(context.name)} is required\`);
    }
    return value;
  };
}

// accessor keyword + decorator
class ReactiveStore {
  @log
  accessor count = 0; // auto-generates get count() / set count() backed by #count
}

// ── Legacy Experimental Decorators ──────────────────────────────────────
// tsconfig: "experimentalDecorators": true, "emitDecoratorMetadata": true

// Method decorator (legacy API)
function retry(times: number, delay: number) {
  return function(target: object, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function(this: unknown, ...args: unknown[]) {
      let lastError: unknown;
      for (let i = 0; i < times; i++) {
        try {
          return await original.apply(this, args);
        } catch (e) {
          lastError = e;
          await new Promise(r => setTimeout(r, delay * (i + 1)));
        }
      }
      throw lastError;
    };
    return descriptor;
  };
}

// Class decorator (legacy API)
function Injectable(): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata('injectable', true, target);
  };
}

class UserService {
  @retry(3, 1000)
  async fetchUser(id: string) {
    const res = await fetch(\`/api/users/\${id}\`);
    return res.json();
  }
}

// Decorator composition: applied bottom-to-top
class ApiController {
  @log        // executed second (outer)
  @retry(3, 500) // executed first (inner)
  async createUser(data: unknown) { /* ... */ }
}`}</code></pre>

      {/* Section 8: Module Augmentation and Declaration Merging */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Module Augmentation and Declaration Merging
      </h2>
      <p>
        <strong>Declaration merging</strong> allows multiple declarations of the same name to be combined
        into a single type definition. <strong>Module augmentation</strong> extends the types of existing
        modules (including third-party npm packages) without modifying their source. Both are essential for
        adding properties to express <code>Request</code>, extending Next.js session types, or augmenting
        global objects.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Interface declaration merging
interface Window {
  myAnalytics: { track: (event: string) => void };
}

interface User {
  id: string;
  name: string;
}
interface User {
  email: string; // merged with previous declaration
}
// Result: User = { id: string; name: string; email: string }

// Namespace merging with a class
class Album {
  label: Album.Label = 'unknown';
}
namespace Album {
  export type Label = string;
  export function create(title: string): Album {
    return { label: title };
  }
}

// Module augmentation: add property to express Request
// In a types/express/index.d.ts file:
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      role: 'admin' | 'user';
    };
  }
}

// Augment Next.js session (next-auth example)
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'admin' | 'user';
      name?: string | null;
      email?: string | null;
    };
  }
}

// Global augmentation
declare global {
  interface Array<T> {
    // Add a typed groupBy method to all arrays
    groupBy<K extends string | number | symbol>(
      keyFn: (item: T) => K
    ): Record<K, T[]>;
  }
}

// Augment an npm package (e.g., add types to untyped module)
declare module 'some-untyped-library' {
  export function doSomething(input: string): Promise<string>;
  export const VERSION: string;
  export interface Options {
    timeout?: number;
    retries?: number;
  }
}

// Selective re-export augmentation pattern
// Useful for extending a library's public API in a wrapper module
import type { RequestHandler } from 'express';

declare module 'express' {
  interface RouterMatcher<T> {
    // Add custom overload
    (path: string, ...handlers: RequestHandler[]): T;
  }
}`}</code></pre>

      {/* Section 9: Type Narrowing Techniques */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Type Narrowing Techniques
      </h2>
      <p>
        TypeScript uses <em>control flow analysis</em> to narrow types within blocks. Multiple narrowing
        techniques exist: <code>typeof</code>, <code>instanceof</code>, <code>in</code>, truthiness checks,
        equality checks, assignment narrowing, and user-defined <em>type guards</em>. Understanding when
        each is appropriate prevents unnecessary type assertions (<code>as</code>).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`type StringOrNumber = string | number;

// typeof narrowing
function double(x: StringOrNumber): StringOrNumber {
  if (typeof x === 'string') {
    return x.repeat(2);   // x: string here
  }
  return x * 2;           // x: number here
}

// instanceof narrowing
function format(err: Error | SyntaxError): string {
  if (err instanceof SyntaxError) {
    return 'Syntax error at: ' + err.message; // err: SyntaxError
  }
  return err.message; // err: Error
}

// in narrowing (check property existence)
type Cat = { meow(): void };
type Dog = { bark(): void };
function makeSound(animal: Cat | Dog) {
  if ('meow' in animal) {
    animal.meow();  // animal: Cat
  } else {
    animal.bark();  // animal: Dog
  }
}

// Truthiness narrowing
function printLength(x: string | null | undefined) {
  if (x) {
    console.log(x.length); // x: string (null and undefined are falsy)
  }
}

// Equality narrowing
function compare(a: string | number, b: string | boolean) {
  if (a === b) {
    // Both sides must be string (the only type in common)
    console.log(a.toUpperCase()); // a: string
    console.log(b.toUpperCase()); // b: string
  }
}

// User-defined type guard: is predicate
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
function isUser(value: unknown): value is { id: string; name: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    typeof (value as any).id === 'string' &&
    typeof (value as any).name === 'string'
  );
}

// Assertion function: asserts predicate
function assertDefined<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error('Expected defined value');
  }
}

let maybeUser: { name: string } | null = null;
assertDefined(maybeUser);
// After assertDefined, maybeUser is narrowed to { name: string }
console.log(maybeUser.name); // Safe

// Discriminant narrowing (discriminated union pattern)
type LoadedState = { state: 'loaded'; data: string[] };
type ErrorState  = { state: 'error';  message: string };
type AppState = LoadedState | ErrorState | { state: 'idle' };

function render(state: AppState) {
  if (state.state === 'loaded') {
    return state.data.join(', ');  // state: LoadedState
  }
  if (state.state === 'error') {
    return 'Error: ' + state.message; // state: ErrorState
  }
  return 'Loading...';               // state: { state: 'idle' }
}

// Control flow with never for exhaustive narrowing
function exhaustiveCheck(value: never): never {
  throw new Error('Unexpected value: ' + JSON.stringify(value));
}`}</code></pre>

      {/* Section 10: Advanced Function Overloads */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Advanced Function Overloads
      </h2>
      <p>
        Function overloads allow a function to have multiple type signatures. TypeScript matches the call
        against each overload signature in order. The <em>implementation signature</em> (last, broader
        signature) is not part of the public API. Overloads provide better autocomplete and narrower return
        types than a single union signature.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Basic function overload
function createElement(tag: 'canvas'): HTMLCanvasElement;
function createElement(tag: 'img'):    HTMLImageElement;
function createElement(tag: 'input'):  HTMLInputElement;
function createElement(tag: string):   HTMLElement;
// Implementation (not visible to callers)
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const canvas = createElement('canvas'); // HTMLCanvasElement — precise type!
const img    = createElement('img');    // HTMLImageElement
const generic = createElement('span'); // HTMLElement

// Overload based on argument count
function buildQuery(table: string): string;
function buildQuery(table: string, where: string): string;
function buildQuery(table: string, where: string, limit: number): string;
function buildQuery(table: string, where?: string, limit?: number): string {
  let sql = 'SELECT * FROM ' + table;
  if (where) sql += ' WHERE ' + where;
  if (limit) sql += ' LIMIT ' + limit;
  return sql;
}

// Overload for type-based return discrimination
function parse(value: string): string[];
function parse(value: number): number[];
function parse(value: string | number): string[] | number[] {
  if (typeof value === 'string') return value.split(',');
  return [value];
}

const strResult = parse('a,b,c');  // string[]
const numResult = parse(42);       // number[]

// Method overloads in classes
class EventEmitter<Events extends Record<string, unknown>> {
  private listeners = new Map<string, Function[]>();

  on<K extends keyof Events & string>(
    event: K,
    handler: (payload: Events[K]) => void
  ): this;
  on(event: string, handler: Function): this;
  on(event: string, handler: Function): this {
    const existing = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...existing, handler]);
    return this;
  }

  emit<K extends keyof Events & string>(event: K, payload: Events[K]): void;
  emit(event: string, payload: unknown): void;
  emit(event: string, payload: unknown): void {
    this.listeners.get(event)?.forEach(fn => fn(payload));
  }
}

type AppEvents = {
  login:  { userId: string };
  logout: { userId: string; reason: string };
};

const emitter = new EventEmitter<AppEvents>();
emitter.on('login', ({ userId }) => console.log('Logged in:', userId));
emitter.emit('login', { userId: 'u1' }); // payload fully typed`}</code></pre>

      {/* Section 11: Covariance and Contravariance */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Covariance and Contravariance
      </h2>
      <p>
        Variance describes how the subtype relationship flows through generic type constructors. Getting it
        wrong leads to unsound type assignments that silently corrupt data at runtime. TypeScript is
        structurally typed, so understanding variance is key to designing correct generic APIs.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`class Animal {
  breathe() { return 'breathe'; }
}
class Dog extends Animal {
  bark() { return 'woof'; }
}
class Cat extends Animal {
  meow() { return 'meow'; }
}

// ── Covariance: return types ────────────────────────────────────────────
// If Dog extends Animal, then () => Dog is assignable to () => Animal
type AnimalFactory = () => Animal;
type DogFactory    = () => Dog;

const makeDog: DogFactory = () => new Dog();
const makeAnimal: AnimalFactory = makeDog; // OK — covariant ✓

// ── Contravariance: parameter types (strictFunctionTypes: true) ─────────
// If Dog extends Animal, then (x: Animal) => void is assignable to (x: Dog) => void
type AnimalHandler = (a: Animal) => void;
type DogHandler    = (d: Dog) => void;

const handleAnimal: AnimalHandler = (a) => a.breathe(); // works on any Animal
const handleDog: DogHandler = handleAnimal; // OK — contravariant ✓
// handleAnimal can accept any Animal (including Dog), so it's safe to use
// wherever a DogHandler is needed.

// The reverse is UNSOUND:
// const handleAnimalFromDog: AnimalHandler = handleDog; // Error!
// handleDog might call d.bark() which only exists on Dog, not all Animals

// ── Bivariance: method shorthand (historic exception) ───────────────────
interface Processor {
  process(value: string): void;   // method — bivariant (less safe)
  handle: (value: string) => void; // property — contravariant (safe)
}

// ── Invariance: read-write containers ──────────────────────────────────
// Array<T> is effectively invariant (read + write)
// You cannot safely assign Dog[] to Animal[]
// because you could then push a Cat into the "Dog" array
function addCat(animals: Animal[]) {
  animals.push(new Cat()); // Fine if truly Animal[]
}
const dogs: Dog[] = [];
// addCat(dogs); // Would corrupt dogs — TypeScript correctly errors

// ── Explicit variance annotations (TypeScript 4.7+) ────────────────────
interface ReadonlyBox<out T> {   // covariant — T only in output position
  readonly value: T;
}
interface WriteOnlyBox<in T> {   // contravariant — T only in input position
  set(value: T): void;
}
interface Box<in out T> {        // invariant — T in both positions
  get(): T;
  set(value: T): void;
}

// TypeScript validates that variance annotations match actual usage
// Incorrect annotation produces a compile error:
// interface BadBox<out T> { set(value: T): void; } // Error: T in contravariant position`}</code></pre>

      {/* Section 12: satisfies Operator */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        The satisfies Operator (TypeScript 4.9+)
      </h2>
      <p>
        The <code>satisfies</code> operator validates that an expression matches a type <em>without</em>{' '}
        widening the inferred type to that of the annotation. This solves the classic tension between
        type-checking a config object and retaining the precise literal types for downstream use.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`type Color = string | [number, number, number];

// With type annotation: loses narrow type
const paletteAnnotated: Record<string, Color> = {
  red:   [255, 0, 0],
  green: '#00ff00',
  blue:  [0, 0, 255],
};
// paletteAnnotated.red is Color = string | [number, number, number]
// Can't call .toUpperCase() on paletteAnnotated.green — it might be an array

// With satisfies: keeps narrow inferred type
const palette = {
  red:   [255, 0, 0],
  green: '#00ff00',
  blue:  [0, 0, 255],
} satisfies Record<string, Color>;

// TypeScript remembers the narrow types:
palette.red[0];              // number ✓ (not string | number[])
palette.green.toUpperCase(); // string ✓ (not string | number[])
// Also catches errors:
// const bad = { red: true } satisfies Record<string, Color>; // Error!

// satisfies for route configs
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface RouteConfig {
  method: HttpMethod;
  path: string;
  auth?: boolean;
}

const routes = {
  getUsers:    { method: 'GET',    path: '/users',        auth: true },
  createUser:  { method: 'POST',   path: '/users',        auth: true },
  publicHealth:{ method: 'GET',    path: '/health' },
} satisfies Record<string, RouteConfig>;

// routes.getUsers.method is 'GET' (literal), not HttpMethod (widened)
// routes.publicHealth.auth is undefined (satisfies allows missing optional)

// satisfies with const enum-like objects
const COLORS = {
  PRIMARY:   '#0ea5e9',
  SECONDARY: '#6366f1',
  SUCCESS:   '#22c55e',
  ERROR:     '#ef4444',
} satisfies Record<string, \`#\${string}\`>;

// COLORS.PRIMARY is '#0ea5e9' not string — template literal preserved

// satisfies + as const: ultimate precision
const CONFIG = {
  endpoints: {
    api:    'https://api.example.com',
    cdn:    'https://cdn.example.com',
  },
  timeouts: { connect: 5_000, read: 30_000 },
} as const satisfies {
  endpoints: Record<string, string>;
  timeouts: Record<string, number>;
};
// CONFIG.endpoints.api is 'https://api.example.com' (literal, readonly)

// vs annotation which would produce string (widened)`}</code></pre>

      {/* Section 13: noUncheckedIndexedAccess and Strict Mode */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        noUncheckedIndexedAccess and Strict Mode Settings
      </h2>
      <p>
        TypeScript&#39;s <code>strict: true</code> enables a bundle of checks, but several highly impactful
        options are <em>not</em> included. Enabling them requires explicit opt-in. Understanding exactly
        what each option does helps you choose the right level of strictness for your project.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Strict Mode Options Reference
      </h3>
      <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#e2e8f0' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Option</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>In strict?</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>What It Does</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['strictNullChecks', 'Yes', 'null/undefined are not assignable to other types'],
              ['strictFunctionTypes', 'Yes', 'Function params are checked contravariantly'],
              ['strictBindCallApply', 'Yes', 'bind/call/apply are type-checked'],
              ['strictPropertyInitialization', 'Yes', 'Class properties must be initialized in constructor'],
              ['noImplicitAny', 'Yes', 'Variables without type annotation cannot be inferred as any'],
              ['noImplicitThis', 'Yes', 'this in functions must have a type annotation'],
              ['alwaysStrict', 'Yes', 'Emit "use strict" and parse in strict mode'],
              ['useUnknownInCatchVariables', 'Yes (TS 4.4)', 'catch (e) binds e as unknown instead of any'],
              ['noUncheckedIndexedAccess', 'No', 'Adds | undefined to array/index-signature access'],
              ['noPropertyAccessFromIndexSignature', 'No', 'Requires bracket notation for index-sig access'],
              ['exactOptionalPropertyTypes', 'No', 'Distinguishes missing property from property set to undefined'],
              ['noFallthroughCasesInSwitch', 'No', 'Prevents case fallthrough in switch statements'],
              ['noImplicitReturns', 'No', 'All code paths in function must return a value'],
              ['noUnusedLocals', 'No', 'Reports error on unused local variables'],
              ['noUnusedParameters', 'No', 'Reports error on unused function parameters'],
              ['verbatimModuleSyntax', 'No', 'Import/export type syntax must match usage exactly'],
            ].map(([option, inStrict, desc], i) => (
              <tr key={option} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 14px' }}><code style={{ fontSize: '0.8rem' }}>{option}</code></td>
                <td style={{ padding: '8px 14px', textAlign: 'center', color: inStrict === 'Yes' ? '#15803d' : '#dc2626', fontWeight: 600 }}>{inStrict}</td>
                <td style={{ padding: '8px 14px', color: '#64748b', fontSize: '0.82rem' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Recommended tsconfig.json for new projects (2026)
{
  "compilerOptions": {
    // Strict bundle
    "strict": true,

    // Beyond strict — highly recommended
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    // Module discipline (Node.js / modern bundlers)
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "moduleDetection": "force",

    // Modern output
    "target": "ES2024",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2024", "DOM", "DOM.Iterable"],

    // Path aliases
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },

    // Build
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "incremental": true
  }
}

// ── noUncheckedIndexedAccess in depth ──────────────────────────────────
const items = ['a', 'b', 'c'];

// Without noUncheckedIndexedAccess:
const item1 = items[5]; // type: string  ← WRONG, could be undefined at runtime

// With noUncheckedIndexedAccess:
const item2 = items[5]; // type: string | undefined  ← CORRECT

// Forces you to guard:
if (item2 !== undefined) {
  console.log(item2.toUpperCase()); // Safe
}

// Same for Record/index signatures:
const cache: Record<string, number> = {};
const val = cache['missing']; // number | undefined with noUncheckedIndexedAccess

// exactOptionalPropertyTypes:
interface Config {
  timeout?: number; // means 'timeout' may be absent, NOT 'timeout: number | undefined'
}
// With exactOptionalPropertyTypes: true
const bad: Config = { timeout: undefined }; // Error! undefined is not number
const good: Config = { timeout: 5000 }; // OK
const alsGood: Config = {}; // OK (absent is fine)

// Without exactOptionalPropertyTypes (default behavior):
const also: Config = { timeout: undefined }; // Was OK — confusing!`}</code></pre>

      {/* Section 14: Type Narrowing with Branded Types */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Advanced Type Narrowing and Branded/Opaque Types
      </h2>
      <p>
        Branded (opaque) types prevent accidentally mixing semantically different but structurally identical
        types. For example, a <code>UserId</code> and an <code>OrderId</code> are both strings at runtime but
        should never be interchangeable in function arguments.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Nominal typing via brand property
declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

type UserId  = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;
type Email   = Brand<string, 'Email'>;

// Factory (cast once at boundary)
const UserId  = (s: string): UserId  => s as UserId;
const OrderId = (s: string): OrderId => s as OrderId;
const Email   = (s: string): Email | null => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? s as Email : null;
};

function getOrdersByUser(userId: UserId): Promise<Order[]> {
  return db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
}

const uid = UserId('user-abc');
const oid = OrderId('order-xyz');

getOrdersByUser(uid);  // OK
// getOrdersByUser(oid); // Error: OrderId is not assignable to UserId

// Combining branded types with type narrowing
type PositiveNumber = Brand<number, 'Positive'>;

function assertPositive(n: number): asserts n is PositiveNumber {
  if (n <= 0) throw new RangeError('Expected positive number, got ' + n);
}

function divide(numerator: number, denominator: PositiveNumber): number {
  return numerator / denominator; // Safe: denominator is never 0 or negative
}

let denom = 5;
assertPositive(denom);
divide(100, denom); // OK after assertion

// Opaque type pattern for sensitive data
type HashedPassword = Brand<string, 'HashedPassword'>;
type PlainPassword  = Brand<string, 'PlainPassword'>;

async function hashPassword(plain: PlainPassword): Promise<HashedPassword> {
  const hash = await bcrypt.hash(plain, 12);
  return hash as HashedPassword;
}

function verifyPassword(plain: PlainPassword, hashed: HashedPassword): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

// Store plaintext: compile error if you accidentally save plain password
async function createUser(email: string, rawPassword: string) {
  const plain = rawPassword as PlainPassword;
  const hashed = await hashPassword(plain);

  await db.users.create({ email, passwordHash: hashed }); // HashedPassword ✓
  // await db.users.create({ email, passwordHash: plain }); // Error! ✗
}`}</code></pre>

      {/* Section 15: Conclusion and Comparison */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Putting It All Together: A Practical Checklist
      </h2>
      <p>
        Advanced TypeScript is not about memorizing every edge case in the specification — it&#39;s about
        choosing the right tool for each problem. Use the checklist below when designing a new module or
        reviewing an existing one.
      </p>
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', margin: '24px 0' }}>
        <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 1rem 0' }}>Advanced TypeScript Checklist</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.9' }}>
          <li><strong>Generics:</strong> Use constraints (<code>T extends X</code>) instead of <code>any</code>; add variance annotations for generic interfaces</li>
          <li><strong>Conditional types:</strong> Use <code>infer</code> to extract types rather than writing separate utility types by hand</li>
          <li><strong>Mapped types:</strong> Build API request/response types from a single source-of-truth interface using Pick, Omit, and custom mapped types</li>
          <li><strong>Template literals:</strong> Type event names, API routes, and CSS values with template literal types to prevent typos at compile time</li>
          <li><strong>Discriminated unions:</strong> Model all domain state (loading/success/error, shape variants, event types) as discriminated unions with exhaustive checks</li>
          <li><strong>Utility types:</strong> Combine ReturnType + Awaited to infer async response shapes; use NoInfer to prevent unwanted widening</li>
          <li><strong>Decorators:</strong> Prefer TC39 Stage 3 in new code; use legacy only if your framework requires it; never mix both</li>
          <li><strong>Declaration merging:</strong> Augment third-party modules in <code>*.d.ts</code> files rather than casting with <code>as</code></li>
          <li><strong>Type guards:</strong> Write <code>value is Type</code> predicates and <code>asserts value is Type</code> functions for runtime validation boundaries</li>
          <li><strong>Overloads:</strong> Prefer overloads over single union signatures when different input types produce meaningfully different output types</li>
          <li><strong>satisfies:</strong> Use it for config objects where you want validation without losing literal types; combine with <code>as const</code> for read-only configs</li>
          <li><strong>Strict mode:</strong> Enable <code>strict: true</code> plus <code>noUncheckedIndexedAccess</code>, <code>exactOptionalPropertyTypes</code>, and <code>noImplicitReturns</code> on every project</li>
        </ul>
      </div>

      <p>
        Explore advanced TypeScript patterns in practice using our{' '}
        <Link href={'/' + lang + '/tools/typescript-to-javascript'} style={{ color: '#0284c7' }}>
          TypeScript to JavaScript converter
        </Link>{' '}
        to inspect what the compiler emits, or validate JSON API schemas with our{' '}
        <Link href={'/' + lang + '/tools/json-formatter'} style={{ color: '#0284c7' }}>
          JSON Formatter
        </Link>
        . For more TypeScript depth, see our{' '}
        <Link href={'/' + lang + '/blog/typescript-generics-guide'} style={{ color: '#0284c7' }}>
          TypeScript Generics Complete Guide
        </Link>{' '}
        and{' '}
        <Link href={'/' + lang + '/blog/typescript-decorators-guide'} style={{ color: '#0284c7' }}>
          TypeScript Decorators Guide
        </Link>
        .
      </p>
    </article>
  );
}
