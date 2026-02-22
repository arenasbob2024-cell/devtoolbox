'use client';

import Link from 'next/link';

export default function TypescriptDecoratorsGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Are TypeScript Decorators?</h2>
      <p>
        <strong>Decorators</strong> are a powerful TypeScript feature that lets you add metadata and
        modify classes, methods, properties, and parameters at design time using a declarative syntax.
        They follow a proposal for ECMAScript (currently Stage 3) and are widely used in frameworks
        like Angular, NestJS, TypeORM, and MobX. With TypeScript 5.0, the TC39 standard decorators
        are now fully supported alongside the legacy experimental decorators. This guide covers both
        approaches with practical examples you can use immediately. For TypeScript fundamentals, see
        our <Link href={`/${lang}/blog/typescript-generics-guide`}>TypeScript Generics Guide</Link>.
      </p>

      <h2>Enabling Decorators</h2>
      <p>
        TypeScript supports two decorator implementations. The TC39 standard decorators (TypeScript
        5.0+) work without any configuration flag. Legacy experimental decorators require a compiler
        option.
      </p>
      <pre><code className="language-json">{`// tsconfig.json

// Option 1: TC39 Standard Decorators (TypeScript 5.0+)
// No special flag needed — works by default
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"]
  }
}

// Option 2: Legacy Experimental Decorators
// (used by Angular, NestJS, TypeORM)
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}`}</code></pre>

      <h2>TC39 Standard Decorators (TypeScript 5.0+)</h2>
      <h3>Class Decorators</h3>
      <p>
        A class decorator receives the class itself and a context object. It can return a new class
        or modify the existing one.
      </p>
      <pre><code className="language-typescript">{`// TC39 class decorator
function sealed(
  target: Function,
  context: ClassDecoratorContext
) {
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
    updatedAt = new Date();
  };
}

@sealed
@withTimestamp
class User {
  constructor(
    public name: string,
    public email: string
  ) {}
}

const user = new User('Alice', 'alice@example.com');
console.log((user as any).createdAt); // Current date`}</code></pre>

      <h3>Method Decorators</h3>
      <p>
        Method decorators can wrap, replace, or augment method behavior. They receive the original
        method and a context object containing the method name and kind.
      </p>
      <pre><code className="language-typescript">{`// Logging decorator — logs method calls and return values
function log(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  const methodName = String(context.name);

  function replacementMethod(this: any, ...args: any[]) {
    console.log(\`Calling \${methodName} with args:\`, args);
    const result = target.call(this, ...args);
    console.log(\`\${methodName} returned:\`, result);
    return result;
  }

  return replacementMethod;
}

// Memoization decorator — caches results
function memoize(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  const cache = new Map<string, any>();

  function replacementMethod(this: any, ...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = target.call(this, ...args);
    cache.set(key, result);
    return result;
  }

  return replacementMethod;
}

// Retry decorator — retries failed async operations
function retry(attempts: number, delay: number) {
  return function (
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    async function replacementMethod(this: any, ...args: any[]) {
      for (let i = 0; i < attempts; i++) {
        try {
          return await target.call(this, ...args);
        } catch (error) {
          if (i === attempts - 1) throw error;
          console.log(\`Attempt \${i + 1} failed, retrying in \${delay}ms...\`);
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }
    return replacementMethod;
  };
}

class ApiClient {
  @log
  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  @retry(3, 1000)
  async fetchData(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return response.json();
  }
}`}</code></pre>

      <h3>Field Decorators</h3>
      <pre><code className="language-typescript">{`// Validation decorator for class fields
function minLength(min: number) {
  return function (
    _target: undefined,
    context: ClassFieldDecoratorContext
  ) {
    return function (this: any, initialValue: string) {
      if (initialValue && initialValue.length < min) {
        throw new Error(
          \`\${String(context.name)} must be at least \${min} characters\`
        );
      }
      return initialValue;
    };
  };
}

function required(
  _target: undefined,
  context: ClassFieldDecoratorContext
) {
  return function (this: any, initialValue: any) {
    if (initialValue === undefined || initialValue === null || initialValue === '') {
      throw new Error(\`\${String(context.name)} is required\`);
    }
    return initialValue;
  };
}

function defaultValue<T>(value: T) {
  return function (
    _target: undefined,
    context: ClassFieldDecoratorContext
  ) {
    return function (this: any, initialValue: T) {
      return initialValue ?? value;
    };
  };
}

class Config {
  @required
  @minLength(3)
  name: string = 'MyApp';

  @defaultValue(3000)
  port: number = 3000;

  @defaultValue('info')
  logLevel: string = 'info';
}`}</code></pre>

      <h3>Accessor Decorators</h3>
      <pre><code className="language-typescript">{`// Auto-accessor decorator (TypeScript 5.0)
function observable(
  target: ClassAccessorDecoratorTarget<any, any>,
  context: ClassAccessorDecoratorContext
) {
  const { get: originalGet, set: originalSet } = target;

  return {
    get(this: any) {
      console.log(\`Reading \${String(context.name)}\`);
      return originalGet.call(this);
    },
    set(this: any, value: any) {
      console.log(\`Setting \${String(context.name)} = \${value}\`);
      originalSet.call(this, value);
    },
  };
}

class Store {
  @observable
  accessor count = 0;

  @observable
  accessor name = 'default';

  increment() {
    this.count++;
  }
}

const store = new Store();
store.count = 5;         // "Setting count = 5"
console.log(store.count); // "Reading count" -> 5`}</code></pre>

      <h2>Legacy Experimental Decorators</h2>
      <p>
        Legacy decorators are still widely used in Angular, NestJS, and TypeORM. They use a
        different API but serve the same purpose. Here are common patterns.
      </p>
      <h3>NestJS-Style Controller Decorators</h3>
      <pre><code className="language-typescript">{`// NestJS-style decorators (legacy/experimental)
// These patterns are used in production NestJS applications

function Controller(prefix: string): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata('prefix', prefix, target);
  };
}

function Get(path: string): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata('method', 'GET', descriptor.value!);
    Reflect.defineMetadata('path', path, descriptor.value!);
  };
}

function Post(path: string): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata('method', 'POST', descriptor.value!);
    Reflect.defineMetadata('path', path, descriptor.value!);
  };
}

function UseGuards(...guards: Function[]): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata('guards', guards, descriptor.value!);
  };
}

// Usage
@Controller('/users')
class UserController {
  @Get('/')
  findAll() {
    return 'Returns all users';
  }

  @Get('/:id')
  findOne() {
    return 'Returns one user';
  }

  @Post('/')
  @UseGuards(AuthGuard)
  create() {
    return 'Creates a user';
  }
}`}</code></pre>

      <h3>TypeORM-Style Entity Decorators</h3>
      <pre><code className="language-typescript">{`// TypeORM decorator patterns
import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, ManyToOne, OneToMany
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, user => user.posts)
  author: User;
}`}</code></pre>

      <h2>Practical Decorator Patterns</h2>
      <h3>Timing Decorator</h3>
      <pre><code className="language-typescript">{`// Measure method execution time
function timing(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  const methodName = String(context.name);

  async function replacementMethod(this: any, ...args: any[]) {
    const start = performance.now();
    try {
      const result = await target.call(this, ...args);
      return result;
    } finally {
      const duration = performance.now() - start;
      console.log(\`\${methodName} took \${duration.toFixed(2)}ms\`);
    }
  }

  return replacementMethod;
}

class DataService {
  @timing
  async fetchUsers(): Promise<User[]> {
    const response = await fetch('/api/users');
    return response.json();
  }
  // Console: "fetchUsers took 142.35ms"
}`}</code></pre>

      <h3>Rate Limiting Decorator</h3>
      <pre><code className="language-typescript">{`// Rate limit method calls
function rateLimit(maxCalls: number, windowMs: number) {
  return function (
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    const calls: number[] = [];

    function replacementMethod(this: any, ...args: any[]) {
      const now = Date.now();
      // Remove calls outside the window
      while (calls.length > 0 && calls[0] < now - windowMs) {
        calls.shift();
      }
      if (calls.length >= maxCalls) {
        throw new Error(
          \`Rate limit exceeded: max \${maxCalls} calls per \${windowMs}ms\`
        );
      }
      calls.push(now);
      return target.call(this, ...args);
    }

    return replacementMethod;
  };
}

class ApiService {
  @rateLimit(10, 60000) // Max 10 calls per minute
  async callExternalApi(endpoint: string) {
    return fetch(endpoint).then(r => r.json());
  }
}`}</code></pre>

      <h3>Validation Decorator</h3>
      <pre><code className="language-typescript">{`// Input validation decorator
function validate(
  schema: Record<string, (value: any) => boolean>
) {
  return function (
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    function replacementMethod(this: any, ...args: any[]) {
      const input = args[0];
      for (const [field, validator] of Object.entries(schema)) {
        if (!validator(input[field])) {
          throw new Error(\`Validation failed for field: \${field}\`);
        }
      }
      return target.call(this, ...args);
    }
    return replacementMethod;
  };
}

const isEmail = (v: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v);
const isNonEmpty = (v: string) => typeof v === 'string' && v.length > 0;
const isPositive = (v: number) => typeof v === 'number' && v > 0;

class UserService {
  @validate({
    name: isNonEmpty,
    email: isEmail,
    age: isPositive,
  })
  createUser(input: { name: string; email: string; age: number }) {
    // Input is guaranteed valid here
    return { id: crypto.randomUUID(), ...input };
  }
}`}</code></pre>

      <h2>Decorator Composition</h2>
      <p>
        Multiple decorators can be applied to a single declaration. They execute in a specific order:
        for method decorators, they are evaluated top-to-bottom but executed bottom-to-top (like
        function composition).
      </p>
      <pre><code className="language-typescript">{`// Decorator execution order
function first(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  console.log('first(): evaluated');
  return function (this: any, ...args: any[]) {
    console.log('first(): called');
    return target.call(this, ...args);
  };
}

function second(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  console.log('second(): evaluated');
  return function (this: any, ...args: any[]) {
    console.log('second(): called');
    return target.call(this, ...args);
  };
}

class Example {
  @first     // Evaluated first
  @second    // Evaluated second
  method() {
    console.log('method called');
  }
}

// Evaluation order:
// first(): evaluated
// second(): evaluated
// When method() is called:
// first(): called
// second(): called
// method called`}</code></pre>

      <h2>TC39 vs Legacy Decorators: Migration Guide</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Legacy (experimental)</th>
            <th>TC39 Standard (5.0+)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Config flag</strong></td>
            <td>experimentalDecorators: true</td>
            <td>No flag needed</td>
          </tr>
          <tr>
            <td><strong>Class decorator</strong></td>
            <td>(constructor) =&gt; void</td>
            <td>(target, context) =&gt; class</td>
          </tr>
          <tr>
            <td><strong>Method decorator</strong></td>
            <td>(target, key, descriptor)</td>
            <td>(target, context) =&gt; function</td>
          </tr>
          <tr>
            <td><strong>Metadata</strong></td>
            <td>Reflect.metadata</td>
            <td>context.metadata</td>
          </tr>
          <tr>
            <td><strong>Auto-accessors</strong></td>
            <td>Not supported</td>
            <td>accessor keyword</td>
          </tr>
          <tr>
            <td><strong>Parameter decorators</strong></td>
            <td>Supported</td>
            <td>Not yet supported</td>
          </tr>
          <tr>
            <td><strong>Frameworks using</strong></td>
            <td>Angular, NestJS, TypeORM</td>
            <td>New projects, libraries</td>
          </tr>
        </tbody>
      </table>

      <h2>When to Use Decorators</h2>
      <ul>
        <li><strong>Cross-cutting concerns</strong> — logging, caching, authentication, rate limiting</li>
        <li><strong>Framework integration</strong> — routing (NestJS), ORM mapping (TypeORM), state management (MobX)</li>
        <li><strong>Validation</strong> — input validation, type checking, schema enforcement</li>
        <li><strong>Testing</strong> — mocking, dependency injection, test fixtures</li>
        <li><strong>Aspect-Oriented Programming</strong> — separating business logic from infrastructure concerns</li>
      </ul>
      <p>
        Avoid decorators when simple functions, higher-order components, or middleware would suffice.
        Decorators add indirection, so use them when the declarative syntax genuinely improves code
        clarity.
      </p>

      <p>
        For more TypeScript content, explore our{' '}
        <Link href={`/${lang}/blog/typescript-utility-types`}>TypeScript Utility Types Guide</Link>,{' '}
        <Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript Converter</Link>, and{' '}
        <Link href={`/${lang}/tools/typescript-to-javascript`}>TypeScript to JavaScript Converter</Link>.
      </p>
    </>
  );
}
