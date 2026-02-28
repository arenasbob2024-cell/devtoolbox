'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Caddy Server Complete Guide 2026: Automatic HTTPS, Reverse Proxy, and Modern Web Serving',
    description: 'Master Caddy web server — automatic HTTPS with Let\'s Encrypt, Caddyfile configuration, reverse proxy, Docker deployment, PHP/WordPress hosting, HTTP/3, and migration from Nginx.',
    tldr: 'Caddy is a modern, Go-based web server that provides automatic HTTPS via Let\'s Encrypt with zero configuration. It serves as a drop-in replacement for Nginx and Apache with a dramatically simpler config syntax (Caddyfile). Caddy handles TLS certificate provisioning, renewal, and OCSP stapling automatically. It supports reverse proxying, load balancing, static file serving, HTTP/3, and dynamic configuration via its admin API. For most web serving use cases in 2026, Caddy offers the best developer experience with production-grade reliability.',
    takeaway1: 'Caddy automatically provisions and renews HTTPS certificates from Let\'s Encrypt — no certbot, no cron jobs, no manual renewal',
    takeaway2: 'The Caddyfile syntax is dramatically simpler than Nginx/Apache configs: a basic reverse proxy is just 3 lines',
    takeaway3: 'Caddy supports HTTP/3 (QUIC), on-demand TLS, wildcard certificates, and the ACME protocol out of the box',
    takeaway4: 'Caddy\'s admin API allows live configuration changes without restarts or reloads',
    takeaway5: 'Caddy excels as a Docker reverse proxy with automatic HTTPS for containerized microservices',
    takeaway6: 'Migration from Nginx to Caddy typically reduces configuration complexity by 60-80%',
    intro: 'Caddy is an open-source web server written in Go that has gained significant traction as a modern alternative to Nginx and Apache. Its standout feature is automatic HTTPS: Caddy obtains and renews TLS certificates from Let\'s Encrypt (or ZeroSSL) without any configuration. In 2026, Caddy powers millions of sites and has become the default choice for developers who want production-grade web serving without the complexity of traditional server configuration. This guide covers everything from basic setup to advanced production deployment patterns.',
    h2What: 'What Is Caddy and Why It Matters',
    whatP1: 'Caddy is a powerful, extensible web server platform written in Go. It was created by Matt Holt in 2015 and has since grown into a mature, production-ready server used by companies like Cloudflare, Ardan Labs, and thousands of startups. Caddy v2 (the current major version) was a complete rewrite that introduced a modular architecture, a JSON config system, and the Caddyfile adapter.',
    whatP2: 'What makes Caddy unique is its philosophy of secure defaults. HTTPS is automatic and on by default. HTTP requests are automatically redirected to HTTPS. OCSP stapling is enabled. Modern TLS versions are enforced. Headers are secure by default. This means a fresh Caddy installation with zero configuration is already more secure than most manually configured Nginx or Apache setups.',
    whatList1: 'Automatic HTTPS via Let\'s Encrypt and ZeroSSL with zero configuration',
    whatList2: 'Written in Go — single static binary, no dependencies, cross-platform',
    whatList3: 'Caddyfile: human-readable configuration that is dramatically simpler than Nginx or Apache',
    whatList4: 'Native HTTP/3 (QUIC) support enabled by default',
    whatList5: 'Admin API for live configuration changes without downtime',
    whatList6: 'Extensible module system — add functionality without forking',
    whatList7: 'Graceful reloads, automatic certificate management, and OCSP stapling',
    h2Comparison: 'Caddy vs Nginx vs Apache vs Traefik',
    compIntro: 'Each web server has strengths suited to different use cases. This comparison helps you decide which is right for your project.',
    thFeature: 'Feature',
    thCaddy: 'Caddy',
    thNginx: 'Nginx',
    thApache: 'Apache',
    thTraefik: 'Traefik',
    compAutoHTTPS: 'Automatic HTTPS',
    compConfig: 'Config syntax',
    compPerformance: 'Raw performance',
    compMemory: 'Memory usage',
    compHTTP3: 'HTTP/3 support',
    compDocker: 'Docker integration',
    compPlugins: 'Plugin system',
    compLearning: 'Learning curve',
    compLanguage: 'Written in',
    compLicense: 'License',
    valCaddyHTTPS: 'Built-in (zero config)',
    valNginxHTTPS: 'Manual (certbot)',
    valApacheHTTPS: 'Manual (certbot)',
    valTraefikHTTPS: 'Built-in (config needed)',
    valCaddyConfig: 'Caddyfile (simple)',
    valNginxConfig: 'nginx.conf (complex)',
    valApacheConfig: 'httpd.conf + .htaccess',
    valTraefikConfig: 'YAML/TOML/labels',
    valCaddyPerf: 'Very good',
    valNginxPerf: 'Excellent',
    valApachePerf: 'Good',
    valTraefikPerf: 'Good',
    valCaddyMem: 'Low (~20MB)',
    valNginxMem: 'Very low (~5MB)',
    valApacheMem: 'High (~50-200MB)',
    valTraefikMem: 'Low (~30MB)',
    valCaddyHTTP3: 'Native (default on)',
    valNginxHTTP3: 'Experimental',
    valApacheHTTP3: 'Not supported',
    valTraefikHTTP3: 'Experimental',
    valCaddyDocker: 'Good (labels/networks)',
    valNginxDocker: 'Manual config',
    valApacheDocker: 'Manual config',
    valTraefikDocker: 'Excellent (native)',
    valCaddyPlugins: 'Go modules',
    valNginxPlugins: 'C modules (compile)',
    valApachePlugins: 'Dynamic modules',
    valTraefikPlugins: 'Go plugins',
    valCaddyLearn: 'Easy',
    valNginxLearn: 'Moderate',
    valApacheLearn: 'Moderate-Hard',
    valTraefikLearn: 'Moderate',
    valCaddyLang: 'Go',
    valNginxLang: 'C',
    valApacheLang: 'C',
    valTraefikLang: 'Go',
    valCaddyLic: 'Apache 2.0',
    valNginxLic: 'BSD 2-Clause',
    valApacheLic: 'Apache 2.0',
    valTraefikLic: 'MIT',
    h2Install: 'Installation',
    installIntro: 'Caddy distributes as a single static binary. No runtime dependencies are needed.',
    h3InstallPkg: 'Package Managers',
    h3InstallDocker: 'Docker',
    h3InstallBinary: 'Direct Binary Download',
    h3InstallSource: 'Building from Source with xcaddy',
    h2Caddyfile: 'Caddyfile Basics',
    caddyfileIntro: 'The Caddyfile is Caddy\'s human-friendly configuration format. It is designed to be easy to read and write, even for complex setups.',
    h3AutoHTTPS: 'Automatic HTTPS (Default Behavior)',
    autoHTTPSP: 'When you specify a domain name in your Caddyfile, Caddy automatically obtains a TLS certificate from Let\'s Encrypt, redirects HTTP to HTTPS, and enables OCSP stapling. No additional configuration is needed.',
    h3FileServer: 'Static File Server',
    h3Redirects: 'Redirects',
    h2ReverseProxy: 'Reverse Proxy Configuration',
    rpIntro: 'Caddy is an excellent reverse proxy. It supports single backends, load balancing, health checks, WebSocket proxying, and header manipulation.',
    h3SingleBackend: 'Single Backend',
    h3LoadBalancing: 'Load Balancing',
    h3HealthChecks: 'Health Checks',
    h3WebSockets: 'WebSocket Proxying',
    h3NginxComparison: 'Nginx Equivalent Comparison',
    nginxCompP: 'Here is the same reverse proxy configuration in both Caddy and Nginx for comparison.',
    h2HTTPS: 'Automatic HTTPS Deep Dive',
    httpsP1: 'Caddy\'s automatic HTTPS is its most compelling feature. It handles the entire TLS lifecycle automatically.',
    httpsList1: 'Obtains certificates from Let\'s Encrypt (or ZeroSSL) using the ACME protocol',
    httpsList2: 'Automatically renews certificates before they expire (default: 30 days before expiry)',
    httpsList3: 'Redirects HTTP to HTTPS automatically',
    httpsList4: 'Enables OCSP stapling for faster TLS handshakes',
    httpsList5: 'Supports ACME DNS challenge for wildcard certificates',
    httpsList6: 'On-demand TLS: obtain certificates at handshake time for dynamic domains',
    h3Wildcard: 'Wildcard Certificates',
    wildcardP: 'Caddy supports wildcard certificates using the DNS challenge. You need a DNS provider plugin for your registrar.',
    h3OnDemand: 'On-Demand TLS',
    onDemandP: 'On-demand TLS obtains certificates during the TLS handshake. This is useful for SaaS platforms where customer domains are not known in advance.',
    h2Docker: 'Docker Deployment',
    dockerIntro: 'Caddy works exceptionally well in Docker environments. Here are common deployment patterns.',
    h3DockerBasic: 'Basic Docker Setup',
    h3DockerCompose: 'Docker Compose Multi-Service',
    h2PHP: 'PHP and WordPress with Caddy',
    phpIntro: 'Caddy has first-class PHP support through the php_fastcgi directive, which handles path splitting, index file resolution, and FastCGI communication.',
    h3PHPBasic: 'Basic PHP Setup',
    h3WordPress: 'WordPress Configuration',
    h2SPA: 'SPA Hosting (React, Vue, Next.js)',
    spaIntro: 'Caddy handles single-page applications elegantly with the try_files directive for client-side routing fallback.',
    h2APIGateway: 'Caddy as API Gateway',
    apiP: 'Caddy can function as an API gateway, routing requests to different backend services based on path prefixes, with rate limiting and CORS headers.',
    h2HTTP3: 'HTTP/3 and QUIC Support',
    http3P: 'Caddy supports HTTP/3 (QUIC) natively and enables it by default. HTTP/3 uses UDP instead of TCP, providing faster connection establishment, better performance on lossy networks, and eliminates head-of-line blocking. No additional configuration is needed — Caddy advertises HTTP/3 support via the Alt-Svc header automatically.',
    h2JSONConfig: 'Caddy JSON Config vs Caddyfile',
    jsonP: 'Caddy has two configuration interfaces: the Caddyfile (human-friendly) and JSON (machine-friendly). The Caddyfile is actually an adapter that converts to JSON internally. The JSON config provides full control over every Caddy feature and is ideal for programmatic configuration.',
    h2AdminAPI: 'Caddy Admin API',
    adminP: 'Caddy exposes a REST API on localhost:2019 for live configuration management. You can load, modify, and inspect configuration without restarting the server.',
    h2Security: 'Rate Limiting and Security Headers',
    securityIntro: 'Caddy provides built-in security features and can be extended with rate limiting modules.',
    h2Logging: 'Logging and Metrics',
    loggingP: 'Caddy produces structured JSON logs by default, which are easy to parse with tools like jq, Loki, or Elasticsearch. It also supports Prometheus metrics via a module.',
    h2Performance: 'Performance Tuning',
    perfP: 'Caddy performs well out of the box, but can be tuned for high-traffic scenarios.',
    perfList1: 'Enable static file compression with encode gzip zstd',
    perfList2: 'Use file_server with precompressed to serve pre-compressed files',
    perfList3: 'Tune worker count with GOMAXPROCS environment variable',
    perfList4: 'Enable HTTP/3 for better performance on mobile and lossy networks',
    perfList5: 'Use header caching directives for static assets',
    perfList6: 'Configure connection keep-alive timeouts appropriately',
    h2Modules: 'Caddy Modules and Plugins',
    modulesP: 'Caddy has a rich plugin ecosystem. Plugins are Go modules that extend Caddy\'s functionality. You build a custom Caddy binary with the plugins you need using xcaddy.',
    h2Migration: 'Migration from Nginx to Caddy',
    migrationIntro: 'Migrating from Nginx to Caddy typically simplifies your configuration dramatically. Here are common Nginx patterns and their Caddy equivalents.',
    h2Production: 'Production Deployment Best Practices',
    prodList1: 'Run Caddy as a systemd service for automatic restart and logging',
    prodList2: 'Use the Caddyfile for human-managed configs, JSON for automation',
    prodList3: 'Store Caddy data directory (/data) on persistent storage for certificates',
    prodList4: 'Set up log rotation for access and error logs',
    prodList5: 'Monitor certificate expiry with Prometheus metrics',
    prodList6: 'Use the admin API endpoint only on localhost (default)',
    prodList7: 'Keep Caddy updated — security patches are released regularly',
    prodList8: 'Test configuration changes with caddy validate before applying',
    h2Troubleshooting: 'Common Issues and Troubleshooting',
    troubleList1: 'Certificate not obtained: Check that ports 80 and 443 are accessible from the internet. Caddy needs these for the ACME HTTP challenge.',
    troubleList2: 'Permission denied on port 80/443: On Linux, run setcap cap_net_bind_service=+ep /usr/bin/caddy or use systemd socket activation.',
    troubleList3: 'Too many certificates: Let\'s Encrypt has rate limits (50 certificates per registered domain per week). Use staging for testing.',
    troubleList4: 'Caddy not reloading config: Use caddy reload instead of restarting. Check caddy validate first.',
    troubleList5: 'Reverse proxy 502 errors: Verify the backend is running and accessible. Check if the backend expects specific Host headers.',
    troubleList6: 'WebSocket not working through proxy: Caddy handles WebSocket upgrades automatically. Check if your backend requires specific headers.',
    troubleList7: 'High memory usage: Check for excessive logging. Caddy\'s memory usage scales with the number of active connections and certificates.',
    troubleList8: 'Slow certificate issuance: DNS propagation can be slow for DNS challenges. Use the HTTP challenge when possible.',
    h2FAQ: 'Frequently Asked Questions',
    faq1Q: 'Is Caddy ready for production use?',
    faq1A: 'Yes. Caddy v2 has been production-ready since 2020 and is used by thousands of companies. It handles automatic HTTPS, graceful reloads, and has been extensively battle-tested. Companies like Cloudflare, Fly.io, and Replit use Caddy in production.',
    faq2Q: 'How does Caddy compare to Nginx in performance?',
    faq2A: 'For most real-world workloads, Caddy and Nginx perform similarly. Nginx has a slight edge in raw static file throughput due to its C implementation, but Caddy\'s Go-based architecture is more than fast enough for the vast majority of use cases. The difference is typically less than 10% and is negligible compared to backend processing time.',
    faq3Q: 'Can Caddy replace Nginx as a reverse proxy?',
    faq3A: 'Absolutely. Caddy excels as a reverse proxy with automatic HTTPS, load balancing, health checks, and WebSocket support. The configuration is dramatically simpler than Nginx. Many teams have migrated from Nginx to Caddy specifically for the reverse proxy use case.',
    faq4Q: 'Does Caddy support wildcard certificates?',
    faq4A: 'Yes. Caddy supports wildcard certificates using the ACME DNS challenge. You need a DNS provider plugin for your registrar (Cloudflare, Route53, Google Cloud DNS, etc.). The configuration is straightforward and certificates are automatically renewed.',
    faq5Q: 'How does Caddy handle certificate renewal?',
    faq5A: 'Caddy automatically renews certificates 30 days before expiry. It uses the same ACME challenge type that was used for initial issuance. If renewal fails, Caddy retries with exponential backoff and logs warnings. Certificates are stored in the Caddy data directory and persist across restarts.',
    faq6Q: 'Can I use Caddy with Docker and Kubernetes?',
    faq6A: 'Yes. Caddy has an official Docker image and works well in container environments. For Kubernetes, you can use Caddy as an ingress controller or as a sidecar proxy. The Docker Compose pattern with Caddy as the entry point for multiple services is very popular.',
    faq7Q: 'Is Caddy free and open source?',
    faq7A: 'Yes. Caddy is licensed under the Apache 2.0 license and is completely free to use, including for commercial purposes. There are no paid tiers or enterprise editions. The full source code is on GitHub.',
    faq8Q: 'How do I migrate from Nginx to Caddy?',
    faq8A: 'Start by translating your nginx.conf to a Caddyfile. Most Nginx directives have direct Caddy equivalents but with simpler syntax. Remove all SSL/TLS configuration (Caddy handles it automatically). Test with caddy validate, then switch DNS. The migration typically reduces config complexity by 60-80%.',
    relatedTitle: 'Related Tools and Guides',
  },
  zh: {
    title: 'Caddy 服务器完全指南 2026：自动 HTTPS、反向代理与现代 Web 服务',
    description: '掌握 Caddy Web 服务器 — 通过 Let\'s Encrypt 实现自动 HTTPS、Caddyfile 配置、反向代理、Docker 部署、PHP/WordPress 托管、HTTP/3 以及从 Nginx 迁移。',
    tldr: 'Caddy 是一个基于 Go 的现代 Web 服务器，通过 Let\'s Encrypt 提供零配置自动 HTTPS。它是 Nginx 和 Apache 的替代品，配置语法（Caddyfile）极其简单。Caddy 自动处理 TLS 证书的获取、续期和 OCSP 装订。支持反向代理、负载均衡、静态文件服务、HTTP/3 和通过管理 API 进行动态配置。在 2026 年的大多数 Web 服务场景中，Caddy 以生产级可靠性提供了最佳开发者体验。',
    takeaway1: 'Caddy 自动从 Let\'s Encrypt 获取和续期 HTTPS 证书 — 无需 certbot、无需 cron、无需手动续期',
    takeaway2: 'Caddyfile 语法比 Nginx/Apache 配置简单得多：基本反向代理只需 3 行',
    takeaway3: 'Caddy 原生支持 HTTP/3 (QUIC)、按需 TLS、通配符证书和 ACME 协议',
    takeaway4: 'Caddy 管理 API 允许不重启或重载即可实时更改配置',
    takeaway5: 'Caddy 非常适合作为 Docker 反向代理，为容器化微服务提供自动 HTTPS',
    takeaway6: '从 Nginx 迁移到 Caddy 通常可减少 60-80% 的配置复杂度',
    intro: 'Caddy 是一个用 Go 编写的开源 Web 服务器，作为 Nginx 和 Apache 的现代替代方案获得了广泛关注。其最突出的特性是自动 HTTPS：Caddy 无需任何配置即可从 Let\'s Encrypt（或 ZeroSSL）获取和续期 TLS 证书。在 2026 年，Caddy 为数百万站点提供服务，已成为想要生产级 Web 服务而不需要复杂传统服务器配置的开发者的首选。本指南涵盖从基础设置到高级生产部署模式的所有内容。',
    h2What: '什么是 Caddy 以及为什么它很重要',
    whatP1: 'Caddy 是一个强大的、可扩展的 Web 服务器平台。它由 Matt Holt 于 2015 年创建，已发展成为成熟的生产级服务器。Caddy v2 是一次完全重写，引入了模块化架构、JSON 配置系统和 Caddyfile 适配器。',
    whatP2: 'Caddy 的独特之处在于其安全默认的理念。HTTPS 默认自动开启。HTTP 请求自动重定向到 HTTPS。OCSP 装订已启用。强制使用现代 TLS 版本。这意味着零配置的全新 Caddy 安装已经比大多数手动配置的 Nginx 或 Apache 更安全。',
    whatList1: '通过 Let\'s Encrypt 和 ZeroSSL 零配置自动 HTTPS',
    whatList2: '用 Go 编写 — 单一静态二进制文件，无依赖，跨平台',
    whatList3: 'Caddyfile：比 Nginx 或 Apache 简单得多的人类可读配置',
    whatList4: '默认启用原生 HTTP/3 (QUIC) 支持',
    whatList5: '管理 API 实现无停机实时配置更改',
    whatList6: '可扩展的模块系统 — 无需 fork 即可添加功能',
    whatList7: '优雅重载、自动证书管理和 OCSP 装订',
    h2Comparison: 'Caddy vs Nginx vs Apache vs Traefik',
    compIntro: '每个 Web 服务器都有适合不同用例的优势。此对比帮助您为项目选择合适的服务器。',
    thFeature: '特性', thCaddy: 'Caddy', thNginx: 'Nginx', thApache: 'Apache', thTraefik: 'Traefik',
    compAutoHTTPS: '自动 HTTPS', compConfig: '配置语法', compPerformance: '原始性能', compMemory: '内存使用', compHTTP3: 'HTTP/3 支持', compDocker: 'Docker 集成', compPlugins: '插件系统', compLearning: '学习曲线', compLanguage: '编写语言', compLicense: '许可证',
    valCaddyHTTPS: '内置（零配置）', valNginxHTTPS: '手动（certbot）', valApacheHTTPS: '手动（certbot）', valTraefikHTTPS: '内置（需配置）',
    valCaddyConfig: 'Caddyfile（简单）', valNginxConfig: 'nginx.conf（复杂）', valApacheConfig: 'httpd.conf + .htaccess', valTraefikConfig: 'YAML/TOML/标签',
    valCaddyPerf: '非常好', valNginxPerf: '优秀', valApachePerf: '良好', valTraefikPerf: '良好',
    valCaddyMem: '低 (~20MB)', valNginxMem: '非常低 (~5MB)', valApacheMem: '高 (~50-200MB)', valTraefikMem: '低 (~30MB)',
    valCaddyHTTP3: '原生（默认开启）', valNginxHTTP3: '实验性', valApacheHTTP3: '不支持', valTraefikHTTP3: '实验性',
    valCaddyDocker: '良好', valNginxDocker: '手动配置', valApacheDocker: '手动配置', valTraefikDocker: '优秀（原生）',
    valCaddyPlugins: 'Go 模块', valNginxPlugins: 'C 模块（编译）', valApachePlugins: '动态模块', valTraefikPlugins: 'Go 插件',
    valCaddyLearn: '简单', valNginxLearn: '中等', valApacheLearn: '中等-困难', valTraefikLearn: '中等',
    valCaddyLang: 'Go', valNginxLang: 'C', valApacheLang: 'C', valTraefikLang: 'Go',
    valCaddyLic: 'Apache 2.0', valNginxLic: 'BSD 2-Clause', valApacheLic: 'Apache 2.0', valTraefikLic: 'MIT',
    h2Install: '安装',
    installIntro: 'Caddy 以单一静态二进制文件分发，无需运行时依赖。',
    h3InstallPkg: '包管理器', h3InstallDocker: 'Docker', h3InstallBinary: '直接下载二进制文件', h3InstallSource: '使用 xcaddy 从源码构建',
    h2Caddyfile: 'Caddyfile 基础',
    caddyfileIntro: 'Caddyfile 是 Caddy 的人类友好配置格式，即使对于复杂设置也易于读写。',
    h3AutoHTTPS: '自动 HTTPS（默认行为）',
    autoHTTPSP: '在 Caddyfile 中指定域名时，Caddy 自动从 Let\'s Encrypt 获取 TLS 证书、将 HTTP 重定向到 HTTPS 并启用 OCSP 装订。无需额外配置。',
    h3FileServer: '静态文件服务器', h3Redirects: '重定向',
    h2ReverseProxy: '反向代理配置',
    rpIntro: 'Caddy 是优秀的反向代理，支持单后端、负载均衡、健康检查、WebSocket 代理和请求头操作。',
    h3SingleBackend: '单后端', h3LoadBalancing: '负载均衡', h3HealthChecks: '健康检查', h3WebSockets: 'WebSocket 代理',
    h3NginxComparison: 'Nginx 等效对比',
    nginxCompP: '以下是相同反向代理配置在 Caddy 和 Nginx 中的对比。',
    h2HTTPS: '自动 HTTPS 深入解析',
    httpsP1: 'Caddy 的自动 HTTPS 是其最引人注目的特性，它自动处理整个 TLS 生命周期。',
    httpsList1: '使用 ACME 协议从 Let\'s Encrypt（或 ZeroSSL）获取证书',
    httpsList2: '证书到期前自动续期（默认：到期前 30 天）',
    httpsList3: '自动将 HTTP 重定向到 HTTPS',
    httpsList4: '启用 OCSP 装订以加快 TLS 握手',
    httpsList5: '支持 ACME DNS 挑战以获取通配符证书',
    httpsList6: '按需 TLS：在 TLS 握手时获取证书，适用于动态域名',
    h3Wildcard: '通配符证书',
    wildcardP: 'Caddy 通过 DNS 挑战支持通配符证书。您需要为您的域名注册商安装 DNS 提供商插件。',
    h3OnDemand: '按需 TLS',
    onDemandP: '按需 TLS 在 TLS 握手期间获取证书。这对于客户域名事先未知的 SaaS 平台很有用。',
    h2Docker: 'Docker 部署',
    dockerIntro: 'Caddy 在 Docker 环境中表现出色。以下是常见的部署模式。',
    h3DockerBasic: '基本 Docker 设置', h3DockerCompose: 'Docker Compose 多服务',
    h2PHP: 'PHP 和 WordPress 与 Caddy',
    phpIntro: 'Caddy 通过 php_fastcgi 指令提供一流的 PHP 支持，处理路径拆分、索引文件解析和 FastCGI 通信。',
    h3PHPBasic: '基本 PHP 设置', h3WordPress: 'WordPress 配置',
    h2SPA: 'SPA 托管（React、Vue、Next.js）',
    spaIntro: 'Caddy 通过 try_files 指令优雅地处理单页应用的客户端路由回退。',
    h2APIGateway: 'Caddy 作为 API 网关',
    apiP: 'Caddy 可以作为 API 网关，根据路径前缀将请求路由到不同的后端服务，并支持速率限制和 CORS 头。',
    h2HTTP3: 'HTTP/3 和 QUIC 支持',
    http3P: 'Caddy 原生支持 HTTP/3 (QUIC) 并默认启用。HTTP/3 使用 UDP 而非 TCP，提供更快的连接建立、在有损网络上更好的性能，并消除队头阻塞。无需额外配置。',
    h2JSONConfig: 'Caddy JSON 配置 vs Caddyfile',
    jsonP: 'Caddy 有两个配置接口：Caddyfile（人类友好）和 JSON（机器友好）。Caddyfile 实际上是一个转换为 JSON 的适配器。JSON 配置提供对每个 Caddy 功能的完全控制。',
    h2AdminAPI: 'Caddy 管理 API',
    adminP: 'Caddy 在 localhost:2019 上暴露 REST API 用于实时配置管理。可以加载、修改和检查配置而无需重启服务器。',
    h2Security: '速率限制和安全头',
    securityIntro: 'Caddy 提供内置安全功能，并可通过速率限制模块扩展。',
    h2Logging: '日志和指标',
    loggingP: 'Caddy 默认生成结构化 JSON 日志，易于用 jq、Loki 或 Elasticsearch 解析。还通过模块支持 Prometheus 指标。',
    h2Performance: '性能调优',
    perfP: 'Caddy 开箱即用性能良好，但可以针对高流量场景进行调优。',
    perfList1: '使用 encode gzip zstd 启用静态文件压缩',
    perfList2: '使用带 precompressed 的 file_server 提供预压缩文件',
    perfList3: '通过 GOMAXPROCS 环境变量调整工作线程数',
    perfList4: '启用 HTTP/3 以在移动和有损网络上获得更好性能',
    perfList5: '使用 header 缓存指令处理静态资源',
    perfList6: '适当配置连接保活超时',
    h2Modules: 'Caddy 模块和插件',
    modulesP: 'Caddy 拥有丰富的插件生态。插件是扩展 Caddy 功能的 Go 模块。使用 xcaddy 构建包含所需插件的自定义 Caddy 二进制文件。',
    h2Migration: '从 Nginx 迁移到 Caddy',
    migrationIntro: '从 Nginx 迁移到 Caddy 通常会大大简化配置。以下是常见的 Nginx 模式及其 Caddy 等效配置。',
    h2Production: '生产部署最佳实践',
    prodList1: '将 Caddy 作为 systemd 服务运行以实现自动重启和日志',
    prodList2: '人工管理配置用 Caddyfile，自动化用 JSON',
    prodList3: '将 Caddy 数据目录 (/data) 存储在持久存储上以保存证书',
    prodList4: '设置访问和错误日志轮转',
    prodList5: '使用 Prometheus 指标监控证书到期',
    prodList6: '管理 API 端点仅在 localhost 上使用（默认）',
    prodList7: '保持 Caddy 更新 — 安全补丁定期发布',
    prodList8: '应用前用 caddy validate 测试配置更改',
    h2Troubleshooting: '常见问题和故障排除',
    troubleList1: '证书未获取：检查端口 80 和 443 是否可从互联网访问。Caddy 需要这些端口进行 ACME HTTP 挑战。',
    troubleList2: '端口 80/443 权限被拒绝：在 Linux 上运行 setcap 或使用 systemd socket 激活。',
    troubleList3: '证书过多：Let\'s Encrypt 有速率限制。测试时使用 staging 环境。',
    troubleList4: '配置不重载：使用 caddy reload 而不是重启。先检查 caddy validate。',
    troubleList5: '反向代理 502 错误：验证后端是否运行并可访问。',
    troubleList6: 'WebSocket 不工作：Caddy 自动处理 WebSocket 升级。检查后端是否需要特定头。',
    troubleList7: '内存使用高：检查是否有过度日志记录。内存使用随活动连接和证书数量而增长。',
    troubleList8: '证书签发慢：DNS 传播对于 DNS 挑战可能较慢。尽可能使用 HTTP 挑战。',
    h2FAQ: '常见问题解答',
    faq1Q: 'Caddy 是否可以用于生产环境？',
    faq1A: '是的。Caddy v2 自 2020 年起已可用于生产，被数千家公司使用。它处理自动 HTTPS、优雅重载，并经过了广泛的实战测试。',
    faq2Q: 'Caddy 与 Nginx 的性能对比如何？',
    faq2A: '对于大多数实际工作负载，Caddy 和 Nginx 性能相当。Nginx 在原始静态文件吞吐量上略有优势，但差异通常小于 10%，与后端处理时间相比可以忽略。',
    faq3Q: 'Caddy 能替代 Nginx 作为反向代理吗？',
    faq3A: '完全可以。Caddy 作为反向代理表现出色，支持自动 HTTPS、负载均衡、健康检查和 WebSocket。配置比 Nginx 简单得多。',
    faq4Q: 'Caddy 支持通配符证书吗？',
    faq4A: '支持。Caddy 通过 ACME DNS 挑战支持通配符证书。需要为您的注册商安装 DNS 提供商插件。',
    faq5Q: 'Caddy 如何处理证书续期？',
    faq5A: 'Caddy 在证书到期前 30 天自动续期。如果续期失败，会以指数退避重试并记录警告。',
    faq6Q: '可以将 Caddy 与 Docker 和 Kubernetes 一起使用吗？',
    faq6A: '可以。Caddy 有官方 Docker 镜像，在容器环境中表现良好。Docker Compose 模式中 Caddy 作为多服务入口点非常流行。',
    faq7Q: 'Caddy 是免费开源的吗？',
    faq7A: '是的。Caddy 使用 Apache 2.0 许可证，完全免费使用，包括商业用途。没有付费层或企业版。',
    faq8Q: '如何从 Nginx 迁移到 Caddy？',
    faq8A: '首先将 nginx.conf 翻译为 Caddyfile。大多数 Nginx 指令都有直接的 Caddy 等效项但语法更简单。移除所有 SSL/TLS 配置。用 caddy validate 测试后切换 DNS。',
    relatedTitle: '相关工具和指南',
  },
};

