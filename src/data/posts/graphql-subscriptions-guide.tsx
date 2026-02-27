'use client';

import React from 'react';

const translations = {
  en: {
    title: 'GraphQL Subscriptions Guide: Real-time Data with WebSockets and Apollo',
    description:
      'Complete GraphQL subscriptions guide covering WebSocket transport, Apollo Server and Client setup, PubSub resolvers, authentication, Redis scaling, SSE alternative, error handling, and production tips.',
    content: 'en',
  },
  zh: {
    title: 'GraphQL 订阅指南：使用 WebSocket 和 Apollo 实现实时数据',
    description:
      '完整的 GraphQL 订阅指南，涵盖 WebSocket 传输、Apollo Server 和 Client 配置、PubSub 解析器、认证、Redis 横向扩展、SSE 替代方案、错误处理及生产环境最佳实践。',
    content: 'zh',
  },
};

export default function GraphqlSubscriptionsGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a GraphQL subscription and how does it differ from queries and mutations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A GraphQL subscription is a long-lived operation that pushes data from the server to the client whenever a specific event occurs. Unlike queries (one-time data fetch) and mutations (one-time data change), subscriptions maintain a persistent connection — typically over WebSocket — and receive multiple responses over time. They follow a publish/subscribe pattern: the server publishes events to a topic, and subscribed clients receive those events automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between graphql-ws and subscriptions-transport-ws?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'graphql-ws is the modern, actively maintained library implementing the graphql-transport-ws protocol. subscriptions-transport-ws is the older, deprecated library that implemented the graphql-ws protocol (confusingly named). For all new projects, use graphql-ws. The subscriptions-transport-ws library is no longer maintained, has known security issues, and Apollo Server 4 removed built-in support for it. Migrating from the old library requires updating both server and client code to use the new graphql-transport-ws protocol.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I authenticate WebSocket connections for GraphQL subscriptions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WebSocket connections cannot send custom HTTP headers after the initial handshake, so authentication is typically handled via connection parameters. On the client, pass the JWT in the connectionParams option of GraphQLWsLink. On the server, extract and verify the token in the onConnect callback of useServer. Once verified, attach the user to the context so all subscription resolvers can access it. Alternatively, some implementations use cookies for authentication since they are automatically sent with WebSocket upgrade requests.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is PubSub in GraphQL subscriptions and when should I use Redis PubSub?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PubSub (Publish/Subscribe) is the messaging pattern used to deliver events to subscription resolvers. The in-memory PubSub from @graphql-subscriptions works only within a single Node.js process — it does not work across multiple server instances. For production deployments with multiple servers or horizontal scaling, use a distributed PubSub backed by Redis (graphql-redis-subscriptions) or another message broker. Redis PubSub uses Redis channels to broadcast events across all server instances, ensuring all subscribed clients receive events regardless of which server they are connected to.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the useSubscription hook work in Apollo Client?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The useSubscription hook from @apollo/client subscribes to a GraphQL subscription and returns { data, loading, error } reactive state. It establishes a WebSocket connection via GraphQLWsLink when the component mounts and automatically cleans up when the component unmounts. The hook re-renders the component every time new data arrives from the server. You can also use the onData callback option for side effects like updating a list or showing notifications without relying on re-renders.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are Server-Sent Events (SSE) and when should I use them instead of WebSockets for GraphQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Server-Sent Events (SSE) is an HTTP-based protocol for unidirectional server-to-client streaming. Unlike WebSockets, SSE works over standard HTTP/1.1 and HTTP/2, automatically reconnects on disconnect, passes through all HTTP proxies and load balancers, and does not require special firewall rules. The graphql-sse library implements GraphQL subscriptions over SSE. Use SSE when you need subscriptions through restrictive corporate proxies, when you only need server-to-client data push (not bidirectional), or in environments where WebSocket connections are blocked.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I filter subscription events to send only relevant data to each subscriber?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the withFilter wrapper from graphql-subscriptions to add subscriber-specific filtering to your subscription resolver. The withFilter function wraps the asyncIterator function and takes a second argument — a filter function that receives the payload and the subscription variables, returning true to deliver the event or false to skip it. For example, in a chat app you can filter messages so each subscriber only receives messages from the channels they subscribed to. This filtering happens server-side before sending data over the wire, reducing unnecessary network traffic.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle reconnection and errors in GraphQL subscriptions on the client?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The graphql-ws client library has built-in reconnection logic with configurable retry attempts and delays via the retryAttempts and shouldRetry options. Configure these in the createClient call for GraphQLWsLink. For error handling in Apollo Client, the error state returned by useSubscription contains network errors and GraphQL errors. Implement a subscription keep-alive by setting the keepAlive option (in milliseconds) on the server useServer call. On the client, use the onNonLazyError and onError callbacks in createClient to log errors and trigger reconnection logic.',
        },
      },
    ],
  };

  const isZh = t.content === 'zh';

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', margin: '0 0 0.5rem 0' }}>
          TL;DR
        </p>
        <p style={{ margin: 0, color: '#0c4a6e' }}>
          {isZh ? (
            <>
              <strong>GraphQL 订阅</strong>通过 WebSocket 持久连接实时推送数据。使用{' '}
              <strong>graphql-ws</strong>（不要使用已废弃的 subscriptions-transport-ws）。在服务端通过{' '}
              <code>PubSub</code> 发布事件，在客户端通过 <code>useSubscription</code> Hook 消费数据。
              生产环境使用 <strong>Redis PubSub</strong> 支持横向扩展。通过 <code>connectionParams</code>{' '}
              传递 JWT 实现 WebSocket 认证。如遇代理限制，可改用 SSE（Server-Sent Events）作为替代方案。
            </>
          ) : (
            <>
              <strong>GraphQL subscriptions</strong> push real-time data over persistent WebSocket
              connections. Use <strong>graphql-ws</strong> (not the deprecated
              subscriptions-transport-ws). Publish events server-side via <code>PubSub</code> and
              consume them client-side with the <code>useSubscription</code> hook. Use{' '}
              <strong>Redis PubSub</strong> for horizontal scaling in production. Pass JWT tokens via{' '}
              <code>connectionParams</code> for WebSocket authentication. Use SSE as an alternative
              when WebSockets are blocked by proxies.
            </>
          )}
        </p>
      </div>

      {/* Introduction */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'GraphQL 订阅简介' : 'Introduction to GraphQL Subscriptions'}
      </h2>
      <p>
        {isZh ? (
          <>
            现代应用需要实时数据——用户期望看到即时消息、实时仪表盘更新、协作编辑和实时通知。传统的轮询（polling）方式既浪费资源，又难以扩展。
            <strong>GraphQL 订阅</strong>提供了一种标准化的方式，通过持久连接将服务端事件主动推送给客户端，通常基于 WebSocket 协议实现。
          </>
        ) : (
          <>
            Modern applications demand real-time data. Users expect instant messages, live dashboard
            updates, collaborative editing, and push notifications. Traditional polling is wasteful
            and hard to scale.{' '}
            <strong>GraphQL subscriptions</strong> provide a standardized way to push server-side
            events to clients over persistent connections, typically implemented with WebSocket.
          </>
        )}
      </p>
      <p>
        {isZh
          ? 'GraphQL 订阅遵循发布/订阅（Pub/Sub）模式：服务端将事件发布到特定主题，已订阅该主题的客户端自动接收这些事件。不同于 Query 和 Mutation 的一次性请求-响应模式，Subscription 会在连接生命周期内持续接收多个响应。'
          : 'Subscriptions follow a publish/subscribe pattern: the server publishes events to a topic, and subscribed clients receive those events automatically. Unlike queries and mutations, which follow a single request-response cycle, subscriptions receive multiple responses over the lifetime of the connection.'}
      </p>
      <p>
        {isZh
          ? '本指南涵盖从基础概念到生产环境部署的全部内容，包括 Apollo Server 和 Apollo Client 的配置、认证机制、Redis 横向扩展、SSE 替代方案及错误处理策略。'
          : 'This guide covers everything from fundamentals to production deployment: Apollo Server and Client configuration, authentication, Redis scaling, SSE alternatives, and error-handling strategies.'}
      </p>

      {/* How Subscriptions Work */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'GraphQL 订阅的工作原理' : 'How GraphQL Subscriptions Work'}
      </h2>
      <p>
        {isZh
          ? '订阅通过 WebSocket 建立持久双向连接。其生命周期如下所示：'
          : 'Subscriptions establish a persistent, bidirectional connection via WebSocket. Here is the full lifecycle:'}
      </p>
      <pre><code className="language-text">{`Client                              Server
  |                                    |
  |------ WebSocket Handshake -------->|
  |<-------- Connection Ack -----------|
  |                                    |
  |------ connection_init ------------>|  (graphql-ws protocol)
  |<-------- connection_ack -----------|
  |                                    |
  |------ subscribe (operation) ------>|
  |<-------- next (data push) ---------|
  |<-------- next (data push) ---------|
  |<-------- next (data push) ---------|
  |                                    |
  |------ complete (unsubscribe) ----->|
  |<-------- complete -----------------|
  |                                    |
  |------ close connection ----------->|`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '订阅的三种操作类型' : 'The Three GraphQL Operation Types'}
      </h3>
      <pre><code className="language-graphql">{`# Query: one-time data fetch (HTTP POST or GET)
query GetUser {
  user(id: "123") {
    name
    email
  }
}

# Mutation: one-time data change (HTTP POST)
mutation CreateMessage {
  createMessage(input: { content: "Hello", channelId: "general" }) {
    id
    content
    createdAt
  }
}

# Subscription: persistent event stream (WebSocket)
subscription OnNewMessage {
  messageSent(channelId: "general") {
    id
    content
    sender {
      name
      avatar
    }
    createdAt
  }
}`}</code></pre>

      {/* WebSocket Transport */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'WebSocket 传输：graphql-ws vs subscriptions-transport-ws' : 'WebSocket Transport: graphql-ws vs subscriptions-transport-ws'}
      </h2>
      <p>
        {isZh
          ? '选择正确的 WebSocket 传输库至关重要。目前存在两个协议，切勿混淆：'
          : 'Choosing the correct WebSocket transport library matters. There are two protocols — do not confuse them:'}
      </p>

      {/* Comparison Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: '700', color: '#1e293b' }}>
                {isZh ? '特性' : 'Feature'}
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: '700', color: '#1e293b' }}>
                graphql-ws
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: '700', color: '#1e293b' }}>
                subscriptions-transport-ws
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '协议名称' : 'Protocol Name', 'graphql-transport-ws', 'graphql-ws (legacy)'],
              [isZh ? '维护状态' : 'Maintenance', isZh ? '活跃维护' : 'Actively maintained', isZh ? '已废弃' : 'Deprecated'],
              [isZh ? 'Apollo Server 4 支持' : 'Apollo Server 4 support', isZh ? '原生支持' : 'Native support', isZh ? '不支持' : 'Not supported'],
              [isZh ? '安全性' : 'Security', isZh ? '无已知问题' : 'No known issues', isZh ? '存在已知漏洞' : 'Known vulnerabilities'],
              [isZh ? '连接初始化' : 'Connection init', 'connection_init / connection_ack', 'connection_init / connection_ack'],
              [isZh ? '订阅消息' : 'Subscribe message', 'subscribe', 'start'],
              [isZh ? '数据消息' : 'Data message', 'next', 'data'],
              [isZh ? '推荐用于' : 'Recommended for', isZh ? '所有新项目' : 'All new projects', isZh ? '仅遗留迁移' : 'Legacy migration only'],
            ].map(([feature, modern, legacy], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0', fontWeight: '600' }}>{feature}</td>
                <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>{modern}</td>
                <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>{legacy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        {isZh
          ? '结论：对所有新项目始终使用 graphql-ws（实现了 graphql-transport-ws 协议）。如果您当前使用 subscriptions-transport-ws，请立即迁移。'
          : 'Bottom line: always use graphql-ws (implementing the graphql-transport-ws protocol) for all new projects. If you are currently on subscriptions-transport-ws, migrate immediately.'}
      </p>

      {/* Apollo Server Setup */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'Apollo Server 订阅配置（graphql-ws）' : 'Apollo Server Subscriptions Setup with graphql-ws'}
      </h2>
      <p>
        {isZh
          ? 'Apollo Server 4 通过 graphql-ws 原生支持 WebSocket 订阅。以下是完整的服务端配置：'
          : 'Apollo Server 4 supports WebSocket subscriptions natively through graphql-ws. Here is the complete server setup:'}
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '安装依赖' : 'Install Dependencies'}
      </h3>
      <pre><code className="language-bash">{`# Install required packages
npm install @apollo/server graphql graphql-ws ws

# For Express integration
npm install @apollo/server express4 express cors

# TypeScript types
npm install -D @types/ws @types/express @types/cors`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? 'GraphQL Schema 定义' : 'GraphQL Schema Definition'}
      </h3>
      <pre><code className="language-typescript">{`// src/schema.ts
import { gql } from 'graphql-tag';

export const typeDefs = gql` + '`' + `
  type Message {
    id: ID!
    content: String!
    sender: User!
    channelId: String!
    createdAt: String!
  }

  type User {
    id: ID!
    name: String!
    avatar: String
  }

  type Query {
    messages(channelId: String!, limit: Int = 20): [Message!]!
    channels: [String!]!
  }

  type Mutation {
    sendMessage(channelId: String!, content: String!): Message!
  }

  type Subscription {
    messageSent(channelId: String!): Message!
    userJoined(channelId: String!): User!
    userLeft(channelId: String!): User!
  }
` + '`' + `;`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? 'Apollo Server + Express + WebSocket 完整配置' : 'Complete Apollo Server + Express + WebSocket Setup'}
      </h3>
      <pre><code className="language-typescript">{`// src/server.ts
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Build the executable schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Set up graphql-ws server
  const serverCleanup = useServer(
    {
      schema,
      // Context for subscriptions (called per subscription operation)
      context: async (ctx, msg, args) => {
        // Extract auth token from connection params
        const token = ctx.connectionParams?.authorization as string;
        const user = token ? await verifyToken(token) : null;
        return { user, pubsub };
      },
      onConnect: async (ctx) => {
        // Called when client connects via WebSocket
        console.log('Client connected', ctx.connectionParams);
        return true; // Accept all connections (add auth here for rejection)
      },
      onDisconnect: (ctx, code, reason) => {
        console.log('Client disconnected', code, reason);
      },
    },
    wsServer
  );

  // Create Apollo Server (HTTP for queries/mutations)
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Gracefully shutdown WebSocket server
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const user = token ? await verifyToken(token) : null;
        return { user };
      },
    })
  );

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log('HTTP server running at http://localhost:' + PORT + '/graphql');
    console.log('WebSocket server running at ws://localhost:' + PORT + '/graphql');
  });
}

startServer().catch(console.error);`}</code></pre>

      {/* Subscription Resolvers */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'Subscription 解析器：PubSub 与 AsyncIterator' : 'Subscription Resolvers: PubSub and AsyncIterator'}
      </h2>
      <p>
        {isZh
          ? 'Subscription 解析器与 Query/Mutation 不同，它必须返回一个 AsyncIterator（异步迭代器）。PubSub 类负责管理事件的发布和订阅。'
          : 'Subscription resolvers differ from Query/Mutation resolvers: they must return an AsyncIterator. The PubSub class manages publishing and subscribing to events.'}
      </p>

      <pre><code className="language-typescript">{`// src/resolvers.ts
import { PubSub, withFilter } from 'graphql-subscriptions';

// In-memory PubSub (single server only — use Redis for production)
export const pubsub = new PubSub();

// Event topic names — use constants to avoid typos
const EVENTS = {
  MESSAGE_SENT: 'MESSAGE_SENT',
  USER_JOINED: 'USER_JOINED',
  USER_LEFT: 'USER_LEFT',
} as const;

export const resolvers = {
  Query: {
    messages: async (_: unknown, { channelId, limit }: { channelId: string; limit: number }) => {
      return await db.messages.findMany({
        where: { channelId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: { sender: true },
      });
    },
  },

  Mutation: {
    sendMessage: async (
      _: unknown,
      { channelId, content }: { channelId: string; content: string },
      { user }: { user: User }
    ) => {
      if (!user) throw new Error('Unauthorized');

      const message = await db.messages.create({
        data: { channelId, content, senderId: user.id },
        include: { sender: true },
      });

      // Publish the event — all subscribers to MESSAGE_SENT will receive it
      await pubsub.publish(EVENTS.MESSAGE_SENT, { messageSent: message });

      return message;
    },
  },

  Subscription: {
    messageSent: {
      // subscribe returns an AsyncIterator
      subscribe: withFilter(
        // The base iterator — subscribes to all MESSAGE_SENT events
        () => pubsub.asyncIterator([EVENTS.MESSAGE_SENT]),
        // Filter function — return true to deliver, false to skip
        (payload: { messageSent: Message }, variables: { channelId: string }) => {
          return payload.messageSent.channelId === variables.channelId;
        }
      ),
    },

    userJoined: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([EVENTS.USER_JOINED]),
        (payload, variables) => payload.userJoined.channelId === variables.channelId
      ),
    },

    userLeft: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([EVENTS.USER_LEFT]),
        (payload, variables) => payload.userLeft.channelId === variables.channelId
      ),
    },
  },
};`}</code></pre>

      {/* Apollo Client Setup */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'Apollo Client 订阅配置：useSubscription Hook' : 'Apollo Client Subscription Setup: useSubscription Hook'}
      </h2>
      <p>
        {isZh
          ? '客户端需要配置 GraphQLWsLink（用于 WebSocket 连接）并与 HttpLink 组合，形成 split link：HTTP 处理 Query 和 Mutation，WebSocket 处理 Subscription。'
          : 'The client needs GraphQLWsLink for WebSocket connections combined with HttpLink as a split link: HTTP handles queries/mutations and WebSocket handles subscriptions.'}
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? 'Apollo Client 完整配置' : 'Apollo Client Complete Configuration'}
      </h3>
      <pre><code className="language-typescript">{`// src/lib/apollo-client.ts
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
  from,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createClient } from 'graphql-ws';

// HTTP link for queries and mutations
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL || 'http://localhost:4000/graphql',
});

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:4000/graphql',
    connectionParams: () => {
      // Pass authentication token via connectionParams
      const token = localStorage.getItem('auth_token');
      return {
        authorization: token ? 'Bearer ' + token : '',
      };
    },
    retryAttempts: 5,
    shouldRetry: () => true,
    on: {
      connected: () => console.log('WebSocket connected'),
      closed: () => console.log('WebSocket closed'),
      error: (err) => console.error('WebSocket error:', err),
    },
  })
);

// Authentication middleware for HTTP requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token');
  return {
    headers: {
      ...headers,
      authorization: token ? 'Bearer ' + token : '',
    },
  };
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) => {
      console.error('[GraphQL error]', message, 'at path:', path);
    });
  }
  if (networkError) {
    console.error('[Network error]', networkError);
  }
});

// Split: use WebSocket for subscriptions, HTTP for everything else
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,     // Subscriptions go here
  from([errorLink, authLink, httpLink])  // Queries/mutations go here
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          messages: {
            keyArgs: ['channelId'],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '在 React 组件中使用 useSubscription' : 'Using useSubscription in React Components'}
      </h3>
      <pre><code className="language-typescript">{`// src/components/ChatChannel.tsx
'use client';

import { useQuery, useSubscription, useMutation, gql } from '@apollo/client';

const GET_MESSAGES = gql` + '`' + `
  query GetMessages($channelId: String!, $limit: Int) {
    messages(channelId: $channelId, limit: $limit) {
      id
      content
      createdAt
      sender {
        id
        name
        avatar
      }
    }
  }
` + '`' + `;

const MESSAGE_SENT_SUBSCRIPTION = gql` + '`' + `
  subscription OnMessageSent($channelId: String!) {
    messageSent(channelId: $channelId) {
      id
      content
      createdAt
      sender {
        id
        name
        avatar
      }
    }
  }
` + '`' + `;

const SEND_MESSAGE_MUTATION = gql` + '`' + `
  mutation SendMessage($channelId: String!, $content: String!) {
    sendMessage(channelId: $channelId, content: $content) {
      id
      content
      createdAt
    }
  }
` + '`' + `;

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; name: string; avatar?: string };
}

