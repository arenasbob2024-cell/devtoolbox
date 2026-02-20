'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'JWT vs Session',
    description: 'A detailed comparison of JWT tokens and session-based authentication to help you choose the right approach.',
    intro: 'JWT (JSON Web Tokens) and session-based authentication are two fundamental approaches to managing user authentication in web applications. Each has distinct trade-offs in terms of scalability, security, and complexity.',
    tableFeature: 'Feature', tableJwt: 'JWT', tableSession: 'Session',
    storage: 'Storage', stoJwt: 'Client-side (browser)', stoSes: 'Server-side (database/memory)',
    stateless: 'Stateless', staJwt: 'Yes (self-contained)', staSes: 'No (requires server lookup)',
    scalability: 'Scalability', scaJwt: 'Excellent (no shared state)', scaSes: 'Requires session store sharing',
    size: 'Token/Cookie Size', sizJwt: 'Larger (~800+ bytes)', sizSes: 'Small (~32 bytes session ID)',
    revocation: 'Revocation', revJwt: 'Difficult (needs blocklist)', revSes: 'Easy (delete from store)',
    expiry: 'Expiry', expJwt: 'Built-in (exp claim)', expSes: 'Server-controlled TTL',
    whatIsJwt: 'What is JWT?',
    jwtText: 'JSON Web Token (JWT) is a compact, URL-safe token format defined in RFC 7519. A JWT contains three parts: header, payload, and signature, encoded as Base64url strings separated by dots. The payload carries claims (user ID, roles, expiration) and the signature ensures the token has not been tampered with. JWTs are self-contained, meaning the server can validate them without a database lookup.',
    whatIsSession: 'What is Session-Based Auth?',
    sessionText: 'Session-based authentication stores user state on the server. When a user logs in, the server creates a session record (in memory, database, or Redis) and sends a session ID cookie to the browser. On subsequent requests, the browser sends the cookie and the server looks up the session to identify the user. This approach gives the server full control over active sessions.',
    whenJwt: 'When to Use JWT',
    jwtUse1: 'Microservices and distributed systems',
    jwtUse2: 'Single Sign-On (SSO) across domains',
    jwtUse3: 'Mobile app and SPA authentication',
    jwtUse4: 'Serverless / stateless architectures',
    jwtUse5: 'Short-lived API authorization tokens',
    whenSession: 'When to Use Sessions',
    sesUse1: 'Traditional server-rendered web apps',
    sesUse2: 'Applications requiring immediate session revocation',
    sesUse3: 'Sensitive applications (banking, healthcare)',
    sesUse4: 'When you need to track active sessions',
    sesUse5: 'Simple monolithic applications',
    verdict: 'TL;DR / Verdict',
    verdictText: 'Use JWT for stateless, distributed systems and APIs where scalability matters. Use sessions for traditional web apps where immediate revocation and server control are important. Many production systems use a hybrid approach with short-lived JWTs and refresh tokens stored server-side.',
    tryTools: 'Try Our JWT Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Are JWTs more secure than sessions?',
    faq1a: 'Neither is inherently more secure. JWTs are harder to revoke but eliminate server-side session storage attacks. Sessions are easier to revoke but require secure session store management. Security depends on implementation: use HTTPS, HttpOnly cookies, short expiration times, and proper signing algorithms (RS256 or ES256).',
    faq2q: 'Can I store JWTs in localStorage?',
    faq2a: 'Storing JWTs in localStorage is generally discouraged because it is vulnerable to XSS attacks. The recommended approach is to store JWTs in HttpOnly, Secure, SameSite cookies, which are not accessible to JavaScript. If you must use localStorage, ensure robust XSS protection.',
    faq3q: 'What is a refresh token?',
    faq3a: 'A refresh token is a long-lived token stored server-side (or in an HttpOnly cookie) used to obtain new short-lived access tokens (JWTs). This hybrid approach combines the statelessness of JWTs for API calls with the revocability of server-side tokens for session management.',
  },
  zh: {
    title: 'JWT vs Session',
    description: 'JWT 令牌与基于会话的认证详细对比。',
    intro: 'JWT 和基于会话的认证是 Web 应用管理用户认证的两种基本方法。各有在扩展性、安全性和复杂性方面的权衡。',
    tableFeature: '特性', tableJwt: 'JWT', tableSession: 'Session',
    storage: '存储位置', stoJwt: '客户端（浏览器）', stoSes: '服务端（数据库/内存）',
    stateless: '无状态', staJwt: '是（自包含）', staSes: '否（需要服务端查找）',
    scalability: '扩展性', scaJwt: '优秀（无共享状态）', scaSes: '需要共享会话存储',
    size: '令牌大小', sizJwt: '较大（约 800+ 字节）', sizSes: '小（约 32 字节会话 ID）',
    revocation: '撤销', revJwt: '困难（需要黑名单）', revSes: '容易（从存储中删除）',
    expiry: '过期', expJwt: '内置（exp 声明）', expSes: '服务端控制 TTL',
    whatIsJwt: '什么是 JWT？', jwtText: 'JWT 是紧凑的 URL 安全令牌格式，包含 header、payload 和 signature 三部分。自包含设计使服务端无需数据库查询即可验证。',
    whatIsSession: '什么是基于会话的认证？', sessionText: '会话认证在服务端存储用户状态。登录后服务端创建会话记录并发送会话 ID cookie。服务端对会话有完全控制权。',
    whenJwt: '何时使用 JWT', jwtUse1: '微服务和分布式系统', jwtUse2: '跨域单点登录 (SSO)', jwtUse3: '移动应用和 SPA 认证', jwtUse4: 'Serverless / 无状态架构', jwtUse5: '短期 API 授权令牌',
    whenSession: '何时使用 Session', sesUse1: '传统服务端渲染 Web 应用', sesUse2: '需要立即撤销会话的应用', sesUse3: '敏感应用（银行、医疗）', sesUse4: '需要跟踪活跃会话时', sesUse5: '简单的单体应用',
    verdict: '总结', verdictText: '分布式系统和 API 使用 JWT。需要即时撤销和服务端控制的传统 Web 应用使用 Session。很多生产系统采用混合方案。',
    tryTools: '试试我们的 JWT 工具',
    faqTitle: '常见问题',
    faq1q: 'JWT 比 Session 更安全吗？', faq1a: '两者都不是天生更安全的。安全性取决于实现：使用 HTTPS、HttpOnly cookie、短过期时间和正确的签名算法。',
    faq2q: '可以把 JWT 存在 localStorage 中吗？', faq2a: '不建议，因为容易受 XSS 攻击。推荐使用 HttpOnly、Secure、SameSite cookie。',
    faq3q: '什么是刷新令牌？', faq3a: '刷新令牌是存储在服务端的长期令牌，用于获取新的短期 JWT 访问令牌。这种混合方案结合了两者的优点。',
  },
  fr: {
    title: 'JWT vs Session', description: 'Comparaison de JWT et de l\'authentification par session.',
    intro: 'JWT et l\'authentification par session sont deux approches fondamentales pour gerer l\'authentification utilisateur.',
    tableFeature: 'Caracteristique', tableJwt: 'JWT', tableSession: 'Session',
    storage: 'Stockage', stoJwt: 'Cote client', stoSes: 'Cote serveur', stateless: 'Sans etat', staJwt: 'Oui', staSes: 'Non', scalability: 'Scalabilite', scaJwt: 'Excellente', scaSes: 'Necessite partage', size: 'Taille', sizJwt: 'Grande (~800+ octets)', sizSes: 'Petite (~32 octets)', revocation: 'Revocation', revJwt: 'Difficile', revSes: 'Facile', expiry: 'Expiration', expJwt: 'Integree', expSes: 'Controlee serveur',
    whatIsJwt: 'Qu\'est-ce que JWT ?', jwtText: 'JWT est un format de token compact contenant header, payload et signature. Auto-contenu et verifiable sans base de donnees.',
    whatIsSession: 'Qu\'est-ce que l\'auth par session ?', sessionText: 'L\'authentification par session stocke l\'etat utilisateur cote serveur avec un ID de session dans un cookie.',
    whenJwt: 'Quand utiliser JWT', jwtUse1: 'Microservices', jwtUse2: 'SSO cross-domaine', jwtUse3: 'Apps mobiles et SPA', jwtUse4: 'Architectures serverless', jwtUse5: 'Tokens API court terme',
    whenSession: 'Quand utiliser les sessions', sesUse1: 'Apps web traditionnelles', sesUse2: 'Revocation immediate requise', sesUse3: 'Applications sensibles', sesUse4: 'Suivi des sessions actives', sesUse5: 'Applications monolithiques',
    verdict: 'Resume', verdictText: 'JWT pour les systemes distribues. Sessions pour les apps web traditionnelles necessitant un controle serveur.',
    tryTools: 'Essayez nos outils JWT', faqTitle: 'Questions frequentes',
    faq1q: 'JWT est-il plus securise que les sessions ?', faq1a: 'Aucun n\'est inheremment plus securise. La securite depend de l\'implementation.',
    faq2q: 'Peut-on stocker JWT dans localStorage ?', faq2a: 'Deconseille a cause des attaques XSS. Preferez les cookies HttpOnly.',
    faq3q: 'Qu\'est-ce qu\'un refresh token ?', faq3a: 'Un token longue duree cote serveur pour obtenir de nouveaux JWT court terme.',
  },
  de: {
    title: 'JWT vs Session', description: 'Vergleich von JWT und Session-Authentifizierung.',
    intro: 'JWT und Session-Authentifizierung sind zwei grundlegende Ansaetze zur Verwaltung der Benutzerauthentifizierung.',
    tableFeature: 'Eigenschaft', tableJwt: 'JWT', tableSession: 'Session',
    storage: 'Speicherung', stoJwt: 'Client-seitig', stoSes: 'Server-seitig', stateless: 'Zustandslos', staJwt: 'Ja', staSes: 'Nein', scalability: 'Skalierbarkeit', scaJwt: 'Ausgezeichnet', scaSes: 'Erfordert gemeinsamen Speicher', size: 'Groesse', sizJwt: 'Gross (~800+ Bytes)', sizSes: 'Klein (~32 Bytes)', revocation: 'Widerruf', revJwt: 'Schwierig', revSes: 'Einfach', expiry: 'Ablauf', expJwt: 'Eingebaut', expSes: 'Server-kontrolliert',
    whatIsJwt: 'Was ist JWT?', jwtText: 'JWT ist ein kompaktes Token-Format mit Header, Payload und Signatur. Selbststaendig ohne DB-Abfrage validierbar.',
    whatIsSession: 'Was ist Session-Auth?', sessionText: 'Session-Authentifizierung speichert den Benutzerzustand serverseitig mit einer Session-ID im Cookie.',
    whenJwt: 'Wann JWT verwenden', jwtUse1: 'Microservices', jwtUse2: 'Cross-Domain SSO', jwtUse3: 'Mobile Apps und SPAs', jwtUse4: 'Serverless-Architekturen', jwtUse5: 'Kurzlebige API-Tokens',
    whenSession: 'Wann Sessions verwenden', sesUse1: 'Traditionelle Web-Apps', sesUse2: 'Sofortiger Widerruf erforderlich', sesUse3: 'Sensible Anwendungen', sesUse4: 'Aktive Sessions verfolgen', sesUse5: 'Monolithische Anwendungen',
    verdict: 'Fazit', verdictText: 'JWT fuer verteilte Systeme. Sessions fuer traditionelle Web-Apps mit Server-Kontrolle.',
    tryTools: 'Probieren Sie unsere JWT-Tools', faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Ist JWT sicherer als Sessions?', faq1a: 'Keines ist inherent sicherer. Sicherheit haengt von der Implementierung ab.',
    faq2q: 'Kann man JWT im localStorage speichern?', faq2a: 'Nicht empfohlen wegen XSS-Angriffen. Verwenden Sie HttpOnly-Cookies.',
    faq3q: 'Was ist ein Refresh-Token?', faq3a: 'Ein langlebiges serverseitiges Token zum Erhalten neuer kurzlebiger JWTs.',
  },
  es: {
    title: 'JWT vs Session', description: 'Comparacion de JWT y autenticacion basada en sesiones.',
    intro: 'JWT y la autenticacion por sesiones son dos enfoques fundamentales para gestionar la autenticacion de usuarios.',
    tableFeature: 'Caracteristica', tableJwt: 'JWT', tableSession: 'Session',
    storage: 'Almacenamiento', stoJwt: 'Cliente', stoSes: 'Servidor', stateless: 'Sin estado', staJwt: 'Si', staSes: 'No', scalability: 'Escalabilidad', scaJwt: 'Excelente', scaSes: 'Requiere almacen compartido', size: 'Tamano', sizJwt: 'Grande (~800+ bytes)', sizSes: 'Pequeno (~32 bytes)', revocation: 'Revocacion', revJwt: 'Dificil', revSes: 'Facil', expiry: 'Expiracion', expJwt: 'Integrada', expSes: 'Controlada por servidor',
    whatIsJwt: 'Que es JWT?', jwtText: 'JWT es un formato de token compacto con header, payload y firma. Auto-contenido y verificable sin base de datos.',
    whatIsSession: 'Que es la auth por sesion?', sessionText: 'La autenticacion por sesion almacena el estado del usuario en el servidor con un ID de sesion en cookie.',
    whenJwt: 'Cuando usar JWT', jwtUse1: 'Microservicios', jwtUse2: 'SSO cross-domain', jwtUse3: 'Apps moviles y SPA', jwtUse4: 'Arquitecturas serverless', jwtUse5: 'Tokens API de corta duracion',
    whenSession: 'Cuando usar sesiones', sesUse1: 'Apps web tradicionales', sesUse2: 'Revocacion inmediata requerida', sesUse3: 'Aplicaciones sensibles', sesUse4: 'Rastreo de sesiones activas', sesUse5: 'Aplicaciones monoliticas',
    verdict: 'Resumen', verdictText: 'JWT para sistemas distribuidos. Sesiones para apps web tradicionales que necesitan control del servidor.',
    tryTools: 'Prueba nuestras herramientas JWT', faqTitle: 'Preguntas frecuentes',
    faq1q: 'Es JWT mas seguro que las sesiones?', faq1a: 'Ninguno es inherentemente mas seguro. La seguridad depende de la implementacion.',
    faq2q: 'Se puede guardar JWT en localStorage?', faq2a: 'No recomendado por ataques XSS. Use cookies HttpOnly.',
    faq3q: 'Que es un refresh token?', faq3a: 'Un token de larga duracion del lado del servidor para obtener nuevos JWTs de corta duracion.',
  },
  ja: {
    title: 'JWT vs Session', description: 'JWTとセッション認証の詳細な比較。',
    intro: 'JWTとセッション認証はWebアプリケーションのユーザー認証管理の2つの基本的なアプローチです。',
    tableFeature: '特性', tableJwt: 'JWT', tableSession: 'Session',
    storage: '保存場所', stoJwt: 'クライアント側', stoSes: 'サーバー側', stateless: 'ステートレス', staJwt: 'はい', staSes: 'いいえ', scalability: 'スケーラビリティ', scaJwt: '優秀', scaSes: '共有ストア必要', size: 'サイズ', sizJwt: '大きい（約800+バイト）', sizSes: '小さい（約32バイト）', revocation: '失効', revJwt: '困難', revSes: '容易', expiry: '有効期限', expJwt: '内蔵', expSes: 'サーバー制御',
    whatIsJwt: 'JWTとは？', jwtText: 'JWTはheader、payload、signatureの3部分からなるコンパクトなトークン形式です。DBなしで検証可能。',
    whatIsSession: 'セッション認証とは？', sessionText: 'セッション認証はサーバー側にユーザー状態を保存し、セッションIDをcookieで送信します。',
    whenJwt: 'JWTを使う場合', jwtUse1: 'マイクロサービス', jwtUse2: 'クロスドメインSSO', jwtUse3: 'モバイルアプリ/SPA', jwtUse4: 'サーバーレスアーキテクチャ', jwtUse5: '短期APIトークン',
    whenSession: 'セッションを使う場合', sesUse1: '従来型Webアプリ', sesUse2: '即時失効が必要', sesUse3: '機密アプリ', sesUse4: 'アクティブセッション追跡', sesUse5: 'モノリシックアプリ',
    verdict: 'まとめ', verdictText: '分散システムにはJWT。サーバー制御が必要な従来型WebアプリにはSession。',
    tryTools: 'JWTツールを試す', faqTitle: 'よくある質問',
    faq1q: 'JWTはセッションより安全ですか？', faq1a: 'どちらが安全かは実装次第です。', faq2q: 'JWTをlocalStorageに保存できますか？', faq2a: 'XSS攻撃のリスクがあるため非推奨。HttpOnly cookieを使用してください。', faq3q: 'リフレッシュトークンとは？', faq3a: 'サーバー側に保存される長期トークンで、新しい短期JWTを取得するために使います。',
  },
  ko: {
    title: 'JWT vs Session', description: 'JWT와 세션 인증의 상세 비교.',
    intro: 'JWT와 세션 기반 인증은 웹 애플리케이션의 사용자 인증 관리를 위한 두 가지 기본 접근 방식입니다.',
    tableFeature: '특성', tableJwt: 'JWT', tableSession: 'Session',
    storage: '저장 위치', stoJwt: '클라이언트 측', stoSes: '서버 측', stateless: '무상태', staJwt: '예', staSes: '아니요', scalability: '확장성', scaJwt: '우수', scaSes: '공유 저장소 필요', size: '크기', sizJwt: '큼 (~800+ 바이트)', sizSes: '작음 (~32 바이트)', revocation: '폐기', revJwt: '어려움', revSes: '쉬움', expiry: '만료', expJwt: '내장', expSes: '서버 제어',
    whatIsJwt: 'JWT란?', jwtText: 'JWT는 header, payload, signature 3부분으로 구성된 컴팩트한 토큰 형식입니다. DB 조회 없이 검증 가능.',
    whatIsSession: '세션 인증이란?', sessionText: '세션 인증은 서버 측에 사용자 상태를 저장하고 세션 ID를 쿠키로 전송합니다.',
    whenJwt: 'JWT를 사용할 때', jwtUse1: '마이크로서비스', jwtUse2: '크로스 도메인 SSO', jwtUse3: '모바일 앱/SPA', jwtUse4: '서버리스 아키텍처', jwtUse5: '단기 API 토큰',
    whenSession: '세션을 사용할 때', sesUse1: '전통적 웹 앱', sesUse2: '즉시 폐기 필요', sesUse3: '민감한 애플리케이션', sesUse4: '활성 세션 추적', sesUse5: '모놀리식 애플리케이션',
    verdict: '요약', verdictText: '분산 시스템에는 JWT. 서버 제어가 필요한 전통적 웹 앱에는 Session.',
    tryTools: 'JWT 도구 사용해보기', faqTitle: '자주 묻는 질문',
    faq1q: 'JWT가 세션보다 안전한가요?', faq1a: '어느 쪽이 더 안전한지는 구현에 따라 다릅니다.', faq2q: 'JWT를 localStorage에 저장할 수 있나요?', faq2a: 'XSS 공격 위험이 있어 비권장. HttpOnly 쿠키를 사용하세요.', faq3q: '리프레시 토큰이란?', faq3a: '서버 측에 저장되는 장기 토큰으로, 새로운 단기 JWT를 얻는 데 사용됩니다.',
  },
};

