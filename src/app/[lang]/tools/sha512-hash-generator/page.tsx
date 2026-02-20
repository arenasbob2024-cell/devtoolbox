'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

async function hashText(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'SHA-512 Hash Generator',
    description: 'Generate SHA-512 hashes from any text. All processing happens in your browser — no data leaves your device.',
    inputLabel: 'Text to Hash',
    inputPlaceholder: 'Enter text to generate SHA-512 hash...',
    generateBtn: 'Generate SHA-512 Hash',
    resultLabel: 'SHA-512 Hash (128 hex characters)',
    clear: 'Clear',
    uppercase: 'Uppercase',
    cheatTitle: 'SHA-512 Hash Quick Reference',
    aboutTitle: 'What is SHA-512?',
    aboutText: 'SHA-512 (Secure Hash Algorithm 512-bit) is a member of the SHA-2 family designed by the NSA and published by NIST in 2001. It produces a 512-bit (64-byte) hash value, rendered as a 128-character hexadecimal string. SHA-512 is the strongest widely-used hash function in the SHA-2 family and is commonly used in high-security applications, digital signatures, certificate validation, and password hashing schemes like bcrypt and PBKDF2. It operates on 64-bit words, making it faster than SHA-256 on 64-bit processors.',
    propertiesTitle: 'Key Properties',
    propOutputLen: 'Output Length', propOutputLenVal: '512 bits (128 hex chars)',
    propBlockSize: 'Block Size', propBlockSizeVal: '1024 bits (128 bytes)',
    propWordSize: 'Word Size', propWordSizeVal: '64 bits',
    propSecurity: 'Security Status', propSecurityVal: 'Strong — no known practical attacks',
    propSpeed: 'Speed', propSpeedVal: 'Fast on 64-bit CPUs (~500 MB/s)',
    propRounds: 'Rounds', propRoundsVal: '80 rounds',
    useCasesTitle: 'Common Use Cases',
    useCase1: 'High-security digital signatures',
    useCase2: 'Certificate chain validation',
    useCase3: 'Password hashing (PBKDF2-SHA512)',
    useCase4: 'Linux /etc/shadow password storage',
    useCase5: 'HMAC-SHA512 for API authentication',
    comparisonTitle: 'SHA-512 vs Other Hash Algorithms',
    codeTitle: 'Code Examples',
    relatedTitle: 'Related Hash Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Is SHA-512 more secure than SHA-256?',
    faq1a: 'SHA-512 provides a larger security margin than SHA-256 (256 bits of collision resistance vs 128 bits). However, both are considered secure with no known practical attacks. SHA-512 is preferred when maximum security margin is needed or when running on 64-bit processors where it is actually faster than SHA-256. For most applications, SHA-256 provides sufficient security.',
    faq2q: 'Why is SHA-512 faster than SHA-256 on 64-bit systems?',
    faq2a: 'SHA-512 operates on 64-bit words natively, which maps directly to 64-bit CPU registers and operations. SHA-256 uses 32-bit words, so on a 64-bit processor it does not fully utilize the wider registers. This means SHA-512 can process more data per CPU cycle on 64-bit systems, making it paradoxically faster despite producing a longer hash.',
    faq3q: 'What is SHA-512/256 and how is it different?',
    faq3a: 'SHA-512/256 is a truncated version of SHA-512 that outputs only 256 bits. It uses the same algorithm as SHA-512 but with different initial values, then truncates the output to 256 bits. This gives you the speed advantage of SHA-512 on 64-bit systems while producing a 256-bit hash. It also provides protection against length extension attacks that plain SHA-256 is vulnerable to.',
  },
  zh: {
    title: 'SHA-512哈希生成器',
    description: '从任何文本生成SHA-512哈希值。所有处理在浏览器本地完成，数据不会离开您的设备。',
    inputLabel: '输入文本',
    inputPlaceholder: '输入文本以生成SHA-512哈希...',
    generateBtn: '生成SHA-512哈希',
    resultLabel: 'SHA-512哈希值（128个十六进制字符）',
    clear: '清除',
    uppercase: '大写',
    cheatTitle: 'SHA-512哈希速查表',
    aboutTitle: '什么是SHA-512？',
    aboutText: 'SHA-512（安全哈希算法512位）是SHA-2家族的成员，由NSA设计并于2001年由NIST发布。它产生512位（64字节）的哈希值，呈现为128个十六进制字符。SHA-512是SHA-2家族中最强的广泛使用的哈希函数，常用于高安全性应用、数字签名、证书验证和密码哈希方案（如bcrypt和PBKDF2）。它操作64位字，因此在64位处理器上比SHA-256更快。',
    propertiesTitle: '关键属性',
    propOutputLen: '输出长度', propOutputLenVal: '512位（128个十六进制字符）',
    propBlockSize: '块大小', propBlockSizeVal: '1024位（128字节）',
    propWordSize: '字大小', propWordSizeVal: '64位',
    propSecurity: '安全状态', propSecurityVal: '强 — 无已知实际攻击',
    propSpeed: '速度', propSpeedVal: '在64位CPU上快速（约500 MB/s）',
    propRounds: '轮次', propRoundsVal: '80轮',
    useCasesTitle: '常见用例',
    useCase1: '高安全性数字签名', useCase2: '证书链验证', useCase3: '密码哈希（PBKDF2-SHA512）', useCase4: 'Linux /etc/shadow密码存储', useCase5: 'HMAC-SHA512 API认证',
    comparisonTitle: 'SHA-512与其他哈希算法比较', codeTitle: '代码示例', relatedTitle: '相关哈希工具', faqTitle: '常见问题',
    faq1q: 'SHA-512比SHA-256更安全吗？',
    faq1a: 'SHA-512提供比SHA-256更大的安全裕度（碰撞抵抗256位 vs 128位）。但两者都被认为是安全的。SHA-512在需要最大安全裕度或在64位处理器上运行时更受推荐。',
    faq2q: '为什么SHA-512在64位系统上比SHA-256更快？',
    faq2a: 'SHA-512原生操作64位字，直接映射到64位CPU寄存器。SHA-256使用32位字，因此在64位处理器上不能充分利用更宽的寄存器，使得SHA-512在64位系统上反而更快。',
    faq3q: '什么是SHA-512/256？有什么不同？',
    faq3a: 'SHA-512/256是SHA-512的截断版本，仅输出256位。它使用与SHA-512相同的算法但具有不同的初始值，然后将输出截断为256位。这在64位系统上提供SHA-512的速度优势，同时生成256位哈希。',
  },
  fr: {
    title: 'Generateur de Hash SHA-512',
    description: 'Generez des hashes SHA-512 a partir de texte. Tout le traitement se fait dans votre navigateur.',
    inputLabel: 'Texte a hacher',
    inputPlaceholder: 'Entrez le texte pour generer le hash SHA-512...',
    generateBtn: 'Generer le Hash SHA-512',
    resultLabel: 'Hash SHA-512 (128 caracteres hexadecimaux)',
    clear: 'Effacer', uppercase: 'Majuscules',
    cheatTitle: 'Reference rapide SHA-512',
    aboutTitle: "Qu'est-ce que SHA-512 ?",
    aboutText: "SHA-512 est un membre de la famille SHA-2 concu par la NSA et publie par le NIST en 2001. Il produit une valeur de hachage de 512 bits (128 caracteres hexadecimaux). C'est la fonction de hachage la plus forte de la famille SHA-2, utilisee dans les applications haute securite et le hachage de mots de passe. Il est plus rapide que SHA-256 sur les processeurs 64 bits.",
    propertiesTitle: 'Proprietes cles',
    propOutputLen: 'Longueur de sortie', propOutputLenVal: '512 bits (128 car. hex)',
    propBlockSize: 'Taille de bloc', propBlockSizeVal: '1024 bits (128 octets)',
    propWordSize: 'Taille de mot', propWordSizeVal: '64 bits',
    propSecurity: 'Statut securite', propSecurityVal: 'Fort — aucune attaque pratique connue',
    propSpeed: 'Vitesse', propSpeedVal: 'Rapide sur CPU 64 bits (~500 Mo/s)',
    propRounds: 'Tours', propRoundsVal: '80 tours',
    useCasesTitle: "Cas d'utilisation courants",
    useCase1: 'Signatures numeriques haute securite', useCase2: 'Validation de chaine de certificats', useCase3: 'Hachage de mots de passe (PBKDF2-SHA512)', useCase4: 'Stockage de mots de passe Linux', useCase5: 'HMAC-SHA512 pour authentification API',
    comparisonTitle: 'SHA-512 vs autres algorithmes', codeTitle: 'Exemples de code', relatedTitle: 'Outils de hash connexes', faqTitle: 'Questions frequentes',
    faq1q: 'SHA-512 est-il plus sur que SHA-256 ?', faq1a: 'SHA-512 offre une marge de securite plus grande (256 bits de resistance aux collisions vs 128 bits). Les deux sont consideres comme surs.',
    faq2q: 'Pourquoi SHA-512 est-il plus rapide que SHA-256 sur les systemes 64 bits ?', faq2a: 'SHA-512 opere sur des mots de 64 bits, utilisant pleinement les registres des processeurs 64 bits.',
    faq3q: "Qu'est-ce que SHA-512/256 ?", faq3a: 'SHA-512/256 est une version tronquee de SHA-512 qui produit seulement 256 bits, offrant la vitesse de SHA-512 sur les systemes 64 bits.',
  },
  de: {
    title: 'SHA-512 Hash Generator',
    description: 'SHA-512 Hashes aus Text generieren. Alle Berechnungen erfolgen lokal in Ihrem Browser.',
    inputLabel: 'Text zum Hashen',
    inputPlaceholder: 'Text eingeben um SHA-512 Hash zu generieren...',
    generateBtn: 'SHA-512 Hash generieren',
    resultLabel: 'SHA-512 Hash (128 Hex-Zeichen)',
    clear: 'Loeschen', uppercase: 'Grossbuchstaben',
    cheatTitle: 'SHA-512 Hash Kurzreferenz',
    aboutTitle: 'Was ist SHA-512?',
    aboutText: 'SHA-512 ist ein Mitglied der SHA-2 Familie, entwickelt von der NSA und 2001 von NIST veroeffentlicht. Es erzeugt einen 512-Bit Hash-Wert (128 Hex-Zeichen). SHA-512 ist die staerkste Hash-Funktion der SHA-2 Familie und wird in Hochsicherheitsanwendungen und Passwort-Hashing verwendet. Es ist auf 64-Bit-Prozessoren schneller als SHA-256.',
    propertiesTitle: 'Kerneigenschaften',
    propOutputLen: 'Ausgabelaenge', propOutputLenVal: '512 Bit (128 Hex-Zeichen)',
    propBlockSize: 'Blockgroesse', propBlockSizeVal: '1024 Bit (128 Bytes)',
    propWordSize: 'Wortgroesse', propWordSizeVal: '64 Bit',
    propSecurity: 'Sicherheitsstatus', propSecurityVal: 'Stark — keine bekannten Angriffe',
    propSpeed: 'Geschwindigkeit', propSpeedVal: 'Schnell auf 64-Bit-CPUs (~500 MB/s)',
    propRounds: 'Runden', propRoundsVal: '80 Runden',
    useCasesTitle: 'Haeufige Anwendungsfaelle',
    useCase1: 'Hochsicherheits-Signaturen', useCase2: 'Zertifikatskettenvalidierung', useCase3: 'Passwort-Hashing (PBKDF2-SHA512)', useCase4: 'Linux Passwortspeicherung', useCase5: 'HMAC-SHA512 fuer API-Authentifizierung',
    comparisonTitle: 'SHA-512 vs andere Algorithmen', codeTitle: 'Codebeispiele', relatedTitle: 'Verwandte Hash-Tools', faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Ist SHA-512 sicherer als SHA-256?', faq1a: 'SHA-512 bietet eine groessere Sicherheitsmarge (256 Bit Kollisionsresistenz vs 128 Bit). Beide gelten als sicher.',
    faq2q: 'Warum ist SHA-512 auf 64-Bit-Systemen schneller als SHA-256?', faq2a: 'SHA-512 arbeitet nativ mit 64-Bit-Woertern und nutzt die breiteren Register moderner 64-Bit-Prozessoren voll aus.',
    faq3q: 'Was ist SHA-512/256?', faq3a: 'SHA-512/256 ist eine verkuerzte Version von SHA-512, die nur 256 Bit ausgibt, mit der Geschwindigkeit von SHA-512 auf 64-Bit-Systemen.',
  },
  es: {
    title: 'Generador de Hash SHA-512',
    description: 'Genera hashes SHA-512 de cualquier texto. Todo el procesamiento se realiza en tu navegador.',
    inputLabel: 'Texto a hashear',
    inputPlaceholder: 'Introduce texto para generar el hash SHA-512...',
    generateBtn: 'Generar Hash SHA-512',
    resultLabel: 'Hash SHA-512 (128 caracteres hexadecimales)',
    clear: 'Limpiar', uppercase: 'Mayusculas',
    cheatTitle: 'Referencia rapida SHA-512',
    aboutTitle: 'Que es SHA-512?',
    aboutText: 'SHA-512 es un miembro de la familia SHA-2, disenado por la NSA y publicado por NIST en 2001. Produce un valor hash de 512 bits (128 caracteres hexadecimales). Es la funcion hash mas fuerte de la familia SHA-2, usada en aplicaciones de alta seguridad y esquemas de hashing de contrasenas. Es mas rapido que SHA-256 en procesadores de 64 bits.',
    propertiesTitle: 'Propiedades clave',
    propOutputLen: 'Longitud de salida', propOutputLenVal: '512 bits (128 car. hex)',
    propBlockSize: 'Tamano de bloque', propBlockSizeVal: '1024 bits (128 bytes)',
    propWordSize: 'Tamano de palabra', propWordSizeVal: '64 bits',
    propSecurity: 'Estado de seguridad', propSecurityVal: 'Fuerte — sin ataques practicos conocidos',
    propSpeed: 'Velocidad', propSpeedVal: 'Rapido en CPU 64 bits (~500 MB/s)',
    propRounds: 'Rondas', propRoundsVal: '80 rondas',
    useCasesTitle: 'Casos de uso comunes',
    useCase1: 'Firmas digitales de alta seguridad', useCase2: 'Validacion de cadena de certificados', useCase3: 'Hashing de contrasenas (PBKDF2-SHA512)', useCase4: 'Almacenamiento de contrasenas Linux', useCase5: 'HMAC-SHA512 para autenticacion API',
    comparisonTitle: 'SHA-512 vs otros algoritmos', codeTitle: 'Ejemplos de codigo', relatedTitle: 'Herramientas de hash relacionadas', faqTitle: 'Preguntas frecuentes',
    faq1q: 'Es SHA-512 mas seguro que SHA-256?', faq1a: 'SHA-512 ofrece un margen de seguridad mayor (256 bits de resistencia a colisiones vs 128 bits). Ambos se consideran seguros.',
    faq2q: 'Por que SHA-512 es mas rapido que SHA-256 en sistemas de 64 bits?', faq2a: 'SHA-512 opera con palabras de 64 bits nativamente, aprovechando los registros mas amplios de los procesadores de 64 bits.',
    faq3q: 'Que es SHA-512/256?', faq3a: 'SHA-512/256 es una version truncada de SHA-512 que produce solo 256 bits, con la velocidad de SHA-512 en sistemas de 64 bits.',
  },
  ja: {
    title: 'SHA-512ハッシュジェネレーター',
    description: 'テキストからSHA-512ハッシュを即座に生成。すべての処理はブラウザ内で完結します。',
    inputLabel: 'ハッシュするテキスト',
    inputPlaceholder: 'SHA-512ハッシュを生成するテキストを入力...',
    generateBtn: 'SHA-512ハッシュを生成',
    resultLabel: 'SHA-512ハッシュ（128文字の16進数）',
    clear: 'クリア', uppercase: '大文字',
    cheatTitle: 'SHA-512ハッシュクイックリファレンス',
    aboutTitle: 'SHA-512とは？',
    aboutText: 'SHA-512はNSAが設計し2001年にNISTが発行したSHA-2ファミリーのメンバーです。512ビット（128文字の16進数）のハッシュ値を生成します。SHA-2ファミリーで最も強力な広く使用されるハッシュ関数であり、高セキュリティアプリケーション、デジタル署名、パスワードハッシュに使用されます。64ビットプロセッサではSHA-256より高速です。',
    propertiesTitle: '主要プロパティ',
    propOutputLen: '出力長', propOutputLenVal: '512ビット（16進数128文字）',
    propBlockSize: 'ブロックサイズ', propBlockSizeVal: '1024ビット（128バイト）',
    propWordSize: 'ワードサイズ', propWordSizeVal: '64ビット',
    propSecurity: 'セキュリティ状態', propSecurityVal: '強力 — 既知の実用的な攻撃なし',
    propSpeed: '速度', propSpeedVal: '64ビットCPUで高速（約500 MB/s）',
    propRounds: 'ラウンド', propRoundsVal: '80ラウンド',
    useCasesTitle: '一般的な用途',
    useCase1: '高セキュリティデジタル署名', useCase2: '証明書チェーン検証', useCase3: 'パスワードハッシュ（PBKDF2-SHA512）', useCase4: 'Linuxパスワード保存', useCase5: 'HMAC-SHA512によるAPI認証',
    comparisonTitle: 'SHA-512と他のアルゴリズム', codeTitle: 'コード例', relatedTitle: '関連ハッシュツール', faqTitle: 'よくある質問',
    faq1q: 'SHA-512はSHA-256より安全ですか？', faq1a: 'SHA-512はSHA-256より大きなセキュリティマージンを提供します（衝突耐性256ビット vs 128ビット）。両方とも安全とされています。',
    faq2q: 'なぜ64ビットシステムでSHA-512はSHA-256より速いのですか？', faq2a: 'SHA-512はネイティブに64ビットワードを操作し、64ビットCPUレジスタを完全に活用します。',
    faq3q: 'SHA-512/256とは？', faq3a: 'SHA-512/256はSHA-512の切り詰め版で、256ビットのみを出力し、64ビットシステムでのSHA-512の速度を提供します。',
  },
  ko: {
    title: 'SHA-512 해시 생성기',
    description: '텍스트에서 SHA-512 해시를 즉시 생성하세요. 모든 처리는 브라우저에서 이루어집니다.',
    inputLabel: '해시할 텍스트',
    inputPlaceholder: 'SHA-512 해시를 생성할 텍스트를 입력하세요...',
    generateBtn: 'SHA-512 해시 생성',
    resultLabel: 'SHA-512 해시 (16진수 128자)',
    clear: '지우기', uppercase: '대문자',
    cheatTitle: 'SHA-512 해시 빠른 참조',
    aboutTitle: 'SHA-512란?',
    aboutText: 'SHA-512는 NSA가 설계하고 2001년 NIST가 발표한 SHA-2 패밀리의 멤버입니다. 512비트(128자의 16진수) 해시 값을 생성합니다. SHA-2 패밀리에서 가장 강력한 해시 함수이며 고보안 애플리케이션, 디지털 서명, 비밀번호 해싱에 사용됩니다. 64비트 프로세서에서 SHA-256보다 빠릅니다.',
    propertiesTitle: '주요 속성',
    propOutputLen: '출력 길이', propOutputLenVal: '512비트 (16진수 128자)',
    propBlockSize: '블록 크기', propBlockSizeVal: '1024비트 (128바이트)',
    propWordSize: '워드 크기', propWordSizeVal: '64비트',
    propSecurity: '보안 상태', propSecurityVal: '강함 — 알려진 실용적 공격 없음',
    propSpeed: '속도', propSpeedVal: '64비트 CPU에서 빠름 (~500 MB/s)',
    propRounds: '라운드', propRoundsVal: '80라운드',
    useCasesTitle: '일반적인 사용 사례',
    useCase1: '고보안 디지털 서명', useCase2: '인증서 체인 검증', useCase3: '비밀번호 해싱 (PBKDF2-SHA512)', useCase4: 'Linux 비밀번호 저장', useCase5: 'HMAC-SHA512 API 인증',
    comparisonTitle: 'SHA-512 vs 다른 알고리즘', codeTitle: '코드 예제', relatedTitle: '관련 해시 도구', faqTitle: '자주 묻는 질문',
    faq1q: 'SHA-512는 SHA-256보다 안전한가요?', faq1a: 'SHA-512는 SHA-256보다 큰 보안 마진을 제공합니다(충돌 저항성 256비트 vs 128비트). 둘 다 안전하다고 간주됩니다.',
    faq2q: '왜 64비트 시스템에서 SHA-512가 SHA-256보다 빠른가요?', faq2a: 'SHA-512는 네이티브로 64비트 워드를 처리하여 64비트 CPU 레지스터를 완전히 활용합니다.',
    faq3q: 'SHA-512/256이란?', faq3a: 'SHA-512/256은 SHA-512의 잘린 버전으로 256비트만 출력하며, 64비트 시스템에서 SHA-512의 속도를 제공합니다.',
  },
};

