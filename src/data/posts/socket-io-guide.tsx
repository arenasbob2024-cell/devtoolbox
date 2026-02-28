'use client';
import React from 'react';

const translations: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Socket.IO Complete Guide: Real-Time Bidirectional Communication',
    description: 'Master Socket.IO for real-time apps. Covers installation, events, rooms, namespaces, authentication, scaling with Redis, React hooks integration, testing, and performance optimization.',
  },
  zh: {
    title: 'Socket.IO 完全指南：实时双向通信',
    description: '掌握 Socket.IO 构建实时应用。涵盖安装、事件、房间、命名空间、身份验证、Redis 扩展、React Hooks 集成、测试和性能优化。',
  },
};

const codeStyle: React.CSSProperties = {
  background: '#1e1e1e',
  color: '#d4d4d4',
  borderRadius: 8,
  padding: 16,
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.7,
  fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
  margin: '16px 0',
  border: '1px solid #333',
};

const h2Style: React.CSSProperties = { fontSize: 24, fontWeight: 700, marginTop: 48, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16, fontSize: 15 };
const liStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 8 };
const strongStyle: React.CSSProperties = { color: 'var(--text-primary)', fontWeight: 600 };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', margin: '16px 0', fontSize: 14 };
const thStyle: React.CSSProperties = { background: '#f1f5f9', padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #e2e8f0' };
const tdStyle: React.CSSProperties = { padding: '10px 14px', borderBottom: '1px solid #e2e8f0' };

export default function SocketIoGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqData = [
    {
      q: 'What is Socket.IO and how is it different from WebSocket?',
      a: 'Socket.IO is a library that enables real-time, bidirectional communication between clients and servers. Unlike raw WebSocket, Socket.IO provides automatic reconnection, room-based broadcasting, binary streaming, multiplexing via namespaces, and fallback to HTTP long-polling when WebSocket is unavailable.',
    },
    {
      q: 'Does Socket.IO use WebSocket under the hood?',
      a: 'Yes. Socket.IO uses WebSocket as the primary transport whenever possible. It starts with HTTP long-polling for reliability, then upgrades to WebSocket. You can also configure it to start directly with WebSocket if you know your infrastructure supports it.',
    },
    {
      q: 'How do I scale Socket.IO across multiple servers?',
      a: 'Use the @socket.io/redis-adapter package. It leverages Redis Pub/Sub to broadcast events across all Socket.IO server instances, ensuring messages reach clients connected to any node. You can also use the @socket.io/redis-streams-adapter for ordered delivery.',
    },
    {
      q: 'Can I use Socket.IO with Next.js?',
      a: 'Yes. You can attach a Socket.IO server to the Next.js HTTP server in a custom server file (server.js). For the client side, use the socket.io-client package in your React components. Note that Socket.IO servers cannot run in serverless functions since they require persistent connections.',
    },
    {
      q: 'How do I authenticate Socket.IO connections?',
      a: 'Use Socket.IO middleware to verify JWT tokens or session cookies during the handshake. The client sends the token via the auth option, and the server validates it in an io.use() middleware before allowing the connection to complete.',
    },
    {
      q: 'What is the maximum number of concurrent connections Socket.IO can handle?',
      a: 'A single Socket.IO server can handle roughly 10,000 to 50,000 concurrent connections depending on the hardware and message throughput. With Redis adapter and horizontal scaling, you can handle hundreds of thousands or millions of connections.',
    },
    {
      q: 'How do rooms work in Socket.IO?',
      a: 'Rooms are server-side constructs that allow you to group sockets. A socket can join multiple rooms via socket.join(roomName), and you can broadcast to all sockets in a room via io.to(roomName).emit(). Rooms are automatically cleaned up when sockets disconnect.',
    },
    {
      q: 'How do I handle connection drops and reconnection?',
      a: 'Socket.IO has built-in automatic reconnection with exponential backoff. The client will attempt to reconnect when a connection drops. You can configure reconnection attempts, delay, and backoff via the reconnection, reconnectionAttempts, and reconnectionDelay options.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px 20px', borderRadius: 8, marginBottom: 24 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#334155', lineHeight: 1.7, fontSize: 14 }}>
          Socket.IO is a battle-tested library for real-time bidirectional communication. It wraps WebSocket with automatic reconnection, rooms, namespaces, and HTTP fallback. Install the server with <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: 4 }}>npm install socket.io</code> and the client with <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: 4 }}>npm install socket.io-client</code>. Use <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: 4 }}>emit/on</code> for events, <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: 4 }}>join/to</code> for rooms, JWT middleware for auth, and the Redis adapter for horizontal scaling.
        </p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px 20px', borderRadius: 8, marginBottom: 32 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 16, marginBottom: 12, color: 'var(--text-primary)' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li style={liStyle}>Socket.IO provides WebSocket with automatic fallback, reconnection, and multiplexing</li>
          <li style={liStyle}>Use <strong style={strongStyle}>emit/on</strong> for sending and receiving events between client and server</li>
          <li style={liStyle}><strong style={strongStyle}>Rooms</strong> group sockets for targeted broadcasting; <strong style={strongStyle}>namespaces</strong> separate concerns</li>
          <li style={liStyle}>Authenticate connections using JWT middleware in the handshake phase</li>
          <li style={liStyle}>Scale horizontally with the <strong style={strongStyle}>Redis adapter</strong> for multi-server deployments</li>
          <li style={liStyle}>Use acknowledgements for request-response patterns over sockets</li>
          <li style={liStyle}>Socket.IO works with Express, Next.js, and integrates cleanly with React hooks</li>
          <li style={liStyle}>Enable binary parser and compression for high-throughput production scenarios</li>
        </ul>
      </div>

      {/* Section 1: What is Socket.IO */}
      <h2 style={h2Style}>What is Socket.IO?</h2>
      <p style={pStyle}>
        Socket.IO is a JavaScript library that enables <strong style={strongStyle}>real-time, bidirectional, event-based communication</strong> between web clients and servers. Originally created in 2010, it has become the most widely adopted solution for adding real-time features to Node.js applications, powering chat apps, live dashboards, collaborative editors, multiplayer games, and IoT systems.
      </p>
      <p style={pStyle}>
        Unlike raw WebSocket, Socket.IO is a higher-level abstraction that adds critical production features: automatic reconnection with exponential backoff, packet buffering during disconnections, broadcasting to rooms of clients, multiplexing via namespaces, and transparent fallback to HTTP long-polling when WebSocket is blocked by proxies or firewalls.
      </p>

      <h3 style={h3Style}>Socket.IO vs WebSocket Comparison</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Feature</th>
            <th style={thStyle}>Raw WebSocket</th>
            <th style={thStyle}>Socket.IO</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Auto-reconnection</td><td style={tdStyle}>Manual implementation</td><td style={tdStyle}>Built-in with backoff</td></tr>
          <tr><td style={tdStyle}>Fallback transport</td><td style={tdStyle}>None</td><td style={tdStyle}>HTTP long-polling</td></tr>
          <tr><td style={tdStyle}>Rooms / Groups</td><td style={tdStyle}>Manual implementation</td><td style={tdStyle}>Built-in</td></tr>
          <tr><td style={tdStyle}>Namespaces</td><td style={tdStyle}>Not available</td><td style={tdStyle}>Built-in multiplexing</td></tr>
          <tr><td style={tdStyle}>Binary support</td><td style={tdStyle}>Manual parsing</td><td style={tdStyle}>Automatic detection</td></tr>
          <tr><td style={tdStyle}>Acknowledgements</td><td style={tdStyle}>Manual implementation</td><td style={tdStyle}>Built-in callbacks</td></tr>
          <tr><td style={tdStyle}>Broadcasting</td><td style={tdStyle}>Iterate connections</td><td style={tdStyle}>One-liner API</td></tr>
          <tr><td style={tdStyle}>Protocol overhead</td><td style={tdStyle}>Minimal</td><td style={tdStyle}>Slightly higher</td></tr>
        </tbody>
      </table>

      {/* Section 2: Installation */}
      <h2 style={h2Style}>Installation</h2>
      <h3 style={h3Style}>Server Installation</h3>
      <pre style={codeStyle}><code>{'# Install the Socket.IO server\n' +
        'npm install socket.io\n\n' +
        '# Or with yarn\n' +
        'yarn add socket.io\n\n' +
        '# Or with pnpm\n' +
        'pnpm add socket.io'}</code></pre>

      <h3 style={h3Style}>Client Installation</h3>
      <pre style={codeStyle}><code>{'# Install the Socket.IO client\n' +
        'npm install socket.io-client\n\n' +
        '# Or load from CDN\n' +
        '# <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>'}</code></pre>

      <h3 style={h3Style}>Minimal Server Setup</h3>
      <pre style={codeStyle}><code>{'// server.js\n' +
        'const { createServer } = require("http");\n' +
        'const { Server } = require("socket.io");\n\n' +
        'const httpServer = createServer();\n' +
        'const io = new Server(httpServer, {\n' +
        '  cors: {\n' +
        '    origin: "http://localhost:3000",\n' +
        '    methods: ["GET", "POST"]\n' +
        '  }\n' +
        '});\n\n' +
        'io.on("connection", (socket) => {\n' +
        '  console.log("Client connected:", socket.id);\n\n' +
        '  socket.on("disconnect", (reason) => {\n' +
        '    console.log("Client disconnected:", reason);\n' +
        '  });\n' +
        '});\n\n' +
        'httpServer.listen(3001, () => {\n' +
        '  console.log("Socket.IO server running on port 3001");\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>Minimal Client Setup</h3>
      <pre style={codeStyle}><code>{'// client.js\n' +
        'import { io } from "socket.io-client";\n\n' +
        'const socket = io("http://localhost:3001");\n\n' +
        'socket.on("connect", () => {\n' +
        '  console.log("Connected with ID:", socket.id);\n' +
        '});\n\n' +
        'socket.on("disconnect", (reason) => {\n' +
        '  console.log("Disconnected:", reason);\n' +
        '});'}</code></pre>

      {/* Section 3: Basic Events */}
      <h2 style={h2Style}>Basic Events: emit and on</h2>
      <p style={pStyle}>
        Socket.IO uses an event-driven architecture. The server and client communicate by emitting and listening for named events. You can send any serializable data — objects, arrays, strings, buffers — as the event payload.
      </p>
      <pre style={codeStyle}><code>{'// Server: listen for events and emit responses\n' +
        'io.on("connection", (socket) => {\n' +
        '  // Listen for a custom event\n' +
        '  socket.on("chat:message", (data) => {\n' +
        '    console.log("Message from", socket.id, ":", data);\n' +
        '    // Broadcast to all OTHER clients\n' +
        '    socket.broadcast.emit("chat:message", {\n' +
        '      userId: socket.id,\n' +
        '      text: data.text,\n' +
        '      timestamp: Date.now()\n' +
        '    });\n' +
        '  });\n\n' +
        '  // Emit to THIS client only\n' +
        '  socket.emit("welcome", { message: "Hello from server!" });\n' +
        '});\n\n' +
        '// Client: emit events and listen for responses\n' +
        'socket.emit("chat:message", { text: "Hello everyone!" });\n\n' +
        'socket.on("chat:message", (data) => {\n' +
        '  console.log("New message:", data.text);\n' +
        '});\n\n' +
        'socket.on("welcome", (data) => {\n' +
        '  console.log(data.message);\n' +
        '});'}</code></pre>

      {/* Section 4: Rooms & Namespaces */}
      <h2 style={h2Style}>Rooms and Namespaces</h2>
      <h3 style={h3Style}>Rooms</h3>
      <p style={pStyle}>
        Rooms are server-side groupings of sockets. They let you broadcast messages to a subset of connected clients. Common use cases include chat rooms, game lobbies, and per-user notification channels.
      </p>
      <pre style={codeStyle}><code>{'io.on("connection", (socket) => {\n' +
        '  // Join a room\n' +
        '  socket.on("room:join", (roomName) => {\n' +
        '    socket.join(roomName);\n' +
        '    console.log(socket.id, "joined room:", roomName);\n\n' +
        '    // Notify others in the room\n' +
        '    socket.to(roomName).emit("room:user-joined", {\n' +
        '      userId: socket.id\n' +
        '    });\n' +
        '  });\n\n' +
        '  // Leave a room\n' +
        '  socket.on("room:leave", (roomName) => {\n' +
        '    socket.leave(roomName);\n' +
        '    socket.to(roomName).emit("room:user-left", {\n' +
        '      userId: socket.id\n' +
        '    });\n' +
        '  });\n\n' +
        '  // Send message to a specific room\n' +
        '  socket.on("room:message", ({ roomName, text }) => {\n' +
        '    io.to(roomName).emit("room:message", {\n' +
        '      userId: socket.id,\n' +
        '      text,\n' +
        '      timestamp: Date.now()\n' +
        '    });\n' +
        '  });\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>Namespaces</h3>
      <p style={pStyle}>
        Namespaces allow you to split the logic of your application over a single shared connection (multiplexing). Each namespace has its own event handlers, rooms, and middleware.
      </p>
      <pre style={codeStyle}><code>{'// Server: define namespaces\n' +
        'const chatNsp = io.of("/chat");\n' +
        'const adminNsp = io.of("/admin");\n\n' +
        'chatNsp.on("connection", (socket) => {\n' +
        '  console.log("User connected to /chat");\n' +
        '  socket.on("message", (data) => {\n' +
        '    chatNsp.emit("message", data);\n' +
        '  });\n' +
        '});\n\n' +
        'adminNsp.use((socket, next) => {\n' +
        '  // Admin-only middleware\n' +
        '  if (socket.handshake.auth.role === "admin") {\n' +
        '    next();\n' +
        '  } else {\n' +
        '    next(new Error("Unauthorized"));\n' +
        '  }\n' +
        '});\n\n' +
        'adminNsp.on("connection", (socket) => {\n' +
        '  console.log("Admin connected to /admin");\n' +
        '});\n\n' +
        '// Client: connect to a namespace\n' +
        'const chatSocket = io("http://localhost:3001/chat");\n' +
        'const adminSocket = io("http://localhost:3001/admin", {\n' +
        '  auth: { role: "admin", token: "jwt_token_here" }\n' +
        '});'}</code></pre>

      {/* Section 5: Broadcasting */}
      <h2 style={h2Style}>Broadcasting Patterns</h2>
      <p style={pStyle}>
        Socket.IO provides several broadcasting patterns to target different sets of clients:
      </p>
      <pre style={codeStyle}><code>{'io.on("connection", (socket) => {\n' +
        '  // 1. Emit to the sender only\n' +
        '  socket.emit("private", { msg: "only you" });\n\n' +
        '  // 2. Broadcast to everyone EXCEPT the sender\n' +
        '  socket.broadcast.emit("announcement", { msg: "new user" });\n\n' +
        '  // 3. Emit to ALL connected clients (including sender)\n' +
        '  io.emit("global", { msg: "hello world" });\n\n' +
        '  // 4. Emit to all clients in a room (including sender)\n' +
        '  io.to("room1").emit("room-msg", { msg: "hi room" });\n\n' +
        '  // 5. Emit to all clients in a room EXCEPT sender\n' +
        '  socket.to("room1").emit("room-msg", { msg: "hi room" });\n\n' +
        '  // 6. Emit to multiple rooms\n' +
        '  io.to("room1").to("room2").emit("multi", { msg: "hi" });\n\n' +
        '  // 7. Emit to all clients EXCEPT those in a room\n' +
        '  io.except("room1").emit("others", { msg: "not room1" });\n' +
        '});'}</code></pre>

      {/* Section 6: Acknowledgements */}
      <h2 style={h2Style}>Acknowledgements (Request-Response)</h2>
      <p style={pStyle}>
        Acknowledgements let you implement a request-response pattern over Socket.IO. The emitter passes a callback, and the receiver invokes it to send a response back.
      </p>
      <pre style={codeStyle}><code>{'// Server: respond with acknowledgement\n' +
        'io.on("connection", (socket) => {\n' +
        '  socket.on("order:create", (orderData, callback) => {\n' +
        '    try {\n' +
        '      const order = createOrder(orderData);\n' +
        '      callback({ status: "ok", order });\n' +
        '    } catch (err) {\n' +
        '      callback({ status: "error", message: err.message });\n' +
        '    }\n' +
        '  });\n' +
        '});\n\n' +
        '// Client: emit with callback\n' +
        'socket.emit("order:create", { item: "laptop", qty: 1 }, (response) => {\n' +
        '  if (response.status === "ok") {\n' +
        '    console.log("Order created:", response.order.id);\n' +
        '  } else {\n' +
        '    console.error("Failed:", response.message);\n' +
        '  }\n' +
        '});\n\n' +
        '// With timeout (Socket.IO v4.4+)\n' +
        'socket.timeout(5000).emit("order:create", data, (err, response) => {\n' +
        '  if (err) {\n' +
        '    console.error("Server did not respond in time");\n' +
        '  } else {\n' +
        '    console.log("Response:", response);\n' +
        '  }\n' +
        '});'}</code></pre>

      {/* Section 7: Middleware */}
      <h2 style={h2Style}>Middleware</h2>
      <p style={pStyle}>
        Middleware functions execute during the handshake phase, before the connection event fires. They are ideal for authentication, rate limiting, and logging.
      </p>
      <pre style={codeStyle}><code>{'// Middleware runs once per connection attempt\n' +
        'io.use((socket, next) => {\n' +
        '  const startTime = Date.now();\n' +
        '  console.log("Connection attempt from:", socket.handshake.address);\n\n' +
        '  // Attach metadata\n' +
        '  socket.data.connectedAt = startTime;\n\n' +
        '  next(); // Call next() to allow connection\n' +
        '});\n\n' +
        '// Chain multiple middleware\n' +
        'io.use(rateLimitMiddleware);\n' +
        'io.use(authMiddleware);\n' +
        'io.use(loggingMiddleware);\n\n' +
        '// Reject a connection\n' +
        'io.use((socket, next) => {\n' +
        '  const ip = socket.handshake.address;\n' +
        '  if (isBlacklisted(ip)) {\n' +
        '    next(new Error("Forbidden"));\n' +
        '  } else {\n' +
        '    next();\n' +
        '  }\n' +
        '});'}</code></pre>

      {/* Section 8: Authentication with JWT */}
      <h2 style={h2Style}>Authentication with JWT</h2>
      <p style={pStyle}>
        The most common pattern is to validate a JWT token during the handshake. The client sends the token via the <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>auth</code> option, and the server verifies it in middleware.
      </p>
      <pre style={codeStyle}><code>{'// Server: JWT authentication middleware\n' +
        'const jwt = require("jsonwebtoken");\n\n' +
        'io.use((socket, next) => {\n' +
        '  const token = socket.handshake.auth.token;\n' +
        '  if (!token) {\n' +
        '    return next(new Error("Authentication required"));\n' +
        '  }\n\n' +
        '  try {\n' +
        '    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n' +
        '    socket.data.user = decoded;\n' +
        '    next();\n' +
        '  } catch (err) {\n' +
        '    next(new Error("Invalid or expired token"));\n' +
        '  }\n' +
        '});\n\n' +
        'io.on("connection", (socket) => {\n' +
        '  console.log("Authenticated user:", socket.data.user.email);\n' +
        '  // Join a user-specific room for targeted notifications\n' +
        '  socket.join("user:" + socket.data.user.id);\n' +
        '});\n\n' +
        '// Client: send JWT token\n' +
        'const socket = io("http://localhost:3001", {\n' +
        '  auth: {\n' +
        '    token: localStorage.getItem("accessToken")\n' +
        '  }\n' +
        '});\n\n' +
        '// Handle auth errors\n' +
        'socket.on("connect_error", (err) => {\n' +
        '  if (err.message === "Invalid or expired token") {\n' +
        '    // Refresh token and retry\n' +
        '    refreshToken().then((newToken) => {\n' +
        '      socket.auth.token = newToken;\n' +
        '      socket.connect();\n' +
        '    });\n' +
        '  }\n' +
        '});'}</code></pre>

      {/* Section 9: Error Handling */}
      <h2 style={h2Style}>Error Handling</h2>
      <p style={pStyle}>
        Proper error handling is critical for production Socket.IO applications. Handle errors at both the connection and event levels.
      </p>
      <pre style={codeStyle}><code>{'// Server: comprehensive error handling\n' +
        'io.on("connection", (socket) => {\n' +
        '  // Catch-all listener for debugging\n' +
        '  socket.onAny((eventName, ...args) => {\n' +
        '    console.log("Event:", eventName, args);\n' +
        '  });\n\n' +
        '  // Handle errors on individual events\n' +
        '  socket.on("data:save", async (data, callback) => {\n' +
        '    try {\n' +
        '      const result = await saveToDatabase(data);\n' +
        '      callback({ success: true, result });\n' +
        '    } catch (error) {\n' +
        '      console.error("Save failed:", error);\n' +
        '      callback({ success: false, error: error.message });\n' +
        '    }\n' +
        '  });\n\n' +
        '  // Handle socket errors\n' +
        '  socket.on("error", (err) => {\n' +
        '    console.error("Socket error:", err);\n' +
        '  });\n' +
        '});\n\n' +
        '// Server-level engine errors\n' +
        'io.engine.on("connection_error", (err) => {\n' +
        '  console.error("Connection error:", err.code, err.message);\n' +
        '});\n\n' +
        '// Client: error handling\n' +
        'socket.on("connect_error", (err) => {\n' +
        '  console.error("Connection failed:", err.message);\n' +
        '});\n\n' +
        'socket.on("disconnect", (reason) => {\n' +
        '  if (reason === "io server disconnect") {\n' +
        '    // Server forcefully disconnected; manual reconnect needed\n' +
        '    socket.connect();\n' +
        '  }\n' +
        '  // Otherwise, auto-reconnect kicks in\n' +
        '});'}</code></pre>

      {/* Section 10: Binary Data */}
      <h2 style={h2Style}>Binary Data Transfer</h2>
      <p style={pStyle}>
        Socket.IO automatically detects and handles binary data. You can send ArrayBuffers, Blobs, and Buffers without any special configuration.
      </p>
      <pre style={codeStyle}><code>{'// Client: send a file as binary\n' +
        'const fileInput = document.getElementById("file");\n' +
        'fileInput.addEventListener("change", (e) => {\n' +
        '  const file = e.target.files[0];\n' +
        '  const reader = new FileReader();\n' +
        '  reader.onload = () => {\n' +
        '    socket.emit("file:upload", {\n' +
        '      name: file.name,\n' +
        '      type: file.type,\n' +
        '      data: reader.result // ArrayBuffer\n' +
        '    });\n' +
        '  };\n' +
        '  reader.readAsArrayBuffer(file);\n' +
        '});\n\n' +
        '// Server: receive binary data\n' +
        'socket.on("file:upload", ({ name, type, data }) => {\n' +
        '  const buffer = Buffer.from(data);\n' +
        '  fs.writeFileSync("uploads/" + name, buffer);\n' +
        '  socket.emit("file:uploaded", { name, size: buffer.length });\n' +
        '});'}</code></pre>

      {/* Section 11: Scaling with Redis Adapter */}
      <h2 style={h2Style}>Scaling with Redis Adapter</h2>
      <p style={pStyle}>
        When running multiple Socket.IO server instances behind a load balancer, events emitted on one server must reach clients connected to other servers. The Redis adapter solves this using Redis Pub/Sub.
      </p>
      <pre style={codeStyle}><code>{'# Install the Redis adapter\n' +
        'npm install @socket.io/redis-adapter redis'}</code></pre>
      <pre style={codeStyle}><code>{'// server.js with Redis adapter\n' +
        'const { Server } = require("socket.io");\n' +
        'const { createAdapter } = require("@socket.io/redis-adapter");\n' +
        'const { createClient } = require("redis");\n\n' +
        'const io = new Server(httpServer);\n\n' +
        'const pubClient = createClient({ url: "redis://localhost:6379" });\n' +
        'const subClient = pubClient.duplicate();\n\n' +
        'Promise.all([pubClient.connect(), subClient.connect()]).then(() => {\n' +
        '  io.adapter(createAdapter(pubClient, subClient));\n' +
        '  httpServer.listen(3001);\n' +
        '  console.log("Server with Redis adapter ready");\n' +
        '});\n\n' +
        '// Now io.emit() reaches ALL clients across ALL servers\n' +
        '// io.to("room1").emit() also works cross-server'}</code></pre>
      <p style={pStyle}>
        For sticky sessions (required for HTTP long-polling transport), configure your load balancer to route requests from the same client to the same server based on the <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>sid</code> query parameter or a cookie.
      </p>

      {/* Section 12: Socket.IO with Express */}
      <h2 style={h2Style}>Socket.IO with Express</h2>
      <pre style={codeStyle}><code>{'const express = require("express");\n' +
        'const { createServer } = require("http");\n' +
        'const { Server } = require("socket.io");\n\n' +
        'const app = express();\n' +
        'const httpServer = createServer(app);\n' +
        'const io = new Server(httpServer, {\n' +
        '  cors: { origin: "*" }\n' +
        '});\n\n' +
        '// Express routes\n' +
        'app.get("/api/health", (req, res) => {\n' +
        '  res.json({ status: "ok", connections: io.engine.clientsCount });\n' +
        '});\n\n' +
        '// REST endpoint that triggers Socket.IO event\n' +
        'app.post("/api/notifications", express.json(), (req, res) => {\n' +
        '  const { userId, message } = req.body;\n' +
        '  io.to("user:" + userId).emit("notification", { message });\n' +
        '  res.json({ sent: true });\n' +
        '});\n\n' +
        '// Socket.IO handlers\n' +
        'io.on("connection", (socket) => {\n' +
        '  console.log("Connected:", socket.id);\n' +
        '});\n\n' +
        'httpServer.listen(3001);'}</code></pre>

      {/* Section 13: Socket.IO with Next.js */}
      <h2 style={h2Style}>Socket.IO with Next.js</h2>
      <p style={pStyle}>
        Since Next.js API routes are serverless by default, you need a custom server to run Socket.IO. Create a <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>server.js</code> at the project root.
      </p>
      <pre style={codeStyle}><code>{'// server.js (Next.js custom server)\n' +
        'const { createServer } = require("http");\n' +
        'const next = require("next");\n' +
        'const { Server } = require("socket.io");\n\n' +
        'const dev = process.env.NODE_ENV !== "production";\n' +
        'const app = next({ dev });\n' +
        'const handle = app.getRequestHandler();\n\n' +
        'app.prepare().then(() => {\n' +
        '  const httpServer = createServer((req, res) => {\n' +
        '    handle(req, res);\n' +
        '  });\n\n' +
        '  const io = new Server(httpServer, {\n' +
        '    cors: { origin: "*" }\n' +
        '  });\n\n' +
        '  // Make io accessible globally (for API routes)\n' +
        '  global.io = io;\n\n' +
        '  io.on("connection", (socket) => {\n' +
        '    console.log("Client connected:", socket.id);\n' +
        '  });\n\n' +
        '  httpServer.listen(3000, () => {\n' +
        '    console.log("Next.js + Socket.IO on port 3000");\n' +
        '  });\n' +
        '});'}</code></pre>

      {/* Section 14: React Hooks Integration */}
      <h2 style={h2Style}>React Hooks Integration</h2>
      <p style={pStyle}>
        Create a reusable custom hook that manages the Socket.IO connection lifecycle, event subscriptions, and cleanup automatically.
      </p>
      <pre style={codeStyle}><code>{'// hooks/useSocket.ts\n' +
        'import { useEffect, useRef, useState, useCallback } from "react";\n' +
        'import { io, Socket } from "socket.io-client";\n\n' +
        'export function useSocket(url: string, options?: object) {\n' +
        '  const socketRef = useRef<Socket | null>(null);\n' +
        '  const [isConnected, setIsConnected] = useState(false);\n\n' +
        '  useEffect(() => {\n' +
        '    const socket = io(url, options);\n' +
        '    socketRef.current = socket;\n\n' +
        '    socket.on("connect", () => setIsConnected(true));\n' +
        '    socket.on("disconnect", () => setIsConnected(false));\n\n' +
        '    return () => {\n' +
        '      socket.disconnect();\n' +
        '    };\n' +
        '  }, [url]);\n\n' +
        '  const emit = useCallback(\n' +
        '    (event: string, data?: any) => {\n' +
        '      socketRef.current?.emit(event, data);\n' +
        '    },\n' +
        '    []\n' +
        '  );\n\n' +
        '  return { socket: socketRef.current, isConnected, emit };\n' +
        '}'}</code></pre>

      <h3 style={h3Style}>useSocketEvent Hook</h3>
      <pre style={codeStyle}><code>{'// hooks/useSocketEvent.ts\n' +
        'import { useEffect } from "react";\n' +
        'import type { Socket } from "socket.io-client";\n\n' +
        'export function useSocketEvent<T = any>(\n' +
        '  socket: Socket | null,\n' +
        '  event: string,\n' +
        '  handler: (data: T) => void\n' +
        ') {\n' +
        '  useEffect(() => {\n' +
        '    if (!socket) return;\n' +
        '    socket.on(event, handler);\n' +
        '    return () => {\n' +
        '      socket.off(event, handler);\n' +
        '    };\n' +
        '  }, [socket, event, handler]);\n' +
        '}'}</code></pre>

      <h3 style={h3Style}>Using the Hooks in a Chat Component</h3>
      <pre style={codeStyle}><code>{'// components/Chat.tsx\n' +
        'import { useState, useCallback } from "react";\n' +
        'import { useSocket } from "../hooks/useSocket";\n' +
        'import { useSocketEvent } from "../hooks/useSocketEvent";\n\n' +
        'interface Message {\n' +
        '  userId: string;\n' +
        '  text: string;\n' +
        '  timestamp: number;\n' +
        '}\n\n' +
        'export function Chat({ room }: { room: string }) {\n' +
        '  const { socket, isConnected, emit } = useSocket(\n' +
        '    "http://localhost:3001"\n' +
        '  );\n' +
        '  const [messages, setMessages] = useState<Message[]>([]);\n' +
        '  const [input, setInput] = useState("");\n\n' +
        '  useSocketEvent<Message>(socket, "chat:message", \n' +
        '    useCallback((msg) => {\n' +
        '      setMessages((prev) => [...prev, msg]);\n' +
        '    }, [])\n' +
        '  );\n\n' +
        '  const sendMessage = () => {\n' +
        '    if (!input.trim()) return;\n' +
        '    emit("chat:message", { room, text: input });\n' +
        '    setInput("");\n' +
        '  };\n\n' +
        '  return (\n' +
        '    <div>\n' +
        '      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>\n' +
        '      <div>\n' +
        '        {messages.map((m, i) => (\n' +
        '          <div key={i}>{m.text}</div>\n' +
        '        ))}\n' +
        '      </div>\n' +
        '      <input\n' +
        '        value={input}\n' +
        '        onChange={(e) => setInput(e.target.value)}\n' +
        '        onKeyDown={(e) => e.key === "Enter" && sendMessage()}\n' +
        '      />\n' +
        '      <button onClick={sendMessage}>Send</button>\n' +
        '    </div>\n' +
        '  );\n' +
        '}'}</code></pre>

      {/* Section 15: Testing */}
      <h2 style={h2Style}>Testing Socket.IO</h2>
      <p style={pStyle}>
        Test your Socket.IO server by creating real client connections in your test suite. Use the socket.io-client package and a testing framework like Jest or Vitest.
      </p>
      <pre style={codeStyle}><code>{'// __tests__/socket.test.ts\n' +
        'import { createServer } from "http";\n' +
        'import { Server } from "socket.io";\n' +
        'import { io as Client } from "socket.io-client";\n' +
        'import type { Socket as ClientSocket } from "socket.io-client";\n\n' +
        'describe("Socket.IO Server", () => {\n' +
        '  let ioServer: Server;\n' +
        '  let clientSocket: ClientSocket;\n' +
        '  let httpServer: ReturnType<typeof createServer>;\n\n' +
        '  beforeAll((done) => {\n' +
        '    httpServer = createServer();\n' +
        '    ioServer = new Server(httpServer);\n' +
        '    httpServer.listen(() => {\n' +
        '      const addr = httpServer.address();\n' +
        '      const port = typeof addr === "object" ? addr?.port : 0;\n' +
        '      clientSocket = Client(\n' +
        '        "http://localhost:" + port\n' +
        '      );\n' +
        '      clientSocket.on("connect", done);\n' +
        '    });\n' +
        '  });\n\n' +
        '  afterAll(() => {\n' +
        '    ioServer.close();\n' +
        '    clientSocket.disconnect();\n' +
        '  });\n\n' +
        '  test("should echo messages", (done) => {\n' +
        '    ioServer.on("connection", (socket) => {\n' +
        '      socket.on("ping", (data) => {\n' +
        '        socket.emit("pong", data);\n' +
        '      });\n' +
        '    });\n\n' +
        '    clientSocket.emit("ping", { value: 42 });\n' +
        '    clientSocket.on("pong", (data) => {\n' +
        '      expect(data.value).toBe(42);\n' +
        '      done();\n' +
        '    });\n' +
        '  });\n\n' +
        '  test("should join rooms", (done) => {\n' +
        '    ioServer.on("connection", (socket) => {\n' +
        '      socket.join("test-room");\n' +
        '      ioServer.to("test-room").emit("room-msg", "hello");\n' +
        '    });\n\n' +
        '    clientSocket.on("room-msg", (data) => {\n' +
        '      expect(data).toBe("hello");\n' +
        '      done();\n' +
        '    });\n' +
        '  });\n' +
        '});'}</code></pre>

      {/* Section 16: Debugging */}
      <h2 style={h2Style}>Debugging Socket.IO</h2>
      <p style={pStyle}>
        Socket.IO uses the <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>debug</code> module internally. Enable verbose logging by setting the DEBUG environment variable.
      </p>
      <pre style={codeStyle}><code>{'# Server-side: enable all Socket.IO debug logs\n' +
        'DEBUG=socket.io* node server.js\n\n' +
        '# Server-side: only engine-level logs\n' +
        'DEBUG=engine* node server.js\n\n' +
        '# Client-side: enable in browser console\n' +
        '# localStorage.debug = "socket.io-client:socket";\n\n' +
        '# Client-side: enable all client debug logs\n' +
        '# localStorage.debug = "*";'}</code></pre>
      <p style={pStyle}>
        You can also use the Socket.IO Admin UI, a visual dashboard that lets you inspect connected sockets, rooms, and events in real time.
      </p>
      <pre style={codeStyle}><code>{'# Install admin UI\n' +
        'npm install @socket.io/admin-ui'}</code></pre>
      <pre style={codeStyle}><code>{'// Enable admin UI on the server\n' +
        'const { instrument } = require("@socket.io/admin-ui");\n\n' +
        'instrument(io, {\n' +
        '  auth: false, // Set to true in production\n' +
        '  mode: "development"\n' +
        '});\n' +
        '// Open https://admin.socket.io to view the dashboard'}</code></pre>

      {/* Section 17: Performance Tips */}
      <h2 style={h2Style}>Performance Optimization</h2>
      <p style={pStyle}>
        Follow these best practices to maximize Socket.IO throughput and minimize latency in production:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          { title: 'Skip HTTP polling upgrade', desc: 'If your infrastructure supports WebSocket, connect directly to avoid the polling-to-WebSocket upgrade overhead.' },
          { title: 'Use binary parser', desc: 'For binary-heavy workloads, use @socket.io/msgpack-parser for smaller payloads and faster serialization.' },
          { title: 'Enable per-message compression', desc: 'Compress large messages with the perMessageDeflate option to reduce bandwidth.' },
          { title: 'Batch events', desc: 'Instead of emitting many small events, batch them into a single event with an array payload.' },
          { title: 'Use volatile events', desc: 'For non-critical data like cursor positions, use socket.volatile.emit() to allow dropped messages.' },
          { title: 'Limit payload size', desc: 'Set maxHttpBufferSize to prevent clients from sending oversized payloads that consume server memory.' },
          { title: 'Connection state recovery', desc: 'Enable connectionStateRecovery in Socket.IO v4.6+ to resume sessions without re-syncing state.' },
        ].map((tip, i) => (
          <div key={i} style={{ padding: 14, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <strong style={{ ...strongStyle, fontSize: 14 }}>{tip.title}</strong>
            <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{tip.desc}</p>
          </div>
        ))}
      </div>

      <pre style={codeStyle}><code>{'// Performance-optimized server configuration\n' +
        'const io = new Server(httpServer, {\n' +
        '  // Skip HTTP long-polling, start with WebSocket\n' +
        '  transports: ["websocket"],\n\n' +
        '  // Limit max payload to 1MB\n' +
        '  maxHttpBufferSize: 1e6,\n\n' +
        '  // Enable per-message compression\n' +
        '  perMessageDeflate: {\n' +
        '    threshold: 1024 // Only compress payloads > 1KB\n' +
        '  },\n\n' +
        '  // Ping interval and timeout\n' +
        '  pingInterval: 25000,\n' +
        '  pingTimeout: 20000,\n\n' +
        '  // Connection state recovery (v4.6+)\n' +
        '  connectionStateRecovery: {\n' +
        '    maxDisconnectionDuration: 2 * 60 * 1000,\n' +
        '    skipMiddlewares: true\n' +
        '  }\n' +
        '});\n\n' +
        '// Client: connect with WebSocket only\n' +
        'const socket = io("http://localhost:3001", {\n' +
        '  transports: ["websocket"]\n' +
        '});'}</code></pre>

      <pre style={codeStyle}><code>{'// Volatile events for non-critical data\n' +
        'socket.volatile.emit("cursor:move", { x: 150, y: 300 });\n\n' +
        '// Batching: send multiple items in one event\n' +
        'const batch = [];\n' +
        'function queueEvent(data) {\n' +
        '  batch.push(data);\n' +
        '  if (batch.length >= 50) {\n' +
        '    socket.emit("events:batch", batch);\n' +
        '    batch.length = 0;\n' +
        '  }\n' +
        '}'}</code></pre>

      {/* Section 18: Socket.IO vs WebSocket - When to Use Which */}
      <h2 style={h2Style}>Socket.IO vs WebSocket: When to Use Which</h2>
      <p style={pStyle}>
        Choose <strong style={strongStyle}>raw WebSocket</strong> when you need the lowest possible latency and overhead, your infrastructure fully supports WebSocket, and you do not need automatic reconnection or rooms. This is common for high-frequency trading systems, game servers with custom protocols, or IoT devices with constrained resources.
      </p>
      <p style={pStyle}>
        Choose <strong style={strongStyle}>Socket.IO</strong> when you need production-ready features out of the box: automatic reconnection, room-based broadcasting, namespace multiplexing, fallback transports, and binary support. Socket.IO is the better choice for most web applications including chat, notifications, dashboards, and collaborative tools.
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Use Case</th>
            <th style={thStyle}>Recommended</th>
            <th style={thStyle}>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Chat application</td><td style={tdStyle}>Socket.IO</td><td style={tdStyle}>Rooms, presence, reconnection</td></tr>
          <tr><td style={tdStyle}>Live dashboard</td><td style={tdStyle}>Socket.IO</td><td style={tdStyle}>Namespaces, broadcasting</td></tr>
          <tr><td style={tdStyle}>Multiplayer game</td><td style={tdStyle}>WebSocket</td><td style={tdStyle}>Minimal overhead, custom protocol</td></tr>
          <tr><td style={tdStyle}>IoT sensor data</td><td style={tdStyle}>WebSocket</td><td style={tdStyle}>Lightweight, constrained devices</td></tr>
          <tr><td style={tdStyle}>Collaborative editor</td><td style={tdStyle}>Socket.IO</td><td style={tdStyle}>Rooms, acknowledgements</td></tr>
          <tr><td style={tdStyle}>Stock ticker</td><td style={tdStyle}>Either</td><td style={tdStyle}>Depends on scale and fallback needs</td></tr>
          <tr><td style={tdStyle}>Notifications</td><td style={tdStyle}>Socket.IO</td><td style={tdStyle}>User rooms, reliable delivery</td></tr>
        </tbody>
      </table>

      {/* FAQ Section */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>
      {faqData.map((item, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <h3 style={{ ...h3Style, marginTop: 16, fontSize: 16 }}>{item.q}</h3>
          <p style={pStyle}>{item.a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <h2 style={h2Style}>Conclusion</h2>
      <p style={pStyle}>
        Socket.IO remains the go-to solution for adding real-time capabilities to Node.js applications. Its event-driven API, built-in room management, automatic reconnection, and seamless scaling via the Redis adapter make it suitable for everything from simple chat apps to complex collaborative platforms. By following the patterns covered in this guide — proper authentication, structured error handling, React hooks integration, and performance optimization — you can build production-grade real-time features with confidence.
      </p>
      <p style={pStyle}>
        For new projects in 2026, Socket.IO v4.x offers connection state recovery, improved TypeScript support, and better performance. Combined with a custom React hook layer and horizontal scaling via Redis, it provides a complete real-time communication stack that is battle-tested by millions of applications worldwide.
      </p>
    </>
  );
}
