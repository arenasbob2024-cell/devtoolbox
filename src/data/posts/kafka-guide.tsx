'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Apache Kafka Complete Guide: Architecture, Producers, Consumers, Streams & Operations',
    intro: 'Apache Kafka is a distributed event streaming platform used by thousands of companies for high-throughput, low-latency data pipelines, streaming analytics, and mission-critical applications. Originally developed at LinkedIn and open-sourced in 2011, Kafka has become the de facto standard for event-driven architectures. This comprehensive guide covers Kafka architecture, producers, consumers, client libraries for Node.js, Java, and Python, Kafka Streams, Kafka Connect, Schema Registry, exactly-once semantics, security, performance tuning, and monitoring.',
    tldr: 'TL;DR',
    tldrText: 'Kafka is a distributed commit log that organizes data into topics and partitions across a cluster of brokers. Producers write events, consumers read them via consumer groups, and Kafka guarantees ordering within partitions. Use KRaft mode (no ZooKeeper) for new deployments, enable idempotent producers for safety, and leverage Kafka Streams or Connect for processing pipelines. Target 10-100 partitions per topic, tune batch.size and linger.ms for throughput, and monitor consumer lag as your primary health metric.',
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Kafka organizes data into topics split across partitions for parallel processing. Each partition is an ordered, immutable append-only log.',
    takeaway2: 'KRaft mode replaces ZooKeeper for metadata management in Kafka 3.3+, simplifying operations and improving scalability.',
    takeaway3: 'Consumer groups enable horizontal scaling — each partition is consumed by exactly one consumer within a group.',
    takeaway4: 'Idempotent producers (enable.idempotence=true) prevent duplicate messages during retries at no significant performance cost.',
    takeaway5: 'Exactly-once semantics require transactional producers + read_committed isolation level on consumers.',
    takeaway6: 'Kafka Connect provides pre-built connectors for databases, cloud storage, and search engines without custom code.',
    takeaway7: 'Consumer lag is the most important operational metric — monitor it with Prometheus, Burrow, or Cruise Control.',

    archTitle: 'Kafka Architecture',
    archDesc: 'Kafka is a distributed system composed of brokers, topics, partitions, and replicas. Understanding these building blocks is essential before writing any code.',
    archBrokersTitle: 'Brokers and Cluster',
    archBrokersDesc: 'A Kafka cluster consists of multiple brokers (servers). Each broker stores a subset of topic partitions and serves client requests. Brokers are identified by unique integer IDs. One broker acts as the controller, managing partition leadership and cluster metadata.',
    archTopicsTitle: 'Topics and Partitions',
    archTopicsDesc: 'A topic is a named category of messages. Each topic is split into one or more partitions. A partition is an ordered, immutable sequence of records, each assigned a sequential offset. Partitions are distributed across brokers for parallelism and fault tolerance.',
    archReplicationTitle: 'Replication',
    archReplicationDesc: 'Each partition has a configurable replication factor (typically 3). One replica is the leader (handles reads/writes) and the others are followers (replicate the leader). If the leader fails, a follower is elected as the new leader. ISR (In-Sync Replicas) tracks which replicas are caught up.',
    archZkKraftTitle: 'ZooKeeper vs KRaft',
    archZkKraftDesc: 'Historically, Kafka used Apache ZooKeeper for metadata management (broker registration, topic configuration, controller election). KRaft (Kafka Raft) mode, production-ready since Kafka 3.3, moves metadata into Kafka itself using a Raft consensus protocol. KRaft eliminates the ZooKeeper dependency, supports more partitions, and simplifies deployment.',

    producerTitle: 'Producers',
    producerDesc: 'Producers publish records to Kafka topics. Understanding partitioning, acknowledgments, and idempotency is critical for reliable data ingestion.',
    producerPartTitle: 'Partitioning Strategies',
    producerPartDesc: 'Producers determine which partition receives a record using a partitioner. The default partitioner hashes the record key to select a partition (records with the same key always go to the same partition). If no key is provided, the sticky partitioner batches records to the same partition for efficiency.',
    producerAcksTitle: 'Acknowledgments (acks)',
    producerAcksDesc: 'The acks setting controls durability guarantees:',
    producerAcks0: 'acks=0: Fire and forget. Producer does not wait for any acknowledgment. Fastest but risks data loss.',
    producerAcks1: 'acks=1: Leader acknowledgment. Producer waits for the partition leader to write the record. Data loss possible if leader fails before replication.',
    producerAcksAll: 'acks=all (-1): Full ISR acknowledgment. Producer waits for all in-sync replicas to write. Strongest durability guarantee. Use with min.insync.replicas=2 for production.',
    producerIdempotentTitle: 'Idempotent Producers',
    producerIdempotentDesc: 'Enable enable.idempotence=true to prevent duplicate records during retries. The broker assigns a producer ID and sequence number to each record, deduplicating any retries automatically. This has negligible performance overhead and should be enabled by default.',
    producerCompressionTitle: 'Compression',
    producerCompressionDesc: 'Producers can compress batches before sending. Compression reduces network bandwidth and broker storage at the cost of CPU. Supported codecs: none, gzip, snappy, lz4, zstd. Use lz4 or zstd for the best balance of speed and compression ratio.',

    consumerTitle: 'Consumers',
    consumerDesc: 'Consumers read records from Kafka topics. Consumer groups enable parallel processing, and offset management controls exactly which records are processed.',
    consumerGroupTitle: 'Consumer Groups',
    consumerGroupDesc: 'A consumer group is a set of consumers that cooperatively consume a topic. Each partition is assigned to exactly one consumer in the group. If there are more consumers than partitions, some consumers are idle. If a consumer fails, its partitions are reassigned to the remaining consumers (rebalancing).',
    consumerOffsetTitle: 'Offset Management',
    consumerOffsetDesc: 'Each consumer tracks its position in each partition via an offset. Offsets are committed to the __consumer_offsets internal topic. Auto-commit (enable.auto.commit=true) periodically commits offsets, but manual commit (commitSync/commitAsync) provides more control. Always commit after successfully processing a batch to avoid reprocessing or data loss.',
    consumerRebalanceTitle: 'Rebalancing Strategies',
    consumerRebalanceDesc: 'When consumers join or leave a group, partitions are rebalanced:',
    consumerRebalanceEager: 'Eager (default in older versions): All partitions are revoked and reassigned. Causes a stop-the-world pause.',
    consumerRebalanceCoop: 'Cooperative Sticky: Only affected partitions are reassigned. Other consumers continue processing. Use CooperativeStickyAssignor for production.',

    nodejsTitle: 'Kafka with Node.js (KafkaJS)',
    nodejsDesc: 'KafkaJS is the most popular pure JavaScript client for Apache Kafka. It supports producers, consumers, admin operations, and exactly-once semantics.',
    nodejsProducerTitle: 'Node.js Producer Example',
    nodejsConsumerTitle: 'Node.js Consumer Example',
    nodejsErrorTitle: 'Error Handling',

    javaTitle: 'Kafka with Java / Spring Boot',
    javaDesc: 'Spring Kafka provides deep integration with the Spring ecosystem. It wraps the Apache Kafka Java client with convenient abstractions like KafkaTemplate and @KafkaListener.',
    javaProducerTitle: 'Spring Kafka Producer',
    javaConsumerTitle: 'Spring Kafka Consumer',
    javaConfigTitle: 'application.yml Configuration',

    pythonTitle: 'Kafka with Python',
    pythonDesc: 'confluent-kafka-python is the recommended Python client, built on librdkafka for high performance. It supports Avro serialization with Schema Registry integration.',
    pythonProducerTitle: 'Python Producer Example',
    pythonConsumerTitle: 'Python Consumer with Avro',

    streamsTitle: 'Kafka Streams',
    streamsDesc: 'Kafka Streams is a client library for building real-time stream processing applications. It processes data from input topics and writes results to output topics, with built-in support for stateful operations, windowing, and exactly-once processing.',
    streamsConceptsTitle: 'Core Concepts',
    streamsConceptKStream: 'KStream: An unbounded stream of records. Each record is an independent event (insert semantics).',
    streamsConceptKTable: 'KTable: A changelog stream. Each record is an update to a key (upsert semantics). Represents the latest value for each key.',
    streamsConceptWindow: 'Windowing: Groups records by time windows (tumbling, hopping, sliding, session) for time-based aggregations.',
    streamsConceptJoin: 'Joins: KStream-KStream (windowed), KStream-KTable (enrichment), KTable-KTable (materialized view).',
    streamsExampleTitle: 'Word Count Example',
    streamsWindowTitle: 'Windowed Aggregation',

    connectTitle: 'Kafka Connect',
    connectDesc: 'Kafka Connect is a framework for streaming data between Kafka and external systems without writing code. It uses pre-built connectors that handle serialization, offset management, and fault tolerance automatically.',
    connectSourceTitle: 'Source Connectors (External to Kafka)',
    connectSourceDesc: 'Source connectors read data from external systems and write to Kafka topics:',
    connectSinkTitle: 'Sink Connectors (Kafka to External)',
    connectSinkDesc: 'Sink connectors read from Kafka topics and write to external systems:',
    connectDebeziumTitle: 'Debezium CDC Example',
    connectDebeziumDesc: 'Debezium captures database changes (inserts, updates, deletes) and streams them as events. This is the gold standard for Change Data Capture (CDC):',

    schemaTitle: 'Schema Registry',
    schemaDesc: 'Schema Registry provides a centralized repository for schemas (Avro, Protobuf, JSON Schema) used by Kafka producers and consumers. It enforces compatibility rules to prevent breaking changes and enables schema evolution.',
    schemaFormatsTitle: 'Supported Formats',
    schemaAvro: 'Avro: Compact binary format with schema evolution. Most widely used with Kafka. Schemas defined in JSON.',
    schemaProtobuf: 'Protobuf: Google Protocol Buffers. Strongly typed, code-generated serialization. Good for cross-language services.',
    schemaJson: 'JSON Schema: Validates JSON payloads. Easiest to adopt but largest wire format.',
    schemaCompatTitle: 'Compatibility Modes',
    schemaCompatDesc: 'Schema Registry enforces compatibility rules when evolving schemas:',
    schemaRegistryExample: 'Registering and Using Schemas',

    eosTitle: 'Exactly-Once Semantics (EOS)',
    eosDesc: 'Exactly-once semantics ensure that each record is processed exactly once, even in the presence of failures. This requires coordination between producers, brokers, and consumers.',
    eosComponentsTitle: 'Three Pillars of EOS',
    eosIdempotent: 'Idempotent Producer: Prevents duplicate writes. Enabled with enable.idempotence=true. Each produce request has a unique sequence number that the broker deduplicates.',
    eosTransactional: 'Transactional Producer: Groups multiple writes into an atomic transaction. Either all records are committed or none. Requires transactional.id.',
    eosReadCommitted: 'Read Committed Consumer: Only reads records from committed transactions. Set isolation.level=read_committed.',
    eosExampleTitle: 'Transactional Producer Example',

    securityTitle: 'Kafka Security',
    securityDesc: 'Production Kafka clusters require authentication, authorization, and encryption to protect data in transit and at rest.',
    securitySaslTitle: 'SASL Authentication',
    securitySaslDesc: 'Kafka supports multiple SASL mechanisms:',
    securitySaslPlain: 'SASL/PLAIN: Username/password. Simple but credentials sent in cleartext (use with TLS).',
    securitySaslScram: 'SASL/SCRAM: Salted challenge-response. More secure than PLAIN, credentials stored as hashes.',
    securitySaslKerberos: 'SASL/GSSAPI (Kerberos): Enterprise-grade SSO integration. Complex setup but most secure.',
    securitySaslOauth: 'SASL/OAUTHBEARER: OAuth 2.0 token-based auth. Modern and cloud-friendly.',
    securityTlsTitle: 'SSL/TLS Encryption',
    securityTlsDesc: 'TLS encrypts data in transit between clients and brokers, and between brokers (inter-broker communication). Configure ssl.keystore and ssl.truststore on both brokers and clients.',
    securityAclTitle: 'ACLs (Access Control Lists)',
    securityAclDesc: 'Kafka ACLs control which principals can perform which operations on which resources:',

    perfTitle: 'Performance Tuning',
    perfDesc: 'Kafka can achieve millions of messages per second when properly tuned. The key levers are batching, compression, partition count, and OS-level settings.',
    perfProducerTitle: 'Producer Tuning',
    perfProducerBatch: 'batch.size (default 16384): Maximum bytes per batch. Increase to 65536-131072 for throughput workloads.',
    perfProducerLinger: 'linger.ms (default 0): Time to wait for additional records before sending a batch. Set to 5-20ms to fill batches better.',
    perfProducerBuffer: 'buffer.memory (default 33554432): Total producer buffer memory. Increase for high-throughput producers.',
    perfProducerCompression: 'compression.type: Use lz4 or zstd. Reduces network I/O and broker disk usage by 50-80%.',
    perfConsumerTitle: 'Consumer Tuning',
    perfConsumerFetch: 'fetch.min.bytes (default 1): Minimum data for a fetch response. Increase to 1024-65536 to reduce fetch frequency.',
    perfConsumerMax: 'max.poll.records (default 500): Maximum records per poll. Tune based on processing time per record.',
    perfConsumerSession: 'session.timeout.ms (default 45000): Consumer failure detection timeout. Reduce for faster failover.',
    perfBrokerTitle: 'Broker and OS Tuning',
    perfPartitionTitle: 'Partition Count Guidelines',
    perfPartitionDesc: 'Partition count determines parallelism. Guidelines:',
    perfPartition1: 'Start with 10-50 partitions per topic for most workloads.',
    perfPartition2: 'Use formula: max(T/P, T/C) where T=target throughput, P=producer throughput per partition, C=consumer throughput per partition.',
    perfPartition3: 'More partitions mean more file handles, leader elections, and end-to-end latency. Do not exceed 4000 partitions per broker.',
    perfPartition4: 'Partitions can only be increased, never decreased. Start conservatively.',

    monitorTitle: 'Kafka Monitoring',
    monitorDesc: 'Effective monitoring is critical for Kafka operations. Focus on broker health, producer/consumer metrics, and consumer lag.',
    monitorJmxTitle: 'Key JMX Metrics',
    monitorJmxDesc: 'Kafka exposes hundreds of JMX metrics. These are the most important:',
    monitorPrometheusTitle: 'Prometheus + Grafana Setup',
    monitorPrometheusDesc: 'The standard monitoring stack for Kafka uses JMX Exporter to expose metrics to Prometheus, with Grafana dashboards for visualization:',
    monitorLagTitle: 'Consumer Lag Monitoring',
    monitorLagDesc: 'Consumer lag is the difference between the latest offset in a partition and the consumer group committed offset. Increasing lag indicates consumers cannot keep up with producers. Monitor with:',
    monitorLag1: 'kafka-consumer-groups.sh --describe: Built-in CLI tool showing lag per partition.',
    monitorLag2: 'Burrow: LinkedIn open-source consumer lag monitoring with anomaly detection.',
    monitorLag3: 'Prometheus kafka_consumergroup_lag metric via JMX Exporter or kafka-lag-exporter.',
    monitorCruiseTitle: 'Cruise Control',
    monitorCruiseDesc: 'LinkedIn Cruise Control automates Kafka cluster operations: partition rebalancing, broker decommissioning, and anomaly detection. It monitors load distribution and generates rebalance proposals.',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is Apache Kafka and when should I use it?',
    faq1a: 'Kafka is a distributed event streaming platform for building real-time data pipelines and streaming applications. Use it when you need high-throughput event ingestion, decoupled microservices communication, event sourcing, log aggregation, or real-time analytics. Kafka handles millions of messages per second with low latency and strong durability guarantees.',
    faq2q: 'What is the difference between Kafka and a traditional message queue like RabbitMQ?',
    faq2a: 'Kafka is a distributed log (messages are retained and can be replayed), while traditional queues delete messages after consumption. Kafka supports multiple consumers reading the same data independently (consumer groups), provides ordering within partitions, and scales horizontally. RabbitMQ is better for complex routing and when you need message acknowledgment per message.',
    faq3q: 'How many partitions should I create for a topic?',
    faq3a: 'Start with 10-50 partitions for most workloads. The formula is max(T/P, T/C) where T is target throughput, P is producer throughput per partition, and C is consumer throughput per partition. More partitions increase parallelism but also increase metadata overhead, file handles, and rebalancing time. Partitions cannot be decreased once created.',
    faq4q: 'Should I use ZooKeeper or KRaft mode?',
    faq4a: 'For new deployments, use KRaft mode. It is production-ready since Kafka 3.3, eliminates the ZooKeeper dependency, supports more partitions per cluster, and simplifies operations. Existing ZooKeeper-based clusters can be migrated to KRaft using the migration tool provided by Apache Kafka.',
    faq5q: 'How do I achieve exactly-once semantics in Kafka?',
    faq5a: 'Enable idempotent producers (enable.idempotence=true), use transactional producers (set transactional.id and wrap sends in beginTransaction/commitTransaction), and configure consumers with isolation.level=read_committed. For Kafka Streams, set processing.guarantee=exactly_once_v2.',
    faq6q: 'What is consumer lag and why does it matter?',
    faq6a: 'Consumer lag is the difference between the latest message offset in a partition and the offset committed by a consumer group. Increasing lag means consumers are falling behind producers. This leads to stale data, increased end-to-end latency, and potential data loss if retention expires. Monitor lag with Burrow, Prometheus, or the kafka-consumer-groups.sh CLI tool.',
    faq7q: 'How does Kafka guarantee message ordering?',
    faq7a: 'Kafka guarantees ordering within a single partition only. Messages with the same key are always sent to the same partition (via key hashing), so per-key ordering is guaranteed. There is no ordering guarantee across partitions. If you need global ordering, use a single partition (limits throughput) or implement ordering logic at the application level.',
    faq8q: 'What is Schema Registry and do I need it?',
    faq8a: 'Schema Registry is a centralized service for managing schemas (Avro, Protobuf, JSON Schema) used by Kafka producers and consumers. It enables schema evolution with compatibility checks, preventing producers from publishing data that consumers cannot read. You need it if you have multiple teams producing/consuming data, require data governance, or want to enforce contracts between services.',
  },
  zh: {
    title: 'Apache Kafka 完整指南：架构、生产者、消费者、流处理与运维',
    intro: 'Apache Kafka 是一个分布式事件流平台，被数千家公司用于高吞吐量、低延迟的数据管道、流式分析和关键任务应用。Kafka 最初由 LinkedIn 开发，于 2011 年开源，已成为事件驱动架构的事实标准。本指南全面涵盖 Kafka 架构、生产者、消费者、Node.js/Java/Python 客户端库、Kafka Streams、Kafka Connect、Schema Registry、精确一次语义、安全性、性能调优和监控。',
    tldr: 'TL;DR',
    tldrText: 'Kafka 是一个分布式提交日志，将数据组织为跨 broker 集群的 topic 和 partition。生产者写入事件，消费者通过消费者组读取，Kafka 保证分区内的有序性。新部署使用 KRaft 模式（无需 ZooKeeper），启用幂等生产者以确保安全，利用 Kafka Streams 或 Connect 构建处理管道。每个 topic 目标 10-100 个分区，调整 batch.size 和 linger.ms 以提升吞吐量，将消费者延迟作为主要健康指标进行监控。',
    takeawaysTitle: '关键要点',
    takeaway1: 'Kafka 将数据组织为 topic，再拆分为 partition 以实现并行处理。每个 partition 是有序、不可变的追加日志。',
    takeaway2: 'KRaft 模式在 Kafka 3.3+ 中取代 ZooKeeper 进行元数据管理，简化运维并提升可扩展性。',
    takeaway3: '消费者组实现水平扩展——组内每个 partition 恰好由一个消费者消费。',
    takeaway4: '幂等生产者（enable.idempotence=true）在重试期间防止重复消息，几乎无性能开销。',
    takeaway5: '精确一次语义需要事务生产者 + 消费者端 read_committed 隔离级别。',
    takeaway6: 'Kafka Connect 提供预构建的数据库、云存储和搜索引擎连接器，无需自定义代码。',
    takeaway7: '消费者延迟是最重要的运维指标——使用 Prometheus、Burrow 或 Cruise Control 进行监控。',

    archTitle: 'Kafka 架构',
    archDesc: 'Kafka 是由 broker、topic、partition 和副本组成的分布式系统。理解这些构建模块是编写代码之前的必要准备。',
    archBrokersTitle: 'Broker 与集群',
    archBrokersDesc: 'Kafka 集群由多个 broker（服务器）组成。每个 broker 存储 topic partition 的子集并处理客户端请求。Broker 通过唯一的整数 ID 标识。其中一个 broker 充当控制器，管理 partition 领导权和集群元数据。',
    archTopicsTitle: 'Topic 与 Partition',
    archTopicsDesc: 'Topic 是消息的命名类别。每个 topic 被拆分为一个或多个 partition。Partition 是有序的、不可变的记录序列，每条记录被分配一个顺序偏移量。Partition 分布在各 broker 上以实现并行性和容错性。',
    archReplicationTitle: '副本机制',
    archReplicationDesc: '每个 partition 有可配置的副本因子（通常为 3）。一个副本是 leader（处理读/写），其余是 follower（复制 leader）。如果 leader 失败，follower 被选举为新 leader。ISR（同步副本集）跟踪哪些副本已跟上。',
    archZkKraftTitle: 'ZooKeeper vs KRaft',
    archZkKraftDesc: '历史上 Kafka 使用 Apache ZooKeeper 进行元数据管理（broker 注册、topic 配置、控制器选举）。KRaft（Kafka Raft）模式自 Kafka 3.3 起可用于生产，使用 Raft 共识协议将元数据移入 Kafka 本身。KRaft 消除了 ZooKeeper 依赖，支持更多分区，简化部署。',

    producerTitle: '生产者',
    producerDesc: '生产者将记录发布到 Kafka topic。理解分区、确认和幂等性对可靠的数据摄取至关重要。',
    producerPartTitle: '分区策略',
    producerPartDesc: '生产者使用分区器确定记录发送到哪个分区。默认分区器对记录键进行哈希以选择分区（相同键的记录总是到同一分区）。如果没有键，粘性分区器会将记录批量发送到同一分区以提高效率。',
    producerAcksTitle: '确认机制（acks）',
    producerAcksDesc: 'acks 设置控制持久性保证：',
    producerAcks0: 'acks=0：发后即忘。生产者不等待任何确认。最快但有数据丢失风险。',
    producerAcks1: 'acks=1：Leader 确认。生产者等待 partition leader 写入记录。如果 leader 在复制前失败可能丢失数据。',
    producerAcksAll: 'acks=all (-1)：完整 ISR 确认。生产者等待所有同步副本写入。最强的持久性保证。生产环境配合 min.insync.replicas=2 使用。',
    producerIdempotentTitle: '幂等生产者',
    producerIdempotentDesc: '启用 enable.idempotence=true 以防止重试期间的重复记录。Broker 为每条记录分配生产者 ID 和序列号，自动去重任何重试。性能开销可忽略不计，应默认启用。',
    producerCompressionTitle: '压缩',
    producerCompressionDesc: '生产者可在发送前压缩批次。压缩以 CPU 为代价减少网络带宽和 broker 存储。支持的编解码器：none、gzip、snappy、lz4、zstd。使用 lz4 或 zstd 获得速度和压缩比的最佳平衡。',

    consumerTitle: '消费者',
    consumerDesc: '消费者从 Kafka topic 读取记录。消费者组实现并行处理，偏移量管理控制处理哪些记录。',
    consumerGroupTitle: '消费者组',
    consumerGroupDesc: '消费者组是一组协作消费 topic 的消费者。每个 partition 恰好分配给组内一个消费者。如果消费者多于分区，部分消费者空闲。如果消费者失败，其分区重新分配给剩余消费者（重平衡）。',
    consumerOffsetTitle: '偏移量管理',
    consumerOffsetDesc: '每个消费者通过偏移量跟踪其在每个 partition 中的位置。偏移量提交到 __consumer_offsets 内部 topic。自动提交（enable.auto.commit=true）定期提交偏移量，但手动提交（commitSync/commitAsync）提供更多控制。始终在成功处理批次后提交以避免重复处理或数据丢失。',
    consumerRebalanceTitle: '重平衡策略',
    consumerRebalanceDesc: '当消费者加入或离开组时，partition 被重新平衡：',
    consumerRebalanceEager: 'Eager（旧版默认）：所有 partition 被撤销并重新分配。导致全局暂停。',
    consumerRebalanceCoop: 'Cooperative Sticky：仅受影响的 partition 被重新分配。其他消费者继续处理。生产环境使用 CooperativeStickyAssignor。',

    nodejsTitle: 'Kafka 与 Node.js (KafkaJS)',
    nodejsDesc: 'KafkaJS 是最流行的纯 JavaScript Apache Kafka 客户端。支持生产者、消费者、管理操作和精确一次语义。',
    nodejsProducerTitle: 'Node.js 生产者示例',
    nodejsConsumerTitle: 'Node.js 消费者示例',
    nodejsErrorTitle: '错误处理',

    javaTitle: 'Kafka 与 Java / Spring Boot',
    javaDesc: 'Spring Kafka 提供与 Spring 生态系统的深度集成。它用 KafkaTemplate 和 @KafkaListener 等便利抽象包装了 Apache Kafka Java 客户端。',
    javaProducerTitle: 'Spring Kafka 生产者',
    javaConsumerTitle: 'Spring Kafka 消费者',
    javaConfigTitle: 'application.yml 配置',

    pythonTitle: 'Kafka 与 Python',
    pythonDesc: 'confluent-kafka-python 是推荐的 Python 客户端，基于 librdkafka 构建以实现高性能。支持与 Schema Registry 集成的 Avro 序列化。',
    pythonProducerTitle: 'Python 生产者示例',
    pythonConsumerTitle: 'Python 消费者与 Avro',

    streamsTitle: 'Kafka Streams',
    streamsDesc: 'Kafka Streams 是用于构建实时流处理应用的客户端库。它从输入 topic 处理数据并将结果写入输出 topic，内置支持有状态操作、窗口化和精确一次处理。',
    streamsConceptsTitle: '核心概念',
    streamsConceptKStream: 'KStream：无界的记录流。每条记录是独立事件（插入语义）。',
    streamsConceptKTable: 'KTable：变更日志流。每条记录是对键的更新（更新插入语义）。表示每个键的最新值。',
    streamsConceptWindow: '窗口化：按时间窗口（滚动、跳跃、滑动、会话）分组记录，用于基于时间的聚合。',
    streamsConceptJoin: '连接：KStream-KStream（窗口化）、KStream-KTable（丰富）、KTable-KTable（物化视图）。',
    streamsExampleTitle: '词频统计示例',
    streamsWindowTitle: '窗口化聚合',

    connectTitle: 'Kafka Connect',
    connectDesc: 'Kafka Connect 是一个在 Kafka 和外部系统之间流式传输数据的框架，无需编写代码。它使用预构建的连接器自动处理序列化、偏移量管理和容错。',
    connectSourceTitle: 'Source 连接器（外部到 Kafka）',
    connectSourceDesc: 'Source 连接器从外部系统读取数据并写入 Kafka topic：',
    connectSinkTitle: 'Sink 连接器（Kafka 到外部）',
    connectSinkDesc: 'Sink 连接器从 Kafka topic 读取并写入外部系统：',
    connectDebeziumTitle: 'Debezium CDC 示例',
    connectDebeziumDesc: 'Debezium 捕获数据库变更（插入、更新、删除）并作为事件进行流式传输。这是变更数据捕获（CDC）的黄金标准：',

    schemaTitle: 'Schema Registry',
    schemaDesc: 'Schema Registry 提供由 Kafka 生产者和消费者使用的模式（Avro、Protobuf、JSON Schema）的集中式存储库。它强制执行兼容性规则以防止破坏性变更，并支持模式演进。',
    schemaFormatsTitle: '支持的格式',
    schemaAvro: 'Avro：紧凑的二进制格式，支持模式演进。Kafka 中使用最广泛。模式以 JSON 定义。',
    schemaProtobuf: 'Protobuf：Google Protocol Buffers。强类型、代码生成的序列化。适合跨语言服务。',
    schemaJson: 'JSON Schema：验证 JSON 载荷。最易采用但线上格式最大。',
    schemaCompatTitle: '兼容性模式',
    schemaCompatDesc: 'Schema Registry 在模式演进时强制执行兼容性规则：',
    schemaRegistryExample: '注册和使用模式',

    eosTitle: '精确一次语义（EOS）',
    eosDesc: '精确一次语义确保每条记录即使在故障情况下也只被处理一次。这需要生产者、broker 和消费者之间的协调。',
    eosComponentsTitle: 'EOS 三大支柱',
    eosIdempotent: '幂等生产者：防止重复写入。通过 enable.idempotence=true 启用。每个生产请求有唯一的序列号，broker 自动去重。',
    eosTransactional: '事务生产者：将多次写入分组为原子事务。要么所有记录提交，要么全部不提交。需要 transactional.id。',
    eosReadCommitted: 'Read Committed 消费者：仅读取已提交事务的记录。设置 isolation.level=read_committed。',
    eosExampleTitle: '事务生产者示例',

    securityTitle: 'Kafka 安全',
    securityDesc: '生产环境 Kafka 集群需要认证、授权和加密来保护传输和静态数据。',
    securitySaslTitle: 'SASL 认证',
    securitySaslDesc: 'Kafka 支持多种 SASL 机制：',
    securitySaslPlain: 'SASL/PLAIN：用户名/密码。简单但凭证以明文发送（配合 TLS 使用）。',
    securitySaslScram: 'SASL/SCRAM：加盐挑战-响应。比 PLAIN 更安全，凭证存储为哈希值。',
    securitySaslKerberos: 'SASL/GSSAPI (Kerberos)：企业级 SSO 集成。设置复杂但最安全。',
    securitySaslOauth: 'SASL/OAUTHBEARER：基于 OAuth 2.0 令牌的认证。现代且云友好。',
    securityTlsTitle: 'SSL/TLS 加密',
    securityTlsDesc: 'TLS 加密客户端与 broker 之间以及 broker 之间（broker 间通信）传输的数据。在 broker 和客户端上配置 ssl.keystore 和 ssl.truststore。',
    securityAclTitle: 'ACL（访问控制列表）',
    securityAclDesc: 'Kafka ACL 控制哪些主体可以对哪些资源执行哪些操作：',

    perfTitle: '性能调优',
    perfDesc: '经过适当调优，Kafka 可以实现每秒数百万条消息。关键调优参数是批处理、压缩、分区数和操作系统级设置。',
    perfProducerTitle: '生产者调优',
    perfProducerBatch: 'batch.size（默认 16384）：每批最大字节数。吞吐量工作负载增加到 65536-131072。',
    perfProducerLinger: 'linger.ms（默认 0）：发送批次前等待额外记录的时间。设为 5-20ms 以更好地填充批次。',
    perfProducerBuffer: 'buffer.memory（默认 33554432）：生产者总缓冲区内存。高吞吐量生产者可增加。',
    perfProducerCompression: 'compression.type：使用 lz4 或 zstd。减少网络 I/O 和 broker 磁盘使用 50-80%。',
    perfConsumerTitle: '消费者调优',
    perfConsumerFetch: 'fetch.min.bytes（默认 1）：获取响应的最小数据。增加到 1024-65536 以减少获取频率。',
    perfConsumerMax: 'max.poll.records（默认 500）：每次轮询的最大记录数。根据每条记录的处理时间调整。',
    perfConsumerSession: 'session.timeout.ms（默认 45000）：消费者故障检测超时。减小以加快故障转移。',
    perfBrokerTitle: 'Broker 和操作系统调优',
    perfPartitionTitle: '分区数量指南',
    perfPartitionDesc: '分区数量决定并行度。指南：',
    perfPartition1: '大多数工作负载每个 topic 从 10-50 个分区开始。',
    perfPartition2: '使用公式：max(T/P, T/C)，其中 T=目标吞吐量，P=每分区生产者吞吐量，C=每分区消费者吞吐量。',
    perfPartition3: '更多分区意味着更多文件句柄、leader 选举和端到端延迟。每个 broker 不要超过 4000 个分区。',
    perfPartition4: '分区只能增加不能减少。保守开始。',

    monitorTitle: 'Kafka 监控',
    monitorDesc: '有效的监控对 Kafka 运维至关重要。重点关注 broker 健康、生产者/消费者指标和消费者延迟。',
    monitorJmxTitle: '关键 JMX 指标',
    monitorJmxDesc: 'Kafka 暴露数百个 JMX 指标。以下是最重要的：',
    monitorPrometheusTitle: 'Prometheus + Grafana 设置',
    monitorPrometheusDesc: 'Kafka 的标准监控栈使用 JMX Exporter 将指标暴露给 Prometheus，用 Grafana 仪表板进行可视化：',
    monitorLagTitle: '消费者延迟监控',
    monitorLagDesc: '消费者延迟是 partition 中最新偏移量与消费者组已提交偏移量之间的差异。延迟增加表示消费者无法跟上生产者。监控方式：',
    monitorLag1: 'kafka-consumer-groups.sh --describe：内置 CLI 工具，显示每个 partition 的延迟。',
    monitorLag2: 'Burrow：LinkedIn 开源消费者延迟监控，带异常检测。',
    monitorLag3: 'Prometheus kafka_consumergroup_lag 指标，通过 JMX Exporter 或 kafka-lag-exporter。',
    monitorCruiseTitle: 'Cruise Control',
    monitorCruiseDesc: 'LinkedIn Cruise Control 自动化 Kafka 集群操作：partition 重新平衡、broker 退役和异常检测。它监控负载分布并生成重新平衡提议。',

    faqTitle: '常见问题',
    faq1q: '什么是 Apache Kafka，何时应该使用它？',
    faq1a: 'Kafka 是一个分布式事件流平台，用于构建实时数据管道和流式应用。当你需要高吞吐量事件摄取、解耦的微服务通信、事件溯源、日志聚合或实时分析时使用它。Kafka 以低延迟和强持久性保证处理每秒数百万条消息。',
    faq2q: 'Kafka 与 RabbitMQ 等传统消息队列有什么区别？',
    faq2a: 'Kafka 是分布式日志（消息被保留并可重放），而传统队列在消费后删除消息。Kafka 支持多个消费者独立读取相同数据（消费者组），在分区内提供有序性，并可水平扩展。RabbitMQ 更适合复杂路由和需要逐条消息确认的场景。',
    faq3q: '一个 topic 应该创建多少个分区？',
    faq3a: '大多数工作负载从 10-50 个分区开始。公式为 max(T/P, T/C)，其中 T 是目标吞吐量，P 是每分区生产者吞吐量，C 是每分区消费者吞吐量。更多分区增加并行性，但也增加元数据开销、文件句柄和重新平衡时间。分区一旦创建不能减少。',
    faq4q: '应该使用 ZooKeeper 还是 KRaft 模式？',
    faq4a: '新部署使用 KRaft 模式。自 Kafka 3.3 起可用于生产，消除 ZooKeeper 依赖，支持每个集群更多分区，简化运维。现有基于 ZooKeeper 的集群可使用 Apache Kafka 提供的迁移工具迁移到 KRaft。',
    faq5q: '如何在 Kafka 中实现精确一次语义？',
    faq5a: '启用幂等生产者（enable.idempotence=true），使用事务生产者（设置 transactional.id 并将发送包装在 beginTransaction/commitTransaction 中），配置消费者 isolation.level=read_committed。对于 Kafka Streams，设置 processing.guarantee=exactly_once_v2。',
    faq6q: '什么是消费者延迟，为什么重要？',
    faq6a: '消费者延迟是 partition 中最新消息偏移量与消费者组已提交偏移量之间的差异。延迟增加意味着消费者落后于生产者。这导致数据过时、端到端延迟增加以及保留期过期时的潜在数据丢失。使用 Burrow、Prometheus 或 kafka-consumer-groups.sh CLI 工具监控延迟。',
    faq7q: 'Kafka 如何保证消息顺序？',
    faq7a: 'Kafka 仅在单个 partition 内保证顺序。具有相同键的消息总是发送到同一 partition（通过键哈希），因此每个键的顺序是有保证的。跨分区没有顺序保证。如果需要全局顺序，使用单个分区（限制吞吐量）或在应用层实现排序逻辑。',
    faq8q: '什么是 Schema Registry，我需要它吗？',
    faq8a: 'Schema Registry 是一个集中式服务，管理 Kafka 生产者和消费者使用的模式（Avro、Protobuf、JSON Schema）。它通过兼容性检查实现模式演进，防止生产者发布消费者无法读取的数据。如果你有多个团队生产/消费数据、需要数据治理或想在服务之间强制执行契约，就需要它。',
  },
};

