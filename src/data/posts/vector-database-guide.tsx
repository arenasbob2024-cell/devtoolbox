'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vector Database Complete Guide 2026: Pinecone vs Weaviate vs Qdrant vs ChromaDB vs pgvector',
    intro: 'Vector databases have become the backbone of modern AI applications. From retrieval-augmented generation (RAG) to semantic search, recommendation engines, and anomaly detection, vector databases store and query high-dimensional embeddings at scale. This guide compares the leading vector databases in 2026 — Pinecone, Weaviate, Qdrant, ChromaDB, pgvector, Milvus, and FAISS — covering architecture, performance, pricing, and practical code examples to help you choose the right solution.',
    tldr: 'TL;DR: For production at scale, choose Pinecone (managed) or Qdrant/Milvus (self-hosted). For prototyping, use ChromaDB. If you already use PostgreSQL, pgvector is the simplest path. Weaviate excels at hybrid search combining vectors with keyword filtering.',
    keyTakeaways: 'Key Takeaways',
    kt1: 'Vector databases store embeddings (numerical representations of data) and enable fast similarity search across millions or billions of vectors.',
    kt2: 'HNSW is the dominant indexing algorithm for most use cases, offering the best balance of speed and recall.',
    kt3: 'Managed solutions (Pinecone) minimize ops overhead; open-source options (Qdrant, Milvus, Weaviate) offer more control and lower cost at scale.',
    kt4: 'pgvector lets you add vector search to existing PostgreSQL databases without introducing new infrastructure.',
    kt5: 'For RAG pipelines, tight integration with LangChain or LlamaIndex is critical — all major vector databases support both.',
    kt6: 'Embedding model choice matters more than database choice for search quality — use text-embedding-3-large for best results.',

    whatTitle: 'What Are Vector Databases and Why They Matter',
    whatDesc: 'A vector database is a specialized storage system designed to index, store, and query high-dimensional vectors (embeddings). Traditional databases organize data in rows and columns with exact-match queries. Vector databases instead organize data by similarity in a continuous vector space, enabling "find me things similar to this" queries that power modern AI.',
    whatWhy: 'Why do we need them? Large language models and embedding models convert text, images, audio, and code into dense numerical vectors (typically 384 to 3072 dimensions). A sentence like "How to deploy a Docker container" becomes a float array like [0.023, -0.156, 0.891, ...]. Finding the most similar vectors among millions requires specialized indexing structures that traditional B-tree or hash indexes cannot efficiently handle.',
    whatGrowth: 'The vector database market has exploded since 2023 with the rise of LLM applications. Every RAG system, semantic search engine, and AI-powered recommendation system relies on vector similarity search. Understanding these tools is now essential for any developer building AI-powered features.',

    embeddingsTitle: 'How Vector Search Works: Embeddings and Similarity',
    embeddingsDesc: 'Vector search involves three stages: generating embeddings with a model, indexing them in a database for fast retrieval, and querying with a similarity metric to find nearest neighbors.',
    metricsTitle: 'Similarity Metrics Explained',
    metricCosine: 'Cosine Similarity: Measures the angle between two vectors, ignoring magnitude. Best for text embeddings where direction matters more than length. Range: -1 to 1 (1 = identical direction). Most widely used metric.',
    metricEuclidean: 'Euclidean Distance (L2): Measures straight-line distance between two points in vector space. Best when magnitude matters. Lower values = more similar. Good for image embeddings and spatial data.',
    metricDot: 'Dot Product (Inner Product): Combines direction and magnitude. Fastest to compute. Works well when vectors are already normalized. Higher values = more similar. Preferred for performance-critical applications.',
    metricChoice: 'How to choose: Use cosine similarity as the default for text. Use Euclidean for spatial or image data. Use dot product when vectors are pre-normalized and you need maximum speed.',

    compTitle: 'Vector Database Comparison Overview',
    compDB: 'Database',
    compType: 'Type',
    compLang: 'Language',
    compIndex: 'Indexing',
    compHybrid: 'Hybrid Search',
    compCloud: 'Cloud/Managed',

    pineconeTitle: 'Pinecone: Fully Managed Vector Database',
    pineconeDesc: 'Pinecone is a fully managed, serverless vector database. You do not run any infrastructure — Pinecone handles sharding, replication, scaling, and backups. It offers a simple API with namespaces for multi-tenancy. The serverless pricing model charges per read/write unit and per GB stored, making it cost-effective for bursty workloads. Pinecone supports metadata filtering, sparse-dense hybrid search, and integrates natively with all major AI frameworks.',
    pineconePros: 'Pros: Zero ops burden, automatic scaling, strong consistency, serverless pricing, excellent documentation, namespace isolation for multi-tenancy.',
    pineconeCons: 'Cons: Vendor lock-in, higher cost at very large scale (10M+ vectors), limited query flexibility compared to open-source options, US/EU/AWS regions only, no self-hosted option.',

    weaviateTitle: 'Weaviate: Hybrid Search Pioneer',
    weaviateDesc: 'Weaviate is an open-source vector database written in Go. Its standout feature is native hybrid search that combines dense vector search with BM25 keyword search in a single query. It supports multi-modal data (text, images, audio) with built-in vectorizer modules for OpenAI, Cohere, Hugging Face, and others. Weaviate also supports generative search — combining retrieval with LLM generation in one API call.',
    weaviatePros: 'Pros: True hybrid search (BM25+vector), multi-modal support, GraphQL and REST APIs, built-in vectorizers, generative search module, strong community and documentation.',
    weaviateCons: 'Cons: Higher memory usage than Qdrant/Milvus, Go codebase harder to extend for Python-heavy teams, Weaviate Cloud Services pricing can add up, complex schema management.',

    qdrantTitle: 'Qdrant: Rust-Powered Performance Leader',
    qdrantDesc: 'Qdrant is an open-source vector database built in Rust for maximum performance and memory efficiency. It supports rich payload filtering with indexed fields, scalar and product quantization for memory reduction, and distributed deployment with automatic sharding. Qdrant consistently ranks at or near the top in independent ANN benchmarks for both speed and recall.',
    qdrantPros: 'Pros: Exceptional performance and low latency, smallest memory footprint with quantization, rich payload filtering, gRPC and REST APIs, simple Docker deployment, very active development cycle.',
    qdrantCons: 'Cons: Smaller community than Weaviate or Milvus, no built-in BM25 hybrid search (requires external full-text engine like Elasticsearch), Qdrant Cloud available in limited regions.',

    chromaTitle: 'ChromaDB: Lightweight and Python-Native',
    chromaDesc: 'ChromaDB is an open-source embedding database designed for simplicity and developer experience. It runs in-process with your Python application — no separate server needed for development. ChromaDB automatically handles embedding generation if you provide documents instead of vectors. It is the most popular choice for prototyping RAG applications, tutorials, and local development.',
    chromaPros: 'Pros: Simplest API of any vector database, runs embedded in Python (zero config), auto-embeds documents, great for prototyping, seamless LangChain/LlamaIndex integration.',
    chromaCons: 'Cons: Not designed for production scale (struggles above 1M vectors), limited distributed capabilities, fewer indexing options, no enterprise features like RBAC or audit logs.',

    pgvectorTitle: 'pgvector: Vector Search in PostgreSQL',
    pgvectorDesc: 'pgvector is a PostgreSQL extension that adds vector similarity search to your existing Postgres database. If your application already uses PostgreSQL, pgvector eliminates the need for a separate vector database entirely. It supports IVFFlat and HNSW indexes, and you can combine vector similarity with standard SQL WHERE clauses, JOINs, and transactions in a single query.',
    pgvectorPros: 'Pros: No new infrastructure needed, familiar SQL interface, ACID transactions, combine vector search with relational queries and JOINs, mature PostgreSQL ecosystem and tooling.',
    pgvectorCons: 'Cons: Slower than purpose-built vector databases at scale (5M+ vectors), limited to PostgreSQL, fewer advanced features (no built-in quantization), HNSW index build can be slow on large datasets.',

    milvusTitle: 'Milvus: Enterprise-Scale Open Source',
    milvusDesc: 'Milvus is an open-source vector database designed for billion-scale similarity search. Backed by Zilliz, it features a cloud-native distributed architecture with separate storage and compute layers, GPU acceleration through NVIDIA partnership, and support for multiple index types including DiskANN for datasets larger than RAM. Zilliz Cloud offers a fully managed version.',
    milvusPros: 'Pros: Billion-scale production-proven, GPU acceleration (NVIDIA RAFT), multiple index types including DiskANN, strong enterprise features, active CNCF project, hybrid sparse-dense search.',
    milvusCons: 'Cons: Complex deployment stack (requires etcd, MinIO, Pulsar for distributed mode), steep learning curve, heavy resource requirements even for small datasets, API can be verbose.',

    faissTitle: 'FAISS: Meta AI Research Library',
    faissDesc: 'FAISS (Facebook AI Similarity Search) is not a database but a library for efficient similarity search and clustering of dense vectors. It provides the core algorithms (HNSW, IVF, PQ, ScaNN) that many vector databases use internally. Use FAISS directly when you need maximum control over indexing, when building a custom solution, or when you need GPU-accelerated search without database overhead.',

    indexTitle: 'Indexing Algorithms Deep Dive',
    indexDesc: 'The indexing algorithm determines how vectors are organized for fast approximate nearest neighbor (ANN) retrieval. The choice directly impacts query latency, memory usage, recall (accuracy), and build time.',
    hnswDesc: 'HNSW (Hierarchical Navigable Small World): The most popular algorithm in production. Builds a multi-layer proximity graph where each node connects to nearby neighbors. Offers excellent recall (>99%) with sub-millisecond queries. Trade-off: requires the full graph in RAM, so memory usage is high.',
    ivfDesc: 'IVF (Inverted File Index): Partitions vectors into clusters using k-means. At query time, only the nearest clusters (nprobe) are searched. Good for large datasets where you can tolerate slightly lower recall for significantly faster speed and much lower memory usage.',
    pqDesc: 'PQ (Product Quantization): Compresses vectors by splitting them into sub-vectors and quantizing each to a codebook entry. Achieves 8-32x memory compression. Often combined with IVF (IVF-PQ) for billion-scale deployments. Trade-off: noticeable recall loss, especially on smaller datasets.',
    scannDesc: 'ScaNN (Scalable Nearest Neighbors): Developed by Google, combines tree-based partitioning with anisotropic vector quantization optimized for maximum inner product search. Achieves excellent recall-vs-speed trade-offs. Used internally at Google Search and YouTube.',

    embModelTitle: 'Embedding Models for Vector Databases',
    embModelDesc: 'The embedding model you choose directly impacts search quality — often more than the database itself. Here are the leading models in 2026 ranked by quality on the MTEB benchmark:',

    useCaseTitle: 'Use Cases for Vector Databases',
    ragTitle: 'RAG (Retrieval-Augmented Generation)',
    ragDesc: 'The most common use case in 2026. Store document chunks as vectors. When a user asks a question, retrieve the most relevant chunks and feed them to an LLM as context. This grounds the LLM response in your actual data and dramatically reduces hallucination. Every enterprise chatbot, knowledge base assistant, and document Q&A system uses this pattern.',
    semanticTitle: 'Semantic Search',
    semanticDesc: 'Go beyond keyword matching to search by meaning. A query for "how to fix a broken pipe" returns both plumbing articles AND Linux socket error guides because the embeddings capture semantic relationships. E-commerce, documentation sites, and support ticket systems all benefit from semantic search.',
    recsTitle: 'Recommendation Systems',
    recsDesc: 'Represent users and items as vectors in the same embedding space. Find similar items by nearest-neighbor search. Combine with collaborative filtering signals stored as metadata for hybrid recommendations that are both content-aware and behavior-aware.',
    anomalyTitle: 'Anomaly Detection',
    anomalyDesc: 'Embed normal behavior patterns as vectors. New observations far from any cluster in the vector space indicate anomalies. Used in production for fraud detection, network intrusion detection, manufacturing quality control, and medical imaging analysis.',

    selfHostedTitle: 'Self-Hosted vs Managed: Decision Guide',
    selfHostedDesc: 'The build vs buy decision depends on your team size, operational maturity, data sovereignty requirements, and scale. Here is a practical comparison to help you decide:',

    perfTitle: 'Performance Benchmarks (2026)',
    perfDesc: 'Based on the ann-benchmarks project and independent testing with 1M vectors (768 dimensions, HNSW index, recall@10 > 0.95). Results vary by hardware — these numbers use a 4-core, 16GB RAM server:',

    integrationTitle: 'Framework Integration: LangChain, LlamaIndex, Haystack',
    integrationDesc: 'All major vector databases integrate with the three dominant AI/LLM orchestration frameworks. Here are unified examples showing how each database plugs into LangChain — the most popular framework:',

    costTitle: 'Cost Analysis and Pricing Comparison',
    costDesc: 'Monthly cost estimate for 1M vectors (768 dimensions) with 100 queries per second sustained. Prices as of early 2026:',
    costDB: 'Solution',
    costManaged: 'Managed Cost',
    costSelfHosted: 'Self-Hosted Cost',
    costNotes: 'Notes',

    migrationTitle: 'Migration Strategies Between Vector Databases',
    migrationDesc: 'Moving between vector databases requires careful planning. The general approach follows five steps:',
    migStep1: '1. Export: Read all vectors and metadata from the source database in batches (typically 1000-5000 vectors per batch).',
    migStep2: '2. Transform: Adapt the data format to the target schema — field names, metadata structure, ID format, and vector normalization if metrics differ.',
    migStep3: '3. Load: Batch-insert vectors into the target database. Build indexes after bulk load for faster import.',
    migStep4: '4. Validate: Run a test query suite against both databases and compare recall@k to ensure search quality parity.',
    migStep5: '5. Switch: Use a feature flag or traffic split to gradually route queries to the new database. Monitor latency, recall, and error rates.',
    migDualWrite: 'For zero-downtime migration, implement a dual-write pattern: write new vectors to both databases during the transition period, then cut over reads once validation passes.',

    notUseTitle: 'When NOT to Use a Vector Database',
    notUseDesc: 'Vector databases are powerful but not always the right choice. Avoid them in these scenarios:',
    notUse1: 'Exact match only: If you only need precise keyword or ID lookups, a traditional database with full-text search (PostgreSQL, Elasticsearch) is simpler and faster.',
    notUse2: 'Small datasets under 10K items: For tiny datasets, brute-force cosine similarity in NumPy or a simple SQL query is often fast enough without the overhead of a vector database.',
    notUse3: 'Structured data queries: If your queries are primarily filtering, sorting, and aggregating structured fields, a relational database or data warehouse is more appropriate.',
    notUse4: 'Real-time streaming: Vector databases are optimized for batch-insert and query workloads, not high-frequency streaming updates. Use a streaming platform with periodic batch updates instead.',
    notUse5: 'When explainability is required: Vector similarity search is a black box — you cannot easily explain why two items are similar. If audit trails matter, consider hybrid approaches.',

    benchTitle: 'How to Benchmark Your Vector Database',
    benchDesc: 'Do not rely solely on published benchmarks — test with your actual data and query patterns. Here is a systematic approach:',

    chunkTitle: 'Document Chunking Strategies for Vector Databases',
    chunkDesc: 'How you split documents into chunks before embedding dramatically affects retrieval quality. There is no universal best strategy — it depends on your data and use case. Here are the four main approaches:',
    chunkFixed: 'Fixed-Size Chunking: Split text every N tokens (e.g., 512 tokens) with overlap (e.g., 50 tokens). Simplest to implement. Works well for uniform content like documentation and articles. Use this as your starting point.',
    chunkSentence: 'Sentence-Based Chunking: Split on sentence boundaries. Preserves semantic coherence within each chunk. Better than fixed-size for conversational or narrative content. Requires sentence detection (spaCy, NLTK).',
    chunkSemantic: 'Semantic Chunking: Use an embedding model to detect topic shifts and split at natural boundaries. Produces the highest quality chunks but is slower and more complex. LangChain and LlamaIndex both offer semantic chunkers.',
    chunkParent: 'Parent-Child Chunking: Index small chunks (sentences) for precise retrieval, but return the parent chunk (paragraph/section) for context. Gives the best of both worlds: precise matching with sufficient context for the LLM.',
    chunkBest: 'Best practices: Start with 512 tokens and 10-20% overlap. Test retrieval quality with your actual queries. Smaller chunks improve precision but may lose context. Larger chunks preserve context but reduce precision.',

    monitorTitle: 'Monitoring Vector Databases in Production',
    monitorDesc: 'Vector databases require specific monitoring beyond standard database metrics. Track these key indicators:',
    monitorLatency: 'Query Latency: Track p50, p95, and p99 latency. Set alerts if p99 exceeds your SLA (typically 50-100ms for user-facing search). Latency increases as collections grow — plan for index maintenance.',
    monitorRecall: 'Recall Drift: Periodically evaluate recall@k against a golden test set. If recall drops below your threshold (e.g., 95%), you may need to re-tune index parameters or re-build the index.',
    monitorMemory: 'Memory Usage: HNSW indexes live in RAM. Monitor memory consumption and set alerts before you hit capacity. Plan for 3-5 GB per million 768-dimension vectors with HNSW.',
    monitorIndex: 'Index Health: Monitor index build progress after bulk inserts, segment count in Milvus, and compaction status. Fragmented indexes degrade performance over time.',

    decisionTitle: 'Decision Flowchart: Which Vector Database Should You Choose?',
    decisionDesc: 'Use this decision tree to narrow down your choice quickly based on your primary constraints:',
    decisionManaged: 'If you want zero infrastructure management and fastest time-to-production: Choose Pinecone. It is the gold standard for managed vector search with serverless pricing.',
    decisionHybrid: 'If you need combined keyword + vector search in one query: Choose Weaviate. Its native BM25+vector hybrid search is unmatched.',
    decisionPerf: 'If raw performance and memory efficiency are your top priorities: Choose Qdrant. Written in Rust, it consistently wins ANN benchmarks.',
    decisionScale: 'If you need billion-scale with GPU acceleration: Choose Milvus. Its distributed architecture and NVIDIA partnership handle massive datasets.',
    decisionPg: 'If you already use PostgreSQL and want to add vector search: Choose pgvector. Zero new infrastructure, familiar SQL interface.',
    decisionProto: 'If you are prototyping or building a tutorial: Choose ChromaDB. Three lines of Python to get started.',

    quickStartTitle: 'Quick Start: Your First Vector Search in 5 Minutes',
    quickStartDesc: 'Here is the fastest path from zero to working vector search using ChromaDB and OpenAI embeddings. This pattern works for prototyping any RAG or semantic search application:',

    quantTitle: 'Quantization: Reducing Memory Usage',
    quantDesc: 'Quantization compresses vectors to use less memory while preserving search quality. This is critical for large-scale deployments where storing millions of full-precision vectors would be prohibitively expensive.',
    quantScalar: 'Scalar Quantization: Converts float32 vectors to int8, reducing memory by 4x with minimal recall loss (typically less than 1%). Supported by Qdrant and Milvus.',
    quantProduct: 'Product Quantization (PQ): Splits each vector into sub-vectors and replaces each with a codebook index. Achieves 8-32x compression. Used by FAISS and Milvus for billion-scale deployments.',
    quantBinary: 'Binary Quantization: Converts each dimension to a single bit (positive=1, negative=0). Extreme 32x compression but noticeable recall loss. Best used as a first-pass filter with re-ranking.',

    prodTipsTitle: 'Production Best Practices',
    prodTip1: 'Choose your embedding model first, database second. The embedding model has a larger impact on search quality than the database choice. Benchmark with your actual data.',
    prodTip2: 'Always test recall@k on your data before going to production. Create a golden test set of query-document pairs and measure recall at k=5, k=10, and k=20.',
    prodTip3: 'Use metadata filtering to reduce the search space. Filtering before vector search (pre-filtering) is faster than filtering after (post-filtering) for most databases.',
    prodTip4: 'Implement chunking carefully for RAG. Chunk size (256-1024 tokens), overlap (10-20%), and chunking strategy (sentence, paragraph, semantic) dramatically affect retrieval quality.',
    prodTip5: 'Monitor your vector database in production. Track p99 latency, recall degradation over time, index size growth, and memory usage. Set alerts for latency spikes.',
    prodTip6: 'Plan for embedding model upgrades. When you switch to a new embedding model, all vectors must be re-embedded. Design your pipeline to support batch re-indexing.',

    faq1q: 'What is a vector database and how is it different from a traditional database?',
    faq1a: 'A vector database stores high-dimensional numerical vectors (embeddings) and enables similarity-based queries using distance metrics like cosine similarity. Traditional databases use exact-match lookups on structured data with SQL. Vector databases find the "most similar" items rather than exact matches, making them essential for AI applications like semantic search, RAG, and recommendations.',
    faq2q: 'Which vector database is best for RAG applications in 2026?',
    faq2a: 'For production RAG, Pinecone or Qdrant are the top choices. Pinecone offers zero-ops managed convenience with strong performance. Qdrant provides the best raw performance with open-source flexibility. For prototyping RAG pipelines, ChromaDB is the fastest to get started with — it runs embedded in Python with zero configuration.',
    faq3q: 'Can I use PostgreSQL as a vector database with pgvector?',
    faq3a: 'Yes. pgvector adds vector similarity search to PostgreSQL via a simple extension. It is ideal if you already use Postgres and need vector search without adding new infrastructure. For datasets under 5 million vectors with moderate QPS, pgvector performs well. For larger scale or higher throughput, consider a dedicated vector database like Qdrant or Milvus.',
    faq4q: 'What is HNSW and why is it the most popular indexing algorithm?',
    faq4a: 'HNSW (Hierarchical Navigable Small World) builds a multi-layer proximity graph for approximate nearest neighbor search. It offers the best balance of high recall (typically above 99 percent), low latency (sub-millisecond for most datasets), and reasonable memory usage. Almost every production vector database uses HNSW as its primary or default index type.',
    faq5q: 'How much does a vector database cost in production?',
    faq5a: 'Costs vary widely by scale and provider. Pinecone serverless starts around 70 dollars per month for 1M vectors at 100 QPS. Self-hosted Qdrant on a 40 dollar per month VPS can handle similar workloads. pgvector adds minimal cost if you already have a Postgres instance. Enterprise managed services like Zilliz Cloud or Weaviate Cloud Services range from 100 to 500 dollars per month depending on tier.',
    faq6q: 'Should I use a managed or self-hosted vector database?',
    faq6a: 'Use managed if your team is small, you want to ship fast, and your budget allows it. Self-host if you need data sovereignty, have DevOps capacity, want to minimize costs at scale, or need custom configurations. Many teams start with managed for prototyping and migrate to self-hosted as they scale and understand their workload patterns.',
    faq7q: 'What embedding model should I use with my vector database?',
    faq7a: 'For general-purpose text search, OpenAI text-embedding-3-large (3072 dimensions) or Cohere embed-v3 offer the best quality. For cost-efficient applications, text-embedding-3-small (1536 dimensions) is excellent. For fully open-source deployments, BGE-large-en-v1.5 or E5-large-v2 are strong choices. Always match embedding dimensions to your performance and cost budget.',
    faq8q: 'How do I migrate from one vector database to another?',
    faq8a: 'Export vectors and metadata in batches from the source, transform the data format to match the target schema, batch-insert into the new database, validate recall parity by running a test query suite against both databases, then gradually switch traffic using feature flags. For zero downtime, use a dual-write pattern during the transition period.',
  },
  zh: {
    title: '2026向量数据库完全指南：Pinecone vs Weaviate vs Qdrant vs ChromaDB vs pgvector',
    intro: '向量数据库已成为现代AI应用的核心基础设施。从检索增强生成（RAG）到语义搜索、推荐系统和异常检测，向量数据库大规模存储和查询高维嵌入向量。本指南比较2026年领先的向量数据库——Pinecone、Weaviate、Qdrant、ChromaDB、pgvector、Milvus和FAISS——涵盖架构、性能、定价和实际代码示例。',
    tldr: 'TL;DR：生产环境大规模使用选Pinecone（托管）或Qdrant/Milvus（自托管）。原型开发用ChromaDB。如果已经使用PostgreSQL，pgvector是最简单的路径。Weaviate擅长将向量与关键词结合的混合搜索。',
    keyTakeaways: '核心要点',
    kt1: '向量数据库存储嵌入向量（数据的数值表示），支持在数百万或数十亿向量中进行快速相似性搜索。',
    kt2: 'HNSW是大多数场景的主流索引算法，在速度和召回率之间提供最佳平衡。',
    kt3: '托管方案（Pinecone）最小化运维负担；开源方案（Qdrant、Milvus、Weaviate）提供更多控制权和更低成本。',
    kt4: 'pgvector让你无需引入新基础设施即可为现有PostgreSQL数据库添加向量搜索。',
    kt5: '对于RAG管道，与LangChain或LlamaIndex的紧密集成至关重要。',
    kt6: '嵌入模型的选择比数据库选择对搜索质量的影响更大。',
    whatTitle: '什么是向量数据库？为什么重要？',
    whatDesc: '向量数据库是一种专门的存储系统，用于索引、存储和查询高维向量（嵌入）。传统数据库以行列组织数据并使用精确匹配查询，向量数据库则在连续的向量空间中按相似性组织数据。',
    whatWhy: '大语言模型和嵌入模型将文本、图像、音频和代码转换为密集的数值向量（通常384到3072维）。在数百万向量中找到最相似的向量需要专门的索引结构。',
    whatGrowth: '自2023年LLM应用兴起以来，向量数据库市场爆发式增长。每个RAG系统、语义搜索引擎和AI推荐系统都依赖向量相似性搜索。',
    embeddingsTitle: '向量搜索工作原理：嵌入与相似性',
    embeddingsDesc: '向量搜索涉及三个阶段：用模型生成嵌入、在数据库中索引以快速检索、以及使用相似性度量查询最近邻。',
    metricsTitle: '相似性度量详解',
    metricCosine: '余弦相似度：测量两个向量之间的角度，忽略幅度。最适合文本嵌入。范围：-1到1。最常用的度量。',
    metricEuclidean: '欧氏距离（L2）：测量向量空间中两点的直线距离。当幅度重要时最佳。值越低=越相似。',
    metricDot: '点积（内积）：结合方向和幅度。计算最快。当向量已归一化时效果好。值越高=越相似。',
    metricChoice: '选择建议：文本默认用余弦相似度。空间/图像数据用欧氏距离。已归一化的向量追求速度用点积。',
    compTitle: '向量数据库综合对比',
    compDB: '数据库', compType: '类型', compLang: '语言', compIndex: '索引', compHybrid: '混合搜索', compCloud: '云/托管',
    pineconeTitle: 'Pinecone：全托管向量数据库',
    pineconeDesc: 'Pinecone是全托管无服务器向量数据库，自动处理分片、复制、扩缩和备份。按读写单元和存储量计费，适合突发负载。支持元数据过滤和稀疏-密集混合搜索。',
    pineconePros: '优点：零运维、自动扩缩、强一致性、无服务器定价、优秀文档、命名空间多租户隔离。',
    pineconeCons: '缺点：供应商锁定、大规模成本较高、查询灵活性有限、仅AWS区域、无自托管选项。',
    weaviateTitle: 'Weaviate：混合搜索先驱',
    weaviateDesc: 'Weaviate是用Go编写的开源向量数据库，原生支持将密集向量搜索与BM25关键词搜索结合的混合搜索。支持多模态数据和内置向量化模块。',
    weaviatePros: '优点：真正的混合搜索、多模态支持、GraphQL和REST API、内置向量化器、生成式搜索模块。',
    weaviateCons: '缺点：内存使用较高、Go代码库不便Python团队扩展、云服务定价复杂。',
    qdrantTitle: 'Qdrant：Rust驱动的性能王者',
    qdrantDesc: 'Qdrant是用Rust构建的开源向量数据库，追求极致性能和内存效率。支持丰富的负载过滤、标量和乘积量化、分布式自动分片。在独立基准测试中始终名列前茅。',
    qdrantPros: '优点：卓越性能和低延迟、量化后最小内存占用、丰富的负载过滤、gRPC和REST API、简单Docker部署。',
    qdrantCons: '缺点：社区较小、无内置BM25混合搜索、云服务区域有限。',
    chromaTitle: 'ChromaDB：轻量Python原生',
    chromaDesc: 'ChromaDB是为简洁和开发体验设计的开源嵌入数据库，可在Python进程内运行，是RAG原型开发的首选。',
    chromaPros: '优点：最简API、Python内嵌运行零配置、自动文档嵌入、原型开发极快。',
    chromaCons: '缺点：不适合生产规模（百万以上向量吃力）、分布式能力有限、无企业功能。',
    pgvectorTitle: 'pgvector：PostgreSQL中的向量搜索',
    pgvectorDesc: 'pgvector是PostgreSQL扩展，为现有Postgres数据库添加向量相似性搜索。支持IVFFlat和HNSW索引，可在单条SQL中结合向量相似性与WHERE、JOIN。',
    pgvectorPros: '优点：无需新基础设施、SQL接口、ACID事务、与关系查询和JOIN结合。',
    pgvectorCons: '缺点：大规模下比专用向量数据库慢、仅限PostgreSQL、无内置量化、索引构建可能很慢。',
    milvusTitle: 'Milvus：企业级开源方案',
    milvusDesc: 'Milvus是为十亿级相似性搜索设计的开源向量数据库，云原生分布式架构，支持GPU加速和DiskANN。',
    milvusPros: '优点：十亿级验证、GPU加速、多索引类型含DiskANN、企业特性、CNCF项目。',
    milvusCons: '缺点：部署复杂（需etcd/MinIO/Pulsar）、学习曲线陡、小数据集资源需求大。',
    faissTitle: 'FAISS：Meta AI研究库',
    faissDesc: 'FAISS不是数据库而是高效相似性搜索库，提供许多向量数据库内部使用的核心算法。需要最大控制权时直接使用。',
    indexTitle: '索引算法深度解析',
    indexDesc: '索引算法决定向量如何组织以实现快速近似最近邻（ANN）检索，直接影响查询延迟、内存使用、召回率和构建时间。',
    hnswDesc: 'HNSW：生产环境最流行。构建多层近邻图，召回率>99%，亚毫秒查询。权衡：需要全图在内存中。',
    ivfDesc: 'IVF：用k-means将向量分区为簇，查询时只搜索最近的簇。适合大数据集容忍略低召回率换取更快速度。',
    pqDesc: 'PQ：通过分割和量化子向量压缩向量，内存减少8-32倍。常与IVF组合用于十亿级部署。权衡：明显的召回率下降。',
    scannDesc: 'ScaNN：Google开发，结合树分区和各向异性量化，在召回率和速度之间有出色权衡。Google内部生产使用。',
    embModelTitle: '向量数据库的嵌入模型选择',
    embModelDesc: '嵌入模型的选择直接影响搜索质量——往往比数据库本身影响更大。以下是2026年领先模型：',
    useCaseTitle: '向量数据库应用场景',
    ragTitle: 'RAG（检索增强生成）',
    ragDesc: '2026年最常见的应用场景。将文档块存储为向量，用户提问时检索最相关的块作为LLM上下文，大幅减少幻觉。每个企业聊天机器人和文档问答系统都使用此模式。',
    semanticTitle: '语义搜索',
    semanticDesc: '超越关键词匹配，按语义搜索。嵌入捕获语义关系，电商、文档站和工单系统都受益于语义搜索。',
    recsTitle: '推荐系统',
    recsDesc: '将用户和物品表示为同一嵌入空间的向量，通过最近邻搜索找相似物品，结合协同过滤信号做混合推荐。',
    anomalyTitle: '异常检测',
    anomalyDesc: '将正常行为嵌入为向量，远离任何簇的新观察表示异常。用于欺诈检测、入侵检测和质量控制。',
    selfHostedTitle: '自托管 vs 托管：决策指南',
    selfHostedDesc: '构建还是购买取决于团队规模、运维成熟度、数据主权需求和规模。',
    perfTitle: '性能基准（2026）',
    perfDesc: '基于ann-benchmarks和独立测试，1M向量（768维，HNSW索引，recall@10 > 0.95），4核16GB服务器：',
    integrationTitle: '框架集成：LangChain、LlamaIndex、Haystack',
    integrationDesc: '所有主流向量数据库都与三大AI/LLM编排框架集成。以下展示各数据库如何接入LangChain：',
    costTitle: '成本分析与定价对比',
    costDesc: '1M向量（768维）100 QPS持续负载的月成本估算（2026年初价格）：',
    costDB: '方案', costManaged: '托管成本', costSelfHosted: '自托管成本', costNotes: '备注',
    migrationTitle: '向量数据库间迁移策略',
    migrationDesc: '在向量数据库之间迁移需要仔细规划，通用方法分五步：',
    migStep1: '1. 导出：分批从源数据库读取所有向量和元数据（通常每批1000-5000个向量）。',
    migStep2: '2. 转换：调整数据格式以匹配目标模式——字段名、元数据结构、ID格式。',
    migStep3: '3. 加载：批量插入向量到目标数据库，批量导入后再建索引更快。',
    migStep4: '4. 验证：对两个数据库运行测试查询集，比较recall@k确保搜索质量一致。',
    migStep5: '5. 切换：使用特性标志逐步将查询路由到新数据库，监控延迟和错误率。',
    migDualWrite: '对于零停机迁移，实施双写模式：过渡期间新向量同时写入两个数据库，验证通过后切换读取。',
    notUseTitle: '何时不应使用向量数据库',
    notUseDesc: '向量数据库功能强大但并非总是正确选择。以下场景应避免使用：',
    notUse1: '仅需精确匹配：如果只需要精确关键词或ID查找，传统数据库加全文搜索更简单快速。',
    notUse2: '小数据集（<10K条目）：对于极小数据集，NumPy暴力余弦相似度或简单SQL查询已经足够快。',
    notUse3: '结构化数据查询：如果查询主要是过滤、排序和聚合结构化字段，关系数据库更合适。',
    notUse4: '实时流式：向量数据库优化了批量插入和查询，不适合高频流式更新。使用流平台加定期批量更新。',
    notUse5: '需要可解释性：向量相似性搜索是黑盒——无法轻易解释为什么两个项目相似。如需审计追踪，考虑混合方案。',
    benchTitle: '如何对向量数据库进行基准测试',
    benchDesc: '不要仅依赖已发布的基准——用你的实际数据和查询模式测试。以下是系统化方法：',

    chunkTitle: '向量数据库的文档分块策略',
    chunkDesc: '嵌入前如何分割文档对检索质量有巨大影响。没有通用最佳策略——取决于数据和场景。以下是四种主要方法：',
    chunkFixed: '固定大小分块：每N个token分割（如512 tokens），带重叠（如50 tokens）。实现最简单，对文档和文章等均匀内容效果好。',
    chunkSentence: '基于句子分块：在句子边界分割。保持每个块的语义连贯性。对会话或叙事内容比固定大小更好。',
    chunkSemantic: '语义分块：用嵌入模型检测主题切换并在自然边界分割。产生最高质量的块但更慢更复杂。',
    chunkParent: '父子分块：索引小块（句子）精确检索，返回父块（段落/章节）提供上下文。兼得精确匹配和充分上下文。',
    chunkBest: '最佳实践：从512 tokens和10-20%重叠开始。用实际查询测试检索质量。小块提高精度但可能丢失上下文。大块保留上下文但降低精度。',
    monitorTitle: '生产环境监控向量数据库',
    monitorDesc: '向量数据库需要标准数据库指标之外的特定监控。跟踪以下关键指标：',
    monitorLatency: '查询延迟：跟踪p50、p95和p99延迟。如果p99超过SLA（通常50-100ms），设置告警。随集合增长延迟增加。',
    monitorRecall: '召回率漂移：定期对黄金测试集评估recall@k。如果低于阈值（如95%），可能需要重新调整索引参数。',
    monitorMemory: '内存使用：HNSW索引在RAM中。监控内存消耗，在接近容量前设置告警。每百万768维向量规划3-5 GB。',
    monitorIndex: '索引健康：监控批量插入后的索引构建进度、Milvus的段数量和压缩状态。碎片化的索引会降低性能。',

    decisionTitle: '决策流程图：该选哪个向量数据库？',
    decisionDesc: '根据你的主要约束，使用此决策树快速缩小选择范围：',
    decisionManaged: '想要零基础设施管理和最快上线速度：选Pinecone。托管向量搜索的黄金标准，无服务器定价。',
    decisionHybrid: '需要在单次查询中结合关键词+向量搜索：选Weaviate。其原生BM25+向量混合搜索无可匹敌。',
    decisionPerf: '原始性能和内存效率是首要优先级：选Qdrant。Rust编写，在ANN基准测试中持续领先。',
    decisionScale: '需要十亿级别并带GPU加速：选Milvus。分布式架构和NVIDIA合作处理海量数据集。',
    decisionPg: '已经使用PostgreSQL想添加向量搜索：选pgvector。零新基础设施，熟悉的SQL接口。',
    decisionProto: '原型开发或写教程：选ChromaDB。三行Python代码即可开始。',

    quickStartTitle: '快速开始：5分钟完成首次向量搜索',
    quickStartDesc: '使用ChromaDB和OpenAI嵌入从零到可用向量搜索的最快路径。此模式适用于任何RAG或语义搜索应用的原型开发：',

    quantTitle: '量化：降低内存使用',
    quantDesc: '量化压缩向量以使用更少内存同时保持搜索质量。对于存储数百万全精度向量成本过高的大规模部署至关重要。',
    quantScalar: '标量量化：将float32向量转换为int8，内存减少4倍，召回率损失极小（通常<1%）。Qdrant和Milvus支持。',
    quantProduct: '乘积量化（PQ）：将每个向量拆分为子向量并用码本索引替换，实现8-32倍压缩。FAISS和Milvus用于十亿级部署。',
    quantBinary: '二值量化：将每个维度转换为单个比特，极端32倍压缩但召回率明显下降。最适合作为粗筛后重排序。',

    prodTipsTitle: '生产环境最佳实践',
    prodTip1: '先选嵌入模型，再选数据库。嵌入模型对搜索质量的影响大于数据库选择。用实际数据做基准测试。',
    prodTip2: '上线前务必在你的数据上测试recall@k。创建查询-文档配对的黄金测试集，测量k=5、k=10和k=20的召回率。',
    prodTip3: '使用元数据过滤缩小搜索空间。向量搜索前过滤（预过滤）对大多数数据库来说比搜索后过滤（后过滤）更快。',
    prodTip4: '对RAG仔细实施分块策略。块大小（256-1024 tokens）、重叠（10-20%）和分块策略（句子、段落、语义）显著影响检索质量。',
    prodTip5: '在生产中监控向量数据库。跟踪p99延迟、召回率退化、索引大小增长和内存使用。为延迟尖峰设置告警。',
    prodTip6: '规划嵌入模型升级。切换到新嵌入模型时，所有向量必须重新嵌入。设计你的管道以支持批量重新索引。',

    faq1q: '什么是向量数据库？与传统数据库有何不同？',
    faq1a: '向量数据库存储高维数值向量并使用距离度量支持基于相似性的查询。传统数据库使用SQL精确匹配。向量数据库找到"最相似"的项目而非精确匹配。',
    faq2q: '2026年哪个向量数据库最适合RAG应用？',
    faq2a: '生产环境RAG推荐Pinecone或Qdrant。Pinecone提供零运维托管；Qdrant提供最佳原始性能和开源灵活性。原型开发首选ChromaDB。',
    faq3q: '可以用PostgreSQL的pgvector作为向量数据库吗？',
    faq3a: '可以。pgvector为PostgreSQL添加向量搜索扩展。500万以下向量中等QPS表现良好。更大规模建议用专用向量数据库。',
    faq4q: '什么是HNSW？为什么最流行？',
    faq4a: 'HNSW构建多层近邻图进行近似最近邻搜索，在高召回率（>99%）、低延迟（亚毫秒）和合理内存使用之间提供最佳平衡。',
    faq5q: '生产环境向量数据库成本多少？',
    faq5a: 'Pinecone无服务器1M向量约$70/月。自托管Qdrant约$40/月VPS。pgvector如已有Postgres则成本极低。企业托管$100-500/月。',
    faq6q: '应该用托管还是自托管向量数据库？',
    faq6a: '小团队快速迭代用托管，需要数据主权、有DevOps能力、想控制成本则自托管。很多团队先用托管原型，规模化后迁移到自托管。',
    faq7q: '应该用什么嵌入模型？',
    faq7a: '通用文本搜索推荐OpenAI text-embedding-3-large或Cohere embed-v3。开源方案推荐BGE-large或E5-large-v2。根据性能和成本预算匹配维度。',
    faq8q: '如何在向量数据库之间迁移？',
    faq8a: '分批导出向量和元数据，转换格式匹配目标模式，批量导入新数据库，运行测试查询验证召回率，然后用特性标志逐步切换流量。零停机使用双写模式。',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 };

