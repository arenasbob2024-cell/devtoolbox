'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Event-Driven Architecture Guide: Kafka, RabbitMQ, Event Sourcing, CQRS, Sagas & Stream Processing',
    description:
      'Master event-driven architecture — Apache Kafka deep dive, RabbitMQ patterns, event sourcing with projections and snapshots, CQRS command/query separation, saga orchestration vs choreography, async messaging patterns, schema evolution (Avro/Protobuf), serverless event processing, stream processing with Kafka Streams and Flink, testing strategies, and monitoring with distributed tracing.',
  },
  zh: {
    title: '事件驱动架构完全指南：Kafka、RabbitMQ、事件溯源、CQRS、Saga 与流处理',
    description:
      '全面掌握事件驱动架构 — Apache Kafka 深入剖析、RabbitMQ 模式、事件溯源（投影与快照）、CQRS 命令/查询分离、Saga 编排与协调、异步消息模式、Schema 演进（Avro/Protobuf）、无服务器事件处理、Kafka Streams 和 Flink 流处理、测试策略及分布式追踪监控。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is event-driven architecture and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Event-driven architecture (EDA) is a software design pattern where state changes are captured as immutable events and propagated asynchronously between loosely coupled services. Use EDA when you need temporal decoupling between producers and consumers, high throughput and scalability, real-time data processing, audit trails, or when multiple downstream services need to react to the same business event independently.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Apache Kafka and RabbitMQ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kafka is a distributed log designed for high-throughput event streaming with persistent storage, consumer groups, and replay capability. RabbitMQ is a traditional message broker optimized for flexible routing, message acknowledgment, and complex exchange patterns. Use Kafka for event sourcing, stream processing, and high-volume data pipelines. Use RabbitMQ for task queues, RPC-style communication, and scenarios requiring complex routing logic with exchanges.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is event sourcing and how does it differ from traditional CRUD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Event sourcing stores every state change as an immutable event in an append-only event store, rather than overwriting the current state in a database. The current state is derived by replaying events. This provides a complete audit trail, enables temporal queries, supports event replay for debugging, and allows building multiple read-optimized projections. Traditional CRUD only stores the latest state and loses change history.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is CQRS and why combine it with event sourcing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CQRS (Command Query Responsibility Segregation) separates write operations (commands) from read operations (queries) into distinct models. When combined with event sourcing, commands produce events that are stored in the event store, and projections consume these events to build read-optimized views. This allows independent scaling of reads and writes, optimized query models, and eventual consistency between write and read sides.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the saga pattern for distributed transactions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The saga pattern manages distributed transactions across multiple microservices by breaking them into a sequence of local transactions, each paired with a compensating action for rollback. Orchestration uses a central coordinator to direct the saga steps. Choreography uses events where each service listens for events and triggers the next step. Use orchestration for complex workflows with many steps, and choreography for simpler flows with fewer services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I handle schema evolution in event-driven systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use a schema registry (Confluent Schema Registry) with serialization formats like Avro or Protobuf that support schema evolution. Follow compatibility rules: backward compatibility allows new consumers to read old events, forward compatibility allows old consumers to read new events. Always add optional fields with defaults, never remove required fields, and version your event schemas. Use the schema registry to enforce compatibility checks at publish time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I test event-driven systems effectively?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use contract testing to verify event schemas between producers and consumers. Use embedded brokers (EmbeddedKafka, TestContainers) for integration tests. Implement event replay testing by storing known event sequences and verifying projections produce correct state. Use consumer-driven contract testing with tools like Pact. For resilience, apply chaos engineering to simulate broker failures, network partitions, and consumer lag.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I monitor and observe event-driven architectures?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monitor consumer lag (difference between latest offset and consumer offset) as the primary health indicator. Use distributed tracing (OpenTelemetry) to propagate correlation IDs through event headers across service boundaries. Set up dead letter queue monitoring with alerts for poison messages. Track end-to-end latency from event production to final consumption. Use tools like Kafka Manager, Grafana with Prometheus exporters, and Jaeger for trace visualization.',
      },
    },
  ],
};

