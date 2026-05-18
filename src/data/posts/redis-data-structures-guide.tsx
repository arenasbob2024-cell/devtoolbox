'use client';
import Link from 'next/link';
import React from 'react';

const codeStrings = `# STRINGS — the simplest type, just bytes

# Basic set and get
SET user:1000:name "Alice"
GET user:1000:name           # "Alice"

# Set with expiry (TTL in seconds)
SET session:abc123 "user_data" EX 3600      # expires in 1 hour
SET session:abc123 "user_data" PX 3600000   # expires in 1 hour (milliseconds)
SET session:abc123 "user_data" EXAT 1800000000  # expires at Unix timestamp

# Atomic counter operations
SET page:home:views 0
INCR page:home:views         # 1
INCR page:home:views         # 2
INCRBY page:home:views 10    # 12
DECR page:home:views         # 11

# String manipulation
SET greeting "Hello"
APPEND greeting " World"     # "Hello World"
STRLEN greeting              # 11

# GET and set in one operation
GETSET page:home:views 0     # returns old value, resets to 0
SETNX lock:resource "owner"  # set only if not exists (mutex pattern)

# Multiple keys at once
MSET user:1:name "Alice" user:1:age 30 user:2:name "Bob"
MGET user:1:name user:1:age user:2:name`;

const codeLists = `# LISTS — ordered sequences (linked list under the hood)

# Push to left (head) or right (tail)
RPUSH tasks "task1" "task2" "task3"   # right push (append)
LPUSH tasks "task0"                   # left push (prepend)

# Pop from left or right
LPOP tasks                # "task0" (removes and returns)
RPOP tasks                # "task3"

# Blocking pop (for task queues — blocks until item available)
BLPOP queue:jobs 30       # blocks up to 30 seconds

# Range (0-indexed; -1 means last element)
LRANGE tasks 0 -1         # all elements
LRANGE tasks 0 2          # first 3 elements

# Length and index access
LLEN tasks                # number of items
LINDEX tasks 0            # first item (no removal)

# Queue pattern (FIFO): producer RPUSH, consumer LPOP
RPUSH queue:emails "email1" "email2"
LPOP queue:emails         # "email1" (FIFO order)

# Stack pattern (LIFO): producer and consumer both on same end
LPUSH stack:undo "action1"
LPUSH stack:undo "action2"
LPOP stack:undo           # "action2" (LIFO order)`;

const codeSets = `# SETS — unordered collections of unique strings

# Add members
SADD tags:post:42 "nodejs" "javascript" "backend"
SADD tags:post:42 "nodejs"   # ignored (already exists)

# Check membership, count, remove
SISMEMBER tags:post:42 "nodejs"   # 1 (true)
SCARD tags:post:42                # 3
SREM tags:post:42 "backend"       # removes "backend"

# Get all members
SMEMBERS tags:post:42

# Random members (useful for recommendations)
SRANDMEMBER tags:post:42 2    # 2 random members (no removal)
SPOP tags:post:42             # 1 random member (with removal)

# Set operations (great for social features)
SADD user:1:following 2 3 4
SADD user:2:following 3 5 6

# Intersection: mutual follows
SINTER user:1:following user:2:following    # {3}

# Union: anyone either user follows
SUNION user:1:following user:2:following    # {2,3,4,5,6}

# Difference: who user 1 follows that user 2 doesn't
SDIFF user:1:following user:2:following     # {2,4}

# Store result of set operation into a new key
SINTERSTORE mutual:1:2 user:1:following user:2:following`;