export default function VectorDatabaseGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

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

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: 8, padding: 16, margin: '16px 0' }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: '8px 0 0', color: '#334155', lineHeight: 1.7 }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, margin: '16px 0' }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>{t.keyTakeaways}</p>
        <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 2, color: '#334155' }}>
          <li>{t.kt1}</li>
          <li>{t.kt2}</li>
          <li>{t.kt3}</li>
          <li>{t.kt4}</li>
          <li>{t.kt5}</li>
          <li>{t.kt6}</li>
        </ul>
      </div>

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      {/* What Are Vector Databases */}
      <h2 style={h2Style}>{t.whatTitle}</h2>
      <p style={pStyle}>{t.whatDesc}</p>
      <p style={pStyle}>{t.whatWhy}</p>
      <p style={pStyle}>{t.whatGrowth}</p>
      <pre style={codeStyle}><code>{'# Traditional DB: exact match\n' + 'SELECT * FROM products WHERE category = \'electronics\'\n\n' + '# Vector DB: similarity search\n' + '# "Find products semantically similar to this query"\n' + 'query_vector = model.encode("wireless noise-canceling headphones")\n' + 'results = collection.query(query_vector, top_k=10)\n' + '# Returns: ranked list of most semantically similar products\n' + '# Even matches "Bluetooth ANC over-ear headset" (different words, same meaning)'}</code></pre>

      {/* How Vector Search Works */}
      <h2 style={h2Style}>{t.embeddingsTitle}</h2>
      <p style={pStyle}>{t.embeddingsDesc}</p>
      <pre style={codeStyle}><code>{'# Step 1: Generate embeddings with an embedding model\n' + 'from openai import OpenAI\n' + 'client = OpenAI()\n\n' + 'text = "How to deploy a Docker container"\n' + 'response = client.embeddings.create(\n' + '    model="text-embedding-3-small",\n' + '    input=text\n' + ')\n' + 'vector = response.data[0].embedding  # [0.023, -0.156, 0.891, ...]\n' + '# Length: 1536 float values\n\n' + '# Step 2: Store vector in database with metadata\n' + '# Step 3: Query by computing similarity to find nearest neighbors'}</code></pre>

      <h3 style={h3Style}>{t.metricsTitle}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li><strong>Cosine:</strong> {t.metricCosine}</li>
        <li><strong>Euclidean (L2):</strong> {t.metricEuclidean}</li>
        <li><strong>Dot Product:</strong> {t.metricDot}</li>
      </ul>
      <p style={pStyle}>{t.metricChoice}</p>
      <pre style={codeStyle}><code>{'import numpy as np\n\n' + 'def cosine_similarity(a, b):\n' + '    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\n\n' + 'def euclidean_distance(a, b):\n' + '    return np.linalg.norm(np.array(a) - np.array(b))\n\n' + 'def dot_product(a, b):\n' + '    return np.dot(a, b)\n\n' + 'v1 = [0.1, 0.3, 0.5]\n' + 'v2 = [0.2, 0.4, 0.6]\n' + 'print(f"Cosine: {cosine_similarity(v1, v2):.4f}")    # 0.9946\n' + 'print(f"Euclidean: {euclidean_distance(v1, v2):.4f}") # 0.1732\n' + 'print(f"Dot product: {dot_product(v1, v2):.4f}")      # 0.4400'}</code></pre>

      {/* Database Comparison Table */}
      <h2 style={h2Style}>{t.compTitle}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.compDB}</th>
              <th style={thStyle}>{t.compType}</th>
              <th style={thStyle}>{t.compLang}</th>
              <th style={thStyle}>{t.compIndex}</th>
              <th style={thStyle}>{t.compHybrid}</th>
              <th style={thStyle}>{t.compCloud}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Pinecone', 'Managed SaaS', '-', 'Proprietary', 'Sparse+Dense', 'Yes (only)'],
              ['Weaviate', 'Open Source', 'Go', 'HNSW, Flat', 'Native BM25+Vector', 'Weaviate Cloud'],
              ['Qdrant', 'Open Source', 'Rust', 'HNSW', 'Payload Filtering', 'Qdrant Cloud'],
              ['ChromaDB', 'Open Source', 'Python', 'HNSW (hnswlib)', 'Metadata Filter', 'Chroma Cloud'],
              ['pgvector', 'PG Extension', 'C', 'IVFFlat, HNSW', 'SQL WHERE', 'Any Managed PG'],
              ['Milvus', 'Open Source', 'Go/C++', 'HNSW, IVF, DiskANN', 'Sparse+Dense', 'Zilliz Cloud'],
              ['FAISS', 'Library', 'C++/Python', 'HNSW, IVF, PQ', 'N/A', 'N/A'],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ ...tdStyle, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pinecone */}
      <h2 style={h2Style}>{t.pineconeTitle}</h2>
      <p style={pStyle}>{t.pineconeDesc}</p>
      <pre style={codeStyle}><code>{'# Pinecone: Serverless vector database\n' + 'from pinecone import Pinecone\n\n' + 'pc = Pinecone(api_key="YOUR_API_KEY")\n' + 'index = pc.Index("my-index")\n\n' + '# Upsert vectors with metadata\n' + 'index.upsert(vectors=[\n' + '    {"id": "doc1", "values": embedding1,\n' + '     "metadata": {"source": "wiki", "topic": "docker"}},\n' + '    {"id": "doc2", "values": embedding2,\n' + '     "metadata": {"source": "docs", "topic": "kubernetes"}},\n' + '])\n\n' + '# Query with metadata filter\n' + 'results = index.query(\n' + '    vector=query_embedding,\n' + '    top_k=5,\n' + '    filter={"source": {"$eq": "docs"}},\n' + '    include_metadata=True\n' + ')\n' + 'for match in results.matches:\n' + '    print(f"Score: {match.score:.4f}, ID: {match.id}")'}</code></pre>
      <p style={{ ...pStyle, color: '#22c55e' }}><strong>{t.pineconePros}</strong></p>
      <p style={{ ...pStyle, color: '#ef4444' }}><strong>{t.pineconeCons}</strong></p>

      {/* Weaviate */}
      <h2 style={h2Style}>{t.weaviateTitle}</h2>
      <p style={pStyle}>{t.weaviateDesc}</p>
      <pre style={codeStyle}><code>{'# Weaviate: Hybrid search (BM25 + vector)\n' + 'import weaviate\n' + 'import weaviate.classes.query as wq\n\n' + 'client = weaviate.connect_to_local()  # or connect_to_weaviate_cloud()\n' + 'collection = client.collections.get("Article")\n\n' + '# Hybrid search: combine vector similarity + keyword matching\n' + 'results = collection.query.hybrid(\n' + '    query="machine learning model deployment",\n' + '    alpha=0.75,  # 0 = pure BM25, 1 = pure vector\n' + '    limit=10,\n' + '    return_metadata=wq.MetadataQuery(score=True)\n' + ')\n' + 'for obj in results.objects:\n' + '    print(f"{obj.properties[\'title\']} — score: {obj.metadata.score:.4f}")\n\n' + 'client.close()'}</code></pre>
      <p style={{ ...pStyle, color: '#22c55e' }}><strong>{t.weaviatePros}</strong></p>
      <p style={{ ...pStyle, color: '#ef4444' }}><strong>{t.weaviateCons}</strong></p>

      {/* Qdrant */}
      <h2 style={h2Style}>{t.qdrantTitle}</h2>
      <p style={pStyle}>{t.qdrantDesc}</p>
      <pre style={codeStyle}><code>{'# Qdrant: Rust-powered high-performance vector search\n' + 'from qdrant_client import QdrantClient\n' + 'from qdrant_client.models import Distance, VectorParams, PointStruct\n\n' + 'client = QdrantClient(url="http://localhost:6333")\n\n' + '# Create collection with HNSW index\n' + 'client.create_collection(\n' + '    collection_name="documents",\n' + '    vectors_config=VectorParams(size=768, distance=Distance.COSINE)\n' + ')\n\n' + '# Upsert vectors with payload (metadata)\n' + 'client.upsert(collection_name="documents", points=[\n' + '    PointStruct(id=1, vector=emb1, payload={"title": "Docker Guide", "lang": "en"}),\n' + '    PointStruct(id=2, vector=emb2, payload={"title": "K8s Tutorial", "lang": "en"}),\n' + '])\n\n' + '# Search with payload filtering\n' + 'results = client.query_points(\n' + '    collection_name="documents",\n' + '    query=query_vector,\n' + '    query_filter={"must": [{"key": "lang", "match": {"value": "en"}}]},\n' + '    limit=5\n' + ').points'}</code></pre>
      <p style={{ ...pStyle, color: '#22c55e' }}><strong>{t.qdrantPros}</strong></p>
      <p style={{ ...pStyle, color: '#ef4444' }}><strong>{t.qdrantCons}</strong></p>

      {/* ChromaDB */}
      <h2 style={h2Style}>{t.chromaTitle}</h2>
      <p style={pStyle}>{t.chromaDesc}</p>
      <pre style={codeStyle}><code>{'# ChromaDB: Simplest vector database for prototyping\n' + 'import chromadb\n\n' + '# In-memory (dev) or persistent (production-lite)\n' + 'client = chromadb.PersistentClient(path="./chroma_db")\n\n' + 'collection = client.create_collection("my_docs")\n\n' + '# Add documents — ChromaDB auto-embeds with default model\n' + 'collection.add(\n' + '    documents=[\n' + '        "Docker is a containerization platform for packaging apps",\n' + '        "Kubernetes orchestrates containers across clusters",\n' + '        "Nginx is a high-performance web server and reverse proxy"\n' + '    ],\n' + '    ids=["doc1", "doc2", "doc3"],\n' + '    metadatas=[{"topic": "docker"}, {"topic": "k8s"}, {"topic": "nginx"}]\n' + ')\n\n' + '# Query by text (auto-embeds the query too)\n' + 'results = collection.query(\n' + '    query_texts=["container orchestration tools"],\n' + '    n_results=2\n' + ')\n' + 'print(results["documents"])  # [[doc2, doc1]]'}</code></pre>
      <p style={{ ...pStyle, color: '#22c55e' }}><strong>{t.chromaPros}</strong></p>
      <p style={{ ...pStyle, color: '#ef4444' }}><strong>{t.chromaCons}</strong></p>

      {/* pgvector */}
      <h2 style={h2Style}>{t.pgvectorTitle}</h2>
      <p style={pStyle}>{t.pgvectorDesc}</p>
      <pre style={codeStyle}><code>{'-- pgvector: Vector search inside PostgreSQL\n' + 'CREATE EXTENSION IF NOT EXISTS vector;\n\n' + 'CREATE TABLE documents (\n' + '    id SERIAL PRIMARY KEY,\n' + '    title TEXT NOT NULL,\n' + '    content TEXT,\n' + '    embedding vector(768)  -- 768-dimensional vector column\n' + ');\n\n' + '-- Create HNSW index for fast cosine search\n' + 'CREATE INDEX ON documents\n' + '    USING hnsw (embedding vector_cosine_ops)\n' + '    WITH (m = 16, ef_construction = 64);\n\n' + '-- Find 5 most similar documents with SQL filtering\n' + 'SELECT id, title,\n' + '       1 - (embedding <=> $1::vector) AS similarity\n' + 'FROM documents\n' + 'WHERE title ILIKE \'%docker%\'  -- combine with any SQL\n' + 'ORDER BY embedding <=> $1::vector\n' + 'LIMIT 5;'}</code></pre>
      <p style={{ ...pStyle, color: '#22c55e' }}><strong>{t.pgvectorPros}</strong></p>
      <p style={{ ...pStyle, color: '#ef4444' }}><strong>{t.pgvectorCons}</strong></p>

      {/* Milvus */}
      <h2 style={h2Style}>{t.milvusTitle}</h2>
      <p style={pStyle}>{t.milvusDesc}</p>
      <pre style={codeStyle}><code>{'# Milvus: Billion-scale vector search\n' + 'from pymilvus import connections, Collection, FieldSchema\n' + 'from pymilvus import CollectionSchema, DataType\n\n' + 'connections.connect("default", host="localhost", port="19530")\n\n' + 'fields = [\n' + '    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),\n' + '    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=768),\n' + '    FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=512),\n' + ']\n' + 'schema = CollectionSchema(fields, description="Document store")\n' + 'collection = Collection("documents", schema)\n\n' + '# Build HNSW index\n' + 'collection.create_index("embedding", {\n' + '    "metric_type": "COSINE",\n' + '    "index_type": "HNSW",\n' + '    "params": {"M": 16, "efConstruction": 256}\n' + '})\n' + 'collection.load()\n\n' + '# Search\n' + 'results = collection.search(\n' + '    data=[query_vector], anns_field="embedding",\n' + '    param={"metric_type": "COSINE", "params": {"ef": 64}},\n' + '    limit=5, output_fields=["title"]\n' + ')'}</code></pre>
      <p style={{ ...pStyle, color: '#22c55e' }}><strong>{t.milvusPros}</strong></p>
      <p style={{ ...pStyle, color: '#ef4444' }}><strong>{t.milvusCons}</strong></p>

      {/* FAISS */}
      <h3 style={h3Style}>{t.faissTitle}</h3>
      <p style={pStyle}>{t.faissDesc}</p>
      <pre style={codeStyle}><code>{'# FAISS: Low-level similarity search library by Meta\n' + 'import faiss\n' + 'import numpy as np\n\n' + 'dimension = 768\n' + 'num_vectors = 1_000_000\n\n' + '# Create HNSW index\n' + 'index = faiss.IndexHNSWFlat(dimension, 32)  # M=32 neighbors per layer\n' + 'index.hnsw.efConstruction = 200\n' + 'index.hnsw.efSearch = 64\n\n' + '# Add vectors (must be float32 numpy arrays)\n' + 'vectors = np.random.rand(num_vectors, dimension).astype("float32")\n' + 'faiss.normalize_L2(vectors)  # normalize for cosine similarity\n' + 'index.add(vectors)\n\n' + '# Search: find 10 nearest neighbors\n' + 'query = np.random.rand(1, dimension).astype("float32")\n' + 'faiss.normalize_L2(query)\n' + 'distances, indices = index.search(query, k=10)\n' + 'print(f"Nearest IDs: {indices[0]}, Distances: {distances[0]}")'}</code></pre>

      {/* Indexing Algorithms */}
      <h2 style={h2Style}>{t.indexTitle}</h2>
      <p style={pStyle}>{t.indexDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'HNSW', text: t.hnswDesc, color: '#3b82f6' },
          { label: 'IVF', text: t.ivfDesc, color: '#8b5cf6' },
          { label: 'PQ', text: t.pqDesc, color: '#f59e0b' },
          { label: 'ScaNN', text: t.scannDesc, color: '#10b981' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}`, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: item.color }}>{item.label}:</strong> {item.text}
          </div>
        ))}
      </div>

      {/* Embedding Models Table */}
      <h2 style={h2Style}>{t.embModelTitle}</h2>
      <p style={pStyle}>{t.embModelDesc}</p>
      <pre style={codeStyle}><code>{'# Compare embedding models on your data\n' + 'from openai import OpenAI\n' + 'import cohere\n' + 'from sentence_transformers import SentenceTransformer\n\n' + '# OpenAI (best quality, paid API)\n' + 'openai = OpenAI()\n' + 'resp = openai.embeddings.create(\n' + '    model="text-embedding-3-small", input="test query"\n' + ')\n' + 'oai_vec = resp.data[0].embedding  # 1536 dims\n\n' + '# Cohere (multilingual, paid API)\n' + 'co = cohere.Client("YOUR_API_KEY")\n' + 'resp = co.embed(\n' + '    texts=["test query"],\n' + '    model="embed-english-v3.0",\n' + '    input_type="search_query"\n' + ')\n' + 'cohere_vec = resp.embeddings[0]  # 1024 dims\n\n' + '# Open-source (free, self-hosted)\n' + 'model = SentenceTransformer("BAAI/bge-large-en-v1.5")\n' + 'oss_vec = model.encode("test query")  # 1024 dims\n\n' + 'print(f"OpenAI dims: {len(oai_vec)}")\n' + 'print(f"Cohere dims: {len(cohere_vec)}")\n' + 'print(f"BGE dims: {len(oss_vec)}")'}</code></pre>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Model</th>
              <th style={thStyle}>Dims</th>
              <th style={thStyle}>Provider</th>
              <th style={thStyle}>Best For</th>
              <th style={thStyle}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['text-embedding-3-large', '3072', 'OpenAI', 'Highest quality text', '$0.13/1M tokens'],
              ['text-embedding-3-small', '1536', 'OpenAI', 'Cost-efficient general', '$0.02/1M tokens'],
              ['embed-v3', '1024', 'Cohere', 'Multilingual (100+ langs)', '$0.10/1M tokens'],
              ['BGE-large-en-v1.5', '1024', 'BAAI', 'Best open-source English', 'Free (self-host)'],
              ['E5-large-v2', '1024', 'Microsoft', 'Strong open-source', 'Free (self-host)'],
              ['Gemini embedding', '768', 'Google', 'Multimodal (text+image)', '$0.004/1M tokens'],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ ...tdStyle, fontWeight: j === 0 ? 600 : 400, fontFamily: j === 0 ? 'monospace' : 'inherit', fontSize: j === 0 ? 13 : 14 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{t.useCaseTitle}</h2>
      <h3 style={h3Style}>{t.ragTitle}</h3>
      <p style={pStyle}>{t.ragDesc}</p>
      <pre style={codeStyle}><code>{'# Complete RAG pipeline: LangChain + Qdrant\n' + 'from langchain_openai import OpenAIEmbeddings, ChatOpenAI\n' + 'from langchain_qdrant import QdrantVectorStore\n' + 'from langchain.chains import RetrievalQA\n\n' + 'embeddings = OpenAIEmbeddings(model="text-embedding-3-small")\n' + 'vectorstore = QdrantVectorStore.from_existing_collection(\n' + '    embedding=embeddings,\n' + '    collection_name="knowledge_base",\n' + '    url="http://localhost:6333"\n' + ')\n\n' + '# Build RAG chain\n' + 'qa_chain = RetrievalQA.from_chain_type(\n' + '    llm=ChatOpenAI(model="gpt-4o"),\n' + '    retriever=vectorstore.as_retriever(search_kwargs={"k": 5}),\n' + ')\n' + 'answer = qa_chain.invoke("How do I configure Nginx reverse proxy?")\n' + 'print(answer["result"])'}</code></pre>
      <h3 style={h3Style}>{t.semanticTitle}</h3>
      <p style={pStyle}>{t.semanticDesc}</p>
      <pre style={codeStyle}><code>{'# Semantic search: Find documents by meaning, not keywords\n' + 'from qdrant_client import QdrantClient\n' + 'from openai import OpenAI\n\n' + 'openai_client = OpenAI()\n' + 'qdrant = QdrantClient(url="http://localhost:6333")\n\n' + 'def semantic_search(query: str, collection: str, top_k: int = 5):\n' + '    # Embed the query\n' + '    response = openai_client.embeddings.create(\n' + '        model="text-embedding-3-small", input=query\n' + '    )\n' + '    query_vector = response.data[0].embedding\n\n' + '    # Search by similarity\n' + '    results = qdrant.query_points(\n' + '        collection_name=collection,\n' + '        query=query_vector,\n' + '        limit=top_k\n' + '    )\n' + '    return [\n' + '        {"title": r.payload["title"], "score": r.score}\n' + '        for r in results.points\n' + '    ]\n\n' + '# Query: "fix broken pipe error"\n' + '# Returns: Linux SIGPIPE guide, plumbing repair tips, Node.js stream errors\n' + '# All semantically related despite different keywords'}</code></pre>

      <h3 style={h3Style}>{t.recsTitle}</h3>
      <p style={pStyle}>{t.recsDesc}</p>
      <pre style={codeStyle}><code>{'# Recommendation system with vector similarity\n' + '# Embed product descriptions and find similar items\n\n' + '# Given a product the user liked:\n' + 'liked_product_vector = get_embedding("Ergonomic mechanical keyboard with RGB")\n\n' + '# Find similar products\n' + 'similar = qdrant.query_points(\n' + '    collection_name="products",\n' + '    query=liked_product_vector,\n' + '    query_filter={\n' + '        "must": [{"key": "in_stock", "match": {"value": True}}],\n' + '        "must_not": [{"key": "id", "match": {"value": liked_product_id}}]\n' + '    },\n' + '    limit=10\n' + ')\n' + '# Returns: similar keyboards, ergonomic mice, desk accessories\n' + '# Items are ranked by semantic similarity to the liked product'}</code></pre>

      <h3 style={h3Style}>{t.anomalyTitle}</h3>
      <p style={pStyle}>{t.anomalyDesc}</p>
      <pre style={codeStyle}><code>{'# Anomaly detection with vector distance\n' + 'import numpy as np\n\n' + '# Embed a new transaction\n' + 'new_transaction = embed("$15,000 wire transfer to unknown account at 3AM")\n\n' + '# Search for similar past transactions\n' + 'neighbors = qdrant.query_points(\n' + '    collection_name="transactions",\n' + '    query=new_transaction,\n' + '    limit=5\n' + ')\n\n' + '# If nearest neighbors are far away, flag as anomaly\n' + 'max_score = max(r.score for r in neighbors.points)\n' + 'ANOMALY_THRESHOLD = 0.7  # cosine similarity threshold\n\n' + 'if max_score < ANOMALY_THRESHOLD:\n' + '    alert(f"Anomaly detected! Nearest similarity: {max_score:.4f}")\n' + '    # Trigger fraud review pipeline'}</code></pre>

      {/* Self-Hosted vs Managed */}
      <h2 style={h2Style}>{t.selfHostedTitle}</h2>
      <p style={pStyle}>{t.selfHostedDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Factor</th>
              <th style={thStyle}>Managed</th>
              <th style={thStyle}>Self-Hosted</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Setup Time', 'Minutes', 'Hours to days'],
              ['Ops Burden', 'None (vendor handles)', 'Monitoring, backups, upgrades'],
              ['Cost (small scale)', '$50-200/mo', '$20-60/mo (VPS)'],
              ['Cost (large scale)', '$500-5000/mo', '$200-1000/mo'],
              ['Data Sovereignty', 'Provider regions only', 'Full control, any location'],
              ['Customization', 'Limited to API options', 'Full source code access'],
              ['Auto-scaling', 'Built-in', 'Manual or K8s-based'],
              ['SLA Guarantee', 'Yes (99.9%+)', 'Self-managed uptime'],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ ...tdStyle, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Benchmarks */}
      <h2 style={h2Style}>{t.perfTitle}</h2>
      <p style={pStyle}>{t.perfDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Database</th>
              <th style={thStyle}>p99 Latency</th>
              <th style={thStyle}>QPS</th>
              <th style={thStyle}>Memory (1M vec)</th>
              <th style={thStyle}>Index Build</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>FAISS (library)</td>
              <td style={tdStyle}>~1ms</td>
              <td style={tdStyle}>~12,000</td>
              <td style={tdStyle}>~3.0 GB</td>
              <td style={tdStyle}>~50s</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Qdrant</td>
              <td style={tdStyle}>~2ms</td>
              <td style={tdStyle}>~8,500</td>
              <td style={tdStyle}>~3.2 GB</td>
              <td style={tdStyle}>~45s</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Milvus</td>
              <td style={tdStyle}>~3ms</td>
              <td style={tdStyle}>~7,200</td>
              <td style={tdStyle}>~3.8 GB</td>
              <td style={tdStyle}>~60s</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Weaviate</td>
              <td style={tdStyle}>~4ms</td>
              <td style={tdStyle}>~5,800</td>
              <td style={tdStyle}>~4.1 GB</td>
              <td style={tdStyle}>~55s</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Pinecone</td>
              <td style={tdStyle}>~5ms</td>
              <td style={tdStyle}>~6,000</td>
              <td style={tdStyle}>Managed</td>
              <td style={tdStyle}>Managed</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>pgvector (HNSW)</td>
              <td style={tdStyle}>~8ms</td>
              <td style={tdStyle}>~2,500</td>
              <td style={tdStyle}>~4.5 GB</td>
              <td style={tdStyle}>~120s</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>ChromaDB</td>
              <td style={tdStyle}>~10ms</td>
              <td style={tdStyle}>~1,800</td>
              <td style={tdStyle}>~3.5 GB</td>
              <td style={tdStyle}>~40s</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0 24px' }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          <strong>Note:</strong> These benchmarks are approximate and vary significantly with hardware, data distribution, index parameters, and filter complexity. Always benchmark with your own data and workload patterns. FAISS is a library (not a database) and lacks persistence, replication, and filtering — raw speed comparisons are not apples-to-apples.
        </p>
      </div>

      {/* Framework Integration */}
      <h2 style={h2Style}>{t.integrationTitle}</h2>
      <p style={pStyle}>{t.integrationDesc}</p>
      <pre style={codeStyle}><code>{'# LangChain unified retriever interface for all vector DBs\n\n' + '# --- Pinecone ---\n' + 'from langchain_pinecone import PineconeVectorStore\n' + 'vs = PineconeVectorStore(index_name="docs", embedding=embeddings)\n\n' + '# --- Weaviate ---\n' + 'from langchain_weaviate import WeaviateVectorStore\n' + 'vs = WeaviateVectorStore(\n' + '    client=weaviate_client, index_name="Docs", embedding=embeddings)\n\n' + '# --- Qdrant ---\n' + 'from langchain_qdrant import QdrantVectorStore\n' + 'vs = QdrantVectorStore.from_existing_collection(\n' + '    url="http://localhost:6333",\n' + '    collection_name="docs", embedding=embeddings)\n\n' + '# --- ChromaDB ---\n' + 'from langchain_chroma import Chroma\n' + 'vs = Chroma(persist_directory="./chroma", embedding_function=embeddings)\n\n' + '# --- pgvector ---\n' + 'from langchain_postgres import PGVector\n' + 'vs = PGVector(\n' + '    connection=conn_string, embeddings=embeddings,\n' + '    collection_name="docs")\n\n' + '# All use the SAME retriever interface:\n' + 'retriever = vs.as_retriever(search_kwargs={"k": 5})\n' + 'docs = retriever.invoke("How to configure CORS headers?")'}</code></pre>

      {/* LlamaIndex and Haystack examples */}
      <h3 style={h3Style}>LlamaIndex Integration</h3>
      <pre style={codeStyle}><code>{'# LlamaIndex: Alternative to LangChain for RAG\n' + 'from llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n' + 'from llama_index.vector_stores.qdrant import QdrantVectorStore\n' + 'from qdrant_client import QdrantClient\n\n' + '# Connect to Qdrant\n' + 'qdrant = QdrantClient(url="http://localhost:6333")\n' + 'vector_store = QdrantVectorStore(\n' + '    client=qdrant, collection_name="llama_docs"\n' + ')\n\n' + '# Load documents and build index\n' + 'documents = SimpleDirectoryReader("./data/").load_data()\n' + 'index = VectorStoreIndex.from_documents(\n' + '    documents, vector_store=vector_store\n' + ')\n\n' + '# Query with natural language\n' + 'query_engine = index.as_query_engine(similarity_top_k=5)\n' + 'response = query_engine.query(\n' + '    "What are the best practices for Docker networking?"\n' + ')\n' + 'print(response.response)\n' + 'print(f"Sources: {len(response.source_nodes)} chunks retrieved")'}</code></pre>

      <h3 style={h3Style}>Haystack Integration</h3>
      <pre style={codeStyle}><code>{'# Haystack: Pipeline-based approach\n' + 'from haystack_integrations.document_stores.qdrant import QdrantDocumentStore\n' + 'from haystack_integrations.components.retrievers.qdrant import QdrantEmbeddingRetriever\n' + 'from haystack.components.generators import OpenAIGenerator\n' + 'from haystack import Pipeline\n\n' + 'document_store = QdrantDocumentStore(\n' + '    url="http://localhost:6333",\n' + '    index="haystack_docs",\n' + '    embedding_dim=768\n' + ')\n\n' + 'retriever = QdrantEmbeddingRetriever(document_store=document_store)\n' + 'generator = OpenAIGenerator(model="gpt-4o")\n\n' + '# Build pipeline\n' + 'pipe = Pipeline()\n' + 'pipe.add_component("retriever", retriever)\n' + 'pipe.add_component("generator", generator)\n' + 'pipe.connect("retriever.documents", "generator.documents")\n\n' + 'result = pipe.run({"retriever": {"query_embedding": query_vec}})'}</code></pre>

      {/* Docker Self-Hosting Guide */}
      <h3 style={h3Style}>Docker Quick Deploy: Qdrant, Weaviate, Milvus</h3>
      <pre style={codeStyle}><code>{'# Deploy Qdrant with Docker (simplest)\n' + 'docker run -p 6333:6333 -p 6334:6334 \\\n' + '  -v $(pwd)/qdrant_storage:/qdrant/storage:z \\\n' + '  qdrant/qdrant:latest\n\n' + '# Deploy Weaviate with Docker Compose\n' + '# docker-compose.yml:\n' + 'services:\n' + '  weaviate:\n' + '    image: semitechnologies/weaviate:latest\n' + '    ports:\n' + '      - "8080:8080"\n' + '      - "50051:50051"\n' + '    environment:\n' + '      QUERY_DEFAULTS_LIMIT: 25\n' + '      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: "true"\n' + '      PERSISTENCE_DATA_PATH: "/var/lib/weaviate"\n' + '      DEFAULT_VECTORIZER_MODULE: "none"\n' + '      CLUSTER_HOSTNAME: "node1"\n' + '    volumes:\n' + '      - weaviate_data:/var/lib/weaviate\n\n' + '# Deploy Milvus standalone with Docker Compose\n' + '# curl -O https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh\n' + '# bash standalone_embed.sh start\n' + '# Milvus Standalone runs on port 19530'}</code></pre>

      {/* Cost Analysis */}
      <h2 style={h2Style}>{t.costTitle}</h2>
      <p style={pStyle}>{t.costDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.costDB}</th>
              <th style={thStyle}>{t.costManaged}</th>
              <th style={thStyle}>{t.costSelfHosted}</th>
              <th style={thStyle}>{t.costNotes}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Pinecone', '$70-100/mo', 'N/A', 'Serverless: pay per read/write unit'],
              ['Weaviate Cloud', '$100-300/mo', '$40-80/mo', 'Tiered: Sandbox free, Standard, Business'],
              ['Qdrant Cloud', '$65-150/mo', '$30-60/mo', 'Most affordable managed option'],
              ['Zilliz (Milvus)', '$100-400/mo', '$60-120/mo', 'GPU instances increase cost'],
              ['pgvector', 'From $15/mo*', '$0 extra', '* = managed Postgres cost (RDS, Supabase)'],
              ['ChromaDB', 'Beta pricing', '$20-40/mo', 'Primarily for dev and prototyping'],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ ...tdStyle, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When NOT to Use */}
      <h2 style={h2Style}>{t.notUseTitle}</h2>
      <p style={pStyle}>{t.notUseDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {[t.notUse1, t.notUse2, t.notUse3, t.notUse4, t.notUse5].map((item, i) => (
          <div key={i} style={{ padding: '10px 16px', background: 'rgba(239, 68, 68, 0.06)', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: '#ef4444' }}>{i + 1}.</strong> {item}
          </div>
        ))}
      </div>

      {/* Benchmarking Guide */}
      <h2 style={h2Style}>{t.benchTitle}</h2>
      <p style={pStyle}>{t.benchDesc}</p>
      <pre style={codeStyle}><code>{'# Benchmark your vector database with your actual data\n' + 'import time\n' + 'import numpy as np\n' + 'from qdrant_client import QdrantClient\n\n' + 'client = QdrantClient(url="http://localhost:6333")\n' + 'collection_name = "benchmark_test"\n\n' + '# 1. Prepare test data\n' + 'num_queries = 100\n' + 'dimension = 768\n' + 'test_queries = np.random.rand(num_queries, dimension).astype("float32")\n\n' + '# 2. Measure query latency\n' + 'latencies = []\n' + 'for query in test_queries:\n' + '    start = time.perf_counter()\n' + '    results = client.query_points(\n' + '        collection_name=collection_name,\n' + '        query=query.tolist(),\n' + '        limit=10\n' + '    )\n' + '    latency = (time.perf_counter() - start) * 1000\n' + '    latencies.append(latency)\n\n' + 'latencies.sort()\n' + 'print(f"p50 latency: {latencies[49]:.2f}ms")\n' + 'print(f"p95 latency: {latencies[94]:.2f}ms")\n' + 'print(f"p99 latency: {latencies[98]:.2f}ms")\n' + 'print(f"Mean latency: {np.mean(latencies):.2f}ms")\n\n' + '# 3. Measure throughput (QPS)\n' + 'start = time.perf_counter()\n' + 'for query in test_queries:\n' + '    client.query_points(collection_name, query=query.tolist(), limit=10)\n' + 'elapsed = time.perf_counter() - start\n' + 'qps = num_queries / elapsed\n' + 'print(f"Throughput: {qps:.0f} QPS")\n\n' + '# 4. Measure recall (requires ground truth)\n' + '# Compare approximate results vs brute-force exact search\n' + '# recall = len(set(approx_ids) & set(exact_ids)) / k'}</code></pre>

      {/* Document Chunking Strategies */}
      <h2 style={h2Style}>{t.chunkTitle}</h2>
      <p style={pStyle}>{t.chunkDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'Fixed-Size', text: t.chunkFixed, color: '#3b82f6' },
          { label: 'Sentence', text: t.chunkSentence, color: '#10b981' },
          { label: 'Semantic', text: t.chunkSemantic, color: '#8b5cf6' },
          { label: 'Parent-Child', text: t.chunkParent, color: '#f59e0b' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}`, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: item.color }}>{item.label}:</strong> {item.text}
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.chunkBest}</p>
      </div>
      <pre style={codeStyle}><code>{'# Chunking example with LangChain\n' + 'from langchain.text_splitter import (\n' + '    RecursiveCharacterTextSplitter,\n' + '    SentenceTransformersTokenTextSplitter\n' + ')\n\n' + '# Fixed-size with overlap (most common)\n' + 'splitter = RecursiveCharacterTextSplitter(\n' + '    chunk_size=512,\n' + '    chunk_overlap=50,\n' + '    separators=["\\n\\n", "\\n", ". ", " ", ""]\n' + ')\n' + 'chunks = splitter.split_text(document_text)\n\n' + '# Token-based (more precise for LLM token limits)\n' + 'token_splitter = SentenceTransformersTokenTextSplitter(\n' + '    chunk_overlap=50,\n' + '    tokens_per_chunk=256\n' + ')\n' + 'token_chunks = token_splitter.split_text(document_text)\n\n' + 'print(f"Fixed-size: {len(chunks)} chunks")\n' + 'print(f"Token-based: {len(token_chunks)} chunks")'}</code></pre>

      {/* Monitoring */}
      <h2 style={h2Style}>{t.monitorTitle}</h2>
      <p style={pStyle}>{t.monitorDesc}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li><strong>Latency:</strong> {t.monitorLatency}</li>
        <li><strong>Recall:</strong> {t.monitorRecall}</li>
        <li><strong>Memory:</strong> {t.monitorMemory}</li>
        <li><strong>Index:</strong> {t.monitorIndex}</li>
      </ul>
      <pre style={codeStyle}><code>{'# Monitoring: Qdrant collection health check\n' + 'from qdrant_client import QdrantClient\n\n' + 'client = QdrantClient(url="http://localhost:6333")\n\n' + '# Get collection info\n' + 'info = client.get_collection("documents")\n' + 'print(f"Vectors: {info.vectors_count}")\n' + 'print(f"Indexed: {info.indexed_vectors_count}")\n' + 'print(f"Points: {info.points_count}")\n' + 'print(f"Segments: {len(info.segments)}")\n' + 'print(f"Status: {info.status}")\n\n' + '# Recall test: compare approximate vs exact search\n' + 'import numpy as np\n' + 'import time\n\n' + 'test_vector = np.random.rand(768).tolist()\n' + 'start = time.time()\n' + 'approx = client.query_points("documents", query=test_vector, limit=10)\n' + 'latency_ms = (time.time() - start) * 1000\n' + 'print(f"Query latency: {latency_ms:.1f}ms")\n' + 'print(f"Results: {len(approx.points)} points returned")'}</code></pre>

      {/* Decision Flowchart */}
      <h2 style={h2Style}>{t.decisionTitle}</h2>
      <p style={pStyle}>{t.decisionDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {[
          { text: t.decisionManaged, color: '#6366f1', label: 'Pinecone' },
          { text: t.decisionHybrid, color: '#10b981', label: 'Weaviate' },
          { text: t.decisionPerf, color: '#ef4444', label: 'Qdrant' },
          { text: t.decisionScale, color: '#3b82f6', label: 'Milvus' },
          { text: t.decisionPg, color: '#8b5cf6', label: 'pgvector' },
          { text: t.decisionProto, color: '#f59e0b', label: 'ChromaDB' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}`, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: item.color }}>{item.label}:</strong> {item.text}
          </div>
        ))}
      </div>

      {/* Quick Start */}
      <h2 style={h2Style}>{t.quickStartTitle}</h2>
      <p style={pStyle}>{t.quickStartDesc}</p>
      <pre style={codeStyle}><code>{'# Quick Start: Vector search in 5 minutes\n' + '# pip install chromadb openai\n\n' + 'import chromadb\n' + 'from openai import OpenAI\n\n' + '# 1. Initialize clients\n' + 'chroma = chromadb.PersistentClient(path="./vector_db")\n' + 'openai_client = OpenAI()  # uses OPENAI_API_KEY env var\n\n' + '# 2. Create a helper to generate embeddings\n' + 'def embed(texts: list[str]) -> list[list[float]]:\n' + '    resp = openai_client.embeddings.create(\n' + '        model="text-embedding-3-small", input=texts\n' + '    )\n' + '    return [d.embedding for d in resp.data]\n\n' + '# 3. Create collection and add documents\n' + 'collection = chroma.get_or_create_collection(\n' + '    name="docs", metadata={"hnsw:space": "cosine"}\n' + ')\n\n' + 'documents = [\n' + '    "Docker containers package applications with dependencies",\n' + '    "Kubernetes orchestrates container deployment at scale",\n' + '    "Nginx serves as a reverse proxy and load balancer",\n' + '    "PostgreSQL is a powerful open-source relational database",\n' + '    "Redis provides in-memory caching for low-latency access",\n' + ']\n\n' + 'collection.add(\n' + '    ids=[f"doc_{i}" for i in range(len(documents))],\n' + '    embeddings=embed(documents),\n' + '    documents=documents,\n' + '    metadatas=[{"index": i} for i in range(len(documents))]\n' + ')\n\n' + '# 4. Query!\n' + 'query = "How do I manage containers in production?"\n' + 'results = collection.query(\n' + '    query_embeddings=embed([query]),\n' + '    n_results=3\n' + ')\n' + 'for doc, dist in zip(results["documents"][0], results["distances"][0]):\n' + '    print(f"[{1-dist:.4f}] {doc}")\n' + '# Output:\n' + '# [0.8912] Kubernetes orchestrates container deployment at scale\n' + '# [0.8234] Docker containers package applications with dependencies\n' + '# [0.6102] Nginx serves as a reverse proxy and load balancer'}</code></pre>

      {/* Quantization */}
      <h2 style={h2Style}>{t.quantTitle}</h2>
      <p style={pStyle}>{t.quantDesc}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li><strong>Scalar:</strong> {t.quantScalar}</li>
        <li><strong>Product (PQ):</strong> {t.quantProduct}</li>
        <li><strong>Binary:</strong> {t.quantBinary}</li>
      </ul>
      <pre style={codeStyle}><code>{'# Qdrant: Enable scalar quantization for 4x memory savings\n' + 'from qdrant_client.models import (\n' + '    VectorParams, Distance, ScalarQuantization,\n' + '    ScalarQuantizationConfig, ScalarType, QuantizationSearchParams\n' + ')\n\n' + 'client.create_collection(\n' + '    collection_name="docs_quantized",\n' + '    vectors_config=VectorParams(size=768, distance=Distance.COSINE),\n' + '    quantization_config=ScalarQuantization(\n' + '        scalar=ScalarQuantizationConfig(\n' + '            type=ScalarType.INT8,\n' + '            quantile=0.99,  # clip outliers\n' + '            always_ram=True  # keep quantized vectors in RAM\n' + '        )\n' + '    )\n' + ')\n\n' + '# Search with quantization (rescore from disk for accuracy)\n' + 'results = client.query_points(\n' + '    collection_name="docs_quantized",\n' + '    query=query_vector,\n' + '    search_params={"quantization": QuantizationSearchParams(\n' + '        rescore=True  # re-rank using original vectors from disk\n' + '    )},\n' + '    limit=10\n' + ')'}</code></pre>

      {/* Production Best Practices */}
      <h2 style={h2Style}>{t.prodTipsTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[t.prodTip1, t.prodTip2, t.prodTip3, t.prodTip4, t.prodTip5, t.prodTip6].map((tip, i) => (
          <div key={i} style={{ padding: '10px 16px', background: i % 2 === 0 ? 'rgba(59, 130, 246, 0.06)' : 'rgba(16, 185, 129, 0.06)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-primary)' }}>{i + 1}.</strong> {tip}
          </div>
        ))}
      </div>

      {/* Migration Strategies */}
      <h2 style={h2Style}>{t.migrationTitle}</h2>
      <p style={pStyle}>{t.migrationDesc}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li><strong>{t.migStep1}</strong></li>
        <li><strong>{t.migStep2}</strong></li>
        <li><strong>{t.migStep3}</strong></li>
        <li><strong>{t.migStep4}</strong></li>
        <li><strong>{t.migStep5}</strong></li>
      </ul>
      <p style={pStyle}>{t.migDualWrite}</p>
      <pre style={codeStyle}><code>{'# Migration example: ChromaDB -> Qdrant (zero downtime)\n' + 'import chromadb\n' + 'from qdrant_client import QdrantClient\n' + 'from qdrant_client.models import PointStruct, VectorParams, Distance\n\n' + 'chroma = chromadb.PersistentClient(path="./chroma_db")\n' + 'qdrant = QdrantClient(url="http://localhost:6333")\n\n' + '# Create target collection\n' + 'qdrant.create_collection("migrated_docs",\n' + '    vectors_config=VectorParams(size=768, distance=Distance.COSINE))\n\n' + '# Export from ChromaDB in batches\n' + 'collection = chroma.get_collection("my_docs")\n' + 'batch_size = 1000\n' + 'offset = 0\n\n' + 'while True:\n' + '    batch = collection.get(\n' + '        limit=batch_size, offset=offset,\n' + '        include=["embeddings", "metadatas", "documents"]\n' + '    )\n' + '    if not batch["ids"]:\n' + '        break\n' + '    points = [\n' + '        PointStruct(\n' + '            id=i + offset, vector=emb,\n' + '            payload={"text": doc, **(meta or {})}\n' + '        )\n' + '        for i, (emb, doc, meta) in enumerate(zip(\n' + '            batch["embeddings"], batch["documents"],\n' + '            batch["metadatas"]\n' + '        ))\n' + '    ]\n' + '    qdrant.upsert("migrated_docs", points=points)\n' + '    offset += batch_size\n' + '    print(f"Migrated {offset} vectors...")\n\n' + 'print("Migration complete. Validate recall before switching traffic.")'}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>

      <div style={{ marginBottom: 20, padding: '14px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginTop: 0, marginBottom: 8 }}>
          {t.faq1q}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{t.faq1a}</p>
      </div>

      <div style={{ marginBottom: 20, padding: '14px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginTop: 0, marginBottom: 8 }}>
          {t.faq2q}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{t.faq2a}</p>
      </div>

      <div style={{ marginBottom: 20, padding: '14px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginTop: 0, marginBottom: 8 }}>
          {t.faq3q}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{t.faq3a}</p>
      </div>

      <div style={{ marginBottom: 20, padding: '14px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginTop: 0, marginBottom: 8 }}>
          {t.faq4q}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{t.faq4a}</p>
      </div>

      <div style={{ marginBottom: 20, padding: '14px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginTop: 0, marginBottom: 8 }}>
          {t.faq5q}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{t.faq5a}</p>
      </div>

      <div style={{ marginBottom: 20, padding: '14px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginTop: 0, marginBottom: 8 }}>
          {t.faq6q}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{t.faq6a}</p>
      </div>

      <div style={{ marginBottom: 20, padding: '14px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginTop: 0, marginBottom: 8 }}>
          {t.faq7q}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{t.faq7a}</p>
      </div>

      <div style={{ marginBottom: 20, padding: '14px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginTop: 0, marginBottom: 8 }}>
          {t.faq8q}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{t.faq8a}</p>
      </div>
    </div>
  );
}
