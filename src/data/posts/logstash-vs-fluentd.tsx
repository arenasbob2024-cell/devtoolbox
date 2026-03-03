'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Logstash vs Fluentd: Log Processing Pipeline Comparison',
    intro: 'Logstash and Fluentd are two of the most popular open-source log processing and data collection tools. Both are part of larger ecosystems (ELK Stack and EFK Stack respectively) and offer powerful capabilities for ingesting, transforming, and shipping logs. This comparison examines their architecture, performance, and use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Logstash offers more built-in plugins and easier configuration for complex transformations, making it ideal for teams invested in the Elastic ecosystem. Fluentd provides better performance, lower memory footprint, and more flexibility with its Ruby-based plugin system. Choose Logstash for Elastic Stack integration, Fluentd for Kubernetes and cloud-native environments.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Logstash has 200+ built-in plugins; Fluentd has 1000+ community plugins',
    takeaway2: 'Fluentd uses significantly less memory (40-60MB vs 500MB+ for Logstash)',
    takeaway3: 'Logstash configuration is more readable for complex pipelines',
    takeaway4: 'Fluentd is the CNCF graduated project, better for Kubernetes',
    takeaway5: 'Both support similar input/output sources and filter capabilities',
    takeaway6: 'Fluent Bit is a lightweight alternative for edge/agent use cases',
    
    whatIsLogstashTitle: 'What is Logstash?',
    whatIsLogstashContent: 'Logstash is an open-source server-side data processing pipeline from Elastic. Originally released in 2009, it ingests data from multiple sources, transforms it, and sends it to various destinations. Logstash is a core component of the ELK Stack (Elasticsearch, Logstash, Kibana) and is written in JRuby.',
    
    whatIsFluentdTitle: 'What is Fluentd?',
    whatIsFluentdContent: 'Fluentd is an open-source data collector for unified logging layers. Created in 2011 by Treasure Data and donated to the CNCF, it became a CNCF graduated project in 2019. Fluentd is written in Ruby and C, focusing on flexibility, performance, and reliability in log collection and routing.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmark comparison under typical production loads:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing core capabilities and architecture:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Pipeline configuration for both tools:',
    
    logstashExampleTitle: 'Logstash Pipeline Config',
    fluentdExampleTitle: 'Fluentd Config',
    
    architectureTitle: 'Architecture Differences',
    architectureIntro: 'How each tool processes data:',
    
    pluginTitle: 'Plugin Ecosystem',
    pluginIntro: 'Available plugins and extensions:',
    
    useCasesTitle: 'Best Use Cases',
    logstashBestFor: 'Logstash is Best For:',
    fluentdBestFor: 'Fluentd is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Both Logstash and Fluentd are mature, production-ready log processing solutions. Logstash excels in Elastic Stack environments with its rich plugin ecosystem and powerful Grok patterns. Fluentd shines in cloud-native and Kubernetes deployments with its lower resource footprint and CNCF backing. For new projects, consider your ecosystem: choose Logstash for Elastic, Fluentd for Kubernetes and multi-destination routing. Many organizations use Fluentd/Fluent Bit as collectors and Logstash for heavy processing.',
    
    faq1q: 'Can I use Logstash and Fluentd together?',
    faq1a: 'Yes, this is a common pattern. Use Fluentd or Fluent Bit as lightweight log collectors on each node, forwarding to a centralized Logstash for heavy processing and enrichment before sending to Elasticsearch or other destinations.',
    
    faq2q: 'What is Fluent Bit and how does it relate to Fluentd?',
    faq2a: 'Fluent Bit is a lightweight log processor and forwarder written in C. It uses the same plugin architecture as Fluentd but with much lower memory footprint (~5MB). It is ideal for edge collection, IoT devices, and as a DaemonSet in Kubernetes.',
    
    faq3q: 'Which has better Kubernetes integration?',
    faq3a: 'Fluentd and Fluent Bit have superior Kubernetes integration with built-in metadata enrichment, DaemonSet support, and CNCF ecosystem alignment. Logstash requires more configuration for Kubernetes but works well with the Elastic Kubernetes integration.',
    
    faq4q: 'How do they handle backpressure?',
    faq4a: 'Both support buffering to handle backpressure. Logstash uses persistent queues (disk-based) for at-least-once delivery. Fluentd offers memory and file-based buffering with configurable retry policies and exponential backoff.',
    
    faq5q: 'What about Grok patterns in Fluentd?',
    faq5a: 'Fluentd supports Grok-like parsing through the grok-parser plugin. While not as extensive as Logstash patterns, you can import Logstash patterns or define custom ones. For complex parsing, many teams forward to Logstash.',
    
    faq6q: 'Which is easier to configure?',
    faq6a: 'Logstash configuration is generally more readable with its clear input-filter-output structure. Fluentd uses a directive-based syntax that can become verbose. However, Fluentd offers more flexibility with Ruby-based custom plugins.',
    
    faq7q: 'How do they compare for high-throughput scenarios?',
    faq7a: 'Fluentd generally handles high throughput better with lower memory usage. For extreme throughput (millions of events/second), consider using Fluent Bit for collection and multiple Fluentd instances with load balancing.',
    
    faq8q: 'Can I run these on Windows?',
    faq8a: 'Both support Windows. Logstash runs on JRuby with full Windows support. Fluentd has a Windows-specific version (td-agent) with most plugins supported. Fluent Bit also has native Windows support.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Logstash vs Fluentd：日志处理管道对比',
    intro: 'Logstash和Fluentd是最受欢迎的两个开源日志处理和数据收集工具。两者都是更大生态系统（ELK Stack和EFK Stack）的一部分，提供强大的日志摄取、转换和传输能力。本比较考察它们的架构、性能和用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Logstash提供更多内置插件和更简单的复杂转换配置，非常适合投入Elastic生态系统的团队。Fluentd提供更好的性能、更低的内存占用和更灵活的基于Ruby的插件系统。为Elastic Stack集成选择Logstash，为Kubernetes和云原生环境选择Fluentd。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Logstash有200+内置插件；Fluentd有1000+社区插件',
    takeaway2: 'Fluentd使用显著更少的内存（40-60MB vs Logstash的500MB+）',
    takeaway3: 'Logstash配置对于复杂管道更易读',
    takeaway4: 'Fluentd是CNCF毕业项目，更适合Kubernetes',
    takeaway5: '两者支持类似的输入/输出源和过滤能力',
    takeaway6: 'Fluent Bit是用于边缘/代理用例的轻量级替代方案',
    
    whatIsLogstashTitle: '什么是Logstash？',
    whatIsLogstashContent: 'Logstash是Elastic的开源服务器端数据处理管道。最初于2009年发布，它从多个来源摄取数据，转换数据，并发送到各种目的地。Logstash是ELK Stack（Elasticsearch、Logstash、Kibana）的核心组件，用JRuby编写。',
    
    whatIsFluentdTitle: '什么是Fluentd？',
    whatIsFluentdContent: 'Fluentd是用于统一日志层的开源数据收集器。由Treasure Data于2011年创建并捐赠给CNCF，于2019年成为CNCF毕业项目。Fluentd用Ruby和C编写，专注于日志收集和路由的灵活性、性能和可靠性。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在典型生产负载下的基准比较：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较核心功能和架构：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '两个工具的管道配置：',
    
    logstashExampleTitle: 'Logstash管道配置',
    fluentdExampleTitle: 'Fluentd配置',
    
    architectureTitle: '架构差异',
    architectureIntro: '每个工具如何处理数据：',
    
    pluginTitle: '插件生态系统',
    pluginIntro: '可用的插件和扩展：',
    
    useCasesTitle: '最佳用例',
    logstashBestFor: 'Logstash最适合：',
    fluentdBestFor: 'Fluentd最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Logstash和Fluentd都是成熟的、生产就绪的日志处理解决方案。Logstash在Elastic Stack环境中表现出色，拥有丰富的插件生态系统和强大的Grok模式。Fluentd在云原生和Kubernetes部署中表现优异，具有更低的资源占用和CNCF支持。对于新项目，考虑你的生态系统：为Elastic选择Logstash，为Kubernetes和多目的地路由选择Fluentd。许多组织使用Fluentd/Fluent Bit作为收集器，使用Logstash进行重度处理。',
    
    faq1q: '我可以同时使用Logstash和Fluentd吗？',
    faq1a: '是的，这是一个常见的模式。在每个节点上使用Fluentd或Fluent Bit作为轻量级日志收集器，转发到集中的Logstash进行重度处理和丰富，然后发送到Elasticsearch或其他目的地。',
    
    faq2q: '什么是Fluent Bit，它与Fluentd有什么关系？',
    faq2a: 'Fluent Bit是用C编写的轻量级日志处理器和转发器。它使用与Fluentd相同的插件架构，但内存占用更低（约5MB）。它非常适合边缘收集、IoT设备和作为Kubernetes中的DaemonSet。',
    
    faq3q: '哪个有更好的Kubernetes集成？',
    faq3a: 'Fluentd和Fluent Bit有卓越的Kubernetes集成，具有内置的元数据丰富、DaemonSet支持和CNCF生态系统对齐。Logstash需要更多配置用于Kubernetes，但与Elastic Kubernetes集成良好。',
    
    faq4q: '它们如何处理背压？',
    faq4a: '两者都支持缓冲来处理背压。Logstash使用持久队列（基于磁盘）实现至少一次交付。Fluentd提供内存和基于文件的缓冲，具有可配置的重试策略和指数退避。',
    
    faq5q: 'Fluentd中的Grok模式怎么样？',
    faq5a: 'Fluentd通过grok-parser插件支持类似Grok的解析。虽然不如Logstash模式广泛，但你可以导入Logstash模式或定义自定义模式。对于复杂解析，许多团队转发到Logstash。',
    
    faq6q: '哪个更容易配置？',
    faq6a: 'Logstash配置通常更易读，有清晰的输入-过滤-输出结构。Fluentd使用基于指令的语法，可能变得冗长。但是，Fluentd通过基于Ruby的自定义插件提供更多灵活性。',
    
    faq7q: '它们在高吞吐量场景中如何比较？',
    faq7a: 'Fluentd通常以更低的内存使用更好地处理高吞吐量。对于极端吞吐量（每秒数百万事件），考虑使用Fluent Bit进行收集和具有负载均衡的多个Fluentd实例。',
    
    faq8q: '我可以在Windows上运行这些吗？',
    faq8a: '两者都支持Windows。Logstash在JRuby上运行，完全支持Windows。Fluentd有Windows特定版本（td-agent），支持大多数插件。Fluent Bit也有原生Windows支持。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function LogstashVsFluentd({ lang }: { lang: string }) {
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

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
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

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsLogstashTitle}</h3>
      <p style={pStyle}>{ct.whatIsLogstashContent}</p>

      <h3 style={h3Style}>{ct.whatIsFluentdTitle}</h3>
      <p style={pStyle}>{ct.whatIsFluentdContent}</p>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Logstash</th>
              <th style={thStyle}>Fluentd</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '内存占用' : 'Memory Usage', '500MB - 1GB+', '40-60MB'],
              [isZh ? 'CPU使用率' : 'CPU Usage', isZh ? '中等' : 'Medium', isZh ? '低' : 'Low'],
              [isZh ? '吞吐量' : 'Throughput', '10K-50K events/s', '20K-100K events/s'],
              [isZh ? '启动时间' : 'Startup Time', '10-30 seconds', '1-3 seconds'],
              [isZh ? '延迟' : 'Latency', isZh ? '较高（批处理）' : 'Higher (batching)', isZh ? '较低' : 'Lower'],
              [isZh ? '资源需求' : 'Resource Needs', isZh ? '高' : 'High', isZh ? '低' : 'Low'],
            ].map(([metric, logstash, fluentd], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{logstash}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{fluentd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Logstash</th>
              <th style={thStyle}>Fluentd</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '开发语言' : 'Language', 'JRuby', 'Ruby + C'],
              [isZh ? '内置插件' : 'Built-in Plugins', '200+', '100+'],
              [isZh ? '社区插件' : 'Community Plugins', '300+', '1000+'],
              [isZh ? '配置格式' : 'Config Format', 'DSL (.conf)', 'Ruby DSL'],
              [isZh ? '缓冲类型' : 'Buffering', isZh ? '内存、磁盘、持久队列' : 'Memory, disk, persistent queue', isZh ? '内存、文件' : 'Memory, file'],
              [isZh ? '高可用' : 'High Availability', isZh ? '持久队列' : 'Persistent queues', isZh ? '复制、集群' : 'Replication, clustering'],
              [isZh ? '生态系统' : 'Ecosystem', 'ELK Stack', 'EFK Stack, CNCF'],
              [isZh ? '许可证' : 'License', 'Apache 2.0', 'Apache 2.0'],
            ].map(([feature, logstash, fluentd], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{logstash}</td>
                <td style={tdStyle}>{fluentd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#00bfb3' }}>{ct.logstashExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Logstash Pipeline Configuration
# /etc/logstash/conf.d/apache-pipeline.conf

input {
  file {
    path => "/var/log/apache2/access.log"
    start_position => "beginning"
    sincedb_path => "/dev/null"
    type => "apache-access"
  }
  
  beats {
    port => 5044
    ssl => true
    ssl_certificate => "/etc/logstash/certs/logstash.crt"
    ssl_key => "/etc/logstash/certs/logstash.key"
  }
}

filter {
  grok {
    match => {
      "message" => "%{COMBINEDAPACHELOG}"
    }
  }
  
  geoip {
    source => "clientip"
    target => "geoip"
  }
  
  date {
    match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
    target => "@timestamp"
  }
  
  # Conditional processing
  if [response] >= 400 {
    mutate {
      add_tag => ["error"]
    }
  }
  
  # Remove sensitive fields
  mutate {
    remove_field => ["password", "token"]
  }
}

output {
  elasticsearch {
    hosts => ["https://elasticsearch:9200"]
    index => "apache-logs-%{+YYYY.MM.dd}"
    user => "logstash"
    password => "secret"
  }
  
  # Debug output
  stdout {
    codec => rubydebug
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f29111' }}>{ct.fluentdExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Fluentd Configuration
# /etc/fluent/fluent.conf

# Input sources
<source>
  @type tail
  path /var/log/apache2/access.log
  pos_file /var/log/fluent/apache-access.log.pos
  tag apache.access
  format apache2
</source>

<source>
  @type forward
  port 24224
  bind 0.0.0.0
  <transport tcp>
  </transport>
  <security>
    self_hostname fluentd.example.com
    shared_key secret_key
  </security>
</source>

# Filters for processing
<filter apache.**>
  @type record_transformer
  <record>
    hostname "#{Socket.gethostname}"
    environment "#{ENV['RAILS_ENV']}"
  </record>
</filter>

<filter apache.access>
  @type geoip
  geoip_lookup_key clientip
  <record>
    geoip_city  city.names.en
    geoip_country country.iso_code
    geoip_location location
  </record>
</filter>

# Output destinations
<match apache.**>
  @type elasticsearch
  host elasticsearch
  port 9200
  user elastic
  password secret
  scheme https
  ssl_verify true
  
  logstash_format true
  logstash_prefix apache-logs
  logstash_dateformat %Y.%m.%d
  
  <buffer tag, time>
    @type file
    path /var/log/fluent/buffer/apache
    timekey 60
    timekey_wait 30
    timekey_use_utc true
    flush_mode interval
    flush_interval 10s
    chunk_limit_size 16MB
    queue_limit_length 512
    retry_type exponential_backoff
    retry_wait 1s
    retry_max_interval 60s
    retry_timeout 24h
  </buffer>
</match>

# Error handling
<label @ERROR>
  <match **>
    @type file
    path /var/log/fluent/error
    compress gzip
  </match>
</label>`}</code></pre>

      {/* Architecture */}
      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #00bfb3' }}>
          <strong style={{ color: '#00bfb3' }}>Logstash</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '基于JVM，使用管道架构：输入 → 过滤器 → 输出。每个事件独立处理，支持持久队列确保数据不丢失。适合复杂转换和丰富。' : 'JVM-based with pipeline architecture: Input → Filter → Output. Each event processed independently, persistent queues ensure no data loss. Ideal for complex transformations and enrichment.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f29111' }}>
          <strong style={{ color: '#f29111' }}>Fluentd</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '事件驱动架构，使用标签路由事件。Ruby核心与C扩展结合实现高性能。灵活的缓冲系统支持多种后端。适合统一日志层。' : 'Event-driven architecture using tags for routing. Ruby core with C extensions for performance. Flexible buffering system supports multiple backends. Ideal for unified logging layer.'}
          </p>
        </div>
      </div>

      {/* Plugin Ecosystem */}
      <h2 style={h2Style}>{ct.pluginTitle}</h2>
      <p style={pStyle}>{ct.pluginIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>Logstash</th>
              <th style={thStyle}>Fluentd</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '输入源' : 'Input Sources', 'file, beats, kafka, http, tcp, udp, jdbc', 'tail, forward, http, kafka, kinesis'],
              [isZh ? '输出目标' : 'Output Targets', 'elasticsearch, kafka, s3, file, mongodb', 'elasticsearch, kafka, s3, gcs, bigquery'],
              [isZh ? '过滤器' : 'Filters', 'grok, geoip, mutate, date, csv', 'record_transformer, grep, parser, geoip'],
              [isZh ? '编解码器' : 'Codecs', 'json, multiline, rubydebug', isZh ? '内置格式器' : 'Built-in formatters'],
              [isZh ? '云服务' : 'Cloud Services', 'AWS, GCP, Azure integrations', 'AWS, GCP, Azure, Alibaba Cloud'],
            ].map(([cat, logstash, fluentd], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{logstash}</td>
                <td style={tdStyle}>{fluentd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00bfb3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00bfb3' }}>{ct.logstashBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'ELK Stack环境' : 'ELK Stack environments'}</li>
            <li>{isZh ? '复杂日志解析（Grok）' : 'Complex log parsing (Grok)'}</li>
            <li>{isZh ? '需要丰富内置插件' : 'Rich built-in plugins needed'}</li>
            <li>{isZh ? '企业级部署' : 'Enterprise deployments'}</li>
            <li>{isZh ? '重度数据转换' : 'Heavy data transformation'}</li>
            <li>{isZh ? 'JDBC数据库输入' : 'JDBC database inputs'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f29111' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f29111' }}>{ct.fluentdBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Kubernetes和容器' : 'Kubernetes and containers'}</li>
            <li>{isZh ? '多云日志路由' : 'Multi-cloud log routing'}</li>
            <li>{isZh ? '资源受限环境' : 'Resource-constrained environments'}</li>
            <li>{isZh ? 'IoT和边缘设备' : 'IoT and edge devices'}</li>
            <li>{isZh ? 'CNCF生态系统' : 'CNCF ecosystem'}</li>
            <li>{isZh ? '需要灵活插件开发' : 'Flexible plugin development needed'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a> • {' '}
        <a href={"/" + lang + "/tools/escape-unescape"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Escape/Unescape</a>
      </div>

      {/* FAQ */}
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