/* ── Code Blocks ── */

const codeArchitecture = `# Kafka Cluster Architecture
#
# Cluster: 3 Brokers, Topic "orders" with 3 partitions, replication factor 3
#
# Broker 0 (Controller)      Broker 1                  Broker 2
# ┌──────────────────┐       ┌──────────────────┐      ┌──────────────────┐
# │ orders-P0 (L)    │       │ orders-P0 (F)    │      │ orders-P0 (F)    │
# │ orders-P1 (F)    │       │ orders-P1 (L)    │      │ orders-P1 (F)    │
# │ orders-P2 (F)    │       │ orders-P2 (F)    │      │ orders-P2 (L)    │
# └──────────────────┘       └──────────────────┘      └──────────────────┘
#
# L = Leader, F = Follower
# ISR (In-Sync Replicas) = all replicas that are caught up with the leader`;

const codeKRaftConfig = `# KRaft mode server.properties (no ZooKeeper required)
# Kafka 3.3+ — production-ready metadata management

# Node roles: controller, broker, or both
process.roles=broker,controller

# Unique node ID
node.id=1

# Controller quorum voters: id@host:port
controller.quorum.voters=1@kafka-1:9093,2@kafka-2:9093,3@kafka-3:9093

# Listener configuration
listeners=PLAINTEXT://:9092,CONTROLLER://:9093
inter.broker.listener.name=PLAINTEXT
controller.listener.names=CONTROLLER

# Log directories
log.dirs=/var/kafka-logs
metadata.log.dir=/var/kafka-metadata

# Cluster ID (generate with kafka-storage.sh random-uuid)
# kafka-storage.sh format -t <uuid> -c server.properties`;

