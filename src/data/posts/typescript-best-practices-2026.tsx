'use client';

import Link from 'next/link';

export default function TypeScriptBestPractices2026({ lang }: { lang: string }) {
  return (
    <>
      <h2>TypeScript Best Practices for 2026</h2>
      <p>
        TypeScript has become the default language for professional JavaScript development. With TypeScript 5.7+ bringing new features and the ecosystem maturing, the best practices have evolved considerably. This guide covers the most impactful patterns, strict mode configurations, utility types, error handling, and architectural patterns that every TypeScript developer should adopt in 2026.
      </p>
      <p>
        Whether you are starting a new project or improving an existing codebase, these practices will help you write safer, more maintainable, and more expressive TypeScript code.
      </p>

      <h2>Strict Mode: The Non-Negotiable Foundation</h2>
      <p>
        Running TypeScript without strict mode is like wearing a seatbelt without buckling it. In 2026, there is no reason to start a project without the strictest possible configuration. Here is the recommended <code>tsconfig.json</code> baseline for new projects.
      </p>
      <pre><code className="language-json">{`{
  "compilerOptions": {
    // Strict mode (enables ALL strict checks)
    "strict": true,

    // Additional strictness beyond "strict"
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,

    // Import/export discipline
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "moduleDetection": "force",

    // Modern output
    "target": "ES2024",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",

    // Quality checks
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,

    // Path aliases
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}</code></pre>

      <h3>Why noUncheckedIndexedAccess Matters</h3>
      <p>
        This is one of the most important settings that is not included in <code>strict: true</code>. Without it, TypeScript assumes array and object index access always returns a defined value, which is a common source of runtime errors.
      </p>
      <pre><code className="language-typescript">{`// Without noUncheckedIndexedAccess
const items = ['a', 'b', 'c'];
const item = items[5]; // type: string (WRONG - it's undefined!)
console.log(item.toUpperCase()); // Runtime crash!

// With noUncheckedIndexedAccess
const items = ['a', 'b', 'c'];
const item = items[5]; // type: string | undefined (CORRECT)
if (item) {
  console.log(item.toUpperCase()); // Safe
}

// Same applies to object index signatures
const cache: Record<string, number> = {};
const value = cache['missing']; // type: number | undefined
// Forces you to handle the undefined case`}</code></pre>

      <h2>Utility Types: Beyond the Basics</h2>
      <p>
        TypeScript's built-in utility types are powerful, but many developers only use <code>Partial</code> and <code>Pick</code>. Here are advanced utility type patterns that solve real-world problems.
      </p>

      <h3>Creating Strict API Types</h3>
      <pre><code className="language-typescript">{`// Base entity type
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// Create request - omit server-generated fields
type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

// Update request - all fields optional except id
type UpdateUserRequest = Pick<User, 'id'> & Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

// API response - ensure certain fields are always present
type UserResponse = Required<Pick<User, 'id' | 'email' | 'name' | 'role'>>;

// List response with pagination
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

type UserListResponse = PaginatedResponse<UserResponse>;`}</code></pre>

      <h3>Advanced Mapped Types</h3>
      <pre><code className="language-typescript">{`// Make specific properties required
type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Usage: config where 'apiKey' must be provided
type Config = {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
};
type ProductionConfig = RequireKeys<Config, 'apiKey' | 'baseUrl'>;

// Deep Readonly - prevents nested mutation
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};

// Deep Partial - useful for nested config updates
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[K]>
    : T[K];
};

// Extract non-nullable keys
type NonNullableKeys<T> = {
  [K in keyof T]-?: null extends T[K] ? never : undefined extends T[K] ? never : K;
}[keyof T];`}</code></pre>

      <h2>Discriminated Unions: The Pattern You Should Use Everywhere</h2>
      <p>
        Discriminated unions are the single most important pattern in TypeScript for modeling domain logic. They replace error-prone string checks with compile-time safety and enable exhaustive pattern matching.
      </p>
      <pre><code className="language-typescript">{`// Model API responses with discriminated unions
type ApiResult<T> =
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: string; code: number }
  | { status: 'loading' }
  | { status: 'idle' };

function handleResult<T>(result: ApiResult<T>) {
  switch (result.status) {
    case 'success':
      // TypeScript knows result.data exists here
      console.log(result.data, result.timestamp);
      break;
    case 'error':
      // TypeScript knows result.error and result.code exist here
      console.error(\`Error \${result.code}: \${result.error}\`);
      break;
    case 'loading':
      console.log('Loading...');
      break;
    case 'idle':
      console.log('Ready');
      break;
    default:
      // Exhaustiveness check - compile error if a case is missing
      const _exhaustive: never = result;
      throw new Error(\`Unhandled status: \${_exhaustive}\`);
  }
}

// Model domain events
type DomainEvent =
  | { type: 'USER_CREATED'; payload: { userId: string; email: string } }
  | { type: 'USER_UPDATED'; payload: { userId: string; changes: Partial<User> } }
  | { type: 'USER_DELETED'; payload: { userId: string; reason: string } }
  | { type: 'ORDER_PLACED'; payload: { orderId: string; items: OrderItem[] } };

// Type-safe event handler
type EventHandler<E extends DomainEvent['type']> = (
  payload: Extract<DomainEvent, { type: E }>['payload']
) => void;

// Usage
const handleUserCreated: EventHandler<'USER_CREATED'> = (payload) => {
  // payload is typed as { userId: string; email: string }
  sendWelcomeEmail(payload.email);
};`}</code></pre>

      <h2>Error Handling with Result Types</h2>
      <p>
        Throwing exceptions is the default error handling mechanism in JavaScript, but it provides no type safety. In 2026, the Result pattern has gained widespread adoption for explicit, type-safe error handling.
      </p>
      <pre><code className="language-typescript">{`// Define a Result type
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// Helper functions
function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// Define domain-specific errors
type ValidationError = { type: 'validation'; field: string; message: string };
type NotFoundError = { type: 'not_found'; resource: string; id: string };
type AuthError = { type: 'unauthorized'; reason: string };
type AppError = ValidationError | NotFoundError | AuthError;

// Use Result in functions
async function getUser(id: string): Promise<Result<User, NotFoundError>> {
  const user = await db.findUser(id);
  if (!user) {
    return Err({ type: 'not_found', resource: 'user', id });
  }
  return Ok(user);
}

async function updateUserEmail(
  userId: string,
  email: string
): Promise<Result<User, AppError>> {
  // Validate
  if (!email.includes('@')) {
    return Err({ type: 'validation', field: 'email', message: 'Invalid email format' });
  }

  // Check existence
  const userResult = await getUser(userId);
  if (!userResult.ok) {
    return userResult; // Forward the error
  }

  // Update
  const updated = await db.updateUser(userId, { email });
  return Ok(updated);
}

// Usage - caller must handle both cases
const result = await updateUserEmail('123', 'new@example.com');
if (result.ok) {
  console.log('Updated:', result.value.email);
} else {
  switch (result.error.type) {
    case 'validation':
      showFieldError(result.error.field, result.error.message);
      break;
    case 'not_found':
      show404Page();
      break;
    case 'unauthorized':
      redirectToLogin();
      break;
  }
}`}</code></pre>

      <h2>Template Literal Types for String Validation</h2>
      <p>
        Template literal types allow you to enforce string patterns at compile time. This is particularly useful for API routes, CSS values, environment variables, and configuration keys.
      </p>
      <pre><code className="language-typescript">{`// Enforce route patterns
type ApiRoute = \`/api/\${string}\`;
type VersionedRoute = \`/api/v\${number}/\${string}\`;

function fetchApi(route: ApiRoute): Promise<Response> {
  return fetch(route);
}
fetchApi('/api/users');     // OK
// fetchApi('/users');      // Compile error!

// CSS unit types
type CSSLength = \`\${number}px\` | \`\${number}rem\` | \`\${number}em\` | \`\${number}%\`;

function setWidth(el: HTMLElement, width: CSSLength) {
  el.style.width = width;
}
setWidth(el, '16px');   // OK
setWidth(el, '2rem');   // OK
// setWidth(el, '16');  // Compile error!

// Environment variable keys
type EnvKey = \`NEXT_PUBLIC_\${string}\` | \`DATABASE_\${string}\` | \`REDIS_\${string}\`;

function getEnv(key: EnvKey): string | undefined {
  return process.env[key];
}
getEnv('NEXT_PUBLIC_API_URL');  // OK
getEnv('DATABASE_URL');         // OK
// getEnv('SECRET');            // Compile error!

// Event name patterns
type DomainEventName = \`\${Lowercase<string>}.\${Lowercase<string>}\`;
// Matches: 'user.created', 'order.placed'
// Rejects: 'UserCreated', 'CREATED'`}</code></pre>

      <h2>Type-Safe Function Patterns</h2>
      <p>
        Functions are the building blocks of any application. These patterns ensure your functions are as type-safe as possible.
      </p>

      <h3>Branded Types for Primitive Safety</h3>
      <pre><code className="language-typescript">{`// Prevent mixing up IDs of different entities
type Brand<T, B extends string> = T & { readonly __brand: B };

type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;
type ProductId = Brand<string, 'ProductId'>;

// Factory functions
function UserId(id: string): UserId { return id as UserId; }
function OrderId(id: string): OrderId { return id as OrderId; }

// Now TypeScript prevents mixing IDs
function getOrder(orderId: OrderId): Promise<Order> {
  return db.findOrder(orderId);
}

const userId = UserId('user-123');
const orderId = OrderId('order-456');

getOrder(orderId);   // OK
// getOrder(userId); // Compile error! UserId is not assignable to OrderId

// Branded types for validated data
type Email = Brand<string, 'Email'>;
type NonEmptyString = Brand<string, 'NonEmptyString'>;
type PositiveNumber = Brand<number, 'PositiveNumber'>;

function validateEmail(input: string): Email | null {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(input) ? (input as Email) : null;
}

function sendEmail(to: Email, subject: string, body: string): void {
  // 'to' is guaranteed to be a valid email
}`}</code></pre>

      <h3>Builder Pattern with Type Safety</h3>
      <pre><code className="language-typescript">{`// Type-safe query builder
interface QueryState {
  table: string | null;
  conditions: string[];
  orderBy: string | null;
  limit: number | null;
}

class QueryBuilder<State extends Partial<QueryState> = {}> {
  private state: QueryState = {
    table: null,
    conditions: [],
    orderBy: null,
    limit: null,
  };

  from<T extends string>(
    table: T
  ): QueryBuilder<State & { table: T }> {
    this.state.table = table;
    return this as any;
  }

  where(condition: string): QueryBuilder<State & { conditions: string[] }> {
    this.state.conditions.push(condition);
    return this as any;
  }

  orderBy(column: string): QueryBuilder<State & { orderBy: string }> {
    this.state.orderBy = column;
    return this as any;
  }

  // execute() only available when table is set
  execute(
    this: QueryBuilder<{ table: string } & State>
  ): Promise<unknown[]> {
    const sql = this.buildSQL();
    return db.query(sql);
  }

  private buildSQL(): string {
    let sql = \`SELECT * FROM \${this.state.table}\`;
    if (this.state.conditions.length) {
      sql += \` WHERE \${this.state.conditions.join(' AND ')}\`;
    }
    if (this.state.orderBy) {
      sql += \` ORDER BY \${this.state.orderBy}\`;
    }
    if (this.state.limit) {
      sql += \` LIMIT \${this.state.limit}\`;
    }
    return sql;
  }
}

// Usage
new QueryBuilder()
  .from('users')
  .where('active = true')
  .orderBy('created_at')
  .execute(); // OK - table is set

// new QueryBuilder()
//   .where('active = true')
//   .execute(); // Compile error! 'table' is missing`}</code></pre>

      <h2>Const Assertions and Readonly Patterns</h2>
      <pre><code className="language-typescript">{`// Use 'as const' for literal types
const ROLES = ['admin', 'editor', 'viewer'] as const;
type Role = typeof ROLES[number]; // 'admin' | 'editor' | 'viewer'

// Configuration objects
const config = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
  },
  features: {
    darkMode: true,
    betaAccess: false,
  },
} as const;

// Type-safe config access
type Config = typeof config;
type ApiConfig = Config['api'];
// ApiConfig = { readonly baseUrl: "https://api.example.com"; readonly timeout: 5000; readonly retries: 3 }

// Enum-like objects (preferred over enums)
const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

type HttpStatusCode = typeof HttpStatus[keyof typeof HttpStatus];
// 200 | 201 | 400 | 404 | 500`}</code></pre>

      <h2>Zod and Runtime Validation</h2>
      <p>
        TypeScript types only exist at compile time. For runtime validation of external data (API responses, form inputs, environment variables), use a validation library like Zod to bridge the gap.
      </p>
      <pre><code className="language-typescript">{`import { z } from 'zod';

// Define schema once, get both validation AND types
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(['admin', 'editor', 'viewer']),
  preferences: z.object({
    theme: z.enum(['light', 'dark']).default('light'),
    notifications: z.boolean().default(true),
  }),
  createdAt: z.coerce.date(),
});

// Derive TypeScript type from schema
type User = z.infer<typeof UserSchema>;

// Validate API responses
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();
  return UserSchema.parse(data); // Throws if invalid
}

// Safe parsing (returns Result-like object)
const result = UserSchema.safeParse(unknownData);
if (result.success) {
  console.log(result.data.email); // Fully typed
} else {
  console.error(result.error.flatten());
}

// Environment variable validation
const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

export const env = EnvSchema.parse(process.env);`}</code></pre>

      <h2>Module Organization Patterns</h2>
      <pre><code className="language-typescript">{`// Barrel exports with explicit public API
// src/features/auth/index.ts
export { AuthProvider } from './components/AuthProvider';
export { useAuth } from './hooks/useAuth';
export { loginAction, logoutAction } from './actions';
export type { User, Session, AuthState } from './types';
// Internal modules are NOT exported

// Re-export pattern for cleaner imports
// src/lib/index.ts
export { db } from './database';
export { cache } from './cache';
export { logger } from './logger';
export type { DbClient, CacheClient } from './types';

// Usage: import { db, cache, logger } from '@/lib';

// Feature-based organization
// src/features/
// ├── auth/
// │   ├── index.ts         # Public API
// │   ├── types.ts          # Auth types
// │   ├── actions.ts        # Server actions
// │   ├── hooks/            # React hooks
// │   ├── components/       # Auth components
// │   └── __tests__/        # Tests
// ├── billing/
// │   ├── index.ts
// │   ├── types.ts
// │   └── ...
// └── shared/
//     ├── index.ts
//     └── types.ts`}</code></pre>

      <h2>Performance-Oriented Type Patterns</h2>
      <p>
        Complex types can slow down the TypeScript compiler. Here are patterns to keep type-checking fast.
      </p>
      <ul>
        <li><strong>Avoid deep recursive types</strong>: Limit recursion depth in mapped types. Use TypeScript's built-in recursion limits.</li>
        <li><strong>Prefer interfaces over type aliases</strong>: Interfaces are cached by name, while type aliases are expanded on every use.</li>
        <li><strong>Use project references</strong>: Split large monorepos into multiple tsconfig projects with <code>references</code> for incremental builds.</li>
        <li><strong>Avoid excessive inference</strong>: Annotate function return types explicitly for public API functions to reduce inference work.</li>
        <li><strong>Limit union size</strong>: Unions with hundreds of members slow down type checking. Consider using branded strings instead.</li>
      </ul>

      <pre><code className="language-typescript">{`// Prefer interfaces for object types (faster compilation)
// Good
interface UserProps {
  name: string;
  email: string;
}

// Avoid for simple object types
type UserProps = {
  name: string;
  email: string;
};

// Annotate return types for public functions
// Good - explicit return type
function createUser(input: CreateUserInput): Promise<Result<User, AppError>> {
  // ...
}

// Avoid - forces TypeScript to infer complex return type
function createUser(input: CreateUserInput) {
  // TypeScript must analyze entire function body to infer type
}`}</code></pre>

      <h2>Conclusion</h2>
      <p>
        TypeScript in 2026 is a mature, powerful type system that goes far beyond basic type annotations. By adopting strict mode, leveraging utility types, using discriminated unions for domain modeling, implementing Result types for error handling, and applying branded types for primitive safety, you can write code that is both more correct and more expressive.
      </p>
      <p>
        The investment in learning these patterns pays dividends through fewer runtime errors, better refactoring support, and code that serves as its own documentation. Start by enabling the strictest tsconfig settings, adopt discriminated unions for your domain types, and gradually introduce more advanced patterns as your team becomes comfortable with them.
      </p>
      <p>
        Experiment with TypeScript types using our <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> or explore more development best practices in our <Link href={`/${lang}/blog/git-branching-strategies`}>Git Branching Strategies guide</Link>.
      </p>
    </>
  );
}
