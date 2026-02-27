'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Microservices Patterns Guide: Service Design, Communication, Saga, CQRS, Event Sourcing & Observability',
    description:
      'Master microservices architecture patterns — service decomposition (DDD bounded contexts, strangler fig), inter-service communication (REST, gRPC, async messaging), API Gateway, saga orchestration vs choreography, CQRS, event sourcing, circuit breaker, bulkhead, distributed tracing (OpenTelemetry), service mesh, and data management strategies with production-ready code examples.',
  },
  zh: {
    title: '微服务模式完全指南：服务设计、通信、Saga、CQRS、事件溯源与可观测性',
    description:
      '全面掌握微服务架构模式 — 服务分解（DDD 限界上下文、绞杀者模式）、服务间通信（REST、gRPC、异步消息）、API 网关、Saga 编排与协调、CQRS、事件溯源、熔断器、隔舱、分布式追踪（OpenTelemetry）、服务网格及数据管理策略，配合生产级代码示例。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best way to decompose a monolith into microservices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start with Domain-Driven Design to identify bounded contexts. Use the Strangler Fig pattern to incrementally migrate functionality — route traffic through an API gateway and replace monolith endpoints one by one. Avoid a big-bang rewrite. Prioritize domains with the most independent business logic and fewest cross-cutting dependencies.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use synchronous vs asynchronous communication between microservices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use synchronous communication (REST or gRPC) when the caller needs an immediate response and the latency is acceptable. Use asynchronous messaging (Kafka, RabbitMQ, NATS) when you need temporal decoupling, higher throughput, or the operation can tolerate eventual consistency. Prefer async for cross-domain events and sync for queries within the same bounded context.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Saga pattern and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Saga pattern manages distributed transactions across multiple microservices by breaking them into a sequence of local transactions, each with a compensating action for rollback. Use orchestration when you need centralized coordination and visibility, and choreography when services should remain loosely coupled. Sagas replace traditional two-phase commits that do not scale in distributed systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between CQRS and event sourcing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CQRS (Command Query Responsibility Segregation) separates read and write models, allowing each to be optimized independently. Event sourcing stores every state change as an immutable event rather than overwriting current state. They are complementary but independent — you can use CQRS without event sourcing, and vice versa. Combined, they provide a powerful audit trail and enable temporal queries.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the circuit breaker pattern prevent cascading failures?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The circuit breaker monitors calls to a downstream service. When failures exceed a threshold, it trips to an open state and immediately returns errors without making the call, preventing resource exhaustion. After a timeout it enters half-open state, allowing a few test requests through. If those succeed, it closes; otherwise it reopens. Libraries like Resilience4j, Polly, and Hystrix implement this pattern.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the bulkhead pattern in microservices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The bulkhead pattern isolates resources (thread pools, connection pools, memory) so that a failure in one component does not exhaust resources needed by others. Named after ship bulkheads that prevent flooding from spreading, it limits the blast radius of failures. Implementations include separate thread pools per downstream dependency, container resource limits, and rate limiting per tenant.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does distributed tracing work with OpenTelemetry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenTelemetry propagates a trace context (trace ID, span ID, flags) through HTTP headers or message metadata across service boundaries. Each service creates spans representing units of work, which are exported to backends like Jaeger, Zipkin, or Grafana Tempo. This provides end-to-end visibility into request flows, latency breakdowns, and error localization across the entire microservices topology.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should each microservice have its own database?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the database-per-service pattern is strongly recommended. Each service owns its data schema and storage engine, preventing tight coupling at the database layer. Sharing a database across services creates implicit contracts, makes independent deployment impossible, and leads to schema change conflicts. Use events or APIs for cross-service data access, and accept eventual consistency as a trade-off for autonomy.',
      },
    },
  ],
};