export default function ChatChannel({ channelId }: { channelId: string }) {
  const [content, setContent] = React.useState('');

  // Initial data fetch
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { channelId, limit: 50 },
  });

  // Real-time subscription
  useSubscription(MESSAGE_SENT_SUBSCRIPTION, {
    variables: { channelId },
    onData: ({ client, data: subData }) => {
      const newMessage = subData.data?.messageSent;
      if (!newMessage) return;

      // Update Apollo cache with the new message
      client.cache.updateQuery(
        { query: GET_MESSAGES, variables: { channelId, limit: 50 } },
        (existing) => {
          if (!existing) return existing;
          // Avoid duplicates
          const exists = existing.messages.some((m: Message) => m.id === newMessage.id);
          if (exists) return existing;
          return { messages: [newMessage, ...existing.messages] };
        }
      );
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
    onError: (err) => console.error('Send failed:', err),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    await sendMessage({ variables: { channelId, content } });
    setContent('');
  };

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>
        {data?.messages?.map((msg: Message) => (
          <div key={msg.id}>
            <strong>{msg.sender.name}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}`}</code></pre>

      {/* Authentication in Subscriptions */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'Subscription 认证：connectionParams 与 Context' : 'Authentication in Subscriptions: connectionParams and Context'}
      </h2>
      <p>
        {isZh
          ? 'WebSocket 连接无法在握手后发送自定义 HTTP 头，因此认证通常通过 connectionParams 传递 JWT 令牌来实现。以下是完整的认证流程：'
          : 'WebSocket connections cannot send custom HTTP headers after the initial handshake. Authentication is typically handled via connectionParams. Here is the full authentication flow:'}
      </p>
      <pre><code className="language-typescript">{`// Server: src/server.ts — WebSocket authentication
import { useServer } from 'graphql-ws/lib/use/ws';
import jwt from 'jsonwebtoken';

const serverCleanup = useServer(
  {
    schema,
    context: async (ctx) => {
      // Extract token from connectionParams (sent by client)
      const authHeader = ctx.connectionParams?.authorization as string | undefined;

      if (!authHeader) {
        return { user: null };
      }

      try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const user = await db.users.findUnique({ where: { id: decoded.sub } });
        return { user };
      } catch (err) {
        // Invalid token — return null user, let resolvers handle authorization
        console.error('WebSocket auth error:', err);
        return { user: null };
      }
    },
    onConnect: async (ctx) => {
      // Optional: reject connection entirely if no valid token
      const authHeader = ctx.connectionParams?.authorization as string | undefined;
      if (!authHeader) {
        // Return true to allow anonymous connections,
        // or throw an error to reject:
        // throw new Error('Unauthorized');
        return true;
      }
      return true;
    },
  },
  wsServer
);

// Client: src/lib/apollo-client.ts — sending auth token
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
    connectionParams: async () => {
      // This function is called on each connection attempt
      const token = await getToken(); // Your token retrieval logic
      return {
        authorization: token ? 'Bearer ' + token : '',
      };
    },
    // Re-establish connection when token changes
    shouldRetry: () => true,
  })
);`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '在 Subscription 解析器中校验认证' : 'Checking Authentication in Subscription Resolvers'}
      </h3>
      <pre><code className="language-typescript">{`// src/resolvers.ts — authorization in subscription resolvers
