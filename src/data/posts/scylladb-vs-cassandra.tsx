'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'ScyllaDB vs Cassandra: NoSQL Database Comparison',
    intro: 'ScyllaDB and Apache Cassandra are both distributed NoSQL databases designed for high availability and scalability. While Cassandra has been the established choice for years, ScyllaDB emerged as a C++ rewrite promising significantly better performance. This comparison examines their architecture, performance, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose ScyllaDB for maximum performance, lower hardware costs, and simpler operations. Choose Cassandra for ecosystem maturity, broader tooling support, and when you need proven enterprise features. ScyllaDB offers 10x better latency but Cassandra has more extensive community and third-party integrations.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'ScyllaDB is written in C++; Cassandra in Java (JVM-based)',
    takeaway2: 'ScyllaDB offers 10x lower latency and higher throughput',
    takeaway3: 'Cassandra has larger ecosystem and more production deployments',
    takeaway4: 'ScyllaDB requires fewer nodes for same performance',
    takeaway5: 'Both use same data model and CQL query language',
    takeaway6: 'Cassandra has more enterprise tooling and support options',
    
    whatIsScylladbTitle: 'What is ScyllaDB?',
    whatIsScylladbContent: 'ScyllaDB is a high-performance NoSQL database compatible with Cassandra, written in C++ for maximum efficiency. Released in 2015, it implements the Cassandra data model and CQL query language while achieving significantly better performance through shard-per-core architecture and elimination of JVM overhead.',
    
    whatIsCassandraTitle: 'What is Apache Cassandra?',
    whatIsCassandraContent: 'Apache Cassandra is a distributed NoSQL database originally developed at Facebook and released as open source in 2008. Written in Java, it provides linear scalability, fault tolerance, and high availability across commodity servers. Cassandra is widely used by companies like Netflix, Apple, and Instagram.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks and real-world performance characteristics:',
    
    featuresTitle: 'Architecture & Features',
    featuresIntro: 'Technical architecture and capabilities comparison:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'CQL queries and configuration examples:',
    
    scylladbExampleTitle: 'ScyllaDB Configuration',
    cassandraExampleTitle: 'Cassandra Configuration',
    
    dataSourceTitle: 'Ecosystem & Integration',
    dataSourceIntro: 'Ecosystem tools and third-party integrations:',
    
    alertingTitle: 'Operations & Management',
    alertingIntro: 'Operational considerations and management features:',
    
    useCasesTitle: 'Best Use Cases',
    scylladbBestFor: 'ScyllaDB is Best For:',
    cassandraBestFor: 'Cassandra is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'ScyllaDB and Cassandra serve similar use cases but with different trade-offs. ScyllaDB excels in raw performance, requiring fewer resources and delivering lower latency. It is ideal for new projects prioritizing performance and cost efficiency. Cassandra remains the safer choice for organizations needing mature tooling, extensive community support, and proven track record at massive scale. Both are excellent choices for time-series data, IoT workloads, and high-throughput applications.',
    
    faq1q: 'Is ScyllaDB compatible with Cassandra?',
    faq1a: 'Yes, ScyllaDB is wire-compatible with Cassandra and supports the same CQL query language. Most Cassandra drivers work with ScyllaDB, and you can migrate data between them. However, some advanced features and internal behaviors differ.',
    
    faq2q: 'Why is ScyllaDB faster than Cassandra?',
    faq2a: 'ScyllaDB is written in C++ without JVM overhead, uses shard-per-core architecture for better CPU utilization, implements its own memory allocator, and has optimized I/O paths. These architectural differences eliminate Java garbage collection pauses and improve cache efficiency.',
    
    faq3q: 'Can I migrate from Cassandra to ScyllaDB?',
    faq3a: 'Yes, migration is possible using tools like ScyllaDB Migrator or by using the Cassandra snapshot and sstableloader. The data model and CQL are compatible, but you should test thoroughly and plan for minimal downtime during migration.',
    
    faq4q: 'Which has better cloud support?',
    faq4a: 'Cassandra has broader managed service options including DataStax Astra, Amazon Keyspaces, and Azure Cosmos DB (Cassandra API). ScyllaDB offers ScyllaDB Cloud (managed service) and is available on major cloud marketplaces. Cassandra currently has more deployment options.',
    
    faq5q: 'How do costs compare?',
    faq5a: 'ScyllaDB typically requires fewer nodes to achieve the same performance, reducing hardware costs by 3-10x. However, ScyllaDB Enterprise requires a commercial license. Cassandra is fully open source (Apache 2.0) with free enterprise features through Apache itself.',
    
    faq6q: 'What about consistency and durability?',
    faq6a: 'Both offer tunable consistency levels (ONE, QUORUM, ALL, etc.) and similar durability guarantees. ScyllaDB implements faster commitlog writes and more efficient compaction. Both support multi-datacenter replication and eventual consistency models.',
    
    faq7q: 'Which has better monitoring and tooling?',
    faq7a: 'Cassandra has a larger ecosystem with tools like DataStax OpsCenter, Reaper for repairs, and various third-party monitoring solutions. ScyllaDB includes built-in Prometheus metrics and ScyllaDB Monitoring Stack. Cassandra currently has more tooling options.',
    
    faq8q: 'How does sharding work differently?',
    faq8a: 'ScyllaDB uses shard-per-core architecture where each CPU core handles a dedicated shard of data, eliminating lock contention. Cassandra uses JVM threads and can suffer from GC pauses. ScyllaDB approach provides more predictable latency and better resource utilization.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'ScyllaDB vs Cassandra：NoSQL 数据库对比',
    intro: 'ScyllaDB 和 Apache Cassandra 都是面向高可用性和可扩展性的分布式 NoSQL 数据库。虽然 Cassandra 多年来一直是既定选择，但 ScyllaDB 作为 C++ 重写版本出现，承诺提供显著更好的性能。本比较考察它们的架构、性能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为最大性能、更低硬件成本和更简单运维选择 ScyllaDB。为生态系统成熟度、更广泛的工具支持和需要经过验证的企业功能选择 Cassandra。ScyllaDB 提供高出 10 倍的延迟表现，但 Cassandra 拥有更广泛的社区和第三方集成。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'ScyllaDB 使用 C++ 编写；Cassandra 使用 Java（基于 JVM）',
    takeaway2: 'ScyllaDB 提供低 10 倍的延迟和更高的吞吐量',
    takeaway3: 'Cassandra 拥有更大的生态系统和更多生产部署',
    takeaway4: 'ScyllaDB 需要更少节点即可达到相同性能',
    takeaway5: '两者使用相同的数据模型和 CQL 查询语言',
    takeaway6: 'Cassandra 拥有更多企业工具和支持选项',
    
    whatIsScylladbTitle: '什么是 ScyllaDB？',
    whatIsScylladbContent: 'ScyllaDB 是一个与 Cassandra 兼容的高性能 NoSQL 数据库，使用 C++ 编写以实现最高效率。2015 年发布，它实现了 Cassandra 数据模型和 CQL 查询语言，通过每个核心分片架构和消除 JVM 开销实现显著更好的性能。',
    
    whatIsCassandraTitle: '什么是 Apache Cassandra？',
    whatIsCassandraContent: 'Apache Cassandra 是一个分布式 NoSQL 数据库，最初在 Facebook 开发并于 2008 年开源。使用 Java 编写，它在商用服务器上提供线性可扩展性、容错性和高可用性。Cassandra 被 Netflix、Apple 和 Instagram 等公司广泛使用。',
    
    performanceTitle: '性能对比',
    performanceIntro: '基准测试和实际性能特征：',
    
    featuresTitle: '架构与功能',
    featuresIntro: '技术架构和能力比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: 'CQL 查询和配置示例：',
    
    scylladbExampleTitle: 'ScyllaDB 配置',
    cassandraExampleTitle: 'Cassandra 配置',
    
    dataSourceTitle: '生态系统与集成',
    dataSourceIntro: '生态工具和第三方集成：',
    
    alertingTitle: '运维与管理',
    alertingIntro: '运维考虑因素和管理功能：',
    
    useCasesTitle: '最佳用例',
    scylladbBestFor: 'ScyllaDB 最适合：',
    cassandraBestFor: 'Cassandra 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'ScyllaDB 和 Cassandra 服务于类似的用例，但有不同的权衡。ScyllaDB 在原始性能方面表现出色，需要更少的资源并提供更低的延迟。它非常适合优先考虑性能和成本效率的新项目。Cassandra 仍然是需要成熟工具、广泛社区支持和在大规模下经过验证的组织的更安全选择。两者都是时间序列数据、IoT 工作负载和高吞吐量应用的优秀选择。',
    
    faq1q: 'ScyllaDB 与 Cassandra 兼容吗？',
    faq1a: '是的，ScyllaDB 与 Cassandra 线路兼容并支持相同的 CQL 查询语言。大多数 Cassandra 驱动程序可以与 ScyllaDB 一起使用，你可以在它们之间迁移数据。但是，一些高级功能和内部行为有所不同。',
    
    faq2q: '为什么 ScyllaDB 比 Cassandra 更快？',
    faq2a: 'ScyllaDB 使用 C++ 编写，没有 JVM 开销，使用每个核心分片架构实现更好的 CPU 利用率，实现了自己的内存分配器，并优化了 I/O 路径。这些架构差异消除了 Java 垃圾收集暂停并提高了缓存效率。',
    
    faq3q: '我可以从 Cassandra 迁移到 ScyllaDB 吗？',
    faq3a: '是的，可以使用 ScyllaDB Migrator 等工具或使用 Cassandra 快照和 sstableloader 进行迁移。数据模型和 CQL 是兼容的，但你应该彻底测试并计划在迁移期间尽量减少停机时间。',
    
    faq4q: '哪个有更好的云支持？',
    faq4a: 'Cassandra 拥有更广泛的托管服务选项，包括 DataStax Astra、Amazon Keyspaces 和 Azure Cosmos DB（Cassandra API）。ScyllaDB 提供 ScyllaDB Cloud（托管服务）并可在主要云市场上使用。Cassandra 目前有更多部署选项。',
    
    faq5q: '成本如何比较？',
    faq5a: 'ScyllaDB 通常需要更少的节点来实现相同的性能，将硬件成本降低 3-10 倍。但是，ScyllaDB Enterprise 需要商业许可证。Cassandra 完全开源（Apache 2.0），通过 Apache 本身提供免费的企业功能。',
    
    faq6q: '一致性和持久性如何？',
    faq6a: '两者都提供可调一致性级别（ONE、QUORUM、ALL 等）和类似的持久性保证。ScyllaDB 实现更快的提交日志写入和更高效的压缩。两者都支持多数据中心复制和最终一致性模型。',
    
    faq7q: '哪个有更好的监控和工具？',
    faq7a: 'Cassandra 拥有更大的生态系统，包括 DataStax OpsCenter、Reaper 用于修复和各种第三方监控解决方案。ScyllaDB 包括内置 Prometheus 指标和 ScyllaDB 监控栈。Cassandra 目前有更多工具选项。',
    
    faq8q: '分片工作方式有何不同？',
    faq8a: 'ScyllaDB 使用每个核心分片架构，每个 CPU 核心处理专用的数据分片，消除锁争用。Cassandra 使用 JVM 线程，可能遭受 GC 暂停。ScyllaDB 方法提供更可预测的延迟和更好的资源利用率。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ScylladbVsCassandra({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsScylladbTitle}</h3>
      <p style={pStyle}>{ct.whatIsScylladbContent}</p>

      <h3 style={h3Style}>{ct.whatIsCassandraTitle}</h3>
      <p style={pStyle}>{ct.whatIsCassandraContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>ScyllaDB</th>
              <th style={thStyle}>Cassandra</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '延迟 (p99)' : 'Latency (p99)', '< 1ms', '10-50ms'],
              [isZh ? '吞吐量' : 'Throughput', isZh ? '每节点 1M+ ops/sec' : '1M+ ops/sec per node', isZh ? '每节点 100-500K ops/sec' : '100-500K ops/sec per node'],
              [isZh ? '节点效率' : 'Node Efficiency', isZh ? '1 节点 = 10 Cassandra 节点' : '1 node = 10 Cassandra nodes', isZh ? '基准' : 'Baseline'],
              [isZh ? 'GC 暂停' : 'GC Pauses', isZh ? '无' : 'None', isZh ? '频繁' : 'Frequent'],
              [isZh ? '内存使用' : 'Memory Usage', isZh ? '可预测、低' : 'Predictable, low', isZh ? '高、变化' : 'High, variable'],
              [isZh ? 'CPU 利用率' : 'CPU Utilization', isZh ? '每核心分片' : 'Shard-per-core', isZh ? '线程池' : 'Thread pools'],
            ].map(([feature, scylladb, cassandra], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{scylladb}</td>
                <td style={tdStyle}>{cassandra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>ScyllaDB</th>
              <th style={thStyle}>Cassandra</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '编程语言' : 'Language', 'C++', 'Java'],
              [isZh ? '查询语言' : 'Query Language', 'CQL', 'CQL'],
              [isZh ? '数据模型' : 'Data Model', isZh ? '宽列' : 'Wide-column', isZh ? '宽列' : 'Wide-column'],
              [isZh ? '一致性模型' : 'Consistency', isZh ? '可调' : 'Tunable', isZh ? '可调' : 'Tunable'],
              [isZh ? '分片' : 'Sharding', isZh ? '每个核心分片' : 'Shard-per-core', isZh ? '虚拟节点' : 'VNodes'],
              [isZh ? '压缩策略' : 'Compaction', 'STCS, LCS, DTCS', 'STCS, LCS, DTCS, TWCS'],
              [isZh ? '备份工具' : 'Backup Tools', isZh ? '内置' : 'Built-in', 'nodetool, Medusa'],
              [isZh ? '企业功能' : 'Enterprise', isZh ? '企业版' : 'Enterprise Edition', isZh ? '开源 + DataStax' : 'Open Source + DataStax'],
            ].map(([cap, scylladb, cassandra], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{scylladb}</td>
                <td style={tdStyle}>{cassandra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f46800' }}>{ct.scylladbExampleTitle}</h3>
      <pre style={codeStyle}><code>{`-- CQL Schema (works for both ScyllaDB and Cassandra)
CREATE KEYSPACE IF NOT EXISTS iot_data
WITH replication = {'class': 'NetworkTopologyStrategy', 'dc1': 3};

CREATE TABLE iot_data.sensor_readings (
    sensor_id uuid,
    timestamp timestamp,
    temperature double,
    humidity double,
    pressure double,
    PRIMARY KEY (sensor_id, timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC)
  AND compaction = {'class': 'TimeWindowCompactionStrategy'};

-- Insert time-series data
INSERT INTO iot_data.sensor_readings 
(sensor_id, timestamp, temperature, humidity, pressure)
VALUES (
    123e4567-e89b-12d3-a456-426614174000,
    toTimestamp(now()),
    23.5,
    65.2,
    1013.25
);

-- Query recent readings for a sensor
SELECT * FROM iot_data.sensor_readings
WHERE sensor_id = 123e4567-e89b-12d3-a456-426614174000
  AND timestamp >= toTimestamp(now()) - 1d
LIMIT 1000;

-- ScyllaDB specific: Using LWT (Lightweight Transactions)
INSERT INTO iot_data.sensor_readings
(sensor_id, timestamp, temperature)
VALUES (123e4567-e89b-12d3-a456-426614174000, now(), 25.0)
IF NOT EXISTS;

-- ScyllaDB configuration (scylla.yaml)
cluster_name: 'IoT Cluster'
num_tokens: 256
seed_provider:
  - class_name: org.apache.cassandra.locator.SimpleSeedProvider
    parameters:
      - seeds: "10.0.1.1,10.0.1.2"
endpoint_snitch: GossipingPropertyFileSnitch
compaction_throughput_mb_per_sec: 0  # ScyllaDB auto-tunes`}</code></pre>

      <h3 style={{ ...h3Style, color: '#00bfb3' }}>{ct.cassandraExampleTitle}</h3>
      <pre style={codeStyle}><code>{`-- Same CQL works in Cassandra
CREATE KEYSPACE IF NOT EXISTS user_activity
WITH replication = {'class': 'NetworkTopologyStrategy', 'dc1': 3, 'dc2': 2}
 AND durable_writes = true;

CREATE TABLE user_activity.events (
    user_id uuid,
    event_time timestamp,
    event_type text,
    event_data frozen<map<text, text>>,
    PRIMARY KEY (user_id, event_time)
) WITH CLUSTERING ORDER BY (event_time DESC)
  AND default_time_to_live = 2592000  -- 30 days TTL
  AND gc_grace_seconds = 86400;

-- Batch insert (use sparingly)
BEGIN BATCH
  INSERT INTO user_activity.events 
  (user_id, event_time, event_type, event_data)
  VALUES (now(), toTimestamp(now()), 'login', 
          {'ip': '192.168.1.1', 'device': 'mobile'});
  
  INSERT INTO user_activity.events 
  (user_id, event_time, event_type, event_data)
  VALUES (now(), toTimestamp(now()), 'purchase', 
          {'amount': '99.99', 'item': 'premium'});
APPLY BATCH;

-- Cassandra configuration (cassandra.yaml)
cluster_name: 'Production Cluster'
num_tokens: 256
seed_provider:
  - class_name: org.apache.cassandra.locator.SimpleSeedProvider
    parameters:
      - seeds: "10.0.1.1,10.0.1.2"
endpoint_snitch: GossipingPropertyFileSnitch
compaction_throughput_mb_per_sec: 64
concurrent_reads: 32
concurrent_writes: 32
memtable_allocation_type: heap_buffers`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>ScyllaDB</th>
              <th style={thStyle}>Cassandra</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '驱动程序' : 'Drivers', isZh ? '所有 Cassandra 驱动' : 'All Cassandra drivers', isZh ? '广泛支持' : 'Extensive support'],
              [isZh ? '托管服务' : 'Managed Service', 'ScyllaDB Cloud', 'DataStax Astra, Amazon Keyspaces, Azure Cosmos DB'],
              [isZh ? '监控' : 'Monitoring', isZh ? 'Prometheus 原生' : 'Prometheus native', 'DataStax OpsCenter, Prometheus, Grafana'],
              [isZh ? '备份' : 'Backup', isZh ? '内置、快照' : 'Built-in, snapshots', 'Medusa, nodetool, snapshots'],
              [isZh ? '修复' : 'Repair', isZh ? '内置修复' : 'Built-in repair', 'Reaper, nodetool repair'],
              [isZh ? 'Kubernetes' : 'Kubernetes', isZh ? 'Scylla Operator' : 'Scylla Operator', 'Cass Operator, K8ssandra'],
            ].map(([cat, scylladb, cassandra], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{scylladb}</td>
                <td style={tdStyle}>{cassandra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f46800' }}>
          <strong style={{ color: '#f46800' }}>ScyllaDB Operations</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '每个核心分片架构简化运维，自动调优压缩和内存，内置 Prometheus 指标，无需 JVM 调优，可预测的性能，自动故障检测和恢复。' : 'Shard-per-core architecture simplifies operations, auto-tuning compaction and memory, built-in Prometheus metrics, no JVM tuning needed, predictable performance, automatic failure detection and recovery.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #00bfb3' }}>
          <strong style={{ color: '#00bfb3' }}>Cassandra Operations</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要 JVM 调优和 GC 管理，更多运维工具（Reaper、Medusa），成熟的最佳实践，更大社区支持，需要更多节点规划。' : 'Requires JVM tuning and GC management, more operational tools (Reaper, Medusa), mature best practices, larger community support, requires more node planning.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>{ct.scylladbBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高性能时间序列数据' : 'High-performance time-series data'}</li>
            <li>{isZh ? '实时分析' : 'Real-time analytics'}</li>
            <li>{isZh ? 'IoT 和传感器数据' : 'IoT and sensor data'}</li>
            <li>{isZh ? '广告技术和推荐引擎' : 'AdTech and recommendation engines'}</li>
            <li>{isZh ? '低延迟要求' : 'Low-latency requirements'}</li>
            <li>{isZh ? '成本优化' : 'Cost optimization'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00bfb3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00bfb3' }}>{ct.cassandraBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大规模企业部署' : 'Large-scale enterprise deployments'}</li>
            <li>{isZh ? '需要成熟工具和生态' : 'Need for mature tools and ecosystem'}</li>
            <li>{isZh ? '多数据中心复制' : 'Multi-datacenter replication'}</li>
            <li>{isZh ? '金融和合规要求' : 'Finance and compliance requirements'}</li>
            <li>{isZh ? '遗留系统迁移' : 'Legacy system migrations'}</li>
            <li>{isZh ? '需要广泛支持' : 'Need for extensive support'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
