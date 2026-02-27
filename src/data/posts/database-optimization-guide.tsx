'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Database Optimization Guide: Indexing, Query Tuning, Schema Design & Performance at Scale',
    description:
      'Master database optimization with this comprehensive guide covering indexing strategies (B-tree, hash, composite, covering, partial), query tuning with EXPLAIN plans, schema design patterns, connection pooling, caching with Redis and Memcached, PostgreSQL and MySQL tuning, MongoDB optimization, monitoring, and scaling with read replicas and sharding.',
    tldrTitle: 'TL;DR — Database Optimization in 60 Seconds',
    tldr1: 'Proper indexing is the single highest-impact optimization — composite indexes should follow the left-prefix rule',
    tldr2: 'Always use EXPLAIN ANALYZE to diagnose slow queries before guessing at solutions',
    tldr3: 'Eliminate N+1 queries with JOINs, eager loading, or DataLoader batching',
    tldr4: 'Connection pooling (PgBouncer, HikariCP) prevents connection exhaustion under load',
    tldr5: 'Cache hot data in Redis/Memcached — cache-aside pattern covers 90% of use cases',
    tldr6: 'Normalize for write-heavy workloads, denormalize for read-heavy analytics',
    tldr7: 'Partition large tables by range or hash; shard only when single-node limits are reached',
    tldr8: 'Monitor with pg_stat_statements, slow query log, and connection pool metrics continuously',
    keyTakeawaysTitle: 'Key Takeaways',
    kt1: 'B-tree indexes handle 90% of queries; use GIN for JSONB/full-text, BRIN for time-series',
    kt2: 'Composite index column order matters: equality columns first, then range, then sort',
    kt3: 'Covering indexes (INCLUDE) avoid heap lookups entirely for index-only scans',
    kt4: 'Partial indexes dramatically reduce index size when you query a small subset of rows',
    kt5: 'VACUUM and ANALYZE are critical PostgreSQL maintenance — never disable autovacuum',
    kt6: 'Read replicas scale reads linearly; use streaming replication with async for analytics',
    kt7: 'Write-ahead logging (WAL) ensures durability — tune wal_buffers and checkpoint_completion_target',
    kt8: 'Schema migrations should be backward-compatible: add columns, never rename in production',
    s1Title: '1. Indexing Strategies: B-Tree, Hash, Composite, Covering, and Partial Indexes',
    s1Desc: 'Indexes are the most important performance tool in any relational database. Choosing the right index type and column order can reduce query times from seconds to milliseconds. Understanding B-tree traversal, composite index prefix rules, and when to use specialized index types is essential for database performance.',
    s2Title: '2. Query Optimization: EXPLAIN Plans, N+1 Problem, and Query Rewriting',
    s2Desc: 'Even with perfect indexes, poorly written queries can cause performance disasters. Learning to read EXPLAIN ANALYZE output, detect N+1 patterns, and rewrite subqueries into JOINs are core skills for every backend developer.',
    s3Title: '3. Schema Design: Normalization vs Denormalization, Partitioning, and Sharding',
    s3Desc: 'Schema design decisions made early in a project have lasting performance implications. Understanding when to normalize for consistency vs denormalize for speed, and how to partition and shard for horizontal scalability, prevents expensive rewrites later.',
    s4Title: '4. Connection Pooling and Resource Management',
    s4Desc: 'Database connections are expensive resources. Each connection consumes memory on the server, and creating new connections has significant overhead. Connection pooling reuses a fixed set of connections across application requests, dramatically improving throughput and reducing latency under concurrent load.',
    s5Title: '5. Caching Strategies: Redis, Memcached, and Query Cache',
    s5Desc: 'Caching is the most effective way to reduce database load for read-heavy applications. Understanding cache patterns, invalidation strategies, and when to use Redis vs Memcached prevents both stale data bugs and cache stampede problems.',
    s6Title: '6. PostgreSQL-Specific Optimization',
    s6Desc: 'PostgreSQL offers unique optimization features including VACUUM, ANALYZE, advisory locks, parallel queries, and the pg_stat_statements extension. Proper tuning of these PostgreSQL-specific settings can improve performance by orders of magnitude.',
    s7Title: '7. MySQL Tuning and InnoDB Optimization',
    s7Desc: 'MySQL with InnoDB has its own set of tuning knobs and optimization patterns. The buffer pool size, query cache configuration, and InnoDB-specific settings directly impact performance for MySQL-based applications.',
    s8Title: '8. MongoDB Optimization: Indexes, Aggregation, and Schema Design',
    s8Desc: 'MongoDB optimization follows different patterns from relational databases. Document schema design, compound indexes with ESR (Equality-Sort-Range) rule, and aggregation pipeline optimization are key to performant MongoDB applications.',
    s9Title: '9. Database Monitoring, Profiling, and Maintenance',
    s9Desc: 'Continuous monitoring and proactive maintenance prevent performance degradation. Setting up slow query logging, analyzing execution statistics, and performing regular maintenance tasks are essential operational practices.',
    s10Title: '10. Scaling: Read Replicas, WAL, and Migration Strategies',
    s10Desc: 'When a single database server reaches its limits, scaling strategies become essential. Read replicas distribute read load, write-ahead logging ensures durability, and careful migration planning prevents downtime during schema changes.',
    faqTitle: 'Frequently Asked Questions',
    faqQ1: 'When should I add a database index?',
    faqA1: 'Add an index when a query filters, joins, or sorts on a column and the table has more than a few thousand rows. Check EXPLAIN output for sequential scans on large tables. However, avoid over-indexing — each index slows down INSERT, UPDATE, and DELETE operations because the index must be maintained. Focus on columns used in WHERE clauses, JOIN conditions, and ORDER BY of your most frequent and slowest queries.',
    faqQ2: 'What is the difference between horizontal and vertical partitioning?',
    faqA2: 'Vertical partitioning splits a table by columns — moving rarely-accessed or large columns (like BLOBs) to a separate table. Horizontal partitioning (also called sharding when across servers) splits by rows — for example, partitioning orders by date range so queries only scan relevant partitions. PostgreSQL supports declarative partitioning with RANGE, LIST, and HASH strategies natively.',
    faqQ3: 'How do I choose between Redis and Memcached for caching?',
    faqA3: 'Use Redis when you need data structures (sorted sets, lists, hashes), persistence, pub/sub, or Lua scripting. Use Memcached for simple key-value caching with multi-threaded performance and lower memory overhead per key. Redis is more feature-rich and handles most use cases. Memcached excels at very high-throughput simple caching where memory efficiency matters. Most modern applications choose Redis for its versatility.',
    faqQ4: 'What is the N+1 query problem and how do I fix it?',
    faqA4: 'The N+1 problem occurs when code fetches a list of N items with one query, then executes N additional queries to fetch related data for each item. For example, loading 100 users then querying orders for each user separately results in 101 queries. Fix it by using JOINs, eager loading in ORMs (Prisma include, TypeORM relations), batch queries with IN clauses, or DataLoader for GraphQL resolvers.',
    faqQ5: 'How do I decide between normalization and denormalization?',
    faqA5: 'Normalize (3NF) for write-heavy OLTP workloads where data consistency is critical — this prevents update anomalies and reduces storage. Denormalize for read-heavy OLAP/analytics workloads where query speed matters more than write efficiency. In practice, most applications use a hybrid: normalized core tables with strategic denormalization (materialized views, summary tables, cached aggregates) for hot read paths.',
    faqQ6: 'What is connection pooling and why is it important?',
    faqA6: 'Connection pooling maintains a pool of reusable database connections instead of creating a new connection for each request. Creating a PostgreSQL connection takes 50-100ms and consumes ~10MB of memory. With pooling, connections are borrowed from the pool and returned after use. Tools like PgBouncer (external), HikariCP (Java), and the pg Pool module (Node.js) implement this. PgBouncer in transaction mode can support thousands of application connections with only 20-50 database connections.',
    faqQ7: 'How often should I run VACUUM and ANALYZE in PostgreSQL?',
    faqA7: 'Autovacuum handles this automatically in most cases — never disable it. The default settings trigger autovacuum when 20% of rows are dead tuples. For high-write tables, lower autovacuum_vacuum_scale_factor to 0.01-0.05. Run ANALYZE manually after bulk data loads or major schema changes. Monitor pg_stat_user_tables for tables with high n_dead_tup counts. For very large tables, consider partitioning to make VACUUM more efficient.',
    faqQ8: 'What is the best way to handle database migrations in production?',
    faqA8: 'Follow the expand-contract pattern: (1) Add new columns/tables without removing old ones. (2) Deploy application code that writes to both old and new schemas. (3) Migrate existing data in batches. (4) Switch reads to new schema. (5) Remove old columns in a later release. Never rename columns, drop columns, or change types in a single deploy. Use tools like Flyway, Liquibase, or Prisma Migrate. Always test migrations on a production-sized dataset copy first.',
    relatedTools: 'Related Tools',
  },
  zh: {
    title: '数据库优化指南：索引、查询调优、Schema 设计与大规模性能',
    description:
      '全面掌握数据库优化，涵盖索引策略（B-tree、哈希、复合、覆盖、部分索引）、EXPLAIN 查询调优、Schema 设计模式、连接池、Redis/Memcached 缓存、PostgreSQL/MySQL 调优、MongoDB 优化、监控与读写分离扩展。',
    tldrTitle: 'TL;DR — 60 秒掌握数据库优化',
    tldr1: '合理的索引是影响最大的单一优化 — 复合索引应遵循最左前缀规则',
    tldr2: '诊断慢查询时始终使用 EXPLAIN ANALYZE，不要靠猜',
    tldr3: '使用 JOIN、预加载或 DataLoader 批处理消除 N+1 查询',
    tldr4: '连接池（PgBouncer、HikariCP）防止高负载下的连接耗尽',
    tldr5: '用 Redis/Memcached 缓存热数据 — Cache-Aside 模式覆盖 90% 的场景',
    tldr6: '写密集型工作负载使用范式化，读密集型分析使用反范式化',
    tldr7: '大表按范围或哈希分区；仅在单节点达到极限时才分片',
    tldr8: '使用 pg_stat_statements、慢查询日志和连接池指标持续监控',
    keyTakeawaysTitle: '核心要点',
    kt1: 'B-tree 索引处理 90% 的查询；JSONB/全文用 GIN，时序数据用 BRIN',
    kt2: '复合索引列顺序很重要：等值列在前，范围列其次，排序列最后',
    kt3: '覆盖索引（INCLUDE）可完全避免堆查找，实现纯索引扫描',
    kt4: '部分索引在查询小子集行时可大幅减小索引体积',
    kt5: 'VACUUM 和 ANALYZE 是 PostgreSQL 关键维护操作 — 永远不要禁用 autovacuum',
    kt6: '读副本可线性扩展读取；异步流复制适合分析场景',
    kt7: 'WAL（预写日志）确保持久性 — 调优 wal_buffers 和 checkpoint_completion_target',
    kt8: 'Schema 迁移应向后兼容：添加列可以，生产中永远不要重命名列',
    s1Title: '1. 索引策略：B-Tree、Hash、复合、覆盖和部分索引',
    s1Desc: '索引是关系型数据库中最重要的性能工具。选择合适的索引类型和列顺序可以将查询时间从秒级降到毫秒级。理解 B-tree 遍历、复合索引前缀规则以及何时使用特殊索引类型，对数据库性能至关重要。',
    s2Title: '2. 查询优化：EXPLAIN 计划、N+1 问题与查询重写',
    s2Desc: '即使有完美的索引，编写不当的查询也会导致性能灾难。学会阅读 EXPLAIN ANALYZE 输出、检测 N+1 模式、将子查询重写为 JOIN，是每个后端开发者的核心技能。',
    s3Title: '3. Schema 设计：范式化 vs 反范式化、分区与分片',
    s3Desc: '项目早期的 Schema 设计决策对性能有持久影响。理解何时使用范式化保证一致性、何时反范式化提升速度，以及如何通过分区和分片实现水平扩展，可以避免后期昂贵的重构。',
    s4Title: '4. 连接池与资源管理',
    s4Desc: '数据库连接是昂贵的资源。每个连接会消耗服务器内存，创建新连接有显著开销。连接池在应用请求间复用固定数量的连接，显著提升吞吐量并降低并发负载下的延迟。',
    s5Title: '5. 缓存策略：Redis、Memcached 与查询缓存',
    s5Desc: '缓存是降低读密集型应用数据库负载的最有效方式。理解缓存模式、失效策略以及 Redis 与 Memcached 的选择，可以防止数据过期和缓存雪崩问题。',
    s6Title: '6. PostgreSQL 专项优化',
    s6Desc: 'PostgreSQL 提供独特的优化功能，包括 VACUUM、ANALYZE、咨询锁、并行查询和 pg_stat_statements 扩展。正确调优这些 PostgreSQL 特定设置可以将性能提升数个数量级。',
    s7Title: '7. MySQL 调优与 InnoDB 优化',
    s7Desc: 'MySQL 的 InnoDB 引擎有其独特的调优参数和优化模式。缓冲池大小、查询缓存配置和 InnoDB 特定设置直接影响 MySQL 应用的性能。',
    s8Title: '8. MongoDB 优化：索引、聚合与 Schema 设计',
    s8Desc: 'MongoDB 的优化模式与关系型数据库不同。文档 Schema 设计、使用 ESR（等值-排序-范围）规则的复合索引，以及聚合管道优化，是高性能 MongoDB 应用的关键。',
    s9Title: '9. 数据库监控、分析与维护',
    s9Desc: '持续监控和主动维护可以防止性能退化。设置慢查询日志、分析执行统计和执行常规维护任务，是必不可少的运维实践。',
    s10Title: '10. 扩展：读副本、WAL 与迁移策略',
    s10Desc: '当单台数据库服务器达到极限时，扩展策略变得至关重要。读副本分散读负载，预写日志确保持久性，周密的迁移规划防止 Schema 变更时的停机。',
    faqTitle: '常见问题',
    faqQ1: '什么时候应该添加数据库索引？',
    faqA1: '当查询对某列进行过滤、连接或排序，且表中有数千行以上数据时，应添加索引。检查 EXPLAIN 输出中大表的顺序扫描。但要避免过度索引——每个索引都会拖慢 INSERT、UPDATE 和 DELETE 操作。重点关注最频繁、最慢查询中 WHERE 子句、JOIN 条件和 ORDER BY 使用的列。',
    faqQ2: '水平分区和垂直分区有什么区别？',
    faqA2: '垂直分区按列拆分表——将不常访问或大型列（如 BLOB）移到单独的表。水平分区（跨服务器时称为分片）按行拆分——例如按日期范围分区订单，使查询只扫描相关分区。PostgreSQL 原生支持 RANGE、LIST 和 HASH 策略的声明式分区。',
    faqQ3: '如何在 Redis 和 Memcached 之间选择？',
    faqA3: '需要数据结构（有序集合、列表、哈希）、持久化、发布订阅或 Lua 脚本时选 Redis。简单键值缓存且需要多线程性能和更低内存开销时选 Memcached。Redis 功能更丰富，适合大多数场景。Memcached 在高吞吐简单缓存且内存效率重要时表现更优。现代应用多选 Redis。',
    faqQ4: '什么是 N+1 查询问题，如何解决？',
    faqA4: 'N+1 问题是指代码用一条查询获取 N 个条目的列表，然后对每个条目再执行 N 条查询获取关联数据。例如加载 100 个用户后分别查询每人的订单，导致 101 次查询。通过 JOIN、ORM 预加载（Prisma include、TypeORM relations）、IN 子句批量查询或 GraphQL DataLoader 解决。',
    faqQ5: '如何决定使用范式化还是反范式化？',
    faqA5: '写密集型 OLTP 工作负载且数据一致性关键时使用范式化（3NF），可防止更新异常并减少存储。读密集型 OLAP/分析工作负载且查询速度比写效率更重要时使用反范式化。实际中多数应用采用混合方案：核心表范式化，配合战略性反范式化（物化视图、汇总表、缓存聚合）用于热读路径。',
    faqQ6: '什么是连接池，为什么它很重要？',
    faqA6: '连接池维护一组可复用的数据库连接，而非每次请求都创建新连接。创建一个 PostgreSQL 连接需 50-100ms 并消耗约 10MB 内存。使用连接池时，连接从池中借用并在使用后归还。PgBouncer（外部）、HikariCP（Java）和 pg Pool 模块（Node.js）都实现了此功能。PgBouncer 事务模式可用仅 20-50 个数据库连接支撑数千应用连接。',
    faqQ7: '多久运行一次 PostgreSQL 的 VACUUM 和 ANALYZE？',
    faqA7: 'Autovacuum 大多数情况下会自动处理——永远不要禁用它。默认设置在 20% 的行是死元组时触发 autovacuum。高写入表可将 autovacuum_vacuum_scale_factor 降到 0.01-0.05。批量数据加载或重大 Schema 变更后手动运行 ANALYZE。监控 pg_stat_user_tables 中 n_dead_tup 高的表。超大表可考虑分区使 VACUUM 更高效。',
    faqQ8: '生产环境数据库迁移的最佳方式是什么？',
    faqA8: '遵循扩展-收缩模式：(1) 添加新列/表但不删除旧的。(2) 部署同时写入新旧 Schema 的应用代码。(3) 分批迁移现有数据。(4) 切换读取到新 Schema。(5) 在后续发布中删除旧列。永远不要在单次部署中重命名列、删除列或更改类型。使用 Flyway、Liquibase 或 Prisma Migrate 等工具。务必先在生产规模数据集副本上测试迁移。',
    relatedTools: '相关工具',
  },
};

