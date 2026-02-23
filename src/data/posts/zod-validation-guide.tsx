'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Zod Validation Guide: Schema Validation for TypeScript Applications',
    intro: 'Zod is a TypeScript-first schema validation library that lets you define schemas for your data and validate it at runtime while providing full TypeScript type inference. Unlike other validation libraries, Zod eliminates the gap between your runtime validation and your TypeScript types. Define it once, and get both runtime validation and compile-time type safety. This guide covers everything from basic schemas to advanced patterns used in production applications.',
    h2WhyZod: 'Why Zod?',
    whyZodDesc: 'Traditional TypeScript types only exist at compile time and are erased during compilation. This means data from external sources (API responses, form inputs, environment variables, database queries) is never validated at runtime. Zod bridges this gap by providing runtime validation that automatically generates TypeScript types.',
    h3Benefits: 'Key Benefits',
    ben1: 'Zero dependencies: tiny library with no external packages',
    ben2: 'TypeScript-first: full type inference, no separate type definitions needed',
    ben3: 'Composable: schemas can be combined, extended, and transformed',
    ben4: 'Immutable: all methods return new schema instances',
    ben5: 'Detailed errors: rich error messages with paths and custom messages',
    ben6: 'Works everywhere: Node.js, Deno, Bun, browsers, React Native',
    h2BasicSchemas: 'Basic Schemas',
    basicSchemasDesc: 'Zod provides primitives for all JavaScript types and methods to compose them into complex schemas.',
    h2ObjectSchemas: 'Object Schemas',
    objectSchemasDesc: 'Object schemas are the most common type. They validate the shape of JavaScript objects and provide type inference for each property.',
    h2ArraySchemas: 'Array and Tuple Schemas',
    arraySchemasDesc: 'Zod provides powerful array and tuple validation with support for length constraints, element validation, and type inference.',
    h2Transforms: 'Transforms and Refinements',
    transformsDesc: 'Transforms modify the output type, while refinements add custom validation logic. Both are essential for real-world validation.',
    h3Refinements: 'Custom Refinements',
    refinementsDesc: 'The refine method adds custom validation rules that go beyond type checking.',
    h3Transformations: 'Data Transformations',
    transformationsDesc: 'The transform method changes the output type of a schema. This is useful for parsing strings to numbers, normalizing data, or computing derived values.',
    h2Patterns: 'Real-World Patterns',
    patternsDesc: 'These patterns are commonly used in production TypeScript applications.',
    h3APIValidation: 'API Response Validation',
    apiValidationDesc: 'Validate API responses to catch breaking changes and ensure your application handles data correctly.',
    h3FormValidation: 'Form Validation',
    formValidationDesc: 'Zod integrates with form libraries like React Hook Form, Formik, and TanStack Form for declarative form validation.',
    h3EnvValidation: 'Environment Variable Validation',
    envValidationDesc: 'Validate environment variables at application startup to fail fast if configuration is missing or invalid.',
    h3DatabaseSchemas: 'Database Schema Validation',
    databaseSchemasDesc: 'Use Zod to validate data before inserting into the database and after reading from it.',
    h2Advanced: 'Advanced Features',
    h3Discriminated: 'Discriminated Unions',
    discriminatedDesc: 'Discriminated unions validate objects based on a shared discriminator field. They are more efficient than regular unions because Zod can determine the correct schema without trying each option.',
    h3Recursive: 'Recursive Schemas',
    recursiveDesc: 'Zod supports recursive schemas using z.lazy() for tree structures, nested comments, and similar data.',
    h3Branded: 'Branded Types',
    brandedDesc: 'Branded types create nominally-typed values that prevent mixing structurally identical types. This is useful for IDs, validated strings, and domain-specific types.',
    h3Pipeline: 'Schema Pipelines',
    pipelineDesc: 'Pipelines chain multiple schemas together, where the output of one schema becomes the input of the next.',
    h2ErrorHandling: 'Error Handling',
    errorHandlingDesc: 'Zod provides detailed error information that you can format for user-facing messages.',
    h2Integration: 'Framework Integration',
    h3ReactHookForm: 'React Hook Form',
    reactHookFormDesc: 'Use @hookform/resolvers/zod to integrate Zod schemas with React Hook Form for declarative form validation.',
    h3tRPC: 'tRPC',
    tRPCDesc: 'tRPC uses Zod schemas for input validation, providing end-to-end type safety between your client and server.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'How does Zod compare to Yup?',
    faq1A: 'Zod is TypeScript-first with better type inference, while Yup was originally designed for JavaScript. Zod schemas automatically generate TypeScript types (z.infer<typeof schema>), while Yup requires separate type definitions. Zod is also smaller, faster, and has no dependencies. For new TypeScript projects, Zod is the better choice.',
    faq2Q: 'Does Zod impact runtime performance?',
    faq2A: 'Zod is designed to be fast. Simple schema validation (objects with primitive fields) takes microseconds. For most applications, the performance impact is negligible. If you are validating millions of objects per second, consider validating only at system boundaries (API inputs/outputs) rather than internally.',
    faq3Q: 'Can I use Zod without TypeScript?',
    faq3A: 'Yes, Zod works with plain JavaScript. However, you lose the main benefit of automatic type inference. If you are using JavaScript, Joi or Yup might be better alternatives since they were designed for JavaScript-first usage.',
    faq4Q: 'How do I validate nested objects?',
    faq4A: 'Nest z.object() schemas inside each other. Zod handles deep nesting naturally. Use z.lazy() for recursive structures. Error paths automatically include the full nested path (e.g., "address.city") for easy debugging.',
    faq5Q: 'Can Zod replace TypeScript interfaces?',
    faq5A: 'For data that crosses system boundaries (API inputs, form data, env vars, database results), yes. Define a Zod schema and use z.infer<typeof schema> for the type. For internal application types (component props, function signatures), regular TypeScript interfaces are simpler and have no runtime cost.',
  },
  zh: {
    title: 'Zod 验证指南：TypeScript 应用的 Schema 验证',
    intro: 'Zod 是一个 TypeScript 优先的 schema 验证库，让你定义数据的 schema 并在运行时验证，同时提供完整的 TypeScript 类型推断。定义一次，同时获得运行时验证和编译时类型安全。',
    h2WhyZod: '为什么选择 Zod？',
    whyZodDesc: '传统 TypeScript 类型仅在编译时存在。来自外部源的数据在运行时从不被验证。Zod 通过提供自动生成 TypeScript 类型的运行时验证来弥合这一差距。',
    h3Benefits: '主要优势',
    ben1: '零依赖：没有外部包的小型库',
    ben2: 'TypeScript 优先：完整的类型推断',
    ben3: '可组合：schema 可以组合、扩展和转换',
    ben4: '不可变：所有方法返回新的 schema 实例',
    ben5: '详细错误：带路径和自定义消息的丰富错误信息',
    ben6: '到处运行：Node.js、Deno、Bun、浏览器',
    h2BasicSchemas: '基本 Schema',
    basicSchemasDesc: 'Zod 为所有 JavaScript 类型提供原语，以及组合成复杂 schema 的方法。',
    h2ObjectSchemas: '对象 Schema',
    objectSchemasDesc: '对象 schema 是最常见的类型，验证 JavaScript 对象的形状并为每个属性提供类型推断。',
    h2ArraySchemas: '数组和元组 Schema',
    arraySchemasDesc: 'Zod 提供强大的数组和元组验证，支持长度约束和元素验证。',
    h2Transforms: '转换和细化',
    transformsDesc: '转换修改输出类型，细化添加自定义验证逻辑。两者对实际验证都必不可少。',
    h3Refinements: '自定义细化',
    refinementsDesc: 'refine 方法添加超越类型检查的自定义验证规则。',
    h3Transformations: '数据转换',
    transformationsDesc: 'transform 方法改变 schema 的输出类型，用于解析字符串为数字、规范化数据等。',
    h2Patterns: '实际模式',
    patternsDesc: '这些模式在生产 TypeScript 应用中常用。',
    h3APIValidation: 'API 响应验证',
    apiValidationDesc: '验证 API 响应以捕获破坏性变更。',
    h3FormValidation: '表单验证',
    formValidationDesc: 'Zod 与 React Hook Form 等表单库集成。',
    h3EnvValidation: '环境变量验证',
    envValidationDesc: '在应用启动时验证环境变量。',
    h3DatabaseSchemas: '数据库 Schema 验证',
    databaseSchemasDesc: '使用 Zod 在插入数据库前后验证数据。',
    h2Advanced: '高级特性',
    h3Discriminated: '可辨识联合',
    discriminatedDesc: '可辨识联合基于共享的辨识字段验证对象。',
    h3Recursive: '递归 Schema',
    recursiveDesc: 'Zod 使用 z.lazy() 支持递归 schema。',
    h3Branded: '品牌类型',
    brandedDesc: '品牌类型创建名义类型值，防止混合结构相同的类型。',
    h3Pipeline: 'Schema 管道',
    pipelineDesc: '管道将多个 schema 链接在一起。',
    h2ErrorHandling: '错误处理',
    errorHandlingDesc: 'Zod 提供可以格式化为用户友好消息的详细错误信息。',
    h2Integration: '框架集成',
    h3ReactHookForm: 'React Hook Form',
    reactHookFormDesc: '使用 @hookform/resolvers/zod 集成 Zod schema 与 React Hook Form。',
    h3tRPC: 'tRPC',
    tRPCDesc: 'tRPC 使用 Zod schema 进行输入验证，提供端到端类型安全。',
    h2Faq: '常见问题',
    faq1Q: 'Zod 与 Yup 相比如何？',
    faq1A: 'Zod 是 TypeScript 优先的，有更好的类型推断。对于新的 TypeScript 项目，Zod 是更好的选择。',
    faq2Q: 'Zod 影响运行时性能吗？',
    faq2A: 'Zod 设计为快速的。简单 schema 验证只需微秒。建议只在系统边界验证。',
    faq3Q: '可以不用 TypeScript 使用 Zod 吗？',
    faq3A: '可以，但会失去自动类型推断的主要优势。JavaScript 项目可以考虑 Joi 或 Yup。',
    faq4Q: '如何验证嵌套对象？',
    faq4A: '在 z.object() 中嵌套 z.object()。使用 z.lazy() 处理递归结构。',
    faq5Q: 'Zod 能取代 TypeScript 接口吗？',
    faq5A: '对于跨系统边界的数据可以。对于内部应用类型，普通 TypeScript 接口更简单。',
  },
};

