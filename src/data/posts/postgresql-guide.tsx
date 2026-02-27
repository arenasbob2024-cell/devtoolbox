'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'PostgreSQL Complete Guide: SQL, Indexes, Node.js, Prisma, JSONB, Full-Text Search & Performance',
    description: 'Complete PostgreSQL guide covering CREATE TABLE, CRUD queries, B-tree/GIN indexes, Node.js pg, Prisma ORM, Python asyncpg, JSONB operators, full-text search, window functions, and PgBouncer performance tuning.',
  },
  zh: {
    title: 'PostgreSQL 完整指南：SQL、索引、Node.js、Prisma、JSONB、全文搜索与性能调优',
    description: '完整 PostgreSQL 指南，涵盖 CREATE TABLE、CRUD 查询、B-tree/GIN 索引、Node.js pg、Prisma ORM、Python asyncpg、JSONB 操作符、全文搜索、窗口函数和 PgBouncer 性能调优。',
  },
};

export default function PostgresqlGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the best data types to use in PostgreSQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For primary keys, use SERIAL (auto-increment integer) or UUID (globally unique, use gen_random_uuid()). For text, prefer TEXT over VARCHAR(n) unless you need length constraints. Use TIMESTAMPTZ (with timezone) instead of TIMESTAMP for dates. JSONB is preferred over JSON for structured semi-structured data because it is stored in binary format and supports GIN indexes. Use BOOLEAN for true/false, NUMERIC(p,s) for exact decimals (money), and ARRAY types when storing ordered lists of the same type.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between SERIAL and GENERATED ALWAYS AS IDENTITY?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SERIAL is a legacy shorthand that creates a sequence and sets the column default — it is not a true SQL type. GENERATED ALWAYS AS IDENTITY is the SQL standard approach (PostgreSQL 10+) and is preferred. With GENERATED ALWAYS, PostgreSQL prevents manual inserts into the identity column unless you use OVERRIDING SYSTEM VALUE, which makes your data more consistent. Use: id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY for new tables.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use a GIN index vs a B-tree index in PostgreSQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'B-tree indexes (the default) are optimal for equality (=) and range queries (<, >, BETWEEN) on scalar values like integers, text, and timestamps. GIN (Generalized Inverted Index) indexes are designed for composite types: JSONB columns (for @>, ?, ?| operators), full-text search (tsvector columns), and ARRAY columns. GIN indexes are larger and slower to update than B-tree but dramatically faster for containment and existence queries on complex types. Use GiST for geometric data and nearest-neighbor searches.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I prevent SQL injection in Node.js with node-postgres (pg)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Always use parameterized queries — never string interpolation. With node-postgres: const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]). The $1 placeholder is automatically escaped by the pg driver. Never do: pool.query(`SELECT * FROM users WHERE email = \'${email}\'`) — this is vulnerable to SQL injection. For dynamic column names or table names (which cannot be parameterized), use a whitelist of allowed identifiers and validate them before interpolating.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Prisma and when should I use it over raw SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prisma is a TypeScript-first ORM with a schema-based workflow. It generates a type-safe client from your schema.prisma file. Use Prisma when you want auto-completion, type safety, schema migrations, and a clean API for CRUD operations. Use raw SQL (via pg or prisma.$queryRaw) for complex analytical queries, CTEs, window functions, or when you need fine-grained query control that the ORM abstraction cannot express efficiently. Many projects use Prisma for application code and raw SQL for reporting queries.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do JSONB operators work in PostgreSQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PostgreSQL JSONB supports several operators: -> returns a JSON object/array by key (e.g., data->\'name\' returns JSON), ->> returns text (data->>\'name\' returns text string), #> navigates nested paths (data#>\'{address,city}\'), ? checks key existence (data ? \'key\'), @> checks containment (data @> \'{"role":"admin"}\'), and @? uses jsonpath. Always add a GIN index on JSONB columns you query: CREATE INDEX idx_data_gin ON table USING gin(data). The @> containment operator is especially fast with GIN indexes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does full-text search work in PostgreSQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PostgreSQL full-text search uses tsvector (a document representation) and tsquery (a search query). Convert text to tsvector with to_tsvector(\'english\', text_column) and queries with to_tsquery(\'english\', \'search & term\'). Store pre-computed tsvectors in a separate column with a trigger for best performance. Add a GIN index: CREATE INDEX idx_fts ON articles USING gin(to_tsvector(\'english\', content)). Use ts_rank() to rank results and ts_headline() to generate highlighted snippets. The pg_trgm extension enables fuzzy/similarity search with trigram indexes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is PgBouncer and when do I need it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PgBouncer is a lightweight connection pooler for PostgreSQL. Each PostgreSQL connection consumes ~5-10MB of RAM, and PostgreSQL handles connections by forking processes, making it expensive to maintain thousands of connections. PgBouncer sits between your application and PostgreSQL, maintaining a small pool of real connections and queuing client requests. Use transaction pooling mode for stateless applications (most web apps). You need PgBouncer when your application opens many short-lived connections, when using serverless functions (AWS Lambda, Vercel) that create connections per request, or when you have hundreds of application instances.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/postgresql-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>PostgreSQL</strong> is the world's most advanced open-source relational database. Use{' '}
          <strong>SERIAL/UUID</strong> for primary keys, <strong>JSONB</strong> for semi-structured data,{' '}
          <strong>GIN indexes</strong> for full-text search and JSONB queries, and <strong>node-postgres (pg)</strong>{' '}
          or <strong>Prisma</strong> for Node.js applications. Always use parameterized queries to prevent SQL injection,
          add <strong>EXPLAIN ANALYZE</strong> before slow queries, and configure <strong>PgBouncer</strong> for
          connection pooling in production. Use our{' '}
          <Link href={`/${lang}/tools/sql-formatter`} style={{ color: '#0284c7' }}>SQL formatter tool</Link>{' '}
          to clean up your queries instantly.
        </p>
      </div>

      {/* Section 1: Core SQL */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        1. Core SQL — Tables, Data Types, and Constraints
      </h2>
      <p>
        PostgreSQL extends standard SQL with powerful native data types. Choosing the right type upfront avoids costly
        migrations later.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        CREATE TABLE with Common Data Types
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`CREATE TABLE users (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username    TEXT NOT NULL UNIQUE,
  email       TEXT NOT NULL UNIQUE,
  age         INTEGER CHECK (age >= 0),
  score       NUMERIC(10, 2) DEFAULT 0.00,
  tags        TEXT[],
  metadata    JSONB DEFAULT '{}',
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SERIAL alternative (legacy but still common)
CREATE TABLE posts (
  id          SERIAL PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  body        TEXT,
  published   BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ
);`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        ALTER TABLE — Schema Changes
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- Add a column
ALTER TABLE users ADD COLUMN phone TEXT;

-- Add NOT NULL with a default (safe for large tables)
ALTER TABLE users ADD COLUMN tier TEXT NOT NULL DEFAULT 'free';

-- Rename a column
ALTER TABLE users RENAME COLUMN username TO handle;

-- Drop a column
ALTER TABLE users DROP COLUMN phone;

-- Add a foreign key constraint
ALTER TABLE posts
  ADD CONSTRAINT fk_posts_user
  FOREIGN KEY (user_id) REFERENCES users(id);

-- Add a unique constraint
ALTER TABLE users ADD CONSTRAINT uq_email UNIQUE (email);`}</pre>
      </div>

      <p>
        For large tables in production, adding a <code>NOT NULL</code> column without a default requires a full table
        rewrite. Use a two-step migration: add the nullable column, backfill the data, then add the constraint.
      </p>

      {/* Section 2: CRUD & Querying */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        2. CRUD &amp; Querying — SELECT, JOIN, GROUP BY, EXPLAIN ANALYZE
      </h2>
      <p>
        PostgreSQL supports the full SQL standard plus many extensions. Mastering <code>EXPLAIN ANALYZE</code> is the
        single most important skill for query optimization.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- INSERT with RETURNING
INSERT INTO users (email, username)
VALUES ('alice@example.com', 'alice')
RETURNING id, created_at;

-- UPDATE with condition
UPDATE users
SET score = score + 10, updated_at = NOW()
WHERE id = $1
RETURNING *;

-- DELETE with RETURNING
DELETE FROM posts WHERE id = $1 RETURNING id;

-- Complex SELECT with JOIN, GROUP BY, HAVING
SELECT
  u.id,
  u.username,
  COUNT(p.id)          AS post_count,
  MAX(p.published_at)  AS last_published
FROM users u
LEFT JOIN posts p ON p.user_id = u.id AND p.published = TRUE
WHERE u.is_active = TRUE
GROUP BY u.id, u.username
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC
LIMIT 20 OFFSET 0;

-- EXPLAIN ANALYZE to diagnose slow queries
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM posts WHERE user_id = 'some-uuid' ORDER BY created_at DESC;`}</pre>
      </div>

      <p>
        Read <code>EXPLAIN ANALYZE</code> output from the innermost node outward. Look for{' '}
        <strong>Seq Scan</strong> on large tables (add an index), high <strong>actual rows</strong> vs{' '}
        <strong>estimated rows</strong> discrepancies (run <code>ANALYZE tablename</code>), and nested loop joins
        on large datasets (may benefit from hash joins via <code>SET enable_nestloop = off</code> for testing).
      </p>

      {/* Section 3: Indexes */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        3. Indexes — B-tree, GIN, GiST, BRIN, Partial, Multi-column
      </h2>
      <p>
        Indexes are the primary performance lever in PostgreSQL. The default index type is B-tree, but choosing the
        right type for your access pattern can make queries orders of magnitude faster.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- B-tree (default): equality and range queries
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_posts_created ON posts (created_at DESC);

-- Multi-column: column order matters — most selective first
CREATE INDEX idx_posts_user_published ON posts (user_id, published, published_at DESC);

-- Partial index: only index a subset of rows
CREATE INDEX idx_active_users ON users (email) WHERE is_active = TRUE;

-- GIN: JSONB, full-text search, arrays
CREATE INDEX idx_metadata_gin ON users USING gin(metadata);
CREATE INDEX idx_tags_gin ON users USING gin(tags);

-- GiST: geometric types, nearest-neighbor (PostGIS)
CREATE INDEX idx_location_gist ON places USING gist(coordinates);

-- BRIN: very large tables with natural ordering (time-series, logs)
CREATE INDEX idx_logs_created_brin ON logs USING brin(created_at);

-- CONCURRENTLY: build index without locking writes (production-safe)
CREATE INDEX CONCURRENTLY idx_users_score ON users (score);

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
WHERE tablename = 'users'
ORDER BY idx_scan DESC;`}</pre>
      </div>

      <p>
        A <strong>partial index</strong> is often dramatically smaller and faster than a full index. If 95% of your
        queries filter on <code>WHERE is_active = TRUE</code>, index only those rows. Unused indexes waste disk space
        and slow down writes — drop them with <code>DROP INDEX CONCURRENTLY</code>.
      </p>

      {/* Section 4: Node.js pg */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        4. Node.js with node-postgres (pg) — Pool, Parameterized Queries, Transactions
      </h2>
      <p>
        <code>node-postgres</code> (the <code>pg</code> npm package) is the most widely used PostgreSQL driver for
        Node.js. Always use a <strong>Pool</strong> (not a single <code>Client</code>) in web applications to share
        connections across requests.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install pg
npm install --save-dev @types/pg`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`// db.ts — connection pool setup
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,              // maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Basic parameterized query — NEVER use string interpolation
export async function getUserByEmail(email: string) {
  const result = await pool.query(
    'SELECT id, username, email, created_at FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] ?? null;
}

// Insert with RETURNING
export async function createUser(email: string, username: string) {
  const result = await pool.query(
    \`INSERT INTO users (email, username)
     VALUES ($1, $2)
     RETURNING id, email, username, created_at\`,
    [email, username]
  );
  return result.rows[0];
}

// Transaction — acquire client from pool
export async function transferScore(fromId: string, toId: string, points: number) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE users SET score = score - $1 WHERE id = $2',
      [points, fromId]
    );
    await client.query(
      'UPDATE users SET score = score + $1 WHERE id = $2',
      [points, toId]
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();  // always release back to pool
  }
}`}</pre>
      </div>

      {/* Section 5: Prisma ORM */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        5. Prisma ORM — Schema, Migrations, findMany/create/update/delete
      </h2>
      <p>
        Prisma provides a type-safe database client generated from your <code>schema.prisma</code> file. It is the
        most popular ORM for TypeScript/Next.js applications and integrates seamlessly with PostgreSQL.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`npm install prisma @prisma/client
npx prisma init`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  username  String   @unique
  score     Decimal  @default(0) @db.Decimal(10, 2)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now()) @map("created_at")
  posts     Post[]

  @@map("users")
}

