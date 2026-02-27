'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'TypeScript Generics Complete Guide: Functions, Constraints, Conditional Types, and Real-World Patterns — 2025',
    description: 'Master TypeScript generics with this complete guide: generic functions, interfaces, constraints, conditional types, mapped types, template literal types, utility types, variance, and real-world patterns.',
  },
  zh: {
    title: 'TypeScript 泛型完整指南：函数、约束、条件类型与实战模式 — 2025',
    description: '全面掌握 TypeScript 泛型：泛型函数、接口、约束、条件类型、映射类型、模板字面量类型、工具类型、型变与实战模式。',
  },
};

export default function TypescriptGenericsGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are TypeScript generics and why are they useful?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TypeScript generics allow you to write reusable, type-safe code that works with multiple types without sacrificing type checking. Instead of using "any" (which disables type safety), generics use type parameters like <T> as placeholders that are filled in at the call site. For example, a generic identity function <T>(arg: T): T preserves the exact type of its input in the return type. This enables the compiler to catch bugs like passing a number where a string is expected, even inside generic utility functions. Generics are the foundation of all TypeScript built-in utility types (Partial, Required, Record, etc.) and enable patterns impossible with plain types.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between generic constraints and conditional types?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Generic constraints (T extends SomeType) restrict what types can be passed to a generic function or class, ensuring the type parameter has certain properties at compile time. For example, <T extends { length: number }> guarantees T has a length property. Conditional types (T extends U ? X : Y) compute a type based on whether T is assignable to U — they are type-level if/else expressions evaluated at compile time. Constraints prevent invalid calls; conditional types transform types. They are often combined: a conditional type can use infer to extract nested types, and can distribute over union types automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the infer keyword work in TypeScript conditional types?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The infer keyword lets you capture a type from within a pattern during conditional type evaluation. It can only appear on the right side of extends in a conditional type. For example: type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never extracts the return type R if T is a function, otherwise returns never. TypeScript built-in ReturnType, Parameters, InstanceType, and Awaited all use infer internally. A key behavior: if infer appears in multiple positions in a union/intersection, TypeScript infers the intersection (for covariant positions) or union (for contravariant positions) of all captured types.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are mapped types and how do they differ from index signatures?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mapped types iterate over the keys of an existing type and transform each property, creating a new type. Syntax: { [K in keyof T]: NewType }. Unlike index signatures (which declare that all string keys have a certain type), mapped types preserve the exact set of keys and can modify each property individually. You can add/remove modifiers: [K in keyof T]+?: makes all optional, [K in keyof T]-?: makes all required, [K in keyof T]+readonly makes all readonly. The as clause (TS 4.1+) allows key remapping: [K in keyof T as NewKey<K>]: T[K]. TypeScript built-in Partial, Required, Readonly, and Record are all implemented as mapped types.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are template literal types and when should I use them?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Template literal types (introduced in TypeScript 4.1) construct new string types by combining string literals with template literal syntax. They shine when you need to type string patterns: API endpoints, CSS property names, event handler names, or discriminated unions with string prefixes. When a union type is used in a template literal position, TypeScript automatically distributes over the union to produce all permutations. Use them for strongly-typed CSS-in-JS, event systems, and API clients where the shape of string keys matters.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between covariance and contravariance in TypeScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Variance describes how subtype relationships flow through generic types. Covariance means if Dog extends Animal, then Producer<Dog> extends Producer<Animal> — the subtype relationship is preserved. TypeScript function return types are covariant. Contravariance means the relationship is reversed: Consumer<Animal> extends Consumer<Dog> — a consumer of a base type can substitute for a consumer of a subtype. TypeScript function parameter types are contravariant (strictFunctionTypes mode). TypeScript 4.7 introduced explicit in/out modifiers: out T marks covariant positions, in T marks contravariant positions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I use TypeScript generics to build a type-safe API client?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A type-safe API client uses generics to tie request and response types together. The core pattern: async function get<T>(url: string): Promise<T> { const res = await fetch(url); return res.json() as T; }. For a more robust client, define an endpoint map type mapping paths to method-to-response mappings. Then create a typed request function that uses keyof to constrain the path parameter and index access types to derive the response type. This gives you autocomplete on paths and correctly typed responses. Libraries like tRPC and Zod take this further by validating responses at runtime.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Awaited<T> utility type and when was it introduced?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Awaited<T> (introduced in TypeScript 4.5) recursively unwraps Promise types. It handles nested promises: Awaited<Promise<Promise<number>>> is number. It replaced the older UnwrapPromise pattern and is now used internally in the Promise.all, Promise.race, and Promise.allSettled signatures to correctly type their return values. ReturnType combined with Awaited gives you the fully-resolved return type of an async function: type Resolved = Awaited<ReturnType<typeof myAsyncFn>>.',
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

      <link rel="canonical" href="https://viadreams.cc/en/blog/typescript-generics-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>TypeScript generics</strong> are type-level functions: <code>{'<T>'}</code> is a parameter
          filled in at the call site. Use <strong>constraints</strong> (<code>T extends X</code>) to require
          properties; use <strong>conditional types</strong> (<code>T extends U ? X : Y</code>) to compute
          types at compile time; use <strong>mapped types</strong> to transform object shapes; use{' '}
          <strong>template literal types</strong> to type string patterns. Master the built-in utility types
          (Partial, Required, Record, ReturnType, Awaited) — they are all implemented with generics. Convert
          your TypeScript to JavaScript instantly with our{' '}
          <Link href="https://viadreams.cc/en/tools/typescript-to-javascript" style={{ color: '#0284c7' }}>
            TypeScript to JavaScript converter
          </Link>
          .
        </p>
      </div>

      {/* Section 1: Generic Functions */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Generic Functions — Syntax, Inference, and Multiple Type Parameters
      </h2>
      <p>
        A generic function defers the decision about which type to use to the caller. The type parameter{' '}
        <code>{'<T>'}</code> is captured at the call site through <strong>type inference</strong> — you rarely
        need to pass it explicitly.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Basic generic function
function identity<T>(arg: T): T {
  return arg;
}

const str = identity('hello');   // T inferred as string
const num = identity(42);        // T inferred as number
const explicit = identity<boolean>(true); // explicit type argument

// Multiple type parameters
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}
const p = pair('name', 42); // [string, number]

