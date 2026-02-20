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

function parseJwt(token: string) {
  const parts = token.trim().split('.');
  if (parts.length !== 3) throw new Error('invalidFormat');

  const header = JSON.parse(decodeBase64Url(parts[0]));
  const payload = JSON.parse(decodeBase64Url(parts[1]));

  return { header, payload, signature: parts[2] };
}

/* ── Claim label mapping ────────────────────────────────────── */
const claimLabels: Record<string, string> = {
  iss: 'Issuer',
  sub: 'Subject',
  aud: 'Audience',
  exp: 'Expiration Time',
  nbf: 'Not Before',
  iat: 'Issued At',
  jti: 'JWT ID',
  name: 'Name',
  email: 'Email',
  role: 'Role',
  scope: 'Scope',
  azp: 'Authorized Party',
  nonce: 'Nonce',
  at_hash: 'Access Token Hash',
  c_hash: 'Code Hash',
  auth_time: 'Auth Time',
  acr: 'Authentication Context',
  amr: 'Authentication Methods',
  sid: 'Session ID',
};

const timestampClaims = new Set(['exp', 'nbf', 'iat', 'auth_time']);

function formatTimestamp(value: number): string {
  try {
    const date = new Date(value * 1000);
    return date.toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZoneName: 'short',
    });
  } catch {
    return String(value);
  }
}

