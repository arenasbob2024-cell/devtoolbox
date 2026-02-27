'use client';

import React from 'react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is database normalization and why is it important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Database normalization is the process of organizing a relational database to reduce data redundancy and improve data integrity. It involves applying a series of normal forms (1NF, 2NF, 3NF, BCNF) to decompose tables. Normalization is important because it eliminates update anomalies, reduces storage waste, makes queries more predictable, and ensures data consistency. However, highly normalized schemas can require complex JOINs, so some denormalization is acceptable for read-heavy workloads.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a primary key and a foreign key?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A primary key uniquely identifies each row in a table and cannot be NULL. It enforces entity integrity. A foreign key is a column (or set of columns) in one table that references the primary key of another table, enforcing referential integrity. For example, an orders table might have a user_id foreign key that references the users table\'s id primary key. Foreign keys ensure that you cannot create an order for a non-existent user.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use SQL vs NoSQL databases?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use SQL (relational) databases when your data has well-defined relationships, you need ACID transactions, you require complex queries with JOINs, or data integrity is critical (banking, e-commerce orders). Use NoSQL when you need horizontal scaling across many servers, your data is unstructured or highly variable (document storage), you require extremely high write throughput (time-series, logging), or you need flexible schema evolution. Most modern applications use both: SQL for core transactional data and NoSQL for caching, sessions, or analytics.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an index in a database and when should I add one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An index is a data structure (typically a B-tree) that allows the database to find rows matching a WHERE clause without scanning the entire table. Add indexes on columns used frequently in WHERE clauses, JOIN conditions, and ORDER BY clauses. Good candidates include foreign key columns, email/username fields (often used for login), and created_at columns (range queries). Avoid over-indexing — each index slows down INSERT/UPDATE/DELETE operations and consumes storage. Use EXPLAIN/EXPLAIN ANALYZE to verify that your indexes are actually being used.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are ACID properties in database transactions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ACID stands for Atomicity, Consistency, Isolation, and Durability. Atomicity means a transaction either fully succeeds or fully rolls back — no partial updates. Consistency means the database moves from one valid state to another, respecting all constraints. Isolation means concurrent transactions do not interfere with each other (controlled by isolation levels like READ COMMITTED, REPEATABLE READ, SERIALIZABLE). Durability means once a transaction commits, the data survives system crashes via write-ahead logging. ACID compliance is why relational databases are trusted for financial and critical business data.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I model a many-to-many relationship in a relational database?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many-to-many relationships require a junction table (also called a bridge or associative table) with foreign keys pointing to both related tables. For example, to model the relationship between students and courses (a student can enroll in many courses; a course can have many students), create an enrollments table with student_id and course_id columns. The primary key of the junction table is typically a composite key of both foreign keys. You can also add extra columns to the junction table (like enrolled_at, grade) to store relationship-specific data.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is connection pooling and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Connection pooling maintains a cache of reusable database connections so that each request does not pay the overhead of establishing a new TCP connection, TLS handshake, and authentication. A typical PostgreSQL connection costs 1-10ms to establish. With 1000 concurrent requests, creating 1000 new connections would overwhelm the database. A connection pool (e.g., pg-pool, HikariCP, pgBouncer) keeps 10-50 persistent connections and queues requests. Proper pool sizing is critical: too few connections create a queue; too many exhaust database memory. A common starting point is pool_size = (2 × CPU cores) + number_of_disk_spindles.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between PostgreSQL and MySQL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PostgreSQL is a feature-rich, standards-compliant object-relational database that excels at complex queries, advanced data types (JSONB, arrays, hstore), full-text search, window functions, CTEs, and extensibility. MySQL (and MariaDB) is faster for simple read-heavy workloads, has simpler replication setup, and is more widely hosted. PostgreSQL is generally preferred for new applications in 2026 due to its superior SQL compliance, JSONB support for semi-structured data, better concurrency via MVCC, and more active development. MySQL is a solid choice when you need broad hosting support or have an existing MySQL stack.',
      },
    },
  ],
};

const translations = {
  en: {
    title: 'Database Design Guide: Normalization, ERDs, Indexing & SQL vs NoSQL (2026)',
    description:
      'Complete database design guide covering normalization (1NF–BCNF), ERD design, primary and foreign keys, indexing strategies, SQL vs NoSQL trade-offs, ACID transactions, connection pooling, and real-world schema examples for e-commerce, blogs, and social media.',
    tldr: 'Good database design starts with normalization (1NF→3NF), clear primary/foreign key relationships, and appropriate indexing on columns used in WHERE and JOIN clauses. Use SQL for transactional data requiring ACID guarantees; use NoSQL for scale-out, unstructured data, or caching. Always define your entities and relationships in an ERD before writing DDL. Connection pooling is essential in production. PostgreSQL is the recommended default for new projects in 2026.',
  },
  zh: {
    title: '数据库设计指南：规范化、ERD、索引策略与 SQL vs NoSQL（2026）',
    description:
      '完整的数据库设计指南，涵盖规范化（1NF–BCNF）、ER图设计、主键与外键、索引策略、SQL与NoSQL权衡、ACID事务、连接池以及电商、博客、社交媒体等真实场景的数据库模式示例。',
    tldr: '良好的数据库设计从规范化（1NF→3NF）、清晰的主外键关系和对WHERE/JOIN列的合理索引开始。需要ACID保证的事务数据用SQL；横向扩展、非结构化数据或缓存用NoSQL。在编写DDL之前始终先用ER图定义实体和关系。生产环境中连接池必不可少。PostgreSQL 是 2026 年新项目的推荐默认选择。',
  },
};

