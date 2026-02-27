'use client';
import React from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  JSON to TypeScript Interface: Complete Guide with Zod and Guards    */
/* ------------------------------------------------------------------ */

export default function JsonToTypescriptV2OnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/json-to-typescript`;

  /* ---------- translations ---------- */
  const translations: Record<string, {
    tldr: string;
    whyTitle: string;
    takeawaysTitle: string;
    tryTool: string;
    faqTitle: string;
  }> = {
    zh: {
      tldr: '使用 interface 或 type alias 从 JSON 生成 TypeScript 接口。使用 zod 进行运行时验证并自动生成 TypeScript 类型，或编写类型守卫进行类型收窄。JSON.parse 始终返回 any — 务必在 API 边界处进行验证。',
      whyTitle: '为什么要为 JSON 使用 TypeScript 类型？',
      takeawaysTitle: '核心要点',
      tryTool: '立即使用免费的 JSON 转 TypeScript 工具 \u2192',
      faqTitle: '常见问题',
    },
    en: {
      tldr: "Generate TypeScript interfaces from JSON with interfaces or type aliases. Use zod for runtime validation that generates TypeScript types automatically, or write type guards for narrowing. JSON.parse always returns 'any' \u2014 always validate at boundaries.",
      whyTitle: 'Why Use TypeScript Types for JSON?',
      takeawaysTitle: 'Key Takeaways',
      tryTool: 'Try our free JSON to TypeScript tool \u2192',
      faqTitle: 'Frequently Asked Questions',
    },
  };

  const t = translations[l] || translations['en'];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: 'Should I use interface or type alias for JSON in TypeScript?',
      a: "Interfaces are preferred for JSON object shapes \u2014 they're extendable and clearer in error messages. Use interface User { id: number; name: string } for objects. Type aliases shine for union types, primitives, and tuples: type ID = string | number. Both are structurally equivalent for plain JSON objects, but interfaces support declaration merging which is useful for module augmentation.",
    },
    {
      q: 'How do I handle optional JSON fields in TypeScript?',
      a: "Use the optional property operator ?: property?: string means the property can be absent or undefined. For nullable values use string | null. Combine both for a field that may be missing or null: property?: string | null. With zod use z.string().optional() for missing fields and z.string().nullable() for null values. z.string().nullish() covers both.",
    },
    {
      q: 'What is the difference between JSON.parse and a validated parse?',
      a: "JSON.parse returns 'any' \u2014 you lose type safety immediately. A validated parse (using zod.parse, io-ts, or valibot) checks the shape at runtime and throws a meaningful error if the data doesn't match. With zod: const user = UserSchema.parse(JSON.parse(str)); This both validates and narrows the type. Using as User after JSON.parse is a type assertion that can hide runtime bugs.",
    },
    {
      q: 'How do I create types for nested JSON objects?',
      a: 'Define separate interfaces for each nested object and compose them. interface Address { street: string; city: string } interface User { id: number; address: Address } This is cleaner than inlining nested types and allows reuse. For deeply nested or recursive structures (like tree nodes) use: interface TreeNode { value: string; children?: TreeNode[] }',
    },
    {
      q: 'How does zod work with TypeScript?',
      a: "zod lets you define schemas and derive types with z.infer<typeof schema>. Example: const UserSchema = z.object({ id: z.number(), name: z.string() }); type User = z.infer<typeof UserSchema>; The type and the runtime validator stay in sync automatically. When you update the schema, the inferred type updates too \u2014 no drift between types and validation logic.",
    },
    {
      q: 'What is a type guard in TypeScript?',
      a: "A type guard is a function returning 'x is T' that narrows types at runtime using TypeScript's control flow analysis. Example: function isUser(x: unknown): x is User { return typeof x === 'object' && x !== null && 'id' in x && 'name' in x; } After calling if (isUser(data)), TypeScript knows data is User inside the block. Type guards work without any library dependency.",
    },
    {
      q: 'How do I type a generic API response wrapper?',
      a: 'Use generic interfaces: interface ApiResponse<T> { data: T; error?: string; status: number } Then use it as: const res: ApiResponse<User[]> = await fetchUsers(); This lets you create one wrapper type that works for any payload shape. Combine with zod: const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({ data: dataSchema, status: z.number() });',
    },
    {
      q: "What's the safest way to type JSON.parse output?",
      a: "Use 'unknown' then validate: const parsed: unknown = JSON.parse(str); const user = UserSchema.parse(parsed); Never use as User directly \u2014 it bypasses runtime checking. If you cannot use zod, write a type guard that checks each required property. Returning unknown instead of any forces callers to narrow the type before use.",
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto', lineHeight: 1.75 }}>
      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ---- TL;DR Box ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 32,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, marginTop: 0 }}>TL;DR</p>
        <p style={{ margin: 0, fontSize: 15 }}>
          {t.tldr}{' '}
          <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
            {t.tryTool}
          </Link>
        </p>
      </div>

      {/* ---- Key Takeaways ---- */}
      <div style={{
        background: '#f8fafc',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 40,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, marginTop: 0 }}>{t.takeawaysTitle}</p>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li>TypeScript interfaces and type aliases both work for JSON typing &mdash; interfaces are preferred for objects</li>
          <li>Optional properties use <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>?</code> suffix: <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>name?: string</code> means the property may be absent</li>
          <li>Union types model JSON arrays with heterogeneous values: <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>type Value = string | number | boolean | null</code></li>
          <li>Generic interfaces create reusable API response wrappers: <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>{'interface ApiResponse<T> { data: T; error?: string }'}</code></li>
          <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>z.infer&lt;typeof schema&gt;</code> generates TypeScript types from zod validation schemas automatically</li>
          <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>JSON.parse</code> returns <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>any</code> &mdash; always validate with zod/io-ts at API boundaries instead of type assertions</li>
          <li>Type guards (<code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>{'function isUser(x: unknown): x is User'}</code>) narrow types at runtime with compile-time safety</li>
        </ul>
      </div>

      {/* ---- Section 1: Why TypeScript Types for JSON ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Why Use TypeScript Types for JSON?
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        JSON is the backbone of modern web APIs, but it is inherently untyped. When you fetch data from an endpoint
        and treat it as <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>any</code>,
        you lose all the benefits TypeScript provides: autocomplete, refactoring safety, and compile-time error
        detection. Assigning TypeScript interfaces to JSON data creates a contract between your code and your API.
      </p>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        There are two distinct levels of type safety for JSON:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Level</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>When it catches errors</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Tool</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Compile-time', 'While writing code — wrong property names, missing fields', 'TypeScript interfaces / type aliases'],
              ['Runtime', 'When the actual JSON arrives — API returns unexpected shape', 'zod, io-ts, valibot, type guards'],
            ].map(([level, when, tool], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontWeight: 600 }}>{level}</td>
                <td style={{ padding: '8px 14px' }}>{when}</td>
                <td style={{ padding: '8px 14px' }}>{tool}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        A common mistake is adding TypeScript types through assertions (
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>as User</code>
        ) and assuming that provides runtime safety. It does not. TypeScript types are erased at compile time.
        Only runtime validation libraries actually check the incoming data.
      </p>
      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Generate TypeScript interfaces from JSON instantly with our free tool &rarr;
        </Link>
      </p>

      {/* ---- Section 2: interface vs type alias ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        interface vs type alias for JSON
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        TypeScript offers two ways to define the shape of a JSON object. Both are structurally equivalent for
        plain objects, but they have different capabilities.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// Given this JSON:
// { "id": 1, "name": "Alice", "email": "alice@example.com" }

// Option 1: interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Option 2: type alias
type User = {
  id: number;
  name: string;
  email: string;
};

// Both work identically here:
const user: User = JSON.parse(response); // (unsafe — see Section 11)
console.log(user.name); // TypeScript knows this is a string`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Key Differences</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Feature</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>interface</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>type alias</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Object shapes', 'Yes', 'Yes'],
              ['Declaration merging', 'Yes (extends across files)', 'No'],
              ['Union types', 'No', 'Yes (type A = B | C)'],
              ['Mapped types', 'Limited', 'Full support'],
              ['Error messages', 'Shows interface name', 'Shows expanded type'],
              ['Best for JSON objects', 'Preferred', 'Works, less idiomatic'],
            ].map(([feat, iface, type], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontWeight: 600 }}>{feat}</td>
                <td style={{ padding: '8px 14px' }}>{iface}</td>
                <td style={{ padding: '8px 14px' }}>{type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The TypeScript team&apos;s recommendation: use <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>interface</code> for
        object shapes, and <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>type</code> for unions, primitives, and
        computed types. For JSON API modeling, prefer interfaces.
      </p>

      {/* ---- Section 3: Generating Types from JSON ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Generating TypeScript Types from JSON: Manual Patterns
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        When converting JSON to TypeScript manually, follow a consistent mapping from JSON value types to
        TypeScript types:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// JSON input:
{
  "id": 42,
  "name": "Alice",
  "score": 98.5,
  "active": true,
  "deletedAt": null,
  "tags": ["admin", "user"],
  "metadata": { "theme": "dark" }
}

// TypeScript interface output:
interface UserProfile {
  id: number;          // JSON number -> number
  name: string;        // JSON string -> string
  score: number;       // JSON number (float) -> number
  active: boolean;     // JSON boolean -> boolean
  deletedAt: null;     // JSON null -> null (or string | null if nullable)
  tags: string[];      // JSON array of strings -> string[]
  metadata: {          // JSON object -> inline or named interface
    theme: string;
  };
}`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        For the <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>deletedAt</code> field which could be
        a date string or null, use a union:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`interface UserProfile {
  deletedAt: string | null; // ISO date string or null
}

// Or with optional + nullable:
interface UserProfile {
  deletedAt?: string | null; // missing, null, or date string
}`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Use our <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>JSON to TypeScript tool</Link> to
        automate this mapping for large or complex JSON payloads.
      </p>

      {/* ---- Section 4: Union Types from Arrays ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Union Types from JSON Arrays with Mixed Values
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        JSON arrays can contain values of different types. TypeScript union types model this precisely:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// JSON: { "values": [1, "two", true, null, 3.14] }

// Heterogeneous array — union of all observed types:
interface Config {
  values: Array<string | number | boolean | null>;
}

// Or use the type alias shorthand:
type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonPrimitive[];

// Recursive JSON value type (models any valid JSON):
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

// Usage:
interface DynamicConfig {
  settings: { [key: string]: JsonValue };
}`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>JsonValue</code> recursive type is the most
        general representation of any valid JSON value. Use it for truly dynamic data, but prefer specific
        interfaces for known API shapes.
      </p>

      {/* ---- Section 5: Optional Properties ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Optional Properties with ?
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        JSON APIs often return fields that may or may not be present. TypeScript&apos;s optional property
        syntax (<code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>?</code>) captures this:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`interface Post {
  id: number;
  title: string;
  content: string;
  author?: string;       // may be absent (property not in JSON)
  publishedAt?: string;  // optional date
  updatedAt: string | null; // always present, but can be null
  tags?: string[];       // optional array
}

// Accessing optional properties safely:
const post: Post = getPost();
console.log(post.author?.toUpperCase()); // optional chaining
console.log(post.tags?.length ?? 0);     // nullish coalescing

// Type narrowing after check:
if (post.author !== undefined) {
  console.log(post.author.toUpperCase()); // TypeScript knows it's string here
}`}
      </pre>
      <div style={{
        background: '#fefce8',
        border: '1px solid #fde047',
        borderRadius: 6,
        padding: '12px 16px',
        marginBottom: 24,
        fontSize: 14,
      }}>
        <strong>Important distinction:</strong> <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>prop?: string</code> means
        the property may be absent or <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>undefined</code>.
        <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>prop: string | null</code> means the property is
        always present but its value may be <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>null</code>.
        Use <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>prop?: string | null</code> for properties that
        can be both missing and null.
      </div>

      {/* ---- Section 6: Nested Interfaces and Composition ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Nested Interfaces and Type Composition
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Real-world API responses often contain deeply nested objects. Define separate interfaces for each
        nested shape and compose them:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// JSON:
// {
//   "order": {
//     "id": "ORD-001",
//     "customer": { "id": 42, "name": "Alice", "address": { "city": "NYC" } },
//     "items": [{ "sku": "P1", "qty": 2, "price": 19.99 }]
//   }
// }

// Separate interface for each nested shape:
interface Address {
  street?: string;
  city: string;
  state?: string;
  zip?: string;
}

interface Customer {
  id: number;
  name: string;
  address: Address;
}

interface OrderItem {
  sku: string;
  qty: number;
  price: number;
  discount?: number;
}

interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  total?: number;
  createdAt: string;
}

// Composition with intersection types:
type AdminOrder = Order & {
  internalNote: string;
  flaggedForReview: boolean;
};

// Using Partial<T> for update payloads:
type OrderUpdate = Partial<Pick<Order, 'total' | 'items'>>;`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        TypeScript utility types like <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>Partial&lt;T&gt;</code>,
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>Pick&lt;T, K&gt;</code>,
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>Omit&lt;T, K&gt;</code>, and
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>Required&lt;T&gt;</code> allow you
        to derive new types from existing ones without duplication.
      </p>

      {/* ---- Section 7: Generic Interfaces ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Generic Interfaces for API Responses
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Most REST APIs wrap responses in a consistent envelope. Generic interfaces eliminate the need to
        define separate wrappers for every endpoint:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// Generic API response envelope:
interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
  meta?: {
    page: number;
    perPage: number;
    total: number;
  };
}

// Paginated list response:
interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

// Usage:
async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

async function listUsers(): Promise<PaginatedResponse<User>> {
  const res = await fetch('/api/users');
  return res.json();
}

// Consuming:
const response = await fetchUser(1);
if (response.error) {
  console.error(response.error);
} else {
  console.log(response.data.name); // TypeScript knows data is User
}`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Generic interfaces are powerful but still only provide compile-time safety. The
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>res.json()</code> call returns
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>Promise&lt;any&gt;</code> at runtime.
        For true safety, combine generics with runtime validation (see Section 8).
      </p>

      {/* ---- Section 8: Zod Runtime Validation ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Using Zod for Runtime Validation: z.infer&lt;typeof schema&gt;
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Zod is the leading TypeScript-first validation library. It defines schemas that serve as both the
        runtime validator and the TypeScript type source through <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>z.infer</code>:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`import { z } from 'zod';

// Define schema once — get both validation and TypeScript types:
const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.string().datetime(),
  tags: z.array(z.string()).optional(),
  settings: z.object({
    theme: z.enum(['light', 'dark']).default('light'),
    notifications: z.boolean(),
  }).optional(),
});

// Derive TypeScript type automatically:
type User = z.infer<typeof UserSchema>;
// Equivalent to:
// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: 'admin' | 'user' | 'guest';
//   createdAt: string;
//   tags?: string[];
//   settings?: { theme: 'light' | 'dark'; notifications: boolean };
// }

// Parse and validate (throws ZodError on failure):
const user: User = UserSchema.parse(rawData);

// Safe parse (returns result object instead of throwing):
const result = UserSchema.safeParse(rawData);
if (result.success) {
  console.log(result.data.name); // User
} else {
  console.error(result.error.format()); // Detailed error info
}`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Generic API Response with Zod</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`import { z } from 'zod';

// Factory function for generic response schemas:
const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    status: z.number(),
    error: z.string().optional(),
  });

// Usage:
const UserResponseSchema = ApiResponseSchema(UserSchema);
type UserResponse = z.infer<typeof UserResponseSchema>;

// Validated fetch:
async function fetchUser(id: number): Promise<User> {
  const raw = await fetch(\`/api/users/\${id}\`).then(r => r.json());
  const response = UserResponseSchema.parse(raw);
  return response.data;
}`}
      </pre>
      <div style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: 6,
        padding: '12px 16px',
        marginBottom: 24,
        fontSize: 14,
      }}>
        <strong>Install zod:</strong>{' '}
        <code style={{ background: '#dcfce7', padding: '1px 4px', borderRadius: 3 }}>npm install zod</code>
        {' '}— compatible with Node.js, browsers, Deno, and Bun. No additional peer dependencies required.
      </div>

      {/* ---- Section 9: io-ts and valibot ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        io-ts and valibot: Alternatives for Type-Safe Parsing
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Besides zod, the ecosystem offers other type-safe parsing libraries with different design philosophies:
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>io-ts (fp-ts style)</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`import * as t from 'io-ts';
import { isRight } from 'fp-ts/Either';

// Define codec:
const UserCodec = t.type({
  id: t.number,
  name: t.string,
  email: t.string,
  role: t.union([t.literal('admin'), t.literal('user')]),
  tags: t.union([t.array(t.string), t.undefined]),
});

// Extract TypeScript type:
type User = t.TypeOf<typeof UserCodec>;

// Decode (validates at runtime):
const decoded = UserCodec.decode(rawData);
if (isRight(decoded)) {
  const user: User = decoded.right; // type-safe
} else {
  console.error('Validation failed:', decoded.left);
}`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>valibot (tree-shakable, minimal bundle)</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`import { object, number, string, optional, array, parse, InferOutput } from 'valibot';

const UserSchema = object({
  id: number(),
  name: string(),
  email: string(),
  tags: optional(array(string())),
});

// Extract TypeScript type:
type User = InferOutput<typeof UserSchema>;

// Parse:
const user: User = parse(UserSchema, rawData);`}
      </pre>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Library</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Bundle size</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>API style</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Best for</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['zod', '~13 KB (min+gz)', 'Fluent chain', 'Most projects, great DX'],
              ['io-ts', '~7 KB', 'Functional (fp-ts)', 'fp-ts codebases'],
              ['valibot', '~1.5 KB (tree-shaken)', 'Modular functions', 'Bundle-size critical apps'],
            ].map(([lib, size, api, best], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontWeight: 600 }}>{lib}</td>
                <td style={{ padding: '8px 14px' }}>{size}</td>
                <td style={{ padding: '8px 14px' }}>{api}</td>
                <td style={{ padding: '8px 14px' }}>{best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Section 10: Type Guards ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Type Guards: Runtime Narrowing with Compile-Time Safety
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Type guards are functions with the return type <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>x is T</code> that
        teach TypeScript&apos;s control flow analysis about runtime type checks:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`interface User {
  id: number;
  name: string;
  email: string;
}

// Type guard — predicate function:
function isUser(x: unknown): x is User {
  return (
    typeof x === 'object' &&
    x !== null &&
    typeof (x as Record<string, unknown>).id === 'number' &&
    typeof (x as Record<string, unknown>).name === 'string' &&
    typeof (x as Record<string, unknown>).email === 'string'
  );
}

// Usage — TypeScript narrows the type in the if-block:
const raw: unknown = JSON.parse(responseText);

if (isUser(raw)) {
  // raw is typed as User here:
  console.log(raw.name.toUpperCase()); // no error
  console.log(raw.email.split('@')[0]); // TypeScript knows this is string
} else {
  throw new Error('Invalid user data');
}`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Discriminated Unions</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// Discriminated union — common pattern for polymorphic JSON:
interface SuccessResponse {
  status: 'success';
  data: User;
}

interface ErrorResponse {
  status: 'error';
  message: string;
  code: number;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(res: ApiResponse) {
  switch (res.status) {
    case 'success':
      console.log(res.data.name); // TypeScript narrows to SuccessResponse
      break;
    case 'error':
      console.error(\`Error \${res.code}: \${res.message}\`);
      break;
  }
}`}
      </pre>

      {/* ---- Section 11: JSON.parse with Type Assertion ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        JSON.parse with Type Assertion (and Why It&apos;s Unsafe)
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>JSON.parse</code> returns{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>any</code> in TypeScript. This means the
        following compiles without errors but is silently wrong at runtime:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// UNSAFE: type assertion bypasses runtime checking
const user = JSON.parse(responseText) as User;
console.log(user.name.toUpperCase()); // runtime error if 'name' is missing or not a string

// ALSO UNSAFE: generic type parameter on JSON.parse doesn't exist (this is wrong TS):
// JSON.parse<User>(str) // <-- not a real TypeScript feature!

// SAFE option 1: validate with zod
import { z } from 'zod';
const UserSchema = z.object({ id: z.number(), name: z.string() });
const safe1 = UserSchema.parse(JSON.parse(responseText)); // throws on invalid data

// SAFE option 2: use unknown, then type guard
const raw: unknown = JSON.parse(responseText);
if (!isUser(raw)) throw new Error('Invalid user data');
const safe2: User = raw; // narrowed by type guard

// SAFE option 3: Response.json() with zod in fetch:
const data = await fetch('/api/user').then(r => r.json());
const safe3 = UserSchema.parse(data);`}
      </pre>
      <div style={{
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: 6,
        padding: '12px 16px',
        marginBottom: 24,
        fontSize: 14,
      }}>
        <strong>Rule:</strong> Never use <code style={{ background: '#fee2e2', padding: '1px 4px', borderRadius: 3 }}>as SomeType</code>{' '}
        after <code style={{ background: '#fee2e2', padding: '1px 4px', borderRadius: 3 }}>JSON.parse</code> in production code.
        Type assertions are a promise to TypeScript that you know better than the compiler &mdash; and with external
        data, you never do until you validate it.
      </div>

      {/* ---- Section 12: Fetch API Pattern ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Fetch API Pattern with TypeScript Types
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        A production-ready pattern for typed HTTP fetching combines generic functions with zod validation:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`import { z } from 'zod';

// Generic typed fetch utility:
async function fetchTyped<T>(
  url: string,
  schema: z.ZodType<T>,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(\`HTTP error \${response.status}: \${response.statusText}\`);
  }

  const raw: unknown = await response.json();
  return schema.parse(raw); // throws ZodError if shape is wrong
}

// Define schemas:
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
});

const UsersListSchema = z.array(UserSchema);

type User = z.infer<typeof UserSchema>;

// Usage — fully type-safe:
const user = await fetchTyped('/api/users/1', UserSchema);
const users = await fetchTyped('/api/users', UsersListSchema);

// user.name is string — guaranteed at both compile and runtime
// users is User[] — each element validated against UserSchema`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Using React Query with Typed Fetching</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`import { useQuery } from '@tanstack/react-query';

function useUser(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchTyped(\`/api/users/\${id}\`, UserSchema),
    // data is typed as User (not any) because fetchTyped returns Promise<User>
  });
}

// In component:
function UserCard({ id }: { id: number }) {
  const { data: user, isLoading, error } = useUser(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{user.name}</div>; // user is User — fully typed
}`}
      </pre>

      {/* ---- Section 13: Tools ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Tools for Generating TypeScript from JSON
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Several tools automate the conversion from JSON samples to TypeScript interfaces:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Tool</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Output</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['DevToolBox JSON to TypeScript', 'interface / type alias', 'Free online, handles nested objects'],
              ['quicktype', 'TypeScript + zod schemas', 'CLI + API, many language targets'],
              ['json-to-ts (npm)', 'TypeScript interfaces', 'Programmatic use in build pipelines'],
              ['TypeScript compiler (tsc)', 'N/A — infers from usage', 'Best for known data shapes'],
              ['OpenAPI Generator', 'Full SDK + types', 'For APIs with OpenAPI/Swagger spec'],
            ].map(([tool, output, notes], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontWeight: 600 }}>{tool}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace' }}>{output}</td>
                <td style={{ padding: '8px 14px' }}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>DevToolBox JSON to TypeScript converter</Link>{' '}
        accepts any valid JSON input and generates clean TypeScript interfaces with proper nesting,
        optional property detection, and array type inference. No installation required.
      </p>
      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Try the JSON to TypeScript converter at viadreams.cc &rarr;
        </Link>
      </p>

      {/* ---- Section 14: Common Pitfalls ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Common Pitfalls: any vs unknown, JSON.parse, and Number Precision
      </h2>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Pitfall 1: Using any Instead of unknown</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// BAD: any disables all type checking
function processData(data: any) {
  data.nonExistentMethod(); // No TypeScript error — runtime crash!
}

// GOOD: unknown forces narrowing before use
function processData(data: unknown) {
  if (typeof data === 'string') {
    data.toUpperCase(); // OK — narrowed to string
  } else if (isUser(data)) {
    data.name; // OK — narrowed to User
  }
}

// In function return types:
// BAD:
async function fetchRaw(): Promise<any> { /* ... */ }

// GOOD:
async function fetchRaw(): Promise<unknown> { /* ... */ }`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Pitfall 2: JSON.parse Returns any</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// TypeScript's lib.es2015.core.d.ts:
// interface JSON {
//   parse(text: string, reviver?: (key: any, value: any) => any): any;
// }

// This is by design — TypeScript cannot know what JSON.parse returns.
// The fix: use unknown and validate:
const raw: unknown = JSON.parse(text); // assign to unknown explicitly
const user = UserSchema.parse(raw);    // validate before use`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Pitfall 3: Number Precision Loss with Large Integers</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// JavaScript numbers are 64-bit floats.
// Integers larger than 2^53 - 1 lose precision:
const bigId = JSON.parse('{"id": 9007199254740993}');
console.log(bigId.id); // 9007199254740992 — wrong! Off by 1

// Solution 1: Use string IDs in your API
// { "id": "9007199254740993" }
interface Entity { id: string; } // string is safe

// Solution 2: Use BigInt with a reviver function
const data = JSON.parse('{"id": 9007199254740993}', (key, value, ctx) => {
  // ctx.source available in modern environments
  return value;
});

// Solution 3: Use a JSON library that supports BigInt
// (e.g., json-bigint npm package)`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Pitfall 4: Forgetting to Narrow After Validation</h3>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// Even with zod, be careful with optional fields:
const UserSchema = z.object({
  name: z.string(),
  bio: z.string().optional(), // bio?: string | undefined
});

type User = z.infer<typeof UserSchema>;
// { name: string; bio?: string }

const user = UserSchema.parse(raw);

// BAD: may be undefined
console.log(user.bio.toUpperCase()); // Error at runtime!

// GOOD: check first
if (user.bio) {
  console.log(user.bio.toUpperCase()); // safe
}
console.log(user.bio?.toUpperCase()); // optional chaining`}
      </pre>

      {/* ---- FAQ ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        {t.faqTitle}
      </h2>
      {faqItems.map((item, i) => (
        <div key={i} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>
            Q: {item.q}
          </h3>
          <p style={{ fontSize: 15, marginBottom: 0, lineHeight: 1.7 }}>
            {item.a}
          </p>
        </div>
      ))}

      {/* ---- Final CTA ---- */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08))',
        border: '1px solid rgba(37,99,235,0.2)',
        borderRadius: 10,
        padding: '24px 28px',
        marginTop: 48,
        textAlign: 'center',
      }}>
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, marginTop: 0 }}>
          Ready to convert your JSON to TypeScript interfaces?
        </p>
        <p style={{ fontSize: 15, marginBottom: 16, color: '#475569' }}>
          Paste any JSON and get clean TypeScript interfaces instantly. Handles nested objects,
          arrays, optional fields, and union types.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
          }}
        >
          Open JSON to TypeScript Converter &rarr;
        </Link>
      </div>
    </article>
  );
}
