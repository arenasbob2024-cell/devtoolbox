'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'TypeScript Decorators Guide: Class, Method, Property, and Parameter Decorators — 2025',
    description:
      'Master TypeScript decorators with this complete guide. Covers class, method, property, parameter, and accessor decorators, decorator factories, composition, reflect-metadata, NestJS DI patterns, TypeORM entities, and a mini DI container walkthrough. Includes TC39 Stage 3 vs legacy experimental comparison.',
    content: 'en',
  },
  zh: {
    title: 'TypeScript 装饰器完整指南：类、方法、属性与参数装饰器 — 2025',
    description:
      '全面掌握 TypeScript 装饰器：类装饰器、方法装饰器、属性装饰器、参数装饰器、访问器装饰器、装饰器工厂、组合模式、reflect-metadata、NestJS 依赖注入、TypeORM 实体装饰器，以及手写迷你 DI 容器演示。包含 TC39 Stage 3 与 experimentalDecorators 完整对比表。',
    content: 'zh',
  },
};

export default function TypescriptDecoratorsGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between TC39 Stage 3 decorators and TypeScript experimentalDecorators?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TC39 Stage 3 decorators (supported natively in TypeScript 5.0+ without any tsconfig flag) follow the finalized ECMAScript proposal. Legacy experimentalDecorators require "experimentalDecorators: true" in tsconfig.json and use an older, incompatible API where method decorators receive (target, propertyKey, descriptor) instead of (value, context). TC39 decorators add a context object with name, kind, metadata, and addInitializer. They also introduce the "accessor" keyword for auto-accessors. The two systems cannot be mixed in the same file. Major frameworks like NestJS and Angular still use legacy decorators; new projects should prefer TC39 decorators.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I enable TypeScript decorators in tsconfig.json?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For TC39 Stage 3 decorators (TypeScript 5.0+), no special flag is needed — just set "target" to "ES2022" or higher. For legacy experimental decorators (used by NestJS, Angular, TypeORM), add "experimentalDecorators": true to compilerOptions. To use Reflect.metadata for dependency injection, also add "emitDecoratorMetadata": true and install the reflect-metadata package. Example: { "compilerOptions": { "target": "ES2022", "experimentalDecorators": true, "emitDecoratorMetadata": true } }.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a decorator factory and when should I use one?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A decorator factory is a function that returns a decorator function, allowing you to pass parameters to the decorator. Instead of @log you write @log({ level: "debug" }). Factories are used when the decorator needs to be configurable: @Column({ type: "varchar", length: 100 }) in TypeORM, @Get("/users") in NestJS, @MinLength(8) in class-validator. Use a factory whenever the decorator behavior needs to vary by usage. Without a factory you can still use closure variables in the decorator file, but factories are the conventional approach.',
        },
      },
      {
        '@type': 'Question',
        name: 'In what order do stacked decorators execute?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stacked decorators are evaluated top-to-bottom (outer to inner) but called bottom-to-top (inner to outer), following mathematical function composition: @f @g method means f(g(method)). Evaluation order: factory expressions run top-to-bottom; resulting decorator functions run bottom-to-top. For class vs method vs property decorators, evaluation order is: parameter decorators run first, then method/accessor/property decorators, then class decorators. This predictable order matters when decorators depend on each other, such as a validator that must run before a logger.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is reflect-metadata and why is it needed for decorators?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'reflect-metadata is a polyfill for the Reflect.metadata API, which lets decorators attach and retrieve metadata from class constructors, methods, and properties. When emitDecoratorMetadata is enabled in tsconfig, TypeScript automatically emits Reflect.metadata("design:type"), Reflect.metadata("design:paramtypes"), and Reflect.metadata("design:returntype") calls. Dependency injection containers like NestJS and InversifyJS use Reflect.getMetadata("design:paramtypes", Target) at runtime to discover constructor parameter types and resolve dependencies automatically. Install with: npm install reflect-metadata, then import "reflect-metadata" once at your app entry point.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can decorators be used on plain functions, not just class members?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Both TC39 Stage 3 and legacy TypeScript decorators can only be applied to class declarations, class methods, class fields/properties, class accessors, and constructor parameters. They cannot decorate standalone functions, arrow functions, object literals, or module exports. If you need decorator-like behavior on a plain function, use a higher-order function (a function that takes a function and returns a wrapped version). Frameworks that appear to decorate non-class code (like some Express middleware libraries) are using conventional naming patterns, not the TypeScript decorator syntax.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I build a simple dependency injection container with decorators?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A minimal DI container uses a @Injectable class decorator that registers the class in a container registry, and reads design:paramtypes metadata to discover dependencies. The container resolve(token) method recursively resolves each dependency by looking up its constructor, resolving its own dependencies, and calling new Constructor(...deps). This is the core pattern used by InversifyJS and NestJS IoC containers. You need experimentalDecorators: true, emitDecoratorMetadata: true in tsconfig, and import "reflect-metadata" before any decorated classes are loaded.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are accessor decorators and the new "accessor" keyword in TypeScript 5.0?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TypeScript 5.0 introduced the "accessor" keyword for auto-accessors: "accessor name = value" auto-generates a getter/setter pair backed by a private storage field. Accessor decorators (ClassAccessorDecoratorContext) can intercept both get and set operations by returning a new { get, set, init } object. This enables observable/reactive patterns without manually writing getter/setter pairs. Legacy decorators could only decorate existing get/set accessor definitions with a PropertyDescriptor; they could not intercept plain property assignments. The "accessor" keyword is exclusive to TC39 decorators and has no legacy equivalent.',
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

      <link rel="canonical" href="https://viadreams.cc/en/blog/typescript-decorators-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', margin: '0 0 0.5rem 0' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          TypeScript <strong>decorators</strong> are special syntax (<code>@expression</code>) that attach to classes, methods, properties, or parameters to add metadata or modify behavior at design time. TypeScript 5.0 ships <strong>TC39 Stage 3 decorators</strong> natively (no config needed); older frameworks use <strong>legacy experimentalDecorators</strong>. Key patterns: <code>@log</code> wraps methods; <code>@Injectable</code> registers DI tokens; <code>@Column</code> maps ORM fields. Use <Link href={`/${lang}/tools/typescript-to-javascript`} style={{ color: '#0284c7' }}>our TypeScript converter</Link> to check your decorator output.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b', margin: '0 0 0.75rem 0' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>TC39 decorators (TS 5.0+) need no tsconfig flag; legacy decorators require <code>experimentalDecorators: true</code></li>
          <li>Class decorators can replace or extend a class; method decorators wrap function behavior</li>
          <li>Decorator factories enable parameterized decorators: <code>@retry(3, 500)</code></li>
          <li>Stacked decorators evaluate top-to-bottom but execute bottom-to-top (function composition order)</li>
          <li><code>reflect-metadata</code> + <code>emitDecoratorMetadata</code> unlocks runtime type reflection for DI containers</li>
          <li>NestJS, Angular, TypeORM all rely on legacy experimental decorators — migration to TC39 is ongoing</li>
          <li>The new <code>accessor</code> keyword (TS 5.0) enables observable/reactive field patterns without manual getters</li>
        </ul>
      </div>

      {/* Section 1 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        What Are TypeScript Decorators?
      </h2>
      <p>
        <strong>Decorators</strong> are a special kind of declaration that can be attached to a class, method, accessor, property, or parameter using the <code>@expression</code> syntax. The expression must evaluate to a function that is called at runtime with information about the decorated declaration. Decorators originated from Python&#39;s decorator pattern and Java&#39;s annotations, and were popularized in the TypeScript ecosystem by Angular and NestJS before becoming a formal ECMAScript proposal.
      </p>
      <p>
        The core appeal of decorators is <strong>declarative, cross-cutting behavior</strong>: instead of manually wrapping every method call in a try/catch for logging, you attach <code>@log</code> once. Instead of manually registering every service in a DI container, you annotate the class with <code>@Injectable()</code>. This separation of concerns is the foundation of Aspect-Oriented Programming (AOP) in TypeScript.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        TC39 Proposal: Stage 3 Status
      </h3>
      <p>
        The ECMAScript decorators proposal has had a long history. An early Stage 1 design was what TypeScript&#39;s legacy <code>experimentalDecorators</code> implemented. The proposal was substantially redesigned, and in 2022 it reached <strong>Stage 3</strong> — meaning the API is finalized and implementations can begin. TypeScript 5.0 (released March 2023) was the first TypeScript version to implement TC39 Stage 3 decorators. The two systems are <strong>incompatible</strong>: you cannot mix them in the same file, and each has distinct APIs.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Enabling Decorators in tsconfig.json
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// tsconfig.json — TC39 Standard Decorators (TypeScript 5.0+)
// No special flag is needed. Just target ES2022 or higher.
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "strict": true
  }
}

// tsconfig.json — Legacy Experimental Decorators
// Required by Angular, NestJS, TypeORM, MobX, class-validator
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,   // enables runtime type reflection
    "strict": true
  }
}

// Install reflect-metadata polyfill for DI patterns (legacy only)
// npm install reflect-metadata
// Then add at your app entry point (e.g., main.ts):
import 'reflect-metadata';`}</code></pre>

      {/* Section 2 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Class Decorators
      </h2>
      <p>
        A class decorator is applied to the class constructor. In TC39 decorators, the signature is <code>(target: Function, context: ClassDecoratorContext) =&gt; Function | void</code>. You can return a new class (replacing the original) or modify the original in place. In legacy decorators, the signature is simply <code>(constructor: Function) =&gt; void</code> or a new constructor.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Adding Metadata (TC39)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// TC39 class decorator: attach metadata via context.metadata
function entity(tableName: string) {
  return function <T extends abstract new (...args: any[]) => {}>(
    target: T,
    context: ClassDecoratorContext
  ) {
    // context.metadata is a shared object for this class hierarchy
    context.metadata['tableName'] = tableName;
    context.metadata['entity'] = true;
    return target;
  };
}

function column(options: { type: string; nullable?: boolean }) {
  return function (_value: undefined, context: ClassFieldDecoratorContext) {
    context.metadata['columns'] ??= [];
    (context.metadata['columns'] as any[]).push({
      name: context.name,
      ...options,
    });
  };
}

@entity('users')
class User {
  @column({ type: 'varchar' })
  name: string = '';

  @column({ type: 'varchar', nullable: false })
  email: string = '';
}

// Access metadata at runtime
const meta = (User as any)[Symbol.metadata];
console.log(meta.tableName);  // 'users'
console.log(meta.columns);    // [{ name: 'name', type: 'varchar' }, ...]`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Modifying Class Behavior: Sealed and Frozen
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Prevent modification of class and its prototype
function sealed<T extends abstract new (...args: any[]) => {}>(
  target: T,
  context: ClassDecoratorContext
) {
  Object.seal(target);
  Object.seal(target.prototype);
}

// Add automatic timestamp fields to any class
function withTimestamps<T extends new (...args: any[]) => {}>(
  target: T,
  context: ClassDecoratorContext
) {
  return class extends target {
    readonly createdAt: Date = new Date();
    updatedAt: Date = new Date();

    touch() {
      (this as any).updatedAt = new Date();
    }
  };
}

@sealed
@withTimestamps
class Product {
  constructor(
    public name: string,
    public price: number
  ) {}
}

const p = new Product('Widget', 9.99);
console.log((p as any).createdAt); // Date object
(p as any).touch();                 // updates updatedAt`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Singleton Pattern with Class Decorator
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Singleton: ensure only one instance exists per class
function singleton<T extends new (...args: any[]) => {}>(
  target: T,
  context: ClassDecoratorContext
) {
  let instance: InstanceType<T> | undefined;

  return new Proxy(target, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args) as InstanceType<T>;
      }
      return instance!;
    },
  }) as T;
}

@singleton
class DatabaseConnection {
  readonly id = Math.random();
  constructor(public connectionString: string) {
    console.log('Creating new connection to', connectionString);
  }
  query(sql: string) { /* ... */ }
}

