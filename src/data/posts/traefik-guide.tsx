'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Traefik Complete Guide 2026: Cloud-Native Reverse Proxy, Load Balancer, and Ingress Controller',
    description: 'Master Traefik — Docker auto-discovery, Kubernetes Ingress, automatic HTTPS, load balancing, middlewares, TCP/UDP routing, Traefik v3 features, and production deployment.',
    tldr: 'Traefik is a modern, cloud-native reverse proxy and load balancer that automatically discovers services from Docker, Kubernetes, and other orchestrators. Unlike Nginx or Apache, Traefik dynamically configures itself by watching your infrastructure — when a container starts, Traefik detects it and routes traffic automatically via labels. It provides automatic HTTPS via Let\'s Encrypt, built-in middlewares for rate limiting, authentication, and header manipulation, plus a real-time dashboard. Traefik v3 (current stable) adds native WebAssembly plugin support, OpenTelemetry tracing, and HTTP/3. For container-based and microservices architectures in 2026, Traefik is the go-to edge router.',
    takeaway1: 'Traefik auto-discovers services from Docker, Kubernetes, Consul, and other providers — no manual config file updates needed',
    takeaway2: 'Docker labels define routing rules directly on containers, keeping infrastructure config co-located with services',
    takeaway3: 'Automatic HTTPS with Let\'s Encrypt via HTTP or DNS challenge, with wildcard certificate support',
    takeaway4: 'Built-in middlewares handle rate limiting, basic auth, IP whitelisting, circuit breakers, retry, and headers',
    takeaway5: 'Kubernetes IngressRoute CRD provides full Traefik feature access beyond standard Ingress resources',
    takeaway6: 'Traefik v3 brings HTTP/3, OpenTelemetry, WASM plugins, and improved performance over v2',
    intro: 'Traefik (pronounced "traffic") is an open-source edge router and reverse proxy designed for cloud-native environments. Created by Traefik Labs, it has become the most popular reverse proxy for Docker and Kubernetes workloads, with over 53,000 GitHub stars and billions of downloads. Traefik\'s key innovation is automatic service discovery: it watches your infrastructure and dynamically generates routing configuration. This comprehensive guide covers everything from basic Docker setups to production-grade Kubernetes ingress with Traefik v3.',
    h2What: 'What Is Traefik and Why It Is the Cloud-Native Reverse Proxy',
    whatP1: 'Traefik is a modern HTTP reverse proxy and load balancer that integrates natively with container orchestrators and service discovery systems. Unlike traditional reverse proxies where you manually define upstream servers in config files, Traefik connects directly to your infrastructure APIs and automatically creates routes for your services.',
    whatP2: 'When you start a Docker container with appropriate labels, Traefik immediately detects it and begins routing traffic — no reload, no restart, no manual configuration. When the container stops, Traefik removes the route. This dynamic behavior makes Traefik ideal for environments where services are constantly scaling.',
    whatList1: 'Automatic service discovery from Docker, Kubernetes, Consul, etcd, and more',
    whatList2: 'Dynamic configuration — routes update in real-time as services change',
    whatList3: 'Automatic HTTPS with Let\'s Encrypt (HTTP and DNS challenge)',
    whatList4: 'Built-in load balancing with round robin, weighted, and sticky session strategies',
    whatList5: 'Rich middleware ecosystem: rate limiting, auth, headers, circuit breaker, retry',
    whatList6: 'TCP and UDP routing support for non-HTTP protocols',
    whatList7: 'Real-time dashboard and Prometheus/OpenTelemetry metrics',
    h2Comparison: 'Traefik vs Nginx vs Caddy vs HAProxy',
    compIntro: 'Each reverse proxy has strengths suited to different architectures. This comparison helps you decide which fits your infrastructure.',
    thFeature: 'Feature', thTraefik: 'Traefik', thNginx: 'Nginx', thCaddy: 'Caddy', thHAProxy: 'HAProxy',
    compAutoDiscovery: 'Auto service discovery', compAutoHTTPS: 'Automatic HTTPS', compConfig: 'Config approach', compDocker: 'Docker integration', compK8s: 'Kubernetes support', compLB: 'Load balancing', compMiddleware: 'Middleware system', compDashboard: 'Built-in dashboard', compHTTP3: 'HTTP/3 support', compLanguage: 'Written in',
    valTraefikDiscovery: 'Native (Docker, K8s, Consul)', valNginxDiscovery: 'Manual config reload', valCaddyDiscovery: 'Limited (Docker labels)', valHAProxyDiscovery: 'Manual / consul-template',
    valTraefikHTTPS: 'Built-in (ACME)', valNginxHTTPS: 'Manual (certbot)', valCaddyHTTPS: 'Built-in (zero config)', valHAProxyHTTPS: 'Manual (certbot)',
    valTraefikConfig: 'YAML/TOML + labels/CRDs', valNginxConfig: 'nginx.conf (static)', valCaddyConfig: 'Caddyfile (simple)', valHAProxyConfig: 'haproxy.cfg (static)',
    valTraefikDocker: 'Excellent (native labels)', valNginxDocker: 'Manual config', valCaddyDocker: 'Good (labels via plugin)', valHAProxyDocker: 'Manual config',
    valTraefikK8s: 'IngressRoute CRD + Ingress', valNginxK8s: 'Ingress Controller', valCaddyK8s: 'Basic Ingress', valHAProxyK8s: 'Ingress Controller',
    valTraefikLB: 'Round robin, weighted, sticky', valNginxLB: 'Round robin, weighted, IP hash', valCaddyLB: 'Round robin, random, least_conn', valHAProxyLB: 'Advanced (many algorithms)',
    valTraefikMiddleware: 'Built-in (20+ middlewares)', valNginxMiddleware: 'Modules (compile-time)', valCaddyMiddleware: 'Directives + plugins', valHAProxyMiddleware: 'ACLs and stick tables',
    valTraefikDashboard: 'Yes (built-in)', valNginxDashboard: 'No (Nginx Plus only)', valCaddyDashboard: 'No', valHAProxyDashboard: 'Yes (stats page)',
    valTraefikHTTP3: 'Experimental (v3)', valNginxHTTP3: 'Experimental', valCaddyHTTP3: 'Native (default)', valHAProxyHTTP3: 'Not supported',
    valTraefikLang: 'Go', valNginxLang: 'C', valCaddyLang: 'Go', valHAProxyLang: 'C',
    h2Install: 'Installation',
    installIntro: 'Traefik can be deployed via Docker, Kubernetes Helm chart, binary download, or package managers.',
    h3InstallDocker: 'Docker (Most Common)', h3InstallHelm: 'Kubernetes with Helm', h3InstallBinary: 'Binary Download',
    h2Concepts: 'Core Concepts: Entrypoints, Routers, Services, Middlewares, Providers',
    conceptsIntro: 'Traefik has five core concepts that work together to route traffic.',
    conceptEntry: 'Entrypoints are network ports where Traefik listens for incoming traffic (e.g., port 80 for HTTP, port 443 for HTTPS).',
    conceptRouter: 'Routers analyze incoming requests (host, path, headers) and determine which service should handle them. Routers connect entrypoints to services and can attach middlewares.',
    conceptService: 'Services represent the actual backend applications. They define how to reach backend servers and which load balancing strategy to use.',
    conceptMiddleware: 'Middlewares modify requests or responses before they reach the service — authentication, rate limiting, headers, path stripping, and more.',
    conceptProvider: 'Providers are infrastructure components that Traefik watches for service discovery. Docker, Kubernetes, Consul, and file are providers.',
    h2DockerProvider: 'Docker Provider: Auto-Discovery via Labels',
    dockerProviderP: 'The Docker provider is Traefik\'s most popular feature. Traefik connects to the Docker socket, watches for container events, and automatically creates routes based on container labels.',
    h2Compose: 'Docker Compose Examples',
    composeIntro: 'Docker Compose is the most common way to run Traefik. Here are production-ready examples.',
    h3ComposeBasic: 'Traefik with HTTPS', h3ComposeMulti: 'Multi-Service Stack',
    h2HTTPS: 'Automatic HTTPS with Let\'s Encrypt',
    httpsIntro: 'Traefik can automatically obtain and renew TLS certificates from Let\'s Encrypt using the ACME protocol.',
    h3HTTPChallenge: 'HTTP Challenge', h3DNSChallenge: 'DNS Challenge (Wildcard Certificates)',
    h2LoadBalancing: 'Load Balancing Strategies',
    lbIntro: 'Traefik supports multiple load balancing strategies to distribute traffic across backend instances.',
    h2Middlewares: 'Middlewares: Rate Limiting, Auth, Headers, and More',
    middlewareIntro: 'Middlewares intercept and modify requests/responses between the router and the service.',
    h3MwRateLimit: 'Rate Limiting', h3MwAuth: 'Basic Authentication', h3MwHeaders: 'Security Headers', h3MwStripPrefix: 'Strip Prefix', h3MwCircuitBreaker: 'Circuit Breaker',
    h2K8s: 'Kubernetes Ingress Controller and IngressRoute CRD',
    k8sIntro: 'Traefik is one of the most popular Kubernetes ingress controllers. It supports both standard Ingress resources and its own IngressRoute CRD.',
    h3K8sIngressRoute: 'IngressRoute CRD', h3K8sMiddleware: 'Kubernetes Middleware CRD',
    h2FileProvider: 'File Provider for Static Configuration',
    fileProviderP: 'The file provider allows you to define routers, services, and middlewares in YAML or TOML files for external services not managed by Docker or Kubernetes.',
    h2Dashboard: 'Traefik Dashboard (Secure Setup)',
    dashboardP: 'Traefik includes a built-in web dashboard showing all routers, services, middlewares, and their health status. Always secure it with authentication in production.',
    h2HealthChecks: 'Health Checks and Circuit Breakers',
    healthP: 'Traefik supports active health checks to verify backend servers are healthy. Combined with circuit breakers, this provides resilient routing.',
    h2TCPUDP: 'TCP and UDP Routing',
    tcpudpP: 'Traefik can route non-HTTP traffic using TCP and UDP routers — useful for databases, message queues, DNS servers, and other protocols.',
    h2V3: 'Traefik v3 Features',
    v3Intro: 'Traefik v3 (stable since 2024) introduces significant improvements over v2.',
    v3F1: 'HTTP/3 (QUIC) support for faster connections on mobile and lossy networks',
    v3F2: 'Native OpenTelemetry integration for distributed tracing',
    v3F3: 'WebAssembly (WASM) plugin support for custom middleware without recompiling',
    v3F4: 'Kubernetes Gateway API support alongside IngressRoute CRDs',
    v3F5: 'Improved performance with connection pooling and HTTP/2 backend support',
    v3F6: 'Breaking changes: entryPoint name changes, removed deprecated options, ACME v2 required',
    h2Metrics: 'Metrics and Monitoring: Prometheus, Grafana, Access Logs',
    metricsP: 'Traefik provides comprehensive observability through Prometheus metrics, structured access logs, and distributed tracing.',
    h2HA: 'High Availability Setup',
    haP1: 'In Docker Swarm, deploy Traefik as a global service on manager nodes. Use a distributed certificate store (Consul, etcd, Redis) so all instances share certificates.',
    haP2: 'In Kubernetes, the Helm chart deploys multiple Traefik pods by default. Certificate management is handled via cert-manager or Traefik\'s built-in ACME with a shared storage backend.',
    h2Performance: 'Performance Tuning',
    perfIntro: 'Traefik performs well out of the box, but high-traffic deployments benefit from tuning.',
    perfL1: 'Increase entrypoint transport lifecycle grace period for graceful shutdowns under load',
    perfL2: 'Enable HTTP/2 between Traefik and backends with serversTransport for multiplexed connections',
    perfL3: 'Configure connection keep-alive and idle timeout to match backend capabilities',
    perfL4: 'Set appropriate maxIdleConnsPerHost for backend connection pooling',
    perfL5: 'Use access log buffering (bufferingSize) to reduce I/O overhead',
    perfL6: 'Deploy Traefik on dedicated nodes in Kubernetes to avoid resource contention',
    h2Security: 'Security Best Practices',
    secIntro: 'Securing your Traefik deployment is critical since it sits at the edge of your network.',
    secL1: 'Never expose the dashboard without authentication — use basicAuth or forwardAuth middleware',
    secL2: 'Mount the Docker socket read-only (ro) or use a Docker socket proxy like Tecnativa/docker-socket-proxy',
    secL3: 'Set security headers on all routes: HSTS, X-Frame-Options, X-Content-Type-Options, CSP',
    secL4: 'Use TLS 1.2+ minimum version and restrict cipher suites in TLS options',
    secL5: 'Enable access logs for audit trails and integrate with SIEM systems',
    secL6: 'Implement rate limiting on all public-facing routes to prevent abuse',
    h2Patterns: 'Common Patterns: Canary, Blue-Green, A/B Testing',
    patternsP: 'Traefik\'s weighted load balancing and middleware system enable advanced deployment patterns including canary (route a small percentage to a new version), blue-green (maintain two identical environments and switch instantly), and A/B testing (route based on headers or cookies).',
    h2Troubleshooting: 'Troubleshooting Guide',
    trL1: '404 Not Found: Check traefik labels, Docker network, and Host rule match.',
    trL2: '502 Bad Gateway: Backend unreachable — verify container, port, and health checks.',
    trL3: 'Certificate not issued: Ensure ports 80/443 accessible. Check ACME with --log.level=DEBUG.',
    trL4: 'Dashboard not loading: Verify api.dashboard=true and correct entrypoints/auth.',
    trL5: 'Middleware not applying: Names are case-sensitive and must match the provider namespace.',
    trL6: 'Docker labels not detected: Ensure Docker socket access and explicit Docker network.',
    trL7: 'Slow responses: Check backend health, enable access logging, verify connection pooling.',
    trL8: 'WebSocket not connecting: Ensure no middleware strips the Upgrade header.',
    h2FAQ: 'Frequently Asked Questions',
    faq1Q: 'When should I choose Traefik over Nginx?',
    faq1A: 'Choose Traefik when running Docker or Kubernetes workloads where services are frequently deployed, scaled, or removed. Traefik\'s automatic service discovery eliminates manual config file updates. Choose Nginx for static infrastructure, maximum raw performance, or Lua scripting (OpenResty).',
    faq2Q: 'Is Traefik production-ready?',
    faq2A: 'Yes. Traefik is used in production by thousands of companies. The v3 stable release provides mature features including automatic HTTPS, health checks, circuit breakers, and comprehensive monitoring.',
    faq3Q: 'How does Traefik handle automatic HTTPS?',
    faq3A: 'Traefik uses the ACME protocol to obtain and renew certificates from Let\'s Encrypt. It supports HTTP challenge (port 80 must be accessible) and DNS challenge (for wildcard certificates). Certificates are stored in acme.json and renewed automatically before expiry.',
    faq4Q: 'Can Traefik replace HAProxy for load balancing?',
    faq4A: 'For most container-based workloads, yes. Traefik supports round robin, weighted, and sticky session load balancing with health checks. However, HAProxy offers more advanced L4 features and higher raw throughput for extreme-scale scenarios.',
    faq5Q: 'How do I secure the Traefik dashboard?',
    faq5A: 'Use basicAuth middleware with htpasswd-generated credentials, or forwardAuth to integrate with an external authentication provider like OAuth2 Proxy or Authelia. Never expose the dashboard without authentication.',
    faq6Q: 'Does Traefik support gRPC?',
    faq6A: 'Yes. Traefik natively supports gRPC over HTTP/2. Configure your service with h2c scheme for unencrypted gRPC or standard HTTPS for encrypted gRPC. Traefik handles gRPC load balancing and health checking.',
    faq7Q: 'What is the difference between Traefik v2 and v3?',
    faq7A: 'Traefik v3 adds HTTP/3 (QUIC), native OpenTelemetry tracing, WebAssembly plugin support, Kubernetes Gateway API, and improved performance. It includes breaking changes: renamed entrypoints, removed deprecated v1 options, and requires ACME v2.',
    faq8Q: 'How does Traefik compare to Caddy?',
    faq8A: 'Both are Go-based reverse proxies with automatic HTTPS. Traefik excels at container orchestration with native Docker/Kubernetes integration. Caddy excels at simplicity with Caddyfile and zero-config HTTPS. For Docker/K8s, choose Traefik. For simpler deployments, choose Caddy.',
    relatedTitle: 'Related Tools and Guides',
  },
  zh: {
    title: 'Traefik 完全指南 2026：云原生反向代理、负载均衡与 Ingress 控制器',
    description: '掌握 Traefik — Docker 自动发现、Kubernetes Ingress、自动 HTTPS、负载均衡、中间件、TCP/UDP 路由、v3 特性及生产部署。',
    tldr: 'Traefik 是现代云原生反向代理和负载均衡器，自动从 Docker、Kubernetes 等编排器发现服务。与 Nginx 不同，Traefik 通过监控基础设施动态配置——容器启动时自动通过标签路由流量。提供 Let\'s Encrypt 自动 HTTPS、内置中间件和实时仪表板。Traefik v3 新增 WASM 插件、OpenTelemetry 和 HTTP/3。',
    takeaway1: 'Traefik 自动从 Docker、Kubernetes、Consul 等发现服务 — 无需手动更新配置', takeaway2: 'Docker 标签直接在容器上定义路由规则', takeaway3: '通过 Let\'s Encrypt 自动 HTTPS，支持通配符证书', takeaway4: '内置中间件：速率限制、认证、IP 白名单、熔断器、请求头', takeaway5: 'Kubernetes IngressRoute CRD 提供完整 Traefik 功能', takeaway6: 'Traefik v3 带来 HTTP/3、OpenTelemetry、WASM 插件和性能改进',
    intro: 'Traefik（发音 "traffic"）是为云原生环境设计的开源边缘路由器和反向代理，拥有超过 53,000 GitHub 星标。核心创新是自动服务发现：监控 Docker、Kubernetes API 并动态生成路由配置。本指南涵盖从基础 Docker 设置到生产级 Kubernetes Ingress。',
    h2What: '什么是 Traefik', whatP1: 'Traefik 是现代 HTTP 反向代理和负载均衡器，与容器编排器原生集成。与 Nginx 手动配置不同，Traefik 直接连接基础设施 API 自动创建路由。', whatP2: '当 Docker 容器启动时 Traefik 立即检测并路由流量——无需重载。容器停止时移除路由。非常适合服务不断扩展的环境。',
    whatList1: '从 Docker、Kubernetes、Consul 等自动发现服务', whatList2: '动态配置 — 路由实时更新', whatList3: '通过 Let\'s Encrypt 自动 HTTPS', whatList4: '内置负载均衡：轮询、加权、粘性会话', whatList5: '丰富中间件：速率限制、认证、请求头、熔断器', whatList6: 'TCP/UDP 路由支持非 HTTP 协议', whatList7: '实时仪表板和 Prometheus/OpenTelemetry 指标',
    h2Comparison: 'Traefik vs Nginx vs Caddy vs HAProxy', compIntro: '每个反向代理都有适合不同架构的优势。',
    thFeature: '特性', thTraefik: 'Traefik', thNginx: 'Nginx', thCaddy: 'Caddy', thHAProxy: 'HAProxy',
    compAutoDiscovery: '自动服务发现', compAutoHTTPS: '自动 HTTPS', compConfig: '配置方式', compDocker: 'Docker 集成', compK8s: 'Kubernetes', compLB: '负载均衡', compMiddleware: '中间件', compDashboard: '内置仪表板', compHTTP3: 'HTTP/3', compLanguage: '语言',
    valTraefikDiscovery: '原生', valNginxDiscovery: '手动', valCaddyDiscovery: '有限', valHAProxyDiscovery: '手动',
    valTraefikHTTPS: '内置（ACME）', valNginxHTTPS: '手动', valCaddyHTTPS: '内置（零配置）', valHAProxyHTTPS: '手动',
    valTraefikConfig: 'YAML/TOML + 标签', valNginxConfig: 'nginx.conf', valCaddyConfig: 'Caddyfile', valHAProxyConfig: 'haproxy.cfg',
    valTraefikDocker: '优秀', valNginxDocker: '手动', valCaddyDocker: '良好', valHAProxyDocker: '手动',
    valTraefikK8s: 'IngressRoute CRD', valNginxK8s: 'Ingress 控制器', valCaddyK8s: '基本', valHAProxyK8s: 'Ingress 控制器',
    valTraefikLB: '轮询、加权、粘性', valNginxLB: '轮询、加权、IP 哈希', valCaddyLB: '轮询、随机', valHAProxyLB: '高级',
    valTraefikMiddleware: '内置（20+）', valNginxMiddleware: '模块', valCaddyMiddleware: '指令+插件', valHAProxyMiddleware: 'ACL',
    valTraefikDashboard: '是', valNginxDashboard: '否', valCaddyDashboard: '否', valHAProxyDashboard: '是',
    valTraefikHTTP3: '实验性', valNginxHTTP3: '实验性', valCaddyHTTP3: '原生', valHAProxyHTTP3: '不支持',
    valTraefikLang: 'Go', valNginxLang: 'C', valCaddyLang: 'Go', valHAProxyLang: 'C',
    h2Install: '安装', installIntro: 'Traefik 可通过 Docker、Helm chart、二进制下载或包管理器部署。',
    h3InstallDocker: 'Docker（最常见）', h3InstallHelm: 'Kubernetes Helm', h3InstallBinary: '二进制下载',
    h2Concepts: '核心概念：入口点、路由器、服务、中间件、提供者', conceptsIntro: 'Traefik 有五个核心概念协同路由流量。',
    conceptEntry: '入口点是 Traefik 监听流量的端口（如 80、443）。', conceptRouter: '路由器分析请求并确定由哪个服务处理，可附加中间件。', conceptService: '服务代表后端应用，定义负载均衡策略。', conceptMiddleware: '中间件在请求到达服务前修改请求或响应。', conceptProvider: '提供者是 Traefik 监控的基础设施组件（Docker、K8s、Consul、文件）。',
    h2DockerProvider: 'Docker 提供者：通过标签自动发现', dockerProviderP: 'Traefik 连接 Docker socket，监控容器事件，根据标签自动创建路由。',
    h2Compose: 'Docker Compose 示例', composeIntro: 'Docker Compose 是运行 Traefik 最常见的方式。', h3ComposeBasic: 'Traefik HTTPS 配置', h3ComposeMulti: '多服务栈',
    h2HTTPS: '通过 Let\'s Encrypt 自动 HTTPS', httpsIntro: 'Traefik 使用 ACME 协议自动获取和续期证书。', h3HTTPChallenge: 'HTTP 挑战', h3DNSChallenge: 'DNS 挑战（通配符证书）',
    h2LoadBalancing: '负载均衡策略', lbIntro: 'Traefik 支持多种负载均衡策略。',
    h2Middlewares: '中间件：速率限制、认证、请求头等', middlewareIntro: '中间件在路由器和服务之间拦截修改请求/响应。',
    h3MwRateLimit: '速率限制', h3MwAuth: '基本认证', h3MwHeaders: '安全请求头', h3MwStripPrefix: '路径前缀剥离', h3MwCircuitBreaker: '熔断器',
    h2K8s: 'Kubernetes Ingress 控制器和 IngressRoute CRD', k8sIntro: 'Traefik 支持标准 Ingress 和自有 IngressRoute CRD。', h3K8sIngressRoute: 'IngressRoute CRD', h3K8sMiddleware: 'Middleware CRD',
    h2FileProvider: '文件提供者', fileProviderP: '文件提供者用于非 Docker/Kubernetes 管理的外部服务路由配置。',
    h2Dashboard: 'Traefik 仪表板', dashboardP: '内置仪表板实时显示路由器、服务、中间件和健康状态。生产环境务必加认证。',
    h2HealthChecks: '健康检查和熔断器', healthP: 'Traefik 支持主动健康检查验证后端，结合熔断器提供弹性路由。',
    h2TCPUDP: 'TCP/UDP 路由', tcpudpP: 'Traefik 可路由非 HTTP 流量，适用于数据库、消息队列、DNS 等。',
    h2V3: 'Traefik v3 特性', v3Intro: 'Traefik v3（自 2024 年起稳定）相比 v2 有重大改进。',
    v3F1: 'HTTP/3 (QUIC) 支持', v3F2: '原生 OpenTelemetry 分布式追踪', v3F3: 'WASM 插件支持', v3F4: 'Kubernetes Gateway API', v3F5: '改进的连接池和 HTTP/2 后端', v3F6: '破坏性变更：入口点重命名、移除弃用选项',
    h2Metrics: '指标和监控', metricsP: 'Traefik 通过 Prometheus 指标、结构化访问日志和分布式追踪提供可观测性。',
    h2HA: '高可用设置', haP1: 'Docker Swarm 中将 Traefik 部署为全局服务，使用分布式证书存储。', haP2: 'Kubernetes 中 Helm chart 默认部署多个 Pod，通过 cert-manager 或共享存储处理证书。',
    h2Performance: '性能调优', perfIntro: '高流量部署可通过调优获益。',
    perfL1: '增加优雅关闭超时', perfL2: '启用 HTTP/2 后端多路复用', perfL3: '配置连接保活超时', perfL4: '设置 maxIdleConnsPerHost', perfL5: '使用访问日志缓冲', perfL6: '部署在专用节点',
    h2Security: '安全最佳实践', secIntro: 'Traefik 位于网络边缘，安全至关重要。',
    secL1: '仪表板必须加认证', secL2: 'Docker socket 只读挂载或用代理', secL3: '设置安全请求头', secL4: 'TLS 1.2+ 最低版本', secL5: '启用访问日志审计', secL6: '公共路由启用速率限制',
    h2Patterns: '常见模式：金丝雀、蓝绿、A/B 测试', patternsP: 'Traefik 的加权负载均衡和中间件支持高级部署模式：金丝雀（小比例流量到新版本）、蓝绿（双环境即时切换）和 A/B 测试（基于请求头路由）。',
    h2Troubleshooting: '故障排除',
    trL1: '404：检查标签、Docker 网络和 Host 规则。', trL2: '502：后端不可达，验证容器和端口。', trL3: '证书未签发：确保端口可访问，启用 DEBUG 日志。', trL4: '仪表板不加载：检查 api.dashboard=true。', trL5: '中间件无效：名称区分大小写。', trL6: 'Docker 标签未检测：确保 socket 访问和网络。', trL7: '响应慢：检查后端和连接池。', trL8: 'WebSocket 失败：确保 Upgrade 头未被剥离。',
    h2FAQ: '常见问题',
    faq1Q: '何时选择 Traefik 而非 Nginx？', faq1A: 'Docker/Kubernetes 工作负载且服务频繁变更时选 Traefik。静态基础设施或需要最大性能时选 Nginx。',
    faq2Q: 'Traefik 可用于生产吗？', faq2A: '可以。数千家公司在生产中使用，v3 提供成熟的自动 HTTPS、健康检查和监控。',
    faq3Q: 'Traefik 如何自动 HTTPS？', faq3A: '使用 ACME 协议从 Let\'s Encrypt 获取证书，支持 HTTP 和 DNS 挑战，证书存于 acme.json 自动续期。',
    faq4Q: 'Traefik 能替代 HAProxy 吗？', faq4A: '大多数容器工作负载可以。但 HAProxy 在极端规模下提供更高级的 L4 负载均衡。',
    faq5Q: '如何保护仪表板？', faq5A: '使用 basicAuth 或 forwardAuth 中间件，永远不要不加认证暴露仪表板。',
    faq6Q: '支持 gRPC 吗？', faq6A: '支持，原生支持 HTTP/2 上的 gRPC 负载均衡和健康检查。',
    faq7Q: 'v2 和 v3 区别？', faq7A: 'v3 新增 HTTP/3、OpenTelemetry、WASM 插件、Gateway API。包含破坏性变更。',
    faq8Q: 'Traefik vs Caddy？', faq8A: '两者都是 Go 反向代理，支持自动 HTTPS。Docker/K8s 选 Traefik，简单部署选 Caddy。',
    relatedTitle: '相关工具和指南',
  },
};

