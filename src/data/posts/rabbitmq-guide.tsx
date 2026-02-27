'use client';

import React from 'react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is RabbitMQ and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RabbitMQ is an open-source message broker that implements the Advanced Message Queuing Protocol (AMQP). Use it when you need asynchronous communication between services, task queues for background processing, event-driven architecture, or decoupling producers from consumers. It excels at reliable message delivery, complex routing, and scenarios where message ordering and acknowledgment are critical.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the four exchange types in RabbitMQ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RabbitMQ has four exchange types: (1) Direct — routes messages to queues whose binding key exactly matches the routing key; (2) Fanout — broadcasts messages to all bound queues regardless of routing key; (3) Topic — routes messages using wildcard pattern matching with * (one word) and # (zero or more words); (4) Headers — routes based on message header attributes instead of routing keys, using x-match set to "all" or "any".',
      },
    },
    {
      '@type': 'Question',
      name: 'How does message acknowledgment work in RabbitMQ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RabbitMQ supports manual and automatic acknowledgment modes. With manual ack (autoAck: false), the consumer must explicitly call channel.ack(msg) after processing. If the consumer crashes before acking, the message is requeued. You can also use channel.nack(msg, false, true) to reject and requeue, or channel.nack(msg, false, false) to discard. Automatic ack removes messages from the queue immediately upon delivery, risking data loss if the consumer crashes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a dead letter queue in RabbitMQ and how do I set one up?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A dead letter queue (DLQ) captures messages that cannot be processed successfully. Messages are dead-lettered when they are rejected with requeue=false, the message TTL expires, or the queue reaches its max-length. Set up a DLQ by declaring a dead letter exchange (x-dead-letter-exchange argument) and optionally a routing key (x-dead-letter-routing-key) on the source queue. Then bind a dedicated queue to the dead letter exchange to collect failed messages for inspection and replay.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make RabbitMQ messages persistent and durable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For messages to survive a broker restart, you need three things: (1) declare the queue as durable (durable: true); (2) mark messages as persistent (deliveryMode: 2 or persistent: true in the publish options); (3) use publisher confirms to verify the broker has written the message to disk. Note that durable queues and persistent messages have a performance cost because the broker must fsync to disk. For maximum throughput where occasional message loss is acceptable, use transient messages.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between RabbitMQ and Apache Kafka?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RabbitMQ is a traditional message broker optimized for message routing, per-message acknowledgment, and complex routing patterns. Kafka is a distributed event streaming platform designed for high-throughput, ordered event logs with long-term retention. Use RabbitMQ when you need flexible routing, message priority, request-reply patterns, or low-latency delivery to individual consumers. Use Kafka when you need event sourcing, stream processing, replay capability, or when throughput exceeds 100K messages/second.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I set up RabbitMQ clustering for high availability?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RabbitMQ clustering connects multiple nodes that share users, vhosts, queues, exchanges, bindings, and runtime parameters. All nodes must run the same Erlang cookie. For high availability, enable quorum queues (the default recommended type) which use the Raft consensus algorithm to replicate data across nodes. Classic mirrored queues are deprecated in favor of quorum queues. Use a load balancer (HAProxy or Nginx) in front of cluster nodes for client connections.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is consumer prefetch in RabbitMQ and how should I configure it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consumer prefetch (channel.prefetch(n)) limits the number of unacknowledged messages a consumer can hold at once. Without prefetch, RabbitMQ delivers messages as fast as possible, which can overwhelm slow consumers. A prefetch of 1 provides fair dispatch but limits throughput. For CPU-bound tasks, use prefetch 1-5. For I/O-bound tasks, use 10-50. For high-throughput scenarios, use 100-250. Monitor consumer utilization in the management UI and adjust based on your processing speed.',
      },
    },
  ],
};

const translations = {
  en: {
    title: 'RabbitMQ Guide: Message Queues, Exchanges, Routing, and Clustering in 2026',
    description:
      'Master RabbitMQ with this comprehensive guide covering AMQP concepts, exchange types (direct, fanout, topic, headers), message acknowledgment, persistence, dead letter queues, retry patterns, publisher confirms, consumer prefetch, Node.js and Python client examples, Docker Compose setup, clustering, monitoring, and a RabbitMQ vs Kafka vs SQS vs Redis comparison.',
  },
  zh: {
    title: 'RabbitMQ 完全指南：消息队列、交换器、路由与集群 2026',
    description:
      '全面掌握 RabbitMQ，涵盖 AMQP 核心概念、交换器类型（direct、fanout、topic、headers）、消息确认、持久化、死信队列、重试模式、发布者确认、消费者预取、Node.js 和 Python 客户端示例、Docker Compose 部署、集群配置、监控，以及 RabbitMQ vs Kafka vs SQS vs Redis 对比。',
  },
};

function EnglishContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          padding: '16px',
          margin: '24px 0',
          borderRadius: '4px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — RabbitMQ Quick Reference
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
          <li>RabbitMQ is an AMQP message broker for asynchronous, decoupled communication between services.</li>
          <li>Producers publish to <strong>exchanges</strong>; exchanges route to <strong>queues</strong> via <strong>bindings</strong> and routing keys.</li>
          <li>Four exchange types: <strong>direct</strong> (exact match), <strong>fanout</strong> (broadcast), <strong>topic</strong> (wildcard), <strong>headers</strong> (attribute-based).</li>
          <li>Always use manual acknowledgment, durable queues, persistent messages, and publisher confirms for reliability.</li>
          <li>Set consumer <code>prefetch</code> to control concurrency — start with 10 for I/O-bound tasks, 1 for CPU-bound.</li>
          <li>Use dead letter queues with TTL for retry patterns; monitor everything via the Management Plugin.</li>
          <li>For HA, use quorum queues across a 3+ node cluster behind a load balancer.</li>
        </ul>
      </div>

      <h2>What Is RabbitMQ and When to Use It</h2>
      <p>
        <strong>RabbitMQ</strong> is an open-source message broker originally developed by Rabbit Technologies
        and now maintained by Broadcom. It implements the Advanced Message Queuing Protocol (AMQP 0-9-1)
        and supports additional protocols including MQTT, STOMP, and AMQP 1.0 via plugins. RabbitMQ acts
        as a middleman between applications that produce messages and applications that consume them,
        enabling asynchronous, decoupled communication.
      </p>
      <p>
        RabbitMQ is deployed at companies like Bloomberg, Goldman Sachs, and Instagram. It runs on the
        Erlang/OTP platform, which gives it exceptional reliability, concurrency, and fault tolerance.
        A single RabbitMQ node can handle tens of thousands of messages per second; a properly configured
        cluster can handle hundreds of thousands.
      </p>
      <p>
        Use RabbitMQ when you need:
      </p>
      <ul>
        <li><strong>Task queues</strong> — distribute background jobs (email sending, image processing, PDF generation) across worker processes.</li>
        <li><strong>Event-driven architecture</strong> — decouple microservices so producers and consumers evolve independently.</li>
        <li><strong>Request buffering</strong> — absorb traffic spikes by queuing requests and processing them at a sustainable rate.</li>
        <li><strong>Complex routing</strong> — route messages to different queues based on content, headers, or pattern matching.</li>
        <li><strong>Reliable delivery</strong> — guarantee message delivery with acknowledgments, persistence, and publisher confirms.</li>
        <li><strong>Fan-out notifications</strong> — broadcast events to multiple consumers simultaneously.</li>
      </ul>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          Key Takeaways
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>Messages flow: Producer → Exchange → Binding → Queue → Consumer.</li>
          <li>Exchanges never store messages; they only route. Queues store messages until consumed.</li>
          <li>Durable queues + persistent messages + publisher confirms = messages survive broker restarts.</li>
          <li>Dead letter exchanges capture rejected, expired, or overflow messages for inspection and retry.</li>
          <li>Prefetch count is the single most impactful tuning knob for consumer throughput.</li>
          <li>Quorum queues (Raft-based) replace classic mirrored queues for high availability.</li>
          <li>The Management Plugin provides a web UI, HTTP API, and CLI for monitoring and administration.</li>
          <li>RabbitMQ excels at routing and per-message guarantees; Kafka excels at ordered event streams at scale.</li>
        </ul>
      </div>

      <h2>Core Concepts: The AMQP Model</h2>
      <p>
        Understanding AMQP is essential before writing any RabbitMQ code. The protocol defines a precise
        message flow that separates publishing from consuming through an intermediary routing layer.
      </p>
      <pre><code className="language-text">{`AMQP Message Flow:

  Producer                    RabbitMQ Broker                     Consumer
  ┌──────┐    publish     ┌───────────────────────┐    deliver   ┌──────────┐
  │ App  │ ──────────────>│ Exchange              │             │ Worker 1 │
  │      │   routing_key  │   │                   │             └──────────┘
  └──────┘   + payload    │   │ binding rules     │    deliver   ┌──────────┐
                          │   ▼                   │ ──────────> │ Worker 2 │
                          │ Queue 1               │             └──────────┘
                          │ Queue 2               │    deliver   ┌──────────┐
                          │ Queue 3               │ ──────────> │ Worker 3 │
                          └───────────────────────┘             └──────────┘

Key entities:
  Exchange     — receives messages and routes them to queues
  Queue        — stores messages in FIFO order until consumed
  Binding      — rule linking an exchange to a queue (with optional routing key)
  Routing Key  — label attached to a message; used by exchanges for routing
  Virtual Host — logical grouping / namespace for isolation (like a database schema)
  Channel      — multiplexed lightweight connection within a TCP connection
  Connection   — single TCP connection to the broker (expensive to create)`}</code></pre>

      <h3>Connections vs Channels</h3>
      <p>
        A <strong>connection</strong> is a TCP socket between your application and the RabbitMQ server.
        Creating connections is expensive (TCP handshake + AMQP handshake + TLS negotiation). A
        <strong> channel</strong> is a virtual connection inside a real TCP connection. Channels are
        lightweight and can be created/destroyed quickly. Best practice: one connection per application
        process, one channel per thread or async context. Never share a channel across threads.
      </p>

      <h3>Virtual Hosts</h3>
      <p>
        Virtual hosts (vhosts) provide logical separation within a single RabbitMQ instance. Each vhost
        has its own exchanges, queues, bindings, permissions, and policies. Use vhosts to separate
        environments (dev, staging, production) or tenants in a multi-tenant system. The default vhost
        is <code>/</code>.
      </p>
      <pre><code className="language-bash">{`# Create a virtual host
rabbitmqctl add_vhost my-app-staging

# Set permissions for a user on a vhost
# Format: set_permissions -p <vhost> <user> <configure> <write> <read>
rabbitmqctl set_permissions -p my-app-staging myuser ".*" ".*" ".*"

# List virtual hosts
rabbitmqctl list_vhosts

# Delete a virtual host (deletes ALL its exchanges, queues, bindings)
rabbitmqctl delete_vhost my-app-staging`}</code></pre>

      <h2>Exchange Types: Direct, Fanout, Topic, Headers</h2>
      <p>
        Exchanges are the routing engine of RabbitMQ. A producer never sends messages directly to a queue;
        it publishes to an exchange, which then decides which queues receive the message based on the
        exchange type and binding configuration.
      </p>

      <h3>Direct Exchange</h3>
      <p>
        A direct exchange routes messages to queues whose binding key exactly matches the message routing key.
        This is the simplest and most common pattern — one-to-one or selective delivery.
      </p>
      <pre><code className="language-text">{`Direct Exchange Routing:

  Producer publishes with routing_key="order.created"

  Exchange (direct)
    │
    ├── binding_key="order.created"  ──> Queue: order-processing  ✓ MATCH
    ├── binding_key="order.shipped"  ──> Queue: shipping-notify   ✗ no match
    └── binding_key="order.created"  ──> Queue: analytics         ✓ MATCH

  Result: message delivered to order-processing AND analytics queues`}</code></pre>

      <h3>Fanout Exchange</h3>
      <p>
        A fanout exchange broadcasts every message to all queues bound to it, ignoring the routing key
        entirely. Use fanout for event broadcasting, logging, or any scenario where every consumer needs
        every message.
      </p>
      <pre><code className="language-text">{`Fanout Exchange Routing:

  Producer publishes (routing_key is ignored)

  Exchange (fanout)
    │
    ├── Queue: email-service       ✓ receives copy
    ├── Queue: push-notifications  ✓ receives copy
    ├── Queue: analytics-pipeline  ✓ receives copy
    └── Queue: audit-log           ✓ receives copy

  Result: ALL bound queues receive a copy of the message`}</code></pre>

      <h3>Topic Exchange</h3>
      <p>
        A topic exchange routes messages using wildcard pattern matching on the routing key. Routing keys
        are dot-separated words (e.g., <code>order.us.created</code>). Bindings use two wildcards:
        <code> *</code> matches exactly one word and <code>#</code> matches zero or more words. Topic
        exchanges are the most flexible and commonly used in event-driven architectures.
      </p>
      <pre><code className="language-text">{`Topic Exchange Routing:

  Routing key format: <entity>.<region>.<action>

  Producer publishes with routing_key="order.us.created"

  Exchange (topic)
    │
    ├── binding="order.us.*"       ──> Queue: us-orders         ✓ matches
    ├── binding="order.#"          ──> Queue: all-orders         ✓ matches
    ├── binding="order.eu.*"       ──> Queue: eu-orders          ✗ no match
    ├── binding="*.*.created"      ──> Queue: created-events     ✓ matches
    ├── binding="#"                 ──> Queue: everything         ✓ matches all
    └── binding="payment.#"        ──> Queue: payments           ✗ no match

  Wildcard rules:
    *  = exactly one word          "order.*"    matches "order.created" but NOT "order.us.created"
    #  = zero or more words        "order.#"    matches "order", "order.created", "order.us.created"`}</code></pre>

      <h3>Headers Exchange</h3>
      <p>
        A headers exchange routes messages based on message header attributes instead of the routing key.
        Bindings specify a set of header key-value pairs and an <code>x-match</code> argument:
        <code> all</code> means all headers must match, <code>any</code> means at least one must match.
        Use headers exchanges when routing logic cannot be expressed as a string key.
      </p>
      <pre><code className="language-javascript">{`// Publishing with headers for a headers exchange
channel.publish('headers-exchange', '', Buffer.from(JSON.stringify(payload)), {
  headers: {
    'x-region': 'us-east',
    'x-priority': 'high',
    'x-type': 'order',
  },
});

// Binding a queue to a headers exchange
// x-match: 'all' means ALL specified headers must match
channel.bindQueue('urgent-us-orders', 'headers-exchange', '', {
  'x-match': 'all',
  'x-region': 'us-east',
  'x-priority': 'high',
});

// x-match: 'any' means AT LEAST ONE header must match
channel.bindQueue('any-high-priority', 'headers-exchange', '', {
  'x-match': 'any',
  'x-priority': 'high',
  'x-type': 'payment',
});`}</code></pre>

      <h2>Message Acknowledgment, Persistence, and Durability</h2>
      <p>
        RabbitMQ provides multiple layers of reliability guarantees. Understanding each layer is critical
        for building systems that do not lose messages.
      </p>

      <h3>Consumer Acknowledgments</h3>
      <p>
        When a consumer receives a message, it must tell RabbitMQ whether it was processed successfully.
        There are three acknowledgment modes:
      </p>
      <pre><code className="language-javascript">{`// 1. Manual acknowledgment (recommended for reliability)
channel.consume('task-queue', (msg) => {
  try {
    const task = JSON.parse(msg.content.toString());
    processTask(task);

    // Success: acknowledge the message — removes it from the queue
    channel.ack(msg);
  } catch (error) {
    // Failure: reject and requeue for another attempt
    // nack(message, allUpTo, requeue)
    channel.nack(msg, false, true);

    // Or: reject without requeue (message is discarded or dead-lettered)
    // channel.nack(msg, false, false);
  }
}, { noAck: false }); // noAck: false = manual acknowledgment

// 2. Automatic acknowledgment (fire-and-forget, risk of message loss)
channel.consume('log-queue', (msg) => {
  console.log(msg.content.toString());
  // No ack needed — message removed from queue on delivery
}, { noAck: true });

// 3. Batch acknowledgment (acknowledge multiple messages at once)
let count = 0;
channel.consume('batch-queue', (msg) => {
  processBatch(msg);
  count++;

  if (count % 10 === 0) {
    // ack(message, allUpTo=true) — acks this message and all previous unacked
    channel.ack(msg, true);
  }
}, { noAck: false });`}</code></pre>

      <h3>Queue Durability</h3>
      <p>
        A <strong>durable</strong> queue survives a broker restart. A <strong>transient</strong> queue is
        deleted when the broker restarts. Durability is set when the queue is first declared and cannot be
        changed afterward.
      </p>
      <pre><code className="language-javascript">{`// Durable queue — survives broker restart
channel.assertQueue('important-tasks', {
  durable: true,     // queue definition persisted to disk
  autoDelete: false,  // do not delete when last consumer disconnects
  exclusive: false,   // allow multiple connections to consume
});

// Transient queue — deleted on broker restart
channel.assertQueue('temp-results', {
  durable: false,
  autoDelete: true,   // delete when last consumer disconnects
});

// Exclusive queue — private to this connection, auto-deleted
channel.assertQueue('', {
  exclusive: true,    // only this connection can consume; auto-named
});`}</code></pre>

      <h3>Message Persistence</h3>
      <p>
        Even if a queue is durable, messages inside it are lost on restart unless they are marked as
        <strong> persistent</strong>. Persistent messages are written to disk by the broker.
      </p>
      <pre><code className="language-javascript">{`// Persistent message — written to disk
channel.sendToQueue('important-tasks', Buffer.from(JSON.stringify(task)), {
  persistent: true,   // equivalent to deliveryMode: 2
  contentType: 'application/json',
  messageId: uuidv4(),
  timestamp: Date.now(),
});

// Transient message — kept in memory only (faster, but lost on restart)
channel.sendToQueue('cache-updates', Buffer.from(data), {
  persistent: false,  // equivalent to deliveryMode: 1
});

// IMPORTANT: persistent + durable queue alone is NOT a guarantee.
// Use publisher confirms for true delivery assurance (see next section).`}</code></pre>

      <h2>Publisher Confirms and Consumer Prefetch</h2>
      <p>
        Publisher confirms and consumer prefetch are two critical mechanisms for production reliability
        and performance tuning.
      </p>

      <h3>Publisher Confirms</h3>
      <p>
        Without publisher confirms, a <code>channel.publish()</code> call returns immediately with no
        guarantee that the broker received the message. Network failures, broker crashes, or full queues
        can silently drop messages. Publisher confirms make the broker send an ack/nack back to the
        producer for every message.
      </p>
      <pre><code className="language-javascript">{`// Enable publisher confirms on the channel
await channel.confirmSelect();

// Method 1: Callback-based confirms
channel.sendToQueue('orders', Buffer.from(data), { persistent: true }, (err, ok) => {
  if (err) {
    console.error('Message nacked by broker:', err);
    // Retry or store in local fallback
  } else {
    console.log('Message confirmed by broker');
  }
});

// Method 2: Promise-based with waitForConfirms
channel.sendToQueue('orders', Buffer.from(data), { persistent: true });
channel.sendToQueue('orders', Buffer.from(data2), { persistent: true });

try {
  await channel.waitForConfirms();
  console.log('All pending messages confirmed');
} catch (err) {
  console.error('Some messages were nacked:', err);
}

// Method 3: Individual promise per publish (amqplib pattern)
const confirmChannel = await connection.createConfirmChannel();

function publishWithConfirm(exchange, routingKey, content, options) {
  return new Promise((resolve, reject) => {
    confirmChannel.publish(exchange, routingKey, content, options, (err) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

await publishWithConfirm('orders-exchange', 'order.created', buffer, { persistent: true });`}</code></pre>

      <h3>Consumer Prefetch (QoS)</h3>
      <p>
        Prefetch count controls how many unacknowledged messages a consumer can hold. Without prefetch,
        RabbitMQ pushes messages as fast as possible, overwhelming slow consumers while fast consumers
        sit idle. Setting prefetch enables fair dispatch and backpressure.
      </p>
      <pre><code className="language-javascript">{`// Set prefetch count — limits unacked messages per consumer
channel.prefetch(10); // Each consumer gets at most 10 unacked messages

// Per-channel vs per-consumer prefetch
channel.prefetch(10, false); // false = per-consumer (default, recommended)
channel.prefetch(50, true);  // true  = per-channel (shared across all consumers on this channel)

// Prefetch tuning guidelines:
//
// | Workload Type    | Prefetch | Rationale                          |
// |------------------|----------|------------------------------------|
// | CPU-bound tasks  | 1-5      | Slow processing, fair distribution |
// | I/O-bound tasks  | 10-50    | Waiting on network, higher useful  |
// | Logging/metrics  | 100-250  | Fast processing, maximize batch    |
// | Streaming        | 250-1000 | Consumer can handle high volume    |
//
// Start low and increase while monitoring consumer utilization
// in the Management UI (should be close to 100%)`}</code></pre>

      <h2>Node.js Client (amqplib) Examples</h2>
      <p>
        The <code>amqplib</code> package is the standard RabbitMQ client for Node.js. It supports both
        callback and promise-based APIs. Always use the promise API (<code>amqplib</code>) for modern
        async/await code.
      </p>

      <h3>Connection and Basic Producer/Consumer</h3>
      <pre><code className="language-javascript">{`// install: npm install amqplib

const amqp = require('amqplib');

// === Producer ===
async function producer() {
  // Connect to RabbitMQ
  const connection = await amqp.connect('amqp://user:password@localhost:5672/my-vhost');
  const channel = await connection.createConfirmChannel();

  const exchange = 'orders-exchange';
  const queue = 'order-processing';
  const routingKey = 'order.created';

  // Declare exchange and queue (idempotent)
  await channel.assertExchange(exchange, 'direct', { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, routingKey);

  // Publish a message
  const order = { id: 'ord_123', product: 'Widget', quantity: 5, total: 49.95 };
  const content = Buffer.from(JSON.stringify(order));

  channel.publish(exchange, routingKey, content, {
    persistent: true,
    contentType: 'application/json',
    messageId: 'msg_' + Date.now(),
    timestamp: Math.floor(Date.now() / 1000),
    headers: { 'x-retry-count': 0 },
  }, (err) => {
    if (err) console.error('Publish nacked:', err);
    else console.log('Order published and confirmed');
  });

  await channel.waitForConfirms();

  // Cleanup
  await channel.close();
  await connection.close();
}

// === Consumer ===
async function consumer() {
  const connection = await amqp.connect('amqp://user:password@localhost:5672/my-vhost');
  const channel = await connection.createChannel();

  const queue = 'order-processing';
  await channel.assertQueue(queue, { durable: true });

  // Set prefetch
  channel.prefetch(10);

  console.log('Waiting for messages on', queue);

  channel.consume(queue, async (msg) => {
    if (!msg) return; // consumer cancelled by server

    try {
      const order = JSON.parse(msg.content.toString());
      console.log('Processing order:', order.id);

      // Simulate async processing
      await processOrder(order);

      // Acknowledge success
      channel.ack(msg);
    } catch (error) {
      console.error('Failed to process:', error.message);

      const retryCount = (msg.properties.headers['x-retry-count'] || 0);
      if (retryCount < 3) {
        // Requeue for retry
        channel.nack(msg, false, true);
      } else {
        // Max retries exceeded — send to dead letter queue
        channel.nack(msg, false, false);
      }
    }
  }, { noAck: false });

  // Handle connection errors
  connection.on('error', (err) => console.error('Connection error:', err));
  connection.on('close', () => {
    console.error('Connection closed, reconnecting...');
    setTimeout(consumer, 5000);
  });
}

async function processOrder(order) {
  // Your business logic here
  console.log('Order ' + order.id + ' processed successfully');
}

producer().catch(console.error);
consumer().catch(console.error);`}</code></pre>

      <h3>Topic Exchange with Multiple Consumers</h3>
      <pre><code className="language-javascript">{`const amqp = require('amqplib');

async function setupTopicExchange() {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();

  const exchange = 'events';
  await ch.assertExchange(exchange, 'topic', { durable: true });

  // Queue 1: All order events
  const q1 = await ch.assertQueue('order-events', { durable: true });
  await ch.bindQueue(q1.queue, exchange, 'order.#');

  // Queue 2: Only US creation events
  const q2 = await ch.assertQueue('us-created', { durable: true });
  await ch.bindQueue(q2.queue, exchange, '*.us.created');

  // Queue 3: All creation events regardless of entity or region
  const q3 = await ch.assertQueue('all-created', { durable: true });
  await ch.bindQueue(q3.queue, exchange, '#.created');

  // Publish test messages
  const messages = [
    { key: 'order.us.created', data: 'US order created' },
    { key: 'order.eu.created', data: 'EU order created' },
    { key: 'order.us.shipped', data: 'US order shipped' },
    { key: 'payment.us.created', data: 'US payment created' },
    { key: 'user.signup', data: 'New user signup' },
  ];

  for (const m of messages) {
    ch.publish(exchange, m.key, Buffer.from(m.data), { persistent: true });
    console.log('Published: [' + m.key + '] ' + m.data);
  }

  // Results:
  // order-events queue receives: order.us.created, order.eu.created, order.us.shipped
  // us-created queue receives:   order.us.created, payment.us.created
  // all-created queue receives:  order.us.created, order.eu.created, payment.us.created
}

setupTopicExchange().catch(console.error);`}</code></pre>

      <h3>Robust Connection Management</h3>
      <pre><code className="language-javascript">{`const amqp = require('amqplib');

class RabbitMQClient {
  constructor(url, options = {}) {
    this.url = url;
    this.prefetch = options.prefetch || 10;
    this.reconnectDelay = options.reconnectDelay || 5000;
    this.connection = null;
    this.channel = null;
    this.isConnecting = false;
    this.consumers = new Map();
  }

  async connect() {
    if (this.isConnecting) return;
    this.isConnecting = true;

    try {
      this.connection = await amqp.connect(this.url, {
        heartbeat: 30, // seconds — detects dead connections
      });
      this.channel = await this.connection.createChannel();
      await this.channel.prefetch(this.prefetch);

      // Re-register consumers after reconnection
      for (const [queue, handler] of this.consumers) {
        await this._subscribe(queue, handler);
      }

      this.connection.on('error', (err) => {
        console.error('[RabbitMQ] Connection error:', err.message);
      });

      this.connection.on('close', () => {
        console.warn('[RabbitMQ] Connection closed. Reconnecting...');
        this.connection = null;
        this.channel = null;
        this.isConnecting = false;
        setTimeout(() => this.connect(), this.reconnectDelay);
      });

      this.channel.on('error', (err) => {
        console.error('[RabbitMQ] Channel error:', err.message);
      });

      console.log('[RabbitMQ] Connected successfully');
    } catch (err) {
      console.error('[RabbitMQ] Connect failed:', err.message);
      this.isConnecting = false;
      setTimeout(() => this.connect(), this.reconnectDelay);
      return;
    }

    this.isConnecting = false;
  }

  async publish(exchange, routingKey, data, options = {}) {
    if (!this.channel) throw new Error('Not connected');

    const content = Buffer.from(JSON.stringify(data));
    this.channel.publish(exchange, routingKey, content, {
      persistent: true,
      contentType: 'application/json',
      timestamp: Math.floor(Date.now() / 1000),
      ...options,
    });
  }

  async subscribe(queue, handler) {
    this.consumers.set(queue, handler);
    if (this.channel) {
      await this._subscribe(queue, handler);
    }
  }

  async _subscribe(queue, handler) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, async (msg) => {
      if (!msg) return;
      try {
        const data = JSON.parse(msg.content.toString());
        await handler(data, msg);
        this.channel.ack(msg);
      } catch (err) {
        console.error('[RabbitMQ] Handler error:', err.message);
        this.channel.nack(msg, false, false); // dead-letter on failure
      }
    }, { noAck: false });
  }

  async close() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }
}

// Usage
const client = new RabbitMQClient('amqp://user:pass@localhost:5672');
await client.connect();

await client.subscribe('order-processing', async (order) => {
  console.log('Processing:', order.id);
  await saveToDatabase(order);
});

await client.publish('orders-exchange', 'order.created', {
  id: 'ord_456', product: 'Gadget', total: 29.99
});`}</code></pre>

      <h2>Python Client (pika) Examples</h2>
      <p>
        The <code>pika</code> library is the most popular Python client for RabbitMQ. It supports blocking
        (synchronous) and asynchronous (SelectConnection, asyncio) connection adapters. For production
        services, use the asynchronous adapter or combine the blocking adapter with threading.
      </p>

      <h3>Basic Producer and Consumer</h3>
      <pre><code className="language-python">{`# install: pip install pika

import pika
import json
import uuid
from datetime import datetime

# === Producer ===
def produce_message():
    credentials = pika.PlainCredentials('user', 'password')
    parameters = pika.ConnectionParameters(
        host='localhost',
        port=5672,
        virtual_host='/',
        credentials=credentials,
        heartbeat=30,
        blocked_connection_timeout=300,
    )

    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    # Declare exchange and queue
    channel.exchange_declare(exchange='tasks', exchange_type='direct', durable=True)
    channel.queue_declare(queue='email-tasks', durable=True)
    channel.queue_bind(queue='email-tasks', exchange='tasks', routing_key='email.send')

    # Enable publisher confirms
    channel.confirm_delivery()

    # Publish message
    task = {
        'id': str(uuid.uuid4()),
        'to': 'user@example.com',
        'subject': 'Welcome!',
        'template': 'welcome_email',
        'created_at': datetime.utcnow().isoformat(),
    }

    try:
        channel.basic_publish(
            exchange='tasks',
            routing_key='email.send',
            body=json.dumps(task),
            properties=pika.BasicProperties(
                delivery_mode=pika.DeliveryMode.Persistent,
                content_type='application/json',
                message_id=task['id'],
                timestamp=int(datetime.utcnow().timestamp()),
            ),
        )
        print(f"Published task {task['id']}")
    except pika.exceptions.UnroutableError:
        print('Message could not be routed')

    connection.close()


# === Consumer ===
def consume_messages():
    credentials = pika.PlainCredentials('user', 'password')
    parameters = pika.ConnectionParameters(
        host='localhost',
        port=5672,
        credentials=credentials,
        heartbeat=30,
    )

    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    channel.queue_declare(queue='email-tasks', durable=True)
    channel.basic_qos(prefetch_count=5)

    def callback(ch, method, properties, body):
        try:
            task = json.loads(body)
            print(f"Processing email task: {task['id']}")

            # Simulate sending email
            send_email(task)

            # Acknowledge success
            ch.basic_ack(delivery_tag=method.delivery_tag)
            print(f"Task {task['id']} completed")

        except Exception as e:
            print(f"Task failed: {e}")
            # Reject without requeue (will go to dead letter queue if configured)
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

    channel.basic_consume(queue='email-tasks', on_message_callback=callback)
    print('Waiting for email tasks...')
    channel.start_consuming()


def send_email(task):
    """Placeholder for email sending logic."""
    print(f"Email sent to {task['to']}: {task['subject']}")


if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == 'produce':
        produce_message()
    else:
        consume_messages()`}</code></pre>

      <h3>Python Async Consumer with aio-pika</h3>
      <pre><code className="language-python">{`# install: pip install aio-pika

import asyncio
import aio_pika
import json

async def main():
    # Connect using asyncio
    connection = await aio_pika.connect_robust(
        'amqp://user:password@localhost/',
        heartbeat=30,
    )

    async with connection:
        channel = await connection.channel()
        await channel.set_qos(prefetch_count=10)

        # Declare queue
        queue = await channel.declare_queue('async-tasks', durable=True)

        async def process_message(message: aio_pika.IncomingMessage):
            async with message.process():
                # .process() auto-acks on success, auto-nacks on exception
                data = json.loads(message.body.decode())
                print(f"Processing: {data}")
                await asyncio.sleep(0.1)  # simulate async work

        # Start consuming
        await queue.consume(process_message)
        print('Waiting for messages...')

        # Run forever
        await asyncio.Future()

asyncio.run(main())`}</code></pre>

      <h2>Dead Letter Queues and Retry Patterns</h2>
      <p>
        Dead letter queues (DLQs) are essential for handling messages that cannot be processed. A message
        is <strong>dead-lettered</strong> when:
      </p>
      <ul>
        <li>The consumer rejects it with <code>requeue=false</code> (<code>channel.nack(msg, false, false)</code>).</li>
        <li>The message TTL expires (per-message or per-queue TTL).</li>
        <li>The queue exceeds its <code>x-max-length</code> or <code>x-max-length-bytes</code> limit.</li>
      </ul>

      <h3>Setting Up a Dead Letter Queue</h3>
      <pre><code className="language-javascript">{`const amqp = require('amqplib');

async function setupDLQ() {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();

  // Step 1: Declare the dead letter exchange and queue
  await ch.assertExchange('dlx', 'direct', { durable: true });
  await ch.assertQueue('dead-letters', { durable: true });
  await ch.bindQueue('dead-letters', 'dlx', 'failed');

  // Step 2: Declare the main exchange and queue WITH dead letter config
  await ch.assertExchange('main-exchange', 'direct', { durable: true });
  await ch.assertQueue('work-queue', {
    durable: true,
    arguments: {
      'x-dead-letter-exchange': 'dlx',           // route dead letters here
      'x-dead-letter-routing-key': 'failed',      // with this routing key
      'x-message-ttl': 30000,                     // optional: expire after 30s
      'x-max-length': 10000,                      // optional: max queue size
    },
  });
  await ch.bindQueue('work-queue', 'main-exchange', 'work');

  console.log('DLQ setup complete');
  console.log('  Main queue: work-queue');
  console.log('  Dead letter queue: dead-letters');
}

setupDLQ().catch(console.error);`}</code></pre>

      <h3>Retry with Exponential Backoff Using TTL</h3>
      <p>
        RabbitMQ does not have native retry with delay, but you can implement it using multiple queues
        with different TTLs that dead-letter back to the main queue. This creates a retry loop with
        increasing delays.
      </p>
      <pre><code className="language-javascript">{`async function setupRetryQueues(ch) {
  const mainExchange = 'app-exchange';
  const retryExchange = 'retry-exchange';
  const dlExchange = 'dl-exchange';

  // Main exchange and queue
  await ch.assertExchange(mainExchange, 'direct', { durable: true });

  // Retry exchange (messages loop back here after delay)
  await ch.assertExchange(retryExchange, 'direct', { durable: true });

  // Final dead letter exchange (after max retries)
  await ch.assertExchange(dlExchange, 'direct', { durable: true });

  // Dead letter queue for permanently failed messages
  await ch.assertQueue('permanent-failures', { durable: true });
  await ch.bindQueue('permanent-failures', dlExchange, 'dead');

  // Retry queues with increasing TTL
  const retryDelays = [5000, 15000, 60000]; // 5s, 15s, 60s

  for (let i = 0; i < retryDelays.length; i++) {
    const retryQueue = 'retry-' + (i + 1);
    await ch.assertQueue(retryQueue, {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': mainExchange,    // dead-letter back to main
        'x-dead-letter-routing-key': 'work',
        'x-message-ttl': retryDelays[i],           // delay before retry
      },
    });
    await ch.bindQueue(retryQueue, retryExchange, 'retry-' + (i + 1));
  }

  // Main work queue
  await ch.assertQueue('work-queue', { durable: true });
  await ch.bindQueue('work-queue', mainExchange, 'work');

  // Consumer with retry logic
  ch.prefetch(10);
  ch.consume('work-queue', async (msg) => {
    try {
      const data = JSON.parse(msg.content.toString());
      await processMessage(data);
      ch.ack(msg);
    } catch (error) {
      const retryCount = (msg.properties.headers['x-retry-count'] || 0) + 1;
      const maxRetries = retryDelays.length;

      if (retryCount <= maxRetries) {
        // Route to appropriate retry queue
        const retryKey = 'retry-' + retryCount;
        ch.publish(retryExchange, retryKey, msg.content, {
          persistent: true,
          headers: { ...msg.properties.headers, 'x-retry-count': retryCount },
        });
        ch.ack(msg); // ack original to remove from work queue
        console.log('Retry ' + retryCount + '/' + maxRetries + ' in ' + retryDelays[retryCount - 1] + 'ms');
      } else {
        // Max retries exceeded, send to permanent DLQ
        ch.publish(dlExchange, 'dead', msg.content, {
          persistent: true,
          headers: { ...msg.properties.headers, 'x-retry-count': retryCount, 'x-failure-reason': error.message },
        });
        ch.ack(msg);
        console.error('Max retries exceeded. Message sent to DLQ.');
      }
    }
  }, { noAck: false });
}

async function processMessage(data) {
  // Your business logic
  if (Math.random() < 0.3) throw new Error('Random processing failure');
  console.log('Processed:', data);
}`}</code></pre>

      <h2>RabbitMQ Clustering and High Availability</h2>
      <p>
        A single RabbitMQ node is a single point of failure. Clustering connects multiple RabbitMQ nodes
        into a logical broker, sharing metadata (exchanges, bindings, vhosts, users) across all nodes.
        Queue data replication requires either quorum queues or classic mirrored queues (deprecated).
      </p>

      <h3>Cluster Architecture</h3>
      <pre><code className="language-text">{`RabbitMQ Cluster Architecture:

  ┌────────────────────────────────────────────────────┐
  │                 Load Balancer                      │
  │              (HAProxy / Nginx)                     │
  │         port 5672 (AMQP) + 15672 (Management)     │
  └──────────┬──────────────┬──────────────┬───────────┘
             │              │              │
       ┌─────▼────┐  ┌─────▼────┐  ┌─────▼────┐
       │  Node 1  │  │  Node 2  │  │  Node 3  │
       │ (leader) │  │(follower)│  │(follower)│
       │          │  │          │  │          │
       │ Quorum Q │  │ Quorum Q │  │ Quorum Q │
       │ (leader) │  │ (replica)│  │ (replica)│
       └──────────┘  └──────────┘  └──────────┘
             │              │              │
             └──────────────┴──────────────┘
                    Erlang distribution
                  (port 25672, same cookie)

  Shared across all nodes:
    - Exchanges, bindings, vhosts, users, policies
  Replicated by quorum queues:
    - Queue data (messages) via Raft consensus
  NOT shared (classic queues):
    - Queue data lives on the declaring node only`}</code></pre>

      <h3>Setting Up a Cluster</h3>
      <pre><code className="language-bash">{`# All nodes must share the same Erlang cookie
# Copy .erlang.cookie from node1 to node2 and node3
scp /var/lib/rabbitmq/.erlang.cookie node2:/var/lib/rabbitmq/
scp /var/lib/rabbitmq/.erlang.cookie node3:/var/lib/rabbitmq/

# On node2: join the cluster
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster rabbit@node1
rabbitmqctl start_app

# On node3: join the cluster
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster rabbit@node1
rabbitmqctl start_app

# Verify cluster status
rabbitmqctl cluster_status

# Output will show:
# Cluster name: rabbit@node1
# Running Nodes: rabbit@node1, rabbit@node2, rabbit@node3`}</code></pre>

      <h3>Quorum Queues (Recommended for HA)</h3>
      <p>
        Quorum queues are the recommended queue type for high availability. They use the Raft consensus
        algorithm to replicate messages across cluster nodes. A quorum queue with a replication factor of
        3 tolerates 1 node failure; a factor of 5 tolerates 2 failures. Quorum queues replace the older,
        deprecated classic mirrored queues.
      </p>
      <pre><code className="language-javascript">{`// Declare a quorum queue (Node.js)
channel.assertQueue('important-orders', {
  durable: true,
  arguments: {
    'x-queue-type': 'quorum',            // use Raft-based replication
    'x-quorum-initial-group-size': 3,    // replicas across 3 nodes
    'x-delivery-limit': 5,              // redeliver at most 5 times before DLQ
  },
});

// Quorum queues automatically:
// - Replicate messages to all group members
// - Elect a new leader if the current leader fails
// - Support poison message handling via x-delivery-limit
// - Provide at-least-once delivery guarantees`}</code></pre>

      <pre><code className="language-python">{`# Declare a quorum queue (Python)
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(
    queue='important-orders',
    durable=True,
    arguments={
        'x-queue-type': 'quorum',
        'x-quorum-initial-group-size': 3,
        'x-delivery-limit': 5,
    },
)`}</code></pre>

      <h3>HAProxy Load Balancer Configuration</h3>
      <pre><code className="language-text">{`# /etc/haproxy/haproxy.cfg

frontend rabbitmq_amqp
    bind *:5672
    mode tcp
    default_backend rabbitmq_nodes

frontend rabbitmq_management
    bind *:15672
    mode http
    default_backend rabbitmq_mgmt_nodes

backend rabbitmq_nodes
    mode tcp
    balance roundrobin
    option tcpka         # enable TCP keep-alive
    timeout connect 5s
    timeout server 30s

    server node1 10.0.1.1:5672 check inter 5s rise 2 fall 3
    server node2 10.0.1.2:5672 check inter 5s rise 2 fall 3
    server node3 10.0.1.3:5672 check inter 5s rise 2 fall 3

backend rabbitmq_mgmt_nodes
    mode http
    balance roundrobin
    server node1 10.0.1.1:15672 check
    server node2 10.0.1.2:15672 check
    server node3 10.0.1.3:15672 check`}</code></pre>

      <h2>Monitoring with the Management Plugin</h2>
      <p>
        The RabbitMQ Management Plugin provides a web-based UI, a REST API, and the <code>rabbitmqadmin</code>
        CLI tool for monitoring and managing your broker. It is the primary tool for production
        observability.
      </p>

      <h3>Enabling the Management Plugin</h3>
      <pre><code className="language-bash">{`# Enable the management plugin
rabbitmq-plugins enable rabbitmq_management

# Access the web UI at http://localhost:15672
# Default credentials: guest / guest (only works from localhost)

# Create an admin user for remote access
rabbitmqctl add_user admin securepassword123
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"`}</code></pre>

      <h3>Key Metrics to Monitor</h3>
      <pre><code className="language-text">{`Critical RabbitMQ Metrics:

  Queue Metrics:
  ├── messages_ready           — messages waiting to be delivered
  ├── messages_unacknowledged  — delivered but not yet acked
  ├── message_bytes            — total bytes of messages in queue
  ├── consumers                — number of active consumers
  └── consumer_utilisation     — % of time consumers are busy (target: >95%)

  Node Metrics:
  ├── mem_used / mem_limit     — memory usage vs high watermark
  ├── disk_free / disk_limit   — free disk vs low watermark
  ├── fd_used / fd_total       — file descriptors in use
  ├── sockets_used             — TCP connections
  ├── proc_used                — Erlang processes
  └── run_queue                — Erlang scheduler run queue (>0 = CPU pressure)

  Connection/Channel Metrics:
  ├── connection_count         — total TCP connections
  ├── channel_count            — total channels
  ├── publish_rate             — messages published per second
  ├── deliver_rate             — messages delivered per second
  └── ack_rate                 — messages acknowledged per second

  Alerts to set:
  ├── messages_ready > 10000           → consumers not keeping up
  ├── messages_unacknowledged > 1000   → consumer processing too slow
  ├── mem_used > 80% of mem_limit      → approaching memory alarm
  ├── disk_free < 2x disk_limit        → approaching disk alarm
  ├── consumer_utilisation < 50%       → prefetch may be too low
  └── connection_count > 1000          → possible connection leak`}</code></pre>

      <h3>Management HTTP API Examples</h3>
      <pre><code className="language-bash">{`# List all queues with message counts
curl -u admin:password http://localhost:15672/api/queues | jq '.[] | {name, messages, consumers}'

# Get details of a specific queue
curl -u admin:password http://localhost:15672/api/queues/%2F/order-processing

# Purge a queue (delete all messages)
curl -u admin:password -X DELETE http://localhost:15672/api/queues/%2F/old-queue/contents

# List connections
curl -u admin:password http://localhost:15672/api/connections

# Get node health check
curl -u admin:password http://localhost:15672/api/health/checks/alarms

# Export broker definitions (exchanges, queues, bindings, policies)
curl -u admin:password http://localhost:15672/api/definitions > rabbitmq-definitions.json

# Import definitions (useful for disaster recovery or environment cloning)
curl -u admin:password -X POST -H "Content-Type: application/json" \\
  -d @rabbitmq-definitions.json http://localhost:15672/api/definitions`}</code></pre>

      <h3>Prometheus and Grafana Integration</h3>
      <pre><code className="language-bash">{`# Enable the Prometheus plugin (built-in since RabbitMQ 3.8)
rabbitmq-plugins enable rabbitmq_prometheus

# Prometheus metrics endpoint:
# http://localhost:15692/metrics

# Key Prometheus metrics:
# rabbitmq_queue_messages_ready
# rabbitmq_queue_messages_unacked
# rabbitmq_queue_consumers
# rabbitmq_connections
# rabbitmq_channels
# rabbitmq_node_mem_used
# rabbitmq_node_disk_free`}</code></pre>

      <h2>RabbitMQ vs Kafka vs SQS vs Redis Pub/Sub</h2>
      <p>
        Choosing the right message system depends on your requirements for throughput, ordering, retention,
        routing complexity, and operational overhead. Here is a detailed comparison.
      </p>
      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600 }}>Feature</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600 }}>RabbitMQ</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600 }}>Apache Kafka</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600 }}>AWS SQS</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600 }}>Redis Pub/Sub</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Protocol</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>AMQP 0-9-1, MQTT, STOMP</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Custom binary protocol</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>HTTPS / AWS SDK</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>RESP (Redis protocol)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Throughput</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>10K-100K msg/s per node</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>1M+ msg/s per cluster</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Virtually unlimited (managed)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>1M+ msg/s (no persistence)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Message Ordering</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Per-queue FIFO</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Per-partition strict ordering</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Best effort (FIFO option)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No ordering guarantees</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Retention</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Until consumed and acked</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Configurable (days/size/forever)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>4-14 days</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No retention (fire-and-forget)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Replay</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No (messages deleted after ack)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Yes (seek to any offset)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Routing</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Rich (4 exchange types, headers)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Topic-based only</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>None (point-to-point)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Channel pattern matching</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Acknowledgment</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Per-message ack/nack/reject</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Offset commit (batch)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Delete / visibility timeout</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>None</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Dead Letter Queue</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Native (DLX)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Manual (app-level)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Native (redrive policy)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>None</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Consumer Groups</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Multiple consumers on one queue</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Consumer groups (partition-based)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Single consumer per message</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>All subscribers get all messages</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Latency</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Sub-millisecond to low ms</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Low ms (batching adds latency)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>20-100ms (long polling)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Sub-millisecond</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Operations</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Moderate (Erlang, Management UI)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>High (ZooKeeper/KRaft, partitions)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>None (fully managed by AWS)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Low (just Redis)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 500 }}>Best For</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Task queues, complex routing, RPC</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Event streaming, logs, analytics</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Serverless, simple queues on AWS</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Real-time notifications, chat</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>When to choose RabbitMQ:</strong> You need flexible message routing, per-message acknowledgment,
        dead letter handling, priority queues, request-reply patterns, or you are processing up to ~100K
        messages per second. RabbitMQ is the best general-purpose message broker for microservice architectures.
      </p>
      <p>
        <strong>When to choose Kafka:</strong> You need event sourcing, stream processing, message replay,
        long-term retention, or throughput exceeding 100K messages per second. Kafka is an event streaming
        platform, not a traditional message broker.
      </p>
      <p>
        <strong>When to choose SQS:</strong> You are on AWS, want zero operational overhead, and need simple
        point-to-point queuing without complex routing. Pair with SNS for fan-out.
      </p>
      <p>
        <strong>When to choose Redis Pub/Sub:</strong> You need real-time fire-and-forget notifications with
        sub-millisecond latency and already have Redis. Not suitable when you cannot afford to lose messages.
        Consider Redis Streams for persistence.
      </p>

      <h2>Docker Compose Setup for Development</h2>
      <p>
        The fastest way to run RabbitMQ locally for development is with Docker Compose. The
        <code> management</code> image tag includes the Management Plugin (web UI).
      </p>
      <pre><code className="language-yaml">{`# docker-compose.yml
version: "3.9"

services:
  rabbitmq:
    image: rabbitmq:3.13-management-alpine
    container_name: rabbitmq
    hostname: rabbitmq
    ports:
      - "5672:5672"     # AMQP
      - "15672:15672"   # Management UI
      - "15692:15692"   # Prometheus metrics (if plugin enabled)
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: secretpassword
      RABBITMQ_DEFAULT_VHOST: /
      RABBITMQ_VM_MEMORY_HIGH_WATERMARK: 0.7
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
      - ./rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf:ro
      - ./definitions.json:/etc/rabbitmq/definitions.json:ro
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "check_port_connectivity"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    restart: unless-stopped

volumes:
  rabbitmq-data:`}</code></pre>

      <h3>Custom Configuration File</h3>
      <pre><code className="language-text">{`# rabbitmq.conf — place next to docker-compose.yml

# Load definitions on startup (exchanges, queues, bindings, users)
management.load_definitions = /etc/rabbitmq/definitions.json

# Logging
log.console = true
log.console.level = info

# Memory and disk limits
vm_memory_high_watermark.relative = 0.7
disk_free_limit.absolute = 1GB

# Channel and connection limits
channel_max = 2047
heartbeat = 30

# Consumer timeout (unacked messages)
consumer_timeout = 1800000

# Prometheus metrics
prometheus.return_per_object_metrics = true`}</code></pre>

      <h3>Pre-loaded Definitions</h3>
      <pre><code className="language-json">{`{
  "vhosts": [
    { "name": "/" },
    { "name": "staging" }
  ],
  "users": [
    {
      "name": "admin",
      "password_hash": "use_rabbitmqctl_to_generate",
      "tags": "administrator"
    },
    {
      "name": "app-service",
      "password_hash": "use_rabbitmqctl_to_generate",
      "tags": ""
    }
  ],
  "permissions": [
    { "user": "admin", "vhost": "/", "configure": ".*", "write": ".*", "read": ".*" },
    { "user": "app-service", "vhost": "/", "configure": "^app\\\\..*", "write": ".*", "read": ".*" }
  ],
  "exchanges": [
    { "name": "orders", "vhost": "/", "type": "topic", "durable": true },
    { "name": "notifications", "vhost": "/", "type": "fanout", "durable": true },
    { "name": "dlx", "vhost": "/", "type": "direct", "durable": true }
  ],
  "queues": [
    {
      "name": "order-processing",
      "vhost": "/",
      "durable": true,
      "arguments": { "x-queue-type": "quorum" }
    },
    {
      "name": "dead-letters",
      "vhost": "/",
      "durable": true,
      "arguments": {}
    }
  ],
  "bindings": [
    { "source": "orders", "vhost": "/", "destination": "order-processing", "destination_type": "queue", "routing_key": "order.#" },
    { "source": "dlx", "vhost": "/", "destination": "dead-letters", "destination_type": "queue", "routing_key": "dead" }
  ]
}`}</code></pre>

      <h3>Three-Node Cluster with Docker Compose</h3>
      <pre><code className="language-yaml">{`# docker-compose-cluster.yml
version: "3.9"

services:
  rabbitmq1:
    image: rabbitmq:3.13-management-alpine
    hostname: rabbitmq1
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: secretpassword
      RABBITMQ_ERLANG_COOKIE: "shared-secret-cookie-value"
      RABBITMQ_NODENAME: rabbit@rabbitmq1
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - node1-data:/var/lib/rabbitmq
    networks:
      - rabbitmq-cluster

  rabbitmq2:
    image: rabbitmq:3.13-management-alpine
    hostname: rabbitmq2
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: secretpassword
      RABBITMQ_ERLANG_COOKIE: "shared-secret-cookie-value"
      RABBITMQ_NODENAME: rabbit@rabbitmq2
    depends_on:
      - rabbitmq1
    volumes:
      - node2-data:/var/lib/rabbitmq
    networks:
      - rabbitmq-cluster

  rabbitmq3:
    image: rabbitmq:3.13-management-alpine
    hostname: rabbitmq3
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: secretpassword
      RABBITMQ_ERLANG_COOKIE: "shared-secret-cookie-value"
      RABBITMQ_NODENAME: rabbit@rabbitmq3
    depends_on:
      - rabbitmq1
    volumes:
      - node3-data:/var/lib/rabbitmq
    networks:
      - rabbitmq-cluster

volumes:
  node1-data:
  node2-data:
  node3-data:

networks:
  rabbitmq-cluster:
    driver: bridge`}</code></pre>

      <h2>Best Practices and Common Pitfalls</h2>
      <p>
        After running RabbitMQ in production at scale, these are the most important lessons and the most
        common mistakes to avoid.
      </p>

      <h3>Connection and Channel Management</h3>
      <ul>
        <li><strong>One connection per process, one channel per thread/coroutine.</strong> Creating a new TCP connection for every publish is the number one performance killer. Connections are expensive (TLS handshake, AMQP handshake). Channels are cheap.</li>
        <li><strong>Never share a channel across threads.</strong> Channels are not thread-safe. In Node.js (single-threaded), this is not an issue, but in Python, Java, or Go, use one channel per thread.</li>
        <li><strong>Handle connection drops gracefully.</strong> Network partitions and broker restarts will close connections. Implement automatic reconnection with exponential backoff.</li>
        <li><strong>Set heartbeat intervals.</strong> Use <code>heartbeat=30</code> (seconds) to detect dead connections. Without heartbeats, a dead connection may go undetected for hours, holding resources.</li>
      </ul>

      <h3>Queue Design</h3>
      <ul>
        <li><strong>Use quorum queues for anything important.</strong> Classic queues on a single node are a single point of failure. Quorum queues replicate across nodes using Raft consensus.</li>
        <li><strong>Set queue length limits.</strong> Use <code>x-max-length</code> or <code>x-max-length-bytes</code> to prevent unbounded queue growth. Combine with a dead letter exchange to capture overflow.</li>
        <li><strong>Avoid millions of queues.</strong> Each queue consumes memory for its metadata. If you need per-user queues, consider using a single queue with message filtering or a topic exchange.</li>
        <li><strong>Name queues descriptively.</strong> Use a naming convention like <code>service.entity.action</code> (e.g., <code>payment.invoice.created</code>). Avoid auto-generated names unless the queue is exclusive/temporary.</li>
      </ul>

      <h3>Message Design</h3>
      <ul>
        <li><strong>Keep messages small.</strong> RabbitMQ is optimized for messages under 128KB. For large payloads, store the data in S3/MinIO and send a reference in the message.</li>
        <li><strong>Always set contentType.</strong> Use <code>application/json</code> so consumers know how to deserialize.</li>
        <li><strong>Include a messageId and timestamp.</strong> These enable idempotency checks and debugging.</li>
        <li><strong>Use headers for metadata.</strong> Put retry counts, correlation IDs, and tracing info in headers, not in the message body.</li>
      </ul>

      <h3>Common Pitfalls</h3>
      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#fef2f2' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #fecaca', fontWeight: 600 }}>Pitfall</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #fecaca', fontWeight: 600 }}>Consequence</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #fecaca', fontWeight: 600 }}>Fix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>New connection per publish</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>TCP exhaustion, broker overload</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Reuse a single connection; create channels</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No prefetch limit set</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>One consumer gets all messages, others starve</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Set channel.prefetch(N) before consuming</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>autoAck: true for important work</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Messages lost if consumer crashes mid-processing</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Use manual ack (noAck: false) and ack after success</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No dead letter queue</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Poison messages block the queue forever</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Configure DLX on every production queue</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Persistent messages on transient queue</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Messages still lost on broker restart</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Queue must be durable AND messages persistent</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Infinite requeue loop</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Failed messages keep retrying forever, burning CPU</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Track retry count in headers; DLQ after max retries</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Large messages (&gt;10MB)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Memory pressure, slow throughput</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Store payload in S3/MinIO; send reference in message</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No monitoring / alerts</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Queue depth grows unnoticed until OOM</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Alert on messages_ready, memory, disk, consumer utilization</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Performance Tuning Checklist</h3>
      <ul>
        <li>Use lazy queues (<code>x-queue-mode: lazy</code>) for queues that may accumulate millions of messages — messages are stored on disk instead of memory.</li>
        <li>Batch publishes when possible (publish multiple messages, then <code>waitForConfirms</code> once).</li>
        <li>Use <code>noAck: true</code> only for non-critical, high-throughput streams (logging, metrics).</li>
        <li>Tune Erlang VM: <code>+P 1048576</code> (max processes), <code>+Q 65536</code> (max ports).</li>
        <li>Set <code>vm_memory_high_watermark</code> to 0.4-0.7 depending on workload.</li>
        <li>Use SSDs for the RabbitMQ data directory — disk I/O is the primary bottleneck for persistent messages.</li>
        <li>Enable <code>tcp_listen_options.nodelay = true</code> for lower latency.</li>
        <li>Monitor and tune the number of Erlang schedulers (<code>RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS="+S 4:4"</code> for 4 cores).</li>
      </ul>

      <h2>RabbitMQ CLI Quick Reference</h2>
      <pre><code className="language-bash">{`# === Server Management ===
rabbitmqctl status                           # node health overview
rabbitmqctl cluster_status                   # cluster membership
rabbitmqctl environment                      # runtime configuration
rabbitmqctl stop_app                         # stop RabbitMQ application (keeps Erlang VM)
rabbitmqctl start_app                        # start RabbitMQ application
rabbitmqctl reset                            # factory reset (removes all data!)

# === User Management ===
rabbitmqctl add_user myuser mypassword       # create user
rabbitmqctl set_user_tags myuser administrator  # grant admin tag
rabbitmqctl set_permissions -p / myuser ".*" ".*" ".*"  # full permissions
rabbitmqctl list_users                       # list all users
rabbitmqctl change_password myuser newpass   # change password
rabbitmqctl delete_user myuser               # delete user

# === Queue Management ===
rabbitmqctl list_queues name messages consumers state  # list queues with details
rabbitmqctl list_queues name messages_ready messages_unacknowledged  # check backlog
rabbitmqctl purge_queue my-queue             # delete all messages from a queue
rabbitmqctl delete_queue my-queue            # delete queue entirely

# === Exchange and Binding Management ===
rabbitmqctl list_exchanges name type durable # list exchanges
rabbitmqctl list_bindings                    # list all bindings

# === Connection and Channel Management ===
rabbitmqctl list_connections name state channels  # list TCP connections
rabbitmqctl list_channels name consumer_count messages_unacknowledged  # list channels
rabbitmqctl close_connection "<connection_pid>" "maintenance"  # force close

# === Plugins ===
rabbitmq-plugins enable rabbitmq_management          # management UI
rabbitmq-plugins enable rabbitmq_prometheus           # Prometheus metrics
rabbitmq-plugins enable rabbitmq_shovel               # cross-cluster message transfer
rabbitmq-plugins enable rabbitmq_delayed_message_exchange  # delayed messages
rabbitmq-plugins list                                # list all plugins`}</code></pre>

      <h2>Security Best Practices</h2>
      <ul>
        <li><strong>Change default credentials.</strong> The default <code>guest/guest</code> user can only connect from localhost. Create a strong admin user and delete or disable the guest user.</li>
        <li><strong>Enable TLS.</strong> Encrypt AMQP connections with TLS. Use <code>amqps://</code> in connection URLs. Configure <code>ssl_options</code> in <code>rabbitmq.conf</code>.</li>
        <li><strong>Use vhost isolation.</strong> Give each application/team its own vhost with least-privilege permissions. A user that only publishes should not have configure or consume permissions.</li>
        <li><strong>Limit permissions with regex.</strong> Instead of <code>.*</code> (everything), use <code>^app\\.orders\\..*</code> to restrict access to specific exchange/queue patterns.</li>
        <li><strong>Enable audit logging.</strong> Use the <code>rabbitmq_event_exchange</code> plugin to capture connection, channel, queue, and consumer events for security auditing.</li>
        <li><strong>Network segmentation.</strong> RabbitMQ should not be directly accessible from the public internet. Use a VPN or private network for client connections and inter-node traffic.</li>
        <li><strong>Rotate credentials.</strong> Use short-lived credentials or integrate with HashiCorp Vault for dynamic RabbitMQ credentials.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is RabbitMQ and when should I use it?</h3>
      <p>
        RabbitMQ is an open-source message broker implementing AMQP. Use it for asynchronous communication
        between services, task queues, event-driven architecture, request buffering, and complex message
        routing. It excels when you need per-message acknowledgment, dead letter handling, and flexible
        routing patterns.
      </p>

      <h3>What are the four exchange types in RabbitMQ?</h3>
      <p>
        Direct exchanges route by exact routing key match. Fanout exchanges broadcast to all bound queues.
        Topic exchanges use wildcard pattern matching with <code>*</code> (one word) and <code>#</code> (zero
        or more words). Headers exchanges route based on message header attributes using <code>x-match</code>
        set to <code>all</code> or <code>any</code>.
      </p>

      <h3>How does message acknowledgment work in RabbitMQ?</h3>
      <p>
        With manual acknowledgment (<code>noAck: false</code>), consumers must call <code>channel.ack(msg)</code>
        after processing. Unacked messages are requeued if the consumer disconnects. Use <code>channel.nack()</code>
        to reject with or without requeue. Automatic acknowledgment removes messages on delivery, risking
        data loss if the consumer crashes.
      </p>

      <h3>What is a dead letter queue and how do I set one up?</h3>
      <p>
        A dead letter queue captures messages that are rejected, expire, or overflow. Configure it by setting
        <code>x-dead-letter-exchange</code> and optionally <code>x-dead-letter-routing-key</code> as queue
        arguments. Bind a dedicated queue to the dead letter exchange to collect failed messages.
      </p>

      <h3>How do I make RabbitMQ messages persistent?</h3>
      <p>
        Three requirements: (1) durable queue (<code>durable: true</code>), (2) persistent messages
        (<code>persistent: true</code> or <code>deliveryMode: 2</code>), and (3) publisher confirms to verify
        the broker wrote to disk. Without all three, messages may be lost on broker restart.
      </p>

      <h3>What is the difference between RabbitMQ and Kafka?</h3>
      <p>
        RabbitMQ is a message broker for routing and per-message acknowledgment. Kafka is an event streaming
        platform for high-throughput ordered logs with replay. Use RabbitMQ for task queues and complex
        routing up to ~100K msg/s. Use Kafka for event sourcing, stream processing, and throughput beyond
        100K msg/s.
      </p>

      <h3>How do I set up RabbitMQ clustering?</h3>
      <p>
        All nodes must share the same Erlang cookie. Use <code>rabbitmqctl join_cluster</code> to add nodes.
        Enable quorum queues for data replication across nodes using Raft consensus. Place a load balancer
        (HAProxy) in front of cluster nodes for client connections.
      </p>

      <h3>What is consumer prefetch and how should I configure it?</h3>
      <p>
        Prefetch (<code>channel.prefetch(n)</code>) limits unacknowledged messages per consumer. It enables
        fair dispatch and prevents slow consumers from being overwhelmed. Use 1-5 for CPU-bound tasks, 10-50
        for I/O-bound tasks, and 100-250 for high-throughput scenarios. Monitor consumer utilization and
        adjust accordingly.
      </p>
    </>
  );
}

function ChineseContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          padding: '16px',
          margin: '24px 0',
          borderRadius: '4px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — RabbitMQ 快速参考
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
          <li>RabbitMQ 是 AMQP 消息代理，用于服务间的异步解耦通信。</li>
          <li>生产者发布到<strong>交换器</strong>；交换器通过<strong>绑定</strong>和路由键将消息路由到<strong>队列</strong>。</li>
          <li>四种交换器类型：<strong>direct</strong>（精确匹配）、<strong>fanout</strong>（广播）、<strong>topic</strong>（通配符）、<strong>headers</strong>（基于属性）。</li>
          <li>可靠性保障：手动确认 + 持久化队列 + 持久化消息 + 发布者确认。</li>
          <li>设置消费者 <code>prefetch</code> 控制并发——I/O 密集型任务从 10 开始，CPU 密集型从 1 开始。</li>
          <li>使用死信队列配合 TTL 实现重试模式；通过管理插件监控一切。</li>
          <li>高可用方案：3+ 节点集群中使用仲裁队列，前端放负载均衡器。</li>
        </ul>
      </div>

      <h2>什么是 RabbitMQ 以及何时使用</h2>
      <p>
        <strong>RabbitMQ</strong> 是一个开源消息代理，实现了高级消息队列协议（AMQP 0-9-1），
        并通过插件支持 MQTT、STOMP 和 AMQP 1.0 等协议。RabbitMQ 充当消息生产者和消费者之间的中间人，
        实现异步、解耦的通信。它运行在 Erlang/OTP 平台上，具有出色的可靠性、并发性和容错能力。
      </p>
      <p>
        适用场景：任务队列（邮件发送、图片处理）、事件驱动架构、请求缓冲、复杂路由、可靠消息传递和扇出通知。
      </p>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          核心要点
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>消息流向：生产者 → 交换器 → 绑定 → 队列 → 消费者。</li>
          <li>交换器不存储消息，只负责路由。队列存储消息直到被消费。</li>
          <li>持久化队列 + 持久化消息 + 发布者确认 = 消息能在代理重启后存活。</li>
          <li>死信交换器捕获被拒绝、过期或溢出的消息，用于检查和重试。</li>
          <li>Prefetch 数量是影响消费者吞吐量的最关键调优参数。</li>
          <li>仲裁队列（基于 Raft）取代经典镜像队列用于高可用。</li>
          <li>管理插件提供 Web UI、HTTP API 和 CLI 用于监控和管理。</li>
          <li>RabbitMQ 擅长路由和逐条消息保证；Kafka 擅长有序事件流的大规模处理。</li>
        </ul>
      </div>

      <h2>核心概念：AMQP 模型</h2>
      <p>
        AMQP 定义了精确的消息流程，通过中间路由层将发布和消费分离。
        关键实体：交换器（Exchange）接收消息并路由到队列；队列（Queue）以 FIFO 顺序存储消息；
        绑定（Binding）是连接交换器和队列的规则；路由键（Routing Key）是附加在消息上的标签；
        虚拟主机（Virtual Host）是逻辑分组命名空间；通道（Channel）是 TCP 连接内的轻量级虚拟连接。
      </p>
      <p>
        最佳实践：每个应用进程一个连接，每个线程或异步上下文一个通道。不要跨线程共享通道。
      </p>

      <h2>交换器类型：Direct、Fanout、Topic、Headers</h2>
      <p>
        <strong>Direct 交换器</strong>将消息路由到绑定键与路由键精确匹配的队列。
        <strong>Fanout 交换器</strong>将消息广播到所有绑定的队列，忽略路由键。
        <strong>Topic 交换器</strong>使用通配符模式匹配（<code>*</code> 匹配一个词，<code>#</code> 匹配零个或多个词）。
        <strong>Headers 交换器</strong>基于消息头属性而非路由键进行路由。
      </p>

      <h2>消息确认、持久化和耐久性</h2>
      <p>
        消费者确认有三种模式：手动确认（推荐）、自动确认（可能丢消息）和批量确认。
        持久化队列在代理重启后存活。持久化消息被写入磁盘。
        即使队列持久化，消息也必须标记为持久化（<code>deliveryMode: 2</code>）才能在重启后保留。
        使用发布者确认来验证代理确实接收并持久化了消息。
      </p>

      <h2>发布者确认和消费者预取</h2>
      <p>
        发布者确认使代理对每条消息发送 ack/nack 回执给生产者，确保消息不会静默丢失。
        消费者预取（<code>channel.prefetch(n)</code>）限制每个消费者持有的未确认消息数量。
        CPU 密集型任务使用 1-5，I/O 密集型使用 10-50，高吞吐场景使用 100-250。
      </p>

      <h2>Node.js 客户端 (amqplib) 示例</h2>
      <p>
        <code>amqplib</code> 是 Node.js 的标准 RabbitMQ 客户端。支持 Promise API 用于 async/await。
        关键模式：连接管理（自动重连）、确认通道（发布者确认）、预取设置和错误处理。
        生产环境中应封装为可复用的客户端类，包含重连逻辑和消费者重新注册。
      </p>

      <h2>Python 客户端 (pika) 示例</h2>
      <p>
        <code>pika</code> 是最流行的 Python RabbitMQ 客户端，支持阻塞和异步连接适配器。
        对于生产服务，使用异步适配器或 <code>aio-pika</code>（基于 asyncio）。
        阻塞适配器适合简单脚本和 CLI 工具。
      </p>

      <h2>死信队列和重试模式</h2>
      <p>
        死信队列捕获无法处理的消息。消息在被拒绝（requeue=false）、TTL 过期或队列超过最大长度时进入死信。
        通过设置 <code>x-dead-letter-exchange</code> 参数来配置死信。
        使用多个带不同 TTL 的队列实现指数退避重试——消息在延迟后死信回主队列。
      </p>

      <h2>RabbitMQ 集群和高可用</h2>
      <p>
        集群将多个 RabbitMQ 节点连接成逻辑代理，共享元数据。
        所有节点必须使用相同的 Erlang cookie。
        仲裁队列使用 Raft 共识算法在节点间复制消息。
        3 个副本的仲裁队列可以容忍 1 个节点故障。
        使用 HAProxy 或 Nginx 作为集群前端的负载均衡器。
      </p>

      <h2>管理插件监控</h2>
      <p>
        管理插件提供 Web UI（端口 15672）、REST API 和 CLI 工具。
        关键监控指标：messages_ready（待投递消息）、messages_unacknowledged（已投递未确认）、
        consumer_utilisation（消费者利用率）、内存使用、磁盘空间。
        集成 Prometheus 和 Grafana 进行生产级监控。
      </p>

      <h2>RabbitMQ vs Kafka vs SQS vs Redis Pub/Sub</h2>
      <p>
        RabbitMQ：灵活路由、逐条确认、死信处理，适合任务队列和微服务（~100K msg/s）。
        Kafka：高吞吐有序事件流、消息回放、长期保留，适合事件溯源（1M+ msg/s）。
        SQS：AWS 全托管、零运维、简单点对点队列。
        Redis Pub/Sub：亚毫秒延迟、即发即忘，不适合需要持久化的场景。
      </p>

      <h2>Docker Compose 开发环境搭建</h2>
      <p>
        使用 <code>rabbitmq:3.13-management-alpine</code> 镜像快速启动带管理 UI 的 RabbitMQ。
        通过 <code>definitions.json</code> 预加载交换器、队列和绑定配置。
        三节点集群需设置相同的 <code>RABBITMQ_ERLANG_COOKIE</code>。
      </p>

      <h2>最佳实践和常见陷阱</h2>
      <p>
        <strong>连接管理</strong>：每个进程一个连接，每个线程一个通道。设置心跳检测。实现自动重连。
      </p>
      <p>
        <strong>队列设计</strong>：重要数据使用仲裁队列。设置队列长度限制。避免创建百万级队列。
      </p>
      <p>
        <strong>消息设计</strong>：保持消息小于 128KB。设置 contentType。包含 messageId 和时间戳。
      </p>
      <p>
        <strong>常见陷阱</strong>：每次发布创建新连接（TCP 耗尽）、未设置 prefetch（消息分配不均）、
        重要任务使用自动确认（消息丢失）、无死信队列（毒消息阻塞队列）、持久化消息放在非持久化队列（重启丢失）。
      </p>

      <h2>常见问题解答</h2>

      <h3>什么是 RabbitMQ？何时使用？</h3>
      <p>
        RabbitMQ 是实现 AMQP 的开源消息代理。用于服务间异步通信、任务队列、事件驱动架构和复杂消息路由。
      </p>

      <h3>RabbitMQ 的四种交换器类型是什么？</h3>
      <p>
        Direct（精确匹配路由键）、Fanout（广播到所有绑定队列）、Topic（通配符模式匹配）、Headers（基于消息头属性路由）。
      </p>

      <h3>消息确认如何工作？</h3>
      <p>
        手动确认模式下，消费者必须调用 ack() 确认成功处理。未确认的消息在消费者断开时会被重新排队。
        使用 nack() 拒绝消息并选择是否重新排队。自动确认在投递时立即移除消息，有丢失风险。
      </p>

      <h3>什么是死信队列？如何设置？</h3>
      <p>
        死信队列捕获被拒绝、过期或溢出的消息。通过在源队列上设置 x-dead-letter-exchange 参数，
        并将专用队列绑定到死信交换器来收集失败消息。
      </p>

      <h3>如何让消息持久化？</h3>
      <p>
        三个条件：(1) 持久化队列；(2) 持久化消息（deliveryMode: 2）；(3) 发布者确认验证写入磁盘。三者缺一不可。
      </p>

      <h3>RabbitMQ 和 Kafka 有什么区别？</h3>
      <p>
        RabbitMQ 是消息代理，擅长路由和逐条确认。Kafka 是事件流平台，擅长高吞吐有序日志和消息回放。
        100K msg/s 以下选 RabbitMQ，以上或需要事件溯源选 Kafka。
      </p>

      <h3>如何搭建 RabbitMQ 集群？</h3>
      <p>
        所有节点共享 Erlang cookie，使用 rabbitmqctl join_cluster 加入集群。
        启用仲裁队列实现 Raft 共识复制。在集群前端部署负载均衡器。
      </p>

      <h3>什么是消费者预取？如何配置？</h3>
      <p>
        预取限制每个消费者持有的未确认消息数量。CPU 密集型用 1-5，I/O 密集型用 10-50，高吞吐用 100-250。
        监控消费者利用率并相应调整。
      </p>
    </>
  );
}

export default function RabbitmqGuide({ lang }: { lang: string }) {
  const isChinese = lang === 'zh';
  const t = translations[isChinese ? 'zh' : 'en'];

  return (
    <>
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Article title and meta */}
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
        {t.title}
      </h1>
      <p style={{ color: '#475569', marginBottom: '32px', fontSize: '1.05rem', lineHeight: '1.7' }}>
        {t.description}
      </p>

      {/* Render bilingual content */}
      {isChinese ? <ChineseContent /> : <EnglishContent />}
    </>
  );
}
