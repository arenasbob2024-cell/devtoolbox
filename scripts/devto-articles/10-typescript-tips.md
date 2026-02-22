---
title: "TypeScript Tips That Changed How I Write Code"
published: false
description: "Practical TypeScript tips for type guards, generics, utility types, and discriminated unions. With real examples."
tags: typescript, javascript, webdev, tutorial
canonical_url: https://viadreams.cc/en/blog/typescript-type-guards
cover_image: https://viadreams.cc/og-image.png
---

TypeScript is more than adding `: string` to your variables. Here are the patterns that level up your TypeScript code.

## 1. Discriminated Unions

The most powerful pattern in TypeScript for handling different shapes of data:

```typescript
type ApiResponse =
  | { status: 'success'; data: User[] }
  | { status: 'error'; message: string }
  | { status: 'loading' };

function handleResponse(response: ApiResponse) {
  switch (response.status) {
    case 'success':
      // TypeScript knows response.data exists here
      return response.data.map(u => u.name);
    case 'error':
      // TypeScript knows response.message exists here
      console.error(response.message);
      return [];
    case 'loading':
      return null;
  }
}
```

## 2. Type Guards That Actually Work

```typescript
// Simple type guard
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Object type guard
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
}

// Usage
const data: unknown = await fetchData();
if (isUser(data)) {
  console.log(data.name); // TypeScript knows this is safe
}
```

## 3. `satisfies` Keyword

Validate a type without widening it:

```typescript
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
} satisfies Record<string, string | number>;

// config.apiUrl is still typed as string (not string | number)
config.apiUrl.toUpperCase(); // Works!
```

## 4. Template Literal Types

```typescript
type EventName = `on${Capitalize<'click' | 'focus' | 'blur'>}`;
// "onClick" | "onFocus" | "onBlur"

type CSSProperty = `${string}-${string}`;
// Matches "font-size", "margin-top", etc.
```

## 5. Utility Types You Should Know

```typescript
// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit specific properties
type UserWithoutPassword = Omit<User, 'password'>;

// Extract from union
type SuccessResponse = Extract<ApiResponse, { status: 'success' }>;
```

## 6. `const` Assertions

```typescript
// Without const assertion
const routes = ['/', '/about', '/blog']; // string[]

// With const assertion
const routes = ['/', '/about', '/blog'] as const; // readonly ['/', '/about', '/blog']

// Now you can use it as a type
type Route = typeof routes[number]; // '/' | '/about' | '/blog'
```

## 7. Generic Constraints

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Alice', age: 30 };
getProperty(user, 'name'); // string
getProperty(user, 'age');  // number
getProperty(user, 'foo');  // Error! 'foo' is not a key of user
```

## Learn More

- [TypeScript Type Guards Guide](https://viadreams.cc/en/blog/typescript-type-guards) - deep dive into type narrowing
- [TypeScript Best Practices 2026](https://viadreams.cc/en/blog/typescript-best-practices-2026) - comprehensive guide
- [TypeScript to JavaScript Converter](https://viadreams.cc/en/tools/ts-to-js) - strip types online

**200+ free developer tools at [DevToolBox](https://viadreams.cc)** - JSON formatter, regex builder, diff tool, and more.
