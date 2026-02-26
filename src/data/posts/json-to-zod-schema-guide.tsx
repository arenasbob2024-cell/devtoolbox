'use client';

import Link from 'next/link';

export default function JsonToZodSchemaGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>Zod</strong> lets you define runtime validation schemas that automatically produce TypeScript types. Converting JSON to a Zod schema gives you type-safe parsing, helpful error messages, and zero duplication between types and validation. Use our <Link href={`/${lang}/tools/json-to-zod`}>free JSON to Zod converter</Link> to generate a Zod schema from any JSON object in seconds.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Zod validates data at runtime and infers TypeScript types from the same schema definition</li>
          <li>Every JSON structure (objects, arrays, primitives, nulls) maps to a corresponding Zod method</li>
          <li>Use <code>z.infer&lt;typeof schema&gt;</code> to derive a static type from any Zod schema</li>
          <li>Optional, nullable, and default values each have dedicated Zod helpers</li>
          <li>Discriminated unions let you validate tagged/polymorphic JSON cleanly</li>
          <li>Automated <Link href={`/${lang}/tools/json-to-zod`}>JSON-to-Zod generation</Link> eliminates boilerplate for large payloads</li>
        </ul>
      </div>

      {/* 1. What is Zod and why use it */}
      <h2>What Is Zod and Why Use It</h2>
      <p>
        Zod is a TypeScript-first schema validation library with zero dependencies. It lets you declare the shape of your data once and then get two things for free: <strong>runtime validation</strong> (parsing incoming JSON, form data, or environment variables) and <strong>static TypeScript types</strong> (via <code>z.infer</code>). That single-source-of-truth approach means your types and your validation logic can never drift apart.
      </p>
      <p>
        Traditional TypeScript interfaces are erased at compile time. If an API returns an unexpected field or a missing value, TypeScript alone will not catch it. Zod fills that gap by checking every value at runtime and throwing structured errors when something is wrong.
      </p>
      <p>
        Common use cases include validating REST or GraphQL API responses, sanitizing form input in React or Next.js, parsing environment variables at startup, and enforcing contracts between microservices. Because Zod schemas compose naturally, you can start small and scale to complex nested structures without rewriting anything.
      </p>

      {/* 2. JSON to Zod: the conversion concept */}
      <h2>JSON to Zod: The Conversion Concept</h2>
      <p>
        Converting JSON to a Zod schema means analyzing a concrete JSON value and producing a Zod schema definition that would accept that value (and structurally similar values). The process inspects every key, detects the type of each value, handles nesting, and outputs valid TypeScript code using Zod methods.
      </p>
      <p>
        For example, given this JSON:
      </p>
      <pre><code className="language-json">{`{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "active": true
}`}</code></pre>
      <p>
        A JSON-to-Zod converter produces:
      </p>
      <pre><code className="language-typescript">{`import { z } from "zod";

const schema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  active: z.boolean(),
});

type User = z.infer<typeof schema>;
// { id: number; name: string; email: string; active: boolean }`}</code></pre>
      <p>
        You can do this by hand for small payloads or use our <Link href={`/${lang}/tools/json-to-zod`}>online JSON to Zod schema generator</Link> for larger structures. If you also need a plain TypeScript interface, try the <Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript converter</Link>.
      </p>

      {/* 3. Basic Zod types */}
      <h2>Basic Zod Types</h2>
      <p>
        Zod provides a method for every JavaScript primitive. Here is how each JSON primitive maps to Zod:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>JSON Value</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Zod Schema</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>TypeScript Type</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}><code>&quot;hello&quot;</code></td>
              <td style={{ padding: '8px 12px' }}><code>z.string()</code></td>
              <td style={{ padding: '8px 12px' }}><code>string</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}><code>42</code></td>
              <td style={{ padding: '8px 12px' }}><code>z.number()</code></td>
              <td style={{ padding: '8px 12px' }}><code>number</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}><code>true</code></td>
              <td style={{ padding: '8px 12px' }}><code>z.boolean()</code></td>
              <td style={{ padding: '8px 12px' }}><code>boolean</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}><code>null</code></td>
              <td style={{ padding: '8px 12px' }}><code>z.null()</code></td>
              <td style={{ padding: '8px 12px' }}><code>null</code></td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px' }}><code>undefined</code></td>
              <td style={{ padding: '8px 12px' }}><code>z.undefined()</code></td>
              <td style={{ padding: '8px 12px' }}><code>undefined</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Zod also offers refinement methods you can chain onto any primitive:
      </p>
      <pre><code className="language-typescript">{`// String with constraints
const email = z.string().email();
const slug = z.string().min(1).max(100).regex(/^[a-z0-9-]+$/);

// Number with constraints
const port = z.number().int().min(1).max(65535);
const score = z.number().nonnegative();

// Literal values (exact match)
const status = z.literal("active");
const version = z.literal(2);`}</code></pre>

      {/* 4. Objects and nested schemas */}
      <h2>Objects and Nested Schemas</h2>
      <p>
        Most JSON payloads are objects, and <code>z.object()</code> is how you describe them. Nested objects simply nest <code>z.object()</code> calls inside each other.
      </p>
      <p>
        Consider this JSON representing a blog post with an embedded author:
      </p>
      <pre><code className="language-json">{`{
  "title": "Getting Started with Zod",
  "slug": "getting-started-with-zod",
  "published": true,
  "views": 1024,
  "author": {
    "name": "DevToolBox",
    "url": "https://viadreams.cc"
  },
  "tags": ["typescript", "validation", "zod"]
}`}</code></pre>
      <p>
        The corresponding Zod schema:
      </p>
      <pre><code className="language-typescript">{`const authorSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  published: z.boolean(),
  views: z.number().int().nonnegative(),
  author: authorSchema,
  tags: z.array(z.string()),
});

type Post = z.infer<typeof postSchema>;`}</code></pre>
      <p>
        Extracting <code>authorSchema</code> into its own variable is not required but keeps things readable. You can reuse it anywhere another schema needs the same author shape. The <code>z.infer</code> call at the bottom produces a fully typed <code>Post</code> interface automatically.
      </p>
      <p>
        Zod objects also support <code>.extend()</code>, <code>.merge()</code>, <code>.pick()</code>, <code>.omit()</code>, and <code>.partial()</code> for composing and transforming schemas, just like TypeScript utility types. For a deeper dive into generics and utility types, see our guide on <Link href={`/${lang}/blog/typescript-generics-explained`}>TypeScript generics</Link>.
      </p>

      {/* 5. Arrays and tuples */}
      <h2>Arrays and Tuples</h2>
      <p>
        JSON arrays map to either <code>z.array()</code> (homogeneous list) or <code>z.tuple()</code> (fixed-length with per-position types).
      </p>
      <pre><code className="language-typescript">{`// Homogeneous array
const tags = z.array(z.string());         // string[]
const scores = z.array(z.number()).min(1); // at least one element

// Array of objects
const users = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
);

// Tuple: fixed length, each position typed
const coordinate = z.tuple([
  z.number(), // latitude
  z.number(), // longitude
]);
// inferred type: [number, number]

// Tuple with rest element
const row = z.tuple([z.string(), z.number()]).rest(z.boolean());
// inferred type: [string, number, ...boolean[]]`}</code></pre>
      <p>
        A practical example: converting a JSON array of products.
      </p>
      <pre><code className="language-json">{`[
  { "sku": "A100", "price": 29.99, "inStock": true },
  { "sku": "B200", "price": 49.99, "inStock": false }
]`}</code></pre>
      <pre><code className="language-typescript">{`const productSchema = z.object({
  sku: z.string(),
  price: z.number().positive(),
  inStock: z.boolean(),
});

const productsSchema = z.array(productSchema);

// Parse and validate
const parsed = productsSchema.parse(jsonData);
// parsed is fully typed as { sku: string; price: number; inStock: boolean }[]`}</code></pre>

      {/* 6. Optional, nullable, and default values */}
      <h2>Optional, Nullable, and Default Values</h2>
      <p>
        JSON data often contains fields that might be missing, explicitly <code>null</code>, or both. Zod has distinct helpers for each scenario:
      </p>
      <pre><code className="language-typescript">{`const userSchema = z.object({
  name: z.string(),

  // Field may be absent (undefined)
  nickname: z.string().optional(),
  // inferred: string | undefined

  // Field may be null
  deletedAt: z.string().nullable(),
  // inferred: string | null

  // Field may be absent OR null
  bio: z.string().nullish(),
  // inferred: string | null | undefined

  // Falls back to a default if missing
  role: z.string().default("viewer"),
  // inferred: string (always present after parsing)

  // Coerce a string to a number automatically
  age: z.coerce.number(),
  // accepts "25" and returns 25
});`}</code></pre>
      <p>
        These modifiers matter when converting JSON to Zod because sample JSON only shows one snapshot of the data. A field that is present in your sample might be optional in the real schema. Automated generators typically mark every field as required; you should review the output and add <code>.optional()</code> or <code>.nullable()</code> where the actual API contract allows missing values.
      </p>
      <p>
        Here is a JSON example where some fields are null:
      </p>
      <pre><code className="language-json">{`{
  "username": "dev_user",
  "avatar": null,
  "settings": {
    "theme": "dark",
    "language": null
  }
}`}</code></pre>
      <pre><code className="language-typescript">{`const settingsSchema = z.object({
  theme: z.string().default("light"),
  language: z.string().nullable(),
});

const profileSchema = z.object({
  username: z.string().min(1),
  avatar: z.string().url().nullable(),
  settings: settingsSchema,
});`}</code></pre>

      {/* 7. Unions and discriminated unions */}
      <h2>Unions and Discriminated Unions</h2>
      <p>
        When a JSON field can hold different shapes, Zod provides <code>z.union()</code> and <code>z.discriminatedUnion()</code>. The discriminated variant is faster because Zod can look at a single discriminator key instead of trying every option.
      </p>
      <pre><code className="language-typescript">{`// Simple union: value can be string or number
const idSchema = z.union([z.string(), z.number()]);

// Discriminated union: tagged objects
const eventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("click"),
    x: z.number(),
    y: z.number(),
  }),
  z.object({
    type: z.literal("keypress"),
    key: z.string(),
    code: z.number(),
  }),
  z.object({
    type: z.literal("scroll"),
    direction: z.enum(["up", "down"]),
    delta: z.number(),
  }),
]);

type AppEvent = z.infer<typeof eventSchema>;
// TypeScript narrows the type based on "type" field`}</code></pre>
      <p>
        A concrete JSON payload that the schema above would validate:
      </p>
      <pre><code className="language-json">{`{ "type": "click", "x": 120, "y": 340 }`}</code></pre>
      <pre><code className="language-json">{`{ "type": "keypress", "key": "Enter", "code": 13 }`}</code></pre>
      <p>
        Discriminated unions are especially useful for webhook payloads, event streams, and API responses that include a <code>type</code> or <code>kind</code> field. After parsing, TypeScript narrows the union automatically in <code>switch</code> statements and <code>if</code> blocks.
      </p>

      {/* 8. Using Zod with TypeScript (z.infer) */}
      <h2>Using Zod with TypeScript: z.infer</h2>
      <p>
        The killer feature of Zod is <code>z.infer&lt;typeof schema&gt;</code>. It derives a TypeScript type from any Zod schema, eliminating the need to define types separately.
      </p>
      <pre><code className="language-typescript">{`const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zip: z.string().regex(/^\\d{5}(-\\d{4})?$/),
  country: z.string().length(2),
});

// Derive the type — no separate interface needed
type Address = z.infer<typeof addressSchema>;

// Use in function signatures
function formatAddress(addr: Address): string {
  return \`\${addr.street}, \${addr.city} \${addr.zip}, \${addr.country}\`;
}

// Safe parsing: returns a result object instead of throwing
const result = addressSchema.safeParse(unknownData);
if (result.success) {
  console.log(result.data.city); // fully typed
} else {
  console.error(result.error.issues);
}`}</code></pre>
      <p>
        This pattern is used throughout modern TypeScript stacks. tRPC uses Zod schemas to define API input types. React Hook Form uses them for form validation. Next.js server actions parse form data with Zod before touching the database.
      </p>
      <p>
        You can also extract input and output types separately when a schema uses <code>.transform()</code>:
      </p>
      <pre><code className="language-typescript">{`const dateSchema = z.string().transform((s) => new Date(s));

type DateInput = z.input<typeof dateSchema>;  // string
type DateOutput = z.output<typeof dateSchema>; // Date`}</code></pre>
      <p>
        For more on TypeScript type manipulation techniques, see our article on <Link href={`/${lang}/blog/typescript-generics-explained`}>TypeScript generics explained</Link>.
      </p>

      {/* 9. Zod vs JSON Schema vs TypeScript */}
      <h2>Zod vs JSON Schema vs TypeScript Interfaces</h2>
      <p>
        Developers often ask how Zod compares to <Link href={`/${lang}/blog/json-schema-validation-guide`}>JSON Schema</Link> and plain TypeScript interfaces. Here is a side-by-side comparison:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Feature</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Zod</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>JSON Schema</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>TS Interface</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}>Runtime validation</td>
              <td style={{ padding: '8px 12px' }}>Yes (built-in)</td>
              <td style={{ padding: '8px 12px' }}>Yes (via Ajv, etc.)</td>
              <td style={{ padding: '8px 12px' }}>No</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}>Static types</td>
              <td style={{ padding: '8px 12px' }}>Auto-inferred</td>
              <td style={{ padding: '8px 12px' }}>Requires codegen</td>
              <td style={{ padding: '8px 12px' }}>Manual</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}>Language</td>
              <td style={{ padding: '8px 12px' }}>TypeScript/JS only</td>
              <td style={{ padding: '8px 12px' }}>Language-agnostic</td>
              <td style={{ padding: '8px 12px' }}>TypeScript only</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}>Transforms</td>
              <td style={{ padding: '8px 12px' }}>Yes (parse + transform)</td>
              <td style={{ padding: '8px 12px' }}>No</td>
              <td style={{ padding: '8px 12px' }}>No</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}>Error messages</td>
              <td style={{ padding: '8px 12px' }}>Rich, customizable</td>
              <td style={{ padding: '8px 12px' }}>Validator-dependent</td>
              <td style={{ padding: '8px 12px' }}>Compile-time only</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}>Composability</td>
              <td style={{ padding: '8px 12px' }}>extend, merge, pick, omit</td>
              <td style={{ padding: '8px 12px' }}>$ref, allOf, oneOf</td>
              <td style={{ padding: '8px 12px' }}>extends, Omit, Pick</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px' }}>Best for</td>
              <td style={{ padding: '8px 12px' }}>TS apps, APIs, forms</td>
              <td style={{ padding: '8px 12px' }}>Cross-language APIs</td>
              <td style={{ padding: '8px 12px' }}>Internal code types</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>When to use Zod:</strong> You are building a TypeScript application and need both validation and types. Zod is ideal for Next.js, Express, tRPC, and React apps.
      </p>
      <p>
        <strong>When to use JSON Schema:</strong> Your API contract must be consumed by multiple languages (Python, Go, Java). JSON Schema is language-agnostic and has broad tooling support. Use our <Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema converter</Link> to generate one.
      </p>
      <p>
        <strong>When to use plain TypeScript:</strong> For internal types that never cross a system boundary (component props, function parameters, internal state). No runtime cost, no extra dependency.
      </p>

      {/* 10. FAQ */}
      <h2>Frequently Asked Questions</h2>

      <h3>How do I convert a large JSON API response to a Zod schema quickly?</h3>
      <p>
        Paste your JSON into our <Link href={`/${lang}/tools/json-to-zod`}>JSON to Zod converter</Link>. It analyzes every field, detects types, handles nesting, and outputs a ready-to-use Zod schema. For very large payloads, generate the base schema automatically and then refine it by adding <code>.optional()</code>, <code>.email()</code>, or custom validators where needed.
      </p>

      <h3>Does Zod work with JavaScript or only TypeScript?</h3>
      <p>
        Zod works with both. The library is written in TypeScript but ships compiled JavaScript with type declarations. In a plain JavaScript project, you still get runtime validation. However, you lose the automatic type inference that makes Zod so powerful. For JavaScript-only projects, Joi or Yup may be simpler alternatives.
      </p>

      <h3>How does Zod handle extra fields not defined in the schema?</h3>
      <p>
        By default, <code>z.object()</code> strips unknown keys during parsing (similar to <code>additionalProperties: false</code> in JSON Schema). If you want to preserve extra fields, use <code>.passthrough()</code>. If you want parsing to fail when extra fields appear, use <code>.strict()</code>.
      </p>
      <pre><code className="language-typescript">{`const schema = z.object({ name: z.string() });

schema.parse({ name: "Alice", extra: true });
// returns { name: "Alice" } — extra key stripped

schema.passthrough().parse({ name: "Alice", extra: true });
// returns { name: "Alice", extra: true }

schema.strict().parse({ name: "Alice", extra: true });
// throws ZodError — unrecognized key "extra"`}</code></pre>

      <h3>Can I generate JSON Schema from a Zod schema?</h3>
      <p>
        Yes. The <code>zod-to-json-schema</code> package converts any Zod schema to a JSON Schema object. This is useful when you need to share your schema with non-TypeScript consumers or OpenAPI documentation. You can also go the other direction: generate JSON Schema first using our <Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema tool</Link>, then convert it to Zod.
      </p>

      <h3>What is the performance overhead of Zod validation?</h3>
      <p>
        For typical payloads (objects with 10-50 fields), Zod validation takes microseconds and is negligible in the context of network requests or database calls. Validate at system boundaries — API handlers, form submissions, environment startup — rather than in hot inner loops. If you need to validate millions of records per second, consider Ajv with a precompiled JSON Schema, which is optimized for raw throughput.
      </p>

      {/* Closing CTA */}
      <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', padding: '16px 20px', marginTop: '32px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Ready to generate your Zod schema?</p>
        <p style={{ margin: 0 }}>
          Paste any JSON into our <Link href={`/${lang}/tools/json-to-zod`} style={{ fontWeight: 600 }}>JSON to Zod Schema Generator</Link> and get production-ready TypeScript code instantly. Also check out the <Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link> and <Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema</Link> converters for related workflows.
        </p>
      </div>
    </>
  );
}
