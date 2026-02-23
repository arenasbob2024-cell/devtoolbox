'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SQLite for Production in 2026: When and How to Use It',
    intro: 'SQLite has evolved from a simple embedded database to a serious production contender. In 2026, tools like Litestream, LiteFS, Turso, and Cloudflare D1 have eliminated many of SQLite\'s traditional limitations. Companies like Expensify, Tailscale, and Fly.io run SQLite in production serving millions of requests. This guide covers when SQLite is the right choice, how to configure it for production, and the tools that make it viable at scale.',
    h2Why: 'Why SQLite for Production?',
    whyDesc: 'SQLite is the most deployed database engine in the world, with over one trillion active databases. It is embedded in every smartphone, browser, and most operating systems. Its simplicity, reliability, and zero-administration nature make it increasingly attractive for server-side applications.',
    h3Advantages: 'Key Advantages',
    adv1: 'Zero administration: no separate server process, no configuration, no user management',
    adv2: 'Single file database: easy to backup, copy, move, and version control',
    adv3: 'Extremely fast reads: up to 10x faster than PostgreSQL for simple queries because there is no network round-trip',
    adv4: 'ACID compliant: full transaction support with WAL mode for concurrent reads',
    adv5: 'Battle-tested: used in production on billions of devices for over 20 years',
    adv6: 'Tiny footprint: the library is under 1MB, the binary is a few hundred KB',
    h3Limitations: 'Honest Limitations',
    lim1: 'Single writer: only one write transaction at a time (though reads are concurrent)',
    lim2: 'No built-in replication: requires external tools like Litestream or LiteFS',
    lim3: 'No network access: the database must be on the same machine as the application',
    lim4: 'Limited concurrent writes: not suitable for write-heavy multi-user applications',
    lim5: 'No stored procedures: business logic must live in the application layer',
    h2When: 'When to Use SQLite in Production',
    h3GoodFit: 'SQLite Is a Good Fit For:',
    goodFit1: 'Single-server applications with moderate traffic (up to millions of requests per day)',
    goodFit2: 'Read-heavy workloads: blogs, content sites, documentation, dashboards',
    goodFit3: 'Edge computing: deploy the database alongside your application at the edge',
    goodFit4: 'Embedded applications: IoT devices, desktop apps, mobile backends',
    goodFit5: 'Development and testing: perfect local development database',
    goodFit6: 'Small to medium SaaS: one database per tenant architecture',
    h3BadFit: 'SQLite Is NOT a Good Fit For:',
    badFit1: 'High write concurrency: multiple servers writing to the same database',
    badFit2: 'Multi-server deployments without edge replication tools',
    badFit3: 'Very large databases (though SQLite supports up to 281 TB theoretically)',
    badFit4: 'Applications requiring fine-grained user permissions at the database level',
    h2Config: 'Production Configuration',
    configDesc: 'Default SQLite settings are optimized for compatibility, not performance. For production, you need to configure WAL mode, memory-mapped I/O, and connection pooling.',
    h3WAL: 'WAL Mode (Write-Ahead Logging)',
    walDesc: 'WAL mode is the most important configuration for production SQLite. It allows concurrent reads while a write is in progress and significantly improves performance.',
    h3Pragmas: 'Essential PRAGMA Settings',
    pragmasDesc: 'PRAGMA statements configure SQLite behavior. These settings should be applied when the database connection is opened.',
    h3ConnectionPool: 'Connection Pooling',
    connectionPoolDesc: 'While SQLite does not need connection pooling in the traditional sense (no network), using a pool of connections allows concurrent reads while serializing writes.',
    h2Tools: 'Production Tools for SQLite',
    h3Litestream: 'Litestream: Continuous Replication',
    litestreamDesc: 'Litestream is an open-source tool that continuously replicates SQLite databases to S3-compatible storage. It provides near-real-time backups without impacting database performance.',
    h3LiteFS: 'LiteFS: Distributed SQLite',
    liteFSDesc: 'LiteFS is a FUSE-based file system that transparently replicates SQLite databases across a cluster of machines. It is designed for Fly.io but works anywhere.',
    h3Turso: 'Turso: SQLite at the Edge',
    tursoDesc: 'Turso is a managed SQLite service built on libSQL (a fork of SQLite). It provides edge replication, built-in branching, and a serverless pricing model.',
    h3D1: 'Cloudflare D1: Serverless SQLite',
    d1Desc: 'Cloudflare D1 is a serverless SQLite database that runs on Cloudflare\'s edge network. It integrates with Workers for ultra-low latency database access.',
    h2Patterns: 'Architecture Patterns',
    h3SingleServer: 'Single Server + Litestream',
    singleServerDesc: 'The simplest production pattern: run SQLite on a single server with Litestream for continuous backups to S3. If the server fails, restore from S3 and resume.',
    h3PerTenant: 'Database Per Tenant',
    perTenantDesc: 'Create a separate SQLite database for each customer or tenant. This provides natural isolation, easy data migration, and per-tenant backups.',
    h3EdgeDeploy: 'Edge Deployment',
    edgeDeployDesc: 'Deploy your application and SQLite database to edge locations using Fly.io with LiteFS or Turso for automatic replication.',
    h2Performance: 'Performance Tuning',
    performanceDesc: 'With proper configuration, SQLite can handle impressive workloads. Here are benchmarks and tuning tips.',
    h2Backup: 'Backup Strategies',
    backupDesc: 'SQLite backups are straightforward because the database is a single file, but you need to handle them correctly to avoid corruption.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Can SQLite handle 1 million requests per day?',
    faq1A: 'Absolutely. SQLite can handle tens of thousands of read queries per second on modern hardware. With WAL mode and proper configuration, a single server can easily serve millions of requests per day for read-heavy workloads. Write-heavy workloads may hit limits sooner due to the single-writer constraint.',
    faq2Q: 'Is SQLite ACID compliant?',
    faq2A: 'Yes, fully. SQLite supports serializable transactions, and in WAL mode provides snapshot isolation for readers. Each transaction is atomic, consistent, isolated, and durable. SQLite has passed billions of test cases and is one of the most thoroughly tested software libraries in existence.',
    faq3Q: 'How do I handle backups with SQLite?',
    faq3A: 'Use Litestream for continuous replication to S3 (recommended for production). Alternatively, use the SQLite backup API or the .backup command. Never copy the database file while it is being written to. The sqlite3_backup() API handles this safely.',
    faq4Q: 'Can I use SQLite with Docker?',
    faq4A: 'Yes, but store the database file on a Docker volume (not in the container filesystem). Use a bind mount or named volume to persist the database across container restarts. Configure WAL mode and ensure the volume uses a filesystem that supports file locking (ext4, xfs).',
    faq5Q: 'Should I use SQLite instead of PostgreSQL?',
    faq5A: 'It depends on your requirements. Choose SQLite for single-server applications, read-heavy workloads, simplicity, and edge deployment. Choose PostgreSQL for multi-server deployments, complex queries (CTEs, window functions are supported in both), write-heavy workloads, and when you need built-in replication and fine-grained permissions.',
  },
  zh: {
    title: 'SQLite 生产环境使用指南 2026：何时以及如何使用',
    intro: 'SQLite 已从简单的嵌入式数据库发展为严肃的生产级选择。在 2026 年，Litestream、LiteFS、Turso 和 Cloudflare D1 等工具消除了 SQLite 的许多传统限制。本指南介绍何时 SQLite 是正确的选择以及如何为生产环境配置它。',
    h2Why: '为什么在生产环境使用 SQLite？',
    whyDesc: 'SQLite 是世界上部署最广泛的数据库引擎。它的简单性、可靠性和零管理特性使其越来越适合服务端应用。',
    h3Advantages: '主要优势',
    adv1: '零管理：无需单独的服务器进程、配置或用户管理',
    adv2: '单文件数据库：易于备份、复制、移动和版本控制',
    adv3: '极快的读取速度：简单查询比 PostgreSQL 快 10 倍',
    adv4: 'ACID 兼容：WAL 模式下支持完整事务和并发读取',
    adv5: '久经考验：20 多年来在数十亿设备上生产使用',
    adv6: '极小的占用：库不到 1MB',
    h3Limitations: '真实局限',
    lim1: '单写入者：一次只能有一个写事务',
    lim2: '无内置复制：需要 Litestream 或 LiteFS 等外部工具',
    lim3: '无网络访问：数据库必须与应用在同一台机器上',
    lim4: '有限的并发写入：不适合写入密集型多用户应用',
    lim5: '无存储过程：业务逻辑必须在应用层',
    h2When: '何时在生产环境使用 SQLite',
    h3GoodFit: 'SQLite 适合：',
    goodFit1: '中等流量的单服务器应用（每天数百万请求）',
    goodFit2: '读取密集型工作负载：博客、内容站点、文档、仪表板',
    goodFit3: '边缘计算：在边缘部署数据库和应用',
    goodFit4: '嵌入式应用：物联网设备、桌面应用',
    goodFit5: '开发和测试：完美的本地开发数据库',
    goodFit6: '中小型 SaaS：每租户一个数据库架构',
    h3BadFit: 'SQLite 不适合：',
    badFit1: '高并发写入：多服务器写入同一数据库',
    badFit2: '没有边缘复制工具的多服务器部署',
    badFit3: '非常大的数据库',
    badFit4: '需要数据库级别细粒度用户权限的应用',
    h2Config: '生产环境配置',
    configDesc: '默认 SQLite 设置针对兼容性而非性能进行了优化。生产环境需要配置 WAL 模式和内存映射 I/O。',
    h3WAL: 'WAL 模式（预写日志）',
    walDesc: 'WAL 模式是生产 SQLite 最重要的配置。它允许写入进行时并发读取。',
    h3Pragmas: '必要的 PRAGMA 设置',
    pragmasDesc: 'PRAGMA 语句配置 SQLite 行为。这些设置应在打开数据库连接时应用。',
    h3ConnectionPool: '连接池',
    connectionPoolDesc: '使用连接池允许并发读取同时序列化写入。',
    h2Tools: 'SQLite 生产工具',
    h3Litestream: 'Litestream：连续复制',
    litestreamDesc: 'Litestream 是开源工具，将 SQLite 数据库持续复制到 S3 兼容存储。',
    h3LiteFS: 'LiteFS：分布式 SQLite',
    liteFSDesc: 'LiteFS 是基于 FUSE 的文件系统，透明地在机器集群间复制 SQLite 数据库。',
    h3Turso: 'Turso：边缘 SQLite',
    tursoDesc: 'Turso 是基于 libSQL 构建的托管 SQLite 服务，提供边缘复制和无服务器定价。',
    h3D1: 'Cloudflare D1：无服务器 SQLite',
    d1Desc: 'Cloudflare D1 是在 Cloudflare 边缘网络上运行的无服务器 SQLite 数据库。',
    h2Patterns: '架构模式',
    h3SingleServer: '单服务器 + Litestream',
    singleServerDesc: '最简单的生产模式：在单服务器上运行 SQLite，使用 Litestream 持续备份到 S3。',
    h3PerTenant: '每租户一个数据库',
    perTenantDesc: '为每个客户创建单独的 SQLite 数据库。提供自然隔离和便捷的数据迁移。',
    h3EdgeDeploy: '边缘部署',
    edgeDeployDesc: '使用 Fly.io 配合 LiteFS 或 Turso 将应用和 SQLite 数据库部署到边缘位置。',
    h2Performance: '性能调优',
    performanceDesc: '正确配置后，SQLite 可以处理令人印象深刻的工作负载。',
    h2Backup: '备份策略',
    backupDesc: 'SQLite 备份很简单因为数据库是单个文件，但需要正确处理以避免损坏。',
    h2Faq: '常见问题',
    faq1Q: 'SQLite 能处理每天 100 万请求吗？',
    faq1A: '完全可以。SQLite 在现代硬件上每秒可处理数万个读查询。配置正确后，单服务器轻松应对百万级日请求量。',
    faq2Q: 'SQLite 符合 ACID 标准吗？',
    faq2A: '完全符合。SQLite 支持可序列化事务，在 WAL 模式下为读者提供快照隔离。',
    faq3Q: '如何处理 SQLite 备份？',
    faq3A: '推荐使用 Litestream 持续复制到 S3。也可以使用 SQLite 备份 API。切勿在写入时直接复制数据库文件。',
    faq4Q: '可以在 Docker 中使用 SQLite 吗？',
    faq4A: '可以，但需要将数据库文件存储在 Docker 卷上，使用绑定挂载或命名卷来持久化数据库。',
    faq5Q: '应该用 SQLite 代替 PostgreSQL 吗？',
    faq5A: '取决于需求。单服务器读取密集型选 SQLite；多服务器写入密集型选 PostgreSQL。',
  },
};