const db1 = new DatabaseConnection('postgres://localhost/mydb');
const db2 = new DatabaseConnection('postgres://localhost/other');
console.log(db1 === db2); // true — same instance
console.log(db1.id === db2.id); // true`}</code></pre>

      {/* Section 3 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Method Decorators
      </h2>
      <p>
        Method decorators intercept method calls. In TC39 decorators, a method decorator receives <code>(target: Function, context: ClassMethodDecoratorContext)</code> and returns a replacement function or void. The context object provides <code>name</code>, <code>kind</code>, <code>static</code>, <code>private</code>, and <code>addInitializer</code>. This is where decorators shine for cross-cutting concerns.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Logging and Timing
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Structured logging decorator (TC39)
function log(options: { level?: 'info' | 'warn' | 'error' } = {}) {
  return function (target: Function, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);
    const level = options.level ?? 'info';

    return function (this: any, ...args: any[]) {
      const start = performance.now();
      console[level](\`[\${methodName}] called with\`, args);
      try {
        const result = target.call(this, ...args);
        // Handle promises transparently
        if (result instanceof Promise) {
          return result
            .then((val) => {
              const ms = (performance.now() - start).toFixed(2);
              console[level](\`[\${methodName}] resolved in \${ms}ms →\`, val);
              return val;
            })
            .catch((err) => {
              console.error(\`[\${methodName}] rejected after\`,
                (performance.now() - start).toFixed(2), 'ms:', err);
              throw err;
            });
        }
        const ms = (performance.now() - start).toFixed(2);
        console[level](\`[\${methodName}] returned in \${ms}ms →\`, result);
        return result;
      } catch (err) {
        console.error(\`[\${methodName}] threw:\`, err);
        throw err;
      }
    };
  };
}

// Standalone timing decorator
function timing(target: Function, context: ClassMethodDecoratorContext) {
  const name = String(context.name);
  return async function (this: any, ...args: any[]) {
    const start = performance.now();
    try {
      return await target.call(this, ...args);
    } finally {
      console.log(\`\${name}: \${(performance.now() - start).toFixed(2)}ms\`);
    }
  };
}

class ReportService {
  @log({ level: 'info' })
  generateReport(userId: string, type: string) {
    return { userId, type, data: [] };
  }

  @timing
  async fetchFromDatabase(query: string): Promise<any[]> {
    return []; // simulate DB call
  }
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Memoization
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Memoize caches method results keyed by serialized arguments
function memoize(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  // Each instance gets its own cache via WeakMap
  const cacheMap = new WeakMap<object, Map<string, any>>();

  return function (this: any, ...args: any[]) {
    if (!cacheMap.has(this)) {
      cacheMap.set(this, new Map());
    }
    const cache = cacheMap.get(this)!;
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = target.call(this, ...args);
    cache.set(key, result);
    return result;
  };
}

// TTL (time-to-live) cache: expire results after N milliseconds
function cache(ttlMs: number) {
  return function (target: Function, context: ClassMethodDecoratorContext) {
    const store = new Map<string, { value: any; expiresAt: number }>();

    return function (this: any, ...args: any[]) {
      const key = JSON.stringify(args);
      const entry = store.get(key);
      if (entry && Date.now() < entry.expiresAt) {
        return entry.value;
      }
      const value = target.call(this, ...args);
      store.set(key, { value, expiresAt: Date.now() + ttlMs });
      return value;
    };
  };
}

class MathUtils {
  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  @cache(60_000) // cache results for 1 minute
  expensiveCalc(x: number, y: number): number {
    // Simulate heavy computation
    return x ** y;
  }
}

const mu = new MathUtils();
console.log(mu.fibonacci(40)); // fast due to memoization`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Rate Limiting and Retry
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Rate limit: cap calls to N per windowMs
function rateLimit(maxCalls: number, windowMs: number) {
  return function (target: Function, context: ClassMethodDecoratorContext) {
    const calls: number[] = [];
    return function (this: any, ...args: any[]) {
      const now = Date.now();
      // Evict calls outside the sliding window
      while (calls.length && calls[0] < now - windowMs) calls.shift();
      if (calls.length >= maxCalls) {
        const waitMs = calls[0]! + windowMs - now;
        throw new Error(
          "Rate limit: max " + maxCalls + " calls/" + windowMs + "ms. " +
          "Retry in " + waitMs + "ms"
        );
      }
      calls.push(now);
      return target.call(this, ...args);
    };
  };
}

// Retry with exponential backoff
function retry(maxAttempts: number, baseDelayMs = 200) {
  return function (target: Function, context: ClassMethodDecoratorContext) {
    return async function (this: any, ...args: any[]) {
      let lastError: unknown;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await target.call(this, ...args);
        } catch (err) {
          lastError = err;
          if (attempt < maxAttempts) {
            const delay = baseDelayMs * 2 ** (attempt - 1); // exponential
            console.warn(
              \`Attempt \${attempt}/\${maxAttempts} failed, retrying in \${delay}ms\`
            );
            await new Promise((r) => setTimeout(r, delay));
          }
        }
      }
      throw lastError;
    };
  };
}

class ExternalApiService {
  @rateLimit(10, 60_000) // max 10 requests per minute
  @retry(3, 500)         // retry up to 3 times with backoff
  async callApi(endpoint: string): Promise<unknown> {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
    return res.json();
  }
}`}</code></pre>

      {/* Section 4 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Property Decorators
      </h2>
      <p>
        Property decorators in TC39 decorators are called <strong>field decorators</strong>. A field decorator has the signature <code>(_value: undefined, context: ClassFieldDecoratorContext) =&gt; initializer | void</code>. Returning a function acts as an initializer: it receives the initial value and returns the actual value to store. This enables validation, transformation, and default injection at instance creation time.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Validation and Transformation
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Required field: throw if initial value is falsy
function required(_value: undefined, context: ClassFieldDecoratorContext) {
  return function (this: any, initial: any) {
    if (initial === undefined || initial === null || initial === '') {
      throw new Error(\`Field "\${String(context.name)}" is required\`);
    }
    return initial;
  };
}

// Min-length string validator
function minLength(min: number) {
  return function (_value: undefined, context: ClassFieldDecoratorContext) {
    return function (this: any, initial: string) {
      if (typeof initial === 'string' && initial.length < min) {
        throw new Error(
          \`Field "\${String(context.name)}" must be >= \${min} chars (got \${initial.length})\`
        );
      }
      return initial;
    };
  };
}

// Trim whitespace on initialization
function trim(_value: undefined, context: ClassFieldDecoratorContext) {
  return function (this: any, initial: string) {
    return typeof initial === 'string' ? initial.trim() : initial;
  };
}

// Transform to lowercase
function lowercase(_value: undefined, context: ClassFieldDecoratorContext) {
  return function (this: any, initial: string) {
    return typeof initial === 'string' ? initial.toLowerCase() : initial;
  };
}

// Clamp number to a range
function clamp(min: number, max: number) {
  return function (_value: undefined, context: ClassFieldDecoratorContext) {
    return function (this: any, initial: number) {
      return Math.max(min, Math.min(max, initial));
    };
  };
}

class UserProfile {
  @required
  @minLength(2)
  @trim
  name: string = '  Alice  ';       // stored as 'Alice'

  @lowercase
  @trim
  email: string = '  ALICE@EX.COM '; // stored as 'alice@ex.com'

  @clamp(0, 150)
  age: number = 200;                 // clamped to 150

  @required
  id: string = crypto.randomUUID();
}

const profile = new UserProfile();
console.log(profile.name);   // 'Alice'
console.log(profile.email);  // 'alice@ex.com'
console.log(profile.age);    // 150`}</code></pre>

      {/* Section 5 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Parameter Decorators
      </h2>
      <p>
        Parameter decorators are only available in <strong>legacy experimental decorators</strong> — TC39 Stage 3 decorators do not yet include parameter decorators. They are heavily used in NestJS for route parameter extraction (<code>@Param()</code>, <code>@Body()</code>, <code>@Query()</code>) and in InversifyJS for named injection tokens. A parameter decorator has the signature <code>(target: Object, propertyKey: string | symbol, parameterIndex: number) =&gt; void</code>.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Legacy parameter decorators (requires experimentalDecorators: true)
import 'reflect-metadata';

const PARAM_METADATA_KEY = Symbol('param_metadata');

interface ParamMetadata {
  index: number;
  key: string;
  source: 'body' | 'query' | 'param' | 'header';
}

// @Body('key') — extract field from request body
function Body(key?: string) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const existing: ParamMetadata[] =
      Reflect.getMetadata(PARAM_METADATA_KEY, target, propertyKey) ?? [];
    existing.push({ index: parameterIndex, key: key ?? '', source: 'body' });
    Reflect.defineMetadata(PARAM_METADATA_KEY, existing, target, propertyKey);
  };
}

// @Query('key') — extract field from query string
function Query(key: string) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const existing: ParamMetadata[] =
      Reflect.getMetadata(PARAM_METADATA_KEY, target, propertyKey) ?? [];
    existing.push({ index: parameterIndex, key, source: 'query' });
    Reflect.defineMetadata(PARAM_METADATA_KEY, existing, target, propertyKey);
  };
}

// @Param('id') — extract URL route parameter
function Param(key: string) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const existing: ParamMetadata[] =
      Reflect.getMetadata(PARAM_METADATA_KEY, target, propertyKey) ?? [];
    existing.push({ index: parameterIndex, key, source: 'param' });
    Reflect.defineMetadata(PARAM_METADATA_KEY, existing, target, propertyKey);
  };
}

class UserController {
  createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Query('role') role: string
  ) {
    return { name, email, role };
  }

  getUser(@Param('id') id: string) {
    return { id };
  }
}`}</code></pre>

      {/* Section 6 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Accessor Decorators and the <code>accessor</code> Keyword
      </h2>
      <p>
        TypeScript 5.0 introduced a new <code>accessor</code> keyword that auto-generates a getter/setter pair backed by a private storage field. An <strong>accessor decorator</strong> receives a <code>ClassAccessorDecoratorTarget</code> and returns a <code>ClassAccessorDecoratorResult</code> with optional <code>get</code>, <code>set</code>, and <code>init</code> hooks. This is the cleanest way to implement observable/reactive properties.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// TC39 accessor decorator: observable reactive fields
type ChangeListener<T> = (oldValue: T, newValue: T, name: string) => void;

const listeners = new WeakMap<object, Map<string, ChangeListener<any>[]>>();

function observable(
  target: ClassAccessorDecoratorTarget<any, any>,
  context: ClassAccessorDecoratorContext
) {
  const { get: originalGet, set: originalSet } = target;
  const name = String(context.name);

  return {
    get(this: any) {
      return originalGet.call(this);
    },
    set(this: any, newValue: any) {
      const oldValue = originalGet.call(this);
      if (oldValue !== newValue) {
        originalSet.call(this, newValue);
        const listenerMap = listeners.get(this);
        listenerMap?.get(name)?.forEach((fn) => fn(oldValue, newValue, name));
      }
    },
    init(this: any, value: any) {
      if (!listeners.has(this)) listeners.set(this, new Map());
      return value;
    },
  };
}

// Validated accessor: enforce constraints on setter
function validated(validator: (v: any) => boolean, message: string) {
  return function (
    target: ClassAccessorDecoratorTarget<any, any>,
    context: ClassAccessorDecoratorContext
  ) {
    const { get, set } = target;
    return {
      get(this: any) { return get.call(this); },
      set(this: any, value: any) {
        if (!validator(value)) {
          throw new RangeError(
            \`Invalid value "\${value}" for "\${String(context.name)}": \${message}\`
          );
        }
        set.call(this, value);
      },
    };
  };
}

class Store {
  @observable
  accessor count = 0;

  @observable
  @validated((v) => v.length >= 2, 'must be at least 2 characters')
  accessor username = 'guest';

  increment() { this.count++; }
  decrement() { this.count = Math.max(0, this.count - 1); }
}

const store = new Store();
// Attach listener (requires helper not shown for brevity)
store.count = 5;       // triggers observable set
store.username = 'A';  // throws: must be at least 2 characters`}</code></pre>

      {/* Section 7 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Decorator Factories: Parameterized Decorators
      </h2>
      <p>
        A <strong>decorator factory</strong> is a function that returns a decorator. This is the standard way to pass configuration to a decorator. When you write <code>@MinLength(8)</code>, TypeScript first calls <code>MinLength(8)</code>, which returns the actual decorator function that is then applied to the target. All of TypeScript&#39;s most popular decorator usage — NestJS routes, TypeORM columns, class-validator rules — uses decorator factories.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Configurable debounce decorator factory
function debounce(waitMs: number) {
  return function (target: Function, context: ClassMethodDecoratorContext) {
    let timer: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => target.call(this, ...args), waitMs);
    };
  };
}

// Deprecation warning decorator factory
function deprecated(message?: string) {
  return function (target: Function, context: ClassMethodDecoratorContext) {
    const name = String(context.name);
    return function (this: any, ...args: any[]) {
      console.warn(
        "DEPRECATED: " + name + " is deprecated" + (message ? ': ' + message : '') + ". " +
        "Avoid using it in new code."
      );
      return target.call(this, ...args);
    };
  };
}

// Authorization guard decorator factory
function authorize(...requiredRoles: string[]) {
  return function (target: Function, context: ClassMethodDecoratorContext) {
    const name = String(context.name);
    return function (this: any, ...args: any[]) {
      const userRoles: string[] = this.currentUser?.roles ?? [];
      const hasRole = requiredRoles.some((r) => userRoles.includes(r));
      if (!hasRole) {
        throw new Error(
          \`Unauthorized: \${name} requires roles: \${requiredRoles.join(', ')}\`
        );
      }
      return target.call(this, ...args);
    };
  };
}

class SearchComponent {
  currentUser = { roles: ['admin'] };

  @debounce(300)
  onSearchInput(query: string) {
    console.log('Searching for:', query);
  }

  @deprecated('Use findById instead')
  findUser(id: number) {
    return { id };
  }

  @authorize('admin', 'moderator')
  deleteContent(id: string) {
    return \`Deleted \${id}\`;
  }
}`}</code></pre>

      {/* Section 8 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Decorator Composition: Order of Execution
      </h2>
      <p>
        When multiple decorators are applied to a single declaration, they follow <strong>function composition order</strong>: factories are evaluated top-to-bottom, but the resulting decorator functions are executed bottom-to-top. This is identical to <code>f(g(method))</code> where <code>@f</code> is listed above <code>@g</code>. Understanding this order is critical when decorators depend on each other.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Demonstrating decorator composition order
function trace(label: string) {
  return function (target: Function, context: ClassMethodDecoratorContext) {
    console.log(\`Evaluating decorator: \${label}\`);
    return function (this: any, ...args: any[]) {
      console.log(\`Entering: \${label}\`);
      const result = target.call(this, ...args);
      console.log(\`Exiting: \${label}\`);
      return result;
    };
  };
}

class Pipeline {
  @trace('A')    // Evaluated 1st, called 1st (outermost)
  @trace('B')    // Evaluated 2nd, called 2nd
  @trace('C')    // Evaluated 3rd, called 3rd (innermost, wraps original)
  process(data: string) {
    console.log('Processing:', data);
    return data.toUpperCase();
  }
}

// Output when pipeline.process('hello') is called:
// Evaluating decorator: A
// Evaluating decorator: B
// Evaluating decorator: C
// Entering: A
// Entering: B
// Entering: C
// Processing: hello
// Exiting: C
// Exiting: B
// Exiting: A

// Real-world composition pattern:
// Order matters — validate before authorize, log after both
class OrderService {
  @log()           // outermost wrapper
  @authorize('user')
  @validate({ amount: (v) => v > 0 })  // innermost, runs first
  async createOrder(input: { amount: number; item: string }) {
    return { orderId: crypto.randomUUID(), ...input };
  }
}`}</code></pre>

      {/* Section 9 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Metadata Reflection: <code>reflect-metadata</code> and <code>emitDecoratorMetadata</code>
      </h2>
      <p>
        The <code>reflect-metadata</code> package polyfills the <code>Reflect.metadata</code> API, enabling decorators to read and write metadata on class constructors and their members. When <code>emitDecoratorMetadata: true</code> is set in tsconfig, TypeScript automatically emits three metadata keys at compile time:
      </p>
      <ul>
        <li><code>design:type</code> — the declared type of a property</li>
        <li><code>design:paramtypes</code> — array of constructor/method parameter types</li>
        <li><code>design:returntype</code> — return type of a method</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// reflect-metadata usage (legacy decorators)
import 'reflect-metadata';

// Custom metadata keys
const VALIDATION_KEY = Symbol('validations');
const INJECTABLE_KEY = Symbol('injectable');

// Store validation rules in metadata
function IsString(_target: Object, propertyKey: string | symbol) {
  const rules = Reflect.getMetadata(VALIDATION_KEY, _target, propertyKey) ?? [];
  rules.push({ type: 'string' });
  Reflect.defineMetadata(VALIDATION_KEY, rules, _target, propertyKey);
}

function IsNumber(_target: Object, propertyKey: string | symbol) {
  const rules = Reflect.getMetadata(VALIDATION_KEY, _target, propertyKey) ?? [];
  rules.push({ type: 'number' });
  Reflect.defineMetadata(VALIDATION_KEY, rules, _target, propertyKey);
}

// Read emitted design:paramtypes to discover dependencies
function Injectable() {
  return function (target: Function) {
    Reflect.defineMetadata(INJECTABLE_KEY, true, target);
    const types = Reflect.getMetadata('design:paramtypes', target) ?? [];
    console.log(\`\${target.name} depends on:\`, types.map((t: any) => t.name));
  };
}

class Logger {
  log(message: string) { console.log(\`[LOG] \${message}\`); }
}

class Database {
  query(sql: string) { return []; }
}

@Injectable()
class UserService {
  constructor(
    private logger: Logger,   // TypeScript emits Logger in design:paramtypes
    private db: Database      // TypeScript emits Database in design:paramtypes
  ) {}
}
// Console: "UserService depends on: ['Logger', 'Database']"

// Validate an object against its stored metadata rules
function validateObject<T extends object>(obj: T): string[] {
  const errors: string[] = [];
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const rules = Reflect.getMetadata(VALIDATION_KEY, obj, key as string) ?? [];
    const value = obj[key];
    for (const rule of rules) {
      if (rule.type === 'string' && typeof value !== 'string') {
        errors.push(\`\${String(key)} must be a string\`);
      }
      if (rule.type === 'number' && typeof value !== 'number') {
        errors.push(\`\${String(key)} must be a number\`);
      }
    }
  }
  return errors;
}`}</code></pre>

      {/* Section 10 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Real-World Patterns: NestJS and TypeORM
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        NestJS Dependency Injection Decorators
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// NestJS-style decorators (simplified implementation)
import 'reflect-metadata';

const MODULE_METADATA = {
  imports: 'imports',
  controllers: 'controllers',
  providers: 'providers',
  exports: 'exports',
};

function Module(metadata: {
  imports?: any[];
  controllers?: any[];
  providers?: any[];
  exports?: any[];
}) {
  return function (target: Function) {
    for (const [key, value] of Object.entries(metadata)) {
      Reflect.defineMetadata(key, value, target);
    }
  };
}

function Controller(path: string): ClassDecorator {
  return (target) => Reflect.defineMetadata('path', path, target);
}

function Injectable(): ClassDecorator {
  return (target) => Reflect.defineMetadata('injectable', true, target);
}

function Get(path: string): MethodDecorator {
  return (target, key, descriptor) => {
    Reflect.defineMetadata('method', 'GET', descriptor.value!);
    Reflect.defineMetadata('path', path, descriptor.value!);
  };
}

function Post(path: string): MethodDecorator {
  return (target, key, descriptor) => {
    Reflect.defineMetadata('method', 'POST', descriptor.value!);
    Reflect.defineMetadata('path', path, descriptor.value!);
  };
}

function UseGuards(...guards: Function[]): MethodDecorator {
  return (target, key, descriptor) => {
    Reflect.defineMetadata('guards', guards, descriptor.value!);
  };
}

function UseInterceptors(...interceptors: Function[]): MethodDecorator {
  return (target, key, descriptor) => {
    Reflect.defineMetadata('interceptors', interceptors, descriptor.value!);
  };
}

@Injectable()
class UserRepository {
  async findById(id: string) { return { id, name: 'Alice' }; }
  async save(user: any) { return user; }
}

@Injectable()
class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getUser(id: string) { return this.userRepo.findById(id); }
}

@Controller('/users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseInterceptors(LoggingInterceptor)
  findAll() { return this.userService.getUser('all'); }

  @Get('/:id')
  findOne() { return {}; }

  @Post('/')
  @UseGuards(AuthGuard, RolesGuard)
  create() { return {}; }
}

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
class UserModule {}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        TypeORM Entity Decorators
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// TypeORM decorator patterns (real usage)
import {
  Entity, Column, PrimaryGeneratedColumn, Index,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  ManyToOne, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate,
} from 'typeorm';

@Entity('users')
@Index(['email'], { unique: true })
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', select: false }) // excluded from SELECT by default
  passwordHash: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown> | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null; // enables soft delete

  @OneToMany(() => Post, (post) => post.author, { cascade: ['insert', 'update'] })
  posts: Post[];

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    this.email = this.email.toLowerCase().trim();
  }
}

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  slug: string | null;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn()
  createdAt: Date;
}`}</code></pre>

      {/* Section 11 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        TC39 Standard vs Legacy Decorators: Full Comparison
      </h2>
      <p>
        The two decorator systems are <strong>not interchangeable</strong>. The table below summarizes every significant difference to help you decide which to use and how to migrate.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Feature</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Legacy (experimentalDecorators)</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>TC39 Stage 3 (TS 5.0+)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['tsconfig flag', 'experimentalDecorators: true', 'None required'],
              ['TypeScript version', 'All versions supporting decorators', '5.0+'],
              ['Class decorator signature', '(constructor: T) => T | void', '(target: T, ctx: ClassDecoratorContext) => T | void'],
              ['Method decorator signature', '(target, key, descriptor)', '(fn: Function, ctx: ClassMethodDecoratorContext) => Function | void'],
              ['Field/property decorator', 'PropertyDecorator (no initializer)', 'Returns initializer function (receives/returns initial value)'],
              ['Accessor decorator', 'Decorates explicit get/set', 'Decorates "accessor" auto-accessor fields'],
              ['Parameter decorators', 'Supported', 'Not yet in spec'],
              ['Metadata API', 'Reflect.metadata / Reflect.defineMetadata', 'context.metadata (shared object)'],
              ['emitDecoratorMetadata', 'Supported (design:paramtypes etc.)', 'Not applicable'],
              ['Auto-accessor keyword', 'Not available', '"accessor" keyword'],
              ['Decorator order', 'Same', 'Same (bottom-to-top execution)'],
              ['Private fields (#)', 'Limited support', 'Full support via context.private'],
              ['Static members', 'Supported', 'Supported via context.static'],
              ['Framework support', 'Angular, NestJS, TypeORM, MobX, class-validator', 'New libraries; major frameworks migrating'],
              ['Stability', 'Frozen (no new features)', 'Actively maintained, future additions expected'],
            ].map(([feature, legacy, tc39], i) => (
              <tr key={feature} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                <td style={{ padding: '8px 14px', fontWeight: 600, borderBottom: '1px solid #e2e8f0' }}>{feature}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}><code>{legacy}</code></td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0', color: '#0369a1' }}><code>{tc39}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 12 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Building a Mini DI Container with Decorators
      </h2>
      <p>
        To solidify everything, here is a complete, working mini dependency injection container built entirely with legacy decorators and <code>reflect-metadata</code>. This is the conceptual core of NestJS&#39;s and InversifyJS&#39;s IoC containers.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// mini-di.ts — A complete DI container in ~80 lines
import 'reflect-metadata';

// ── Container ──────────────────────────────────────────────────────────
type Constructor<T = any> = new (...args: any[]) => T;

class Container {
  private registry = new Map<string | symbol, Constructor>();
  private singletons = new Map<string | symbol, any>();

  register(token: string | symbol, implementation: Constructor) {
    this.registry.set(token, implementation);
  }

  resolve<T>(token: string | symbol | Constructor<T>): T {
    // If passed a constructor directly, resolve by constructor
    if (typeof token === 'function') {
      return this.instantiate(token as Constructor<T>);
    }
    const Ctor = this.registry.get(token);
    if (!Ctor) throw new Error(\`No provider for token: \${String(token)}\`);
    return this.instantiate<T>(Ctor as Constructor<T>);
  }

  private instantiate<T>(Ctor: Constructor<T>): T {
    // Check singleton cache
    if (this.singletons.has(Ctor as any)) {
      return this.singletons.get(Ctor as any);
    }

    // Read constructor parameter types emitted by TypeScript
    const paramTypes: Constructor[] =
      Reflect.getMetadata('design:paramtypes', Ctor) ?? [];

    // Recursively resolve each dependency
    const deps = paramTypes.map((dep) => {
      if (!dep || dep === Object) {
        throw new Error(
          "Cannot resolve dependency of " + Ctor.name + ": " +
          "check that all params are decorated classes with @Injectable"
        );
      }
      return this.instantiate(dep);
    });

    const instance = new Ctor(...deps);

    // If marked as singleton, cache it
    if (Reflect.getMetadata('singleton', Ctor)) {
      this.singletons.set(Ctor as any, instance);
    }

    return instance;
  }
}

// Global container instance (can be module-scoped in real apps)
export const container = new Container();

// ── Decorators ──────────────────────────────────────────────────────────
function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('injectable', true, target);
  };
}

function Singleton(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('injectable', true, target);
    Reflect.defineMetadata('singleton', true, target);
  };
}

function Inject(token: string | symbol): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    const tokens =
      Reflect.getMetadata('inject:tokens', target, propertyKey!) ?? [];
    tokens[parameterIndex] = token;
    Reflect.defineMetadata('inject:tokens', tokens, target, propertyKey!);
  };
}

// ── Services ───────────────────────────────────────────────────────────
@Singleton()
class ConfigService {
  get(key: string): string {
    return process.env[key] ?? '';
  }
}

@Injectable()
class Logger {
  constructor(private config: ConfigService) {}

  log(message: string) {
    const level = this.config.get('LOG_LEVEL') || 'INFO';
    console.log(\`[\${level}] \${message}\`);
  }
}

@Injectable()
class DatabaseService {
  constructor(
    private logger: Logger,
    private config: ConfigService
  ) {
    this.logger.log('DatabaseService initialized');
  }

  query(sql: string) {
    this.logger.log(\`Executing: \${sql}\`);
    return [];
  }
}

@Injectable()
class UserService {
  constructor(
    private db: DatabaseService,
    private logger: Logger
  ) {}

  findAll() {
    this.logger.log('Finding all users');
    return this.db.query('SELECT * FROM users');
  }
}

// ── Bootstrap ──────────────────────────────────────────────────────────
// Resolve the entire tree automatically
const userService = container.resolve(UserService);
userService.findAll();
// Logs:
// [INFO] DatabaseService initialized
// [INFO] Finding all users
// [INFO] Executing: SELECT * FROM users`}</code></pre>

      {/* Section 13 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        class-validator Integration Pattern
      </h2>
      <p>
        <code>class-validator</code> is one of the most popular decorator-based validation libraries, used extensively in NestJS for DTO validation. It relies entirely on legacy experimental decorators and <code>reflect-metadata</code>. Here is the canonical pattern and how it integrates with NestJS pipes:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// class-validator + class-transformer pattern (NestJS DTOs)
import {
  IsString, IsEmail, IsNumber, IsOptional, IsEnum,
  MinLength, MaxLength, Min, Max, IsUrl, IsBoolean,
  ValidateNested, IsArray, ArrayMinSize,
} from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { validate } from 'class-validator';

enum UserRole {
  Admin = 'admin',
  User = 'user',
  Moderator = 'moderator',
}

class AddressDto {
  @IsString()
  @MinLength(5)
  street: string;

  @IsString()
  city: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2)
  countryCode: string; // e.g. 'US'
}

class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @IsNumber()
  @Min(13)
  @Max(120)
  age: number;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole = UserRole.User;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;

  @ValidateNested()   // validates nested object
  @Type(() => AddressDto)  // needed for class-transformer
  @IsOptional()
  address?: AddressDto;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

// Usage with class-transformer
import { plainToInstance } from 'class-transformer';

async function validateDto(plain: unknown) {
  const dto = plainToInstance(CreateUserDto, plain);
  const errors = await validate(dto);
  if (errors.length > 0) {
    const messages = errors.map((e) =>
      Object.values(e.constraints ?? {}).join(', ')
    );
    throw new Error(\`Validation failed: \${messages.join('; ')}\`);
  }
  return dto;
}

// NestJS ValidationPipe handles this automatically:
// app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));`}</code></pre>

      {/* Section 14 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Practical Decorator Patterns Reference
      </h2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#0f172a', color: '#f8fafc' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Pattern</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Decorator Type</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>Use Case</th>
              <th style={{ padding: '10px 14px', textAlign: 'left' }}>System</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['@log / @trace', 'Method', 'Structured logging, call tracking', 'Both'],
              ['@timing / @benchmark', 'Method', 'Performance profiling', 'Both'],
              ['@memoize / @cache(ttl)', 'Method', 'Expensive pure functions', 'Both'],
              ['@retry(n, delay)', 'Method', 'Network/API resilience', 'Both'],
              ['@rateLimit(n, ms)', 'Method', 'API throttling, DOS protection', 'Both'],
              ['@debounce(ms)', 'Method', 'Search inputs, resize handlers', 'Both'],
              ['@authorize(...roles)', 'Method', 'RBAC access control', 'Both'],
              ['@deprecated(msg)', 'Method', 'API migration warnings', 'Both'],
              ['@singleton', 'Class', 'Shared resources (DB, config)', 'Both'],
              ['@sealed / @frozen', 'Class', 'Immutable classes', 'TC39'],
              ['@withTimestamps', 'Class', 'Audit fields on entities', 'Both'],
              ['@observable', 'Accessor', 'Reactive state management', 'TC39'],
              ['@validated(fn)', 'Accessor / Field', 'Runtime type enforcement', 'TC39'],
              ['@required / @trim', 'Field', 'Data normalization on init', 'TC39'],
              ['@Injectable / @Singleton', 'Class', 'DI container registration', 'Legacy'],
              ['@Controller(path)', 'Class', 'HTTP routing metadata', 'Legacy'],
              ['@Get/@Post/@Put(path)', 'Method', 'Route handler registration', 'Legacy'],
              ['@Entity / @Column', 'Class/Field', 'ORM schema mapping', 'Legacy'],
              ['@IsEmail / @MinLength', 'Property', 'DTO input validation', 'Legacy'],
              ['@Body / @Query / @Param', 'Parameter', 'Request data extraction', 'Legacy'],
            ].map(([pattern, type, use, system], i) => (
              <tr key={pattern} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                <td style={{ padding: '8px 14px', fontWeight: 600, borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#0369a1' }}>{pattern}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{type}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>{use}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0', color: system === 'Both' ? '#059669' : system === 'TC39' ? '#7c3aed' : '#dc2626', fontWeight: 600 }}>{system}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 15 */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        TypeScript Configuration Tips for Decorators
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Full production tsconfig for a NestJS project (legacy decorators)
{
  "compilerOptions": {
    "module": "CommonJS",
    "moduleResolution": "node",
    "target": "ES2022",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "declaration": true,
    "strict": true,
    "strictPropertyInitialization": false, // needed for entity classes
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}

// Full tsconfig for TC39 decorators (new projects)
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "strict": true,
    // No experimentalDecorators needed
    // No emitDecoratorMetadata needed
    "skipLibCheck": true
  }
}

