'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'SQL vs NoSQL: How to Choose the Right Database',
    intro: 'Choosing between <strong>SQL</strong> and <strong>NoSQL</strong> databases is one of the most impactful architectural decisions for any application. SQL databases (PostgreSQL, MySQL, SQLite) use structured tables with predefined schemas and support powerful query capabilities via SQL. NoSQL databases (MongoDB, Redis, DynamoDB, Cassandra) offer flexible schemas, horizontal scaling, and are optimized for specific data access patterns. This guide provides a practical, in-depth comparison to help you make the right choice.',
    h2Overview: 'Overview: SQL vs NoSQL',
    overviewP1: 'The fundamental difference is in how data is organized and queried. SQL databases organize data into <strong>tables with rows and columns</strong>, enforce a schema, and use Structured Query Language for data manipulation. NoSQL databases use various data models — <strong>documents, key-value pairs, wide columns, or graphs</strong> — and typically offer flexible or schema-less data storage.',
    h2Types: 'Types of NoSQL Databases',
    typesIntro: 'NoSQL is not a single technology but a family of databases with different data models, each optimized for different use cases.',
    h2Comparison: 'SQL vs NoSQL Comparison',
    thAspect: 'Aspect',
    thSql: 'SQL (Relational)',
    thNosql: 'NoSQL',
    aspDataModel: 'Data model',
    aspSchema: 'Schema',
    aspQuery: 'Query language',
    aspScaling: 'Scaling',
    aspAcid: 'ACID transactions',
    aspJoins: 'Joins',
    aspConsistency: 'Consistency',
    aspPerformance: 'Performance',
    aspBestFor: 'Best for',
    valSqlModel: 'Tables with rows and columns',
    valNosqlModel: 'Documents, key-value, wide-column, graph',
    valSqlSchema: 'Rigid (schema-on-write)',
    valNosqlSchema: 'Flexible (schema-on-read)',
    valSqlQuery: 'SQL (standardized)',
    valNosqlQuery: 'Database-specific (MQL, CQL, etc.)',
    valSqlScale: 'Vertical (scale up) + read replicas',
    valNosqlScale: 'Horizontal (scale out) natively',
    valSqlAcid: 'Full ACID guarantee',
    valNosqlAcid: 'Varies (eventual consistency common)',
    valSqlJoins: 'Full JOIN support (optimized)',
    valNosqlJoins: 'Limited or no joins ($lookup, denormalize)',
    valSqlConsist: 'Strong consistency by default',
    valNosqlConsist: 'Eventual consistency (tunable)',
    valSqlPerf: 'Excellent for complex queries and joins',
    valNosqlPerf: 'Excellent for simple queries at scale',
    valSqlBest: 'Structured data, complex queries, transactions',
    valNosqlBest: 'Flexible data, high write throughput, horizontal scaling',
    h2AcidBase: 'ACID vs BASE',
    acidP: 'SQL databases follow the ACID model, while NoSQL databases often follow the BASE model. Understanding this difference is crucial for applications that require data consistency guarantees.',
    h2WhenSql: 'When to Choose SQL',
    sqlUseList: '<ul><li><strong>Structured, relational data</strong> — Users, orders, products with clear relationships</li><li><strong>Complex queries</strong> — JOINs, subqueries, aggregations, window functions, CTEs</li><li><strong>ACID transactions</strong> — Banking, e-commerce, inventory management</li><li><strong>Data integrity</strong> — Foreign keys, unique constraints, check constraints</li><li><strong>Reporting and analytics</strong> — Complex analytical queries, GROUP BY, HAVING</li><li><strong>Regulatory compliance</strong> — Financial, healthcare, government data</li><li><strong>Small to medium scale</strong> — PostgreSQL handles millions of rows efficiently</li></ul>',
    h2WhenNosql: 'When to Choose NoSQL',
    nosqlUseList: '<ul><li><strong>Flexible/evolving schema</strong> — Rapid prototyping, A/B testing different data shapes</li><li><strong>High write throughput</strong> — IoT sensor data, event logging, click streams</li><li><strong>Horizontal scaling</strong> — Petabyte-scale data, global distribution</li><li><strong>Caching</strong> — Session storage, API response caching (Redis)</li><li><strong>Real-time applications</strong> — Chat, gaming leaderboards, live feeds</li><li><strong>Content management</strong> — CMS with varying content types</li><li><strong>Graph data</strong> — Social networks, recommendation engines (Neo4j)</li><li><strong>Time-series data</strong> — Metrics, logs, monitoring data</li></ul>',
    h2CodeExamples: 'Code Examples',
    h3SqlExample: 'SQL (PostgreSQL)',
    h3MongoExample: 'NoSQL (MongoDB)',
    h3RedisExample: 'NoSQL (Redis)',
    h2Scaling: 'Scaling Strategies',
    h3SqlScaling: 'SQL Scaling',
    sqlScalingP: 'SQL databases primarily scale vertically (more CPU, RAM, faster SSD). Read replicas add horizontal read scaling. Sharding is possible but complex.',
    h3NosqlScaling: 'NoSQL Scaling',
    nosqlScalingP: 'NoSQL databases are designed for horizontal scaling. Add more nodes to handle more traffic. Data is automatically distributed across the cluster.',
    h2Migration: 'Migration Patterns',
    migrationP: 'In practice, many applications use both SQL and NoSQL databases, choosing each for what it does best.',
    h2PopularDbs: 'Popular Database Comparison',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Can I use SQL and NoSQL together?',
    faq1A: 'Absolutely. This is called <strong>polyglot persistence</strong> and is a common pattern. Use PostgreSQL for transactional data (users, orders, payments), Redis for caching and sessions, MongoDB for unstructured content, and Elasticsearch for full-text search. Each database handles what it does best.',
    faq2Q: 'Is NoSQL faster than SQL?',
    faq2A: 'It depends on the query pattern. NoSQL databases are faster for simple key-value lookups and writes at scale. SQL databases are faster for complex queries involving joins, aggregations, and filtering across multiple tables. For simple CRUD operations, both are comparable. The "NoSQL is faster" myth comes from comparing a sharded MongoDB cluster against a single PostgreSQL server.',
    faq3Q: 'Should startups use SQL or NoSQL?',
    faq3A: 'Most startups should start with <strong>PostgreSQL</strong>. It handles structured data, has JSONB for flexible data, scales well to millions of rows, and has the richest ecosystem. Only add NoSQL databases when you have a specific need (caching, real-time features, truly massive scale) that PostgreSQL cannot handle efficiently. Starting with NoSQL and later needing ACID transactions is a much harder migration than starting with SQL and adding NoSQL.',
    faq4Q: 'Is MongoDB good for production?',
    faq4A: 'Yes. MongoDB is widely used in production at companies of all sizes. It excels for content management, catalogs with varying attributes, event sourcing, and applications with flexible data shapes. However, if your data is highly relational (many-to-many relationships, complex queries), PostgreSQL is a better fit. MongoDB has improved significantly with multi-document transactions (v4.0+), schema validation, and MongoDB Atlas (managed service).',
    faq5Q: 'What about NewSQL databases?',
    faq5A: 'NewSQL databases (CockroachDB, TiDB, YugabyteDB, PlanetScale) combine SQL\'s ACID guarantees with NoSQL\'s horizontal scalability. They use distributed architectures to provide global scale while maintaining SQL compatibility. They are excellent choices when you need both SQL features and horizontal scaling, but they add operational complexity compared to managed services like Supabase (PostgreSQL) or MongoDB Atlas.',
    faq6Q: 'Which database is best for a REST API?',
    faq6A: 'PostgreSQL is the safest choice for most REST APIs. It handles structured data with relationships (users, posts, comments), supports JSONB for flexible fields, has excellent ORM support (Prisma, TypeORM, Drizzle), and scales well. Use Redis for caching API responses. Add MongoDB only if your API serves highly unstructured or document-oriented data.',
    relatedTitle: 'Related Tools and Guides',
  },
  zh: {
    title: 'SQL vs NoSQL：如何选择合适的数据库',
    intro: '在 <strong>SQL</strong> 和 <strong>NoSQL</strong> 数据库之间选择是最重要的架构决策之一。SQL 数据库使用结构化表格，NoSQL 数据库提供灵活的模式和水平扩展。',
    h2Overview: '概述', overviewP1: '根本区别在于数据如何组织和查询。SQL 使用<strong>表格</strong>，NoSQL 使用<strong>文档、键值对、宽列或图</strong>。',
    h2Types: 'NoSQL 数据库类型', typesIntro: 'NoSQL 不是单一技术，而是具有不同数据模型的数据库家族。',
    h2Comparison: 'SQL vs NoSQL 对比', thAspect: '方面', thSql: 'SQL（关系型）', thNosql: 'NoSQL', aspDataModel: '数据模型', aspSchema: '模式', aspQuery: '查询语言', aspScaling: '扩展', aspAcid: 'ACID 事务', aspJoins: '连接', aspConsistency: '一致性', aspPerformance: '性能', aspBestFor: '最适合', valSqlModel: '行和列的表格', valNosqlModel: '文档、键值、宽列、图', valSqlSchema: '严格（写时模式）', valNosqlSchema: '灵活（读时模式）', valSqlQuery: 'SQL（标准化）', valNosqlQuery: '数据库特定', valSqlScale: '垂直扩展 + 只读副本', valNosqlScale: '原生水平扩展', valSqlAcid: '完全 ACID', valNosqlAcid: '因数据库而异', valSqlJoins: '完整 JOIN 支持', valNosqlJoins: '有限或无连接', valSqlConsist: '默认强一致性', valNosqlConsist: '最终一致性', valSqlPerf: '复杂查询优秀', valNosqlPerf: '大规模简单查询优秀', valSqlBest: '结构化数据、复杂查询', valNosqlBest: '灵活数据、高写入、水平扩展',
    h2AcidBase: 'ACID vs BASE', acidP: 'SQL 遵循 ACID 模型，NoSQL 通常遵循 BASE 模型。',
    h2WhenSql: '何时选择 SQL', sqlUseList: '<ul><li><strong>结构化关系数据</strong></li><li><strong>复杂查询</strong> — JOIN、子查询、聚合</li><li><strong>ACID 事务</strong> — 银行、电商</li><li><strong>数据完整性</strong> — 外键、约束</li></ul>',
    h2WhenNosql: '何时选择 NoSQL', nosqlUseList: '<ul><li><strong>灵活模式</strong> — 快速原型</li><li><strong>高写入吞吐</strong> — IoT、日志</li><li><strong>水平扩展</strong> — PB 级数据</li><li><strong>缓存</strong> — Redis</li></ul>',
    h2CodeExamples: '代码示例', h3SqlExample: 'SQL (PostgreSQL)', h3MongoExample: 'NoSQL (MongoDB)', h3RedisExample: 'NoSQL (Redis)',
    h2Scaling: '扩展策略', h3SqlScaling: 'SQL 扩展', sqlScalingP: 'SQL 主要垂直扩展。', h3NosqlScaling: 'NoSQL 扩展', nosqlScalingP: 'NoSQL 为水平扩展而设计。',
    h2Migration: '迁移模式', migrationP: '实际上许多应用同时使用 SQL 和 NoSQL。',
    h2PopularDbs: '流行数据库对比',
    h2Faq: '常见问题', faq1Q: '可以同时使用 SQL 和 NoSQL 吗？', faq1A: '当然。这叫<strong>多语言持久化</strong>，是常见模式。', faq2Q: 'NoSQL 比 SQL 快吗？', faq2A: '取决于查询模式。简单查询 NoSQL 更快，复杂查询 SQL 更快。', faq3Q: '创业公司应该用 SQL 还是 NoSQL？', faq3A: '大多数创业公司应该从 <strong>PostgreSQL</strong> 开始。', faq4Q: 'MongoDB 适合生产环境吗？', faq4A: '是的。MongoDB 在各种规模的公司中广泛使用。', faq5Q: 'NewSQL 数据库怎么样？', faq5A: 'NewSQL 结合了 SQL 的 ACID 和 NoSQL 的水平扩展。', faq6Q: '哪个数据库最适合 REST API？', faq6A: 'PostgreSQL 是最安全的选择。',
    relatedTitle: '相关工具和指南',
  },
  ja: {
    title: 'SQL vs NoSQL：適切なデータベースの選び方',
    intro: '<strong>SQL</strong>と<strong>NoSQL</strong>データベースの選択は最も重要なアーキテクチャ決定の一つです。',
    h2Overview: '概要', overviewP1: '根本的な違いはデータの組織化とクエリの方法にあります。',
    h2Types: 'NoSQLデータベースの種類', typesIntro: 'NoSQLは単一の技術ではなく、異なるデータモデルのファミリーです。',
    h2Comparison: 'SQL vs NoSQL比較', thAspect: '項目', thSql: 'SQL', thNosql: 'NoSQL', aspDataModel: 'データモデル', aspSchema: 'スキーマ', aspQuery: 'クエリ言語', aspScaling: 'スケーリング', aspAcid: 'ACIDトランザクション', aspJoins: 'JOIN', aspConsistency: '一貫性', aspPerformance: 'パフォーマンス', aspBestFor: '最適用途', valSqlModel: 'テーブル（行と列）', valNosqlModel: 'ドキュメント、キーバリュー、ワイドカラム、グラフ', valSqlSchema: '厳格', valNosqlSchema: '柔軟', valSqlQuery: 'SQL（標準化）', valNosqlQuery: 'DB固有', valSqlScale: '垂直スケーリング', valNosqlScale: '水平スケーリング', valSqlAcid: '完全ACID', valNosqlAcid: 'DB依存', valSqlJoins: '完全JOIN対応', valNosqlJoins: '限定的', valSqlConsist: '強整合性', valNosqlConsist: '結果整合性', valSqlPerf: '複雑クエリに優秀', valNosqlPerf: '大規模単純クエリに優秀', valSqlBest: '構造化データ、複雑クエリ', valNosqlBest: '柔軟データ、高書込み',
    h2AcidBase: 'ACID vs BASE', acidP: 'SQLはACIDモデル、NoSQLはBASEモデル。',
    h2WhenSql: 'SQLを選ぶ場合', sqlUseList: '<ul><li><strong>構造化関連データ</strong></li><li><strong>複雑クエリ</strong></li><li><strong>ACIDトランザクション</strong></li></ul>',
    h2WhenNosql: 'NoSQLを選ぶ場合', nosqlUseList: '<ul><li><strong>柔軟スキーマ</strong></li><li><strong>高書込み</strong></li><li><strong>水平スケーリング</strong></li></ul>',
    h2CodeExamples: 'コード例', h3SqlExample: 'SQL (PostgreSQL)', h3MongoExample: 'NoSQL (MongoDB)', h3RedisExample: 'NoSQL (Redis)',
    h2Scaling: 'スケーリング戦略', h3SqlScaling: 'SQLスケーリング', sqlScalingP: 'SQLは主に垂直スケーリング。', h3NosqlScaling: 'NoSQLスケーリング', nosqlScalingP: 'NoSQLは水平スケーリング向けに設計。',
    h2Migration: '移行パターン', migrationP: '多くのアプリケーションがSQLとNoSQLの両方を使用。',
    h2PopularDbs: '人気DB比較',
    h2Faq: 'よくある質問', faq1Q: 'SQLとNoSQLを一緒に使える？', faq1A: 'はい。ポリグロットパーシステンスと呼ばれる一般的なパターンです。', faq2Q: 'NoSQLはSQLより速い？', faq2A: 'クエリパターンに依存します。', faq3Q: 'スタートアップはSQL？NoSQL？', faq3A: 'PostgreSQLから始めるべきです。', faq4Q: 'MongoDBは本番環境に適している？', faq4A: 'はい。広く使用されています。', faq5Q: 'NewSQLは？', faq5A: 'SQLのACIDとNoSQLのスケーラビリティを組み合わせ。', faq6Q: 'REST APIに最適なDB？', faq6A: 'PostgreSQLが最も安全な選択です。',
    relatedTitle: '関連ツールとガイド',
  },
  ko: {
    title: 'SQL vs NoSQL: 올바른 데이터베이스 선택하기',
    intro: '<strong>SQL</strong>과 <strong>NoSQL</strong> 데이터베이스 간의 선택은 가장 중요한 아키텍처 결정 중 하나입니다.',
    h2Overview: '개요', overviewP1: '근본적인 차이는 데이터 구성과 쿼리 방법에 있습니다.',
    h2Types: 'NoSQL 데이터베이스 유형', typesIntro: 'NoSQL은 단일 기술이 아닌 다양한 데이터 모델의 데이터베이스 패밀리입니다.',
    h2Comparison: 'SQL vs NoSQL 비교', thAspect: '항목', thSql: 'SQL', thNosql: 'NoSQL', aspDataModel: '데이터 모델', aspSchema: '스키마', aspQuery: '쿼리 언어', aspScaling: '스케일링', aspAcid: 'ACID 트랜잭션', aspJoins: 'JOIN', aspConsistency: '일관성', aspPerformance: '성능', aspBestFor: '최적 용도', valSqlModel: '테이블 (행과 열)', valNosqlModel: '문서, 키-값, 와이드 컬럼, 그래프', valSqlSchema: '엄격함', valNosqlSchema: '유연함', valSqlQuery: 'SQL (표준화)', valNosqlQuery: 'DB별 고유', valSqlScale: '수직 스케일링', valNosqlScale: '수평 스케일링', valSqlAcid: '완전 ACID', valNosqlAcid: 'DB마다 다름', valSqlJoins: '완전 JOIN 지원', valNosqlJoins: '제한적', valSqlConsist: '강한 일관성', valNosqlConsist: '최종 일관성', valSqlPerf: '복잡한 쿼리에 우수', valNosqlPerf: '대규모 단순 쿼리에 우수', valSqlBest: '구조화된 데이터, 복잡한 쿼리', valNosqlBest: '유연한 데이터, 높은 쓰기',
    h2AcidBase: 'ACID vs BASE', acidP: 'SQL은 ACID 모델, NoSQL은 BASE 모델을 따릅니다.',
    h2WhenSql: 'SQL을 선택할 때', sqlUseList: '<ul><li><strong>구조화된 관계형 데이터</strong></li><li><strong>복잡한 쿼리</strong></li><li><strong>ACID 트랜잭션</strong></li></ul>',
    h2WhenNosql: 'NoSQL을 선택할 때', nosqlUseList: '<ul><li><strong>유연한 스키마</strong></li><li><strong>높은 쓰기 처리량</strong></li><li><strong>수평 스케일링</strong></li></ul>',
    h2CodeExamples: '코드 예시', h3SqlExample: 'SQL (PostgreSQL)', h3MongoExample: 'NoSQL (MongoDB)', h3RedisExample: 'NoSQL (Redis)',
    h2Scaling: '스케일링 전략', h3SqlScaling: 'SQL 스케일링', sqlScalingP: 'SQL은 주로 수직 스케일링.', h3NosqlScaling: 'NoSQL 스케일링', nosqlScalingP: 'NoSQL은 수평 스케일링을 위해 설계.',
    h2Migration: '마이그레이션 패턴', migrationP: '많은 애플리케이션이 SQL과 NoSQL 모두 사용합니다.',
    h2PopularDbs: '인기 DB 비교',
    h2Faq: '자주 묻는 질문', faq1Q: 'SQL과 NoSQL을 함께 사용할 수 있나요?', faq1A: '네. 폴리글랏 퍼시스턴스라는 일반적인 패턴입니다.', faq2Q: 'NoSQL이 SQL보다 빠른가요?', faq2A: '쿼리 패턴에 따라 다릅니다.', faq3Q: '스타트업은 SQL? NoSQL?', faq3A: 'PostgreSQL로 시작하세요.', faq4Q: 'MongoDB는 프로덕션에 적합한가요?', faq4A: '네. 널리 사용됩니다.', faq5Q: 'NewSQL은?', faq5A: 'SQL의 ACID와 NoSQL의 스케일링을 결합.', faq6Q: 'REST API에 최적의 DB는?', faq6A: 'PostgreSQL이 가장 안전한 선택입니다.',
    relatedTitle: '관련 도구 및 가이드',
  },
  fr: {
    title: 'SQL vs NoSQL : Comment choisir la bonne base de donnees',
    intro: 'Choisir entre <strong>SQL</strong> et <strong>NoSQL</strong> est une decision architecturale majeure.',
    h2Overview: 'Vue d\'ensemble', overviewP1: 'La difference fondamentale reside dans l\'organisation des donnees.',
    h2Types: 'Types de bases NoSQL', typesIntro: 'NoSQL n\'est pas une technologie unique.', h2Comparison: 'Comparaison SQL vs NoSQL', thAspect: 'Aspect', thSql: 'SQL', thNosql: 'NoSQL', aspDataModel: 'Modele de donnees', aspSchema: 'Schema', aspQuery: 'Langage de requete', aspScaling: 'Mise a l\'echelle', aspAcid: 'Transactions ACID', aspJoins: 'Jointures', aspConsistency: 'Coherence', aspPerformance: 'Performance', aspBestFor: 'Ideal pour', valSqlModel: 'Tables', valNosqlModel: 'Documents, cle-valeur, colonnes, graphe', valSqlSchema: 'Rigide', valNosqlSchema: 'Flexible', valSqlQuery: 'SQL', valNosqlQuery: 'Specifique au DB', valSqlScale: 'Vertical', valNosqlScale: 'Horizontal', valSqlAcid: 'Complet', valNosqlAcid: 'Variable', valSqlJoins: 'Complet', valNosqlJoins: 'Limite', valSqlConsist: 'Forte', valNosqlConsist: 'Eventuelle', valSqlPerf: 'Requetes complexes', valNosqlPerf: 'Grande echelle', valSqlBest: 'Donnees structurees', valNosqlBest: 'Donnees flexibles',
    h2AcidBase: 'ACID vs BASE', acidP: 'SQL suit ACID, NoSQL suit souvent BASE.',
    h2WhenSql: 'Quand choisir SQL', sqlUseList: '<ul><li><strong>Donnees relationnelles</strong></li><li><strong>Requetes complexes</strong></li><li><strong>Transactions ACID</strong></li></ul>',
    h2WhenNosql: 'Quand choisir NoSQL', nosqlUseList: '<ul><li><strong>Schema flexible</strong></li><li><strong>Haute ecriture</strong></li><li><strong>Mise a l\'echelle horizontale</strong></li></ul>',
    h2CodeExamples: 'Exemples de code', h3SqlExample: 'SQL (PostgreSQL)', h3MongoExample: 'NoSQL (MongoDB)', h3RedisExample: 'NoSQL (Redis)',
    h2Scaling: 'Strategies de mise a l\'echelle', h3SqlScaling: 'SQL', sqlScalingP: 'Principalement vertical.', h3NosqlScaling: 'NoSQL', nosqlScalingP: 'Concu pour l\'horizontal.',
    h2Migration: 'Patterns de migration', migrationP: 'Beaucoup d\'applications utilisent les deux.',
    h2PopularDbs: 'Comparaison des DB populaires',
    h2Faq: 'Questions frequentes', faq1Q: 'Peut-on utiliser les deux ?', faq1A: 'Oui. Polyglot persistence.', faq2Q: 'NoSQL est-il plus rapide ?', faq2A: 'Depend du pattern de requete.', faq3Q: 'Pour les startups ?', faq3A: 'PostgreSQL recommande.', faq4Q: 'MongoDB en production ?', faq4A: 'Oui, largement utilise.', faq5Q: 'NewSQL ?', faq5A: 'Combine ACID et scalabilite horizontale.', faq6Q: 'Meilleur pour REST API ?', faq6A: 'PostgreSQL.',
    relatedTitle: 'Outils et guides associes',
  },
  de: {
    title: 'SQL vs NoSQL: Die richtige Datenbank waehlen',
    intro: 'Die Wahl zwischen <strong>SQL</strong> und <strong>NoSQL</strong> ist eine der wichtigsten Architekturentscheidungen.',
    h2Overview: 'Ueberblick', overviewP1: 'Der grundlegende Unterschied liegt in der Datenorganisation.',
    h2Types: 'NoSQL-Datenbanktypen', typesIntro: 'NoSQL ist keine einzelne Technologie.', h2Comparison: 'SQL vs NoSQL Vergleich', thAspect: 'Aspekt', thSql: 'SQL', thNosql: 'NoSQL', aspDataModel: 'Datenmodell', aspSchema: 'Schema', aspQuery: 'Abfragesprache', aspScaling: 'Skalierung', aspAcid: 'ACID', aspJoins: 'Joins', aspConsistency: 'Konsistenz', aspPerformance: 'Leistung', aspBestFor: 'Am besten fuer', valSqlModel: 'Tabellen', valNosqlModel: 'Dokumente, Key-Value, Wide Column, Graph', valSqlSchema: 'Streng', valNosqlSchema: 'Flexibel', valSqlQuery: 'SQL', valNosqlQuery: 'DB-spezifisch', valSqlScale: 'Vertikal', valNosqlScale: 'Horizontal', valSqlAcid: 'Vollstaendig', valNosqlAcid: 'Variiert', valSqlJoins: 'Vollstaendig', valNosqlJoins: 'Begrenzt', valSqlConsist: 'Stark', valNosqlConsist: 'Eventuell', valSqlPerf: 'Komplexe Abfragen', valNosqlPerf: 'Grosse Skala', valSqlBest: 'Strukturierte Daten', valNosqlBest: 'Flexible Daten',
    h2AcidBase: 'ACID vs BASE', acidP: 'SQL folgt ACID, NoSQL oft BASE.',
    h2WhenSql: 'SQL waehlen', sqlUseList: '<ul><li><strong>Relationale Daten</strong></li><li><strong>Komplexe Abfragen</strong></li><li><strong>ACID-Transaktionen</strong></li></ul>',
    h2WhenNosql: 'NoSQL waehlen', nosqlUseList: '<ul><li><strong>Flexibles Schema</strong></li><li><strong>Hoher Schreibdurchsatz</strong></li><li><strong>Horizontale Skalierung</strong></li></ul>',
    h2CodeExamples: 'Code-Beispiele', h3SqlExample: 'SQL (PostgreSQL)', h3MongoExample: 'NoSQL (MongoDB)', h3RedisExample: 'NoSQL (Redis)',
    h2Scaling: 'Skalierungsstrategien', h3SqlScaling: 'SQL', sqlScalingP: 'Hauptsaechlich vertikal.', h3NosqlScaling: 'NoSQL', nosqlScalingP: 'Fuer horizontale Skalierung konzipiert.',
    h2Migration: 'Migrationsmuster', migrationP: 'Viele Anwendungen verwenden beides.',
    h2PopularDbs: 'Beliebte DB-Vergleich',
    h2Faq: 'Haeufige Fragen', faq1Q: 'Beide zusammen verwenden?', faq1A: 'Ja. Polyglot Persistence.', faq2Q: 'Ist NoSQL schneller?', faq2A: 'Abhaengig vom Abfragemuster.', faq3Q: 'Fuer Startups?', faq3A: 'PostgreSQL empfohlen.', faq4Q: 'MongoDB in Produktion?', faq4A: 'Ja, weit verbreitet.', faq5Q: 'NewSQL?', faq5A: 'Kombiniert ACID und horizontale Skalierbarkeit.', faq6Q: 'Bestes fuer REST API?', faq6A: 'PostgreSQL.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'SQL vs NoSQL: Como elegir la base de datos correcta',
    intro: 'Elegir entre <strong>SQL</strong> y <strong>NoSQL</strong> es una de las decisiones arquitectonicas mas importantes.',
    h2Overview: 'Resumen', overviewP1: 'La diferencia fundamental esta en como se organizan los datos.',
    h2Types: 'Tipos de bases NoSQL', typesIntro: 'NoSQL no es una tecnologia unica.', h2Comparison: 'Comparacion SQL vs NoSQL', thAspect: 'Aspecto', thSql: 'SQL', thNosql: 'NoSQL', aspDataModel: 'Modelo de datos', aspSchema: 'Esquema', aspQuery: 'Lenguaje de consulta', aspScaling: 'Escalabilidad', aspAcid: 'Transacciones ACID', aspJoins: 'Joins', aspConsistency: 'Consistencia', aspPerformance: 'Rendimiento', aspBestFor: 'Ideal para', valSqlModel: 'Tablas', valNosqlModel: 'Documentos, clave-valor, columnas, grafo', valSqlSchema: 'Rigido', valNosqlSchema: 'Flexible', valSqlQuery: 'SQL', valNosqlQuery: 'Especifico del DB', valSqlScale: 'Vertical', valNosqlScale: 'Horizontal', valSqlAcid: 'Completo', valNosqlAcid: 'Variable', valSqlJoins: 'Completo', valNosqlJoins: 'Limitado', valSqlConsist: 'Fuerte', valNosqlConsist: 'Eventual', valSqlPerf: 'Consultas complejas', valNosqlPerf: 'Gran escala', valSqlBest: 'Datos estructurados', valNosqlBest: 'Datos flexibles',
    h2AcidBase: 'ACID vs BASE', acidP: 'SQL sigue ACID, NoSQL a menudo BASE.',
    h2WhenSql: 'Cuando elegir SQL', sqlUseList: '<ul><li><strong>Datos relacionales</strong></li><li><strong>Consultas complejas</strong></li><li><strong>Transacciones ACID</strong></li></ul>',
    h2WhenNosql: 'Cuando elegir NoSQL', nosqlUseList: '<ul><li><strong>Esquema flexible</strong></li><li><strong>Alto rendimiento de escritura</strong></li><li><strong>Escalabilidad horizontal</strong></li></ul>',
    h2CodeExamples: 'Ejemplos de codigo', h3SqlExample: 'SQL (PostgreSQL)', h3MongoExample: 'NoSQL (MongoDB)', h3RedisExample: 'NoSQL (Redis)',
    h2Scaling: 'Estrategias de escalabilidad', h3SqlScaling: 'SQL', sqlScalingP: 'Principalmente vertical.', h3NosqlScaling: 'NoSQL', nosqlScalingP: 'Disenado para escalabilidad horizontal.',
    h2Migration: 'Patrones de migracion', migrationP: 'Muchas aplicaciones usan ambos.',
    h2PopularDbs: 'Comparacion de DBs populares',
    h2Faq: 'Preguntas frecuentes', faq1Q: 'Se pueden usar juntos?', faq1A: 'Si. Persistencia poliglota.', faq2Q: 'Es NoSQL mas rapido?', faq2A: 'Depende del patron de consulta.', faq3Q: 'Para startups?', faq3A: 'PostgreSQL recomendado.', faq4Q: 'MongoDB en produccion?', faq4A: 'Si, ampliamente usado.', faq5Q: 'NewSQL?', faq5A: 'Combina ACID y escalabilidad horizontal.', faq6Q: 'Mejor para REST API?', faq6A: 'PostgreSQL.',
    relatedTitle: 'Herramientas y guias relacionadas',
  },
};