export default function ZodValidationGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* Why Zod */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2WhyZod}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.whyZodDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Benefits}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.ben1, t.ben2, t.ben3, t.ben4, t.ben5, t.ben6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      {/* Basic Schemas */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2BasicSchemas}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.basicSchemasDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { z } from "zod";

// Primitive types
const stringSchema = z.string();
const numberSchema = z.number();
const booleanSchema = z.boolean();
const dateSchema = z.date();
const undefinedSchema = z.undefined();
const nullSchema = z.null();
const bigintSchema = z.bigint();

// String validations
const emailSchema = z.string().email("Invalid email address");
const urlSchema = z.string().url();
const uuidSchema = z.string().uuid();
const minSchema = z.string().min(3, "Too short");
const maxSchema = z.string().max(100, "Too long");
const regexSchema = z.string().regex(/^[A-Z]{2}\\d{4}$/, "Invalid format");
const trimSchema = z.string().trim();  // trims whitespace

// Number validations
const positiveSchema = z.number().positive();
const intSchema = z.number().int();
const rangeSchema = z.number().min(0).max(100);
const finiteSchema = z.number().finite();

// Enums
const roleSchema = z.enum(["admin", "user", "guest"]);
type Role = z.infer<typeof roleSchema>;  // "admin" | "user" | "guest"