const codeIndexStrategies =
  '-- B-Tree Index: the default and most versatile index type\n' +
  '-- Handles: =, <, >, <=, >=, BETWEEN, IN, LIKE prefix%, IS NULL\n' +
  '-- Structure: balanced tree with O(log n) lookup\n' +
  '\n' +
  '-- Simple single-column index\n' +
  'CREATE INDEX idx_users_email ON users(email);\n' +
  '\n' +
  '-- Composite index: column order follows the left-prefix rule\n' +
  '-- This index covers:\n' +
  '--   WHERE status = ?                           (uses 1st column)\n' +
  '--   WHERE status = ? AND created_at > ?        (uses both columns)\n' +
  '--   WHERE status = ? ORDER BY created_at DESC  (uses both columns)\n' +
  '-- But NOT:\n' +
  '--   WHERE created_at > ?   (cannot skip leading column)\n' +
  'CREATE INDEX idx_orders_status_date\n' +
  '  ON orders(status, created_at DESC);\n' +
  '\n' +
  '-- Covering index with INCLUDE (PostgreSQL 11+, SQL Server)\n' +
  '-- Stores extra columns in leaf pages for index-only scans\n' +
  '-- The included columns are NOT part of the search key\n' +
  'CREATE INDEX idx_orders_covering\n' +
  '  ON orders(customer_id, status)\n' +
  '  INCLUDE (total, created_at);\n' +
  '\n' +
  '-- This query uses index-only scan (never touches heap):\n' +
  'SELECT total, created_at FROM orders\n' +
  'WHERE customer_id = 42 AND status = \'completed\';\n' +
  '\n' +
  '-- Partial index: only index rows matching a WHERE condition\n' +
  '-- Dramatically smaller index when querying a subset\n' +
  'CREATE INDEX idx_orders_pending\n' +
  '  ON orders(created_at)\n' +
  '  WHERE status = \'pending\';   -- only ~5% of rows indexed\n' +
  '\n' +
  '-- Hash index: O(1) lookup, equality only (no range queries)\n' +
  '-- PostgreSQL 10+ makes hash indexes WAL-logged and crash-safe\n' +
  'CREATE INDEX idx_sessions_token ON sessions USING hash(token);\n' +
  '\n' +
  '-- GIN index: for JSONB, arrays, full-text search\n' +
  'CREATE INDEX idx_products_attrs ON products USING gin(attributes);\n' +
  'SELECT * FROM products WHERE attributes @> \'{"color": "red"}\';\n' +
  '\n' +
  '-- BRIN index: for naturally ordered data (timestamps, IDs)\n' +
  '-- Tiny index size — stores min/max per block range\n' +
  'CREATE INDEX idx_logs_created ON logs USING brin(created_at)\n' +
  '  WITH (pages_per_range = 32);\n' +
  '\n' +
  '-- Expression index: index on computed values\n' +
  'CREATE INDEX idx_users_email_lower ON users(lower(email));\n' +
  'SELECT * FROM users WHERE lower(email) = \'user@example.com\';';

