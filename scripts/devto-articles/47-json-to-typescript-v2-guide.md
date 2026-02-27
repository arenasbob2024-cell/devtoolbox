---
title: "JSON to TypeScript Interface: Complete Guide with Zod and Type Guards"
tags: typescript, javascript, json, webdev
canonical_url: https://viadreams.cc/en/blog/json-to-typescript-v2-online-guide
published: true
---

Generate TypeScript interfaces from JSON safely. Here's how to do it right.

## Interface vs Type Alias

```typescript
// Interface — preferred for JSON object shapes
interface User {
    id: number;
    name: string;
    email: string;
    active: boolean;
}

// Type alias — better for unions and computed types
type UserId = number;
type Status = 'active' | 'inactive' | 'pending';
type UserOrAdmin = User | AdminUser;
```

## Optional Properties

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    bio?: string;           // optional — may be absent
    avatarUrl?: string;     // optional — may be absent
}

// Index signatures for dynamic keys
interface Metadata {
    [key: string]: string | number | boolean;
}
```

## Union Types for Mixed Values

```typescript
// JSON value type
type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

// Discriminated union (tagged union)
type ApiResponse =
    | { status: 'success'; data: User }
    | { status: 'error'; message: string; code: number };

// Narrow with discriminant
function handleResponse(res: ApiResponse) {
    if (res.status === 'success') {
        console.log(res.data.name); // TypeScript knows res.data is User
    } else {
        console.log(res.message);   // TypeScript knows res.message exists
    }
}
```

## Generic API Response Wrapper

```typescript
interface ApiResponse<T> {
    data: T;
    error?: string;
    status: number;
    timestamp: string;
}

interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}

// Usage
const userResponse: ApiResponse<User> = await fetchUser(1);
const usersResponse: PaginatedResponse<User> = await fetchUsers();
```

## Zod — Schema Validation + Type Inference

```typescript
import { z } from 'zod';

// Define schema with validation
const UserSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(100),
    email: z.string().email(),
    bio: z.string().optional(),
    tags: z.array(z.string()).default([]),
});

// Infer TypeScript type from schema
type User = z.infer<typeof UserSchema>;
// Equivalent to: interface User { id: number; name: string; email: string; bio?: string; tags: string[] }

// Parse and validate
const user = UserSchema.parse(JSON.parse(jsonString));         // throws on invalid
const result = UserSchema.safeParse(JSON.parse(jsonString));   // returns {success, data} or {success, error}
```

## Type Guards

```typescript
function isUser(value: unknown): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        typeof (value as User).id === 'number' &&
        'name' in value &&
        typeof (value as User).name === 'string'
    );
}

// Usage — TypeScript narrows type after guard
const data: unknown = JSON.parse(jsonString);
if (isUser(data)) {
    console.log(data.name); // TypeScript knows data is User here
}
```

## Safe JSON.parse

```typescript
// UNSAFE — returns any
const user = JSON.parse(jsonString) as User;  // No runtime validation!

// SAFE with zod
const UserSchema = z.object({ id: z.number(), name: z.string() });
const parsed = UserSchema.safeParse(JSON.parse(jsonString));
if (parsed.success) {
    console.log(parsed.data.name); // type-safe
} else {
    console.error(parsed.error.format());
}

// SAFE with type guard
const data: unknown = JSON.parse(jsonString);
if (isUser(data)) {
    console.log(data.name);
}
```

## Fetch API Pattern

```typescript
async function fetchUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: unknown = await response.json();
    return UserSchema.parse(data); // validates at boundary
}
```

## Quick Tool

For automatic TypeScript interface generation from JSON, use **[DevToolBox JSON to TypeScript converter](https://viadreams.cc/en/tools/json-to-typescript)** — paste JSON, get TypeScript interfaces or types instantly.

---

*Generate TypeScript interfaces from JSON instantly with [DevToolBox's free JSON to TypeScript tool](https://viadreams.cc/en/tools/json-to-typescript).*
