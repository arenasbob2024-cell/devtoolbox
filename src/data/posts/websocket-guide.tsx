'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'WebSocket Complete Guide: Real-Time Connections with ws, Socket.io, and React — 2024',
    description: 'Master WebSockets from first principles. Complete guide covering browser API, Node.js ws library, Socket.io rooms, React hooks, JWT auth, Python asyncio, Go gorilla/websocket, scaling with Redis, and error handling.',
  },
  zh: {
    title: 'WebSocket 完整指南：ws、Socket.io 与 React 实时连接 — 2024',
    description: '从基础掌握 WebSocket。含浏览器 API、Node.js ws 库、Socket.io 房间、React Hooks、JWT 认证、Python asyncio、Go gorilla/websocket、Redis 扩展和错误处理的完整指南。',
  },
};

export default function WebsocketGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between WebSocket and HTTP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HTTP is a request-response protocol: the client sends a request, the server replies, and the connection closes (or is reused briefly in HTTP/1.1 keep-alive). WebSocket is a persistent, full-duplex protocol: after an initial HTTP upgrade handshake, the connection stays open and both client and server can send messages at any time without the other side requesting them. This makes WebSocket ideal for real-time applications like chat, live dashboards, multiplayer games, and collaborative editing where the server needs to push data without being asked.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I open a WebSocket connection in the browser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the native WebSocket API: const ws = new WebSocket("wss://example.com/ws"). Then attach event handlers: ws.onopen for connection established, ws.onmessage for incoming data, ws.onclose for disconnection, and ws.onerror for errors. Send data with ws.send("text") or ws.send(JSON.stringify(obj)). Check ws.readyState: 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED. Always use wss:// (WebSocket Secure) in production — it runs over TLS like HTTPS.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Socket.io differ from raw WebSockets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Socket.io is a higher-level library built on top of WebSocket (with HTTP long-polling as a fallback). It adds features that raw WebSocket lacks: automatic reconnection, rooms and namespaces for organizing connections, acknowledgment callbacks (like RPC), broadcasting to groups of clients, and a consistent API across environments. The trade-off is a larger bundle size and the requirement that both client and server use Socket.io (they are not interoperable with plain WebSocket clients/servers). For simple use cases, raw WebSocket or a lightweight wrapper like ws is often sufficient.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I authenticate WebSocket connections with JWT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The two common approaches are: (1) Query parameter — pass the JWT in the URL: new WebSocket("wss://example.com/ws?token=JWT"). The server reads req.url query parameters during the upgrade handshake. Downside: tokens appear in server logs. (2) First message authentication — the client sends the token as the very first message after connecting, and the server validates it before processing further messages. For Socket.io, use the auth option: socket = io("https://example.com", { auth: { token: "JWT" } }) and validate in a middleware with io.use().',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I scale WebSockets across multiple servers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WebSockets require persistent connections, which means a client connected to Server A cannot directly receive messages from Server B. The standard solution is: (1) Sticky sessions — configure your load balancer (Nginx, HAProxy, AWS ALB) to route the same client always to the same server based on IP or cookie. (2) Redis Pub/Sub adapter — when any server publishes a message, Redis broadcasts it to all servers, which then deliver it to their local clients. Socket.io has a first-class @socket.io/redis-adapter package for this. (3) Message queue (Kafka, RabbitMQ) for durability and replay.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the WebSocket close codes and what do they mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Close codes are sent in the WebSocket close frame: 1000 = Normal Closure (clean shutdown, both sides agree); 1001 = Going Away (browser tab closed, server restarting); 1002 = Protocol Error; 1003 = Unsupported Data (e.g., binary data when only text expected); 1006 = Abnormal Closure (no close frame received — network failure, server crash); 1008 = Policy Violation (authentication failed, rate limit hit); 1011 = Internal Server Error (server-side exception); 1012 = Service Restart; 1013 = Try Again Later. Code 1006 means you likely have a connection drop — implement reconnection logic with exponential backoff.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I implement WebSockets in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the websockets library with asyncio: import asyncio, websockets. For a server: async def handler(websocket): async for message in websocket: await websocket.send(f"Echo: {message}"). Start with: asyncio.run(websockets.serve(handler, "0.0.0.0", 8765)). For broadcasting to all connected clients, maintain a global set of connections and use asyncio.gather(*[ws.send(msg) for ws in connected]). For a production FastAPI integration, use the WebSocket class from starlette which supports dependency injection and authentication middleware.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I implement WebSocket reconnection with exponential backoff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Never reconnect immediately on close — this can overload the server. Use exponential backoff: start with 1 second, double each attempt, add jitter, cap at a maximum (e.g., 30 seconds). In JavaScript: let delay = 1000; function reconnect() { ws = new WebSocket(url); ws.onclose = () => { setTimeout(() => { delay = Math.min(delay * 2, 30000); reconnect(); }, delay + Math.random() * 1000); }; ws.onopen = () => { delay = 1000; }; }. Libraries like react-use-websocket handle this automatically. Always check if the page is still visible before reconnecting (document.visibilityState) to avoid unnecessary reconnections in background tabs.',
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

      <link rel="canonical" href="https://viadreams.cc/en/blog/websocket-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>WebSocket</strong> provides a persistent, bidirectional channel over a single TCP connection — unlike
          HTTP which is request-response. Use <code>ws://</code> or <code>wss://</code> (secure) with the native browser
          <code>WebSocket</code> API, the <strong>ws</strong> library for Node.js servers, or{' '}
          <strong>Socket.io</strong> when you need rooms, reconnection, and fallbacks. Authenticate via JWT in the first
          message or query param. Scale horizontally with sticky sessions + Redis Pub/Sub. Implement exponential backoff
          reconnection for robustness. Use our{' '}
          <Link href={`/${lang}/tools/websocket-tester`} style={{ color: '#0284c7' }}>online WebSocket tester</Link>{' '}
          to debug connections instantly.
        </p>
      </div>

      {/* Section 1: WebSocket vs HTTP */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        WebSocket vs HTTP — Persistent Bidirectional Connection Explained
      </h2>
      <p>
        <strong>HTTP</strong> was designed for the document web: a client asks, a server answers, and the conversation
        ends. Each request is independent and stateless. This model works well for fetching pages, loading assets, or
        calling REST APIs — but it breaks down when the server needs to push data to clients without being asked first.
      </p>
      <p>
        <strong>WebSocket</strong> solves this with a persistent connection. After an HTTP <em>upgrade handshake</em>,
        the TCP connection stays open and becomes a bidirectional channel. Both sides can send frames at any time with
        extremely low overhead (as little as 2 bytes of framing overhead per message vs hundreds of bytes of HTTP headers).
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Feature</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>HTTP/1.1</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>WebSocket</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Connection</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Short-lived (keep-alive is optional)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Persistent until closed</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Direction</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Client initiates (request-response)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Full-duplex (either side can send)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Overhead per message</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>~500–1000 bytes (headers)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>2–10 bytes (framing)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Server push</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Polling or SSE only</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Native, zero-latency</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Protocol</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>http://</code> / <code>https://</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>ws://</code> / <code>wss://</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Best use cases</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>CRUD APIs, file downloads, page loads</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Chat, live feeds, gaming, collaboration</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The upgrade handshake is critical to understand. The client sends a normal HTTP GET with special headers:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Client sends HTTP Upgrade request:
GET /ws HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

# Server responds with 101 Switching Protocols:
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

# From this point, the TCP connection carries WebSocket frames — not HTTP`}</code></pre>
      <p>
        Use <code>wss://</code> (WebSocket Secure) in production — it tunnels WebSocket over TLS exactly like HTTPS does
        for HTTP. Plain <code>ws://</code> should only be used in local development.
      </p>

      {/* Section 2: Browser WebSocket API */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Browser WebSocket API — onopen, onmessage, readyState, send()
      </h2>
      <p>
        Every modern browser ships with a native <code>WebSocket</code> API. No libraries required for the client side.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// 1. Open a connection
const ws = new WebSocket('wss://example.com/ws');

// 2. Connection established
ws.onopen = () => {
  console.log('Connected, readyState:', ws.readyState); // 1 = OPEN
  ws.send('Hello server!');
  // Send JSON
  ws.send(JSON.stringify({ type: 'subscribe', channel: 'prices' }));
};

// 3. Receive messages from server
ws.onmessage = (event) => {
  const data = event.data;          // string or Blob (binary)
  const msg = JSON.parse(data);     // parse JSON messages
  console.log('Received:', msg);
};

// 4. Connection closed
ws.onclose = (event) => {
  console.log('Closed:', event.code, event.reason);
  // code 1000 = normal, 1006 = abnormal (network failure)
};

// 5. Error
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
  // Note: always followed by onclose
};

// 6. readyState values
// ws.CONNECTING = 0   (upgrade in progress)
// ws.OPEN       = 1   (ready to send/receive)
// ws.CLOSING    = 2   (close handshake in progress)
// ws.CLOSED     = 3   (connection closed)

// 7. Close gracefully
ws.close(1000, 'User logged out');  // code + optional reason string

// 8. Binary data
ws.binaryType = 'arraybuffer';      // or 'blob' (default)
ws.onmessage = (event) => {
  const buffer = event.data;        // ArrayBuffer
  const view = new Uint8Array(buffer);
};`}</code></pre>
      <p>
        Always check <code>ws.readyState === WebSocket.OPEN</code> before calling <code>ws.send()</code> — sending on a
        closed or connecting socket throws an error. Buffer messages in a queue and flush them in <code>onopen</code> if
        needed.
      </p>

      {/* Section 3: Node.js ws library */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Node.js ws Library — WebSocketServer, Broadcast, Heartbeat
      </h2>
      <p>
        The <code>ws</code> npm package is the most popular, lightweight WebSocket server for Node.js. It is a thin
        wrapper over the native WebSocket protocol with no opinion on your architecture.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install ws
npm install --save-dev @types/ws   # TypeScript types`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

const server = http.createServer();
const wss = new WebSocketServer({ server });

// Broadcast helper — send to all connected clients
function broadcast(wss: WebSocketServer, data: string) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log('Client connected from', ip);

  ws.on('message', (rawData) => {
    const message = rawData.toString();
    console.log('Received:', message);

    // Echo to sender
    ws.send(JSON.stringify({ type: 'echo', data: message }));

    // Broadcast to all clients
    broadcast(wss, JSON.stringify({ type: 'broadcast', from: ip, data: message }));
  });

  ws.on('close', (code, reason) => {
    console.log('Client disconnected:', code, reason.toString());
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });

  // Send welcome message
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected!' }));
});

