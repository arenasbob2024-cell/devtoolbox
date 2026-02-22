'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Nginx vs Apache 2026: Complete Web Server Comparison',
    intro: '<strong>Nginx</strong> and <strong>Apache</strong> are the two most widely deployed web servers in the world. Together they power over 60% of all websites. Nginx dominates high-traffic sites with its event-driven architecture, while Apache remains popular for shared hosting and applications needing per-directory configuration via .htaccess files. This comprehensive guide compares their architectures, performance characteristics, configuration approaches, and use cases to help you choose the right web server for your project.',
    h2Architecture: 'Architecture: The Fundamental Difference',
    archP1: 'The core architectural difference between Nginx and Apache determines their performance characteristics, resource usage, and configuration philosophy.',
    h3ApacheArch: 'Apache: Process/Thread-Based (MPM)',
    apacheArchP: 'Apache uses a Multi-Processing Module (MPM) architecture. The default MPM on most systems is <strong>event</strong> (Apache 2.4+), but <strong>prefork</strong> and <strong>worker</strong> are also available. In prefork mode, each connection gets its own process. In worker mode, connections are handled by threads within a pool of processes. The event MPM improves on worker by using a dedicated listener thread for keep-alive connections.',
    h3NginxArch: 'Nginx: Event-Driven, Non-Blocking',
    nginxArchP: 'Nginx uses an asynchronous, event-driven architecture. A master process manages multiple worker processes, each handling thousands of concurrent connections using a single thread with an event loop (epoll on Linux, kqueue on BSD). This means Nginx can serve 10,000+ concurrent connections with minimal memory because it does not create a thread or process per connection.',
    h2Performance: 'Performance Benchmarks',
    perfIntro: 'Performance comparisons between Nginx and Apache depend heavily on the workload type. Here are benchmarks for common scenarios.',
    thMetric: 'Metric',
    thApache: 'Apache 2.4 (event MPM)',
    thNginx: 'Nginx 1.27',
    metricStatic: 'Static file serving (req/s)',
    metricConcurrent: 'Concurrent connections (10K)',
    metricMemory: 'Memory per 10K connections',
    metricPhp: 'PHP (via PHP-FPM)',
    metricProxy: 'Reverse proxy throughput',
    metricSsl: 'SSL/TLS termination',
    valApacheStatic: '~15,000-25,000',
    valNginxStatic: '~50,000-100,000',
    valApacheConcurrent: 'Degrades (thread exhaustion)',
    valNginxConcurrent: 'Stable (event loop)',
    valApacheMemory: '~300-600MB',
    valNginxMemory: '~30-50MB',
    valApachePhp: 'mod_php or PHP-FPM',
    valNginxPhp: 'PHP-FPM (FastCGI)',
    valApacheProxy: 'Good (mod_proxy)',
    valNginxProxy: 'Excellent (native)',
    valApacheSsl: 'Good (mod_ssl)',
    valNginxSsl: 'Excellent (native)',
    h2Config: 'Configuration Comparison',
    configIntro: 'Apache and Nginx take fundamentally different approaches to configuration.',
    h3ApacheConfig: 'Apache: .htaccess + httpd.conf',
    apacheConfigP: 'Apache supports distributed configuration through .htaccess files, which allow per-directory overrides without restarting the server. This is popular in shared hosting because each user can configure their own directory. However, .htaccess files have a performance cost because Apache must scan for them on every request.',
    h3NginxConfig: 'Nginx: Centralized Configuration',
    nginxConfigP: 'Nginx uses centralized configuration files (nginx.conf and included files). There is no .htaccess equivalent. All configuration changes require a reload (which is graceful and near-instant). This centralized approach is faster because Nginx reads the config once at startup rather than scanning directories per request.',
    h2Features: 'Feature Comparison',
    thFeature: 'Feature',
    featModules: 'Module system',
    featHtaccess: '.htaccess support',
    featRewrite: 'URL rewriting',
    featProxy: 'Reverse proxy',
    featLB: 'Load balancing',
    featCache: 'Caching',
    featStreaming: 'Streaming/WebSocket',
    featHttp2: 'HTTP/2',
    featHttp3: 'HTTP/3 (QUIC)',
    featLua: 'Scripting',
    h2UseCases: 'Use Cases: When to Choose Each',
    h3ChooseNginx: 'Choose Nginx When:',
    nginxUseList: '<ul><li><strong>High traffic</strong> - Serving thousands of concurrent connections efficiently</li><li><strong>Reverse proxy</strong> - Proxying requests to backend application servers (Node.js, Python, Go)</li><li><strong>Load balancing</strong> - Distributing traffic across multiple backend servers</li><li><strong>Static content</strong> - Serving static files, images, and assets at maximum speed</li><li><strong>Microservices</strong> - API gateway and service mesh entry point</li><li><strong>CDN/Edge</strong> - Caching and serving content at the edge</li><li><strong>Docker/Kubernetes</strong> - Lightweight container-friendly web server and ingress</li></ul>',
    h3ChooseApache: 'Choose Apache When:',
    apacheUseList: '<ul><li><strong>Shared hosting</strong> - Multiple users needing per-directory .htaccess configuration</li><li><strong>WordPress/PHP</strong> - Traditional LAMP stack with mod_php</li><li><strong>Dynamic modules</strong> - Loading and unloading modules at runtime without recompilation</li><li><strong>.htaccess required</strong> - Applications that ship with .htaccess rules (WordPress, Drupal, Magento)</li><li><strong>Complex rewrite rules</strong> - mod_rewrite provides the most powerful regex-based URL rewriting</li></ul>',
    h3BothTogether: 'Using Both Together',
    bothP: 'A popular architecture uses Nginx as a reverse proxy in front of Apache. Nginx handles static files, SSL termination, and load balancing, while Apache runs the application (PHP via mod_php). This gives you the best of both worlds.',
    h2ReverseProxy: 'Reverse Proxy Configuration',
    h2LoadBalancing: 'Load Balancing',
    h2SSL: 'SSL/TLS Configuration',
    h2Security: 'Security Comparison',
    securityP: 'Both servers have strong security records, but their approaches differ.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Nginx faster than Apache?',
    faq1A: 'For static content and high-concurrency scenarios, Nginx is significantly faster due to its event-driven architecture. For dynamic content processed by PHP-FPM, both perform similarly since the bottleneck is the PHP process, not the web server. Nginx uses dramatically less memory under high concurrent load.',
    faq2Q: 'Can Nginx replace Apache completely?',
    faq2A: 'For most modern web applications, yes. The main scenario where Apache remains necessary is when you need .htaccess per-directory configuration (common in shared hosting) or mod_rewrite compatibility for legacy applications like WordPress with complex rewrite rules.',
    faq3Q: 'Which is better for WordPress?',
    faq3A: 'Apache is traditionally used with WordPress because WordPress ships with .htaccess files for URL rewriting. However, Nginx with proper configuration performs better for WordPress, especially under high traffic. Many managed WordPress hosts use Nginx with custom FastCGI caching. You need to manually configure Nginx rewrite rules that WordPress handles automatically via .htaccess on Apache.',
    faq4Q: 'Should I use Nginx as a reverse proxy for Apache?',
    faq4A: 'This is a popular pattern that gives you the best of both worlds. Nginx handles static files, SSL termination, caching, and rate limiting at the front. Apache runs behind it for PHP applications that need .htaccess or mod_php. The overhead of the extra layer is minimal compared to the performance gains.',
    faq5Q: 'What about Caddy and Traefik?',
    faq5A: 'Caddy is a modern web server written in Go with automatic HTTPS (Let\'s Encrypt). It is excellent for simple deployments. Traefik is a cloud-native reverse proxy designed for container orchestration (Docker, Kubernetes). Both are great alternatives for specific use cases, but Nginx and Apache remain the most battle-tested and widely deployed options.',
    relatedTitle: 'Related Tools and Guides',
  },
  zh: {
    title: 'Nginx vs Apache 2026：完整 Web 服务器对比',
    intro: '<strong>Nginx</strong> 和 <strong>Apache</strong> 是世界上部署最广泛的两个 Web 服务器。它们合计为超过 60% 的网站提供服务。Nginx 以其事件驱动架构主导高流量站点，而 Apache 在共享主机和需要 .htaccess 配置的应用中仍然流行。',
    h2Architecture: '架构：根本区别', archP1: 'Nginx 和 Apache 之间的核心架构差异决定了它们的性能特征、资源使用和配置理念。',
    h3ApacheArch: 'Apache：基于进程/线程 (MPM)', apacheArchP: 'Apache 使用多处理模块 (MPM) 架构。默认 MPM 是 <strong>event</strong>，也可使用 <strong>prefork</strong> 和 <strong>worker</strong>。',
    h3NginxArch: 'Nginx：事件驱动、非阻塞', nginxArchP: 'Nginx 使用异步事件驱动架构。主进程管理多个工作进程，每个工作进程使用单线程和事件循环处理数千个并发连接。',
    h2Performance: '性能基准', perfIntro: '性能对比取决于工作负载类型。', thMetric: '指标', thApache: 'Apache 2.4', thNginx: 'Nginx 1.27', metricStatic: '静态文件服务 (请求/秒)', metricConcurrent: '并发连接 (10K)', metricMemory: '10K连接的内存', metricPhp: 'PHP (通过 PHP-FPM)', metricProxy: '反向代理吞吐量', metricSsl: 'SSL/TLS 终止', valApacheStatic: '~15,000-25,000', valNginxStatic: '~50,000-100,000', valApacheConcurrent: '性能下降', valNginxConcurrent: '稳定', valApacheMemory: '~300-600MB', valNginxMemory: '~30-50MB', valApachePhp: 'mod_php 或 PHP-FPM', valNginxPhp: 'PHP-FPM', valApacheProxy: '良好', valNginxProxy: '优秀（原生）', valApacheSsl: '良好', valNginxSsl: '优秀（原生）',
    h2Config: '配置对比', configIntro: 'Apache 和 Nginx 的配置方法截然不同。', h3ApacheConfig: 'Apache：.htaccess + httpd.conf', apacheConfigP: 'Apache 通过 .htaccess 文件支持分布式配置。', h3NginxConfig: 'Nginx：集中式配置', nginxConfigP: 'Nginx 使用集中式配置文件。没有 .htaccess 等效功能。',
    h2Features: '功能对比', thFeature: '功能', featModules: '模块系统', featHtaccess: '.htaccess', featRewrite: 'URL 重写', featProxy: '反向代理', featLB: '负载均衡', featCache: '缓存', featStreaming: 'WebSocket', featHttp2: 'HTTP/2', featHttp3: 'HTTP/3', featLua: '脚本',
    h2UseCases: '使用场景', h3ChooseNginx: '选择 Nginx：', nginxUseList: '<ul><li><strong>高流量</strong> — 高效处理数千并发连接</li><li><strong>反向代理</strong> — 代理到后端应用</li><li><strong>负载均衡</strong> — 分发流量</li><li><strong>静态内容</strong> — 最大速度提供静态文件</li><li><strong>Docker/K8s</strong> — 轻量级容器友好</li></ul>', h3ChooseApache: '选择 Apache：', apacheUseList: '<ul><li><strong>共享主机</strong> — .htaccess 按目录配置</li><li><strong>WordPress/PHP</strong> — 传统 LAMP</li><li><strong>动态模块</strong> — 运行时加载</li></ul>', h3BothTogether: '两者一起使用', bothP: 'Nginx 作为反向代理在 Apache 前面是流行的架构。',
    h2ReverseProxy: '反向代理配置', h2LoadBalancing: '负载均衡', h2SSL: 'SSL/TLS 配置', h2Security: '安全性对比', securityP: '两者都有良好的安全记录。',
    h2Faq: '常见问题', faq1Q: 'Nginx 比 Apache 快吗？', faq1A: '对于静态内容和高并发场景，Nginx 显著更快。对于动态内容，两者性能相近。', faq2Q: 'Nginx 能完全替代 Apache 吗？', faq2A: '大多数现代应用可以。主要例外是需要 .htaccess 的场景。', faq3Q: '哪个更适合 WordPress？', faq3A: 'Apache 传统上用于 WordPress。但 Nginx 配置得当性能更好。', faq4Q: '应该用 Nginx 作为 Apache 的反向代理吗？', faq4A: '这是一种流行的模式，可以兼得两者优势。', faq5Q: 'Caddy 和 Traefik 呢？', faq5A: 'Caddy 适合简单部署。Traefik 适合容器编排。但 Nginx 和 Apache 仍然是最经过验证的选择。',
    relatedTitle: '相关工具和指南',
  },
  ja: {
    title: 'Nginx vs Apache 2026：Webサーバー完全比較',
    intro: '<strong>Nginx</strong>と<strong>Apache</strong>は世界で最も広く展開されているWebサーバーです。',
    h2Architecture: 'アーキテクチャ：根本的な違い', archP1: 'NginxとApacheのアーキテクチャの違いがパフォーマンスを決定します。', h3ApacheArch: 'Apache：プロセス/スレッドベース', apacheArchP: 'Apacheはマルチプロセシングモジュール(MPM)を使用します。', h3NginxArch: 'Nginx：イベント駆動型、ノンブロッキング', nginxArchP: 'Nginxは非同期イベント駆動アーキテクチャを使用します。',
    h2Performance: 'パフォーマンスベンチマーク', perfIntro: 'ワークロードタイプに依存します。', thMetric: '指標', thApache: 'Apache 2.4', thNginx: 'Nginx 1.27', metricStatic: '静的ファイル (リクエスト/秒)', metricConcurrent: '同時接続 (10K)', metricMemory: '10K接続のメモリ', metricPhp: 'PHP', metricProxy: 'リバースプロキシ', metricSsl: 'SSL/TLS', valApacheStatic: '~15,000-25,000', valNginxStatic: '~50,000-100,000', valApacheConcurrent: '低下', valNginxConcurrent: '安定', valApacheMemory: '~300-600MB', valNginxMemory: '~30-50MB', valApachePhp: 'mod_php/PHP-FPM', valNginxPhp: 'PHP-FPM', valApacheProxy: '良好', valNginxProxy: '優秀', valApacheSsl: '良好', valNginxSsl: '優秀',
    h2Config: '設定の比較', configIntro: 'ApacheとNginxは設定方法が異なります。', h3ApacheConfig: 'Apache：.htaccess + httpd.conf', apacheConfigP: 'Apacheは.htaccessによる分散設定をサポート。', h3NginxConfig: 'Nginx：集中設定', nginxConfigP: 'Nginxは集中設定ファイルを使用。',
    h2Features: '機能比較', thFeature: '機能', featModules: 'モジュール', featHtaccess: '.htaccess', featRewrite: 'URL書き換え', featProxy: 'リバースプロキシ', featLB: 'ロードバランシング', featCache: 'キャッシュ', featStreaming: 'WebSocket', featHttp2: 'HTTP/2', featHttp3: 'HTTP/3', featLua: 'スクリプト',
    h2UseCases: '使用シナリオ', h3ChooseNginx: 'Nginxを選ぶ場合：', nginxUseList: '<ul><li><strong>高トラフィック</strong></li><li><strong>リバースプロキシ</strong></li><li><strong>ロードバランシング</strong></li><li><strong>静的コンテンツ</strong></li></ul>', h3ChooseApache: 'Apacheを選ぶ場合：', apacheUseList: '<ul><li><strong>共有ホスティング</strong></li><li><strong>WordPress/PHP</strong></li><li><strong>動的モジュール</strong></li></ul>', h3BothTogether: '両方を使用', bothP: 'NginxをApacheの前のリバースプロキシとして使用するのが一般的。',
    h2ReverseProxy: 'リバースプロキシ設定', h2LoadBalancing: 'ロードバランシング', h2SSL: 'SSL/TLS設定', h2Security: 'セキュリティ比較', securityP: '両方とも優れたセキュリティ実績があります。',
    h2Faq: 'よくある質問', faq1Q: 'NginxはApacheより速い？', faq1A: '静的コンテンツと高同時接続ではNginxが速い。動的コンテンツでは同等。', faq2Q: 'NginxはApacheを完全に置き換えられる？', faq2A: 'ほとんどの場合はい。.htaccessが必要な場合を除く。', faq3Q: 'WordPressにはどちらが良い？', faq3A: 'Apacheが伝統的。Nginxは適切な設定でより高性能。', faq4Q: 'NginxをApacheのリバースプロキシにすべき？', faq4A: '両方の利点を活かせる一般的なパターン。', faq5Q: 'CaddyやTraefikは？', faq5A: 'Caddyはシンプルな展開に。Traefikはコンテナオーケストレーションに。',
    relatedTitle: '関連ツールとガイド',
  },
  ko: {
    title: 'Nginx vs Apache 2026: 완전한 웹 서버 비교',
    intro: '<strong>Nginx</strong>와 <strong>Apache</strong>는 세계에서 가장 널리 배포된 웹 서버입니다.',
    h2Architecture: '아키텍처: 근본적인 차이', archP1: 'Nginx와 Apache의 핵심 아키텍처 차이가 성능을 결정합니다.', h3ApacheArch: 'Apache: 프로세스/스레드 기반', apacheArchP: 'Apache는 멀티 프로세싱 모듈(MPM) 아키텍처를 사용합니다.', h3NginxArch: 'Nginx: 이벤트 기반, 논블로킹', nginxArchP: 'Nginx는 비동기 이벤트 기반 아키텍처를 사용합니다.',
    h2Performance: '성능 벤치마크', perfIntro: '워크로드 유형에 따라 다릅니다.', thMetric: '지표', thApache: 'Apache 2.4', thNginx: 'Nginx 1.27', metricStatic: '정적 파일 (요청/초)', metricConcurrent: '동시 연결 (10K)', metricMemory: '10K 연결 메모리', metricPhp: 'PHP', metricProxy: '리버스 프록시', metricSsl: 'SSL/TLS', valApacheStatic: '~15,000-25,000', valNginxStatic: '~50,000-100,000', valApacheConcurrent: '성능 저하', valNginxConcurrent: '안정적', valApacheMemory: '~300-600MB', valNginxMemory: '~30-50MB', valApachePhp: 'mod_php/PHP-FPM', valNginxPhp: 'PHP-FPM', valApacheProxy: '양호', valNginxProxy: '우수', valApacheSsl: '양호', valNginxSsl: '우수',
    h2Config: '설정 비교', configIntro: 'Apache와 Nginx는 설정 방식이 다릅니다.', h3ApacheConfig: 'Apache: .htaccess + httpd.conf', apacheConfigP: 'Apache는 .htaccess를 통한 분산 설정을 지원합니다.', h3NginxConfig: 'Nginx: 중앙 집중식 설정', nginxConfigP: 'Nginx는 중앙 집중식 설정 파일을 사용합니다.',
    h2Features: '기능 비교', thFeature: '기능', featModules: '모듈', featHtaccess: '.htaccess', featRewrite: 'URL 리라이트', featProxy: '리버스 프록시', featLB: '로드 밸런싱', featCache: '캐싱', featStreaming: 'WebSocket', featHttp2: 'HTTP/2', featHttp3: 'HTTP/3', featLua: '스크립팅',
    h2UseCases: '사용 시나리오', h3ChooseNginx: 'Nginx를 선택할 때:', nginxUseList: '<ul><li><strong>높은 트래픽</strong></li><li><strong>리버스 프록시</strong></li><li><strong>로드 밸런싱</strong></li><li><strong>정적 콘텐츠</strong></li></ul>', h3ChooseApache: 'Apache를 선택할 때:', apacheUseList: '<ul><li><strong>공유 호스팅</strong></li><li><strong>WordPress/PHP</strong></li><li><strong>동적 모듈</strong></li></ul>', h3BothTogether: '함께 사용', bothP: 'Nginx를 Apache 앞의 리버스 프록시로 사용하는 것이 인기 있는 아키텍처입니다.',
    h2ReverseProxy: '리버스 프록시 설정', h2LoadBalancing: '로드 밸런싱', h2SSL: 'SSL/TLS 설정', h2Security: '보안 비교', securityP: '두 서버 모두 우수한 보안 기록을 가지고 있습니다.',
    h2Faq: '자주 묻는 질문', faq1Q: 'Nginx가 Apache보다 빠른가요?', faq1A: '정적 콘텐츠와 높은 동시성에서 Nginx가 빠릅니다. 동적 콘텐츠에서는 비슷합니다.', faq2Q: 'Nginx가 Apache를 완전히 대체할 수 있나요?', faq2A: '대부분의 경우 가능합니다. .htaccess가 필요한 경우 제외.', faq3Q: 'WordPress에는 어느 것이 좋은가요?', faq3A: 'Apache가 전통적이지만, Nginx가 적절히 설정되면 더 빠릅니다.', faq4Q: 'Nginx를 Apache의 리버스 프록시로 사용해야 하나요?', faq4A: '두 가지의 장점을 모두 얻을 수 있는 인기 있는 패턴입니다.', faq5Q: 'Caddy와 Traefik은?', faq5A: 'Caddy는 간단한 배포에, Traefik은 컨테이너 오케스트레이션에 적합합니다.',
    relatedTitle: '관련 도구 및 가이드',
  },
  fr: {
    title: 'Nginx vs Apache 2026 : Comparaison complete de serveurs web',
    intro: '<strong>Nginx</strong> et <strong>Apache</strong> sont les serveurs web les plus deployes au monde.',
    h2Architecture: 'Architecture', archP1: 'La difference architecturale fondamentale determine les performances.', h3ApacheArch: 'Apache : Processus/Threads (MPM)', apacheArchP: 'Apache utilise une architecture MPM.', h3NginxArch: 'Nginx : Evenementiel, non-bloquant', nginxArchP: 'Nginx utilise une architecture asynchrone evenementielle.',
    h2Performance: 'Benchmarks de performance', perfIntro: 'Depend du type de charge.', thMetric: 'Metrique', thApache: 'Apache 2.4', thNginx: 'Nginx 1.27', metricStatic: 'Fichiers statiques', metricConcurrent: 'Connexions simultanees', metricMemory: 'Memoire', metricPhp: 'PHP', metricProxy: 'Reverse proxy', metricSsl: 'SSL/TLS', valApacheStatic: '~15,000-25,000', valNginxStatic: '~50,000-100,000', valApacheConcurrent: 'Degradation', valNginxConcurrent: 'Stable', valApacheMemory: '~300-600MB', valNginxMemory: '~30-50MB', valApachePhp: 'mod_php/PHP-FPM', valNginxPhp: 'PHP-FPM', valApacheProxy: 'Bon', valNginxProxy: 'Excellent', valApacheSsl: 'Bon', valNginxSsl: 'Excellent',
    h2Config: 'Comparaison de configuration', configIntro: 'Approches fondamentalement differentes.', h3ApacheConfig: 'Apache : .htaccess', apacheConfigP: 'Configuration distribuee via .htaccess.', h3NginxConfig: 'Nginx : Configuration centralisee', nginxConfigP: 'Fichiers de configuration centralises.',
    h2Features: 'Comparaison des fonctionnalites', thFeature: 'Fonctionnalite', featModules: 'Modules', featHtaccess: '.htaccess', featRewrite: 'Reecriture URL', featProxy: 'Reverse proxy', featLB: 'Load balancing', featCache: 'Cache', featStreaming: 'WebSocket', featHttp2: 'HTTP/2', featHttp3: 'HTTP/3', featLua: 'Script',
    h2UseCases: 'Cas d\'utilisation', h3ChooseNginx: 'Choisir Nginx :', nginxUseList: '<ul><li><strong>Haut trafic</strong></li><li><strong>Reverse proxy</strong></li><li><strong>Load balancing</strong></li></ul>', h3ChooseApache: 'Choisir Apache :', apacheUseList: '<ul><li><strong>Hebergement partage</strong></li><li><strong>WordPress/PHP</strong></li></ul>', h3BothTogether: 'Utiliser les deux', bothP: 'Nginx comme reverse proxy devant Apache.',
    h2ReverseProxy: 'Configuration reverse proxy', h2LoadBalancing: 'Load balancing', h2SSL: 'Configuration SSL/TLS', h2Security: 'Comparaison securite', securityP: 'Les deux ont de bons bilans de securite.',
    h2Faq: 'Questions frequentes', faq1Q: 'Nginx est-il plus rapide ?', faq1A: 'Pour le contenu statique oui. Pour le dynamique, similaire.', faq2Q: 'Nginx peut-il remplacer Apache ?', faq2A: 'Dans la plupart des cas oui.', faq3Q: 'Lequel pour WordPress ?', faq3A: 'Apache traditionnel, Nginx plus performant.', faq4Q: 'Nginx en reverse proxy d\'Apache ?', faq4A: 'Pattern populaire et efficace.', faq5Q: 'Caddy et Traefik ?', faq5A: 'Alternatives pour des cas specifiques.',
    relatedTitle: 'Outils et guides associes',
  },
  de: {
    title: 'Nginx vs Apache 2026: Kompletter Webserver-Vergleich',
    intro: '<strong>Nginx</strong> und <strong>Apache</strong> sind die am weitesten verbreiteten Webserver der Welt.',
    h2Architecture: 'Architektur', archP1: 'Der architektonische Unterschied bestimmt die Leistung.', h3ApacheArch: 'Apache: Prozess/Thread-basiert', apacheArchP: 'Apache verwendet eine MPM-Architektur.', h3NginxArch: 'Nginx: Ereignisgesteuert', nginxArchP: 'Nginx verwendet eine asynchrone Architektur.',
    h2Performance: 'Performance-Benchmarks', perfIntro: 'Abhaengig vom Workload-Typ.', thMetric: 'Metrik', thApache: 'Apache 2.4', thNginx: 'Nginx 1.27', metricStatic: 'Statische Dateien', metricConcurrent: 'Gleichzeitige Verbindungen', metricMemory: 'Speicher', metricPhp: 'PHP', metricProxy: 'Reverse Proxy', metricSsl: 'SSL/TLS', valApacheStatic: '~15.000-25.000', valNginxStatic: '~50.000-100.000', valApacheConcurrent: 'Verschlechterung', valNginxConcurrent: 'Stabil', valApacheMemory: '~300-600MB', valNginxMemory: '~30-50MB', valApachePhp: 'mod_php/PHP-FPM', valNginxPhp: 'PHP-FPM', valApacheProxy: 'Gut', valNginxProxy: 'Ausgezeichnet', valApacheSsl: 'Gut', valNginxSsl: 'Ausgezeichnet',
    h2Config: 'Konfigurationsvergleich', configIntro: 'Grundlegend unterschiedliche Ansaetze.', h3ApacheConfig: 'Apache: .htaccess', apacheConfigP: 'Verteilte Konfiguration via .htaccess.', h3NginxConfig: 'Nginx: Zentralisierte Konfiguration', nginxConfigP: 'Zentralisierte Konfigurationsdateien.',
    h2Features: 'Funktionsvergleich', thFeature: 'Funktion', featModules: 'Module', featHtaccess: '.htaccess', featRewrite: 'URL-Umschreibung', featProxy: 'Reverse Proxy', featLB: 'Load Balancing', featCache: 'Caching', featStreaming: 'WebSocket', featHttp2: 'HTTP/2', featHttp3: 'HTTP/3', featLua: 'Scripting',
    h2UseCases: 'Anwendungsfaelle', h3ChooseNginx: 'Nginx waehlen:', nginxUseList: '<ul><li><strong>Hoher Traffic</strong></li><li><strong>Reverse Proxy</strong></li><li><strong>Load Balancing</strong></li></ul>', h3ChooseApache: 'Apache waehlen:', apacheUseList: '<ul><li><strong>Shared Hosting</strong></li><li><strong>WordPress/PHP</strong></li></ul>', h3BothTogether: 'Beide zusammen', bothP: 'Nginx als Reverse Proxy vor Apache.',
    h2ReverseProxy: 'Reverse-Proxy-Konfiguration', h2LoadBalancing: 'Load Balancing', h2SSL: 'SSL/TLS-Konfiguration', h2Security: 'Sicherheitsvergleich', securityP: 'Beide haben gute Sicherheitsbilanzen.',
    h2Faq: 'Haeufig gestellte Fragen', faq1Q: 'Ist Nginx schneller?', faq1A: 'Fuer statische Inhalte ja. Dynamisch aehnlich.', faq2Q: 'Kann Nginx Apache ersetzen?', faq2A: 'Meistens ja.', faq3Q: 'Welcher fuer WordPress?', faq3A: 'Apache traditionell, Nginx performanter.', faq4Q: 'Nginx als Reverse Proxy?', faq4A: 'Beliebtes und effektives Muster.', faq5Q: 'Caddy und Traefik?', faq5A: 'Alternativen fuer spezifische Faelle.',
    relatedTitle: 'Verwandte Tools und Anleitungen',
  },
  es: {
    title: 'Nginx vs Apache 2026: Comparacion completa de servidores web',
    intro: '<strong>Nginx</strong> y <strong>Apache</strong> son los servidores web mas desplegados del mundo.',
    h2Architecture: 'Arquitectura', archP1: 'La diferencia arquitectonica fundamental determina el rendimiento.', h3ApacheArch: 'Apache: Basado en procesos/hilos', apacheArchP: 'Apache utiliza arquitectura MPM.', h3NginxArch: 'Nginx: Orientado a eventos', nginxArchP: 'Nginx utiliza arquitectura asincrona orientada a eventos.',
    h2Performance: 'Benchmarks de rendimiento', perfIntro: 'Depende del tipo de carga.', thMetric: 'Metrica', thApache: 'Apache 2.4', thNginx: 'Nginx 1.27', metricStatic: 'Archivos estaticos', metricConcurrent: 'Conexiones simultaneas', metricMemory: 'Memoria', metricPhp: 'PHP', metricProxy: 'Reverse proxy', metricSsl: 'SSL/TLS', valApacheStatic: '~15.000-25.000', valNginxStatic: '~50.000-100.000', valApacheConcurrent: 'Degradacion', valNginxConcurrent: 'Estable', valApacheMemory: '~300-600MB', valNginxMemory: '~30-50MB', valApachePhp: 'mod_php/PHP-FPM', valNginxPhp: 'PHP-FPM', valApacheProxy: 'Bueno', valNginxProxy: 'Excelente', valApacheSsl: 'Bueno', valNginxSsl: 'Excelente',
    h2Config: 'Comparacion de configuracion', configIntro: 'Enfoques fundamentalmente diferentes.', h3ApacheConfig: 'Apache: .htaccess', apacheConfigP: 'Configuracion distribuida via .htaccess.', h3NginxConfig: 'Nginx: Configuracion centralizada', nginxConfigP: 'Archivos de configuracion centralizados.',
    h2Features: 'Comparacion de funciones', thFeature: 'Funcion', featModules: 'Modulos', featHtaccess: '.htaccess', featRewrite: 'Reescritura URL', featProxy: 'Reverse proxy', featLB: 'Load balancing', featCache: 'Cache', featStreaming: 'WebSocket', featHttp2: 'HTTP/2', featHttp3: 'HTTP/3', featLua: 'Scripting',
    h2UseCases: 'Casos de uso', h3ChooseNginx: 'Elegir Nginx:', nginxUseList: '<ul><li><strong>Alto trafico</strong></li><li><strong>Reverse proxy</strong></li><li><strong>Load balancing</strong></li></ul>', h3ChooseApache: 'Elegir Apache:', apacheUseList: '<ul><li><strong>Hosting compartido</strong></li><li><strong>WordPress/PHP</strong></li></ul>', h3BothTogether: 'Usar ambos', bothP: 'Nginx como reverse proxy delante de Apache.',
    h2ReverseProxy: 'Configuracion de reverse proxy', h2LoadBalancing: 'Load balancing', h2SSL: 'Configuracion SSL/TLS', h2Security: 'Comparacion de seguridad', securityP: 'Ambos tienen buenos registros de seguridad.',
    h2Faq: 'Preguntas frecuentes', faq1Q: 'Es Nginx mas rapido?', faq1A: 'Para contenido estatico si. Dinamico similar.', faq2Q: 'Puede Nginx reemplazar Apache?', faq2A: 'En la mayoria de casos si.', faq3Q: 'Cual para WordPress?', faq3A: 'Apache tradicional, Nginx mas rapido.', faq4Q: 'Nginx como reverse proxy de Apache?', faq4A: 'Patron popular y efectivo.', faq5Q: 'Caddy y Traefik?', faq5A: 'Alternativas para casos especificos.',
    relatedTitle: 'Herramientas y guias relacionadas',
  },
};

