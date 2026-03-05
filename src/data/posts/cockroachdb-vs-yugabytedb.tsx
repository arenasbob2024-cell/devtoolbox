'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'CockroachDB vs YugabyteDB: Distributed SQL Database Comparison',
    intro: 'CockroachDB and YugabyteDB are both distributed SQL databases inspired by Google Spanner, offering horizontal scalability and strong consistency. While they share similar architectures, they differ in licensing, ecosystem focus, and specific capabilities. This comparison examines their architecture, performance, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose CockroachDB for PostgreSQL compatibility, serverless options, and enterprise features. Choose YugabyteDB for fully open-source licensing, Cassandra-compatible API (YCQL), and cost-effective self-hosting. Both offer excellent distributed SQL capabilities with strong consistency guarantees.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Both inspired by Google Spanner architecture',
    takeaway2: 'CockroachDB uses BSL license; YugabyteDB is Apache 2.0',
    takeaway3: 'CockroachDB better PostgreSQL compatibility',
    takeaway4: 'YugabyteDB offers Cassandra-compatible YCQL API',
    takeaway5: 'Both support multi-region and global deployments',
    takeaway6: 'YugabyteDB more cost-effective for self-hosting',
    
    whatIsCockroachdbTitle: 'What is CockroachDB?',
    whatIsCockroachdbContent: 'CockroachDB is a distributed SQL database developed by Cockroach Labs. Released in 2015, it is inspired by Google Spanner and provides horizontal scalability, ACID transactions, and SQL compatibility. CockroachDB excels at cloud-native deployments, offering serverless and dedicated cloud options with strong PostgreSQL compatibility.',
    
    whatIsYugabytedbTitle: 'What is YugabyteDB?',
    whatIsYugabytedbContent: 'YugabyteDB is an open-source distributed SQL database developed by Yugabyte. Released in 2017, it also draws inspiration from Google Spanner. YugabyteDB offers two APIs: YSQL (PostgreSQL-compatible) and YCQL (Cassandra-compatible). It emphasizes fully open-source licensing and cost-effective self-hosted deployments.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Architecture and performance characteristics:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed feature matrix:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'SQL and API examples:',
    
    cockroachdbExampleTitle: 'CockroachDB SQL',
    yugabytedbExampleTitle: 'YugabyteDB SQL/YCQL',
    
    dataSourceTitle: 'Architecture Details',
    dataSourceIntro: 'Internal architecture and storage:',
    
    alertingTitle: 'Deployment & Operations',
    alertingIntro: 'Deployment options and operational features:',
    
    useCasesTitle: 'Best Use Cases',
    cockroachdbBestFor: 'CockroachDB is Best For:',
    yugabytedbBestFor: 'YugabyteDB is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'CockroachDB and YugabyteDB are both excellent distributed SQL databases with similar architectures but different target markets. CockroachDB excels for enterprises wanting managed services, serverless options, and maximum PostgreSQL compatibility. YugabyteDB is ideal for organizations prioritizing open-source, cost-effective self-hosting, and multi-API flexibility (SQL + Cassandra). Both handle multi-region, globally distributed workloads excellently.',
    
    faq1q: 'Are they wire-compatible with PostgreSQL?',
    faq1a: 'Both support PostgreSQL wire protocol. CockroachDB has higher PostgreSQL compatibility (aiming for full feature parity). YugabyteDB YSQL is PostgreSQL-compatible but with some differences. You can use most PostgreSQL drivers with both databases.',
    
    faq2q: 'What about licensing differences?',
    faq2a: 'CockroachDB uses Business Source License (BSL), restricting some enterprise features and cloud hosting. YugabyteDB is fully Apache 2.0 licensed, allowing unrestricted self-hosting. For maximum open-source freedom, YugabyteDB has the advantage.',
    
    faq3q: 'How do they handle distributed transactions?',
    faq3a: 'Both use MVCC with distributed ACID transactions. CockroachDB uses hybrid logical clocks (HLC) for timestamp ordering. YugabyteDB uses a similar approach with hybrid time. Both achieve strong consistency with serializable isolation levels.',
    
    faq4q: 'Which has better cloud offerings?',
    faq4a: 'CockroachDB offers CockroachDB Serverless (fully managed, per-query pricing) and CockroachDB Dedicated. YugabyteDB offers YugabyteDB Managed (cloud-hosted). CockroachDB has more mature serverless offering; YugabyteDB is more cost-effective for dedicated instances.',
    
    faq5q: 'Can I migrate from PostgreSQL?',
    faq5a: 'Yes, both support PostgreSQL migration. CockroachDB has higher compatibility, making migration easier. YugabyteDB also supports pg_dump migration. Both have schema conversion tools, but CockroachDB handles more PostgreSQL features natively.',
    
    faq6q: 'What about Cassandra compatibility?',
    faq6a: 'YugabyteDB offers YCQL API, which is Cassandra-compatible, making it attractive for Cassandra migrations. CockroachDB does not have Cassandra compatibility. For teams with Cassandra expertise or migrating from Cassandra, YugabyteDB is the clear choice.',
    
    faq7q: 'How do they compare for Kubernetes?',
    faq7a: 'Both have Kubernetes operators. CockroachDB Operator is mature with good documentation. YugabyteDB also has a well-maintained operator. Both integrate well with Kubernetes, but CockroachDB has slightly more Kubernetes ecosystem maturity.',
    
    faq8q: 'What about change data capture (CDC)?',
    faq8a: 'Both support CDC. CockroachDB has built-in changefeeds to Kafka and cloud storage. YugabyteDB offers CDC via YugabyteDB CDC API with Kafka integration. Both handle CDC well for real-time data streaming use cases.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'CockroachDB vs YugabyteDB：分布式 SQL 数据库对比',
    intro: 'CockroachDB 和 YugabyteDB 都是受 Google Spanner 启发的分布式 SQL 数据库，提供水平可扩展性和强一致性。虽然它们共享类似的架构，但在许可、生态系统关注点和特定功能方面有所不同。本比较考察它们的架构、性能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为 PostgreSQL 兼容性、无服务器选项和企业功能选择 CockroachDB。为完全开源许可、Cassandra 兼容 API（YCQL）和成本效益自托管选择 YugabyteDB。两者都提供优秀的分布式 SQL 能力和强一致性保证。',
    
    takeawaysTitle: '核心要点',
    takeaway1: '两者都受 Google Spanner 架构启发',
    takeaway2: 'CockroachDB 使用 BSL 许可；YugabyteDB 是 Apache 2.0',
    takeaway3: 'CockroachDB 有更好的 PostgreSQL 兼容性',
    takeaway4: 'YugabyteDB 提供 Cassandra 兼容的 YCQL API',
    takeaway5: '两者都支持多区域和全球部署',
    takeaway6: 'YugabyteDB 对于自托管更具成本效益',
    
    whatIsCockroachdbTitle: '什么是 CockroachDB？',
    whatIsCockroachdbContent: 'CockroachDB 是由 Cockroach Labs 开发的分布式 SQL 数据库。2015 年发布，它受 Google Spanner 启发，提供水平可扩展性、ACID 事务和 SQL 兼容性。CockroachDB 在云原生部署方面表现出色，提供无服务器和专用云选项，具有强大的 PostgreSQL 兼容性。',
    
    whatIsYugabytedbTitle: '什么是 YugabyteDB？',
    whatIsYugabytedbContent: 'YugabyteDB 是由 Yugabyte 开发的开源分布式 SQL 数据库。2017 年发布，它也从 Google Spanner 汲取灵感。YugabyteDB 提供两个 API：YSQL（PostgreSQL 兼容）和 YCQL（Cassandra 兼容）。它强调完全开源许可和成本效益的自托管部署。',
    
    performanceTitle: '性能对比',
    performanceIntro: '架构和性能特征：',
    
    featuresTitle: '功能对比',
    featuresIntro: '详细功能矩阵：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: 'SQL 和 API 示例：',
    
    cockroachdbExampleTitle: 'CockroachDB SQL',
    yugabytedbExampleTitle: 'YugabyteDB SQL/YCQL',
    
    dataSourceTitle: '架构详情',
    dataSourceIntro: '内部架构和存储：',
    
    alertingTitle: '部署与运维',
    alertingIntro: '部署选项和运维功能：',
    
    useCasesTitle: '最佳用例',
    cockroachdbBestFor: 'CockroachDB 最适合：',
    yugabytedbBestFor: 'YugabyteDB 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'CockroachDB 和 YugabyteDB 都是优秀的分布式 SQL 数据库，具有类似的架构但针对不同的市场。CockroachDB 非常适合想要托管服务、无服务器选项和最大 PostgreSQL 兼容性的企业。YugabyteDB 是优先考虑开源、成本效益自托管和多 API 灵活性（SQL + Cassandra）的组织的理想选择。两者都能出色地处理多区域、全球分布式工作负载。',
    
    faq1q: '它们与 PostgreSQL 线路兼容吗？',
    faq1a: '两者都支持 PostgreSQL 线路协议。CockroachDB 具有更高的 PostgreSQL 兼容性（旨在完全功能对等）。YugabyteDB YSQL 是 PostgreSQL 兼容的，但有一些差异。你可以在两个数据库中使用大多数 PostgreSQL 驱动程序。',
    
    faq2q: '许可差异怎么样？',
    faq2a: 'CockroachDB 使用业务源许可（BSL），限制某些企业功能和云托管。YugabyteDB 完全采用 Apache 2.0 许可，允许不受限制的自托管。对于最大的开源自由，YugabyteDB 有优势。',
    
    faq3q: '它们如何处理分布式事务？',
    faq3a: '两者都使用 MVCC 和分布式 ACID 事务。CockroachDB 使用混合逻辑时钟（HLC）进行时间戳排序。YugabyteDB 使用类似的方法和混合时间。两者都通过可序列化隔离级别实现强一致性。',
    
    faq4q: '哪个有更好的云产品？',
    faq4a: 'CockroachDB 提供 CockroachDB Serverless（完全托管、按查询定价）和 CockroachDB Dedicated。YugabyteDB 提供 YugabyteDB Managed（云托管）。CockroachDB 拥有更成熟的无服务器产品；YugabyteDB 对于专用实例更具成本效益。',
    
    faq5q: '我可以从 PostgreSQL 迁移吗？',
    faq5a: '是的，两者都支持 PostgreSQL 迁移。CockroachDB 具有更高的兼容性，使迁移更容易。YugabyteDB 也支持 pg_dump 迁移。两者都有模式转换工具，但 CockroachDB 原生处理更多 PostgreSQL 功能。',
    
    faq6q: 'Cassandra 兼容性怎么样？',
    faq6a: 'YugabyteDB 提供 YCQL API，它与 Cassandra 兼容，使其对 Cassandra 迁移具有吸引力。CockroachDB 没有 Cassandra 兼容性。对于具有 Cassandra 专业知识或从 Cassandra 迁移的团队，YugabyteDB 是明确的选择。',
    
    faq7q: '它们在 Kubernetes 方面如何比较？',
    faq7a: '两者都有 Kubernetes 操作符。CockroachDB Operator 成熟且文档完善。YugabyteDB 也有一个维护良好的操作符。两者都与 Kubernetes 良好集成，但 CockroachDB 有稍微更多的 Kubernetes 生态系统成熟度。',
    
    faq8q: '变更数据捕获（CDC）怎么样？',
    faq8a: '两者都支持 CDC。CockroachDB 具有内置的变更源到 Kafka 和云存储。YugabyteDB 通过 YugabyteDB CDC API 提供 CDC，与 Kafka 集成。两者都能很好地处理实时数据流用例的 CDC。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function CockroachdbVsYugabytedb({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsCockroachdbTitle}</h3>
      <p style={pStyle}>{ct.whatIsCockroachdbContent}</p>

      <h3 style={h3Style}>{ct.whatIsYugabytedbTitle}</h3>
      <p style={pStyle}>{ct.whatIsYugabytedbContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>CockroachDB</th>
              <th style={thStyle}>YugabyteDB</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '架构' : 'Architecture', 'Spanner-inspired', 'Spanner-inspired'],
              [isZh ? '一致性模型' : 'Consistency', isZh ? '可序列化' : 'Serializable', isZh ? '可序列化' : 'Serializable'],
              [isZh ? '分片' : 'Sharding', isZh ? '自动范围分片' : 'Automatic range sharding', isZh ? '自动分片' : 'Automatic sharding'],
              [isZh ? '复制' : 'Replication', isZh ? 'Raft 共识' : 'Raft consensus', isZh ? 'Raft 共识' : 'Raft consensus'],
              [isZh ? 'ACID 事务' : 'ACID Transactions', isZh ? '完整支持' : 'Full support', isZh ? '完整支持' : 'Full support'],
              [isZh ? '多区域' : 'Multi-region', isZh ? '原生支持' : 'Native support', isZh ? '原生支持' : 'Native support'],
            ].map(([feature, cockroachdb, yugabytedb], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{cockroachdb}</td>
                <td style={tdStyle}>{yugabytedb}</td>
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
              <th style={thStyle}>CockroachDB</th>
              <th style={thStyle}>YugabyteDB</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '许可证' : 'License', 'BSL (Business Source)', 'Apache 2.0'],
              [isZh ? 'API' : 'APIs', 'SQL (PostgreSQL)', 'YSQL (PostgreSQL), YCQL (Cassandra)'],
              [isZh ? 'PostgreSQL 兼容性' : 'PostgreSQL Compatibility', isZh ? '高' : 'High', isZh ? '良好' : 'Good'],
              [isZh ? '变更源' : 'Change Data Capture', isZh ? '内置' : 'Built-in', isZh ? '通过 API' : 'Via API'],
              [isZh ? '无服务器' : 'Serverless', isZh ? '有' : 'Yes', isZh ? '无' : 'No'],
              [isZh ? 'Kubernetes' : 'Kubernetes', isZh ? '成熟操作符' : 'Mature operator', isZh ? '良好操作符' : 'Good operator'],
              [isZh ? '备份/恢复' : 'Backup/Restore', isZh ? '云存储集成' : 'Cloud storage integration', isZh ? '多种选项' : 'Multiple options'],
              [isZh ? '自托管成本' : 'Self-hosted Cost', isZh ? '较高（企业功能付费）' : 'Higher (enterprise features paid)', isZh ? '较低（开源）' : 'Lower (open source)'],
            ].map(([cap, cockroachdb, yugabytedb], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{cockroachdb}</td>
                <td style={tdStyle}>{yugabytedb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f46800' }}>{ct.cockroachdbExampleTitle}</h3>
      <pre style={codeStyle}><code>{`-- CockroachDB: Create distributed table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email STRING UNIQUE NOT NULL,
    name STRING NOT NULL,
    region STRING NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create regional partitioning
CREATE TABLE users_by_region (
    CHECK (region = 'us-east')
) INHERITS (users);

CREATE TABLE users_by_region_west (
    CHECK (region = 'us-west')
) INHERITS (users);

-- Insert with automatic distribution
INSERT INTO users (email, name, region)
VALUES ('user@example.com', 'John Doe', 'us-east');

-- Multi-region query with follower reads
SELECT * FROM users
WHERE region = 'us-east'
AND created_at > now() - INTERVAL '7 days'
AS OF SYSTEM TIME '-10s';  -- Follower read

-- Distributed transaction
BEGIN;
  UPDATE accounts SET balance = balance - 100
  WHERE id = 'account-1';
  
  UPDATE accounts SET balance = balance + 100
  WHERE id = 'account-2';
COMMIT;

-- Change feed (CDC)
CREATE CHANGEFEED FOR TABLE users
INTO 'kafka://kafka:9092'
WITH updated, resolved;

-- Backup to cloud storage
BACKUP INTO 's3://my-bucket/backups?AWS_ACCESS_KEY_ID=xxx&AWS_SECRET_ACCESS_KEY=yyy';`}</code></pre>

      <h3 style={{ ...h3Style, color: '#00bfb3' }}>{ct.yugabytedbExampleTitle}</h3>
      <pre style={codeStyle}><code>{`-- YugabyteDB YSQL (PostgreSQL-compatible)
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    total DECIMAL(10,2),
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Colocated tables for better performance
CREATE TABLE order_items (
    order_id UUID,
    item_id UUID,
    quantity INT,
    price DECIMAL(10,2),
    PRIMARY KEY (order_id, item_id)
) WITH (colocated = true);

-- Insert with hash sharding
INSERT INTO orders (user_id, total, status)
VALUES ('user-uuid', 99.99, 'processing');

-- Distributed transaction
BEGIN;
  INSERT INTO orders (user_id, total)
  VALUES ('user-1', 50.00);
  
  INSERT INTO order_items (order_id, item_id, quantity)
  VALUES (currval('orders_id_seq'), 'item-1', 2);
COMMIT;

-- YCQL API (Cassandra-compatible)
-- Create keyspace and table
CREATE KEYSPACE IF NOT EXISTS ecommerce;
CREATE TABLE ecommerce.products (
    product_id UUID,
    category TEXT,
    name TEXT,
    price DECIMAL,
    PRIMARY KEY (product_id, category)
);

-- Insert using YCQL
INSERT INTO ecommerce.products 
(product_id, category, name, price)
VALUES (uuid(), 'electronics', 'Laptop', 999.99);

-- Query with consistency level
SELECT * FROM ecommerce.products
WHERE category = 'electronics'
USING CONSISTENCY QUORUM;`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '组件' : 'Component'}</th>
              <th style={thStyle}>CockroachDB</th>
              <th style={thStyle}>YugabyteDB</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '存储引擎' : 'Storage Engine', 'Pebble (LSM-tree)', 'RocksDB (LSM-tree)'],
              [isZh ? '共识协议' : 'Consensus', 'Raft', 'Raft'],
              [isZh ? '时钟同步' : 'Clock Sync', 'HLC (Hybrid Logical Clock)', isZh ? '混合时间' : 'Hybrid time'],
              [isZh ? '数据分布' : 'Data Distribution', 'Range-based sharding', isZh ? '哈希 + 范围分片' : 'Hash + Range sharding'],
              [isZh ? '事务模型' : 'Transaction Model', 'MVCC + 2PC', 'MVCC + 2PC'],
              [isZh ? '隔离级别' : 'Isolation Level', isZh ? '可序列化' : 'Serializable', isZh ? '可序列化、快照' : 'Serializable, Snapshot'],
            ].map(([cat, cockroachdb, yugabytedb], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{cockroachdb}</td>
                <td style={tdStyle}>{yugabytedb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f46800' }}>
          <strong style={{ color: '#f46800' }}>CockroachDB Deployment</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'CockroachDB Serverless（完全托管、按使用付费）、CockroachDB Dedicated（专用集群）、CockroachDB Self-Hosted（本地部署），Kubernetes Operator 成熟，内置备份到云存储，多区域部署简单，强大的 DB Console 监控。' : 'CockroachDB Serverless (fully managed, pay-per-use), CockroachDB Dedicated (dedicated clusters), CockroachDB Self-Hosted (on-prem), mature Kubernetes Operator, built-in backup to cloud storage, simple multi-region deployment, powerful DB Console monitoring.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #00bfb3' }}>
          <strong style={{ color: '#00bfb3' }}>YugabyteDB Deployment</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'YugabyteDB Managed（云托管）、YugabyteDB Anywhere（多云/本地）、完全开源自托管选项，成本效益更高的企业功能，Kubernetes Operator 可用，多种备份选项，YugabyteDB Admin UI 监控。' : 'YugabyteDB Managed (cloud-hosted), YugabyteDB Anywhere (multi-cloud/on-prem), fully open-source self-hosted option, more cost-effective enterprise features, Kubernetes Operator available, multiple backup options, YugabyteDB Admin UI monitoring.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>{ct.cockroachdbBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业需要托管服务' : 'Enterprises needing managed services'}</li>
            <li>{isZh ? '无服务器用例' : 'Serverless use cases'}</li>
            <li>{isZh ? '高 PostgreSQL 兼容需求' : 'High PostgreSQL compatibility needs'}</li>
            <li>{isZh ? '金融交易系统' : 'Financial transaction systems'}</li>
            <li>{isZh ? '全球 SaaS 应用' : 'Global SaaS applications'}</li>
            <li>{isZh ? '简单运维团队' : 'Teams wanting simple operations'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00bfb3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00bfb3' }}>{ct.yugabytedbBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '开源优先组织' : 'Open-source-first organizations'}</li>
            <li>{isZh ? 'Cassandra 迁移' : 'Cassandra migrations'}</li>
            <li>{isZh ? '成本敏感部署' : 'Cost-sensitive deployments'}</li>
            <li>{isZh ? '多 API 需求（SQL + NoSQL）' : 'Multi-API needs (SQL + NoSQL)'}</li>
            <li>{isZh ? '混合云环境' : 'Hybrid cloud environments'}</li>
            <li>{isZh ? '自托管偏好' : 'Self-hosting preference'}</li>
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
