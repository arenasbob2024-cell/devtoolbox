'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JWT Debugger',
    description: 'Decode and inspect JWT tokens. View header, payload, signature, and expiration status.',
    tokenInput: 'JWT Token',
    tokenPlaceholder: 'Paste your JWT token here...',
    header: 'Header',
    payload: 'Payload',
    signature: 'Signature',
    decoded: 'Decoded',
    encoded: 'Encoded',
    algorithm: 'Algorithm',
    issuedAt: 'Issued At',
    expiresAt: 'Expires At',
    notBefore: 'Not Before',
    issuer: 'Issuer',
    subject: 'Subject',
    audience: 'Audience',
    expired: 'Expired',
    valid: 'Valid',
    notYetValid: 'Not Yet Valid',
    status: 'Token Status',
    sampleToken: 'Load Sample',
    clear: 'Clear',
    invalid: 'Invalid JWT token',
    claims: 'Standard Claims',
    custom: 'Custom Claims',
    introTitle: 'Free Online JWT Debugger',
    introText: 'Decode and inspect JSON Web Tokens (JWT) instantly. View the decoded header, payload, and signature verification status. Check token expiration, standard claims like iss, sub, aud, iat, exp, and any custom claims. All decoding happens in your browser with no data sent to any server.',
    tipTitle: 'JWT Tips',
    tip1: 'JWTs have three parts: header, payload, and signature, separated by dots',
    tip2: 'The header contains the algorithm and token type',
    tip3: 'The payload carries the claims (data) of the token',
    tip4: 'Always verify the signature server-side before trusting a JWT',
    tip5: 'Check exp (expiration) and iat (issued at) claims for token validity',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a JWT token?',
    faq1a: 'A JSON Web Token (JWT) is a compact, URL-safe token format used for securely transmitting information between parties. It consists of three Base64-encoded parts: a header (algorithm and type), a payload (claims/data), and a signature for verification.',
    faq2q: 'Is it safe to paste my JWT here?',
    faq2a: 'Yes, all JWT decoding happens entirely in your browser. No data is sent to any server. JWTs are not encrypted by default (they are only Base64-encoded), so anyone with the token can read the payload. Never put sensitive secrets in JWT payloads.',
    faq3q: 'What are JWT claims?',
    faq3a: 'Claims are statements about the user and metadata. Standard claims include iss (issuer), sub (subject), aud (audience), exp (expiration time), iat (issued at), and nbf (not before). Custom claims can contain any application-specific data.',
    faq4q: 'Can this tool verify JWT signatures?',
    faq4a: 'This tool decodes and displays JWT contents but does not verify cryptographic signatures, as that requires the signing key/secret which should never be shared client-side. Always verify signatures on your server.',
    faq5q: 'Is this tool free?',
    faq5a: 'Yes, completely free. All processing happens in your browser with no account or API key required.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JWT 调试器',
    description: '解码和检查 JWT 令牌。查看头部、载荷、签名和过期状态。',
    tokenInput: 'JWT 令牌', tokenPlaceholder: '在此粘贴 JWT 令牌...', header: '头部', payload: '载荷', signature: '签名',
    decoded: '已解码', encoded: '已编码', algorithm: '算法', issuedAt: '签发时间', expiresAt: '过期时间', notBefore: '生效时间',
    issuer: '签发者', subject: '主体', audience: '受众', expired: '已过期', valid: '有效', notYetValid: '尚未生效',
    status: '令牌状态', sampleToken: '加载示例', clear: '清除', invalid: '无效的 JWT 令牌',
    claims: '标准声明', custom: '自定义声明',
    introTitle: '免费在线 JWT 调试器', introText: '即时解码和检查 JSON Web Token。查看解码后的头部、载荷和签名验证状态。所有解码都在浏览器端完成。',
    tipTitle: '提示', tip1: 'JWT 由三部分组成：头部、载荷和签名，以点号分隔', tip2: '头部包含算法和令牌类型', tip3: '载荷携带令牌的声明（数据）', tip4: '始终在服务器端验证签名', tip5: '检查 exp 和 iat 声明以验证令牌有效性',
    faqTitle: '常见问题',
    faq1q: '什么是 JWT？', faq1a: 'JWT 是一种紧凑的、URL 安全的令牌格式，用于在各方之间安全传输信息。它由三个 Base64 编码部分组成。',
    faq2q: '在这里粘贴 JWT 安全吗？', faq2a: '是的，所有 JWT 解码完全在浏览器中完成。不会向任何服务器发送数据。',
    faq3q: '什么是 JWT 声明？', faq3a: '声明是关于用户和元数据的陈述。标准声明包括 iss、sub、aud、exp、iat 和 nbf。',
    faq4q: '能验证签名吗？', faq4a: '此工具解码和显示 JWT 内容，但不验证加密签名。请在服务器端验证签名。',
    faq5q: '免费吗？', faq5a: '完全免费。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Debogueur JWT', description: 'Decodez et inspectez les tokens JWT.',
    tokenInput: 'Token JWT', tokenPlaceholder: 'Collez votre token JWT ici...', header: 'En-tete', payload: 'Charge utile', signature: 'Signature',
    decoded: 'Decode', encoded: 'Encode', algorithm: 'Algorithme', issuedAt: 'Emis le', expiresAt: 'Expire le', notBefore: 'Pas avant',
    issuer: 'Emetteur', subject: 'Sujet', audience: 'Audience', expired: 'Expire', valid: 'Valide', notYetValid: 'Pas encore valide',
    status: 'Statut du token', sampleToken: 'Charger exemple', clear: 'Effacer', invalid: 'Token JWT invalide',
    claims: 'Claims standards', custom: 'Claims personnalises',
    introTitle: 'Debogueur JWT gratuit', introText: 'Decodez et inspectez les tokens JWT instantanement. Tout le decodage se fait dans votre navigateur.',
    tipTitle: 'Conseils', tip1: 'Les JWT ont trois parties separees par des points', tip2: 'L\'en-tete contient l\'algorithme', tip3: 'La charge utile contient les donnees', tip4: 'Verifiez toujours la signature cote serveur', tip5: 'Verifiez les claims exp et iat',
    faqTitle: 'FAQ', faq1q: 'Qu\'est-ce qu\'un JWT?', faq1a: 'Un JWT est un format de token compact et securise pour transmettre des informations.',
    faq2q: 'Est-ce sur de coller mon JWT ici?', faq2a: 'Oui, tout le decodage se fait dans votre navigateur.',
    faq3q: 'Que sont les claims?', faq3a: 'Les claims sont des declarations sur l\'utilisateur et les metadonnees.',
    faq4q: 'Peut-on verifier les signatures?', faq4a: 'Cet outil decode mais ne verifie pas les signatures cryptographiques.',
    faq5q: 'Est-ce gratuit?', faq5a: 'Oui, entierement gratuit.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JWT Debugger', description: 'JWT-Token dekodieren und inspizieren.',
    tokenInput: 'JWT-Token', tokenPlaceholder: 'JWT-Token hier einfuegen...', header: 'Header', payload: 'Payload', signature: 'Signatur',
    decoded: 'Dekodiert', encoded: 'Kodiert', algorithm: 'Algorithmus', issuedAt: 'Ausgestellt am', expiresAt: 'Laeuft ab am', notBefore: 'Nicht vor',
    issuer: 'Aussteller', subject: 'Betreff', audience: 'Zielgruppe', expired: 'Abgelaufen', valid: 'Gueltig', notYetValid: 'Noch nicht gueltig',
    status: 'Token-Status', sampleToken: 'Beispiel laden', clear: 'Loeschen', invalid: 'Ungueltiger JWT-Token',
    claims: 'Standard-Claims', custom: 'Benutzerdefinierte Claims',
    introTitle: 'Kostenloser JWT Debugger', introText: 'JWT-Token sofort dekodieren und inspizieren.',
    tipTitle: 'Tipps', tip1: 'JWTs haben drei Teile, getrennt durch Punkte', tip2: 'Der Header enthaelt den Algorithmus', tip3: 'Der Payload traegt die Daten', tip4: 'Signatur immer serverseitig verifizieren', tip5: 'exp und iat Claims pruefen',
    faqTitle: 'FAQ', faq1q: 'Was ist ein JWT?', faq1a: 'Ein JWT ist ein kompaktes, URL-sicheres Token-Format.',
    faq2q: 'Ist es sicher, meinen JWT hier einzufuegen?', faq2a: 'Ja, alles wird im Browser dekodiert.',
    faq3q: 'Was sind Claims?', faq3a: 'Claims sind Aussagen ueber den Benutzer und Metadaten.',
    faq4q: 'Kann die Signatur verifiziert werden?', faq4a: 'Dieses Tool dekodiert, verifiziert aber keine kryptographischen Signaturen.',
    faq5q: 'Ist es kostenlos?', faq5a: 'Ja, komplett kostenlos.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Depurador JWT', description: 'Decodifique e inspeccione tokens JWT.',
    tokenInput: 'Token JWT', tokenPlaceholder: 'Pegue su token JWT aqui...', header: 'Cabecera', payload: 'Carga util', signature: 'Firma',
    decoded: 'Decodificado', encoded: 'Codificado', algorithm: 'Algoritmo', issuedAt: 'Emitido el', expiresAt: 'Expira el', notBefore: 'No antes de',
    issuer: 'Emisor', subject: 'Sujeto', audience: 'Audiencia', expired: 'Expirado', valid: 'Valido', notYetValid: 'Aun no valido',
    status: 'Estado del token', sampleToken: 'Cargar ejemplo', clear: 'Limpiar', invalid: 'Token JWT invalido',
    claims: 'Claims estandar', custom: 'Claims personalizados',
    introTitle: 'Depurador JWT gratuito', introText: 'Decodifique e inspeccione tokens JWT instantaneamente.',
    tipTitle: 'Consejos', tip1: 'Los JWT tienen tres partes separadas por puntos', tip2: 'La cabecera contiene el algoritmo', tip3: 'La carga util lleva los datos', tip4: 'Siempre verifique la firma en el servidor', tip5: 'Verifique los claims exp e iat',
    faqTitle: 'FAQ', faq1q: 'Que es un JWT?', faq1a: 'Un JWT es un formato de token compacto y seguro.',
    faq2q: 'Es seguro pegar mi JWT aqui?', faq2a: 'Si, todo se decodifica en su navegador.',
    faq3q: 'Que son los claims?', faq3a: 'Los claims son declaraciones sobre el usuario y metadatos.',
    faq4q: 'Se puede verificar la firma?', faq4a: 'Esta herramienta decodifica pero no verifica firmas criptograficas.',
    faq5q: 'Es gratis?', faq5a: 'Si, completamente gratis.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'JWT Debugger', description: 'Decodifica e ispeziona token JWT.',
    tokenInput: 'Token JWT', tokenPlaceholder: 'Incolla il token JWT qui...', header: 'Header', payload: 'Payload', signature: 'Firma',
    decoded: 'Decodificato', encoded: 'Codificato', algorithm: 'Algoritmo', issuedAt: 'Emesso il', expiresAt: 'Scade il', notBefore: 'Non prima di',
    issuer: 'Emittente', subject: 'Soggetto', audience: 'Audience', expired: 'Scaduto', valid: 'Valido', notYetValid: 'Non ancora valido',
    status: 'Stato del token', sampleToken: 'Carica esempio', clear: 'Cancella', invalid: 'Token JWT non valido',
    claims: 'Claims standard', custom: 'Claims personalizzati',
    introTitle: 'JWT Debugger gratuito', introText: 'Decodifica e ispeziona token JWT istantaneamente.',
    tipTitle: 'Suggerimenti', tip1: 'I JWT hanno tre parti separate da punti', tip2: 'L\'header contiene l\'algoritmo', tip3: 'Il payload porta i dati', tip4: 'Verifica sempre la firma lato server', tip5: 'Controlla i claims exp e iat',
    faqTitle: 'FAQ', faq1q: 'Cos\'e un JWT?', faq1a: 'Un JWT e un formato di token compatto e sicuro.',
    faq2q: 'E sicuro incollare il mio JWT qui?', faq2a: 'Si, tutto viene decodificato nel browser.',
    faq3q: 'Cosa sono i claims?', faq3a: 'I claims sono dichiarazioni sull\'utente e metadati.',
    faq4q: 'Si puo verificare la firma?', faq4a: 'Questo strumento decodifica ma non verifica le firme crittografiche.',
    faq5q: 'E gratuito?', faq5a: 'Si, completamente gratuito.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Depurador JWT', description: 'Decodifique e inspecione tokens JWT.',
    tokenInput: 'Token JWT', tokenPlaceholder: 'Cole seu token JWT aqui...', header: 'Cabecalho', payload: 'Payload', signature: 'Assinatura',
    decoded: 'Decodificado', encoded: 'Codificado', algorithm: 'Algoritmo', issuedAt: 'Emitido em', expiresAt: 'Expira em', notBefore: 'Nao antes de',
    issuer: 'Emissor', subject: 'Assunto', audience: 'Audiencia', expired: 'Expirado', valid: 'Valido', notYetValid: 'Ainda nao valido',
    status: 'Estado do token', sampleToken: 'Carregar exemplo', clear: 'Limpar', invalid: 'Token JWT invalido',
    claims: 'Claims padrao', custom: 'Claims personalizados',
    introTitle: 'Depurador JWT gratuito', introText: 'Decodifique e inspecione tokens JWT instantaneamente.',
    tipTitle: 'Dicas', tip1: 'JWTs tem tres partes separadas por pontos', tip2: 'O cabecalho contem o algoritmo', tip3: 'O payload carrega os dados', tip4: 'Sempre verifique a assinatura no servidor', tip5: 'Verifique os claims exp e iat',
    faqTitle: 'FAQ', faq1q: 'O que e um JWT?', faq1a: 'Um JWT e um formato de token compacto e seguro.',
    faq2q: 'E seguro colar meu JWT aqui?', faq2a: 'Sim, tudo e decodificado no navegador.',
    faq3q: 'O que sao claims?', faq3a: 'Claims sao declaracoes sobre o usuario e metadados.',
    faq4q: 'Pode verificar a assinatura?', faq4a: 'Esta ferramenta decodifica mas nao verifica assinaturas criptograficas.',
    faq5q: 'E gratuito?', faq5a: 'Sim, completamente gratuito.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'JWT Debugger', description: 'Decodeer en inspecteer JWT-tokens.',
    tokenInput: 'JWT-token', tokenPlaceholder: 'Plak uw JWT-token hier...', header: 'Header', payload: 'Payload', signature: 'Handtekening',
    decoded: 'Gedecodeerd', encoded: 'Gecodeerd', algorithm: 'Algoritme', issuedAt: 'Uitgegeven op', expiresAt: 'Verloopt op', notBefore: 'Niet voor',
    issuer: 'Uitgever', subject: 'Onderwerp', audience: 'Doelgroep', expired: 'Verlopen', valid: 'Geldig', notYetValid: 'Nog niet geldig',
    status: 'Tokenstatus', sampleToken: 'Voorbeeld laden', clear: 'Wis', invalid: 'Ongeldig JWT-token',
    claims: 'Standaard claims', custom: 'Aangepaste claims',
    introTitle: 'Gratis JWT debugger', introText: 'Decodeer en inspecteer JWT-tokens direct.',
    tipTitle: 'Tips', tip1: 'JWTs hebben drie delen gescheiden door punten', tip2: 'De header bevat het algoritme', tip3: 'De payload bevat de data', tip4: 'Verifieer altijd de handtekening server-side', tip5: 'Controleer de exp en iat claims',
    faqTitle: 'FAQ', faq1q: 'Wat is een JWT?', faq1a: 'Een JWT is een compact, URL-veilig tokenformaat.',
    faq2q: 'Is het veilig om mijn JWT hier te plakken?', faq2a: 'Ja, alles wordt in uw browser gedecodeerd.',
    faq3q: 'Wat zijn claims?', faq3a: 'Claims zijn verklaringen over de gebruiker en metadata.',
    faq4q: 'Kan de handtekening geverifieerd worden?', faq4a: 'Deze tool decodeert maar verifieert geen cryptografische handtekeningen.',
    faq5q: 'Is het gratis?', faq5a: 'Ja, volledig gratis.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Debugger JWT', description: 'Dekoduj i sprawdzaj tokeny JWT.',
    tokenInput: 'Token JWT', tokenPlaceholder: 'Wklej token JWT tutaj...', header: 'Naglowek', payload: 'Payload', signature: 'Podpis',
    decoded: 'Zdekodowany', encoded: 'Zakodowany', algorithm: 'Algorytm', issuedAt: 'Wydany', expiresAt: 'Wygasa', notBefore: 'Nie przed',
    issuer: 'Wydawca', subject: 'Temat', audience: 'Odbiorcy', expired: 'Wygasl', valid: 'Wazny', notYetValid: 'Jeszcze nie wazny',
    status: 'Status tokena', sampleToken: 'Zaladuj przyklad', clear: 'Wyczysc', invalid: 'Nieprawidlowy token JWT',
    claims: 'Standardowe claims', custom: 'Niestandardowe claims',
    introTitle: 'Darmowy debugger JWT', introText: 'Dekoduj i sprawdzaj tokeny JWT natychmiast.',
    tipTitle: 'Wskazowki', tip1: 'JWT ma trzy czesci rozdzielone kropkami', tip2: 'Naglowek zawiera algorytm', tip3: 'Payload przenosi dane', tip4: 'Zawsze weryfikuj podpis po stronie serwera', tip5: 'Sprawdz claims exp i iat',
    faqTitle: 'FAQ', faq1q: 'Czym jest JWT?', faq1a: 'JWT to kompaktowy, bezpieczny format tokena.',
    faq2q: 'Czy bezpiecznie wklejac JWT tutaj?', faq2a: 'Tak, wszystko dekodowane jest w przegladarce.',
    faq3q: 'Czym sa claims?', faq3a: 'Claims to deklaracje o uzytkowniku i metadanych.',
    faq4q: 'Mozna zweryfikowac podpis?', faq4a: 'To narzedzie dekoduje ale nie weryfikuje podpisow kryptograficznych.',
    faq5q: 'Czy jest darmowe?', faq5a: 'Tak, calkowicie darmowe.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'JWT Debugger', description: 'Avkoda och inspektera JWT-tokens.',
    tokenInput: 'JWT-token', tokenPlaceholder: 'Klistra in din JWT-token haer...', header: 'Header', payload: 'Payload', signature: 'Signatur',
    decoded: 'Avkodad', encoded: 'Kodad', algorithm: 'Algoritm', issuedAt: 'Utfaerdad', expiresAt: 'Upphör', notBefore: 'Inte foere',
    issuer: 'Utfaerdare', subject: 'Aemne', audience: 'Maalgrupp', expired: 'Utgaangen', valid: 'Giltig', notYetValid: 'Inte giltig aen',
    status: 'Tokenstatus', sampleToken: 'Ladda exempel', clear: 'Rensa', invalid: 'Ogiltig JWT-token',
    claims: 'Standard claims', custom: 'Anpassade claims',
    introTitle: 'Gratis JWT debugger', introText: 'Avkoda och inspektera JWT-tokens direkt.',
    tipTitle: 'Tips', tip1: 'JWTs har tre delar separerade med punkter', tip2: 'Headern innehaaller algoritmen', tip3: 'Payloaden baer datan', tip4: 'Verifiera alltid signaturen serversidigt', tip5: 'Kontrollera exp och iat claims',
    faqTitle: 'FAQ', faq1q: 'Vad aer en JWT?', faq1a: 'En JWT aer ett kompakt, URL-saekert tokenformat.',
    faq2q: 'Aer det saekert att klistra in min JWT haer?', faq2a: 'Ja, allt avkodas i din webblaesare.',
    faq3q: 'Vad aer claims?', faq3a: 'Claims aer uttalanden om anvaendaren och metadata.',
    faq4q: 'Kan signaturen verifieras?', faq4a: 'Detta verktyg avkodar men verifierar inte kryptografiska signaturer.',
    faq5q: 'Aer det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'JWT Debugger', description: 'Dekod og inspiser JWT-tokens.',
    tokenInput: 'JWT-token', tokenPlaceholder: 'Lim inn JWT-token her...', header: 'Header', payload: 'Payload', signature: 'Signatur',
    decoded: 'Dekodet', encoded: 'Kodet', algorithm: 'Algoritme', issuedAt: 'Utstedt', expiresAt: 'Utloeper', notBefore: 'Ikke foer',
    issuer: 'Utsteder', subject: 'Emne', audience: 'Maalgruppe', expired: 'Utloept', valid: 'Gyldig', notYetValid: 'Ikke gyldig ennaa',
    status: 'Tokenstatus', sampleToken: 'Last eksempel', clear: 'Toem', invalid: 'Ugyldig JWT-token',
    claims: 'Standard claims', custom: 'Tilpassede claims',
    introTitle: 'Gratis JWT debugger', introText: 'Dekod og inspiser JWT-tokens umiddelbart.',
    tipTitle: 'Tips', tip1: 'JWTs har tre deler adskilt med punkter', tip2: 'Headeren inneholder algoritmen', tip3: 'Payloaden baerer dataene', tip4: 'Verifiser alltid signaturen serversidigt', tip5: 'Sjekk exp og iat claims',
    faqTitle: 'FAQ', faq1q: 'Hva er en JWT?', faq1a: 'En JWT er et kompakt, URL-sikkert tokenformat.',
    faq2q: 'Er det trygt aa lime inn JWT her?', faq2a: 'Ja, alt dekodes i nettleseren din.',
    faq3q: 'Hva er claims?', faq3a: 'Claims er utsagn om brukeren og metadata.',
    faq4q: 'Kan signaturen verifiseres?', faq4a: 'Dette verktoeyet dekoder men verifiserer ikke kryptografiske signaturer.',
    faq5q: 'Er det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: 'JWT デバッガー', description: 'JWTトークンをデコード・検査。',
    tokenInput: 'JWT トークン', tokenPlaceholder: 'JWTトークンをここに貼り付け...', header: 'ヘッダー', payload: 'ペイロード', signature: '署名',
    decoded: 'デコード済', encoded: 'エンコード済', algorithm: 'アルゴリズム', issuedAt: '発行日時', expiresAt: '有効期限', notBefore: '有効開始',
    issuer: '発行者', subject: '件名', audience: '対象', expired: '期限切れ', valid: '有効', notYetValid: 'まだ有効でない',
    status: 'トークンステータス', sampleToken: 'サンプル', clear: 'クリア', invalid: '無効なJWTトークン',
    claims: '標準クレーム', custom: 'カスタムクレーム',
    introTitle: '無料JWTデバッガー', introText: 'JWTトークンを即座にデコード・検査。',
    tipTitle: 'ヒント', tip1: 'JWTは3つの部分からなる', tip2: 'ヘッダーにアルゴリズム', tip3: 'ペイロードにデータ', tip4: 'サーバー側で署名を検証', tip5: 'expとiatクレームを確認',
    faqTitle: 'FAQ', faq1q: 'JWTとは？', faq1a: 'JWTはコンパクトなURLセーフなトークン形式です。',
    faq2q: 'ここに貼り付けても安全？', faq2a: 'はい、全てブラウザでデコードされます。',
    faq3q: 'クレームとは？', faq3a: 'クレームはユーザーとメタデータに関する宣言です。',
    faq4q: '署名を検証できる？', faq4a: 'デコードしますが暗号署名の検証はしません。',
    faq5q: '無料ですか？', faq5a: 'はい、完全に無料です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JWT 디버거', description: 'JWT 토큰을 디코딩하고 검사합니다.',
    tokenInput: 'JWT 토큰', tokenPlaceholder: 'JWT 토큰을 여기에 붙여넣으세요...', header: '헤더', payload: '페이로드', signature: '서명',
    decoded: '디코딩됨', encoded: '인코딩됨', algorithm: '알고리즘', issuedAt: '발급 시간', expiresAt: '만료 시간', notBefore: '유효 시작',
    issuer: '발급자', subject: '주체', audience: '대상', expired: '만료됨', valid: '유효', notYetValid: '아직 유효하지 않음',
    status: '토큰 상태', sampleToken: '샘플 로드', clear: '지우기', invalid: '잘못된 JWT 토큰',
    claims: '표준 클레임', custom: '사용자 정의 클레임',
    introTitle: '무료 JWT 디버거', introText: 'JWT 토큰을 즉시 디코딩하고 검사합니다.',
    tipTitle: '팁', tip1: 'JWT는 점으로 구분된 3부분으로 구성', tip2: '헤더에 알고리즘 포함', tip3: '페이로드에 데이터 포함', tip4: '서버 측에서 서명 검증', tip5: 'exp와 iat 클레임 확인',
    faqTitle: 'FAQ', faq1q: 'JWT란?', faq1a: 'JWT는 컴팩트하고 URL 안전한 토큰 형식입니다.',
    faq2q: '여기에 붙여넣어도 안전한가요?', faq2a: '네, 모든 것이 브라우저에서 디코딩됩니다.',
    faq3q: '클레임이란?', faq3a: '클레임은 사용자와 메타데이터에 대한 선언입니다.',
    faq4q: '서명을 검증할 수 있나요?', faq4a: '디코딩하지만 암호화 서명은 검증하지 않습니다.',
    faq5q: '무료인가요?', faq5a: '네, 완전히 무료입니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'JWT Debugger', description: 'Dekode dan periksa token JWT.',
    tokenInput: 'Token JWT', tokenPlaceholder: 'Tempel token JWT di sini...', header: 'Header', payload: 'Payload', signature: 'Tanda tangan',
    decoded: 'Didekode', encoded: 'Dikode', algorithm: 'Algoritma', issuedAt: 'Diterbitkan', expiresAt: 'Kedaluwarsa', notBefore: 'Tidak sebelum',
    issuer: 'Penerbit', subject: 'Subjek', audience: 'Audiens', expired: 'Kedaluwarsa', valid: 'Valid', notYetValid: 'Belum valid',
    status: 'Status token', sampleToken: 'Muat contoh', clear: 'Hapus', invalid: 'Token JWT tidak valid',
    claims: 'Claims standar', custom: 'Claims kustom',
    introTitle: 'JWT Debugger gratis', introText: 'Dekode dan periksa token JWT secara instan.',
    tipTitle: 'Tips', tip1: 'JWT memiliki tiga bagian dipisahkan titik', tip2: 'Header berisi algoritma', tip3: 'Payload membawa data', tip4: 'Selalu verifikasi tanda tangan di server', tip5: 'Periksa claims exp dan iat',
    faqTitle: 'FAQ', faq1q: 'Apa itu JWT?', faq1a: 'JWT adalah format token yang kompak dan aman.',
    faq2q: 'Aman menempelkan JWT di sini?', faq2a: 'Ya, semua didekode di browser Anda.',
    faq3q: 'Apa itu claims?', faq3a: 'Claims adalah pernyataan tentang pengguna dan metadata.',
    faq4q: 'Bisa memverifikasi tanda tangan?', faq4a: 'Alat ini mendekode tetapi tidak memverifikasi tanda tangan kriptografi.',
    faq5q: 'Apakah gratis?', faq5a: 'Ya, sepenuhnya gratis.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'JWT Debugger', description: 'ถอดรหัสและตรวจสอบ JWT Token',
    tokenInput: 'JWT Token', tokenPlaceholder: 'วาง JWT Token ที่นี่...', header: 'Header', payload: 'Payload', signature: 'ลายเซ็น',
    decoded: 'ถอดรหัสแล้ว', encoded: 'เข้ารหัสแล้ว', algorithm: 'อัลกอริทึม', issuedAt: 'ออกเมื่อ', expiresAt: 'หมดอายุ', notBefore: 'ไม่ก่อน',
    issuer: 'ผู้ออก', subject: 'เรื่อง', audience: 'กลุ่มเป้าหมาย', expired: 'หมดอายุ', valid: 'ถูกต้อง', notYetValid: 'ยังไม่ถูกต้อง',
    status: 'สถานะ Token', sampleToken: 'โหลดตัวอย่าง', clear: 'ล้าง', invalid: 'JWT Token ไม่ถูกต้อง',
    claims: 'Claims มาตรฐาน', custom: 'Claims กำหนดเอง',
    introTitle: 'JWT Debugger ฟรี', introText: 'ถอดรหัสและตรวจสอบ JWT Token ทันที',
    tipTitle: 'เคล็ดลับ', tip1: 'JWT มีสามส่วนแยกด้วยจุด', tip2: 'Header มีอัลกอริทึม', tip3: 'Payload มีข้อมูล', tip4: 'ตรวจสอบลายเซ็นฝั่งเซิร์ฟเวอร์เสมอ', tip5: 'ตรวจสอบ claims exp และ iat',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'JWT คืออะไร?', faq1a: 'JWT เป็นรูปแบบ Token ที่กะทัดรัดและปลอดภัย',
    faq2q: 'วาง JWT ที่นี่ปลอดภัยไหม?', faq2a: 'ใช่ ทุกอย่างถอดรหัสในเบราว์เซอร์ของคุณ',
    faq3q: 'Claims คืออะไร?', faq3a: 'Claims เป็นการประกาศเกี่ยวกับผู้ใช้และ metadata',
    faq4q: 'ตรวจสอบลายเซ็นได้ไหม?', faq4a: 'เครื่องมือนี้ถอดรหัสแต่ไม่ตรวจสอบลายเซ็นเข้ารหัส',
    faq5q: 'ฟรีไหม?', faq5a: 'ใช่ ฟรีทั้งหมด',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const SAMPLE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjIsImlzcyI6ImRldnRvb2xib3giLCJhdWQiOiJ2aWFkcmVhbXMuY2MiLCJyb2xlIjoiYWRtaW4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4;
  const final = pad ? padded + '='.repeat(4 - pad) : padded;
  try { return decodeURIComponent(atob(final).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')); }
  catch { return atob(final); }
}

function decodeJwt(token: string): { header: Record<string, unknown>; payload: Record<string, unknown>; sig: string } | null {
  const parts = token.trim().split('.');
  if (parts.length !== 3) return null;
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return { header, payload, sig: parts[2] };
  } catch { return null; }
}