// Generic with return type inferred
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const head = first([1, 2, 3]); // number | undefined

// Generic arrow functions (TSX files need the trailing comma)
const mapArr = <T, U>(arr: T[], fn: (item: T) => U): U[] => arr.map(fn);

// Generic with default type parameter (TS 2.3+)
function createState<T = string>(initial: T): { value: T; set: (v: T) => void } {
  let value = initial;
  return { value, set: (v) => { value = v; } };
}
const s1 = createState();        // T defaults to string
const s2 = createState(0);       // T inferred as number`}</code></pre>

      {/* Section 2: Generic Interfaces & Classes */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Generic Interfaces and Classes — Stack, Queue, Repository
      </h2>
      <p>
        Generic interfaces and classes allow you to create reusable data structures and services that work
        with any type while maintaining full type safety.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Generic interface
interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
}

// Generic Stack<T>
class Stack<T> {
  private items: T[] = [];

  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  isEmpty(): boolean { return this.items.length === 0; }
  size(): number { return this.items.length; }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
const top = numStack.pop(); // number | undefined

// Generic Queue<T>
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void { this.items.push(item); }
  dequeue(): T | undefined { return this.items.shift(); }
  front(): T | undefined { return this.items[0]; }
  size(): number { return this.items.length; }
}

// User type for examples
interface User { id: number; name: string; email: string; }

// Generic Repository implementation
class UserRepository implements Repository<User, number> {
  private store = new Map<number, User>();

  async findById(id: number): Promise<User | null> {
    return this.store.get(id) ?? null;
  }
  async findAll(): Promise<User[]> { return [...this.store.values()]; }
  async save(user: User): Promise<User> {
    this.store.set(user.id, user);
    return user;
  }
  async delete(id: number): Promise<void> { this.store.delete(id); }
}

// Generic class with constructor constraint
function createInstance<T>(ctor: new () => T): T {
  return new ctor();
}
class Dog { bark() { return 'woof'; } }
const dog = createInstance(Dog); // Dog — fully typed`}</code></pre>

      {/* Section 3: Constraints */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Constraints — extends, keyof, and Bounded Type Parameters
      </h2>
      <p>
        Constraints narrow what types are acceptable for a type parameter. The{' '}
        <code>extends</code> keyword creates an upper bound.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Basic constraint — T must have a length property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest('hello', 'hi');        // string — OK
longest([1, 2, 3], [4, 5]);    // number[] — OK
// longest(1, 2);              // Error: number has no 'length'

// keyof constraint — K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const userObj = { name: 'Alice', age: 30 };
const uname = getProperty(userObj, 'name');  // string
const uage  = getProperty(userObj, 'age');   // number
// getProperty(userObj, 'email');            // Error: not a key

// T extends object — exclude primitives
function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

// T extends keyof U — key of another type parameter
function pickFields<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}

// Multiple constraints using intersection
function mergeObjects<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

