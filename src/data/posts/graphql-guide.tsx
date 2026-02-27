'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'GraphQL Complete Guide: Schema, Apollo Server, React Client, DataLoader, Auth & Performance',
    description: 'Complete GraphQL guide covering GraphQL vs REST, schema definition, Apollo Server, queries/mutations, Apollo Client React hooks, DataLoader, subscriptions, JWT auth, code generation, and performance optimization.',
  },
  zh: {
    title: 'GraphQL 完整指南：Schema、Apollo Server、React 客户端、DataLoader、认证与性能优化',
    description: '完整 GraphQL 指南，涵盖 GraphQL vs REST、Schema 定义、Apollo Server、查询/变更、Apollo Client React Hooks、DataLoader、订阅、JWT 认证、代码生成和性能优化。',
  },
};

export default function GraphqlGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the main advantage of GraphQL over REST?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GraphQL eliminates over-fetching (receiving more data than needed) and under-fetching (requiring multiple requests for related data). With REST, each endpoint returns a fixed shape — the client takes whatever the server sends. With GraphQL, the client describes exactly what data it needs in the query, and the server returns precisely that. This reduces payload sizes, eliminates N+1 network requests for nested data, and gives frontend teams autonomy to iterate on UIs without requiring backend changes for each view.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the N+1 problem in GraphQL and how does DataLoader solve it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The N+1 problem occurs when resolving a list of N items each requires an additional database query. For example, fetching 100 posts and then loading the author for each post results in 1 + 100 = 101 queries. DataLoader solves this by batching: it collects all pending load() calls within a single event loop tick and issues one batched query (e.g., SELECT * FROM users WHERE id IN (1, 2, 3, ...)). It also caches results within a request so the same ID is never fetched twice. DataLoader is request-scoped — create a new instance per GraphQL request.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I pass authentication in GraphQL requests?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pass a JWT or session token in the Authorization HTTP header: Authorization: Bearer <token>. In Apollo Server, extract and verify the token in the context function, which runs before every resolver. Attach the decoded user object to the context object. Resolvers then receive context as their third argument and can check context.user for authorization. Never put auth logic in the schema — do it in resolvers or middleware functions. For field-level authorization, use libraries like graphql-shield to define permission rules per type and field.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a Query and a Mutation in GraphQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Queries are read operations — they fetch data without side effects. Mutations are write operations — they create, update, or delete data and may have side effects. Semantically, queries can be executed in parallel by the client, while mutations are executed serially (one after another) to ensure predictable state changes. Subscriptions are a third operation type for real-time event streams over WebSockets. As a convention: use queries for anything that reads, and mutations for anything that modifies state, even if it is idempotent.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Apollo Client cache policies work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Apollo Client uses an in-memory normalized cache. Each object is stored by a unique cache key (defaulting to __typename + id). Fetch policies control how queries interact with the cache: cache-first (default) reads from cache without network if available; network-only always fetches from the network; cache-and-network returns cached data immediately and updates in the background; no-cache bypasses caching entirely. After mutations, update the cache manually with update() or refetchQueries to keep the UI consistent.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are GraphQL subscriptions and when should I use them?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GraphQL subscriptions provide real-time data via a persistent WebSocket connection. Use them for: live notifications, chat messages, real-time dashboard metrics, collaborative editing cursors, and stock price tickers. The client subscribes with a subscription operation, and the server pushes events whenever the subscribed data changes. The graphql-ws library is the modern standard for WebSocket transport. Avoid subscriptions for data that only updates on user action — polling or mutations with cache updates are simpler for those cases.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is graphql-codegen and why should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'graphql-codegen (GraphQL Code Generator) reads your GraphQL schema and operation documents (.graphql files or inline gql tags) and generates fully typed TypeScript types, React hooks, and resolvers. This eliminates manual type definitions for queries, mutations, and responses. When the schema changes, re-running codegen immediately surfaces type errors in your components. Use the @graphql-codegen/typescript, @graphql-codegen/typescript-operations, and @graphql-codegen/typescript-react-apollo plugins together for a complete typed Apollo Client setup.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I limit query depth and complexity in GraphQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unrestricted GraphQL queries can cause denial-of-service via deeply nested or broadly complex queries. Limit depth with graphql-depth-limit: import depthLimit from "graphql-depth-limit"; server.validationRules = [depthLimit(5)]. Limit complexity by assigning a cost to each field and rejecting queries that exceed a threshold using graphql-query-complexity. Use Persisted Queries (APQ) in production to only allow pre-registered query hashes, completely preventing arbitrary query execution. Apollo Studio and Apollo Gateway have built-in query safeguards for enterprise deployments.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/graphql-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>GraphQL</strong> solves REST's over-fetching and under-fetching by letting clients declare exactly
          what data they need. Use <strong>Apollo Server</strong> for the backend with typed resolvers and{' '}
          <strong>context</strong> for auth. Use <strong>DataLoader</strong> to eliminate N+1 queries. On the frontend,{' '}
          <strong>Apollo Client</strong> hooks (<code>useQuery</code>, <code>useMutation</code>) integrate seamlessly
          with React. Run <strong>graphql-codegen</strong> to auto-generate TypeScript types from your schema, and add{' '}
          depth/complexity limits in production. Use our{' '}
          <Link href={`/${lang}/tools/json-formatter`} style={{ color: '#0284c7' }}>JSON formatter tool</Link>{' '}
          to format and inspect GraphQL response payloads.
        </p>
      </div>

      {/* Section 1: GraphQL vs REST */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        1. GraphQL vs REST — Over-fetching, Under-fetching, and the Type System
      </h2>
      <p>
        REST APIs expose multiple endpoints, each returning a fixed data shape defined by the server. This leads to
        two fundamental problems: <strong>over-fetching</strong> (the response includes fields the client does not
        need) and <strong>under-fetching</strong> (one request is not enough, so the client must make multiple
        sequential round-trips).
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Aspect</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>REST</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>GraphQL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Endpoints</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Multiple (/users, /posts)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Single (/graphql)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Data shape</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Fixed by server</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Declared by client</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Versioning</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>/v1, /v2 endpoints</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Evolve schema, deprecate fields</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Type system</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Optional (OpenAPI/Swagger)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Built-in, introspectable</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Real-time</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>SSE or polling</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Native subscriptions (WebSocket)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Introspection</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>External docs only</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Query the schema itself (__schema)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        GraphQL's <strong>introspection</strong> system lets tools like GraphiQL and Apollo Studio auto-generate
        documentation and provide autocomplete. The type system is not optional — it is the contract between client
        and server, and breaking changes are caught at build time with code generation.
      </p>

      {/* Section 2: Schema Definition */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        2. Schema Definition — Types, Queries, Mutations, Subscriptions, Enums, Interfaces, Unions
      </h2>
      <p>
        The GraphQL Schema Definition Language (SDL) is the backbone of every GraphQL API. It defines all types,
        their fields, and the operations clients can perform.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`# Scalar types: String, Int, Float, Boolean, ID (and custom scalars)
scalar DateTime
scalar JSON

# Enum
enum Role {
  ADMIN
  USER
  GUEST
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

# Interface — shared fields across types
interface Node {
  id: ID!
}

# Union — a field can return one of several types
union SearchResult = User | Post | Comment

# Object types
type User implements Node {
  id: ID!
  email: String!
  username: String!
  role: Role!
  posts(limit: Int = 10, offset: Int = 0): [Post!]!
  createdAt: DateTime!
}

type Post implements Node {
  id: ID!
  title: String!
  body: String
  status: PostStatus!
  author: User!
  tags: [String!]!
  publishedAt: DateTime
}

# Input types for mutations
input CreatePostInput {
  title: String!
  body: String
  tags: [String!]
}

input UpdatePostInput {
  title: String
  body: String
  status: PostStatus
}

# Root types
type Query {
  me: User
  user(id: ID!): User
  users(limit: Int = 20, offset: Int = 0): [User!]!
  post(id: ID!): Post
  search(query: String!): [SearchResult!]!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
  updatePost(id: ID!, input: UpdatePostInput!): Post!
  deletePost(id: ID!): Boolean!
  publishPost(id: ID!): Post!
}

type Subscription {
  postPublished: Post!
  commentAdded(postId: ID!): Comment!
}`}</pre>
      </div>

      {/* Section 3: Apollo Server */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        3. Apollo Server (Node.js) — typeDefs, Resolvers, Context, DataSources
      </h2>
      <p>
        Apollo Server is the most popular GraphQL server implementation for Node.js. Apollo Server 4 (AS4) is
        framework-agnostic and works with Express, Fastify, Koa, or as a standalone HTTP server.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install @apollo/server graphql graphql-tag`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';

// typeDefs — can also be loaded from .graphql files
const typeDefs = gql\`
  type User {
    id: ID!
    email: String!
    username: String!
  }
  type Post {
    id: ID!
    title: String!
    author: User!
  }
  type Query {
    users: [User!]!
    post(id: ID!): Post
  }
  type Mutation {
    createPost(title: String!, authorId: ID!): Post!
  }
\`;

// Resolvers map — each field resolver receives (parent, args, context, info)
const resolvers = {
  Query: {
    users: async (_parent, _args, context) => {
      return context.db.user.findMany();
    },
    post: async (_parent, { id }, context) => {
      return context.db.post.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createPost: async (_parent, { title, authorId }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      return context.db.post.create({
        data: { title, authorId },
      });
    },
  },
  Post: {
    // Field resolver — runs for each Post in the response
    author: async (post, _args, context) => {
      return context.userLoader.load(post.authorId);
    },
  },
};

// Context function — runs before every operation
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const user = token ? verifyJWT(token) : null;
    return {
      user,
      db: prisma,
      userLoader: createUserLoader(prisma),  // DataLoader instance
    };
  },
  listen: { port: 4000 },
});

console.log(\`GraphQL server ready at \${url}\`);`}</pre>
      </div>

      {/* Section 4: Queries & Mutations */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        4. Queries &amp; Mutations — Variables, Fragments, Aliases, Inline Fragments
      </h2>
      <p>
        GraphQL operations are written in the GraphQL query language. Understanding variables, fragments, and aliases
        is essential for building maintainable frontend code.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`# Query with variables (always use variables, never string interpolation)
query GetPost($id: ID!) {
  post(id: $id) {
    id
    title
    body
    publishedAt
    author {
      id
      username
      email
    }
  }
}
# Variables JSON: { "id": "post-123" }

# Fragments — reusable field selections
fragment UserFields on User {
  id
  username
  email
  role
}

query GetUsers {
  users {
    ...UserFields
    posts(limit: 3) {
      id
      title
    }
  }
}

# Aliases — rename fields to avoid collisions
query GetTwoUsers($id1: ID!, $id2: ID!) {
  firstUser: user(id: $id1) { ...UserFields }
  secondUser: user(id: $id2) { ...UserFields }
}

# Inline fragments for union / interface types
query SearchResults($query: String!) {
  search(query: $query) {
    ... on User {
      id
      username
    }
    ... on Post {
      id
      title
      author { username }
    }
  }
}

# Mutation with input type
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    status
    publishedAt
    author {
      username
    }
  }
}
# Variables: { "input": { "title": "My Post", "tags": ["graphql"] } }`}</pre>
      </div>

      {/* Section 5: Apollo Client React */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        5. Apollo Client (React) — useQuery, useMutation, useSubscription, Cache Policies
      </h2>
      <p>
        Apollo Client is the standard GraphQL client for React applications. It manages the network layer, caching,
        and loading/error states, and provides React hooks for every operation type.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install @apollo/client graphql`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`// apollo-client.ts — provider setup
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: { ...headers, authorization: token ? \`Bearer \${token}\` : '' },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Wrap your app
export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`// PostList.tsx — useQuery
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql\`
  query GetPosts($limit: Int!) {
    posts(limit: $limit) {
      id
      title
      status
      author { username }
    }
  }
\`;

export function PostList() {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { limit: 10 },
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.posts.map(post => (
        <li key={post.id}>{post.title} — {post.author.username}</li>
      ))}
    </ul>
  );
}

// CreatePost.tsx — useMutation with cache update
import { useMutation, gql } from '@apollo/client';

const CREATE_POST = gql\`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      status
    }
  }
\`;

export function CreatePostForm() {
  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    refetchQueries: ['GetPosts'],
    // Or update cache manually:
    // update(cache, { data }) {
    //   cache.modify({ fields: { posts(existing) { return [...existing, data.createPost]; } } });
    // }
  });

  async function handleSubmit(title: string) {
    await createPost({ variables: { input: { title } } });
  }

  return (
    <button onClick={() => handleSubmit('New Post')} disabled={loading}>
      {loading ? 'Creating...' : 'Create Post'}
    </button>
  );
}`}</pre>
      </div>

      {/* Section 6: DataLoader */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        6. DataLoader — Solving the N+1 Problem with Batching and Caching
      </h2>
      <p>
        The N+1 problem is the most common GraphQL performance issue. Without DataLoader, resolving{' '}
        <code>posts[].author</code> for 100 posts fires 100 separate database queries. DataLoader batches all
        <code>load()</code> calls from a single event loop tick into one query.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install dataloader`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';

// Create a DataLoader factory — call this once per request, NOT per query
export function createUserLoader(prisma: PrismaClient) {
  return new DataLoader<string, User>(
    async (userIds: readonly string[]) => {
      // ONE batched query instead of N individual queries
      const users = await prisma.user.findMany({
        where: { id: { in: [...userIds] } },
      });

      // IMPORTANT: must return results in the SAME ORDER as input keys
      const userMap = new Map(users.map(u => [u.id, u]));
      return userIds.map(id => userMap.get(id) ?? new Error(\`User \${id} not found\`));
    },
    {
      cache: true,   // default: cache within request (same id → same result)
      maxBatchSize: 100,
    }
  );
}

// Use in Apollo Server context (create per request)
const server = new ApolloServer({ typeDefs, resolvers });
await startStandaloneServer(server, {
  context: async () => ({
    db: prisma,
    userLoader: createUserLoader(prisma),   // new instance per request!
    postLoader: createPostLoader(prisma),
  }),
});

// In resolver — loader.load() vs loader.loadMany()
const resolvers = {
  Post: {
    author: (post, _args, { userLoader }) => {
      return userLoader.load(post.authorId);   // single key
    },
  },
  User: {
    posts: (user, _args, { postsByAuthorLoader }) => {
      return postsByAuthorLoader.load(user.id);  // batched by author
    },
  },
};`}</pre>
      </div>

      {/* Section 7: Subscriptions */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        7. Subscriptions — WebSocket Transport, graphql-ws, Real-time Updates
      </h2>
      <p>
        GraphQL subscriptions enable real-time bidirectional communication via WebSockets. The <code>graphql-ws</code>{' '}
        library is the modern standard, replacing the older <code>subscriptions-transport-ws</code>.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install graphql-ws ws @graphql-tools/schema`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`// Server-side: Apollo Server 4 + graphql-ws
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const POST_PUBLISHED = 'POST_PUBLISHED';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Mutation: {
      publishPost: async (_parent, { id }, { db }) => {
        const post = await db.post.update({
          where: { id },
          data: { status: 'PUBLISHED', publishedAt: new Date() },
        });
        // Publish event to all subscribers
        await pubsub.publish(POST_PUBLISHED, { postPublished: post });
        return post;
      },
    },
    Subscription: {
      postPublished: {
        subscribe: () => pubsub.asyncIterator([POST_PUBLISHED]),
      },
    },
  },
});