export default function SqlVsNosqlGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2Overview}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.overviewP1 }} />

      <h2>{s.h2Types}</h2>
      <p>{s.typesIntro}</p>
      <pre><code className="language-text">{`NoSQL Database Types:

1. Document Databases (MongoDB, CouchDB, Firestore)
   - Store data as JSON/BSON documents
   - Flexible schema per document
   - Good for: content management, catalogs, user profiles
   - Example: { "name": "John", "orders": [...], "prefs": {...} }

2. Key-Value Stores (Redis, DynamoDB, Memcached)
   - Simple key → value pairs
   - Fastest reads/writes
   - Good for: caching, sessions, leaderboards, counters
   - Example: "user:123" → "{\\"name\\": \\"John\\"}"

3. Wide-Column Stores (Cassandra, ScyllaDB, HBase)
   - Tables with rows and dynamic columns
   - Optimized for writes and time-series data
   - Good for: IoT, logging, metrics, messaging
   - Example: row_key → {col1: val1, col2: val2, ...}

4. Graph Databases (Neo4j, ArangoDB, Amazon Neptune)
   - Nodes and edges (relationships are first-class)
   - Optimized for traversing relationships
   - Good for: social networks, recommendations, fraud detection
   - Example: (User)-[:FOLLOWS]->(User)`}</code></pre>

      <h2>{s.h2Comparison}</h2>
      <table>
        <thead><tr><th>{s.thAspect}</th><th>{s.thSql}</th><th>{s.thNosql}</th></tr></thead>
        <tbody>
          <tr><td>{s.aspDataModel}</td><td>{s.valSqlModel}</td><td>{s.valNosqlModel}</td></tr>
          <tr><td>{s.aspSchema}</td><td>{s.valSqlSchema}</td><td>{s.valNosqlSchema}</td></tr>
          <tr><td>{s.aspQuery}</td><td>{s.valSqlQuery}</td><td>{s.valNosqlQuery}</td></tr>
          <tr><td>{s.aspScaling}</td><td>{s.valSqlScale}</td><td>{s.valNosqlScale}</td></tr>
          <tr><td>{s.aspAcid}</td><td>{s.valSqlAcid}</td><td>{s.valNosqlAcid}</td></tr>
          <tr><td>{s.aspJoins}</td><td>{s.valSqlJoins}</td><td>{s.valNosqlJoins}</td></tr>
          <tr><td>{s.aspConsistency}</td><td>{s.valSqlConsist}</td><td>{s.valNosqlConsist}</td></tr>
          <tr><td>{s.aspPerformance}</td><td>{s.valSqlPerf}</td><td>{s.valNosqlPerf}</td></tr>
          <tr><td>{s.aspBestFor}</td><td>{s.valSqlBest}</td><td>{s.valNosqlBest}</td></tr>
        </tbody>
      </table>

      <h2>{s.h2AcidBase}</h2>
      <p>{s.acidP}</p>
      <pre><code className="language-text">{`ACID (SQL Databases):
  A - Atomicity:    All operations succeed or all fail (no partial updates)
  C - Consistency:  Data always moves from one valid state to another
  I - Isolation:    Concurrent transactions don't interfere with each other
  D - Durability:   Committed data survives system failures

BASE (Many NoSQL Databases):
  BA - Basically Available:  System guarantees availability (may serve stale data)
  S  - Soft state:           State may change over time (even without input)
  E  - Eventual consistency: System will become consistent eventually

Practical Impact:
  ACID: "Transfer $100 from Account A to Account B"
    → Both debit and credit happen, or neither does
    → No money is lost or created
    → Other transactions see either the before or after state

  BASE: "Update user profile across 3 data centers"
    → All 3 data centers will eventually have the update
    → For a brief period, different data centers may show different data
    → Acceptable for social media posts, not for bank transfers`}</code></pre>

      <h2>{s.h2WhenSql}</h2>
      <div dangerouslySetInnerHTML={{ __html: s.sqlUseList }} />

      <h2>{s.h2WhenNosql}</h2>
      <div dangerouslySetInnerHTML={{ __html: s.nosqlUseList }} />

      <h2>{s.h2CodeExamples}</h2>

      <h3>{s.h3SqlExample}</h3>
      <pre><code className="language-sql">{`-- PostgreSQL: Relational schema with strong typing
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  role        VARCHAR(20) DEFAULT 'user',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title       VARCHAR(300) NOT NULL,
  content     TEXT NOT NULL,
  tags        TEXT[],                    -- PostgreSQL array type
  metadata    JSONB DEFAULT '{}',        -- Flexible JSON column!
  published   BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX idx_posts_metadata ON posts USING GIN(metadata);

-- Complex query: posts with author info and comment count
SELECT
  p.title,
  p.created_at,
  u.name AS author,
  COUNT(c.id) AS comment_count,
  p.metadata->>'views' AS views
FROM posts p
JOIN users u ON p.user_id = u.id
LEFT JOIN comments c ON c.post_id = p.id
WHERE p.published = true
  AND p.tags @> ARRAY['javascript']
GROUP BY p.id, u.name
ORDER BY p.created_at DESC
LIMIT 20;

-- ACID Transaction
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
  INSERT INTO transfers (from_id, to_id, amount) VALUES (1, 2, 100);
COMMIT;`}</code></pre>

      <h3>{s.h3MongoExample}</h3>
      <pre><code className="language-javascript">{`// MongoDB: Document-based, flexible schema
// No schema definition needed — just insert documents

// Insert a user with embedded data
db.users.insertOne({
  name: "Jane Smith",
  email: "jane@example.com",
  role: "admin",
  profile: {
    bio: "Full-stack developer",
    skills: ["TypeScript", "React", "Node.js"],
    social: {
      twitter: "@janesmith",
      github: "janesmith",
    },
  },
  preferences: {
    theme: "dark",
    notifications: true,
  },
  createdAt: new Date(),
});

// Insert posts (embedded or referenced)
db.posts.insertOne({
  userId: ObjectId("user123"),
  title: "Getting Started with MongoDB",
  content: "MongoDB stores data as documents...",
  tags: ["mongodb", "database", "nosql"],
  metadata: { views: 1523, likes: 42 },
  comments: [
    { user: "Bob", text: "Great article!", date: new Date() },
    { user: "Alice", text: "Very helpful", date: new Date() },
  ],
  published: true,
  createdAt: new Date(),
});

// Query with aggregation pipeline
db.posts.aggregate([
  { $match: { published: true, tags: "javascript" } },
  { $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "author"
  }},
  { $unwind: "$author" },
  { $project: {
      title: 1,
      "author.name": 1,
      commentCount: { $size: "$comments" },
      views: "$metadata.views"
  }},
  { $sort: { createdAt: -1 } },
  { $limit: 20 }
]);`}</code></pre>

      <h3>{s.h3RedisExample}</h3>
      <pre><code className="language-bash">{`# Redis: Key-Value store (in-memory, ultra-fast)

# Simple key-value
SET user:123:name "Jane Smith"
GET user:123:name  # → "Jane Smith"

# Hash (object-like)
HSET user:123 name "Jane" email "jane@example.com" role "admin"
HGET user:123 name  # → "Jane"
HGETALL user:123    # → all fields

# List (queue/stack)
LPUSH notifications:user:123 "New follower: Bob"
LPUSH notifications:user:123 "New comment on your post"
LRANGE notifications:user:123 0 9  # Get latest 10

# Set (unique values)
SADD post:456:likes "user:123" "user:456" "user:789"
SCARD post:456:likes  # → 3 (count unique likes)
SISMEMBER post:456:likes "user:123"  # → 1 (true)

# Sorted Set (leaderboard)
ZADD leaderboard 1500 "player:alice"
ZADD leaderboard 2200 "player:bob"
ZADD leaderboard 1800 "player:charlie"
ZREVRANGE leaderboard 0 9 WITHSCORES  # Top 10 players

# TTL (auto-expiring keys — perfect for caching)
SET api:cache:/users "[\\"data\\"]" EX 300  # expires in 5 minutes
TTL api:cache:/users  # → seconds remaining`}</code></pre>

      <h2>{s.h2Scaling}</h2>

      <h3>{s.h3SqlScaling}</h3>
      <p>{s.sqlScalingP}</p>
      <pre><code className="language-text">{`SQL Scaling Strategies:

1. Vertical Scaling (Scale Up)
   ├── More CPU cores
   ├── More RAM (buffer pool)
   ├── Faster SSD (NVMe)
   └── Effective up to ~1TB RAM, 128 cores

2. Read Replicas (Horizontal Read Scaling)
   Primary (writes) → Replica 1 (reads)
                    → Replica 2 (reads)
                    → Replica 3 (reads)

3. Connection Pooling (PgBouncer, ProxySQL)
   App → Pooler → Database (reuse connections)

4. Partitioning (Table-level)
   orders_2024, orders_2025, orders_2026

5. Sharding (Application-level)
   Users A-M → Shard 1
   Users N-Z → Shard 2
   (Complex, usually avoid if possible)

6. Managed Services
   - Supabase, Neon, PlanetScale (auto-scaling)
   - AWS Aurora, Google Cloud SQL`}</code></pre>

      <h3>{s.h3NosqlScaling}</h3>
      <p>{s.nosqlScalingP}</p>
      <pre><code className="language-text">{`NoSQL Scaling (Built-in Horizontal):

MongoDB (Sharding):
  Config Servers (metadata)
  ├── Shard 1: users with _id A-F
  ├── Shard 2: users with _id G-M
  ├── Shard 3: users with _id N-S
  └── Shard 4: users with _id T-Z
  Mongos Router → routes queries to correct shard

Redis (Cluster Mode):
  ├── Node 1: hash slots 0-5460
  ├── Node 2: hash slots 5461-10922
  └── Node 3: hash slots 10923-16383
  Each node has a replica for failover

Cassandra (Ring Architecture):
  ├── Node A: token range 0-25%
  ├── Node B: token range 25-50%
  ├── Node C: token range 50-75%
  └── Node D: token range 75-100%
  Replication factor: 3 (each row on 3 nodes)
  Add nodes → data automatically rebalances`}</code></pre>

      <h2>{s.h2PopularDbs}</h2>
      <pre><code className="language-text">{`Database          Type          Best For                         License
---------------------------------------------------------------------------
PostgreSQL        SQL           General purpose, JSONB, analytics  PostgreSQL (OSS)
MySQL             SQL           Web applications, WordPress        GPL / Commercial
SQLite            SQL           Embedded, mobile, serverless       Public Domain
MariaDB           SQL           MySQL drop-in replacement          GPL

MongoDB           Document      Flexible schema, content mgmt      SSPL
Redis             Key-Value     Caching, sessions, real-time       BSD (+ commercial)
DynamoDB          Key-Value     AWS serverless, auto-scaling       Proprietary
Cassandra         Wide-Column   Time-series, IoT, high write       Apache 2.0
Neo4j             Graph         Social networks, recommendations   GPL / Commercial
Elasticsearch     Search        Full-text search, logs, analytics  SSPL / Apache 2.0

CockroachDB       NewSQL        Global SQL, horizontal scale       BSL / Commercial
PlanetScale       NewSQL        Serverless MySQL (Vitess-based)    Proprietary
TiDB              NewSQL        HTAP, MySQL compatible             Apache 2.0
Supabase          SQL (PG)      Firebase alternative, PostgreSQL   Apache 2.0`}</code></pre>

      <h2>{s.h2Migration}</h2>
      <p>{s.migrationP}</p>
      <pre><code className="language-text">{`Polyglot Persistence Architecture:

                    ┌─────────────────────┐
                    │   Application Layer  │
                    └─────────┬───────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
  ┌───────▼───────┐  ┌───────▼───────┐  ┌───────▼───────┐
  │  PostgreSQL   │  │    Redis      │  │   MongoDB     │
  │               │  │               │  │               │
  │ - Users       │  │ - Sessions    │  │ - CMS content │
  │ - Orders      │  │ - Cache       │  │ - Product     │
  │ - Payments    │  │ - Rate limits │  │   catalogs    │
  │ - Inventory   │  │ - Leaderboard │  │ - User prefs  │
  │ - Reports     │  │ - Pub/Sub     │  │ - Event logs  │
  └───────────────┘  └───────────────┘  └───────────────┘
     Transactions       Performance        Flexibility

Use each database for what it does best.`}</code></pre>

      <h2>{s.h2Faq}</h2>

      <h3>{s.faq1Q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1A }} />

      <h3>{s.faq2Q}</h3>
      <p>{s.faq2A}</p>

      <h3>{s.faq3Q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3A }} />

      <h3>{s.faq4Q}</h3>
      <p>{s.faq4A}</p>

      <h3>{s.faq5Q}</h3>
      <p>{s.faq5A}</p>

      <h3>{s.faq6Q}</h3>
      <p>{s.faq6A}</p>

      <h2>{s.relatedTitle}</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format MongoDB documents and API responses</li>
        <li><Link href={`/${lang}/tools/sql-formatter`}>SQL Formatter</Link> - Format and beautify SQL queries</li>
        <li><Link href={`/${lang}/tools/csv-json`}>CSV to JSON Converter</Link> - Convert between data formats</li>
        <li><Link href={`/${lang}/blog/sql-joins-explained-visual-guide`}>SQL Joins Visual Guide</Link></li>
        <li><Link href={`/${lang}/blog/mongodb-vs-postgresql`}>MongoDB vs PostgreSQL Detailed Comparison</Link></li>
        <li><Link href={`/${lang}/blog/prisma-schema-relations-guide`}>Prisma Schema Relations Guide</Link></li>
        <li><Link href={`/${lang}/blog/rest-api-design-guide`}>REST API Design Guide</Link></li>
      </ul>
    </>
  );
}