export const resolvers = {
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (_, args, context) => {
          // Check authentication before subscribing
          if (!context.user) {
            throw new Error('You must be logged in to subscribe to messages');
          }

          // Check channel membership authorization
          if (!context.user.channelIds.includes(args.channelId)) {
            throw new Error('You do not have access to this channel');
          }

          return pubsub.asyncIterator([EVENTS.MESSAGE_SENT]);
        },
        (payload, variables) =>
          payload.messageSent.channelId === variables.channelId
      ),
    },
  },
};`}</code></pre>

      {/* Scaling with Redis PubSub */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '扩展订阅：Redis PubSub 与横向扩展' : 'Scaling Subscriptions: Redis PubSub and Horizontal Scaling'}
      </h2>
      <p>
        {isZh
          ? '内置的 PubSub 只在单个 Node.js 进程内工作。在多实例部署中，连接到实例 A 的客户端无法接收到实例 B 发布的事件。解决方案是使用 Redis PubSub——它通过 Redis 频道在所有实例之间广播事件。'
          : 'The in-memory PubSub works only within a single Node.js process. In a multi-instance deployment, clients connected to instance A will not receive events published by instance B. The solution is Redis PubSub, which broadcasts events across all instances via Redis channels.'}
      </p>
      <pre><code className="language-bash">{`# Install Redis PubSub for GraphQL
