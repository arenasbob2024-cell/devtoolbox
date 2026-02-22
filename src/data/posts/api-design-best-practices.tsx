'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'Designing a great REST API is about more than just returning JSON. A well-designed API is <strong>predictable, consistent, secure, and easy to consume</strong>. This comprehensive guide covers the most important REST API design best practices with real-world examples, common mistakes, and battle-tested patterns used by companies like Stripe, GitHub, and Twilio.',
    link_tool: 'Validate your API responses with our JSON Formatter \u2192',

    h2_1: '1. Use Nouns for Resource URIs',
    p_1: 'REST APIs model <strong>resources</strong>, not actions. URIs should represent things (nouns), not operations (verbs). The HTTP method (GET, POST, PUT, DELETE) already describes the action.',
    h2_2: '2. Use Proper HTTP Methods',
    p_2: 'Each HTTP method has a specific semantic meaning. Using the correct method makes your API predictable and enables caching, idempotency, and browser integration.',
    h2_3: '3. Use Plural Resource Names',
    p_3: 'Always use plural nouns for collections. This keeps URIs consistent whether you are accessing a collection or a single resource within it.',
    h2_4: '4. Use HTTP Status Codes Correctly',
    p_4: 'Status codes tell clients <strong>what happened</strong> without parsing the response body. The three most important ranges are 2xx (success), 4xx (client error), and 5xx (server error).',
    h2_5: '5. Version Your API',
    p_5: 'API versioning protects existing consumers when you make breaking changes. There are three common strategies, each with trade-offs.',
    h2_6: '6. Pagination, Filtering, and Sorting',
    p_6: 'Any endpoint that returns a collection should support pagination. Without it, responses grow unbounded and performance degrades for both server and client.',
    h2_7: '7. Error Response Format',
    p_7: 'A consistent error response format across your entire API helps clients handle errors programmatically. Include an error code, a human-readable message, and optionally field-level details for validation errors.',
    h2_8: '8. Authentication and Security',
    p_8: 'API security is non-negotiable. Here are the essential security practices every API should implement from day one.',
    h2_9: '9. Rate Limiting',
    p_9: 'Rate limiting protects your API from abuse and ensures fair usage across clients. Always communicate limits via standard HTTP headers.',
    h2_10: '10. HATEOAS and Linking',
    p_10: 'Hypermedia As The Engine Of Application State (HATEOAS) adds discoverability to your API by including links in responses that tell clients what actions are available next.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Should I use PUT or PATCH for updates?',
    faq1_a: 'Use PUT when the client sends the complete updated resource (full replacement). Use PATCH when the client sends only the fields to change (partial update). PATCH is more bandwidth-efficient and reduces merge conflicts, but requires careful handling of null vs absent fields. Most modern APIs prefer PATCH for updates.',
    faq2_q: 'Should REST API URIs be lowercase?',
    faq2_a: 'Yes, URIs should be lowercase with hyphens as separators (kebab-case): /api/v1/user-profiles instead of /api/v1/userProfiles. RFC 3986 defines URIs as case-sensitive, so mixing cases leads to confusion and potential 404 errors. JSON property names in request/response bodies should use camelCase.',
    faq3_q: 'How should I handle nested resources?',
    faq3_a: 'Limit nesting to one level: /users/123/orders is fine, but /users/123/orders/456/items/789 is too deep. For deeply nested resources, promote them to top-level endpoints with query parameters: /order-items?orderId=456. This keeps URIs short and avoids coupling.',
    faq4_q: 'What is the best authentication method for REST APIs?',
    faq4_a: 'For server-to-server communication, use API keys or OAuth 2.0 client credentials. For user-facing apps, use OAuth 2.0 with PKCE for SPAs or Authorization Code flow for server-side apps. JWT bearer tokens are the most common token format. Always use HTTPS and never send credentials in query parameters.',
    faq5_q: 'Should I use GraphQL instead of REST?',
    faq5_a: 'REST and GraphQL solve different problems. REST is simpler, has better caching (HTTP-level), and works well for CRUD-heavy APIs with predictable access patterns. GraphQL excels when clients need flexible queries across many related resources, or when you need to reduce over-fetching. Many teams use both: REST for simple CRUD, GraphQL for complex data requirements.',

    p_conclusion: 'Following these best practices from the start saves countless hours of refactoring and breaking changes later. For testing and validating your API responses, try our tools below.',
    link_tool_bottom: 'Try the JSON Formatter \u2192',
    link_tool_bottom2: 'Check HTTP Status Codes \u2192',
  },
  zh: {
    intro: '设计优秀的 REST API 不仅仅是返回 JSON。一个设计良好的 API 应该是<strong>可预测、一致、安全且易于使用的</strong>。本指南涵盖最重要的 REST API 设计最佳实践，包括真实案例、常见错误和经过实战检验的模式。',
    link_tool: '使用我们的 JSON 格式化工具验证 API 响应 \u2192',
    h2_1: '1. 使用名词作为资源 URI',
    p_1: 'REST API 建模的是<strong>资源</strong>而不是操作。URI 应该表示事物（名词），而不是操作（动词）。HTTP 方法（GET、POST、PUT、DELETE）已经描述了操作。',
    h2_2: '2. 正确使用 HTTP 方法',
    p_2: '每个 HTTP 方法都有特定的语义。使用正确的方法使 API 可预测，并支持缓存、幂等性和浏览器集成。',
    h2_3: '3. 使用复数资源名称',
    p_3: '始终使用复数名词作为集合名。无论访问集合还是单个资源，URI 都保持一致。',
    h2_4: '4. 正确使用 HTTP 状态码',
    p_4: '状态码告诉客户端<strong>发生了什么</strong>，无需解析响应体。最重要的三个范围是 2xx（成功）、4xx（客户端错误）和 5xx（服务器错误）。',
    h2_5: '5. API 版本控制',
    p_5: 'API 版本控制在你进行破坏性变更时保护现有消费者。有三种常见策略，各有取舍。',
    h2_6: '6. 分页、过滤和排序',
    p_6: '任何返回集合的端点都应支持分页。否则响应会无限增长，服务器和客户端的性能都会下降。',
    h2_7: '7. 错误响应格式',
    p_7: '整个 API 一致的错误响应格式有助于客户端以编程方式处理错误。包含错误代码、人类可读消息和验证错误的字段级详情。',
    h2_8: '8. 认证与安全',
    p_8: 'API 安全性不可妥协。以下是每个 API 从第一天起就应实施的基本安全实践。',
    h2_9: '9. 速率限制',
    p_9: '速率限制保护 API 免受滥用，并确保客户端之间的公平使用。始终通过标准 HTTP 头通知限制信息。',
    h2_10: '10. HATEOAS 和链接',
    p_10: '超媒体作为应用程序状态引擎（HATEOAS）通过在响应中包含链接来增加 API 的可发现性。',
    h2_faq: '常见问题',
    faq1_q: '更新应该用 PUT 还是 PATCH？', faq1_a: 'PUT 用于完整替换资源，PATCH 用于部分更新。大多数现代 API 更倾向使用 PATCH。',
    faq2_q: 'REST API URI 应该小写吗？', faq2_a: '是的，URI 应该使用小写加连字符（kebab-case）。JSON 属性名使用 camelCase。',
    faq3_q: '如何处理嵌套资源？', faq3_a: '限制嵌套在一层以内。深度嵌套的资源应该提升为顶级端点并使用查询参数。',
    faq4_q: 'REST API 最佳认证方式是什么？', faq4_a: '服务器间通信用 API 密钥或 OAuth 2.0。面向用户的应用使用 OAuth 2.0 和 JWT。始终使用 HTTPS。',
    faq5_q: '应该用 GraphQL 替代 REST 吗？', faq5_a: 'REST 和 GraphQL 解决不同问题。REST 更简单，缓存更好。GraphQL 适合复杂数据需求。很多团队两者结合使用。',
    p_conclusion: '从一开始就遵循这些最佳实践，可以节省大量重构时间。使用我们的工具来测试和验证 API 响应。',
    link_tool_bottom: '试试 JSON 格式化工具 \u2192',
    link_tool_bottom2: '查看 HTTP 状态码 \u2192',
  },
  fr: {
    intro: 'Concevoir une bonne API REST ne se limite pas a renvoyer du JSON. Une API bien concue est <strong>previsible, coherente, securisee et facile a utiliser</strong>. Ce guide couvre les meilleures pratiques de conception d\'API REST avec des exemples concrets.',
    link_tool: 'Validez vos reponses API avec notre Formateur JSON \u2192',
    h2_1: '1. Utiliser des noms pour les URI de ressources', p_1: 'Les API REST modelisent des <strong>ressources</strong>, pas des actions. Les URI doivent representer des choses (noms), pas des operations (verbes).',
    h2_2: '2. Utiliser les methodes HTTP correctement', p_2: 'Chaque methode HTTP a une semantique specifique. Utiliser la bonne methode rend votre API previsible.',
    h2_3: '3. Utiliser des noms de ressources au pluriel', p_3: 'Utilisez toujours des noms pluriels pour les collections.',
    h2_4: '4. Utiliser les codes de statut HTTP correctement', p_4: 'Les codes de statut indiquent au client <strong>ce qui s\'est passe</strong> sans analyser le corps de la reponse.',
    h2_5: '5. Versionner votre API', p_5: 'Le versionnage protege les consommateurs existants lors de changements incompatibles.',
    h2_6: '6. Pagination, filtrage et tri', p_6: 'Tout endpoint retournant une collection doit supporter la pagination.',
    h2_7: '7. Format de reponse d\'erreur', p_7: 'Un format d\'erreur coherent aide les clients a gerer les erreurs par programmation.',
    h2_8: '8. Authentification et securite', p_8: 'La securite de l\'API est non negociable.',
    h2_9: '9. Limitation de debit', p_9: 'La limitation de debit protege votre API contre les abus.',
    h2_10: '10. HATEOAS et liens', p_10: 'HATEOAS ajoute la decouvrabilite a votre API.',
    h2_faq: 'Questions frequentes',
    faq1_q: 'Faut-il utiliser PUT ou PATCH ?', faq1_a: 'PUT pour le remplacement complet, PATCH pour la mise a jour partielle.',
    faq2_q: 'Les URI doivent-elles etre en minuscules ?', faq2_a: 'Oui, utilisez le kebab-case en minuscules.',
    faq3_q: 'Comment gerer les ressources imbriquees ?', faq3_a: 'Limitez l\'imbrication a un niveau.',
    faq4_q: 'Quelle methode d\'authentification pour les API REST ?', faq4_a: 'OAuth 2.0 avec JWT pour les applications orientees utilisateur.',
    faq5_q: 'GraphQL ou REST ?', faq5_a: 'REST est plus simple avec un meilleur cache. GraphQL pour les besoins de donnees complexes.',
    p_conclusion: 'Suivre ces bonnes pratiques des le depart evite de nombreuses heures de refactoring.',
    link_tool_bottom: 'Essayez le Formateur JSON \u2192',
    link_tool_bottom2: 'Voir les codes de statut HTTP \u2192',
  },
  de: {
    intro: 'Eine gute REST-API zu entwerfen bedeutet mehr als nur JSON zuruckzugeben. Eine gut entworfene API ist <strong>vorhersehbar, konsistent, sicher und einfach zu nutzen</strong>. Dieser Leitfaden behandelt die wichtigsten Best Practices fur REST-API-Design.',
    link_tool: 'Validieren Sie Ihre API-Antworten mit unserem JSON Formatter \u2192',
    h2_1: '1. Nomen fur Ressourcen-URIs verwenden', p_1: 'REST-APIs modellieren <strong>Ressourcen</strong>, keine Aktionen.',
    h2_2: '2. HTTP-Methoden korrekt verwenden', p_2: 'Jede HTTP-Methode hat eine spezifische Bedeutung.',
    h2_3: '3. Plurale Ressourcennamen verwenden', p_3: 'Verwenden Sie immer Pluralnomen fur Sammlungen.',
    h2_4: '4. HTTP-Statuscodes korrekt verwenden', p_4: 'Statuscodes sagen dem Client <strong>was passiert ist</strong>.',
    h2_5: '5. API versionieren', p_5: 'API-Versionierung schutzt bestehende Nutzer bei Breaking Changes.',
    h2_6: '6. Paginierung, Filterung und Sortierung', p_6: 'Jeder Endpoint mit Sammlungen sollte Paginierung unterstutzen.',
    h2_7: '7. Fehlerantwort-Format', p_7: 'Ein konsistentes Fehlerformat hilft Clients bei der Fehlerbehandlung.',
    h2_8: '8. Authentifizierung und Sicherheit', p_8: 'API-Sicherheit ist unverzichtbar.',
    h2_9: '9. Rate Limiting', p_9: 'Rate Limiting schutzt Ihre API vor Missbrauch.',
    h2_10: '10. HATEOAS und Links', p_10: 'HATEOAS fugt Ihrer API Entdeckbarkeit hinzu.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'PUT oder PATCH fur Updates?', faq1_a: 'PUT fur vollstandigen Ersatz, PATCH fur partielle Updates.',
    faq2_q: 'Sollen URIs kleingeschrieben sein?', faq2_a: 'Ja, verwenden Sie Kleinbuchstaben mit Bindestrichen.',
    faq3_q: 'Wie behandelt man verschachtelte Ressourcen?', faq3_a: 'Verschachtelung auf eine Ebene begrenzen.',
    faq4_q: 'Beste Authentifizierungsmethode?', faq4_a: 'OAuth 2.0 mit JWT fur nutzerorientierte Apps.',
    faq5_q: 'GraphQL oder REST?', faq5_a: 'REST ist einfacher mit besserem Caching. GraphQL fur komplexe Datenanforderungen.',
    p_conclusion: 'Diese Best Practices von Anfang an zu befolgen spart viele Stunden Refactoring.',
    link_tool_bottom: 'JSON Formatter testen \u2192',
    link_tool_bottom2: 'HTTP-Statuscodes ansehen \u2192',
  },
  es: {
    intro: 'Disenar una buena API REST va mas alla de devolver JSON. Una API bien disenada es <strong>predecible, consistente, segura y facil de consumir</strong>. Esta guia cubre las mejores practicas de diseno de API REST con ejemplos reales.',
    link_tool: 'Valida tus respuestas API con nuestro Formateador JSON \u2192',
    h2_1: '1. Usar sustantivos para las URI de recursos', p_1: 'Las API REST modelan <strong>recursos</strong>, no acciones.',
    h2_2: '2. Usar metodos HTTP correctamente', p_2: 'Cada metodo HTTP tiene un significado semantico especifico.',
    h2_3: '3. Usar nombres de recursos en plural', p_3: 'Usa siempre sustantivos en plural para las colecciones.',
    h2_4: '4. Usar codigos de estado HTTP correctamente', p_4: 'Los codigos de estado indican al cliente <strong>que ocurrio</strong>.',
    h2_5: '5. Versionar tu API', p_5: 'El versionado protege a los consumidores existentes ante cambios incompatibles.',
    h2_6: '6. Paginacion, filtrado y ordenamiento', p_6: 'Todo endpoint que devuelva una coleccion debe soportar paginacion.',
    h2_7: '7. Formato de respuesta de error', p_7: 'Un formato de error consistente ayuda a los clientes a manejar errores programaticamente.',
    h2_8: '8. Autenticacion y seguridad', p_8: 'La seguridad de la API es innegociable.',
    h2_9: '9. Limitacion de tasa', p_9: 'La limitacion de tasa protege tu API contra abusos.',
    h2_10: '10. HATEOAS y enlaces', p_10: 'HATEOAS agrega descubribilidad a tu API.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'PUT o PATCH para actualizaciones?', faq1_a: 'PUT para reemplazo completo, PATCH para actualizacion parcial.',
    faq2_q: 'Las URI deben ser minusculas?', faq2_a: 'Si, usa kebab-case en minusculas.',
    faq3_q: 'Como manejar recursos anidados?', faq3_a: 'Limita el anidamiento a un nivel.',
    faq4_q: 'Mejor metodo de autenticacion?', faq4_a: 'OAuth 2.0 con JWT para aplicaciones orientadas al usuario.',
    faq5_q: 'GraphQL o REST?', faq5_a: 'REST es mas simple con mejor cache. GraphQL para necesidades de datos complejas.',
    p_conclusion: 'Seguir estas mejores practicas desde el inicio ahorra horas de refactorizacion.',
    link_tool_bottom: 'Prueba el Formateador JSON \u2192',
    link_tool_bottom2: 'Ver codigos de estado HTTP \u2192',
  },
  it: {
    intro: 'Progettare una buona API REST significa molto piu che restituire JSON. Un\'API ben progettata e <strong>prevedibile, coerente, sicura e facile da consumare</strong>. Questa guida copre le migliori pratiche di progettazione API REST.',
    link_tool: 'Valida le risposte API con il nostro Formattatore JSON \u2192',
    h2_1: '1. Usare nomi per le URI delle risorse', p_1: 'Le API REST modellano <strong>risorse</strong>, non azioni.',
    h2_2: '2. Usare i metodi HTTP correttamente', p_2: 'Ogni metodo HTTP ha un significato semantico specifico.',
    h2_3: '3. Usare nomi di risorse al plurale', p_3: 'Usa sempre nomi al plurale per le collezioni.',
    h2_4: '4. Usare i codici di stato HTTP correttamente', p_4: 'I codici di stato indicano al client <strong>cosa e successo</strong>.',
    h2_5: '5. Versionare la tua API', p_5: 'Il versionamento protegge i consumatori esistenti durante modifiche incompatibili.',
    h2_6: '6. Paginazione, filtraggio e ordinamento', p_6: 'Ogni endpoint che restituisce una collezione deve supportare la paginazione.',
    h2_7: '7. Formato di risposta errore', p_7: 'Un formato di errore coerente aiuta i client a gestire gli errori programmaticamente.',
    h2_8: '8. Autenticazione e sicurezza', p_8: 'La sicurezza API e irrinunciabile.',
    h2_9: '9. Limitazione della frequenza', p_9: 'La limitazione della frequenza protegge la tua API dagli abusi.',
    h2_10: '10. HATEOAS e link', p_10: 'HATEOAS aggiunge scopribilita alla tua API.',
    h2_faq: 'Domande frequenti',
    faq1_q: 'PUT o PATCH per gli aggiornamenti?', faq1_a: 'PUT per sostituzione completa, PATCH per aggiornamento parziale.',
    faq2_q: 'Le URI devono essere minuscole?', faq2_a: 'Si, usa il kebab-case in minuscolo.',
    faq3_q: 'Come gestire le risorse annidate?', faq3_a: 'Limita l\'annidamento a un livello.',
    faq4_q: 'Miglior metodo di autenticazione?', faq4_a: 'OAuth 2.0 con JWT per le app orientate all\'utente.',
    faq5_q: 'GraphQL o REST?', faq5_a: 'REST e piu semplice con migliore caching. GraphQL per esigenze dati complesse.',
    p_conclusion: 'Seguire queste best practice dall\'inizio risparmia ore di refactoring.',
    link_tool_bottom: 'Prova il Formattatore JSON \u2192',
    link_tool_bottom2: 'Vedi codici di stato HTTP \u2192',
  },
  pt: {
    intro: 'Projetar uma boa API REST vai alem de retornar JSON. Uma API bem projetada e <strong>previsivel, consistente, segura e facil de consumir</strong>. Este guia cobre as melhores praticas de design de API REST.',
    link_tool: 'Valide suas respostas de API com nosso Formatador JSON \u2192',
    h2_1: '1. Usar substantivos para URIs de recursos', p_1: 'APIs REST modelam <strong>recursos</strong>, nao acoes.',
    h2_2: '2. Usar metodos HTTP corretamente', p_2: 'Cada metodo HTTP tem um significado semantico especifico.',
    h2_3: '3. Usar nomes de recursos no plural', p_3: 'Use sempre substantivos no plural para colecoes.',
    h2_4: '4. Usar codigos de status HTTP corretamente', p_4: 'Codigos de status dizem ao cliente <strong>o que aconteceu</strong>.',
    h2_5: '5. Versionar sua API', p_5: 'O versionamento protege consumidores existentes durante mudancas incompativeis.',
    h2_6: '6. Paginacao, filtragem e ordenacao', p_6: 'Todo endpoint que retorna uma colecao deve suportar paginacao.',
    h2_7: '7. Formato de resposta de erro', p_7: 'Um formato de erro consistente ajuda clientes a tratar erros programaticamente.',
    h2_8: '8. Autenticacao e seguranca', p_8: 'Seguranca de API nao e negociavel.',
    h2_9: '9. Limitacao de taxa', p_9: 'Limitacao de taxa protege sua API contra abusos.',
    h2_10: '10. HATEOAS e links', p_10: 'HATEOAS adiciona descobribilidade a sua API.',
    h2_faq: 'Perguntas frequentes',
    faq1_q: 'PUT ou PATCH para atualizacoes?', faq1_a: 'PUT para substituicao completa, PATCH para atualizacao parcial.',
    faq2_q: 'URIs devem ser minusculas?', faq2_a: 'Sim, use kebab-case em minusculas.',
    faq3_q: 'Como lidar com recursos aninhados?', faq3_a: 'Limite o aninhamento a um nivel.',
    faq4_q: 'Melhor metodo de autenticacao?', faq4_a: 'OAuth 2.0 com JWT para apps orientados ao usuario.',
    faq5_q: 'GraphQL ou REST?', faq5_a: 'REST e mais simples com melhor cache. GraphQL para necessidades de dados complexas.',
    p_conclusion: 'Seguir estas melhores praticas desde o inicio economiza horas de refatoracao.',
    link_tool_bottom: 'Experimente o Formatador JSON \u2192',
    link_tool_bottom2: 'Ver codigos de status HTTP \u2192',
  },
  nl: {
    intro: 'Een goede REST API ontwerpen gaat verder dan JSON teruggeven. Een goed ontworpen API is <strong>voorspelbaar, consistent, veilig en gemakkelijk te gebruiken</strong>. Deze gids behandelt de belangrijkste REST API-ontwerpprincipes.',
    link_tool: 'Valideer je API-antwoorden met onze JSON Formatter \u2192',
    h2_1: '1. Zelfstandige naamwoorden voor resource-URIs', p_1: 'REST API\'s modelleren <strong>resources</strong>, geen acties.',
    h2_2: '2. HTTP-methoden correct gebruiken', p_2: 'Elke HTTP-methode heeft een specifieke betekenis.',
    h2_3: '3. Meervoudige resourcenamen gebruiken', p_3: 'Gebruik altijd meervoudige zelfstandige naamwoorden voor collecties.',
    h2_4: '4. HTTP-statuscodes correct gebruiken', p_4: 'Statuscodes vertellen de client <strong>wat er is gebeurd</strong>.',
    h2_5: '5. Je API versioneren', p_5: 'API-versionering beschermt bestaande gebruikers bij breaking changes.',
    h2_6: '6. Paginering, filtering en sortering', p_6: 'Elk endpoint dat een collectie retourneert moet paginering ondersteunen.',
    h2_7: '7. Foutresponse-formaat', p_7: 'Een consistent foutformaat helpt clients fouten programmatisch af te handelen.',
    h2_8: '8. Authenticatie en beveiliging', p_8: 'API-beveiliging is niet onderhandelbaar.',
    h2_9: '9. Rate Limiting', p_9: 'Rate limiting beschermt je API tegen misbruik.',
    h2_10: '10. HATEOAS en links', p_10: 'HATEOAS voegt vindbaarheid toe aan je API.',
    h2_faq: 'Veelgestelde vragen',
    faq1_q: 'PUT of PATCH voor updates?', faq1_a: 'PUT voor volledige vervanging, PATCH voor gedeeltelijke update.',
    faq2_q: 'Moeten URI\'s lowercase zijn?', faq2_a: 'Ja, gebruik kebab-case in kleine letters.',
    faq3_q: 'Hoe om te gaan met geneste resources?', faq3_a: 'Beperk nesting tot een niveau.',
    faq4_q: 'Beste authenticatiemethode?', faq4_a: 'OAuth 2.0 met JWT voor gebruikersgerichte apps.',
    faq5_q: 'GraphQL of REST?', faq5_a: 'REST is eenvoudiger met betere caching. GraphQL voor complexe databehoeften.',
    p_conclusion: 'Deze best practices vanaf het begin volgen bespaart uren refactoring.',
    link_tool_bottom: 'Probeer de JSON Formatter \u2192',
    link_tool_bottom2: 'Bekijk HTTP-statuscodes \u2192',
  },
  pl: {
    intro: 'Projektowanie dobrego REST API to wiecej niz zwracanie JSON. Dobrze zaprojektowane API jest <strong>przewidywalne, spojne, bezpieczne i latwe w uzyciu</strong>. Ten przewodnik obejmuje najwazniejsze praktyki projektowania API REST.',
    link_tool: 'Waliduj odpowiedzi API naszym Formaterem JSON \u2192',
    h2_1: '1. Rzeczowniki w URI zasobow', p_1: 'API REST modeluja <strong>zasoby</strong>, nie akcje.',
    h2_2: '2. Poprawne uzycie metod HTTP', p_2: 'Kazda metoda HTTP ma okreslone znaczenie semantyczne.',
    h2_3: '3. Nazwy zasobow w liczbie mnogiej', p_3: 'Zawsze uzywaj rzeczownikow w liczbie mnogiej dla kolekcji.',
    h2_4: '4. Poprawne uzycie kodow statusu HTTP', p_4: 'Kody statusu mowia klientowi <strong>co sie stalo</strong>.',
    h2_5: '5. Wersjonowanie API', p_5: 'Wersjonowanie chroni istniejacych konsumentow przy zmianach lamiacych kompatybilnosc.',
    h2_6: '6. Paginacja, filtrowanie i sortowanie', p_6: 'Kazdy endpoint zwracajacy kolekcje powinien wspierac paginacje.',
    h2_7: '7. Format odpowiedzi bledow', p_7: 'Spojny format bledow pomaga klientom obslugiwac bledy programistycznie.',
    h2_8: '8. Uwierzytelnianie i bezpieczenstwo', p_8: 'Bezpieczenstwo API jest bezdyskusyjne.',
    h2_9: '9. Ograniczanie czestotliwosci', p_9: 'Rate limiting chroni API przed naduzyciami.',
    h2_10: '10. HATEOAS i linki', p_10: 'HATEOAS dodaje odkrywalnosc do API.',
    h2_faq: 'Czesto zadawane pytania',
    faq1_q: 'PUT czy PATCH do aktualizacji?', faq1_a: 'PUT do pelnej zamiany, PATCH do czesciowej aktualizacji.',
    faq2_q: 'Czy URI powinny byc malymi literami?', faq2_a: 'Tak, uzywaj kebab-case malymi literami.',
    faq3_q: 'Jak obslugiwac zagniezdzone zasoby?', faq3_a: 'Ogranicz zagniezdanie do jednego poziomu.',
    faq4_q: 'Najlepsza metoda uwierzytelniania?', faq4_a: 'OAuth 2.0 z JWT dla aplikacji uzytkownikow.',
    faq5_q: 'GraphQL czy REST?', faq5_a: 'REST jest prostszy z lepszym cachem. GraphQL dla zlozonych potrzeb danych.',
    p_conclusion: 'Stosowanie tych praktyk od poczatku oszczedza godziny refaktoryzacji.',
    link_tool_bottom: 'Wyprobuj Formater JSON \u2192',
    link_tool_bottom2: 'Zobacz kody statusu HTTP \u2192',
  },
  sv: {
    intro: 'Att designa ett bra REST API handlar om mer an att returnera JSON. Ett valdesignat API ar <strong>forutsagbart, konsekvent, sakert och latt att anvanda</strong>. Denna guide tacker de viktigaste best practices for REST API-design.',
    link_tool: 'Validera dina API-svar med var JSON Formatter \u2192',
    h2_1: '1. Anvand substantiv for resurs-URI:er', p_1: 'REST API:er modellerar <strong>resurser</strong>, inte handlingar.',
    h2_2: '2. Anvand HTTP-metoder korrekt', p_2: 'Varje HTTP-metod har en specifik semantisk betydelse.',
    h2_3: '3. Anvand plurala resursnamn', p_3: 'Anvand alltid plural for samlingar.',
    h2_4: '4. Anvand HTTP-statuskoder korrekt', p_4: 'Statuskoder talar om for klienten <strong>vad som hande</strong>.',
    h2_5: '5. Versionera ditt API', p_5: 'API-versionering skyddar befintliga anvandare vid breaking changes.',
    h2_6: '6. Paginering, filtrering och sortering', p_6: 'Alla endpoints som returnerar samlingar bor stodja paginering.',
    h2_7: '7. Felsvarsformat', p_7: 'Ett konsekvent felformat hjalper klienter att hantera fel programmatiskt.',
    h2_8: '8. Autentisering och sakerhet', p_8: 'API-sakerhet ar icke-forhandlingsbart.',
    h2_9: '9. Rate Limiting', p_9: 'Rate limiting skyddar ditt API fran missbruk.',
    h2_10: '10. HATEOAS och lankar', p_10: 'HATEOAS gor ditt API upptackbart.',
    h2_faq: 'Vanliga fragor',
    faq1_q: 'PUT eller PATCH for uppdateringar?', faq1_a: 'PUT for fullstandig ersattning, PATCH for partiell uppdatering.',
    faq2_q: 'Ska URI:er vara gemener?', faq2_a: 'Ja, anvand kebab-case med gemener.',
    faq3_q: 'Hur hanterar man nastlade resurser?', faq3_a: 'Begransar nastling till en niva.',
    faq4_q: 'Basta autentiseringsmetoden?', faq4_a: 'OAuth 2.0 med JWT for anvandarriktade appar.',
    faq5_q: 'GraphQL eller REST?', faq5_a: 'REST ar enklare med battre caching. GraphQL for komplexa databehov.',
    p_conclusion: 'Att folja dessa principer fran borjan sparar timmar av refaktorering.',
    link_tool_bottom: 'Testa JSON Formatter \u2192',
    link_tool_bottom2: 'Se HTTP-statuskoder \u2192',
  },
  no: {
    intro: 'A designe et godt REST API handler om mer enn a returnere JSON. Et godt designet API er <strong>forutsigbart, konsistent, sikkert og lett a bruke</strong>. Denne guiden dekker de viktigste best practices for REST API-design.',
    link_tool: 'Valider API-svarene dine med var JSON Formatter \u2192',
    h2_1: '1. Bruk substantiv for ressurs-URIer', p_1: 'REST APIer modellerer <strong>ressurser</strong>, ikke handlinger.',
    h2_2: '2. Bruk HTTP-metoder korrekt', p_2: 'Hver HTTP-metode har en spesifikk semantisk betydning.',
    h2_3: '3. Bruk flertallsressursnavn', p_3: 'Bruk alltid flertall for samlinger.',
    h2_4: '4. Bruk HTTP-statuskoder korrekt', p_4: 'Statuskoder forteller klienten <strong>hva som skjedde</strong>.',
    h2_5: '5. Versjoner APIet ditt', p_5: 'API-versjonering beskytter eksisterende brukere ved breaking changes.',
    h2_6: '6. Paginering, filtrering og sortering', p_6: 'Alle endepunkter som returnerer samlinger bor stotte paginering.',
    h2_7: '7. Feilresponsformat', p_7: 'Et konsistent feilformat hjelper klienter a handtere feil programmatisk.',
    h2_8: '8. Autentisering og sikkerhet', p_8: 'API-sikkerhet er ikke forhandlingsbart.',
    h2_9: '9. Rate Limiting', p_9: 'Rate limiting beskytter APIet ditt mot misbruk.',
    h2_10: '10. HATEOAS og lenker', p_10: 'HATEOAS gjor APIet ditt oppdagbart.',
    h2_faq: 'Vanlige sporsmal',
    faq1_q: 'PUT eller PATCH for oppdateringer?', faq1_a: 'PUT for fullstendig erstatning, PATCH for delvis oppdatering.',
    faq2_q: 'Skal URIer vaere sma bokstaver?', faq2_a: 'Ja, bruk kebab-case med sma bokstaver.',
    faq3_q: 'Hvordan handtere nestede ressurser?', faq3_a: 'Begrens nesting til et niva.',
    faq4_q: 'Beste autentiseringsmetode?', faq4_a: 'OAuth 2.0 med JWT for brukerrettede apper.',
    faq5_q: 'GraphQL eller REST?', faq5_a: 'REST er enklere med bedre caching. GraphQL for komplekse databehov.',
    p_conclusion: 'A folge disse praksisene fra starten sparer timer med refaktorering.',
    link_tool_bottom: 'Prov JSON Formatter \u2192',
    link_tool_bottom2: 'Se HTTP-statuskoder \u2192',
  },
  ja: {
    intro: '優れたREST APIの設計はJSONを返すだけではありません。適切に設計されたAPIは<strong>予測可能、一貫性があり、安全で使いやすい</strong>ものです。このガイドではREST API設計のベストプラクティスを解説します。',
    link_tool: 'JSON Formatterで API レスポンスを検証 \u2192',
    h2_1: '1. リソースURIには名詞を使う', p_1: 'REST APIは<strong>リソース</strong>をモデル化します。アクションではありません。',
    h2_2: '2. HTTPメソッドを正しく使う', p_2: '各HTTPメソッドには特定のセマンティクスがあります。',
    h2_3: '3. 複数形のリソース名を使う', p_3: 'コレクションには常に複数形の名詞を使用します。',
    h2_4: '4. HTTPステータスコードを正しく使う', p_4: 'ステータスコードはクライアントに<strong>何が起きたか</strong>を伝えます。',
    h2_5: '5. APIをバージョニングする', p_5: 'APIバージョニングは破壊的変更時に既存のコンシューマーを保護します。',
    h2_6: '6. ページネーション、フィルタリング、ソート', p_6: 'コレクションを返すすべてのエンドポイントはページネーションをサポートすべきです。',
    h2_7: '7. エラーレスポンスフォーマット', p_7: '一貫したエラーフォーマットはクライアントのプログラム的なエラー処理を助けます。',
    h2_8: '8. 認証とセキュリティ', p_8: 'APIセキュリティは妥協できません。',
    h2_9: '9. レート制限', p_9: 'レート制限はAPIを悪用から保護します。',
    h2_10: '10. HATEOASとリンク', p_10: 'HATEOASはAPIに発見可能性を追加します。',
    h2_faq: 'よくある質問',
    faq1_q: '更新にはPUTかPATCHか？', faq1_a: 'PUTは完全な置換、PATCHは部分更新に使用します。',
    faq2_q: 'URIは小文字にすべき？', faq2_a: 'はい、小文字のkebab-caseを使用してください。',
    faq3_q: 'ネストされたリソースの扱い方は？', faq3_a: 'ネストは1レベルに制限します。',
    faq4_q: '最適な認証方法は？', faq4_a: 'ユーザー向けアプリにはOAuth 2.0とJWTを使用します。',
    faq5_q: 'GraphQLかRESTか？', faq5_a: 'RESTはシンプルでキャッシュが優れています。GraphQLは複雑なデータ要件に適しています。',
    p_conclusion: 'これらのベストプラクティスを最初から守ることで、リファクタリングの時間を節約できます。',
    link_tool_bottom: 'JSON Formatterを試す \u2192',
    link_tool_bottom2: 'HTTPステータスコードを見る \u2192',
  },
  ko: {
    intro: '훌륭한 REST API 설계는 단순히 JSON을 반환하는 것 이상입니다. 잘 설계된 API는 <strong>예측 가능하고, 일관되며, 안전하고, 사용하기 쉬워야</strong> 합니다. 이 가이드는 REST API 설계 모범 사례를 다룹니다.',
    link_tool: 'JSON Formatter로 API 응답을 검증하세요 \u2192',
    h2_1: '1. 리소스 URI에 명사 사용', p_1: 'REST API는 동작이 아닌 <strong>리소스</strong>를 모델링합니다.',
    h2_2: '2. HTTP 메서드 올바르게 사용', p_2: '각 HTTP 메서드는 특정 의미를 가집니다.',
    h2_3: '3. 복수형 리소스 이름 사용', p_3: '컬렉션에는 항상 복수형 명사를 사용하세요.',
    h2_4: '4. HTTP 상태 코드 올바르게 사용', p_4: '상태 코드는 클라이언트에게 <strong>무슨 일이 일어났는지</strong> 알려줍니다.',
    h2_5: '5. API 버전 관리', p_5: 'API 버전 관리는 호환성 깨지는 변경 시 기존 소비자를 보호합니다.',
    h2_6: '6. 페이지네이션, 필터링, 정렬', p_6: '컬렉션을 반환하는 모든 엔드포인트는 페이지네이션을 지원해야 합니다.',
    h2_7: '7. 오류 응답 형식', p_7: '일관된 오류 형식은 클라이언트의 프로그래밍적 오류 처리를 돕습니다.',
    h2_8: '8. 인증과 보안', p_8: 'API 보안은 타협할 수 없습니다.',
    h2_9: '9. 속도 제한', p_9: '속도 제한은 API를 남용으로부터 보호합니다.',
    h2_10: '10. HATEOAS와 링크', p_10: 'HATEOAS는 API에 발견 가능성을 추가합니다.',
    h2_faq: '자주 묻는 질문',
    faq1_q: '업데이트에 PUT 또는 PATCH?', faq1_a: 'PUT은 전체 교체, PATCH는 부분 업데이트에 사용합니다.',
    faq2_q: 'URI는 소문자여야 하나요?', faq2_a: '네, 소문자 kebab-case를 사용하세요.',
    faq3_q: '중첩된 리소스는 어떻게 처리하나요?', faq3_a: '중첩을 한 단계로 제한하세요.',
    faq4_q: '최적의 인증 방법은?', faq4_a: '사용자 대상 앱에는 OAuth 2.0과 JWT를 사용합니다.',
    faq5_q: 'GraphQL vs REST?', faq5_a: 'REST는 더 단순하고 캐싱이 우수합니다. GraphQL은 복잡한 데이터 요구에 적합합니다.',
    p_conclusion: '이러한 모범 사례를 처음부터 따르면 리팩토링 시간을 절약할 수 있습니다.',
    link_tool_bottom: 'JSON Formatter 사용해보기 \u2192',
    link_tool_bottom2: 'HTTP 상태 코드 보기 \u2192',
  },
  id: {
    intro: 'Mendesain REST API yang baik bukan hanya soal mengembalikan JSON. API yang dirancang dengan baik harus <strong>dapat diprediksi, konsisten, aman, dan mudah digunakan</strong>. Panduan ini mencakup praktik terbaik desain REST API.',
    link_tool: 'Validasi respons API Anda dengan JSON Formatter kami \u2192',
    h2_1: '1. Gunakan kata benda untuk URI resource', p_1: 'REST API memodelkan <strong>resource</strong>, bukan aksi.',
    h2_2: '2. Gunakan metode HTTP dengan benar', p_2: 'Setiap metode HTTP memiliki makna semantik spesifik.',
    h2_3: '3. Gunakan nama resource jamak', p_3: 'Selalu gunakan kata benda jamak untuk koleksi.',
    h2_4: '4. Gunakan kode status HTTP dengan benar', p_4: 'Kode status memberi tahu klien <strong>apa yang terjadi</strong>.',
    h2_5: '5. Versikan API Anda', p_5: 'Versioning API melindungi konsumen yang ada saat terjadi breaking changes.',
    h2_6: '6. Paginasi, filtering, dan sorting', p_6: 'Setiap endpoint yang mengembalikan koleksi harus mendukung paginasi.',
    h2_7: '7. Format respons error', p_7: 'Format error yang konsisten membantu klien menangani error secara programatis.',
    h2_8: '8. Autentikasi dan keamanan', p_8: 'Keamanan API tidak bisa ditawar.',
    h2_9: '9. Rate Limiting', p_9: 'Rate limiting melindungi API Anda dari penyalahgunaan.',
    h2_10: '10. HATEOAS dan link', p_10: 'HATEOAS menambah kemampuan penemuan ke API Anda.',
    h2_faq: 'Pertanyaan yang sering diajukan',
    faq1_q: 'PUT atau PATCH untuk update?', faq1_a: 'PUT untuk penggantian penuh, PATCH untuk update parsial.',
    faq2_q: 'Apakah URI harus lowercase?', faq2_a: 'Ya, gunakan kebab-case lowercase.',
    faq3_q: 'Bagaimana menangani resource bersarang?', faq3_a: 'Batasi nesting ke satu level.',
    faq4_q: 'Metode autentikasi terbaik?', faq4_a: 'OAuth 2.0 dengan JWT untuk app berorientasi pengguna.',
    faq5_q: 'GraphQL atau REST?', faq5_a: 'REST lebih sederhana dengan caching lebih baik. GraphQL untuk kebutuhan data kompleks.',
    p_conclusion: 'Mengikuti praktik terbaik ini dari awal menghemat jam-jam refactoring.',
    link_tool_bottom: 'Coba JSON Formatter \u2192',
    link_tool_bottom2: 'Lihat kode status HTTP \u2192',
  },
  th: {
    intro: 'การออกแบบ REST API ที่ดีไม่ใช่แค่การส่ง JSON กลับ API ที่ออกแบบมาอย่างดีต้อง<strong>คาดเดาได้ สม่ำเสมอ ปลอดภัย และใช้งานง่าย</strong> คู่มือนี้ครอบคลุมแนวปฏิบัติที่ดีที่สุดในการออกแบบ REST API',
    link_tool: 'ตรวจสอบ API response ด้วย JSON Formatter ของเรา \u2192',
    h2_1: '1. ใช้คำนามสำหรับ Resource URI', p_1: 'REST API จำลอง<strong>ทรัพยากร</strong> ไม่ใช่การกระทำ',
    h2_2: '2. ใช้ HTTP Method อย่างถูกต้อง', p_2: 'แต่ละ HTTP method มีความหมายเฉพาะ',
    h2_3: '3. ใช้ชื่อทรัพยากรพหูพจน์', p_3: 'ใช้คำนามพหูพจน์สำหรับ collection เสมอ',
    h2_4: '4. ใช้ HTTP Status Code อย่างถูกต้อง', p_4: 'Status code บอกไคลเอนต์ว่า<strong>เกิดอะไรขึ้น</strong>',
    h2_5: '5. กำหนดเวอร์ชัน API', p_5: 'การกำหนดเวอร์ชัน API ปกป้องผู้ใช้เดิมเมื่อมี breaking changes',
    h2_6: '6. การแบ่งหน้า การกรอง และการเรียงลำดับ', p_6: 'ทุก endpoint ที่ส่งคืน collection ควรรองรับ pagination',
    h2_7: '7. รูปแบบ Error Response', p_7: 'รูปแบบ error ที่สม่ำเสมอช่วยให้ไคลเอนต์จัดการข้อผิดพลาดได้',
    h2_8: '8. การยืนยันตัวตนและความปลอดภัย', p_8: 'ความปลอดภัยของ API เป็นสิ่งที่ต่อรองไม่ได้',
    h2_9: '9. Rate Limiting', p_9: 'Rate limiting ปกป้อง API ของคุณจากการใช้งานในทางที่ผิด',
    h2_10: '10. HATEOAS และลิงก์', p_10: 'HATEOAS เพิ่มความสามารถในการค้นพบให้กับ API',
    h2_faq: 'คำถามที่พบบ่อย',
    faq1_q: 'PUT หรือ PATCH สำหรับการอัปเดต?', faq1_a: 'PUT สำหรับการแทนที่ทั้งหมด PATCH สำหรับการอัปเดตบางส่วน',
    faq2_q: 'URI ควรเป็นตัวพิมพ์เล็ก?', faq2_a: 'ใช่ ใช้ kebab-case ตัวพิมพ์เล็ก',
    faq3_q: 'จัดการ resource ซ้อนกันอย่างไร?', faq3_a: 'จำกัดการซ้อนไว้ที่ระดับเดียว',
    faq4_q: 'วิธีการยืนยันตัวตนที่ดีที่สุด?', faq4_a: 'OAuth 2.0 กับ JWT สำหรับแอปที่เน้นผู้ใช้',
    faq5_q: 'GraphQL หรือ REST?', faq5_a: 'REST ง่ายกว่าและ caching ดีกว่า GraphQL สำหรับข้อมูลที่ซับซ้อน',
    p_conclusion: 'การปฏิบัติตามแนวทางเหล่านี้ตั้งแต่เริ่มต้นช่วยประหยัดเวลา refactoring',
    link_tool_bottom: 'ลอง JSON Formatter \u2192',
    link_tool_bottom2: 'ดู HTTP Status Codes \u2192',
  },
};

