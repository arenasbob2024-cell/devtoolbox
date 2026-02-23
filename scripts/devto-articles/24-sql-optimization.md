---
title: "SQL Query Optimization: Indexes, EXPLAIN, and N+1 Prevention"
tags: sql, database, programming, performance
canonical_url: https://viadreams.cc/en/blog/sql-query-optimization
published: true
---

Slow queries are silent killers. They're fast in development with 100 rows but destroy production with 10 million. Here's how to fix them.

## EXPLAIN ANALYZE: Diagnose First

Always profile before optimizing:

```sql
EXPLAIN ANALYZE
SELECT u.*, o.total
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.email LIKE '%@gmail.com';
```

Output key metrics:
- **Seq Scan** = reading every row (bad for large tables)
- **Index Scan** = using an index (good)
- **rows** = estimated vs actual (big difference = stale statistics)
- **cost** = arbitrary units, compare relative costs

## Index Types

### B-tree (Default)

```sql
-- Good for: =, <, >, BETWEEN, ORDER BY
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_date ON orders(created_at DESC);

-- Composite index (order matters!)
-- This index supports: WHERE user_id = ? AND status = ?
-- Also supports: WHERE user_id = ? (leftmost prefix)
-- Does NOT support: WHERE status = ? alone
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
```

### Partial Index

```sql
-- Only index the rows you actually query
-- Instead of indexing ALL orders, only index pending ones
CREATE INDEX idx_orders_pending ON orders(created_at)
WHERE status = 'pending';

-- 1% of rows indexed, 100x smaller, 100x faster for pending queries
```

### Expression Index

```sql
-- Bad: function calls on indexed column prevent index use
WHERE LOWER(email) = 'user@example.com'  -- Can't use index on email!

-- Fix: create index on the expression
CREATE INDEX idx_users_email_lower ON users(LOWER(email));

-- Now this uses the index:
WHERE LOWER(email) = 'user@example.com'
```

## The N+1 Problem

The most common ORM performance killer:

```typescript
// N+1: 1 query for posts + N queries for each author
const posts = await Post.findAll(); // 1 query
for (const post of posts) {
  const author = await User.findById(post.authorId); // N queries!
  console.log(post.title, author.name);
}
// Total: 1 + N queries

// Fix: eager load with JOIN
const posts = await Post.findAll({
  include: [{ model: User, as: 'author' }]
}); // 1 query (or 2 with smart batching)
```

In raw SQL:

```sql
-- Bad: executed in a loop
SELECT * FROM posts WHERE id = ?;
-- Then for each: SELECT * FROM users WHERE id = ?

-- Good: single JOIN
SELECT p.*, u.name, u.avatar
FROM posts p
JOIN users u ON p.author_id = u.id
WHERE p.published = true;
```

## Covering Indexes

Include all columns needed so PostgreSQL never touches the table:

```sql
-- Query: filter by user_id, return status and created_at
SELECT status, created_at FROM orders WHERE user_id = 123;

-- Index without INCLUDE: must fetch table rows for status/created_at
CREATE INDEX idx_orders_user ON orders(user_id);

-- Covering index: query answered entirely from index
CREATE INDEX idx_orders_user_covering ON orders(user_id)
INCLUDE (status, created_at);
```

## Pagination: OFFSET is Broken

```sql
-- Slow: PostgreSQL must fetch and discard all rows before OFFSET
SELECT * FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 10000;

-- Fast: cursor-based pagination (keyset pagination)
-- First page
SELECT * FROM posts ORDER BY created_at DESC, id DESC LIMIT 20;

-- Next page (use last row's values as cursor)
SELECT * FROM posts
WHERE (created_at, id) < ('2026-01-15 12:00:00', 4821)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Cursor pagination is O(1) regardless of page depth. OFFSET is O(n).

## Connection Pooling

Don't open a new DB connection for every request:

```typescript
// Bad: new connection per request
const result = await mysql.createConnection(config).query(sql);

// Good: use a pool
const pool = mysql.createPool({ ...config, connectionLimit: 10 });
const result = await pool.query(sql);
```

Use [SQL Formatter](https://viadreams.cc/en/tools/sql-formatter) to clean up your queries before profiling.

---

*Full SQL optimization guide at [viadreams.cc/en/blog/sql-query-optimization](https://viadreams.cc/en/blog/sql-query-optimization)*