const codeProducerConfig = `# Producer configuration — production settings
bootstrap.servers=kafka-1:9092,kafka-2:9092,kafka-3:9092

# Durability
acks=all
enable.idempotence=true
max.in.flight.requests.per.connection=5
retries=2147483647

# Batching and throughput
batch.size=65536
linger.ms=10
buffer.memory=67108864
compression.type=lz4

# Serialization
key.serializer=org.apache.kafka.common.serialization.StringSerializer
value.serializer=org.apache.kafka.common.serialization.StringSerializer

# Partitioner
partitioner.class=org.apache.kafka.clients.producer.RoundRobinPartitioner`;

const codeNodeProducer = `// Node.js Producer with KafkaJS
const { Kafka, CompressionTypes } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['kafka-1:9092', 'kafka-2:9092', 'kafka-3:9092'],
  retry: { retries: 5, initialRetryTime: 300 },
});

const producer = kafka.producer({
  idempotent: true,            // prevent duplicate messages
  maxInFlightRequests: 5,
  transactionalId: 'order-tx', // for exactly-once semantics
});

async function sendOrder(order) {
  await producer.connect();

  // Transactional send (exactly-once)
  const transaction = await producer.transaction();
  try {
    await transaction.send({
      topic: 'orders',
      compression: CompressionTypes.LZ4,
      messages: [
        {
          key: order.userId,      // ensures per-user ordering
          value: JSON.stringify(order),
          headers: {
            'event-type': 'ORDER_CREATED',
            'correlation-id': order.id,
          },
        },
      ],
    });

    // Send to analytics topic in same transaction
    await transaction.send({
      topic: 'order-analytics',
      messages: [
        {
          key: order.userId,
          value: JSON.stringify({
            orderId: order.id,
            total: order.total,
            timestamp: Date.now(),
          }),
        },
      ],
    });

    await transaction.commit();
    console.log('Order sent successfully:', order.id);
  } catch (err) {
    await transaction.abort();
    console.error('Transaction aborted:', err.message);
    throw err;
  }
}`;

