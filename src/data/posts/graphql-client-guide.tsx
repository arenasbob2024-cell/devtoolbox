'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'GraphQL Client Guide: Apollo, urql, Relay & Best Practices',
    tldr: 'GraphQL clients handle query execution, caching, and state management for your frontend. Apollo Client is the most feature-rich option with normalized caching and DevTools. urql offers a lighter plugin-based architecture. Relay excels at large-scale apps with its compiler-driven approach. Choose based on your project size, team experience, and performance requirements.',
    kt1: 'Apollo Client provides normalized caching, optimistic UI, and the richest ecosystem of any GraphQL client.',
    kt2: 'useQuery and useMutation hooks abstract away loading, error, and refetch logic for clean component code.',
    kt3: 'Cache normalization stores entities by ID, enabling automatic UI updates when data changes anywhere.',
    kt4: 'Cursor-based pagination with fetchMore and relay-style connections scales better than offset pagination.',
    kt5: 'graphql-codegen generates TypeScript types from your schema for end-to-end type safety.',
    kt6: 'WebSocket subscriptions enable real-time features like live notifications and chat.',
    kt7: 'urql is a compelling alternative for simpler projects with its exchange-based plugin system.',
    kt8: 'Rate limiting, depth limiting, and query complexity analysis protect your GraphQL API from abuse.',

    s1Title: '1. GraphQL Fundamentals',
    s1Desc: 'GraphQL is a query language for APIs that lets clients request exactly the data they need. It supports three operation types: queries for reading data, mutations for writing data, and subscriptions for real-time updates. Unlike REST, a single GraphQL endpoint handles all operations, and the client specifies the response shape.',
    s1Code: `# Query — fetch user with nested posts
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
    posts(first: 5) {
      title
      createdAt
    }
  }
}

# Mutation — create a new post
mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    title
  }
}`,

    s2Title: '2. Apollo Client Setup',
    s2Desc: 'Apollo Client is the most popular GraphQL client for React. It combines an intelligent normalized cache, a composable link chain for request processing, and built-in error handling. The link chain lets you add authentication headers, log errors, and retry failed requests in a modular way.',
    s2Code: `import {
  ApolloClient, InMemoryCache,
  createHttpLink, from
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem('token')
      ? 'Bearer ' + localStorage.getItem('token')
      : '',
  },
}));
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.forEach(e =>
    console.error('[GQL]', e.message));
});
export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});`,

    s3Title: '3. useQuery & useMutation',
    s3Desc: 'Apollo provides React hooks for declarative data fetching. useQuery handles loading states, errors, polling, and refetching automatically. useMutation returns a trigger function and tracks the mutation lifecycle. Both hooks integrate with the cache so your UI updates reactively.',
    s3Code: `import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TODOS = gql\`
  query { todos { id text done } }
\`;
const TOGGLE = gql\`
  mutation Toggle($id: ID!) {
    toggleTodo(id: $id) { id done }
  }
\`;

function TodoList() {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggle] = useMutation(TOGGLE, {
    optimisticResponse: ({ id }) => ({
      toggleTodo: { __typename: 'Todo', id, done: true },
    }),
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return data.todos.map(t => (
    <li key={t.id} onClick={() => toggle({ variables: { id: t.id } })}>
      {t.text} {t.done ? '(done)' : ''}
    </li>
  ));
}`,

    s4Title: '4. Cache Management',
    s4Desc: 'Apollo InMemoryCache uses normalized caching, splitting query results into individual objects stored by typename and ID. This means updating a user object in one query automatically updates it everywhere. Type policies let you customize how fields are read, merged, and keyed.',
    s4Code: `const cache = new InMemoryCache({
  typePolicies: {
    User: {
      keyFields: ['email'], // use email as cache key
    },
    Query: {
      fields: {
        posts: {
          keyArgs: ['category'],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
          read(existing) {
            return existing;
          },
        },
      },
    },
  },
});

// Manual cache update after mutation
cache.modify({
  id: cache.identify({ __typename: 'User', email: 'a@b.com' }),
  fields: {
    postCount(prev) { return prev + 1; },
  },
});`,

    s5Title: '5. Pagination',
    s5Desc: 'Cursor-based pagination is the recommended approach for GraphQL. It uses an opaque cursor to mark positions in a list, avoiding the issues with offset-based pagination when items are inserted or deleted. The Relay connection specification provides a standard pattern with edges, nodes, and pageInfo.',
    s5Code: `const GET_FEED = gql\`
  query Feed($cursor: String) {
    feed(first: 10, after: $cursor) {
      edges { node { id title } cursor }
      pageInfo { hasNextPage endCursor }
    }
  }
\`;

function Feed() {
  const { data, fetchMore } = useQuery(GET_FEED);
  const loadMore = () => fetchMore({
    variables: {
      cursor: data.feed.pageInfo.endCursor,
    },
  });
  return (
    <div>
      {data?.feed.edges.map(e => (
        <p key={e.node.id}>{e.node.title}</p>
      ))}
      {data?.feed.pageInfo.hasNextPage && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}`,

    s6Title: '6. Code Generation',
    s6Desc: 'graphql-codegen reads your schema and operations to generate TypeScript types, typed hooks, and document nodes. This eliminates manual type definitions and catches type errors at build time. The typed-document-node plugin generates zero-runtime-overhead types that work with any GraphQL client.',
    s6Code: `# codegen.yml
schema: 'http://localhost:4000/graphql'
documents: 'src/**/*.graphql'
generates:
  src/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
      - typed-document-node

# Usage with generated types
# src/queries/user.graphql
# query GetUser($id: ID!) {
#   user(id: $id) { id name email }
# }

# In component — fully typed, no manual types
# import { GetUserDocument } from './generated/graphql';
# const { data } = useQuery(GetUserDocument, {
#   variables: { id: '1' }, // type-checked
# });
# data?.user.name; // autocomplete works`,

    s7Title: '7. Subscriptions',
    s7Desc: 'GraphQL subscriptions use WebSocket connections to push real-time updates from the server. Apollo Client supports subscriptions through graphql-ws, maintaining a persistent connection. You can use useSubscription for standalone listeners or subscribeToMore to append real-time data to existing queries.',
    s7Code: `import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000/graphql' })
);
const httpLink = new HttpLink({ uri: '/graphql' });
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition'
      && def.operation === 'subscription';
  },
  wsLink, httpLink,
);

// useSubscription hook
// const { data } = useSubscription(ON_MESSAGE);`,

    s8Title: '8. Error Handling',
    s8Desc: 'GraphQL can return partial data alongside errors, unlike REST which typically returns a single status code. Apollo errorPolicy controls this behavior: "none" throws on errors, "all" delivers both data and errors, and "ignore" silently discards errors. Combine error links with React error boundaries for robust handling.',
    s8Code: `import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

const retryLink = new RetryLink({
  delay: { initial: 300, max: 3000, jitter: true },
  attempts: { max: 3, retryIf: (error) => !!error },
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === 'UNAUTHENTICATED') {
          // redirect to login
          window.location.href = '/login';
        }
      }
    }
    if (networkError) {
      console.error('Network error on', operation.operationName);
    }
  }
);
// link chain: retryLink -> errorLink -> httpLink`,

    s9Title: '9. Testing GraphQL Components',
    s9Desc: 'Apollo provides MockedProvider to wrap components with predetermined query responses during tests. You can mock loading states, errors, and successful responses without hitting a real server. For hook-level testing, renderHook from testing-library works with Apollo mocks.',
    s9Code: `import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';

const mocks = [{
  request: {
    query: GET_TODOS,
    variables: {},
  },
  result: {
    data: {
      todos: [
        { id: '1', text: 'Write tests', done: false },
        { id: '2', text: 'Ship code', done: true },
      ],
    },
  },
}];

test('renders todos', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TodoList />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Write tests')).toBeTruthy();
  });
});`,

    s10Title: '10. Performance Optimization',
    s10Desc: 'Apollo supports query batching to combine multiple operations into a single HTTP request, reducing network overhead. Persisted queries send a hash instead of the full query string, shrinking request size and enabling CDN caching. Deferred queries with @defer let you progressively render slow-to-resolve fields.',
    s10Code: `import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

// Batch multiple queries into one request
const batchLink = new BatchHttpLink({
  uri: '/graphql',
  batchMax: 5,
  batchInterval: 20,
});

// Persisted queries — send hash instead of query
const persistedLink = createPersistedQueryLink({
  sha256, useGETForHashedQueries: true,
});

// @defer for progressive loading
// query GetPost($id: ID!) {
//   post(id: $id) {
//     title
//     body
//     ... @defer { comments { id text } }
//   }
// }`,

    s11Title: '11. urql Alternative',
    s11Desc: 'urql is a lightweight GraphQL client with a plugin system based on exchanges. It ships at roughly half the bundle size of Apollo and uses a simpler document cache by default. Custom exchanges let you add normalized caching, authentication, retry logic, and more. urql is a strong choice when you want a thinner abstraction.',
    s11Code: `import { Client, cacheExchange, fetchExchange, Provider }
  from 'urql';
import { authExchange } from '@urql/exchange-auth';

const client = new Client({
  url: '/graphql',
  exchanges: [
    cacheExchange,
    authExchange(async (utils) => ({
      addAuthToOperation(operation) {
        const token = localStorage.getItem('token');
        return token ? utils.appendHeaders(operation, {
          Authorization: 'Bearer ' + token,
        }) : operation;
      },
      didAuthError(error) {
        return error.graphQLErrors.some(
          e => e.extensions?.code === 'UNAUTHORIZED'
        );
      },
      async refreshAuth() {
        localStorage.removeItem('token');
        window.location.href = '/login';
      },
    })),
    fetchExchange,
  ],
});`,

    s12Title: '12. Relay Modern',
    s12Desc: 'Relay is Facebook\'s GraphQL client, designed for large-scale applications. Its compiler statically analyzes your queries at build time, generating optimized runtime artifacts. Relay enforces data masking, meaning components can only access the data they explicitly request via fragments. This guarantees no implicit data dependencies.',
    s12Code: `// UserProfile.tsx — Relay fragment component
import { graphql, useFragment } from 'react-relay';

const UserProfileFragment = graphql\`
  fragment UserProfile_user on User {
    name
    avatar
    bio
    followerCount
  }
\`;

function UserProfile({ userRef }) {
  const data = useFragment(UserProfileFragment, userRef);
  return (
    <div>
      <img src={data.avatar} alt={data.name} />
      <h2>{data.name}</h2>
      <p>{data.bio}</p>
      <span>{data.followerCount} followers</span>
    </div>
  );
}`,

    s13Title: '13. GraphQL Security',
    s13Desc: 'GraphQL\'s flexible query language means clients can craft deeply nested or expensive queries. Protecting your API requires depth limiting (rejecting queries deeper than N levels), query complexity analysis (assigning costs to fields), and rate limiting (throttling by client or IP). Disable introspection in production to prevent schema leakage.',
    s13Code: `import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule }
  from 'graphql-validation-complexity';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimit(7),
    createComplexityLimitRule(1000, {
      scalarCost: 1,
      objectCost: 5,
      listFactor: 10,
    }),
  ],
  introspection: process.env.NODE_ENV !== 'production',
});

// Rate limiting with express middleware
// app.use('/graphql', rateLimit({
//   windowMs: 60 * 1000,
//   max: 100,
// }));`,

    faq1q: 'Should I use Apollo Client or urql for a new project?',
    faq1a: 'If you need normalized caching, optimistic UI, subscription support, and a large ecosystem, choose Apollo Client. If you prefer a smaller bundle, simpler API, and are okay with document-level caching, choose urql. For large-scale apps with strict data access patterns, consider Relay.',
    faq2q: 'How does GraphQL caching differ from REST caching?',
    faq2a: 'REST uses HTTP caching headers and CDN caching per endpoint. GraphQL clients implement application-level caching. Apollo normalizes data by typename and ID so updating one entity updates all queries referencing it. This is more powerful than HTTP caching but requires careful cache policy configuration.',
    faq3q: 'Is graphql-codegen worth the setup effort?',
    faq3a: 'Yes. Code generation provides full TypeScript types from your schema, catches type errors at build time, generates typed hooks, and eliminates manual type maintenance. The initial setup takes about 15 minutes and saves significant debugging time as your project grows.',
    faq4q: 'How do I handle authentication in Apollo Client?',
    faq4a: 'Use a setContext link to read auth tokens from storage and attach them as Authorization headers on every request. For token refresh, use an error link that catches 401 errors, refreshes the token, and retries the failed operation using forward().',
    faq5q: 'When should I use subscriptions vs polling?',
    faq5a: 'Use subscriptions for truly real-time data like chat messages or live dashboards where low latency matters. Use polling (useQuery with pollInterval) for data that updates every few seconds and where a slight delay is acceptable. Polling is simpler to implement and scale.',
    faq6q: 'How do I prevent N+1 queries on the server?',
    faq6a: 'Use DataLoader to batch and deduplicate database requests within a single GraphQL operation. DataLoader collects all IDs requested in a single tick, then executes one batched query. Initialize a new DataLoader per request to avoid caching across users.',
    faq7q: 'Can I use GraphQL without a dedicated client library?',
    faq7a: 'Yes. You can use fetch or graphql-request to send queries as plain HTTP POST requests. However, you lose automatic caching, optimistic updates, and subscription support. A dedicated client is recommended for any app beyond simple data fetching.',
    faq8q: 'How do I secure a GraphQL API in production?',
    faq8a: 'Implement depth limiting, query complexity analysis, and rate limiting. Disable introspection in production. Use persisted queries to whitelist allowed operations. Add authentication and field-level authorization. Monitor query performance and set timeout limits on resolvers.',

    tryTools: 'Try our related developer tools',
  },
  zh: {
    title: 'GraphQL 客户端指南：Apollo、urql、Relay 与最佳实践',
    tldr: 'GraphQL 客户端负责前端的查询执行、缓存和状态管理。Apollo Client 功能最丰富，提供规范化缓存和开发工具。urql 提供更轻量的基于插件的架构。Relay 凭借编译器驱动的方式在大规模应用中表现出色。根据项目规模、团队经验和性能要求进行选择。',
    kt1: 'Apollo Client 提供规范化缓存、乐观更新 UI，拥有所有 GraphQL 客户端中最丰富的生态系统。',
    kt2: 'useQuery 和 useMutation 钩子封装了加载、错误和重新获取逻辑，使组件代码更简洁。',
    kt3: '缓存规范化按 ID 存储实体，当数据在任何位置发生变化时自动更新 UI。',
    kt4: '基于游标的分页配合 fetchMore 和 Relay 风格连接比偏移量分页的扩展性更好。',
    kt5: 'graphql-codegen 从 schema 生成 TypeScript 类型，实现端到端的类型安全。',
    kt6: 'WebSocket 订阅支持实时通知和聊天等实时功能。',
    kt7: 'urql 凭借其基于 exchange 的插件系统，是较简单项目的有力替代方案。',
    kt8: '速率限制、深度限制和查询复杂度分析保护你的 GraphQL API 免受滥用。',

    s1Title: '1. GraphQL 基础',
    s1Desc: 'GraphQL 是一种 API 查询语言，让客户端能精确请求所需的数据。它支持三种操作类型：查询用于读取数据，变更用于写入数据，订阅用于实时更新。与 REST 不同，单个 GraphQL 端点处理所有操作，客户端指定响应的形状。',
    s1Code: `# 查询 — 获取用户及其嵌套的文章
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
    posts(first: 5) {
      title
      createdAt
    }
  }
}

# 变更 — 创建新文章
mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    title
  }
}`,

    s2Title: '2. Apollo Client 设置',
    s2Desc: 'Apollo Client 是最流行的 React GraphQL 客户端。它结合了智能的规范化缓存、可组合的链式请求处理和内置错误处理。链式链接允许你以模块化方式添加认证头、记录错误和重试失败请求。',
    s2Code: `import {
  ApolloClient, InMemoryCache,
  createHttpLink, from
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem('token')
      ? 'Bearer ' + localStorage.getItem('token')
      : '',
  },
}));
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.forEach(e =>
    console.error('[GQL]', e.message));
});
export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});`,

    s3Title: '3. useQuery 与 useMutation',
    s3Desc: 'Apollo 提供 React 钩子实现声明式数据获取。useQuery 自动处理加载状态、错误、轮询和重新获取。useMutation 返回触发函数并跟踪变更生命周期。两个钩子都与缓存集成，使 UI 响应式更新。',
    s3Code: `import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TODOS = gql\`
  query { todos { id text done } }
\`;
const TOGGLE = gql\`
  mutation Toggle($id: ID!) {
    toggleTodo(id: $id) { id done }
  }
\`;

function TodoList() {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggle] = useMutation(TOGGLE, {
    optimisticResponse: ({ id }) => ({
      toggleTodo: { __typename: 'Todo', id, done: true },
    }),
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return data.todos.map(t => (
    <li key={t.id} onClick={() => toggle({ variables: { id: t.id } })}>
      {t.text} {t.done ? '(done)' : ''}
    </li>
  ));
}`,

    s4Title: '4. 缓存管理',
    s4Desc: 'Apollo InMemoryCache 使用规范化缓存，将查询结果拆分为按类型名和 ID 存储的独立对象。这意味着在一个查询中更新用户对象会自动在所有地方更新它。类型策略允许你自定义字段的读取、合并和键的生成方式。',
    s4Code: `const cache = new InMemoryCache({
  typePolicies: {
    User: {
      keyFields: ['email'], // 使用 email 作为缓存键
    },
    Query: {
      fields: {
        posts: {
          keyArgs: ['category'],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
          read(existing) {
            return existing;
          },
        },
      },
    },
  },
});

// 变更后手动更新缓存
cache.modify({
  id: cache.identify({ __typename: 'User', email: 'a@b.com' }),
  fields: {
    postCount(prev) { return prev + 1; },
  },
});`,

    s5Title: '5. 分页',
    s5Desc: '基于游标的分页是 GraphQL 推荐的方式。它使用不透明游标标记列表中的位置，避免了偏移量分页在插入或删除项时的问题。Relay 连接规范提供了包含 edges、nodes 和 pageInfo 的标准模式。',
    s5Code: `const GET_FEED = gql\`
  query Feed($cursor: String) {
    feed(first: 10, after: $cursor) {
      edges { node { id title } cursor }
      pageInfo { hasNextPage endCursor }
    }
  }
\`;

function Feed() {
  const { data, fetchMore } = useQuery(GET_FEED);
  const loadMore = () => fetchMore({
    variables: {
      cursor: data.feed.pageInfo.endCursor,
    },
  });
  return (
    <div>
      {data?.feed.edges.map(e => (
        <p key={e.node.id}>{e.node.title}</p>
      ))}
      {data?.feed.pageInfo.hasNextPage && (
        <button onClick={loadMore}>加载更多</button>
      )}
    </div>
  );
}`,

    s6Title: '6. 代码生成',
    s6Desc: 'graphql-codegen 读取你的 schema 和操作来生成 TypeScript 类型、类型化钩子和文档节点。这消除了手动类型定义，并在构建时捕获类型错误。typed-document-node 插件生成零运行时开销的类型，适用于任何 GraphQL 客户端。',
    s6Code: `# codegen.yml
schema: 'http://localhost:4000/graphql'
documents: 'src/**/*.graphql'
generates:
  src/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
      - typed-document-node

# 使用生成的类型
# src/queries/user.graphql
# query GetUser($id: ID!) {
#   user(id: $id) { id name email }
# }

# 在组件中使用 — 完全类型化，无需手动定义类型
# import { GetUserDocument } from './generated/graphql';
# const { data } = useQuery(GetUserDocument, {
#   variables: { id: '1' }, // 类型检查
# });
# data?.user.name; // 自动补全有效`,

    s7Title: '7. 订阅',
    s7Desc: 'GraphQL 订阅使用 WebSocket 连接从服务器推送实时更新。Apollo Client 通过 graphql-ws 支持订阅，维护持久连接。你可以使用 useSubscription 进行独立监听，或使用 subscribeToMore 将实时数据附加到现有查询。',
    s7Code: `import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000/graphql' })
);
const httpLink = new HttpLink({ uri: '/graphql' });
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition'
      && def.operation === 'subscription';
  },
  wsLink, httpLink,
);

// useSubscription 钩子
// const { data } = useSubscription(ON_MESSAGE);`,

    s8Title: '8. 错误处理',
    s8Desc: 'GraphQL 可以同时返回部分数据和错误，不像 REST 通常只返回单个状态码。Apollo 的 errorPolicy 控制此行为："none" 遇到错误时抛出异常，"all" 同时返回数据和错误，"ignore" 静默丢弃错误。将错误链接与 React 错误边界结合使用可实现健壮的错误处理。',
    s8Code: `import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

const retryLink = new RetryLink({
  delay: { initial: 300, max: 3000, jitter: true },
  attempts: { max: 3, retryIf: (error) => !!error },
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === 'UNAUTHENTICATED') {
          window.location.href = '/login';
        }
      }
    }
    if (networkError) {
      console.error('网络错误：', operation.operationName);
    }
  }
);
// 链接链：retryLink -> errorLink -> httpLink`,

    s9Title: '9. 测试 GraphQL 组件',
    s9Desc: 'Apollo 提供 MockedProvider 来包裹组件，在测试期间使用预定的查询响应。你可以模拟加载状态、错误和成功响应，而无需连接真实服务器。对于钩子级别的测试，testing-library 的 renderHook 可以与 Apollo 模拟配合使用。',
    s9Code: `import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';

const mocks = [{
  request: {
    query: GET_TODOS,
    variables: {},
  },
  result: {
    data: {
      todos: [
        { id: '1', text: 'Write tests', done: false },
        { id: '2', text: 'Ship code', done: true },
      ],
    },
  },
}];

test('renders todos', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TodoList />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Write tests')).toBeTruthy();
  });
});`,

    s10Title: '10. 性能优化',
    s10Desc: 'Apollo 支持查询批处理，将多个操作合并为单个 HTTP 请求以减少网络开销。持久化查询发送哈希而非完整查询字符串，缩小请求大小并支持 CDN 缓存。使用 @defer 的延迟查询让你逐步渲染解析较慢的字段。',
    s10Code: `import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

// 将多个查询批处理为一个请求
const batchLink = new BatchHttpLink({
  uri: '/graphql',
  batchMax: 5,
  batchInterval: 20,
});

// 持久化查询 — 发送哈希而非完整查询
const persistedLink = createPersistedQueryLink({
  sha256, useGETForHashedQueries: true,
});

// @defer 用于渐进式加载
// query GetPost($id: ID!) {
//   post(id: $id) {
//     title
//     body
//     ... @defer { comments { id text } }
//   }
// }`,

    s11Title: '11. urql 替代方案',
    s11Desc: 'urql 是一个轻量级 GraphQL 客户端，基于 exchange 的插件系统。它的包体积大约是 Apollo 的一半，默认使用更简单的文档缓存。自定义 exchange 允许你添加规范化缓存、认证、重试逻辑等。当你需要更薄的抽象层时，urql 是一个强有力的选择。',
    s11Code: `import { Client, cacheExchange, fetchExchange, Provider }
  from 'urql';
import { authExchange } from '@urql/exchange-auth';

const client = new Client({
  url: '/graphql',
  exchanges: [
    cacheExchange,
    authExchange(async (utils) => ({
      addAuthToOperation(operation) {
        const token = localStorage.getItem('token');
        return token ? utils.appendHeaders(operation, {
          Authorization: 'Bearer ' + token,
        }) : operation;
      },
      didAuthError(error) {
        return error.graphQLErrors.some(
          e => e.extensions?.code === 'UNAUTHORIZED'
        );
      },
      async refreshAuth() {
        localStorage.removeItem('token');
        window.location.href = '/login';
      },
    })),
    fetchExchange,
  ],
});`,

    s12Title: '12. Relay Modern',
    s12Desc: 'Relay 是 Facebook 的 GraphQL 客户端，专为大规模应用设计。其编译器在构建时静态分析查询，生成优化的运行时产物。Relay 强制数据遮蔽，意味着组件只能访问通过 fragment 明确请求的数据，确保没有隐式的数据依赖。',
    s12Code: `// UserProfile.tsx — Relay fragment 组件
import { graphql, useFragment } from 'react-relay';

const UserProfileFragment = graphql\`
  fragment UserProfile_user on User {
    name
    avatar
    bio
    followerCount
  }
\`;

function UserProfile({ userRef }) {
  const data = useFragment(UserProfileFragment, userRef);
  return (
    <div>
      <img src={data.avatar} alt={data.name} />
      <h2>{data.name}</h2>
      <p>{data.bio}</p>
      <span>{data.followerCount} 关注者</span>
    </div>
  );
}`,

    s13Title: '13. GraphQL 安全',
    s13Desc: 'GraphQL 灵活的查询语言意味着客户端可以构造深度嵌套或昂贵的查询。保护你的 API 需要深度限制（拒绝超过 N 层的查询）、查询复杂度分析（为字段分配成本）和速率限制（按客户端或 IP 限流）。在生产环境中禁用内省以防止 schema 泄露。',
    s13Code: `import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule }
  from 'graphql-validation-complexity';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimit(7),
    createComplexityLimitRule(1000, {
      scalarCost: 1,
      objectCost: 5,
      listFactor: 10,
    }),
  ],
  introspection: process.env.NODE_ENV !== 'production',
});

// 使用 express 中间件进行速率限制
// app.use('/graphql', rateLimit({
//   windowMs: 60 * 1000,
//   max: 100,
// }));`,

    faq1q: '新项目应该用 Apollo Client 还是 urql？',
    faq1a: '如果你需要规范化缓存、乐观 UI、订阅支持和大型生态系统，选择 Apollo Client。如果你偏好更小的包体积、更简单的 API，并且可以接受文档级缓存，选择 urql。对于有严格数据访问模式的大规模应用，考虑 Relay。',
    faq2q: 'GraphQL 缓存与 REST 缓存有什么不同？',
    faq2a: 'REST 使用 HTTP 缓存头和按端点的 CDN 缓存。GraphQL 客户端实现应用级缓存。Apollo 按类型名和 ID 规范化数据，因此更新一个实体会更新所有引用它的查询。这比 HTTP 缓存更强大，但需要仔细配置缓存策略。',
    faq3q: 'graphql-codegen 值得花时间设置吗？',
    faq3a: '值得。代码生成从你的 schema 提供完整的 TypeScript 类型，在构建时捕获类型错误，生成类型化钩子，并消除手动类型维护。初始设置大约需要 15 分钟，随着项目增长可节省大量调试时间。',
    faq4q: '如何在 Apollo Client 中处理认证？',
    faq4a: '使用 setContext 链接从存储中读取认证令牌，并将其作为 Authorization 头附加到每个请求上。对于令牌刷新，使用错误链接捕获 401 错误，刷新令牌，然后使用 forward() 重试失败的操作。',
    faq5q: '什么时候该用订阅，什么时候用轮询？',
    faq5a: '对于真正的实时数据（如聊天消息或实时仪表盘），且低延迟很重要时使用订阅。对于每隔几秒更新一次且可以接受轻微延迟的数据，使用轮询（useQuery 配合 pollInterval）。轮询实现和扩展都更简单。',
    faq6q: '如何防止服务端的 N+1 查询问题？',
    faq6a: '使用 DataLoader 在单个 GraphQL 操作中批量处理和去重数据库请求。DataLoader 收集单个 tick 中请求的所有 ID，然后执行一次批量查询。每个请求初始化一个新的 DataLoader 以避免跨用户缓存。',
    faq7q: '可以不用专用客户端库来使用 GraphQL 吗？',
    faq7a: '可以。你可以使用 fetch 或 graphql-request 将查询作为普通 HTTP POST 请求发送。但是你会失去自动缓存、乐观更新和订阅支持。对于超出简单数据获取的任何应用，建议使用专用客户端。',
    faq8q: '如何在生产环境中保护 GraphQL API？',
    faq8a: '实现深度限制、查询复杂度分析和速率限制。在生产环境中禁用内省。使用持久化查询来白名单允许的操作。添加认证和字段级授权。监控查询性能并为解析器设置超时限制。',

    tryTools: '试试我们相关的开发者工具',
  },
};

