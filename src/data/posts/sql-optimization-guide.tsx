'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SQL Optimization Guide: Indexes, Query Tuning, Partitioning & Scaling for Production Databases',
    intro: 'SQL performance can make or break an application. A single slow query can cascade into timeouts, lock contention, and degraded user experience. This guide covers 13 essential SQL optimization topics — from reading EXPLAIN plans and designing indexes to partitioning, connection pooling, and database scaling strategies. Every section includes a practical code example you can adapt to PostgreSQL, MySQL, or your database of choice.',
    tldr: 'TL;DR',
    tldrText: 'Always start optimization by reading EXPLAIN output to understand query plans. Use composite indexes that match your WHERE and ORDER BY clauses. Replace OFFSET pagination with keyset/cursor pagination for large datasets. Solve N+1 queries with eager loading or batch queries. Use window functions instead of correlated subqueries. Partition large tables by range or hash. Size your connection pool using the formula: connections = (core_count * 2) + effective_spindle_count. Monitor slow queries with pg_stat_statements or slow_query_log, and scale horizontally with read replicas before considering sharding.',
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'EXPLAIN ANALYZE reveals actual execution time and row estimates — always compare estimated vs actual rows to detect planning errors.',
    takeaway2: 'Composite indexes should follow the left-prefix rule: put equality columns first, then range columns, then sort columns.',
    takeaway3: 'N+1 queries are the most common ORM performance bug — detect them with query logging and fix with eager loading or batch fetching.',
    takeaway4: 'OFFSET-based pagination degrades linearly with page depth. Keyset pagination maintains constant performance regardless of page number.',
    takeaway5: 'Window functions (ROW_NUMBER, RANK, LAG/LEAD) eliminate expensive self-joins and correlated subqueries.',
    takeaway6: 'Table partitioning enables partition pruning, which can reduce query scan time by orders of magnitude on large tables.',
    takeaway7: 'Connection pools should be sized conservatively — too many connections cause context-switching overhead that degrades total throughput.',
    sec1Title: '1. EXPLAIN & Query Plans',
    sec1Desc: 'Every optimization starts with understanding how the database executes your query. EXPLAIN shows the query plan chosen by the optimizer, including join strategies, index usage, and cost estimates. EXPLAIN ANALYZE actually runs the query and reports real execution times alongside estimates.',
    sec1Detail: 'Key things to look for: Seq Scan on large tables (missing index), high cost estimates, large differences between estimated and actual rows (stale statistics), nested loops on large result sets, and Sort operations without supporting indexes.',
    sec2Title: '2. Index Types & Strategies',
    sec2Desc: 'Indexes are the single most impactful optimization tool. Different index types serve different query patterns. B-tree indexes handle equality and range queries. Hash indexes are optimized for equality-only lookups. GIN indexes support full-text search and array containment. GiST indexes handle geometric and range type queries. Partial indexes reduce index size by only indexing rows that match a condition. Covering indexes include all columns needed by a query, enabling index-only scans.',
    sec3Title: '3. Query Optimization',
    sec3Desc: 'Writing efficient SQL requires understanding how the optimizer processes WHERE clauses, JOINs, and subqueries. Avoid functions on indexed columns in WHERE clauses as they prevent index usage. Prefer EXISTS over IN for correlated subqueries. Use CTEs for readability but be aware that in some databases they act as optimization fences.',
    sec3Detail: 'JOIN order matters — the optimizer usually reorders joins, but hints or explicit ordering may be needed for complex queries. Always filter early to reduce intermediate result set sizes.',
    sec4Title: '4. Index Design Patterns',
    sec4Desc: 'Effective index design requires understanding your query workload. Composite indexes must follow the left-prefix rule: the index on (a, b, c) can satisfy queries on (a), (a, b), or (a, b, c), but not (b, c) alone. Covering indexes include all SELECT columns, eliminating table lookups entirely. Index-only scans are the fastest possible access path.',
    sec5Title: '5. N+1 Query Problem',
    sec5Desc: 'The N+1 problem occurs when code fetches a list of N records, then executes one additional query per record to load related data. This results in N+1 total queries instead of 1 or 2. It is the most common ORM-related performance issue and can turn a 5ms page load into a 5-second one.',
    sec5Detail: 'Detection: Enable query logging and look for repeated identical queries with different parameters. Fix with eager loading (JOIN FETCH), batch queries (WHERE id IN (...)), or dataloader patterns.',
    sec6Title: '6. Pagination Strategies',
    sec6Desc: 'OFFSET/LIMIT pagination is simple but scales poorly — the database must scan and discard all rows before the offset. For page 1000 with 20 rows per page, the database reads 20,000 rows and discards 19,980. Keyset (cursor) pagination uses a WHERE clause on an indexed column to skip directly to the next page, maintaining constant performance.',
    sec7Title: '7. Window Functions',
    sec7Desc: 'Window functions perform calculations across a set of rows related to the current row without collapsing them into a single output row. They replace many patterns that previously required self-joins or correlated subqueries. Common window functions include ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, SUM, and AVG with OVER clauses.',
    sec8Title: '8. Common Table Expressions',
    sec8Desc: 'CTEs (WITH clauses) improve query readability by breaking complex logic into named steps. Recursive CTEs can traverse hierarchical data like org charts or category trees. In PostgreSQL 12+, non-recursive CTEs are inlined by the optimizer (no longer optimization fences). Use MATERIALIZED hint when you want to force materialization for performance.',
    sec9Title: '9. Partitioning',
    sec9Desc: 'Table partitioning splits a large table into smaller physical pieces while maintaining a single logical table. Range partitioning divides by date ranges or numeric ranges. List partitioning divides by discrete values (region, status). Hash partitioning distributes rows evenly across partitions. The optimizer prunes partitions not needed by a query, dramatically reducing I/O.',
    sec9Detail: 'Best candidates for partitioning: tables with hundreds of millions of rows, time-series data with date-based queries, and tables where old data is regularly archived or deleted.',
    sec10Title: '10. Connection Pooling',
    sec10Desc: 'Database connections are expensive resources. Each PostgreSQL connection consumes about 10MB of memory and a server-side process. Connection pooling reuses a fixed set of connections across application requests. Popular poolers include PgBouncer (external, lightweight) and HikariCP (JVM, embedded). The optimal pool size formula is: connections = (core_count * 2) + effective_spindle_count.',
    sec10Detail: 'A common mistake is setting the pool too large. A database with 16 cores performs best with around 33-35 connections total, not hundreds. Too many connections cause excessive context switching.',
    sec11Title: '11. Locking & Concurrency',
    sec11Desc: 'PostgreSQL uses MVCC (Multi-Version Concurrency Control) — readers never block writers and writers never block readers. Each transaction sees a snapshot of the database. Row-level locks are acquired for UPDATE/DELETE. Understanding lock modes and deadlock prevention is critical for high-concurrency applications.',
    sec11Detail: 'Pessimistic locking (SELECT FOR UPDATE) prevents concurrent modifications but reduces throughput. Optimistic locking (version columns) allows concurrent reads and detects conflicts at write time. Always access tables in a consistent order to prevent deadlocks.',
    sec12Title: '12. Slow Query Analysis',
    sec12Desc: 'Finding and fixing slow queries requires systematic monitoring. PostgreSQL pg_stat_statements tracks execution statistics for all queries. MySQL slow_query_log captures queries exceeding a time threshold. Both provide total execution time, call count, and average duration — focus on queries with the highest total time, not just the slowest individual execution.',
    sec13Title: '13. Database Scaling',
    sec13Desc: 'When a single server cannot handle the load, scaling strategies include vertical scaling (bigger server), read replicas (distribute read traffic), and sharding (distribute write traffic across multiple databases). Read replicas are the simplest scaling approach — route all SELECT queries to replicas and writes to the primary. Sharding adds significant application complexity and should be a last resort.',
    sec13Detail: 'Before sharding, exhaust other options: optimize queries, add indexes, implement caching (Redis/Memcached), use read replicas, partition tables, and archive old data. Most applications never need sharding.',
    faq1q: 'How do I know if my SQL query needs optimization?',
    faq1a: 'Run EXPLAIN ANALYZE on your query and look for sequential scans on large tables, high actual execution time, significant differences between estimated and actual row counts, and sort operations on unsorted data. Also monitor pg_stat_statements or slow_query_log for queries with high total execution time or high call frequency.',
    faq2q: 'What is the difference between a B-tree index and a hash index?',
    faq2a: 'B-tree indexes support equality (=), range (<, >, BETWEEN), and ORDER BY operations. They are the default and most versatile index type. Hash indexes only support equality comparisons but can be slightly faster for exact lookups. In PostgreSQL, B-tree indexes are almost always preferred because they cover more query patterns and are WAL-logged for crash safety.',
    faq3q: 'How do I fix N+1 query problems in my ORM?',
    faq3a: 'Enable query logging to detect N+1 patterns (repeated similar queries). Fix by using eager loading (e.g., JPA fetch joins, Django select_related/prefetch_related, ActiveRecord includes). Alternatively, use batch queries that load all related records in a single IN clause, or implement a dataloader pattern for GraphQL resolvers.',
    faq4q: 'When should I use table partitioning?',
    faq4a: 'Partition tables that exceed hundreds of millions of rows, especially time-series data where queries filter by date range. Partitioning enables partition pruning (skipping irrelevant data), faster bulk deletes (DROP PARTITION instead of DELETE), and parallel query execution across partitions. Avoid partitioning small tables as the overhead exceeds the benefit.',
    faq5q: 'What is the optimal database connection pool size?',
    faq5a: 'Use the formula: connections = (core_count * 2) + effective_spindle_count. For a 4-core server with SSDs, start with about 10 connections. Counter-intuitively, smaller pools often outperform larger ones because excessive connections cause context-switching overhead. Test with your workload and monitor wait times.',
    faq6q: 'How does MVCC work in PostgreSQL?',
    faq6a: 'MVCC (Multi-Version Concurrency Control) creates a new version of a row for each UPDATE instead of overwriting it. Each transaction sees a consistent snapshot based on its start time. This means readers never block writers and writers never block readers. Old row versions are cleaned up by the VACUUM process. MVCC enables high concurrency without read locks.',
    faq7q: 'Should I use OFFSET or cursor-based pagination?',
    faq7a: 'Use cursor-based (keyset) pagination for any dataset that could grow large. OFFSET pagination requires the database to scan all preceding rows, making deep pages very slow. Keyset pagination uses WHERE id > last_seen_id ORDER BY id LIMIT N, which always performs a simple index range scan regardless of page depth. OFFSET is only acceptable for small, bounded result sets.',
    faq8q: 'When should I consider sharding my database?',
    faq8a: 'Sharding should be a last resort after exhausting all other optimizations: query tuning, indexing, caching, read replicas, partitioning, and archiving old data. Consider sharding only when write throughput exceeds what a single primary server can handle, or when dataset size exceeds single-server storage capacity. Sharding adds significant complexity to joins, transactions, and schema migrations.',
  },
  zh: {
    title: 'SQL 优化指南：索引、查询调优、分区与生产数据库扩展',
    intro: 'SQL 性能可以决定一个应用的成败。一条慢查询可能级联导致超时、锁争用和用户体验下降。本指南涵盖 13 个核心 SQL 优化主题——从阅读 EXPLAIN 计划、设计索引到分区、连接池和数据库扩展策略。每个部分都包含可直接应用于 PostgreSQL、MySQL 或其他数据库的实用代码示例。',
    tldr: 'TL;DR',
    tldrText: '优化始终从阅读 EXPLAIN 输出理解查询计划开始。使用与 WHERE 和 ORDER BY 子句匹配的组合索引。对大数据集用游标分页替代 OFFSET 分页。通过预加载或批量查询解决 N+1 问题。用窗口函数替代关联子查询。对大表进行范围或哈希分区。连接池大小公式：连接数 = (CPU核心数 * 2) + 有效磁盘数。使用 pg_stat_statements 或 slow_query_log 监控慢查询，水平扩展优先使用读副本，然后再考虑分片。',
    takeawaysTitle: '关键要点',
    takeaway1: 'EXPLAIN ANALYZE 显示实际执行时间和行数估计——始终比较估计值和实际值以检测规划错误。',
    takeaway2: '组合索引应遵循最左前缀规则：等值列在前，范围列次之，排序列在后。',
    takeaway3: 'N+1 查询是最常见的 ORM 性能问题——通过查询日志检测，使用预加载或批量查询修复。',
    takeaway4: 'OFFSET 分页性能随页数线性下降。游标分页无论页码多大都保持恒定性能。',
    takeaway5: '窗口函数（ROW_NUMBER、RANK、LAG/LEAD）消除了昂贵的自连接和关联子查询。',
    takeaway6: '表分区启用分区裁剪，可将大表的查询扫描时间减少数个数量级。',
    takeaway7: '连接池应保守设置——过多连接导致上下文切换开销，反而降低总吞吐量。',
    sec1Title: '1. EXPLAIN 与查询计划',
    sec1Desc: '每次优化都从理解数据库如何执行查询开始。EXPLAIN 显示优化器选择的查询计划，包括连接策略、索引使用和成本估计。EXPLAIN ANALYZE 实际执行查询并报告真实执行时间。',
    sec1Detail: '关键检查项：大表上的顺序扫描（缺少索引）、高成本估计、估计行数与实际行数差异大（统计信息过期）、大结果集上的嵌套循环、以及没有索引支持的排序操作。',
    sec2Title: '2. 索引类型与策略',
    sec2Desc: '索引是最具影响力的优化工具。不同索引类型服务于不同查询模式。B-tree 索引处理等值和范围查询。Hash 索引仅优化等值查找。GIN 索引支持全文搜索和数组包含。GiST 索引处理几何和范围类型查询。部分索引只索引满足条件的行以减小索引大小。覆盖索引包含查询所需的所有列，实现仅索引扫描。',
    sec3Title: '3. 查询优化',
    sec3Desc: '编写高效 SQL 需要理解优化器如何处理 WHERE 子句、JOIN 和子查询。避免在索引列上使用函数，因为它们会阻止索引使用。关联子查询优先使用 EXISTS 而非 IN。CTE 提高可读性，但在某些数据库中可能充当优化屏障。',
    sec3Detail: 'JOIN 顺序很重要——优化器通常会重新排序连接，但复杂查询可能需要提示或显式排序。始终尽早过滤以减少中间结果集大小。',
    sec4Title: '4. 索引设计模式',
    sec4Desc: '有效的索引设计需要理解查询工作负载。组合索引必须遵循最左前缀规则：(a, b, c) 上的索引可以满足 (a)、(a, b) 或 (a, b, c) 的查询，但不能满足仅 (b, c) 的查询。覆盖索引包含所有 SELECT 列，完全消除表查找。仅索引扫描是最快的访问路径。',
    sec5Title: '5. N+1 查询问题',
    sec5Desc: 'N+1 问题发生在代码获取 N 条记录后，对每条记录执行一次额外查询来加载关联数据。这导致 N+1 次查询而非 1 或 2 次。这是最常见的 ORM 相关性能问题，可能将 5ms 的页面加载变成 5 秒。',
    sec5Detail: '检测方法：启用查询日志，查找参数不同但结构相同的重复查询。修复方式：预加载（JOIN FETCH）、批量查询（WHERE id IN (...)）或 dataloader 模式。',
    sec6Title: '6. 分页策略',
    sec6Desc: 'OFFSET/LIMIT 分页简单但扩展性差——数据库必须扫描并丢弃偏移量之前的所有行。第 1000 页每页 20 行，数据库读取 20,000 行却丢弃 19,980 行。游标分页使用索引列上的 WHERE 子句直接跳到下一页，保持恒定性能。',
    sec7Title: '7. 窗口函数',
    sec7Desc: '窗口函数在与当前行相关的一组行上执行计算，而不将其折叠为单一输出行。它们替代了许多之前需要自连接或关联子查询的模式。常用窗口函数包括 ROW_NUMBER、RANK、DENSE_RANK、LAG、LEAD、SUM 和 AVG 配合 OVER 子句。',
    sec8Title: '8. 公共表表达式',
    sec8Desc: 'CTE（WITH 子句）通过将复杂逻辑分解为命名步骤来提高查询可读性。递归 CTE 可以遍历层级数据，如组织架构或分类树。在 PostgreSQL 12+ 中，非递归 CTE 被优化器内联（不再是优化屏障）。需要时使用 MATERIALIZED 提示强制物化以提升性能。',
    sec9Title: '9. 分区',
    sec9Desc: '表分区将大表拆分为较小的物理部分，同时维护单一逻辑表。范围分区按日期或数值范围划分。列表分区按离散值划分（地区、状态）。哈希分区将行均匀分布到各分区。优化器裁剪查询不需要的分区，显著减少 I/O。',
    sec9Detail: '最佳分区候选：数亿行的表、基于日期查询的时序数据、以及定期归档或删除旧数据的表。',
    sec10Title: '10. 连接池',
    sec10Desc: '数据库连接是昂贵的资源。每个 PostgreSQL 连接消耗约 10MB 内存和一个服务器端进程。连接池在应用请求之间复用固定数量的连接。流行的连接池包括 PgBouncer（外部、轻量级）和 HikariCP（JVM、嵌入式）。最佳池大小公式：连接数 = (CPU核心数 * 2) + 有效磁盘数。',
    sec10Detail: '常见错误是设置过大的连接池。16 核数据库的最佳总连接数约 33-35 个，而非数百个。过多连接导致过度上下文切换。',
    sec11Title: '11. 锁与并发',
    sec11Desc: 'PostgreSQL 使用 MVCC（多版本并发控制）——读不阻塞写，写不阻塞读。每个事务看到数据库的一个快照。UPDATE/DELETE 获取行级锁。理解锁模式和死锁预防对高并发应用至关重要。',
    sec11Detail: '悲观锁（SELECT FOR UPDATE）防止并发修改但降低吞吐量。乐观锁（版本列）允许并发读取并在写入时检测冲突。始终以一致的顺序访问表以防止死锁。',
    sec12Title: '12. 慢查询分析',
    sec12Desc: '查找和修复慢查询需要系统性监控。PostgreSQL pg_stat_statements 跟踪所有查询的执行统计。MySQL slow_query_log 捕获超过时间阈值的查询。两者都提供总执行时间、调用次数和平均持续时间——关注总时间最高的查询，而非单次最慢的执行。',
    sec13Title: '13. 数据库扩展',
    sec13Desc: '当单台服务器无法承载负载时，扩展策略包括垂直扩展（更大的服务器）、读副本（分发读流量）和分片（将写流量分布到多个数据库）。读副本是最简单的扩展方式——将所有 SELECT 路由到副本，写操作发送到主库。分片增加显著的应用复杂性，应作为最后手段。',
    sec13Detail: '分片前先穷尽其他选项：优化查询、添加索引、实现缓存（Redis/Memcached）、使用读副本、表分区和归档旧数据。大多数应用永远不需要分片。',
    faq1q: '如何判断 SQL 查询是否需要优化？',
    faq1a: '对查询运行 EXPLAIN ANALYZE，检查大表上的顺序扫描、高实际执行时间、估计行数与实际行数的显著差异以及无序数据上的排序操作。同时监控 pg_stat_statements 或 slow_query_log 中总执行时间或调用频率高的查询。',
    faq2q: 'B-tree 索引和 Hash 索引有什么区别？',
    faq2a: 'B-tree 索引支持等值（=）、范围（<、>、BETWEEN）和 ORDER BY 操作，是默认且最通用的索引类型。Hash 索引仅支持等值比较，但精确查找可能略快。在 PostgreSQL 中，几乎总是首选 B-tree 索引，因为它覆盖更多查询模式且支持 WAL 日志以确保崩溃安全。',
    faq3q: '如何修复 ORM 中的 N+1 查询问题？',
    faq3a: '启用查询日志检测 N+1 模式（重复的相似查询）。使用预加载修复（如 JPA fetch join、Django select_related/prefetch_related、ActiveRecord includes）。或者使用批量查询在单个 IN 子句中加载所有关联记录，或为 GraphQL 解析器实现 dataloader 模式。',
    faq4q: '什么时候应该使用表分区？',
    faq4a: '当表超过数亿行时进行分区，尤其是按日期范围过滤查询的时序数据。分区支持分区裁剪（跳过无关数据）、更快的批量删除（DROP PARTITION 代替 DELETE）和跨分区的并行查询执行。避免对小表分区，因为开销大于收益。',
    faq5q: '数据库连接池的最佳大小是多少？',
    faq5a: '使用公式：连接数 = (CPU核心数 * 2) + 有效磁盘数。4 核 SSD 服务器约 10 个连接起步。反直觉的是，较小的池通常优于较大的池，因为过多连接导致上下文切换开销。根据工作负载测试并监控等待时间。',
    faq6q: 'PostgreSQL 中的 MVCC 如何工作？',
    faq6a: 'MVCC（多版本并发控制）为每次 UPDATE 创建行的新版本而非覆盖。每个事务根据开始时间看到一致的快照。这意味着读不阻塞写，写不阻塞读。旧行版本由 VACUUM 进程清理。MVCC 实现了无读锁的高并发。',
    faq7q: '应该使用 OFFSET 还是游标分页？',
    faq7a: '对任何可能增长的数据集使用游标（keyset）分页。OFFSET 分页需要扫描所有前面的行，深层页面非常慢。游标分页使用 WHERE id > last_seen_id ORDER BY id LIMIT N，无论页深度如何都执行简单的索引范围扫描。OFFSET 仅适用于小型有界结果集。',
    faq8q: '什么时候应该考虑数据库分片？',
    faq8a: '分片应是穷尽所有其他优化后的最后手段：查询调优、索引、缓存、读副本、分区和归档旧数据。仅当写吞吐量超过单台主服务器承载能力，或数据集大小超过单服务器存储容量时才考虑分片。分片为连接、事务和模式迁移增加了显著复杂性。',
  },
};

