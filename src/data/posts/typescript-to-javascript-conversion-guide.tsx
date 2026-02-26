'use client';

import Link from 'next/link';

export default function TypescriptToJavascriptConversionGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          Converting <strong>TypeScript to JavaScript</strong> means stripping type annotations, interfaces, enums, and other TS-only syntax to produce valid JS. You can use the official <code>tsc</code> compiler, <Link href={`/${lang}/tools/typescript-to-javascript`}>our free online converter</Link>, Babel with <code>@babel/preset-typescript</code>, esbuild (the fastest option), or SWC (Rust-based speed). This guide covers every method, common pitfalls with enums and decorators, how to preserve JSDoc for IDE support, and integration with Vite, webpack, and Rollup build pipelines.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>The TypeScript compiler (<code>tsc</code>) is the most accurate way to <strong>convert TypeScript to JavaScript</strong> but is also the slowest for large codebases.</li>
          <li>esbuild and SWC perform <strong>type-stripping only</strong> (no type checking) and are 10-100x faster than <code>tsc</code>.</li>
          <li>Babel with <code>@babel/preset-typescript</code> strips types while keeping your existing Babel plugin pipeline intact.</li>
          <li>TypeScript enums, namespaces, and <code>const enum</code> require special handling because they emit runtime JavaScript code.</li>
          <li>Decorators (experimental or TC39 Stage 3) need transpilation, not just type stripping.</li>
          <li>Converting JSDoc comments preserves IDE IntelliSense in the output JavaScript files.</li>
          <li>Our <Link href={`/${lang}/tools/typescript-to-javascript`}>TypeScript to JavaScript converter</Link> handles all these edge cases in a single click.</li>
        </ul>
      </div>

      <h2>Why Convert TypeScript to JavaScript?</h2>
      <p>
        TypeScript has become the default language for modern web development, with adoption growing rapidly year over year. But there are many practical scenarios where you need to convert TypeScript back to plain JavaScript. Understanding when and why this conversion is necessary helps you choose the right tool and approach.
      </p>
      <p>
        <strong>Publishing npm packages:</strong> Most npm packages ship compiled JavaScript alongside type declaration files (<code>.d.ts</code>). This ensures compatibility with consumers who do not use TypeScript. The <code>tsc</code> compiler generates both the JavaScript output and the declaration files in a single pass.
      </p>
      <p>
        <strong>Running in browsers:</strong> No browser natively executes TypeScript. Whether you use a bundler like Vite or webpack, the TypeScript code must be transformed to JavaScript before it reaches the browser. Understanding this compilation step helps you debug source map issues and optimize build times.
      </p>
      <p>
        <strong>Migrating away from TypeScript:</strong> Some teams decide to remove TypeScript from their stack. This might happen when a project is being handed to a team less familiar with TypeScript, or when the type maintenance overhead exceeds the benefits for a small project. In such cases, a bulk TS-to-JS conversion is needed.
      </p>
      <p>
        <strong>Learning and prototyping:</strong> Developers learning JavaScript sometimes encounter TypeScript examples online and need to understand the equivalent JavaScript. An <Link href={`/${lang}/tools/typescript-to-javascript`}>online TS to JS converter</Link> makes this translation instant.
      </p>
      <p>
        <strong>Legacy system integration:</strong> Older build systems, serverless platforms, or embedded environments may only support vanilla JavaScript. Converting TypeScript output to a specific ES version (ES5, ES2015, ES2020) ensures compatibility with these constrained runtimes.
      </p>

      <h2>Method 1: Using the TypeScript Compiler (tsc)</h2>
      <p>
        The official TypeScript compiler is the most reliable way to <strong>convert TS to JS</strong>. It performs full type checking, handles all TypeScript syntax including enums and namespaces, and produces accurate JavaScript output. Here is how to set it up:
      </p>
      <h3>Installation</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`# Install TypeScript globally
npm install -g typescript

# Or install locally in your project
npm install --save-dev typescript

# Verify installation
tsc --version`}</code></pre>

      <h3>Basic Compilation</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`# Compile a single file
tsc app.ts
# Produces app.js in the same directory

# Compile with a specific target
tsc --target ES2020 app.ts

# Compile an entire project using tsconfig.json
tsc

# Watch mode for development
tsc --watch`}</code></pre>

      <h3>tsconfig.json Configuration</h3>
      <p>
        A well-configured <code>tsconfig.json</code> controls exactly how TypeScript is converted to JavaScript. Here are the key compiler options relevant to JS output:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationDir": "./dist/types",
    "sourceMap": true,
    "removeComments": false,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}`}</code></pre>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', marginTop: '12px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Option</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Effect on JS Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>target</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Controls which ES version the output uses (ES5, ES2015, ES2020, ESNext)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>module</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Sets the module system: CommonJS (<code>require</code>), ESNext (<code>import</code>)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>declaration</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Generates <code>.d.ts</code> files alongside JS output</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>sourceMap</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Generates <code>.js.map</code> files for debugging</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>removeComments</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Strips all comments from output JS</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>outDir</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Directory where compiled JS files are written</td>
          </tr>
        </tbody>
      </table>

      <h3>Example: TypeScript Input vs JavaScript Output</h3>
      <p><strong>TypeScript Input:</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

type Role = 'admin' | 'editor' | 'viewer';

function greetUser(user: User, role: Role): string {
  const greeting: string = \`Hello, \${user.name}!\`;
  return \`\${greeting} You are logged in as \${role}.\`;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', isActive: true },
  { id: 2, name: 'Bob', email: 'bob@example.com', isActive: false },
];

const activeUsers: User[] = users.filter(
  (user: User): boolean => user.isActive
);

export { greetUser, activeUsers };`}</code></pre>

      <p><strong>JavaScript Output (ES2020 target):</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`function greetUser(user, role) {
  const greeting = \`Hello, \${user.name}!\`;
  return \`\${greeting} You are logged in as \${role}.\`;
}

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', isActive: true },
  { id: 2, name: 'Bob', email: 'bob@example.com', isActive: false },
];

const activeUsers = users.filter(
  (user) => user.isActive
);

export { greetUser, activeUsers };`}</code></pre>
      <p>
        Notice how the <code>interface</code>, <code>type</code> alias, and all type annotations are completely removed. The runtime logic remains identical. This is the fundamental operation of any <strong>TypeScript to JavaScript converter</strong>.
      </p>

      <h2>Method 2: Online Converter Tools</h2>
      <p>
        When you need a quick conversion without installing anything, an online converter is the fastest path. Our <Link href={`/${lang}/tools/typescript-to-javascript`}>TypeScript to JavaScript online converter</Link> handles the full TypeScript syntax including generics, enums, interfaces, type guards, and decorators.
      </p>
      <p>
        <strong>When to use an online converter:</strong>
      </p>
      <ul>
        <li>Quick one-off conversions while learning or debugging</li>
        <li>Converting code snippets from TS documentation or Stack Overflow answers</li>
        <li>Sharing JavaScript versions of TypeScript examples with team members who do not use TS</li>
        <li>Verifying what JavaScript output the TypeScript compiler would produce</li>
        <li>Converting single files without setting up a build pipeline</li>
      </ul>
      <p>
        You can also use our <Link href={`/${lang}/tools/ts-to-js-converter`}>TS to JS converter</Link> which provides the same functionality with additional formatting options. Both tools run entirely in your browser, so your code never leaves your machine.
      </p>

      <h2>Method 3: Babel for TypeScript Stripping</h2>
      <p>
        Babel can strip TypeScript types using the <code>@babel/preset-typescript</code> preset. This approach is ideal when you already have a Babel-based build pipeline and want to add TypeScript support without replacing your existing setup.
      </p>

      <h3>Installation</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`npm install --save-dev @babel/core @babel/cli \\
  @babel/preset-env @babel/preset-typescript`}</code></pre>

      <h3>babel.config.json</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`{
  "presets": [
    ["@babel/preset-env", { "targets": "> 0.25%, not dead" }],
    "@babel/preset-typescript"
  ]
}`}</code></pre>

      <h3>Usage</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`# Compile a single file
npx babel src/app.ts --out-file dist/app.js

# Compile entire directory
npx babel src --out-dir dist --extensions ".ts,.tsx"

# Watch mode
npx babel src --out-dir dist --extensions ".ts,.tsx" --watch`}</code></pre>

      <p>
        <strong>Important limitation:</strong> Babel does <em>not</em> perform type checking. It only strips types. This means type errors in your TypeScript code will not be caught during the Babel compilation step. You should run <code>tsc --noEmit</code> separately (for example, in your CI pipeline or as a pre-commit hook) to catch type errors.
      </p>
      <p>
        Babel also cannot handle certain TypeScript-specific features that require type information:
      </p>
      <ul>
        <li><code>const enum</code> declarations (Babel replaces them with regular enums)</li>
        <li><code>namespace</code> merging across files</li>
        <li>Legacy <code>export =</code> syntax</li>
      </ul>

      <h2>Method 4: esbuild (Fastest Approach)</h2>
      <p>
        esbuild is a JavaScript bundler written in Go that compiles TypeScript to JavaScript at extraordinary speed. It is typically 10-100x faster than <code>tsc</code> and is the engine powering Vite during development. If build speed is your primary concern, esbuild is the best choice.
      </p>

      <h3>Installation and Basic Usage</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`npm install --save-dev esbuild

# Transform a single file (type-strip only)
npx esbuild src/app.ts --outfile=dist/app.js

# Bundle with tree-shaking
npx esbuild src/index.ts --bundle --outfile=dist/bundle.js \\
  --format=esm --target=es2020

# Multiple entry points
npx esbuild src/index.ts src/worker.ts \\
  --outdir=dist --format=esm`}</code></pre>

      <h3>Programmatic API</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`import { build } from 'esbuild';

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  format: 'esm',
  target: 'es2020',
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production',
  treeShaking: true,
});`}</code></pre>

      <p>
        Like Babel, esbuild performs type stripping only. It does not validate types. Run <code>tsc --noEmit</code> separately for type checking. esbuild also does not support <code>const enum</code> or legacy <code>namespace</code> merging.
      </p>

      <h3>Performance Comparison</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', marginTop: '12px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Tool</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>1,000 Files</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Type Checking</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Language</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>tsc</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~15-30s</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes (full)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>TypeScript (JS)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>babel</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~8-15s</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>JavaScript</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>esbuild</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~0.3-1s</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Go</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>swc</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~0.5-1.5s</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Rust</td>
          </tr>
        </tbody>
      </table>

      <h2>Method 5: SWC -- Rust-Based Speed</h2>
      <p>
        SWC (Speedy Web Compiler) is a Rust-based JavaScript/TypeScript compiler that offers performance comparable to esbuild. It is the default compiler in Next.js and is used by tools like Parcel and Deno. SWC supports a broader range of TypeScript features than esbuild, including decorators.
      </p>

      <h3>Installation and Usage</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`npm install --save-dev @swc/core @swc/cli

# Compile a single file
npx swc src/app.ts -o dist/app.js

# Compile a directory
npx swc src --out-dir dist

# Watch mode
npx swc src --out-dir dist --watch`}</code></pre>

      <h3>.swcrc Configuration</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": true,
      "dynamicImport": true
    },
    "transform": {
      "legacyDecorator": true,
      "decoratorMetadata": true
    },
    "target": "es2020"
  },
  "module": {
    "type": "es6"
  },
  "sourceMaps": true
}`}</code></pre>

      <p>
        SWC advantages over esbuild:
      </p>
      <ul>
        <li>Full decorator support (both legacy and TC39 Stage 3)</li>
        <li>Better <code>const enum</code> handling via plugin system</li>
        <li>Used by Next.js, so it is battle-tested at scale</li>
        <li>Plugin system for custom transformations</li>
      </ul>

      <h2>Handling Common Conversion Challenges</h2>
      <p>
        Not all TypeScript features are simple type annotations that can be erased. Some TypeScript constructs emit runtime JavaScript code and require careful handling during conversion.
      </p>

      <h3>Enums</h3>
      <p>
        TypeScript enums compile to JavaScript objects with forward and reverse mappings. This is one of the few TypeScript features that produces new runtime code rather than just type annotations:
      </p>
      <p><strong>TypeScript:</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}

function move(direction: Direction): void {
  console.log(\`Moving \${direction}\`);
}`}</code></pre>

      <p><strong>Compiled JavaScript:</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`var Direction;
(function (Direction) {
  Direction["Up"] = "UP";
  Direction["Down"] = "DOWN";
  Direction["Left"] = "LEFT";
  Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));

var StatusCode;
(function (StatusCode) {
  StatusCode[StatusCode["OK"] = 200] = "OK";
  StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
  StatusCode[StatusCode["ServerError"] = 500] = "ServerError";
})(StatusCode || (StatusCode = {}));

function move(direction) {
  console.log(\`Moving \${direction}\`);
}`}</code></pre>

      <p>
        <strong><code>const enum</code> caveat:</strong> The <code>const enum</code> keyword tells TypeScript to inline enum values at compile time rather than creating a runtime object. Only <code>tsc</code> handles this correctly. Babel and esbuild convert <code>const enum</code> to regular <code>enum</code>, which changes the runtime behavior and bundle size.
      </p>

      <h3>Decorators</h3>
      <p>
        TypeScript decorators (commonly used with Angular, NestJS, and TypeORM) generate complex JavaScript wrapper functions:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`// TypeScript with decorators
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    return original.apply(this, args);
  };
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}`}</code></pre>
      <p>
        To compile decorators you need either <code>tsc</code> with <code>experimentalDecorators: true</code> or SWC with <code>legacyDecorator: true</code>. esbuild has limited decorator support. If your codebase uses decorators extensively, SWC or <code>tsc</code> are the recommended converters.
      </p>

      <h3>Namespaces</h3>
      <p>
        TypeScript namespaces (formerly called internal modules) compile to immediately-invoked function expressions (IIFEs):
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`// TypeScript
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      return /^[^@]+@[^@]+$/.test(s);
    }
  }
}

// Compiled JavaScript
var Validation;
(function (Validation) {
  class EmailValidator {
    isValid(s) {
      return /^[^@]+@[^@]+$/.test(s);
    }
  }
  Validation.EmailValidator = EmailValidator;
})(Validation || (Validation = {}));`}</code></pre>

      <h2>TypeScript Features That Do Not Exist in JavaScript</h2>
      <p>
        Understanding which TypeScript features have JavaScript equivalents and which are purely compile-time helps you predict the output of any <strong>TypeScript to JavaScript converter</strong>:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', marginTop: '12px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Feature</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Compile-Time Only?</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>JS Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>interface</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Completely removed</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>type</code> alias</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Completely removed</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Type annotations (<code>: string</code>)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Stripped</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Generics (<code>{'<T>'}</code>)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Stripped</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>as</code> type assertion</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Stripped</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>enum</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>IIFE creating runtime object</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>const enum</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Partially (inlined by tsc)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Inlined values or IIFE (depends on tool)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>namespace</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>IIFE wrapper</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Decorators</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Helper function calls</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Parameter properties</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Constructor assignments</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>import type</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Completely removed</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Parameter properties</strong> are a common surprise. TypeScript allows shorthand constructor parameter declarations that generate property assignments:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`// TypeScript
class Service {
  constructor(
    private readonly name: string,
    public port: number,
    protected host: string = 'localhost'
  ) {}
}

// Compiled JavaScript
class Service {
  constructor(name, port, host = 'localhost') {
    this.name = name;
    this.port = port;
    this.host = host;
  }
}`}</code></pre>

      <h2>Preserving JSDoc Comments for IDE Support</h2>
      <p>
        When you <strong>remove types from TypeScript</strong> and convert to JavaScript, you lose IDE IntelliSense, autocomplete, and inline documentation. JSDoc comments can restore much of this functionality in plain JavaScript files:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`// TypeScript original
interface Config {
  host: string;
  port: number;
  debug?: boolean;
}

function createServer(config: Config): void {
  // ...
}

// JavaScript with JSDoc (preserves IDE support)
/**
 * @typedef {Object} Config
 * @property {string} host - Server hostname
 * @property {number} port - Port number
 * @property {boolean} [debug] - Enable debug mode
 */

/**
 * Creates a new server instance.
 * @param {Config} config - Server configuration
 * @returns {void}
 */
function createServer(config) {
  // ...
}`}</code></pre>

      <p>
        You can even enable TypeScript checking on JSDoc-annotated JavaScript files by adding <code>// @ts-check</code> at the top of the file or setting <code>"checkJs": true</code> in your <code>tsconfig.json</code>. This gives you a gradual migration path in both directions.
      </p>

      <h3>Automating JSDoc Generation</h3>
      <p>
        Tools like <code>ts-to-jsdoc</code> and <code>typescript-to-jsdoc</code> can automatically convert TypeScript type annotations to JSDoc comments during the conversion process. This is valuable when migrating a project away from TypeScript while preserving developer experience:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`# Using ts-to-jsdoc
npx ts-to-jsdoc src/ --out-dir dist/

# The output JavaScript will include JSDoc equivalents
# of all TypeScript type annotations`}</code></pre>

      <h2>Build Pipeline Integration</h2>
      <p>
        Modern web applications use bundlers that handle TypeScript compilation as part of the build pipeline. Here is how the most popular tools integrate TypeScript-to-JavaScript conversion:
      </p>

      <h3>Vite</h3>
      <p>
        Vite uses esbuild for TypeScript compilation during development and Rollup for production builds. TypeScript works out of the box with zero configuration:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  // TypeScript works out of the box
  // esbuild handles TS compilation in dev
  esbuild: {
    target: 'es2020',
    // Customize esbuild TypeScript options
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
  build: {
    target: 'es2020',
    // Rollup handles production builds
    rollupOptions: {
      // ...
    },
  },
});`}</code></pre>
      <p>
        For type checking during Vite builds, install <code>vite-plugin-checker</code>:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`npm install --save-dev vite-plugin-checker