// Ping/pong heartbeat — detect dead connections
const HEARTBEAT_INTERVAL = 30_000; // 30 seconds

wss.on('connection', (ws) => {
  (ws as any).isAlive = true;
  ws.on('pong', () => { (ws as any).isAlive = true; });
});

setInterval(() => {
  wss.clients.forEach((ws) => {
    if ((ws as any).isAlive === false) {
      ws.terminate(); // Connection is dead
      return;
    }
    (ws as any).isAlive = false;
    ws.ping(); // Send ping frame — client auto-responds with pong
  });
}, HEARTBEAT_INTERVAL);

server.listen(8080, () => console.log('WS server on ws://localhost:8080'));`}</code></pre>
      <p>
        The ping/pong heartbeat pattern is essential. Without it, connections that drop silently (e.g., a mobile device
        going offline) will stay in <code>wss.clients</code> forever, leaking memory. The server pings every 30 seconds;
        if no pong is received, the connection is terminated.
      </p>

      {/* Section 4: Socket.io */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Socket.io — Rooms, Namespaces, Emit/On, Acknowledgments, Redis Adapter
      </h2>
      <p>
        Socket.io is a feature-rich real-time library that provides rooms, namespaces, automatic reconnection,
        broadcasting, and a Redis adapter for horizontal scaling.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install socket.io        # server
npm install socket.io-client # client`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// --- SERVER (Node.js) ---
import { Server } from 'socket.io';
import http from 'http';

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: { origin: 'https://yourapp.com', credentials: true },
});

