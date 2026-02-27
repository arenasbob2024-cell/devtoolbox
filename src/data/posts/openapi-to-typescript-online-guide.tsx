'use client';
import React from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  OpenAPI to TypeScript Online Guide                                  */
/* ------------------------------------------------------------------ */

export default function OpenApiToTypescriptOnlineGuide({ lang }: { lang: string }) {
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
      tldr: '使用 openapi-typescript (CLI)、@hey-api/openapi-ts (完整 API 客户端) 或 openapi-zod-client (Zod 模式) 从 OpenAPI 规范生成 TypeScript 类型。结合 fetch 或 React Query 实现类型安全的 API 调用。',
      whyTitle: '为什么要从 OpenAPI 生成 TypeScript 类型？',
      takeawaysTitle: '核心要点',
      tryTool: '立即使用免费的 JSON 转 TypeScript 工具 \u2192',
      faqTitle: '常见问题',
    },
    en: {
      tldr: 'Generate TypeScript types from OpenAPI specs using openapi-typescript (CLI), @hey-api/openapi-ts (full API clients), or openapi-zod-client (Zod schemas). Combine with fetch or React Query for type-safe API calls.',
      whyTitle: 'Why Generate TypeScript Types from OpenAPI?',
      takeawaysTitle: 'Key Takeaways',
      tryTool: 'Try our free JSON to TypeScript tool \u2192',
      faqTitle: 'Frequently Asked Questions',
    },
  };

  const t = translations[l] || translations['en'];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: 'What is openapi-typescript?',
      a: 'openapi-typescript is a CLI tool and Node.js library that reads an OpenAPI 3.x (or Swagger 2.0) YAML or JSON specification and outputs TypeScript type definitions. It generates readonly interfaces for request bodies, response bodies, path parameters, query parameters, and headers — all derived from your API schema automatically. Unlike code generators that produce full client code, openapi-typescript produces only types, letting you use them with any HTTP library.',
    },
    {
      q: 'How do I run openapi-typescript?',
      a: 'Install it with npm install -D openapi-typescript typescript, then run: npx openapi-typescript schema.yaml -o src/api/types.ts. It reads YAML or JSON from a local file path or a remote URL (e.g., https://petstore3.swagger.io/api/v3/openapi.json). The output file contains all types under a namespace matching your spec paths. You can also import it programmatically: import openapiTS from "openapi-typescript"; and call it with a URL or parsed schema object.',
    },
    {
      q: 'What is the difference between openapi-typescript and @hey-api/openapi-ts?',
      a: 'openapi-typescript generates only TypeScript type definitions — no runtime code. You use the types manually with fetch or axios. @hey-api/openapi-ts (formerly openapi-ts) generates a full API client: typed functions for every endpoint, typed request/response objects, and optional Zod validation. It is the modern replacement for the older swagger-typescript-api when you want a complete ready-to-use client rather than just types. Choose openapi-typescript for minimal footprint and maximum flexibility; choose @hey-api/openapi-ts when you want a batteries-included client.',
    },
    {
      q: 'How does nullable work in OpenAPI TypeScript generation?',
      a: 'In OpenAPI 3.0, nullable: true on a schema creates a union with null in TypeScript — for example, type: string with nullable: true becomes string | null. In OpenAPI 3.1 (which aligns with JSON Schema), you use type: [string, null] or anyOf: [{type: string}, {type: null}] instead. The required array on an object controls whether a property gets the ? optional modifier. A property that is not in required and has nullable: true becomes string | null | undefined in practice, though openapi-typescript treats absence from required as optional (?) and nullable as | null independently.',
    },
    {
      q: 'How do I use generated types with fetch?',
      a: 'After generating types with npx openapi-typescript schema.yaml -o types.ts, import the paths type and use createFetchClient or manual type assertions. For example: import type { paths } from "./types"; type UserResponse = paths["/users/{id}"]["get"]["responses"]["200"]["content"]["application/json"]; Then annotate your fetch wrapper: async function getUser(id: string): Promise<UserResponse> { const res = await fetch(`/users/${id}`); return res.json(); }. This gives full end-to-end type safety without a generated client.',
    },
    {
      q: 'What is openapi-zod-client?',
      a: 'openapi-zod-client is a tool that generates Zod schemas from an OpenAPI specification instead of plain TypeScript interfaces. This gives you both runtime validation and static TypeScript types from the same source. Run: npx openapi-zod-client ./openapi.yaml -o ./src/api/client.ts. The output includes zodios or plain Zod schema objects you can use to parse API responses at runtime, catching contract violations immediately rather than at the TypeScript compiler level.',
    },
    {
      q: 'How do I keep TypeScript types in sync with the backend?',
      a: 'Add a generate:api script to package.json: {"scripts": {"generate:api": "openapi-typescript https://api.example.com/openapi.json -o src/api/types.ts"}}. Run npm run generate:api whenever the backend API changes. In CI/CD, run this script and commit the diff — or configure the pipeline to fail if the generated file differs from the committed one. Tools like openapi-diff can detect breaking changes between versions. Some teams use a git hook to auto-regenerate before each commit.',
    },
    {
      q: 'Can I generate TypeScript types from a Swagger 2.0 spec?',
      a: 'Yes, openapi-typescript supports Swagger 2.0 (.yaml or .json) though OpenAPI 3.x is strongly recommended for new projects. Swagger 2.0 lacks features like oneOf, anyOf, nullable in the modern sense, and $ref across files is more limited. If you have a Swagger 2.0 spec, consider converting it to OpenAPI 3.0 first using swagger2openapi (npx swagger2openapi swagger.json -o openapi3.json), then generating types from the converted spec for better TypeScript fidelity.',
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
          <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>openapi-typescript</code> generates TypeScript interfaces from OpenAPI 3.x YAML/JSON specs with zero runtime overhead.</li>
          <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>npx openapi-typescript schema.yaml -o types.ts</code> creates a complete type file instantly from a local file or remote URL.</li>
          <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>@hey-api/openapi-ts</code> generates full API clients with typed request/response methods for batteries-included usage.</li>
          <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>openapi-zod-client</code> creates Zod schemas for runtime validation plus TypeScript types from the same OpenAPI source.</li>
          <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>nullable: true</code> in OpenAPI 3.0 becomes <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>T | null</code>; absent from <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>required</code> becomes optional (<code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>?</code>).</li>
          <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>oneOf</code> maps to TypeScript union (<code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>A | B</code>), <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>allOf</code> to intersection (<code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>A &amp; B</code>), <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>anyOf</code> to union.</li>
          <li>Generated types stay in sync with backend — regenerate whenever the API spec changes by running the <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>generate:api</code> script.</li>
        </ul>
      </div>

      {/* ---- Section 1: What is OpenAPI ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        What is OpenAPI/Swagger and Why Generate TypeScript Types?
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        OpenAPI (formerly Swagger) is a language-agnostic specification format for describing RESTful APIs.
        An OpenAPI document — written in YAML or JSON — defines every endpoint, HTTP method, request parameter,
        request body schema, and response body schema for your entire API surface. It is the machine-readable
        contract between your backend and your clients.
      </p>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        When you write TypeScript frontend or backend code that calls a REST API, you face a choice: manually
        write interfaces that mirror the API contract, or auto-generate them from the OpenAPI spec. Manual
        interfaces drift out of sync every time the backend changes. Auto-generated types are always accurate
        because they come directly from the authoritative source.
      </p>
      <p style={{ fontSize: 15, marginBottom: 24 }}>
        The benefits of generating TypeScript from OpenAPI are compelling: compile-time errors when you pass
        the wrong field, autocomplete on every request and response property, refactoring safety across your
        entire codebase, and zero cost to keep types updated — just re-run the generator.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>OpenAPI vs Swagger: What&apos;s the Difference?</h3>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Swagger 2.0 was the original specification. The OpenAPI Initiative standardized it as OpenAPI 3.0 in 2017,
        then OpenAPI 3.1 in 2021 (which is now a proper superset of JSON Schema draft 2020-12). The word
        &quot;Swagger&quot; now typically refers to tooling (Swagger UI, Swagger Editor), while &quot;OpenAPI&quot; refers to the specification.
        Most modern tools target OpenAPI 3.x; Swagger 2.0 is still supported for legacy projects.
      </p>

      {/* ---- Section 2: OpenAPI Spec Basics ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        OpenAPI Specification Basics: YAML/JSON Schema Structure
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        An OpenAPI 3.x document has a predictable top-level structure. Understanding it helps you read
        generated types and troubleshoot codegen issues.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Section</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Purpose</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>TypeScript Impact</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['info', 'API title, version, description', 'None (metadata only)'],
              ['paths', 'All endpoints with methods, params, bodies', 'Main source of request/response types'],
              ['components/schemas', 'Reusable data models ($ref targets)', 'Generates named interfaces'],
              ['components/parameters', 'Reusable query/path/header params', 'Generates param types'],
              ['components/responses', 'Reusable response shapes', 'Generates response types'],
              ['components/securitySchemes', 'Auth methods (Bearer, OAuth, API key)', 'Not directly typed'],
            ].map(([sec, pur, ts], i) => (
              <tr key={sec} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '9px 14px', fontFamily: 'monospace', fontSize: 13 }}>{sec}</td>
                <td style={{ padding: '9px 14px' }}>{pur}</td>
                <td style={{ padding: '9px 14px' }}>{ts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        A minimal OpenAPI 3.0 YAML document defining one GET endpoint looks like this:
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`openapi: "3.0.3"
info:
  title: Users API
  version: "1.0.0"
paths:
  /users/{id}:
    get:
      operationId: getUser
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: A user object
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
components:
  schemas:
    User:
      type: object
      required: [id, name, email]
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
        avatar:
          type: string
          nullable: true`}</pre>

      <p style={{ fontSize: 15, marginBottom: 24 }}>
        From this spec, <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-typescript</code> generates
        a <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>User</code> interface with
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>id</code>,
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>name</code>, and
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>email</code> as required strings,
        and <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>avatar</code> as
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>string | null</code>.
      </p>

      {/* ---- Section 3: openapi-typescript ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        openapi-typescript: The CLI Tool
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-typescript</code> (npm package) is
        the most popular tool for generating TypeScript types from OpenAPI specs. It is maintained by the Drizzle
        team (previously by Drew Powers) and focuses on generating types only — no runtime code, no HTTP client,
        just pure TypeScript interfaces.
      </p>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Install and run:
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`# Install as a dev dependency
npm install -D openapi-typescript typescript

# Generate types from a local YAML file
npx openapi-typescript schema.yaml -o src/api/types.ts

# Generate types from a remote URL
npx openapi-typescript https://api.example.com/openapi.json -o src/api/types.ts

# Use with authentication header
npx openapi-typescript https://api.example.com/openapi.json \\
  --header "Authorization: Bearer \${API_TOKEN}" \\
  -o src/api/types.ts`}</pre>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The output file uses a <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>paths</code> namespace
        that mirrors your API routes, plus a <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>components</code> namespace
        for reusable schemas. Here is what the generated output looks like for the Users API above:
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`// Auto-generated by openapi-typescript — do not edit manually
export interface paths {
  "/users/{id}": {
    get: operations["getUser"];
  };
}

export interface operations {
  getUser: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
    };
  };
}

export interface components {
  schemas: {
    User: {
      id: string;
      name: string;
      email: string;
      avatar: string | null;
    };
  };
}`}</pre>

      <p style={{ fontSize: 15, marginBottom: 24 }}>
        You can then use these types directly. The <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-fetch</code> companion
        library (from the same maintainer) provides a tiny typed fetch wrapper that consumes the
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>paths</code> type automatically.
      </p>

      {/* ---- Section 4: @hey-api/openapi-ts ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        @hey-api/openapi-ts: Modern Full API Client Generator
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>@hey-api/openapi-ts</code> is the modern
        successor to the older <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-typescript-codegen</code> package.
        Unlike <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-typescript</code>, it generates
        a full client: typed service functions, models, and optionally Zod validators.
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`# Install
npm install -D @hey-api/openapi-ts @hey-api/client-fetch

# Generate client
npx @hey-api/openapi-ts \\
  --input https://api.example.com/openapi.json \\
  --output src/api \\
  --client @hey-api/client-fetch`}</pre>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The generated output includes:
      </p>
      <ul style={{ fontSize: 15, paddingLeft: 24, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>src/api/models.ts</code> — TypeScript interfaces for all schemas</li>
        <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>src/api/services.gen.ts</code> — Typed async functions for every operation</li>
        <li><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>src/api/types.gen.ts</code> — Request/response type helpers</li>
      </ul>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Usage after generation:
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`import { UsersService } from './api/services.gen';
import { client } from '@hey-api/client-fetch';

// Configure once
client.setConfig({ baseUrl: 'https://api.example.com' });

// Fully typed call — no manual type annotations needed
const { data, error } = await UsersService.getUser({ path: { id: '123' } });
// data is typed as User | undefined
// error is typed as ApiError | undefined`}</pre>

      <p style={{ fontSize: 15, marginBottom: 24 }}>
        The key difference from <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-typescript</code>:
        you get ready-to-call functions rather than just types to annotate your own fetch calls. The trade-off
        is more generated code and tighter coupling to the generator&apos;s HTTP client.
      </p>

      {/* ---- Section 5: swagger-typescript-api ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        swagger-typescript-api: Template-Based Generator
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>swagger-typescript-api</code> is another
        popular code generator that uses ETA templates to produce customizable TypeScript API clients. It supports
        Swagger 2.0 and OpenAPI 3.x, and generates both types and an HTTP client class.
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`npm install -D swagger-typescript-api

npx swagger-typescript-api \\
  -p https://petstore3.swagger.io/api/v3/openapi.json \\
  -o ./src/api \\
  -n myApi.ts \\
  --axios`}</pre>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>--axios</code> flag generates an Axios-based
        client instead of the built-in fetch client. You can also supply custom ETA templates via
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>--templates ./templates</code> to completely
        control the output shape — useful when your team has strong opinions about client structure.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Tool</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Output</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Runtime Code</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['openapi-typescript', 'Types only', 'No', 'Maximum flexibility, use any HTTP lib'],
              ['@hey-api/openapi-ts', 'Types + client', 'Yes', 'Batteries-included, opinionated projects'],
              ['swagger-typescript-api', 'Types + client', 'Yes', 'Custom templates, Axios projects'],
              ['openapi-zod-client', 'Zod schemas + types', 'Yes', 'Runtime validation + compile-time safety'],
            ].map(([tool, out, rt, best], i) => (
              <tr key={tool} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '9px 14px', fontFamily: 'monospace', fontSize: 13 }}>{tool}</td>
                <td style={{ padding: '9px 14px' }}>{out}</td>
                <td style={{ padding: '9px 14px' }}>{rt}</td>
                <td style={{ padding: '9px 14px' }}>{best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Section 6: openapi-zod-client ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Zod Schema Generation from OpenAPI: openapi-zod-client
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        TypeScript types are erased at runtime. If you want to validate that an API response actually matches
        your schema — not just at compile time, but when the bytes arrive — you need runtime validation.
        Zod is the most popular TypeScript-first validation library, and <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-zod-client</code> bridges
        OpenAPI to Zod automatically.
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`npm install -D openapi-zod-client

npx openapi-zod-client ./openapi.yaml -o ./src/api/client.ts`}</pre>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The generated file uses <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>zodios</code> or
        plain Zod schemas depending on configuration. A generated schema for the User model looks like:
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`import { z } from 'zod';

// Auto-generated — do not edit
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

// Use in your fetch function:
async function getUser(id: string): Promise<User> {
  const res = await fetch(\`/users/\${id}\`);
  const data = await res.json();
  return UserSchema.parse(data); // throws if API response doesn't match
}`}</pre>

      <p style={{ fontSize: 15, marginBottom: 24 }}>
        The advantage: if the backend starts returning an unexpected field or changes a type, your application
        throws a clear validation error immediately rather than silently passing bad data deeper into your UI.
      </p>

      {/* ---- Section 7: Using generated types with fetch ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Using Generated Types in Fetch Calls
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The most lightweight approach is using <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-typescript</code> for
        types and <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-fetch</code> as a tiny typed wrapper
        around the native Fetch API. This keeps your bundle small while giving full type safety.
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`// 1. Generate types
// npx openapi-typescript schema.yaml -o src/api/types.ts

// 2. Install openapi-fetch
// npm install openapi-fetch

// 3. Create a typed client
import createClient from 'openapi-fetch';
import type { paths } from './types';

const api = createClient<paths>({ baseUrl: 'https://api.example.com' });

// 4. Make typed requests
async function loadUser(userId: string) {
  const { data, error } = await api.GET('/users/{id}', {
    params: { path: { id: userId } },
  });

  if (error) {
    console.error('API error:', error);
    return null;
  }

  // data is fully typed as the response body
  console.log(data.name, data.email); // TypeScript knows these exist
  return data;
}

// Typed POST with request body
async function createUser(payload: { name: string; email: string }) {
  const { data, error } = await api.POST('/users', {
    body: payload, // TypeScript checks this against the request body schema
  });
  return { data, error };
}`}</pre>

      <p style={{ fontSize: 15, marginBottom: 24 }}>
        If you prefer not to use <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-fetch</code>,
        you can extract types manually using TypeScript utility types against the generated
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>paths</code> interface.
      </p>

      {/* ---- Section 8: React Query ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        React Query with Generated API Types
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        TanStack Query (React Query) is the standard for data fetching in React applications. Combining it with
        OpenAPI-generated types gives you type-safe queries with automatic caching, background refetching, and
        loading/error states.
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import type { paths, components } from './api/types';

const api = createClient<paths>({ baseUrl: '/api' });

// Typed response extracted from generated types
type User = components['schemas']['User'];

// Custom hook with full type safety
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: async (): Promise<User> => {
      const { data, error } = await api.GET('/users/{id}', {
        params: { path: { id: userId } },
      });
      if (error) throw new Error('Failed to fetch user');
      return data;
    },
  });
}

// Usage in a component
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error || !user) return <div>Error loading user</div>;

  // user.name, user.email are fully typed
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Typed mutation
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { name: string; email: string }) => {
      const { data, error } = await api.POST('/users', { body: payload });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}`}</pre>

      {/* ---- Section 9: nullable and optional ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Handling nullable and optional in OpenAPI 3.x
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        One of the most common sources of confusion when generating TypeScript from OpenAPI is the distinction
        between nullable and optional. They are different concepts that map to different TypeScript syntax.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>OpenAPI 3.0 / 3.1</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Meaning</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>TypeScript Output</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['type: string (in required)', 'Required, cannot be null', 'name: string'],
              ['type: string (not in required)', 'Optional, can be absent', 'name?: string'],
              ['type: string, nullable: true (3.0)', 'Required but can be null', 'name: string | null'],
              ['type: [string, null] (3.1)', 'Required but can be null', 'name: string | null'],
              ['type: string, nullable: true (not in required)', 'Optional and can be null', 'name?: string | null'],
            ].map(([oapi, meaning, ts], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '9px 14px', fontFamily: 'monospace', fontSize: 12 }}>{oapi}</td>
                <td style={{ padding: '9px 14px' }}>{meaning}</td>
                <td style={{ padding: '9px 14px', fontFamily: 'monospace', fontSize: 13 }}>{ts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        In OpenAPI 3.1, the <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>nullable</code> keyword
        is deprecated in favor of JSON Schema&apos;s <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>type: [string, null]</code> array
        syntax. <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-typescript</code> handles both
        styles and generates the correct <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>T | null</code> union.
      </p>

      {/* ---- Section 10: oneOf anyOf allOf ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        oneOf, anyOf, allOf in TypeScript
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        OpenAPI&apos;s composition keywords map directly to TypeScript&apos;s type algebra:
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`# OpenAPI YAML
components:
  schemas:
    # oneOf: exactly one of these schemas must match
    # → TypeScript union: Cat | Dog
    Pet:
      oneOf:
        - $ref: '#/components/schemas/Cat'
        - $ref: '#/components/schemas/Dog'

    # allOf: must satisfy ALL schemas (composition/inheritance)
    # → TypeScript intersection: BaseEntity & UserDetails
    FullUser:
      allOf:
        - $ref: '#/components/schemas/BaseEntity'
        - $ref: '#/components/schemas/UserDetails'

    # anyOf: must satisfy one or more schemas
    # → TypeScript union (same as oneOf in TS, no runtime difference)
    StringOrNumber:
      anyOf:
        - type: string
        - type: number`}</pre>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The generated TypeScript:
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`// oneOf → union
export type Pet = Cat | Dog;

// allOf → intersection
export type FullUser = BaseEntity & UserDetails;

// anyOf → union
export type StringOrNumber = string | number;`}</pre>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        For <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>oneOf</code> with a
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>discriminator</code>, the generator
        can produce discriminated unions — TypeScript&apos;s most powerful way to narrow union types:
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`# OpenAPI with discriminator
Event:
  oneOf:
    - $ref: '#/components/schemas/ClickEvent'
    - $ref: '#/components/schemas/KeyEvent'
  discriminator:
    propertyName: type

ClickEvent:
  type: object
  required: [type, x, y]
  properties:
    type:
      type: string
      enum: [click]
    x: { type: number }
    y: { type: number }

KeyEvent:
  type: object
  required: [type, key]
  properties:
    type:
      type: string
      enum: [key]
    key: { type: string }

# Generated TypeScript → discriminated union
type ClickEvent = { type: 'click'; x: number; y: number };
type KeyEvent = { type: 'key'; key: string };
type Event = ClickEvent | KeyEvent;

// TypeScript narrows automatically:
function handleEvent(event: Event) {
  if (event.type === 'click') {
    console.log(event.x, event.y); // OK — x, y exist
  } else {
    console.log(event.key);         // OK — key exists
  }
}`}</pre>

      {/* ---- Section 11: Enums ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Enums and const Values from OpenAPI
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        OpenAPI supports two ways to express constrained string values: <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>enum</code> arrays
        and <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>const</code> (single value).
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-typescript</code> converts them to TypeScript literal union types rather than
        TypeScript enums — a deliberate choice because TypeScript enums have some quirks at runtime.
      </p>
      <pre style={{
        background: '#1e293b', color: '#e2e8f0', borderRadius: 8,
        padding: '18px 20px', overflowX: 'auto', fontSize: 13,
        lineHeight: 1.6, marginBottom: 24,
      }}>{`# OpenAPI YAML
UserStatus:
  type: string
  enum: [active, inactive, suspended]

Priority:
  type: string
  const: high

# Generated TypeScript
type UserStatus = 'active' | 'inactive' | 'suspended';
type Priority = 'high';`}</pre>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        If you prefer TypeScript enums (e.g., for reverse lookup), most generators support an
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>--enum</code> flag. However, literal union types
        are generally preferred in modern TypeScript because they are simpler, produce no runtime code, and
        work perfectly with discriminated unions.
      </p>

      {/* ---- Section 12: Validation ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Validation at Runtime vs Compile-Time
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        TypeScript&apos;s type system operates at compile time only. Once your code is compiled to JavaScript and
        runs in a browser or Node.js, all type information is erased. This means:
      </p>
      <ul style={{ fontSize: 15, paddingLeft: 24, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li>An API returning <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>{"{ age: \"twenty\" }"}</code> instead of <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>{"{ age: 20 }"}</code> will not cause a TypeScript error at runtime</li>
        <li>Only Zod (or similar) validation actually checks the data shape at runtime</li>
        <li>openapi-typescript alone is compile-time only; openapi-zod-client adds runtime safety</li>
      </ul>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Approach</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Compile-Time Check</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Runtime Check</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Bundle Size</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['openapi-typescript + fetch', 'Yes', 'No', 'Minimal'],
              ['openapi-typescript + openapi-fetch', 'Yes', 'No', 'Tiny (~2KB)'],
              ['openapi-zod-client', 'Yes', 'Yes', 'Zod (~12KB)'],
              ['@hey-api/openapi-ts', 'Yes', 'Optional', 'Medium'],
            ].map(([approach, ct, rt, bs], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '9px 14px', fontFamily: 'monospace', fontSize: 12 }}>{approach}</td>
                <td style={{ padding: '9px 14px' }}>{ct}</td>
                <td style={{ padding: '9px 14px' }}>{rt}</td>
                <td style={{ padding: '9px 14px' }}>{bs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 15, marginBottom: 24 }}>
        For public-facing APIs where you control the schema, compile-time types alone are usually sufficient.
        For third-party APIs or any case where you want to catch contract violations immediately,
        add Zod runtime validation via <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>openapi-zod-client</code>.
      </p>

      {/* ---- Section 13: Tools ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Online Tools for JSON and TypeScript
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        When you have a JSON sample of an API response and want to quickly prototype TypeScript types without
        a full OpenAPI spec, an online converter is the fastest option. DevToolBox offers a free
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          {' '}JSON to TypeScript converter
        </Link>{' '}
        that instantly generates TypeScript interfaces from any JSON object or array — useful for:
      </p>
      <ul style={{ fontSize: 15, paddingLeft: 24, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li>Bootstrapping types from a real API response before writing an OpenAPI spec</li>
        <li>Quick prototyping when you only have sample JSON, not a formal schema</li>
        <li>Validating what your generated OpenAPI types should look like</li>
        <li>Teaching TypeScript shapes interactively</li>
      </ul>
      <p style={{ fontSize: 15, marginBottom: 24 }}>
        The workflow: paste a JSON response sample into the tool, copy the generated interfaces, then refine
        them by adding your OpenAPI spec constraints (nullable, optional, enums) by hand. This is much faster
        than writing interfaces from scratch.
      </p>

      {/* ---- Section 14: Common Pitfalls ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Common Pitfalls in OpenAPI TypeScript Generation
      </h2>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>1. allOf Merging Doesn&apos;t Work Like Expected</h3>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        When you use <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>allOf</code> to combine schemas,
        the generated TypeScript intersection type (<code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>A &amp; B</code>) is
        structurally different from what you might expect. If both <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>A</code> and
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>B</code> have a property with the same name but
        different types, TypeScript will create an intersection of those types — which may be <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>never</code> if they
        are incompatible. Always ensure shared property names have compatible types in your allOf schemas.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>2. Discriminated Unions Need a Discriminator</h3>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Without a <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>discriminator</code> in your OpenAPI spec,
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>oneOf</code> generates a plain union type that TypeScript
        cannot narrow automatically. Add a <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>discriminator.propertyName</code> pointing
        to a field (usually <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>type</code>) that has a unique
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>enum</code> value in each variant schema.
        This lets TypeScript narrow in <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>if/switch</code> statements.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>3. Nullable vs Optional Confusion</h3>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        A frequent mistake is using <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>nullable: true</code> when
        you mean &quot;this field might not be present in the response&quot;. In OpenAPI,
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>nullable</code> only means the field&apos;s value
        can be <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>null</code> when present. To make a field
        absent-able, omit it from the <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>required</code> array.
        The two are independent and you may need both.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>4. Missing $ref Resolution</h3>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        If your spec uses <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>$ref</code> pointing to external files
        (e.g., <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>./schemas/user.yaml</code>), the generator
        must be run from the correct directory and must have access to those files. Remote
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>$ref</code> URLs also need network access. If generation fails
        with &quot;could not resolve $ref&quot;, check file paths and network access. You can use
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>swagger-cli bundle</code> to flatten all
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>$ref</code>s into a single file first.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>5. Stale Generated Types</h3>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Generated type files must be regenerated whenever the API spec changes. Forgetting to regenerate is
        the number one pitfall — you get false compile-time confidence while your actual API contract has changed.
        Automate regeneration in CI by running the generator and checking for diff. Consider treating the generated
        file as an artifact of the build, not a committed file, to prevent this.
      </p>

      {/* ---- Try Tool CTA ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '20px 24px',
        marginTop: 48,
        marginBottom: 40,
        textAlign: 'center' as const,
      }}>
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, marginTop: 0 }}>
          Need to generate TypeScript types from JSON?
        </p>
        <p style={{ fontSize: 15, marginBottom: 16, marginTop: 0 }}>
          Use our free online JSON to TypeScript converter — paste any JSON object or array and get TypeScript interfaces instantly.
        </p>
        <Link href={toolLink} style={{
          display: 'inline-block',
          background: '#2563eb',
          color: '#fff',
          fontWeight: 700,
          fontSize: 15,
          padding: '10px 24px',
          borderRadius: 6,
          textDecoration: 'none',
        }}>
          Try JSON to TypeScript Tool \u2192
        </Link>
      </div>

      {/* ---- FAQ Section ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 24 }}>{t.faqTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {faqItems.map((item, idx) => (
          <div key={idx} style={{
            borderLeft: '3px solid #bae6fd',
            paddingLeft: 16,
          }}>
            <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, marginTop: 0 }}>
              Q: {item.q}
            </p>
            <p style={{ fontSize: 15, marginBottom: 0, marginTop: 0, color: '#374151' }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