const codeExplainPlan =
  '-- EXPLAIN ANALYZE: run the query and show actual execution stats\n' +
  '-- Always use ANALYZE in development to see real numbers\n' +
  '\n' +
  'EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)\n' +
  'SELECT c.name, COUNT(o.id) AS order_count, SUM(o.total) AS revenue\n' +
  'FROM customers c\n' +
  'JOIN orders o ON o.customer_id = c.id\n' +
  'WHERE o.created_at >= \'2025-01-01\'\n' +
  '  AND o.status = \'completed\'\n' +
  'GROUP BY c.id, c.name\n' +
  'ORDER BY revenue DESC\n' +
  'LIMIT 20;\n' +
  '\n' +
  '-- Key plan nodes to understand:\n' +
  '-- Seq Scan         -> full table scan, no index used       (RED FLAG on large tables)\n' +
  '-- Index Scan       -> B-tree traversal, fetches from heap  (good)\n' +
  '-- Index Only Scan  -> reads only from index, no heap       (best)\n' +
  '-- Bitmap Index Scan-> collects row pointers, then fetches  (good for many rows)\n' +
  '-- Hash Join        -> builds hash table for inner relation (good for large sets)\n' +
  '-- Nested Loop      -> row-by-row join                      (good for small inner)\n' +
  '-- Sort             -> explicit sort operation               (check work_mem)\n' +
  '\n' +
  '-- Red flags in EXPLAIN output:\n' +
  '-- 1. "rows=1" estimate but "actual rows=50000" -> stale stats, run ANALYZE\n' +
  '-- 2. Seq Scan on a table with millions of rows -> missing index\n' +
  '-- 3. "Sort Method: external merge" -> work_mem too small\n' +
  '-- 4. Nested Loop with large inner set -> consider Hash Join\n' +
  '\n' +
  '-- N+1 query detection and fix:\n' +
  '-- BAD: 101 queries for 100 users\n' +
  '-- const users = await db.query(\'SELECT * FROM users LIMIT 100\');\n' +
  '-- for (const u of users) {\n' +
  '--   const orders = await db.query(\n' +
  '--     \'SELECT * FROM orders WHERE customer_id = $1\', [u.id]\n' +
  '--   );\n' +
  '-- }\n' +
  '\n' +
  '-- GOOD: single query with JOIN\n' +
  'SELECT u.id, u.name, COUNT(o.id) AS order_count\n' +
  'FROM users u\n' +
  'LEFT JOIN orders o ON o.customer_id = u.id\n' +
  'GROUP BY u.id, u.name\n' +
  'LIMIT 100;\n' +
  '\n' +
  '-- Query rewrite: EXISTS instead of COUNT for existence check\n' +
  '-- SLOW: scans all matching rows to count\n' +
  'SELECT * FROM products p\n' +
  'WHERE (SELECT COUNT(*) FROM reviews r WHERE r.product_id = p.id) > 0;\n' +
  '\n' +
  '-- FAST: stops at first match\n' +
  'SELECT * FROM products p\n' +
  'WHERE EXISTS (SELECT 1 FROM reviews r WHERE r.product_id = p.id);';