const codeExplain = `-- Run EXPLAIN ANALYZE to see actual execution
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE u.created_at > '2025-01-01'
GROUP BY u.name
ORDER BY order_count DESC
LIMIT 20;

-- Key output fields to examine:
-- Seq Scan vs Index Scan (is an index being used?)
-- actual time=0.02..12.45 (startup..total time)
-- rows=1000 (estimated) vs actual rows=847
-- Sort Method: quicksort Memory: 128kB`;

const codeIndexTypes = `-- B-tree index (default, most common)
CREATE INDEX idx_users_email ON users (email);

-- Partial index (only active users)
CREATE INDEX idx_active_users ON users (email)
  WHERE status = 'active';

-- GIN index for full-text search
CREATE INDEX idx_posts_search ON posts
  USING gin(to_tsvector('english', title || ' ' || body));

-- Covering index (includes columns for index-only scan)
CREATE INDEX idx_orders_covering ON orders (user_id)
  INCLUDE (total_amount, created_at);

-- Hash index (equality only, slightly faster)
CREATE INDEX idx_sessions_token ON sessions
  USING hash (session_token);`;

const codeQueryOpt = `-- BAD: function on indexed column prevents index use
SELECT * FROM users
WHERE LOWER(email) = 'user@example.com';

-- GOOD: use expression index or store normalized
CREATE INDEX idx_users_email_lower
  ON users (LOWER(email));

-- BAD: SELECT * fetches unnecessary columns
SELECT * FROM orders WHERE user_id = 42;

-- GOOD: select only needed columns
SELECT id, total_amount, created_at
FROM orders WHERE user_id = 42;

-- Use EXISTS instead of IN for correlated subquery
SELECT * FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.user_id = u.id AND o.total > 100
);`;