const tableStyle = { width: '100%', borderCollapse: 'collapse' as const, fontSize: 14 };
const thStyle = { padding: '10px 14px', textAlign: 'left' as const, borderBottom: '2px solid var(--border-color)', fontWeight: 700 };
const tdStyle = { padding: '10px 14px', borderBottom: '1px solid var(--border-color)' };
const sectionStyle = { marginTop: 32 };
const h2Style = { fontSize: 22, fontWeight: 700, marginBottom: 12 };
const h3Style = { fontSize: 17, fontWeight: 600, marginBottom: 8 };
const pStyle = { fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
const ulStyle = { fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 };
const cardStyle = { background: 'var(--bg-card)', borderRadius: 12, padding: 20, border: '1px solid var(--border-color)', marginBottom: 16 };

export default function JwtVsSession() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: ui.faq1q, acceptedAnswer: { '@type': 'Answer', text: ui.faq1a } },
    { '@type': 'Question', name: ui.faq2q, acceptedAnswer: { '@type': 'Answer', text: ui.faq2a } },
    { '@type': 'Question', name: ui.faq3q, acceptedAnswer: { '@type': 'Answer', text: ui.faq3a } },
  ]};
  return (
    <ToolLayout title={ui.title} description={ui.description} toolId="jwt-vs-session">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={pStyle}>{ui.intro}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}><thead><tr><th style={thStyle}>{ui.tableFeature}</th><th style={thStyle}>{ui.tableJwt}</th><th style={thStyle}>{ui.tableSession}</th></tr></thead>
          <tbody>{[[ui.storage,ui.stoJwt,ui.stoSes],[ui.stateless,ui.staJwt,ui.staSes],[ui.scalability,ui.scaJwt,ui.scaSes],[ui.size,ui.sizJwt,ui.sizSes],[ui.revocation,ui.revJwt,ui.revSes],[ui.expiry,ui.expJwt,ui.expSes]].map(([f,a,b],i)=>(<tr key={i}><td style={{...tdStyle,fontWeight:600}}>{f}</td><td style={tdStyle}>{a}</td><td style={tdStyle}>{b}</td></tr>))}</tbody>
        </table>
      </div>
      <div style={sectionStyle}><h2 style={h2Style}>{ui.whatIsJwt}</h2><p style={pStyle}>{ui.jwtText}</p></div>
      <div style={sectionStyle}><h2 style={h2Style}>{ui.whatIsSession}</h2><p style={pStyle}>{ui.sessionText}</p></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16,...sectionStyle}}>
        <div style={cardStyle}><h3 style={h3Style}>{ui.whenJwt}</h3><ul style={ulStyle}><li>{ui.jwtUse1}</li><li>{ui.jwtUse2}</li><li>{ui.jwtUse3}</li><li>{ui.jwtUse4}</li><li>{ui.jwtUse5}</li></ul></div>
        <div style={cardStyle}><h3 style={h3Style}>{ui.whenSession}</h3><ul style={ulStyle}><li>{ui.sesUse1}</li><li>{ui.sesUse2}</li><li>{ui.sesUse3}</li><li>{ui.sesUse4}</li><li>{ui.sesUse5}</li></ul></div>
      </div>
      <div style={{...cardStyle,background:'var(--bg-input)',...sectionStyle}}><h2 style={h2Style}>{ui.verdict}</h2><p style={{...pStyle,fontWeight:500}}>{ui.verdictText}</p></div>
      <div style={sectionStyle}><h2 style={h2Style}>{ui.tryTools}</h2>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {[{href:`/${lang}/tools/jwt-decoder`,label:'JWT Decoder'},{href:`/${lang}/tools/jwt-parser`,label:'JWT Parser'},{href:`/${lang}/tools/jwt-validator`,label:'JWT Validator'},{href:`/${lang}/tools/jwt-token-decoder`,label:'JWT Token Decoder'}].map(link=>(<Link key={link.href} href={link.href} style={{display:'inline-block',padding:'8px 16px',borderRadius:8,border:'1px solid var(--border-color)',fontSize:13,color:'var(--accent-blue)',textDecoration:'none',background:'var(--bg-input)'}}>{link.label}</Link>))}
        </div>
      </div>
      <div style={sectionStyle}><h2 style={h2Style}>{ui.faqTitle}</h2>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[{q:ui.faq1q,a:ui.faq1a},{q:ui.faq2q,a:ui.faq2a},{q:ui.faq3q,a:ui.faq3a}].map((faq,idx)=>(<details key={idx} style={{border:'1px solid var(--border-color)',borderRadius:8,overflow:'hidden',background:'var(--bg-input)'}}><summary style={{padding:'14px 16px',cursor:'pointer',fontSize:14,fontWeight:600}}>{faq.q}</summary><div style={{padding:'0 16px 14px',fontSize:13,lineHeight:1.7,color:'var(--text-secondary)'}}>{faq.a}</div></details>))}
        </div>
      </div>
    </ToolLayout>
  );
}
