'use client';
import React from 'react';

const codeCreateTable = `-- Create a table with JSONB column
CREATE TABLE products (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    metadata    JSONB,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Insert JSONB data
INSERT INTO products (name, metadata) VALUES
    ('Widget A', '{"price": 9.99, "category": "widgets", "tags": ["sale", "new"], "specs": {"weight": 0.5, "color": "red"}}'),
    ('Gadget B', '{"price": 24.99, "category": "gadgets", "tags": ["popular"], "specs": {"weight": 1.2, "color": "blue"}, "stock": 150}'),
    ('Doohickey C', '{"price": 4.99, "category": "widgets", "tags": ["sale"], "specs": {"weight": 0.1, "color": "green"}, "rating": 4.5}');`;

const codeQuerying = `-- Access a top-level key (returns JSONB)
SELECT metadata -> 'price' FROM products;
-- Returns: 9.99, 24.99, 4.99 (as JSONB)

-- Access a key as text (use ->>)
SELECT metadata ->> 'category' FROM products;
-- Returns: 'widgets', 'gadgets', 'widgets' (as text)

-- Nested access
SELECT metadata -> 'specs' -> 'color' FROM products;
SELECT metadata #> '{specs,color}' FROM products;        -- path operator
SELECT metadata #>> '{specs,color}' FROM products;       -- path as text

-- Filter rows by JSONB value
SELECT name FROM products WHERE metadata ->> 'category' = 'widgets';

-- Filter by nested value
SELECT name FROM products WHERE (metadata -> 'specs' ->> 'weight')::float > 0.5;

-- Check if key exists
SELECT name FROM products WHERE metadata ? 'stock';

-- Check if ANY key in array exists
SELECT name FROM products WHERE metadata ?| ARRAY['stock', 'rating'];

-- Check if ALL keys exist
SELECT name FROM products WHERE metadata ?& ARRAY['price', 'category'];

-- Containment: does JSONB contain this sub-object?
SELECT name FROM products WHERE metadata @> '{"category": "widgets"}';

-- Is JSONB contained by?
SELECT name FROM products WHERE '{"category": "widgets"}' <@ metadata;`;

const codeModifying = `-- Update a specific key (PostgreSQL 14+: subscript syntax)
UPDATE products
SET metadata['price'] = '19.99'
WHERE name = 'Widget A';

-- jsonb_set: update nested key (older syntax, all versions)
UPDATE products
SET metadata = jsonb_set(metadata, '{price}', '19.99')
WHERE name = 'Widget A';

-- Update nested path
UPDATE products
SET metadata = jsonb_set(metadata, '{specs,color}', '"black"')
WHERE name = 'Widget A';

-- Add a new key
UPDATE products
SET metadata = metadata || '{"discount": 0.1}'::jsonb
WHERE name = 'Widget A';

-- Remove a key
UPDATE products
SET metadata = metadata - 'stock'
WHERE name = 'Gadget B';

-- Remove multiple keys
UPDATE products
SET metadata = metadata - ARRAY['stock', 'rating'];

-- Remove nested key
UPDATE products
SET metadata = metadata #- '{specs,weight}';`;

const codeIndexing = `-- GIN index: most useful for JSONB (supports ?, ?|, ?&, @>, <@)
CREATE INDEX idx_products_metadata ON products USING GIN (metadata);

-- GIN index on a specific key (for equality queries on that key)
CREATE INDEX idx_products_category ON products
    USING GIN ((metadata -> 'category'));

-- B-tree index on extracted value (for range queries)
CREATE INDEX idx_products_price ON products
    USING BTREE ((( metadata ->> 'price' )::numeric));

-- Expression index for a nested text field
CREATE INDEX idx_products_color ON products
    USING BTREE ((metadata #>> '{specs,color}'));

-- Check index usage
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM products WHERE metadata @> '{"category": "widgets"}';`;

