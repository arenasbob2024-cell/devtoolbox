const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Next.js Middleware: Authentication, Redirects, and Rate Limiting',
    intro: 'Next.js Middleware runs before a request is completed, allowing you to modify the response by rewriting, redirecting, modifying headers, or returning directly. It executes on the Edge Runtime, making it incredibly fast for tasks like authentication checks, geo-based redirects, A/B testing, and rate limiting. This guide covers everything you need to know about Next.js middleware, from basic setup to advanced production patterns.',
    whatTitle: 'What Is Next.js Middleware?',
    whatDesc: 'Middleware is a function that runs before the request reaches your page or API route. It sits between the incoming request and your application, giving you the ability to inspect, modify, or short-circuit requests. Middleware runs on the Edge Runtime, meaning it executes at the CDN edge closest to the user for minimal latency.',
    setupTitle: 'Basic Middleware Setup',
    setupDesc: 'Create a middleware.ts (or middleware.js) file in the root of your project (at the same level as pages or app directory). The middleware function receives a NextRequest object and must return a NextResponse.',
    matcherTitle: 'Configuring the Matcher',
    matcherDesc: 'The matcher config determines which routes trigger the middleware. Without a matcher, middleware runs on every request including static files and images, which you usually want to avoid for performance.',
    authTitle: 'Authentication Middleware',
    authDesc: 'One of the most common uses of middleware is protecting routes that require authentication. You can check for session tokens, JWTs, or cookies and redirect unauthenticated users to a login page.',
    jwtTitle: 'JWT Token Verification',
    jwtDesc: 'For JWT-based authentication, you can verify tokens directly in middleware without hitting your API server. This provides fast, edge-level authentication.',
    sessionTitle: 'Session-Based Authentication',
    sessionDesc: 'For cookie-based sessions, middleware can validate the session cookie and redirect if the session is invalid or expired.',
    rbacTitle: 'Role-Based Access Control',
    rbacDesc: 'Middleware can enforce role-based access control by checking user roles from the token or session before allowing access to specific routes.',
    redirectTitle: 'Redirect Patterns',
    redirectDesc: 'Middleware is ideal for handling redirects based on various conditions like locale, geography, device type, or custom business rules.',
    geoTitle: 'Geo-Based Redirects',
    geoDesc: 'Next.js provides geolocation data in the request object on Vercel. Use this to redirect users to region-specific content or comply with regional regulations.',
    localeTitle: 'Locale Detection and Redirect',
    localeDesc: 'Automatically detect the user preferred language from the Accept-Language header and redirect to the appropriate locale route.',
    deviceTitle: 'Device-Based Routing',
    deviceDesc: 'Detect mobile, tablet, or desktop devices and serve different experiences.',
    rateLimitTitle: 'Rate Limiting',
    rateLimitDesc: 'Implement rate limiting at the edge to protect your API routes from abuse. While edge-based rate limiting has limitations compared to server-side solutions, it provides a fast first line of defense.',
    slidingWindowTitle: 'Sliding Window Rate Limiter',
    slidingWindowDesc: 'A more sophisticated approach uses a sliding window algorithm to smooth out rate limiting across time windows.',
    headersTitle: 'Response Headers and Security',
    headersDesc: 'Middleware is an excellent place to set security headers, CORS headers, and other response modifications that should apply across your application.',
    securityHeadersTitle: 'Security Headers',
    corsTitle: 'CORS Headers',
    corsDesc: 'Handle Cross-Origin Resource Sharing at the middleware level for consistent CORS policy across all API routes.',
    abTestTitle: 'A/B Testing with Middleware',
    abTestDesc: 'Middleware enables server-side A/B testing without client-side flickering. Assign users to test groups using cookies and rewrite to different page variants.',
    rewriteTitle: 'URL Rewriting',
    rewriteDesc: 'Rewrite URLs without changing what the user sees in the browser. This is useful for proxying requests, multitenancy, and clean URL structures.',
    chainingTitle: 'Chaining Multiple Middleware',
    chainingDesc: 'Since Next.js only supports a single middleware file, you can chain multiple middleware functions by composing them.',
    edgeTitle: 'Edge Runtime Limitations',
    edgeDesc: 'Middleware runs on the Edge Runtime, which has some limitations compared to Node.js. Understanding these constraints is important for writing effective middleware.',
    edge1: 'No access to the filesystem (fs module)',
    edge2: 'No native Node.js modules (child_process, crypto with some APIs)',
    edge3: 'Limited to Web APIs (fetch, Request, Response, Headers, URL)',
    edge4: 'Bundle size limit of 1MB (on Vercel)',
    edge5: 'No database connections (use fetch to call API routes instead)',
    edge6: 'Limited execution time (typically 25ms on Vercel, configurable)',
    debugTitle: 'Debugging Middleware',
    debugDesc: 'Debugging middleware can be tricky since it runs in the Edge Runtime. Use these techniques to inspect and troubleshoot your middleware.',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Keep middleware lightweight — it runs on every matched request.',
    bp2: 'Use the matcher config to exclude static files and images.',
    bp3: 'Avoid database calls in middleware — use fetch to call API routes instead.',
    bp4: 'Set appropriate cache headers for redirects.',
    bp5: 'Use cookies for A/B test persistence, not query parameters.',
    bp6: 'Implement proper error handling — a crashing middleware blocks all requests.',
    bp7: 'Test middleware with different request scenarios (authenticated, unauthenticated, different locales).',
    bp8: 'Use environment variables for configuration, not hardcoded values.',
    conclusionTitle: 'Conclusion',
    conclusionText: 'Next.js Middleware is a powerful tool that runs at the edge, enabling fast authentication checks, intelligent redirects, rate limiting, A/B testing, and security header management. By executing before your application code, middleware provides a centralized place to handle cross-cutting concerns without duplicating logic across pages and API routes. Keep your middleware lean, use the matcher to target specific routes, and leverage the Edge Runtime capabilities for maximum performance. With the patterns covered in this guide, you can build production-ready middleware that handles authentication, geolocation, rate limiting, and more.',
    faqTitle: 'FAQ',
    faq1q: 'Does Next.js middleware run on every request?',
    faq1a: 'By default yes, but you should use the matcher config to limit it to specific routes. Without a matcher, middleware runs on all requests including static assets, which hurts performance.',
    faq2q: 'Can I use a database in Next.js middleware?',
    faq2a: 'Not directly. Middleware runs on the Edge Runtime which does not support traditional database connections. Instead, use fetch to call an API route that accesses the database, or use edge-compatible databases like PlanetScale or Upstash.',
    faq3q: 'What is the difference between middleware redirect and rewrite?',
    faq3a: 'A redirect (NextResponse.redirect) changes the URL in the browser and sends a 307/308 status code. A rewrite (NextResponse.rewrite) serves content from a different URL without changing the browser URL — the user does not see the rewrite.',
    faq4q: 'How do I handle errors in middleware?',
    faq4a: 'Wrap your middleware logic in a try-catch block and return an appropriate response on error. An unhandled error in middleware will block all requests to matched routes. Consider returning NextResponse.next() as a fallback to let the request proceed.',
  },
  zh: {
    title: 'Next.js 中间件：认证、重定向和速率限制',
    intro: 'Next.js 中间件在请求完成之前运行，允许你通过重写、重定向、修改请求头或直接返回响应来修改响应。它在 Edge Runtime 上执行，对于认证检查、基于地理位置的重定向、A/B 测试和速率限制等任务非常快速。',
    whatTitle: '什么是 Next.js 中间件？',
    whatDesc: '中间件是在请求到达页面或 API 路由之前运行的函数。它运行在 Edge Runtime 上，在最近的 CDN 边缘执行。',
    setupTitle: '基本中间件设置', setupDesc: '在项目根目录创建 middleware.ts 文件。',
    matcherTitle: '配置匹配器', matcherDesc: 'matcher 配置决定哪些路由触发中间件。',
    authTitle: '认证中间件', authDesc: '中间件最常见的用途之一是保护需要认证的路由。',
    jwtTitle: 'JWT 令牌验证', jwtDesc: '在中间件中直接验证 JWT 令牌，提供边缘级认证。',
    sessionTitle: '基于会话的认证', sessionDesc: '验证会话 cookie 并在无效时重定向。',
    rbacTitle: '基于角色的访问控制', rbacDesc: '中间件可以通过检查用户角色来执行访问控制。',
    redirectTitle: '重定向模式', redirectDesc: '中间件非常适合基于各种条件处理重定向。',
    geoTitle: '基于地理位置的重定向', geoDesc: '使用请求中的地理位置数据重定向用户。',
    localeTitle: '语言检测和重定向', localeDesc: '自动检测用户首选语言并重定向到相应的语言路由。',
    deviceTitle: '基于设备的路由', deviceDesc: '检测移动端、平板或桌面设备并提供不同体验。',
    rateLimitTitle: '速率限制', rateLimitDesc: '在边缘实现速率限制以保护 API 路由。',
    slidingWindowTitle: '滑动窗口速率限制器', slidingWindowDesc: '使用滑动窗口算法平滑速率限制。',
    headersTitle: '响应头和安全性', headersDesc: '中间件是设置安全头的理想位置。',
    securityHeadersTitle: '安全头',
    corsTitle: 'CORS 头', corsDesc: '在中间件级别处理跨域资源共享。',
    abTestTitle: 'A/B 测试', abTestDesc: '中间件支持无闪烁的服务端 A/B 测试。',
    rewriteTitle: 'URL 重写', rewriteDesc: '在不改变浏览器 URL 的情况下重写 URL。',
    chainingTitle: '链式中间件', chainingDesc: '通过组合多个中间件函数来链接它们。',
    edgeTitle: 'Edge Runtime 限制', edgeDesc: '中间件运行在 Edge Runtime 上，有一些限制。',
    edge1: '无文件系统访问', edge2: '无原生 Node.js 模块', edge3: '仅限 Web API',
    edge4: '包大小限制 1MB', edge5: '无数据库连接', edge6: '执行时间限制',
    debugTitle: '调试中间件', debugDesc: '使用这些技术来检查和排查中间件问题。',
    bestPracticesTitle: '最佳实践',
    bp1: '保持中间件轻量。', bp2: '使用 matcher 排除静态文件。', bp3: '避免在中间件中调用数据库。',
    bp4: '设置适当的缓存头。', bp5: '使用 cookie 持久化 A/B 测试。', bp6: '实现错误处理。',
    bp7: '测试不同请求场景。', bp8: '使用环境变量配置。',
    conclusionTitle: '总结',
    conclusionText: 'Next.js 中间件是在边缘运行的强大工具，可实现快速认证检查、智能重定向、速率限制、A/B 测试和安全头管理。保持中间件精简，使用 matcher 定向特定路由，充分利用 Edge Runtime 能力以获得最佳性能。',
    faqTitle: '常见问题',
    faq1q: 'Next.js 中间件会在每个请求上运行吗？', faq1a: '默认是的，但应使用 matcher 限制到特定路由。',
    faq2q: '可以在中间件中使用数据库吗？', faq2a: '不能直接使用。使用 fetch 调用 API 路由或使用边缘兼容数据库。',
    faq3q: '中间件的 redirect 和 rewrite 有什么区别？', faq3a: 'redirect 改变浏览器 URL，rewrite 不改变浏览器 URL 但提供不同内容。',
    faq4q: '如何处理中间件中的错误？', faq4a: '使用 try-catch 包装逻辑，错误时返回适当响应。',
  },
  ja: {
    title: 'Next.js ミドルウェア：認証、リダイレクト、レート制限',
    intro: 'Next.js ミドルウェアはリクエスト完了前に実行され、Edge Runtime で動作するため、認証チェック、ジオリダイレクト、A/Bテスト、レート制限に最適です。',
    whatTitle: 'Next.js ミドルウェアとは？', whatDesc: 'ミドルウェアはリクエストがページに到達する前に実行される関数です。',
    setupTitle: '基本セットアップ', setupDesc: 'プロジェクトルートに middleware.ts を作成します。',
    matcherTitle: 'Matcher の設定', matcherDesc: 'matcher はどのルートでミドルウェアが実行されるかを決定します。',
    authTitle: '認証ミドルウェア', authDesc: '認証が必要なルートの保護に最も一般的に使用されます。',
    jwtTitle: 'JWT トークン検証', jwtDesc: 'ミドルウェアで JWT を直接検証します。',
    sessionTitle: 'セッションベースの認証', sessionDesc: 'セッション Cookie を検証してリダイレクトします。',
    rbacTitle: 'ロールベースのアクセス制御', rbacDesc: 'ユーザーロールに基づくアクセス制御を実施します。',
    redirectTitle: 'リダイレクトパターン', redirectDesc: 'さまざまな条件に基づくリダイレクトに最適です。',
    geoTitle: '地理ベースのリダイレクト', geoDesc: 'ジオロケーションデータでユーザーをリダイレクトします。',
    localeTitle: 'ロケール検出とリダイレクト', localeDesc: 'ユーザーの言語設定を検出してリダイレクトします。',
    deviceTitle: 'デバイスベースのルーティング', deviceDesc: 'モバイル、タブレット、デスクトップを検出します。',
    rateLimitTitle: 'レート制限', rateLimitDesc: 'エッジでのレート制限を実装します。',
    slidingWindowTitle: 'スライディングウィンドウ', slidingWindowDesc: 'スライディングウィンドウアルゴリズムを使用します。',
    headersTitle: 'レスポンスヘッダーとセキュリティ', headersDesc: 'セキュリティヘッダーの設定に最適な場所です。',
    securityHeadersTitle: 'セキュリティヘッダー',
    corsTitle: 'CORS ヘッダー', corsDesc: 'ミドルウェアレベルで CORS を処理します。',
    abTestTitle: 'A/B テスト', abTestDesc: 'ちらつきのないサーバーサイド A/B テストを実現します。',
    rewriteTitle: 'URL リライト', rewriteDesc: 'ブラウザの URL を変更せずにリライトします。',
    chainingTitle: 'ミドルウェアの連鎖', chainingDesc: '複数のミドルウェア関数を合成します。',
    edgeTitle: 'Edge Runtime の制限', edgeDesc: 'Edge Runtime にはいくつかの制限があります。',
    edge1: 'ファイルシステムアクセス不可', edge2: 'ネイティブ Node.js モジュール不可', edge3: 'Web API のみ',
    edge4: 'バンドルサイズ制限 1MB', edge5: 'データベース接続不可', edge6: '実行時間制限',
    debugTitle: 'ミドルウェアのデバッグ', debugDesc: 'デバッグテクニックを紹介します。',
    bestPracticesTitle: 'ベストプラクティス',
    bp1: 'ミドルウェアを軽量に。', bp2: '静的ファイルを除外。', bp3: 'DB 呼び出しを避ける。',
    bp4: 'キャッシュヘッダーを設定。', bp5: 'A/B テストに Cookie を使用。', bp6: 'エラーハンドリングを実装。',
    bp7: '異なるシナリオをテスト。', bp8: '環境変数を使用。',
    conclusionTitle: '結論',
    conclusionText: 'Next.js ミドルウェアはエッジで動作する強力なツールです。認証、リダイレクト、レート制限などのパターンをマスターしましょう。',
    faqTitle: 'FAQ',
    faq1q: 'ミドルウェアはすべてのリクエストで実行される？', faq1a: 'デフォルトではそうですが、matcher で制限すべきです。',
    faq2q: 'ミドルウェアでデータベースを使える？', faq2a: '直接は不可。fetch で API ルートを呼び出してください。',
    faq3q: 'redirect と rewrite の違いは？', faq3a: 'redirect は URL を変更、rewrite は URL を変更せずにコンテンツを変更。',
    faq4q: 'ミドルウェアのエラー処理は？', faq4a: 'try-catch でラップし、エラー時は適切なレスポンスを返します。',
  },
  ko: {
    title: 'Next.js 미들웨어: 인증, 리다이렉트, 속도 제한',
    intro: 'Next.js 미들웨어는 요청 완료 전에 실행되어 Edge Runtime에서 동작하므로, 인증 체크, 지역 기반 리다이렉트, A/B 테스트, 속도 제한에 최적입니다.',
    whatTitle: 'Next.js 미들웨어란?', whatDesc: '미들웨어는 요청이 페이지에 도달하기 전에 실행되는 함수입니다.',
    setupTitle: '기본 미들웨어 설정', setupDesc: '프로젝트 루트에 middleware.ts 파일을 생성합니다.',
    matcherTitle: 'Matcher 구성', matcherDesc: 'matcher는 어떤 라우트에서 미들웨어가 실행될지 결정합니다.',
    authTitle: '인증 미들웨어', authDesc: '인증이 필요한 라우트를 보호하는 가장 일반적인 용도입니다.',
    jwtTitle: 'JWT 토큰 검증', jwtDesc: '미들웨어에서 JWT를 직접 검증합니다.',
    sessionTitle: '세션 기반 인증', sessionDesc: '세션 쿠키를 검증하고 리다이렉트합니다.',
    rbacTitle: '역할 기반 접근 제어', rbacDesc: '사용자 역할에 기반한 접근 제어를 시행합니다.',
    redirectTitle: '리다이렉트 패턴', redirectDesc: '다양한 조건에 기반한 리다이렉트에 적합합니다.',
    geoTitle: '지역 기반 리다이렉트', geoDesc: '지리적 위치 데이터로 사용자를 리다이렉트합니다.',
    localeTitle: '로케일 감지 및 리다이렉트', localeDesc: '사용자 언어 설정을 감지하여 리다이렉트합니다.',
    deviceTitle: '디바이스 기반 라우팅', deviceDesc: '모바일, 태블릿, 데스크톱을 감지합니다.',
    rateLimitTitle: '속도 제한', rateLimitDesc: '엣지에서 속도 제한을 구현합니다.',
    slidingWindowTitle: '슬라이딩 윈도우', slidingWindowDesc: '슬라이딩 윈도우 알고리즘을 사용합니다.',
    headersTitle: '응답 헤더 및 보안', headersDesc: '보안 헤더를 설정하기에 최적의 장소입니다.',
    securityHeadersTitle: '보안 헤더',
    corsTitle: 'CORS 헤더', corsDesc: '미들웨어 수준에서 CORS를 처리합니다.',
    abTestTitle: 'A/B 테스트', abTestDesc: '깜빡임 없는 서버 사이드 A/B 테스트를 구현합니다.',
    rewriteTitle: 'URL 리라이트', rewriteDesc: '브라우저 URL을 변경하지 않고 리라이트합니다.',
    chainingTitle: '미들웨어 체이닝', chainingDesc: '여러 미들웨어 함수를 조합합니다.',
    edgeTitle: 'Edge Runtime 제한', edgeDesc: 'Edge Runtime에는 몇 가지 제한이 있습니다.',
    edge1: '파일 시스템 접근 불가', edge2: '네이티브 Node.js 모듈 불가', edge3: 'Web API만 사용 가능',
    edge4: '번들 크기 제한 1MB', edge5: '데이터베이스 연결 불가', edge6: '실행 시간 제한',
    debugTitle: '미들웨어 디버깅', debugDesc: '디버깅 기법을 소개합니다.',
    bestPracticesTitle: '모범 사례',
    bp1: '미들웨어를 가볍게 유지.', bp2: '정적 파일 제외.', bp3: 'DB 호출 피하기.',
    bp4: '캐시 헤더 설정.', bp5: 'A/B 테스트에 쿠키 사용.', bp6: '에러 핸들링 구현.',
    bp7: '다양한 시나리오 테스트.', bp8: '환경 변수 사용.',
    conclusionTitle: '결론',
    conclusionText: 'Next.js 미들웨어는 엣지에서 동작하는 강력한 도구입니다. 인증, 리다이렉트, 속도 제한 등의 패턴을 마스터하세요.',
    faqTitle: 'FAQ',
    faq1q: '미들웨어는 모든 요청에서 실행되나요?', faq1a: '기본적으로 그렇지만 matcher로 제한해야 합니다.',
    faq2q: '미들웨어에서 데이터베이스를 사용할 수 있나요?', faq2a: '직접은 불가합니다. fetch로 API 라우트를 호출하세요.',
    faq3q: 'redirect와 rewrite의 차이는?', faq3a: 'redirect는 URL을 변경하고, rewrite는 URL을 변경하지 않고 콘텐츠를 변경합니다.',
    faq4q: '미들웨어 에러 처리는?', faq4a: 'try-catch로 감싸고 에러 시 적절한 응답을 반환합니다.',
  },
  fr: {
    title: 'Next.js Middleware : Authentification, redirections et limitation de débit',
    intro: 'Le middleware Next.js s\'exécute avant qu\'une requête ne soit terminée, sur l\'Edge Runtime, idéal pour l\'authentification, les redirections géographiques, les tests A/B et la limitation de débit.',
    whatTitle: 'Qu\'est-ce que le Middleware Next.js ?', whatDesc: 'Le middleware est une fonction qui s\'exécute avant que la requête n\'atteigne votre page.',
    setupTitle: 'Configuration de base', setupDesc: 'Créez un fichier middleware.ts à la racine de votre projet.',
    matcherTitle: 'Configuration du Matcher', matcherDesc: 'Le matcher détermine quelles routes déclenchent le middleware.',
    authTitle: 'Middleware d\'authentification', authDesc: 'Protection des routes nécessitant une authentification.',
    jwtTitle: 'Vérification JWT', jwtDesc: 'Vérifiez les tokens JWT directement dans le middleware.',
    sessionTitle: 'Authentification par session', sessionDesc: 'Validez les cookies de session.',
    rbacTitle: 'Contrôle d\'accès par rôle', rbacDesc: 'Contrôle d\'accès basé sur les rôles utilisateur.',
    redirectTitle: 'Modèles de redirection', redirectDesc: 'Idéal pour les redirections conditionnelles.',
    geoTitle: 'Redirections géographiques', geoDesc: 'Redirigez les utilisateurs selon leur géolocalisation.',
    localeTitle: 'Détection de locale', localeDesc: 'Détectez la langue préférée et redirigez.',
    deviceTitle: 'Routage par appareil', deviceDesc: 'Détectez mobile, tablette ou desktop.',
    rateLimitTitle: 'Limitation de débit', rateLimitDesc: 'Implémentez la limitation de débit en bordure.',
    slidingWindowTitle: 'Fenêtre glissante', slidingWindowDesc: 'Algorithme de fenêtre glissante pour lisser la limitation.',
    headersTitle: 'En-têtes et sécurité', headersDesc: 'Endroit idéal pour les en-têtes de sécurité.',
    securityHeadersTitle: 'En-têtes de sécurité',
    corsTitle: 'En-têtes CORS', corsDesc: 'Gérez CORS au niveau du middleware.',
    abTestTitle: 'Tests A/B', abTestDesc: 'Tests A/B côté serveur sans scintillement.',
    rewriteTitle: 'Réécriture d\'URL', rewriteDesc: 'Réécrivez sans changer l\'URL du navigateur.',
    chainingTitle: 'Chaînage de middleware', chainingDesc: 'Composez plusieurs fonctions middleware.',
    edgeTitle: 'Limitations Edge Runtime', edgeDesc: 'L\'Edge Runtime a certaines limitations.',
    edge1: 'Pas d\'accès fichier', edge2: 'Pas de modules Node.js natifs', edge3: 'Web APIs uniquement',
    edge4: 'Taille bundle limitée à 1MB', edge5: 'Pas de connexions DB', edge6: 'Temps d\'exécution limité',
    debugTitle: 'Débogage', debugDesc: 'Techniques de débogage pour le middleware.',
    bestPracticesTitle: 'Bonnes pratiques',
    bp1: 'Gardez le middleware léger.', bp2: 'Excluez les fichiers statiques.', bp3: 'Évitez les appels DB.',
    bp4: 'Définissez les en-têtes de cache.', bp5: 'Cookies pour A/B.', bp6: 'Gestion d\'erreurs.',
    bp7: 'Testez différents scénarios.', bp8: 'Variables d\'environnement.',
    conclusionTitle: 'Conclusion',
    conclusionText: 'Le middleware Next.js est un outil puissant en bordure. Maîtrisez ces modèles pour une application robuste.',
    faqTitle: 'FAQ',
    faq1q: 'Le middleware s\'exécute-t-il à chaque requête ?', faq1a: 'Par défaut oui, utilisez le matcher pour limiter.',
    faq2q: 'Peut-on utiliser une base de données ?', faq2a: 'Pas directement. Utilisez fetch vers une route API.',
    faq3q: 'Différence entre redirect et rewrite ?', faq3a: 'Redirect change l\'URL du navigateur, rewrite non.',
    faq4q: 'Comment gérer les erreurs ?', faq4a: 'Utilisez try-catch et retournez une réponse appropriée.',
  },
  de: {
    title: 'Next.js Middleware: Authentifizierung, Weiterleitungen und Rate Limiting',
    intro: 'Next.js Middleware läuft vor Abschluss eines Requests auf der Edge Runtime und ist ideal für Authentifizierung, Geo-Redirects, A/B-Tests und Rate Limiting.',
    whatTitle: 'Was ist Next.js Middleware?', whatDesc: 'Middleware ist eine Funktion, die vor dem Erreichen Ihrer Seite ausgeführt wird.',
    setupTitle: 'Grundlegende Einrichtung', setupDesc: 'Erstellen Sie eine middleware.ts im Projektstamm.',
    matcherTitle: 'Matcher-Konfiguration', matcherDesc: 'Der Matcher bestimmt, welche Routen die Middleware auslösen.',
    authTitle: 'Authentifizierungs-Middleware', authDesc: 'Schutz von Routen, die Authentifizierung erfordern.',
    jwtTitle: 'JWT-Token-Verifizierung', jwtDesc: 'JWT-Tokens direkt in der Middleware verifizieren.',
    sessionTitle: 'Session-basierte Authentifizierung', sessionDesc: 'Session-Cookies validieren.',
    rbacTitle: 'Rollenbasierte Zugriffskontrolle', rbacDesc: 'Zugriffskontrolle basierend auf Benutzerrollen.',
    redirectTitle: 'Weiterleitungsmuster', redirectDesc: 'Ideal für bedingte Weiterleitungen.',
    geoTitle: 'Geo-basierte Weiterleitungen', geoDesc: 'Benutzer basierend auf Geolokation weiterleiten.',
    localeTitle: 'Spracherkennung', localeDesc: 'Bevorzugte Sprache erkennen und weiterleiten.',
    deviceTitle: 'Gerätebasiertes Routing', deviceDesc: 'Mobil, Tablet oder Desktop erkennen.',
    rateLimitTitle: 'Rate Limiting', rateLimitDesc: 'Rate Limiting am Edge implementieren.',
    slidingWindowTitle: 'Sliding Window', slidingWindowDesc: 'Sliding-Window-Algorithmus verwenden.',
    headersTitle: 'Response-Header und Sicherheit', headersDesc: 'Idealer Ort für Sicherheitsheader.',
    securityHeadersTitle: 'Sicherheitsheader',
    corsTitle: 'CORS-Header', corsDesc: 'CORS auf Middleware-Ebene behandeln.',
    abTestTitle: 'A/B-Tests', abTestDesc: 'Serverseitige A/B-Tests ohne Flackern.',
    rewriteTitle: 'URL-Rewriting', rewriteDesc: 'URLs umschreiben ohne Browser-URL zu ändern.',
    chainingTitle: 'Middleware-Verkettung', chainingDesc: 'Mehrere Middleware-Funktionen zusammensetzen.',
    edgeTitle: 'Edge Runtime Einschränkungen', edgeDesc: 'Die Edge Runtime hat einige Einschränkungen.',
    edge1: 'Kein Dateisystemzugriff', edge2: 'Keine nativen Node.js-Module', edge3: 'Nur Web APIs',
    edge4: 'Bundle-Größe auf 1MB begrenzt', edge5: 'Keine DB-Verbindungen', edge6: 'Begrenzte Ausführungszeit',
    debugTitle: 'Debugging', debugDesc: 'Debugging-Techniken für Middleware.',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Middleware leichtgewichtig halten.', bp2: 'Statische Dateien ausschließen.', bp3: 'DB-Aufrufe vermeiden.',
    bp4: 'Cache-Header setzen.', bp5: 'Cookies für A/B-Tests.', bp6: 'Fehlerbehandlung implementieren.',
    bp7: 'Verschiedene Szenarien testen.', bp8: 'Umgebungsvariablen verwenden.',
    conclusionTitle: 'Fazit',
    conclusionText: 'Next.js Middleware ist ein mächtiges Edge-Tool. Meistern Sie diese Muster für robuste Anwendungen.',
    faqTitle: 'FAQ',
    faq1q: 'Wird Middleware bei jedem Request ausgeführt?', faq1a: 'Standardmäßig ja, verwenden Sie den Matcher zur Einschränkung.',
    faq2q: 'Kann man eine Datenbank in Middleware nutzen?', faq2a: 'Nicht direkt. Verwenden Sie fetch zu einer API-Route.',
    faq3q: 'Unterschied zwischen redirect und rewrite?', faq3a: 'Redirect ändert die Browser-URL, Rewrite nicht.',
    faq4q: 'Wie Fehler in Middleware behandeln?', faq4a: 'Mit try-catch umschließen und passende Antwort zurückgeben.',
  },
  es: {
    title: 'Next.js Middleware: Autenticación, redirecciones y limitación de velocidad',
    intro: 'El middleware de Next.js se ejecuta antes de que una solicitud se complete, en el Edge Runtime, ideal para autenticación, redirecciones geográficas, pruebas A/B y limitación de velocidad.',
    whatTitle: '¿Qué es el Middleware de Next.js?', whatDesc: 'El middleware es una función que se ejecuta antes de que la solicitud llegue a tu página.',
    setupTitle: 'Configuración básica', setupDesc: 'Crea un archivo middleware.ts en la raíz del proyecto.',
    matcherTitle: 'Configuración del Matcher', matcherDesc: 'El matcher determina qué rutas activan el middleware.',
    authTitle: 'Middleware de autenticación', authDesc: 'Proteger rutas que requieren autenticación.',
    jwtTitle: 'Verificación de JWT', jwtDesc: 'Verificar tokens JWT directamente en el middleware.',
    sessionTitle: 'Autenticación basada en sesión', sessionDesc: 'Validar cookies de sesión.',
    rbacTitle: 'Control de acceso basado en roles', rbacDesc: 'Control de acceso según roles de usuario.',
    redirectTitle: 'Patrones de redirección', redirectDesc: 'Ideal para redirecciones condicionales.',
    geoTitle: 'Redirecciones geográficas', geoDesc: 'Redirigir usuarios según su geolocalización.',
    localeTitle: 'Detección de idioma', localeDesc: 'Detectar idioma preferido y redirigir.',
    deviceTitle: 'Enrutamiento por dispositivo', deviceDesc: 'Detectar móvil, tablet o escritorio.',
    rateLimitTitle: 'Limitación de velocidad', rateLimitDesc: 'Implementar limitación en el borde.',
    slidingWindowTitle: 'Ventana deslizante', slidingWindowDesc: 'Algoritmo de ventana deslizante.',
    headersTitle: 'Encabezados y seguridad', headersDesc: 'Lugar ideal para encabezados de seguridad.',
    securityHeadersTitle: 'Encabezados de seguridad',
    corsTitle: 'Encabezados CORS', corsDesc: 'Manejar CORS a nivel de middleware.',
    abTestTitle: 'Pruebas A/B', abTestDesc: 'Pruebas A/B del lado del servidor sin parpadeo.',
    rewriteTitle: 'Reescritura de URL', rewriteDesc: 'Reescribir sin cambiar la URL del navegador.',
    chainingTitle: 'Encadenamiento de middleware', chainingDesc: 'Componer múltiples funciones middleware.',
    edgeTitle: 'Limitaciones del Edge Runtime', edgeDesc: 'El Edge Runtime tiene algunas limitaciones.',
    edge1: 'Sin acceso al sistema de archivos', edge2: 'Sin módulos nativos Node.js', edge3: 'Solo Web APIs',
    edge4: 'Límite de bundle 1MB', edge5: 'Sin conexiones DB', edge6: 'Tiempo de ejecución limitado',
    debugTitle: 'Depuración', debugDesc: 'Técnicas de depuración para middleware.',
    bestPracticesTitle: 'Mejores prácticas',
    bp1: 'Mantener el middleware ligero.', bp2: 'Excluir archivos estáticos.', bp3: 'Evitar llamadas a DB.',
    bp4: 'Configurar encabezados de caché.', bp5: 'Cookies para A/B.', bp6: 'Implementar manejo de errores.',
    bp7: 'Probar diferentes escenarios.', bp8: 'Usar variables de entorno.',
    conclusionTitle: 'Conclusión',
    conclusionText: 'El middleware de Next.js es una herramienta poderosa en el borde. Domine estos patrones para aplicaciones robustas.',
    faqTitle: 'FAQ',
    faq1q: '¿El middleware se ejecuta en cada solicitud?', faq1a: 'Por defecto sí, use el matcher para limitar.',
    faq2q: '¿Se puede usar una base de datos?', faq2a: 'No directamente. Use fetch a una ruta API.',
    faq3q: '¿Diferencia entre redirect y rewrite?', faq3a: 'Redirect cambia la URL del navegador, rewrite no.',
    faq4q: '¿Cómo manejar errores?', faq4a: 'Envolver en try-catch y devolver una respuesta apropiada.',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 };