const codeSortedSets = `# SORTED SETS (ZSET) — unique members, each with a float score

# Add members with scores
ZADD leaderboard 1500 "alice"
ZADD leaderboard 2300 "bob"
ZADD leaderboard 1800 "carol"
ZADD leaderboard 2300 "dave"   # score tie with bob

# Score operations
ZINCRBY leaderboard 200 "alice"   # alice now has 1700

# Get rank (0-indexed, lowest score first)
ZRANK leaderboard "alice"         # rank by ascending score
ZREVRANK leaderboard "bob"        # rank by descending score (0 = highest)

# Get members by rank range
ZRANGE leaderboard 0 -1                     # all, ascending
ZRANGE leaderboard 0 -1 WITHSCORES         # with scores
ZREVRANGE leaderboard 0 2 WITHSCORES       # top 3

# Get members by score range
ZRANGEBYSCORE leaderboard 1000 2000 WITHSCORES
ZRANGEBYSCORE leaderboard -inf +inf LIMIT 0 10   # pagination

# Count members in score range
ZCOUNT leaderboard 1500 2000    # count between scores

# Use case: rate limiting (sliding window)
ZADD rate:user:123 1708000000 "req_1"
ZREMRANGEBYSCORE rate:user:123 -inf 1707999000  # remove old entries
ZCARD rate:user:123             # current window count`;

const codeHashes = `# HASHES — field-value pairs (like objects/maps)

# Set fields
HSET user:1000 name "Alice" age 30 email "alice@example.com"

# Get one field or all fields
HGET user:1000 name              # "Alice"
HMGET user:1000 name age         # ["Alice", "30"]
HGETALL user:1000                # {name: Alice, age: 30, email: ...}

# Field existence, count, keys, values
HEXISTS user:1000 email          # 1
HLEN user:1000                   # 3
HKEYS user:1000                  # [name, age, email]
HVALS user:1000                  # [Alice, 30, alice@example.com]

# Numeric operations on hash fields
HINCRBY user:1000 login_count 1
HINCRBYFLOAT user:1000 balance 10.50

# Delete a field
HDEL user:1000 age

# Scan a hash incrementally (for large hashes)
HSCAN user:1000 0 MATCH "em*" COUNT 10`;

const codeHashProtocol = `# Modern Redis hash writes use HSET, including multiple field-value pairs.
HSET user:1000 name "Alice" age "30" email "alice@example.com"

# HMSET still exists for compatibility, but Redis marks it deprecated.
# Prefer the multi-field HSET form above when migrating old examples.
# HMSET user:1000 name "Alice" age "30" email "alice@example.com"

# RESP request shape for: HSET user:1000 name Alice
# Redis clients send commands as arrays of bulk strings.
*5\\r\\n
$4\\r\\nHSET\\r\\n
$9\\r\\nuser:1000\\r\\n
$4\\r\\nname\\r\\n
$5\\r\\nAlice\\r\\n`;

