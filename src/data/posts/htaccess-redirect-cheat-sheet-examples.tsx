'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'The <strong>.htaccess file</strong> is one of the most powerful configuration tools for Apache web servers. It lets you control redirects, enforce HTTPS, set security headers, manage caching, and much more -- all without touching the main server configuration. This <strong>comprehensive .htaccess redirect cheat sheet</strong> provides production-ready, copy-paste examples for every common scenario. Each snippet includes comments explaining exactly what it does.',
    h2_basic_redirects: 'Basic Redirects',
    p_basic_redirects: 'Redirects are the most common use of .htaccess files. Whether you are moving a single page, restructuring an entire directory, or migrating to a new domain, Apache\'s <code>Redirect</code> and <code>RewriteRule</code> directives make it straightforward. Always use 301 (permanent) redirects for SEO to transfer link equity to the new URL.',
    h3_single_url: 'Redirect a Single URL',
    h3_directory: 'Redirect an Entire Directory',
    h3_domain: 'Redirect Domain to Domain',
    h2_https: 'HTTPS Enforcement',
    p_https: 'Enforcing HTTPS is essential for security and SEO. Google uses HTTPS as a ranking signal, and modern browsers warn users about insecure HTTP connections. These rules use <code>mod_rewrite</code> to redirect all HTTP traffic to HTTPS, with options for handling the www prefix.',
    h3_http_to_https: 'HTTP to HTTPS (Without www)',
    h3_http_to_https_www: 'HTTP to HTTPS (With www)',
    h3_force_non_www: 'Force Non-www with HTTPS',
    h2_trailing_slash: 'Trailing Slash Handling',
    p_trailing_slash: 'Inconsistent trailing slashes create duplicate content issues that hurt SEO. Search engines treat <code>/about</code> and <code>/about/</code> as different URLs. Pick one style and enforce it consistently across your entire site using these rules.',
    h3_add_trailing: 'Add Trailing Slash',
    h3_remove_trailing: 'Remove Trailing Slash',
    h2_query_strings: 'Query String Handling',
    p_query_strings: 'Redirecting URLs with query strings requires special attention. By default, Apache appends the original query string to the redirect target. You can preserve, discard, or modify query parameters using the <code>QSA</code> (Query String Append) and <code>?</code> (discard) flags.',
    h3_redirect_with_params: 'Redirect Preserving Query String',
    h3_redirect_without_params: 'Redirect Discarding Query String',
    h3_redirect_modify_params: 'Redirect Modifying Query Parameters',
    h2_error_pages: 'Custom Error Pages',
    p_error_pages: 'Custom error pages improve user experience by providing helpful information instead of generic server errors. They also give you the opportunity to guide lost visitors back to useful content. The <code>ErrorDocument</code> directive lets you define custom pages for any HTTP status code.',
    h2_security_headers: 'Security Headers via .htaccess',
    p_security_headers: 'HTTP security headers protect your site from common attacks like clickjacking, cross-site scripting (XSS), and content injection. Adding these headers via .htaccess is the easiest approach when you do not have access to the main Apache configuration. They require <code>mod_headers</code> to be enabled.',
    h2_caching: 'Browser Caching Rules',
    p_caching: 'Browser caching dramatically improves page load times for returning visitors by telling browsers to store static assets locally. The <code>mod_expires</code> module sets <code>Cache-Control</code> and <code>Expires</code> headers automatically. Set long cache times for assets with fingerprinted filenames, and shorter times for HTML.',
    h2_compression: 'Gzip / Brotli Compression',
    p_compression: 'Compression reduces the size of transferred responses by 60-90%, significantly improving page load times. Apache supports both Gzip (via <code>mod_deflate</code>) and Brotli (via <code>mod_brotli</code>, Apache 2.4.26+). Gzip has universal support, while Brotli achieves better compression ratios for text-based content.',
    h3_gzip: 'Gzip Compression (mod_deflate)',
    h3_brotli: 'Brotli Compression (mod_brotli)',
    h2_common_mistakes: 'Common Mistakes and How to Fix Them',
    p_common_mistakes: 'Debugging .htaccess issues can be frustrating. Here are the most common mistakes developers make and how to avoid them. Understanding these pitfalls will save you hours of troubleshooting.',
    h3_infinite_loops: 'Infinite Redirect Loops',
    p_infinite_loops: 'The most common mistake is creating a redirect loop where the rewritten URL matches the same rule again. Always use <code>RewriteCond</code> to check the current state before applying a rule, and use the <code>[L]</code> flag to stop processing after a match.',
    h3_wrong_rewritebase: 'Wrong RewriteBase',
    p_wrong_rewritebase: '<code>RewriteBase</code> defines the base URL path for per-directory rewrites. If your .htaccess is in a subdirectory, the RewriteBase must match that path. Using the wrong value causes rules to generate incorrect URLs.',
    h3_rule_order: 'Rule Order Matters',
    p_rule_order: 'Apache processes .htaccess rules from top to bottom. If a more general rule appears before a specific one, it will match first and the specific rule will never execute. Always place specific rules before general ones, and use the <code>[L]</code> (Last) flag to prevent further processing.',
    col_mistake: 'Mistake',
    col_fix: 'Fix',
    mistake1: 'Missing RewriteEngine On',
    fix1: 'Always add "RewriteEngine On" at the top of your rewrite rules block',
    mistake2: 'Not escaping dots in patterns',
    fix2: 'Use \\. instead of . in regex patterns (dot matches any character)',
    mistake3: 'Forgetting the [L] flag',
    fix3: 'Add [L] to stop rule processing after a match and prevent cascading issues',
    mistake4: 'Using Redirect and RewriteRule together',
    fix4: 'Stick to one method; mixing them causes unpredictable behavior',
    mistake5: 'Not testing with browser cache cleared',
    fix5: '301 redirects are cached by browsers; use 302 during testing, switch to 301 in production',
    mistake6: 'Wrong file permissions on .htaccess',
    fix6: 'Set permissions to 644 (owner read/write, group/others read)',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is .htaccess and where should I place it?',
    faq1_a: '.htaccess (hypertext access) is a distributed configuration file for Apache web servers. Place it in the root directory of your website (usually public_html or www). It affects the directory it is in and all subdirectories. You can also place additional .htaccess files in subdirectories to override parent rules. The file must be named exactly ".htaccess" with the leading dot.',
    faq2_q: 'What is the difference between 301 and 302 redirects?',
    faq2_a: 'A 301 redirect is permanent -- it tells search engines to transfer all link equity (SEO value) to the new URL and to update their index. A 302 redirect is temporary -- search engines keep the original URL in their index. Use 301 for permanent moves (domain changes, restructured URLs) and 302 for temporary situations (A/B testing, maintenance pages). Browsers cache 301 redirects aggressively, so use 302 during testing.',
    faq3_q: 'Why are my .htaccess rules not working?',
    faq3_a: 'The most common reasons are: 1) mod_rewrite is not enabled -- run "a2enmod rewrite" and restart Apache; 2) AllowOverride is set to None in the Apache config -- change it to "AllowOverride All" for your directory; 3) The .htaccess file has incorrect permissions (should be 644); 4) Syntax errors -- check the Apache error log at /var/log/apache2/error.log; 5) Browser caching a previous 301 redirect -- clear your browser cache or test in incognito mode.',
    faq4_q: 'Does .htaccess work with Nginx?',
    faq4_a: 'No, .htaccess is specific to the Apache web server. Nginx does not support .htaccess files. If you are using Nginx, you must add equivalent directives directly to the Nginx server block configuration. There are online tools that can help convert common .htaccess rules to Nginx configuration syntax, but the conversion is not always one-to-one.',
    faq5_q: 'How do I redirect old URLs after a site redesign?',
    faq5_a: 'Create a mapping of old URLs to new URLs and add a Redirect or RewriteRule for each one. For large-scale changes, use RewriteMap with an external file. For pattern-based changes (like /blog/post-name to /articles/post-name), use RewriteRule with regex capture groups: RewriteRule ^blog/(.*)$ /articles/$1 [R=301,L]. Always test redirects with a tool like curl -I to verify the status code and destination.',
    faq6_q: 'How does .htaccess affect site performance?',
    faq6_a: 'Apache reads .htaccess files on every request, which adds a small performance overhead. For high-traffic sites, it is better to move rules to the main Apache configuration (httpd.conf or virtual host file) and set AllowOverride to None. However, for most websites the performance impact is negligible. The convenience of .htaccess (no server restart required, works on shared hosting) outweighs the minimal performance cost.',
    p_conclusion: 'This .htaccess cheat sheet covers the most essential redirect patterns, security configurations, and performance optimizations. Always test your changes thoroughly using curl or an online redirect checker before deploying to production, and keep a backup of your working .htaccess file.',
  },
  zh: {
    intro: '<strong>.htaccess 文件</strong>是 Apache Web 服务器最强大的配置工具之一。它可以控制重定向、强制 HTTPS、设置安全头、管理缓存等，无需修改主服务器配置。本<strong>全面的 .htaccess 重定向速查表</strong>提供了可直接复制粘贴的生产级示例，涵盖所有常见场景。每个代码片段都包含详细注释。',
    h2_basic_redirects: '基本重定向',
    p_basic_redirects: '重定向是 .htaccess 文件最常见的用途。无论是移动单个页面、重组整个目录还是迁移到新域名，Apache 的 <code>Redirect</code> 和 <code>RewriteRule</code> 指令都能轻松实现。始终使用 301（永久）重定向以便 SEO 权重传递到新 URL。',
    h3_single_url: '重定向单个 URL',
    h3_directory: '重定向整个目录',
    h3_domain: '域名到域名重定向',
    h2_https: 'HTTPS 强制跳转',
    p_https: '强制 HTTPS 对安全和 SEO 至关重要。Google 将 HTTPS 作为排名信号，现代浏览器会对不安全的 HTTP 连接发出警告。这些规则使用 <code>mod_rewrite</code> 将所有 HTTP 流量重定向到 HTTPS，并提供处理 www 前缀的选项。',
    h3_http_to_https: 'HTTP 到 HTTPS（不含 www）',
    h3_http_to_https_www: 'HTTP 到 HTTPS（含 www）',
    h3_force_non_www: '强制非 www 并使用 HTTPS',
    h2_trailing_slash: '尾部斜杠处理',
    p_trailing_slash: '不一致的尾部斜杠会造成重复内容问题，影响 SEO。搜索引擎将 <code>/about</code> 和 <code>/about/</code> 视为不同的 URL。选择一种风格并在整个站点中一致地执行。',
    h3_add_trailing: '添加尾部斜杠',
    h3_remove_trailing: '移除尾部斜杠',
    h2_query_strings: '查询字符串处理',
    p_query_strings: '重定向带查询字符串的 URL 需要特别注意。默认情况下，Apache 会将原始查询字符串追加到重定向目标。可以使用 <code>QSA</code>（查询字符串追加）和 <code>?</code>（丢弃）标志来保留、丢弃或修改查询参数。',
    h3_redirect_with_params: '重定向并保留查询字符串',
    h3_redirect_without_params: '重定向并丢弃查询字符串',
    h3_redirect_modify_params: '重定向并修改查询参数',
    h2_error_pages: '自定义错误页面',
    p_error_pages: '自定义错误页面通过提供有用信息来改善用户体验。<code>ErrorDocument</code> 指令允许为任何 HTTP 状态码定义自定义页面。',
    h2_security_headers: '通过 .htaccess 设置安全头',
    p_security_headers: 'HTTP 安全头保护您的网站免受点击劫持、跨站脚本（XSS）和内容注入等常见攻击。通过 .htaccess 添加这些头是最简单的方法，需要启用 <code>mod_headers</code>。',
    h2_caching: '浏览器缓存规则',
    p_caching: '浏览器缓存通过告诉浏览器在本地存储静态资源，显著提高回访者的页面加载速度。<code>mod_expires</code> 模块自动设置 <code>Cache-Control</code> 和 <code>Expires</code> 头。',
    h2_compression: 'Gzip / Brotli 压缩',
    p_compression: '压缩可将传输响应的大小减少 60-90%，显著提升页面加载速度。Apache 支持 Gzip（通过 <code>mod_deflate</code>）和 Brotli（通过 <code>mod_brotli</code>，需 Apache 2.4.26+）。',
    h3_gzip: 'Gzip 压缩（mod_deflate）',
    h3_brotli: 'Brotli 压缩（mod_brotli）',
    h2_common_mistakes: '常见错误及修复方法',
    p_common_mistakes: '调试 .htaccess 问题可能令人沮丧。以下是开发者最常犯的错误及其解决方法，了解这些陷阱能为您节省大量排查时间。',
    h3_infinite_loops: '无限重定向循环',
    p_infinite_loops: '最常见的错误是创建重定向循环，重写后的 URL 再次匹配同一规则。始终使用 <code>RewriteCond</code> 在应用规则前检查当前状态，并使用 <code>[L]</code> 标志在匹配后停止处理。',
    h3_wrong_rewritebase: '错误的 RewriteBase',
    p_wrong_rewritebase: '<code>RewriteBase</code> 定义目录级重写的基础 URL 路径。如果 .htaccess 位于子目录中，RewriteBase 必须匹配该路径。使用错误的值会导致规则生成不正确的 URL。',
    h3_rule_order: '规则顺序很重要',
    p_rule_order: 'Apache 从上到下处理 .htaccess 规则。如果通用规则出现在特定规则之前，它会先匹配，特定规则永远不会执行。始终将特定规则放在通用规则之前，并使用 <code>[L]</code> 标志防止进一步处理。',
    col_mistake: '错误',
    col_fix: '修复方法',
    mistake1: '缺少 RewriteEngine On',
    fix1: '始终在重写规则块顶部添加 "RewriteEngine On"',
    mistake2: '模式中未转义点号',
    fix2: '在正则模式中使用 \\. 而不是 .（点号匹配任意字符）',
    mistake3: '忘记 [L] 标志',
    fix3: '添加 [L] 在匹配后停止规则处理，防止级联问题',
    mistake4: '混用 Redirect 和 RewriteRule',
    fix4: '坚持使用一种方法；混用会导致不可预测的行为',
    mistake5: '未清除浏览器缓存测试',
    fix5: '301 重定向会被浏览器缓存；测试时使用 302，生产环境再改为 301',
    mistake6: '.htaccess 文件权限错误',
    fix6: '设置权限为 644（所有者读写，组/其他人只读）',
    h2_faq: '常见问题',
    faq1_q: '什么是 .htaccess？应该放在哪里？',
    faq1_a: '.htaccess（超文本访问）是 Apache Web 服务器的分布式配置文件。将其放在网站根目录（通常是 public_html 或 www）。它影响所在目录及所有子目录。您也可以在子目录中放置额外的 .htaccess 文件来覆盖父级规则。文件必须命名为 ".htaccess"，包含前导点号。',
    faq2_q: '301 和 302 重定向有什么区别？',
    faq2_a: '301 重定向是永久性的——它告诉搜索引擎将所有链接权重（SEO 价值）传递到新 URL 并更新索引。302 重定向是临时性的——搜索引擎保留原始 URL。永久移动（域名更改、URL 重组）使用 301，临时情况（A/B 测试、维护页面）使用 302。浏览器会积极缓存 301 重定向，因此测试时使用 302。',
    faq3_q: '为什么我的 .htaccess 规则不起作用？',
    faq3_a: '最常见的原因：1）mod_rewrite 未启用——运行 "a2enmod rewrite" 并重启 Apache；2）Apache 配置中 AllowOverride 设置为 None——改为 "AllowOverride All"；3）.htaccess 文件权限不正确（应为 644）；4）语法错误——检查 Apache 错误日志；5）浏览器缓存了之前的 301 重定向——清除缓存或使用隐身模式测试。',
    faq4_q: '.htaccess 能在 Nginx 上使用吗？',
    faq4_a: '不能，.htaccess 是 Apache Web 服务器特有的。Nginx 不支持 .htaccess 文件。如果使用 Nginx，需要将等效指令直接添加到 Nginx 服务器块配置中。有在线工具可以帮助将常见 .htaccess 规则转换为 Nginx 配置语法，但转换并非完全一一对应。',
    faq5_q: '网站改版后如何重定向旧 URL？',
    faq5_a: '创建旧 URL 到新 URL 的映射，为每个添加 Redirect 或 RewriteRule。对于大规模更改，使用 RewriteMap 和外部文件。对于基于模式的更改（如 /blog/post-name 到 /articles/post-name），使用带正则捕获组的 RewriteRule：RewriteRule ^blog/(.*)$ /articles/$1 [R=301,L]。始终使用 curl -I 测试重定向以验证状态码和目标。',
    faq6_q: '.htaccess 如何影响网站性能？',
    faq6_a: 'Apache 在每次请求时都会读取 .htaccess 文件，这增加了少量性能开销。对于高流量网站，最好将规则移至 Apache 主配置（httpd.conf 或虚拟主机文件），并将 AllowOverride 设为 None。但对于大多数网站，性能影响可以忽略不计。.htaccess 的便利性（无需重启服务器、适用于共享主机）远大于最小的性能成本。',
    p_conclusion: '本 .htaccess 速查表涵盖了最基本的重定向模式、安全配置和性能优化。始终使用 curl 或在线重定向检查器彻底测试更改，并在部署到生产环境之前备份可用的 .htaccess 文件。',
  },
  ja: {
    intro: '<strong>.htaccess ファイル</strong>は、Apache Web サーバーの最も強力な設定ツールの1つです。メインのサーバー設定を変更することなく、リダイレクト、HTTPS の強制、セキュリティヘッダーの設定、キャッシュの管理などを制御できます。この<strong>包括的な .htaccess リダイレクトチートシート</strong>は、あらゆる一般的なシナリオに対応した本番環境対応のコピペ可能なサンプルを提供します。',
    h2_basic_redirects: '基本リダイレクト',
    p_basic_redirects: 'リダイレクトは .htaccess ファイルの最も一般的な用途です。単一ページの移動、ディレクトリ全体の再構成、新しいドメインへの移行など、Apache の <code>Redirect</code> および <code>RewriteRule</code> ディレクティブで簡単に実現できます。SEO のリンク資産を新しい URL に移すために、常に 301（永久）リダイレクトを使用してください。',
    h3_single_url: '単一 URL のリダイレクト',
    h3_directory: 'ディレクトリ全体のリダイレクト',
    h3_domain: 'ドメイン間リダイレクト',
    h2_https: 'HTTPS の強制',
    p_https: 'HTTPS の強制はセキュリティと SEO に不可欠です。Google は HTTPS をランキングシグナルとして使用し、モダンブラウザは安全でない HTTP 接続について警告します。これらのルールは <code>mod_rewrite</code> を使用してすべての HTTP トラフィックを HTTPS にリダイレクトします。',
    h3_http_to_https: 'HTTP から HTTPS（www なし）',
    h3_http_to_https_www: 'HTTP から HTTPS（www あり）',
    h3_force_non_www: '非 www + HTTPS を強制',
    h2_trailing_slash: '末尾スラッシュの処理',
    p_trailing_slash: '末尾スラッシュの不一致は、SEO に悪影響を与える重複コンテンツの問題を引き起こします。検索エンジンは <code>/about</code> と <code>/about/</code> を異なる URL として扱います。1つのスタイルを選び、サイト全体で一貫して適用してください。',
    h3_add_trailing: '末尾スラッシュを追加',
    h3_remove_trailing: '末尾スラッシュを削除',
    h2_query_strings: 'クエリ文字列の処理',
    p_query_strings: 'クエリ文字列を含む URL のリダイレクトには特別な注意が必要です。デフォルトでは Apache は元のクエリ文字列をリダイレクト先に追加します。<code>QSA</code>（クエリ文字列追加）と <code>?</code>（破棄）フラグを使用して、クエリパラメータを保持、破棄、変更できます。',
    h3_redirect_with_params: 'クエリ文字列を保持してリダイレクト',
    h3_redirect_without_params: 'クエリ文字列を破棄してリダイレクト',
    h3_redirect_modify_params: 'クエリパラメータを変更してリダイレクト',
    h2_error_pages: 'カスタムエラーページ',
    p_error_pages: 'カスタムエラーページは、汎用的なサーバーエラーの代わりに有用な情報を提供することでユーザー体験を向上させます。<code>ErrorDocument</code> ディレクティブで任意の HTTP ステータスコードのカスタムページを定義できます。',
    h2_security_headers: '.htaccess によるセキュリティヘッダー',
    p_security_headers: 'HTTP セキュリティヘッダーは、クリックジャッキング、クロスサイトスクリプティング（XSS）、コンテンツインジェクションなどの一般的な攻撃からサイトを保護します。<code>mod_headers</code> の有効化が必要です。',
    h2_caching: 'ブラウザキャッシュルール',
    p_caching: 'ブラウザキャッシュは、静的アセットをローカルに保存するようブラウザに指示し、リピーターのページ読み込み時間を大幅に改善します。<code>mod_expires</code> モジュールが <code>Cache-Control</code> と <code>Expires</code> ヘッダーを自動設定します。',
    h2_compression: 'Gzip / Brotli 圧縮',
    p_compression: '圧縮により転送レスポンスのサイズを 60-90% 削減し、ページ読み込み時間を大幅に改善できます。Apache は Gzip（<code>mod_deflate</code>）と Brotli（<code>mod_brotli</code>、Apache 2.4.26+）の両方をサポートしています。',
    h3_gzip: 'Gzip 圧縮（mod_deflate）',
    h3_brotli: 'Brotli 圧縮（mod_brotli）',
    h2_common_mistakes: 'よくある間違いとその修正方法',
    p_common_mistakes: '.htaccess の問題のデバッグは困難な場合があります。開発者が最もよく犯す間違いとその回避方法をここに示します。',
    h3_infinite_loops: '無限リダイレクトループ',
    p_infinite_loops: '最も一般的な間違いは、書き換え後の URL が同じルールに再度マッチするリダイレクトループの作成です。ルール適用前に <code>RewriteCond</code> で現在の状態をチェックし、マッチ後に <code>[L]</code> フラグで処理を停止してください。',
    h3_wrong_rewritebase: '間違った RewriteBase',
    p_wrong_rewritebase: '<code>RewriteBase</code> はディレクトリ単位の書き換えの基本 URL パスを定義します。.htaccess がサブディレクトリにある場合、RewriteBase はそのパスと一致する必要があります。',
    h3_rule_order: 'ルールの順序が重要',
    p_rule_order: 'Apache は .htaccess ルールを上から下に処理します。一般的なルールが特定のルールの前にあると、最初にマッチし、特定のルールは実行されません。特定のルールを一般的なルールの前に配置し、<code>[L]</code> フラグを使用してください。',
    col_mistake: '間違い',
    col_fix: '修正方法',
    mistake1: 'RewriteEngine On の欠落',
    fix1: '書き換えルールブロックの先頭に必ず "RewriteEngine On" を追加',
    mistake2: 'パターンでドットが未エスケープ',
    fix2: '正規表現パターンでは . の代わりに \\. を使用（ドットは任意の文字にマッチ）',
    mistake3: '[L] フラグの忘れ',
    fix3: 'マッチ後にルール処理を停止するため [L] を追加',
    mistake4: 'Redirect と RewriteRule の混用',
    fix4: '1つの方法に統一；混用は予期しない動作を引き起こす',
    mistake5: 'ブラウザキャッシュをクリアせずにテスト',
    fix5: '301 リダイレクトはブラウザにキャッシュされる；テスト時は 302 を使用し、本番で 301 に変更',
    mistake6: '.htaccess のファイルパーミッションが不正',
    fix6: 'パーミッションを 644 に設定',
    h2_faq: 'よくある質問',
    faq1_q: '.htaccess とは何ですか？どこに配置すべきですか？',
    faq1_a: '.htaccess は Apache Web サーバーの分散設定ファイルです。Web サイトのルートディレクトリ（通常 public_html または www）に配置します。配置されたディレクトリとすべてのサブディレクトリに影響します。ファイル名は先頭のドットを含む ".htaccess" でなければなりません。',
    faq2_q: '301 リダイレクトと 302 リダイレクトの違いは？',
    faq2_a: '301 リダイレクトは永久的で、検索エンジンにリンク資産を新しい URL に移すよう指示します。302 リダイレクトは一時的で、検索エンジンは元の URL をインデックスに保持します。永久的な移動には 301、一時的な状況には 302 を使用します。ブラウザは 301 を積極的にキャッシュするため、テスト時は 302 を使用してください。',
    faq3_q: '.htaccess のルールが機能しないのはなぜ？',
    faq3_a: '最も一般的な原因：1）mod_rewrite が有効でない；2）AllowOverride が None に設定されている；3）ファイルパーミッションが不正（644 にすべき）；4）構文エラー（Apache エラーログを確認）；5）ブラウザが以前の 301 リダイレクトをキャッシュしている。',
    faq4_q: '.htaccess は Nginx で使えますか？',
    faq4_a: 'いいえ、.htaccess は Apache 固有です。Nginx を使用する場合、同等のディレクティブを Nginx サーバーブロック設定に直接追加する必要があります。オンラインツールで .htaccess ルールを Nginx 設定に変換できますが、完全な一対一の変換ではありません。',
    faq5_q: 'サイトリニューアル後に旧 URL をリダイレクトするには？',
    faq5_a: '旧 URL と新 URL のマッピングを作成し、それぞれに Redirect または RewriteRule を追加します。パターンベースの変更には正規表現キャプチャグループを使用します：RewriteRule ^blog/(.*)$ /articles/$1 [R=301,L]。必ず curl -I でリダイレクトをテストしてください。',
    faq6_q: '.htaccess はサイトパフォーマンスにどう影響しますか？',
    faq6_a: 'Apache はリクエストごとに .htaccess を読み取るため、わずかなパフォーマンスオーバーヘッドがあります。高トラフィックサイトでは、ルールを Apache メイン設定に移動するのが望ましいです。ただし、ほとんどの Web サイトではパフォーマンスへの影響は無視できる程度です。',
    p_conclusion: 'この .htaccess チートシートは、最も重要なリダイレクトパターン、セキュリティ設定、パフォーマンス最適化をカバーしています。本番環境にデプロイする前に、curl やオンラインリダイレクトチェッカーで変更を十分にテストし、動作する .htaccess ファイルのバックアップを保管してください。',
  },
  ko: {
    intro: '<strong>.htaccess 파일</strong>은 Apache 웹 서버의 가장 강력한 구성 도구 중 하나입니다. 메인 서버 설정을 수정하지 않고도 리디렉션, HTTPS 강제, 보안 헤더 설정, 캐싱 관리 등을 제어할 수 있습니다. 이 <strong>포괄적인 .htaccess 리디렉트 치트 시트</strong>는 모든 일반적인 시나리오에 대한 프로덕션 수준의 복사-붙여넣기 가능한 예제를 제공합니다.',
    h2_basic_redirects: '기본 리디렉트',
    p_basic_redirects: '리디렉트는 .htaccess 파일의 가장 일반적인 용도입니다. 단일 페이지 이동, 전체 디렉토리 재구성, 새 도메인으로 마이그레이션 등 Apache의 <code>Redirect</code> 및 <code>RewriteRule</code> 지시어로 간단하게 구현할 수 있습니다. SEO 링크 가치를 새 URL로 전달하기 위해 항상 301(영구) 리디렉트를 사용하세요.',
    h3_single_url: '단일 URL 리디렉트',
    h3_directory: '전체 디렉토리 리디렉트',
    h3_domain: '도메인 간 리디렉트',
    h2_https: 'HTTPS 강제 적용',
    p_https: 'HTTPS 강제는 보안과 SEO에 필수적입니다. Google은 HTTPS를 순위 신호로 사용하며, 최신 브라우저는 안전하지 않은 HTTP 연결에 대해 경고합니다. 이 규칙들은 <code>mod_rewrite</code>를 사용하여 모든 HTTP 트래픽을 HTTPS로 리디렉트합니다.',
    h3_http_to_https: 'HTTP에서 HTTPS로 (www 없이)',
    h3_http_to_https_www: 'HTTP에서 HTTPS로 (www 포함)',
    h3_force_non_www: '비-www + HTTPS 강제',
    h2_trailing_slash: '후행 슬래시 처리',
    p_trailing_slash: '일관성 없는 후행 슬래시는 SEO에 해로운 중복 콘텐츠 문제를 만듭니다. 검색 엔진은 <code>/about</code>과 <code>/about/</code>을 다른 URL로 취급합니다. 하나의 스타일을 선택하고 사이트 전체에서 일관되게 적용하세요.',
    h3_add_trailing: '후행 슬래시 추가',
    h3_remove_trailing: '후행 슬래시 제거',
    h2_query_strings: '쿼리 문자열 처리',
    p_query_strings: '쿼리 문자열이 있는 URL 리디렉트에는 특별한 주의가 필요합니다. 기본적으로 Apache는 원래 쿼리 문자열을 리디렉트 대상에 추가합니다. <code>QSA</code>(쿼리 문자열 추가)와 <code>?</code>(폐기) 플래그를 사용하여 쿼리 매개변수를 유지, 폐기 또는 수정할 수 있습니다.',
    h3_redirect_with_params: '쿼리 문자열 유지 리디렉트',
    h3_redirect_without_params: '쿼리 문자열 폐기 리디렉트',
    h3_redirect_modify_params: '쿼리 매개변수 수정 리디렉트',
    h2_error_pages: '커스텀 에러 페이지',
    p_error_pages: '커스텀 에러 페이지는 일반적인 서버 오류 대신 유용한 정보를 제공하여 사용자 경험을 향상시킵니다. <code>ErrorDocument</code> 지시어로 모든 HTTP 상태 코드에 대한 커스텀 페이지를 정의할 수 있습니다.',
    h2_security_headers: '.htaccess를 통한 보안 헤더',
    p_security_headers: 'HTTP 보안 헤더는 클릭재킹, 크로스 사이트 스크립팅(XSS), 콘텐츠 인젝션과 같은 일반적인 공격으로부터 사이트를 보호합니다. <code>mod_headers</code>가 활성화되어야 합니다.',
    h2_caching: '브라우저 캐싱 규칙',
    p_caching: '브라우저 캐싱은 브라우저에 정적 자산을 로컬에 저장하도록 지시하여 재방문자의 페이지 로드 시간을 크게 개선합니다. <code>mod_expires</code> 모듈이 <code>Cache-Control</code> 및 <code>Expires</code> 헤더를 자동으로 설정합니다.',
    h2_compression: 'Gzip / Brotli 압축',
    p_compression: '압축은 전송 응답 크기를 60-90% 줄여 페이지 로드 시간을 크게 개선합니다. Apache는 Gzip(<code>mod_deflate</code>)과 Brotli(<code>mod_brotli</code>, Apache 2.4.26+)를 모두 지원합니다.',
    h3_gzip: 'Gzip 압축 (mod_deflate)',
    h3_brotli: 'Brotli 압축 (mod_brotli)',
    h2_common_mistakes: '흔한 실수와 해결 방법',
    p_common_mistakes: '.htaccess 문제 디버깅은 어려울 수 있습니다. 개발자들이 가장 자주 하는 실수와 그 해결 방법을 소개합니다.',
    h3_infinite_loops: '무한 리디렉트 루프',
    p_infinite_loops: '가장 흔한 실수는 재작성된 URL이 같은 규칙에 다시 매칭되는 리디렉트 루프를 만드는 것입니다. 규칙 적용 전에 <code>RewriteCond</code>로 현재 상태를 확인하고, 매칭 후 <code>[L]</code> 플래그로 처리를 중지하세요.',
    h3_wrong_rewritebase: '잘못된 RewriteBase',
    p_wrong_rewritebase: '<code>RewriteBase</code>는 디렉토리별 재작성의 기본 URL 경로를 정의합니다. .htaccess가 하위 디렉토리에 있으면 RewriteBase는 해당 경로와 일치해야 합니다.',
    h3_rule_order: '규칙 순서가 중요합니다',
    p_rule_order: 'Apache는 .htaccess 규칙을 위에서 아래로 처리합니다. 일반적인 규칙이 특정 규칙 앞에 있으면 먼저 매칭되어 특정 규칙은 실행되지 않습니다. 특정 규칙을 일반 규칙 앞에 배치하고 <code>[L]</code> 플래그를 사용하세요.',
    col_mistake: '실수',
    col_fix: '해결 방법',
    mistake1: 'RewriteEngine On 누락',
    fix1: '재작성 규칙 블록 상단에 항상 "RewriteEngine On" 추가',
    mistake2: '패턴에서 점을 이스케이프하지 않음',
    fix2: '정규식 패턴에서 . 대신 \\. 사용 (점은 모든 문자와 매칭)',
    mistake3: '[L] 플래그 누락',
    fix3: '매칭 후 규칙 처리를 중지하기 위해 [L] 추가',
    mistake4: 'Redirect와 RewriteRule 혼용',
    fix4: '하나의 방법만 사용; 혼용은 예측할 수 없는 동작 유발',
    mistake5: '브라우저 캐시 삭제 없이 테스트',
    fix5: '301 리디렉트는 브라우저에 캐시됨; 테스트 시 302 사용, 프로덕션에서 301로 변경',
    mistake6: '.htaccess 파일 권한 오류',
    fix6: '권한을 644로 설정',
    h2_faq: '자주 묻는 질문',
    faq1_q: '.htaccess란 무엇이며 어디에 배치해야 하나요?',
    faq1_a: '.htaccess는 Apache 웹 서버의 분산 설정 파일입니다. 웹사이트 루트 디렉토리(보통 public_html 또는 www)에 배치합니다. 해당 디렉토리와 모든 하위 디렉토리에 영향을 미칩니다. 파일명은 앞의 점을 포함하여 정확히 ".htaccess"여야 합니다.',
    faq2_q: '301과 302 리디렉트의 차이점은?',
    faq2_a: '301 리디렉트는 영구적으로, 검색 엔진에 링크 가치를 새 URL로 이전하도록 지시합니다. 302 리디렉트는 임시적으로, 검색 엔진이 원래 URL을 인덱스에 유지합니다. 영구적 이동에는 301, 임시 상황에는 302를 사용하세요. 브라우저는 301을 적극적으로 캐시하므로 테스트 시에는 302를 사용하세요.',
    faq3_q: '.htaccess 규칙이 작동하지 않는 이유는?',
    faq3_a: '가장 흔한 원인: 1) mod_rewrite 미활성화; 2) AllowOverride가 None으로 설정; 3) 파일 권한 오류(644여야 함); 4) 구문 오류(Apache 에러 로그 확인); 5) 브라우저가 이전 301 리디렉트를 캐시.',
    faq4_q: '.htaccess는 Nginx에서 사용할 수 있나요?',
    faq4_a: '아니요, .htaccess는 Apache 전용입니다. Nginx를 사용하는 경우 동등한 지시어를 Nginx 서버 블록 설정에 직접 추가해야 합니다. 온라인 도구로 .htaccess 규칙을 Nginx 설정으로 변환할 수 있지만, 완전한 1:1 변환은 아닙니다.',
    faq5_q: '사이트 리디자인 후 이전 URL을 리디렉트하는 방법은?',
    faq5_a: '이전 URL에서 새 URL로의 매핑을 만들고 각각에 Redirect 또는 RewriteRule을 추가합니다. 패턴 기반 변경에는 정규식 캡처 그룹 사용: RewriteRule ^blog/(.*)$ /articles/$1 [R=301,L]. 항상 curl -I로 리디렉트를 테스트하세요.',
    faq6_q: '.htaccess는 사이트 성능에 어떤 영향을 미치나요?',
    faq6_a: 'Apache는 모든 요청마다 .htaccess 파일을 읽어 약간의 성능 오버헤드가 있습니다. 고트래픽 사이트에서는 규칙을 Apache 메인 설정으로 이동하는 것이 좋습니다. 하지만 대부분의 웹사이트에서 성능 영향은 무시할 수 있을 정도입니다.',
    p_conclusion: '이 .htaccess 치트 시트는 가장 필수적인 리디렉트 패턴, 보안 구성 및 성능 최적화를 다룹니다. 프로덕션에 배포하기 전에 curl 또는 온라인 리디렉트 체커로 변경 사항을 철저히 테스트하고, 작동하는 .htaccess 파일의 백업을 유지하세요.',
  },
  fr: {
    intro: 'Le <strong>fichier .htaccess</strong> est l\'un des outils de configuration les plus puissants pour les serveurs web Apache. Il vous permet de contrôler les redirections, forcer le HTTPS, définir des en-têtes de sécurité, gérer le cache et bien plus encore, sans toucher à la configuration principale du serveur. Ce <strong>guide complet .htaccess</strong> fournit des exemples prêts pour la production que vous pouvez copier et coller directement.',
    h2_basic_redirects: 'Redirections de base',
    p_basic_redirects: 'Les redirections sont l\'utilisation la plus courante des fichiers .htaccess. Que vous déplaciez une seule page, restructuriez un répertoire entier ou migriez vers un nouveau domaine, les directives <code>Redirect</code> et <code>RewriteRule</code> d\'Apache le rendent simple. Utilisez toujours des redirections 301 (permanentes) pour le SEO afin de transférer la valeur des liens vers la nouvelle URL.',
    h3_single_url: 'Rediriger une URL unique',
    h3_directory: 'Rediriger un répertoire entier',
    h3_domain: 'Redirection de domaine à domaine',
    h2_https: 'Forçage HTTPS',
    p_https: 'Forcer le HTTPS est essentiel pour la sécurité et le SEO. Google utilise le HTTPS comme signal de classement, et les navigateurs modernes avertissent les utilisateurs des connexions HTTP non sécurisées. Ces règles utilisent <code>mod_rewrite</code> pour rediriger tout le trafic HTTP vers HTTPS.',
    h3_http_to_https: 'HTTP vers HTTPS (sans www)',
    h3_http_to_https_www: 'HTTP vers HTTPS (avec www)',
    h3_force_non_www: 'Forcer non-www avec HTTPS',
    h2_trailing_slash: 'Gestion du slash final',
    p_trailing_slash: 'Des slashs finaux incohérents créent des problèmes de contenu dupliqué qui nuisent au SEO. Les moteurs de recherche traitent <code>/about</code> et <code>/about/</code> comme des URL différentes. Choisissez un style et appliquez-le de manière cohérente sur l\'ensemble de votre site.',
    h3_add_trailing: 'Ajouter le slash final',
    h3_remove_trailing: 'Supprimer le slash final',
    h2_query_strings: 'Gestion des chaînes de requête',
    p_query_strings: 'La redirection d\'URL avec des chaînes de requête nécessite une attention particulière. Par défaut, Apache ajoute la chaîne de requête originale à la cible. Utilisez les drapeaux <code>QSA</code> et <code>?</code> pour conserver, supprimer ou modifier les paramètres.',
    h3_redirect_with_params: 'Redirection en conservant la chaîne de requête',
    h3_redirect_without_params: 'Redirection en supprimant la chaîne de requête',
    h3_redirect_modify_params: 'Redirection en modifiant les paramètres',
    h2_error_pages: 'Pages d\'erreur personnalisées',
    p_error_pages: 'Les pages d\'erreur personnalisées améliorent l\'expérience utilisateur en fournissant des informations utiles. La directive <code>ErrorDocument</code> permet de définir des pages personnalisées pour tout code de statut HTTP.',
    h2_security_headers: 'En-têtes de sécurité via .htaccess',
    p_security_headers: 'Les en-têtes de sécurité HTTP protègent votre site contre les attaques courantes comme le clickjacking, le XSS et l\'injection de contenu. L\'ajout via .htaccess nécessite l\'activation de <code>mod_headers</code>.',
    h2_caching: 'Règles de cache navigateur',
    p_caching: 'Le cache navigateur améliore considérablement les temps de chargement pour les visiteurs réguliers. Le module <code>mod_expires</code> définit automatiquement les en-têtes <code>Cache-Control</code> et <code>Expires</code>.',
    h2_compression: 'Compression Gzip / Brotli',
    p_compression: 'La compression réduit la taille des réponses de 60 à 90%, améliorant significativement les temps de chargement. Apache supporte Gzip (via <code>mod_deflate</code>) et Brotli (via <code>mod_brotli</code>, Apache 2.4.26+).',
    h3_gzip: 'Compression Gzip (mod_deflate)',
    h3_brotli: 'Compression Brotli (mod_brotli)',
    h2_common_mistakes: 'Erreurs courantes et corrections',
    p_common_mistakes: 'Le débogage des problèmes .htaccess peut être frustrant. Voici les erreurs les plus courantes et comment les éviter.',
    h3_infinite_loops: 'Boucles de redirection infinies',
    p_infinite_loops: 'L\'erreur la plus courante est de créer une boucle où l\'URL réécrite correspond à nouveau à la même règle. Utilisez toujours <code>RewriteCond</code> pour vérifier l\'état actuel et le drapeau <code>[L]</code> pour arrêter le traitement.',
    h3_wrong_rewritebase: 'Mauvais RewriteBase',
    p_wrong_rewritebase: '<code>RewriteBase</code> définit le chemin URL de base pour les réécritures par répertoire. Si votre .htaccess est dans un sous-répertoire, le RewriteBase doit correspondre à ce chemin.',
    h3_rule_order: 'L\'ordre des règles compte',
    p_rule_order: 'Apache traite les règles de haut en bas. Si une règle générale précède une règle spécifique, elle correspondra en premier. Placez toujours les règles spécifiques avant les générales et utilisez le drapeau <code>[L]</code>.',
    col_mistake: 'Erreur',
    col_fix: 'Correction',
    mistake1: 'RewriteEngine On manquant',
    fix1: 'Ajoutez toujours "RewriteEngine On" en haut du bloc de règles',
    mistake2: 'Points non échappés dans les motifs',
    fix2: 'Utilisez \\. au lieu de . dans les motifs regex',
    mistake3: 'Oubli du drapeau [L]',
    fix3: 'Ajoutez [L] pour arrêter le traitement après une correspondance',
    mistake4: 'Mélange de Redirect et RewriteRule',
    fix4: 'Utilisez une seule méthode ; le mélange cause un comportement imprévisible',
    mistake5: 'Test sans vider le cache du navigateur',
    fix5: 'Les redirections 301 sont mises en cache ; utilisez 302 pendant les tests',
    mistake6: 'Mauvaises permissions sur .htaccess',
    fix6: 'Définissez les permissions à 644',
    h2_faq: 'Questions fréquemment posées',
    faq1_q: 'Qu\'est-ce que .htaccess et où le placer ?',
    faq1_a: '.htaccess est un fichier de configuration distribué pour les serveurs web Apache. Placez-le dans le répertoire racine de votre site (généralement public_html ou www). Il affecte le répertoire et tous ses sous-répertoires. Le fichier doit être nommé exactement ".htaccess" avec le point initial.',
    faq2_q: 'Quelle est la différence entre les redirections 301 et 302 ?',
    faq2_a: 'Une redirection 301 est permanente : elle indique aux moteurs de recherche de transférer la valeur des liens vers la nouvelle URL. Une 302 est temporaire : les moteurs gardent l\'URL originale dans leur index. Utilisez 301 pour les déplacements permanents et 302 pour les situations temporaires. Les navigateurs mettent en cache les 301, utilisez donc 302 pendant les tests.',
    faq3_q: 'Pourquoi mes règles .htaccess ne fonctionnent-elles pas ?',
    faq3_a: 'Causes les plus courantes : 1) mod_rewrite non activé ; 2) AllowOverride réglé sur None ; 3) Permissions de fichier incorrectes (devrait être 644) ; 4) Erreurs de syntaxe (vérifiez le log d\'erreurs Apache) ; 5) Le navigateur a mis en cache une redirection 301 précédente.',
    faq4_q: '.htaccess fonctionne-t-il avec Nginx ?',
    faq4_a: 'Non, .htaccess est spécifique à Apache. Nginx ne supporte pas les fichiers .htaccess. Avec Nginx, vous devez ajouter les directives équivalentes directement dans la configuration du bloc server. Des outils en ligne existent pour convertir les règles .htaccess en syntaxe Nginx.',
    faq5_q: 'Comment rediriger les anciennes URL après une refonte ?',
    faq5_a: 'Créez une correspondance des anciennes vers les nouvelles URL. Pour les changements basés sur des motifs, utilisez RewriteRule avec des groupes de capture : RewriteRule ^blog/(.*)$ /articles/$1 [R=301,L]. Testez toujours avec curl -I pour vérifier le code de statut et la destination.',
    faq6_q: 'Comment .htaccess affecte-t-il les performances du site ?',
    faq6_a: 'Apache lit les fichiers .htaccess à chaque requête, ce qui ajoute un léger surcoût. Pour les sites à fort trafic, déplacez les règles dans la configuration principale Apache. Pour la plupart des sites, l\'impact est négligeable et la commodité de .htaccess l\'emporte.',
    p_conclusion: 'Ce guide .htaccess couvre les modèles de redirection essentiels, les configurations de sécurité et les optimisations de performance. Testez toujours vos modifications avec curl avant le déploiement en production et conservez une sauvegarde de votre fichier .htaccess fonctionnel.',
  },
  de: {
    intro: 'Die <strong>.htaccess-Datei</strong> ist eines der leistungsstärksten Konfigurationswerkzeuge für Apache-Webserver. Sie ermöglicht die Steuerung von Weiterleitungen, HTTPS-Erzwingung, Sicherheitsheader, Caching und vieles mehr -- ohne die Hauptserverkonfiguration zu ändern. Dieses <strong>umfassende .htaccess-Redirect-Cheatsheet</strong> bietet produktionsreife Beispiele zum Kopieren und Einfügen für jedes gängige Szenario.',
    h2_basic_redirects: 'Grundlegende Weiterleitungen',
    p_basic_redirects: 'Weiterleitungen sind die häufigste Verwendung von .htaccess-Dateien. Ob einzelne Seite, ganzes Verzeichnis oder Domain-Migration -- Apaches <code>Redirect</code>- und <code>RewriteRule</code>-Direktiven machen es einfach. Verwenden Sie immer 301-Weiterleitungen (permanent) für SEO, um den Linkwert auf die neue URL zu übertragen.',
    h3_single_url: 'Einzelne URL weiterleiten',
    h3_directory: 'Gesamtes Verzeichnis weiterleiten',
    h3_domain: 'Domain-zu-Domain-Weiterleitung',
    h2_https: 'HTTPS-Erzwingung',
    p_https: 'Die Erzwingung von HTTPS ist für Sicherheit und SEO unerlässlich. Google verwendet HTTPS als Ranking-Signal, und moderne Browser warnen vor unsicheren HTTP-Verbindungen. Diese Regeln verwenden <code>mod_rewrite</code>, um den gesamten HTTP-Traffic auf HTTPS umzuleiten.',
    h3_http_to_https: 'HTTP zu HTTPS (ohne www)',
    h3_http_to_https_www: 'HTTP zu HTTPS (mit www)',
    h3_force_non_www: 'Nicht-www mit HTTPS erzwingen',
    h2_trailing_slash: 'Behandlung des abschließenden Schrägstrichs',
    p_trailing_slash: 'Inkonsistente abschließende Schrägstriche erzeugen Duplicate-Content-Probleme, die SEO schaden. Suchmaschinen behandeln <code>/about</code> und <code>/about/</code> als verschiedene URLs. Wählen Sie einen Stil und erzwingen Sie ihn konsistent auf der gesamten Website.',
    h3_add_trailing: 'Abschließenden Schrägstrich hinzufügen',
    h3_remove_trailing: 'Abschließenden Schrägstrich entfernen',
    h2_query_strings: 'Behandlung von Query-Strings',
    p_query_strings: 'Die Weiterleitung von URLs mit Query-Strings erfordert besondere Aufmerksamkeit. Standardmäßig hängt Apache den originalen Query-String an das Weiterleitungsziel an. Verwenden Sie die <code>QSA</code>- und <code>?</code>-Flags zum Beibehalten, Verwerfen oder Ändern von Parametern.',
    h3_redirect_with_params: 'Weiterleitung mit Beibehaltung des Query-Strings',
    h3_redirect_without_params: 'Weiterleitung mit Verwerfung des Query-Strings',
    h3_redirect_modify_params: 'Weiterleitung mit Änderung der Parameter',
    h2_error_pages: 'Benutzerdefinierte Fehlerseiten',
    p_error_pages: 'Benutzerdefinierte Fehlerseiten verbessern die Benutzererfahrung durch hilfreiche Informationen. Die <code>ErrorDocument</code>-Direktive ermöglicht die Definition benutzerdefinierter Seiten für jeden HTTP-Statuscode.',
    h2_security_headers: 'Sicherheitsheader über .htaccess',
    p_security_headers: 'HTTP-Sicherheitsheader schützen Ihre Website vor gängigen Angriffen wie Clickjacking, XSS und Content-Injection. Das Hinzufügen über .htaccess erfordert aktiviertes <code>mod_headers</code>.',
    h2_caching: 'Browser-Caching-Regeln',
    p_caching: 'Browser-Caching verbessert die Ladezeiten für wiederkehrende Besucher erheblich. Das <code>mod_expires</code>-Modul setzt <code>Cache-Control</code>- und <code>Expires</code>-Header automatisch.',
    h2_compression: 'Gzip-/Brotli-Komprimierung',
    p_compression: 'Komprimierung reduziert die Größe übertragener Antworten um 60-90% und verbessert die Ladezeiten erheblich. Apache unterstützt Gzip (über <code>mod_deflate</code>) und Brotli (über <code>mod_brotli</code>, Apache 2.4.26+).',
    h3_gzip: 'Gzip-Komprimierung (mod_deflate)',
    h3_brotli: 'Brotli-Komprimierung (mod_brotli)',
    h2_common_mistakes: 'Häufige Fehler und Korrekturen',
    p_common_mistakes: 'Das Debuggen von .htaccess-Problemen kann frustrierend sein. Hier sind die häufigsten Fehler und wie man sie vermeidet.',
    h3_infinite_loops: 'Endlose Weiterleitungsschleifen',
    p_infinite_loops: 'Der häufigste Fehler ist eine Weiterleitungsschleife, bei der die umgeschriebene URL erneut auf dieselbe Regel passt. Verwenden Sie immer <code>RewriteCond</code> zur Zustandsprüfung und das <code>[L]</code>-Flag zum Stoppen der Verarbeitung.',
    h3_wrong_rewritebase: 'Falsche RewriteBase',
    p_wrong_rewritebase: '<code>RewriteBase</code> definiert den Basis-URL-Pfad für verzeichnisbezogene Umschreibungen. Wenn die .htaccess in einem Unterverzeichnis liegt, muss die RewriteBase diesem Pfad entsprechen.',
    h3_rule_order: 'Regelreihenfolge ist wichtig',
    p_rule_order: 'Apache verarbeitet .htaccess-Regeln von oben nach unten. Wenn eine allgemeine Regel vor einer spezifischen steht, wird sie zuerst übereinstimmen. Platzieren Sie spezifische Regeln immer vor allgemeinen und verwenden Sie das <code>[L]</code>-Flag.',
    col_mistake: 'Fehler',
    col_fix: 'Korrektur',
    mistake1: 'Fehlendes RewriteEngine On',
    fix1: 'Fügen Sie immer "RewriteEngine On" am Anfang des Regelblocks hinzu',
    mistake2: 'Nicht-escaped Punkte in Mustern',
    fix2: 'Verwenden Sie \\. statt . in Regex-Mustern',
    mistake3: 'Vergessenes [L]-Flag',
    fix3: 'Fügen Sie [L] hinzu, um die Verarbeitung nach einem Treffer zu stoppen',
    mistake4: 'Mischung von Redirect und RewriteRule',
    fix4: 'Bleiben Sie bei einer Methode; Mischen verursacht unvorhersehbares Verhalten',
    mistake5: 'Test ohne Leeren des Browser-Caches',
    fix5: '301-Weiterleitungen werden zwischengespeichert; verwenden Sie 302 beim Testen',
    mistake6: 'Falsche Dateiberechtigungen für .htaccess',
    fix6: 'Berechtigungen auf 644 setzen',
    h2_faq: 'Häufig gestellte Fragen',
    faq1_q: 'Was ist .htaccess und wo platziere ich die Datei?',
    faq1_a: '.htaccess ist eine verteilte Konfigurationsdatei für Apache-Webserver. Platzieren Sie sie im Stammverzeichnis Ihrer Website (üblicherweise public_html oder www). Sie beeinflusst das Verzeichnis und alle Unterverzeichnisse. Die Datei muss exakt ".htaccess" mit dem führenden Punkt heißen.',
    faq2_q: 'Was ist der Unterschied zwischen 301- und 302-Weiterleitungen?',
    faq2_a: 'Eine 301-Weiterleitung ist permanent und überträgt den Linkwert zur neuen URL. Eine 302-Weiterleitung ist temporär, Suchmaschinen behalten die Original-URL im Index. Verwenden Sie 301 für permanente Verschiebungen und 302 für temporäre Situationen. Browser cachen 301-Weiterleitungen aggressiv, verwenden Sie daher 302 beim Testen.',
    faq3_q: 'Warum funktionieren meine .htaccess-Regeln nicht?',
    faq3_a: 'Häufigste Ursachen: 1) mod_rewrite nicht aktiviert; 2) AllowOverride auf None gesetzt; 3) Falsche Dateiberechtigungen (sollte 644 sein); 4) Syntaxfehler (Apache-Fehlerlog prüfen); 5) Browser hat vorherige 301-Weiterleitung zwischengespeichert.',
    faq4_q: 'Funktioniert .htaccess mit Nginx?',
    faq4_a: 'Nein, .htaccess ist Apache-spezifisch. Nginx unterstützt keine .htaccess-Dateien. Bei Nginx müssen Sie äquivalente Direktiven direkt in die Server-Block-Konfiguration einfügen. Online-Tools können .htaccess-Regeln in Nginx-Syntax konvertieren.',
    faq5_q: 'Wie leite ich alte URLs nach einem Redesign weiter?',
    faq5_a: 'Erstellen Sie eine Zuordnung alter zu neuer URLs und fügen Sie für jede einen Redirect oder RewriteRule hinzu. Für musterbasierte Änderungen verwenden Sie Regex-Capture-Groups: RewriteRule ^blog/(.*)$ /articles/$1 [R=301,L]. Testen Sie immer mit curl -I.',
    faq6_q: 'Wie beeinflusst .htaccess die Website-Performance?',
    faq6_a: 'Apache liest .htaccess-Dateien bei jeder Anfrage, was einen geringen Performance-Overhead verursacht. Für hochfrequentierte Websites ist es besser, Regeln in die Apache-Hauptkonfiguration zu verschieben. Für die meisten Websites ist der Einfluss jedoch vernachlässigbar.',
    p_conclusion: 'Dieses .htaccess-Cheatsheet deckt die wichtigsten Weiterleitungsmuster, Sicherheitskonfigurationen und Performance-Optimierungen ab. Testen Sie Änderungen immer gründlich mit curl, bevor Sie sie in die Produktion deployen, und bewahren Sie ein Backup Ihrer funktionierenden .htaccess-Datei auf.',
  },
  es: {
    intro: 'El <strong>archivo .htaccess</strong> es una de las herramientas de configuración más potentes para servidores web Apache. Te permite controlar redirecciones, forzar HTTPS, establecer encabezados de seguridad, gestionar el caché y mucho más, sin tocar la configuración principal del servidor. Esta <strong>guía completa de redirecciones .htaccess</strong> proporciona ejemplos listos para producción que puedes copiar y pegar directamente.',
    h2_basic_redirects: 'Redirecciones básicas',
    p_basic_redirects: 'Las redirecciones son el uso más común de los archivos .htaccess. Ya sea moviendo una sola página, reestructurando un directorio completo o migrando a un nuevo dominio, las directivas <code>Redirect</code> y <code>RewriteRule</code> de Apache lo hacen sencillo. Usa siempre redirecciones 301 (permanentes) para SEO y transferir el valor de los enlaces a la nueva URL.',
    h3_single_url: 'Redirigir una URL única',
    h3_directory: 'Redirigir un directorio completo',
    h3_domain: 'Redirección de dominio a dominio',
    h2_https: 'Forzar HTTPS',
    p_https: 'Forzar HTTPS es esencial para la seguridad y el SEO. Google usa HTTPS como señal de ranking, y los navegadores modernos advierten sobre conexiones HTTP inseguras. Estas reglas usan <code>mod_rewrite</code> para redirigir todo el tráfico HTTP a HTTPS.',
    h3_http_to_https: 'HTTP a HTTPS (sin www)',
    h3_http_to_https_www: 'HTTP a HTTPS (con www)',
    h3_force_non_www: 'Forzar sin www con HTTPS',
    h2_trailing_slash: 'Manejo de barra final',
    p_trailing_slash: 'Las barras finales inconsistentes crean problemas de contenido duplicado que perjudican el SEO. Los motores de búsqueda tratan <code>/about</code> y <code>/about/</code> como URLs diferentes. Elige un estilo y aplícalo consistentemente en todo tu sitio.',
    h3_add_trailing: 'Agregar barra final',
    h3_remove_trailing: 'Eliminar barra final',
    h2_query_strings: 'Manejo de cadenas de consulta',
    p_query_strings: 'Redirigir URLs con cadenas de consulta requiere atención especial. Por defecto, Apache añade la cadena de consulta original al destino. Usa los flags <code>QSA</code> y <code>?</code> para conservar, descartar o modificar parámetros.',
    h3_redirect_with_params: 'Redirigir conservando la cadena de consulta',
    h3_redirect_without_params: 'Redirigir descartando la cadena de consulta',
    h3_redirect_modify_params: 'Redirigir modificando los parámetros',
    h2_error_pages: 'Páginas de error personalizadas',
    p_error_pages: 'Las páginas de error personalizadas mejoran la experiencia del usuario proporcionando información útil. La directiva <code>ErrorDocument</code> permite definir páginas personalizadas para cualquier código de estado HTTP.',
    h2_security_headers: 'Encabezados de seguridad vía .htaccess',
    p_security_headers: 'Los encabezados de seguridad HTTP protegen tu sitio contra ataques comunes como clickjacking, XSS e inyección de contenido. Añadirlos vía .htaccess requiere <code>mod_headers</code> habilitado.',
    h2_caching: 'Reglas de caché del navegador',
    p_caching: 'El caché del navegador mejora dramáticamente los tiempos de carga para visitantes recurrentes. El módulo <code>mod_expires</code> establece automáticamente los encabezados <code>Cache-Control</code> y <code>Expires</code>.',
    h2_compression: 'Compresión Gzip / Brotli',
    p_compression: 'La compresión reduce el tamaño de las respuestas entre un 60-90%, mejorando significativamente los tiempos de carga. Apache soporta Gzip (vía <code>mod_deflate</code>) y Brotli (vía <code>mod_brotli</code>, Apache 2.4.26+).',
    h3_gzip: 'Compresión Gzip (mod_deflate)',
    h3_brotli: 'Compresión Brotli (mod_brotli)',
    h2_common_mistakes: 'Errores comunes y cómo corregirlos',
    p_common_mistakes: 'Depurar problemas de .htaccess puede ser frustrante. Aquí están los errores más comunes y cómo evitarlos.',
    h3_infinite_loops: 'Bucles de redirección infinitos',
    p_infinite_loops: 'El error más común es crear un bucle donde la URL reescrita coincide nuevamente con la misma regla. Usa siempre <code>RewriteCond</code> para verificar el estado actual y el flag <code>[L]</code> para detener el procesamiento.',
    h3_wrong_rewritebase: 'RewriteBase incorrecto',
    p_wrong_rewritebase: '<code>RewriteBase</code> define la ruta URL base para reescrituras por directorio. Si tu .htaccess está en un subdirectorio, el RewriteBase debe coincidir con esa ruta.',
    h3_rule_order: 'El orden de las reglas importa',
    p_rule_order: 'Apache procesa las reglas de arriba a abajo. Si una regla general aparece antes que una específica, coincidirá primero. Coloca siempre las reglas específicas antes que las generales y usa el flag <code>[L]</code>.',
    col_mistake: 'Error',
    col_fix: 'Corrección',
    mistake1: 'Falta RewriteEngine On',
    fix1: 'Agrega siempre "RewriteEngine On" al inicio del bloque de reglas',
    mistake2: 'Puntos no escapados en patrones',
    fix2: 'Usa \\. en lugar de . en patrones regex',
    mistake3: 'Olvidar el flag [L]',
    fix3: 'Agrega [L] para detener el procesamiento después de una coincidencia',
    mistake4: 'Mezclar Redirect y RewriteRule',
    fix4: 'Usa un solo método; mezclarlos causa comportamiento impredecible',
    mistake5: 'Probar sin limpiar la caché del navegador',
    fix5: 'Las redirecciones 301 se cachean; usa 302 durante las pruebas',
    mistake6: 'Permisos incorrectos en .htaccess',
    fix6: 'Establece los permisos a 644',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: '¿Qué es .htaccess y dónde debo colocarlo?',
    faq1_a: '.htaccess es un archivo de configuración distribuido para servidores web Apache. Colócalo en el directorio raíz de tu sitio (generalmente public_html o www). Afecta al directorio y todos los subdirectorios. El archivo debe llamarse exactamente ".htaccess" con el punto inicial.',
    faq2_q: '¿Cuál es la diferencia entre las redirecciones 301 y 302?',
    faq2_a: 'Una redirección 301 es permanente: indica a los motores de búsqueda que transfieran el valor de los enlaces a la nueva URL. Una 302 es temporal: los motores mantienen la URL original en su índice. Usa 301 para movimientos permanentes y 302 para situaciones temporales. Los navegadores cachean agresivamente las 301, así que usa 302 durante las pruebas.',
    faq3_q: '¿Por qué no funcionan mis reglas .htaccess?',
    faq3_a: 'Causas más comunes: 1) mod_rewrite no habilitado; 2) AllowOverride establecido en None; 3) Permisos de archivo incorrectos (deben ser 644); 4) Errores de sintaxis (revisa el log de errores de Apache); 5) El navegador cacheó una redirección 301 anterior.',
    faq4_q: '¿Funciona .htaccess con Nginx?',
    faq4_a: 'No, .htaccess es específico de Apache. Nginx no soporta archivos .htaccess. Con Nginx, debes agregar las directivas equivalentes directamente en la configuración del bloque server. Existen herramientas en línea para convertir reglas .htaccess a sintaxis Nginx.',
    faq5_q: '¿Cómo redirijo URLs antiguas después de un rediseño?',
    faq5_a: 'Crea un mapeo de URLs antiguas a nuevas y agrega un Redirect o RewriteRule para cada una. Para cambios basados en patrones, usa grupos de captura regex: RewriteRule ^blog/(.*)$ /articles/$1 [R=301,L]. Siempre prueba con curl -I.',
    faq6_q: '¿Cómo afecta .htaccess al rendimiento del sitio?',
    faq6_a: 'Apache lee los archivos .htaccess en cada solicitud, lo que añade un pequeño overhead de rendimiento. Para sitios de alto tráfico, es mejor mover las reglas a la configuración principal de Apache. Para la mayoría de los sitios, el impacto es insignificante.',
    p_conclusion: 'Esta guía .htaccess cubre los patrones de redirección esenciales, configuraciones de seguridad y optimizaciones de rendimiento. Siempre prueba tus cambios con curl antes de desplegar en producción y mantén un respaldo de tu archivo .htaccess funcional.',
  },
};

