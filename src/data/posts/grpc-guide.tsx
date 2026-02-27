'use client';

import React from 'react';

/* ------------------------------------------------------------------ */
/*  gRPC Complete Guide: Protocol Buffers, Streaming & Microservices  */
/* ------------------------------------------------------------------ */

const translations = {
  en: {
    title: 'gRPC Complete Guide: Protocol Buffers, Streaming & Microservices',
    description: 'Master gRPC with Protocol Buffers, streaming patterns, and production best practices. Code examples in Node.js, Go, and Python.',
    tldr: 'gRPC is a high-performance RPC framework using Protocol Buffers for serialization and HTTP/2 for transport. It supports unary, server streaming, client streaming, and bidirectional streaming. Define services in .proto files, generate type-safe client/server code, and get built-in features like TLS, deadlines, and interceptors. Use gRPC for internal microservices; use REST or gRPC-Web for browser-facing APIs.',
    takeaway1: 'gRPC uses Protocol Buffers for binary serialization — 5-10x faster and smaller than JSON',
    takeaway2: 'HTTP/2 multiplexing enables streaming and eliminates head-of-line blocking',
    takeaway3: 'Define services once in .proto files, generate clients in any supported language',
    takeaway4: 'Four communication patterns: unary, server streaming, client streaming, bidirectional',
    takeaway5: 'Use gRPC-Web or a gateway proxy to expose gRPC services to browser clients',
    takeaway6: 'Always set deadlines, use interceptors for cross-cutting concerns, and enable TLS in production',
    takeaway7: 'gRPC integrates natively with Kubernetes, Istio, and Envoy for load balancing',
    takeaway8: 'Use health checks, reflection, and structured status codes for production readiness',
  },
  zh: {
    title: 'gRPC 完整指南：Protocol Buffers、流式传输与微服务',
    description: '掌握 gRPC，包括 Protocol Buffers、流式传输模式和生产环境最佳实践。提供 Node.js、Go 和 Python 代码示例。',
    tldr: 'gRPC 是一个使用 Protocol Buffers 序列化和 HTTP/2 传输的高性能 RPC 框架。支持一元调用、服务端流、客户端流和双向流。在 .proto 文件中定义服务，生成类型安全的客户端/服务端代码，内置 TLS、截止时间和拦截器等功能。内部微服务使用 gRPC，浏览器端 API 使用 REST 或 gRPC-Web。',
    takeaway1: 'gRPC 使用 Protocol Buffers 进行二进制序列化 — 比 JSON 快 5-10 倍且体积更小',
    takeaway2: 'HTTP/2 多路复用支持流式传输并消除队头阻塞',
    takeaway3: '在 .proto 文件中定义一次服务，即可生成任何支持语言的客户端',
    takeaway4: '四种通信模式：一元、服务端流、客户端流、双向流',
    takeaway5: '使用 gRPC-Web 或网关代理将 gRPC 服务暴露给浏览器客户端',
    takeaway6: '始终设置截止时间，使用拦截器处理横切关注点，生产环境启用 TLS',
    takeaway7: 'gRPC 原生集成 Kubernetes、Istio 和 Envoy 进行负载均衡',
    takeaway8: '使用健康检查、反射和结构化状态码确保生产就绪',
  },
};

