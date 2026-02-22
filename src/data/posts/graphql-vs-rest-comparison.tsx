'use client';

import Link from 'next/link';

export default function GraphqlVsRestComparison({ lang }: { lang: string }) {
  return (
    <>
      <h2>GraphQL vs REST: Detailed Comparison for 2026</h2>
      <p>
        <strong>GraphQL</strong> and <strong>REST</strong> are the two dominant paradigms for building
        web APIs. Both can solve the same problems, but they make different trade-offs. Choosing
        between them depends on your use case, team size, client requirements, and caching strategy.
        This guide provides a thorough, practical comparison to help you make the right choice.
      </p>
      <p>
        For REST API design principles, see our{' '}
        <Link href={`/${lang}/blog/rest-api-design-guide`}>REST API Design Guide</Link>. For GraphQL
        hands-on tutorials, check out our{' '}
        <Link href={`/${lang}/blog/graphql-tutorial-beginners`}>GraphQL Tutorial for Beginners</Link>.
      </p>

      <h2>Core Architecture Differences</h2>
      <pre><code className="language-text">{`REST Architecture:
  Multiple endpoints, each returns fixed data shape
  GET    /users           → list of users
  GET    /users/123       → user + some fields
  GET    /users/123/posts → posts for that user
  POST   /posts           → create post
  PATCH  /posts/456       → update post

GraphQL Architecture:
  Single endpoint, client specifies exact data shape
  POST   /graphql  → { query: "{ user(id: 123) { name email posts { title } } }" }
  POST   /graphql  → { mutation: "mutation { createPost(...) { id } }" }`}</code></pre>

      <h2>Data Fetching: Over-fetching and Under-fetching</h2>
      <p>
        The most commonly cited advantage of GraphQL is solving over-fetching (getting more data than
        needed) and under-fetching (requiring multiple requests):
      </p>
      <pre><code className="language-json">{`// REST: GET /users/123 returns the entire user object
// regardless of what you actually need
{
  "id": 123,
  "name": "Alice",
  "email": "alice@example.com",
  "phone": "555-1234",
  "address": { ... },          // not needed
  "preferences": { ... },      // not needed
  "subscription": { ... },     // not needed
  "createdAt": "2024-01-01",
  "updatedAt": "2024-11-15"
}

// GraphQL: You ask for exactly what you need
// query { user(id: 123) { name email } }
{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}`}</code></pre>
      <pre><code className="language-javascript">{`// REST: 3 requests to render a profile page
const user = await fetch('/users/123');
const posts = await fetch('/users/123/posts');
const followers = await fetch('/users/123/followers');

// Then combine client-side...

// GraphQL: 1 request for everything
const { data } = await fetch('/graphql', {
  method: 'POST',
  body: JSON.stringify({
    query: \`{
      user(id: 123) {
        name
        avatar
        posts(limit: 5) {
          title
          publishedAt
          commentCount
        }
        followers {
          totalCount
        }
      }
    }\`
  })
});`}</code></pre>

      <h2>Type System and Schema</h2>
      <p>
        GraphQL has a strong type system enforced at the protocol level. REST relies on documentation
        and conventions:
      </p>
      <pre><code className="language-graphql">{`# GraphQL Schema Definition Language (SDL)
# This IS the contract — automatically validated

type User {
  id: ID!                         # ! = non-nullable
  name: String!
  email: String!
  role: UserRole!
  posts(limit: Int = 10, offset: Int = 0): [Post!]!
  createdAt: DateTime!
}

enum UserRole {
  ADMIN
  EDITOR
  VIEWER
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  tags: [String!]!
  publishedAt: DateTime
}

type Query {
  user(id: ID!): User
  users(filter: UserFilter): [User!]!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
  updatePost(id: ID!, input: UpdatePostInput!): Post
  deletePost(id: ID!): Boolean!
}

type Subscription {
  postPublished: Post!
}`}</code></pre>
      <pre><code className="language-yaml">{`# REST: OpenAPI/Swagger specification (separate from code, can drift)
openapi: 3.0.0
paths:
  /users/{id}:
    get:
      parameters:
        - name: id
          in: path
          required: true
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'`}</code></pre>

      <h2>Caching: REST's Biggest Advantage</h2>
      <p>
        REST's biggest structural advantage over GraphQL is HTTP caching. GET requests are
        automatically cacheable at every layer:
      </p>
      <pre><code className="language-text">{`REST Caching (Built-in):
  Browser cache   → caches GET /users/123
  CDN (Cloudflare, CloudFront) → caches GET /posts/popular
  Reverse proxy (nginx, Varnish) → caches at edge

  Cache-Control: public, max-age=3600
  ETag: "abc123"
  Last-Modified: Tue, 15 Nov 2024 12:00:00 GMT

GraphQL Caching (Requires Extra Work):
  All queries are POST requests → no automatic HTTP caching
  Solutions:
  1. Persisted Queries: hash query → short ID → use GET
  2. Response caching at resolver level (DataLoader)
  3. Client-side cache (Apollo InMemoryCache, urql)
  4. CDN with custom logic (cache by query hash)`}</code></pre>
      <pre><code className="language-typescript">{`// GraphQL: Client-side caching with Apollo Client
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: ['id'],        // Normalize by ID
        fields: {
          posts: {
            keyArgs: ['filter'],  // Cache by filter args
            merge(existing = [], incoming) {
              return [...existing, ...incoming];  // Pagination merge
            },
          },
        },
      },
    },
  }),
});

// REST: Native browser caching works automatically
fetch('/api/users/123', {
  headers: { 'Cache-Control': 'max-age=300' }
});`}</code></pre>

      <h2>Error Handling</h2>
      <pre><code className="language-json">{`// REST: Uses HTTP status codes
// 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Error
HTTP/1.1 404 Not Found
{
  "error": "User not found",
  "code": "USER_NOT_FOUND"
}

// GraphQL: Always returns 200 OK, errors in response body
// This makes error monitoring harder — you must check response.errors
HTTP/1.1 200 OK
{
  "data": {
    "user": null          // Null where the user would be
  },
  "errors": [
    {
      "message": "User not found",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["user"],
      "extensions": {
        "code": "USER_NOT_FOUND",
        "statusCode": 404
      }
    }
  ]
}`}</code></pre>

      <h2>Real-time: Subscriptions vs WebSockets</h2>
      <pre><code className="language-typescript">{`// GraphQL Subscriptions (built into the spec)
const MESSAGES_SUBSCRIPTION = gql\`
  subscription OnNewMessage($roomId: ID!) {
    messageAdded(roomId: $roomId) {
      id
      content
      sender { name avatar }
      createdAt
    }
  }
\`;

function ChatRoom({ roomId }) {
  const { data } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { roomId }
  });
  // Automatically updates when new messages arrive
}

// REST: Must implement WebSockets separately
const ws = new WebSocket('wss://api.example.com/ws');
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  // Handle manually...
};`}</code></pre>

      <h2>When to Choose REST</h2>
      <ul>
        <li>
          <strong>Simple CRUD APIs</strong> — REST is simpler to implement and understand for basic
          create/read/update/delete operations.
        </li>
        <li>
          <strong>Public APIs</strong> — REST is universally understood, and caching via CDNs is
          straightforward.
        </li>
        <li>
          <strong>File uploads/downloads</strong> — REST handles binary data and streaming naturally.
          GraphQL requires workarounds.
        </li>
        <li>
          <strong>Caching is critical</strong> — If you need aggressive CDN caching, REST's HTTP
          semantics are a major advantage.
        </li>
        <li>
          <strong>Simple team/small project</strong> — Less infrastructure, tooling, and learning
          curve.
        </li>
        <li>
          <strong>Microservices with stable contracts</strong> — Each service has a clear, bounded API.
        </li>
      </ul>

      <h2>When to Choose GraphQL</h2>
      <ul>
        <li>
          <strong>Multiple clients with different data needs</strong> — Mobile app needs fewer fields
          than web app. GraphQL lets each client ask for what it needs.
        </li>
        <li>
          <strong>Rapid front-end development</strong> — Front-end teams can build features without
          waiting for back-end API changes.
        </li>
        <li>
          <strong>Complex, interconnected data</strong> — Social graphs, content management,
          e-commerce with many relationships.
        </li>
        <li>
          <strong>Real-time requirements</strong> — Subscriptions are first-class in GraphQL.
        </li>
        <li>
          <strong>API aggregation (BFF pattern)</strong> — GraphQL as a Backend for Frontend that
          aggregates multiple microservices.
        </li>
        <li>
          <strong>Strong typing required</strong> — Auto-generated types for TypeScript from schema.
        </li>
      </ul>

      <h2>Performance Comparison</h2>
      <pre><code className="language-text">{`Scenario: Display a product page (name, price, reviews, related products)

REST Approach:
  GET /products/123          → 200ms
  GET /products/123/reviews  → 150ms  (parallel)
  GET /products/related/123  → 180ms  (parallel)
  Total: ~200ms (with parallelism) + data transfer overhead

GraphQL Approach:
  POST /graphql (one query)  → 280ms
  Total: ~280ms but with N+1 problem risk

With DataLoader (batching):
  POST /graphql              → 220ms
  Total: ~220ms, less data transfer

Key insight: GraphQL's performance advantage comes from:
  1. Fewer HTTP round trips
  2. Less data transferred (no over-fetching)
  3. DataLoader batching prevents N+1 queries

REST performance advantage:
  1. HTTP caching reduces origin load significantly
  2. CDN-cached responses: <10ms vs 200ms+ for GraphQL
  3. Simpler server-side implementation`}</code></pre>

      <h2>Side-by-Side Comparison Table</h2>
      <pre><code className="language-text">{`Feature              REST              GraphQL
─────────────────────────────────────────────────────────
Endpoints            Multiple          Single (/graphql)
Data fetching        Fixed response    Client-specified
Type system          Optional (OAS)    Built-in (SDL)
HTTP caching         Native            Requires extra work
File uploads         Native            Requires multipart
Real-time            External (WS)     Subscriptions built-in
Learning curve       Low               Medium-High
Tooling              Mature (Postman)  Good (Apollo Studio)
Error handling       HTTP codes        Always 200, errors[]
Introspection        Via docs/OAS      Built-in
Versioning           /v1 /v2           Evolve schema
Browser DevTools     Full support      Limited (POST only)
Auto codegen         OpenAPI → SDK     Schema → TypeScript
Best for             Simple/public API Complex/multi-client`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Can I use both REST and GraphQL in the same project?</h3>
      <p>
        Yes, this is common. You might use REST for file uploads, public CDN-cached endpoints, and
        webhooks, while using GraphQL for your main application API. Many teams also start with REST
        and add a GraphQL layer (BFF) on top.
      </p>

      <h3>Is GraphQL harder to secure?</h3>
      <p>
        GraphQL requires extra security measures: query depth limiting (prevent deeply nested attacks),
        query complexity analysis, rate limiting by query complexity, and disabling introspection in
        production. REST security is generally more straightforward.
      </p>

      <h3>Does GraphQL replace REST for microservices?</h3>
      <p>
        Not typically. Internal microservice communication often uses REST (or gRPC). GraphQL is most
        commonly used as a BFF (Backend for Frontend) layer that aggregates multiple microservices
        into a single API for front-end clients.
      </p>

      <p>
        Use our <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> to explore and
        validate GraphQL and REST API responses, or the{' '}
        <Link href={`/${lang}/tools/url-encoder`}>URL Encoder</Link> for working with REST query
        parameters.
      </p>
    </>
  );
}