const codeNodeConsumer = `// Node.js Consumer with KafkaJS
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-processor',
  brokers: ['kafka-1:9092', 'kafka-2:9092', 'kafka-3:9092'],
});

const consumer = kafka.consumer({
  groupId: 'order-processing-group',
  sessionTimeout: 30000,
  heartbeatInterval: 3000,
  maxWaitTimeInMs: 5000,
  // Use CooperativeSticky for non-stop rebalancing
  partitionAssigners: [
    require('kafkajs').PartitionAssigners.roundRobin,
  ],
});

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({
    topics: ['orders'],
    fromBeginning: false,
  });

  await consumer.run({
    autoCommit: false, // manual offset management
    eachBatch: async ({ batch, resolveOffset, commitOffsetsIfNecessary }) => {
      for (const message of batch.messages) {
        const order = JSON.parse(message.value.toString());
        const eventType = message.headers['event-type']?.toString();

        console.log(
          'Processing:', eventType,
          'Partition:', batch.partition,
          'Offset:', message.offset
        );

        try {
          await processOrder(order); // your business logic
          resolveOffset(message.offset);
          await commitOffsetsIfNecessary();
        } catch (err) {
          console.error('Processing failed:', err);
          // Dead letter queue pattern
          await sendToDeadLetterQueue(message, err);
          resolveOffset(message.offset);
        }
      }
    },
  });
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down consumer...');
  await consumer.disconnect();
  process.exit(0);
});`;

