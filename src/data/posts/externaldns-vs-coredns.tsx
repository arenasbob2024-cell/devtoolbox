'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'ExternalDNS vs CoreDNS: Kubernetes DNS Comparison',
    intro: 'ExternalDNS and CoreDNS serve different but complementary purposes in Kubernetes networking. ExternalDNS manages DNS records for external access, while CoreDNS handles internal cluster DNS resolution. Understanding their roles helps you design better service discovery and external access strategies.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Use ExternalDNS for automatic external DNS record management for LoadBalancer services and Ingress. Use CoreDNS for internal cluster DNS resolution and service discovery. They work together: CoreDNS handles internal traffic, ExternalDNS handles external DNS records.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'ExternalDNS manages external DNS records automatically',
    takeaway2: 'CoreDNS is the default internal DNS for Kubernetes',
    takeaway3: 'ExternalDNS works with cloud provider DNS (Route53, CloudDNS)',
    takeaway4: 'CoreDNS supports custom DNS zones and forwarding',
    takeaway5: 'Both are CNCF graduated projects',
    takeaway6: 'They complement each other, not compete',
    
    whatIsExternalDnsTitle: 'What is ExternalDNS?',
    whatIsExternalDnsContent: 'ExternalDNS is a Kubernetes addon that synchronizes exposed Kubernetes Services and Ingresses with DNS providers. Developed by the Kubernetes SIGs, it automatically creates DNS records in cloud provider DNS services (AWS Route53, Google Cloud DNS, Azure DNS, etc.) when services are created, and removes them when services are deleted.',
    
    whatIsCoreDnsTitle: 'What is CoreDNS?',
    whatIsCoreDnsContent: 'CoreDNS is the default DNS server for Kubernetes since version 1.11. Developed by the CNCF, it provides DNS-based service discovery within the cluster. CoreDNS is highly flexible, supporting custom DNS configurations, forwarding, and integration with various backends for advanced use cases.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'DNS configuration examples:',
    
    externalDnsExampleTitle: 'ExternalDNS Configuration',
    coreDnsExampleTitle: 'CoreDNS Configuration',
    
    dataSourceTitle: 'DNS Provider Support',
    dataSourceIntro: 'Supported DNS providers and integrations:',
    
    alertingTitle: 'Use Case Focus',
    alertingIntro: 'Primary use cases for each tool:',
    
    useCasesTitle: 'Best Use Cases',
    externalDnsBestFor: 'ExternalDNS is Best For:',
    coreDnsBestFor: 'CoreDNS is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'ExternalDNS and CoreDNS serve complementary purposes in the Kubernetes DNS ecosystem. CoreDNS handles internal cluster DNS resolution and is essential for service discovery. ExternalDNS automates external DNS record management, eliminating manual DNS configuration for external access. Use both together: CoreDNS for internal service discovery and ExternalDNS for automatic external DNS management.',
    
    faq1q: 'Can I use both ExternalDNS and CoreDNS together?',
    faq1a: 'Yes, absolutely. They serve different purposes. CoreDNS handles internal cluster DNS (like myservice.mynamespace.svc.cluster.local), while ExternalDNS creates records in external DNS providers for public access. Most production clusters use both.',
    
    faq2q: 'Do I need ExternalDNS for internal services?',
    faq2a: 'No. CoreDNS handles all internal DNS resolution. ExternalDNS is only needed when you want to expose services externally with automatic DNS record management. For internal-only services, CoreDNS is sufficient.',
    
    faq3q: 'Which DNS providers does ExternalDNS support?',
    faq3a: 'ExternalDNS supports AWS Route53, Google Cloud DNS, Azure DNS, Cloudflare, DigitalOcean, Linode, and many more. It has a plugin architecture that allows adding new providers.',
    
    faq4q: 'Can CoreDNS forward to external DNS?',
    faq4a: 'Yes, CoreDNS can be configured to forward specific domains to external DNS servers. This is useful for hybrid environments where some domains need external resolution while others are internal.',
    
    faq5q: 'How do they handle service updates?',
    faq5a: 'CoreDNS automatically updates when services change within the cluster. ExternalDNS watches for changes to Services and Ingresses and updates external DNS records accordingly. Both handle dynamic environments well.',
    
    faq6q: 'What about performance and scalability?',
    faq6a: 'CoreDNS is highly scalable and handles thousands of services easily. ExternalDNS performance depends on the DNS provider API limits. Both are production-ready and battle-tested at scale.',
    
    faq7q: 'Can I customize CoreDNS for specific needs?',
    faq7a: 'Yes, CoreDNS is highly customizable through Corefile configuration. You can add custom zones, rewrite rules, forward to specific servers, and integrate with external systems like etcd or Consul.',
    
    faq8q: 'Which is required for a basic cluster?',
    faq8a: 'CoreDNS is required and comes pre-installed with Kubernetes. ExternalDNS is optional and only needed if you want automatic external DNS management. For development clusters without external access needs, you may not need ExternalDNS.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'ExternalDNS vs CoreDNS：Kubernetes DNS 对比',
    intro: 'ExternalDNS 和 CoreDNS 在 Kubernetes 网络中服务于不同但互补的目的。ExternalDNS 管理外部访问的 DNS 记录，而 CoreDNS 处理内部集群 DNS 解析。了解它们的角色有助于设计更好的服务发现和外部访问策略。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为 LoadBalancer 服务和 Ingress 的自动外部 DNS 记录管理使用 ExternalDNS。为内部集群 DNS 解析和服务发现使用 CoreDNS。它们协同工作：CoreDNS 处理内部流量，ExternalDNS 处理外部 DNS 记录。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'ExternalDNS 自动管理外部 DNS 记录',
    takeaway2: 'CoreDNS 是 Kubernetes 的默认内部 DNS',
    takeaway3: 'ExternalDNS 与云提供者 DNS（Route53、CloudDNS）协同工作',
    takeaway4: 'CoreDNS 支持自定义 DNS 区域和转发',
    takeaway5: '两者都是 CNCF 毕业项目',
    takeaway6: '它们互补而非竞争',
    
    whatIsExternalDnsTitle: '什么是 ExternalDNS？',
    whatIsExternalDnsContent: 'ExternalDNS 是一个 Kubernetes 插件，用于将暴露的 Kubernetes Services 和 Ingress 与 DNS 提供者同步。由 Kubernetes SIGs 开发，当创建服务时，它会自动在云提供者 DNS 服务（AWS Route53、Google Cloud DNS、Azure DNS 等）中创建 DNS 记录。当删除服务时，它会删除这些记录。',
    
    whatIsCoreDnsTitle: '什么是 CoreDNS？',
    whatIsCoreDnsContent: 'CoreDNS 是自 Kubernetes 1.11 版以来的默认 DNS 服务器。由 CNCF 开发。它为集群内提供基于 DNS 的服务发现。CoreDNS 高度灵活，支持自定义 DNS 配置、转发以及与各种后端的集成，用于高级用例。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: 'DNS 配置示例：',
    
    externalDnsExampleTitle: 'ExternalDNS 配置',
    coreDnsExampleTitle: 'CoreDNS 配置',
    
    dataSourceTitle: 'DNS 提供者支持',
    dataSourceIntro: '支持的 DNS 提供者和集成：',
    
    alertingTitle: '用例聚焦',
    alertingIntro: '每个工具的主要用例：',
    
    useCasesTitle: '最佳用例',
    externalDnsBestFor: 'ExternalDNS 最适合：',
    coreDnsBestFor: 'CoreDNS 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'ExternalDNS 和 CoreDNS 在 Kubernetes DNS 生态系统中服务于互补的目的。CoreDNS 处理内部集群 DNS 解析，对于服务发现至关重要。ExternalDNS 自动化外部 DNS 记录管理，消除了手动配置外部访问 DNS 的需求。同时使用两者：CoreDNS 用于内部服务发现，ExternalDNS 用于自动外部 DNS 管理。',
    
    faq1q: '我可以同时使用 ExternalDNS 和 CoreDNS 吗？',
    faq1a: '是的，绝对可以。它们服务于不同的目的。CoreDNS 处理内部集群 DNS（如 myservice.mynamespace.svc.cluster.local），而 ExternalDNS 在外部 DNS 提供者中为公共访问创建记录。大多数生产集群同时使用两者。',
    
    faq2q: '内部服务需要 ExternalDNS 吗？',
    faq2a: '不需要。CoreDNS 处理所有内部 DNS 解析。只有当你要通过自动 DNS 记录管理将服务暴露给外部时才需要 ExternalDNS。对于仅限内部的服务，CoreDNS 就足够了。',
    
    faq3q: 'ExternalDNS 支持哪些 DNS 提供者？',
    faq3a: 'ExternalDNS 支持 AWS Route53、Google Cloud DNS、Azure DNS、Cloudflare、DigitalOcean、Linode 等等。它有插件架构允许添加新的提供者。',
    
    faq4q: 'CoreDNS 可以转发到外部 DNS 吗？',
    faq4a: '是的，CoreDNS 可以配置为将特定域转发到外部 DNS 服务器。这对于混合环境很有用，其中某些域需要外部解析，而其他域是内部的。',
    
    faq5q: '它们如何处理服务更新？',
    faq5a: 'CoreDNS 在集群内服务更改时自动更新。ExternalDNS 监视 Services 和 Ingress 的更改，并相应地更新外部 DNS 记录。两者都能很好地处理动态环境。',
    
    faq6q: '性能和可扩展性怎么样？',
    faq6a: 'CoreDNS 高度可扩展，可以轻松处理数千个服务。ExternalDNS 性能取决于 DNS 提供者 API 限制。两者都是生产就绪并在大规模环境下经过实战测试。',
    
    faq7q: '我可以为特定需求自定义 CoreDNS 吗？',
    faq7a: '是的，CoreDNS 可以通过 Corefile 配置高度自定义。你可以添加自定义区域、重写规则、转发到特定服务器，以及与外部系统（如 etcd 或 Consul）集成。',
    
    faq8q: '基础集群需要哪个？',
    faq8a: 'CoreDNS 是必需的，随 Kubernetes 预装。ExternalDNS 是可选的，只有在你需要自动外部 DNS 管理时才需要。对于没有外部访问需求的开发集群，你可能不需要 ExternalDNS。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ExternalDnsVsCoreDns({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#06b6d4' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #06b6d4', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(34,197,94,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#06b6d4' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsExternalDnsTitle}</h3>
      <p style={pStyle}>{ct.whatIsExternalDnsContent}</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.whatIsCoreDnsTitle}</h3>
      <p style={pStyle}>{ct.whatIsCoreDnsContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>ExternalDNS</th>
              <th style={thStyle}>CoreDNS</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', isZh ? '外部 DNS 管理' : 'External DNS management', isZh ? '内部 DNS 解析' : 'Internal DNS resolution'],
              [isZh ? '默认安装' : 'Default Install', isZh ? '可选' : 'Optional', isZh ? '必需' : 'Required'],
              [isZh ? 'DNS 范围' : 'DNS Scope', isZh ? '外部/公共' : 'External/Public', isZh ? '内部/集群' : 'Internal/Cluster'],
              [isZh ? '自动记录创建' : 'Auto Record Creation', isZh ? '是' : 'Yes', isZh ? '否' : 'No'],
              [isZh ? '服务发现' : 'Service Discovery', isZh ? '不适用' : 'N/A', isZh ? '核心功能' : 'Core function'],
              [isZh ? '云提供商集成' : 'Cloud Integration', isZh ? '广泛' : 'Extensive', isZh ? '不适用' : 'N/A'],
              [isZh ? '配置方式' : 'Configuration', 'Annotations/CRDs', 'Corefile'],
            ].map(([feature, external, core], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{external}</td>
                <td style={tdStyle}>{core}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>ExternalDNS</th>
              <th style={thStyle}>CoreDNS</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'LoadBalancer 支持' : 'LoadBalancer Support', isZh ? '自动记录' : 'Auto records', isZh ? '内部解析' : 'Internal resolution'],
              [isZh ? 'Ingress 支持' : 'Ingress Support', isZh ? '自动记录' : 'Auto records', isZh ? '不适用' : 'N/A'],
              [isZh ? 'Headless Services' : 'Headless Services', isZh ? '支持' : 'Supported', isZh ? 'A 记录' : 'A records'],
              [isZh ? 'DNS 转发' : 'DNS Forwarding', isZh ? '不支持' : 'No', isZh ? '支持' : 'Yes'],
              [isZh ? '自定义区域' : 'Custom Zones', isZh ? '云 DNS 区域' : 'Cloud DNS zones', isZh ? 'Corefile 配置' : 'Corefile config'],
              [isZh ? '健康检查' : 'Health Checks', isZh ? '有限' : 'Limited', isZh ? '就绪探针' : 'Ready probe'],
              [isZh ? 'RBAC 支持' : 'RBAC Support', isZh ? '支持' : 'Supported', isZh ? '原生' : 'Native'],
            ].map(([cap, external, core], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{external}</td>
                <td style={tdStyle}>{core}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#06b6d4' }}>{ct.externalDnsExampleTitle}</h3>
      <pre style={codeStyle}><code>{'# ExternalDNS Deployment with AWS Route53\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: external-dns\n  namespace: kube-system\nspec:\n  selector:\n    matchLabels:\n      app: external-dns\n  template:\n    metadata:\n      labels:\n        app: external-dns\n    spec:\n      containers:\n      - name: external-dns\n        image: registry.k8s.io/external-dns/external-dns:v0.14.0\n        args:\n        - --source=service\n        - --source=ingress\n        - --domain-filter=example.com\n        - --provider=aws\n        - --policy=upsert-only\n        - --aws-zone-type=public\n        - --registry=txt\n        - --txt-owner-id=my-cluster\n\n---\n# Service with ExternalDNS annotation\napiVersion: v1\nkind: Service\nmetadata:\n  name: api-service\n  annotations:\n    external-dns.alpha.kubernetes.io/hostname: api.example.com\nspec:\n  type: LoadBalancer\n  ports:\n  - port: 80\n    targetPort: 8080\n  selector:\n    app: api'}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.coreDnsExampleTitle}</h3>
      <pre style={codeStyle}><code>{'# CoreDNS Corefile (ConfigMap)\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: coredns\n  namespace: kube-system\ndata:\n  Corefile: |\n    .:53 {\n        errors\n        health {\n          lameduck 5s\n        }\n        ready\n        kubernetes cluster.local in-addr.arpa ip6.arpa {\n          pods insecure\n          fallthrough in-addr.arpa ip6.arpa\n          ttl 30\n        }\n        prometheus :9153\n        forward . /etc/resolv.conf {\n          max_concurrent 1000\n        }\n        cache 30\n        loop\n        reload\n        loadbalance\n    }\n    \n    # Custom zone for internal services\n    internal.example.com:53 {\n        errors\n        cache 30\n        forward . 10.0.0.1\n    }\n    \n    # Forward specific domain to external DNS\n    external.example.org:53 {\n        forward . 8.8.8.8 8.8.4.4\n        cache 30\n    }'}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '提供者' : 'Provider'}</th>
              <th style={thStyle}>ExternalDNS</th>
              <th style={thStyle}>CoreDNS</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['AWS Route53', isZh ? '原生支持' : 'Native support', isZh ? '不适用' : 'N/A'],
              ['Google Cloud DNS', isZh ? '原生支持' : 'Native support', isZh ? '不适用' : 'N/A'],
              ['Azure DNS', isZh ? '原生支持' : 'Native support', isZh ? '不适用' : 'N/A'],
              ['Cloudflare', isZh ? '原生支持' : 'Native support', isZh ? '不适用' : 'N/A'],
              [isZh ? '集群内部 DNS' : 'Internal Cluster DNS', isZh ? '不适用' : 'N/A', isZh ? '核心功能' : 'Core function'],
              [isZh ? '外部 DNS 转发' : 'External DNS Forward', isZh ? '不适用' : 'N/A', isZh ? '支持' : 'Supported'],
            ].map(([provider, external, core], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{provider}</td>
                <td style={tdStyle}>{external}</td>
                <td style={tdStyle}>{core}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #06b6d4' }}>
          <strong style={{ color: '#06b6d4' }}>ExternalDNS Use Cases</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '自动为 LoadBalancer 服务创建 DNS 记录。管理 Ingress 主机名的 DNS。多集群 DNS 管理。与云提供商 DNS 集成。自动清理已删除服务的 DNS 记录。' : 'Automatically creates DNS records for LoadBalancer services. Manages DNS for Ingress hostnames. Multi-cluster DNS management. Integrates with cloud provider DNS. Automatic cleanup of DNS records for deleted services.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>CoreDNS Use Cases</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '集群内服务发现。解析 Kubernetes Service DNS 名称。支持 Headless Services。DNS 转发到外部服务器。自定义 DNS 区域和重写规则。与 Service Mesh 集成。' : 'In-cluster service discovery. Resolves Kubernetes Service DNS names. Supports Headless Services. DNS forwarding to external servers. Custom DNS zones and rewrite rules. Integration with Service Mesh.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #06b6d4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#06b6d4' }}>{ct.externalDnsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '自动外部 DNS 管理' : 'Automated external DNS management'}</li>
            <li>{isZh ? '多云部署' : 'Multi-cloud deployments'}</li>
            <li>{isZh ? 'Ingress 自动化' : 'Ingress automation'}</li>
            <li>{isZh ? '生产环境服务暴露' : 'Production service exposure'}</li>
            <li>{isZh ? 'DNS 即代码' : 'DNS as code'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.coreDnsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '内部服务发现' : 'Internal service discovery'}</li>
            <li>{isZh ? 'Kubernetes 默认 DNS' : 'Kubernetes default DNS'}</li>
            <li>{isZh ? '自定义 DNS 配置' : 'Custom DNS configuration'}</li>
            <li>{isZh ? '混合 DNS 环境' : 'Hybrid DNS environments'}</li>
            <li>{isZh ? 'DNS 转发和重写' : 'DNS forwarding and rewriting'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(34,197,94,0.1))', borderRadius: 12, border: '1px solid rgba(6,182,212,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#06b6d4', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#06b6d4', textDecoration: 'none' }}>YAML Formatter</a>
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