const codeIndexDesign = `-- Composite index: equality first, range second
-- Query: WHERE status = 'active' AND created_at > ?
CREATE INDEX idx_status_created
  ON orders (status, created_at);

-- This index supports ORDER BY as well
-- WHERE status = 'active' ORDER BY created_at DESC
CREATE INDEX idx_status_created_desc
  ON orders (status, created_at DESC);

-- Covering index for index-only scans
-- Query: SELECT email, name FROM users WHERE status = 'active'
CREATE INDEX idx_users_status_covering
  ON users (status) INCLUDE (email, name);

-- Verify index-only scan in EXPLAIN output:
-- "Index Only Scan using idx_users_status_covering"`;

const codeN1 = `-- N+1 Problem: 1 query for users + N queries for orders
-- Query 1: SELECT * FROM users LIMIT 50;
-- Query 2..51: SELECT * FROM orders WHERE user_id = ?;

-- FIX 1: JOIN (eager loading)
SELECT u.*, o.id AS order_id, o.total_amount
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.id IN (SELECT id FROM users LIMIT 50);

-- FIX 2: Batch query (two queries total)
-- Step 1: SELECT * FROM users LIMIT 50;
-- Step 2: collect user_ids, then:
SELECT * FROM orders
WHERE user_id IN (1, 2, 3, 4, 5, 7, 8, 12, 15, 20);

-- FIX 3: Django ORM example
-- BAD:  User.objects.all()[:50]  (triggers N+1)
-- GOOD: User.objects.prefetch_related('orders')[:50]`;

