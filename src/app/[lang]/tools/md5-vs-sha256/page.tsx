'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'MD5 vs SHA-256',
    description: 'A detailed comparison of MD5 and SHA-256 hash algorithms to help you choose the right one for your project.',
    intro: 'MD5 and SHA-256 are two of the most widely used hash algorithms. While MD5 was once the standard for checksums and integrity verification, SHA-256 has become the go-to choice for security-critical applications. This guide breaks down their key differences.',
    tableFeature: 'Feature', tableMd5: 'MD5', tableSha256: 'SHA-256',
    outputLen: 'Output Length', outputMd5: '128 bits (32 hex chars)', outputSha: '256 bits (64 hex chars)',
    security: 'Security', secMd5: 'Broken (collisions since 2004)', secSha: 'Secure (no known collisions)',
    speed: 'Speed', spdMd5: 'Very fast (~600 MB/s)', spdSha: 'Slower (~250 MB/s)',
    collisionRes: 'Collision Resistance', colMd5: 'Weak', colSha: 'Strong',
    useCase: 'Primary Use', useMd5: 'Checksums, non-security hashing', useSha: 'Digital signatures, certificates, blockchain',
    whatIsMd5: 'What is MD5?',
    md5Text: 'MD5 (Message Digest Algorithm 5) was designed by Ronald Rivest in 1991. It produces a 128-bit hash value, typically expressed as a 32-character hexadecimal string. MD5 was once widely used for cryptographic purposes, but collision attacks demonstrated in 2004 by Wang and Yu made it unsuitable for security. It remains useful for checksums and data deduplication where security is not a concern.',
    whatIsSha: 'What is SHA-256?',
    shaText: 'SHA-256 (Secure Hash Algorithm 256-bit) is part of the SHA-2 family designed by the NSA, published in 2001. It produces a 256-bit hash value (64 hex characters). SHA-256 is used in TLS/SSL certificates, blockchain (Bitcoin), code signing, and anywhere cryptographic security is required. No practical collision attacks have been found against SHA-256.',
    whenMd5: 'When to Use MD5',
    md5Use1: 'File integrity checks (non-security)',
    md5Use2: 'Cache key generation',
    md5Use3: 'Data deduplication',
    md5Use4: 'Database record fingerprinting',
    md5Use5: 'Legacy system compatibility',
    whenSha: 'When to Use SHA-256',
    shaUse1: 'Password hashing (with salt/bcrypt)',
    shaUse2: 'Digital signatures and certificates',
    shaUse3: 'Blockchain and cryptocurrency',
    shaUse4: 'Code signing and verification',
    shaUse5: 'Any security-critical application',
    verdict: 'TL;DR / Verdict',
    verdictText: 'Use SHA-256 for anything security-related. Use MD5 only for non-security purposes like checksums and cache keys where speed matters more than collision resistance. When in doubt, choose SHA-256.',
    tryTools: 'Try Our Hash Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Is MD5 faster than SHA-256?',
    faq1a: 'Yes, MD5 is approximately 2-3x faster than SHA-256 because it produces a shorter hash and uses fewer computational rounds. However, for most applications the speed difference is negligible, and SHA-256 should be preferred for its security properties.',
    faq2q: 'Can I still use MD5 for password hashing?',
    faq2a: 'No, MD5 should never be used for password hashing. It is too fast (making brute-force attacks easy) and has known collision vulnerabilities. Use bcrypt, scrypt, or Argon2 for password hashing instead.',
    faq3q: 'Is SHA-256 quantum-resistant?',
    faq3a: 'SHA-256 offers some resistance to quantum attacks. Grover\'s algorithm could theoretically reduce its security to 128-bit equivalent, which is still considered secure. For long-term quantum resistance, SHA-384 or SHA-512 may be better choices.',
  },
  zh: {
    title: 'MD5 vs SHA-256',
    description: 'MD5 与 SHA-256 哈希算法的详细对比，帮助您为项目选择正确的算法。',
    intro: 'MD5 和 SHA-256 是两种最广泛使用的哈希算法。MD5 曾是校验和与完整性验证的标准，而 SHA-256 已成为安全关键应用的首选。本指南分析了它们的主要区别。',
    tableFeature: '特性', tableMd5: 'MD5', tableSha256: 'SHA-256',
    outputLen: '输出长度', outputMd5: '128 位（32 个十六进制字符）', outputSha: '256 位（64 个十六进制字符）',
    security: '安全性', secMd5: '已破解（2004年发现碰撞）', secSha: '安全（无已知碰撞）',
    speed: '速度', spdMd5: '非常快（约 600 MB/s）', spdSha: '较慢（约 250 MB/s）',
    collisionRes: '碰撞抗性', colMd5: '弱', colSha: '强',
    useCase: '主要用途', useMd5: '校验和、非安全哈希', useSha: '数字签名、证书、区块链',
    whatIsMd5: '什么是 MD5？',
    md5Text: 'MD5（消息摘要算法5）由 Ronald Rivest 于 1991 年设计，产生 128 位哈希值。2004 年碰撞攻击的发现使其不再适用于安全场景，但仍可用于校验和及数据去重。',
    whatIsSha: '什么是 SHA-256？',
    shaText: 'SHA-256 是 SHA-2 系列的一部分，由 NSA 设计，2001 年发布，产生 256 位哈希值。广泛用于 TLS/SSL 证书、区块链和代码签名等安全领域。',
    whenMd5: '何时使用 MD5', md5Use1: '文件完整性检查（非安全）', md5Use2: '缓存键生成', md5Use3: '数据去重', md5Use4: '数据库记录指纹', md5Use5: '兼容旧系统',
    whenSha: '何时使用 SHA-256', shaUse1: '密码哈希（配合 salt/bcrypt）', shaUse2: '数字签名和证书', shaUse3: '区块链和加密货币', shaUse4: '代码签名和验证', shaUse5: '任何安全关键应用',
    verdict: '总结', verdictText: '安全相关场景使用 SHA-256。仅在非安全场景（如校验和、缓存键）且速度优先时使用 MD5。有疑问时选择 SHA-256。',
    tryTools: '试试我们的哈希工具',
    faqTitle: '常见问题',
    faq1q: 'MD5 比 SHA-256 快吗？', faq1a: '是的，MD5 大约比 SHA-256 快 2-3 倍，但对大多数应用来说速度差异可忽略不计，安全性应优先考虑。',
    faq2q: '还能用 MD5 做密码哈希吗？', faq2a: '不能。MD5 速度太快且有碰撞漏洞，请使用 bcrypt、scrypt 或 Argon2。',
    faq3q: 'SHA-256 能抵抗量子攻击吗？', faq3a: 'SHA-256 具有一定的量子抗性。Grover 算法理论上可将其安全性降低到 128 位等效，仍被认为是安全的。',
  },
  fr: {
    title: 'MD5 vs SHA-256',
    description: 'Comparaison detaillee des algorithmes de hachage MD5 et SHA-256.',
    intro: 'MD5 et SHA-256 sont deux algorithmes de hachage parmi les plus utilises. Ce guide analyse leurs differences cles.',
    tableFeature: 'Caracteristique', tableMd5: 'MD5', tableSha256: 'SHA-256',
    outputLen: 'Longueur de sortie', outputMd5: '128 bits (32 car. hex)', outputSha: '256 bits (64 car. hex)',
    security: 'Securite', secMd5: 'Casse (collisions depuis 2004)', secSha: 'Sur (aucune collision connue)',
    speed: 'Vitesse', spdMd5: 'Tres rapide (~600 Mo/s)', spdSha: 'Plus lent (~250 Mo/s)',
    collisionRes: 'Resistance aux collisions', colMd5: 'Faible', colSha: 'Forte',
    useCase: 'Utilisation principale', useMd5: 'Checksums, hachage non securitaire', useSha: 'Signatures numeriques, certificats, blockchain',
    whatIsMd5: 'Qu\'est-ce que MD5 ?', md5Text: 'MD5 produit un hash de 128 bits. Casse depuis 2004, il reste utile pour les checksums non securitaires.',
    whatIsSha: 'Qu\'est-ce que SHA-256 ?', shaText: 'SHA-256 produit un hash de 256 bits et est utilise pour les certificats TLS/SSL, la blockchain et la signature de code.',
    whenMd5: 'Quand utiliser MD5', md5Use1: 'Verification d\'integrite de fichiers', md5Use2: 'Generation de cles de cache', md5Use3: 'Deduplication de donnees', md5Use4: 'Empreintes de base de donnees', md5Use5: 'Compatibilite systemes anciens',
    whenSha: 'Quand utiliser SHA-256', shaUse1: 'Hachage de mots de passe', shaUse2: 'Signatures et certificats numeriques', shaUse3: 'Blockchain et cryptomonnaies', shaUse4: 'Signature de code', shaUse5: 'Applications critiques en securite',
    verdict: 'Resume', verdictText: 'Utilisez SHA-256 pour tout ce qui touche a la securite. MD5 uniquement pour les checksums et caches.',
    tryTools: 'Essayez nos outils de hachage',
    faqTitle: 'Questions frequentes',
    faq1q: 'MD5 est-il plus rapide que SHA-256 ?', faq1a: 'Oui, MD5 est environ 2-3x plus rapide, mais SHA-256 est preferable pour la securite.',
    faq2q: 'Peut-on utiliser MD5 pour le hachage de mots de passe ?', faq2a: 'Non. Utilisez bcrypt, scrypt ou Argon2.',
    faq3q: 'SHA-256 est-il resistant au quantique ?', faq3a: 'SHA-256 offre une certaine resistance quantique avec une securite equivalente a 128 bits.',
  },
  de: {
    title: 'MD5 vs SHA-256',
    description: 'Detaillierter Vergleich der Hash-Algorithmen MD5 und SHA-256.',
    intro: 'MD5 und SHA-256 gehoeren zu den meistverwendeten Hash-Algorithmen. Dieser Leitfaden analysiert ihre wichtigsten Unterschiede.',
    tableFeature: 'Eigenschaft', tableMd5: 'MD5', tableSha256: 'SHA-256',
    outputLen: 'Ausgabelaenge', outputMd5: '128 Bit (32 Hex-Zeichen)', outputSha: '256 Bit (64 Hex-Zeichen)',
    security: 'Sicherheit', secMd5: 'Gebrochen (Kollisionen seit 2004)', secSha: 'Sicher (keine bekannten Kollisionen)',
    speed: 'Geschwindigkeit', spdMd5: 'Sehr schnell (~600 MB/s)', spdSha: 'Langsamer (~250 MB/s)',
    collisionRes: 'Kollisionsresistenz', colMd5: 'Schwach', colSha: 'Stark',
    useCase: 'Hauptverwendung', useMd5: 'Checksummen, nicht-sicherheitskritisches Hashing', useSha: 'Digitale Signaturen, Zertifikate, Blockchain',
    whatIsMd5: 'Was ist MD5?', md5Text: 'MD5 erzeugt einen 128-Bit-Hash. Seit 2004 gebrochen, aber nuetzlich fuer Checksummen.',
    whatIsSha: 'Was ist SHA-256?', shaText: 'SHA-256 erzeugt einen 256-Bit-Hash und wird fuer TLS/SSL-Zertifikate, Blockchain und Code-Signierung verwendet.',
    whenMd5: 'Wann MD5 verwenden', md5Use1: 'Dateiintegritaetspruefung', md5Use2: 'Cache-Key-Generierung', md5Use3: 'Datendeduplizierung', md5Use4: 'Datenbank-Fingerprinting', md5Use5: 'Legacy-Kompatibilitaet',
    whenSha: 'Wann SHA-256 verwenden', shaUse1: 'Passwort-Hashing', shaUse2: 'Digitale Signaturen', shaUse3: 'Blockchain', shaUse4: 'Code-Signierung', shaUse5: 'Sicherheitskritische Anwendungen',
    verdict: 'Fazit', verdictText: 'SHA-256 fuer alles Sicherheitsrelevante. MD5 nur fuer nicht-sicherheitskritische Zwecke.',
    tryTools: 'Probieren Sie unsere Hash-Tools',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Ist MD5 schneller als SHA-256?', faq1a: 'Ja, etwa 2-3x schneller, aber SHA-256 ist sicherer.',
    faq2q: 'Kann man MD5 fuer Passwort-Hashing verwenden?', faq2a: 'Nein. Verwenden Sie bcrypt, scrypt oder Argon2.',
    faq3q: 'Ist SHA-256 quantenresistent?', faq3a: 'SHA-256 bietet eine gewisse Quantenresistenz mit 128-Bit-aequivalenter Sicherheit.',
  },
  es: {
    title: 'MD5 vs SHA-256',
    description: 'Comparacion detallada de los algoritmos hash MD5 y SHA-256.',
    intro: 'MD5 y SHA-256 son dos de los algoritmos hash mas utilizados. Esta guia analiza sus diferencias clave.',
    tableFeature: 'Caracteristica', tableMd5: 'MD5', tableSha256: 'SHA-256',
    outputLen: 'Longitud de salida', outputMd5: '128 bits (32 car. hex)', outputSha: '256 bits (64 car. hex)',
    security: 'Seguridad', secMd5: 'Roto (colisiones desde 2004)', secSha: 'Seguro (sin colisiones conocidas)',
    speed: 'Velocidad', spdMd5: 'Muy rapido (~600 MB/s)', spdSha: 'Mas lento (~250 MB/s)',
    collisionRes: 'Resistencia a colisiones', colMd5: 'Debil', colSha: 'Fuerte',
    useCase: 'Uso principal', useMd5: 'Checksums, hashing no seguro', useSha: 'Firmas digitales, certificados, blockchain',
    whatIsMd5: 'Que es MD5?', md5Text: 'MD5 produce un hash de 128 bits. Roto desde 2004, sigue siendo util para checksums no criticos.',
    whatIsSha: 'Que es SHA-256?', shaText: 'SHA-256 produce un hash de 256 bits y se usa en certificados TLS/SSL, blockchain y firma de codigo.',
    whenMd5: 'Cuando usar MD5', md5Use1: 'Verificacion de integridad de archivos', md5Use2: 'Generacion de claves de cache', md5Use3: 'Deduplicacion de datos', md5Use4: 'Huellas de base de datos', md5Use5: 'Compatibilidad con sistemas legacy',
    whenSha: 'Cuando usar SHA-256', shaUse1: 'Hashing de contrasenas', shaUse2: 'Firmas y certificados digitales', shaUse3: 'Blockchain y criptomonedas', shaUse4: 'Firma de codigo', shaUse5: 'Aplicaciones criticas de seguridad',
    verdict: 'Resumen', verdictText: 'Use SHA-256 para todo lo relacionado con seguridad. MD5 solo para checksums y caches.',
    tryTools: 'Prueba nuestras herramientas de hash',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Es MD5 mas rapido que SHA-256?', faq1a: 'Si, aproximadamente 2-3x mas rapido, pero SHA-256 es preferible por seguridad.',
    faq2q: 'Puedo usar MD5 para hashing de contrasenas?', faq2a: 'No. Use bcrypt, scrypt o Argon2.',
    faq3q: 'Es SHA-256 resistente al cuantico?', faq3a: 'SHA-256 ofrece cierta resistencia cuantica con seguridad equivalente a 128 bits.',
  },
  ja: {
    title: 'MD5 vs SHA-256',
    description: 'MD5 と SHA-256 ハッシュアルゴリズムの詳細な比較ガイド。',
    intro: 'MD5 と SHA-256 は最も広く使われているハッシュアルゴリズムです。このガイドでは主要な違いを分析します。',
    tableFeature: '特性', tableMd5: 'MD5', tableSha256: 'SHA-256',
    outputLen: '出力長', outputMd5: '128ビット（16進数32文字）', outputSha: '256ビット（16進数64文字）',
    security: 'セキュリティ', secMd5: '破られた（2004年に衝突発見）', secSha: '安全（既知の衝突なし）',
    speed: '速度', spdMd5: '非常に高速（約600 MB/s）', spdSha: '低速（約250 MB/s）',
    collisionRes: '衝突耐性', colMd5: '弱い', colSha: '強い',
    useCase: '主な用途', useMd5: 'チェックサム、非セキュリティハッシュ', useSha: 'デジタル署名、証明書、ブロックチェーン',
    whatIsMd5: 'MD5とは？', md5Text: 'MD5は128ビットのハッシュ値を生成します。2004年以降セキュリティ用途には不適切ですが、チェックサムには有用です。',
    whatIsSha: 'SHA-256とは？', shaText: 'SHA-256は256ビットのハッシュ値を生成し、TLS/SSL証明書、ブロックチェーン、コード署名に使用されます。',
    whenMd5: 'MD5を使用する場合', md5Use1: 'ファイル整合性チェック', md5Use2: 'キャッシュキー生成', md5Use3: 'データ重複排除', md5Use4: 'DBレコードフィンガープリント', md5Use5: 'レガシー互換性',
    whenSha: 'SHA-256を使用する場合', shaUse1: 'パスワードハッシュ', shaUse2: 'デジタル署名・証明書', shaUse3: 'ブロックチェーン', shaUse4: 'コード署名', shaUse5: 'セキュリティ重要アプリ',
    verdict: 'まとめ', verdictText: 'セキュリティ関連にはSHA-256を使用。MD5は非セキュリティ用途のみ。迷ったらSHA-256。',
    tryTools: 'ハッシュツールを試す',
    faqTitle: 'よくある質問',
    faq1q: 'MD5はSHA-256より速いですか？', faq1a: 'はい、約2-3倍速いですが、セキュリティにはSHA-256が推奨されます。',
    faq2q: 'MD5をパスワードハッシュに使えますか？', faq2a: 'いいえ。bcrypt、scrypt、またはArgon2を使用してください。',
    faq3q: 'SHA-256は量子耐性がありますか？', faq3a: 'SHA-256は128ビット相当の量子耐性を持ち、まだ安全とされています。',
  },
  ko: {
    title: 'MD5 vs SHA-256',
    description: 'MD5와 SHA-256 해시 알고리즘의 상세 비교 가이드.',
    intro: 'MD5와 SHA-256은 가장 널리 사용되는 해시 알고리즘입니다. 이 가이드에서 주요 차이점을 분석합니다.',
    tableFeature: '특성', tableMd5: 'MD5', tableSha256: 'SHA-256',
    outputLen: '출력 길이', outputMd5: '128비트 (16진수 32자)', outputSha: '256비트 (16진수 64자)',
    security: '보안', secMd5: '깨짐 (2004년 충돌 발견)', secSha: '안전 (알려진 충돌 없음)',
    speed: '속도', spdMd5: '매우 빠름 (~600 MB/s)', spdSha: '느림 (~250 MB/s)',
    collisionRes: '충돌 저항성', colMd5: '약함', colSha: '강함',
    useCase: '주요 용도', useMd5: '체크섬, 비보안 해싱', useSha: '디지털 서명, 인증서, 블록체인',
    whatIsMd5: 'MD5란?', md5Text: 'MD5는 128비트 해시 값을 생성합니다. 2004년 이후 보안 용도에는 부적합하지만 체크섬에는 유용합니다.',
    whatIsSha: 'SHA-256이란?', shaText: 'SHA-256은 256비트 해시 값을 생성하며, TLS/SSL 인증서, 블록체인, 코드 서명에 사용됩니다.',
    whenMd5: 'MD5를 사용할 때', md5Use1: '파일 무결성 검사', md5Use2: '캐시 키 생성', md5Use3: '데이터 중복 제거', md5Use4: 'DB 레코드 지문', md5Use5: '레거시 호환성',
    whenSha: 'SHA-256을 사용할 때', shaUse1: '비밀번호 해싱', shaUse2: '디지털 서명/인증서', shaUse3: '블록체인', shaUse4: '코드 서명', shaUse5: '보안 중요 애플리케이션',
    verdict: '요약', verdictText: '보안 관련에는 SHA-256을 사용하세요. MD5는 비보안 용도에만 사용하세요.',
    tryTools: '해시 도구 사용해보기',
    faqTitle: '자주 묻는 질문',
    faq1q: 'MD5가 SHA-256보다 빠른가요?', faq1a: '네, 약 2-3배 빠르지만 보안에는 SHA-256이 권장됩니다.',
    faq2q: 'MD5를 비밀번호 해싱에 사용할 수 있나요?', faq2a: '아닙니다. bcrypt, scrypt 또는 Argon2를 사용하세요.',
    faq3q: 'SHA-256은 양자 저항성이 있나요?', faq3a: 'SHA-256은 128비트 상당의 양자 저항성을 가지며 아직 안전합니다.',
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

export default function Md5VsSha256() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ui.faq1q, acceptedAnswer: { '@type': 'Answer', text: ui.faq1a } },
      { '@type': 'Question', name: ui.faq2q, acceptedAnswer: { '@type': 'Answer', text: ui.faq2a } },
      { '@type': 'Question', name: ui.faq3q, acceptedAnswer: { '@type': 'Answer', text: ui.faq3a } },
    ],
  };

  return (
    <ToolLayout title={ui.title} description={ui.description} toolId="md5-vs-sha256">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={pStyle}>{ui.intro}</p>

      {/* Quick Comparison Table */}
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr><th style={thStyle}>{ui.tableFeature}</th><th style={thStyle}>{ui.tableMd5}</th><th style={thStyle}>{ui.tableSha256}</th></tr>
          </thead>
          <tbody>
            {[
              [ui.outputLen, ui.outputMd5, ui.outputSha],
              [ui.security, ui.secMd5, ui.secSha],
              [ui.speed, ui.spdMd5, ui.spdSha],
              [ui.collisionRes, ui.colMd5, ui.colSha],
              [ui.useCase, ui.useMd5, ui.useSha],
            ].map(([f, a, b], i) => (
              <tr key={i}><td style={{ ...tdStyle, fontWeight: 600 }}>{f}</td><td style={tdStyle}>{a}</td><td style={tdStyle}>{b}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* What is MD5 */}
      <div style={sectionStyle}><h2 style={h2Style}>{ui.whatIsMd5}</h2><p style={pStyle}>{ui.md5Text}</p></div>

      {/* What is SHA-256 */}
      <div style={sectionStyle}><h2 style={h2Style}>{ui.whatIsSha}</h2><p style={pStyle}>{ui.shaText}</p></div>

      {/* When to use */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, ...sectionStyle }}>
        <div style={cardStyle}>
          <h3 style={h3Style}>{ui.whenMd5}</h3>
          <ul style={ulStyle}><li>{ui.md5Use1}</li><li>{ui.md5Use2}</li><li>{ui.md5Use3}</li><li>{ui.md5Use4}</li><li>{ui.md5Use5}</li></ul>
        </div>
        <div style={cardStyle}>
          <h3 style={h3Style}>{ui.whenSha}</h3>
          <ul style={ulStyle}><li>{ui.shaUse1}</li><li>{ui.shaUse2}</li><li>{ui.shaUse3}</li><li>{ui.shaUse4}</li><li>{ui.shaUse5}</li></ul>
        </div>
      </div>

      {/* Verdict */}
      <div style={{ ...cardStyle, background: 'var(--bg-input)', ...sectionStyle }}>
        <h2 style={h2Style}>{ui.verdict}</h2>
        <p style={{ ...pStyle, fontWeight: 500 }}>{ui.verdictText}</p>
      </div>

      {/* Try Our Tools */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{ui.tryTools}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/hash-generator`, label: 'Hash Generator' },
            { href: `/${lang}/tools/md5-hash-generator`, label: 'MD5 Hash Generator' },
            { href: `/${lang}/tools/sha256-hash-generator`, label: 'SHA-256 Hash Generator' },
            { href: `/${lang}/tools/multi-hash-generator`, label: 'Multi Hash Generator' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{ui.faqTitle}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[{ q: ui.faq1q, a: ui.faq1a }, { q: ui.faq2q, a: ui.faq2a }, { q: ui.faq3q, a: ui.faq3a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
