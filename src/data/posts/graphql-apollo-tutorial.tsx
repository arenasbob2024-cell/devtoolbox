'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'GraphQL with Apollo: Complete React Tutorial',
    intro: 'GraphQL has transformed how frontend applications fetch data from APIs. Instead of multiple REST endpoints returning fixed data shapes, GraphQL lets you request exactly the data you need in a single query. Apollo Client is the most popular GraphQL client for React, providing caching, state management, and developer tools out of the box. This tutorial walks you through building a complete React application with Apollo Client from scratch.',

    whatIsGraphqlTitle: 'What Is GraphQL?',
    whatIsGraphqlDesc1: 'GraphQL is a query language for APIs and a runtime for executing those queries. Developed by Facebook in 2012 and open-sourced in 2015, it provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need, and makes it easier to evolve APIs over time.',
    whatIsGraphqlDesc2: 'Unlike REST, where each endpoint returns a fixed data structure, GraphQL exposes a single endpoint. The client sends a query describing the exact shape of data it needs, and the server responds with precisely that shape. This eliminates over-fetching (getting more data than needed) and under-fetching (needing multiple requests to assemble the required data).',
    graphqlVsRestTitle: 'GraphQL vs REST: Key Differences',

    setupTitle: 'Setting Up Apollo Client in React',
    setupDesc: 'Apollo Client provides everything you need to manage GraphQL data in a React application: a declarative data fetching API, an intelligent normalized cache, and excellent developer tools.',
    setupCode: `// 1. Install dependencies
// npm install @apollo/client graphql

// 2. src/lib/apollo-client.ts
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
});

// Authentication middleware
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token');
  return {
    headers: {
      ...headers,
      authorization: token ? \`Bearer \${token}\` : '',
    },
  };
});

// Error handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        \`[GraphQL error]: Message: \${message}, Path: \${path}\`
      );
    });
  }
  if (networkError) {
    console.error(\`[Network error]: \${networkError}\`);
  }
});

// Create the Apollo Client instance
export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: ['filter'],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

// 3. src/app/providers.tsx
'use client';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}`,

    queriesTitle: 'Writing GraphQL Queries',
    queriesDesc: 'GraphQL queries describe the exact data shape you need. Apollo Client provides the useQuery hook that handles loading states, errors, and caching automatically.',
    queriesCode: `// src/graphql/queries.ts
import { gql } from '@apollo/client';

// Fragment for reusable fields
export const USER_FIELDS = gql\`
  fragment UserFields on User {
    id
    name
    email
    avatar
    role
  }
\`;

export const POST_FIELDS = gql\`
  fragment PostFields on Post {
    id
    title
    slug
    excerpt
    content
    publishedAt
    tags
    author {
      ...UserFields
    }
  }
  \${USER_FIELDS}
\`;

// Query: Get all posts with pagination
export const GET_POSTS = gql\`
  query GetPosts($limit: Int!, $offset: Int!, $filter: PostFilter) {
    posts(limit: $limit, offset: $offset, filter: $filter) {
      ...PostFields
    }
    postsCount(filter: $filter)
  }
  \${POST_FIELDS}
\`;

// Query: Get single post by slug
export const GET_POST = gql\`
  query GetPost($slug: String!) {
    post(slug: $slug) {
      ...PostFields
      comments {
        id
        body
        createdAt
        author {
          ...UserFields
        }
      }
    }
  }
  \${POST_FIELDS}
\`;

// Query: Get current user
export const GET_ME = gql\`
  query GetMe {
    me {
      ...UserFields
      posts {
        id
        title
        publishedAt
      }
    }
  }
  \${USER_FIELDS}
\`;`,

    useQueryTitle: 'Using useQuery in Components',
    useQueryDesc: 'The useQuery hook is the primary way to fetch data with Apollo Client. It returns loading, error, and data states, plus refetch and fetchMore functions for pagination.',
    useQueryCode: `// src/components/PostList.tsx
'use client';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@/graphql/queries';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author: { name: string; avatar: string };
  tags: string[];
}

const POSTS_PER_PAGE = 10;

export function PostList() {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      limit: POSTS_PER_PAGE,
      offset: 0,
      filter: { published: true },
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <div>Error: {error.message}</div>;
  if (loading && !data) return <div>Loading posts...</div>;

  const { posts, postsCount } = data;
  const hasMore = posts.length < postsCount;

  const loadMore = () => {
    fetchMore({
      variables: { offset: posts.length },
    });
  };

  return (
    <div>
      {posts.map((post: Post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <div>
            <img src={post.author.avatar} alt={post.author.name} />
            <span>{post.author.name}</span>
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
          </div>
          <div>
            {post.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      ))}
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}`,

    mutationsTitle: 'Mutations: Creating and Updating Data',
    mutationsDesc: 'Mutations are GraphQL operations that modify server-side data. Apollo Client provides the useMutation hook with optimistic updates, cache manipulation, and automatic refetching capabilities.',
    mutationsCode: `// src/graphql/mutations.ts
import { gql } from '@apollo/client';
import { POST_FIELDS } from './queries';

export const CREATE_POST = gql\`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFields
    }
  }
  \${POST_FIELDS}
\`;

export const UPDATE_POST = gql\`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      ...PostFields
    }
  }
  \${POST_FIELDS}
\`;

export const DELETE_POST = gql\`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
\`;

export const ADD_COMMENT = gql\`
  mutation AddComment($postId: ID!, $body: String!) {
    addComment(postId: $postId, body: $body) {
      id
      body
      createdAt
      author {
        id
        name
        avatar
      }
    }
  }
\`;

// src/components/CreatePostForm.tsx
'use client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '@/graphql/mutations';
import { GET_POSTS } from '@/graphql/queries';

export function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    // Update the cache after mutation
    update(cache, { data: { createPost: newPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: newPost,
              fragment: POST_FIELDS,
            });
            return [newPostRef, ...existingPosts];
          },
          postsCount(existing) {
            return existing + 1;
          },
        },
      });
    },
    // Optimistic response for instant UI feedback
    optimisticResponse: {
      createPost: {
        __typename: 'Post',
        id: 'temp-id',
        title,
        slug: title.toLowerCase().replace(/\\s+/g, '-'),
        excerpt: content.substring(0, 160),
        content,
        publishedAt: new Date().toISOString(),
        tags,
        author: {
          __typename: 'User',
          id: 'current-user',
          name: 'You',
          email: '',
          avatar: '/default-avatar.png',
          role: 'AUTHOR',
        },
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({
        variables: { input: { title, content, tags } },
      });
      setTitle('');
      setContent('');
      setTags([]);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post title"
        required
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your post..."
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}`,

    cachingTitle: 'Apollo Cache: How It Works',
    cachingDesc1: 'Apollo Client uses a normalized, in-memory cache called InMemoryCache. When a query returns data, Apollo breaks the response into individual objects, identifies each by its __typename and id, and stores them in a flat lookup table. If two queries return the same object (same __typename + id), Apollo stores it only once and updates all components referencing it.',
    cachingDesc2: 'This normalization means that when you update a post through a mutation, every component displaying that post automatically re-renders with the new data. No manual state synchronization needed.',
    cachingCode: `// Cache configuration with type policies
const cache = new InMemoryCache({
  typePolicies: {
    // Customize how Post objects are identified
    Post: {
      keyFields: ['slug'], // Use slug instead of id as cache key
    },

    // Pagination: merge incoming results with existing
    Query: {
      fields: {
        posts: {
          keyArgs: ['filter'], // Separate cache entries per filter
          merge(existing = [], incoming, { args }) {
            const offset = args?.offset || 0;
            const merged = existing.slice(0);
            for (let i = 0; i < incoming.length; i++) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
          read(existing, { args }) {
            const offset = args?.offset || 0;
            const limit = args?.limit || existing?.length;
            return existing?.slice(offset, offset + limit);
          },
        },
      },
    },
  },
});

// Reading from cache directly
const post = client.readFragment({
  id: 'Post:my-post-slug',
  fragment: gql\`
    fragment CachedPost on Post {
      id
      title
      content
    }
  \`,
});

// Writing to cache directly
client.writeFragment({
  id: 'Post:my-post-slug',
  fragment: gql\`
    fragment UpdatedPost on Post {
      title
    }
  \`,
  data: { title: 'Updated Title' },
});

// Evicting from cache
client.cache.evict({ id: 'Post:my-post-slug' });
client.cache.gc(); // Garbage collect unreachable refs`,

    subscriptionsTitle: 'Real-Time Data with Subscriptions',
    subscriptionsDesc: 'GraphQL subscriptions enable real-time updates through WebSocket connections. Apollo Client supports subscriptions, letting your UI automatically update when server-side data changes.',
    subscriptionsCode: `// Setup WebSocket link for subscriptions
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
    connectionParams: {
      authToken: localStorage.getItem('auth_token'),
    },
  })
);

// Split traffic: subscriptions via WS, queries/mutations via HTTP
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  from([errorLink, authLink, httpLink])
);

// Subscription definition
const COMMENT_ADDED = gql\`
  subscription OnCommentAdded($postId: ID!) {
    commentAdded(postId: $postId) {
      id
      body
      createdAt
      author {
        id
        name
        avatar
      }
    }
  }
\`;

// Using subscriptions in a component
import { useSubscription } from '@apollo/client';

function PostComments({ postId }: { postId: string }) {
  const { data: subData } = useSubscription(COMMENT_ADDED, {
    variables: { postId },
    onData: ({ client, data }) => {
      // Update cache when new comment arrives
      const newComment = data.data.commentAdded;
      client.cache.modify({
        id: \`Post:\${postId}\`,
        fields: {
          comments(existing = []) {
            const newRef = client.cache.writeFragment({
              data: newComment,
              fragment: gql\`
                fragment NewComment on Comment {
                  id body createdAt
                  author { id name avatar }
                }
              \`,
            });
            return [...existing, newRef];
          },
        },
      });
    },
  });

  // Render comments...
}`,

    errorHandlingTitle: 'Error Handling Patterns',
    errorHandlingDesc: 'Robust error handling is critical for production GraphQL applications. Apollo provides multiple layers of error handling: link-level, query-level, and component-level.',
    errorHandlingCode: `// Comprehensive error handling
import { useQuery, useMutation } from '@apollo/client';

// Custom hook with error categorization
function usePostQuery(slug: string) {
  const { data, loading, error, refetch } = useQuery(GET_POST, {
    variables: { slug },
    errorPolicy: 'all', // Return partial data with errors
    onError: (error) => {
      // Log to error tracking service
      if (error.networkError) {
        trackError('network', error.networkError);
      }
      error.graphQLErrors?.forEach(gqlError => {
        if (gqlError.extensions?.code === 'UNAUTHENTICATED') {
          // Redirect to login
          window.location.href = '/login';
        }
        trackError('graphql', gqlError);
      });
    },
  });

  // Categorize the error for the UI
  const errorInfo = error
    ? {
        isNetwork: !!error.networkError,
        isAuth: error.graphQLErrors?.some(
          e => e.extensions?.code === 'UNAUTHENTICATED'
        ),
        isNotFound: error.graphQLErrors?.some(
          e => e.extensions?.code === 'NOT_FOUND'
        ),
        message: error.message,
      }
    : null;

  return { data, loading, error: errorInfo, refetch };
}

// Retry logic with exponential backoff
import { RetryLink } from '@apollo/client/link/retry';

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 5000,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error, _operation) => !!error,
  },
});`,

    serverTitle: 'Building the GraphQL Server',
    serverDesc: 'A complete Apollo Server setup with type definitions, resolvers, authentication, and data sources.',
    serverCode: `// server.ts — Apollo Server with Express
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';

const typeDefs = \`#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
    role: Role!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    slug: String!
    excerpt: String
    content: String!
    publishedAt: String
    tags: [String!]!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    author: User!
  }

  enum Role { ADMIN AUTHOR READER }

  input PostFilter {
    published: Boolean
    tag: String
    authorId: ID
  }

  input CreatePostInput {
    title: String!
    content: String!
    tags: [String!]
  }

  type Query {
    posts(limit: Int!, offset: Int!, filter: PostFilter): [Post!]!
    postsCount(filter: PostFilter): Int!
    post(slug: String!): Post
    me: User
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    addComment(postId: ID!, body: String!): Comment!
  }

  type Subscription {
    commentAdded(postId: ID!): Comment!
  }
\`;

const resolvers = {
  Query: {
    posts: async (_, { limit, offset, filter }, { dataSources }) => {
      return dataSources.postsAPI.getPosts({ limit, offset, filter });
    },
    post: async (_, { slug }, { dataSources }) => {
      return dataSources.postsAPI.getPostBySlug(slug);
    },
    me: async (_, __, { user }) => user,
  },
  Mutation: {
    createPost: async (_, { input }, { user, dataSources }) => {
      if (!user) throw new Error('Authentication required');
      return dataSources.postsAPI.createPost(input, user.id);
    },
  },
  Post: {
    author: async (post, _, { dataSources }) => {
      return dataSources.usersAPI.getUser(post.authorId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

const app = express();
app.use('/graphql', express.json(), expressMiddleware(server, {
  context: async ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const user = token ? await verifyToken(token) : null;
    return { user, dataSources: createDataSources() };
  },
}));

app.listen(4000);`,

    bestPracticesTitle: 'Apollo Client Best Practices',
    bp1: 'Use fragments to share field selections across queries. This eliminates duplication and ensures consistency when the same entity appears in multiple queries.',
    bp2: 'Set appropriate fetch policies per query. Use cache-first for rarely changing data, cache-and-network for frequently updated data, and network-only when you always need fresh data.',
    bp3: 'Implement optimistic responses for mutations that modify visible data. This makes the UI feel instant by updating the cache immediately while the server request is in flight.',
    bp4: 'Use the errorPolicy option to handle partial errors gracefully. Setting it to "all" returns both data and errors, letting you show available data even when some fields fail.',
    bp5: 'Configure type policies for pagination. Apollo will not automatically merge paginated results; you need to define merge and read functions in your cache type policies.',
    bp6: 'Co-locate queries with components. Keep GraphQL operations in the same file or directory as the component that uses them, making it easy to understand data dependencies.',
    bp7: 'Use Apollo DevTools for debugging. The browser extension shows your cache contents, active queries, and mutation history, making it easier to diagnose data issues.',
    bp8: 'Generate TypeScript types from your GraphQL schema using tools like graphql-codegen. This provides end-to-end type safety from schema to component props.',

    faq1q: 'Should I use GraphQL or REST for my project?',
    faq1a: 'Use GraphQL when you have complex, interconnected data that multiple clients (web, mobile) consume differently, or when over-fetching and under-fetching are real performance problems. Use REST when you have simple CRUD operations, need HTTP caching, or your team is already productive with REST. Many teams use both: GraphQL for frontend-facing APIs and REST for internal microservice communication.',
    faq2q: 'Does Apollo Client replace Redux for state management?',
    faq2a: 'Apollo Client replaces Redux for server state (data from APIs). Apollo cache acts as a single source of truth for all server data, eliminating the need for Redux actions and reducers to manage API responses. For client state (UI toggles, form data, theme preferences), you can use Apollo reactive variables, React context, or a lightweight library like Zustand.',
    faq3q: 'How do I handle authentication with Apollo?',
    faq3a: 'Use Apollo Link to attach authentication headers to every request. The setContext link lets you read the auth token from storage and add it to request headers. For token refresh, use an error link that catches 401 responses, refreshes the token, and retries the failed request automatically.',
    faq4q: 'Is GraphQL slower than REST?',
    faq4a: 'GraphQL query parsing and validation add a small overhead compared to REST. However, GraphQL often improves overall performance by reducing the number of network requests (one query instead of multiple REST calls) and eliminating over-fetching. For most applications, the network savings outweigh the parsing overhead. Use persisted queries and response caching for optimal performance.',
    faq5q: 'What alternatives to Apollo Client exist?',
    faq5a: 'The main alternatives are urql (lighter weight, plugin-based), Relay (Facebook, opinionated, compiler-driven), and TanStack Query with graphql-request (familiar API if you already use TanStack Query for REST). Apollo Client has the largest ecosystem, best documentation, and most features, but urql is a strong choice for simpler applications that do not need Apollo full feature set.',

    tryTools: 'Try our related developer tools',
  },
  zh: {
    title: 'GraphQL 与 Apollo：完整 React 教程',
    intro: 'GraphQL 改变了前端应用从 API 获取数据的方式。与多个返回固定数据结构的 REST 端点不同，GraphQL 允许你在一次查询中精确请求所需的数据。Apollo Client 是最流行的 React GraphQL 客户端，开箱即用地提供缓存、状态管理和开发者工具。本教程将带你从零开始使用 Apollo Client 构建完整的 React 应用。',

    whatIsGraphqlTitle: '什么是 GraphQL？',
    whatIsGraphqlDesc1: 'GraphQL 是一种 API 查询语言和执行查询的运行时。由 Facebook 于 2012 年开发并于 2015 年开源，它提供对 API 中数据的完整且可理解的描述，赋予客户端精确请求所需数据的能力，并使 API 更容易随时间演进。',
    whatIsGraphqlDesc2: '与 REST 每个端点返回固定数据结构不同，GraphQL 暴露单个端点。客户端发送描述所需数据精确形状的查询，服务器精确返回该形状的响应。这消除了过度获取（获取多余数据）和不足获取（需要多次请求才能组装所需数据）的问题。',
    graphqlVsRestTitle: 'GraphQL vs REST：关键区别',

    setupTitle: '在 React 中设置 Apollo Client',
    setupDesc: 'Apollo Client 提供管理 React 应用中 GraphQL 数据所需的一切：声明式数据获取 API、智能的规范化缓存和出色的开发者工具。',
    setupCode: `// 1. 安装依赖
// npm install @apollo/client graphql

// 2. src/lib/apollo-client.ts
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// API 的 HTTP 连接
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
});

// 认证中间件
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token');
  return {
    headers: {
      ...headers,
      authorization: token ? \`Bearer \${token}\` : '',
    },
  };
});

// 错误处理
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) => {
      console.error(\`[GraphQL 错误]: \${message}, 路径: \${path}\`);
    });
  }
});

// 创建 Apollo Client 实例
export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});`,

    queriesTitle: '编写 GraphQL 查询',
    queriesDesc: 'GraphQL 查询描述你需要的精确数据形状。Apollo Client 提供 useQuery hook，自动处理加载状态、错误和缓存。',
    queriesCode: `// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_POSTS = gql\`
  query GetPosts($limit: Int!, $offset: Int!) {
    posts(limit: $limit, offset: $offset) {
      id
      title
      slug
      excerpt
      publishedAt
      author { id name avatar }
      tags
    }
    postsCount
  }
\`;`,

    useQueryTitle: '在组件中使用 useQuery',
    useQueryDesc: 'useQuery hook 是使用 Apollo Client 获取数据的主要方式。它返回 loading、error 和 data 状态，以及用于分页的 refetch 和 fetchMore 函数。',
    useQueryCode: `// src/components/PostList.tsx
'use client';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@/graphql/queries';

export function PostList() {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { limit: 10, offset: 0 },
  });

  if (error) return <div>错误: {error.message}</div>;
  if (loading && !data) return <div>加载中...</div>;

  return (
    <div>
      {data.posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}`,

    mutationsTitle: '变更操作：创建和更新数据',
    mutationsDesc: '变更（Mutation）是修改服务端数据的 GraphQL 操作。Apollo Client 提供 useMutation hook，支持乐观更新、缓存操作和自动重新获取。',
    mutationsCode: `// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const CREATE_POST = gql\`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id title slug content publishedAt
      author { id name }
    }
  }
\`;

// 在组件中使用
import { useMutation } from '@apollo/client';

const [createPost, { loading }] = useMutation(CREATE_POST, {
  update(cache, { data }) {
    cache.modify({
      fields: {
        posts(existing = []) {
          const newRef = cache.writeFragment({
            data: data.createPost,
            fragment: gql\`fragment NewPost on Post { id title }\`,
          });
          return [newRef, ...existing];
        },
      },
    });
  },
});`,

    cachingTitle: 'Apollo 缓存：工作原理',
    cachingDesc1: 'Apollo Client 使用名为 InMemoryCache 的规范化内存缓存。当查询返回数据时，Apollo 将响应分解为单个对象，通过 __typename 和 id 标识每个对象，并将它们存储在扁平的查找表中。如果两个查询返回相同的对象（相同的 __typename + id），Apollo 只存储一次并更新所有引用它的组件。',
    cachingDesc2: '这种规范化意味着当你通过变更操作更新一篇文章时，显示该文章的每个组件都会自动使用新数据重新渲染。无需手动状态同步。',
    cachingCode: `// 缓存配置与类型策略
const cache = new InMemoryCache({
  typePolicies: {
    Post: {
      keyFields: ['slug'], // 使用 slug 作为缓存键
    },
    Query: {
      fields: {
        posts: {
          keyArgs: ['filter'],
          merge(existing = [], incoming, { args }) {
            const offset = args?.offset || 0;
            const merged = existing.slice(0);
            for (let i = 0; i < incoming.length; i++) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },
  },
});`,

    subscriptionsTitle: '使用订阅实现实时数据',
    subscriptionsDesc: 'GraphQL 订阅通过 WebSocket 连接实现实时更新。Apollo Client 支持订阅，让你的 UI 在服务端数据变化时自动更新。',
    subscriptionsCode: `// 设置 WebSocket 链接用于订阅
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split } from '@apollo/client';

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000/graphql' })
);

// 分流：订阅走 WS，查询/变更走 HTTP
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink
);`,

    errorHandlingTitle: '错误处理模式',
    errorHandlingDesc: '健壮的错误处理对生产级 GraphQL 应用至关重要。Apollo 提供多层错误处理：链接层、查询层和组件层。',
    errorHandlingCode: `// 全面的错误处理
const { data, error } = useQuery(GET_POST, {
  variables: { slug },
  errorPolicy: 'all', // 返回部分数据和错误
  onError: (error) => {
    error.graphQLErrors?.forEach(err => {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        window.location.href = '/login';
      }
    });
  },
});`,

    serverTitle: '构建 GraphQL 服务器',
    serverDesc: '完整的 Apollo Server 设置，包含类型定义、解析器、认证和数据源。',
    serverCode: `// server.ts — Apollo Server
import { ApolloServer } from '@apollo/server';

const typeDefs = \`#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    posts(limit: Int!, offset: Int!): [Post!]!
    post(slug: String!): Post
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }
\`;

const server = new ApolloServer({ typeDefs, resolvers });`,

    bestPracticesTitle: 'Apollo Client 最佳实践',
    bp1: '使用 Fragment 跨查询共享字段选择。这消除了重复并确保相同实体在多个查询中的一致性。',
    bp2: '为每个查询设置适当的获取策略。不常变化的数据使用 cache-first，频繁更新的数据使用 cache-and-network，需要最新数据时使用 network-only。',
    bp3: '为修改可见数据的变更操作实现乐观响应。这通过在服务器请求进行中立即更新缓存，使 UI 感觉是即时的。',
    bp4: '使用 errorPolicy 选项优雅地处理部分错误。设置为 "all" 会同时返回数据和错误，让你在某些字段失败时仍能显示可用数据。',
    bp5: '为分页配置类型策略。Apollo 不会自动合并分页结果，你需要在缓存类型策略中定义 merge 和 read 函数。',
    bp6: '将查询与组件共置。将 GraphQL 操作放在使用它们的组件的同一文件或目录中，便于理解数据依赖关系。',
    bp7: '使用 Apollo DevTools 进行调试。浏览器扩展展示你的缓存内容、活跃查询和变更历史，帮助诊断数据问题。',
    bp8: '使用 graphql-codegen 等工具从 GraphQL schema 生成 TypeScript 类型。这提供从 schema 到组件 props 的端到端类型安全。',

    faq1q: '我的项目应该用 GraphQL 还是 REST？',
    faq1a: '当你有复杂的、互相关联的数据，且多个客户端（Web、移动端）以不同方式消费时，或者过度获取和不足获取确实是性能问题时，使用 GraphQL。当你有简单的 CRUD 操作、需要 HTTP 缓存、或团队已经在 REST 上很高效时，使用 REST。很多团队两者都用：GraphQL 用于面向前端的 API，REST 用于内部微服务通信。',
    faq2q: 'Apollo Client 能替代 Redux 做状态管理吗？',
    faq2a: 'Apollo Client 可以替代 Redux 管理服务端状态（来自 API 的数据）。Apollo 缓存作为所有服务端数据的单一数据源，消除了用 Redux action 和 reducer 管理 API 响应的需要。对于客户端状态（UI 开关、表单数据、主题偏好），可以使用 Apollo 响应式变量、React context 或 Zustand 等轻量级库。',
    faq3q: '如何使用 Apollo 处理认证？',
    faq3a: '使用 Apollo Link 为每个请求附加认证头。setContext link 让你从存储中读取认证令牌并添加到请求头中。对于令牌刷新，使用 error link 捕获 401 响应、刷新令牌并自动重试失败的请求。',
    faq4q: 'GraphQL 比 REST 慢吗？',
    faq4a: 'GraphQL 的查询解析和验证比 REST 多了一小部分开销。但 GraphQL 通常通过减少网络请求数量（一次查询代替多次 REST 调用）和消除过度获取来提升整体性能。对大多数应用来说，网络节省超过了解析开销。使用持久化查询和响应缓存可以获得最佳性能。',
    faq5q: 'Apollo Client 有什么替代方案？',
    faq5a: '主要替代方案有 urql（更轻量、基于插件）、Relay（Facebook 出品、有偏见的、编译器驱动的）和 TanStack Query 配合 graphql-request。Apollo Client 拥有最大的生态系统、最好的文档和最多的功能，但 urql 对于不需要 Apollo 全部功能的简单应用来说是一个不错的选择。',

    tryTools: '试试我们相关的开发者工具',
  },
};

