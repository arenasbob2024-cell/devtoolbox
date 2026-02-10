const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Nginx is the world\'s most popular web server, powering over 30% of all websites. Whether you need to serve static files, set up a reverse proxy, configure SSL, or load-balance traffic across multiple backends, this <strong>comprehensive Nginx configuration guide</strong> provides production-ready examples you can copy and adapt immediately. Every configuration block includes detailed comments explaining each directive.',
    h2_basics: 'Nginx Basics',
    p_basics: 'Nginx (pronounced "engine-x") is a high-performance HTTP server, reverse proxy, and load balancer. Its event-driven architecture handles thousands of concurrent connections with minimal memory. The main configuration file is typically located at <code>/etc/nginx/nginx.conf</code>, with site-specific configs in <code>/etc/nginx/conf.d/</code> or <code>/etc/nginx/sites-available/</code>.',
    h2_static: 'Static Site Configuration',
    p_static: 'The simplest and most common use case: serving HTML, CSS, JavaScript, and image files directly from disk. This configuration includes caching headers for optimal performance.',
    h2_reverse_proxy: 'Reverse Proxy Configuration',
    p_reverse_proxy: 'A reverse proxy sits between clients and your backend application (Node.js, Python, Go, etc.), forwarding requests and returning responses. This is the most common production setup for web applications.',
    h2_ssl: 'SSL/TLS Configuration',
    p_ssl: 'Securing your site with HTTPS is mandatory in modern web development. This configuration uses Let\'s Encrypt certificates and follows current best practices for TLS security, including strong cipher suites and HSTS.',
    h2_spa: 'SPA (React/Vue/Angular) Configuration',
    p_spa: 'Single Page Applications use client-side routing, which means all routes must fall back to <code>index.html</code>. This configuration handles that correctly while also serving static assets efficiently.',
    h2_load_balancing: 'Load Balancing',
    p_load_balancing: 'Distribute incoming traffic across multiple backend servers for high availability and better performance. Nginx supports several load-balancing algorithms out of the box.',
    h2_security_headers: 'Security Headers',
    p_security_headers: 'HTTP security headers protect your site from common attacks like clickjacking, XSS, and content injection. These headers should be added to every production Nginx configuration.',
    h2_gzip: 'Gzip Compression',
    p_gzip: 'Enabling Gzip compression can reduce the size of transferred responses by up to 90%, significantly improving page load times. This configuration compresses all text-based content types.',
    h2_rate_limiting: 'Rate Limiting',
    p_rate_limiting: 'Rate limiting protects your server from abuse, brute-force attacks, and DDoS. Nginx\'s <code>limit_req</code> module uses a leaky bucket algorithm to control request rates.',
    h2_directives: 'Common Directives Reference',
    p_directives: 'Here is a quick reference of the most commonly used Nginx directives and what they do.',
    dir_worker_processes: 'Number of worker processes (set to auto for CPU count)',
    dir_worker_connections: 'Max simultaneous connections per worker',
    dir_server_name: 'Domain name(s) this server block responds to',
    dir_listen: 'Port and protocol to listen on',
    dir_root: 'Root directory for serving files',
    dir_index: 'Default file to serve for directory requests',
    dir_location: 'Match request URI to apply specific configuration',
    dir_proxy_pass: 'Forward requests to a backend server',
    dir_try_files: 'Try serving files in order, fallback to last option',
    dir_ssl_certificate: 'Path to the SSL certificate file',
    dir_ssl_certificate_key: 'Path to the SSL private key file',
    dir_add_header: 'Add a custom HTTP response header',
    dir_gzip: 'Enable or disable gzip compression',
    dir_expires: 'Set Cache-Control max-age for static assets',
    dir_upstream: 'Define a group of backend servers for load balancing',
    dir_limit_req_zone: 'Define a shared memory zone for rate limiting',
    dir_error_page: 'Define custom error pages for specific status codes',
    dir_access_log: 'Path and format for access log files',
    dir_error_log: 'Path and level for error log files',
    dir_client_max_body_size: 'Maximum allowed size of the client request body',
    dir_sendfile: 'Enable efficient file transfer using kernel sendfile',
    col_directive: 'Directive',
    col_description: 'Description',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between Nginx and Apache?',
    faq1_a: 'Nginx uses an event-driven, asynchronous architecture that handles many concurrent connections efficiently with low memory usage. Apache traditionally uses a process-per-connection or thread-per-connection model which consumes more memory under high load. Nginx excels at serving static content and as a reverse proxy, while Apache offers more built-in modules and .htaccess support. Many production setups use Nginx as a reverse proxy in front of Apache.',
    faq2_q: 'How do I test my Nginx configuration before reloading?',
    faq2_a: 'Always run "nginx -t" before reloading. This command parses the configuration files and checks for syntax errors without actually applying the changes. If the test passes, you can safely reload with "nginx -s reload" or "systemctl reload nginx". Never restart Nginx in production without testing first.',
    faq3_q: 'How do I set up Let\'s Encrypt SSL certificates with Nginx?',
    faq3_a: 'Install Certbot (the Let\'s Encrypt client) and run "certbot --nginx -d yourdomain.com -d www.yourdomain.com". Certbot will automatically obtain certificates and modify your Nginx configuration. It also sets up auto-renewal via a cron job or systemd timer. Certificates are stored in /etc/letsencrypt/live/yourdomain.com/.',
    faq4_q: 'What does "proxy_set_header X-Real-IP $remote_addr" do?',
    faq4_a: 'When Nginx acts as a reverse proxy, the backend application sees Nginx\'s IP as the client IP. The X-Real-IP header passes the original client IP address to the backend so your application can log the real visitor IP, apply rate limiting per user, and perform geolocation correctly.',
    faq5_q: 'How do I redirect HTTP to HTTPS in Nginx?',
    faq5_a: 'Create a separate server block listening on port 80 that returns a 301 redirect to the HTTPS version: "return 301 https://$server_name$request_uri;". This ensures all HTTP traffic is permanently redirected to the secure HTTPS version. The 301 status code tells browsers and search engines to update their links.',
    faq6_q: 'What is the try_files directive and why is it important for SPAs?',
    faq6_a: 'The try_files directive tells Nginx to check for the existence of files in order and serve the first one found. For SPAs (React, Vue, Angular), "try_files $uri $uri/ /index.html" first tries to serve the exact file requested, then looks for a directory, and finally falls back to index.html. This is essential because SPA routes like /about or /dashboard do not correspond to actual files on disk.',
    p_conclusion: 'These Nginx configurations cover the most common production scenarios. Always test your configuration with "nginx -t" before reloading, and monitor your access and error logs regularly to catch issues early.',
  },
  zh: {
    intro: 'Nginx 是全球最流行的 Web 服务器，支撑着超过 30% 的网站。无论你需要提供静态文件、设置反向代理、配置 SSL 还是在多个后端之间进行负载均衡，本<strong>全面的 Nginx 配置指南</strong>提供了可直接使用的生产级示例。每个配置块都包含详细的注释说明。',
    h2_basics: 'Nginx 基础',
    p_basics: 'Nginx（发音为 "engine-x"）是一个高性能的 HTTP 服务器、反向代理和负载均衡器。其事件驱动架构以极少的内存处理数千个并发连接。主配置文件通常位于 <code>/etc/nginx/nginx.conf</code>，站点配置位于 <code>/etc/nginx/conf.d/</code> 或 <code>/etc/nginx/sites-available/</code>。',
    h2_static: '静态站点配置',
    p_static: '最简单也最常见的用例：直接从磁盘提供 HTML、CSS、JavaScript 和图片文件。此配置包含缓存头以获得最佳性能。',
    h2_reverse_proxy: '反向代理配置',
    p_reverse_proxy: '反向代理位于客户端和后端应用（Node.js、Python、Go 等）之间，转发请求并返回响应。这是 Web 应用最常见的生产部署方式。',
    h2_ssl: 'SSL/TLS 配置',
    p_ssl: '使用 HTTPS 保护你的站点是现代 Web 开发的必备要求。此配置使用 Let\'s Encrypt 证书，遵循当前 TLS 安全最佳实践，包括强加密套件和 HSTS。',
    h2_spa: 'SPA（React/Vue/Angular）配置',
    p_spa: '单页应用使用客户端路由，这意味着所有路由必须回退到 <code>index.html</code>。此配置正确处理了这一点，同时也高效地提供静态资源。',
    h2_load_balancing: '负载均衡',
    p_load_balancing: '将传入流量分配到多个后端服务器，以实现高可用性和更好的性能。Nginx 开箱支持多种负载均衡算法。',
    h2_security_headers: '安全头',
    p_security_headers: 'HTTP 安全头保护你的站点免受点击劫持、XSS 和内容注入等常见攻击。这些头应添加到每个生产 Nginx 配置中。',
    h2_gzip: 'Gzip 压缩',
    p_gzip: '启用 Gzip 压缩可将传输响应的大小减少多达 90%，显著提升页面加载速度。此配置压缩所有文本类型的内容。',
    h2_rate_limiting: '速率限制',
    p_rate_limiting: '速率限制保护你的服务器免受滥用、暴力攻击和 DDoS。Nginx 的 <code>limit_req</code> 模块使用漏桶算法控制请求速率。',
    h2_directives: '常用指令参考',
    p_directives: '以下是最常用的 Nginx 指令及其说明的快速参考。',
    dir_worker_processes: '工作进程数（设置为 auto 则等于 CPU 核数）',
    dir_worker_connections: '每个工作进程的最大同时连接数',
    dir_server_name: '此 server 块响应的域名',
    dir_listen: '监听的端口和协议',
    dir_root: '文件服务的根目录',
    dir_index: '目录请求的默认文件',
    dir_location: '匹配请求 URI 以应用特定配置',
    dir_proxy_pass: '将请求转发到后端服务器',
    dir_try_files: '按顺序尝试提供文件，最后回退到最后一个选项',
    dir_ssl_certificate: 'SSL 证书文件路径',
    dir_ssl_certificate_key: 'SSL 私钥文件路径',
    dir_add_header: '添加自定义 HTTP 响应头',
    dir_gzip: '启用或禁用 gzip 压缩',
    dir_expires: '设置静态资源的 Cache-Control max-age',
    dir_upstream: '定义一组后端服务器用于负载均衡',
    dir_limit_req_zone: '定义速率限制的共享内存区域',
    dir_error_page: '为特定状态码定义自定义错误页面',
    dir_access_log: '访问日志的路径和格式',
    dir_error_log: '错误日志的路径和级别',
    dir_client_max_body_size: '客户端请求体的最大允许大小',
    dir_sendfile: '启用使用内核 sendfile 的高效文件传输',
    col_directive: '指令',
    col_description: '说明',
    h2_faq: '常见问题',
    faq1_q: 'Nginx 和 Apache 有什么区别？',
    faq1_a: 'Nginx 使用事件驱动的异步架构，以较低的内存占用高效处理大量并发连接。Apache 传统上使用每连接一个进程或线程的模型，在高负载下消耗更多内存。Nginx 在提供静态内容和作为反向代理方面表现出色，而 Apache 提供更多内置模块和 .htaccess 支持。许多生产环境使用 Nginx 作为 Apache 前面的反向代理。',
    faq2_q: '如何在重载前测试 Nginx 配置？',
    faq2_a: '在重载前始终运行 "nginx -t"。此命令会解析配置文件并检查语法错误而不实际应用更改。如果测试通过，可以安全地使用 "nginx -s reload" 或 "systemctl reload nginx" 重载。在生产环境中切勿不测试就重启 Nginx。',
    faq3_q: '如何使用 Let\'s Encrypt 设置 SSL 证书？',
    faq3_a: '安装 Certbot 并运行 "certbot --nginx -d yourdomain.com"。Certbot 会自动获取证书并修改你的 Nginx 配置。它还会通过 cron 或 systemd 定时器设置自动续期。证书存储在 /etc/letsencrypt/live/yourdomain.com/。',
    faq4_q: '"proxy_set_header X-Real-IP $remote_addr" 有什么作用？',
    faq4_a: '当 Nginx 作为反向代理时，后端应用看到的是 Nginx 的 IP 而不是客户端 IP。X-Real-IP 头将原始客户端 IP 传递给后端，使你的应用能正确记录真实访客 IP、按用户限速和进行地理定位。',
    faq5_q: '如何在 Nginx 中将 HTTP 重定向到 HTTPS？',
    faq5_a: '创建一个监听 80 端口的单独 server 块，返回 301 重定向："return 301 https://$server_name$request_uri;"。这确保所有 HTTP 流量被永久重定向到安全的 HTTPS 版本。',
    faq6_q: 'try_files 指令是什么？为什么对 SPA 很重要？',
    faq6_a: 'try_files 指令告诉 Nginx 按顺序检查文件是否存在并提供第一个找到的文件。对于 SPA，"try_files $uri $uri/ /index.html" 首先尝试提供请求的确切文件，然后查找目录，最后回退到 index.html。这很重要因为 SPA 的路由如 /about 或 /dashboard 并不对应磁盘上的实际文件。',
    p_conclusion: '这些 Nginx 配置涵盖了最常见的生产场景。重载前始终使用 "nginx -t" 测试配置，并定期监控访问日志和错误日志以尽早发现问题。',
  },
  ja: {
    intro: 'Nginxは世界で最も人気のあるWebサーバーで、全Webサイトの30%以上で使用されています。静的ファイルの配信、リバースプロキシの設定、SSLの構成、複数バックエンドへの負荷分散など、この<strong>包括的なNginx設定ガイド</strong>はすぐにコピーして使える本番向け設定例を提供します。',
    h2_basics: 'Nginx の基本',
    p_basics: 'Nginx（「エンジンエックス」と発音）は高性能なHTTPサーバー、リバースプロキシ、ロードバランサーです。イベント駆動アーキテクチャにより少ないメモリで数千の同時接続を処理します。メイン設定ファイルは通常 <code>/etc/nginx/nginx.conf</code> にあります。',
    h2_static: '静的サイト設定',
    p_static: '最もシンプルで一般的な用途：ディスクからHTML、CSS、JavaScript、画像ファイルを直接配信します。',
    h2_reverse_proxy: 'リバースプロキシ設定',
    p_reverse_proxy: 'リバースプロキシはクライアントとバックエンドアプリケーション（Node.js、Python、Goなど）の間に位置し、リクエストを転送してレスポンスを返します。',
    h2_ssl: 'SSL/TLS 設定',
    p_ssl: 'HTTPSでサイトを保護することは現代のWeb開発では必須です。この設定はLet\'s Encrypt証明書を使用し、強力な暗号スイートとHSTSを含むTLSセキュリティのベストプラクティスに従います。',
    h2_spa: 'SPA（React/Vue/Angular）設定',
    p_spa: 'シングルページアプリケーションはクライアントサイドルーティングを使用するため、すべてのルートは <code>index.html</code> にフォールバックする必要があります。',
    h2_load_balancing: 'ロードバランシング',
    p_load_balancing: '高可用性とパフォーマンス向上のため、受信トラフィックを複数のバックエンドサーバーに分散します。',
    h2_security_headers: 'セキュリティヘッダー',
    p_security_headers: 'HTTPセキュリティヘッダーはクリックジャッキング、XSS、コンテンツインジェクションなどの一般的な攻撃からサイトを保護します。',
    h2_gzip: 'Gzip 圧縮',
    p_gzip: 'Gzip圧縮を有効にすると、転送レスポンスのサイズを最大90%削減でき、ページ読み込み時間を大幅に改善します。',
    h2_rate_limiting: 'レート制限',
    p_rate_limiting: 'レート制限は不正使用、ブルートフォース攻撃、DDoSからサーバーを保護します。Nginxの <code>limit_req</code> モジュールはリーキーバケットアルゴリズムを使用します。',
    h2_directives: '主要ディレクティブ一覧',
    p_directives: '最もよく使われるNginxディレクティブとその説明のクイックリファレンスです。',
    dir_worker_processes: 'ワーカープロセス数（autoでCPU数に設定）',
    dir_worker_connections: 'ワーカーあたりの最大同時接続数',
    dir_server_name: 'このサーバーブロックが応答するドメイン名',
    dir_listen: 'リッスンするポートとプロトコル',
    dir_root: 'ファイル配信のルートディレクトリ',
    dir_index: 'ディレクトリリクエストのデフォルトファイル',
    dir_location: 'リクエストURIにマッチして特定の設定を適用',
    dir_proxy_pass: 'バックエンドサーバーにリクエストを転送',
    dir_try_files: '順番にファイルを探し、最後のオプションにフォールバック',
    dir_ssl_certificate: 'SSL証明書ファイルのパス',
    dir_ssl_certificate_key: 'SSL秘密鍵ファイルのパス',
    dir_add_header: 'カスタムHTTPレスポンスヘッダーを追加',
    dir_gzip: 'gzip圧縮の有効/無効',
    dir_expires: '静的アセットのCache-Control max-ageを設定',
    dir_upstream: 'ロードバランシング用のバックエンドサーバーグループを定義',
    dir_limit_req_zone: 'レート制限の共有メモリゾーンを定義',
    dir_error_page: '特定のステータスコードのカスタムエラーページを定義',
    dir_access_log: 'アクセスログのパスとフォーマット',
    dir_error_log: 'エラーログのパスとレベル',
    dir_client_max_body_size: 'クライアントリクエストボディの最大許容サイズ',
    dir_sendfile: 'カーネルsendfileによる効率的なファイル転送を有効化',
    col_directive: 'ディレクティブ',
    col_description: '説明',
    h2_faq: 'よくある質問',
    faq1_q: 'NginxとApacheの違いは？',
    faq1_a: 'Nginxはイベント駆動の非同期アーキテクチャで、少ないメモリで多数の同時接続を効率的に処理します。Apacheは接続ごとにプロセスまたはスレッドを使用するモデルで、高負荷時により多くのメモリを消費します。多くの本番環境ではNginxをApacheの前にリバースプロキシとして配置します。',
    faq2_q: 'リロード前にNginx設定をテストするには？',
    faq2_a: 'リロード前に必ず "nginx -t" を実行してください。このコマンドは設定ファイルを解析し構文エラーをチェックします。テストに通れば "nginx -s reload" で安全にリロードできます。',
    faq3_q: 'Let\'s EncryptでSSL証明書を設定するには？',
    faq3_a: 'Certbotをインストールし "certbot --nginx -d yourdomain.com" を実行します。Certbotが自動的に証明書を取得しNginx設定を変更します。自動更新も設定されます。',
    faq4_q: '"proxy_set_header X-Real-IP $remote_addr" の役割は？',
    faq4_a: 'Nginxがリバースプロキシとして動作する場合、バックエンドアプリはNginxのIPをクライアントIPとして認識します。このヘッダーで元のクライアントIPをバックエンドに渡します。',
    faq5_q: 'NginxでHTTPからHTTPSにリダイレクトするには？',
    faq5_a: 'ポート80でリッスンする別のserverブロックを作成し "return 301 https://$server_name$request_uri;" を設定します。すべてのHTTPトラフィックがHTTPSに永久リダイレクトされます。',
    faq6_q: 'try_filesディレクティブとは？SPAに重要な理由は？',
    faq6_a: 'try_filesはNginxにファイルの存在を順番にチェックさせます。SPAの場合 "try_files $uri $uri/ /index.html" でファイルが見つからなければindex.htmlにフォールバックします。SPAのルート（/aboutなど）はディスク上のファイルに対応しないため重要です。',
    p_conclusion: 'これらのNginx設定は最も一般的な本番シナリオをカバーしています。リロード前に必ず "nginx -t" でテストし、アクセスログとエラーログを定期的に監視してください。',
  },
  ko: {
    intro: 'Nginx는 전 세계에서 가장 인기 있는 웹 서버로, 전체 웹사이트의 30% 이상에서 사용됩니다. 정적 파일 제공, 리버스 프록시 설정, SSL 구성, 로드 밸런싱 등 이 <strong>포괄적인 Nginx 설정 가이드</strong>는 바로 복사하여 사용할 수 있는 프로덕션 레벨의 예제를 제공합니다.',
    h2_basics: 'Nginx 기본 사항',
    p_basics: 'Nginx("엔진 엑스"로 발음)는 고성능 HTTP 서버, 리버스 프록시, 로드 밸런서입니다. 이벤트 기반 아키텍처로 적은 메모리로 수천 개의 동시 연결을 처리합니다. 주 설정 파일은 보통 <code>/etc/nginx/nginx.conf</code>에 있습니다.',
    h2_static: '정적 사이트 설정',
    p_static: '가장 간단하고 일반적인 사용 사례: 디스크에서 HTML, CSS, JavaScript, 이미지 파일을 직접 제공합니다.',
    h2_reverse_proxy: '리버스 프록시 설정',
    p_reverse_proxy: '리버스 프록시는 클라이언트와 백엔드 애플리케이션(Node.js, Python, Go 등) 사이에 위치하여 요청을 전달하고 응답을 반환합니다.',
    h2_ssl: 'SSL/TLS 설정',
    p_ssl: 'HTTPS로 사이트를 보호하는 것은 현대 웹 개발에서 필수입니다. 이 설정은 Let\'s Encrypt 인증서를 사용하고 강력한 암호 제품군과 HSTS를 포함합니다.',
    h2_spa: 'SPA (React/Vue/Angular) 설정',
    p_spa: '싱글 페이지 애플리케이션은 클라이언트 사이드 라우팅을 사용하므로 모든 경로가 <code>index.html</code>로 폴백되어야 합니다.',
    h2_load_balancing: '로드 밸런싱',
    p_load_balancing: '고가용성과 향상된 성능을 위해 들어오는 트래픽을 여러 백엔드 서버에 분산합니다.',
    h2_security_headers: '보안 헤더',
    p_security_headers: 'HTTP 보안 헤더는 클릭재킹, XSS, 콘텐츠 인젝션과 같은 일반적인 공격으로부터 사이트를 보호합니다.',
    h2_gzip: 'Gzip 압축',
    p_gzip: 'Gzip 압축을 활성화하면 전송 응답 크기를 최대 90%까지 줄여 페이지 로드 시간을 크게 개선할 수 있습니다.',
    h2_rate_limiting: '속도 제한',
    p_rate_limiting: '속도 제한은 남용, 브루트포스 공격, DDoS로부터 서버를 보호합니다. Nginx의 <code>limit_req</code> 모듈은 리키 버킷 알고리즘을 사용합니다.',
    h2_directives: '주요 디렉티브 참조',
    p_directives: '가장 자주 사용되는 Nginx 디렉티브와 설명의 빠른 참조입니다.',
    dir_worker_processes: '워커 프로세스 수 (auto로 CPU 수에 맞춤)',
    dir_worker_connections: '워커당 최대 동시 연결 수',
    dir_server_name: '이 서버 블록이 응답하는 도메인 이름',
    dir_listen: '리슨할 포트와 프로토콜',
    dir_root: '파일 제공의 루트 디렉토리',
    dir_index: '디렉토리 요청의 기본 파일',
    dir_location: '요청 URI에 매칭하여 특정 설정 적용',
    dir_proxy_pass: '백엔드 서버로 요청 전달',
    dir_try_files: '순서대로 파일을 찾고, 마지막 옵션으로 폴백',
    dir_ssl_certificate: 'SSL 인증서 파일 경로',
    dir_ssl_certificate_key: 'SSL 개인 키 파일 경로',
    dir_add_header: '커스텀 HTTP 응답 헤더 추가',
    dir_gzip: 'gzip 압축 활성화/비활성화',
    dir_expires: '정적 자산의 Cache-Control max-age 설정',
    dir_upstream: '로드 밸런싱을 위한 백엔드 서버 그룹 정의',
    dir_limit_req_zone: '속도 제한용 공유 메모리 영역 정의',
    dir_error_page: '특정 상태 코드의 커스텀 에러 페이지 정의',
    dir_access_log: '액세스 로그의 경로와 형식',
    dir_error_log: '에러 로그의 경로와 레벨',
    dir_client_max_body_size: '클라이언트 요청 본문의 최대 허용 크기',
    dir_sendfile: '커널 sendfile을 사용한 효율적인 파일 전송 활성화',
    col_directive: '디렉티브',
    col_description: '설명',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'Nginx와 Apache의 차이점은?',
    faq1_a: 'Nginx는 이벤트 기반 비동기 아키텍처로 적은 메모리로 많은 동시 연결을 효율적으로 처리합니다. Apache는 연결당 프로세스/스레드 모델로 높은 부하에서 더 많은 메모리를 사용합니다. 많은 프로덕션 환경에서 Nginx를 Apache 앞에 리버스 프록시로 배치합니다.',
    faq2_q: '리로드 전에 Nginx 설정을 테스트하려면?',
    faq2_a: '리로드 전에 항상 "nginx -t"를 실행하세요. 이 명령은 설정 파일의 구문 오류를 검사합니다. 테스트를 통과하면 "nginx -s reload"로 안전하게 리로드할 수 있습니다.',
    faq3_q: 'Let\'s Encrypt로 SSL 인증서를 설정하려면?',
    faq3_a: 'Certbot을 설치하고 "certbot --nginx -d yourdomain.com"을 실행합니다. Certbot이 자동으로 인증서를 획득하고 Nginx 설정을 수정합니다. 자동 갱신도 설정됩니다.',
    faq4_q: '"proxy_set_header X-Real-IP $remote_addr"의 역할은?',
    faq4_a: 'Nginx가 리버스 프록시로 작동할 때 백엔드 앱은 Nginx의 IP를 클라이언트 IP로 인식합니다. 이 헤더로 원래 클라이언트 IP를 백엔드에 전달합니다.',
    faq5_q: 'Nginx에서 HTTP를 HTTPS로 리다이렉트하려면?',
    faq5_a: '포트 80에서 리슨하는 별도의 서버 블록을 만들고 "return 301 https://$server_name$request_uri;"를 설정합니다. 모든 HTTP 트래픽이 HTTPS로 영구 리다이렉트됩니다.',
    faq6_q: 'try_files 디렉티브란? SPA에 왜 중요한가?',
    faq6_a: 'try_files는 Nginx에게 파일 존재를 순서대로 확인하게 합니다. SPA의 경우 "try_files $uri $uri/ /index.html"로 파일이 없으면 index.html로 폴백합니다. SPA의 경로(/about 등)는 디스크의 실제 파일에 대응하지 않기 때문에 중요합니다.',
    p_conclusion: '이 Nginx 설정들은 가장 일반적인 프로덕션 시나리오를 다룹니다. 리로드 전에 항상 "nginx -t"로 테스트하고, 액세스 로그와 에러 로그를 정기적으로 모니터링하세요.',
  },
  fr: {
    intro: 'Nginx est le serveur web le plus populaire au monde, alimentant plus de 30% de tous les sites web. Que vous ayez besoin de servir des fichiers statiques, configurer un reverse proxy, SSL ou un load balancer, ce <strong>guide complet de configuration Nginx</strong> fournit des exemples prêts pour la production que vous pouvez copier et adapter immédiatement.',
    h2_basics: 'Les bases de Nginx',
    p_basics: 'Nginx (prononcé "engine-x") est un serveur HTTP haute performance, reverse proxy et load balancer. Son architecture événementielle gère des milliers de connexions simultanées avec un minimum de mémoire. Le fichier de configuration principal se trouve généralement dans <code>/etc/nginx/nginx.conf</code>.',
    h2_static: 'Configuration de site statique',
    p_static: 'Le cas d\'utilisation le plus simple : servir des fichiers HTML, CSS, JavaScript et images directement depuis le disque.',
    h2_reverse_proxy: 'Configuration du reverse proxy',
    p_reverse_proxy: 'Un reverse proxy se place entre les clients et votre application backend (Node.js, Python, Go, etc.), transmettant les requêtes et retournant les réponses.',
    h2_ssl: 'Configuration SSL/TLS',
    p_ssl: 'Sécuriser votre site avec HTTPS est obligatoire dans le développement web moderne. Cette configuration utilise les certificats Let\'s Encrypt et suit les meilleures pratiques TLS actuelles.',
    h2_spa: 'Configuration SPA (React/Vue/Angular)',
    p_spa: 'Les applications monopage utilisent le routage côté client, ce qui signifie que toutes les routes doivent revenir à <code>index.html</code>.',
    h2_load_balancing: 'Équilibrage de charge',
    p_load_balancing: 'Distribuez le trafic entrant sur plusieurs serveurs backend pour une haute disponibilité et de meilleures performances.',
    h2_security_headers: 'En-têtes de sécurité',
    p_security_headers: 'Les en-têtes de sécurité HTTP protègent votre site contre les attaques courantes comme le clickjacking, XSS et l\'injection de contenu.',
    h2_gzip: 'Compression Gzip',
    p_gzip: 'L\'activation de la compression Gzip peut réduire la taille des réponses jusqu\'à 90%, améliorant significativement les temps de chargement.',
    h2_rate_limiting: 'Limitation de débit',
    p_rate_limiting: 'La limitation de débit protège votre serveur contre les abus, les attaques par force brute et les DDoS. Le module <code>limit_req</code> de Nginx utilise un algorithme de seau percé.',
    h2_directives: 'Référence des directives courantes',
    p_directives: 'Voici une référence rapide des directives Nginx les plus couramment utilisées.',
    dir_worker_processes: 'Nombre de processus worker (auto pour le nombre de CPU)',
    dir_worker_connections: 'Connexions simultanées max par worker',
    dir_server_name: 'Nom(s) de domaine auxquels ce bloc serveur répond',
    dir_listen: 'Port et protocole d\'écoute',
    dir_root: 'Répertoire racine pour servir les fichiers',
    dir_index: 'Fichier par défaut pour les requêtes de répertoire',
    dir_location: 'Correspondance d\'URI pour appliquer une configuration spécifique',
    dir_proxy_pass: 'Transmettre les requêtes à un serveur backend',
    dir_try_files: 'Essayer les fichiers dans l\'ordre, revenir à la dernière option',
    dir_ssl_certificate: 'Chemin du fichier de certificat SSL',
    dir_ssl_certificate_key: 'Chemin du fichier de clé privée SSL',
    dir_add_header: 'Ajouter un en-tête de réponse HTTP personnalisé',
    dir_gzip: 'Activer ou désactiver la compression gzip',
    dir_expires: 'Définir Cache-Control max-age pour les assets statiques',
    dir_upstream: 'Définir un groupe de serveurs backend pour le load balancing',
    dir_limit_req_zone: 'Définir une zone mémoire partagée pour la limitation de débit',
    dir_error_page: 'Définir des pages d\'erreur personnalisées',
    dir_access_log: 'Chemin et format des fichiers de log d\'accès',
    dir_error_log: 'Chemin et niveau des fichiers de log d\'erreur',
    dir_client_max_body_size: 'Taille maximale autorisée du corps de la requête client',
    dir_sendfile: 'Activer le transfert de fichiers efficace via sendfile',
    col_directive: 'Directive',
    col_description: 'Description',
    h2_faq: 'Questions fréquentes',
    faq1_q: 'Quelle est la différence entre Nginx et Apache ?',
    faq1_a: 'Nginx utilise une architecture événementielle asynchrone qui gère efficacement de nombreuses connexions simultanées avec peu de mémoire. Apache utilise traditionnellement un modèle processus/thread par connexion. Beaucoup d\'environnements de production placent Nginx en reverse proxy devant Apache.',
    faq2_q: 'Comment tester la configuration Nginx avant de recharger ?',
    faq2_a: 'Exécutez toujours "nginx -t" avant de recharger. Cette commande vérifie les erreurs de syntaxe. Si le test réussit, rechargez avec "nginx -s reload".',
    faq3_q: 'Comment configurer les certificats SSL Let\'s Encrypt ?',
    faq3_a: 'Installez Certbot et exécutez "certbot --nginx -d votredomaine.com". Certbot obtient automatiquement les certificats et modifie votre configuration Nginx.',
    faq4_q: 'Que fait "proxy_set_header X-Real-IP $remote_addr" ?',
    faq4_a: 'Quand Nginx est reverse proxy, l\'application backend voit l\'IP de Nginx. Cet en-tête transmet l\'IP réelle du client au backend.',
    faq5_q: 'Comment rediriger HTTP vers HTTPS ?',
    faq5_a: 'Créez un bloc serveur écoutant sur le port 80 avec "return 301 https://$server_name$request_uri;" pour rediriger tout le trafic HTTP vers HTTPS.',
    faq6_q: 'Qu\'est-ce que try_files et pourquoi est-ce important pour les SPA ?',
    faq6_a: 'try_files vérifie l\'existence des fichiers dans l\'ordre. Pour les SPA, "try_files $uri $uri/ /index.html" sert index.html quand aucun fichier ne correspond, car les routes SPA ne correspondent pas à des fichiers réels.',
    p_conclusion: 'Ces configurations Nginx couvrent les scénarios de production les plus courants. Testez toujours avec "nginx -t" et surveillez vos logs régulièrement.',
  },
  de: {
    intro: 'Nginx ist der weltweit beliebteste Webserver und betreibt über 30% aller Websites. Ob statische Dateien, Reverse Proxy, SSL oder Load Balancing - dieser <strong>umfassende Nginx-Konfigurationsleitfaden</strong> bietet produktionsreife Beispiele zum sofortigen Kopieren und Anpassen.',
    h2_basics: 'Nginx Grundlagen',
    p_basics: 'Nginx (ausgesprochen "Engine-X") ist ein Hochleistungs-HTTP-Server, Reverse Proxy und Load Balancer. Die ereignisgesteuerte Architektur verarbeitet Tausende gleichzeitige Verbindungen mit minimalem Speicher. Die Hauptkonfiguration befindet sich unter <code>/etc/nginx/nginx.conf</code>.',
    h2_static: 'Statische Website-Konfiguration',
    p_static: 'Der einfachste Anwendungsfall: HTML-, CSS-, JavaScript- und Bilddateien direkt von der Festplatte bereitstellen.',
    h2_reverse_proxy: 'Reverse-Proxy-Konfiguration',
    p_reverse_proxy: 'Ein Reverse Proxy steht zwischen Clients und Ihrer Backend-Anwendung (Node.js, Python, Go usw.) und leitet Anfragen weiter.',
    h2_ssl: 'SSL/TLS-Konfiguration',
    p_ssl: 'HTTPS ist in der modernen Webentwicklung Pflicht. Diese Konfiguration verwendet Let\'s Encrypt-Zertifikate und folgt aktuellen TLS-Best-Practices.',
    h2_spa: 'SPA-Konfiguration (React/Vue/Angular)',
    p_spa: 'Single Page Applications verwenden clientseitiges Routing, daher müssen alle Routen auf <code>index.html</code> zurückfallen.',
    h2_load_balancing: 'Lastverteilung',
    p_load_balancing: 'Verteilen Sie eingehenden Traffic auf mehrere Backend-Server für hohe Verfügbarkeit und bessere Performance.',
    h2_security_headers: 'Sicherheitsheader',
    p_security_headers: 'HTTP-Sicherheitsheader schützen Ihre Website vor Clickjacking, XSS und Content-Injection.',
    h2_gzip: 'Gzip-Komprimierung',
    p_gzip: 'Gzip-Komprimierung kann die Größe übertragener Antworten um bis zu 90% reduzieren.',
    h2_rate_limiting: 'Rate Limiting',
    p_rate_limiting: 'Rate Limiting schützt Ihren Server vor Missbrauch, Brute-Force-Angriffen und DDoS. Nginx\'s <code>limit_req</code>-Modul nutzt den Leaky-Bucket-Algorithmus.',
    h2_directives: 'Häufige Direktiven-Referenz',
    p_directives: 'Schnellreferenz der am häufigsten verwendeten Nginx-Direktiven.',
    dir_worker_processes: 'Anzahl der Worker-Prozesse (auto für CPU-Anzahl)',
    dir_worker_connections: 'Max. gleichzeitige Verbindungen pro Worker',
    dir_server_name: 'Domainname(n) für diesen Server-Block',
    dir_listen: 'Port und Protokoll zum Abhören',
    dir_root: 'Wurzelverzeichnis für Dateiauslieferung',
    dir_index: 'Standarddatei für Verzeichnisanfragen',
    dir_location: 'Request-URI abgleichen für spezifische Konfiguration',
    dir_proxy_pass: 'Anfragen an Backend-Server weiterleiten',
    dir_try_files: 'Dateien der Reihe nach versuchen, auf letzte Option zurückfallen',
    dir_ssl_certificate: 'Pfad zur SSL-Zertifikatsdatei',
    dir_ssl_certificate_key: 'Pfad zur SSL-Schlüsseldatei',
    dir_add_header: 'Benutzerdefinierten HTTP-Antwort-Header hinzufügen',
    dir_gzip: 'Gzip-Komprimierung aktivieren/deaktivieren',
    dir_expires: 'Cache-Control max-age für statische Assets setzen',
    dir_upstream: 'Backend-Server-Gruppe für Load Balancing definieren',
    dir_limit_req_zone: 'Shared-Memory-Zone für Rate Limiting definieren',
    dir_error_page: 'Benutzerdefinierte Fehlerseiten definieren',
    dir_access_log: 'Pfad und Format der Zugriffsprotokolle',
    dir_error_log: 'Pfad und Level der Fehlerprotokolle',
    dir_client_max_body_size: 'Maximale Größe des Client-Anfragekörpers',
    dir_sendfile: 'Effiziente Dateiübertragung via Kernel-sendfile aktivieren',
    col_directive: 'Direktive',
    col_description: 'Beschreibung',
    h2_faq: 'Häufig gestellte Fragen',
    faq1_q: 'Was ist der Unterschied zwischen Nginx und Apache?',
    faq1_a: 'Nginx nutzt eine ereignisgesteuerte, asynchrone Architektur für effiziente Verarbeitung vieler gleichzeitiger Verbindungen. Apache verwendet ein Prozess-/Thread-pro-Verbindung-Modell. Viele Produktionsumgebungen setzen Nginx als Reverse Proxy vor Apache ein.',
    faq2_q: 'Wie teste ich die Nginx-Konfiguration vor dem Neuladen?',
    faq2_a: 'Führen Sie immer "nginx -t" vor dem Neuladen aus. Dieser Befehl prüft auf Syntaxfehler. Bei Erfolg laden Sie mit "nginx -s reload" neu.',
    faq3_q: 'Wie richte ich Let\'s Encrypt SSL-Zertifikate ein?',
    faq3_a: 'Installieren Sie Certbot und führen Sie "certbot --nginx -d ihredomain.com" aus. Certbot erhält automatisch Zertifikate und ändert Ihre Nginx-Konfiguration.',
    faq4_q: 'Was macht "proxy_set_header X-Real-IP $remote_addr"?',
    faq4_a: 'Als Reverse Proxy sieht das Backend Nginx\'s IP als Client-IP. Dieser Header leitet die echte Client-IP an das Backend weiter.',
    faq5_q: 'Wie leite ich HTTP zu HTTPS um?',
    faq5_a: 'Erstellen Sie einen Server-Block auf Port 80 mit "return 301 https://$server_name$request_uri;" für eine permanente Umleitung.',
    faq6_q: 'Was ist try_files und warum ist es für SPAs wichtig?',
    faq6_a: 'try_files prüft Dateien der Reihe nach. Für SPAs stellt "try_files $uri $uri/ /index.html" sicher, dass bei nicht vorhandenen Dateien index.html ausgeliefert wird, da SPA-Routen keinen echten Dateien entsprechen.',
    p_conclusion: 'Diese Nginx-Konfigurationen decken die häufigsten Produktionsszenarien ab. Testen Sie immer mit "nginx -t" und überwachen Sie Ihre Logs regelmäßig.',
  },
  es: {
    intro: 'Nginx es el servidor web más popular del mundo, sirviendo más del 30% de todos los sitios web. Ya sea que necesites servir archivos estáticos, configurar un proxy inverso, SSL o balanceo de carga, esta <strong>guía completa de configuración de Nginx</strong> proporciona ejemplos listos para producción que puedes copiar y adaptar inmediatamente.',
    h2_basics: 'Fundamentos de Nginx',
    p_basics: 'Nginx (pronunciado "engine-x") es un servidor HTTP de alto rendimiento, proxy inverso y balanceador de carga. Su arquitectura basada en eventos maneja miles de conexiones simultáneas con mínimo uso de memoria. El archivo de configuración principal está en <code>/etc/nginx/nginx.conf</code>.',
    h2_static: 'Configuración de sitio estático',
    p_static: 'El caso de uso más simple: servir archivos HTML, CSS, JavaScript e imágenes directamente desde el disco.',
    h2_reverse_proxy: 'Configuración de proxy inverso',
    p_reverse_proxy: 'Un proxy inverso se sitúa entre los clientes y tu aplicación backend (Node.js, Python, Go, etc.), reenviando solicitudes y devolviendo respuestas.',
    h2_ssl: 'Configuración SSL/TLS',
    p_ssl: 'Asegurar tu sitio con HTTPS es obligatorio en el desarrollo web moderno. Esta configuración usa certificados Let\'s Encrypt y sigue las mejores prácticas actuales de TLS.',
    h2_spa: 'Configuración SPA (React/Vue/Angular)',
    p_spa: 'Las aplicaciones de página única usan enrutamiento del lado del cliente, lo que significa que todas las rutas deben redirigir a <code>index.html</code>.',
    h2_load_balancing: 'Balanceo de carga',
    p_load_balancing: 'Distribuye el tráfico entrante entre múltiples servidores backend para alta disponibilidad y mejor rendimiento.',
    h2_security_headers: 'Encabezados de seguridad',
    p_security_headers: 'Los encabezados de seguridad HTTP protegen tu sitio contra ataques comunes como clickjacking, XSS e inyección de contenido.',
    h2_gzip: 'Compresión Gzip',
    p_gzip: 'Habilitar la compresión Gzip puede reducir el tamaño de las respuestas hasta un 90%, mejorando significativamente los tiempos de carga.',
    h2_rate_limiting: 'Limitación de velocidad',
    p_rate_limiting: 'La limitación de velocidad protege tu servidor contra abuso, ataques de fuerza bruta y DDoS. El módulo <code>limit_req</code> de Nginx usa un algoritmo de cubo con fuga.',
    h2_directives: 'Referencia de directivas comunes',
    p_directives: 'Referencia rápida de las directivas de Nginx más utilizadas.',
    dir_worker_processes: 'Número de procesos worker (auto para cantidad de CPUs)',
    dir_worker_connections: 'Conexiones simultáneas máx. por worker',
    dir_server_name: 'Nombre(s) de dominio a los que responde este bloque server',
    dir_listen: 'Puerto y protocolo de escucha',
    dir_root: 'Directorio raíz para servir archivos',
    dir_index: 'Archivo por defecto para solicitudes de directorio',
    dir_location: 'Coincidir URI de solicitud para aplicar configuración específica',
    dir_proxy_pass: 'Reenviar solicitudes a un servidor backend',
    dir_try_files: 'Intentar archivos en orden, recurrir a la última opción',
    dir_ssl_certificate: 'Ruta al archivo de certificado SSL',
    dir_ssl_certificate_key: 'Ruta al archivo de clave privada SSL',
    dir_add_header: 'Agregar un encabezado de respuesta HTTP personalizado',
    dir_gzip: 'Activar o desactivar la compresión gzip',
    dir_expires: 'Establecer Cache-Control max-age para assets estáticos',
    dir_upstream: 'Definir un grupo de servidores backend para balanceo de carga',
    dir_limit_req_zone: 'Definir zona de memoria compartida para limitación de velocidad',
    dir_error_page: 'Definir páginas de error personalizadas',
    dir_access_log: 'Ruta y formato de archivos de log de acceso',
    dir_error_log: 'Ruta y nivel de archivos de log de errores',
    dir_client_max_body_size: 'Tamaño máximo permitido del cuerpo de la solicitud',
    dir_sendfile: 'Habilitar transferencia eficiente de archivos vía sendfile del kernel',
    col_directive: 'Directiva',
    col_description: 'Descripción',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: '¿Cuál es la diferencia entre Nginx y Apache?',
    faq1_a: 'Nginx usa una arquitectura asíncrona basada en eventos que maneja eficientemente muchas conexiones simultáneas con poco uso de memoria. Apache usa un modelo de proceso/hilo por conexión. Muchos entornos de producción colocan Nginx como proxy inverso delante de Apache.',
    faq2_q: '¿Cómo probar la configuración de Nginx antes de recargar?',
    faq2_a: 'Siempre ejecuta "nginx -t" antes de recargar. Este comando verifica errores de sintaxis. Si pasa, recarga con "nginx -s reload".',
    faq3_q: '¿Cómo configurar certificados SSL de Let\'s Encrypt?',
    faq3_a: 'Instala Certbot y ejecuta "certbot --nginx -d tudominio.com". Certbot obtiene automáticamente los certificados y modifica tu configuración de Nginx.',
    faq4_q: '¿Qué hace "proxy_set_header X-Real-IP $remote_addr"?',
    faq4_a: 'Cuando Nginx actúa como proxy inverso, el backend ve la IP de Nginx. Este encabezado pasa la IP real del cliente al backend.',
    faq5_q: '¿Cómo redirigir HTTP a HTTPS?',
    faq5_a: 'Crea un bloque server en el puerto 80 con "return 301 https://$server_name$request_uri;" para redirigir permanentemente todo el tráfico HTTP a HTTPS.',
    faq6_q: '¿Qué es try_files y por qué es importante para SPAs?',
    faq6_a: 'try_files verifica archivos en orden. Para SPAs, "try_files $uri $uri/ /index.html" sirve index.html cuando no existe el archivo solicitado, porque las rutas SPA no corresponden a archivos reales en disco.',
    p_conclusion: 'Estas configuraciones de Nginx cubren los escenarios de producción más comunes. Siempre prueba con "nginx -t" y monitorea tus logs regularmente.',
  },
};

