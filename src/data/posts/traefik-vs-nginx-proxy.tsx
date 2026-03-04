'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Traefik vs Nginx Proxy: Reverse Proxy and Load Balancer Comparison',
    intro: 'Traefik and Nginx are two leading solutions for reverse proxying and load balancing in modern infrastructure. Traefik, built for the cloud-native era, offers automatic service discovery and dynamic configuration. Nginx, the industry veteran, provides battle-tested performance and extensive features. This comparison examines their approaches to modern traffic management.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Traefik for cloud-native environments, automatic service discovery, and dynamic configuration without restarts. Choose Nginx for maximum performance, extensive features, and when you need fine-grained control over routing and load balancing. Both excel in different scenarios: Traefik for modern microservices, Nginx for traditional and high-performance deployments.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Traefik has native container orchestration integration',
    takeaway2: 'Nginx offers higher raw performance and more features',
    takeaway3: 'Traefik provides automatic service discovery',
    takeaway4: 'Nginx requires manual configuration reload',
    takeaway5: 'Traefik has built-in Let\'s Encrypt support',
    takeaway6: 'Nginx has more mature ecosystem and documentation',
    
    whatIsTraefikTitle: 'What is Traefik?',
    whatIsTraefikContent: 'Traefik is an open-source modern HTTP reverse proxy and load balancer designed for microservices. Created by Containous (now Traefik Labs), it integrates natively with container orchestrators like Docker, Kubernetes, and Swarm. Traefik automatically discovers services, routes traffic, and updates configuration without restarts. It supports automatic HTTPS with Let\'s Encrypt.',
    
    whatIsNginxTitle: 'What is Nginx Proxy?',
    whatIsNginxContent: 'Nginx is a high-performance web server, reverse proxy, and load balancer. Originally released in 2004, it has become the standard for high-traffic websites and applications. Nginx offers extensive features including HTTP/2, WebSocket, gRPC proxying, advanced load balancing algorithms, and caching. It requires manual configuration but provides maximum control and performance.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks and performance characteristics:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Configuration patterns for common scenarios:',
    
    traefikExampleTitle: 'Traefik Configuration',
    nginxExampleTitle: 'Nginx Proxy Configuration',
    
    dataSourceTitle: 'Service Discovery and Orchestration',
    dataSourceIntro: 'Integration with container platforms:',
    
    alertingTitle: 'SSL/TLS Management',
    alertingIntro: 'Certificate management and HTTPS:',
    
    useCasesTitle: 'Best Use Cases',
    traefikBestFor: 'Traefik is Best For:',
    nginxBestFor: 'Nginx is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Traefik and Nginx serve different primary audiences. Traefik excels in cloud-native environments where automatic service discovery, dynamic configuration, and container integration are priorities. It simplifies operations in microservices architectures. Nginx remains the choice for high-performance, feature-rich deployments where fine-grained control and proven reliability are essential. Many organizations use both: Traefik for internal microservices and Nginx for edge traffic and high-performance requirements.',
    
    faq1q: 'Which is better for Kubernetes?',
    faq1a: 'Both work well with Kubernetes. Traefik has native Kubernetes Ingress support and automatic endpoint discovery. Nginx has the stable Nginx Ingress Controller with extensive customization. Traefik offers easier setup, while Nginx provides more control. Choice depends on your preference for automation vs. control.',
    
    faq2q: 'How do they handle configuration updates?',
    faq2a: 'Traefik automatically detects changes from orchestrators and updates routing without restarts. Nginx requires configuration file updates and a reload (nginx -s reload) to apply changes. For dynamic environments, Traefik\'s approach is more convenient. For stable deployments, Nginx\'s approach is predictable.',
    
    faq3q: 'Which has better performance?',
    faq3a: 'Nginx typically has higher raw performance, especially for static content and high-concurrency scenarios. Traefik performance is good for most use cases but adds overhead for service discovery and dynamic configuration. For maximum performance, Nginx is superior.',
    
    faq4q: 'What about SSL certificate management?',
    faq4a: 'Traefik has built-in automatic Let\'s Encrypt certificate provisioning and renewal. Nginx requires external tools like Certbot or manual certificate management. For automatic HTTPS, Traefik is significantly easier. Nginx offers more control over certificate configuration.',
    
    faq5q: 'Can I use both together?',
    faq5a: 'Yes, many organizations use both. Common pattern: Nginx as edge load balancer handling external traffic, Traefik as internal service mesh for microservices. This combines Nginx performance with Traefik\'s service discovery capabilities.',
    
    faq6q: 'Which is easier to learn?',
    faq6a: 'Traefik is easier to start with for containerized environments due to automatic discovery. Nginx has a steeper learning curve but offers more resources and documentation. For Docker/Kubernetes users, Traefik feels more natural. For traditional deployments, Nginx concepts are more straightforward.',
    
    faq7q: 'What about observability and metrics?',
    faq7a: 'Both provide good observability. Traefik has built-in Prometheus metrics, health checks, and a dashboard. Nginx requires additional modules (VTS, stub status) for metrics but offers more third-party monitoring integrations. Traefik\'s dashboard is more user-friendly out of the box.',
    
    faq8q: 'How do they compare for WebSocket?',
    faq8a: 'Both support WebSocket proxying. Nginx requires explicit WebSocket upgrade headers in configuration. Traefik handles WebSocket automatically with minimal configuration. For WebSocket-heavy applications, both work well but Traefik setup is simpler.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Traefik vs Nginx Proxy: 反向代理和负载均衡器对比',
    intro: 'Traefik和Nginx是现代基础设施中反向代理和负载均衡的两个领先解决方案。Traefik为云原生时代构建,提供自动服务发现和动态配置。Nginx作为行业老兵,提供久经考验的性能和丰富功能。本比较考察它们在现代流量管理中的方法。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为云原生环境、自动服务发现和无需重启的动态配置选择Traefik。为最大性能、丰富功能和需要细粒度的路由和负载均衡控制选择Nginx。两者在不同场景中表现出色:Traefik用于现代微服务,Nginx用于传统和高性能部署。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Traefik具有原生容器编排集成',
    takeaway2: 'Nginx提供更高的原始性能和更多功能',
    takeaway3: 'Traefik提供自动服务发现',
    takeaway4: 'Nginx需要手动配置重载',
    takeaway5: 'Traefik内置Let\'s Encrypt支持',
    takeaway6: 'Nginx拥有更成熟的生态系统和文档',
    
    whatIsTraefikTitle: '什么是Traefik?',
    whatIsTraefikContent: 'Traefik是一个开源的现代HTTP反向代理和负载均衡器,专为微服务设计。由Containous(现为Traefik Labs)创建,它与Docker、Kubernetes和Swarm等容器编排器原生集成。Traefik自动发现服务、路由流量并无需重启更新配置。它支持使用Let\'s Encrypt自动HTTPS。',
    
    whatIsNginxTitle: '什么是Nginx Proxy?',
    whatIsNginxContent: 'Nginx是一个高性能Web服务器、反向代理和负载均衡器。最初于2004年发布,它已成为高流量网站和应用程序的标准。Nginx提供丰富的功能,包括HTTP/2、WebSocket、gRPC代理、高级负载均衡算法和缓存。它需要手动配置但提供最大控制和性能。',
    
    performanceTitle: '性能对比',
    performanceIntro: '基准测试和性能特征:',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较:',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '常见场景的配置模式:',
    
    traefikExampleTitle: 'Traefik配置',
    nginxExampleTitle: 'Nginx代理配置',
    
    dataSourceTitle: '服务发现和编排',
    dataSourceIntro: '与容器平台集成:',
    
    alertingTitle: 'SSL/TLS管理',
    alertingIntro: '证书管理和HTTPS:',
    
    useCasesTitle: '最佳用例',
    traefikBestFor: 'Traefik最适合:',
    nginxBestFor: 'Nginx最适合:',
    
    conclusionTitle: '结论',
    conclusionContent: 'Traefik和Nginx服务于不同的主要受众。Traefik在云原生环境中表现出色,其中自动服务发现、动态配置和容器集成是优先事项。它简化了微服务架构中的运维。Nginx仍然是高性能、功能丰富部署的选择,其中细粒度控制和经过验证的可靠性至关重要。许多组织同时使用两者:Traefik用于内部微服务,Nginx用于边缘流量和高性能需求。',
    
    faq1q: '哪个更适合Kubernetes?',
    faq1a: '两者都与Kubernetes良好配合。Traefik具有原生Kubernetes Ingress支持和自动端点发现。Nginx有稳定的Nginx Ingress Controller,具有广泛的定制功能。Traefik提供更简单的设置,而Nginx提供更多控制。选择取决于你对自动化与控制的偏好。',
    
    faq2q: '它们如何处理配置更新?',
    faq2a: 'Traefik自动检测来自编排器的更改并无需重启更新路由。Nginx需要配置文件更新和重载(nginx -s reload)来应用更改。对于动态环境,Traefik的方法更方便。对于稳定部署,Nginx的方法更可预测。',
    
    faq3q: '哪个性能更好?',
    faq3a: 'Nginx通常具有更高的原始性能,特别是对于静态内容和高并发场景。Traefik对于大多数用例性能良好,但为服务发现和动态配置增加了开销。对于最大性能,Nginx更优越。',
    
    faq4q: 'SSL证书管理怎么样?',
    faq4a: 'Traefik内置自动Let\'s Encrypt证书配置和续订。Nginx需要Certbot等外部工具或手动证书管理。对于自动HTTPS,Traefik明显更容易。Nginx对证书配置提供更多控制。',
    
    faq5q: '我可以同时使用两者吗?',
    faq5a: '是的,许多组织同时使用两者。常见模式:Nginx作为边缘负载均衡器处理外部流量,Traefik作为内部服务网格用于微服务。这结合了Nginx性能和Traefik的服务发现能力。',
    
    faq6q: '哪个更容易学习?',
    faq6a: '对于容器化环境,Traefik由于自动发现更容易开始。Nginx学习曲线更陡,但提供更多资源和文档。对于Docker/Kubernetes用户,Traefik感觉更自然。对于传统部署,Nginx概念更直接。',
    
    faq7q: '可观察性和指标怎么样?',
    faq7a: '两者都提供良好的可观察性。Traefik内置Prometheus指标、健康检查和仪表盘。Nginx需要额外模块(VTS、stub status)用于指标,但提供更多第三方监控集成。Traefik的仪表盘开箱即用更友好。',
    
    faq8q: '它们在WebSocket方面如何比较?',
    faq8a: '两者都支持WebSocket代理。Nginx需要在配置中显式WebSocket升级头。Traefik以最少的配置自动处理WebSocket。对于WebSocket重度应用,两者都工作良好但Traefik设置更简单。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TraefikVsNginxProxy({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsTraefikTitle}</h3>
      <p style={pStyle}>{ct.whatIsTraefikContent}</p>

      <h3 style={h3Style}>{ct.whatIsNginxTitle}</h3>
      <p style={pStyle}>{ct.whatIsNginxContent}</p>

      {/* Performance Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Traefik</th>
              <th style={thStyle}>Nginx</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '并发连接' : 'Concurrent Connections', '10K+', '50K+'],
              [isZh ? '请求/秒' : 'Requests/Second', '50K-100K', '100K-500K'],
              [isZh ? '延迟' : 'Latency', isZh ? '低' : 'Low', isZh ? '极低' : 'Very Low'],
              [isZh ? '内存占用' : 'Memory Usage', '50-100 MB', '10-20 MB'],
              [isZh ? 'CPU效率' : 'CPU Efficiency', isZh ? '高' : 'High', isZh ? '极高' : 'Very High'],
              [isZh ? '启动时间' : 'Startup Time', isZh ? '中等' : 'Medium', isZh ? '快' : 'Fast'],
              [isZh ? '配置重载' : 'Config Reload', isZh ? '无需重启' : 'No restart', isZh ? '需要重载' : 'Reload needed'],
              [isZh ? '基准测试排名' : 'Benchmark Rank', 'High Tier', 'Top Tier'],
            ].map(([metric, traefik, nginx], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{traefik}</td>
                <td style={tdStyle}>{nginx}</td>
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
              <th style={thStyle}>Traefik</th>
              <th style={thStyle}>Nginx</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '自动服务发现' : 'Auto Service Discovery', '✓', '✗'],
              [isZh ? '动态配置' : 'Dynamic Config', '✓', isZh ? '有限(Plus)' : 'Limited (Plus)'],
              [isZh ? '负载均衡' : 'Load Balancing', '✓', '✓'],
              [isZh ? 'SSL/TLS终止' : 'SSL/TLS Termination', '✓', '✓'],
              [isZh ? '自动HTTPS' : 'Auto HTTPS', '✓ (Let\'s Encrypt)', '✗ (需Certbot)'],
              [isZh ? 'HTTP/2' : 'HTTP/2', '✓', '✓'],
              [isZh ? 'HTTP/3' : 'HTTP/3', '✓', '✓ (1.25+)'],
              [isZh ? 'WebSocket' : 'WebSocket', '✓ (自动)', '✓ (手动配置)'],
              [isZh ? 'gRPC' : 'gRPC', '✓', '✓'],
              [isZh ? '健康检查' : 'Health Checks', '✓', '✓ (Plus)'],
              [isZh ? '熔断' : 'Circuit Breaker', '✓', '✗'],
              [isZh ? '重试机制' : 'Retry', '✓', '✓ (Plus)'],
              [isZh ? '速率限制' : 'Rate Limiting', '✓', '✓'],
              [isZh ? '缓存' : 'Caching', isZh ? '有限' : 'Limited', '✓'],
              [isZh ? 'Prometheus指标' : 'Prometheus Metrics', '✓ (内置)', '✓ (需模块)'],
              [isZh ? 'Web仪表盘' : 'Web Dashboard', '✓', '✗'],
            ].map(([feature, traefik, nginx], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{traefik}</td>
                <td style={tdStyle}>{nginx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#24a1c1' }}>{ct.traefikExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Traefik Configuration Examples

# traefik.yml - Static configuration
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: web
  file:
    filename: /etc/traefik/dynamic.yml

certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@example.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web

api:
  dashboard: true
  insecure: false

metrics:
  prometheus: true

# Dynamic configuration (dynamic.yml)
http:
  routers:
    api-router:
      rule: "Host('api.example.com')"
      service: api-service
      entryPoints:
        - websecure
      tls:
        certResolver: letsencrypt
      middlewares:
        - rate-limit
        - security-headers

  services:
    api-service:
      loadBalancer:
        servers:
          - url: "http://api-server-1:8000"
          - url: "http://api-server-2:8000"
          - url: "http://api-server-3:8000"
        healthCheck:
          path: /health
          interval: 10s
          timeout: 3s
        sticky:
          cookie:
            name: server_id
            secure: true
            httpOnly: true

  middlewares:
    rate-limit:
      rateLimit:
        average: 100
        burst: 50
        period: 1m
    
    security-headers:
      headers:
        frameDeny: true
        browserXssFilter: true
        contentTypeNosniff: true
        forceSTSHeader: true
        stsIncludeSubdomains: true
        stsPreload: true
        stsSeconds: 31536000

# Docker Compose with Traefik labels
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    command:
      - "--api.dashboard=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.email=admin@example.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dashboard.rule=Host('traefik.example.com')"
      - "traefik.http.routers.dashboard.service=api@internal"
      - "traefik.http.routers.dashboard.middlewares=auth"
      - "traefik.http.middlewares.auth.basicauth.users=admin:$$apr1$$..."

  api:
    image: myapp:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.api.rule=Host('api.example.com')"
      - "traefik.http.routers.api.entrypoints=websecure"
      - "traefik.http.routers.api.tls.certresolver=letsencrypt"
      - "traefik.http.services.api.loadbalancer.server.port=8000"
      - "traefik.http.services.api.loadbalancer.healthcheck.path=/health"
      - "traefik.http.services.api.loadbalancer.healthcheck.interval=10s"
    deploy:
      replicas: 3

# Kubernetes Ingress with Traefik
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: api-ingress
  namespace: default
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host('api.example.com') && PathPrefix('/v1')
      kind: Rule
      services:
        - name: api-service
          port: 8000
          strategy: RoundRobin
      middlewares:
        - name: rate-limit
        - name: security-headers
  tls:
    certResolver: letsencrypt`}</code></pre>

      <h3 style={{ ...h3Style, color: '#009639' }}>{ct.nginxExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Nginx Proxy Configuration Examples

# nginx.conf - Basic reverse proxy
upstream backend {
    least_conn;
    server backend1.example.com:8000 weight=5;
    server backend2.example.com:8000;
    server backend3.example.com:8000 backup;
    keepalive 32;
    
    # Health checks (requires Nginx Plus or third-party module)
    # health_check interval=10s fails=3 passes=2;
}

server {
    listen 80;
    server_name api.example.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;
    
    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_conn_zone $binary_remote_addr zone=conn_limit:10m;
    
    location / {
        limit_req zone=api_limit burst=20 nodelay;
        limit_conn conn_limit 10;
        
        proxy_pass http://backend;
        proxy_http_version 1.1;
        
        # Proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "";
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffering
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }
    
    # WebSocket support
    location /ws/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\\n";
        add_header Content-Type text/plain;
    }
}

# Load balancing with multiple upstreams
upstream api_v1 {
    server api-v1-1:8000;
    server api-v1-2:8000;
}

upstream api_v2 {
    server api-v2-1:8000;
    server api-v2-2:8000;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;
    
    # SSL config...
    
    location /v1/ {
        proxy_pass http://api_v1/;
    }
    
    location /v2/ {
        proxy_pass http://api_v2/;
    }
}

# Caching configuration
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m 
                 max_size=1g inactive=60m use_temp_path=off;

server {
    location /api/data {
        proxy_cache api_cache;
        proxy_cache_valid 200 10m;
        proxy_cache_key $scheme$proxy_host$request_uri;
        add_header X-Cache-Status $upstream_cache_status;
        proxy_pass http://backend;
    }
}

# Docker Compose with Nginx
version: '3.8'

services:
  nginx:
    image: nginx:1.25-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - api
    
  api:
    image: myapp:latest
    expose:
      - "8000"
    deploy:
      replicas: 3

# Kubernetes Nginx Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
spec:
  tls:
    - hosts:
        - api.example.com
      secretName: api-tls
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 8000`}</code></pre>

      {/* Service Discovery */}
      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Traefik</th>
              <th style={thStyle}>Nginx</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Docker', isZh ? '原生集成' : 'Native', isZh ? '手动配置' : 'Manual config'],
              ['Docker Swarm', isZh ? '原生集成' : 'Native', isZh ? '手动配置' : 'Manual config'],
              ['Kubernetes', isZh ? 'Ingress/CRD' : 'Ingress/CRD', 'Ingress Controller'],
              ['Consul', isZh ? '原生集成' : 'Native', isZh ? '需额外配置' : 'Extra setup'],
              ['Marathon/Mesos', isZh ? '原生集成' : 'Native', isZh ? '不支持' : 'No support'],
              ['ECS', isZh ? '原生集成' : 'Native', isZh ? '需额外配置' : 'Extra setup'],
              ['Rancher', isZh ? '原生集成' : 'Native', isZh ? 'Ingress支持' : 'Ingress support'],
              ['Service Mesh', 'Traefik Mesh', 'Nginx Service Mesh'],
            ].map(([platform, traefik, nginx], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={tdStyle}>{traefik}</td>
                <td style={tdStyle}>{nginx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SSL/TLS */}
      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #24a1c1' }}>
          <strong style={{ color: '#24a1c1' }}>Traefik SSL/TLS</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '内置自动HTTPS:自动Let\'s Encrypt证书配置和续订、支持多个证书解析器、通配符证书、证书存储。零配置即可获得HTTPS,支持SNI和动态证书加载。' : 'Built-in automatic HTTPS: automatic Let\'s Encrypt provisioning and renewal, multiple certificate resolvers, wildcard certificates, certificate storage. HTTPS out of the box, supports SNI and dynamic certificate loading.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #009639' }}>
          <strong style={{ color: '#009639' }}>Nginx SSL/TLS</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '灵活的SSL/TLS配置:手动证书管理或使用Certbot、OCSP装订、会话缓存、精细的协议和密码控制。需要外部工具进行自动化,但提供最大控制。' : 'Flexible SSL/TLS configuration: manual certificate management or Certbot, OCSP stapling, session caching, fine-grained protocol and cipher control. Requires external tools for automation but provides maximum control.'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #24a1c1' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#24a1c1' }}>{ct.traefikBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Docker/Kubernetes环境' : 'Docker/Kubernetes environments'}</li>
            <li>{isZh ? '微服务架构' : 'Microservices architecture'}</li>
            <li>{isZh ? '动态服务发现' : 'Dynamic service discovery'}</li>
            <li>{isZh ? '自动化HTTPS' : 'Automated HTTPS'}</li>
            <li>{isZh ? '云原生应用' : 'Cloud-native applications'}</li>
            <li>{isZh ? '快速开发环境' : 'Rapid development'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #009639' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#009639' }}>{ct.nginxBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高流量网站' : 'High-traffic websites'}</li>
            <li>{isZh ? '传统应用架构' : 'Traditional app architecture'}</li>
            <li>{isZh ? '最大性能需求' : 'Maximum performance needs'}</li>
            <li>{isZh ? '复杂路由规则' : 'Complex routing rules'}</li>
            <li>{isZh ? '企业级部署' : 'Enterprise deployments'}</li>
            <li>{isZh ? '静态内容缓存' : 'Static content caching'}</li>
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
        <a href={"/" + lang + "/tools/url-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>URL Encoder</a>
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
