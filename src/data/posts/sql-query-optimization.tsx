'use client';
import React from 'react';

const codeIndexBasics = `-- Understanding B-Tree indexes (default in PostgreSQL, MySQL, SQLite)
-- An index is a separate data structure that maps column values → row locations

-- Without index: full table scan (reads every row)
EXPLAIN SELECT * FROM orders WHERE customer_id = 42;
-- Seq Scan on orders  (cost=0.00..1842.00 rows=18 width=96)

-- Create a B-Tree index on the foreign key
CREATE INDEX CONCURRENTLY idx_orders_customer_id ON orders(customer_id);

-- With index: index scan (jumps directly to matching rows)
EXPLAIN SELECT * FROM orders WHERE customer_id = 42;
-- Index Scan using idx_orders_customer_id on orders
-- (cost=0.29..8.55 rows=18 width=96)

-- Composite index: order matters! (customer_id, created_at) covers:
--   WHERE customer_id = ?
--   WHERE customer_id = ? AND created_at > ?
-- But NOT:  WHERE created_at > ?  (left-prefix rule)
CREATE INDEX idx_orders_customer_date
  ON orders(customer_id, created_at DESC);

-- Partial index: only index rows matching a condition
-- Huge win when you frequently query a small subset
CREATE INDEX idx_orders_pending
  ON orders(created_at)
  WHERE status = 'pending';   -- only ~5% of rows get indexed`;

const codeGinIndex = `-- GIN (Generalized Inverted Index): for JSONB, arrays, full-text search
-- Much faster than B-Tree for containment queries

-- JSONB column with GIN index
CREATE INDEX idx_products_attrs ON products USING GIN (attributes);

-- Containment query: "find products where attributes includes {color: 'red'}"
SELECT * FROM products
WHERE attributes @> '{"color": "red"}';   -- uses GIN index

-- Full-text search with GIN
ALTER TABLE articles ADD COLUMN tsv tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(body,''))
  ) STORED;

CREATE INDEX idx_articles_fts ON articles USING GIN (tsv);

SELECT title, ts_rank(tsv, q) AS rank
FROM articles, to_tsquery('english', 'postgres & performance') q
WHERE tsv @@ q
ORDER BY rank DESC
LIMIT 10;

-- Expression index: index on a computed value
CREATE INDEX idx_users_email_lower ON users (lower(email));
SELECT * FROM users WHERE lower(email) = lower('User@Example.com');`;

const codeExplainAnalyze = `-- EXPLAIN ANALYZE: actual execution stats (not just estimates)
-- Always use ANALYZE to see real row counts and timing

EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT
  c.name,
  COUNT(o.id) AS order_count,
  SUM(o.total) AS revenue
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.created_at >= '2025-01-01'
  AND o.status = 'completed'
GROUP BY c.id, c.name
ORDER BY revenue DESC
LIMIT 20;

-- Reading the output:
-- "Seq Scan"     → no index used, reading all rows   (BAD for large tables)
-- "Index Scan"   → using B-Tree index                (good)
-- "Bitmap Scan"  → multiple ranges, batched          (good for many rows)
-- "Hash Join"    → join via hash table               (good for large datasets)
-- "Nested Loop"  → row-by-row join                   (good for small inner set)
-- "actual time=X..Y"  → X=first row, Y=last row (ms)
-- "rows=N"       → if estimate vs actual differ a lot → stale stats!

-- Fix stale statistics:
ANALYZE orders;                          -- update stats for one table
ANALYZE;                                 -- update all tables
-- Or set autovacuum_analyze_scale_factor = 0.01 in postgresql.conf`;

const codeNPlusOne = `-- N+1 Problem: the silent query killer in ORMs

-- BAD: N+1 in pseudo-ORM code
-- for each user (1 query):
--   fetch user's orders (N queries)
-- Total: 1 + N queries for N users

-- Example: fetching 100 users + their order counts = 101 queries
const users = await db.query('SELECT * FROM users LIMIT 100');
for (const user of users) {
  const orders = await db.query(
    'SELECT COUNT(*) FROM orders WHERE customer_id = $1',
    [user.id]
  );
  user.orderCount = orders[0].count;
}

-- GOOD: Single query with JOIN or subquery
SELECT
  u.id,
  u.name,
  u.email,
  COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.customer_id = u.id
GROUP BY u.id, u.name, u.email
LIMIT 100;

-- GOOD: Use IN clause to batch (avoid when set is large)
-- Fetch users first, then batch-load orders
SELECT * FROM orders
WHERE customer_id = ANY($1::int[]);  -- pass array of user IDs

-- GOOD: Prisma/TypeORM eager loading
const users = await prisma.user.findMany({
  include: { orders: true },    -- generates single LEFT JOIN query
  take: 100,
});`;

const codeQueryRewrite = `-- Query rewrites that dramatically improve performance

-- 1. Replace correlated subquery with JOIN
-- SLOW: correlated subquery executes for each outer row
SELECT name,
  (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS cnt
FROM customers c;

-- FAST: single aggregation pass
SELECT c.name, COUNT(o.id) AS cnt
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name;

-- 2. Use window functions instead of self-join
-- SLOW: self-join to find each employee's department average
SELECT e.name, e.salary,
  (SELECT AVG(salary) FROM employees e2 WHERE e2.dept = e.dept) AS dept_avg
FROM employees e;

-- FAST: window function scans table once
SELECT name, salary,
  AVG(salary) OVER (PARTITION BY dept) AS dept_avg
FROM employees;

-- 3. Avoid SELECT * in subqueries (forces extra columns)
-- SLOW
SELECT * FROM (SELECT * FROM large_table) sub WHERE id > 1000;

-- FAST: only select needed columns
SELECT id, name FROM large_table WHERE id > 1000;

-- 4. Use EXISTS instead of COUNT for existence checks
-- SLOW: scans all matching rows
SELECT * FROM products p WHERE (SELECT COUNT(*) FROM reviews r WHERE r.product_id = p.id) > 0;

-- FAST: stops at first match
SELECT * FROM products p WHERE EXISTS (SELECT 1 FROM reviews r WHERE r.product_id = p.id);`;