const codeNodeError = `// Error handling patterns for KafkaJS

const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'resilient-service',
  brokers: ['kafka-1:9092', 'kafka-2:9092'],
  retry: {
    retries: 8,
    initialRetryTime: 100,
    maxRetryTime: 30000,
    factor: 2, // exponential backoff
  },
  connectionTimeout: 10000,
  requestTimeout: 30000,
});

const producer = kafka.producer();

// Retry wrapper with circuit breaker pattern
async function sendWithRetry(topic, messages, maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      await producer.send({ topic, messages });
      return; // success
    } catch (err) {
      attempt++;
      if (err.type === 'LEADER_NOT_AVAILABLE') {
        // Transient error — retry after backoff
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
        console.warn('Leader not available, retrying in ' + delay + 'ms');
        await new Promise(r => setTimeout(r, delay));
      } else if (err.type === 'REQUEST_TIMED_OUT') {
        console.warn('Request timed out, attempt ' + attempt);
      } else {
        // Non-retriable error
        console.error('Fatal producer error:', err);
        throw err;
      }
    }
  }
  throw new Error('Max retries exceeded for topic: ' + topic);
}`;

const codeSpringProducer = `// Spring Kafka Producer — OrderProducerService.java
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;

@Service
public class OrderProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public OrderProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendOrder(String orderId, String orderJson) {
        CompletableFuture<SendResult<String, String>> future =
            kafkaTemplate.send("orders", orderId, orderJson);

        future.whenComplete((result, ex) -> {
            if (ex != null) {
                System.err.println("Failed to send order: " + ex.getMessage());
            } else {
                System.out.println("Order sent to partition "
                    + result.getRecordMetadata().partition()
                    + " offset " + result.getRecordMetadata().offset());
            }
        });
    }

    // Transactional send
    public void sendOrderTransactional(String orderId, String orderJson) {
        kafkaTemplate.executeInTransaction(ops -> {
            ops.send("orders", orderId, orderJson);
            ops.send("order-audit", orderId, "CREATED:" + orderJson);
            return true;
        });
    }
}`;

const codeSpringConsumer = `// Spring Kafka Consumer — OrderConsumerService.java
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class OrderConsumerService {

    @KafkaListener(
        topics = "orders",
        groupId = "order-processing-group",
        concurrency = "3",   // 3 consumer threads
        containerFactory = "kafkaListenerContainerFactory"
    )
    public void handleOrder(
            @Payload String orderJson,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            @Header(KafkaHeaders.OFFSET) long offset,
            Acknowledgment ack) {

        try {
            System.out.println("Received order on partition "
                + partition + " offset " + offset);

            // Process the order
            Order order = objectMapper.readValue(orderJson, Order.class);
            orderService.process(order);

            // Manual acknowledgment after successful processing
            ack.acknowledge();
        } catch (Exception e) {
            System.err.println("Error processing order: " + e.getMessage());
            // Send to dead letter topic or retry topic
            kafkaTemplate.send("orders.DLT", orderJson);
            ack.acknowledge(); // still ack to avoid infinite loop
        }
    }

    // Batch listener for high-throughput scenarios
    @KafkaListener(topics = "events", groupId = "event-batch-group")
    public void handleEventBatch(List<String> events, Acknowledgment ack) {
        System.out.println("Batch of " + events.size() + " events");
        events.forEach(this::processEvent);
        ack.acknowledge();
    }
}`;

const codeSpringConfig = `# application.yml — Spring Kafka Configuration
spring:
  kafka:
    bootstrap-servers: kafka-1:9092,kafka-2:9092,kafka-3:9092

    producer:
      acks: all
      retries: 3
      batch-size: 65536
      linger-ms: 10
      compression-type: lz4
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
      properties:
        enable.idempotence: true
        max.in.flight.requests.per.connection: 5

    consumer:
      group-id: order-processing-group
      auto-offset-reset: earliest
      enable-auto-commit: false
      max-poll-records: 100
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      properties:
        isolation.level: read_committed
        partition.assignment.strategy: org.apache.kafka.clients.consumer.CooperativeStickyAssignor

    listener:
      ack-mode: manual
      concurrency: 3`;

const codePythonProducer = `# Python Producer with confluent-kafka
from confluent_kafka import Producer
import json
import socket

conf = {
    'bootstrap.servers': 'kafka-1:9092,kafka-2:9092',
    'client.id': socket.gethostname(),
    'acks': 'all',
    'enable.idempotence': True,
    'compression.type': 'lz4',
    'batch.size': 65536,
    'linger.ms': 10,
    'retries': 5,
}

producer = Producer(conf)

def delivery_callback(err, msg):
    if err:
        print(f'Message delivery failed: {err}')
    else:
        print(f'Delivered to {msg.topic()} '
              f'partition [{msg.partition()}] '
              f'offset {msg.offset()}')

def send_order(order):
    producer.produce(
        topic='orders',
        key=order['user_id'],
        value=json.dumps(order).encode('utf-8'),
        headers={'event-type': 'ORDER_CREATED'},
        callback=delivery_callback,
    )
    # Trigger delivery callbacks
    producer.poll(0)

# Flush remaining messages on shutdown
def shutdown():
    remaining = producer.flush(timeout=30)
    if remaining > 0:
        print(f'Warning: {remaining} messages not delivered')

# Usage
order = {
    'id': 'ORD-001',
    'user_id': 'USR-123',
    'items': [{'sku': 'WIDGET-A', 'qty': 2, 'price': 9.99}],
    'total': 19.98,
}
send_order(order)`;

const codePythonAvro = `# Python Consumer with Avro deserialization
from confluent_kafka import Consumer
from confluent_kafka.schema_registry import SchemaRegistryClient
from confluent_kafka.schema_registry.avro import AvroDeserializer
from confluent_kafka.serialization import (
    SerializationContext, MessageField
)

# Schema Registry client
sr_client = SchemaRegistryClient({
    'url': 'http://schema-registry:8081'
})

# Avro deserializer (auto-fetches schema from registry)
avro_deserializer = AvroDeserializer(
    sr_client,
    schema_str=None,  # auto-detect from schema registry
)

consumer_conf = {
    'bootstrap.servers': 'kafka-1:9092,kafka-2:9092',
    'group.id': 'order-avro-consumer',
    'auto.offset.reset': 'earliest',
    'enable.auto.commit': False,
    'isolation.level': 'read_committed',
}

consumer = Consumer(consumer_conf)
consumer.subscribe(['orders-avro'])

try:
    while True:
        msg = consumer.poll(timeout=1.0)
        if msg is None:
            continue
        if msg.error():
            print(f'Consumer error: {msg.error()}')
            continue

        # Deserialize Avro message
        order = avro_deserializer(
            msg.value(),
            SerializationContext(msg.topic(), MessageField.VALUE),
        )

        print(f'Order: {order["id"]} '
              f'Total: \${order["total"]:.2f} '
              f'Partition: {msg.partition()} '
              f'Offset: {msg.offset()}')

        # Process order...
        process_order(order)

        # Manual commit after processing
        consumer.commit(asynchronous=False)

except KeyboardInterrupt:
    pass
finally:
    consumer.close()`;

const codeStreamsWordCount = `// Kafka Streams — Word Count Application (Java)
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.*;
import org.apache.kafka.common.serialization.Serdes;
import java.util.Arrays;
import java.util.Properties;

public class WordCountApp {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "word-count-app");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG,
            Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG,
            Serdes.String().getClass());
        // Exactly-once processing
        props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG,
            StreamsConfig.EXACTLY_ONCE_V2);

        StreamsBuilder builder = new StreamsBuilder();

        // KStream: read from "text-input" topic
        KStream<String, String> textLines =
            builder.stream("text-input");

        // Process: split lines into words, group, count
        KTable<String, Long> wordCounts = textLines
            .flatMapValues(line ->
                Arrays.asList(line.toLowerCase().split("\\\\W+")))
            .filter((key, word) -> word.length() > 0)
            .groupBy((key, word) -> word)
            .count(Materialized.as("word-counts-store"));

        // Write results to "word-counts" output topic
        wordCounts.toStream()
            .to("word-counts", Produced.with(
                Serdes.String(), Serdes.Long()));

        KafkaStreams streams = new KafkaStreams(
            builder.build(), props);

        // Graceful shutdown
        Runtime.getRuntime().addShutdownHook(
            new Thread(streams::close));

        streams.start();
    }
}`;

const codeStreamsWindow = `// Windowed Aggregation — Orders per minute per region
StreamsBuilder builder = new StreamsBuilder();

KStream<String, Order> orders = builder.stream(
    "orders",
    Consumed.with(Serdes.String(), orderSerde)
);

// Tumbling window: 1-minute non-overlapping windows
KTable<Windowed<String>, Long> ordersPerMinute = orders
    .groupBy((key, order) -> order.getRegion())
    .windowedBy(TimeWindows.ofSizeWithNoGrace(
        Duration.ofMinutes(1)))
    .count(Materialized.as("orders-per-minute"));

// Hopping window: 5-minute window, advancing every 1 minute
KTable<Windowed<String>, Double> avgOrderValue = orders
    .groupBy((key, order) -> order.getRegion())
    .windowedBy(TimeWindows.ofSizeAndGrace(
        Duration.ofMinutes(5), Duration.ofSeconds(30))
        .advanceBy(Duration.ofMinutes(1)))
    .aggregate(
        () -> new OrderStats(0, 0.0),
        (key, order, stats) -> stats.add(order.getTotal()),
        Materialized.with(Serdes.String(), orderStatsSerde)
    )
    .mapValues(stats -> stats.getAverage());

// Session window: group by user session (30-min inactivity gap)
KTable<Windowed<String>, Long> userSessions = orders
    .groupBy((key, order) -> order.getUserId())
    .windowedBy(SessionWindows.ofInactivityGapWithNoGrace(
        Duration.ofMinutes(30)))
    .count(Materialized.as("user-sessions"));`;