export default function NginxVsApache2026({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2Architecture}</h2>
      <p>{s.archP1}</p>

      <h3>{s.h3ApacheArch}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.apacheArchP }} />
      <pre><code className="language-text">{`Apache Architecture (Process/Thread Model):

  Master Process
  ├── Worker Process 1
  │   ├── Thread 1 → handles connection A
  │   ├── Thread 2 → handles connection B
  │   └── Thread N → handles connection C
  ├── Worker Process 2
  │   ├── Thread 1 → handles connection D
  │   └── Thread N → handles connection E
  └── Worker Process N...

  MPM Modes:
  - prefork: 1 process per connection (safe for non-thread-safe modules like mod_php)
  - worker:  threads within process pool (more efficient)
  - event:   listener thread for keep-alive (best for Apache 2.4+)`}</code></pre>

      <h3>{s.h3NginxArch}</h3>
      <p>{s.nginxArchP}</p>
      <pre><code className="language-text">{`Nginx Architecture (Event-Driven):

  Master Process (reads config, manages workers)
  ├── Worker Process 1 (single thread, event loop)
  │   └── Event Loop: handles 1000s of connections via epoll/kqueue
  │       ├── Connection A (non-blocking I/O)
  │       ├── Connection B (non-blocking I/O)
  │       ├── Connection C (non-blocking I/O)
  │       └── ... (thousands more)
  ├── Worker Process 2 (single thread, event loop)
  │   └── Event Loop: handles 1000s more connections
  └── Worker Process N (typically = CPU cores)

  Key: No thread-per-connection overhead
  Result: 10K+ connections with ~30-50MB RAM`}</code></pre>

      <h2>{s.h2Performance}</h2>
      <p>{s.perfIntro}</p>
      <table>
        <thead><tr><th>{s.thMetric}</th><th>{s.thApache}</th><th>{s.thNginx}</th></tr></thead>
        <tbody>
          <tr><td>{s.metricStatic}</td><td>{s.valApacheStatic}</td><td>{s.valNginxStatic}</td></tr>
          <tr><td>{s.metricConcurrent}</td><td>{s.valApacheConcurrent}</td><td>{s.valNginxConcurrent}</td></tr>
          <tr><td>{s.metricMemory}</td><td>{s.valApacheMemory}</td><td>{s.valNginxMemory}</td></tr>
          <tr><td>{s.metricPhp}</td><td>{s.valApachePhp}</td><td>{s.valNginxPhp}</td></tr>
          <tr><td>{s.metricProxy}</td><td>{s.valApacheProxy}</td><td>{s.valNginxProxy}</td></tr>
          <tr><td>{s.metricSsl}</td><td>{s.valApacheSsl}</td><td>{s.valNginxSsl}</td></tr>
        </tbody>
      </table>

      <h2>{s.h2Config}</h2>
      <p>{s.configIntro}</p>

      <h3>{s.h3ApacheConfig}</h3>
      <p>{s.apacheConfigP}</p>
      <pre><code className="language-apache">{`# Apache Virtual Host Configuration (/etc/apache2/sites-available/example.conf)
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/example/public

    <Directory /var/www/example/public>
        AllowOverride All
        Require all granted
        Options -Indexes +FollowSymLinks
    </Directory>

    # Enable mod_rewrite
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # PHP via mod_php (prefork MPM required)
    <FilesMatch \\.php$>
        SetHandler application/x-httpd-php
    </FilesMatch>

    # Or PHP via PHP-FPM (recommended with event MPM)
    <FilesMatch \\.php$>
        SetHandler "proxy:unix:/run/php/php8.3-fpm.sock|fcgi://localhost"
    </FilesMatch>

    # Logging
    ErrorLog \${APACHE_LOG_DIR}/example-error.log
    CustomLog \${APACHE_LOG_DIR}/example-access.log combined
</VirtualHost>

# .htaccess file (per-directory, no restart needed)
# /var/www/example/public/.htaccess
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]`}</code></pre>

      <h3>{s.h3NginxConfig}</h3>
      <p>{s.nginxConfigP}</p>
      <pre><code className="language-nginx">{`# Nginx Server Block (/etc/nginx/sites-available/example.conf)
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;
    root /var/www/example/public;
    index index.html index.php;

    # SSL
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Static files with caching
    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # PHP via PHP-FPM
    location ~ \\.php$ {
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # SPA fallback (equivalent to .htaccess rewrite)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    access_log /var/log/nginx/example-access.log;
    error_log /var/log/nginx/example-error.log;
}`}</code></pre>

      <h2>{s.h2Features}</h2>
      <pre><code className="language-text">{`Feature              Apache 2.4                   Nginx 1.27
-------------------------------------------------------------------
Module System        Dynamic (load at runtime)     Static + dynamic (since 1.9.11)
.htaccess            Full support                  Not supported
URL Rewriting        mod_rewrite (regex)            rewrite directive (simpler)
Reverse Proxy        mod_proxy + mod_proxy_http     Native proxy_pass
Load Balancing       mod_proxy_balancer             Native upstream module
Caching              mod_cache                      Native proxy_cache + FastCGI
WebSocket            mod_proxy_wstunnel             Native support
HTTP/2               mod_http2                      Native
HTTP/3 (QUIC)        Experimental                   Native since 1.25.0
Scripting            mod_lua                        OpenResty (Lua), njs (JS)
Config Reload        Restart required               Graceful reload (zero downtime)
Per-dir Config       .htaccess (runtime)            Not available
License              Apache 2.0                     BSD 2-Clause`}</code></pre>

      <h2>{s.h2UseCases}</h2>

      <h3>{s.h3ChooseNginx}</h3>
      <div dangerouslySetInnerHTML={{ __html: s.nginxUseList }} />

      <h3>{s.h3ChooseApache}</h3>
      <div dangerouslySetInnerHTML={{ __html: s.apacheUseList }} />

      <h3>{s.h3BothTogether}</h3>
      <p>{s.bothP}</p>
      <pre><code className="language-nginx">{`# Nginx as reverse proxy in front of Apache
# /etc/nginx/sites-available/example.conf

upstream apache_backend {
    server 127.0.0.1:8080;  # Apache listens on port 8080
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Nginx serves static files directly (fast)
    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff2)$ {
        root /var/www/example/public;
        expires 30d;
        access_log off;
    }

    # Dynamic requests go to Apache (PHP, .htaccess)
    location / {
        proxy_pass http://apache_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`}</code></pre>

      <h2>{s.h2ReverseProxy}</h2>
      <pre><code className="language-nginx">{`# Nginx reverse proxy to Node.js / Python / Go backend
upstream app_servers {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    keepalive 64;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;

    location / {
        proxy_pass http://app_servers;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}`}</code></pre>

      <h2>{s.h2LoadBalancing}</h2>
      <pre><code className="language-nginx">{`# Nginx Load Balancing Strategies

# Round Robin (default)
upstream backend_rr {
    server 10.0.0.1:8080;
    server 10.0.0.2:8080;
    server 10.0.0.3:8080;
}

# Weighted Round Robin
upstream backend_weighted {
    server 10.0.0.1:8080 weight=5;   # gets 5x traffic
    server 10.0.0.2:8080 weight=3;
    server 10.0.0.3:8080 weight=1;
}

# Least Connections
upstream backend_least {
    least_conn;
    server 10.0.0.1:8080;
    server 10.0.0.2:8080;
}

# IP Hash (sticky sessions)
upstream backend_ip {
    ip_hash;
    server 10.0.0.1:8080;
    server 10.0.0.2:8080;
}

# Health checks and failover
upstream backend_health {
    server 10.0.0.1:8080 max_fails=3 fail_timeout=30s;
    server 10.0.0.2:8080 max_fails=3 fail_timeout=30s;
    server 10.0.0.3:8080 backup;  # only used when others fail
}`}</code></pre>

      <h2>{s.h2SSL}</h2>
      <pre><code className="language-nginx">{`# Nginx SSL/TLS Best Practices (2026)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    # Modern TLS configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 1.1.1.1 8.8.8.8 valid=300s;

    # Session resumption
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # HSTS (15768000 seconds = 6 months)
    add_header Strict-Transport-Security "max-age=15768000; includeSubDomains" always;
}`}</code></pre>

      <h2>{s.h2Security}</h2>
      <p>{s.securityP}</p>
      <pre><code className="language-text">{`Security Aspect          Apache                    Nginx
-----------------------------------------------------------------
CVE History              More CVEs (larger surface)  Fewer CVEs (smaller codebase)
.htaccess Risk           Can expose config errors    N/A (no .htaccess)
Default Config           Permissive                  Restrictive
Module Surface           Large (many loaded)          Minimal (compile what you need)
Rate Limiting            mod_ratelimit               limit_req / limit_conn (native)
WAF Integration          mod_security (mature)        ModSecurity + NAXSI
Access Control           .htaccess / <Directory>      allow/deny directives
Request Size Limits      LimitRequestBody             client_max_body_size`}</code></pre>

      <h2>{s.h2Faq}</h2>

      <h3>{s.faq1Q}</h3>
      <p>{s.faq1A}</p>

      <h3>{s.faq2Q}</h3>
      <p>{s.faq2A}</p>

      <h3>{s.faq3Q}</h3>
      <p>{s.faq3A}</p>

      <h3>{s.faq4Q}</h3>
      <p>{s.faq4A}</p>

      <h3>{s.faq5Q}</h3>
      <p>{s.faq5A}</p>

      <h2>{s.relatedTitle}</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format Nginx/Apache JSON configs</li>
        <li><Link href={`/${lang}/tools/json-yaml`}>JSON to YAML Converter</Link> - Convert config formats</li>
        <li><Link href={`/${lang}/tools/regex-tester`}>Regex Tester</Link> - Test URL rewrite patterns</li>
        <li><Link href={`/${lang}/blog/nginx-config-examples`}>Nginx Config Examples</Link></li>
        <li><Link href={`/${lang}/blog/nginx-location-block-regex-guide`}>Nginx Location Block Regex Guide</Link></li>
        <li><Link href={`/${lang}/blog/htaccess-redirect-cheat-sheet-examples`}>.htaccess Redirect Cheat Sheet</Link></li>
        <li><Link href={`/${lang}/blog/dns-record-types-a-cname-mx-txt`}>DNS Record Types Guide</Link></li>
      </ul>
    </>
  );
}
