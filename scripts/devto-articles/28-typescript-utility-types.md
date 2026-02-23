---
title: "TypeScript Utility Types: Complete Guide to Partial, Pick, Omit, Record and More"
tags: typescript, javascript, webdev, programming
canonical_url: https://viadreams.cc/en/blog/typescript-utility-types
published: true
---

TypeScript ships with powerful built-in utility types that transform existing types. Stop writing repetitive type definitions—use these instead.

## The Most Useful Utility Types

### Partial\<T\> — Make All Properties Optional

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// All fields optional — perfect for update operations
function updateUser(id: number, updates: Partial<User>) {
  return { ...getUser(id), ...updates };
}

updateUser(1, { name: "Alice" }); // valid
updateUser(1, { email: "new@example.com" }); // valid
```

### Required\<T\> — Make All Properties Required

```typescript
interface Config {
  timeout?: number;
  retries?: number;
  baseUrl?: string;
}

// All fields now required
type StrictConfig = Required<Config>;
// { timeout: number; retries: number; baseUrl: string }
```

### Readonly\<T\> — Immutable Object

```typescript
interface Point {
  x: number;
  y: number;
}

const origin: Readonly<Point> = { x: 0, y: 0 };
// origin.x = 1; // Error: Cannot assign to 'x' because it is a read-only property
```

### Pick\<T, K\> — Select Specific Properties

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Only expose safe fields
type PublicUser = Pick<User, 'id' | 'name'>;
// { id: number; name: string }

function getPublicProfile(user: User): PublicUser {
  return { id: user.id, name: user.name };
}
```

### Omit\<T, K\> — Exclude Specific Properties

```typescript
// Exclude sensitive fields
type SafeUser = Omit<User, 'password'>;
// { id: number; name: string; email: string; createdAt: Date }

// Exclude multiple fields
type CreateUser = Omit<User, 'id' | 'createdAt'>;
```

### Record\<K, V\> — Dictionary Type

```typescript
type Status = 'active' | 'inactive' | 'pending';

const statusLabels: Record<Status, string> = {
  active: 'Active',
  inactive: 'Deactivated',
  pending: 'Awaiting Approval',
};

// Generic lookup table
type CountryCode = 'US' | 'UK' | 'DE';
const phonePrefix: Record<CountryCode, string> = {
  US: '+1',
  UK: '+44',
  DE: '+49',
};
```

### Exclude\<T, U\> and Extract\<T, U\>

```typescript
type A = 'a' | 'b' | 'c' | 'd';
type B = 'b' | 'd';

type OnlyA = Exclude<A, B>; // 'a' | 'c'
type Shared = Extract<A, B>; // 'b' | 'd'

// Real world: filter out null/undefined
type NonNullable<T> = Exclude<T, null | undefined>;
```

### ReturnType\<T\> — Infer Function Return Type

```typescript
async function fetchUser(id: number) {
  return { id, name: 'Alice', role: 'admin' };
}

type UserData = Awaited<ReturnType<typeof fetchUser>>;
// { id: number; name: string; role: string }

// No need to define the type separately
function processUser(user: UserData) {
  console.log(user.name);
}
```

### Parameters\<T\> — Get Function Parameter Types

```typescript
function createEvent(name: string, date: Date, attendees: string[]) {
  return { name, date, attendees };
}

type EventParams = Parameters<typeof createEvent>;
// [name: string, date: Date, attendees: string[]]

// Reuse parameter type
function scheduleEvent(...args: EventParams) {
  return createEvent(...args);
}
```

### ConstructorParameters\<T\>

```typescript
class EventEmitter {
  constructor(maxListeners: number, debug: boolean) {}
}

type EmitterArgs = ConstructorParameters<typeof EventEmitter>;
// [maxListeners: number, debug: boolean]
```

## Advanced Combinations

### Deep Partial

```typescript
// Built-in Partial only goes one level deep
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  server: { host: string; port: number };
  db: { url: string; poolSize: number };
}

const partialConfig: DeepPartial<Config> = {
  server: { port: 8080 } // host is optional
};
```

### NonNullable in Practice

```typescript
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>; // string

// Useful for filtering arrays
const items: (string | null)[] = ['a', null, 'b', null, 'c'];
const valid = items.filter((x): x is NonNullable<typeof x> => x !== null);
// string[]
```

### Mapped Type Combinations

```typescript
// Make specific fields required
type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

interface Article {
  title?: string;
  content?: string;
  publishedAt?: Date;
}

// publishedAt is now required
type PublishedArticle = WithRequired<Article, 'publishedAt'>;
```

## Real-World Patterns

### API Response Typing

```typescript
type ApiResponse<T> = {
  data: T;
  error: null;
  status: 200;
} | {
  data: null;
  error: string;
  status: 400 | 401 | 404 | 500;
};

type UserResponse = ApiResponse<User>;
```

### Form State Pattern

```typescript
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

// All fields start as string (from input), errors optional
type FormState = {
  values: Record<keyof LoginForm, string>;
  errors: Partial<Record<keyof LoginForm, string>>;
  touched: Partial<Record<keyof LoginForm, boolean>>;
};
```

### Database Model Variants

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

// For creating new users (no id, timestamps auto-set)
type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// For updating (all optional, can't change id)
type UpdateUser = Partial<Omit<User, 'id' | 'createdAt'>>;

// For public API (no sensitive fields)
type PublicUser = Pick<User, 'id' | 'name'>;
```

## Quick Reference

| Utility | What it does |
|---------|-------------|
| `Partial<T>` | All properties optional |
| `Required<T>` | All properties required |
| `Readonly<T>` | All properties read-only |
| `Pick<T, K>` | Select K properties from T |
| `Omit<T, K>` | Exclude K properties from T |
| `Record<K, V>` | Object with keys K and values V |
| `Exclude<T, U>` | Remove U from union T |
| `Extract<T, U>` | Keep only U from union T |
| `NonNullable<T>` | Remove null and undefined |
| `ReturnType<T>` | Return type of function T |
| `Parameters<T>` | Parameter types of function T |
| `Awaited<T>` | Unwrap Promise type |

These utility types eliminate boilerplate and make your type system more expressive. Use [DevToolBox TypeScript tools](https://viadreams.cc/en/tools/typescript-javascript-converter) to practice converting between TypeScript patterns.