/* -- shared styles -------------------------------------------------------- */
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

/* -- component ------------------------------------------------------------ */
export default function HtaccessRedirectCheatSheet({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
      { '@type': 'Question', name: t.faq6_q, acceptedAnswer: { '@type': 'Answer', text: t.faq6_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* -- Intro --------------------------------------------------------- */}
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }} dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* -- 1. Basic Redirects --------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'var(--text-primary)' }}>{t.h2_basic_redirects}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_basic_redirects }} />

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_single_url}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Redirect a single URL (301 permanent)
Redirect 301 /old-page.html https://example.com/new-page.html

# Using RewriteRule for more control
RewriteEngine On
RewriteRule ^old-page\\.html$ /new-page.html [R=301,L]

# Redirect with pattern matching (e.g., old product URLs)
RewriteRule ^products/([0-9]+)\\.html$ /shop/item/$1 [R=301,L]`}</code></pre>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_directory}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Redirect entire directory to new location
RedirectMatch 301 ^/blog/(.*)$ https://example.com/articles/$1

# Using RewriteRule (preserves subdirectory structure)
RewriteEngine On
RewriteRule ^blog/(.*)$ /articles/$1 [R=301,L]

# Redirect directory but keep filenames
RewriteRule ^old-folder/(.+)$ /new-folder/$1 [R=301,L]`}</code></pre>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_domain}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Redirect entire old domain to new domain
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\\.)?olddomain\\.com$ [NC]
RewriteRule ^(.*)$ https://newdomain.com/$1 [R=301,L]

