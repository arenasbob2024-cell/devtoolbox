'use client';

import Link from 'next/link';

export default function GraphqlToTypescriptGuide({ lang }: { lang: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best tool for GraphQL to TypeScript code generation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GraphQL Code Generator (@graphql-codegen) is the industry standard. It supports plugin-based generation of TypeScript types, React Query hooks, Apollo typed hooks, and more. For quick one-off conversions, use an online GraphQL to TypeScript converter.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do nullable GraphQL fields map to TypeScript types?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In GraphQL, fields without an exclamation mark (!) are nullable by default. These map to TypeScript union types with null, such as string | null. Fields marked with ! are non-nullable and map directly to their TypeScript equivalent without the null union.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I generate TypeScript types from a remote GraphQL endpoint?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Most code generators support introspection, meaning they can query a running GraphQL server for its schema and generate types from the introspection result. Configure your endpoint URL in the codegen config file and ensure the server allows introspection queries.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I commit generated TypeScript files to version control?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, committing generated files is recommended. It makes pull request diffs clearly show how schema changes affect your frontend types. It also lets developers work without running codegen locally. Just make sure never to manually edit the generated files.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between graphql-codegen and gql.tada?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'graphql-codegen generates TypeScript files from your schema at build time. gql.tada uses TypeScript template literal types to infer types at compile time without any code generation step. graphql-codegen has broader ecosystem support, while gql.tada offers a zero-config experience for teams comfortable with advanced TypeScript.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          GraphQL schemas are strongly typed, and you can automatically generate TypeScript interfaces, enums, and input types from them. This eliminates manual type duplication, prevents runtime errors from schema drift, and keeps your frontend code fully type-safe. Try our{' '}
          <Link href={`/${lang}/tools/graphql-to-typescript`}>free GraphQL to TypeScript converter</Link>{' '}
          for instant one-click conversion, or set up <code>@graphql-codegen</code> for automated pipeline integration.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>GraphQL type systems map cleanly to TypeScript interfaces, enums, and union types.</li>
          <li>Automated code generation eliminates type drift between your API schema and frontend code.</li>
          <li>The <code>@graphql-codegen</code> toolchain supports typed hooks for React Query, Apollo, and urql.</li>
          <li>Nullable fields in GraphQL translate to <code>T | null</code> union types in TypeScript.</li>
          <li>Custom scalars like <code>DateTime</code> and <code>JSON</code> need explicit type mappings in your codegen config.</li>
          <li>GraphQL provides inherently stronger typing than REST, reducing the need for manual interface definitions.</li>
        </ul>
      </div>

      {/* Section 1 */}
      <h2>Why Generate TypeScript from GraphQL</h2>
      <p>
        GraphQL APIs define a complete type system in the schema. Every field, argument, and return type is explicitly declared. When you build a frontend that consumes a GraphQL API, you need TypeScript types that match the schema exactly. Writing these types by hand creates <strong>two sources of truth</strong> that inevitably diverge.
      </p>
      <p>
        Consider a typical scenario: your backend team adds a new required field to a <code>User</code> type. Without automated type generation, your handwritten TypeScript interface stays unchanged. The mismatch only surfaces as a runtime error in production when the field is <code>undefined</code> where the code expected a <code>string</code>.
      </p>
      <p>
        Automated GraphQL to TypeScript code generation solves this by treating the schema as the single source of truth. When the schema changes, you regenerate types, and the TypeScript compiler immediately flags every location in your frontend that needs updating. This workflow typically <strong>saves 2 to 5 hours per week</strong> on medium-sized projects and eliminates an entire class of bugs.
      </p>
      <p>
        If you need a quick conversion without setting up a full pipeline, our{' '}
        <Link href={`/${lang}/tools/graphql-to-typescript`}>GraphQL to TypeScript converter</Link>{' '}
        handles it instantly in the browser.
      </p>

      {/* Section 2 */}
      <h2>GraphQL Type System Overview</h2>
      <p>
        Before diving into code generation, you need to understand the GraphQL <strong>Schema Definition Language (SDL)</strong> and its type constructs. GraphQL supports six primary type categories:
      </p>
      <ul>
        <li><strong>Object types</strong> (<code>type</code>) - define the shape of data objects with named fields</li>
        <li><strong>Input types</strong> (<code>input</code>) - define argument shapes for mutations and queries</li>
        <li><strong>Enum types</strong> (<code>enum</code>) - define a fixed set of allowed values</li>
        <li><strong>Interface types</strong> (<code>interface</code>) - abstract types that other types implement</li>
        <li><strong>Union types</strong> (<code>union</code>) - represent one of several possible object types</li>
        <li><strong>Scalar types</strong> (<code>scalar</code>) - primitive values like <code>String</code>, <code>Int</code>, <code>Boolean</code>, <code>Float</code>, <code>ID</code>, or custom scalars</li>
      </ul>
      <p>
        The exclamation mark (<code>!</code>) denotes a <strong>non-nullable</strong> field. Without it, the field defaults to nullable. This is the opposite of most programming languages and is critical to understand when mapping to TypeScript. Here is a schema demonstrating all major constructs:
      </p>
      <pre><code className="language-graphql">{`# Object type with various field types
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  bio: String
  role: UserRole!
  posts: [Post!]!
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  content: String!
  status: PostStatus!
  author: User!
  tags: [String!]
  publishedAt: DateTime
}

# Enum types
enum UserRole {
  ADMIN
  EDITOR
  VIEWER
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

# Input type for mutations
input CreateUserInput {
  name: String!
  email: String!
  age: Int
  role: UserRole = VIEWER
}

# Union type
union SearchResult = User | Post

# Custom scalar
scalar DateTime`}</code></pre>

      {/* Section 3 */}
      <h2>Manual Conversion Examples</h2>
      <p>
        Understanding manual conversion helps you validate generated output and debug codegen issues. Below are the four most common GraphQL-to-TypeScript mappings you will encounter.
      </p>

      <h3>Object Type to Interface</h3>
      <p>
        GraphQL object types map to TypeScript interfaces. Non-nullable fields (<code>!</code>) become required properties, and nullable fields become union types with <code>null</code>:
      </p>
      <pre><code className="language-typescript">{`// From GraphQL: type User { id: ID!, name: String!, age: Int, bio: String }
interface User {
  id: string;
  name: string;
  age: number | null;
  bio: string | null;
}`}</code></pre>

      <h3>Input Type to Interface</h3>
      <p>
        Input types follow the same mapping rules. Fields with default values in GraphQL become optional in TypeScript:
      </p>
      <pre><code className="language-typescript">{`// From GraphQL: input CreateUserInput { name: String!, email: String!, age: Int, role: UserRole = VIEWER }
interface CreateUserInput {
  name: string;
  email: string;
  age?: number | null;
  role?: UserRole;
}`}</code></pre>

      <h3>Enum to TypeScript Enum or Union</h3>
      <p>
        GraphQL enums can map to either TypeScript enums or string literal unions. Both approaches are valid, but string literal unions are often preferred for tree-shaking:
      </p>
      <pre><code className="language-typescript">{`// Approach 1: TypeScript enum
enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
}

// Approach 2: String literal union (preferred for tree-shaking)
type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';`}</code></pre>

      <h3>Union Type to Discriminated Union</h3>
      <p>
        GraphQL union types become TypeScript discriminated unions. The <code>__typename</code> field acts as the discriminator:
      </p>
      <pre><code className="language-typescript">{`// From GraphQL: union SearchResult = User | Post
type SearchResult =
  | { __typename: 'User'; id: string; name: string; email: string }
  | { __typename: 'Post'; id: string; title: string; content: string };

// Usage with type narrowing
function renderResult(result: SearchResult) {
  switch (result.__typename) {
    case 'User':
      return result.name; // TypeScript knows this is User
    case 'Post':
      return result.title; // TypeScript knows this is Post
  }
}`}</code></pre>
      <p>
        For more on TypeScript generics and advanced type patterns, see our guide on{' '}
        <Link href={`/${lang}/blog/typescript-generics-explained`}>TypeScript generics explained</Link>.
      </p>

      {/* Section 4 */}
      <h2>Using the Online Converter Tool</h2>
      <p>
        For quick prototyping, learning, or one-off conversions, you do not need a full codegen pipeline. Our{' '}
        <Link href={`/${lang}/tools/graphql-to-typescript`}>GraphQL to TypeScript converter</Link>{' '}
        provides instant browser-based conversion. Here is a typical workflow:
      </p>
      <ol>
        <li><strong>Paste your GraphQL SDL</strong> into the input panel. The tool accepts full schemas with multiple types, enums, inputs, and unions.</li>
        <li><strong>View the generated TypeScript</strong> in the output panel. Types are generated with proper nullability, array handling, and enum mapping.</li>
        <li><strong>Copy the output</strong> directly into your project. Use the one-click copy button to grab the generated code.</li>
      </ol>
      <p>
        The online tool handles all standard GraphQL constructs including nested types, recursive references, and list fields. It is ideal when you want to:
      </p>
      <ul>
        <li>Quickly check how a schema change affects your TypeScript types</li>
        <li>Generate initial type definitions for a new project before setting up codegen</li>
        <li>Learn the mapping rules by comparing GraphQL input to TypeScript output</li>
        <li>Share type definitions with team members who do not have codegen configured</li>
      </ul>
      <p>
        If you also work with JSON data, check out our{' '}
        <Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript converter</Link>{' '}
        and{' '}
        <Link href={`/${lang}/tools/json-to-graphql`}>JSON to GraphQL converter</Link>{' '}
        for related transformations.
      </p>

      {/* Section 5 */}
      <h2>graphql-codegen Setup Guide</h2>
      <p>
        For production projects, <code>@graphql-codegen</code> is the industry standard. It reads your GraphQL schema and operations, then generates TypeScript types, typed document nodes, and even framework-specific hooks. Here is a complete setup:
      </p>

      <h3>Step 1: Install Dependencies</h3>
      <pre><code className="language-typescript">{`# Core packages
npm install -D @graphql-codegen/cli @graphql-codegen/typescript
npm install -D @graphql-codegen/typescript-operations
npm install -D @graphql-codegen/typescript-resolvers

# Optional: framework-specific plugins
npm install -D @graphql-codegen/typescript-react-query  # for React Query
npm install -D @graphql-codegen/typescript-react-apollo  # for Apollo Client`}</code></pre>

      <h3>Step 2: Create Configuration File</h3>
      <pre><code className="language-typescript">{`// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Schema source: local file or remote endpoint
  schema: './schema.graphql',
  // Or use introspection: schema: 'http://localhost:4000/graphql',

  // Where your .graphql operation files live
  documents: ['src/**/*.graphql'],

  generates: {
    // Generated types output path
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
      ],
      config: {
        // Use string literal unions instead of TS enums
        enumsAsTypes: true,
        // Make nullable fields T | null instead of Maybe<T>
        strictScalars: true,
        // Map custom scalars
        scalars: {
          DateTime: 'string',
          JSON: 'Record<string, unknown>',
          Upload: 'File',
        },
      },
    },
  },
};

export default config;`}</code></pre>

      <h3>Step 3: Add npm Scripts</h3>
      <pre><code className="language-typescript">{`// package.json
{
  "scripts": {
    "codegen": "graphql-codegen --config codegen.ts",
    "codegen:watch": "graphql-codegen --config codegen.ts --watch",
    "dev": "concurrently \\"next dev\\" \\"npm run codegen:watch\\"",
    "precommit": "npm run codegen && tsc --noEmit"
  }
}`}</code></pre>

      <h3>Step 4: Run Generation</h3>
      <pre><code className="language-typescript">{`# One-time generation
npm run codegen

# Watch mode during development
npm run codegen:watch`}</code></pre>
      <p>
        After running codegen, all your TypeScript types are available in <code>src/generated/graphql.ts</code>. Import them directly in your components and hooks.
      </p>

      {/* Section 6 */}
      <h2>Generated Types with React Query and Apollo</h2>
      <p>
        The real power of GraphQL code generation emerges when you generate <strong>typed hooks</strong> for your data-fetching library. Instead of manually typing query results, codegen produces hooks where the return data is already fully typed.
      </p>

      <h3>With React Query (TanStack Query)</h3>
      <p>
        Add the <code>typescript-react-query</code> plugin to your codegen config:
      </p>
      <pre><code className="language-typescript">{`// codegen.ts - add to generates section
'src/generated/hooks.ts': {
  plugins: [
    'typescript',
    'typescript-operations',
    'typescript-react-query',
  ],
  config: {
    fetcher: {
      func: './fetcher#fetchGraphQL',
      isReactHook: false,
    },
    exposeQueryKeys: true,
  },
}

// Usage in a component - fully typed, zero manual interfaces
import { useGetUserQuery } from '../generated/hooks';

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useGetUserQuery({ id: userId });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  // data.user is fully typed: { id: string, name: string, ... }
  return <h1>{data?.user?.name}</h1>;
}`}</code></pre>

      <h3>With Apollo Client</h3>
      <pre><code className="language-typescript">{`// codegen.ts - Apollo plugin
'src/generated/apollo.ts': {
  plugins: [
    'typescript',
    'typescript-operations',
    'typescript-react-apollo',
  ],
  config: {
    withHooks: true,
    withComponent: false,
  },
}

// Usage - Apollo hooks are fully typed
import { useGetUserQuery } from '../generated/apollo';

function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useGetUserQuery({
    variables: { id: userId },
  });

  // data?.user is fully typed from the schema
  return <h1>{data?.user?.name}</h1>;
}`}</code></pre>
      <p>
        Both approaches give you <strong>autocomplete in your editor</strong>, compile-time error checking, and zero chance of type drift. When the schema changes, regenerate types and fix any compile errors before deploying.
      </p>

      {/* Section 7 */}
      <h2>Handling Nullable Types and Custom Scalars</h2>
      <p>
        Two areas commonly cause confusion when generating TypeScript from GraphQL: <strong>nullability</strong> and <strong>custom scalars</strong>. Getting these right is essential for accurate type generation.
      </p>

      <h3>Nullable Field Mapping</h3>
      <p>
        In GraphQL, fields are nullable by default. The <code>!</code> makes them non-nullable. This is the opposite of TypeScript where properties are non-nullable by default. Here is the complete mapping table:
      </p>
      <table>
        <thead>
          <tr>
            <th>GraphQL Type</th>
            <th>TypeScript Type</th>
            <th>Explanation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>String</code></td>
            <td><code>string | null</code></td>
            <td>Nullable string</td>
          </tr>
          <tr>
            <td><code>String!</code></td>
            <td><code>string</code></td>
            <td>Non-nullable string</td>
          </tr>
          <tr>
            <td><code>[String]</code></td>
            <td><code>(string | null)[] | null</code></td>
            <td>Nullable list of nullable strings</td>
          </tr>
          <tr>
            <td><code>[String!]</code></td>
            <td><code>string[] | null</code></td>
            <td>Nullable list of non-nullable strings</td>
          </tr>
          <tr>
            <td><code>[String!]!</code></td>
            <td><code>string[]</code></td>
            <td>Non-nullable list of non-nullable strings</td>
          </tr>
          <tr>
            <td><code>[String]!</code></td>
            <td><code>(string | null)[]</code></td>
            <td>Non-nullable list of nullable strings</td>
          </tr>
        </tbody>
      </table>

      <h3>Custom Scalar Configuration</h3>
      <p>
        GraphQL supports custom scalars beyond the built-in <code>String</code>, <code>Int</code>, <code>Float</code>, <code>Boolean</code>, and <code>ID</code>. These need explicit TypeScript mappings in your codegen config:
      </p>
      <pre><code className="language-typescript">{`// codegen.ts - scalars config section
config: {
  scalars: {
    // Date/time scalars
    DateTime: 'string',        // ISO 8601 date strings
    Date: 'string',            // YYYY-MM-DD format
    Time: 'string',            // HH:mm:ss format
    Timestamp: 'number',       // Unix timestamp

    // Data scalars
    JSON: 'Record<string, unknown>',
    JSONObject: 'Record<string, unknown>',

    // File uploads
    Upload: 'File',

    // Numeric precision
    BigInt: 'bigint',
    Decimal: 'string',  // Preserve precision as string

    // Other common scalars
    UUID: 'string',
    URL: 'string',
    EmailAddress: 'string',
    PhoneNumber: 'string',
    Void: 'void',
  },
}`}</code></pre>
      <p>
        For more advanced typing patterns like branded types for custom scalars, see our{' '}
        <Link href={`/${lang}/blog/typescript-generics-explained`}>TypeScript generics guide</Link>.
      </p>

      {/* Section 8 */}
      <h2>Best Practices for Type-Safe GraphQL</h2>
      <p>
        Generating types is only the first step. Follow these best practices to maintain a robust, type-safe GraphQL workflow across your entire team:
      </p>
      <ol>
        <li>
          <strong>Never manually edit generated files.</strong> Add a comment header to generated files and configure your linter to skip them. If you need custom types, create a separate file that imports and extends the generated ones.
        </li>
        <li>
          <strong>Run codegen in watch mode during development.</strong> This keeps types updated automatically as you modify <code>.graphql</code> files, giving you instant feedback in your editor.
        </li>
        <li>
          <strong>Add codegen to your CI pipeline.</strong> Run <code>npm run codegen</code> followed by <code>tsc --noEmit</code> in CI to catch schema drift before code reaches production.
        </li>
        <li>
          <strong>Commit generated files to version control.</strong> This makes pull request diffs clearly show how schema changes affect your frontend types and lets developers work without running codegen locally.
        </li>
        <li>
          <strong>Use fragment colocation.</strong> Define GraphQL fragments alongside the components that consume them. This keeps data requirements close to the UI code and produces more focused generated types.
        </li>
        <li>
          <strong>Prefer string literal unions over TypeScript enums.</strong> Configure <code>enumsAsTypes: true</code> in your codegen config. String unions tree-shake better, have simpler runtime behavior, and work more naturally with discriminated unions.
        </li>
        <li>
          <strong>Enable strict mode.</strong> Set <code>strictScalars: true</code> to force explicit scalar mappings and <code>avoidOptionals: true</code> to use <code>T | null</code> instead of optional properties. This catches more errors at compile time.
        </li>
        <li>
          <strong>Use typed document nodes.</strong> The <code>typed-document-node</code> plugin generates typed query/mutation objects that work with any GraphQL client, providing type safety without framework-specific plugins.
        </li>
      </ol>

      {/* Section 9 */}
      <h2>GraphQL vs REST Typing Comparison</h2>
      <p>
        Both GraphQL and REST APIs can be consumed with full type safety in TypeScript, but they achieve it through very different mechanisms. Understanding the differences helps you choose the right approach for your project.
      </p>
      <table>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>GraphQL + Codegen</th>
            <th>REST + OpenAPI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Schema source</td>
            <td>GraphQL SDL (built into protocol)</td>
            <td>OpenAPI/Swagger spec (external document)</td>
          </tr>
          <tr>
            <td>Type generation</td>
            <td><code>@graphql-codegen</code></td>
            <td><code>openapi-typescript</code> or <code>swagger-typescript-api</code></td>
          </tr>
          <tr>
            <td>Response shape</td>
            <td>Client-defined (query determines fields)</td>
            <td>Server-defined (fixed per endpoint)</td>
          </tr>
          <tr>
            <td>Type precision</td>
            <td>Exact types per query (no over-fetching)</td>
            <td>Full response type (may include unused fields)</td>
          </tr>
          <tr>
            <td>Enum support</td>
            <td>Native (part of SDL)</td>
            <td>Via OpenAPI enum keyword</td>
          </tr>
          <tr>
            <td>Nullability</td>
            <td>Explicit per-field (<code>!</code> annotation)</td>
            <td>Via <code>required</code> and <code>nullable</code> keywords</td>
          </tr>
          <tr>
            <td>Typed hooks</td>
            <td>Generated per query/mutation</td>
            <td>Manual or via libraries like <code>orval</code></td>
          </tr>
          <tr>
            <td>Schema drift detection</td>
            <td>Compile-time via codegen + tsc</td>
            <td>Compile-time via generated types + tsc</td>
          </tr>
        </tbody>
      </table>
      <p>
        GraphQL has an inherent advantage in type precision because the client specifies exactly which fields it needs, and codegen generates types matching only those fields. REST types always represent the full response object, even when the client only uses a subset.
      </p>
      <p>
        For a deeper comparison of these API paradigms, read our{' '}
        <Link href={`/${lang}/blog/rest-api-best-practices-guide`}>REST API best practices guide</Link>.
      </p>

      {/* Section 10 - FAQ */}
      <h2>Frequently Asked Questions</h2>

      <h3>What is the best tool for GraphQL to TypeScript code generation?</h3>
      <p>
        <code>@graphql-codegen</code> (GraphQL Code Generator) is the most widely adopted solution. It is plugin-based, supports every major GraphQL client (Apollo, urql, React Query), and generates not just types but also typed hooks, document nodes, and resolvers. For quick one-off conversions without toolchain setup, use our{' '}
        <Link href={`/${lang}/tools/graphql-to-typescript`}>online GraphQL to TypeScript converter</Link>.
      </p>

      <h3>How do nullable GraphQL fields map to TypeScript types?</h3>
      <p>
        GraphQL fields are nullable by default (the opposite of TypeScript). A field without <code>!</code> maps to <code>T | null</code> in TypeScript. A field with <code>!</code> maps directly to <code>T</code>. Lists follow the same rules independently for the list itself and its elements. For example, <code>[String!]</code> becomes <code>string[] | null</code> (nullable list, non-nullable items).
      </p>

      <h3>Can I generate TypeScript types from a remote GraphQL endpoint?</h3>
      <p>
        Yes. Most code generators support <strong>introspection</strong>, meaning they query the running GraphQL server for its schema. In your codegen config, set the <code>schema</code> field to your endpoint URL (e.g., <code>http://localhost:4000/graphql</code>). For production APIs, you can also export the schema as an SDL file and use that as the source to avoid requiring a running server during builds.
      </p>

      <h3>Should I commit generated TypeScript files to version control?</h3>
      <p>
        Yes. Committing generated files provides two benefits: (1) pull request diffs clearly show how backend schema changes affect frontend types, and (2) developers can work on frontend code without needing to run the codegen pipeline locally. The key rule is to never manually edit generated files. If you need to extend a type, create a separate file that imports from the generated output.
      </p>

      <h3>What is the difference between graphql-codegen and gql.tada?</h3>
      <p>
        <code>graphql-codegen</code> generates TypeScript files at build time from your schema. <code>gql.tada</code> takes a different approach: it uses TypeScript template literal types to infer types at compile time without generating any files. <code>graphql-codegen</code> has broader ecosystem support and works with any GraphQL client. <code>gql.tada</code> offers zero-config type safety but requires TypeScript 5.0+ and advanced TypeScript understanding. For most teams, <code>graphql-codegen</code> is the safer and more practical choice.
      </p>

      {/* Related Resources */}
      <h2>Related Tools and Guides</h2>
      <ul>
        <li>
          <Link href={`/${lang}/tools/graphql-to-typescript`}>GraphQL to TypeScript Converter</Link> - instant browser-based schema conversion
        </li>
        <li>
          <Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript Converter</Link> - generate interfaces from JSON data
        </li>
        <li>
          <Link href={`/${lang}/tools/json-to-graphql`}>JSON to GraphQL Converter</Link> - create GraphQL schemas from JSON objects
        </li>
        <li>
          <Link href={`/${lang}/blog/typescript-generics-explained`}>TypeScript Generics Explained</Link> - master advanced TypeScript type patterns
        </li>
        <li>
          <Link href={`/${lang}/blog/rest-api-best-practices-guide`}>REST API Best Practices Guide</Link> - comprehensive REST API design patterns
        </li>
      </ul>
    </>
  );
}