model Post {
  id          String    @id @default(uuid())
  userId      String    @map("user_id")
  title       String
  body        String?
  published   Boolean   @default(false)
  publishedAt DateTime? @map("published_at")
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("posts")
}`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`// Run migrations
npx prisma migrate dev --name init
npx prisma generate

// prisma-client.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// findMany with where, select, include, orderBy, take
const users = await prisma.user.findMany({
  where: {
    isActive: true,
    score: { gte: 100 },
  },
  select: {
    id: true,
    email: true,
    username: true,
    posts: {
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    },
  },
  orderBy: { score: 'desc' },
  take: 20,
  skip: 0,
});

// create
const user = await prisma.user.create({
  data: { email: 'bob@example.com', username: 'bob' },
});

// update
await prisma.user.update({
  where: { id: userId },
  data: { score: { increment: 10 } },
});

// delete (cascade via schema)
await prisma.user.delete({ where: { id: userId } });

// upsert
await prisma.user.upsert({
  where: { email: 'alice@example.com' },
  create: { email: 'alice@example.com', username: 'alice' },
  update: { isActive: true },
});`}</pre>
      </div>

      {/* Section 6: Python asyncpg / psycopg2 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        6. Python — asyncpg and psycopg2
      </h2>
      <p>
        Python has two dominant PostgreSQL libraries: <strong>psycopg2</strong> (synchronous, battle-tested) and{' '}
        <strong>asyncpg</strong> (async, extremely fast, used with FastAPI/asyncio).
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`pip install asyncpg psycopg2-binary`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`# asyncpg — async/await (FastAPI, aiohttp)
import asyncpg
import asyncio