npm install graphql-redis-subscriptions ioredis`}</code></pre>

      <pre><code className="language-typescript">{`// src/pubsub.ts — Redis-backed PubSub
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const redisOptions: Redis.RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  enableOfflineQueue: false,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
};

export const pubsub = new RedisPubSub({
  // Use separate connections for publisher and subscriber
  // (Redis requires separate connections for pub and sub)
  publisher: new Redis(redisOptions),
  subscriber: new Redis(redisOptions),
});

// Test the connection
pubsub.getSubscriber().on('connect', () => {
  console.log('Redis subscriber connected');
});
pubsub.getPublisher().on('connect', () => {
  console.log('Redis publisher connected');
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '横向扩展架构' : 'Horizontal Scaling Architecture'}
      </h3>
      <pre><code className="language-text">{`Load Balancer (Nginx / AWS ALB)
    |              |              |
    |              |              |
Server A       Server B       Server C
(WebSocket)   (WebSocket)   (WebSocket)
    |              |              |
    +------+--------+------+------+
           |                |
    Redis PubSub      Redis PubSub
    (subscriber)      (publisher)
           |                |
           +-------+--------+
                   |
              Redis Server
              (event bus)

Event flow:
1. Client connected to Server A sends mutation
2. Server A publishes event to Redis channel
3. Redis broadcasts to all subscribers (A, B, C)
4. Each server delivers to its locally connected subscribers`}</code></pre>

      <p>
        {isZh
          ? '使用 Redis PubSub 时，确保负载均衡器配置了 WebSocket sticky sessions 或者使用支持 WebSocket 的负载均衡策略，以防止连接在请求之间被意外切换到不同的服务器实例。'
          : 'When using Redis PubSub, ensure your load balancer is configured with WebSocket sticky sessions, or use an application-level routing strategy that keeps WebSocket connections on the same server instance throughout their lifetime.'}
      </p>

      {/* Real-time Platform Comparison */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '实时数据平台对比：Apollo vs Hasura vs Supabase' : 'Real-time Platform Comparison: Apollo vs Hasura vs Supabase'}
      </h2>
      <p>
        {isZh
          ? '除了自行构建 GraphQL 订阅服务外，还有多个托管平台提供开箱即用的实时数据能力：'
          : 'Beyond building your own subscription server, several managed platforms provide out-of-the-box real-time capabilities:'}
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '700' }}>
                {isZh ? '特性' : 'Feature'}
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '700' }}>
                Apollo (DIY)
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '700' }}>
                Hasura
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '700' }}>
                Supabase
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '实现方式' : 'Implementation', isZh ? '手动编写' : 'Manual code', isZh ? '自动生成' : 'Auto-generated', isZh ? '自动生成' : 'Auto-generated'],
              [isZh ? '传输协议' : 'Transport', 'WebSocket / SSE', 'WebSocket', 'WebSocket / Realtime'],
              [isZh ? '数据库实时' : 'DB real-time', isZh ? '通过代码触发' : 'Via code triggers', isZh ? 'PostgreSQL 轮询' : 'PostgreSQL polling', isZh ? 'PostgreSQL WAL' : 'PostgreSQL WAL'],
              [isZh ? '自定义业务逻辑' : 'Custom logic', isZh ? '完全控制' : 'Full control', isZh ? '有限（Actions）' : 'Limited (Actions)', isZh ? '有限（Edge Functions）' : 'Limited (Edge Functions)'],
              [isZh ? '扩展性' : 'Scalability', isZh ? '手动（需 Redis）' : 'Manual (needs Redis)', isZh ? '内置扩展' : 'Built-in scaling', isZh ? '内置扩展' : 'Built-in scaling'],
              [isZh ? '权限控制' : 'Auth / Permissions', isZh ? '完全自定义' : 'Fully custom', isZh ? '基于角色' : 'Role-based', isZh ? '基于行级安全' : 'Row-level security'],
              [isZh ? '适用场景' : 'Best for', isZh ? '复杂定制需求' : 'Complex custom logic', isZh ? '快速 CRUD 实时' : 'Fast CRUD real-time', isZh ? '全栈快速开发' : 'Full-stack rapid dev'],
              [isZh ? '定价' : 'Pricing', isZh ? '基础设施费用' : 'Infra costs', isZh ? '免费 + 付费' : 'Free + paid tiers', isZh ? '免费 + 付费' : 'Free + paid tiers'],
            ].map(([feature, apollo, hasura, supabase], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0', fontWeight: '600' }}>{feature}</td>
                <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0' }}>{apollo}</td>
                <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0' }}>{hasura}</td>
                <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0' }}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SSE as Alternative */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'Server-Sent Events（SSE）作为 WebSocket 替代方案' : 'Server-Sent Events (SSE) as a WebSocket Alternative'}
      </h2>
      <p>
        {isZh
          ? 'SSE 是基于 HTTP 的单向服务端推送协议。与 WebSocket 相比，SSE 在代理环境中更加友好，且支持自动重连。graphql-sse 库实现了基于 SSE 的 GraphQL 订阅。'
          : 'Server-Sent Events is an HTTP-based unidirectional push protocol. Compared to WebSockets, SSE is more proxy-friendly and supports automatic reconnection. The graphql-sse library implements GraphQL subscriptions over SSE.'}
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? 'WebSocket vs SSE 对比' : 'WebSocket vs SSE Comparison'}
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: '700' }}>
                {isZh ? '特性' : 'Feature'}
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: '700' }}>
                WebSocket
              </th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: '700' }}>
                SSE
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '通信方向' : 'Direction', isZh ? '双向' : 'Bidirectional', isZh ? '仅服务端到客户端' : 'Server to client only'],
              [isZh ? '协议' : 'Protocol', 'ws:// / wss://', 'HTTP/1.1 or HTTP/2'],
              [isZh ? '代理支持' : 'Proxy support', isZh ? '需要特殊配置' : 'Requires special config', isZh ? '原生支持' : 'Works natively'],
              [isZh ? '自动重连' : 'Auto-reconnect', isZh ? '需手动实现' : 'Manual implementation', isZh ? '浏览器内置' : 'Browser built-in'],
              [isZh ? '连接数限制' : 'Connection limits', isZh ? '无限制' : 'Unlimited', 'HTTP/1.1: 6, HTTP/2: unlimited'],
              [isZh ? '服务端复杂度' : 'Server complexity', isZh ? '需要 WS 服务' : 'Separate WS server', isZh ? '普通 HTTP 端点' : 'Plain HTTP endpoint'],
              [isZh ? '适用场景' : 'Best for', isZh ? '交互式实时应用' : 'Interactive real-time', isZh ? '只读数据流' : 'Read-only data streams'],
            ].map(([feature, ws, sse], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0', fontWeight: '600' }}>{feature}</td>
                <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0' }}>{ws}</td>
                <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0' }}>{sse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? 'graphql-sse 服务端实现' : 'graphql-sse Server Implementation'}
      </h3>
      <pre><code className="language-typescript">{`// SSE-based GraphQL subscriptions with graphql-sse
// npm install graphql-sse

import express from 'express';
import { createHandler } from 'graphql-sse/lib/use/express';
import { schema } from './schema';

const app = express();

// Mount SSE handler at /graphql/stream
app.use(
  '/graphql/stream',
  createHandler({
    schema,
    context: async (req) => {
      // Standard HTTP auth works here — cookies and Authorization headers
      const token = req.headers.authorization?.replace('Bearer ', '');
      const user = token ? await verifyToken(token) : null;
      return { user };
    },
  })
);

app.listen(4000, () => {
  console.log('SSE GraphQL server at http://localhost:4000/graphql/stream');
});`}</code></pre>

      <pre><code className="language-typescript">{`// SSE client with Apollo Client
// npm install graphql-sse @apollo/client

import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { createClient } from 'graphql-sse';
import { SSELink } from './sse-link'; // Custom link

// Create SSE link (see graphql-sse docs for SSELink implementation)
const sseLink = new SSELink({
  url: 'http://localhost:4000/graphql/stream',
  headers: () => ({
    authorization: 'Bearer ' + localStorage.getItem('auth_token'),
  }),
});

export const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return def.kind === 'OperationDefinition' && def.operation === 'subscription';
    },
    sseLink,
    httpLink
  ),
  cache: new InMemoryCache(),
});`}</code></pre>

      {/* Error Handling and Reconnection */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '错误处理与重连机制' : 'Error Handling and Reconnection'}
      </h2>
      <p>
        {isZh
          ? '生产环境中的订阅必须能优雅地处理网络中断、服务器重启和认证过期等情况。以下是完整的错误处理策略：'
          : 'Production subscriptions must gracefully handle network interruptions, server restarts, and expired authentication. Here is a comprehensive error handling strategy:'}
      </p>
      <pre><code className="language-typescript">{`// src/lib/apollo-client.ts — robust reconnection setup
import { createClient } from 'graphql-ws';

const wsClient = createClient({
  url: 'ws://localhost:4000/graphql',
  connectionParams: () => ({
    authorization: 'Bearer ' + localStorage.getItem('auth_token'),
  }),

  // Retry configuration
  retryAttempts: 10,
  retryWait: async (retries) => {
    // Exponential backoff: 1s, 2s, 4s, 8s... up to 30s
    const delay = Math.min(1000 * Math.pow(2, retries), 30000);
    await new Promise((resolve) => setTimeout(resolve, delay));
  },
  shouldRetry: (errOrCloseEvent) => {
    // Retry on network errors and abnormal closes
    // Do not retry on auth errors (close code 4400)
    if (errOrCloseEvent instanceof CloseEvent) {
      return errOrCloseEvent.code !== 4400 && errOrCloseEvent.code !== 4401;
    }
    return true;
  },

  // Lifecycle hooks
  on: {
    connecting: () => console.log('WS: connecting...'),
    connected: (socket, payload, wasRetry) => {
      console.log('WS: connected', wasRetry ? '(after retry)' : '');
    },
    closed: (event) => {
      console.log('WS: closed', event);
    },
    error: (err) => {
      console.error('WS: error', err);
    },
    ping: (received) => {
      if (!received) console.log('WS: ping sent');
    },
    pong: (received) => {
      if (received) console.log('WS: pong received');
    },
  },

  // Keep-alive: server sends pings every 10s
  keepAlive: 10_000,

  // Reconnect on any close
  lazyCloseTimeout: 3_000,
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '服务端错误处理' : 'Server-Side Error Handling'}
      </h3>
      <pre><code className="language-typescript">{`// src/server.ts — server-side error handling for subscriptions
const serverCleanup = useServer(
  {
    schema,
    context: async (ctx) => ({ /* ... */ }),
    onError: (ctx, message, errors) => {
      // Called when a subscription throws an error
      console.error('Subscription error:', errors);
    },
    onComplete: (ctx, message) => {
      // Called when client unsubscribes
      console.log('Subscription completed', message.id);
    },
    // Keep-alive ping interval (ms)
    // Clients that do not respond to pings will be disconnected
    keepAlive: 10_000,
  },
  wsServer
);

// Graceful shutdown on process signals
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing WebSocket server...');
  await serverCleanup.dispose();
  await server.stop();
  process.exit(0);
});`}</code></pre>

      {/* Subscription + Query/Mutation Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'Subscription 与 Query/Mutation 的组合模式' : 'Subscription + Query/Mutation Integration Patterns'}
      </h2>
      <p>
        {isZh
          ? '订阅通常与查询和变更组合使用：先通过 Query 加载初始状态，再通过 Subscription 接收后续更新。以下是几种常见的集成模式：'
          : 'Subscriptions are typically combined with queries and mutations: queries load initial state, subscriptions receive subsequent updates. Here are common integration patterns:'}
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '模式一：subscribeToMore（增量更新）' : 'Pattern 1: subscribeToMore (Incremental Updates)'}
      </h3>
      <pre><code className="language-typescript">{`// Use subscribeToMore to add real-time updates to an existing query
const { data, loading, subscribeToMore } = useQuery(GET_MESSAGES, {
  variables: { channelId },
});

// Set up subscription after initial query loads
React.useEffect(() => {
  const unsubscribe = subscribeToMore({
    document: MESSAGE_SENT_SUBSCRIPTION,
    variables: { channelId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newMessage = subscriptionData.data.messageSent;

      return {
        ...prev,
        messages: [newMessage, ...prev.messages],
      };
    },
  });

  // Cleanup on unmount or channelId change
  return () => unsubscribe();
}, [channelId, subscribeToMore]);`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '模式二：乐观更新 + 订阅确认' : 'Pattern 2: Optimistic Updates + Subscription Confirmation'}
      </h3>
      <pre><code className="language-typescript">{`// Optimistic UI: show message immediately, confirm via subscription
const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
  optimisticResponse: {
    sendMessage: {
      __typename: 'Message',
      id: 'temp-' + Date.now(),  // Temporary ID
      content: pendingContent,
      createdAt: new Date().toISOString(),
      sender: currentUser,
    },
  },
  update: (cache, { data }) => {
    // Update cache with actual response (replaces optimistic response)
    cache.updateQuery(
      { query: GET_MESSAGES, variables: { channelId } },
      (existing) => ({
        messages: [data.sendMessage, ...existing.messages.filter(
          (m) => !m.id.startsWith('temp-')
        )],
      })
    );
  },
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '模式三：游标分页 + 实时追加' : 'Pattern 3: Cursor Pagination + Real-time Append'}
      </h3>
      <pre><code className="language-typescript">{`// Combine paginated query with real-time subscription
// This pattern is common for news feeds and activity streams

const GET_POSTS = gql` + '`' + `
  query GetPosts($cursor: String) {
    posts(after: $cursor, first: 20) {
      edges {
        node { id title author { name } createdAt }
        cursor
      }
      pageInfo { hasNextPage endCursor }
    }
  }
` + '`' + `;

const NEW_POST_SUBSCRIPTION = gql` + '`' + `
  subscription OnNewPost {
    postCreated {
      id title author { name } createdAt
    }
  }
` + '`' + `;

// New posts arrive via subscription, older posts via pagination
useSubscription(NEW_POST_SUBSCRIPTION, {
  onData: ({ client, data }) => {
    const newPost = data.data?.postCreated;
    if (!newPost) return;

    // Prepend to the existing paginated list
    client.cache.updateQuery(
      { query: GET_POSTS, variables: { cursor: undefined } },
      (existing) => ({
        posts: {
          ...existing.posts,
          edges: [
            { node: newPost, cursor: newPost.id, __typename: 'PostEdge' },
            ...existing.posts.edges,
          ],
        },
      })
    );
  },
});`}</code></pre>

      {/* Performance Optimization */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '性能优化：过滤、批量与连接管理' : 'Performance Optimization: Filtering, Batching, and Connection Management'}
      </h2>
      <p>
        {isZh
          ? '不加优化的订阅会导致大量不必要的数据传输和服务端负载。以下是关键的性能优化技巧：'
          : 'Unoptimized subscriptions can cause unnecessary data transfer and server load. Here are key performance optimization techniques:'}
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '服务端事件过滤' : 'Server-Side Event Filtering'}
      </h3>
      <pre><code className="language-typescript">{`// Use withFilter to avoid sending irrelevant events over the wire
import { withFilter } from 'graphql-subscriptions';

export const resolvers = {
  Subscription: {
    // Only send messages to users in the correct channel AND with proper permissions
    messageSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([EVENTS.MESSAGE_SENT]),
        async (payload, variables, context) => {
          // Filter 1: channel match
          if (payload.messageSent.channelId !== variables.channelId) return false;

          // Filter 2: user has access to this channel
          const hasAccess = await db.channelMembers.findFirst({
            where: {
              channelId: variables.channelId,
              userId: context.user?.id,
            },
          });
          return !!hasAccess;
        }
      ),
    },

    // Batch multiple notifications into a single event
    notificationsBatch: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([EVENTS.NOTIFICATION_BATCH]),
        (payload, variables) => payload.userId === variables.userId
      ),
    },
  },
};

// Publish batched events (e.g., debounce rapid updates)
let pendingNotifications: Notification[] = [];
let batchTimer: NodeJS.Timeout | null = null;

function scheduleNotificationBatch(userId: string, notification: Notification) {
  pendingNotifications.push(notification);

  if (batchTimer) clearTimeout(batchTimer);

  // Batch notifications within a 100ms window
  batchTimer = setTimeout(() => {
    pubsub.publish(EVENTS.NOTIFICATION_BATCH, {
      notificationsBatch: { userId, notifications: pendingNotifications },
    });
    pendingNotifications = [];
    batchTimer = null;
  }, 100);
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '连接数限制与背压控制' : 'Connection Limits and Backpressure'}
      </h3>
      <pre><code className="language-typescript">{`// Limit concurrent subscriptions per user
const userSubscriptionCount = new Map<string, number>();
const MAX_SUBSCRIPTIONS_PER_USER = 10;

const serverCleanup = useServer(
  {
    schema,
    context: async (ctx) => {
      const user = await getUser(ctx.connectionParams);
      return { user };
    },
    onSubscribe: async (ctx, message) => {
      const userId = (ctx.extra as any).user?.id;
      if (!userId) return; // Anonymous allowed

      const count = userSubscriptionCount.get(userId) || 0;
      if (count >= MAX_SUBSCRIPTIONS_PER_USER) {
        return [new Error('Too many subscriptions. Maximum is ' + MAX_SUBSCRIPTIONS_PER_USER)];
      }
      userSubscriptionCount.set(userId, count + 1);
    },
    onComplete: (ctx, message) => {
      const userId = (ctx.extra as any).user?.id;
      if (!userId) return;

      const count = userSubscriptionCount.get(userId) || 1;
      userSubscriptionCount.set(userId, count - 1);
    },
    onDisconnect: (ctx) => {
      const userId = (ctx.extra as any).user?.id;
      if (userId) userSubscriptionCount.delete(userId);
    },
  },
  wsServer
);`}</code></pre>

      {/* Practical Use Cases */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '实际应用场景与完整示例' : 'Practical Use Cases and Complete Examples'}
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '场景一：实时协作光标追踪' : 'Use Case 1: Real-time Collaborative Cursor Tracking'}
      </h3>
      <pre><code className="language-typescript">{`// Schema for collaborative cursor positions
const COLLAB_SCHEMA = gql` + '`' + `
  type CursorPosition {
    userId: ID!
    userName: String!
    x: Float!
    y: Float!
    documentId: ID!
  }

  type Mutation {
    updateCursor(documentId: ID!, x: Float!, y: Float!): CursorPosition!
  }

  type Subscription {
    cursorMoved(documentId: ID!): CursorPosition!
  }
` + '`' + `;

// Throttle cursor updates to avoid flooding (max 10 updates/second)
const throttledPublish = throttle((documentId: string, position: CursorPosition) => {
  pubsub.publish('CURSOR_MOVED_' + documentId, { cursorMoved: position });
}, 100);

const collabResolvers = {
  Mutation: {
    updateCursor: async (_, { documentId, x, y }, { user }) => {
      const position = { userId: user.id, userName: user.name, x, y, documentId };
      throttledPublish(documentId, position);
      return position;
    },
  },
  Subscription: {
    cursorMoved: {
      subscribe: withFilter(
        (_, args) => pubsub.asyncIterator(['CURSOR_MOVED_' + args.documentId]),
        // Don't send users their own cursor back
        (payload, _, context) => payload.cursorMoved.userId !== context.user?.id
      ),
    },
  },
};`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        {isZh ? '场景二：实时仪表盘指标' : 'Use Case 2: Real-time Dashboard Metrics'}
      </h3>
      <pre><code className="language-typescript">{`// Schema for live metrics dashboard
const METRICS_SCHEMA = gql` + '`' + `
  type MetricUpdate {
    name: String!
    value: Float!
    unit: String!
    timestamp: String!
    trend: String! # "up" | "down" | "stable"
  }

  type Subscription {
    metricsUpdated(names: [String!]!): MetricUpdate!
  }
` + '`' + `;

// Publish metrics on a schedule or when they change
setInterval(async () => {
  const metrics = await collectSystemMetrics();

  for (const metric of metrics) {
    await pubsub.publish('METRICS_UPDATED', { metricsUpdated: metric });
  }
}, 5000); // Update every 5 seconds

const metricsResolvers = {
  Subscription: {
    metricsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['METRICS_UPDATED']),
        (payload, variables) =>
          variables.names.includes(payload.metricsUpdated.name)
      ),
    },
  },
};`}</code></pre>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.5rem',
          marginTop: '2.5rem',
          marginBottom: '2rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '1rem',
            marginTop: 0,
          }}
        >
          {isZh ? '核心要点总结' : 'Key Takeaways'}
        </h2>
        <ul style={{ paddingLeft: '1.5rem', margin: 0, lineHeight: '2' }}>
          {isZh ? (
            <>
              <li>始终使用 <strong>graphql-ws</strong>（graphql-transport-ws 协议），不要使用已废弃的 subscriptions-transport-ws</li>
              <li>使用 <strong>split link</strong> 将 HTTP 流量（Query/Mutation）与 WebSocket 流量（Subscription）分离</li>
              <li>通过 <strong>connectionParams</strong> 传递认证令牌，在服务端 onConnect 或 context 中验证</li>
              <li>使用 <strong>withFilter</strong> 在服务端过滤事件，避免发送不相关的数据</li>
              <li>单进程开发用内置 PubSub，生产多实例部署必须使用 <strong>Redis PubSub</strong></li>
              <li>配置 <strong>retryAttempts</strong> 和指数退避实现自动重连</li>
              <li>代理环境受限时，使用 <strong>SSE</strong>（graphql-sse）作为替代方案</li>
              <li>实施连接数限制和 keep-alive 机制，防止资源泄漏</li>
            </>
          ) : (
            <>
              <li>Always use <strong>graphql-ws</strong> (the graphql-transport-ws protocol); avoid the deprecated subscriptions-transport-ws</li>
              <li>Use a <strong>split link</strong> to route HTTP traffic (queries/mutations) and WebSocket traffic (subscriptions) correctly</li>
              <li>Pass auth tokens via <strong>connectionParams</strong>; verify them in the onConnect callback or context function</li>
              <li>Use <strong>withFilter</strong> to filter events server-side and avoid sending irrelevant data over the wire</li>
              <li>Use in-memory PubSub for single-process development; always use <strong>Redis PubSub</strong> for multi-instance production</li>
              <li>Configure <strong>retryAttempts</strong> with exponential backoff for automatic reconnection</li>
              <li>Use <strong>SSE</strong> (graphql-sse) as an alternative when WebSocket connections are blocked by proxies</li>
              <li>Implement connection limits and keep-alive pings to prevent resource leaks</li>
            </>
          )}
        </ul>
      </div>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '常见问题解答' : 'Frequently Asked Questions'}
      </h2>

      {faqSchema.mainEntity.map((faq, index) => (
        <div
          key={index}
          style={{
            marginBottom: '1.5rem',
            paddingBottom: '1.5rem',
            borderBottom: index < faqSchema.mainEntity.length - 1 ? '1px solid #e2e8f0' : 'none',
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
            {faq.name}
          </h3>
          <p style={{ margin: 0, color: '#475569', lineHeight: '1.7' }}>
            {faq.acceptedAnswer.text}
          </p>
        </div>
      ))}

      {/* Production Checklist */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '生产环境部署清单' : 'Production Deployment Checklist'}
      </h2>
      <pre><code className="language-text">{`GraphQL Subscriptions Production Checklist
