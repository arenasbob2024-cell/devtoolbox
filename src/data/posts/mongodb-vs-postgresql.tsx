'use client';

import Link from 'next/link';

export default function MongodbVsPostgresql({ lang }: { lang: string }) {
  return (
    <>
      <h2>MongoDB vs PostgreSQL: The Great Database Debate</h2>
      <p>
        Choosing between <strong>MongoDB</strong> and <strong>PostgreSQL</strong> is one of the most common architectural decisions developers face. MongoDB is the leading NoSQL document database, storing data as flexible JSON-like documents. PostgreSQL is the most advanced open-source relational database, known for its reliability, feature richness, and SQL compliance. Both are excellent choices, but they excel in different scenarios.
      </p>
      <p>
        This guide provides a detailed, practical comparison to help you make the right choice for your project in 2026. We cover data modeling, performance, scaling, ecosystem, and real-world use cases with code examples for both databases.
      </p>

      <h2>Architecture Overview</h2>
      <pre><code className="language-text">{`MongoDB (Document Database):
  Database -> Collections -> Documents (BSON/JSON)

  {
    "_id": ObjectId("..."),
    "name": "John Doe",
    "email": "john@example.com",
    "orders": [
      { "product": "Widget", "qty": 2, "price": 19.99 },
      { "product": "Gadget", "qty": 1, "price": 49.99 }
    ],
    "address": {
      "street": "123 Main St",
      "city": "Springfield"
    }
  }

PostgreSQL (Relational Database):
  Database -> Schemas -> Tables -> Rows + Columns

  users:         | id  | name     | email            |
                 | 1   | John Doe | john@example.com |

  orders:        | id | user_id | product | qty | price |
                 | 1  | 1       | Widget  | 2   | 19.99 |
                 | 2  | 1       | Gadget  | 1   | 49.99 |

  addresses:     | id | user_id | street       | city        |
                 | 1  | 1       | 123 Main St  | Springfield |`}</code></pre>

      <h2>Feature-by-Feature Comparison</h2>
      <pre><code className="language-text">{`Feature              MongoDB                    PostgreSQL
-----------------    -------------------------  -------------------------
Data Model           Documents (JSON/BSON)      Tables with rows/columns
Schema               Flexible / schema-less     Strict schema (migrations)
Query Language       MQL (MongoDB Query Lang)   SQL
Joins                $lookup (limited)          Full JOIN support
Transactions         Multi-doc since v4.0       Full ACID since always
Indexing             B-tree, text, geospatial   B-tree, hash, GiST, GIN, BRIN
Full-Text Search     Built-in (Atlas Search)    Built-in (tsvector)
JSON Support         Native (BSON)              JSONB column type
Geospatial           GeoJSON, 2dsphere          PostGIS extension
Replication          Replica Sets (automatic)   Streaming replication
Sharding             Built-in (horizontal)      Citus extension / partitioning
License              SSPL (source available)    PostgreSQL License (true OSS)
Cloud Service        MongoDB Atlas              Many (Supabase, Neon, RDS)`}</code></pre>

      <h2>Data Modeling: Documents vs Relations</h2>
      <h3>MongoDB: Embedding vs Referencing</h3>
      <pre><code className="language-javascript">{`// MongoDB: Embedded document (denormalized)
// Best when data is accessed together and doesn't change independently
db.users.insertOne({
  name: "Jane Smith",
  email: "jane@example.com",
  profile: {
    bio: "Full-stack developer",
    avatar: "https://cdn.example.com/jane.jpg",
    skills: ["TypeScript", "React", "Node.js"],
  },
  // Embed orders directly (good for 1:few relationships)
  recentOrders: [
    {
      orderId: "ORD-001",
      product: "Pro Plan",
      amount: 29.99,
      date: new Date("2026-01-15"),
    },
  ],
});

// MongoDB: Referenced document (normalized)
// Best when data is shared across documents or changes independently
db.users.insertOne({
  _id: ObjectId("user123"),
  name: "Jane Smith",
  email: "jane@example.com",
});

db.orders.insertMany([
  {
    userId: ObjectId("user123"),   // reference
    product: "Pro Plan",
    amount: 29.99,
    date: new Date("2026-01-15"),
  },
  {
    userId: ObjectId("user123"),
    product: "Enterprise Plan",
    amount: 99.99,
    date: new Date("2026-02-01"),
  },
]);

// Join with $lookup (aggregation pipeline)
db.users.aggregate([
  { $match: { email: "jane@example.com" } },
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "orders",
    },
  },
]);`}</code></pre>

      <h3>PostgreSQL: Normalized Schema</h3>
      <pre><code className="language-sql">{`-- PostgreSQL: Normalized relational schema
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  bio         TEXT,
  avatar_url  VARCHAR(500),
  skills      TEXT[],                           -- array type
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product     VARCHAR(200) NOT NULL,
  amount      DECIMAL(10,2) NOT NULL,
  status      VARCHAR(20) DEFAULT 'pending',
  ordered_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Query with JOIN (natural in SQL)
SELECT u.name, u.email, o.product, o.amount, o.ordered_at
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.email = 'jane@example.com'
ORDER BY o.ordered_at DESC;

-- PostgreSQL also supports JSON!
CREATE TABLE events (
  id        SERIAL PRIMARY KEY,
  type      VARCHAR(50) NOT NULL,
  payload   JSONB NOT NULL,          -- flexible JSON column
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Query JSONB fields
SELECT * FROM events
WHERE payload->>'userId' = '123'
  AND payload->'metadata'->>'source' = 'api';

-- Index JSONB for fast queries
CREATE INDEX idx_events_payload ON events USING GIN (payload);`}</code></pre>

      <h2>CRUD Operations Comparison</h2>
      <pre><code className="language-javascript">{`// ========= CREATE =========

// MongoDB
db.products.insertOne({
  name: "Wireless Keyboard",
  price: 79.99,
  category: "Electronics",
  tags: ["wireless", "bluetooth", "ergonomic"],
  specs: { weight: "450g", battery: "AAA x 2" },
});

// PostgreSQL
// INSERT INTO products (name, price, category, tags)
// VALUES ('Wireless Keyboard', 79.99, 'Electronics',
//         ARRAY['wireless', 'bluetooth', 'ergonomic']);


// ========= READ =========

// MongoDB: find with filter and projection
db.products.find(
  { category: "Electronics", price: { $lt: 100 } },
  { name: 1, price: 1, _id: 0 }
).sort({ price: -1 }).limit(10);

// PostgreSQL
// SELECT name, price FROM products
// WHERE category = 'Electronics' AND price < 100
// ORDER BY price DESC LIMIT 10;


// ========= UPDATE =========

// MongoDB: update specific fields
db.products.updateOne(
  { name: "Wireless Keyboard" },
  {
    $set: { price: 69.99 },
    $push: { tags: "sale" },
    $inc: { "stats.views": 1 },
  }
);

// PostgreSQL
// UPDATE products
// SET price = 69.99,
//     tags = array_append(tags, 'sale')
// WHERE name = 'Wireless Keyboard';


// ========= DELETE =========

// MongoDB
db.products.deleteMany({ category: "Discontinued" });

// PostgreSQL
// DELETE FROM products WHERE category = 'Discontinued';`}</code></pre>

      <h2>Performance Characteristics</h2>
      <pre><code className="language-text">{`Scenario                    MongoDB              PostgreSQL
--------------------------  -------------------  -------------------
Simple key-value lookups    Very fast             Fast
Complex JOINs (3+ tables)  Slow ($lookup)        Very fast (optimized)
Write-heavy workloads       Excellent             Good
Read-heavy with indexes     Excellent             Excellent
Full-text search            Good (Atlas Search)   Good (tsvector)
Aggregation/Analytics       Good (pipeline)       Excellent (window functions)
Geospatial queries          Excellent             Excellent (PostGIS)
Time-series data            Good (time-series)    Good (TimescaleDB)
Bulk inserts                Excellent             Good (COPY command)
Schema migrations           Not needed            Required (can be slow)

Typical Benchmarks (approximate, varies by hardware):
  Single document read:     ~0.5ms (both)
  Bulk insert (100K rows):  MongoDB ~2s, PostgreSQL ~3s
  Complex JOIN (5 tables):  PostgreSQL ~5ms, MongoDB $lookup ~50ms+
  Full-text search:         Both ~10-50ms with proper indexes`}</code></pre>

      <h2>Scaling Strategies</h2>
      <pre><code className="language-text">{`MongoDB Scaling:
  Vertical:    Increase RAM/CPU (Atlas: up to M700)
  Horizontal:  Built-in sharding
               - Choose a shard key (e.g., userId, region)
               - Data distributed across shards automatically
               - Mongos router handles query distribution

  Replica Set: 3+ nodes for high availability
               - 1 primary (writes) + 2 secondaries (reads)
               - Automatic failover

PostgreSQL Scaling:
  Vertical:    Increase RAM/CPU (most common approach)
  Read Replicas: Streaming replication
                 - 1 primary (writes) + N replicas (reads)
                 - pgBouncer for connection pooling
  Horizontal:  Options available but more complex
               - Citus extension (distributed tables)
               - Partitioning (range, list, hash)
               - Application-level sharding

  Serverless:  Neon, Supabase, Aurora Serverless
               - Auto-scaling, pay per usage
               - Branching (Neon) for dev/preview

Rule of Thumb:
  < 100 GB data:      Either works fine, vertical scaling
  100 GB - 1 TB:      PostgreSQL with read replicas
                       MongoDB with replica set
  > 1 TB:             MongoDB sharding is easier
                       PostgreSQL needs Citus or partitioning`}</code></pre>

      <h2>When to Choose MongoDB</h2>
      <pre><code className="language-text">{`Choose MongoDB when:

  1. Flexible Schema
     - Rapid prototyping, MVP development
     - Data structure changes frequently
     - Different documents have different fields
     - Example: CMS content types, IoT sensor data

  2. Document-Oriented Data
     - Data is naturally hierarchical (nested objects)
     - You read/write entire documents together
     - Example: Product catalogs, user profiles with preferences

  3. Horizontal Scaling
     - You expect to scale beyond a single server
     - Built-in sharding is a priority
     - Example: High-traffic apps, social media feeds

  4. Real-Time Analytics
     - Aggregation pipeline for data processing
     - Change streams for real-time event processing
     - Example: Dashboards, live metrics

  5. Developer Experience
     - JSON-native interface
     - No schema migrations to manage
     - MongoDB Atlas provides a fully managed experience`}</code></pre>

      <h2>When to Choose PostgreSQL</h2>
      <pre><code className="language-text">{`Choose PostgreSQL when:

  1. Complex Relationships
     - Many-to-many relationships
     - Complex JOINs are common
     - Referential integrity is critical
     - Example: E-commerce, ERP, financial systems

  2. Data Integrity
     - Strict schema validation is needed
     - Full ACID compliance is essential
     - Example: Banking, healthcare, inventory

  3. Advanced Queries
     - Window functions, CTEs, recursive queries
     - Complex aggregations and reporting
     - Example: Analytics platforms, BI tools

  4. Hybrid Data
     - Need both relational and JSON data
     - JSONB gives you document flexibility within SQL
     - Example: Event sourcing, configuration storage

  5. Ecosystem and Extensions
     - PostGIS for geospatial
     - TimescaleDB for time-series
     - pgvector for AI embeddings
     - Example: Location-based apps, ML pipelines

  6. Open Source Priority
     - True open-source license (PostgreSQL License)
     - No vendor lock-in concerns
     - Large community and tooling ecosystem`}</code></pre>

      <h2>Using Both Together</h2>
      <p>
        Many production architectures use both databases for different purposes. This polyglot persistence approach leverages the strengths of each database.
      </p>
      <pre><code className="language-text">{`Common Hybrid Architecture:

  PostgreSQL handles:
    - User accounts and authentication
    - Financial transactions and billing
    - Relational business data (orders, inventory)
    - Reporting and analytics

  MongoDB handles:
    - Session storage
    - Content management (blog posts, pages)
    - Activity logs and audit trails
    - Product catalogs with variable attributes
    - Real-time chat messages

  Example Stack:
    Next.js  ->  Prisma (PostgreSQL)  +  Mongoose (MongoDB)
    Express  ->  Drizzle (PostgreSQL)  +  MongoDB Driver`}</code></pre>

      <h2>ORM and Driver Comparison</h2>
      <pre><code className="language-typescript">{`// MongoDB with Mongoose (Node.js)
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  orders: [{
    product: String,
    amount: Number,
    date: { type: Date, default: Date.now },
  }],
});

const User = mongoose.model('User', userSchema);

const user = await User.findOne({ email: 'jane@example.com' })
  .select('name email orders')
  .lean();

// PostgreSQL with Prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const user = await prisma.user.findUnique({
  where: { email: 'jane@example.com' },
  include: { orders: true },
});

// PostgreSQL with Drizzle ORM
import { eq } from 'drizzle-orm';
const user = await db.select()
  .from(users)
  .where(eq(users.email, 'jane@example.com'))
  .leftJoin(orders, eq(users.id, orders.userId));`}</code></pre>

      <h2>Quick Decision Matrix</h2>
      <pre><code className="language-text">{`Question                                    MongoDB    PostgreSQL
------------------------------------------  ---------  ----------
Is your schema likely to change often?       Yes         No
Do you need complex multi-table JOINs?       No          Yes
Is horizontal scaling a day-1 requirement?   Yes         No
Do you need strict data integrity?           No          Yes
Are you building a content/CMS system?       Yes         Maybe
Is your data mostly document-shaped?         Yes         No
Do you need advanced SQL features?           No          Yes
Are you building financial/transactional?    No          Yes
Do you want a managed cloud service?         Atlas       Many options
Is true open-source license important?       No          Yes`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Can MongoDB replace PostgreSQL entirely?</h3>
      <p>
        For many applications, yes. MongoDB has added multi-document transactions, joins via <code>$lookup</code>, and schema validation. However, it still cannot match PostgreSQL for complex relational queries, window functions, recursive CTEs, and the depth of SQL analytics. If your application is heavily relational with complex reporting needs, PostgreSQL remains the better choice.
      </p>

      <h3>Is PostgreSQL slower than MongoDB?</h3>
      <p>
        Not necessarily. For simple document reads, both are comparable. PostgreSQL is often faster for complex queries involving multiple tables because its query planner is highly optimized for joins. MongoDB can be faster for write-heavy workloads and when reading entire documents without joins. The actual performance depends on your data model, indexes, query patterns, and hardware.
      </p>

      <h3>Does PostgreSQL support JSON like MongoDB?</h3>
      <p>
        Yes. PostgreSQL JSONB columns provide binary JSON storage with indexing, querying, and manipulation capabilities. You can query nested JSON fields, create GIN indexes for fast lookups, and combine JSON data with traditional SQL joins. Many teams choose PostgreSQL specifically because they get relational reliability with document flexibility in a single database.
      </p>

      <h3>Which database is better for startups?</h3>
      <p>
        Both are excellent choices for startups. MongoDB offers faster prototyping with flexible schemas and schema-less development. PostgreSQL offers a stronger foundation when you eventually need transactions, reporting, and complex queries. A common approach is to start with PostgreSQL (using JSONB for flexible fields) and only add MongoDB if you have a specific use case that demands it.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate MongoDB documents</li>
        <li><Link href={`/${lang}/tools/sql-formatter`}>SQL Formatter</Link> - Format PostgreSQL queries</li>
        <li><Link href={`/${lang}/blog/sql-joins-explained-visual-guide`}>SQL Joins Visual Guide</Link> - Understand PostgreSQL joins</li>
        <li><Link href={`/${lang}/blog/json-schema-validation-guide`}>JSON Schema Validation Guide</Link> - Validate MongoDB document structure</li>
      </ul>
    </>
  );
}