export default function SqliteForProduction({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* Why SQLite */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Why}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.whyDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Advantages}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.adv1, t.adv2, t.adv3, t.adv4, t.adv5, t.adv6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Limitations}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.lim1, t.lim2, t.lim3, t.lim4, t.lim5].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      {/* When to Use */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2When}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#4ade80' }}>{t.h3GoodFit}</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
            {[t.goodFit1, t.goodFit2, t.goodFit3, t.goodFit4, t.goodFit5, t.goodFit6].map((item, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#f87171' }}>{t.h3BadFit}</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
            {[t.badFit1, t.badFit2, t.badFit3, t.badFit4].map((item, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Production Configuration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Config}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.configDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3WAL}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.walDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- Enable WAL mode (only needs to be set once, persists across connections)
PRAGMA journal_mode = WAL;

-- WAL mode benefits:
-- 1. Readers don't block writers
-- 2. Writers don't block readers
-- 3. Better performance for most workloads
-- 4. Crash-safe (WAL file is replayed on recovery)

-- Check current journal mode
PRAGMA journal_mode;  -- should return "wal"`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Pragmas}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.pragmasDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- Production PRAGMA settings (apply on each connection open)
PRAGMA journal_mode = WAL;          -- write-ahead logging
PRAGMA synchronous = NORMAL;        -- safe with WAL mode, faster than FULL
PRAGMA busy_timeout = 5000;         -- wait 5s on lock instead of failing
PRAGMA cache_size = -64000;         -- 64MB page cache (negative = KB)
PRAGMA foreign_keys = ON;           -- enforce foreign key constraints
PRAGMA auto_vacuum = INCREMENTAL;   -- reclaim space incrementally
PRAGMA temp_store = MEMORY;         -- store temp tables in memory
PRAGMA mmap_size = 268435456;       -- 256MB memory-mapped I/O
PRAGMA wal_autocheckpoint = 1000;   -- checkpoint every 1000 pages

-- For read-only connections, also add:
PRAGMA query_only = ON;`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ConnectionPool}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.connectionPoolDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Node.js: better-sqlite3 with connection pattern
import Database from "better-sqlite3";

// Single write connection
const writeDb = new Database("app.db");
writeDb.pragma("journal_mode = WAL");
writeDb.pragma("synchronous = NORMAL");
writeDb.pragma("busy_timeout = 5000");
writeDb.pragma("cache_size = -64000");
writeDb.pragma("foreign_keys = ON");

// Multiple read connections (pool)
const readPool = Array.from({ length: 4 }, () => {
  const db = new Database("app.db", { readonly: true });
  db.pragma("cache_size = -64000");
  db.pragma("mmap_size = 268435456");
  return db;
});

let readIndex = 0;
function getReadDb() {
  readIndex = (readIndex + 1) % readPool.length;
  return readPool[readIndex];
}

// Usage
const user = getReadDb().prepare("SELECT * FROM users WHERE id = ?").get(userId);
writeDb.prepare("INSERT INTO users (name, email) VALUES (?, ?)").run(name, email);`}</code></pre>

      {/* Tools */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Tools}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Litestream}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.litestreamDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install Litestream
curl -fsSL https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz | tar xz

# litestream.yml configuration
dbs:
  - path: /data/app.db
    replicas:
      - type: s3
        bucket: my-backup-bucket
        path: backups/app.db
        region: us-east-1
        retention: 72h
        sync-interval: 1s

# Start replication (runs alongside your app)
litestream replicate -config litestream.yml

# Restore from backup
litestream restore -config litestream.yml /data/app.db`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Turso}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.tursoDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Turso CLI
turso db create my-app
turso db show my-app    # get connection URL and token

# TypeScript client
import { createClient } from "@libsql/client";

const db = createClient({
  url: "libsql://my-app-user.turso.io",
  authToken: "your-token-here",
});

const result = await db.execute("SELECT * FROM users WHERE active = ?", [true]);
console.log(result.rows);

// Embedded replica (local SQLite + cloud sync)
const db = createClient({
  url: "file:local.db",
  syncUrl: "libsql://my-app-user.turso.io",
  authToken: "your-token-here",
});`}</code></pre>

      {/* Architecture Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Patterns}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3SingleServer}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.singleServerDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Architecture: App + SQLite + Litestream
#
# [Your App] --> [SQLite WAL] --> [Litestream] --> [S3]
#     |              |
#     +-- reads -----+
#     +-- writes ----+
#
# Recovery: litestream restore -> start app
# RPO: ~1 second (continuous replication)
# RTO: ~2 minutes (restore + restart)

# Dockerfile
FROM node:20-slim

# Install Litestream
ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz /tmp/
RUN tar -xzf /tmp/litestream-*.tar.gz -C /usr/local/bin/

COPY . /app
WORKDIR /app

# Run with Litestream wrapper
CMD ["litestream", "replicate", "-exec", "node server.js"]`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3PerTenant}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.perTenantDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Database per tenant pattern
import Database from "better-sqlite3";
import { LRUCache } from "lru-cache";

const dbCache = new LRUCache<string, Database.Database>({
  max: 100,
  dispose: (db) => db.close(),
});

function getTenantDb(tenantId: string): Database.Database {
  let db = dbCache.get(tenantId);
  if (!db) {
    db = new Database(\`./data/tenants/\${tenantId}.db\`);
    db.pragma("journal_mode = WAL");
    db.pragma("synchronous = NORMAL");
    db.pragma("busy_timeout = 5000");
    dbCache.set(tenantId, db);
  }
  return db;
}

// Each tenant has their own database file
// Easy to backup, migrate, or delete individual tenants
const db = getTenantDb("tenant-123");
const users = db.prepare("SELECT * FROM users").all();`}</code></pre>

      {/* Performance */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Performance}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.performanceDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Operation</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>SQLite (WAL)</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>PostgreSQL</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Simple SELECT by PK', '~5 us', '~500 us (network)'],
              ['INSERT single row', '~50 us', '~1 ms'],
              ['SELECT with JOIN', '~100 us', '~2 ms'],
              ['Bulk INSERT (1000 rows)', '~5 ms (in transaction)', '~50 ms'],
              ['Concurrent reads (10)', 'All parallel', 'All parallel'],
              ['Concurrent writes (10)', 'Serialized', 'Parallel (MVCC)'],
            ].map(([op, sqlite, pg], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{op}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{sqlite}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{pg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A],
          [t.faq4Q, t.faq4A], [t.faq5Q, t.faq5A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
