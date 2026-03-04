'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Linkerd vs Istio: Service Mesh Comparison',
    intro: 'Linkerd and Istio are two leading service mesh solutions for Kubernetes. Both provide traffic management, security, and observability for microservices, but differ significantly in complexity, performance, and operational overhead. This comparison examines their architecture, features, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Linkerd for simplicity, minimal resource usage, and fast deployment. Choose Istio for advanced traffic management, extensive customization, and enterprise features. Linkerd excels in simplicity and performance; Istio excels in feature completeness and flexibility.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Linkerd is simpler with smaller resource footprint',
    takeaway2: 'Istio offers more advanced traffic management features',
    takeaway3: 'Linkerd uses Rust-based proxy (sidecar ~10MB); Istio uses Envoy (~50-100MB)',
    takeaway4: 'Both provide mTLS, observability, and traffic splitting',
    takeaway5: 'Istio has larger community and ecosystem',
    takeaway6: 'Linkerd focuses on "it just works" philosophy',
    
    whatIsLinkerdTitle: 'What is Linkerd?',
    whatIsLinkerdContent: 'Linkerd is an open-source service mesh developed by Buoyant. Released in 2016, it was the first service mesh for Kubernetes. Linkerd 2.x (formerly Conduit) is written in Rust and Go, focusing on simplicity, minimalism, and performance. It provides automatic mTLS, observability, and reliability features with minimal configuration.',
    
    whatIsIstioTitle: 'What is Istio?',
    whatIsIstioContent: 'Istio is an open-source service mesh developed by Google, IBM, and Lyft. Released in 2018, it is built on Envoy proxy and offers comprehensive traffic management, security, and observability features. Istio is highly configurable and supports advanced use cases like traffic mirroring, fault injection, and complex routing rules.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Service mesh configuration and routing:',
    
    linkerdExampleTitle: 'Linkerd Configuration',
    istioExampleTitle: 'Istio Configuration',
    
    dataSourceTitle: 'Architecture & Components',
    dataSourceIntro: 'Core components and architecture:',
    
    alertingTitle: 'Performance & Resource Usage',
    alertingIntro: 'Resource consumption and latency comparison:',
    
    useCasesTitle: 'Best Use Cases',
    linkerdBestFor: 'Linkerd is Best For:',
    istioBestFor: 'Istio is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Linkerd and Istio serve different audiences. Linkerd is ideal for teams wanting a simple, lightweight service mesh that "just works" with minimal operational overhead. Istio is better for enterprises needing advanced traffic management, extensive customization, and rich ecosystem integrations. Consider Linkerd for quick adoption and lower resource costs; choose Istio when you need maximum flexibility and feature completeness.',
    
    faq1q: 'Which is easier to install and operate?',
    faq1a: 'Linkerd is significantly easier. Installation is a single command, and it requires minimal configuration. Istio has more components and configuration options, requiring more expertise to operate effectively.',
    
    faq2q: 'How do they compare on resource usage?',
    faq2a: 'Linkerd uses much fewer resources. Its Rust-based proxy is ~10MB per sidecar. Istio\'s Envoy proxy is ~50-100MB per sidecar. For large clusters, this difference is significant.',
    
    faq3q: 'Which has better performance?',
    faq3a: 'Linkerd generally has lower latency (P99 < 10ms) due to its lightweight proxy. Istio has higher latency (P99 ~20-50ms) due to Envoy\'s feature richness. Both are acceptable for most use cases.',
    
    faq4q: 'Can I migrate from one to another?',
    faq4a: 'Yes, but it requires planning. Both use standard Kubernetes annotations and can run side-by-side during migration. However, mTLS certificates and traffic policies need reconfiguration.',
    
    faq5q: 'Which has better community support?',
    faq5a: 'Istio has a larger community and more third-party integrations. Linkerd has a smaller but very active community focused on simplicity and user experience.',
    
    faq6q: 'What about multi-cluster support?',
    faq6a: 'Both support multi-cluster deployments. Linkerd\'s multi-cluster is simpler to set up. Istio offers more control but requires more configuration for cross-cluster communication.',
    
    faq7q: 'Do both support HTTP/2 and gRPC?',
    faq7a: 'Yes, both fully support HTTP/2 and gRPC traffic, including load balancing, observability, and mTLS for these protocols.',
    
    faq8q: 'Which should I choose for production?',
    faq8a: 'Choose Linkerd if you value simplicity and low overhead. Choose Istio if you need advanced features like traffic mirroring, extensive RBAC, or have complex routing requirements. Both are production-ready.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Linkerd vs Istio：Service Mesh 对比',
    intro: 'Linkerd 和 Istio 是两个领先的 Kubernetes 服务网格解决方案。两者都为微服务提供流量管理、安全性和可观测性，但在复杂性、性能和运维开销方面有显著差异。本比较考察它们的架构、功能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为简单性、最小资源使用和快速部署选择 Linkerd。为高级流量管理、广泛定制和企业功能选择 Istio。Linkerd 在简单性和性能方面出色；Istio 在功能完整性和灵活性方面出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Linkerd 更简单，资源占用更小',
    takeaway2: 'Istio 提供更高级的流量管理功能',
    takeaway3: 'Linkerd 使用 Rust 代理（sidecar ~10MB）；Istio 使用 Envoy（~50-100MB）',
    takeaway4: '两者都提供 mTLS、可观测性和流量分割',
    takeaway5: 'Istio 拥有更大的社区和生态系统',
    takeaway6: 'Linkerd 专注于"开箱即用"理念',
    
    whatIsLinkerdTitle: '什么是 Linkerd？',
    whatIsLinkerdContent: 'Linkerd 是由 Buoyant 开发的开源服务网格。2016 年发布，是第一个 Kubernetes 服务网格。Linkerd 2.x（原名 Conduit）用 Rust 和 Go 编写，专注于简单性、极简主义和性能。它以最少的配置提供自动 mTLS、可观测性和可靠性功能。',
    
    whatIsIstioTitle: '什么是 Istio？',
    whatIsIstioContent: 'Istio 是由 Google、IBM 和 Lyft 开发的开源服务网格。2018 年发布，基于 Envoy 代理构建，提供全面的流量管理、安全和可观测性功能。Istio 高度可配置，支持流量镜像、故障注入和复杂路由规则等高级用例。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '服务网格配置和路由：',
    
    linkerdExampleTitle: 'Linkerd 配置',
    istioExampleTitle: 'Istio 配置',
    
    dataSourceTitle: '架构与组件',
    dataSourceIntro: '核心组件和架构：',
    
    alertingTitle: '性能与资源使用',
    alertingIntro: '资源消耗和延迟比较：',
    
    useCasesTitle: '最佳用例',
    linkerdBestFor: 'Linkerd 最适合：',
    istioBestFor: 'Istio 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Linkerd 和 Istio 服务不同的受众。Linkerd 适合想要简单、轻量级服务网格、最小运维开销、"开箱即用"的团队。Istio 更适合需要高级流量管理、广泛定制和丰富生态系统集成的企业。为快速采用和较低资源成本考虑 Linkerd；当需要最大灵活性和功能完整性时选择 Istio。',
    
    faq1q: '哪个更容易安装和运维？',
    faq1a: 'Linkerd 明显更容易。安装只需一条命令，需要最少的配置。Istio 有更多组件和配置选项，需要更多专业知识才能有效运维。',
    
    faq2q: '它们在资源使用方面如何比较？',
    faq2a: 'Linkerd 使用更少资源。其基于 Rust 的代理每个 sidecar 约 10MB。Istio 的 Envoy 代理每个 sidecar 约 50-100MB。对于大型集群，这个差异很显著。',
    
    faq3q: '哪个性能更好？',
    faq3a: 'Linkerd 通常有更低的延迟（P99 < 10ms），因为其轻量级代理。Istio 有更高的延迟（P99 ~20-50ms），因为 Envoy 的功能丰富性。两者对大多数用例都可接受。',
    
    faq4q: '我可以从一个迁移到另一个吗？',
    faq4a: '可以，但需要规划。两者都使用标准 Kubernetes 注解，可以在迁移期间并行运行。但是，mTLS 证书和流量策略需要重新配置。',
    
    faq5q: '哪个有更好的社区支持？',
    faq5a: 'Istio 拥有更大的社区和更多第三方集成。Linkerd 社区较小但非常活跃，专注于简单性和用户体验。',
    
    faq6q: '多集群支持怎么样？',
    faq6a: '两者都支持多集群部署。Linkerd 的多集群设置更简单。Istio 提供更多控制，但需要更多配置来实现跨集群通信。',
    
    faq7q: '两者都支持 HTTP/2 和 gRPC 吗？',
    faq7a: '是的，两者都完全支持 HTTP/2 和 gRPC 流量，包括这些协议的负载均衡、可观测性和 mTLS。',
    
    faq8q: '生产环境应该选择哪个？',
    faq8a: '如果你重视简单性和低开销，选择 Linkerd。如果你需要高级功能如流量镜像、广泛 RBAC 或有复杂路由需求，选择 Istio。两者都是生产就绪的。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function LinkerdVsIstio({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#2bede3' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #2bede3', background: 'linear-gradient(135deg, rgba(43,237,227,0.1), rgba(74,144,226,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#2bede3' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsLinkerdTitle}</h3>
      <p style={pStyle}>{ct.whatIsLinkerdContent}</p>

      <h3 style={{ ...h3Style, color: '#4a90e2' }}>{ct.whatIsIstioTitle}</h3>
      <p style={pStyle}>{ct.whatIsIstioContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Linkerd</th>
              <th style={thStyle}>Istio</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', isZh ? '简单、轻量' : 'Simple, lightweight', isZh ? '功能完整' : 'Feature complete'],
              [isZh ? '数据平面' : 'Data Plane', 'Rust proxy (~10MB)', 'Envoy (~50-100MB)'],
              [isZh ? '安装复杂度' : 'Installation', isZh ? '简单' : 'Simple', isZh ? '复杂' : 'Complex'],
              [isZh ? '配置方式' : 'Configuration', 'Annotations', 'CRDs + ConfigMaps'],
              [isZh ? 'mTLS' : 'mTLS', isZh ? '自动' : 'Automatic', isZh ? '自动（可配置）' : 'Auto (configurable)'],
              [isZh ? '流量管理' : 'Traffic Mgmt', isZh ? '基础' : 'Basic', isZh ? '高级' : 'Advanced'],
              [isZh ? '可观测性' : 'Observability', 'Built-in dashboard', 'Kiali + Prometheus'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '低' : 'Low', isZh ? '高' : 'High'],
            ].map(([feature, linkerd, istio], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{linkerd}</td>
                <td style={tdStyle}>{istio}</td>
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
              <th style={thStyle}>Linkerd</th>
              <th style={thStyle}>Istio</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '流量分割' : 'Traffic Splitting', isZh ? '支持' : 'Supported', isZh ? '高级' : 'Advanced'],
              [isZh ? '故障注入' : 'Fault Injection', isZh ? '基础' : 'Basic', isZh ? '完整' : 'Full'],
              [isZh ? '流量镜像' : 'Traffic Mirroring', isZh ? '不支持' : 'No', isZh ? '支持' : 'Yes'],
              [isZh ? '熔断' : 'Circuit Breaking', isZh ? '自动' : 'Automatic', isZh ? '可配置' : 'Configurable'],
              [isZh ? '重试/超时' : 'Retries/Timeouts', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '速率限制' : 'Rate Limiting', isZh ? '不支持' : 'No', isZh ? '支持' : 'Yes'],
              [isZh ? 'RBAC' : 'RBAC', isZh ? '基础' : 'Basic', isZh ? '高级' : 'Advanced'],
              [isZh ? '多集群' : 'Multi-cluster', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
            ].map(([cap, linkerd, istio], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{linkerd}</td>
                <td style={tdStyle}>{istio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#2bede3' }}>{ct.linkerdExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Linkerd Installation
linkerd install | kubectl apply -f -

# Add Linkerd to namespace
kubectl annotate namespace default \\
  linkerd.io/inject=enabled

# Linkerd Traffic Split (Canary Deployment)
apiVersion: split.smi-spec.io/v1alpha1
kind: TrafficSplit
metadata:
  name: app-split
spec:
  service: app-service
  backends:
  - service: app-v1
    weight: 90
  - service: app-v2
    weight: 10

# Linkerd Service Profile (Retries & Timeouts)
apiVersion: linkerd.io/v1alpha2
kind: ServiceProfile
metadata:
  name: app-service.default.svc.cluster.local
spec:
  routes:
  - name: GET /api/users
    condition:
      method: GET
      pathRegex: /api/users
    timeout: 500ms
    isRetryable: true`}</code></pre>

      <h3 style={{ ...h3Style, color: '#4a90e2' }}>{ct.istioExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Istio Installation
istioctl install --set profile=default

# Automatic sidecar injection
kubectl label namespace default istio-injection=enabled

# Istio Virtual Service (Traffic Management)
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: app-service
spec:
  hosts:
  - app-service
  http:
  - match:
    - headers:
        x-canary:
          exact: "true"
    route:
    - destination:
        host: app-service
        subset: v2
  - route:
    - destination:
        host: app-service
        subset: v1
      weight: 90
    - destination:
        host: app-service
        subset: v2
      weight: 10

# Istio Destination Rule
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: app-service
spec:
  host: app-service
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        h2UpgradePolicy: UPGRADE
    outlierDetection:
      consecutive5xxErrors: 3
      interval: 30s
      baseEjectionTime: 30s`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '组件' : 'Component'}</th>
              <th style={thStyle}>Linkerd</th>
              <th style={thStyle}>Istio</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '控制平面' : 'Control Plane', 'linkerd-control-plane', 'istiod (Pilot, Citadel, Galley)'],
              [isZh ? '数据平面代理' : 'Data Plane Proxy', 'linkerd2-proxy (Rust)', 'Envoy (C++)'],
              [isZh ? 'CLI 工具' : 'CLI Tool', 'linkerd', 'istioctl'],
              [isZh ? '证书管理' : 'Certificate Mgmt', 'Built-in (step)', 'Built-in + cert-manager'],
              [isZh ? '可观测性' : 'Observability', 'linkerd-viz', 'Kiali, Jaeger, Prometheus'],
              [isZh ? '网关' : 'Gateway', 'linkerd-gateway', 'istio-ingressgateway'],
            ].map(([comp, linkerd, istio], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{comp}</td>
                <td style={tdStyle}>{linkerd}</td>
                <td style={tdStyle}>{istio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #2bede3' }}>
          <strong style={{ color: '#2bede3' }}>Linkerd Performance</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Sidecar 代理约 10MB 内存，P99 延迟 < 10ms，控制平面约 200MB 总内存。CPU 开销约 5-10% 每请求。适合资源受限环境。' : 'Sidecar proxy ~10MB memory, P99 latency < 10ms, control plane ~200MB total memory. CPU overhead ~5-10% per request. Ideal for resource-constrained environments.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #4a90e2' }}>
          <strong style={{ color: '#4a90e2' }}>Istio Performance</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Sidecar 代理约 50-100MB 内存，P99 延迟 ~20-50ms，控制平面约 500MB-1GB 总内存。CPU 开销约 10-20% 每请求。功能丰富但资源消耗较高。' : 'Sidecar proxy ~50-100MB memory, P99 latency ~20-50ms, control plane ~500MB-1GB total memory. CPU overhead ~10-20% per request. Feature-rich but higher resource consumption.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #2bede3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2bede3' }}>{ct.linkerdBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速部署服务网格' : 'Quick service mesh adoption'}</li>
            <li>{isZh ? '资源受限环境' : 'Resource-constrained environments'}</li>
            <li>{isZh ? '小型到中型集群' : 'Small to medium clusters'}</li>
            <li>{isZh ? '简单流量管理需求' : 'Simple traffic management needs'}</li>
            <li>{isZh ? '追求简单运维' : 'Operations simplicity focus'}</li>
            <li>{isZh ? '创业公司和初创项目' : 'Startups and new projects'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4a90e2' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4a90e2' }}>{ct.istioBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级生产环境' : 'Enterprise production environments'}</li>
            <li>{isZh ? '复杂流量路由需求' : 'Complex traffic routing needs'}</li>
            <li>{isZh ? '高级安全策略' : 'Advanced security policies'}</li>
            <li>{isZh ? '流量镜像和测试' : 'Traffic mirroring and testing'}</li>
            <li>{isZh ? '大型微服务架构' : 'Large microservice architectures'}</li>
            <li>{isZh ? '需要深度定制' : 'Deep customization required'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(43,237,227,0.1), rgba(74,144,226,0.1))', borderRadius: 12, border: '1px solid rgba(43,237,227,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#2bede3', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/yaml-formatter"} style={{ color: '#2bede3', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#2bede3', textDecoration: 'none' }}>Base64 Encoder</a>
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