export default function GraphqlApolloTutorial({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* What Is GraphQL */}
      <h2 style={h2Style}>{ct.whatIsGraphqlTitle}</h2>
      <p style={pStyle}>{ct.whatIsGraphqlDesc1}</p>
      <p style={pStyle}>{ct.whatIsGraphqlDesc2}</p>

      {/* GraphQL vs REST Table */}
      <h3 style={h3Style}>{ct.graphqlVsRestTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Aspect</th>
              <th style={thStyle}>REST</th>
              <th style={thStyle}>GraphQL</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Endpoints', 'Multiple (GET /users, GET /posts)', 'Single (/graphql)'],
              ['Data Fetching', 'Fixed response shape', 'Client specifies exact fields'],
              ['Over-fetching', 'Common', 'Eliminated'],
              ['Under-fetching', 'Requires multiple requests', 'Single query gets all data'],
              ['Versioning', 'URL versioning (v1, v2)', 'Schema evolution, no versioning needed'],
              ['Caching', 'HTTP caching built-in', 'Requires client-side cache (Apollo)'],
              ['Tooling', 'Mature (Swagger, Postman)', 'Strong (GraphiQL, Apollo DevTools)'],
              ['Learning Curve', 'Low', 'Medium'],
            ].map(([aspect, rest, graphql], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{rest}</td>
                <td style={tdStyle}>{graphql}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Setup */}
      <h2 style={h2Style}>{ct.setupTitle}</h2>
      <p style={pStyle}>{ct.setupDesc}</p>
      <pre style={codeStyle}><code>{ct.setupCode}</code></pre>

      {/* Queries */}
      <h2 style={h2Style}>{ct.queriesTitle}</h2>
      <p style={pStyle}>{ct.queriesDesc}</p>
      <pre style={codeStyle}><code>{ct.queriesCode}</code></pre>

      {/* useQuery */}
      <h2 style={h2Style}>{ct.useQueryTitle}</h2>
      <p style={pStyle}>{ct.useQueryDesc}</p>
      <pre style={codeStyle}><code>{ct.useQueryCode}</code></pre>

      {/* Mutations */}
      <h2 style={h2Style}>{ct.mutationsTitle}</h2>
      <p style={pStyle}>{ct.mutationsDesc}</p>
      <pre style={codeStyle}><code>{ct.mutationsCode}</code></pre>

      {/* Caching */}
      <h2 style={h2Style}>{ct.cachingTitle}</h2>
      <p style={pStyle}>{ct.cachingDesc1}</p>
      <p style={pStyle}>{ct.cachingDesc2}</p>
      <pre style={codeStyle}><code>{ct.cachingCode}</code></pre>

      {/* Subscriptions */}
      <h2 style={h2Style}>{ct.subscriptionsTitle}</h2>
      <p style={pStyle}>{ct.subscriptionsDesc}</p>
      <pre style={codeStyle}><code>{ct.subscriptionsCode}</code></pre>

      {/* Error Handling */}
      <h2 style={h2Style}>{ct.errorHandlingTitle}</h2>
      <p style={pStyle}>{ct.errorHandlingDesc}</p>
      <pre style={codeStyle}><code>{ct.errorHandlingCode}</code></pre>

      {/* Server */}
      <h2 style={h2Style}>{ct.serverTitle}</h2>
      <p style={pStyle}>{ct.serverDesc}</p>
      <pre style={codeStyle}><code>{ct.serverCode}</code></pre>

      {/* Best Practices */}
      <h2 style={h2Style}>{ct.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.bp1}</li>
        <li>{ct.bp2}</li>
        <li>{ct.bp3}</li>
        <li>{ct.bp4}</li>
        <li>{ct.bp5}</li>
        <li>{ct.bp6}</li>
        <li>{ct.bp7}</li>
        <li>{ct.bp8}</li>
      </ul>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a], [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