// Constraint with constructor
function build<T>(ctor: new () => T): T {
  return new ctor();
}`}</code></pre>

      {/* Section 4: Conditional Types */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Conditional Types — infer, Distributive Behavior, and NonNullable
      </h2>
      <p>
        Conditional types compute a type based on a type-level condition: <code>T extends U ? X : Y</code>.
        They are evaluated at compile time and are the basis for most advanced utility types.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Basic conditional type
type IsString<T> = T extends string ? true : false;
type A = IsString<'hello'>; // true
type B = IsString<42>;      // false

// infer keyword — extract a type from a pattern
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
type Fn = (x: number) => string;
type R = MyReturnType<Fn>; // string

type ElementType<T> = T extends (infer E)[] ? E : T;
type E1 = ElementType<number[]>; // number
type E2 = ElementType<string>;   // string (not an array, returns T itself)

// Awaited — recursively unwrap promises
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;
type Resolved = MyAwaited<Promise<Promise<number>>>; // number

// Distributive conditional types — distribute over unions
type ToArray<T> = T extends unknown ? T[] : never;
type StrOrNumArr = ToArray<string | number>; // string[] | number[]

// Prevent distribution with wrapping in a tuple
type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;
type Combined = ToArrayNonDist<string | number>; // (string | number)[]

// NonNullable — removes null and undefined
type MyNonNullable<T> = T extends null | undefined ? never : T;
type Safe = MyNonNullable<string | null | undefined>; // string

// Complex infer — extract promise resolve type
type UnwrapPromise<T> =
  T extends Promise<infer U> ? U :
  T extends PromiseLike<infer U> ? U :
  T;`}</code></pre>

      {/* Section 5: Mapped Types */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Mapped Types — Transform Object Shapes
      </h2>
      <p>
        Mapped types iterate over the keys of a type and produce a new object type. All of TypeScript&apos;s
        built-in structural utility types (Partial, Required, Readonly, Record) are mapped types.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Built-in mapped types (their implementations)
type MyPartial<T>  = { [K in keyof T]?: T[K] };          // all optional
type MyRequired<T> = { [K in keyof T]-?: T[K] };         // all required (-? removes ?)
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };  // all readonly
type MyRecord<K extends string, V> = { [P in K]: V };    // key-value map

// Custom: make specific keys optional
type PartialBy<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>;

interface UserType { id: number; name: string; email: string; }
type UserUpdate = PartialBy<UserType, 'name' | 'email'>;
// { id: number; name?: string; email?: string }

// Custom: make all values nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Custom: deep partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Key remapping with 'as' clause (TS 4.1+)
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
type UserGetters = Getters<UserType>;
// { getId: () => number; getName: () => string; getEmail: () => string }

// Filter keys by value type using 'as never'
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
type StringFields = OnlyStrings<{ id: number; name: string; email: string }>;
// { name: string; email: string }

