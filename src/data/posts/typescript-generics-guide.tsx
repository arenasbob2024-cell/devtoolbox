export default function TypescriptGenericsGuide() {
  return (
    <>
      <h2>Why TypeScript Generics Matter in 2026</h2>
      <p>
        TypeScript generics allow you to write <strong>reusable, type-safe code</strong> that works with any data type.
        Instead of duplicating logic for strings, numbers, and objects separately, generics let you define a single
        function, class, or interface that adapts to whatever type is passed in. This guide walks through every concept
        from beginner fundamentals to production-ready patterns used by teams at scale.
      </p>

      <h2>Understanding Type Parameters</h2>
      <p>
        A type parameter is a placeholder that represents a type you do not know in advance. By convention, single
        uppercase letters are used: <code>T</code> for type, <code>K</code> for key, <code>V</code> for value, and
        <code>E</code> for element. When you call a generic function, TypeScript infers the actual type automatically.
      </p>
      <pre><code>{`// Without generics — loses type info
function identity(value: any): any {
  return value;
}

// With generics — preserves type info
function identity<T>(value: T): T {
  return value;
}

const num = identity(42);       // type: number
const str = identity("hello");  // type: string`}</code></pre>

      <h2>Generic Functions: Single and Multiple Parameters</h2>
      <p>
        Generic functions can accept one or more type parameters. Multiple type parameters are useful when a function
        relates two or more types together, such as transforming a value from one type to another.
      </p>
      <pre><code>{`// Single type parameter
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Multiple type parameters
function mapTo<T, U>(value: T, transform: (v: T) => U): U {
  return transform(value);
}

const length = mapTo("hello", s => s.length); // number
const upper = mapTo(42, n => String(n));       // string

// Default type parameters
function createState<T = string>(initial: T): { get: () => T; set: (v: T) => void } {
  let state = initial;
  return {
    get: () => state,
    set: (v: T) => { state = v; },
  };
}

const s = createState("hi");    // T defaults to string
const n = createState<number>(0); // T explicitly set to number`}</code></pre>

      <h2>Generic Interfaces</h2>
      <p>
        Interfaces become far more powerful with generics. You can define the shape of data structures, API responses,
        and collections that work with any type while maintaining strict type checking.
      </p>
      <pre><code>{`// Generic API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Usage — T is inferred as User
const response: ApiResponse<User> = {
  data: { id: 1, name: "Alice", email: "alice@example.com" },
  status: 200,
  message: "OK",
  timestamp: new Date(),
};

// Generic collection interface
interface Collection<T> {
  items: T[];
  total: number;
  add(item: T): void;
  find(predicate: (item: T) => boolean): T | undefined;
}

// Paginated response
interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
}`}</code></pre>

      <h2>Generic Type Aliases</h2>
      <p>
        Type aliases with generics are ideal for creating utility types, union wrappers, and conditional structures.
        They are especially useful when composing complex types from simpler ones.
      </p>
      <pre><code>{`// Result type for error handling
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Nullable wrapper
type Nullable<T> = T | null;

// Deep partial — makes all nested properties optional
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Usage
function fetchUser(id: number): Result<User> {
  try {
    const user = { id, name: "Alice", email: "alice@example.com" };
    return { success: true, data: user };
  } catch (e) {
    return { success: false, error: e as Error };
  }
}`}</code></pre>

      <h2>Generic Classes</h2>
      <p>
        Classes with generics are the foundation of data structures, state management, and repositories. The type
        parameter is available in properties, constructor parameters, and all methods.
      </p>
      <pre><code>{`// Type-safe Stack implementation
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const top = numberStack.pop(); // type: number | undefined

// Generic Repository
class Repository<T extends { id: string | number }> {
  private store = new Map<string | number, T>();

  save(entity: T): void {
    this.store.set(entity.id, entity);
  }

  findById(id: string | number): T | undefined {
    return this.store.get(id);
  }

  findAll(): T[] {
    return Array.from(this.store.values());
  }

  delete(id: string | number): boolean {
    return this.store.delete(id);
  }
}`}</code></pre>

      <h2>Constraints with extends</h2>
      <p>
        Unconstrained generics accept literally any type. When your logic depends on certain properties existing,
        use <code>extends</code> to narrow down the allowed types. This prevents runtime errors and provides better
        IntelliSense in your editor.
      </p>
      <pre><code>{`// Constraint: must have a length property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("hello", "hi");       // OK — strings have length
longest([1, 2, 3], [1]);      // OK — arrays have length
// longest(10, 20);            // Error — numbers have no length

// Constraint with keyof for safe property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@test.com" };
const name = getProperty(user, "name");  // type: string
const age = getProperty(user, "age");    // type: number
// getProperty(user, "foo");              // Error — "foo" not in User`}</code></pre>

      <h2>Conditional Types</h2>
      <p>
        Conditional types use the <code>T extends U ? X : Y</code> syntax to choose between types based on a
        condition. Combined with <code>infer</code>, they can extract and transform types at the type level.
      </p>
      <pre><code>{`// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;  // true
type B = IsString<42>;       // false

// Extract return type (simplified ReturnType)
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type FnReturn = MyReturnType<() => string>;  // string

// Unwrap Promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Resolved = UnwrapPromise<Promise<number>>;  // number
type Plain = UnwrapPromise<string>;               // string

// Extract array element type
type ElementOf<T> = T extends (infer E)[] ? E : never;

type Elem = ElementOf<string[]>;  // string`}</code></pre>

      <h2>Mapped Types</h2>
      <p>
        Mapped types iterate over the keys of an existing type to produce a new type. They are the mechanism behind
        built-in utility types like <code>Partial</code>, <code>Required</code>, <code>Readonly</code>, and
        <code>Pick</code>.
      </p>
      <pre><code>{`// Make all properties optional (Partial implementation)
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties required
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

// Make all properties readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Transform property types
type Stringify<T> = {
  [K in keyof T]: string;
};

interface Config {
  port: number;
  host: string;
  debug: boolean;
}

type StringConfig = Stringify<Config>;
// { port: string; host: string; debug: string }`}</code></pre>

      <h2>Built-in Utility Types Reference</h2>
      <p>
        TypeScript includes many utility types built with generics. Here are the ones you will use most often
        in production code:
      </p>
      <table>
        <thead>
          <tr>
            <th>Utility Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Partial&lt;T&gt;</code></td>
            <td>Makes all properties optional</td>
            <td><code>Partial&lt;User&gt;</code></td>
          </tr>
          <tr>
            <td><code>Required&lt;T&gt;</code></td>
            <td>Makes all properties required</td>
            <td><code>Required&lt;Config&gt;</code></td>
          </tr>
          <tr>
            <td><code>Readonly&lt;T&gt;</code></td>
            <td>Makes all properties readonly</td>
            <td><code>Readonly&lt;State&gt;</code></td>
          </tr>
          <tr>
            <td><code>Pick&lt;T, K&gt;</code></td>
            <td>Selects subset of properties</td>
            <td><code>Pick&lt;User, &quot;name&quot; | &quot;email&quot;&gt;</code></td>
          </tr>
          <tr>
            <td><code>Omit&lt;T, K&gt;</code></td>
            <td>Removes specific properties</td>
            <td><code>Omit&lt;User, &quot;password&quot;&gt;</code></td>
          </tr>
          <tr>
            <td><code>Record&lt;K, V&gt;</code></td>
            <td>Maps keys to value type</td>
            <td><code>Record&lt;string, number&gt;</code></td>
          </tr>
          <tr>
            <td><code>Exclude&lt;T, U&gt;</code></td>
            <td>Removes types from union</td>
            <td><code>Exclude&lt;string | number, string&gt;</code></td>
          </tr>
          <tr>
            <td><code>Extract&lt;T, U&gt;</code></td>
            <td>Keeps matching union members</td>
            <td><code>Extract&lt;string | number, string&gt;</code></td>
          </tr>
          <tr>
            <td><code>NonNullable&lt;T&gt;</code></td>
            <td>Removes null and undefined</td>
            <td><code>NonNullable&lt;string | null&gt;</code></td>
          </tr>
          <tr>
            <td><code>ReturnType&lt;T&gt;</code></td>
            <td>Gets function return type</td>
            <td><code>ReturnType&lt;typeof fn&gt;</code></td>
          </tr>
          <tr>
            <td><code>Parameters&lt;T&gt;</code></td>
            <td>Gets function parameter types</td>
            <td><code>Parameters&lt;typeof fn&gt;</code></td>
          </tr>
          <tr>
            <td><code>Awaited&lt;T&gt;</code></td>
            <td>Unwraps Promise type</td>
            <td><code>Awaited&lt;Promise&lt;User&gt;&gt;</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Real-World Pattern: Type-Safe Event Emitter</h2>
      <p>
        One of the most powerful uses of generics is building a type-safe event system where event names are
        mapped to their payload types, preventing typos and ensuring correct data flow.
      </p>
      <pre><code>{`// Define event map
interface AppEvents {
  "user:login": { userId: string; timestamp: Date };
  "user:logout": { userId: string };
  "order:created": { orderId: string; total: number };
  "error": { code: number; message: string };
}

// Type-safe event emitter
class TypedEventEmitter<Events extends Record<string, any>> {
  private listeners = new Map<string, Set<Function>>();

  on<K extends keyof Events>(
    event: K,
    handler: (payload: Events[K]) => void
  ): void {
    const handlers = this.listeners.get(event as string) ?? new Set();
    handlers.add(handler);
    this.listeners.set(event as string, handlers);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const handlers = this.listeners.get(event as string);
    handlers?.forEach(handler => handler(payload));
  }

  off<K extends keyof Events>(
    event: K,
    handler: (payload: Events[K]) => void
  ): void {
    this.listeners.get(event as string)?.delete(handler);
  }
}

// Usage — fully type-safe
const emitter = new TypedEventEmitter<AppEvents>();

emitter.on("user:login", ({ userId, timestamp }) => {
  console.log(userId, timestamp); // both fully typed
});

emitter.emit("user:login", { userId: "123", timestamp: new Date() });
// emitter.emit("user:login", { wrong: true }); // Error!`}</code></pre>

      <h2>Real-World Pattern: Generic API Client</h2>
      <p>
        Building a generic API client that infers response types from an endpoint map eliminates manual type
        casting and ensures end-to-end type safety from API definition to consumption.
      </p>
      <pre><code>{`// Define API endpoints and their response types
interface ApiEndpoints {
  "/users": User[];
  "/users/:id": User;
  "/orders": Order[];
  "/orders/:id": Order;
}

interface Order {
  id: string;
  userId: string;
  total: number;
  status: "pending" | "shipped" | "delivered";
}

// Generic fetch function
async function apiFetch<E extends keyof ApiEndpoints>(
  endpoint: E,
  params?: Record<string, string>
): Promise<ApiResponse<ApiEndpoints[E]>> {
  let url: string = endpoint as string;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(\`:\${key}\`, value);
    });
  }
  const res = await fetch(url);
  const data = await res.json();
  return {
    data: data as ApiEndpoints[E],
    status: res.status,
    message: res.statusText,
    timestamp: new Date(),
  };
}

// Usage — response type is automatically inferred
const users = await apiFetch("/users");
// users.data is User[]

const order = await apiFetch("/orders/:id", { id: "123" });
// order.data is Order`}</code></pre>

      <h2>Real-World Pattern: Builder Pattern with Generics</h2>
      <p>
        The builder pattern combined with generics enables fluent APIs that track which properties have been
        set at the type level, preventing incomplete object construction.
      </p>
      <pre><code>{`// Query builder with type accumulation
class QueryBuilder<T extends Record<string, any>> {
  private conditions: string[] = [];
  private selectedFields: string[] = [];
  private orderByField?: string;
  private limitCount?: number;

  select<K extends keyof T>(...fields: K[]): QueryBuilder<Pick<T, K>> {
    this.selectedFields = fields as string[];
    return this as any;
  }

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  orderBy<K extends keyof T>(field: K, direction: "ASC" | "DESC" = "ASC"): this {
    this.orderByField = \`\${String(field)} \${direction}\`;
    return this;
  }

  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  build(): string {
    const fields = this.selectedFields.length > 0
      ? this.selectedFields.join(", ")
      : "*";
    let query = \`SELECT \${fields} FROM table\`;
    if (this.conditions.length > 0) {
      query += \` WHERE \${this.conditions.join(" AND ")}\`;
    }
    if (this.orderByField) {
      query += \` ORDER BY \${this.orderByField}\`;
    }
    if (this.limitCount) {
      query += \` LIMIT \${this.limitCount}\`;
    }
    return query;
  }
}`}</code></pre>

      <h2>Common Mistakes to Avoid</h2>
      <p>
        These are the most frequent errors developers encounter when working with TypeScript generics, along
        with the correct approach for each:
      </p>
      <ul>
        <li><strong>Using <code>any</code> instead of generics</strong> - You lose all type safety. Always prefer a type parameter <code>T</code> over <code>any</code>.</li>
        <li><strong>Over-constraining type parameters</strong> - Only constrain to properties your function actually uses. Do not require an entire interface when you only need <code>length</code>.</li>
        <li><strong>Unnecessary type parameters</strong> - If <code>T</code> appears only once in the signature, you likely do not need it. Use the concrete type directly.</li>
        <li><strong>Not using <code>extends</code> when accessing properties</strong> - If your generic function calls <code>value.length</code>, constrain <code>T</code> with <code>extends {'{'}length: number{'}'}</code>.</li>
        <li><strong>Confusing defaults with constraints</strong> - <code>T = string</code> provides a default but does not restrict. <code>T extends string</code> restricts. Use both when needed: <code>T extends string = string</code>.</li>
        <li><strong>Explicit types when inference works</strong> - Avoid <code>identity&lt;string&gt;(&quot;hello&quot;)</code> when TypeScript can infer <code>string</code> from the argument.</li>
        <li><strong>Mutable arrays for readonly data</strong> - Use <code>readonly T[]</code> for data from APIs and external sources to prevent accidental mutation.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <h3>What is the difference between generics and any?</h3>
      <p>
        Generics preserve type information throughout the entire function or class. If you pass a <code>string</code>,
        TypeScript knows the return value is also <code>string</code>. With <code>any</code>, all type information is
        discarded and you lose autocompletion, refactoring support, and compile-time error detection.
      </p>

      <h3>Do generics affect runtime performance?</h3>
      <p>
        No. Generics are a compile-time feature only. They are completely erased during compilation to JavaScript.
        The generated code has zero overhead from generic type parameters.
      </p>

      <h3>How many type parameters should I use?</h3>
      <p>
        As few as possible. One or two is common. Three is occasionally necessary for complex operations like
        <code>mapTo&lt;Input, Output, Error&gt;</code>. If you find yourself needing four or more, consider
        refactoring your abstraction into smaller pieces.
      </p>

      <h3>Can generics work with arrow functions in TSX?</h3>
      <p>
        Yes, but you need a trailing comma to avoid JSX parsing ambiguity:
        <code>const fn = &lt;T,&gt;(arg: T): T =&gt; arg;</code>. The comma tells the TypeScript parser this
        is a generic, not a JSX element.
      </p>

      <h3>When should I use generics vs function overloads?</h3>
      <p>
        Use generics when the logic is identical for all types and you need to preserve type relationships.
        Use overloads when the implementation or return type differs based on the input type, such as
        <code>createElement(&quot;div&quot;)</code> returning <code>HTMLDivElement</code> vs
        <code>createElement(&quot;span&quot;)</code> returning <code>HTMLSpanElement</code>.
      </p>

      <h3>What naming conventions should I follow for type parameters?</h3>
      <p>
        Single uppercase letters are the standard convention: <code>T</code> (Type), <code>K</code> (Key),
        <code>V</code> (Value), <code>E</code> (Element), <code>R</code> (Return). For complex generics with
        multiple parameters, descriptive prefixed names like <code>TData</code>, <code>TError</code>, and
        <code>TResponse</code> improve readability.
      </p>
    </>
  );
}