const codeConnectionPool = `-- Connection pooling & query batching best practices

-- PostgreSQL: use PgBouncer or built-in pooling
-- Connection pool settings (nodejs pg pool)
import { Pool } from 'pg';

const pool = new Pool({
  max: 20,                // max connections (default: 10)
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  // keepAlive improves performance for long-lived processes
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
});

// Prepared statements: parse once, execute many times
await pool.query({
  name: 'get-user-orders',
  text: 'SELECT * FROM orders WHERE customer_id = $1 AND status = $2',
  values: [customerId, 'completed'],
});

-- Batch INSERT with single statement (much faster than loop)
INSERT INTO events (user_id, event_type, created_at)
SELECT * FROM UNNEST(
  $1::int[],
  $2::text[],
  $3::timestamptz[]
);
-- Inserts thousands of rows in one round-trip

-- Use COPY for bulk data loading (fastest option)
COPY orders (customer_id, total, status, created_at)
FROM '/tmp/orders.csv'
WITH (FORMAT CSV, HEADER true);`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SQL Query Optimization: Indexes, EXPLAIN, and N+1 Prevention',
    intro: 'Slow queries are one of the most common performance bottlenecks in web applications. This guide covers the essential techniques: choosing the right index type, reading EXPLAIN ANALYZE output, eliminating N+1 queries, and rewriting inefficient SQL patterns.',
    indexTitle: 'B-Tree Indexes: The Foundation',
    indexDesc: 'B-Tree is the default index type. It handles equality, range queries, and sorting efficiently. Understanding composite index column order and partial indexes can slash query times by orders of magnitude.',
    ginTitle: 'GIN and Expression Indexes',
    ginDesc: 'GIN (Generalized Inverted Index) is optimized for multi-valued data like JSONB columns, arrays, and full-text search. Expression indexes allow indexing computed values like lower(email).',
    explainTitle: 'Reading EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE runs the query and shows actual timing and row counts alongside the query plan. Learning to read plan nodes (Seq Scan, Index Scan, Hash Join) is essential for finding bottlenecks.',
    nplusTitle: 'N+1 Problem: Detection and Fixes',
    nplusDesc: 'The N+1 problem occurs when your code executes one query to fetch a list, then N additional queries for each item. It\'s invisible in development but catastrophic at scale. The fix is always to batch or JOIN.',
    rewriteTitle: 'Query Rewrite Patterns',
    rewriteDesc: 'Many slow queries can be dramatically sped up by rewriting: replacing correlated subqueries with JOINs, using window functions instead of self-joins, and using EXISTS over COUNT for existence checks.',
    poolTitle: 'Connection Pooling and Batch Operations',
    poolDesc: 'Database connections are expensive. Connection pooling (PgBouncer, pg Pool), prepared statements, and batch INSERT with UNNEST or COPY can reduce round-trips and dramatically improve throughput.',
    comparisonTitle: 'Index Type Comparison',
    faqTitle: 'Frequently Asked Questions',
    faqQ1: 'How do I know which queries to optimize first?',
    faqA1: 'Enable slow query logging: in PostgreSQL, set log_min_duration_statement = 1000 (ms). Use pg_stat_statements to see aggregate query stats. Focus on queries with high total_time (calls × mean_time) rather than just the slowest single execution.',
    faqQ2: 'Why does adding an index sometimes make queries slower?',
    faqA2: 'Index scans have overhead — the planner may prefer a sequential scan if the query returns more than ~15% of rows. Also, too many indexes slow down INSERT/UPDATE/DELETE because each index must be maintained. Drop unused indexes with pg_stat_user_indexes.',
    faqQ3: 'What is the difference between EXPLAIN and EXPLAIN ANALYZE?',
    faqA3: 'EXPLAIN shows the query plan with cost estimates (not actual). EXPLAIN ANALYZE actually executes the query and shows real timing and row counts. Always use ANALYZE to see whether the planner\'s estimates match reality. Huge discrepancies mean stale statistics — run ANALYZE.',
    faqQ4: 'How do I fix N+1 in an ORM like Prisma or TypeORM?',
    faqA4: 'In Prisma, use include to eager-load relations. In TypeORM, use relations in findOptions or QueryBuilder with .leftJoinAndSelect(). For complex scenarios, use DataLoader (from Facebook) to batch and cache N+1 queries at the resolver level (common in GraphQL APIs).',
    relatedTools: 'Related Tools',
  },
  zh: {
    title: 'SQL 查询优化：索引、EXPLAIN 与 N+1 问题解决',
    intro: '慢查询是 Web 应用中最常见的性能瓶颈之一。本指南涵盖核心技术：选择合适的索引类型、读懂 EXPLAIN ANALYZE 输出、消除 N+1 查询，以及重写低效 SQL 模式。',
    indexTitle: 'B-Tree 索引：基础',
    indexDesc: 'B-Tree 是默认索引类型，能高效处理等值查询、范围查询和排序。理解复合索引的列顺序和部分索引，可以将查询时间降低数个数量级。',
    ginTitle: 'GIN 索引与表达式索引',
    ginDesc: 'GIN（广义倒排索引）针对多值数据进行了优化，如 JSONB 列、数组和全文搜索。表达式索引允许对计算值（如 lower(email)）建立索引。',
    explainTitle: '读懂 EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE 在执行查询的同时显示实际耗时和行数，以及查询计划。学会读懂计划节点（顺序扫描、索引扫描、哈希连接）是定位性能瓶颈的关键。',
    nplusTitle: 'N+1 问题：检测与修复',
    nplusDesc: 'N+1 问题发生在代码执行一条查询获取列表后，再对每个元素执行 N 条额外查询。在开发环境中不易察觉，但在生产环境中会造成严重性能问题。解决方案是批量查询或使用 JOIN。',
    rewriteTitle: '查询重写模式',
    rewriteDesc: '许多慢查询可以通过重写大幅提速：用 JOIN 替换相关子查询、用窗口函数替换自连接、用 EXISTS 替换 COUNT 做存在性检查。',
    poolTitle: '连接池与批量操作',
    poolDesc: '数据库连接代价高昂。连接池（PgBouncer、pg Pool）、预处理语句，以及使用 UNNEST 或 COPY 进行批量 INSERT，可以减少往返次数并显著提升吞吐量。',
    comparisonTitle: '索引类型对比',
    faqTitle: '常见问题',
    faqQ1: '如何确定先优化哪些查询？',
    faqA1: '启用慢查询日志：在 PostgreSQL 中设置 log_min_duration_statement = 1000（毫秒）。使用 pg_stat_statements 查看聚合查询统计。优先关注 total_time（调用次数 × 平均时间）高的查询，而非仅针对单次最慢执行。',
    faqQ2: '为什么添加索引有时会让查询更慢？',
    faqA2: '索引扫描有开销——如果查询返回超过约 15% 的行，优化器可能更倾向于顺序扫描。此外，过多的索引会拖慢 INSERT/UPDATE/DELETE，因为每个索引都需要维护。用 pg_stat_user_indexes 删除未使用的索引。',
    faqQ3: 'EXPLAIN 和 EXPLAIN ANALYZE 有什么区别？',
    faqA3: 'EXPLAIN 仅显示带代价估算的查询计划（非实际）。EXPLAIN ANALYZE 实际执行查询，显示真实耗时和行数。始终使用 ANALYZE 来验证优化器估算是否准确。若差异悬殊，说明统计信息过期，需运行 ANALYZE。',
    faqQ4: '如何修复 Prisma 或 TypeORM 中的 N+1 问题？',
    faqA4: '在 Prisma 中使用 include 预加载关联。在 TypeORM 中使用 findOptions 中的 relations 或 QueryBuilder 的 .leftJoinAndSelect()。复杂场景下，使用 DataLoader（Facebook 出品）在 resolver 层批量缓存 N+1 查询（常见于 GraphQL API）。',
    relatedTools: '相关工具',
  },
  fr: {
    title: 'Optimisation des requêtes SQL : index, EXPLAIN et prévention du N+1',
    intro: 'Les requêtes lentes sont l\'un des goulots d\'étranglement les plus courants dans les applications web.',
    indexTitle: 'Index B-Tree : les bases',
    indexDesc: 'Le B-Tree est le type d\'index par défaut, gérant efficacement l\'égalité, les plages et le tri.',
    ginTitle: 'Index GIN et index d\'expression',
    ginDesc: 'GIN est optimisé pour les données multi-valuées comme JSONB, les tableaux et la recherche plein texte.',
    explainTitle: 'Lire EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE exécute la requête et montre les temps réels et les comptages de lignes.',
    nplusTitle: 'Problème N+1 : détection et corrections',
    nplusDesc: 'Le problème N+1 survient quand le code exécute une requête pour une liste puis N requêtes supplémentaires.',
    rewriteTitle: 'Modèles de réécriture de requêtes',
    rewriteDesc: 'Beaucoup de requêtes lentes peuvent être accélérées : remplacer les sous-requêtes par des JOINs, utiliser les fonctions de fenêtrage.',
    poolTitle: 'Pooling de connexions et opérations par lots',
    poolDesc: 'Les connexions à la base sont coûteuses. Le pooling, les instructions préparées et les INSERT en lot améliorent le débit.',
    comparisonTitle: 'Comparaison des types d\'index',
    faqTitle: 'Questions fréquentes',
    faqQ1: 'Comment savoir quelles requêtes optimiser en premier ?',
    faqA1: 'Activez le journal des requêtes lentes et utilisez pg_stat_statements.',
    faqQ2: 'Pourquoi un index peut-il parfois ralentir les requêtes ?',
    faqA2: 'Les scans d\'index ont un surcoût ; le planificateur peut préférer un scan séquentiel si plus de ~15% des lignes sont retournées.',
    faqQ3: 'Quelle est la différence entre EXPLAIN et EXPLAIN ANALYZE ?',
    faqA3: 'EXPLAIN montre le plan estimé, EXPLAIN ANALYZE exécute réellement la requête.',
    faqQ4: 'Comment corriger le N+1 dans un ORM ?',
    faqA4: 'Utilisez le chargement eager (include/relations) ou DataLoader pour le batching.',
    relatedTools: 'Outils associés',
  },
  de: {
    title: 'SQL-Abfrageoptimierung: Indizes, EXPLAIN und N+1-Vermeidung',
    intro: 'Langsame Abfragen sind einer der häufigsten Performance-Engpässe in Webanwendungen.',
    indexTitle: 'B-Tree-Indizes: Die Grundlage',
    indexDesc: 'B-Tree ist der Standard-Indextyp und verarbeitet Gleichheits-, Bereichsabfragen und Sortierung effizient.',
    ginTitle: 'GIN- und Ausdrucks-Indizes',
    ginDesc: 'GIN ist für mehrwertige Daten wie JSONB, Arrays und Volltextsuche optimiert.',
    explainTitle: 'EXPLAIN ANALYZE lesen',
    explainDesc: 'EXPLAIN ANALYZE führt die Abfrage aus und zeigt echte Timing- und Zeilenzahlen.',
    nplusTitle: 'N+1-Problem: Erkennung und Behebung',
    nplusDesc: 'Das N+1-Problem tritt auf, wenn Code eine Abfrage für eine Liste ausführt und dann N zusätzliche Abfragen.',
    rewriteTitle: 'Abfrage-Umschreibe-Muster',
    rewriteDesc: 'Viele langsame Abfragen können durch Umschreiben deutlich beschleunigt werden.',
    poolTitle: 'Connection Pooling und Batch-Operationen',
    poolDesc: 'Datenbankverbindungen sind teuer. Pooling, Prepared Statements und Batch-INSERT verbessern den Durchsatz.',
    comparisonTitle: 'Index-Typen Vergleich',
    faqTitle: 'Häufig gestellte Fragen',
    faqQ1: 'Wie erkenne ich, welche Abfragen ich zuerst optimieren sollte?',
    faqA1: 'Aktivieren Sie das Slow-Query-Log und verwenden Sie pg_stat_statements.',
    faqQ2: 'Warum kann ein Index Abfragen manchmal verlangsamen?',
    faqA2: 'Index-Scans haben Overhead; der Planer bevorzugt manchmal Sequential Scans.',
    faqQ3: 'Was ist der Unterschied zwischen EXPLAIN und EXPLAIN ANALYZE?',
    faqA3: 'EXPLAIN zeigt den geschätzten Plan, EXPLAIN ANALYZE führt die Abfrage tatsächlich aus.',
    faqQ4: 'Wie behebt man N+1 in einem ORM?',
    faqA4: 'Verwenden Sie Eager Loading (include/relations) oder DataLoader für Batching.',
    relatedTools: 'Verwandte Tools',
  },
  es: {
    title: 'Optimización de consultas SQL: índices, EXPLAIN y prevención del N+1',
    intro: 'Las consultas lentas son uno de los cuellos de botella más comunes en aplicaciones web.',
    indexTitle: 'Índices B-Tree: la base',
    indexDesc: 'B-Tree es el tipo de índice por defecto, manejando eficientemente igualdad, rangos y ordenación.',
    ginTitle: 'Índices GIN y de expresión',
    ginDesc: 'GIN está optimizado para datos multivalor como columnas JSONB, arrays y búsqueda de texto completo.',
    explainTitle: 'Leyendo EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE ejecuta la consulta y muestra tiempos reales y conteos de filas.',
    nplusTitle: 'Problema N+1: detección y soluciones',
    nplusDesc: 'El problema N+1 ocurre cuando el código ejecuta una consulta para una lista y luego N consultas adicionales.',
    rewriteTitle: 'Patrones de reescritura de consultas',
    rewriteDesc: 'Muchas consultas lentas pueden acelerarse dramáticamente reescribiéndolas.',
    poolTitle: 'Pool de conexiones y operaciones por lotes',
    poolDesc: 'Las conexiones de base de datos son costosas. El pooling, sentencias preparadas e INSERT por lotes mejoran el rendimiento.',
    comparisonTitle: 'Comparación de tipos de índice',
    faqTitle: 'Preguntas frecuentes',
    faqQ1: '¿Cómo sé qué consultas optimizar primero?',
    faqA1: 'Active el registro de consultas lentas y use pg_stat_statements.',
    faqQ2: '¿Por qué agregar un índice puede ralentizar las consultas?',
    faqA2: 'Los escaneos de índice tienen overhead; el planificador puede preferir un escaneo secuencial.',
    faqQ3: '¿Cuál es la diferencia entre EXPLAIN y EXPLAIN ANALYZE?',
    faqA3: 'EXPLAIN muestra el plan estimado, EXPLAIN ANALYZE ejecuta realmente la consulta.',
    faqQ4: '¿Cómo soluciono el N+1 en un ORM?',
    faqA4: 'Use carga eager (include/relations) o DataLoader para el batching.',
    relatedTools: 'Herramientas relacionadas',
  },
  ja: {
    title: 'SQLクエリ最適化：インデックス、EXPLAIN、N+1問題の解決',
    intro: '遅いクエリはWebアプリケーションで最も一般的なパフォーマンスボトルネックの一つです。',
    indexTitle: 'B-Treeインデックス：基礎',
    indexDesc: 'B-Treeはデフォルトのインデックスタイプで、等値、範囲クエリ、ソートを効率的に処理します。',
    ginTitle: 'GINと式インデックス',
    ginDesc: 'GINはJSONB列、配列、全文検索などの多値データに最適化されています。',
    explainTitle: 'EXPLAIN ANALYZEの読み方',
    explainDesc: 'EXPLAIN ANALYZEはクエリを実行し、実際のタイミングと行数を表示します。',
    nplusTitle: 'N+1問題：検出と修正',
    nplusDesc: 'N+1問題はコードがリストを取得するクエリを1回実行し、各アイテムに追加クエリをN回実行するときに発生します。',
    rewriteTitle: 'クエリ書き換えパターン',
    rewriteDesc: '多くの遅いクエリは書き換えで大幅に高速化できます：相関サブクエリをJOINで置き換え、ウィンドウ関数を使用。',
    poolTitle: '接続プールとバッチ操作',
    poolDesc: 'データベース接続はコストが高い。接続プーリング、プリペアドステートメント、バッチINSERTでスループットが向上します。',
    comparisonTitle: 'インデックスタイプ比較',
    faqTitle: 'よくある質問',
    faqQ1: 'どのクエリを最初に最適化すべきか分かりますか？',
    faqA1: 'スロークエリログを有効にし、pg_stat_statementsを使用してください。',
    faqQ2: 'インデックスを追加するとクエリが遅くなることがあるのはなぜですか？',
    faqA2: 'インデックススキャンにはオーバーヘッドがあり、プランナーは場合によってはシーケンシャルスキャンを好む場合があります。',
    faqQ3: 'EXPLAINとEXPLAIN ANALYZEの違いは？',
    faqA3: 'EXPLAINは推定プランを表示し、EXPLAIN ANALYZEは実際にクエリを実行します。',
    faqQ4: 'ORMでN+1を修正するには？',
    faqA4: 'Eager Loading（include/relations）またはDataLoaderをバッチング用に使用してください。',
    relatedTools: '関連ツール',
  },
  ko: {
    title: 'SQL 쿼리 최적화: 인덱스, EXPLAIN, N+1 방지',
    intro: '느린 쿼리는 웹 애플리케이션에서 가장 흔한 성능 병목 중 하나입니다.',
    indexTitle: 'B-Tree 인덱스: 기초',
    indexDesc: 'B-Tree는 기본 인덱스 타입으로 등가, 범위 쿼리, 정렬을 효율적으로 처리합니다.',
    ginTitle: 'GIN 및 표현식 인덱스',
    ginDesc: 'GIN은 JSONB 컬럼, 배열, 전문 검색 같은 다중값 데이터에 최적화되어 있습니다.',
    explainTitle: 'EXPLAIN ANALYZE 읽기',
    explainDesc: 'EXPLAIN ANALYZE는 쿼리를 실행하고 실제 타이밍과 행 수를 보여줍니다.',
    nplusTitle: 'N+1 문제: 감지 및 수정',
    nplusDesc: 'N+1 문제는 코드가 목록을 위해 쿼리 1개를 실행한 후 각 항목에 N개의 추가 쿼리를 실행할 때 발생합니다.',
    rewriteTitle: '쿼리 재작성 패턴',
    rewriteDesc: '많은 느린 쿼리는 재작성으로 극적으로 빨라질 수 있습니다: 상관 서브쿼리를 JOIN으로 교체, 윈도우 함수 사용.',
    poolTitle: '연결 풀링 및 일괄 처리',
    poolDesc: '데이터베이스 연결은 비용이 많이 듭니다. 연결 풀링, 준비된 문, 일괄 INSERT로 처리량이 향상됩니다.',
    comparisonTitle: '인덱스 유형 비교',
    faqTitle: '자주 묻는 질문',
    faqQ1: '어떤 쿼리를 먼저 최적화해야 할지 어떻게 알 수 있나요?',
    faqA1: '슬로우 쿼리 로깅을 활성화하고 pg_stat_statements를 사용하세요.',
    faqQ2: '인덱스를 추가하면 쿼리가 느려지는 이유는 무엇인가요?',
    faqA2: '인덱스 스캔에는 오버헤드가 있어 플래너가 경우에 따라 순차 스캔을 선호할 수 있습니다.',
    faqQ3: 'EXPLAIN과 EXPLAIN ANALYZE의 차이점은?',
    faqA3: 'EXPLAIN은 추정 계획을 보여주고, EXPLAIN ANALYZE는 실제로 쿼리를 실행합니다.',
    faqQ4: 'ORM에서 N+1을 어떻게 수정하나요?',
    faqA4: 'Eager Loading(include/relations) 또는 DataLoader를 일괄 처리에 사용하세요.',
    relatedTools: '관련 도구',
  },
  pt: {
    title: 'Otimização de consultas SQL: índices, EXPLAIN e prevenção do N+1',
    intro: 'Consultas lentas são um dos gargalos de desempenho mais comuns em aplicações web.',
    indexTitle: 'Índices B-Tree: a base',
    indexDesc: 'B-Tree é o tipo de índice padrão, lidando eficientemente com igualdade, intervalos e ordenação.',
    ginTitle: 'Índices GIN e de expressão',
    ginDesc: 'GIN é otimizado para dados de múltiplos valores como colunas JSONB, arrays e busca de texto completo.',
    explainTitle: 'Lendo EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE executa a consulta e mostra tempos reais e contagens de linhas.',
    nplusTitle: 'Problema N+1: detecção e correções',
    nplusDesc: 'O problema N+1 ocorre quando o código executa uma consulta para uma lista e depois N consultas adicionais.',
    rewriteTitle: 'Padrões de reescrita de consultas',
    rewriteDesc: 'Muitas consultas lentas podem ser dramaticamente aceleradas sendo reescritas.',
    poolTitle: 'Pool de conexões e operações em lote',
    poolDesc: 'Conexões de banco de dados são caras. Pooling, declarações preparadas e INSERT em lote melhoram o throughput.',
    comparisonTitle: 'Comparação de tipos de índice',
    faqTitle: 'Perguntas frequentes',
    faqQ1: 'Como sei quais consultas otimizar primeiro?',
    faqA1: 'Ative o log de consultas lentas e use pg_stat_statements.',
    faqQ2: 'Por que adicionar um índice às vezes torna as consultas mais lentas?',
    faqA2: 'Varreduras de índice têm overhead; o planejador pode preferir uma varredura sequencial.',
    faqQ3: 'Qual é a diferença entre EXPLAIN e EXPLAIN ANALYZE?',
    faqA3: 'EXPLAIN mostra o plano estimado, EXPLAIN ANALYZE executa realmente a consulta.',
    faqQ4: 'Como corrigir N+1 em um ORM?',
    faqA4: 'Use carregamento eager (include/relations) ou DataLoader para batching.',
    relatedTools: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'SQL-queryoptimalisatie: indexen, EXPLAIN en N+1-preventie',
    intro: 'Trage queries zijn een van de meest voorkomende prestatieknelpunten in webapplicaties.',
    indexTitle: 'B-Tree indexen: de basis',
    indexDesc: 'B-Tree is het standaard indextype en verwerkt gelijkheid, bereikquery\'s en sortering efficiënt.',
    ginTitle: 'GIN- en expressie-indexen',
    ginDesc: 'GIN is geoptimaliseerd voor meerwaardedata zoals JSONB-kolommen, arrays en volledige tekstzoekopdrachten.',
    explainTitle: 'EXPLAIN ANALYZE lezen',
    explainDesc: 'EXPLAIN ANALYZE voert de query uit en toont echte timing en rijtelling.',
    nplusTitle: 'N+1-probleem: detectie en oplossingen',
    nplusDesc: 'Het N+1-probleem treedt op wanneer code één query uitvoert voor een lijst en dan N extra queries.',
    rewriteTitle: 'Query-herschrijfpatronen',
    rewriteDesc: 'Veel trage queries kunnen dramatisch versneld worden door herschrijving.',
    poolTitle: 'Verbindingspooling en batchbewerkingen',
    poolDesc: 'Databaseverbindingen zijn duur. Pooling, prepared statements en batch-INSERT verbeteren de doorvoer.',
    comparisonTitle: 'Vergelijking van indextypen',
    faqTitle: 'Veelgestelde vragen',
    faqQ1: 'Hoe weet ik welke queries ik eerst moet optimaliseren?',
    faqA1: 'Schakel slow query logging in en gebruik pg_stat_statements.',
    faqQ2: 'Waarom kan een index queries soms vertragen?',
    faqA2: 'Index scans hebben overhead; de planner geeft soms de voorkeur aan een sequentiële scan.',
    faqQ3: 'Wat is het verschil tussen EXPLAIN en EXPLAIN ANALYZE?',
    faqA3: 'EXPLAIN toont het geschatte plan, EXPLAIN ANALYZE voert de query daadwerkelijk uit.',
    faqQ4: 'Hoe los ik N+1 op in een ORM?',
    faqA4: 'Gebruik eager loading (include/relations) of DataLoader voor batching.',
    relatedTools: 'Gerelateerde tools',
  },
  it: {
    title: 'Ottimizzazione delle query SQL: indici, EXPLAIN e prevenzione del N+1',
    intro: 'Le query lente sono uno dei colli di bottiglia più comuni nelle applicazioni web.',
    indexTitle: 'Indici B-Tree: le basi',
    indexDesc: 'B-Tree è il tipo di indice predefinito, gestendo efficacemente uguaglianza, intervalli e ordinamento.',
    ginTitle: 'Indici GIN e di espressione',
    ginDesc: 'GIN è ottimizzato per dati multi-valore come colonne JSONB, array e ricerca full-text.',
    explainTitle: 'Leggere EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE esegue la query e mostra tempi reali e conteggi di righe.',
    nplusTitle: 'Problema N+1: rilevamento e correzioni',
    nplusDesc: 'Il problema N+1 si verifica quando il codice esegue una query per un elenco e poi N query aggiuntive.',
    rewriteTitle: 'Pattern di riscrittura delle query',
    rewriteDesc: 'Molte query lente possono essere accelerate dramatically riscrivendole.',
    poolTitle: 'Connection pooling e operazioni batch',
    poolDesc: 'Le connessioni al database sono costose. Pooling, istruzioni preparate e INSERT batch migliorano il throughput.',
    comparisonTitle: 'Confronto dei tipi di indice',
    faqTitle: 'Domande frequenti',
    faqQ1: 'Come so quali query ottimizzare prima?',
    faqA1: 'Abilita il log delle query lente e usa pg_stat_statements.',
    faqQ2: 'Perché aggiungere un indice a volte rallenta le query?',
    faqA2: 'Le scansioni degli indici hanno overhead; il pianificatore può preferire una scansione sequenziale.',
    faqQ3: 'Qual è la differenza tra EXPLAIN e EXPLAIN ANALYZE?',
    faqA3: 'EXPLAIN mostra il piano stimato, EXPLAIN ANALYZE esegue effettivamente la query.',
    faqQ4: 'Come correggere N+1 in un ORM?',
    faqA4: 'Usa il caricamento eager (include/relations) o DataLoader per il batching.',
    relatedTools: 'Strumenti correlati',
  },
  pl: {
    title: 'Optymalizacja zapytań SQL: indeksy, EXPLAIN i zapobieganie N+1',
    intro: 'Wolne zapytania to jeden z najczęstszych wąskich gardeł wydajności w aplikacjach internetowych.',
    indexTitle: 'Indeksy B-Tree: podstawy',
    indexDesc: 'B-Tree to domyślny typ indeksu, efektywnie obsługujący równość, zakresy i sortowanie.',
    ginTitle: 'Indeksy GIN i wyrażeniowe',
    ginDesc: 'GIN jest zoptymalizowany dla danych wielowartościowych, takich jak kolumny JSONB, tablice i wyszukiwanie pełnotekstowe.',
    explainTitle: 'Czytanie EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE wykonuje zapytanie i pokazuje rzeczywiste czasy i liczby wierszy.',
    nplusTitle: 'Problem N+1: wykrywanie i naprawy',
    nplusDesc: 'Problem N+1 pojawia się, gdy kod wykonuje jedno zapytanie dla listy, a następnie N dodatkowych zapytań.',
    rewriteTitle: 'Wzorce przepisywania zapytań',
    rewriteDesc: 'Wiele wolnych zapytań można znacznie przyspieszyć przez przepisanie.',
    poolTitle: 'Pooling połączeń i operacje wsadowe',
    poolDesc: 'Połączenia z bazą danych są kosztowne. Pooling, przygotowane instrukcje i wsadowy INSERT poprawiają przepustowość.',
    comparisonTitle: 'Porównanie typów indeksów',
    faqTitle: 'Często zadawane pytania',
    faqQ1: 'Jak wiem, które zapytania optymalizować najpierw?',
    faqA1: 'Włącz logowanie wolnych zapytań i użyj pg_stat_statements.',
    faqQ2: 'Dlaczego dodanie indeksu czasami spowalnia zapytania?',
    faqA2: 'Skany indeksów mają narzut; planista może preferować skan sekwencyjny.',
    faqQ3: 'Jaka jest różnica między EXPLAIN a EXPLAIN ANALYZE?',
    faqA3: 'EXPLAIN pokazuje szacowany plan, EXPLAIN ANALYZE faktycznie wykonuje zapytanie.',
    faqQ4: 'Jak naprawić N+1 w ORM?',
    faqA4: 'Użyj ładowania eager (include/relations) lub DataLoadera do wsadowania.',
    relatedTools: 'Powiązane narzędzia',
  },
  sv: {
    title: 'SQL-frågeoptimering: index, EXPLAIN och N+1-förebyggande',
    intro: 'Långsamma frågor är ett av de vanligaste prestandaflaskhalsarna i webbapplikationer.',
    indexTitle: 'B-Tree-index: grunden',
    indexDesc: 'B-Tree är standardindextypen och hanterar effektivt jämlikhet, intervall och sortering.',
    ginTitle: 'GIN- och uttrycksindex',
    ginDesc: 'GIN är optimerat för flervärdesdata som JSONB-kolumner, arrayer och fulltextsökning.',
    explainTitle: 'Läsa EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE kör frågan och visar faktisk timing och radantal.',
    nplusTitle: 'N+1-problem: identifiering och lösningar',
    nplusDesc: 'N+1-problemet uppstår när kod kör en fråga för en lista och sedan N ytterligare frågor.',
    rewriteTitle: 'Frågeomskrivningsmönster',
    rewriteDesc: 'Många långsamma frågor kan snabbas upp dramatiskt genom omskrivning.',
    poolTitle: 'Anslutningspoolning och batchoperationer',
    poolDesc: 'Databasanslutningar är dyra. Pooling, förberedda satser och batch-INSERT förbättrar genomströmningen.',
    comparisonTitle: 'Indextyper jämförelse',
    faqTitle: 'Vanliga frågor',
    faqQ1: 'Hur vet jag vilka frågor jag ska optimera först?',
    faqA1: 'Aktivera loggning av långsamma frågor och använd pg_stat_statements.',
    faqQ2: 'Varför kan ett index ibland göra frågor långsammare?',
    faqA2: 'Indexskanningar har overhead; planeraren kanske föredrar en sekventiell skanning.',
    faqQ3: 'Vad är skillnaden mellan EXPLAIN och EXPLAIN ANALYZE?',
    faqA3: 'EXPLAIN visar den uppskattade planen, EXPLAIN ANALYZE kör faktiskt frågan.',
    faqQ4: 'Hur åtgärdar man N+1 i ett ORM?',
    faqA4: 'Använd eager loading (include/relations) eller DataLoader för batching.',
    relatedTools: 'Relaterade verktyg',
  },
  no: {
    title: 'SQL-spørringsoptimalisering: indekser, EXPLAIN og N+1-forebygging',
    intro: 'Trege spørringer er en av de vanligste ytelsesflaskehalsene i webapplikasjoner.',
    indexTitle: 'B-Tree-indekser: grunnlaget',
    indexDesc: 'B-Tree er standard indekstype og håndterer effektivt likhet, områder og sortering.',
    ginTitle: 'GIN- og uttrykkindekser',
    ginDesc: 'GIN er optimalisert for flerverdidsdata som JSONB-kolonner, arrays og fulltekstsøk.',
    explainTitle: 'Lese EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE kjører spørringen og viser faktisk timing og radtelling.',
    nplusTitle: 'N+1-problem: deteksjon og løsninger',
    nplusDesc: 'N+1-problemet oppstår når kode kjører én spørring for en liste og deretter N tilleggsspørringer.',
    rewriteTitle: 'Spørringsomskrivingsmønstre',
    rewriteDesc: 'Mange trege spørringer kan akselereres dramatisk ved omskriving.',
    poolTitle: 'Tilkoblingspooling og batchoperasjoner',
    poolDesc: 'Databasetilkoblinger er dyre. Pooling, forberedte setninger og batch-INSERT forbedrer gjennomstrømmingen.',
    comparisonTitle: 'Sammenligning av indekstyper',
    faqTitle: 'Vanlige spørsmål',
    faqQ1: 'Hvordan vet jeg hvilke spørringer jeg skal optimalisere først?',
    faqA1: 'Aktiver logging av trege spørringer og bruk pg_stat_statements.',
    faqQ2: 'Hvorfor kan en indeks noen ganger gjøre spørringer tregere?',
    faqA2: 'Indeksskanninger har overhead; planleggeren foretrekker kanskje sekvensiell skanning.',
    faqQ3: 'Hva er forskjellen mellom EXPLAIN og EXPLAIN ANALYZE?',
    faqA3: 'EXPLAIN viser den estimerte planen, EXPLAIN ANALYZE kjører faktisk spørringen.',
    faqQ4: 'Hvordan fikser man N+1 i et ORM?',
    faqA4: 'Bruk eager loading (include/relations) eller DataLoader for batching.',
    relatedTools: 'Relaterte verktøy',
  },
  id: {
    title: 'Optimasi kueri SQL: indeks, EXPLAIN, dan pencegahan N+1',
    intro: 'Kueri lambat adalah salah satu hambatan kinerja paling umum dalam aplikasi web.',
    indexTitle: 'Indeks B-Tree: Fondasi',
    indexDesc: 'B-Tree adalah tipe indeks default yang secara efisien menangani kesetaraan, rentang, dan pengurutan.',
    ginTitle: 'Indeks GIN dan ekspresi',
    ginDesc: 'GIN dioptimalkan untuk data multi-nilai seperti kolom JSONB, array, dan pencarian teks lengkap.',
    explainTitle: 'Membaca EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE menjalankan kueri dan menampilkan waktu aktual dan jumlah baris.',
    nplusTitle: 'Masalah N+1: deteksi dan perbaikan',
    nplusDesc: 'Masalah N+1 terjadi ketika kode menjalankan satu kueri untuk daftar lalu N kueri tambahan untuk setiap item.',
    rewriteTitle: 'Pola penulisan ulang kueri',
    rewriteDesc: 'Banyak kueri lambat dapat dipercepat secara dramatis dengan penulisan ulang.',
    poolTitle: 'Pooling koneksi dan operasi batch',
    poolDesc: 'Koneksi database mahal. Pooling, pernyataan siap pakai, dan INSERT batch meningkatkan throughput.',
    comparisonTitle: 'Perbandingan tipe indeks',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faqQ1: 'Bagaimana cara mengetahui kueri mana yang harus dioptimalkan lebih dulu?',
    faqA1: 'Aktifkan pencatatan kueri lambat dan gunakan pg_stat_statements.',
    faqQ2: 'Mengapa menambahkan indeks terkadang membuat kueri lebih lambat?',
    faqA2: 'Pemindaian indeks memiliki overhead; perencana mungkin memilih pemindaian berurutan.',
    faqQ3: 'Apa perbedaan antara EXPLAIN dan EXPLAIN ANALYZE?',
    faqA3: 'EXPLAIN menampilkan rencana perkiraan, EXPLAIN ANALYZE benar-benar menjalankan kueri.',
    faqQ4: 'Bagaimana cara memperbaiki N+1 di ORM?',
    faqA4: 'Gunakan eager loading (include/relations) atau DataLoader untuk batching.',
    relatedTools: 'Alat terkait',
  },
  th: {
    title: 'การปรับปรุง SQL Query: ดัชนี, EXPLAIN และการป้องกัน N+1',
    intro: 'Query ที่ช้าเป็นคอขวดประสิทธิภาพที่พบบ่อยที่สุดอย่างหนึ่งในแอปพลิเคชันเว็บ',
    indexTitle: 'B-Tree Index: พื้นฐาน',
    indexDesc: 'B-Tree เป็นประเภทดัชนีเริ่มต้นที่จัดการความเท่าเทียม ช่วง และการจัดเรียงได้อย่างมีประสิทธิภาพ',
    ginTitle: 'GIN และ Expression Index',
    ginDesc: 'GIN ถูกปรับให้เหมาะสำหรับข้อมูลหลายค่า เช่น คอลัมน์ JSONB, array และการค้นหาข้อความเต็ม',
    explainTitle: 'การอ่าน EXPLAIN ANALYZE',
    explainDesc: 'EXPLAIN ANALYZE รัน query และแสดงเวลาจริงและจำนวนแถว',
    nplusTitle: 'ปัญหา N+1: การตรวจจับและการแก้ไข',
    nplusDesc: 'ปัญหา N+1 เกิดขึ้นเมื่อโค้ดรัน query หนึ่งครั้งสำหรับรายการ จากนั้นรัน N query เพิ่มเติมสำหรับแต่ละรายการ',
    rewriteTitle: 'รูปแบบการเขียน query ใหม่',
    rewriteDesc: 'Query ที่ช้าจำนวนมากสามารถเร็วขึ้นอย่างมากด้วยการเขียนใหม่',
    poolTitle: 'Connection Pooling และการดำเนินการแบบกลุ่ม',
    poolDesc: 'การเชื่อมต่อฐานข้อมูลมีค่าใช้จ่ายสูง Pooling, prepared statements และ batch INSERT ช่วยเพิ่ม throughput',
    comparisonTitle: 'การเปรียบเทียบประเภทดัชนี',
    faqTitle: 'คำถามที่พบบ่อย',
    faqQ1: 'รู้ได้อย่างไรว่า query ใดควรปรับปรุงก่อน?',
    faqA1: 'เปิดใช้งาน slow query logging และใช้ pg_stat_statements',
    faqQ2: 'ทำไมการเพิ่มดัชนีบางครั้งทำให้ query ช้าลง?',
    faqA2: 'การสแกนดัชนีมี overhead; planner อาจต้องการการสแกนตามลำดับ',
    faqQ3: 'ความแตกต่างระหว่าง EXPLAIN และ EXPLAIN ANALYZE คืออะไร?',
    faqA3: 'EXPLAIN แสดงแผนที่ประมาณการ EXPLAIN ANALYZE รัน query จริง',
    faqQ4: 'วิธีแก้ไข N+1 ใน ORM?',
    faqA4: 'ใช้ eager loading (include/relations) หรือ DataLoader สำหรับ batching',
    relatedTools: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

export default function SqlQueryOptimization({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faqQ1, acceptedAnswer: { '@type': 'Answer', text: t.faqA1 } },
      { '@type': 'Question', name: t.faqQ2, acceptedAnswer: { '@type': 'Answer', text: t.faqA2 } },
      { '@type': 'Question', name: t.faqQ3, acceptedAnswer: { '@type': 'Answer', text: t.faqA3 } },
      { '@type': 'Question', name: t.faqQ4, acceptedAnswer: { '@type': 'Answer', text: t.faqA4 } },
    ],
  };

  const indexRows = [
    { type: 'B-Tree', bestFor: 'Equality, range, sort', operators: '=, <, >, BETWEEN, LIKE prefix', overhead: 'Low', notes: 'Default; most queries' },
    { type: 'GIN', bestFor: 'Multi-valued (JSONB, arrays)', operators: '@>, <@, @@, ANY', overhead: 'High write', notes: 'Full-text, JSONB queries' },
    { type: 'GiST', bestFor: 'Geometric, full-text', operators: '&&, @>, <@, ~~', overhead: 'Medium', notes: 'Nearest-neighbor, overlap' },
    { type: 'BRIN', bestFor: 'Sequential data (timestamps)', operators: '=, <, >', overhead: 'Very low', notes: 'Huge tables, append-only' },
    { type: 'Hash', bestFor: 'Equality only', operators: '=', overhead: 'Low', notes: 'Faster than B-Tree for =, no range' },
    { type: 'Partial', bestFor: 'Subset of rows', operators: 'Any', overhead: 'Low', notes: 'WHERE clause filter in index def' },
    { type: 'Expression', bestFor: 'Computed values', operators: 'Any', overhead: 'Medium', notes: 'lower(email), date_trunc()' },
  ];

  const preStyle: React.CSSProperties = {
    background: '#0f1117',
    color: '#e2e8f0',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    overflowX: 'auto',
    fontSize: '0.85rem',
    lineHeight: '1.6',
    margin: '1rem 0',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-3xl font-bold mb-4 text-gray-900">{t.title}</h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t.intro}</p>

      {/* B-Tree Indexes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.indexTitle}</h2>
        <p className="text-gray-600 mb-3">{t.indexDesc}</p>
        <pre style={preStyle}><code>{codeIndexBasics}</code></pre>
      </section>

      {/* GIN Indexes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.ginTitle}</h2>
        <p className="text-gray-600 mb-3">{t.ginDesc}</p>
        <pre style={preStyle}><code>{codeGinIndex}</code></pre>
      </section>

      {/* EXPLAIN ANALYZE */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.explainTitle}</h2>
        <p className="text-gray-600 mb-3">{t.explainDesc}</p>
        <pre style={preStyle}><code>{codeExplainAnalyze}</code></pre>
      </section>

      {/* N+1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.nplusTitle}</h2>
        <p className="text-gray-600 mb-3">{t.nplusDesc}</p>
        <pre style={preStyle}><code>{codeNPlusOne}</code></pre>
      </section>

      {/* Query Rewrite */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.rewriteTitle}</h2>
        <p className="text-gray-600 mb-3">{t.rewriteDesc}</p>
        <pre style={preStyle}><code>{codeQueryRewrite}</code></pre>
      </section>

      {/* Connection Pool */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.poolTitle}</h2>
        <p className="text-gray-600 mb-3">{t.poolDesc}</p>
        <pre style={preStyle}><code>{codeConnectionPool}</code></pre>
      </section>

      {/* Index Comparison Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t.comparisonTitle}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-orange-50">
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Index Type</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Best For</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Operators</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Write Overhead</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {indexRows.map((row, i) => (
                <tr key={row.type} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-200 px-4 py-2 font-mono text-orange-700 font-medium">{row.type}</td>
                  <td className="border border-gray-200 px-4 py-2">{row.bestFor}</td>
                  <td className="border border-gray-200 px-4 py-2 font-mono text-xs">{row.operators}</td>
                  <td className="border border-gray-200 px-4 py-2">{row.overhead}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-500">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t.faqTitle}</h2>
        <div className="space-y-4">
          {[
            { q: t.faqQ1, a: t.faqA1 },
            { q: t.faqQ2, a: t.faqA2 },
            { q: t.faqQ3, a: t.faqA3 },
            { q: t.faqQ4, a: t.faqA4 },
          ].map(({ q, a }) => (
            <div key={q} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-800">{t.relatedTools}</h2>
        <div className="flex flex-wrap gap-2">
          {['json-formatter', 'regex-tester', 'base64-encoder', 'jwt-decoder', 'url-encoder'].map(tool => (
            <a
              key={tool}
              href={`/${lang}/tools/${tool}`}
              className="inline-block bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm transition-colors"
            >
              {tool}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
