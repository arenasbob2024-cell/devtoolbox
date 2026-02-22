'use client';

import Link from 'next/link';

export default function PostgresqlPerformanceTuning({ lang }: { lang: string }) {
  return (
    <>
      <h2>PostgreSQL Performance Tuning: A Complete Guide to Indexing, Query Optimization, and Configuration</h2>
      <p>
        PostgreSQL is one of the most powerful open-source relational databases, but out-of-the-box configuration is intentionally conservative to run on minimal hardware. A production PostgreSQL instance handling thousands of queries per second requires careful tuning across multiple layers: indexing strategy, query optimization, connection management, and server configuration. This guide provides actionable techniques for each layer, with real-world examples and measurable improvements.
      </p>
      <p>
        Whether you are running PostgreSQL on a dedicated server, a cloud-managed instance like AWS RDS, or a containerized setup, these principles apply universally. We will start with the highest-impact changes and work through increasingly advanced optimizations.
      </p>

      <h2>Indexing Strategies: The Foundation of Query Performance</h2>
      <p>
        Indexes are the single most impactful tool for improving PostgreSQL query performance. A missing index can turn a 2ms query into a 20-second full table scan. However, over-indexing wastes storage, slows writes, and increases vacuum overhead. The goal is to create the minimum set of indexes that covers your actual query patterns.
      </p>

      <h3>B-Tree Indexes: The Default and Most Common</h3>
      <p>
        B-tree indexes are the default index type and handle equality and range queries efficiently. They support all comparison operators and are the right choice for most columns.
      </p>
      <pre><code className="language-sql">{`-- Basic B-tree index
CREATE INDEX idx_orders_customer_id ON orders(customer_id);

-- Composite index: column order matters!
-- This index supports queries filtering on (status), (status, created_at),
-- but NOT on (created_at) alone
CREATE INDEX idx_orders_status_created ON orders(status, created_at);

-- Covering index: includes all columns needed by the query
-- Enables index-only scans, avoiding heap lookups entirely
CREATE INDEX idx_orders_covering ON orders(customer_id, status)
  INCLUDE (total_amount, created_at);

-- Partial index: indexes only rows matching a condition
-- Much smaller than a full index, faster to scan and maintain
CREATE INDEX idx_orders_pending ON orders(created_at)
  WHERE status = 'pending';

-- Expression index: index computed values
CREATE INDEX idx_users_email_lower ON users(LOWER(email));

-- Verify index usage with EXPLAIN
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM orders
WHERE customer_id = 12345
  AND status = 'pending'
ORDER BY created_at DESC
LIMIT 20;`}</code></pre>

      <h3>Specialized Index Types</h3>
      <p>
        PostgreSQL offers several index types beyond B-tree, each optimized for specific access patterns. Choosing the right type can dramatically improve performance for certain workloads.
      </p>
      <pre><code className="language-sql">{`-- GIN index: ideal for full-text search, JSONB, and array columns
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_products_metadata ON products USING GIN(metadata jsonb_path_ops);
CREATE INDEX idx_articles_search ON articles USING GIN(
  to_tsvector('english', title || ' ' || body)
);

-- GiST index: geometric data, ranges, and nearest-neighbor queries
CREATE INDEX idx_locations_geo ON locations USING GIST(coordinates);
CREATE INDEX idx_events_during ON events USING GIST(
  tstzrange(start_time, end_time)
);

-- BRIN index: very compact, ideal for naturally ordered data
-- (e.g., timestamp columns in append-only tables)
CREATE INDEX idx_logs_created ON logs USING BRIN(created_at)
  WITH (pages_per_range = 32);

-- Hash index: equality-only lookups, smaller than B-tree
-- Useful since PostgreSQL 10+ (now WAL-logged and crash-safe)
CREATE INDEX idx_sessions_token ON sessions USING HASH(session_token);`}</code></pre>

      <table>
        <thead>
          <tr><th>Index Type</th><th>Best For</th><th>Size vs B-tree</th><th>Supports ORDER BY</th></tr>
        </thead>
        <tbody>
          <tr><td>B-tree</td><td>Equality, range, sorting</td><td>Baseline</td><td>Yes</td></tr>
          <tr><td>GIN</td><td>Full-text, JSONB, arrays</td><td>2-3x larger</td><td>No</td></tr>
          <tr><td>GiST</td><td>Geometry, ranges, nearest-neighbor</td><td>Similar</td><td>No</td></tr>
          <tr><td>BRIN</td><td>Naturally ordered large tables</td><td>100-1000x smaller</td><td>No</td></tr>
          <tr><td>Hash</td><td>Equality only</td><td>Smaller</td><td>No</td></tr>
        </tbody>
      </table>

      <h2>Query Optimization: Reading and Fixing Execution Plans</h2>
      <p>
        The PostgreSQL query planner is sophisticated, but it can make suboptimal choices when statistics are stale, the query is complex, or the data distribution is skewed. Learning to read EXPLAIN output is the most valuable skill for database performance tuning.
      </p>

      <h3>Understanding EXPLAIN ANALYZE</h3>
      <pre><code className="language-sql">{`-- Always use ANALYZE to get actual execution times
-- BUFFERS shows I/O statistics
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT o.id, o.total_amount, c.name, c.email
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE o.status = 'shipped'
  AND o.created_at >= NOW() - INTERVAL '30 days'
ORDER BY o.created_at DESC
LIMIT 50;

-- Example output breakdown:
-- Limit (cost=0.87..152.34 rows=50 width=85)
--        (actual time=0.125..2.341 rows=50 loops=1)
--   Buffers: shared hit=189 read=12
--   -> Nested Loop (cost=0.87..45231.12 rows=14892 width=85)
--                   (actual time=0.123..2.298 rows=50 loops=1)
--     -> Index Scan using idx_orders_status_created on orders o
--        (actual time=0.045..0.892 rows=50 loops=1)
--          Index Cond: (status = 'shipped' AND created_at >= ...)
--          Buffers: shared hit=156 read=8
--     -> Index Scan using customers_pkey on customers c
--        (actual time=0.005..0.005 rows=1 loops=50)
--          Index Cond: (id = o.customer_id)
--          Buffers: shared hit=33 read=4

-- Key metrics to watch:
-- actual time: first row..last row in milliseconds
-- rows: actual rows vs estimated (large mismatch = stale stats)
-- Buffers shared hit: pages found in cache (good)
-- Buffers shared read: pages read from disk (want to minimize)
-- loops: number of times the node was executed`}</code></pre>

      <h3>Common Query Anti-Patterns and Fixes</h3>
      <pre><code className="language-sql">{`-- ANTI-PATTERN 1: SELECT * when you only need specific columns
-- BAD: Fetches all columns, prevents index-only scans
SELECT * FROM orders WHERE customer_id = 123;
-- GOOD: Select only needed columns
SELECT id, total_amount, status FROM orders WHERE customer_id = 123;

-- ANTI-PATTERN 2: Functions on indexed columns prevent index usage
-- BAD: Cannot use index on created_at
SELECT * FROM orders WHERE EXTRACT(YEAR FROM created_at) = 2026;
-- GOOD: Use range conditions instead
SELECT * FROM orders
WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01';

-- ANTI-PATTERN 3: OR conditions that prevent index merging
-- BAD: May result in sequential scan
SELECT * FROM orders WHERE status = 'pending' OR customer_id = 123;
-- GOOD: Use UNION ALL for separate index scans
SELECT * FROM orders WHERE status = 'pending'
UNION ALL
SELECT * FROM orders WHERE customer_id = 123 AND status != 'pending';

-- ANTI-PATTERN 4: Correlated subqueries
-- BAD: Executes subquery for each row
SELECT * FROM orders o
WHERE total_amount > (
  SELECT AVG(total_amount) FROM orders WHERE customer_id = o.customer_id
);
-- GOOD: Use a CTE or lateral join
WITH customer_avg AS (
  SELECT customer_id, AVG(total_amount) as avg_amount
  FROM orders GROUP BY customer_id
)
SELECT o.* FROM orders o
JOIN customer_avg ca ON ca.customer_id = o.customer_id
WHERE o.total_amount > ca.avg_amount;

-- ANTI-PATTERN 5: Large IN lists
-- BAD: Generates huge query plan
SELECT * FROM products WHERE id IN (1, 2, 3, ..., 10000);
-- GOOD: Use ANY with array or a temporary table
SELECT * FROM products WHERE id = ANY(ARRAY[1, 2, 3, ...]);
-- Or for very large sets:
CREATE TEMP TABLE tmp_ids (id INT);
COPY tmp_ids FROM STDIN;
SELECT p.* FROM products p JOIN tmp_ids t ON t.id = p.id;`}</code></pre>

      <h2>Connection Pooling: Managing Database Connections</h2>
      <p>
        Each PostgreSQL connection consumes approximately 5-10 MB of memory and requires a backend process. With hundreds of application servers each opening multiple connections, connection management becomes a critical bottleneck. Connection pooling is essential for any production PostgreSQL deployment.
      </p>

      <h3>PgBouncer Configuration</h3>
      <p>
        PgBouncer is the most widely used connection pooler for PostgreSQL. It sits between your application and the database, multiplexing many client connections onto a smaller number of actual database connections.
      </p>
      <pre><code className="language-ini">{`; pgbouncer.ini
[databases]
myapp = host=127.0.0.1 port=5432 dbname=myapp

[pgbouncer]
; Pool mode:
; session    - connection assigned for entire client session (safest)
; transaction - connection returned after each transaction (recommended)
; statement  - connection returned after each statement (most aggressive)
pool_mode = transaction

; Connection limits
max_client_conn = 1000      ; Max client connections to PgBouncer
default_pool_size = 25      ; Server connections per user/database pair
min_pool_size = 5           ; Minimum idle server connections
reserve_pool_size = 5       ; Extra connections for burst traffic
reserve_pool_timeout = 3    ; Seconds before using reserve pool

; Timeouts
server_idle_timeout = 600   ; Close idle server connections after 10 min
client_idle_timeout = 0     ; 0 = no client idle timeout
query_timeout = 30          ; Kill queries running longer than 30s
client_login_timeout = 15   ; Login must complete within 15s

; Logging
log_connections = 1
log_disconnections = 1
log_pooler_errors = 1
stats_period = 60           ; Log stats every 60 seconds

; Listen address
listen_addr = 0.0.0.0
listen_port = 6432
auth_type = scram-sha-256
auth_file = /etc/pgbouncer/userlist.txt`}</code></pre>

      <h3>Application-Level Pooling</h3>
      <pre><code className="language-typescript">{`// Node.js with pg-pool (built into node-postgres)
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: 'myapp',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Pool configuration
  min: 5,                    // Minimum idle connections
  max: 20,                   // Maximum total connections
  idleTimeoutMillis: 30000,  // Close idle connections after 30s
  connectionTimeoutMillis: 5000, // Fail if connection takes > 5s
  maxUses: 7500,             // Close connection after N uses (prevents leaks)

  // Statement timeout per connection
  statement_timeout: 30000,  // 30 second query timeout
});

// Monitor pool health
pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});

setInterval(() => {
  console.log({
    total: pool.totalCount,
    idle: pool.idleCount,
    waiting: pool.waitingCount,
  });
}, 10000);

// Use pool.query for simple queries (auto-acquires and releases)
const result = await pool.query(
  'SELECT * FROM orders WHERE customer_id = $1 LIMIT $2',
  [customerId, 20]
);

// Use pool.connect for transactions
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, fromId]);
  await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, toId]);
  await client.query('COMMIT');
} catch (e) {
  await client.query('ROLLBACK');
  throw e;
} finally {
  client.release(); // Always release back to pool
}`}</code></pre>

      <h2>PostgreSQL Server Configuration</h2>
      <p>
        The default postgresql.conf is configured for a machine with 512 MB of RAM. Tuning these settings for your actual hardware can yield dramatic improvements. The most important parameters fall into memory, write-ahead log (WAL), and planner categories.
      </p>

      <h3>Memory Configuration</h3>
      <pre><code className="language-ini">{`# postgresql.conf - Memory settings for a 32 GB RAM server

# Shared buffers: PostgreSQL's main cache
# Rule of thumb: 25% of total RAM
shared_buffers = 8GB

# Work memory: per-operation sort/hash memory
# Set conservatively: max_connections * work_mem should fit in RAM
# Complex queries may use multiple work_mem allocations
work_mem = 64MB

# Maintenance work memory: for VACUUM, CREATE INDEX, ALTER TABLE
maintenance_work_mem = 2GB

# Effective cache size: hint to planner about OS page cache
# Set to ~75% of total RAM (shared_buffers + OS cache)
effective_cache_size = 24GB

# Huge pages: reduce TLB misses for shared_buffers
huge_pages = try

# Temp buffers: per-session memory for temporary tables
temp_buffers = 32MB`}</code></pre>

      <h3>WAL and Checkpoint Configuration</h3>
      <pre><code className="language-ini">{`# Write-Ahead Log settings
wal_level = replica              # Minimum for replication
wal_buffers = 64MB               # Default is too small for write-heavy loads
min_wal_size = 2GB               # Minimum WAL size before recycling
max_wal_size = 8GB               # Maximum WAL size between checkpoints

# Checkpoint tuning
checkpoint_completion_target = 0.9  # Spread checkpoint writes over 90% of interval
checkpoint_timeout = 15min          # Time between automatic checkpoints

# Synchronous commit (trade durability for speed)
# 'on' = safest (default)
# 'off' = fastest (risk losing last ~0.5s of transactions on crash)
synchronous_commit = on

# Full page writes (disable only if filesystem guarantees atomic writes)
full_page_writes = on`}</code></pre>

      <h3>Query Planner Settings</h3>
      <pre><code className="language-ini">{`# Planner cost parameters
# Adjust based on your storage type (SSD vs HDD)
random_page_cost = 1.1        # SSD: 1.1, HDD: 4.0
seq_page_cost = 1.0           # Usually leave at 1.0
effective_io_concurrency = 200 # SSD: 200, HDD: 2

# Parallelism (adjust based on CPU cores)
max_parallel_workers_per_gather = 4
max_parallel_workers = 8
max_parallel_maintenance_workers = 4
parallel_tuple_cost = 0.01
parallel_setup_cost = 1000

# Statistics target (higher = better plans, slower ANALYZE)
default_statistics_target = 200  # Default is 100, increase for complex queries`}</code></pre>

      <h2>Monitoring and Identifying Slow Queries</h2>
      <p>
        You cannot optimize what you cannot measure. PostgreSQL includes powerful built-in tools for monitoring query performance and identifying bottlenecks.
      </p>
      <pre><code className="language-sql">{`-- Enable pg_stat_statements (add to postgresql.conf)
-- shared_preload_libraries = 'pg_stat_statements'
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Find the slowest queries by total execution time
SELECT
  calls,
  round(total_exec_time::numeric, 2) as total_ms,
  round(mean_exec_time::numeric, 2) as avg_ms,
  round(stddev_exec_time::numeric, 2) as stddev_ms,
  rows,
  query
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;

-- Find queries with the most I/O
SELECT
  calls,
  shared_blks_hit + shared_blks_read as total_blocks,
  round(100.0 * shared_blks_hit / NULLIF(shared_blks_hit + shared_blks_read, 0), 2) as cache_hit_pct,
  query
FROM pg_stat_statements
ORDER BY shared_blks_read DESC
LIMIT 20;

-- Check index usage statistics
SELECT
  schemaname,
  tablename,
  indexrelname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch,
  pg_size_pretty(pg_relation_size(indexrelid)) as index_size
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;

-- Find unused indexes (candidates for removal)
SELECT
  schemaname || '.' || tablename as table,
  indexrelname as index,
  pg_size_pretty(pg_relation_size(indexrelid)) as size,
  idx_scan as scans
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE '%_pkey'
ORDER BY pg_relation_size(indexrelid) DESC;

-- Table bloat estimation
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename)) as total_size,
  n_live_tup,
  n_dead_tup,
  round(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 2) as dead_pct,
  last_vacuum,
  last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT 20;`}</code></pre>

      <h2>VACUUM and Table Maintenance</h2>
      <p>
        PostgreSQL uses MVCC (Multi-Version Concurrency Control), which means deleted and updated rows leave behind dead tuples that consume space and slow down scans. VACUUM reclaims this space and updates planner statistics. Autovacuum handles this automatically, but tuning its aggressiveness is important for write-heavy workloads.
      </p>
      <pre><code className="language-ini">{`# Autovacuum configuration for write-heavy workloads
autovacuum = on
autovacuum_max_workers = 4           # Default 3, increase for many tables
autovacuum_naptime = 30s             # Check for work every 30s (default 1min)
autovacuum_vacuum_threshold = 50     # Minimum dead tuples before vacuum
autovacuum_vacuum_scale_factor = 0.05 # Vacuum when 5% of rows are dead (default 20%)
autovacuum_analyze_threshold = 50
autovacuum_analyze_scale_factor = 0.02 # Analyze when 2% of rows change
autovacuum_vacuum_cost_delay = 2ms   # Reduce delay for faster vacuuming
autovacuum_vacuum_cost_limit = 1000  # Allow more I/O per cycle`}</code></pre>

      <pre><code className="language-sql">{`-- Per-table autovacuum tuning for hot tables
ALTER TABLE orders SET (
  autovacuum_vacuum_scale_factor = 0.01,  -- Vacuum at 1% dead rows
  autovacuum_analyze_scale_factor = 0.005,
  autovacuum_vacuum_cost_delay = 0        -- No throttling for this table
);

-- Manual maintenance for large tables
-- VACUUM FULL rewrites the entire table (locks it, reclaims all space)
-- Only use during maintenance windows
VACUUM (VERBOSE, ANALYZE) orders;

-- REINDEX rebuilds bloated indexes
REINDEX INDEX CONCURRENTLY idx_orders_customer_id;`}</code></pre>

      <h2>Performance Tuning Checklist</h2>
      <ul>
        <li><strong>Enable pg_stat_statements</strong>: Always know your slowest queries</li>
        <li><strong>Run EXPLAIN ANALYZE</strong>: Verify index usage and row estimates for critical queries</li>
        <li><strong>Create targeted indexes</strong>: Composite and partial indexes for your actual query patterns</li>
        <li><strong>Remove unused indexes</strong>: They slow writes and waste space</li>
        <li><strong>Tune shared_buffers</strong>: Set to 25% of RAM</li>
        <li><strong>Tune work_mem</strong>: Increase for complex queries, watch total memory usage</li>
        <li><strong>Use connection pooling</strong>: PgBouncer in transaction mode for web applications</li>
        <li><strong>Set random_page_cost for SSDs</strong>: 1.1 instead of the default 4.0</li>
        <li><strong>Tune autovacuum</strong>: Lower scale factors for write-heavy tables</li>
        <li><strong>Keep statistics current</strong>: Run ANALYZE after bulk data changes</li>
        <li><strong>Monitor cache hit ratio</strong>: Aim for 99%+ on shared buffers</li>
        <li><strong>Use CONCURRENTLY</strong>: For CREATE INDEX and REINDEX in production</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        PostgreSQL performance tuning is an iterative process. Start by identifying your slowest queries with pg_stat_statements, verify their execution plans with EXPLAIN ANALYZE, add appropriate indexes, tune your server configuration for your hardware, and implement connection pooling. The combination of these techniques can easily deliver 10x to 100x improvements in query performance for a typical web application workload.
      </p>
      <p>
        For database comparison guides, check our <Link href={`/${lang}/blog/mongodb-vs-postgresql`}>MongoDB vs PostgreSQL</Link> and <Link href={`/${lang}/blog/sql-vs-nosql-guide`}>SQL vs NoSQL</Link> articles. You can practice SQL formatting with our <Link href={`/${lang}/tools/sql-formatter`}>SQL Formatter</Link> tool.
      </p>
    </>
  );
}