io.on('connection', (socket) => {
  console.log('Connected:', socket.id);

  // Join a room
  socket.on('join-room', (roomId: string) => {
    socket.join(roomId);
    io.to(roomId).emit('user-joined', { userId: socket.id });
  });

  // Custom event
  socket.on('chat-message', (msg: string) => {
    // Broadcast to everyone in the room EXCEPT sender
    socket.to('room-1').emit('chat-message', { from: socket.id, msg });
  });

  // Acknowledgment (callback)
  socket.on('save-data', async (data, callback) => {
    try {
      await db.save(data);
      callback({ status: 'ok' });            // success ack
    } catch (err) {
      callback({ status: 'error', message: (err as Error).message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
  });
});

// Namespace — separate channel for admin
const adminNsp = io.of('/admin');
adminNsp.on('connection', (socket) => {
  socket.emit('admin-data', { stats: 'secret' });
});

httpServer.listen(3000);

// --- CLIENT ---
import { io } from 'socket.io-client';

const socket = io('https://yourapp.com', {
  auth: { token: 'jwt-here' },           // auth token
  reconnectionDelayMax: 10000,           // max 10s between retries
});

socket.emit('join-room', 'room-42');

socket.on('chat-message', (data) => {
  console.log(data.from, ':', data.msg);
});

// Acknowledgment
socket.emit('save-data', { key: 'value' }, (response) => {
  if (response.status === 'ok') console.log('Saved!');
});`}</code></pre>
      <p>
        For scaling across multiple processes, use the Redis adapter:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install @socket.io/redis-adapter ioredis

import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'ioredis';

const pubClient = createClient({ host: 'redis-host', port: 6379 });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);
io.adapter(createAdapter(pubClient, subClient));
// Now events are synchronized across all Socket.io server instances`}</code></pre>

      {/* Section 5: React useWebSocket hook */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        React useWebSocket Hook — Reconnect Logic, Message History, Lazy Connect
      </h2>
      <p>
        The <code>react-use-websocket</code> library provides a batteries-included hook for WebSocket connections in
        React applications, handling reconnection, message queuing, and state management automatically.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install react-use-websocket`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import useWebSocket, { ReadyState } from 'react-use-websocket';

interface ChatMessage {
  from: string;
  text: string;
}

export function ChatComponent() {
  const [input, setInput] = useState('');

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket('wss://example.com/ws', {
    // Automatic reconnection with backoff
    shouldReconnect: (closeEvent) => closeEvent.code !== 1000,
    reconnectAttempts: 10,
    reconnectInterval: (attemptNumber) =>
      Math.min(1000 * 2 ** attemptNumber, 30000), // exponential backoff

    // Keep last 50 messages in history
    queryParams: { token: 'jwt-token' },   // appended to URL

    // Callbacks
    onOpen: () => console.log('WebSocket connected'),
    onClose: (event) => console.log('Closed:', event.code),
    onError: (event) => console.error('Error:', event),
    onMessage: (event) => {
      const data = JSON.parse(event.data) as ChatMessage;
      setMessages((prev) => [...prev, data]);
    },
  });

  // Lazy connect — don't connect until a condition is met
  const { sendMessage: lazyWs } = useWebSocket(
    'wss://example.com/ws',
    { connect: isLoggedIn } // only connects when isLoggedIn = true
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <p>Status: {connectionStatus}</p>
      {lastMessage && <p>Last message: {lastMessage.data}</p>}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button
        onClick={() => {
          sendJsonMessage({ type: 'chat', text: input });
          setInput('');
        }}
        disabled={readyState !== ReadyState.OPEN}
      >
        Send
      </button>
    </div>
  );
}`}</code></pre>
      <p>
        For a manual reconnect hook without any library, implement the pattern yourself using <code>useRef</code> and{' '}
        <code>useEffect</code> with the exponential backoff algorithm shown in the FAQ section below.
      </p>

      {/* Section 6: Authentication */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        WebSocket Authentication — JWT in Query Param vs Cookie vs First Message
      </h2>
      <p>
        WebSocket connections do not support custom HTTP headers during the upgrade handshake (browsers restrict this).
        There are three practical authentication patterns:
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Pattern 1: JWT in Query Parameter
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Client
const token = localStorage.getItem('jwt');
const ws = new WebSocket(\`wss://example.com/ws?token=\${token}\`);

// Server (Node.js ws)
import jwt from 'jsonwebtoken';
import { parse } from 'url';

wss.on('connection', (ws, req) => {
  const { query } = parse(req.url || '', true);
  const token = query.token as string;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (ws as any).userId = (payload as any).sub;
    (ws as any).authenticated = true;
  } catch {
    ws.close(1008, 'Invalid token'); // 1008 = Policy Violation
    return;
  }
});`}</code></pre>
      <p>
        Downside: tokens in URLs appear in server access logs and browser history. Mitigate by using short-lived tokens
        (60-second expiry) generated specifically for WebSocket connections.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Pattern 2: First Message Authentication
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Client — send auth as first message
ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'auth', token: getJwt() }));
};

