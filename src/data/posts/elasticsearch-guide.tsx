'use client';

import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Elasticsearch Complete Guide: Full-Text Search, Query DSL, Mappings, and ELK Stack — 2026',
    description:
      'Master Elasticsearch with this comprehensive guide: core concepts (Index, Document, Shard, Replica), Query DSL (match, term, bool, aggregations), mappings, CRUD with REST API, Node.js and Python clients, Kibana, ELK Stack, performance tuning, and comparison with OpenSearch and Solr.',
  },
  zh: {
    title: 'Elasticsearch 完整指南：全文搜索、Query DSL、映射与 ELK Stack — 2026',
    description:
      '全面掌握 Elasticsearch：核心概念（索引、文档、分片、副本）、Query DSL（match、term、bool、聚合）、映射、REST API CRUD、Node.js 和 Python 客户端、Kibana、ELK Stack、性能调优，以及与 OpenSearch 和 Solr 的对比。',
  },
};

export default function ElasticsearchGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Elasticsearch and what is it used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Elasticsearch is an open-source, distributed search and analytics engine built on Apache Lucene. It is used for full-text search, log analytics, real-time application monitoring, e-commerce product search, autocomplete, and business intelligence. Its core strengths are near-real-time search, horizontal scalability across many nodes, and powerful aggregations for analytics.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between an Index, Document, and Shard in Elasticsearch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An Index is a collection of documents with similar characteristics, analogous to a database table. A Document is a JSON object stored in an index, analogous to a row in a table. A Shard is a horizontal partition of an index — Elasticsearch automatically splits large indices into shards to distribute data and query load across multiple nodes. Each shard is itself a fully functional Lucene index. Replicas are copies of shards that provide high availability and increased read throughput.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a match query and a term query?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A match query is used for full-text search on analyzed fields. The query string is analyzed (tokenized, lowercased, stemmed) before matching. It is the go-to query for user-facing search boxes. A term query finds documents that contain the exact term in a field. It is used for keyword fields, IDs, and structured data like status codes or tags. Using a term query on an analyzed text field will often return no results because the stored tokens are lowercased and the query is not.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Elasticsearch compare to a traditional SQL database?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Elasticsearch excels at full-text search, unstructured data, complex aggregations on large datasets, and horizontal scaling. SQL databases excel at strict ACID transactions, complex multi-table joins, relational integrity constraints, and structured data. Elasticsearch does not support true transactions, joins, or foreign keys. It is schema-flexible (or schema-less) and data is eventually consistent. Use Elasticsearch alongside a primary SQL or NoSQL database, not as a replacement for it.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the ELK Stack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The ELK Stack is a popular log management and analytics platform consisting of three products: Elasticsearch (storage and search), Logstash (data ingestion and transformation pipeline), and Kibana (visualization and dashboarding UI). In modern deployments the stack is often called the Elastic Stack and includes Beats (lightweight data shippers) and Elastic Agent. It is widely used for centralized logging, APM (application performance monitoring), security analytics (SIEM), and business intelligence.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I choose the right number of shards for an Elasticsearch index?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A commonly recommended target is 10–50 GB per shard. For a 100 GB index, use 3–5 primary shards. Avoid over-sharding: each shard consumes memory and file handles. For most indices under 10 GB, 1 primary shard is sufficient. Set the number of primary shards at index creation time — you cannot change it later without reindexing. You can change the number of replicas at any time. Always set at least 1 replica in production for fault tolerance.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Elasticsearch and OpenSearch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'OpenSearch is a community-driven, Apache 2.0 licensed fork of Elasticsearch 7.10 created by Amazon Web Services in 2021 after Elastic changed its license to SSPL. They are largely API-compatible at the REST level. OpenSearch is free under Apache 2.0, while newer Elasticsearch versions use the Elastic License 2.0 or AGPL. OpenSearch is the default search engine for Amazon OpenSearch Service. Both support the same Query DSL, mappings, and aggregations from Elasticsearch 7.x.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I improve Elasticsearch query performance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Key performance tips: use filter context instead of query context for exact-match conditions (filters are cached); avoid wildcard queries on high-cardinality fields; use keyword fields for exact matches and text fields for full-text search; size your heap to no more than half of available RAM; use index templates and ILM policies to manage large data volumes; prefer bulk indexing over single-document indexing; set refresh_interval to 30s or higher for write-heavy indices; and use search_after for deep pagination instead of from/size.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/elasticsearch-guide" />

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
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', fontSize: '1rem' }}>
          TL;DR
        </p>
        <p style={{ margin: 0, lineHeight: 1.7 }}>
          <strong>Elasticsearch</strong> is a distributed, RESTful search and analytics engine built on
          Apache Lucene. It stores data as JSON documents in <strong>indices</strong>, distributes them
          across <strong>shards</strong>, and queries them with a powerful <strong>Query DSL</strong>.
          Use <strong>match</strong> queries for full-text search, <strong>term</strong> queries for
          exact matches, and <strong>bool</strong> queries to combine conditions. Install locally with
          Docker in minutes. Connect from Node.js with{' '}
          <code>@elastic/elasticsearch</code> or from Python with <code>elasticsearch-py</code>. For
          log analytics, use the full <strong>ELK Stack</strong>: Elasticsearch + Logstash + Kibana.
          In production, run at least 3 nodes with 1 replica per shard, set your JVM heap to no more
          than half of available RAM, and use{' '}
          <strong>ILM (Index Lifecycle Management)</strong> to automate data retention. Use our{' '}
          <Link href="https://viadreams.cc/en/tools/json-formatter" style={{ color: '#0284c7' }}>
            JSON Formatter
          </Link>{' '}
          to validate query bodies before sending them to Elasticsearch.
        </p>
      </div>

      {/* ─────────────────────────────────────────────
          SECTION 1 — What is Elasticsearch
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        What Is Elasticsearch and When Should You Use It?
      </h2>
      <p>
        <strong>Elasticsearch</strong> is an open-source, distributed search and analytics engine built
        on top of <strong>Apache Lucene</strong>. Originally created by Shay Banon in 2010 and now
        maintained by <a href="https://elastic.co" style={{ color: '#0284c7' }}>Elastic NV</a>, it has
        become the most widely deployed search engine in the world — used by GitHub, Wikipedia,
        Netflix, Uber, Walmart, and millions of other applications.
      </p>
      <p>
        Elasticsearch stores data as structured JSON documents and indexes them in an inverted index —
        a data structure that maps every unique term to the list of documents that contain it. This is
        the same structure used by all search engines and enables extremely fast full-text search even
        across billions of documents.
      </p>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        When to Use Elasticsearch
      </h3>
      <ul style={{ lineHeight: 1.9 }}>
        <li>
          <strong>Full-text search</strong> — Product search, document search, knowledge base search
          with relevance ranking, highlighting, and fuzzy matching.
        </li>
        <li>
          <strong>Log and event analytics</strong> — Centralized logging with the ELK Stack. Ingest,
          search, and visualize application logs, access logs, and security events.
        </li>
        <li>
          <strong>E-commerce search</strong> — Product catalog search with faceted navigation,
          filters, boosting popular items, and personalized ranking.
        </li>
        <li>
          <strong>Autocomplete and suggestions</strong> — Real-time search-as-you-type using
          completion suggesters or edge n-gram tokenizers.
        </li>
        <li>
          <strong>Observability and APM</strong> — Application performance monitoring, distributed
          tracing, uptime monitoring, and infrastructure metrics.
        </li>
        <li>
          <strong>Geospatial search</strong> — Find documents near a location, within a bounding box,
          or within a polygon using Elasticsearch geo queries.
        </li>
        <li>
          <strong>Business analytics</strong> — Real-time aggregations and dashboards over large
          datasets with Kibana.
        </li>
      </ul>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        When NOT to Use Elasticsearch
      </h3>
      <ul style={{ lineHeight: 1.9 }}>
        <li>
          <strong>Primary transactional database</strong> — Elasticsearch does not support ACID
          transactions, foreign keys, or multi-document atomicity.
        </li>
        <li>
          <strong>Complex relational joins</strong> — There is no SQL-style JOIN. Model your data
          differently (denormalize) or use a relational database.
        </li>
        <li>
          <strong>Strict consistency requirements</strong> — Elasticsearch is eventually consistent by
          default. For financial systems requiring strict consistency, use PostgreSQL or a similar ACID
          database.
        </li>
        <li>
          <strong>Low-traffic simple search</strong> — For small datasets under 10,000 documents,
          PostgreSQL full-text search (tsvector) or SQLite FTS5 may be simpler and sufficient.
        </li>
      </ul>

      {/* ─────────────────────────────────────────────
          SECTION 2 — Core Concepts
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Core Concepts: Index, Document, Shard, and Replica
      </h2>
      <p>
        Understanding Elasticsearch requires mapping its concepts to familiar database terms and then
        going deeper into how they differ.
      </p>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`Elasticsearch Concepts vs Relational Database:

  Elasticsearch          SQL Database
  ─────────────────────────────────────────
  Index             ≈    Table
  Document          ≈    Row
  Field             ≈    Column
  Mapping           ≈    Schema
  Shard             ≈    Partition
  Replica           ≈    Read replica
  Node              ≈    Database server
  Cluster           ≈    Database cluster

Key differences:
  - No JOINs between indices
  - No ACID transactions
  - Schema-flexible (dynamic mappings)
  - Built-in horizontal sharding
  - Inverted index (not B-tree)`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Index
      </h3>
      <p>
        An <strong>index</strong> is a logical namespace for a collection of documents. All documents
        in an index should have a similar structure. An index has a name (lowercase), a mapping that
        defines field types, and settings that configure sharding and analysis. Think of it as a
        database table, but more flexible.
      </p>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Document
      </h3>
      <p>
        A <strong>document</strong> is the basic unit of data in Elasticsearch. It is a JSON object
        stored within an index. Each document has a unique <code>_id</code> (auto-generated or
        user-specified), a <code>_index</code> indicating where it belongs, and a <code>_source</code>{' '}
        field containing the original JSON. Documents are immutable — updating a document creates a new
        version and marks the old one for deletion.
      </p>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Shard
      </h3>
      <p>
        A <strong>shard</strong> is a horizontal partition of an index. When Elasticsearch stores
        an index, it automatically divides it into one or more shards and distributes them across
        nodes in the cluster. Each shard is itself a fully functional Lucene index. By dividing data
        into shards, Elasticsearch can store data larger than the disk space of any single node and
        parallelize queries across all shards simultaneously.
      </p>
      <p>
        The number of primary shards is fixed at index creation time. A rule of thumb is to target
        10–50 GB per shard. For a 100 GB index, 3–5 primary shards is reasonable.
      </p>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Replica
      </h3>
      <p>
        A <strong>replica shard</strong> is a copy of a primary shard. Replicas serve two purposes:
        fault tolerance (if a primary shard fails, a replica is promoted to primary) and increased
        read throughput (queries can be executed on both primary and replica shards). The number of
        replicas can be changed dynamically at any time. In production, always use at least 1 replica.
      </p>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Cluster with 3 nodes, index with 3 primary shards and 1 replica:

  Node 1            Node 2            Node 3
  ─────────────     ─────────────     ─────────────
  Primary P0        Replica R0        Primary P1
  Replica  R2       Primary P2        Replica R1

  Total shards: 6 (3 primary + 3 replica)
  If Node 1 fails: R0 on Node 2 is promoted to P0
  Cluster stays green (all shards available)`}</code></pre>

      {/* ─────────────────────────────────────────────
          SECTION 3 — vs SQL
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Elasticsearch vs Traditional SQL Databases
      </h2>
      <p>
        Elasticsearch and SQL databases are complementary, not competitors. Understanding their
        respective strengths helps you architect systems that leverage both effectively.
      </p>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Feature</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Elasticsearch</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>PostgreSQL / MySQL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Full-text search</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Excellent (inverted index, relevance scoring)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Good (tsvector, but limited ranking)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>ACID transactions</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>No</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Yes</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Complex JOINs</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>No (denormalize data)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Yes (multi-table joins)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Horizontal scaling</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Native (sharding built-in)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Requires partitioning/sharding middleware</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Aggregations/analytics</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Excellent (nested, pipeline, metric aggs)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Good (but slow on very large tables)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Schema</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Flexible (dynamic mappings)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Rigid (ALTER TABLE required)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Consistency</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Eventually consistent</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Strongly consistent</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Best for</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Search, logs, analytics</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Transactional data, reporting</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        A common architecture is to use PostgreSQL or MySQL as the <strong>source of truth</strong>{' '}
        for user data, orders, and other transactional data, and synchronize relevant fields to
        Elasticsearch for fast search. The sync can be done via application-level dual writes, change
        data capture (CDC) with Debezium, or Logstash JDBC input.
      </p>

      {/* ─────────────────────────────────────────────
          SECTION 4 — Installation
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Installing and Setting Up Elasticsearch
      </h2>
      <p>
        The fastest way to get started is with Docker. For production, use Elastic Cloud or install
        on dedicated servers.
      </p>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Option 1: Docker (Development)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Single-node Elasticsearch 8.x (security disabled for local dev)
docker run -d \\
  --name elasticsearch \\
  -p 9200:9200 \\
  -e "discovery.type=single-node" \\
  -e "xpack.security.enabled=false" \\
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \\
  docker.elastic.co/elasticsearch/elasticsearch:8.12.0

# Verify it is running
curl http://localhost:9200
# {"name":"...","cluster_name":"docker-cluster","version":{"number":"8.12.0",...}}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Option 2: Docker Compose with Kibana (Recommended for Development)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# docker-compose.yml
version: "3.8"
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.12.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms1g -Xmx1g
    ports:
      - "9200:9200"
    volumes:
      - es-data:/usr/share/elasticsearch/data

  kibana:
    image: docker.elastic.co/kibana/kibana:8.12.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

volumes:
  es-data:

# Start the stack
docker compose up -d

# Open Kibana at http://localhost:5601`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Option 3: Elastic Cloud (Production)
      </h3>
      <p>
        <a href="https://cloud.elastic.co" style={{ color: '#0284c7' }}>Elastic Cloud</a> is the
        fully managed hosted service. It offers automatic upgrades, built-in monitoring, Kibana, and
        integrations. There is a 14-day free trial. Alternative managed options include{' '}
        <strong>Amazon OpenSearch Service</strong> (AWS) and{' '}
        <strong>Elastic on Google Cloud / Azure</strong>.
      </p>

      {/* ─────────────────────────────────────────────
          SECTION 5 — CRUD with REST API
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        CRUD Operations with the REST API
      </h2>
      <p>
        Elasticsearch exposes a fully RESTful HTTP API. Every operation — creating indices, indexing
        documents, searching, and managing the cluster — is done via HTTP requests with JSON bodies.
        Use <code>curl</code>, Kibana Dev Tools, or any HTTP client.
      </p>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Create an Index
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Create index with explicit settings and mappings
PUT /products
{
  "settings": {
    "number_of_shards": 2,
    "number_of_replicas": 1,
    "analysis": {
      "analyzer": {
        "product_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "stop", "snowball"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name": { "type": "text", "analyzer": "product_analyzer" },
      "description": { "type": "text" },
      "price": { "type": "double" },
      "category": { "type": "keyword" },
      "tags": { "type": "keyword" },
      "in_stock": { "type": "boolean" },
      "created_at": { "type": "date" }
    }
  }
}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Index (Create) a Document
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# POST: auto-generate ID
POST /products/_doc
{
  "name": "Wireless Bluetooth Headphones",
  "description": "Premium noise-cancelling headphones with 30-hour battery life",
  "price": 199.99,
  "category": "electronics",
  "tags": ["audio", "wireless", "noise-cancelling"],
  "in_stock": true,
  "created_at": "2026-01-15T10:30:00Z"
}
# Response: { "_id": "abc123...", "result": "created", ... }

# PUT: specify your own ID
PUT /products/_doc/prod-001
{
  "name": "Mechanical Keyboard",
  "price": 149.99,
  "category": "electronics",
  "in_stock": true,
  "created_at": "2026-01-16T09:00:00Z"
}

# PUT with _create: fail if document already exists
PUT /products/_create/prod-001
{ "name": "Keyboard" }
# Returns 409 Conflict if prod-001 already exists`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Read (Get) a Document
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Get by ID
GET /products/_doc/prod-001

# Response:
{
  "_index": "products",
  "_id": "prod-001",
  "_version": 1,
  "found": true,
  "_source": {
    "name": "Mechanical Keyboard",
    "price": 149.99,
    "category": "electronics",
    ...
  }
}

# Check existence without fetching source
HEAD /products/_doc/prod-001   # 200 OK or 404

# Get only specific fields
GET /products/_doc/prod-001?_source_includes=name,price

# Multi-get
POST /products/_mget
{
  "ids": ["prod-001", "prod-002", "prod-003"]
}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Update a Document
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Partial update (only specified fields)
POST /products/_update/prod-001
{
  "doc": {
    "price": 139.99,
    "in_stock": false
  }
}

# Update with script (increment a counter)
POST /products/_update/prod-001
{
  "script": {
    "source": "ctx._source.view_count += params.increment",
    "params": { "increment": 1 }
  }
}

# Upsert: create if not exists, update if exists
POST /products/_update/prod-999
{
  "doc": { "price": 99.99 },
  "upsert": { "name": "New Product", "price": 99.99 }
}

# Update by query (update all matching documents)
POST /products/_update_by_query
{
  "query": { "term": { "category": "electronics" } },
  "script": {
    "source": "ctx._source.on_sale = true"
  }
}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Delete a Document
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Delete by ID
DELETE /products/_doc/prod-001

# Delete by query
POST /products/_delete_by_query
{
  "query": {
    "bool": {
      "must": [
        { "term": { "in_stock": false } },
        { "range": { "created_at": { "lt": "2024-01-01" } } }
      ]
    }
  }
}

# Delete entire index (irreversible!)
DELETE /products`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Bulk API (High-Performance Indexing)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# The bulk API processes multiple operations in a single request.
# Each operation is a pair of lines: action metadata + document body.

POST /products/_bulk
{ "index": { "_id": "prod-100" } }
{ "name": "USB-C Hub", "price": 49.99, "category": "electronics" }
{ "index": { "_id": "prod-101" } }
{ "name": "Monitor Stand", "price": 79.99, "category": "accessories" }
{ "update": { "_id": "prod-001" } }
{ "doc": { "price": 129.99 } }
{ "delete": { "_id": "prod-999" } }

# Response includes per-operation status:
{
  "took": 5,
  "errors": false,
  "items": [
    { "index": { "_id": "prod-100", "result": "created", "status": 201 } },
    { "index": { "_id": "prod-101", "result": "created", "status": 201 } },
    { "update": { "_id": "prod-001", "result": "updated", "status": 200 } },
    { "delete": { "_id": "prod-999", "result": "deleted", "status": 200 } }
  ]
}

# Best practice: use bulk batches of 5–15 MB or 1,000–5,000 documents`}</code></pre>

      {/* ─────────────────────────────────────────────
          SECTION 6 — Mappings
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Mappings and Index Configuration
      </h2>
      <p>
        Mappings define the schema for your documents — the data type of each field, how it is
        analyzed, and whether it is indexed. Getting mappings right is critical for search relevance
        and query performance.
      </p>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Core Field Types
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`PUT /articles
{
  "mappings": {
    "properties": {
      # Text: analyzed for full-text search, not sortable/aggregatable
      "title":        { "type": "text", "analyzer": "english" },

      # Keyword: exact match, sortable, aggregatable (facets, filters)
      "status":       { "type": "keyword" },
      "author_id":    { "type": "keyword" },

      # Multi-field: both text AND keyword on the same field
      "category": {
        "type": "text",
        "fields": {
          "keyword": { "type": "keyword", "ignore_above": 256 }
        }
      },

      # Numeric types
      "view_count":   { "type": "integer" },
      "rating":       { "type": "float" },
      "price":        { "type": "double" },
      "clicks":       { "type": "long" },

      # Boolean
      "is_published": { "type": "boolean" },

      # Date (ISO 8601 or custom format)
      "published_at": { "type": "date", "format": "yyyy-MM-dd'T'HH:mm:ssZ" },

      # Nested objects (for arrays of objects with queries)
      "comments": {
        "type": "nested",
        "properties": {
          "user_id": { "type": "keyword" },
          "body":    { "type": "text" }
        }
      },

      # Geo-point (latitude/longitude)
      "location":     { "type": "geo_point" },

      # Dense vector (for ML and k-NN search)
      "embedding":    { "type": "dense_vector", "dims": 768 }
    }
  }
}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Text vs Keyword Fields
      </h3>
      <p>
        The <strong>text vs keyword</strong> distinction is the single most important mapping decision
        in Elasticsearch:
      </p>
      <ul style={{ lineHeight: 1.9 }}>
        <li>
          <strong>text</strong>: The value is analyzed — tokenized, lowercased, and stemmed. Used for
          fields you want to search with full-text queries (<code>match</code>, <code>match_phrase</code>).
          Cannot be used for exact filtering, sorting, or aggregations (use <code>.keyword</code> subfield).
        </li>
        <li>
          <strong>keyword</strong>: The value is stored as-is. Used for exact match filters, sorting,
          and aggregations (faceted navigation). Cannot perform full-text search. Examples: status,
          tag, ID, email, URL.
        </li>
      </ul>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Dynamic Mappings and Strict Mode
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# By default, Elasticsearch auto-maps new fields (dynamic: true).
# This is convenient but can cause mapping explosion.
# In production, use strict mode to prevent unexpected fields:

PUT /logs
{
  "mappings": {
    "dynamic": "strict",   # reject documents with unmapped fields
    "properties": {
      "timestamp":  { "type": "date" },
      "level":      { "type": "keyword" },
      "message":    { "type": "text" },
      "service":    { "type": "keyword" }
    }
  }
}

# dynamic: "false"  — unknown fields are ignored (not indexed)
# dynamic: "true"   — unknown fields are auto-mapped (default)
# dynamic: "strict" — unknown fields cause an error (safest for production)`}</code></pre>

      {/* ─────────────────────────────────────────────
          SECTION 7 — Query DSL
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Query DSL: match, term, bool, range, and Aggregations
      </h2>
      <p>
        Elasticsearch Query DSL (Domain Specific Language) is a JSON-based API for defining searches.
        Queries are divided into <strong>leaf queries</strong> (match a single condition) and{' '}
        <strong>compound queries</strong> (combine multiple conditions). There are also{' '}
        <strong>filter context</strong> and <strong>query context</strong> — a critical distinction
        for performance.
      </p>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Query Context vs Filter Context
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Query context: calculates relevance score (_score)
#   - Used for "how well does this document match?"
#   - NOT cached
#   - Slower for repeated conditions

# Filter context: binary yes/no (no score calculation)
#   - Used for "does this document match exactly?"
#   - Cached automatically by Elasticsearch
#   - Faster for structured data (status, date ranges, IDs)

# Best practice: use filter context for all structured conditions
GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "bluetooth headphones" } }  // query context (scored)
      ],
      "filter": [
        { "term": { "category": "electronics" } },       // filter context (cached)
        { "term": { "in_stock": true } },                // filter context (cached)
        { "range": { "price": { "lte": 200 } } }         // filter context (cached)
      ]
    }
  }
}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        match Query (Full-Text Search)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Basic match: tokenizes the query and finds documents with any token
GET /products/_search
{
  "query": {
    "match": {
      "name": "bluetooth headphones"
      # Finds documents containing "bluetooth" OR "headphones"
    }
  }
}

# match with AND operator: both tokens must be present
GET /products/_search
{
  "query": {
    "match": {
      "name": {
        "query": "bluetooth headphones",
        "operator": "and"
      }
    }
  }
}

# match_phrase: tokens must appear in order and adjacent
GET /products/_search
{
  "query": {
    "match_phrase": {
      "description": "noise cancelling headphones"
    }
  }
}

# match_phrase_prefix: for search-as-you-type
GET /products/_search
{
  "query": {
    "match_phrase_prefix": {
      "name": "bluetoo"  # matches "bluetooth", "bluetooth 5.0", etc.
    }
  }
}

# multi_match: search across multiple fields
GET /products/_search
{
  "query": {
    "multi_match": {
      "query": "headphones",
      "fields": ["name^3", "description", "tags^2"],
      # ^3 means name field is boosted 3x in relevance scoring
      "type": "best_fields"  # cross_fields, most_fields, phrase
    }
  }
}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        term and terms Queries (Exact Match)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# term: exact match on keyword fields
GET /products/_search
{
  "query": {
    "term": {
      "category": { "value": "electronics" }
    }
  }
}

# Shorthand term
GET /products/_search
{
  "query": { "term": { "status": "published" } }
}

# terms: match any of the listed values (SQL IN)
GET /products/_search
{
  "query": {
    "terms": {
      "category": ["electronics", "computers", "audio"]
    }
  }
}

# IMPORTANT: Do NOT use term on analyzed text fields!
# This will NOT find "Electronics" stored as "electronics":
# { "term": { "category_text": "Electronics" } }   WRONG
# Use keyword mapping for fields you want to filter exactly.`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        bool Query (Combining Conditions)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# bool query combines any mix of leaf queries
# must:     all clauses must match (AND, contributes to score)
# should:   at least one should match (OR, boosts score)
# filter:   must match, no score (AND, cached — use for structured data)
# must_not: must not match (NOT, no score)

GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "headphones" } }
      ],
      "filter": [
        { "term":  { "in_stock": true } },
        { "range": { "price": { "gte": 50, "lte": 300 } } }
      ],
      "should": [
        { "term": { "tags": "noise-cancelling" } },
        { "term": { "tags": "wireless" } }
      ],
      "minimum_should_match": 1,
      "must_not": [
        { "term": { "category": "refurbished" } }
      ]
    }
  }
}

# Nested bool queries for complex logic:
# (category = electronics OR accessories) AND price < 200
GET /products/_search
{
  "query": {
    "bool": {
      "filter": [
        {
          "bool": {
            "should": [
              { "term": { "category": "electronics" } },
              { "term": { "category": "accessories" } }
            ]
          }
        },
        { "range": { "price": { "lt": 200 } } }
      ]
    }
  }
}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        range Query
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Numeric range
GET /products/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 50,    # greater than or equal
        "lte": 200    # less than or equal
        # gt:  strictly greater than
        # lt:  strictly less than
      }
    }
  }
}

# Date range with relative expressions
GET /logs/_search
{
  "query": {
    "range": {
      "timestamp": {
        "gte": "now-7d/d",    # start of 7 days ago
        "lte": "now/d",       # start of today
        "time_zone": "+08:00"
      }
    }
  }
}

# Date range with explicit ISO dates
GET /articles/_search
{
  "query": {
    "range": {
      "published_at": {
        "gte": "2026-01-01",
        "lt":  "2026-02-01",
        "format": "yyyy-MM-dd"
      }
    }
  }
}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Aggregations: Analytics and Faceted Search
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Aggregations run alongside a query and return analytics.
# Main types: Metric (avg, sum, min, max), Bucket (group-by), Pipeline.

GET /products/_search
{
  "size": 0,       # don't return documents, only aggregations
  "query": {
    "term": { "in_stock": true }
  },
  "aggs": {
    # terms agg: faceted navigation (like SQL GROUP BY)
    "by_category": {
      "terms": {
        "field": "category",
        "size": 10,
        "order": { "_count": "desc" }
      },
      # Nested agg: avg price per category
      "aggs": {
        "avg_price": { "avg": { "field": "price" } }
      }
    },

    # stats agg: min, max, avg, sum, count in one
    "price_stats": {
      "stats": { "field": "price" }
    },

    # date_histogram: aggregate events by time bucket
    "orders_by_day": {
      "date_histogram": {
        "field": "created_at",
        "calendar_interval": "day",
        "format": "yyyy-MM-dd"
      }
    },

    # range agg: bucket by price range
    "price_ranges": {
      "range": {
        "field": "price",
        "ranges": [
          { "to": 50,    "key": "under_50" },
          { "from": 50,  "to": 100, "key": "50_to_100" },
          { "from": 100, "to": 200, "key": "100_to_200" },
          { "from": 200, "key": "over_200" }
        ]
      }
    }
  }
}

# Example response for by_category:
# { "buckets": [
#     { "key": "electronics", "doc_count": 542, "avg_price": { "value": 124.5 } },
#     { "key": "accessories", "doc_count": 189, "avg_price": { "value": 45.2 } }
#   ]
# }`}</code></pre>

      {/* ─────────────────────────────────────────────
          SECTION 8 — Full-text vs Exact Match
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Full-Text Search vs Exact Match: Analysis and Tokenization
      </h2>
      <p>
        The most common source of confusion in Elasticsearch is the difference between full-text
        search and exact-match queries. This comes down to how Elasticsearch processes text through
        an <strong>analyzer</strong>.
      </p>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        What is an Analyzer?
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# An analyzer transforms text into tokens (terms) for indexing.
# It consists of: character filters → tokenizer → token filters

# Example: "english" analyzer on "Running quickly and Efficiently"
# 1. Tokenizer (standard):  ["Running", "quickly", "and", "Efficiently"]
# 2. Lowercase filter:      ["running", "quickly", "and", "efficiently"]
# 3. Stop word filter:      ["running", "quickly", "efficiently"]   (removes "and")
# 4. Snowball stemmer:      ["run", "quick", "effici"]

# What gets stored in the inverted index: run, quick, effici
# A match query for "runs" will also find this document (stemmed to "run")
# A term query for "Running" will NOT find this document

# Test your analyzer with the _analyze API:
POST /products/_analyze
{
  "analyzer": "english",
  "text": "Running quickly and Efficiently"
}

# Built-in analyzers:
# standard  - tokenize + lowercase (default for text fields)
# english   - + stop words + Porter stemming
# french    - + French stop words + French stemmer
# simple    - tokenize on non-letters, lowercase
# keyword   - no analysis (same as keyword field type)
# whitespace - split on whitespace only`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Fuzzy Search and Autocomplete
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Fuzzy search: handles typos using Levenshtein edit distance
GET /products/_search
{
  "query": {
    "match": {
      "name": {
        "query": "hedphones",        # typo for "headphones"
        "fuzziness": "AUTO",         # AUTO: 0 for 1-2 chars, 1 for 3-5, 2 for 6+
        "fuzzy_transpositions": true # allows "ab" -> "ba"
      }
    }
  }
}

# Search-as-you-type field type (Elasticsearch 7.2+)
# Optimized for real-time autocomplete:
PUT /products
{
  "mappings": {
    "properties": {
      "name": {
        "type": "search_as_you_type"
        # Creates: name, name._2gram, name._3gram, name._index_prefix
      }
    }
  }
}

GET /products/_search
{
  "query": {
    "multi_match": {
      "query": "blue",
      "type": "bool_prefix",
      "fields": ["name", "name._2gram", "name._3gram"]
    }
  }
}`}</code></pre>

      {/* ─────────────────────────────────────────────
          SECTION 9 — Node.js Client
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Node.js Client: @elastic/elasticsearch
      </h2>
      <p>
        The official Elasticsearch client for Node.js is{' '}
        <code>@elastic/elasticsearch</code>. It supports all Elasticsearch APIs, TypeScript, async/await,
        connection pooling, request sniffing, and automatic retries.
      </p>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Install
npm install @elastic/elasticsearch`}</code></pre>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`// client.ts
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200',
  // For production with security:
  // node: 'https://my-cluster.elastic-cloud.com:9243',
  // auth: { apiKey: process.env.ES_API_KEY },
  // tls: { rejectUnauthorized: true }
});

export default client;`}</code></pre>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`// search.ts — Full product search function
import client from './client';

interface SearchParams {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  from?: number;
  size?: number;
}

export async function searchProducts(params: SearchParams) {
  const { query, category, minPrice, maxPrice, from = 0, size = 20 } = params;

  const filters: object[] = [{ term: { in_stock: true } }];

  if (category) {
    filters.push({ term: { category } });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const rangeFilter: Record<string, number> = {};
    if (minPrice !== undefined) rangeFilter.gte = minPrice;
    if (maxPrice !== undefined) rangeFilter.lte = maxPrice;
    filters.push({ range: { price: rangeFilter } });
  }

  const response = await client.search({
    index: 'products',
    from,
    size,
    body: {
      query: {
        bool: {
          must: query
            ? [{ multi_match: { query, fields: ['name^3', 'description', 'tags^2'] } }]
            : [{ match_all: {} }],
          filter: filters,
        },
      },
      sort: [
        { _score: { order: 'desc' } },
        { 'price': { order: 'asc' } },
      ],
      highlight: {
        fields: {
          name: { pre_tags: ['<mark>'], post_tags: ['</mark>'] },
          description: { number_of_fragments: 2, fragment_size: 150 },
        },
      },
      aggs: {
        by_category: { terms: { field: 'category', size: 10 } },
        price_stats: { stats: { field: 'price' } },
      },
    },
  });

  return {
    total: response.hits.total,
    hits: response.hits.hits.map((hit) => ({
      id: hit._id,
      score: hit._score,
      source: hit._source,
      highlight: hit.highlight,
    })),
    aggregations: response.aggregations,
  };
}

// Index a document
export async function indexProduct(product: object, id?: string) {
  return client.index({
    index: 'products',
    id,
    document: product,
    refresh: 'wait_for', // wait until indexed before returning
  });
}

// Bulk index
export async function bulkIndex(products: Array<{ id: string; [key: string]: unknown }>) {
  const operations = products.flatMap((product) => [
    { index: { _index: 'products', _id: product.id } },
    product,
  ]);

  const bulkResponse = await client.bulk({ operations, refresh: true });

  if (bulkResponse.errors) {
    const errors = bulkResponse.items
      .filter((item) => item.index?.error)
      .map((item) => item.index?.error);
    console.error('Bulk indexing errors:', errors);
  }

  return bulkResponse;
}`}</code></pre>

      {/* ─────────────────────────────────────────────
          SECTION 10 — Python Client
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Python Client: elasticsearch-py
      </h2>
      <p>
        The official Python client for Elasticsearch is <code>elasticsearch-py</code>. It supports
        both synchronous and async (asyncio) usage, type hints, connection pooling, and all
        Elasticsearch APIs.
      </p>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Install
pip install elasticsearch`}</code></pre>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# search_products.py
from elasticsearch import Elasticsearch
from typing import Optional

# Connect to local Elasticsearch
es = Elasticsearch("http://localhost:9200")

# For production with authentication:
# es = Elasticsearch(
#     "https://my-cluster.elastic-cloud.com:9243",
#     api_key="your_api_key_here"
# )

def search_products(
    query: str,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    page: int = 1,
    size: int = 20
) -> dict:
    filters = [{"term": {"in_stock": True}}]

    if category:
        filters.append({"term": {"category": category}})

    if min_price is not None or max_price is not None:
        price_range = {}
        if min_price is not None:
            price_range["gte"] = min_price
        if max_price is not None:
            price_range["lte"] = max_price
        filters.append({"range": {"price": price_range}})

    body = {
        "from": (page - 1) * size,
        "size": size,
        "query": {
            "bool": {
                "must": [
                    {
                        "multi_match": {
                            "query": query,
                            "fields": ["name^3", "description", "tags^2"],
                            "fuzziness": "AUTO"
                        }
                    }
                ] if query else [{"match_all": {}}],
                "filter": filters
            }
        },
        "sort": [
            {"_score": {"order": "desc"}},
            {"price": {"order": "asc"}}
        ],
        "highlight": {
            "fields": {
                "name": {},
                "description": {"number_of_fragments": 2}
            }
        },
        "aggs": {
            "by_category": {"terms": {"field": "category", "size": 10}},
            "price_stats": {"stats": {"field": "price"}}
        }
    }

    response = es.search(index="products", body=body)

    return {
        "total": response["hits"]["total"]["value"],
        "hits": [
            {
                "id": hit["_id"],
                "score": hit["_score"],
                "source": hit["_source"],
                "highlight": hit.get("highlight", {})
            }
            for hit in response["hits"]["hits"]
        ],
        "aggregations": response.get("aggregations", {})
    }


def index_product(product: dict, product_id: Optional[str] = None) -> dict:
    return es.index(
        index="products",
        id=product_id,
        document=product,
        refresh="wait_for"
    )


def bulk_index_products(products: list[dict]) -> dict:
    from elasticsearch.helpers import bulk

    actions = [
        {
            "_index": "products",
            "_id": product.get("id"),
            "_source": product
        }
        for product in products
    ]

    success_count, errors = bulk(es, actions, raise_on_error=False)
    return {"indexed": success_count, "errors": errors}`}</code></pre>

      {/* ─────────────────────────────────────────────
          SECTION 11 — Kibana and ELK Stack
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Kibana and the ELK Stack
      </h2>
      <p>
        <strong>Kibana</strong> is the visualization and management UI for Elasticsearch. The{' '}
        <strong>ELK Stack</strong> (now officially called the <strong>Elastic Stack</strong>) is the
        combination of:
      </p>
      <ul style={{ lineHeight: 1.9 }}>
        <li>
          <strong>E</strong>lasticsearch — Storage, search, and analytics engine.
        </li>
        <li>
          <strong>L</strong>ogstash — Server-side data processing pipeline that ingests data from
          multiple sources, transforms it, and sends it to Elasticsearch.
        </li>
        <li>
          <strong>K</strong>ibana — Data visualization, dashboard creation, and cluster management UI.
        </li>
        <li>
          <strong>Beats</strong> (added later) — Lightweight data shippers: Filebeat (log files),
          Metricbeat (system metrics), Packetbeat (network data), Heartbeat (uptime monitoring).
        </li>
      </ul>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Setting Up Log Analytics with Filebeat
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# filebeat.yml — ship Nginx access logs to Elasticsearch
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/nginx/access.log
    fields:
      service: nginx
      env: production
    fields_under_root: true

output.elasticsearch:
  hosts: ["http://localhost:9200"]
  index: "nginx-logs-%{+yyyy.MM.dd}"  # daily indices for log rotation

setup.kibana:
  host: "http://localhost:5601"

# Processors to enrich events
processors:
  - add_host_metadata: ~
  - add_cloud_metadata: ~
  - geoip:
      field: client.ip
      target_field: client.geo`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Index Lifecycle Management (ILM)
      </h3>
      <p>
        For log analytics with time-series data, use <strong>ILM</strong> to automatically manage
        the lifecycle of indices: hot (actively written to), warm (indexed but not written),
        cold (infrequently queried), and delete phases.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Create an ILM policy for log data
PUT /_ilm/policy/logs-policy
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "rollover": {
            "max_primary_shard_size": "50gb",
            "max_age": "1d"
          },
          "set_priority": { "priority": 100 }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "shrink": { "number_of_shards": 1 },
          "forcemerge": { "max_num_segments": 1 },
          "set_priority": { "priority": 50 }
        }
      },
      "cold": {
        "min_age": "30d",
        "actions": {
          "set_priority": { "priority": 0 },
          "freeze": {}
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": { "delete": {} }
      }
    }
  }
}`}</code></pre>

      {/* ─────────────────────────────────────────────
          SECTION 12 — Performance Tuning
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Performance Tuning and Best Practices
      </h2>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        JVM Heap Settings
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# config/jvm.options or JVM_OPTS environment variable

# Rule 1: Set heap to no more than 50% of available RAM
# Rule 2: Never exceed 31 GB (compressed OOPs threshold)
# Rule 3: Set Xms = Xmx (avoid heap resizing at runtime)

# For 16 GB RAM machine:
-Xms8g
-Xmx8g

# For 64 GB RAM machine:
-Xms31g
-Xmx31g    # NOT 32g — stay under the compressed OOPs limit

# The other 50% of RAM is used by Lucene's file system cache
# — equally important for search performance!`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Indexing Performance
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# 1. Use the Bulk API — never index one document at a time in production.
#    Optimal batch size: 5–15 MB uncompressed, or 1,000–5,000 documents.

# 2. Increase refresh_interval during bulk ingestion
PUT /my-index/_settings
{
  "index": {
    "refresh_interval": "30s"   # default is 1s; use -1 to disable during bulk load
  }
}

# 3. Disable replicas during initial bulk load, re-enable after
PUT /my-index/_settings
{
  "index": { "number_of_replicas": 0 }
}
# ... bulk load ...
PUT /my-index/_settings
{
  "index": { "number_of_replicas": 1 }
}

# 4. Set translog durability to async during bulk load
PUT /my-index/_settings
{
  "index": {
    "translog": {
      "durability": "async",
      "sync_interval": "60s"
    }
  }
}

# 5. Force merge read-only indices (logs from last month)
POST /logs-2026-01/_forcemerge?max_num_segments=1`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Search Performance
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# 1. Use filter context for all structured conditions (exact match, date range)
#    Filters are cached; query context scores are not.

# 2. Avoid deep pagination with from/size — use search_after instead
# BAD (slow for deep pages):
GET /products/_search
{ "from": 10000, "size": 20 }

# GOOD (consistent performance):
GET /products/_search
{
  "size": 20,
  "sort": [{ "created_at": "desc" }, { "_id": "desc" }],
  "search_after": ["2026-01-15T10:00:00Z", "prod-12345"]
}

# 3. Use _source filtering to reduce network transfer
GET /products/_search
{
  "_source": ["name", "price", "category"],   # only fetch needed fields
  "query": { "match_all": {} }
}

# 4. Avoid wildcard and leading-wildcard queries on large indices
# BAD:  { "wildcard": { "name": "*phone*" } }
# GOOD: use a proper text field with match query

# 5. Profile slow queries
GET /products/_search
{
  "profile": true,
  "query": { "match": { "name": "headphones" } }
}`}</code></pre>

      {/* ─────────────────────────────────────────────
          SECTION 13 — Comparison Table
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Elasticsearch vs OpenSearch vs Solr
      </h2>
      <p>
        Choosing a search engine is a long-term architectural decision. Here is a side-by-side
        comparison of the three main Lucene-based search engines in 2026.
      </p>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Feature</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Elasticsearch 8.x</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>OpenSearch 2.x</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Apache Solr 9.x</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>License</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Elastic License 2.0 / AGPL</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Apache 2.0 (fully open)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Apache 2.0 (fully open)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Backed by</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Elastic NV (commercial)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>AWS + community</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Apache Software Foundation</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Query language</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Query DSL + EQL + ES|QL</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Query DSL (ES 7.10 compatible)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Lucene query syntax + JSON</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Managed cloud</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Elastic Cloud</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Amazon OpenSearch Service</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>No official managed offering</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Vector search (k-NN)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Yes (HNSW, dense_vector)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Yes (k-NN plugin)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Yes (Solr 9.0+, HNSW)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Kibana equivalent</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Kibana</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>OpenSearch Dashboards</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Banana / custom Grafana</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Schema required</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Optional (dynamic mapping)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Optional (dynamic mapping)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Yes (schema.xml or schemaless)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Ecosystem maturity</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Very mature, largest community</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Growing rapidly</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Mature, enterprise adoption</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Best for</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>General search + APM + SIEM</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>AWS workloads, cost-sensitive</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '9px 14px' }}>Enterprise document search, XML</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Which Should You Choose?
      </h3>
      <ul style={{ lineHeight: 1.9 }}>
        <li>
          <strong>Choose Elasticsearch</strong> if you need the latest features (ES|QL, new vector
          search improvements, Elastic AI), want Elastic Cloud managed hosting, or are building
          an observability/SIEM platform using the official integrations.
        </li>
        <li>
          <strong>Choose OpenSearch</strong> if you are running on AWS, need a fully open-source
          (Apache 2.0) solution, or want to avoid commercial licensing concerns. The API is
          compatible with Elasticsearch 7.10 clients.
        </li>
        <li>
          <strong>Choose Solr</strong> if you need deep XML document support, are in an enterprise
          environment already using Solr, or need the Apache Software Foundation governance model.
        </li>
      </ul>

      {/* ─────────────────────────────────────────────
          SECTION 14 — Use Cases Deep Dive
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Use Cases: Log Analysis, E-Commerce Search, and Autocomplete
      </h2>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Log Analysis Pipeline
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Application log structure in Elasticsearch
PUT /app-logs
{
  "mappings": {
    "properties": {
      "@timestamp":   { "type": "date" },
      "level":        { "type": "keyword" },   # INFO, WARN, ERROR
      "service":      { "type": "keyword" },
      "trace_id":     { "type": "keyword" },
      "span_id":      { "type": "keyword" },
      "message":      { "type": "text" },
      "error.type":   { "type": "keyword" },
      "error.stack":  { "type": "text", "index": false },  # not searchable, saves space
      "http.method":  { "type": "keyword" },
      "http.status":  { "type": "integer" },
      "http.url":     { "type": "keyword" },
      "duration_ms":  { "type": "long" }
    }
  }
}

# Query: find all ERROR logs from the payment service in the last hour
GET /app-logs/_search
{
  "query": {
    "bool": {
      "filter": [
        { "term":  { "level": "ERROR" } },
        { "term":  { "service": "payment-service" } },
        { "range": { "@timestamp": { "gte": "now-1h" } } }
      ]
    }
  },
  "sort": [{ "@timestamp": "desc" }],
  "aggs": {
    "errors_by_type": { "terms": { "field": "error.type" } },
    "errors_over_time": {
      "date_histogram": {
        "field": "@timestamp",
        "fixed_interval": "5m"
      }
    }
  }
}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        E-Commerce Product Search with Facets
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# E-commerce search: full-text + filters + facets + sorting
GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "wireless headphones",
            "fields": ["name^4", "brand^2", "description", "tags"],
            "type": "cross_fields",
            "operator": "and"
          }
        }
      ],
      "filter": [
        { "term": { "in_stock": true } },
        { "terms": { "category": ["electronics", "audio"] } },
        { "range": { "price": { "gte": 30, "lte": 300 } } },
        { "term": { "rating_count": { "gte": 10 } } }   # at least 10 reviews
      ],
      "should": [
        { "term": { "is_prime": true } },                 # boost Prime items
        { "term": { "sponsored": false } }                # slight boost for organic
      ]
    }
  },
  "sort": [
    { "_score": "desc" },
    { "sales_rank": "asc" },                              # secondary sort
    { "rating": "desc" }
  ],
  "from": 0,
  "size": 24,
  "aggs": {
    "brands":     { "terms": { "field": "brand", "size": 20 } },
    "price_ranges": {
      "range": {
        "field": "price",
        "ranges": [
          { "key": "Under \$50",    "to": 50 },
          { "key": "\$50 - \$100",  "from": 50,  "to": 100 },
          { "key": "\$100 - \$200", "from": 100, "to": 200 },
          { "key": "Over \$200",    "from": 200 }
        ]
      }
    },
    "avg_rating":    { "avg": { "field": "rating" } },
    "connectivity": { "terms": { "field": "features", "size": 10 } }
  }
}`}</code></pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          marginTop: '1.5rem',
          marginBottom: '0.75rem',
          color: '#1e293b',
        }}
      >
        Autocomplete with Completion Suggester
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: 8,
          padding: 20,
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      ><code>{`# Step 1: Map the suggest field
PUT /products
{
  "mappings": {
    "properties": {
      "name_suggest": {
        "type": "completion",
        "analyzer": "simple",
        "max_input_length": 50
      }
    }
  }
}

# Step 2: Index documents with suggest input
PUT /products/_doc/prod-001
{
  "name": "Wireless Bluetooth Headphones",
  "name_suggest": {
    "input": [
      "Wireless Bluetooth Headphones",
      "Bluetooth Headphones",
      "Wireless Headphones",
      "Headphones"
    ],
    "weight": 100   # boost popular products
  }
}

# Step 3: Query autocomplete suggestions
GET /products/_search
{
  "suggest": {
    "product_suggest": {
      "prefix": "bluetoo",
      "completion": {
        "field": "name_suggest",
        "size": 5,
        "skip_duplicates": true,
        "fuzzy": { "fuzziness": 1 }
      }
    }
  }
}

# Response includes:
# "options": [
#   { "text": "Bluetooth Headphones", "_score": 100 },
#   { "text": "Bluetooth Speaker",    "_score": 95 }
# ]`}</code></pre>

      {/* ─────────────────────────────────────────────
          FAQ Section
      ───────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        Frequently Asked Questions
      </h2>

      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginTop: '1.25rem',
          marginBottom: '0.5rem',
          color: '#1e293b',
        }}
      >
        What is Elasticsearch and what is it used for?
      </h3>
      <p>
        Elasticsearch is an open-source, distributed search and analytics engine built on Apache Lucene.
        It is used for full-text search, log analytics, real-time application monitoring, e-commerce
        product search, autocomplete, and business intelligence. Its core strengths are near-real-time
        search, horizontal scalability, and powerful aggregations.
      </p>

      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginTop: '1.25rem',
          marginBottom: '0.5rem',
          color: '#1e293b',
        }}
      >
        What is the difference between an Index, Document, and Shard?
      </h3>
      <p>
        An Index is a collection of documents with similar characteristics (analogous to a database
        table). A Document is a JSON object stored in an index (analogous to a row). A Shard is a
        horizontal partition of an index — Elasticsearch automatically splits large indices into shards
        to distribute data across multiple nodes. Each shard is itself a fully functional Lucene index.
      </p>

      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginTop: '1.25rem',
          marginBottom: '0.5rem',
          color: '#1e293b',
        }}
      >
        What is the difference between a match query and a term query?
      </h3>
      <p>
        A <code>match</code> query is for full-text search on analyzed fields. The query string is
        tokenized and analyzed before matching — great for user-facing search. A <code>term</code>{' '}
        query finds documents with an exact term value. Use it for keyword fields, IDs, status
        codes, and other structured data. Using <code>term</code> on an analyzed text field will
        often return no results because the stored tokens are lowercased.
      </p>

      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginTop: '1.25rem',
          marginBottom: '0.5rem',
          color: '#1e293b',
        }}
      >
        How do I choose the right number of shards?
      </h3>
      <p>
        Target 10–50 GB per shard. For a 100 GB index, 3–5 primary shards is a good starting point.
        Avoid over-sharding — each shard consumes memory, heap, and file handles. For indices under
        10 GB, 1 primary shard is sufficient. The number of primary shards is fixed at index
        creation time. You can change replicas any time.
      </p>

      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginTop: '1.25rem',
          marginBottom: '0.5rem',
          color: '#1e293b',
        }}
      >
        What is the ELK Stack?
      </h3>
      <p>
        The ELK Stack is Elasticsearch + Logstash + Kibana. It is a popular open-source log
        management and analytics platform. Elasticsearch stores and indexes the data, Logstash
        ingests and transforms it, and Kibana provides visualization. Modern deployments also include
        Beats (lightweight data shippers like Filebeat and Metricbeat).
      </p>

      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginTop: '1.25rem',
          marginBottom: '0.5rem',
          color: '#1e293b',
        }}
      >
        What is the difference between Elasticsearch and OpenSearch?
      </h3>
      <p>
        OpenSearch is a community-driven, Apache 2.0 licensed fork of Elasticsearch 7.10 created by
        AWS in 2021. They are largely REST API compatible. OpenSearch is free under Apache 2.0 while
        newer Elasticsearch versions use the Elastic License 2.0 or AGPL. Choose OpenSearch for
        AWS workloads or when Apache 2.0 licensing is required.
      </p>

      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginTop: '1.25rem',
          marginBottom: '0.5rem',
          color: '#1e293b',
        }}
      >
        Why is my term query returning no results?
      </h3>
      <p>
        The most common cause is using a <code>term</code> query on an analyzed text field. When
        Elasticsearch indexes a <code>text</code> field, it applies an analyzer that lowercases tokens.
        If your mapping uses <code>type: text</code> for a field like <code>category</code>, the
        stored token is <code>electronics</code> (lowercase), but your term query might be sending{' '}
        <code>Electronics</code> (capitalized). Solution: use <code>keyword</code> type for fields
        you want to filter exactly, or use the <code>.keyword</code> subfield:{' '}
        <code>term: {'{'} "category.keyword": "Electronics" {'}'}</code>.
      </p>

      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginTop: '1.25rem',
          marginBottom: '0.5rem',
          color: '#1e293b',
        }}
      >
        How do I improve Elasticsearch query performance?
      </h3>
      <p>
        Key tips: use filter context instead of query context for exact-match conditions (filters
        are cached), avoid wildcard queries on high-cardinality fields, use keyword fields for exact
        matches, set JVM heap to no more than 50% of RAM (never exceed 31 GB), use{' '}
        <code>search_after</code> for deep pagination instead of <code>from/size</code>, increase{' '}
        <code>refresh_interval</code> to 30s or higher for write-heavy indices, and use bulk indexing
        over single-document indexing for batch ingestion.
      </p>

      {/* ─────────────────────────────────────────────
          Key Takeaways
      ───────────────────────────────────────────── */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b', fontSize: '1rem' }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.9 }}>
          <li>
            <strong>Use text for full-text search, keyword for exact match</strong>: this is the
            single most important mapping decision. Use the <code>.keyword</code> subfield on text
            fields to support both use cases.
          </li>
          <li>
            <strong>Put structured conditions in filter context</strong>: filters are cached and
            do not calculate relevance scores. Only use query context (must) for fields that
            should affect ranking.
          </li>
          <li>
            <strong>Size your shards at 10–50 GB</strong>: avoid over-sharding. Too many small
            shards hurt performance more than too few large ones. Set primary shard count at
            index creation — it cannot be changed without reindexing.
          </li>
          <li>
            <strong>Set JVM heap to max 50% of RAM, never above 31 GB</strong>: the other 50%
            is needed by Lucene for OS file system cache, which is critical for search performance.
          </li>
          <li>
            <strong>Use the Bulk API for production indexing</strong>: batch 1,000–5,000
            documents per request for dramatically better throughput. Never index one document
            at a time in a loop.
          </li>
          <li>
            <strong>Use ILM for time-series data</strong>: automate hot/warm/cold/delete phases
            to manage index lifecycle, control storage costs, and maintain query performance on
            large log datasets.
          </li>
          <li>
            <strong>For pagination, use search_after not from/size</strong>: deep from/size
            pagination is extremely expensive as Elasticsearch must sort and discard all preceding
            documents. <code>search_after</code> provides consistent O(1) pagination.
          </li>
          <li>
            <strong>Elasticsearch is a search layer, not a primary database</strong>: always
            maintain a source of truth in a transactional database and synchronize relevant
            fields to Elasticsearch for search.
          </li>
        </ul>
      </div>
    </article>
  );
}
