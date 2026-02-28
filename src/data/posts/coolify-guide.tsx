'use client';
import React from 'react';

const translations: Record<string, {
  title: string;
  description: string;
  toc: string[];
  tldr: string;
  takeaways: string[];
  intro: string;
  whatIsTitle: string;
  whatIsDesc: string;
  whyMattersTitle: string;
  whyMatters: string[];
  comparisonTitle: string;
  comparisonDesc: string;
  requirementsTitle: string;
  requirementsDesc: string;
  installTitle: string;
  installDesc: string;
  architectureTitle: string;
  architectureDesc: string;
  archComponents: string[];
  deployAppsTitle: string;
  deployAppsDesc: string;
  dockerDeployTitle: string;
  dockerDeployDesc: string;
  databaseTitle: string;
  databaseDesc: string;
  dbList: string[];
  envVarsTitle: string;
  envVarsDesc: string;
  domainsTitle: string;
  domainsDesc: string;
  gitIntegrationTitle: string;
  gitIntegrationDesc: string;
  v4Title: string;
  v4Desc: string;
  v4Features: string[];
  multiServerTitle: string;
  multiServerDesc: string;
  monitoringTitle: string;
  monitoringDesc: string;
  backupTitle: string;
  backupDesc: string;
  resourceTitle: string;
  resourceDesc: string;
  costTitle: string;
  costDesc: string;
  securityTitle: string;
  securityDesc: string;
  securityTips: string[];
  bestPracticesTitle: string;
  bestPractices: string[];
  troubleshootTitle: string;
  troubleshootDesc: string;
  apiTitle: string;
  apiDesc: string;
  faq1Q: string; faq1A: string;
  faq2Q: string; faq2A: string;
  faq3Q: string; faq3A: string;
  faq4Q: string; faq4A: string;
  faq5Q: string; faq5A: string;
  faq6Q: string; faq6A: string;
  faq7Q: string; faq7A: string;
  faq8Q: string; faq8A: string;
  faqTitle: string;
  conclusionTitle: string;
  conclusionDesc: string;
}> = {
  en: {
    title: 'Coolify Complete Guide 2026: Self-Hosted PaaS Alternative to Vercel, Netlify, and Heroku',
    description: 'Learn how to deploy and manage applications with Coolify, the open-source self-hosted PaaS. Covers installation, Docker deployments, databases, SSL, CI/CD, multi-server management, and production best practices.',
    toc: [
      'What Is Coolify and Why It Matters',
      'Coolify vs Vercel vs Netlify vs Railway vs Heroku',
      'Requirements and Installation',
      'Architecture Overview',
      'Deploying Applications',
      'Docker and Docker Compose Deployments',
      'Database Management',
      'Environment Variables and Secrets',
      'Custom Domains and SSL',
      'GitHub/GitLab Integration',
      'Coolify v4 Features',
      'Multi-Server Management',
      'Monitoring and Logs',
      'Backup and Restore',
      'Resource Management and Scaling',
      'Cost Comparison',
      'Security Hardening',
      'Production Best Practices',
      'Troubleshooting',
      'Coolify API Usage',
      'FAQ',
    ],
    tldr: 'Coolify is a free, open-source, self-hosted PaaS that lets you deploy applications, databases, and services on your own servers with a single command install. It provides automatic SSL, Git-based deployments, one-click databases, and a Vercel-like experience without vendor lock-in or per-seat pricing. In 2026, Coolify v4 supports multi-server management, Docker Compose deployments, and a powerful API, making it a production-ready alternative to Vercel, Netlify, Railway, and Heroku.',
    takeaways: [
      'Coolify installs on any VPS with a single curl command and provides a full PaaS experience',
      'Supports Node.js, Python, Go, PHP, Ruby, Rust, static sites, Docker, and Docker Compose deployments',
      'One-click database provisioning for PostgreSQL, MySQL, MongoDB, Redis, and more',
      'Automatic SSL via Let\'s Encrypt with Traefik reverse proxy',
      'Native GitHub and GitLab integration with automatic deployments on push',
      'Multi-server management from a single dashboard',
      'A typical 4GB VPS at $5-20/month replaces $50-500/month in cloud platform costs',
      'Coolify v4 brings a new UI, improved API, S3 backups, and Sentinel monitoring agent',
    ],
    intro: 'The self-hosting movement is accelerating in 2026. Developers and teams are moving away from expensive cloud platforms to regain control over their infrastructure, reduce costs, and eliminate vendor lock-in. Coolify is at the forefront of this shift — an open-source, self-hosted Platform-as-a-Service (PaaS) that gives you a Vercel-like deployment experience on your own servers. This guide covers everything you need to know to install, configure, and run Coolify in production.',
    whatIsTitle: 'What Is Coolify and Why It Matters',
    whatIsDesc: 'Coolify is a free, open-source, self-hosted PaaS built to simplify application deployment and server management. Think of it as your own private Heroku or Vercel, running on servers you control. It abstracts away Docker, reverse proxies, SSL certificates, and deployment pipelines into a clean web UI.',
    whyMattersTitle: 'Why Coolify Matters in 2026',
    whyMatters: [
      'Zero vendor lock-in: your code, your servers, your data',
      'No per-seat pricing: unlimited team members at no extra cost',
      'Full data sovereignty and GDPR compliance control',
      'Dramatically lower costs: a $5 VPS replaces $50+ in platform fees',
      'Growing ecosystem: 30,000+ GitHub stars, active community, frequent releases',
      'Supports any language, framework, or Docker image',
    ],
    comparisonTitle: 'Coolify vs Vercel vs Netlify vs Railway vs Heroku',
    comparisonDesc: 'Here is how Coolify compares to popular cloud deployment platforms across key dimensions for a typical full-stack application in 2026.',
    requirementsTitle: 'Requirements and Installation',
    requirementsDesc: 'Coolify runs on any Linux server (Ubuntu 22.04+ recommended) with SSH access. The minimum requirements are modest, but production workloads need more resources.',
    installTitle: 'One-Command Installation',
    installDesc: 'Coolify installs with a single curl command that sets up Docker, the Coolify application, and all dependencies automatically.',
    architectureTitle: 'Architecture Overview',
    architectureDesc: 'Understanding Coolify\'s architecture helps you troubleshoot issues and optimize your setup. Coolify is built on proven, battle-tested components.',
    archComponents: [
      'Coolify Application: A Laravel-based web UI and API for managing deployments, served via Nginx',
      'Docker Engine: All applications, databases, and services run as Docker containers',
      'Traefik: Automatic reverse proxy handling HTTPS termination, routing, and load balancing',
      'PostgreSQL: Internal database storing Coolify configuration, deployment history, and metadata',
      'Redis: Queue management and caching for background jobs and real-time updates',
      'Sentinel (v4): Optional monitoring agent for resource metrics and health checks',
    ],
    deployAppsTitle: 'Deploying Applications',
    deployAppsDesc: 'Coolify supports deploying applications from Git repositories, Docker images, or raw Dockerfiles. Here are deployment examples for popular frameworks.',
    dockerDeployTitle: 'Docker and Docker Compose Deployments',
    dockerDeployDesc: 'For complex applications with multiple services, Coolify supports Docker Compose deployments directly. Push your docker-compose.yml and Coolify handles the rest.',
    databaseTitle: 'Database Management',
    databaseDesc: 'Coolify provides one-click provisioning for databases with automatic backups, persistent volumes, and easy connection string management.',
    dbList: [
      'PostgreSQL (16, 15, 14, 13)',
      'MySQL (8.4, 8.0)',
      'MariaDB (11, 10)',
      'MongoDB (7, 6)',
      'Redis (7, Stack)',
      'Dragonfly (fast Redis alternative)',
      'ClickHouse (analytics)',
      'KeyDB (multi-threaded Redis)',
    ],
    envVarsTitle: 'Environment Variables and Secrets',
    envVarsDesc: 'Coolify provides a secure way to manage environment variables with support for shared variables across services, build-time and runtime separation, and preview-specific overrides.',
    domainsTitle: 'Custom Domains and SSL',
    domainsDesc: 'Coolify automatically provisions SSL certificates via Let\'s Encrypt through its integrated Traefik reverse proxy. Adding a custom domain requires just a DNS A record and a domain entry in the Coolify dashboard.',
    gitIntegrationTitle: 'GitHub/GitLab Integration and Auto-Deploy',
    gitIntegrationDesc: 'Coolify integrates natively with GitHub and GitLab. Connect your account through OAuth, select a repository, and Coolify creates webhook listeners for automatic deployments on every push.',
    v4Title: 'Coolify v4 Features and Improvements',
    v4Desc: 'Coolify v4 is a major rewrite bringing significant improvements in usability, performance, and reliability.',
    v4Features: [
      'Completely redesigned UI with improved navigation and dark mode',
      'New Sentinel monitoring agent for real-time resource tracking',
      'Improved Docker Compose support with full YAML compatibility',
      'S3-compatible backup destinations (AWS, Cloudflare R2, MinIO)',
      'Enhanced API with full CRUD operations for all resources',
      'Improved webhook handling and deployment pipeline',
      'Tags and filtering for organizing large numbers of resources',
      'Terminal access to running containers from the dashboard',
      'Improved multi-server proxy management',
      'Automatic server cleanup and resource reclamation',
    ],
    multiServerTitle: 'Multi-Server Management',
    multiServerDesc: 'Coolify can manage multiple servers from a single dashboard. Install Coolify on your primary server, then add remote servers by providing SSH credentials. Each server runs its own Docker engine and Traefik instance, while Coolify orchestrates deployments across all of them.',
    monitoringTitle: 'Monitoring and Logs',
    monitoringDesc: 'Coolify v4 includes built-in monitoring through the Sentinel agent. It tracks CPU, memory, disk, and network usage per server and per container. You can view real-time logs for any application or service directly in the dashboard.',
    backupTitle: 'Backup and Restore Strategies',
    backupDesc: 'Coolify supports automated database backups to local storage or S3-compatible destinations. You can schedule backups at custom intervals and set retention policies.',
    resourceTitle: 'Resource Management and Scaling',
    resourceDesc: 'Coolify lets you set resource limits per container (CPU, memory) and configure horizontal scaling through Docker Compose replicas. For vertical scaling, resize your VPS and Coolify automatically uses the additional resources.',
    costTitle: 'Cost Comparison: VPS vs Cloud Platforms',
    costDesc: 'One of the biggest advantages of Coolify is cost savings. Here is a realistic comparison for a typical full-stack application with a database, background workers, and moderate traffic.',
    securityTitle: 'Security Hardening',
    securityDesc: 'Running your own PaaS means you are responsible for security. Follow these hardening steps for a production Coolify installation.',
    securityTips: [
      'Enable UFW firewall and allow only ports 22, 80, 443',
      'Use SSH key authentication and disable password login',
      'Keep the host OS and Docker updated regularly',
      'Enable automatic security updates on Ubuntu',
      'Set strong passwords for Coolify admin and all databases',
      'Use Coolify\'s built-in environment variable encryption',
      'Restrict Coolify dashboard access with IP allowlisting or VPN',
      'Enable 2FA on your GitHub/GitLab accounts used for deployment',
      'Review Docker container permissions — avoid running as root',
      'Monitor server access logs and set up fail2ban',
    ],
    bestPracticesTitle: 'Production Best Practices',
    bestPractices: [
      'Use a dedicated VPS for Coolify — do not share with other manual Docker setups',
      'Always set resource limits (CPU and memory) on containers to prevent one app from starving others',
      'Enable automated database backups to an S3 destination — never rely on local-only backups',
      'Use separate staging and production environments with different servers if budget allows',
      'Pin Docker image versions in production — never use :latest tags',
      'Set up health checks for all services to enable automatic restarts',
      'Use preview deployments for pull requests before merging to main',
      'Monitor disk usage — Docker images and build caches grow quickly',
      'Run docker system prune periodically or enable Coolify\'s automatic cleanup',
      'Keep Coolify updated — run the built-in update from the dashboard regularly',
    ],
    troubleshootTitle: 'Common Issues and Troubleshooting',
    troubleshootDesc: 'Here are the most common issues when running Coolify and how to resolve them.',
    apiTitle: 'Coolify API Usage',
    apiDesc: 'Coolify v4 provides a comprehensive REST API for programmatic management. Generate an API token from the dashboard under Settings > API Tokens.',
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'Is Coolify free to use?',
    faq1A: 'Yes, Coolify is completely free and open source under the Apache 2.0 license. You can self-host it at no cost on your own server. The Coolify team also offers a paid cloud version if you prefer not to manage the server yourself, but the self-hosted version has the same features.',
    faq2Q: 'What are the minimum server requirements for Coolify?',
    faq2A: 'The minimum requirements are 2 CPU cores, 2GB RAM, and 30GB disk space running Ubuntu 22.04 or later. For production use with multiple applications and databases, we recommend at least 4 CPU cores, 8GB RAM, and 80GB SSD. Coolify itself uses approximately 500MB-1GB of RAM.',
    faq3Q: 'Can Coolify replace Vercel for Next.js deployments?',
    faq3A: 'Yes, Coolify fully supports Next.js applications including server-side rendering, API routes, and middleware. The main difference is that Vercel offers a global edge network, while Coolify deploys to your specific server location. For most applications where a single region is sufficient, Coolify provides equivalent functionality at a fraction of the cost.',
    faq4Q: 'How does Coolify handle SSL certificates?',
    faq4A: 'Coolify uses Traefik as its reverse proxy, which automatically provisions and renews SSL certificates from Let\'s Encrypt. When you add a custom domain in the Coolify dashboard and point your DNS A record to your server IP, Traefik automatically obtains a certificate. Renewal happens automatically before expiration.',
    faq5Q: 'Can I migrate from Heroku or Railway to Coolify?',
    faq5A: 'Yes. For most applications, migration involves setting up Coolify, connecting your Git repository, configuring environment variables, and updating DNS records. Coolify supports the same Dockerfile-based or Buildpack-based deployment workflows. Database migration requires exporting data from your current provider and importing it into a Coolify-managed database.',
    faq6Q: 'Does Coolify support horizontal scaling and load balancing?',
    faq6A: 'Coolify supports horizontal scaling through Docker Compose replicas and multi-server management. For a single server, you can run multiple container replicas behind Traefik\'s built-in load balancer. For true horizontal scaling across servers, deploy the same application to multiple Coolify-managed servers and use an external load balancer or DNS-based distribution.',
    faq7Q: 'How do I update Coolify to the latest version?',
    faq7A: 'Coolify includes a built-in update mechanism. Navigate to Settings in the dashboard and click Update. Alternatively, run the install command again on your server, which performs an in-place upgrade while preserving your data and configuration. Always backup your Coolify PostgreSQL database before major updates.',
    faq8Q: 'Is Coolify suitable for production workloads?',
    faq8A: 'Yes. Many teams and companies run production applications on Coolify. It uses battle-tested components like Docker, Traefik, and PostgreSQL. The key to production readiness is proper server sizing, automated backups, monitoring, and following the security hardening steps outlined in this guide. For high-availability requirements, use multi-server setups with external health monitoring.',
    conclusionTitle: 'Conclusion',
    conclusionDesc: 'Coolify represents the maturing self-hosting ecosystem in 2026. It eliminates the complexity of managing Docker, reverse proxies, and SSL certificates while giving you full control over your infrastructure. Whether you are a solo developer looking to cut hosting costs or a team seeking data sovereignty, Coolify provides a production-grade deployment platform at a fraction of cloud platform pricing.',
  },
  zh: {
    title: 'Coolify 完全指南 2026：自托管 PaaS 替代 Vercel、Netlify 和 Heroku',
    description: '学习如何使用 Coolify 这个开源自托管 PaaS 部署和管理应用。涵盖安装、Docker 部署、数据库、SSL、CI/CD、多服务器管理和生产最佳实践。',
    toc: [
      '什么是 Coolify 以及为什么它很重要',
      'Coolify vs Vercel vs Netlify vs Railway vs Heroku',
      '系统要求和安装',
      '架构概览',
      '部署应用',
      'Docker 和 Docker Compose 部署',
      '数据库管理',
      '环境变量和密钥',
      '自定义域名和 SSL',
      'GitHub/GitLab 集成',
      'Coolify v4 新特性',
      '多服务器管理',
      '监控和日志',
      '备份与恢复',
      '资源管理和扩展',
      '成本对比',
      '安全加固',
      '生产最佳实践',
      '常见问题排查',
      'Coolify API 使用',
      '常见问题',
    ],
    tldr: 'Coolify 是一个免费的开源自托管 PaaS，让你能够通过一条命令在自己的服务器上部署应用、数据库和服务。它提供自动 SSL、基于 Git 的部署、一键数据库和类似 Vercel 的体验，没有供应商锁定或按席位计费。2026 年，Coolify v4 支持多服务器管理、Docker Compose 部署和强大的 API，是 Vercel、Netlify、Railway 和 Heroku 的生产级替代方案。',
    takeaways: [
      'Coolify 在任何 VPS 上通过一条 curl 命令安装，提供完整的 PaaS 体验',
      '支持 Node.js、Python、Go、PHP、Ruby、Rust、静态站点、Docker 和 Docker Compose 部署',
      '一键部署 PostgreSQL、MySQL、MongoDB、Redis 等数据库',
      '通过 Traefik 反向代理自动配置 Let\'s Encrypt SSL',
      '原生 GitHub 和 GitLab 集成，push 时自动部署',
      '单一仪表板管理多台服务器',
      '每月 $5-20 的 VPS 替代每月 $50-500 的云平台费用',
      'Coolify v4 带来新 UI、改进的 API、S3 备份和 Sentinel 监控代理',
    ],
    intro: '2026 年，自托管运动正在加速。开发者和团队正在从昂贵的云平台转向自主控制基础设施，以降低成本并消除供应商锁定。Coolify 走在这一转变的前沿——一个开源的自托管平台即服务（PaaS），让你在自己的服务器上获得类似 Vercel 的部署体验。本指南涵盖了安装、配置和在生产中运行 Coolify 所需的一切。',
    whatIsTitle: '什么是 Coolify 以及为什么它很重要',
    whatIsDesc: 'Coolify 是一个免费的开源自托管 PaaS，旨在简化应用部署和服务器管理。你可以把它想象成在你控制的服务器上运行的私有 Heroku 或 Vercel。它将 Docker、反向代理、SSL 证书和部署流水线抽象为一个简洁的 Web UI。',
    whyMattersTitle: '为什么 Coolify 在 2026 年很重要',
    whyMatters: [
      '零供应商锁定：你的代码、你的服务器、你的数据',
      '无按席位计费：无限团队成员无额外费用',
      '完全的数据主权和 GDPR 合规控制',
      '大幅降低成本：$5 的 VPS 替代 $50+ 的平台费用',
      '不断壮大的生态：30,000+ GitHub stars，活跃社区，频繁发布',
      '支持任何语言、框架或 Docker 镜像',
    ],
    comparisonTitle: 'Coolify vs Vercel vs Netlify vs Railway vs Heroku',
    comparisonDesc: '以下是 Coolify 在 2026 年与主流云部署平台在关键维度上的对比。',
    requirementsTitle: '系统要求和安装',
    requirementsDesc: 'Coolify 可以在任何 Linux 服务器上运行（推荐 Ubuntu 22.04+），需要 SSH 访问。最低要求不高，但生产工作负载需要更多资源。',
    installTitle: '一键安装',
    installDesc: 'Coolify 通过一条 curl 命令安装，自动设置 Docker、Coolify 应用和所有依赖项。',
    architectureTitle: '架构概览',
    architectureDesc: '理解 Coolify 的架构有助于排查问题和优化设置。Coolify 基于经过验证的成熟组件构建。',
    archComponents: [
      'Coolify 应用：基于 Laravel 的 Web UI 和 API，通过 Nginx 提供服务',
      'Docker 引擎：所有应用、数据库和服务都作为 Docker 容器运行',
      'Traefik：自动反向代理，处理 HTTPS 终止、路由和负载均衡',
      'PostgreSQL：存储 Coolify 配置、部署历史和元数据的内部数据库',
      'Redis：后台作业和实时更新的队列管理和缓存',
      'Sentinel（v4）：可选的监控代理，用于资源指标和健康检查',
    ],
    deployAppsTitle: '部署应用',
    deployAppsDesc: 'Coolify 支持从 Git 仓库、Docker 镜像或原始 Dockerfile 部署应用。以下是常见框架的部署示例。',
    dockerDeployTitle: 'Docker 和 Docker Compose 部署',
    dockerDeployDesc: '对于包含多个服务的复杂应用，Coolify 直接支持 Docker Compose 部署。推送你的 docker-compose.yml，Coolify 会处理其余部分。',
    databaseTitle: '数据库管理',
    databaseDesc: 'Coolify 提供一键数据库部署，包含自动备份、持久化卷和便捷的连接字符串管理。',
    dbList: [
      'PostgreSQL (16, 15, 14, 13)',
      'MySQL (8.4, 8.0)',
      'MariaDB (11, 10)',
      'MongoDB (7, 6)',
      'Redis (7, Stack)',
      'Dragonfly（快速 Redis 替代方案）',
      'ClickHouse（分析型数据库）',
      'KeyDB（多线程 Redis）',
    ],
    envVarsTitle: '环境变量和密钥',
    envVarsDesc: 'Coolify 提供安全的环境变量管理方式，支持跨服务的共享变量、构建时和运行时分离以及预览环境专用覆盖。',
    domainsTitle: '自定义域名和 SSL',
    domainsDesc: 'Coolify 通过集成的 Traefik 反向代理自动配置 Let\'s Encrypt SSL 证书。添加自定义域名只需要一条 DNS A 记录和在 Coolify 仪表板中添加域名条目。',
    gitIntegrationTitle: 'GitHub/GitLab 集成和自动部署',
    gitIntegrationDesc: 'Coolify 原生集成 GitHub 和 GitLab。通过 OAuth 连接你的账户，选择仓库，Coolify 会创建 webhook 监听器，在每次推送时自动部署。',
    v4Title: 'Coolify v4 新特性和改进',
    v4Desc: 'Coolify v4 是一次重大重写，在可用性、性能和可靠性方面带来了显著改进。',
    v4Features: [
      '全新设计的 UI，改进的导航和暗色模式',
      '新的 Sentinel 监控代理用于实时资源跟踪',
      '改进的 Docker Compose 支持，完整 YAML 兼容',
      'S3 兼容的备份目标（AWS、Cloudflare R2、MinIO）',
      '增强的 API，支持所有资源的完整 CRUD 操作',
      '改进的 webhook 处理和部署流水线',
      '标签和筛选功能用于组织大量资源',
      '从仪表板终端访问运行中的容器',
      '改进的多服务器代理管理',
      '自动服务器清理和资源回收',
    ],
    multiServerTitle: '多服务器管理',
    multiServerDesc: 'Coolify 可以从单一仪表板管理多台服务器。在主服务器上安装 Coolify，然后通过提供 SSH 凭据添加远程服务器。每台服务器运行自己的 Docker 引擎和 Traefik 实例，而 Coolify 在所有服务器上编排部署。',
    monitoringTitle: '监控和日志',
    monitoringDesc: 'Coolify v4 通过 Sentinel 代理内置监控功能。它跟踪每台服务器和每个容器的 CPU、内存、磁盘和网络使用情况。你可以在仪表板中直接查看任何应用或服务的实时日志。',
    backupTitle: '备份与恢复策略',
    backupDesc: 'Coolify 支持将数据库自动备份到本地存储或 S3 兼容的目标。你可以按自定义间隔安排备份并设置保留策略。',
    resourceTitle: '资源管理和扩展',
    resourceDesc: 'Coolify 允许你为每个容器设置资源限制（CPU、内存），并通过 Docker Compose 副本配置水平扩展。对于垂直扩展，调整 VPS 大小，Coolify 会自动使用额外的资源。',
    costTitle: '成本对比：VPS vs 云平台',
    costDesc: 'Coolify 最大的优势之一是节省成本。以下是一个典型全栈应用（含数据库、后台任务和中等流量）的真实成本对比。',
    securityTitle: '安全加固',
    securityDesc: '运行自己的 PaaS 意味着你需要负责安全。以下是生产环境 Coolify 安装的加固步骤。',
    securityTips: [
      '启用 UFW 防火墙，只允许 22、80、443 端口',
      '使用 SSH 密钥认证并禁用密码登录',
      '定期更新主机操作系统和 Docker',
      '在 Ubuntu 上启用自动安全更新',
      '为 Coolify 管理员和所有数据库设置强密码',
      '使用 Coolify 内置的环境变量加密',
      '通过 IP 白名单或 VPN 限制 Coolify 仪表板访问',
      '在用于部署的 GitHub/GitLab 账户上启用双因素认证',
      '检查 Docker 容器权限——避免以 root 运行',
      '监控服务器访问日志并设置 fail2ban',
    ],
    bestPracticesTitle: '生产最佳实践',
    bestPractices: [
      '为 Coolify 使用专用 VPS——不要与其他手动 Docker 设置共享',
      '始终为容器设置资源限制（CPU 和内存），防止一个应用耗尽其他应用的资源',
      '启用到 S3 目标的自动数据库备份——永远不要仅依赖本地备份',
      '如果预算允许，使用不同服务器的独立暂存和生产环境',
      '在生产中固定 Docker 镜像版本——永远不要使用 :latest 标签',
      '为所有服务设置健康检查以启用自动重启',
      '在合并到主分支之前使用拉取请求的预览部署',
      '监控磁盘使用——Docker 镜像和构建缓存增长很快',
      '定期运行 docker system prune 或启用 Coolify 的自动清理',
      '保持 Coolify 更新——定期从仪表板运行内置更新',
    ],
    troubleshootTitle: '常见问题排查',
    troubleshootDesc: '以下是运行 Coolify 时最常见的问题及其解决方法。',
    apiTitle: 'Coolify API 使用',
    apiDesc: 'Coolify v4 提供全面的 REST API 用于编程式管理。在仪表板的 Settings > API Tokens 中生成 API 令牌。',
    faqTitle: '常见问题',
    faq1Q: 'Coolify 免费吗？',
    faq1A: '是的，Coolify 完全免费且开源，采用 Apache 2.0 许可证。你可以在自己的服务器上零成本自托管。Coolify 团队也提供付费云版本（如果你不想自己管理服务器），但自托管版本功能完全相同。',
    faq2Q: 'Coolify 的最低服务器要求是什么？',
    faq2A: '最低要求是 2 个 CPU 核心、2GB RAM 和 30GB 磁盘空间，运行 Ubuntu 22.04 或更高版本。用于多应用和数据库的生产用途，建议至少 4 个 CPU 核心、8GB RAM 和 80GB SSD。Coolify 本身大约使用 500MB-1GB 内存。',
    faq3Q: 'Coolify 可以替代 Vercel 部署 Next.js 吗？',
    faq3A: '可以，Coolify 完全支持 Next.js 应用，包括服务端渲染、API 路由和中间件。主要区别是 Vercel 提供全球边缘网络，而 Coolify 部署到你的特定服务器位置。对于单区域足够的大多数应用，Coolify 以很小的成本提供等效功能。',
    faq4Q: 'Coolify 如何处理 SSL 证书？',
    faq4A: 'Coolify 使用 Traefik 作为反向代理，自动从 Let\'s Encrypt 获取和续期 SSL 证书。当你在 Coolify 仪表板中添加自定义域名并将 DNS A 记录指向服务器 IP 时，Traefik 会自动获取证书。续期在过期前自动进行。',
    faq5Q: '可以从 Heroku 或 Railway 迁移到 Coolify 吗？',
    faq5A: '可以。对于大多数应用，迁移包括设置 Coolify、连接 Git 仓库、配置环境变量和更新 DNS 记录。Coolify 支持相同的基于 Dockerfile 或 Buildpack 的部署工作流。数据库迁移需要从当前提供商导出数据并导入到 Coolify 管理的数据库中。',
    faq6Q: 'Coolify 支持水平扩展和负载均衡吗？',
    faq6A: 'Coolify 通过 Docker Compose 副本和多服务器管理支持水平扩展。在单台服务器上，你可以在 Traefik 内置负载均衡器后运行多个容器副本。对于跨服务器的真正水平扩展，将相同应用部署到多台 Coolify 管理的服务器并使用外部负载均衡器或基于 DNS 的分发。',
    faq7Q: '如何更新 Coolify 到最新版本？',
    faq7A: 'Coolify 包含内置更新机制。在仪表板中导航到 Settings 并点击 Update。或者在服务器上再次运行安装命令，它会执行就地升级同时保留你的数据和配置。在重大更新之前始终备份 Coolify 的 PostgreSQL 数据库。',
    faq8Q: 'Coolify 适合生产工作负载吗？',
    faq8A: '是的。许多团队和公司在 Coolify 上运行生产应用。它使用经过实战检验的组件如 Docker、Traefik 和 PostgreSQL。生产就绪的关键是合适的服务器规格、自动备份、监控以及遵循本指南中概述的安全加固步骤。对于高可用性需求，使用多服务器设置配合外部健康监控。',
    conclusionTitle: '总结',
    conclusionDesc: 'Coolify 代表了 2026 年日趋成熟的自托管生态。它消除了管理 Docker、反向代理和 SSL 证书的复杂性，同时让你完全控制基础设施。无论你是想降低托管成本的独立开发者，还是寻求数据主权的团队，Coolify 都能以云平台定价的一小部分提供生产级部署平台。',
  },
};