# Redirect specific domain alias to primary domain
RewriteEngine On
RewriteCond %{HTTP_HOST} ^olddomain\\.net$ [NC,OR]
RewriteCond %{HTTP_HOST} ^olddomain\\.org$ [NC]
RewriteRule ^(.*)$ https://newdomain.com/$1 [R=301,L]`}</code></pre>
      </div>

      {/* -- 2. HTTPS Enforcement ------------------------------------------ */}
      <div style={sectionStyle}>
        <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'var(--text-primary)' }}>{t.h2_https}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_https }} />

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_http_to_https}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Force HTTPS (redirect HTTP to HTTPS, non-www)
RewriteEngine On

# Redirect www to non-www
RewriteCond %{HTTP_HOST} ^www\\.example\\.com$ [NC]
RewriteRule ^(.*)$ https://example.com/$1 [R=301,L]

# Redirect HTTP to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://example.com/$1 [R=301,L]`}</code></pre>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_http_to_https_www}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Force HTTPS with www prefix
RewriteEngine On

# Redirect non-www to www
RewriteCond %{HTTP_HOST} ^example\\.com$ [NC]
RewriteRule ^(.*)$ https://www.example.com/$1 [R=301,L]

# Redirect HTTP to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://www.example.com/$1 [R=301,L]`}</code></pre>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_force_non_www}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Force non-www + HTTPS in a single pass
# Works on shared hosting and most Apache setups
RewriteEngine On