function EnglishContent() {
  return (
    <>
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
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — Database Design Quick Reference
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.8' }}>
          {translations.en.tldr}
        </p>
      </div>

      <h2>Introduction: Why Database Design Matters</h2>
      <p>
        The database is the foundation of virtually every application. A well-designed schema makes queries fast,
        code simple, and future changes manageable. A poorly designed schema creates data integrity issues,
        performance bottlenecks, and cascading technical debt that is extremely expensive to fix later.
      </p>
      <p>
        Database design is both a science and an art. The science involves formal normalization theory,
        relational algebra, and query optimization. The art involves understanding your access patterns,
        anticipating future requirements, and knowing when to break the rules for practical reasons.
      </p>
      <p>
        This guide covers the full spectrum of database design knowledge you need to build robust, scalable
        applications in 2026 — from first principles through production patterns used by companies at scale.
      </p>

      {/* Key Takeaways Box */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          Key Takeaways
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>Normalize to 3NF by default; selectively denormalize for read performance where measured.</li>
          <li>Always define entities, attributes, and relationships in an ERD before writing SQL.</li>
          <li>Primary keys should be immutable; prefer surrogate keys (UUIDs or auto-increment integers).</li>
          <li>Index every foreign key column and any column appearing frequently in WHERE/ORDER BY clauses.</li>
          <li>Use SQL for transactional, relational data; NoSQL for scale-out, caching, or unstructured data.</li>
          <li>ACID transactions protect data integrity — understand isolation levels to avoid anomalies.</li>
          <li>Connection pooling is mandatory in production; size your pool based on CPU cores and workload.</li>
          <li>PostgreSQL is the recommended default relational database for new projects in 2026.</li>
        </ul>
      </div>

      <h2>Normalization: From Raw Data to Clean Schema</h2>
      <p>
        Normalization is the process of structuring a relational database according to a series of formal
        rules (normal forms) to reduce data redundancy and prevent update anomalies. Each normal form builds
        on the previous one.
      </p>

      <h3>First Normal Form (1NF)</h3>
      <p>
        A table is in 1NF when every column contains only <strong>atomic (indivisible) values</strong>, and
        each row is uniquely identifiable. There must be no repeating groups or arrays stored in a single column.
      </p>
      <p>
        <strong>Violation example</strong> — storing multiple phone numbers in one column:
      </p>
      <pre><code className="language-sql">{`-- BAD: violates 1NF — multiple values in one column
CREATE TABLE contacts (
  id       INT PRIMARY KEY,
  name     VARCHAR(100),
  phones   VARCHAR(200)  -- "555-1234, 555-5678, 555-9012"
);

-- GOOD: separate table for phone numbers (1NF compliant)
CREATE TABLE contacts (
  id   INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE contact_phones (
  id         INT PRIMARY KEY,
  contact_id INT REFERENCES contacts(id),
  phone      VARCHAR(20),
  type       VARCHAR(20)  -- 'mobile', 'home', 'work'
);`}</code></pre>

      <h3>Second Normal Form (2NF)</h3>
      <p>
        A table is in 2NF when it is in 1NF and every non-key attribute is <strong>fully functionally
        dependent</strong> on the entire primary key (not just part of it). This only applies to tables with
        composite primary keys.
      </p>
      <pre><code className="language-sql">{`-- BAD: violates 2NF — product_name depends only on product_id, not the full composite key
CREATE TABLE order_items (
  order_id     INT,
  product_id   INT,
  product_name VARCHAR(100),  -- depends on product_id only!
  quantity     INT,
  unit_price   DECIMAL(10,2),
  PRIMARY KEY (order_id, product_id)
);

-- GOOD: 2NF compliant — separate products table
CREATE TABLE products (
  id    INT PRIMARY KEY,
  name  VARCHAR(100),
  price DECIMAL(10,2)
);

CREATE TABLE order_items (
  order_id   INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity   INT,
  unit_price DECIMAL(10,2),  -- snapshot price at time of order
  PRIMARY KEY (order_id, product_id)
);`}</code></pre>

      <h3>Third Normal Form (3NF)</h3>
      <p>
        A table is in 3NF when it is in 2NF and every non-key attribute is <strong>directly dependent on
        the primary key</strong> — not on another non-key attribute (no transitive dependencies).
      </p>
      <pre><code className="language-sql">{`-- BAD: violates 3NF — zip_code determines city and state (transitive dependency)
CREATE TABLE employees (
  id         INT PRIMARY KEY,
  name       VARCHAR(100),
  zip_code   VARCHAR(10),
  city       VARCHAR(100),   -- depends on zip_code, not id!
  state      VARCHAR(2)      -- depends on zip_code, not id!
);

-- GOOD: 3NF compliant — extract zip code lookup table
CREATE TABLE zip_codes (
  zip_code VARCHAR(10) PRIMARY KEY,
  city     VARCHAR(100),
  state    VARCHAR(2)
);

CREATE TABLE employees (
  id       INT PRIMARY KEY,
  name     VARCHAR(100),
  zip_code VARCHAR(10) REFERENCES zip_codes(zip_code)
);`}</code></pre>

      <h3>Boyce-Codd Normal Form (BCNF)</h3>
      <p>
        BCNF is a stricter version of 3NF. A table is in BCNF when for every functional dependency X → Y,
        X is a superkey (a column or set of columns that uniquely identifies rows). BCNF handles edge cases
        that 3NF misses involving multiple overlapping candidate keys. In practice, 3NF is sufficient for
        most production databases.
      </p>

      <h3>When to Denormalize</h3>
      <p>
        Normalization optimizes for write consistency. Denormalization trades some redundancy for read
        performance. Consider denormalization when:
      </p>
      <ul>
        <li>A query requires joining 5+ tables and runs frequently (dashboard, API endpoint)</li>
        <li>You are building a read-heavy reporting or analytics system</li>
        <li>Latency requirements cannot be met with normalized queries even with indexes</li>
        <li>You are using a data warehouse (star/snowflake schema is intentionally denormalized)</li>
      </ul>
      <p>
        Common denormalization techniques include storing computed counts (post comment_count), caching
        aggregate values (user total_spent), or duplicating frequently joined columns (storing category_name
        directly on products instead of always joining categories).
      </p>

      <h2>ERD Design: Entity-Relationship Diagrams</h2>
      <p>
        An Entity-Relationship Diagram (ERD) is a visual blueprint of your database schema. Creating an ERD
        before writing SQL prevents design mistakes and provides a shared language between developers, DBAs,
        and stakeholders.
      </p>

      <h3>Core ERD Concepts</h3>
      <p>
        ERDs consist of three fundamental building blocks:
      </p>
      <ul>
        <li>
          <strong>Entities</strong> — Real-world objects represented as tables (e.g., User, Product, Order)
        </li>
        <li>
          <strong>Attributes</strong> — Properties of entities represented as columns (e.g., user.email, product.price)
        </li>
        <li>
          <strong>Relationships</strong> — Associations between entities, characterized by cardinality
          (one-to-one, one-to-many, many-to-many)
        </li>
      </ul>

      <h3>Cardinality Notation</h3>
      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Relationship</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Example</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Implementation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>One-to-One (1:1)</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>User ↔ UserProfile</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>FK with UNIQUE constraint</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>One-to-Many (1:N)</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>User → Orders</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>FK on the "many" side</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Many-to-Many (M:N)</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Students ↔ Courses</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Junction table with two FKs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>ERD Design Process</h3>
      <ol>
        <li><strong>Identify entities</strong> — List all the nouns in your system (User, Product, Order, Category, Review)</li>
        <li><strong>Define attributes</strong> — For each entity, list its properties and data types</li>
        <li><strong>Identify relationships</strong> — Determine how entities relate and the cardinality</li>
        <li><strong>Define primary keys</strong> — Choose a unique identifier for each entity</li>
        <li><strong>Add foreign keys</strong> — Implement relationships with foreign key constraints</li>
        <li><strong>Apply normalization</strong> — Check each table against normal form rules</li>
        <li><strong>Review with stakeholders</strong> — Validate the design reflects real business rules</li>
      </ol>

      <h2>Primary and Foreign Keys</h2>
      <p>
        Keys are the cornerstone of relational database integrity. Choosing the right key strategy
        significantly impacts performance, simplicity, and scalability.
      </p>

      <h3>Primary Key Strategies</h3>
      <pre><code className="language-sql">{`-- Strategy 1: Auto-increment integer (simplest, most common)
-- Pros: compact, fast to index, easy to type/debug
-- Cons: sequential IDs expose business data (user count), not globally unique
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,  -- PostgreSQL: auto-increment integer
  email      VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Strategy 2: UUID v4 (random, globally unique)
-- Pros: non-sequential (no ID enumeration), works across distributed systems
-- Cons: larger (16 bytes vs 4), random inserts cause B-tree page fragmentation
CREATE TABLE orders (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- PostgreSQL 13+
  user_id    INT REFERENCES users(id),
  total      DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Strategy 3: UUID v7 (time-ordered UUID) — recommended for PostgreSQL 2026
-- Pros: globally unique AND sequential (no fragmentation), sortable by time
-- Best of both worlds for most modern applications
CREATE TABLE events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- use uuid_generate_v7() with extension
  type       VARCHAR(100),
  payload    JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Strategy 4: Natural key (rare, use carefully)
-- Pros: no surrogate key needed, meaningful column
-- Cons: natural keys can change (emails change, ISO codes change)
CREATE TABLE countries (
  iso_code VARCHAR(2) PRIMARY KEY,  -- 'US', 'GB', 'DE'
  name     VARCHAR(100) NOT NULL
);`}</code></pre>

      <h3>Foreign Key Constraints and Referential Actions</h3>
      <pre><code className="language-sql">{`-- Foreign key with referential integrity actions
CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  user_id    INT NOT NULL,
  title      VARCHAR(255) NOT NULL,
  body       TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- ON DELETE CASCADE: delete posts when user is deleted
  -- ON DELETE SET NULL: set user_id to NULL when user is deleted
  -- ON DELETE RESTRICT: prevent user deletion if posts exist (default)
  CONSTRAINT fk_posts_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Always index foreign key columns (they are NOT auto-indexed!)
CREATE INDEX idx_posts_user_id ON posts(user_id);`}</code></pre>

      <h2>Indexing Strategies</h2>
      <p>
        Indexes are the single most impactful tool for query performance. Understanding how different
        index types work and when to apply them separates good database design from great database design.
      </p>

      <h3>B-Tree Indexes (Default)</h3>
      <p>
        B-tree (balanced tree) indexes are the default index type in PostgreSQL and MySQL. They support
        equality checks (<code>=</code>), range queries (<code>&gt;</code>, <code>&lt;</code>, <code>BETWEEN</code>),
        and <code>ORDER BY</code> operations efficiently.
      </p>
      <pre><code className="language-sql">{`-- Single column index — most common
CREATE INDEX idx_users_email ON users(email);

-- Verify index usage with EXPLAIN ANALYZE (PostgreSQL)
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alice@example.com';
-- Output shows: "Index Scan using idx_users_email on users"
-- Look for: Index Scan (good), Seq Scan on large table (investigate)

-- Partial index — index only a subset of rows (smaller, faster)
-- Index only active users (status = 'active') for a users table
CREATE INDEX idx_users_active ON users(email) WHERE status = 'active';

-- Expression index — index computed values
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
-- Now this query can use the index:
-- SELECT * FROM users WHERE LOWER(email) = 'alice@example.com';`}</code></pre>

      <h3>Composite Indexes</h3>
      <p>
        Composite indexes cover multiple columns. The <strong>column order matters enormously</strong> —
        a composite index on (a, b) can be used for queries on column a alone, but NOT for queries
        on column b alone (the leading column rule).
      </p>
      <pre><code className="language-sql">{`-- Composite index for common query pattern
-- Query: SELECT * FROM orders WHERE user_id = 42 AND status = 'pending'
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
-- This index also helps: WHERE user_id = 42 (first column used)
-- This index does NOT help: WHERE status = 'pending' (missing first column)

-- Index for range queries: put the equality column first
-- Query: SELECT * FROM events WHERE user_id = 42 AND created_at > '2026-01-01'
CREATE INDEX idx_events_user_created ON events(user_id, created_at);

-- Covering index: include all columns needed by the query
-- The database can answer entirely from the index without touching the table
CREATE INDEX idx_orders_covering ON orders(user_id, status)
  INCLUDE (id, total, created_at);  -- PostgreSQL syntax`}</code></pre>

      <h3>Other Index Types (PostgreSQL)</h3>
      <pre><code className="language-sql">{`-- GIN index: for full-text search and JSONB containment queries
CREATE INDEX idx_articles_fts ON articles USING GIN(to_tsvector('english', title || ' ' || body));
-- Query: SELECT * FROM articles WHERE to_tsvector('english', title || ' ' || body) @@ plainto_tsquery('database design');

CREATE INDEX idx_products_attributes ON products USING GIN(attributes);  -- JSONB column
-- Query: SELECT * FROM products WHERE attributes @> '{"color": "red"}';

-- GiST index: for geometric data, IP ranges, exclusion constraints
CREATE INDEX idx_reservations_period ON reservations USING GiST(tstzrange(start_time, end_time));

-- BRIN index: for very large tables with naturally ordered data (logs, time-series)
-- Much smaller than B-tree, faster to build, less accurate (block-level)
CREATE INDEX idx_logs_created_brin ON logs USING BRIN(created_at);

-- Hash index: for equality-only lookups (rarely better than B-tree in practice)
CREATE INDEX idx_sessions_token ON sessions USING HASH(token);`}</code></pre>

      <h3>Index Best Practices</h3>
      <ul>
        <li>Always index foreign key columns — PostgreSQL does NOT create them automatically</li>
        <li>Use <code>EXPLAIN ANALYZE</code> to confirm index usage before and after adding indexes</li>
        <li>Remove unused indexes — they slow down writes without helping reads</li>
        <li>Consider partial indexes for tables with heavily skewed data (e.g., 95% inactive records)</li>
        <li>In PostgreSQL, use <code>CREATE INDEX CONCURRENTLY</code> to add indexes without locking the table</li>
        <li>Keep index column count to 3 or fewer for most use cases</li>
      </ul>

      <h2>SQL vs NoSQL: Choosing the Right Database</h2>
      <p>
        One of the most consequential decisions in system design is choosing between relational (SQL) and
        non-relational (NoSQL) databases. Both have legitimate use cases, and modern applications often use both.
      </p>

      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Dimension</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>SQL (Relational)</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>NoSQL (Non-Relational)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>Schema</strong></td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Fixed schema, DDL migrations</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Flexible/schemaless</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>Scaling</strong></td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Vertical (scale-up); horizontal via read replicas</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Horizontal (scale-out) native</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>Transactions</strong></td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Full ACID transactions</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>BASE (eventually consistent); some offer ACID</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>Query Language</strong></td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Standardized SQL</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Database-specific APIs</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>Joins</strong></td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Efficient JOINs</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>No native JOINs (must denormalize)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>Best for</strong></td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Banking, e-commerce, CRM, ERP</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Caching, sessions, IoT, catalogs, feeds</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>Examples</strong></td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>PostgreSQL, MySQL, SQLite, SQL Server</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>MongoDB, Redis, DynamoDB, Cassandra</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>NoSQL Database Types</h3>
      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Type</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Database</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Best Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Document Store</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>MongoDB, CouchDB, Firestore</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Catalogs, CMS, user profiles with variable attributes</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Key-Value Store</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Redis, DynamoDB, Memcached</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Sessions, caching, rate limiting, leaderboards</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Wide-Column Store</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Cassandra, HBase, Bigtable</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>IoT time-series, write-heavy analytics at scale</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Graph Database</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Neo4j, Amazon Neptune, ArangoDB</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Social graphs, recommendation engines, fraud detection</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Search Engine</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Elasticsearch, Typesense, Meilisearch</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Full-text search, log analytics, auto-complete</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Relationships: One-to-Many and Many-to-Many</h2>
      <p>
        Understanding how to model relationships correctly is the most practically important skill in
        database design. Most real-world data involves complex webs of relationships.
      </p>

      <h3>One-to-Many Relationships</h3>
      <p>
        The most common relationship type. The foreign key always lives on the "many" side of the relationship.
      </p>
      <pre><code className="language-sql">{`-- One user has many posts (1:N)
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  username   VARCHAR(50) UNIQUE NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  user_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      VARCHAR(255) NOT NULL,
  slug       VARCHAR(255) UNIQUE NOT NULL,
  body       TEXT,
  published  BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index the foreign key
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Query: get all posts by a user with author info
SELECT p.id, p.title, p.created_at, u.username
FROM posts p
JOIN users u ON u.id = p.user_id
WHERE u.username = 'alice'
ORDER BY p.created_at DESC;`}</code></pre>

      <h3>Many-to-Many Relationships</h3>
      <p>
        Many-to-many relationships require a <strong>junction table</strong> (also called a bridge,
        pivot, or associative table). The junction table has foreign keys to both related tables
        and can carry additional data about the relationship itself.
      </p>
      <pre><code className="language-sql">{`-- Many-to-many: posts can have many tags; tags can belong to many posts
CREATE TABLE tags (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL
);

-- Junction table: post_tags
CREATE TABLE post_tags (
  post_id    INT REFERENCES posts(id) ON DELETE CASCADE,
  tag_id     INT REFERENCES tags(id) ON DELETE CASCADE,
  tagged_at  TIMESTAMPTZ DEFAULT NOW(),  -- extra relationship data
  PRIMARY KEY (post_id, tag_id)          -- composite PK prevents duplicates
);

CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);

-- Query: get all posts for a given tag
SELECT p.title, p.slug, p.created_at
FROM posts p
JOIN post_tags pt ON pt.post_id = p.id
JOIN tags t ON t.id = pt.tag_id
WHERE t.slug = 'javascript'
ORDER BY p.created_at DESC;

-- Query: get all tags for a given post
SELECT t.name, t.slug
FROM tags t
JOIN post_tags pt ON pt.tag_id = t.id
WHERE pt.post_id = 42;`}</code></pre>

      <h3>Self-Referencing Relationships</h3>
      <pre><code className="language-sql">{`-- Hierarchical data: categories with subcategories
CREATE TABLE categories (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  parent_id INT REFERENCES categories(id) ON DELETE SET NULL,  -- self-reference
  depth     INT DEFAULT 0  -- for fast depth queries
);

-- Example data
INSERT INTO categories (id, name, parent_id) VALUES
  (1, 'Electronics', NULL),
  (2, 'Computers', 1),
  (3, 'Laptops', 2),
  (4, 'Gaming Laptops', 3);

-- Recursive CTE to get full hierarchy
WITH RECURSIVE category_tree AS (
  SELECT id, name, parent_id, 0 AS level, name::TEXT AS path
  FROM categories WHERE parent_id IS NULL

  UNION ALL

  SELECT c.id, c.name, c.parent_id, ct.level + 1,
         ct.path || ' > ' || c.name
  FROM categories c
  JOIN category_tree ct ON ct.id = c.parent_id
)
SELECT * FROM category_tree ORDER BY path;`}</code></pre>

      <h2>Performance Optimization</h2>
      <p>
        Database performance optimization is an iterative process. Start with good schema design,
        then measure, then optimize. Never optimize prematurely without measuring first.
      </p>

      <h3>Query Optimization with EXPLAIN ANALYZE</h3>
      <pre><code className="language-sql">{`-- Always use EXPLAIN ANALYZE to understand query execution plans
EXPLAIN ANALYZE
SELECT u.username, COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
WHERE u.created_at > '2026-01-01'
GROUP BY u.id, u.username
ORDER BY post_count DESC
LIMIT 20;

-- Key things to look for in the output:
-- "Seq Scan" on large tables → add an index
-- "Rows Removed by Filter: 999999" → bad index selectivity
-- "Nested Loop" with large row counts → may need a Hash Join
-- Actual time much higher than estimated → stale statistics, run ANALYZE
-- "cost=0.00..1234.56" → higher cost = more expensive

-- Update table statistics if estimates are wrong
ANALYZE users;
ANALYZE posts;`}</code></pre>

      <h3>Common Performance Patterns</h3>
      <pre><code className="language-sql">{`-- Pattern 1: Pagination with keyset (cursor) instead of OFFSET
-- BAD: OFFSET becomes slower as offset grows (scans and discards rows)
SELECT * FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 10000;

-- GOOD: keyset pagination (constant time regardless of page number)
-- "Give me 20 posts created before the last one I saw"
SELECT * FROM posts
WHERE created_at < '2026-01-15T12:00:00Z'
ORDER BY created_at DESC
LIMIT 20;

-- Pattern 2: Avoid SELECT * in production queries
-- BAD: fetches all columns including large TEXT/BYTEA columns
SELECT * FROM posts WHERE id = 42;

-- GOOD: fetch only what you need
SELECT id, title, slug, created_at FROM posts WHERE id = 42;

-- Pattern 3: Use EXISTS instead of COUNT for existence checks
-- BAD: scans entire result set to count
SELECT COUNT(*) > 0 FROM posts WHERE user_id = 42;

-- GOOD: stops at first match
SELECT EXISTS(SELECT 1 FROM posts WHERE user_id = 42);

-- Pattern 4: Batch inserts for bulk data loading
-- BAD: 1000 individual INSERT statements
INSERT INTO events (type, payload) VALUES ('click', '{}');
-- ...repeated 1000 times

-- GOOD: single multi-row INSERT (or COPY for PostgreSQL bulk loading)
INSERT INTO events (type, payload) VALUES
  ('click', '{"x":100, "y":200}'),
  ('scroll', '{"delta":300}'),
  ('keypress', '{"key":"Enter"}');
  -- ... up to a few thousand rows per statement

-- PostgreSQL COPY for maximum throughput (millions of rows)
COPY events(type, payload) FROM '/tmp/events.csv' CSV HEADER;`}</code></pre>

      <h3>Materialized Views for Expensive Aggregations</h3>
      <pre><code className="language-sql">{`-- Create a materialized view for an expensive report
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT
  DATE_TRUNC('month', created_at) AS month,
  SUM(total) AS revenue,
  COUNT(*) AS order_count,
  COUNT(DISTINCT user_id) AS unique_customers
FROM orders
WHERE status = 'completed'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- Index the materialized view
CREATE INDEX idx_monthly_revenue_month ON monthly_revenue(month);

-- Query is now instant (reads pre-computed data)
SELECT * FROM monthly_revenue WHERE month >= '2026-01-01';

-- Refresh when underlying data changes (schedule this)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;`}</code></pre>

      <h2>Transactions and ACID Properties</h2>
      <p>
        Transactions allow multiple SQL statements to be executed as a single atomic unit. ACID
        properties guarantee that your database remains in a consistent state even when things go wrong.
      </p>

      <h3>Using Transactions</h3>
      <pre><code className="language-sql">{`-- Transfer $100 from account A to account B atomically
-- Both updates succeed or both roll back — never a partial state
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Check for negative balance before committing
DO $$
BEGIN
  IF (SELECT balance FROM accounts WHERE id = 1) < 0 THEN
    RAISE EXCEPTION 'Insufficient funds';
  END IF;
END $$;

COMMIT;
-- ROLLBACK; if anything goes wrong`}</code></pre>

      <pre><code className="language-javascript">{`// Transaction in Node.js with pg (node-postgres)
const { Pool } = require('pg');
const pool = new Pool();

async function transferFunds(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      'SELECT balance FROM accounts WHERE id = \$1 FOR UPDATE',
      [fromId]  // FOR UPDATE locks the row during the transaction
    );

    if (rows[0].balance < amount) {
      throw new Error('Insufficient funds');
    }

    await client.query(
      'UPDATE accounts SET balance = balance - \$1 WHERE id = \$2',
      [amount, fromId]
    );
    await client.query(
      'UPDATE accounts SET balance = balance + \$1 WHERE id = \$2',
      [amount, toId]
    );

    await client.query('COMMIT');
    console.log('Transfer successful');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();  // return connection to pool
  }
}`}</code></pre>

      <h3>Transaction Isolation Levels</h3>
      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Isolation Level</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Dirty Read</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Non-Repeatable Read</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Phantom Read</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Use When</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>READ UNCOMMITTED</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Possible</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Possible</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Possible</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Almost never (highest throughput)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>READ COMMITTED</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Prevented</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Possible</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Possible</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Default in PostgreSQL; most OLTP apps</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>REPEATABLE READ</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Prevented</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Prevented</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Possible</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Reports, consistent snapshots</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>SERIALIZABLE</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Prevented</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Prevented</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Prevented</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Financial systems, maximum correctness</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Real-World Schema Examples</h2>
      <p>
        The best way to learn database design is to study real schemas. Here are production-quality
        schemas for three common application types.
      </p>

      <h3>E-Commerce Schema</h3>
      <pre><code className="language-sql">{`-- E-Commerce: Users, Products, Orders, Reviews
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name    VARCHAR(100),
  last_name     VARCHAR(100),
  role          VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE categories (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  slug      VARCHAR(100) UNIQUE NOT NULL,
  parent_id INT REFERENCES categories(id)
);

CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock_qty   INT NOT NULL DEFAULT 0 CHECK (stock_qty >= 0),
  is_active   BOOLEAN DEFAULT TRUE,
  attributes  JSONB DEFAULT '{}',  -- flexible: {"color":"red","size":"XL"}
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active   ON products(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_products_attrs    ON products USING GIN(attributes);

CREATE TABLE orders (
  id             SERIAL PRIMARY KEY,
  user_id        INT NOT NULL REFERENCES users(id),
  status         VARCHAR(20) DEFAULT 'pending'
                   CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  subtotal       DECIMAL(10,2) NOT NULL,
  tax            DECIMAL(10,2) DEFAULT 0,
  shipping_cost  DECIMAL(10,2) DEFAULT 0,
  total          DECIMAL(10,2) NOT NULL,
  shipping_addr  JSONB,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status  ON orders(status, created_at DESC);

CREATE TABLE order_items (
  id         SERIAL PRIMARY KEY,
  order_id   INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id),
  quantity   INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,  -- snapshot at time of purchase
  total      DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_order_items_order   ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

CREATE TABLE reviews (
  id         SERIAL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id    INT NOT NULL REFERENCES users(id),
  rating     SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title      VARCHAR(255),
  body       TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (product_id, user_id)  -- one review per user per product
);

CREATE INDEX idx_reviews_product ON reviews(product_id, rating);`}</code></pre>

      <h3>Blog/CMS Schema</h3>
      <pre><code className="language-sql">{`-- Blog: Authors, Posts, Categories, Tags, Comments
CREATE TABLE authors (
  id         SERIAL PRIMARY KEY,
  username   VARCHAR(50) UNIQUE NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  bio        TEXT,
  avatar_url VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
  id            SERIAL PRIMARY KEY,
  author_id     INT NOT NULL REFERENCES authors(id),
  title         VARCHAR(255) NOT NULL,
  slug          VARCHAR(255) UNIQUE NOT NULL,
  excerpt       VARCHAR(500),
  body          TEXT NOT NULL,
  status        VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  published_at  TIMESTAMPTZ,
  view_count    INT DEFAULT 0,
  search_vector TSVECTOR,  -- for full-text search
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_author     ON posts(author_id);
CREATE INDEX idx_posts_status     ON posts(status, published_at DESC);
CREATE INDEX idx_posts_search     ON posts USING GIN(search_vector);

-- Auto-update search_vector on insert/update
CREATE OR REPLACE FUNCTION posts_search_vector_update() RETURNS TRIGGER AS \$\$
BEGIN
  NEW.search_vector := to_tsvector('english', NEW.title || ' ' || COALESCE(NEW.body, ''));
  RETURN NEW;
END;
\$\$ LANGUAGE plpgsql;

CREATE TRIGGER posts_search_vector_trigger
BEFORE INSERT OR UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION posts_search_vector_update();

-- Full-text search query
SELECT title, slug, excerpt, published_at
FROM posts
WHERE search_vector @@ plainto_tsquery('english', 'database design normalization')
  AND status = 'published'
ORDER BY ts_rank(search_vector, plainto_tsquery('english', 'database design normalization')) DESC
LIMIT 10;`}</code></pre>

      <h3>Social Media Schema</h3>
      <pre><code className="language-sql">{`-- Social Media: Users, Follows, Posts, Likes, Comments
CREATE TABLE users (
  id           SERIAL PRIMARY KEY,
  username     VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  bio          VARCHAR(500),
  avatar_url   VARCHAR(500),
  follower_count INT DEFAULT 0,   -- denormalized counter (updated by trigger)
  following_count INT DEFAULT 0,
  post_count   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Follows: many-to-many self-referencing
CREATE TABLE follows (
  follower_id  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY  (follower_id, following_id),
  CHECK        (follower_id != following_id)  -- can't follow yourself
);

CREATE INDEX idx_follows_following ON follows(following_id);

CREATE TABLE posts (
  id           SERIAL PRIMARY KEY,
  user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body         VARCHAR(280),  -- Twitter-like character limit
  media_urls   TEXT[],        -- PostgreSQL array for multiple images
  like_count   INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  is_reply_to  INT REFERENCES posts(id),  -- threaded replies
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id    ON posts(user_id, created_at DESC);
CREATE INDEX idx_posts_is_reply   ON posts(is_reply_to) WHERE is_reply_to IS NOT NULL;

-- Likes: many-to-many between users and posts
CREATE TABLE likes (
  user_id    INT REFERENCES users(id) ON DELETE CASCADE,
  post_id    INT REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

CREATE INDEX idx_likes_post_id ON likes(post_id);

-- User feed query: posts from users I follow, most recent first
SELECT p.*, u.username, u.avatar_url
FROM posts p
JOIN users u ON u.id = p.user_id
WHERE p.user_id IN (
  SELECT following_id FROM follows WHERE follower_id = 42
)
ORDER BY p.created_at DESC
LIMIT 50;`}</code></pre>

      <h2>Connection Pooling</h2>
      <p>
        Connection pooling is not optional in production — it is essential. Without it, each
        HTTP request would need to establish a fresh database connection, incurring significant
        overhead and potentially overwhelming the database.
      </p>

      <h3>Connection Pooling with Node.js (pg-pool)</h3>
      <pre><code className="language-javascript">{`// connection-pool.js
const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME     || 'myapp',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD,

  // Pool configuration
  max:             20,    // Maximum connections in pool (default: 10)
  min:             5,     // Minimum idle connections to keep open
  idleTimeoutMillis: 30000,  // Close idle clients after 30s
  connectionTimeoutMillis: 2000,  // Timeout if no connection available in 2s
  maxUses:         7500,  // Close connection after 7500 uses (prevents memory leaks)

  // SSL for production
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: true, ca: process.env.DB_SSL_CA }
    : false,
});

// Monitor pool health
pool.on('connect', (client) => {
  console.log('New client connected to pool');
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await pool.end();
  console.log('Pool has ended');
});

module.exports = pool;

// Usage in application code
async function getUserById(id) {
  // pool.query() automatically checks out and returns a client
  const result = await pool.query(
    'SELECT id, username, email FROM users WHERE id = \$1',
    [id]
  );
  return result.rows[0] || null;
}`}</code></pre>

      <h3>PgBouncer: External Connection Pooling</h3>
      <p>
        For high-traffic applications, PgBouncer is a lightweight connection pooler that sits
        between your application and PostgreSQL. It supports three pooling modes:
      </p>
      <ul>
        <li>
          <strong>Session pooling</strong> — one server connection per client session (similar to no pooling)
        </li>
        <li>
          <strong>Transaction pooling</strong> — server connection held only during a transaction (recommended)
        </li>
        <li>
          <strong>Statement pooling</strong> — server connection held per statement (breaks multi-statement transactions)
        </li>
      </ul>
      <pre><code className="language-ini">{`; /etc/pgbouncer/pgbouncer.ini
[databases]
myapp = host=127.0.0.1 port=5432 dbname=myapp

[pgbouncer]
listen_port = 6432
listen_addr = 127.0.0.1
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction    ; recommended for most apps
max_client_conn = 1000     ; max app connections to PgBouncer
default_pool_size = 25     ; max connections to PostgreSQL per database
min_pool_size = 5
reserve_pool_size = 5
log_connections = 0        ; disable in production for performance
server_idle_timeout = 600`}</code></pre>

      <h2>Best Practices and Production Tips</h2>
      <p>
        These are the lessons learned from operating databases at scale — patterns that prevent
        common mistakes and operational pain.
      </p>

      <h3>PostgreSQL vs MySQL: 2026 Recommendations</h3>
      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Feature</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>PostgreSQL 16</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>MySQL 8.4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>JSON support</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>JSONB (binary, indexed, fast)</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>JSON (text, limited indexing)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Full-text search</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Built-in tsvector/tsquery</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>FULLTEXT index (limited)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Window functions</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Full support since v8.4</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Support since MySQL 8.0</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>CTE (WITH)</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Full recursive CTE support</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Support since MySQL 8.0</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Concurrency</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>MVCC (readers don't block writers)</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>MVCC (InnoDB engine)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Hosting support</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>All major cloud providers</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>All major cloud providers</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Extensions</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>PostGIS, pgvector, TimescaleDB</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Limited extension ecosystem</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Verdict (2026)</td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>Recommended default</strong></td>
              <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Good for existing MySQL stacks</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Schema Migration Best Practices</h3>
      <pre><code className="language-sql">{`-- Safe schema changes in production (zero-downtime patterns)

-- 1. Adding a column: safe (no lock) with a default in PostgreSQL 11+
ALTER TABLE users ADD COLUMN last_login TIMESTAMPTZ DEFAULT NULL;

-- 2. Adding NOT NULL column safely (add nullable, backfill, then constrain)
-- UNSAFE: one-step NOT NULL with DEFAULT on large tables locks the table
ALTER TABLE users ADD COLUMN preferences JSONB NOT NULL DEFAULT '{}';

-- SAFE: three-step approach
ALTER TABLE users ADD COLUMN preferences JSONB;  -- Step 1: add nullable
UPDATE users SET preferences = '{}' WHERE preferences IS NULL;  -- Step 2: backfill
ALTER TABLE users ALTER COLUMN preferences SET NOT NULL;  -- Step 3: add constraint

-- 3. Adding an index without blocking reads/writes (PostgreSQL)
CREATE INDEX CONCURRENTLY idx_users_last_login ON users(last_login);

-- 4. Renaming a column (dangerous — use a view or application-side rename)
-- Step 1: Add new column
ALTER TABLE users ADD COLUMN user_name VARCHAR(50);
-- Step 2: Sync old to new via trigger or backfill
-- Step 3: Update application to use new name
-- Step 4: Drop old column after full deployment
ALTER TABLE users DROP COLUMN username;

-- 5. Partitioning a large table (range partitioning by date)
CREATE TABLE events (
  id         SERIAL,
  type       VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
) PARTITION BY RANGE (created_at);

CREATE TABLE events_2026_01 PARTITION OF events
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE events_2026_02 PARTITION OF events
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');`}</code></pre>

      <h3>Security Best Practices</h3>
      <pre><code className="language-sql">{`-- 1. Use parameterized queries ALWAYS (prevents SQL injection)
-- In Node.js with pg:
const result = await pool.query(
  'SELECT * FROM users WHERE email = \$1 AND status = \$2',
  [email, 'active']
  // Never: 'SELECT * FROM users WHERE email = ' + email
);

-- 2. Principle of least privilege: create role-specific database users
CREATE USER app_readonly WITH PASSWORD 'secret';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;

CREATE USER app_readwrite WITH PASSWORD 'secret2';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_readwrite;

-- 3. Row-level security (RLS) for multi-tenant apps (PostgreSQL)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own posts
CREATE POLICY posts_user_isolation ON posts
  USING (user_id = current_setting('app.user_id')::INT);

-- Set the user context at connection/session time
SET app.user_id = '42';

-- 4. Always store password hashes, never plaintext
-- Use bcrypt or argon2 from application layer, not database

-- 5. Enable TLS for all database connections in production`}</code></pre>

      <h3>Monitoring and Maintenance</h3>
      <pre><code className="language-sql">{`-- Find slow queries (PostgreSQL — enable pg_stat_statements extension)
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

SELECT
  calls,
  round(total_exec_time::numeric, 2) AS total_ms,
  round(mean_exec_time::numeric, 2) AS mean_ms,
  round(stddev_exec_time::numeric, 2) AS stddev_ms,
  rows,
  query
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;

-- Find missing indexes (tables with many sequential scans)
SELECT
  schemaname,
  tablename,
  seq_scan,
  seq_tup_read,
  idx_scan,
  seq_tup_read / seq_scan AS avg_rows_per_scan
FROM pg_stat_user_tables
WHERE seq_scan > 0
ORDER BY seq_tup_read DESC
LIMIT 20;

-- Find unused indexes (wasteful, slow down writes)
SELECT
  indexrelname AS index_name,
  relname AS table_name,
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size,
  idx_scan AS times_used
FROM pg_stat_user_indexes
JOIN pg_index USING (indexrelid)
WHERE idx_scan = 0 AND NOT indisprimary AND NOT indisunique
ORDER BY pg_relation_size(indexrelid) DESC;

-- Table bloat check (VACUUM keeps tables healthy)
SELECT relname, n_dead_tup, n_live_tup,
       round(n_dead_tup::numeric / NULLIF(n_live_tup, 0) * 100, 2) AS dead_ratio
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT 10;

-- Configure autovacuum for busy tables
ALTER TABLE orders SET (
  autovacuum_vacuum_scale_factor = 0.01,  -- vacuum when 1% rows are dead
  autovacuum_analyze_scale_factor = 0.005
);`}</code></pre>

      <h3>Summary: Database Design Checklist</h3>
      <div
        style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ color: '#15803d', display: 'block', marginBottom: '12px' }}>
          Production Database Design Checklist
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', lineHeight: '2' }}>
          <li>Draw an ERD before writing any SQL — validate with stakeholders</li>
          <li>Normalize to 3NF; denormalize only where measured performance requires it</li>
          <li>Every table has a primary key; prefer auto-increment or UUID v7</li>
          <li>Every foreign key column has an index (not created automatically)</li>
          <li>Use parameterized queries everywhere — never string-concatenate SQL</li>
          <li>Apply appropriate NOT NULL, UNIQUE, and CHECK constraints at the database level</li>
          <li>Use TIMESTAMPTZ (not TIMESTAMP) for all datetime columns</li>
          <li>Add created_at and updated_at to every table</li>
          <li>Use EXPLAIN ANALYZE before and after adding indexes</li>
          <li>Configure connection pooling in all production services</li>
          <li>Use transactions for all multi-step operations</li>
          <li>Test schema migrations on a production-sized dataset before deploying</li>
          <li>Monitor slow queries, index usage, and table bloat in production</li>
          <li>Keep pg_stat_statements enabled in PostgreSQL for query analytics</li>
          <li>Enable SSL/TLS for all database connections</li>
        </ul>
      </div>
    </>
  );
}