const httpServer = createServer(app);
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
useServer({ schema }, wsServer);
httpServer.listen(4000);`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`// Client-side: Apollo Client + GraphQL WS
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000/graphql' })
);

// Split traffic: subscriptions go to WS, queries/mutations to HTTP
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink
);

// useSubscription hook
import { useSubscription, gql } from '@apollo/client';

const POST_PUBLISHED_SUB = gql\`
  subscription OnPostPublished {
    postPublished {
      id
      title
      author { username }
    }
  }
\`;

function LiveFeed() {
  const { data } = useSubscription(POST_PUBLISHED_SUB);
  return <div>Latest: {data?.postPublished?.title}</div>;
}`}</pre>
      </div>

      {/* Section 8: Authentication & Authorization */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        8. Authentication &amp; Authorization — JWT Context, Field-level Auth, graphql-shield
      </h2>
      <p>
        GraphQL does not have a built-in auth mechanism. The standard pattern is to extract and verify a JWT in the
        Apollo Server <code>context</code> function and attach the user to context, making it available to all resolvers.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

// Context function: extract user from JWT
const context = async ({ req }) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  let user = null;
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    } catch {
      // Invalid token — context.user remains null
    }
  }
  return { user, db: prisma };
};

// Resolver-level auth
const resolvers = {
  Query: {
    me: (_parent, _args, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' }
      });
      return prisma.user.findUnique({ where: { id: user.id } });
    },
  },
  Mutation: {
    deletePost: async (_parent, { id }, { user, db }) => {
      if (!user) throw new GraphQLError('Not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' }
      });
      const post = await db.post.findUnique({ where: { id } });
      if (post?.authorId !== user.id && user.role !== 'ADMIN') {
        throw new GraphQLError('Not authorized', {
          extensions: { code: 'FORBIDDEN' }
        });
      }
      await db.post.delete({ where: { id } });
      return true;
    },
  },
};`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`// graphql-shield: declarative field-level permissions
npm install graphql-shield