const codeConnectSource = `// Kafka Connect — JDBC Source Connector Configuration
// Reads from PostgreSQL, writes to Kafka topics
{
  "name": "postgres-source-orders",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "connection.url": "jdbc:postgresql://db:5432/ecommerce",
    "connection.user": "kafka_connect",
    "connection.password": "\${POSTGRES_PASSWORD}",
    "table.whitelist": "orders,order_items,customers",
    "mode": "timestamp+incrementing",
    "timestamp.column.name": "updated_at",
    "incrementing.column.name": "id",
    "topic.prefix": "db.",
    "poll.interval.ms": 5000,
    "batch.max.rows": 1000,
    "transforms": "createKey,extractId",
    "transforms.createKey.type":
      "org.apache.kafka.connect.transforms.ValueToKey",
    "transforms.createKey.fields": "id",
    "transforms.extractId.type":
      "org.apache.kafka.connect.transforms.ExtractField$Key",
    "transforms.extractId.field": "id"
  }
}`;

const codeConnectSink = `// Kafka Connect — S3 Sink Connector Configuration
// Reads from Kafka, writes Parquet files to S3
{
  "name": "s3-sink-orders",
  "config": {
    "connector.class": "io.confluent.connect.s3.S3SinkConnector",
    "tasks.max": 3,
    "topics": "db.orders,db.order_items",
    "s3.region": "us-east-1",
    "s3.bucket.name": "data-lake-raw",
    "s3.part.size": 5242880,
    "flush.size": 10000,
    "rotate.interval.ms": 600000,
    "storage.class":
      "io.confluent.connect.s3.storage.S3Storage",
    "format.class":
      "io.confluent.connect.s3.format.parquet.ParquetFormat",
    "parquet.codec": "snappy",
    "partitioner.class":
      "io.confluent.connect.storage.partitioner.TimeBasedPartitioner",
    "partition.duration.ms": 3600000,
    "path.format": "'year'=YYYY/'month'=MM/'day'=dd/'hour'=HH",
    "locale": "en-US",
    "timezone": "UTC",
    "timestamp.extractor": "RecordField",
    "timestamp.field": "updated_at"
  }
}`;

const codeDebezium = `// Debezium CDC — MySQL Source Connector
// Captures INSERT, UPDATE, DELETE events from MySQL binlog
{
  "name": "mysql-cdc-source",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "database.hostname": "mysql-primary",
    "database.port": "3306",
    "database.user": "debezium",
    "database.password": "\${MYSQL_PASSWORD}",
    "database.server.id": "184054",
    "topic.prefix": "cdc",
    "database.include.list": "ecommerce",
    "table.include.list": "ecommerce.orders,ecommerce.customers",
    "include.schema.changes": true,
    "schema.history.internal.kafka.bootstrap.servers": "kafka:9092",
    "schema.history.internal.kafka.topic": "schema-changes",
    "snapshot.mode": "initial",
    "transforms": "unwrap",
    "transforms.unwrap.type":
      "io.debezium.transforms.ExtractNewRecordState",
    "transforms.unwrap.drop.tombstones": false,
    "transforms.unwrap.delete.handling.mode": "rewrite",
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "key.converter.schema.registry.url": "http://schema-registry:8081",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "http://schema-registry:8081"
  }
}`;

const codeSchemaCompat = `# Schema Registry Compatibility Modes
#
# Mode             Allowed Changes               Use Case
# ──────────────── ──────────────────────────── ──────────────────────
# BACKWARD         - Remove fields               Default. New consumers
#                  - Add optional fields          can read old data.
#
# FORWARD          - Add fields                  Old consumers can read
#                  - Remove optional fields       new data.
#
# FULL             - Add optional fields          Both directions.
#                  - Remove optional fields       Most restrictive.
#
# NONE             - Any change allowed           No compatibility check.
#                                                 Use for development only.

# Set compatibility mode via REST API
curl -X PUT http://schema-registry:8081/config/orders-value \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  -d '{"compatibility": "BACKWARD"}'

# Register a new Avro schema
curl -X POST http://schema-registry:8081/subjects/orders-value/versions \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  -d '{
    "schemaType": "AVRO",
    "schema": "{
      \\"type\\": \\"record\\",
      \\"name\\": \\"Order\\",
      \\"namespace\\": \\"com.example.orders\\",
      \\"fields\\": [
        {\\"name\\": \\"id\\", \\"type\\": \\"string\\"},
        {\\"name\\": \\"user_id\\", \\"type\\": \\"string\\"},
        {\\"name\\": \\"total\\", \\"type\\": \\"double\\"},
        {\\"name\\": \\"status\\", \\"type\\": \\"string\\",
         \\"default\\": \\"PENDING\\"},
        {\\"name\\": \\"created_at\\", \\"type\\": \\"long\\",
         \\"logicalType\\": \\"timestamp-millis\\"}
      ]
    }"
  }'

# Check compatibility before registering
curl -X POST http://schema-registry:8081/compatibility/subjects/orders-value/versions/latest \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  -d '{"schemaType": "AVRO", "schema": "..."}'`;

const codeEosTransaction = `// Exactly-Once Semantics — Transactional Producer (Java)
Properties props = new Properties();
props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092");
props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
    StringSerializer.class);
props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
    StringSerializer.class);
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
props.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "order-tx-001");
props.put(ProducerConfig.ACKS_CONFIG, "all");

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// Initialize transactions (call once)
producer.initTransactions();

try {
    // Begin transaction
    producer.beginTransaction();

    // Send to multiple topics atomically
    producer.send(new ProducerRecord<>(
        "orders", orderId, orderJson));
    producer.send(new ProducerRecord<>(
        "order-events", orderId, "ORDER_CREATED"));
    producer.send(new ProducerRecord<>(
        "inventory-updates", productId,
        "DECREMENT:" + quantity));

    // Commit consumer offsets as part of the transaction
    // (for consume-transform-produce pattern)
    producer.sendOffsetsToTransaction(
        offsets, consumerGroupMetadata);

    // Commit — all records become visible atomically
    producer.commitTransaction();

} catch (ProducerFencedException e) {
    // Another producer with same transactional.id took over
    producer.close();
} catch (KafkaException e) {
    // Abort — none of the records become visible
    producer.abortTransaction();
}`;

const codeSecuritySasl = `# Broker configuration — SASL/SCRAM + TLS
# server.properties

# Enable SASL_SSL for client connections
listeners=SASL_SSL://:9093
advertised.listeners=SASL_SSL://kafka-1.example.com:9093

# Inter-broker communication
inter.broker.listener.name=SASL_SSL
security.inter.broker.protocol=SASL_SSL

# SASL mechanism
sasl.mechanism.inter.broker.protocol=SCRAM-SHA-512
sasl.enabled.mechanisms=SCRAM-SHA-512

# TLS configuration
ssl.keystore.location=/etc/kafka/ssl/kafka.keystore.jks
ssl.keystore.password=keystore-pass
ssl.key.password=key-pass
ssl.truststore.location=/etc/kafka/ssl/kafka.truststore.jks
ssl.truststore.password=truststore-pass
ssl.client.auth=required
ssl.endpoint.identification.algorithm=https

# --- Client configuration (producer/consumer) ---
# client.properties

security.protocol=SASL_SSL
sasl.mechanism=SCRAM-SHA-512
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required \\
  username="app-user" \\
  password="app-password";
ssl.truststore.location=/etc/kafka/ssl/client.truststore.jks
ssl.truststore.password=truststore-pass`;

const codeSecurityAcl = `# Kafka ACL Examples

# Grant producer permissions to user "order-service"
kafka-acls.sh --bootstrap-server kafka:9092 \\
  --command-config admin.properties \\
  --add --allow-principal User:order-service \\
  --operation Write --operation Describe \\
  --topic orders

# Grant consumer permissions to user "analytics-service"
kafka-acls.sh --bootstrap-server kafka:9092 \\
  --command-config admin.properties \\
  --add --allow-principal User:analytics-service \\
  --operation Read --operation Describe \\
  --topic orders \\
  --group analytics-group

# Deny all access to a topic from a specific IP
kafka-acls.sh --bootstrap-server kafka:9092 \\
  --command-config admin.properties \\
  --add --deny-principal User:* \\
  --deny-host 10.0.0.50 \\
  --operation All \\
  --topic sensitive-data

# List all ACLs
kafka-acls.sh --bootstrap-server kafka:9092 \\
  --command-config admin.properties \\
  --list

# Remove an ACL
kafka-acls.sh --bootstrap-server kafka:9092 \\
  --command-config admin.properties \\
  --remove --allow-principal User:old-service \\
  --operation Write --topic orders`;

const codePerfBroker = `# Broker and OS performance tuning

# --- server.properties (broker) ---

# Increase network and I/O threads
num.network.threads=8
num.io.threads=16
num.replica.fetchers=4

# Socket buffer sizes
socket.send.buffer.bytes=1048576
socket.receive.buffer.bytes=1048576
socket.request.max.bytes=104857600

# Log flush (let OS handle — Kafka uses page cache)
log.flush.interval.messages=10000
log.flush.interval.ms=1000

# Replication
replica.lag.time.max.ms=30000
min.insync.replicas=2
unclean.leader.election.enable=false

# Log retention
log.retention.hours=168
log.retention.bytes=-1
log.segment.bytes=1073741824
log.cleanup.policy=delete

# --- OS-level tuning (Linux) ---

# Increase file descriptor limit
# /etc/security/limits.conf
# kafka  soft  nofile  100000
# kafka  hard  nofile  100000

# Increase page cache (vm.dirty_ratio)
echo 60 > /proc/sys/vm/dirty_background_ratio
echo 80 > /proc/sys/vm/dirty_ratio

# Increase max socket buffer size
sysctl -w net.core.wmem_max=2097152
sysctl -w net.core.rmem_max=2097152

# Disable swap
swapoff -a

# Use XFS filesystem for log directories
# XFS provides better sequential write performance than ext4`;

const codeMonitorJmx = `# Key Kafka JMX Metrics to Monitor
#
# Broker Metrics
# ─────────────────────────────────────────────────────────────
# kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec
#   → Messages received per second (cluster throughput)
#
# kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec
#   → Bytes received per second
#
# kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec
#   → Bytes sent per second (consumer fetch)
#
# kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions
#   → Partitions where ISR < replication factor (ALERT if > 0)
#
# kafka.server:type=ReplicaManager,name=IsrShrinksPerSec
#   → Rate of ISR shrinking (follower falling behind)
#
# kafka.controller:type=KafkaController,name=OfflinePartitionsCount
#   → Partitions with no leader (CRITICAL ALERT if > 0)
#
# kafka.controller:type=KafkaController,name=ActiveControllerCount
#   → Should always be 1 in the cluster
#
# Producer Metrics
# ─────────────────────────────────────────────────────────────
# kafka.producer:type=producer-metrics,name=record-send-rate
#   → Records sent per second
#
# kafka.producer:type=producer-metrics,name=request-latency-avg
#   → Average produce request latency
#
# Consumer Metrics
# ─────────────────────────────────────────────────────────────
# kafka.consumer:type=consumer-fetch-manager-metrics,name=records-lag-max
#   → Maximum consumer lag across all partitions (KEY METRIC)
#
# kafka.consumer:type=consumer-coordinator-metrics,name=rebalance-rate-per-hour
#   → Consumer group rebalance frequency`;

