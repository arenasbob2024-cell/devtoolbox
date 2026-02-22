'use client';

import Link from 'next/link';

export default function MicroservicesPatterns({ lang }: { lang: string }) {
  return (
    <>
      <h2>Microservices Architecture Patterns</h2>
      <p>
        <strong>Microservices architecture</strong> decomposes an application into small, independently
        deployable services that communicate via well-defined APIs. While it offers powerful benefits
        like independent scaling, technology diversity, and team autonomy, it also introduces
        significant complexity. This guide covers the essential architectural patterns that make
        microservices work in production — from service communication to data management, resilience,
        and observability.
      </p>
      <p>
        Before adopting microservices, understand the trade-offs against a monolith in our{' '}
        <Link href={`/${lang}/blog/microservices-vs-monolith`}>Microservices vs Monolith</Link> guide.
      </p>

      <h2>1. API Gateway Pattern</h2>
      <p>
        The <strong>API Gateway</strong> is the single entry point for all client requests. It handles
        cross-cutting concerns so individual services don't have to:
      </p>
      <pre><code className="language-text">{`Client Requests
       │
       ▼
┌─────────────────────────────────────────────┐
│              API Gateway                     │
│  ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
│  │   Auth   │ │Rate Limit│ │ Load Balance│ │
│  └──────────┘ └──────────┘ └─────────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
│  │  Routing │ │ Caching  │ │   Logging   │ │
│  └──────────┘ └──────────┘ └─────────────┘ │
└────────┬──────────┬──────────┬──────────────┘
         │          │          │
         ▼          ▼          ▼
    User Service  Order Svc  Product Svc`}</code></pre>
      <pre><code className="language-typescript">{`// API Gateway implementation with Express (simplified)
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                    // 100 requests per window
});
app.use(limiter);

// JWT Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Route to services
app.use('/users', authenticate, createProxyMiddleware({
  target: 'http://user-service:3001',
  changeOrigin: true,
  pathRewrite: { '^/users': '/' },
}));

app.use('/orders', authenticate, createProxyMiddleware({
  target: 'http://order-service:3002',
  changeOrigin: true,
  pathRewrite: { '^/orders': '/' },
}));

// Public routes (no auth)
app.use('/products', createProxyMiddleware({
  target: 'http://product-service:3003',
  changeOrigin: true,
  pathRewrite: { '^/products': '/' },
}));`}</code></pre>

      <h2>2. Backend for Frontend (BFF) Pattern</h2>
      <p>
        Instead of one generic API Gateway, the BFF pattern creates separate gateways tailored to
        each client type:
      </p>
      <pre><code className="language-text">{`Mobile App       Web App          IoT Device
    │                │                 │
    ▼                ▼                 ▼
Mobile BFF      Web BFF           IoT BFF
(minimal data)  (rich data)       (tiny payloads)
    │                │                 │
    └────────────────┼─────────────────┘
                     │
        ┌────────────┼──────────────┐
        ▼            ▼              ▼
   User Svc     Order Svc      Product Svc`}</code></pre>
      <pre><code className="language-typescript">{`// Mobile BFF: aggregates data, returns minimal payload
app.get('/home', async (req, res) => {
  const [user, orders, recommendations] = await Promise.all([
    fetch('http://user-service/users/' + req.user.id).then(r => r.json()),
    fetch('http://order-service/orders?userId=' + req.user.id + '&limit=3').then(r => r.json()),
    fetch('http://recommendation-service/recs?userId=' + req.user.id).then(r => r.json()),
  ]);

  // Return only what mobile needs — small payload
  res.json({
    greeting: \`Hi \${user.firstName}!\`,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    topRec: recommendations[0]?.productId,
  });
});`}</code></pre>

      <h2>3. Service Discovery</h2>
      <p>
        In dynamic microservices environments, services spin up and down, changing their network
        locations. Service discovery solves this:
      </p>
      <pre><code className="language-text">{`Client-Side Discovery:
  Service A queries registry → gets Service B address → connects directly

Server-Side Discovery (via Load Balancer):
  Service A → Load Balancer → queries registry → routes to Service B

Registry Options:
  - Consul (HashiCorp) — most feature-rich
  - Eureka (Netflix) — Java/Spring ecosystem
  - etcd (CNCF) — Kubernetes native
  - Kubernetes DNS — automatic for K8s
  - AWS Cloud Map — for AWS deployments`}</code></pre>
      <pre><code className="language-typescript">{`// Service registration with Consul
import Consul from 'consul';

const consul = new Consul({ host: 'consul', port: 8500 });

// Register this service on startup
await consul.agent.service.register({
  name: 'order-service',
  id: 'order-service-' + process.env.HOSTNAME,
  address: process.env.HOST_IP,
  port: 3002,
  tags: ['api', 'v2'],
  check: {
    http: \`http://\${process.env.HOST_IP}:3002/health\`,
    interval: '10s',
    timeout: '5s',
    deregistercriticalserviceafter: '1m',
  },
});

// Discover another service
const services = await consul.health.service({
  service: 'user-service',
  passing: true,            // Only healthy instances
});

const { Address, Port } = services[0].Service;
const userServiceUrl = \`http://\${Address}:\${Port}\`;`}</code></pre>

      <h2>4. Circuit Breaker Pattern</h2>
      <p>
        When a downstream service fails or becomes slow, the Circuit Breaker prevents cascading
        failures by short-circuiting calls and returning fallback responses:
      </p>
      <pre><code className="language-text">{`Circuit Breaker States:
  CLOSED → Normal operation, requests pass through
    ↓ (failure threshold exceeded)
  OPEN   → Requests fail immediately (no network call)
    ↓ (timeout period expires)
  HALF-OPEN → Test request allowed through
    ↓ (success)                ↓ (failure)
  CLOSED (reset)             OPEN (stay open)`}</code></pre>
      <pre><code className="language-typescript">{`// Circuit Breaker implementation
class CircuitBreaker {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime?: number;

  constructor(
    private readonly failureThreshold = 5,
    private readonly timeout = 60000,   // 60 seconds
    private readonly successThreshold = 2
  ) {}

  async call<T>(fn: () => Promise<T>, fallback?: () => T): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime! > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        if (fallback) return fallback();
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      if (fallback) return fallback();
      throw error;
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}

// Usage
const userServiceCB = new CircuitBreaker(5, 30000);

async function getUser(userId: string) {
  return userServiceCB.call(
    () => fetch(\`http://user-service/users/\${userId}\`).then(r => r.json()),
    () => ({ id: userId, name: 'Guest', email: null }), // Fallback
  );
}`}</code></pre>

      <h2>5. Event-Driven Architecture</h2>
      <p>
        Services can communicate asynchronously via events, reducing direct coupling and improving
        resilience:
      </p>
      <pre><code className="language-typescript">{`// Event producer (Order Service)
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ brokers: ['kafka:9092'] });
const producer = kafka.producer();

async function createOrder(orderData: OrderData) {
  // Save to DB
  const order = await db.orders.create(orderData);

  // Publish event
  await producer.send({
    topic: 'order.created',
    messages: [{
      key: order.id,
      value: JSON.stringify({
        eventType: 'ORDER_CREATED',
        timestamp: new Date().toISOString(),
        data: {
          orderId: order.id,
          userId: order.userId,
          items: order.items,
          total: order.total,
        },
      }),
    }],
  });

  return order;
}

// Event consumers react independently
// Inventory Service subscribes to order.created
const consumer = kafka.consumer({ groupId: 'inventory-service' });
await consumer.subscribe({ topic: 'order.created', fromBeginning: false });

await consumer.run({
  eachMessage: async ({ message }) => {
    const event = JSON.parse(message.value!.toString());
    if (event.eventType === 'ORDER_CREATED') {
      await reserveInventory(event.data.items);
    }
  },
});

// Notification Service also subscribes
// Email Service also subscribes
// Each service acts independently on the same event`}</code></pre>

      <h2>6. Saga Pattern for Distributed Transactions</h2>
      <p>
        Distributed systems can't use traditional ACID transactions across services. The Saga pattern
        manages multi-step workflows with compensating transactions for rollback:
      </p>
      <pre><code className="language-typescript">{`// Choreography-based Saga (event-driven)
// Each service does its part and emits events

// 1. Order Service creates order
emit('ORDER_CREATED', { orderId, items, userId });

// 2. Inventory Service receives ORDER_CREATED
onEvent('ORDER_CREATED', async ({ orderId, items }) => {
  try {
    await reserveInventory(items);
    emit('INVENTORY_RESERVED', { orderId });
  } catch {
    emit('INVENTORY_RESERVATION_FAILED', { orderId }); // Triggers rollback
  }
});

// 3. Payment Service receives INVENTORY_RESERVED
onEvent('INVENTORY_RESERVED', async ({ orderId }) => {
  try {
    await chargeCustomer(orderId);
    emit('PAYMENT_PROCESSED', { orderId });
  } catch {
    emit('PAYMENT_FAILED', { orderId }); // Triggers rollback
  }
});

// Compensating transactions for rollback
onEvent('PAYMENT_FAILED', async ({ orderId }) => {
  await releaseInventory(orderId);     // Undo inventory reservation
  await cancelOrder(orderId);           // Undo order creation
});

// Orchestration-based Saga (central coordinator)
class OrderSaga {
  async execute(orderData: OrderData) {
    const order = await this.orderService.create(orderData);
    try {
      await this.inventoryService.reserve(order.items);
      try {
        await this.paymentService.charge(order);
        await this.orderService.confirm(order.id);
      } catch (paymentError) {
        await this.inventoryService.release(order.items);  // Compensate
        await this.orderService.cancel(order.id);
        throw paymentError;
      }
    } catch (inventoryError) {
      await this.orderService.cancel(order.id);
      throw inventoryError;
    }
  }
}`}</code></pre>

      <h2>7. CQRS: Command Query Responsibility Segregation</h2>
      <pre><code className="language-typescript">{`// CQRS separates reads (queries) from writes (commands)

// Command side: handles writes, enforces business rules
class OrderCommandHandler {
  async handle(command: CreateOrderCommand) {
    // Validate business rules
    const user = await this.userRepo.findById(command.userId);
    if (!user.canPlaceOrders()) throw new Error('User blocked');

    // Apply domain logic
    const order = Order.create(command.userId, command.items);
    await this.orderRepo.save(order);

    // Emit events for read model update
    this.eventBus.emit('OrderCreated', order.toEvent());
  }
}

// Query side: optimized read models (denormalized for fast reads)
class OrderQueryHandler {
  async handle(query: GetUserOrdersQuery) {
    // Read from denormalized view optimized for this query
    return this.orderReadModel.findByUserId(query.userId, {
      limit: query.limit,
      status: query.status,
    });
  }
}

// Read model is updated by events from write side
onEvent('OrderCreated', async (event) => {
  await orderReadModel.upsert({
    id: event.orderId,
    userId: event.userId,
    status: 'pending',
    itemCount: event.items.length,
    total: event.total,
    createdAt: event.timestamp,
    // Denormalized: include user name for display
    userName: (await userReadModel.findById(event.userId)).name,
  });
});`}</code></pre>

      <h2>8. Observability: The Three Pillars</h2>
      <pre><code className="language-typescript">{`// 1. Structured Logging
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  base: {
    service: 'order-service',
    version: process.env.APP_VERSION,
    env: process.env.NODE_ENV,
  },
});

// Log with correlation ID (trace requests across services)
app.use((req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] ?? uuid();
  res.setHeader('x-correlation-id', req.correlationId);
  req.log = logger.child({ correlationId: req.correlationId });
  next();
});

// Structured log entry
req.log.info({ userId: req.user.id, orderId }, 'Order created');

// 2. Distributed Tracing with OpenTelemetry
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://jaeger:4318/v1/traces',
  }),
  serviceName: 'order-service',
});
sdk.start();

// Traces propagate automatically via HTTP headers
// W3C Trace Context: traceparent header

// 3. Metrics with Prometheus
import promClient from 'prom-client';

const httpDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5],
});

const activeOrders = new promClient.Gauge({
  name: 'active_orders_total',
  help: 'Number of active orders',
});

// Expose metrics endpoint for Prometheus scraping
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.send(await promClient.register.metrics());
});`}</code></pre>

      <h2>9. Database per Service Pattern</h2>
      <pre><code className="language-text">{`Anti-pattern: Shared Database
  ┌────────────┐  ┌────────────┐  ┌────────────┐
  │ User Svc   │  │ Order Svc  │  │Product Svc │
  └──────┬─────┘  └─────┬──────┘  └─────┬──────┘
         └──────────────┼────────────────┘
                        ▼
                 ┌──────────────┐
                 │ Shared MySQL │  ← Tight coupling!
                 └──────────────┘

Correct: Database per Service
  ┌────────────┐  ┌────────────┐  ┌────────────┐
  │ User Svc   │  │ Order Svc  │  │Product Svc │
  └──────┬─────┘  └─────┬──────┘  └─────┬──────┘
         ▼               ▼               ▼
  ┌─────────────┐ ┌──────────────┐ ┌────────────┐
  │  PostgreSQL │ │   MongoDB    │ │   Redis    │
  │  (users)   │ │  (orders)    │ │ (products) │
  └─────────────┘ └──────────────┘ └────────────┘
  Each service can choose its best-fit database!`}</code></pre>

      <h2>Microservices Anti-Patterns to Avoid</h2>
      <pre><code className="language-text">{`1. Distributed Monolith
   Services that must deploy together or share databases
   → Wrong decomposition, tightly coupled at wrong level

2. Chatty Services
   Service A makes 10 synchronous calls to Service B per request
   → Batch calls, use caching, consider aggregation

3. Shared Libraries with Business Logic
   Shared library updated → all services must redeploy
   → Share only infrastructure concerns (logging, metrics)

4. Synchronous Everything
   All communication via REST/gRPC blocks on each call
   → Use async messaging for non-time-critical flows

5. No Circuit Breakers
   One slow service causes cascade failure
   → Implement circuit breakers and bulkheads

6. Missing Correlation IDs
   Can't trace a request across 10 services in logs
   → Propagate trace context via headers from day 1

7. Premature Decomposition
   Splitting too early before understanding domain boundaries
   → Start with modular monolith, extract when pain is clear`}</code></pre>

      <h2>When to Use Microservices</h2>
      <pre><code className="language-text">{`Good fit:
  ✓ Large organization with multiple teams
  ✓ Different parts need to scale independently
  ✓ Parts have very different technology requirements
  ✓ Different deployment frequencies per component
  ✓ Team already comfortable with distributed systems

Poor fit:
  ✗ Small team (< 10 engineers)
  ✗ Early-stage startup (domain not well understood)
  ✗ Simple CRUD application
  ✗ No DevOps/infrastructure capability
  ✗ Can't accept operational complexity`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>How small should a microservice be?</h3>
      <p>
        A service should be small enough to be owned by a single team, but large enough to have
        meaningful cohesion. The "two-pizza team" rule (can be fed by two pizzas) is a popular
        heuristic. More useful is the Single Responsibility Principle: a service should have one
        reason to change, corresponding to one business domain or subdomain.
      </p>

      <h3>How do microservices handle authentication?</h3>
      <p>
        JWT tokens are the most common approach. The API Gateway validates the token and passes user
        identity to downstream services via trusted headers. Each service trusts the gateway and
        doesn't re-validate the JWT. Never expose services directly to the internet without the
        gateway.
      </p>

      <h3>What's the difference between Kafka and RabbitMQ for microservices?</h3>
      <p>
        Kafka is a distributed log — great for high-throughput event streaming, replay of events, and
        event sourcing. RabbitMQ is a message broker — great for task queues and point-to-point
        messaging. Kafka retains messages for a configurable period; RabbitMQ deletes messages after
        consumption.
      </p>

      <p>
        Use our <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> to inspect API
        payloads between services, or the{' '}
        <Link href={`/${lang}/tools/uuid-generator`}>UUID Generator</Link> for generating correlation
        IDs and service instance IDs.
      </p>
    </>
  );
}
