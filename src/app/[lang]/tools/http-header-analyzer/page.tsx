'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HTTP Header Analyzer',
    description: 'Parse and analyze HTTP response headers. Understand each header\'s purpose, security implications, and best practices.',
    inputLabel: 'Paste HTTP Headers',
    inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nCache-Control: max-age=3600\nX-Frame-Options: DENY\nStrict-Transport-Security: max-age=31536000\n...',
    analyze: 'Analyze',
    clear: 'Clear',
    loadSample: 'Load Sample',
    results: 'Analysis Results',
    headerName: 'Header',
    headerValue: 'Value',
    category: 'Category',
    explanation: 'Explanation',
    security: 'Security',
    caching: 'Caching',
    content: 'Content',
    cors: 'CORS',
    general: 'General',
    statusLine: 'Status Line',
    securityScore: 'Security Score',
    securityGood: 'Good - Key security headers present',
    securityWarning: 'Fair - Some security headers missing',
    securityBad: 'Poor - Critical security headers missing',
    missingHeaders: 'Missing Recommended Headers',
    totalHeaders: 'Total Headers',
    noHeaders: 'No headers parsed. Paste HTTP headers above and click Analyze.',
    introTitle: 'Free Online HTTP Header Analyzer',
    introText: 'Analyze HTTP response headers to understand their purpose, check security settings, and identify missing best-practice headers. Paste any HTTP response headers to get a detailed explanation of each header, security analysis, and recommendations for improvement.',
    tipTitle: 'Important HTTP Headers to Know',
    tip1: 'Content-Security-Policy (CSP) prevents XSS and injection attacks',
    tip2: 'Strict-Transport-Security (HSTS) enforces HTTPS connections',
    tip3: 'X-Frame-Options prevents clickjacking attacks',
    tip4: 'Cache-Control manages browser and proxy caching behavior',
    tip5: 'CORS headers control cross-origin resource sharing',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What are HTTP headers?',
    faq1a: 'HTTP headers are key-value pairs sent between client and server that provide metadata about the request or response. They control caching, authentication, content negotiation, security policies, and many other aspects of HTTP communication.',
    faq2q: 'Why are security headers important?',
    faq2a: 'Security headers like Content-Security-Policy, Strict-Transport-Security, and X-Frame-Options help protect your website from common attacks such as cross-site scripting (XSS), clickjacking, and man-in-the-middle attacks. Missing security headers leave your site vulnerable.',
    faq3q: 'How do I view HTTP headers?',
    faq3a: 'You can view HTTP headers using browser DevTools (Network tab), curl command with -I flag, or online tools. This analyzer helps you understand what each header does and identifies any security issues or missing best-practice headers.',
    faq4q: 'What is the difference between request and response headers?',
    faq4a: 'Request headers are sent by the client (browser) to the server, including Accept, User-Agent, and Authorization. Response headers are sent by the server back to the client, including Content-Type, Cache-Control, and security headers. This tool focuses on analyzing response headers.',
    faq5q: 'Is this tool free to use?',
    faq5a: 'Yes, this HTTP header analyzer is completely free. All analysis happens in your browser; no data is sent to any server. Your headers remain private and are never stored.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'HTTP 请求头分析工具',
    description: '解析和分析 HTTP 响应头。了解每个请求头的用途、安全含义和最佳实践。',
    inputLabel: '粘贴 HTTP 头部',
    inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nCache-Control: max-age=3600\n...',
    analyze: '分析',
    clear: '清除',
    loadSample: '加载示例',
    results: '分析结果',
    headerName: '头部名称',
    headerValue: '值',
    category: '类别',
    explanation: '说明',
    security: '安全',
    caching: '缓存',
    content: '内容',
    cors: 'CORS',
    general: '通用',
    statusLine: '状态行',
    securityScore: '安全评分',
    securityGood: '良好 - 关键安全头已设置',
    securityWarning: '一般 - 缺少部分安全头',
    securityBad: '较差 - 缺少关键安全头',
    missingHeaders: '缺少的推荐头部',
    totalHeaders: '总计头部数',
    noHeaders: '未解析到头部。请在上方粘贴 HTTP 头部后点击分析。',
    introTitle: '免费在线 HTTP 头部分析工具',
    introText: '分析 HTTP 响应头以了解其用途、检查安全设置并识别缺失的最佳实践头部。粘贴任何 HTTP 响应头以获取每个头部的详细说明、安全分析和改进建议。',
    tipTitle: '重要的 HTTP 头部',
    tip1: 'Content-Security-Policy (CSP) 防止 XSS 和注入攻击',
    tip2: 'Strict-Transport-Security (HSTS) 强制 HTTPS 连接',
    tip3: 'X-Frame-Options 防止点击劫持攻击',
    tip4: 'Cache-Control 管理浏览器和代理缓存行为',
    tip5: 'CORS 头部控制跨域资源共享',
    faqTitle: '常见问题',
    faq1q: '什么是 HTTP 头部？', faq1a: 'HTTP 头部是在客户端和服务器之间发送的键值对，提供请求或响应的元数据。它们控制缓存、认证、内容协商、安全策略等。',
    faq2q: '为什么安全头部很重要？', faq2a: 'Content-Security-Policy、Strict-Transport-Security 和 X-Frame-Options 等安全头帮助保护网站免受 XSS、点击劫持和中间人攻击。缺少安全头会使站点容易受到攻击。',
    faq3q: '如何查看 HTTP 头部？', faq3a: '可以使用浏览器开发者工具（网络标签页）、curl 命令的 -I 参数或在线工具查看。此分析工具帮助理解每个头部的作用。',
    faq4q: '请求头和响应头有什么区别？', faq4a: '请求头由客户端发送给服务器，包括 Accept、User-Agent 等。响应头由服务器返回给客户端，包括 Content-Type、Cache-Control 等安全头。此工具专注于分析响应头。',
    faq5q: '这个工具免费吗？', faq5a: '是的，完全免费。所有分析都在浏览器中完成，不会向服务器发送任何数据。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Analyseur d\'En-tetes HTTP',
    description: 'Analysez les en-tetes de reponse HTTP. Comprenez le role et les implications de securite de chaque en-tete.',
    inputLabel: 'Collez les en-tetes HTTP', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'Analyser', clear: 'Effacer', loadSample: 'Charger un exemple',
    results: 'Resultats d\'analyse', headerName: 'En-tete', headerValue: 'Valeur', category: 'Categorie', explanation: 'Explication',
    security: 'Securite', caching: 'Mise en cache', content: 'Contenu', cors: 'CORS', general: 'General', statusLine: 'Ligne de statut',
    securityScore: 'Score de securite', securityGood: 'Bon', securityWarning: 'Moyen', securityBad: 'Faible',
    missingHeaders: 'En-tetes recommandes manquants', totalHeaders: 'Total des en-tetes',
    noHeaders: 'Aucun en-tete analyse. Collez les en-tetes HTTP ci-dessus.',
    introTitle: 'Analyseur d\'en-tetes HTTP gratuit', introText: 'Analysez les en-tetes de reponse HTTP pour comprendre leur role et verifier les parametres de securite.',
    tipTitle: 'En-tetes HTTP importants', tip1: 'CSP previent les attaques XSS', tip2: 'HSTS force les connexions HTTPS',
    tip3: 'X-Frame-Options previent le clickjacking', tip4: 'Cache-Control gere la mise en cache', tip5: 'Les en-tetes CORS controlent le partage de ressources',
    faqTitle: 'Questions frequentes',
    faq1q: 'Que sont les en-tetes HTTP?', faq1a: 'Les en-tetes HTTP sont des paires cle-valeur envoyees entre client et serveur fournissant des metadonnees.',
    faq2q: 'Pourquoi les en-tetes de securite?', faq2a: 'Ils protegent contre les attaques XSS, clickjacking et man-in-the-middle.',
    faq3q: 'Comment voir les en-tetes?', faq3a: 'Via les DevTools du navigateur, curl -I, ou des outils en ligne.',
    faq4q: 'Difference requete et reponse?', faq4a: 'Les en-tetes de requete sont envoyes par le client, ceux de reponse par le serveur.',
    faq5q: 'Est-ce gratuit?', faq5a: 'Oui, completement gratuit. L\'analyse se fait dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'HTTP-Header Analysator',
    description: 'HTTP-Antwort-Header analysieren und verstehen. Zweck und Sicherheitsimplikationen jedes Headers.',
    inputLabel: 'HTTP-Header einfuegen', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'Analysieren', clear: 'Loeschen', loadSample: 'Beispiel laden',
    results: 'Analyseergebnisse', headerName: 'Header', headerValue: 'Wert', category: 'Kategorie', explanation: 'Erklaerung',
    security: 'Sicherheit', caching: 'Caching', content: 'Inhalt', cors: 'CORS', general: 'Allgemein', statusLine: 'Statuszeile',
    securityScore: 'Sicherheitsbewertung', securityGood: 'Gut', securityWarning: 'Mittel', securityBad: 'Schlecht',
    missingHeaders: 'Fehlende empfohlene Header', totalHeaders: 'Header gesamt',
    noHeaders: 'Keine Header analysiert. Fuegen Sie HTTP-Header oben ein.',
    introTitle: 'Kostenloses HTTP-Header Analyse-Tool', introText: 'Analysieren Sie HTTP-Antwort-Header um deren Zweck zu verstehen und Sicherheitseinstellungen zu pruefen.',
    tipTitle: 'Wichtige HTTP-Header', tip1: 'CSP verhindert XSS-Angriffe', tip2: 'HSTS erzwingt HTTPS',
    tip3: 'X-Frame-Options verhindert Clickjacking', tip4: 'Cache-Control steuert das Caching', tip5: 'CORS-Header steuern Cross-Origin-Zugriff',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was sind HTTP-Header?', faq1a: 'HTTP-Header sind Schluessel-Wert-Paare die Metadaten ueber Anfrage oder Antwort liefern.',
    faq2q: 'Warum sind Sicherheits-Header wichtig?', faq2a: 'Sie schuetzen vor XSS, Clickjacking und Man-in-the-Middle-Angriffen.',
    faq3q: 'Wie sieht man HTTP-Header?', faq3a: 'Ueber Browser-DevTools, curl -I oder Online-Tools.',
    faq4q: 'Unterschied Request und Response?', faq4a: 'Request-Header werden vom Client gesendet, Response-Header vom Server.',
    faq5q: 'Ist es kostenlos?', faq5a: 'Ja, komplett kostenlos. Die Analyse erfolgt im Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Analizador de Encabezados HTTP',
    description: 'Analice encabezados de respuesta HTTP. Comprenda el proposito y las implicaciones de seguridad.',
    inputLabel: 'Pegue los encabezados HTTP', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'Analizar', clear: 'Limpiar', loadSample: 'Cargar ejemplo',
    results: 'Resultados del analisis', headerName: 'Encabezado', headerValue: 'Valor', category: 'Categoria', explanation: 'Explicacion',
    security: 'Seguridad', caching: 'Cache', content: 'Contenido', cors: 'CORS', general: 'General', statusLine: 'Linea de estado',
    securityScore: 'Puntuacion de seguridad', securityGood: 'Buena', securityWarning: 'Regular', securityBad: 'Mala',
    missingHeaders: 'Encabezados recomendados faltantes', totalHeaders: 'Total de encabezados',
    noHeaders: 'Sin encabezados. Pegue encabezados HTTP arriba.',
    introTitle: 'Analizador de encabezados HTTP gratuito', introText: 'Analice encabezados de respuesta HTTP para entender su proposito y verificar configuraciones de seguridad.',
    tipTitle: 'Encabezados HTTP importantes', tip1: 'CSP previene ataques XSS', tip2: 'HSTS fuerza conexiones HTTPS',
    tip3: 'X-Frame-Options previene clickjacking', tip4: 'Cache-Control gestiona el cache', tip5: 'Los encabezados CORS controlan el acceso entre origenes',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que son los encabezados HTTP?', faq1a: 'Son pares clave-valor que proporcionan metadatos sobre la solicitud o respuesta.',
    faq2q: 'Por que importan los encabezados de seguridad?', faq2a: 'Protegen contra XSS, clickjacking y ataques man-in-the-middle.',
    faq3q: 'Como ver los encabezados?', faq3a: 'Mediante DevTools del navegador, curl -I o herramientas en linea.',
    faq4q: 'Diferencia entre request y response?', faq4a: 'Los de request los envia el cliente, los de response el servidor.',
    faq5q: 'Es gratis?', faq5a: 'Si, completamente gratis. El analisis se hace en su navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'HTTP ヘッダー分析ツール',
    description: 'HTTP レスポンスヘッダーを解析・分析。各ヘッダーの目的とセキュリティへの影響を理解。',
    inputLabel: 'HTTP ヘッダーを貼り付け', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: '分析', clear: 'クリア', loadSample: 'サンプルを読み込む',
    results: '分析結果', headerName: 'ヘッダー', headerValue: '値', category: 'カテゴリ', explanation: '説明',
    security: 'セキュリティ', caching: 'キャッシュ', content: 'コンテンツ', cors: 'CORS', general: '一般', statusLine: 'ステータス行',
    securityScore: 'セキュリティスコア', securityGood: '良好', securityWarning: '普通', securityBad: '不良',
    missingHeaders: '不足している推奨ヘッダー', totalHeaders: 'ヘッダー合計',
    noHeaders: 'ヘッダーが解析されていません。上に HTTP ヘッダーを貼り付けてください。',
    introTitle: '無料 HTTP ヘッダー分析ツール', introText: 'HTTP レスポンスヘッダーを分析して目的を理解し、セキュリティ設定を確認します。',
    tipTitle: '重要な HTTP ヘッダー', tip1: 'CSP は XSS 攻撃を防止', tip2: 'HSTS は HTTPS を強制',
    tip3: 'X-Frame-Options はクリックジャッキングを防止', tip4: 'Cache-Control はキャッシュを管理', tip5: 'CORS ヘッダーはクロスオリジンアクセスを制御',
    faqTitle: 'よくある質問',
    faq1q: 'HTTP ヘッダーとは？', faq1a: 'HTTP ヘッダーはリクエストやレスポンスのメタデータを提供するキーバリューペアです。',
    faq2q: 'セキュリティヘッダーが重要な理由は？', faq2a: 'XSS、クリックジャッキング、中間者攻撃から保護します。',
    faq3q: 'HTTP ヘッダーの確認方法は？', faq3a: 'ブラウザの DevTools、curl -I、またはオンラインツールで確認できます。',
    faq4q: 'リクエストとレスポンスの違いは？', faq4a: 'リクエストヘッダーはクライアントから、レスポンスヘッダーはサーバーから送信されます。',
    faq5q: '無料ですか？', faq5a: 'はい、完全に無料です。分析はブラウザ内で行われます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'HTTP 헤더 분석 도구',
    description: 'HTTP 응답 헤더를 파싱하고 분석합니다. 각 헤더의 목적과 보안 영향을 이해하세요.',
    inputLabel: 'HTTP 헤더 붙여넣기', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: '분석', clear: '지우기', loadSample: '샘플 로드',
    results: '분석 결과', headerName: '헤더', headerValue: '값', category: '카테고리', explanation: '설명',
    security: '보안', caching: '캐싱', content: '콘텐츠', cors: 'CORS', general: '일반', statusLine: '상태 라인',
    securityScore: '보안 점수', securityGood: '양호', securityWarning: '보통', securityBad: '취약',
    missingHeaders: '누락된 권장 헤더', totalHeaders: '총 헤더 수',
    noHeaders: '헤더가 분석되지 않았습니다. 위에 HTTP 헤더를 붙여넣으세요.',
    introTitle: '무료 HTTP 헤더 분석 도구', introText: 'HTTP 응답 헤더를 분석하여 목적을 이해하고 보안 설정을 확인합니다.',
    tipTitle: '중요한 HTTP 헤더', tip1: 'CSP는 XSS 공격 방지', tip2: 'HSTS는 HTTPS 강제',
    tip3: 'X-Frame-Options는 클릭재킹 방지', tip4: 'Cache-Control은 캐싱 관리', tip5: 'CORS 헤더는 교차 출처 접근 제어',
    faqTitle: '자주 묻는 질문',
    faq1q: 'HTTP 헤더란?', faq1a: 'HTTP 헤더는 요청이나 응답의 메타데이터를 제공하는 키-값 쌍입니다.',
    faq2q: '보안 헤더가 중요한 이유?', faq2a: 'XSS, 클릭재킹, 중간자 공격으로부터 보호합니다.',
    faq3q: 'HTTP 헤더 확인 방법?', faq3a: '브라우저 DevTools, curl -I 또는 온라인 도구로 확인할 수 있습니다.',
    faq4q: '요청과 응답의 차이?', faq4a: '요청 헤더는 클라이언트에서, 응답 헤더는 서버에서 전송됩니다.',
    faq5q: '무료인가요?', faq5a: '네, 완전히 무료입니다. 분석은 브라우저에서 수행됩니다.',
    relatedTitle: '관련 도구',
  },
  it: {
    title: 'Analizzatore di Header HTTP',
    description: 'Analizza gli header di risposta HTTP. Comprendi lo scopo e le implicazioni di sicurezza.',
    inputLabel: 'Incolla gli header HTTP', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'Analizza', clear: 'Cancella', loadSample: 'Carica esempio',
    results: 'Risultati analisi', headerName: 'Header', headerValue: 'Valore', category: 'Categoria', explanation: 'Spiegazione',
    security: 'Sicurezza', caching: 'Cache', content: 'Contenuto', cors: 'CORS', general: 'Generale', statusLine: 'Riga di stato',
    securityScore: 'Punteggio sicurezza', securityGood: 'Buono', securityWarning: 'Medio', securityBad: 'Scarso',
    missingHeaders: 'Header raccomandati mancanti', totalHeaders: 'Header totali',
    noHeaders: 'Nessun header analizzato. Incolla gli header HTTP sopra.',
    introTitle: 'Analizzatore di header HTTP gratuito', introText: 'Analizza gli header di risposta HTTP per comprendere il loro scopo e verificare le impostazioni di sicurezza.',
    tipTitle: 'Header HTTP importanti', tip1: 'CSP previene gli attacchi XSS', tip2: 'HSTS forza HTTPS',
    tip3: 'X-Frame-Options previene il clickjacking', tip4: 'Cache-Control gestisce la cache', tip5: 'Gli header CORS controllano l\'accesso cross-origin',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cosa sono gli header HTTP?', faq1a: 'Sono coppie chiave-valore che forniscono metadati sulla richiesta o risposta.',
    faq2q: 'Perche gli header di sicurezza sono importanti?', faq2a: 'Proteggono da XSS, clickjacking e attacchi man-in-the-middle.',
    faq3q: 'Come vedere gli header?', faq3a: 'Tramite DevTools del browser, curl -I o strumenti online.',
    faq4q: 'Differenza tra request e response?', faq4a: 'Gli header di request sono inviati dal client, quelli di response dal server.',
    faq5q: 'E gratuito?', faq5a: 'Si, completamente gratuito. L\'analisi avviene nel browser.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Analisador de Cabecalhos HTTP',
    description: 'Analise cabecalhos de resposta HTTP. Entenda o proposito e as implicacoes de seguranca.',
    inputLabel: 'Cole os cabecalhos HTTP', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'Analisar', clear: 'Limpar', loadSample: 'Carregar exemplo',
    results: 'Resultados da analise', headerName: 'Cabecalho', headerValue: 'Valor', category: 'Categoria', explanation: 'Explicacao',
    security: 'Seguranca', caching: 'Cache', content: 'Conteudo', cors: 'CORS', general: 'Geral', statusLine: 'Linha de status',
    securityScore: 'Pontuacao de seguranca', securityGood: 'Bom', securityWarning: 'Medio', securityBad: 'Ruim',
    missingHeaders: 'Cabecalhos recomendados ausentes', totalHeaders: 'Total de cabecalhos',
    noHeaders: 'Nenhum cabecalho analisado. Cole os cabecalhos HTTP acima.',
    introTitle: 'Analisador de cabecalhos HTTP gratuito', introText: 'Analise cabecalhos de resposta HTTP para entender seu proposito e verificar configuracoes de seguranca.',
    tipTitle: 'Cabecalhos HTTP importantes', tip1: 'CSP previne ataques XSS', tip2: 'HSTS forca HTTPS',
    tip3: 'X-Frame-Options previne clickjacking', tip4: 'Cache-Control gerencia o cache', tip5: 'Cabecalhos CORS controlam acesso cross-origin',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que sao cabecalhos HTTP?', faq1a: 'Sao pares chave-valor que fornecem metadados sobre a requisicao ou resposta.',
    faq2q: 'Por que cabecalhos de seguranca importam?', faq2a: 'Protegem contra XSS, clickjacking e ataques man-in-the-middle.',
    faq3q: 'Como ver os cabecalhos?', faq3a: 'Via DevTools do navegador, curl -I ou ferramentas online.',
    faq4q: 'Diferenca entre request e response?', faq4a: 'Cabecalhos de request sao enviados pelo cliente, de response pelo servidor.',
    faq5q: 'E gratuito?', faq5a: 'Sim, completamente gratuito. A analise e feita no navegador.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'HTTP Header Analysator',
    description: 'Analyseer HTTP response headers. Begrijp het doel en beveiligingsimplicaties.',
    inputLabel: 'Plak HTTP headers', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'Analyseer', clear: 'Wis', loadSample: 'Laad voorbeeld',
    results: 'Analyseresultaten', headerName: 'Header', headerValue: 'Waarde', category: 'Categorie', explanation: 'Uitleg',
    security: 'Beveiliging', caching: 'Caching', content: 'Inhoud', cors: 'CORS', general: 'Algemeen', statusLine: 'Statusregel',
    securityScore: 'Beveiligingsscore', securityGood: 'Goed', securityWarning: 'Matig', securityBad: 'Slecht',
    missingHeaders: 'Ontbrekende aanbevolen headers', totalHeaders: 'Totaal headers',
    noHeaders: 'Geen headers geanalyseerd. Plak HTTP headers hierboven.',
    introTitle: 'Gratis HTTP header analyse tool', introText: 'Analyseer HTTP response headers om hun doel te begrijpen en beveiligingsinstellingen te controleren.',
    tipTitle: 'Belangrijke HTTP headers', tip1: 'CSP voorkomt XSS-aanvallen', tip2: 'HSTS dwingt HTTPS af',
    tip3: 'X-Frame-Options voorkomt clickjacking', tip4: 'Cache-Control beheert caching', tip5: 'CORS headers controleren cross-origin toegang',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat zijn HTTP headers?', faq1a: 'HTTP headers zijn sleutel-waardeparen die metadata over het verzoek of antwoord bieden.',
    faq2q: 'Waarom zijn beveiligingsheaders belangrijk?', faq2a: 'Ze beschermen tegen XSS, clickjacking en man-in-the-middle aanvallen.',
    faq3q: 'Hoe zie ik HTTP headers?', faq3a: 'Via browser DevTools, curl -I of online tools.',
    faq4q: 'Verschil request en response?', faq4a: 'Request headers worden door de client verzonden, response headers door de server.',
    faq5q: 'Is het gratis?', faq5a: 'Ja, volledig gratis. De analyse gebeurt in uw browser.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Analizator Naglowkow HTTP',
    description: 'Analizuj naglowki odpowiedzi HTTP. Poznaj cel i implikacje bezpieczenstwa.',
    inputLabel: 'Wklej naglowki HTTP', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'Analizuj', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad',
    results: 'Wyniki analizy', headerName: 'Naglowek', headerValue: 'Wartosc', category: 'Kategoria', explanation: 'Wyjasnienie',
    security: 'Bezpieczenstwo', caching: 'Cache', content: 'Zawartosc', cors: 'CORS', general: 'Ogolne', statusLine: 'Linia statusu',
    securityScore: 'Ocena bezpieczenstwa', securityGood: 'Dobra', securityWarning: 'Srednia', securityBad: 'Slaba',
    missingHeaders: 'Brakujace zalecane naglowki', totalHeaders: 'Laczna liczba naglowkow',
    noHeaders: 'Brak przeanalizowanych naglowkow. Wklej naglowki HTTP powyzej.',
    introTitle: 'Darmowy analizator naglowkow HTTP', introText: 'Analizuj naglowki odpowiedzi HTTP aby zrozumiec ich cel i sprawdzic ustawienia bezpieczenstwa.',
    tipTitle: 'Wazne naglowki HTTP', tip1: 'CSP zapobiega atakom XSS', tip2: 'HSTS wymusza HTTPS',
    tip3: 'X-Frame-Options zapobiega clickjackingowi', tip4: 'Cache-Control zarzadza cache', tip5: 'Naglowki CORS kontroluja dostep miedzy domenami',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czym sa naglowki HTTP?', faq1a: 'Naglowki HTTP to pary klucz-wartosc dostarczajace metadane o zadaniu lub odpowiedzi.',
    faq2q: 'Dlaczego naglowki bezpieczenstwa?', faq2a: 'Chronia przed XSS, clickjackingiem i atakami man-in-the-middle.',
    faq3q: 'Jak zobaczyc naglowki?', faq3a: 'Przez DevTools przegladarki, curl -I lub narzedzia online.',
    faq4q: 'Roznica miedzy request a response?', faq4a: 'Naglowki request sa wysylane przez klienta, response przez serwer.',
    faq5q: 'Czy jest darmowe?', faq5a: 'Tak, calkowicie darmowe. Analiza odbywa sie w przegladarce.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'HTTP Header Analysator',
    description: 'Analysera HTTP-svarshuvuden. Foerstaa syftet och saekerhetskimplikationer.',
    inputLabel: 'Klistra in HTTP headers', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'Analysera', clear: 'Rensa', loadSample: 'Ladda exempel',
    results: 'Analysresultat', headerName: 'Header', headerValue: 'Vaerde', category: 'Kategori', explanation: 'Foerklaring',
    security: 'Saekerhet', caching: 'Cachning', content: 'Innehall', cors: 'CORS', general: 'Allmaent', statusLine: 'Statusrad',
    securityScore: 'Saekerhetsbedoemning', securityGood: 'Bra', securityWarning: 'Medel', securityBad: 'Daalig',
    missingHeaders: 'Saknade rekommenderade headers', totalHeaders: 'Totalt headers',
    noHeaders: 'Inga headers analyserade. Klistra in HTTP headers ovan.',
    introTitle: 'Gratis HTTP header analysator', introText: 'Analysera HTTP-svarshuvuden foer att foerstaa deras syfte och kontrollera saekerhetsinstallningar.',
    tipTitle: 'Viktiga HTTP headers', tip1: 'CSP foerhindrar XSS-attacker', tip2: 'HSTS tvingar HTTPS',
    tip3: 'X-Frame-Options foerhindrar clickjacking', tip4: 'Cache-Control hanterar cachning', tip5: 'CORS headers styr cross-origin aatkomst',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer HTTP headers?', faq1a: 'HTTP headers aer nyckel-vaerdepar som tillhandahaaller metadata om begaeran eller svaret.',
    faq2q: 'Varfoer aer saekerhedsheaders viktiga?', faq2a: 'De skyddar mot XSS, clickjacking och man-in-the-middle-attacker.',
    faq3q: 'Hur ser man HTTP headers?', faq3a: 'Via webblaesarens DevTools, curl -I eller onlineverktyg.',
    faq4q: 'Skillnad mellan request och response?', faq4a: 'Request headers skickas av klienten, response headers av servern.',
    faq5q: 'Aer det gratis?', faq5a: 'Ja, helt gratis. Analysen sker i din webblaesare.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'HTTP Header Analyseverktoy',
    description: 'Analyser HTTP-svarhoder. Forstaa formalet og sikkerhetsimplikasjoner.',
    inputLabel: 'Lim inn HTTP headers', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'Analyser', clear: 'Toem', loadSample: 'Last eksempel',
    results: 'Analyseresultater', headerName: 'Header', headerValue: 'Verdi', category: 'Kategori', explanation: 'Forklaring',
    security: 'Sikkerhet', caching: 'Caching', content: 'Innhold', cors: 'CORS', general: 'Generelt', statusLine: 'Statuslinje',
    securityScore: 'Sikkerhetsvurdering', securityGood: 'God', securityWarning: 'Middels', securityBad: 'Svak',
    missingHeaders: 'Manglende anbefalte headers', totalHeaders: 'Totalt headers',
    noHeaders: 'Ingen headers analysert. Lim inn HTTP headers ovenfor.',
    introTitle: 'Gratis HTTP header analyseverktoy', introText: 'Analyser HTTP-svarhoder for aa forstaa deres formaal og kontrollere sikkerhetsinnstillinger.',
    tipTitle: 'Viktige HTTP headers', tip1: 'CSP forebygger XSS-angrep', tip2: 'HSTS tvinger HTTPS',
    tip3: 'X-Frame-Options forebygger clickjacking', tip4: 'Cache-Control styrer caching', tip5: 'CORS headers styrer cross-origin tilgang',
    faqTitle: 'Ofte stilte sporsmaal',
    faq1q: 'Hva er HTTP headers?', faq1a: 'HTTP headers er nokkel-verdi-par som gir metadata om foresporselen eller svaret.',
    faq2q: 'Hvorfor er sikkerhetsheaders viktige?', faq2a: 'De beskytter mot XSS, clickjacking og man-in-the-middle-angrep.',
    faq3q: 'Hvordan se HTTP headers?', faq3a: 'Via nettleserens DevTools, curl -I eller nettbaserte verktoy.',
    faq4q: 'Forskjell mellom request og response?', faq4a: 'Request headers sendes av klienten, response headers av serveren.',
    faq5q: 'Er det gratis?', faq5a: 'Ja, helt gratis. Analysen skjer i nettleseren din.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Penganalisis Header HTTP',
    description: 'Parse dan analisis header respons HTTP. Pahami tujuan dan implikasi keamanan.',
    inputLabel: 'Tempel Header HTTP', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'Analisis', clear: 'Hapus', loadSample: 'Muat contoh',
    results: 'Hasil analisis', headerName: 'Header', headerValue: 'Nilai', category: 'Kategori', explanation: 'Penjelasan',
    security: 'Keamanan', caching: 'Caching', content: 'Konten', cors: 'CORS', general: 'Umum', statusLine: 'Baris status',
    securityScore: 'Skor keamanan', securityGood: 'Baik', securityWarning: 'Sedang', securityBad: 'Buruk',
    missingHeaders: 'Header rekomendasi yang hilang', totalHeaders: 'Total header',
    noHeaders: 'Tidak ada header yang dianalisis. Tempel header HTTP di atas.',
    introTitle: 'Penganalisis header HTTP gratis', introText: 'Analisis header respons HTTP untuk memahami tujuannya dan memeriksa pengaturan keamanan.',
    tipTitle: 'Header HTTP penting', tip1: 'CSP mencegah serangan XSS', tip2: 'HSTS memaksa HTTPS',
    tip3: 'X-Frame-Options mencegah clickjacking', tip4: 'Cache-Control mengatur caching', tip5: 'Header CORS mengontrol akses lintas asal',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu header HTTP?', faq1a: 'Header HTTP adalah pasangan kunci-nilai yang menyediakan metadata tentang permintaan atau respons.',
    faq2q: 'Mengapa header keamanan penting?', faq2a: 'Melindungi dari XSS, clickjacking, dan serangan man-in-the-middle.',
    faq3q: 'Cara melihat header HTTP?', faq3a: 'Melalui DevTools browser, curl -I, atau alat online.',
    faq4q: 'Perbedaan request dan response?', faq4a: 'Header request dikirim oleh klien, header response oleh server.',
    faq5q: 'Apakah gratis?', faq5a: 'Ya, sepenuhnya gratis. Analisis dilakukan di browser Anda.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือวิเคราะห์ HTTP Header',
    description: 'แยกวิเคราะห์ HTTP Response Headers ดูจุดประสงค์และผลกระทบด้านความปลอดภัย',
    inputLabel: 'วาง HTTP Headers', inputPlaceholder: 'HTTP/1.1 200 OK\nContent-Type: text/html\n...',
    analyze: 'วิเคราะห์', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง',
    results: 'ผลการวิเคราะห์', headerName: 'Header', headerValue: 'ค่า', category: 'หมวดหมู่', explanation: 'คำอธิบาย',
    security: 'ความปลอดภัย', caching: 'แคช', content: 'เนื้อหา', cors: 'CORS', general: 'ทั่วไป', statusLine: 'บรรทัดสถานะ',
    securityScore: 'คะแนนความปลอดภัย', securityGood: 'ดี', securityWarning: 'ปานกลาง', securityBad: 'ต่ำ',
    missingHeaders: 'Header ที่แนะนำที่ขาดหายไป', totalHeaders: 'จำนวน Header ทั้งหมด',
    noHeaders: 'ยังไม่มี Header ที่วิเคราะห์ กรุณาวาง HTTP Headers ด้านบน',
    introTitle: 'เครื่องมือวิเคราะห์ HTTP Header ฟรี', introText: 'วิเคราะห์ HTTP Response Headers เพื่อทำความเข้าใจจุดประสงค์และตรวจสอบการตั้งค่าความปลอดภัย',
    tipTitle: 'HTTP Header ที่สำคัญ', tip1: 'CSP ป้องกันการโจมตี XSS', tip2: 'HSTS บังคับใช้ HTTPS',
    tip3: 'X-Frame-Options ป้องกัน clickjacking', tip4: 'Cache-Control จัดการแคช', tip5: 'CORS Header ควบคุมการเข้าถึงข้ามต้นทาง',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'HTTP Header คืออะไร?', faq1a: 'HTTP Header เป็นคู่คีย์-ค่าที่ให้ข้อมูลเมตาเกี่ยวกับคำขอหรือการตอบกลับ',
    faq2q: 'ทำไม Header ความปลอดภัยจึงสำคัญ?', faq2a: 'ป้องกันการโจมตี XSS, clickjacking และ man-in-the-middle',
    faq3q: 'ดู HTTP Header ได้อย่างไร?', faq3a: 'ผ่าน DevTools ของเบราว์เซอร์, curl -I หรือเครื่องมือออนไลน์',
    faq4q: 'ความแตกต่างระหว่าง request และ response?', faq4a: 'Header request ส่งโดยไคลเอนต์ ส่วน response ส่งโดยเซิร์ฟเวอร์',
    faq5q: 'ฟรีไหม?', faq5a: 'ใช่ ฟรีทั้งหมด การวิเคราะห์ทำในเบราว์เซอร์ของคุณ',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

interface ParsedHeader {
  name: string;
  value: string;
  category: string;
  explanation: string;
}

const HEADER_DB: Record<string, { category: string; explanation: string }> = {
  'content-type': { category: 'content', explanation: 'Specifies the media type and character encoding of the response body. Tells the browser how to interpret the data.' },
  'content-length': { category: 'content', explanation: 'Indicates the size of the response body in bytes. Helps the client know when the transfer is complete.' },
  'content-encoding': { category: 'content', explanation: 'Specifies the compression algorithm used (gzip, br, deflate). Reduces transfer size for faster loading.' },
  'content-language': { category: 'content', explanation: 'Describes the language(s) of the intended audience for the content.' },
  'content-disposition': { category: 'content', explanation: 'Indicates if content should be displayed inline or downloaded as an attachment with a specific filename.' },
  'cache-control': { category: 'caching', explanation: 'Directives for caching mechanisms. Controls how, where, and for how long the response is cached by browsers and proxies.' },
  'expires': { category: 'caching', explanation: 'Date/time after which the response is considered stale. Superseded by Cache-Control max-age.' },
  'etag': { category: 'caching', explanation: 'A unique identifier for a specific version of a resource. Used for conditional requests to avoid re-downloading unchanged content.' },
  'last-modified': { category: 'caching', explanation: 'Date when the resource was last modified. Used with If-Modified-Since for conditional caching.' },
  'vary': { category: 'caching', explanation: 'Lists request headers that affect the response. Tells caches to store separate versions based on these headers.' },
  'age': { category: 'caching', explanation: 'Seconds the response has been in a proxy cache. Helps determine cache freshness.' },
  'pragma': { category: 'caching', explanation: 'HTTP/1.0 caching directive. Use Cache-Control instead for HTTP/1.1 compliance.' },
  'strict-transport-security': { category: 'security', explanation: 'Forces browsers to only connect via HTTPS for a specified duration. Prevents protocol downgrade attacks and cookie hijacking.' },
  'content-security-policy': { category: 'security', explanation: 'Controls which resources the browser is allowed to load. Primary defense against XSS and data injection attacks.' },
  'x-frame-options': { category: 'security', explanation: 'Controls whether the page can be displayed in iframes. Prevents clickjacking attacks. Values: DENY, SAMEORIGIN.' },
  'x-content-type-options': { category: 'security', explanation: 'Prevents browsers from MIME-sniffing the content type. Set to "nosniff" to enforce the declared Content-Type.' },
  'x-xss-protection': { category: 'security', explanation: 'Legacy XSS filter for older browsers. Modern browsers rely on CSP instead. Set to "1; mode=block" if used.' },
  'referrer-policy': { category: 'security', explanation: 'Controls how much referrer information is sent with requests. Protects user privacy and prevents information leakage.' },
  'permissions-policy': { category: 'security', explanation: 'Controls which browser features and APIs can be used in the page. Restricts access to camera, microphone, geolocation, etc.' },
  'x-permitted-cross-domain-policies': { category: 'security', explanation: 'Controls which cross-domain policies are allowed (Flash/PDF). Set to "none" for maximum security.' },
  'cross-origin-embedder-policy': { category: 'security', explanation: 'Controls whether the document can load cross-origin resources. Required for SharedArrayBuffer and high-resolution timers.' },
  'cross-origin-opener-policy': { category: 'security', explanation: 'Controls whether a document can be referenced by cross-origin windows. Isolates browsing context for security.' },
  'cross-origin-resource-policy': { category: 'security', explanation: 'Controls which origins can load this resource. Prevents cross-origin reads of the resource.' },
  'access-control-allow-origin': { category: 'cors', explanation: 'Specifies which origins can access this resource. Use * for public APIs or specific origins for restricted access.' },
  'access-control-allow-methods': { category: 'cors', explanation: 'Lists HTTP methods allowed in CORS requests. Sent in response to preflight OPTIONS requests.' },
  'access-control-allow-headers': { category: 'cors', explanation: 'Lists headers allowed in CORS requests. Sent in response to preflight OPTIONS requests.' },
  'access-control-max-age': { category: 'cors', explanation: 'How long (seconds) the preflight response can be cached. Reduces preflight requests for better performance.' },
  'access-control-expose-headers': { category: 'cors', explanation: 'Lists headers that the browser is allowed to read from the response in cross-origin requests.' },
  'access-control-allow-credentials': { category: 'cors', explanation: 'Indicates whether credentials (cookies, auth headers) can be sent in cross-origin requests.' },
  'server': { category: 'general', explanation: 'Identifies the web server software. Consider removing or obfuscating to reduce information disclosure.' },
  'date': { category: 'general', explanation: 'The date and time the response was generated by the server.' },
  'connection': { category: 'general', explanation: 'Controls whether the network connection stays open (keep-alive) or closes after the response.' },
  'transfer-encoding': { category: 'general', explanation: 'Specifies the encoding used to transfer the response body (e.g., chunked for streaming responses).' },
  'set-cookie': { category: 'general', explanation: 'Sets a cookie on the client. Important attributes: Secure, HttpOnly, SameSite, Path, Domain, Max-Age.' },
  'location': { category: 'general', explanation: 'URL to redirect the client to. Used with 3xx status codes for redirects.' },
  'x-powered-by': { category: 'general', explanation: 'Identifies the technology/framework. Consider removing to reduce information disclosure about your stack.' },
  'x-request-id': { category: 'general', explanation: 'Unique identifier for the request. Useful for debugging and tracing requests across services.' },
};

const SECURITY_HEADERS = [
  'strict-transport-security', 'content-security-policy', 'x-frame-options',
  'x-content-type-options', 'referrer-policy', 'permissions-policy',
];

const SAMPLE_HEADERS = `HTTP/2 200 OK
content-type: text/html; charset=utf-8
cache-control: public, max-age=3600, s-maxage=86400
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-frame-options: SAMEORIGIN
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=()
content-encoding: gzip
vary: Accept-Encoding
etag: "abc123"
server: nginx/1.24
x-powered-by: Next.js
set-cookie: session=xyz; Secure; HttpOnly; SameSite=Strict
access-control-allow-origin: https://example.com
date: Sat, 22 Feb 2026 12:00:00 GMT`;

export default function HttpHeaderAnalyzer() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [headers, setHeaders] = useState<ParsedHeader[]>([]);
  const [statusLine, setStatusLine] = useState('');

  const parseHeaders = useCallback((raw: string) => {
    const lines = raw.trim().split('\n').map(l => l.trim()).filter(Boolean);
    const parsed: ParsedHeader[] = [];
    let status = '';

    for (const line of lines) {
      if (line.match(/^HTTP\/[\d.]+\s+\d+/i)) {
        status = line;
        continue;
      }
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) continue;
      const name = line.substring(0, colonIdx).trim();
      const value = line.substring(colonIdx + 1).trim();
      const key = name.toLowerCase();
      const info = HEADER_DB[key];
      parsed.push({
        name,
        value,
        category: info?.category || 'general',
        explanation: info?.explanation || 'Custom or less common HTTP header.',
      });
    }

    setStatusLine(status);
    setHeaders(parsed);
  }, []);

  const handleAnalyze = () => { if (input.trim()) parseHeaders(input); };
  const handleLoadSample = () => { setInput(SAMPLE_HEADERS); parseHeaders(SAMPLE_HEADERS); };
  const handleClear = () => { setInput(''); setHeaders([]); setStatusLine(''); };

  const headerKeys = headers.map(h => h.name.toLowerCase());
  const missingSecHeaders = SECURITY_HEADERS.filter(h => !headerKeys.includes(h));
  const securityCount = SECURITY_HEADERS.filter(h => headerKeys.includes(h)).length;
  const securityPct = SECURITY_HEADERS.length > 0 ? Math.round((securityCount / SECURITY_HEADERS.length) * 100) : 0;

  const getCatColor = (cat: string) => {
    switch (cat) {
      case 'security': return '#ef4444';
      case 'caching': return '#f59e0b';
      case 'content': return '#3b82f6';
      case 'cors': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getCatLabel = (cat: string) => t[cat as keyof typeof t] || t.general;

  const resultText = headers.map(h => `${h.name}: ${h.value}`).join('\n');

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
    <ToolLayout title={t.title} description={t.description} toolId="http-header-analyzer">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.inputLabel}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          rows={10}
          style={{ width: '100%', padding: '10px 12px', fontSize: 13, fontFamily: 'monospace', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleAnalyze} className="btn btn-primary">{t.analyze}</button>
        <button onClick={handleLoadSample} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={handleClear} className="btn btn-secondary">{t.clear}</button>
      </div>

      {/* Results */}
      {headers.length > 0 ? (
        <>
          {/* Status line */}
          {statusLine && (
            <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', fontSize: 13, fontFamily: 'monospace' }}>
              <strong>{t.statusLine}:</strong> {statusLine}
            </div>
          )}

          {/* Security score */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ padding: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.securityScore}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: securityPct >= 80 ? '#22c55e' : securityPct >= 50 ? '#f59e0b' : '#ef4444' }}>
                {securityPct}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                {securityPct >= 80 ? t.securityGood : securityPct >= 50 ? t.securityWarning : t.securityBad}
              </div>
              <div style={{ marginTop: 8, height: 6, borderRadius: 3, background: 'var(--border-color)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${securityPct}%`, borderRadius: 3, background: securityPct >= 80 ? '#22c55e' : securityPct >= 50 ? '#f59e0b' : '#ef4444', transition: 'width 0.3s' }} />
              </div>
            </div>
            <div style={{ padding: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.totalHeaders}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{headers.length}</div>
              {missingSecHeaders.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 600, marginBottom: 4 }}>{t.missingHeaders}:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {missingSecHeaders.map(h => (
                      <span key={h} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontFamily: 'monospace' }}>{h}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Header results */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.results}</label>
            <CopyButton text={resultText} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {headers.map((h, i) => (
              <div key={i} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: getCatColor(h.category), color: '#fff', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    {getCatLabel(h.category)}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{h.name}</span>
                </div>
                <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)', wordBreak: 'break-all' }}>
                  {h.value}
                </div>
                <div style={{ padding: '8px 14px', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {h.explanation}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', padding: 20, textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: 8, marginBottom: 16 }}>
          {t.noHeaders}
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/http-status`, label: 'HTTP Status Codes' },
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
            { href: `/${lang}/tools/csp-generator`, label: 'CSP Generator' },
            { href: `/${lang}/tools/curl-to-code`, label: 'cURL to Code' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
