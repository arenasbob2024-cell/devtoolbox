'use client';

import Link from 'next/link';

export default function TypescriptUtilityTypes({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Are TypeScript Utility Types?</h2>
      <p>
        <strong>TypeScript utility types</strong> are built-in generic types that let you transform existing types into new ones without rewriting them. They are essential for writing DRY (Don&apos;t Repeat Yourself), type-safe TypeScript code. Instead of manually defining variations of your types, utility types like <code>Partial</code>, <code>Pick</code>, <code>Omit</code>, and <code>Record</code> let you derive new types from existing ones.
      </p>
      <p>
        This cheat sheet covers every built-in utility type with practical examples, common patterns, and real-world use cases that you can use in your TypeScript projects today.
      </p>

      <h2>Partial&lt;T&gt;: Make All Properties Optional</h2>
      <p>
        <code>Partial&lt;T&gt;</code> constructs a type with all properties of <code>T</code> set to optional. This is extremely useful for update functions and patch operations.
      </p>
      <pre><code className="language-typescript">{`interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: 'admin' | 'user';
}

// All fields become optional
type PartialUser = Partial<User>;
// Equivalent to:
// {
//   id?: string;
//   name?: string;
//   email?: string;
//   age?: number;
//   role?: 'admin' | 'user';
// }

// Common use: Update functions (PATCH operations)
async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const user = await db.users.findById(id);
  return db.users.update(id, { ...user, ...updates });
}

// Usage - only pass the fields you want to update
await updateUser('123', { name: 'New Name' });
await updateUser('123', { age: 31, role: 'admin' });`}</code></pre>

      <h2>Required&lt;T&gt;: Make All Properties Required</h2>
      <p>
        <code>Required&lt;T&gt;</code> is the opposite of <code>Partial</code>. It makes all properties required, removing optional markers.
      </p>
      <pre><code className="language-typescript">{`interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
  timeout?: number;
}

// All fields become required
type RequiredConfig = Required<Config>;
// {
//   host: string;
//   port: number;
//   debug: boolean;
//   timeout: number;
// }

// Common use: Merge defaults with user config
function createServer(userConfig: Config): RequiredConfig {
  const defaults: RequiredConfig = {
    host: 'localhost',
    port: 3000,
    debug: false,
    timeout: 30000,
  };
  return { ...defaults, ...userConfig };
}`}</code></pre>

      <h2>Pick&lt;T, K&gt;: Select Specific Properties</h2>
      <p>
        <code>Pick&lt;T, K&gt;</code> creates a type by picking a set of properties from <code>T</code>. Use it when you need a subset of an existing type.
      </p>
      <pre><code className="language-typescript">{`interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Pick only the fields you need
type UserPublicProfile = Pick<User, 'id' | 'name' | 'email'>;
// { id: string; name: string; email: string; }

type UserCredentials = Pick<User, 'email' | 'password'>;
// { email: string; password: string; }

// Common use: API response types
function getPublicProfile(userId: string): Promise<UserPublicProfile> {
  // Only return safe-to-expose fields
  return db.users.findById(userId, { select: ['id', 'name', 'email'] });
}

// Common use: Form data types
type LoginForm = Pick<User, 'email' | 'password'>;

function handleLogin(data: LoginForm) {
  // data has only email and password
  return auth.signIn(data.email, data.password);
}`}</code></pre>

      <h2>Omit&lt;T, K&gt;: Exclude Specific Properties</h2>
      <p>
        <code>Omit&lt;T, K&gt;</code> creates a type by removing specified properties from <code>T</code>. It is the inverse of <code>Pick</code>.
      </p>
      <pre><code className="language-typescript">{`interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Remove sensitive and auto-generated fields
type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
// { name: string; email: string; password: string; }

type UserResponse = Omit<User, 'password'>;
// { id: string; name: string; email: string; createdAt: Date; updatedAt: Date; }

// Common use: API input types
async function createUser(input: CreateUserInput): Promise<UserResponse> {
  const user = await db.users.create({
    ...input,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const { password, ...response } = user;
  return response;
}

// Combine with Partial for update inputs
type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
// All fields optional, excludes id and timestamps`}</code></pre>

      <h2>Record&lt;K, V&gt;: Key-Value Mapping Types</h2>
      <p>
        <code>Record&lt;K, V&gt;</code> constructs a type with keys of type <code>K</code> and values of type <code>V</code>. It is perfect for dictionaries, maps, and lookup objects.
      </p>
      <pre><code className="language-typescript">{`// Simple key-value mapping
type StatusMessages = Record<number, string>;
const httpMessages: StatusMessages = {
  200: 'OK',
  404: 'Not Found',
  500: 'Internal Server Error',
};

// Union type as keys
type Theme = 'light' | 'dark' | 'system';
type ThemeColors = Record<Theme, { bg: string; text: string; accent: string }>;

const themes: ThemeColors = {
  light: { bg: '#ffffff', text: '#000000', accent: '#3b82f6' },
  dark:  { bg: '#1a1a1a', text: '#ffffff', accent: '#60a5fa' },
  system: { bg: '#f5f5f5', text: '#333333', accent: '#2563eb' },
};

// i18n translations
type Locale = 'en' | 'fr' | 'de' | 'es' | 'zh' | 'ja';
type Translations = Record<Locale, Record<string, string>>;

const translations: Translations = {
  en: { greeting: 'Hello', goodbye: 'Goodbye' },
  fr: { greeting: 'Bonjour', goodbye: 'Au revoir' },
  de: { greeting: 'Hallo', goodbye: 'Auf Wiedersehen' },
  es: { greeting: 'Hola', goodbye: 'Adios' },
  zh: { greeting: '你好', goodbye: '再见' },
  ja: { greeting: 'こんにちは', goodbye: 'さようなら' },
};

// Permission mapping
type Role = 'admin' | 'editor' | 'viewer';
type Permission = 'read' | 'write' | 'delete';
type RolePermissions = Record<Role, Permission[]>;

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  editor: ['read', 'write'],
  viewer: ['read'],
};`}</code></pre>

      <h2>Readonly&lt;T&gt;: Immutable Types</h2>
      <p>
        <code>Readonly&lt;T&gt;</code> makes all properties of <code>T</code> read-only, preventing reassignment after creation.
      </p>
      <pre><code className="language-typescript">{`interface AppConfig {
  apiUrl: string;
  apiKey: string;
  maxRetries: number;
  timeout: number;
}

// All properties become readonly
type FrozenConfig = Readonly<AppConfig>;

const config: FrozenConfig = {
  apiUrl: 'https://api.example.com',
  apiKey: 'sk-...',
  maxRetries: 3,
  timeout: 5000,
};

// config.apiUrl = 'new-url';  // Error: Cannot assign to 'apiUrl'

// Common use: Function parameters that shouldn't be mutated
function processItems(items: Readonly<string[]>): string[] {
  // items.push('new');     // Error: push does not exist on readonly
  // items[0] = 'modified'; // Error: Index signature only permits reading
  return items.map(item => item.toUpperCase());  // OK: creates new array
}

// Deep readonly (recursive)
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};`}</code></pre>

      <h2>Exclude&lt;T, U&gt; and Extract&lt;T, U&gt;: Filter Union Types</h2>
      <pre><code className="language-typescript">{`type Status = 'pending' | 'active' | 'suspended' | 'deleted';

// Exclude: Remove members from union
type ActiveStatus = Exclude<Status, 'deleted' | 'suspended'>;
// 'pending' | 'active'

// Extract: Keep only matching members
type InactiveStatus = Extract<Status, 'suspended' | 'deleted'>;
// 'suspended' | 'deleted'

// Common use: Filter event types
type AppEvent =
  | { type: 'click'; x: number; y: number }
  | { type: 'keydown'; key: string }
  | { type: 'scroll'; position: number }
  | { type: 'resize'; width: number; height: number };

// Extract specific event types
type MouseEvent = Extract<AppEvent, { type: 'click' }>;
// { type: 'click'; x: number; y: number }

type InputEvent = Extract<AppEvent, { type: 'click' | 'keydown' }>;
// { type: 'click'; x: number; y: number } | { type: 'keydown'; key: string }

// Exclude specific event types
type NonMouseEvent = Exclude<AppEvent, { type: 'click' }>;
// { type: 'keydown'; key: string } | { type: 'scroll'; ... } | { type: 'resize'; ... }`}</code></pre>

      <h2>NonNullable&lt;T&gt;: Remove null and undefined</h2>
      <pre><code className="language-typescript">{`type MaybeString = string | null | undefined;

type DefiniteString = NonNullable<MaybeString>;
// string

// Common use: After null checks
function processUser(user: User | null | undefined) {
  if (!user) throw new Error('User required');

  // user is now NonNullable<User | null | undefined> = User
  console.log(user.name);
}

// With array filtering
const items: (string | null | undefined)[] = ['a', null, 'b', undefined, 'c'];
const filtered: string[] = items.filter(
  (item): item is NonNullable<typeof item> => item != null
);
// ['a', 'b', 'c']`}</code></pre>

      <h2>ReturnType&lt;T&gt; and Parameters&lt;T&gt;: Function Type Extraction</h2>
      <pre><code className="language-typescript">{`// ReturnType: Extract the return type of a function
function createUser(name: string, email: string) {
  return {
    id: generateId(),
    name,
    email,
    createdAt: new Date(),
  };
}

type NewUser = ReturnType<typeof createUser>;
// { id: string; name: string; email: string; createdAt: Date }

// Parameters: Extract parameter types as a tuple
type CreateUserParams = Parameters<typeof createUser>;
// [name: string, email: string]

// Common use: Wrapper functions
function loggedCreateUser(...args: Parameters<typeof createUser>): ReturnType<typeof createUser> {
  console.log('Creating user with:', args);
  return createUser(...args);
}

// Awaited: Unwrap Promise types
async function fetchUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

type FetchedUser = Awaited<ReturnType<typeof fetchUser>>;
// User (unwrapped from Promise<User>)`}</code></pre>

      <h2>Quick Reference: All Built-in Utility Types</h2>
      <pre><code className="language-text">{`Utility Type              Purpose                        Example
------------              -------                        -------
Partial<T>                Make all props optional         Partial<User>
Required<T>               Make all props required         Required<Config>
Readonly<T>               Make all props readonly         Readonly<State>
Pick<T, K>                Select specific props           Pick<User, 'id' | 'name'>
Omit<T, K>                Remove specific props           Omit<User, 'password'>
Record<K, V>              Key-value mapping type          Record<string, number>
Exclude<T, U>             Remove types from union         Exclude<Status, 'deleted'>
Extract<T, U>             Keep matching union types       Extract<Event, {type: 'click'}>
NonNullable<T>            Remove null/undefined           NonNullable<string | null>
ReturnType<T>             Get function return type        ReturnType<typeof fn>
Parameters<T>             Get function param types        Parameters<typeof fn>
ConstructorParameters<T>  Get constructor param types     ConstructorParameters<typeof Cls>
InstanceType<T>           Get class instance type         InstanceType<typeof MyClass>
ThisParameterType<T>      Get 'this' parameter type       ThisParameterType<typeof fn>
OmitThisParameter<T>      Remove 'this' from fn type     OmitThisParameter<typeof fn>
Awaited<T>                Unwrap Promise type             Awaited<Promise<User>>
Uppercase<S>              Convert string type upper       Uppercase<'hello'>  // 'HELLO'
Lowercase<S>              Convert string type lower       Lowercase<'HELLO'>  // 'hello'
Capitalize<S>             Capitalize first char           Capitalize<'hello'> // 'Hello'
Uncapitalize<S>           Lowercase first char            Uncapitalize<'Hello'> // 'hello'`}</code></pre>

      <h2>Advanced Patterns: Combining Utility Types</h2>
      <pre><code className="language-typescript">{`// Pattern 1: API Resource Types
interface Resource {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends Resource {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Create input: no auto-generated fields
type CreateInput<T extends Resource> = Omit<T, keyof Resource>;
type CreateUserInput = CreateInput<User>;
// { name: string; email: string; role: 'admin' | 'user' }

// Update input: optional fields, no auto-generated
type UpdateInput<T extends Resource> = Partial<Omit<T, keyof Resource>>;
type UpdateUserInput = UpdateInput<User>;
// { name?: string; email?: string; role?: 'admin' | 'user' }

// Pattern 2: Make specific fields optional
type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type UserWithOptionalEmail = OptionalFields<User, 'email'>;
// { id: string; name: string; role: ...; email?: string; ... }

// Pattern 3: Make specific fields required
type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
type ConfigWithHost = RequireFields<Partial<Config>, 'host'>;
// { host: string; port?: number; debug?: boolean; timeout?: number }

// Pattern 4: Branded types for type safety
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;

function getUser(id: UserId): Promise<User> { /* ... */ }
function getPost(id: PostId): Promise<Post> { /* ... */ }

const userId = '123' as UserId;
const postId = '456' as PostId;

getUser(userId);   // OK
// getUser(postId); // Error: PostId is not assignable to UserId`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>When should I use Pick vs Omit?</h3>
      <p>
        Use <code>Pick</code> when you want a small subset of a large type (e.g., selecting 2-3 fields from a 10-field type). Use <code>Omit</code> when you want most fields but need to exclude a few (e.g., removing a password field from a user type). As a rule of thumb, use whichever requires listing fewer properties.
      </p>

      <h3>Does Partial work on nested objects?</h3>
      <p>
        No. <code>Partial</code> is shallow -- it only makes the top-level properties optional. Nested object properties remain required. For deep partial behavior, you need a custom recursive type like <code>DeepPartial</code>.
      </p>

      <h3>Can I combine multiple utility types?</h3>
      <p>
        Yes, utility types can be freely composed. Common combinations include <code>Partial&lt;Omit&lt;T, K&gt;&gt;</code> for update inputs, <code>Required&lt;Pick&lt;T, K&gt;&gt;</code> for mandatory field subsets, and intersection types with <code>&amp;</code> to merge utility type results.
      </p>

      <h3>Do utility types have runtime overhead?</h3>
      <p>
        No. TypeScript utility types exist only at compile time and are completely erased during compilation. They have zero runtime cost -- they only affect type checking during development.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript Converter</Link> - Generate TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-zod`}>JSON to Zod Schema</Link> - Generate runtime validation schemas</li>
        <li><Link href={`/${lang}/blog/typescript-generics-explained`}>TypeScript Generics Explained</Link> - Master generics in TypeScript</li>
        <li><Link href={`/${lang}/blog/typescript-vs-javascript-when-to-convert`}>TypeScript vs JavaScript</Link> - When to convert your project</li>
        <li><Link href={`/${lang}/blog/json-to-typescript-complete-guide`}>JSON to TypeScript Guide</Link> - Convert JSON data to types</li>
      </ul>
    </>
  );
}
