'use client';
import React from 'react';

const translations = {
  en: {
    title: 'MongoDB Guide: Complete NoSQL Database Tutorial for Developers',
    description:
      'Master MongoDB from basics to production: CRUD operations, aggregation pipeline, indexes, Mongoose ODM, transactions, Atlas setup, performance tuning, and security best practices.',
    content: (
      <>
        {/* JSON-LD FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is MongoDB and when should I use it?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MongoDB is a document-oriented NoSQL database that stores data in flexible JSON-like BSON documents. Use it when you need a flexible schema, high write throughput, horizontal scaling, or when your data model naturally fits documents rather than relational tables — such as user profiles, product catalogs, content management, and real-time analytics.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is the difference between MongoDB and a SQL database?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MongoDB stores data as documents (JSON/BSON) in collections, while SQL databases store data in rows and tables with a rigid schema. MongoDB offers flexible schemas, horizontal scaling, and is optimized for hierarchical data. SQL databases offer strong ACID guarantees, complex JOINs, and a standardized query language. Choose MongoDB for flexible, document-oriented data and choose SQL for relational, transactional workloads.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I connect to MongoDB in Node.js?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Use the official MongoDB Node.js driver or Mongoose ODM. With the driver: const { MongoClient } = require("mongodb"); const client = new MongoClient(uri); await client.connect();. With Mongoose: const mongoose = require("mongoose"); await mongoose.connect(process.env.MONGODB_URI);. Always use connection pooling and store the connection URI in environment variables.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is the aggregation pipeline in MongoDB?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The aggregation pipeline is a framework for data transformation and computation. Documents pass through a sequence of stages — $match (filter), $group (aggregate), $project (reshape), $sort, $limit, $lookup (join), $unwind (flatten arrays). It is more powerful than simple find() queries and enables complex analytics directly in the database.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do MongoDB indexes work and which type should I use?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MongoDB indexes improve query performance by allowing the server to scan an index structure rather than every document. Single-field indexes cover equality and range queries on one field. Compound indexes cover queries on multiple fields — order matters. Text indexes enable full-text search. TTL indexes automatically delete documents after a specified time. Use explain() to verify index usage.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Should I embed or reference documents in MongoDB?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Embed documents when the data is accessed together, has a one-to-few relationship, and the embedded data does not exceed 16MB. Reference documents when the data is accessed independently, has a many-to-many or large one-to-many relationship, or when the embedded array would grow without bound. A common pattern is to embed for reads and reference for writes.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does MongoDB support ACID transactions?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Since MongoDB 4.0, multi-document ACID transactions are supported on replica sets, and since 4.2, on sharded clusters. Use sessions with startTransaction(), commitTransaction(), and abortTransaction(). Single-document operations are always atomic. For most use cases, schema design with embedding eliminates the need for multi-document transactions.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is MongoDB Atlas and is the free tier good enough to start?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MongoDB Atlas is the fully managed cloud database service. The M0 free tier provides 512MB storage, shared CPU, and supports up to 100 connections. It is excellent for development, learning, small applications, and MVPs. For production workloads, upgrade to M10+ dedicated clusters which provide dedicated RAM, automated backups, and Atlas Search capabilities.',
                  },
                },
              ],
            }),
          }}
        />

        {/* TL;DR Box */}
        <div
          style={{
            background: '#f0f9ff',
            border: '2px solid #0ea5e9',
            borderRadius: '8px',
            padding: '20px 24px',
            marginBottom: '32px',
          }}
        >
          <strong style={{ fontSize: '1.1em', color: '#0369a1' }}>TL;DR</strong>
          <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>MongoDB stores data as BSON documents in collections — no rigid schema required.</li>
            <li>Master CRUD with <code>insertOne</code>, <code>find</code>, <code>updateOne</code>, <code>deleteOne</code> and their bulk variants.</li>
            <li>Use the aggregation pipeline for analytics: <code>$match</code>, <code>$group</code>, <code>$lookup</code>, <code>$project</code>.</li>
            <li>Create the right indexes; run <code>explain()</code> to confirm they are used.</li>
            <li>Mongoose adds schema validation, middleware, virtuals, and <code>populate()</code> to Node.js apps.</li>
            <li>MongoDB Atlas free tier (M0) is perfect for prototypes; upgrade to M10 for production.</li>
          </ul>
        </div>

        <h2>Introduction: Why MongoDB?</h2>
        <p>
          MongoDB is the world's most popular NoSQL database, powering applications at companies like
          Forbes, SEGA, eBay, and Adobe. Released in 2009, it stores data in flexible JSON-like
          documents rather than rigid rows and columns, making it an excellent fit for modern
          applications where data shapes evolve rapidly.
        </p>
        <p>
          Unlike relational databases that require you to define a schema upfront and run migrations
          for every change, MongoDB lets you insert documents with different fields into the same
          collection. This document model maps naturally to how objects look in application code,
          eliminating the object-relational impedance mismatch.
        </p>
        <p>
          This guide takes you from zero to production-ready MongoDB knowledge: core concepts, all
          CRUD operations, the powerful aggregation pipeline, indexing strategy, Mongoose ODM,
          multi-document transactions, Atlas setup, performance tuning, and security hardening.
        </p>

        {/* Key Takeaways */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '20px 24px',
            marginBottom: '32px',
          }}
        >
          <strong style={{ fontSize: '1.05em', color: '#334155' }}>Key Takeaways</strong>
          <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px', lineHeight: '1.8', color: '#475569' }}>
            <li>Documents replace rows; collections replace tables; BSON extends JSON with extra types.</li>
            <li>Every document gets a unique <code>_id</code> field (ObjectId by default).</li>
            <li>The aggregation pipeline is MongoDB's answer to SQL GROUP BY + JOIN + window functions.</li>
            <li>Compound index field order and sort direction matter for performance.</li>
            <li>Embedding vs referencing is the most impactful schema design decision in MongoDB.</li>
            <li>Multi-document transactions work on replica sets and sharded clusters (v4.0+).</li>
            <li>Always store the connection URI in environment variables, never in source code.</li>
          </ul>
        </div>

        <h2>MongoDB Basics: Documents, Collections, BSON, and _id</h2>

        <h3>Documents and Collections</h3>
        <p>
          In MongoDB, a <strong>document</strong> is the basic unit of data. It is an ordered set
          of key-value pairs stored in BSON format. A <strong>collection</strong> is a group of
          documents — analogous to a table in SQL. Unlike SQL tables, collections do not enforce a
          schema, so documents within the same collection can have different fields.
        </p>
        <pre><code>{`// Example document in a "users" collection
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c0d1"),
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 29,
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "zip": "94102"
  },
  "tags": ["developer", "nodejs", "mongodb"],
  "createdAt": ISODate("2024-09-01T00:00:00Z"),
  "isActive": true
}`}</code></pre>

        <h3>BSON: Binary JSON</h3>
        <p>
          MongoDB stores documents in <strong>BSON</strong> (Binary JSON), a binary-encoded
          serialization of JSON-like documents. BSON extends JSON with additional data types:
        </p>
        <ul>
          <li><strong>ObjectId</strong> — 12-byte unique identifier for documents</li>
          <li><strong>Date</strong> — UTC datetime stored as 64-bit integer milliseconds</li>
          <li><strong>Binary</strong> — arbitrary binary data (e.g., file contents, UUIDs)</li>
          <li><strong>Decimal128</strong> — high-precision floating point for financial data</li>
          <li><strong>Regular Expression</strong> — BSON has a native regex type</li>
          <li><strong>Int32 / Int64</strong> — explicit integer types (JSON only has Number)</li>
        </ul>

        <h3>The _id Field</h3>
        <p>
          Every MongoDB document must have a unique <code>_id</code> field. If you do not provide
          one, MongoDB automatically generates an <strong>ObjectId</strong>. An ObjectId encodes a
          4-byte timestamp, 5-byte random value, and 3-byte incrementing counter — making them
          roughly sortable by insertion time.
        </p>
        <pre><code>{`const { ObjectId } = require('mongodb');

// Auto-generated ObjectId
const id = new ObjectId();
console.log(id.toString());       // "64f1a2b3c4d5e6f7a8b9c0d1"
console.log(id.getTimestamp());   // 2024-09-01T00:00:00.000Z

// Custom _id (use sparingly — ensure uniqueness)
db.products.insertOne({ _id: "SKU-001", name: "Widget" });

// Find by ObjectId (must convert string to ObjectId)
db.users.findOne({ _id: new ObjectId("64f1a2b3c4d5e6f7a8b9c0d1") });`}</code></pre>

        <h2>CRUD Operations</h2>

        <h3>Insert: insertOne and insertMany</h3>
        <pre><code>{`// Connect using the official Node.js driver
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('myapp');
const users = db.collection('users');

// insertOne — returns { acknowledged, insertedId }
const result = await users.insertOne({
  name: 'Bob Smith',
  email: 'bob@example.com',
  age: 34,
  createdAt: new Date(),
});
console.log('Inserted ID:', result.insertedId);

// insertMany — returns { acknowledged, insertedCount, insertedIds }
const bulk = await users.insertMany([
  { name: 'Carol', email: 'carol@example.com', age: 27 },
  { name: 'Dave',  email: 'dave@example.com',  age: 31 },
  { name: 'Eve',   email: 'eve@example.com',   age: 25 },
], { ordered: false }); // ordered:false continues on error
console.log('Inserted:', bulk.insertedCount);`}</code></pre>

        <h3>Read: find and findOne</h3>
        <pre><code>{`// findOne — returns first matching document or null
const user = await users.findOne({ email: 'bob@example.com' });

// find — returns a Cursor; use .toArray() or async iteration
const activeUsers = await users
  .find({ isActive: true, age: { $gte: 18 } })
  .sort({ createdAt: -1 })
  .skip(0)
  .limit(20)
  .project({ name: 1, email: 1, _id: 0 }) // projection: include name & email
  .toArray();

// Async iteration (memory-efficient for large result sets)
const cursor = users.find({ isActive: true });
for await (const doc of cursor) {
  console.log(doc.name);
}

// Count documents
const count = await users.countDocuments({ isActive: true });`}</code></pre>

        <h3>Update: updateOne and updateMany</h3>
        <pre><code>{`// updateOne — updates the first matching document
const updateResult = await users.updateOne(
  { email: 'bob@example.com' },            // filter
  {
    $set:   { age: 35, 'address.city': 'Oakland' },
    $push:  { tags: 'senior-dev' },
    $inc:   { loginCount: 1 },             // increment by 1
    $currentDate: { lastModified: true },  // set to current date
  }
);
console.log('Modified:', updateResult.modifiedCount);

// updateMany — updates all matching documents
await users.updateMany(
  { isActive: false, lastLogin: { $lt: new Date('2023-01-01') } },
  { $set: { archived: true } }
);

// upsert — insert if not found
await users.updateOne(
  { email: 'newuser@example.com' },
  { $setOnInsert: { name: 'New User', createdAt: new Date() } },
  { upsert: true }
);

// findOneAndUpdate — returns the document (before or after update)
const updated = await users.findOneAndUpdate(
  { email: 'bob@example.com' },
  { $set: { age: 36 } },
  { returnDocument: 'after' } // 'before' returns original
);`}</code></pre>

        <h3>Delete: deleteOne and deleteMany</h3>
        <pre><code>{`// deleteOne — deletes the first matching document
const deleteResult = await users.deleteOne({ email: 'bob@example.com' });
console.log('Deleted:', deleteResult.deletedCount);

// deleteMany — deletes all matching documents
await users.deleteMany({ archived: true, age: { $lt: 18 } });

// findOneAndDelete — returns the deleted document
const deleted = await users.findOneAndDelete({ email: 'temp@example.com' });
console.log('Removed user:', deleted?.name);`}</code></pre>

        <h2>Query Operators</h2>
        <p>
          MongoDB's query language uses operators prefixed with <code>$</code>. Here is a
          comprehensive reference of the most important ones:
        </p>
        <pre><code>{`// Comparison operators
{ age: { $eq: 30 } }        // equal (same as { age: 30 })
{ age: { $ne: 30 } }        // not equal
{ age: { $gt: 25 } }        // greater than
{ age: { $gte: 25 } }       // greater than or equal
{ age: { $lt: 60 } }        // less than
{ age: { $lte: 60 } }       // less than or equal
{ status: { $in: ['active', 'trial'] } }   // field in array
{ status: { $nin: ['banned', 'deleted'] }} // field not in array

// Logical operators
{ $and: [{ age: { $gte: 18 } }, { isActive: true }] }  // explicit AND
{ $or:  [{ age: { $lt: 18 } }, { parentConsent: true }]}
{ $nor: [{ age: { $lt: 0 } }, { age: { $gt: 150 } }] }
{ age: { $not: { $lt: 18 } } }  // NOT (wraps a single operator)

// Element operators
{ phone: { $exists: true } }         // field exists
{ phone: { $exists: false } }        // field does not exist
{ age:   { $type: 'int' } }          // BSON type check
{ score: { $type: ['int', 'double'] }}

// Evaluation operators
{ name: { $regex: /^alice/i } }      // regex match
{ $text: { $search: 'mongodb guide' }} // full-text search (requires text index)
{ $where: 'this.age > this.minAge' } // JS expression (avoid in production)

// Array operators
{ tags: 'nodejs' }                    // array contains element
{ tags: { $all: ['nodejs', 'react'] }}// array contains all
{ tags: { $size: 3 } }               // array has exactly 3 elements
{ 'scores.0': { $gte: 90 } }         // first element of array
{ scores: { $elemMatch: { $gte: 80, $lt: 100 } } } // at least one element matches`}</code></pre>

        <h2>Aggregation Pipeline</h2>
        <p>
          The aggregation pipeline is one of MongoDB's most powerful features. It processes documents
          through a series of stages, where each stage transforms the documents and passes results to
          the next stage. Think of it as a Unix pipe for your data.
        </p>

        <h3>Core Pipeline Stages</h3>
        <pre><code>{`// Example: Revenue report by category for active products in 2024
const report = await db.collection('orders').aggregate([

  // Stage 1: $match — filter documents (like SQL WHERE)
  { $match: {
    status: 'completed',
    createdAt: { $gte: new Date('2024-01-01'), $lt: new Date('2025-01-01') }
  }},

  // Stage 2: $lookup — left outer join (like SQL LEFT JOIN)
  { $lookup: {
    from:         'products',       // collection to join
    localField:   'productId',      // field in orders
    foreignField: '_id',            // field in products
    as:           'productDetails', // output array field
  }},

  // Stage 3: $unwind — deconstruct array (one doc per array element)
  { $unwind: '$productDetails' },

  // Stage 4: $group — aggregate (like SQL GROUP BY + SUM/AVG/COUNT)
  { $group: {
    _id:          '$productDetails.category',
    totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
    orderCount:   { $sum: 1 },
    avgOrderValue:{ $avg: { $multiply: ['$quantity', '$price'] } },
    products:     { $addToSet: '$productDetails.name' },
  }},

  // Stage 5: $project — reshape documents (like SQL SELECT)
  { $project: {
    _id:           0,
    category:      '$_id',
    totalRevenue:  { $round: ['$totalRevenue', 2] },
    orderCount:    1,
    avgOrderValue: { $round: ['$avgOrderValue', 2] },
    productCount:  { $size: '$products' },
  }},

  // Stage 6: $sort — sort results (like SQL ORDER BY)
  { $sort: { totalRevenue: -1 } },

  // Stage 7: $limit — limit results
  { $limit: 10 },

]).toArray();`}</code></pre>

        <h3>More Useful Pipeline Stages</h3>
        <pre><code>{`// $addFields — add computed fields without removing existing ones
{ $addFields: {
  fullName: { $concat: ['$firstName', ' ', '$lastName'] },
  age: { $dateDiff: { startDate: '$birthDate', endDate: '$$NOW', unit: 'year' }},
}},

// $replaceRoot — promote embedded document to root
{ $replaceRoot: { newRoot: '$address' } },

// $facet — run multiple sub-pipelines in parallel (for faceted search)
{ $facet: {
  byCategory: [{ $group: { _id: '$category', count: { $sum: 1 } } }],
  byStatus:   [{ $group: { _id: '$status',   count: { $sum: 1 } } }],
  total:      [{ $count: 'count' }],
}},

// $bucket — group into ranges
{ $bucket: {
  groupBy:    '$age',
  boundaries: [0, 18, 25, 35, 50, 65, 100],
  default:    'Other',
  output:     { count: { $sum: 1 }, avgScore: { $avg: '$score' } },
}},

// $out / $merge — write pipeline results to a collection
{ $out: 'monthly_revenue_report' },         // replace collection
{ $merge: { into: 'daily_stats', on: 'date', whenMatched: 'merge' } }, // upsert`}</code></pre>

        <h2>Indexes: Strategy and Best Practices</h2>
        <p>
          Indexes are the single most impactful performance optimization in MongoDB. Without an
          appropriate index, MongoDB performs a collection scan — reading every document. A well-chosen
          index can reduce query time from seconds to milliseconds.
        </p>

        <h3>Creating Indexes</h3>
        <pre><code>{`// Single-field index
await users.createIndex({ email: 1 });         // ascending
await users.createIndex({ createdAt: -1 });    // descending

// Unique index — enforce uniqueness
await users.createIndex({ email: 1 }, { unique: true });

// Compound index — covers multi-field queries
// Field order matters: equality first, then range, then sort
await users.createIndex({ isActive: 1, age: 1, createdAt: -1 });

// Sparse index — only indexes documents where the field exists
await users.createIndex({ phone: 1 }, { sparse: true });

// Text index — full-text search
await db.collection('articles').createIndex(
  { title: 'text', body: 'text' },
  { weights: { title: 10, body: 1 }, name: 'article_text_idx' }
);

// TTL index — auto-delete documents after N seconds
await db.collection('sessions').createIndex(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 } // delete when expiresAt is reached
);

// Partial index — index only documents matching a filter
await users.createIndex(
  { lastLogin: -1 },
  { partialFilterExpression: { isActive: true } }
);

// List all indexes on a collection
const indexes = await users.indexes();
console.log(JSON.stringify(indexes, null, 2));`}</code></pre>

        <h3>Analyzing Query Performance with explain()</h3>
        <pre><code>{`// Run explain to see if your index is being used
const explanation = await users
  .find({ isActive: true, age: { $gte: 25 } })
  .sort({ createdAt: -1 })
  .explain('executionStats');

// Key fields to inspect:
// executionStats.executionStages.stage
//   "COLLSCAN" = bad — full collection scan, no index
//   "IXSCAN"   = good — index scan
//   "FETCH"    = doc fetch after index (often fine)
// executionStats.totalDocsExamined  vs  nReturned
//   ideally nReturned ≈ totalDocsExamined (no wasted scans)
// executionStats.executionTimeMillis
//   time in milliseconds

console.log(explanation.executionStats.executionStages.stage);
console.log('Docs examined:', explanation.executionStats.totalDocsExamined);
console.log('Docs returned:', explanation.executionStats.nReturned);
console.log('Time (ms):', explanation.executionStats.executionTimeMillis);`}</code></pre>

        <h2>Data Modeling: Embedding vs Referencing</h2>
        <p>
          The most important design decision in MongoDB is whether to embed related data within a
          document or store it in a separate collection and reference it. Unlike SQL where you always
          normalize, MongoDB often benefits from intentional denormalization.
        </p>

        <h3>Embedding (Denormalization)</h3>
        <pre><code>{`// GOOD: Embed when data is always accessed together
// User document with embedded address — fetched in one query
{
  "_id": ObjectId("..."),
  "name": "Alice",
  "address": {          // embedded subdocument
    "street": "123 Main St",
    "city": "San Francisco",
    "zip": "94102"
  },
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}

// GOOD: Embed arrays with bounded size
{
  "_id": ObjectId("..."),
  "title": "My Blog Post",
  "comments": [         // embedded array — OK if < 100 comments
    { "author": "Bob", "text": "Great post!", "date": ISODate("...") },
    { "author": "Carol", "text": "Thanks!", "date": ISODate("...") }
  ]
}`}</code></pre>

        <h3>Referencing (Normalization)</h3>
        <pre><code>{`// GOOD: Reference when data is large, shared, or accessed independently
// Order document — references product by _id
{
  "_id": ObjectId("..."),
  "userId": ObjectId("64f1a2b3..."),     // reference to users collection
  "items": [
    {
      "productId": ObjectId("64f9a1c2..."), // reference to products collection
      "quantity": 2,
      "price": 29.99
    }
  ],
  "total": 59.98,
  "createdAt": ISODate("...")
}

// Use $lookup in aggregation to join referenced documents
// Or use Mongoose populate() — see Mongoose section below`}</code></pre>

        <h3>Schema Design Patterns</h3>
        <ul>
          <li><strong>Bucket Pattern</strong> — group time-series data into buckets (e.g., one document per hour of IoT readings) to reduce document count and index size.</li>
          <li><strong>Outlier Pattern</strong> — use a flag to handle documents with unusually large arrays (e.g., users with thousands of followers stored in overflow documents).</li>
          <li><strong>Computed Pattern</strong> — pre-compute expensive aggregations and store results (e.g., rolling totals), refreshed on write or via a scheduled job.</li>
          <li><strong>Extended Reference Pattern</strong> — embed the most frequently read fields from a referenced document to avoid $lookup while keeping full data in the reference.</li>
          <li><strong>Subset Pattern</strong> — embed only the most recent N items (e.g., last 5 comments), store the rest in a separate collection.</li>
        </ul>

        <h2>Mongoose ODM</h2>
        <p>
          <strong>Mongoose</strong> is the most popular Object Document Mapper (ODM) for MongoDB
          in Node.js. It adds schemas, validation, middleware (hooks), virtuals, and a rich query
          API on top of the native driver.
        </p>

        <h3>Schema, Model, and Validation</h3>
        <pre><code>{`const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: [true, 'Name is required'],
    trim:     true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name must be at most 100 characters'],
  },
  email: {
    type:     String,
    required: true,
    unique:   true,
    lowercase: true,
    match:    [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  age: {
    type: Number,
    min:  [0, 'Age cannot be negative'],
    max:  [150, 'Age cannot exceed 150'],
  },
  role: {
    type:    String,
    enum:    ['user', 'admin', 'moderator'],
    default: 'user',
  },
  tags:    [String],
  address: {
    street: String,
    city:   String,
    zip:    { type: String, match: /^\d{5}(-\d{4})?$/ },
  },
}, {
  timestamps: true,  // adds createdAt and updatedAt automatically
  versionKey: false, // remove __v field
});

// Create model (automatically uses lowercase plural collection name: "users")
const User = mongoose.model('User', userSchema);

// Create and save
const alice = new User({ name: 'Alice', email: 'alice@example.com', age: 29 });
await alice.save();

// Model.create() shorthand
const bob = await User.create({ name: 'Bob', email: 'bob@example.com', age: 34 });

// Validation runs on save() and create()
try {
  await User.create({ name: 'X', email: 'not-an-email' });
} catch (err) {
  console.log(err.errors.email.message); // "Invalid email format"
}`}</code></pre>

        <h3>Middleware (Hooks)</h3>
        <pre><code>{`const bcrypt = require('bcryptjs');

// Pre-save middleware — hash password before saving
userSchema.pre('save', async function (next) {
  // "this" refers to the document being saved
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Post-save middleware — runs after save
userSchema.post('save', function (doc, next) {
  console.log(\`User \${doc.email} was saved\`);
  next();
});

// Pre-find middleware — auto-populate or filter soft-deleted docs
userSchema.pre(/^find/, function (next) {
  this.find({ deletedAt: { $exists: false } }); // exclude soft-deleted
  next();
});

// Pre-remove / deleteOne middleware
userSchema.pre('deleteOne', { document: true }, async function (next) {
  // Cascade delete user's posts
  await Post.deleteMany({ author: this._id });
  next();
});`}</code></pre>

        <h3>Virtuals</h3>
        <pre><code>{`// Virtuals — computed properties not stored in MongoDB
userSchema.virtual('fullName').get(function () {
  return \`\${this.firstName} \${this.lastName}\`;
});

userSchema.virtual('fullName').set(function (name) {
  const parts = name.split(' ');
  this.firstName = parts[0];
  this.lastName  = parts.slice(1).join(' ');
});

// Include virtuals when converting to JSON (e.g., for API responses)
userSchema.set('toJSON',   { virtuals: true });
userSchema.set('toObject', { virtuals: true });

// Virtual populate — reference without storing array of IDs
userSchema.virtual('posts', {
  ref:          'Post',
  localField:   '_id',
  foreignField: 'author',
});`}</code></pre>

        <h3>Populate (References)</h3>
        <pre><code>{`const postSchema = new mongoose.Schema({
  title:  String,
  body:   String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
});
const Post = mongoose.model('Post', postSchema);

// Populate — replace ObjectId references with actual documents
const post = await Post
  .findById(postId)
  .populate('author', 'name email -_id')   // select fields from User
  .populate('tags', 'name slug');           // select fields from Tag

console.log(post.author.name); // "Alice Johnson"

// Nested populate
const posts = await Post.find().populate({
  path: 'author',
  select: 'name',
  populate: { path: 'address', select: 'city' } // nested populate
});

// Virtual populate (requires virtual defined on schema)
const userWithPosts = await User.findById(userId).populate('posts');`}</code></pre>

        <h3>Mongoose Query API</h3>
        <pre><code>{`// Chainable query builder
const users = await User
  .find({ isActive: true })
  .where('age').gte(18).lte(65)
  .in('role', ['admin', 'moderator'])
  .select('name email role -_id')
  .sort('-createdAt')
  .skip(page * limit)
  .limit(limit)
  .lean();  // returns plain JS objects instead of Mongoose documents (faster)

// Lean queries are 3-10x faster — use for read-only operations
const count = await User.countDocuments({ isActive: true });

// findByIdAndUpdate with validation
const updated = await User.findByIdAndUpdate(
  userId,
  { $set: { age: 30 } },
  { new: true, runValidators: true } // runValidators: apply schema validation
);

// Bulk write operations
await User.bulkWrite([
  { insertOne: { document: { name: 'Frank', email: 'frank@example.com' } } },
  { updateOne: { filter: { email: 'bob@example.com' }, update: { $set: { age: 35 } } } },
  { deleteOne: { filter: { email: 'old@example.com' } } },
]);`}</code></pre>

        <h2>Multi-Document ACID Transactions</h2>
        <p>
          MongoDB supports multi-document ACID transactions on replica sets (v4.0+) and sharded
          clusters (v4.2+). Use them when you need atomicity across multiple collections or documents.
          Single-document operations are always atomic and do not require a transaction.
        </p>
        <pre><code>{`// Transaction with the native driver
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const session = client.startSession();

try {
  await session.withTransaction(async () => {
    const accounts = client.db('bank').collection('accounts');

    // Debit sender
    await accounts.updateOne(
      { _id: senderId, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { session }
    );

    // Credit receiver
    await accounts.updateOne(
      { _id: receiverId },
      { $inc: { balance: amount } },
      { session }
    );

    // Log the transfer
    await client.db('bank').collection('transfers').insertOne({
      from: senderId, to: receiverId, amount,
      createdAt: new Date(),
    }, { session });
  });

  console.log('Transaction committed successfully');
} catch (error) {
  console.error('Transaction aborted:', error.message);
} finally {
  await session.endSession();
  await client.close();
}

// Mongoose transaction
const session = await mongoose.startSession();
session.startTransaction();
try {
  await Account.updateOne({ _id: senderId }, { $inc: { balance: -amount } }, { session });
  await Account.updateOne({ _id: receiverId }, { $inc: { balance: amount } }, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}`}</code></pre>

        <h2>MongoDB Atlas: Free Tier Setup and Atlas Search</h2>

        <h3>Setting Up a Free M0 Cluster</h3>
        <ol>
          <li>Go to <strong>cloud.mongodb.com</strong> and create a free account.</li>
          <li>Click <strong>Build a Database</strong> and select the <strong>M0 Free</strong> tier.</li>
          <li>Choose a cloud provider (AWS, GCP, or Azure) and the region closest to you.</li>
          <li>Name your cluster (e.g., <code>Cluster0</code>) and click <strong>Create</strong>.</li>
          <li>Set up a database user with a strong password under <strong>Security &gt; Database Access</strong>.</li>
          <li>Add your IP address to the allowlist under <strong>Security &gt; Network Access</strong>.</li>
          <li>Click <strong>Connect</strong> on your cluster to get your connection string.</li>
        </ol>

        <h3>Connection Strings</h3>
        <pre><code>{`// Atlas connection string format
// mongodb+srv://username:password@cluster0.abc123.mongodb.net/dbname?retryWrites=true&w=majority

// .env file (NEVER commit to git)
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/myapp?retryWrites=true&w=majority

// Node.js with the native driver — connection pooling
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi:       { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  maxPoolSize:     10,  // max connections in pool (default: 5)
  minPoolSize:     2,   // min maintained connections
  connectTimeoutMS: 5000,
  socketTimeoutMS:  45000,
});

// Singleton pattern — reuse across requests in serverless
let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  cachedClient = new MongoClient(process.env.MONGODB_URI!);
  await cachedClient.connect();
  return cachedClient;
}

// Mongoose connection with retry
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize:      10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS:  45000,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));`}</code></pre>

        <h3>Atlas Search (Full-Text Search)</h3>
        <pre><code>{`// 1. Create a Search Index in Atlas UI or via API
// Index definition (Atlas Search index, NOT a regular MongoDB index):
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "title":       { "type": "string", "analyzer": "lucene.standard" },
      "description": { "type": "string", "analyzer": "lucene.english" },
      "tags":        { "type": "string" },
      "price":       { "type": "number" }
    }
  }
}

// 2. Query with $search aggregation stage
const results = await db.collection('products').aggregate([
  {
    $search: {
      index: 'default',
      text: {
        query: 'wireless noise cancelling headphones',
        path:  ['title', 'description'],
        fuzzy: { maxEdits: 1 },  // typo tolerance
      },
    },
  },
  { $addFields: { score: { $meta: 'searchScore' } } },
  { $match:  { price: { $lte: 200 } } },
  { $sort:   { score: -1 } },
  { $limit:  10 },
  { $project: { title: 1, price: 1, score: 1 } },
]).toArray();`}</code></pre>

        <h2>Performance Tuning</h2>

        <h3>Index Strategy</h3>
        <ul>
          <li><strong>ESR Rule</strong> — order compound index fields: Equality first, Sort second, Range third.</li>
          <li><strong>Covered queries</strong> — if all fields in the query and projection are in the index, MongoDB reads only the index (no document fetch).</li>
          <li><strong>Avoid index intersection</strong> — MongoDB rarely uses two indexes on the same query; create compound indexes instead.</li>
          <li><strong>Index cardinality</strong> — high-cardinality fields (email, userId) make better index keys than low-cardinality (boolean, status).</li>
        </ul>

        <h3>Projection and Cursor Optimization</h3>
        <pre><code>{`// Always project only needed fields — reduces network transfer
const users = await db.collection('users')
  .find({ isActive: true })
  .project({ name: 1, email: 1, _id: 0 })  // only fetch name and email
  .limit(100)                                // always limit results
  .toArray();

// Use lean() in Mongoose for read-only queries (no Mongoose overhead)
const docs = await User.find({ isActive: true }).select('name email').lean();

// Batch processing with cursor (memory-efficient for millions of docs)
const cursor = db.collection('logs').find({ level: 'error' });
let batch = [];
for await (const doc of cursor) {
  batch.push(doc);
  if (batch.length >= 1000) {
    await processLogs(batch);
    batch = [];
  }
}
if (batch.length > 0) await processLogs(batch);`}</code></pre>

        <h3>Connection Pooling</h3>
        <pre><code>{`// In Express.js — connect once, reuse pool across requests
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect once at startup
mongoose.connect(process.env.MONGODB_URI, { maxPoolSize: 10 });

// In Next.js App Router — use global to survive hot-reloads
declare global { var mongoose: { conn: any; promise: any } | undefined; }

let cached = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI!, { maxPoolSize: 5 });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}`}</code></pre>

        <h2>MongoDB vs PostgreSQL Comparison</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0', fontSize: '0.95em' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', border: '1px solid #cbd5e1', textAlign: 'left' }}>Aspect</th>
              <th style={{ padding: '10px 14px', border: '1px solid #cbd5e1', textAlign: 'left' }}>MongoDB</th>
              <th style={{ padding: '10px 14px', border: '1px solid #cbd5e1', textAlign: 'left' }}>PostgreSQL</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Data model', 'BSON documents in collections', 'Rows and columns in tables'],
              ['Schema', 'Flexible (schema-on-read)', 'Rigid (schema-on-write, migrations)'],
              ['Query language', 'MQL (MongoDB Query Language)', 'SQL (standardized)'],
              ['Joins', '$lookup aggregation stage', 'Full JOIN support, optimized'],
              ['ACID transactions', 'Multi-doc (v4.0+, replica sets)', 'Full ACID since day one'],
              ['Scaling', 'Native horizontal sharding', 'Vertical + read replicas (Citus for sharding)'],
              ['Full-text search', 'Atlas Search (Lucene-based)', 'Built-in tsvector/tsquery, pg_trgm'],
              ['Indexing', 'Single, compound, text, TTL, geo', 'B-tree, hash, GIN, GiST, BRIN, partial'],
              ['JSON support', 'Native (documents are JSON)', 'JSONB type with full operator support'],
              ['Best for', 'Flexible schema, high writes, docs', 'Relational data, complex queries, analytics'],
              ['Managed cloud', 'MongoDB Atlas', 'AWS RDS, Supabase, Neon, Railway'],
              ['License', 'SSPL (Server Side Public License)', 'PostgreSQL License (open source)'],
            ].map(([aspect, mongo, pg], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>{aspect}</td>
                <td style={{ padding: '8px 14px', border: '1px solid #e2e8f0' }}>{mongo}</td>
                <td style={{ padding: '8px 14px', border: '1px solid #e2e8f0' }}>{pg}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Security Best Practices</h2>

        <h3>Authentication and Role-Based Access Control</h3>
        <pre><code>{`// Create a dedicated database user with minimal privileges
// Run in mongosh on the admin database:

// Application user — read/write to one database
db.createUser({
  user: 'appuser',
  pwd:  passwordPrompt(), // secure: prompts for password interactively
  roles: [{ role: 'readWrite', db: 'myapp' }]
});

// Read-only user for analytics
db.createUser({
  user: 'readonly',
  pwd:  passwordPrompt(),
  roles: [{ role: 'read', db: 'myapp' }]
});

// Built-in roles: read, readWrite, dbAdmin, userAdmin, clusterAdmin
// Custom role with specific collection access
db.createRole({
  role: 'ordersWriter',
  privileges: [{
    resource: { db: 'myapp', collection: 'orders' },
    actions:  ['find', 'insert', 'update']
  }],
  roles: []
});`}</code></pre>

        <h3>Network Access and TLS</h3>
        <pre><code>{`# mongod.conf — production security settings
security:
  authorization: enabled          # require auth for all connections
  javascriptEnabled: false        # disable server-side JS (security)

net:
  tls:
    mode: requireTLS              # enforce TLS for all connections
    certificateKeyFile: /etc/ssl/mongodb.pem
    CAFile: /etc/ssl/ca.pem
  bindIp: 127.0.0.1,10.0.0.5    # bind only to necessary interfaces
  port: 27017

# Atlas: use IP Access List + VPC Peering for production
# Never expose 0.0.0.0/0 in Atlas Network Access`}</code></pre>

        <h3>Field-Level Encryption (CSFLE)</h3>
        <pre><code>{`// Client-Side Field Level Encryption (CSFLE) — MongoDB 4.2+
// Encrypts specific fields before sending to server
// Server never sees plaintext — not even MongoDB Atlas

const { ClientEncryption } = require('mongodb-client-encryption');

const encryptionOpts = {
  keyVaultNamespace: 'encryption.__keyVault',
  kmsProviders: {
    local: { key: Buffer.from(process.env.MASTER_KEY_BASE64, 'base64') }
  },
  schemaMap: {
    'myapp.users': {
      bsonType: 'object',
      properties: {
        ssn: {
          encrypt: {
            bsonType: 'string',
            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic'
          }
        },
        creditCard: {
          encrypt: {
            bsonType: 'string',
            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'
          }
        }
      }
    }
  }
};

const secureClient = new MongoClient(uri, { autoEncryption: encryptionOpts });`}</code></pre>

        <h2>Frequently Asked Questions</h2>

        <h3>1. What is MongoDB and when should I use it?</h3>
        <p>
          MongoDB is a document-oriented NoSQL database that stores data in flexible JSON-like BSON
          documents. Use it when you need a flexible schema for rapidly evolving data, high write
          throughput, horizontal scaling via sharding, or when your data model naturally fits
          hierarchical documents — user profiles, product catalogs, CMS content, real-time analytics,
          and IoT data are all excellent fits.
        </p>

        <h3>2. What is the difference between MongoDB and a SQL database?</h3>
        <p>
          MongoDB stores data as documents (JSON/BSON) in collections; SQL databases store data in
          rows and tables with a rigid schema. MongoDB offers flexible schemas and horizontal scaling;
          SQL databases offer strong ACID guarantees, complex JOINs, and a standardized query language.
          Choose MongoDB for document-oriented, write-heavy workloads. Choose SQL for relational,
          transactional, and analytical workloads.
        </p>

        <h3>3. How do I connect to MongoDB in Node.js?</h3>
        <p>
          Use the official MongoDB Node.js driver (<code>mongodb</code> package) or Mongoose ODM
          (<code>mongoose</code>). Always store the connection URI in environment variables, use
          connection pooling (<code>maxPoolSize</code>), and implement a singleton pattern to avoid
          creating multiple connections in serverless environments.
        </p>

        <h3>4. What is the aggregation pipeline in MongoDB?</h3>
        <p>
          The aggregation pipeline processes documents through a sequence of stages. Key stages
          include <code>$match</code> (filter), <code>$group</code> (aggregate), <code>$project</code>
          (reshape), <code>$sort</code>, <code>$limit</code>, <code>$lookup</code> (join across
          collections), and <code>$unwind</code> (flatten arrays). It replaces SQL GROUP BY, JOIN,
          and window functions with a powerful, composable pipeline.
        </p>

        <h3>5. How do MongoDB indexes work and which type should I use?</h3>
        <p>
          Indexes store a sorted subset of fields, allowing the query engine to find matching
          documents without scanning every document. Start with single-field indexes on frequently
          queried fields. Use compound indexes for multi-field queries (follow the ESR rule). Use
          text indexes for full-text search. Use TTL indexes to auto-expire session or log data.
          Always run <code>explain()</code> to confirm your index is being used.
        </p>

        <h3>6. Should I embed or reference documents in MongoDB?</h3>
        <p>
          Embed when: data is always accessed together, the relationship is one-to-few, and the
          embedded array is bounded in size. Reference when: data is accessed independently, the
          relationship is one-to-many or many-to-many, or when an embedded array would grow
          unbounded. A common hybrid approach is the Extended Reference Pattern — embed the most
          read fields and keep the full document as a reference.
        </p>

        <h3>7. Does MongoDB support ACID transactions?</h3>
        <p>
          Yes. Multi-document ACID transactions are supported on replica sets (v4.0+) and sharded
          clusters (v4.2+). Use <code>session.withTransaction()</code> for automatic retry on
          transient errors. Note: single-document operations are always atomic and cover most use
          cases. Good schema design with embedding often eliminates the need for multi-document
          transactions.
        </p>

        <h3>8. What is MongoDB Atlas and is the free tier good enough to start?</h3>
        <p>
          MongoDB Atlas is the fully managed cloud database service from MongoDB Inc. The M0 free
          tier provides 512MB storage, shared CPU and RAM, and supports up to 100 simultaneous
          connections. It is excellent for development, learning, and small applications. For
          production workloads with performance requirements, upgrade to M10+ (dedicated cluster)
          which provides dedicated RAM, automated backups, point-in-time recovery, and Atlas Search.
        </p>
      </>
    ),
  },
  zh: {
    title: 'MongoDB 完整指南：面向开发者的 NoSQL 数据库教程',
    description:
      '从基础到生产环境掌握 MongoDB：CRUD 操作、聚合管道、索引、Mongoose ODM、事务、Atlas 搭建、性能调优与安全最佳实践。',
    content: (
      <>
        {/* JSON-LD FAQPage Schema (Chinese) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'MongoDB 是什么？什么时候应该使用它？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MongoDB 是一个面向文档的 NoSQL 数据库，以灵活的 JSON 格式（BSON）存储数据。当你需要灵活的数据结构、高写入吞吐量、水平扩展，或者数据模型天然适合文档结构时使用它——例如用户档案、产品目录、内容管理系统和实时分析。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'MongoDB 和 SQL 数据库有什么区别？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MongoDB 以文档形式（JSON/BSON）存储数据，集合无固定结构；SQL 数据库以行和列存储，需预先定义 Schema。MongoDB 提供灵活的 Schema 和水平扩展；SQL 提供完整的 ACID 事务、复杂 JOIN 和标准化查询语言。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '如何在 Node.js 中连接 MongoDB？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '使用官方 MongoDB Node.js 驱动（mongodb 包）或 Mongoose ODM。始终将连接 URI 存储在环境变量中，使用连接池（maxPoolSize），并在无服务器环境中使用单例模式避免创建多个连接。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '什么是 MongoDB 聚合管道？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '聚合管道通过一系列阶段处理文档。关键阶段包括 $match（过滤）、$group（聚合）、$project（重塑）、$sort、$limit、$lookup（跨集合关联）和 $unwind（展开数组）。它相当于 SQL 中的 GROUP BY、JOIN 和窗口函数的组合。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'MongoDB 索引如何工作？应该使用哪种类型？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '索引存储字段的有序子集，使查询引擎无需扫描每个文档就能找到匹配项。对高频查询字段使用单字段索引；对多字段查询使用复合索引（遵循 ESR 规则）；对全文搜索使用文本索引；对会话或日志数据自动过期使用 TTL 索引。始终运行 explain() 确认索引被使用。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'MongoDB 中文档应该嵌入还是引用？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '以下情况嵌入：数据总是一起访问、一对少关系、嵌入数组有界。以下情况引用：数据独立访问、一对多或多对多关系、嵌入数组会无限增长。常见混合方案是扩展引用模式——嵌入最常读取的字段，完整文档单独存储。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'MongoDB 支持 ACID 事务吗？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '支持。从 MongoDB 4.0 起，在副本集上支持多文档 ACID 事务；从 4.2 起支持分片集群。使用 session.withTransaction() 处理瞬时错误的自动重试。单文档操作始终是原子的，良好的 Schema 设计通常可以消除多文档事务的需求。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'MongoDB Atlas 是什么？免费套餐够用吗？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MongoDB Atlas 是 MongoDB 官方的全托管云数据库服务。M0 免费套餐提供 512MB 存储、共享 CPU 和内存、最多 100 个并发连接，非常适合开发、学习和小型应用。生产环境建议升级到 M10+（专用集群），提供专用内存、自动备份、时间点恢复和 Atlas Search。',
                  },
                },
              ],
            }),
          }}
        />

        {/* TL;DR Box (Chinese) */}
        <div
          style={{
            background: '#f0f9ff',
            border: '2px solid #0ea5e9',
            borderRadius: '8px',
            padding: '20px 24px',
            marginBottom: '32px',
          }}
        >
          <strong style={{ fontSize: '1.1em', color: '#0369a1' }}>TL;DR（核心要点）</strong>
          <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>MongoDB 以 BSON 文档形式存储数据，无需固定 Schema。</li>
            <li>掌握 CRUD：<code>insertOne</code>、<code>find</code>、<code>updateOne</code>、<code>deleteOne</code> 及其批量版本。</li>
            <li>聚合管道用于分析：<code>$match</code>、<code>$group</code>、<code>$lookup</code>、<code>$project</code>。</li>
            <li>创建合适的索引，运行 <code>explain()</code> 确认索引被使用。</li>
            <li>Mongoose 为 Node.js 应用添加 Schema 验证、中间件、虚拟字段和 <code>populate()</code>。</li>
            <li>MongoDB Atlas M0 免费套餐适合原型开发；生产环境升级到 M10。</li>
          </ul>
        </div>

        <h2>简介：为什么选择 MongoDB？</h2>
        <p>
          MongoDB 是全球最流行的 NoSQL 数据库，被 Forbes、SEGA、eBay 和 Adobe 等公司广泛使用。
          它于 2009 年发布，以灵活的类 JSON 文档存储数据，而非传统的行和列，非常适合数据结构快速
          演进的现代应用程序。
        </p>
        <p>
          与关系型数据库需要预先定义 Schema 并为每次变更运行迁移不同，MongoDB 允许在同一集合中
          插入具有不同字段的文档。这种文档模型与应用代码中对象的形态天然契合，消除了对象-关系阻抗失配问题。
        </p>

        {/* Key Takeaways (Chinese) */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '20px 24px',
            marginBottom: '32px',
          }}
        >
          <strong style={{ fontSize: '1.05em', color: '#334155' }}>关键要点</strong>
          <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px', lineHeight: '1.8', color: '#475569' }}>
            <li>文档替代行，集合替代表，BSON 用额外类型扩展了 JSON。</li>
            <li>每个文档都有唯一的 <code>_id</code> 字段（默认为 ObjectId）。</li>
            <li>聚合管道是 MongoDB 对 SQL 中 GROUP BY + JOIN + 窗口函数的回应。</li>
            <li>复合索引的字段顺序和排序方向对性能至关重要。</li>
            <li>嵌入 vs 引用是 MongoDB 中最重要的 Schema 设计决策。</li>
            <li>多文档事务在副本集和分片集群上可用（v4.0+）。</li>
            <li>始终将连接 URI 存储在环境变量中，绝不写入源代码。</li>
          </ul>
        </div>

        <h2>基础概念：文档、集合、BSON 与 _id</h2>

        <h3>文档与集合</h3>
        <p>
          在 MongoDB 中，<strong>文档</strong>是数据的基本单位，是以 BSON 格式存储的键值对有序集合。
          <strong>集合</strong>是文档的组合，类似于 SQL 中的表。与 SQL 表不同，集合不强制 Schema，
          同一集合中的文档可以拥有不同的字段。
        </p>
        <pre><code>{`// "users" 集合中的示例文档
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c0d1"),
  "name": "张三",
  "email": "zhangsan@example.com",
  "age": 29,
  "address": {
    "street": "南京路 123 号",
    "city": "上海",
    "zip": "200000"
  },
  "tags": ["开发者", "nodejs", "mongodb"],
  "createdAt": ISODate("2024-09-01T00:00:00Z"),
  "isActive": true
}`}</code></pre>

        <h3>BSON：二进制 JSON</h3>
        <p>
          MongoDB 以 <strong>BSON</strong>（Binary JSON）格式存储文档。BSON 扩展了 JSON，支持
          额外的数据类型：
        </p>
        <ul>
          <li><strong>ObjectId</strong> — 12 字节文档唯一标识符</li>
          <li><strong>Date</strong> — 以 64 位整数毫秒存储的 UTC 日期时间</li>
          <li><strong>Binary</strong> — 任意二进制数据</li>
          <li><strong>Decimal128</strong> — 高精度浮点数，用于金融数据</li>
          <li><strong>Int32 / Int64</strong> — 显式整数类型（JSON 只有 Number）</li>
        </ul>

        <h2>CRUD 操作</h2>

        <h3>插入：insertOne 和 insertMany</h3>
        <pre><code>{`const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('myapp');
const users = db.collection('users');

// insertOne — 返回 { acknowledged, insertedId }
const result = await users.insertOne({
  name: '李四',
  email: 'lisi@example.com',
  age: 34,
  createdAt: new Date(),
});
console.log('插入 ID:', result.insertedId);

// insertMany — 返回 { acknowledged, insertedCount, insertedIds }
const bulk = await users.insertMany([
  { name: '王五',  email: 'wangwu@example.com',  age: 27 },
  { name: '赵六',  email: 'zhaoliu@example.com', age: 31 },
], { ordered: false }); // ordered:false 遇到错误继续执行
console.log('已插入:', bulk.insertedCount);`}</code></pre>

        <h3>查询：find 和 findOne</h3>
        <pre><code>{`// findOne — 返回第一条匹配文档或 null
const user = await users.findOne({ email: 'lisi@example.com' });

// find — 返回游标；使用 .toArray() 或异步迭代
const activeUsers = await users
  .find({ isActive: true, age: { $gte: 18 } })
  .sort({ createdAt: -1 })
  .skip(0)
  .limit(20)
  .project({ name: 1, email: 1, _id: 0 })
  .toArray();

// 统计文档数量
const count = await users.countDocuments({ isActive: true });`}</code></pre>

        <h3>更新：updateOne 和 updateMany</h3>
        <pre><code>{`// updateOne — 更新第一条匹配文档
await users.updateOne(
  { email: 'lisi@example.com' },
  {
    $set:  { age: 35, 'address.city': '北京' },
    $push: { tags: '高级开发者' },
    $inc:  { loginCount: 1 },
    $currentDate: { lastModified: true },
  }
);

// updateMany — 更新所有匹配文档
await users.updateMany(
  { isActive: false },
  { $set: { archived: true } }
);

// upsert — 找不到则插入
await users.updateOne(
  { email: 'newuser@example.com' },
  { $setOnInsert: { name: '新用户', createdAt: new Date() } },
  { upsert: true }
);`}</code></pre>

        <h3>删除：deleteOne 和 deleteMany</h3>
        <pre><code>{`// deleteOne — 删除第一条匹配文档
const result = await users.deleteOne({ email: 'lisi@example.com' });
console.log('已删除:', result.deletedCount);

// deleteMany — 删除所有匹配文档
await users.deleteMany({ archived: true });`}</code></pre>

        <h2>查询操作符</h2>
        <pre><code>{`// 比较操作符
{ age: { $eq: 30 } }    // 等于
{ age: { $gt: 25 } }    // 大于
{ age: { $gte: 25 } }   // 大于等于
{ age: { $lt: 60 } }    // 小于
{ age: { $lte: 60 } }   // 小于等于
{ status: { $in: ['active', 'trial'] } }   // 在数组中
{ status: { $nin: ['banned'] } }           // 不在数组中

// 逻辑操作符
{ $and: [{ age: { $gte: 18 } }, { isActive: true }] }
{ $or:  [{ city: '上海' }, { city: '北京' }] }
{ age: { $not: { $lt: 18 } } }

// 元素操作符
{ phone: { $exists: true } }   // 字段存在
{ age:   { $type: 'int' } }    // BSON 类型检查

// 正则与文本
{ name: { $regex: /^张/i } }
{ $text: { $search: 'mongodb 指南' } }

// 数组操作符
{ tags: 'nodejs' }                          // 数组包含元素
{ tags: { $all: ['nodejs', 'react'] } }     // 包含所有元素
{ scores: { $elemMatch: { $gte: 80 } } }    // 至少一个元素匹配`}</code></pre>

        <h2>聚合管道</h2>
        <pre><code>{`// 按分类统计 2024 年已完成订单的营收
const report = await db.collection('orders').aggregate([
  // 过滤
  { $match: {
    status: 'completed',
    createdAt: { $gte: new Date('2024-01-01'), $lt: new Date('2025-01-01') }
  }},

  // 关联产品集合（类似 SQL LEFT JOIN）
  { $lookup: {
    from: 'products', localField: 'productId',
    foreignField: '_id', as: 'productDetails',
  }},

  // 展开关联数组
  { $unwind: '$productDetails' },

  // 按分类聚合
  { $group: {
    _id: '$productDetails.category',
    totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
    orderCount:   { $sum: 1 },
    avgOrder:     { $avg: { $multiply: ['$quantity', '$price'] } },
  }},

  // 重塑输出
  { $project: {
    _id:          0,
    category:     '$_id',
    totalRevenue: { $round: ['$totalRevenue', 2] },
    orderCount:   1,
  }},

  // 排序
  { $sort: { totalRevenue: -1 } },
  { $limit: 10 },
]).toArray();`}</code></pre>

        <h2>索引策略</h2>
        <pre><code>{`// 单字段索引
await users.createIndex({ email: 1 }, { unique: true });

// 复合索引（遵循 ESR 规则：等值→排序→范围）
await users.createIndex({ isActive: 1, age: 1, createdAt: -1 });

// 文本索引（全文搜索）
await db.collection('articles').createIndex(
  { title: 'text', body: 'text' },
  { weights: { title: 10, body: 1 } }
);

// TTL 索引（自动过期）
await db.collection('sessions').createIndex(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

// 使用 explain() 分析查询性能
const explanation = await users
  .find({ isActive: true, age: { $gte: 25 } })
  .explain('executionStats');

// COLLSCAN = 全表扫描（不好），IXSCAN = 索引扫描（好）
console.log(explanation.executionStats.executionStages.stage);`}</code></pre>

        <h2>Mongoose ODM</h2>
        <pre><code>{`const mongoose = require('mongoose');

// 定义 Schema
const userSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age:   { type: Number, min: 0, max: 150 },
  role:  { type: String, enum: ['user', 'admin'], default: 'user' },
  tags:  [String],
}, { timestamps: true, versionKey: false });

// 中间件（钩子）
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// 虚拟字段
userSchema.virtual('fullName').get(function () {
  return \`\${this.firstName} \${this.lastName}\`;
});

// 创建模型
const User = mongoose.model('User', userSchema);

// 使用 populate() 填充关联文档
const post = await Post.findById(postId)
  .populate('author', 'name email -_id')
  .populate('tags', 'name slug');

// lean() 返回普通 JS 对象（性能提升 3-10 倍）
const docs = await User.find({ isActive: true }).lean();`}</code></pre>

        <h2>多文档事务</h2>
        <pre><code>{`// Mongoose 事务示例
const session = await mongoose.startSession();
session.startTransaction();

try {
  // 转账：扣减发送方余额
  await Account.updateOne(
    { _id: senderId, balance: { $gte: amount } },
    { $inc: { balance: -amount } },
    { session }
  );

  // 增加接收方余额
  await Account.updateOne(
    { _id: receiverId },
    { $inc: { balance: amount } },
    { session }
  );

  await session.commitTransaction();
  console.log('转账成功');
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}`}</code></pre>

        <h2>MongoDB vs PostgreSQL 对比</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0', fontSize: '0.95em' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', border: '1px solid #cbd5e1', textAlign: 'left' }}>对比维度</th>
              <th style={{ padding: '10px 14px', border: '1px solid #cbd5e1', textAlign: 'left' }}>MongoDB</th>
              <th style={{ padding: '10px 14px', border: '1px solid #cbd5e1', textAlign: 'left' }}>PostgreSQL</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['数据模型', '集合中的 BSON 文档', '表中的行和列'],
              ['Schema', '灵活（读时 Schema）', '严格（需提前定义和迁移）'],
              ['查询语言', 'MQL（MongoDB 查询语言）', 'SQL（标准化）'],
              ['JOIN', '$lookup 聚合阶段', '完整 JOIN 支持，性能优化'],
              ['ACID 事务', '多文档（v4.0+，副本集）', '内置完整 ACID'],
              ['扩展', '原生水平分片', '垂直扩展 + 读副本'],
              ['全文搜索', 'Atlas Search（基于 Lucene）', '内置 tsvector/tsquery'],
              ['最适合', '灵活 Schema、高写入、文档数据', '关系数据、复杂查询、分析'],
            ].map(([aspect, mongo, pg], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>{aspect}</td>
                <td style={{ padding: '8px 14px', border: '1px solid #e2e8f0' }}>{mongo}</td>
                <td style={{ padding: '8px 14px', border: '1px solid #e2e8f0' }}>{pg}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>安全最佳实践</h2>

        <h3>认证与基于角色的访问控制</h3>
        <pre><code>{`// 在 admin 数据库中创建专用用户
db.createUser({
  user: 'appuser',
  pwd:  passwordPrompt(),
  roles: [{ role: 'readWrite', db: 'myapp' }]
});

// 只读用户（用于分析）
db.createUser({
  user: 'readonly',
  pwd:  passwordPrompt(),
  roles: [{ role: 'read', db: 'myapp' }]
});`}</code></pre>

        <h3>网络访问与 TLS</h3>
        <pre><code>{`# mongod.conf 生产安全配置
security:
  authorization: enabled     # 所有连接必须认证
  javascriptEnabled: false   # 禁用服务器端 JS

net:
  tls:
    mode: requireTLS         # 强制 TLS 加密
    certificateKeyFile: /etc/ssl/mongodb.pem
  bindIp: 127.0.0.1          # 只绑定必要接口

# Atlas：使用 IP 访问列表 + VPC Peering
# 生产环境禁止 0.0.0.0/0`}</code></pre>

        <h2>常见问题</h2>

        <h3>1. MongoDB 是什么？什么时候使用？</h3>
        <p>
          MongoDB 是面向文档的 NoSQL 数据库，以灵活的 BSON 文档存储数据。适用于：需要灵活 Schema、
          高写入吞吐量、水平扩展，或数据模型天然适合文档结构的场景——用户档案、产品目录、内容管理、
          实时分析和 IoT 数据都是绝佳选择。
        </p>

        <h3>2. 如何在 Node.js 中连接 MongoDB？</h3>
        <p>
          使用官方 <code>mongodb</code> 包或 Mongoose ODM。将连接 URI 存储在 <code>.env</code> 文件中，
          配置连接池（<code>maxPoolSize: 10</code>），在无服务器环境中使用单例模式避免重复连接。
        </p>

        <h3>3. 嵌入还是引用？</h3>
        <p>
          <strong>嵌入</strong>：数据总是一起访问、一对少关系、数组有界（少于几百条）。
          <strong>引用</strong>：数据独立访问、一对多或多对多、嵌入数组无限增长。
          混合方案：扩展引用模式——嵌入最常读取的字段，完整数据单独存储。
        </p>

        <h3>4. MongoDB 支持事务吗？</h3>
        <p>
          支持。从 v4.0 起，副本集上支持多文档 ACID 事务；v4.2 起支持分片集群。
          使用 <code>session.withTransaction()</code> 处理瞬时错误的自动重试。
          良好的 Schema 设计（嵌入）通常可以消除事务的需求。
        </p>

        <h3>5. Atlas 免费套餐够用吗？</h3>
        <p>
          M0 免费套餐（512MB 存储，共享 CPU）适合开发、学习和小型应用。
          生产环境升级到 M10+，获得专用内存、自动备份、时间点恢复和 Atlas Search 能力。
        </p>
      </>
    ),
  },
};

export default function MongoDBGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] ?? translations.en;
  return (
    <article style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.7', color: '#1e293b', maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 800, marginBottom: '8px', color: '#0f172a' }}>{t.title}</h1>
      <p style={{ fontSize: '1.1em', color: '#475569', marginBottom: '32px' }}>{t.description}</p>
      {t.content}
    </article>
  );
}