# Handle both www removal and HTTPS enforcement together
RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Alternative: Using environment variables (some hosts)
# RewriteCond %{ENV:HTTPS} !on
# RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]`}</code></pre>
      </div>

      {/* -- 3. Trailing Slash --------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'var(--text-primary)' }}>{t.h2_trailing_slash}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_trailing_slash }} />

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_add_trailing}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Add trailing slash to all URLs (except files with extensions)
RewriteEngine On

# Only apply to URLs without a file extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !\\.[a-zA-Z0-9]{1,5}$
RewriteRule ^(.+[^/])$ %{REQUEST_URI}/ [R=301,L]

# Simpler version (may cause issues with some file types)
# RewriteRule ^(.*[^/])$ $1/ [R=301,L]`}</code></pre>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_remove_trailing}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Remove trailing slash from all URLs (except directories)
RewriteEngine On

# Do not remove trailing slash from actual directories
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [R=301,L]

# Remove trailing slash except for root URL
# RewriteCond %{REQUEST_URI} !^/$
# RewriteRule ^(.*)/$ /$1 [R=301,L]`}</code></pre>
      </div>

      {/* -- 4. Query String Handling -------------------------------------- */}
      <div style={sectionStyle}>
        <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'var(--text-primary)' }}>{t.h2_query_strings}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_query_strings }} />

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_redirect_with_params}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Redirect preserving the original query string (default behavior)
# /search?q=test -> /find?q=test
RewriteEngine On
RewriteRule ^search$ /find [R=301,L]