// Common pitfalls and fixes:

// 1. "Unable to resolve signature of class decorator"
//    → Make sure target is ES2022+, not ES5
//    → For TC39: check you're on TypeScript 5.0+

// 2. "Cannot read properties of undefined (reading 'prototype')"
//    → You forgot: import 'reflect-metadata'; at app entry

// 3. "Parameter 'target' implicitly has an 'any' type"
//    → Add explicit types to legacy decorator parameters

// 4. Decorator works in dev but not in build
//    → ts-node uses tsconfig.json but ts-jest may not
//    → Add: { preset: 'ts-jest', globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } } }

// 5. "design:paramtypes" returns [Object] instead of real types
//    → The parameter type must be a concrete class, not an interface
//    → Interfaces are erased at runtime; use abstract classes or class tokens`}</code></pre>

      {/* Section 16: When to Use */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        When to Use (and When Not to Use) Decorators
      </h2>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#059669' }}>
        Good Use Cases
      </h3>
      <ul>
        <li><strong>Cross-cutting concerns</strong> — logging, caching, rate limiting, auth guards that apply to many methods across many classes</li>
        <li><strong>Framework integration</strong> — when a framework requires decorators (NestJS, Angular, TypeORM), use the framework conventions</li>
        <li><strong>Declarative schema definition</strong> — ORM column mapping, validation rules, OpenAPI spec generation where metadata-driven declaration is cleaner than imperative code</li>
        <li><strong>Aspect-Oriented Programming</strong> — separating infrastructure concerns (persistence, monitoring, security) from business logic</li>
        <li><strong>Observable/reactive state</strong> — TC39 accessor decorators for fine-grained reactivity without a full framework</li>
      </ul>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#dc2626' }}>
        Avoid Decorators When
      </h3>
      <ul>
        <li>A <strong>higher-order function</strong> would be simpler and equally readable — <code>const wrappedFn = memoize(fn)</code> is often clearer than <code>@memoize fn()</code> for standalone functions</li>
        <li>The behavior is <strong>unique to one method</strong> in the entire codebase — adding a decorator for a single use case adds indirection without reuse benefit</li>
        <li>You are building a <strong>library</strong> and don&#39;t want to force users into a specific decorator system or tsconfig setup</li>
        <li>The team is unfamiliar with the execution order, and the <strong>debugging overhead</strong> outweighs the declarative benefit</li>
        <li>You need to decorate <strong>non-class code</strong> — plain functions, arrow functions, module exports — decorators simply cannot be applied there</li>
      </ul>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the difference between TC39 Stage 3 and legacy experimental decorators?
      </h3>
      <p>
        TC39 Stage 3 decorators (TypeScript 5.0+) need no tsconfig flag and use a new API with a <code>context</code> object. Legacy decorators use <code>experimentalDecorators: true</code> and the older <code>(target, key, descriptor)</code> API. They are incompatible and cannot be mixed in the same file. See the full comparison table above.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I enable decorators in tsconfig.json?
      </h3>
      <p>
        For TC39 decorators: set <code>target</code> to <code>ES2022</code> or higher — no other flag needed. For legacy decorators: add <code>&quot;experimentalDecorators&quot;: true</code> and optionally <code>&quot;emitDecoratorMetadata&quot;: true</code> for DI metadata. Install <code>reflect-metadata</code> if using DI containers.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is a decorator factory?
      </h3>
      <p>
        A function that returns a decorator, used when you need to pass parameters: <code>@retry(3, 500)</code> calls <code>retry(3, 500)</code> first, which returns the decorator function. All NestJS, TypeORM, and class-validator decorators are factories. Use factories for any configurable decorator behavior.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        In what order do stacked decorators execute?
      </h3>
      <p>
        Factory expressions are evaluated top-to-bottom; the resulting decorators execute bottom-to-top. <code>@A @B method</code> means A is evaluated first but B wraps the method first, then A wraps the result: equivalent to <code>A(B(method))</code>. In practice: put the outermost behavior (logging) at the top, innermost (validation) at the bottom.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is reflect-metadata and why is it needed?
      </h3>
      <p>
        A polyfill for the <code>Reflect.metadata</code> API that enables decorators to attach and retrieve metadata. When <code>emitDecoratorMetadata: true</code> is set, TypeScript emits <code>design:paramtypes</code>, <code>design:type</code>, and <code>design:returntype</code> metadata at compile time, which DI containers read at runtime to resolve dependencies. Import it once at your app entry point.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Can I use decorators on plain (non-class) functions?
      </h3>
      <p>
        No. Decorators can only be applied to classes, class methods, class fields, class accessors, and constructor parameters. For plain functions, use higher-order functions: <code>const logged = withLog(myFunction)</code>. This is often cleaner for standalone utilities anyway.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I build a DI container with decorators?
      </h3>
      <p>
        Use <code>@Injectable()</code> to mark classes, <code>emitDecoratorMetadata</code> to emit constructor types, and a <code>Container.resolve()</code> method that reads <code>Reflect.getMetadata(&apos;design:paramtypes&apos;, Ctor)</code> to recursively instantiate dependencies. See the full working example in the Mini DI Container section above.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What are accessor decorators and the "accessor" keyword?
      </h3>
      <p>
        Introduced in TypeScript 5.0, the <code>accessor</code> keyword auto-generates a getter/setter backed by a private field: <code>accessor name = &apos;value&apos;</code>. Accessor decorators can intercept both reads and writes, enabling reactive/observable patterns. This is the TC39 standard replacement for manually writing <code>get</code>/<code>set</code> pairs with legacy decorators.
      </p>

      <p style={{ marginTop: '2rem' }}>
        For more TypeScript content, explore our{' '}
        <Link href={`/${lang}/blog/typescript-generics-guide`} style={{ color: '#0284c7' }}>TypeScript Generics Guide</Link>,{' '}
        <Link href={`/${lang}/blog/typescript-utility-types`} style={{ color: '#0284c7' }}>TypeScript Utility Types Reference</Link>,{' '}
        <Link href={`/${lang}/blog/typescript-best-practices-2026`} style={{ color: '#0284c7' }}>TypeScript Best Practices 2026</Link>, and try our{' '}
        <Link href={`/${lang}/tools/json-to-typescript`} style={{ color: '#0284c7' }}>JSON to TypeScript Converter</Link>{' '}
        and{' '}
        <Link href={`/${lang}/tools/typescript-to-javascript`} style={{ color: '#0284c7' }}>TypeScript to JavaScript Converter</Link>.
      </p>
    </article>
  );
}
