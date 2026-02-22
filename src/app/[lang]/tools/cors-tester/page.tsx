'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CORS Tester',
    description: 'Test CORS (Cross-Origin Resource Sharing) headers for any URL. Check Access-Control-Allow-Origin, methods, headers, and credentials support.',
    urlLabel: 'URL to Test',
    urlPlaceholder: 'https://api.example.com/endpoint',
    originLabel: 'Origin Header',
    originPlaceholder: 'https://yourdomain.com',
    methodLabel: 'Request Method',
    test: 'Test CORS',
    preflight: 'Send Preflight (OPTIONS)',
    clear: 'Clear',
    resultsLabel: 'CORS Headers',
    copyLabel: 'Copy Results',
    statusLabel: 'Response Status',
    corsAllowed: 'CORS Allowed',
    corsBlocked: 'CORS Blocked or No Headers',
    introTitle: 'Free Online CORS Tester',
    introText: 'Enter a URL and an origin to test CORS (Cross-Origin Resource Sharing) headers. This tool sends an actual HTTP request from your browser to check if the target server allows cross-origin requests from the specified origin.',
    howTitle: 'How to Test CORS Headers',
    step1: 'Enter the URL you want to test',
    step2: 'Set the Origin header (the domain making the request)',
    step3: 'Choose the HTTP method for the test',
    step4: 'Click "Test CORS" or "Send Preflight" to check headers',
    featuresTitle: 'Features',
    feature1: 'Test any URL for CORS header support',
    feature2: 'Send preflight OPTIONS requests',
    feature3: 'View Access-Control-Allow-Origin, Methods, Headers',
    feature4: 'Check credentials and max-age support',
    feature5: 'Real browser-based CORS testing',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is CORS?',
    faq1a: 'CORS (Cross-Origin Resource Sharing) is a security mechanism that allows a web page from one domain to request resources from another domain. Servers must include specific HTTP headers to allow cross-origin requests.',
    faq2q: 'What is a preflight request?',
    faq2a: 'A preflight request is an OPTIONS request sent by the browser before certain cross-origin requests. It checks whether the actual request is safe to send by verifying the allowed methods, headers, and origin.',
    faq3q: 'What does Access-Control-Allow-Origin mean?',
    faq3a: 'This header specifies which origins are allowed to access the resource. It can be a specific origin (e.g., https://example.com) or a wildcard (*) to allow any origin.',
    faq4q: 'Why is my CORS request blocked?',
    faq4a: 'CORS requests are blocked when the server does not include the proper Access-Control-Allow-Origin header matching your origin, or when required methods/headers are not allowed in the preflight response.',
    faq5q: 'Can I test CORS from the browser?',
    faq5a: 'Yes. This tool sends requests directly from your browser, so it accurately reflects how your browser would handle CORS for the given URL and origin combination.',
    relatedTitle: 'Related Tools',
    errorEmpty: 'Please enter a URL to test.',
    errorFetch: 'Request failed. The server may not support CORS or is unreachable.',
    loading: 'Testing CORS...',
    noHeaders: 'No CORS headers found in the response.',
    header: 'Header',
    value: 'Value',
  },
  zh: {
    title: 'CORS 测试工具',
    description: '测试任意 URL 的 CORS（跨域资源共享）头信息。检查 Access-Control-Allow-Origin、方法、头信息和凭据支持。',
    urlLabel: '测试 URL',
    urlPlaceholder: 'https://api.example.com/endpoint',
    originLabel: 'Origin 头',
    originPlaceholder: 'https://yourdomain.com',
    methodLabel: '请求方法',
    test: '测试 CORS',
    preflight: '发送预检请求 (OPTIONS)',
    clear: '清除',
    resultsLabel: 'CORS 头信息',
    copyLabel: '复制结果',
    statusLabel: '响应状态',
    corsAllowed: 'CORS 已允许',
    corsBlocked: 'CORS 被阻止或无头信息',
    introTitle: '免费在线 CORS 测试工具',
    introText: '输入 URL 和源站来测试 CORS 头信息。此工具从浏览器发送实际 HTTP 请求，检查目标服务器是否允许指定源站的跨域请求。',
    howTitle: '如何测试 CORS 头信息',
    step1: '输入要测试的 URL',
    step2: '设置 Origin 头（发起请求的域名）',
    step3: '选择测试的 HTTP 方法',
    step4: '点击"测试 CORS"或"发送预检请求"检查头信息',
    featuresTitle: '功能特性',
    feature1: '测试任意 URL 的 CORS 头信息',
    feature2: '发送预检 OPTIONS 请求',
    feature3: '查看 Access-Control-Allow-Origin、方法、头信息',
    feature4: '检查凭据和 max-age 支持',
    feature5: '基于真实浏览器的 CORS 测试',
    faqTitle: '常见问题',
    faq1q: '什么是 CORS？',
    faq1a: 'CORS（跨域资源共享）是一种安全机制，允许一个域的网页请求另一个域的资源。服务器必须包含特定的 HTTP 头才能允许跨域请求。',
    faq2q: '什么是预检请求？',
    faq2a: '预检请求是浏览器在某些跨域请求之前发送的 OPTIONS 请求。它通过验证允许的方法、头信息和源站来检查实际请求是否安全。',
    faq3q: 'Access-Control-Allow-Origin 是什么意思？',
    faq3a: '此头信息指定哪些源站被允许访问资源。可以是特定源站或通配符 (*) 允许任何源站。',
    faq4q: '为什么我的 CORS 请求被阻止？',
    faq4a: '当服务器未包含与您源站匹配的 Access-Control-Allow-Origin 头，或预检响应中不允许所需方法/头时，CORS 请求会被阻止。',
    faq5q: '可以从浏览器测试 CORS 吗？',
    faq5a: '可以。此工具直接从浏览器发送请求，准确反映浏览器如何处理给定 URL 和源站组合的 CORS。',
    relatedTitle: '相关工具',
    errorEmpty: '请输入要测试的 URL。',
    errorFetch: '请求失败。服务器可能不支持 CORS 或无法访问。',
    loading: '正在测试 CORS...',
    noHeaders: '响应中未找到 CORS 头信息。',
    header: '头信息',
    value: '值',
  },
  ja: {
    title: 'CORS テスター',
    description: '任意のURLのCORS（クロスオリジンリソースシェアリング）ヘッダーをテストします。',
    urlLabel: 'テストURL',
    urlPlaceholder: 'https://api.example.com/endpoint',
    originLabel: 'Originヘッダー',
    originPlaceholder: 'https://yourdomain.com',
    methodLabel: 'リクエストメソッド',
    test: 'CORSテスト',
    preflight: 'プリフライト送信 (OPTIONS)',
    clear: 'クリア',
    resultsLabel: 'CORSヘッダー',
    copyLabel: '結果をコピー',
    statusLabel: 'レスポンスステータス',
    corsAllowed: 'CORS許可',
    corsBlocked: 'CORSブロックまたはヘッダーなし',
    introTitle: '無料オンラインCORSテスター',
    introText: 'URLとオリジンを入力してCORSヘッダーをテストします。このツールはブラウザから実際のHTTPリクエストを送信します。',
    howTitle: 'CORSヘッダーのテスト方法',
    step1: 'テストするURLを入力',
    step2: 'Originヘッダーを設定',
    step3: 'HTTPメソッドを選択',
    step4: '「CORSテスト」をクリック',
    featuresTitle: '機能',
    feature1: '任意のURLのCORSヘッダーをテスト',
    feature2: 'プリフライトOPTIONSリクエスト送信',
    feature3: 'Access-Control-Allow-Origin等を確認',
    feature4: '資格情報とmax-ageサポートを確認',
    feature5: 'ブラウザベースのCORSテスト',
    faqTitle: 'よくある質問',
    faq1q: 'CORSとは何ですか？',
    faq1a: 'CORSはあるドメインのWebページが別のドメインのリソースにアクセスすることを許可するセキュリティメカニズムです。',
    faq2q: 'プリフライトリクエストとは？',
    faq2a: 'プリフライトリクエストは特定のクロスオリジンリクエストの前にブラウザが送信するOPTIONSリクエストです。',
    faq3q: 'Access-Control-Allow-Originとは？',
    faq3a: 'このヘッダーはリソースへのアクセスが許可されるオリジンを指定します。',
    faq4q: 'CORSリクエストがブロックされる理由は？',
    faq4a: 'サーバーが適切なAccess-Control-Allow-Originヘッダーを含めていない場合にブロックされます。',
    faq5q: 'ブラウザからCORSをテストできますか？',
    faq5a: 'はい。このツールはブラウザから直接リクエストを送信し、CORSの動作を正確に反映します。',
    relatedTitle: '関連ツール',
    errorEmpty: 'URLを入力してください。',
    errorFetch: 'リクエストが失敗しました。',
    loading: 'CORSテスト中...',
    noHeaders: 'CORSヘッダーが見つかりませんでした。',
    header: 'ヘッダー',
    value: '値',
  },
  ko: {
    title: 'CORS 테스터',
    description: '모든 URL의 CORS 헤더를 테스트합니다. Access-Control-Allow-Origin, 메서드, 헤더 및 자격 증명 지원을 확인합니다.',
    urlLabel: '테스트 URL',
    urlPlaceholder: 'https://api.example.com/endpoint',
    originLabel: 'Origin 헤더',
    originPlaceholder: 'https://yourdomain.com',
    methodLabel: '요청 메서드',
    test: 'CORS 테스트',
    preflight: '프리플라이트 전송 (OPTIONS)',
    clear: '지우기',
    resultsLabel: 'CORS 헤더',
    copyLabel: '결과 복사',
    statusLabel: '응답 상태',
    corsAllowed: 'CORS 허용됨',
    corsBlocked: 'CORS 차단됨 또는 헤더 없음',
    introTitle: '무료 온라인 CORS 테스터',
    introText: 'URL과 오리진을 입력하여 CORS 헤더를 테스트합니다.',
    howTitle: 'CORS 헤더 테스트 방법',
    step1: '테스트할 URL 입력',
    step2: 'Origin 헤더 설정',
    step3: 'HTTP 메서드 선택',
    step4: '"CORS 테스트"를 클릭',
    featuresTitle: '기능',
    feature1: '모든 URL의 CORS 헤더 테스트',
    feature2: '프리플라이트 OPTIONS 요청 전송',
    feature3: 'Access-Control-Allow-Origin 등 확인',
    feature4: '자격 증명 및 max-age 지원 확인',
    feature5: '브라우저 기반 CORS 테스트',
    faqTitle: '자주 묻는 질문',
    faq1q: 'CORS란 무엇인가요?',
    faq1a: 'CORS는 한 도메인의 웹 페이지가 다른 도메인의 리소스에 접근할 수 있도록 하는 보안 메커니즘입니다.',
    faq2q: '프리플라이트 요청이란?',
    faq2a: '프리플라이트 요청은 특정 교차 출처 요청 전에 브라우저가 보내는 OPTIONS 요청입니다.',
    faq3q: 'Access-Control-Allow-Origin이란?',
    faq3a: '이 헤더는 리소스에 접근이 허용된 출처를 지정합니다.',
    faq4q: 'CORS 요청이 차단되는 이유는?',
    faq4a: '서버가 적절한 Access-Control-Allow-Origin 헤더를 포함하지 않으면 차단됩니다.',
    faq5q: '브라우저에서 CORS를 테스트할 수 있나요?',
    faq5a: '네. 이 도구는 브라우저에서 직접 요청을 보내 CORS 동작을 정확히 반영합니다.',
    relatedTitle: '관련 도구',
    errorEmpty: 'URL을 입력하세요.',
    errorFetch: '요청이 실패했습니다.',
    loading: 'CORS 테스트 중...',
    noHeaders: 'CORS 헤더를 찾을 수 없습니다.',
    header: '헤더',
    value: '값',
  },
  fr: {
    title: 'Testeur CORS',
    description: 'Testez les en-tetes CORS pour n\'importe quelle URL. Verifiez Access-Control-Allow-Origin, methodes et en-tetes.',
    urlLabel: 'URL a tester',
    urlPlaceholder: 'https://api.example.com/endpoint',
    originLabel: 'En-tete Origin',
    originPlaceholder: 'https://yourdomain.com',
    methodLabel: 'Methode de requete',
    test: 'Tester CORS',
    preflight: 'Envoyer preflight (OPTIONS)',
    clear: 'Effacer',
    resultsLabel: 'En-tetes CORS',
    copyLabel: 'Copier resultats',
    statusLabel: 'Statut reponse',
    corsAllowed: 'CORS autorise',
    corsBlocked: 'CORS bloque ou pas d\'en-tetes',
    introTitle: 'Testeur CORS en ligne gratuit',
    introText: 'Entrez une URL et un origin pour tester les en-tetes CORS directement depuis votre navigateur.',
    howTitle: 'Comment tester les en-tetes CORS',
    step1: 'Entrez l\'URL a tester',
    step2: 'Definissez l\'en-tete Origin',
    step3: 'Choisissez la methode HTTP',
    step4: 'Cliquez sur "Tester CORS"',
    featuresTitle: 'Fonctionnalites',
    feature1: 'Testez n\'importe quelle URL pour CORS',
    feature2: 'Envoi de requetes preflight OPTIONS',
    feature3: 'Visualisez Access-Control-Allow-Origin',
    feature4: 'Verifiez le support des credentials',
    feature5: 'Test CORS base sur le navigateur',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que CORS ?',
    faq1a: 'CORS est un mecanisme de securite qui permet a une page web d\'un domaine d\'acceder aux ressources d\'un autre domaine.',
    faq2q: 'Qu\'est-ce qu\'une requete preflight ?',
    faq2a: 'C\'est une requete OPTIONS envoyee par le navigateur avant certaines requetes cross-origin.',
    faq3q: 'Que signifie Access-Control-Allow-Origin ?',
    faq3a: 'Cet en-tete specifie quelles origines sont autorisees a acceder a la ressource.',
    faq4q: 'Pourquoi ma requete CORS est-elle bloquee ?',
    faq4a: 'Les requetes sont bloquees quand le serveur n\'inclut pas l\'en-tete Access-Control-Allow-Origin.',
    faq5q: 'Puis-je tester CORS depuis le navigateur ?',
    faq5a: 'Oui. Cet outil envoie des requetes directement depuis votre navigateur.',
    relatedTitle: 'Outils connexes',
    errorEmpty: 'Veuillez entrer une URL.',
    errorFetch: 'La requete a echoue.',
    loading: 'Test CORS en cours...',
    noHeaders: 'Aucun en-tete CORS trouve.',
    header: 'En-tete',
    value: 'Valeur',
  },
  de: {
    title: 'CORS-Tester',
    description: 'Testen Sie CORS-Header fuer jede URL. Pruefen Sie Access-Control-Allow-Origin, Methoden und Header.',
    urlLabel: 'Zu testende URL',
    urlPlaceholder: 'https://api.example.com/endpoint',
    originLabel: 'Origin-Header',
    originPlaceholder: 'https://yourdomain.com',
    methodLabel: 'Anfragemethode',
    test: 'CORS testen',
    preflight: 'Preflight senden (OPTIONS)',
    clear: 'Leeren',
    resultsLabel: 'CORS-Header',
    copyLabel: 'Ergebnisse kopieren',
    statusLabel: 'Antwortstatus',
    corsAllowed: 'CORS erlaubt',
    corsBlocked: 'CORS blockiert oder keine Header',
    introTitle: 'Kostenloser Online CORS-Tester',
    introText: 'Geben Sie eine URL und einen Origin ein, um CORS-Header direkt aus Ihrem Browser zu testen.',
    howTitle: 'So testen Sie CORS-Header',
    step1: 'Geben Sie die zu testende URL ein',
    step2: 'Setzen Sie den Origin-Header',
    step3: 'Waehlen Sie die HTTP-Methode',
    step4: 'Klicken Sie auf "CORS testen"',
    featuresTitle: 'Funktionen',
    feature1: 'Testen Sie jede URL auf CORS-Header',
    feature2: 'Senden Sie Preflight-OPTIONS-Anfragen',
    feature3: 'Zeigen Sie Access-Control-Allow-Origin an',
    feature4: 'Pruefen Sie Credentials-Unterstuetzung',
    feature5: 'Browserbasierter CORS-Test',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist CORS?',
    faq1a: 'CORS ist ein Sicherheitsmechanismus, der einer Webseite erlaubt, Ressourcen von einer anderen Domain anzufordern.',
    faq2q: 'Was ist eine Preflight-Anfrage?',
    faq2a: 'Eine Preflight-Anfrage ist eine OPTIONS-Anfrage, die der Browser vor bestimmten Cross-Origin-Anfragen sendet.',
    faq3q: 'Was bedeutet Access-Control-Allow-Origin?',
    faq3a: 'Dieser Header gibt an, welche Origins auf die Ressource zugreifen duerfen.',
    faq4q: 'Warum wird meine CORS-Anfrage blockiert?',
    faq4a: 'Anfragen werden blockiert, wenn der Server den Access-Control-Allow-Origin Header nicht einschliesst.',
    faq5q: 'Kann ich CORS im Browser testen?',
    faq5a: 'Ja. Dieses Tool sendet Anfragen direkt aus Ihrem Browser.',
    relatedTitle: 'Verwandte Tools',
    errorEmpty: 'Bitte geben Sie eine URL ein.',
    errorFetch: 'Anfrage fehlgeschlagen.',
    loading: 'CORS wird getestet...',
    noHeaders: 'Keine CORS-Header gefunden.',
    header: 'Header',
    value: 'Wert',
  },
  es: {
    title: 'Probador CORS',
    description: 'Pruebe las cabeceras CORS para cualquier URL. Verifique Access-Control-Allow-Origin, metodos y cabeceras.',
    urlLabel: 'URL a probar',
    urlPlaceholder: 'https://api.example.com/endpoint',
    originLabel: 'Cabecera Origin',
    originPlaceholder: 'https://yourdomain.com',
    methodLabel: 'Metodo de solicitud',
    test: 'Probar CORS',
    preflight: 'Enviar preflight (OPTIONS)',
    clear: 'Limpiar',
    resultsLabel: 'Cabeceras CORS',
    copyLabel: 'Copiar resultados',
    statusLabel: 'Estado de respuesta',
    corsAllowed: 'CORS permitido',
    corsBlocked: 'CORS bloqueado o sin cabeceras',
    introTitle: 'Probador CORS en linea gratuito',
    introText: 'Ingrese una URL y un origen para probar las cabeceras CORS directamente desde su navegador.',
    howTitle: 'Como probar cabeceras CORS',
    step1: 'Ingrese la URL a probar',
    step2: 'Configure la cabecera Origin',
    step3: 'Elija el metodo HTTP',
    step4: 'Haga clic en "Probar CORS"',
    featuresTitle: 'Caracteristicas',
    feature1: 'Pruebe cualquier URL para CORS',
    feature2: 'Envie solicitudes preflight OPTIONS',
    feature3: 'Vea Access-Control-Allow-Origin',
    feature4: 'Verifique soporte de credenciales',
    feature5: 'Prueba CORS basada en navegador',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es CORS?',
    faq1a: 'CORS es un mecanismo de seguridad que permite a una pagina web solicitar recursos de otro dominio.',
    faq2q: 'Que es una solicitud preflight?',
    faq2a: 'Es una solicitud OPTIONS enviada por el navegador antes de ciertas solicitudes cross-origin.',
    faq3q: 'Que significa Access-Control-Allow-Origin?',
    faq3a: 'Esta cabecera especifica que origenes pueden acceder al recurso.',
    faq4q: 'Por que se bloquea mi solicitud CORS?',
    faq4a: 'Se bloquean cuando el servidor no incluye la cabecera Access-Control-Allow-Origin.',
    faq5q: 'Puedo probar CORS desde el navegador?',
    faq5a: 'Si. Esta herramienta envia solicitudes directamente desde su navegador.',
    relatedTitle: 'Herramientas relacionadas',
    errorEmpty: 'Ingrese una URL.',
    errorFetch: 'La solicitud fallo.',
    loading: 'Probando CORS...',
    noHeaders: 'No se encontraron cabeceras CORS.',
    header: 'Cabecera',
    value: 'Valor',
  },
  pt: {
    title: 'Testador CORS',
    description: 'Teste cabecalhos CORS para qualquer URL. Verifique Access-Control-Allow-Origin, metodos e cabecalhos.',
    urlLabel: 'URL para testar', urlPlaceholder: 'https://api.example.com/endpoint', originLabel: 'Cabecalho Origin', originPlaceholder: 'https://yourdomain.com', methodLabel: 'Metodo de requisicao', test: 'Testar CORS', preflight: 'Enviar preflight (OPTIONS)', clear: 'Limpar', resultsLabel: 'Cabecalhos CORS', copyLabel: 'Copiar resultados', statusLabel: 'Status da resposta', corsAllowed: 'CORS permitido', corsBlocked: 'CORS bloqueado ou sem cabecalhos',
    introTitle: 'Testador CORS Online Gratuito', introText: 'Insira uma URL e um origin para testar cabecalhos CORS diretamente do seu navegador.',
    howTitle: 'Como testar cabecalhos CORS', step1: 'Insira a URL para testar', step2: 'Defina o cabecalho Origin', step3: 'Escolha o metodo HTTP', step4: 'Clique em "Testar CORS"',
    featuresTitle: 'Recursos', feature1: 'Teste qualquer URL para CORS', feature2: 'Envie requisicoes preflight OPTIONS', feature3: 'Veja Access-Control-Allow-Origin', feature4: 'Verifique suporte a credenciais', feature5: 'Teste CORS baseado em navegador',
    faqTitle: 'Perguntas frequentes', faq1q: 'O que e CORS?', faq1a: 'CORS e um mecanismo de seguranca que permite que uma pagina web solicite recursos de outro dominio.', faq2q: 'O que e uma requisicao preflight?', faq2a: 'E uma requisicao OPTIONS enviada pelo navegador antes de certas requisicoes cross-origin.', faq3q: 'O que significa Access-Control-Allow-Origin?', faq3a: 'Este cabecalho especifica quais origens podem acessar o recurso.', faq4q: 'Por que minha requisicao CORS e bloqueada?', faq4a: 'Sao bloqueadas quando o servidor nao inclui o cabecalho Access-Control-Allow-Origin.', faq5q: 'Posso testar CORS no navegador?', faq5a: 'Sim. Esta ferramenta envia requisicoes diretamente do seu navegador.',
    relatedTitle: 'Ferramentas relacionadas', errorEmpty: 'Insira uma URL.', errorFetch: 'A requisicao falhou.', loading: 'Testando CORS...', noHeaders: 'Nenhum cabecalho CORS encontrado.', header: 'Cabecalho', value: 'Valor',
  },
  it: {
    title: 'Tester CORS',
    description: 'Testa le intestazioni CORS per qualsiasi URL. Verifica Access-Control-Allow-Origin, metodi e intestazioni.',
    urlLabel: 'URL da testare', urlPlaceholder: 'https://api.example.com/endpoint', originLabel: 'Intestazione Origin', originPlaceholder: 'https://yourdomain.com', methodLabel: 'Metodo di richiesta', test: 'Testa CORS', preflight: 'Invia preflight (OPTIONS)', clear: 'Cancella', resultsLabel: 'Intestazioni CORS', copyLabel: 'Copia risultati', statusLabel: 'Stato risposta', corsAllowed: 'CORS consentito', corsBlocked: 'CORS bloccato o nessuna intestazione',
    introTitle: 'Tester CORS Online Gratuito', introText: 'Inserisci un URL e un origin per testare le intestazioni CORS direttamente dal browser.',
    howTitle: 'Come testare le intestazioni CORS', step1: 'Inserisci l\'URL da testare', step2: 'Imposta l\'intestazione Origin', step3: 'Scegli il metodo HTTP', step4: 'Clicca su "Testa CORS"',
    featuresTitle: 'Funzionalita', feature1: 'Testa qualsiasi URL per CORS', feature2: 'Invia richieste preflight OPTIONS', feature3: 'Visualizza Access-Control-Allow-Origin', feature4: 'Verifica supporto credenziali', feature5: 'Test CORS basato su browser',
    faqTitle: 'Domande frequenti', faq1q: 'Cos\'e CORS?', faq1a: 'CORS e un meccanismo di sicurezza che consente a una pagina web di richiedere risorse da un altro dominio.', faq2q: 'Cos\'e una richiesta preflight?', faq2a: 'E una richiesta OPTIONS inviata dal browser prima di certe richieste cross-origin.', faq3q: 'Cosa significa Access-Control-Allow-Origin?', faq3a: 'Questa intestazione specifica quali origini possono accedere alla risorsa.', faq4q: 'Perche la mia richiesta CORS viene bloccata?', faq4a: 'Le richieste vengono bloccate quando il server non include l\'intestazione Access-Control-Allow-Origin.', faq5q: 'Posso testare CORS dal browser?', faq5a: 'Si. Questo strumento invia richieste direttamente dal browser.',
    relatedTitle: 'Strumenti correlati', errorEmpty: 'Inserisci un URL.', errorFetch: 'Richiesta fallita.', loading: 'Test CORS in corso...', noHeaders: 'Nessuna intestazione CORS trovata.', header: 'Intestazione', value: 'Valore',
  },
  nl: {
    title: 'CORS Tester',
    description: 'Test CORS-headers voor elke URL. Controleer Access-Control-Allow-Origin, methoden en headers.',
    urlLabel: 'Te testen URL', urlPlaceholder: 'https://api.example.com/endpoint', originLabel: 'Origin header', originPlaceholder: 'https://yourdomain.com', methodLabel: 'Verzoekmethode', test: 'Test CORS', preflight: 'Stuur preflight (OPTIONS)', clear: 'Wissen', resultsLabel: 'CORS Headers', copyLabel: 'Resultaten kopieren', statusLabel: 'Respons status', corsAllowed: 'CORS toegestaan', corsBlocked: 'CORS geblokkeerd of geen headers',
    introTitle: 'Gratis Online CORS Tester', introText: 'Voer een URL en origin in om CORS-headers te testen vanuit uw browser.',
    howTitle: 'Hoe CORS-headers te testen', step1: 'Voer de te testen URL in', step2: 'Stel de Origin header in', step3: 'Kies de HTTP-methode', step4: 'Klik op "Test CORS"',
    featuresTitle: 'Functies', feature1: 'Test elke URL op CORS-headers', feature2: 'Stuur preflight OPTIONS verzoeken', feature3: 'Bekijk Access-Control-Allow-Origin', feature4: 'Controleer credentials ondersteuning', feature5: 'Browser-gebaseerde CORS test',
    faqTitle: 'Veelgestelde vragen', faq1q: 'Wat is CORS?', faq1a: 'CORS is een beveiligingsmechanisme waarmee een webpagina bronnen kan opvragen van een ander domein.', faq2q: 'Wat is een preflight verzoek?', faq2a: 'Een OPTIONS verzoek dat de browser stuurt voor bepaalde cross-origin verzoeken.', faq3q: 'Wat betekent Access-Control-Allow-Origin?', faq3a: 'Deze header specificeert welke origins toegang hebben tot de bron.', faq4q: 'Waarom wordt mijn CORS verzoek geblokkeerd?', faq4a: 'Verzoeken worden geblokkeerd als de server de Access-Control-Allow-Origin header niet bevat.', faq5q: 'Kan ik CORS in de browser testen?', faq5a: 'Ja. Dit tool stuurt verzoeken direct vanuit uw browser.',
    relatedTitle: 'Gerelateerde tools', errorEmpty: 'Voer een URL in.', errorFetch: 'Verzoek mislukt.', loading: 'CORS testen...', noHeaders: 'Geen CORS-headers gevonden.', header: 'Header', value: 'Waarde',
  },
  pl: {
    title: 'Tester CORS',
    description: 'Testuj naglowki CORS dla dowolnego URL. Sprawdz Access-Control-Allow-Origin, metody i naglowki.',
    urlLabel: 'URL do testu', urlPlaceholder: 'https://api.example.com/endpoint', originLabel: 'Naglowek Origin', originPlaceholder: 'https://yourdomain.com', methodLabel: 'Metoda zadania', test: 'Testuj CORS', preflight: 'Wyslij preflight (OPTIONS)', clear: 'Wyczysc', resultsLabel: 'Naglowki CORS', copyLabel: 'Kopiuj wyniki', statusLabel: 'Status odpowiedzi', corsAllowed: 'CORS dozwolone', corsBlocked: 'CORS zablokowane lub brak naglowkow',
    introTitle: 'Darmowy Tester CORS Online', introText: 'Wpisz URL i origin, aby przetestowac naglowki CORS bezposrednio z przegladarki.',
    howTitle: 'Jak testowac naglowki CORS', step1: 'Wpisz URL do testu', step2: 'Ustaw naglowek Origin', step3: 'Wybierz metode HTTP', step4: 'Kliknij "Testuj CORS"',
    featuresTitle: 'Funkcje', feature1: 'Testuj dowolny URL pod katem CORS', feature2: 'Wysylaj preflight OPTIONS', feature3: 'Zobacz Access-Control-Allow-Origin', feature4: 'Sprawdz obsluge credentials', feature5: 'Test CORS oparty na przegladarce',
    faqTitle: 'Czesto zadawane pytania', faq1q: 'Czym jest CORS?', faq1a: 'CORS to mechanizm bezpieczenstwa pozwalajacy stronie internetowej na zadanie zasobow z innej domeny.', faq2q: 'Czym jest zadanie preflight?', faq2a: 'To zadanie OPTIONS wysylane przez przegladarke przed pewnymi zadaniami cross-origin.', faq3q: 'Co oznacza Access-Control-Allow-Origin?', faq3a: 'Ten naglowek okresla, ktore origin moga uzyskac dostep do zasobu.', faq4q: 'Dlaczego moje zadanie CORS jest blokowane?', faq4a: 'Zadania sa blokowane, gdy serwer nie zawiera naglowka Access-Control-Allow-Origin.', faq5q: 'Czy moge testowac CORS w przegladarce?', faq5a: 'Tak. To narzedzie wysyla zadania bezposrednio z przegladarki.',
    relatedTitle: 'Powiazane narzedzia', errorEmpty: 'Wpisz URL.', errorFetch: 'Zadanie nie powiodlo sie.', loading: 'Testowanie CORS...', noHeaders: 'Nie znaleziono naglowkow CORS.', header: 'Naglowek', value: 'Wartosc',
  },
  sv: {
    title: 'CORS-testare',
    description: 'Testa CORS-rubriker foer alla URL:er. Kontrollera Access-Control-Allow-Origin, metoder och rubriker.',
    urlLabel: 'URL att testa', urlPlaceholder: 'https://api.example.com/endpoint', originLabel: 'Origin-rubrik', originPlaceholder: 'https://yourdomain.com', methodLabel: 'Foerfraagningsmetod', test: 'Testa CORS', preflight: 'Skicka preflight (OPTIONS)', clear: 'Rensa', resultsLabel: 'CORS-rubriker', copyLabel: 'Kopiera resultat', statusLabel: 'Svarsstatus', corsAllowed: 'CORS tillaaten', corsBlocked: 'CORS blockerad eller inga rubriker',
    introTitle: 'Gratis CORS-testare Online', introText: 'Ange en URL och origin foer att testa CORS-rubriker direkt fraan din webblasare.',
    howTitle: 'Hur man testar CORS-rubriker', step1: 'Ange URL:en att testa', step2: 'Staell in Origin-rubriken', step3: 'Valj HTTP-metod', step4: 'Klicka paa "Testa CORS"',
    featuresTitle: 'Funktioner', feature1: 'Testa alla URL:er foer CORS', feature2: 'Skicka preflight OPTIONS-foerfraagningar', feature3: 'Visa Access-Control-Allow-Origin', feature4: 'Kontrollera credentials-stoeed', feature5: 'Webblasarbaserad CORS-test',
    faqTitle: 'Vanliga fraagor', faq1q: 'Vad aer CORS?', faq1a: 'CORS aer en saekerhetsmedanism som tillaater en webbsida att begoera resurser fraan en annan domaan.', faq2q: 'Vad aer en preflight-foerfraagan?', faq2a: 'En OPTIONS-foerfraagan som webblasaren skickar foere vissa cross-origin-foerfraagningar.', faq3q: 'Vad betyder Access-Control-Allow-Origin?', faq3a: 'Denna rubrik anger vilka origins som faar komma aat resursen.', faq4q: 'Varfoer blockeras min CORS-foerfraagan?', faq4a: 'Foerfraagningar blockeras naer servern inte inkluderar Access-Control-Allow-Origin.', faq5q: 'Kan jag testa CORS i webblasaren?', faq5a: 'Ja. Detta verktyg skickar foerfraagningar direkt fraan din webblasare.',
    relatedTitle: 'Relaterade verktyg', errorEmpty: 'Ange en URL.', errorFetch: 'Foerfraagan misslyckades.', loading: 'Testar CORS...', noHeaders: 'Inga CORS-rubriker hittades.', header: 'Rubrik', value: 'Vaerde',
  },
  no: {
    title: 'CORS-tester',
    description: 'Test CORS-hoder for enhver URL. Sjekk Access-Control-Allow-Origin, metoder og hoder.',
    urlLabel: 'URL aa teste', urlPlaceholder: 'https://api.example.com/endpoint', originLabel: 'Origin-hode', originPlaceholder: 'https://yourdomain.com', methodLabel: 'Foresporselsmetode', test: 'Test CORS', preflight: 'Send preflight (OPTIONS)', clear: 'Toom', resultsLabel: 'CORS-hoder', copyLabel: 'Kopier resultater', statusLabel: 'Svarstatus', corsAllowed: 'CORS tillatt', corsBlocked: 'CORS blokkert eller ingen hoder',
    introTitle: 'Gratis CORS-tester Online', introText: 'Skriv inn en URL og origin for aa teste CORS-hoder direkte fra nettleseren.',
    howTitle: 'Slik tester du CORS-hoder', step1: 'Skriv inn URL-en', step2: 'Sett Origin-hodet', step3: 'Velg HTTP-metode', step4: 'Klikk paa "Test CORS"',
    featuresTitle: 'Funksjoner', feature1: 'Test enhver URL for CORS', feature2: 'Send preflight OPTIONS-foresporsel', feature3: 'Se Access-Control-Allow-Origin', feature4: 'Sjekk credentials-stotte', feature5: 'Nettleserbasert CORS-test',
    faqTitle: 'Ofte stilte sporsmal', faq1q: 'Hva er CORS?', faq1a: 'CORS er en sikkerhetsmekanisme som lar en nettside be om ressurser fra et annet domene.', faq2q: 'Hva er en preflight-foresporsel?', faq2a: 'En OPTIONS-foresporsel sendt av nettleseren for visse cross-origin-foresporsler.', faq3q: 'Hva betyr Access-Control-Allow-Origin?', faq3a: 'Denne hoden angir hvilke origins som faar tilgang til ressursen.', faq4q: 'Hvorfor blokkeres CORS-foresporselen min?', faq4a: 'Foresporsler blokkeres naar serveren ikke inkluderer Access-Control-Allow-Origin.', faq5q: 'Kan jeg teste CORS i nettleseren?', faq5a: 'Ja. Dette verktooyet sender foresporsler direkte fra nettleseren.',
    relatedTitle: 'Relaterte verktoy', errorEmpty: 'Skriv inn en URL.', errorFetch: 'Foresporselen mislyktes.', loading: 'Tester CORS...', noHeaders: 'Ingen CORS-hoder funnet.', header: 'Hode', value: 'Verdi',
  },
  id: {
    title: 'Penguji CORS',
    description: 'Uji header CORS untuk URL apa pun. Periksa Access-Control-Allow-Origin, metode, dan header.',
    urlLabel: 'URL untuk diuji', urlPlaceholder: 'https://api.example.com/endpoint', originLabel: 'Header Origin', originPlaceholder: 'https://yourdomain.com', methodLabel: 'Metode permintaan', test: 'Uji CORS', preflight: 'Kirim preflight (OPTIONS)', clear: 'Hapus', resultsLabel: 'Header CORS', copyLabel: 'Salin hasil', statusLabel: 'Status respons', corsAllowed: 'CORS diizinkan', corsBlocked: 'CORS diblokir atau tanpa header',
    introTitle: 'Penguji CORS Online Gratis', introText: 'Masukkan URL dan origin untuk menguji header CORS langsung dari browser.',
    howTitle: 'Cara menguji header CORS', step1: 'Masukkan URL untuk diuji', step2: 'Atur header Origin', step3: 'Pilih metode HTTP', step4: 'Klik "Uji CORS"',
    featuresTitle: 'Fitur', feature1: 'Uji URL apa pun untuk CORS', feature2: 'Kirim permintaan preflight OPTIONS', feature3: 'Lihat Access-Control-Allow-Origin', feature4: 'Periksa dukungan credentials', feature5: 'Pengujian CORS berbasis browser',
    faqTitle: 'Pertanyaan yang sering diajukan', faq1q: 'Apa itu CORS?', faq1a: 'CORS adalah mekanisme keamanan yang memungkinkan halaman web meminta sumber daya dari domain lain.', faq2q: 'Apa itu permintaan preflight?', faq2a: 'Permintaan OPTIONS yang dikirim browser sebelum permintaan cross-origin tertentu.', faq3q: 'Apa arti Access-Control-Allow-Origin?', faq3a: 'Header ini menentukan origin mana yang diizinkan mengakses sumber daya.', faq4q: 'Mengapa permintaan CORS saya diblokir?', faq4a: 'Permintaan diblokir ketika server tidak menyertakan header Access-Control-Allow-Origin.', faq5q: 'Bisakah saya menguji CORS dari browser?', faq5a: 'Ya. Alat ini mengirim permintaan langsung dari browser Anda.',
    relatedTitle: 'Alat terkait', errorEmpty: 'Masukkan URL.', errorFetch: 'Permintaan gagal.', loading: 'Menguji CORS...', noHeaders: 'Tidak ada header CORS ditemukan.', header: 'Header', value: 'Nilai',
  },
  th: {
    title: 'ทดสอบ CORS',
    description: 'ทดสอบ CORS headers สำหรับ URL ใดก็ได้ ตรวจสอบ Access-Control-Allow-Origin, เมธอด และ headers',
    urlLabel: 'URL ที่จะทดสอบ', urlPlaceholder: 'https://api.example.com/endpoint', originLabel: 'Origin Header', originPlaceholder: 'https://yourdomain.com', methodLabel: 'เมธอดคำขอ', test: 'ทดสอบ CORS', preflight: 'ส่ง Preflight (OPTIONS)', clear: 'ล้าง', resultsLabel: 'CORS Headers', copyLabel: 'คัดลอกผลลัพธ์', statusLabel: 'สถานะการตอบกลับ', corsAllowed: 'CORS อนุญาต', corsBlocked: 'CORS ถูกบล็อกหรือไม่มี headers',
    introTitle: 'ทดสอบ CORS ออนไลน์ฟรี', introText: 'กรอก URL และ origin เพื่อทดสอบ CORS headers โดยตรงจากเบราว์เซอร์ของคุณ',
    howTitle: 'วิธีทดสอบ CORS headers', step1: 'กรอก URL ที่จะทดสอบ', step2: 'ตั้งค่า Origin header', step3: 'เลือกเมธอด HTTP', step4: 'คลิก "ทดสอบ CORS"',
    featuresTitle: 'คุณสมบัติ', feature1: 'ทดสอบ URL ใดก็ได้สำหรับ CORS', feature2: 'ส่งคำขอ preflight OPTIONS', feature3: 'ดู Access-Control-Allow-Origin', feature4: 'ตรวจสอบการรองรับ credentials', feature5: 'การทดสอบ CORS ผ่านเบราว์เซอร์',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'CORS คืออะไร?', faq1a: 'CORS เป็นกลไกความปลอดภัยที่อนุญาตให้หน้าเว็บขอทรัพยากรจากโดเมนอื่น', faq2q: 'คำขอ preflight คืออะไร?', faq2a: 'คำขอ OPTIONS ที่เบราว์เซอร์ส่งก่อนคำขอ cross-origin บางรายการ', faq3q: 'Access-Control-Allow-Origin หมายถึงอะไร?', faq3a: 'header นี้ระบุว่า origin ใดได้รับอนุญาตให้เข้าถึงทรัพยากร', faq4q: 'ทำไมคำขอ CORS ของฉันถูกบล็อก?', faq4a: 'คำขอถูกบล็อกเมื่อเซิร์ฟเวอร์ไม่รวม Access-Control-Allow-Origin header', faq5q: 'ทดสอบ CORS จากเบราว์เซอร์ได้ไหม?', faq5a: 'ได้ เครื่องมือนี้ส่งคำขอโดยตรงจากเบราว์เซอร์ของคุณ',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorEmpty: 'กรุณากรอก URL', errorFetch: 'คำขอล้มเหลว', loading: 'กำลังทดสอบ CORS...', noHeaders: 'ไม่พบ CORS headers', header: 'Header', value: 'ค่า',
  },
};

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'];