# Redirect and APPEND additional query parameters (QSA flag)
# /page?id=5 -> /new-page?id=5&ref=old
RewriteRule ^page$ /new-page?ref=old [R=301,L,QSA]

# Match specific query string and redirect
RewriteCond %{QUERY_STRING} ^id=([0-9]+)$
RewriteRule ^product\\.php$ /products/%1? [R=301,L]`}</code></pre>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_redirect_without_params}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Redirect and DISCARD all query parameters
# /old-page?any=params -> /new-page (clean URL)
RewriteEngine On
RewriteRule ^old-page$ /new-page? [R=301,L]
# The trailing ? strips the query string

# Discard specific query parameters only
# /page?utm_source=x&id=5 -> /page?id=5 (strip tracking params)
RewriteCond %{QUERY_STRING} (^|&)utm_[^&]*
RewriteRule ^(.*)$ /$1? [R=301,L]`}</code></pre>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_redirect_modify_params}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Rewrite query parameter to path segment
# /index.php?page=about -> /about
RewriteEngine On
RewriteCond %{QUERY_STRING} ^page=(.+)$
RewriteRule ^index\\.php$ /%1? [R=301,L]

# Rewrite path segment to query parameter
# /category/electronics -> /shop.php?cat=electronics
RewriteRule ^category/([a-zA-Z0-9-]+)$ /shop.php?cat=$1 [L]

