'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'HTTP Headers Complete Guide: Request, Response, Security, and CORS',
    intro: 'HTTP headers are the invisible backbone of the web. Every request and response you make carries a set of headers that control caching, authentication, content negotiation, security policies, and much more. This complete guide covers the most important <strong>request headers</strong>, <strong>response headers</strong>, <strong>security headers</strong>, and CORS configuration for developers in 2026.',
    h2Request: 'Essential Request Headers',
    requestP1: 'Request headers are sent by the client (browser or API consumer) to the server. They carry metadata about the request, the client capabilities, and the desired response format.',
    h2Response: 'Essential Response Headers',
    responseP1: 'Response headers are sent by the server back to the client. They describe the content, instruct caching behavior, and establish security policies.',
    h2Security: 'HTTP Security Headers',
    securityP1: 'Security headers protect your users from a wide range of attacks including XSS, clickjacking, and man-in-the-middle attacks. Every production web application should implement these headers.',
    h2Cors: 'CORS: Cross-Origin Resource Sharing',
    corsP1: 'CORS allows servers to specify which origins are permitted to access their resources. It is enforced by browsers but not by server-to-server requests or tools like curl.',
    h2Caching: 'Caching Headers',
    cachingP1: 'Correct caching headers dramatically improve performance by letting browsers and CDNs reuse responses without making new requests to the origin server.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is the difference between Authorization and Authentication headers?',
    faq1A: 'HTTP does not have a dedicated Authentication header. Authentication credentials are sent via the Authorization header (e.g., Bearer tokens, Basic auth). The WWW-Authenticate response header tells the client what authentication scheme to use.',
    faq2Q: 'Why does my CORS preflight fail?',
    faq2A: 'CORS preflight OPTIONS requests fail when the server does not return the correct Access-Control-Allow-Origin, Access-Control-Allow-Methods, or Access-Control-Allow-Headers response headers. Ensure your server explicitly handles OPTIONS requests and returns these headers.',
    faq3Q: 'What is the Content-Security-Policy header?',
    faq3A: 'CSP (Content-Security-Policy) is a powerful security header that tells browsers which content sources are trusted. It prevents XSS attacks by blocking inline scripts and restricting resource loading to approved domains.',
    faq4Q: 'How do I force HTTPS with HTTP headers?',
    faq4A: 'Use the Strict-Transport-Security (HSTS) header: Strict-Transport-Security: max-age=31536000; includeSubDomains. Once received, browsers will only connect via HTTPS for the specified max-age duration.',
    relatedTitle: 'Related Tools',
  },
  fr: {
    title: 'Guide complet des en-têtes HTTP : requête, réponse, sécurité et CORS',
    intro: 'Les en-têtes HTTP sont l\'épine dorsale invisible du web. Ce guide couvre les <strong>en-têtes de requête</strong>, les <strong>en-têtes de réponse</strong>, les en-têtes de sécurité et la configuration CORS.',
    h2Request: 'En-têtes de requête essentiels',
    requestP1: 'Les en-têtes de requête sont envoyés par le client au serveur. Ils transportent des métadonnées sur la requête et les capacités du client.',
    h2Response: 'En-têtes de réponse essentiels',
    responseP1: 'Les en-têtes de réponse sont renvoyés par le serveur au client. Ils décrivent le contenu et établissent les politiques de mise en cache.',
    h2Security: 'En-têtes de sécurité HTTP',
    securityP1: 'Les en-têtes de sécurité protègent vos utilisateurs contre XSS, le détournement de clic et les attaques MITM.',
    h2Cors: 'CORS : Partage de ressources entre origines',
    corsP1: 'CORS permet aux serveurs de spécifier quelles origines peuvent accéder à leurs ressources.',
    h2Caching: 'En-têtes de mise en cache',
    cachingP1: 'Les en-têtes de cache corrects améliorent considérablement les performances en permettant la réutilisation des réponses.',
    h2Faq: 'Questions fréquentes',
    faq1Q: 'Quelle est la différence entre Authorization et Authentication ?',
    faq1A: 'HTTP n\'a pas d\'en-tête d\'authentification dédié. Les informations d\'identification sont envoyées via l\'en-tête Authorization.',
    faq2Q: 'Pourquoi mon preflight CORS échoue-t-il ?',
    faq2A: 'Le preflight OPTIONS échoue quand le serveur ne renvoie pas les bons en-têtes Access-Control-Allow-*.',
    faq3Q: 'Qu\'est-ce que l\'en-tête Content-Security-Policy ?',
    faq3A: 'CSP est un en-tête de sécurité puissant qui indique au navigateur quelles sources de contenu sont approuvées.',
    faq4Q: 'Comment forcer HTTPS avec des en-têtes HTTP ?',
    faq4A: 'Utilisez l\'en-tête Strict-Transport-Security (HSTS) avec max-age=31536000.',
    relatedTitle: 'Outils associés',
  },
  de: {
    title: 'HTTP-Header Komplettanleitung: Anfrage, Antwort, Sicherheit und CORS',
    intro: 'HTTP-Header sind das unsichtbare Rückgrat des Webs. Dieser Leitfaden behandelt <strong>Anfrage-Header</strong>, <strong>Antwort-Header</strong>, Sicherheits-Header und CORS-Konfiguration.',
    h2Request: 'Wichtige Anfrage-Header',
    requestP1: 'Anfrage-Header werden vom Client an den Server gesendet und übertragen Metadaten über die Anfrage.',
    h2Response: 'Wichtige Antwort-Header',
    responseP1: 'Antwort-Header werden vom Server zurück an den Client gesendet und beschreiben den Inhalt.',
    h2Security: 'HTTP-Sicherheits-Header',
    securityP1: 'Sicherheits-Header schützen Ihre Nutzer vor XSS, Clickjacking und Man-in-the-Middle-Angriffen.',
    h2Cors: 'CORS: Cross-Origin Resource Sharing',
    corsP1: 'CORS erlaubt Servern zu spezifizieren, welche Ursprünge auf ihre Ressourcen zugreifen dürfen.',
    h2Caching: 'Caching-Header',
    cachingP1: 'Korrekte Caching-Header verbessern die Performance erheblich durch Wiederverwendung von Antworten.',
    h2Faq: 'Häufig gestellte Fragen',
    faq1Q: 'Was ist der Unterschied zwischen Authorization und Authentication?',
    faq1A: 'HTTP hat keinen dedizierten Authentication-Header. Anmeldeinformationen werden über den Authorization-Header übertragen.',
    faq2Q: 'Warum schlägt mein CORS-Preflight fehl?',
    faq2A: 'Preflight-OPTIONS-Anfragen schlagen fehl, wenn der Server nicht die richtigen Access-Control-Allow-*-Header zurückgibt.',
    faq3Q: 'Was ist der Content-Security-Policy-Header?',
    faq3A: 'CSP ist ein mächtiger Sicherheits-Header, der dem Browser mitteilt, welche Inhaltsquellen vertrauenswürdig sind.',
    faq4Q: 'Wie erzwinge ich HTTPS mit HTTP-Headern?',
    faq4A: 'Verwenden Sie den Strict-Transport-Security-Header (HSTS) mit max-age=31536000.',
    relatedTitle: 'Verwandte Tools',
  },
  it: {
    title: 'Guida completa agli header HTTP: richiesta, risposta, sicurezza e CORS',
    intro: 'Gli header HTTP sono la spina dorsale invisibile del web. Questa guida copre gli <strong>header di richiesta</strong>, gli <strong>header di risposta</strong>, gli header di sicurezza e la configurazione CORS.',
    h2Request: 'Header di richiesta essenziali',
    requestP1: 'Gli header di richiesta sono inviati dal client al server e trasportano metadati sulla richiesta.',
    h2Response: 'Header di risposta essenziali',
    responseP1: 'Gli header di risposta sono inviati dal server al client e descrivono il contenuto.',
    h2Security: 'Header di sicurezza HTTP',
    securityP1: 'Gli header di sicurezza proteggono gli utenti da XSS, clickjacking e attacchi man-in-the-middle.',
    h2Cors: 'CORS: Condivisione di risorse tra origini diverse',
    corsP1: 'CORS consente ai server di specificare quali origini possono accedere alle loro risorse.',
    h2Caching: 'Header di caching',
    cachingP1: 'Gli header di caching corretti migliorano notevolmente le prestazioni riutilizzando le risposte.',
    h2Faq: 'Domande frequenti',
    faq1Q: 'Qual è la differenza tra Authorization e Authentication?',
    faq1A: 'HTTP non ha un header di autenticazione dedicato. Le credenziali vengono inviate tramite l\'header Authorization.',
    faq2Q: 'Perché il mio preflight CORS fallisce?',
    faq2A: 'Le richieste OPTIONS di preflight falliscono quando il server non restituisce gli header Access-Control-Allow-* corretti.',
    faq3Q: 'Cos\'è l\'header Content-Security-Policy?',
    faq3A: 'CSP è un potente header di sicurezza che indica al browser quali fonti di contenuto sono attendibili.',
    faq4Q: 'Come faccio a forzare HTTPS con gli header HTTP?',
    faq4A: 'Usa l\'header Strict-Transport-Security (HSTS) con max-age=31536000.',
    relatedTitle: 'Strumenti correlati',
  },
  es: {
    title: 'Guia completa de cabeceras HTTP: solicitud, respuesta, seguridad y CORS',
    intro: 'Las cabeceras HTTP son la columna vertebral invisible de la web. Esta guia cubre las <strong>cabeceras de solicitud</strong>, las <strong>cabeceras de respuesta</strong>, las cabeceras de seguridad y la configuracion CORS.',
    h2Request: 'Cabeceras de solicitud esenciales',
    requestP1: 'Las cabeceras de solicitud son enviadas por el cliente al servidor y transportan metadatos sobre la solicitud.',
    h2Response: 'Cabeceras de respuesta esenciales',
    responseP1: 'Las cabeceras de respuesta son enviadas por el servidor al cliente y describen el contenido.',
    h2Security: 'Cabeceras de seguridad HTTP',
    securityP1: 'Las cabeceras de seguridad protegen a tus usuarios de XSS, clickjacking y ataques man-in-the-middle.',
    h2Cors: 'CORS: Intercambio de recursos de origen cruzado',
    corsP1: 'CORS permite a los servidores especificar que origenes pueden acceder a sus recursos.',
    h2Caching: 'Cabeceras de cache',
    cachingP1: 'Las cabeceras de cache correctas mejoran enormemente el rendimiento reutilizando las respuestas.',
    h2Faq: 'Preguntas frecuentes',
    faq1Q: 'Cual es la diferencia entre Authorization y Authentication?',
    faq1A: 'HTTP no tiene una cabecera de autenticacion dedicada. Las credenciales se envian a traves de la cabecera Authorization.',
    faq2Q: 'Por que falla mi preflight CORS?',
    faq2A: 'Las solicitudes OPTIONS de preflight fallan cuando el servidor no devuelve las cabeceras Access-Control-Allow-* correctas.',
    faq3Q: 'Que es la cabecera Content-Security-Policy?',
    faq3A: 'CSP es una potente cabecera de seguridad que indica al navegador que fuentes de contenido son de confianza.',
    faq4Q: 'Como fuerzo HTTPS con cabeceras HTTP?',
    faq4A: 'Usa la cabecera Strict-Transport-Security (HSTS) con max-age=31536000.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Guia completo de cabeçalhos HTTP: requisição, resposta, segurança e CORS',
    intro: 'Os cabeçalhos HTTP são a espinha dorsal invisível da web. Este guia cobre os <strong>cabeçalhos de requisição</strong>, <strong>cabeçalhos de resposta</strong>, cabeçalhos de segurança e configuração CORS.',
    h2Request: 'Cabeçalhos de requisição essenciais',
    requestP1: 'Os cabeçalhos de requisição são enviados pelo cliente ao servidor e transportam metadados sobre a requisição.',
    h2Response: 'Cabeçalhos de resposta essenciais',
    responseP1: 'Os cabeçalhos de resposta são enviados pelo servidor ao cliente e descrevem o conteúdo.',
    h2Security: 'Cabeçalhos de segurança HTTP',
    securityP1: 'Os cabeçalhos de segurança protegem os usuários contra XSS, clickjacking e ataques man-in-the-middle.',
    h2Cors: 'CORS: Compartilhamento de recursos entre origens',
    corsP1: 'CORS permite que os servidores especifiquem quais origens podem acessar seus recursos.',
    h2Caching: 'Cabeçalhos de cache',
    cachingP1: 'Cabeçalhos de cache corretos melhoram muito o desempenho reutilizando respostas.',
    h2Faq: 'Perguntas frequentes',
    faq1Q: 'Qual é a diferença entre Authorization e Authentication?',
    faq1A: 'HTTP não tem um cabeçalho de autenticação dedicado. As credenciais são enviadas via cabeçalho Authorization.',
    faq2Q: 'Por que meu preflight CORS falha?',
    faq2A: 'As requisições OPTIONS de preflight falham quando o servidor não retorna os cabeçalhos Access-Control-Allow-* corretos.',
    faq3Q: 'O que é o cabeçalho Content-Security-Policy?',
    faq3A: 'CSP é um poderoso cabeçalho de segurança que informa ao navegador quais fontes de conteúdo são confiáveis.',
    faq4Q: 'Como forço HTTPS com cabeçalhos HTTP?',
    faq4A: 'Use o cabeçalho Strict-Transport-Security (HSTS) com max-age=31536000.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'Volledige gids voor HTTP-headers: verzoek, antwoord, beveiliging en CORS',
    intro: 'HTTP-headers zijn de onzichtbare ruggengraat van het web. Deze gids behandelt <strong>verzoek-headers</strong>, <strong>antwoord-headers</strong>, beveiligingsheaders en CORS-configuratie.',
    h2Request: 'Essentiële verzoek-headers',
    requestP1: 'Verzoek-headers worden door de client naar de server gestuurd en bevatten metadata over het verzoek.',
    h2Response: 'Essentiële antwoord-headers',
    responseP1: 'Antwoord-headers worden door de server naar de client gestuurd en beschrijven de inhoud.',
    h2Security: 'HTTP-beveiligingsheaders',
    securityP1: 'Beveiligingsheaders beschermen uw gebruikers tegen XSS, clickjacking en man-in-the-middle-aanvallen.',
    h2Cors: 'CORS: Cross-Origin Resource Sharing',
    corsP1: 'CORS stelt servers in staat te specificeren welke origins toegang mogen hebben tot hun resources.',
    h2Caching: 'Cache-headers',
    cachingP1: 'Correcte cache-headers verbeteren de prestaties enorm door het hergebruiken van antwoorden.',
    h2Faq: 'Veelgestelde vragen',
    faq1Q: 'Wat is het verschil tussen Authorization en Authentication?',
    faq1A: 'HTTP heeft geen dedicated Authentication-header. Inloggegevens worden verzonden via de Authorization-header.',
    faq2Q: 'Waarom mislukt mijn CORS-preflight?',
    faq2A: 'OPTIONS-preflightverzoeken mislukken wanneer de server niet de juiste Access-Control-Allow-*-headers retourneert.',
    faq3Q: 'Wat is de Content-Security-Policy-header?',
    faq3A: 'CSP is een krachtige beveiligingsheader die de browser vertelt welke inhoudsbronnen vertrouwd zijn.',
    faq4Q: 'Hoe forceer ik HTTPS met HTTP-headers?',
    faq4A: 'Gebruik de Strict-Transport-Security-header (HSTS) met max-age=31536000.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Kompletny przewodnik po nagłówkach HTTP: żądania, odpowiedzi, bezpieczeństwo i CORS',
    intro: 'Nagłówki HTTP są niewidocznym kręgosłupem sieci web. Ten przewodnik omawia <strong>nagłówki żądań</strong>, <strong>nagłówki odpowiedzi</strong>, nagłówki bezpieczeństwa i konfigurację CORS.',
    h2Request: 'Podstawowe nagłówki żądań',
    requestP1: 'Nagłówki żądań są wysyłane przez klienta do serwera i zawierają metadane dotyczące żądania.',
    h2Response: 'Podstawowe nagłówki odpowiedzi',
    responseP1: 'Nagłówki odpowiedzi są wysyłane przez serwer do klienta i opisują zawartość.',
    h2Security: 'Nagłówki bezpieczeństwa HTTP',
    securityP1: 'Nagłówki bezpieczeństwa chronią użytkowników przed XSS, clickjackingiem i atakami man-in-the-middle.',
    h2Cors: 'CORS: Udostępnianie zasobów między źródłami',
    corsP1: 'CORS pozwala serwerom określić, które źródła mogą uzyskiwać dostęp do ich zasobów.',
    h2Caching: 'Nagłówki buforowania',
    cachingP1: 'Prawidłowe nagłówki buforowania znacznie poprawiają wydajność poprzez ponowne użycie odpowiedzi.',
    h2Faq: 'Często zadawane pytania',
    faq1Q: 'Jaka jest różnica między Authorization a Authentication?',
    faq1A: 'HTTP nie ma dedykowanego nagłówka Authentication. Poświadczenia są wysyłane za pomocą nagłówka Authorization.',
    faq2Q: 'Dlaczego mój preflight CORS nie powodzi się?',
    faq2A: 'Żądania OPTIONS preflightu nie powiodą się, gdy serwer nie zwróci prawidłowych nagłówków Access-Control-Allow-*.',
    faq3Q: 'Co to jest nagłówek Content-Security-Policy?',
    faq3A: 'CSP to potężny nagłówek bezpieczeństwa, który informuje przeglądarkę, którym źródłom treści należy ufać.',
    faq4Q: 'Jak wymusić HTTPS za pomocą nagłówków HTTP?',
    faq4A: 'Użyj nagłówka Strict-Transport-Security (HSTS) z max-age=31536000.',
    relatedTitle: 'Powiązane narzędzia',
  },
  sv: {
    title: 'Komplett guide till HTTP-headers: begäran, svar, säkerhet och CORS',
    intro: 'HTTP-headers är webbens osynliga ryggrad. Den här guiden täcker <strong>begäran-headers</strong>, <strong>svars-headers</strong>, säkerhetsheaders och CORS-konfiguration.',
    h2Request: 'Viktiga begäran-headers',
    requestP1: 'Begäran-headers skickas av klienten till servern och innehåller metadata om begäran.',
    h2Response: 'Viktiga svars-headers',
    responseP1: 'Svars-headers skickas av servern tillbaka till klienten och beskriver innehållet.',
    h2Security: 'HTTP-säkerhetsheaders',
    securityP1: 'Säkerhetsheaders skyddar dina användare mot XSS, clickjacking och man-in-the-middle-attacker.',
    h2Cors: 'CORS: Delning av resurser mellan ursprung',
    corsP1: 'CORS låter servrar specificera vilka ursprung som får tillgång till deras resurser.',
    h2Caching: 'Cache-headers',
    cachingP1: 'Korrekta cache-headers förbättrar prestandan avsevärt genom att återanvända svar.',
    h2Faq: 'Vanliga frågor',
    faq1Q: 'Vad är skillnaden mellan Authorization och Authentication?',
    faq1A: 'HTTP har ingen dedikerad Authentication-header. Inloggningsuppgifter skickas via Authorization-headern.',
    faq2Q: 'Varför misslyckas min CORS-preflight?',
    faq2A: 'OPTIONS-preflightbegäran misslyckas när servern inte returnerar rätt Access-Control-Allow-*-headers.',
    faq3Q: 'Vad är Content-Security-Policy-headern?',
    faq3A: 'CSP är en kraftfull säkerhetsheader som talar om för webbläsaren vilka innehållskällor som är betrodda.',
    faq4Q: 'Hur tvingar jag HTTPS med HTTP-headers?',
    faq4A: 'Använd Strict-Transport-Security-headern (HSTS) med max-age=31536000.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Komplett guide til HTTP-headers: forespørsel, svar, sikkerhet og CORS',
    intro: 'HTTP-headers er webbens usynlige ryggrad. Denne guiden dekker <strong>forespørsels-headers</strong>, <strong>svars-headers</strong>, sikkerhetsheaders og CORS-konfigurasjon.',
    h2Request: 'Viktige forespørsels-headers',
    requestP1: 'Forespørsels-headers sendes av klienten til serveren og inneholder metadata om forespørselen.',
    h2Response: 'Viktige svars-headers',
    responseP1: 'Svars-headers sendes av serveren tilbake til klienten og beskriver innholdet.',
    h2Security: 'HTTP-sikkerhetsheaders',
    securityP1: 'Sikkerhetsheaders beskytter brukerne dine mot XSS, clickjacking og man-in-the-middle-angrep.',
    h2Cors: 'CORS: Deling av ressurser på tvers av opprinnelse',
    corsP1: 'CORS lar servere spesifisere hvilke opprinnelser som har tilgang til ressursene deres.',
    h2Caching: 'Cache-headers',
    cachingP1: 'Riktige cache-headers forbedrer ytelsen betraktelig ved å gjenbruke svar.',
    h2Faq: 'Vanlige spørsmål',
    faq1Q: 'Hva er forskjellen mellom Authorization og Authentication?',
    faq1A: 'HTTP har ingen dedikert Authentication-header. Legitimasjon sendes via Authorization-headeren.',
    faq2Q: 'Hvorfor mislykkes CORS-preflighten min?',
    faq2A: 'OPTIONS-preflightforespørsler mislykkes når serveren ikke returnerer de riktige Access-Control-Allow-*-headerne.',
    faq3Q: 'Hva er Content-Security-Policy-headeren?',
    faq3A: 'CSP er en kraftig sikkerhetsheader som forteller nettleseren hvilke innholdskilder som er klarert.',
    faq4Q: 'Hvordan tvinger jeg HTTPS med HTTP-headers?',
    faq4A: 'Bruk Strict-Transport-Security-headeren (HSTS) med max-age=31536000.',
    relatedTitle: 'Relaterte verktøy',
  },
  zh: {
    title: 'HTTP 头部完整指南：请求头、响应头、安全头和 CORS',
    intro: 'HTTP 头部是 Web 的隐形骨架。本完整指南涵盖最重要的<strong>请求头</strong>、<strong>响应头</strong>、安全头和 CORS 配置。',
    h2Request: '基本请求头',
    requestP1: '请求头由客户端发送到服务器，携带关于请求和客户端能力的元数据。',
    h2Response: '基本响应头',
    responseP1: '响应头由服务器发回客户端，描述内容并建立缓存策略。',
    h2Security: 'HTTP 安全头',
    securityP1: '安全头保护用户免受 XSS、点击劫持和中间人攻击等多种攻击。',
    h2Cors: 'CORS：跨源资源共享',
    corsP1: 'CORS 允许服务器指定哪些源可以访问其资源。',
    h2Caching: '缓存头',
    cachingP1: '正确的缓存头通过让浏览器和 CDN 重用响应，显著提升性能。',
    h2Faq: '常见问题',
    faq1Q: 'Authorization 和 Authentication 头有什么区别？',
    faq1A: 'HTTP 没有专用的 Authentication 头。身份验证凭据通过 Authorization 头发送（如 Bearer token、Basic auth）。',
    faq2Q: '为什么我的 CORS 预检请求失败？',
    faq2A: '当服务器未返回正确的 Access-Control-Allow-* 响应头时，CORS 预检 OPTIONS 请求会失败。',
    faq3Q: '什么是 Content-Security-Policy 头？',
    faq3A: 'CSP 是一个强大的安全头，告诉浏览器哪些内容来源是可信的，防止 XSS 攻击。',
    faq4Q: '如何用 HTTP 头强制 HTTPS？',
    faq4A: '使用 Strict-Transport-Security (HSTS) 头：max-age=31536000; includeSubDomains。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'HTTPヘッダー完全ガイド：リクエスト、レスポンス、セキュリティ、CORS',
    intro: 'HTTPヘッダーはウェブの見えない背骨です。このガイドでは<strong>リクエストヘッダー</strong>、<strong>レスポンスヘッダー</strong>、セキュリティヘッダー、CORSの設定を解説します。',
    h2Request: '主要なリクエストヘッダー',
    requestP1: 'リクエストヘッダーはクライアントからサーバーに送信され、リクエストに関するメタデータを運びます。',
    h2Response: '主要なレスポンスヘッダー',
    responseP1: 'レスポンスヘッダーはサーバーからクライアントに返送され、コンテンツを説明します。',
    h2Security: 'HTTPセキュリティヘッダー',
    securityP1: 'セキュリティヘッダーはXSS、クリックジャッキング、MITM攻撃からユーザーを保護します。',
    h2Cors: 'CORS：クロスオリジンリソース共有',
    corsP1: 'CORSはサーバーがリソースへのアクセスを許可するオリジンを指定できるようにします。',
    h2Caching: 'キャッシュヘッダー',
    cachingP1: '適切なキャッシュヘッダーにより、ブラウザとCDNがレスポンスを再利用してパフォーマンスが大幅に向上します。',
    h2Faq: 'よくある質問',
    faq1Q: 'AuthorizationとAuthenticationヘッダーの違いは？',
    faq1A: 'HTTPには専用のAuthenticationヘッダーがありません。認証情報はAuthorizationヘッダーで送信されます。',
    faq2Q: 'CORSプリフライトが失敗する理由は？',
    faq2A: 'サーバーが正しいAccess-Control-Allow-*ヘッダーを返さない場合、OPTIONS プリフライトは失敗します。',
    faq3Q: 'Content-Security-Policyヘッダーとは？',
    faq3A: 'CSPはブラウザに信頼できるコンテンツソースを伝える強力なセキュリティヘッダーです。',
    faq4Q: 'HTTPヘッダーでHTTPSを強制するには？',
    faq4A: 'Strict-Transport-Security（HSTS）ヘッダーをmax-age=31536000で使用してください。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'HTTP 헤더 완전 가이드: 요청, 응답, 보안 및 CORS',
    intro: 'HTTP 헤더는 웹의 보이지 않는 뼈대입니다. 이 가이드는 <strong>요청 헤더</strong>, <strong>응답 헤더</strong>, 보안 헤더, CORS 설정을 다룹니다.',
    h2Request: '필수 요청 헤더',
    requestP1: '요청 헤더는 클라이언트에서 서버로 전송되며 요청에 대한 메타데이터를 전달합니다.',
    h2Response: '필수 응답 헤더',
    responseP1: '응답 헤더는 서버에서 클라이언트로 전송되며 콘텐츠를 설명합니다.',
    h2Security: 'HTTP 보안 헤더',
    securityP1: '보안 헤더는 XSS, 클릭재킹, 중간자 공격으로부터 사용자를 보호합니다.',
    h2Cors: 'CORS: 교차 출처 리소스 공유',
    corsP1: 'CORS는 서버가 리소스에 접근할 수 있는 출처를 지정할 수 있게 합니다.',
    h2Caching: '캐시 헤더',
    cachingP1: '올바른 캐시 헤더는 브라우저와 CDN이 응답을 재사용하여 성능을 크게 향상시킵니다.',
    h2Faq: '자주 묻는 질문',
    faq1Q: 'Authorization과 Authentication 헤더의 차이점은?',
    faq1A: 'HTTP에는 전용 Authentication 헤더가 없습니다. 자격 증명은 Authorization 헤더를 통해 전송됩니다.',
    faq2Q: 'CORS 프리플라이트가 실패하는 이유는?',
    faq2A: '서버가 올바른 Access-Control-Allow-* 응답 헤더를 반환하지 않으면 OPTIONS 프리플라이트가 실패합니다.',
    faq3Q: 'Content-Security-Policy 헤더란?',
    faq3A: 'CSP는 브라우저에 어떤 콘텐츠 소스가 신뢰할 수 있는지 알려주는 강력한 보안 헤더입니다.',
    faq4Q: 'HTTP 헤더로 HTTPS를 강제하는 방법은?',
    faq4A: 'Strict-Transport-Security(HSTS) 헤더를 max-age=31536000으로 사용하세요.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Panduan Lengkap HTTP Headers: Permintaan, Respons, Keamanan, dan CORS',
    intro: 'HTTP header adalah tulang punggung web yang tidak terlihat. Panduan ini mencakup <strong>header permintaan</strong>, <strong>header respons</strong>, header keamanan, dan konfigurasi CORS.',
    h2Request: 'Header Permintaan Penting',
    requestP1: 'Header permintaan dikirim oleh klien ke server dan membawa metadata tentang permintaan.',
    h2Response: 'Header Respons Penting',
    responseP1: 'Header respons dikirim oleh server ke klien dan mendeskripsikan konten.',
    h2Security: 'Header Keamanan HTTP',
    securityP1: 'Header keamanan melindungi pengguna dari XSS, clickjacking, dan serangan man-in-the-middle.',
    h2Cors: 'CORS: Cross-Origin Resource Sharing',
    corsP1: 'CORS memungkinkan server menentukan origin mana yang diizinkan mengakses sumber dayanya.',
    h2Caching: 'Header Cache',
    cachingP1: 'Header cache yang tepat meningkatkan performa secara dramatis dengan menggunakan kembali respons.',
    h2Faq: 'Pertanyaan yang Sering Diajukan',
    faq1Q: 'Apa perbedaan antara Authorization dan Authentication?',
    faq1A: 'HTTP tidak memiliki header Authentication khusus. Kredensial dikirim melalui header Authorization.',
    faq2Q: 'Mengapa preflight CORS saya gagal?',
    faq2A: 'Permintaan OPTIONS preflight gagal ketika server tidak mengembalikan header Access-Control-Allow-* yang benar.',
    faq3Q: 'Apa itu header Content-Security-Policy?',
    faq3A: 'CSP adalah header keamanan yang kuat yang memberi tahu browser sumber konten mana yang tepercaya.',
    faq4Q: 'Bagaimana cara memaksa HTTPS dengan header HTTP?',
    faq4A: 'Gunakan header Strict-Transport-Security (HSTS) dengan max-age=31536000.',
    relatedTitle: 'Alat Terkait',
  },
  th: {
    title: 'คู่มือครบถ้วนสำหรับ HTTP Headers: คำขอ การตอบสนอง ความปลอดภัย และ CORS',
    intro: 'HTTP headers คือกระดูกสันหลังที่มองไม่เห็นของเว็บ คู่มือนี้ครอบคลุม <strong>request headers</strong>, <strong>response headers</strong>, security headers และการตั้งค่า CORS',
    h2Request: 'Request Headers ที่สำคัญ',
    requestP1: 'Request headers ถูกส่งโดย client ไปยัง server และมีข้อมูล metadata เกี่ยวกับคำขอ',
    h2Response: 'Response Headers ที่สำคัญ',
    responseP1: 'Response headers ถูกส่งโดย server กลับไปยัง client และอธิบายเนื้อหา',
    h2Security: 'HTTP Security Headers',
    securityP1: 'Security headers ป้องกันผู้ใช้จาก XSS, clickjacking และการโจมตี man-in-the-middle',
    h2Cors: 'CORS: การแชร์ทรัพยากรข้ามต้นทาง',
    corsP1: 'CORS ช่วยให้ server ระบุว่า origin ใดได้รับอนุญาตให้เข้าถึงทรัพยากรของตน',
    h2Caching: 'Caching Headers',
    cachingP1: 'Caching headers ที่ถูกต้องช่วยเพิ่มประสิทธิภาพอย่างมากโดยการนำ response กลับมาใช้ใหม่',
    h2Faq: 'คำถามที่พบบ่อย',
    faq1Q: 'ความแตกต่างระหว่าง Authorization และ Authentication headers คืออะไร?',
    faq1A: 'HTTP ไม่มี Authentication header เฉพาะ ข้อมูลประจำตัวถูกส่งผ่าน Authorization header',
    faq2Q: 'ทำไม CORS preflight ของฉันถึงล้มเหลว?',
    faq2A: 'คำขอ OPTIONS preflight ล้มเหลวเมื่อ server ไม่ส่ง Access-Control-Allow-* headers ที่ถูกต้องกลับมา',
    faq3Q: 'Content-Security-Policy header คืออะไร?',
    faq3A: 'CSP เป็น security header ที่ทรงพลังที่บอก browser ว่าแหล่งเนื้อหาใดน่าเชื่อถือ',
    faq4Q: 'จะบังคับใช้ HTTPS ด้วย HTTP headers ได้อย่างไร?',
    faq4A: 'ใช้ Strict-Transport-Security (HSTS) header ด้วย max-age=31536000',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const requestHeadersCode = `// Common HTTP Request Headers

GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Content-Type: application/json
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
Cache-Control: no-cache
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d"
If-Modified-Since: Thu, 01 Jan 2026 00:00:00 GMT
Origin: https://myapp.com
Referer: https://myapp.com/dashboard
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000

// Setting headers with fetch API
const response = await fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Accept': 'application/json',
    'X-Request-ID': crypto.randomUUID(),
  },
});`;

const securityHeadersCode = `// Essential Security Headers for Express.js
import express from 'express';

const app = express();

app.use((req, res, next) =\u003e {
  // Prevent XSS attacks
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Force HTTPS for 1 year (include subdomains)
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'nonce-{RANDOM}' https://cdn.example.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://api.example.com",
      "frame-ancestors 'none'",
    ].join('; ')
  );

  // Control referrer information
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Control browser features
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self)'
  );

  next();
});`;

const corsCode = `// CORS Configuration — Express.js

import cors from 'cors';

// Simple CORS for public API
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Strict CORS for production
const allowedOrigins = [
  'https://myapp.com',
  'https://www.myapp.com',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) =\u003e {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(\`CORS: Origin \${origin} not allowed\`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  exposedHeaders: ['X-Total-Count', 'X-RateLimit-Remaining'],
  credentials: true,       // Allow cookies
  maxAge: 86400,           // Cache preflight for 24 hours
}));

// Manual preflight handling
app.options('*', cors()); // Enable pre-flight across all routes`;

const cachingCode = `// HTTP Caching Headers

// 1. Cache-Control directives
Cache-Control: no-store          // Never cache (sensitive data)
Cache-Control: no-cache          // Revalidate before using cache
Cache-Control: private           // Browser cache only (not CDN)
Cache-Control: public, max-age=31536000  // Cache for 1 year (immutable assets)
Cache-Control: public, max-age=3600, stale-while-revalidate=60

// 2. ETag for conditional requests (server generates a hash of the content)
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d"
// Client sends back on subsequent requests:
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d"
// Server responds 304 Not Modified if unchanged

// 3. Last-Modified
Last-Modified: Thu, 23 Feb 2026 10:00:00 GMT
If-Modified-Since: Thu, 23 Feb 2026 10:00:00 GMT

// Setting cache headers in Next.js
export async function GET() {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=60',
      'ETag': \`"\${hash(data)}"\`,
    },
  });
}

// Strategy by asset type:
// HTML pages:     Cache-Control: no-cache (always revalidate)
// CSS/JS bundles: Cache-Control: public, max-age=31536000, immutable
// API responses:  Cache-Control: private, no-cache
// Images:         Cache-Control: public, max-age=86400`;

export default function HttpHeadersGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2Request}</h2>
      <p>{s.requestP1}</p>
      <pre><code className="language-http">{requestHeadersCode}</code></pre>

      <h2>{s.h2Security}</h2>
      <p>{s.securityP1}</p>
      <pre><code className="language-typescript">{securityHeadersCode}</code></pre>

      <h2>{s.h2Cors}</h2>
      <p>{s.corsP1}</p>
      <pre><code className="language-typescript">{corsCode}</code></pre>

      <h2>{s.h2Caching}</h2>
      <p>{s.cachingP1}</p>
      <pre><code className="language-http">{cachingCode}</code></pre>

      <h2>{s.h2Faq}</h2>
      <h3>{s.faq1Q}</h3>
      <p>{s.faq1A}</p>
      <h3>{s.faq2Q}</h3>
      <p>{s.faq2A}</p>
      <h3>{s.faq3Q}</h3>
      <p>{s.faq3A}</p>
      <h3>{s.faq4Q}</h3>
      <p>{s.faq4A}</p>

      <h2>{s.relatedTitle}</h2>
      <ul>
        <li><Link href={`/${lang}/tools/http-status`}>HTTP Status Code Reference</Link></li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link></li>
        <li><Link href={`/${lang}/tools/url-parser`}>URL Parser</Link></li>
        <li><Link href={`/${lang}/tools/jwt-decoder`}>JWT Decoder</Link></li>
        <li><Link href={`/${lang}/blog/api-authentication-oauth-jwt-apikey`}>API Authentication Guide</Link></li>
      </ul>
    </>
  );
}