export default function MicroservicesPatternsGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  const tipStyle: React.CSSProperties = {
    background: '#fffbeb',
    borderLeft: '4px solid #f59e0b',
    padding: '12px 16px',
    borderRadius: '4px',
    margin: '16px 0',
    color: '#92400e',
    lineHeight: '1.7',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.7', margin: '0' }}>
          {t.description}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          {isZh ? 'TL;DR — 60 秒速览微服务模式' : 'TL;DR — Microservices Patterns in 60 Seconds'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.9' }}>
          <li>{isZh ? '使用 DDD 限界上下文分解服务，用绞杀者模式渐进迁移' : 'Decompose via DDD bounded contexts; migrate incrementally with Strangler Fig'}</li>
          <li>{isZh ? '同步通信（REST/gRPC）用于查询，异步消息用于事件驱动解耦' : 'Sync (REST/gRPC) for queries, async messaging for event-driven decoupling'}</li>
          <li>{isZh ? 'API 网关统一入口：路由、认证、限流、协议转换' : 'API Gateway as single entry point: routing, auth, rate limiting, protocol translation'}</li>
          <li>{isZh ? 'Saga 管理分布式事务 — 编排式（集中控制）或协调式（事件驱动）' : 'Saga for distributed transactions — orchestration (centralized) or choreography (event-driven)'}</li>
          <li>{isZh ? 'CQRS 分离读写模型，事件溯源保留完整状态变更历史' : 'CQRS separates read/write models; event sourcing preserves full state change history'}</li>
          <li>{isZh ? '熔断器 + 隔舱 + 指数退避重试 = 弹性三剑客' : 'Circuit breaker + bulkhead + exponential backoff retry = resilience trifecta'}</li>
          <li>{isZh ? 'OpenTelemetry 分布式追踪 + 服务网格（Istio/Linkerd）实现全链路可观测性' : 'OpenTelemetry tracing + service mesh (Istio/Linkerd) for end-to-end observability'}</li>
          <li>{isZh ? '每个服务独立数据库，杜绝共享数据库反模式' : 'Database per service — avoid the shared database anti-pattern'}</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ fontSize: '1rem', color: '#334155', display: 'block', marginBottom: '10px' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
          <li>{isZh ? '微服务不是银弹 — 只在团队规模和业务复杂度需要时采用' : 'Microservices are not a silver bullet — adopt only when team size and business complexity demand it'}</li>
          <li>{isZh ? '服务边界应与业务能力（而非技术层）对齐' : 'Service boundaries should align with business capabilities, not technical layers'}</li>
          <li>{isZh ? '拥抱最终一致性，放弃分布式强一致性的幻想' : 'Embrace eventual consistency — abandon the illusion of distributed strong consistency'}</li>
          <li>{isZh ? '可观测性（日志、指标、追踪）是微服务的生命线，而非可选项' : 'Observability (logs, metrics, traces) is a lifeline for microservices, not optional'}</li>
          <li>{isZh ? '先用绞杀者模式渐进迁移，避免大爆炸重写' : 'Migrate incrementally with Strangler Fig first — avoid big-bang rewrites'}</li>
          <li>{isZh ? '每个模式都有代价 — 评估收益是否超过引入的复杂性' : 'Every pattern has a cost — evaluate whether the benefit exceeds the introduced complexity'}</li>
        </ul>
      </div>

      {/* ── Section 1: Service Decomposition ── */}
      <h2 style={h2Style}>
        {isZh ? '1. 服务分解策略' : '1. Service Decomposition Strategies'}
      </h2>

      <h3 style={h3Style}>
        {isZh ? 'DDD 限界上下文' : 'DDD Bounded Contexts'}
      </h3>
      <p style={pStyle}>
        {isZh
          ? 'Domain-Driven Design（领域驱动设计）的限界上下文是划分微服务边界最可靠的方法。每个限界上下文封装一个完整的业务领域，拥有独立的领域模型、通用语言和数据存储。'
          : 'DDD bounded contexts are the most reliable method for defining microservice boundaries. Each bounded context encapsulates a complete business domain with its own domain model, ubiquitous language, and data store.'}
      </p>
      <pre style={preStyle}><code>{'// E-commerce bounded contexts example\n'
        + '// Each context becomes a candidate microservice\n'
        + '\n'
        + '// Order Context — owns order lifecycle\n'
        + 'interface Order {\n'
        + '  orderId: string;\n'
        + '  customerId: string;\n'
        + '  items: OrderItem[];\n'
        + '  status: "pending" | "confirmed" | "shipped" | "delivered";\n'
        + '  totalAmount: number;\n'
        + '}\n'
        + '\n'
        + '// Inventory Context — owns stock management\n'
        + 'interface InventoryItem {\n'
        + '  sku: string;\n'
        + '  warehouseId: string;\n'
        + '  quantityAvailable: number;\n'
        + '  reservedQuantity: number;\n'
        + '}\n'
        + '\n'
        + '// Payment Context — owns payment processing\n'
        + 'interface Payment {\n'
        + '  paymentId: string;\n'
        + '  orderId: string;  // reference, not a foreign key\n'
        + '  amount: number;\n'
        + '  method: "credit_card" | "paypal" | "bank_transfer";\n'
        + '  status: "pending" | "authorized" | "captured" | "refunded";\n'
        + '}\n'
        + '\n'
        + '// Shipping Context — owns delivery logistics\n'
        + 'interface Shipment {\n'
        + '  shipmentId: string;\n'
        + '  orderId: string;\n'
        + '  carrier: string;\n'
        + '  trackingNumber: string;\n'
        + '  estimatedDelivery: Date;\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '绞杀者无花果模式' : 'Strangler Fig Pattern'}
      </h3>
      <p style={pStyle}>
        {isZh
          ? '绞杀者模式允许你渐进式地从单体迁移到微服务。通过 API 网关或反向代理，将流量逐步从单体路由到新的微服务，直到单体被完全替换。'
          : 'The Strangler Fig pattern enables incremental migration from a monolith to microservices. An API gateway or reverse proxy gradually routes traffic from the monolith to new microservices until the monolith is fully replaced.'}
      </p>
      <pre style={preStyle}><code>{'# Nginx configuration for Strangler Fig migration\n'
        + '# Route new endpoints to microservices, legacy to monolith\n'
        + '\n'
        + 'upstream monolith {\n'
        + '    server monolith-app:8080;\n'
        + '}\n'
        + '\n'
        + 'upstream order-service {\n'
        + '    server order-service:3001;\n'
        + '}\n'
        + '\n'
        + 'upstream inventory-service {\n'
        + '    server inventory-service:3002;\n'
        + '}\n'
        + '\n'
        + 'server {\n'
        + '    listen 80;\n'
        + '\n'
        + '    # Migrated: orders now served by microservice\n'
        + '    location /api/v2/orders {\n'
        + '        proxy_pass http://order-service;\n'
        + '    }\n'
        + '\n'
        + '    # Migrated: inventory now served by microservice\n'
        + '    location /api/v2/inventory {\n'
        + '        proxy_pass http://inventory-service;\n'
        + '    }\n'
        + '\n'
        + '    # Everything else still goes to the monolith\n'
        + '    location / {\n'
        + '        proxy_pass http://monolith;\n'
        + '    }\n'
        + '}'}</code></pre>

      {/* ── Section 2: Inter-Service Communication ── */}
      <h2 style={h2Style}>
        {isZh ? '2. 服务间通信' : '2. Inter-Service Communication'}
      </h2>

      <h3 style={h3Style}>
        {isZh ? '同步通信：REST 与 gRPC' : 'Synchronous: REST vs gRPC'}
      </h3>
      <p style={pStyle}>
        {isZh
          ? 'REST 使用 HTTP/JSON 实现简单的请求-响应通信，适合外部 API 和简单查询。gRPC 使用 Protocol Buffers 和 HTTP/2，提供更高性能、类型安全和双向流，适合服务间内部通信。'
          : 'REST uses HTTP/JSON for simple request-response communication, suitable for external APIs and simple queries. gRPC uses Protocol Buffers and HTTP/2, offering higher performance, type safety, and bidirectional streaming, ideal for internal service-to-service communication.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>REST</th>
            <th style={thStyle}>gRPC</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '协议' : 'Protocol'}</td><td style={tdStyle}>HTTP/1.1 or HTTP/2</td><td style={tdStyle}>HTTP/2</td></tr>
          <tr><td style={tdStyle}>{isZh ? '序列化' : 'Serialization'}</td><td style={tdStyle}>JSON (text)</td><td style={tdStyle}>Protobuf (binary)</td></tr>
          <tr><td style={tdStyle}>{isZh ? '类型安全' : 'Type Safety'}</td><td style={tdStyle}>{isZh ? '无（需 OpenAPI 生成）' : 'None (needs OpenAPI codegen)'}</td><td style={tdStyle}>{isZh ? '内置（proto 文件生成）' : 'Built-in (proto codegen)'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '流式传输' : 'Streaming'}</td><td style={tdStyle}>{isZh ? '有限（SSE/WebSocket）' : 'Limited (SSE/WebSocket)'}</td><td style={tdStyle}>{isZh ? '原生双向流' : 'Native bidirectional streaming'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '浏览器支持' : 'Browser Support'}</td><td style={tdStyle}>{isZh ? '原生支持' : 'Native'}</td><td style={tdStyle}>{isZh ? '需要 grpc-web 代理' : 'Requires grpc-web proxy'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '最佳场景' : 'Best For'}</td><td style={tdStyle}>{isZh ? '公开 API、CRUD 操作' : 'Public APIs, CRUD operations'}</td><td style={tdStyle}>{isZh ? '内部服务通信、高性能' : 'Internal services, high performance'}</td></tr>
        </tbody>
      </table>
      <pre style={preStyle}><code>{'// gRPC service definition (order.proto)\n'
        + 'syntax = "proto3";\n'
        + '\n'
        + 'package order;\n'
        + '\n'
        + 'service OrderService {\n'
        + '  rpc CreateOrder (CreateOrderRequest) returns (OrderResponse);\n'
        + '  rpc GetOrder (GetOrderRequest) returns (OrderResponse);\n'
        + '  rpc StreamOrderUpdates (GetOrderRequest) returns (stream OrderEvent);\n'
        + '}\n'
        + '\n'
        + 'message CreateOrderRequest {\n'
        + '  string customer_id = 1;\n'
        + '  repeated OrderItem items = 2;\n'
        + '}\n'
        + '\n'
        + 'message OrderItem {\n'
        + '  string sku = 1;\n'
        + '  int32 quantity = 2;\n'
        + '  double unit_price = 3;\n'
        + '}\n'
        + '\n'
        + 'message OrderResponse {\n'
        + '  string order_id = 1;\n'
        + '  string status = 2;\n'
        + '  double total_amount = 3;\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '异步消息传递' : 'Asynchronous Messaging'}
      </h3>
      <p style={pStyle}>
        {isZh
          ? '异步消息通过消息代理（Kafka、RabbitMQ、NATS）实现时间解耦。发送方不需要等待接收方处理完成，适合事件驱动架构和最终一致性场景。'
          : 'Asynchronous messaging achieves temporal decoupling through message brokers (Kafka, RabbitMQ, NATS). The sender does not wait for the receiver to finish processing, making it ideal for event-driven architectures and eventual consistency scenarios.'}
      </p>
      <pre style={preStyle}><code>{'// Publishing domain events with Kafka (Node.js + kafkajs)\n'
        + 'import { Kafka, Partitioners } from "kafkajs";\n'
        + '\n'
        + 'const kafka = new Kafka({\n'
        + '  clientId: "order-service",\n'
        + '  brokers: ["kafka-1:9092", "kafka-2:9092"],\n'
        + '});\n'
        + '\n'
        + 'const producer = kafka.producer({\n'
        + '  createPartitioner: Partitioners.DefaultPartitioner,\n'
        + '});\n'
        + '\n'
        + 'interface OrderCreatedEvent {\n'
        + '  eventType: "OrderCreated";\n'
        + '  orderId: string;\n'
        + '  customerId: string;\n'
        + '  totalAmount: number;\n'
        + '  timestamp: string;\n'
        + '}\n'
        + '\n'
        + 'async function publishOrderCreated(order: OrderCreatedEvent) {\n'
        + '  await producer.connect();\n'
        + '  await producer.send({\n'
        + '    topic: "order-events",\n'
        + '    messages: [\n'
        + '      {\n'
        + '        key: order.orderId,\n'
        + '        value: JSON.stringify(order),\n'
        + '        headers: {\n'
        + '          "event-type": "OrderCreated",\n'
        + '          "correlation-id": crypto.randomUUID(),\n'
        + '        },\n'
        + '      },\n'
        + '    ],\n'
        + '  });\n'
        + '}\n'
        + '\n'
        + '// Consuming events in inventory-service\n'
        + 'const consumer = kafka.consumer({ groupId: "inventory-group" });\n'
        + '\n'
        + 'async function startConsumer() {\n'
        + '  await consumer.connect();\n'
        + '  await consumer.subscribe({ topic: "order-events" });\n'
        + '  await consumer.run({\n'
        + '    eachMessage: async ({ topic, partition, message }) => {\n'
        + '      const event = JSON.parse(message.value!.toString());\n'
        + '      if (event.eventType === "OrderCreated") {\n'
        + '        await reserveInventory(event.orderId, event.items);\n'
        + '      }\n'
        + '    },\n'
        + '  });\n'
        + '}'}</code></pre>

      {/* ── Section 3: API Gateway ── */}
      <h2 style={h2Style}>
        {isZh ? '3. API 网关模式' : '3. API Gateway Pattern'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'API 网关是所有客户端请求的单一入口点，负责路由、认证、限流、协议转换和请求聚合。它隐藏了内部微服务拓扑，简化了客户端交互。'
          : 'The API Gateway is the single entry point for all client requests, handling routing, authentication, rate limiting, protocol translation, and request aggregation. It hides the internal microservices topology and simplifies client interaction.'}
      </p>
      <pre style={preStyle}><code>{'// Express.js API Gateway with routing + auth + rate limiting\n'
        + 'import express from "express";\n'
        + 'import { createProxyMiddleware } from "http-proxy-middleware";\n'
        + 'import rateLimit from "express-rate-limit";\n'
        + '\n'
        + 'const app = express();\n'
        + '\n'
        + '// Global rate limiting\n'
        + 'app.use(rateLimit({\n'
        + '  windowMs: 60 * 1000,    // 1 minute\n'
        + '  max: 100,               // 100 requests per window\n'
        + '  standardHeaders: true,\n'
        + '}));\n'
        + '\n'
        + '// JWT authentication middleware\n'
        + 'function authenticate(req, res, next) {\n'
        + '  const token = req.headers.authorization?.split(" ")[1];\n'
        + '  if (!token) return res.status(401).json({ error: "Unauthorized" });\n'
        + '  try {\n'
        + '    req.user = jwt.verify(token, process.env.JWT_SECRET);\n'
        + '    next();\n'
        + '  } catch {\n'
        + '    res.status(403).json({ error: "Invalid token" });\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Route to microservices\n'
        + 'app.use("/api/orders", authenticate, createProxyMiddleware({\n'
        + '  target: "http://order-service:3001",\n'
        + '  changeOrigin: true,\n'
        + '  pathRewrite: { "^/api/orders": "/orders" },\n'
        + '}));\n'
        + '\n'
        + 'app.use("/api/inventory", authenticate, createProxyMiddleware({\n'
        + '  target: "http://inventory-service:3002",\n'
        + '  changeOrigin: true,\n'
        + '  pathRewrite: { "^/api/inventory": "/inventory" },\n'
        + '}));\n'
        + '\n'
        + 'app.use("/api/payments", authenticate, createProxyMiddleware({\n'
        + '  target: "http://payment-service:3003",\n'
        + '  changeOrigin: true,\n'
        + '}));\n'
        + '\n'
        + 'app.listen(8080, () => console.log("API Gateway on :8080"));'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '服务发现' : 'Service Discovery'}
      </h3>
      <p style={pStyle}>
        {isZh
          ? '服务发现允许微服务在运行时动态定位其他服务，无需硬编码地址。客户端发现（服务自己查询注册中心）和服务端发现（负载均衡器查询注册中心）是两种主要模式。'
          : 'Service discovery enables microservices to dynamically locate other services at runtime without hardcoded addresses. Client-side discovery (the service queries the registry itself) and server-side discovery (the load balancer queries the registry) are the two primary patterns.'}
      </p>
      <pre style={preStyle}><code>{'# docker-compose.yml with Consul for service discovery\n'
        + 'version: "3.8"\n'
        + '\n'
        + 'services:\n'
        + '  consul:\n'
        + '    image: hashicorp/consul:1.17\n'
        + '    ports:\n'
        + '      - "8500:8500"\n'
        + '    command: agent -server -bootstrap-expect=1 -ui -client=0.0.0.0\n'
        + '\n'
        + '  order-service:\n'
        + '    build: ./order-service\n'
        + '    environment:\n'
        + '      CONSUL_HOST: consul\n'
        + '      SERVICE_NAME: order-service\n'
        + '      SERVICE_PORT: 3001\n'
        + '    depends_on:\n'
        + '      - consul\n'
        + '\n'
        + '  inventory-service:\n'
        + '    build: ./inventory-service\n'
        + '    environment:\n'
        + '      CONSUL_HOST: consul\n'
        + '      SERVICE_NAME: inventory-service\n'
        + '      SERVICE_PORT: 3002\n'
        + '    depends_on:\n'
        + '      - consul'}</code></pre>

      {/* ── Section 4: Saga Pattern ── */}
      <h2 style={h2Style}>
        {isZh ? '4. Saga 模式：分布式事务管理' : '4. Saga Pattern: Distributed Transaction Management'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Saga 模式将分布式事务分解为一系列本地事务，每个本地事务都有对应的补偿操作。当某个步骤失败时，已完成的步骤会被逆序补偿，实现最终一致性。'
          : 'The Saga pattern decomposes a distributed transaction into a sequence of local transactions, each with a corresponding compensating action. When a step fails, completed steps are compensated in reverse order, achieving eventual consistency.'}
      </p>

      <h3 style={h3Style}>
        {isZh ? '编排式 Saga（集中控制器）' : 'Orchestration Saga (Central Coordinator)'}
      </h3>
      <p style={pStyle}>
        {isZh
          ? '编排式 Saga 使用一个中心协调器（Saga Orchestrator）来管理整个事务流程。协调器知道所有步骤的执行顺序，并在失败时触发补偿操作。'
          : 'The orchestration saga uses a central coordinator (Saga Orchestrator) to manage the entire transaction flow. The coordinator knows the execution order of all steps and triggers compensating actions on failure.'}
      </p>
      <pre style={preStyle}><code>{'// Saga Orchestrator for Order Processing\n'
        + 'interface SagaStep {\n'
        + '  name: string;\n'
        + '  execute: (context: SagaContext) => Promise<void>;\n'
        + '  compensate: (context: SagaContext) => Promise<void>;\n'
        + '}\n'
        + '\n'
        + 'interface SagaContext {\n'
        + '  orderId: string;\n'
        + '  customerId: string;\n'
        + '  items: Array<{ sku: string; qty: number }>;\n'
        + '  paymentId?: string;\n'
        + '  shipmentId?: string;\n'
        + '}\n'
        + '\n'
        + 'class SagaOrchestrator {\n'
        + '  private steps: SagaStep[] = [];\n'
        + '  private completedSteps: SagaStep[] = [];\n'
        + '\n'
        + '  addStep(step: SagaStep) {\n'
        + '    this.steps.push(step);\n'
        + '    return this;\n'
        + '  }\n'
        + '\n'
        + '  async execute(context: SagaContext): Promise<void> {\n'
        + '    for (const step of this.steps) {\n'
        + '      try {\n'
        + '        console.log("Executing: " + step.name);\n'
        + '        await step.execute(context);\n'
        + '        this.completedSteps.push(step);\n'
        + '      } catch (error) {\n'
        + '        console.error("Failed at: " + step.name + ", compensating...");\n'
        + '        await this.compensate(context);\n'
        + '        throw error;\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '\n'
        + '  private async compensate(context: SagaContext): Promise<void> {\n'
        + '    for (const step of this.completedSteps.reverse()) {\n'
        + '      try {\n'
        + '        console.log("Compensating: " + step.name);\n'
        + '        await step.compensate(context);\n'
        + '      } catch (err) {\n'
        + '        console.error("Compensation failed for: " + step.name);\n'
        + '        // Log for manual intervention\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Usage\n'
        + 'const orderSaga = new SagaOrchestrator()\n'
        + '  .addStep({\n'
        + '    name: "ReserveInventory",\n'
        + '    execute: async (ctx) => { /* call inventory-service */ },\n'
        + '    compensate: async (ctx) => { /* release reserved stock */ },\n'
        + '  })\n'
        + '  .addStep({\n'
        + '    name: "ProcessPayment",\n'
        + '    execute: async (ctx) => { /* call payment-service */ },\n'
        + '    compensate: async (ctx) => { /* refund payment */ },\n'
        + '  })\n'
        + '  .addStep({\n'
        + '    name: "CreateShipment",\n'
        + '    execute: async (ctx) => { /* call shipping-service */ },\n'
        + '    compensate: async (ctx) => { /* cancel shipment */ },\n'
        + '  });'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '协调式 Saga（事件驱动）' : 'Choreography Saga (Event-Driven)'}
      </h3>
      <p style={pStyle}>
        {isZh
          ? '协调式 Saga 没有中央控制器。每个服务监听事件并发布新事件，形成事件链。服务之间完全解耦，但事务流程更难追踪和调试。'
          : 'The choreography saga has no central coordinator. Each service listens for events and publishes new ones, forming an event chain. Services are fully decoupled, but the transaction flow is harder to trace and debug.'}
      </p>
      <div style={tipStyle}>
        <strong>{isZh ? '编排 vs 协调选择指南：' : 'Orchestration vs Choreography Decision Guide: '}</strong>
        {isZh
          ? '步骤少于 4 个且服务高度独立时用协调式；步骤复杂、需要全局可见性或涉及条件分支时用编排式。'
          : 'Use choreography when fewer than 4 steps and services are highly independent; use orchestration when the flow is complex, needs global visibility, or involves conditional branching.'}
      </div>

      {/* ── Section 5: CQRS ── */}
      <h2 style={h2Style}>
        {isZh ? '5. CQRS — 命令查询职责分离' : '5. CQRS — Command Query Responsibility Segregation'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'CQRS 将应用的读（Query）和写（Command）模型分离为不同的数据模型甚至不同的数据库。写模型针对一致性和业务规则优化，读模型针对查询性能优化。'
          : 'CQRS separates the read (Query) and write (Command) models into different data models or even different databases. The write model is optimized for consistency and business rules; the read model is optimized for query performance.'}
      </p>
      <pre style={preStyle}><code>{'// CQRS implementation with separate read/write models\n'
        + '\n'
        + '// ── Command Side (Write Model) ──\n'
        + 'interface CreateOrderCommand {\n'
        + '  type: "CreateOrder";\n'
        + '  customerId: string;\n'
        + '  items: Array<{ sku: string; quantity: number; price: number }>;\n'
        + '}\n'
        + '\n'
        + 'class OrderCommandHandler {\n'
        + '  constructor(\n'
        + '    private writeRepo: OrderWriteRepository,\n'
        + '    private eventBus: EventBus\n'
        + '  ) {}\n'
        + '\n'
        + '  async handle(cmd: CreateOrderCommand): Promise<string> {\n'
        + '    // Business validation\n'
        + '    if (cmd.items.length === 0) throw new Error("Order must have items");\n'
        + '\n'
        + '    const order = {\n'
        + '      id: crypto.randomUUID(),\n'
        + '      customerId: cmd.customerId,\n'
        + '      items: cmd.items,\n'
        + '      status: "pending" as const,\n'
        + '      total: cmd.items.reduce((s, i) => s + i.price * i.quantity, 0),\n'
        + '      createdAt: new Date(),\n'
        + '    };\n'
        + '\n'
        + '    await this.writeRepo.save(order);\n'
        + '\n'
        + '    // Publish event to sync read model\n'
        + '    await this.eventBus.publish({\n'
        + '      type: "OrderCreated",\n'
        + '      payload: order,\n'
        + '      timestamp: new Date().toISOString(),\n'
        + '    });\n'
        + '\n'
        + '    return order.id;\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// ── Query Side (Read Model) ──\n'
        + 'interface OrderReadModel {\n'
        + '  orderId: string;\n'
        + '  customerName: string;      // denormalized\n'
        + '  itemCount: number;         // precomputed\n'
        + '  totalFormatted: string;    // preformatted\n'
        + '  status: string;\n'
        + '  createdAt: string;\n'
        + '}\n'
        + '\n'
        + '// Read model projection — listens to events and updates view\n'
        + 'class OrderProjection {\n'
        + '  constructor(private readRepo: OrderReadRepository) {}\n'
        + '\n'
        + '  async onOrderCreated(event: OrderCreatedEvent) {\n'
        + '    const customer = await lookupCustomer(event.payload.customerId);\n'
        + '    await this.readRepo.upsert({\n'
        + '      orderId: event.payload.id,\n'
        + '      customerName: customer.name,\n'
        + '      itemCount: event.payload.items.length,\n'
        + '      totalFormatted: "$" + event.payload.total.toFixed(2),\n'
        + '      status: event.payload.status,\n'
        + '      createdAt: event.timestamp,\n'
        + '    });\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* ── Section 6: Event Sourcing ── */}
      <h2 style={h2Style}>
        {isZh ? '6. 事件溯源' : '6. Event Sourcing'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '事件溯源将每个状态变更存储为不可变事件，而不是只保存当前状态。当前状态通过重放事件序列来重建。这提供了完整的审计日志，支持时间旅行查询，并与 CQRS 天然配合。'
          : 'Event sourcing stores every state change as an immutable event instead of persisting only the current state. Current state is reconstructed by replaying the event sequence. This provides a complete audit trail, enables temporal queries, and pairs naturally with CQRS.'}
      </p>
      <pre style={preStyle}><code>{'// Event Sourcing for an Order aggregate\n'
        + 'type OrderEvent =\n'
        + '  | { type: "OrderCreated"; data: { id: string; customerId: string; items: any[] } }\n'
        + '  | { type: "OrderConfirmed"; data: { confirmedAt: string } }\n'
        + '  | { type: "ItemAdded"; data: { sku: string; quantity: number } }\n'
        + '  | { type: "OrderShipped"; data: { trackingNumber: string } }\n'
        + '  | { type: "OrderCancelled"; data: { reason: string } };\n'
        + '\n'
        + 'interface EventStore {\n'
        + '  append(streamId: string, events: OrderEvent[]): Promise<void>;\n'
        + '  readStream(streamId: string): Promise<OrderEvent[]>;\n'
        + '}\n'
        + '\n'
        + 'class OrderAggregate {\n'
        + '  private id = "";\n'
        + '  private status = "draft";\n'
        + '  private items: any[] = [];\n'
        + '  private changes: OrderEvent[] = [];\n'
        + '\n'
        + '  // Rebuild state from event history\n'
        + '  static fromHistory(events: OrderEvent[]): OrderAggregate {\n'
        + '    const order = new OrderAggregate();\n'
        + '    for (const event of events) {\n'
        + '      order.apply(event);\n'
        + '    }\n'
        + '    return order;\n'
        + '  }\n'
        + '\n'
        + '  private apply(event: OrderEvent) {\n'
        + '    switch (event.type) {\n'
        + '      case "OrderCreated":\n'
        + '        this.id = event.data.id;\n'
        + '        this.items = event.data.items;\n'
        + '        this.status = "pending";\n'
        + '        break;\n'
        + '      case "OrderConfirmed":\n'
        + '        this.status = "confirmed";\n'
        + '        break;\n'
        + '      case "OrderShipped":\n'
        + '        this.status = "shipped";\n'
        + '        break;\n'
        + '      case "OrderCancelled":\n'
        + '        this.status = "cancelled";\n'
        + '        break;\n'
        + '    }\n'
        + '  }\n'
        + '\n'
        + '  // Command that produces new events\n'
        + '  confirm() {\n'
        + '    if (this.status !== "pending") throw new Error("Only pending orders");\n'
        + '    const event: OrderEvent = {\n'
        + '      type: "OrderConfirmed",\n'
        + '      data: { confirmedAt: new Date().toISOString() },\n'
        + '    };\n'
        + '    this.apply(event);\n'
        + '    this.changes.push(event);\n'
        + '  }\n'
        + '\n'
        + '  getUncommittedChanges(): OrderEvent[] {\n'
        + '    return [...this.changes];\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* ── Section 7: Circuit Breaker ── */}
      <h2 style={h2Style}>
        {isZh ? '7. 熔断器模式' : '7. Circuit Breaker Pattern'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '熔断器模式防止级联故障。当下游服务调用失败率超过阈值时，熔断器打开，直接返回错误而不发起请求，保护上游服务的资源。经过超时后进入半开状态，允许少量探测请求通过。'
          : 'The circuit breaker pattern prevents cascading failures. When the failure rate of downstream calls exceeds a threshold, the breaker opens and returns errors immediately without making requests, protecting upstream resources. After a timeout, it enters half-open state and allows a few probe requests through.'}
      </p>
      <pre style={preStyle}><code>{'// Circuit Breaker implementation in TypeScript\n'
        + 'type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";\n'
        + '\n'
        + 'class CircuitBreaker {\n'
        + '  private state: CircuitState = "CLOSED";\n'
        + '  private failureCount = 0;\n'
        + '  private successCount = 0;\n'
        + '  private lastFailureTime = 0;\n'
        + '\n'
        + '  constructor(\n'
        + '    private failureThreshold: number = 5,\n'
        + '    private resetTimeoutMs: number = 30000,\n'
        + '    private halfOpenMaxCalls: number = 3\n'
        + '  ) {}\n'
        + '\n'
        + '  async call<T>(fn: () => Promise<T>): Promise<T> {\n'
        + '    if (this.state === "OPEN") {\n'
        + '      if (Date.now() - this.lastFailureTime > this.resetTimeoutMs) {\n'
        + '        this.state = "HALF_OPEN";\n'
        + '        this.successCount = 0;\n'
        + '      } else {\n'
        + '        throw new Error("Circuit is OPEN — request rejected");\n'
        + '      }\n'
        + '    }\n'
        + '\n'
        + '    try {\n'
        + '      const result = await fn();\n'
        + '      this.onSuccess();\n'
        + '      return result;\n'
        + '    } catch (error) {\n'
        + '      this.onFailure();\n'
        + '      throw error;\n'
        + '    }\n'
        + '  }\n'
        + '\n'
        + '  private onSuccess() {\n'
        + '    if (this.state === "HALF_OPEN") {\n'
        + '      this.successCount++;\n'
        + '      if (this.successCount >= this.halfOpenMaxCalls) {\n'
        + '        this.state = "CLOSED";\n'
        + '        this.failureCount = 0;\n'
        + '      }\n'
        + '    } else {\n'
        + '      this.failureCount = 0;\n'
        + '    }\n'
        + '  }\n'
        + '\n'
        + '  private onFailure() {\n'
        + '    this.failureCount++;\n'
        + '    this.lastFailureTime = Date.now();\n'
        + '    if (this.failureCount >= this.failureThreshold) {\n'
        + '      this.state = "OPEN";\n'
        + '    }\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Usage\n'
        + 'const breaker = new CircuitBreaker(5, 30000, 3);\n'
        + '\n'
        + 'async function getOrderFromService(orderId: string) {\n'
        + '  return breaker.call(async () => {\n'
        + '    const res = await fetch(\n'
        + '      "http://order-service:3001/orders/" + orderId\n'
        + '    );\n'
        + '    if (!res.ok) throw new Error("Service error: " + res.status);\n'
        + '    return res.json();\n'
        + '  });\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'Resilience4j 配置示例（Java/Spring Boot）' : 'Resilience4j Configuration (Java/Spring Boot)'}
      </h3>
      <pre style={preStyle}><code>{'# application.yml — Resilience4j circuit breaker config\n'
        + 'resilience4j:\n'
        + '  circuitbreaker:\n'
        + '    instances:\n'
        + '      orderService:\n'
        + '        registerHealthIndicator: true\n'
        + '        slidingWindowType: COUNT_BASED\n'
        + '        slidingWindowSize: 10\n'
        + '        failureRateThreshold: 50\n'
        + '        waitDurationInOpenState: 30s\n'
        + '        permittedNumberOfCallsInHalfOpenState: 3\n'
        + '        automaticTransitionFromOpenToHalfOpenEnabled: true\n'
        + '        recordExceptions:\n'
        + '          - java.io.IOException\n'
        + '          - java.util.concurrent.TimeoutException\n'
        + '  retry:\n'
        + '    instances:\n'
        + '      orderService:\n'
        + '        maxAttempts: 3\n'
        + '        waitDuration: 1s\n'
        + '        enableExponentialBackoff: true\n'
        + '        exponentialBackoffMultiplier: 2\n'
        + '  bulkhead:\n'
        + '    instances:\n'
        + '      orderService:\n'
        + '        maxConcurrentCalls: 25\n'
        + '        maxWaitDuration: 500ms'}</code></pre>

      {/* ── Section 8: Bulkhead Pattern ── */}
      <h2 style={h2Style}>
        {isZh ? '8. 隔舱模式' : '8. Bulkhead Pattern'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '隔舱模式借鉴了船舶设计中的水密隔舱概念。通过隔离资源池（线程池、连接池、内存），确保一个下游服务的故障不会耗尽整个系统的资源，限制故障的影响范围。'
          : 'The bulkhead pattern borrows from the watertight compartment concept in ship design. By isolating resource pools (thread pools, connection pools, memory), it ensures that a failure in one downstream service does not exhaust the entire system, limiting the blast radius of failures.'}
      </p>
      <pre style={preStyle}><code>{'// Bulkhead pattern — isolated resource pools per service\n'
        + 'class Bulkhead {\n'
        + '  private activeCount = 0;\n'
        + '  private queue: Array<{ resolve: Function; reject: Function }> = [];\n'
        + '\n'
        + '  constructor(\n'
        + '    private maxConcurrent: number,\n'
        + '    private maxQueueSize: number,\n'
        + '    private timeoutMs: number\n'
        + '  ) {}\n'
        + '\n'
        + '  async execute<T>(fn: () => Promise<T>): Promise<T> {\n'
        + '    if (this.activeCount >= this.maxConcurrent) {\n'
        + '      if (this.queue.length >= this.maxQueueSize) {\n'
        + '        throw new Error("Bulkhead full — request rejected");\n'
        + '      }\n'
        + '      await new Promise<void>((resolve, reject) => {\n'
        + '        const timer = setTimeout(\n'
        + '          () => reject(new Error("Bulkhead queue timeout")),\n'
        + '          this.timeoutMs\n'
        + '        );\n'
        + '        this.queue.push({\n'
        + '          resolve: () => { clearTimeout(timer); resolve(); },\n'
        + '          reject,\n'
        + '        });\n'
        + '      });\n'
        + '    }\n'
        + '\n'
        + '    this.activeCount++;\n'
        + '    try {\n'
        + '      return await fn();\n'
        + '    } finally {\n'
        + '      this.activeCount--;\n'
        + '      if (this.queue.length > 0) {\n'
        + '        const next = this.queue.shift()!;\n'
        + '        next.resolve();\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Separate bulkheads per downstream dependency\n'
        + 'const orderBulkhead = new Bulkhead(10, 20, 5000);\n'
        + 'const paymentBulkhead = new Bulkhead(5, 10, 3000);\n'
        + 'const inventoryBulkhead = new Bulkhead(15, 30, 5000);'}</code></pre>

      {/* ── Section 9: Retry with Exponential Backoff ── */}
      <h2 style={h2Style}>
        {isZh ? '9. 指数退避重试' : '9. Retry with Exponential Backoff'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '瞬时故障（网络抖动、暂时过载）可以通过重试解决，但固定间隔重试可能造成雷鸣群效应。指数退避加抖动可以有效分散重试请求，避免同时向下游服务发起大量重试。'
          : 'Transient failures (network jitter, temporary overload) can be resolved with retries, but fixed-interval retries risk thundering herd effects. Exponential backoff with jitter effectively distributes retry attempts, preventing simultaneous bursts of retries to downstream services.'}
      </p>
      <pre style={preStyle}><code>{'// Retry with exponential backoff + jitter\n'
        + 'interface RetryConfig {\n'
        + '  maxAttempts: number;\n'
        + '  baseDelayMs: number;\n'
        + '  maxDelayMs: number;\n'
        + '  jitter: boolean;\n'
        + '}\n'
        + '\n'
        + 'async function retryWithBackoff<T>(\n'
        + '  fn: () => Promise<T>,\n'
        + '  config: RetryConfig\n'
        + '): Promise<T> {\n'
        + '  let lastError: Error | undefined;\n'
        + '\n'
        + '  for (let attempt = 0; attempt < config.maxAttempts; attempt++) {\n'
        + '    try {\n'
        + '      return await fn();\n'
        + '    } catch (error) {\n'
        + '      lastError = error as Error;\n'
        + '\n'
        + '      if (attempt === config.maxAttempts - 1) break;\n'
        + '\n'
        + '      // Calculate delay: base * 2^attempt\n'
        + '      let delay = Math.min(\n'
        + '        config.baseDelayMs * Math.pow(2, attempt),\n'
        + '        config.maxDelayMs\n'
        + '      );\n'
        + '\n'
        + '      // Add jitter: random value between 0 and delay\n'
        + '      if (config.jitter) {\n'
        + '        delay = Math.random() * delay;\n'
        + '      }\n'
        + '\n'
        + '      console.log(\n'
        + '        "Attempt " + (attempt + 1) + " failed. " +\n'
        + '        "Retrying in " + Math.round(delay) + "ms..."\n'
        + '      );\n'
        + '      await new Promise(r => setTimeout(r, delay));\n'
        + '    }\n'
        + '  }\n'
        + '\n'
        + '  throw lastError;\n'
        + '}\n'
        + '\n'
        + '// Usage\n'
        + 'const result = await retryWithBackoff(\n'
        + '  () => fetch("http://payment-service:3003/charge"),\n'
        + '  { maxAttempts: 4, baseDelayMs: 500, maxDelayMs: 8000, jitter: true }\n'
        + ');'}</code></pre>

      {/* ── Section 10: Distributed Tracing ── */}
      <h2 style={h2Style}>
        {isZh ? '10. 分布式追踪与 OpenTelemetry' : '10. Distributed Tracing with OpenTelemetry'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'OpenTelemetry 是 CNCF 的可观测性标准。它通过在服务间传播 trace context（trace ID + span ID），为每个请求提供端到端的链路追踪、延迟分析和错误定位。'
          : 'OpenTelemetry is the CNCF observability standard. By propagating trace context (trace ID + span ID) across service boundaries, it provides end-to-end request tracing, latency analysis, and error localization for every request.'}
      </p>
      <pre style={preStyle}><code>{'// OpenTelemetry setup for a Node.js microservice\n'
        + 'import { NodeSDK } from "@opentelemetry/sdk-node";\n'
        + 'import { getNodeAutoInstrumentations } from\n'
        + '  "@opentelemetry/auto-instrumentations-node";\n'
        + 'import { OTLPTraceExporter } from\n'
        + '  "@opentelemetry/exporter-trace-otlp-http";\n'
        + 'import { Resource } from "@opentelemetry/resources";\n'
        + 'import {\n'
        + '  SEMRESATTRS_SERVICE_NAME,\n'
        + '  SEMRESATTRS_SERVICE_VERSION,\n'
        + '} from "@opentelemetry/semantic-conventions";\n'
        + '\n'
        + 'const sdk = new NodeSDK({\n'
        + '  resource: new Resource({\n'
        + '    [SEMRESATTRS_SERVICE_NAME]: "order-service",\n'
        + '    [SEMRESATTRS_SERVICE_VERSION]: "1.2.0",\n'
        + '  }),\n'
        + '  traceExporter: new OTLPTraceExporter({\n'
        + '    url: "http://jaeger:4318/v1/traces",\n'
        + '  }),\n'
        + '  instrumentations: [getNodeAutoInstrumentations()],\n'
        + '});\n'
        + '\n'
        + 'sdk.start();\n'
        + 'console.log("OpenTelemetry tracing initialized");\n'
        + '\n'
        + '// Custom span for business logic\n'
        + 'import { trace, SpanStatusCode } from "@opentelemetry/api";\n'
        + '\n'
        + 'const tracer = trace.getTracer("order-service");\n'
        + '\n'
        + 'async function processOrder(orderId: string) {\n'
        + '  return tracer.startActiveSpan(\n'
        + '    "processOrder",\n'
        + '    async (span) => {\n'
        + '      try {\n'
        + '        span.setAttribute("order.id", orderId);\n'
        + '        const order = await fetchOrder(orderId);\n'
        + '        span.setAttribute("order.total", order.total);\n'
        + '        span.setAttribute("order.items_count", order.items.length);\n'
        + '\n'
        + '        await validateOrder(order);\n'
        + '        await chargePayment(order);\n'
        + '\n'
        + '        span.setStatus({ code: SpanStatusCode.OK });\n'
        + '        return order;\n'
        + '      } catch (error) {\n'
        + '        span.setStatus({\n'
        + '          code: SpanStatusCode.ERROR,\n'
        + '          message: (error as Error).message,\n'
        + '        });\n'
        + '        span.recordException(error as Error);\n'
        + '        throw error;\n'
        + '      } finally {\n'
        + '        span.end();\n'
        + '      }\n'
        + '    }\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* ── Section 11: Service Mesh ── */}
      <h2 style={h2Style}>
        {isZh ? '11. 服务网格（Istio / Linkerd）' : '11. Service Mesh (Istio / Linkerd)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '服务网格通过 sidecar 代理透明地处理服务间通信，提供流量管理、安全（mTLS）、可观测性和弹性功能，无需修改应用代码。Istio 和 Linkerd 是两个最流行的实现。'
          : 'A service mesh transparently handles inter-service communication through sidecar proxies, providing traffic management, security (mTLS), observability, and resilience capabilities without modifying application code. Istio and Linkerd are the two most popular implementations.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>Istio</th>
            <th style={thStyle}>Linkerd</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '代理' : 'Proxy'}</td><td style={tdStyle}>Envoy</td><td style={tdStyle}>linkerd2-proxy (Rust)</td></tr>
          <tr><td style={tdStyle}>{isZh ? '复杂度' : 'Complexity'}</td><td style={tdStyle}>{isZh ? '高（功能丰富）' : 'High (feature-rich)'}</td><td style={tdStyle}>{isZh ? '低（轻量简洁）' : 'Low (lightweight, simple)'}</td></tr>
          <tr><td style={tdStyle}>mTLS</td><td style={tdStyle}>{isZh ? '内置，自动' : 'Built-in, automatic'}</td><td style={tdStyle}>{isZh ? '内置，默认开启' : 'Built-in, on by default'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '流量管理' : 'Traffic Mgmt'}</td><td style={tdStyle}>{isZh ? '高级（金丝雀、故障注入、镜像）' : 'Advanced (canary, fault injection, mirroring)'}</td><td style={tdStyle}>{isZh ? '基础（流量分割）' : 'Basic (traffic split)'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '资源开销' : 'Resource Overhead'}</td><td style={tdStyle}>{isZh ? '较高' : 'Higher'}</td><td style={tdStyle}>{isZh ? '较低' : 'Lower'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '最佳场景' : 'Best For'}</td><td style={tdStyle}>{isZh ? '大规模企业级部署' : 'Large-scale enterprise deployments'}</td><td style={tdStyle}>{isZh ? '中小规模、快速上手' : 'Small-medium scale, quick start'}</td></tr>
        </tbody>
      </table>
      <pre style={preStyle}><code>{'# Istio VirtualService for canary deployment\n'
        + 'apiVersion: networking.istio.io/v1beta1\n'
        + 'kind: VirtualService\n'
        + 'metadata:\n'
        + '  name: order-service\n'
        + 'spec:\n'
        + '  hosts:\n'
        + '    - order-service\n'
        + '  http:\n'
        + '    - route:\n'
        + '        - destination:\n'
        + '            host: order-service\n'
        + '            subset: stable\n'
        + '          weight: 90\n'
        + '        - destination:\n'
        + '            host: order-service\n'
        + '            subset: canary\n'
        + '          weight: 10\n'
        + '      retries:\n'
        + '        attempts: 3\n'
        + '        perTryTimeout: 2s\n'
        + '      timeout: 10s\n'
        + '---\n'
        + 'apiVersion: networking.istio.io/v1beta1\n'
        + 'kind: DestinationRule\n'
        + 'metadata:\n'
        + '  name: order-service\n'
        + 'spec:\n'
        + '  host: order-service\n'
        + '  trafficPolicy:\n'
        + '    connectionPool:\n'
        + '      tcp:\n'
        + '        maxConnections: 100\n'
        + '      http:\n'
        + '        h2UpgradePolicy: DEFAULT\n'
        + '        maxRequestsPerConnection: 10\n'
        + '    outlierDetection:\n'
        + '      consecutive5xxErrors: 5\n'
        + '      interval: 30s\n'
        + '      baseEjectionTime: 60s\n'
        + '  subsets:\n'
        + '    - name: stable\n'
        + '      labels:\n'
        + '        version: v1\n'
        + '    - name: canary\n'
        + '      labels:\n'
        + '        version: v2'}</code></pre>

      {/* ── Section 12: Data Management ── */}
      <h2 style={h2Style}>
        {isZh ? '12. 数据管理策略' : '12. Data Management Strategies'}
      </h2>

      <h3 style={h3Style}>
        {isZh ? '每服务独立数据库' : 'Database Per Service'}
      </h3>
      <p style={pStyle}>
        {isZh
          ? '每个微服务拥有自己的数据库实例或 schema，确保数据隔离和独立部署。服务之间通过 API 或事件进行数据交换，而非共享数据库。'
          : 'Each microservice owns its own database instance or schema, ensuring data isolation and independent deployment. Services exchange data through APIs or events, never through a shared database.'}
      </p>
      <pre style={preStyle}><code>{'# docker-compose.yml — database per service\n'
        + 'services:\n'
        + '  order-db:\n'
        + '    image: postgres:16\n'
        + '    environment:\n'
        + '      POSTGRES_DB: orders\n'
        + '      POSTGRES_USER: order_svc\n'
        + '      POSTGRES_PASSWORD_FILE: /run/secrets/order_db_pw\n'
        + '    volumes:\n'
        + '      - order-data:/var/lib/postgresql/data\n'
        + '    networks:\n'
        + '      - order-net    # isolated network\n'
        + '\n'
        + '  inventory-db:\n'
        + '    image: mongo:7\n'
        + '    environment:\n'
        + '      MONGO_INITDB_DATABASE: inventory\n'
        + '    volumes:\n'
        + '      - inventory-data:/data/db\n'
        + '    networks:\n'
        + '      - inventory-net\n'
        + '\n'
        + '  payment-db:\n'
        + '    image: postgres:16\n'
        + '    environment:\n'
        + '      POSTGRES_DB: payments\n'
        + '      POSTGRES_USER: payment_svc\n'
        + '      POSTGRES_PASSWORD_FILE: /run/secrets/payment_db_pw\n'
        + '    volumes:\n'
        + '      - payment-data:/var/lib/postgresql/data\n'
        + '    networks:\n'
        + '      - payment-net\n'
        + '\n'
        + 'volumes:\n'
        + '  order-data:\n'
        + '  inventory-data:\n'
        + '  payment-data:\n'
        + '\n'
        + 'networks:\n'
        + '  order-net:\n'
        + '  inventory-net:\n'
        + '  payment-net:'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '共享数据库反模式' : 'Shared Database Anti-Pattern'}
      </h3>
      <div style={tipStyle}>
        <strong>{isZh ? '避免共享数据库：' : 'Avoid Shared Databases: '}</strong>
        {isZh
          ? '多个服务直接访问同一数据库会导致隐式耦合、schema 变更冲突、无法独立部署和扩展。这是微服务架构中最常见的反模式之一。如果必须共享数据，使用事件驱动同步或 API 调用。'
          : 'Multiple services directly accessing the same database creates implicit coupling, schema change conflicts, and inability to deploy or scale independently. This is one of the most common anti-patterns in microservices. If data must be shared, use event-driven sync or API calls.'}
      </div>

      {/* ── Section 13: Health Checks ── */}
      <h2 style={h2Style}>
        {isZh ? '13. 健康检查与就绪探针' : '13. Health Checks and Readiness Probes'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '健康检查（liveness probe）确认服务进程是否存活；就绪探针（readiness probe）确认服务是否准备好接收流量。在 Kubernetes 中，这两个探针决定了 Pod 的生命周期管理和流量路由。'
          : 'Liveness probes confirm whether a service process is alive; readiness probes confirm whether a service is ready to receive traffic. In Kubernetes, these probes determine pod lifecycle management and traffic routing.'}
      </p>
      <pre style={preStyle}><code>{'// Health check endpoints in Express.js\n'
        + 'import express from "express";\n'
        + '\n'
        + 'const app = express();\n'
        + 'let isReady = false;\n'
        + '\n'
        + '// Liveness — is the process alive?\n'
        + 'app.get("/health/live", (req, res) => {\n'
        + '  res.status(200).json({ status: "alive" });\n'
        + '});\n'
        + '\n'
        + '// Readiness — can it accept traffic?\n'
        + 'app.get("/health/ready", async (req, res) => {\n'
        + '  if (!isReady) {\n'
        + '    return res.status(503).json({ status: "not ready" });\n'
        + '  }\n'
        + '\n'
        + '  try {\n'
        + '    // Check critical dependencies\n'
        + '    await checkDatabaseConnection();\n'
        + '    await checkCacheConnection();\n'
        + '    res.status(200).json({\n'
        + '      status: "ready",\n'
        + '      checks: { database: "ok", cache: "ok" },\n'
        + '    });\n'
        + '  } catch (error) {\n'
        + '    res.status(503).json({\n'
        + '      status: "not ready",\n'
        + '      error: (error as Error).message,\n'
        + '    });\n'
        + '  }\n'
        + '});\n'
        + '\n'
        + '// Startup sequence\n'
        + 'async function bootstrap() {\n'
        + '  await connectToDatabase();\n'
        + '  await connectToCache();\n'
        + '  await warmUpCaches();\n'
        + '  isReady = true;\n'
        + '  console.log("Service is ready to accept traffic");\n'
        + '}\n'
        + '\n'
        + 'bootstrap();\n'
        + 'app.listen(3001);'}</code></pre>

      <pre style={preStyle}><code>{'# Kubernetes deployment with health probes\n'
        + 'apiVersion: apps/v1\n'
        + 'kind: Deployment\n'
        + 'metadata:\n'
        + '  name: order-service\n'
        + 'spec:\n'
        + '  replicas: 3\n'
        + '  selector:\n'
        + '    matchLabels:\n'
        + '      app: order-service\n'
        + '  template:\n'
        + '    metadata:\n'
        + '      labels:\n'
        + '        app: order-service\n'
        + '    spec:\n'
        + '      containers:\n'
        + '        - name: order-service\n'
        + '          image: order-service:1.2.0\n'
        + '          ports:\n'
        + '            - containerPort: 3001\n'
        + '          livenessProbe:\n'
        + '            httpGet:\n'
        + '              path: /health/live\n'
        + '              port: 3001\n'
        + '            initialDelaySeconds: 10\n'
        + '            periodSeconds: 15\n'
        + '            failureThreshold: 3\n'
        + '          readinessProbe:\n'
        + '            httpGet:\n'
        + '              path: /health/ready\n'
        + '              port: 3001\n'
        + '            initialDelaySeconds: 5\n'
        + '            periodSeconds: 10\n'
        + '            failureThreshold: 3\n'
        + '          startupProbe:\n'
        + '            httpGet:\n'
        + '              path: /health/live\n'
        + '              port: 3001\n'
        + '            initialDelaySeconds: 0\n'
        + '            periodSeconds: 5\n'
        + '            failureThreshold: 30\n'
        + '          resources:\n'
        + '            requests:\n'
        + '              cpu: 250m\n'
        + '              memory: 256Mi\n'
        + '            limits:\n'
        + '              cpu: 500m\n'
        + '              memory: 512Mi'}</code></pre>

      {/* ── Section 14: Pattern Decision Matrix ── */}
      <h2 style={h2Style}>
        {isZh ? '14. 模式决策矩阵' : '14. Pattern Decision Matrix'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '下表帮助你根据具体场景选择合适的微服务模式。'
          : 'The table below helps you select the right microservices pattern based on your specific scenario.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
            <th style={thStyle}>{isZh ? '推荐模式' : 'Recommended Pattern'}</th>
            <th style={thStyle}>{isZh ? '关键考量' : 'Key Consideration'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '从单体迁移' : 'Migrating from monolith'}</td><td style={tdStyle}>Strangler Fig</td><td style={tdStyle}>{isZh ? '渐进式，低风险' : 'Incremental, low risk'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '跨服务事务' : 'Cross-service transactions'}</td><td style={tdStyle}>Saga (Orchestration)</td><td style={tdStyle}>{isZh ? '需要补偿逻辑' : 'Requires compensation logic'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '高频读低频写' : 'High read, low write'}</td><td style={tdStyle}>CQRS</td><td style={tdStyle}>{isZh ? '读写模型独立扩展' : 'Scale read/write models independently'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '完整审计日志' : 'Complete audit trail'}</td><td style={tdStyle}>Event Sourcing</td><td style={tdStyle}>{isZh ? '事件存储增长需管理' : 'Event store growth needs management'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '防止级联故障' : 'Prevent cascading failures'}</td><td style={tdStyle}>Circuit Breaker + Bulkhead</td><td style={tdStyle}>{isZh ? '配合重试和降级' : 'Combine with retry and fallback'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '请求链路追踪' : 'Request chain tracing'}</td><td style={tdStyle}>OpenTelemetry</td><td style={tdStyle}>{isZh ? '所有服务必须集成' : 'All services must integrate'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '零信任安全' : 'Zero-trust security'}</td><td style={tdStyle}>Service Mesh (Istio)</td><td style={tdStyle}>{isZh ? '自动 mTLS，运维开销较大' : 'Auto mTLS, higher ops overhead'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '事件驱动解耦' : 'Event-driven decoupling'}</td><td style={tdStyle}>Async Messaging (Kafka)</td><td style={tdStyle}>{isZh ? '接受最终一致性' : 'Accept eventual consistency'}</td></tr>
        </tbody>
      </table>

      {/* ── Conclusion ── */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '微服务架构不是目标，而是实现业务敏捷性和可扩展性的手段。成功的关键在于：理解每个模式的适用场景和代价，以 DDD 限界上下文驱动服务分解，用 Saga 管理分布式事务，用 CQRS/事件溯源解决复杂查询和审计需求，用熔断器和隔舱保障弹性，用 OpenTelemetry 实现可观测性。从小处着手，按需引入模式，避免过度设计。'
          : 'Microservices architecture is not a goal but a means to achieve business agility and scalability. Success hinges on understanding the applicability and cost of each pattern, driving service decomposition with DDD bounded contexts, managing distributed transactions with Saga, addressing complex query and audit needs with CQRS/event sourcing, ensuring resilience with circuit breakers and bulkheads, and achieving observability with OpenTelemetry. Start small, introduce patterns as needed, and avoid over-engineering.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '记住：分布式系统的复杂性是真实的代价。如果一个模块化的单体能满足需求，那就是最好的选择。只有当团队规模、部署频率和业务域复杂度真正需要时，才逐步拆分为微服务。'
          : 'Remember: the complexity of distributed systems is a real cost. If a well-structured modular monolith meets your needs, that is the best choice. Only decompose into microservices gradually when team size, deployment frequency, and business domain complexity truly demand it.'}
      </p>
    </div>
  );
}