export default function TraefikGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const codeStyle = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', marginBottom: '1.5rem' };
  const h2Style = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const h3Style = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const pStyle = { marginBottom: '1rem', lineHeight: '1.75' };
  const thStyle = { padding: '0.75rem', textAlign: 'left' as const, borderBottom: '2px solid #374151', fontWeight: 600 };
  const tdStyle = { padding: '0.75rem', borderBottom: '1px solid #374151' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0c4a6e', fontSize: '1.1rem' }}>TL;DR</p>
        <p style={{ color: '#0c4a6e', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Key Takeaways</p>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {[t.takeaway1, t.takeaway2, t.takeaway3, t.takeaway4, t.takeaway5, t.takeaway6].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* What Is Traefik */}
      <h2 style={h2Style}>{t.h2What}</h2>
      <p style={pStyle}>{t.whatP1}</p>
      <p style={pStyle}>{t.whatP2}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.whatList1, t.whatList2, t.whatList3, t.whatList4, t.whatList5, t.whatList6, t.whatList7].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      {/* Comparison Table */}
      <h2 style={h2Style}>{t.h2Comparison}</h2>
      <p style={pStyle}>{t.compIntro}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1f2937' }}>
              {[t.thFeature, t.thTraefik, t.thNginx, t.thCaddy, t.thHAProxy].map((h, i) => (
                <th key={i} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [t.compAutoDiscovery, t.valTraefikDiscovery, t.valNginxDiscovery, t.valCaddyDiscovery, t.valHAProxyDiscovery],
              [t.compAutoHTTPS, t.valTraefikHTTPS, t.valNginxHTTPS, t.valCaddyHTTPS, t.valHAProxyHTTPS],
              [t.compConfig, t.valTraefikConfig, t.valNginxConfig, t.valCaddyConfig, t.valHAProxyConfig],
              [t.compDocker, t.valTraefikDocker, t.valNginxDocker, t.valCaddyDocker, t.valHAProxyDocker],
              [t.compK8s, t.valTraefikK8s, t.valNginxK8s, t.valCaddyK8s, t.valHAProxyK8s],
              [t.compLB, t.valTraefikLB, t.valNginxLB, t.valCaddyLB, t.valHAProxyLB],
              [t.compMiddleware, t.valTraefikMiddleware, t.valNginxMiddleware, t.valCaddyMiddleware, t.valHAProxyMiddleware],
              [t.compDashboard, t.valTraefikDashboard, t.valNginxDashboard, t.valCaddyDashboard, t.valHAProxyDashboard],
              [t.compHTTP3, t.valTraefikHTTP3, t.valNginxHTTP3, t.valCaddyHTTP3, t.valHAProxyHTTP3],
              [t.compLanguage, t.valTraefikLang, t.valNginxLang, t.valCaddyLang, t.valHAProxyLang],
            ].map((row, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#111827' : 'transparent' }}>
                {row.map((cell, j) => (
                  <td key={j} style={tdStyle}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Installation */}
      <h2 style={h2Style}>{t.h2Install}</h2>
      <p style={pStyle}>{t.installIntro}</p>

      <h3 style={h3Style}>{t.h3InstallDocker}</h3>
      <pre style={codeStyle}><code>{'# Pull official Traefik v3 image\n'
        + 'docker pull traefik:v3.2\n'
        + '\n'
        + '# Run Traefik with Docker provider\n'
        + 'docker run -d --name traefik \\\n'
        + '  -p 80:80 -p 443:443 -p 8080:8080 \\\n'
        + '  -v /var/run/docker.sock:/var/run/docker.sock:ro \\\n'
        + '  -v ./traefik.yml:/etc/traefik/traefik.yml \\\n'
        + '  -v ./acme.json:/acme.json \\\n'
        + '  traefik:v3.2'}</code></pre>

      <h3 style={h3Style}>{t.h3InstallHelm}</h3>
      <pre style={codeStyle}><code>{'# Add Traefik Helm repository\n'
        + 'helm repo add traefik https://traefik.github.io/charts\n'
        + 'helm repo update\n'
        + '\n'
        + '# Install Traefik\n'
        + 'helm install traefik traefik/traefik \\\n'
        + '  --namespace traefik --create-namespace \\\n'
        + '  -f traefik-values.yml'}</code></pre>

      <h3 style={h3Style}>{t.h3InstallBinary}</h3>
      <pre style={codeStyle}><code>{'# Download from GitHub releases (Linux amd64)\n'
        + 'curl -LO https://github.com/traefik/traefik/releases/download/v3.2.0/traefik_v3.2.0_linux_amd64.tar.gz\n'
        + 'tar xzf traefik_v3.2.0_linux_amd64.tar.gz\n'
        + 'sudo mv traefik /usr/local/bin/ && traefik version\n'
        + '\n'
        + '# macOS: brew install traefik\n'
        + '# Windows: choco install traefik'}</code></pre>

      {/* Core Concepts */}
      <h2 style={h2Style}>{t.h2Concepts}</h2>
      <p style={pStyle}>{t.conceptsIntro}</p>
      <pre style={codeStyle}><code>{'# Traefik Architecture Flow:\n'
        + '#   Internet → [Entrypoints] → [Routers] → [Middlewares] → [Services] → Backend\n'
        + '#   [Providers] watch Docker/K8s/Consul and auto-configure the above'}</code></pre>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}><strong>Entrypoints:</strong> {t.conceptEntry}</li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}><strong>Routers:</strong> {t.conceptRouter}</li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}><strong>Services:</strong> {t.conceptService}</li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}><strong>Middlewares:</strong> {t.conceptMiddleware}</li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}><strong>Providers:</strong> {t.conceptProvider}</li>
      </ul>

      {/* Docker Provider */}
      <h2 style={h2Style}>{t.h2DockerProvider}</h2>
      <p style={pStyle}>{t.dockerProviderP}</p>
      <pre style={codeStyle}><code>{'# traefik.yml — static configuration\n'
        + 'api:\n'
        + '  dashboard: true\n'
        + 'entryPoints:\n'
        + '  web:\n'
        + '    address: ":80"\n'
        + '  websecure:\n'
        + '    address: ":443"\n'
        + 'providers:\n'
        + '  docker:\n'
        + '    endpoint: "unix:///var/run/docker.sock"\n'
        + '    exposedByDefault: false\n'
        + '    network: traefik-public\n'
        + '\n'
        + '# Docker labels for a container:\n'
        + '# - "traefik.enable=true"\n'
        + '# - "traefik.http.routers.myapp.rule=Host(`app.example.com`)"\n'
        + '# - "traefik.http.routers.myapp.entrypoints=websecure"\n'
        + '# - "traefik.http.routers.myapp.tls.certresolver=letsencrypt"\n'
        + '# - "traefik.http.services.myapp.loadbalancer.server.port=3000"\n'
        + '# - "traefik.http.routers.myapp.middlewares=my-ratelimit,my-headers"'}</code></pre>

      {/* Docker Compose */}
      <h2 style={h2Style}>{t.h2Compose}</h2>
      <p style={pStyle}>{t.composeIntro}</p>

      <h3 style={h3Style}>{t.h3ComposeBasic}</h3>
      <pre style={codeStyle}><code>{'# docker-compose.yml — Traefik with automatic HTTPS\n'
        + 'services:\n'
        + '  traefik:\n'
        + '    image: traefik:v3.2\n'
        + '    command:\n'
        + '      - "--api.dashboard=true"\n'
        + '      - "--providers.docker=true"\n'
        + '      - "--providers.docker.exposedbydefault=false"\n'
        + '      - "--entrypoints.web.address=:80"\n'
        + '      - "--entrypoints.websecure.address=:443"\n'
        + '      - "--certificatesresolvers.letsencrypt.acme.email=admin@example.com"\n'
        + '      - "--certificatesresolvers.letsencrypt.acme.storage=/acme.json"\n'
        + '      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"\n'
        + '      - "--entrypoints.web.http.redirections.entryPoint.to=websecure"\n'
        + '    ports:\n'
        + '      - "80:80"\n'
        + '      - "443:443"\n'
        + '    volumes:\n'
        + '      - /var/run/docker.sock:/var/run/docker.sock:ro\n'
        + '      - ./acme.json:/acme.json\n'
        + '    networks:\n'
        + '      - traefik-public\n'
        + '    labels:\n'
        + '      - "traefik.enable=true"\n'
        + '      - "traefik.http.routers.dashboard.rule=Host(`traefik.example.com`)"\n'
        + '      - "traefik.http.routers.dashboard.service=api@internal"\n'
        + '      - "traefik.http.routers.dashboard.entrypoints=websecure"\n'
        + '      - "traefik.http.routers.dashboard.tls.certresolver=letsencrypt"\n'
        + '      - "traefik.http.routers.dashboard.middlewares=auth"\n'
        + '      - "traefik.http.middlewares.auth.basicauth.users=admin:\\$\\$apr1\\$\\$xyz\\$\\$hash"\n'
        + 'networks:\n'
        + '  traefik-public:\n'
        + '    external: true'}</code></pre>

      <h3 style={h3Style}>{t.h3ComposeMulti}</h3>
      <pre style={codeStyle}><code>{'# docker-compose.yml — Multi-service stack with Traefik\n'
        + 'services:\n'
        + '  frontend:\n'
        + '    image: node:20-alpine\n'
        + '    networks: [traefik-public]\n'
        + '    labels:\n'
        + '      - "traefik.enable=true"\n'
        + '      - "traefik.http.routers.frontend.rule=Host(`app.example.com`)"\n'
        + '      - "traefik.http.routers.frontend.entrypoints=websecure"\n'
        + '      - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"\n'
        + '      - "traefik.http.services.frontend.loadbalancer.server.port=3000"\n'
        + '  api:\n'
        + '    image: golang:1.23-alpine\n'
        + '    networks: [traefik-public, backend]\n'
        + '    labels:\n'
        + '      - "traefik.enable=true"\n'
        + '      - "traefik.http.routers.api.rule=Host(`api.example.com`)"\n'
        + '      - "traefik.http.routers.api.entrypoints=websecure"\n'
        + '      - "traefik.http.routers.api.tls.certresolver=letsencrypt"\n'
        + '      - "traefik.http.services.api.loadbalancer.server.port=8080"\n'
        + '      - "traefik.http.routers.api.middlewares=api-ratelimit"\n'
        + '      - "traefik.http.middlewares.api-ratelimit.ratelimit.average=100"\n'
        + '  db:\n'
        + '    image: postgres:16-alpine\n'
        + '    volumes: [db-data:/var/lib/postgresql/data]\n'
        + '    networks: [backend]  # Not exposed to Traefik\n'
        + 'volumes:\n'
        + '  db-data:\n'
        + 'networks:\n'
        + '  traefik-public:\n'
        + '    external: true\n'
        + '  backend:'}</code></pre>

      {/* Automatic HTTPS */}
      <h2 style={h2Style}>{t.h2HTTPS}</h2>
      <p style={pStyle}>{t.httpsIntro}</p>
      <h3 style={h3Style}>{t.h3HTTPChallenge}</h3>
      <pre style={codeStyle}><code>{'# traefik.yml — HTTP challenge (most common)\n'
        + 'certificatesResolvers:\n'
        + '  letsencrypt:\n'
        + '    acme:\n'
        + '      email: admin@example.com\n'
        + '      storage: /acme.json\n'
        + '      httpChallenge:\n'
        + '        entryPoint: web\n'
        + '# IMPORTANT: touch acme.json && chmod 600 acme.json'}</code></pre>

      <h3 style={h3Style}>{t.h3DNSChallenge}</h3>
      <pre style={codeStyle}><code>{'# traefik.yml — DNS challenge (wildcard certs)\n'
        + 'certificatesResolvers:\n'
        + '  letsencrypt:\n'
        + '    acme:\n'
        + '      email: admin@example.com\n'
        + '      storage: /acme.json\n'
        + '      dnsChallenge:\n'
        + '        provider: cloudflare\n'
        + '        resolvers: ["1.1.1.1:53", "8.8.8.8:53"]\n'
        + '# Env: CF_API_EMAIL + CF_DNS_API_TOKEN\n'
        + '# Label: traefik.http.routers.app.tls.domains[0].main=example.com\n'
        + '# Label: traefik.http.routers.app.tls.domains[0].sans=*.example.com'}</code></pre>

      {/* Load Balancing */}
      <h2 style={h2Style}>{t.h2LoadBalancing}</h2>
      <p style={pStyle}>{t.lbIntro}</p>
      <pre style={codeStyle}><code>{'# File provider — weighted load balancing + sticky sessions\n'
        + 'http:\n'
        + '  services:\n'
        + '    my-service:\n'
        + '      weighted:\n'
        + '        services:\n'
        + '          - name: v1\n'
        + '            weight: 80\n'
        + '          - name: v2\n'
        + '            weight: 20\n'
        + '    v1:\n'
        + '      loadBalancer:\n'
        + '        servers:\n'
        + '          - url: "http://v1-app:8080"\n'
        + '    v2:\n'
        + '      loadBalancer:\n'
        + '        servers:\n'
        + '          - url: "http://v2-app:8080"\n'
        + '\n'
        + '# Sticky sessions via Docker labels:\n'
        + '# traefik.http.services.myapp.loadbalancer.sticky.cookie=true\n'
        + '# traefik.http.services.myapp.loadbalancer.sticky.cookie.name=server_id'}</code></pre>

      {/* Middlewares */}
      <h2 style={h2Style}>{t.h2Middlewares}</h2>
      <p style={pStyle}>{t.middlewareIntro}</p>

      <h3 style={h3Style}>{t.h3MwRateLimit}</h3>
      <pre style={codeStyle}><code>{'# Rate limiting — Docker labels\n'
        + '- "traefik.http.middlewares.my-ratelimit.ratelimit.average=100"\n'
        + '- "traefik.http.middlewares.my-ratelimit.ratelimit.burst=50"\n'
        + '- "traefik.http.middlewares.my-ratelimit.ratelimit.period=1m"'}</code></pre>

      <h3 style={h3Style}>{t.h3MwAuth}</h3>
      <pre style={codeStyle}><code>{'# Basic auth: htpasswd -nb admin secure-password\n'
        + '# Docker label (double $$ to escape in compose):\n'
        + '- "traefik.http.middlewares.my-auth.basicauth.users=admin:\\$\\$apr1\\$\\$xyz\\$\\$hash"\n'
        + '\n'
        + '# File provider:\n'
        + 'http:\n'
        + '  middlewares:\n'
        + '    my-auth:\n'
        + '      basicAuth:\n'
        + '        users: ["admin:$apr1$xyz$hash"]\n'
        + '        removeHeader: true'}</code></pre>

      <h3 style={h3Style}>{t.h3MwHeaders}</h3>
      <pre style={codeStyle}><code>{'# Security headers middleware\n'
        + 'http:\n'
        + '  middlewares:\n'
        + '    secure-headers:\n'
        + '      headers:\n'
        + '        stsSeconds: 31536000\n'
        + '        stsIncludeSubdomains: true\n'
        + '        frameDeny: true\n'
        + '        contentTypeNosniff: true\n'
        + '        browserXssFilter: true'}</code></pre>

      <h3 style={h3Style}>{t.h3MwStripPrefix}</h3>
      <pre style={codeStyle}><code>{'# Strip prefix — /api/v1/* becomes /* at backend\n'
        + '- "traefik.http.middlewares.strip-api.stripprefix.prefixes=/api/v1"\n'
        + '- "traefik.http.routers.api.rule=Host(`example.com`) && PathPrefix(`/api/v1`)"'}</code></pre>

      <h3 style={h3Style}>{t.h3MwCircuitBreaker}</h3>
      <pre style={codeStyle}><code>{'# Circuit breaker — stop routing to failing backends\n'
        + 'http:\n'
        + '  middlewares:\n'
        + '    my-cb:\n'
        + '      circuitBreaker:\n'
        + '        expression: "NetworkErrorRatio() > 0.30 || ResponseCodeRatio(500, 600, 0, 600) > 0.25"\n'
        + '        checkPeriod: 10s\n'
        + '        fallbackDuration: 30s'}</code></pre>

      {/* Kubernetes */}
      <h2 style={h2Style}>{t.h2K8s}</h2>
      <p style={pStyle}>{t.k8sIntro}</p>

      <h3 style={h3Style}>{t.h3K8sIngressRoute}</h3>
      <pre style={codeStyle}><code>{'# Traefik IngressRoute CRD\n'
        + 'apiVersion: traefik.io/v1alpha1\n'
        + 'kind: IngressRoute\n'
        + 'metadata:\n'
        + '  name: my-app-route\n'
        + 'spec:\n'
        + '  entryPoints: [websecure]\n'
        + '  routes:\n'
        + '    - match: Host(`app.example.com`)\n'
        + '      kind: Rule\n'
        + '      services:\n'
        + '        - name: my-app\n'
        + '          port: 80\n'
        + '      middlewares:\n'
        + '        - name: my-ratelimit\n'
        + '    - match: Host(`api.example.com`) && PathPrefix(`/v1`)\n'
        + '      kind: Rule\n'
        + '      services:\n'
        + '        - name: my-api\n'
        + '          port: 8080\n'
        + '  tls:\n'
        + '    certResolver: letsencrypt'}</code></pre>

      <h3 style={h3Style}>{t.h3K8sMiddleware}</h3>
      <pre style={codeStyle}><code>{'# Kubernetes Middleware CRD\n'
        + 'apiVersion: traefik.io/v1alpha1\n'
        + 'kind: Middleware\n'
        + 'metadata:\n'
        + '  name: my-ratelimit\n'
        + 'spec:\n'
        + '  rateLimit:\n'
        + '    average: 100\n'
        + '    burst: 50\n'
        + '---\n'
        + 'apiVersion: traefik.io/v1alpha1\n'
        + 'kind: Middleware\n'
        + 'metadata:\n'
        + '  name: secure-headers\n'
        + 'spec:\n'
        + '  headers:\n'
        + '    stsSeconds: 31536000\n'
        + '    frameDeny: true\n'
        + '    contentTypeNosniff: true'}</code></pre>

      {/* File Provider */}
      <h2 style={h2Style}>{t.h2FileProvider}</h2>
      <p style={pStyle}>{t.fileProviderP}</p>
      <pre style={codeStyle}><code>{'# traefik.yml — enable file provider\n'
        + 'providers:\n'
        + '  file:\n'
        + '    filename: /etc/traefik/dynamic.yml\n'
        + '    watch: true\n'
        + '\n'
        + '# dynamic.yml — external service routing\n'
        + 'http:\n'
        + '  routers:\n'
        + '    external-app:\n'
        + '      rule: "Host(`external.example.com`)"\n'
        + '      service: external-app\n'
        + '      entryPoints: [websecure]\n'
        + '      tls:\n'
        + '        certResolver: letsencrypt\n'
        + '  services:\n'
        + '    external-app:\n'
        + '      loadBalancer:\n'
        + '        servers:\n'
        + '          - url: "http://192.168.1.100:8080"\n'
        + '        healthCheck:\n'
        + '          path: /health\n'
        + '          interval: 10s'}</code></pre>

      {/* Dashboard */}
      <h2 style={h2Style}>{t.h2Dashboard}</h2>
      <p style={pStyle}>{t.dashboardP}</p>
      <pre style={codeStyle}><code>{'# Secure dashboard via Docker labels\n'
        + '- "traefik.http.routers.dashboard.rule=Host(`traefik.example.com`)"\n'
        + '- "traefik.http.routers.dashboard.service=api@internal"\n'
        + '- "traefik.http.routers.dashboard.entrypoints=websecure"\n'
        + '- "traefik.http.routers.dashboard.tls.certresolver=letsencrypt"\n'
        + '- "traefik.http.routers.dashboard.middlewares=dashboard-auth"\n'
        + '- "traefik.http.middlewares.dashboard-auth.basicauth.users=admin:\\$\\$apr1\\$\\$hash"'}</code></pre>

      {/* Health Checks */}
      <h2 style={h2Style}>{t.h2HealthChecks}</h2>
      <p style={pStyle}>{t.healthP}</p>
      <pre style={codeStyle}><code>{'# Health checks in file provider\n'
        + 'http:\n'
        + '  services:\n'
        + '    my-service:\n'
        + '      loadBalancer:\n'
        + '        servers:\n'
        + '          - url: "http://app1:8080"\n'
        + '          - url: "http://app2:8080"\n'
        + '        healthCheck:\n'
        + '          path: /health\n'
        + '          interval: 10s\n'
        + '          timeout: 3s'}</code></pre>

      {/* TCP/UDP */}
      <h2 style={h2Style}>{t.h2TCPUDP}</h2>
      <p style={pStyle}>{t.tcpudpP}</p>
      <pre style={codeStyle}><code>{'# TCP/UDP routing in traefik.yml + dynamic.yml\n'
        + 'entryPoints:\n'
        + '  postgres:\n'
        + '    address: ":5432"\n'
        + '  dns-udp:\n'
        + '    address: ":53/udp"\n'
        + '\n'
        + '# dynamic.yml\n'
        + 'tcp:\n'
        + '  routers:\n'
        + '    postgres-route:\n'
        + '      entryPoints: [postgres]\n'
        + '      rule: "HostSNI(`db.example.com`)"\n'
        + '      service: postgres-svc\n'
        + '      tls: { passthrough: true }\n'
        + '  services:\n'
        + '    postgres-svc:\n'
        + '      loadBalancer:\n'
        + '        servers:\n'
        + '          - address: "db-primary:5432"\n'
        + 'udp:\n'
        + '  routers:\n'
        + '    dns-route:\n'
        + '      entryPoints: [dns-udp]\n'
        + '      service: dns-svc\n'
        + '  services:\n'
        + '    dns-svc:\n'
        + '      loadBalancer:\n'
        + '        servers:\n'
        + '          - address: "coredns:53"'}</code></pre>

      {/* Traefik v3 */}
      <h2 style={h2Style}>{t.h2V3}</h2>
      <p style={pStyle}>{t.v3Intro}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.v3F1, t.v3F2, t.v3F3, t.v3F4, t.v3F5, t.v3F6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>
      <pre style={codeStyle}><code>{'# Traefik v3 — HTTP/3 + OpenTelemetry\n'
        + 'entryPoints:\n'
        + '  websecure:\n'
        + '    address: ":443"\n'
        + '    http3: {}\n'
        + 'tracing:\n'
        + '  otlp:\n'
        + '    grpc:\n'
        + '      endpoint: "otel-collector:4317"\n'
        + '      insecure: true\n'
        + 'experimental:\n'
        + '  plugins:\n'
        + '    my-plugin:\n'
        + '      moduleName: "github.com/user/traefik-plugin"\n'
        + '      version: "v1.0.0"'}</code></pre>

      {/* Metrics */}
      <h2 style={h2Style}>{t.h2Metrics}</h2>
      <p style={pStyle}>{t.metricsP}</p>
      <pre style={codeStyle}><code>{'# Prometheus metrics + structured access logs\n'
        + 'metrics:\n'
        + '  prometheus:\n'
        + '    entryPoint: metrics\n'
        + '    addRoutersLabels: true\n'
        + '    addServicesLabels: true\n'
        + 'entryPoints:\n'
        + '  metrics:\n'
        + '    address: ":8082"\n'
        + '\n'
        + 'accessLog:\n'
        + '  filePath: "/var/log/traefik/access.log"\n'
        + '  format: json\n'
        + '  bufferingSize: 100\n'
        + '  filters:\n'
        + '    statusCodes: ["400-599"]\n'
        + '\n'
        + '# Grafana: Import dashboard ID 17346 or 4475'}</code></pre>

      {/* High Availability */}
      <h2 style={h2Style}>{t.h2HA}</h2>
      <p style={pStyle}>{t.haP1}</p>
      <p style={pStyle}>{t.haP2}</p>
      <pre style={codeStyle}><code>{'# Kubernetes HA — Helm values\n'
        + 'deployment:\n'
        + '  replicas: 3\n'
        + 'resources:\n'
        + '  requests: { cpu: 200m, memory: 128Mi }\n'
        + '  limits: { cpu: 1000m, memory: 512Mi }\n'
        + 'affinity:\n'
        + '  podAntiAffinity:\n'
        + '    requiredDuringSchedulingIgnoredDuringExecution:\n'
        + '      - labelSelector:\n'
        + '          matchLabels:\n'
        + '            app.kubernetes.io/name: traefik\n'
        + '        topologyKey: kubernetes.io/hostname'}</code></pre>

      {/* Performance */}
      <h2 style={h2Style}>{t.h2Performance}</h2>
      <p style={pStyle}>{t.perfIntro}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.perfL1, t.perfL2, t.perfL3, t.perfL4, t.perfL5, t.perfL6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>
      <pre style={codeStyle}><code>{'# Performance tuning\n'
        + 'entryPoints:\n'
        + '  websecure:\n'
        + '    address: ":443"\n'
        + '    transport:\n'
        + '      lifeCycle: { graceTimeOut: 30s }\n'
        + '      respondingTimeouts:\n'
        + '        readTimeout: 60s\n'
        + '        writeTimeout: 60s\n'
        + '        idleTimeout: 180s\n'
        + 'serversTransport:\n'
        + '  maxIdleConnsPerHost: 200\n'
        + '  forwardingTimeouts:\n'
        + '    dialTimeout: 5s\n'
        + '    responseHeaderTimeout: 30s'}</code></pre>

      {/* Security */}
      <h2 style={h2Style}>{t.h2Security}</h2>
      <p style={pStyle}>{t.secIntro}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.secL1, t.secL2, t.secL3, t.secL4, t.secL5, t.secL6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>
      <pre style={codeStyle}><code>{'# TLS options — strong cipher suites\n'
        + 'tls:\n'
        + '  options:\n'
        + '    default:\n'
        + '      minVersion: VersionTLS12\n'
        + '      cipherSuites:\n'
        + '        - TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384\n'
        + '        - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384\n'
        + '        - TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305\n'
        + '      sniStrict: true'}</code></pre>

      {/* Patterns */}
      <h2 style={h2Style}>{t.h2Patterns}</h2>
      <p style={pStyle}>{t.patternsP}</p>
      <pre style={codeStyle}><code>{'# Canary deployment — 90% stable, 10% canary\n'
        + 'http:\n'
        + '  services:\n'
        + '    my-app-canary:\n'
        + '      weighted:\n'
        + '        services:\n'
        + '          - name: stable\n'
        + '            weight: 90\n'
        + '          - name: canary\n'
        + '            weight: 10\n'
        + '    stable:\n'
        + '      loadBalancer:\n'
        + '        servers:\n'
        + '          - url: "http://app-v1:8080"\n'
        + '    canary:\n'
        + '      loadBalancer:\n'
        + '        servers:\n'
        + '          - url: "http://app-v2:8080"\n'
        + '\n'
        + '# Blue-green — switch by changing weights to 0/100\n'
        + '    blue-green:\n'
        + '      weighted:\n'
        + '        services:\n'
        + '          - name: blue\n'
        + '            weight: 100\n'
        + '          - name: green\n'
        + '            weight: 0  # Change to 100 to switch\n'
        + '\n'
        + '# A/B testing — route based on headers\n'
        + '  routers:\n'
        + '    app-v2:\n'
        + '      rule: "Host(`app.example.com`) && HeadersRegexp(`X-AB-Test`, `v2`)"\n'
        + '      service: app-v2\n'
        + '      priority: 100\n'
        + '    app-default:\n'
        + '      rule: "Host(`app.example.com`)"\n'
        + '      service: app-v1\n'
        + '      priority: 50'}</code></pre>

      {/* Troubleshooting */}
      <h2 style={h2Style}>{t.h2Troubleshooting}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.trL1, t.trL2, t.trL3, t.trL4, t.trL5, t.trL6, t.trL7, t.trL8].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>
      <pre style={codeStyle}><code>{'# Debug Traefik\n'
        + 'log:\n'
        + '  level: DEBUG\n'
        + '\n'
        + '# docker logs -f traefik\n'
        + '# curl http://localhost:8080/api/rawdata | jq .\n'
        + '# cat acme.json | jq ".letsencrypt.Certificates"\n'
        + '# docker network inspect traefik-public'}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>{t.h2FAQ}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
          [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
