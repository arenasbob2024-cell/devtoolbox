'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

/* ── JWT decode helper ──────────────────────────────────────── */
const decodeBase64Url = (str: string): string => {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  return atob(b64);
};

function decodeJwt(token: string) {
  const parts = token.trim().split('.');
  if (parts.length !== 3) throw new Error('invalidFormat');

  const headerJson = decodeBase64Url(parts[0]);
  const payloadJson = decodeBase64Url(parts[1]);

  const header = JSON.parse(headerJson);
  const payload = JSON.parse(payloadJson);

  return { header, payload, signature: parts[2] };
}

/* ── i18n strings (7 languages) ─────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JWT Token Decoder',
    description: 'Decode and inspect JWT tokens online. View the header, payload, and signature from any JSON Web Token instantly.',
    inputLabel: 'Paste JWT Token',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'Decode JWT',
    sampleBtn: 'Load Sample JWT',
    clear: 'Clear',
    headerLabel: 'Header (JOSE)',
    payloadLabel: 'Payload (Claims)',
    signatureLabel: 'Signature (Base64URL)',
    errorInvalid: 'Invalid JWT format. A JWT must have exactly 3 parts separated by dots.',
    errorParse: 'Failed to parse JWT. Please check your token.',
    cheatTitle: 'JWT Structure Reference',
    structureTitle: 'JWT Structure',
    structureDesc: 'A JWT consists of three Base64URL-encoded parts separated by dots: Header.Payload.Signature',
    headerFieldsTitle: 'Header Fields',
    payloadClaimsTitle: 'Registered Payload Claims',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a JSON Web Token (JWT)?',
    faq1a: 'A JSON Web Token (JWT) is a compact, URL-safe token format used for securely transmitting information between parties as a JSON object. It consists of three parts: a Header (algorithm and token type), a Payload (claims/data), and a Signature. JWTs are widely used for authentication and authorization in web applications and APIs.',
    faq2q: 'Can a JWT be decoded without the secret key?',
    faq2a: 'Yes, the header and payload of a JWT are only Base64URL-encoded, not encrypted. Anyone with the token can decode and read these parts. The secret key is only needed to verify the signature, which confirms the token has not been tampered with. This is why you should never store sensitive information in the JWT payload.',
    faq3q: 'What is the difference between JWT and session cookies?',
    faq3a: 'Session cookies store a session ID on the client, with the actual session data kept on the server. JWTs are self-contained tokens that carry all necessary data within the token itself. JWTs are stateless and work well in distributed systems and APIs, while session cookies require server-side storage. JWTs can be larger than session IDs but eliminate the need for server-side session lookups.',
    relatedTitle: 'Related JWT Tools',
  },
  zh: {
    title: 'JWT Token 解码器',
    description: '在线解码和检查 JWT 令牌。即时查看任何 JSON Web Token 的 Header、Payload 和 Signature。',
    inputLabel: '粘贴 JWT Token',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: '解码 JWT',
    sampleBtn: '加载示例 JWT',
    clear: '清除',
    headerLabel: 'Header（JOSE 头部）',
    payloadLabel: 'Payload（声明）',
    signatureLabel: 'Signature（Base64URL 签名）',
    errorInvalid: '无效的 JWT 格式。JWT 必须包含由点分隔的三个部分。',
    errorParse: '解析 JWT 失败。请检查您的令牌。',
    cheatTitle: 'JWT 结构参考',
    structureTitle: 'JWT 结构',
    structureDesc: 'JWT 由三个 Base64URL 编码的部分组成，用点分隔：Header.Payload.Signature',
    headerFieldsTitle: 'Header 字段',
    payloadClaimsTitle: '注册 Payload 声明',
    faqTitle: '常见问题',
    faq1q: '什么是 JSON Web Token (JWT)？',
    faq1a: 'JSON Web Token (JWT) 是一种紧凑的、URL 安全的令牌格式，用于在各方之间安全传输 JSON 对象形式的信息。它由三部分组成：Header（算法和令牌类型）、Payload（声明/数据）和 Signature（签名）。JWT 广泛用于 Web 应用程序和 API 的认证和授权。',
    faq2q: '可以在没有密钥的情况下解码 JWT 吗？',
    faq2a: '可以。JWT 的 Header 和 Payload 只是 Base64URL 编码的，而非加密的。任何拥有令牌的人都可以解码并读取这些部分。密钥仅用于验证签名。因此不应在 JWT Payload 中存储敏感信息。',
    faq3q: 'JWT 与 Session Cookie 有什么区别？',
    faq3a: 'Session Cookie 在客户端存储会话 ID，实际数据保存在服务器端。JWT 是自包含的令牌，携带所有必要数据。JWT 是无状态的，适合分布式系统和 API，而 Session Cookie 需要服务器端存储。',
    relatedTitle: '相关 JWT 工具',
  },
  fr: {
    title: 'Decodeur de Token JWT',
    description: 'Decodez et inspectez les tokens JWT en ligne. Visualisez le header, le payload et la signature instantanement.',
    inputLabel: 'Collez le Token JWT',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'Decoder JWT',
    sampleBtn: 'Charger un exemple',
    clear: 'Effacer',
    headerLabel: 'Header (JOSE)',
    payloadLabel: 'Payload (Claims)',
    signatureLabel: 'Signature (Base64URL)',
    errorInvalid: 'Format JWT invalide. Un JWT doit comporter exactement 3 parties separees par des points.',
    errorParse: 'Echec de l\'analyse du JWT. Veuillez verifier votre token.',
    cheatTitle: 'Reference de la structure JWT',
    structureTitle: 'Structure JWT',
    structureDesc: 'Un JWT se compose de trois parties encodees en Base64URL separees par des points : Header.Payload.Signature',
    headerFieldsTitle: 'Champs du Header',
    payloadClaimsTitle: 'Claims enregistres du Payload',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'un JSON Web Token (JWT) ?',
    faq1a: 'Un JSON Web Token est un format de token compact et URL-safe utilise pour transmettre des informations en toute securite entre les parties. Il est compose de trois parties : Header, Payload et Signature.',
    faq2q: 'Peut-on decoder un JWT sans la cle secrete ?',
    faq2a: 'Oui, le header et le payload d\'un JWT sont simplement encodes en Base64URL, pas chiffres. La cle secrete n\'est necessaire que pour verifier la signature.',
    faq3q: 'Quelle est la difference entre JWT et les cookies de session ?',
    faq3a: 'Les cookies de session stockent un identifiant sur le client avec les donnees sur le serveur. Les JWT sont des tokens autonomes qui transportent toutes les donnees necessaires.',
    relatedTitle: 'Outils JWT connexes',
  },
  de: {
    title: 'JWT Token Decoder',
    description: 'JWT-Tokens online dekodieren und inspizieren. Header, Payload und Signatur sofort anzeigen.',
    inputLabel: 'JWT Token einfuegen',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'JWT dekodieren',
    sampleBtn: 'Beispiel laden',
    clear: 'Loeschen',
    headerLabel: 'Header (JOSE)',
    payloadLabel: 'Payload (Claims)',
    signatureLabel: 'Signatur (Base64URL)',
    errorInvalid: 'Ungueltiges JWT-Format. Ein JWT muss genau 3 durch Punkte getrennte Teile haben.',
    errorParse: 'JWT konnte nicht analysiert werden. Bitte ueberpruefen Sie Ihren Token.',
    cheatTitle: 'JWT Strukturreferenz',
    structureTitle: 'JWT Struktur',
    structureDesc: 'Ein JWT besteht aus drei Base64URL-kodierten Teilen, getrennt durch Punkte: Header.Payload.Signatur',
    headerFieldsTitle: 'Header-Felder',
    payloadClaimsTitle: 'Registrierte Payload Claims',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein JSON Web Token (JWT)?',
    faq1a: 'Ein JSON Web Token ist ein kompaktes, URL-sicheres Token-Format zur sicheren Uebertragung von Informationen zwischen Parteien. Es besteht aus Header, Payload und Signatur.',
    faq2q: 'Kann man ein JWT ohne den geheimen Schluessel dekodieren?',
    faq2a: 'Ja, Header und Payload eines JWT sind nur Base64URL-kodiert, nicht verschluesselt. Der geheime Schluessel wird nur zur Verifizierung der Signatur benoetigt.',
    faq3q: 'Was ist der Unterschied zwischen JWT und Session-Cookies?',
    faq3a: 'Session-Cookies speichern eine Session-ID auf dem Client, die Daten auf dem Server. JWTs sind eigenstaendige Tokens, die alle noetigen Daten in sich tragen.',
    relatedTitle: 'Verwandte JWT-Tools',
  },
  es: {
    title: 'Decodificador de Token JWT',
    description: 'Decodifica e inspecciona tokens JWT en linea. Visualiza header, payload y firma al instante.',
    inputLabel: 'Pegar Token JWT',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'Decodificar JWT',
    sampleBtn: 'Cargar ejemplo',
    clear: 'Limpiar',
    headerLabel: 'Header (JOSE)',
    payloadLabel: 'Payload (Claims)',
    signatureLabel: 'Firma (Base64URL)',
    errorInvalid: 'Formato JWT invalido. Un JWT debe tener exactamente 3 partes separadas por puntos.',
    errorParse: 'Error al analizar el JWT. Por favor, verifica tu token.',
    cheatTitle: 'Referencia de estructura JWT',
    structureTitle: 'Estructura JWT',
    structureDesc: 'Un JWT consta de tres partes codificadas en Base64URL separadas por puntos: Header.Payload.Signature',
    headerFieldsTitle: 'Campos del Header',
    payloadClaimsTitle: 'Claims registrados del Payload',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es un JSON Web Token (JWT)?',
    faq1a: 'Un JSON Web Token es un formato de token compacto y seguro para URLs utilizado para transmitir informacion de forma segura. Consta de tres partes: Header, Payload y Signature.',
    faq2q: 'Se puede decodificar un JWT sin la clave secreta?',
    faq2a: 'Si, el header y el payload de un JWT solo estan codificados en Base64URL, no cifrados. La clave secreta solo se necesita para verificar la firma.',
    faq3q: 'Cual es la diferencia entre JWT y cookies de sesion?',
    faq3a: 'Las cookies de sesion almacenan un ID en el cliente con los datos en el servidor. Los JWTs son tokens autocontenidos que llevan todos los datos necesarios.',
    relatedTitle: 'Herramientas JWT relacionadas',
  },
  ja: {
    title: 'JWT トークンデコーダー',
    description: 'JWTトークンをオンラインでデコード・検査します。ヘッダー、ペイロード、署名を即座に表示します。',
    inputLabel: 'JWTトークンを貼り付け',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'JWTをデコード',
    sampleBtn: 'サンプルを読み込む',
    clear: 'クリア',
    headerLabel: 'ヘッダー (JOSE)',
    payloadLabel: 'ペイロード (クレーム)',
    signatureLabel: '署名 (Base64URL)',
    errorInvalid: '無効なJWT形式です。JWTはドットで区切られた3つの部分が必要です。',
    errorParse: 'JWTの解析に失敗しました。トークンを確認してください。',
    cheatTitle: 'JWT構造リファレンス',
    structureTitle: 'JWT構造',
    structureDesc: 'JWTは、ドットで区切られた3つのBase64URLエンコード部分で構成されます：Header.Payload.Signature',
    headerFieldsTitle: 'ヘッダーフィールド',
    payloadClaimsTitle: '登録済みペイロードクレーム',
    faqTitle: 'よくある質問',
    faq1q: 'JSON Web Token (JWT) とは何ですか？',
    faq1a: 'JSON Web Tokenは、パーティ間で安全に情報を伝送するためのコンパクトでURL安全なトークン形式です。ヘッダー、ペイロード、署名の3つの部分で構成されます。',
    faq2q: '秘密鍵なしでJWTをデコードできますか？',
    faq2a: 'はい、JWTのヘッダーとペイロードはBase64URLエンコードされているだけで、暗号化されていません。秘密鍵は署名の検証にのみ必要です。',
    faq3q: 'JWTとセッションCookieの違いは何ですか？',
    faq3a: 'セッションCookieはクライアントにセッションIDを保存し、データはサーバーに保持します。JWTは必要なデータをすべて含む自己完結型トークンです。',
    relatedTitle: '関連JWTツール',
  },
  ko: {
    title: 'JWT 토큰 디코더',
    description: 'JWT 토큰을 온라인으로 디코딩하고 검사합니다. 헤더, 페이로드, 서명을 즉시 확인하세요.',
    inputLabel: 'JWT 토큰 붙여넣기',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    decodeBtn: 'JWT 디코딩',
    sampleBtn: '샘플 로드',
    clear: '지우기',
    headerLabel: '헤더 (JOSE)',
    payloadLabel: '페이로드 (클레임)',
    signatureLabel: '서명 (Base64URL)',
    errorInvalid: '잘못된 JWT 형식입니다. JWT는 점으로 구분된 정확히 3개의 부분이 있어야 합니다.',
    errorParse: 'JWT 파싱에 실패했습니다. 토큰을 확인해 주세요.',
    cheatTitle: 'JWT 구조 참조',
    structureTitle: 'JWT 구조',
    structureDesc: 'JWT는 점으로 구분된 3개의 Base64URL 인코딩 부분으로 구성됩니다: Header.Payload.Signature',
    headerFieldsTitle: '헤더 필드',
    payloadClaimsTitle: '등록된 페이로드 클레임',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON Web Token (JWT)이란 무엇인가요?',
    faq1a: 'JSON Web Token은 당사자 간에 안전하게 정보를 전송하기 위한 컴팩트하고 URL 안전한 토큰 형식입니다. 헤더, 페이로드, 서명의 3부분으로 구성됩니다.',
    faq2q: '비밀 키 없이 JWT를 디코딩할 수 있나요?',
    faq2a: '네, JWT의 헤더와 페이로드는 Base64URL로 인코딩만 되어 있을 뿐 암호화되어 있지 않습니다. 비밀 키는 서명 검증에만 필요합니다.',
    faq3q: 'JWT와 세션 쿠키의 차이점은 무엇인가요?',
    faq3a: '세션 쿠키는 클라이언트에 세션 ID를 저장하고 데이터는 서버에 유지합니다. JWT는 필요한 모든 데이터를 포함하는 자체 완결형 토큰입니다.',
    relatedTitle: '관련 JWT 도구',
  },
};

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZ25pbmcta2V5LTEifQ.eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJzdWIiOiIxMjM0NTY3ODkwIiwiYXVkIjoiaHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20iLCJleHAiOjE3MzU2ODk2MDAsIm5iZiI6MTcwNDExNjgwMCwiaWF0IjoxNzA0MTEzMjAwLCJqdGkiOiJ1bmlxdWUtdG9rZW4taWQtMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0.X4bP3Kj5N0mOHYT5PxeL4dSmVsGFNxK-8P7wMuE2cqY';

export default function JwtTokenDecoder() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const decode = () => {
    try {
      setError('');
      const result = decodeJwt(input.trim());
      setHeader(JSON.stringify(result.header, null, 2));
      setPayload(JSON.stringify(result.payload, null, 2));
      setSignature(result.signature);
    } catch (e: unknown) {
      const msg = e instanceof Error && e.message === 'invalidFormat' ? t.errorInvalid : t.errorParse;
      setError(msg);
      setHeader(''); setPayload(''); setSignature('');
    }
  };

  const loadSample = () => {
    setInput(SAMPLE_JWT);
    setError('');
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="jwt-token-decoder">
      {/* JSON-LD FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Tool UI ────────────────────────────────────────── */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          <button onClick={loadSample} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{t.sampleBtn}</button>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.placeholder}
          style={{ minHeight: 100, fontFamily: 'monospace', fontSize: 13 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button onClick={decode} className="btn btn-primary">{t.decodeBtn}</button>
        <button onClick={() => { setInput(''); setHeader(''); setPayload(''); setSignature(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)',
        }}>
          {error}
        </div>
      )}

      {header && (
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
      )}

      {/* ── Cheat Sheet ─────────────────────────────────────── */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cheatTitle}</h2>

        {/* JWT Structure */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.structureTitle}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>{t.structureDesc}</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'Header', color: '#f43f5e', desc: 'Algorithm + Type' },
            { label: '.', color: 'var(--text-secondary)', desc: '' },
            { label: 'Payload', color: '#8b5cf6', desc: 'Claims / Data' },
            { label: '.', color: 'var(--text-secondary)', desc: '' },
            { label: 'Signature', color: '#10b981', desc: 'Verification' },
          ].map((part, i) => (
            part.desc ? (
              <div key={i} style={{
                background: 'var(--bg-input)', borderRadius: 8, padding: '8px 16px',
                border: `1px solid ${part.color}`, textAlign: 'center', flex: '1 1 120px',
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: part.color }}>{part.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{part.desc}</div>
              </div>
            ) : (
              <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: 20, fontWeight: 700, color: 'var(--text-secondary)' }}>.</div>
            )
          ))}
        </div>

        {/* Header Fields Table */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.headerFieldsTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Field</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['alg', 'Algorithm', 'Signing algorithm (HS256, RS256, ES256, etc.)'],
                ['typ', 'Type', 'Token type, typically "JWT"'],
                ['kid', 'Key ID', 'Identifier for the signing key used'],
                ['jku', 'JWK Set URL', 'URL to the JSON Web Key Set'],
                ['x5u', 'X.509 URL', 'URL to the X.509 certificate chain'],
              ].map(([field, name, desc], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600, color: '#f43f5e' }}>{field}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{name}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payload Claims Table */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.payloadClaimsTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Claim</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['iss', 'Issuer', 'Entity that issued the JWT'],
                ['sub', 'Subject', 'Subject of the JWT (user ID)'],
                ['aud', 'Audience', 'Recipient(s) the JWT is intended for'],
                ['exp', 'Expiration', 'Timestamp after which the JWT expires'],
                ['nbf', 'Not Before', 'Timestamp before which the JWT is not valid'],
                ['iat', 'Issued At', 'Timestamp when the JWT was issued'],
                ['jti', 'JWT ID', 'Unique identifier for the JWT'],
              ].map(([claim, name, desc], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600, color: '#8b5cf6' }}>{claim}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{name}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        {/* Related Tools */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/jwt-decoder`, label: 'JWT Decoder' },
            { href: `/${lang}/tools/jwt-parser`, label: 'JWT Parser' },
            { href: `/${lang}/tools/jwt-validator`, label: 'JWT Validator' },
            { href: `/${lang}/tools/base64-decoder`, label: 'Base64 Decoder' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                fontSize: 13,
                color: 'var(--accent-blue)',
                textDecoration: 'none',
                background: 'var(--bg-input)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
