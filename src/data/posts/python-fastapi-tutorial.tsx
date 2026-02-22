const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'FastAPI Tutorial: Build REST APIs with Python in 2026',
    intro: 'FastAPI has become the most popular Python web framework for building APIs, surpassing Flask in GitHub stars and adoption. It combines the simplicity of Flask with the performance of Node.js and Go, automatic interactive documentation, and built-in data validation using Python type hints. This comprehensive tutorial walks you through building production-ready REST APIs with FastAPI, covering everything from project setup to authentication, database integration, and deployment.',
    whyTitle: 'Why FastAPI?',
    whyDesc: 'FastAPI offers a unique combination of developer experience and performance that makes it the ideal choice for modern Python API development.',
    comparisonTitle: 'FastAPI vs Flask vs Django REST Framework',
    setupTitle: 'Project Setup',
    setupDesc: 'Set up a new FastAPI project with a proper project structure, virtual environment, and essential dependencies.',
    firstApiTitle: 'Your First API',
    firstApiDesc: 'Create a basic FastAPI application with a few endpoints to understand the fundamentals.',
    routingTitle: 'Routing and Path Parameters',
    routingDesc: 'FastAPI supports path parameters, query parameters, and request bodies with automatic validation and documentation.',
    pathParamsTitle: 'Path Parameters',
    queryParamsTitle: 'Query Parameters',
    requestBodyTitle: 'Request Body with Pydantic Models',
    requestBodyDesc: 'Pydantic models provide automatic request validation, serialization, and documentation. This is one of the most powerful features of FastAPI.',
    responseTitle: 'Response Models',
    responseDesc: 'Use response models to control what data is returned to clients, filtering out sensitive fields and adding proper documentation.',
    validationTitle: 'Advanced Validation',
    validationDesc: 'Pydantic and FastAPI provide extensive validation capabilities using Field validators, custom validators, and constrained types.',
    errorTitle: 'Error Handling',
    errorDesc: 'FastAPI provides built-in exception handlers and allows you to create custom exception handlers for consistent error responses.',
    dbTitle: 'Database Integration',
    dbDesc: 'Connect FastAPI to a database using SQLAlchemy for SQL databases or Motor for MongoDB. This section covers the SQLAlchemy async setup.',
    crudTitle: 'Complete CRUD API',
    crudDesc: 'Build a complete CRUD (Create, Read, Update, Delete) API with database integration.',
    authTitle: 'Authentication and Authorization',
    authDesc: 'Implement JWT-based authentication with OAuth2 password flow, which FastAPI supports out of the box with automatic documentation in Swagger UI.',
    middlewareTitle: 'Middleware',
    middlewareDesc: 'Add middleware for logging, CORS, request timing, and other cross-cutting concerns.',
    bgTasksTitle: 'Background Tasks',
    bgTasksDesc: 'FastAPI supports background tasks that run after a response is sent, useful for sending emails, processing data, or other non-blocking operations.',
    testingTitle: 'Testing',
    testingDesc: 'FastAPI is designed for easy testing. Use the TestClient (based on httpx) to test your API endpoints without starting a server.',
    deployTitle: 'Deployment',
    deployDesc: 'Deploy your FastAPI application to production using Docker and various cloud platforms.',
    dockerTitle: 'Docker Deployment',
    perfTitle: 'Performance Tips',
    perf1: 'Use async endpoints for I/O-bound operations (database queries, HTTP requests).',
    perf2: 'Use sync endpoints for CPU-bound operations to avoid blocking the event loop.',
    perf3: 'Enable response compression with GZipMiddleware for large payloads.',
    perf4: 'Use connection pooling for database connections (SQLAlchemy async pool).',
    perf5: 'Implement caching with Redis for frequently accessed data.',
    perf6: 'Use multiple Uvicorn workers in production (or Gunicorn with Uvicorn workers).',
    perf7: 'Profile your application with py-spy or cProfile to find bottlenecks.',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Use Pydantic models for all request/response schemas — never return raw dicts.',
    bp2: 'Separate your application into routers, models, schemas, and services.',
    bp3: 'Use dependency injection for database sessions, authentication, and shared logic.',
    bp4: 'Store configuration in environment variables using pydantic-settings.',
    bp5: 'Write comprehensive tests using TestClient and pytest fixtures.',
    bp6: 'Use async database drivers (asyncpg, aiosqlite) for async endpoints.',
    bp7: 'Document your API with descriptions, tags, and examples in your Pydantic models.',
    bp8: 'Handle errors consistently with custom exception handlers.',
    conclusionTitle: 'Conclusion',
    conclusionText: 'FastAPI is a production-ready framework that combines Python developer experience with high performance. Its automatic data validation through Pydantic, interactive API documentation, and native async support make it the best choice for building REST APIs in Python. Start with the project structure shown in this tutorial, define your Pydantic models first, then build your routes and business logic. Use dependency injection for database sessions and authentication, write tests from the beginning, and deploy with Docker for consistent environments. FastAPI seamless integration with the Python ecosystem means you can leverage thousands of existing libraries while building fast, type-safe, and well-documented APIs.',
    faqTitle: 'FAQ',
    faq1q: 'Is FastAPI faster than Flask?',
    faq1a: 'Yes. FastAPI runs on ASGI (Uvicorn/Starlette) which supports async operations, making it significantly faster than Flask (WSGI) for I/O-bound workloads. Benchmarks show FastAPI can handle 2-3x more requests per second than Flask for typical API workloads.',
    faq2q: 'When should I use Flask instead of FastAPI?',
    faq2a: 'Use Flask when you need server-rendered HTML templates, have an existing Flask codebase, or need a specific Flask extension without a FastAPI equivalent. For new API-first projects, FastAPI is generally the better choice.',
    faq3q: 'Does FastAPI support WebSockets?',
    faq3a: 'Yes. FastAPI has built-in WebSocket support through Starlette. You can create WebSocket endpoints alongside your REST endpoints using the @app.websocket decorator.',
    faq4q: 'How do I handle file uploads in FastAPI?',
    faq4a: 'FastAPI handles file uploads through the UploadFile type parameter. Use File(...) for small files that fit in memory, or UploadFile for streaming large files. FastAPI automatically handles multipart form data parsing.',
  },
  zh: {
    title: 'FastAPI 教程：2026 年用 Python 构建 REST API',
    intro: 'FastAPI 已成为构建 API 最流行的 Python Web 框架。它结合了 Flask 的简洁性和 Node.js/Go 的性能，自动交互式文档和基于 Python 类型提示的内置数据验证。本教程涵盖从项目设置到认证、数据库集成和部署的所有内容。',
    whyTitle: '为什么选择 FastAPI？', whyDesc: 'FastAPI 提供了开发体验和性能的独特组合。',
    comparisonTitle: 'FastAPI vs Flask vs Django REST Framework',
    setupTitle: '项目设置', setupDesc: '使用正确的项目结构、虚拟环境和依赖设置新的 FastAPI 项目。',
    firstApiTitle: '你的第一个 API', firstApiDesc: '创建基本的 FastAPI 应用来了解基础知识。',
    routingTitle: '路由和路径参数', routingDesc: 'FastAPI 支持路径参数、查询参数和请求体的自动验证。',
    pathParamsTitle: '路径参数',
    queryParamsTitle: '查询参数',
    requestBodyTitle: '使用 Pydantic 模型的请求体', requestBodyDesc: 'Pydantic 模型提供自动请求验证、序列化和文档。',
    responseTitle: '响应模型', responseDesc: '使用响应模型控制返回给客户端的数据。',
    validationTitle: '高级验证', validationDesc: 'Pydantic 和 FastAPI 提供丰富的验证功能。',
    errorTitle: '错误处理', errorDesc: 'FastAPI 提供内置的异常处理器。',
    dbTitle: '数据库集成', dbDesc: '使用 SQLAlchemy 连接 FastAPI 到数据库。',
    crudTitle: '完整 CRUD API', crudDesc: '构建完整的增删改查 API。',
    authTitle: '认证和授权', authDesc: '实现基于 JWT 的认证。',
    middlewareTitle: '中间件', middlewareDesc: '添加日志、CORS、请求计时等中间件。',
    bgTasksTitle: '后台任务', bgTasksDesc: 'FastAPI 支持响应发送后运行的后台任务。',
    testingTitle: '测试', testingDesc: '使用 TestClient 测试 API 端点。',
    deployTitle: '部署', deployDesc: '使用 Docker 部署 FastAPI 应用到生产环境。',
    dockerTitle: 'Docker 部署',
    perfTitle: '性能技巧',
    perf1: 'I/O 密集操作使用 async 端点。', perf2: 'CPU 密集操作使用同步端点。',
    perf3: '启用 GZip 响应压缩。', perf4: '使用数据库连接池。',
    perf5: '使用 Redis 缓存常用数据。', perf6: '生产环境使用多个 Uvicorn workers。',
    perf7: '使用 py-spy 分析性能瓶颈。',
    bestPracticesTitle: '最佳实践',
    bp1: '所有请求/响应使用 Pydantic 模型。', bp2: '将应用分为路由、模型、模式和服务。',
    bp3: '使用依赖注入处理数据库会话和认证。', bp4: '使用环境变量存储配置。',
    bp5: '编写全面的测试。', bp6: '使用异步数据库驱动。',
    bp7: '为 API 添加文档描述。', bp8: '一致地处理错误。',
    conclusionTitle: '总结',
    conclusionText: 'FastAPI 是一个结合了 Python 开发体验和高性能的生产级框架。通过 Pydantic 自动数据验证、交互式 API 文档和原生异步支持，它是构建 Python REST API 的最佳选择。',
    faqTitle: '常见问题',
    faq1q: 'FastAPI 比 Flask 快吗？', faq1a: '是的。FastAPI 运行在 ASGI 上，支持异步操作，比 Flask 快 2-3 倍。',
    faq2q: '什么时候应该使用 Flask？', faq2a: '需要服务端渲染 HTML 模板或有现有 Flask 代码库时。新 API 项目推荐 FastAPI。',
    faq3q: 'FastAPI 支持 WebSocket 吗？', faq3a: '支持。FastAPI 通过 Starlette 内置 WebSocket 支持。',
    faq4q: '如何处理文件上传？', faq4a: '通过 UploadFile 类型参数处理，自动解析多部分表单数据。',
  },
  ja: {
    title: 'FastAPI チュートリアル：2026年 Python で REST API を構築',
    intro: 'FastAPI は API 構築のための最も人気のある Python フレームワークになりました。Flask のシンプルさと Node.js/Go のパフォーマンスを兼ね備えています。',
    whyTitle: 'なぜ FastAPI？', whyDesc: '開発体験とパフォーマンスのユニークな組み合わせを提供します。',
    comparisonTitle: 'FastAPI vs Flask vs Django REST Framework',
    setupTitle: 'プロジェクトセットアップ', setupDesc: '適切なプロジェクト構造で FastAPI プロジェクトをセットアップします。',
    firstApiTitle: '最初の API', firstApiDesc: '基本的な FastAPI アプリを作成します。',
    routingTitle: 'ルーティングとパスパラメータ', routingDesc: 'パスパラメータ、クエリパラメータ、リクエストボディをサポート。',
    pathParamsTitle: 'パスパラメータ', queryParamsTitle: 'クエリパラメータ',
    requestBodyTitle: 'Pydantic モデルによるリクエストボディ', requestBodyDesc: 'Pydantic モデルで自動バリデーションとドキュメント生成。',
    responseTitle: 'レスポンスモデル', responseDesc: 'レスポンスモデルで返却データを制御。',
    validationTitle: '高度なバリデーション', validationDesc: '豊富なバリデーション機能。',
    errorTitle: 'エラーハンドリング', errorDesc: '組み込み例外ハンドラーを提供。',
    dbTitle: 'データベース統合', dbDesc: 'SQLAlchemy で FastAPI をデータベースに接続。',
    crudTitle: '完全な CRUD API', crudDesc: '完全な CRUD API を構築。',
    authTitle: '認証と認可', authDesc: 'JWT ベースの認証を実装。',
    middlewareTitle: 'ミドルウェア', middlewareDesc: 'ロギング、CORS などのミドルウェアを追加。',
    bgTasksTitle: 'バックグラウンドタスク', bgTasksDesc: 'レスポンス送信後に実行するタスク。',
    testingTitle: 'テスト', testingDesc: 'TestClient で API エンドポイントをテスト。',
    deployTitle: 'デプロイ', deployDesc: 'Docker で本番環境にデプロイ。',
    dockerTitle: 'Docker デプロイ',
    perfTitle: 'パフォーマンスのヒント',
    perf1: 'I/O 処理には async エンドポイント。', perf2: 'CPU 処理には同期エンドポイント。',
    perf3: 'GZip 圧縮を有効化。', perf4: 'コネクションプーリングを使用。',
    perf5: 'Redis でキャッシュ。', perf6: '本番で複数ワーカー。', perf7: 'py-spy でプロファイリング。',
    bestPracticesTitle: 'ベストプラクティス',
    bp1: 'Pydantic モデルを使用。', bp2: 'アプリを分離。', bp3: '依存性注入を活用。', bp4: '環境変数で設定。',
    bp5: 'テストを書く。', bp6: '非同期 DB ドライバー。', bp7: 'API ドキュメントを追加。', bp8: '一貫したエラー処理。',
    conclusionTitle: '結論',
    conclusionText: 'FastAPI は Python の開発体験と高パフォーマンスを兼ね備えた本番環境対応フレームワークです。Python REST API 構築の最適な選択肢です。',
    faqTitle: 'FAQ',
    faq1q: 'FastAPI は Flask より速い？', faq1a: 'はい。ASGI で非同期をサポートし、2-3倍高速です。',
    faq2q: 'Flask を使うべき場面は？', faq2a: 'サーバーサイドレンダリングや既存の Flask コードがある場合。',
    faq3q: 'WebSocket は対応している？', faq3a: 'はい、Starlette を通じて対応しています。',
    faq4q: 'ファイルアップロードの処理方法は？', faq4a: 'UploadFile 型パラメータで処理します。',
  },
  ko: {
    title: 'FastAPI 튜토리얼: 2026년 Python으로 REST API 구축',
    intro: 'FastAPI는 API 구축을 위한 가장 인기 있는 Python 웹 프레임워크가 되었습니다. Flask의 간결함과 Node.js/Go의 성능을 결합합니다.',
    whyTitle: '왜 FastAPI인가?', whyDesc: '개발 경험과 성능의 독특한 조합을 제공합니다.',
    comparisonTitle: 'FastAPI vs Flask vs Django REST Framework',
    setupTitle: '프로젝트 설정', setupDesc: '적절한 구조로 FastAPI 프로젝트를 설정합니다.',
    firstApiTitle: '첫 번째 API', firstApiDesc: '기본 FastAPI 앱을 만듭니다.',
    routingTitle: '라우팅과 경로 매개변수', routingDesc: '경로 매개변수, 쿼리 매개변수, 요청 바디를 지원합니다.',
    pathParamsTitle: '경로 매개변수', queryParamsTitle: '쿼리 매개변수',
    requestBodyTitle: 'Pydantic 모델 요청 바디', requestBodyDesc: 'Pydantic 모델로 자동 검증과 문서 생성.',
    responseTitle: '응답 모델', responseDesc: '응답 모델로 반환 데이터를 제어.',
    validationTitle: '고급 검증', validationDesc: '풍부한 검증 기능을 제공.',
    errorTitle: '에러 처리', errorDesc: '내장 예외 핸들러를 제공.',
    dbTitle: '데이터베이스 통합', dbDesc: 'SQLAlchemy로 FastAPI를 데이터베이스에 연결.',
    crudTitle: '완전한 CRUD API', crudDesc: '완전한 CRUD API를 구축.',
    authTitle: '인증 및 인가', authDesc: 'JWT 기반 인증을 구현.',
    middlewareTitle: '미들웨어', middlewareDesc: '로깅, CORS 등의 미들웨어를 추가.',
    bgTasksTitle: '백그라운드 작업', bgTasksDesc: '응답 전송 후 실행되는 작업.',
    testingTitle: '테스트', testingDesc: 'TestClient로 API 엔드포인트를 테스트.',
    deployTitle: '배포', deployDesc: 'Docker로 프로덕션에 배포.',
    dockerTitle: 'Docker 배포',
    perfTitle: '성능 팁',
    perf1: 'I/O 작업에는 async 엔드포인트.', perf2: 'CPU 작업에는 동기 엔드포인트.',
    perf3: 'GZip 압축 활성화.', perf4: '커넥션 풀링 사용.', perf5: 'Redis로 캐싱.', perf6: '프로덕션에서 다중 워커.', perf7: 'py-spy로 프로파일링.',
    bestPracticesTitle: '모범 사례',
    bp1: 'Pydantic 모델 사용.', bp2: '앱을 분리.', bp3: '의존성 주입 활용.', bp4: '환경 변수로 설정.',
    bp5: '테스트 작성.', bp6: '비동기 DB 드라이버.', bp7: 'API 문서 추가.', bp8: '일관된 에러 처리.',
    conclusionTitle: '결론',
    conclusionText: 'FastAPI는 Python 개발 경험과 고성능을 결합한 프로덕션급 프레임워크입니다. Python REST API 구축의 최적 선택입니다.',
    faqTitle: 'FAQ',
    faq1q: 'FastAPI가 Flask보다 빠른가요?', faq1a: '네. ASGI에서 비동기를 지원하여 2-3배 빠릅니다.',
    faq2q: 'Flask를 사용해야 할 때는?', faq2a: '서버 사이드 렌더링이나 기존 Flask 코드가 있을 때.',
    faq3q: 'WebSocket을 지원하나요?', faq3a: '네, Starlette를 통해 지원합니다.',
    faq4q: '파일 업로드 처리 방법은?', faq4a: 'UploadFile 타입 매개변수로 처리합니다.',
  },
  fr: {
    title: 'Tutoriel FastAPI : Créer des API REST avec Python en 2026',
    intro: 'FastAPI est devenu le framework Python le plus populaire pour la construction d\'API. Il combine la simplicité de Flask avec les performances de Node.js/Go.',
    whyTitle: 'Pourquoi FastAPI ?', whyDesc: 'Une combinaison unique d\'expérience développeur et de performance.',
    comparisonTitle: 'FastAPI vs Flask vs Django REST Framework',
    setupTitle: 'Configuration du projet', setupDesc: 'Configurez un nouveau projet FastAPI.',
    firstApiTitle: 'Votre première API', firstApiDesc: 'Créez une application FastAPI de base.',
    routingTitle: 'Routage et paramètres', routingDesc: 'Paramètres de chemin, de requête et corps de requête.',
    pathParamsTitle: 'Paramètres de chemin', queryParamsTitle: 'Paramètres de requête',
    requestBodyTitle: 'Corps de requête Pydantic', requestBodyDesc: 'Validation et documentation automatiques.',
    responseTitle: 'Modèles de réponse', responseDesc: 'Contrôler les données retournées.',
    validationTitle: 'Validation avancée', validationDesc: 'Capacités de validation étendues.',
    errorTitle: 'Gestion des erreurs', errorDesc: 'Gestionnaires d\'exceptions intégrés.',
    dbTitle: 'Intégration base de données', dbDesc: 'Connecter FastAPI avec SQLAlchemy.',
    crudTitle: 'API CRUD complète', crudDesc: 'Construire une API CRUD complète.',
    authTitle: 'Authentification', authDesc: 'Implémenter l\'authentification JWT.',
    middlewareTitle: 'Middleware', middlewareDesc: 'Ajouter logging, CORS, etc.',
    bgTasksTitle: 'Tâches de fond', bgTasksDesc: 'Tâches exécutées après l\'envoi de la réponse.',
    testingTitle: 'Tests', testingDesc: 'Tester avec TestClient.',
    deployTitle: 'Déploiement', deployDesc: 'Déployer avec Docker.',
    dockerTitle: 'Déploiement Docker',
    perfTitle: 'Conseils de performance',
    perf1: 'Endpoints async pour les I/O.', perf2: 'Endpoints sync pour le CPU.', perf3: 'Compression GZip.',
    perf4: 'Pool de connexions.', perf5: 'Cache Redis.', perf6: 'Plusieurs workers.', perf7: 'Profiling avec py-spy.',
    bestPracticesTitle: 'Bonnes pratiques',
    bp1: 'Modèles Pydantic pour tout.', bp2: 'Séparer l\'application.', bp3: 'Injection de dépendances.', bp4: 'Variables d\'environnement.',
    bp5: 'Tests complets.', bp6: 'Drivers DB async.', bp7: 'Documenter l\'API.', bp8: 'Erreurs cohérentes.',
    conclusionTitle: 'Conclusion',
    conclusionText: 'FastAPI est un framework de production qui combine l\'expérience Python avec de hautes performances. Le meilleur choix pour les API REST Python.',
    faqTitle: 'FAQ',
    faq1q: 'FastAPI est-il plus rapide que Flask ?', faq1a: 'Oui, 2-3x plus rapide grâce à ASGI et l\'async.',
    faq2q: 'Quand utiliser Flask ?', faq2a: 'Pour le rendu HTML côté serveur ou les projets Flask existants.',
    faq3q: 'WebSocket supporté ?', faq3a: 'Oui, via Starlette.',
    faq4q: 'Upload de fichiers ?', faq4a: 'Via le type UploadFile.',
  },
  de: {
    title: 'FastAPI Tutorial: REST APIs mit Python bauen in 2026',
    intro: 'FastAPI ist das beliebteste Python-Framework für API-Entwicklung. Es vereint die Einfachheit von Flask mit der Performance von Node.js/Go.',
    whyTitle: 'Warum FastAPI?', whyDesc: 'Einzigartige Kombination aus Entwicklererfahrung und Performance.',
    comparisonTitle: 'FastAPI vs Flask vs Django REST Framework',
    setupTitle: 'Projekteinrichtung', setupDesc: 'Ein neues FastAPI-Projekt einrichten.',
    firstApiTitle: 'Ihre erste API', firstApiDesc: 'Eine einfache FastAPI-Anwendung erstellen.',
    routingTitle: 'Routing und Pfadparameter', routingDesc: 'Pfad-, Query-Parameter und Request Body.',
    pathParamsTitle: 'Pfadparameter', queryParamsTitle: 'Query-Parameter',
    requestBodyTitle: 'Request Body mit Pydantic', requestBodyDesc: 'Automatische Validierung und Dokumentation.',
    responseTitle: 'Response-Modelle', responseDesc: 'Zurückgegebene Daten kontrollieren.',
    validationTitle: 'Erweiterte Validierung', validationDesc: 'Umfangreiche Validierungsmöglichkeiten.',
    errorTitle: 'Fehlerbehandlung', errorDesc: 'Eingebaute Exception-Handler.',
    dbTitle: 'Datenbankintegration', dbDesc: 'FastAPI mit SQLAlchemy verbinden.',
    crudTitle: 'Vollständige CRUD API', crudDesc: 'Eine vollständige CRUD API bauen.',
    authTitle: 'Authentifizierung', authDesc: 'JWT-basierte Authentifizierung implementieren.',
    middlewareTitle: 'Middleware', middlewareDesc: 'Logging, CORS usw. hinzufügen.',
    bgTasksTitle: 'Hintergrundaufgaben', bgTasksDesc: 'Aufgaben nach der Antwort ausführen.',
    testingTitle: 'Tests', testingDesc: 'Mit TestClient testen.',
    deployTitle: 'Deployment', deployDesc: 'Mit Docker deployen.',
    dockerTitle: 'Docker Deployment',
    perfTitle: 'Performance-Tipps',
    perf1: 'Async Endpoints für I/O.', perf2: 'Sync Endpoints für CPU.', perf3: 'GZip-Komprimierung.',
    perf4: 'Connection Pooling.', perf5: 'Redis-Cache.', perf6: 'Mehrere Worker.', perf7: 'Profiling mit py-spy.',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Pydantic-Modelle verwenden.', bp2: 'Anwendung aufteilen.', bp3: 'Dependency Injection.', bp4: 'Umgebungsvariablen.',
    bp5: 'Tests schreiben.', bp6: 'Async DB-Treiber.', bp7: 'API dokumentieren.', bp8: 'Konsistente Fehler.',
    conclusionTitle: 'Fazit',
    conclusionText: 'FastAPI ist ein produktionsreifes Framework, das Python-Entwicklererfahrung mit hoher Leistung verbindet. Die beste Wahl für Python REST APIs.',
    faqTitle: 'FAQ',
    faq1q: 'Ist FastAPI schneller als Flask?', faq1a: 'Ja, 2-3x schneller durch ASGI und Async-Support.',
    faq2q: 'Wann Flask verwenden?', faq2a: 'Für serverseitiges HTML-Rendering oder bestehende Flask-Projekte.',
    faq3q: 'WebSocket unterstützt?', faq3a: 'Ja, über Starlette.',
    faq4q: 'Datei-Upload?', faq4a: 'Über den UploadFile-Typ.',
  },
  es: {
    title: 'Tutorial FastAPI: Construir APIs REST con Python en 2026',
    intro: 'FastAPI se ha convertido en el framework Python más popular para construir APIs. Combina la simplicidad de Flask con el rendimiento de Node.js/Go.',
    whyTitle: '¿Por qué FastAPI?', whyDesc: 'Combinación única de experiencia de desarrollo y rendimiento.',
    comparisonTitle: 'FastAPI vs Flask vs Django REST Framework',
    setupTitle: 'Configuración del proyecto', setupDesc: 'Configurar un nuevo proyecto FastAPI.',
    firstApiTitle: 'Tu primera API', firstApiDesc: 'Crear una aplicación FastAPI básica.',
    routingTitle: 'Enrutamiento y parámetros', routingDesc: 'Parámetros de ruta, consulta y cuerpo de solicitud.',
    pathParamsTitle: 'Parámetros de ruta', queryParamsTitle: 'Parámetros de consulta',
    requestBodyTitle: 'Cuerpo de solicitud Pydantic', requestBodyDesc: 'Validación y documentación automáticas.',
    responseTitle: 'Modelos de respuesta', responseDesc: 'Controlar los datos devueltos.',
    validationTitle: 'Validación avanzada', validationDesc: 'Capacidades de validación extensas.',
    errorTitle: 'Manejo de errores', errorDesc: 'Manejadores de excepciones integrados.',
    dbTitle: 'Integración de base de datos', dbDesc: 'Conectar FastAPI con SQLAlchemy.',
    crudTitle: 'API CRUD completa', crudDesc: 'Construir una API CRUD completa.',
    authTitle: 'Autenticación', authDesc: 'Implementar autenticación JWT.',
    middlewareTitle: 'Middleware', middlewareDesc: 'Agregar logging, CORS, etc.',
    bgTasksTitle: 'Tareas en segundo plano', bgTasksDesc: 'Tareas ejecutadas después de enviar la respuesta.',
    testingTitle: 'Testing', testingDesc: 'Probar con TestClient.',
    deployTitle: 'Despliegue', deployDesc: 'Desplegar con Docker.',
    dockerTitle: 'Despliegue Docker',
    perfTitle: 'Consejos de rendimiento',
    perf1: 'Endpoints async para I/O.', perf2: 'Endpoints sync para CPU.', perf3: 'Compresión GZip.',
    perf4: 'Pool de conexiones.', perf5: 'Cache Redis.', perf6: 'Múltiples workers.', perf7: 'Profiling con py-spy.',
    bestPracticesTitle: 'Mejores prácticas',
    bp1: 'Modelos Pydantic para todo.', bp2: 'Separar la aplicación.', bp3: 'Inyección de dependencias.', bp4: 'Variables de entorno.',
    bp5: 'Tests completos.', bp6: 'Drivers DB async.', bp7: 'Documentar la API.', bp8: 'Errores consistentes.',
    conclusionTitle: 'Conclusión',
    conclusionText: 'FastAPI es un framework de producción que combina la experiencia Python con alto rendimiento. La mejor opción para APIs REST en Python.',
    faqTitle: 'FAQ',
    faq1q: '¿FastAPI es más rápido que Flask?', faq1a: 'Sí, 2-3x más rápido gracias a ASGI y async.',
    faq2q: '¿Cuándo usar Flask?', faq2a: 'Para renderizado HTML del servidor o proyectos Flask existentes.',
    faq3q: '¿Soporta WebSocket?', faq3a: 'Sí, a través de Starlette.',
    faq4q: '¿Cómo manejar subida de archivos?', faq4a: 'A través del tipo UploadFile.',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };

export default function PythonFastapiTutorial({ lang }: { lang: string }) {
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

      {/* Why FastAPI */}
      <h2 style={h2Style}>{t.whyTitle}</h2>
      <p style={pStyle}>{t.whyDesc}</p>
      <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 24 }}>
        <li>Automatic interactive API documentation (Swagger UI + ReDoc)</li>
        <li>Data validation and serialization with Pydantic</li>
        <li>Native async/await support for high concurrency</li>
        <li>Type-safe development with Python type hints</li>
        <li>40% fewer bugs through automatic validation (per FastAPI benchmarks)</li>
        <li>Performance on par with Node.js and Go frameworks</li>
      </ul>

      {/* Comparison */}
      <h2 style={h2Style}>{t.comparisonTitle}</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Feature</th>
            <th style={thStyle}>FastAPI</th>
            <th style={thStyle}>Flask</th>
            <th style={thStyle}>Django REST</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Performance', 'Very High (ASGI)', 'Medium (WSGI)', 'Medium (WSGI)'],
            ['Async Support', 'Native', 'Limited', 'Django 4.1+'],
            ['Data Validation', 'Built-in (Pydantic)', 'Manual / Marshmallow', 'Serializers'],
            ['Auto Documentation', 'Swagger + ReDoc', 'None (needs extension)', 'Browsable API'],
            ['Type Safety', 'Full (type hints)', 'None', 'Partial'],
            ['Learning Curve', 'Low', 'Very Low', 'High'],
            ['Best For', 'APIs, Microservices', 'Simple apps, APIs', 'Full-stack, Admin'],
          ].map(([feature, fast, flask, django], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
              <td style={tdStyle}>{fast}</td>
              <td style={tdStyle}>{flask}</td>
              <td style={tdStyle}>{django}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Project Setup */}
      <h2 style={h2Style}>{t.setupTitle}</h2>
      <p style={pStyle}>{t.setupDesc}</p>
      <pre style={codeStyle}><code>{`# Create project directory
mkdir fastapi-project && cd fastapi-project

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\\Scripts\\activate   # Windows

# Install dependencies
pip install fastapi uvicorn[standard] pydantic-settings sqlalchemy[asyncio] asyncpg python-jose[cryptography] passlib[bcrypt] python-multipart httpx pytest

# Project structure
fastapi-project/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI app instance
│   ├── config.py          # Settings with pydantic-settings
│   ├── database.py        # Database connection
│   ├── models/            # SQLAlchemy models
│   │   ├── __init__.py
│   │   └── user.py
│   ├── schemas/           # Pydantic schemas
│   │   ├── __init__.py
│   │   └── user.py
│   ├── routers/           # API route handlers
│   │   ├── __init__.py
│   │   ├── users.py
│   │   └── auth.py
│   ├── services/          # Business logic
│   │   ├── __init__.py
│   │   └── user_service.py
│   └── dependencies.py    # Shared dependencies
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   └── test_users.py
├── requirements.txt
├── Dockerfile
└── docker-compose.yml`}</code></pre>

      {/* First API */}
      <h2 style={h2Style}>{t.firstApiTitle}</h2>
      <p style={pStyle}>{t.firstApiDesc}</p>
      <pre style={codeStyle}><code>{`# app/main.py
from fastapi import FastAPI
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize resources
    print("Starting up...")
    yield
    # Shutdown: cleanup resources
    print("Shutting down...")

app = FastAPI(
    title="My API",
    description="A production-ready REST API built with FastAPI",
    version="1.0.0",
    lifespan=lifespan,
)

@app.get("/")
async def root():
    return {"message": "Hello, FastAPI!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Run with:
# uvicorn app.main:app --reload --port 8000
#
# API docs available at:
# http://localhost:8000/docs      (Swagger UI)
# http://localhost:8000/redoc     (ReDoc)`}</code></pre>

      {/* Routing */}
      <h2 style={h2Style}>{t.routingTitle}</h2>
      <p style={pStyle}>{t.routingDesc}</p>

      <h3 style={h3Style}>{t.pathParamsTitle}</h3>
      <pre style={codeStyle}><code>{`from fastapi import FastAPI, Path, HTTPException

app = FastAPI()

@app.get("/users/{user_id}")
async def get_user(
    user_id: int = Path(..., title="User ID", ge=1, description="The ID of the user")
):
    # user_id is automatically validated as a positive integer
    if user_id > 1000:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": user_id, "name": f"User {user_id}"}

# Enum path parameters
from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    editor = "editor"
    viewer = "viewer"

@app.get("/users/role/{role}")
async def get_users_by_role(role: UserRole):
    return {"role": role, "message": f"Listing all {role.value} users"}`}</code></pre>

      <h3 style={h3Style}>{t.queryParamsTitle}</h3>
      <pre style={codeStyle}><code>{`from fastapi import Query
from typing import Optional

@app.get("/users")
async def list_users(
    skip: int = Query(default=0, ge=0, description="Number of records to skip"),
    limit: int = Query(default=20, ge=1, le=100, description="Max records to return"),
    search: Optional[str] = Query(default=None, min_length=1, max_length=100),
    sort_by: str = Query(default="created_at", pattern="^(name|email|created_at)$"),
    active: bool = Query(default=True),
):
    return {
        "skip": skip,
        "limit": limit,
        "search": search,
        "sort_by": sort_by,
        "active": active,
    }`}</code></pre>

      {/* Request Body */}
      <h2 style={h2Style}>{t.requestBodyTitle}</h2>
      <p style={pStyle}>{t.requestBodyDesc}</p>
      <pre style={codeStyle}><code>{`# app/schemas/user.py
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, examples=["John Doe"])
    email: EmailStr = Field(..., examples=["john@example.com"])
    password: str = Field(..., min_length=8, max_length=128)
    age: Optional[int] = Field(default=None, ge=13, le=150)
    bio: Optional[str] = Field(default=None, max_length=500)

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "name": "John Doe",
                "email": "john@example.com",
                "password": "securePass123",
                "age": 28,
                "bio": "Software developer"
            }]
        }
    }

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    age: Optional[int] = None
    bio: Optional[str] = None
    created_at: datetime
    # Note: password is NOT included in the response

    model_config = {"from_attributes": True}

class UserUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    bio: Optional[str] = Field(default=None, max_length=500)
    age: Optional[int] = Field(default=None, ge=13, le=150)

# Usage in route
@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate):
    # Pydantic automatically validates the request body
    # Invalid data returns a 422 with detailed error messages
    return {"id": 1, **user.model_dump(), "created_at": datetime.now()}`}</code></pre>

      {/* Response Models */}
      <h2 style={h2Style}>{t.responseTitle}</h2>
      <p style={pStyle}>{t.responseDesc}</p>
      <pre style={codeStyle}><code>{`from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

class UserListResponse(BaseModel):
    users: List[UserResponse]
    total: int
    page: int
    per_page: int

@app.get("/users", response_model=UserListResponse)
async def list_users(page: int = 1, per_page: int = 20):
    # response_model ensures only declared fields are returned
    # Even if the database returns extra fields (like password_hash),
    # they will be filtered out automatically
    return {
        "users": [],
        "total": 0,
        "page": page,
        "per_page": per_page,
    }`}</code></pre>

      {/* Validation */}
      <h2 style={h2Style}>{t.validationTitle}</h2>
      <p style={pStyle}>{t.validationDesc}</p>
      <pre style={codeStyle}><code>{`from pydantic import BaseModel, field_validator, model_validator
from typing import Optional
import re

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str

    @field_validator('username')
    @classmethod
    def username_must_be_alphanumeric(cls, v: str) -> str:
        if not re.match(r'^[a-zA-Z0-9_]+$', v):
            raise ValueError('Username must be alphanumeric')
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters')
        return v.lower()

    @field_validator('password')
    @classmethod
    def password_strength(cls, v: str) -> str:
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain an uppercase letter')
        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain a number')
        return v

    @model_validator(mode='after')
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError('Passwords do not match')
        return self`}</code></pre>

      {/* Error Handling */}
      <h2 style={h2Style}>{t.errorTitle}</h2>
      <p style={pStyle}>{t.errorDesc}</p>
      <pre style={codeStyle}><code>{`from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

# Custom exception class
class AppException(Exception):
    def __init__(self, status_code: int, detail: str, error_code: str):
        self.status_code = status_code
        self.detail = detail
        self.error_code = error_code

# Register custom exception handler
@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.error_code,
            "detail": exc.detail,
            "path": str(request.url),
        },
    )

# Usage
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = await find_user(user_id)
    if not user:
        raise AppException(
            status_code=404,
            detail=f"User with ID {user_id} not found",
            error_code="USER_NOT_FOUND",
        )
    return user`}</code></pre>

      {/* Database */}
      <h2 style={h2Style}>{t.dbTitle}</h2>
      <p style={pStyle}>{t.dbDesc}</p>
      <pre style={codeStyle}><code>{`# app/database.py
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

DATABASE_URL = "postgresql+asyncpg://user:password@localhost:5432/mydb"

engine = create_async_engine(DATABASE_URL, echo=True, pool_size=20, max_overflow=10)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

# Dependency for database sessions
async def get_db():
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise

# app/models/user.py
from sqlalchemy import Column, Integer, String, DateTime, func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())`}</code></pre>

      {/* CRUD */}
      <h2 style={h2Style}>{t.crudTitle}</h2>
      <p style={pStyle}>{t.crudDesc}</p>
      <pre style={codeStyle}><code>{`# app/routers/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from typing import List

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/", response_model=List[UserResponse])
async def list_users(
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User).offset(skip).limit(limit))
    users = result.scalars().all()
    return users

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(data: UserCreate, db: AsyncSession = Depends(get_db)):
    user = User(name=data.name, email=data.email, password_hash=hash_password(data.password))
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user

@router.patch("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, data: UserUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(user, field, value)
    await db.flush()
    return user

@router.delete("/{user_id}", status_code=204)
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await db.delete(user)

# Register router in main.py
# app.include_router(router)`}</code></pre>

      {/* Authentication */}
      <h2 style={h2Style}>{t.authTitle}</h2>
      <p style={pStyle}>{t.authDesc}</p>
      <pre style={codeStyle}><code>{`# app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["Authentication"])

SECRET_KEY = "your-secret-key"  # Use environment variable in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

class Token(BaseModel):
    access_token: str
    token_type: str

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    # Fetch user from database
    user = await find_user_by_id(int(user_id))
    if user is None:
        raise credentials_exception
    return user

@router.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Protected endpoint
@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user = Depends(get_current_user)):
    return current_user`}</code></pre>

      {/* Middleware */}
      <h2 style={h2Style}>{t.middlewareTitle}</h2>
      <p style={pStyle}>{t.middlewareDesc}</p>
      <pre style={codeStyle}><code>{`from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
import time, logging

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://myapp.com", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GZip compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Custom request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    response.headers["X-Process-Time"] = f"{process_time:.4f}"
    logging.info(f"{request.method} {request.url.path} - {process_time:.4f}s")
    return response`}</code></pre>

      {/* Background Tasks */}
      <h2 style={h2Style}>{t.bgTasksTitle}</h2>
      <p style={pStyle}>{t.bgTasksDesc}</p>
      <pre style={codeStyle}><code>{`from fastapi import BackgroundTasks

async def send_welcome_email(email: str, name: str):
    # Simulate sending email (replace with actual email service)
    await asyncio.sleep(2)
    print(f"Welcome email sent to {name} at {email}")

async def log_user_creation(user_id: int):
    print(f"User {user_id} created at {datetime.now()}")

@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(
    data: UserCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    user = await user_service.create(db, data)

    # These run AFTER the response is sent
    background_tasks.add_task(send_welcome_email, user.email, user.name)
    background_tasks.add_task(log_user_creation, user.id)

    return user  # Response is sent immediately`}</code></pre>

      {/* Testing */}
      <h2 style={h2Style}>{t.testingTitle}</h2>
      <p style={pStyle}>{t.testingDesc}</p>
      <pre style={codeStyle}><code>{`# tests/test_users.py
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as ac:
        yield ac

@pytest.mark.anyio
async def test_create_user(client: AsyncClient):
    response = await client.post("/users", json={
        "name": "John Doe",
        "email": "john@example.com",
        "password": "SecurePass123",
    })
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "John Doe"
    assert data["email"] == "john@example.com"
    assert "password" not in data  # Password should be excluded

@pytest.mark.anyio
async def test_create_user_validation_error(client: AsyncClient):
    response = await client.post("/users", json={
        "name": "J",  # Too short
        "email": "not-an-email",
        "password": "weak",
    })
    assert response.status_code == 422
    errors = response.json()["detail"]
    assert len(errors) > 0

@pytest.mark.anyio
async def test_get_user_not_found(client: AsyncClient):
    response = await client.get("/users/99999")
    assert response.status_code == 404

# Run tests:
# pytest tests/ -v --tb=short`}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{t.deployTitle}</h2>
      <p style={pStyle}>{t.deployDesc}</p>
      <h3 style={h3Style}>{t.dockerTitle}</h3>
      <pre style={codeStyle}><code>{`# Dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY ./app ./app

# Create non-root user
RUN adduser --disabled-password --no-create-home appuser
USER appuser

# Run with multiple workers for production
CMD ["uvicorn", "app.main:app", \\
     "--host", "0.0.0.0", \\
     "--port", "8000", \\
     "--workers", "4"]

# docker-compose.yml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://user:pass@db:5432/mydb
      - JWT_SECRET=your-production-secret
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pg-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pg-data:`}</code></pre>

      {/* Performance Tips */}
      <h2 style={h2Style}>{t.perfTitle}</h2>
      <ol style={{ color: 'var(--text-secondary)', lineHeight: 2.2, paddingLeft: 24 }}>
        <li>{t.perf1}</li>
        <li>{t.perf2}</li>
        <li>{t.perf3}</li>
        <li>{t.perf4}</li>
        <li>{t.perf5}</li>
        <li>{t.perf6}</li>
        <li>{t.perf7}</li>
      </ol>

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