import { shield, rule, and } from 'graphql-shield';

const isAuthenticated = rule()((_parent, _args, ctx) => ctx.user !== null);
const isAdmin = rule()((_parent, _args, ctx) => ctx.user?.role === 'ADMIN');
const isPostAuthor = rule()(async (post, _args, ctx) => {
  return post.authorId === ctx.user?.id;
});

export const permissions = shield({
  Query: {
    me: isAuthenticated,
    users: isAdmin,
  },
  Mutation: {
    createPost: isAuthenticated,
    deletePost: and(isAuthenticated, isPostAuthor),
    adminAction: isAdmin,
  },
});`}</pre>
      </div>

      {/* Section 9: Code Generation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        9. Code Generation — graphql-codegen, Typed Hooks, Schema Registry
      </h2>
      <p>
        <strong>graphql-codegen</strong> auto-generates TypeScript types and React hooks directly from your GraphQL
        schema and operation documents. This eliminates manual type definitions and catches breaking changes at
        build time.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript \
  @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`# codegen.yml
overwrite: true
schema: "http://localhost:4000/graphql"   # or local schema.graphql
documents: "src/**/*.graphql"             # or gql tagged templates
generates:
  src/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      withHooks: true
      withRefetchFn: true
      scalars:
        DateTime: string
        JSON: Record<string, unknown>`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`# Run codegen
