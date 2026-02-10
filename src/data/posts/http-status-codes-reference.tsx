import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'HTTP status codes are three-digit numbers returned by a server in response to a client\'s request. Understanding these codes is essential for debugging APIs, building robust web applications, and troubleshooting network issues. This <strong>complete HTTP status codes reference</strong> covers every status code you\'ll encounter in practice, with practical explanations and real-world usage tips.',
    linkTool: 'Look up any HTTP status code instantly with our HTTP Status Code Checker →',
    h2_1xx: '1xx — Informational',
    desc_1xx: 'These codes indicate that the server has received the request and is continuing to process it. You rarely see these in day-to-day development, but they\'re important for understanding the HTTP protocol.',
    h2_2xx: '2xx — Success',
    desc_2xx: 'The most common category. These codes indicate that the request was successfully received, understood, and accepted.',
    h2_3xx: '3xx — Redirection',
    desc_3xx: 'These codes tell the client that further action is needed to complete the request, usually by following a different URL.',
    h2_4xx: '4xx — Client Errors',
    desc_4xx: 'These indicate that the request contains bad syntax or cannot be fulfilled. The problem is on the client side.',
    h2_5xx: '5xx — Server Errors',
    desc_5xx: 'These indicate that the server failed to fulfill an apparently valid request. The problem is on the server side.',
    h2_api: 'Best Practices for API Status Codes',
    apiDesc: 'Choosing the right status code for your REST API responses makes your API more intuitive and easier to debug.',
    h2_debug: 'Common Debugging Scenarios',
    debugDesc: 'When troubleshooting HTTP issues, status codes are your first clue. Here are common scenarios and what to check.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between 401 Unauthorized and 403 Forbidden?',
    faq1_a: '401 means the request lacks valid authentication credentials — the user needs to log in or provide a valid token. 403 means the server understood the request but the authenticated user does not have permission to access the resource. In short: 401 = "Who are you?" and 403 = "I know who you are, but you can\'t access this."',
    faq2_q: 'When should I use 200 OK vs 201 Created?',
    faq2_a: 'Use 200 OK for successful GET, PUT, PATCH, and DELETE requests. Use 201 Created specifically when a new resource has been successfully created (typically in response to a POST request). Include a Location header pointing to the newly created resource.',
    faq3_q: 'What does 418 I\'m a Teapot mean?',
    faq3_a: '418 I\'m a Teapot was defined in RFC 2324 (Hyper Text Coffee Pot Control Protocol) as an April Fools\' joke in 1998. It means the server refuses to brew coffee because it is a teapot. While not part of the HTTP standard, many frameworks include it as an easter egg.',
    faq4_q: 'What is the difference between 301 and 302 redirects for SEO?',
    faq4_a: '301 (Moved Permanently) tells search engines to transfer all ranking signals (link equity) to the new URL. Use this for permanent URL changes. 302 (Found/Temporary) tells search engines to keep the original URL indexed. Use this for temporary redirects like A/B tests or maintenance pages.',
    faq5_q: 'How do I handle 429 Too Many Requests in my application?',
    faq5_a: 'When you receive a 429, check the Retry-After header for how long to wait before retrying. Implement exponential backoff in your client code: wait 1s, then 2s, then 4s, etc. On the server side, use rate limiting middleware and return clear Retry-After headers.',
    conclusion: 'Understanding HTTP status codes is fundamental to building and debugging web applications. Bookmark this reference and use our tool to quickly look up any code you encounter.',
    linkToolBottom: 'Look up any status code with our HTTP Status Code Tool →',
  },
  fr: {
    intro: 'Les codes de statut HTTP sont des nombres à trois chiffres renvoyés par un serveur. Comprendre ces codes est essentiel pour déboguer les API et résoudre les problèmes réseau. Ce <strong>guide complet des codes HTTP</strong> couvre tous les codes que vous rencontrerez.',
    linkTool: 'Consultez n\'importe quel code HTTP avec notre outil →',
    h2_1xx: '1xx — Informationnel', desc_1xx: 'Ces codes indiquent que le serveur a reçu la requête et continue de la traiter.',
    h2_2xx: '2xx — Succès', desc_2xx: 'La catégorie la plus courante. Ces codes indiquent que la requête a été traitée avec succès.',
    h2_3xx: '3xx — Redirection', desc_3xx: 'Ces codes indiquent que le client doit effectuer une action supplémentaire.',
    h2_4xx: '4xx — Erreurs client', desc_4xx: 'Ces codes indiquent un problème du côté du client.',
    h2_5xx: '5xx — Erreurs serveur', desc_5xx: 'Ces codes indiquent que le serveur n\'a pas pu traiter la requête.',
    h2_api: 'Bonnes pratiques pour les codes API', apiDesc: 'Choisir le bon code rend votre API plus intuitive.',
    h2_debug: 'Scénarios de débogage courants', debugDesc: 'Les codes HTTP sont votre premier indice lors du débogage.',
    h2_faq: 'Questions fréquentes',
    faq1_q: 'Quelle différence entre 401 et 403 ?', faq1_a: '401 = authentification manquante. 403 = authentifié mais pas autorisé.',
    faq2_q: 'Quand utiliser 200 vs 201 ?', faq2_a: '200 pour les requêtes réussies, 201 quand une nouvelle ressource est créée.',
    faq3_q: 'Que signifie 418 I\'m a Teapot ?', faq3_a: 'Un poisson d\'avril de 1998 (RFC 2324). Le serveur refuse de faire du café car c\'est une théière.',
    faq4_q: 'Différence entre 301 et 302 pour le SEO ?', faq4_a: '301 = redirection permanente (transfère le SEO). 302 = temporaire (garde l\'URL originale).',
    faq5_q: 'Comment gérer le 429 ?', faq5_a: 'Vérifiez l\'en-tête Retry-After et implémentez un backoff exponentiel.',
    conclusion: 'Comprendre les codes HTTP est fondamental. Utilisez notre outil pour chercher rapidement tout code.', linkToolBottom: 'Consultez les codes avec notre outil HTTP →',
  },
  de: {
    intro: 'HTTP-Statuscodes sind dreistellige Zahlen, die ein Server als Antwort zurückgibt. Dieser <strong>vollständige HTTP-Statuscode-Referenz</strong> deckt alle Codes ab, die Sie in der Praxis antreffen.',
    linkTool: 'Schlagen Sie jeden HTTP-Statuscode mit unserem Tool nach →',
    h2_1xx: '1xx — Informativ', desc_1xx: 'Diese Codes zeigen an, dass der Server die Anfrage empfangen hat.',
    h2_2xx: '2xx — Erfolg', desc_2xx: 'Die häufigste Kategorie. Die Anfrage wurde erfolgreich verarbeitet.',
    h2_3xx: '3xx — Umleitung', desc_3xx: 'Der Client muss eine weitere Aktion durchführen.',
    h2_4xx: '4xx — Client-Fehler', desc_4xx: 'Das Problem liegt auf der Client-Seite.',
    h2_5xx: '5xx — Server-Fehler', desc_5xx: 'Der Server konnte die Anfrage nicht erfüllen.',
    h2_api: 'Best Practices für API-Statuscodes', apiDesc: 'Der richtige Statuscode macht Ihre API intuitiver.',
    h2_debug: 'Häufige Debug-Szenarien', debugDesc: 'Statuscodes sind Ihr erster Hinweis beim Debugging.',
    h2_faq: 'Häufige Fragen',
    faq1_q: 'Unterschied zwischen 401 und 403?', faq1_a: '401 = Authentifizierung fehlt. 403 = authentifiziert, aber nicht berechtigt.',
    faq2_q: 'Wann 200 vs 201?', faq2_a: '200 für erfolgreiche Anfragen, 201 bei neuer Ressource.',
    faq3_q: 'Was bedeutet 418?', faq3_a: 'Ein Aprilscherz von 1998. Der Server ist eine Teekanne.',
    faq4_q: '301 vs 302 für SEO?', faq4_a: '301 = permanent (überträgt SEO). 302 = temporär.',
    faq5_q: 'Wie mit 429 umgehen?', faq5_a: 'Retry-After-Header prüfen und exponentiellen Backoff implementieren.',
    conclusion: 'HTTP-Statuscodes zu verstehen ist grundlegend. Nutzen Sie unser Tool.', linkToolBottom: 'Codes nachschlagen mit unserem HTTP-Tool →',
  },
  es: {
    intro: 'Los códigos de estado HTTP son números de tres dígitos devueltos por un servidor. Esta <strong>referencia completa de códigos HTTP</strong> cubre todos los códigos que encontrarás en la práctica.',
    linkTool: 'Consulta cualquier código HTTP con nuestra herramienta →',
    h2_1xx: '1xx — Informativo', desc_1xx: 'El servidor recibió la solicitud y sigue procesándola.',
    h2_2xx: '2xx — Éxito', desc_2xx: 'La categoría más común. La solicitud fue procesada exitosamente.',
    h2_3xx: '3xx — Redirección', desc_3xx: 'El cliente necesita realizar una acción adicional.',
    h2_4xx: '4xx — Errores del cliente', desc_4xx: 'El problema está del lado del cliente.',
    h2_5xx: '5xx — Errores del servidor', desc_5xx: 'El servidor no pudo completar la solicitud.',
    h2_api: 'Mejores prácticas para códigos API', apiDesc: 'El código correcto hace tu API más intuitiva.',
    h2_debug: 'Escenarios comunes de depuración', debugDesc: 'Los códigos HTTP son tu primera pista al depurar.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: '¿Diferencia entre 401 y 403?', faq1_a: '401 = falta autenticación. 403 = autenticado pero sin permisos.',
    faq2_q: '¿Cuándo usar 200 vs 201?', faq2_a: '200 para solicitudes exitosas, 201 al crear un nuevo recurso.',
    faq3_q: '¿Qué significa 418?', faq3_a: 'Una broma del 1 de abril de 1998. El servidor es una tetera.',
    faq4_q: '¿301 vs 302 para SEO?', faq4_a: '301 = permanente (transfiere SEO). 302 = temporal.',
    faq5_q: '¿Cómo manejar 429?', faq5_a: 'Revisar Retry-After e implementar backoff exponencial.',
    conclusion: 'Entender los códigos HTTP es fundamental. Usa nuestra herramienta.', linkToolBottom: 'Consulta códigos con nuestra herramienta HTTP →',
  },
  zh: {
    intro: 'HTTP 状态码是服务器响应客户端请求时返回的三位数字。理解这些状态码对于调试 API、构建健壮的 Web 应用至关重要。本<strong>完整 HTTP 状态码参考指南</strong>涵盖了你在实际开发中会遇到的所有状态码。',
    linkTool: '使用我们的 HTTP 状态码工具快速查询 →',
    h2_1xx: '1xx — 信息响应', desc_1xx: '表示服务器已接收请求，正在继续处理。',
    h2_2xx: '2xx — 成功', desc_2xx: '最常见的类别，表示请求已成功处理。',
    h2_3xx: '3xx — 重定向', desc_3xx: '客户端需要执行额外操作才能完成请求。',
    h2_4xx: '4xx — 客户端错误', desc_4xx: '问题出在客户端。',
    h2_5xx: '5xx — 服务器错误', desc_5xx: '服务器无法完成请求。',
    h2_api: 'API 状态码最佳实践', apiDesc: '选择正确的状态码让 API 更直观易用。',
    h2_debug: '常见调试场景', debugDesc: '排查 HTTP 问题时，状态码是最重要的线索。',
    h2_faq: '常见问题',
    faq1_q: '401 和 403 有什么区别？', faq1_a: '401 = 缺少认证凭据。403 = 已认证但没有权限。',
    faq2_q: '何时使用 200 vs 201？', faq2_a: '200 用于成功的请求，201 用于成功创建新资源。',
    faq3_q: '418 I\'m a Teapot 是什么意思？', faq3_a: '1998 年的愚人节玩笑（RFC 2324），服务器拒绝煮咖啡，因为它是茶壶。',
    faq4_q: '301 和 302 对 SEO 有什么影响？', faq4_a: '301 = 永久重定向（传递 SEO 权重）。302 = 临时重定向。',
    faq5_q: '如何处理 429 错误？', faq5_a: '检查 Retry-After 头部，实现指数退避重试。',
    conclusion: '理解 HTTP 状态码是开发和调试的基础。使用我们的工具快速查询。', linkToolBottom: '使用 HTTP 状态码工具查询 →',
  },
  ja: {
    intro: 'HTTPステータスコードはサーバーがリクエストに対して返す3桁の数字です。この<strong>完全なHTTPステータスコードリファレンス</strong>は実践で遭遇するすべてのコードを網羅しています。',
    linkTool: 'HTTPステータスコードツールで即座に確認 →',
    h2_1xx: '1xx — 情報レスポンス', desc_1xx: 'サーバーがリクエストを受信し処理を続けていることを示します。',
    h2_2xx: '2xx — 成功', desc_2xx: '最も一般的なカテゴリ。リクエストが正常に処理されました。',
    h2_3xx: '3xx — リダイレクト', desc_3xx: 'クライアントが追加のアクションを実行する必要があります。',
    h2_4xx: '4xx — クライアントエラー', desc_4xx: '問題はクライアント側にあります。',
    h2_5xx: '5xx — サーバーエラー', desc_5xx: 'サーバーがリクエストを処理できませんでした。',
    h2_api: 'API ステータスコードのベストプラクティス', apiDesc: '適切なステータスコードでAPIをより直感的に。',
    h2_debug: 'よくあるデバッグシナリオ', debugDesc: 'ステータスコードはデバッグの最初の手がかりです。',
    h2_faq: 'よくある質問',
    faq1_q: '401と403の違いは？', faq1_a: '401 = 認証が不足。403 = 認証済みだが権限なし。',
    faq2_q: '200と201の使い分けは？', faq2_a: '200は成功、201は新しいリソースの作成時。',
    faq3_q: '418の意味は？', faq3_a: '1998年のエイプリルフール。サーバーはティーポットです。',
    faq4_q: 'SEOにおける301と302の違いは？', faq4_a: '301 = 恒久的（SEO引継ぎ）。302 = 一時的。',
    faq5_q: '429の対処法は？', faq5_a: 'Retry-Afterヘッダーを確認し、指数バックオフを実装。',
    conclusion: 'HTTPステータスコードの理解は基本です。ツールをご活用ください。', linkToolBottom: 'HTTPステータスコードツールで確認 →',
  },
  ko: {
    intro: 'HTTP 상태 코드는 서버가 클라이언트 요청에 대해 반환하는 세 자리 숫자입니다. 이 <strong>완전한 HTTP 상태 코드 참조</strong>는 실무에서 만나는 모든 코드를 다룹니다.',
    linkTool: 'HTTP 상태 코드 도구로 즉시 확인 →',
    h2_1xx: '1xx — 정보 응답', desc_1xx: '서버가 요청을 수신하고 처리를 계속하고 있음을 나타냅니다.',
    h2_2xx: '2xx — 성공', desc_2xx: '가장 일반적인 카테고리입니다. 요청이 성공적으로 처리되었습니다.',
    h2_3xx: '3xx — 리다이렉션', desc_3xx: '클라이언트가 추가 작업을 수행해야 합니다.',
    h2_4xx: '4xx — 클라이언트 오류', desc_4xx: '문제가 클라이언트 측에 있습니다.',
    h2_5xx: '5xx — 서버 오류', desc_5xx: '서버가 요청을 처리할 수 없었습니다.',
    h2_api: 'API 상태 코드 모범 사례', apiDesc: '적절한 상태 코드로 API를 더 직관적으로 만드세요.',
    h2_debug: '일반적인 디버깅 시나리오', debugDesc: '상태 코드는 디버깅의 첫 번째 단서입니다.',
    h2_faq: '자주 묻는 질문',
    faq1_q: '401과 403의 차이?', faq1_a: '401 = 인증 부족. 403 = 인증되었으나 권한 없음.',
    faq2_q: '200 vs 201 사용 시점?', faq2_a: '200은 성공, 201은 새 리소스 생성 시.',
    faq3_q: '418의 의미?', faq3_a: '1998년 만우절 농담. 서버가 찻주전자입니다.',
    faq4_q: 'SEO에서 301과 302의 차이?', faq4_a: '301 = 영구(SEO 전달). 302 = 임시.',
    faq5_q: '429 처리 방법?', faq5_a: 'Retry-After 헤더 확인, 지수 백오프 구현.',
    conclusion: 'HTTP 상태 코드를 이해하는 것은 기본입니다. 도구를 활용하세요.', linkToolBottom: 'HTTP 상태 코드 도구로 확인 →',
  },
};