# Rename a query parameter
# /search?q=test -> /search?query=test
RewriteCond %{QUERY_STRING} ^q=(.+)$
RewriteRule ^search$ /search?query=%1 [R=301,L]`}</code></pre>
      </div>

      {/* -- 5. Custom Error Pages ----------------------------------------- */}
      <div style={sectionStyle}>
        <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'var(--text-primary)' }}>{t.h2_error_pages}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_error_pages }} />

        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Custom error pages
# Place error page files in your document root

# 404 Not Found - page does not exist
ErrorDocument 404 /errors/404.html

# 403 Forbidden - access denied
ErrorDocument 403 /errors/403.html

# 500 Internal Server Error
ErrorDocument 500 /errors/500.html

# 401 Unauthorized - authentication required
ErrorDocument 401 /errors/401.html

# 503 Service Unavailable - maintenance mode
ErrorDocument 503 /errors/maintenance.html

# You can also use inline messages (not recommended for production)
# ErrorDocument 404 "Page not found. Please check the URL."

# Or redirect to an external URL
# ErrorDocument 404 https://example.com/not-found

# ── Maintenance mode (redirect all traffic to maintenance page) ──
# Uncomment during maintenance, recomment when done
# RewriteEngine On
# RewriteCond %{REMOTE_ADDR} !^123\\.456\\.789\\.000$  # Allow your IP
# RewriteCond %{REQUEST_URI} !/errors/maintenance.html$ [NC]
# RewriteCond %{REQUEST_URI} !\\.(css|js|png|jpg|gif|ico)$ [NC]
# RewriteRule ^(.*)$ /errors/maintenance.html [R=503,L]`}</code></pre>
      </div>

      {/* -- 6. Security Headers ------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'var(--text-primary)' }}>{t.h2_security_headers}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_security_headers }} />

        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Security headers via .htaccess
# Requires mod_headers to be enabled: a2enmod headers

<IfModule mod_headers.c>

  # X-Frame-Options: Prevent clickjacking by blocking iframes
  # Options: DENY | SAMEORIGIN | ALLOW-FROM uri
  Header always set X-Frame-Options "SAMEORIGIN"

  # X-Content-Type-Options: Prevent MIME-type sniffing
  Header always set X-Content-Type-Options "nosniff"

  # X-XSS-Protection: Enable browser XSS filter (legacy)
  Header always set X-XSS-Protection "1; mode=block"

  # Referrer-Policy: Control referrer information
  Header always set Referrer-Policy "strict-origin-when-cross-origin"

  # Content-Security-Policy: Control resource loading
  # Customize the sources based on your site's needs
  Header always set Content-Security-Policy "default-src 'self'; \\
    script-src 'self' 'unsafe-inline' https://cdn.example.com; \\
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; \\
    img-src 'self' data: https:; \\
    font-src 'self' https://fonts.gstatic.com; \\
    connect-src 'self' https://api.example.com; \\
    frame-ancestors 'self';"

  # Strict-Transport-Security (HSTS): Force HTTPS for 2 years
  # Only add this if your site fully supports HTTPS
  Header always set Strict-Transport-Security \\
    "max-age=63072000; includeSubDomains; preload"

  # Permissions-Policy: Disable unused browser features
  Header always set Permissions-Policy \\
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"

  # Remove X-Powered-By header (hides PHP/server version)
  Header unset X-Powered-By
  Header always unset X-Powered-By

</IfModule>

# Hide Apache version in server headers
ServerSignature Off`}</code></pre>
      </div>

      {/* -- 7. Browser Caching -------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'var(--text-primary)' }}>{t.h2_caching}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_caching }} />

        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Browser caching with mod_expires
# Enable the module: a2enmod expires

<IfModule mod_expires.c>
  ExpiresActive On

  # Default expiration: 1 month
  ExpiresDefault "access plus 1 month"

  # HTML files: short cache (content changes frequently)
  ExpiresByType text/html "access plus 1 hour"

  # CSS and JavaScript: long cache (use fingerprinted filenames)
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"

  # Images: cache for 1 month
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/avif "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"

  # Fonts: cache for 1 year
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType application/font-woff2 "access plus 1 year"
  ExpiresByType application/font-woff "access plus 1 year"

  # JSON/XML data: short cache
  ExpiresByType application/json "access plus 1 hour"
  ExpiresByType application/xml "access plus 1 hour"

  # PDF and documents
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>

# Alternative: Cache-Control headers with mod_headers
<IfModule mod_headers.c>
  # Immutable cache for fingerprinted assets
  <FilesMatch "\\.(js|css)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # Short cache for HTML
  <FilesMatch "\\.html$">
    Header set Cache-Control "public, max-age=3600, must-revalidate"
  </FilesMatch>

  # No cache for dynamic content
  <FilesMatch "\\.(php|cgi)$">
    Header set Cache-Control "no-store, no-cache, must-revalidate"
  </FilesMatch>
</IfModule>`}</code></pre>
      </div>

      {/* -- 8. Gzip / Brotli Compression ---------------------------------- */}
      <div style={sectionStyle}>
        <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'var(--text-primary)' }}>{t.h2_compression}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_compression }} />

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_gzip}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Gzip compression using mod_deflate
# Enable the module: a2enmod deflate

