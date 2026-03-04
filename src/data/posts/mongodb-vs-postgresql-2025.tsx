'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'MongoDB vs PostgreSQL 2025: NoSQL vs SQL Database Comparison',
    intro: 'MongoDB and PostgreSQL represent two fundamentally different approaches to data storage. MongoDB is a document-oriented NoSQL database designed for flexibility and scale, while PostgreSQL is a relational SQL database known for data integrity and complex queries. This 2025 comparison examines their capabilities, performance, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose MongoDB for flexible schemas, horizontal scaling, rapid development, and document-oriented data like content management or IoT. Choose PostgreSQL for complex relationships, ACID compliance, advanced SQL features, and applications requiring strong data integrity like financial systems or analytics.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'MongoDB offers flexible schema design; PostgreSQL enforces rigid schemas',
    takeaway2: 'PostgreSQL excels at complex joins and relational queries',
    takeaway3: 'MongoDB provides easier horizontal scaling via sharding',
    takeaway4: 'PostgreSQL has stronger ACID compliance and data integrity',
    takeaway5: 'Both support JSON storage, but with different approaches',
    takeaway6: 'MongoDB 7.0+ adds native time series and change streams',
    
    whatIsMongoTitle: 'What is MongoDB?',
    whatIsMongoContent: 'MongoDB is a document-oriented NoSQL database released in 2009. It stores data in flexible, JSON-like BSON documents with dynamic schemas. MongoDB is designed for scalability, high performance, and ease of development. Version 7.0 introduced native time series collections, change streams, and improved aggregation capabilities.',
    
    whatIsPostgresTitle: 'What is PostgreSQL?',
    whatIsPostgresContent: 'PostgreSQL is an open-source relational database with over 35 years of development. Known for reliability and feature robustness, it supports complex SQL queries, ACID compliance, and extensive data types. PostgreSQL 16+ brings improved parallel queries, JSON enhancements, and better performance for analytical workloads.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Query and schema examples for both databases:',
    
    mongoExampleTitle: 'MongoDB Examples',
    postgresExampleTitle: 'PostgreSQL Examples',
    
    dataSourceTitle: 'Scaling & Performance',
    dataSourceIntro: 'Scalability and performance characteristics:',
    
    alertingTitle: 'When to Choose',
    alertingIntro: 'Decision criteria for each database:',
    
    useCasesTitle: 'Best Use Cases',
    mongoBestFor: 'MongoDB is Best For:',
    postgresBestFor: 'PostgreSQL is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'MongoDB and PostgreSQL serve different needs in 2025. MongoDB excels for applications with evolving schemas, horizontal scaling requirements, and document-oriented data. PostgreSQL remains the choice for complex relational data, strong consistency requirements, and applications leveraging advanced SQL features. Many modern architectures use both: PostgreSQL for transactional data and MongoDB for flexible document storage.',
    
    faq1q: 'Can PostgreSQL store JSON data like MongoDB?',
    faq1a: 'Yes, PostgreSQL has excellent JSON/JSONB support with indexing, querying, and operators. JSONB provides efficient binary storage and indexing. However, MongoDB remains more natural for document-centric workflows with its native query language and automatic schema handling.',
    
    faq2q: 'Which database is faster?',
    faq2a: 'It depends on the workload. MongoDB excels at read-heavy, simple queries on large datasets and write-heavy workloads with horizontal scaling. PostgreSQL excels at complex analytical queries, joins, and transactional consistency. Benchmark your specific use case for accurate results.',
    
    faq3q: 'How do they handle scaling?',
    faq3a: 'MongoDB supports native horizontal scaling via sharding, distributing data across multiple servers automatically. PostgreSQL scales vertically well and supports read replicas, but horizontal sharding requires extensions like Citus or manual partitioning.',
    
    faq4q: 'Which is better for startups?',
    faq4a: 'MongoDB often suits startups better due to flexible schemas that accommodate rapid iteration. However, if your domain has clear relational data (e.g., financial, e-commerce), PostgreSQL prevents future data integrity issues. Consider your data model first.',
    
    faq5q: 'What about ACID compliance?',
    faq5a: 'PostgreSQL has full ACID compliance with strong consistency guarantees. MongoDB supports multi-document ACID transactions since 4.0, but cross-shard transactions have performance implications. For strict consistency requirements, PostgreSQL is safer.',
    
    faq6q: 'Which has better cloud support?',
    faq6a: 'Both have excellent cloud options. MongoDB Atlas is a mature managed service with global clusters. AWS RDS, Google Cloud SQL, and Azure Database all support PostgreSQL. Neon and Supabase offer modern PostgreSQL experiences. Choose based on your cloud provider.',
    
    faq7q: 'Can I migrate between them?',
    faq7a: 'Yes, but it requires careful planning. Mongo-to-Postgres migration tools exist for relational data. Postgres-to-Mongo requires denormalizing data. Consider using an abstraction layer if migration might be needed.',
    
    faq8q: 'What about full-text search?',
    faq8a: 'Both support full-text search. MongoDB has native text indexes. PostgreSQL has powerful full-text search with tsvector, trigrams, and extensions like pg_trgm. For advanced search, consider dedicated engines like Elasticsearch or Meilisearch with either database.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'MongoDB vs PostgreSQL 2025：NoSQL vs SQL 数据库对比',
    intro: 'MongoDB 和 PostgreSQL 代表了两种根本不同的数据存储方式。MongoDB 是面向文档的 NoSQL 数据库，专为灵活性和扩展性设计；PostgreSQL 是关系型 SQL 数据库，以数据完整性和复杂查询著称。本 2025 年对比分析它们的功能、性能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为灵活模式、水平扩展、快速开发和文档导向数据（如内容管理或物联网）选择 MongoDB。为复杂关系、ACID 合规性、高级 SQL 特性和需要强数据完整性的应用（如金融系统或分析）选择 PostgreSQL。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'MongoDB 提供灵活的模式设计；PostgreSQL 强制严格模式',
    takeaway2: 'PostgreSQL 在复杂连接和关系查询方面表现出色',
    takeaway3: 'MongoDB 通过分片提供更简单的水平扩展',
    takeaway4: 'PostgreSQL 有更强的 ACID 合规性和数据完整性',
    takeaway5: '两者都支持 JSON 存储，但方法不同',
    takeaway6: 'MongoDB 7.0+ 添加了原生时间序列和变更流',
    
    whatIsMongoTitle: '什么是 MongoDB？',
    whatIsMongoContent: 'MongoDB 是 2009 年发布的面向文档的 NoSQL 数据库。它以灵活的类 JSON BSON 文档存储数据，具有动态模式。MongoDB 专为可扩展性、高性能和开发便捷性设计。7.0 版本引入了原生时间序列集合、变更流和改进的聚合功能。',
    
    whatIsPostgresTitle: '什么是 PostgreSQL？',
    whatIsPostgresContent: 'PostgreSQL 是有超过 35 年发展历史的开源关系型数据库。以可靠性和功能健壮性著称，支持复杂 SQL 查询、ACID 合规性和丰富的数据类型。PostgreSQL 16+ 带来了改进的并行查询、JSON 增强和分析负载的更好性能。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两个数据库的查询和模式示例：',
    
    mongoExampleTitle: 'MongoDB 示例',
    postgresExampleTitle: 'PostgreSQL 示例',
    
    dataSourceTitle: '扩展与性能',
    dataSourceIntro: '可扩展性和性能特征：',
    
    alertingTitle: '选择指南',
    alertingIntro: '选择每个数据库的决策标准：',
    
    useCasesTitle: '最佳用例',
    mongoBestFor: 'MongoDB 最适合：',
    postgresBestFor: 'PostgreSQL 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: '2025 年 MongoDB 和 PostgreSQL 服务于不同需求。MongoDB 在模式演进、水平扩展需求和文档导向数据方面表现出色。PostgreSQL 仍然是复杂关系数据、强一致性需求和利用高级 SQL 特性的应用的选择。许多现代架构同时使用两者：PostgreSQL 用于事务数据，MongoDB 用于灵活文档存储。',
    
    faq1q: 'PostgreSQL 可以像 MongoDB 一样存储 JSON 数据吗？',
    faq1a: '是的，PostgreSQL 有出色的 JSON/JSONB 支持，包括索引、查询和操作符。JSONB 提供高效的二进制存储和索引。然而，MongoDB 以其原生查询语言和自动模式处理，在文档中心工作流方面仍然更加自然。',
    
    faq2q: '哪个数据库更快？',
    faq2a: '这取决于工作负载。MongoDB 在大型数据集上的读取密集型简单查询和具有水平扩展的写入密集型工作负载方面表现出色。PostgreSQL 在复杂分析查询、连接和事务一致性方面表现出色。对你的特定用例进行基准测试以获得准确结果。',
    
    faq3q: '它们如何处理扩展？',
    faq3a: 'MongoDB 通过分片原生支持水平扩展，自动在多个服务器间分布数据。PostgreSQL 垂直扩展良好并支持读副本，但水平分片需要 Citus 等扩展或手动分区。',
    
    faq4q: '哪个更适合初创公司？',
    faq4a: 'MongoDB 通常更适合初创公司，因为灵活模式适应快速迭代。然而，如果你的领域有明确的关系数据（如金融、电商），PostgreSQL 可以防止未来的数据完整性问题。首先考虑你的数据模型。',
    
    faq5q: 'ACID 合规性如何？',
    faq5a: 'PostgreSQL 具有完整的 ACID 合规性和强一致性保证。MongoDB 从 4.0 开始支持多文档 ACID 事务，但跨分片事务有性能影响。对于严格的一致性要求，PostgreSQL 更安全。',
    
    faq6q: '哪个云支持更好？',
    faq6a: '两者都有出色的云选项。MongoDB Atlas 是成熟的托管服务，支持全球集群。AWS RDS、Google Cloud SQL 和 Azure Database 都支持 PostgreSQL。Neon 和 Supabase 提供现代 PostgreSQL 体验。根据你的云提供商选择。',
    
    faq7q: '可以在它们之间迁移吗？',
    faq7a: '可以，但需要仔细规划。存在用于关系数据的 Mongo 到 Postgres 迁移工具。Postgres 到 Mongo 需要反规范化数据。如果可能需要迁移，考虑使用抽象层。',
    
    faq8q: '全文搜索如何？',
    faq8a: '两者都支持全文搜索。MongoDB 有原生文本索引。PostgreSQL 有强大的全文搜索，包括 tsvector、trigrams 和 pg_trgm 等扩展。对于高级搜索，考虑使用任一数据库的专用引擎如 Elasticsearch 或 Meilisearch。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function MongodbVsPostgresql2025({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsMongoTitle}</h3>
      <p style={pStyle}>{ct.whatIsMongoContent}</p>

      <h3 style={h3Style}>{ct.whatIsPostgresTitle}</h3>
      <p style={pStyle}>{ct.whatIsPostgresContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>MongoDB</th>
              <th style={thStyle}>PostgreSQL</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据库类型' : 'Database Type', 'NoSQL (Document)', 'SQL (Relational)'],
              [isZh ? '模式' : 'Schema', isZh ? '灵活/动态' : 'Flexible/Dynamic', isZh ? '严格/预定义' : 'Strict/Predefined'],
              [isZh ? '扩展方式' : 'Scaling', isZh ? '水平（原生分片）' : 'Horizontal (Native Sharding)', isZh ? '垂直为主' : 'Vertical Primary'],
              [isZh ? 'ACID 事务' : 'ACID Transactions', isZh ? '支持（4.0+）' : 'Yes (4.0+)', isZh ? '完全支持' : 'Full Support'],
              [isZh ? '复杂查询' : 'Complex Queries', isZh ? '聚合管道' : 'Aggregation Pipeline', isZh ? '完整 SQL' : 'Full SQL'],
              [isZh ? '连接操作' : 'Joins', '$lookup (limited)', isZh ? '强大' : 'Powerful'],
              [isZh ? 'JSON 支持' : 'JSON Support', isZh ? '原生 BSON' : 'Native BSON', 'JSONB (binary)'],
            ].map(([feature, mongo, postgres], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{mongo}</td>
                <td style={tdStyle}>{postgres}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>MongoDB</th>
              <th style={thStyle}>PostgreSQL</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '索引类型' : 'Index Types', isZh ? 'B-tree, 地理空间, 文本' : 'B-tree, Geospatial, Text', isZh ? 'B-tree, GIN, GiST, BRIN' : 'B-tree, GIN, GiST, BRIN'],
              [isZh ? '全文搜索' : 'Full-Text Search', isZh ? '原生文本索引' : 'Native Text Index', 'tsvector, pg_trgm'],
              [isZh ? '时间序列' : 'Time Series', isZh ? '原生支持（5.0+）' : 'Native (5.0+)', isZh ? 'TimescaleDB 扩展' : 'TimescaleDB Extension'],
              [isZh ? '复制' : 'Replication', isZh ? '副本集' : 'Replica Sets', isZh ? '流复制' : 'Streaming Replication'],
              [isZh ? '备份' : 'Backups', isZh ? '快照, mongodump' : 'Snapshot, mongodump', 'pg_dump, PITR'],
              [isZh ? '云服务' : 'Cloud Service', 'MongoDB Atlas', 'AWS RDS, Neon, Supabase'],
            ].map(([cap, mongo, postgres], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{mongo}</td>
                <td style={tdStyle}>{postgres}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#4db33d' }}>{ct.mongoExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// MongoDB: Insert Document
db.users.insertOne({
  name: "Alice Johnson",
  email: "alice@example.com",
  roles: ["admin", "editor"],
  metadata: {
    lastLogin: new Date(),
    preferences: { theme: "dark", notifications: true }
  }
});

// MongoDB: Find with Aggregation
db.orders.aggregate([
  { \\$match: { status: "completed", createdAt: { \\$gte: new Date("2025-01-01") } } },
  { \\$group: {
      _id: "\\$customerId",
      totalSpent: { \\$sum: "\\$amount" },
      orderCount: { \\$sum: 1 }
    }
  },
  { \\$sort: { totalSpent: -1 } },
  { \\$limit: 10 }
]);

// MongoDB: Create Index
db.users.createIndex({ email: 1 }, { unique: true });
db.products.createIndex({ name: "text", description: "text" });

// MongoDB: Change Stream (Real-time)
const changeStream = db.collection('orders').watch();
changeStream.on('change', (change) => {
  console.log('Change detected:', change);
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#336791' }}>{ct.postgresExampleTitle}</h3>
      <pre style={codeStyle}><code>{`-- PostgreSQL: Create Table with Constraints
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  roles TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PostgreSQL: Complex Query with Joins
SELECT 
  c.name AS customer_name,
  COUNT(o.id) AS order_count,
  SUM(o.amount) AS total_spent,
  AVG(o.amount) AS avg_order
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'completed'
  AND o.created_at >= '2025-01-01'
GROUP BY c.id, c.name
HAVING SUM(o.amount) > 1000
ORDER BY total_spent DESC
LIMIT 10;

-- PostgreSQL: JSONB Operations
SELECT * FROM users 
WHERE metadata->>'theme' = 'dark'
  AND metadata->'preferences'->>'notifications' = 'true';

-- PostgreSQL: Create Indexes
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_metadata_gin ON users USING GIN(metadata);`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>MongoDB</th>
              <th style={thStyle}>PostgreSQL</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '水平扩展' : 'Horizontal Scaling', isZh ? '原生自动分片' : 'Native Auto-Sharding', isZh ? '需 Citus 扩展' : 'Requires Citus Extension'],
              [isZh ? '垂直扩展' : 'Vertical Scaling', isZh ? '支持' : 'Supported', isZh ? '优秀' : 'Excellent'],
              [isZh ? '读取扩展' : 'Read Scaling', isZh ? '副本集读偏好' : 'Replica Set Read Preference', isZh ? '读副本' : 'Read Replicas'],
              [isZh ? '写入性能' : 'Write Performance', isZh ? '高（分片）' : 'High (Sharded)', isZh ? '高（单节点）' : 'High (Single Node)'],
              [isZh ? '全球分布' : 'Global Distribution', 'Atlas Global Clusters', isZh ? '需手动配置' : 'Manual Configuration'],
            ].map(([cat, mongo, postgres], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{mongo}</td>
                <td style={tdStyle}>{postgres}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4db33d' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4db33d' }}>{ct.mongoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '内容管理系统' : 'Content management systems'}</li>
            <li>{isZh ? '物联网数据采集' : 'IoT data collection'}</li>
            <li>{isZh ? '实时分析' : 'Real-time analytics'}</li>
            <li>{isZh ? '移动应用后端' : 'Mobile app backends'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '日志和事件数据' : 'Log and event data'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #336791' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#336791' }}>{ct.postgresBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '金融交易系统' : 'Financial transaction systems'}</li>
            <li>{isZh ? '电商订单管理' : 'E-commerce order management'}</li>
            <li>{isZh ? '复杂业务分析' : 'Complex business analytics'}</li>
            <li>{isZh ? 'ERP/CRM 系统' : 'ERP/CRM systems'}</li>
            <li>{isZh ? '数据仓库' : 'Data warehousing'}</li>
            <li>{isZh ? '地理空间应用' : 'Geospatial applications'}</li>
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