const codePagination = `-- BAD: OFFSET pagination (slow for deep pages)
SELECT * FROM products
ORDER BY id
LIMIT 20 OFFSET 10000;  -- scans 10020 rows!

-- GOOD: Keyset / cursor pagination
SELECT * FROM products
WHERE id > 50240  -- last seen ID from previous page
ORDER BY id
LIMIT 20;  -- always scans exactly 20 rows

-- For multi-column sorting:
SELECT * FROM products
WHERE (created_at, id) > ('2025-06-15', 9823)
ORDER BY created_at, id
LIMIT 20;

-- Encode cursor as base64 for API responses
-- cursor: eyJjcmVhdGVkX2F0IjoiMjAyNS0wNi0xNSIsImlkIjo5ODIzfQ==`;

const codeWindow = `-- ROW_NUMBER: assign sequential numbers
SELECT name, department, salary,
  ROW_NUMBER() OVER (
    PARTITION BY department ORDER BY salary DESC
  ) AS dept_rank
FROM employees;

-- LAG / LEAD: access previous / next row values
SELECT date, revenue,
  revenue - LAG(revenue) OVER (ORDER BY date) AS daily_change,
  LEAD(revenue) OVER (ORDER BY date) AS next_day_revenue
FROM daily_sales;

-- Running total with SUM window function
SELECT date, amount,
  SUM(amount) OVER (
    ORDER BY date ROWS UNBOUNDED PRECEDING
  ) AS running_total
FROM transactions;`;

const codeCTE = `-- Recursive CTE: traverse org chart hierarchy
WITH RECURSIVE org_tree AS (
  -- Base case: top-level managers
  SELECT id, name, manager_id, 1 AS depth
  FROM employees WHERE manager_id IS NULL

  UNION ALL

  -- Recursive step: find direct reports
  SELECT e.id, e.name, e.manager_id, t.depth + 1
  FROM employees e
  JOIN org_tree t ON e.manager_id = t.id
  WHERE t.depth < 10  -- prevent infinite loops
)
SELECT * FROM org_tree ORDER BY depth, name;

-- Materialized CTE (PostgreSQL 12+)
WITH expensive_calc AS MATERIALIZED (
  SELECT user_id, SUM(amount) AS total
  FROM orders GROUP BY user_id
)
SELECT * FROM expensive_calc WHERE total > 1000;`;

const codePartition = `-- Range partitioning by date (PostgreSQL)
CREATE TABLE events (
  id         BIGSERIAL,
  event_type TEXT,
  payload    JSONB,
  created_at TIMESTAMPTZ NOT NULL
) PARTITION BY RANGE (created_at);

-- Create monthly partitions
CREATE TABLE events_2025_01 PARTITION OF events
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
CREATE TABLE events_2025_02 PARTITION OF events
  FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');

-- Queries automatically prune irrelevant partitions
SELECT * FROM events
WHERE created_at >= '2025-02-01'
  AND created_at < '2025-03-01';
-- Only scans events_2025_02 partition`;