const codeAggregation = `-- jsonb_agg: aggregate rows into a JSON array
SELECT
    metadata ->> 'category' AS category,
    jsonb_agg(name ORDER BY name) AS product_names,
    COUNT(*) AS count,
    AVG((metadata ->> 'price')::numeric) AS avg_price
FROM products
GROUP BY metadata ->> 'category';

-- jsonb_object_agg: build a JSON object from key-value pairs
SELECT jsonb_object_agg(name, metadata ->> 'price') AS price_map
FROM products;

-- jsonb_array_elements: expand a JSONB array into rows
SELECT
    name,
    jsonb_array_elements_text(metadata -> 'tags') AS tag
FROM products;

-- jsonb_each: expand a JSONB object into key-value rows
SELECT
    name,
    key,
    value
FROM products,
     jsonb_each(metadata -> 'specs');

-- jsonb_build_object: construct JSONB from expressions
SELECT jsonb_build_object(
    'id', id,
    'name', name,
    'price', (metadata ->> 'price')::numeric,
    'in_stock', metadata ? 'stock'
) AS product_summary
FROM products;`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'PostgreSQL JSONB Guide: Indexing, Querying, Operators, and Performance',
    intro: 'PostgreSQL JSONB (Binary JSON) is one of the most powerful features in modern PostgreSQL. Unlike the JSON type which stores text verbatim, JSONB stores parsed binary data — enabling fast querying, indexing, and efficient storage. This guide covers everything from basic operations to advanced indexing strategies and performance optimization.',
    whyJsonbTitle: 'JSON vs JSONB: Which to Use?',
    whyJsonbDesc: 'PostgreSQL has two JSON types: json and jsonb. For almost all use cases, use jsonb.',
    createTitle: 'Creating Tables and Inserting JSONB Data',
    createDesc: 'JSONB columns store any valid JSON value. Keys are sorted and duplicates are removed on storage.',
    queryTitle: 'Querying JSONB: Operators Reference',
    queryDesc: 'PostgreSQL provides rich operators for accessing and filtering JSONB data.',
    modifyTitle: 'Modifying JSONB Data',
    modifyDesc: 'Update, add, and remove fields within JSONB columns without replacing the entire value.',
    indexTitle: 'Indexing JSONB for Performance',
    indexDesc: 'The right index strategy can make JSONB queries as fast as queries on regular columns. GIN indexes are the workhorse for JSONB.',
    aggTitle: 'Aggregation and JSONB Functions',
    aggDesc: 'PostgreSQL provides powerful functions for aggregating, expanding, and constructing JSONB values.',
    operatorsTitle: 'JSONB Operators Quick Reference',
    perfTitle: 'Performance Tips',
    perf1: 'Always create a GIN index on JSONB columns you query frequently. Without an index, JSONB queries require sequential scans.',
    perf2: 'Extract frequently-queried fields into regular columns with generated columns: GENERATED ALWAYS AS (metadata ->> \'category\') STORED.',
    perf3: 'Use jsonb instead of json — it is faster for reads (binary format, no re-parsing) and supports indexing.',
    perf4: 'Avoid deep nesting. Flat JSONB structures are easier to index and query. Consider normalizing very deep structures.',
    perf5: 'Use @> (containment) for filtering on known sub-objects — it uses the GIN index. Avoid ->> with LIKE for text search; use full-text search instead.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'When should I use JSONB instead of relational columns?',
    faq1a: 'Use JSONB for: semi-structured data where the schema varies per row, storing configurations or settings, event payloads or metadata, and prototype development where the schema is not yet fixed. Use regular columns when: data is highly structured and uniform, you need complex JOINs, or data changes frequently with strict transactional guarantees.',
    faq2q: 'How do I search for text inside a JSONB string value?',
    faq2a: 'For full-text search inside JSONB strings, use: to_tsvector(\'english\', metadata ->> \'description\') @@ to_tsquery(\'search term\'). Create a GIN index on the tsvector expression. For simple substring matching, use metadata ->> \'field\' LIKE \'%pattern%\' but this cannot use a GIN index.',
    faq3q: 'What is the maximum size of a JSONB value?',
    faq3a: 'A single JSONB value in PostgreSQL can be up to 1 GB. However, for practical performance reasons, JSONB columns work best when individual values are under 1 MB. Large JSONB values slow down updates (the entire value must be rewritten) and indexing.',
    faq4q: 'How do I validate JSONB schema in PostgreSQL?',
    faq4a: 'PostgreSQL 16+ supports JSON Schema validation with the jsonb_matches_schema() function. For older versions, use CHECK constraints with custom functions. Example: ALTER TABLE products ADD CONSTRAINT check_metadata CHECK (jsonb_typeof(metadata -> \'price\') = \'number\');',
    faq5q: 'How does JSONB compare to a dedicated document database like MongoDB?',
    faq5a: 'JSONB gives you document storage within PostgreSQL, combining the flexibility of document databases with ACID transactions, complex JOINs, full-text search, and all other PostgreSQL features. MongoDB offers native document-first querying and horizontal sharding. For most applications that already use PostgreSQL, JSONB is preferred over adding a separate database.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'PostgreSQL JSONB 指南：索引、查询、运算符和性能',
    intro: 'PostgreSQL JSONB（二进制 JSON）是现代 PostgreSQL 中最强大的功能之一。与以文本形式存储的 JSON 类型不同，JSONB 存储解析后的二进制数据——支持快速查询、索引和高效存储。本指南涵盖从基本操作到高级索引策略和性能优化的所有内容。',
    whyJsonbTitle: 'JSON vs JSONB：使用哪个？',
    whyJsonbDesc: 'PostgreSQL 有两种 JSON 类型：json 和 jsonb。对于几乎所有用例，请使用 jsonb。',
    createTitle: '创建表并插入 JSONB 数据',
    createDesc: 'JSONB 列存储任何有效的 JSON 值。键在存储时会被排序，重复键会被删除。',
    queryTitle: '查询 JSONB：运算符参考',
    queryDesc: 'PostgreSQL 提供了丰富的运算符来访问和过滤 JSONB 数据。',
    modifyTitle: '修改 JSONB 数据',
    modifyDesc: '在不替换整个值的情况下更新、添加和删除 JSONB 列中的字段。',
    indexTitle: 'JSONB 索引以提升性能',
    indexDesc: '正确的索引策略可以使 JSONB 查询与常规列上的查询一样快。GIN 索引是 JSONB 的主力。',
    aggTitle: '聚合和 JSONB 函数',
    aggDesc: 'PostgreSQL 提供了强大的函数来聚合、展开和构造 JSONB 值。',
    operatorsTitle: 'JSONB 运算符快速参考',
    perfTitle: '性能技巧',
    perf1: '始终在频繁查询的 JSONB 列上创建 GIN 索引。没有索引，JSONB 查询需要顺序扫描。',
    perf2: '使用生成列将频繁查询的字段提取为常规列：GENERATED ALWAYS AS (metadata ->> \'category\') STORED。',
    perf3: '使用 jsonb 而非 json——读取更快（二进制格式，无需重新解析）且支持索引。',
    perf4: '避免深层嵌套。扁平的 JSONB 结构更易于索引和查询。考虑对非常深的结构进行规范化。',
    perf5: '使用 @>（包含）过滤已知子对象——它使用 GIN 索引。避免使用 ->> 和 LIKE 进行文本搜索；改用全文搜索。',
    faqTitle: '常见问题',
    faq1q: '什么时候应该使用 JSONB 而非关系列？',
    faq1a: '在以下情况使用 JSONB：每行模式不同的半结构化数据、存储配置或设置、事件载荷或元数据、模式尚未固定的原型开发。在以下情况使用常规列：数据高度结构化且统一、需要复杂 JOIN、或数据频繁变化且需要严格事务保证。',
    faq2q: '如何在 JSONB 字符串值中搜索文本？',
    faq2a: '对于 JSONB 字符串内的全文搜索，使用：to_tsvector(\'english\', metadata ->> \'description\') @@ to_tsquery(\'search term\')。在 tsvector 表达式上创建 GIN 索引。对于简单的子字符串匹配，使用 metadata ->> \'field\' LIKE \'%pattern%\'，但这不能使用 GIN 索引。',
    faq3q: 'JSONB 值的最大大小是多少？',
    faq3a: 'PostgreSQL 中单个 JSONB 值最大可达 1 GB。但是，出于实际性能原因，当单个值小于 1 MB 时，JSONB 列效果最佳。大型 JSONB 值会减慢更新（必须重写整个值）和索引速度。',
    faq4q: '如何在 PostgreSQL 中验证 JSONB 模式？',
    faq4a: 'PostgreSQL 16+ 通过 jsonb_matches_schema() 函数支持 JSON Schema 验证。对于旧版本，使用带有自定义函数的 CHECK 约束。示例：ALTER TABLE products ADD CONSTRAINT check_metadata CHECK (jsonb_typeof(metadata -> \'price\') = \'number\');',
    faq5q: 'JSONB 与 MongoDB 等专用文档数据库相比如何？',
    faq5a: 'JSONB 让你在 PostgreSQL 中存储文档，将文档数据库的灵活性与 ACID 事务、复杂 JOIN、全文搜索以及所有其他 PostgreSQL 功能结合起来。MongoDB 提供原生文档优先查询和水平分片。对于大多数已经使用 PostgreSQL 的应用，JSONB 优于添加单独的数据库。',
    relatedTitle: '相关工具',
  },
};