export default function GraphqlClientGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
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
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const preStyle: React.CSSProperties = { background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, marginBottom: 24 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };

  const sections = [
    { title: ct.s1Title, desc: ct.s1Desc, code: ct.s1Code },
    { title: ct.s2Title, desc: ct.s2Desc, code: ct.s2Code },
    { title: ct.s3Title, desc: ct.s3Desc, code: ct.s3Code },
    { title: ct.s4Title, desc: ct.s4Desc, code: ct.s4Code },
    { title: ct.s5Title, desc: ct.s5Desc, code: ct.s5Code },
    { title: ct.s6Title, desc: ct.s6Desc, code: ct.s6Code },
    { title: ct.s7Title, desc: ct.s7Desc, code: ct.s7Code },
    { title: ct.s8Title, desc: ct.s8Desc, code: ct.s8Code },
    { title: ct.s9Title, desc: ct.s9Desc, code: ct.s9Code },
    { title: ct.s10Title, desc: ct.s10Desc, code: ct.s10Code },
    { title: ct.s11Title, desc: ct.s11Desc, code: ct.s11Code },
    { title: ct.s12Title, desc: ct.s12Desc, code: ct.s12Code },
    { title: ct.s13Title, desc: ct.s13Desc, code: ct.s13Code },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginBottom: 30 }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#0369a1' }}>TL;DR</p>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#334155', margin: 0 }}>{ct.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '20px 24px', marginBottom: 30 }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: 'var(--text-primary)' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, color: '#475569', fontSize: 14 }}>
          <li>{ct.kt1}</li>
          <li>{ct.kt2}</li>
          <li>{ct.kt3}</li>
          <li>{ct.kt4}</li>
          <li>{ct.kt5}</li>
          <li>{ct.kt6}</li>
          <li>{ct.kt7}</li>
          <li>{ct.kt8}</li>
        </ul>
      </div>

      {/* Sections */}
      {sections.map((s, i) => (
        <div key={i}>
          <h2 style={h2Style}>{s.title}</h2>
          <p style={pStyle}>{s.desc}</p>
          <pre style={preStyle}><code>{s.code}</code></pre>
        </div>
      ))}

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a], [ct.faq6q, ct.faq6a], [ct.faq7q, ct.faq7a], [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