const codeStreams = `# STREAMS — append-only log (like Kafka, but built-in)

# Add an event (auto-generated ID: timestamp-sequence)
XADD events:orders * user_id 123 product "Widget" amount 9.99
XADD events:orders * user_id 456 product "Gadget" amount 24.99

# Add with explicit ID
XADD events:orders 1708000000000-0 user_id 789 product "Doohickey" amount 4.99

# Read from beginning
XRANGE events:orders - +
XRANGE events:orders - + COUNT 10   # limit results

# Read from last N entries
XREVRANGE events:orders + - COUNT 5

# Consumer groups (for distributed processing)
XGROUP CREATE events:orders processors $ MKSTREAM

# Consumer reads from group
XREADGROUP GROUP processors worker1 COUNT 10 STREAMS events:orders >

# Acknowledge processed messages
XACK events:orders processors 1708000000000-0

# Stream info
XLEN events:orders              # total messages
XINFO STREAM events:orders      # metadata`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Redis Data Structures Guide: Strings, Lists, Sets, Sorted Sets, Hashes, Streams',
    intro: 'Redis is not just a key-value cache — it is a data structure server. Each Redis data type is optimized for specific use cases, and choosing the right structure dramatically simplifies your application logic. This comprehensive guide covers all seven core Redis data structures with real-world examples and performance characteristics.',
    hashQuickTitle: 'Quick Answers: Redis Hashes, HSET, and the RESP Protocol',
    hashQuickIntro: 'Redis hashes are record-like field-value maps stored inside one Redis key. They are the right fit for user profiles, product attributes, counters grouped by object, and partial object updates where JSON strings would force read-modify-write cycles.',
    hashQuickQ1: 'What are Redis hashes?',
    hashQuickA1: 'Redis hashes store multiple field-value pairs under one key, similar to an object or map. Use HSET to create or update fields, HGET for one field, HMGET for selected fields, and HGETALL only when the hash is small enough to return completely.',
    hashQuickQ2: 'Should I use HSET or HMSET?',
    hashQuickA2: 'Use HSET. Redis 4.0 deprecated HMSET because HSET can set one or many field-value pairs. Old tutorials may still show HMSET, but new code should use HSET key field value [field value ...].',
    hashQuickQ3: 'What does "protocol" mean for Redis hashes?',
    hashQuickA3: 'The Redis wire protocol is RESP. Client libraries send HSET, HGET, and HGETALL as arrays of bulk strings, then parse integer, bulk-string, array, or map-like replies into the language-native return shape.',
    hashQuickQ4: 'When are hashes more memory-efficient than string keys?',
    hashQuickA4: 'Small objects are often more efficient as one hash key with many fields than as many separate Redis keys. Redis can use compact encodings for small hashes, while many independent keys add key metadata overhead.',
    stringsTitle: 'Strings',
    stringsDesc: 'The most fundamental Redis type. Strings store any sequence of bytes (text, integers, serialized JSON, binary data). Maximum size is 512 MB.',
    listsTitle: 'Lists',
    listsDesc: 'Redis Lists are linked lists. They are extremely fast for operations at the head or tail (O(1)), and support blocking pop operations — perfect for task queues.',
    setsTitle: 'Sets',
    setsDesc: 'Unordered collections of unique strings. Redis provides set algebra operations (union, intersection, difference) that are invaluable for social features and recommendation systems.',
    sortedSetsTitle: 'Sorted Sets (ZSET)',
    sortedSetsDesc: 'Like Sets but every member has an associated floating-point score. Members are ordered by score. The quintessential Redis structure for leaderboards, rate limiting, and time-series.',
    hashesTitle: 'Hashes',
    hashesDesc: 'Key-value maps within a key. Ideal for representing objects with multiple fields. More memory-efficient than storing each field as a separate key.',
    streamsTitle: 'Streams',
    streamsDesc: 'Redis Streams (added in 5.0) are an append-only log data structure. They support consumer groups for distributed, fault-tolerant event processing — similar to Apache Kafka but simpler.',
    useCasesTitle: 'Data Structure Use Case Guide',
    comparisonTitle: 'Time Complexity Reference',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Use consistent key naming conventions: object_type:id:field (e.g., user:1000:profile). This makes key scanning and TTL management predictable.',
    bp2: 'Always set TTLs on session data, tokens, and cache entries. Redis is not a primary store for data that must survive forever without eviction policies.',
    bp3: 'Use HSET for objects instead of separate string keys. user:1000 with fields is more efficient than user:1000:name + user:1000:age.',
    bp4: 'Use pipelines (MULTI/EXEC or client-side pipelining) to batch multiple commands and reduce round-trip latency.',
    bp5: 'Avoid KEYS * in production. Use SCAN with a cursor pattern for safe, incremental key enumeration.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the maximum number of keys Redis can hold?',
    faq1a: 'Redis can hold up to 2^32 - 1 keys per database (~4.2 billion). In practice, you are limited by available RAM. A Redis instance with 32 GB RAM can comfortably hold hundreds of millions of keys.',
    faq2q: 'When should I use a Hash vs a String for an object?',
    faq2a: 'Use Hash when: (1) you need to update individual fields without fetching the whole object, (2) you have many fields and want to save memory with compact hash encoding, or (3) you use HINCRBY for counters within the object. Use String (with JSON serialization) when: you always read/write the entire object atomically, or you need to index the JSON content.',
    faq3q: 'How does Redis persistence work with data structures?',
    faq3a: 'All Redis data structures are saved equally by both persistence mechanisms: RDB (snapshots at intervals) and AOF (append-only file — logs every write command). Data structures in memory serialize/deserialize seamlessly. Use RDB for backup, AOF for durability, or both for maximum safety.',
    faq4q: 'What is the difference between EXPIRE and TTL?',
    faq4a: 'EXPIRE key seconds sets the expiry time on a key. TTL key returns the remaining time to live in seconds (-1 means no expiry, -2 means key does not exist). PERSIST removes the expiry. EXPIREAT sets absolute expiry using a Unix timestamp. PTTL and PEXPIRE work in milliseconds.',
    faq5q: 'How do I use Redis Sorted Sets for rate limiting?',
    faq5a: 'Sliding window rate limiting with Sorted Sets: (1) Use current timestamp as score, (2) ZADD rate:user:123 timestamp request_id, (3) ZREMRANGEBYSCORE to remove entries older than the window, (4) ZCARD to count remaining entries, (5) if count < limit, allow the request. This is accurate and atomic when wrapped in a Lua script or MULTI/EXEC.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Redis 数据结构指南：字符串、列表、集合、有序集合、哈希、流',
    intro: 'Redis 不仅仅是一个键值缓存——它是一个数据结构服务器。每种 Redis 数据类型都针对特定用例进行了优化，选择正确的数据结构可以大幅简化应用程序逻辑。本综合指南涵盖了所有七种核心 Redis 数据结构，并提供了实际示例和性能特征。',
    hashQuickTitle: '快速回答：Redis Hashes、HSET 与 RESP 协议',
    hashQuickIntro: 'Redis Hashes 是存储在一个 Redis key 内部的 field-value 映射，类似对象或 map。它适合用户资料、商品属性、按对象分组的计数器，以及只更新部分字段而不想反复读写整段 JSON 的场景。',
    hashQuickQ1: 'Redis hashes 是什么？',
    hashQuickA1: 'Redis hashes 在一个 key 下存储多个 field-value。用 HSET 创建或更新字段，用 HGET 读取单个字段，用 HMGET 读取指定字段；只有在 hash 足够小时才用 HGETALL 返回全部字段。',
    hashQuickQ2: '应该用 HSET 还是 HMSET？',
    hashQuickA2: '用 HSET。Redis 4.0 已将 HMSET 标记为 deprecated，因为 HSET 已支持一次设置一个或多个 field-value。旧教程可能仍写 HMSET，新代码应使用 HSET key field value [field value ...]。',
    hashQuickQ3: 'Redis hashes 和 protocol 有什么关系？',
    hashQuickA3: 'Redis 的网络协议是 RESP。客户端库会把 HSET、HGET、HGETALL 等命令编码成 bulk string 数组发送给 Redis，再把整数、bulk string、数组或 map-like 回复解析成对应语言的返回值。',
    hashQuickQ4: '什么时候 hashes 比多个 string key 更省内存？',
    hashQuickA4: '小对象通常适合放在一个 hash key 的多个字段里，而不是拆成很多独立 Redis key。Redis 可以对小 hash 使用紧凑编码，多个独立 key 则会产生更多 key 元数据开销。',
    stringsTitle: '字符串（Strings）',
    stringsDesc: '最基本的 Redis 类型。字符串存储任何字节序列（文本、整数、序列化的 JSON、二进制数据）。最大大小为 512 MB。',
    listsTitle: '列表（Lists）',
    listsDesc: 'Redis 列表是链表。对头部或尾部的操作极快（O(1)），并支持阻塞弹出操作——非常适合任务队列。',
    setsTitle: '集合（Sets）',
    setsDesc: '无序的唯一字符串集合。Redis 提供集合代数操作（并集、交集、差集），对社交功能和推荐系统非常有价值。',
    sortedSetsTitle: '有序集合（Sorted Sets / ZSET）',
    sortedSetsDesc: '类似集合，但每个成员都有关联的浮点分数。成员按分数排序。这是排行榜、速率限制和时间序列的典型 Redis 结构。',
    hashesTitle: '哈希（Hashes）',
    hashesDesc: '键内的键值映射。非常适合表示具有多个字段的对象。比将每个字段作为单独键存储更节省内存。',
    streamsTitle: '流（Streams）',
    streamsDesc: 'Redis Streams（5.0 版本添加）是一种追加专用日志数据结构。它们支持消费者组，用于分布式、容错的事件处理——类似 Apache Kafka，但更简单。',
    useCasesTitle: '数据结构用例指南',
    comparisonTitle: '时间复杂度参考',
    bestPracticesTitle: '最佳实践',
    bp1: '使用一致的键命名约定：object_type:id:field（例如 user:1000:profile）。这使键扫描和 TTL 管理变得可预测。',
    bp2: '始终为会话数据、令牌和缓存条目设置 TTL。对于没有逐出策略必须永久保存的数据，Redis 不是主存储。',
    bp3: '对对象使用 HSET 而非单独的字符串键。带字段的 user:1000 比 user:1000:name + user:1000:age 更高效。',
    bp4: '使用管道（MULTI/EXEC 或客户端管道）批量处理多个命令并减少往返延迟。',
    bp5: '在生产中避免使用 KEYS *。使用带游标模式的 SCAN 进行安全的增量键枚举。',
    faqTitle: '常见问题',
    faq1q: 'Redis 可以持有的最大键数是多少？',
    faq1a: 'Redis 每个数据库最多可持有 2^32 - 1 个键（约 42 亿）。实际上，受可用 RAM 限制。拥有 32 GB RAM 的 Redis 实例可以轻松持有数亿个键。',
    faq2q: '何时应该对对象使用 Hash 而非 String？',
    faq2a: '在以下情况使用 Hash：(1) 需要在不获取整个对象的情况下更新单个字段，(2) 有很多字段并希望通过紧凑哈希编码节省内存，或 (3) 在对象内使用 HINCRBY 作为计数器。在以下情况使用 String（JSON 序列化）：始终原子性读/写整个对象，或需要索引 JSON 内容。',
    faq3q: 'Redis 持久性如何与数据结构配合工作？',
    faq3a: '所有 Redis 数据结构都被两种持久性机制同等保存：RDB（定时快照）和 AOF（追加专用文件——记录每个写命令）。内存中的数据结构无缝序列化/反序列化。使用 RDB 进行备份，AOF 用于持久性，或两者都用以获得最大安全性。',
    faq4q: 'EXPIRE 和 TTL 有什么区别？',
    faq4a: 'EXPIRE key seconds 设置键的过期时间。TTL key 返回剩余生存时间（秒）（-1 表示无过期，-2 表示键不存在）。PERSIST 移除过期时间。EXPIREAT 使用 Unix 时间戳设置绝对过期时间。PTTL 和 PEXPIRE 以毫秒为单位。',
    faq5q: '如何使用 Redis 有序集合进行速率限制？',
    faq5a: '使用有序集合的滑动窗口速率限制：(1) 使用当前时间戳作为分数，(2) ZADD rate:user:123 timestamp request_id，(3) 使用 ZREMRANGEBYSCORE 删除比时间窗口更早的条目，(4) 使用 ZCARD 计算剩余条目，(5) 如果计数 < 限制，允许请求。当包装在 Lua 脚本或 MULTI/EXEC 中时，这是准确和原子的。',
    relatedTitle: '相关工具',
  },
};