export default function CoolifyGuide({ lang }: { lang: string }) {
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

  const codeBlockStyle = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' };
  const h2Style = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const h3Style = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const pStyle = { marginBottom: '1rem', lineHeight: '1.75' };
  const ulStyle = { paddingLeft: '1.5rem', marginBottom: '1.5rem' };
  const liStyle = { marginBottom: '0.5rem', lineHeight: '1.75' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse' as const, marginBottom: '1.5rem', fontSize: '0.875rem' };
  const thStyle = { border: '1px solid #e2e8f0', padding: '0.75rem', backgroundColor: '#f8fafc', fontWeight: 600, textAlign: 'left' as const };
  const tdStyle = { border: '1px solid #e2e8f0', padding: '0.75rem', textAlign: 'left' as const };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem 1.5rem', margin: '1.5rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem' }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: '1.75' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Key Takeaways</p>
        <ul style={ulStyle}>
          {t.takeaways.map((item, i) => (
            <li key={i} style={liStyle}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Table of Contents */}
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Table of Contents</p>
        <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {t.toc.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.35rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ol>
      </div>

      {/* Introduction */}
      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* What Is Coolify */}
      <h2 style={h2Style}>{t.whatIsTitle}</h2>
      <p style={pStyle}>{t.whatIsDesc}</p>

      <h3 style={h3Style}>{t.whyMattersTitle}</h3>
      <ul style={ulStyle}>
        {t.whyMatters.map((item, i) => (
          <li key={i} style={liStyle}>{item}</li>
        ))}
      </ul>

      {/* Comparison Table */}
      <h2 style={h2Style}>{t.comparisonTitle}</h2>
      <p style={pStyle}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>Coolify</th>
              <th style={thStyle}>Vercel</th>
              <th style={thStyle}>Netlify</th>
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Heroku</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Pricing</td><td style={tdStyle}>Free (VPS cost only)</td><td style={tdStyle}>$20/user/mo Pro</td><td style={tdStyle}>$19/user/mo Pro</td><td style={tdStyle}>Usage-based ($5+)</td><td style={tdStyle}>$5-25/dyno/mo</td></tr>
            <tr><td style={tdStyle}>Open Source</td><td style={tdStyle}>Yes (Apache 2.0)</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td></tr>
            <tr><td style={tdStyle}>Self-Hosted</td><td style={tdStyle}>Yes</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td></tr>
            <tr><td style={tdStyle}>Docker Support</td><td style={tdStyle}>Full (Compose too)</td><td style={tdStyle}>Limited</td><td style={tdStyle}>No</td><td style={tdStyle}>Dockerfile only</td><td style={tdStyle}>Container stack</td></tr>
            <tr><td style={tdStyle}>Databases</td><td style={tdStyle}>One-click (8+ types)</td><td style={tdStyle}>Postgres only</td><td style={tdStyle}>None built-in</td><td style={tdStyle}>Postgres, MySQL, Redis</td><td style={tdStyle}>Postgres, Redis</td></tr>
            <tr><td style={tdStyle}>Auto SSL</td><td style={tdStyle}>Yes (Let\'s Encrypt)</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes (paid)</td></tr>
            <tr><td style={tdStyle}>Git Auto-Deploy</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes</td></tr>
            <tr><td style={tdStyle}>Multi-Server</td><td style={tdStyle}>Yes</td><td style={tdStyle}>N/A (managed)</td><td style={tdStyle}>N/A (managed)</td><td style={tdStyle}>N/A (managed)</td><td style={tdStyle}>N/A (managed)</td></tr>
            <tr><td style={tdStyle}>Edge Network</td><td style={tdStyle}>No (single region)</td><td style={tdStyle}>Yes (global)</td><td style={tdStyle}>Yes (global)</td><td style={tdStyle}>No</td><td style={tdStyle}>No</td></tr>
            <tr><td style={tdStyle}>Vendor Lock-in</td><td style={tdStyle}>None</td><td style={tdStyle}>Moderate</td><td style={tdStyle}>Moderate</td><td style={tdStyle}>Low</td><td style={tdStyle}>Low</td></tr>
          </tbody>
        </table>
      </div>

      {/* Requirements and Installation */}
      <h2 style={h2Style}>{t.requirementsTitle}</h2>
      <p style={pStyle}>{t.requirementsDesc}</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Spec</th>
            <th style={thStyle}>Minimum</th>
            <th style={thStyle}>Recommended (Production)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>CPU</td><td style={tdStyle}>2 cores</td><td style={tdStyle}>4+ cores</td></tr>
          <tr><td style={tdStyle}>RAM</td><td style={tdStyle}>2 GB</td><td style={tdStyle}>8 GB+</td></tr>
          <tr><td style={tdStyle}>Disk</td><td style={tdStyle}>30 GB</td><td style={tdStyle}>80 GB+ SSD</td></tr>
          <tr><td style={tdStyle}>OS</td><td style={tdStyle}>Ubuntu 22.04</td><td style={tdStyle}>Ubuntu 24.04 LTS</td></tr>
          <tr><td style={tdStyle}>Access</td><td style={tdStyle}>SSH root or sudo</td><td style={tdStyle}>SSH key-based auth</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{t.installTitle}</h3>
      <p style={pStyle}>{t.installDesc}</p>
      <pre style={codeBlockStyle}><code>{'# Install Coolify with one command\n' +
        'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash\n\n' +
        '# The installer will:\n' +
        '# 1. Install Docker Engine if not present\n' +
        '# 2. Pull Coolify Docker images\n' +
        '# 3. Set up PostgreSQL for internal state\n' +
        '# 4. Configure Traefik reverse proxy\n' +
        '# 5. Start the Coolify dashboard\n\n' +
        '# After installation, access the dashboard:\n' +
        '# http://your-server-ip:8000\n\n' +
        '# First-time setup:\n' +
        '# 1. Create an admin account\n' +
        '# 2. Set your instance domain (e.g., coolify.yourdomain.com)\n' +
        '# 3. Configure the wildcard domain for app subdomains\n\n' +
        '# VPS setup example (Hetzner/DigitalOcean/Vultr):\n' +
        '# 1. Create a VPS with Ubuntu 24.04\n' +
        '# 2. Point a domain to the VPS IP (A record)\n' +
        '# 3. SSH in and run the install command\n' +
        'ssh root@your-server-ip\n' +
        'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'}</code></pre>

      {/* Architecture */}
      <h2 style={h2Style}>{t.architectureTitle}</h2>
      <p style={pStyle}>{t.architectureDesc}</p>
      <ul style={ulStyle}>
        {t.archComponents.map((item, i) => (
          <li key={i} style={liStyle}><strong>{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</li>
        ))}
      </ul>
      <pre style={codeBlockStyle}><code>{'# Coolify Architecture Diagram\n' +
        '#\n' +
        '#   Internet\n' +
        '#      |\n' +
        '#   [Traefik] :80/:443\n' +
        '#      |--- app1.yourdomain.com --> [App Container 1]\n' +
        '#      |--- app2.yourdomain.com --> [App Container 2]\n' +
        '#      |--- coolify.yourdomain.com --> [Coolify Dashboard]\n' +
        '#      |\n' +
        '#   [Docker Engine]\n' +
        '#      |--- [PostgreSQL] (Coolify internal DB)\n' +
        '#      |--- [Redis] (Queue & cache)\n' +
        '#      |--- [Sentinel] (Monitoring agent)\n' +
        '#      |--- [App DB: PostgreSQL/MySQL/MongoDB]\n' +
        '#      |--- [App Services: workers, cron, etc.]'}</code></pre>

      {/* Deploying Applications */}
      <h2 style={h2Style}>{t.deployAppsTitle}</h2>
      <p style={pStyle}>{t.deployAppsDesc}</p>
      <p style={pStyle}>Coolify supports three deployment methods: (1) Dockerfile-based builds where you provide a Dockerfile in your repository, (2) Nixpacks auto-detection that automatically detects your language and framework, and (3) Docker image deployments where you specify a pre-built image from a registry. For most projects, the Dockerfile approach gives you the most control.</p>

      <h3 style={h3Style}>Nixpacks Auto-Detection</h3>
      <p style={pStyle}>If your repository does not contain a Dockerfile, Coolify uses Nixpacks to automatically detect your language and framework. Nixpacks supports Node.js, Python, Go, Rust, Ruby, PHP, Java, .NET, and many more. It generates an optimized Dockerfile behind the scenes.</p>
      <pre style={codeBlockStyle}><code>{'# Nixpacks auto-detects and builds:\n' +
        '# - package.json → Node.js (detects Next.js, Nuxt, Remix, etc.)\n' +
        '# - requirements.txt / pyproject.toml → Python\n' +
        '# - go.mod → Go\n' +
        '# - Cargo.toml → Rust\n' +
        '# - Gemfile → Ruby\n' +
        '# - composer.json → PHP\n\n' +
        '# Override Nixpacks behavior with nixpacks.toml:\n' +
        '[phases.setup]\n' +
        'nixPkgs = ["...", "ffmpeg"]  # Add system packages\n\n' +
        '[phases.build]\n' +
        'cmds = ["npm run build"]\n\n' +
        '[start]\n' +
        'cmd = "npm start"'}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Build Method</th>
              <th style={thStyle}>Best For</th>
              <th style={thStyle}>Pros</th>
              <th style={thStyle}>Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Nixpacks</td><td style={tdStyle}>Quick starts, standard apps</td><td style={tdStyle}>Zero config, auto-detection</td><td style={tdStyle}>Less control, larger images</td></tr>
            <tr><td style={tdStyle}>Dockerfile</td><td style={tdStyle}>Production, custom setups</td><td style={tdStyle}>Full control, optimized images</td><td style={tdStyle}>Requires Docker knowledge</td></tr>
            <tr><td style={tdStyle}>Docker Image</td><td style={tdStyle}>Pre-built, third-party</td><td style={tdStyle}>No build step, fast deploy</td><td style={tdStyle}>External CI required for custom</td></tr>
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Node.js / Next.js</h3>
      <pre style={codeBlockStyle}><code>{'# Dockerfile for Next.js on Coolify\nFROM node:20-alpine AS base\n\n' +
        'FROM base AS deps\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci --only=production\n\n' +
        'FROM base AS builder\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\nRUN npm run build\n\n' +
        'FROM base AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/.next/static ./.next/static\nCOPY --from=builder /app/public ./public\n\n' +
        'EXPOSE 3000\nENV PORT=3000\nCMD ["node", "server.js"]'}</code></pre>

      <h3 style={h3Style}>Python (FastAPI / Flask)</h3>
      <pre style={codeBlockStyle}><code>{'# Dockerfile for Python FastAPI\nFROM python:3.12-slim\n\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . .\n\nEXPOSE 8000\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]'}</code></pre>

      <h3 style={h3Style}>Go</h3>
      <pre style={codeBlockStyle}><code>{'# Dockerfile for Go application\nFROM golang:1.22-alpine AS builder\nWORKDIR /app\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 go build -o server .\n\nFROM alpine:3.19\nWORKDIR /app\nCOPY --from=builder /app/server .\nEXPOSE 8080\nCMD ["./server"]'}</code></pre>

      <h3 style={h3Style}>Static Sites</h3>
      <pre style={codeBlockStyle}><code>{'# Dockerfile for static site (Vite, Astro, Hugo, etc.)\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nCOPY nginx.conf /etc/nginx/conf.d/default.conf\nEXPOSE 80'}</code></pre>

      <h3 style={h3Style}>Docker Image Deployment</h3>
      <p style={pStyle}>You can deploy any pre-built Docker image directly. This is useful for third-party services, custom registries, or images built in external CI pipelines.</p>
      <pre style={codeBlockStyle}><code>{'# Deploy from Docker Hub:\n# Image: nginx:alpine\n# Port: 80\n\n# Deploy from GitHub Container Registry:\n# Image: ghcr.io/your-org/your-app:latest\n\n# Deploy from private registry:\n# Image: registry.yourdomain.com/app:v2.1.0\n# Add registry credentials in Coolify > Settings > Docker Registries\n\n# Pre-built image with environment variables:\n# Image: node:20-alpine\n# Command override: node server.js\n# Working directory: /app'}</code></pre>

      {/* Docker Compose */}
      <h2 style={h2Style}>{t.dockerDeployTitle}</h2>
      <p style={pStyle}>{t.dockerDeployDesc}</p>
      <p style={pStyle}>When using Docker Compose, Coolify reads your docker-compose.yml file, builds any services that use the build directive, pulls images for others, and manages the entire lifecycle. Coolify automatically injects Traefik labels on the service you designate as the public-facing entry point.</p>
      <pre style={codeBlockStyle}><code>{'# docker-compose.yml for a full-stack app on Coolify\nservices:\n  app:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    environment:\n      - DATABASE_URL=postgresql://postgres:secret@db:5432/myapp\n      - REDIS_URL=redis://redis:6379\n      - NODE_ENV=production\n    ports:\n      - "3000:3000"\n    depends_on:\n      db:\n        condition: service_healthy\n      redis:\n        condition: service_started\n    restart: unless-stopped\n    deploy:\n      resources:\n        limits:\n          cpus: "1.0"\n          memory: 512M\n\n  worker:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    command: node worker.js\n    environment:\n      - DATABASE_URL=postgresql://postgres:secret@db:5432/myapp\n      - REDIS_URL=redis://redis:6379\n    depends_on:\n      - db\n      - redis\n    restart: unless-stopped\n\n  db:\n    image: postgres:16-alpine\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_PASSWORD: secret\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U postgres"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n    restart: unless-stopped\n\n  redis:\n    image: redis:7-alpine\n    volumes:\n      - redisdata:/data\n    restart: unless-stopped\n\nvolumes:\n  pgdata:\n  redisdata:'}</code></pre>

      {/* Database Management */}
      <h2 style={h2Style}>{t.databaseTitle}</h2>
      <p style={pStyle}>{t.databaseDesc}</p>
      <p style={pStyle}>Each database is deployed as a Docker container with a persistent volume for data. Coolify automatically generates secure passwords, configures networking so your applications can reach the database by container name, and provides connection strings in the dashboard. You can also expose database ports to the host for external access during development.</p>
      <h3 style={h3Style}>Supported Databases</h3>
      <ul style={ulStyle}>
        {t.dbList.map((item, i) => (
          <li key={i} style={liStyle}>{item}</li>
        ))}
      </ul>
      <pre style={codeBlockStyle}><code>{'# Coolify creates databases with connection details like:\n# Internal URL (for services on same server):\n# postgresql://postgres:generated_password@db-container:5432/mydb\n\n# You can also connect externally if you expose the port:\n# postgresql://postgres:generated_password@your-server-ip:5432/mydb\n\n# Backup a Coolify-managed PostgreSQL database manually:\ndocker exec coolify-db pg_dump -U postgres mydb > backup.sql\n\n# Restore from backup:\ncat backup.sql | docker exec -i coolify-db psql -U postgres mydb\n\n# One-click MongoDB setup produces:\n# mongodb://root:generated_password@mongo-container:27017/mydb?authSource=admin\n\n# Redis connection:\n# redis://redis-container:6379'}</code></pre>

      {/* Environment Variables */}
      <h2 style={h2Style}>{t.envVarsTitle}</h2>
      <p style={pStyle}>{t.envVarsDesc}</p>
      <p style={pStyle}>Coolify encrypts environment variables at rest in its PostgreSQL database. Variables marked as sensitive are never displayed in the UI after being set. Build-time variables are available during the Docker build process, while runtime variables are injected when the container starts. This separation is important for Next.js applications where NEXT_PUBLIC_ variables must be available at build time.</p>
      <pre style={codeBlockStyle}><code>{'# Coolify environment variable types:\n\n# 1. Application-level variables (set in app settings)\n# These are injected at runtime into the container\nDATABASE_URL=postgresql://postgres:pass@db:5432/app\nREDIS_URL=redis://redis:6379\nNODE_ENV=production\nAPP_SECRET=your-secret-key-here\n\n# 2. Build-time variables (available during docker build)\n# Set "Build Variable" toggle in the Coolify UI\nNEXT_PUBLIC_API_URL=https://api.yourdomain.com\nNEXT_PUBLIC_SITE_URL=https://yourdomain.com\n\n# 3. Shared variables (reusable across multiple services)\n# Created under "Shared Variables" in team settings\n# Reference with: \\${SHARED_VAR_NAME}\n\n# 4. Preview-specific variables\n# Override variables for pull request preview deployments\n# Useful for staging database URLs, test API keys, etc.\nDATABASE_URL=postgresql://postgres:pass@staging-db:5432/app_preview'}</code></pre>

      {/* Custom Domains and SSL */}
      <h2 style={h2Style}>{t.domainsTitle}</h2>
      <p style={pStyle}>{t.domainsDesc}</p>
      <p style={pStyle}>Coolify handles both single-domain and wildcard SSL certificates. For standard domains, it uses HTTP-01 challenge validation. For wildcard certificates, you need to configure a DNS provider (Cloudflare, AWS Route53, DigitalOcean DNS) for DNS-01 challenge validation.</p>
      <pre style={codeBlockStyle}><code>{'# Step 1: Add DNS A record at your registrar\n# Type: A\n# Name: app (or @ for root domain)\n# Value: your-server-ip\n# TTL: 300\n\n# Step 2: In Coolify dashboard, set the domain:\n# Application Settings > Domains\n# Add: app.yourdomain.com\n\n# Step 3: Coolify automatically:\n# - Configures Traefik routing rules\n# - Requests Let\'s Encrypt SSL certificate\n# - Sets up automatic certificate renewal\n# - Enables HTTP -> HTTPS redirect\n\n# For wildcard domains (*.yourdomain.com):\n# Requires DNS challenge (Cloudflare, Route53, etc.)\n# Configure in Coolify > Settings > DNS Provider\n\n# Traefik configuration is auto-generated:\n# - TLS termination at the proxy level\n# - WebSocket support enabled by default\n# - Custom headers can be added per application\n\n# Multiple domains per application:\n# Add comma-separated domains in the settings:\n# app.yourdomain.com, www.yourdomain.com, custom.com'}</code></pre>

      {/* Git Integration */}
      <h2 style={h2Style}>{t.gitIntegrationTitle}</h2>
      <p style={pStyle}>{t.gitIntegrationDesc}</p>
      <p style={pStyle}>The integration supports both GitHub Apps (recommended for organizations) and personal access tokens for simpler setups. For GitLab, both cloud and self-hosted instances are supported. Coolify creates webhook endpoints that listen for push events and automatically trigger the deployment pipeline.</p>
      <p style={pStyle}>Preview deployments are one of the most powerful features. When a pull request is opened, Coolify automatically deploys a preview instance with a unique URL, injects preview-specific environment variables, and tears it down when the PR is closed. This gives your team a Vercel-like preview experience on your own infrastructure.</p>
      <pre style={codeBlockStyle}><code>{'# GitHub Integration Setup:\n# 1. Go to Coolify dashboard > Sources > Add GitHub App\n# 2. Authorize the Coolify GitHub App\n# 3. Select repositories to grant access\n\n# GitLab Integration Setup:\n# 1. Go to Coolify dashboard > Sources > Add GitLab\n# 2. Enter your GitLab instance URL (or gitlab.com)\n# 3. Create an application in GitLab for OAuth\n# 4. Paste Client ID and Secret in Coolify\n\n# Auto-deploy configuration:\n# - Push to main/master branch -> Production deployment\n# - Push to other branches -> Preview deployment (optional)\n# - Pull request opened -> Preview deployment with unique URL\n\n# Coolify listens for webhooks and triggers:\n# 1. git clone / git pull\n# 2. Docker build (using Dockerfile or Nixpacks)\n# 3. Container restart with zero-downtime deployment\n# 4. Health check verification\n# 5. Traefik routing update\n\n# Manual deployment trigger:\n# Click "Deploy" button in the dashboard\n# Or use the Coolify API (see API section below)'}</code></pre>

      {/* Coolify v4 */}
      <h2 style={h2Style}>{t.v4Title}</h2>
      <p style={pStyle}>{t.v4Desc}</p>
      <p style={pStyle}>Version 4 was developed over 18 months and represents a near-complete rewrite of the codebase. The most impactful changes include the Sentinel monitoring agent that provides per-container resource metrics, a fully documented REST API for automation, and significantly improved Docker Compose handling that supports complex multi-service stacks out of the box.</p>
      <ul style={ulStyle}>
        {t.v4Features.map((item, i) => (
          <li key={i} style={liStyle}>{item}</li>
        ))}
      </ul>

      {/* Multi-Server */}
      <h2 style={h2Style}>{t.multiServerTitle}</h2>
      <p style={pStyle}>{t.multiServerDesc}</p>
      <p style={pStyle}>Multi-server management is one of Coolify's strongest advantages over other self-hosted PaaS tools. You can designate servers for specific purposes: one for production web applications, another for databases, and a third for staging environments. This separation improves security and resource isolation.</p>
      <pre style={codeBlockStyle}><code>{'# Adding a remote server to Coolify:\n\n# 1. On the remote server, ensure SSH is available:\nsudo apt update && sudo apt install -y openssh-server\n\n# 2. Create a dedicated user for Coolify (recommended):\nsudo adduser coolify\nsudo usermod -aG docker coolify\n\n# 3. Set up SSH key access:\n# Copy the public key from Coolify dashboard > Servers > Add Server\nssh-copy-id coolify@remote-server-ip\n\n# 4. In Coolify dashboard:\n# Servers > Add Server\n# - Name: production-worker-1\n# - IP: remote-server-ip\n# - User: coolify\n# - Private Key: select from Coolify key store\n# - Click "Validate Server"\n\n# 5. Coolify will:\n# - Install Docker on the remote server\n# - Set up Traefik proxy\n# - Enable the server for deployments\n\n# Deploy to specific servers:\n# When creating a new resource, select the target server\n# Each server operates independently with its own Docker and Traefik'}</code></pre>

      {/* Monitoring */}
      <h2 style={h2Style}>{t.monitoringTitle}</h2>
      <p style={pStyle}>{t.monitoringDesc}</p>
      <p style={pStyle}>For teams that need more advanced monitoring, Coolify integrates well with external tools. You can deploy Prometheus and Grafana as services within Coolify itself, then configure them to scrape metrics from your applications and the Docker daemon. Coolify's Sentinel agent can also export metrics in a Prometheus-compatible format.</p>
      <pre style={codeBlockStyle}><code>{'# Coolify Sentinel Agent (v4):\n# Automatically installed on each managed server\n# Collects metrics every 10 seconds:\n# - CPU usage (per server and per container)\n# - Memory usage and available memory\n# - Disk usage and I/O\n# - Network traffic in/out\n\n# View logs in the dashboard:\n# Applications > [Your App] > Logs\n# Shows real-time stdout/stderr from the container\n\n# CLI access to container logs:\ndocker logs -f container_name --tail 100\n\n# View all Coolify-managed containers:\ndocker ps --filter "label=coolify.managed=true"\n\n# External monitoring integration:\n# Export metrics to Prometheus/Grafana:\n# 1. Deploy Prometheus + Grafana via Coolify\n# 2. Configure Sentinel to export metrics\n# 3. Create dashboards for all your services\n\n# Health check configuration (per application):\n# Settings > Health Check\n# Path: /health or /api/health\n# Interval: 30s\n# Timeout: 5s\n# Retries: 3'}</code></pre>

      {/* Backup */}
      <h2 style={h2Style}>{t.backupTitle}</h2>
      <p style={pStyle}>{t.backupDesc}</p>
      <p style={pStyle}>A solid backup strategy for Coolify involves three layers: (1) database backups managed by Coolify's built-in scheduler sent to S3, (2) volume backups for persistent data using Docker volume snapshots, and (3) Coolify configuration backup by dumping its internal PostgreSQL database. Combining all three ensures you can fully recover from any failure scenario, including complete server loss.</p>
      <pre style={codeBlockStyle}><code>{'# Coolify Backup Configuration:\n\n# 1. Configure S3 backup destination:\n# Settings > S3 Storages > Add\n# - Provider: AWS S3 / Cloudflare R2 / MinIO\n# - Bucket: coolify-backups\n# - Region: us-east-1\n# - Access Key and Secret Key\n\n# 2. Enable database backup:\n# Databases > [Your DB] > Backups\n# - Schedule: 0 2 * * * (daily at 2 AM)\n# - Destination: S3 storage configured above\n# - Retention: 7 days\n\n# 3. Backup Coolify itself:\n# The internal PostgreSQL database stores all configuration\n\n# Manual Coolify backup:\ncd /data/coolify\ndocker compose exec postgres pg_dumpall -U postgres > coolify-backup.sql\n\n# Restore Coolify from backup:\ncat coolify-backup.sql | docker compose exec -T postgres psql -U postgres\n\n# 4. Volume backup strategy:\n# For persistent volumes, create periodic snapshots:\ndocker run --rm -v myapp_data:/data -v /backups:/backup \\\n  alpine tar czf /backup/myapp-data-$(date +%Y%m%d).tar.gz /data'}</code></pre>

      {/* Resource Management */}
      <h2 style={h2Style}>{t.resourceTitle}</h2>
      <p style={pStyle}>{t.resourceDesc}</p>
      <p style={pStyle}>Resource limits are critical in a self-hosted environment because unlike cloud platforms, there is no automatic scaling beyond your server capacity. Without limits, a single runaway application can consume all available memory and crash other services. Set both limits (hard cap) and reservations (guaranteed minimum) for each service.</p>
      <pre style={codeBlockStyle}><code>{'# Set resource limits in Coolify dashboard:\n# Application > Settings > Resource Limits\n# - CPU Limit: 1.0 (1 core)\n# - Memory Limit: 512M\n# - CPU Reservation: 0.25\n# - Memory Reservation: 256M\n\n# Or in docker-compose.yml:\nservices:\n  app:\n    deploy:\n      resources:\n        limits:\n          cpus: "1.0"\n          memory: 512M\n        reservations:\n          cpus: "0.25"\n          memory: 256M\n      replicas: 3  # Horizontal scaling\n\n# Monitor resource usage:\ndocker stats --format "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}"\n\n# Disk cleanup (run periodically):\ndocker system prune -af --volumes\n# WARNING: removes unused images, containers, and volumes\n# Coolify v4 has automatic cleanup in Settings > Server'}</code></pre>

      {/* Cost Comparison */}
      <h2 style={h2Style}>{t.costTitle}</h2>
      <p style={pStyle}>{t.costDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Setup</th>
              <th style={thStyle}>Coolify + VPS</th>
              <th style={thStyle}>Vercel Pro</th>
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Heroku</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Web App</td><td style={tdStyle}>Included</td><td style={tdStyle}>$20/user/mo</td><td style={tdStyle}>~$10/mo</td><td style={tdStyle}>$7/dyno/mo</td></tr>
            <tr><td style={tdStyle}>Database</td><td style={tdStyle}>Included</td><td style={tdStyle}>$20+/mo</td><td style={tdStyle}>~$10/mo</td><td style={tdStyle}>$9+/mo</td></tr>
            <tr><td style={tdStyle}>Background Worker</td><td style={tdStyle}>Included</td><td style={tdStyle}>Serverless (usage)</td><td style={tdStyle}>~$5/mo</td><td style={tdStyle}>$7/dyno/mo</td></tr>
            <tr><td style={tdStyle}>Redis Cache</td><td style={tdStyle}>Included</td><td style={tdStyle}>$20+/mo (KV)</td><td style={tdStyle}>~$5/mo</td><td style={tdStyle}>$15+/mo</td></tr>
            <tr><td style={tdStyle}>SSL Certificate</td><td style={tdStyle}>Free (Let\'s Encrypt)</td><td style={tdStyle}>Free</td><td style={tdStyle}>Free</td><td style={tdStyle}>Free (paid plans)</td></tr>
            <tr><td style={tdStyle}>3 Team Members</td><td style={tdStyle}>Free</td><td style={tdStyle}>$60/mo</td><td style={tdStyle}>Free</td><td style={tdStyle}>Free</td></tr>
            <tr><td style={{ ...tdStyle, fontWeight: 700 }}>Total Monthly</td><td style={{ ...tdStyle, fontWeight: 700, color: '#16a34a' }}>$6-24 (VPS)</td><td style={{ ...tdStyle, fontWeight: 700 }}>$120-200+</td><td style={{ ...tdStyle, fontWeight: 700 }}>$30-50</td><td style={{ ...tdStyle, fontWeight: 700 }}>$38-60</td></tr>
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Recommended VPS Providers</h3>
      <p style={pStyle}>Any Linux VPS with root SSH access works with Coolify. Here are popular options sorted by price-to-performance ratio in 2026.</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Provider</th>
              <th style={thStyle}>4GB RAM Plan</th>
              <th style={thStyle}>Location Options</th>
              <th style={thStyle}>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Hetzner</td><td style={tdStyle}>~$7/mo (CX22)</td><td style={tdStyle}>EU, US East</td><td style={tdStyle}>Best value, AMD EPYC, fast NVMe</td></tr>
            <tr><td style={tdStyle}>DigitalOcean</td><td style={tdStyle}>$24/mo</td><td style={tdStyle}>Global (15 regions)</td><td style={tdStyle}>Good docs, simple UI, marketplace</td></tr>
            <tr><td style={tdStyle}>Vultr</td><td style={tdStyle}>$24/mo</td><td style={tdStyle}>Global (32 regions)</td><td style={tdStyle}>Wide region selection, hourly billing</td></tr>
            <tr><td style={tdStyle}>Linode (Akamai)</td><td style={tdStyle}>$24/mo</td><td style={tdStyle}>Global (25 regions)</td><td style={tdStyle}>Reliable, good support</td></tr>
            <tr><td style={tdStyle}>Contabo</td><td style={tdStyle}>~$7/mo (S)</td><td style={tdStyle}>EU, US, Asia</td><td style={tdStyle}>Cheapest, slower disk I/O</td></tr>
            <tr><td style={tdStyle}>Oracle Cloud</td><td style={tdStyle}>Free (ARM 24GB)</td><td style={tdStyle}>Limited regions</td><td style={tdStyle}>Free tier with ARM Ampere instances</td></tr>
          </tbody>
        </table>
      </div>

      {/* Security */}
      <h2 style={h2Style}>{t.securityTitle}</h2>
      <p style={pStyle}>{t.securityDesc}</p>
      <ul style={ulStyle}>
        {t.securityTips.map((item, i) => (
          <li key={i} style={liStyle}>{item}</li>
        ))}
      </ul>
      <pre style={codeBlockStyle}><code>{'# Security hardening commands:\n\n# 1. Enable UFW firewall\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow 22/tcp    # SSH\nsudo ufw allow 80/tcp    # HTTP\nsudo ufw allow 443/tcp   # HTTPS\nsudo ufw enable\n\n# 2. Disable password authentication\nsudo sed -i "s/PasswordAuthentication yes/PasswordAuthentication no/" /etc/ssh/sshd_config\nsudo systemctl restart sshd\n\n# 3. Enable automatic security updates\nsudo apt install -y unattended-upgrades\nsudo dpkg-reconfigure -plow unattended-upgrades\n\n# 4. Install fail2ban\nsudo apt install -y fail2ban\nsudo systemctl enable fail2ban\nsudo systemctl start fail2ban\n\n# 5. Restrict Coolify dashboard to specific IPs (via Traefik):\n# In Coolify Settings > Custom Labels, add:\n# traefik.http.middlewares.coolify-ip.ipallowlist.sourcerange=YOUR_IP/32'}</code></pre>

      {/* Best Practices */}
      <h2 style={h2Style}>{t.bestPracticesTitle}</h2>
      <p style={pStyle}>Following these practices will help you run a stable and maintainable Coolify production environment. Most production issues stem from insufficient resource limits, missing backups, or unmonitored disk usage.</p>
      <ul style={ulStyle}>
        {t.bestPractices.map((item, i) => (
          <li key={i} style={liStyle}>{item}</li>
        ))}
      </ul>

      {/* Troubleshooting */}
      <h2 style={h2Style}>{t.troubleshootTitle}</h2>
      <p style={pStyle}>{t.troubleshootDesc}</p>
      <p style={pStyle}>Most Coolify issues fall into three categories: build failures (Dockerfile or Nixpacks errors), networking issues (DNS, SSL, port conflicts), and resource exhaustion (disk space, memory). The Coolify dashboard provides deployment logs for build issues, and Docker logs for runtime issues. When in doubt, check the Coolify Discord community where the maintainers and community are very active.</p>
      <pre style={codeBlockStyle}><code>{'# Issue: Deployment fails with "port already in use"\n# Solution: Check if another container is using the port\ndocker ps --format "{{.Names}} {{.Ports}}" | grep 3000\n# Stop the conflicting container or change your app port\n\n# Issue: SSL certificate not issuing\n# Solution: Verify DNS propagation and Traefik logs\ndig +short app.yourdomain.com   # Should show your server IP\ndocker logs coolify-proxy 2>&1 | grep -i "certificate"\n# Ensure ports 80 and 443 are open in firewall\n\n# Issue: Application shows 502 Bad Gateway\n# Solution: Check if the container is running and healthy\ndocker ps -a | grep your-app\ndocker logs your-app-container --tail 50\n# Common causes: app crashed, wrong port, health check failing\n\n# Issue: Out of disk space\n# Solution: Clean up Docker resources\ndocker system df          # Check Docker disk usage\ndocker system prune -af   # Remove unused images/containers\ndocker volume prune -f    # Remove unused volumes (careful!)\ndf -h                     # Check overall disk usage\n\n# Issue: Coolify dashboard not loading\n# Solution: Check Coolify containers\ncd /data/coolify\ndocker compose ps\ndocker compose logs --tail 50\ndocker compose restart\n\n# Issue: Webhook not triggering deployments\n# Solution: Verify webhook URL in GitHub/GitLab\n# Check Coolify > Sources > [Your Source] > Webhooks\n# GitHub: Settings > Webhooks > Recent Deliveries\n# Look for 200 response from Coolify endpoint\n\n# Issue: High memory usage\n# Solution: Set container memory limits and check for leaks\ndocker stats --no-stream\n# Set memory limits in Coolify app settings\n# Consider adding swap on the VPS:\nsudo fallocate -l 2G /swapfile\nsudo chmod 600 /swapfile\nsudo mkswap /swapfile\nsudo swapon /swapfile'}</code></pre>

      <h3 style={h3Style}>Zero-Downtime Deployments</h3>
      <p style={pStyle}>Coolify supports zero-downtime deployments through its rolling update strategy. When you deploy a new version, Coolify starts the new container, waits for it to pass health checks, updates Traefik routing to point to the new container, and then stops the old container. This ensures your application remains available during deployments.</p>
      <pre style={codeBlockStyle}><code>{'# Zero-downtime deployment requires:\n' +
        '# 1. A health check endpoint in your application\n' +
        '#    GET /health -> 200 OK\n\n' +
        '# 2. Health check configuration in Coolify:\n' +
        '#    Path: /health\n' +
        '#    Interval: 10s\n' +
        '#    Timeout: 5s\n' +
        '#    Retries: 3\n' +
        '#    Start Period: 30s (grace period for slow-starting apps)\n\n' +
        '# 3. Example health check endpoint (Node.js/Express):\n' +
        '# app.get("/health", (req, res) => {\n' +
        '#   // Check database connection\n' +
        '#   // Check Redis connection\n' +
        '#   res.status(200).json({ status: "healthy" });\n' +
        '# });'}</code></pre>

      <h3 style={h3Style}>Coolify Update and Migration</h3>
      <p style={pStyle}>Keeping Coolify updated is important for security patches and new features. The update process is designed to be non-disruptive — your running applications are not affected during a Coolify update. Only the Coolify management containers restart.</p>
      <pre style={codeBlockStyle}><code>{'# Update Coolify from the dashboard:\n' +
        '# Settings > Update > Check for Updates > Update\n\n' +
        '# Update via CLI (alternative):\n' +
        'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash\n\n' +
        '# Before major version updates, backup:\n' +
        'cd /data/coolify\n' +
        'docker compose exec postgres pg_dumpall -U postgres > /tmp/coolify-pre-update.sql\n' +
        'cp -r /data/coolify/source/.env /tmp/coolify-env-backup\n\n' +
        '# Check current version:\n' +
        'cat /data/coolify/source/.env | grep APP_VERSION\n\n' +
        '# Rollback if needed (restore backup):\n' +
        'cat /tmp/coolify-pre-update.sql | docker compose exec -T postgres psql -U postgres'}</code></pre>

      {/* API Usage */}
      <h2 style={h2Style}>{t.apiTitle}</h2>
      <p style={pStyle}>{t.apiDesc}</p>
      <p style={pStyle}>The API follows REST conventions and returns JSON responses. It supports authentication via Bearer tokens and covers all resources: applications, databases, servers, deployments, and environment variables. This makes it easy to integrate Coolify into your existing CI/CD pipelines or build custom automation scripts.</p>
      <pre style={codeBlockStyle}><code>{'# Generate API token:\n# Dashboard > Settings > API Tokens > Create New Token\n\n# List all applications:\ncurl -s -H "Authorization: Bearer YOUR_API_TOKEN" \\\n  https://coolify.yourdomain.com/api/v1/applications | jq .\n\n# Get application details:\ncurl -s -H "Authorization: Bearer YOUR_API_TOKEN" \\\n  https://coolify.yourdomain.com/api/v1/applications/APP_UUID | jq .\n\n# Trigger a deployment:\ncurl -s -X POST \\\n  -H "Authorization: Bearer YOUR_API_TOKEN" \\\n  https://coolify.yourdomain.com/api/v1/applications/APP_UUID/deploy\n\n# Update environment variable:\ncurl -s -X PATCH \\\n  -H "Authorization: Bearer YOUR_API_TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"key": "APP_VERSION", "value": "2.1.0"}\' \\\n  https://coolify.yourdomain.com/api/v1/applications/APP_UUID/envs\n\n# List all servers:\ncurl -s -H "Authorization: Bearer YOUR_API_TOKEN" \\\n  https://coolify.yourdomain.com/api/v1/servers | jq .\n\n# List databases:\ncurl -s -H "Authorization: Bearer YOUR_API_TOKEN" \\\n  https://coolify.yourdomain.com/api/v1/databases | jq .\n\n# CI/CD integration example (GitHub Actions):\n# .github/workflows/deploy.yml\n# name: Deploy to Coolify\n# on:\n#   push:\n#     branches: [main]\n# jobs:\n#   deploy:\n#     runs-on: ubuntu-latest\n#     steps:\n#       - name: Trigger Coolify deployment\n#         run: |\n#           curl -s -X POST \\\n#             -H "Authorization: Bearer $COOLIFY_TOKEN" \\\n#             $COOLIFY_URL/api/v1/applications/$APP_UUID/deploy'}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1Q, a: t.faq1A },
        { q: t.faq2Q, a: t.faq2A },
        { q: t.faq3Q, a: t.faq3A },
        { q: t.faq4Q, a: t.faq4A },
        { q: t.faq5Q, a: t.faq5A },
        { q: t.faq6Q, a: t.faq6A },
        { q: t.faq7Q, a: t.faq7A },
        { q: t.faq8Q, a: t.faq8A },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{faq.q}</h3>
          <p style={{ lineHeight: '1.75', margin: 0 }}>{faq.a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <h2 style={h2Style}>{t.conclusionTitle}</h2>
      <p style={pStyle}>{t.conclusionDesc}</p>

      <h3 style={h3Style}>Getting Started Checklist</h3>
      <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={liStyle}>Choose a VPS provider and create an Ubuntu 24.04 instance (4GB+ RAM recommended)</li>
        <li style={liStyle}>Point your domain DNS A record to the server IP address</li>
        <li style={liStyle}>SSH into the server and run the Coolify install command</li>
        <li style={liStyle}>Access the dashboard, create an admin account, and set your instance domain</li>
        <li style={liStyle}>Connect your GitHub or GitLab account for automatic deployments</li>
        <li style={liStyle}>Deploy your first application from a Git repository</li>
        <li style={liStyle}>Configure custom domains and verify SSL certificates are issued</li>
        <li style={liStyle}>Set up automated database backups to an S3 destination</li>
        <li style={liStyle}>Apply security hardening: firewall, SSH keys, fail2ban</li>
        <li style={liStyle}>Enable Sentinel monitoring and set up health checks for all services</li>
      </ol>

      <p style={pStyle}>For additional resources, visit the official Coolify documentation at coolify.io/docs, join the Coolify Discord community for support, and follow the GitHub repository at github.com/coollabsio/coolify for release notes and feature announcements. The self-hosting community is growing rapidly, and Coolify is one of the most mature and actively developed projects in this space. Starting with a small VPS and a single application is the best way to learn, and you can scale from there as your confidence and requirements grow.</p>
    </article>
  );
}