const codePooling = `-- PgBouncer configuration (pgbouncer.ini)
-- [databases]
-- mydb = host=localhost port=5432 dbname=mydb
--
-- [pgbouncer]
-- listen_port = 6432
-- pool_mode = transaction
-- max_client_conn = 1000
-- default_pool_size = 20
-- min_pool_size = 5

-- Pool sizing formula:
-- connections = (core_count * 2) + spindle_count
-- 4-core SSD server: (4 * 2) + 1 = 9 connections

-- HikariCP (Java / Spring Boot)
-- spring.datasource.hikari.maximum-pool-size=10
-- spring.datasource.hikari.minimum-idle=5
-- spring.datasource.hikari.idle-timeout=300000
-- spring.datasource.hikari.connection-timeout=20000
-- spring.datasource.hikari.max-lifetime=1200000`;

const codeLocking = `-- Pessimistic locking: SELECT FOR UPDATE
BEGIN;
SELECT * FROM inventory
WHERE product_id = 42
FOR UPDATE;  -- locks this row

UPDATE inventory
SET quantity = quantity - 1
WHERE product_id = 42;
COMMIT;

-- Optimistic locking: version column
UPDATE products
SET price = 29.99, version = version + 1
WHERE id = 42 AND version = 5;
-- If 0 rows updated -> conflict detected, retry

-- Advisory locks for application-level locking
SELECT pg_advisory_lock(hashtext('process-orders'));
-- ... do exclusive work ...
SELECT pg_advisory_unlock(hashtext('process-orders'));`;

const codeSlowQuery = `-- Enable pg_stat_statements (postgresql.conf)
-- shared_preload_libraries = 'pg_stat_statements'
-- pg_stat_statements.track = all

-- Find top 10 slowest queries by total time
SELECT query,
  calls,
  round(total_exec_time::numeric, 2) AS total_ms,
  round(mean_exec_time::numeric, 2) AS avg_ms,
  rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- MySQL: enable slow query log
-- SET GLOBAL slow_query_log = 'ON';
-- SET GLOBAL long_query_time = 1;  -- seconds
-- SET GLOBAL log_queries_not_using_indexes = 'ON';`;

const codeScaling = `-- Read replica routing (application level)
-- Primary: INSERT, UPDATE, DELETE
-- Replica: SELECT queries

-- PostgreSQL streaming replication setup:
-- primary postgresql.conf:
-- wal_level = replica
-- max_wal_senders = 10

-- replica recovery.conf:
-- primary_conninfo = 'host=primary port=5432'
-- standby_mode = on

-- Application-level read/write splitting
-- const db = {
--   primary: new Pool({ host: 'primary-db' }),
--   replica: new Pool({ host: 'replica-db' }),
-- };
-- const read = (sql) => db.replica.query(sql);
-- const write = (sql) => db.primary.query(sql);`;