export default function CaddyServerGuide({ lang }: { lang: string }) {
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

      {/* Intro */}
      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* What Is Caddy */}
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
              {[t.thFeature, t.thCaddy, t.thNginx, t.thApache, t.thTraefik].map((h, i) => (
                <th key={i} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [t.compAutoHTTPS, t.valCaddyHTTPS, t.valNginxHTTPS, t.valApacheHTTPS, t.valTraefikHTTPS],
              [t.compConfig, t.valCaddyConfig, t.valNginxConfig, t.valApacheConfig, t.valTraefikConfig],
              [t.compPerformance, t.valCaddyPerf, t.valNginxPerf, t.valApachePerf, t.valTraefikPerf],
              [t.compMemory, t.valCaddyMem, t.valNginxMem, t.valApacheMem, t.valTraefikMem],
              [t.compHTTP3, t.valCaddyHTTP3, t.valNginxHTTP3, t.valApacheHTTP3, t.valTraefikHTTP3],
              [t.compDocker, t.valCaddyDocker, t.valNginxDocker, t.valApacheDocker, t.valTraefikDocker],
              [t.compPlugins, t.valCaddyPlugins, t.valNginxPlugins, t.valApachePlugins, t.valTraefikPlugins],
              [t.compLearning, t.valCaddyLearn, t.valNginxLearn, t.valApacheLearn, t.valTraefikLearn],
              [t.compLanguage, t.valCaddyLang, t.valNginxLang, t.valApacheLang, t.valTraefikLang],
              [t.compLicense, t.valCaddyLic, t.valNginxLic, t.valApacheLic, t.valTraefikLic],
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

      <h3 style={h3Style}>{t.h3InstallPkg}</h3>
      <pre style={codeStyle}><code>{'# Debian / Ubuntu\n'
        + 'sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl\n'
        + 'curl -1sLf \'https://dl.cloudsmith.io/public/caddy/stable/gpg.key\' \\\n'
        + '  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg\n'
        + 'curl -1sLf \'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt\' \\\n'
        + '  | sudo tee /etc/apt/sources.list.d/caddy-stable.list\n'
        + 'sudo apt update && sudo apt install caddy\n'
        + '\n'
        + '# Fedora / RHEL\n'
        + 'dnf copr enable @caddy/caddy && dnf install caddy\n'
        + '\n'
        + '# macOS\n'
        + 'brew install caddy\n'
        + '\n'
        + '# Windows\n'
        + 'choco install caddy'}</code></pre>

      <h3 style={h3Style}>{t.h3InstallDocker}</h3>
      <pre style={codeStyle}><code>{'# Pull official Caddy image\n'
        + 'docker pull caddy:latest\n'
        + '\n'
        + '# Run with Caddyfile\n'
        + 'docker run -d --name caddy \\\n'
        + '  -p 80:80 -p 443:443 -p 443:443/udp \\\n'
        + '  -v $PWD/Caddyfile:/etc/caddy/Caddyfile \\\n'
        + '  -v caddy_data:/data \\\n'
        + '  -v caddy_config:/config \\\n'
        + '  caddy:latest'}</code></pre>

      <h3 style={h3Style}>{t.h3InstallBinary}</h3>
      <pre style={codeStyle}><code>{'# Download from GitHub releases\n'
        + 'curl -OL https://github.com/caddyserver/caddy/releases/latest/download/caddy_2.9.1_linux_amd64.tar.gz\n'
        + 'tar xzf caddy_2.9.1_linux_amd64.tar.gz\n'
        + 'sudo mv caddy /usr/bin/caddy\n'
        + 'sudo chmod +x /usr/bin/caddy\n'
        + '\n'
        + '# Verify installation\n'
        + 'caddy version'}</code></pre>

      <h3 style={h3Style}>{t.h3InstallSource}</h3>
      <pre style={codeStyle}><code>{'# Install xcaddy (Caddy build tool)\n'
        + 'go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest\n'
        + '\n'
        + '# Build Caddy with custom plugins\n'
        + 'xcaddy build \\\n'
        + '  --with github.com/caddy-dns/cloudflare \\\n'
        + '  --with github.com/mholt/caddy-ratelimit \\\n'
        + '  --with github.com/caddyserver/transform-encoder'}</code></pre>

      {/* Caddyfile Basics */}
      <h2 style={h2Style}>{t.h2Caddyfile}</h2>
      <p style={pStyle}>{t.caddyfileIntro}</p>

      <h3 style={h3Style}>{t.h3AutoHTTPS}</h3>
      <p style={pStyle}>{t.autoHTTPSP}</p>
      <pre style={codeStyle}><code>{'# Minimal Caddyfile — automatic HTTPS!\n'
        + '# Just specify your domain and Caddy does the rest\n'
        + 'example.com {\n'
        + '    respond "Hello, world!"\n'
        + '}\n'
        + '\n'
        + '# What Caddy does automatically:\n'
        + '# 1. Obtains TLS certificate from Let\'s Encrypt\n'
        + '# 2. Redirects http://example.com → https://example.com\n'
        + '# 3. Enables OCSP stapling\n'
        + '# 4. Enforces modern TLS (1.2+)\n'
        + '# 5. Renews certificate before expiry'}</code></pre>

      <h3 style={h3Style}>{t.h3FileServer}</h3>
      <pre style={codeStyle}><code>{'# Serve static files with compression and caching\n'
        + 'example.com {\n'
        + '    root * /var/www/html\n'
        + '    encode gzip zstd\n'
        + '    file_server\n'
        + '\n'
        + '    # Cache static assets for 1 year\n'
        + '    @static path *.css *.js *.png *.jpg *.svg *.woff2\n'
        + '    header @static Cache-Control "public, max-age=31536000, immutable"\n'
        + '\n'
        + '    # Cache HTML for 1 hour\n'
        + '    @html path *.html\n'
        + '    header @html Cache-Control "public, max-age=3600"\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{t.h3Redirects}</h3>
      <pre style={codeStyle}><code>{'# Redirect www to non-www\n'
        + 'www.example.com {\n'
        + '    redir https://example.com{uri} permanent\n'
        + '}\n'
        + '\n'
        + '# Redirect old paths\n'
        + 'example.com {\n'
        + '    redir /old-page /new-page permanent\n'
        + '    redir /blog/old-slug /blog/new-slug 301\n'
        + '}'}</code></pre>

      {/* Reverse Proxy */}
      <h2 style={h2Style}>{t.h2ReverseProxy}</h2>
      <p style={pStyle}>{t.rpIntro}</p>

      <h3 style={h3Style}>{t.h3SingleBackend}</h3>
      <pre style={codeStyle}><code>{'# Simple reverse proxy — 3 lines!\n'
        + 'app.example.com {\n'
        + '    reverse_proxy localhost:3000\n'
        + '}\n'
        + '\n'
        + '# With header manipulation\n'
        + 'api.example.com {\n'
        + '    reverse_proxy localhost:8080 {\n'
        + '        header_up X-Real-IP {remote_host}\n'
        + '        header_up X-Forwarded-Proto {scheme}\n'
        + '        header_down -Server\n'
        + '    }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{t.h3LoadBalancing}</h3>
      <pre style={codeStyle}><code>{'# Load balancing across multiple backends\n'
        + 'app.example.com {\n'
        + '    reverse_proxy {\n'
        + '        to localhost:3001\n'
        + '        to localhost:3002\n'
        + '        to localhost:3003\n'
        + '\n'
        + '        lb_policy round_robin\n'
        + '        # Other policies: random, first, ip_hash,\n'
        + '        # uri_hash, least_conn, header\n'
        + '    }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{t.h3HealthChecks}</h3>
      <pre style={codeStyle}><code>{'# Active health checks\n'
        + 'app.example.com {\n'
        + '    reverse_proxy {\n'
        + '        to localhost:3001\n'
        + '        to localhost:3002\n'
        + '\n'
        + '        health_uri /health\n'
        + '        health_interval 10s\n'
        + '        health_timeout 5s\n'
        + '        health_status 200\n'
        + '\n'
        + '        # Passive health checks (circuit breaker)\n'
        + '        fail_duration 30s\n'
        + '        max_fails 3\n'
        + '        unhealthy_latency 500ms\n'
        + '    }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{t.h3WebSockets}</h3>
      <pre style={codeStyle}><code>{'# WebSocket proxying — Caddy handles upgrade automatically\n'
        + 'ws.example.com {\n'
        + '    reverse_proxy localhost:8080\n'
        + '    # That\'s it! Caddy detects WebSocket upgrades\n'
        + '    # and handles them transparently.\n'
        + '}\n'
        + '\n'
        + '# With path-based routing\n'
        + 'example.com {\n'
        + '    reverse_proxy /ws/* localhost:8080\n'
        + '    reverse_proxy /api/* localhost:3000\n'
        + '    file_server\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{t.h3NginxComparison}</h3>
      <p style={pStyle}>{t.nginxCompP}</p>
      <pre style={codeStyle}><code>{'# CADDY — Reverse proxy with HTTPS (3 lines)\n'
        + 'app.example.com {\n'
        + '    reverse_proxy localhost:3000\n'
        + '}\n'
        + '\n'
        + '# NGINX equivalent (~25 lines + certbot + cron)\n'
        + '# server { listen 80; server_name app.example.com;\n'
        + '#   return 301 https://$server_name$request_uri; }\n'
        + '# server { listen 443 ssl http2;\n'
        + '#   server_name app.example.com;\n'
        + '#   ssl_certificate /etc/letsencrypt/live/.../fullchain.pem;\n'
        + '#   ssl_certificate_key /etc/letsencrypt/live/.../privkey.pem;\n'
        + '#   location / {\n'
        + '#     proxy_pass http://localhost:3000;\n'
        + '#     proxy_set_header Host $host;\n'
        + '#     proxy_set_header X-Real-IP $remote_addr;\n'
        + '#     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n'
        + '#   }\n'
        + '# } + certbot setup + renewal cron job'}</code></pre>

      {/* Automatic HTTPS Deep Dive */}
      <h2 style={h2Style}>{t.h2HTTPS}</h2>
      <p style={pStyle}>{t.httpsP1}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.httpsList1, t.httpsList2, t.httpsList3, t.httpsList4, t.httpsList5, t.httpsList6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      <h3 style={h3Style}>{t.h3Wildcard}</h3>
      <p style={pStyle}>{t.wildcardP}</p>
      <pre style={codeStyle}><code>{'# Wildcard certificate with Cloudflare DNS\n'
        + '# Build Caddy with: xcaddy build --with github.com/caddy-dns/cloudflare\n'
        + '\n'
        + '*.example.com {\n'
        + '    tls {\n'
        + '        dns cloudflare {env.CLOUDFLARE_API_TOKEN}\n'
        + '    }\n'
        + '\n'
        + '    @app host app.example.com\n'
        + '    handle @app {\n'
        + '        reverse_proxy localhost:3000\n'
        + '    }\n'
        + '\n'
        + '    @api host api.example.com\n'
        + '    handle @api {\n'
        + '        reverse_proxy localhost:8080\n'
        + '    }\n'
        + '\n'
        + '    handle {\n'
        + '        respond "Unknown subdomain" 404\n'
        + '    }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{t.h3OnDemand}</h3>
      <p style={pStyle}>{t.onDemandP}</p>
      <pre style={codeStyle}><code>{'# On-demand TLS for SaaS custom domains\n'
        + '{\n'
        + '    on_demand_tls {\n'
        + '        ask http://localhost:5555/check-domain\n'
        + '        interval 5m\n'
        + '        burst 10\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'https:// {\n'
        + '    tls {\n'
        + '        on_demand\n'
        + '    }\n'
        + '    reverse_proxy localhost:3000\n'
        + '}'}</code></pre>

      {/* Docker Deployment */}
      <h2 style={h2Style}>{t.h2Docker}</h2>
      <p style={pStyle}>{t.dockerIntro}</p>

      <h3 style={h3Style}>{t.h3DockerBasic}</h3>
      <pre style={codeStyle}><code>{'# Dockerfile for custom Caddy\n'
        + 'FROM caddy:2-builder AS builder\n'
        + 'RUN xcaddy build \\\n'
        + '    --with github.com/caddy-dns/cloudflare \\\n'
        + '    --with github.com/mholt/caddy-ratelimit\n'
        + '\n'
        + 'FROM caddy:2\n'
        + 'COPY --from=builder /usr/bin/caddy /usr/bin/caddy\n'
        + 'COPY Caddyfile /etc/caddy/Caddyfile'}</code></pre>

      <h3 style={h3Style}>{t.h3DockerCompose}</h3>
      <pre style={codeStyle}><code>{'# docker-compose.yml — Multi-service with Caddy\n'
        + 'services:\n'
        + '  caddy:\n'
        + '    image: caddy:latest\n'
        + '    restart: unless-stopped\n'
        + '    ports: ["80:80", "443:443", "443:443/udp"]\n'
        + '    volumes:\n'
        + '      - ./Caddyfile:/etc/caddy/Caddyfile\n'
        + '      - caddy_data:/data\n'
        + '    networks: [web]\n'
        + '  app:\n'
        + '    build: ./app\n'
        + '    expose: ["3000"]\n'
        + '    networks: [web]\n'
        + '  api:\n'
        + '    build: ./api\n'
        + '    expose: ["8080"]\n'
        + '    networks: [web, backend]\n'
        + '  db:\n'
        + '    image: postgres:16-alpine\n'
        + '    volumes: [pgdata:/var/lib/postgresql/data]\n'
        + '    networks: [backend]\n'
        + 'volumes: { caddy_data: {}, pgdata: {} }\n'
        + 'networks: { web: {}, backend: {} }\n'
        + '\n'
        + '# Caddyfile for the compose setup\n'
        + 'app.example.com { reverse_proxy app:3000 }\n'
        + 'api.example.com { reverse_proxy api:8080 }'}</code></pre>

      {/* PHP / WordPress */}
      <h2 style={h2Style}>{t.h2PHP}</h2>
      <p style={pStyle}>{t.phpIntro}</p>

      <h3 style={h3Style}>{t.h3PHPBasic}</h3>
      <pre style={codeStyle}><code>{'# Basic PHP with Caddy\n'
        + 'example.com {\n'
        + '    root * /var/www/html\n'
        + '    encode gzip\n'
        + '    php_fastcgi unix//run/php/php8.3-fpm.sock\n'
        + '    file_server\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{t.h3WordPress}</h3>
      <pre style={codeStyle}><code>{'# WordPress with Caddy — complete config\n'
        + 'example.com {\n'
        + '    root * /var/www/wordpress\n'
        + '    encode gzip\n'
        + '\n'
        + '    # PHP processing\n'
        + '    php_fastcgi unix//run/php/php8.3-fpm.sock\n'
        + '\n'
        + '    # Static file serving\n'
        + '    file_server\n'
        + '\n'
        + '    # Block access to sensitive files\n'
        + '    @blocked path /xmlrpc.php /wp-config.php\n'
        + '    respond @blocked 403\n'
        + '\n'
        + '    # Cache static assets\n'
        + '    @static path *.css *.js *.png *.jpg *.gif *.ico *.svg *.woff2\n'
        + '    header @static Cache-Control "public, max-age=31536000"\n'
        + '\n'
        + '    # Security headers\n'
        + '    header {\n'
        + '        X-Content-Type-Options nosniff\n'
        + '        X-Frame-Options SAMEORIGIN\n'
        + '        Referrer-Policy strict-origin-when-cross-origin\n'
        + '        -Server\n'
        + '    }\n'
        + '}'}</code></pre>

      {/* SPA Hosting */}
      <h2 style={h2Style}>{t.h2SPA}</h2>
      <p style={pStyle}>{t.spaIntro}</p>
      <pre style={codeStyle}><code>{'# React / Vue SPA hosting\n'
        + 'app.example.com {\n'
        + '    root * /var/www/app/dist\n'
        + '    encode gzip zstd\n'
        + '\n'
        + '    # SPA client-side routing fallback\n'
        + '    try_files {path} /index.html\n'
        + '    file_server\n'
        + '\n'
        + '    # Proxy API requests to backend\n'
        + '    reverse_proxy /api/* localhost:8080\n'
        + '\n'
        + '    # Cache static assets aggressively\n'
        + '    @static path *.js *.css *.png *.svg *.woff2\n'
        + '    header @static Cache-Control "public, max-age=31536000, immutable"\n'
        + '}\n'
        + '\n'
        + '# Next.js / Nuxt.js (SSR mode)\n'
        + 'ssr.example.com {\n'
        + '    reverse_proxy localhost:3000\n'
        + '}'}</code></pre>

      {/* API Gateway */}
      <h2 style={h2Style}>{t.h2APIGateway}</h2>
      <p style={pStyle}>{t.apiP}</p>
      <pre style={codeStyle}><code>{'# Caddy as API Gateway\n'
        + 'api.example.com {\n'
        + '    # CORS headers\n'
        + '    header Access-Control-Allow-Origin "https://app.example.com"\n'
        + '    header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"\n'
        + '    header Access-Control-Allow-Headers "Authorization, Content-Type"\n'
        + '\n'
        + '    # Route to different microservices\n'
        + '    reverse_proxy /users/* user-service:3001\n'
        + '    reverse_proxy /orders/* order-service:3002\n'
        + '    reverse_proxy /payments/* payment-service:3003\n'
        + '    reverse_proxy /notifications/* notification-service:3004\n'
        + '\n'
        + '    # Health check endpoint\n'
        + '    respond /health 200\n'
        + '}'}</code></pre>

      {/* HTTP/3 */}
      <h2 style={h2Style}>{t.h2HTTP3}</h2>
      <p style={pStyle}>{t.http3P}</p>
      <pre style={codeStyle}><code>{'# HTTP/3 is enabled by default in Caddy!\n'
        + '# Make sure to expose UDP port 443:\n'
        + '# docker run -p 443:443/udp ...\n'
        + '\n'
        + '# To explicitly disable HTTP/3:\n'
        + '{\n'
        + '    servers {\n'
        + '        protocols h1 h2\n'
        + '        # Omitting h3 disables QUIC\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + '# Response headers will include:\n'
        + '# Alt-Svc: h3=":443"; ma=2592000'}</code></pre>

      {/* JSON Config vs Caddyfile */}
      <h2 style={h2Style}>{t.h2JSONConfig}</h2>
      <p style={pStyle}>{t.jsonP}</p>
      <pre style={codeStyle}><code>{'# Convert Caddyfile to JSON (see what Caddy generates internally)\n'
        + 'caddy adapt --config Caddyfile --pretty\n'
        + '\n'
        + '# JSON config gives full control — ideal for programmatic configs\n'
        + '# { "apps": { "http": { "servers": { "srv0": {\n'
        + '#   "listen": [":443"],\n'
        + '#   "routes": [{ "match": [{"host": ["app.example.com"]}],\n'
        + '#     "handle": [{"handler": "reverse_proxy",\n'
        + '#       "upstreams": [{"dial": "localhost:3000"}]}] }]\n'
        + '# }}}}}'}</code></pre>

      {/* Admin API */}
      <h2 style={h2Style}>{t.h2AdminAPI}</h2>
      <p style={pStyle}>{t.adminP}</p>
      <pre style={codeStyle}><code>{'# Caddy Admin API (localhost:2019)\n'
        + '\n'
        + '# Load new JSON config\n'
        + 'curl localhost:2019/load -H "Content-Type: application/json" -d @caddy.json\n'
        + '\n'
        + '# Load Caddyfile via adapter\n'
        + 'curl localhost:2019/load -H "Content-Type: text/caddyfile" --data-binary @Caddyfile\n'
        + '\n'
        + '# Get current config\n'
        + 'curl localhost:2019/config/\n'
        + '\n'
        + '# Graceful reload from CLI\n'
        + 'caddy reload --config /etc/caddy/Caddyfile'}</code></pre>

      {/* Security */}
      <h2 style={h2Style}>{t.h2Security}</h2>
      <p style={pStyle}>{t.securityIntro}</p>
      <pre style={codeStyle}><code>{'# Security headers and rate limiting\n'
        + 'example.com {\n'
        + '    header {\n'
        + '        Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"\n'
        + '        X-Content-Type-Options nosniff\n'
        + '        X-Frame-Options DENY\n'
        + '        Referrer-Policy strict-origin-when-cross-origin\n'
        + '        Permissions-Policy "camera=(), microphone=(), geolocation=()"\n'
        + '        -Server\n'
        + '    }\n'
        + '\n'
        + '    # Basic authentication\n'
        + '    basicauth /admin/* {\n'
        + '        admin $2a$14$hashed_password_here\n'
        + '    }\n'
        + '\n'
        + '    # IP allowlist\n'
        + '    @blocked not remote_ip 10.0.0.0/8\n'
        + '    respond @blocked /internal/* 403\n'
        + '\n'
        + '    reverse_proxy localhost:3000\n'
        + '}'}</code></pre>

      {/* Logging */}
      <h2 style={h2Style}>{t.h2Logging}</h2>
      <p style={pStyle}>{t.loggingP}</p>
      <pre style={codeStyle}><code>{'# Structured JSON logging with rotation\n'
        + 'example.com {\n'
        + '    log {\n'
        + '        output file /var/log/caddy/access.log {\n'
        + '            roll_size 100MiB\n'
        + '            roll_keep 10\n'
        + '        }\n'
        + '        format json\n'
        + '    }\n'
        + '    reverse_proxy localhost:3000\n'
        + '}\n'
        + '# Prometheus metrics: built-in at :2019/metrics'}</code></pre>

      {/* Performance */}
      <h2 style={h2Style}>{t.h2Performance}</h2>
      <p style={pStyle}>{t.perfP}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.perfList1, t.perfList2, t.perfList3, t.perfList4, t.perfList5, t.perfList6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>
      <pre style={codeStyle}><code>{'# Performance-optimized Caddyfile\n'
        + 'example.com {\n'
        + '    root * /var/www/html\n'
        + '\n'
        + '    # Enable compression (gzip + zstd)\n'
        + '    encode zstd gzip\n'
        + '\n'
        + '    # Serve pre-compressed files if available\n'
        + '    file_server {\n'
        + '        precompressed zstd gzip br\n'
        + '    }\n'
        + '\n'
        + '    # Aggressive caching for static assets\n'
        + '    @immutable path *.js *.css *.woff2 *.png *.jpg *.svg\n'
        + '    header @immutable {\n'
        + '        Cache-Control "public, max-age=31536000, immutable"\n'
        + '        Vary Accept-Encoding\n'
        + '    }\n'
        + '\n'
        + '    # Keep-alive settings\n'
        + '    # (Caddy defaults are good for most cases)\n'
        + '}'}</code></pre>

      {/* Modules */}
      <h2 style={h2Style}>{t.h2Modules}</h2>
      <p style={pStyle}>{t.modulesP}</p>
      <pre style={codeStyle}><code>{'# Popular Caddy modules (install with xcaddy)\n'
        + 'xcaddy build \\\n'
        + '  --with github.com/caddy-dns/cloudflare \\   # DNS challenge (Cloudflare)\n'
        + '  --with github.com/caddy-dns/route53 \\      # DNS challenge (AWS)\n'
        + '  --with github.com/mholt/caddy-ratelimit \\  # Rate limiting\n'
        + '  --with github.com/caddyserver/cache-handler # HTTP caching\n'
        + '\n'
        + '# Prometheus metrics — built-in since v2.7 (no plugin needed)\n'
        + '# List installed modules\n'
        + 'caddy list-modules'}</code></pre>

      {/* Migration */}
      <h2 style={h2Style}>{t.h2Migration}</h2>
      <p style={pStyle}>{t.migrationIntro}</p>
      <pre style={codeStyle}><code>{'# Migration cheat sheet: Nginx → Caddy\n'
        + '#\n'
        + '# server { listen 443 ssl; server_name X; }  →  X { }\n'
        + '# location / { proxy_pass http://...; }      →  reverse_proxy localhost:3000\n'
        + '# location ~ \\.php$ { fastcgi_pass ...; }    →  php_fastcgi unix//run/php/php8.3-fpm.sock\n'
        + '# try_files $uri $uri/ /index.html           →  try_files {path} /index.html\n'
        + '# rewrite ^/old$ /new permanent               →  redir /old /new permanent\n'
        + '# add_header X-Frame-Options DENY             →  header X-Frame-Options DENY\n'
        + '# ssl_certificate + certbot + cron            →  (automatic — nothing needed)\n'
        + '# gzip on; gzip_types ...                     →  encode gzip zstd'}</code></pre>

      {/* Production Best Practices */}
      <h2 style={h2Style}>{t.h2Production}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.prodList1, t.prodList2, t.prodList3, t.prodList4, t.prodList5, t.prodList6, t.prodList7, t.prodList8].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>
      <pre style={codeStyle}><code>{'# Install as systemd service (package managers do this automatically)\n'
        + 'sudo systemctl enable --now caddy\n'
        + '\n'
        + '# Validate config before applying\n'
        + 'caddy validate --config /etc/caddy/Caddyfile\n'
        + '\n'
        + '# Graceful reload (no downtime)\n'
        + 'sudo systemctl reload caddy\n'
        + '\n'
        + '# Check status and logs\n'
        + 'sudo systemctl status caddy\n'
        + 'journalctl -u caddy --no-pager -f'}</code></pre>

      {/* Troubleshooting */}
      <h2 style={h2Style}>{t.h2Troubleshooting}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.troubleList1, t.troubleList2, t.troubleList3, t.troubleList4, t.troubleList5, t.troubleList6, t.troubleList7, t.troubleList8].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

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