const codeSchemaDesign =
  '-- Normalization: 3NF eliminates redundancy, ensures consistency\n' +
  '-- Each fact is stored once; updates happen in one place\n' +
  '\n' +
  '-- Normalized schema (3NF)\n' +
  'CREATE TABLE customers (\n' +
  '  id SERIAL PRIMARY KEY,\n' +
  '  name VARCHAR(255) NOT NULL,\n' +
  '  email VARCHAR(255) UNIQUE NOT NULL\n' +
  ');\n' +
  '\n' +
  'CREATE TABLE orders (\n' +
  '  id SERIAL PRIMARY KEY,\n' +
  '  customer_id INT REFERENCES customers(id),\n' +
  '  status VARCHAR(20) DEFAULT \'pending\',\n' +
  '  total DECIMAL(10,2) NOT NULL,\n' +
  '  created_at TIMESTAMPTZ DEFAULT now()\n' +
  ');\n' +
  '\n' +
  'CREATE TABLE order_items (\n' +
  '  id SERIAL PRIMARY KEY,\n' +
  '  order_id INT REFERENCES orders(id),\n' +
  '  product_id INT REFERENCES products(id),\n' +
  '  quantity INT NOT NULL,\n' +
  '  unit_price DECIMAL(10,2) NOT NULL\n' +
  ');\n' +
  '\n' +
  '-- Denormalized: embed aggregates for fast reads (analytics)\n' +
  '-- Trade-off: write complexity for read speed\n' +
  'CREATE TABLE customer_summary (\n' +
  '  customer_id INT PRIMARY KEY REFERENCES customers(id),\n' +
  '  total_orders INT DEFAULT 0,\n' +
  '  total_revenue DECIMAL(12,2) DEFAULT 0,\n' +
  '  last_order_at TIMESTAMPTZ,\n' +
  '  -- Updated via trigger or application code\n' +
  '  updated_at TIMESTAMPTZ DEFAULT now()\n' +
  ');\n' +
  '\n' +
  '-- Materialized view: precomputed query results, refreshed on demand\n' +
  'CREATE MATERIALIZED VIEW mv_daily_revenue AS\n' +
  'SELECT date_trunc(\'day\', created_at) AS day,\n' +
  '  COUNT(*) AS order_count,\n' +
  '  SUM(total) AS revenue\n' +
  'FROM orders\n' +
  'WHERE status = \'completed\'\n' +
  'GROUP BY 1;\n' +
  '\n' +
  'CREATE UNIQUE INDEX ON mv_daily_revenue(day);\n' +
  'REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_revenue;\n' +
  '\n' +
  '-- Table partitioning: split large tables by range\n' +
  'CREATE TABLE events (\n' +
  '  id BIGSERIAL,\n' +
  '  event_type VARCHAR(50),\n' +
  '  payload JSONB,\n' +
  '  created_at TIMESTAMPTZ NOT NULL\n' +
  ') PARTITION BY RANGE (created_at);\n' +
  '\n' +
  'CREATE TABLE events_2025_q1 PARTITION OF events\n' +
  '  FOR VALUES FROM (\'2025-01-01\') TO (\'2025-04-01\');\n' +
  'CREATE TABLE events_2025_q2 PARTITION OF events\n' +
  '  FOR VALUES FROM (\'2025-04-01\') TO (\'2025-07-01\');\n' +
  '\n' +
  '-- Queries automatically prune irrelevant partitions:\n' +
  'SELECT * FROM events WHERE created_at >= \'2025-03-01\'\n' +
  '  AND created_at < \'2025-04-01\';  -- only scans Q1 partition';

const codeConnectionPool =
  '// Node.js: pg Pool with proper configuration\n' +
  'import { Pool } from \'pg\';\n' +
  '\n' +
  'const pool = new Pool({\n' +
  '  host: process.env.DB_HOST,\n' +
  '  port: 5432,\n' +
  '  database: process.env.DB_NAME,\n' +
  '  user: process.env.DB_USER,\n' +
  '  password: process.env.DB_PASSWORD,\n' +
  '  max: 20,                       // max connections in pool\n' +
  '  idleTimeoutMillis: 30000,      // close idle connections after 30s\n' +
  '  connectionTimeoutMillis: 5000, // fail if can\'t connect in 5s\n' +
  '  keepAlive: true,               // TCP keepalive\n' +
  '  keepAliveInitialDelayMillis: 10000,\n' +
  '  // statement_timeout prevents runaway queries\n' +
  '  statement_timeout: 30000,      // 30s max per query\n' +
  '});\n' +
  '\n' +
  '// Monitor pool health\n' +
  'setInterval(() => {\n' +
  '  console.log({\n' +
  '    totalCount: pool.totalCount,     // total connections\n' +
  '    idleCount: pool.idleCount,       // available connections\n' +
  '    waitingCount: pool.waitingCount, // queued requests\n' +
  '  });\n' +
  '}, 10000);\n' +
  '\n' +
  '// Use prepared statements for repeated queries\n' +
  'const result = await pool.query({\n' +
  '  name: \'get-user-orders\',\n' +
  '  text: \'SELECT * FROM orders WHERE customer_id = $1 AND status = $2\',\n' +
  '  values: [customerId, \'completed\'],\n' +
  '});\n' +
  '\n' +
  '// PgBouncer configuration (pgbouncer.ini)\n' +
  '// [databases]\n' +
  '// mydb = host=127.0.0.1 port=5432 dbname=mydb\n' +
  '//\n' +
  '// [pgbouncer]\n' +
  '// pool_mode = transaction    # most flexible\n' +
  '// max_client_conn = 1000     # app-facing connections\n' +
  '// default_pool_size = 25     # actual DB connections per pool\n' +
  '// reserve_pool_size = 5      # extra connections for bursts\n' +
  '// server_idle_timeout = 600  # close idle server connections\n' +
  '// query_timeout = 30         # kill queries exceeding 30s\n' +
  '// log_connections = 1\n' +
  '// log_disconnections = 1';

const codeCaching =
  '// Redis cache-aside pattern (most common)\n' +
  'import Redis from \'ioredis\';\n' +
  '\n' +
  'const redis = new Redis({\n' +
  '  host: process.env.REDIS_HOST,\n' +
  '  port: 6379,\n' +
  '  maxRetriesPerRequest: 3,\n' +
  '  retryDelayOnFailover: 100,\n' +
  '  lazyConnect: true,\n' +
  '});\n' +
  '\n' +
  'async function getUserWithCache(userId: string) {\n' +
  '  const cacheKey = \'user:\' + userId;\n' +
  '\n' +
  '  // 1. Check cache first\n' +
  '  const cached = await redis.get(cacheKey);\n' +
  '  if (cached) {\n' +
  '    return JSON.parse(cached);\n' +
  '  }\n' +
  '\n' +
  '  // 2. Cache miss: fetch from database\n' +
  '  const user = await db.query(\n' +
  '    \'SELECT * FROM users WHERE id = $1\', [userId]\n' +
  '  );\n' +
  '\n' +
  '  // 3. Store in cache with TTL (seconds)\n' +
  '  await redis.set(cacheKey, JSON.stringify(user), \'EX\', 3600);\n' +
  '\n' +
  '  return user;\n' +
  '}\n' +
  '\n' +
  '// Cache invalidation on update\n' +
  'async function updateUser(userId: string, data: any) {\n' +
  '  await db.query(\'UPDATE users SET name = $1 WHERE id = $2\',\n' +
  '    [data.name, userId]);\n' +
  '\n' +
  '  // Delete cache entry (next read will repopulate)\n' +
  '  await redis.del(\'user:\' + userId);\n' +
  '}\n' +
  '\n' +
  '// Cache stampede prevention with singleflight/mutex\n' +
  'async function getWithLock(key: string, fetchFn: () => Promise<any>) {\n' +
  '  const cached = await redis.get(key);\n' +
  '  if (cached) return JSON.parse(cached);\n' +
  '\n' +
  '  // Try to acquire lock (NX = only if not exists)\n' +
  '  const lockKey = \'lock:\' + key;\n' +
  '  const acquired = await redis.set(lockKey, \'1\', \'EX\', 10, \'NX\');\n' +
  '\n' +
  '  if (acquired) {\n' +
  '    try {\n' +
  '      const data = await fetchFn();\n' +
  '      await redis.set(key, JSON.stringify(data), \'EX\', 3600);\n' +
  '      return data;\n' +
  '    } finally {\n' +
  '      await redis.del(lockKey);\n' +
  '    }\n' +
  '  }\n' +
  '\n' +
  '  // Another process is loading; wait and retry\n' +
  '  await new Promise(r => setTimeout(r, 100));\n' +
  '  return getWithLock(key, fetchFn);\n' +
  '}';

