'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Falco vs Skipper: Runtime Security vs HTTP Router Comparison',
    intro: 'Falco and Skipper serve entirely different purposes in cloud-native environments. Falco is a cloud-native runtime security tool for threat detection, while Skipper is an HTTP router and reverse proxy for microservices. This comparison clarifies their distinct roles and how they complement each other.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Falco and Skipper are complementary tools, not competitors. Use Falco for runtime security, intrusion detection, and compliance monitoring. Use Skipper for HTTP routing, load balancing, and API gateway functionality. Security-focused organizations often use both together.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Falco is a runtime security tool; Skipper is an HTTP router/proxy',
    takeaway2: 'Falco detects threats and anomalies; Skipper routes traffic',
    takeaway3: 'Both are CNCF projects with active communities',
    takeaway4: 'Falco monitors system calls; Skipper handles HTTP routing',
    takeaway5: 'Falco integrates with SIEM/SOAR; Skipper integrates with Kubernetes Ingress',
    takeaway6: 'They can work together: Falco monitors Skipper containers',
    
    whatIsFalcoTitle: 'What is Falco?',
    whatIsFalcoContent: 'Falco is an open-source cloud-native runtime security tool developed by Sysdig and contributed to CNCF. It monitors system calls, Kubernetes audit logs, and cloud APIs to detect anomalous activity in applications and containers. Falco provides real-time threat detection with customizable rules and integrates with alerting systems.',
    
    whatIsSkipperTitle: 'What is Skipper?',
    whatIsSkipperContent: 'Skipper is an HTTP router and reverse proxy developed by Zalando, designed for microservices and Kubernetes environments. It serves as an ingress controller, API gateway, and load balancer. Skipper supports advanced routing rules, circuit breakers, rate limiting, and seamless Kubernetes integration.',
    
    performanceTitle: 'Core Function Comparison',
    performanceIntro: 'Understanding their fundamentally different purposes:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of capabilities:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Security rules and routing configuration:',
    
    falcoExampleTitle: 'Falco Security Rules',
    skipperExampleTitle: 'Skipper Routing Config',
    
    dataSourceTitle: 'Integration Ecosystem',
    dataSourceIntro: 'Supported integrations and platforms:',
    
    alertingTitle: 'Primary Use Cases',
    alertingIntro: 'When to use each tool:',
    
    useCasesTitle: 'Best Use Cases',
    falcoBestFor: 'Falco is Best For:',
    skipperBestFor: 'Skipper is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Falco and Skipper address completely different needs in cloud-native infrastructure. Falco provides essential runtime security, detecting threats and ensuring compliance. Skipper handles HTTP traffic management, serving as an ingress controller and API gateway. Use Falco to secure your containers and applications, and use Skipper to route and manage traffic. Together, they form part of a comprehensive cloud-native security and networking stack.',
    
    faq1q: 'Can Falco monitor Skipper?',
    faq1a: 'Yes, Falco can monitor Skipper containers just like any other container. Falco detects anomalous behavior in the Skipper process, such as unexpected system calls, file access, or network connections that might indicate compromise.',
    
    faq2q: 'Does Skipper provide security features?',
    faq2a: 'Skipper includes some security features like TLS termination, OAuth2 integration, and rate limiting. However, it is not a runtime security tool. For comprehensive threat detection, you would still need Falco or similar security tools.',
    
    faq3q: 'Which should I deploy first?',
    faq3a: 'If you need HTTP routing and have services to expose, deploy Skipper (or an alternative ingress). If you need container security monitoring, deploy Falco. Both are infrastructure-level concerns that should be addressed early in cloud-native adoption.',
    
    faq4q: 'Can they be used together?',
    faq4a: 'Absolutely. In fact, Falco can monitor Skipper containers for security anomalies. Many organizations run Falco for security monitoring while using Skipper or similar proxies for traffic management.',
    
    faq5q: 'What about service mesh?',
    faq5a: 'Skipper is not a service mesh. It is an HTTP router/ingress controller. For service mesh capabilities (mTLS, advanced traffic management), consider Istio or Linkerd. Falco can monitor service mesh components for security.',
    
    faq6q: 'How does Falco detect threats?',
    faq6a: 'Falco uses kernel modules or eBPF to capture system calls, then applies customizable rules to detect anomalous behavior. It monitors for privilege escalation, file access, network connections, process execution, and can correlate with Kubernetes audit logs.',
    
    faq7q: 'What protocols does Skipper support?',
    faq7a: 'Skipper primarily handles HTTP/HTTPS traffic. It supports HTTP/2, WebSockets, and can terminate TLS. For TCP/UDP routing, you would need additional tools or different ingress controllers.',
    
    faq8q: 'Are there alternatives to consider?',
    faq8a: 'For runtime security: Tracee, Tetragon, Aqua Security. For HTTP routing: Nginx Ingress, Traefik, Envoy, Kong. Choose based on your specific requirements for security depth, routing capabilities, and Kubernetes integration.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Falco vs Skipper：运行时安全 vs HTTP 路由器对比',
    intro: 'Falco 和 Skipper 在云原生环境中服务于完全不同的目的。Falco 是云原生运行时安全工具，用于威胁检测；Skipper 是用于微服务的 HTTP 路由器和反向代理。本比较阐明它们的不同角色以及如何相互补充。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Falco 和 Skipper 是互补的工具，而非竞争对手。使用 Falco 进行运行时安全、入侵检测和合规监控。使用 Skipper 进行 HTTP 路由、负载均衡和 API 网关功能。注重安全的组织通常同时使用两者。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Falco 是运行时安全工具；Skipper 是 HTTP 路由器/代理',
    takeaway2: 'Falco 检测威胁和异常；Skipper 路由流量',
    takeaway3: '两者都是 CNCF 项目，有活跃的社区',
    takeaway4: 'Falco 监控系统调用；Skipper 处理 HTTP 路由',
    takeaway5: 'Falco 与 SIEM/SOAR 集成；Skipper 与 Kubernetes Ingress 集成',
    takeaway6: '它们可以协同工作：Falco 监控 Skipper 容器',
    
    whatIsFalcoTitle: '什么是 Falco？',
    whatIsFalcoContent: 'Falco 是由 Sysdig 开发并贡献给 CNCF 的开源云原生运行时安全工具。它监控系统调用、Kubernetes 审计日志和云 API，以检测应用和容器中的异常活动。Falco 提供带有可自定义规则的实时威胁检测，并与告警系统集成。',
    
    whatIsSkipperTitle: '什么是 Skipper？',
    whatIsSkipperContent: 'Skipper 是由 Zalando 开发的 HTTP 路由器和反向代理，专为微服务和 Kubernetes 环境设计。它充当入口控制器、API 网关和负载均衡器。Skipper 支持高级路由规则、熔断器、速率限制和无缝 Kubernetes 集成。',
    
    performanceTitle: '核心功能比较',
    performanceIntro: '理解它们根本不同的目的：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '安全规则和路由配置：',
    
    falcoExampleTitle: 'Falco 安全规则',
    skipperExampleTitle: 'Skipper 路由配置',
    
    dataSourceTitle: '集成生态',
    dataSourceIntro: '支持的集成和平台：',
    
    alertingTitle: '主要使用场景',
    alertingIntro: '何时使用每个工具：',
    
    useCasesTitle: '最佳用例',
    falcoBestFor: 'Falco 最适合：',
    skipperBestFor: 'Skipper 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Falco 和 Skipper 解决云原生基础设施中完全不同的需求。Falco 提供必要的运行时安全，检测威胁并确保合规。Skipper 处理 HTTP 流量管理，充当入口控制器和 API 网关。使用 Falco 保护容器和应用安全，使用 Skipper 路由和管理流量。两者共同构成全面云原生安全和网络堆栈的一部分。',
    
    faq1q: 'Falco 可以监控 Skipper 吗？',
    faq1a: '是的，Falco 可以像监控任何其他容器一样监控 Skipper 容器。Falco 检测 Skipper 进程中的异常行为，如意外的系统调用、文件访问或可能表明被入侵的网络连接。',
    
    faq2q: 'Skipper 提供安全功能吗？',
    faq2a: 'Skipper 包含一些安全功能，如 TLS 终止、OAuth2 集成和速率限制。但是，它不是运行时安全工具。要获得全面的威胁检测，你仍然需要 Falco 或类似的安全工具。',
    
    faq3q: '应该先部署哪个？',
    faq3a: '如果需要 HTTP 路由并有服务要暴露，部署 Skipper（或替代入口）。如果需要容器安全监控，部署 Falco。两者都是云原生采用早期应解决的基础设施级别问题。',
    
    faq4q: '可以一起使用吗？',
    faq4a: '当然可以。实际上，Falco 可以监控 Skipper 容器的安全异常。许多组织运行 Falco 进行安全监控，同时使用 Skipper 或类似代理进行流量管理。',
    
    faq5q: '服务网格呢？',
    faq5a: 'Skipper 不是服务网格。它是 HTTP 路由器/入口控制器。要获得服务网格功能（mTLS、高级流量管理），请考虑 Istio 或 Linkerd。Falco 可以监控服务网格组件的安全性。',
    
    faq6q: 'Falco 如何检测威胁？',
    faq6a: 'Falco 使用内核模块或 eBPF 捕获系统调用，然后应用可自定义的规则检测异常行为。它监控权限提升、文件访问、网络连接、进程执行，并可以与 Kubernetes 审计日志关联。',
    
    faq7q: 'Skipper 支持哪些协议？',
    faq7a: 'Skipper 主要处理 HTTP/HTTPS 流量。它支持 HTTP/2、WebSockets，可以终止 TLS。对于 TCP/UDP 路由，需要额外的工具或不同的入口控制器。',
    
    faq8q: '有替代方案吗？',
    faq8a: '对于运行时安全：Tracee、Tetragon、Aqua Security。对于 HTTP 路由：Nginx Ingress、Traefik、Envoy、Kong。根据你对安全深度、路由能力和 Kubernetes 集成的具体要求选择。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function FalcoVsSkipper({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6q } },
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

  const falcoCode = '// Falco security rules\n' +
    '- rule: Detect Privilege Escalation\n' +
    '  desc: Detect privilege escalation via setuid\n' +
    '  condition: >\n' +
    '    spawned_process and container and\n' +
    '    proc.name in (su, sudo, suexec) and\n' +
    '    proc.suid != 0\n' +
    '  output: >\n' +
    '    Privilege escalation detected\n' +
    '    (user=%user.name container=%container.id process=%proc.name)\n' +
    '  priority: WARNING\n' +
    '  tags: [container, privilege]\n' +
    '\n' +
    '- rule: Shell Spawned in Container\n' +
    '  desc: Detect shell spawned in a container\n' +
    '  condition: >\n' +
    '    spawned_process and container and\n' +
    '    proc.name in (bash, sh, zsh, ash)\n' +
    '  output: >\n' +
    '    Shell spawned in container\n' +
    '    (container=%container.id shell=%proc.name user=%user.name)\n' +
    '  priority: NOTICE\n' +
    '  tags: [container, shell]\n' +
    '\n' +
    '- rule: Sensitive File Access\n' +
    '  desc: Detect access to sensitive files\n' +
    '  condition: >\n' +
    '    open_read and container and\n' +
    '    fd.name in (/etc/shadow, /etc/passwd, /etc/hosts)\n' +
    '  output: >\n' +
    '    Sensitive file accessed\n' +
    '    (file=%fd.name container=%container.id user=%user.name)\n' +
    '  priority: WARNING\n' +
    '  tags: [container, filesystem]\n' +
    '\n' +
    '// Falco Kubernetes deployment\n' +
    'kubectl apply -f https://raw.githubusercontent.com/falcosecurity/falco/master/deploy/kubernetes/falco.yaml';

  const skipperCode = '// Skipper Kubernetes Ingress deployment\n' +
    'apiVersion: apps/v1\n' +
    'kind: Deployment\n' +
    'metadata:\n' +
    '  name: skipper-ingress\n' +
    '  namespace: kube-system\n' +
    'spec:\n' +
    '  replicas: 2\n' +
    '  selector:\n' +
    '    matchLabels:\n' +
    '      app: skipper-ingress\n' +
    '  template:\n' +
    '    metadata:\n' +
    '      labels:\n' +
    '        app: skipper-ingress\n' +
    '    spec:\n' +
    '      containers:\n' +
    '      - name: skipper\n' +
    '        image: registry.opensource.zalan.do/pathfinder/skipper:latest\n' +
    '        args:\n' +
    '          - "skipper"\n' +
    '          - "-kubernetes"\n' +
    '          - "-kubernetes-in-cluster"\n' +
    '        ports:\n' +
    '        - containerPort: 9999\n' +
    '\n' +
    '// Skipper Ingress routes (eskip format)\n' +
    '// Route with rate limiting\n' +
    'apiRateLimit: Path("/api/*")\n' +
    '  -> ratelimit(100, "1m")\n' +
    '  -> "https://api-backend"\n' +
    '\n' +
    '// Route with circuit breaker\n' +
    'apiCircuitBreaker: Path("/api/*")\n' +
    '  -> circuitBreaker(50, "10s", "5m")\n' +
    '  -> "https://api-backend"\n' +
    '\n' +
    '// Route with OAuth2\n' +
    'secureApi: Path("/secure/*")\n' +
    '  -> oauth2introspection("https://auth.example.com/introspect")\n' +
    '  -> "https://secure-backend"';

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #8b5cf6', background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsFalcoTitle}</h3>
      <p style={pStyle}>{ct.whatIsFalcoContent}</p>

      <h3 style={h3Style}>{ct.whatIsSkipperTitle}</h3>
      <p style={pStyle}>{ct.whatIsSkipperContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '维度' : 'Aspect'}</th>
              <th style={thStyle}>Falco</th>
              <th style={thStyle}>Skipper</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心功能' : 'Core Function', isZh ? '运行时安全' : 'Runtime security', isZh ? 'HTTP 路由' : 'HTTP routing'],
              [isZh ? '类型' : 'Type', isZh ? '安全监控' : 'Security monitoring', isZh ? '反向代理/Ingress' : 'Reverse proxy/Ingress'],
              [isZh ? 'CNCF 状态' : 'CNCF Status', isZh ? '孵化中' : 'Incubating', isZh ? '沙箱' : 'Sandbox'],
              [isZh ? '主要输入' : 'Primary Input', isZh ? '系统调用/日志' : 'Syscalls/logs', isZh ? 'HTTP 请求' : 'HTTP requests'],
              [isZh ? '主要输出' : 'Primary Output', isZh ? '安全告警' : 'Security alerts', isZh ? '路由流量' : 'Routed traffic'],
              [isZh ? '协议支持' : 'Protocol', isZh ? '内核/审计日志' : 'Kernel/audit logs', isZh ? 'HTTP/HTTPS' : 'HTTP/HTTPS'],
              [isZh ? '部署位置' : 'Deployment', isZh ? '每个节点' : 'Per node', isZh ? '集群入口' : 'Cluster ingress'],
              [isZh ? '替代品' : 'Alternatives', isZh ? 'Tracee, Tetragon' : 'Tracee, Tetragon', isZh ? 'Nginx, Traefik' : 'Nginx, Traefik'],
            ].map(([aspect, falco, skipper], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{falco}</td>
                <td style={tdStyle}>{skipper}</td>
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
              <th style={thStyle}>Falco</th>
              <th style={thStyle}>Skipper</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '威胁检测' : 'Threat Detection', isZh ? '核心功能' : 'Core feature', isZh ? '无' : 'None'],
              [isZh ? '负载均衡' : 'Load Balancing', isZh ? '无' : 'None', isZh ? '核心功能' : 'Core feature'],
              [isZh ? '规则引擎' : 'Rules Engine', isZh ? '安全规则' : 'Security rules', isZh ? '路由规则' : 'Routing rules'],
              [isZh ? 'TLS 支持' : 'TLS Support', isZh ? '检测 TLS 问题' : 'Detect TLS issues', isZh ? '终止/传递' : 'Terminate/passthrough'],
              [isZh ? 'Kubernetes 集成' : 'Kubernetes Integration', isZh ? '审计日志' : 'Audit logs', isZh ? 'Ingress 控制器' : 'Ingress controller'],
              [isZh ? '告警输出' : 'Alert Output', isZh ? '多通道' : 'Multi-channel', isZh ? '指标/日志' : 'Metrics/logs'],
              [isZh ? '熔断器' : 'Circuit Breaker', isZh ? '无' : 'None', isZh ? '内置' : 'Built-in'],
              [isZh ? '速率限制' : 'Rate Limiting', isZh ? '无' : 'None', isZh ? '内置' : 'Built-in'],
            ].map(([cap, falco, skipper], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{falco}</td>
                <td style={tdStyle}>{skipper}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.falcoExampleTitle}</h3>
      <pre style={codeStyle}><code>{falcoCode}</code></pre>

      <h3 style={{ ...h3Style, color: '#ec4899' }}>{ct.skipperExampleTitle}</h3>
      <pre style={codeStyle}><code>{skipperCode}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>Falco</th>
              <th style={thStyle}>Skipper</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'SIEM 集成' : 'SIEM Integration', isZh ? 'Splunk, ELK, Datadog' : 'Splunk, ELK, Datadog', isZh ? '不适用' : 'N/A'],
              [isZh ? 'SOAR 集成' : 'SOAR Integration', isZh ? '多种平台' : 'Multiple platforms', isZh ? '不适用' : 'N/A'],
              [isZh ? 'Kubernetes' : 'Kubernetes', isZh ? 'DaemonSet 部署' : 'DaemonSet deploy', isZh ? 'Ingress 控制器' : 'Ingress controller'],
              [isZh ? '服务发现' : 'Service Discovery', isZh ? '不适用' : 'N/A', isZh ? 'K8s 原生' : 'K8s native'],
              [isZh ? '指标导出' : 'Metrics Export', isZh ? 'Prometheus' : 'Prometheus', isZh ? 'Prometheus' : 'Prometheus'],
            ].map(([cat, falco, skipper], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{falco}</td>
                <td style={tdStyle}>{skipper}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>Use Falco When:</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要运行时威胁检测，监控容器行为，满足合规要求（PCI-DSS, GDPR），检测权限提升，监控系统调用异常。' : 'You need runtime threat detection, monitoring container behavior, meeting compliance requirements (PCI-DSS, GDPR), detecting privilege escalation, monitoring system call anomalies.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ec4899' }}>
          <strong style={{ color: '#ec4899' }}>Use Skipper When:</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要 Kubernetes Ingress 控制器，HTTP 流量路由，负载均衡，API 网关功能，高级路由规则，熔断和速率限制。' : 'You need Kubernetes Ingress controller, HTTP traffic routing, load balancing, API gateway functionality, advanced routing rules, circuit breaking and rate limiting.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.falcoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '运行时安全' : 'Runtime security'}</li>
            <li>{isZh ? '入侵检测' : 'Intrusion detection'}</li>
            <li>{isZh ? '合规监控' : 'Compliance monitoring'}</li>
            <li>{isZh ? '威胁狩猎' : 'Threat hunting'}</li>
            <li>{isZh ? '审计跟踪' : 'Audit trail'}</li>
            <li>{isZh ? '异常检测' : 'Anomaly detection'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ec4899' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ec4899' }}>{ct.skipperBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Kubernetes Ingress' : 'Kubernetes Ingress'}</li>
            <li>{isZh ? 'HTTP 路由' : 'HTTP routing'}</li>
            <li>{isZh ? 'API 网关' : 'API gateway'}</li>
            <li>{isZh ? '负载均衡' : 'Load balancing'}</li>
            <li>{isZh ? '流量管理' : 'Traffic management'}</li>
            <li>{isZh ? '微服务路由' : 'Microservice routing'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/yaml-validator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Validator</a> • {' '}
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
