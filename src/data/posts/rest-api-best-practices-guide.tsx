'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'REST API Best Practices: The Complete Guide for 2026',
    intro: 'Building a well-designed REST API is one of the most important skills for modern developers. A great API is intuitive, consistent, secure, and easy to maintain. This comprehensive guide covers everything from URL naming conventions and HTTP methods to authentication, pagination, rate limiting, and common mistakes. Whether you are building your first API or refining an existing one, these best practices will help you create APIs that developers love to use.',
    urlTitle: 'URL Naming Conventions',
    urlDesc: 'The foundation of a good REST API starts with well-designed URLs. Your endpoints should be predictable, readable, and follow consistent patterns.',
    urlNounsTitle: 'Use Nouns, Not Verbs',
    urlNounsDesc: 'REST resources should be identified by nouns. The HTTP method already indicates the action, so there is no need to include verbs in the URL path. Think of URLs as addresses to resources, not commands.',
    urlPluralsTitle: 'Use Plurals for Collections',
    urlPluralsDesc: 'Always use plural nouns for collection endpoints. This maintains consistency whether you are referencing a collection or a single resource within it.',
    urlNestedTitle: 'Nested Resources for Relationships',
    urlNestedDesc: 'Use nesting to express relationships between resources, but avoid going deeper than two levels. Deep nesting makes URLs hard to read and maintain.',
    urlTableTitle: 'URL Patterns: Good vs Bad',
    urlGood: 'Good',
    urlBad: 'Bad',
    urlReason: 'Reason',
    httpTitle: 'HTTP Methods',
    httpDesc: 'Each HTTP method has specific semantics. Using them correctly makes your API predictable and allows clients to understand the intent of each request without reading documentation.',
    httpMethod: 'Method',
    httpPurpose: 'Purpose',
    httpIdempotent: 'Idempotent',
    httpRequestBody: 'Request Body',
    httpExample: 'Example',
    statusTitle: 'HTTP Status Codes',
    statusDesc: 'Using the correct status codes helps clients handle responses appropriately. Here are the most important status codes for REST APIs and when to use each one.',
    statusCode: 'Code',
    statusName: 'Name',
    statusWhen: 'When to Use',
    errorTitle: 'Error Handling',
    errorDesc: 'Consistent error responses make your API easier to consume. Every error should return a structured JSON body with enough information for the client to understand and fix the problem.',
    errorStandardTitle: 'Standard Error Response Format',
    errorStandardDesc: 'Use a consistent error envelope for all error responses. Include a machine-readable error code, a human-readable message, and optional details.',
    errorValidationTitle: 'Validation Errors with Field-Level Details',
    errorValidationDesc: 'For 422 validation errors, include field-level error information so clients can display errors next to the correct form fields.',
    authTitle: 'Authentication & Authorization',
    authDesc: 'Choosing the right authentication strategy depends on your use case. Here is a comparison of the three most common approaches.',
    authApiKeyTitle: 'API Keys',
    authApiKeyDesc: 'Simple string tokens passed in headers or query parameters. Best for server-to-server communication and simple integrations. Easy to implement but offer limited security since keys are long-lived and hard to scope.',
    authJwtTitle: 'JWT Bearer Tokens',
    authJwtDesc: 'Self-contained tokens that carry user claims. The server can verify the token without a database lookup. Ideal for stateless authentication in microservices. Tokens should be short-lived with refresh token rotation.',
    authOauthTitle: 'OAuth 2.0',
    authOauthDesc: 'The industry standard for delegated authorization. Allows third-party applications to access resources on behalf of a user without exposing credentials. More complex to implement but provides the most flexibility and security.',
    authCompareTitle: 'Authentication Comparison',
    authFeature: 'Feature',
    paginationTitle: 'Pagination Patterns',
    paginationDesc: 'Any endpoint that returns a list of resources should support pagination. Without it, responses can become enormous and slow as your data grows.',
    paginationOffsetTitle: 'Offset-Based Pagination',
    paginationOffsetDesc: 'The simplest approach. Uses page number and limit parameters. Easy to implement and allows jumping to any page, but can be inconsistent when data is modified between requests.',
    paginationCursorTitle: 'Cursor-Based Pagination',
    paginationCursorDesc: 'Uses an opaque cursor token to mark the position in the dataset. More reliable for real-time data and large datasets because it does not skip or duplicate items when data changes.',
    paginationResponseTitle: 'Pagination Response Format',
    paginationResponseDesc: 'Include metadata about the pagination state in every paginated response. This allows clients to build navigation controls.',
    versionTitle: 'API Versioning Strategies',
    versionDesc: 'APIs evolve over time. Versioning allows you to make breaking changes without disrupting existing clients. Here are the three most common approaches.',
    versionStrategy: 'Strategy',
    versionExample: 'Example',
    versionPros: 'Pros',
    versionCons: 'Cons',
    rateLimitTitle: 'Rate Limiting',
    rateLimitDesc: 'Rate limiting protects your API from abuse and ensures fair usage across all clients. Always communicate rate limit status through response headers.',
    rateLimitHeadersTitle: 'Rate Limit Headers',
    rateLimitHeadersDesc: 'Include these headers in every response so clients can monitor their usage and avoid hitting limits.',
    rateLimitResponseTitle: '429 Too Many Requests Response',
    rateLimitResponseDesc: 'When a client exceeds the rate limit, return a 429 status with a Retry-After header indicating when they can make requests again.',
    rateLimitBackoffTitle: 'Backoff Strategies',
    rateLimitBackoffDesc: 'Clients should implement exponential backoff when they receive 429 responses. Start with a short delay and double it with each retry, up to a maximum.',
    securityTitle: 'Security Headers',
    securityDesc: 'Security headers protect your API from common web vulnerabilities. These headers should be included in every response from your API.',
    securityHeader: 'Header',
    securityValue: 'Recommended Value',
    securityPurpose: 'Purpose',
    docsTitle: 'API Documentation with OpenAPI',
    docsDesc: 'Good documentation is essential for API adoption. OpenAPI (formerly Swagger) is the standard for describing REST APIs. It enables automatic generation of documentation, client SDKs, and testing tools.',
    docsBest1: 'Write the OpenAPI spec first (design-first approach), then implement the API to match the spec.',
    docsBest2: 'Include detailed descriptions for every endpoint, parameter, and response schema.',
    docsBest3: 'Provide realistic example values for all request and response bodies.',
    docsBest4: 'Document error responses for every endpoint, not just success cases.',
    docsBest5: 'Use tags to group related endpoints and make the documentation navigable.',
    docsBest6: 'Version your OpenAPI spec alongside your API code.',
    docsBest7: 'Set up interactive documentation (Swagger UI or Redoc) so developers can try requests directly.',
    mistakesTitle: 'Common REST API Mistakes',
    mistakesDesc: 'Even experienced developers make these mistakes. Review this list to ensure your API follows best practices.',
    mistakeMistake: 'Mistake',
    mistakeWhy: 'Why It Is Wrong',
    mistakeFix: 'Fix',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between REST and RESTful?',
    faq1a: 'REST (Representational State Transfer) is an architectural style defined by Roy Fielding. RESTful is an adjective describing APIs that adhere to REST constraints. In practice, most "REST APIs" do not strictly follow all REST constraints (like HATEOAS), but the terms are used interchangeably.',
    faq2q: 'Should I use PUT or PATCH for updating resources?',
    faq2a: 'Use PUT when the client sends a complete replacement of the resource. Use PATCH for partial updates where only the changed fields are sent. PATCH is more bandwidth-efficient for large resources. Most modern APIs prefer PATCH for typical update operations.',
    faq3q: 'How should I handle API versioning?',
    faq3a: 'URL path versioning (e.g., /v1/users) is the most common and explicit approach. It is easy to understand, route, and cache. Header versioning is cleaner but harder to test and debug. Choose one strategy and apply it consistently across your entire API.',
    faq4q: 'What is the best way to handle authentication in REST APIs?',
    faq4a: 'For most applications, JWT Bearer tokens provide a good balance of security and simplicity. Use short-lived access tokens (15-60 minutes) with refresh token rotation. For third-party integrations, use OAuth 2.0. API keys are acceptable for server-to-server communication only.',
    faq5q: 'How do I design nested resources in REST APIs?',
    faq5a: 'Use nesting to show parent-child relationships: /users/123/orders. Limit nesting to two levels maximum. For deeper relationships, use query parameters or provide direct resource endpoints. For example, instead of /users/123/orders/456/items/789, use /order-items/789 or /orders/456/items/789.',
    faq6q: 'Should REST API responses include null fields or omit them?',
    faq6a: 'It depends on your contract. Including null fields makes the schema predictable - clients always know what fields to expect. Omitting null fields reduces payload size. Be consistent: pick one approach and document it. Many APIs include null for known fields and omit truly optional ones.',
    tryTool: 'Try these related developer tools',
  },
  zh: {
    title: 'REST API 最佳实践：2026 年完整指南',
    intro: '构建设计良好的 REST API 是现代开发者最重要的技能之一。优秀的 API 直观、一致、安全且易于维护。本综合指南涵盖从 URL 命名约定和 HTTP 方法到认证、分页、限流和常见错误的所有内容。无论你是在构建第一个 API 还是在优化现有 API，这些最佳实践都将帮助你创建开发者喜爱的 API。',
    urlTitle: 'URL 命名约定',
    urlDesc: '良好 REST API 的基础从精心设计的 URL 开始。你的端点应该是可预测的、可读的，并遵循一致的模式。',
    urlNounsTitle: '使用名词，而非动词',
    urlNounsDesc: 'REST 资源应该用名词来标识。HTTP 方法已经指示了操作，因此不需要在 URL 路径中包含动词。将 URL 视为资源的地址，而不是命令。',
    urlPluralsTitle: '集合使用复数形式',
    urlPluralsDesc: '始终对集合端点使用复数名词。无论是引用集合还是集合中的单个资源，这都保持了一致性。',
    urlNestedTitle: '嵌套资源表示关系',
    urlNestedDesc: '使用嵌套来表达资源之间的关系，但避免超过两层。深层嵌套使 URL 难以阅读和维护。',
    urlTableTitle: 'URL 模式：好 vs 坏',
    urlGood: '好',
    urlBad: '坏',
    urlReason: '原因',
    httpTitle: 'HTTP 方法',
    httpDesc: '每个 HTTP 方法都有特定的语义。正确使用它们使你的 API 可预测，并允许客户端无需阅读文档即可理解每个请求的意图。',
    httpMethod: '方法',
    httpPurpose: '用途',
    httpIdempotent: '幂等性',
    httpRequestBody: '请求体',
    httpExample: '示例',
    statusTitle: 'HTTP 状态码',
    statusDesc: '使用正确的状态码帮助客户端适当地处理响应。以下是 REST API 最重要的状态码及其使用时机。',
    statusCode: '状态码',
    statusName: '名称',
    statusWhen: '何时使用',
    errorTitle: '错误处理',
    errorDesc: '一致的错误响应使你的 API 更容易使用。每个错误都应该返回结构化的 JSON 正文，包含足够的信息让客户端理解和修复问题。',
    errorStandardTitle: '标准错误响应格式',
    errorStandardDesc: '对所有错误响应使用一致的错误封装。包括机器可读的错误代码、人类可读的消息和可选的详细信息。',
    errorValidationTitle: '带字段级详情的验证错误',
    errorValidationDesc: '对于 422 验证错误，包含字段级错误信息，以便客户端在正确的表单字段旁显示错误。',
    authTitle: '认证与授权',
    authDesc: '选择正确的认证策略取决于你的使用场景。以下是三种最常见方法的比较。',
    authApiKeyTitle: 'API 密钥',
    authApiKeyDesc: '通过头部或查询参数传递的简单字符串令牌。最适合服务器间通信和简单集成。易于实现但安全性有限，因为密钥是长期有效的且难以限定范围。',
    authJwtTitle: 'JWT Bearer 令牌',
    authJwtDesc: '携带用户声明的自包含令牌。服务器可以在不查询数据库的情况下验证令牌。非常适合微服务中的无状态认证。令牌应该是短期的，配合刷新令牌轮换。',
    authOauthTitle: 'OAuth 2.0',
    authOauthDesc: '委托授权的行业标准。允许第三方应用代表用户访问资源而不暴露凭证。实现更复杂但提供最大的灵活性和安全性。',
    authCompareTitle: '认证方式比较',
    authFeature: '特性',
    paginationTitle: '分页模式',
    paginationDesc: '任何返回资源列表的端点都应该支持分页。没有分页，随着数据增长，响应可能变得巨大且缓慢。',
    paginationOffsetTitle: '基于偏移的分页',
    paginationOffsetDesc: '最简单的方法。使用页码和限制参数。易于实现并允许跳转到任何页面，但当数据在请求之间被修改时可能不一致。',
    paginationCursorTitle: '基于游标的分页',
    paginationCursorDesc: '使用不透明的游标令牌来标记数据集中的位置。对于实时数据和大型数据集更可靠，因为当数据变化时不会跳过或重复项目。',
    paginationResponseTitle: '分页响应格式',
    paginationResponseDesc: '在每个分页响应中包含分页状态的元数据。这允许客户端构建导航控件。',
    versionTitle: 'API 版本控制策略',
    versionDesc: 'API 随时间演进。版本控制允许你在不中断现有客户端的情况下进行破坏性更改。以下是三种最常见的方法。',
    versionStrategy: '策略',
    versionExample: '示例',
    versionPros: '优点',
    versionCons: '缺点',
    rateLimitTitle: '限流',
    rateLimitDesc: '限流保护你的 API 免受滥用并确保所有客户端的公平使用。始终通过响应头传达限流状态。',
    rateLimitHeadersTitle: '限流头部',
    rateLimitHeadersDesc: '在每个响应中包含这些头部，以便客户端监控其使用情况并避免达到限制。',
    rateLimitResponseTitle: '429 请求过多响应',
    rateLimitResponseDesc: '当客户端超过限流时，返回带有 Retry-After 头的 429 状态，指示他们何时可以再次发出请求。',
    rateLimitBackoffTitle: '退避策略',
    rateLimitBackoffDesc: '客户端在收到 429 响应时应实现指数退避。从短延迟开始，每次重试加倍，直到最大值。',
    securityTitle: '安全头部',
    securityDesc: '安全头部保护你的 API 免受常见的 Web 漏洞。这些头部应包含在 API 的每个响应中。',
    securityHeader: '头部',
    securityValue: '推荐值',
    securityPurpose: '用途',
    docsTitle: '使用 OpenAPI 编写 API 文档',
    docsDesc: '良好的文档对 API 的采用至关重要。OpenAPI（以前称为 Swagger）是描述 REST API 的标准。它支持自动生成文档、客户端 SDK 和测试工具。',
    docsBest1: '先编写 OpenAPI 规范（设计优先方法），然后实现 API 以匹配规范。',
    docsBest2: '为每个端点、参数和响应 schema 包含详细描述。',
    docsBest3: '为所有请求和响应正文提供真实的示例值。',
    docsBest4: '为每个端点记录错误响应，不仅仅是成功情况。',
    docsBest5: '使用标签对相关端点进行分组，使文档易于导航。',
    docsBest6: '将 OpenAPI 规范与 API 代码一起进行版本控制。',
    docsBest7: '设置交互式文档（Swagger UI 或 Redoc），以便开发者可以直接尝试请求。',
    mistakesTitle: '常见 REST API 错误',
    mistakesDesc: '即使是经验丰富的开发者也会犯这些错误。查看此列表以确保你的 API 遵循最佳实践。',
    mistakeMistake: '错误',
    mistakeWhy: '为什么是错的',
    mistakeFix: '修复方法',
    faqTitle: '常见问题',
    faq1q: 'REST 和 RESTful 有什么区别？',
    faq1a: 'REST（表述性状态转移）是 Roy Fielding 定义的架构风格。RESTful 是描述遵守 REST 约束的 API 的形容词。实际上，大多数"REST API"并未严格遵循所有 REST 约束（如 HATEOAS），但这两个术语可以互换使用。',
    faq2q: '更新资源应该使用 PUT 还是 PATCH？',
    faq2a: '当客户端发送资源的完整替换时使用 PUT。对于只发送更改字段的部分更新使用 PATCH。PATCH 对大型资源更节省带宽。大多数现代 API 倾向于对典型更新操作使用 PATCH。',
    faq3q: '应该如何处理 API 版本控制？',
    faq3a: 'URL 路径版本控制（例如 /v1/users）是最常见且最明确的方法。它易于理解、路由和缓存。头部版本控制更简洁但更难测试和调试。选择一种策略并在整个 API 中一致应用。',
    faq4q: '在 REST API 中处理认证的最佳方式是什么？',
    faq4a: '对于大多数应用，JWT Bearer 令牌提供了安全性和简单性的良好平衡。使用短期访问令牌（15-60 分钟）配合刷新令牌轮换。对于第三方集成，使用 OAuth 2.0。API 密钥仅适用于服务器间通信。',
    faq5q: '如何在 REST API 中设计嵌套资源？',
    faq5a: '使用嵌套显示父子关系：/users/123/orders。最多限制两层嵌套。对于更深的关系，使用查询参数或提供直接资源端点。例如，用 /order-items/789 或 /orders/456/items/789 代替 /users/123/orders/456/items/789。',
    faq6q: 'REST API 响应应该包含 null 字段还是省略它们？',
    faq6a: '这取决于你的约定。包含 null 字段使 schema 可预测——客户端总是知道期望什么字段。省略 null 字段减少负载大小。保持一致：选择一种方法并记录下来。',
    tryTool: '试试这些相关开发者工具',
  },
  ja: {
    title: 'REST API ベストプラクティス：2026年完全ガイド',
    intro: '優れた REST API の構築は、現代の開発者にとって最も重要なスキルの一つです。優れた API は直感的で、一貫性があり、安全で、メンテナンスしやすいものです。この包括的なガイドでは、URL 命名規則や HTTP メソッドから認証、ページネーション、レート制限、よくある間違いまで、すべてを網羅しています。',
    urlTitle: 'URL 命名規則',
    urlDesc: '良い REST API の基盤は、適切に設計された URL から始まります。エンドポイントは予測可能で、読みやすく、一貫したパターンに従う必要があります。',
    urlNounsTitle: '動詞ではなく名詞を使用',
    urlNounsDesc: 'REST リソースは名詞で識別されるべきです。HTTP メソッドがすでにアクションを示しているため、URL パスに動詞を含める必要はありません。',
    urlPluralsTitle: 'コレクションには複数形を使用',
    urlPluralsDesc: 'コレクションエンドポイントには常に複数形の名詞を使用してください。これにより、コレクション全体を参照する場合でも、その中の単一リソースを参照する場合でも一貫性が保たれます。',
    urlNestedTitle: 'リレーションシップにはネストされたリソース',
    urlNestedDesc: 'ネストを使用してリソース間の関係を表現しますが、2レベルより深くならないようにしてください。',
    urlTableTitle: 'URL パターン：良い例 vs 悪い例',
    urlGood: '良い',
    urlBad: '悪い',
    urlReason: '理由',
    httpTitle: 'HTTP メソッド',
    httpDesc: '各 HTTP メソッドには特定のセマンティクスがあります。正しく使用することで、API が予測可能になります。',
    httpMethod: 'メソッド',
    httpPurpose: '目的',
    httpIdempotent: '冪等性',
    httpRequestBody: 'リクエストボディ',
    httpExample: '例',
    statusTitle: 'HTTP ステータスコード',
    statusDesc: '正しいステータスコードを使用することで、クライアントがレスポンスを適切に処理できるようになります。',
    statusCode: 'コード',
    statusName: '名前',
    statusWhen: '使用するタイミング',
    errorTitle: 'エラーハンドリング',
    errorDesc: '一貫したエラーレスポンスにより、API が使いやすくなります。すべてのエラーは構造化された JSON ボディを返す必要があります。',
    errorStandardTitle: '標準エラーレスポンス形式',
    errorStandardDesc: 'すべてのエラーレスポンスに一貫したエラーエンベロープを使用してください。',
    errorValidationTitle: 'フィールドレベルのバリデーションエラー',
    errorValidationDesc: '422 バリデーションエラーには、フィールドレベルのエラー情報を含めてください。',
    authTitle: '認証と認可',
    authDesc: '適切な認証戦略の選択はユースケースによって異なります。最も一般的な3つのアプローチの比較です。',
    authApiKeyTitle: 'API キー',
    authApiKeyDesc: 'ヘッダーやクエリパラメータで渡されるシンプルな文字列トークン。サーバー間通信に最適です。',
    authJwtTitle: 'JWT Bearer トークン',
    authJwtDesc: 'ユーザークレームを含む自己完結型トークン。マイクロサービスでのステートレス認証に最適です。',
    authOauthTitle: 'OAuth 2.0',
    authOauthDesc: '委任認可の業界標準。サードパーティアプリケーションがユーザーの代わりにリソースにアクセスできるようにします。',
    authCompareTitle: '認証方式の比較',
    authFeature: '機能',
    paginationTitle: 'ページネーションパターン',
    paginationDesc: 'リソースのリストを返すすべてのエンドポイントはページネーションをサポートする必要があります。',
    paginationOffsetTitle: 'オフセットベースのページネーション',
    paginationOffsetDesc: '最もシンプルなアプローチ。ページ番号とリミットパラメータを使用します。',
    paginationCursorTitle: 'カーソルベースのページネーション',
    paginationCursorDesc: '不透明なカーソルトークンを使用してデータセット内の位置をマークします。リアルタイムデータに適しています。',
    paginationResponseTitle: 'ページネーションレスポンス形式',
    paginationResponseDesc: 'すべてのページネーションレスポンスにメタデータを含めてください。',
    versionTitle: 'API バージョニング戦略',
    versionDesc: 'API は時間とともに進化します。バージョニングにより、既存のクライアントを中断することなく破壊的変更を行えます。',
    versionStrategy: '戦略',
    versionExample: '例',
    versionPros: '利点',
    versionCons: '欠点',
    rateLimitTitle: 'レート制限',
    rateLimitDesc: 'レート制限は API を乱用から保護し、すべてのクライアントの公平な使用を確保します。',
    rateLimitHeadersTitle: 'レート制限ヘッダー',
    rateLimitHeadersDesc: 'クライアントが使用状況を監視できるよう、すべてのレスポンスにこれらのヘッダーを含めてください。',
    rateLimitResponseTitle: '429 リクエスト過多レスポンス',
    rateLimitResponseDesc: 'クライアントがレート制限を超えた場合、Retry-After ヘッダー付きの 429 ステータスを返します。',
    rateLimitBackoffTitle: 'バックオフ戦略',
    rateLimitBackoffDesc: 'クライアントは 429 レスポンスを受け取った際、指数バックオフを実装する必要があります。',
    securityTitle: 'セキュリティヘッダー',
    securityDesc: 'セキュリティヘッダーは API を一般的な Web 脆弱性から保護します。',
    securityHeader: 'ヘッダー',
    securityValue: '推奨値',
    securityPurpose: '目的',
    docsTitle: 'OpenAPI による API ドキュメント',
    docsDesc: '良いドキュメントは API の採用に不可欠です。OpenAPI は REST API を記述するための標準です。',
    docsBest1: 'まず OpenAPI 仕様を書き（デザインファーストアプローチ）、次に仕様に合わせて API を実装します。',
    docsBest2: 'すべてのエンドポイント、パラメータ、レスポンススキーマに詳細な説明を含めてください。',
    docsBest3: 'すべてのリクエストとレスポンスボディにリアルな例の値を提供してください。',
    docsBest4: 'すべてのエンドポイントのエラーレスポンスを文書化してください。',
    docsBest5: 'タグを使用して関連エンドポイントをグループ化してください。',
    docsBest6: 'OpenAPI 仕様を API コードと一緒にバージョン管理してください。',
    docsBest7: 'インタラクティブなドキュメント（Swagger UI または Redoc）を設定してください。',
    mistakesTitle: 'よくある REST API の間違い',
    mistakesDesc: '経験豊富な開発者でもこれらの間違いを犯します。API がベストプラクティスに従っていることを確認してください。',
    mistakeMistake: '間違い',
    mistakeWhy: 'なぜ問題か',
    mistakeFix: '修正方法',
    faqTitle: 'よくある質問',
    faq1q: 'REST と RESTful の違いは何ですか？',
    faq1a: 'REST は Roy Fielding が定義したアーキテクチャスタイルです。RESTful は REST 制約に準拠する API を表す形容詞です。実際にはほとんどの「REST API」はすべての REST 制約に厳密に従っていませんが、用語は互換的に使われます。',
    faq2q: 'リソースの更新には PUT と PATCH のどちらを使うべきですか？',
    faq2a: 'クライアントがリソースの完全な置換を送信する場合は PUT を使用します。変更されたフィールドのみを送信する部分更新には PATCH を使用します。',
    faq3q: 'API バージョニングはどのように処理すべきですか？',
    faq3a: 'URL パスバージョニング（例：/v1/users）が最も一般的で明示的なアプローチです。理解しやすく、ルーティングやキャッシュも容易です。',
    faq4q: 'REST API での認証を処理する最良の方法は何ですか？',
    faq4a: 'ほとんどのアプリケーションでは、JWT Bearer トークンがセキュリティとシンプルさの良いバランスを提供します。短期アクセストークンとリフレッシュトークンローテーションを使用してください。',
    faq5q: 'REST API でネストされたリソースをどのように設計すべきですか？',
    faq5a: 'ネストを使用して親子関係を示します：/users/123/orders。ネストは最大2レベルまでに制限してください。',
    faq6q: 'REST API レスポンスは null フィールドを含めるべきですか、省略すべきですか？',
    faq6a: '契約によります。null フィールドを含めるとスキーマが予測可能になります。省略するとペイロードサイズが減ります。一貫性を保ち、ドキュメント化してください。',
    tryTool: '関連する開発者ツールを試す',
  },
  ko: {
    title: 'REST API 모범 사례: 2026년 완전 가이드',
    intro: '잘 설계된 REST API를 구축하는 것은 현대 개발자에게 가장 중요한 기술 중 하나입니다. 훌륭한 API는 직관적이고, 일관되며, 안전하고, 유지보수가 쉽습니다. 이 종합 가이드는 URL 명명 규칙과 HTTP 메서드부터 인증, 페이지네이션, 속도 제한, 일반적인 실수까지 모든 것을 다룹니다.',
    urlTitle: 'URL 명명 규칙',
    urlDesc: '좋은 REST API의 기반은 잘 설계된 URL에서 시작됩니다. 엔드포인트는 예측 가능하고, 읽기 쉬우며, 일관된 패턴을 따라야 합니다.',
    urlNounsTitle: '동사가 아닌 명사 사용',
    urlNounsDesc: 'REST 리소스는 명사로 식별되어야 합니다. HTTP 메서드가 이미 동작을 나타내므로 URL 경로에 동사를 포함할 필요가 없습니다.',
    urlPluralsTitle: '컬렉션에는 복수형 사용',
    urlPluralsDesc: '컬렉션 엔드포인트에는 항상 복수 명사를 사용하세요. 이렇게 하면 컬렉션 전체나 그 안의 단일 리소스를 참조할 때 일관성이 유지됩니다.',
    urlNestedTitle: '관계를 위한 중첩 리소스',
    urlNestedDesc: '중첩을 사용하여 리소스 간의 관계를 표현하되, 2단계 이상 깊이 들어가지 마세요.',
    urlTableTitle: 'URL 패턴: 좋은 예 vs 나쁜 예',
    urlGood: '좋은 예',
    urlBad: '나쁜 예',
    urlReason: '이유',
    httpTitle: 'HTTP 메서드',
    httpDesc: '각 HTTP 메서드에는 특정 의미가 있습니다. 올바르게 사용하면 API가 예측 가능해집니다.',
    httpMethod: '메서드',
    httpPurpose: '목적',
    httpIdempotent: '멱등성',
    httpRequestBody: '요청 본문',
    httpExample: '예시',
    statusTitle: 'HTTP 상태 코드',
    statusDesc: '올바른 상태 코드를 사용하면 클라이언트가 응답을 적절하게 처리할 수 있습니다.',
    statusCode: '코드',
    statusName: '이름',
    statusWhen: '사용 시기',
    errorTitle: '오류 처리',
    errorDesc: '일관된 오류 응답은 API를 더 쉽게 사용할 수 있게 합니다. 모든 오류는 구조화된 JSON 본문을 반환해야 합니다.',
    errorStandardTitle: '표준 오류 응답 형식',
    errorStandardDesc: '모든 오류 응답에 일관된 오류 봉투를 사용하세요.',
    errorValidationTitle: '필드 수준 유효성 검사 오류',
    errorValidationDesc: '422 유효성 검사 오류의 경우 필드 수준 오류 정보를 포함하세요.',
    authTitle: '인증 및 권한 부여',
    authDesc: '올바른 인증 전략 선택은 사용 사례에 따라 다릅니다. 가장 일반적인 세 가지 접근 방식의 비교입니다.',
    authApiKeyTitle: 'API 키',
    authApiKeyDesc: '헤더나 쿼리 매개변수로 전달되는 간단한 문자열 토큰입니다. 서버 간 통신에 가장 적합합니다.',
    authJwtTitle: 'JWT Bearer 토큰',
    authJwtDesc: '사용자 클레임을 포함하는 자체 포함 토큰입니다. 마이크로서비스에서의 무상태 인증에 이상적입니다.',
    authOauthTitle: 'OAuth 2.0',
    authOauthDesc: '위임된 권한 부여의 업계 표준입니다. 서드파티 애플리케이션이 사용자를 대신하여 리소스에 접근할 수 있게 합니다.',
    authCompareTitle: '인증 방식 비교',
    authFeature: '기능',
    paginationTitle: '페이지네이션 패턴',
    paginationDesc: '리소스 목록을 반환하는 모든 엔드포인트는 페이지네이션을 지원해야 합니다.',
    paginationOffsetTitle: '오프셋 기반 페이지네이션',
    paginationOffsetDesc: '가장 간단한 접근 방식입니다. 페이지 번호와 제한 매개변수를 사용합니다.',
    paginationCursorTitle: '커서 기반 페이지네이션',
    paginationCursorDesc: '불투명한 커서 토큰을 사용하여 데이터셋 내 위치를 표시합니다. 실시간 데이터에 더 적합합니다.',
    paginationResponseTitle: '페이지네이션 응답 형식',
    paginationResponseDesc: '모든 페이지네이션 응답에 메타데이터를 포함하세요.',
    versionTitle: 'API 버전 관리 전략',
    versionDesc: 'API는 시간이 지남에 따라 진화합니다. 버전 관리를 통해 기존 클라이언트를 중단하지 않고 변경할 수 있습니다.',
    versionStrategy: '전략',
    versionExample: '예시',
    versionPros: '장점',
    versionCons: '단점',
    rateLimitTitle: '속도 제한',
    rateLimitDesc: '속도 제한은 API를 남용으로부터 보호하고 모든 클라이언트의 공정한 사용을 보장합니다.',
    rateLimitHeadersTitle: '속도 제한 헤더',
    rateLimitHeadersDesc: '클라이언트가 사용량을 모니터링할 수 있도록 모든 응답에 이 헤더를 포함하세요.',
    rateLimitResponseTitle: '429 요청 과다 응답',
    rateLimitResponseDesc: '클라이언트가 속도 제한을 초과하면 Retry-After 헤더와 함께 429 상태를 반환합니다.',
    rateLimitBackoffTitle: '백오프 전략',
    rateLimitBackoffDesc: '클라이언트는 429 응답을 받을 때 지수 백오프를 구현해야 합니다.',
    securityTitle: '보안 헤더',
    securityDesc: '보안 헤더는 일반적인 웹 취약점으로부터 API를 보호합니다.',
    securityHeader: '헤더',
    securityValue: '권장 값',
    securityPurpose: '목적',
    docsTitle: 'OpenAPI로 API 문서화',
    docsDesc: '좋은 문서는 API 채택에 필수적입니다. OpenAPI는 REST API를 설명하는 표준입니다.',
    docsBest1: '먼저 OpenAPI 사양을 작성한 다음(설계 우선 접근), 사양에 맞게 API를 구현합니다.',
    docsBest2: '모든 엔드포인트, 매개변수 및 응답 스키마에 상세한 설명을 포함하세요.',
    docsBest3: '모든 요청 및 응답 본문에 현실적인 예시 값을 제공하세요.',
    docsBest4: '성공 사례뿐만 아니라 모든 엔드포인트의 오류 응답을 문서화하세요.',
    docsBest5: '태그를 사용하여 관련 엔드포인트를 그룹화하세요.',
    docsBest6: 'OpenAPI 사양을 API 코드와 함께 버전 관리하세요.',
    docsBest7: '개발자가 직접 요청을 시도할 수 있도록 대화형 문서(Swagger UI 또는 Redoc)를 설정하세요.',
    mistakesTitle: '일반적인 REST API 실수',
    mistakesDesc: '경험 많은 개발자도 이러한 실수를 합니다. API가 모범 사례를 따르는지 확인하세요.',
    mistakeMistake: '실수',
    mistakeWhy: '왜 문제인가',
    mistakeFix: '해결 방법',
    faqTitle: '자주 묻는 질문',
    faq1q: 'REST와 RESTful의 차이점은 무엇인가요?',
    faq1a: 'REST는 Roy Fielding이 정의한 아키텍처 스타일입니다. RESTful은 REST 제약을 준수하는 API를 설명하는 형용사입니다. 실제로 대부분의 "REST API"는 모든 REST 제약을 엄격히 따르지 않지만 용어는 호환적으로 사용됩니다.',
    faq2q: '리소스 업데이트에 PUT과 PATCH 중 어떤 것을 사용해야 하나요?',
    faq2a: '클라이언트가 리소스의 전체 교체를 보내는 경우 PUT을 사용합니다. 변경된 필드만 보내는 부분 업데이트에는 PATCH를 사용합니다.',
    faq3q: 'API 버전 관리는 어떻게 처리해야 하나요?',
    faq3a: 'URL 경로 버전 관리(예: /v1/users)가 가장 일반적이고 명시적인 접근 방식입니다. 이해, 라우팅, 캐싱이 쉽습니다.',
    faq4q: 'REST API에서 인증을 처리하는 가장 좋은 방법은 무엇인가요?',
    faq4a: '대부분의 애플리케이션에서 JWT Bearer 토큰은 보안과 단순성의 좋은 균형을 제공합니다. 단기 액세스 토큰과 리프레시 토큰 순환을 사용하세요.',
    faq5q: 'REST API에서 중첩된 리소스를 어떻게 설계해야 하나요?',
    faq5a: '중첩을 사용하여 부모-자식 관계를 보여줍니다: /users/123/orders. 중첩은 최대 2단계까지로 제한하세요.',
    faq6q: 'REST API 응답에 null 필드를 포함해야 하나요, 생략해야 하나요?',
    faq6a: '계약에 따라 다릅니다. null 필드를 포함하면 스키마가 예측 가능해집니다. 생략하면 페이로드 크기가 줄어듭니다. 일관성을 유지하고 문서화하세요.',
    tryTool: '관련 개발자 도구 사용해보기',
  },
  fr: {
    title: 'Meilleures pratiques REST API : Le guide complet pour 2026',
    intro: 'Construire une API REST bien conçue est l\'une des compétences les plus importantes pour les développeurs modernes. Une excellente API est intuitive, cohérente, sécurisée et facile à maintenir. Ce guide complet couvre tout, des conventions de nommage d\'URL et des méthodes HTTP à l\'authentification, la pagination, la limitation de débit et les erreurs courantes.',
    urlTitle: 'Conventions de nommage d\'URL',
    urlDesc: 'La base d\'une bonne API REST commence par des URL bien conçues. Vos points de terminaison doivent être prévisibles, lisibles et suivre des modèles cohérents.',
    urlNounsTitle: 'Utilisez des noms, pas des verbes',
    urlNounsDesc: 'Les ressources REST doivent être identifiées par des noms. La méthode HTTP indique déjà l\'action, il n\'est donc pas nécessaire d\'inclure des verbes dans le chemin URL.',
    urlPluralsTitle: 'Utilisez le pluriel pour les collections',
    urlPluralsDesc: 'Utilisez toujours des noms au pluriel pour les points de terminaison de collection. Cela maintient la cohérence.',
    urlNestedTitle: 'Ressources imbriquées pour les relations',
    urlNestedDesc: 'Utilisez l\'imbrication pour exprimer les relations entre les ressources, mais évitez d\'aller au-delà de deux niveaux.',
    urlTableTitle: 'Modèles d\'URL : Bon vs Mauvais',
    urlGood: 'Bon',
    urlBad: 'Mauvais',
    urlReason: 'Raison',
    httpTitle: 'Méthodes HTTP',
    httpDesc: 'Chaque méthode HTTP a une sémantique spécifique. Les utiliser correctement rend votre API prévisible.',
    httpMethod: 'Méthode',
    httpPurpose: 'Objectif',
    httpIdempotent: 'Idempotent',
    httpRequestBody: 'Corps de requête',
    httpExample: 'Exemple',
    statusTitle: 'Codes de statut HTTP',
    statusDesc: 'L\'utilisation des codes de statut corrects aide les clients à gérer les réponses de manière appropriée.',
    statusCode: 'Code',
    statusName: 'Nom',
    statusWhen: 'Quand utiliser',
    errorTitle: 'Gestion des erreurs',
    errorDesc: 'Des réponses d\'erreur cohérentes rendent votre API plus facile à consommer. Chaque erreur doit retourner un corps JSON structuré.',
    errorStandardTitle: 'Format de réponse d\'erreur standard',
    errorStandardDesc: 'Utilisez une enveloppe d\'erreur cohérente pour toutes les réponses d\'erreur.',
    errorValidationTitle: 'Erreurs de validation au niveau des champs',
    errorValidationDesc: 'Pour les erreurs de validation 422, incluez des informations d\'erreur au niveau des champs.',
    authTitle: 'Authentification et autorisation',
    authDesc: 'Le choix de la bonne stratégie d\'authentification dépend de votre cas d\'utilisation.',
    authApiKeyTitle: 'Clés API',
    authApiKeyDesc: 'Jetons de chaîne simples passés dans les en-têtes ou les paramètres de requête. Idéaux pour la communication serveur à serveur.',
    authJwtTitle: 'Jetons JWT Bearer',
    authJwtDesc: 'Jetons autonomes contenant les revendications de l\'utilisateur. Idéaux pour l\'authentification sans état dans les microservices.',
    authOauthTitle: 'OAuth 2.0',
    authOauthDesc: 'La norme industrielle pour l\'autorisation déléguée. Permet aux applications tierces d\'accéder aux ressources au nom d\'un utilisateur.',
    authCompareTitle: 'Comparaison des authentifications',
    authFeature: 'Fonctionnalité',
    paginationTitle: 'Modèles de pagination',
    paginationDesc: 'Tout point de terminaison retournant une liste de ressources doit supporter la pagination.',
    paginationOffsetTitle: 'Pagination basée sur l\'offset',
    paginationOffsetDesc: 'L\'approche la plus simple. Utilise le numéro de page et les paramètres de limite.',
    paginationCursorTitle: 'Pagination basée sur le curseur',
    paginationCursorDesc: 'Utilise un jeton curseur opaque pour marquer la position dans l\'ensemble de données.',
    paginationResponseTitle: 'Format de réponse de pagination',
    paginationResponseDesc: 'Incluez des métadonnées sur l\'état de pagination dans chaque réponse paginée.',
    versionTitle: 'Stratégies de versionnement d\'API',
    versionDesc: 'Les API évoluent avec le temps. Le versionnement vous permet d\'apporter des changements incompatibles sans perturber les clients existants.',
    versionStrategy: 'Stratégie',
    versionExample: 'Exemple',
    versionPros: 'Avantages',
    versionCons: 'Inconvénients',
    rateLimitTitle: 'Limitation de débit',
    rateLimitDesc: 'La limitation de débit protège votre API contre les abus et assure une utilisation équitable.',
    rateLimitHeadersTitle: 'En-têtes de limitation de débit',
    rateLimitHeadersDesc: 'Incluez ces en-têtes dans chaque réponse pour que les clients puissent surveiller leur utilisation.',
    rateLimitResponseTitle: 'Réponse 429 Trop de requêtes',
    rateLimitResponseDesc: 'Lorsqu\'un client dépasse la limite, retournez un statut 429 avec un en-tête Retry-After.',
    rateLimitBackoffTitle: 'Stratégies de backoff',
    rateLimitBackoffDesc: 'Les clients doivent implémenter un backoff exponentiel lorsqu\'ils reçoivent des réponses 429.',
    securityTitle: 'En-têtes de sécurité',
    securityDesc: 'Les en-têtes de sécurité protègent votre API contre les vulnérabilités web courantes.',
    securityHeader: 'En-tête',
    securityValue: 'Valeur recommandée',
    securityPurpose: 'Objectif',
    docsTitle: 'Documentation API avec OpenAPI',
    docsDesc: 'Une bonne documentation est essentielle pour l\'adoption de l\'API. OpenAPI est la norme pour décrire les API REST.',
    docsBest1: 'Écrivez d\'abord la spécification OpenAPI (approche design-first), puis implémentez l\'API.',
    docsBest2: 'Incluez des descriptions détaillées pour chaque point de terminaison, paramètre et schéma de réponse.',
    docsBest3: 'Fournissez des valeurs d\'exemple réalistes pour tous les corps de requête et de réponse.',
    docsBest4: 'Documentez les réponses d\'erreur pour chaque point de terminaison.',
    docsBest5: 'Utilisez des tags pour regrouper les points de terminaison liés.',
    docsBest6: 'Versionnez votre spécification OpenAPI avec votre code API.',
    docsBest7: 'Mettez en place une documentation interactive (Swagger UI ou Redoc).',
    mistakesTitle: 'Erreurs courantes des API REST',
    mistakesDesc: 'Même les développeurs expérimentés font ces erreurs. Vérifiez cette liste pour vous assurer que votre API suit les meilleures pratiques.',
    mistakeMistake: 'Erreur',
    mistakeWhy: 'Pourquoi c\'est faux',
    mistakeFix: 'Solution',
    faqTitle: 'Questions fréquemment posées',
    faq1q: 'Quelle est la différence entre REST et RESTful ?',
    faq1a: 'REST est un style architectural défini par Roy Fielding. RESTful est un adjectif décrivant les API qui adhèrent aux contraintes REST. En pratique, la plupart des « API REST » ne suivent pas strictement toutes les contraintes, mais les termes sont utilisés de manière interchangeable.',
    faq2q: 'Dois-je utiliser PUT ou PATCH pour mettre à jour des ressources ?',
    faq2a: 'Utilisez PUT lorsque le client envoie un remplacement complet de la ressource. Utilisez PATCH pour les mises à jour partielles. PATCH est plus efficace en bande passante pour les grandes ressources.',
    faq3q: 'Comment gérer le versionnement de l\'API ?',
    faq3a: 'Le versionnement par chemin URL (ex: /v1/users) est l\'approche la plus courante et explicite. Il est facile à comprendre, router et mettre en cache.',
    faq4q: 'Quelle est la meilleure façon de gérer l\'authentification dans les API REST ?',
    faq4a: 'Pour la plupart des applications, les jetons JWT Bearer offrent un bon équilibre entre sécurité et simplicité. Utilisez des jetons d\'accès de courte durée avec rotation des jetons de rafraîchissement.',
    faq5q: 'Comment concevoir des ressources imbriquées dans les API REST ?',
    faq5a: 'Utilisez l\'imbrication pour montrer les relations parent-enfant : /users/123/orders. Limitez l\'imbrication à deux niveaux maximum.',
    faq6q: 'Les réponses API REST doivent-elles inclure les champs null ou les omettre ?',
    faq6a: 'Cela dépend de votre contrat. Inclure les champs null rend le schéma prévisible. Les omettre réduit la taille de la charge utile. Soyez cohérent et documentez votre choix.',
    tryTool: 'Essayez ces outils de développement associés',
  },
  de: {
    title: 'REST API Best Practices: Der vollständige Leitfaden für 2026',
    intro: 'Das Erstellen einer gut gestalteten REST API ist eine der wichtigsten Fähigkeiten für moderne Entwickler. Eine großartige API ist intuitiv, konsistent, sicher und einfach zu warten. Dieser umfassende Leitfaden behandelt alles von URL-Benennungskonventionen und HTTP-Methoden bis hin zu Authentifizierung, Paginierung, Rate Limiting und häufigen Fehlern.',
    urlTitle: 'URL-Benennungskonventionen',
    urlDesc: 'Das Fundament einer guten REST API beginnt mit gut gestalteten URLs. Ihre Endpunkte sollten vorhersagbar, lesbar und konsistent sein.',
    urlNounsTitle: 'Verwenden Sie Substantive, keine Verben',
    urlNounsDesc: 'REST-Ressourcen sollten durch Substantive identifiziert werden. Die HTTP-Methode gibt bereits die Aktion an.',
    urlPluralsTitle: 'Verwenden Sie Pluralformen für Sammlungen',
    urlPluralsDesc: 'Verwenden Sie immer Plural-Substantive für Sammlungsendpunkte. Dies sorgt für Konsistenz.',
    urlNestedTitle: 'Verschachtelte Ressourcen für Beziehungen',
    urlNestedDesc: 'Verwenden Sie Verschachtelung, um Beziehungen zwischen Ressourcen auszudrücken, aber gehen Sie nicht tiefer als zwei Ebenen.',
    urlTableTitle: 'URL-Muster: Gut vs Schlecht',
    urlGood: 'Gut',
    urlBad: 'Schlecht',
    urlReason: 'Grund',
    httpTitle: 'HTTP-Methoden',
    httpDesc: 'Jede HTTP-Methode hat eine spezifische Semantik. Die korrekte Verwendung macht Ihre API vorhersagbar.',
    httpMethod: 'Methode',
    httpPurpose: 'Zweck',
    httpIdempotent: 'Idempotent',
    httpRequestBody: 'Request Body',
    httpExample: 'Beispiel',
    statusTitle: 'HTTP-Statuscodes',
    statusDesc: 'Die Verwendung der richtigen Statuscodes hilft Clients, Antworten angemessen zu verarbeiten.',
    statusCode: 'Code',
    statusName: 'Name',
    statusWhen: 'Wann verwenden',
    errorTitle: 'Fehlerbehandlung',
    errorDesc: 'Konsistente Fehlerantworten machen Ihre API einfacher zu nutzen. Jeder Fehler sollte einen strukturierten JSON-Body zurückgeben.',
    errorStandardTitle: 'Standard-Fehlerantwortformat',
    errorStandardDesc: 'Verwenden Sie einen konsistenten Fehlerumschlag für alle Fehlerantworten.',
    errorValidationTitle: 'Validierungsfehler mit Felddetails',
    errorValidationDesc: 'Bei 422-Validierungsfehlern fügen Sie feldspezifische Fehlerinformationen hinzu.',
    authTitle: 'Authentifizierung und Autorisierung',
    authDesc: 'Die Wahl der richtigen Authentifizierungsstrategie hängt von Ihrem Anwendungsfall ab.',
    authApiKeyTitle: 'API-Schlüssel',
    authApiKeyDesc: 'Einfache String-Token, die in Headern oder Query-Parametern übergeben werden. Am besten für Server-zu-Server-Kommunikation.',
    authJwtTitle: 'JWT Bearer Token',
    authJwtDesc: 'Selbständige Token mit Benutzer-Claims. Ideal für zustandslose Authentifizierung in Microservices.',
    authOauthTitle: 'OAuth 2.0',
    authOauthDesc: 'Der Industriestandard für delegierte Autorisierung. Ermöglicht Drittanwendungen den Zugriff im Namen eines Benutzers.',
    authCompareTitle: 'Authentifizierungsvergleich',
    authFeature: 'Funktion',
    paginationTitle: 'Paginierungsmuster',
    paginationDesc: 'Jeder Endpunkt, der eine Ressourcenliste zurückgibt, sollte Paginierung unterstützen.',
    paginationOffsetTitle: 'Offset-basierte Paginierung',
    paginationOffsetDesc: 'Der einfachste Ansatz. Verwendet Seitennummer und Limit-Parameter.',
    paginationCursorTitle: 'Cursor-basierte Paginierung',
    paginationCursorDesc: 'Verwendet ein opakes Cursor-Token zur Markierung der Position im Datensatz.',
    paginationResponseTitle: 'Paginierungsantwortformat',
    paginationResponseDesc: 'Fügen Sie Metadaten zum Paginierungsstatus in jede paginierte Antwort ein.',
    versionTitle: 'API-Versionierungsstrategien',
    versionDesc: 'APIs entwickeln sich weiter. Versionierung ermöglicht Breaking Changes ohne bestehende Clients zu stören.',
    versionStrategy: 'Strategie',
    versionExample: 'Beispiel',
    versionPros: 'Vorteile',
    versionCons: 'Nachteile',
    rateLimitTitle: 'Rate Limiting',
    rateLimitDesc: 'Rate Limiting schützt Ihre API vor Missbrauch und gewährleistet faire Nutzung.',
    rateLimitHeadersTitle: 'Rate-Limit-Header',
    rateLimitHeadersDesc: 'Fügen Sie diese Header in jede Antwort ein, damit Clients ihre Nutzung überwachen können.',
    rateLimitResponseTitle: '429 Zu viele Anfragen',
    rateLimitResponseDesc: 'Wenn ein Client das Limit überschreitet, geben Sie einen 429-Status mit Retry-After-Header zurück.',
    rateLimitBackoffTitle: 'Backoff-Strategien',
    rateLimitBackoffDesc: 'Clients sollten exponentielles Backoff implementieren, wenn sie 429-Antworten erhalten.',
    securityTitle: 'Sicherheitsheader',
    securityDesc: 'Sicherheitsheader schützen Ihre API vor gängigen Web-Schwachstellen.',
    securityHeader: 'Header',
    securityValue: 'Empfohlener Wert',
    securityPurpose: 'Zweck',
    docsTitle: 'API-Dokumentation mit OpenAPI',
    docsDesc: 'Gute Dokumentation ist für die API-Akzeptanz unerlässlich. OpenAPI ist der Standard zur Beschreibung von REST APIs.',
    docsBest1: 'Schreiben Sie zuerst die OpenAPI-Spezifikation (Design-First-Ansatz), dann implementieren Sie die API.',
    docsBest2: 'Fügen Sie detaillierte Beschreibungen für jeden Endpunkt, Parameter und Antwortschema hinzu.',
    docsBest3: 'Stellen Sie realistische Beispielwerte für alle Request- und Response-Bodies bereit.',
    docsBest4: 'Dokumentieren Sie Fehlerantworten für jeden Endpunkt.',
    docsBest5: 'Verwenden Sie Tags, um verwandte Endpunkte zu gruppieren.',
    docsBest6: 'Versionieren Sie Ihre OpenAPI-Spezifikation zusammen mit Ihrem API-Code.',
    docsBest7: 'Richten Sie interaktive Dokumentation (Swagger UI oder Redoc) ein.',
    mistakesTitle: 'Häufige REST API Fehler',
    mistakesDesc: 'Selbst erfahrene Entwickler machen diese Fehler. Überprüfen Sie diese Liste.',
    mistakeMistake: 'Fehler',
    mistakeWhy: 'Warum ist es falsch',
    mistakeFix: 'Lösung',
    faqTitle: 'Häufig gestellte Fragen',
    faq1q: 'Was ist der Unterschied zwischen REST und RESTful?',
    faq1a: 'REST ist ein von Roy Fielding definierter Architekturstil. RESTful ist ein Adjektiv, das APIs beschreibt, die REST-Einschränkungen einhalten. In der Praxis werden die Begriffe austauschbar verwendet.',
    faq2q: 'Soll ich PUT oder PATCH zum Aktualisieren von Ressourcen verwenden?',
    faq2a: 'Verwenden Sie PUT, wenn der Client einen vollständigen Ersatz der Ressource sendet. Verwenden Sie PATCH für partielle Updates. PATCH ist bandbreiteneffizienter.',
    faq3q: 'Wie sollte ich die API-Versionierung handhaben?',
    faq3a: 'URL-Pfad-Versionierung (z.B. /v1/users) ist der gängigste und expliziteste Ansatz. Er ist leicht zu verstehen, zu routen und zu cachen.',
    faq4q: 'Was ist der beste Weg zur Authentifizierung in REST APIs?',
    faq4a: 'Für die meisten Anwendungen bieten JWT Bearer Token eine gute Balance zwischen Sicherheit und Einfachheit. Verwenden Sie kurzlebige Zugriffstoken mit Refresh-Token-Rotation.',
    faq5q: 'Wie entwerfe ich verschachtelte Ressourcen in REST APIs?',
    faq5a: 'Verwenden Sie Verschachtelung für Eltern-Kind-Beziehungen: /users/123/orders. Begrenzen Sie die Verschachtelung auf maximal zwei Ebenen.',
    faq6q: 'Sollten REST API Antworten null-Felder enthalten oder weglassen?',
    faq6a: 'Das hängt von Ihrem Vertrag ab. Null-Felder einzuschließen macht das Schema vorhersagbar. Sie wegzulassen reduziert die Payload-Größe. Seien Sie konsistent und dokumentieren Sie es.',
    tryTool: 'Probieren Sie diese verwandten Entwicklertools',
  },
  es: {
    title: 'Mejores prácticas de REST API: La guía completa para 2026',
    intro: 'Construir una API REST bien diseñada es una de las habilidades más importantes para los desarrolladores modernos. Una gran API es intuitiva, consistente, segura y fácil de mantener. Esta guía completa cubre todo, desde convenciones de nomenclatura de URL y métodos HTTP hasta autenticación, paginación, limitación de velocidad y errores comunes.',
    urlTitle: 'Convenciones de nomenclatura de URL',
    urlDesc: 'La base de una buena API REST comienza con URLs bien diseñadas. Tus endpoints deben ser predecibles, legibles y seguir patrones consistentes.',
    urlNounsTitle: 'Usa sustantivos, no verbos',
    urlNounsDesc: 'Los recursos REST deben identificarse mediante sustantivos. El método HTTP ya indica la acción.',
    urlPluralsTitle: 'Usa plurales para colecciones',
    urlPluralsDesc: 'Siempre usa sustantivos en plural para endpoints de colección. Esto mantiene la consistencia.',
    urlNestedTitle: 'Recursos anidados para relaciones',
    urlNestedDesc: 'Usa el anidamiento para expresar relaciones entre recursos, pero evita ir más allá de dos niveles.',
    urlTableTitle: 'Patrones de URL: Buenos vs Malos',
    urlGood: 'Bueno',
    urlBad: 'Malo',
    urlReason: 'Razón',
    httpTitle: 'Métodos HTTP',
    httpDesc: 'Cada método HTTP tiene semántica específica. Usarlos correctamente hace tu API predecible.',
    httpMethod: 'Método',
    httpPurpose: 'Propósito',
    httpIdempotent: 'Idempotente',
    httpRequestBody: 'Cuerpo de solicitud',
    httpExample: 'Ejemplo',
    statusTitle: 'Códigos de estado HTTP',
    statusDesc: 'Usar los códigos de estado correctos ayuda a los clientes a manejar las respuestas apropiadamente.',
    statusCode: 'Código',
    statusName: 'Nombre',
    statusWhen: 'Cuándo usar',
    errorTitle: 'Manejo de errores',
    errorDesc: 'Las respuestas de error consistentes hacen tu API más fácil de consumir. Cada error debe devolver un cuerpo JSON estructurado.',
    errorStandardTitle: 'Formato estándar de respuesta de error',
    errorStandardDesc: 'Usa un sobre de error consistente para todas las respuestas de error.',
    errorValidationTitle: 'Errores de validación a nivel de campo',
    errorValidationDesc: 'Para errores de validación 422, incluye información de error a nivel de campo.',
    authTitle: 'Autenticación y autorización',
    authDesc: 'Elegir la estrategia de autenticación correcta depende de tu caso de uso.',
    authApiKeyTitle: 'Claves API',
    authApiKeyDesc: 'Tokens de cadena simples pasados en encabezados o parámetros de consulta. Ideales para comunicación servidor a servidor.',
    authJwtTitle: 'Tokens JWT Bearer',
    authJwtDesc: 'Tokens autocontenidos que llevan reclamaciones del usuario. Ideales para autenticación sin estado en microservicios.',
    authOauthTitle: 'OAuth 2.0',
    authOauthDesc: 'El estándar de la industria para autorización delegada. Permite a aplicaciones de terceros acceder a recursos en nombre de un usuario.',
    authCompareTitle: 'Comparación de autenticación',
    authFeature: 'Característica',
    paginationTitle: 'Patrones de paginación',
    paginationDesc: 'Cualquier endpoint que devuelva una lista de recursos debe soportar paginación.',
    paginationOffsetTitle: 'Paginación basada en offset',
    paginationOffsetDesc: 'El enfoque más simple. Usa número de página y parámetros de límite.',
    paginationCursorTitle: 'Paginación basada en cursor',
    paginationCursorDesc: 'Usa un token cursor opaco para marcar la posición en el conjunto de datos.',
    paginationResponseTitle: 'Formato de respuesta de paginación',
    paginationResponseDesc: 'Incluye metadatos sobre el estado de paginación en cada respuesta paginada.',
    versionTitle: 'Estrategias de versionado de API',
    versionDesc: 'Las APIs evolucionan con el tiempo. El versionado te permite hacer cambios incompatibles sin interrumpir los clientes existentes.',
    versionStrategy: 'Estrategia',
    versionExample: 'Ejemplo',
    versionPros: 'Ventajas',
    versionCons: 'Desventajas',
    rateLimitTitle: 'Limitación de velocidad',
    rateLimitDesc: 'La limitación de velocidad protege tu API del abuso y asegura un uso justo.',
    rateLimitHeadersTitle: 'Encabezados de limitación de velocidad',
    rateLimitHeadersDesc: 'Incluye estos encabezados en cada respuesta para que los clientes puedan monitorear su uso.',
    rateLimitResponseTitle: 'Respuesta 429 Demasiadas solicitudes',
    rateLimitResponseDesc: 'Cuando un cliente excede el límite, devuelve un estado 429 con encabezado Retry-After.',
    rateLimitBackoffTitle: 'Estrategias de backoff',
    rateLimitBackoffDesc: 'Los clientes deben implementar backoff exponencial cuando reciben respuestas 429.',
    securityTitle: 'Encabezados de seguridad',
    securityDesc: 'Los encabezados de seguridad protegen tu API de vulnerabilidades web comunes.',
    securityHeader: 'Encabezado',
    securityValue: 'Valor recomendado',
    securityPurpose: 'Propósito',
    docsTitle: 'Documentación API con OpenAPI',
    docsDesc: 'Una buena documentación es esencial para la adopción de la API. OpenAPI es el estándar para describir APIs REST.',
    docsBest1: 'Escribe primero la especificación OpenAPI (enfoque design-first), luego implementa la API.',
    docsBest2: 'Incluye descripciones detalladas para cada endpoint, parámetro y esquema de respuesta.',
    docsBest3: 'Proporciona valores de ejemplo realistas para todos los cuerpos de solicitud y respuesta.',
    docsBest4: 'Documenta las respuestas de error para cada endpoint.',
    docsBest5: 'Usa etiquetas para agrupar endpoints relacionados.',
    docsBest6: 'Versiona tu especificación OpenAPI junto con tu código API.',
    docsBest7: 'Configura documentación interactiva (Swagger UI o Redoc).',
    mistakesTitle: 'Errores comunes de REST API',
    mistakesDesc: 'Incluso los desarrolladores experimentados cometen estos errores. Revisa esta lista para asegurarte de que tu API sigue las mejores prácticas.',
    mistakeMistake: 'Error',
    mistakeWhy: 'Por qué está mal',
    mistakeFix: 'Solución',
    faqTitle: 'Preguntas frecuentes',
    faq1q: '¿Cuál es la diferencia entre REST y RESTful?',
    faq1a: 'REST es un estilo arquitectónico definido por Roy Fielding. RESTful es un adjetivo que describe APIs que adhieren a las restricciones REST. En la práctica, los términos se usan indistintamente.',
    faq2q: '¿Debo usar PUT o PATCH para actualizar recursos?',
    faq2a: 'Usa PUT cuando el cliente envía un reemplazo completo del recurso. Usa PATCH para actualizaciones parciales. PATCH es más eficiente en ancho de banda.',
    faq3q: '¿Cómo debo manejar el versionado de API?',
    faq3a: 'El versionado por ruta URL (ej: /v1/users) es el enfoque más común y explícito. Es fácil de entender, enrutar y cachear.',
    faq4q: '¿Cuál es la mejor forma de manejar la autenticación en APIs REST?',
    faq4a: 'Para la mayoría de aplicaciones, los tokens JWT Bearer ofrecen un buen equilibrio entre seguridad y simplicidad. Usa tokens de acceso de corta duración con rotación de tokens de refresco.',
    faq5q: '¿Cómo diseño recursos anidados en APIs REST?',
    faq5a: 'Usa el anidamiento para mostrar relaciones padre-hijo: /users/123/orders. Limita el anidamiento a dos niveles máximo.',
    faq6q: '¿Las respuestas de API REST deben incluir campos null u omitirlos?',
    faq6a: 'Depende de tu contrato. Incluir campos null hace el esquema predecible. Omitirlos reduce el tamaño del payload. Sé consistente y documéntalo.',
    tryTool: 'Prueba estas herramientas de desarrollo relacionadas',
  },
};

