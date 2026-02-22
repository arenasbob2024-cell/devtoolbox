'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const decodeBase64Url = (str: string): string => {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  return atob(b64);
};

function decodeJwt(token: string) {
  const parts = token.trim().split('.');
  if (parts.length !== 3) throw new Error('invalidFormat');
  const header = JSON.parse(decodeBase64Url(parts[0]));
  const payload = JSON.parse(decodeBase64Url(parts[1]));
  return { header, payload, signature: parts[2] };
}

function formatExpiration(exp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = exp - now;
  if (diff < 0) return `Expired ${Math.abs(Math.floor(diff / 3600))}h ago`;
  if (diff < 3600) return `Expires in ${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `Expires in ${Math.floor(diff / 3600)}h`;
  return `Expires in ${Math.floor(diff / 86400)}d`;
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JWT Decoder Online',
    description: 'Decode JWT tokens online for free. View header, payload, claims, and signature. Check expiration time and validate JWT structure instantly.',
    inputLabel: 'Paste JWT Token',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'Decode JWT',
    sampleBtn: 'Load Sample',
    clear: 'Clear',
    headerLabel: 'Header (JOSE)',
    payloadLabel: 'Payload (Claims)',
    signatureLabel: 'Signature',
    expiredLabel: 'Token Status',
    errorInvalid: 'Invalid JWT format. A JWT must have exactly 3 parts separated by dots.',
    errorParse: 'Failed to decode JWT. Please check your token.',
    introTitle: 'Free Online JWT Decoder',
    introText: 'Decode any JSON Web Token (JWT) instantly in your browser. This tool parses the Base64URL-encoded header and payload, displays all claims, and checks token expiration. All processing happens client-side for maximum security.',
    howTitle: 'How to Decode a JWT Token',
    step1: 'Copy your JWT token from your application, API response, or browser developer tools',
    step2: 'Paste the token into the input field above',
    step3: 'Click "Decode JWT" to see the header, payload, and signature',
    step4: 'Review the claims including issuer (iss), subject (sub), and expiration (exp)',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Is it safe to decode JWT tokens online?',
    faq1a: 'Yes, this JWT decoder processes everything in your browser. Your token is never sent to any server. However, remember that JWT headers and payloads are only Base64URL-encoded (not encrypted), so avoid putting sensitive information in JWTs.',
    faq2q: 'What is the difference between decoding and verifying a JWT?',
    faq2a: 'Decoding a JWT means reading the header and payload by Base64URL-decoding them. Anyone with the token can do this. Verifying a JWT means checking the signature using the secret key or public key to confirm the token has not been tampered with. This tool decodes JWTs but does not verify signatures.',
    faq3q: 'How do I know if my JWT token has expired?',
    faq3a: 'Look at the "exp" (expiration) claim in the payload. It contains a Unix timestamp indicating when the token expires. This tool automatically checks the expiration and shows whether your token is still valid or has expired.',
    faq4q: 'What are the common JWT claims?',
    faq4a: 'The most common registered JWT claims are: iss (issuer), sub (subject/user ID), aud (audience), exp (expiration time), nbf (not before), iat (issued at), and jti (JWT ID). Applications may also include custom claims like "role", "email", or "name".',
    relatedTitle: 'Related JWT Tools',
  },
  zh: {
    title: 'JWT 在线解码器',
    description: '免费在线解码 JWT 令牌。查看 Header、Payload、Claims 和签名。即时检查过期时间和验证 JWT 结构。',
    inputLabel: '粘贴 JWT Token',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: '解码 JWT',
    sampleBtn: '加载示例',
    clear: '清除',
    headerLabel: 'Header（JOSE 头部）',
    payloadLabel: 'Payload（Claims 声明）',
    signatureLabel: 'Signature（签名）',
    expiredLabel: '令牌状态',
    errorInvalid: '无效的 JWT 格式。JWT 必须包含由点分隔的三个部分。',
    errorParse: '解码 JWT 失败。请检查您的令牌。',
    introTitle: '免费在线 JWT 解码器',
    introText: '在浏览器中即时解码任何 JSON Web Token (JWT)。此工具解析 Base64URL 编码的 header 和 payload，显示所有 claims，并检查令牌过期时间。所有处理在客户端完成，确保最大安全性。',
    howTitle: '如何解码 JWT Token',
    step1: '从您的应用程序、API 响应或浏览器开发者工具中复制 JWT 令牌',
    step2: '将令牌粘贴到上方的输入框中',
    step3: '点击"解码 JWT"查看 header、payload 和 signature',
    step4: '查看 claims，包括 issuer (iss)、subject (sub) 和 expiration (exp)',
    faqTitle: '常见问题',
    faq1q: '在线解码 JWT 令牌安全吗？',
    faq1a: '是的，此 JWT 解码器完全在浏览器中处理。您的令牌不会被发送到任何服务器。但请记住，JWT 的 header 和 payload 只是 Base64URL 编码的（未加密），因此避免在 JWT 中放置敏感信息。',
    faq2q: '解码和验证 JWT 有什么区别？',
    faq2a: '解码 JWT 是通过 Base64URL 解码来读取 header 和 payload。任何拥有令牌的人都可以这样做。验证 JWT 是使用密钥或公钥检查签名以确认令牌未被篡改。此工具解码 JWT 但不验证签名。',
    faq3q: '如何知道 JWT 令牌是否过期？',
    faq3a: '查看 payload 中的 "exp"（过期时间）claim。它包含一个 Unix 时间戳，指示令牌何时过期。此工具会自动检查过期时间并显示令牌是否仍然有效。',
    faq4q: '常见的 JWT Claims 有哪些？',
    faq4a: '最常见的注册 JWT claims 是：iss（发行者）、sub（主题/用户 ID）、aud（受众）、exp（过期时间）、nbf（生效时间）、iat（签发时间）和 jti（JWT ID）。',
    relatedTitle: '相关 JWT 工具',
  },
  fr: {
    title: 'Decodeur JWT en Ligne',
    description: 'Decodez des tokens JWT en ligne gratuitement. Visualisez header, payload, claims et signature instantanement.',
    inputLabel: 'Collez le Token JWT', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'Decoder JWT', sampleBtn: 'Charger un exemple', clear: 'Effacer',
    headerLabel: 'Header (JOSE)', payloadLabel: 'Payload (Claims)', signatureLabel: 'Signature',
    expiredLabel: 'Statut du token',
    errorInvalid: 'Format JWT invalide. Un JWT doit comporter 3 parties separees par des points.',
    errorParse: 'Echec du decodage JWT. Verifiez votre token.',
    introTitle: 'Decodeur JWT gratuit en ligne',
    introText: 'Decodez n\'importe quel JSON Web Token instantanement dans votre navigateur. Tout le traitement est cote client.',
    howTitle: 'Comment decoder un token JWT',
    step1: 'Copiez votre token JWT depuis votre application ou outils developpeur',
    step2: 'Collez le token dans le champ ci-dessus',
    step3: 'Cliquez sur "Decoder JWT" pour voir header, payload et signature',
    step4: 'Examinez les claims incluant issuer, subject et expiration',
    faqTitle: 'Questions frequentes',
    faq1q: 'Est-il securise de decoder des JWT en ligne ?',
    faq1a: 'Oui, ce decodeur traite tout dans votre navigateur. Votre token n\'est jamais envoye a un serveur.',
    faq2q: 'Quelle difference entre decoder et verifier un JWT ?',
    faq2a: 'Decoder signifie lire le header et payload. Verifier signifie controler la signature avec la cle secrete.',
    faq3q: 'Comment savoir si mon JWT a expire ?',
    faq3a: 'Regardez le claim "exp" dans le payload. Cet outil verifie automatiquement l\'expiration.',
    faq4q: 'Quels sont les claims JWT courants ?',
    faq4a: 'Les claims enregistres les plus courants sont : iss, sub, aud, exp, nbf, iat et jti.',
    relatedTitle: 'Outils JWT connexes',
  },
  de: {
    title: 'JWT Decoder Online',
    description: 'JWT-Tokens kostenlos online dekodieren. Header, Payload, Claims und Signatur sofort anzeigen.',
    inputLabel: 'JWT Token einfuegen', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'JWT dekodieren', sampleBtn: 'Beispiel laden', clear: 'Loeschen',
    headerLabel: 'Header (JOSE)', payloadLabel: 'Payload (Claims)', signatureLabel: 'Signatur',
    expiredLabel: 'Token-Status',
    errorInvalid: 'Ungueltiges JWT-Format. Ein JWT muss genau 3 Teile haben.',
    errorParse: 'JWT-Dekodierung fehlgeschlagen. Bitte Token ueberpruefen.',
    introTitle: 'Kostenloser Online JWT Decoder',
    introText: 'Dekodieren Sie jeden JSON Web Token sofort in Ihrem Browser. Alle Verarbeitungen erfolgen clientseitig.',
    howTitle: 'Wie man einen JWT Token dekodiert',
    step1: 'Kopieren Sie Ihren JWT Token aus Ihrer Anwendung',
    step2: 'Fuegen Sie den Token in das Eingabefeld ein',
    step3: 'Klicken Sie auf "JWT dekodieren"',
    step4: 'Ueberpruefen Sie die Claims',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Ist es sicher, JWT online zu dekodieren?',
    faq1a: 'Ja, dieser Decoder verarbeitet alles in Ihrem Browser. Ihr Token wird nie an einen Server gesendet.',
    faq2q: 'Was ist der Unterschied zwischen Dekodieren und Verifizieren?',
    faq2a: 'Dekodieren bedeutet Header und Payload lesen. Verifizieren bedeutet die Signatur mit dem Schluessel pruefen.',
    faq3q: 'Wie weiss ich, ob mein JWT abgelaufen ist?',
    faq3a: 'Schauen Sie sich den "exp" Claim im Payload an. Dieses Tool prueft automatisch die Gueltigkeitsdauer.',
    faq4q: 'Was sind die gaengigen JWT Claims?',
    faq4a: 'Die gaengigsten registrierten Claims sind: iss, sub, aud, exp, nbf, iat und jti.',
    relatedTitle: 'Verwandte JWT-Tools',
  },
  es: {
    title: 'JWT Decoder Online',
    description: 'Decodifica tokens JWT en linea gratis. Visualiza header, payload, claims y firma al instante.',
    inputLabel: 'Pegar Token JWT', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'Decodificar JWT', sampleBtn: 'Cargar ejemplo', clear: 'Limpiar',
    headerLabel: 'Header (JOSE)', payloadLabel: 'Payload (Claims)', signatureLabel: 'Firma',
    expiredLabel: 'Estado del token',
    errorInvalid: 'Formato JWT invalido. Un JWT debe tener exactamente 3 partes.',
    errorParse: 'Error al decodificar JWT. Verifica tu token.',
    introTitle: 'Decodificador JWT gratuito en linea',
    introText: 'Decodifica cualquier JSON Web Token al instante en tu navegador. Todo el procesamiento es del lado del cliente.',
    howTitle: 'Como decodificar un token JWT',
    step1: 'Copia tu token JWT de tu aplicacion',
    step2: 'Pega el token en el campo de entrada',
    step3: 'Haz clic en "Decodificar JWT"',
    step4: 'Revisa los claims',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Es seguro decodificar JWT en linea?',
    faq1a: 'Si, este decodificador procesa todo en tu navegador. Tu token nunca se envia a ningun servidor.',
    faq2q: 'Cual es la diferencia entre decodificar y verificar?',
    faq2a: 'Decodificar significa leer el header y payload. Verificar significa comprobar la firma con la clave secreta.',
    faq3q: 'Como se si mi JWT ha expirado?',
    faq3a: 'Mira el claim "exp" en el payload. Esta herramienta verifica automaticamente la expiracion.',
    faq4q: 'Cuales son los claims JWT comunes?',
    faq4a: 'Los claims registrados mas comunes son: iss, sub, aud, exp, nbf, iat y jti.',
    relatedTitle: 'Herramientas JWT relacionadas',
  },
  ja: {
    title: 'JWT デコーダーオンライン',
    description: 'JWTトークンを無料でオンラインデコード。ヘッダー、ペイロード、クレーム、署名を即座に表示。',
    inputLabel: 'JWTトークンを貼り付け', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'JWTをデコード', sampleBtn: 'サンプル読込', clear: 'クリア',
    headerLabel: 'ヘッダー (JOSE)', payloadLabel: 'ペイロード (クレーム)', signatureLabel: '署名',
    expiredLabel: 'トークン状態',
    errorInvalid: '無効なJWT形式です。JWTはドットで区切られた3部分が必要です。',
    errorParse: 'JWTのデコードに失敗しました。トークンを確認してください。',
    introTitle: '無料オンラインJWTデコーダー',
    introText: 'ブラウザで即座にJSON Web Tokenをデコードします。すべての処理はクライアントサイドで行われます。',
    howTitle: 'JWTトークンのデコード方法',
    step1: 'アプリケーションからJWTトークンをコピー',
    step2: '入力フィールドにトークンを貼り付け',
    step3: '「JWTをデコード」をクリック',
    step4: 'クレームを確認',
    faqTitle: 'よくある質問',
    faq1q: 'オンラインでJWTをデコードするのは安全ですか？',
    faq1a: 'はい、このデコーダーはすべてブラウザ内で処理します。トークンはサーバーに送信されません。',
    faq2q: 'デコードと検証の違いは？',
    faq2a: 'デコードはヘッダーとペイロードを読み取ること。検証は秘密鍵で署名を確認することです。',
    faq3q: 'JWTが期限切れかどうかはどうやって分かりますか？',
    faq3a: 'ペイロードの「exp」クレームを確認してください。このツールは自動的に有効期限をチェックします。',
    faq4q: '一般的なJWTクレームは何ですか？',
    faq4a: '最も一般的な登録クレームは：iss、sub、aud、exp、nbf、iat、jtiです。',
    relatedTitle: '関連JWTツール',
  },
  ko: {
    title: 'JWT 디코더 온라인',
    description: 'JWT 토큰을 무료로 온라인 디코딩. 헤더, 페이로드, 클레임, 서명을 즉시 확인합니다.',
    inputLabel: 'JWT 토큰 붙여넣기', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'JWT 디코딩', sampleBtn: '샘플 로드', clear: '지우기',
    headerLabel: '헤더 (JOSE)', payloadLabel: '페이로드 (클레임)', signatureLabel: '서명',
    expiredLabel: '토큰 상태',
    errorInvalid: '잘못된 JWT 형식입니다. JWT는 점으로 구분된 3개의 부분이 있어야 합니다.',
    errorParse: 'JWT 디코딩 실패. 토큰을 확인해주세요.',
    introTitle: '무료 온라인 JWT 디코더',
    introText: '브라우저에서 즉시 JSON Web Token을 디코딩합니다. 모든 처리는 클라이언트 측에서 이루어집니다.',
    howTitle: 'JWT 토큰 디코딩 방법',
    step1: '애플리케이션에서 JWT 토큰을 복사',
    step2: '입력 필드에 토큰을 붙여넣기',
    step3: '"JWT 디코딩" 클릭',
    step4: '클레임 확인',
    faqTitle: '자주 묻는 질문',
    faq1q: '온라인에서 JWT를 디코딩하는 것이 안전한가요?',
    faq1a: '네, 이 디코더는 모든 것을 브라우저에서 처리합니다. 토큰은 서버로 전송되지 않습니다.',
    faq2q: '디코딩과 검증의 차이는?',
    faq2a: '디코딩은 헤더와 페이로드를 읽는 것입니다. 검증은 비밀 키로 서명을 확인하는 것입니다.',
    faq3q: 'JWT가 만료되었는지 어떻게 알 수 있나요?',
    faq3a: '페이로드의 "exp" 클레임을 확인하세요. 이 도구는 자동으로 만료를 확인합니다.',
    faq4q: '일반적인 JWT 클레임은 무엇인가요?',
    faq4a: '가장 일반적인 등록 클레임은: iss, sub, aud, exp, nbf, iat, jti입니다.',
    relatedTitle: '관련 JWT 도구',
  },
};

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZ25pbmcta2V5LTEifQ.eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJzdWIiOiIxMjM0NTY3ODkwIiwiYXVkIjoiaHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20iLCJleHAiOjE3MzU2ODk2MDAsIm5iZiI6MTcwNDExNjgwMCwiaWF0IjoxNzA0MTEzMjAwLCJqdGkiOiJ1bmlxdWUtdG9rZW4taWQtMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0.X4bP3Kj5N0mOHYT5PxeL4dSmVsGFNxK-8P7wMuE2cqY';

export default function JwtDecoderOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [expStatus, setExpStatus] = useState('');
  const [error, setError] = useState('');

  const decode = () => {
    try {
      setError('');
      const result = decodeJwt(input.trim());
      setHeader(JSON.stringify(result.header, null, 2));
      setPayload(JSON.stringify(result.payload, null, 2));
      setSignature(result.signature);
      if (result.payload.exp) {
        setExpStatus(formatExpiration(result.payload.exp));
      } else {
        setExpStatus('No expiration set');
      }
    } catch (e: unknown) {
      const msg = e instanceof Error && e.message === 'invalidFormat' ? t.errorInvalid : t.errorParse;
      setError(msg);
      setHeader(''); setPayload(''); setSignature(''); setExpStatus('');
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="jwt-decoder-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          <button onClick={() => { setInput(SAMPLE_JWT); setError(''); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{t.sampleBtn}</button>
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          placeholder={t.placeholder}
          style={{ minHeight: 100, fontFamily: 'monospace', fontSize: 13 }} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button onClick={decode} className="btn btn-primary">{t.decodeBtn}</button>
        <button onClick={() => { setInput(''); setHeader(''); setPayload(''); setSignature(''); setError(''); setExpStatus(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      {header && (
        <>
          {expStatus && (
            <div style={{
              background: expStatus.includes('Expired') ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)',
              border: `1px solid ${expStatus.includes('Expired') ? 'rgba(244,63,94,0.3)' : 'rgba(16,185,129,0.3)'}`,
              borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, fontWeight: 600,
              color: expStatus.includes('Expired') ? 'var(--accent-rose)' : 'var(--accent-emerald)',
            }}>
              {t.expiredLabel}: {expStatus}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: t.headerLabel, value: header, color: '#f43f5e' },
              { label: t.payloadLabel, value: payload, color: '#8b5cf6' },
              { label: t.signatureLabel, value: signature, color: '#10b981' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
                border: '1px solid var(--border-color)', borderLeft: `3px solid ${color}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color }}>{label}</span>
                  <CopyButton text={value} />
                </div>
                <pre style={{ fontSize: 12, fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0, wordBreak: 'break-all' }}>
                  {value}
                </pre>
              </div>
            ))}
          </div>
        </>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ol>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
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
            { href: `/${lang}/tools/jwt-decoder`, label: 'JWT Decoder' },
            { href: `/${lang}/tools/jwt-token-decoder`, label: 'JWT Token Decoder' },
            { href: `/${lang}/tools/jwt-parser`, label: 'JWT Parser' },
            { href: `/${lang}/tools/jwt-validator`, label: 'JWT Validator' },
          ].map((link) => (
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