export default function ApiDesignBestPractices({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* ==================== 1. NOUNS FOR URIS ==================== */}
      <h2>{t.h2_1}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_1 }} />
      <pre><code>{`# Good - nouns representing resources
GET    /api/v1/users          # list users
GET    /api/v1/users/123      # get user 123
POST   /api/v1/users          # create a user
PUT    /api/v1/users/123      # replace user 123
PATCH  /api/v1/users/123      # partially update user 123
DELETE /api/v1/users/123      # delete user 123

# Bad - verbs describing actions
GET    /api/v1/getUsers
POST   /api/v1/createUser
POST   /api/v1/deleteUser/123
GET    /api/v1/getUserById?id=123`}</code></pre>

      <pre><code>{`# Nested resources (one level deep)
GET    /api/v1/users/123/orders       # orders for user 123
GET    /api/v1/users/123/orders/456   # order 456 for user 123
POST   /api/v1/users/123/orders       # create order for user 123

# For actions that don't map to CRUD, use sub-resources
POST   /api/v1/users/123/activate     # activate user (action)
POST   /api/v1/orders/456/cancel      # cancel order (action)
POST   /api/v1/emails/789/resend      # resend email`}</code></pre>

      {/* ==================== 2. HTTP METHODS ==================== */}
      <h2>{t.h2_2}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_2 }} />
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Method</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Purpose</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Idempotent</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Request Body</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>GET</code></td>
              <td style={{ padding: '8px 12px' }}>Read a resource</td>
              <td style={{ padding: '8px 12px' }}>Yes</td>
              <td style={{ padding: '8px 12px' }}>No</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>POST</code></td>
              <td style={{ padding: '8px 12px' }}>Create a resource</td>
              <td style={{ padding: '8px 12px' }}>No</td>
              <td style={{ padding: '8px 12px' }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>PUT</code></td>
              <td style={{ padding: '8px 12px' }}>Full replacement</td>
              <td style={{ padding: '8px 12px' }}>Yes</td>
              <td style={{ padding: '8px 12px' }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>PATCH</code></td>
              <td style={{ padding: '8px 12px' }}>Partial update</td>
              <td style={{ padding: '8px 12px' }}>No*</td>
              <td style={{ padding: '8px 12px' }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}><code>DELETE</code></td>
              <td style={{ padding: '8px 12px' }}>Remove a resource</td>
              <td style={{ padding: '8px 12px' }}>Yes</td>
              <td style={{ padding: '8px 12px' }}>No</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ==================== 3. PLURAL NAMES ==================== */}
      <h2>{t.h2_3}</h2>
      <p>{t.p_3}</p>
      <pre><code>{`# Good - consistent plural nouns
/api/v1/users
/api/v1/users/123
/api/v1/products
/api/v1/products/456/reviews

# Bad - mixing singular and plural
/api/v1/user          # singular
/api/v1/user/123
/api/v1/productList   # avoid "list" suffix`}</code></pre>

      {/* ==================== 4. STATUS CODES ==================== */}
      <h2>{t.h2_4}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_4 }} />
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Code</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>When to Use</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>200 OK</code></td><td style={{ padding: '8px 12px' }}>Successful GET, PUT, PATCH, or DELETE</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>201 Created</code></td><td style={{ padding: '8px 12px' }}>Successful POST that creates a resource</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>204 No Content</code></td><td style={{ padding: '8px 12px' }}>Successful DELETE with no response body</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>400 Bad Request</code></td><td style={{ padding: '8px 12px' }}>Malformed request syntax or invalid data</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>401 Unauthorized</code></td><td style={{ padding: '8px 12px' }}>Missing or invalid authentication</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>403 Forbidden</code></td><td style={{ padding: '8px 12px' }}>Authenticated but not authorized</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>404 Not Found</code></td><td style={{ padding: '8px 12px' }}>Resource does not exist</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>409 Conflict</code></td><td style={{ padding: '8px 12px' }}>Conflicting state (e.g., duplicate email)</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>422 Unprocessable</code></td><td style={{ padding: '8px 12px' }}>Validation errors in request body</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>429 Too Many Requests</code></td><td style={{ padding: '8px 12px' }}>Rate limit exceeded</td></tr>
            <tr style={{ borderBottom: '1px solid #334155' }}><td style={{ padding: '8px 12px' }}><code>500 Internal Error</code></td><td style={{ padding: '8px 12px' }}>Unexpected server error</td></tr>
          </tbody>
        </table>
      </div>

      {/* ==================== 5. VERSIONING ==================== */}
      <h2>{t.h2_5}</h2>
      <p>{t.p_5}</p>
      <pre><code>{`# Strategy 1: URI versioning (most common)
GET /api/v1/users
GET /api/v2/users

# Strategy 2: Header versioning
GET /api/users
Accept: application/vnd.myapi.v2+json

# Strategy 3: Query parameter versioning
GET /api/users?version=2`}</code></pre>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Strategy</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Pros</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>URI path</td>
              <td style={{ padding: '8px 12px' }}>Simple, visible, cacheable</td>
              <td style={{ padding: '8px 12px' }}>URI pollution</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Header</td>
              <td style={{ padding: '8px 12px' }}>Clean URIs</td>
              <td style={{ padding: '8px 12px' }}>Harder to test, less visible</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Query param</td>
              <td style={{ padding: '8px 12px' }}>Easy to add</td>
              <td style={{ padding: '8px 12px' }}>Cache-unfriendly, easy to forget</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ==================== 6. PAGINATION ==================== */}
      <h2>{t.h2_6}</h2>
      <p>{t.p_6}</p>
      <pre><code>{`# Offset-based pagination (simplest)
GET /api/v1/users?page=2&limit=25
GET /api/v1/users?offset=25&limit=25

# Cursor-based pagination (better for large datasets)
GET /api/v1/users?cursor=eyJpZCI6MTAwfQ&limit=25

# Response with pagination metadata
{
  "data": [...],
  "pagination": {
    "total": 1250,
    "page": 2,
    "limit": 25,
    "totalPages": 50,
    "hasNext": true,
    "hasPrev": true
  }
}

# Filtering and sorting
GET /api/v1/products?category=electronics&minPrice=100&maxPrice=500
GET /api/v1/products?sort=price&order=asc
GET /api/v1/products?sort=-created_at  # prefix with - for descending
GET /api/v1/users?fields=id,name,email  # sparse fieldsets`}</code></pre>

      {/* ==================== 7. ERROR FORMAT ==================== */}
      <h2>{t.h2_7}</h2>
      <p>{t.p_7}</p>
      <pre><code>{`// Consistent error response format
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address",
        "value": "not-an-email"
      },
      {
        "field": "age",
        "message": "Must be at least 18",
        "value": 15
      }
    ],
    "requestId": "req_abc123",
    "timestamp": "2026-01-15T10:30:00Z",
    "docs": "https://api.example.com/docs/errors#VALIDATION_ERROR"
  }
}

// Simple error (non-validation)
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "User with id 999 not found",
    "requestId": "req_def456"
  }
}`}</code></pre>

      {/* ==================== 8. AUTH & SECURITY ==================== */}
      <h2>{t.h2_8}</h2>
      <p>{t.p_8}</p>
      <pre><code>{`# Bearer token authentication (JWT)
GET /api/v1/users
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...

# API key authentication
GET /api/v1/users
X-API-Key: sk_live_abc123def456

# OAuth 2.0 token request
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
&scope=read:users write:users`}</code></pre>
      <ul>
        <li>Always use HTTPS in production</li>
        <li>Never put secrets in query parameters (they appear in server logs)</li>
        <li>Use short-lived access tokens (15-60 min) with refresh tokens</li>
        <li>Implement CORS properly for browser-based clients</li>
        <li>Validate and sanitize all input to prevent injection attacks</li>
        <li>Use rate limiting to prevent brute-force attacks</li>
      </ul>

      {/* ==================== 9. RATE LIMITING ==================== */}
      <h2>{t.h2_9}</h2>
      <p>{t.p_9}</p>
      <pre><code>{`# Rate limit response headers (standard)
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000        # max requests per window
X-RateLimit-Remaining: 742     # requests remaining
X-RateLimit-Reset: 1706810400  # Unix timestamp when limit resets
Retry-After: 60                # seconds until next request (on 429)

# Rate limit exceeded response
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 60

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Limit: 1000/hour",
    "retryAfter": 60
  }
}`}</code></pre>

      {/* ==================== 10. HATEOAS ==================== */}
      <h2>{t.h2_10}</h2>
      <p>{t.p_10}</p>
      <pre><code>{`// HATEOAS response example
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "status": "active",
  "_links": {
    "self": { "href": "/api/v1/users/123" },
    "orders": { "href": "/api/v1/users/123/orders" },
    "deactivate": {
      "href": "/api/v1/users/123/deactivate",
      "method": "POST"
    }
  }
}

// Paginated collection with HATEOAS links
{
  "data": [...],
  "_links": {
    "self": { "href": "/api/v1/users?page=2&limit=25" },
    "first": { "href": "/api/v1/users?page=1&limit=25" },
    "prev": { "href": "/api/v1/users?page=1&limit=25" },
    "next": { "href": "/api/v1/users?page=3&limit=25" },
    "last": { "href": "/api/v1/users?page=50&limit=25" }
  }
}`}</code></pre>

      {/* ==================== FAQ ==================== */}
      <h2>{t.h2_faq}</h2>
      <h3>{t.faq1_q}</h3>
      <p>{t.faq1_a}</p>
      <h3>{t.faq2_q}</h3>
      <p>{t.faq2_a}</p>
      <h3>{t.faq3_q}</h3>
      <p>{t.faq3_a}</p>
      <h3>{t.faq4_q}</h3>
      <p>{t.faq4_a}</p>
      <h3>{t.faq5_q}</h3>
      <p>{t.faq5_a}</p>

      {/* ==================== TLDR ==================== */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid #334155', borderRadius: 8, padding: '20px 24px', margin: '32px 0' }}>
        <h3 style={{ marginTop: 0 }}>TL;DR</h3>
        <ul style={{ marginBottom: 0 }}>
          <li>Use nouns (not verbs) for resource URIs</li>
          <li>Use the correct HTTP method for each operation</li>
          <li>Always use plural resource names</li>
          <li>Return appropriate HTTP status codes</li>
          <li>Version your API from day one (URI path is simplest)</li>
          <li>Support pagination, filtering, and sorting for collections</li>
          <li>Use a consistent error response format</li>
          <li>Always use HTTPS and proper authentication</li>
          <li>Implement rate limiting with standard headers</li>
          <li>Consider HATEOAS for API discoverability</li>
        </ul>
      </div>

      <p>{t.p_conclusion}</p>
    </>
  );
}