export default function RestApiBestPractices({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Introduction */}
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{t.intro}</p>

      {/* Section 1: URL Naming Conventions */}
      <h2 style={h2Style}>{t.urlTitle}</h2>
      <p style={pStyle}>{t.urlDesc}</p>

      <h3 style={h3Style}>{t.urlNounsTitle}</h3>
      <p style={pStyle}>{t.urlNounsDesc}</p>
      <pre style={codeStyle}><code>{`# Good - nouns as resources
GET    /users          # Get all users
GET    /users/123      # Get user 123
POST   /users          # Create a new user
DELETE /users/123      # Delete user 123

# Bad - verbs in URLs
GET    /getUsers
POST   /createUser
DELETE /deleteUser/123`}</code></pre>

      <h3 style={h3Style}>{t.urlPluralsTitle}</h3>
      <p style={pStyle}>{t.urlPluralsDesc}</p>
      <pre style={codeStyle}><code>{`# Good - consistent plurals
GET /users          # Collection
GET /users/123      # Single resource in collection
GET /products       # Collection
GET /products/456   # Single resource

# Bad - inconsistent or singular
GET /user           # Ambiguous: one user or all users?
GET /user/123
GET /product-list`}</code></pre>

      <h3 style={h3Style}>{t.urlNestedTitle}</h3>
      <p style={pStyle}>{t.urlNestedDesc}</p>
      <pre style={codeStyle}><code>{`# Good - clear parent-child relationship (max 2 levels)
GET /users/123/orders          # Orders belonging to user 123
GET /users/123/orders/456      # Specific order of user 123

# Bad - too deeply nested
GET /users/123/orders/456/items/789/reviews
# Better: use a direct resource endpoint
GET /order-items/789/reviews
# Or: flatten with query parameters
GET /reviews?order_item_id=789`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.urlTableTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.urlGood}</th>
              <th style={thStyle}>{t.urlBad}</th>
              <th style={thStyle}>{t.urlReason}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['GET /users', 'GET /getUsers', 'HTTP method already implies the action'],
              ['GET /users/123', 'GET /user?id=123', 'Use path parameters for resource identity'],
              ['POST /users', 'POST /createUser', 'POST already means create'],
              ['PUT /users/123', 'POST /updateUser', 'PUT/PATCH for updates, use resource path'],
              ['DELETE /users/123', 'POST /deleteUser', 'Use DELETE method, not POST with verb'],
              ['GET /users/123/orders', 'GET /getUserOrders?userId=123', 'Use nested resources for relationships'],
              ['GET /products?category=electronics', 'GET /electronics/products', 'Use query params for filtering'],
              ['GET /users?status=active&sort=name', 'GET /active-users-sorted-by-name', 'Use query params, not encoded URLs'],
              ['PATCH /users/123', 'POST /users/123/update', 'Use HTTP methods, not URL verbs'],
              ['GET /users/123/avatar', 'GET /getAvatarForUser/123', 'Keep it resource-oriented'],
            ].map(([good, bad, reason], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, color: '#22c55e', fontFamily: 'monospace' }}>{good}</td>
                <td style={{ ...tdStyle, color: '#ef4444', fontFamily: 'monospace' }}>{bad}</td>
                <td style={tdStyle}>{reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 2: HTTP Methods */}
      <h2 style={h2Style}>{t.httpTitle}</h2>
      <p style={pStyle}>{t.httpDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.httpMethod}</th>
              <th style={thStyle}>{t.httpPurpose}</th>
              <th style={thStyle}>{t.httpIdempotent}</th>
              <th style={thStyle}>{t.httpRequestBody}</th>
              <th style={thStyle}>{t.httpExample}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['GET', 'Retrieve a resource or collection', 'Yes', 'No', 'GET /users/123'],
              ['POST', 'Create a new resource', 'No', 'Yes', 'POST /users'],
              ['PUT', 'Replace a resource entirely', 'Yes', 'Yes', 'PUT /users/123'],
              ['PATCH', 'Partially update a resource', 'No*', 'Yes', 'PATCH /users/123'],
              ['DELETE', 'Remove a resource', 'Yes', 'Optional', 'DELETE /users/123'],
            ].map(([method, purpose, idempotent, body, example], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 700, fontFamily: 'monospace', color: method === 'GET' ? '#22c55e' : method === 'POST' ? '#3b82f6' : method === 'PUT' ? '#f59e0b' : method === 'PATCH' ? '#8b5cf6' : '#ef4444' }}>{method}</td>
                <td style={tdStyle}>{purpose}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>{idempotent}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>{body}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ ...pStyle, fontSize: 13, fontStyle: 'italic' }}>* PATCH can be idempotent depending on implementation. If the patch describes the final state (e.g., {`{"name": "John"}`}), it is idempotent. If it describes an operation (e.g., {`{"op": "increment", "path": "/count"}`}), it is not.</p>

      {/* Section 3: Status Codes */}
      <h2 style={h2Style}>{t.statusTitle}</h2>
      <p style={pStyle}>{t.statusDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.statusCode}</th>
              <th style={thStyle}>{t.statusName}</th>
              <th style={thStyle}>{t.statusWhen}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['200', 'OK', 'Successful GET, PUT, PATCH, or DELETE. Return the resource or confirmation.'],
              ['201', 'Created', 'Successful POST that created a new resource. Include Location header with the new resource URL.'],
              ['204', 'No Content', 'Successful DELETE or PUT/PATCH when no response body is needed.'],
              ['400', 'Bad Request', 'The request is malformed — invalid JSON, missing required fields, wrong data types.'],
              ['401', 'Unauthorized', 'No valid authentication credentials provided. The client must authenticate first.'],
              ['403', 'Forbidden', 'The client is authenticated but does not have permission for this action.'],
              ['404', 'Not Found', 'The requested resource does not exist. Also use for hidden resources (instead of 403) for security.'],
              ['409', 'Conflict', 'The request conflicts with the current state — duplicate email, version mismatch, etc.'],
              ['422', 'Unprocessable Entity', 'The request is well-formed but fails validation — email format invalid, password too short.'],
              ['429', 'Too Many Requests', 'Rate limit exceeded. Include Retry-After header with seconds until the client can retry.'],
              ['500', 'Internal Server Error', 'An unexpected server error occurred. Log the details server-side but do not expose them to clients.'],
              ['503', 'Service Unavailable', 'The server is temporarily unavailable — maintenance mode, overloaded. Include Retry-After header.'],
            ].map(([code, name, when], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 700, fontFamily: 'monospace', color: code.startsWith('2') ? '#22c55e' : code.startsWith('4') ? '#f59e0b' : '#ef4444' }}>{code}</td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{name}</td>
                <td style={tdStyle}>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 4: Error Handling */}
      <h2 style={h2Style}>{t.errorTitle}</h2>
      <p style={pStyle}>{t.errorDesc}</p>

      <h3 style={h3Style}>{t.errorStandardTitle}</h3>
      <p style={pStyle}>{t.errorStandardDesc}</p>
      <pre style={codeStyle}><code>{`// Standard error response
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The user with ID 123 was not found.",
    "status": 404,
    "timestamp": "2026-01-15T10:30:00Z",
    "request_id": "req_abc123def456",
    "documentation_url": "https://api.example.com/docs/errors#RESOURCE_NOT_FOUND"
  }
}

// Another example: authentication error
{
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "The access token has expired. Please refresh your token.",
    "status": 401,
    "timestamp": "2026-01-15T10:30:00Z",
    "request_id": "req_xyz789"
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{t.errorValidationTitle}</h3>
      <p style={pStyle}>{t.errorValidationDesc}</p>
      <pre style={codeStyle}><code>{`// 422 Validation error with field-level details
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request body contains invalid fields.",
    "status": 422,
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address.",
        "rejected_value": "not-an-email"
      },
      {
        "field": "password",
        "message": "Must be at least 8 characters long.",
        "rejected_value": "short"
      },
      {
        "field": "age",
        "message": "Must be a positive integer.",
        "rejected_value": -5
      }
    ],
    "timestamp": "2026-01-15T10:30:00Z",
    "request_id": "req_val456"
  }
}`}</code></pre>

      {/* Section 5: Authentication & Authorization */}
      <h2 style={h2Style}>{t.authTitle}</h2>
      <p style={pStyle}>{t.authDesc}</p>

      <h3 style={h3Style}>{t.authApiKeyTitle}</h3>
      <p style={pStyle}>{t.authApiKeyDesc}</p>
      <pre style={codeStyle}><code>{`# API Key in header (recommended)