// Server — expect auth as first message
wss.on('connection', (ws) => {
  let authenticated = false;

  ws.on('message', (rawData) => {
    const msg = JSON.parse(rawData.toString());

    if (!authenticated) {
      if (msg.type !== 'auth') {
        ws.close(1008, 'Must authenticate first');
        return;
      }
      try {
        const payload = jwt.verify(msg.token, process.env.JWT_SECRET!);
        (ws as any).userId = (payload as any).sub;
        authenticated = true;
        ws.send(JSON.stringify({ type: 'auth-ok' }));
      } catch {
        ws.close(1008, 'Invalid token');
      }
      return;
    }

    // Authenticated — handle message normally
    handleMessage(ws, msg);
  });

  // Close unauthenticated connections after 5 seconds
  setTimeout(() => {
    if (!authenticated) ws.close(1008, 'Auth timeout');
  }, 5000);
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Pattern 3: Socket.io Middleware Auth
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Client
const socket = io('https://example.com', {
  auth: { token: getJwt() },
});

// Server middleware — runs before 'connection' event
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    socket.data.userId = (payload as any).sub;
    next(); // allow connection
  } catch (err) {
    next(new Error('Unauthorized')); // reject connection
  }
});

io.on('connection', (socket) => {
  console.log('Authenticated user:', socket.data.userId);
});`}</code></pre>

      {/* Section 7: Python websockets */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python websockets Library — asyncio Server, Client, Broadcast
      </h2>
      <p>
        The <code>websockets</code> library is the standard Python choice for WebSocket servers. It integrates natively
        with <code>asyncio</code> and is production-ready with TLS support.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`pip install websockets`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# --- SERVER ---
import asyncio
import websockets
from websockets.server import WebSocketServerProtocol

# Connected clients registry
connected: set[WebSocketServerProtocol] = set()

async def broadcast(message: str) -> None:
    if connected:
        await asyncio.gather(
            *[ws.send(message) for ws in connected],
            return_exceptions=True,  # don't stop on individual errors
        )

async def handler(websocket: WebSocketServerProtocol) -> None:
    connected.add(websocket)
    try:
        await websocket.send('{"type": "welcome"}')

        async for raw_message in websocket:
            data = json.loads(raw_message)
            print(f"Received: {data}")

            if data["type"] == "broadcast":
                await broadcast(raw_message)
            else:
                await websocket.send(json.dumps({"type": "echo", "data": data}))

    except websockets.exceptions.ConnectionClosedOK:
        pass   # normal closure
    except websockets.exceptions.ConnectionClosedError as e:
        print(f"Connection error: {e.code} {e.reason}")
    finally:
        connected.discard(websocket)

async def main() -> None:
    async with websockets.serve(handler, "0.0.0.0", 8765):
        print("WebSocket server started on ws://0.0.0.0:8765")
        await asyncio.Future()  # run forever

asyncio.run(main())`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# --- CLIENT ---
import asyncio
import websockets
import json