export default function RedisDataStructuresGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;
  const hashQuickAnswers = [
    { question: t.hashQuickQ1, answer: t.hashQuickA1 },
    { question: t.hashQuickQ2, answer: t.hashQuickA2 },
    { question: t.hashQuickQ3, answer: t.hashQuickA3 },
    { question: t.hashQuickQ4, answer: t.hashQuickA4 },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      ...hashQuickAnswers.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    ],
  };

  const useCaseRows = [
    { structure: 'String', useCases: 'Sessions, tokens, counters, caching, flags', example: 'session:abc = user data' },
    { structure: 'List', useCases: 'Task queues, activity feeds, recent items', example: 'queue:jobs — RPUSH/BLPOP' },
    { structure: 'Set', useCases: 'Tags, likes, follows, unique visitors, permissions', example: 'user:1:following' },
    { structure: 'Sorted Set', useCases: 'Leaderboards, rate limiting, priority queues, timelines', example: 'leaderboard — score = points' },
    { structure: 'Hash', useCases: 'User profiles, product catalog, config objects', example: 'user:1000 — name, age, email' },
    { structure: 'Stream', useCases: 'Event log, message queue, audit trail, IoT data', example: 'events:orders — consumer groups' },
  ];

  const complexityRows = [
    { op: 'GET/SET (String)', complexity: 'O(1)', note: 'Constant time' },
    { op: 'LPUSH/RPOP (List)', complexity: 'O(1)', note: 'Head/tail only' },
    { op: 'LRANGE (List)', complexity: 'O(n)', note: 'n = elements returned' },
    { op: 'SADD/SREM (Set)', complexity: 'O(1)', note: 'Per element' },
    { op: 'SINTER (Set)', complexity: 'O(N*M)', note: 'N = min set size, M = sets' },
    { op: 'ZADD (Sorted Set)', complexity: 'O(log N)', note: 'Skip list insertion' },
    { op: 'ZRANGE (Sorted Set)', complexity: 'O(log N + M)', note: 'M = elements returned' },
    { op: 'HSET/HGET (Hash)', complexity: 'O(1)', note: 'Per field' },
    { op: 'HGETALL (Hash)', complexity: 'O(n)', note: 'n = fields' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <section style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0 }}>{t.hashQuickTitle}</h2>
        <p style={{ lineHeight: '1.7', marginBottom: '1.25rem' }}>{t.hashQuickIntro}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {hashQuickAnswers.map((item) => (
            <div key={item.question} style={{ background: '#ffffff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '1rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#7c2d12' }}>{item.question}</strong>
              <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.6 }}>{item.answer}</p>
            </div>
          ))}
        </div>
        <pre style={{ ...preStyle, marginBottom: 0 }}><code>{codeHashProtocol}</code></pre>
      </section>

      <h2>{t.stringsTitle}</h2>
      <p>{t.stringsDesc}</p>
      <pre style={preStyle}><code>{codeStrings}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.listsTitle}</h2>
      <p>{t.listsDesc}</p>
      <pre style={preStyle}><code>{codeLists}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.setsTitle}</h2>
      <p>{t.setsDesc}</p>
      <pre style={preStyle}><code>{codeSets}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.sortedSetsTitle}</h2>
      <p>{t.sortedSetsDesc}</p>
      <pre style={preStyle}><code>{codeSortedSets}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.hashesTitle}</h2>
      <p>{t.hashesDesc}</p>
      <pre style={preStyle}><code>{codeHashes}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.streamsTitle}</h2>
      <p>{t.streamsDesc}</p>
      <pre style={preStyle}><code>{codeStreams}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.useCasesTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Structure</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Common Use Cases</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {useCaseRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 700, color: '#c53030' }}>{row.structure}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.useCases}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Operation</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Complexity</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Note</th>
            </tr>
          </thead>
          <tbody>
            {complexityRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.85rem' }}>{row.op}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 700, color: row.complexity === 'O(1)' ? '#276749' : '#744210' }}>{row.complexity}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', color: '#6c757d' }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ol style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
      </ol>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #e53e3e' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><Link href={`/${lang}/tools/json-formatter`} style={{ color: '#3182ce' }}>JSON Formatter</Link></li>
          <li><Link href={`/${lang}/tools/hash-generator`} style={{ color: '#3182ce' }}>Hash Generator</Link></li>
          <li><Link href={`/${lang}/tools/cron-expression-generator`} style={{ color: '#3182ce' }}>Cron Expression Generator</Link></li>
        </ul>
      </div>
    </article>
  );
}