// Literals
const statusSchema = z.literal("active");

// Unions
const idSchema = z.union([z.string(), z.number()]);
// Shorthand: z.string().or(z.number())

// Parsing
const result = emailSchema.safeParse("test@example.com");
if (result.success) {
  console.log(result.data);  // "test@example.com"
} else {
  console.log(result.error.issues);
}`}</code></pre>

      {/* Object Schemas */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2ObjectSchemas}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.objectSchemasDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Object schemas with full type inference
const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150).optional(),
  role: z.enum(["admin", "user", "guest"]).default("user"),
  tags: z.array(z.string()).default([]),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string().regex(/^\\d{5}(-\\d{4})?$/),
    country: z.string().length(2),
  }).optional(),
});

// Infer the TypeScript type automatically
type User = z.infer<typeof UserSchema>;
// {
//   id: number;
//   name: string;
//   email: string;
//   age?: number | undefined;
//   role: "admin" | "user" | "guest";
//   tags: string[];
//   address?: { street: string; city: string; zip: string; country: string } | undefined;
// }

// Schema composition
const CreateUserSchema = UserSchema.omit({ id: true });
const UpdateUserSchema = UserSchema.partial().required({ id: true });
const PublicUserSchema = UserSchema.pick({ id: true, name: true, role: true });

// Extending schemas
const AdminSchema = UserSchema.extend({
  permissions: z.array(z.string()),
  department: z.string(),
});

// Merging schemas
const WithTimestamps = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});
const UserWithTimestamps = UserSchema.merge(WithTimestamps);`}</code></pre>

      {/* Transforms */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Transforms}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.transformsDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Refinements}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.refinementsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Custom refinements
const PasswordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .refine(val => /[A-Z]/.test(val), "Must contain uppercase letter")
  .refine(val => /[a-z]/.test(val), "Must contain lowercase letter")
  .refine(val => /[0-9]/.test(val), "Must contain number")
  .refine(val => /[^A-Za-z0-9]/.test(val), "Must contain special character");

// Super refinement for cross-field validation
const SignupSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

// Date range validation
const DateRangeSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
}).refine(
  data => data.endDate > data.startDate,
  { message: "End date must be after start date", path: ["endDate"] }
);`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Transformations}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.transformationsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Transform: string to number
const NumericStringSchema = z.string().transform(Number);
// Input: "42" -> Output: 42

// Transform: normalize data
const NormalizedEmailSchema = z.string()
  .email()
  .transform(email => email.toLowerCase().trim());

// Transform with validation
const PositiveIntString = z.string()
  .transform(Number)
  .pipe(z.number().int().positive());
// Input: "42" -> validates as string -> transforms to 42 -> validates as positive int

// Transform: parse JSON strings
const JsonSchema = z.string().transform((str, ctx) => {
  try {
    return JSON.parse(str);
  } catch {
    ctx.addIssue({ code: "custom", message: "Invalid JSON" });
    return z.NEVER;
  }
});

// Coercion (built-in transforms)
const coercedNumber = z.coerce.number();  // "42" -> 42
const coercedBoolean = z.coerce.boolean(); // "true" -> true
const coercedDate = z.coerce.date();       // "2026-01-01" -> Date`}</code></pre>

      {/* Real-World Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Patterns}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.patternsDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3APIValidation}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.apiValidationDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Validate API responses
const ApiResponseSchema = z.object({
  data: z.array(UserSchema),
  pagination: z.object({
    page: z.number(),
    perPage: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

type ApiResponse = z.infer<typeof ApiResponseSchema>;

async function fetchUsers(page: number): Promise<ApiResponse> {
  const res = await fetch(\`/api/users?page=\${page}\`);
  const json = await res.json();

  // Validate response - throws if invalid
  return ApiResponseSchema.parse(json);
}

// Safe version that returns errors
async function fetchUsersSafe(page: number) {
  const res = await fetch(\`/api/users?page=\${page}\`);
  const json = await res.json();
  return ApiResponseSchema.safeParse(json);
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3EnvValidation}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.envValidationDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Validate environment variables at startup
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  API_KEY: z.string().min(1),
  REDIS_URL: z.string().url().optional(),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  CORS_ORIGINS: z.string().transform(s => s.split(",")),
});

// Parse and export typed env
const env = EnvSchema.parse(process.env);

export default env;
// env.PORT is number (not string!)
// env.CORS_ORIGINS is string[]
// env.NODE_ENV is "development" | "production" | "test"`}</code></pre>

      {/* Advanced Features */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Advanced}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Discriminated}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.discriminatedDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Discriminated union - efficient, checks "type" field first
const EventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("click"),
    x: z.number(),
    y: z.number(),
    target: z.string(),
  }),
  z.object({
    type: z.literal("keypress"),
    key: z.string(),
    modifiers: z.array(z.enum(["ctrl", "shift", "alt", "meta"])),
  }),
  z.object({
    type: z.literal("scroll"),
    deltaX: z.number(),
    deltaY: z.number(),
  }),
]);

type Event = z.infer<typeof EventSchema>;

function handleEvent(event: Event) {
  switch (event.type) {
    case "click":
      console.log(\`Click at (\${event.x}, \${event.y})\`);  // TS knows x, y exist
      break;
    case "keypress":
      console.log(\`Key: \${event.key}\`);  // TS knows key exists
      break;
    case "scroll":
      console.log(\`Scroll: \${event.deltaY}\`);
      break;
  }
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Branded}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.brandedDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Branded types prevent mixing structurally identical types
const UserId = z.string().uuid().brand<"UserId">();
const PostId = z.string().uuid().brand<"PostId">();

type UserId = z.infer<typeof UserId>;  // string & { __brand: "UserId" }
type PostId = z.infer<typeof PostId>;  // string & { __brand: "PostId" }

function getUser(id: UserId) { /* ... */ }
function getPost(id: PostId) { /* ... */ }

const userId = UserId.parse("550e8400-e29b-41d4-a716-446655440000");
const postId = PostId.parse("6ba7b810-9dad-11d1-80b4-00c04fd430c8");

getUser(userId);  // OK
// getUser(postId); // TypeScript ERROR! PostId is not UserId`}</code></pre>

      {/* Error Handling */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2ErrorHandling}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.errorHandlingDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Handling validation errors
const result = UserSchema.safeParse(invalidData);

if (!result.success) {
  // Zod error has structured issues
  const errors = result.error.issues;
  // [
  //   { code: "too_small", path: ["name"], message: "Too short" },
  //   { code: "invalid_string", path: ["email"], message: "Invalid email" }
  // ]

  // Format errors by field
  const fieldErrors = result.error.flatten().fieldErrors;
  // { name: ["Too short"], email: ["Invalid email"] }

  // Format as a single message
  const formatted = result.error.format();
  // { name: { _errors: ["Too short"] }, email: { _errors: ["Invalid email"] } }
}

// Custom error map
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_small) {
    return { message: \`Must be at least \${issue.minimum} characters\` };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);`}</code></pre>

      {/* Framework Integration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Integration}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3tRPC}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.tRPCDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// tRPC with Zod: end-to-end type safety
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

const appRouter = t.router({
  getUser: t.procedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      // input is typed as { id: string }
      return await db.user.findUnique({ where: { id: input.id } });
    }),

  createUser: t.procedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      // input is typed as { name: string; email: string }
      return await db.user.create({ data: input });
    }),
});

// Client gets full type inference from the schemas!
// const user = await trpc.getUser.query({ id: "..." });`}</code></pre>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A],
          [t.faq4Q, t.faq4A], [t.faq5Q, t.faq5A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