async def main():
    conn = await asyncpg.connect(
        'postgresql://user:password@localhost/dbname'
    )

    # Parameterized query — uses $1, $2 placeholders
    rows = await conn.fetch(
        'SELECT id, email FROM users WHERE is_active = $1 LIMIT $2',
        True, 20
    )
    for row in rows:
        print(dict(row))

    # Insert with RETURNING
    user = await conn.fetchrow(
        'INSERT INTO users(email, username) VALUES($1, $2) RETURNING *',
        'charlie@example.com', 'charlie'
    )

    # Transaction
    async with conn.transaction():
        await conn.execute(
            'UPDATE users SET score = score - $1 WHERE id = $2',
            50, from_id
        )
        await conn.execute(
            'UPDATE users SET score = score + $1 WHERE id = $2',
            50, to_id
        )

    await conn.close()

# Connection pool with asyncpg
async def create_pool():
    return await asyncpg.create_pool(
        dsn='postgresql://user:password@localhost/dbname',
        min_size=5,
        max_size=20
    )

pool = asyncio.get_event_loop().run_until_complete(create_pool())`}</pre>
      </div>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`# psycopg2 — synchronous (Django, Flask)
import psycopg2
from psycopg2.pool import ThreadedConnectionPool

# Always use %s placeholders — NEVER f-strings
conn = psycopg2.connect(
    host='localhost', dbname='mydb',
    user='myuser', password='secret'
)
cur = conn.cursor()