export default function GrpcGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is gRPC and how does it differ from REST?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'gRPC is a high-performance RPC framework built on HTTP/2 and Protocol Buffers. Unlike REST which uses JSON over HTTP/1.1, gRPC uses binary serialization (5-10x smaller payloads), supports streaming, provides strongly typed contracts via .proto files, and generates client/server code automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use gRPC instead of REST?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use gRPC for internal microservice communication, low-latency high-throughput scenarios, streaming data, and polyglot environments. Use REST for public-facing APIs, browser clients without a proxy, simple CRUD operations, and when human-readable payloads matter for debugging.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the four types of gRPC communication patterns?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'gRPC supports four patterns: (1) Unary RPC — single request, single response like a function call; (2) Server streaming — single request, stream of responses; (3) Client streaming — stream of requests, single response; (4) Bidirectional streaming — both sides stream data simultaneously.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I define a gRPC service?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Define services in .proto files using Protocol Buffer syntax. Specify service name, RPC methods, request/response message types, and use the stream keyword for streaming methods. Then use protoc compiler with language-specific plugins to generate client and server code.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can gRPC work in web browsers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Browsers cannot make native gRPC calls because they lack HTTP/2 trailer support. Use gRPC-Web, which translates browser-compatible requests into native gRPC via an Envoy proxy or grpc-web middleware. Alternatively, use a gRPC-Gateway to expose REST endpoints backed by gRPC services.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does gRPC handle authentication and security?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'gRPC supports channel-level TLS encryption built-in, plus call-level authentication via metadata (similar to HTTP headers). Common patterns include mTLS for service-to-service auth, JWT/OAuth2 bearer tokens in metadata, and API keys. Use interceptors to enforce auth on all RPCs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are gRPC status codes and how do I handle errors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'gRPC defines 16 status codes (OK, CANCELLED, INVALID_ARGUMENT, NOT_FOUND, PERMISSION_DENIED, INTERNAL, etc.). Return structured errors with status codes and messages. Use google.rpc.Status with details for rich error information including error details, retry info, and debug info.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I load balance gRPC traffic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'gRPC uses persistent HTTP/2 connections, so traditional L4 load balancers do not distribute requests well. Use L7 load balancers (Envoy, Nginx with gRPC module), client-side balancing (round-robin, pick-first), or service mesh solutions (Istio, Linkerd) that understand HTTP/2 framing.',
        },
      },
    ],
  };

  const codeStyle: React.CSSProperties = {
    background: '#1e293b',
    color: '#e2e8f0',
    padding: '1rem',
    borderRadius: '6px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    margin: '0.75rem 0 1.25rem 0',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#1e293b',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.15rem',
    fontWeight: '600',
    marginTop: '1.25rem',
    marginBottom: '0.5rem',
    color: '#1e293b',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    margin: '1rem 0 1.5rem 0',
  };

  const thStyle: React.CSSProperties = {
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    padding: '0.5rem 0.75rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#1e293b',
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    padding: '0.5rem 0.75rem',
    verticalAlign: 'top',
    color: '#334155',
  };

  return (
    <article style={{ maxWidth: '820px', lineHeight: '1.75', color: '#334155' }}>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0369a1' }}>TL;DR</strong>
        <p style={{ margin: 0 }}>{t.tldr}</p>
      </div>

      {/* ── Section 1: What is gRPC ── */}
      <h2 style={h2Style}>1. What is gRPC?</h2>
      <p>
        gRPC (gRPC Remote Procedure Call) is an open-source high-performance RPC framework originally developed
        by Google. It uses <strong>Protocol Buffers</strong> (protobuf) as its interface definition language and
        serialization format, and runs on <strong>HTTP/2</strong> for transport. This combination gives gRPC
        binary efficiency, multiplexed connections, header compression, and native streaming support.
      </p>
      <p>
        Unlike REST where you design around resources and HTTP verbs, gRPC lets you define services with methods
        that clients call as if they were local function calls. The protobuf compiler generates strongly typed
        client and server stubs in over a dozen languages, eliminating manual serialization code.
      </p>

      {/* ── Section 2: Protocol Buffers ── */}
      <h2 style={h2Style}>2. Protocol Buffers Primer</h2>
      <p>
        Protocol Buffers (protobuf) is a language-neutral, platform-neutral mechanism for serializing structured
        data. You define your data shape once in a <code>.proto</code> file, then generate code for any target language.
      </p>

      <h3 style={h3Style}>Basic Message Definition</h3>
      <pre style={codeStyle}><code>{'syntax = "proto3";\n\n'
        + 'package user;\n\n'
        + 'message User {\n'
        + '  string id = 1;\n'
        + '  string name = 2;\n'
        + '  string email = 3;\n'
        + '  int32 age = 4;\n'
        + '  repeated string roles = 5;    // list of strings\n'
        + '  Address address = 6;          // nested message\n'
        + '}\n\n'
        + 'message Address {\n'
        + '  string street = 1;\n'
        + '  string city = 2;\n'
        + '  string country = 3;\n'
        + '  string zip_code = 4;\n'
        + '}'}</code></pre>
      <p>
        Each field has a <strong>type</strong>, a <strong>name</strong>, and a unique <strong>field number</strong>.
        Field numbers are used in the binary encoding and must not change once your message type is in use.
        The <code>repeated</code> keyword indicates a list. Proto3 makes all fields optional by default.
      </p>

      <h3 style={h3Style}>Protobuf vs JSON Size Comparison</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Format</th>
            <th style={thStyle}>Payload Size</th>
            <th style={thStyle}>Encode Time</th>
            <th style={thStyle}>Decode Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>JSON</strong></td>
            <td style={tdStyle}>~250 bytes</td>
            <td style={tdStyle}>~1.2 ms</td>
            <td style={tdStyle}>~1.5 ms</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Protobuf</strong></td>
            <td style={tdStyle}>~48 bytes</td>
            <td style={tdStyle}>~0.15 ms</td>
            <td style={tdStyle}>~0.12 ms</td>
          </tr>
        </tbody>
      </table>

      {/* ── Section 3: gRPC vs REST ── */}
      <h2 style={h2Style}>3. gRPC vs REST: When to Use Which</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Criteria</th>
            <th style={thStyle}>gRPC</th>
            <th style={thStyle}>REST</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Serialization</td>
            <td style={tdStyle}>Protobuf (binary)</td>
            <td style={tdStyle}>JSON (text)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Transport</td>
            <td style={tdStyle}>HTTP/2</td>
            <td style={tdStyle}>HTTP/1.1 or HTTP/2</td>
          </tr>
          <tr>
            <td style={tdStyle}>Streaming</td>
            <td style={tdStyle}>Built-in (4 patterns)</td>
            <td style={tdStyle}>SSE or WebSocket</td>
          </tr>
          <tr>
            <td style={tdStyle}>Code generation</td>
            <td style={tdStyle}>Native (protoc)</td>
            <td style={tdStyle}>Optional (OpenAPI)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Browser support</td>
            <td style={tdStyle}>Via gRPC-Web proxy</td>
            <td style={tdStyle}>Native</td>
          </tr>
          <tr>
            <td style={tdStyle}>Best for</td>
            <td style={tdStyle}>Microservices, streaming, polyglot</td>
            <td style={tdStyle}>Public APIs, CRUD, simple integrations</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Rule of thumb:</strong> Use gRPC for internal service-to-service communication where performance
        and type safety matter. Use REST for public APIs consumed by third-party developers or browser clients
        without a proxy layer.
      </p>

      {/* ── Section 4: Defining Services ── */}
      <h2 style={h2Style}>4. Defining Services with .proto Files</h2>
      <p>
        A gRPC service definition declares the RPC methods available to clients. Each method specifies a request
        and response message type, and optionally uses the <code>stream</code> keyword.
      </p>
      <pre style={codeStyle}><code>{'syntax = "proto3";\n'
        + 'package order;\n\n'
        + 'service OrderService {\n'
        + '  rpc CreateOrder (CreateOrderRequest) returns (Order);           // unary\n'
        + '  rpc GetOrder (GetOrderRequest) returns (Order);                 // unary\n'
        + '  rpc ListOrders (ListOrdersRequest) returns (stream Order);     // server stream\n'
        + '  rpc UploadLineItems (stream LineItem) returns (UploadSummary); // client stream\n'
        + '  rpc OrderChat (stream ChatMessage) returns (stream ChatMessage); // bidi\n'
        + '}\n\n'
        + 'message CreateOrderRequest {\n'
        + '  string customer_id = 1;\n'
        + '  repeated LineItem items = 2;\n'
        + '}\n\n'
        + 'message LineItem {\n'
        + '  string product_id = 1;\n'
        + '  int32 quantity = 2;\n'
        + '  double unit_price = 3;\n'
        + '}\n\n'
        + 'message Order {\n'
        + '  string id = 1;\n'
        + '  string customer_id = 2;\n'
        + '  repeated LineItem items = 3;\n'
        + '  double total = 4;\n'
        + '  OrderStatus status = 5;\n'
        + '}\n\n'
        + 'enum OrderStatus {\n'
        + '  ORDER_STATUS_UNSPECIFIED = 0;\n'
        + '  ORDER_STATUS_PENDING = 1;\n'
        + '  ORDER_STATUS_CONFIRMED = 2;\n'
        + '  ORDER_STATUS_SHIPPED = 3;\n'
        + '}'}</code></pre>
      <p>
        Compile the proto file to generate language-specific code:
      </p>
      <pre style={codeStyle}><code>{'# Generate Go code\n'
        + 'protoc --go_out=. --go-grpc_out=. proto/order.proto\n\n'
        + '# Generate Node.js/TypeScript code\n'
        + 'protoc --ts_out=./src/gen proto/order.proto\n\n'
        + '# Generate Python code\n'
        + 'python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. proto/order.proto'}</code></pre>

      {/* ── Section 5: Streaming Patterns ── */}
      <h2 style={h2Style}>5. Streaming Patterns Explained</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Pattern</th>
            <th style={thStyle}>Proto Syntax</th>
            <th style={thStyle}>Use Cases</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>Unary</strong></td>
            <td style={tdStyle}><code>rpc Get(Req) returns (Resp)</code></td>
            <td style={tdStyle}>CRUD, auth, lookups</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Server streaming</strong></td>
            <td style={tdStyle}><code>rpc List(Req) returns (stream Resp)</code></td>
            <td style={tdStyle}>Feeds, log tailing, large result sets</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Client streaming</strong></td>
            <td style={tdStyle}><code>rpc Upload(stream Req) returns (Resp)</code></td>
            <td style={tdStyle}>File uploads, batch ingestion, telemetry</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Bidirectional</strong></td>
            <td style={tdStyle}><code>rpc Chat(stream Msg) returns (stream Msg)</code></td>
            <td style={tdStyle}>Chat, collaborative editing, game state</td>
          </tr>
        </tbody>
      </table>
      <p>
        The <code>stream</code> keyword in the proto definition controls the pattern. Both sides read and
        write independently in bidirectional mode, and the two streams operate over a single HTTP/2 connection.
      </p>

      {/* ── Section 6: gRPC in Node.js/TypeScript ── */}
      <h2 style={h2Style}>6. gRPC in Node.js / TypeScript</h2>
      <p>
        The <code>@grpc/grpc-js</code> package is the official pure-JavaScript gRPC client and server.
        Pair it with <code>@grpc/proto-loader</code> for dynamic loading or <code>ts-proto</code> for
        generated TypeScript types.
      </p>

      <h3 style={h3Style}>Server Implementation</h3>
      <pre style={codeStyle}><code>{'import * as grpc from "@grpc/grpc-js";\n'
        + 'import * as protoLoader from "@grpc/proto-loader";\n\n'
        + 'const PROTO_PATH = "./proto/order.proto";\n\n'
        + 'const packageDef = protoLoader.loadSync(PROTO_PATH, {\n'
        + '  keepCase: true,\n'
        + '  longs: String,\n'
        + '  enums: String,\n'
        + '  defaults: true,\n'
        + '  oneofs: true,\n'
        + '});\n\n'
        + 'const proto = grpc.loadPackageDefinition(packageDef) as any;\n\n'
        + 'function createOrder(\n'
        + '  call: grpc.ServerUnaryCall<any, any>,\n'
        + '  callback: grpc.sendUnaryData<any>\n'
        + ') {\n'
        + '  const request = call.request;\n'
        + '  const order = {\n'
        + '    id: "ord-" + Date.now(),\n'
        + '    customer_id: request.customer_id,\n'
        + '    items: request.items,\n'
        + '    total: request.items.reduce(\n'
        + '      (sum: number, item: any) => sum + item.quantity * item.unit_price, 0\n'
        + '    ),\n'
        + '    status: "ORDER_STATUS_PENDING",\n'
        + '  };\n'
        + '  callback(null, order);\n'
        + '}\n\n'
        + 'function listOrders(\n'
        + '  call: grpc.ServerWritableStream<any, any>\n'
        + ') {\n'
        + '  // Server streaming: push orders one by one\n'
        + '  const orders = getOrdersFromDB(call.request.customer_id);\n'
        + '  for (const order of orders) {\n'
        + '    call.write(order);\n'
        + '  }\n'
        + '  call.end();\n'
        + '}\n\n'
        + 'const server = new grpc.Server();\n'
        + 'server.addService(proto.order.OrderService.service, {\n'
        + '  createOrder,\n'
        + '  listOrders,\n'
        + '});\n\n'
        + 'server.bindAsync(\n'
        + '  "0.0.0.0:50051",\n'
        + '  grpc.ServerCredentials.createInsecure(),\n'
        + '  (err, port) => {\n'
        + '    if (err) throw err;\n'
        + '    console.log("gRPC server running on port " + port);\n'
        + '  }\n'
        + ');'}</code></pre>

      <h3 style={h3Style}>Client Implementation</h3>
      <pre style={codeStyle}><code>{'const client = new proto.order.OrderService(\n'
        + '  "localhost:50051",\n'
        + '  grpc.credentials.createInsecure()\n'
        + ');\n\n'
        + '// Unary call\n'
        + 'client.createOrder(\n'
        + '  { customer_id: "cust-1", items: [{ product_id: "p-1", quantity: 2, unit_price: 29.99 }] },\n'
        + '  (err: any, response: any) => {\n'
        + '    if (err) return console.error("Error:", err.message);\n'
        + '    console.log("Order created:", response.id);\n'
        + '  }\n'
        + ');\n\n'
        + '// Server streaming\n'
        + 'const stream = client.listOrders({ customer_id: "cust-1" });\n'
        + 'stream.on("data", (order: any) => console.log("Order:", order.id));\n'
        + 'stream.on("end", () => console.log("All orders received"));\n'
        + 'stream.on("error", (err: any) => console.error("Error:", err.message));'}</code></pre>

      {/* ── Section 7: gRPC in Go ── */}
      <h2 style={h2Style}>7. gRPC in Go</h2>
      <p>
        Go has first-class gRPC support through <code>google.golang.org/grpc</code>. The generated
        code provides interfaces you implement for the server and ready-to-use clients with full
        type safety.
      </p>

      <h3 style={h3Style}>Server Implementation</h3>
      <pre style={codeStyle}><code>{'package main\n\n'
        + 'import (\n'
        + '    "context"\n'
        + '    "fmt"\n'
        + '    "log"\n'
        + '    "net"\n'
        + '    "time"\n\n'
        + '    "google.golang.org/grpc"\n'
        + '    pb "myapp/gen/order"\n'
        + ')\n\n'
        + 'type orderServer struct {\n'
        + '    pb.UnimplementedOrderServiceServer\n'
        + '}\n\n'
        + 'func (s *orderServer) CreateOrder(\n'
        + '    ctx context.Context,\n'
        + '    req *pb.CreateOrderRequest,\n'
        + ') (*pb.Order, error) {\n'
        + '    order := &pb.Order{\n'
        + '        Id:         fmt.Sprintf("ord-%d", time.Now().UnixMilli()),\n'
        + '        CustomerId: req.CustomerId,\n'
        + '        Items:      req.Items,\n'
        + '        Status:     pb.OrderStatus_ORDER_STATUS_PENDING,\n'
        + '    }\n'
        + '    return order, nil\n'
        + '}\n\n'
        + 'func (s *orderServer) ListOrders(\n'
        + '    req *pb.ListOrdersRequest,\n'
        + '    stream pb.OrderService_ListOrdersServer,\n'
        + ') error {\n'
        + '    orders := getOrdersFromDB(req.CustomerId)\n'
        + '    for _, order := range orders {\n'
        + '        if err := stream.Send(order); err != nil {\n'
        + '            return err\n'
        + '        }\n'
        + '    }\n'
        + '    return nil\n'
        + '}\n\n'
        + 'func main() {\n'
        + '    lis, err := net.Listen("tcp", ":50051")\n'
        + '    if err != nil {\n'
        + '        log.Fatalf("failed to listen: %v", err)\n'
        + '    }\n\n'
        + '    srv := grpc.NewServer()\n'
        + '    pb.RegisterOrderServiceServer(srv, &orderServer{})\n\n'
        + '    log.Println("gRPC server listening on :50051")\n'
        + '    if err := srv.Serve(lis); err != nil {\n'
        + '        log.Fatalf("failed to serve: %v", err)\n'
        + '    }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>Client Implementation</h3>
      <pre style={codeStyle}><code>{'conn, err := grpc.Dial(\n'
        + '    "localhost:50051",\n'
        + '    grpc.WithTransportCredentials(insecure.NewCredentials()),\n'
        + ')\n'
        + 'if err != nil {\n'
        + '    log.Fatalf("failed to connect: %v", err)\n'
        + '}\n'
        + 'defer conn.Close()\n\n'
        + 'client := pb.NewOrderServiceClient(conn)\n\n'
        + '// Unary call with deadline\n'
        + 'ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\n'
        + 'defer cancel()\n\n'
        + 'order, err := client.CreateOrder(ctx, &pb.CreateOrderRequest{\n'
        + '    CustomerId: "cust-1",\n'
        + '    Items: []*pb.LineItem{\n'
        + '        {ProductId: "p-1", Quantity: 2, UnitPrice: 29.99},\n'
        + '    },\n'
        + '})\n'
        + 'fmt.Println("Created order:", order.Id)\n\n'
        + '// Server streaming — read until EOF\n'
        + 'stream, _ := client.ListOrders(ctx, &pb.ListOrdersRequest{CustomerId: "cust-1"})\n'
        + 'for {\n'
        + '    o, err := stream.Recv()\n'
        + '    if err == io.EOF { break }\n'
        + '    if err != nil { log.Fatal(err) }\n'
        + '    fmt.Println("Order:", o.Id)\n'
        + '}'}</code></pre>

      {/* ── Section 8: gRPC in Python ── */}
      <h2 style={h2Style}>8. gRPC in Python</h2>
      <p>
        Python uses <code>grpcio</code> and <code>grpcio-tools</code> packages. The generated code
        provides typed stubs for both sync and async usage.
      </p>

      <h3 style={h3Style}>Server Implementation</h3>
      <pre style={codeStyle}><code>{'import grpc\n'
        + 'from concurrent import futures\n'
        + 'import time\n'
        + 'import order_pb2\n'
        + 'import order_pb2_grpc\n\n'
        + 'class OrderServicer(order_pb2_grpc.OrderServiceServicer):\n'
        + '    def CreateOrder(self, request, context):\n'
        + '        total = sum(\n'
        + '            item.quantity * item.unit_price\n'
        + '            for item in request.items\n'
        + '        )\n'
        + '        return order_pb2.Order(\n'
        + '            id=f"ord-{int(time.time() * 1000)}",\n'
        + '            customer_id=request.customer_id,\n'
        + '            items=request.items,\n'
        + '            total=total,\n'
        + '            status=order_pb2.ORDER_STATUS_PENDING,\n'
        + '        )\n\n'
        + '    def ListOrders(self, request, context):\n'
        + '        orders = get_orders_from_db(request.customer_id)\n'
        + '        for order in orders:\n'
        + '            yield order  # server streaming\n\n'
        + 'def serve():\n'
        + '    server = grpc.server(\n'
        + '        futures.ThreadPoolExecutor(max_workers=10)\n'
        + '    )\n'
        + '    order_pb2_grpc.add_OrderServiceServicer_to_server(\n'
        + '        OrderServicer(), server\n'
        + '    )\n'
        + '    server.add_insecure_port("[::]:50051")\n'
        + '    server.start()\n'
        + '    print("gRPC server running on port 50051")\n'
        + '    server.wait_for_termination()\n\n'
        + 'if __name__ == "__main__":\n'
        + '    serve()'}</code></pre>

      <h3 style={h3Style}>Client with Deadline</h3>
      <pre style={codeStyle}><code>{'import grpc\n'
        + 'import order_pb2\n'
        + 'import order_pb2_grpc\n\n'
        + 'channel = grpc.insecure_channel("localhost:50051")\n'
        + 'stub = order_pb2_grpc.OrderServiceStub(channel)\n\n'
        + '# Unary call with 5-second deadline\n'
        + 'try:\n'
        + '    response = stub.CreateOrder(\n'
        + '        order_pb2.CreateOrderRequest(\n'
        + '            customer_id="cust-1",\n'
        + '            items=[\n'
        + '                order_pb2.LineItem(\n'
        + '                    product_id="p-1",\n'
        + '                    quantity=2,\n'
        + '                    unit_price=29.99,\n'
        + '                )\n'
        + '            ],\n'
        + '        ),\n'
        + '        timeout=5.0,\n'
        + '    )\n'
        + '    print(f"Created order: {response.id}")\n'
        + 'except grpc.RpcError as e:\n'
        + '    print(f"RPC failed: {e.code()} - {e.details()}")\n\n'
        + '# Server streaming\n'
        + 'for order in stub.ListOrders(\n'
        + '    order_pb2.ListOrdersRequest(customer_id="cust-1")\n'
        + '):\n'
        + '    print(f"Order: {order.id}")'}</code></pre>

      {/* ── Section 9: Authentication & Security ── */}
      <h2 style={h2Style}>9. Authentication and Security</h2>
      <p>
        gRPC provides channel-level encryption with TLS and call-level authentication via metadata.
        Production services should always use TLS.
      </p>

      <h3 style={h3Style}>TLS Configuration (Go Server)</h3>
      <pre style={codeStyle}><code>{'import "google.golang.org/grpc/credentials"\n\n'
        + 'creds, err := credentials.NewServerTLSFromFile(\n'
        + '    "server.crt",\n'
        + '    "server.key",\n'
        + ')\n'
        + 'if err != nil {\n'
        + '    log.Fatalf("failed to load TLS: %v", err)\n'
        + '}\n\n'
        + 'srv := grpc.NewServer(grpc.Creds(creds))'}</code></pre>

      <h3 style={h3Style}>Token-Based Auth with Interceptors (Go)</h3>
      <pre style={codeStyle}><code>{'import (\n'
        + '    "context"\n'
        + '    "google.golang.org/grpc"\n'
        + '    "google.golang.org/grpc/codes"\n'
        + '    "google.golang.org/grpc/metadata"\n'
        + '    "google.golang.org/grpc/status"\n'
        + ')\n\n'
        + 'func authInterceptor(\n'
        + '    ctx context.Context,\n'
        + '    req interface{},\n'
        + '    info *grpc.UnaryServerInfo,\n'
        + '    handler grpc.UnaryHandler,\n'
        + ') (interface{}, error) {\n'
        + '    md, ok := metadata.FromIncomingContext(ctx)\n'
        + '    if !ok {\n'
        + '        return nil, status.Error(\n'
        + '            codes.Unauthenticated, "missing metadata",\n'
        + '        )\n'
        + '    }\n\n'
        + '    tokens := md.Get("authorization")\n'
        + '    if len(tokens) == 0 {\n'
        + '        return nil, status.Error(\n'
        + '            codes.Unauthenticated, "missing token",\n'
        + '        )\n'
        + '    }\n\n'
        + '    if err := validateToken(tokens[0]); err != nil {\n'
        + '        return nil, status.Error(\n'
        + '            codes.Unauthenticated, "invalid token",\n'
        + '        )\n'
        + '    }\n\n'
        + '    return handler(ctx, req)\n'
        + '}\n\n'
        + '// Register the interceptor\n'
        + 'srv := grpc.NewServer(\n'
        + '    grpc.UnaryInterceptor(authInterceptor),\n'
        + ')'}</code></pre>

      <h3 style={h3Style}>Sending Auth Token from Client (Node.js)</h3>
      <pre style={codeStyle}><code>{'const metadata = new grpc.Metadata();\n'
        + 'metadata.set("authorization", "Bearer " + token);\n\n'
        + 'client.createOrder(\n'
        + '  { customer_id: "cust-1", items: [] },\n'
        + '  metadata,\n'
        + '  (err, response) => {\n'
        + '    if (err) console.error(err);\n'
        + '    else console.log("Order:", response.id);\n'
        + '  }\n'
        + ');'}</code></pre>

      {/* ── Section 10: Error Handling ── */}
      <h2 style={h2Style}>10. Error Handling and Status Codes</h2>
      <p>
        gRPC defines a standard set of status codes. Always return meaningful codes and messages
        so clients can handle errors appropriately.
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Code</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>0</td><td style={tdStyle}>OK</td><td style={tdStyle}>Success</td></tr>
          <tr><td style={tdStyle}>1</td><td style={tdStyle}>CANCELLED</td><td style={tdStyle}>Client cancelled the request</td></tr>
          <tr><td style={tdStyle}>3</td><td style={tdStyle}>INVALID_ARGUMENT</td><td style={tdStyle}>Bad request data (validation)</td></tr>
          <tr><td style={tdStyle}>4</td><td style={tdStyle}>DEADLINE_EXCEEDED</td><td style={tdStyle}>Request took too long</td></tr>
          <tr><td style={tdStyle}>5</td><td style={tdStyle}>NOT_FOUND</td><td style={tdStyle}>Resource does not exist</td></tr>
          <tr><td style={tdStyle}>7</td><td style={tdStyle}>PERMISSION_DENIED</td><td style={tdStyle}>Authenticated but not authorized</td></tr>
          <tr><td style={tdStyle}>13</td><td style={tdStyle}>INTERNAL</td><td style={tdStyle}>Server-side bug</td></tr>
          <tr><td style={tdStyle}>14</td><td style={tdStyle}>UNAVAILABLE</td><td style={tdStyle}>Service temporarily down (retry)</td></tr>
          <tr><td style={tdStyle}>16</td><td style={tdStyle}>UNAUTHENTICATED</td><td style={tdStyle}>Missing or invalid credentials</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>Rich Error Details (Go)</h3>
      <pre style={codeStyle}><code>{'import (\n'
        + '    "google.golang.org/grpc/codes"\n'
        + '    "google.golang.org/grpc/status"\n'
        + '    "google.golang.org/genproto/googleapis/rpc/errdetails"\n'
        + ')\n\n'
        + 'func (s *orderServer) GetOrder(\n'
        + '    ctx context.Context,\n'
        + '    req *pb.GetOrderRequest,\n'
        + ') (*pb.Order, error) {\n'
        + '    order, err := s.db.FindOrder(req.Id)\n'
        + '    if err != nil {\n'
        + '        st := status.New(codes.NotFound, "order not found")\n'
        + '        detail := &errdetails.ErrorInfo{\n'
        + '            Reason: "ORDER_NOT_FOUND",\n'
        + '            Domain: "order.myapp.com",\n'
        + '            Metadata: map[string]string{\n'
        + '                "order_id": req.Id,\n'
        + '            },\n'
        + '        }\n'
        + '        st, _ = st.WithDetails(detail)\n'
        + '        return nil, st.Err()\n'
        + '    }\n'
        + '    return order, nil\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>Error Handling on the Client (Python)</h3>
      <pre style={codeStyle}><code>{'try:\n'
        + '    order = stub.GetOrder(\n'
        + '        order_pb2.GetOrderRequest(id="ord-missing"),\n'
        + '        timeout=5.0,\n'
        + '    )\n'
        + 'except grpc.RpcError as e:\n'
        + '    if e.code() == grpc.StatusCode.NOT_FOUND:\n'
        + '        print("Order not found:", e.details())\n'
        + '    elif e.code() == grpc.StatusCode.DEADLINE_EXCEEDED:\n'
        + '        print("Request timed out")\n'
        + '    elif e.code() == grpc.StatusCode.UNAVAILABLE:\n'
        + '        print("Service down, retrying...")\n'
        + '    else:\n'
        + '        print(f"RPC error: {e.code()} - {e.details()}")'}</code></pre>

      {/* ── Section 11: gRPC-Web ── */}
      <h2 style={h2Style}>11. gRPC-Web for Browser Clients</h2>
      <p>
        Browsers cannot make native gRPC calls due to missing HTTP/2 trailer support. gRPC-Web
        bridges this gap by translating browser-compatible requests into native gRPC through a proxy.
      </p>

      <h3 style={h3Style}>Architecture</h3>
      <pre style={codeStyle}><code>{'Browser (gRPC-Web client)\n'
        + '    |\n'
        + '    | HTTP/1.1 or HTTP/2 (no trailers)\n'
        + '    v\n'
        + 'Envoy Proxy (or grpc-web middleware)\n'
        + '    |\n'
        + '    | Native gRPC over HTTP/2\n'
        + '    v\n'
        + 'gRPC Backend Server'}</code></pre>

      <h3 style={h3Style}>Envoy Proxy Configuration (Key Parts)</h3>
      <pre style={codeStyle}><code>{'# envoy.yaml — essential gRPC-Web filters\n'
        + 'static_resources:\n'
        + '  listeners:\n'
        + '    - name: listener_0\n'
        + '      address:\n'
        + '        socket_address: { address: 0.0.0.0, port_value: 8080 }\n'
        + '      filter_chains:\n'
        + '        - filters:\n'
        + '            - name: envoy.filters.network.http_connection_manager\n'
        + '              typed_config:\n'
        + '                http_filters:\n'
        + '                  - name: envoy.filters.http.grpc_web  # key filter\n'
        + '                  - name: envoy.filters.http.cors\n'
        + '                  - name: envoy.filters.http.router\n'
        + '  clusters:\n'
        + '    - name: grpc_service\n'
        + '      type: logical_dns\n'
        + '      http2_protocol_options: {}  # must enable HTTP/2\n'
        + '      load_assignment:\n'
        + '        endpoints:\n'
        + '          - lb_endpoints:\n'
        + '              - endpoint:\n'
        + '                  address:\n'
        + '                    socket_address:\n'
        + '                      address: backend\n'
        + '                      port_value: 50051'}</code></pre>

      <h3 style={h3Style}>Browser Client (TypeScript)</h3>
      <pre style={codeStyle}><code>{'import { OrderServiceClient } from "./gen/order_grpc_web_pb";\n'
        + 'import { CreateOrderRequest, LineItem } from "./gen/order_pb";\n\n'
        + 'const client = new OrderServiceClient(\n'
        + '  "https://api.example.com:8080"\n'
        + ');\n\n'
        + 'const item = new LineItem();\n'
        + 'item.setProductId("p-1");\n'
        + 'item.setQuantity(2);\n'
        + 'item.setUnitPrice(29.99);\n\n'
        + 'const request = new CreateOrderRequest();\n'
        + 'request.setCustomerId("cust-1");\n'
        + 'request.setItemsList([item]);\n\n'
        + 'client.createOrder(request, {}, (err, response) => {\n'
        + '  if (err) {\n'
        + '    console.error("gRPC-Web error:", err.message);\n'
        + '    return;\n'
        + '  }\n'
        + '  console.log("Order ID:", response.getId());\n'
        + '});'}</code></pre>

      {/* ── Section 12: Load Balancing ── */}
      <h2 style={h2Style}>12. Load Balancing and Service Mesh</h2>
      <p>
        gRPC uses long-lived HTTP/2 connections, which means a traditional L4 (TCP) load balancer will
        send all requests from one connection to the same backend. You need L7 (application-layer)
        balancing or client-side balancing.
      </p>

      <h3 style={h3Style}>Load Balancing Strategies</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Strategy</th>
            <th style={thStyle}>How It Works</th>
            <th style={thStyle}>Pros</th>
            <th style={thStyle}>Cons</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>L7 Proxy (Envoy)</td>
            <td style={tdStyle}>Proxy understands HTTP/2 frames</td>
            <td style={tdStyle}>Per-request balancing, no client changes</td>
            <td style={tdStyle}>Extra hop latency</td>
          </tr>
          <tr>
            <td style={tdStyle}>Client-side (round-robin)</td>
            <td style={tdStyle}>Client discovers backends and distributes</td>
            <td style={tdStyle}>No proxy needed, lowest latency</td>
            <td style={tdStyle}>Client complexity, stale endpoints</td>
          </tr>
          <tr>
            <td style={tdStyle}>Service Mesh (Istio)</td>
            <td style={tdStyle}>Sidecar proxy per pod</td>
            <td style={tdStyle}>Transparent, advanced features</td>
            <td style={tdStyle}>Operational overhead, resource usage</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>Kubernetes Headless Service</h3>
      <pre style={codeStyle}><code>{'# Headless Service for client-side load balancing\n'
        + 'apiVersion: v1\n'
        + 'kind: Service\n'
        + 'metadata:\n'
        + '  name: order-service\n'
        + 'spec:\n'
        + '  clusterIP: None   # returns all pod IPs for DNS\n'
        + '  selector:\n'
        + '    app: order-service\n'
        + '  ports:\n'
        + '    - port: 50051\n'
        + '      targetPort: 50051\n'
        + '---\n'
        + '# Deployment with gRPC health probe\n'
        + 'apiVersion: apps/v1\n'
        + 'kind: Deployment\n'
        + 'metadata:\n'
        + '  name: order-service\n'
        + 'spec:\n'
        + '  replicas: 3\n'
        + '  template:\n'
        + '    spec:\n'
        + '      containers:\n'
        + '        - name: order-service\n'
        + '          image: myapp/order-service:latest\n'
        + '          ports:\n'
        + '            - containerPort: 50051\n'
        + '          readinessProbe:\n'
        + '            grpc:\n'
        + '              port: 50051'}</code></pre>

      {/* ── Section 13: Best Practices ── */}
      <h2 style={h2Style}>13. Best Practices for Production</h2>

      <h3 style={h3Style}>Always Set Deadlines</h3>
      <p>
        Never make a gRPC call without a deadline. Without deadlines, a slow or stuck server can hold
        client resources indefinitely, cascading failures across services.
      </p>
      <pre style={codeStyle}><code>{'// Go: always set a deadline\n'
        + 'ctx, cancel := context.WithTimeout(\n'
        + '    context.Background(),\n'
        + '    5*time.Second,\n'
        + ')\n'
        + 'defer cancel()\n\n'
        + '// Node.js: set deadline in options\n'
        + '// const deadline = new Date();\n'
        + '// deadline.setSeconds(deadline.getSeconds() + 5);\n'
        + '// client.createOrder(request, { deadline }, callback);\n\n'
        + '// Python: timeout parameter\n'
        + '// stub.CreateOrder(request, timeout=5.0)'}</code></pre>

      <h3 style={h3Style}>Use Interceptors for Cross-Cutting Concerns</h3>
      <pre style={codeStyle}><code>{'// Go: chain logging + auth + rate limit interceptors\n'
        + 'srv := grpc.NewServer(\n'
        + '    grpc.ChainUnaryInterceptor(\n'
        + '        loggingInterceptor,   // logs method, duration, error\n'
        + '        authInterceptor,      // validates JWT token\n'
        + '        rateLimitInterceptor, // token-bucket per client\n'
        + '    ),\n'
        + ')'}</code></pre>

      <h3 style={h3Style}>Health Checks and Reflection</h3>
      <pre style={codeStyle}><code>{'import (\n'
        + '    "google.golang.org/grpc/health"\n'
        + '    "google.golang.org/grpc/health/grpc_health_v1"\n'
        + '    "google.golang.org/grpc/reflection"\n'
        + ')\n\n'
        + '// Enable health checking\n'
        + 'healthSrv := health.NewServer()\n'
        + 'grpc_health_v1.RegisterHealthServer(srv, healthSrv)\n'
        + 'healthSrv.SetServingStatus(\n'
        + '    "order.OrderService",\n'
        + '    grpc_health_v1.HealthCheckResponse_SERVING,\n'
        + ')\n\n'
        + '// Enable reflection (for grpcurl, grpcui)\n'
        + 'reflection.Register(srv)\n\n'
        + '// Now you can introspect with grpcurl:\n'
        + '// grpcurl -plaintext localhost:50051 list\n'
        + '// grpcurl -plaintext localhost:50051 order.OrderService/CreateOrder'}</code></pre>

      <h3 style={h3Style}>Proto File Best Practices</h3>
      <ul style={{ lineHeight: '2' }}>
        <li><strong>Never reuse field numbers</strong> — deleted fields should be reserved</li>
        <li><strong>Use packages</strong> — namespace your protos to avoid conflicts</li>
        <li><strong>Prefix enum values</strong> — e.g., <code>ORDER_STATUS_PENDING</code> not just <code>PENDING</code></li>
        <li><strong>Add a zero value for enums</strong> — first value should be <code>UNSPECIFIED = 0</code></li>
        <li><strong>Use wrapper types for optional scalars</strong> — <code>google.protobuf.Int32Value</code></li>
        <li><strong>Version your APIs</strong> — use <code>package myapp.order.v1</code></li>
        <li><strong>Lint your protos</strong> — use <code>buf lint</code> to enforce style rules</li>
      </ul>

      <h3 style={h3Style}>Retry and Backoff</h3>
      <pre style={codeStyle}><code>{'// Go: retry policy via service config JSON\n'
        + 'serviceConfig := `{"methodConfig":[{"name":[{"service":"order.OrderService"}],\n'
        + '  "retryPolicy":{"maxAttempts":3,"initialBackoff":"0.1s",\n'
        + '  "maxBackoff":"1s","backoffMultiplier":2.0,\n'
        + '  "retryableStatusCodes":["UNAVAILABLE","DEADLINE_EXCEEDED"]}}]}`\n\n'
        + 'conn, _ := grpc.Dial("localhost:50051",\n'
        + '    grpc.WithDefaultServiceConfig(serviceConfig),\n'
        + '    grpc.WithTransportCredentials(insecure.NewCredentials()),\n'
        + ')'}</code></pre>

      <h3 style={h3Style}>Graceful Shutdown</h3>
      <pre style={codeStyle}><code>{'// Go: graceful shutdown\n'
        + 'quit := make(chan os.Signal, 1)\n'
        + 'signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)\n'
        + '<-quit\n\n'
        + 'log.Println("Shutting down gRPC server...")\n'
        + 'srv.GracefulStop()  // waits for in-flight RPCs\n'
        + 'log.Println("Server stopped")'}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.9' }}>
          <li>{t.takeaway1}</li>
          <li>{t.takeaway2}</li>
          <li>{t.takeaway3}</li>
          <li>{t.takeaway4}</li>
          <li>{t.takeaway5}</li>
          <li>{t.takeaway6}</li>
          <li>{t.takeaway7}</li>
          <li>{t.takeaway8}</li>
        </ul>
      </div>
    </article>
  );
}
