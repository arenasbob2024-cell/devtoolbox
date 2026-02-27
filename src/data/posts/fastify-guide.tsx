'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Fastify: High-Performance Node.js Web Framework — Complete Guide',
    description: 'Complete guide to Fastify — the high-performance Node.js web framework. Learn routing, schema validation, plugins, hooks, serialization, logging with Pino, TypeScript, JWT auth, database integration, testing, and deployment.',
  },
  zh: {
    title: 'Fastify：高性能 Node.js Web 框架完全指南',
    description: '全面了解 Fastify — 高性能 Node.js Web 框架。涵盖路由、JSON Schema 验证、插件、钩子、序列化、Pino 日志、TypeScript、JWT 认证、数据库集成、测试与部署。',
  },
};

export default function FastifyGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Fastify and why is it faster than Express?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fastify is a high-performance Node.js web framework that achieves up to 2-3x the throughput of Express. Its speed comes from schema-based serialization using fast-json-stringify, a highly optimized radix-tree router (find-my-way), minimal overhead in the request/reply lifecycle, and built-in support for JSON Schema validation that doubles as documentation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Fastify handle request validation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fastify uses JSON Schema for request validation. You define schemas for body, querystring, params, and headers in your route options. Fastify compiles these schemas at startup using Ajv, so validation is extremely fast at runtime. Invalid requests automatically receive a 400 response with detailed error messages.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Fastify plugin system and how does encapsulation work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fastify plugins are the primary way to extend functionality. Every plugin creates an encapsulated context, meaning decorators, hooks, and routes registered inside a plugin are isolated from siblings but inherited by children. Use fastify-plugin to break encapsulation when you need to share decorators globally. This design prevents naming collisions and makes large applications maintainable.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Fastify hooks work and what lifecycle events are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fastify hooks let you intercept the request/reply lifecycle at specific points. Key hooks include onRequest (runs first, good for auth checks), preParsing (before body parsing), preValidation (before schema validation), preHandler (after validation, before handler), preSerialization (before response serialization), and onSend (before sending the response). Hooks can be synchronous or async.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Fastify support TypeScript natively?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Fastify has excellent TypeScript support with built-in type definitions. You can type routes using generics on FastifyRequest and FastifyReply, define typed route schemas with the Type Provider pattern (e.g., @fastify/type-provider-typebox or @fastify/type-provider-json-schema-to-ts), and get full autocompletion for decorators, plugins, and hooks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Fastify compare to Express in performance benchmarks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In typical benchmarks, Fastify handles 50,000-78,000 requests per second on Node.js while Express handles 15,000-30,000. Fastify achieves this through schema-based serialization (fast-json-stringify avoids JSON.stringify), a radix-tree router instead of regex matching, lower per-request overhead, and compile-time optimizations for validators and serializers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you test Fastify applications?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fastify provides a built-in inject() method for testing without starting a real HTTP server. Call fastify.inject({ method, url, payload, headers }) and it returns a response object with statusCode, headers, and body. This is faster and more reliable than supertest. Combined with tap or vitest, you can write comprehensive integration tests easily.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you deploy Fastify to production?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For production deployment, bind Fastify to 0.0.0.0 (not localhost), use a process manager like PM2 or systemd, set NODE_ENV=production, enable structured JSON logging with Pino, use a reverse proxy (Nginx/Caddy) for SSL termination, set appropriate trust proxy options, implement graceful shutdown with fastify.close(), and consider clustering with Node.js cluster module for multi-core utilization.',
        },
      },
    ],
  };

  const cs = {
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    padding: '1rem',
    borderRadius: '0.5rem',
    overflowX: 'auto' as const,
    fontSize: '0.875rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  };
  const h2s = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#0f172a' };
  const h3s = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' };
  const ps = { marginBottom: '1rem', lineHeight: '1.75' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.25rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: '1.7' }}>
          Fastify is a high-performance Node.js web framework that delivers 2-3x the throughput of Express. It features schema-based validation and serialization via JSON Schema, an encapsulated plugin system, lifecycle hooks, built-in Pino logging, and first-class TypeScript support. This guide covers everything from installation and routing to authentication, database integration, testing, and production deployment.
        </p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', marginBottom: '2rem', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#334155' }}>Key Takeaways</p>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Fastify handles 50K-78K req/s on Node.js, 2-3x faster than Express, thanks to schema-based serialization.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>JSON Schema validation on request body, querystring, params, and headers is compiled at startup for near-zero runtime cost.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>The encapsulated plugin system prevents naming collisions and enables clean, modular architecture.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Lifecycle hooks (onRequest, preHandler, preSerialization, onSend) give fine-grained control over every request.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Built-in Pino logger produces structured JSON logs with minimal performance overhead.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>First-class TypeScript support with type providers for full route type inference from schemas.</li>
        </ul>
      </div>

      {/* 1. What is Fastify */}
      <h2 style={h2s}>1. What Is Fastify?</h2>
      <p style={ps}>
        Fastify is an open-source, high-performance web framework for Node.js created by Matteo Collina and Tomas Della Vedova in 2016. It is built on a radix-tree router (<strong>find-my-way</strong>) and leverages <strong>fast-json-stringify</strong> for response serialization that outperforms native JSON.stringify. Unlike Express, Fastify embraces a schema-first approach: define JSON Schemas for routes and get both validation (via Ajv) and fast serialization automatically. The plugin architecture ensures clean separation of concerns with encapsulated contexts.
      </p>

      {/* 2. Installation and Project Setup */}
      <h2 style={h2s}>2. Installation and Project Setup</h2>
      <p style={ps}>
        Getting started with Fastify is straightforward. You can create a new project manually or use the Fastify CLI to scaffold a complete application with sensible defaults.
      </p>
      <h3 style={h3s}>Manual Setup</h3>
      <pre style={cs}><code>{'# Create project directory\n' +
        'mkdir my-fastify-app && cd my-fastify-app\n' +
        'npm init -y\n' +
        '\n' +
        '# Install Fastify\n' +
        'npm install fastify\n' +
        '\n' +
        '# For TypeScript projects\n' +
        'npm install typescript @types/node tsx -D\n' +
        'npx tsc --init'}</code></pre>

      <h3 style={h3s}>Using Fastify CLI</h3>
      <pre style={cs}><code>{'# Generate a new Fastify project\n' +
        'npm install -g fastify-cli\n' +
        'fastify generate my-app --lang=ts\n' +
        'cd my-app && npm install && npm run dev\n' +
        '\n' +
        '# Structure: src/app.ts, src/plugins/, src/routes/, test/'}</code></pre>

      <h3 style={h3s}>Minimal Server</h3>
      <pre style={cs}><code>{'import Fastify from \'fastify\'\n' +
        '\n' +
        'const fastify = Fastify({\n' +
        '  logger: true  // Enable Pino logging\n' +
        '})\n' +
        '\n' +
        'fastify.get(\'/\', async (request, reply) => {\n' +
        '  return { hello: \'world\' }\n' +
        '})\n' +
        '\n' +
        'const start = async () => {\n' +
        '  try {\n' +
        '    await fastify.listen({ port: 3000, host: \'0.0.0.0\' })\n' +
        '  } catch (err) {\n' +
        '    fastify.log.error(err)\n' +
        '    process.exit(1)\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'start()'}</code></pre>

      {/* 3. Routing */}
      <h2 style={h2s}>3. Routing (GET, POST, PUT, DELETE)</h2>
      <p style={ps}>
        Fastify uses a highly optimized radix-tree router called <strong>find-my-way</strong>. Unlike Express regex-based routing, this provides O(1)-like lookup performance regardless of how many routes you register.
      </p>
      <h3 style={h3s}>Basic CRUD Routes</h3>
      <pre style={cs}><code>{'import Fastify from \'fastify\'\n' +
        'const app = Fastify({ logger: true })\n' +
        '\n' +
        '// GET — List all users\n' +
        'app.get(\'/api/users\', async (request, reply) => {\n' +
        '  const users = await db.findAllUsers()\n' +
        '  return users\n' +
        '})\n' +
        '\n' +
        '// GET — Single user by ID\n' +
        'app.get(\'/api/users/:id\', async (request, reply) => {\n' +
        '  const { id } = request.params as { id: string }\n' +
        '  const user = await db.findUser(id)\n' +
        '  if (!user) {\n' +
        '    reply.code(404)\n' +
        '    return { error: \'User not found\' }\n' +
        '  }\n' +
        '  return user\n' +
        '})\n' +
        '\n' +
        '// POST — Create user\n' +
        'app.post(\'/api/users\', async (request, reply) => {\n' +
        '  const body = request.body as { name: string; email: string }\n' +
        '  const user = await db.createUser(body)\n' +
        '  reply.code(201)\n' +
        '  return user\n' +
        '})\n' +
        '\n' +
        '// PUT — Update user\n' +
        'app.put(\'/api/users/:id\', async (request, reply) => {\n' +
        '  const { id } = request.params as { id: string }\n' +
        '  const body = request.body as { name?: string; email?: string }\n' +
        '  const user = await db.updateUser(id, body)\n' +
        '  return user\n' +
        '})\n' +
        '\n' +
        '// DELETE — Remove user\n' +
        'app.delete(\'/api/users/:id\', async (request, reply) => {\n' +
        '  const { id } = request.params as { id: string }\n' +
        '  await db.deleteUser(id)\n' +
        '  reply.code(204)\n' +
        '  return\n' +
        '})'}</code></pre>

      <h3 style={h3s}>Route Options Object</h3>
      <pre style={cs}><code>{'app.route({\n' +
        '  method: \'GET\',\n' +
        '  url: \'/api/items/:id\',\n' +
        '  schema: {\n' +
        '    params: {\n' +
        '      type: \'object\',\n' +
        '      properties: { id: { type: \'string\', pattern: \'^[0-9a-f]{24}$\' } },\n' +
        '      required: [\'id\']\n' +
        '    },\n' +
        '    response: {\n' +
        '      200: {\n' +
        '        type: \'object\',\n' +
        '        properties: { id: { type: \'string\' }, name: { type: \'string\' }, price: { type: \'number\' } }\n' +
        '      }\n' +
        '    }\n' +
        '  },\n' +
        '  handler: async (request) => {\n' +
        '    const { id } = request.params as { id: string }\n' +
        '    return db.findItem(id)\n' +
        '  }\n' +
        '})'}</code></pre>

      {/* 4. Request/Reply Lifecycle */}
      <h2 style={h2s}>4. Request/Reply Lifecycle</h2>
      <p style={ps}>
        Understanding the Fastify lifecycle is essential for building robust applications. Every incoming request flows through a well-defined sequence of stages. This gives you precise control over when to authenticate, validate, transform, or log data.
      </p>
      <pre style={cs}><code>{'// Fastify Request Lifecycle (in order):\n' +
        '//\n' +
        '// Incoming Request\n' +
        '//   └─> onRequest hooks\n' +
        '//       └─> preParsing hooks\n' +
        '//           └─> Body Parsing\n' +
        '//               └─> preValidation hooks\n' +
        '//                   └─> Schema Validation\n' +
        '//                       └─> preHandler hooks\n' +
        '//                           └─> Route Handler\n' +
        '//                               └─> preSerialization hooks\n' +
        '//                                   └─> Response Serialization\n' +
        '//                                       └─> onSend hooks\n' +
        '//                                           └─> Response Sent\n' +
        '//                                               └─> onResponse hooks'}</code></pre>
      <p style={ps}>
        The <strong>request</strong> object provides access to headers, query parameters, body, params, IP address, and the underlying raw Node.js request. The <strong>reply</strong> object provides methods for setting status codes, headers, and sending responses. Fastify automatically serializes objects as JSON using fast-json-stringify when a response schema is provided.
      </p>

      {/* 5. Schema Validation */}
      <h2 style={h2s}>5. Schema Validation with JSON Schema</h2>
      <p style={ps}>
        One of Fastify's killer features is built-in schema validation. Define JSON Schemas for body, querystring, params, and headers. Fastify compiles these schemas at startup using Ajv (Another JSON Validator), so validation at runtime is extremely fast. Invalid requests automatically receive a 400 response.
      </p>
      <pre style={cs}><code>{'const createUserSchema = {\n' +
        '  body: {\n' +
        '    type: \'object\',\n' +
        '    required: [\'name\', \'email\', \'password\'],\n' +
        '    properties: {\n' +
        '      name: { type: \'string\', minLength: 2, maxLength: 100 },\n' +
        '      email: { type: \'string\', format: \'email\' },\n' +
        '      password: { type: \'string\', minLength: 8 },\n' +
        '      age: { type: \'integer\', minimum: 0, maximum: 150 }\n' +
        '    },\n' +
        '    additionalProperties: false\n' +
        '  },\n' +
        '  response: {\n' +
        '    201: {\n' +
        '      type: \'object\',\n' +
        '      properties: {\n' +
        '        id: { type: \'string\' },\n' +
        '        name: { type: \'string\' },\n' +
        '        email: { type: \'string\' }\n' +
        '      }\n' +
        '    },\n' +
        '    400: {\n' +
        '      type: \'object\',\n' +
        '      properties: {\n' +
        '        statusCode: { type: \'integer\' },\n' +
        '        error: { type: \'string\' },\n' +
        '        message: { type: \'string\' }\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'app.post(\'/api/users\', { schema: createUserSchema }, async (request, reply) => {\n' +
        '  // request.body is already validated here\n' +
        '  const { name, email, password } = request.body as any\n' +
        '  const user = await createUser({ name, email, password })\n' +
        '  reply.code(201)\n' +
        '  return user\n' +
        '})\n' +
        '\n' +
        '// Querystring validation\n' +
        'app.get(\'/api/users\', {\n' +
        '  schema: {\n' +
        '    querystring: {\n' +
        '      type: \'object\',\n' +
        '      properties: {\n' +
        '        page: { type: \'integer\', minimum: 1, default: 1 },\n' +
        '        limit: { type: \'integer\', minimum: 1, maximum: 100, default: 20 },\n' +
        '        search: { type: \'string\' }\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '}, async (request) => {\n' +
        '  const { page, limit, search } = request.query as any\n' +
        '  return db.findUsers({ page, limit, search })\n' +
        '})'}</code></pre>

      {/* 6. Plugins and Decorators */}
      <h2 style={h2s}>6. Plugins and Decorators</h2>
      <p style={ps}>
        Plugins are the backbone of Fastify application architecture. Everything in Fastify is a plugin: routes, hooks, decorators, and even other plugins. This design promotes modularity and enables clean code organization. Fastify uses <strong>avvio</strong> for asynchronous plugin loading with proper dependency resolution.
      </p>
      <h3 style={h3s}>Creating Plugins</h3>
      <pre style={cs}><code>{'import fp from \'fastify-plugin\'\n' +
        'import { FastifyInstance } from \'fastify\'\n' +
        '\n' +
        '// Encapsulated plugin (default) — decorators stay inside\n' +
        'async function userRoutes(fastify: FastifyInstance) {\n' +
        '  fastify.get(\'/users\', async () => {\n' +
        '    return fastify.db.findAll(\'users\')\n' +
        '  })\n' +
        '\n' +
        '  fastify.post(\'/users\', async (req) => {\n' +
        '    return fastify.db.create(\'users\', req.body)\n' +
        '  })\n' +
        '}\n' +
        '\n' +
        '// Shared plugin (breaks encapsulation) — decorators visible globally\n' +
        'const dbPlugin = fp(async function (fastify: FastifyInstance, opts) {\n' +
        '  const connection = await createDbConnection(opts.uri)\n' +
        '  fastify.decorate(\'db\', connection)\n' +
        '\n' +
        '  fastify.addHook(\'onClose\', async () => {\n' +
        '    await connection.close()\n' +
        '  })\n' +
        '}, { name: \'db-plugin\' })\n' +
        '\n' +
        '// Register plugins\n' +
        'app.register(dbPlugin, { uri: \'postgres://localhost/mydb\' })\n' +
        'app.register(userRoutes, { prefix: \'/api\' })'}</code></pre>

      <h3 style={h3s}>Decorators</h3>
      <pre style={cs}><code>{'// Decorate the Fastify instance\n' +
        'fastify.decorate(\'config\', {\n' +
        '  jwtSecret: process.env.JWT_SECRET,\n' +
        '  dbUrl: process.env.DATABASE_URL\n' +
        '})\n' +
        '\n' +
        '// Decorate the request object\n' +
        'fastify.decorateRequest(\'user\', null)\n' +
        '\n' +
        '// Decorate the reply object\n' +
        'fastify.decorateReply(\'sendSuccess\', function (data: unknown) {\n' +
        '  return this.code(200).send({ success: true, data })\n' +
        '})\n' +
        '\n' +
        '// Use decorators in routes\n' +
        'fastify.get(\'/me\', async (request, reply) => {\n' +
        '  return reply.sendSuccess(request.user)\n' +
        '})'}</code></pre>

      {/* 7. Hooks */}
      <h2 style={h2s}>7. Hooks (onRequest, preHandler, onSend)</h2>
      <p style={ps}>
        Hooks let you intercept the request/reply lifecycle at specific points. They are essential for cross-cutting concerns like authentication, logging, rate limiting, and response transformation. Hooks follow encapsulation rules just like plugins.
      </p>
      <pre style={cs}><code>{'// onRequest — Runs first, before body parsing\n' +
        '// Great for authentication, rate limiting\n' +
        'fastify.addHook(\'onRequest\', async (request, reply) => {\n' +
        '  request.startTime = Date.now()\n' +
        '  fastify.log.info(\'Request started: \' + request.method + \' \' + request.url)\n' +
        '})\n' +
        '\n' +
        '// preHandler — After validation, before route handler\n' +
        '// Great for authorization, data enrichment\n' +
        'fastify.addHook(\'preHandler\', async (request, reply) => {\n' +
        '  if (request.routeOptions.config.requireAuth) {\n' +
        '    const token = request.headers.authorization\n' +
        '    if (!token) {\n' +
        '      reply.code(401).send({ error: \'Unauthorized\' })\n' +
        '      return\n' +
        '    }\n' +
        '    request.user = await verifyToken(token)\n' +
        '  }\n' +
        '})\n' +
        '\n' +
        '// preSerialization — Transform payload before serialization\n' +
        'fastify.addHook(\'preSerialization\', async (request, reply, payload) => {\n' +
        '  return {\n' +
        '    data: payload,\n' +
        '    timestamp: new Date().toISOString()\n' +
        '  }\n' +
        '})\n' +
        '\n' +
        '// onSend — Modify the serialized response before sending\n' +
        'fastify.addHook(\'onSend\', async (request, reply, payload) => {\n' +
        '  reply.header(\'X-Response-Time\',\n' +
        '    String(Date.now() - (request as any).startTime) + \'ms\'\n' +
        '  )\n' +
        '  return payload\n' +
        '})\n' +
        '\n' +
        '// onResponse — After response is sent (logging, metrics)\n' +
        'fastify.addHook(\'onResponse\', async (request, reply) => {\n' +
        '  fastify.log.info({\n' +
        '    method: request.method,\n' +
        '    url: request.url,\n' +
        '    statusCode: reply.statusCode,\n' +
        '    responseTime: reply.elapsedTime\n' +
        '  }, \'Request completed\')\n' +
        '})'}</code></pre>

      {/* 8. Serialization */}
      <h2 style={h2s}>8. Serialization</h2>
      <p style={ps}>
        Fastify uses <strong>fast-json-stringify</strong> to serialize response objects. When you define a response schema, Fastify compiles a specialized serialization function at startup. This is significantly faster than JSON.stringify because it knows the exact shape of the data. It also acts as a security layer, stripping any properties not defined in the schema.
      </p>
      <pre style={cs}><code>{'app.get(\'/api/users/:id\', {\n' +
        '  schema: {\n' +
        '    response: {\n' +
        '      200: {\n' +
        '        type: \'object\',\n' +
        '        properties: {\n' +
        '          id: { type: \'string\' },\n' +
        '          name: { type: \'string\' },\n' +
        '          email: { type: \'string\' },\n' +
        '          // password field intentionally omitted —\n' +
        '          // fast-json-stringify will strip it automatically\n' +
        '        }\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '}, async (request) => {\n' +
        '  const { id } = request.params as { id: string }\n' +
        '  // Even if the DB returns { id, name, email, password, ssn },\n' +
        '  // the response will only contain { id, name, email }\n' +
        '  return db.findUser(id)\n' +
        '})\n' +
        '\n' +
        '// Custom serializer for specific content types\n' +
        'app.get(\'/api/report\', {\n' +
        '  schema: {\n' +
        '    response: { 200: { type: \'string\' } }\n' +
        '  }\n' +
        '}, async (request, reply) => {\n' +
        '  reply.type(\'text/csv\')\n' +
        '  reply.serializer((data: any) => {\n' +
        '    return data.map((row: any) => Object.values(row).join(\',\')).join(\'\\n\')\n' +
        '  })\n' +
        '  return await db.getReport()\n' +
        '})'}</code></pre>

      {/* 9. Logging with Pino */}
      <h2 style={h2s}>9. Logging with Pino</h2>
      <p style={ps}>
        Fastify ships with <strong>Pino</strong> as its default logger, one of the fastest JSON loggers for Node.js. Pino adds minimal overhead (only ~5% compared to noop) and produces structured JSON logs that are ideal for production log aggregation systems like ELK, Datadog, or Grafana Loki.
      </p>
      <pre style={cs}><code>{'import Fastify from \'fastify\'\n' +
        '\n' +
        '// Basic logger configuration\n' +
        'const app = Fastify({\n' +
        '  logger: {\n' +
        '    level: process.env.LOG_LEVEL || \'info\',\n' +
        '    // Pretty-print in development\n' +
        '    transport: process.env.NODE_ENV !== \'production\'\n' +
        '      ? { target: \'pino-pretty\', options: { colorize: true } }\n' +
        '      : undefined,\n' +
        '    // Redact sensitive fields\n' +
        '    redact: [\'req.headers.authorization\', \'req.headers.cookie\'],\n' +
        '    serializers: {\n' +
        '      req(request) {\n' +
        '        return {\n' +
        '          method: request.method,\n' +
        '          url: request.url,\n' +
        '          hostname: request.hostname,\n' +
        '        }\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '})\n' +
        '\n' +
        '// Use the logger in routes\n' +
        'app.get(\'/api/users\', async (request) => {\n' +
        '  request.log.info(\'Fetching users list\')\n' +
        '  const users = await db.findUsers()\n' +
        '  request.log.info({ count: users.length }, \'Users fetched\')\n' +
        '  return users\n' +
        '})\n' +
        '\n' +
        '// Child loggers with context\n' +
        'app.addHook(\'onRequest\', async (request) => {\n' +
        '  request.log = request.log.child({ requestId: request.id })\n' +
        '})'}</code></pre>

      {/* 10. Error Handling */}
      <h2 style={h2s}>10. Error Handling</h2>
      <p style={ps}>
        Fastify provides multiple layers of error handling: schema validation errors (automatic 400), custom error handlers, and the <strong>@fastify/sensible</strong> plugin for HTTP-aware error utilities.
      </p>
      <pre style={cs}><code>{'import Fastify from \'fastify\'\n' +
        'import sensible from \'@fastify/sensible\'\n' +
        '\n' +
        'const app = Fastify({ logger: true })\n' +
        'app.register(sensible)\n' +
        '\n' +
        '// Custom error handler\n' +
        'app.setErrorHandler((error, request, reply) => {\n' +
        '  request.log.error({ err: error }, \'Request error\')\n' +
        '  if (error.validation) {\n' +
        '    return reply.code(400).send({\n' +
        '      statusCode: 400, error: \'Validation Error\',\n' +
        '      message: error.message, details: error.validation\n' +
        '    })\n' +
        '  }\n' +
        '  const code = error.statusCode || 500\n' +
        '  reply.code(code).send({\n' +
        '    statusCode: code, error: error.name || \'Internal Server Error\',\n' +
        '    message: code === 500 ? \'An unexpected error occurred\' : error.message\n' +
        '  })\n' +
        '})\n' +
        '\n' +
        '// Custom 404 handler\n' +
        'app.setNotFoundHandler((request, reply) => {\n' +
        '  reply.code(404).send({\n' +
        '    statusCode: 404, error: \'Not Found\',\n' +
        '    message: \'Route \' + request.method + \':\' + request.url + \' not found\'\n' +
        '  })\n' +
        '})\n' +
        '\n' +
        '// Using @fastify/sensible HTTP errors in routes\n' +
        'app.get(\'/api/users/:id\', async (request) => {\n' +
        '  const { id } = request.params as { id: string }\n' +
        '  const user = await db.findUser(id)\n' +
        '  if (!user) throw app.httpErrors.notFound(\'User not found\')\n' +
        '  return user\n' +
        '})'}</code></pre>

      {/* 11. TypeScript Support */}
      <h2 style={h2s}>11. TypeScript Support</h2>
      <p style={ps}>
        Fastify has first-class TypeScript support. You can type request bodies, query strings, params, headers, and responses using generics or Type Providers for automatic inference from JSON schemas.
      </p>
      <h3 style={h3s}>Typed Routes with Generics</h3>
      <pre style={cs}><code>{'import Fastify, { FastifyRequest, FastifyReply } from \'fastify\'\n' +
        '\n' +
        'interface CreateUserBody {\n' +
        '  name: string\n' +
        '  email: string\n' +
        '  password: string\n' +
        '}\n' +
        '\n' +
        'interface UserParams {\n' +
        '  id: string\n' +
        '}\n' +
        '\n' +
        'interface ListQuery {\n' +
        '  page?: number\n' +
        '  limit?: number\n' +
        '}\n' +
        '\n' +
        'const app = Fastify()\n' +
        '\n' +
        'app.post<{ Body: CreateUserBody }>(\n' +
        '  \'/api/users\',\n' +
        '  async (request) => {\n' +
        '    // request.body is typed as CreateUserBody\n' +
        '    const { name, email, password } = request.body\n' +
        '    return { id: \'1\', name, email }\n' +
        '  }\n' +
        ')\n' +
        '\n' +
        'app.get<{ Params: UserParams; Querystring: ListQuery }>(\n' +
        '  \'/api/users/:id\',\n' +
        '  async (request) => {\n' +
        '    const { id } = request.params    // typed as UserParams\n' +
        '    const { page } = request.query   // typed as ListQuery\n' +
        '    return db.findUser(id)\n' +
        '  }\n' +
        ')'}</code></pre>

      <h3 style={h3s}>Type Providers (TypeBox)</h3>
      <pre style={cs}><code>{'import Fastify from \'fastify\'\n' +
        'import { TypeBoxTypeProvider } from \'@fastify/type-provider-typebox\'\n' +
        'import { Type, Static } from \'@sinclair/typebox\'\n' +
        '\n' +
        'const app = Fastify().withTypeProvider<TypeBoxTypeProvider>()\n' +
        '\n' +
        'const UserSchema = Type.Object({\n' +
        '  name: Type.String({ minLength: 2 }),\n' +
        '  email: Type.String({ format: \'email\' }),\n' +
        '  age: Type.Optional(Type.Integer({ minimum: 0 }))\n' +
        '})\n' +
        '\n' +
        'type User = Static<typeof UserSchema>\n' +
        '\n' +
        'app.post(\'/api/users\', {\n' +
        '  schema: { body: UserSchema }\n' +
        '}, async (request) => {\n' +
        '  // request.body is automatically typed as User\n' +
        '  const { name, email, age } = request.body\n' +
        '  return { id: \'1\', name, email, age }\n' +
        '})'}</code></pre>

      {/* 12. Authentication */}
      <h2 style={h2s}>12. Authentication (JWT and OAuth)</h2>
      <p style={ps}>
        Fastify has an excellent ecosystem for authentication. The <strong>@fastify/jwt</strong> plugin provides JWT signing and verification, while <strong>@fastify/oauth2</strong> handles OAuth2 flows with providers like Google, GitHub, and Facebook.
      </p>
      <h3 style={h3s}>JWT Authentication</h3>
      <pre style={cs}><code>{'import Fastify from \'fastify\'\n' +
        'import fastifyJwt from \'@fastify/jwt\'\n' +
        '\n' +
        'const app = Fastify({ logger: true })\n' +
        '\n' +
        'app.register(fastifyJwt, {\n' +
        '  secret: process.env.JWT_SECRET || \'supersecret\',\n' +
        '  sign: { expiresIn: \'1h\' }\n' +
        '})\n' +
        '\n' +
        '// Auth decorator\n' +
        'app.decorate(\'authenticate\', async (request: any, reply: any) => {\n' +
        '  try {\n' +
        '    await request.jwtVerify()\n' +
        '  } catch (err) {\n' +
        '    reply.code(401).send({ error: \'Unauthorized\' })\n' +
        '  }\n' +
        '})\n' +
        '\n' +
        '// Login route — issue token\n' +
        'app.post(\'/api/login\', async (request) => {\n' +
        '  const { email, password } = request.body as any\n' +
        '  const user = await verifyCredentials(email, password)\n' +
        '  const token = app.jwt.sign({\n' +
        '    sub: user.id,\n' +
        '    email: user.email,\n' +
        '    role: user.role\n' +
        '  })\n' +
        '  return { token }\n' +
        '})\n' +
        '\n' +
        '// Protected route\n' +
        'app.get(\'/api/profile\', {\n' +
        '  preHandler: [app.authenticate]\n' +
        '}, async (request) => {\n' +
        '  // request.user contains decoded JWT payload\n' +
        '  return db.findUser(request.user.sub)\n' +
        '})'}</code></pre>

      <h3 style={h3s}>OAuth2 with Google</h3>
      <pre style={cs}><code>{'import oauthPlugin from \'@fastify/oauth2\'\n' +
        '\n' +
        'app.register(oauthPlugin, {\n' +
        '  name: \'googleOAuth2\',\n' +
        '  credentials: {\n' +
        '    client: { id: process.env.GOOGLE_CLIENT_ID, secret: process.env.GOOGLE_CLIENT_SECRET },\n' +
        '    auth: oauthPlugin.GOOGLE_CONFIGURATION\n' +
        '  },\n' +
        '  startRedirectPath: \'/auth/google\',\n' +
        '  callbackUri: \'https://myapp.com/auth/google/callback\',\n' +
        '  scope: [\'profile\', \'email\']\n' +
        '})\n' +
        '\n' +
        'app.get(\'/auth/google/callback\', async (request, reply) => {\n' +
        '  const { token } = await app.googleOAuth2\n' +
        '    .getAccessTokenFromAuthorizationCodeFlow(request)\n' +
        '  const profile = await fetchGoogleProfile(token.access_token)\n' +
        '  const jwt = app.jwt.sign({ sub: profile.id, email: profile.email })\n' +
        '  reply.redirect(\'/dashboard?token=\' + jwt)\n' +
        '})'}</code></pre>

      {/* 13. Database Integration */}
      <h2 style={h2s}>13. Database Integration (Prisma and TypeORM)</h2>
      <p style={ps}>
        Fastify integrates cleanly with any database library through its plugin system. Here are examples with two popular ORMs: Prisma and TypeORM.
      </p>
      <h3 style={h3s}>Prisma Integration</h3>
      <pre style={cs}><code>{'// plugins/prisma.ts\n' +
        'import fp from \'fastify-plugin\'\n' +
        'import { PrismaClient } from \'@prisma/client\'\n' +
        '\n' +
        'export default fp(async (fastify) => {\n' +
        '  const prisma = new PrismaClient({\n' +
        '    log: [\'query\', \'warn\', \'error\']\n' +
        '  })\n' +
        '\n' +
        '  await prisma.$connect()\n' +
        '  fastify.decorate(\'prisma\', prisma)\n' +
        '\n' +
        '  fastify.addHook(\'onClose\', async () => {\n' +
        '    await prisma.$disconnect()\n' +
        '  })\n' +
        '})\n' +
        '\n' +
        '// routes/users.ts\n' +
        'export default async function userRoutes(fastify: any) {\n' +
        '  fastify.get(\'/users\', async (request: any) => {\n' +
        '    const { page = 1, limit = 20 } = request.query\n' +
        '    return fastify.prisma.user.findMany({\n' +
        '      skip: (page - 1) * limit,\n' +
        '      take: limit,\n' +
        '      select: { id: true, name: true, email: true, createdAt: true }\n' +
        '    })\n' +
        '  })\n' +
        '\n' +
        '  fastify.post(\'/users\', async (request: any, reply: any) => {\n' +
        '    const user = await fastify.prisma.user.create({ data: request.body })\n' +
        '    reply.code(201)\n' +
        '    return user\n' +
        '  })\n' +
        '}'}</code></pre>

      <h3 style={h3s}>TypeORM Integration</h3>
      <pre style={cs}><code>{'// plugins/typeorm.ts\n' +
        'import fp from \'fastify-plugin\'\n' +
        'import { DataSource } from \'typeorm\'\n' +
        'import { User } from \'../entities/User\'\n' +
        '\n' +
        'export default fp(async (fastify) => {\n' +
        '  const ds = new DataSource({\n' +
        '    type: \'postgres\', host: process.env.DB_HOST, port: 5432,\n' +
        '    username: process.env.DB_USER, password: process.env.DB_PASS,\n' +
        '    database: process.env.DB_NAME, entities: [User],\n' +
        '    synchronize: process.env.NODE_ENV !== \'production\'\n' +
        '  })\n' +
        '  await ds.initialize()\n' +
        '  fastify.decorate(\'orm\', ds)\n' +
        '  fastify.addHook(\'onClose\', async () => { await ds.destroy() })\n' +
        '})\n' +
        '\n' +
        '// Use in routes\n' +
        'app.get(\'/users\', async () => {\n' +
        '  return app.orm.getRepository(User).find({ take: 20, order: { createdAt: \'DESC\' } })\n' +
        '})'}</code></pre>

      {/* 14. Testing with inject */}
      <h2 style={h2s}>14. Testing with inject()</h2>
      <p style={ps}>
        Fastify provides a built-in <strong>inject()</strong> method that simulates HTTP requests without starting a real server. This makes tests fast, reliable, and free of port conflicts. It works seamlessly with any test runner: Vitest, Jest, tap, or Node.js native test runner.
      </p>
      <pre style={cs}><code>{'// app.ts — Export a build function\n' +
        'import Fastify from \'fastify\'\n' +
        '\n' +
        'export function buildApp() {\n' +
        '  const app = Fastify({ logger: false })\n' +
        '\n' +
        '  app.get(\'/api/health\', async () => ({ status: \'ok\' }))\n' +
        '\n' +
        '  app.post(\'/api/users\', {\n' +
        '    schema: {\n' +
        '      body: {\n' +
        '        type: \'object\',\n' +
        '        required: [\'name\', \'email\'],\n' +
        '        properties: {\n' +
        '          name: { type: \'string\' },\n' +
        '          email: { type: \'string\', format: \'email\' }\n' +
        '        }\n' +
        '      }\n' +
        '    }\n' +
        '  }, async (request, reply) => {\n' +
        '    reply.code(201)\n' +
        '    return { id: \'1\', ...request.body as object }\n' +
        '  })\n' +
        '\n' +
        '  return app\n' +
        '}\n' +
        '\n' +
        '// app.test.ts — Tests using inject()\n' +
        'import { describe, it, expect, beforeEach } from \'vitest\'\n' +
        'import { buildApp } from \'./app\'\n' +
        '\n' +
        'describe(\'User API\', () => {\n' +
        '  let app: ReturnType<typeof buildApp>\n' +
        '\n' +
        '  beforeEach(async () => {\n' +
        '    app = buildApp()\n' +
        '    await app.ready()\n' +
        '  })\n' +
        '\n' +
        '  it(\'GET /api/health returns 200\', async () => {\n' +
        '    const res = await app.inject({\n' +
        '      method: \'GET\',\n' +
        '      url: \'/api/health\'\n' +
        '    })\n' +
        '    expect(res.statusCode).toBe(200)\n' +
        '    expect(res.json()).toEqual({ status: \'ok\' })\n' +
        '  })\n' +
        '\n' +
        '  it(\'POST /api/users creates user\', async () => {\n' +
        '    const res = await app.inject({\n' +
        '      method: \'POST\',\n' +
        '      url: \'/api/users\',\n' +
        '      payload: { name: \'Alice\', email: \'alice@example.com\' }\n' +
        '    })\n' +
        '    expect(res.statusCode).toBe(201)\n' +
        '    expect(res.json().name).toBe(\'Alice\')\n' +
        '  })\n' +
        '\n' +
        '  it(\'POST /api/users rejects invalid email\', async () => {\n' +
        '    const res = await app.inject({\n' +
        '      method: \'POST\',\n' +
        '      url: \'/api/users\',\n' +
        '      payload: { name: \'Bob\', email: \'not-an-email\' }\n' +
        '    })\n' +
        '    expect(res.statusCode).toBe(400)\n' +
        '  })\n' +
        '})'}</code></pre>

      {/* 15. Deployment */}
      <h2 style={h2s}>15. Production Deployment</h2>
      <p style={ps}>
        Deploying Fastify to production requires attention to host binding, process management, graceful shutdown, and reverse proxy configuration. Here is a production-ready setup.
      </p>
      <h3 style={h3s}>Production Server Configuration</h3>
      <pre style={cs}><code>{'import Fastify from \'fastify\'\n' +
        'import closeWithGrace from \'close-with-grace\'\n' +
        '\n' +
        'const app = Fastify({\n' +
        '  logger: { level: \'info\', redact: [\'req.headers.authorization\'] },\n' +
        '  trustProxy: true,       // Behind Nginx/Caddy\n' +
        '  requestTimeout: 30000,  // 30s timeout\n' +
        '  bodyLimit: 1048576      // 1MB body limit\n' +
        '})\n' +
        '\n' +
        'app.register(import(\'@fastify/cors\'), { origin: [\'https://myapp.com\'], credentials: true })\n' +
        'app.register(import(\'@fastify/helmet\'))\n' +
        'app.register(import(\'@fastify/rate-limit\'), { max: 100, timeWindow: \'1 minute\' })\n' +
        '\n' +
        '// Graceful shutdown\n' +
        'closeWithGrace({ delay: 5000 }, async ({ err }) => {\n' +
        '  if (err) app.log.error(err, \'Closing due to error\')\n' +
        '  await app.close()\n' +
        '})\n' +
        '\n' +
        'app.listen({ port: 3000, host: \'0.0.0.0\' }) // Bind to 0.0.0.0'}</code></pre>

      <h3 style={h3s}>PM2 Ecosystem File</h3>
      <pre style={cs}><code>{'// ecosystem.config.cjs\n' +
        'module.exports = {\n' +
        '  apps: [{\n' +
        '    name: \'fastify-app\',\n' +
        '    script: \'./dist/server.js\',\n' +
        '    instances: \'max\',          // Use all CPU cores\n' +
        '    exec_mode: \'cluster\',\n' +
        '    env_production: {\n' +
        '      NODE_ENV: \'production\',\n' +
        '      PORT: 3000\n' +
        '    },\n' +
        '    max_memory_restart: \'500M\',\n' +
        '    error_file: \'./logs/error.log\',\n' +
        '    out_file: \'./logs/output.log\'\n' +
        '  }]\n' +
        '}'}</code></pre>

      <h3 style={h3s}>Nginx Reverse Proxy</h3>
      <pre style={cs}><code>{'upstream fastify_backend {\n' +
        '  server 127.0.0.1:3000;\n' +
        '  keepalive 64;\n' +
        '}\n' +
        'server {\n' +
        '  listen 443 ssl http2;\n' +
        '  server_name api.myapp.com;\n' +
        '  ssl_certificate     /etc/letsencrypt/live/api.myapp.com/fullchain.pem;\n' +
        '  ssl_certificate_key /etc/letsencrypt/live/api.myapp.com/privkey.pem;\n' +
        '  location / {\n' +
        '    proxy_pass http://fastify_backend;\n' +
        '    proxy_http_version 1.1;\n' +
        '    proxy_set_header Host $host;\n' +
        '    proxy_set_header X-Real-IP $remote_addr;\n' +
        '    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n' +
        '    proxy_set_header X-Forwarded-Proto $scheme;\n' +
        '  }\n' +
        '}'}</code></pre>

      {/* 16. Performance Comparison */}
      <h2 style={h2s}>16. Performance: Fastify vs Express</h2>
      <p style={ps}>
        Fastify consistently outperforms Express in all benchmark categories. The performance gains come from architectural decisions: schema-based serialization, radix-tree routing, and minimal per-request overhead.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem', color: '#1e293b' }}>Metric</th>
              <th style={{ padding: '0.75rem', color: '#1e293b' }}>Fastify 5.x</th>
              <th style={{ padding: '0.75rem', color: '#1e293b' }}>Express 4.x</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem' }}>Requests/sec (JSON)</td>
              <td style={{ padding: '0.75rem', fontWeight: 600, color: '#059669' }}>~78,000</td>
              <td style={{ padding: '0.75rem' }}>~30,000</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem' }}>Latency (avg)</td>
              <td style={{ padding: '0.75rem', fontWeight: 600, color: '#059669' }}>~1.2 ms</td>
              <td style={{ padding: '0.75rem' }}>~3.1 ms</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem' }}>Startup time</td>
              <td style={{ padding: '0.75rem', fontWeight: 600, color: '#059669' }}>~150 ms</td>
              <td style={{ padding: '0.75rem' }}>~80 ms</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem' }}>Built-in validation</td>
              <td style={{ padding: '0.75rem', fontWeight: 600, color: '#059669' }}>Yes (JSON Schema + Ajv)</td>
              <td style={{ padding: '0.75rem' }}>No (needs express-validator)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem' }}>Serialization</td>
              <td style={{ padding: '0.75rem', fontWeight: 600, color: '#059669' }}>fast-json-stringify</td>
              <td style={{ padding: '0.75rem' }}>JSON.stringify</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem' }}>Router algorithm</td>
              <td style={{ padding: '0.75rem', fontWeight: 600, color: '#059669' }}>Radix tree</td>
              <td style={{ padding: '0.75rem' }}>Regex (path-to-regexp)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem' }}>Logging</td>
              <td style={{ padding: '0.75rem', fontWeight: 600, color: '#059669' }}>Pino (built-in)</td>
              <td style={{ padding: '0.75rem' }}>morgan/winston (external)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem' }}>TypeScript support</td>
              <td style={{ padding: '0.75rem', fontWeight: 600, color: '#059669' }}>First-class (type providers)</td>
              <td style={{ padding: '0.75rem' }}>Via @types/express</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={ps}>
        The schema compilation step happens once at startup, making every subsequent request faster. For APIs handling thousands of concurrent requests, Fastify can reduce infrastructure costs through higher throughput per instance.
      </p>

      {/* 17. Essential Plugins */}
      <h2 style={h2s}>17. Essential Fastify Plugins</h2>
      <p style={ps}>
        The Fastify ecosystem includes official plugins for common needs. Key plugins include: <strong>@fastify/cors</strong> (CORS headers), <strong>@fastify/helmet</strong> (security headers), <strong>@fastify/rate-limit</strong> (rate limiting with Redis), <strong>@fastify/jwt</strong> (JWT auth), <strong>@fastify/sensible</strong> (HTTP error utilities), <strong>@fastify/swagger</strong> (auto OpenAPI docs), <strong>@fastify/multipart</strong> (file uploads), <strong>@fastify/cookie</strong> (cookie handling), <strong>@fastify/websocket</strong> (WebSocket support), and <strong>@fastify/static</strong> (static file serving).
      </p>

      {/* 18. FAQ */}
      <h2 style={h2s}>18. Frequently Asked Questions</h2>
      {faqSchema.mainEntity.map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>
            {faq.name}
          </h3>
          <p style={ps}>{faq.acceptedAnswer.text}</p>
        </div>
      ))}

      {/* Conclusion / Key Takeaways (bottom) */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', marginTop: '2rem', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#334155' }}>Summary</p>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Fastify is the fastest mainstream Node.js web framework, achieving 2-3x the throughput of Express.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Schema-based validation (JSON Schema + Ajv) and serialization (fast-json-stringify) provide both performance and safety.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>The encapsulated plugin system with avvio enables clean, modular, dependency-aware application architecture.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Lifecycle hooks give you fine-grained control at every stage from request arrival to response delivery.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Pino logging, TypeScript type providers, and the inject() test method make Fastify production-ready out of the box.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Deploy behind Nginx with PM2 cluster mode, graceful shutdown, and structured logging for a robust production setup.</li>
        </ul>
      </div>
    </article>
  );
}