# Safe parameterized query
cur.execute(
    'SELECT id, email FROM users WHERE email = %s',
    (email,)   # note: tuple, even for single value
)
user = cur.fetchone()

# WRONG — SQL injection vulnerability:
# cur.execute(f"SELECT * FROM users WHERE email = '{email}'")

# Connection pool
pool = ThreadedConnectionPool(
    minconn=1, maxconn=20,
    dsn='postgresql://user:pass@localhost/dbname'
)
conn = pool.getconn()
try:
    with conn.cursor() as cur:
        cur.execute('SELECT COUNT(*) FROM users')
        count = cur.fetchone()[0]
    conn.commit()
finally:
    pool.putconn(conn)`}</pre>
      </div>

      {/* Section 7: JSONB */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        7. JSONB — Storing, Querying, Operators, and GIN Indexes
      </h2>
      <p>
        <strong>JSONB</strong> is PostgreSQL's binary JSON format. Unlike <code>JSON</code>, it is stored in a
        decomposed binary format that supports indexing and fast key-based access. Use JSONB for flexible schema
        attributes, configuration objects, and event payloads.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- Store JSON
INSERT INTO users (email, username, metadata)
VALUES ('dave@example.com', 'dave',
        '{"plan": "pro", "features": ["export", "api"], "settings": {"theme": "dark"}}');

-- -> returns JSONB, ->> returns TEXT
SELECT metadata->'plan'          AS plan_json,   -- "pro"
       metadata->>'plan'         AS plan_text,   -- pro (no quotes)
       metadata->'settings'->>'theme' AS theme   -- dark
FROM users WHERE username = 'dave';

-- #> navigates nested path
SELECT metadata #> '{settings,theme}' AS theme FROM users;

-- ? checks for key existence
SELECT * FROM users WHERE metadata ? 'plan';

-- @> containment: rows where plan = "pro"
SELECT * FROM users WHERE metadata @> '{"plan": "pro"}';

-- ?| any of keys exists
SELECT * FROM users WHERE metadata ?| array['plan', 'tier'];

-- jsonb_build_object and aggregation
SELECT
  jsonb_build_object(
    'total', COUNT(*),
    'plans', jsonb_agg(DISTINCT metadata->>'plan')
  ) AS stats
FROM users WHERE is_active = TRUE;

-- GIN index for fast JSONB queries
CREATE INDEX idx_users_metadata ON users USING gin(metadata);

-- Update a JSONB key (jsonb_set)
UPDATE users
SET metadata = jsonb_set(metadata, '{plan}', '"enterprise"')
WHERE id = $1;

-- Remove a key
UPDATE users
SET metadata = metadata - 'old_key'
WHERE id = $1;`}</pre>
      </div>

      {/* Section 8: Full-Text Search */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        8. Full-Text Search — tsvector, tsquery, GIN Index, ts_rank, ts_headline, pg_trgm
      </h2>
      <p>
        PostgreSQL has a built-in full-text search engine. It is not as powerful as Elasticsearch for large-scale
        search, but it is sufficient for most application search needs and requires no additional infrastructure.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- Basic full-text search
SELECT title, body
FROM posts
WHERE to_tsvector('english', title || ' ' || COALESCE(body, ''))
      @@ to_tsquery('english', 'postgresql & index');

-- Store pre-computed tsvector for performance
ALTER TABLE posts ADD COLUMN search_vector TSVECTOR;

UPDATE posts
SET search_vector = to_tsvector('english', title || ' ' || COALESCE(body, ''));

-- Create GIN index on the tsvector column
CREATE INDEX idx_posts_search ON posts USING gin(search_vector);

-- Auto-update tsvector with a trigger
CREATE FUNCTION posts_tsvector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    coalesce(NEW.title, '') || ' ' || coalesce(NEW.body, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_search_trigger
BEFORE INSERT OR UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION posts_tsvector_update();

-- Search with ranking and highlighting
SELECT
  id,
  title,
  ts_rank(search_vector, query)    AS rank,
  ts_headline('english', body, query,
    'MaxFragments=2, MaxWords=30, MinWords=10') AS snippet
FROM posts, to_tsquery('english', 'postgresql & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;

-- pg_trgm: fuzzy/similarity search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_users_username_trgm ON users USING gin(username gin_trgm_ops);

SELECT username, similarity(username, 'alce') AS sim
FROM users
WHERE username % 'alce'   -- trigram similarity threshold
ORDER BY sim DESC;`}</pre>
      </div>

      {/* Section 9: Window Functions */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        9. Window Functions — ROW_NUMBER, RANK, LAG, LEAD, Running Totals, FILTER
      </h2>
      <p>
        Window functions perform calculations across a set of rows related to the current row, without collapsing
        the result set (unlike <code>GROUP BY</code>). They are essential for rankings, running totals, and
        time-series analysis.
      </p>

      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- ROW_NUMBER, RANK, DENSE_RANK
SELECT
  username,
  score,
  ROW_NUMBER() OVER (ORDER BY score DESC)    AS row_num,
  RANK()       OVER (ORDER BY score DESC)    AS rank,      -- gaps on ties
  DENSE_RANK() OVER (ORDER BY score DESC)    AS dense_rank -- no gaps
FROM users WHERE is_active = TRUE;

-- PARTITION BY: rank within groups
SELECT
  username,
  metadata->>'plan' AS plan,
  score,
  RANK() OVER (
    PARTITION BY metadata->>'plan'
    ORDER BY score DESC
  ) AS rank_in_plan
FROM users;

-- LAG / LEAD: access adjacent rows
SELECT
  id,
  score,
  LAG(score,  1, 0) OVER (ORDER BY created_at) AS prev_score,
  LEAD(score, 1, 0) OVER (ORDER BY created_at) AS next_score,
  score - LAG(score, 1, 0) OVER (ORDER BY created_at) AS delta
FROM users ORDER BY created_at;

-- FIRST_VALUE / LAST_VALUE
SELECT
  username,
  score,
  FIRST_VALUE(username) OVER (
    ORDER BY score DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS top_user
FROM users;

-- Running total (cumulative sum)
SELECT
  created_at::DATE AS day,
  COUNT(*)         AS new_users,
  SUM(COUNT(*)) OVER (ORDER BY created_at::DATE) AS cumulative_users
FROM users
GROUP BY created_at::DATE
ORDER BY day;

-- FILTER clause: conditional aggregates
SELECT
  COUNT(*) FILTER (WHERE is_active = TRUE)  AS active_count,
  COUNT(*) FILTER (WHERE is_active = FALSE) AS inactive_count,
  AVG(score) FILTER (WHERE score > 0)       AS avg_positive_score
FROM users;`}</pre>
      </div>

      {/* Section 10: Performance & Tuning */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        10. Performance &amp; Tuning — PgBouncer, autovacuum, ANALYZE, pg_stat_statements
      </h2>
      <p>
        PostgreSQL performance involves multiple layers: connection management, query planning, table maintenance,
        and monitoring. Address these systematically for production workloads.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Connection Pooling with PgBouncer
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`# pgbouncer.ini
[databases]
mydb = host=127.0.0.1 port=5432 dbname=mydb

[pgbouncer]
listen_addr = 127.0.0.1
listen_port = 6432
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction   # best for stateless web apps
max_client_conn = 1000
default_pool_size = 25    # actual Postgres connections

# Connect your app to PgBouncer port (6432), not Postgres (5432)
DATABASE_URL=postgresql://user:pass@localhost:6432/mydb`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        autovacuum and ANALYZE
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- Check table bloat / autovacuum stats
SELECT
  relname,
  n_live_tup,
  n_dead_tup,
  last_autovacuum,
  last_autoanalyze
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- Manually run VACUUM and ANALYZE
VACUUM ANALYZE users;

-- VACUUM FULL reclaims disk (locks table — avoid in production)
VACUUM FULL users;

-- Tune autovacuum per table for high-churn tables
ALTER TABLE users SET (
  autovacuum_vacuum_scale_factor = 0.01,   -- vacuum when 1% rows are dead
  autovacuum_analyze_scale_factor = 0.005
);`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        pg_stat_statements — Top Slow Queries
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- Enable extension (requires restart or superuser)
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Top 10 slowest queries by total time
SELECT
  LEFT(query, 80)          AS query_snippet,
  calls,
  total_exec_time::BIGINT  AS total_ms,
  mean_exec_time::BIGINT   AS mean_ms,
  rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- Key postgresql.conf settings for performance
-- shared_buffers = 25% of RAM        (e.g., 4GB on 16GB system)
-- effective_cache_size = 75% of RAM
-- work_mem = 4MB to 64MB             (per sort/hash operation)
-- max_connections = 100-200          (use PgBouncer for more)
-- checkpoint_completion_target = 0.9
-- random_page_cost = 1.1             (for SSDs; default 4.0 is for HDD)`}</pre>
      </div>

      {/* Bonus: CTEs and Recursive Queries */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Bonus: CTEs, Recursive Queries, and UPSERT Patterns
      </h2>
      <p>
        Common Table Expressions (CTEs) introduced with <code>WITH</code> make complex queries modular and readable.
        Recursive CTEs are essential for hierarchical data like org charts, category trees, and threaded comments.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        CTEs for Readable Multi-step Queries
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- CTE: each step is named and reusable
WITH active_users AS (
  SELECT id, username, score
  FROM users
  WHERE is_active = TRUE
),
ranked_users AS (
  SELECT
    id,
    username,
    score,
    RANK() OVER (ORDER BY score DESC) AS rnk
  FROM active_users
)
SELECT * FROM ranked_users WHERE rnk <= 10;

-- Writeable CTE: UPDATE and return affected rows
WITH updated AS (
  UPDATE users
  SET score = score + 100, updated_at = NOW()
  WHERE id = ANY($1::uuid[])
  RETURNING id, score
)
SELECT COUNT(*) AS updated_count FROM updated;`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Recursive CTEs for Tree Data
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- categories table: id, parent_id, name
WITH RECURSIVE category_tree AS (
  -- Base case: root categories (no parent)
  SELECT id, name, parent_id, 0 AS depth, name::TEXT AS path
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  -- Recursive case: join children to their parent
  SELECT c.id, c.name, c.parent_id,
         ct.depth + 1,
         ct.path || ' > ' || c.name
  FROM categories c
  INNER JOIN category_tree ct ON ct.id = c.parent_id
)
SELECT * FROM category_tree ORDER BY path;

-- Find all ancestors of a given node
WITH RECURSIVE ancestors AS (
  SELECT id, name, parent_id
  FROM categories WHERE id = $1   -- start node

  UNION ALL

  SELECT c.id, c.name, c.parent_id
  FROM categories c
  INNER JOIN ancestors a ON a.parent_id = c.id
)
SELECT * FROM ancestors;`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        UPSERT with ON CONFLICT
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- ON CONFLICT DO UPDATE (upsert)
INSERT INTO users (email, username, score)
VALUES ($1, $2, $3)
ON CONFLICT (email)
DO UPDATE SET
  username   = EXCLUDED.username,
  score      = GREATEST(users.score, EXCLUDED.score),
  updated_at = NOW()
RETURNING *;

-- ON CONFLICT DO NOTHING (insert-or-ignore)
INSERT INTO user_tags (user_id, tag)
VALUES ($1, $2)
ON CONFLICT (user_id, tag) DO NOTHING;

-- Bulk upsert with unnest (efficient batch insert)
INSERT INTO scores (user_id, value, recorded_at)
SELECT * FROM unnest($1::uuid[], $2::numeric[], $3::timestamptz[])
  AS t(user_id, value, recorded_at)
ON CONFLICT (user_id)
DO UPDATE SET value = EXCLUDED.value, recorded_at = EXCLUDED.recorded_at;`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Partitioning for Time-series Data
      </h3>
      <p>
        For high-volume append-only tables (logs, events, metrics), table partitioning dramatically improves query
        performance and simplifies data retention (drop old partitions instead of <code>DELETE</code>).
      </p>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- Range-partitioned events table by month
CREATE TABLE events (
  id         BIGSERIAL,
  user_id    UUID NOT NULL,
  event_type TEXT NOT NULL,
  payload    JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- Create monthly partitions
CREATE TABLE events_2026_01
  PARTITION OF events
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE events_2026_02
  PARTITION OF events
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- Indexes must be created on each partition (or use CREATE INDEX on parent)
CREATE INDEX ON events_2026_01 (user_id, created_at DESC);
CREATE INDEX ON events_2026_02 (user_id, created_at DESC);

-- Drop old partition (instantly deletes all data, no vacuum needed)
DROP TABLE events_2025_12;

-- Query automatically hits only relevant partition (partition pruning)
SELECT * FROM events
WHERE user_id = $1
  AND created_at BETWEEN '2026-02-01' AND '2026-03-01';`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Useful Administrative Queries
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- Database sizes
SELECT datname, pg_size_pretty(pg_database_size(datname)) AS size
FROM pg_database ORDER BY pg_database_size(datname) DESC;

-- Table sizes including indexes
SELECT
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename)) AS total_size,
  pg_size_pretty(pg_relation_size(schemaname || '.' || tablename))       AS table_size,
  pg_size_pretty(pg_indexes_size(schemaname || '.' || tablename))        AS index_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname || '.' || tablename) DESC;