async def client():
    uri = "wss://example.com/ws"
    async with websockets.connect(uri) as websocket:
        # Send
        await websocket.send(json.dumps({"type": "hello", "data": "world"}))

        # Receive
        response = await websocket.recv()
        print("Response:", json.loads(response))

        # Listen loop
        async for message in websocket:
            print("Incoming:", message)

asyncio.run(client())`}</code></pre>
      <p>
        For FastAPI integration, use <code>fastapi.WebSocket</code> which supports dependency injection and middleware:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Echo {client_id}: {data}")
    except WebSocketDisconnect:
        print(f"Client {client_id} disconnected")`}</code></pre>

      {/* Section 8: Go gorilla/websocket */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Go gorilla/websocket — Upgrader, ReadMessage, WriteMessage, Concurrent Writes
      </h2>
      <p>
        <code>gorilla/websocket</code> is the most widely used WebSocket library for Go. It is mature, well-documented,
        and handles the low-level framing, masking, and close handshake for you.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`go get github.com/gorilla/websocket`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "log"
    "net/http"
    "sync"

    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool {
        // Validate Origin header to prevent CSWSH
        origin := r.Header.Get("Origin")
        return origin == "https://yourapp.com"
    },
}

// Client with mutex for concurrent writes
type Client struct {
    conn *websocket.Conn
    mu   sync.Mutex
}

