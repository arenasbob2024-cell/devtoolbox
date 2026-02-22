'use client';

import Link from 'next/link';

export default function GraphqlVsRestApi({ lang }: { lang: string }) {
  return (
    <>
      <h2>GraphQL vs REST: What Are They?</h2>
      <p>
        <strong>REST (Representational State Transfer)</strong> and <strong>GraphQL</strong> are the two dominant paradigms for building APIs. REST, introduced by Roy Fielding in 2000, uses standard HTTP methods and resource-based URLs. GraphQL, created by Facebook in 2015, uses a single endpoint with a flexible query language that lets clients request exactly the data they need.
      </p>
      <p>
        Both approaches have trade-offs. REST is simpler to implement and widely understood, while GraphQL provides more flexibility for complex data requirements. This guide compares both in depth to help you choose the right approach for your project.
      </p>

      <h2>Core Architecture Differences</h2>
      <pre><code className="language-text">{`REST Architecture:
  - Multiple endpoints (one per resource)
  - HTTP methods define operations (GET, POST, PUT, DELETE)
  - Server decides response shape
  - Stateless, cacheable by default

  GET    /api/users/123           -> Get user
  GET    /api/users/123/posts     -> Get user's posts
  POST   /api/users               -> Create user
  PUT    /api/users/123           -> Update user
  DELETE /api/users/123           -> Delete user

GraphQL Architecture:
  - Single endpoint (/graphql)
  - POST method for all operations
  - Client decides response shape via queries
  - Queries, mutations, and subscriptions

  POST /graphql
  {
    query: "{ user(id: 123) { name email posts { title } } }"
  }`}</code></pre>

      <h2>Data Fetching: Over-fetching and Under-fetching</h2>
      <p>
        One of the key differences between REST and GraphQL is how they handle data fetching. REST endpoints often return fixed data structures, which can lead to over-fetching (getting more data than needed) or under-fetching (needing multiple requests to get all required data).
      </p>

      <h3>REST Example: Multiple Requests Needed</h3>
      <pre><code className="language-javascript">{`// REST: Need 3 requests to build a user profile page
// Request 1: Get user
const user = await fetch('/api/users/123');
// Response: { id: 123, name: "Alice", email: "alice@example.com",
//             bio: "...", avatar: "...", createdAt: "...",
//             settings: {...}, /* lots of extra fields */ }

// Request 2: Get user's posts
const posts = await fetch('/api/users/123/posts');
// Response: [{ id: 1, title: "...", body: "...", /* extra fields */ }]

// Request 3: Get user's followers count
const followers = await fetch('/api/users/123/followers?count=true');
// Response: { count: 1234 }

// Problem: 3 round trips, over-fetching unused fields`}</code></pre>

      <h3>GraphQL Example: Single Request</h3>
      <pre><code className="language-graphql">{`# GraphQL: One request, exactly the data you need
query UserProfile {
  user(id: 123) {
    name
    email
    avatar
    posts(limit: 5) {
      title
      createdAt
    }
    followersCount
  }
}

# Response:
# {
#   "data": {
#     "user": {
#       "name": "Alice",
#       "email": "alice@example.com",
#       "avatar": "https://...",
#       "posts": [
#         { "title": "My First Post", "createdAt": "2026-01-15" }
#       ],
#       "followersCount": 1234
#     }
#   }
# }`}</code></pre>

      <h2>Schema and Type System</h2>
      <p>
        GraphQL has a built-in type system that serves as documentation and validation. REST APIs typically use OpenAPI (Swagger) for similar functionality, but it is not built into the protocol.
      </p>
      <pre><code className="language-graphql">{`# GraphQL Schema Definition Language (SDL)
type User {
  id: ID!
  name: String!
  email: String!
  avatar: String
  posts(limit: Int = 10, offset: Int = 0): [Post!]!
  followersCount: Int!
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!
  tags: [String!]!
  publishedAt: DateTime
}

type Query {
  user(id: ID!): User
  users(filter: UserFilter, limit: Int = 20): [User!]!
  post(id: ID!): Post
  searchPosts(query: String!): [Post!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
  createPost(input: CreatePostInput!): Post!
}

input CreateUserInput {
  name: String!
  email: String!
  avatar: String
}

type Subscription {
  postCreated: Post!
  userOnline(userId: ID!): Boolean!
}`}</code></pre>

      <h2>Implementation Examples</h2>

      <h3>REST API with Express.js</h3>
      <pre><code className="language-javascript">{`const express = require('express');
const app = express();

// GET /api/users/:id
app.get('/api/users/:id', async (req, res) => {
  const user = await db.users.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

// GET /api/users/:id/posts
app.get('/api/users/:id/posts', async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const posts = await db.posts.findByUserId(req.params.id, { limit, offset });
  res.json(posts);
});

// POST /api/users
app.post('/api/users', async (req, res) => {
  const user = await db.users.create(req.body);
  res.status(201).json(user);
});

// PUT /api/users/:id
app.put('/api/users/:id', async (req, res) => {
  const user = await db.users.update(req.params.id, req.body);
  res.json(user);
});

// DELETE /api/users/:id
app.delete('/api/users/:id', async (req, res) => {
  await db.users.delete(req.params.id);
  res.status(204).send();
});`}</code></pre>

      <h3>GraphQL API with Apollo Server</h3>
      <pre><code className="language-javascript">{`const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = \`
  type User {
    id: ID!
    name: String!
    email: String!
    posts(limit: Int = 10): [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    author: User!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
\`;

const resolvers = {
  Query: {
    user: (_, { id }) => db.users.findById(id),
    users: () => db.users.findAll(),
  },
  Mutation: {
    createUser: (_, { name, email }) => db.users.create({ name, email }),
  },
  User: {
    // Resolver for nested posts field
    posts: (parent, { limit }) => db.posts.findByUserId(parent.id, { limit }),
  },
  Post: {
    author: (parent) => db.users.findById(parent.authorId),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });`}</code></pre>

      <h2>Comprehensive Comparison</h2>
      <pre><code className="language-text">{`Feature              REST                          GraphQL
-------              ----                          -------
Endpoints            Multiple (/users, /posts)     Single (/graphql)
Data fetching        Fixed response shape          Client-specified fields
Over-fetching        Common problem                Solved by design
Under-fetching       Multiple requests needed      Single query
Caching              HTTP caching (simple)         Complex (query-based)
File uploads         Native support                Requires extra setup
Error handling       HTTP status codes             200 + errors array
Versioning           URL (/v1/, /v2/) or headers   Schema evolution
Learning curve       Lower                         Higher
Tooling              Postman, curl, Swagger        GraphiQL, Apollo Studio
Real-time            WebSocket / SSE (separate)    Subscriptions (built-in)
Rate limiting        Simple (per endpoint)         Complex (query complexity)
Documentation        OpenAPI/Swagger               Self-documenting schema
N+1 problem          Managed on server             DataLoader required
Browser caching      GET requests cacheable        Needs persisted queries
Monitoring           Standard HTTP metrics         Query-level analysis needed`}</code></pre>

      <h2>When to Choose REST</h2>
      <ul>
        <li><strong>Simple CRUD operations</strong> -- when resources map cleanly to endpoints</li>
        <li><strong>Public APIs</strong> -- REST is universally understood and easy to consume</li>
        <li><strong>Heavy caching needs</strong> -- HTTP caching works out of the box with GET requests</li>
        <li><strong>File upload/download</strong> -- REST handles binary data natively</li>
        <li><strong>Microservices communication</strong> -- simpler service-to-service calls</li>
        <li><strong>Team familiarity</strong> -- most developers already know REST</li>
        <li><strong>Webhook integrations</strong> -- external services expect REST endpoints</li>
      </ul>

      <h2>When to Choose GraphQL</h2>
      <ul>
        <li><strong>Complex data requirements</strong> -- multiple related entities in one request</li>
        <li><strong>Mobile applications</strong> -- minimize data transfer and round trips</li>
        <li><strong>Multiple client types</strong> -- web, mobile, and IoT need different data shapes</li>
        <li><strong>Rapid frontend iteration</strong> -- frontend can change queries without backend changes</li>
        <li><strong>Real-time features</strong> -- built-in subscription support</li>
        <li><strong>Aggregating multiple data sources</strong> -- GraphQL as a gateway</li>
        <li><strong>Strong typing requirements</strong> -- schema provides automatic type safety</li>
      </ul>

      <h2>Common Patterns: REST API Best Practices</h2>
      <pre><code className="language-javascript">{`// REST Best Practices

// 1. Use proper HTTP methods
GET    /api/users          // List users
POST   /api/users          // Create user
GET    /api/users/:id      // Get one user
PUT    /api/users/:id      // Full update
PATCH  /api/users/:id      // Partial update
DELETE /api/users/:id      // Delete user

// 2. Use proper status codes
200  // OK
201  // Created
204  // No Content (successful delete)
400  // Bad Request (validation error)
401  // Unauthorized
403  // Forbidden
404  // Not Found
409  // Conflict
422  // Unprocessable Entity
429  // Too Many Requests
500  // Internal Server Error

// 3. Pagination
GET /api/users?page=2&limit=20
// Response: { data: [...], meta: { total: 100, page: 2, limit: 20 } }

// 4. Filtering and sorting
GET /api/users?role=admin&sort=-createdAt&fields=name,email

// 5. Error response format
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [{ "field": "email", "message": "Must be a valid email" }]
  }
}`}</code></pre>

      <h2>Common Patterns: GraphQL Best Practices</h2>
      <pre><code className="language-javascript">{`// GraphQL Best Practices

// 1. Use DataLoader to solve N+1 problem
const DataLoader = require('dataloader');

const userLoader = new DataLoader(async (userIds) => {
  const users = await db.users.findByIds(userIds);
  return userIds.map(id => users.find(u => u.id === id));
});

// In resolver
Post: {
  author: (post) => userLoader.load(post.authorId),
}

// 2. Query complexity limiting
const { createComplexityLimitRule } = require('graphql-validation-complexity');
const complexityLimit = createComplexityLimitRule(1000);

// 3. Pagination with cursor-based connections
type Query {
  users(first: Int, after: String): UserConnection!
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
}

type UserEdge {
  node: User!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}`}</code></pre>

      <h2>Hybrid Approach: REST + GraphQL</h2>
      <p>
        Many successful companies use both REST and GraphQL in their architecture. A common pattern is to use GraphQL for client-facing APIs and REST for service-to-service communication and third-party integrations.
      </p>
      <pre><code className="language-text">{`Hybrid Architecture Example:

  [Mobile App] --> [GraphQL Gateway] --> [User Service (REST)]
  [Web App]    --> [GraphQL Gateway] --> [Post Service (REST)]
  [3rd Party]  --> [REST Public API] --> [Auth Service (REST)]
                                    --> [ML Service (gRPC)]

Benefits:
  - GraphQL for flexible client queries
  - REST for simple microservice communication
  - gRPC for high-performance internal calls
  - Public REST API for third-party integrations`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Is GraphQL faster than REST?</h3>
      <p>
        Not inherently. GraphQL can be faster for complex pages that would require multiple REST calls, since it consolidates them into a single request. However, a well-designed REST API with specific endpoints can be just as fast or faster for simple operations due to HTTP caching advantages.
      </p>

      <h3>Does GraphQL replace REST?</h3>
      <p>
        No. GraphQL is an alternative, not a replacement. Many organizations use both. REST remains the better choice for simple APIs, public APIs, file handling, and service-to-service communication. GraphQL shines when clients need flexible data fetching.
      </p>

      <h3>Is GraphQL harder to learn?</h3>
      <p>
        Yes, GraphQL has a steeper learning curve. You need to understand schemas, resolvers, query language syntax, and concepts like the N+1 problem. REST leverages HTTP concepts that most developers already know. However, GraphQL tooling (GraphiQL, Apollo DevTools) makes the learning experience smoother.
      </p>

      <h3>How do you handle authentication in GraphQL?</h3>
      <p>
        Authentication in GraphQL works similarly to REST. Use JWT tokens or session cookies sent via HTTP headers. The token is validated in middleware or a context function before resolvers execute. Authorization (who can access what) is typically handled at the resolver level or with directive-based approaches.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate API responses</li>
        <li><Link href={`/${lang}/tools/jwt-decoder`}>JWT Decoder</Link> - Decode API authentication tokens</li>
        <li><Link href={`/${lang}/blog/rest-api-best-practices-guide`}>REST API Best Practices</Link> - Complete REST design guide</li>
        <li><Link href={`/${lang}/blog/api-authentication-oauth-jwt-apikey`}>API Authentication Guide</Link> - OAuth, JWT, and API keys</li>
        <li><Link href={`/${lang}/blog/http-status-codes-reference`}>HTTP Status Codes Reference</Link> - Complete status code guide</li>
      </ul>
    </>
  );
}