const CORS_HEADERS = [
  'access-control-allow-origin',
  'access-control-allow-methods',
  'access-control-allow-headers',
  'access-control-allow-credentials',
  'access-control-expose-headers',
  'access-control-max-age',
];

interface CorsResult {
  header: string;
  value: string;
}

export default function CorsTester() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [url, setUrl] = useState('');
  const [origin, setOrigin] = useState('https://example.com');
  const [method, setMethod] = useState('GET');
  const [results, setResults] = useState<CorsResult[]>([]);
  const [status, setStatus] = useState('');
  const [corsAllowed, setCorsAllowed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultText, setResultText] = useState('');

  const doTest = useCallback(async (isPreflight: boolean) => {
    setError('');
    setResults([]);
    setResultText('');
    setStatus('');
    setCorsAllowed(null);

    if (!url.trim()) {
      setError(t.errorEmpty);
      return;
    }

    setLoading(true);
    try {
      const fetchMethod = isPreflight ? 'OPTIONS' : method;
      const headers: Record<string, string> = { 'Origin': origin };
      if (isPreflight) {
        headers['Access-Control-Request-Method'] = method;
        headers['Access-Control-Request-Headers'] = 'Content-Type';
      }

      const response = await fetch(url.trim(), {
        method: fetchMethod,
        headers,
        mode: 'cors',
      });

      setStatus(`${response.status} ${response.statusText}`);

      const corsResults: CorsResult[] = [];
      CORS_HEADERS.forEach((h) => {
        const val = response.headers.get(h);
        if (val) {
          corsResults.push({ header: h, value: val });
        }
      });

      setResults(corsResults);
      setCorsAllowed(corsResults.length > 0);

      if (corsResults.length > 0) {
        setResultText(corsResults.map(r => `${r.header}: ${r.value}`).join('\n'));
      } else {
        setResultText(t.noHeaders);
      }
    } catch {
      setError(t.errorFetch);
      setCorsAllowed(false);
    } finally {
      setLoading(false);
    }
  }, [url, origin, method, t]);

  const handleClear = useCallback(() => {
    setUrl('');
    setOrigin('https://example.com');
    setResults([]);
    setResultText('');
    setStatus('');
    setCorsAllowed(null);
    setError('');
  }, []);

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
    <ToolLayout title={t.title} description={t.description} toolId="cors-tester">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.urlLabel}</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={t.urlPlaceholder}
            style={{ width: '100%', padding: '10px 14px', fontSize: 14, fontFamily: 'JetBrains Mono, Fira Code, monospace', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 250px' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.originLabel}</label>
            <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder={t.originPlaceholder}
              style={{ width: '100%', padding: '10px 14px', fontSize: 14, fontFamily: 'JetBrains Mono, Fira Code, monospace', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
          </div>
          <div style={{ minWidth: 120 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.methodLabel}</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}>
              {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => doTest(false)} className="btn btn-primary" style={{ fontSize: 13 }} disabled={loading}>{loading ? t.loading : t.test}</button>
        <button onClick={() => doTest(true)} className="btn btn-secondary" style={{ fontSize: 13 }} disabled={loading}>{t.preflight}</button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose, #f43f5e)' }}>
          {'\u2715'} {error}
        </div>
      )}

      {corsAllowed !== null && (
        <div style={{
          padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13, fontWeight: 600,
          background: corsAllowed ? 'rgba(34, 197, 94, 0.1)' : 'rgba(244, 63, 94, 0.1)',
          border: `1px solid ${corsAllowed ? 'rgba(34, 197, 94, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
          color: corsAllowed ? '#22c55e' : '#f43f5e',
        }}>
          {corsAllowed ? '\u2713' : '\u2715'} {corsAllowed ? t.corsAllowed : t.corsBlocked}
          {status && <span style={{ marginLeft: 16, fontWeight: 400, color: 'var(--text-secondary)' }}>{t.statusLabel}: {status}</span>}
        </div>
      )}

      {results.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.resultsLabel}</label>
            <CopyButton text={resultText} label={t.copyLabel} />
          </div>
          <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'JetBrains Mono, Fira Code, monospace' }}>
              <thead>
                <tr style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.header}</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.value}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '10px 14px', color: 'var(--accent-blue)', fontWeight: 600 }}>{r.header}</td>
                    <td style={{ padding: '10px 14px', wordBreak: 'break-all' }}>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li>
        </ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.feature1}</li><li>{t.feature2}</li><li>{t.feature3}</li><li>{t.feature4}</li><li>{t.feature5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[{ href: `/${lang}/tools/http-status-codes`, label: 'HTTP Status Codes' }, { href: `/${lang}/tools/http-request-builder`, label: 'HTTP Request Builder' }, { href: `/${lang}/tools/url-parser`, label: 'URL Parser' }].map((link) => (
            <a key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</a>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
