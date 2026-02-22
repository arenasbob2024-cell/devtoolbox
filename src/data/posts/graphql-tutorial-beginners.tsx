'use client';

import Link from 'next/link';

export default function GraphqlTutorialBeginners({ lang }: { lang: string }) {
  return (
    <>
      <h2>What is GraphQL?</h2>
      <p>
        <strong>GraphQL</strong> is a query language for APIs and a runtime for executing those
        queries against your data. Developed by Facebook in 2012 and open-sourced in 2015, GraphQL
        provides a complete and understandable description of the data in your API, gives clients the
        power to ask for exactly what they need, makes it easier to evolve APIs over time, and enables
        powerful developer tools. Unlike REST APIs where you hit different endpoints for different
        resources, GraphQL uses a single endpoint where clients specify exactly what data they want.
      </p>

      <h2>GraphQL vs REST: Key Differences</h2>
      <p>
        Understanding how GraphQL differs from REST is the first step to appreciating its value. Here
        is a side-by-side comparison of the two approaches. For a deeper dive, see our{' '}
        <Link href={`/${lang}/blog/graphql-vs-rest-api`}>GraphQL vs REST API comparison</Link>.
      </p>
      <table>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>REST</th>
            <th>GraphQL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Endpoints</strong></td>
            <td>Multiple (one per resource)</td>
            <td>Single endpoint</td>
          </tr>
          <tr>
            <td><strong>Data Fetching</strong></td>
            <td>Server decides what to return</td>
            <td>Client specifies exact fields</td>
          </tr>
          <tr>
            <td><strong>Over-fetching</strong></td>
            <td>Common (returns all fields)</td>
            <td>Eliminated (only requested fields)</td>
          </tr>
          <tr>
            <td><strong>Under-fetching</strong></td>
            <td>Multiple requests needed</td>
            <td>Single query for nested data</td>
          </tr>
          <tr>
            <td><strong>Versioning</strong></td>
            <td>/api/v1/, /api/v2/</td>
            <td>No versioning needed</td>
          </tr>
          <tr>
            <td><strong>Type System</strong></td>
            <td>Optional (OpenAPI/Swagger)</td>
            <td>Built-in schema and types</td>
          </tr>
          <tr>
            <td><strong>Real-time</strong></td>
            <td>WebSockets or polling</td>
            <td>Built-in subscriptions</td>
          </tr>
        </tbody>
      </table>

      <h2>Core Concepts</h2>
      <h3>Schema Definition Language (SDL)</h3>
      <p>
        The schema is the foundation of every GraphQL API. It defines the types of data available,
        the relationships between types, and what operations clients can perform. The Schema
        Definition Language (SDL) is used to write these schemas.
      </p>
      <pre><code className="language-graphql">{`# Schema Definition Language (SDL)

# Define custom types
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
  profile: Profile
  createdAt: String!
}

type Post {
  id: ID!
  title: String!
  content: String!
  published: Boolean!
  author: User!
  comments: [Comment!]!
  tags: [String!]!
  createdAt: String!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}

type Profile {
  bio: String
  avatar: String
  website: String
  socialLinks: [String!]
}

# Root Query type — defines all read operations
type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  post(id: ID!): Post
  posts(published: Boolean, authorId: ID): [Post!]!
  searchPosts(term: String!): [Post!]!
}

# Mutation type — defines all write operations
type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
  createPost(input: CreatePostInput!): Post!
  publishPost(id: ID!): Post!
}

# Input types for mutations
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}

input CreatePostInput {
  title: String!
  content: String!
  authorId: ID!
  tags: [String!]
}`}</code></pre>

      <h3>Scalar Types</h3>
      <p>
        GraphQL includes five built-in scalar types. The exclamation mark (<code>!</code>) indicates
        a non-nullable field.
      </p>
      <ul>
        <li><strong>String</strong> — UTF-8 character sequence</li>
        <li><strong>Int</strong> — 32-bit signed integer</li>
        <li><strong>Float</strong> — Double-precision floating-point</li>
        <li><strong>Boolean</strong> — true or false</li>
        <li><strong>ID</strong> — Unique identifier (serialized as String)</li>
      </ul>

      <h2>Writing Queries</h2>
      <p>
        Queries are how you read data in GraphQL. The beauty of GraphQL queries is that the response
        shape mirrors the query shape exactly.
      </p>
      <pre><code className="language-graphql">{`# Basic query — fetch specific fields
query GetUser {
  user(id: "123") {
    name
    email
  }
}

# Response:
# {
#   "data": {
#     "user": {
#       "name": "Alice Johnson",
#       "email": "alice@example.com"
#     }
#   }
# }

# Nested query — fetch related data in one request
query GetUserWithPosts {
  user(id: "123") {
    name
    email
    posts {
      title
      published
      comments {
        text
        author {
          name
        }
      }
    }
  }
}

# Query with variables — parameterized queries
query GetUser($userId: ID!) {
  user(id: $userId) {
    name
    email
    posts(published: true) {
      title
      tags
    }
  }
}
# Variables: { "userId": "123" }

# Multiple queries in one request
query Dashboard {
  currentUser: user(id: "123") {
    name
    email
  }
  recentPosts: posts(published: true) {
    title
    author {
      name
    }
  }
}`}</code></pre>

      <h2>Writing Mutations</h2>
      <p>
        Mutations are used to create, update, or delete data. They follow a similar syntax to queries
        but use the <code>mutation</code> keyword.
      </p>
      <pre><code className="language-graphql">{`# Create a new user
mutation CreateUser {
  createUser(input: {
    name: "Bob Smith"
    email: "bob@example.com"
    age: 28
  }) {
    id
    name
    email
  }
}

# Update with variables (recommended approach)
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
  }
}
# Variables:
# {
#   "id": "123",
#   "input": { "name": "Alice Smith", "age": 30 }
# }

# Create a post
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    content
    published
    author {
      name
    }
  }
}
# Variables:
# {
#   "input": {
#     "title": "Getting Started with GraphQL",
#     "content": "GraphQL is a query language...",
#     "authorId": "123",
#     "tags": ["graphql", "api", "tutorial"]
#   }
# }`}</code></pre>

      <h2>Building a GraphQL Server with Node.js</h2>
      <p>
        Let us build a complete GraphQL server using Apollo Server, the most popular GraphQL server
        implementation for Node.js.
      </p>
      <pre><code className="language-bash">{`# Initialize project
mkdir graphql-server && cd graphql-server
npm init -y
npm install @apollo/server graphql
npm install -D typescript @types/node tsx`}</code></pre>

      <pre><code className="language-typescript">{`// server.ts — Complete Apollo Server setup
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Type definitions (schema)
const typeDefs = \`#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts(published: Boolean): [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
    publishPost(id: ID!): Post!
  }
\`;

// In-memory data store (replace with database in production)
let users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

let posts = [
  { id: '1', title: 'GraphQL Basics', content: '...',
    published: true, authorId: '1' },
  { id: '2', title: 'Advanced Queries', content: '...',
    published: false, authorId: '1' },
];

// Resolvers — implement the schema operations
const resolvers = {
  Query: {
    users: () => users,
    user: (_: unknown, { id }: { id: string }) =>
      users.find(u => u.id === id),
    posts: (_: unknown, { published }: { published?: boolean }) =>
      published !== undefined
        ? posts.filter(p => p.published === published)
        : posts,
    post: (_: unknown, { id }: { id: string }) =>
      posts.find(p => p.id === id),
  },
  Mutation: {
    createUser: (_: unknown, { name, email }: {
      name: string; email: string
    }) => {
      const user = {
        id: String(users.length + 1), name, email
      };
      users.push(user);
      return user;
    },
    createPost: (_: unknown, { title, content, authorId }: {
      title: string; content: string; authorId: string
    }) => {
      const post = {
        id: String(posts.length + 1),
        title, content, authorId, published: false
      };
      posts.push(post);
      return post;
    },
    publishPost: (_: unknown, { id }: { id: string }) => {
      const post = posts.find(p => p.id === id);
      if (!post) throw new Error('Post not found');
      post.published = true;
      return post;
    },
  },
  // Field resolvers for relationships
  User: {
    posts: (parent: { id: string }) =>
      posts.filter(p => p.authorId === parent.id),
  },
  Post: {
    author: (parent: { authorId: string }) =>
      users.find(u => u.id === parent.authorId),
  },
};

// Start the server
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(\`GraphQL server ready at \${url}\`);`}</code></pre>

      <h2>Client-Side Integration with React</h2>
      <p>
        Apollo Client is the most popular GraphQL client for React applications. It provides
        caching, loading states, error handling, and real-time updates out of the box.
      </p>
      <pre><code className="language-typescript">{`// Setup Apollo Client in a React app
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from '@apollo/client';

// Initialize client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// Wrap your app
function App() {
  return (
    <ApolloProvider client={client}>
      <UserList />
    </ApolloProvider>
  );
}

// Define queries
const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
      posts {
        id
        title
        published
      }
    }
  }
\`;

const CREATE_USER = gql\`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
\`;

// Use in components
function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      {data.users.map((user: any) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.posts.length} posts</p>
        </div>
      ))}
      <button onClick={() => createUser({
        variables: { name: 'New User', email: 'new@test.com' }
      })}>
        Add User
      </button>
    </div>
  );
}`}</code></pre>

      <h2>Fragments: Reusable Query Pieces</h2>
      <p>
        Fragments let you define reusable sets of fields that you can include in multiple queries.
        This reduces duplication and keeps queries maintainable.
      </p>
      <pre><code className="language-graphql">{`# Define reusable fragments
fragment UserBasicInfo on User {
  id
  name
  email
}

fragment PostSummary on Post {
  id
  title
  published
  createdAt
}

# Use fragments in queries
query Dashboard {
  currentUser: user(id: "123") {
    ...UserBasicInfo
    posts {
      ...PostSummary
    }
  }
  recentPosts: posts(published: true) {
    ...PostSummary
    author {
      ...UserBasicInfo
    }
  }
}`}</code></pre>

      <h2>Error Handling</h2>
      <p>
        GraphQL handles errors differently from REST. Instead of HTTP status codes, GraphQL always
        returns HTTP 200 and includes errors in the response body alongside any partial data.
      </p>
      <pre><code className="language-typescript">{`// Server-side: Custom error handling
import { GraphQLError } from 'graphql';

const resolvers = {
  Query: {
    user: async (_: unknown, { id }: { id: string }) => {
      const user = await db.users.findById(id);

      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'NOT_FOUND',
            argumentName: 'id',
          },
        });
      }

      return user;
    },
  },
  Mutation: {
    createUser: async (_: unknown, { input }: any) => {
      const existing = await db.users.findByEmail(input.email);

      if (existing) {
        throw new GraphQLError('Email already registered', {
          extensions: {
            code: 'DUPLICATE_EMAIL',
            field: 'email',
          },
        });
      }

      return db.users.create(input);
    },
  },
};

// Client-side: Error handling in React
function UserProfile({ id }: { id: string }) {
  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id },
    errorPolicy: 'all', // Return partial data with errors
  });

  if (error) {
    const notFound = error.graphQLErrors.some(
      (e) => e.extensions?.code === 'NOT_FOUND'
    );
    if (notFound) return <NotFoundPage />;
    return <ErrorMessage error={error} />;
  }

  return data ? <Profile user={data.user} /> : null;
}`}</code></pre>

      <h2>Subscriptions: Real-Time Data</h2>
      <p>
        GraphQL subscriptions enable real-time updates via WebSocket connections. They are perfect
        for chat applications, live dashboards, and notification systems.
      </p>
      <pre><code className="language-graphql">{`# Schema definition with subscription
type Subscription {
  postPublished: Post!
  commentAdded(postId: ID!): Comment!
  userOnlineStatus(userId: ID!): OnlineStatus!
}

type OnlineStatus {
  userId: ID!
  isOnline: Boolean!
  lastSeen: String
}

# Client usage
subscription OnNewComment($postId: ID!) {
  commentAdded(postId: $postId) {
    id
    text
    author {
      name
      avatar
    }
  }
}`}</code></pre>

      <h2>Best Practices for Production</h2>
      <ul>
        <li><strong>Use query complexity analysis</strong> to prevent expensive queries from overwhelming your server</li>
        <li><strong>Implement DataLoader</strong> for batching and caching database queries to solve the N+1 problem</li>
        <li><strong>Enable persisted queries</strong> to reduce network payload and improve security</li>
        <li><strong>Set query depth limits</strong> to prevent deeply nested malicious queries</li>
        <li><strong>Use fragments</strong> to keep queries DRY and maintainable</li>
        <li><strong>Implement proper pagination</strong> using cursor-based connections (Relay spec)</li>
        <li><strong>Add authentication middleware</strong> using context to pass user info to resolvers</li>
        <li><strong>Generate TypeScript types</strong> from your schema using tools like{' '}
          <Link href={`/${lang}/blog/graphql-type-generation`}>GraphQL code generators</Link></li>
        <li><strong>Monitor query performance</strong> with Apollo Studio or similar observability tools</li>
        <li><strong>Version your schema carefully</strong> — deprecate fields instead of removing them</li>
      </ul>

      <h2>GraphQL Tooling Ecosystem</h2>
      <p>
        The GraphQL ecosystem includes powerful developer tools. Use GraphQL Playground or Apollo
        Sandbox for interactive query building and testing. For type generation, explore our{' '}
        <Link href={`/${lang}/tools/json-to-graphql`}>JSON to GraphQL converter</Link> to quickly
        generate schemas from existing JSON data. You can also check{' '}
        <Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link> for generating
        TypeScript types from your API responses.
      </p>

      <h2>Summary</h2>
      <p>
        GraphQL transforms how frontend and backend teams collaborate. Clients request exactly the
        data they need, the type system catches errors at development time, and the single endpoint
        simplifies API management. Start with queries and mutations, add real-time subscriptions when
        needed, and follow production best practices to build robust, scalable APIs. For more API
        guides, see our <Link href={`/${lang}/blog/rest-api-best-practices-guide`}>REST API Best
        Practices</Link> and{' '}
        <Link href={`/${lang}/blog/api-rate-limiting-guide`}>API Rate Limiting Guide</Link>.
      </p>
    </>
  );
}