const codePostgresql =
  '-- PostgreSQL configuration tuning (postgresql.conf)\n' +
  '-- Adjust based on available RAM and workload type\n' +
  '\n' +
  '-- Memory settings (for 16GB RAM server)\n' +
  'shared_buffers = \'4GB\'             -- 25% of total RAM\n' +
  'effective_cache_size = \'12GB\'      -- 75% of total RAM\n' +
  'work_mem = \'64MB\'                  -- per-operation sort/hash memory\n' +
  'maintenance_work_mem = \'1GB\'       -- VACUUM, CREATE INDEX memory\n' +
  '\n' +
  '-- WAL (Write-Ahead Logging) settings\n' +
  'wal_buffers = \'64MB\'              -- WAL write buffer\n' +
  'checkpoint_completion_target = 0.9 -- spread checkpoint I/O\n' +
  'max_wal_size = \'4GB\'              -- trigger checkpoint\n' +
  'min_wal_size = \'1GB\'\n' +
  '\n' +
  '-- Planner settings\n' +
  'random_page_cost = 1.1             -- SSD (default 4.0 for HDD)\n' +
  'effective_io_concurrency = 200     -- SSD concurrent I/O\n' +
  'default_statistics_target = 200    -- more accurate planner stats\n' +
  '\n' +
  '-- Parallel query\n' +
  'max_parallel_workers_per_gather = 4\n' +
  'max_parallel_workers = 8\n' +
  'max_worker_processes = 8\n' +
  '\n' +
  '-- Autovacuum tuning for high-write tables\n' +
  'autovacuum_vacuum_scale_factor = 0.02    -- trigger at 2% dead rows\n' +
  'autovacuum_analyze_scale_factor = 0.01   -- analyze at 1% changes\n' +
  'autovacuum_max_workers = 4\n' +
  'autovacuum_naptime = \'30s\'\n' +
  '\n' +
  '-- Monitor table bloat and dead tuples\n' +
  'SELECT schemaname, relname, n_live_tup, n_dead_tup,\n' +
  '  round(n_dead_tup::numeric / NULLIF(n_live_tup, 0) * 100, 2) AS dead_pct,\n' +
  '  last_vacuum, last_autovacuum, last_analyze\n' +
  'FROM pg_stat_user_tables\n' +
  'ORDER BY n_dead_tup DESC LIMIT 20;\n' +
  '\n' +
  '-- Find missing indexes with pg_stat_user_tables\n' +
  'SELECT relname, seq_scan, idx_scan,\n' +
  '  round(seq_scan::numeric / NULLIF(seq_scan + idx_scan, 0) * 100, 2)\n' +
  '    AS seq_scan_pct\n' +
  'FROM pg_stat_user_tables\n' +
  'WHERE seq_scan > 100\n' +
  'ORDER BY seq_scan_pct DESC;';

const codeMysql =
  '-- MySQL / InnoDB tuning (my.cnf)\n' +
  '\n' +
  '-- InnoDB buffer pool: the single most important setting\n' +
  '-- Store frequently accessed data and indexes in memory\n' +
  'innodb_buffer_pool_size = 12G          -- 70-80% of total RAM\n' +
  'innodb_buffer_pool_instances = 8       -- parallel buffer pools\n' +
  'innodb_buffer_pool_chunk_size = 128M\n' +
  '\n' +
  '-- Redo log (InnoDB WAL equivalent)\n' +
  'innodb_log_file_size = 2G              -- larger = fewer checkpoints\n' +
  'innodb_log_buffer_size = 64M\n' +
  'innodb_flush_log_at_trx_commit = 1     -- 1=durable, 2=fast\n' +
  'innodb_flush_method = O_DIRECT         -- bypass OS page cache\n' +
  '\n' +
  '-- I/O settings for SSD\n' +
  'innodb_io_capacity = 2000              -- background I/O ops/sec\n' +
  'innodb_io_capacity_max = 4000\n' +
  'innodb_read_io_threads = 8\n' +
  'innodb_write_io_threads = 8\n' +
  '\n' +
  '-- Query optimization\n' +
  'join_buffer_size = 256K\n' +
  'sort_buffer_size = 2M\n' +
  'read_rnd_buffer_size = 1M\n' +
  'tmp_table_size = 64M\n' +
  'max_heap_table_size = 64M\n' +
  '\n' +
  '-- Slow query log (essential for optimization)\n' +
  'slow_query_log = ON\n' +
  'slow_query_log_file = /var/log/mysql/slow.log\n' +
  'long_query_time = 0.5                  -- log queries > 500ms\n' +
  'log_queries_not_using_indexes = ON\n' +
  '\n' +
  '-- Check buffer pool hit ratio (should be > 99%)\n' +
  'SHOW GLOBAL STATUS LIKE \'Innodb_buffer_pool_read%\';\n' +
  '-- Hit ratio = 1 - (Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests)\n' +
  '\n' +
  '-- Find tables without primary key (InnoDB requires one)\n' +
  'SELECT t.TABLE_SCHEMA, t.TABLE_NAME\n' +
  'FROM information_schema.TABLES t\n' +
  'LEFT JOIN information_schema.TABLE_CONSTRAINTS tc\n' +
  '  ON t.TABLE_SCHEMA = tc.TABLE_SCHEMA\n' +
  '  AND t.TABLE_NAME = tc.TABLE_NAME\n' +
  '  AND tc.CONSTRAINT_TYPE = \'PRIMARY KEY\'\n' +
  'WHERE t.TABLE_SCHEMA NOT IN (\'mysql\', \'information_schema\',\n' +
  '  \'performance_schema\', \'sys\')\n' +
  '  AND tc.TABLE_NAME IS NULL;';

const codeMongodb =
  '// MongoDB optimization: indexes, aggregation, schema design\n' +
  '\n' +
  '// Compound index: follow ESR rule (Equality, Sort, Range)\n' +
  '// E: exact match fields first\n' +
  '// S: sort fields next\n' +
  '// R: range fields last\n' +
  'db.orders.createIndex(\n' +
  '  { status: 1, created_at: -1, total: 1 },\n' +
  '  { name: "idx_orders_esr" }\n' +
  ');\n' +
  '\n' +
  '// This query uses the ESR index efficiently:\n' +
  'db.orders.find({\n' +
  '  status: "completed",         // E: equality\n' +
  '  total: { $gte: 100 }         // R: range\n' +
  '}).sort({ created_at: -1 });   // S: sort\n' +
  '\n' +
  '// Covered query: projection matches index fields exactly\n' +
  '// MongoDB returns results from index without touching documents\n' +
  'db.orders.find(\n' +
  '  { status: "completed" },\n' +
  '  { _id: 0, status: 1, created_at: 1, total: 1 }\n' +
  ');\n' +
  '\n' +
  '// Aggregation pipeline optimization\n' +
  '// Rule: filter ($match) and project ($project) as early as possible\n' +
  'db.orders.aggregate([\n' +
  '  // Stage 1: filter first to reduce documents in pipeline\n' +
  '  { $match: {\n' +
  '    status: "completed",\n' +
  '    created_at: { $gte: new Date("2025-01-01") }\n' +
  '  }},\n' +
  '  // Stage 2: group after filtering\n' +
  '  { $group: {\n' +
  '    _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },\n' +
  '    revenue: { $sum: "$total" },\n' +
  '    count: { $sum: 1 }\n' +
  '  }},\n' +
  '  // Stage 3: sort the smaller result set\n' +
  '  { $sort: { _id: -1 } },\n' +
  '  { $limit: 30 }\n' +
  ']);\n' +
  '\n' +
  '// Schema design: embed vs reference\n' +
  '// Embed when: data is always accessed together, 1:few relationship\n' +
  '// Reference when: data grows unbounded, many:many, accessed separately\n' +
  '\n' +
  '// Good embed: order with its items\n' +
  '{\n' +
  '  _id: ObjectId("..."),\n' +
  '  customer_id: ObjectId("..."),\n' +
  '  items: [\n' +
  '    { product_id: ObjectId("..."), name: "Widget", qty: 2, price: 9.99 },\n' +
  '    { product_id: ObjectId("..."), name: "Gadget", qty: 1, price: 29.99 }\n' +
  '  ],\n' +
  '  total: 49.97\n' +
  '}\n' +
  '\n' +
  '// explain() to analyze query performance\n' +
  'db.orders.find({ status: "completed" }).explain("executionStats");';