// Mutable<T> — remove readonly
type Mutable<T> = { -readonly [K in keyof T]: T[K] };`}</code></pre>

      {/* Section 6: Template Literal Types */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Template Literal Types — String Pattern Typing
      </h2>
      <p>
        Template literal types (TypeScript 4.1+) construct string types using backtick syntax. When unions
        appear in template positions, TypeScript automatically distributes to produce all permutations.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Basic template literal type
type Greeting = \`Hello, \${string}\`;
const g1: Greeting = 'Hello, Alice';  // OK

// Union distribution — cartesian product
type Direction = 'top' | 'right' | 'bottom' | 'left';
type CSSPadding = \`padding-\${Direction}\`;
// "padding-top" | "padding-right" | "padding-bottom" | "padding-left"

// EventHandler<T> — typed event names
type EventHandler<T extends string> = \`on\${Capitalize<T>}\`;
type ClickHandler = EventHandler<'click'>; // "onClick"
type InputEvents = EventHandler<'change' | 'blur' | 'focus'>;
// "onChange" | "onBlur" | "onFocus"

// API path pattern
type ApiVersion = 'v1' | 'v2';
type Resource   = 'users' | 'posts' | 'comments';
type ApiPath    = \`/api/\${ApiVersion}/\${Resource}\`;
// "/api/v1/users" | "/api/v1/posts" | ... (6 combinations)

// Intrinsic string manipulation types
type UpperHello = Uppercase<'hello'>;      // "HELLO"
type LowerHELLO = Lowercase<'HELLO'>;      // "hello"
type CapHello   = Capitalize<'hello'>;     // "Hello"
type UncapHello = Uncapitalize<'Hello'>;   // "hello"

// Deep key paths with template literals
type Paths<T extends object, Prefix extends string = ''> = {
  [K in keyof T & string]:
    T[K] extends object
      ? Paths<T[K], \`\${Prefix}\${K}.\`> | \`\${Prefix}\${K}\`
      : \`\${Prefix}\${K}\`;
}[keyof T & string];

type Config = { db: { host: string; port: number }; port: number };
type ConfigPaths = Paths<Config>;
// "db" | "db.host" | "db.port" | "port"`}</code></pre>

      {/* Section 7: Utility Types Deep Dive */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Utility Types Deep Dive — Awaited, Parameters, ReturnType, InstanceType
      </h2>
      <p>
        TypeScript ships with a rich set of built-in generic utility types. Here are the ones most developers
        underutilize:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Parameters<T> — tuple of function parameter types
type SomeFn = (a: string, b: number, c: boolean) => void;
type Params = Parameters<SomeFn>; // [string, number, boolean]

// ReturnType<T> — function return type
type ParseResult = ReturnType<typeof JSON.parse>; // any

interface UserType { id: string; name: string; }
declare function fetchUser(id: string): Promise<UserType>;
type FetchReturn   = ReturnType<typeof fetchUser>;   // Promise<UserType>
type ResolvedUser  = Awaited<ReturnType<typeof fetchUser>>; // UserType

// ConstructorParameters<T> — constructor parameter types
class HttpClient {
  constructor(public baseUrl: string, public timeout: number) {}
}
type CtorArgs = ConstructorParameters<typeof HttpClient>; // [string, number]

// InstanceType<T> — type returned by new T()
type ClientInstance = InstanceType<typeof HttpClient>; // HttpClient

// OmitThisParameter<T> — removes 'this' parameter
function greetUser(this: { name: string }, greeting: string): string {
  return \`\${greeting}, \${this.name}!\`;
}
type GreetFn = OmitThisParameter<typeof greetUser>; // (greeting: string) => string

// Awaited<T> — recursive promise unwrap (TS 4.5+)
type DeepPromise = Promise<Promise<Promise<number>>>;
type Flat = Awaited<DeepPromise>; // number

// Extract<T, U> and Exclude<T, U>
type Status = 'active' | 'inactive' | 'banned' | 'pending';
type ActiveStates   = Extract<Status, 'active' | 'pending'>;   // "active" | "pending"
type NegativeStates = Exclude<Status, 'active' | 'pending'>;   // "inactive" | "banned"

// NonNullable removes null and undefined from a union
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string`}</code></pre>

      {/* Section 8: Variance */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Variance — Covariance, Contravariance, and in/out Modifiers (TS 4.7)
      </h2>
      <p>
        Variance determines how subtype relationships flow through generic types. Understanding it prevents
        subtle type safety bugs.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Setup: Animal <- Dog subtype hierarchy
class Animal { breathe(): void {} }
class Dog extends Animal { bark(): void {} }

// COVARIANCE — subtype relationship preserved
// Producer<Dog> is assignable to Producer<Animal>
interface Producer<out T> { get(): T; }
const produceDog:    Producer<Dog>    = { get: () => new Dog() };
const produceAnimal: Producer<Animal> = produceDog; // OK

// CONTRAVARIANCE — relationship reversed
// Consumer<Animal> is assignable to Consumer<Dog>
interface Consumer<in T> { set(arg: T): void; }
const consumeAnimal: Consumer<Animal> = { set: (a) => a.breathe() };
const consumeDog:    Consumer<Dog>    = consumeAnimal; // OK

// Why function params are contravariant (strictFunctionTypes)
// A handler that accepts Animal also works for Dog (Dog is-a Animal)
type Handler<T> = (event: T) => void;

// INVARIANCE — mutable containers
// Array<Dog> is NOT safely assignable to Array<Animal>
// (you could push a Cat into it)

// TypeScript 4.7 explicit variance annotations
interface Getter<out T> {
  get(): T;         // T only in output position — covariant
}

interface Setter<in T> {
  set(value: T): void; // T only in input position — contravariant
}

interface ReadWrite<in out T> { // invariant
  get(): T;
  set(value: T): void;
}

// Variance in practice — function composition
function compose<A, B, C>(
  f: (a: A) => B,
  g: (b: B) => C
): (a: A) => C {
  return (a) => g(f(a));
}`}</code></pre>

      {/* Section 9: Generic Type Inference */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Generic Type Inference — Contextual Typing and Template Literal Inference
      </h2>
      <p>
        TypeScript&apos;s type inference engine can infer generic type parameters from context, making explicit
        type annotations rare in well-typed code.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Contextual typing — callback param types inferred from generic
const numbers: number[] = [3, 1, 2];
const sorted = numbers.sort((a, b) => a - b); // a and b are number

// Inference from multiple call sites
function mergeTwo<T>(a: T, b: T): T {
  return { ...(a as object), ...(b as object) } as T;
}
// T inferred as { name: string } — best common type
const merged = mergeTwo({ name: 'Alice' }, { name: 'Bob' });

// infer in conditional types
type FirstParam<T> = T extends (first: infer F, ...rest: unknown[]) => unknown ? F : never;
type FP = FirstParam<(x: string, y: number) => void>; // string

// Template literal inference
type ParseRoute<T extends string> =
  T extends \`\${infer Prefix}/\${infer Param}\`
    ? { prefix: Prefix; param: Param }
    : { prefix: T; param: never };

type Route = ParseRoute<'/api/users'>; // { prefix: '/api'; param: 'users' }

// Inferring tuple types
type Head<T extends unknown[]> = T extends [infer H, ...unknown[]] ? H : never;
type Tail<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never;
type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never;

type H = Head<[string, number, boolean]>; // string
type TailType = Tail<[string, number, boolean]>; // [number, boolean]
type L = Last<[string, number, boolean]>; // boolean

// Const assertion for narrowed literal inference
function createActions<const T extends readonly string[]>(actions: T): T {
  return actions;
}
const myActions = createActions(['add', 'remove', 'update'] as const);
// readonly ["add", "remove", "update"] — not string[]`}</code></pre>

      {/* Section 10: Real-World Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Real-World Patterns — Typed API Client, Event Emitter, Builder, Type-Safe Forms
      </h2>
      <p>
        These patterns demonstrate how generics combine with other TypeScript features to solve real
        engineering problems with complete type safety.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Typed API Client
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`interface PostType { id: string; title: string; }

// Define endpoint schema
interface ApiSchema {
  '/users':     { GET: UserType[];  POST: UserType };
  '/users/:id': { GET: UserType;   PUT: UserType; DELETE: void };
  '/posts':     { GET: PostType[]; POST: PostType };
}

type Endpoint = keyof ApiSchema;
type HttpMethod<P extends Endpoint> = keyof ApiSchema[P] & string;
type ApiResponse<P extends Endpoint, M extends HttpMethod<P>> =
  ApiSchema[P][M extends keyof ApiSchema[P] ? M : never];

async function apiRequest<P extends Endpoint, M extends HttpMethod<P>>(
  path: P,
  method: M,
  body?: unknown
): Promise<ApiResponse<P, M>> {
  const res = await fetch(path.toString(), {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json() as Promise<ApiResponse<P, M>>;
}

// Usage
const users = await apiRequest('/users', 'GET');      // UserType[]
const oneUser = await apiRequest('/users/:id', 'GET'); // UserType`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Typed Event Emitter
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`interface AppEvents {
  'user:login':   { userId: string; timestamp: number };
  'user:logout':  { userId: string };
  'post:created': { postId: string; authorId: string };
  'error':        { message: string; code: number };
}

class TypedEventEmitter<Events extends Record<string, unknown>> {
  private listeners = new Map<keyof Events, Set<(data: unknown) => void>>();

  on<K extends keyof Events>(event: K, handler: (data: Events[K]) => void): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    const fn = handler as (data: unknown) => void;
    this.listeners.get(event)!.add(fn);
    return () => this.listeners.get(event)!.delete(fn);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    this.listeners.get(event)?.forEach(handler => handler(data));
  }
}

const emitter = new TypedEventEmitter<AppEvents>();

emitter.on('user:login', ({ userId, timestamp }) => {
  console.log(\`User \${userId} logged in at \${timestamp}\`);
});

emitter.emit('user:login', { userId: '123', timestamp: Date.now() });`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Builder Pattern with Type Tracking
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Type-safe query builder
interface QueryState {
  table: string | null;
  conditions: string[];
  columns: string[];
  limitVal: number | null;
}

class QueryBuilder<HasTable extends boolean = false> {
  private state: QueryState = {
    table: null, conditions: [], columns: [], limitVal: null
  };

  from(tableName: string): QueryBuilder<true> {
    this.state.table = tableName;
    return this as unknown as QueryBuilder<true>;
  }

  select(...cols: string[]): this {
    this.state.columns = cols;
    return this;
  }

  where(condition: string): this {
    this.state.conditions.push(condition);
    return this;
  }

  limit(n: number): this {
    this.state.limitVal = n;
    return this;
  }

  // Only callable when HasTable extends true
  build(this: QueryBuilder<true>): string {
    const cols = this.state.columns.length ? this.state.columns.join(', ') : '*';
    const where = this.state.conditions.length
      ? \` WHERE \${this.state.conditions.join(' AND ')}\`
      : '';
    const lim = this.state.limitVal !== null ? \` LIMIT \${this.state.limitVal}\` : '';
    return \`SELECT \${cols} FROM \${this.state.table}\${where}\${lim}\`;
  }
}

const query = new QueryBuilder()
  .from('users')
  .select('id', 'name')
  .where('age > 18')
  .limit(10)
  .build(); // "SELECT id, name FROM users WHERE age > 18 LIMIT 10"`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Type-Safe Form Handling with Zod Inference
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Without Zod — manual approach
interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

// Generic form validator
type ValidationErrors<T> = Partial<Record<keyof T, string>>;

function validateForm<T extends Record<string, unknown>>(
  data: unknown,
  rules: { [K in keyof T]: (val: unknown) => string | null }
): { valid: true; data: T } | { valid: false; errors: ValidationErrors<T> } {
  const errors: ValidationErrors<T> = {};
  const result = {} as T;

  for (const key in rules) {
    const val = (data as Record<string, unknown>)[key];
    const error = rules[key](val);
    if (error) {
      errors[key] = error;
    } else {
      result[key] = val as T[typeof key];
    }
  }

  const hasErrors = Object.keys(errors).length > 0;
  return hasErrors
    ? { valid: false, errors }
    : { valid: true, data: result };
}

// Usage
const result = validateForm<LoginForm>(
  { email: 'alice@example.com', password: 'hunter2!' },
  {
    email: (v) => typeof v === 'string' && v.includes('@') ? null : 'Invalid email',
    password: (v) => typeof v === 'string' && v.length >= 8 ? null : 'Min 8 chars',
    remember: () => null,
  }
);

if (result.valid) {
  console.log(result.data.email); // string — fully typed
}`}</code></pre>

      {/* Section: Generic Utility Type Reference Table */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        TypeScript Built-in Utility Types — Quick Reference
      </h2>
      <p>
        All of these are defined in TypeScript&apos;s <code>lib.es5.d.ts</code> using the generic type features
        covered in this guide.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Utility Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Transforms</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Partial{'<T>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>All properties optional</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Partial{'<User>'}</code> → all fields <code>?</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Required{'<T>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>All properties required</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Removes all <code>?</code> modifiers</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Readonly{'<T>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>All properties readonly</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Prevents mutation after creation</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Record{'<K, V>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Map K keys to V values</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Record{'<string, number>'}</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Pick{'<T, K>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Keep only keys K from T</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Pick{'<User, "id" | "name">'}</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Omit{'<T, K>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Remove keys K from T</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Omit{'<User, "password">'}</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Extract{'<T, U>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Keep union members in U</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Extract{'<"a"|"b"|"c", "a"|"c">'}</code> → <code>"a"|"c"</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Exclude{'<T, U>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Remove union members in U</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Exclude{'<string|null, null>'}</code> → <code>string</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>NonNullable{'<T>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Remove null and undefined</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>NonNullable{'<string | null>'}</code> → <code>string</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>ReturnType{'<T>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Return type of function T</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>ReturnType{'<typeof fetch>'}</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Parameters{'<T>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Tuple of function param types</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Parameters{'<typeof console.log>'}</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Awaited{'<T>'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Unwrap nested Promises</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Awaited{'<Promise<Promise<number>>>'}</code> → <code>number</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section: Recursive Generic Types */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Recursive Generic Types — JSON, Tree, and Deep Transformations
      </h2>
      <p>
        TypeScript supports recursive type aliases, enabling you to describe types like JSON values, nested
        trees, and deeply nested transformations.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Type-safe JSON
type JSONPrimitive = string | number | boolean | null;
type JSONObject = { [key: string]: JSONValue };
type JSONArray  = JSONValue[];
type JSONValue  = JSONPrimitive | JSONObject | JSONArray;

const json: JSONValue = {
  name: 'Alice',
  scores: [100, 200, 300],
  meta: { active: true, tags: ['admin', 'user'] },
};

// Binary tree
interface TreeNode<T> {
  value: T;
  left:  TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function treeMap<T, U>(node: TreeNode<T> | null, fn: (val: T) => U): TreeNode<U> | null {
  if (!node) return null;
  return {
    value: fn(node.value),
    left:  treeMap(node.left, fn),
    right: treeMap(node.right, fn),
  };
}

// Deep readonly — makes all nested properties readonly
type DeepReadonly<T> =
  T extends (infer U)[]
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

interface Config {
  server: { host: string; port: number };
  db:     { url: string; pool: { min: number; max: number } };
}

type ImmutableConfig = DeepReadonly<Config>;
// All nested fields are readonly — even deeply nested port and min/max

// Deep flatten — flatten all nested arrays
type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;
type F = Flatten<number[][][]>; // number`}</code></pre>

      {/* Section: Discriminated Unions and Generics */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Discriminated Unions with Generics — Result and Option Types
      </h2>
      <p>
        Combining discriminated unions with generics produces powerful, type-safe result types that eliminate
        runtime errors by making error handling mandatory at the type level.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Result<T, E> — explicit success or failure
type Result<T, E = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: 'Division by zero' };
  return { ok: true, value: a / b };
}

const r = divide(10, 2);
if (r.ok) {
  console.log(r.value); // number — TypeScript knows this is the success case
} else {
  console.error(r.error); // string
}

// Option<T> — nullable without null (like Rust's Option<T>)
type Option<T> =
  | { some: true;  value: T }
  | { some: false };

const none: Option<never> = { some: false };
function some<T>(value: T): Option<T> { return { some: true, value }; }

function findUser(id: string): Option<UserType> {
  const users: UserType[] = [{ id: '1', name: 'Alice', email: 'a@b.com' }];
  const user = users.find(u => u.id === id);
  return user ? some(user) : none;
}

const maybeUser = findUser('1');
if (maybeUser.some) {
  console.log(maybeUser.value.name); // TypeScript narrows to { some: true; value: UserType }
}

// Generic Result helpers
function mapResult<T, U, E>(result: Result<T, E>, fn: (val: T) => U): Result<U, E> {
  return result.ok ? { ok: true, value: fn(result.value) } : result;
}

function flatMapResult<T, U, E>(
  result: Result<T, E>,
  fn: (val: T) => Result<U, E>
): Result<U, E> {
  return result.ok ? fn(result.value) : result;
}`}</code></pre>

      {/* Section: tsconfig settings for generics */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        tsconfig Settings That Affect Generic Behavior
      </h2>
      <p>
        Several TypeScript compiler options change how generics are checked and inferred. Understanding these
        settings helps you get the most out of the type system.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Option</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Effect on Generics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>strict</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Enables strictFunctionTypes, strictNullChecks — essential for correct variance and null-safety in generics</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>strictFunctionTypes</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Enforces contravariance for function parameters — prevents unsafe function type substitution</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>noImplicitAny</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Forces explicit generic type arguments when inference would resolve to <code>any</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>useUnknownInCatchVariables</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Makes catch clause error type <code>unknown</code> instead of <code>any</code> — safer for generic error types</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>exactOptionalPropertyTypes</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Distinguishes <code>undefined</code> from missing key in mapped types with optional properties</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section: Generic Gotchas */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Common Generic Pitfalls and How to Avoid Them
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// ❌ PITFALL 1: Using 'any' instead of generics
function badIdentity(arg: any): any { return arg; }
const r1 = badIdentity('hello'); // r1 is 'any' — type info lost

// ✅ FIX: Use a generic
function goodIdentity<T>(arg: T): T { return arg; }
const r2 = goodIdentity('hello'); // r2 is 'string' — preserved

// ❌ PITFALL 2: Over-constraining with specific types
function processItems(items: string[]): string[] {
  return items.map(i => i.toUpperCase());
}
// This ONLY works for strings — not reusable

// ✅ FIX: Use generics with minimal constraints
function transformItems<T>(items: T[], transform: (item: T) => T): T[] {
  return items.map(transform);
}

// ❌ PITFALL 3: Forgetting distributive behavior of conditional types
type Wrap<T> = T extends unknown ? { value: T } : never;
type Result = Wrap<string | number>;
// Result = { value: string } | { value: number }  (distributed!)
// NOT { value: string | number }

// ✅ FIX: Wrap in tuple to prevent distribution
type WrapUnion<T> = [T] extends [unknown] ? { value: T } : never;
type Result2 = WrapUnion<string | number>;
// { value: string | number }

// ❌ PITFALL 4: Using generic type parameter in wrong position
interface BadContainer<T> {
  items: T[];
  addItem(item: string): void; // T not used — should be T
}

// ✅ FIX: Use the type parameter consistently
interface GoodContainer<T> {
  items: T[];
  addItem(item: T): void;
}

// ❌ PITFALL 5: Calling .toUpperCase() without a string constraint
function upper<T>(s: T): string {
  return (s as unknown as string).toUpperCase(); // unsafe cast
}

// ✅ FIX: Constrain T to string
function upperStr<T extends string>(s: T): Uppercase<T> {
  return s.toUpperCase() as Uppercase<T>;
}`}</code></pre>

      {/* Section: Generic HOF patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Generic Higher-Order Functions — memoize, retry, and debounce
      </h2>
      <p>
        Higher-order functions (functions that take or return functions) are a natural fit for generics because
        they need to preserve the type signatures of the functions they wrap.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Typed memoize — preserves the function signature exactly
function memoize<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  }) as T;
}

function expensiveCalc(n: number): number { return n * n; }
const memoCalc = memoize(expensiveCalc);
memoCalc(5); // number — return type preserved

// Typed retry — retries an async function N times on failure
async function retry<T>(
  fn: () => Promise<T>,
  retries: number,
  delayMs = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise(resolve => setTimeout(resolve, delayMs));
    return retry(fn, retries - 1, delayMs * 2);
  }
}

const data = await retry(() => fetch('/api/data').then(r => r.json()), 3);
// data is 'any' from fetch — but works with typed fetch wrappers too

// Typed debounce — preserves parameter types
function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  waitMs: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), waitMs);
  };
}

function onSearch(query: string, page: number): void {
  console.log(\`Searching: \${query} page \${page}\`);
}
const debouncedSearch = debounce(onSearch, 300);
debouncedSearch('hello', 1); // (query: string, page: number) => void — typed!

// Typed once — run function at most once
function once<T extends (...args: unknown[]) => unknown>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!called) {
      called = true;
      result = fn(...args) as ReturnType<T>;
    }
    return result;
  }) as T;
}

const initApp = once((port: number) => {
  console.log(\`Starting on port \${port}\`);
  return { port };
});
initApp(3000); // runs — returns { port: number }
initApp(4000); // no-op — returns cached result`}</code></pre>

      {/* Section: Generic middleware pipeline */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Generic Middleware Pipeline — Type-Safe Composition
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Type-safe pipe — compose functions left to right
type Pipe<T extends unknown[], R> =
  T extends [infer First, ...infer Rest]
    ? First extends (arg: infer A) => infer B
      ? Rest extends [(arg: B) => unknown, ...unknown[]]
        ? Pipe<Rest, R>
        : never
      : never
    : R;

// Simple runtime pipe for two-step example
function pipe2<A, B, C>(
  fn1: (a: A) => B,
  fn2: (b: B) => C
): (a: A) => C {
  return (a) => fn2(fn1(a));
}

const double    = (n: number): number  => n * 2;
const stringify = (n: number): string  => String(n);
const trim      = (s: string): string  => s.trim();

const doubleThenStringify = pipe2(double, stringify);
const result = doubleThenStringify(21); // "42" — string

// Middleware context pattern
interface Context<T extends object> {
  data: T;
  meta: Record<string, unknown>;
}

type Middleware<T extends object, U extends object> =
  (ctx: Context<T>, next: (ctx: Context<U>) => void) => void;

function composeMiddleware<T extends object>(
  middlewares: Middleware<T, T>[]
): (ctx: Context<T>) => void {
  return (ctx) => {
    let index = -1;
    function dispatch(i: number, c: Context<T>): void {
      if (i <= index) throw new Error('next() called multiple times');
      index = i;
      const fn = middlewares[i];
      if (!fn) return;
      fn(c, (next) => dispatch(i + 1, next as Context<T>));
    }
    dispatch(0, ctx);
  };
}`}</code></pre>

      {/* Quick Tool CTA */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0 }}>
          <strong>Quick Tool:</strong> Convert TypeScript to JavaScript instantly with our{' '}
          <Link href="https://viadreams.cc/en/tools/typescript-to-javascript" style={{ color: '#2563eb', fontWeight: 600 }}>
            TypeScript to JavaScript converter
          </Link>
          {' '}— paste your generic TypeScript code and see the compiled output in real time, online and free.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Generics are type-level functions</strong>: <code>{'<T>'}</code> is a parameter that captures a type at the call site through inference — explicit annotation is rarely needed.</li>
          <li><strong>Constraints narrow valid types</strong>: use <code>T extends SomeType</code> to require properties; use <code>K extends keyof T</code> for type-safe property access.</li>
          <li><strong>Conditional types compute types</strong>: <code>T extends U ? X : Y</code> is type-level if/else; <code>infer</code> extracts types from patterns like return types and array elements.</li>
          <li><strong>Mapped types transform shapes</strong>: iterate over <code>keyof T</code> with modifier changes; use <code>as</code> clause (TS 4.1+) for key remapping and filtering.</li>
          <li><strong>Template literal types type strings</strong>: union distribution produces all permutations, enabling typed route params, event names, and CSS properties.</li>
          <li><strong>Learn the built-in utility types</strong>: Awaited, Parameters, ReturnType, ConstructorParameters, InstanceType, OmitThisParameter, Extract, Exclude.</li>
          <li><strong>Function parameters are contravariant</strong>: a function accepting a base type can substitute for one accepting a subtype with <code>--strictFunctionTypes</code>.</li>
          <li><strong>Use <code>in</code>/<code>out</code> variance annotations</strong> (TS 4.7) for generic interfaces to document intent and enable compiler variance checks.</li>
          <li><strong>Zod + <code>z.infer</code> eliminates duplicate type definitions</strong>: define your schema once and derive both runtime validation and compile-time types from it.</li>
          <li><strong>Real patterns are composable</strong>: typed event emitters, API clients, and builders all combine generics + constraints + conditional types into reusable, type-safe abstractions.</li>
          <li><strong>Enable <code>strict</code> mode</strong>: <code>strictFunctionTypes</code> enforces contravariance for function parameters, catching subtle subtype-safety bugs in generic code.</li>
          <li><strong>Recursive generics model nested data</strong>: use recursive type aliases for JSON, trees, and deep transformations like <code>DeepPartial{'<T>'}</code> and <code>DeepReadonly{'<T>'}</code>.</li>
          <li><strong>Higher-order function wrappers preserve types</strong>: use <code>Parameters{'<T>'}</code> and <code>ReturnType{'<T>'}</code> to preserve the wrapped function&apos;s full signature in memoize, debounce, and retry utilities.</li>
          <li><strong>Result{'<T, E>'} makes error handling explicit</strong>: discriminated union result types force callers to handle both success and failure cases at the type level, eliminating forgotten catch blocks.</li>
        </ul>
      </div>
    </article>
  );
}
