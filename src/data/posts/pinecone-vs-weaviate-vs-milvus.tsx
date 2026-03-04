'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Pinecone vs Weaviate vs Milvus: Vector Database Comparison',
    intro: 'Pinecone, Weaviate, and Milvus are three leading vector databases designed for AI and ML applications. Pinecone is a fully managed cloud service, Weaviate offers both managed and self-hosted options with built-in ML modules, while Milvus is an open-source solution ideal for large-scale deployments. This comparison examines their features, performance, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Pinecone for fully managed simplicity and fast development. Choose Weaviate for hybrid search, built-in ML modules, and flexible deployment. Choose Milvus for open-source, large-scale deployments with maximum control. All three excel at vector similarity search for AI applications.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Pinecone is fully managed with zero infrastructure management',
    takeaway2: 'Weaviate offers built-in vectorization and ML modules',
    takeaway3: 'Milvus is open-source with enterprise-grade scalability',
    takeaway4: 'All three support billion-scale vector operations',
    takeaway5: 'Pinecone has the simplest getting-started experience',
    takeaway6: 'Milvus offers the most deployment flexibility',
    
    whatIsPineconeTitle: 'What is Pinecone?',
    whatIsPineconeContent: 'Pinecone is a fully managed vector database designed for machine learning applications. Founded in 2019, it provides a serverless vector database that handles infrastructure, scaling, and maintenance automatically. Pinecone is optimized for high-performance vector search with low latency, making it ideal for production AI applications.',
    
    whatIsWeaviateTitle: 'What is Weaviate?',
    whatIsWeaviateContent: 'Weaviate is an open-source vector database that combines vector search with traditional keyword search. Released in 2019, it includes built-in ML modules for vectorization, supports multiple data types, and offers both self-hosted and managed cloud options. Weaviate excels at semantic search, RAG, and knowledge graphs.',
    
    whatIsMilvusTitle: 'What is Milvus?',
    whatIsMilvusContent: 'Milvus is an open-source vector database built for scalable similarity search. Created by Zilliz in 2019, it supports massive-scale deployments (billions of vectors) and offers various deployment modes from local development to distributed clusters. Milvus is designed for enterprise-grade AI applications requiring high throughput.',
    
    performanceTitle: 'Core Comparison',
    performanceIntro: 'Comparing key capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of features:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Basic usage patterns:',
    
    pineconeExampleTitle: 'Pinecone Example',
    weaviateExampleTitle: 'Weaviate Example',
    milvusExampleTitle: 'Milvus Example',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Deployment and infrastructure:',
    
    useCasesTitle: 'Best Use Cases',
    pineconeBestFor: 'Pinecone is Best For:',
    weaviateBestFor: 'Weaviate is Best For:',
    milvusBestFor: 'Milvus is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Pinecone, Weaviate, and Milvus each serve different needs. Pinecone is ideal for teams wanting fully managed simplicity with minimal operations. Weaviate is perfect for applications requiring hybrid search, built-in ML capabilities, and flexible deployment. Milvus is the choice for large-scale, open-source deployments where you need maximum control and scalability. Your choice depends on your team size, technical requirements, and operational preferences.',
    
    faq1q: 'Which is the easiest to get started with?',
    faq1a: 'Pinecone is the easiest to start with due to its fully managed nature. You can create an index in minutes with no infrastructure setup. Weaviate Cloud also offers easy setup, while Milvus requires more initial configuration but provides comprehensive documentation.',
    
    faq2q: 'Which handles the largest scale?',
    faq2a: 'Milvus and Pinecone both handle billion-scale vectors efficiently. Milvus has been tested with tens of billions of vectors in distributed deployments. Pinecone scales automatically in the cloud. Weaviate also scales well but is typically used for smaller to medium deployments.',
    
    faq3q: 'What about pricing?',
    faq3a: 'Pinecone and Weaviate Cloud use consumption-based pricing. Pinecone charges per vector and query, while Weaviate Cloud has storage and compute costs. Milvus is free and open-source, with costs coming from your own infrastructure. For large deployments, self-hosted Milvus can be more cost-effective.',
    
    faq4q: 'Which has the best search performance?',
    faq4a: 'All three offer excellent search performance with sub-50ms latency for typical queries. Pinecone is optimized for low-latency production workloads. Weaviate offers hybrid search combining vector and keyword. Milvus provides various index types (IVF, HNSW, etc.) for performance tuning.',
    
    faq5q: 'Can I migrate between them?',
    faq5a: 'Yes, migration is possible but requires data transformation. All three support standard vector formats. Tools like LangChain and LlamaIndex provide abstractions that make switching easier. Plan for some development effort when migrating.',
    
    faq6q: 'Which supports metadata filtering?',
    faq6a: 'All three support metadata filtering. Pinecone offers powerful filtering with range and exact match. Weaviate has rich filtering with GraphQL-like syntax. Milvus supports scalar filtering with various data types and operators.',
    
    faq7q: 'What about security and compliance?',
    faq7a: 'Pinecone offers SOC 2 Type II compliance and enterprise security features. Weaviate supports RBAC and encryption. Milvus provides authentication and TLS encryption. All three can be configured for enterprise security requirements.',
    
    faq8q: 'Which has better community support?',
    faq8a: 'Milvus has a large open-source community with active GitHub discussions. Weaviate also has strong community engagement and extensive documentation. Pinecone has smaller but responsive community with excellent official support. All three have active Slack/Discord communities.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Pinecone vs Weaviate vs Milvus：向量数据库对比',
    intro: 'Pinecone、Weaviate 和 Milvus 是三个专为 AI 和 ML 应用设计的领先向量数据库。Pinecone 是完全托管的云服务，Weaviate 提供托管和自托管选项并内置 ML 模块，而 Milvus 是开源解决方案，适合大规模部署。本比较考察它们的功能、性能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为完全托管的简单性和快速开发选择 Pinecone。为混合搜索、内置 ML 模块和灵活部署选择 Weaviate。为开源、大规模部署和最大控制权选择 Milvus。这三者都在 AI 应用的向量相似性搜索方面表现出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Pinecone 完全托管，零基础设施管理',
    takeaway2: 'Weaviate 提供内置向量化和 ML 模块',
    takeaway3: 'Milvus 是开源的，具有企业级可扩展性',
    takeaway4: '三者都支持十亿级向量操作',
    takeaway5: 'Pinecone 拥有最简单的入门体验',
    takeaway6: 'Milvus 提供最灵活的部署选项',
    
    whatIsPineconeTitle: '什么是 Pinecone？',
    whatIsPineconeContent: 'Pinecone 是一个专为机器学习应用设计的完全托管向量数据库。成立于 2019 年，它提供了一个无服务器向量数据库，自动处理基础设施、扩展和维护。Pinecone 针对高性能向量搜索和低延迟进行了优化，非常适合生产 AI 应用。',
    
    whatIsWeaviateTitle: '什么是 Weaviate？',
    whatIsWeaviateContent: 'Weaviate 是一个开源向量数据库，结合了向量搜索和传统关键词搜索。2019 年发布，它包含内置的 ML 模块用于向量化，支持多种数据类型，并提供自托管和托管云选项。Weaviate 在语义搜索、RAG 和知识图谱方面表现出色。',
    
    whatIsMilvusTitle: '什么是 Milvus？',
    whatIsMilvusContent: 'Milvus 是一个专为可扩展相似性搜索构建的开源向量数据库。由 Zilliz 于 2019 年创建，它支持大规模部署（数十亿向量），并提供从本地开发到分布式集群的各种部署模式。Milvus 为需要高吞吐量的企业级 AI 应用而设计。',
    
    performanceTitle: '核心对比',
    performanceIntro: '比较关键能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '功能的并排比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '基本使用模式：',
    
    pineconeExampleTitle: 'Pinecone 示例',
    weaviateExampleTitle: 'Weaviate 示例',
    milvusExampleTitle: 'Milvus 示例',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '部署和基础设施：',
    
    useCasesTitle: '最佳用例',
    pineconeBestFor: 'Pinecone 最适合：',
    weaviateBestFor: 'Weaviate 最适合：',
    milvusBestFor: 'Milvus 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Pinecone、Weaviate 和 Milvus 各自服务于不同的需求。Pinecone 适合希望完全托管简单性和最小运营的团队。Weaviate 完美适合需要混合搜索、内置 ML 功能和灵活部署的应用。Milvus 是需要最大控制和可扩展性的大规模、开源部署的选择。你的选择取决于团队规模、技术要求和运营偏好。',
    
    faq1q: '哪个最容易上手？',
    faq1a: '由于其完全托管的特性，Pinecone 最容易上手。你可以在几分钟内创建索引，无需基础设施设置。Weaviate Cloud 也提供简单设置，而 Milvus 需要更多初始配置但提供全面的文档。',
    
    faq2q: '哪个能处理最大规模？',
    faq2a: 'Milvus 和 Pinecone 都能高效处理十亿级向量。Milvus 在分布式部署中已经测试过数百亿向量。Pinecone 在云中自动扩展。Weaviate 也能很好扩展，但通常用于中小型部署。',
    
    faq3q: '定价如何？',
    faq3a: 'Pinecone 和 Weaviate Cloud 使用基于消费的定价。Pinecone 按向量和查询收费，Weaviate Cloud 有存储和计算成本。Milvus 是免费和开源的，成本来自你自己的基础设施。对于大规模部署，自托管的 Milvus 可能更具成本效益。',
    
    faq4q: '哪个搜索性能最好？',
    faq4a: '三者都提供出色的搜索性能，典型查询延迟在 50ms 以下。Pinecone 针对低延迟生产工作负载进行了优化。Weaviate 提供结合向量和关键词的混合搜索。Milvus 提供各种索引类型（IVF、HNSW 等）用于性能调优。',
    
    faq5q: '我可以在它们之间迁移吗？',
    faq5a: '是的，迁移是可能的但需要数据转换。三者都支持标准向量格式。LangChain 和 LlamaIndex 等工具提供了使切换更容易的抽象。迁移时需要计划一些开发工作。',
    
    faq6q: '哪个支持元数据过滤？',
    faq6a: '三者都支持元数据过滤。Pinecone 提供强大的过滤功能，支持范围和精确匹配。Weaviate 具有 GraphQL 类语法的丰富过滤。Milvus 支持各种数据类型和操作符的标量过滤。',
    
    faq7q: '安全性和合规性如何？',
    faq7a: 'Pinecone 提供 SOC 2 Type II 合规性和企业安全功能。Weaviate 支持 RBAC 和加密。Milvus 提供身份验证和 TLS 加密。三者都可以配置以满足企业安全要求。',
    
    faq8q: '哪个社区支持更好？',
    faq8a: 'Milvus 拥有庞大的开源社区，GitHub 讨论活跃。Weaviate 也有强大的社区参与和广泛的文档。Pinecone 社区较小但响应迅速，官方支持优秀。三者都有活跃的 Slack/Discord 社区。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PineconeVsWeaviateVsMilvus({ lang }: { lang: string }) {
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

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
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

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsPineconeTitle}</h3>
      <p style={pStyle}>{ct.whatIsPineconeContent}</p>

      <h3 style={h3Style}>{ct.whatIsWeaviateTitle}</h3>
      <p style={pStyle}>{ct.whatIsWeaviateContent}</p>

      <h3 style={h3Style}>{ct.whatIsMilvusTitle}</h3>
      <p style={pStyle}>{ct.whatIsMilvusContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Pinecone</th>
              <th style={thStyle}>Weaviate</th>
              <th style={thStyle}>Milvus</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '部署类型' : 'Deployment', isZh ? '完全托管' : 'Fully managed', isZh ? '托管/自托管' : 'Managed/Self-hosted', isZh ? '自托管' : 'Self-hosted'],
              [isZh ? '开源' : 'Open Source', isZh ? '否' : 'No', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '最大规模' : 'Max Scale', '10B+ vectors', '10B+ vectors', '100B+ vectors'],
              [isZh ? '查询延迟' : 'Query Latency', '<10ms (p99)', '<50ms', '<50ms'],
              [isZh ? '内置向量化' : 'Built-in Vectorization', isZh ? '否' : 'No', isZh ? '是' : 'Yes', isZh ? '否' : 'No'],
              [isZh ? '混合搜索' : 'Hybrid Search', isZh ? '有限' : 'Limited', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '分布式' : 'Distributed', isZh ? '自动' : 'Automatic', isZh ? '支持' : 'Supported', isZh ? '原生支持' : 'Native'],
            ].map(([feature, pinecone, weaviate, milvus], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{pinecone}</td>
                <td style={tdStyle}>{weaviate}</td>
                <td style={tdStyle}>{milvus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Pinecone</th>
              <th style={thStyle}>Weaviate</th>
              <th style={thStyle}>Milvus</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '索引类型' : 'Index Types', 'Serverless, Pod-based', 'HNSW, Flat', 'IVF, HNSW, DiskANN, GPU'],
              [isZh ? '元数据过滤' : 'Metadata Filtering', isZh ? '强大' : 'Powerful', isZh ? '丰富' : 'Rich', isZh ? '灵活' : 'Flexible'],
              [isZh ? '实时更新' : 'Real-time Updates', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '备份恢复' : 'Backup/Restore', isZh ? '自动' : 'Automatic', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '多租户' : 'Multi-tenancy', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? 'SDK 语言' : 'SDK Languages', 'Python, JS, Go', 'Python, JS, Go, Java', 'Python, JS, Go, Java'],
              [isZh ? '监控' : 'Monitoring', isZh ? '内置仪表盘' : 'Built-in dashboard', 'Prometheus/Grafana', 'Prometheus/Grafana'],
              [isZh ? '云提供商' : 'Cloud Providers', 'AWS, GCP, Azure', 'AWS, GCP, Azure', 'AWS, GCP, Azure'],
            ].map(([cap, pinecone, weaviate, milvus], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{pinecone}</td>
                <td style={tdStyle}>{weaviate}</td>
                <td style={tdStyle}>{milvus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#06b6d4' }}>{ct.pineconeExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Pinecone: Upsert and Query
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index('my-index');

// Upsert vectors with metadata
await index.upsert([
  {
    id: 'doc1',
    values: [0.1, 0.2, 0.3, /* ... */],
    metadata: { 
      category: 'technology',
      year: 2024 
    }
  },
  {
    id: 'doc2',
    values: [0.4, 0.5, 0.6, /* ... */],
    metadata: { 
      category: 'science',
      year: 2023 
    }
  }
]);

// Query with metadata filtering
const results = await index.query({
  vector: [0.15, 0.25, 0.35, /* ... */],
  topK: 10,
  includeMetadata: true,
  filter: {
    category: { \\$eq: 'technology' },
    year: { \\$gte: 2023 }
  }
});

console.log(results.matches);`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.weaviateExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Weaviate: With Built-in Vectorization
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'https',
  host: 'your-cluster.weaviate.network',
  apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),
});

// Create a class (collection)
await client.schema.classCreator().withClass({
  class: 'Document',
  properties: [
    { name: 'title', dataType: ['text'] },
    { name: 'content', dataType: ['text'] },
  ],
  vectorizer: 'text2vec-openai', // Built-in vectorization
}).do();

// Add objects (auto-vectorized)
await client.data.creator()
  .withClassName('Document')
  .withProperties({
    title: 'AI Revolution',
    content: 'Artificial intelligence is transforming industries...'
  })
  .do();

// Hybrid search (vector + keyword)
const result = await client.graphql
  .get()
  .withClassName('Document')
  .withFields('title content _additional { certainty }')
  .withHybrid({
    query: 'machine learning applications',
    alpha: 0.5, // Balance between vector and keyword
  })
  .withLimit(10)
  .do();`}</code></pre>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{ct.milvusExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Milvus: Large-scale Vector Search
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'localhost:19530',
  token: process.env.MILVUS_TOKEN,
});

// Create collection with schema
await client.createCollection({
  collection_name: 'documents',
  fields: [
    { name: 'id', data_type: 'VarChar', max_length: 256, is_primary_key: true },
    { name: 'embedding', data_type: 'FloatVector', dim: 1536 },
    { name: 'category', data_type: 'VarChar', max_length: 100 },
  ],
});

// Create index for performance
await client.createIndex({
  collection_name: 'documents',
  field_name: 'embedding',
  index_type: 'IVF_FLAT',
  metric_type: 'COSINE',
  params: { nlist: 1024 },
});

// Insert vectors
await client.insert({
  collection_name: 'documents',
  data: [
    { id: 'doc1', embedding: [0.1, 0.2, /* ... */], category: 'tech' },
    { id: 'doc2', embedding: [0.3, 0.4, /* ... */], category: 'science' },
  ],
});

// Search with metadata filtering
const results = await client.search({
  collection_name: 'documents',
  vector: [0.15, 0.25, /* ... */],
  top_k: 10,
  filter: 'category == "tech"',
  params: { nprobe: 16 },
});`}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #06b6d4' }}>
          <strong style={{ color: '#06b6d4' }}>Pinecone</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '完全托管云服务，支持 Serverless 和 Pod-based 模式。无需基础设施管理，自动扩展和备份。提供 AWS、GCP、Azure 多区域部署。' : 'Fully managed cloud service with Serverless and Pod-based modes. No infrastructure management, automatic scaling and backup. Multi-region deployment on AWS, GCP, Azure.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Weaviate</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '灵活部署选项：Weaviate Cloud（托管）、Docker、Kubernetes。支持混合云和本地部署。提供 Helm charts 用于 Kubernetes 部署。' : 'Flexible deployment options: Weaviate Cloud (managed), Docker, Kubernetes. Supports hybrid cloud and on-premise. Provides Helm charts for Kubernetes deployment.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444' }}>
          <strong style={{ color: '#ef4444' }}>Milvus</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '多种部署模式：Standalone、Cluster、Zilliz Cloud（托管）。支持 Docker Compose、Kubernetes Operator。适合需要完全控制的大型企业部署。' : 'Multiple deployment modes: Standalone, Cluster, Zilliz Cloud (managed). Supports Docker Compose, Kubernetes Operator. Ideal for large enterprise deployments requiring full control.'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #06b6d4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#06b6d4' }}>{ct.pineconeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '初创公司和中小团队' : 'Startups & small teams'}</li>
            <li>{isZh ? '无运维需求' : 'Zero operations'}</li>
            <li>{isZh ? '生产就绪应用' : 'Production-ready apps'}</li>
            <li>{isZh ? 'RAG 应用' : 'RAG applications'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.weaviateBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '混合搜索需求' : 'Hybrid search needs'}</li>
            <li>{isZh ? '语义搜索' : 'Semantic search'}</li>
            <li>{isZh ? '知识图谱' : 'Knowledge graphs'}</li>
            <li>{isZh ? '多模态应用' : 'Multi-modal applications'}</li>
            <li>{isZh ? '灵活部署要求' : 'Flexible deployment'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ef4444' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ef4444' }}>{ct.milvusBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大规模部署' : 'Large-scale deployments'}</li>
            <li>{isZh ? '开源优先策略' : 'Open-source strategy'}</li>
            <li>{isZh ? '自定义基础设施' : 'Custom infrastructure'}</li>
            <li>{isZh ? '高性能要求' : 'High performance needs'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
      </div>

      {/* FAQ */}
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
