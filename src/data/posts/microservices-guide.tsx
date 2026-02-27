'use client';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Microservices Architecture: Complete Guide for 2026',
    description: 'A comprehensive guide to microservices architecture covering design principles, service communication, API gateways, service discovery, circuit breakers, distributed tracing, data management, Docker, Kubernetes, security, and observability.',
  },
  zh: {
    title: '微服务架构：2026年完整指南',
    description: '微服务架构综合指南，涵盖设计原则、服务通信、API网关、服务发现、熔断器、分布式追踪、数据管理、Docker、Kubernetes、安全性和可观测性。',
  },
};

const codeStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  borderRadius: 8,
  padding: 16,
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.7,
  fontFamily: 'monospace',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-color)',
  margin: '12px 0',
};
const h2Style: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 40,
  marginBottom: 16,
  color: 'var(--text-primary)',
};
const h3Style: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  marginTop: 24,
  color: 'var(--text-primary)',
};
const pStyle: React.CSSProperties = {
  color: 'var(--text-secondary)',
  lineHeight: 1.8,
  marginBottom: 12,
};
const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14,
  margin: '16px 0',
};
const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  borderBottom: '2px solid var(--border-color)',
  fontWeight: 700,
  color: 'var(--text-primary)',
  background: 'var(--bg-input)',
};
const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--border-color)',
  color: 'var(--text-secondary)',
};