// vite.config.ts
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
  ],
});`}</code></pre>

      <h3>webpack</h3>
      <p>
        webpack requires a loader to process TypeScript files. The two main options are <code>ts-loader</code> (uses <code>tsc</code>) and <code>babel-loader</code> with <code>@babel/preset-typescript</code>:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`// webpack.config.js — Option 1: ts-loader
module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

// webpack.config.js — Option 2: esbuild-loader (fastest)
const { EsbuildPlugin } = require('esbuild-loader');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2020',
        },
      },
    ],
  },
  plugins: [new EsbuildPlugin({ target: 'es2020' })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};`}</code></pre>

      <h3>Rollup</h3>
      <p>
        Rollup is commonly used for building libraries. The <code>@rollup/plugin-typescript</code> or <code>rollup-plugin-esbuild</code> handles TypeScript compilation:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`// rollup.config.js — using esbuild (recommended)
import esbuild from 'rollup-plugin-esbuild';

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.cjs', format: 'cjs' },
    { file: 'dist/index.mjs', format: 'esm' },
  ],
  plugins: [
    esbuild({
      target: 'es2020',
      sourceMap: true,
      minify: false,
    }),
  ],
};`}</code></pre>

      <h2>Choosing the Right Conversion Method</h2>
      <p>
        The best method depends on your specific requirements. Here is a decision guide:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', marginTop: '12px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Scenario</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Recommended Tool</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Publishing an npm library</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>tsc</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Generates <code>.d.ts</code> declaration files alongside JS</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Quick one-off conversion</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><Link href={`/${lang}/tools/typescript-to-javascript`}>Online converter</Link></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No installation needed, instant results</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Existing Babel pipeline</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>@babel/preset-typescript</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Integrates with existing Babel plugins</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Maximum build speed</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>esbuild</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>10-100x faster than tsc, powers Vite</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Decorator-heavy code (Angular/NestJS)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>swc</code> or <code>tsc</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Full decorator transform support</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Next.js project</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>swc</code> (built-in)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Default compiler, zero config needed</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Full project migration from TS to JS</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>tsc</code> + <code>ts-to-jsdoc</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Preserves IDE support via JSDoc</td>
          </tr>
        </tbody>
      </table>

      <h2>Step-by-Step: Bulk Convert a TypeScript Project to JavaScript</h2>
      <p>
        If you need to <strong>convert an entire TypeScript project to JavaScript</strong>, follow this systematic approach:
      </p>
      <ol>
        <li>
          <strong>Audit your TypeScript features:</strong> Check if you use <code>enum</code>, <code>namespace</code>, decorators, or <code>const enum</code>. These affect which tool you can use.
        </li>
        <li>
          <strong>Compile with tsc first:</strong> Run <code>tsc --outDir dist</code> to generate baseline JavaScript output. This confirms your code compiles cleanly.
        </li>
        <li>
          <strong>Generate JSDoc annotations:</strong> If preserving IDE support matters, run <code>ts-to-jsdoc</code> to convert type annotations to JSDoc comments.
        </li>
        <li>
          <strong>Rename files:</strong> Change all <code>.ts</code> to <code>.js</code> and <code>.tsx</code> to <code>.jsx</code> (or <code>.js</code> if your bundler supports it).
        </li>
        <li>
          <strong>Remove tsconfig.json:</strong> Replace with a <code>jsconfig.json</code> if you want path aliases and module resolution hints for your IDE.
        </li>
        <li>
          <strong>Update package.json:</strong> Remove <code>typescript</code> and <code>@types/*</code> dev dependencies. Update build scripts to remove the <code>tsc</code> step.
        </li>
        <li>
          <strong>Test thoroughly:</strong> Run your entire test suite to verify that the converted JavaScript behaves identically to the original TypeScript.
        </li>
      </ol>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`# Quick bulk conversion script