const codeMonitorPrometheus = `# Prometheus + JMX Exporter configuration for Kafka

# 1. Download JMX Exporter jar
# wget https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/0.20.0/jmx_prometheus_javaagent-0.20.0.jar

# 2. Create kafka-jmx-config.yml
rules:
  - pattern: "kafka.server<type=BrokerTopicMetrics, name=(\\w+)><>Count"
    name: "kafka_server_broker_topic_metrics_\\$1_total"
    type: COUNTER
  - pattern: "kafka.server<type=ReplicaManager, name=(\\w+)><>Value"
    name: "kafka_server_replica_manager_\\$1"
    type: GAUGE
  - pattern: "kafka.controller<type=KafkaController, name=(\\w+)><>Value"
    name: "kafka_controller_\\$1"
    type: GAUGE
  - pattern: "kafka.server<type=KafkaRequestHandlerPool, name=RequestHandlerAvgIdlePercent><>MeanRate"
    name: "kafka_request_handler_avg_idle_percent"
    type: GAUGE
  - pattern: "kafka.network<type=RequestMetrics, name=(\\w+), request=(\\w+)><>Count"
    name: "kafka_network_request_\\$1_\\$2_total"
    type: COUNTER

# 3. Start Kafka broker with JMX Exporter
# KAFKA_OPTS="-javaagent:/opt/jmx_prometheus_javaagent.jar=7071:/opt/kafka-jmx-config.yml"

# 4. Prometheus scrape config (prometheus.yml)
scrape_configs:
  - job_name: 'kafka'
    static_configs:
      - targets:
        - 'kafka-1:7071'
        - 'kafka-2:7071'
        - 'kafka-3:7071'
    scrape_interval: 15s

# 5. Grafana Dashboard
# Import dashboard ID 7589 (Kafka Overview)
# or ID 12460 (Confluent Kafka)`;

const codeCruiseControl = `# Cruise Control configuration and usage

# cruise-control.properties
bootstrap.servers=kafka-1:9092,kafka-2:9092,kafka-3:9092
zookeeper.connect=zk:2181  # or metadata.bootstrap.servers for KRaft
webserver.http.port=9090
capacity.config.file=/opt/cruise-control/capacity.json

# --- Common API calls ---

# Get cluster state
curl http://cruise-control:9090/kafkacruisecontrol/state

# Check partition load distribution
curl "http://cruise-control:9090/kafkacruisecontrol/load?json=true"

# Generate rebalance proposal (dry run)
curl "http://cruise-control:9090/kafkacruisecontrol/proposals?json=true"

# Execute rebalance
curl -X POST "http://cruise-control:9090/kafkacruisecontrol/rebalance?dryrun=false&json=true"

# Decommission a broker (move all partitions away)
curl -X POST "http://cruise-control:9090/kafkacruisecontrol/remove_broker?brokerid=2&dryrun=false"

# Add a new broker to the cluster (rebalance onto it)
curl -X POST "http://cruise-control:9090/kafkacruisecontrol/add_broker?brokerid=4&dryrun=false"`;


