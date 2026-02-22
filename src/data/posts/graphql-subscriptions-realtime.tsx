'use client';

import Link from 'next/link';

export default function GraphQLSubscriptionsRealtime({ lang }: { lang: string }) {
  return (
    <>
      <h2>GraphQL Subscriptions: Building Real-Time Applications</h2>
      <p>
        Real-time data is no longer a nice-to-have -- it is expected. Users want live notifications, real-time dashboards, collaborative editing, and instant messaging. <strong>GraphQL subscriptions</strong> provide a standardized way to push server-side events to clients over persistent connections, typically using WebSocket. This guide covers everything from the fundamentals of GraphQL subscriptions to production-ready implementations with authentication, scaling, and error handling.
      </p>
      <p>
        Whether you are building a chat application, a live dashboard, or a collaborative tool, this guide provides the patterns and code you need to implement real-time features with GraphQL.
      </p>

      <h2>How GraphQL Subscriptions Work</h2>
      <p>
        Unlike queries and mutations (which follow a request-response pattern over HTTP), subscriptions establish a long-lived connection between the client and server. When an event occurs on the server, data is pushed to all subscribed clients automatically.
      </p>

      <h3>The Subscription Lifecycle</h3>
      <pre><code className="language-text">{`Client                          Server
  |                                |
  |-- WebSocket Handshake -------->|
  |<-------- Connection Ack -------|
  |                                |
  |-- Subscribe (operation) ------>|
  |<-------- Subscription Ack -----|
  |                                |
  |       [Server-side event]      |
  |<-------- Data Push ------------|
  |                                |
  |       [Another event]          |
  |<-------- Data Push ------------|
  |                                |
  |       [Another event]          |
  |<-------- Data Push ------------|
  |                                |
  |-- Unsubscribe --------------->|
  |<-------- Complete -------------|
  |                                |
  |-- Close Connection ----------->|
  |<-------- Connection Close -----|`}</code></pre>

      <h3>Transport Protocols</h3>
      <table>
        <thead>
          <tr><th>Protocol</th><th>Library</th><th>Status</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>graphql-ws</td><td>graphql-ws</td><td>Current standard</td><td>Recommended for new projects</td></tr>
          <tr><td>subscriptions-transport-ws</td><td>subscriptions-transport-ws</td><td>Deprecated</td><td>Legacy, do not use for new projects</td></tr>
          <tr><td>SSE (Server-Sent Events)</td><td>graphql-sse</td><td>Alternative</td><td>Unidirectional, works through proxies</td></tr>
        </tbody>
      </table>

      <h2>Server Implementation with graphql-yoga</h2>
      <p>
        graphql-yoga is a modern, batteries-included GraphQL server that supports subscriptions out of the box. Here is a complete implementation for a real-time messaging system.
      </p>

      <h3>Schema Definition</h3>
      <pre><code className="language-typescript">{`// schema.ts
import { createSchema } from 'graphql-yoga';

export const schema = createSchema({
  typeDefs: \`
    type Message {
      id: ID!
      content: String!
      sender: User!
      channel: String!
      createdAt: String!
    }

    type User {
      id: ID!
      name: String!
      avatar: String
      status: UserStatus!
    }

    enum UserStatus {
      ONLINE
      OFFLINE
      AWAY
    }

    type Query {
      messages(channel: String!, limit: Int = 50): [Message!]!
      channels: [String!]!
    }

    type Mutation {
      sendMessage(channel: String!, content: String!): Message!
      updateStatus(status: UserStatus!): User!
    }

    type Subscription {
      # Subscribe to new messages in a specific channel
      messageReceived(channel: String!): Message!

      # Subscribe to user status changes
      userStatusChanged: User!

      # Subscribe to typing indicators
      userTyping(channel: String!): TypingIndicator!
    }

    type TypingIndicator {
      user: User!
      isTyping: Boolean!
    }
  \`,
  resolvers: {
    // Resolvers defined below
  },
});`}</code></pre>

      <h3>Subscription Resolvers with Pub/Sub</h3>
      <pre><code className="language-typescript">{`// pubsub.ts
import { createPubSub } from 'graphql-yoga';

// Type-safe pub/sub channels
type PubSubChannels = {
  'message:received': [{ messageReceived: Message; channel: string }];
  'user:status': [{ userStatusChanged: User }];
  'user:typing': [{ userTyping: TypingIndicator; channel: string }];
};

export const pubsub = createPubSub<PubSubChannels>();

// resolvers.ts
import { pubsub } from './pubsub';

export const resolvers = {
  Query: {
    messages: async (_: unknown, args: { channel: string; limit: number }) => {
      return db.messages.findMany({
        where: { channel: args.channel },
        orderBy: { createdAt: 'desc' },
        take: args.limit,
        include: { sender: true },
      });
    },
  },

  Mutation: {
    sendMessage: async (
      _: unknown,
      args: { channel: string; content: string },
      context: Context
    ) => {
      const message = await db.messages.create({
        data: {
          content: args.content,
          channel: args.channel,
          senderId: context.userId,
          createdAt: new Date().toISOString(),
        },
        include: { sender: true },
      });

      // Publish to all subscribers of this channel
      pubsub.publish('message:received', {
        messageReceived: message,
        channel: args.channel,
      });

      return message;
    },

    updateStatus: async (
      _: unknown,
      args: { status: string },
      context: Context
    ) => {
      const user = await db.users.update({
        where: { id: context.userId },
        data: { status: args.status },
      });

      pubsub.publish('user:status', {
        userStatusChanged: user,
      });

      return user;
    },
  },

  Subscription: {
    messageReceived: {
      subscribe: (_: unknown, args: { channel: string }) => {
        // Filter: only receive messages for the subscribed channel
        return pubsub.subscribe('message:received', {
          filter: (payload) => payload.channel === args.channel,
        });
      },
      resolve: (payload: { messageReceived: Message }) => {
        return payload.messageReceived;
      },
    },

    userStatusChanged: {
      subscribe: () => pubsub.subscribe('user:status'),
      resolve: (payload: { userStatusChanged: User }) => {
        return payload.userStatusChanged;
      },
    },

    userTyping: {
      subscribe: (_: unknown, args: { channel: string }) => {
        return pubsub.subscribe('user:typing', {
          filter: (payload) => payload.channel === args.channel,
        });
      },
      resolve: (payload: { userTyping: TypingIndicator }) => {
        return payload.userTyping;
      },
    },
  },
};`}</code></pre>

      <h3>Server Setup</h3>
      <pre><code className="language-typescript">{`// server.ts
import { createServer } from 'http';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
import { useAuth } from './plugins/auth';

const yoga = createYoga({
  schema,
  plugins: [useAuth()],
  graphiql: {
    // Enable subscriptions in GraphiQL
    subscriptionsProtocol: 'WS',
  },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('GraphQL server running at http://localhost:4000/graphql');
  console.log('WebSocket subscriptions at ws://localhost:4000/graphql');
});`}</code></pre>

      <h2>Client Implementation</h2>
      <p>
        The client needs a WebSocket connection to receive subscription data. Here are implementations for the most popular GraphQL clients.
      </p>

      <h3>Apollo Client Setup</h3>
      <pre><code className="language-typescript">{`// apollo-client.ts
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: 'https://api.example.com/graphql',
  headers: {
    authorization: \`Bearer \${getToken()}\`,
  },
});

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://api.example.com/graphql',
    connectionParams: () => ({
      // Auth token sent during WebSocket handshake
      authorization: \`Bearer \${getToken()}\`,
    }),
    // Automatic reconnection
    retryAttempts: 5,
    shouldRetry: () => true,
    on: {
      connected: () => console.log('WebSocket connected'),
      closed: () => console.log('WebSocket closed'),
      error: (err) => console.error('WebSocket error:', err),
    },
  })
);

// Split traffic: subscriptions go to WebSocket, everything else to HTTP
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});`}</code></pre>

      <h3>React Subscription Hook</h3>
      <pre><code className="language-typescript">{`// hooks/useMessages.ts
import { gql, useQuery, useSubscription } from '@apollo/client';

const GET_MESSAGES = gql\`
  query GetMessages($channel: String!, $limit: Int) {
    messages(channel: $channel, limit: $limit) {
      id
      content
      sender {
        id
        name
        avatar
      }
      createdAt
    }
  }
\`;

const MESSAGE_SUBSCRIPTION = gql\`
  subscription OnMessageReceived($channel: String!) {
    messageReceived(channel: $channel) {
      id
      content
      sender {
        id
        name
        avatar
      }
      createdAt
    }
  }
\`;

export function useMessages(channel: string) {
  // Initial query to load existing messages
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { channel, limit: 50 },
  });

  // Subscribe to new messages
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { channel },
    onData: ({ client, data: subscriptionData }) => {
      const newMessage = subscriptionData.data?.messageReceived;
      if (!newMessage) return;

      // Update the Apollo cache with the new message
      client.cache.modify({
        fields: {
          messages(existingMessages = []) {
            const newMessageRef = client.cache.writeFragment({
              data: newMessage,
              fragment: gql\`
                fragment NewMessage on Message {
                  id
                  content
                  sender {
                    id
                    name
                    avatar
                  }
                  createdAt
                }
              \`,
            });
            return [...existingMessages, newMessageRef];
          },
        },
      });
    },
    onError: (error) => {
      console.error('Subscription error:', error);
    },
  });

  return {
    messages: data?.messages ?? [],
    loading,
    error,
  };
}

// Usage in a component
function ChatRoom({ channel }: { channel: string }) {
  const { messages, loading, error } = useMessages(channel);

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.sender.name}:</strong> {msg.content}
        </div>
      ))}
    </div>
  );
}`}</code></pre>

      <h2>Authentication for Subscriptions</h2>
      <p>
        WebSocket connections require special handling for authentication because headers cannot be set after the initial handshake. There are two main approaches: connection params and cookie-based auth.
      </p>

      <h3>Token-Based Authentication</h3>
      <pre><code className="language-typescript">{`// Server-side: Authenticate WebSocket connections
import { createYoga } from 'graphql-yoga';
import { useAuth } from './plugins/auth';

function useAuth() {
  return {
    onSubscribe: async ({ ctx, subscribe }) => {
      // Access connection params from WebSocket handshake
      const token = ctx.connectionParams?.authorization;

      if (!token) {
        throw new Error('Authentication required');
      }

      try {
        const user = await verifyToken(token.replace('Bearer ', ''));
        // Attach user to context for resolver access
        ctx.userId = user.id;
        ctx.userRole = user.role;
      } catch (err) {
        throw new Error('Invalid or expired token');
      }
    },
  };
}

// Client-side: Handle token refresh for long-lived connections
const wsClient = createClient({
  url: 'wss://api.example.com/graphql',
  connectionParams: async () => {
    // Get fresh token on each connection/reconnection
    const token = await getOrRefreshToken();
    return {
      authorization: \`Bearer \${token}\`,
    };
  },
  // Reconnect when token expires
  keepAlive: 30000,
  retryAttempts: Infinity,
  retryWait: async (retries) => {
    // Exponential backoff with jitter
    const baseDelay = Math.min(1000 * 2 ** retries, 30000);
    const jitter = Math.random() * 1000;
    await new Promise((r) => setTimeout(r, baseDelay + jitter));
  },
});`}</code></pre>

      <h2>Scaling Subscriptions in Production</h2>
      <p>
        A single server can handle thousands of WebSocket connections, but production applications need horizontal scaling. The key challenge is that subscriptions are stateful -- a publish event on one server instance must reach subscribers connected to other instances.
      </p>

      <h3>Redis Pub/Sub for Multi-Instance Scaling</h3>
      <pre><code className="language-typescript">{`// redis-pubsub.ts
import { createClient } from 'redis';

// Create separate Redis clients for pub and sub
const publishClient = createClient({ url: process.env.REDIS_URL });
const subscribeClient = publishClient.duplicate();

await publishClient.connect();
await subscribeClient.connect();

// Distributed pub/sub that works across server instances
class RedisPubSub {
  private subscriptions = new Map<string, Set<(data: any) => void>>();

  async publish(channel: string, data: unknown): Promise<void> {
    await publishClient.publish(channel, JSON.stringify(data));
  }

  async subscribe(channel: string, callback: (data: any) => void): Promise<() => void> {
    if (!this.subscriptions.has(channel)) {
      this.subscriptions.set(channel, new Set());
      // Subscribe to Redis channel
      await subscribeClient.subscribe(channel, (message) => {
        const data = JSON.parse(message);
        const callbacks = this.subscriptions.get(channel);
        callbacks?.forEach((cb) => cb(data));
      });
    }

    this.subscriptions.get(channel)!.add(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscriptions.get(channel);
      callbacks?.delete(callback);
      if (callbacks?.size === 0) {
        this.subscriptions.delete(channel);
        subscribeClient.unsubscribe(channel);
      }
    };
  }
}

export const redisPubSub = new RedisPubSub();`}</code></pre>

      <h3>Scaling Architecture</h3>
      <pre><code className="language-text">{`Production Subscription Architecture:

Clients (Browsers/Apps)
    |
    v
[Load Balancer (sticky sessions for WebSocket)]
    |
    +--> [Server Instance 1] --+
    |                          |
    +--> [Server Instance 2] --+--> [Redis Pub/Sub]
    |                          |
    +--> [Server Instance 3] --+
                               |
                          [PostgreSQL]

Key Requirements:
1. Sticky sessions: WebSocket connections must stay on the same server
2. Redis Pub/Sub: Distributes events across all server instances
3. Connection limits: Monitor and limit connections per instance
4. Health checks: Detect and drain unhealthy instances gracefully`}</code></pre>

      <h2>Error Handling and Resilience</h2>
      <p>
        Real-time connections are inherently fragile. Network interruptions, server restarts, and deployment rollouts will all disconnect clients. Your implementation must handle these gracefully.
      </p>

      <h3>Client-Side Resilience</h3>
      <pre><code className="language-typescript">{`// Resilient subscription hook with reconnection
function useResilientSubscription<TData>(
  subscription: DocumentNode,
  options: {
    variables?: Record<string, unknown>;
    onData: (data: TData) => void;
    onError?: (error: Error) => void;
    onReconnect?: () => void;
  }
) {
  const [connectionState, setConnectionState] = useState<
    'connecting' | 'connected' | 'disconnected' | 'reconnecting'
  >('connecting');

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let retryCount = 0;
    let retryTimeout: NodeJS.Timeout;

    async function connect() {
      try {
        setConnectionState(retryCount > 0 ? 'reconnecting' : 'connecting');

        unsubscribe = client.subscribe(
          { query: subscription, variables: options.variables },
          {
            next: (result) => {
              setConnectionState('connected');
              retryCount = 0;
              if (result.data) {
                options.onData(result.data as TData);
              }
            },
            error: (err) => {
              setConnectionState('disconnected');
              options.onError?.(err);
              scheduleRetry();
            },
            complete: () => {
              setConnectionState('disconnected');
              scheduleRetry();
            },
          }
        );
      } catch (err) {
        setConnectionState('disconnected');
        scheduleRetry();
      }
    }

    function scheduleRetry() {
      const delay = Math.min(1000 * 2 ** retryCount, 30000);
      retryCount++;
      retryTimeout = setTimeout(() => {
        options.onReconnect?.();
        connect();
      }, delay);
    }

    connect();

    return () => {
      unsubscribe?.();
      clearTimeout(retryTimeout);
    };
  }, [subscription, JSON.stringify(options.variables)]);

  return { connectionState };
}`}</code></pre>

      <h2>Performance Optimization</h2>
      <p>
        Subscriptions can become a performance bottleneck if not managed carefully. Here are key optimization strategies.
      </p>

      <h3>Subscription Throttling and Batching</h3>
      <pre><code className="language-typescript">{`// Server-side: Throttle high-frequency events
function createThrottledPublisher(pubsub: PubSub, intervalMs: number) {
  const pending = new Map<string, unknown>();
  let timer: NodeJS.Timeout | null = null;

  return {
    publish(channel: string, data: unknown) {
      pending.set(channel, data);

      if (!timer) {
        timer = setTimeout(() => {
          // Flush all pending events
          for (const [ch, payload] of pending) {
            pubsub.publish(ch, payload);
          }
          pending.clear();
          timer = null;
        }, intervalMs);
      }
    },
  };
}

// Usage: Throttle dashboard updates to once per second
const throttled = createThrottledPublisher(pubsub, 1000);

// Instead of publishing every database change:
throttled.publish('dashboard:metrics', { cpu: 45, memory: 72, requests: 1250 });

// Client-side: Batch incoming subscription data
function useBatchedSubscription<T>(
  subscription: DocumentNode,
  batchIntervalMs: number = 100
) {
  const [items, setItems] = useState<T[]>([]);
  const bufferRef = useRef<T[]>([]);

  useSubscription(subscription, {
    onData: ({ data }) => {
      bufferRef.current.push(data.data);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (bufferRef.current.length > 0) {
        setItems((prev) => [...prev, ...bufferRef.current]);
        bufferRef.current = [];
      }
    }, batchIntervalMs);
    return () => clearInterval(interval);
  }, [batchIntervalMs]);

  return items;
}`}</code></pre>

      <h2>Testing Subscriptions</h2>
      <pre><code className="language-typescript">{`// Integration test for subscriptions
import { createYoga } from 'graphql-yoga';
import { createClient } from 'graphql-ws';
import { WebSocket } from 'ws';

describe('Message Subscriptions', () => {
  let server: ReturnType<typeof createServer>;
  let wsClient: ReturnType<typeof createClient>;

  beforeAll(async () => {
    const yoga = createYoga({ schema });
    server = createServer(yoga);
    await new Promise<void>((resolve) => server.listen(0, resolve));

    const port = (server.address() as any).port;
    wsClient = createClient({
      url: \`ws://localhost:\${port}/graphql\`,
      webSocketImpl: WebSocket,
    });
  });

  afterAll(async () => {
    await wsClient.dispose();
    server.close();
  });

  it('receives messages in subscribed channel', async () => {
    const receivedMessages: any[] = [];

    // Start subscription
    const subscription = wsClient.iterate({
      query: \`
        subscription {
          messageReceived(channel: "general") {
            id
            content
            sender { name }
          }
        }
      \`,
    });

    // Send a message via mutation
    await client.mutate({
      mutation: SEND_MESSAGE,
      variables: { channel: 'general', content: 'Hello!' },
    });

    // Verify subscription received the message
    const result = await subscription.next();
    expect(result.value?.data?.messageReceived?.content).toBe('Hello!');
  });
});`}</code></pre>

      <h2>When to Use Subscriptions vs Alternatives</h2>
      <table>
        <thead>
          <tr><th>Approach</th><th>Best For</th><th>Limitations</th></tr>
        </thead>
        <tbody>
          <tr><td>GraphQL Subscriptions</td><td>Real-time updates, chat, live data</td><td>Requires WebSocket, stateful connections</td></tr>
          <tr><td>Polling</td><td>Infrequent updates, simple setup</td><td>Wastes bandwidth, delayed updates</td></tr>
          <tr><td>Server-Sent Events (SSE)</td><td>One-way server push, simple</td><td>Unidirectional, limited browser connections</td></tr>
          <tr><td>Long Polling</td><td>Fallback when WebSocket unavailable</td><td>Higher latency, more server load</td></tr>
          <tr><td>WebSocket (raw)</td><td>Maximum control, binary data</td><td>No standard schema, more boilerplate</td></tr>
        </tbody>
      </table>

      <h2>Conclusion</h2>
      <p>
        GraphQL subscriptions provide a powerful, standardized way to build real-time features in your applications. By combining the type safety of your GraphQL schema with persistent WebSocket connections, you get real-time updates that are as well-typed and predictable as your queries and mutations.
      </p>
      <p>
        Start with a simple pub/sub implementation using graphql-yoga or Apollo Server, add authentication through connection params, and scale horizontally with Redis pub/sub. Invest in client-side resilience with automatic reconnection and error handling from the start -- these patterns are much harder to retrofit later.
      </p>
      <p>
        Test your GraphQL queries with our <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link>, or learn more about API design patterns in our <Link href={`/${lang}/blog/api-authentication-oauth-jwt-apikey`}>API Authentication guide</Link>.
      </p>
    </>
  );
}