export default function EventDrivenArchitectureGuide({ lang }: { lang: string }) {
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
          {isZh ? 'TL;DR — 60 秒速览事件驱动架构' : 'TL;DR — Event-Driven Architecture in 60 Seconds'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.9' }}>
          <li>{isZh ? '事件是不可变的事实记录，描述"已经发生的事情"' : 'Events are immutable facts describing "something that happened"'}</li>
          <li>{isZh ? 'Kafka 用于高吞吐事件流和持久化日志，RabbitMQ 用于灵活路由和任务队列' : 'Kafka for high-throughput event streaming and durable logs; RabbitMQ for flexible routing and task queues'}</li>
          <li>{isZh ? '事件溯源存储每次状态变更为不可变事件，通过重放推导当前状态' : 'Event sourcing stores every state change as an immutable event; replay to derive current state'}</li>
          <li>{isZh ? 'CQRS 分离读写模型，允许各自独立优化和扩展' : 'CQRS separates read and write models, allowing each to scale and optimize independently'}</li>
          <li>{isZh ? 'Saga 模式处理分布式事务 — 编排式用于复杂工作流，协调式用于松耦合' : 'Saga pattern for distributed transactions — orchestration for complex flows, choreography for loose coupling'}</li>
          <li>{isZh ? '使用 Avro/Protobuf + Schema Registry 管理事件 Schema 演进' : 'Use Avro/Protobuf + Schema Registry for event schema evolution'}</li>
          <li>{isZh ? 'Kafka Streams / Flink 实现有状态流处理（窗口、聚合、Join）' : 'Kafka Streams / Flink for stateful stream processing (windowing, aggregation, joins)'}</li>
          <li>{isZh ? '监控消费者延迟、死信队列和端到端延迟作为核心健康指标' : 'Monitor consumer lag, dead letter queues, and end-to-end latency as core health indicators'}</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ fontSize: '1rem', color: '#334155', display: 'block', marginBottom: '10px' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
          <li>{isZh ? '事件驱动架构通过异步通信实现服务间的时间和空间解耦' : 'EDA achieves temporal and spatial decoupling between services via async communication'}</li>
          <li>{isZh ? 'Kafka 的分区和消费者组模型天然支持水平扩展和消息重放' : 'Kafka partitions and consumer groups natively support horizontal scaling and message replay'}</li>
          <li>{isZh ? 'RabbitMQ 的交换器类型（direct/topic/fanout/headers）提供灵活的消息路由' : 'RabbitMQ exchange types (direct/topic/fanout/headers) provide flexible message routing'}</li>
          <li>{isZh ? '事件溯源 + 投影 = 完整审计日志 + 多视图读取优化' : 'Event sourcing + projections = full audit trail + multi-view read optimization'}</li>
          <li>{isZh ? 'Schema 演进需要向后兼容规则：只添加可选字段，从不删除必需字段' : 'Schema evolution requires backward compatibility: only add optional fields, never remove required ones'}</li>
          <li>{isZh ? '使用合约测试、嵌入式代理和事件重放确保系统正确性' : 'Use contract testing, embedded brokers, and event replay to ensure system correctness'}</li>
          <li>{isZh ? '分布式追踪（OpenTelemetry）+ 消费者延迟监控是可观测性的两大支柱' : 'Distributed tracing (OpenTelemetry) + consumer lag monitoring are the two pillars of observability'}</li>
        </ul>
      </div>

      {/* Section 1: Fundamentals */}
      <h2 style={h2Style}>
        {isZh ? '1. 事件驱动架构基础' : '1. Event-Driven Architecture Fundamentals'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '事件驱动架构（EDA）是一种软件设计范式，系统通过产生和消费事件来进行通信。事件代表状态的变化——"已经发生的事实"。与请求-响应模型不同，EDA 中的生产者不知道也不关心谁消费了事件。'
          : 'Event-driven architecture (EDA) is a software design paradigm where systems communicate by producing and consuming events. An event represents a state change — a fact that has already occurred. Unlike request-response models, producers in EDA do not know or care who consumes their events.'}
      </p>

      <h3 style={h3Style}>{isZh ? '核心概念' : 'Core Concepts'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '概念' : 'Concept'}</th>
            <th style={thStyle}>{isZh ? '描述' : 'Description'}</th>
            <th style={thStyle}>{isZh ? '示例' : 'Example'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '事件' : 'Event'}</strong></td>
            <td style={tdStyle}>{isZh ? '不可变的事实记录，描述过去发生的状态变更' : 'Immutable fact recording a past state change'}</td>
            <td style={tdStyle}>OrderPlaced, UserRegistered</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '命令' : 'Command'}</strong></td>
            <td style={tdStyle}>{isZh ? '请求执行某个操作的意图（可能被拒绝）' : 'Intent to perform an action (may be rejected)'}</td>
            <td style={tdStyle}>PlaceOrder, RegisterUser</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '查询' : 'Query'}</strong></td>
            <td style={tdStyle}>{isZh ? '请求数据但不修改状态' : 'Request data without modifying state'}</td>
            <td style={tdStyle}>GetOrderById, ListUsers</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '事件总线' : 'Event Bus'}</strong></td>
            <td style={tdStyle}>{isZh ? '事件的传输通道，连接生产者和消费者' : 'Transport channel connecting producers and consumers'}</td>
            <td style={tdStyle}>Kafka, RabbitMQ, NATS</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '生产者' : 'Producer'}</strong></td>
            <td style={tdStyle}>{isZh ? '发布事件的服务或组件' : 'Service or component that publishes events'}</td>
            <td style={tdStyle}>Order Service, Payment Service</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '消费者' : 'Consumer'}</strong></td>
            <td style={tdStyle}>{isZh ? '订阅并处理事件的服务或组件' : 'Service or component that subscribes to and processes events'}</td>
            <td style={tdStyle}>Notification Service, Analytics</td>
          </tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'// Event interface — the foundation of EDA\n'
        + 'interface DomainEvent {\n'
        + '  eventId: string;           // Unique event identifier (UUID)\n'
        + '  eventType: string;         // e.g., "OrderPlaced"\n'
        + '  aggregateId: string;       // ID of the entity that produced the event\n'
        + '  aggregateType: string;     // e.g., "Order"\n'
        + '  timestamp: string;         // ISO 8601 timestamp\n'
        + '  version: number;           // Schema version for evolution\n'
        + '  payload: Record<string, unknown>;\n'
        + '  metadata: {\n'
        + '    correlationId: string;   // Traces a request across services\n'
        + '    causationId: string;     // ID of the event/command that caused this\n'
        + '    userId?: string;\n'
        + '  };\n'
        + '}\n\n'
        + '// Example: OrderPlaced event\n'
        + 'const orderPlaced: DomainEvent = {\n'
        + '  eventId: "evt-a1b2c3d4",\n'
        + '  eventType: "OrderPlaced",\n'
        + '  aggregateId: "order-12345",\n'
        + '  aggregateType: "Order",\n'
        + '  timestamp: "2026-02-28T10:30:00Z",\n'
        + '  version: 1,\n'
        + '  payload: {\n'
        + '    customerId: "cust-67890",\n'
        + '    items: [\n'
        + '      { productId: "prod-001", quantity: 2, price: 29.99 },\n'
        + '      { productId: "prod-002", quantity: 1, price: 49.99 },\n'
        + '    ],\n'
        + '    totalAmount: 109.97,\n'
        + '    currency: "USD",\n'
        + '  },\n'
        + '  metadata: {\n'
        + '    correlationId: "corr-xyz-789",\n'
        + '    causationId: "cmd-place-order-456",\n'
        + '    userId: "user-abc",\n'
        + '  },\n'
        + '};'}</code></pre>

      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '事件名称使用过去时（OrderPlaced 而非 OrderPlace），因为事件描述的是已经发生的事实。命令使用祈使句（PlaceOrder），因为命令表达的是意图。'
          : 'Name events in past tense (OrderPlaced, not OrderPlace) because events describe facts that already happened. Name commands in imperative form (PlaceOrder) because they express intent.'}
      </div>

      {/* Section 2: Kafka Deep Dive */}
      <h2 style={h2Style}>
        {isZh ? '2. Apache Kafka 深入剖析' : '2. Apache Kafka Deep Dive'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Apache Kafka 是一个分布式事件流平台，设计用于高吞吐量、持久化和可重放的事件处理。Kafka 将数据组织为主题（Topics），每个主题分为多个分区（Partitions），实现并行处理和水平扩展。'
          : 'Apache Kafka is a distributed event streaming platform designed for high-throughput, durable, and replayable event processing. Kafka organizes data into topics, each divided into partitions for parallel processing and horizontal scaling.'}
      </p>

      <h3 style={h3Style}>{isZh ? '主题、分区和消费者组' : 'Topics, Partitions, and Consumer Groups'}</h3>
      <pre style={preStyle}><code>{'// Kafka producer — Node.js with kafkajs\n'
        + 'import { Kafka, Partitioners } from "kafkajs";\n\n'
        + 'const kafka = new Kafka({\n'
        + '  clientId: "order-service",\n'
        + '  brokers: ["kafka-1:9092", "kafka-2:9092", "kafka-3:9092"],\n'
        + '});\n\n'
        + 'const producer = kafka.producer({\n'
        + '  createPartitioner: Partitioners.DefaultPartitioner,\n'
        + '  idempotent: true,            // Enable exactly-once semantics\n'
        + '  maxInFlightRequests: 5,\n'
        + '  transactionalId: "order-producer-txn",\n'
        + '});\n\n'
        + 'async function publishOrderEvent(order: Order): Promise<void> {\n'
        + '  await producer.connect();\n\n'
        + '  // Key determines partition — same orderId always goes to same partition\n'
        + '  await producer.send({\n'
        + '    topic: "orders.events",\n'
        + '    messages: [\n'
        + '      {\n'
        + '        key: order.id,\n'
        + '        value: JSON.stringify({\n'
        + '          eventType: "OrderPlaced",\n'
        + '          payload: order,\n'
        + '          timestamp: new Date().toISOString(),\n'
        + '        }),\n'
        + '        headers: {\n'
        + '          "correlation-id": order.correlationId,\n'
        + '          "event-type": "OrderPlaced",\n'
        + '          "schema-version": "1",\n'
        + '        },\n'
        + '      },\n'
        + '    ],\n'
        + '  });\n'
        + '}'}</code></pre>

      <pre style={preStyle}><code>{'// Kafka consumer with consumer group\n'
        + 'const consumer = kafka.consumer({\n'
        + '  groupId: "inventory-service-group",\n'
        + '  sessionTimeout: 30000,\n'
        + '  heartbeatInterval: 3000,\n'
        + '  maxBytesPerPartition: 1048576, // 1MB\n'
        + '});\n\n'
        + 'async function startConsumer(): Promise<void> {\n'
        + '  await consumer.connect();\n'
        + '  await consumer.subscribe({\n'
        + '    topics: ["orders.events"],\n'
        + '    fromBeginning: false,\n'
        + '  });\n\n'
        + '  await consumer.run({\n'
        + '    eachMessage: async ({ topic, partition, message }) => {\n'
        + '      const event = JSON.parse(message.value!.toString());\n'
        + '      const correlationId = message.headers?.["correlation-id"]?.toString();\n\n'
        + '      console.log(\n'
        + '        `[Partition \\${partition}] Processing \\${event.eventType}`,\n'
        + '        `offset=\\${message.offset}, key=\\${message.key}`\n'
        + '      );\n\n'
        + '      switch (event.eventType) {\n'
        + '        case "OrderPlaced":\n'
        + '          await reserveInventory(event.payload);\n'
        + '          break;\n'
        + '        case "OrderCancelled":\n'
        + '          await releaseInventory(event.payload);\n'
        + '          break;\n'
        + '        default:\n'
        + '          console.warn(`Unknown event type: \\${event.eventType}`);\n'
        + '      }\n'
        + '    },\n'
        + '  });\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Kafka 精确一次语义' : 'Kafka Exactly-Once Semantics'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Kafka 通过幂等生产者和事务 API 实现精确一次语义（EOS），确保消息在生产者重试时不会重复写入，并且消费者可以在事务提交后才看到消息。'
          : 'Kafka achieves exactly-once semantics (EOS) through idempotent producers and the transactional API, ensuring messages are not duplicated on producer retries and consumers only see messages after transaction commit.'}
      </p>
      <pre style={preStyle}><code>{'// Exactly-once: transactional produce + consume\n'
        + 'async function processAndForward(inputTopic: string, outputTopic: string) {\n'
        + '  const transaction = await producer.transaction();\n\n'
        + '  try {\n'
        + '    // Read from input topic\n'
        + '    const messages = await consumeBatch(inputTopic);\n\n'
        + '    for (const msg of messages) {\n'
        + '      const enriched = await enrichEvent(msg);\n\n'
        + '      // Write to output topic within the same transaction\n'
        + '      await transaction.send({\n'
        + '        topic: outputTopic,\n'
        + '        messages: [{ key: msg.key, value: JSON.stringify(enriched) }],\n'
        + '      });\n'
        + '    }\n\n'
        + '    // Commit offsets and produced messages atomically\n'
        + '    await transaction.sendOffsets({\n'
        + '      consumerGroupId: "enrichment-group",\n'
        + '      topics: [{ topic: inputTopic, partitions: messages.map(m => ({\n'
        + '        partition: m.partition,\n'
        + '        offset: (parseInt(m.offset) + 1).toString(),\n'
        + '      }))}],\n'
        + '    });\n\n'
        + '    await transaction.commit();\n'
        + '  } catch (err) {\n'
        + '    await transaction.abort();\n'
        + '    throw err;\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Section 3: RabbitMQ Patterns */}
      <h2 style={h2Style}>
        {isZh ? '3. RabbitMQ 消息模式' : '3. RabbitMQ Patterns'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'RabbitMQ 是一个功能丰富的消息代理，通过交换器（Exchange）和队列（Queue）提供灵活的路由模式。它支持多种交换器类型，每种适用于不同的消息路由场景。'
          : 'RabbitMQ is a feature-rich message broker that provides flexible routing through exchanges and queues. It supports multiple exchange types, each suited for different messaging scenarios.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '交换器类型' : 'Exchange Type'}</th>
            <th style={thStyle}>{isZh ? '路由方式' : 'Routing'}</th>
            <th style={thStyle}>{isZh ? '使用场景' : 'Use Case'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>Direct</strong></td>
            <td style={tdStyle}>{isZh ? '精确匹配 routing key' : 'Exact routing key match'}</td>
            <td style={tdStyle}>{isZh ? '任务分发、日志分级' : 'Task distribution, log levels'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Topic</strong></td>
            <td style={tdStyle}>{isZh ? '通配符模式匹配 routing key' : 'Wildcard pattern match on routing key'}</td>
            <td style={tdStyle}>{isZh ? '多租户事件、地理路由' : 'Multi-tenant events, geo routing'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Fanout</strong></td>
            <td style={tdStyle}>{isZh ? '广播到所有绑定的队列' : 'Broadcast to all bound queues'}</td>
            <td style={tdStyle}>{isZh ? '通知、缓存失效' : 'Notifications, cache invalidation'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Headers</strong></td>
            <td style={tdStyle}>{isZh ? '基于消息头属性匹配' : 'Match on message header attributes'}</td>
            <td style={tdStyle}>{isZh ? '复杂路由规则、内容类型路由' : 'Complex routing, content-type routing'}</td>
          </tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'// RabbitMQ with amqplib — Topic exchange + Dead Letter Queue\n'
        + 'import amqp from "amqplib";\n\n'
        + 'async function setupRabbitMQ() {\n'
        + '  const connection = await amqp.connect("amqp://localhost:5672");\n'
        + '  const channel = await connection.createChannel();\n\n'
        + '  // Dead letter exchange for failed messages\n'
        + '  await channel.assertExchange("dlx.events", "fanout", { durable: true });\n'
        + '  await channel.assertQueue("dlq.events", {\n'
        + '    durable: true,\n'
        + '    arguments: { "x-message-ttl": 86400000 }, // 24h retention\n'
        + '  });\n'
        + '  await channel.bindQueue("dlq.events", "dlx.events", "");\n\n'
        + '  // Main topic exchange\n'
        + '  await channel.assertExchange("domain.events", "topic", { durable: true });\n\n'
        + '  // Order events queue with DLQ\n'
        + '  await channel.assertQueue("order.processing", {\n'
        + '    durable: true,\n'
        + '    arguments: {\n'
        + '      "x-dead-letter-exchange": "dlx.events",\n'
        + '      "x-dead-letter-routing-key": "order.failed",\n'
        + '      "x-max-retries": 3,\n'
        + '    },\n'
        + '  });\n\n'
        + '  // Bind queue with topic pattern\n'
        + '  // order.* matches order.placed, order.shipped, etc.\n'
        + '  await channel.bindQueue("order.processing", "domain.events", "order.*");\n\n'
        + '  // Publish an event\n'
        + '  channel.publish(\n'
        + '    "domain.events",\n'
        + '    "order.placed",\n'
        + '    Buffer.from(JSON.stringify({\n'
        + '      eventType: "OrderPlaced",\n'
        + '      orderId: "order-12345",\n'
        + '      timestamp: new Date().toISOString(),\n'
        + '    })),\n'
        + '    {\n'
        + '      persistent: true,\n'
        + '      messageId: "msg-uuid-123",\n'
        + '      contentType: "application/json",\n'
        + '      headers: { "x-retry-count": 0 },\n'
        + '    }\n'
        + '  );\n\n'
        + '  // Consumer with manual acknowledgment\n'
        + '  await channel.prefetch(10); // Process 10 messages at a time\n'
        + '  await channel.consume("order.processing", async (msg) => {\n'
        + '    if (!msg) return;\n'
        + '    try {\n'
        + '      const event = JSON.parse(msg.content.toString());\n'
        + '      await processOrderEvent(event);\n'
        + '      channel.ack(msg); // Acknowledge success\n'
        + '    } catch (err) {\n'
        + '      const retryCount = (msg.properties.headers?.["x-retry-count"] || 0) + 1;\n'
        + '      if (retryCount >= 3) {\n'
        + '        channel.nack(msg, false, false); // Send to DLQ\n'
        + '      } else {\n'
        + '        channel.nack(msg, false, true);   // Requeue for retry\n'
        + '      }\n'
        + '    }\n'
        + '  });\n'
        + '}'}</code></pre>

      {/* Section 4: Event Sourcing */}
      <h2 style={h2Style}>
        {isZh ? '4. 事件溯源' : '4. Event Sourcing'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '事件溯源将状态存储为一系列不可变事件，而非仅保存当前状态。当前状态通过按顺序重放事件来推导。这提供了完整的审计日志、时间旅行查询能力，以及从事件流构建多个读取优化视图的能力。'
          : 'Event sourcing stores state as a sequence of immutable events rather than just the current state. Current state is derived by replaying events in order. This provides a complete audit trail, time-travel query capability, and the ability to build multiple read-optimized views from the event stream.'}
      </p>

      <h3 style={h3Style}>{isZh ? '事件存储实现' : 'Event Store Implementation'}</h3>
      <pre style={preStyle}><code>{'// Event Store — append-only with optimistic concurrency\n'
        + 'interface StoredEvent {\n'
        + '  streamId: string;\n'
        + '  version: number;\n'
        + '  eventType: string;\n'
        + '  payload: Record<string, unknown>;\n'
        + '  metadata: Record<string, string>;\n'
        + '  timestamp: Date;\n'
        + '}\n\n'
        + 'class EventStore {\n'
        + '  constructor(private db: Database) {}\n\n'
        + '  async appendToStream(\n'
        + '    streamId: string,\n'
        + '    events: StoredEvent[],\n'
        + '    expectedVersion: number\n'
        + '  ): Promise<void> {\n'
        + '    const currentVersion = await this.getStreamVersion(streamId);\n\n'
        + '    // Optimistic concurrency check\n'
        + '    if (currentVersion !== expectedVersion) {\n'
        + '      throw new ConcurrencyError(\n'
        + '        `Expected version \\${expectedVersion}, got \\${currentVersion}`\n'
        + '      );\n'
        + '    }\n\n'
        + '    const transaction = await this.db.beginTransaction();\n'
        + '    try {\n'
        + '      for (let i = 0; i < events.length; i++) {\n'
        + '        await transaction.execute(\n'
        + '          `INSERT INTO events (stream_id, version, event_type, payload, metadata, timestamp)\n'
        + '           VALUES (?, ?, ?, ?, ?, ?)`,\n'
        + '          [\n'
        + '            streamId,\n'
        + '            expectedVersion + i + 1,\n'
        + '            events[i].eventType,\n'
        + '            JSON.stringify(events[i].payload),\n'
        + '            JSON.stringify(events[i].metadata),\n'
        + '            events[i].timestamp,\n'
        + '          ]\n'
        + '        );\n'
        + '      }\n'
        + '      await transaction.commit();\n'
        + '    } catch (err) {\n'
        + '      await transaction.rollback();\n'
        + '      throw err;\n'
        + '    }\n'
        + '  }\n\n'
        + '  async readStream(streamId: string, fromVersion = 0): Promise<StoredEvent[]> {\n'
        + '    return this.db.query(\n'
        + '      `SELECT * FROM events\n'
        + '       WHERE stream_id = ? AND version > ?\n'
        + '       ORDER BY version ASC`,\n'
        + '      [streamId, fromVersion]\n'
        + '    );\n'
        + '  }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '投影和快照' : 'Projections and Snapshots'}</h3>
      <pre style={preStyle}><code>{'// Aggregate with snapshot support\n'
        + 'class OrderAggregate {\n'
        + '  private state: OrderState = { status: "draft", items: [], total: 0 };\n'
        + '  private version = 0;\n'
        + '  private uncommittedEvents: StoredEvent[] = [];\n\n'
        + '  // Rebuild from events with snapshot optimization\n'
        + '  static async load(\n'
        + '    eventStore: EventStore,\n'
        + '    snapshotStore: SnapshotStore,\n'
        + '    orderId: string\n'
        + '  ): Promise<OrderAggregate> {\n'
        + '    const aggregate = new OrderAggregate();\n\n'
        + '    // Try loading from snapshot first\n'
        + '    const snapshot = await snapshotStore.get(orderId);\n'
        + '    if (snapshot) {\n'
        + '      aggregate.state = snapshot.state;\n'
        + '      aggregate.version = snapshot.version;\n'
        + '    }\n\n'
        + '    // Replay events after the snapshot\n'
        + '    const events = await eventStore.readStream(orderId, aggregate.version);\n'
        + '    for (const event of events) {\n'
        + '      aggregate.apply(event, false);\n'
        + '    }\n\n'
        + '    // Take a new snapshot every 100 events\n'
        + '    if (events.length > 100) {\n'
        + '      await snapshotStore.save(orderId, aggregate.state, aggregate.version);\n'
        + '    }\n\n'
        + '    return aggregate;\n'
        + '  }\n\n'
        + '  placeOrder(customerId: string, items: OrderItem[]): void {\n'
        + '    if (this.state.status !== "draft") {\n'
        + '      throw new Error("Order already placed");\n'
        + '    }\n'
        + '    this.apply({\n'
        + '      eventType: "OrderPlaced",\n'
        + '      payload: { customerId, items, total: this.calculateTotal(items) },\n'
        + '    } as StoredEvent, true);\n'
        + '  }\n\n'
        + '  private apply(event: StoredEvent, isNew: boolean): void {\n'
        + '    // State mutation based on event type\n'
        + '    switch (event.eventType) {\n'
        + '      case "OrderPlaced":\n'
        + '        this.state.status = "placed";\n'
        + '        this.state.items = event.payload.items as OrderItem[];\n'
        + '        this.state.total = event.payload.total as number;\n'
        + '        break;\n'
        + '      case "OrderShipped":\n'
        + '        this.state.status = "shipped";\n'
        + '        break;\n'
        + '      case "OrderCancelled":\n'
        + '        this.state.status = "cancelled";\n'
        + '        break;\n'
        + '    }\n'
        + '    this.version++;\n'
        + '    if (isNew) this.uncommittedEvents.push(event);\n'
        + '  }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '投影（读取模型）' : 'Projections (Read Models)'}</h3>
      <pre style={preStyle}><code>{'// Projection — build read-optimized views from events\n'
        + 'class OrderSummaryProjection {\n'
        + '  constructor(private readDb: Database) {}\n\n'
        + '  async handle(event: StoredEvent): Promise<void> {\n'
        + '    switch (event.eventType) {\n'
        + '      case "OrderPlaced":\n'
        + '        await this.readDb.execute(\n'
        + '          `INSERT INTO order_summaries\n'
        + '           (order_id, customer_id, status, total, item_count, placed_at)\n'
        + '           VALUES (?, ?, ?, ?, ?, ?)`,\n'
        + '          [\n'
        + '            event.streamId,\n'
        + '            event.payload.customerId,\n'
        + '            "placed",\n'
        + '            event.payload.total,\n'
        + '            (event.payload.items as unknown[]).length,\n'
        + '            event.timestamp,\n'
        + '          ]\n'
        + '        );\n'
        + '        break;\n\n'
        + '      case "OrderShipped":\n'
        + '        await this.readDb.execute(\n'
        + '          `UPDATE order_summaries\n'
        + '           SET status = ?, shipped_at = ?\n'
        + '           WHERE order_id = ?`,\n'
        + '          ["shipped", event.timestamp, event.streamId]\n'
        + '        );\n'
        + '        break;\n\n'
        + '      case "OrderCancelled":\n'
        + '        await this.readDb.execute(\n'
        + '          `UPDATE order_summaries\n'
        + '           SET status = ?, cancelled_at = ?\n'
        + '           WHERE order_id = ?`,\n'
        + '          ["cancelled", event.timestamp, event.streamId]\n'
        + '        );\n'
        + '        break;\n'
        + '    }\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Section 5: CQRS */}
      <h2 style={h2Style}>
        {isZh ? '5. CQRS 实现' : '5. CQRS Implementation'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'CQRS（命令查询职责分离）将写操作（命令）和读操作（查询）分为不同的模型。写模型优化数据一致性和业务规则验证，读模型优化查询性能。两个模型通过事件进行同步。'
          : 'CQRS (Command Query Responsibility Segregation) separates write operations (commands) and read operations (queries) into distinct models. The write model is optimized for data consistency and business rule validation, while the read model is optimized for query performance. The two models are synchronized via events.'}
      </p>

      <pre style={preStyle}><code>{'// CQRS — Command side\n'
        + 'interface Command {\n'
        + '  type: string;\n'
        + '  payload: Record<string, unknown>;\n'
        + '  metadata: { userId: string; correlationId: string };\n'
        + '}\n\n'
        + 'class CommandBus {\n'
        + '  private handlers = new Map<string, CommandHandler>();\n\n'
        + '  register(commandType: string, handler: CommandHandler): void {\n'
        + '    this.handlers.set(commandType, handler);\n'
        + '  }\n\n'
        + '  async dispatch(command: Command): Promise<void> {\n'
        + '    const handler = this.handlers.get(command.type);\n'
        + '    if (!handler) throw new Error(`No handler for: \\${command.type}`);\n'
        + '    await handler.execute(command);\n'
        + '  }\n'
        + '}\n\n'
        + 'class PlaceOrderHandler implements CommandHandler {\n'
        + '  constructor(\n'
        + '    private eventStore: EventStore,\n'
        + '    private snapshotStore: SnapshotStore\n'
        + '  ) {}\n\n'
        + '  async execute(command: Command): Promise<void> {\n'
        + '    const { customerId, items } = command.payload;\n\n'
        + '    // Load aggregate from event store\n'
        + '    const order = await OrderAggregate.load(\n'
        + '      this.eventStore, this.snapshotStore, command.payload.orderId as string\n'
        + '    );\n\n'
        + '    // Execute business logic (may throw if invalid)\n'
        + '    order.placeOrder(customerId as string, items as OrderItem[]);\n\n'
        + '    // Persist new events\n'
        + '    await this.eventStore.appendToStream(\n'
        + '      command.payload.orderId as string,\n'
        + '      order.getUncommittedEvents(),\n'
        + '      order.getVersion()\n'
        + '    );\n'
        + '  }\n'
        + '}'}</code></pre>

      <pre style={preStyle}><code>{'// CQRS — Query side\n'
        + 'interface Query {\n'
        + '  type: string;\n'
        + '  params: Record<string, unknown>;\n'
        + '}\n\n'
        + 'class QueryBus {\n'
        + '  private handlers = new Map<string, QueryHandler>();\n\n'
        + '  register(queryType: string, handler: QueryHandler): void {\n'
        + '    this.handlers.set(queryType, handler);\n'
        + '  }\n\n'
        + '  async dispatch<T>(query: Query): Promise<T> {\n'
        + '    const handler = this.handlers.get(query.type);\n'
        + '    if (!handler) throw new Error(`No handler for: \\${query.type}`);\n'
        + '    return handler.execute(query) as Promise<T>;\n'
        + '  }\n'
        + '}\n\n'
        + 'class GetOrderSummaryHandler implements QueryHandler {\n'
        + '  constructor(private readDb: Database) {}\n\n'
        + '  async execute(query: Query): Promise<OrderSummary> {\n'
        + '    // Query the read-optimized projection table\n'
        + '    const result = await this.readDb.queryOne(\n'
        + '      `SELECT order_id, customer_id, status, total, item_count,\n'
        + '              placed_at, shipped_at, cancelled_at\n'
        + '       FROM order_summaries WHERE order_id = ?`,\n'
        + '      [query.params.orderId]\n'
        + '    );\n'
        + '    if (!result) throw new NotFoundError("Order not found");\n'
        + '    return result;\n'
        + '  }\n'
        + '}'}</code></pre>

      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? 'CQRS 不一定需要事件溯源。可以使用普通数据库作为写模型，然后通过变更数据捕获（CDC）或领域事件将变更同步到读模型。当系统复杂度不高时，先从简单的 CQRS 开始。'
          : 'CQRS does not require event sourcing. You can use a regular database as the write model and sync changes to read models via change data capture (CDC) or domain events. Start with simple CQRS when system complexity is low.'}
      </div>

      {/* Section 6: Saga Pattern */}
      <h2 style={h2Style}>
        {isZh ? '6. Saga 模式' : '6. Saga Pattern'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Saga 模式用于管理跨多个服务的分布式事务。每个 Saga 步骤是一个本地事务，配有对应的补偿操作用于回滚。Saga 有两种实现方式：编排式（中央协调器）和协调式（事件驱动）。'
          : 'The saga pattern manages distributed transactions across multiple services. Each saga step is a local transaction paired with a compensating action for rollback. Sagas come in two flavors: orchestration (central coordinator) and choreography (event-driven).'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
            <th style={thStyle}>{isZh ? '编排式' : 'Orchestration'}</th>
            <th style={thStyle}>{isZh ? '协调式' : 'Choreography'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '协调方式' : 'Coordination'}</strong></td>
            <td style={tdStyle}>{isZh ? '中央编排器指挥所有步骤' : 'Central orchestrator directs all steps'}</td>
            <td style={tdStyle}>{isZh ? '每个服务监听事件并自行决策' : 'Each service listens for events and decides'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '耦合度' : 'Coupling'}</strong></td>
            <td style={tdStyle}>{isZh ? '编排器了解所有步骤' : 'Orchestrator knows all steps'}</td>
            <td style={tdStyle}>{isZh ? '服务只知道自己的事件' : 'Services only know their own events'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '可见性' : 'Visibility'}</strong></td>
            <td style={tdStyle}>{isZh ? '集中状态跟踪' : 'Centralized state tracking'}</td>
            <td style={tdStyle}>{isZh ? '分散，需要链路追踪工具' : 'Distributed, needs tracing tools'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '适合场景' : 'Best For'}</strong></td>
            <td style={tdStyle}>{isZh ? '复杂多步工作流（5+ 步骤）' : 'Complex multi-step workflows (5+ steps)'}</td>
            <td style={tdStyle}>{isZh ? '简单流程（2-4 步骤）' : 'Simple flows (2-4 steps)'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '编排式 Saga 实现' : 'Orchestration Saga Implementation'}</h3>
      <pre style={preStyle}><code>{'// Orchestration Saga — Order fulfillment\n'
        + 'type SagaStep = {\n'
        + '  name: string;\n'
        + '  execute: (context: SagaContext) => Promise<void>;\n'
        + '  compensate: (context: SagaContext) => Promise<void>;\n'
        + '};\n\n'
        + 'class OrderSaga {\n'
        + '  private steps: SagaStep[] = [\n'
        + '    {\n'
        + '      name: "ReserveInventory",\n'
        + '      execute: async (ctx) => {\n'
        + '        ctx.inventoryReservationId = await inventoryService.reserve(\n'
        + '          ctx.orderId, ctx.items\n'
        + '        );\n'
        + '      },\n'
        + '      compensate: async (ctx) => {\n'
        + '        await inventoryService.cancelReservation(ctx.inventoryReservationId);\n'
        + '      },\n'
        + '    },\n'
        + '    {\n'
        + '      name: "ProcessPayment",\n'
        + '      execute: async (ctx) => {\n'
        + '        ctx.paymentId = await paymentService.charge(\n'
        + '          ctx.customerId, ctx.totalAmount\n'
        + '        );\n'
        + '      },\n'
        + '      compensate: async (ctx) => {\n'
        + '        await paymentService.refund(ctx.paymentId);\n'
        + '      },\n'
        + '    },\n'
        + '    {\n'
        + '      name: "ArrangeShipping",\n'
        + '      execute: async (ctx) => {\n'
        + '        ctx.shipmentId = await shippingService.createShipment(\n'
        + '          ctx.orderId, ctx.shippingAddress\n'
        + '        );\n'
        + '      },\n'
        + '      compensate: async (ctx) => {\n'
        + '        await shippingService.cancelShipment(ctx.shipmentId);\n'
        + '      },\n'
        + '    },\n'
        + '  ];\n\n'
        + '  async run(context: SagaContext): Promise<void> {\n'
        + '    const completedSteps: SagaStep[] = [];\n\n'
        + '    for (const step of this.steps) {\n'
        + '      try {\n'
        + '        console.log(`Executing step: \\${step.name}`);\n'
        + '        await step.execute(context);\n'
        + '        completedSteps.push(step);\n'
        + '      } catch (error) {\n'
        + '        console.error(`Step \\${step.name} failed:`, error);\n'
        + '        // Compensate in reverse order\n'
        + '        for (const completed of completedSteps.reverse()) {\n'
        + '          try {\n'
        + '            console.log(`Compensating step: \\${completed.name}`);\n'
        + '            await completed.compensate(context);\n'
        + '          } catch (compError) {\n'
        + '            console.error(`Compensation failed for \\${completed.name}:`, compError);\n'
        + '            // Log to dead letter queue for manual intervention\n'
        + '            await deadLetterQueue.publish({\n'
        + '              sagaId: context.sagaId,\n'
        + '              failedStep: completed.name,\n'
        + '              error: compError,\n'
        + '            });\n'
        + '          }\n'
        + '        }\n'
        + '        throw new SagaFailedError(step.name, error);\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Section 7: Domain Events in DDD */}
      <h2 style={h2Style}>
        {isZh ? '7. DDD 中的领域事件' : '7. Domain Events in DDD'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '在领域驱动设计（DDD）中，领域事件代表业务领域中有意义的状态变化。聚合根在执行命令后产生领域事件，事件处理器在同一限界上下文或跨限界上下文中响应这些事件，实现最终一致性。'
          : 'In Domain-Driven Design, domain events represent meaningful state changes in the business domain. Aggregate roots produce domain events after executing commands, and event handlers respond to these events within the same bounded context or across bounded contexts, achieving eventual consistency.'}
      </p>

      <pre style={preStyle}><code>{'// Domain Events in DDD — Aggregate producing events\n'
        + 'abstract class AggregateRoot {\n'
        + '  private domainEvents: DomainEvent[] = [];\n'
        + '  protected version = 0;\n\n'
        + '  protected addDomainEvent(event: DomainEvent): void {\n'
        + '    this.domainEvents.push(event);\n'
        + '  }\n\n'
        + '  getDomainEvents(): DomainEvent[] {\n'
        + '    return [...this.domainEvents];\n'
        + '  }\n\n'
        + '  clearDomainEvents(): void {\n'
        + '    this.domainEvents = [];\n'
        + '  }\n'
        + '}\n\n'
        + 'class Order extends AggregateRoot {\n'
        + '  private status: OrderStatus = "draft";\n'
        + '  private items: OrderItem[] = [];\n\n'
        + '  place(customerId: string, items: OrderItem[]): void {\n'
        + '    // Business rule validation\n'
        + '    if (items.length === 0) throw new Error("Order must have items");\n'
        + '    if (this.status !== "draft") throw new Error("Order already placed");\n\n'
        + '    this.status = "placed";\n'
        + '    this.items = items;\n\n'
        + '    this.addDomainEvent({\n'
        + '      eventId: generateUUID(),\n'
        + '      eventType: "OrderPlaced",\n'
        + '      aggregateId: this.id,\n'
        + '      aggregateType: "Order",\n'
        + '      timestamp: new Date().toISOString(),\n'
        + '      version: ++this.version,\n'
        + '      payload: { customerId, items, total: this.calculateTotal() },\n'
        + '      metadata: { correlationId: generateUUID(), causationId: "" },\n'
        + '    });\n'
        + '  }\n\n'
        + '  cancel(reason: string): void {\n'
        + '    if (this.status === "shipped") {\n'
        + '      throw new Error("Cannot cancel shipped order");\n'
        + '    }\n'
        + '    this.status = "cancelled";\n\n'
        + '    this.addDomainEvent({\n'
        + '      eventId: generateUUID(),\n'
        + '      eventType: "OrderCancelled",\n'
        + '      aggregateId: this.id,\n'
        + '      aggregateType: "Order",\n'
        + '      timestamp: new Date().toISOString(),\n'
        + '      version: ++this.version,\n'
        + '      payload: { reason },\n'
        + '      metadata: { correlationId: generateUUID(), causationId: "" },\n'
        + '    });\n'
        + '  }\n'
        + '}\n\n'
        + '// Event dispatcher — publish domain events after persistence\n'
        + 'class DomainEventDispatcher {\n'
        + '  private handlers = new Map<string, DomainEventHandler[]>();\n\n'
        + '  subscribe(eventType: string, handler: DomainEventHandler): void {\n'
        + '    const existing = this.handlers.get(eventType) || [];\n'
        + '    this.handlers.set(eventType, [...existing, handler]);\n'
        + '  }\n\n'
        + '  async dispatch(events: DomainEvent[]): Promise<void> {\n'
        + '    for (const event of events) {\n'
        + '      const handlers = this.handlers.get(event.eventType) || [];\n'
        + '      await Promise.all(\n'
        + '        handlers.map(h => h.handle(event))\n'
        + '      );\n'
        + '    }\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Section 8: Async Messaging Patterns */}
      <h2 style={h2Style}>
        {isZh ? '8. 异步消息模式' : '8. Async Messaging Patterns'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '异步消息模式定义了服务之间交换消息的方式。选择正确的模式取决于消息的语义（事件 vs 命令）、消费者数量和交付保证要求。'
          : 'Async messaging patterns define how services exchange messages. Choosing the right pattern depends on message semantics (event vs command), number of consumers, and delivery guarantee requirements.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '模式' : 'Pattern'}</th>
            <th style={thStyle}>{isZh ? '描述' : 'Description'}</th>
            <th style={thStyle}>{isZh ? '消费者' : 'Consumers'}</th>
            <th style={thStyle}>{isZh ? '使用场景' : 'Use Case'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>Pub/Sub</strong></td>
            <td style={tdStyle}>{isZh ? '一对多广播，所有订阅者接收副本' : 'One-to-many broadcast, all subscribers receive a copy'}</td>
            <td style={tdStyle}>{isZh ? '多个' : 'Multiple'}</td>
            <td style={tdStyle}>{isZh ? '事件通知、缓存失效' : 'Event notification, cache invalidation'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Point-to-Point</strong></td>
            <td style={tdStyle}>{isZh ? '一对一，消息只被一个消费者处理' : 'One-to-one, message processed by exactly one consumer'}</td>
            <td style={tdStyle}>{isZh ? '一个' : 'One'}</td>
            <td style={tdStyle}>{isZh ? '任务队列、命令处理' : 'Task queues, command processing'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Request-Reply</strong></td>
            <td style={tdStyle}>{isZh ? '异步请求-响应，通过临时回复队列' : 'Async request-response via temporary reply queue'}</td>
            <td style={tdStyle}>{isZh ? '一个' : 'One'}</td>
            <td style={tdStyle}>{isZh ? '异步 RPC、长时间操作' : 'Async RPC, long operations'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '竞争消费者' : 'Competing Consumers'}</strong></td>
            <td style={tdStyle}>{isZh ? '多个消费者竞争同一队列的消息' : 'Multiple consumers compete for messages from one queue'}</td>
            <td style={tdStyle}>{isZh ? '多个（竞争）' : 'Multiple (competing)'}</td>
            <td style={tdStyle}>{isZh ? '负载均衡、水平扩展' : 'Load balancing, horizontal scaling'}</td>
          </tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'// Request-Reply pattern with correlation IDs\n'
        + 'class AsyncRequestReply {\n'
        + '  private pendingRequests = new Map<string, {\n'
        + '    resolve: (value: unknown) => void;\n'
        + '    reject: (reason: unknown) => void;\n'
        + '    timer: NodeJS.Timeout;\n'
        + '  }>();\n\n'
        + '  constructor(\n'
        + '    private channel: MessageChannel,\n'
        + '    private replyQueue: string,\n'
        + '    private timeoutMs = 30000\n'
        + '  ) {\n'
        + '    // Listen for replies on the dedicated reply queue\n'
        + '    this.channel.consume(this.replyQueue, (msg) => {\n'
        + '      if (!msg) return;\n'
        + '      const correlationId = msg.properties.correlationId;\n'
        + '      const pending = this.pendingRequests.get(correlationId);\n\n'
        + '      if (pending) {\n'
        + '        clearTimeout(pending.timer);\n'
        + '        this.pendingRequests.delete(correlationId);\n'
        + '        const reply = JSON.parse(msg.content.toString());\n'
        + '        if (reply.error) {\n'
        + '          pending.reject(new Error(reply.error));\n'
        + '        } else {\n'
        + '          pending.resolve(reply.data);\n'
        + '        }\n'
        + '      }\n'
        + '      this.channel.ack(msg);\n'
        + '    });\n'
        + '  }\n\n'
        + '  async request(queue: string, payload: unknown): Promise<unknown> {\n'
        + '    const correlationId = generateUUID();\n\n'
        + '    return new Promise((resolve, reject) => {\n'
        + '      const timer = setTimeout(() => {\n'
        + '        this.pendingRequests.delete(correlationId);\n'
        + '        reject(new Error("Request timed out"));\n'
        + '      }, this.timeoutMs);\n\n'
        + '      this.pendingRequests.set(correlationId, { resolve, reject, timer });\n\n'
        + '      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), {\n'
        + '        correlationId,\n'
        + '        replyTo: this.replyQueue,\n'
        + '        expiration: String(this.timeoutMs),\n'
        + '      });\n'
        + '    });\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Section 9: Schema Evolution */}
      <h2 style={h2Style}>
        {isZh ? '9. 事件 Schema 演进' : '9. Event Schema Evolution'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '在长期运行的事件驱动系统中，事件 Schema 不可避免地需要演进。Schema 演进的关键是维护向后兼容性，确保新消费者能读取旧事件，旧消费者不会被新事件破坏。'
          : 'In long-lived event-driven systems, event schemas inevitably need to evolve. The key to schema evolution is maintaining backward compatibility, ensuring new consumers can read old events and old consumers are not broken by new events.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '兼容性类型' : 'Compatibility Type'}</th>
            <th style={thStyle}>{isZh ? '描述' : 'Description'}</th>
            <th style={thStyle}>{isZh ? '规则' : 'Rules'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '向后兼容' : 'Backward'}</strong></td>
            <td style={tdStyle}>{isZh ? '新消费者可以读取旧事件' : 'New consumers can read old events'}</td>
            <td style={tdStyle}>{isZh ? '新字段必须有默认值' : 'New fields must have defaults'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '向前兼容' : 'Forward'}</strong></td>
            <td style={tdStyle}>{isZh ? '旧消费者可以读取新事件' : 'Old consumers can read new events'}</td>
            <td style={tdStyle}>{isZh ? '不删除字段，不改变类型' : 'No field removal, no type changes'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '完全兼容' : 'Full'}</strong></td>
            <td style={tdStyle}>{isZh ? '同时满足向前和向后兼容' : 'Both forward and backward compatible'}</td>
            <td style={tdStyle}>{isZh ? '只添加带默认值的可选字段' : 'Only add optional fields with defaults'}</td>
          </tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'// Avro schema evolution example\n'
        + '// Version 1 — Original OrderPlaced schema\n'
        + 'const orderPlacedV1 = {\n'
        + '  type: "record",\n'
        + '  name: "OrderPlaced",\n'
        + '  namespace: "com.example.events",\n'
        + '  fields: [\n'
        + '    { name: "orderId", type: "string" },\n'
        + '    { name: "customerId", type: "string" },\n'
        + '    { name: "totalAmount", type: "double" },\n'
        + '    { name: "currency", type: "string" },\n'
        + '    { name: "timestamp", type: "string" },\n'
        + '  ],\n'
        + '};\n\n'
        + '// Version 2 — Added optional fields (backward compatible)\n'
        + 'const orderPlacedV2 = {\n'
        + '  type: "record",\n'
        + '  name: "OrderPlaced",\n'
        + '  namespace: "com.example.events",\n'
        + '  fields: [\n'
        + '    { name: "orderId", type: "string" },\n'
        + '    { name: "customerId", type: "string" },\n'
        + '    { name: "totalAmount", type: "double" },\n'
        + '    { name: "currency", type: "string" },\n'
        + '    { name: "timestamp", type: "string" },\n'
        + '    // New optional fields with defaults — backward compatible\n'
        + '    { name: "discountCode", type: ["null", "string"], default: null },\n'
        + '    { name: "priority", type: "string", default: "normal" },\n'
        + '    { name: "channel", type: "string", default: "web" },\n'
        + '  ],\n'
        + '};\n\n'
        + '// Schema Registry client\n'
        + 'import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";\n\n'
        + 'const registry = new SchemaRegistry({\n'
        + '  host: "http://schema-registry:8081",\n'
        + '});\n\n'
        + '// Register schema with compatibility check\n'
        + 'async function registerSchema() {\n'
        + '  const { id } = await registry.register({\n'
        + '    type: "AVRO",\n'
        + '    schema: JSON.stringify(orderPlacedV2),\n'
        + '  }, {\n'
        + '    subject: "orders.events-value",\n'
        + '  });\n'
        + '  console.log("Registered schema with id:", id);\n'
        + '}\n\n'
        + '// Produce with schema validation\n'
        + 'async function produceWithSchema(event: OrderPlacedEvent) {\n'
        + '  const schemaId = await registry.getLatestSchemaId("orders.events-value");\n'
        + '  const encodedValue = await registry.encode(schemaId, event);\n\n'
        + '  await producer.send({\n'
        + '    topic: "orders.events",\n'
        + '    messages: [{ key: event.orderId, value: encodedValue }],\n'
        + '  });\n'
        + '}'}</code></pre>

      {/* Section 10: Serverless Event Processing */}
      <h2 style={h2Style}>
        {isZh ? '10. 无服务器事件处理' : '10. Serverless Event Processing'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '无服务器平台天然适合事件驱动架构，因为函数本身就是事件处理器。AWS Lambda + EventBridge 和 Azure Functions + Event Grid 是两种主流的无服务器事件处理方案。'
          : 'Serverless platforms are a natural fit for event-driven architecture because functions are inherently event handlers. AWS Lambda + EventBridge and Azure Functions + Event Grid are two mainstream serverless event processing solutions.'}
      </p>

      <pre style={preStyle}><code>{'// AWS Lambda + EventBridge — Order event processing\n'
        + '// serverless.yml (Serverless Framework)\n'
        + '// service: order-processor\n'
        + '// provider:\n'
        + '//   name: aws\n'
        + '//   runtime: nodejs20.x\n'
        + '// functions:\n'
        + '//   processOrder:\n'
        + '//     handler: handler.processOrder\n'
        + '//     events:\n'
        + '//       - eventBridge:\n'
        + '//           pattern:\n'
        + '//             source: [\"order-service\"]\n'
        + '//             detail-type: [\"OrderPlaced\", \"OrderCancelled\"]\n\n'
        + 'import { EventBridgeEvent, Context } from "aws-lambda";\n'
        + 'import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";\n\n'
        + 'const eventBridge = new EventBridgeClient({});\n\n'
        + '// Producer — publish event to EventBridge\n'
        + 'export async function publishOrderEvent(order: Order): Promise<void> {\n'
        + '  await eventBridge.send(new PutEventsCommand({\n'
        + '    Entries: [{\n'
        + '      Source: "order-service",\n'
        + '      DetailType: "OrderPlaced",\n'
        + '      Detail: JSON.stringify({\n'
        + '        orderId: order.id,\n'
        + '        customerId: order.customerId,\n'
        + '        totalAmount: order.total,\n'
        + '        items: order.items,\n'
        + '      }),\n'
        + '      EventBusName: "orders-bus",\n'
        + '    }],\n'
        + '  }));\n'
        + '}\n\n'
        + '// Consumer — Lambda handler triggered by EventBridge\n'
        + 'export async function processOrder(\n'
        + '  event: EventBridgeEvent<"OrderPlaced", OrderPayload>,\n'
        + '  context: Context\n'
        + '): Promise<void> {\n'
        + '  const { orderId, customerId, totalAmount } = event.detail;\n\n'
        + '  console.log(\n'
        + '    `Processing \\${event["detail-type"]} for order \\${orderId}`,\n'
        + '    `requestId=\\${context.awsRequestId}`\n'
        + '  );\n\n'
        + '  // Idempotency check — prevent duplicate processing\n'
        + '  const alreadyProcessed = await checkIdempotencyKey(orderId);\n'
        + '  if (alreadyProcessed) {\n'
        + '    console.log(`Order \\${orderId} already processed, skipping`);\n'
        + '    return;\n'
        + '  }\n\n'
        + '  await reserveInventory(orderId);\n'
        + '  await sendConfirmationEmail(customerId, orderId);\n'
        + '  await storeIdempotencyKey(orderId);\n\n'
        + '  // Chain next event\n'
        + '  await eventBridge.send(new PutEventsCommand({\n'
        + '    Entries: [{\n'
        + '      Source: "fulfillment-service",\n'
        + '      DetailType: "InventoryReserved",\n'
        + '      Detail: JSON.stringify({ orderId, customerId }),\n'
        + '      EventBusName: "orders-bus",\n'
        + '    }],\n'
        + '  }));\n'
        + '}'}</code></pre>

      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? 'Lambda 函数可能被重试，因此必须实现幂等性。使用 DynamoDB 条件写入或 Redis SET NX 存储幂等键，确保同一事件不会被处理两次。'
          : 'Lambda functions may be retried, so idempotency is essential. Use DynamoDB conditional writes or Redis SET NX for idempotency keys, ensuring the same event is not processed twice.'}
      </div>

      {/* Section 11: Stream Processing */}
      <h2 style={h2Style}>
        {isZh ? '11. 流处理' : '11. Stream Processing'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '流处理引擎（如 Kafka Streams 和 Apache Flink）可以对无限事件流进行实时的有状态计算，包括窗口聚合、流-流连接和复杂事件处理。'
          : 'Stream processing engines like Kafka Streams and Apache Flink perform real-time stateful computations over unbounded event streams, including windowed aggregations, stream-stream joins, and complex event processing.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Kafka Streams 示例' : 'Kafka Streams Example'}</h3>
      <pre style={preStyle}><code>{'// Kafka Streams topology — Java\n'
        + 'import org.apache.kafka.streams.*;\n'
        + 'import org.apache.kafka.streams.kstream.*;\n'
        + 'import java.time.Duration;\n\n'
        + 'public class OrderAnalyticsTopology {\n\n'
        + '  public static Topology build() {\n'
        + '    StreamsBuilder builder = new StreamsBuilder();\n\n'
        + '    // Source: read order events\n'
        + '    KStream<String, OrderEvent> orders = builder\n'
        + '      .stream("orders.events",\n'
        + '        Consumed.with(Serdes.String(), orderEventSerde));\n\n'
        + '    // Windowed aggregation: order count per customer per hour\n'
        + '    KTable<Windowed<String>, Long> hourlyOrderCounts = orders\n'
        + '      .filter((key, event) -> "OrderPlaced".equals(event.getType()))\n'
        + '      .selectKey((key, event) -> event.getCustomerId())\n'
        + '      .groupByKey()\n'
        + '      .windowedBy(\n'
        + '        TimeWindows.ofSizeWithNoGrace(Duration.ofHours(1))\n'
        + '      )\n'
        + '      .count(Materialized.as("hourly-order-counts"));\n\n'
        + '    // Real-time revenue per product\n'
        + '    KTable<String, Double> revenueByProduct = orders\n'
        + '      .filter((key, event) -> "OrderPlaced".equals(event.getType()))\n'
        + '      .flatMapValues(event -> event.getItems())\n'
        + '      .selectKey((key, item) -> item.getProductId())\n'
        + '      .groupByKey()\n'
        + '      .aggregate(\n'
        + '        () -> 0.0,\n'
        + '        (productId, item, total) -> total + item.getPrice() * item.getQuantity(),\n'
        + '        Materialized.as("revenue-by-product")\n'
        + '      );\n\n'
        + '    // Stream-stream join: match orders with payments within 5 min\n'
        + '    KStream<String, PaymentEvent> payments = builder\n'
        + '      .stream("payments.events",\n'
        + '        Consumed.with(Serdes.String(), paymentEventSerde));\n\n'
        + '    KStream<String, OrderWithPayment> matched = orders\n'
        + '      .join(\n'
        + '        payments,\n'
        + '        (order, payment) -> new OrderWithPayment(order, payment),\n'
        + '        JoinWindows.ofTimeDifferenceWithNoGrace(Duration.ofMinutes(5)),\n'
        + '        StreamJoined.with(Serdes.String(), orderEventSerde, paymentEventSerde)\n'
        + '      );\n\n'
        + '    matched.to("orders.matched",\n'
        + '      Produced.with(Serdes.String(), orderWithPaymentSerde));\n\n'
        + '    return builder.build();\n'
        + '  }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Apache Flink 窗口示例' : 'Apache Flink Windowing Example'}</h3>
      <pre style={preStyle}><code>{'// Apache Flink — Python (PyFlink) windowed aggregation\n'
        + 'from pyflink.datastream import StreamExecutionEnvironment\n'
        + 'from pyflink.datastream.window import TumblingEventTimeWindows\n'
        + 'from pyflink.common.time import Time\n'
        + 'from pyflink.common.watermark_strategy import WatermarkStrategy\n'
        + 'import json\n\n'
        + 'env = StreamExecutionEnvironment.get_execution_environment()\n\n'
        + '# Configure Kafka source\n'
        + 'kafka_source = KafkaSource.builder() \\\n'
        + '    .set_bootstrap_servers("kafka:9092") \\\n'
        + '    .set_topics("orders.events") \\\n'
        + '    .set_group_id("flink-analytics") \\\n'
        + '    .set_starting_offsets(KafkaOffsetsInitializer.earliest()) \\\n'
        + '    .set_value_only_deserializer(SimpleStringSchema()) \\\n'
        + '    .build()\n\n'
        + 'orders = env.from_source(\n'
        + '    kafka_source,\n'
        + '    WatermarkStrategy.for_bounded_out_of_orderness(Time.seconds(5)),\n'
        + '    "OrderEvents"\n'
        + ')\n\n'
        + '# Tumbling window: revenue per minute\n'
        + 'revenue_per_minute = orders \\\n'
        + '    .map(lambda raw: json.loads(raw)) \\\n'
        + '    .filter(lambda e: e["eventType"] == "OrderPlaced") \\\n'
        + '    .key_by(lambda e: "global") \\\n'
        + '    .window(TumblingEventTimeWindows.of(Time.minutes(1))) \\\n'
        + '    .reduce(lambda a, b: {\n'
        + '        "totalRevenue": a["totalRevenue"] + b["payload"]["totalAmount"],\n'
        + '        "orderCount": a["orderCount"] + 1,\n'
        + '    })\n\n'
        + 'revenue_per_minute.print()\n'
        + 'env.execute("Order Revenue Analytics")'}</code></pre>

      {/* Section 12: Testing */}
      <h2 style={h2Style}>
        {isZh ? '12. 测试事件驱动系统' : '12. Testing Event-Driven Systems'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '测试事件驱动系统需要特殊策略：合约测试验证生产者和消费者之间的 Schema 兼容性，事件重放测试验证投影的正确性，混沌工程测试系统在代理故障时的弹性。'
          : 'Testing event-driven systems requires special strategies: contract testing validates schema compatibility between producers and consumers, event replay testing verifies projection correctness, and chaos engineering tests system resilience under broker failures.'}
      </p>

      <pre style={preStyle}><code>{'// Contract testing with embedded Kafka (Jest)\n'
        + 'import { EmbeddedKafka } from "@testcontainers/kafka";\n\n'
        + 'describe("OrderPlaced event contract", () => {\n'
        + '  let kafka: EmbeddedKafka;\n\n'
        + '  beforeAll(async () => {\n'
        + '    kafka = await new EmbeddedKafka().start();\n'
        + '  });\n\n'
        + '  afterAll(async () => {\n'
        + '    await kafka.stop();\n'
        + '  });\n\n'
        + '  test("producer publishes valid OrderPlaced event", async () => {\n'
        + '    const producer = kafka.producer();\n'
        + '    await producer.connect();\n\n'
        + '    // Produce event\n'
        + '    await producer.send({\n'
        + '      topic: "orders.events",\n'
        + '      messages: [{\n'
        + '        key: "order-123",\n'
        + '        value: JSON.stringify({\n'
        + '          eventType: "OrderPlaced",\n'
        + '          orderId: "order-123",\n'
        + '          customerId: "cust-456",\n'
        + '          totalAmount: 99.99,\n'
        + '          items: [{ productId: "p1", quantity: 2, price: 49.995 }],\n'
        + '          timestamp: new Date().toISOString(),\n'
        + '        }),\n'
        + '      }],\n'
        + '    });\n\n'
        + '    // Consume and validate schema\n'
        + '    const consumer = kafka.consumer({ groupId: "test-group" });\n'
        + '    await consumer.connect();\n'
        + '    await consumer.subscribe({ topics: ["orders.events"] });\n\n'
        + '    const received = await consumeOneMessage(consumer);\n'
        + '    const event = JSON.parse(received.value!.toString());\n\n'
        + '    // Contract assertions\n'
        + '    expect(event).toHaveProperty("eventType", "OrderPlaced");\n'
        + '    expect(event).toHaveProperty("orderId");\n'
        + '    expect(event).toHaveProperty("customerId");\n'
        + '    expect(event).toHaveProperty("totalAmount");\n'
        + '    expect(typeof event.totalAmount).toBe("number");\n'
        + '    expect(Array.isArray(event.items)).toBe(true);\n'
        + '    expect(event.items[0]).toHaveProperty("productId");\n'
        + '    expect(event.items[0]).toHaveProperty("quantity");\n'
        + '    expect(event.items[0]).toHaveProperty("price");\n'
        + '  });\n'
        + '});\n\n'
        + '// Event replay testing — verify projections\n'
        + 'describe("OrderSummaryProjection", () => {\n'
        + '  test("rebuilds correct state from event sequence", async () => {\n'
        + '    const events: StoredEvent[] = [\n'
        + '      {\n'
        + '        streamId: "order-001",\n'
        + '        version: 1,\n'
        + '        eventType: "OrderPlaced",\n'
        + '        payload: {\n'
        + '          customerId: "cust-1",\n'
        + '          items: [{ productId: "p1", quantity: 2, price: 25 }],\n'
        + '          total: 50,\n'
        + '        },\n'
        + '        metadata: {},\n'
        + '        timestamp: new Date("2026-01-01"),\n'
        + '      },\n'
        + '      {\n'
        + '        streamId: "order-001",\n'
        + '        version: 2,\n'
        + '        eventType: "OrderShipped",\n'
        + '        payload: { trackingNumber: "TRACK-123" },\n'
        + '        metadata: {},\n'
        + '        timestamp: new Date("2026-01-02"),\n'
        + '      },\n'
        + '    ];\n\n'
        + '    const projection = new OrderSummaryProjection(testDb);\n'
        + '    for (const event of events) {\n'
        + '      await projection.handle(event);\n'
        + '    }\n\n'
        + '    const summary = await testDb.queryOne(\n'
        + '      "SELECT * FROM order_summaries WHERE order_id = ?",\n'
        + '      ["order-001"]\n'
        + '    );\n\n'
        + '    expect(summary.status).toBe("shipped");\n'
        + '    expect(summary.total).toBe(50);\n'
        + '    expect(summary.item_count).toBe(1);\n'
        + '  });\n'
        + '});'}</code></pre>

      <h3 style={h3Style}>{isZh ? '混沌工程测试' : 'Chaos Engineering Tests'}</h3>
      <pre style={preStyle}><code>{'// Chaos engineering — simulate broker failures\n'
        + 'describe("Resilience under Kafka broker failure", () => {\n'
        + '  test("consumer recovers after broker restart", async () => {\n'
        + '    const kafka = await new KafkaContainer()\n'
        + '      .withExposedPorts(9092)\n'
        + '      .start();\n\n'
        + '    // Produce messages\n'
        + '    await produceTestMessages(kafka, 100);\n\n'
        + '    // Start consuming\n'
        + '    const consumed: string[] = [];\n'
        + '    const consumer = startTestConsumer(kafka, (msg) => {\n'
        + '      consumed.push(msg);\n'
        + '    });\n\n'
        + '    // Wait for partial consumption\n'
        + '    await waitUntil(() => consumed.length >= 50);\n\n'
        + '    // Simulate broker crash\n'
        + '    await kafka.stop();\n'
        + '    await delay(5000); // Broker is down for 5 seconds\n'
        + '    await kafka.start();\n\n'
        + '    // Verify consumer reconnects and processes remaining messages\n'
        + '    await waitUntil(() => consumed.length === 100, 30000);\n'
        + '    expect(consumed.length).toBe(100);\n\n'
        + '    // Verify no duplicates (idempotent processing)\n'
        + '    const uniqueIds = new Set(consumed.map(m => JSON.parse(m).eventId));\n'
        + '    expect(uniqueIds.size).toBe(100);\n'
        + '  });\n'
        + '});'}</code></pre>

      {/* Section 13: Monitoring & Observability */}
      <h2 style={h2Style}>
        {isZh ? '13. 监控与可观测性' : '13. Monitoring & Observability'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '事件驱动系统的可观测性围绕三个关键维度：分布式追踪（跨服务的请求链路）、消费者延迟监控（消息处理速度）、以及死信队列警报（失败消息）。'
          : 'Observability in event-driven systems revolves around three key dimensions: distributed tracing (request chains across services), consumer lag monitoring (message processing speed), and dead letter queue alerting (failed messages).'}
      </p>

      <pre style={preStyle}><code>{'// Distributed tracing with OpenTelemetry\n'
        + 'import { trace, context, propagation, SpanKind } from "@opentelemetry/api";\n'
        + 'import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";\n'
        + 'import { JaegerExporter } from "@opentelemetry/exporter-jaeger";\n\n'
        + 'const tracer = trace.getTracer("order-service", "1.0.0");\n\n'
        + '// Producer — inject trace context into message headers\n'
        + 'async function produceWithTracing(\n'
        + '  topic: string,\n'
        + '  event: DomainEvent\n'
        + '): Promise<void> {\n'
        + '  const span = tracer.startSpan(`publish \\${event.eventType}`, {\n'
        + '    kind: SpanKind.PRODUCER,\n'
        + '    attributes: {\n'
        + '      "messaging.system": "kafka",\n'
        + '      "messaging.destination": topic,\n'
        + '      "messaging.message_id": event.eventId,\n'
        + '      "event.type": event.eventType,\n'
        + '    },\n'
        + '  });\n\n'
        + '  // Inject trace context into Kafka headers\n'
        + '  const headers: Record<string, string> = {};\n'
        + '  propagation.inject(context.active(), headers);\n\n'
        + '  try {\n'
        + '    await producer.send({\n'
        + '      topic,\n'
        + '      messages: [{\n'
        + '        key: event.aggregateId,\n'
        + '        value: JSON.stringify(event),\n'
        + '        headers,\n'
        + '      }],\n'
        + '    });\n'
        + '    span.setStatus({ code: 0 }); // OK\n'
        + '  } catch (err) {\n'
        + '    span.setStatus({ code: 2, message: String(err) }); // ERROR\n'
        + '    throw err;\n'
        + '  } finally {\n'
        + '    span.end();\n'
        + '  }\n'
        + '}\n\n'
        + '// Consumer — extract trace context from message headers\n'
        + 'async function consumeWithTracing(\n'
        + '  message: KafkaMessage\n'
        + '): Promise<void> {\n'
        + '  // Extract parent trace context from Kafka headers\n'
        + '  const parentCtx = propagation.extract(\n'
        + '    context.active(),\n'
        + '    message.headers\n'
        + '  );\n\n'
        + '  const span = tracer.startSpan(\n'
        + '    "process OrderPlaced",\n'
        + '    { kind: SpanKind.CONSUMER },\n'
        + '    parentCtx\n'
        + '  );\n\n'
        + '  return context.with(\n'
        + '    trace.setSpan(parentCtx, span),\n'
        + '    async () => {\n'
        + '      try {\n'
        + '        const event = JSON.parse(message.value!.toString());\n'
        + '        await processEvent(event);\n'
        + '        span.setStatus({ code: 0 });\n'
        + '      } catch (err) {\n'
        + '        span.setStatus({ code: 2, message: String(err) });\n'
        + '        throw err;\n'
        + '      } finally {\n'
        + '        span.end();\n'
        + '      }\n'
        + '    }\n'
        + '  );\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '消费者延迟和死信队列监控' : 'Consumer Lag & DLQ Monitoring'}</h3>
      <pre style={preStyle}><code>{'// Consumer lag monitoring with Prometheus metrics\n'
        + 'import { Counter, Gauge, Histogram } from "prom-client";\n\n'
        + 'const consumerLag = new Gauge({\n'
        + '  name: "kafka_consumer_lag",\n'
        + '  help: "Consumer lag in messages",\n'
        + '  labelNames: ["topic", "partition", "consumer_group"],\n'
        + '});\n\n'
        + 'const messagesProcessed = new Counter({\n'
        + '  name: "messages_processed_total",\n'
        + '  help: "Total messages processed",\n'
        + '  labelNames: ["topic", "event_type", "status"],\n'
        + '});\n\n'
        + 'const processingDuration = new Histogram({\n'
        + '  name: "message_processing_duration_seconds",\n'
        + '  help: "Time to process a single message",\n'
        + '  labelNames: ["topic", "event_type"],\n'
        + '  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5, 10],\n'
        + '});\n\n'
        + 'const dlqMessages = new Counter({\n'
        + '  name: "dlq_messages_total",\n'
        + '  help: "Messages sent to dead letter queue",\n'
        + '  labelNames: ["topic", "error_type"],\n'
        + '});\n\n'
        + '// Monitor consumer lag periodically\n'
        + 'async function monitorLag(admin: KafkaAdmin, groupId: string) {\n'
        + '  const offsets = await admin.fetchOffsets({ groupId });\n'
        + '  const topicOffsets = await admin.fetchTopicOffsets("orders.events");\n\n'
        + '  for (const partition of offsets) {\n'
        + '    const latest = topicOffsets.find(\n'
        + '      t => t.partition === partition.partition\n'
        + '    );\n'
        + '    if (latest) {\n'
        + '      const lag = parseInt(latest.offset) - parseInt(partition.offset);\n'
        + '      consumerLag.set(\n'
        + '        { topic: "orders.events", partition: String(partition.partition), consumer_group: groupId },\n'
        + '        lag\n'
        + '      );\n'
        + '    }\n'
        + '  }\n'
        + '}\n\n'
        + '// Alerting rules (Prometheus/Grafana)\n'
        + '// ALERT ConsumerLagHigh\n'
        + '//   IF kafka_consumer_lag > 10000\n'
        + '//   FOR 5m\n'
        + '//   LABELS { severity = "warning" }\n'
        + '//   ANNOTATIONS { summary = "Consumer lag exceeding 10K messages" }\n'
        + '//\n'
        + '// ALERT DLQMessagesIncreasing\n'
        + '//   IF rate(dlq_messages_total[5m]) > 0\n'
        + '//   FOR 1m\n'
        + '//   LABELS { severity = "critical" }\n'
        + '//   ANNOTATIONS { summary = "Messages being sent to DLQ" }'}</code></pre>

      {/* Architecture Decision Table */}
      <h2 style={h2Style}>
        {isZh ? '技术选型对比' : 'Technology Comparison'}
      </h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '维度' : 'Dimension'}</th>
            <th style={thStyle}>Kafka</th>
            <th style={thStyle}>RabbitMQ</th>
            <th style={thStyle}>AWS EventBridge</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '吞吐量' : 'Throughput'}</strong></td>
            <td style={tdStyle}>{isZh ? '极高（百万/秒）' : 'Very high (millions/sec)'}</td>
            <td style={tdStyle}>{isZh ? '高（万/秒）' : 'High (tens of thousands/sec)'}</td>
            <td style={tdStyle}>{isZh ? '中等（受配额限制）' : 'Moderate (quota-limited)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '消息持久化' : 'Message Retention'}</strong></td>
            <td style={tdStyle}>{isZh ? '可配置（天/无限）' : 'Configurable (days/infinite)'}</td>
            <td style={tdStyle}>{isZh ? '消费后删除' : 'Deleted after consumption'}</td>
            <td style={tdStyle}>{isZh ? '24 小时重放' : '24h replay'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '消息重放' : 'Message Replay'}</strong></td>
            <td style={tdStyle}>{isZh ? '原生支持（offset 回退）' : 'Native (offset seeking)'}</td>
            <td style={tdStyle}>{isZh ? '不支持' : 'Not supported'}</td>
            <td style={tdStyle}>{isZh ? '有限（事件存档）' : 'Limited (event archive)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '路由灵活性' : 'Routing Flexibility'}</strong></td>
            <td style={tdStyle}>{isZh ? '基于 key 的分区' : 'Key-based partitioning'}</td>
            <td style={tdStyle}>{isZh ? '极高（交换器 + 绑定）' : 'Very high (exchanges + bindings)'}</td>
            <td style={tdStyle}>{isZh ? '基于规则的内容路由' : 'Rule-based content routing'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '运维复杂度' : 'Ops Complexity'}</strong></td>
            <td style={tdStyle}>{isZh ? '高（ZooKeeper/KRaft）' : 'High (ZooKeeper/KRaft)'}</td>
            <td style={tdStyle}>{isZh ? '中等' : 'Moderate'}</td>
            <td style={tdStyle}>{isZh ? '低（全托管）' : 'Low (fully managed)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>{isZh ? '最佳场景' : 'Best For'}</strong></td>
            <td style={tdStyle}>{isZh ? '事件溯源、流处理、数据管道' : 'Event sourcing, streaming, data pipelines'}</td>
            <td style={tdStyle}>{isZh ? '任务队列、RPC、复杂路由' : 'Task queues, RPC, complex routing'}</td>
            <td style={tdStyle}>{isZh ? '无服务器事件路由、AWS 集成' : 'Serverless event routing, AWS integration'}</td>
          </tr>
        </tbody>
      </table>

      {/* FAQ Section */}
      <h2 style={h2Style}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      {faqSchema.mainEntity.map((item, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3 style={{ ...h3Style, fontSize: '1.1rem', color: '#0f172a' }}>
            {isZh
              ? [
                  '什么是事件驱动架构，什么时候应该使用它？',
                  'Apache Kafka 和 RabbitMQ 有什么区别？',
                  '什么是事件溯源，它与传统 CRUD 有什么不同？',
                  '什么是 CQRS，为什么要与事件溯源结合使用？',
                  '什么是 Saga 模式？它如何处理分布式事务？',
                  '如何处理事件驱动系统中的 Schema 演进？',
                  '如何有效测试事件驱动系统？',
                  '如何监控和观测事件驱动架构？',
                ][index]
              : item.name}
          </h3>
          <p style={{ ...pStyle, paddingLeft: '12px', borderLeft: '3px solid #e2e8f0' }}>
            {isZh
              ? [
                  '事件驱动架构（EDA）是一种软件设计模式，状态变化被捕获为不可变事件并在松耦合的服务之间异步传播。当你需要生产者和消费者之间的时间解耦、高吞吐量和可扩展性、实时数据处理、审计追踪，或多个下游服务需要独立响应同一业务事件时，应该使用 EDA。',
                  'Kafka 是分布式日志，专为高吞吐量事件流设计，具有持久存储、消费者组和重放能力。RabbitMQ 是传统消息代理，优化了灵活路由、消息确认和复杂交换器模式。事件溯源和流处理用 Kafka，任务队列和 RPC 场景用 RabbitMQ。',
                  '事件溯源将每次状态变更存储为追加事件存储中的不可变事件，而不是覆盖数据库中的当前状态。当前状态通过重放事件推导。这提供完整的审计日志、时间旅行查询、事件重放调试，以及从事件流构建多个读取优化投影的能力。',
                  'CQRS（命令查询职责分离）将写操作和读操作分为不同的模型。与事件溯源结合时，命令产生事件存储在事件存储中，投影消费这些事件构建读取优化视图，允许读写独立扩展和最终一致性。',
                  'Saga 模式通过将分布式事务分解为一系列本地事务来管理跨服务的分布式事务，每个事务配有补偿操作用于回滚。编排式使用中央协调器，协调式使用事件。复杂多步工作流用编排式，简单流程用协调式。',
                  '使用 Schema Registry（Confluent Schema Registry）配合 Avro 或 Protobuf 等支持 Schema 演进的序列化格式。遵循兼容性规则：新字段必须有默认值，从不删除必需字段，在发布时通过 Registry 强制兼容性检查。',
                  '使用合约测试验证生产者和消费者之间的 Schema 兼容性，使用嵌入式代理（EmbeddedKafka、TestContainers）进行集成测试，通过存储已知事件序列并验证投影产生正确状态来实现事件重放测试，使用混沌工程模拟代理故障和网络分区。',
                  '监控消费者延迟（最新 offset 与消费者 offset 之差）作为主要健康指标。使用分布式追踪（OpenTelemetry）在服务边界传播关联 ID。设置死信队列监控并对毒消息发出警报。跟踪从事件产生到最终消费的端到端延迟。',
                ][index]
              : item.acceptedAnswer.text}
          </p>
        </div>
      ))}

      {/* Conclusion */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '事件驱动架构是构建可扩展、弹性和松耦合分布式系统的强大范式。Apache Kafka 和 RabbitMQ 提供了不同场景下的消息传递基础设施。事件溯源和 CQRS 为复杂业务逻辑提供了审计和性能优化。Saga 模式解决了分布式事务的挑战。Schema 演进确保系统长期可维护。流处理引擎支持实时分析。全面的测试和监控策略则保障了生产环境的可靠性。根据你的具体需求选择合适的模式和工具组合，从简单开始，随着复杂性增长逐步引入更多模式。'
          : 'Event-driven architecture is a powerful paradigm for building scalable, resilient, and loosely coupled distributed systems. Apache Kafka and RabbitMQ provide messaging infrastructure for different scenarios. Event sourcing and CQRS offer audit trails and performance optimization for complex business logic. The saga pattern addresses distributed transaction challenges. Schema evolution ensures long-term maintainability. Stream processing engines enable real-time analytics. Comprehensive testing and monitoring strategies ensure production reliability. Choose the right combination of patterns and tools for your specific needs, start simple, and introduce more patterns as complexity grows.'}
      </p>

      <div style={tipStyle}>
        <strong>{isZh ? '黄金法则：' : 'Golden Rule:'}</strong>{' '}
        {isZh
          ? '不要过早引入复杂模式。先从简单的发布/订阅开始，当遇到具体的可扩展性或一致性问题时再引入事件溯源、CQRS 或 Saga。每增加一个模式都会增加系统的操作复杂度。'
          : 'Do not introduce complex patterns prematurely. Start with simple pub/sub and introduce event sourcing, CQRS, or sagas only when you encounter specific scalability or consistency challenges. Every additional pattern increases operational complexity.'}
      </div>
    </div>
  );
}