npx graphql-codegen --config codegen.yml

# Watch mode during development
npx graphql-codegen --config codegen.yml --watch

# Generated hook usage (fully typed)
import { useGetPostsQuery, useCreatePostMutation } from '@/generated/graphql';

function PostsPage() {
  // data is fully typed — no manual type annotations needed
  const { data, loading } = useGetPostsQuery({
    variables: { limit: 10 },
  });

  const [createPost] = useCreatePostMutation({
    refetchQueries: ['GetPosts'],
  });

  return (
    <div>
      {data?.posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}</pre>
      </div>

      {/* Section 10: Performance */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        10. Performance — Query Complexity, Depth Limiting, APQ, Response Caching
      </h2>
      <p>
        GraphQL's flexibility can be exploited for denial-of-service attacks. A deeply nested or very broad query
        can cause the server to execute thousands of database calls. Protect your API with multiple layers of
        defense.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install graphql-depth-limit graphql-query-complexity`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`import depthLimit from 'graphql-depth-limit';
import {
  createComplexityLimitRule,
  fieldExtensionsEstimator,
  simpleEstimator,
} from 'graphql-query-complexity';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimit(5),                   // reject queries nested > 5 levels
    createComplexityLimitRule(1000, {
      estimators: [
        fieldExtensionsEstimator(),  // use @complexity schema directive
        simpleEstimator({ defaultComplexity: 1 }),
      ],
      formatErrorMessage: (cost) =>
        \`Query complexity \${cost} exceeds the limit of 1000\`,
    }),
  ],
});

// Automatic Persisted Queries (APQ) — reduce bandwidth + block arbitrary queries
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { generatePersistedQueryIdsFromManifest } from '@apollo/generate-persisted-query-manifest';

const persistedQueriesLink = createPersistedQueryLink({
  sha256: /* hash function */,
});
const client = new ApolloClient({
  link: persistedQueriesLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Response caching with @cacheControl directive (Apollo Server)
// schema.graphql
# type Post @cacheControl(maxAge: 60) {
#   id: ID!
#   title: String!
#   body: String @cacheControl(maxAge: 30)
# }

// In-memory cache with Redis for production
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import KeyvRedis from '@keyv/redis';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    responseCachePlugin({
      cache: new KeyvRedis('redis://localhost:6379'),
    }),
  ],
});`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Performance Checklist
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Issue</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>N+1 queries</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>DataLoader (batching + caching)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>DDoS via complex queries</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>graphql-depth-limit + complexity limits</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Large query payloads</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Automatic Persisted Queries (APQ)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Repeated identical queries</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Response caching with @cacheControl</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Stale frontend data</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Apollo Client cache policies + refetchQueries</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Slow resolver discovery</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Apollo Studio tracing + opentelemetry</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bonus: Error Handling, Federation, and Testing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Bonus: Error Handling, Custom Scalars, and Apollo Federation
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Structured Error Handling
      </h3>
      <p>
        GraphQL always returns HTTP 200 even for errors — error details are in the <code>errors</code> array of the
        response. Use <code>GraphQLError</code> with <code>extensions</code> to send structured, typed errors that
        the client can handle programmatically.
      </p>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`import { GraphQLError } from 'graphql';

// Custom error codes — clients can switch on extensions.code
function throwNotFound(resource: string, id: string): never {
  throw new GraphQLError(\`\${resource} with id \${id} not found\`, {
    extensions: {
      code: 'NOT_FOUND',
      resource,
      id,
    },
  });
}

function throwValidation(message: string, field: string): never {
  throw new GraphQLError(message, {
    extensions: {
      code: 'VALIDATION_ERROR',
      field,
    },
  });
}

// Apollo Server formatError: sanitize errors before sending to client
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (formattedError, error) => {
    // Don't expose internal server errors in production
    if (process.env.NODE_ENV === 'production') {
      if (formattedError.extensions?.code === 'INTERNAL_SERVER_ERROR') {
        return { message: 'Internal server error' };
      }
    }
    return formattedError;
  },
});

// Client-side error handling
const { data, error } = useQuery(GET_POST, { variables: { id } });
if (error) {
  const code = error.graphQLErrors[0]?.extensions?.code;
  if (code === 'NOT_FOUND') return <NotFound />;
  if (code === 'UNAUTHENTICATED') return <LoginPrompt />;
}`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Custom Scalars — DateTime, JSON, URL
      </h3>
      <p>
        GraphQL's built-in scalars (String, Int, Float, Boolean, ID) cover basic types. Define custom scalars for
        domain-specific validation like ISO date strings, URLs, and email addresses.
      </p>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install graphql-scalars

// Using graphql-scalars package (pre-built validators)
import {
  DateTimeResolver,
  EmailAddressResolver,
  URLResolver,
  JSONResolver,
} from 'graphql-scalars';

const typeDefs = gql\`
  scalar DateTime
  scalar EmailAddress
  scalar URL
  scalar JSON

  type User {
    id: ID!
    email: EmailAddress!
    website: URL
    createdAt: DateTime!
    preferences: JSON
  }
\`;

const resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  JSON: JSONResolver,
  // ... other resolvers
};

// Custom scalar from scratch
import { GraphQLScalarType, Kind } from 'graphql';

const PositiveIntScalar = new GraphQLScalarType({
  name: 'PositiveInt',
  description: 'An integer greater than zero',
  serialize: (value) => {
    if (typeof value !== 'number' || value <= 0) {
      throw new Error('PositiveInt must be a positive integer');
    }
    return value;
  },
  parseValue: (value) => {
    if (typeof value !== 'number' || value <= 0) {
      throw new Error('PositiveInt must be a positive integer');
    }
    return value;
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT && parseInt(ast.value) > 0) {
      return parseInt(ast.value);
    }
    throw new Error('PositiveInt must be a positive integer');
  },
});`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Apollo Federation — Distributed Supergraph
      </h3>
      <p>
        Apollo Federation allows you to split a single GraphQL API across multiple independent microservices, each
        owning a slice of the schema. A <strong>Router</strong> (gateway) combines them into one unified supergraph.
      </p>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install @apollo/subgraph

// users-service: defines and owns the User type
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql\`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

  type User @key(fields: "id") {
    id: ID!
    email: String!
    username: String!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
  }
\`;

const resolvers = {
  User: {
    __resolveReference: async ({ id }, { db }) => {
      return db.user.findUnique({ where: { id } });
    },
  },
  Query: {
    user: (_, { id }, { db }) => db.user.findUnique({ where: { id } }),
    users: (_, __, { db }) => db.user.findMany(),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

// posts-service: extends User from users-service
const postTypeDefs = gql\`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@external"])

  type User @key(fields: "id") {
    id: ID! @external
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    authorId: ID!
  }
\`;`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Testing GraphQL APIs
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install --save-dev @apollo/server jest @types/jest

// Unit test a resolver directly
import { resolvers } from '../resolvers';

test('user resolver returns user by id', async () => {
  const mockDb = {
    user: { findUnique: jest.fn().mockResolvedValue({ id: '1', email: 'a@b.com' }) },
  };
  const result = await resolvers.Query.user(null, { id: '1' }, { db: mockDb, user: null });
  expect(result).toEqual({ id: '1', email: 'a@b.com' });
  expect(mockDb.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
});

// Integration test the full Apollo Server
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../schema';
import { resolvers } from '../resolvers';

test('GET_POST query returns post', async () => {
  const testServer = new ApolloServer({ typeDefs, resolvers });

  const response = await testServer.executeOperation({
    query: \`query GetPost($id: ID!) { post(id: $id) { id title } }\`,
    variables: { id: 'post-1' },
  }, {
    contextValue: { db: mockPrisma, user: { id: 'user-1', role: 'USER' } },
  });

  expect(response.body.kind).toBe('single');
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.post?.title).toBe('Test Post');
});`}</pre>
      </div>

      {/* Quick Tool CTA */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginTop: '2rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0 }}>
          Need to inspect or format a GraphQL response payload?{' '}
          <Link href="https://viadreams.cc/en/tools/json-formatter" style={{ color: '#0284c7', fontWeight: 600 }}>
            Try our free JSON Formatter tool
          </Link>{' '}
          — prettify, validate, and explore nested JSON objects from any GraphQL API response instantly.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem', marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem', color: '#1e293b', marginTop: 0 }}>
          Key Takeaways
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>GraphQL eliminates over-fetching and under-fetching by letting clients declare exactly what data they need — use <strong>variables</strong> in all operations, never string interpolation.</li>
          <li style={{ marginBottom: '0.5rem' }}>Design your <strong>schema-first</strong>: define types, interfaces, unions, and input types before writing resolvers — the schema is the contract.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>DataLoader</strong> is non-negotiable for field resolvers on nested types — always create a new instance per request to avoid cross-request cache contamination.</li>
          <li style={{ marginBottom: '0.5rem' }}>Use <strong>context</strong> for per-request state (authenticated user, DataLoader instances, DB connection) — never use module-level singletons for request state.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>graphql-codegen</strong> + TypeScript eliminates an entire class of bugs — run it in watch mode during development.</li>
          <li style={{ marginBottom: '0.5rem' }}>Add <strong>depth limiting</strong> and <strong>query complexity limits</strong> before going to production to prevent DoS attacks.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Apollo Client</strong> normalized cache is powerful but requires understanding — use <code>cache-and-network</code> for real-time UIs, <code>cache-first</code> for static data.</li>
          <li>Use <strong>Persisted Queries (APQ)</strong> in production to reduce bandwidth, improve CDN caching, and prevent arbitrary query execution.</li>
        </ul>
      </div>
    </article>
  );
}
