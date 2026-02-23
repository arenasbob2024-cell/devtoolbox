'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HTTP Headers Guide',
    description: 'Complete reference for common HTTP request and response headers with examples, usage notes, and search.',
    searchPlaceholder: 'Search headers...',
    typeRequest: 'Request', typeResponse: 'Response', typeBoth: 'Both',
    allTypes: 'All', showAll: 'Show All',
    colHeader: 'Header', colType: 'Type', colDescription: 'Description', colExample: 'Example',
    introTitle: 'HTTP Headers Complete Reference',
    introText: 'HTTP headers carry metadata between clients and servers in requests and responses. This guide covers the most common headers including authentication, caching, content negotiation, CORS, security, and more. Use the search box to quickly find a specific header and copy examples with one click.',
    tipTitle: 'HTTP Headers Tips',
    tip1: 'Content-Type must match the actual body format to avoid parsing errors',
    tip2: 'Always include Cache-Control headers to control caching behavior',
    tip3: 'Authorization header should use Bearer tokens for modern APIs',
    tip4: 'CORS headers are needed for browser cross-origin requests',
    tip5: 'Security headers like CSP and HSTS should be set on all production sites',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What are HTTP headers?',
    faq1a: 'HTTP headers are key-value pairs sent in HTTP requests and responses that carry metadata about the request or response. They convey information such as the content type, authentication credentials, caching instructions, security policies, and more. Headers are not visible in the browser by default but can be seen in developer tools.',
    faq2q: 'What is the difference between request and response headers?',
    faq2a: 'Request headers are sent by the client (browser) to the server with information about the client, the request, and the client\'s preferences. Response headers are sent by the server back to the client with information about the server\'s response, such as content type, caching instructions, and security policies. Some headers like Content-Type can appear in both.',
    faq3q: 'What is CORS and which headers control it?',
    faq3a: 'CORS (Cross-Origin Resource Sharing) is a security mechanism that controls how web pages can request resources from a different domain. The main CORS headers are Access-Control-Allow-Origin (which origins are allowed), Access-Control-Allow-Methods (which HTTP methods are allowed), Access-Control-Allow-Headers (which request headers are allowed), and Access-Control-Max-Age (how long the preflight response can be cached).',
    faq4q: 'How do caching headers work?',
    faq4a: 'Caching headers control how long browsers and proxies can cache a response. Cache-Control is the primary header, with directives like max-age (seconds to cache), no-cache (validate with server before using cache), no-store (never cache), and public/private (whether shared caches can store the response). ETag and Last-Modified enable conditional requests to check if content has changed.',
    faq5q: 'What are security headers and why are they important?',
    faq5a: 'Security headers protect websites from common attacks. Strict-Transport-Security (HSTS) forces HTTPS connections. Content-Security-Policy (CSP) prevents XSS and injection attacks. X-Frame-Options prevents clickjacking. X-Content-Type-Options prevents MIME type sniffing. Referrer-Policy controls what referrer information is sent. These should be configured on all production web applications.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'HTTP 请求头指南', description: '常见 HTTP 请求和响应头的完整参考，包含示例和使用说明。',
    searchPlaceholder: '搜索请求头...', typeRequest: '请求', typeResponse: '响应', typeBoth: '两者',
    allTypes: '全部', showAll: '显示全部',
    colHeader: '请求头', colType: '类型', colDescription: '说明', colExample: '示例',
    introTitle: 'HTTP 请求头完整参考', introText: 'HTTP 请求头在客户端和服务器之间的请求和响应中传递元数据。',
    tipTitle: 'HTTP 请求头提示', tip1: 'Content-Type 必须与实际正文格式匹配', tip2: '始终包含 Cache-Control 头控制缓存行为',
    tip3: '现代 API 应使用 Bearer 令牌授权', tip4: '跨域请求需要 CORS 头', tip5: '生产站点应设置 CSP 和 HSTS 安全头',
    faqTitle: '常见问题', faq1q: '什么是 HTTP 请求头？', faq1a: 'HTTP 请求头是 HTTP 请求和响应中发送的键值对，携带关于请求或响应的元数据。',
    faq2q: '请求头和响应头有何区别？', faq2a: '请求头由客户端发送，响应头由服务器发送。某些头（如 Content-Type）两者都可以出现。',
    faq3q: '什么是 CORS？', faq3a: 'CORS 是控制网页如何从不同域请求资源的安全机制。主要头包括 Access-Control-Allow-Origin 等。',
    faq4q: '缓存头如何工作？', faq4a: 'Cache-Control 是主要的缓存头，指令包括 max-age、no-cache、no-store 等。',
    faq5q: '什么是安全头？', faq5a: 'HSTS 强制 HTTPS，CSP 防止 XSS，X-Frame-Options 防止点击劫持等。',
    relatedTitle: '相关工具',
  },
  fr: { title: 'Guide des En-tetes HTTP', description: 'Reference complete pour les en-tetes HTTP courants.',
    searchPlaceholder: 'Rechercher en-tetes...', typeRequest: 'Requete', typeResponse: 'Reponse', typeBoth: 'Les deux',
    allTypes: 'Tous', showAll: 'Tout afficher',
    colHeader: 'En-tete', colType: 'Type', colDescription: 'Description', colExample: 'Exemple',
    introTitle: 'Reference complete des en-tetes HTTP', introText: 'Les en-tetes HTTP transportent des metadonnees entre clients et serveurs.',
    tipTitle: 'Conseils en-tetes HTTP', tip1: 'Content-Type doit correspondre au format du corps', tip2: 'Inclure toujours Cache-Control',
    tip3: 'Utiliser Bearer tokens pour les API modernes', tip4: 'Les en-tetes CORS sont necessaires pour les requetes cross-origin', tip5: 'CSP et HSTS doivent etre definis sur tous les sites',
    faqTitle: 'Questions frequentes', faq1q: 'Que sont les en-tetes HTTP?', faq1a: 'Les en-tetes HTTP sont des paires cle-valeur transportant des metadonnees dans les requetes et reponses HTTP.',
    faq2q: 'Difference entre en-tetes de requete et de reponse?', faq2a: 'Les en-tetes de requete sont envoyes par le client, les en-tetes de reponse par le serveur.',
    faq3q: 'Qu\'est-ce que CORS?', faq3a: 'Mecanisme de securite controlant l\'acces aux ressources entre domaines differents.',
    faq4q: 'Comment fonctionnent les en-tetes de cache?', faq4a: 'Cache-Control avec des directives comme max-age, no-cache, no-store.',
    faq5q: 'Que sont les en-tetes de securite?', faq5a: 'HSTS, CSP, X-Frame-Options pour proteger contre les attaques.',
    relatedTitle: 'Outils connexes' },
  de: { title: 'HTTP-Header-Leitfaden', description: 'Umfassende Referenz fuer gaengige HTTP-Header.',
    searchPlaceholder: 'Header suchen...', typeRequest: 'Anfrage', typeResponse: 'Antwort', typeBoth: 'Beide',
    allTypes: 'Alle', showAll: 'Alle anzeigen',
    colHeader: 'Header', colType: 'Typ', colDescription: 'Beschreibung', colExample: 'Beispiel',
    introTitle: 'Vollstaendige HTTP-Header-Referenz', introText: 'HTTP-Header uebertragen Metadaten zwischen Clients und Servern.',
    tipTitle: 'HTTP-Header Tipps', tip1: 'Content-Type muss dem tatsaechlichen Format entsprechen', tip2: 'Cache-Control immer einschliessen',
    tip3: 'Bearer-Tokens fuer moderne APIs verwenden', tip4: 'CORS-Header fuer Cross-Origin-Anfragen benoetigt', tip5: 'CSP und HSTS auf allen Produktionsseiten setzen',
    faqTitle: 'Haeufig gestellte Fragen', faq1q: 'Was sind HTTP-Header?', faq1a: 'HTTP-Header sind Schluessel-Wert-Paare, die Metadaten in HTTP-Anfragen und -Antworten transportieren.',
    faq2q: 'Unterschied zwischen Anfrage- und Antwort-Headern?', faq2a: 'Anfrage-Header werden vom Client gesendet, Antwort-Header vom Server.',
    faq3q: 'Was ist CORS?', faq3a: 'Sicherheitsmechanismus zur Kontrolle des ressourcenuebergreifenden Zugriffs zwischen verschiedenen Domaenen.',
    faq4q: 'Wie funktionieren Cache-Header?', faq4a: 'Cache-Control mit Direktiven wie max-age, no-cache, no-store.',
    faq5q: 'Was sind Sicherheits-Header?', faq5a: 'HSTS, CSP, X-Frame-Options zum Schutz vor Angriffen.',
    relatedTitle: 'Verwandte Tools' },
  es: { title: 'Guia de Cabeceras HTTP', description: 'Referencia completa para cabeceras HTTP comunes.',
    searchPlaceholder: 'Buscar cabeceras...', typeRequest: 'Solicitud', typeResponse: 'Respuesta', typeBoth: 'Ambas',
    allTypes: 'Todas', showAll: 'Mostrar todo',
    colHeader: 'Cabecera', colType: 'Tipo', colDescription: 'Descripcion', colExample: 'Ejemplo',
    introTitle: 'Referencia completa de cabeceras HTTP', introText: 'Las cabeceras HTTP transportan metadatos entre clientes y servidores.',
    tipTitle: 'Consejos cabeceras HTTP', tip1: 'Content-Type debe coincidir con el formato del cuerpo', tip2: 'Incluir siempre Cache-Control',
    tip3: 'Usar Bearer tokens para APIs modernas', tip4: 'Cabeceras CORS necesarias para solicitudes cross-origin', tip5: 'CSP y HSTS en todos los sitios de produccion',
    faqTitle: 'Preguntas frecuentes', faq1q: 'Que son las cabeceras HTTP?', faq1a: 'Pares clave-valor que transportan metadatos en solicitudes y respuestas HTTP.',
    faq2q: 'Diferencia entre cabeceras de solicitud y respuesta?', faq2a: 'Las de solicitud las envia el cliente, las de respuesta el servidor.',
    faq3q: 'Que es CORS?', faq3a: 'Mecanismo de seguridad que controla el acceso cross-origin a recursos.',
    faq4q: 'Como funcionan las cabeceras de cache?', faq4a: 'Cache-Control con directivas como max-age, no-cache, no-store.',
    faq5q: 'Que son las cabeceras de seguridad?', faq5a: 'HSTS, CSP, X-Frame-Options para proteger contra ataques.',
    relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'Guia de Cabecalhos HTTP', description: 'Referencia completa para cabecalhos HTTP comuns.',
    searchPlaceholder: 'Pesquisar cabecalhos...', typeRequest: 'Requisicao', typeResponse: 'Resposta', typeBoth: 'Ambos',
    allTypes: 'Todos', showAll: 'Mostrar tudo',
    colHeader: 'Cabecalho', colType: 'Tipo', colDescription: 'Descricao', colExample: 'Exemplo',
    introTitle: 'Referencia completa de cabecalhos HTTP', introText: 'Os cabecalhos HTTP transportam metadados entre clientes e servidores.',
    tipTitle: 'Dicas cabecalhos HTTP', tip1: 'Content-Type deve corresponder ao formato do corpo', tip2: 'Sempre incluir Cache-Control',
    tip3: 'Usar Bearer tokens para APIs modernas', tip4: 'Cabecalhos CORS necessarios para requisicoes cross-origin', tip5: 'CSP e HSTS em todos os sites de producao',
    faqTitle: 'Perguntas frequentes', faq1q: 'O que sao cabecalhos HTTP?', faq1a: 'Pares chave-valor que transportam metadados em requisicoes e respostas HTTP.',
    faq2q: 'Diferenca entre cabecalhos de requisicao e resposta?', faq2a: 'Os de requisicao sao enviados pelo cliente, os de resposta pelo servidor.',
    faq3q: 'O que e CORS?', faq3a: 'Mecanismo de seguranca que controla o acesso cross-origin a recursos.',
    faq4q: 'Como funcionam os cabecalhos de cache?', faq4a: 'Cache-Control com diretivas como max-age, no-cache, no-store.',
    faq5q: 'O que sao cabecalhos de seguranca?', faq5a: 'HSTS, CSP, X-Frame-Options para proteger contra ataques.',
    relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'Guida agli Header HTTP', description: 'Riferimento completo per gli header HTTP comuni.',
    searchPlaceholder: 'Cerca header...', typeRequest: 'Richiesta', typeResponse: 'Risposta', typeBoth: 'Entrambi',
    allTypes: 'Tutti', showAll: 'Mostra tutti',
    colHeader: 'Header', colType: 'Tipo', colDescription: 'Descrizione', colExample: 'Esempio',
    introTitle: 'Riferimento completo degli header HTTP', introText: 'Gli header HTTP trasportano metadati tra client e server.',
    tipTitle: 'Suggerimenti header HTTP', tip1: 'Content-Type deve corrispondere al formato del corpo', tip2: 'Includere sempre Cache-Control',
    tip3: 'Usare Bearer token per le API moderne', tip4: 'Header CORS necessari per richieste cross-origin', tip5: 'CSP e HSTS su tutti i siti di produzione',
    faqTitle: 'Domande frequenti', faq1q: 'Cosa sono gli header HTTP?', faq1a: 'Coppie chiave-valore che trasportano metadati nelle richieste e risposte HTTP.',
    faq2q: 'Differenza tra header di richiesta e risposta?', faq2a: 'Gli header di richiesta sono inviati dal client, quelli di risposta dal server.',
    faq3q: 'Cos\'e CORS?', faq3a: 'Meccanismo di sicurezza che controlla l\'accesso cross-origin alle risorse.',
    faq4q: 'Come funzionano gli header di cache?', faq4a: 'Cache-Control con direttive come max-age, no-cache, no-store.',
    faq5q: 'Cosa sono gli header di sicurezza?', faq5a: 'HSTS, CSP, X-Frame-Options per proteggere dagli attacchi.',
    relatedTitle: 'Strumenti correlati' },
  nl: { title: 'HTTP Headers Gids', description: 'Volledige referentie voor veelgebruikte HTTP-headers.',
    searchPlaceholder: 'Headers zoeken...', typeRequest: 'Verzoek', typeResponse: 'Antwoord', typeBoth: 'Beide',
    allTypes: 'Alle', showAll: 'Alles tonen',
    colHeader: 'Header', colType: 'Type', colDescription: 'Beschrijving', colExample: 'Voorbeeld',
    introTitle: 'Volledige HTTP headers referentie', introText: 'HTTP-headers transporteren metadata tussen clients en servers.',
    tipTitle: 'HTTP headers tips', tip1: 'Content-Type moet overeenkomen met het werkelijke formaat', tip2: 'Altijd Cache-Control opnemen',
    tip3: 'Bearer tokens gebruiken voor moderne API\'s', tip4: 'CORS-headers nodig voor cross-origin verzoeken', tip5: 'CSP en HSTS op alle productiesites',
    faqTitle: 'Veelgestelde vragen', faq1q: 'Wat zijn HTTP-headers?', faq1a: 'Sleutel-waardeparen die metadata transporteren in HTTP-verzoeken en -antwoorden.',
    faq2q: 'Verschil tussen verzoek- en antwoordheaders?', faq2a: 'Verzoekheaders worden door de client verzonden, antwoordheaders door de server.',
    faq3q: 'Wat is CORS?', faq3a: 'Beveiligingsmechanisme dat cross-origin toegang tot resources beheert.',
    faq4q: 'Hoe werken cache-headers?', faq4a: 'Cache-Control met richtlijnen zoals max-age, no-cache, no-store.',
    faq5q: 'Wat zijn beveiligingsheaders?', faq5a: 'HSTS, CSP, X-Frame-Options ter bescherming tegen aanvallen.',
    relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Przewodnik po Naglowkach HTTP', description: 'Pelna dokumentacja dla typowych naglowkow HTTP.',
    searchPlaceholder: 'Szukaj naglowkow...', typeRequest: 'Zadanie', typeResponse: 'Odpowiedz', typeBoth: 'Oba',
    allTypes: 'Wszystkie', showAll: 'Pokaz wszystko',
    colHeader: 'Naglowek', colType: 'Typ', colDescription: 'Opis', colExample: 'Przyklad',
    introTitle: 'Pelna dokumentacja naglowkow HTTP', introText: 'Naglowki HTTP przesylaja metadane miedzy klientami a serwerami.',
    tipTitle: 'Wskazowki naglowkow HTTP', tip1: 'Content-Type musi odpowiadac formatowi treści', tip2: 'Zawsze uwzgledniaj Cache-Control',
    tip3: 'Uzyj tokenow Bearer dla nowoczesnych API', tip4: 'Naglowki CORS potrzebne dla zapytan cross-origin', tip5: 'CSP i HSTS na wszystkich witrynach produkcyjnych',
    faqTitle: 'Czesto zadawane pytania', faq1q: 'Co to sa naglowki HTTP?', faq1a: 'Pary klucz-wartosc transportujace metadane w zadaniach i odpowiedziach HTTP.',
    faq2q: 'Roznica miedzy naglowkami zadania a odpowiedzi?', faq2a: 'Naglowki zadania wysylane przez klienta, odpowiedzi przez serwer.',
    faq3q: 'Co to jest CORS?', faq3a: 'Mechanizm bezpieczenstwa kontrolujacy dostep cross-origin do zasobow.',
    faq4q: 'Jak dzialaja naglowki pamieci podrecznej?', faq4a: 'Cache-Control z dyrektywami jak max-age, no-cache, no-store.',
    faq5q: 'Czym sa naglowki bezpieczenstwa?', faq5a: 'HSTS, CSP, X-Frame-Options do ochrony przed atakami.',
    relatedTitle: 'Powiazane narzedzia' },
  sv: { title: 'Guide till HTTP-Headers', description: 'Komplett referens for vanliga HTTP-headers.',
    searchPlaceholder: 'Sok headers...', typeRequest: 'Begaran', typeResponse: 'Svar', typeBoth: 'Baada',
    allTypes: 'Alla', showAll: 'Visa alla',
    colHeader: 'Header', colType: 'Typ', colDescription: 'Beskrivning', colExample: 'Exempel',
    introTitle: 'Komplett HTTP-headers referens', introText: 'HTTP-headers transporterar metadata mellan klienter och servrar.',
    tipTitle: 'HTTP-headers tips', tip1: 'Content-Type maste matcha det faktiska formatet', tip2: 'Inkludera alltid Cache-Control',
    tip3: 'Anvand Bearer-tokens for moderna API:er', tip4: 'CORS-headers kravs for cross-origin-begaeran', tip5: 'CSP och HSTS pa alla produktionssajter',
    faqTitle: 'Vanliga fragor', faq1q: 'Vad aer HTTP-headers?', faq1a: 'Nyckel-vaerdepar som transporterar metadata i HTTP-begaeran och -svar.',
    faq2q: 'Skillnad mellan begaer- och svarsheaders?', faq2a: 'Begaeranheaders skickas av klienten, svarsheaders av servern.',
    faq3q: 'Vad aer CORS?', faq3a: 'Saekerhetsmekanisme som kontrollerar cross-origin-atkomst till resurser.',
    faq4q: 'Hur fungerar cache-headers?', faq4a: 'Cache-Control med direktiv som max-age, no-cache, no-store.',
    faq5q: 'Vad aer saekerhetsheaders?', faq5a: 'HSTS, CSP, X-Frame-Options for skydd mot attacker.',
    relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Guide til HTTP-Headers', description: 'Komplett referanse for vanlige HTTP-headers.',
    searchPlaceholder: 'Sok headers...', typeRequest: 'Forespoesel', typeResponse: 'Svar', typeBoth: 'Begge',
    allTypes: 'Alle', showAll: 'Vis alle',
    colHeader: 'Header', colType: 'Type', colDescription: 'Beskrivelse', colExample: 'Eksempel',
    introTitle: 'Komplett HTTP-headers referanse', introText: 'HTTP-headers transporterer metadata mellom klienter og servere.',
    tipTitle: 'HTTP-headers tips', tip1: 'Content-Type ma stemme overens med det faktiske formatet', tip2: 'Alltid inkludere Cache-Control',
    tip3: 'Bruk Bearer-tokens for moderne API-er', tip4: 'CORS-headers krevs for cross-origin-forespoersler', tip5: 'CSP og HSTS pa alle produksjonssider',
    faqTitle: 'Vanlige spoersmaal', faq1q: 'Hva er HTTP-headers?', faq1a: 'Nokkel-verdipar som transporterer metadata i HTTP-forespoersler og -svar.',
    faq2q: 'Forskjell mellom forespoersels- og svarsheaders?', faq2a: 'Forespoerselheaders sendes av klienten, svarsheaders av serveren.',
    faq3q: 'Hva er CORS?', faq3a: 'Sikkerhetsmekanisme som kontrollerer cross-origin-tilgang til ressurser.',
    faq4q: 'Hvordan fungerer cache-headers?', faq4a: 'Cache-Control med direktiver som max-age, no-cache, no-store.',
    faq5q: 'Hva er sikkerhetsheaders?', faq5a: 'HSTS, CSP, X-Frame-Options for beskyttelse mot angrep.',
    relatedTitle: 'Relaterte verktoy' },
  ja: { title: 'HTTP ヘッダーガイド', description: 'よく使われる HTTP ヘッダーの完全なリファレンス。',
    searchPlaceholder: 'ヘッダーを検索...', typeRequest: 'リクエスト', typeResponse: 'レスポンス', typeBoth: '両方',
    allTypes: 'すべて', showAll: 'すべて表示',
    colHeader: 'ヘッダー', colType: 'タイプ', colDescription: '説明', colExample: '例',
    introTitle: 'HTTP ヘッダー完全リファレンス', introText: 'HTTP ヘッダーはクライアントとサーバー間でメタデータを転送します。',
    tipTitle: 'HTTP ヘッダーのヒント', tip1: 'Content-Type は実際の形式と一致する必要があります', tip2: '常に Cache-Control を含める',
    tip3: 'モダン API には Bearer トークンを使用', tip4: 'クロスオリジンリクエストには CORS ヘッダーが必要', tip5: '本番サイトに CSP と HSTS を設定',
    faqTitle: 'よくある質問', faq1q: 'HTTP ヘッダーとは？', faq1a: 'HTTP リクエストとレスポンスでメタデータを運ぶキーと値のペアです。',
    faq2q: 'リクエストヘッダーとレスポンスヘッダーの違い？', faq2a: 'リクエストヘッダーはクライアントが送信し、レスポンスヘッダーはサーバーが送信します。',
    faq3q: 'CORS とは？', faq3a: 'クロスオリジンリソース共有を制御するセキュリティメカニズムです。',
    faq4q: 'キャッシュヘッダーはどう機能しますか？', faq4a: 'Cache-Control に max-age、no-cache、no-store などのディレクティブがあります。',
    faq5q: 'セキュリティヘッダーとは？', faq5a: 'HSTS、CSP、X-Frame-Options が攻撃から保護します。',
    relatedTitle: '関連ツール' },
  ko: { title: 'HTTP 헤더 가이드', description: '일반적인 HTTP 헤더에 대한 완전한 참조.',
    searchPlaceholder: '헤더 검색...', typeRequest: '요청', typeResponse: '응답', typeBoth: '모두',
    allTypes: '전체', showAll: '모두 보기',
    colHeader: '헤더', colType: '유형', colDescription: '설명', colExample: '예시',
    introTitle: 'HTTP 헤더 완전 참조', introText: 'HTTP 헤더는 클라이언트와 서버 사이에서 메타데이터를 전송합니다.',
    tipTitle: 'HTTP 헤더 팁', tip1: 'Content-Type은 실제 형식과 일치해야 함', tip2: '항상 Cache-Control 포함',
    tip3: '현대 API에 Bearer 토큰 사용', tip4: '크로스 오리진 요청에 CORS 헤더 필요', tip5: '프로덕션 사이트에 CSP 및 HSTS 설정',
    faqTitle: '자주 묻는 질문', faq1q: 'HTTP 헤더란?', faq1a: 'HTTP 요청과 응답에서 메타데이터를 전달하는 키-값 쌍입니다.',
    faq2q: '요청 헤더와 응답 헤더의 차이?', faq2a: '요청 헤더는 클라이언트가 보내고 응답 헤더는 서버가 보냅니다.',
    faq3q: 'CORS란?', faq3a: '크로스 오리진 리소스 공유를 제어하는 보안 메커니즘입니다.',
    faq4q: '캐시 헤더는 어떻게 작동하나요?', faq4a: 'Cache-Control에 max-age, no-cache, no-store 등의 지시어가 있습니다.',
    faq5q: '보안 헤더란?', faq5a: 'HSTS, CSP, X-Frame-Options이 공격으로부터 보호합니다.',
    relatedTitle: '관련 도구' },
  id: { title: 'Panduan Header HTTP', description: 'Referensi lengkap untuk header HTTP umum.',
    searchPlaceholder: 'Cari header...', typeRequest: 'Permintaan', typeResponse: 'Respons', typeBoth: 'Keduanya',
    allTypes: 'Semua', showAll: 'Tampilkan semua',
    colHeader: 'Header', colType: 'Jenis', colDescription: 'Deskripsi', colExample: 'Contoh',
    introTitle: 'Referensi lengkap HTTP headers', introText: 'Header HTTP membawa metadata antara klien dan server.',
    tipTitle: 'Tips header HTTP', tip1: 'Content-Type harus sesuai dengan format tubuh yang sebenarnya', tip2: 'Selalu sertakan Cache-Control',
    tip3: 'Gunakan Bearer token untuk API modern', tip4: 'Header CORS diperlukan untuk permintaan cross-origin', tip5: 'CSP dan HSTS pada semua situs produksi',
    faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Apa itu header HTTP?', faq1a: 'Pasangan kunci-nilai yang membawa metadata dalam permintaan dan respons HTTP.',
    faq2q: 'Perbedaan antara header permintaan dan respons?', faq2a: 'Header permintaan dikirim oleh klien, header respons oleh server.',
    faq3q: 'Apa itu CORS?', faq3a: 'Mekanisme keamanan yang mengontrol akses lintas asal ke sumber daya.',
    faq4q: 'Bagaimana header cache bekerja?', faq4a: 'Cache-Control dengan direktif seperti max-age, no-cache, no-store.',
    faq5q: 'Apa itu header keamanan?', faq5a: 'HSTS, CSP, X-Frame-Options untuk perlindungan dari serangan.',
    relatedTitle: 'Alat terkait' },
  th: { title: 'คู่มือ HTTP Headers', description: 'อ้างอิงสมบูรณ์สำหรับ HTTP headers ทั่วไป',
    searchPlaceholder: 'ค้นหา headers...', typeRequest: 'คำขอ', typeResponse: 'การตอบสนอง', typeBoth: 'ทั้งสอง',
    allTypes: 'ทั้งหมด', showAll: 'แสดงทั้งหมด',
    colHeader: 'Header', colType: 'ประเภท', colDescription: 'คำอธิบาย', colExample: 'ตัวอย่าง',
    introTitle: 'อ้างอิงสมบูรณ์ของ HTTP headers', introText: 'HTTP headers ส่งเมทาดาต้าระหว่างไคลเอนต์และเซิร์ฟเวอร์',
    tipTitle: 'เคล็ดลับ HTTP headers', tip1: 'Content-Type ต้องตรงกับรูปแบบเนื้อหาจริง', tip2: 'รวม Cache-Control เสมอ',
    tip3: 'ใช้ Bearer tokens สำหรับ API สมัยใหม่', tip4: 'ต้องใช้ CORS headers สำหรับคำขอ cross-origin', tip5: 'ตั้ง CSP และ HSTS บนไซต์ production ทั้งหมด',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'HTTP headers คืออะไร?', faq1a: 'คู่คีย์-ค่าที่ส่งเมทาดาต้าในคำขอและการตอบสนอง HTTP',
    faq2q: 'ความแตกต่างระหว่าง request headers และ response headers?', faq2a: 'Request headers ส่งโดยไคลเอนต์ Response headers ส่งโดยเซิร์ฟเวอร์',
    faq3q: 'CORS คืออะไร?', faq3a: 'กลไกความปลอดภัยที่ควบคุมการเข้าถึงทรัพยากร cross-origin',
    faq4q: 'Cache headers ทำงานอย่างไร?', faq4a: 'Cache-Control พร้อม directives เช่น max-age, no-cache, no-store',
    faq5q: 'Security headers คืออะไร?', faq5a: 'HSTS, CSP, X-Frame-Options ป้องกันการโจมตี',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

interface HttpHeader {
  name: string;
  type: 'request' | 'response' | 'both';
  category: string;
  description: string;
  example: string;
}

const HTTP_HEADERS: HttpHeader[] = [
  { name: 'Content-Type', type: 'both', category: 'Content', description: 'Indicates the media type of the resource or data in the message body.', example: 'Content-Type: application/json; charset=utf-8' },
  { name: 'Content-Length', type: 'both', category: 'Content', description: 'The size of the message body in bytes.', example: 'Content-Length: 348' },
  { name: 'Content-Encoding', type: 'both', category: 'Content', description: 'The encoding applied to the message body (e.g., gzip, br).', example: 'Content-Encoding: gzip' },
  { name: 'Content-Language', type: 'both', category: 'Content', description: 'Describes the natural language(s) of the intended audience for the enclosed content.', example: 'Content-Language: en-US' },
  { name: 'Accept', type: 'request', category: 'Negotiation', description: 'Informs the server about the types of data that the client can process.', example: 'Accept: text/html, application/json' },
  { name: 'Accept-Encoding', type: 'request', category: 'Negotiation', description: 'Indicates the content-coding the client can understand.', example: 'Accept-Encoding: gzip, deflate, br' },
  { name: 'Accept-Language', type: 'request', category: 'Negotiation', description: 'Indicates the natural language and locale the client prefers.', example: 'Accept-Language: en-US, en;q=0.9' },
  { name: 'Authorization', type: 'request', category: 'Auth', description: 'Contains credentials to authenticate a user agent with a server.', example: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...' },
  { name: 'WWW-Authenticate', type: 'response', category: 'Auth', description: 'Defines the authentication method that should be used to access a resource.', example: 'WWW-Authenticate: Bearer realm="api"' },
  { name: 'Cookie', type: 'request', category: 'Cookies', description: 'Contains stored HTTP cookies previously sent by the server.', example: 'Cookie: session=abc123; theme=dark' },
  { name: 'Set-Cookie', type: 'response', category: 'Cookies', description: 'Sends cookies from the server to the user agent.', example: 'Set-Cookie: session=xyz789; Path=/; HttpOnly; Secure; SameSite=Strict' },
  { name: 'Cache-Control', type: 'both', category: 'Caching', description: 'Directives for caching mechanisms in both requests and responses.', example: 'Cache-Control: max-age=3600, must-revalidate' },
  { name: 'ETag', type: 'response', category: 'Caching', description: 'Identifier for a specific version of a resource for conditional requests.', example: 'ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"' },
  { name: 'If-None-Match', type: 'request', category: 'Caching', description: 'Makes the request conditional to avoid re-downloading unchanged resources.', example: 'If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"' },
  { name: 'Last-Modified', type: 'response', category: 'Caching', description: 'The date/time at which the server believes the resource was last modified.', example: 'Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT' },
  { name: 'Expires', type: 'response', category: 'Caching', description: 'The date/time after which the response is considered expired (deprecated, use Cache-Control).', example: 'Expires: Thu, 01 Dec 2023 16:00:00 GMT' },
  { name: 'Access-Control-Allow-Origin', type: 'response', category: 'CORS', description: 'Indicates whether the response can be shared with resources from the given origin.', example: 'Access-Control-Allow-Origin: https://example.com' },
  { name: 'Access-Control-Allow-Methods', type: 'response', category: 'CORS', description: 'Specifies the HTTP methods allowed when accessing the resource in a cross-origin request.', example: 'Access-Control-Allow-Methods: GET, POST, PUT, DELETE' },
  { name: 'Access-Control-Allow-Headers', type: 'response', category: 'CORS', description: 'Specifies HTTP headers allowed in a cross-origin request.', example: 'Access-Control-Allow-Headers: Content-Type, Authorization' },
  { name: 'Access-Control-Max-Age', type: 'response', category: 'CORS', description: 'How long a preflight request response can be cached.', example: 'Access-Control-Max-Age: 86400' },
  { name: 'Origin', type: 'request', category: 'CORS', description: 'Initiates a CORS or Fetch request, indicating where the request originates from.', example: 'Origin: https://example.com' },
  { name: 'Strict-Transport-Security', type: 'response', category: 'Security', description: 'Enforces the use of HTTPS (HSTS). Tells browsers to only connect via HTTPS.', example: 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload' },
  { name: 'Content-Security-Policy', type: 'response', category: 'Security', description: 'Controls resources the browser can load, helping prevent XSS attacks.', example: 'Content-Security-Policy: default-src \'self\'; script-src \'self\' cdn.example.com' },
  { name: 'X-Frame-Options', type: 'response', category: 'Security', description: 'Indicates whether a browser can render a page in a frame. Prevents clickjacking.', example: 'X-Frame-Options: DENY' },
  { name: 'X-Content-Type-Options', type: 'response', category: 'Security', description: 'Prevents MIME type sniffing by browsers.', example: 'X-Content-Type-Options: nosniff' },
  { name: 'Referrer-Policy', type: 'response', category: 'Security', description: 'Controls how much referrer information is sent in requests.', example: 'Referrer-Policy: strict-origin-when-cross-origin' },
  { name: 'Permissions-Policy', type: 'response', category: 'Security', description: 'Controls which browser features and APIs can be used in the browser.', example: 'Permissions-Policy: camera=(), microphone=(), geolocation=()' },
  { name: 'Host', type: 'request', category: 'Connection', description: 'Specifies the host and port number of the server to which the request is sent. Required in HTTP/1.1.', example: 'Host: www.example.com:8080' },
  { name: 'User-Agent', type: 'request', category: 'Connection', description: 'Contains a characteristic string that allows network protocol peers to identify the application, OS, and vendor.', example: 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  { name: 'Referer', type: 'request', category: 'Connection', description: 'Contains the address from which the request originated (note: historically misspelled).', example: 'Referer: https://example.com/page' },
  { name: 'Location', type: 'response', category: 'Redirect', description: 'URL to redirect the client to. Used with 3xx redirect status codes.', example: 'Location: https://www.example.com/new-url' },
  { name: 'Server', type: 'response', category: 'Info', description: 'Contains information about the software used by the origin server to handle the request.', example: 'Server: nginx/1.25.0' },
  { name: 'X-Request-ID', type: 'both', category: 'Tracing', description: 'A unique identifier for a request for distributed tracing and debugging.', example: 'X-Request-ID: f58f6a8c-1234-4567-89ab-cdef01234567' },
  { name: 'Vary', type: 'response', category: 'Caching', description: 'Determines which request headers influence the response for caching purposes.', example: 'Vary: Accept-Encoding, Accept-Language' },
  { name: 'Transfer-Encoding', type: 'both', category: 'Content', description: 'Specifies the form of encoding used to safely transfer the payload body.', example: 'Transfer-Encoding: chunked' },
];

export default function HttpHeadersGuide() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'request' | 'response' | 'both'>('all');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return HTTP_HEADERS.filter(h => {
      const matchSearch = search === '' ||
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.description.toLowerCase().includes(search.toLowerCase()) ||
        h.example.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'all' || h.type === typeFilter || (typeFilter === 'both' && h.type === 'both');
      return matchSearch && matchType;
    });
  }, [search, typeFilter]);

  const categories = useMemo(() => {
    const cats = new Set(filtered.map(h => h.category));
    return Array.from(cats);
  }, [filtered]);

  const typeColor = (type: string) => {
    if (type === 'request') return '#3b82f6';
    if (type === 'response') return '#22c55e';
    return '#f59e0b';
  };

  const typeLabel = (type: string) => {
    if (type === 'request') return t.typeRequest;
    if (type === 'response') return t.typeResponse;
    return t.typeBoth;
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="http-headers-guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.searchPlaceholder} style={{ flex: 1, minWidth: 200, fontSize: 13 }} />
        {(['all', 'request', 'response', 'both'] as const).map(type => (
          <button key={type} onClick={() => setTypeFilter(type)}
            className={typeFilter === type ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ fontSize: 12, padding: '6px 12px' }}>
            {type === 'all' ? t.allTypes : typeLabel(type)}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
        {filtered.length} headers
      </div>

      {categories.map(cat => {
        const catHeaders = filtered.filter(h => h.category === cat);
        const isExpanded = expandedCategory === cat || search !== '' || typeFilter !== 'all';
        return (
          <div key={cat} style={{ marginBottom: 12, border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
            <button
              onClick={() => setExpandedCategory(isExpanded && expandedCategory === cat ? null : cat)}
              style={{ width: '100%', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-input)', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', textAlign: 'left' }}>
              <span>{cat} <span style={{ fontWeight: 400, color: 'var(--text-secondary)', fontSize: 12 }}>({catHeaders.length})</span></span>
              <span style={{ color: 'var(--text-secondary)' }}>{(isExpanded && (expandedCategory === cat || search !== '' || typeFilter !== 'all')) ? '▲' : '▼'}</span>
            </button>
            {(isExpanded && (expandedCategory === cat || search !== '' || typeFilter !== 'all')) && (
              <div>
                {catHeaders.map(header => (
                  <div key={header.name} style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, gap: 12 }}>
                      <code style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-blue)', fontFamily: 'monospace' }}>{header.name}</code>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, background: `${typeColor(header.type)}22`, color: typeColor(header.type), fontWeight: 600 }}>
                          {typeLabel(header.type)}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 8px', lineHeight: 1.6 }}>{header.description}</p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <code style={{ fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '6px 10px', flex: 1, fontFamily: 'monospace', color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                        {header.example}
                      </code>
                      <CopyButton text={header.example} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/http-status`, label: 'HTTP Status Codes' },
            { href: `/${lang}/tools/ip-subnet-calculator`, label: 'IP Subnet Calculator' },
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
            { href: `/${lang}/tools/mime-types`, label: 'MIME Types Reference' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