const codeMonitoring =
  '-- PostgreSQL monitoring with pg_stat_statements\n' +
  '-- Enable in postgresql.conf:\n' +
  '-- shared_preload_libraries = \'pg_stat_statements\'\n' +
  '-- pg_stat_statements.track = all\n' +
  '\n' +
  'CREATE EXTENSION IF NOT EXISTS pg_stat_statements;\n' +
  '\n' +
  '-- Top 10 slowest queries by total execution time\n' +
  'SELECT\n' +
  '  round(total_exec_time::numeric, 2) AS total_time_ms,\n' +
  '  calls,\n' +
  '  round(mean_exec_time::numeric, 2) AS avg_time_ms,\n' +
  '  round((100 * total_exec_time /\n' +
  '    SUM(total_exec_time) OVER ())::numeric, 2) AS pct,\n' +
  '  left(query, 80) AS short_query\n' +
  'FROM pg_stat_statements\n' +
  'ORDER BY total_exec_time DESC\n' +
  'LIMIT 10;\n' +
  '\n' +
  '-- Active connections and their state\n' +
  'SELECT state, count(*), max(now() - state_change) AS max_duration\n' +
  'FROM pg_stat_activity\n' +
  'WHERE backend_type = \'client backend\'\n' +
  'GROUP BY state;\n' +
  '\n' +
  '-- Find long-running queries (> 5 minutes)\n' +
  'SELECT pid, now() - pg_stat_activity.query_start AS duration,\n' +
  '  state, left(query, 100) AS query\n' +
  'FROM pg_stat_activity\n' +
  'WHERE (now() - pg_stat_activity.query_start) > interval \'5 minutes\'\n' +
  '  AND state != \'idle\'\n' +
  'ORDER BY duration DESC;\n' +
  '\n' +
  '-- Table and index sizes\n' +
  'SELECT relname,\n' +
  '  pg_size_pretty(pg_total_relation_size(relid)) AS total_size,\n' +
  '  pg_size_pretty(pg_relation_size(relid)) AS table_size,\n' +
  '  pg_size_pretty(pg_indexes_size(relid)) AS index_size\n' +
  'FROM pg_catalog.pg_statio_user_tables\n' +
  'ORDER BY pg_total_relation_size(relid) DESC\n' +
  'LIMIT 15;\n' +
  '\n' +
  '-- Unused indexes (candidates for removal)\n' +
  'SELECT schemaname, relname, indexrelname,\n' +
  '  idx_scan, idx_tup_read,\n' +
  '  pg_size_pretty(pg_relation_size(indexrelid)) AS size\n' +
  'FROM pg_stat_user_indexes\n' +
  'WHERE idx_scan = 0\n' +
  '  AND indexrelname NOT LIKE \'%pkey\'\n' +
  'ORDER BY pg_relation_size(indexrelid) DESC;';

const codeScaling =
  '-- Read replicas: distribute read queries for linear scaling\n' +
  '\n' +
  '-- PostgreSQL streaming replication setup (primary)\n' +
  '-- postgresql.conf on primary:\n' +
  'wal_level = replica\n' +
  'max_wal_senders = 5\n' +
  'wal_keep_size = \'1GB\'\n' +
  'synchronous_commit = on          -- or "off" for async\n' +
  '\n' +
  '-- pg_hba.conf on primary:\n' +
  '-- host replication replicator replica_ip/32 md5\n' +
  '\n' +
  '-- On replica:\n' +
  '-- pg_basebackup -h primary_ip -D /var/lib/postgresql/16/main\n' +
  '--   -U replicator -P -Xs -R\n' +
  '\n' +
  '-- Application routing: send writes to primary, reads to replica\n' +
  '// Node.js example with read/write splitting\n' +
  '// const primary = new Pool({ host: \'primary.db.internal\' });\n' +
  '// const replica = new Pool({ host: \'replica.db.internal\' });\n' +
  '//\n' +
  '// async function query(sql, params, readOnly = false) {\n' +
  '//   const pool = readOnly ? replica : primary;\n' +
  '//   return pool.query(sql, params);\n' +
  '// }\n' +
  '\n' +
  '-- Database migration: expand-contract pattern\n' +
  '-- Step 1: ADD new column (backward compatible)\n' +
  'ALTER TABLE users ADD COLUMN display_name VARCHAR(255);\n' +
  '\n' +
  '-- Step 2: Backfill data in batches (not one massive UPDATE)\n' +
  'UPDATE users SET display_name = name\n' +
  'WHERE id BETWEEN 1 AND 10000 AND display_name IS NULL;\n' +
  '-- Repeat for next batch...\n' +
  '\n' +
  '-- Step 3: Application reads from new column\n' +
  '-- Step 4: Application writes to new column\n' +
  '-- Step 5: (Later release) Drop old column\n' +
  'ALTER TABLE users DROP COLUMN name;  -- only after full migration\n' +
  '\n' +
  '-- Zero-downtime index creation\n' +
  'CREATE INDEX CONCURRENTLY idx_users_display_name\n' +
  '  ON users(display_name);\n' +
  '-- CONCURRENTLY: does not lock table for writes (PostgreSQL)';