==========================================

Transport & Protocol
[ ] Using graphql-ws (not subscriptions-transport-ws)
[ ] TLS/SSL enabled (wss:// in production)
[ ] CORS configured for WebSocket upgrade requests
[ ] WebSocket path secured (/graphql not exposed to crawlers)

Authentication & Authorization
[ ] JWT verified in WebSocket context function
[ ] Unauthorized connections rejected (code 4401)
[ ] Per-subscription authorization in resolver subscribe()
[ ] Token expiry handled (reconnect with fresh token)

Scalability
[ ] Redis PubSub configured (not in-memory PubSub)
[ ] Sticky sessions enabled in load balancer
[ ] Redis cluster or Sentinel for high availability
[ ] Connection limits per user enforced

Performance
[ ] withFilter() used to minimize unnecessary events
[ ] Event batching for high-frequency updates
[ ] Keep-alive ping interval configured (10-30s)
[ ] Subscription payload size monitored

Reliability
[ ] Automatic client reconnection configured
[ ] Exponential backoff on retry
[ ] Graceful server shutdown (serverCleanup.dispose())
[ ] Error logging and alerting configured

Monitoring
[ ] Active WebSocket connection count tracked
[ ] Subscription latency measured (p50, p95, p99)
[ ] Redis PubSub lag monitored
[ ] Connection error rate alerted`}</code></pre>

      {/* Conclusion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p>
        {isZh
          ? 'GraphQL 订阅为现代应用提供了强大的实时数据能力。通过 graphql-ws 和 Apollo 的组合，您可以构建从简单的聊天应用到复杂的协作工具的各种实时功能。关键在于：正确选择传输协议（使用 graphql-ws）、合理设计 PubSub 架构（生产环境使用 Redis）、做好认证和权限控制，以及实施客户端自动重连机制。'
          : 'GraphQL subscriptions provide powerful real-time data capabilities for modern applications. By combining graphql-ws and Apollo, you can build everything from simple chat apps to complex collaborative tools. The keys to success are: choosing the right transport (graphql-ws), designing a proper PubSub architecture (Redis for production), implementing robust authentication, and configuring automatic client reconnection.'}
      </p>
      <p>
        {isZh
          ? '随着应用规模增长，订阅的性能优化变得尤为重要：使用 withFilter 减少不必要的数据传输，通过连接数限制防止资源滥用，并通过 Redis PubSub 确保多实例环境下的事件一致性。掌握这些模式，您将能够构建真正生产级别的实时 GraphQL 应用。'
          : 'As your application scales, subscription performance optimization becomes critical: use withFilter to reduce unnecessary data transfer, enforce connection limits to prevent resource abuse, and rely on Redis PubSub for event consistency across multiple server instances. Mastering these patterns will equip you to build truly production-grade real-time GraphQL applications.'}
      </p>
    </article>
  );
}
