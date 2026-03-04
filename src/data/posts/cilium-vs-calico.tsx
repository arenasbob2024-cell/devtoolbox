'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Cilium vs Calico: Kubernetes Network Plugin Comparison',
    intro: 'Cilium and Calico are two leading Container Network Interface (CNI) plugins for Kubernetes. Both provide networking, network policy, and security features but with different approaches. Cilium leverages eBPF for high performance and deep observability, while Calico uses traditional networking with flexible routing options. This comparison examines their capabilities and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Cilium for eBPF-based high performance, deep observability, and advanced security features. Choose Calico for proven stability, flexible networking options, and traditional networking familiarity. Both are excellent CNIs; your choice depends on whether you prioritize modern eBPF technology (Cilium) or established networking patterns (Calico).',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Cilium uses eBPF for kernel-level networking and security',
    takeaway2: 'Calico supports multiple routing backends (BGP, VXLAN)',
    takeaway3: 'Cilium provides deeper observability with Hubble',
    takeaway4: 'Calico has longer production track record',
    takeaway5: 'Cilium offers advanced API-aware network policies',
    takeaway6: 'Calico works on older kernels without eBPF support',
    
    whatIsCiliumTitle: 'What is Cilium?',
    whatIsCiliumContent: 'Cilium is an open-source networking, security, and observability solution for Kubernetes. It uses extended Berkeley Packet Filter (eBPF) to provide networking, load balancing, and security at the kernel level. Cilium supports advanced features like API-aware network policies, transparent encryption, and deep observability through Hubble. It is a CNCF graduated project.',
    
    whatIsCalicoTitle: 'What is Calico?',
    whatIsCalicoContent: 'Calico is an open-source networking and security solution for containers and Kubernetes. Originally developed by Tigera, it provides networking using pure IP networking with BGP routing or overlay networks. Calico supports network policies, IP address management (IPAM), and works with various orchestration platforms. It is known for stability and flexible deployment options.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks and performance characteristics:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Installation and policy configuration:',
    
    ciliumExampleTitle: 'Cilium Configuration',
    calicoExampleTitle: 'Calico Configuration',
    
    dataSourceTitle: 'Networking and Routing',
    dataSourceIntro: 'Networking implementation and options:',
    
    alertingTitle: 'Observability and Monitoring',
    alertingIntro: 'Monitoring and troubleshooting capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    ciliumBestFor: 'Cilium is Best For:',
    calicoBestFor: 'Calico is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Cilium and Calico represent different philosophies in Kubernetes networking. Cilium leverages cutting-edge eBPF technology for high performance, deep observability, and API-aware security. It excels in modern environments with kernel support for eBPF. Calico provides proven, flexible networking with traditional approaches that work across diverse environments. Your choice depends on your kernel version, performance requirements, and whether you prefer modern eBPF capabilities or established networking patterns.',
    
    faq1q: 'Which has better performance?',
    faq1a: 'Cilium generally has better performance due to eBPF running in kernel space with efficient packet processing. Calico performance is good but has more overhead from iptables and userspace components. For high-throughput, low-latency workloads, Cilium has an edge. For most applications, both perform adequately.',
    
    faq2q: 'What kernel version do I need?',
    faq2a: 'Cilium requires Linux kernel 4.9+ for basic features, 4.19+ for recommended features, and 5.10+ for all advanced features. Calico works on older kernels (3.10+) making it more compatible with legacy systems. If you have older kernels, Calico is the only option.',
    
    faq3q: 'Which is easier to install and manage?',
    faq3a: 'Both have similar installation complexity using Helm or operators. Calico has more documentation and community resources due to longer history. Cilium installation is straightforward but requires kernel compatibility checks. For beginners, Calico may be easier due to more examples and guides.',
    
    faq4q: 'What about network policies?',
    faq4a: 'Both support Kubernetes NetworkPolicy and their own extended policies. Cilium offers API-aware policies (Layer 7) that can filter by HTTP methods, paths, and Kafka topics. Calico has GlobalNetworkPolicy with application-level policies. Cilium\'s eBPF implementation provides more efficient policy enforcement.',
    
    faq5q: 'Can I migrate from one to the other?',
    faq5a: 'Yes, but it requires careful planning. Migration typically involves creating a new cluster or draining nodes, changing CNI, and recreating pods. Network policies may need adjustment. Test thoroughly in non-production first. Many organizations migrate successfully, but allocate sufficient time.',
    
    faq6q: 'What about encryption?',
    faq6a: 'Cilium provides transparent encryption using IPsec or WireGuard with eBPF, requiring minimal configuration. Calico supports WireGuard encryption but requires more setup. Both can integrate with service meshes for mTLS. For out-of-the-box encryption, Cilium is simpler.',
    
    faq7q: 'How do they handle service mesh?',
    faq7a: 'Cilium can replace or integrate with service meshes using eBPF for sidecar-free mTLS and observability. Calico integrates with Istio and Linkerd. Cilium\'s approach is more efficient without sidecars. For existing service mesh users, Calico integration is straightforward.',
    
    faq8q: 'Which has better support and community?',
    faq8a: 'Both have strong communities and commercial support. Calico has Tigera for enterprise support with longer market presence. Cilium has Isovalent for enterprise offerings. Both are CNCF projects with active development. Calico has more historical deployment experience, while Cilium has growing adoption.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Cilium vs Calico: Kubernetes网络插件对比',
    intro: 'Cilium和Calico是Kubernetes的两个领先容器网络接口(CNI)插件。两者都提供网络、网络策略和安全功能,但方法不同。Cilium利用eBPF实现高性能和深度可观察性,而Calico使用传统网络和灵活的路由选项。本比较考察它们的功能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为基于eBPF的高性能、深度可观察性和高级安全功能选择Cilium。为经过验证的稳定性、灵活的网络选项和传统网络熟悉度选择Calico。两者都是优秀的CNI;你的选择取决于你优先考虑现代eBPF技术(Cilium)还是既定的网络模式(Calico)。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Cilium使用eBPF进行内核级网络和安全',
    takeaway2: 'Calico支持多种路由后端(BGP、VXLAN)',
    takeaway3: 'Cilium通过Hubble提供更深入的可观察性',
    takeaway4: 'Calico有更长的生产跟踪记录',
    takeaway5: 'Cilium提供高级API感知网络策略',
    takeaway6: 'Calico可在没有eBPF支持的旧内核上工作',
    
    whatIsCiliumTitle: '什么是Cilium?',
    whatIsCiliumContent: 'Cilium是一个用于Kubernetes的开源网络、安全和可观察性解决方案。它使用扩展伯克利包过滤器(eBPF)在内核级别提供网络、负载均衡和安全。Cilium支持API感知网络策略、透明加密和通过Hubble的深度可观察性等高级功能。它是一个CNCF毕业项目。',
    
    whatIsCalicoTitle: '什么是Calico?',
    whatIsCalicoContent: 'Calico是一个用于容器和Kubernetes的开源网络安全解决方案。最初由Tigera开发,它使用纯IP网络和BGP路由或覆盖网络提供网络。Calico支持网络策略、IP地址管理(IPAM),并与各种编排平台配合使用。它以稳定性和灵活的部署选项而闻名。',
    
    performanceTitle: '性能对比',
    performanceIntro: '基准测试和性能特征:',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较:',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '安装和策略配置:',
    
    ciliumExampleTitle: 'Cilium配置',
    calicoExampleTitle: 'Calico配置',
    
    dataSourceTitle: '网络和路由',
    dataSourceIntro: '网络实现和选项:',
    
    alertingTitle: '可观察性和监控',
    alertingIntro: '监控和故障排除能力:',
    
    useCasesTitle: '最佳用例',
    ciliumBestFor: 'Cilium最适合:',
    calicoBestFor: 'Calico最适合:',
    
    conclusionTitle: '结论',
    conclusionContent: 'Cilium和Calico代表了Kubernetes网络中的不同理念。Cilium利用尖端eBPF技术实现高性能、深度可观察性和API感知安全。它在支持eBPF内核的现代环境中表现出色。Calico提供经过验证的、灵活的网络,使用跨不同环境的传统方法。你的选择取决于你的内核版本、性能需求以及你更喜欢现代eBPF功能还是既定的网络模式。',
    
    faq1q: '哪个性能更好?',
    faq1a: '由于eBPF在内核空间运行并具有高效的包处理,Cilium通常具有更好的性能。Calico性能良好,但iptables和用户空间组件有更多开销。对于高吞吐量、低延迟工作负载,Cilium具有优势。对于大多数应用程序,两者都表现良好。',
    
    faq2q: '我需要什么内核版本?',
    faq2a: 'Cilium需要Linux内核4.9+用于基本功能,4.19+用于推荐功能,5.10+用于所有高级功能。Calico可在旧内核(3.10+)上工作,使其与遗留系统更兼容。如果你有旧内核,Calico是唯一选择。',
    
    faq3q: '哪个更容易安装和管理?',
    faq3a: '两者使用Helm或operator有相似的安装复杂性。由于历史悠久,Calico有更多文档和社区资源。Cilium安装简单但需要内核兼容性检查。对于初学者,由于有更多示例和指南,Calico可能更容易。',
    
    faq4q: '网络策略怎么样?',
    faq4a: '两者都支持Kubernetes NetworkPolicy和自己的扩展策略。Cilium提供API感知策略(第7层),可以按HTTP方法、路径和Kafka主题过滤。Calico具有GlobalNetworkPolicy和应用层策略。Cilium的eBPF实现提供更高效的策略执行。',
    
    faq5q: '我可以从一个迁移到另一个吗?',
    faq5a: '可以,但需要仔细规划。迁移通常涉及创建新集群或排空节点、更改CNI并重新创建Pod。网络策略可能需要调整。首先在非生产环境中彻底测试。许多组织成功迁移,但要分配足够时间。',
    
    faq6q: '加密怎么样?',
    faq6a: 'Cilium使用IPsec或WireGuard通过eBPF提供透明加密,需要最少的配置。Calico支持WireGuard加密但需要更多设置。两者都可以与服务网格集成进行mTLS。对于开箱即用的加密,Cilium更简单。',
    
    faq7q: '它们如何处理服务网格?',
    faq7a: 'Cilium可以使用eBPF替代或与服务网格集成,实现无sidecar的mTLS和可观察性。Calico与Istio和Linkerd集成。Cilium的方法没有sidecar更高效。对于现有服务网格用户,Calico集成很简单。',
    
    faq8q: '哪个有更好的支持和社区?',
    faq8a: '两者都有强大的社区和商业支持。Calico有Tigera提供企业支持,市场存在时间更长。Cilium有Isovalent提供企业产品。两者都是CNCF项目,有活跃开发。Calico有更多历史部署经验,而Cilium采用率在增长。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function CiliumVsCalico({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsCiliumTitle}</h3>
      <p style={pStyle}>{ct.whatIsCiliumContent}</p>

      <h3 style={h3Style}>{ct.whatIsCalicoTitle}</h3>
      <p style={pStyle}>{ct.whatIsCalicoContent}</p>

      {/* Performance Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Cilium</th>
              <th style={thStyle}>Calico</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '吞吐量' : 'Throughput', isZh ? '极高' : 'Very High', isZh ? '高' : 'High'],
              [isZh ? '延迟' : 'Latency', isZh ? '极低' : 'Very Low', isZh ? '低' : 'Low'],
              [isZh ? 'CPU开销' : 'CPU Overhead', isZh ? '低(eBPF)' : 'Low (eBPF)', isZh ? '中等' : 'Medium'],
              [isZh ? '策略执行' : 'Policy Enforcement', isZh ? '内核级' : 'Kernel-level', isZh ? 'iptables/ebpf' : 'iptables/ebpf'],
              [isZh ? '连接跟踪' : 'Connection Tracking', 'eBPF maps', isZh ? 'iptables' : 'iptables'],
              [isZh ? '扩展性' : 'Scalability', '100K+ endpoints', '50K+ endpoints'],
              [isZh ? '内存占用' : 'Memory Usage', isZh ? '中等' : 'Medium', isZh ? '低-中等' : 'Low-Medium'],
              [isZh ? '网络延迟' : 'Network Latency', '<1ms', '1-2ms'],
            ].map(([metric, cilium, calico], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{cilium}</td>
                <td style={tdStyle}>{calico}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Cilium</th>
              <th style={thStyle}>Calico</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '网络模式' : 'Networking Mode', 'eBPF', 'BGP/VXLAN/IPIP'],
              [isZh ? 'K8s NetworkPolicy' : 'K8s NetworkPolicy', '✓', '✓'],
              [isZh ? '扩展网络策略' : 'Extended Policies', 'CiliumNetworkPolicy', 'GlobalNetworkPolicy'],
              [isZh ? 'L7策略(HTTP)' : 'L7 Policy (HTTP)', '✓ (内置)', '✓ (需Dikastes)'],
              [isZh ? '服务负载均衡' : 'Service LB', '✓ (eBPF)', '✓ (kube-proxy)'],
              [isZh ? 'Ingress控制器' : 'Ingress Controller', '✓', '✓'],
              [isZh ? '透明加密' : 'Transparent Encryption', '✓ (IPsec/WG)', '✓ (WireGuard)'],
              [isZh ? '网络可观察性' : 'Network Observability', 'Hubble', 'Calico Enterprise'],
              [isZh ? '服务网格集成' : 'Service Mesh', '✓ (无sidecar)', '✓ (Istio/Linkerd)'],
              [isZh ? 'IPAM' : 'IPAM', 'Cluster/Host scope', 'Multiple modes'],
              [isZh ? '双栈(IPv4/6)' : 'Dual Stack', '✓', '✓'],
              [isZh ? '带宽管理' : 'Bandwidth Mgmt', '✓', '✓'],
              [isZh ? '内核要求' : 'Kernel Required', '4.19+ (推荐5.10+)', '3.10+'],
              [isZh ? 'CNCF状态' : 'CNCF Status', 'Graduated', 'Incubating'],
            ].map(([feature, cilium, calico], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{cilium}</td>
                <td style={tdStyle}>{calico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f86734' }}>{ct.ciliumExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Cilium Installation and Configuration

# Install Cilium using Helm
helm repo add cilium https://helm.cilium.io/
helm install cilium cilium/cilium --version 1.14.0 \\
  --namespace kube-system \\
  --set kubeProxyReplacement=strict \\
  --set enableIPv4Masquerade=false \\
  --set encryption.enabled=true \\
  --set encryption.type=wireguard \\
  --set hubble.enabled=true \\
  --set hubble.relay.enabled=true \\
  --set hubble.ui.enabled=true

# Basic CiliumNetworkPolicy
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: api-policy
  namespace: default
spec:
  endpointSelector:
    matchLabels:
      app: api-server
  
  ingress:
    # Allow traffic from frontend
    - fromEndpoints:
        - matchLabels:
            app: frontend
      toPorts:
        - ports:
            - port: "8080"
              protocol: TCP
          rules:
            http:
              - method: "GET"
                path: "/api/v1/.*"
              - method: "POST"
                path: "/api/v1/users"
  
  egress:
    # Allow DNS
    - toEndpoints:
        - matchLabels:
            k8s:io.kubernetes.pod.namespace: kube-system
            k8s-app: kube-dns
      toPorts:
        - ports:
            - port: "53"
              protocol: UDP
    
    # Allow database access
    - toEndpoints:
        - matchLabels:
            app: postgres
      toPorts:
        - ports:
            - port: "5432"
              protocol: TCP

# L7-aware policy for Kafka
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: kafka-policy
spec:
  endpointSelector:
    matchLabels:
      app: kafka-consumer
  
  egress:
    - toEndpoints:
        - matchLabels:
            app: kafka
      toPorts:
        - ports:
            - port: "9092"
              protocol: TCP
          rules:
            kafka:
              - apiKey: "produce"
                topic: "orders"
              - apiKey: "fetch"
                topic: "notifications"

# Cilium Clusterwide Network Policy
apiVersion: cilium.io/v2
kind: CiliumClusterwideNetworkPolicy
metadata:
  name: deny-all-egress
spec:
  nodeSelector: {}
  endpointSelector: {}
  egress:
    - {}
  ingress: []

# Enable Hubble observability
apiVersion: v1
kind: ConfigMap
metadata:
  name: cilium-config
  namespace: kube-system
data:
  hubble-enabled: "true"
  hubble-metrics-server: ":9965"
  hubble-metrics: 
    "dns,drop,tcp,flow,icmp,http"

# Port forward Hubble UI
kubectl port-forward -n kube-system svc/hubble-ui 12000:80

# Cilium status check
cilium status
cilium service list
cilium endpoint list

# Hubble observe network flows
hubble observe -n default --pod api-server
hubble observe -n default --type trace

# Cilium with service mesh (no sidecar)
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: mTLS-policy
spec:
  endpointSelector:
    matchLabels:
      app: service-a
  egress:
    - toEndpoints:
        - matchLabels:
            app: service-b
      toPorts:
        - ports:
            - port: "8443"
              protocol: TCP
      # Automatic mTLS with service identity
      rules:
        authentication:
          mode: "required"`}</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.calicoExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Calico Installation and Configuration

# Install Calico using manifest
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.0/manifests/calico.yaml

# Or install using Helm
helm repo add projectcalico https://docs.projectcalico.org/charts
helm install calico projectcalico/tigera-operator --version v3.26.0

# Calico basic NetworkPolicy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: api-server
  
  policyTypes:
    - Ingress
    - Egress
  
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
  
  egress:
    # Allow DNS
    - to:
        - namespaceSelector:
            matchLabels:
              name: kube-system
          podSelector:
            matchLabels:
              k8s-app: kube-dns
      ports:
        - protocol: UDP
          port: 53
    
    # Allow database
    - to:
        - podSelector:
            matchLabels:
              app: postgres
      ports:
        - protocol: TCP
          port: 5432

# Calico GlobalNetworkPolicy (advanced)
apiVersion: crd.projectcalico.org/v1
kind: GlobalNetworkPolicy
metadata:
  name: deny-all-ingress
spec:
  selector: all()
  order: 0
  types:
    - Ingress
  ingress:
    - action: Deny

# Calico NetworkPolicy with HTTP rules
apiVersion: crd.projectcalico.org/v1
kind: NetworkPolicy
metadata:
  name: api-l7-policy
  namespace: default
spec:
  selector: app == 'api-server'
  types:
    - Ingress
  ingress:
    - action: Allow
      protocol: TCP
      source:
        selector: app == 'frontend'
      destination:
        ports:
          - 8080
      http:
        methods:
          - GET
          - POST
        paths:
          - exact: /api/v1/health
          - prefix: /api/v1/users

# Calico BGP Configuration
apiVersion: crd.projectcalico.org/v1
kind: BGPPeer
metadata:
  name: bgp-peer
spec:
  peerIP: 192.168.1.1
  asNumber: 64512
---
apiVersion: crd.projectcalico.org/v1
kind: BGPConfiguration
metadata:
  name: default
spec:
  asNumber: 64513
  serviceClusterIPs:
    - cidr: 10.96.0.0/12
  serviceExternalIPs:
    - cidr: 203.0.113.0/24

# Calico IP Pool
apiVersion: crd.projectcalico.org/v1
kind: IPPool
metadata:
  name: default-pool
spec:
  cidr: 192.168.0.0/16
  blockSize: 26
  ipipMode: CrossSubnet
  natOutgoing: true
  nodeSelector: all()

# Enable WireGuard encryption
apiVersion: crd.projectcalico.org/v1
kind: FelixConfiguration
metadata:
  name: default
spec:
  wireguardEnabled: true

# Calico with Istio integration
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-istio
  namespace: default
spec:
  podSelector: {}
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: istio-system

# Calico node status
calicoctl node status
calicoctl get nodes

# Check IP pools
calicoctl get ippools -o yaml

# Check BGP peers
calicoctl get bgppeers -o yaml

# View network policies
calicoctl get networkpolicy --all-namespaces
calicoctl get globalnetworkpolicy

# Calico Enterprise with observability
# (Requires Calico Enterprise license)
apiVersion: crd.projectcalico.org/v1
kind: NetworkSet
metadata:
  name: suspicious-ips
  namespace: default
spec:
  nets:
    - 203.0.113.0/24
    - 198.51.100.0/24

# Flow logs (Calico Enterprise)
kubectl logs -n calico-system -l k8s-app=calico-typha`}</code></pre>

      {/* Networking */}
      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Cilium</th>
              <th style={thStyle}>Calico</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据平面' : 'Data Plane', 'eBPF', 'iptables/ebpf'],
              [isZh ? '路由模式' : 'Routing Mode', isZh ? '原生/覆盖' : 'Native/Overlay', 'BGP/VXLAN/IPIP'],
              [isZh ? '负载均衡' : 'Load Balancing', 'eBPF L4/L7', 'kube-proxy/ebpf'],
              [isZh ? 'Overlay支持' : 'Overlay Support', 'VXLAN/Geneve', 'VXLAN/IPIP'],
              [isZh ? 'BGP支持' : 'BGP Support', isZh ? '有限' : 'Limited', isZh ? '完整' : 'Full'],
              [isZh ? '性能优化' : 'Performance Opt', isZh ? '自动' : 'Automatic', isZh ? '手动调优' : 'Manual tuning'],
              [isZh ? '多集群' : 'Multi-cluster', 'Cluster Mesh', 'Federation'],
              [isZh ? '云集成' : 'Cloud Integration', 'AWS/GCP/Azure', 'AWS/GCP/Azure'],
            ].map(([cat, cilium, calico], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{cilium}</td>
                <td style={tdStyle}>{calico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Observability */}
      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f86734' }}>
          <strong style={{ color: '#f86734' }}>Cilium Observability (Hubble)</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '深度网络可观察性:通过Hubble进行网络流可视化、L7协议解析(HTTP、Kafka、gRPC)、服务依赖图、DNS监控、策略决策日志。内置Prometheus指标和Grafana仪表盘。实时流量分析和历史查询。' : 'Deep network observability: network flow visualization via Hubble, L7 protocol parsing (HTTP, Kafka, gRPC), service dependency map, DNS monitoring, policy decision logs. Built-in Prometheus metrics and Grafana dashboards. Real-time traffic analysis and historical queries.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>Calico Observability</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '标准监控功能:通过calicoctl和kubectl进行网络流日志、策略审计日志、连接诊断工具。Calico Enterprise提供高级可观察性、流量可视化、动态服务图和威胁检测。开源版本功能较基础。' : 'Standard monitoring: network flow logs via calicoctl and kubectl, policy audit logs, connection diagnostics tools. Calico Enterprise provides advanced observability, traffic visualization, dynamic service graph, and threat detection. Open-source version has basic features.'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f86734' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f86734' }}>{ct.ciliumBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高性能网络需求' : 'High-performance networking'}</li>
            <li>{isZh ? '深度可观察性' : 'Deep observability'}</li>
            <li>{isZh ? 'API感知安全策略' : 'API-aware security policies'}</li>
            <li>{isZh ? '现代内核环境' : 'Modern kernel environments'}</li>
            <li>{isZh ? '服务网格集成' : 'Service mesh integration'}</li>
            <li>{isZh ? '零信任网络' : 'Zero-trust networking'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.calicoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '传统内核系统' : 'Legacy kernel systems'}</li>
            <li>{isZh ? 'BGP网络集成' : 'BGP network integration'}</li>
            <li>{isZh ? '混合云部署' : 'Hybrid cloud deployments'}</li>
            <li>{isZh ? '稳定生产环境' : 'Stable production environments'}</li>
            <li>{isZh ? '灵活网络配置' : 'Flexible network configuration'}</li>
            <li>{isZh ? '现有Istio用户' : 'Existing Istio users'}</li>
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
        <a href={"/" + lang + "/tools/ip-calculator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>IP Calculator</a>
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