export default function KafkaGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
  const t = translations[lang] || translations.en;

  const preStyle: React.CSSProperties = {
    background: '#1e1e1e',
    color: '#d4d4d4',
    padding: '1.25rem',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
  };

  const tldrStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '1.25rem 1.5rem',
    borderRadius: '0 8px 8px 0',
    marginBottom: '2rem',
  };

  const takeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '1.25rem 1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  };

  const sectionStyle: React.CSSProperties = {
    marginTop: '2.5rem',
  };

  const thStyle: React.CSSProperties = {
    padding: '0.75rem',
    textAlign: 'left' as const,
    border: '1px solid #dee2e6',
    background: '#f8f9fa',
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.75rem',
    border: '1px solid #dee2e6',
  };

  const faqBoxStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '4px solid #0ea5e9',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
      { '@type': 'Question', name: t.faq7q, acceptedAnswer: { '@type': 'Answer', text: t.faq7a } },
      { '@type': 'Question', name: t.faq8q, acceptedAnswer: { '@type': 'Answer', text: t.faq8a } },
    ],
  };

  const compatRows = [
    { mode: 'BACKWARD', allowed: isZh ? '删除字段、添加可选字段' : 'Remove fields, add optional fields', use: isZh ? '默认。新消费者可读旧数据' : 'Default. New consumers can read old data' },
    { mode: 'FORWARD', allowed: isZh ? '添加字段、删除可选字段' : 'Add fields, remove optional fields', use: isZh ? '旧消费者可读新数据' : 'Old consumers can read new data' },
    { mode: 'FULL', allowed: isZh ? '添加/删除可选字段' : 'Add/remove optional fields only', use: isZh ? '双向兼容。最严格' : 'Both directions. Most restrictive' },
    { mode: 'NONE', allowed: isZh ? '任何变更' : 'Any change allowed', use: isZh ? '仅用于开发环境' : 'Development only. No checks' },
  ];

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Intro */}
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={tldrStyle}>
        <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.1rem' }}>{t.tldr}</h3>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.tldrText}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={takeawaysStyle}>
        <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.1rem' }}>{t.takeawaysTitle}</h3>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.9' }}>
          <li>{t.takeaway1}</li>
          <li>{t.takeaway2}</li>
          <li>{t.takeaway3}</li>
          <li>{t.takeaway4}</li>
          <li>{t.takeaway5}</li>
          <li>{t.takeaway6}</li>
          <li>{t.takeaway7}</li>
        </ul>
      </div>

      {/* Section 1: Architecture */}
      <h2 style={sectionStyle}>{t.archTitle}</h2>
      <p>{t.archDesc}</p>

      <h3>{t.archBrokersTitle}</h3>
      <p>{t.archBrokersDesc}</p>

      <h3>{t.archTopicsTitle}</h3>
      <p>{t.archTopicsDesc}</p>
      <pre style={preStyle}><code>{codeArchitecture}</code></pre>

      <h3>{t.archReplicationTitle}</h3>
      <p>{t.archReplicationDesc}</p>

      <h3>{t.archZkKraftTitle}</h3>
      <p>{t.archZkKraftDesc}</p>
      <pre style={preStyle}><code>{codeKRaftConfig}</code></pre>

      {/* Section 2: Producers */}
      <h2 style={sectionStyle}>{t.producerTitle}</h2>
      <p>{t.producerDesc}</p>

      <h3>{t.producerPartTitle}</h3>
      <p>{t.producerPartDesc}</p>

      <h3>{t.producerAcksTitle}</h3>
      <p>{t.producerAcksDesc}</p>
      <ul style={{ lineHeight: '2' }}>
        <li><strong>acks=0:</strong> {isZh ? t.producerAcks0.replace('acks=0：', '') : t.producerAcks0.replace('acks=0: ', '')}</li>
        <li><strong>acks=1:</strong> {isZh ? t.producerAcks1.replace('acks=1：', '') : t.producerAcks1.replace('acks=1: ', '')}</li>
        <li><strong>acks=all:</strong> {isZh ? t.producerAcksAll.replace('acks=all (-1)：', '') : t.producerAcksAll.replace('acks=all (-1): ', '')}</li>
      </ul>
      <pre style={preStyle}><code>{codeProducerConfig}</code></pre>

      <h3>{t.producerIdempotentTitle}</h3>
      <p>{t.producerIdempotentDesc}</p>

      <h3>{t.producerCompressionTitle}</h3>
      <p>{t.producerCompressionDesc}</p>

      {/* Section 3: Consumers */}
      <h2 style={sectionStyle}>{t.consumerTitle}</h2>
      <p>{t.consumerDesc}</p>

      <h3>{t.consumerGroupTitle}</h3>
      <p>{t.consumerGroupDesc}</p>

      <h3>{t.consumerOffsetTitle}</h3>
      <p>{t.consumerOffsetDesc}</p>

      <h3>{t.consumerRebalanceTitle}</h3>
      <p>{t.consumerRebalanceDesc}</p>
      <ul style={{ lineHeight: '2' }}>
        <li><strong>Eager:</strong> {isZh ? t.consumerRebalanceEager.replace('Eager（旧版默认）：', '') : t.consumerRebalanceEager.replace('Eager (default in older versions): ', '')}</li>
        <li><strong>Cooperative Sticky:</strong> {isZh ? t.consumerRebalanceCoop.replace('Cooperative Sticky：', '') : t.consumerRebalanceCoop.replace('Cooperative Sticky: ', '')}</li>
      </ul>

      {/* Section 4: Node.js */}
      <h2 style={sectionStyle}>{t.nodejsTitle}</h2>
      <p>{t.nodejsDesc}</p>

      <h3>{t.nodejsProducerTitle}</h3>
      <pre style={preStyle}><code>{codeNodeProducer}</code></pre>

      <h3>{t.nodejsConsumerTitle}</h3>
      <pre style={preStyle}><code>{codeNodeConsumer}</code></pre>

      <h3>{t.nodejsErrorTitle}</h3>
      <pre style={preStyle}><code>{codeNodeError}</code></pre>

      {/* Section 5: Java / Spring */}
      <h2 style={sectionStyle}>{t.javaTitle}</h2>
      <p>{t.javaDesc}</p>

      <h3>{t.javaProducerTitle}</h3>
      <pre style={preStyle}><code>{codeSpringProducer}</code></pre>

      <h3>{t.javaConsumerTitle}</h3>
      <pre style={preStyle}><code>{codeSpringConsumer}</code></pre>

      <h3>{t.javaConfigTitle}</h3>
      <pre style={preStyle}><code>{codeSpringConfig}</code></pre>

      {/* Section 6: Python */}
      <h2 style={sectionStyle}>{t.pythonTitle}</h2>
      <p>{t.pythonDesc}</p>

      <h3>{t.pythonProducerTitle}</h3>
      <pre style={preStyle}><code>{codePythonProducer}</code></pre>

      <h3>{t.pythonConsumerTitle}</h3>
      <pre style={preStyle}><code>{codePythonAvro}</code></pre>

      {/* Section 7: Kafka Streams */}
      <h2 style={sectionStyle}>{t.streamsTitle}</h2>
      <p>{t.streamsDesc}</p>

      <h3>{t.streamsConceptsTitle}</h3>
      <ul style={{ lineHeight: '2' }}>
        <li><strong>KStream:</strong> {isZh ? t.streamsConceptKStream.replace('KStream：', '') : t.streamsConceptKStream.replace('KStream: ', '')}</li>
        <li><strong>KTable:</strong> {isZh ? t.streamsConceptKTable.replace('KTable：', '') : t.streamsConceptKTable.replace('KTable: ', '')}</li>
        <li><strong>{isZh ? '窗口化' : 'Windowing'}:</strong> {isZh ? t.streamsConceptWindow.replace('窗口化：', '') : t.streamsConceptWindow.replace('Windowing: ', '')}</li>
        <li><strong>{isZh ? '连接' : 'Joins'}:</strong> {isZh ? t.streamsConceptJoin.replace('连接：', '') : t.streamsConceptJoin.replace('Joins: ', '')}</li>
      </ul>

      <h3>{t.streamsExampleTitle}</h3>
      <pre style={preStyle}><code>{codeStreamsWordCount}</code></pre>

      <h3>{t.streamsWindowTitle}</h3>
      <pre style={preStyle}><code>{codeStreamsWindow}</code></pre>

      {/* Section 8: Kafka Connect */}
      <h2 style={sectionStyle}>{t.connectTitle}</h2>
      <p>{t.connectDesc}</p>

      <h3>{t.connectSourceTitle}</h3>
      <p>{t.connectSourceDesc}</p>
      <pre style={preStyle}><code>{codeConnectSource}</code></pre>

      <h3>{t.connectSinkTitle}</h3>
      <p>{t.connectSinkDesc}</p>
      <pre style={preStyle}><code>{codeConnectSink}</code></pre>

      <h3>{t.connectDebeziumTitle}</h3>
      <p>{t.connectDebeziumDesc}</p>
      <pre style={preStyle}><code>{codeDebezium}</code></pre>

      {/* Section 9: Schema Registry */}
      <h2 style={sectionStyle}>{t.schemaTitle}</h2>
      <p>{t.schemaDesc}</p>

      <h3>{t.schemaFormatsTitle}</h3>
      <ul style={{ lineHeight: '2' }}>
        <li><strong>Avro:</strong> {isZh ? t.schemaAvro.replace('Avro：', '') : t.schemaAvro.replace('Avro: ', '')}</li>
        <li><strong>Protobuf:</strong> {isZh ? t.schemaProtobuf.replace('Protobuf：', '') : t.schemaProtobuf.replace('Protobuf: ', '')}</li>
        <li><strong>JSON Schema:</strong> {isZh ? t.schemaJson.replace('JSON Schema：', '') : t.schemaJson.replace('JSON Schema: ', '')}</li>
      </ul>

      <h3>{t.schemaCompatTitle}</h3>
      <p>{t.schemaCompatDesc}</p>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '模式' : 'Mode'}</th>
              <th style={thStyle}>{isZh ? '允许的变更' : 'Allowed Changes'}</th>
              <th style={thStyle}>{isZh ? '使用场景' : 'Use Case'}</th>
            </tr>
          </thead>
          <tbody>
            {compatRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ ...tdStyle, fontWeight: 700, color: '#c53030' }}>{row.mode}</td>
                <td style={tdStyle}>{row.allowed}</td>
                <td style={tdStyle}>{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{t.schemaRegistryExample}</h3>
      <pre style={preStyle}><code>{codeSchemaCompat}</code></pre>

      {/* Section 10: Exactly-Once Semantics */}
      <h2 style={sectionStyle}>{t.eosTitle}</h2>
      <p>{t.eosDesc}</p>

      <h3>{t.eosComponentsTitle}</h3>
      <ol style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li><strong>{isZh ? '幂等生产者' : 'Idempotent Producer'}:</strong> {isZh ? t.eosIdempotent.replace('幂等生产者：', '') : t.eosIdempotent.replace('Idempotent Producer: ', '')}</li>
        <li><strong>{isZh ? '事务生产者' : 'Transactional Producer'}:</strong> {isZh ? t.eosTransactional.replace('事务生产者：', '') : t.eosTransactional.replace('Transactional Producer: ', '')}</li>
        <li><strong>{isZh ? 'Read Committed 消费者' : 'Read Committed Consumer'}:</strong> {isZh ? t.eosReadCommitted.replace('Read Committed 消费者：', '') : t.eosReadCommitted.replace('Read Committed Consumer: ', '')}</li>
      </ol>

      <h3>{t.eosExampleTitle}</h3>
      <pre style={preStyle}><code>{codeEosTransaction}</code></pre>

      {/* Section 11: Security */}
      <h2 style={sectionStyle}>{t.securityTitle}</h2>
      <p>{t.securityDesc}</p>

      <h3>{t.securitySaslTitle}</h3>
      <p>{t.securitySaslDesc}</p>
      <ul style={{ lineHeight: '2' }}>
        <li><strong>SASL/PLAIN:</strong> {isZh ? t.securitySaslPlain.replace('SASL/PLAIN：', '') : t.securitySaslPlain.replace('SASL/PLAIN: ', '')}</li>
        <li><strong>SASL/SCRAM:</strong> {isZh ? t.securitySaslScram.replace('SASL/SCRAM：', '') : t.securitySaslScram.replace('SASL/SCRAM: ', '')}</li>
        <li><strong>SASL/GSSAPI:</strong> {isZh ? t.securitySaslKerberos.replace('SASL/GSSAPI (Kerberos)：', '') : t.securitySaslKerberos.replace('SASL/GSSAPI (Kerberos): ', '')}</li>
        <li><strong>SASL/OAUTHBEARER:</strong> {isZh ? t.securitySaslOauth.replace('SASL/OAUTHBEARER：', '') : t.securitySaslOauth.replace('SASL/OAUTHBEARER: ', '')}</li>
      </ul>

      <h3>{t.securityTlsTitle}</h3>
      <p>{t.securityTlsDesc}</p>
      <pre style={preStyle}><code>{codeSecuritySasl}</code></pre>

      <h3>{t.securityAclTitle}</h3>
      <p>{t.securityAclDesc}</p>
      <pre style={preStyle}><code>{codeSecurityAcl}</code></pre>

      {/* Section 12: Performance Tuning */}
      <h2 style={sectionStyle}>{t.perfTitle}</h2>
      <p>{t.perfDesc}</p>

      <h3>{t.perfProducerTitle}</h3>
      <ul style={{ lineHeight: '2' }}>
        <li><code style={{ background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>batch.size</code>: {isZh ? t.perfProducerBatch.replace('batch.size（默认 16384）：', '') : t.perfProducerBatch.replace('batch.size (default 16384): ', '')}</li>
        <li><code style={{ background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>linger.ms</code>: {isZh ? t.perfProducerLinger.replace('linger.ms（默认 0）：', '') : t.perfProducerLinger.replace('linger.ms (default 0): ', '')}</li>
        <li><code style={{ background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>buffer.memory</code>: {isZh ? t.perfProducerBuffer.replace('buffer.memory（默认 33554432）：', '') : t.perfProducerBuffer.replace('buffer.memory (default 33554432): ', '')}</li>
        <li><code style={{ background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>compression.type</code>: {isZh ? t.perfProducerCompression.replace('compression.type：', '') : t.perfProducerCompression.replace('compression.type: ', '')}</li>
      </ul>

      <h3>{t.perfConsumerTitle}</h3>
      <ul style={{ lineHeight: '2' }}>
        <li><code style={{ background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>fetch.min.bytes</code>: {isZh ? t.perfConsumerFetch.replace('fetch.min.bytes（默认 1）：', '') : t.perfConsumerFetch.replace('fetch.min.bytes (default 1): ', '')}</li>
        <li><code style={{ background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>max.poll.records</code>: {isZh ? t.perfConsumerMax.replace('max.poll.records（默认 500）：', '') : t.perfConsumerMax.replace('max.poll.records (default 500): ', '')}</li>
        <li><code style={{ background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>session.timeout.ms</code>: {isZh ? t.perfConsumerSession.replace('session.timeout.ms（默认 45000）：', '') : t.perfConsumerSession.replace('session.timeout.ms (default 45000): ', '')}</li>
      </ul>

      <h3>{t.perfBrokerTitle}</h3>
      <pre style={preStyle}><code>{codePerfBroker}</code></pre>

      <h3>{t.perfPartitionTitle}</h3>
      <p>{t.perfPartitionDesc}</p>
      <ol style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.perfPartition1}</li>
        <li>{t.perfPartition2}</li>
        <li>{t.perfPartition3}</li>
        <li>{t.perfPartition4}</li>
      </ol>

      {/* Section 13: Monitoring */}
      <h2 style={sectionStyle}>{t.monitorTitle}</h2>
      <p>{t.monitorDesc}</p>

      <h3>{t.monitorJmxTitle}</h3>
      <p>{t.monitorJmxDesc}</p>
      <pre style={preStyle}><code>{codeMonitorJmx}</code></pre>

      <h3>{t.monitorPrometheusTitle}</h3>
      <p>{t.monitorPrometheusDesc}</p>
      <pre style={preStyle}><code>{codeMonitorPrometheus}</code></pre>

      <h3>{t.monitorLagTitle}</h3>
      <p>{t.monitorLagDesc}</p>
      <ul style={{ lineHeight: '2' }}>
        <li><strong>kafka-consumer-groups.sh:</strong> {isZh ? t.monitorLag1.replace('kafka-consumer-groups.sh --describe：', '') : t.monitorLag1.replace('kafka-consumer-groups.sh --describe: ', '')}</li>
        <li><strong>Burrow:</strong> {isZh ? t.monitorLag2.replace('Burrow：', '') : t.monitorLag2.replace('Burrow: ', '')}</li>
        <li><strong>Prometheus:</strong> {isZh ? t.monitorLag3.replace('Prometheus kafka_consumergroup_lag 指标，', '') : t.monitorLag3.replace('Prometheus kafka_consumergroup_lag metric via ', '')}</li>
      </ul>

      <h3>{t.monitorCruiseTitle}</h3>
      <p>{t.monitorCruiseDesc}</p>
      <pre style={preStyle}><code>{codeCruiseControl}</code></pre>

      {/* FAQ Section */}
      <h2 style={sectionStyle}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
        [t.faq6q, t.faq6a],
        [t.faq7q, t.faq7a],
        [t.faq8q, t.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={faqBoxStyle}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568', lineHeight: '1.7' }}>{a}</p>
        </div>
      ))}
    </article>
  );
}