func (c *Client) WriteJSON(v interface{}) error {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.conn.WriteJSON(v)
}

func handleWS(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Printf("Upgrade error: %v", err)
        return
    }
    defer conn.Close()

    client := &Client{conn: conn}

    // Set read deadline / pong handler for heartbeat
    conn.SetReadDeadline(time.Now().Add(60 * time.Second))
    conn.SetPongHandler(func(string) error {
        conn.SetReadDeadline(time.Now().Add(60 * time.Second))
        return nil
    })

    for {
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            if websocket.IsCloseError(err, websocket.CloseNormalClosure, websocket.CloseGoingAway) {
                log.Println("Client closed connection")
            } else {
                log.Printf("Read error: %v", err)
            }
            return
        }

        log.Printf("Received (%d): %s", messageType, p)

        // Echo back
        if err := client.WriteJSON(map[string]string{
            "type": "echo",
            "data": string(p),
        }); err != nil {
            log.Printf("Write error: %v", err)
            return
        }
    }
}

func main() {
    http.HandleFunc("/ws", handleWS)
    log.Fatal(http.ListenAndServe(":8080", nil))
}`}</code></pre>
      <p>
        The <code>sync.Mutex</code> on writes is critical: gorilla/websocket connections are <em>not</em> safe for
        concurrent writes. If you have a goroutine that pings AND a goroutine that writes messages, they will race. Use a
        mutex or a dedicated write channel (<code>chan []byte</code>) that a single writer goroutine drains.
      </p>

      {/* Section 9: Scaling & Load Balancing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Scaling WebSockets — Sticky Sessions, Redis Pub/Sub, Horizontal Scaling
      </h2>
      <p>
        Scaling WebSockets is harder than scaling stateless HTTP APIs because connections are persistent and bound to a
        specific server process. A message sent to Server A cannot reach clients connected to Server B without a
        coordination layer.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Sticky Sessions
      </h3>
      <p>
        Configure your load balancer to always route the same client to the same server. This is the simplest approach
        but limits true horizontal scaling.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Nginx upstream with ip_hash for sticky sessions
upstream websocket_backends {
    ip_hash;                          # route by client IP
    server ws1.example.com:8080;
    server ws2.example.com:8080;
    server ws3.example.com:8080;
}

server {
    listen 443 ssl;
    location /ws {
        proxy_pass http://websocket_backends;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 3600s;     # keep connection alive for 1 hour
        proxy_send_timeout 3600s;
    }
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Redis Pub/Sub for Cross-Server Messaging
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Without Redis: Server A cannot reach Server B's clients
// With Redis: any server publishes → Redis → all servers → their clients

import { createClient } from 'redis';

const publisher = createClient({ url: process.env.REDIS_URL });
const subscriber = publisher.duplicate();

await Promise.all([publisher.connect(), subscriber.connect()]);

// When a message comes in on this server, publish to Redis
ws.on('message', async (data) => {
  await publisher.publish('chat:room-1', data.toString());
});

// Subscribe: deliver Redis messages to local clients in this room
await subscriber.subscribe('chat:room-1', (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
});

// Connection limits per server (tune based on RAM/CPU)
// A 1GB RAM Node.js server can typically handle ~10,000 idle WS connections
// Use cluster mode or worker_threads to utilize multiple CPU cores`}</code></pre>

      {/* Section 10: Error Handling & Reconnection */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Error Handling and Reconnection — Exponential Backoff, Close Codes, Graceful Shutdown
      </h2>
      <p>
        Production WebSocket clients must handle disconnections gracefully. Networks are unreliable and servers restart.
        A naive immediate reconnect loop can overwhelm a restarting server (thundering herd problem).
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Exponential Backoff Reconnection
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`class ReconnectingWebSocket {
  private ws: WebSocket | null = null;
  private delay = 1000;        // start at 1s
  private maxDelay = 30000;    // cap at 30s
  private maxAttempts = 10;
  private attempts = 0;
  private shouldClose = false;

  constructor(private readonly url: string) {
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.delay = 1000;    // reset backoff on successful connect
      this.attempts = 0;
    };

    this.ws.onmessage = (event) => {
      this.onMessage?.(event);
    };

    this.ws.onclose = (event) => {
      if (this.shouldClose) return; // manual close — don't reconnect
      if (event.code === 1000) return; // normal close — don't reconnect

      this.attempts++;
      if (this.attempts > this.maxAttempts) {
        console.error('Max reconnect attempts reached');
        return;
      }

      // Exponential backoff with jitter
      const jitter = Math.random() * 1000;
      const nextDelay = Math.min(this.delay * 2, this.maxDelay) + jitter;
      this.delay = nextDelay;

      console.log(\`Reconnecting in \${Math.round(nextDelay)}ms (attempt \${this.attempts})\`);
      setTimeout(() => this.connect(), nextDelay);
    };
  }

  send(data: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      console.warn('WebSocket not ready, message dropped');
    }
  }

  close() {
    this.shouldClose = true;
    this.ws?.close(1000, 'Client closed');
  }

  onMessage?: (event: MessageEvent) => void;
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Close Codes Reference
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Code</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Name</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Reconnect?</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>1000</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Normal Closure</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Clean shutdown, both sides agreed</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>1001</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Going Away</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Browser tab closed or server restarting</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>1006</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Abnormal Closure</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No close frame — network failure or crash</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>1008</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Policy Violation</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Auth failed, rate limited, banned</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>1011</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Internal Error</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Unexpected server error</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>1012</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Service Restart</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Server intentionally restarting</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Graceful Server Shutdown
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Gracefully close all connections before process exit
process.on('SIGTERM', () => {
  console.log('SIGTERM received — closing WebSocket connections');

  wss.clients.forEach((ws) => {
    ws.close(1012, 'Server restarting'); // 1012 = Service Restart
  });

  wss.close(() => {
    console.log('All WS connections closed');
    server.close(() => process.exit(0));
  });

  // Force exit after 10 seconds if clients don't close cleanly
  setTimeout(() => process.exit(1), 10_000);
});`}</code></pre>

      {/* Quick Tool CTA */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', margin: '2rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>Test Your WebSocket Server</p>
        <p style={{ margin: 0 }}>
          Use our{' '}
          <a
            href="https://viadreams.cc/en/tools/websocket-tester"
            style={{ color: '#0284c7', textDecoration: 'underline' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            online WebSocket tester
          </a>{' '}
          to connect to any <code>ws://</code> or <code>wss://</code> endpoint, send custom messages, and inspect frames
          in real time — no installation required.
        </p>
      </div>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Does WebSocket work through firewalls and proxies?
      </h3>
      <p>
        Most firewalls allow WebSocket because the upgrade handshake looks like a regular HTTP request on port 80 or 443.
        However, some corporate HTTP proxies that do not understand WebSocket may strip the <code>Upgrade</code> header,
        breaking the connection. Always use <code>wss://</code> on port 443 — TLS-encrypted traffic is harder for
        proxies to inspect and less likely to be blocked. Socket.io&apos;s HTTP long-polling fallback handles this case
        automatically.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Should I use WebSocket or Server-Sent Events (SSE)?
      </h3>
      <p>
        Use SSE when you only need server-to-client push (notifications, live feeds, log streaming) — it is simpler,
        works over regular HTTP/2, and auto-reconnects natively. Use WebSocket when you need true bidirectional
        communication (chat, gaming, collaborative editing where the client also sends frequent messages). SSE has a
        simpler implementation and better compatibility with HTTP infrastructure (CDNs, proxies), but WebSocket offers
        lower latency and binary frame support.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the maximum number of WebSocket connections a server can handle?
      </h3>
      <p>
        Each WebSocket connection is a file descriptor. Linux defaults to 1024 file descriptors per process — raise this
        with <code>ulimit -n 65535</code> or in <code>/etc/security/limits.conf</code>. Memory is the real limit: an
        idle Node.js WebSocket connection uses roughly 40–60 KB of RAM. A 1 GB RAM server can handle approximately
        15,000–25,000 idle connections. Active connections with large message queues use significantly more. Use
        connection pooling and evict idle connections with heartbeat timeouts.
      </p>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Use wss:// in production</strong>: Always use WebSocket Secure (TLS) — plain ws:// exposes data and breaks on many proxies.</li>
          <li><strong>Implement heartbeats</strong>: Ping/pong every 30 seconds detects silent connection drops and frees dead socket handles.</li>
          <li><strong>Exponential backoff on reconnect</strong>: Never reconnect immediately — use doubling delays with jitter to avoid thundering herd.</li>
          <li><strong>Socket.io for features, ws for performance</strong>: Socket.io adds rooms/namespaces/acks; raw ws is leaner for high-connection scenarios.</li>
          <li><strong>Authenticate on connection or first message</strong>: Validate JWT before allowing any application-level messages.</li>
          <li><strong>Mutex for Go writes</strong>: gorilla/websocket is not concurrent-write-safe — always lock before writing.</li>
          <li><strong>Sticky sessions + Redis Pub/Sub</strong> is the standard horizontal scaling pattern for WebSocket clusters.</li>
          <li><strong>Close code 1006 means network failure</strong>: Always reconnect on 1006; only skip reconnect on 1000 (normal) and 1008 (policy violation).</li>
          <li><strong>Raise OS file descriptor limits</strong>: <code>ulimit -n 65535</code> is required for high-connection servers.</li>
          <li><strong>Graceful shutdown</strong>: Send close code 1012 and wait for client acknowledgment before killing the process.</li>
        </ul>
      </div>
    </article>
  );
}