<IfModule mod_deflate.c>
  # Compress text-based content types
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/atom+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE application/ld+json
  AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
  AddOutputFilterByType DEFLATE font/opentype
  AddOutputFilterByType DEFLATE font/ttf
  AddOutputFilterByType DEFLATE font/woff
  AddOutputFilterByType DEFLATE font/woff2
  AddOutputFilterByType DEFLATE image/svg+xml
  AddOutputFilterByType DEFLATE image/x-icon

  # Do not compress images (already compressed)
  SetEnvIfNoCase Request_URI \\.(?:gif|jpe?g|png|webp|avif)$ no-gzip

  # Handle browser quirks
  BrowserMatch ^Mozilla/4 gzip-only-text/html
  BrowserMatch ^Mozilla/4\\.0[678] no-gzip
  BrowserMatch \\bMSIE !no-gzip !gzip-only-text/html

  # Add Vary header for proper caching
  Header append Vary Accept-Encoding
</IfModule>`}</code></pre>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_brotli}</h3>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# Brotli compression using mod_brotli (Apache 2.4.26+)
# Enable the module: a2enmod brotli

<IfModule mod_brotli.c>
  # Compress text-based content types with Brotli
  AddOutputFilterByType BROTLI_COMPRESS text/plain
  AddOutputFilterByType BROTLI_COMPRESS text/html
  AddOutputFilterByType BROTLI_COMPRESS text/xml
  AddOutputFilterByType BROTLI_COMPRESS text/css
  AddOutputFilterByType BROTLI_COMPRESS text/javascript
  AddOutputFilterByType BROTLI_COMPRESS application/xml
  AddOutputFilterByType BROTLI_COMPRESS application/xhtml+xml
  AddOutputFilterByType BROTLI_COMPRESS application/javascript
  AddOutputFilterByType BROTLI_COMPRESS application/json
  AddOutputFilterByType BROTLI_COMPRESS application/ld+json
  AddOutputFilterByType BROTLI_COMPRESS font/opentype
  AddOutputFilterByType BROTLI_COMPRESS font/ttf
  AddOutputFilterByType BROTLI_COMPRESS font/woff
  AddOutputFilterByType BROTLI_COMPRESS font/woff2
  AddOutputFilterByType BROTLI_COMPRESS image/svg+xml

  # Brotli compression quality (0-11, default: 11)
  # Lower = faster compression, larger files
  # Higher = slower compression, smaller files
  BrotliCompressionQuality 6

  # Brotli window size (10-24, default: 22)
  BrotliCompressionWindow 22
</IfModule>

# Fallback: Use Gzip if Brotli is not available
# Both modules can coexist; Apache serves Brotli to
# browsers that support it and Gzip to others.`}</code></pre>
      </div>

      {/* -- 9. Common Mistakes -------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'var(--text-primary)' }}>{t.h2_common_mistakes}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.p_common_mistakes}</p>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_infinite_loops}</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_infinite_loops }} />
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# BAD: Creates an infinite loop
# (The rewritten URL "/new" matches "^(.*)$" again)
RewriteRule ^(.*)$ /new/$1 [R=301]

# GOOD: Use RewriteCond to prevent the loop
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/new/ [NC]
RewriteRule ^(.*)$ /new/$1 [R=301,L]

# GOOD: Another approach - check if already redirected
RewriteEngine On
RewriteCond %{ENV:REDIRECT_STATUS} ^$
RewriteRule ^(.*)$ /new/$1 [R=301,L]`}</code></pre>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_wrong_rewritebase}</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_wrong_rewritebase }} />
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# If .htaccess is in the document root:
RewriteEngine On
RewriteBase /

# If .htaccess is in /blog/ subdirectory:
RewriteEngine On
RewriteBase /blog/

# If .htaccess is in /app/public/ subdirectory:
RewriteEngine On
RewriteBase /app/public/

# Common mistake: Using RewriteBase /blog when file is at root
# This causes all rewritten URLs to be prefixed with /blog`}</code></pre>

        <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.h3_rule_order}</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.p_rule_order }} />
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm" style={codeBlockStyle}><code>{`# BAD: General rule before specific rule
RewriteEngine On
RewriteRule ^(.*)$ /index.php?page=$1 [L]        # Catches everything!
RewriteRule ^about$ /about-us.html [R=301,L]      # Never reached!

# GOOD: Specific rules first, general rules last
RewriteEngine On
RewriteRule ^about$ /about-us.html [R=301,L]      # Specific: runs first
RewriteRule ^contact$ /contact-us.html [R=301,L]  # Specific: runs second
RewriteCond %{REQUEST_FILENAME} !-f                # Skip existing files
RewriteCond %{REQUEST_FILENAME} !-d                # Skip existing dirs
RewriteRule ^(.*)$ /index.php?page=$1 [L]          # General: fallback`}</code></pre>

        {/* Mistakes quick reference table */}
        <div style={{ overflowX: 'auto', marginTop: 24 }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{t.col_mistake}</th>
                <th style={thStyle}>{t.col_fix}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={codeTdStyle}>{t.mistake1}</td><td style={tdStyle}>{t.fix1}</td></tr>
              <tr><td style={codeTdStyle}>{t.mistake2}</td><td style={tdStyle}>{t.fix2}</td></tr>
              <tr><td style={codeTdStyle}>{t.mistake3}</td><td style={tdStyle}>{t.fix3}</td></tr>
              <tr><td style={codeTdStyle}>{t.mistake4}</td><td style={tdStyle}>{t.fix4}</td></tr>
              <tr><td style={codeTdStyle}>{t.mistake5}</td><td style={tdStyle}>{t.fix5}</td></tr>
              <tr><td style={codeTdStyle}>{t.mistake6}</td><td style={tdStyle}>{t.fix6}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* -- 10. FAQ ------------------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'var(--text-primary)' }}>{t.h2_faq}</h2>

        <div style={{ marginBottom: 20 }}>
          <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.faq1_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.faq1_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.faq2_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.faq2_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.faq3_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.faq3_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.faq4_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.faq4_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.faq5_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.faq5_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{t.faq6_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.faq6_a}</p>
        </div>
      </div>

      {/* -- Conclusion ---------------------------------------------------- */}
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 24 }}>{t.p_conclusion}</p>
    </>
  );
}