/* ── shared styles ─────────────────────────────────────────────── */
const codeBlockStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
  borderRadius: 8,
  padding: '16px 20px',
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.6,
  fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", Consolas, monospace',
  color: 'var(--text-primary)',
  margin: '12px 0 24px',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '12px 0 24px',
  fontSize: 14,
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 14px',
  borderBottom: '2px solid var(--border-color)',
  color: 'var(--text-primary)',
  fontWeight: 600,
  background: 'var(--bg-input)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid var(--border-color)',
  color: 'var(--text-secondary)',
  verticalAlign: 'top',
};

const codeTdStyle: React.CSSProperties = {
  ...tdStyle,
  fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace',
  fontSize: 13,
  color: 'var(--accent-blue)',
};

const sectionStyle: React.CSSProperties = {
  margin: '32px 0',
};

/* ── component ──────────────────────────────────────────────── */
export default function NginxConfigExamples({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
      { '@type': 'Question', name: s.faq6_q, acceptedAnswer: { '@type': 'Answer', text: s.faq6_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Intro ──────────────────────────────────────────────── */}
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }} dangerouslySetInnerHTML={{ __html: s.intro }} />

      {/* ── 1. Nginx Basics ───────────────────────────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_basics}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.p_basics }} />

        <pre style={codeBlockStyle}><code>{`# Main configuration file structure
# /etc/nginx/nginx.conf

user nginx;
worker_processes auto;          # One worker per CPU core
error_log /var/log/nginx/error.log warn;
pid /run/nginx.pid;

events {
    worker_connections 1024;    # Max connections per worker
    multi_accept on;            # Accept multiple connections at once
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging format
    log_format main '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';

    access_log /var/log/nginx/access.log main;

    sendfile on;                # Efficient file transfer
    tcp_nopush on;              # Optimize TCP packets
    tcp_nodelay on;             # Disable Nagle's algorithm
    keepalive_timeout 65;       # Keep connections alive
    types_hash_max_size 2048;

    # Include site configurations
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}`}</code></pre>
      </div>

      {/* ── 2. Static Site ────────────────────────────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_static}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_static}</p>

        <pre style={codeBlockStyle}><code>{`# Static website configuration
# /etc/nginx/conf.d/static-site.conf

server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    # Document root
    root /var/www/example.com/html;
    index index.html index.htm;

    # Main location block
    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets aggressively
    location ~* \\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache HTML files with shorter duration
    location ~* \\.html$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    # Deny access to hidden files (.htaccess, .git, etc.)
    location ~ /\\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Custom error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }

    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log;
}`}</code></pre>
      </div>

      {/* ── 3. Reverse Proxy ──────────────────────────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_reverse_proxy}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_reverse_proxy}</p>

        <pre style={codeBlockStyle}><code>{`# Reverse proxy to Node.js/Python/Go application
# /etc/nginx/conf.d/app-proxy.conf

server {
    listen 80;
    server_name app.example.com;

    # Max upload size
    client_max_body_size 50M;

    # Proxy all requests to the backend application
    location / {
        proxy_pass http://127.0.0.1:3000;

        # Pass the real client IP to the backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support (for Socket.IO, etc.)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Buffering settings
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    # Serve static files directly (bypass the backend)
    location /static/ {
        alias /var/www/app/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Health check endpoint
    location /health {
        proxy_pass http://127.0.0.1:3000/health;
        access_log off;
    }

    access_log /var/log/nginx/app.access.log;
    error_log /var/log/nginx/app.error.log;
}`}</code></pre>
      </div>

      {/* ── 4. SSL/TLS ────────────────────────────────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_ssl}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_ssl}</p>

        <pre style={codeBlockStyle}><code>{`# SSL/TLS configuration with Let's Encrypt
# /etc/nginx/conf.d/ssl-site.conf

# Redirect all HTTP traffic to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    # Let's Encrypt ACME challenge
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # 301 permanent redirect to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server block
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com www.example.com;

    # Let's Encrypt certificate paths
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # SSL session settings
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # Modern TLS configuration (TLS 1.2 + 1.3 only)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # OCSP Stapling (faster certificate verification)
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    # HSTS (force HTTPS for 2 years, including subdomains)
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    root /var/www/example.com/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    access_log /var/log/nginx/example.com.ssl.access.log;
    error_log /var/log/nginx/example.com.ssl.error.log;
}`}</code></pre>
      </div>

      {/* ── 5. SPA ────────────────────────────────────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_spa}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.p_spa }} />

        <pre style={codeBlockStyle}><code>{`# SPA configuration (React, Vue, Angular, Next.js static export)
# /etc/nginx/conf.d/spa.conf

server {
    listen 80;
    server_name spa.example.com;

    root /var/www/spa/dist;
    index index.html;

    # The key directive for SPAs: fallback to index.html
    # This ensures client-side routing works correctly
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache JavaScript and CSS bundles (with hash in filename)
    location ~* \\.(js|css)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache images, fonts, and media
    location ~* \\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2|ttf|eot|mp4|webm)$ {
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }

    # Do NOT cache index.html (always serve the latest version)
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # API proxy (forward /api requests to the backend)
    location /api/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Deny access to source maps in production
    location ~* \\.map$ {
        deny all;
    }
}`}</code></pre>
      </div>

      {/* ── 6. Load Balancing ─────────────────────────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_load_balancing}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_load_balancing}</p>

        <pre style={codeBlockStyle}><code>{`# Load balancing across multiple backend servers
# /etc/nginx/conf.d/load-balancer.conf

# Define backend server group
upstream app_servers {
    # Round-robin (default) - requests distributed evenly
    server 10.0.0.1:3000;
    server 10.0.0.2:3000;
    server 10.0.0.3:3000;

    # Mark a server as backup (used only when others are down)
    server 10.0.0.4:3000 backup;

    # Health check: mark server down after 3 failed attempts
    # max_fails=3  fail_timeout=30s (default)
}

# Weighted load balancing (send more traffic to powerful servers)
upstream app_weighted {
    server 10.0.0.1:3000 weight=5;   # Gets 5x the traffic
    server 10.0.0.2:3000 weight=3;   # Gets 3x the traffic
    server 10.0.0.3:3000 weight=1;   # Gets 1x the traffic
}

# Least connections (send to the server with fewest active requests)
upstream app_least_conn {
    least_conn;
    server 10.0.0.1:3000;
    server 10.0.0.2:3000;
    server 10.0.0.3:3000;
}

# IP hash (same client always goes to same server - sticky sessions)
upstream app_ip_hash {
    ip_hash;
    server 10.0.0.1:3000;
    server 10.0.0.2:3000;
    server 10.0.0.3:3000;
}

server {
    listen 80;
    server_name lb.example.com;

    location / {
        proxy_pass http://app_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # Connection keep-alive to backends
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }

    # Simple health check endpoint
    location /nginx-health {
        access_log off;
        return 200 "OK";
        add_header Content-Type text/plain;
    }
}`}</code></pre>
      </div>

      {/* ── 7. Security Headers ───────────────────────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_security_headers}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_security_headers}</p>

        <pre style={codeBlockStyle}><code>{`# Security headers configuration
# Add these inside your server {} block or create a snippet

# /etc/nginx/snippets/security-headers.conf
# Include with: include /etc/nginx/snippets/security-headers.conf;

# Prevent clickjacking: deny embedding in iframes
add_header X-Frame-Options "SAMEORIGIN" always;

# Prevent MIME-type sniffing
add_header X-Content-Type-Options "nosniff" always;

# Enable XSS protection (legacy browsers)
add_header X-XSS-Protection "1; mode=block" always;

# Control referrer information sent with requests
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Content Security Policy (customize based on your needs)
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.example.com; frame-ancestors 'self';" always;

# Permissions Policy (formerly Feature-Policy)
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;

# Prevent information leakage
add_header X-Permitted-Cross-Domain-Policies "none" always;

# HSTS (only add if you have SSL configured)
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

# Hide Nginx version number
server_tokens off;`}</code></pre>
      </div>

      {/* ── 8. Gzip Compression ───────────────────────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_gzip}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_gzip}</p>

        <pre style={codeBlockStyle}><code>{`# Gzip compression configuration
# Add inside the http {} block in nginx.conf

# Enable gzip compression
gzip on;

# Minimum file size to compress (skip tiny files)
gzip_min_length 256;

# Compression level (1-9, higher = more CPU, smaller files)
# Level 6 is a good balance between compression ratio and CPU usage
gzip_comp_level 6;

# Number and size of compression buffers
gzip_buffers 16 8k;

# Compress responses for HTTP/1.0 clients too
gzip_http_version 1.0;

# Compress all text-based content types
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/json
    application/javascript
    application/x-javascript
    application/xml
    application/xml+rss
    application/atom+xml
    application/vnd.ms-fontobject
    font/opentype
    font/ttf
    image/svg+xml
    image/x-icon;

# Add Vary: Accept-Encoding header (important for caching proxies)
gzip_vary on;

# Disable gzip for old IE browsers
gzip_disable "MSIE [1-6]\\.";

# Enable gzip for proxied requests too
gzip_proxied any;`}</code></pre>
      </div>

      {/* ── 9. Rate Limiting ──────────────────────────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_rate_limiting}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.p_rate_limiting }} />

        <pre style={codeBlockStyle}><code>{`# Rate limiting configuration
# Define zones in the http {} block, apply in server/location blocks

# ── Define rate limit zones (in http {} block) ──

# General rate limit: 10 requests/second per IP
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;

# Strict rate limit for login/auth: 5 requests/minute per IP
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;

# API rate limit: 30 requests/second per IP
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;

# Rate limit by server name (protect against virtual host abuse)
limit_req_zone $server_name zone=per_server:10m rate=100r/s;

# ── Apply rate limits (in server {} block) ──

server {
    listen 80;
    server_name api.example.com;

    # Custom error page for rate-limited requests
    error_page 429 = @rate_limited;
    location @rate_limited {
        default_type application/json;
        return 429 '{"error": "Too many requests. Please try again later."}';
    }

    # General pages: allow burst of 20, no delay for first 10
    location / {
        limit_req zone=general burst=20 nodelay;
        limit_req_status 429;
        proxy_pass http://127.0.0.1:3000;
    }

    # Login endpoint: strict rate limiting
    location /api/auth/login {
        limit_req zone=login burst=3 nodelay;
        limit_req_status 429;
        proxy_pass http://127.0.0.1:3000;
    }

    # API endpoints: higher limit with burst
    location /api/ {
        limit_req zone=api burst=50 nodelay;
        limit_req_status 429;
        proxy_pass http://127.0.0.1:3000;
    }

    # Whitelist certain IPs from rate limiting
    # geo $limit {
    #     default 1;
    #     10.0.0.0/8 0;       # Internal network
    #     192.168.0.0/16 0;   # Local network
    # }
    # map $limit $limit_key {
    #     0 "";
    #     1 $binary_remote_addr;
    # }
    # limit_req_zone $limit_key zone=custom:10m rate=10r/s;
}`}</code></pre>
      </div>

      {/* ── 10. Common Directives Reference Table ─────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_directives}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_directives}</p>

        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{s.col_directive}</th>
                <th style={thStyle}>{s.col_description}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={codeTdStyle}>worker_processes</td><td style={tdStyle}>{s.dir_worker_processes}</td></tr>
              <tr><td style={codeTdStyle}>worker_connections</td><td style={tdStyle}>{s.dir_worker_connections}</td></tr>
              <tr><td style={codeTdStyle}>server_name</td><td style={tdStyle}>{s.dir_server_name}</td></tr>
              <tr><td style={codeTdStyle}>listen</td><td style={tdStyle}>{s.dir_listen}</td></tr>
              <tr><td style={codeTdStyle}>root</td><td style={tdStyle}>{s.dir_root}</td></tr>
              <tr><td style={codeTdStyle}>index</td><td style={tdStyle}>{s.dir_index}</td></tr>
              <tr><td style={codeTdStyle}>location</td><td style={tdStyle}>{s.dir_location}</td></tr>
              <tr><td style={codeTdStyle}>proxy_pass</td><td style={tdStyle}>{s.dir_proxy_pass}</td></tr>
              <tr><td style={codeTdStyle}>try_files</td><td style={tdStyle}>{s.dir_try_files}</td></tr>
              <tr><td style={codeTdStyle}>ssl_certificate</td><td style={tdStyle}>{s.dir_ssl_certificate}</td></tr>
              <tr><td style={codeTdStyle}>ssl_certificate_key</td><td style={tdStyle}>{s.dir_ssl_certificate_key}</td></tr>
              <tr><td style={codeTdStyle}>add_header</td><td style={tdStyle}>{s.dir_add_header}</td></tr>
              <tr><td style={codeTdStyle}>gzip</td><td style={tdStyle}>{s.dir_gzip}</td></tr>
              <tr><td style={codeTdStyle}>expires</td><td style={tdStyle}>{s.dir_expires}</td></tr>
              <tr><td style={codeTdStyle}>upstream</td><td style={tdStyle}>{s.dir_upstream}</td></tr>
              <tr><td style={codeTdStyle}>limit_req_zone</td><td style={tdStyle}>{s.dir_limit_req_zone}</td></tr>
              <tr><td style={codeTdStyle}>error_page</td><td style={tdStyle}>{s.dir_error_page}</td></tr>
              <tr><td style={codeTdStyle}>access_log</td><td style={tdStyle}>{s.dir_access_log}</td></tr>
              <tr><td style={codeTdStyle}>error_log</td><td style={tdStyle}>{s.dir_error_log}</td></tr>
              <tr><td style={codeTdStyle}>client_max_body_size</td><td style={tdStyle}>{s.dir_client_max_body_size}</td></tr>
              <tr><td style={codeTdStyle}>sendfile</td><td style={tdStyle}>{s.dir_sendfile}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 11. FAQ ───────────────────────────────────────────── */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_faq}</h2>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq1_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq1_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq2_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq2_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq3_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq3_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq4_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq4_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq5_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq5_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq6_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq6_a}</p>
        </div>
      </div>

      {/* ── Conclusion ────────────────────────────────────────── */}
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 24 }}>{s.p_conclusion}</p>
    </>
  );
}