export default function SqlOptimizationGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
  const t = translations[lang] || translations.en;

  const preStyle: React.CSSProperties = {
    background: '#1e1e1e',
    color: '#d4d4d4',
    padding: '1.25rem',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  };

  const tldrStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '1.25rem 1.5rem',
    borderRadius: '0 8px 8px 0',
    marginBottom: '2rem',
  };

  const takeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '1.25rem 1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  };

  const sectionStyle: React.CSSProperties = {
    marginTop: '2.5rem',
  };

  const faqBoxStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '4px solid #0ea5e9',
  };

  const tipStyle: React.CSSProperties = {
    background: '#fffbeb',
    borderLeft: '4px solid #f59e0b',
    padding: '1rem 1.25rem',
    borderRadius: '0 8px 8px 0',
    marginBottom: '1.5rem',
    marginTop: '1rem',
  };

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
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Intro */}
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={tldrStyle}>
        <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.1rem' }}>{t.tldr}</h3>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.tldrText}</p>
      </div>

      {/* Key Takeaways */}
      <div style={takeawaysStyle}>
        <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.1rem' }}>{t.takeawaysTitle}</h3>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.9' }}>
          <li>{t.takeaway1}</li>
          <li>{t.takeaway2}</li>
          <li>{t.takeaway3}</li>
          <li>{t.takeaway4}</li>
          <li>{t.takeaway5}</li>
          <li>{t.takeaway6}</li>
          <li>{t.takeaway7}</li>
        </ul>
      </div>

      {/* Section 1: EXPLAIN & Query Plans */}
      <h2 style={sectionStyle}>{t.sec1Title}</h2>
      <p>{t.sec1Desc}</p>
      <p>{t.sec1Detail}</p>
      <p>
        {isZh
          ? '在 PostgreSQL 中，EXPLAIN 输出包含多种节点类型：Seq Scan（全表扫描）、Index Scan（索引扫描）、Bitmap Heap Scan（位图堆扫描）、Nested Loop、Hash Join 和 Merge Join。每个节点显示估计成本（startup..total）、估计行数和宽度。EXPLAIN ANALYZE 增加实际时间和行数，帮助发现估计偏差。'
          : 'In PostgreSQL, EXPLAIN output contains multiple node types: Seq Scan (full table scan), Index Scan, Bitmap Heap Scan, Nested Loop, Hash Join, and Merge Join. Each node shows estimated cost (startup..total), estimated rows, and width. EXPLAIN ANALYZE adds actual time and rows, helping detect estimation errors.'}
      </p>
      <pre style={preStyle}><code>{codeExplain}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '在生产环境中运行 EXPLAIN ANALYZE 要谨慎——它会实际执行查询。对修改数据的语句（UPDATE/DELETE），将其包装在事务中并 ROLLBACK：BEGIN; EXPLAIN ANALYZE UPDATE ...; ROLLBACK;'
          : 'Be cautious running EXPLAIN ANALYZE in production — it actually executes the query. For data-modifying statements (UPDATE/DELETE), wrap in a transaction and ROLLBACK: BEGIN; EXPLAIN ANALYZE UPDATE ...; ROLLBACK;'}
      </div>

      {/* Section 2: Index Types & Strategies */}
      <h2 style={sectionStyle}>{t.sec2Title}</h2>
      <p>{t.sec2Desc}</p>
      <p>
        {isZh
          ? '选择正确的索引类型至关重要。B-tree 覆盖 90% 的场景。对 JSONB 列使用 GIN 索引。对地理空间数据使用 GiST 索引。部分索引通过只索引热数据显著减少索引大小和维护开销。记住每个索引都会减慢 INSERT/UPDATE 操作——只创建查询确实需要的索引。'
          : 'Choosing the right index type is critical. B-tree covers 90% of use cases. Use GIN indexes for JSONB columns. Use GiST indexes for geospatial data. Partial indexes significantly reduce index size and maintenance overhead by only indexing hot data. Remember that every index slows down INSERT/UPDATE operations — only create indexes that your queries actually need.'}
      </p>
      <pre style={preStyle}><code>{codeIndexTypes}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '使用 pg_stat_user_indexes 定期审查索引使用情况。idx_scan = 0 的索引可能是浪费空间的候选——但在删除前确认它不是用于唯一约束或外键。'
          : 'Use pg_stat_user_indexes to periodically audit index usage. Indexes with idx_scan = 0 may be candidates for removal — but verify they are not enforcing unique constraints or foreign keys before dropping.'}
      </div>

      {/* Section 3: Query Optimization */}
      <h2 style={sectionStyle}>{t.sec3Title}</h2>
      <p>{t.sec3Desc}</p>
      <p>{t.sec3Detail}</p>
      <p>
        {isZh
          ? '另一个常见陷阱是隐式类型转换。当 WHERE 子句中的列类型与比较值不匹配时（如将字符串与整数比较），数据库可能对整列应用类型转换函数，使索引失效。始终确保比较值的类型与列类型一致。'
          : 'Another common pitfall is implicit type casting. When the column type in a WHERE clause does not match the comparison value (e.g., comparing a string column to an integer), the database may apply a cast function to the entire column, invalidating the index. Always ensure comparison value types match the column type.'}
      </p>
      <pre style={preStyle}><code>{codeQueryOpt}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '使用 SELECT * 不仅浪费带宽，还会阻止覆盖索引（index-only scan）的使用。始终明确列出所需列。此外，对于只需要检查存在性的查询，使用 SELECT 1 配合 EXISTS 而非 SELECT COUNT(*)。'
          : 'Using SELECT * not only wastes bandwidth but also prevents the use of covering indexes (index-only scans). Always explicitly list needed columns. Additionally, for queries that only need to check existence, use SELECT 1 with EXISTS instead of SELECT COUNT(*).'}
      </div>

      {/* Section 4: Index Design Patterns */}
      <h2 style={sectionStyle}>{t.sec4Title}</h2>
      <p>{t.sec4Desc}</p>
      <p>
        {isZh
          ? '设计组合索引时的经验法则（ESR 规则）：先放 Equality 列（精确匹配），再放 Sort 列（ORDER BY），最后放 Range 列（范围扫描）。这个顺序让索引满足尽可能多的查询操作而无需额外排序或回表。使用 pg_stat_user_indexes 视图监控索引使用情况，删除未使用的索引。'
          : 'The rule of thumb for composite index design (ESR rule): put Equality columns first (exact matches), then Sort columns (ORDER BY), then Range columns (range scans). This ordering lets the index satisfy as many query operations as possible without extra sorting or table lookups. Use the pg_stat_user_indexes view to monitor index usage and drop unused indexes.'}
      </p>
      <pre style={preStyle}><code>{codeIndexDesign}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '使用 INCLUDE 子句（PostgreSQL 11+）创建覆盖索引比在组合索引中包含所有列更好——INCLUDE 列不参与索引排序和查找，只是附带存储以支持 index-only scan。这减少了索引维护开销同时保持了快速扫描能力。'
          : 'Using the INCLUDE clause (PostgreSQL 11+) for covering indexes is better than including all columns in the composite index — INCLUDE columns do not participate in index sorting and lookups, they are just stored alongside to support index-only scans. This reduces index maintenance overhead while maintaining fast scan capability.'}
      </div>

      {/* Section 5: N+1 Query Problem */}
      <h2 style={sectionStyle}>{t.sec5Title}</h2>
      <p>{t.sec5Desc}</p>
      <p>{t.sec5Detail}</p>
      <p>
        {isZh
          ? '在 GraphQL 应用中，N+1 问题尤为严重，因为解析器按字段独立执行。Facebook 的 DataLoader 模式是标准解决方案：它收集一个事件循环周期内的所有加载请求，然后用一次批量查询满足所有请求。Node.js、Python、Ruby 和 Java 都有 DataLoader 实现。'
          : 'In GraphQL applications, the N+1 problem is especially severe because resolvers execute independently per field. Facebook\'s DataLoader pattern is the standard solution: it collects all load requests within a single event loop tick, then satisfies them all with one batch query. DataLoader implementations exist for Node.js, Python, Ruby, and Java.'}
      </p>
      <pre style={preStyle}><code>{codeN1}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '使用 Django 的 nplusone 包、Ruby 的 Bullet gem 或 Java 的 Hibernate SQL 日志（hibernate.show_sql=true）在开发阶段自动检测 N+1 查询。在 CI 管道中集成这些工具可以防止 N+1 回归。'
          : 'Use Django\'s nplusone package, Ruby\'s Bullet gem, or Java\'s Hibernate SQL logging (hibernate.show_sql=true) to automatically detect N+1 queries during development. Integrating these tools in your CI pipeline prevents N+1 regressions.'}
      </div>

      {/* Section 6: Pagination Strategies */}
      <h2 style={sectionStyle}>{t.sec6Title}</h2>
      <p>{t.sec6Desc}</p>
      <p>
        {isZh
          ? '游标分页的限制是不支持"跳转到第 N 页"，只支持"下一页/上一页"导航。对于需要页码的 UI，可以用混合方案：前几页用 OFFSET（性能尚可），深层页面引导用户使用搜索或过滤来缩小结果集。API 分页几乎总应该使用游标方式。'
          : 'The limitation of cursor pagination is that it does not support "jump to page N" — only "next/previous" navigation. For UIs that need page numbers, use a hybrid approach: use OFFSET for the first few pages (performance is acceptable), and for deep pages, guide users to use search or filters to narrow the result set. API pagination should almost always use cursor-based approach.'}
      </p>
      <pre style={preStyle}><code>{codePagination}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '对于 GraphQL API，Relay 规范定义了标准的游标分页接口（first/after/last/before），大多数 GraphQL 框架内置支持。REST API 可以在 Link header 或响应 body 中返回 next_cursor 字段。'
          : 'For GraphQL APIs, the Relay specification defines a standard cursor pagination interface (first/after/last/before), which most GraphQL frameworks support out of the box. REST APIs can return a next_cursor field in the Link header or response body.'}
      </div>

      {/* Section 7: Window Functions */}
      <h2 style={sectionStyle}>{t.sec7Title}</h2>
      <p>{t.sec7Desc}</p>
      <p>
        {isZh
          ? '窗口函数的 PARTITION BY 子句将行分组（类似 GROUP BY 但不折叠行），ORDER BY 定义窗口内的排序。帧子句（ROWS BETWEEN / RANGE BETWEEN）控制计算包含哪些行。默认帧是 RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW，这对运行总计很有用，但对移动平均需要显式指定帧范围。'
          : 'The PARTITION BY clause in window functions groups rows (similar to GROUP BY but without collapsing rows), ORDER BY defines ordering within the window. The frame clause (ROWS BETWEEN / RANGE BETWEEN) controls which rows are included in the calculation. The default frame is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, useful for running totals, but moving averages require explicit frame specification.'}
      </p>
      <pre style={preStyle}><code>{codeWindow}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '窗口函数比等效的自连接快得多，因为数据库只需扫描表一次。如果需要对同一数据应用多个窗口函数，在同一个 SELECT 中定义它们——数据库通常可以在一次扫描中计算多个窗口。使用 WINDOW 子句命名窗口定义以避免重复。'
          : 'Window functions are much faster than equivalent self-joins because the database only needs to scan the table once. If you need multiple window functions on the same data, define them in the same SELECT — the database can usually compute multiple windows in a single pass. Use the WINDOW clause to name window definitions and avoid repetition.'}
      </div>

      {/* Section 8: Common Table Expressions */}
      <h2 style={sectionStyle}>{t.sec8Title}</h2>
      <p>{t.sec8Desc}</p>
      <p>
        {isZh
          ? '递归 CTE 的核心结构是：基础查询 UNION ALL 递归查询。递归查询引用 CTE 自身，每次迭代产生新行，直到没有新行产生为止。始终添加深度限制（WHERE depth < N）或使用 CYCLE 检测来防止无限循环。递归 CTE 是处理树形结构、图遍历和层级数据的标准方法。'
          : 'The core structure of recursive CTEs is: base query UNION ALL recursive query. The recursive query references the CTE itself, each iteration producing new rows until no new rows are generated. Always add a depth limit (WHERE depth < N) or use CYCLE detection to prevent infinite loops. Recursive CTEs are the standard approach for tree structures, graph traversal, and hierarchical data.'}
      </p>
      <pre style={preStyle}><code>{codeCTE}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '在 MySQL 8.0 中，CTE 默认会被物化（每次引用都重新计算）。如果 CTE 只被引用一次，MySQL 会自动内联。PostgreSQL 12+ 则默认内联非递归 CTE，除非使用 MATERIALIZED 关键字。了解你所用数据库的 CTE 行为差异对写出高效查询至关重要。'
          : 'In MySQL 8.0, CTEs are materialized by default (recomputed on each reference). If a CTE is referenced only once, MySQL inlines it automatically. PostgreSQL 12+ inlines non-recursive CTEs by default unless the MATERIALIZED keyword is used. Understanding CTE behavior differences in your database is critical for writing efficient queries.'}
      </div>

      {/* Section 9: Partitioning */}
      <h2 style={sectionStyle}>{t.sec9Title}</h2>
      <p>{t.sec9Desc}</p>
      <p>{t.sec9Detail}</p>
      <p>
        {isZh
          ? '分区维护建议：为时序数据设置自动创建未来分区的 cron 任务。使用 pg_partman 扩展自动化分区管理。旧分区可以 DETACH 后移动到冷存储或直接 DROP，比 DELETE 百万行快几个数量级。PostgreSQL 14+ 支持分区表上的并行查询，进一步提升性能。'
          : 'Partition maintenance tips: Set up a cron job to auto-create future partitions for time-series data. Use the pg_partman extension to automate partition management. Old partitions can be DETACHed and moved to cold storage or DROPped directly, which is orders of magnitude faster than DELETEing millions of rows. PostgreSQL 14+ supports parallel queries on partitioned tables for further performance gains.'}
      </p>
      <pre style={preStyle}><code>{codePartition}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '创建分区表后记得在分区键上创建索引——分区表的索引不会自动继承。使用 CREATE INDEX ON events (event_type) 会自动在所有现有和未来分区上创建对应索引。'
          : 'Remember to create indexes on partition keys after creating partitioned tables — indexes are not automatically inherited. Using CREATE INDEX ON events (event_type) will automatically create corresponding indexes on all existing and future partitions.'}
      </div>

      {/* Section 10: Connection Pooling */}
      <h2 style={sectionStyle}>{t.sec10Title}</h2>
      <p>{t.sec10Desc}</p>
      <p>{t.sec10Detail}</p>
      <p>
        {isZh
          ? 'PgBouncer 支持三种池模式：session（连接绑定到整个会话，兼容性最好）、transaction（连接在事务结束后归还池，推荐用于大多数应用）、statement（每条语句后归还，不支持事务）。对于微服务架构，建议在每个服务前部署 PgBouncer 实例，然后服务器端再部署一个汇总层。'
          : 'PgBouncer supports three pool modes: session (connection bound to entire session, best compatibility), transaction (connection returned to pool after transaction ends, recommended for most applications), and statement (returned after each statement, does not support transactions). For microservice architectures, deploy a PgBouncer instance in front of each service, plus a server-side aggregation layer.'}
      </p>
      <pre style={preStyle}><code>{codePooling}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '监控连接池的关键指标：等待连接的请求数、平均获取连接的等待时间和活跃连接数。如果等待时间持续超过 100ms，可能需要略微增加池大小或优化慢查询以更快释放连接。'
          : 'Key connection pool metrics to monitor: requests waiting for a connection, average connection acquisition wait time, and active connection count. If wait time consistently exceeds 100ms, you may need to slightly increase pool size or optimize slow queries to release connections faster.'}
      </div>

      {/* Section 11: Locking & Concurrency */}
      <h2 style={sectionStyle}>{t.sec11Title}</h2>
      <p>{t.sec11Desc}</p>
      <p>{t.sec11Detail}</p>
      <p>
        {isZh
          ? '死锁预防的关键原则：所有事务以相同顺序访问表和行。保持事务尽量短小。避免在事务中进行用户交互或外部 API 调用。设置合理的 lock_timeout 和 statement_timeout。使用 pg_locks 视图和 log_lock_waits 参数监控锁争用。出现死锁时，PostgreSQL 会自动中止一个事务——应用层需要实现重试逻辑。'
          : 'Key principles for deadlock prevention: all transactions access tables and rows in the same order. Keep transactions as short as possible. Avoid user interaction or external API calls within transactions. Set reasonable lock_timeout and statement_timeout values. Monitor lock contention using the pg_locks view and log_lock_waits parameter. When deadlocks occur, PostgreSQL automatically aborts one transaction — the application layer needs retry logic.'}
      </p>
      <pre style={preStyle}><code>{codeLocking}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '对于高并发计数器场景（如库存扣减、余额更新），考虑使用 PostgreSQL 的 SELECT FOR UPDATE SKIP LOCKED 跳过已锁定行处理下一个，或使用 advisory lock 实现应用级互斥。避免在热点行上使用长事务。'
          : 'For high-concurrency counter scenarios (inventory deduction, balance updates), consider PostgreSQL SELECT FOR UPDATE SKIP LOCKED to skip locked rows and process the next one, or use advisory locks for application-level mutual exclusion. Avoid long transactions on hot rows.'}
      </div>

      {/* Section 12: Slow Query Analysis */}
      <h2 style={sectionStyle}>{t.sec12Title}</h2>
      <p>{t.sec12Desc}</p>
      <p>
        {isZh
          ? '优化工作流程：首先按总执行时间排序识别高影响查询。然后对每个查询运行 EXPLAIN ANALYZE 理解执行计划。检查是否缺少索引、统计信息是否过期（运行 ANALYZE 更新）、查询是否可以重写。修复后验证改进并持续监控。auto_explain 扩展可以自动记录慢查询的执行计划，是诊断间歇性性能问题的利器。'
          : 'Optimization workflow: First sort by total execution time to identify high-impact queries. Then run EXPLAIN ANALYZE on each query to understand the execution plan. Check for missing indexes, stale statistics (run ANALYZE to update), and whether the query can be rewritten. Verify improvements after fixes and continue monitoring. The auto_explain extension automatically logs execution plans for slow queries, which is invaluable for diagnosing intermittent performance issues.'}
      </p>
      <pre style={preStyle}><code>{codeSlowQuery}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '定期运行 pg_stat_statements_reset() 重置统计信息，以获取最近时间窗口的准确数据。结合 pg_stat_statements 和 auto_explain，可以自动捕获慢查询的执行计划。设置 auto_explain.log_min_duration = 1000 记录超过 1 秒的查询计划。'
          : 'Periodically run pg_stat_statements_reset() to reset statistics and get accurate data for the recent time window. Combine pg_stat_statements with auto_explain to automatically capture execution plans for slow queries. Set auto_explain.log_min_duration = 1000 to log plans for queries exceeding 1 second.'}
      </div>

      {/* Section 13: Database Scaling */}
      <h2 style={sectionStyle}>{t.sec13Title}</h2>
      <p>{t.sec13Desc}</p>
      <p>{t.sec13Detail}</p>
      <p>
        {isZh
          ? '读副本的实现要点：配置流复制（streaming replication），应用层按查询类型路由（写到主库，读到副本）。注意副本存在复制延迟（通常毫秒级），对一致性要求极高的读操作仍需路由到主库。ProxySQL（MySQL）或 Pgpool-II（PostgreSQL）可以自动处理读写分离。分片策略包括按 ID 范围分片、按哈希分片和按租户分片（多租户 SaaS 最常用）。'
          : 'Read replica implementation notes: Configure streaming replication, route queries at the application level by type (writes to primary, reads to replica). Note that replicas have replication lag (typically milliseconds), and reads requiring strict consistency must still go to the primary. ProxySQL (MySQL) or Pgpool-II (PostgreSQL) can handle read/write splitting automatically. Sharding strategies include range-based sharding by ID, hash-based sharding, and tenant-based sharding (most common for multi-tenant SaaS).'}
      </p>
      <pre style={preStyle}><code>{codeScaling}</code></pre>
      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '在实施读写分离之前，先量化读写比例。大多数 Web 应用是 90%+ 读操作，一个读副本可能就足够了。使用 ProxySQL 或 Pgpool-II 可以透明地将查询路由到合适的节点，无需修改应用代码。'
          : 'Before implementing read/write splitting, quantify your read/write ratio. Most web applications are 90%+ reads, and a single read replica may be sufficient. Using ProxySQL or Pgpool-II can transparently route queries to the appropriate node without modifying application code.'}
      </div>

      {/* Conclusion */}
      <h2 style={sectionStyle}>{isZh ? '总结：SQL 优化检查清单' : 'Conclusion: SQL Optimization Checklist'}</h2>
      <p>
        {isZh
          ? 'SQL 优化不是一次性工作，而是持续的过程。以下是一个实用的优化检查清单，按优先级排序：'
          : 'SQL optimization is not a one-time task but an ongoing process. Here is a practical optimization checklist, ordered by priority:'}
      </p>
      <ol style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>
          <strong>{isZh ? '监控优先' : 'Monitor first'}</strong>{' — '}
          {isZh
            ? '启用 pg_stat_statements 或 slow_query_log，识别总执行时间最高的查询'
            : 'Enable pg_stat_statements or slow_query_log, identify queries with highest total execution time'}
        </li>
        <li>
          <strong>{isZh ? '分析查询计划' : 'Analyze query plans'}</strong>{' — '}
          {isZh
            ? '对高影响查询运行 EXPLAIN ANALYZE，检查顺序扫描和行数估计偏差'
            : 'Run EXPLAIN ANALYZE on high-impact queries, check for sequential scans and row estimate deviations'}
        </li>
        <li>
          <strong>{isZh ? '添加缺失索引' : 'Add missing indexes'}</strong>{' — '}
          {isZh
            ? '根据查询模式创建组合索引和覆盖索引，遵循 ESR 规则'
            : 'Create composite and covering indexes based on query patterns, following the ESR rule'}
        </li>
        <li>
          <strong>{isZh ? '修复 N+1 查询' : 'Fix N+1 queries'}</strong>{' — '}
          {isZh
            ? '在开发环境启用查询检测工具，使用预加载或批量查询替代'
            : 'Enable query detection tools in development, replace with eager loading or batch queries'}
        </li>
        <li>
          <strong>{isZh ? '优化分页' : 'Optimize pagination'}</strong>{' — '}
          {isZh
            ? '将 OFFSET 分页迁移到游标分页，尤其是 API 端点'
            : 'Migrate OFFSET pagination to cursor-based pagination, especially for API endpoints'}
        </li>
        <li>
          <strong>{isZh ? '调整连接池' : 'Tune connection pool'}</strong>{' — '}
          {isZh
            ? '使用公式设置合理的池大小，部署 PgBouncer 或 HikariCP'
            : 'Set reasonable pool size using the formula, deploy PgBouncer or HikariCP'}
        </li>
        <li>
          <strong>{isZh ? '考虑分区' : 'Consider partitioning'}</strong>{' — '}
          {isZh
            ? '对超过 1 亿行的表评估分区策略'
            : 'Evaluate partitioning strategies for tables exceeding 100 million rows'}
        </li>
        <li>
          <strong>{isZh ? '最后才扩展' : 'Scale last'}</strong>{' — '}
          {isZh
            ? '先读副本、后缓存、最后再考虑分片'
            : 'Read replicas first, then caching, and consider sharding only as a last resort'}
        </li>
      </ol>

      {/* FAQ Section */}
      <h2 style={sectionStyle}>{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>

      <div style={faqBoxStyle}>
        <h4 style={{ margin: '0 0 0.5rem' }}>{t.faq1q}</h4>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.faq1a}</p>
      </div>
      <div style={faqBoxStyle}>
        <h4 style={{ margin: '0 0 0.5rem' }}>{t.faq2q}</h4>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.faq2a}</p>
      </div>
      <div style={faqBoxStyle}>
        <h4 style={{ margin: '0 0 0.5rem' }}>{t.faq3q}</h4>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.faq3a}</p>
      </div>
      <div style={faqBoxStyle}>
        <h4 style={{ margin: '0 0 0.5rem' }}>{t.faq4q}</h4>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.faq4a}</p>
      </div>
      <div style={faqBoxStyle}>
        <h4 style={{ margin: '0 0 0.5rem' }}>{t.faq5q}</h4>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.faq5a}</p>
      </div>
      <div style={faqBoxStyle}>
        <h4 style={{ margin: '0 0 0.5rem' }}>{t.faq6q}</h4>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.faq6a}</p>
      </div>
      <div style={faqBoxStyle}>
        <h4 style={{ margin: '0 0 0.5rem' }}>{t.faq7q}</h4>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.faq7a}</p>
      </div>
      <div style={faqBoxStyle}>
        <h4 style={{ margin: '0 0 0.5rem' }}>{t.faq8q}</h4>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.faq8a}</p>
      </div>
    </article>
  );
}