export default function DatabaseOptimizationGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faqQ1, acceptedAnswer: { '@type': 'Answer', text: t.faqA1 } },
      { '@type': 'Question', name: t.faqQ2, acceptedAnswer: { '@type': 'Answer', text: t.faqA2 } },
      { '@type': 'Question', name: t.faqQ3, acceptedAnswer: { '@type': 'Answer', text: t.faqA3 } },
      { '@type': 'Question', name: t.faqQ4, acceptedAnswer: { '@type': 'Answer', text: t.faqA4 } },
      { '@type': 'Question', name: t.faqQ5, acceptedAnswer: { '@type': 'Answer', text: t.faqA5 } },
      { '@type': 'Question', name: t.faqQ6, acceptedAnswer: { '@type': 'Answer', text: t.faqA6 } },
      { '@type': 'Question', name: t.faqQ7, acceptedAnswer: { '@type': 'Answer', text: t.faqA7 } },
      { '@type': 'Question', name: t.faqQ8, acceptedAnswer: { '@type': 'Answer', text: t.faqA8 } },
    ],
  };

  const indexRows = [
    { type: 'B-Tree', bestFor: 'Equality, range, sort, LIKE prefix%', overhead: 'Low', notes: 'Default; handles 90% of queries' },
    { type: 'Hash', bestFor: 'Equality only (=)', overhead: 'Low', notes: 'O(1) lookup, no range/sort support' },
    { type: 'GIN', bestFor: 'JSONB, arrays, full-text search', overhead: 'High write', notes: 'Multi-valued data, containment queries' },
    { type: 'GiST', bestFor: 'Geometric, range types, full-text', overhead: 'Medium', notes: 'Nearest-neighbor, overlap queries' },
    { type: 'BRIN', bestFor: 'Time-series, sequential data', overhead: 'Very low', notes: 'Tiny size; stores min/max per block range' },
    { type: 'Composite', bestFor: 'Multi-column queries', overhead: 'Medium', notes: 'Left-prefix rule; column order matters' },
    { type: 'Covering', bestFor: 'Index-only scans', overhead: 'Medium', notes: 'INCLUDE extra columns; avoids heap lookup' },
    { type: 'Partial', bestFor: 'Querying subset of rows', overhead: 'Low', notes: 'WHERE clause in index definition' },
  ];

  const cacheRows = [
    { pattern: 'Cache-Aside', flow: 'App checks cache -> miss -> query DB -> write cache', pros: 'Simple, lazy loading', cons: 'Cache miss penalty, possible stale data' },
    { pattern: 'Write-Through', flow: 'App writes DB + cache atomically', pros: 'Cache always fresh', cons: 'Write latency, caches unused data' },
    { pattern: 'Write-Behind', flow: 'App writes cache -> async flush to DB', pros: 'Fastest writes', cons: 'Risk of data loss, complex' },
    { pattern: 'Read-Through', flow: 'Cache auto-fetches from DB on miss', pros: 'Transparent to app', cons: 'Cold start latency' },
    { pattern: 'Refresh-Ahead', flow: 'Cache pre-refreshes before expiry', pros: 'No miss penalty', cons: 'Wasted refreshes if data not read' },
  ];

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    borderRadius: '8px',
    padding: '20px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.7',
    marginBottom: '24px',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#1e293b',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#334155',
    marginTop: '24px',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const thStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    padding: '10px 14px',
    textAlign: 'left' as const,
    fontWeight: 600,
    background: '#f1f5f9',
    fontSize: '0.875rem',
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    padding: '10px 14px',
    fontSize: '0.875rem',
    verticalAlign: 'top',
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '20px 28px',
          marginBottom: '32px',
        }}
      >
        <strong style={{ fontSize: '1.1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          {t.tldrTitle}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
          <li>{t.tldr1}</li>
          <li>{t.tldr2}</li>
          <li>{t.tldr3}</li>
          <li>{t.tldr4}</li>
          <li>{t.tldr5}</li>
          <li>{t.tldr6}</li>
          <li>{t.tldr7}</li>
          <li>{t.tldr8}</li>
        </ul>
      </div>

      {/* Key Takeaways Box */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 28px',
          marginBottom: '32px',
        }}
      >
        <strong style={{ fontSize: '1.1rem', color: '#334155', display: 'block', marginBottom: '8px' }}>
          {t.keyTakeawaysTitle}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.8' }}>
          <li>{t.kt1}</li>
          <li>{t.kt2}</li>
          <li>{t.kt3}</li>
          <li>{t.kt4}</li>
          <li>{t.kt5}</li>
          <li>{t.kt6}</li>
          <li>{t.kt7}</li>
          <li>{t.kt8}</li>
        </ul>
      </div>

      {/* Section 1: Indexing Strategies */}
      <h2 style={headingStyle}>{t.s1Title}</h2>
      <p style={pStyle}>{t.s1Desc}</p>

      <h3 style={h3Style}>B-Tree, Hash, GIN, BRIN, Composite, Covering, and Partial Indexes</h3>
      <p style={pStyle}>
        The B-tree index is the workhorse of relational databases — it maintains a balanced tree structure with O(log n) lookup time and supports equality, range, sorting, and prefix LIKE queries. Composite indexes extend this by indexing multiple columns but follow the strict left-prefix rule: the index on (status, created_at) can serve queries filtering on status alone, or status AND created_at, but not created_at alone.
      </p>
      <p style={pStyle}>
        Covering indexes use the INCLUDE clause to store additional columns in the index leaf pages, enabling index-only scans that never touch the heap table. Partial indexes only index rows matching a WHERE condition, dramatically reducing index size when you frequently query a small subset. Hash indexes provide O(1) equality lookups. GIN handles multi-valued data like JSONB and full-text search. BRIN is ideal for naturally ordered time-series data with minimal storage overhead.
      </p>
      <pre style={preStyle}><code>{codeIndexStrategies}</code></pre>

      {/* Index Comparison Table */}
      <h3 style={h3Style}>Index Type Comparison</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Index Type</th>
              <th style={thStyle}>Best For</th>
              <th style={thStyle}>Write Overhead</th>
              <th style={thStyle}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {indexRows.map((row, i) => (
              <tr key={row.type} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', color: '#0369a1', fontWeight: 600 }}>{row.type}</td>
                <td style={tdStyle}>{row.bestFor}</td>
                <td style={tdStyle}>{row.overhead}</td>
                <td style={{ ...tdStyle, color: '#64748b' }}>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 2: Query Optimization */}
      <h2 style={headingStyle}>{t.s2Title}</h2>
      <p style={pStyle}>{t.s2Desc}</p>

      <h3 style={h3Style}>EXPLAIN ANALYZE, N+1 Detection, and Query Rewriting</h3>
      <p style={pStyle}>
        EXPLAIN ANALYZE is the most important diagnostic tool for query performance. Unlike plain EXPLAIN, it actually executes the query and reports real timing, actual row counts, and buffer usage. When the estimated rows differ significantly from actual rows, it indicates stale statistics that need ANALYZE to refresh. Watch for sequential scans on large tables, external merge sorts (indicating insufficient work_mem), and nested loops with large inner sets.
      </p>
      <p style={pStyle}>
        The N+1 problem is the most common ORM performance trap. It occurs when code loads a list with one query, then fires a separate query for each item to fetch related data. The fix is always to batch: use JOINs in raw SQL, eager loading in ORMs (Prisma include, TypeORM relations), IN clause batching, or DataLoader for GraphQL resolvers. Rewriting correlated subqueries as JOINs, using window functions instead of self-joins, and using EXISTS over COUNT for existence checks can yield order-of-magnitude improvements.
      </p>
      <pre style={preStyle}><code>{codeExplainPlan}</code></pre>

      {/* Section 3: Schema Design */}
      <h2 style={headingStyle}>{t.s3Title}</h2>
      <p style={pStyle}>{t.s3Desc}</p>

      <h3 style={h3Style}>Normalization, Denormalization, Partitioning, and Materialized Views</h3>
      <p style={pStyle}>
        Third Normal Form (3NF) eliminates data redundancy by ensuring each fact is stored exactly once. This is ideal for OLTP workloads where data consistency and write efficiency matter. Denormalization duplicates data for read performance, using summary tables, materialized views, or embedded aggregates. The trade-off is write complexity for read speed.
      </p>
      <p style={pStyle}>
        Table partitioning splits large tables into smaller, more manageable pieces. Range partitioning by date is the most common pattern — queries that filter on the partition key automatically skip irrelevant partitions (partition pruning). PostgreSQL supports declarative partitioning with RANGE, LIST, and HASH strategies. Sharding extends this concept across multiple database servers but adds significant operational complexity and should only be considered when single-node limits are genuinely reached.
      </p>
      <pre style={preStyle}><code>{codeSchemaDesign}</code></pre>

      {/* Section 4: Connection Pooling */}
      <h2 style={headingStyle}>{t.s4Title}</h2>
      <p style={pStyle}>{t.s4Desc}</p>

      <h3 style={h3Style}>pg Pool, PgBouncer, and Prepared Statements</h3>
      <p style={pStyle}>
        Every PostgreSQL connection consumes approximately 10MB of memory and takes 50-100ms to establish. Without pooling, a web application serving 1000 concurrent users would need 1000 connections, consuming 10GB of memory just for connections. Connection pooling solves this by maintaining a fixed pool of reusable connections. PgBouncer in transaction mode is the gold standard for PostgreSQL — it can multiplex thousands of application connections through just 20-50 database connections. Prepared statements further reduce overhead by parsing the SQL once and reusing the execution plan.
      </p>
      <pre style={preStyle}><code>{codeConnectionPool}</code></pre>

      {/* Section 5: Caching Strategies */}
      <h2 style={headingStyle}>{t.s5Title}</h2>
      <p style={pStyle}>{t.s5Desc}</p>

      <h3 style={h3Style}>Redis Cache-Aside, Stampede Prevention, and Invalidation</h3>
      <p style={pStyle}>
        The cache-aside pattern is the most widely used caching strategy: check the cache first, on miss fetch from the database, then populate the cache. This lazy-loading approach means only data that is actually requested gets cached. Cache invalidation on write (delete the cache key) ensures eventual consistency. The cache stampede problem occurs when a popular key expires and hundreds of concurrent requests all hit the database simultaneously. Preventing this with a mutex/lock pattern ensures only one request rebuilds the cache while others wait.
      </p>

      {/* Cache Pattern Comparison Table */}
      <h3 style={h3Style}>Caching Pattern Comparison</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Pattern</th>
              <th style={thStyle}>Data Flow</th>
              <th style={thStyle}>Pros</th>
              <th style={thStyle}>Cons</th>
            </tr>
          </thead>
          <tbody>
            {cacheRows.map((row, i) => (
              <tr key={row.pattern} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', color: '#0369a1', fontWeight: 600 }}>{row.pattern}</td>
                <td style={tdStyle}>{row.flow}</td>
                <td style={{ ...tdStyle, color: '#15803d' }}>{row.pros}</td>
                <td style={{ ...tdStyle, color: '#b91c1c' }}>{row.cons}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre style={preStyle}><code>{codeCaching}</code></pre>

      {/* Section 6: PostgreSQL Optimization */}
      <h2 style={headingStyle}>{t.s6Title}</h2>
      <p style={pStyle}>{t.s6Desc}</p>

      <h3 style={h3Style}>postgresql.conf Tuning, VACUUM, ANALYZE, and WAL Settings</h3>
      <p style={pStyle}>
        PostgreSQL performance tuning starts with shared_buffers (set to 25% of RAM), effective_cache_size (75% of RAM), and work_mem (memory for sorts and hash operations). For SSD storage, lower random_page_cost to 1.1 (from the HDD default of 4.0) so the planner correctly favors index scans. VACUUM reclaims dead tuple space from updates and deletes — the MVCC architecture means deleted rows are not immediately removed. Autovacuum handles this automatically, but high-write tables may need more aggressive settings. Write-ahead logging (WAL) ensures crash recovery by writing changes to a sequential log before applying them to data files. Tuning wal_buffers and checkpoint_completion_target balances durability with write throughput.
      </p>
      <pre style={preStyle}><code>{codePostgresql}</code></pre>

      {/* Section 7: MySQL Tuning */}
      <h2 style={headingStyle}>{t.s7Title}</h2>
      <p style={pStyle}>{t.s7Desc}</p>

      <h3 style={h3Style}>InnoDB Buffer Pool, Redo Log, and Slow Query Log</h3>
      <p style={pStyle}>
        The InnoDB buffer pool is the single most important MySQL setting — it caches both data and indexes in memory. Set it to 70-80% of available RAM on a dedicated database server. Monitor the hit ratio (should be above 99%) and increase the size if reads frequently go to disk. The redo log (InnoDB equivalent of WAL) should be sized large enough to avoid frequent checkpoints. Enabling the slow query log with log_queries_not_using_indexes catches both slow queries and those missing indexes. Every MySQL table should have an explicit primary key — InnoDB uses the primary key as the clustered index, and without one, it generates a hidden row ID that wastes space.
      </p>
      <pre style={preStyle}><code>{codeMysql}</code></pre>

      {/* Section 8: MongoDB Optimization */}
      <h2 style={headingStyle}>{t.s8Title}</h2>
      <p style={pStyle}>{t.s8Desc}</p>

      <h3 style={h3Style}>ESR Index Rule, Aggregation Pipeline, and Schema Design</h3>
      <p style={pStyle}>
        MongoDB compound indexes follow the ESR (Equality-Sort-Range) rule: place equality match fields first in the index definition, sort fields next, and range query fields last. This order ensures MongoDB can use the index efficiently for all three operations in a single query. Covered queries — where the projection matches index fields exactly — return results directly from the index without reading full documents, similar to covering indexes in PostgreSQL.
      </p>
      <p style={pStyle}>
        The aggregation pipeline should filter and project as early as possible to reduce the number of documents flowing through later stages. Schema design in MongoDB involves choosing between embedding related data (access together, 1:few relationship) and referencing (unbounded growth, many:many, accessed separately). Embedding reduces query count but increases document size; referencing is more normalized but requires additional lookups or $lookup stages.
      </p>
      <pre style={preStyle}><code>{codeMongodb}</code></pre>

      {/* Section 9: Monitoring and Profiling */}
      <h2 style={headingStyle}>{t.s9Title}</h2>
      <p style={pStyle}>{t.s9Desc}</p>

      <h3 style={h3Style}>pg_stat_statements, Active Query Monitoring, and Index Health</h3>
      <p style={pStyle}>
        The pg_stat_statements extension is essential for PostgreSQL monitoring — it tracks execution statistics for every query, including total and average execution time, call count, and rows returned. Focus optimization efforts on queries with the highest total_time (calls multiplied by mean_time) rather than just the single slowest query. Monitor active connections and their states to detect connection leaks, and identify long-running queries that may be holding locks. Regularly check for unused indexes — each unused index wastes disk space and slows down writes without providing any benefit. Table and index size monitoring helps plan capacity and identify tables that may benefit from partitioning or archiving.
      </p>
      <pre style={preStyle}><code>{codeMonitoring}</code></pre>

      {/* Section 10: Scaling Strategies */}
      <h2 style={headingStyle}>{t.s10Title}</h2>
      <p style={pStyle}>{t.s10Desc}</p>

      <h3 style={h3Style}>Read Replicas, WAL Configuration, and Migration Patterns</h3>
      <p style={pStyle}>
        Read replicas scale read capacity linearly — each replica can serve the same read throughput as the primary. PostgreSQL streaming replication continuously ships WAL records to replicas, maintaining near-real-time consistency. Synchronous replication guarantees zero data loss but adds write latency; asynchronous replication is faster but may have slight replication lag. Application-level read/write splitting routes read queries to replicas and writes to the primary.
      </p>
      <p style={pStyle}>
        Database migrations in production must follow the expand-contract pattern to avoid downtime. Never rename columns, drop columns, or change types in a single deployment. Instead, add the new column first, deploy code that writes to both old and new schemas, backfill data in batches, switch reads to the new schema, and only remove the old column in a later release. Creating indexes with CONCURRENTLY in PostgreSQL prevents table-level write locks during index creation. Always test migrations on a production-sized dataset copy before executing in production.
      </p>
      <pre style={preStyle}><code>{codeScaling}</code></pre>

      {/* FAQ Section */}
      <h2 style={headingStyle}>{t.faqTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {[
          { q: t.faqQ1, a: t.faqA1 },
          { q: t.faqQ2, a: t.faqA2 },
          { q: t.faqQ3, a: t.faqA3 },
          { q: t.faqQ4, a: t.faqA4 },
          { q: t.faqQ5, a: t.faqA5 },
          { q: t.faqQ6, a: t.faqA6 },
          { q: t.faqQ7, a: t.faqA7 },
          { q: t.faqQ8, a: t.faqA8 },
        ].map(({ q, a }) => (
          <div key={q} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px' }}>
            <h3 style={{ fontWeight: 600, color: '#1e293b', marginBottom: '8px', fontSize: '1rem', marginTop: 0 }}>{q}</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>{a}</p>
          </div>
        ))}
      </div>

      {/* Related Tools */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px', color: '#1e293b' }}>
        {t.relatedTools}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['json-formatter', 'sql-formatter', 'json-to-csv-converter', 'regex-tester', 'hash-generator', 'jwt-decoder'].map(tool => (
          <a
            key={tool}
            href={'/' + lang + '/tools/' + tool}
            style={{
              display: 'inline-block',
              background: '#f0f9ff',
              color: '#0369a1',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              textDecoration: 'none',
              border: '1px solid #bae6fd',
            }}
          >
            {tool}
          </a>
        ))}
      </div>
    </article>
  );
}
