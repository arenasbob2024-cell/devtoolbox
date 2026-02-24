'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'PostgreSQL JSON Queries: Complete Guide to JSONB Operators and Functions',
    intro: `PostgreSQL's JSON support is one of the most powerful features that sets it apart from other relational databases. With the jsonb type (binary JSON), you can store and query semi-structured data with full index support — getting the best of both relational and document databases. This guide covers every important jsonb operator, function, and indexing strategy with real examples.`,
    s1Title: 'JSON vs JSONB: Which Should You Use?',
    s2Title: 'Essential JSONB Operators',
    s3Title: 'JSONB Functions: Querying and Transforming',
    s4Title: 'Indexing JSONB for Performance',
    s5Title: 'Modifying JSONB Data',
    s6Title: 'Real-World JSONB Patterns',
    faqTitle: 'Frequently Asked Questions',
    conclusionTitle: 'Conclusion',
    relatedTitle: 'Related Tools',
  },
  fr: { title: 'Requêtes JSON PostgreSQL : guide complet des opérateurs JSONB', intro: 'La prise en charge JSON de PostgreSQL est l\'une des fonctionnalités les plus puissantes.', s1Title: 'JSON vs JSONB', s2Title: 'Opérateurs JSONB essentiels', s3Title: 'Fonctions JSONB', s4Title: 'Indexation JSONB', s5Title: 'Modification des données JSONB', s6Title: 'Patterns JSONB du monde réel', faqTitle: 'Questions fréquentes', conclusionTitle: 'Conclusion', relatedTitle: 'Outils associés' },
  de: { title: 'PostgreSQL JSON-Abfragen: Vollständiger Leitfaden', intro: 'Die JSON-Unterstützung von PostgreSQL ist eine der leistungsstärksten Funktionen.', s1Title: 'JSON vs. JSONB', s2Title: 'Wichtige JSONB-Operatoren', s3Title: 'JSONB-Funktionen', s4Title: 'JSONB-Indizierung', s5Title: 'JSONB-Daten ändern', s6Title: 'Reale JSONB-Muster', faqTitle: 'Häufig gestellte Fragen', conclusionTitle: 'Fazit', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Consultas JSON de PostgreSQL: guía completa de operadores JSONB', intro: 'El soporte JSON de PostgreSQL es una de las características más poderosas.', s1Title: 'JSON vs JSONB', s2Title: 'Operadores JSONB esenciales', s3Title: 'Funciones JSONB', s4Title: 'Indexación de JSONB', s5Title: 'Modificar datos JSONB', s6Title: 'Patrones JSONB del mundo real', faqTitle: 'Preguntas frecuentes', conclusionTitle: 'Conclusión', relatedTitle: 'Herramientas relacionadas' },
  it: { title: 'Query JSON PostgreSQL: guida completa agli operatori JSONB', intro: 'Il supporto JSON di PostgreSQL è una delle funzionalità più potenti.', s1Title: 'JSON vs JSONB', s2Title: 'Operatori JSONB essenziali', s3Title: 'Funzioni JSONB', s4Title: 'Indicizzazione JSONB', s5Title: 'Modifica dei dati JSONB', s6Title: 'Pattern JSONB del mondo reale', faqTitle: 'Domande frequenti', conclusionTitle: 'Conclusione', relatedTitle: 'Strumenti correlati' },
  pt: { title: 'Consultas JSON no PostgreSQL: guia completo de operadores JSONB', intro: 'O suporte JSON do PostgreSQL é um dos recursos mais poderosos.', s1Title: 'JSON vs JSONB', s2Title: 'Operadores JSONB essenciais', s3Title: 'Funções JSONB', s4Title: 'Indexação JSONB', s5Title: 'Modificando dados JSONB', s6Title: 'Padrões JSONB do mundo real', faqTitle: 'Perguntas frequentes', conclusionTitle: 'Conclusão', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'PostgreSQL JSON-query\'s: complete gids voor JSONB-operators', intro: 'De JSON-ondersteuning van PostgreSQL is een van de krachtigste functies.', s1Title: 'JSON vs JSONB', s2Title: 'Essentiële JSONB-operators', s3Title: 'JSONB-functies', s4Title: 'JSONB-indexering', s5Title: 'JSONB-gegevens wijzigen', s6Title: 'Echte JSONB-patronen', faqTitle: 'Veelgestelde vragen', conclusionTitle: 'Conclusie', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Zapytania JSON w PostgreSQL: przewodnik po operatorach JSONB', intro: 'Obsługa JSON w PostgreSQL jest jedną z najpotężniejszych funkcji.', s1Title: 'JSON vs JSONB', s2Title: 'Kluczowe operatory JSONB', s3Title: 'Funkcje JSONB', s4Title: 'Indeksowanie JSONB', s5Title: 'Modyfikowanie danych JSONB', s6Title: 'Wzorce JSONB w prawdziwym świecie', faqTitle: 'Często zadawane pytania', conclusionTitle: 'Podsumowanie', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'PostgreSQL JSON-frågor: komplett guide till JSONB-operatorer', intro: 'PostgreSQL:s JSON-stöd är en av de mest kraftfulla funktionerna.', s1Title: 'JSON vs JSONB', s2Title: 'Viktiga JSONB-operatorer', s3Title: 'JSONB-funktioner', s4Title: 'JSONB-indexering', s5Title: 'Ändra JSONB-data', s6Title: 'Verkliga JSONB-mönster', faqTitle: 'Vanliga frågor', conclusionTitle: 'Slutsats', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'PostgreSQL JSON-spørringer: komplett guide til JSONB-operatorer', intro: 'PostgreSQL:s JSON-støtte er en av de mest kraftige funksjonene.', s1Title: 'JSON vs JSONB', s2Title: 'Viktige JSONB-operatorer', s3Title: 'JSONB-funksjoner', s4Title: 'JSONB-indeksering', s5Title: 'Endre JSONB-data', s6Title: 'Virkelige JSONB-mønstre', faqTitle: 'Ofte stilte spørsmål', conclusionTitle: 'Konklusjon', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'PostgreSQL JSON 查询完整指南：JSONB 运算符和函数', intro: 'PostgreSQL 的 JSON 支持是其区别于其他关系型数据库最强大的特性之一。', s1Title: 'JSON 与 JSONB：应该使用哪个？', s2Title: '核心 JSONB 运算符', s3Title: 'JSONB 函数：查询和转换', s4Title: 'JSONB 索引性能优化', s5Title: '修改 JSONB 数据', s6Title: '实际 JSONB 模式', faqTitle: '常见问题', conclusionTitle: '总结', relatedTitle: '相关工具' },
  ja: { title: 'PostgreSQL JSON クエリ完全ガイド: JSONB オペレーターと関数', intro: 'PostgreSQL の JSON サポートは、他のリレーショナルデータベースとの差別化において最も強力な機能の 1 つです。', s1Title: 'JSON vs JSONB', s2Title: '重要な JSONB オペレーター', s3Title: 'JSONB 関数', s4Title: 'JSONB インデックス', s5Title: 'JSONB データの変更', s6Title: '実際の JSONB パターン', faqTitle: 'よくある質問', conclusionTitle: 'まとめ', relatedTitle: '関連ツール' },
  ko: { title: 'PostgreSQL JSON 쿼리 완벽 가이드: JSONB 연산자 및 함수', intro: 'PostgreSQL의 JSON 지원은 다른 관계형 데이터베이스와 차별화되는 가장 강력한 기능 중 하나입니다.', s1Title: 'JSON vs JSONB', s2Title: '필수 JSONB 연산자', s3Title: 'JSONB 함수', s4Title: 'JSONB 인덱싱', s5Title: 'JSONB 데이터 수정', s6Title: '실제 JSONB 패턴', faqTitle: '자주 묻는 질문', conclusionTitle: '결론', relatedTitle: '관련 도구' },
  id: { title: 'Kueri JSON PostgreSQL: Panduan Lengkap Operator dan Fungsi JSONB', intro: 'Dukungan JSON PostgreSQL adalah salah satu fitur paling kuat yang membedakannya dari database relasional lain.', s1Title: 'JSON vs JSONB', s2Title: 'Operator JSONB Penting', s3Title: 'Fungsi JSONB', s4Title: 'Pengindeksan JSONB', s5Title: 'Memodifikasi Data JSONB', s6Title: 'Pola JSONB Dunia Nyata', faqTitle: 'Pertanyaan yang Sering Diajukan', conclusionTitle: 'Kesimpulan', relatedTitle: 'Alat Terkait' },
  th: { title: 'PostgreSQL JSON Queries: คู่มือ JSONB Operators และ Functions ฉบับสมบูรณ์', intro: 'การรองรับ JSON ของ PostgreSQL เป็นหนึ่งในคุณสมบัติที่ทรงพลังที่สุดที่แยกแยะจากฐานข้อมูลเชิงสัมพันธ์อื่น ๆ', s1Title: 'JSON vs JSONB', s2Title: 'JSONB Operators ที่สำคัญ', s3Title: 'JSONB Functions', s4Title: 'การสร้าง Index สำหรับ JSONB', s5Title: 'การแก้ไขข้อมูล JSONB', s6Title: 'รูปแบบ JSONB ในโลกจริง', faqTitle: 'คำถามที่พบบ่อย', conclusionTitle: 'สรุป', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function PostgresqlJsonQueries({ lang = 'en' }: { lang?: string }) {
  const s = t[lang] || t['en'];

  const jsonVsJsonb = `-- Create a table with both types
CREATE TABLE events (
  id       SERIAL PRIMARY KEY,
  json_col  JSON,    -- stored as text, preserves whitespace/order
  jsonb_col JSONB    -- binary format, reorders keys, deduplicates
);

-- JSON: exact text storage
SELECT '{"b": 2, "a": 1, "a": 3}'::JSON;
-- Result: {"b": 2, "a": 1, "a": 3}  (preserved, duplicate kept)

-- JSONB: parsed and normalized
SELECT '{"b": 2, "a": 1, "a": 3}'::JSONB;
-- Result: {"a": 3, "b": 2}  (sorted, last duplicate wins)

-- Performance comparison:
-- JSON:  faster writes, slower reads (re-parsed each access)
-- JSONB: faster reads, GIN/GIST index support, operators
-- Recommendation: always use JSONB unless you need exact text preservation`;

  const operators = `-- Sample table
CREATE TABLE products (
  id   SERIAL PRIMARY KEY,
  data JSONB
);

INSERT INTO products (data) VALUES
  ('{"name": "Widget", "price": 9.99, "tags": ["sale", "new"], "specs": {"weight": 100, "color": "red"}}'),
  ('{"name": "Gadget", "price": 49.99, "tags": ["premium"], "specs": {"weight": 250, "color": "blue"}}');

-- -> (arrow): get JSON field (returns JSON)
SELECT data -> 'name' FROM products;
-- "Widget", "Gadget"

-- ->> (double arrow): get JSON field as text
SELECT data ->> 'name' FROM products;
-- Widget, Gadget

-- #> path operator: access nested field
SELECT data #> '{specs, color}' FROM products;
-- "red", "blue"

-- #>> path as text
SELECT data #>> '{specs, weight}' FROM products;
-- 100, 250

-- @> contains operator: does left contain right?
SELECT * FROM products WHERE data @> '{"tags": ["sale"]}';
-- Returns Widget row

-- <@ is contained by
SELECT * FROM products WHERE '{"price": 9.99}'::JSONB <@ data;

-- ? key exists
SELECT * FROM products WHERE data ? 'specs';

-- ?| any key exists
SELECT * FROM products WHERE data ?| ARRAY['discount', 'tags'];

-- ?& all keys exist
SELECT * FROM products WHERE data ?& ARRAY['name', 'price', 'tags'];

-- Numeric comparison on JSON field
SELECT * FROM products WHERE (data ->> 'price')::NUMERIC > 20;`;

  const functions = `-- jsonb_each: expand to key/value rows
SELECT key, value FROM products, jsonb_each(data) WHERE id = 1;
-- key: name, value: "Widget"
-- key: price, value: 9.99
-- key: tags, value: ["sale","new"]

-- jsonb_object_keys: get all keys
SELECT jsonb_object_keys(data) FROM products WHERE id = 1;

-- jsonb_array_elements: expand JSON array to rows
SELECT id, elem
FROM products, jsonb_array_elements(data -> 'tags') AS elem;

-- jsonb_array_elements_text: expand to text
SELECT id, tag
FROM products, jsonb_array_elements_text(data -> 'tags') AS tag;

-- jsonb_typeof: get value type
SELECT jsonb_typeof(data -> 'price');   -- number
SELECT jsonb_typeof(data -> 'tags');    -- array
SELECT jsonb_typeof(data -> 'specs');   -- object

-- json_agg: aggregate rows into JSON array
SELECT json_agg(row_to_json(p)) FROM products p WHERE (data ->> 'price')::NUMERIC < 20;

-- jsonb_build_object: construct jsonb
SELECT jsonb_build_object(
  'name',  data ->> 'name',
  'cheap', (data ->> 'price')::NUMERIC < 20
) FROM products;

-- jsonb_strip_nulls: remove null values
SELECT jsonb_strip_nulls('{"a": 1, "b": null, "c": null}'::JSONB);
-- {"a": 1}`;

  const indexing = `-- GIN index: best for @>, ?, ?|, ?& operators
CREATE INDEX idx_products_data ON products USING GIN (data);

-- Targeted GIN index on specific path
CREATE INDEX idx_products_tags ON products USING GIN ((data -> 'tags'));

-- BTREE index on extracted field (for range queries, sorting)
CREATE INDEX idx_products_price ON products ((data ->> 'price'));
CREATE INDEX idx_products_name  ON products ((data ->> 'name'));

-- Partial index: only index rows matching condition
CREATE INDEX idx_sale_products ON products USING GIN (data)
WHERE data @> '{"tags": ["sale"]}';

-- Expression index for numeric comparisons
CREATE INDEX idx_price_numeric ON products (((data ->> 'price')::NUMERIC));

-- Verify index is being used
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM products WHERE data @> '{"tags": ["sale"]}';

-- Check index size
SELECT pg_size_pretty(pg_relation_size('idx_products_data'));`;

  const modifying = `-- jsonb_set: update a specific path
UPDATE products
SET data = jsonb_set(data, '{price}', '19.99'::JSONB)
WHERE id = 1;

-- Nested update
UPDATE products
SET data = jsonb_set(data, '{specs, color}', '"green"'::JSONB)
WHERE id = 1;

-- || (concatenate): merge JSONB objects (right side wins on conflict)
UPDATE products
SET data = data || '{"discount": 0.1, "featured": true}'::JSONB
WHERE id = 1;

-- #- (delete path): remove a key
UPDATE products
SET data = data #- '{specs, weight}'
WHERE id = 1;

-- Remove top-level key
UPDATE products
SET data = data - 'discount'
WHERE id = 1;

-- Remove multiple keys
UPDATE products
SET data = data - ARRAY['discount', 'featured']
WHERE id = 1;

-- jsonb_insert: insert into array at position
UPDATE products
SET data = jsonb_insert(data, '{tags, 0}', '"clearance"'::JSONB)
WHERE id = 1;`;

  const realWorld = `-- Pattern 1: User settings/preferences
CREATE TABLE users (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email    TEXT UNIQUE NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}'::JSONB
);

-- Query users with specific notification setting
SELECT id, email FROM users
WHERE settings @> '{"notifications": {"email": true}}';

-- Pattern 2: Audit log with flexible payload
CREATE TABLE audit_log (
  id         BIGSERIAL PRIMARY KEY,
  entity     TEXT NOT NULL,
  action     TEXT NOT NULL,
  payload    JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Find all updates to a specific user
SELECT * FROM audit_log
WHERE entity = 'user'
  AND payload @> '{"user_id": 42}'
  AND action = 'update'
ORDER BY created_at DESC;

-- Pattern 3: Product catalog with variable attributes
SELECT
  data ->> 'name'    AS name,
  data ->> 'price'   AS price,
  data -> 'specs'    AS specifications,
  jsonb_array_length(data -> 'tags') AS tag_count
FROM products
WHERE data @> '{"tags": ["sale"]}'
  AND (data ->> 'price')::NUMERIC BETWEEN 5 AND 50
ORDER BY (data ->> 'price')::NUMERIC ASC;`;

  const faqs = [
    {
      q: 'When should I use JSONB vs a separate table with columns?',
      a: 'Use JSONB for truly variable or optional attributes that differ per row, for schemaless data from external APIs, or when the structure is unknown at design time. Use regular columns when the data structure is fixed, you need foreign keys, or you need efficient sorting and range queries on those fields. Hybrid approaches (fixed columns + JSONB for extras) are common in production.'
    },
    {
      q: 'How do I search for a value anywhere in a JSONB document?',
      a: 'For arbitrary deep search, use the @> operator with a partial document, or use jsonb_each_text() to unnest and search. For full-text search inside JSON values, you can create a function-based index: CREATE INDEX ON table USING GIN (to_tsvector("english", data::text)). For complex search, consider a dedicated search engine like Elasticsearch.'
    },
    {
      q: 'Why are my JSONB queries slow even with a GIN index?',
      a: 'GIN indexes support @>, ?, ?|, ?& operators, but NOT field extraction operators like -> and ->>.  For queries like WHERE data ->> "name" = "Alice", you need a BTREE index on the expression: CREATE INDEX ON table ((data ->> "name")). Also check that your statistics are up to date with ANALYZE.'
    },
    {
      q: 'How do I aggregate JSONB data across multiple rows?',
      a: 'Use json_agg() to collect rows into a JSON array, jsonb_object_agg(key, value) to build an object from key-value pairs across rows, or jsonb_agg() for JSONB arrays. For complex aggregations, use row_to_json() to convert a row to JSON first, then aggregate.'
    },
    {
      q: 'Can I use JSONB with PostgreSQL foreign keys or constraints?',
      a: 'JSONB columns cannot directly participate in foreign key relationships (you cannot reference a value inside JSON from another table). You can add check constraints using jsonb_typeof() or custom functions to validate structure. For true referential integrity, extract critical foreign key fields into real columns and use JSONB only for the flexible extras.'
    },
    {
      q: 'What is the maximum size of a JSONB value in PostgreSQL?',
      a: 'A single JSONB value (the entire document in one cell) is limited by PostgreSQL page size to approximately 1GB, but practical limits are much lower for performance. Documents over a few MB should raise a design concern. Use TOAST (automatic for large values) for occasional large documents, but restructure if all your documents are large.'
    },
  ];

  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold mb-4">{s.title}</h1>
      <p className="text-lg text-gray-700 mb-8">{s.intro}</p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s1Title}</h2>
        <p className="mb-4">
          PostgreSQL has two JSON types: <code>json</code> (stores text as-is) and <code>jsonb</code> (binary format with full indexing support). For almost all use cases, prefer <code>jsonb</code>.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{jsonVsJsonb}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s2Title}</h2>
        <p className="mb-4">
          PostgreSQL provides a rich set of JSONB operators. The <code>-&gt;</code> and <code>-&gt;&gt;</code> operators extract fields, while <code>@&gt;</code>, <code>?</code>, and path operators enable powerful containment and existence queries.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{operators}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s3Title}</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{functions}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s4Title}</h2>
        <p className="mb-4">
          Proper indexing is critical for JSONB performance. GIN indexes support containment and existence operators, while expression BTREE indexes handle equality and range queries on extracted fields.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{indexing}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s5Title}</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{modifying}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s6Title}</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{realWorld}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.faqTitle}</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.conclusionTitle}</h2>
        <p className="mb-4">
          PostgreSQL JSONB gives you the flexibility of a document database with the reliability and power of a relational system. Master the <code>@&gt;</code> containment operator for filtering, create GIN indexes for scale, and use <code>jsonb_set</code> for updates. The JSON formatter tool below can help you validate and format JSON before inserting it into PostgreSQL.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">{s.relatedTitle}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Link href="/tools/json-formatter" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JSON Formatter</Link>
          <Link href="/tools/json-diff-tool" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JSON Diff Tool</Link>
          <Link href="/tools/sql-formatter" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">SQL Formatter</Link>
          <Link href="/tools/yaml-validator" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">YAML Validator</Link>
          <Link href="/tools/base64-decoder" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Base64 Decoder</Link>
          <Link href="/tools/regex-tester" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Regex Tester</Link>
        </div>
      </section>
    </article>
  );
}