export default function MicroservicesGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];
  void t;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is microservices architecture?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Microservices architecture is a software design approach where an application is built as a collection of small, independently deployable services. Each service owns its own data and can be developed, deployed, and scaled independently.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use microservices over a monolith?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use microservices when your team is large enough to work on independent services (typically 3+ teams), when different parts of your system have different scaling requirements, or when you need independent deployment cycles. Start with a monolith for small teams or early-stage products.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between REST, gRPC, and message queues for service communication?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'REST uses HTTP/JSON for synchronous communication. gRPC uses HTTP/2 and Protocol Buffers for high-performance synchronous calls. Message queues (RabbitMQ, Kafka) enable asynchronous, decoupled communication for event-driven workflows.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is an API Gateway and why do I need one?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An API Gateway is the single entry point for all client requests. It handles authentication, rate limiting, SSL termination, request routing, and response aggregation. Popular options include Kong, AWS API Gateway, and NGINX.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the circuit breaker pattern?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The circuit breaker prevents cascade failures by stopping calls to a failing service after a threshold of errors. It has three states: Closed (normal), Open (rejecting calls), and Half-Open (testing recovery). Resilience4j and opossum are popular implementations.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do microservices handle data management?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each service should own its own database (database-per-service pattern). Use CQRS to maintain read models across services, Event Sourcing for audit trails, and Saga patterns for distributed transactions without two-phase commit.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is distributed tracing and how does OpenTelemetry help?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Distributed tracing tracks a request as it flows through multiple services. OpenTelemetry provides vendor-neutral APIs and SDKs to collect traces, metrics, and logs. Jaeger and Zipkin are popular backends for visualizing distributed traces.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Istio improve microservices security?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Istio adds an Envoy sidecar proxy to each pod, enabling mTLS for encrypted service-to-service communication, authorization policies, traffic management, and observability without changing application code.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 8 }}>TL;DR</strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: 1.7 }}>
          Microservices decompose a large application into small, independently deployable services. Use REST or gRPC for synchronous calls, Kafka or RabbitMQ for async events. Put an API Gateway at the edge. Use circuit breakers (Resilience4j) to prevent cascades. Give each service its own database. Deploy on Kubernetes, observe with Prometheus and Grafana, trace with Jaeger and OpenTelemetry, and secure service-to-service communication with Istio mTLS.
        </p>
      </div>

      <p style={pStyle}>
        Microservices architecture has become the dominant pattern for building large-scale, cloud-native applications. Netflix, Amazon, Uber, and Airbnb all migrated from monoliths to microservices to achieve independent scaling, faster deployments, and organizational autonomy. But microservices also introduce significant complexity: distributed tracing, eventual consistency, network latency, and operational overhead. This guide covers every aspect of microservices architecture — from design principles and communication patterns to Kubernetes deployment and security — with practical code examples you can use today.
      </p>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: 12, fontSize: 16 }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-secondary)', lineHeight: 2 }}>
          <li>Start with a monolith; migrate to microservices when team size and complexity justify it</li>
          <li>Each service should have a single responsibility and own its own database</li>
          <li>Use gRPC for internal calls, REST for public APIs, and message queues for async workflows</li>
          <li>API Gateway centralizes auth, routing, rate limiting, and SSL termination</li>
          <li>Circuit breakers prevent cascade failures across service boundaries</li>
          <li>Implement distributed tracing with OpenTelemetry from day one</li>
          <li>CQRS and Event Sourcing solve cross-service data consistency challenges</li>
          <li>Istio service mesh provides zero-trust security with mTLS between services</li>
        </ul>
      </div>

      {/* Section 1: Monolith vs Microservices */}
      <h2 style={h2Style}>Monolith vs Microservices: When to Use Which</h2>
      <p style={pStyle}>
        The choice between a monolith and microservices is not about which is objectively better — it is about what fits your team, stage, and problem. Many successful companies run monoliths in production. The goal is to match your architecture to your organizational and scaling needs rather than blindly following trends.
      </p>

      <h3 style={h3Style}>The Monolith: Benefits and Limitations</h3>
      <p style={pStyle}>
        A monolith is a single deployable unit containing all application functionality. All modules share a process, database, and deployment pipeline. Monoliths are simpler to develop, test, and debug at small scale. There is no network overhead between modules, database transactions are straightforward, and local debugging requires no special tooling. The danger arises as the codebase grows: slow builds, tight coupling between teams, inability to scale individual components, and deployment risk where every change deploys everything at once.
      </p>
      <pre style={codeStyle}><code>{`# Monolith — all in one deployable
my-app/
├── src/
│   ├── auth/           # Authentication module
│   ├── orders/         # Order management
│   ├── payments/       # Payment processing
│   ├── inventory/      # Inventory tracking
│   └── notifications/  # Email/SMS
├── database/           # One shared database schema
└── Dockerfile          # Single container image

# Single deployment — all modules go together
docker build -t my-app:v1.5.0 .
docker run -p 8080:8080 my-app:v1.5.0

# Problems at scale:
# - Slow build times (rebuild everything for any change)
# - One team's bad deploy breaks everyone
# - Cannot scale payment service independently of auth service
# - Tech debt accumulates: impossible to change DB schema safely`}</code></pre>

      <h3 style={h3Style}>Microservices: Benefits and Trade-offs</h3>
      <p style={pStyle}>
        Microservices split the application into independently deployable services, each with a focused responsibility. Benefits include independent scaling (scale only the payment service during peak sales), independent deployment (the notifications team deploys without coordination), technology diversity (use Python for ML, Go for high-throughput APIs), and fault isolation (a crash in the recommendations service does not take down checkout). The trade-offs are real: network latency replaces function calls, distributed transactions are hard, debugging requires tracing across services, and operational complexity multiplies significantly.
      </p>
      <pre style={codeStyle}><code>{`# Microservices — independently deployed per service
services/
├── auth-service/          # JWT issuance and validation
│   ├── src/
│   ├── Dockerfile
│   └── package.json       # Node.js
├── order-service/         # Order lifecycle management
│   ├── src/
│   ├── Dockerfile
│   └── go.mod             # Go
├── payment-service/       # Payment processing (PCI-DSS scope)
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml            # Java/Spring Boot
├── inventory-service/     # Stock management
│   ├── src/
│   ├── Dockerfile
│   └── requirements.txt   # Python/FastAPI
├── notification-service/  # Async email/SMS/push
└── api-gateway/           # Single external entry point

# Each service deploys independently — no coordination needed
cd order-service
docker build -t order-service:v2.1.0 .
kubectl set image deployment/order-service order=order-service:v2.1.0
# payment-service continues running v3.0.0 — unaffected`}</code></pre>

      <h3 style={h3Style}>Decision Framework</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Factor</th>
            <th style={thStyle}>Choose Monolith</th>
            <th style={thStyle}>Choose Microservices</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Team size', '1–8 engineers', '10+ engineers, multiple teams'],
            ['Product stage', 'Early MVP, validating ideas', 'Established product, clear domain boundaries'],
            ['Scaling needs', 'Uniform scaling requirements', 'Different scaling per component'],
            ['Deploy frequency', 'Weekly or monthly releases', 'Multiple deploys per day per service'],
            ['Domain complexity', 'Simple, well-understood domain', 'Complex domain with distinct bounded contexts'],
            ['Ops maturity', 'Limited DevOps capacity', 'Strong DevOps, Kubernetes expertise'],
          ].map(([factor, mono, micro], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{factor}</td>
              <td style={tdStyle}>{mono}</td>
              <td style={tdStyle}>{micro}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 2: Design Principles */}
      <h2 style={h2Style}>Microservices Design Principles</h2>
      <p style={pStyle}>
        Well-designed microservices are not just small — they are designed around business domains, maintain clear boundaries, and minimize coupling. The following principles guide good microservice design. Violating any of them tends to produce distributed monoliths: systems with all the complexity of microservices and none of the benefits.
      </p>

      <h3 style={h3Style}>Single Responsibility Principle</h3>
      <p style={pStyle}>
        Each microservice should do one thing and do it well. The challenge is defining what one thing means. Domain-Driven Design (DDD) provides the concept of a Bounded Context — a logical boundary within which a domain model is consistent and unambiguous. Each bounded context typically maps to one or a small group of microservices. When a service is too large, you find yourself making cross-team changes for a single feature. When it is too small (nano-services), you have excessive network overhead and operational burden.
      </p>
      <pre style={codeStyle}><code>{`# Bad: A "user-service" that does too many unrelated things
user-service:
  - Manages user profiles
  - Handles JWT authentication tokens
  - Sends welcome and transactional emails
  - Tracks user analytics events
  - Processes subscription billing

# Good: Separate services per bounded context
auth-service        -> JWT creation, token validation, OAuth2 flows
profile-service     -> User profile CRUD, preferences, avatar upload
notification-service -> Email, SMS, push notifications (event-driven)
analytics-service   -> Event ingestion, user behavior tracking
billing-service     -> Subscription management, invoice generation

# Each service can be owned by a separate team
# and deployed on its own release schedule`}</code></pre>

      <h3 style={h3Style}>Loose Coupling</h3>
      <p style={pStyle}>
        Services should be able to change independently without requiring changes in other services. Loose coupling means services interact through well-defined, stable interfaces — APIs or events — and do not share implementation details, internal data structures, or databases. The most common coupling anti-pattern is a shared database: two services reading and writing the same tables creates tight coupling at the data layer, making independent evolution impossible and turning schema migrations into cross-team events.
      </p>
      <pre style={codeStyle}><code>{`// Tight coupling anti-pattern — AVOID THIS
// order-service directly queries payment-service's database
const payment = await db.query(
  'SELECT * FROM payment_service.payments WHERE order_id = \$1',
  [orderId]
);
// Problems: schema change in payment-service breaks order-service,
// payment-service cannot migrate its DB independently

// Loose coupling — communicate via stable public API
const response = await fetch(
  'http://payment-service/api/v1/payments/' + orderId,
  {
    headers: { Authorization: 'Bearer ' + await getServiceToken('payment-service') },
    signal: AbortSignal.timeout(5000),
  }
);
if (!response.ok) throw new PaymentServiceError(response.status);
const payment = await response.json() as PaymentRecord;
// payment-service can change its internal DB, rename columns,
// migrate to a different DB engine — order-service is unaffected`}</code></pre>

      <h3 style={h3Style}>High Cohesion</h3>
      <p style={pStyle}>
        Related functionality should live within the same service. If you find yourself frequently making cross-service calls to complete a single operation, your service boundaries may be wrong. A common symptom is the "distributed monolith" where microservices are deployed separately but are so tightly coupled that they must deploy together and share data through shared databases. High cohesion means the data a service needs to do its job lives within its own boundary.
      </p>
      <pre style={codeStyle}><code>{`# Checking service cohesion:
# 1. Does this service have a single, clear purpose?
# 2. Do most operations complete within this service's boundary?
# 3. Does the service own all the data it needs?
# 4. Would a domain expert call this a natural unit of business logic?

# Low cohesion warning sign:
# "Place order" operation requires sequential calls to:
#   -> inventory-service (check stock)
#   -> pricing-service (get current price)
#   -> coupon-service (validate discount)
#   -> customer-service (verify customer)
#   -> fraud-service (score order)
# All synchronous, all required, all blocking
# Consider: orchestration layer or domain re-design

# High cohesion — order-service owns its domain:
# - orders table (order lifecycle and status)
# - order_items table (line items with snapshot pricing)
# - order_history table (state machine transitions)
# Most operations complete without external calls`}</code></pre>

      <h3 style={h3Style}>Design for Failure</h3>
      <p style={pStyle}>
        In a distributed system, failures are not exceptional — they are normal operating conditions. Networks partition, services crash, latency spikes, disks fill up. Every microservice must be designed assuming that its dependencies will sometimes be unavailable. Always implement timeouts on all outbound calls, retry with exponential backoff for transient errors, use circuit breakers to prevent cascades, and define fallback behaviors that degrade gracefully.
      </p>
      <pre style={codeStyle}><code>{`// Resilient service call pattern
async function callInventoryService(productId: string, qty: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

  try {
    const response = await fetch(
      'http://inventory-service/api/v1/reserve',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: qty }),
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (response.status === 503) {
      // Service unavailable — use fallback
      return { reserved: false, fallback: true };
    }
    if (!response.ok) {
      throw new Error('Inventory service error: ' + response.status);
    }
    return response.json();
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      // Timeout — use fallback instead of letting the error propagate
      return { reserved: false, timeout: true, fallback: true };
    }
    throw err; // Re-throw non-timeout errors for circuit breaker tracking
  } finally {
    clearTimeout(timeoutId);
  }
}`}</code></pre>

      {/* Section 3: Service Communication */}
      <h2 style={h2Style}>Service Communication: REST vs gRPC vs Message Queues</h2>
      <p style={pStyle}>
        How services communicate is one of the most consequential architectural decisions in microservices. There are two fundamental communication styles: synchronous (the caller blocks waiting for a response) and asynchronous (fire-and-forget, event-driven). Each has distinct tools and trade-offs. Most microservices systems use both — synchronous for queries requiring immediate responses, asynchronous for workflows that can tolerate eventual consistency.
      </p>

      <h3 style={h3Style}>REST over HTTP/JSON (Synchronous)</h3>
      <p style={pStyle}>
        REST is the most widely used inter-service communication protocol. It is human-readable, trivially debuggable with curl, and universally supported across every language and platform. REST is ideal for request-response patterns where the caller needs an immediate result: user authentication, fetching product details, creating a resource. The main drawbacks are payload verbosity compared to binary formats and the CPU cost of JSON serialization and deserialization at high request volumes.
      </p>
      <pre style={codeStyle}><code>{`# REST API — order-service calling inventory-service
# POST /api/v1/inventory/reserve

curl -X POST https://inventory-service/api/v1/inventory/reserve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer \${SERVICE_TOKEN}" \
  -d '{
    "product_id": "prod_abc123",
    "quantity": 2,
    "order_id": "ord_xyz789",
    "idempotency_key": "ord_xyz789-reserve-attempt-1"
  }'

# Response
{
  "reserved": true,
  "reservation_id": "res_def456",
  "expires_at": "2026-02-27T14:30:00Z",
  "available_stock": 47
}

# Node.js — service-to-service REST call with timeout and retry
async function reserveInventory(productId: string, qty: number, orderId: string) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch('http://inventory-service/api/v1/inventory/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + await tokenCache.getToken('inventory-service'),
          'X-Idempotency-Key': orderId + '-reserve-' + attempt,
        },
        body: JSON.stringify({ product_id: productId, quantity: qty, order_id: orderId }),
        signal: AbortSignal.timeout(5000),
      });
      if (res.status === 429) {
        // Rate limited — exponential backoff
        await sleep(Math.pow(2, attempt) * 100);
        continue;
      }
      return res.json();
    } catch (err) {
      if (attempt === 3) throw err;
      await sleep(Math.pow(2, attempt) * 100);
    }
  }
}`}</code></pre>

      <h3 style={h3Style}>gRPC (High-Performance Synchronous)</h3>
      <p style={pStyle}>
        gRPC uses HTTP/2 and Protocol Buffers (protobuf) for binary serialization, making it significantly faster and more efficient than REST/JSON — typically 5 to 10 times faster for serialization with considerably smaller payloads. gRPC supports four call patterns: unary (like REST), client streaming, server streaming, and bidirectional streaming. Strong typing via .proto schema files eliminates an entire class of integration bugs. Automatic client code generation in over 10 languages removes boilerplate. gRPC is ideal for internal service-to-service communication where performance matters.
      </p>
      <pre style={codeStyle}><code>{`// Step 1: Define the service contract in inventory.proto
syntax = "proto3";
package inventory.v1;

service InventoryService {
  rpc CheckStock(StockRequest) returns (StockResponse);
  rpc ReserveItems(ReserveRequest) returns (ReserveResponse);
  // Server-streaming: push real-time inventory updates
  rpc StreamUpdates(StreamRequest) returns (stream InventoryEvent);
}

message StockRequest {
  string product_id = 1;
  string warehouse_id = 2;  // optional
}

message StockResponse {
  int32 available_quantity = 1;
  bool  in_stock           = 2;
  string warehouse_location = 3;
}

message ReserveRequest {
  string product_id      = 1;
  int32  quantity        = 2;
  string order_id        = 3;
  string idempotency_key = 4;
}

message ReserveResponse {
  bool   success        = 1;
  string reservation_id = 2;
  string expires_at     = 3;
  string error_code     = 4;  // non-empty on failure
}

// Step 2: Generate Go server stub
// protoc --go_out=. --go-grpc_out=. inventory.proto

// Step 3: Implement the Go server
type inventoryServer struct {
  pb.UnimplementedInventoryServiceServer
  db *pgxpool.Pool
}

func (s *inventoryServer) ReserveItems(
  ctx context.Context, req *pb.ReserveRequest,
) (*pb.ReserveResponse, error) {
  if req.Quantity <= 0 {
    return nil, status.Errorf(codes.InvalidArgument, "quantity must be positive")
  }
  reservation, err := s.db.Reserve(ctx, req.ProductId, req.Quantity, req.OrderId)
  if err != nil {
    if errors.Is(err, ErrInsufficientStock) {
      return &pb.ReserveResponse{ErrorCode: "INSUFFICIENT_STOCK"}, nil
    }
    return nil, status.Errorf(codes.Internal, "reservation failed: %v", err)
  }
  return &pb.ReserveResponse{
    Success:       true,
    ReservationId: reservation.ID,
    ExpiresAt:     reservation.ExpiresAt.Format(time.RFC3339),
  }, nil
}

// Step 4: Call from Node.js client
// npm install @grpc/grpc-js @grpc/proto-loader
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDef = protoLoader.loadSync('inventory.proto', { keepCase: true });
const proto = grpc.loadPackageDefinition(packageDef) as any;

const client = new proto.inventory.v1.InventoryService(
  'inventory-service:50051',
  grpc.credentials.createSsl(),
);

client.reserveItems(
  { product_id: 'prod_abc', quantity: 2, order_id: 'ord_xyz', idempotency_key: 'key-1' },
  (err: Error | null, response: any) => {
    if (err) throw err;
    console.log('Reservation:', response.reservation_id);
  }
);`}</code></pre>

      <h3 style={h3Style}>Message Queues: RabbitMQ and Apache Kafka</h3>
      <p style={pStyle}>
        Message queues enable asynchronous, event-driven communication. The publisher sends a message and continues immediately without waiting. This decouples services in time: the consumer can be temporarily offline and messages are buffered. RabbitMQ is a traditional message broker with flexible routing, exchange types, and acknowledgment semantics — ideal for task queues and work distribution. Kafka is a distributed commit log designed for high-throughput event streaming, retaining messages for configurable periods — ideal for audit logs, event sourcing, and stream processing pipelines.
      </p>
      <pre style={codeStyle}><code>{`# ── RabbitMQ — task queue pattern ──────────────────────────────
# Publisher: order-service queues a payment task
import pika, json

connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
channel = connection.channel()
channel.queue_declare(queue='payment_tasks', durable=True)

channel.basic_publish(
    exchange='',
    routing_key='payment_tasks',
    body=json.dumps({
        'order_id':    'ord_xyz789',
        'amount':      99.99,
        'currency':    'USD',
        'customer_id': 'cust_abc123',
    }),
    properties=pika.BasicProperties(
        delivery_mode=2,               # Persistent — survives broker restart
        content_type='application/json'
    )
)
connection.close()

# Consumer: payment-service processes tasks
def process_payment(ch, method, properties, body):
    payload = json.loads(body)
    try:
        charge_card(payload['customer_id'], payload['amount'])
        publish_event('order-events', 'PAYMENT_COMPLETED', payload['order_id'])
        ch.basic_ack(delivery_tag=method.delivery_tag)     # Mark as done
    except CardDeclinedError:
        publish_event('order-events', 'PAYMENT_FAILED', payload['order_id'])
        ch.basic_ack(delivery_tag=method.delivery_tag)     # Do not retry
    except Exception:
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)  # Dead-letter

channel.basic_qos(prefetch_count=1)   # Process one at a time
channel.basic_consume(queue='payment_tasks', on_message_callback=process_payment)
channel.start_consuming()

# ── Apache Kafka — event streaming pattern ──────────────────────
# Producer: order-service publishes domain events
from confluent_kafka import Producer
producer = Producer({'bootstrap.servers': 'kafka:9092', 'acks': 'all'})

producer.produce(
    topic='order-events',
    key=order_id.encode(),         # Ensures same-order events go to same partition
    value=json.dumps({
        'event_type':  'ORDER_CREATED',
        'order_id':    order_id,
        'customer_id': customer_id,
        'items':       items,
        'timestamp':   datetime.utcnow().isoformat(),
        'schema_version': 'v1',
    }).encode(),
    on_delivery=lambda err, msg: print('Delivered' if not err else 'Error: ' + str(err))
)
producer.flush()

# Multiple independent consumers (each in its own consumer group)
from confluent_kafka import Consumer

# inventory-service consumer group
inventory_consumer = Consumer({
    'bootstrap.servers': 'kafka:9092',
    'group.id': 'inventory-service',     # Unique group per service
    'auto.offset.reset': 'earliest',
    'enable.auto.commit': False,          # Manual commit for reliability
})
inventory_consumer.subscribe(['order-events'])

while True:
    msg = inventory_consumer.poll(timeout=1.0)
    if msg is None or msg.error(): continue
    event = json.loads(msg.value())
    if event['event_type'] == 'ORDER_CREATED':
        reserve_inventory(event['items'])
        inventory_consumer.commit(msg)`}</code></pre>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Protocol</th>
            <th style={thStyle}>Style</th>
            <th style={thStyle}>Best For</th>
            <th style={thStyle}>Payload</th>
            <th style={thStyle}>Performance</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['REST/HTTP', 'Sync', 'Public APIs, CRUD operations', 'JSON (text)', 'Good'],
            ['gRPC', 'Sync', 'Internal service calls, streaming', 'Protobuf (binary)', 'Excellent'],
            ['RabbitMQ', 'Async', 'Task queues, work distribution', 'Any (JSON/binary)', 'Very Good'],
            ['Apache Kafka', 'Async', 'Event streaming, audit logs', 'Any (Avro/JSON)', 'Excellent'],
          ].map(([proto, style, bestFor, payload, perf], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{proto}</td>
              <td style={tdStyle}>{style}</td>
              <td style={tdStyle}>{bestFor}</td>
              <td style={tdStyle}>{payload}</td>
              <td style={tdStyle}>{perf}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 4: API Gateway */}
      <h2 style={h2Style}>API Gateway Pattern: Kong, AWS API Gateway, NGINX</h2>
      <p style={pStyle}>
        The API Gateway is the single entry point for all external client requests. Instead of clients knowing the addresses of dozens of microservices, they send all requests to the gateway, which routes them to the appropriate service. The gateway handles cross-cutting concerns that would otherwise be duplicated in every service: authentication and authorization, rate limiting, SSL/TLS termination, request and response transformation, logging, caching, and request aggregation.
      </p>

      <h3 style={h3Style}>Kong API Gateway</h3>
      <p style={pStyle}>
        Kong is a high-performance, open-source API gateway built on NGINX. It supports a rich plugin ecosystem for authentication (JWT, OAuth2, API keys, HMAC), rate limiting, request transformation, logging, and observability. Kong can run on Kubernetes as an Ingress Controller, replacing the default NGINX Ingress.
      </p>
      <pre style={codeStyle}><code>{`# Kong declarative configuration (deck sync)
_format_version: "3.0"
_transform: true

services:
  - name: order-service
    url: http://order-service.production.svc.cluster.local:80
    connect_timeout: 5000
    read_timeout: 30000
    routes:
      - name: orders-api
        paths: ["/api/v1/orders"]
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
        strip_path: false
    plugins:
      - name: jwt
        config:
          secret_is_base64: false
          claims_to_verify: ["exp"]
      - name: rate-limiting
        config:
          minute: 100
          hour: 3000
          policy: redis
          redis_host: redis
          redis_port: 6379
      - name: cors
        config:
          origins: ["https://app.mycompany.com", "https://www.mycompany.com"]
          methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
          headers: ["Authorization", "Content-Type", "X-Request-ID"]
          max_age: 3600

  - name: product-catalog-service
    url: http://product-service.production.svc.cluster.local:80
    routes:
      - name: products-api
        paths: ["/api/v1/products"]
        methods: ["GET"]
    plugins:
      - name: proxy-cache
        config:
          response_code: [200]
          request_method: ["GET"]
          content_type: ["application/json; charset=utf-8"]
          cache_ttl: 60
          storage_ttl: 300

  - name: internal-admin-service
    url: http://admin-service.production.svc.cluster.local:80
    routes:
      - name: admin-api
        paths: ["/api/v1/admin"]
    plugins:
      - name: ip-restriction
        config:
          allow: ["10.0.0.0/8", "192.168.0.0/16"]  # Internal only`}</code></pre>

      <h3 style={h3Style}>NGINX as API Gateway</h3>
      <pre style={codeStyle}><code>{`# nginx.conf — production API gateway configuration
upstream order_service {
    least_conn;
    server order-service-1.production:8080;
    server order-service-2.production:8080;
    server order-service-3.production:8080;
    keepalive 32;
}

upstream payment_service {
    server payment-service.production:8080 max_fails=3 fail_timeout=30s;
    keepalive 16;
}

limit_req_zone \${binary_remote_addr} zone=api_per_ip:10m rate=100r/m;
limit_req_zone \${http_authorization} zone=api_per_token:10m rate=1000r/m;

server {
    listen 443 ssl http2;
    server_name api.myapp.com;

    ssl_certificate      /etc/ssl/tls.crt;
    ssl_certificate_key  /etc/ssl/tls.key;
    ssl_protocols        TLSv1.2 TLSv1.3;
    ssl_ciphers          ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;

    # Rate limiting
    limit_req zone=api_per_ip  burst=20 nodelay;
    limit_req zone=api_per_token burst=100 nodelay;

    # Internal auth validation endpoint
    location = /_auth/validate {
        internal;
        proxy_pass http://auth-service.production:8080/validate;
        proxy_pass_request_body off;
        proxy_set_header Content-Length "";
        proxy_set_header X-Original-URI \${request_uri};
        proxy_set_header X-Original-Method \${request_method};
        proxy_cache_valid 200 30s;   # Cache valid tokens for 30s
    }

    location /api/v1/orders {
        auth_request /_auth/validate;
        auth_request_set \${auth_user_id} \${upstream_http_x_user_id};

        proxy_pass http://order_service;
        proxy_set_header X-User-ID \${auth_user_id};
        proxy_set_header X-Real-IP \${remote_addr};
        proxy_set_header X-Request-ID \${request_id};
        proxy_connect_timeout 5s;
        proxy_read_timeout    30s;
    }

    location /api/v1/payments {
        auth_request /_auth/validate;
        # Payment endpoint — extra strict rate limiting
        limit_req zone=api_per_ip burst=5 nodelay;
        proxy_pass http://payment_service;
    }
}`}</code></pre>

      {/* Section 5: Service Discovery */}
      <h2 style={h2Style}>Service Discovery: Consul, Eureka, and Kubernetes DNS</h2>
      <p style={pStyle}>
        In a microservices environment, service instances are dynamic — they scale up and down, crash and restart, move between hosts when Kubernetes reschedules pods. Service discovery solves how services find each other's current network address without hardcoding IPs or requiring manual configuration updates. There are two patterns: client-side discovery (the client queries a registry and load-balances itself) and server-side discovery (the client goes through a load balancer that does the lookup).
      </p>

      <h3 style={h3Style}>Consul Service Mesh</h3>
      <pre style={codeStyle}><code>{`# Deploy Consul in Kubernetes
helm repo add hashicorp https://helm.releases.hashicorp.com
helm install consul hashicorp/consul \
  --set global.name=consul \
  --set server.replicas=3 \
  --set connectInject.enabled=true  # Enables sidecar injection

# Service registration via Consul API (for non-Kubernetes environments)
curl -X PUT http://consul:8500/v1/agent/service/register \
  -H "Content-Type: application/json" \
  -d '{
    "ID":      "order-service-pod-abc",
    "Name":    "order-service",
    "Address": "10.0.1.50",
    "Port":    8080,
    "Tags":    ["v2.1", "production"],
    "Meta": {
      "version": "2.1.0",
      "region":  "us-east-1"
    },
    "Check": {
      "HTTP":                          "http://10.0.1.50:8080/health/ready",
      "Interval":                      "10s",
      "Timeout":                       "5s",
      "DeregisterCriticalServiceAfter": "60s"
    }
  }'

# Discover healthy instances of order-service
curl "http://consul:8500/v1/health/service/order-service?passing=true" | jq '
  .[] | { id: .Service.ID, address: .Service.Address, port: .Service.Port }
'

# DNS-based discovery — Consul serves DNS on port 8600
# order-service.service.consul resolves to all healthy instances
dig @consul -p 8600 order-service.service.consul SRV

# With datacenter targeting
dig @consul -p 8600 order-service.service.us-east.consul SRV`}</code></pre>

      <h3 style={h3Style}>Kubernetes DNS (Built-in Service Discovery)</h3>
      <p style={pStyle}>
        Kubernetes provides built-in service discovery through CoreDNS. Every Kubernetes Service gets a stable DNS entry automatically — no separate registry infrastructure required. Services within the same namespace resolve by short name, cross-namespace by full qualified name. This is the recommended approach for Kubernetes-native microservices.
      </p>
      <pre style={codeStyle}><code>{`# Create a Kubernetes Service — auto-registers in CoreDNS
apiVersion: v1
kind: Service
metadata:
  name: order-service
  namespace: production
  labels:
    app: order-service
    version: v2.1.0
spec:
  selector:
    app: order-service    # Routes to all pods with this label
  ports:
    - name: http
      protocol: TCP
      port: 80            # Service port (stable)
      targetPort: 8080    # Container port
  type: ClusterIP         # Only accessible within cluster

# DNS entries created automatically:
# order-service                                       (same namespace)
# order-service.production                            (namespace-qualified)
# order-service.production.svc                       (cluster domain)
# order-service.production.svc.cluster.local         (fully qualified)

# From any pod in the 'production' namespace:
curl http://order-service/api/v1/orders

# Cross-namespace call (from 'staging' namespace):
curl http://order-service.production.svc.cluster.local/api/v1/orders

# Headless service — returns individual pod IPs (for stateful sets)
apiVersion: v1
kind: Service
metadata:
  name: kafka
  namespace: production
spec:
  clusterIP: None   # Headless — DNS returns all pod IPs
  selector:
    app: kafka
  ports:
    - port: 9092`}</code></pre>

      {/* Section 6: Circuit Breaker */}
      <h2 style={h2Style}>Circuit Breaker Pattern: Resilience4j and Hystrix</h2>
      <p style={pStyle}>
        The circuit breaker pattern prevents cascade failures — where one slow or failing service causes upstream services to exhaust their thread pools waiting for responses, eventually crashing the entire system. Named after electrical circuit breakers, the pattern has three states. Closed is normal operation where all calls pass through. Open is the state where the downstream service is failing and calls are rejected immediately without attempting the network call, returning a fallback response instead. Half-Open means the circuit is testing whether the service has recovered by allowing a limited number of calls through.
      </p>

      <h3 style={h3Style}>Resilience4j for Java/Spring Boot</h3>
      <pre style={codeStyle}><code>{`# application.yml — Resilience4j configuration
resilience4j:
  circuitbreaker:
    instances:
      inventory-service:
        sliding-window-type: COUNT_BASED
        sliding-window-size: 10          # Evaluate last 10 calls
        failure-rate-threshold: 50       # Open circuit if >50% fail
        wait-duration-in-open-state: 30s # Wait 30s before testing
        permitted-calls-in-half-open-state: 3
        automatic-transition-from-open-to-half-open-enabled: true
        slow-call-duration-threshold: 2s
        slow-call-rate-threshold: 80     # Open if >80% calls are slow
        event-consumer-buffer-size: 10
        record-exceptions:
          - java.io.IOException
          - java.util.concurrent.TimeoutException
          - feign.FeignException.ServiceUnavailable
  retry:
    instances:
      inventory-service:
        max-attempts: 3
        wait-duration: 500ms
        exponential-backoff-multiplier: 2.0  # 500ms → 1s → 2s
        retry-exceptions:
          - java.io.IOException
        ignore-exceptions:
          - com.example.BusinessException
  timelimiter:
    instances:
      inventory-service:
        timeout-duration: 3s

// Java service implementation
@Service
public class OrderService {

    private final InventoryClient inventoryClient;

    @CircuitBreaker(name = "inventory-service", fallbackMethod = "reserveFallback")
    @Retry(name = "inventory-service")
    @TimeLimiter(name = "inventory-service")
    public CompletableFuture<ReservationResult> reserveInventory(
        String productId, int quantity, String orderId
    ) {
        return CompletableFuture.supplyAsync(() ->
            inventoryClient.reserve(new ReserveRequest(productId, quantity, orderId))
        );
    }

    // Fallback: called when circuit is open or all retries are exhausted
    public CompletableFuture<ReservationResult> reserveFallback(
        String productId, int quantity, String orderId, Exception ex
    ) {
        log.warn("Circuit open for inventory-service, using fallback. orderId={} error={}",
            orderId, ex.getMessage());
        // Allow order to proceed with async reservation (backfill queue)
        asyncReservationQueue.add(new PendingReservation(orderId, productId, quantity));
        return CompletableFuture.completedFuture(
            ReservationResult.pending(orderId, "inventory-service-degraded")
        );
    }
}

// Monitor circuit state events
@Component
public class CircuitBreakerMonitor {
    @EventListener
    public void onStateTransition(CircuitBreakerOnStateTransitionEvent event) {
        log.warn("Circuit {} changed: {} -> {}",
            event.getCircuitBreakerName(),
            event.getStateTransition().getFromState(),
            event.getStateTransition().getToState()
        );
        metrics.gauge("circuit_breaker_state",
            event.getStateTransition().getToState().ordinal(),
            "service", event.getCircuitBreakerName()
        );
    }
}`}</code></pre>

      <h3 style={h3Style}>Circuit Breaker in Node.js with opossum</h3>
      <pre style={codeStyle}><code>{`import CircuitBreaker from 'opossum';
import { metrics } from './observability';

// Wrap any async function
const breaker = new CircuitBreaker(
  async (productId: string, qty: number, orderId: string) => {
    return inventoryService.reserve(productId, qty, orderId);
  },
  {
    timeout: 3000,                  // Trigger failure if > 3s
    errorThresholdPercentage: 50,   // Open if > 50% fail
    resetTimeout: 30_000,           // Try again after 30s
    volumeThreshold: 5,             // Minimum calls before calculating
    rollingCountTimeout: 10_000,    // 10s rolling window
  }
);

// Graceful degradation
breaker.fallback((productId: string, qty: number, orderId: string) => ({
  reserved: false,
  pending: true,
  orderId,
  message: 'Inventory service temporarily unavailable. Order queued.',
}));

// Observability hooks
breaker.on('open',     () => metrics.increment('circuit_breaker.open', { svc: 'inventory' }));
breaker.on('halfOpen', () => metrics.increment('circuit_breaker.half_open', { svc: 'inventory' }));
breaker.on('close',    () => metrics.increment('circuit_breaker.close', { svc: 'inventory' }));
breaker.on('timeout',  () => metrics.increment('circuit_breaker.timeout', { svc: 'inventory' }));
breaker.on('reject',   () => metrics.increment('circuit_breaker.rejected', { svc: 'inventory' }));

// Expose circuit state in health check
app.get('/health/ready', (req, res) => {
  const stats = breaker.stats;
  res.json({
    status: 'ok',
    dependencies: {
      'inventory-service': {
        state: breaker.opened ? 'open' : breaker.halfOpen ? 'half-open' : 'closed',
        successRate: stats.successful / Math.max(stats.calls, 1),
        latencyMean: stats.latencyMean,
      },
    },
  });
});

// Usage in business logic
export async function reserveInventory(productId: string, qty: number, orderId: string) {
  return breaker.fire(productId, qty, orderId);
}`}</code></pre>

      {/* Section 7: Distributed Tracing */}
      <h2 style={h2Style}>Distributed Tracing: Jaeger, Zipkin, and OpenTelemetry</h2>
      <p style={pStyle}>
        When a user request flows through 5 microservices and response time is 3 seconds, finding which service is slow without tracing is like debugging production without logs. Distributed tracing assigns a unique trace ID to each incoming request. This ID propagates through every service call via HTTP headers, creating a tree of spans that records what happened, in which service, how long each step took, and what errors occurred. OpenTelemetry (OTel) is now the industry-standard, vendor-neutral framework. Jaeger and Zipkin are popular open-source trace visualization backends.
      </p>
      <pre style={codeStyle}><code>{`# 1. Deploy Jaeger — trace collection and visualization
# docker-compose.yml
services:
  jaeger:
    image: jaegertracing/all-in-one:1.54
    ports:
      - "16686:16686"  # Jaeger Web UI
      - "4317:4317"    # OTLP gRPC receiver
      - "4318:4318"    # OTLP HTTP receiver
    environment:
      COLLECTOR_OTLP_ENABLED: "true"
      SPAN_STORAGE_TYPE: badger
      BADGER_EPHEMERAL: "false"
      BADGER_DIRECTORY_VALUE: /badger/data
      BADGER_DIRECTORY_KEY: /badger/key
    volumes:
      - jaeger-data:/badger

# 2. Instrument Node.js with OpenTelemetry (auto-instrumentation)
# npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node
# npm install @opentelemetry/exporter-trace-otlp-http @opentelemetry/resources

// tracing.ts — MUST be loaded before any other module
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'order-service',
    [ATTR_SERVICE_VERSION]: process.env.APP_VERSION || '0.0.0',
    'deployment.environment': process.env.NODE_ENV || 'development',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT + '/v1/traces'
      || 'http://jaeger:4318/v1/traces',
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      // Auto-instruments: express, http, pg, redis, mongodb, kafka, grpc
      '@opentelemetry/instrumentation-http': {
        enabled: true,
        ignoreIncomingRequestHook: (req) => req.url === '/health',
      },
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-pg': { enabled: true },
      '@opentelemetry/instrumentation-ioredis': { enabled: true },
    }),
  ],
});

sdk.start();
process.on('SIGTERM', () => sdk.shutdown());

// 3. Add custom business spans
import { trace, SpanStatusCode, SpanKind, context } from '@opentelemetry/api';

const tracer = trace.getTracer('order-service', '2.1.0');

async function createOrder(input: OrderInput): Promise<Order> {
  // Start a span for the overall business operation
  const span = tracer.startSpan('order.create', {
    kind: SpanKind.INTERNAL,
    attributes: {
      'order.customer_id':  input.customerId,
      'order.item_count':   input.items.length,
      'order.total_amount': input.totalAmount,
      'order.currency':     input.currency,
    },
  });

  return context.with(trace.setSpan(context.active(), span), async () => {
    try {
      // Child spans created automatically by auto-instrumentation
      const inventory  = await checkInventory(input.items);
      const payment    = await processPayment(input.payment);
      const order      = await db.orders.create(input);

      span.setAttributes({ 'order.id': order.id, 'order.status': 'created' });
      span.setStatus({ code: SpanStatusCode.OK });
      return order;
    } catch (err) {
      span.recordException(err as Error);
      span.setStatus({ code: SpanStatusCode.ERROR, message: (err as Error).message });
      throw err;
    } finally {
      span.end();
    }
  });
}

# 4. Kubernetes ConfigMap for OTel configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-config
  namespace: production
data:
  OTEL_EXPORTER_OTLP_ENDPOINT: "http://jaeger-collector.observability:4318"
  OTEL_PROPAGATORS: "tracecontext,baggage"
  OTEL_TRACES_SAMPLER: "parentbased_traceidratio"
  OTEL_TRACES_SAMPLER_ARG: "0.1"  # Sample 10% of requests in production`}</code></pre>

      {/* Section 8: Data Management */}
      <h2 style={h2Style}>Data Management: Database per Service, CQRS, Event Sourcing</h2>
      <p style={pStyle}>
        Data management is where microservices architecture gets genuinely complex. The database-per-service pattern mandates that each service owns its data exclusively — no other service can access it directly via SQL or direct connections. This enables true independent evolution but creates challenges: cross-service queries require API calls or denormalized read models, and maintaining consistency across service boundaries without distributed transactions requires careful design using sagas, events, and eventual consistency.
      </p>

      <h3 style={h3Style}>Database per Service Pattern</h3>
      <pre style={codeStyle}><code>{`# Each service has its own database — completely isolated
# docker-compose.yml (or Kubernetes StatefulSets in production)

services:
  # Order service — PostgreSQL (ACID transactions, relational integrity)
  order-db:
    image: postgres:16-alpine
    volumes:
      - order-db-data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB:       orders
      POSTGRES_USER:     order_svc
      POSTGRES_PASSWORD: \${ORDER_DB_PASSWORD}
    networks:
      - order-network    # ONLY order-service connects here

  # Product catalog — MongoDB (flexible schema, fast reads, geo-queries)
  product-db:
    image: mongo:7
    volumes:
      - product-db-data:/data/db
    networks:
      - product-network  # Isolated to product-service

  # Auth sessions — Redis (in-memory, TTL-based expiry)
  auth-cache:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass \${REDIS_PASSWORD}
    networks:
      - auth-network

  # Search service — Elasticsearch (full-text, faceted search)
  search-db:
    image: elasticsearch:8.12.0
    environment:
      discovery.type: single-node
      ELASTIC_PASSWORD: \${ELASTIC_PASSWORD}
    networks:
      - search-network

  # Analytics — ClickHouse (columnar, fast aggregations, time-series)
  analytics-db:
    image: clickhouse/clickhouse-server:23.12
    networks:
      - analytics-network

networks:
  order-network:     { internal: true }  # No external internet access
  product-network:   { internal: true }
  auth-network:      { internal: true }
  search-network:    { internal: true }
  analytics-network: { internal: true }`}</code></pre>

      <h3 style={h3Style}>CQRS (Command Query Responsibility Segregation)</h3>
      <p style={pStyle}>
        CQRS separates the write model (commands that change state, optimized for consistency) from the read model (queries, optimized for performance and shape). This is powerful in microservices because different services can maintain their own read-optimized projections of data from other services, kept up-to-date by consuming domain events. The order-service owns the authoritative order data; the analytics-service maintains a denormalized ClickHouse projection optimized for reporting; the search-service maintains an Elasticsearch index for full-text search — all updated asynchronously from the same stream of order events.
      </p>
      <pre style={codeStyle}><code>{`// CQRS pattern — separating writes and reads

// ─── WRITE SIDE ─────────────────────────────────────────────
// Commands change state and publish events

interface CreateOrderCommand {
  customerId: string;
  items: Array<{ productId: string; quantity: number; unitPrice: number }>;
  shippingAddress: Address;
  idempotencyKey: string;
}

class OrderCommandHandler {
  async handle(cmd: CreateOrderCommand): Promise<{ orderId: string }> {
    // 1. Validate business invariants
    const totalAmount = cmd.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    if (totalAmount > 10_000) throw new BusinessError('Order exceeds limit');

    // 2. Write to normalized write DB (PostgreSQL)
    const order = await this.db.transaction(async (trx) => {
      const o = await trx.orders.insert({
        customer_id: cmd.customerId,
        status: 'PENDING',
        total_amount: totalAmount,
        idempotency_key: cmd.idempotencyKey,
      });
      await trx.order_items.insertMany(
        cmd.items.map(i => ({ order_id: o.id, ...i }))
      );
      return o;
    });

    // 3. Publish domain event — drives all read-model updates
    await this.kafka.produce('order-events', {
      eventType:   'ORDER_CREATED',
      orderId:     order.id,
      customerId:  cmd.customerId,
      items:       cmd.items,
      totalAmount,
      occurredAt:  new Date().toISOString(),
      version:     1,
    });

    return { orderId: order.id };
  }
}

// ─── READ SIDE ───────────────────────────────────────────────
// Each read model is a projection tailored to query needs

// Elasticsearch projection — powers the order search UI
class OrderSearchProjection {
  async onOrderCreated(event: OrderCreatedEvent): Promise<void> {
    // Fetch denormalized data (acceptable: read-side can call APIs)
    const [customer, products] = await Promise.all([
      this.customerApi.get(event.customerId),
      this.productApi.getBatch(event.items.map(i => i.productId)),
    ]);

    await this.elasticsearch.index({
      index: 'orders-v3',
      id:    event.orderId,
      body:  {
        orderId:       event.orderId,
        customerName:  customer.name,           // Denormalized
        customerEmail: customer.email,
        productNames:  products.map(p => p.name),
        totalAmount:   event.totalAmount,
        status:        'PENDING',
        createdAt:     event.occurredAt,
      },
    });
  }

  async onOrderShipped(event: OrderShippedEvent): Promise<void> {
    await this.elasticsearch.update({
      index: 'orders-v3',
      id:    event.orderId,
      body:  { doc: { status: 'SHIPPED', trackingNumber: event.trackingNumber } },
    });
  }
}

// Dashboard analytics projection — powers the ClickHouse reporting DB
class OrderAnalyticsProjection {
  async onOrderCreated(event: OrderCreatedEvent): Promise<void> {
    await this.clickhouse.insert('order_analytics', [{
      order_id:    event.orderId,
      customer_id: event.customerId,
      item_count:  event.items.length,
      total_usd:   event.totalAmount,
      event_date:  event.occurredAt.slice(0, 10),
      hour:        new Date(event.occurredAt).getUTCHours(),
    }]);
  }
}`}</code></pre>

      <h3 style={h3Style}>Event Sourcing</h3>
      <p style={pStyle}>
        Event Sourcing stores the complete history of state changes as an immutable sequence of events rather than the current state. Instead of an UPDATE orders SET status = 'SHIPPED', you append an OrderShipped event. The current state is always derived by replaying all events. Benefits include a complete audit trail, the ability to replay history and rebuild projections, temporal queries, and natural integration with CQRS. The trade-off is query complexity (you need projections for most reads) and storage growth over time (mitigated by snapshots).
      </p>
      <pre style={codeStyle}><code>{`// Event Sourcing — Order aggregate

type OrderEvent =
  | { type: 'ORDER_CREATED';   orderId: string; customerId: string; items: LineItem[] }
  | { type: 'PAYMENT_RECEIVED'; orderId: string; amount: number;   paymentId: string }
  | { type: 'ORDER_SHIPPED';   orderId: string; carrier: string;   trackingNumber: string }
  | { type: 'ORDER_DELIVERED'; orderId: string; deliveredAt: string }
  | { type: 'ORDER_CANCELLED'; orderId: string; reason: string;    refundId?: string };

interface OrderState {
  id: string;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  customerId: string;
  items: LineItem[];
  paymentId?: string;
  trackingNumber?: string;
  cancelReason?: string;
}

// Pure function — derives state from sequence of events
function applyEvent(state: OrderState, event: OrderEvent): OrderState {
  switch (event.type) {
    case 'ORDER_CREATED':
      return { ...state, status: 'PENDING', customerId: event.customerId, items: event.items };
    case 'PAYMENT_RECEIVED':
      return { ...state, status: 'PAID', paymentId: event.paymentId };
    case 'ORDER_SHIPPED':
      return { ...state, status: 'SHIPPED', trackingNumber: event.trackingNumber };
    case 'ORDER_DELIVERED':
      return { ...state, status: 'DELIVERED' };
    case 'ORDER_CANCELLED':
      return { ...state, status: 'CANCELLED', cancelReason: event.reason };
  }
}

class EventSourcedOrderRepository {
  async load(orderId: string): Promise<OrderState> {
    // Check for a recent snapshot to avoid replaying all events
    const snapshot = await this.snapshots.latest(orderId);
    const fromVersion = snapshot?.version ?? 0;

    const events = await this.eventStore.load(
      'orders',
      orderId,
      fromVersion
    );

    const initialState = snapshot?.state ?? ({ id: orderId } as OrderState);
    return events.reduce(applyEvent, initialState);
  }

  async append(orderId: string, events: OrderEvent[], expectedVersion: number): Promise<void> {
    // Optimistic concurrency — fail if another process wrote first
    await this.eventStore.appendWithVersion('orders', orderId, events, expectedVersion);

    // Publish to Kafka for projections (eventually consistent)
    await Promise.all(events.map(e => this.kafka.produce('order-events', e)));
  }
}`}</code></pre>

      {/* Section 9: Docker and Kubernetes */}
      <h2 style={h2Style}>Docker and Kubernetes for Microservices</h2>
      <p style={pStyle}>
        Docker provides the packaging format for microservices — each service is a container image with all its dependencies, running identically in development, CI, and production. Kubernetes orchestrates those containers at scale: scheduling pods onto nodes, maintaining desired replica counts, performing rolling updates with zero downtime, self-healing by restarting failed pods, and exposing services via stable DNS and load-balanced ClusterIP services.
      </p>

      <h3 style={h3Style}>Production Dockerfile</h3>
      <pre style={codeStyle}><code>{`# Multi-stage Dockerfile for a Node.js/TypeScript microservice
# Stage 1: Install production dependencies (cached layer)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Build TypeScript to JavaScript
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci                   # Install dev deps for build
COPY src/ ./src/
RUN npm run build            # Emit JS to dist/

# Stage 3: Minimal production image
FROM node:20-alpine AS runner
# Security: run as non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S appuser -u 1001 -G nodejs
WORKDIR /app

# Only copy what production needs
COPY --from=deps    --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:nodejs /app/dist ./dist
COPY --from=builder --chown=appuser:nodejs /app/package.json .

USER appuser
EXPOSE 8080

# Health check — Kubernetes will use /health/live and /health/ready
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:8080/health/live || exit 1

CMD ["node", "dist/server.js"]`}</code></pre>

      <h3 style={h3Style}>Kubernetes Manifests for a Microservice</h3>
      <pre style={codeStyle}><code>{`# Complete Kubernetes setup for order-service
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: production
  labels:
    app: order-service
    version: v2.1.0
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order-service
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1         # Spin up 1 extra pod before removing old
      maxUnavailable: 0   # Never reduce below desired replica count
  template:
    metadata:
      labels:
        app: order-service
        version: v2.1.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9090"
        prometheus.io/path: "/metrics"
    spec:
      serviceAccountName: order-service-sa
      containers:
        - name: order-service
          image: registry.mycompany.com/order-service:v2.1.0
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 8080
            - name: metrics
              containerPort: 9090
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: order-service-secrets
                  key: database-url
            - name: KAFKA_BROKERS
              valueFrom:
                configMapKeyRef:
                  name: kafka-config
                  key: brokers
            - name: OTEL_EXPORTER_OTLP_ENDPOINT
              value: "http://jaeger-collector.observability.svc:4318"
            - name: OTEL_SERVICE_NAME
              value: "order-service"
            - name: NODE_ENV
              value: "production"
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /health/ready
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 5
            failureThreshold: 3
          livenessProbe:
            httpGet:
              path: /health/live
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
            failureThreshold: 3
          startupProbe:
            httpGet:
              path: /health/live
              port: 8080
            failureThreshold: 30
            periodSeconds: 2    # Allow up to 60s for startup
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchLabels:
                  app: order-service
              topologyKey: kubernetes.io/hostname  # One pod per node
---
apiVersion: v1
kind: Service
metadata:
  name: order-service
  namespace: production
spec:
  selector:
    app: order-service
  ports:
    - name: http
      port: 80
      targetPort: 8080
  type: ClusterIP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
        - type: Pods
          value: 2
          periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300   # Wait 5 min before scaling down`}</code></pre>

      {/* Section 10: Security */}
      <h2 style={h2Style}>Security: Service Mesh, mTLS, and JWT Between Services</h2>
      <p style={pStyle}>
        Security in microservices requires a zero-trust model: assume the network is hostile, never trust a caller just because it is inside the cluster, require authentication and authorization for every service-to-service call. A compromised service should not be able to freely call any other service. The combination of a service mesh for transport-level security (mTLS) and application-level authorization (JWT claims, RBAC) provides defense in depth.
      </p>

      <h3 style={h3Style}>Istio Service Mesh with mTLS</h3>
      <pre style={codeStyle}><code>{`# Install Istio with production profile
istioctl install --set profile=production -y

# Enable automatic sidecar injection in the namespace
kubectl label namespace production istio-injection=enabled

# Enforce strict mTLS cluster-wide — reject all plaintext traffic
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT   # All service-to-service traffic must use mTLS

---
# Fine-grained authorization — only order-service can call payment endpoints
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: payment-service-authz
  namespace: production
spec:
  selector:
    matchLabels:
      app: payment-service
  action: ALLOW
  rules:
    - from:
        - source:
            # Only traffic from order-service's service account is allowed
            principals:
              - "cluster.local/ns/production/sa/order-service-sa"
      to:
        - operation:
            methods: ["POST"]
            paths: ["/api/v1/payments", "/api/v1/payments/*"]

---
# Default deny — reject all unlisted traffic
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: deny-all
  namespace: production
spec:
  {}   # Empty spec = deny all (explicit allow rules override this)

---
# Canary deployment with traffic splitting
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service-vs
  namespace: production
spec:
  hosts: [order-service]
  http:
    - route:
        - destination: { host: order-service, subset: stable }
          weight: 90
        - destination: { host: order-service, subset: canary }
          weight: 10
      timeout: 10s
      retries:
        attempts: 3
        perTryTimeout: 3s
        retryOn: gateway-error,connect-failure,retriable-4xx
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: order-service-dr
  namespace: production
spec:
  host: order-service
  trafficPolicy:
    connectionPool:
      http:
        h2UpgradePolicy: UPGRADE  # Use HTTP/2
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
  subsets:
    - name: stable
      labels: { version: v2.1.0 }
    - name: canary
      labels: { version: v2.2.0-rc1 }`}</code></pre>

      <h3 style={h3Style}>Service-to-Service JWT Authentication</h3>
      <pre style={codeStyle}><code>{`// Pattern: short-lived service tokens issued by a central auth service

// auth-service: issue tokens to other services
async function issueServiceToken(
  callerService: string,
  targetService: string
): Promise<string> {
  return jwt.sign(
    {
      iss: 'auth-service.production.svc',
      sub: callerService,          // WHO is calling
      aud: targetService,          // WHO is being called
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 300,  // 5-minute lifetime
      scope: 'service-call',
    },
    process.env.SERVICE_SIGNING_KEY!,
    { algorithm: 'RS256', keyid: currentKeyId }
  );
}

// Middleware: validate incoming service tokens (in payment-service)
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: 'http://auth-service/.well-known/jwks.json',
  cache: true,
  cacheMaxEntries: 10,
  cacheMaxAge: 600_000,  // Cache JWKS for 10 minutes
});

async function validateServiceToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'missing_token' });
  }
  const token = authHeader.slice(7);

  try {
    const decoded = jwt.decode(token, { complete: true }) as any;
    const key = await client.getSigningKey(decoded?.header?.kid);
    const publicKey = key.getPublicKey();

    const payload = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      audience: 'payment-service',       // This service's name
      issuer: 'auth-service.production.svc',
    }) as ServiceTokenPayload;

    req.callerService = payload.sub;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid_token', detail: (err as Error).message });
  }
}

// Client-side: token caching to avoid auth-service call on every request
class ServiceTokenManager {
  private tokens = new Map<string, { value: string; expiresAt: number }>();

  async getToken(targetService: string): Promise<string> {
    const entry = this.tokens.get(targetService);
    if (entry && entry.expiresAt - Date.now() > 30_000) {  // 30s buffer
      return entry.value;
    }
    const token = await this.authClient.issueToken(targetService);
    const payload = jwt.decode(token) as { exp: number };
    this.tokens.set(targetService, {
      value: token,
      expiresAt: payload.exp * 1000,
    });
    return token;
  }
}`}</code></pre>

      {/* Section 11: Monitoring */}
      <h2 style={h2Style}>Monitoring and Observability: Prometheus and Grafana</h2>
      <p style={pStyle}>
        The three pillars of observability in microservices are metrics, logs, and traces. Metrics (Prometheus) provide aggregate numerical data — request rates, error rates, latency percentiles, resource usage. Logs (Loki, ELK) provide detailed contextual records of individual events. Traces (Jaeger) show request flow across services. Grafana provides unified dashboards and alerting across all three. The four golden signals — latency, traffic, errors, and saturation — should be monitored for every service with automated alerts when thresholds are breached.
      </p>
      <pre style={codeStyle}><code>{`# prometheus.yml — Kubernetes service discovery
global:
  scrape_interval:     15s
  evaluation_interval: 15s
  external_labels:
    cluster: production-us-east
    region:  us-east-1

rule_files:
  - /etc/prometheus/rules/microservices.yml

alerting:
  alertmanagers:
    - static_configs:
        - targets: [alertmanager.monitoring:9093]

scrape_configs:
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: [production, staging]
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: "true"
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__meta_kubernetes_pod_ip,
                        __meta_kubernetes_pod_annotation_prometheus_io_port]
        target_label: __address__
        regex: (.+);(.+)
        replacement: "\$1:\$2"
      - source_labels: [__meta_kubernetes_namespace]
        target_label: namespace
      - source_labels: [__meta_kubernetes_pod_label_app]
        target_label: service`}</code></pre>

      <pre style={codeStyle}><code>{`# Alerting rules — microservices golden signals
# /etc/prometheus/rules/microservices.yml
groups:
  - name: microservices.golden_signals
    interval: 30s
    rules:
      # Error rate > 5% for 2 minutes
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m])) by (service, namespace)
          /
          sum(rate(http_requests_total[5m])) by (service, namespace) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate on {{ \$labels.service }}"
          description: "Error rate is {{ \$value | humanizePercentage }} (threshold 5%)"
          runbook: "https://runbooks.mycompany.com/high-error-rate"

      # p99 latency > 1s for 5 minutes
      - alert: HighLatencyP99
        expr: |
          histogram_quantile(0.99,
            sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service)
          ) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High p99 latency on {{ \$labels.service }}"
          description: "p99 latency is {{ \$value | humanizeDuration }}"

      # Service is completely down
      - alert: ServiceDown
        expr: up{job="kubernetes-pods"} == 0
        for: 1m
        labels:
          severity: critical
          pagerduty: "true"
        annotations:
          summary: "Service {{ \$labels.service }} is down"

      # Circuit breaker is open
      - alert: CircuitBreakerOpen
        expr: circuit_breaker_state{state="open"} == 1
        for: 30s
        labels:
          severity: warning
        annotations:
          summary: "Circuit breaker open: {{ \$labels.service }} -> {{ \$labels.target }}"

# Node.js service exposing Prometheus metrics
import { Registry, Counter, Histogram, Gauge, Summary } from 'prom-client';

const register = new Registry();
register.setDefaultLabels({ service: 'order-service', environment: 'production' });

export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

export const httpLatency = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  registers: [register],
});

export const ordersTotal = new Counter({
  name: 'orders_created_total',
  help: 'Total orders created',
  labelNames: ['status', 'payment_method', 'region'],
  registers: [register],
});

export const activeOrders = new Gauge({
  name: 'active_orders_gauge',
  help: 'Currently active (non-terminal) orders',
  registers: [register],
});

// Instrument all routes automatically
app.use((req, res, next) => {
  const timer = httpLatency.startTimer();
  res.on('finish', () => {
    const route = req.route?.path ?? 'unknown';
    const labels = { method: req.method, route, status_code: String(res.statusCode) };
    httpRequestsTotal.inc(labels);
    timer(labels);
  });
  next();
});

app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});`}</code></pre>

      {/* Section 12: Comparison Table */}
      <h2 style={h2Style}>Architecture Comparison: Monolith vs Microservices vs Serverless</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Attribute</th>
            <th style={thStyle}>Monolith</th>
            <th style={thStyle}>Microservices</th>
            <th style={thStyle}>Serverless</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Deployment unit', 'Single artifact', 'Per-service containers', 'Individual functions'],
            ['Scaling', 'Entire app scales together', 'Per-service horizontal scaling', 'Auto-scales to zero'],
            ['Latency', 'No network overhead', 'Network hops between services', 'Cold start latency (100ms–3s)'],
            ['Development speed', 'Fast initially, slows with growth', 'Parallel team development', 'Very fast for simple workflows'],
            ['Operational complexity', 'Low — one process to manage', 'High — many services, k8s, mesh', 'Low ops, high vendor lock-in'],
            ['Data management', 'Shared relational database', 'Database per service', 'Typically shared or per-function'],
            ['Technology choice', 'One language and framework', 'Per-service technology freedom', 'Runtime-constrained by provider'],
            ['Cost model', 'Fixed (servers always running)', 'Fixed (pods always running)', 'Pay-per-invocation (spiky is cheap)'],
            ['Fault isolation', 'One bug can crash everything', 'Failures are service-scoped', 'Functions are isolated by default'],
            ['Testing strategy', 'Unit + integration locally', 'Contract testing (Pact) required', 'Mock cloud services (LocalStack)'],
            ['Observability', 'Simple logging and metrics', 'Distributed tracing essential', 'Cloud vendor tools (CloudWatch, X-Ray)'],
            ['Best fit', 'Small teams, early product', 'Large teams, complex domain', 'Event-driven, bursty, scheduled tasks'],
          ].map(([attr, mono, micro, serverless], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{attr}</td>
              <td style={tdStyle}>{mono}</td>
              <td style={tdStyle}>{micro}</td>
              <td style={tdStyle}>{serverless}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conclusion */}
      <h2 style={h2Style}>Conclusion</h2>
      <p style={pStyle}>
        Microservices architecture is a powerful tool for building large-scale, maintainable systems — but it is not a silver bullet and it is not appropriate for every team or every stage of a product. The distributed nature introduces real, unavoidable complexity: network failures, eventual consistency, distributed tracing, and operational overhead that can overwhelm teams without the organizational maturity to manage it.
      </p>
      <p style={pStyle}>
        The key is to adopt microservices patterns incrementally, driven by real organizational and technical needs. Start with a well-structured monolith that follows domain boundaries in its module structure. When team size creates coordination friction or when scaling requirements diverge, extract services — starting with those that change most frequently or have the most distinct scaling needs. Add an API Gateway early to centralize cross-cutting concerns. Instrument everything with OpenTelemetry from day one; debugging distributed systems without tracing is extraordinarily painful. Use circuit breakers on every external call and define fallback behaviors before you need them. Give each service its own database and embrace eventual consistency through well-defined events. Deploy on Kubernetes for resilience, layer Istio for zero-trust security, and monitor with Prometheus and Grafana. When these patterns are applied thoughtfully, microservices enable teams to move fast at scale — independently, safely, and with confidence in each deployment.
      </p>

      {/* FAQ */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>
      {[
        {
          q: 'What is microservices architecture?',
          a: 'Microservices architecture is a software design approach where an application is built as a collection of small, independently deployable services. Each service runs in its own process, owns its own data, communicates via well-defined APIs, and can be developed, deployed, and scaled by an independent team.',
        },
        {
          q: 'When should I use microservices over a monolith?',
          a: 'Use microservices when your team is large enough to work on independent services (typically 3+ teams), when different parts of your system have divergent scaling requirements, when you need independent deployment cycles, or when you require technology diversity. Start with a monolith for small teams or early-stage products — a well-structured monolith is easier to migrate later than a poorly designed distributed system.',
        },
        {
          q: 'What is the difference between REST, gRPC, and message queues?',
          a: 'REST uses HTTP/JSON for synchronous request-response communication — human-readable, universally supported, ideal for public APIs. gRPC uses HTTP/2 and Protocol Buffers for high-performance binary synchronous calls with strong typing — ideal for internal service calls. Message queues (RabbitMQ, Kafka) enable asynchronous, decoupled communication — the sender does not wait for a response, suitable for event-driven workflows and eventual consistency.',
        },
        {
          q: 'What is an API Gateway and why do I need one?',
          a: 'An API Gateway is the single entry point for all external requests to your microservices. It centralizes authentication, rate limiting, SSL termination, request routing, logging, and caching — concerns that would otherwise need to be duplicated in every service. Without it, clients must know the address of every service and each service must implement its own auth and rate limiting.',
        },
        {
          q: 'What is the circuit breaker pattern?',
          a: 'The circuit breaker prevents cascade failures by stopping outbound calls to a failing service after a failure threshold is reached. In the Open state, calls fail immediately without hitting the network, allowing the downstream service time to recover. After a reset timeout, it enters Half-Open state and tests with a small number of calls. Resilience4j (Java) and opossum (Node.js) are popular implementations.',
        },
        {
          q: 'How do microservices handle data management and cross-service queries?',
          a: 'Each service owns its own database exclusively (database-per-service pattern). Cross-service queries are handled through CQRS: each service maintains a read-model projection updated by consuming events from other services. Distributed transactions use the Saga pattern — a sequence of local transactions coordinated by events — rather than two-phase commit, which does not scale.',
        },
        {
          q: 'What is distributed tracing and how does OpenTelemetry help?',
          a: 'Distributed tracing tracks a request as it flows through multiple services, recording timing and context at each step. OpenTelemetry is the vendor-neutral CNCF standard that provides language SDKs, auto-instrumentation, and exporters for traces, metrics, and logs. It sends data to backends like Jaeger (open-source) or commercial vendors (Datadog, New Relic, Grafana Tempo) without vendor lock-in.',
        },
        {
          q: 'How does Istio improve microservices security?',
          a: 'Istio injects an Envoy sidecar proxy into every pod, handling all network traffic without code changes. It enforces mTLS (mutual TLS) for encrypted, mutually-authenticated service-to-service communication, implements fine-grained authorization policies specifying which services can call which endpoints, provides traffic management for canary deployments, and generates telemetry for all service communication.',
        },
      ].map((faq, i) => (
        <details
          key={i}
          style={{
            marginBottom: 12,
            padding: '12px 16px',
            background: 'var(--bg-input)',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
          }}
        >
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>
            {faq.q}
          </summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {faq.a}
          </p>
        </details>
      ))}
    </article>
  );
}