export default function PostgresqlJsonbGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const jsonVsJsonbRows = [
    { feature: 'Storage format', json: 'Text (verbatim)', jsonb: 'Binary (parsed)' },
    { feature: 'Write speed', json: 'Faster', jsonb: 'Slightly slower' },
    { feature: 'Read speed', json: 'Slower (re-parse)', jsonb: 'Faster' },
    { feature: 'GIN indexing', json: 'No', jsonb: 'Yes' },
    { feature: 'Duplicate keys', json: 'Preserved', jsonb: 'Last value wins' },
    { feature: 'Key ordering', json: 'Preserved', jsonb: 'Sorted' },
    { feature: 'Operators', json: '-> and ->>', jsonb: 'All operators' },
  ];

  const operatorRows = [
    { op: '->', usage: 'metadata -> \'key\'', desc: 'Get JSONB value by key' },
    { op: '->>', usage: 'metadata ->> \'key\'', desc: 'Get text value by key' },
    { op: '#>', usage: "metadata #> '{a,b}'", desc: 'Get JSONB by path' },
    { op: '#>>', usage: "metadata #>> '{a,b}'", desc: 'Get text by path' },
    { op: '@>', usage: "metadata @> '{\"k\":\"v\"}'", desc: 'Containment (uses GIN)' },
    { op: '<@', usage: "'{\"k\":\"v\"}' <@ metadata", desc: 'Is contained by' },
    { op: '?', usage: "metadata ? 'key'", desc: 'Key exists' },
    { op: '?|', usage: "metadata ?| ARRAY['a','b']", desc: 'Any key exists' },
    { op: '?&', usage: "metadata ?& ARRAY['a','b']", desc: 'All keys exist' },
    { op: '||', usage: "metadata || '{\"new\":1}'", desc: 'Concatenate/merge' },
    { op: '-', usage: "metadata - 'key'", desc: 'Remove key' },
    { op: '#-', usage: "metadata #- '{a,b}'", desc: 'Remove by path' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.whyJsonbTitle}</h2>
      <p>{t.whyJsonbDesc}</p>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Feature</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>json</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>jsonb (recommended)</th>
            </tr>
          </thead>
          <tbody>
            {jsonVsJsonbRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 500 }}>{row.feature}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.json}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', color: '#276749', fontWeight: 500 }}>{row.jsonb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.createTitle}</h2>
      <p>{t.createDesc}</p>
      <pre style={preStyle}><code>{codeCreateTable}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.queryTitle}</h2>
      <p>{t.queryDesc}</p>
      <pre style={preStyle}><code>{codeQuerying}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.operatorsTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Operator</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Example</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {operatorRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem' }}>{row.op}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.usage}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.modifyTitle}</h2>
      <p>{t.modifyDesc}</p>
      <pre style={preStyle}><code>{codeModifying}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.indexTitle}</h2>
      <p>{t.indexDesc}</p>
      <pre style={preStyle}><code>{codeIndexing}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.aggTitle}</h2>
      <p>{t.aggDesc}</p>
      <pre style={preStyle}><code>{codeAggregation}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.perfTitle}</h2>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.perf1}</li>
        <li>{t.perf2}</li>
        <li>{t.perf3}</li>
        <li>{t.perf4}</li>
        <li>{t.perf5}</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
          <li><a href="/en/tools/json-to-typescript" style={{ color: '#3182ce' }}>JSON to TypeScript</a></li>
          <li><a href="/en/tools/sql-formatter" style={{ color: '#3182ce' }}>SQL Formatter</a></li>
        </ul>
      </div>
    </article>
  );
}
