'use client';

import Link from 'next/link';

export default function WebSocketTutorial({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Are WebSockets?</h2>
      <p>
        <strong>WebSockets</strong> provide a persistent, full-duplex communication channel between a client (browser) and a server over a single TCP connection. Unlike HTTP, where the client must initiate every request, WebSockets allow both the server and client to send data at any time. This makes WebSockets ideal for real-time applications like chat, live dashboards, collaborative editing, multiplayer games, and stock tickers.
      </p>
      <p>
        This tutorial covers the WebSocket protocol, client-side and server-side implementation in JavaScript, error handling, reconnection strategies, and production best practices.
      </p>

      <h2>WebSocket vs HTTP: Key Differences</h2>
      <table>
        <thead>
          <tr><th>Feature</th><th>HTTP</th><th>WebSocket</th></tr>
        </thead>
        <tbody>
          <tr><td>Connection</td><td>New connection per request</td><td>Persistent connection</td></tr>
          <tr><td>Direction</td><td>Client-to-server (request/response)</td><td>Bidirectional (full-duplex)</td></tr>
          <tr><td>Overhead</td><td>Headers sent with every request</td><td>Minimal framing after handshake</td></tr>
          <tr><td>Latency</td><td>Higher (connection setup each time)</td><td>Lower (connection stays open)</td></tr>
          <tr><td>Protocol</td><td>http:// or https://</td><td>ws:// or wss://</td></tr>
          <tr><td>Use Case</td><td>REST APIs, page loads</td><td>Real-time data, live updates</td></tr>
          <tr><td>Server Push</td><td>Not native (use SSE or polling)</td><td>Native server push</td></tr>
        </tbody>
      </table>

      <h2>How WebSocket Handshake Works</h2>
      <p>
        A WebSocket connection starts as an HTTP request that gets upgraded to the WebSocket protocol. The client sends an upgrade request, and the server responds with a 101 Switching Protocols status.
      </p>
      <pre><code className="language-text">{`# Client Request (HTTP Upgrade)
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

# Server Response
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

# After this handshake, the connection is upgraded
# and both sides can send WebSocket frames`}</code></pre>

      <h2>Client-Side WebSocket API</h2>
      <p>
        The browser provides a native <code>WebSocket</code> API that is straightforward to use. Here is a complete client implementation with all event handlers.
      </p>
      <pre><code className="language-javascript">{`// Basic WebSocket connection
const ws = new WebSocket('wss://echo.websocket.org');

// Connection opened
ws.addEventListener('open', (event) => {
  console.log('Connected to WebSocket server');
  ws.send('Hello Server!');
});

// Listen for messages
ws.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);

  // Handle different data types
  if (event.data instanceof Blob) {
    // Binary data
    const reader = new FileReader();
    reader.onload = () => console.log('Binary:', reader.result);
    reader.readAsArrayBuffer(event.data);
  } else {
    // Text data (usually JSON)
    try {
      const data = JSON.parse(event.data);
      console.log('Parsed:', data);
    } catch {
      console.log('Text:', event.data);
    }
  }
});

// Connection closed
ws.addEventListener('close', (event) => {
  console.log('Disconnected:', event.code, event.reason);
  console.log('Clean close:', event.wasClean);
});

// Error occurred
ws.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});

// Send different data types
ws.send('Plain text message');
ws.send(JSON.stringify({ type: 'chat', text: 'Hello!' }));
ws.send(new Blob(['binary data']));
ws.send(new ArrayBuffer(8));

// Check connection state
console.log(ws.readyState);
// 0 = CONNECTING
// 1 = OPEN
// 2 = CLOSING
// 3 = CLOSED

// Close connection gracefully
ws.close(1000, 'Normal closure');`}</code></pre>

      <h2>Server-Side Implementation with Node.js</h2>
      <p>
        The most popular Node.js WebSocket library is <code>ws</code>. Here is a complete server implementation.
      </p>
      <pre><code className="language-typescript">{`// server.ts - WebSocket server with Node.js
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running');
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Track connected clients
const clients = new Map<string, WebSocket>();

wss.on('connection', (ws, req) => {
  const clientId = generateId();
  clients.set(clientId, ws);
  console.log(\`Client \${clientId} connected from \${req.socket.remoteAddress}\`);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'welcome',
    clientId,
    message: 'Connected to WebSocket server',
  }));

  // Handle incoming messages
  ws.on('message', (data, isBinary) => {
    try {
      const message = JSON.parse(data.toString());
      console.log(\`Received from \${clientId}:\`, message);

      switch (message.type) {
        case 'chat':
          // Broadcast to all other clients
          broadcast({
            type: 'chat',
            from: clientId,
            text: message.text,
            timestamp: Date.now(),
          }, ws);
          break;

        case 'ping':
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
          break;

        default:
          ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
      }
    } catch (err) {
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }));
    }
  });

  // Handle client disconnect
  ws.on('close', (code, reason) => {
    clients.delete(clientId);
    console.log(\`Client \${clientId} disconnected: \${code} \${reason}\`);
    broadcast({
      type: 'system',
      message: \`User \${clientId} left the chat\`,
    });
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error(\`Client \${clientId} error:\`, error);
    clients.delete(clientId);
  });

  // Heartbeat: detect dead connections
  (ws as any).isAlive = true;
  ws.on('pong', () => { (ws as any).isAlive = true; });
});

// Broadcast message to all clients except sender
function broadcast(data: object, exclude?: WebSocket) {
  const message = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Heartbeat interval to detect dead connections
const heartbeat = setInterval(() => {
  wss.clients.forEach(ws => {
    if ((ws as any).isAlive === false) {
      return ws.terminate();
    }
    (ws as any).isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => clearInterval(heartbeat));

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}`}</code></pre>

      <h2>Robust Client with Auto-Reconnection</h2>
      <pre><code className="language-typescript">{`// WebSocket client with reconnection and message queue
class ReconnectingWebSocket {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000;
  private maxDelay = 30000;
  private messageQueue: string[] = [];
  private listeners = new Map<string, Set<Function>>();

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.reconnectDelay = 1000;

      // Flush queued messages
      while (this.messageQueue.length > 0) {
        const msg = this.messageQueue.shift()!;
        this.ws!.send(msg);
      }

      this.emit('connected', {});
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit(data.type, data);
        this.emit('message', data);
      } catch {
        this.emit('message', { raw: event.data });
      }
    };

    this.ws.onclose = (event) => {
      console.log(\`WebSocket closed: \${event.code}\`);
      this.emit('disconnected', { code: event.code, reason: event.reason });

      if (event.code !== 1000) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = () => {
      this.emit('error', {});
    };
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      this.emit('maxRetriesReached', {});
      return;
    }

    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.reconnectAttempts),
      this.maxDelay
    );

    console.log(\`Reconnecting in \${delay}ms (attempt \${this.reconnectAttempts + 1})\`);

    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  send(type: string, payload: any = {}) {
    const message = JSON.stringify({ type, ...payload });

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      // Queue message for when connection is restored
      this.messageQueue.push(message);
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: Function) {
    this.listeners.get(event)?.delete(callback);
  }

  private emit(event: string, data: any) {
    this.listeners.get(event)?.forEach(cb => cb(data));
  }

  close() {
    this.maxReconnectAttempts = 0; // Prevent reconnection
    this.ws?.close(1000, 'Client closing');
  }

  get state(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }
}

// Usage
const ws = new ReconnectingWebSocket('wss://api.example.com/ws');

ws.on('connected', () => console.log('Online'));
ws.on('disconnected', () => console.log('Offline'));
ws.on('chat', (data: any) => console.log('Chat:', data.text));

ws.send('chat', { text: 'Hello, World!' });`}</code></pre>

      <h2>React Hook for WebSocket</h2>
      <pre><code className="language-typescript">{`// useWebSocket.ts - Custom React Hook
import { useEffect, useRef, useState, useCallback } from 'react';

type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseWebSocketOptions {
  onMessage?: (data: any) => void;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  reconnect?: boolean;
  reconnectInterval?: number;
  maxRetries?: number;
}

export function useWebSocket(url: string, options: UseWebSocketOptions = {}) {
  const {
    onMessage,
    onOpen,
    onClose,
    onError,
    reconnect = true,
    reconnectInterval = 3000,
    maxRetries = 5,
  } = options;

  const [status, setStatus] = useState<WebSocketStatus>('connecting');
  const [lastMessage, setLastMessage] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const retriesRef = useRef(0);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => {
      setStatus('connected');
      retriesRef.current = 0;
      onOpen?.();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
        onMessage?.(data);
      } catch {
        setLastMessage(event.data);
        onMessage?.(event.data);
      }
    };

    ws.onclose = (event) => {
      setStatus('disconnected');
      onClose?.(event);

      if (reconnect && event.code !== 1000 && retriesRef.current < maxRetries) {
        retriesRef.current++;
        setTimeout(connect, reconnectInterval);
      }
    };

    ws.onerror = (event) => {
      setStatus('error');
      onError?.(event);
    };
  }, [url, onMessage, onOpen, onClose, onError, reconnect, reconnectInterval, maxRetries]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close(1000);
    };
  }, [connect]);

  const send = useCallback((data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        typeof data === 'string' ? data : JSON.stringify(data)
      );
    }
  }, []);

  return { status, lastMessage, send };
}

// Usage in a React component
function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<any[]>([]);

  const { status, send } = useWebSocket(
    \`wss://api.example.com/chat/\${roomId}\`,
    {
      onMessage: (data) => {
        if (data.type === 'chat') {
          setMessages(prev => [...prev, data]);
        }
      },
    }
  );

  const handleSend = (text: string) => {
    send({ type: 'chat', text });
  };

  return (
    <div>
      <div>Status: {status}</div>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg.text}</p>
        ))}
      </div>
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
        placeholder="Type a message..."
        disabled={status !== 'connected'}
      />
    </div>
  );
}`}</code></pre>

      <h2>WebSocket with Socket.IO</h2>
      <pre><code className="language-typescript">{`// Socket.IO provides additional features on top of WebSockets:
// - Automatic reconnection
// - Room/namespace support
// - Fallback to HTTP long polling
// - Built-in acknowledgments

// Server (socket.io)
import { Server } from 'socket.io';

const io = new Server(3001, {
  cors: { origin: 'http://localhost:3000' },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a room
  socket.on('join-room', (room: string) => {
    socket.join(room);
    io.to(room).emit('system', \`\${socket.id} joined \${room}\`);
  });

  // Handle chat message
  socket.on('chat', (data, callback) => {
    io.to(data.room).emit('chat', {
      from: socket.id,
      text: data.text,
      timestamp: Date.now(),
    });
    // Acknowledge receipt
    callback({ status: 'delivered' });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Client (socket.io-client)
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  socket.emit('join-room', 'general');
});

socket.on('chat', (data) => {
  console.log(\`\${data.from}: \${data.text}\`);
});

// Send with acknowledgment
socket.emit('chat', { room: 'general', text: 'Hello!' }, (response: any) => {
  console.log('Message status:', response.status);
});`}</code></pre>

      <h2>WebSocket Security Best Practices</h2>
      <ul>
        <li><strong>Always use WSS (WebSocket Secure)</strong>: Use <code>wss://</code> in production, never <code>ws://</code></li>
        <li><strong>Authenticate on connection</strong>: Validate JWT tokens or session cookies during the handshake</li>
        <li><strong>Rate limit messages</strong>: Prevent clients from flooding the server with messages</li>
        <li><strong>Validate all messages</strong>: Never trust client-sent data -- validate types, lengths, and content</li>
        <li><strong>Set message size limits</strong>: Configure maximum payload size to prevent memory attacks</li>
        <li><strong>Implement heartbeats</strong>: Use ping/pong frames to detect dead connections</li>
        <li><strong>Handle CORS properly</strong>: Restrict allowed origins in production</li>
        <li><strong>Use rooms for authorization</strong>: Only allow users to join rooms they have access to</li>
      </ul>

      <h3>Authentication Example</h3>
      <pre><code className="language-typescript">{`// Server-side authentication during WebSocket handshake
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

const wss = new WebSocketServer({
  server,
  verifyClient: (info, callback) => {
    const token = new URL(info.req.url!, 'http://localhost')
      .searchParams.get('token');

    if (!token) {
      callback(false, 401, 'Unauthorized');
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (info.req as any).user = decoded;
      callback(true);
    } catch {
      callback(false, 403, 'Invalid token');
    }
  },
});

// Client-side: pass token in URL
const token = localStorage.getItem('authToken');
const ws = new WebSocket(\`wss://api.example.com/ws?token=\${token}\`);`}</code></pre>

      <h2>WebSocket vs Server-Sent Events vs Long Polling</h2>
      <table>
        <thead>
          <tr><th>Feature</th><th>WebSocket</th><th>SSE</th><th>Long Polling</th></tr>
        </thead>
        <tbody>
          <tr><td>Direction</td><td>Bidirectional</td><td>Server to client</td><td>Simulated bidirectional</td></tr>
          <tr><td>Protocol</td><td>ws:// / wss://</td><td>HTTP</td><td>HTTP</td></tr>
          <tr><td>Connection</td><td>Persistent</td><td>Persistent</td><td>Repeated requests</td></tr>
          <tr><td>Browser Support</td><td>All modern</td><td>All modern</td><td>All browsers</td></tr>
          <tr><td>Binary Data</td><td>Yes</td><td>No (text only)</td><td>Yes</td></tr>
          <tr><td>Auto Reconnect</td><td>Manual</td><td>Built-in</td><td>Manual</td></tr>
          <tr><td>Proxy Friendly</td><td>Sometimes issues</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Best For</td><td>Chat, gaming</td><td>Notifications, feeds</td><td>Legacy compatibility</td></tr>
        </tbody>
      </table>

      <h2>Production Deployment Tips</h2>
      <ul>
        <li><strong>Use a load balancer with sticky sessions</strong>: WebSocket connections must stay with the same server</li>
        <li><strong>Implement horizontal scaling</strong>: Use Redis pub/sub or similar to broadcast across multiple server instances</li>
        <li><strong>Monitor connection counts</strong>: Track active connections and set alerts for unusual spikes</li>
        <li><strong>Set connection limits per IP</strong>: Prevent a single client from opening too many connections</li>
        <li><strong>Configure Nginx for WebSocket</strong>: Add proper upgrade headers in your reverse proxy configuration</li>
        <li><strong>Graceful shutdown</strong>: Close all connections with proper close codes before server restart</li>
      </ul>

      <h3>Nginx WebSocket Proxy Configuration</h3>
      <pre><code className="language-nginx">{`# Nginx configuration for WebSocket proxy
upstream websocket_backend {
    server 127.0.0.1:8080;
}

server {
    listen 443 ssl;
    server_name api.example.com;

    location /ws {
        proxy_pass http://websocket_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # Timeout settings
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}`}</code></pre>

      <h2>Conclusion</h2>
      <p>
        WebSockets are essential for any application requiring real-time, bidirectional communication. Start with the native browser WebSocket API for simple use cases, and consider Socket.IO or a custom reconnecting wrapper for production applications. Always implement proper error handling, reconnection logic, authentication, and message validation.
      </p>
      <p>
        For simpler server-to-client streaming, consider Server-Sent Events (SSE) instead. For infrequent updates, regular HTTP polling may be sufficient. Choose the technology that matches your real-time requirements.
      </p>
      <p>
        Test your WebSocket payloads with our <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> and debug JWT tokens in your authentication flow with the <Link href={`/${lang}/tools/jwt-decoder`}>JWT Decoder</Link>.
      </p>
    </>
  );
}
