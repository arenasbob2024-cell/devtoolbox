'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'TimescaleDB vs InfluxDB: Time-Series Database Comparison',
    intro: 'TimescaleDB and InfluxDB are both popular time-series databases, but with fundamentally different approaches. TimescaleDB extends PostgreSQL with time-series capabilities, while InfluxDB is a purpose-built time-series database. This comparison examines their architecture, query languages, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose TimescaleDB if you want SQL familiarity, PostgreSQL ecosystem, and need relational joins. Choose InfluxDB for high-cardinality time-series workloads, native time-series optimizations, and simpler deployment. TimescaleDB offers full SQL; InfluxDB offers Flux and InfluxQL with time-series specific functions.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'TimescaleDB is PostgreSQL extension; InfluxDB is standalone TSDB',
    takeaway2: 'TimescaleDB uses SQL; InfluxDB uses Flux and InfluxQL',
    takeaway3: 'InfluxDB excels at high-cardinality metrics',
    takeaway4: 'TimescaleDB supports JOINs and relational data',
    takeaway5: 'Both offer excellent compression and partitioning',
    takeaway6: 'TimescaleDB has mature PostgreSQL tooling ecosystem',
    
    whatIsTimescaledbTitle: 'What is TimescaleDB?',
    whatIsTimescaledbContent: 'TimescaleDB is an open-source time-series database built as a PostgreSQL extension. Released in 2017, it transforms PostgreSQL into a high-performance time-series database while maintaining full SQL compatibility. It uses hypertables (automatically partitioned tables) and provides continuous aggregates and native compression.',
    
    whatIsInfluxdbTitle: 'What is InfluxDB?',
    whatIsInfluxdbContent: 'InfluxDB is a purpose-built time-series database developed by InfluxData. First released in 2013, it is optimized for time-series workloads with a custom storage engine (TSM), native data compression, and specialized query languages (InfluxQL and Flux). InfluxDB excels at metrics, IoT data, and real-time analytics.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks and performance characteristics:',
    
    featuresTitle: 'Architecture & Features',
    featuresIntro: 'Technical architecture comparison:',
    
    codeExampleTitle: 'Query Examples',
    codeExampleIntro: 'SQL vs Flux query comparison:',
    
    timescaledbExampleTitle: 'TimescaleDB (SQL) Queries',
    influxdbExampleTitle: 'InfluxDB (Flux) Queries',
    
    dataSourceTitle: 'Data Model & Schema',
    dataSourceIntro: 'Data model and schema design:',
    
    alertingTitle: 'Ecosystem & Integration',
    alertingIntro: 'Ecosystem tools and integrations:',
    
    useCasesTitle: 'Best Use Cases',
    timescaledbBestFor: 'TimescaleDB is Best For:',
    influxdbBestFor: 'InfluxDB is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'TimescaleDB and InfluxDB serve overlapping but distinct use cases. TimescaleDB is ideal for teams wanting SQL familiarity, needing relational joins, or already invested in PostgreSQL. InfluxDB excels for high-cardinality metrics, pure time-series workloads, and teams preferring purpose-built tooling. Many organizations use both: TimescaleDB for complex analytical workloads and InfluxDB for high-throughput metrics collection.',
    
    faq1q: 'Can TimescaleDB handle high-cardinality data?',
    faq1a: 'Yes, TimescaleDB handles high-cardinality well but InfluxDB traditionally excels here. Recent TimescaleDB versions have improved multi-node support for high-cardinality. For extreme cardinality (millions of unique time series), InfluxDB may have advantages with its specialized storage engine.',
    
    faq2q: 'Which is easier to learn?',
    faq2a: 'TimescaleDB is easier if you know SQL. InfluxQL (SQL-like) is also approachable, but Flux has a steeper learning curve. For teams with SQL experience, TimescaleDB offers the smoothest learning curve. InfluxDB requires learning time-series specific concepts and query patterns.',
    
    faq3q: 'How do they compare for IoT workloads?',
    faq3a: 'Both excel at IoT. InfluxDB has native Telegraf integration for data collection and excellent edge deployment options. TimescaleDB offers more complex analytics through SQL JOINs and PostgreSQL extensions like PostGIS for geospatial IoT data. Choose based on query complexity needs.',
    
    faq4q: 'What about cloud and managed services?',
    faq4a: 'InfluxDB Cloud (serverless) offers generous free tier and multi-cloud deployment. Timescale offers Timescale Cloud on AWS and Azure. Both have managed Kubernetes operators. InfluxDB Cloud has more flexible pricing for variable workloads; Timescale Cloud offers more PostgreSQL-like management.',
    
    faq5q: 'Can I use Grafana with both?',
    faq5a: 'Yes, both integrate excellently with Grafana. TimescaleDB uses PostgreSQL data source plugin. InfluxDB has native Grafana support with both InfluxQL and Flux query modes. Both support Prometheus remote write protocol for seamless observability stack integration.',
    
    faq6q: 'How does compression compare?',
    faq6a: 'Both offer excellent compression (10-20x). InfluxDB uses Gorilla-style compression optimized for floating-point metrics. TimescaleDB uses columnar compression with zstd/zlib. TimescaleDB compression is more flexible; InfluxDB is more automatic. Both achieve similar compression ratios in practice.',
    
    faq7q: 'What about multi-node clustering?',
    faq7a: 'InfluxDB Enterprise and InfluxDB Cloud support multi-node clustering. TimescaleDB multi-node is available but newer. For large-scale distributed deployments, InfluxDB currently has more mature multi-node capabilities. TimescaleDB relies on PostgreSQL replication for HA.',
    
    faq8q: 'Which has better retention policies?',
    faq8a: 'Both support flexible retention policies. TimescaleDB uses drop_chunks policies and continuous aggregates for downsampling. InfluxDB has retention policies and tasks for downsampling. TimescaleDB retention integrates with PostgreSQL jobs; InfluxDB has built-in task scheduler. Both handle retention well.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'TimescaleDB vs InfluxDB：时序数据库对比',
    intro: 'TimescaleDB 和 InfluxDB 都是流行的时序数据库，但采用根本不同的方法。TimescaleDB 通过时序功能扩展 PostgreSQL，而 InfluxDB 是专门构建的时序数据库。本比较考察它们的架构、查询语言和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '如果你想要 SQL 熟悉度、PostgreSQL 生态系统并需要关系连接，选择 TimescaleDB。为高基数时序工作负载、原生时序优化和更简单部署选择 InfluxDB。TimescaleDB 提供完整 SQL；InfluxDB 提供 Flux 和 InfluxQL 以及时序特定函数。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'TimescaleDB 是 PostgreSQL 扩展；InfluxDB 是独立时序数据库',
    takeaway2: 'TimescaleDB 使用 SQL；InfluxDB 使用 Flux 和 InfluxQL',
    takeaway3: 'InfluxDB 在高基数指标方面表现出色',
    takeaway4: 'TimescaleDB 支持 JOIN 和关系数据',
    takeaway5: '两者都提供优秀的压缩和分区',
    takeaway6: 'TimescaleDB 拥有成熟的 PostgreSQL 工具生态系统',
    
    whatIsTimescaledbTitle: '什么是 TimescaleDB？',
    whatIsTimescaledbContent: 'TimescaleDB 是一个作为 PostgreSQL 扩展构建的开源时序数据库。2017 年发布，它将 PostgreSQL 转变为高性能时序数据库，同时保持完整的 SQL 兼容性。它使用超级表（自动分区表）并提供连续聚合和原生压缩。',
    
    whatIsInfluxdbTitle: '什么是 InfluxDB？',
    whatIsInfluxdbContent: 'InfluxDB 是由 InfluxData 开发的专门构建的时序数据库。2013 年首次发布，它通过自定义存储引擎（TSM）、原生数据压缩和专用查询语言（InfluxQL 和 Flux）针对时序工作负载进行优化。InfluxDB 在指标、IoT 数据和实时分析方面表现出色。',
    
    performanceTitle: '性能对比',
    performanceIntro: '基准测试和性能特征：',
    
    featuresTitle: '架构与功能',
    featuresIntro: '技术架构比较：',
    
    codeExampleTitle: '查询示例',
    codeExampleIntro: 'SQL vs Flux 查询比较：',
    
    timescaledbExampleTitle: 'TimescaleDB (SQL) 查询',
    influxdbExampleTitle: 'InfluxDB (Flux) 查询',
    
    dataSourceTitle: '数据模型与模式',
    dataSourceIntro: '数据模型和模式设计：',
    
    alertingTitle: '生态系统与集成',
    alertingIntro: '生态工具和集成：',
    
    useCasesTitle: '最佳用例',
    timescaledbBestFor: 'TimescaleDB 最适合：',
    influxdbBestFor: 'InfluxDB 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'TimescaleDB 和 InfluxDB 服务于重叠但不同的用例。TimescaleDB 非常适合想要 SQL 熟悉度、需要关系连接或已经投入 PostgreSQL 的团队。InfluxDB 在高基数指标、纯时序工作负载和喜欢专用工具的团队方面表现出色。许多组织同时使用两者：TimescaleDB 用于复杂分析工作负载，InfluxDB 用于高吞吐量指标收集。',
    
    faq1q: 'TimescaleDB 能处理高基数数据吗？',
    faq1a: '是的，TimescaleDB 能很好地处理高基数，但 InfluxDB 传统上在这方面表现出色。最近的 TimescaleDB 版本改进了高基数的多节点支持。对于极端基数（数百万个唯一时间序列），InfluxDB 可能凭借其专用存储引擎具有优势。',
    
    faq2q: '哪个更容易学习？',
    faq2a: '如果你了解 SQL，TimescaleDB 更容易。InfluxQL（类 SQL）也很容易上手，但 Flux 学习曲线更陡峭。对于有 SQL 经验的团队，TimescaleDB 提供最平滑的学习曲线。InfluxDB 需要学习时序特定概念和查询模式。',
    
    faq3q: '它们在 IoT 工作负载方面如何比较？',
    faq3a: '两者都在 IoT 方面表现出色。InfluxDB 具有原生 Telegraf 集成用于数据收集和优秀的边缘部署选项。TimescaleDB 通过 SQL JOIN 和 PostgreSQL 扩展（如 PostGIS 用于地理空间 IoT 数据）提供更复杂的分析。根据查询复杂度需求选择。',
    
    faq4q: '云和托管服务怎么样？',
    faq4a: 'InfluxDB Cloud（无服务器）提供慷慨的免费层和多云部署。Timescale 在 AWS 和 Azure 上提供 Timescale Cloud。两者都有托管 Kubernetes 操作符。InfluxDB Cloud 对可变工作负载有更灵活的定价；Timescale Cloud 提供更多类似 PostgreSQL 的管理。',
    
    faq5q: '我可以在 Grafana 中使用两者吗？',
    faq5a: '是的，两者都与 Grafana 优秀集成。TimescaleDB 使用 PostgreSQL 数据源插件。InfluxDB 原生支持 Grafana，支持 InfluxQL 和 Flux 查询模式。两者都支持 Prometheus 远程写入协议，用于无缝可观察性堆栈集成。',
    
    faq6q: '压缩如何比较？',
    faq6a: '两者都提供优秀的压缩（10-20 倍）。InfluxDB 使用针对浮点指标优化的 Gorilla 风格压缩。TimescaleDB 使用带有 zstd/zlib 的列式压缩。TimescaleDB 压缩更灵活；InfluxDB 更自动。在实践中两者实现类似的压缩比。',
    
    faq7q: '多节点集群怎么样？',
    faq7a: 'InfluxDB Enterprise 和 InfluxDB Cloud 支持多节点集群。TimescaleDB 多节点可用但较新。对于大规模分布式部署，InfluxDB 目前具有更成熟的多节点能力。TimescaleDB 依赖 PostgreSQL 复制实现 HA。',
    
    faq8q: '哪个有更好的保留策略？',
    faq8a: '两者都支持灵活的保留策略。TimescaleDB 使用 drop_chunks 策略和连续聚合进行降采样。InfluxDB 有保留策略和任务用于降采样。TimescaleDB 保留与 PostgreSQL 作业集成；InfluxDB 有内置任务调度器。两者都能很好地处理保留。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TimescaledbVsInfluxdb({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsTimescaledbTitle}</h3>
      <p style={pStyle}>{ct.whatIsTimescaledbContent}</p>

      <h3 style={h3Style}>{ct.whatIsInfluxdbTitle}</h3>
      <p style={pStyle}>{ct.whatIsInfluxdbContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>TimescaleDB</th>
              <th style={thStyle}>InfluxDB</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '写入吞吐量' : 'Write Throughput', '100K+ rows/sec', '500K+ points/sec'],
              [isZh ? '查询延迟' : 'Query Latency', isZh ? '优秀（SQL 优化）' : 'Excellent (SQL optimized)', isZh ? '优秀（原生 TS）' : 'Excellent (native TS)'],
              [isZh ? '压缩比' : 'Compression', '10-20x', '10-20x'],
              [isZh ? '高基数支持' : 'High Cardinality', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '多节点' : 'Multi-node', isZh ? '可用（较新）' : 'Available (newer)', isZh ? '成熟' : 'Mature'],
              [isZh ? '内存使用' : 'Memory Usage', isZh ? '中等（PostgreSQL）' : 'Moderate (PostgreSQL)', isZh ? '低（专用）' : 'Low (purpose-built)'],
            ].map(([feature, timescaledb, influxdb], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{timescaledb}</td>
                <td style={tdStyle}>{influxdb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>TimescaleDB</th>
              <th style={thStyle}>InfluxDB</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '查询语言' : 'Query Language', 'SQL', 'Flux, InfluxQL'],
              [isZh ? '存储引擎' : 'Storage Engine', isZh ? 'PostgreSQL + 分区' : 'PostgreSQL + partitioning', 'TSM (Time-Structured Merge)'],
              [isZh ? '分区' : 'Partitioning', isZh ? '自动（超级表）' : 'Automatic (hypertables)', isZh ? '自动（分片）' : 'Automatic (sharding)'],
              [isZh ? '连续聚合' : 'Continuous Aggregates', isZh ? '原生支持' : 'Native support', isZh ? '通过任务' : 'Via tasks'],
              [isZh ? '关系 JOIN' : 'Relational JOINs', isZh ? '完整支持' : 'Full support', isZh ? '有限' : 'Limited'],
              [isZh ? '压缩' : 'Compression', isZh ? '列式压缩' : 'Columnar compression', 'Gorilla-style'],
              [isZh ? '保留策略' : 'Retention', 'drop_chunks', isZh ? '保留策略' : 'Retention policies'],
              [isZh ? '复制' : 'Replication', isZh ? 'PostgreSQL 流复制' : 'PostgreSQL streaming', isZh ? '内置复制' : 'Built-in replication'],
            ].map(([cap, timescaledb, influxdb], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{timescaledb}</td>
                <td style={tdStyle}>{influxdb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f46800' }}>{ct.timescaledbExampleTitle}</h3>
      <pre style={codeStyle}><code>{`-- TimescaleDB: Create hypertable
CREATE TABLE sensor_data (
    time        TIMESTAMPTZ NOT NULL,
    sensor_id   INTEGER,
    temperature DOUBLE PRECISION,
    humidity    DOUBLE PRECISION,
    location    TEXT
);

SELECT create_hypertable('sensor_data', 'time',
    chunk_time_interval => INTERVAL '1 day');

-- Insert data
INSERT INTO sensor_data (time, sensor_id, temperature, humidity, location)
VALUES
    (NOW(), 1, 23.5, 65.2, 'room-a'),
    (NOW() - INTERVAL '1 hour', 1, 22.8, 64.1, 'room-a');

-- Query with time buckets (similar to GROUP BY time)
SELECT
    time_bucket('5 minutes', time) AS bucket,
    sensor_id,
    AVG(temperature) AS avg_temp,
    MAX(temperature) AS max_temp,
    MIN(temperature) AS min_temp
FROM sensor_data
WHERE time > NOW() - INTERVAL '1 day'
GROUP BY bucket, sensor_id
ORDER BY bucket DESC;

-- Continuous aggregate (materialized view)
CREATE MATERIALIZED VIEW sensor_hourly
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', time) AS bucket,
    sensor_id,
    AVG(temperature) AS avg_temp,
    COUNT(*) AS readings
FROM sensor_data
GROUP BY bucket, sensor_id;

-- Join with relational data
SELECT s.sensor_id, s.avg_temp, l.building, l.floor
FROM sensor_hourly s
JOIN sensors l ON s.sensor_id = l.id
WHERE s.bucket > NOW() - INTERVAL '7 days';

-- Retention policy
SELECT add_retention_policy('sensor_data', INTERVAL '30 days');`}</code></pre>

      <h3 style={{ ...h3Style, color: '#00bfb3' }}>{ct.influxdbExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// InfluxDB Flux Query
from(bucket: "sensor_data")
  |> range(start: -1d)
  |> filter(fn: (r) => r._measurement == "temperature")
  |> filter(fn: (r) => r.sensor_id == "1")
  |> aggregateWindow(every: 5m, fn: mean)
  |> yield(name: "avg_temp")

// More complex Flux query with multiple aggregations
from(bucket: "sensor_data")
  |> range(start: -7d)
  |> filter(fn: (r) => r._measurement == "temperature")
  |> group(columns: ["sensor_id"])
  |> aggregateWindow(every: 1h, fn: mean)
  |> toFloat()
  |> derivative(unit: 1h, nonNegative: false)
  |> yield(name: "temperature_change")

// Flux query with math operations
from(bucket: "sensor_data")
  |> range(start: -24h)
  |> filter(fn: (r) => r._field == "temperature")
  |> map(fn: (r) => ({
      r with
      fahrenheit: r._value * 9.0 / 5.0 + 32.0
    }))
  |> yield(name: "fahrenheit")

// Flux task for downsampling
option task = {
  name: "downsample-5m",
  every: 5m,
}

from(bucket: "sensor_data")
  |> range(start: -task.every)
  |> filter(fn: (r) => r._measurement == "temperature")
  |> aggregateWindow(every: 5m, fn: mean)
  |> to(bucket: "sensor_data_downsampled")

// InfluxQL (SQL-like) query
SELECT MEAN(temperature) AS avg_temp,
       MAX(temperature) AS max_temp,
       MIN(temperature) AS min_temp
FROM sensor_data
WHERE time > now() - 1d
GROUP BY time(5m), sensor_id
ORDER BY time DESC`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>TimescaleDB</th>
              <th style={thStyle}>InfluxDB</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据模型' : 'Data Model', isZh ? '关系表 + 时间分区' : 'Relational tables + time partitions', isZh ? '度量、标签、字段' : 'Measurements, tags, fields'],
              [isZh ? '模式' : 'Schema', isZh ? '强类型、SQL DDL' : 'Strong typing, SQL DDL', isZh ? '灵活、无模式写入' : 'Flexible, schemaless writes'],
              [isZh ? '时间列' : 'Time Column', 'TIMESTAMPTZ', isZh ? '内置时间戳' : 'Built-in timestamp'],
              [isZh ? '索引' : 'Indexing', 'B-tree, GIN, BRIN', isZh ? '标签索引' : 'Tag indexes'],
              [isZh ? '约束' : 'Constraints', isZh ? '主键、外键、唯一' : 'Primary, foreign, unique', isZh ? '无' : 'None'],
              [isZh ? '数据类型' : 'Data Types', isZh ? '丰富（PostgreSQL）' : 'Rich (PostgreSQL)', 'float, int, string, bool'],
            ].map(([cat, timescaledb, influxdb], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{timescaledb}</td>
                <td style={tdStyle}>{influxdb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f46800' }}>
          <strong style={{ color: '#f46800' }}>TimescaleDB Ecosystem</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '完整 PostgreSQL 生态系统（PostGIS、pg_partman、pg_stat_statements），任何 PostgreSQL 工具兼容，Prometheus 远程写入支持，Grafana PostgreSQL 数据源，成熟备份工具（pg_dump、WAL 归档）。' : 'Full PostgreSQL ecosystem (PostGIS, pg_partman, pg_stat_statements), any PostgreSQL tool compatible, Prometheus remote write support, Grafana PostgreSQL datasource, mature backup tools (pg_dump, WAL archiving).'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #00bfb3' }}>
          <strong style={{ color: '#00bfb3' }}>InfluxDB Ecosystem</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Telegraf（数据收集）、Chronograf（可视化）、Kapacitor（告警），Prometheus 远程写入支持，原生 Grafana 集成，InfluxDB Cloud（托管服务），边缘部署支持。' : 'Telegraf (data collection), Chronograf (visualization), Kapacitor (alerting), Prometheus remote write support, native Grafana integration, InfluxDB Cloud (managed service), edge deployment support.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>{ct.timescaledbBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂分析查询' : 'Complex analytical queries'}</li>
            <li>{isZh ? '需要关系连接' : 'Need for relational joins'}</li>
            <li>{isZh ? 'PostgreSQL 投资的团队' : 'Teams invested in PostgreSQL'}</li>
            <li>{isZh ? '金融和事件数据' : 'Financial and event data'}</li>
            <li>{isZh ? '地理空间 + 时序' : 'Geospatial + time-series'}</li>
            <li>{isZh ? 'SQL 专家团队' : 'SQL-proficient teams'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00bfb3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00bfb3' }}>{ct.influxdbBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高基数指标' : 'High-cardinality metrics'}</li>
            <li>{isZh ? 'DevOps 和监控' : 'DevOps and monitoring'}</li>
            <li>{isZh ? 'IoT 传感器数据' : 'IoT sensor data'}</li>
            <li>{isZh ? '实时分析' : 'Real-time analytics'}</li>
            <li>{isZh ? '边缘计算' : 'Edge computing'}</li>
            <li>{isZh ? '简单时序工作负载' : 'Simple time-series workloads'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
