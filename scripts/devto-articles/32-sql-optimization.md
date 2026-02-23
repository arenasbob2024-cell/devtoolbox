---
title: "SQL Query Optimization: 15 Techniques to Speed Up Your Database 2026"
tags: sql, database, backend, performance
canonical_url: https://viadreams.cc/en/blog/sql-query-optimization
published: true
---

Slow queries are the #1 database problem. These 15 techniques will dramatically speed up your SQL.

## 1. Use EXPLAIN to Understand Query Plans

Before optimizing, understand what the database is doing:

```sql
-- PostgreSQL
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 123;

-- MySQL
EXPLAIN SELECT * FROM orders WHERE customer_id = 123;
```

Look for: `Seq Scan` (bad), `Index Scan` (good), `rows` estimates, `cost`.

## 2. Index the Right Columns

```sql
-- Slow: full table scan
SELECT * FROM users WHERE email = 'alice@example.com';

-- Create an index
CREATE INDEX idx_users_email ON users(email);

-- Now: index lookup instead of table scan
```

**Index these columns:** WHERE clauses, JOIN conditions, ORDER BY, GROUP BY columns with high cardinality.

**Don't index:** Low-cardinality columns (boolean, status with 2-3 values), columns rarely used in queries.

## 3. Use Composite Indexes Wisely

```sql
-- Query pattern
SELECT * FROM orders 
WHERE customer_id = 123 AND status = 'pending'
ORDER BY created_at DESC;

-- Optimal composite index (order matters!)
CREATE INDEX idx_orders_customer_status_date 
ON orders(customer_id, status, created_at DESC);
```

The **leftmost prefix rule**: index on (A, B, C) helps queries on A, (A,B), and (A,B,C), but not B or C alone.

## 4. Avoid SELECT *

```sql
-- Bad: fetches all columns, more I/O
SELECT * FROM products WHERE category_id = 5;

-- Good: only fetch what you need
SELECT id, name, price FROM products WHERE category_id = 5;
```

Reduces network transfer and memory usage significantly.

## 5. Use LIMIT for Pagination

```sql
-- Bad: load all, then paginate in code
SELECT * FROM logs ORDER BY created_at DESC;

-- Good: offset pagination
SELECT * FROM logs ORDER BY created_at DESC LIMIT 20 OFFSET 100;

-- Better: keyset/cursor pagination for large datasets
SELECT * FROM logs 
WHERE created_at < '2026-01-15 10:00:00'
ORDER BY created_at DESC 
LIMIT 20;
```

Keyset pagination is O(log n) instead of O(n).

## 6. Avoid N+1 Queries

```sql
-- N+1 problem: 1 query for list + 1 per item
SELECT * FROM posts; -- 100 posts
-- Then for each post:
SELECT * FROM users WHERE id = post.user_id; -- 100 more queries!

-- Fix: JOIN
SELECT posts.*, users.name, users.avatar 
FROM posts 
JOIN users ON posts.user_id = users.id;
```

## 7. Use EXISTS Instead of IN (for Subqueries)

```sql
-- Slower: IN with subquery
SELECT * FROM products 
WHERE id IN (SELECT product_id FROM order_items WHERE quantity > 10);

-- Faster: EXISTS stops at first match
SELECT * FROM products p
WHERE EXISTS (
  SELECT 1 FROM order_items oi 
  WHERE oi.product_id = p.id AND oi.quantity > 10
);
```

## 8. Avoid Functions on Indexed Columns

```sql
-- Bad: index on email can't be used (function applied)
SELECT * FROM users WHERE LOWER(email) = 'alice@example.com';

-- Good: functional index
CREATE INDEX idx_users_email_lower ON users(LOWER(email));
-- or store email as lowercase always

-- Bad: date function prevents index use  
SELECT * FROM orders WHERE YEAR(created_at) = 2026;

-- Good: range query uses index
SELECT * FROM orders 
WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01';
```

## 9. Use CTEs for Readable, Optimized Queries

```sql
WITH 
monthly_revenue AS (
  SELECT 
    DATE_TRUNC('month', order_date) AS month,
    SUM(total_amount) AS revenue
  FROM orders
  WHERE status = 'completed'
  GROUP BY 1
),
growth AS (
  SELECT 
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_revenue
  FROM monthly_revenue
)
SELECT 
  month,
  revenue,
  ROUND((revenue - prev_revenue) / prev_revenue * 100, 2) AS growth_pct
FROM growth
WHERE prev_revenue IS NOT NULL;
```

## 10. Batch Inserts

```sql
-- Slow: one insert at a time
INSERT INTO events (user_id, event) VALUES (1, 'click');
INSERT INTO events (user_id, event) VALUES (2, 'view');
-- ... 1000 times

-- Fast: batch insert
INSERT INTO events (user_id, event) VALUES 
  (1, 'click'),
  (2, 'view'),
  (3, 'purchase'),
  -- ... up to 1000 rows per statement
```

10x-100x faster for bulk operations.

## 11. Use Partial Indexes

```sql
-- Index only active users (subset of table)
CREATE INDEX idx_users_active_email 
ON users(email) 
WHERE is_active = true;

-- Index only unprocessed items
CREATE INDEX idx_orders_pending 
ON orders(created_at) 
WHERE status = 'pending';
```

Smaller index = faster lookups, less memory.

## 12. Avoid LIKE with Leading Wildcards

```sql
-- Slow: can't use index
SELECT * FROM products WHERE name LIKE '%coffee%';

-- Fast: can use index (prefix match)
SELECT * FROM products WHERE name LIKE 'coffee%';

-- Better for full-text search: use FTS
-- PostgreSQL:
CREATE INDEX idx_products_name_fts ON products USING gin(to_tsvector('english', name));
SELECT * FROM products WHERE to_tsvector('english', name) @@ plainto_tsquery('coffee');
```

## 13. Use Connection Pooling

Don't create a new DB connection per request:

```javascript
// Node.js with pg
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,            // max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Reuse connections
const client = await pool.connect();
try {
  const result = await client.query('SELECT...');
} finally {
  client.release();
}
```

## 14. Cache Frequently-Read Data

```javascript
// Redis caching pattern
async function getProduct(id) {
  const cached = await redis.get(`product:${id}`);
  if (cached) return JSON.parse(cached);
  
  const product = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  await redis.setex(`product:${id}`, 3600, JSON.stringify(product));
  return product;
}
```

## 15. Monitor Slow Queries

```sql
-- PostgreSQL: enable slow query log
-- postgresql.conf:
-- log_min_duration_statement = 1000  # log queries > 1 second

-- Find slow queries (pg_stat_statements extension)
SELECT 
  query,
  calls,
  mean_exec_time,
  total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

## Quick Wins Checklist

- [ ] Add indexes on foreign keys
- [ ] Remove `SELECT *` from production queries
- [ ] Add LIMIT to all list queries
- [ ] Check EXPLAIN output on slow queries
- [ ] Enable slow query logging
- [ ] Use connection pooling
- [ ] Avoid N+1 in your ORM

Format and validate your SQL queries with [DevToolBox SQL tools](https://viadreams.cc/en/tools/sql-formatter).