/* ── i18n strings (7 languages) ─────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JWT Parser',
    description: 'Parse JWT tokens and extract all claims with human-readable labels. Auto-convert timestamps to dates and check expiration status.',
    inputLabel: 'Paste JWT Token',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    parseBtn: 'Parse JWT',
    sampleBtn: 'Load Sample JWT',
    clear: 'Clear',
    metadataTitle: 'Token Metadata',
    algorithm: 'Algorithm',
    tokenType: 'Token Type',
    expirationStatus: 'Expiration Status',
    expired: 'EXPIRED',
    valid: 'VALID',
    noExpiry: 'No expiration set',
    claimsTitle: 'Parsed Claims',
    claim: 'Claim',
    label: 'Label',
    value: 'Value',
    customClaim: 'Custom Claim',
    rawPayloadTitle: 'Raw Payload JSON',
    errorInvalid: 'Invalid JWT format. A JWT must have exactly 3 parts separated by dots.',
    errorParse: 'Failed to parse JWT. Please check your token.',
    cheatTitle: 'JWT Claims Reference',
    registeredTitle: 'Registered Claims (RFC 7519)',
    publicTitle: 'Public Claims (OpenID Connect)',
    privateTitle: 'Private Claims',
    privateDesc: 'Custom claims defined by the application. These are not registered or standardized and are used to share information between parties that agree on using them. Examples: role, permissions, tenant_id, etc.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What are JWT claims?',
    faq1a: 'JWT claims are pieces of information asserted about a subject. They are the key-value pairs in the JWT payload. Claims can be registered (standardized names like iss, sub, exp), public (registered in the IANA JSON Web Token Claims registry), or private (custom claims agreed upon by the parties using the token).',
    faq2q: 'What is the difference between registered and custom claims?',
    faq2a: 'Registered claims are predefined by the JWT specification (RFC 7519) and have standardized meanings, such as iss (issuer), sub (subject), exp (expiration). Custom (private) claims are application-specific and can be any key-value pair agreed upon by the token producer and consumer, like user_role, tenant_id, or department.',
    faq3q: 'How do I read the expiration time in a JWT?',
    faq3a: 'The exp claim contains a Unix timestamp (seconds since January 1, 1970 UTC) representing when the token expires. To check if a token is expired, compare the exp value with the current Unix timestamp. If the current time is greater than exp, the token has expired. This parser automatically converts exp to a human-readable date and shows the expiration status.',
    relatedTitle: 'Related JWT Tools',
  },
  zh: {
    title: 'JWT 解析器',
    description: '解析 JWT 令牌并提取所有带有人类可读标签的声明。自动将时间戳转换为日期并检查过期状态。',
    inputLabel: '粘贴 JWT Token',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    parseBtn: '解析 JWT',
    sampleBtn: '加载示例 JWT',
    clear: '清除',
    metadataTitle: '令牌元数据',
    algorithm: '算法',
    tokenType: '令牌类型',
    expirationStatus: '过期状态',
    expired: '已过期',
    valid: '有效',
    noExpiry: '未设置过期时间',
    claimsTitle: '解析的声明',
    claim: '声明',
    label: '标签',
    value: '值',
    customClaim: '自定义声明',
    rawPayloadTitle: '原始 Payload JSON',
    errorInvalid: '无效的 JWT 格式。JWT 必须包含由点分隔的三个部分。',
    errorParse: '解析 JWT 失败。请检查您的令牌。',
    cheatTitle: 'JWT 声明参考',
    registeredTitle: '注册声明 (RFC 7519)',
    publicTitle: '公共声明 (OpenID Connect)',
    privateTitle: '私有声明',
    privateDesc: '由应用程序定义的自定义声明。这些声明未注册或标准化，用于在同意使用它们的各方之间共享信息。示例：role, permissions, tenant_id 等。',
    faqTitle: '常见问题',
    faq1q: '什么是 JWT 声明？',
    faq1a: 'JWT 声明是关于主体的信息断言。它们是 JWT Payload 中的键值对。声明可以是注册的（如 iss、sub、exp）、公共的（在 IANA 注册表中注册）或私有的（各方约定的自定义声明）。',
    faq2q: '注册声明和自定义声明有什么区别？',
    faq2a: '注册声明由 JWT 规范 (RFC 7519) 预定义，具有标准化含义。自定义（私有）声明是应用程序特定的，可以是令牌生产者和消费者之间约定的任何键值对。',
    faq3q: '如何读取 JWT 中的过期时间？',
    faq3a: 'exp 声明包含 Unix 时间戳（自1970年1月1日 UTC 以来的秒数），表示令牌何时过期。本解析器会自动将 exp 转换为人类可读的日期并显示过期状态。',
    relatedTitle: '相关 JWT 工具',
  },
  fr: {
    title: 'Analyseur JWT',
    description: 'Analysez les tokens JWT et extrayez tous les claims avec des libelles lisibles. Conversion automatique des horodatages.',
    inputLabel: 'Collez le Token JWT',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    parseBtn: 'Analyser JWT',
    sampleBtn: 'Charger un exemple',
    clear: 'Effacer',
    metadataTitle: 'Metadonnees du Token',
    algorithm: 'Algorithme',
    tokenType: 'Type de Token',
    expirationStatus: 'Statut d\'expiration',
    expired: 'EXPIRE',
    valid: 'VALIDE',
    noExpiry: 'Pas d\'expiration definie',
    claimsTitle: 'Claims analyses',
    claim: 'Claim',
    label: 'Libelle',
    value: 'Valeur',
    customClaim: 'Claim personnalise',
    rawPayloadTitle: 'JSON Payload brut',
    errorInvalid: 'Format JWT invalide.',
    errorParse: 'Echec de l\'analyse du JWT.',
    cheatTitle: 'Reference des Claims JWT',
    registeredTitle: 'Claims enregistres (RFC 7519)',
    publicTitle: 'Claims publics (OpenID Connect)',
    privateTitle: 'Claims prives',
    privateDesc: 'Claims personnalises definis par l\'application. Exemples : role, permissions, tenant_id, etc.',
    faqTitle: 'Questions frequentes',
    faq1q: 'Que sont les claims JWT ?',
    faq1a: 'Les claims JWT sont des informations assertees sur un sujet. Ce sont les paires cle-valeur dans le payload du JWT. Ils peuvent etre enregistres, publics ou prives.',
    faq2q: 'Quelle est la difference entre claims enregistres et personnalises ?',
    faq2a: 'Les claims enregistres sont predefinis par la specification JWT (RFC 7519). Les claims personnalises sont specifiques a l\'application.',
    faq3q: 'Comment lire le temps d\'expiration dans un JWT ?',
    faq3a: 'Le claim exp contient un horodatage Unix representant quand le token expire. Cet analyseur convertit automatiquement exp en date lisible.',
    relatedTitle: 'Outils JWT connexes',
  },
  de: {
    title: 'JWT Parser',
    description: 'JWT-Tokens analysieren und alle Claims mit lesbaren Bezeichnungen extrahieren. Zeitstempel automatisch konvertieren.',
    inputLabel: 'JWT Token einfuegen',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    parseBtn: 'JWT analysieren',
    sampleBtn: 'Beispiel laden',
    clear: 'Loeschen',
    metadataTitle: 'Token-Metadaten',
    algorithm: 'Algorithmus',
    tokenType: 'Token-Typ',
    expirationStatus: 'Ablaufstatus',
    expired: 'ABGELAUFEN',
    valid: 'GUELTIG',
    noExpiry: 'Kein Ablauf gesetzt',
    claimsTitle: 'Analysierte Claims',
    claim: 'Claim',
    label: 'Bezeichnung',
    value: 'Wert',
    customClaim: 'Benutzerdefinierter Claim',
    rawPayloadTitle: 'Rohes Payload JSON',
    errorInvalid: 'Ungueltiges JWT-Format.',
    errorParse: 'JWT-Analyse fehlgeschlagen.',
    cheatTitle: 'JWT Claims Referenz',
    registeredTitle: 'Registrierte Claims (RFC 7519)',
    publicTitle: 'Oeffentliche Claims (OpenID Connect)',
    privateTitle: 'Private Claims',
    privateDesc: 'Benutzerdefinierte Claims der Anwendung. Beispiele: role, permissions, tenant_id usw.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was sind JWT Claims?',
    faq1a: 'JWT Claims sind Informationen ueber ein Subjekt als Schluessel-Wert-Paare im JWT Payload. Sie koennen registriert, oeffentlich oder privat sein.',
    faq2q: 'Was ist der Unterschied zwischen registrierten und benutzerdefinierten Claims?',
    faq2a: 'Registrierte Claims sind durch die JWT-Spezifikation (RFC 7519) vordefiniert. Benutzerdefinierte Claims sind anwendungsspezifisch.',
    faq3q: 'Wie liest man die Ablaufzeit in einem JWT?',
    faq3a: 'Der exp Claim enthaelt einen Unix-Zeitstempel. Dieser Parser konvertiert exp automatisch in ein lesbares Datum.',
    relatedTitle: 'Verwandte JWT-Tools',
  },
  es: {
    title: 'Parser JWT',
    description: 'Analiza tokens JWT y extrae todos los claims con etiquetas legibles. Convierte automaticamente timestamps a fechas.',
    inputLabel: 'Pegar Token JWT',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    parseBtn: 'Analizar JWT',
    sampleBtn: 'Cargar ejemplo',
    clear: 'Limpiar',
    metadataTitle: 'Metadatos del Token',
    algorithm: 'Algoritmo',
    tokenType: 'Tipo de Token',
    expirationStatus: 'Estado de expiracion',
    expired: 'EXPIRADO',
    valid: 'VALIDO',
    noExpiry: 'Sin expiracion',
    claimsTitle: 'Claims analizados',
    claim: 'Claim',
    label: 'Etiqueta',
    value: 'Valor',
    customClaim: 'Claim personalizado',
    rawPayloadTitle: 'JSON Payload sin procesar',
    errorInvalid: 'Formato JWT invalido.',
    errorParse: 'Error al analizar el JWT.',
    cheatTitle: 'Referencia de Claims JWT',
    registeredTitle: 'Claims registrados (RFC 7519)',
    publicTitle: 'Claims publicos (OpenID Connect)',
    privateTitle: 'Claims privados',
    privateDesc: 'Claims personalizados definidos por la aplicacion. Ejemplos: role, permissions, tenant_id, etc.',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que son los claims JWT?',
    faq1a: 'Los claims JWT son piezas de informacion sobre un sujeto en el payload del JWT. Pueden ser registrados, publicos o privados.',
    faq2q: 'Cual es la diferencia entre claims registrados y personalizados?',
    faq2a: 'Los claims registrados estan predefinidos por la especificacion JWT (RFC 7519). Los claims personalizados son especificos de la aplicacion.',
    faq3q: 'Como se lee el tiempo de expiracion en un JWT?',
    faq3a: 'El claim exp contiene un timestamp Unix. Este parser convierte automaticamente exp a una fecha legible.',
    relatedTitle: 'Herramientas JWT relacionadas',
  },
  ja: {
    title: 'JWT パーサー',
    description: 'JWTトークンを解析し、人間が読めるラベル付きですべてのクレームを抽出します。タイムスタンプを自動変換します。',
    inputLabel: 'JWTトークンを貼り付け',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    parseBtn: 'JWTを解析',
    sampleBtn: 'サンプルを読み込む',
    clear: 'クリア',
    metadataTitle: 'トークンメタデータ',
    algorithm: 'アルゴリズム',
    tokenType: 'トークンタイプ',
    expirationStatus: '有効期限ステータス',
    expired: '期限切れ',
    valid: '有効',
    noExpiry: '有効期限未設定',
    claimsTitle: '解析されたクレーム',
    claim: 'クレーム',
    label: 'ラベル',
    value: '値',
    customClaim: 'カスタムクレーム',
    rawPayloadTitle: '生のペイロードJSON',
    errorInvalid: '無効なJWT形式です。',
    errorParse: 'JWTの解析に失敗しました。',
    cheatTitle: 'JWTクレームリファレンス',
    registeredTitle: '登録済みクレーム (RFC 7519)',
    publicTitle: '公開クレーム (OpenID Connect)',
    privateTitle: 'プライベートクレーム',
    privateDesc: 'アプリケーションが定義するカスタムクレーム。例: role, permissions, tenant_id など。',
    faqTitle: 'よくある質問',
    faq1q: 'JWTクレームとは何ですか？',
    faq1a: 'JWTクレームは、JWTペイロード内のキーと値のペアです。登録済み、公開、プライベートがあります。',
    faq2q: '登録済みクレームとカスタムクレームの違いは？',
    faq2a: '登録済みクレームはJWT仕様(RFC 7519)で事前定義されています。カスタムクレームはアプリケーション固有です。',
    faq3q: 'JWTの有効期限はどのように読みますか？',
    faq3a: 'expクレームにはUnixタイムスタンプが含まれています。このパーサーはexpを自動的に読みやすい日付に変換します。',
    relatedTitle: '関連JWTツール',
  },
  ko: {
    title: 'JWT 파서',
    description: 'JWT 토큰을 파싱하고 사람이 읽을 수 있는 레이블로 모든 클레임을 추출합니다. 타임스탬프를 자동 변환합니다.',
    inputLabel: 'JWT 토큰 붙여넣기',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    parseBtn: 'JWT 파싱',
    sampleBtn: '샘플 로드',
    clear: '지우기',
    metadataTitle: '토큰 메타데이터',
    algorithm: '알고리즘',
    tokenType: '토큰 유형',
    expirationStatus: '만료 상태',
    expired: '만료됨',
    valid: '유효',
    noExpiry: '만료 시간 미설정',
    claimsTitle: '파싱된 클레임',
    claim: '클레임',
    label: '레이블',
    value: '값',
    customClaim: '사용자 정의 클레임',
    rawPayloadTitle: '원시 페이로드 JSON',
    errorInvalid: '잘못된 JWT 형식입니다.',
    errorParse: 'JWT 파싱에 실패했습니다.',
    cheatTitle: 'JWT 클레임 참조',
    registeredTitle: '등록된 클레임 (RFC 7519)',
    publicTitle: '공개 클레임 (OpenID Connect)',
    privateTitle: '비공개 클레임',
    privateDesc: '애플리케이션에서 정의한 사용자 정의 클레임입니다. 예: role, permissions, tenant_id 등.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JWT 클레임이란 무엇인가요?',
    faq1a: 'JWT 클레임은 JWT 페이로드의 키-값 쌍입니다. 등록된, 공개, 비공개 클레임이 있습니다.',
    faq2q: '등록된 클레임과 사용자 정의 클레임의 차이점은?',
    faq2a: '등록된 클레임은 JWT 사양(RFC 7519)에 의해 사전 정의됩니다. 사용자 정의 클레임은 애플리케이션 고유합니다.',
    faq3q: 'JWT에서 만료 시간은 어떻게 읽나요?',
    faq3a: 'exp 클레임에는 Unix 타임스탬프가 포함되어 있습니다. 이 파서는 exp를 자동으로 읽기 쉬운 날짜로 변환합니다.',
    relatedTitle: '관련 JWT 도구',
  },
};

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZ25pbmcta2V5LTEifQ.eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJzdWIiOiIxMjM0NTY3ODkwIiwiYXVkIjoiaHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20iLCJleHAiOjE3MzU2ODk2MDAsIm5iZiI6MTcwNDExNjgwMCwiaWF0IjoxNzA0MTEzMjAwLCJqdGkiOiJ1bmlxdWUtdG9rZW4taWQtMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0.X4bP3Kj5N0mOHYT5PxeL4dSmVsGFNxK-8P7wMuE2cqY';

interface ParsedResult {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export default function JwtParser() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [error, setError] = useState('');

  const parse = () => {
    try {
      setError('');
      const parsed = parseJwt(input.trim());
      setResult(parsed);
    } catch (e: unknown) {
      const msg = e instanceof Error && e.message === 'invalidFormat' ? t.errorInvalid : t.errorParse;
      setError(msg);
      setResult(null);
    }
  };

  const loadSample = () => {
    setInput(SAMPLE_JWT);
    setError('');
  };

  const getExpirationStatus = () => {
    if (!result) return null;
    const exp = result.payload.exp;
    if (typeof exp !== 'number') return { status: 'none', text: t.noExpiry };
    const now = Math.floor(Date.now() / 1000);
    const diff = exp - now;
    if (diff <= 0) {
      const ago = Math.abs(diff);
      const days = Math.floor(ago / 86400);
      const hours = Math.floor((ago % 86400) / 3600);
      return { status: 'expired', text: `${t.expired} (${days}d ${hours}h ago)` };
    }
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    return { status: 'valid', text: `${t.valid} (${days}d ${hours}h remaining)` };
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
    <ToolLayout title={t.title} description={t.description} toolId="jwt-parser">
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
        <button onClick={parse} className="btn btn-primary">{t.parseBtn}</button>
        <button onClick={() => { setInput(''); setResult(null); setError(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)',
        }}>
          {error}
        </div>
      )}

      {result && (
        <>
          {/* Token Metadata */}
          <div style={{
            background: 'var(--bg-input)', borderRadius: 8, padding: '14px 16px',
            border: '1px solid var(--border-color)', marginBottom: 16,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: 'var(--accent-blue)' }}>{t.metadataTitle}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>{t.algorithm}</div>
                <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'monospace' }}>{String(result.header.alg || 'N/A')}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>{t.tokenType}</div>
                <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'monospace' }}>{String(result.header.typ || 'N/A')}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>{t.expirationStatus}</div>
                {(() => {
                  const status = getExpirationStatus();
                  if (!status) return null;
                  return (
                    <div style={{
                      fontSize: 13, fontWeight: 700,
                      color: status.status === 'expired' ? '#ef4444' : status.status === 'valid' ? '#22c55e' : 'var(--text-secondary)',
                    }}>
                      {status.text}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Parsed Claims Table */}
          <div style={{
            background: 'var(--bg-input)', borderRadius: 8, padding: '14px 16px',
            border: '1px solid var(--border-color)', borderLeft: '3px solid #8b5cf6', marginBottom: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#8b5cf6' }}>{t.claimsTitle}</h3>
              <CopyButton text={JSON.stringify(result.payload, null, 2)} />
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '6px 10px', textAlign: 'left', whiteSpace: 'nowrap' }}>{t.claim}</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left', whiteSpace: 'nowrap' }}>{t.label}</th>
                    <th style={{ padding: '6px 10px', textAlign: 'left' }}>{t.value}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(result.payload).map(([key, val]) => {
                    const isTimestamp = timestampClaims.has(key) && typeof val === 'number';
                    const displayValue = isTimestamp ? formatTimestamp(val as number) : (typeof val === 'object' ? JSON.stringify(val) : String(val));
                    return (
                      <tr key={key} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontWeight: 600, color: '#8b5cf6', whiteSpace: 'nowrap' }}>{key}</td>
                        <td style={{ padding: '8px 10px', fontWeight: 600, whiteSpace: 'nowrap', color: claimLabels[key] ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                          {claimLabels[key] || t.customClaim}
                        </td>
                        <td style={{ padding: '8px 10px', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
                          {displayValue}
                          {isTimestamp && (
                            <span style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', opacity: 0.7, fontFamily: 'monospace' }}>
                              (Unix: {String(val)})
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Raw Payload JSON */}
          <div style={{
            background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
            border: '1px solid var(--border-color)', borderLeft: '3px solid #10b981',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981' }}>{t.rawPayloadTitle}</span>
              <CopyButton text={JSON.stringify(result.payload, null, 2)} />
            </div>
            <pre style={{ fontSize: 12, fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0, wordBreak: 'break-all' }}>
              {JSON.stringify(result.payload, null, 2)}
            </pre>
          </div>
        </>
      )}

      {/* ── Cheat Sheet ─────────────────────────────────────── */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cheatTitle}</h2>

        {/* Registered Claims Table */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.registeredTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Claim</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['iss', 'Issuer', 'String', 'Entity that issued the JWT'],
                ['sub', 'Subject', 'String', 'Subject of the JWT (usually user ID)'],
                ['aud', 'Audience', 'String/Array', 'Intended recipient(s) of the JWT'],
                ['exp', 'Expiration', 'Number', 'Unix timestamp when token expires'],
                ['nbf', 'Not Before', 'Number', 'Unix timestamp before which token is invalid'],
                ['iat', 'Issued At', 'Number', 'Unix timestamp when token was created'],
                ['jti', 'JWT ID', 'String', 'Unique identifier for the token'],
              ].map(([claim, name, type, desc], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600, color: '#8b5cf6' }}>{claim}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{name}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)' }}>{type}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Public Claims Table */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.publicTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Claim</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Standard</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['name', 'Full Name', 'OpenID Connect Core'],
                ['email', 'Email', 'OpenID Connect Core'],
                ['email_verified', 'Email Verified', 'OpenID Connect Core'],
                ['azp', 'Authorized Party', 'OpenID Connect Core'],
                ['nonce', 'Nonce', 'OpenID Connect Core'],
                ['at_hash', 'Access Token Hash', 'OpenID Connect Core'],
                ['auth_time', 'Auth Time', 'OpenID Connect Core'],
                ['acr', 'Authentication Context', 'OpenID Connect Core'],
                ['amr', 'Authentication Methods', 'OpenID Connect Core'],
              ].map(([claim, name, standard], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600, color: '#f59e0b' }}>{claim}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{name}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{standard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Private Claims */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.privateTitle}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.privateDesc}</p>

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
            { href: `/${lang}/tools/jwt-token-decoder`, label: 'JWT Token Decoder' },
            { href: `/${lang}/tools/jwt-validator`, label: 'JWT Validator' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
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