GET /api/users HTTP/1.1
Host: api.example.com
X-API-Key: sk_live_abc123def456ghi789

# API Key in query parameter (less secure - visible in logs)
GET /api/users?api_key=sk_live_abc123def456ghi789`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.authJwtTitle}</h3>
      <p style={pStyle}>{t.authJwtDesc}</p>
      <pre style={codeStyle}><code>{`# JWT Bearer Token in Authorization header
GET /api/users/me HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...

# Token refresh flow
POST /api/auth/refresh HTTP/1.1
Content-Type: application/json
{
  "refresh_token": "rt_abc123def456"
}

# Response
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "rt_new789xyz"
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{t.authOauthTitle}</h3>
      <p style={pStyle}>{t.authOauthDesc}</p>
      <pre style={codeStyle}><code>{`# OAuth 2.0 Authorization Code Flow

# Step 1: Redirect user to authorization server
GET https://auth.example.com/authorize?
  response_type=code&
  client_id=your_client_id&
  redirect_uri=https://yourapp.com/callback&
  scope=read:users write:users&
  state=random_csrf_token

# Step 2: Exchange authorization code for tokens
POST https://auth.example.com/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTH_CODE_FROM_CALLBACK&
client_id=your_client_id&
client_secret=your_client_secret&
redirect_uri=https://yourapp.com/callback

# Step 3: Use the access token
GET /api/users/me HTTP/1.1
Authorization: Bearer ACCESS_TOKEN_HERE`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{t.authCompareTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.authFeature}</th>
              <th style={thStyle}>API Key</th>
              <th style={thStyle}>JWT</th>
              <th style={thStyle}>OAuth 2.0</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Complexity', 'Low', 'Medium', 'High'],
              ['Stateless', 'Yes', 'Yes', 'Depends'],
              ['User context', 'No', 'Yes', 'Yes'],
              ['Token expiration', 'Manual rotation', 'Built-in (exp claim)', 'Built-in'],
              ['Scope/permissions', 'Limited', 'Via claims', 'Fine-grained scopes'],
              ['Third-party access', 'No', 'No', 'Yes (delegated)'],
              ['Best for', 'Server-to-server', 'SPAs, Mobile apps', 'Third-party integrations'],
              ['Revocation', 'Delete key', 'Blacklist needed', 'Revoke at auth server'],
            ].map(([feature, apiKey, jwt, oauth], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{apiKey}</td>
                <td style={tdStyle}>{jwt}</td>
                <td style={tdStyle}>{oauth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 6: Pagination */}
      <h2 style={h2Style}>{t.paginationTitle}</h2>
      <p style={pStyle}>{t.paginationDesc}</p>

      <h3 style={h3Style}>{t.paginationOffsetTitle}</h3>
      <p style={pStyle}>{t.paginationOffsetDesc}</p>
      <pre style={codeStyle}><code>{`# Offset-based pagination request
GET /api/users?page=2&limit=20

# How it works internally
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 20 OFFSET 20;  -- Skip first 20, return next 20

# Pros: Simple, allows jumping to any page
# Cons: Inconsistent with concurrent modifications,
#        slow on large offsets (OFFSET 100000)`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.paginationCursorTitle}</h3>
      <p style={pStyle}>{t.paginationCursorDesc}</p>
      <pre style={codeStyle}><code>{`# Cursor-based pagination request
GET /api/users?cursor=eyJpZCI6MTIzfQ&limit=20

# The cursor is an opaque token (often base64-encoded)
# that points to a specific position in the dataset

# How it works internally (cursor decodes to {"id": 123})
SELECT * FROM users
WHERE id > 123
ORDER BY id ASC
LIMIT 20;

# Pros: Consistent results, fast on large datasets
# Cons: Cannot jump to arbitrary pages,
#        only next/previous navigation`}</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{t.paginationResponseTitle}</h3>
      <p style={pStyle}>{t.paginationResponseDesc}</p>
      <pre style={codeStyle}><code>{`// Offset-based pagination response
{
  "data": [
    { "id": 21, "name": "Alice" },
    { "id": 22, "name": "Bob" }
    // ... 18 more items
  ],
  "meta": {
    "current_page": 2,
    "per_page": 20,
    "total_pages": 15,
    "total_count": 294
  },
  "links": {
    "self": "/api/users?page=2&limit=20",
    "first": "/api/users?page=1&limit=20",
    "prev": "/api/users?page=1&limit=20",
    "next": "/api/users?page=3&limit=20",
    "last": "/api/users?page=15&limit=20"
  }
}

// Cursor-based pagination response
{
  "data": [
    { "id": 124, "name": "Charlie" },
    { "id": 125, "name": "Diana" }
    // ... 18 more items
  ],
  "meta": {
    "has_more": true,
    "next_cursor": "eyJpZCI6MTQzfQ",
    "prev_cursor": "eyJpZCI6MTI0fQ"
  },
  "links": {
    "next": "/api/users?cursor=eyJpZCI6MTQzfQ&limit=20",
    "prev": "/api/users?cursor=eyJpZCI6MTI0fQ&limit=20&direction=prev"
  }
}`}</code></pre>

      {/* Section 7: Versioning */}
      <h2 style={h2Style}>{t.versionTitle}</h2>
      <p style={pStyle}>{t.versionDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.versionStrategy}</th>
              <th style={thStyle}>{t.versionExample}</th>
              <th style={thStyle}>{t.versionPros}</th>
              <th style={thStyle}>{t.versionCons}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['URL Path', '/v1/users, /v2/users', 'Explicit, easy to route and cache, clear in logs and docs', 'URL pollution, harder to sunset old versions'],
              ['Custom Header', 'Accept-Version: v2 or X-API-Version: 2', 'Clean URLs, version hidden from casual users', 'Harder to test (need tools to set headers), not cacheable by default'],
              ['Query Parameter', '/users?version=2', 'Easy to test in browser, no URL path changes', 'Can be accidentally omitted, harder to route, pollutes query string'],
              ['Content Negotiation', 'Accept: application/vnd.api.v2+json', 'Most RESTful approach, per-resource versioning', 'Complex, hard to test, poorly supported by many tools'],
            ].map(([strategy, example, pros, cons], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{strategy}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{example}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{pros}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{cons}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <pre style={codeStyle}><code>{`# URL Path versioning (recommended)
GET /v1/users/123        # Version 1
GET /v2/users/123        # Version 2 with breaking changes

# Express.js router example
const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get('/users/:id', v1UserController.get);
v2Router.get('/users/:id', v2UserController.get);

app.use('/v1', v1Router);
app.use('/v2', v2Router);`}</code></pre>

      {/* Section 8: Rate Limiting */}
      <h2 style={h2Style}>{t.rateLimitTitle}</h2>
      <p style={pStyle}>{t.rateLimitDesc}</p>

      <h3 style={h3Style}>{t.rateLimitHeadersTitle}</h3>
      <p style={pStyle}>{t.rateLimitHeadersDesc}</p>
      <pre style={codeStyle}><code>{`HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 1000          # Max requests per window
X-RateLimit-Remaining: 847       # Remaining requests in window
X-RateLimit-Reset: 1706176800    # Unix timestamp when window resets
X-RateLimit-Window: 3600         # Window duration in seconds (1 hour)

# Some APIs also include:
RateLimit-Policy: 1000;w=3600    # IETF draft standard format`}</code></pre>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{t.rateLimitResponseTitle}</h3>
      <p style={pStyle}>{t.rateLimitResponseDesc}</p>
      <pre style={codeStyle}><code>{`HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 45
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1706176800

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "You have exceeded the rate limit of 1000 requests per hour.",
    "status": 429,
    "retry_after": 45,
    "documentation_url": "https://api.example.com/docs/rate-limiting"
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{t.rateLimitBackoffTitle}</h3>
      <p style={pStyle}>{t.rateLimitBackoffDesc}</p>
      <pre style={codeStyle}><code>{`// Exponential backoff with jitter
async function fetchWithRetry(url, options, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.status !== 429) {
      return response;
    }

    // Use Retry-After header if available
    const retryAfter = response.headers.get('Retry-After');
    let delay;

    if (retryAfter) {
      delay = parseInt(retryAfter, 10) * 1000;
    } else {
      // Exponential backoff: 1s, 2s, 4s, 8s, 16s
      const baseDelay = Math.pow(2, attempt) * 1000;
      // Add jitter (random 0-1s) to prevent thundering herd
      const jitter = Math.random() * 1000;
      delay = baseDelay + jitter;
    }

    console.log(\`Rate limited. Retrying in \${delay}ms (attempt \${attempt + 1})\`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  throw new Error('Max retries exceeded');
}`}</code></pre>

      {/* Section 9: Security Headers */}
      <h2 style={h2Style}>{t.securityTitle}</h2>
      <p style={pStyle}>{t.securityDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.securityHeader}</th>
              <th style={thStyle}>{t.securityValue}</th>
              <th style={thStyle}>{t.securityPurpose}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Access-Control-Allow-Origin', 'https://yourapp.com (specific origin)', 'CORS: Controls which domains can call your API. Never use * in production with credentials.'],
              ['Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE', 'CORS: Specifies which HTTP methods are allowed for cross-origin requests.'],
              ['Access-Control-Allow-Headers', 'Authorization, Content-Type', 'CORS: Specifies which request headers are allowed in cross-origin requests.'],
              ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains', 'HSTS: Forces browsers to use HTTPS for all future requests to your domain.'],
              ['Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'", 'CSP: Prevents XSS and data injection attacks. For APIs, restrict everything.'],
              ['X-Content-Type-Options', 'nosniff', 'Prevents browsers from MIME-type sniffing. Ensures responses are treated as their declared content type.'],
              ['X-Frame-Options', 'DENY', 'Prevents your API responses from being embedded in iframes (clickjacking protection).'],
              ['Cache-Control', 'no-store, no-cache, must-revalidate', 'Prevents caching of sensitive API responses. Adjust per endpoint as needed.'],
            ].map(([header, value, purpose], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600, fontFamily: 'monospace', fontSize: 12 }}>{header}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 11 }}>{value}</td>
                <td style={tdStyle}>{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <pre style={codeStyle}><code>{`// Express.js security headers middleware
const helmet = require('helmet');

app.use(helmet());

// Custom CORS configuration
const cors = require('cors');
app.use(cors({
  origin: ['https://yourapp.com', 'https://admin.yourapp.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
  maxAge: 86400  // Cache preflight for 24 hours
}));

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store');
  next();
});`}</code></pre>

      {/* Section 10: API Documentation */}
      <h2 style={h2Style}>{t.docsTitle}</h2>
      <p style={pStyle}>{t.docsDesc}</p>

      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.docsBest1}</li>
        <li>{t.docsBest2}</li>
        <li>{t.docsBest3}</li>
        <li>{t.docsBest4}</li>
        <li>{t.docsBest5}</li>
        <li>{t.docsBest6}</li>
        <li>{t.docsBest7}</li>
      </ul>

      <pre style={codeStyle}><code>{`# OpenAPI 3.1 specification example
openapi: 3.1.0
info:
  title: User Management API
  version: 1.0.0
  description: API for managing users and their resources

servers:
  - url: https://api.example.com/v1

paths:
  /users:
    get:
      summary: List all users
      tags: [Users]
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
      responses:
        '200':
          description: A paginated list of users
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserListResponse'
              example:
                data:
                  - id: 1
                    name: "Alice Johnson"
                    email: "alice@example.com"
                meta:
                  current_page: 1
                  total_pages: 10
        '401':
          $ref: '#/components/responses/Unauthorized'

    post:
      summary: Create a new user
      tags: [Users]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
            example:
              name: "Bob Smith"
              email: "bob@example.com"
              password: "securePassword123"
      responses:
        '201':
          description: User created successfully
        '422':
          $ref: '#/components/responses/ValidationError'`}</code></pre>

      {/* Section 11: Common Mistakes */}
      <h2 style={h2Style}>{t.mistakesTitle}</h2>
      <p style={pStyle}>{t.mistakesDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>{t.mistakeMistake}</th>
              <th style={thStyle}>{t.mistakeWhy}</th>
              <th style={thStyle}>{t.mistakeFix}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Using verbs in URLs', 'REST is resource-oriented; HTTP methods express actions', 'Use nouns: /users not /getUsers'],
              ['Returning 200 for errors', 'Clients rely on status codes for error handling', 'Use proper status codes: 400, 404, 422, 500'],
              ['Not paginating list endpoints', 'Returns grow unbounded, causing timeouts and memory issues', 'Always paginate with sensible defaults (limit=20)'],
              ['Exposing internal errors', 'Stack traces reveal implementation details to attackers', 'Log details server-side, return generic error messages'],
              ['Ignoring CORS headers', 'Browser-based clients cannot call your API', 'Configure CORS for allowed origins and methods'],
              ['Not versioning the API', 'Breaking changes affect all clients simultaneously', 'Use URL path versioning: /v1/users'],
              ['Using POST for everything', 'Loses HTTP method semantics, breaks caching and idempotency', 'Use GET, POST, PUT, PATCH, DELETE appropriately'],
              ['Inconsistent naming conventions', 'Mixed case or formats confuse API consumers', 'Pick one (snake_case or camelCase) and be consistent'],
              ['No rate limiting', 'API is vulnerable to abuse and DDoS attacks', 'Implement rate limiting with clear headers'],
              ['Missing Content-Type header', 'Clients cannot parse responses correctly', 'Always set Content-Type: application/json'],
            ].map(([mistake, why, fix], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...tdStyle, fontWeight: 600, color: '#ef4444' }}>{mistake}</td>
                <td style={tdStyle}>{why}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tryTool}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`/${lang}/tools/http-status`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            HTTP Status Codes Reference →
          </a>
          <a href={`/${lang}/tools/jwt-decoder`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            JWT Decoder →
          </a>
          <a href={`/${lang}/tools/json-formatter`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            JSON Formatter →
          </a>
        </div>
      </div>

      {/* Section 12: FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
        [t.faq6q, t.faq6a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