#!/bin/bash

# 1. Compile TypeScript to JavaScript
tsc --outDir dist --declaration false --sourceMap false

# 2. Copy non-TS files
rsync -av --exclude='*.ts' --exclude='*.tsx' src/ dist/

# 3. Verify output
node dist/index.js

echo "Conversion complete. Check dist/ directory."`}</code></pre>

      <h2>Common Errors and Troubleshooting</h2>
      <p>
        Here are the most frequent issues developers encounter when converting TypeScript to JavaScript, along with their solutions:
      </p>

      <h3>Error: Cannot find module</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`// Problem: TypeScript path aliases don't resolve in JS
import { utils } from '@/lib/utils';

// Solution: Use relative paths or configure module resolution
import { utils } from '../lib/utils.js';

// Or configure jsconfig.json paths
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}`}</code></pre>

      <h3>Error: Unexpected token (enum/namespace)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`// Problem: Babel/esbuild encounters const enum
const enum Color { Red, Green, Blue }

// Solution 1: Replace const enum with regular enum
enum Color { Red, Green, Blue }

// Solution 2: Replace with a plain object
const Color = {
  Red: 0,
  Green: 1,
  Blue: 2,
} as const;
// In JS (after conversion):
const Color = { Red: 0, Green: 1, Blue: 2 };`}</code></pre>

      <h3>Error: File extension issues with ESM</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px', lineHeight: '1.6' }}><code>{`// Problem: Node.js ESM requires .js extensions
