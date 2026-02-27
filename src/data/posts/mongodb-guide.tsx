'use client';
import React from 'react';

/* ------------------------------------------------------------------ */
/*  MongoDB Guide: CRUD, Aggregation, Indexing, Schema Design & More  */
/* ------------------------------------------------------------------ */

const translations = {
  en: {
    title: 'MongoDB Guide: CRUD Operations, Aggregation Pipeline, Indexing, Schema Design, Transactions & Performance',
    description: 'Complete MongoDB guide covering CRUD operations, aggregation pipeline, indexing strategies, schema design patterns, transactions, change streams, Mongoose ODM, replica sets, sharding, and performance optimization.',
  },
  zh: {
    title: 'MongoDB 指南：CRUD 操作、聚合管道、索引、Schema 设计、事务与性能优化',
    description: '完整的 MongoDB 指南，涵盖 CRUD 操作、聚合管道、索引策略、Schema 设计模式、事务、变更流、Mongoose ODM、副本集、分片和性能优化。',
  },
};

export default function MongodbGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  void t;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is MongoDB and when should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MongoDB is a document-oriented NoSQL database that stores data as flexible JSON-like BSON documents. Use it when your data has variable schemas, you need horizontal scaling, or your application works naturally with nested document structures like product catalogs, content management, and real-time analytics.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I perform CRUD operations in MongoDB?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use insertOne/insertMany for creates, find/findOne for reads, updateOne/updateMany with $set/$inc/$push operators for updates, and deleteOne/deleteMany with filter queries for deletes. All operations accept filter documents using query operators like $gt, $in, $regex, and $elemMatch.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the MongoDB aggregation pipeline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The aggregation pipeline processes documents through sequential stages like $match (filter), $group (aggregate), $project (reshape), $lookup (join), $unwind (flatten arrays), and $sort. It is MongoDB\'s equivalent of SQL GROUP BY with JOINs and is used for analytics, reporting, and complex data transformations.',
        },
      },
      {
        '@type': 'Question',
        name: 'How should I design schemas in MongoDB — embed or reference?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Embed data when it is accessed together, has a one-to-few relationship, and rarely changes independently. Reference data when it is shared across documents, has a one-to-many or many-to-many relationship, or the embedded array would grow unbounded. Common patterns include bucket, polymorphic, and computed.',
        },
      },
      {
        '@type': 'Question',
        name: 'What indexing strategies does MongoDB support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MongoDB supports single-field, compound, multikey (array), text, geospatial (2dsphere/2d), hashed, and wildcard indexes. Compound indexes follow the ESR rule: Equality fields first, Sort fields next, Range fields last. TTL indexes automatically expire documents after a specified time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does MongoDB support multi-document transactions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, since MongoDB 4.0 for replica sets and 4.2 for sharded clusters. Transactions provide ACID guarantees across multiple documents and collections using session.startTransaction(), session.commitTransaction(), and session.abortTransaction(). Keep transactions short and avoid them when single-document atomicity suffices.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I optimize MongoDB query performance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use explain("executionStats") to analyze queries, create compound indexes matching your query patterns with the ESR rule, project only needed fields, use covered queries, enable connection pooling, set appropriate read/write concerns, and monitor with the database profiler. Avoid unbounded arrays, large documents over 16MB, and collection scans.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between replica sets and sharding in MongoDB?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Replica sets provide high availability by maintaining identical copies of data across multiple nodes with automatic failover. Sharding provides horizontal scalability by distributing data across multiple replica sets using a shard key. Use replica sets for redundancy and read scaling; add sharding when a single replica set cannot hold your data or handle your write throughput.',
        },
      },
    ],
  };

  const codeStyle: React.CSSProperties = {
    background: '#1e293b',
    color: '#e2e8f0',
    padding: '1rem',
    borderRadius: '6px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    margin: '0.75rem 0 1.25rem 0',
  };

  const h2Style: React.CSSProperties = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' };
  const h3Style: React.CSSProperties = { fontSize: '1.15rem', fontWeight: 600, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', margin: '1rem 0 1.5rem 0' };
  const thStyle: React.CSSProperties = { background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '0.5rem 0.75rem', textAlign: 'left', fontWeight: 600, color: '#1e293b' };
  const tdStyle: React.CSSProperties = { border: '1px solid #e2e8f0', padding: '0.5rem 0.75rem', verticalAlign: 'top', color: '#334155' };

  return (
    <article style={{ maxWidth: '820px', lineHeight: '1.75', color: '#334155' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0369a1' }}>TL;DR</strong>
        <p style={{ margin: 0 }}>
          MongoDB stores data as flexible BSON documents. Use <code>insertOne</code>/<code>find</code>/<code>updateOne</code>/<code>deleteOne</code> for
          CRUD, the aggregation pipeline (<code>$match</code>, <code>$group</code>, <code>$lookup</code>) for analytics,
          compound indexes following the <strong>ESR rule</strong> for performance, and embed-vs-reference decisions for schema design.
          Multi-document transactions provide ACID guarantees since v4.0. Use <code>explain()</code> and the database profiler to optimize queries.
        </p>
      </div>

      {/* Section 1: Document Model */}
      <h2 style={h2Style}>1. The Document Model and BSON Types</h2>
      <p>
        MongoDB stores data as <strong>documents</strong> — flexible, JSON-like structures that map naturally to
        objects in most programming languages. Unlike relational databases where you define rigid table schemas
        upfront, MongoDB documents in the same collection can have different fields. Internally documents use
        <strong> BSON</strong> (Binary JSON), extending JSON with types like <code>Date</code>, <code>ObjectId</code>,
        <code>Decimal128</code>, and <code>BinData</code>. Each document has a maximum size of 16 MB.
      </p>
      <p>
        A <strong>collection</strong> is analogous to a table, and a <strong>database</strong> holds multiple collections.
        The <code>_id</code> field is required and automatically generated as an <code>ObjectId</code> if not provided.
        ObjectId is a 12-byte value containing a 4-byte timestamp, 5-byte random value, and 3-byte counter — making
        it sortable by creation time.
      </p>
      <pre style={codeStyle}><code>{
        '// A MongoDB document — JSON-like but with rich types\n' +
        '{\n' +
        '  _id: ObjectId("507f1f77bcf86cd799439011"),  // 12-byte unique ID\n' +
        '  name: "Alice Johnson",                       // String (UTF-8)\n' +
        '  age: 29,                                     // Int32\n' +
        '  balance: NumberDecimal("1249.99"),            // Decimal128\n' +
        '  tags: ["developer", "speaker"],               // Array\n' +
        '  address: {                                    // Embedded document\n' +
        '    city: "San Francisco",\n' +
        '    state: "CA",\n' +
        '    zip: "94102"\n' +
        '  },\n' +
        '  createdAt: ISODate("2026-01-15T09:00:00Z"),  // UTC datetime\n' +
        '  metadata: BinData(0, "c3VyZQ==")             // Binary data\n' +
        '}'
      }</code></pre>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>BSON Type</th><th style={thStyle}>Example</th><th style={thStyle}>Use Case</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}>ObjectId</td><td style={tdStyle}>ObjectId(&quot;507f...&quot;)</td><td style={tdStyle}>Default _id, embeds timestamp</td></tr>
          <tr><td style={tdStyle}>String</td><td style={tdStyle}>&quot;hello&quot;</td><td style={tdStyle}>UTF-8 text</td></tr>
          <tr><td style={tdStyle}>Int32 / Int64</td><td style={tdStyle}>42 / NumberLong(42)</td><td style={tdStyle}>Integer values</td></tr>
          <tr><td style={tdStyle}>Decimal128</td><td style={tdStyle}>NumberDecimal(&quot;9.99&quot;)</td><td style={tdStyle}>Financial / exact decimal</td></tr>
          <tr><td style={tdStyle}>Date</td><td style={tdStyle}>ISODate(&quot;2026-01-15&quot;)</td><td style={tdStyle}>Timestamps</td></tr>
          <tr><td style={tdStyle}>Array</td><td style={tdStyle}>[1, 2, 3]</td><td style={tdStyle}>Lists, multikey indexes</td></tr>
          <tr><td style={tdStyle}>Boolean</td><td style={tdStyle}>true / false</td><td style={tdStyle}>Flags</td></tr>
        </tbody>
      </table>

      {/* Section 2: CRUD */}
      <h2 style={h2Style}>2. CRUD Operations</h2>
      <p>
        Every data interaction maps to Create, Read, Update, or Delete. All operations accept a <strong>filter document</strong> —
        a JSON-like object describing which documents to target. MongoDB provides both single-document and multi-document
        variants of each operation. Single-document operations are atomic; multi-document operations process each document
        independently unless wrapped in a transaction.
      </p>

      <h3 style={h3Style}>Create — insertOne &amp; insertMany</h3>
      <pre style={codeStyle}><code>{
        '// Insert a single document — returns insertedId\n' +
        'db.users.insertOne({\n' +
        '  name: "Alice",\n' +
        '  email: "alice@example.com",\n' +
        '  role: "admin",\n' +
        '  createdAt: new Date()\n' +
        '});\n\n' +
        '// Insert multiple documents\n' +
        '// ordered: false = continue inserting on duplicate key errors\n' +
        'db.users.insertMany([\n' +
        '  { name: "Bob", email: "bob@example.com", role: "user" },\n' +
        '  { name: "Carol", email: "carol@example.com", role: "editor" }\n' +
        '], { ordered: false });'
      }</code></pre>

      <h3 style={h3Style}>Read — find &amp; findOne</h3>
      <pre style={codeStyle}><code>{
        '// Find with query operators, projection, sort, limit\n' +
        'db.users.find({\n' +
        '  role: { $in: ["admin", "editor"] },\n' +
        '  createdAt: { $gte: ISODate("2026-01-01") }\n' +
        '}).project({ name: 1, email: 1, _id: 0 })\n' +
        '  .sort({ createdAt: -1 }).limit(20);\n\n' +
        '// Find one document by exact match\n' +
        'db.users.findOne({ email: "alice@example.com" });\n\n' +
        '// Nested field query\n' +
        'db.users.find({ "address.city": "San Francisco" });\n\n' +
        '// Array query with $elemMatch\n' +
        'db.orders.find({ items: { $elemMatch: { qty: { $gt: 5 }, price: { $lt: 20 } } } });\n\n' +
        '// Query operators cheat sheet:\n' +
        '// $eq $ne $gt $gte $lt $lte     — comparison\n' +
        '// $in $nin                       — set membership\n' +
        '// $and $or $not $nor             — logical\n' +
        '// $exists $type                  — element\n' +
        '// $regex $text                   — string matching\n' +
        '// $elemMatch $size $all          — array'
      }</code></pre>

      <h3 style={h3Style}>Update — updateOne &amp; updateMany</h3>
      <pre style={codeStyle}><code>{
        '// Update with multiple operators\n' +
        'db.users.updateOne(\n' +
        '  { email: "alice@example.com" },\n' +
        '  {\n' +
        '    $set: { role: "superadmin" },\n' +
        '    $inc: { loginCount: 1 },\n' +
        '    $push: { tags: "verified" },\n' +
        '    $currentDate: { lastModified: true }\n' +
        '  }\n' +
        ');\n\n' +
        '// Upsert — insert if not found\n' +
        'db.metrics.updateOne(\n' +
        '  { date: "2026-02-28", page: "/home" },\n' +
        '  { $inc: { views: 1 } },\n' +
        '  { upsert: true }\n' +
        ');\n\n' +
        '// Array update operators\n' +
        'db.posts.updateOne(\n' +
        '  { _id: postId },\n' +
        '  { $addToSet: { likes: userId },      // add only if not present\n' +
        '    $pull: { dislikes: userId } }       // remove from array\n' +
        ');\n\n' +
        '// Update operators:\n' +
        '// $set, $unset, $rename         — field\n' +
        '// $inc, $mul, $min, $max        — numeric\n' +
        '// $push, $pull, $addToSet, $pop — array'
      }</code></pre>

      <h3 style={h3Style}>Delete — deleteOne &amp; deleteMany</h3>
      <pre style={codeStyle}><code>{
        'db.users.deleteOne({ email: "bob@example.com" });\n\n' +
        'db.sessions.deleteMany({\n' +
        '  lastAccess: { $lt: ISODate("2025-01-01") }\n' +
        '});\n\n' +
        '// findOneAndDelete — returns the deleted document\n' +
        'const deleted = db.queue.findOneAndDelete(\n' +
        '  { status: "pending" },\n' +
        '  { sort: { priority: -1 } }\n' +
        ');'
      }</code></pre>

      {/* Section 3: Aggregation */}
      <h2 style={h2Style}>3. Aggregation Pipeline</h2>
      <p>
        The aggregation pipeline processes documents through sequential stages. Each stage transforms documents
        as they pass through — like a Unix pipe. Place <code>$match</code> early to filter documents before
        expensive stages, and use <code>$project</code> to reduce document size mid-pipeline. The pipeline can
        use indexes for <code>$match</code> and <code>$sort</code> stages at the beginning.
      </p>
      <pre style={codeStyle}><code>{
        '// Revenue report by category — last 30 days\n' +
        'db.orders.aggregate([\n' +
        '  { $match: {\n' +
        '    status: "completed",\n' +
        '    orderDate: { $gte: ISODate("2026-01-29") }\n' +
        '  }},\n' +
        '  { $lookup: {\n' +
        '    from: "products", localField: "productId",\n' +
        '    foreignField: "_id", as: "product"\n' +
        '  }},\n' +
        '  { $unwind: "$product" },\n' +
        '  { $group: {\n' +
        '    _id: "$product.category",\n' +
        '    totalRevenue: { $sum: "$amount" },\n' +
        '    avgOrder: { $avg: "$amount" },\n' +
        '    count: { $sum: 1 }\n' +
        '  }},\n' +
        '  { $project: {\n' +
        '    category: "$_id", totalRevenue: { $round: ["$totalRevenue", 2] },\n' +
        '    avgOrder: { $round: ["$avgOrder", 2] }, count: 1, _id: 0\n' +
        '  }},\n' +
        '  { $sort: { totalRevenue: -1 } }\n' +
        ']);'
      }</code></pre>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>Stage</th><th style={thStyle}>Purpose</th><th style={thStyle}>SQL Equivalent</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}>$match</td><td style={tdStyle}>Filter documents</td><td style={tdStyle}>WHERE</td></tr>
          <tr><td style={tdStyle}>$group</td><td style={tdStyle}>Aggregate values</td><td style={tdStyle}>GROUP BY</td></tr>
          <tr><td style={tdStyle}>$project</td><td style={tdStyle}>Reshape fields</td><td style={tdStyle}>SELECT</td></tr>
          <tr><td style={tdStyle}>$lookup</td><td style={tdStyle}>Left outer join</td><td style={tdStyle}>LEFT JOIN</td></tr>
          <tr><td style={tdStyle}>$unwind</td><td style={tdStyle}>Flatten array to one doc per element</td><td style={tdStyle}>UNNEST</td></tr>
          <tr><td style={tdStyle}>$sort</td><td style={tdStyle}>Order results</td><td style={tdStyle}>ORDER BY</td></tr>
          <tr><td style={tdStyle}>$facet</td><td style={tdStyle}>Multiple pipelines in parallel</td><td style={tdStyle}>Multiple queries</td></tr>
          <tr><td style={tdStyle}>$addFields</td><td style={tdStyle}>Add computed fields</td><td style={tdStyle}>SELECT expr AS alias</td></tr>
          <tr><td style={tdStyle}>$bucket</td><td style={tdStyle}>Group into value ranges</td><td style={tdStyle}>CASE WHEN + GROUP BY</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>$facet — Multiple Aggregations in One Query</h3>
      <pre style={codeStyle}><code>{
        '// Get both paginated results and total count in one query\n' +
        'db.products.aggregate([\n' +
        '  { $match: { category: "electronics" } },\n' +
        '  { $facet: {\n' +
        '    results: [\n' +
        '      { $sort: { price: -1 } },\n' +
        '      { $skip: 20 },\n' +
        '      { $limit: 10 },\n' +
        '      { $project: { name: 1, price: 1 } }\n' +
        '    ],\n' +
        '    totalCount: [\n' +
        '      { $count: "count" }\n' +
        '    ],\n' +
        '    priceRange: [\n' +
        '      { $group: {\n' +
        '        _id: null,\n' +
        '        minPrice: { $min: "$price" },\n' +
        '        maxPrice: { $max: "$price" }\n' +
        '      }}\n' +
        '    ]\n' +
        '  }}\n' +
        ']);'
      }</code></pre>

      {/* Section 4: Indexing */}
      <h2 style={h2Style}>4. Indexing Strategies</h2>
      <p>
        Indexes are the most critical factor for query performance. Without an index, every query performs a
        <strong> collection scan</strong> (COLLSCAN) — reading every document. Follow the <strong>ESR rule</strong>:
        <em> Equality</em> fields first, <em>Sort</em> fields next, <em>Range</em> fields last. Use
        <code>db.collection.getIndexes()</code> to list existing indexes and <code>db.collection.totalIndexSize()</code> to
        check disk usage. Over-indexing wastes storage and slows writes, so create only the indexes your queries need.
      </p>

      <h3 style={h3Style}>Compound and Single-Field Indexes</h3>
      <pre style={codeStyle}><code>{
        '// Single-field index with unique constraint\n' +
        'db.users.createIndex({ email: 1 }, { unique: true });\n\n' +
        '// Compound index — ESR rule\n' +
        'db.users.createIndex({ status: 1, name: 1, createdAt: 1 });\n\n' +
        '// Partial index — smaller and faster\n' +
        'db.users.createIndex(\n' +
        '  { email: 1 },\n' +
        '  { partialFilterExpression: { status: "active" } }\n' +
        ');\n\n' +
        '// Covered query — index has all fields, no doc fetch\n' +
        'db.users.createIndex({ email: 1, name: 1 });\n' +
        'db.users.find({ email: "alice@example.com" }, { name: 1, email: 1, _id: 0 });'
      }</code></pre>

      <h3 style={h3Style}>Specialized Index Types</h3>
      <pre style={codeStyle}><code>{
        '// Text index — full-text search\n' +
        'db.articles.createIndex(\n' +
        '  { title: "text", body: "text" },\n' +
        '  { weights: { title: 10, body: 1 } }\n' +
        ');\n' +
        'db.articles.find({ $text: { $search: "mongodb aggregation" } });\n\n' +
        '// TTL index — auto-expire documents after 7 days\n' +
        'db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 604800 });\n\n' +
        '// 2dsphere geospatial index\n' +
        'db.places.createIndex({ location: "2dsphere" });\n' +
        'db.places.find({\n' +
        '  location: { $near: {\n' +
        '    $geometry: { type: "Point", coordinates: [-122.4, 37.8] },\n' +
        '    $maxDistance: 5000\n' +
        '  }}\n' +
        '});\n\n' +
        '// Wildcard index — flexible schema\n' +
        'db.events.createIndex({ "metadata.$**": 1 });'
      }</code></pre>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>Index Type</th><th style={thStyle}>Best For</th><th style={thStyle}>Limitation</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}>Single-field</td><td style={tdStyle}>Simple equality / range</td><td style={tdStyle}>One field only</td></tr>
          <tr><td style={tdStyle}>Compound</td><td style={tdStyle}>Multi-field queries (ESR)</td><td style={tdStyle}>Max 32 fields; order matters</td></tr>
          <tr><td style={tdStyle}>Multikey</td><td style={tdStyle}>Array fields</td><td style={tdStyle}>Max 1 array per compound index</td></tr>
          <tr><td style={tdStyle}>Text</td><td style={tdStyle}>Full-text search</td><td style={tdStyle}>One text index per collection</td></tr>
          <tr><td style={tdStyle}>2dsphere</td><td style={tdStyle}>Geospatial queries</td><td style={tdStyle}>GeoJSON format required</td></tr>
          <tr><td style={tdStyle}>TTL</td><td style={tdStyle}>Auto-expire documents</td><td style={tdStyle}>Single Date field only</td></tr>
          <tr><td style={tdStyle}>Hashed</td><td style={tdStyle}>Hash-based sharding</td><td style={tdStyle}>Equality only, no range</td></tr>
          <tr><td style={tdStyle}>Wildcard</td><td style={tdStyle}>Dynamic schemas</td><td style={tdStyle}>No compound queries</td></tr>
        </tbody>
      </table>

      {/* Section 5: Schema Design */}
      <h2 style={h2Style}>5. Schema Design Patterns</h2>
      <p>
        MongoDB schema design is driven by <strong>how your application queries data</strong>, not by normalization
        rules. Unlike relational databases where you normalize to third normal form and join at query time, MongoDB
        encourages denormalization to reduce the need for joins. The key decision is whether to <em>embed</em> related
        data inside a document or <em>reference</em> it via an ObjectId in another collection. Consider your read/write
        ratio, data access patterns, and the expected document size (max 16 MB).
      </p>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>Criteria</th><th style={thStyle}>Embed</th><th style={thStyle}>Reference</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}>Relationship</td><td style={tdStyle}>One-to-few (1-5)</td><td style={tdStyle}>One-to-many, many-to-many</td></tr>
          <tr><td style={tdStyle}>Read pattern</td><td style={tdStyle}>Always read together</td><td style={tdStyle}>Read independently</td></tr>
          <tr><td style={tdStyle}>Update pattern</td><td style={tdStyle}>Rarely updated alone</td><td style={tdStyle}>Updated independently</td></tr>
          <tr><td style={tdStyle}>Data size</td><td style={tdStyle}>Small sub-document</td><td style={tdStyle}>Large or growing unbounded</td></tr>
          <tr><td style={tdStyle}>Doc limit</td><td style={tdStyle}>Under 16 MB total</td><td style={tdStyle}>Could exceed 16 MB</td></tr>
        </tbody>
      </table>
      <pre style={codeStyle}><code>{
        '// EMBEDDED: Blog post with comments (one-to-few)\n' +
        '{\n' +
        '  _id: ObjectId("..."), title: "Schema Design",\n' +
        '  comments: [\n' +
        '    { user: "Bob", text: "Great!", date: ISODate("2026-02-01") },\n' +
        '    { user: "Carol", text: "Helpful", date: ISODate("2026-02-02") }\n' +
        '  ]\n' +
        '}\n\n' +
        '// REFERENCED: Orders referencing products (one-to-many)\n' +
        '{\n' +
        '  _id: ObjectId("..."), userId: ObjectId("..."),\n' +
        '  items: [\n' +
        '    { productId: ObjectId("..."), qty: 2, price: 29.99 },\n' +
        '    { productId: ObjectId("..."), qty: 1, price: 49.99 }\n' +
        '  ], total: 109.97\n' +
        '}'
      }</code></pre>

      <h3 style={h3Style}>Common Patterns: Bucket, Polymorphic, Computed</h3>
      <pre style={codeStyle}><code>{
        '// BUCKET — time-series data batched into hourly/daily buckets\n' +
        '{\n' +
        '  sensorId: "temp-001", date: ISODate("2026-02-28"),\n' +
        '  count: 60,\n' +
        '  measurements: [\n' +
        '    { ts: ISODate("...T00:00:00Z"), value: 22.1 },\n' +
        '    { ts: ISODate("...T00:01:00Z"), value: 22.3 }\n' +
        '  ],\n' +
        '  summary: { min: 21.5, max: 23.1, avg: 22.2 }\n' +
        '}\n\n' +
        '// POLYMORPHIC — different shapes in same collection\n' +
        '{ type: "car", make: "Toyota", doors: 4, mpg: 32 }\n' +
        '{ type: "truck", make: "Ford", payload: 2000, axles: 2 }\n\n' +
        '// COMPUTED — pre-calculate expensive aggregations\n' +
        '{\n' +
        '  _id: "product-42", name: "Widget Pro",\n' +
        '  reviewStats: { count: 287, avgRating: 4.3,\n' +
        '    distribution: { 5: 142, 4: 89, 3: 31, 2: 15, 1: 10 } }\n' +
        '}'
      }</code></pre>

      {/* Section 6: Transactions */}
      <h2 style={h2Style}>6. Multi-Document Transactions</h2>
      <p>
        MongoDB provides ACID transactions across multiple documents and collections since version 4.0 (replica sets)
        and 4.2 (sharded clusters). While single-document operations are already atomic, transactions let you
        coordinate writes across multiple documents with all-or-nothing semantics — just like in a relational database.
        Keep transactions short (under 60 seconds by default) and avoid them when single-document atomicity suffices,
        as they add latency and lock overhead.
      </p>
      <pre style={codeStyle}><code>{
        'const session = client.startSession();\n' +
        'try {\n' +
        '  session.startTransaction({\n' +
        '    readConcern: { level: "snapshot" },\n' +
        '    writeConcern: { w: "majority" }\n' +
        '  });\n' +
        '  const accounts = client.db("bank").collection("accounts");\n\n' +
        '  // Debit source\n' +
        '  const debit = await accounts.updateOne(\n' +
        '    { _id: "acct-001", balance: { $gte: 500 } },\n' +
        '    { $inc: { balance: -500 } }, { session }\n' +
        '  );\n' +
        '  if (debit.modifiedCount === 0) throw new Error("Insufficient funds");\n\n' +
        '  // Credit destination\n' +
        '  await accounts.updateOne(\n' +
        '    { _id: "acct-002" },\n' +
        '    { $inc: { balance: 500 } }, { session }\n' +
        '  );\n\n' +
        '  // Record in ledger\n' +
        '  await client.db("bank").collection("ledger").insertOne(\n' +
        '    { from: "acct-001", to: "acct-002", amount: 500, date: new Date() },\n' +
        '    { session }\n' +
        '  );\n\n' +
        '  await session.commitTransaction();\n' +
        '} catch (err) {\n' +
        '  await session.abortTransaction();\n' +
        '} finally {\n' +
        '  session.endSession();\n' +
        '}'
      }</code></pre>

      {/* Section 7: Change Streams */}
      <h2 style={h2Style}>7. Change Streams</h2>
      <p>
        Change streams subscribe to real-time data changes — inserts, updates, deletes, and replacements — without
        polling. Built on the oplog, they work with replica sets and sharded clusters. Use them for real-time
        notifications, cache invalidation, data synchronization, and event-driven microservices. Each change event
        includes a <strong>resume token</strong> so you can restart the stream from where you left off after a
        disconnect.
      </p>
      <pre style={codeStyle}><code>{
        'const pipeline = [\n' +
        '  { $match: { "fullDocument.status": "urgent",\n' +
        '    operationType: { $in: ["insert", "update"] } }}\n' +
        '];\n\n' +
        'const stream = db.collection("tickets").watch(pipeline, {\n' +
        '  fullDocument: "updateLookup"\n' +
        '});\n\n' +
        'stream.on("change", (event) => {\n' +
        '  console.log("Op:", event.operationType);\n' +
        '  console.log("Doc:", event.fullDocument);\n' +
        '  // Trigger notification, update cache, etc.\n' +
        '});\n\n' +
        '// Resume after disconnect\n' +
        'const token = loadTokenFromStorage();\n' +
        'const resumed = collection.watch(pipeline, { resumeAfter: token });'
      }</code></pre>

      {/* Section 8: Mongoose */}
      <h2 style={h2Style}>8. Mongoose ODM Basics</h2>
      <p>
        Mongoose is the most popular MongoDB ODM for Node.js, providing schema validation, type casting,
        middleware hooks, virtual properties, and a fluent query builder on top of the native driver. It enforces
        structure at the application level while MongoDB itself stays schema-flexible. Use <code>.lean()</code> on
        queries when you only need plain objects (skips Mongoose hydration for better performance).
      </p>
      <pre style={codeStyle}><code>{
        'import mongoose from "mongoose";\n\n' +
        'await mongoose.connect("mongodb://localhost:27017/myapp", {\n' +
        '  maxPoolSize: 10, serverSelectionTimeoutMS: 5000\n' +
        '});\n\n' +
        'const userSchema = new mongoose.Schema({\n' +
        '  name:  { type: String, required: true, trim: true },\n' +
        '  email: { type: String, required: true, unique: true, lowercase: true },\n' +
        '  age:   { type: Number, min: 0, max: 150 },\n' +
        '  role:  { type: String, enum: ["user", "admin", "editor"], default: "user" },\n' +
        '  tags:  [String],\n' +
        '  profile: { bio: String, avatar: String }\n' +
        '}, { timestamps: true });\n\n' +
        '// Virtual property\n' +
        'userSchema.virtual("isAdmin").get(function() {\n' +
        '  return this.role === "admin";\n' +
        '});\n\n' +
        '// Pre-save middleware\n' +
        'userSchema.pre("save", function(next) {\n' +
        '  if (this.isModified("email")) { /* validate */ }\n' +
        '  next();\n' +
        '});\n\n' +
        'const User = mongoose.model("User", userSchema);\n\n' +
        '// CRUD with Mongoose\n' +
        'const user = await User.create({ name: "Alice", email: "alice@dev.com" });\n' +
        'const admins = await User.find({ role: "admin" }).sort({ name: 1 }).lean();\n' +
        'await User.findByIdAndUpdate(user._id, { $push: { tags: "verified" } });\n\n' +
        '// Population — resolve references\n' +
        'const postSchema = new mongoose.Schema({\n' +
        '  title: String,\n' +
        '  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }\n' +
        '});\n' +
        'const Post = mongoose.model("Post", postSchema);\n' +
        'const posts = await Post.find().populate("author", "name email").lean();'
      }</code></pre>

      {/* Section 9: Replica Sets & Sharding */}
      <h2 style={h2Style}>9. Replica Sets and Sharding</h2>
      <p>
        <strong>Replica sets</strong> provide high availability with automatic failover. A typical set has three
        members: one primary (accepts writes) and two secondaries (replicate data asynchronously). If the primary
        fails, an election promotes a secondary within seconds. <strong>Sharding</strong> distributes data across
        multiple replica sets using a <strong>shard key</strong>. Choose your shard key carefully — it determines
        data distribution and query routing, and cannot easily be changed after sharding.
      </p>

      <h3 style={h3Style}>Replica Set Setup</h3>
      <pre style={codeStyle}><code>{
        '// Connection string\n' +
        '"mongodb://mongo1:27017,mongo2:27017,mongo3:27017/mydb?replicaSet=rs0"\n\n' +
        '// Initiate replica set\n' +
        'rs.initiate({\n' +
        '  _id: "rs0",\n' +
        '  members: [\n' +
        '    { _id: 0, host: "mongo1:27017", priority: 2 },\n' +
        '    { _id: 1, host: "mongo2:27017", priority: 1 },\n' +
        '    { _id: 2, host: "mongo3:27017", priority: 1 }\n' +
        '  ]\n' +
        '});\n' +
        'db.getMongo().setReadPref("secondaryPreferred");'
      }</code></pre>

      <h3 style={h3Style}>Sharding</h3>
      <pre style={codeStyle}><code>{
        '// Enable sharding on a database\n' +
        'sh.enableSharding("analytics");\n\n' +
        '// Shard a collection — choose shard key carefully!\n' +
        'sh.shardCollection("analytics.events", {\n' +
        '  tenantId: 1, timestamp: 1\n' +
        '});\n\n' +
        '// Shard key strategies:\n' +
        '// Ranged:   { timestamp: 1 }        — good for range scans, hot shard risk\n' +
        '// Hashed:   { userId: "hashed" }    — even distribution, no range queries\n' +
        '// Compound: { region: 1, _id: 1 }   — zone-based + high cardinality\n\n' +
        '// Good shard key properties:\n' +
        '// - High cardinality (many unique values)\n' +
        '// - Even distribution (no hot spots)\n' +
        '// - Query isolation (most queries target a single shard)\n' +
        '// - Cannot be changed after sharding!'
      }</code></pre>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>Feature</th><th style={thStyle}>Replica Set</th><th style={thStyle}>Sharded Cluster</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}>Purpose</td><td style={tdStyle}>HA, read scaling</td><td style={tdStyle}>Horizontal write/storage scaling</td></tr>
          <tr><td style={tdStyle}>Data</td><td style={tdStyle}>Identical copies</td><td style={tdStyle}>Partitioned across shards</td></tr>
          <tr><td style={tdStyle}>Failover</td><td style={tdStyle}>Automatic election</td><td style={tdStyle}>Per-shard automatic</td></tr>
          <tr><td style={tdStyle}>When to use</td><td style={tdStyle}>Always (production baseline)</td><td style={tdStyle}>Data exceeds single server</td></tr>
          <tr><td style={tdStyle}>Components</td><td style={tdStyle}>Primary + secondaries</td><td style={tdStyle}>Shards + config servers + mongos</td></tr>
        </tbody>
      </table>

      {/* Section 10: Performance */}
      <h2 style={h2Style}>10. Performance Optimization</h2>
      <p>
        Performance tuning in MongoDB starts with understanding your query patterns. Use <code>explain()</code> to
        analyze query execution plans, the <strong>database profiler</strong> to discover slow queries, and
        <strong> connection pooling</strong> to manage driver resources efficiently. The most common performance issue
        is missing indexes — a single missing index can turn a 2ms query into a multi-second collection scan.
        Always check <code>explain()</code> output for COLLSCAN stages and high <code>totalDocsExamined</code> relative
        to <code>nReturned</code>.
      </p>

      <h3 style={h3Style}>explain() and Database Profiler</h3>
      <pre style={codeStyle}><code>{
        '// Analyze query execution plan\n' +
        'db.orders.find({ status: "pending" }).explain("executionStats");\n\n' +
        '// Key fields in explain output:\n' +
        '// executionStats.nReturned         — docs returned to client\n' +
        '// executionStats.totalDocsExamined — docs scanned (want close to nReturned)\n' +
        '// executionStats.totalKeysExamined — index keys scanned\n' +
        '// executionStats.executionTimeMillis — total query time\n' +
        '// winningPlan.stage               — IXSCAN (good) vs COLLSCAN (bad)\n' +
        '// winningPlan.inputStage.indexName — which index was chosen\n\n' +
        '// Enable database profiler for slow queries (> 100ms)\n' +
        'db.setProfilingLevel(1, { slowms: 100 });\n\n' +
        '// Query the profiler output\n' +
        'db.system.profile.find({\n' +
        '  millis: { $gt: 200 },\n' +
        '  ns: "mydb.orders"\n' +
        '}).sort({ ts: -1 }).limit(5);\n\n' +
        '// Disable profiler when done\n' +
        'db.setProfilingLevel(0);'
      }</code></pre>

      <h3 style={h3Style}>Connection Pooling and Driver Configuration</h3>
      <pre style={codeStyle}><code>{
        'const { MongoClient } = require("mongodb");\n\n' +
        'const client = new MongoClient(uri, {\n' +
        '  maxPoolSize: 50,              // max concurrent connections\n' +
        '  minPoolSize: 5,               // keep warm connections\n' +
        '  maxIdleTimeMS: 60000,         // close idle after 60s\n' +
        '  serverSelectionTimeoutMS: 5000,\n' +
        '  socketTimeoutMS: 45000,\n' +
        '  compressors: ["zstd", "snappy"],  // network compression\n' +
        '  readPreference: "secondaryPreferred",\n' +
        '  readConcern: { level: "majority" },\n' +
        '  writeConcern: { w: "majority", j: true }\n' +
        '});\n\n' +
        '// IMPORTANT: Create client ONCE and reuse across requests\n' +
        '// Do NOT create a new MongoClient per request!'
      }</code></pre>

      <h3 style={h3Style}>Performance Best Practices Summary</h3>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>Practice</th><th style={thStyle}>Why</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}>Create compound indexes (ESR)</td><td style={tdStyle}>Avoid COLLSCAN, support queries efficiently</td></tr>
          <tr><td style={tdStyle}>Project only needed fields</td><td style={tdStyle}>Reduce network transfer and memory</td></tr>
          <tr><td style={tdStyle}>Use covered queries</td><td style={tdStyle}>Avoid document fetch entirely</td></tr>
          <tr><td style={tdStyle}>Reuse MongoClient</td><td style={tdStyle}>Connection pooling, avoid TCP overhead</td></tr>
          <tr><td style={tdStyle}>Enable compression (zstd)</td><td style={tdStyle}>30-70% less network bandwidth</td></tr>
          <tr><td style={tdStyle}>Use readPreference secondary</td><td style={tdStyle}>Distribute read load</td></tr>
          <tr><td style={tdStyle}>Avoid unbounded arrays</td><td style={tdStyle}>Prevent 16MB limit and slow updates</td></tr>
          <tr><td style={tdStyle}>Monitor with profiler</td><td style={tdStyle}>Identify slow queries proactively</td></tr>
        </tbody>
      </table>

      {/* Section 11: Atlas & Compass */}
      <h2 style={h2Style}>11. Atlas Features and MongoDB Compass</h2>
      <p>
        <strong>MongoDB Atlas</strong> is the fully managed cloud database service available on AWS, GCP, and Azure.
        It handles provisioning, patching, automated backups with point-in-time recovery, and auto-scaling.
        The free M0 tier (512 MB) is ideal for development and learning. <strong>MongoDB Compass</strong> is the
        official desktop GUI for visualizing schemas, building aggregation pipelines, managing indexes, and
        analyzing query performance with visual explain plans.
      </p>
      <pre style={codeStyle}><code>{
        '// Atlas connection (SRV format — auto-discovers replica set)\n' +
        '"mongodb+srv://user:pass@cluster0.abc123.mongodb.net/mydb"\n\n' +
        '// Key Atlas features:\n' +
        '// - Automated backups with point-in-time recovery\n' +
        '// - Auto-scaling storage and compute\n' +
        '// - Global clusters with zone-based sharding\n' +
        '// - Performance Advisor (automatic index recommendations)\n' +
        '// - Atlas Charts (built-in data visualization)\n' +
        '// - Atlas Data Federation (query S3 + Atlas together)\n\n' +
        '// Atlas Search — Lucene-based full-text via aggregation\n' +
        'db.products.aggregate([\n' +
        '  { $search: {\n' +
        '    index: "product_search",\n' +
        '    compound: {\n' +
        '      must: [{ text: { query: "wireless headphones", path: "title" } }],\n' +
        '      filter: [{ range: { path: "price", lte: 100 } }]\n' +
        '    }\n' +
        '  }},\n' +
        '  { $limit: 10 },\n' +
        '  { $project: { title: 1, price: 1, score: { $meta: "searchScore" } } }\n' +
        ']);\n\n' +
        '// MongoDB Compass features:\n' +
        '// - Visual schema analyzer\n' +
        '// - Aggregation pipeline builder (drag-and-drop stages)\n' +
        '// - Visual explain plan for query optimization\n' +
        '// - Index management and performance metrics\n' +
        '// - CRUD operations with a graphical interface'
      }</code></pre>

      {/* Section 12: Security */}
      <h2 style={h2Style}>12. Security: Authentication, Authorization &amp; Encryption</h2>
      <p>
        Production MongoDB deployments require multiple security layers: <strong>authentication</strong> (who can
        connect), <strong>authorization</strong> (what they can do), <strong>encryption</strong> (protecting data
        in transit and at rest), and <strong>network controls</strong> (who can reach the server). Always enable
        authentication — by default, MongoDB allows unauthenticated connections which is a common source of
        data breaches.
      </p>
      <pre style={codeStyle}><code>{
        '// Create an admin user\n' +
        'use admin\n' +
        'db.createUser({\n' +
        '  user: "appAdmin", pwd: passwordPrompt(),\n' +
        '  roles: [\n' +
        '    { role: "readWrite", db: "myapp" },\n' +
        '    { role: "dbAdmin", db: "myapp" }\n' +
        '  ]\n' +
        '});\n\n' +
        '// Read-only user for reporting\n' +
        'db.createUser({\n' +
        '  user: "reporter", pwd: passwordPrompt(),\n' +
        '  roles: [{ role: "read", db: "myapp" }]\n' +
        '});\n\n' +
        '// Built-in roles:\n' +
        '// read, readWrite         — data access\n' +
        '// dbAdmin, dbOwner        — database admin\n' +
        '// clusterAdmin            — cluster ops\n' +
        '// userAdminAnyDatabase    — user management\n\n' +
        '// TLS/SSL connection:\n' +
        '// mongod --tlsMode requireTLS \\\n' +
        '//   --tlsCertificateKeyFile /etc/ssl/mongodb.pem \\\n' +
        '//   --tlsCAFile /etc/ssl/ca.pem\n\n' +
        '// Encryption at rest (Atlas or Enterprise):\n' +
        '// Atlas: AES-256 enabled by default\n' +
        '// Enterprise: KMIP or local key provider\n\n' +
        '// Client-Side Field Level Encryption (CSFLE)\n' +
        '// Encrypts fields BEFORE they leave the driver\n' +
        '// Even DBAs cannot read encrypted fields'
      }</code></pre>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>Security Layer</th><th style={thStyle}>Mechanism</th><th style={thStyle}>Protects Against</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}>Authentication</td><td style={tdStyle}>SCRAM-SHA-256, x.509, LDAP</td><td style={tdStyle}>Unauthorized connections</td></tr>
          <tr><td style={tdStyle}>Authorization</td><td style={tdStyle}>Role-based access control</td><td style={tdStyle}>Privilege escalation</td></tr>
          <tr><td style={tdStyle}>Encryption in transit</td><td style={tdStyle}>TLS/SSL</td><td style={tdStyle}>Network eavesdropping</td></tr>
          <tr><td style={tdStyle}>Encryption at rest</td><td style={tdStyle}>AES-256, KMIP</td><td style={tdStyle}>Disk theft</td></tr>
          <tr><td style={tdStyle}>Field-level encryption</td><td style={tdStyle}>CSFLE / Queryable Encryption</td><td style={tdStyle}>Admin seeing sensitive data</td></tr>
          <tr><td style={tdStyle}>Network</td><td style={tdStyle}>IP whitelist, VPC peering</td><td style={tdStyle}>External attacks</td></tr>
        </tbody>
      </table>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.9' }}>
          <li>MongoDB stores documents as <strong>BSON</strong> with rich types: ObjectId, Date, Decimal128, embedded docs, arrays</li>
          <li>CRUD uses <code>insertOne</code>, <code>find</code>, <code>updateOne</code>, <code>deleteOne</code> with operators like <code>$gt</code>, <code>$in</code>, <code>$regex</code></li>
          <li>The <strong>aggregation pipeline</strong> chains stages (<code>$match</code>, <code>$group</code>, <code>$lookup</code>, <code>$unwind</code>) for analytics and joins</li>
          <li>Follow the <strong>ESR rule</strong> for compound indexes: Equality, Sort, Range field order</li>
          <li><strong>Embed</strong> for one-to-few read-together data; <strong>reference</strong> for one-to-many or independent access</li>
          <li>Multi-document <strong>transactions</strong> provide ACID — but prefer single-document atomicity when possible</li>
          <li><strong>Change streams</strong> enable real-time event-driven architectures without polling</li>
          <li>Use <code>explain(&quot;executionStats&quot;)</code> to verify index usage and avoid COLLSCAN</li>
          <li><strong>Replica sets</strong> for HA (production baseline); add <strong>sharding</strong> when data exceeds single-server capacity</li>
          <li>Always enable <strong>authentication</strong>, use <strong>TLS</strong>, apply <strong>RBAC</strong>, and consider <strong>CSFLE</strong> for sensitive fields</li>
        </ul>
      </div>
    </article>
  );
}
