'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Consul vs etcd: Service Discovery Comparison',
    intro: 'Consul and etcd are two popular distributed key-value stores used for service discovery, configuration management, and coordination in distributed systems. Consul by HashiCorp offers a comprehensive service mesh solution, while etcd by CoreOS (now CNCF) is the backbone of Kubernetes. This comparison examines their architecture, features, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Consul for comprehensive service discovery with health checking, service mesh, and multi-datacenter support out of the box. Choose etcd when you need a simple, reliable distributed key-value store, especially for Kubernetes clusters or when you want to build custom service discovery solutions.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Consul provides built-in service mesh and DNS interface',
    takeaway2: 'etcd is lighter weight and powers Kubernetes',
    takeaway3: 'Consul has native health checking and service discovery',
    takeaway4: 'etcd offers stronger consistency guarantees with Raft',
    takeaway5: 'Consul supports multi-datacenter out of the box',
    takeaway6: 'etcd has simpler architecture and easier operations',
    
    whatIsConsulTitle: 'What is Consul?',
    whatIsConsulContent: 'Consul is a service networking solution developed by HashiCorp. It provides service discovery, configuration, and segmentation functionality. Consul includes DNS and HTTP interfaces, health checking, service mesh with Connect, and multi-datacenter support. It is widely used in microservices architectures for service discovery and service mesh.',
    
    whatIsEtcdTitle: 'What is etcd?',
    whatIsEtcdContent: 'etcd is a distributed reliable key-value store developed by CoreOS (now part of CNCF). It uses the Raft consensus algorithm to provide strong consistency and high availability. etcd is best known as the primary datastore for Kubernetes, storing all cluster state and configuration data.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Service registration and configuration:',
    
    consulExampleTitle: 'Consul Service Registration',
    etcdExampleTitle: 'etcd Key-Value Operations',
    
    dataSourceTitle: 'Architecture and Deployment',
    dataSourceIntro: 'Deployment and operational characteristics:',
    
    alertingTitle: 'Service Discovery Features',
    alertingIntro: 'Service discovery and health checking:',
    
    useCasesTitle: 'Best Use Cases',
    consulBestFor: 'Consul is Best For:',
    etcdBestFor: 'etcd is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Consul and etcd serve different primary purposes despite both being distributed key-value stores. Consul is a comprehensive service networking platform with built-in service discovery, health checking, and service mesh capabilities. It excels in microservices environments where you need full-featured service discovery. etcd is a simpler, more focused distributed key-value store that prioritizes strong consistency and reliability, making it ideal for Kubernetes and custom distributed systems where you need a robust coordination primitive.',
    
    faq1q: 'Can I use etcd for service discovery like Consul?',
    faq1a: 'Yes, but etcd requires additional tooling and development. etcd provides the distributed key-value store foundation, but you need to build service registration, health checking, and DNS interfaces yourself. Consul provides these features out of the box.',
    
    faq2q: 'Which is better for Kubernetes?',
    faq2a: 'etcd is the standard for Kubernetes and is tightly integrated with its architecture. While you can use Consul with Kubernetes (for example, with Consul Service Mesh), etcd remains the core datastore for Kubernetes cluster state.',
    
    faq3q: 'How do they compare for consistency?',
    faq3a: 'etcd provides stronger consistency guarantees with linearizable reads and writes using Raft. Consul offers different consistency modes (eventual, consistent) and allows trade-offs between consistency and performance. For critical coordination, etcd consistency model is more strict.',
    
    faq4q: 'What about multi-datacenter support?',
    faq4a: 'Consul has native multi-datacenter support with WAN gossip and federation capabilities. etcd requires manual setup for multi-datacenter scenarios and does not have built-in federation. For multi-region deployments, Consul is more feature-complete.',
    
    faq5q: 'Which has better performance?',
    faq5a: 'etcd generally has lower latency for simple key-value operations due to its simpler architecture. Consul adds overhead for service discovery features and health checking. For pure key-value workloads, etcd is faster. For service discovery, Consul performance is adequate.',
    
    faq6q: 'How complex are operations?',
    faq6a: 'etcd is simpler to operate with fewer moving parts. Consul has more components (agents, servers, DNS, health checking) but provides more features. Both require careful capacity planning and monitoring for production deployments.',
    
    faq7q: 'What about the service mesh features?',
    faq7a: 'Consul Connect provides built-in service mesh with mutual TLS, intention-based access control, and observability. etcd does not have service mesh features. For service mesh, you would need to add solutions like Istio or Linkerd alongside etcd.',
    
    faq8q: 'Which should I choose?',
    faq8a: 'Choose Consul if you need comprehensive service discovery, health checking, and service mesh in one package. Choose etcd if you need a simple, reliable distributed key-value store for Kubernetes or custom coordination needs. Your choice depends on whether you want a full service networking platform (Consul) or a focused coordination primitive (etcd).',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Consul vs etcd: 服务发现对比',
    intro: 'Consul和etcd是两个流行的分布式键值存储,用于分布式系统中的服务发现、配置管理和协调。HashiCorp的Consul提供全面的服务网格解决方案,而CoreOS(现为CNCF)的etcd是Kubernetes的基石。本比较考察它们的架构、功能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为开箱即用的服务发现、健康检查、服务网格和多数据中心支持选择Consul。为简单可靠的分布式键值存储选择etcd,特别是对于Kubernetes集群或当你想构建自定义服务发现解决方案时。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Consul提供内置服务网格和DNS接口',
    takeaway2: 'etcd更轻量级,为Kubernetes提供动力',
    takeaway3: 'Consul具有原生健康检查和服务发现',
    takeaway4: 'etcd通过Raft提供更强的一致性保证',
    takeaway5: 'Consul开箱即支持多数据中心',
    takeaway6: 'etcd架构更简单,运维更容易',
    
    whatIsConsulTitle: '什么是Consul?',
    whatIsConsulContent: 'Consul是HashiCorp开发的服务网络解决方案。它提供服务发现、配置和分段功能。Consul包括DNS和HTTP接口、健康检查、带Connect的服务网格以及多数据中心支持。它在微服务架构中被广泛用于服务发现和服务网格。',
    
    whatIsEtcdTitle: '什么是etcd?',
    whatIsEtcdContent: 'etcd是由CoreOS(现为CNCF的一部分)开发的分布式可靠键值存储。它使用Raft共识算法提供强一致性和高可用性。etcd最著名的是作为Kubernetes的主要数据存储,存储所有集群状态和配置数据。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能:',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较:',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '服务注册和配置:',
    
    consulExampleTitle: 'Consul服务注册',
    etcdExampleTitle: 'etcd键值操作',
    
    dataSourceTitle: '架构和部署',
    dataSourceIntro: '部署和运维特性:',
    
    alertingTitle: '服务发现功能',
    alertingIntro: '服务发现和健康检查:',
    
    useCasesTitle: '最佳用例',
    consulBestFor: 'Consul最适合:',
    etcdBestFor: 'etcd最适合:',
    
    conclusionTitle: '结论',
    conclusionContent: '尽管Consul和etcd都是分布式键值存储,但它们服务于不同的主要目的。Consul是一个全面的服务网络平台,具有内置的服务发现、健康检查和服务网格功能。它在需要全功能服务发现的微服务环境中表现出色。etcd是一个更简单、更专注的分布式键值存储,优先考虑强一致性和可靠性,使其成为Kubernetes和需要强大协调原语的自定义分布式系统的理想选择。',
    
    faq1q: '我可以像Consul一样使用etcd进行服务发现吗?',
    faq1a: '可以,但etcd需要额外的工具和开发。etcd提供分布式键值存储基础,但你需要自己构建服务注册、健康检查和DNS接口。Consul开箱即提供这些功能。',
    
    faq2q: '哪个更适合Kubernetes?',
    faq2a: 'etcd是Kubernetes的标准,与其架构紧密集成。虽然你可以在Kubernetes中使用Consul(例如,使用Consul服务网格),但etcd仍然是Kubernetes集群状态的核心数据存储。',
    
    faq3q: '它们在一致性方面如何比较?',
    faq3a: 'etcd使用Raft提供更强的一致性保证,具有线性化的读写。Consul提供不同的一致性模式(最终、一致),允许在一致性和性能之间进行权衡。对于关键协调,etcd的一致性模型更严格。',
    
    faq4q: '多数据中心支持怎么样?',
    faq4a: 'Consul具有原生多数据中心支持,具有WAN gossip和联邦功能。etcd需要手动设置多数据中心场景,没有内置联邦。对于多区域部署,Consul功能更完整。',
    
    faq5q: '哪个性能更好?',
    faq5a: '由于架构更简单,etcd对于简单的键值操作通常具有更低的延迟。Consul为服务发现功能和健康检查增加了开销。对于纯键值工作负载,etcd更快。对于服务发现,Consul性能足够。',
    
    faq6q: '运维复杂度如何?',
    faq6a: 'etcd运维更简单,移动部件更少。Consul有更多组件(代理、服务器、DNS、健康检查),但提供更多功能。两者都需要仔细的容量规划和生产部署监控。',
    
    faq7q: '服务网格功能怎么样?',
    faq7a: 'Consul Connect提供内置服务网格,具有双向TLS、基于意图的访问控制和可观察性。etcd没有服务网格功能。对于服务网格,你需要在etcd旁边添加Istio或Linkerd等解决方案。',
    
    faq8q: '我应该选择哪个?',
    faq8a: '如果你需要一个包中的全面服务发现、健康检查和服务网格,选择Consul。如果你需要Kubernetes或自定义协调需求的简单可靠的分布式键值存储,选择etcd。你的选择取决于你想要完整的服务网络平台(Consul)还是专注的协调原语(etcd)。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ConsulVsEtcd({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsConsulTitle}</h3>
      <p style={pStyle}>{ct.whatIsConsulContent}</p>

      <h3 style={h3Style}>{ct.whatIsEtcdTitle}</h3>
      <p style={pStyle}>{ct.whatIsEtcdContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Consul</th>
              <th style={thStyle}>etcd</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', isZh ? '服务发现+网格' : 'Service discovery+mesh', isZh ? '分布式KV存储' : 'Distributed KV store'],
              [isZh ? '一致性模型' : 'Consistency Model', isZh ? '可配置' : 'Configurable', isZh ? '强一致性(Raft)' : 'Strong consistency(Raft)'],
              [isZh ? '服务发现' : 'Service Discovery', isZh ? '内置' : 'Built-in', isZh ? '需自定义' : 'Custom needed'],
              [isZh ? '健康检查' : 'Health Checking', isZh ? '原生支持' : 'Native support', isZh ? '无' : 'None'],
              [isZh ? 'DNS接口' : 'DNS Interface', isZh ? '内置' : 'Built-in', isZh ? '无' : 'None'],
              [isZh ? '服务网格' : 'Service Mesh', 'Connect', isZh ? '无' : 'None'],
              [isZh ? '多数据中心' : 'Multi-DC', isZh ? '原生支持' : 'Native support', isZh ? '手动配置' : 'Manual setup'],
              [isZh ? 'Kubernetes集成' : 'K8s Integration', isZh ? '服务网格' : 'Service mesh', isZh ? '核心数据存储' : 'Core datastore'],
            ].map(([feature, consul, etcd], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{consul}</td>
                <td style={tdStyle}>{etcd}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Consul</th>
              <th style={thStyle}>etcd</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'KV存储' : 'KV Store', isZh ? '支持' : 'Supported', isZh ? '核心功能' : 'Core feature'],
              [isZh ? '服务注册' : 'Service Registration', isZh ? '内置' : 'Built-in', isZh ? '需开发' : 'Development needed'],
              [isZh ? '健康检查' : 'Health Checks', 'HTTP, TCP, Script, gRPC', isZh ? '无' : 'None'],
              [isZh ? 'DNS' : 'DNS', isZh ? '内置DNS服务器' : 'Built-in DNS server', isZh ? '无' : 'None'],
              [isZh ? 'HTTP API' : 'HTTP API', isZh ? '完整' : 'Complete', isZh ? '完整' : 'Complete'],
              [isZh ? 'Watch机制' : 'Watch Support', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? 'ACL/安全' : 'ACL/Security', isZh ? '细粒度ACL' : 'Fine-grained ACL', isZh ? 'RBAC' : 'RBAC'],
              [isZh ? 'Web UI' : 'Web UI', isZh ? '内置' : 'Built-in', isZh ? '第三方工具' : 'Third-party tools'],
            ].map(([cap, consul, etcd], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{consul}</td>
                <td style={tdStyle}>{etcd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#d63aff' }}>{ct.consulExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Consul Service Registration (JSON config)
{
  "service": {
    "name": "web-api",
    "tags": ["api", "v2"],
    "port": 8080,
    "check": {
      "id": "web-api-health",
      "name": "HTTP Health Check",
      "http": "http://localhost:8080/health",
      "interval": "10s",
      "timeout": "1s"
    },
    "meta": {
      "version": "2.1.0",
      "environment": "production"
    }
  }
}

// Consul KV Store Operations (using consul CLI)
// Set a key-value pair
consul kv put config/database/host db.example.com
consul kv put config/database/port 5432

// Get a value
consul kv get config/database/host
# Output: db.example.com

// Watch for changes
consul watch -type=key -key=config/database/host \\
  /usr/local/bin/reload-config.sh

// Consul Service Discovery (DNS query)
// Query all web-api services
dig @localhost -p 8600 web-api.service.consul

// Query with tag
dig @localhost -p 8600 web-api.api.service.consul

// Consul Connect Service Mesh
{
  "service": {
    "name": "payment-service",
    "port": 8443,
    "connect": {
      "sidecar_service": {
        "port": 21000,
        "proxy": {
          "upstreams": [
            {
              "destination_name": "database-service",
              "local_bind_port": 5432
            }
          ]
        }
      }
    }
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#419eda' }}>{ct.etcdExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// etcd Key-Value Operations (using etcdctl CLI)
// Set a key-value pair
etcdctl put /services/web-api/host "10.0.1.50"
etcdctl put /services/web-api/port "8080"

// Get a value
etcdctl get /services/web-api/host
# Output:
# /services/web-api/host
# 10.0.1.50

// Get all keys with prefix
etcdctl get /services/web-api/ --prefix
# Output:
# /services/web-api/host
# 10.0.1.50
# /services/web-api/port
# 8080

// Watch for changes (simple service discovery)
etcdctl watch /services/ --prefix

// Lease-based key (for TTL/heartbeat)
etcdctl lease grant 300
# Output: lease 32695410dcc0ca06 granted with TTL(300s)

etcdctl put --lease=32695410dcc0ca06 \\
  /services/web-api/instance1 "10.0.1.50:8080"

// Transaction (compare-and-swap)
etcdctl txn <<EOF
compare("config/leader", "=", "node-1")
put("config/leader", "node-2")
get("config/leader")
EOF

// etcd for Kubernetes-like service registration
// Register service endpoint
etcdctl put /registry/services/default/web-api/10.0.1.50 \\
  '{"host":"10.0.1.50","port":8080,"metadata":{"version":"v2"}}'

// Service discovery in code (Python example)
import etcd3

etcd = etcd3.client()

# Register service with lease
lease = etcd.lease(60)  # 60 second TTL
etcd.put('/services/web-api/instance1',
         '10.0.1.50:8080', lease=lease)

# Keep lease alive (heartbeat)
while True:
    lease.refresh()
    time.sleep(30)

# Discover services
for value, metadata in etcd.get_prefix('/services/web-api/'):
    print(f"Service endpoint: {value}")`}</code></pre>

      {/* Architecture */}
      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Consul</th>
              <th style={thStyle}>etcd</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '共识算法' : 'Consensus', 'Raft', 'Raft'],
              [isZh ? '最小集群' : 'Min Cluster', '3-5 节点', '3-5 节点'],
              [isZh ? '协议' : 'Protocol', 'HTTP/gRPC/DNS', 'gRPC'],
              [isZh ? '存储引擎' : 'Storage Engine', 'Raft Log + BoltDB', 'BoltDB'],
              [isZh ? '压缩' : 'Compaction', isZh ? '自动' : 'Automatic', isZh ? '手动/自动' : 'Manual/Auto'],
              [isZh ? '备份' : 'Backup', isZh ? '快照' : 'Snapshot', isZh ? '快照' : 'Snapshot'],
              [isZh ? '监控' : 'Monitoring', 'Prometheus metrics', 'Prometheus metrics'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '中等' : 'Medium', isZh ? '简单' : 'Simple'],
            ].map(([cat, consul, etcd], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{consul}</td>
                <td style={tdStyle}>{etcd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Service Discovery Features */}
      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #d63aff' }}>
          <strong style={{ color: '#d63aff' }}>Consul Service Discovery</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '提供完整的服务发现功能：服务注册、DNS查询、健康检查、服务网格、多数据中心支持。服务可以自动注册,客户端可以通过DNS或HTTP API发现服务。' : 'Complete service discovery: service registration, DNS queries, health checks, service mesh, multi-datacenter support. Services auto-register, clients discover via DNS or HTTP API.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #419eda' }}>
          <strong style={{ color: '#419eda' }}>etcd Coordination</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '提供分布式协调原语：键值存储、Watch机制、租约、事务。可以构建自定义服务发现,但需要额外开发健康检查、负载均衡等功能。' : 'Distributed coordination primitives: key-value store, watch mechanism, leases, transactions. Can build custom service discovery but needs extra development for health checks, load balancing.'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #d63aff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#d63aff' }}>{ct.consulBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '微服务架构' : 'Microservices architectures'}</li>
            <li>{isZh ? '服务网格部署' : 'Service mesh deployment'}</li>
            <li>{isZh ? '多数据中心' : 'Multi-datacenter'}</li>
            <li>{isZh ? '动态服务发现' : 'Dynamic service discovery'}</li>
            <li>{isZh ? '混合云环境' : 'Hybrid cloud environments'}</li>
            <li>{isZh ? '零信任网络' : 'Zero-trust networking'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #419eda' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#419eda' }}>{ct.etcdBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Kubernetes集群' : 'Kubernetes clusters'}</li>
            <li>{isZh ? '分布式协调' : 'Distributed coordination'}</li>
            <li>{isZh ? '配置管理' : 'Configuration management'}</li>
            <li>{isZh ? '主节点选举' : 'Leader election'}</li>
            <li>{isZh ? '分布式锁' : 'Distributed locks'}</li>
            <li>{isZh ? '自定义服务发现' : 'Custom service discovery'}</li>
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
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a>
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