-- Cache hit rate (aim for > 99%)
SELECT
  sum(heap_blks_hit)  AS heap_hit,
  sum(heap_blks_read) AS heap_read,
  round(sum(heap_blks_hit)::NUMERIC /
    NULLIF(sum(heap_blks_hit) + sum(heap_blks_read), 0) * 100, 2) AS cache_hit_pct
FROM pg_statio_user_tables;

-- Index hit rate (aim for > 95%)
SELECT
  tablename,
  round(idx_scan::NUMERIC / NULLIF(seq_scan + idx_scan, 0) * 100, 2) AS index_usage_pct,
  n_live_tup AS row_count
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Extensions Worth Installing
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Extension</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Purpose</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Install Command</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>pg_stat_statements</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Track slow query statistics</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>CREATE EXTENSION pg_stat_statements;</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>pg_trgm</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Fuzzy/trigram text search</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>CREATE EXTENSION pg_trgm;</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>uuid-ossp</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>UUID generation (legacy; prefer pgcrypto)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>CREATE EXTENSION "uuid-ossp";</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>pgcrypto</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>gen_random_uuid(), encryption functions</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>CREATE EXTENSION pgcrypto;</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>PostGIS</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Geospatial queries and indexes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>CREATE EXTENSION postgis;</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>hstore</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Key-value pairs (use JSONB instead for new code)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>CREATE EXTENSION hstore;</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>timescaledb</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Time-series data, hypertables, continuous aggregates</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>CREATE EXTENSION timescaledb;</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Tool CTA */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginTop: '2rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0 }}>
          Need to clean up or format your SQL queries?{' '}
          <Link href="https://viadreams.cc/en/tools/sql-formatter" style={{ color: '#0284c7', fontWeight: 600 }}>
            Try our free SQL Formatter tool
          </Link>{' '}
          — instantly format, indent, and validate your PostgreSQL, MySQL, or SQLite queries online.
        </p>
      </div>

      {/* Bonus: Replication, Backup, and Monitoring */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Bonus: Replication, Backup, Monitoring, and Security
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Streaming Replication and Read Replicas
      </h3>
      <p>
        PostgreSQL's built-in streaming replication sends WAL (Write-Ahead Log) records from a primary to one or
        more standby servers in near real-time. Read replicas offload SELECT queries from the primary, improving
        throughput. Most managed PostgreSQL providers (AWS RDS, Supabase, Neon) configure this automatically.
      </p>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- postgresql.conf on primary
wal_level = replica
max_wal_senders = 5
wal_keep_size = 1GB   # keep enough WAL for replicas to catch up

-- pg_hba.conf on primary: allow replication connections
host replication replicator 10.0.0.0/8 md5

-- Create replication user
CREATE ROLE replicator REPLICATION LOGIN PASSWORD 'secret';

-- On replica: recovery.conf (PostgreSQL < 12) or postgresql.conf (>= 12)
primary_conninfo = 'host=primary port=5432 user=replicator password=secret'
hot_standby = on   # allow SELECT queries on replica

-- Check replication lag
SELECT
  client_addr,
  state,
  sent_lsn - replay_lsn AS replication_lag_bytes
FROM pg_stat_replication;`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Backup Strategies — pg_dump, pg_basebackup, PITR
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`# pg_dump: logical backup of a single database (safe for live DB)
pg_dump -Fc -Z9 -U postgres mydb > mydb_$(date +%Y%m%d).dump

# Restore from dump
pg_restore -U postgres -d mydb_restore mydb_20260227.dump

# pg_dumpall: dump all databases + global objects (roles, tablespaces)
pg_dumpall -U postgres > all_databases.sql

# pg_basebackup: physical backup (full cluster, for streaming replication)
pg_basebackup -h localhost -U replicator -D /backup/base -P -Xs -R

# Point-in-time Recovery (PITR)
# 1. Take a base backup
# 2. Enable WAL archiving (archive_mode = on, archive_command = ...)
# 3. Restore base backup + replay WAL up to target time

# In postgresql.conf:
archive_mode = on
archive_command = 'cp %p /mnt/wal_archive/%f'

# recovery.conf / postgresql.conf (>= 12) for PITR:
restore_command = 'cp /mnt/wal_archive/%f %p'
recovery_target_time = '2026-02-27 14:30:00'`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Security — Row-Level Security (RLS) and Roles
      </h3>
      <p>
        <strong>Row-Level Security (RLS)</strong> lets you enforce data access policies at the database level.
        This is especially powerful in multi-tenant applications — each tenant can only see their own rows,
        regardless of how the application queries the database.
      </p>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- Enable RLS on a table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their own posts
CREATE POLICY posts_owner_policy ON posts
  USING (user_id = current_setting('app.current_user_id')::UUID);

-- Policy: admins can see all posts
CREATE POLICY posts_admin_policy ON posts
  TO admin_role
  USING (TRUE);

-- In your app: set the current user before queries
SET LOCAL app.current_user_id = 'user-uuid-here';
SELECT * FROM posts;  -- automatically filtered by RLS

-- Role-based access control
CREATE ROLE app_readonly;
GRANT CONNECT ON DATABASE mydb TO app_readonly;
GRANT USAGE ON SCHEMA public TO app_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;

CREATE ROLE app_readwrite;
GRANT app_readonly TO app_readwrite;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_readwrite;

-- Principle of least privilege: app uses limited-privilege role
-- Never connect as postgres/superuser from application code`}</pre>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Monitoring with pg_stat_activity and Locks
      </h3>
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>{`-- Active connections and long-running queries
SELECT
  pid,
  usename,
  application_name,
  state,
  now() - query_start        AS duration,
  left(query, 100)           AS query_snippet,
  wait_event_type,
  wait_event
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC;

-- Kill a long-running query (non-destructive)
SELECT pg_cancel_backend(pid)
FROM pg_stat_activity
WHERE now() - query_start > interval '5 minutes';

-- Detect lock contention
SELECT
  blocked.pid        AS blocked_pid,
  blocked_query.query AS blocked_query,
  blocking.pid       AS blocking_pid,
  blocking_query.query AS blocking_query
FROM pg_locks blocked_lock
JOIN pg_stat_activity blocked_query ON blocked_query.pid = blocked_lock.pid
JOIN pg_locks blocking_lock ON (
    blocking_lock.locktype = blocked_lock.locktype
    AND blocking_lock.granted = TRUE
    AND blocked_lock.granted = FALSE
    AND blocking_lock.relation = blocked_lock.relation
)
JOIN pg_stat_activity blocking_query ON blocking_query.pid = blocking_lock.pid
WHERE blocked_lock.granted = FALSE
LIMIT 10;`}</pre>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem', marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem', color: '#1e293b', marginTop: 0 }}>
          Key Takeaways
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Use <strong>UUID</strong> or <strong>BIGINT GENERATED ALWAYS AS IDENTITY</strong> for primary keys; prefer <strong>TIMESTAMPTZ</strong> over TIMESTAMP.</li>
          <li style={{ marginBottom: '0.5rem' }}>Always use <strong>parameterized queries</strong> ($1, $2 in pg; %s in psycopg2) to prevent SQL injection.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>EXPLAIN ANALYZE</strong> is your first debugging tool — look for Seq Scan on large tables and high row count mismatches.</li>
          <li style={{ marginBottom: '0.5rem' }}>Choose the right index type: <strong>B-tree</strong> for scalar equality/range, <strong>GIN</strong> for JSONB/arrays/FTS, <strong>BRIN</strong> for large sequential tables.</li>
          <li style={{ marginBottom: '0.5rem' }}>Use <strong>JSONB</strong> with GIN indexes for flexible schema columns; the <code>@&gt;</code> containment operator is the most powerful JSONB query.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Window functions</strong> (ROW_NUMBER, LAG, SUM OVER) replace complex self-joins for ranking and time-series analysis.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>PgBouncer</strong> in transaction mode is essential when using serverless functions or running many application instances.</li>
          <li><strong>pg_stat_statements</strong> + <strong>pg_stat_user_indexes</strong> give you data-driven insight into what to optimize.</li>
        </ul>
      </div>
    </article>
  );
}