import { helper } from './helper';
// Error: Cannot find module './helper'

// Solution: Add explicit .js extensions
import { helper } from './helper.js';
// This works even when the source file is helper.ts

// In tsconfig.json, set:
{
  "compilerOptions": {
    "moduleResolution": "nodenext",
    "module": "nodenext"
  }
}`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>Can I convert TypeScript to JavaScript without installing anything?</h3>
        <p>
          Yes. Use our <Link href={`/${lang}/tools/typescript-to-javascript`}>online TypeScript to JavaScript converter</Link> which runs entirely in your browser. Paste your TypeScript code and get clean JavaScript output instantly. No npm packages, no build tools, no command line required.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>Does converting TypeScript to JavaScript change the runtime behavior?</h3>
        <p>
          For pure type annotations (interfaces, type aliases, generics), removing them has zero effect on runtime behavior. However, enums, namespaces, parameter properties, and decorators produce runtime JavaScript code. The conversion of these features can produce slightly different output depending on which tool you use, though the intended behavior should remain the same.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>What is the fastest way to compile TypeScript?</h3>
        <p>
          esbuild is the fastest TypeScript compiler, processing thousands of files in under a second. It is written in Go and performs only type stripping without type checking. For projects that need both speed and type safety, run esbuild for compilation and <code>tsc --noEmit</code> for type checking in parallel.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>Should I use tsc or esbuild for my project?</h3>
        <p>
          Use <code>tsc</code> when you need declaration file generation (<code>.d.ts</code>), full <code>const enum</code> support, or namespace merging. Use esbuild when build speed is critical and you handle type checking separately. Many projects use both: esbuild for fast development builds and <code>tsc</code> for CI/CD type checking and declaration generation.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>How do I preserve IntelliSense after removing TypeScript?</h3>
        <p>
          Add JSDoc comments to your JavaScript files. Modern IDEs like VS Code read JSDoc annotations and provide autocomplete, type hints, and inline documentation. You can even enable type checking on JS files with <code>// @ts-check</code> or <code>"checkJs": true</code> in <code>jsconfig.json</code>.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>Can Babel handle all TypeScript features?</h3>
        <p>
          Babel handles most TypeScript features but has limitations with <code>const enum</code> (treats as regular enum), <code>namespace</code> merging across files, and the legacy <code>export =</code> syntax. For most projects, these limitations are not relevant. If your codebase uses these features extensively, use <code>tsc</code> or SWC instead.
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>What is the difference between ts-to-js-converter tools and the TypeScript compiler?</h3>
        <p>
          Online <Link href={`/${lang}/tools/ts-to-js-converter`}>TS to JS converter</Link> tools and the <code>tsc</code> compiler perform the same fundamental operation: removing TypeScript-specific syntax to produce valid JavaScript. Online tools are convenient for quick conversions, while <code>tsc</code> is designed for project-wide compilation with configuration, source maps, and declaration file output.
        </p>
      </div>

      <p>
        For a deeper comparison of when to use TypeScript versus JavaScript, see our guide on <Link href={`/${lang}/blog/typescript-vs-javascript-when-to-convert`}>TypeScript vs JavaScript: When to Convert</Link>.
      </p>

      {/* FAQ Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can I convert TypeScript to JavaScript without installing anything?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Use an online TypeScript to JavaScript converter that runs in your browser. Paste your TypeScript code and get clean JavaScript output instantly without installing npm packages or build tools.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does converting TypeScript to JavaScript change the runtime behavior?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For pure type annotations (interfaces, type aliases, generics), removing them has zero effect on runtime behavior. However, enums, namespaces, parameter properties, and decorators produce runtime JavaScript code that may vary slightly depending on the compilation tool.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the fastest way to compile TypeScript to JavaScript?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'esbuild is the fastest TypeScript compiler, processing thousands of files in under a second. It is written in Go and performs type stripping without type checking. SWC (written in Rust) is a close second.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I use tsc or esbuild for my TypeScript project?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use tsc when you need declaration file generation (.d.ts), const enum support, or namespace merging. Use esbuild when build speed is critical. Many projects use both: esbuild for fast builds and tsc for type checking.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I preserve IntelliSense after removing TypeScript?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Add JSDoc comments to your JavaScript files. Modern IDEs like VS Code read JSDoc annotations and provide autocomplete, type hints, and inline documentation. Enable type checking with // @ts-check or checkJs in jsconfig.json.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can Babel handle all TypeScript features?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Babel handles most TypeScript features but has limitations with const enum (treats as regular enum), namespace merging across files, and legacy export = syntax. For most projects these limitations are not relevant.',
            },
          },
          {
            '@type': 'Question',
            name: 'What TypeScript features produce runtime JavaScript code?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Enums, const enums, namespaces, decorators, and parameter properties all produce runtime JavaScript code. Interfaces, type aliases, generics, and type annotations are purely compile-time and are completely removed during conversion.',
            },
          },
        ],
      }) }} />
    </>
  );
}