export default function HttpStatusCodesReference({ lang }: { lang: string }) {
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
    ],
  };

  const codeStyle: React.CSSProperties = { display: 'inline', background: 'rgba(139,92,246,0.1)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: 13 };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/http-status`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* 1xx */}
      <h2>{s.h2_1xx}</h2>
      <p>{s.desc_1xx}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead><tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}><th style={{ padding: '8px 12px', width: 100 }}>Code</th><th style={{ padding: '8px 12px' }}>Name</th><th style={{ padding: '8px 12px' }}>Description</th></tr></thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>100</code></td><td style={{ padding: '8px 12px' }}>Continue</td><td style={{ padding: '8px 12px' }}>The server has received the request headers. The client should proceed to send the body. Used with <code>Expect: 100-continue</code> header.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>101</code></td><td style={{ padding: '8px 12px' }}>Switching Protocols</td><td style={{ padding: '8px 12px' }}>The server is switching protocols as requested by the client (e.g., upgrading to WebSocket).</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>102</code></td><td style={{ padding: '8px 12px' }}>Processing</td><td style={{ padding: '8px 12px' }}>The server is processing the request but has not completed it yet (WebDAV).</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>103</code></td><td style={{ padding: '8px 12px' }}>Early Hints</td><td style={{ padding: '8px 12px' }}>Used to return some response headers before the final response. Allows preloading resources with <code>Link</code> headers.</td></tr>
        </tbody>
      </table>

      {/* 2xx */}
      <h2>{s.h2_2xx}</h2>
      <p>{s.desc_2xx}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead><tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}><th style={{ padding: '8px 12px', width: 100 }}>Code</th><th style={{ padding: '8px 12px' }}>Name</th><th style={{ padding: '8px 12px' }}>Description</th></tr></thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>200</code></td><td style={{ padding: '8px 12px' }}>OK</td><td style={{ padding: '8px 12px' }}>The standard success response. Meaning depends on the method: GET returns the resource, POST returns the result of the action.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>201</code></td><td style={{ padding: '8px 12px' }}>Created</td><td style={{ padding: '8px 12px' }}>A new resource was successfully created. Should include a <code>Location</code> header with the URL of the new resource.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>202</code></td><td style={{ padding: '8px 12px' }}>Accepted</td><td style={{ padding: '8px 12px' }}>The request has been accepted for processing, but processing is not yet complete. Great for async operations.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>204</code></td><td style={{ padding: '8px 12px' }}>No Content</td><td style={{ padding: '8px 12px' }}>Success, but there is no content to return. Common for DELETE operations and PUT updates.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>206</code></td><td style={{ padding: '8px 12px' }}>Partial Content</td><td style={{ padding: '8px 12px' }}>The server is delivering only part of the resource due to a <code>Range</code> header. Used for resumable downloads and video streaming.</td></tr>
        </tbody>
      </table>

      {/* 3xx */}
      <h2>{s.h2_3xx}</h2>
      <p>{s.desc_3xx}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead><tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}><th style={{ padding: '8px 12px', width: 100 }}>Code</th><th style={{ padding: '8px 12px' }}>Name</th><th style={{ padding: '8px 12px' }}>Description</th></tr></thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>301</code></td><td style={{ padding: '8px 12px' }}>Moved Permanently</td><td style={{ padding: '8px 12px' }}>The resource has permanently moved to a new URL. Search engines transfer ranking to the new URL. Use for permanent URL changes.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>302</code></td><td style={{ padding: '8px 12px' }}>Found</td><td style={{ padding: '8px 12px' }}>Temporary redirect. The original URL should still be used for future requests. Search engines keep indexing the original.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>303</code></td><td style={{ padding: '8px 12px' }}>See Other</td><td style={{ padding: '8px 12px' }}>The response to the request can be found at another URL using GET. Often used after POST to redirect to a result page.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>304</code></td><td style={{ padding: '8px 12px' }}>Not Modified</td><td style={{ padding: '8px 12px' }}>The resource hasn&apos;t changed since the last request. The client should use its cached version. Saves bandwidth.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>307</code></td><td style={{ padding: '8px 12px' }}>Temporary Redirect</td><td style={{ padding: '8px 12px' }}>Like 302, but guarantees the HTTP method won&apos;t change. A POST stays a POST after redirect.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>308</code></td><td style={{ padding: '8px 12px' }}>Permanent Redirect</td><td style={{ padding: '8px 12px' }}>Like 301, but guarantees the HTTP method won&apos;t change. Preferred over 301 for API redirects.</td></tr>
        </tbody>
      </table>

      {/* 4xx */}
      <h2>{s.h2_4xx}</h2>
      <p>{s.desc_4xx}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead><tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}><th style={{ padding: '8px 12px', width: 100 }}>Code</th><th style={{ padding: '8px 12px' }}>Name</th><th style={{ padding: '8px 12px' }}>Description</th></tr></thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>400</code></td><td style={{ padding: '8px 12px' }}>Bad Request</td><td style={{ padding: '8px 12px' }}>The server cannot process the request due to malformed syntax, invalid parameters, or missing required fields.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>401</code></td><td style={{ padding: '8px 12px' }}>Unauthorized</td><td style={{ padding: '8px 12px' }}>Authentication is required. The request lacks valid credentials (token, API key, or session).</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>403</code></td><td style={{ padding: '8px 12px' }}>Forbidden</td><td style={{ padding: '8px 12px' }}>The server understood the request but refuses to authorize it. The user is authenticated but lacks permission.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>404</code></td><td style={{ padding: '8px 12px' }}>Not Found</td><td style={{ padding: '8px 12px' }}>The requested resource could not be found. Check the URL for typos or verify the resource exists.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>405</code></td><td style={{ padding: '8px 12px' }}>Method Not Allowed</td><td style={{ padding: '8px 12px' }}>The HTTP method (GET, POST, etc.) is not supported for this resource. Check allowed methods in the <code>Allow</code> header.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>408</code></td><td style={{ padding: '8px 12px' }}>Request Timeout</td><td style={{ padding: '8px 12px' }}>The server timed out waiting for the request. The client can retry.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>409</code></td><td style={{ padding: '8px 12px' }}>Conflict</td><td style={{ padding: '8px 12px' }}>The request conflicts with the current state of the resource. Common with duplicate entries or version conflicts.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>410</code></td><td style={{ padding: '8px 12px' }}>Gone</td><td style={{ padding: '8px 12px' }}>The resource is permanently gone and will not be available again. Unlike 404, this is intentional and permanent.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>413</code></td><td style={{ padding: '8px 12px' }}>Payload Too Large</td><td style={{ padding: '8px 12px' }}>The request body exceeds the server&apos;s size limit. Common with file uploads.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>415</code></td><td style={{ padding: '8px 12px' }}>Unsupported Media Type</td><td style={{ padding: '8px 12px' }}>The server doesn&apos;t support the request&apos;s <code>Content-Type</code>. Ensure you&apos;re sending the correct format (JSON, form-data, etc.).</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>418</code></td><td style={{ padding: '8px 12px' }}>I&apos;m a Teapot</td><td style={{ padding: '8px 12px' }}>An April Fools&apos; joke from RFC 2324. The server refuses to brew coffee because it is, permanently, a teapot.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>422</code></td><td style={{ padding: '8px 12px' }}>Unprocessable Entity</td><td style={{ padding: '8px 12px' }}>The request is well-formed but contains semantic errors. Common for validation failures in APIs.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>429</code></td><td style={{ padding: '8px 12px' }}>Too Many Requests</td><td style={{ padding: '8px 12px' }}>Rate limit exceeded. Check the <code>Retry-After</code> header for when to retry.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>451</code></td><td style={{ padding: '8px 12px' }}>Unavailable For Legal Reasons</td><td style={{ padding: '8px 12px' }}>The resource is blocked due to legal reasons (censorship, GDPR, court order). Named after Fahrenheit 451.</td></tr>
        </tbody>
      </table>

      {/* 5xx */}
      <h2>{s.h2_5xx}</h2>
      <p>{s.desc_5xx}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead><tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}><th style={{ padding: '8px 12px', width: 100 }}>Code</th><th style={{ padding: '8px 12px' }}>Name</th><th style={{ padding: '8px 12px' }}>Description</th></tr></thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>500</code></td><td style={{ padding: '8px 12px' }}>Internal Server Error</td><td style={{ padding: '8px 12px' }}>A generic server error. Check server logs for the actual error. Never expose stack traces to clients in production.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>501</code></td><td style={{ padding: '8px 12px' }}>Not Implemented</td><td style={{ padding: '8px 12px' }}>The server does not support the functionality required to fulfill the request (e.g., an unimplemented API endpoint).</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>502</code></td><td style={{ padding: '8px 12px' }}>Bad Gateway</td><td style={{ padding: '8px 12px' }}>The server, acting as a gateway/proxy, received an invalid response from the upstream server. Check if your backend is running.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>503</code></td><td style={{ padding: '8px 12px' }}>Service Unavailable</td><td style={{ padding: '8px 12px' }}>The server is temporarily unable to handle the request (overloaded or down for maintenance). Should include <code>Retry-After</code> header.</td></tr>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '8px 12px' }}><code style={codeStyle}>504</code></td><td style={{ padding: '8px 12px' }}>Gateway Timeout</td><td style={{ padding: '8px 12px' }}>The gateway/proxy did not receive a timely response from the upstream server. Common with slow database queries or external API calls.</td></tr>
        </tbody>
      </table>

      {/* API Best Practices */}
      <h2>{s.h2_api}</h2>
      <p>{s.apiDesc}</p>
      <pre><code>{`// REST API Status Code Guidelines

// Creating a resource
POST /api/users → 201 Created (with Location header)

// Successful read
GET /api/users/123 → 200 OK

// Successful update
PUT /api/users/123 → 200 OK (with updated resource)
PATCH /api/users/123 → 200 OK

// Successful delete
DELETE /api/users/123 → 204 No Content

// Validation error
POST /api/users (invalid data) → 422 Unprocessable Entity
{
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email format" }
  ]
}

// Authentication required
GET /api/admin → 401 Unauthorized
{ "error": "Authentication required" }

// No permission
GET /api/admin (as regular user) → 403 Forbidden
{ "error": "Insufficient permissions" }

// Resource not found
GET /api/users/999 → 404 Not Found
{ "error": "User not found" }

// Rate limit exceeded
GET /api/search → 429 Too Many Requests
Retry-After: 60
{ "error": "Rate limit exceeded", "retry_after": 60 }`}</code></pre>

      {/* Debugging Scenarios */}
      <h2>{s.h2_debug}</h2>
      <p>{s.debugDesc}</p>

      <h3>CORS Errors (Browser shows &quot;blocked by CORS&quot;)</h3>
      <p>The browser blocks the request, but the actual HTTP status may be hidden. Check server logs. Ensure your server sends the correct <code>Access-Control-Allow-Origin</code>, <code>Access-Control-Allow-Methods</code>, and <code>Access-Control-Allow-Headers</code> headers.</p>

      <h3>502 Bad Gateway on Deployment</h3>
      <p>Your reverse proxy (Nginx, Cloudflare) can&apos;t reach your application server. Check: Is the app process running? Is it listening on the correct port? Are there firewall rules blocking the connection?</p>
      <pre><code>{`# Check if your app is running
ps aux | grep node

# Check if it's listening on the expected port
netstat -tlnp | grep 3000

# Check Nginx error logs
tail -f /var/log/nginx/error.log`}</code></pre>

      <h3>504 Gateway Timeout</h3>
      <p>The upstream server is too slow. Common causes: slow database queries, external API timeouts, or large file processing. Solutions: optimize queries, add timeouts to external calls, use background jobs for heavy tasks.</p>

      <h3>429 Rate Limiting</h3>
      <pre><code>{`// Implementing exponential backoff in JavaScript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url);
    if (response.status !== 429) return response;

    const retryAfter = response.headers.get('Retry-After');
    const delay = retryAfter
      ? parseInt(retryAfter) * 1000
      : Math.pow(2, i) * 1000; // 1s, 2s, 4s

    await new Promise(r => setTimeout(r, delay));
  }
  throw new Error('Max retries exceeded');
}`}</code></pre>

      {/* FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p>{s.faq1_a}</p>
      <h3>{s.faq2_q}</h3>
      <p>{s.faq2_a}</p>
      <h3>{s.faq3_q}</h3>
      <p>{s.faq3_a}</p>
      <h3>{s.faq4_q}</h3>
      <p>{s.faq4_a}</p>
      <h3>{s.faq5_q}</h3>
      <p>{s.faq5_a}</p>

      <p style={{ marginTop: 32 }}>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/http-status`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