function formatTimestamp(ts: number): string {
  try { return new Date(ts * 1000).toLocaleString(); } catch { return String(ts); }
}

const STANDARD_CLAIMS = ['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti'];

export default function JwtDebugger() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [token, setToken] = useState(SAMPLE_TOKEN);

  const decoded = useMemo(() => decodeJwt(token), [token]);

  const tokenStatus = useMemo(() => {
    if (!decoded) return null;
    const now = Math.floor(Date.now() / 1000);
    const exp = decoded.payload.exp as number | undefined;
    const nbf = decoded.payload.nbf as number | undefined;
    if (exp && exp < now) return 'expired';
    if (nbf && nbf > now) return 'notYetValid';
    return 'valid';
  }, [decoded]);

  const statusColor = tokenStatus === 'valid' ? '#22c55e' : tokenStatus === 'expired' ? '#ef4444' : '#f59e0b';
  const statusLabel = tokenStatus ? t[tokenStatus] : '';

  const customClaims = useMemo(() => {
    if (!decoded) return {};
    const custom: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(decoded.payload)) {
      if (!STANDARD_CLAIMS.includes(k)) custom[k] = v;
    }
    return custom;
  }, [decoded]);

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="jwt-debugger">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Token input */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.tokenInput}</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setToken(SAMPLE_TOKEN)} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{t.sampleToken}</button>
            <button onClick={() => setToken('')} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{t.clear}</button>
          </div>
        </div>
        <textarea value={token} onChange={e => setToken(e.target.value)} rows={4} placeholder={t.tokenPlaceholder}
          style={{ width: '100%', padding: '12px 14px', fontSize: 12, borderRadius: 8, border: `1px solid ${!token || decoded ? 'var(--border-color)' : '#ef4444'}`, background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'monospace', resize: 'vertical', lineHeight: 1.5, wordBreak: 'break-all' }} />
        {token && !decoded && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{t.invalid}</div>}
      </div>

      {decoded && (
        <>
          {/* Status */}
          <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 8, background: `${statusColor}15`, border: `1px solid ${statusColor}30`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: statusColor }}>{t.status}: {statusLabel}</div>
              {typeof decoded.payload.exp === 'number' && <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{t.expiresAt}: {formatTimestamp(decoded.payload.exp)}</div>}
            </div>
          </div>

          {/* Header */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>
                {t.header}
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 400, marginLeft: 8 }}>{t.algorithm}: {String(decoded.header.alg || 'N/A')}</span>
              </label>
              <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
            </div>
            <pre style={{ background: '#0a0a0a', color: '#f59e0b', padding: 16, borderRadius: 8, fontSize: 12, fontFamily: 'monospace', overflow: 'auto', lineHeight: 1.5, border: '1px solid var(--border-color)', margin: 0 }}>
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{t.payload}</label>
              <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
            </div>
            <pre style={{ background: '#0a0a0a', color: '#22c55e', padding: 16, borderRadius: 8, fontSize: 12, fontFamily: 'monospace', overflow: 'auto', lineHeight: 1.5, border: '1px solid var(--border-color)', margin: 0 }}>
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          {/* Claims table */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.claims}</label>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <tbody>
                  {decoded.payload.iss !== undefined && (
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)', width: 120 }}>{t.issuer} (iss)</td>
                      <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{String(decoded.payload.iss)}</td>
                    </tr>
                  )}
                  {decoded.payload.sub !== undefined && (
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)', width: 120 }}>{t.subject} (sub)</td>
                      <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{String(decoded.payload.sub)}</td>
                    </tr>
                  )}
                  {decoded.payload.aud !== undefined && (
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)', width: 120 }}>{t.audience} (aud)</td>
                      <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{String(decoded.payload.aud)}</td>
                    </tr>
                  )}
                  {decoded.payload.iat !== undefined && (
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)', width: 120 }}>{t.issuedAt} (iat)</td>
                      <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{formatTimestamp(decoded.payload.iat as number)}</td>
                    </tr>
                  )}
                  {decoded.payload.exp !== undefined && (
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)', width: 120 }}>{t.expiresAt} (exp)</td>
                      <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: statusColor }}>{formatTimestamp(decoded.payload.exp as number)}</td>
                    </tr>
                  )}
                  {decoded.payload.nbf !== undefined && (
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)', width: 120 }}>{t.notBefore} (nbf)</td>
                      <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{formatTimestamp(decoded.payload.nbf as number)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom claims */}
          {Object.keys(customClaims).length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.custom}</label>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <tbody>
                    {Object.entries(customClaims).map(([k, v]) => (
                      <tr key={k} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)', width: 120 }}>{k}</td>
                        <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{typeof v === 'object' ? JSON.stringify(v) : String(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Signature */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.signature}</label>
            <div style={{ padding: '12px 14px', borderRadius: 8, background: 'var(--bg-input)', border: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: 11, color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
              {decoded.sig}
            </div>
          </div>
        </>
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
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/jwt-decoder`, label: 'JWT Decoder' },
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/hmac-generator`, label: 'HMAC Generator' },
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