function ChineseContent() {
  return (
    <>
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
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — 数据库设计快速参考
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.8' }}>
          {translations.zh.tldr}
        </p>
      </div>

      <h2>简介：为什么数据库设计很重要</h2>
      <p>
        数据库是几乎所有应用程序的基础。一个设计良好的数据库模式（schema）能使查询高效、代码简洁、未来的变更易于管理。
        而一个设计糟糕的模式则会带来数据完整性问题、性能瓶颈和级联技术债务，这些问题在后期极难修复。
      </p>
      <p>
        数据库设计既是科学，也是艺术。科学部分涉及正式的规范化理论、关系代数和查询优化；
        艺术部分则是理解访问模式、预见未来需求，以及知道何时因实际原因打破规则。
      </p>

      {/* Key Takeaways Box */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          核心要点
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>默认规范化到第三范式（3NF）；仅在有实测数据支撑时才进行反规范化以提升读性能。</li>
          <li>在编写 SQL 前，始终先用 ERD 定义实体、属性和关系。</li>
          <li>主键应不可变；优先使用代理键（UUID 或自增整数）。</li>
          <li>为所有外键列以及频繁出现在 WHERE/ORDER BY 中的列建立索引。</li>
          <li>事务数据和关系数据用 SQL；横向扩展、缓存或非结构化数据用 NoSQL。</li>
          <li>ACID 事务保护数据完整性——理解隔离级别以避免数据异常。</li>
          <li>连接池在生产环境中是必须的；根据 CPU 核数和工作负载确定池大小。</li>
          <li>PostgreSQL 是 2026 年新项目的推荐默认关系型数据库。</li>
        </ul>
      </div>

      <h2>规范化：从原始数据到整洁的数据库模式</h2>
      <p>
        规范化是根据一系列正式规则（范式）组织关系型数据库的过程，目的是减少数据冗余并防止更新异常。
        每个范式都建立在上一个范式的基础上。规范化为写操作的一致性而优化，而反规范化则以一定的冗余来换取读性能。
      </p>
      <p>
        常见的规范化步骤：
      </p>
      <ul>
        <li><strong>第一范式（1NF）</strong>：每列只包含原子值，无重复组，每行可唯一标识。</li>
        <li><strong>第二范式（2NF）</strong>：满足 1NF，且所有非键属性完全依赖于整个主键（仅对复合主键有意义）。</li>
        <li><strong>第三范式（3NF）</strong>：满足 2NF，且所有非键属性直接依赖于主键，不存在传递依赖。</li>
        <li><strong>BC 范式（BCNF）</strong>：3NF 的更严格版本，处理多个重叠候选键的边缘情况。</li>
      </ul>

      <h2>ERD 设计：实体关系图</h2>
      <p>
        实体关系图（ERD）是数据库模式的可视化蓝图。在编写 SQL 之前创建 ERD 可以防止设计错误，
        并为开发人员、DBA 和利益相关者提供共同的语言。
      </p>
      <p>ERD 包含三个基本构建块：</p>
      <ul>
        <li><strong>实体（Entities）</strong>：表示为表的现实世界对象（如用户、产品、订单）</li>
        <li><strong>属性（Attributes）</strong>：实体的属性，表示为列（如 user.email、product.price）</li>
        <li><strong>关系（Relationships）</strong>：实体之间的关联，由基数（一对一、一对多、多对多）表征</li>
      </ul>
      <p>
        ERD 设计流程：识别实体 → 定义属性 → 确定关系与基数 → 定义主键 → 添加外键 → 应用规范化 → 与利益相关者评审验证。
      </p>

      <h2>主键与外键</h2>
      <p>
        键是关系数据库完整性的基石。选择正确的键策略对性能、简洁性和可扩展性有重大影响。
      </p>
      <ul>
        <li><strong>自增整数</strong>：最简单、最常见；紧凑，索引速度快；缺点是暴露业务数据量且非全局唯一。</li>
        <li><strong>UUID v4</strong>：随机、全局唯一；不暴露 ID 枚举信息，适合分布式系统；缺点是更大（16字节）且随机插入会导致 B 树页面碎片化。</li>
        <li><strong>UUID v7</strong>（推荐）：时间有序的 UUID，兼具全局唯一性和顺序性（无碎片化），可按时间排序。是大多数现代应用的最佳选择。</li>
        <li><strong>自然键</strong>：直接使用有意义的列（如 ISO 国家代码）；慎用，因为自然键可能会随时间变化。</li>
      </ul>
      <p>
        外键约束通过 <code>ON DELETE CASCADE</code>（删除父记录时级联删除子记录）、
        <code>ON DELETE SET NULL</code>（设置为 NULL）或 <code>ON DELETE RESTRICT</code>（阻止删除，默认行为）
        来控制引用完整性。<strong>务必为所有外键列手动添加索引</strong>——数据库不会自动创建。
      </p>

      <h2>索引策略</h2>
      <p>
        索引是提升查询性能最有效的工具。了解不同索引类型的工作原理和使用时机，是优秀数据库设计与卓越数据库设计的分水岭。
      </p>
      <ul>
        <li><strong>B 树索引（默认）</strong>：支持等值查询、范围查询和 ORDER BY；是最通用的索引类型。</li>
        <li><strong>复合索引</strong>：列的顺序至关重要——复合索引 (a, b) 可用于仅查询列 a 的情况，但不能用于仅查询列 b 的情况（前导列规则）。等值列放在范围列之前。</li>
        <li><strong>部分索引</strong>：只对满足条件的行建立索引（如只索引 status = 'active' 的用户），更小、更快。</li>
        <li><strong>覆盖索引</strong>：将查询所需的所有列包含在索引中，数据库无需回表即可完整回答查询。</li>
        <li><strong>GIN 索引</strong>：用于全文搜索和 JSONB 包含查询。</li>
        <li><strong>BRIN 索引</strong>：适用于具有自然顺序的超大表（如日志、时序数据），远比 B 树小。</li>
      </ul>
      <p>
        始终使用 <code>EXPLAIN ANALYZE</code> 验证索引是否被实际使用。定期检查并删除未使用的索引——它们会拖慢写操作而不带来任何读取收益。
        在 PostgreSQL 中，使用 <code>CREATE INDEX CONCURRENTLY</code> 在不锁表的情况下添加索引。
      </p>

      <h2>SQL 与 NoSQL 的选择</h2>
      <p>
        在系统设计中最关键的决策之一是选择关系型（SQL）还是非关系型（NoSQL）数据库。两者都有合理的使用场景，现代应用通常同时使用两者。
      </p>
      <p><strong>选择 SQL 的场景：</strong>数据有明确关系、需要 ACID 事务、需要复杂的多表 JOIN 查询、数据完整性至关重要（银行、电商订单）。</p>
      <p><strong>选择 NoSQL 的场景：</strong>需要跨多台服务器水平扩展、数据非结构化或高度可变（文档存储）、需要极高写入吞吐量（时序数据、日志）、需要灵活的 schema 演进。</p>
      <p>
        大多数现代应用两者都会用到：SQL 用于核心事务数据，NoSQL 用于缓存、会话或分析。
      </p>

      <h2>关系建模：一对多与多对多</h2>
      <p>
        正确建模关系是数据库设计中最实用的技能。
      </p>
      <ul>
        <li>
          <strong>一对多（1:N）</strong>：外键始终放在关系的"多"一侧。例如，一个用户拥有多篇文章，则 posts 表中有 user_id 外键。
        </li>
        <li>
          <strong>多对多（M:N）</strong>：需要一个<strong>联结表</strong>（也称为桥接表或关联表），其中包含指向两个相关表的外键。联结表的主键通常是两个外键的复合键。联结表还可以携带关于关系本身的附加数据（如注册时间、成绩）。
        </li>
        <li>
          <strong>自引用关系</strong>：表可以通过外键引用自身来表示层级数据（如类别的子类别、员工的上级）。可使用递归 CTE（<code>WITH RECURSIVE</code>）高效地遍历层级结构。
        </li>
      </ul>

      <h2>性能优化</h2>
      <p>
        数据库性能优化是一个迭代过程：先建立良好的 schema 设计，然后测量，再优化。切勿在未经测量的情况下过早优化。
      </p>
      <ul>
        <li><strong>使用键集分页（Keyset Pagination）代替 OFFSET</strong>：OFFSET 随页码增大而变慢；键集分页性能恒定。</li>
        <li><strong>避免 <code>SELECT *</code></strong>：只获取需要的列，尤其要避免拉取大型 TEXT/BYTEA 列。</li>
        <li><strong>存在性检查用 EXISTS 而非 COUNT</strong>：EXISTS 在找到第一个匹配项后即停止扫描。</li>
        <li><strong>批量插入</strong>：将多条插入合并为一条多行 INSERT 语句，或使用 PostgreSQL 的 COPY 命令进行大批量加载。</li>
        <li><strong>物化视图</strong>：将耗时的聚合结果预计算并存储，查询时直接读取，定期刷新。</li>
      </ul>

      <h2>事务与 ACID 属性</h2>
      <p>
        ACID 代表原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）和持久性（Durability）：
      </p>
      <ul>
        <li><strong>原子性</strong>：事务要么完全成功，要么完全回滚——永远不会有部分更新。</li>
        <li><strong>一致性</strong>：数据库从一个有效状态转变为另一个有效状态，所有约束均得到满足。</li>
        <li><strong>隔离性</strong>：并发事务互不干扰（通过隔离级别控制：READ COMMITTED、REPEATABLE READ、SERIALIZABLE）。</li>
        <li><strong>持久性</strong>：事务一旦提交，数据就通过预写日志（WAL）在系统崩溃后依然存活。</li>
      </ul>
      <p>
        PostgreSQL 默认隔离级别为 READ COMMITTED，适用于大多数 OLTP 应用。对于报表或需要一致快照的场景，使用 REPEATABLE READ。对于金融系统或需要最高正确性的场景，使用 SERIALIZABLE。
      </p>

      <h2>最佳实践</h2>
      <div
        style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ color: '#15803d', display: 'block', marginBottom: '12px' }}>
          生产环境数据库设计检查清单
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', lineHeight: '2' }}>
          <li>在编写任何 SQL 之前先画 ERD，并与利益相关者验证</li>
          <li>规范化到 3NF；只在有实测性能数据支撑时才进行反规范化</li>
          <li>每张表都要有主键；优先选择自增整数或 UUID v7</li>
          <li>为每个外键列添加索引（数据库不会自动创建）</li>
          <li>在所有地方使用参数化查询——永远不要拼接 SQL 字符串</li>
          <li>在数据库层面设置适当的 NOT NULL、UNIQUE 和 CHECK 约束</li>
          <li>所有日期时间列使用 TIMESTAMPTZ（而非 TIMESTAMP）</li>
          <li>每张表都添加 created_at 和 updated_at 列</li>
          <li>添加索引前后使用 EXPLAIN ANALYZE 验证效果</li>
          <li>在所有生产服务中配置连接池</li>
          <li>所有多步骤操作使用事务</li>
          <li>在生产规模的数据集上测试 schema 迁移后再部署</li>
          <li>在生产环境中监控慢查询、索引使用情况和表膨胀</li>
          <li>在 PostgreSQL 中启用 pg_stat_statements 进行查询分析</li>
          <li>为所有数据库连接启用 SSL/TLS</li>
        </ul>
      </div>
    </>
  );
}

export const translations_export = translations;

export default function DatabaseDesignGuide({ lang = 'en' }: { lang?: string }) {
  const isZh = lang === 'zh';
  const meta = isZh ? translations.zh : translations.en;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1>{meta.title}</h1>
      {isZh ? <ChineseContent /> : <EnglishContent />}
    </article>
  );
}