export default function SHA512HashGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [isUppercase, setIsUppercase] = useState(false);

  const generate = async () => {
    if (!input) return;
    const result = await hashText(input);
    setHash(result);
  };

  const formatHash = (h: string) => (isUppercase ? h.toUpperCase() : h);

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
    <ToolLayout title={t.title} description={t.description} toolId="sha512-hash-generator">
      {/* JSON-LD FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Tool UI */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          style={{ minHeight: 120 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={generate} className="btn btn-primary">{t.generateBtn}</button>
        <button onClick={() => { setInput(''); setHash(''); }} className="btn btn-secondary">{t.clear}</button>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', marginLeft: 'auto', cursor: 'pointer' }}>
          <input type="checkbox" checked={isUppercase} onChange={(e) => setIsUppercase(e.target.checked)} />
          {t.uppercase}
        </label>
      </div>

      {hash && (
        <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px', border: '1px solid var(--border-color)', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>{t.resultLabel}</span>
            <CopyButton text={formatHash(hash)} />
          </div>
          <code style={{ fontSize: 13, wordBreak: 'break-all', color: 'var(--text-primary)', fontFamily: 'monospace', lineHeight: 1.6 }}>
            {formatHash(hash)}
          </code>
        </div>
      )}

      {/* Cheat Sheet */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cheatTitle}</h2>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.aboutTitle}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.aboutText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.propertiesTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <tbody>
              {[
                [t.propOutputLen, t.propOutputLenVal],
                [t.propBlockSize, t.propBlockSizeVal],
                [t.propWordSize, t.propWordSizeVal],
                [t.propSecurity, t.propSecurityVal],
                [t.propSpeed, t.propSpeedVal],
                [t.propRounds, t.propRoundsVal],
              ].map(([key, val], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{key}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.useCasesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 20 }}>
          <li>{t.useCase1}</li>
          <li>{t.useCase2}</li>
          <li>{t.useCase3}</li>
          <li>{t.useCase4}</li>
          <li>{t.useCase5}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.comparisonTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Algorithm</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Output</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Security</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Speed (64-bit)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['MD5', '128 bits', 'Broken', 'Very Fast'],
                ['SHA-1', '160 bits', 'Weak', 'Fast'],
                ['SHA-256', '256 bits', 'Strong', 'Moderate'],
                ['SHA-384', '384 bits', 'Strong', 'Fast'],
                ['SHA-512', '512 bits', 'Strong', 'Fast'],
              ].map(([algo, output, security, speed], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', background: i === 4 ? 'var(--bg-input)' : 'transparent' }}>
                  <td style={{ padding: '8px 12px', fontWeight: i === 4 ? 700 : 400 }}>{algo}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{output}</td>
                  <td style={{ padding: '8px 12px', color: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#22c55e' }}>{security}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.codeTitle}</h3>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)' }}>JavaScript (Node.js)</span>
          <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', marginTop: 4 }}>
            <code>{`const crypto = require('crypto');
const hash = crypto.createHash('sha512')
  .update('Hello, World!')
  .digest('hex');
console.log(hash); // (128 hex chars)`}</code>
          </pre>
        </div>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)' }}>JavaScript (Browser)</span>
          <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', marginTop: 4 }}>
            <code>{`const data = new TextEncoder().encode('Hello, World!');
const hashBuffer = await crypto.subtle.digest('SHA-512', data);
const hex = [...new Uint8Array(hashBuffer)]
  .map(b => b.toString(16).padStart(2, '0')).join('');`}</code>
          </pre>
        </div>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)' }}>Python</span>
          <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', marginTop: 4 }}>
            <code>{`import hashlib
hash = hashlib.sha512('Hello, World!'.encode()).hexdigest()
print(hash)  # (128 hex chars)`}</code>
          </pre>
        </div>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)' }}>Bash / OpenSSL</span>
          <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', marginTop: 4 }}>
            <code>{`echo -n "Hello, World!" | openssl dgst -sha512
# or for file:
sha512sum filename.txt`}</code>
          </pre>
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
            { href: `/${lang}/tools/hash-generator`, label: 'Hash Generator (All)' },
            { href: `/${lang}/tools/md5-hash-generator`, label: 'MD5 Hash Generator' },
            { href: `/${lang}/tools/sha1-hash-generator`, label: 'SHA-1 Hash Generator' },
            { href: `/${lang}/tools/sha256-hash-generator`, label: 'SHA-256 Hash Generator' },
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
