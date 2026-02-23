---
title: "Zod: The TypeScript Validation Library You Need in 2026"
tags: typescript, javascript, validation, programming
canonical_url: https://viadreams.cc/en/blog/zod-validation-guide
published: true
---

If you're writing TypeScript and not using Zod, you're doing validation the hard way. Here's why Zod has become the go-to validation library.

## Why Zod?

Runtime type safety is the gap TypeScript doesn't fill. TypeScript's types disappear at runtime. User input, API responses, environment variables — they're all `unknown` at runtime.

Zod bridges that gap.

## Basic Usage

```typescript
import { z } from 'zod';

// Define schema
const UserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
  role: z.enum(['admin', 'user', 'moderator']),
});

// Parse - throws on invalid data
const user = UserSchema.parse(req.body);

// Safe parse - returns success/error object
const result = UserSchema.safeParse(req.body);
if (result.success) {
  console.log(result.data); // Fully typed!
} else {
  console.error(result.error.flatten());
}
```

## Type Inference

The killer feature: Zod schemas generate TypeScript types automatically.

```typescript
const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number().positive(),
  tags: z.array(z.string()),
  metadata: z.record(z.string()),
});

// Extract TypeScript type from schema
type Product = z.infer<typeof ProductSchema>;
// Equivalent to: { id: string; name: string; price: number; tags: string[]; metadata: Record<string, string> }
```

One source of truth for both runtime validation AND compile-time types.

## Transformations

Parse AND transform in one step:

```typescript
const DateSchema = z.string().transform(str => new Date(str));
const date = DateSchema.parse('2026-02-23'); // Returns Date object, not string

const TrimmedEmail = z.string().email().toLowerCase().trim();
const email = TrimmedEmail.parse('  User@EXAMPLE.com  ');
// 'user@example.com'
```

## Custom Validation with Refinements

```typescript
const PasswordSchema = z.string()
  .min(8)
  .refine(p => /[A-Z]/.test(p), 'Must contain uppercase')
  .refine(p => /[0-9]/.test(p), 'Must contain number')
  .refine(p => /[!@#$%^&*]/.test(p), 'Must contain special char');

// Confirm password matching
const SignupSchema = z.object({
  password: PasswordSchema,
  confirm: z.string(),
}).refine(d => d.password === d.confirm, {
  message: 'Passwords must match',
  path: ['confirm'],
});
```

## Environment Variables (Huge Use Case)

```typescript
const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  API_KEY: z.string().min(32),
});

// Validate at startup - crashes fast if misconfigured
export const env = EnvSchema.parse(process.env);
```

## tRPC Integration

Zod is tRPC's native validation library:

```typescript
const router = t.router({
  createUser: t.procedure
    .input(UserSchema)
    .mutation(async ({ input }) => {
      // input is fully typed as z.infer<typeof UserSchema>
      return db.users.create(input);
    }),
});
```

Test your JSON schemas with [JSON Validator Online](https://viadreams.cc/en/tools/json-validator-online).

---

*Full Zod guide at [viadreams.cc/en/blog/zod-validation-guide](https://viadreams.cc/en/blog/zod-validation-guide)*