export default function NextjsMiddlewareGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <article style={{ maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={pStyle}>{t.intro}</p>

      {/* What Is Middleware */}
      <h2 style={h2Style}>{t.whatTitle}</h2>
      <p style={pStyle}>{t.whatDesc}</p>
      <pre style={codeStyle}><code>{`// Request flow in Next.js
//
// Client Request
//     │
//     ▼
// ┌─────────────┐
// │  Middleware  │  ← Runs here (Edge Runtime)
// └─────────────┘
//     │
//     ▼
// ┌─────────────┐
// │  Page/API    │  ← Your application code
// └─────────────┘
//     │
//     ▼
// Client Response`}</code></pre>

      {/* Basic Setup */}
      <h2 style={h2Style}>{t.setupTitle}</h2>
      <p style={pStyle}>{t.setupDesc}</p>
      <pre style={codeStyle}><code>{`// middleware.ts (project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Log every request
  console.log(\`[\${request.method}] \${request.nextUrl.pathname}\`);

  // Continue to the next handler
  return NextResponse.next();
}

// Only run on specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};`}</code></pre>

      {/* Matcher */}
      <h2 style={h2Style}>{t.matcherTitle}</h2>
      <p style={pStyle}>{t.matcherDesc}</p>
      <pre style={codeStyle}><code>{`// Match specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*'],
};

// Match all routes except static files and API
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// Multiple matchers with different patterns
export const config = {
  matcher: [
    '/dashboard/:path*',     // All dashboard routes
    '/admin/:path*',         // All admin routes
    '/api/protected/:path*', // Protected API routes
    '/profile',              // Exact match
  ],
};

// Conditional matching with has/missing (Next.js 13.1+)
export const config = {
  matcher: [
    {
      source: '/api/:path*',
      has: [
        { type: 'header', key: 'authorization' },
      ],
    },
  ],
};`}</code></pre>

      {/* Authentication */}
      <h2 style={h2Style}>{t.authTitle}</h2>
      <p style={pStyle}>{t.authDesc}</p>

      <h3 style={h3Style}>{t.jwtTitle}</h3>
      <p style={pStyle}>{t.jwtDesc}</p>
      <pre style={codeStyle}><code>{`// middleware.ts — JWT Authentication
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET!
);

const PUBLIC_PATHS = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public paths
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get token from cookie or Authorization header
  const token =
    request.cookies.get('auth-token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    // Redirect to login with return URL
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Add user info to headers for downstream use
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.sub as string);
    response.headers.set('x-user-role', payload.role as string);
    return response;
  } catch (error) {
    // Token expired or invalid — redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('auth-token');
    return response;
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*', '/api/protected/:path*'],
};`}</code></pre>

      <h3 style={h3Style}>{t.rbacTitle}</h3>
      <p style={pStyle}>{t.rbacDesc}</p>
      <pre style={codeStyle}><code>{`// Role-based access control in middleware
const ROUTE_PERMISSIONS: Record<string, string[]> = {
  '/admin':        ['admin'],
  '/dashboard':    ['admin', 'editor', 'viewer'],
  '/editor':       ['admin', 'editor'],
  '/api/admin':    ['admin'],
};

function hasPermission(pathname: string, role: string): boolean {
  for (const [route, roles] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(route)) {
      return roles.includes(role);
    }
  }
  return true; // No restriction for unmatched routes
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', request.url));

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;
    const { pathname } = request.nextUrl;

    if (!hasPermission(pathname, role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}`}</code></pre>

      {/* Redirects */}
      <h2 style={h2Style}>{t.redirectTitle}</h2>
      <p style={pStyle}>{t.redirectDesc}</p>

      <h3 style={h3Style}>{t.geoTitle}</h3>
      <p style={pStyle}>{t.geoDesc}</p>
      <pre style={codeStyle}><code>{`// Geo-based redirect (Vercel Edge)
export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US';
  const city = request.geo?.city || 'Unknown';

  // Redirect EU users to GDPR-compliant page
  const EU_COUNTRIES = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI',
    'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU',
    'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  ];

  if (EU_COUNTRIES.includes(country) &&
      request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/eu', request.url));
  }

  // Add geo headers for downstream use
  const response = NextResponse.next();
  response.headers.set('x-country', country);
  response.headers.set('x-city', city);
  return response;
}`}</code></pre>

      <h3 style={h3Style}>{t.localeTitle}</h3>
      <p style={pStyle}>{t.localeDesc}</p>
      <pre style={codeStyle}><code>{`// Locale detection middleware
const SUPPORTED_LOCALES = ['en', 'fr', 'de', 'es', 'ja', 'ko', 'zh'];
const DEFAULT_LOCALE = 'en';

function getPreferredLocale(request: NextRequest): string {
  // Check cookie first (user preference)
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Parse Accept-Language header
  const acceptLang = request.headers.get('accept-language') || '';
  const preferred = acceptLang
    .split(',')
    .map(lang => lang.split(';')[0].trim().substring(0, 2))
    .find(lang => SUPPORTED_LOCALES.includes(lang));

  return preferred || DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if locale is already in the path
  const hasLocale = SUPPORTED_LOCALES.some(
    locale => pathname.startsWith(\`/\${locale}/\`) || pathname === \`/\${locale}\`
  );

  if (hasLocale) return NextResponse.next();

  // Redirect to locale-prefixed path
  const locale = getPreferredLocale(request);
  const url = new URL(\`/\${locale}\${pathname}\`, request.url);
  return NextResponse.redirect(url);
}`}</code></pre>

      {/* Rate Limiting */}
      <h2 style={h2Style}>{t.rateLimitTitle}</h2>
      <p style={pStyle}>{t.rateLimitDesc}</p>
      <pre style={codeStyle}><code>{`// Simple rate limiting with in-memory store
// Note: This works per-edge-node; use Redis for distributed rate limiting

const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 100;       // requests
const RATE_WINDOW = 60 * 1000; // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  record.count++;
  return record.count > RATE_LIMIT;
}

export function middleware(request: NextRequest) {
  // Only rate-limit API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
             request.ip ||
             '127.0.0.1';

  if (isRateLimited(ip)) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }
    );
  }

  return NextResponse.next();
}`}</code></pre>

      <h3 style={h3Style}>{t.slidingWindowTitle}</h3>
      <p style={pStyle}>{t.slidingWindowDesc}</p>
      <pre style={codeStyle}><code>{`// Rate limiting with Upstash Redis (production-ready)
// npm install @upstash/ratelimit @upstash/redis

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
  analytics: true,
  prefix: 'api-ratelimit',
});

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = request.ip ?? '127.0.0.1';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  const response = success
    ? NextResponse.next()
    : new NextResponse(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });

  // Always set rate limit headers
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', reset.toString());

  return response;
}`}</code></pre>

      {/* Security Headers */}
      <h2 style={h2Style}>{t.headersTitle}</h2>
      <p style={pStyle}>{t.headersDesc}</p>

      <h3 style={h3Style}>{t.securityHeadersTitle}</h3>
      <pre style={codeStyle}><code>{`// Security headers middleware
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Prevent XSS attacks
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  );

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Enable HSTS
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}`}</code></pre>

      <h3 style={h3Style}>{t.corsTitle}</h3>
      <p style={pStyle}>{t.corsDesc}</p>
      <pre style={codeStyle}><code>{`// CORS middleware for API routes
const ALLOWED_ORIGINS = [
  'https://myapp.com',
  'https://staging.myapp.com',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
].filter(Boolean);

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const origin = request.headers.get('origin') || '';
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': isAllowed ? origin : '',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const response = NextResponse.next();
  if (isAllowed) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return response;
}`}</code></pre>

      {/* A/B Testing */}
      <h2 style={h2Style}>{t.abTestTitle}</h2>
      <p style={pStyle}>{t.abTestDesc}</p>
      <pre style={codeStyle}><code>{`// A/B Testing middleware
export function middleware(request: NextRequest) {
  // Only A/B test the homepage
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  // Check if user already has a variant assigned
  const variant = request.cookies.get('ab-variant')?.value;

  if (variant) {
    // Rewrite to the variant page without changing URL
    return NextResponse.rewrite(
      new URL(\`/variants/\${variant}\`, request.url)
    );
  }

  // Assign a random variant (50/50 split)
  const newVariant = Math.random() < 0.5 ? 'control' : 'experiment';

  const response = NextResponse.rewrite(
    new URL(\`/variants/\${newVariant}\`, request.url)
  );

  // Persist variant in cookie for 30 days
  response.cookies.set('ab-variant', newVariant, {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: 'lax',
  });

  return response;
}`}</code></pre>

      {/* URL Rewriting */}
      <h2 style={h2Style}>{t.rewriteTitle}</h2>
      <p style={pStyle}>{t.rewriteDesc}</p>
      <pre style={codeStyle}><code>{`// Multi-tenant rewriting
// app.mysite.com → /tenants/app
// docs.mysite.com → /tenants/docs
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];

  if (subdomain && subdomain !== 'www' && subdomain !== 'mysite') {
    return NextResponse.rewrite(
      new URL(\`/tenants/\${subdomain}\${request.nextUrl.pathname}\`, request.url)
    );
  }

  return NextResponse.next();
}

// Proxy API requests to external service
// /api/external/* → https://api.external-service.com/*
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/external/')) {
    const path = request.nextUrl.pathname.replace('/api/external', '');
    return NextResponse.rewrite(
      new URL(\`https://api.external-service.com\${path}\`)
    );
  }
  return NextResponse.next();
}`}</code></pre>

      {/* Chaining */}
      <h2 style={h2Style}>{t.chainingTitle}</h2>
      <p style={pStyle}>{t.chainingDesc}</p>
      <pre style={codeStyle}><code>{`// Composing multiple middleware functions
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type MiddlewareFn = (
  request: NextRequest,
  response: NextResponse
) => NextResponse | Promise<NextResponse>;

function chain(
  functions: MiddlewareFn[],
  request: NextRequest
): Promise<NextResponse> {
  return functions.reduce(
    async (promise, fn) => {
      const response = await promise;
      return fn(request, response);
    },
    Promise.resolve(NextResponse.next())
  );
}

// Individual middleware functions
const withLogging: MiddlewareFn = (request, response) => {
  console.log(\`[\${request.method}] \${request.nextUrl.pathname}\`);
  return response;
};

const withSecurityHeaders: MiddlewareFn = (request, response) => {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
};

const withAuth: MiddlewareFn = (request, response) => {
  const token = request.cookies.get('auth-token')?.value;
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return response;
};

// Compose all middleware
export function middleware(request: NextRequest) {
  return chain([withLogging, withSecurityHeaders, withAuth], request);
}`}</code></pre>

      {/* Edge Runtime Limitations */}
      <h2 style={h2Style}>{t.edgeTitle}</h2>
      <p style={pStyle}>{t.edgeDesc}</p>
      <ul style={{ color: 'var(--text-secondary)', lineHeight: 2.2, paddingLeft: 24 }}>
        <li>{t.edge1}</li>
        <li>{t.edge2}</li>
        <li>{t.edge3}</li>
        <li>{t.edge4}</li>
        <li>{t.edge5}</li>
        <li>{t.edge6}</li>
      </ul>
      <pre style={codeStyle}><code>{`// What you CAN use in Edge Runtime:
// ✅ fetch, Request, Response, Headers, URL
// ✅ TextEncoder, TextDecoder
// ✅ crypto.subtle (Web Crypto API)
// ✅ structuredClone
// ✅ atob, btoa
// ✅ URLPattern
// ✅ EdgeDB, Upstash, PlanetScale drivers

// What you CANNOT use:
// ❌ fs (file system)
// ❌ path, os, child_process
// ❌ pg, mysql2, mongoose (traditional DB drivers)
// ❌ bcrypt (use bcryptjs or Web Crypto instead)
// ❌ Large npm packages that exceed 1MB bundle`}</code></pre>

      {/* Debugging */}
      <h2 style={h2Style}>{t.debugTitle}</h2>
      <p style={pStyle}>{t.debugDesc}</p>
      <pre style={codeStyle}><code>{`// Debugging middleware
export function middleware(request: NextRequest) {
  // Log request details
  console.log({
    method: request.method,
    url: request.url,
    pathname: request.nextUrl.pathname,
    cookies: Object.fromEntries(request.cookies.getAll().map(c => [c.name, c.value])),
    headers: Object.fromEntries(request.headers),
    geo: request.geo,
    ip: request.ip,
  });

  // Return debug info in response headers (dev only)
  const response = NextResponse.next();
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('x-middleware-pathname', request.nextUrl.pathname);
    response.headers.set('x-middleware-matched', 'true');
  }
  return response;
}`}</code></pre>

      {/* Best Practices */}
      <h2 style={h2Style}>{t.bestPracticesTitle}</h2>
      <ol style={{ color: 'var(--text-secondary)', lineHeight: 2.2, paddingLeft: 24 }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
        <li>{t.bp6}</li>
        <li>{t.bp7}</li>
        <li>{t.bp8}</li>
      </ol>

      {/* Conclusion */}
      <h2 style={h2Style}>{t.conclusionTitle}</h2>
      <p style={pStyle}>{t.conclusionText}</p>

      {/* FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </article>
  );
}
