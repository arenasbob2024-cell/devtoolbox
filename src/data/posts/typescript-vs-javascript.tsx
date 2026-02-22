'use client';

import Link from 'next/link';

export default function TypescriptVsJavascript({ lang }: { lang: string }) {
  return (
    <>
      <h2>TypeScript vs JavaScript: The Core Difference</h2>
      <p>
        <strong>TypeScript</strong> is a statically typed superset of JavaScript that compiles to plain JavaScript. Every valid JavaScript file is also valid TypeScript, but TypeScript adds optional type annotations, interfaces, enums, generics, and compile-time error checking. The key question is not whether TypeScript is "better" -- it is about when the overhead of types pays off and when it does not.
      </p>
      <p>
        This guide provides a practical comparison with real code examples, performance analysis, ecosystem considerations, and a clear decision framework to help you choose the right language for your next project.
      </p>

      <h2>Quick Comparison Overview</h2>
      <table>
        <thead>
          <tr><th>Aspect</th><th>JavaScript</th><th>TypeScript</th></tr>
        </thead>
        <tbody>
          <tr><td>Typing</td><td>Dynamic (runtime)</td><td>Static (compile-time)</td></tr>
          <tr><td>Error detection</td><td>At runtime</td><td>Before running code</td></tr>
          <tr><td>Learning curve</td><td>Lower</td><td>Higher (types, generics)</td></tr>
          <tr><td>Build step</td><td>None (or optional bundler)</td><td>Required (tsc, esbuild, etc.)</td></tr>
          <tr><td>Runtime</td><td>Browser, Node.js, Deno, Bun</td><td>Same (compiles to JS)</td></tr>
          <tr><td>Type definitions</td><td>JSDoc (optional)</td><td>Native syntax</td></tr>
          <tr><td>Refactoring</td><td>Error-prone at scale</td><td>Safe with compiler checks</td></tr>
          <tr><td>IDE support</td><td>Good</td><td>Excellent (autocomplete, errors)</td></tr>
          <tr><td>Ecosystem</td><td>Full npm access</td><td>Full npm + @types packages</td></tr>
          <tr><td>File extension</td><td>.js, .mjs, .cjs</td><td>.ts, .tsx, .mts</td></tr>
        </tbody>
      </table>

      <h2>Side-by-Side Code Comparison</h2>

      <h3>Variables and Functions</h3>
      <pre><code className="language-javascript">{`// JavaScript
function calculateTotal(items, taxRate) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0) * (1 + taxRate);
}

const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// No errors until runtime if you pass wrong types
calculateTotal("not an array", "not a number"); // Runtime error!`}</code></pre>
      <pre><code className="language-typescript">{`// TypeScript
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface User {
  name: string;
  age: number;
  email: string;
}

function calculateTotal(items: CartItem[], taxRate: number): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0) * (1 + taxRate);
}

const user: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// Compile-time error! Caught before running
calculateTotal("not an array", "not a number");
// Error: Argument of type 'string' is not assignable to parameter of type 'CartItem[]'`}</code></pre>

      <h3>API Response Handling</h3>
      <pre><code className="language-javascript">{`// JavaScript - No guarantee on response shape
async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  const data = await res.json();

  // What properties does 'data' have? No way to know without docs.
  // data.name? data.username? data.fullName?
  console.log(data.name);        // Could be undefined
  console.log(data.posts.length); // Could crash if posts is null
}`}</code></pre>
      <pre><code className="language-typescript">{`// TypeScript - Response shape is documented and enforced
interface ApiUser {
  id: number;
  name: string;
  email: string;
  posts: Post[];
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  published: boolean;
}

async function fetchUser(id: number): Promise<ApiUser> {
  const res = await fetch(\`/api/users/\${id}\`);
  const data: ApiUser = await res.json();

  // IDE autocomplete shows all available properties
  console.log(data.name);         // string - guaranteed
  console.log(data.posts.length); // number - guaranteed
  console.log(data.posts[0].title); // string - with autocomplete

  // Compile error if you access non-existent property
  console.log(data.username); // Error: Property 'username' does not exist
  return data;
}`}</code></pre>

      <h3>Union Types and Discriminated Unions</h3>
      <pre><code className="language-typescript">{`// TypeScript's most powerful feature: discriminated unions
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string; code: number }
  | { status: "loading" };

function handleResponse(response: ApiResponse<User>) {
  switch (response.status) {
    case "success":
      // TypeScript knows 'data' exists here
      console.log(response.data.name);
      break;
    case "error":
      // TypeScript knows 'message' and 'code' exist here
      console.error(\`Error \${response.code}: \${response.message}\`);
      break;
    case "loading":
      // TypeScript knows nothing else is available
      console.log("Loading...");
      break;
  }
}

// More practical examples
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}`}</code></pre>

      <h3>Generics</h3>
      <pre><code className="language-typescript">{`// Generics: write once, use with any type
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = firstElement([1, 2, 3]);       // type: number | undefined
const str = firstElement(["a", "b", "c"]); // type: string | undefined

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@example.com" };
const name = getProperty(user, "name");   // type: string
const age = getProperty(user, "age");     // type: number
// getProperty(user, "phone");            // Error: "phone" is not a key of user

// Generic API client
async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<T>;
}

// Usage - fully typed responses
const users = await apiGet<User[]>("/api/users");
const post = await apiGet<Post>("/api/posts/1");`}</code></pre>

      <h2>Type Safety Benefits in Practice</h2>

      <h3>Catching Bugs at Compile Time</h3>
      <pre><code className="language-typescript">{`// Bug 1: Typos in property names
interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timout: 3000,    // Compile error! Did you mean 'timeout'?
  retries: 3
};

// Bug 2: Missing null checks
function getLength(str: string | null): number {
  return str.length;    // Error: 'str' is possibly 'null'
  return str?.length ?? 0; // Correct: handle null case
}

// Bug 3: Exhaustiveness checking
type Status = "active" | "inactive" | "pending" | "archived";

function getStatusLabel(status: Status): string {
  switch (status) {
    case "active": return "Active";
    case "inactive": return "Inactive";
    case "pending": return "Pending";
    // If you forget "archived", TypeScript warns:
    // Error: Not all code paths return a value
  }
}

// Bug 4: Wrong function arguments
function sendEmail(to: string, subject: string, body: string): void {
  // ...
}

// JavaScript: silently swaps arguments
sendEmail("Hello!", "alice@example.com", "Welcome");
// TypeScript: you'd notice the logical error through IDE hints`}</code></pre>

      <h2>When to Use JavaScript</h2>
      <ul>
        <li><strong>Quick prototyping and scripts</strong>: One-off scripts, automation tasks, and rapid prototypes where type safety slows you down</li>
        <li><strong>Small projects (under 500 lines)</strong>: The overhead of TypeScript configuration is not worth it for tiny projects</li>
        <li><strong>Learning and experimentation</strong>: Beginners should learn JavaScript first before adding types</li>
        <li><strong>Simple server-side scripts</strong>: Node.js CLI tools, cron jobs, and simple API endpoints</li>
        <li><strong>Legacy codebases</strong>: When migrating would be too costly and the codebase is stable</li>
        <li><strong>Team lacks TypeScript experience</strong>: Forcing TypeScript on an unfamiliar team creates friction</li>
        <li><strong>Content-heavy sites</strong>: Static sites, blogs, and marketing pages with minimal logic</li>
      </ul>

      <h2>When to Use TypeScript</h2>
      <ul>
        <li><strong>Team projects (2+ developers)</strong>: Types serve as documentation and prevent integration bugs</li>
        <li><strong>Long-lived codebases</strong>: Code that will be maintained for months or years benefits enormously from types</li>
        <li><strong>Complex business logic</strong>: Financial calculations, state machines, and domain models need type safety</li>
        <li><strong>API-heavy applications</strong>: Typed API clients catch mismatches between frontend and backend</li>
        <li><strong>React/Vue/Angular projects</strong>: Component props, state, and events are much safer with types</li>
        <li><strong>Library and SDK development</strong>: Published packages with TypeScript types provide better developer experience</li>
        <li><strong>Refactoring</strong>: The compiler catches every place affected by a change</li>
        <li><strong>Enterprise applications</strong>: Compliance, auditing, and code quality standards favor static typing</li>
      </ul>

      <h2>Migration: JavaScript to TypeScript</h2>
      <p>
        You do not need to migrate all at once. TypeScript supports incremental adoption -- you can convert files one at a time.
      </p>
      <pre><code className="language-json">{`// tsconfig.json for gradual migration
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": false,              // Start with strict off
    "allowJs": true,              // Allow .js files alongside .ts
    "checkJs": false,             // Don't type-check .js files yet
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`}</code></pre>
      <pre><code className="language-bash">{`# Step-by-step migration plan:

# 1. Install TypeScript
npm install -D typescript @types/node

# 2. Generate tsconfig.json
npx tsc --init

# 3. Rename files one at a time: .js -> .ts
# Start with utility files, then move to core business logic

# 4. Fix type errors as you go
# Use 'any' temporarily for complex types

# 5. Gradually enable strict options:
#    "noImplicitAny": true
#    "strictNullChecks": true
#    "strict": true

# 6. Add type definitions for dependencies
npm install -D @types/express @types/lodash`}</code></pre>

      <h3>Migration Cheat Sheet: Common Patterns</h3>
      <pre><code className="language-typescript">{`// Pattern 1: Function parameters
// Before (JS):  function add(a, b) { return a + b; }
// After (TS):
function add(a: number, b: number): number { return a + b; }

// Pattern 2: Object parameters
// Before (JS):  function createUser(options) { ... }
// After (TS):
interface CreateUserOptions {
  name: string;
  email: string;
  role?: "admin" | "user";  // optional with union type
}
function createUser(options: CreateUserOptions): User { /* ... */ }

// Pattern 3: Array methods
// Before (JS):  const names = users.map(u => u.name)
// After (TS):
const names: string[] = users.map((u: User) => u.name);

// Pattern 4: Event handlers (React)
// Before (JS):  function handleClick(e) { ... }
// After (TS):
function handleClick(e: React.MouseEvent<HTMLButtonElement>): void { /* ... */ }

// Pattern 5: Async functions
// Before (JS):  async function fetchData() { ... }
// After (TS):
async function fetchData(): Promise<ApiResponse<User[]>> { /* ... */ }

// Pattern 6: When you don't know the type yet, use unknown instead of any
function parseJSON(text: string): unknown {
  return JSON.parse(text);
}
// Then narrow the type
const result = parseJSON('{"name": "Alice"}');
if (typeof result === 'object' && result !== null && 'name' in result) {
  console.log((result as { name: string }).name);
}`}</code></pre>

      <h2>Performance: TypeScript vs JavaScript</h2>
      <table>
        <thead>
          <tr><th>Aspect</th><th>JavaScript</th><th>TypeScript</th></tr>
        </thead>
        <tbody>
          <tr><td>Runtime performance</td><td>Identical</td><td>Identical (compiles to JS)</td></tr>
          <tr><td>Build time</td><td>None (or minimal bundling)</td><td>Adds compilation step</td></tr>
          <tr><td>Bundle size</td><td>Baseline</td><td>Same (types are removed)</td></tr>
          <tr><td>IDE responsiveness</td><td>Fast</td><td>Can be slower on large projects</td></tr>
          <tr><td>CI/CD pipeline</td><td>Faster</td><td>Adds type-check step</td></tr>
          <tr><td>Cold start (serverless)</td><td>Identical</td><td>Identical (runtime is JS)</td></tr>
        </tbody>
      </table>
      <p>
        TypeScript has <strong>zero runtime cost</strong>. All type annotations are removed during compilation. The compiled JavaScript output is the same code you would write by hand. Build time overhead is usually 1-5 seconds with modern tools like esbuild or SWC.
      </p>

      <h2>TypeScript Strictness Levels</h2>
      <pre><code className="language-text">{`Level 1 (Minimal): allowJs + no strict
  → Just rename .js to .ts, minimal changes
  → Good for initial migration

Level 2 (Moderate): noImplicitAny
  → All function params need types
  → Variables can still be inferred

Level 3 (Recommended): strict: true
  → Enables all strict checks:
    - noImplicitAny
    - strictNullChecks
    - strictFunctionTypes
    - strictBindCallApply
    - strictPropertyInitialization
    - noImplicitThis
    - alwaysStrict
  → Catches the most bugs

Level 4 (Maximum): strict + additional rules
  → noUncheckedIndexedAccess
  → noPropertyAccessFromIndexSignature
  → exactOptionalPropertyTypes
  → Catches edge cases`}</code></pre>

      <h2>Ecosystem and Tooling</h2>
      <table>
        <thead>
          <tr><th>Tool</th><th>JavaScript Support</th><th>TypeScript Support</th></tr>
        </thead>
        <tbody>
          <tr><td>VS Code</td><td>Excellent</td><td>Exceptional (built for TS)</td></tr>
          <tr><td>Next.js</td><td>Full support</td><td>First-class support</td></tr>
          <tr><td>React</td><td>Full support</td><td>First-class with @types/react</td></tr>
          <tr><td>Node.js</td><td>Native</td><td>Via tsc, tsx, ts-node</td></tr>
          <tr><td>Deno</td><td>Full support</td><td>Native (no build step)</td></tr>
          <tr><td>Bun</td><td>Full support</td><td>Native (no build step)</td></tr>
          <tr><td>ESLint</td><td>Full support</td><td>Full support (typescript-eslint)</td></tr>
          <tr><td>Jest</td><td>Native</td><td>Via ts-jest or SWC</td></tr>
          <tr><td>Vite</td><td>Full support</td><td>Full support (esbuild)</td></tr>
        </tbody>
      </table>

      <h2>Decision Framework</h2>
      <table>
        <thead>
          <tr><th>Question</th><th>If Yes: Use</th></tr>
        </thead>
        <tbody>
          <tr><td>Is this a 100-line script?</td><td>JavaScript</td></tr>
          <tr><td>Will multiple developers work on it?</td><td>TypeScript</td></tr>
          <tr><td>Does it have complex data structures?</td><td>TypeScript</td></tr>
          <tr><td>Is it a quick prototype to test an idea?</td><td>JavaScript</td></tr>
          <tr><td>Will it be maintained for over 6 months?</td><td>TypeScript</td></tr>
          <tr><td>Does the team already know TypeScript?</td><td>TypeScript</td></tr>
          <tr><td>Are you building a published library/SDK?</td><td>TypeScript</td></tr>
          <tr><td>Is it a static site with minimal logic?</td><td>JavaScript</td></tr>
        </tbody>
      </table>

      <h2>Conclusion</h2>
      <p>
        TypeScript and JavaScript are not competitors -- TypeScript is JavaScript with an extra safety layer. For solo developers working on small projects, JavaScript's simplicity is a real advantage. For teams building applications that will grow and evolve over time, TypeScript's compile-time checks, IDE support, and self-documenting types prevent entire categories of bugs.
      </p>
      <p>
        The 2026 trend is clear: the majority of new professional projects start with TypeScript. But that does not mean JavaScript is obsolete -- it remains the runtime language, and understanding JavaScript deeply is essential for effective TypeScript development. Learn JavaScript first, adopt TypeScript when complexity demands it, and always prioritize writing clear, maintainable code regardless of which you choose.
      </p>
      <p>
        Convert between TypeScript and JavaScript with our <Link href={`/${lang}/tools/typescript-to-javascript`}>TypeScript to JavaScript Converter</Link>, explore <Link href={`/${lang}/blog/typescript-generics-explained`}>TypeScript Generics Explained</Link>, or dive into <Link href={`/${lang}/blog/typescript-utility-types`}>TypeScript Utility Types</Link> for advanced patterns.
      </p>
    </>
  );
}
