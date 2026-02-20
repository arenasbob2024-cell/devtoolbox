'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

async function hashText(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'SHA-1 Hash Generator',
    description: 'Generate SHA-1 hashes from any text. All processing happens in your browser — no data leaves your device.',
    inputLabel: 'Text to Hash',
    inputPlaceholder: 'Enter text to generate SHA-1 hash...',
    generateBtn: 'Generate SHA-1 Hash',
    resultLabel: 'SHA-1 Hash (40 hex characters)',
    clear: 'Clear',
    uppercase: 'Uppercase',
    cheatTitle: 'SHA-1 Hash Quick Reference',
    aboutTitle: 'What is SHA-1?',
    aboutText: 'SHA-1 (Secure Hash Algorithm 1) is a cryptographic hash function designed by the NSA and published by NIST in 1995. It produces a 160-bit (20-byte) hash value, rendered as a 40-character hexadecimal string. While SHA-1 was once the most widely used hash function, theoretical attacks were demonstrated in 2005 and practical collision attacks by Google in 2017 (the SHAttered attack). SHA-1 is now considered deprecated for security purposes but remains in legacy systems and is famously used by Git for commit identifiers.',
    propertiesTitle: 'Key Properties',
    propOutputLen: 'Output Length', propOutputLenVal: '160 bits (40 hex chars)',
    propBlockSize: 'Block Size', propBlockSizeVal: '512 bits (64 bytes)',
    propSecurity: 'Security Status', propSecurityVal: 'Deprecated — practical collisions (2017)',
    propSpeed: 'Speed', propSpeedVal: 'Fast (~500 MB/s on modern CPUs)',
    propRounds: 'Rounds', propRoundsVal: '80 rounds',
    useCasesTitle: 'Common Use Cases',
    useCase1: 'Git commit and object identifiers',
    useCase2: 'Legacy certificate validation',
    useCase3: 'HMAC-SHA1 (still considered secure in HMAC context)',
    useCase4: 'File integrity checks (legacy systems)',
    useCase5: 'TOTP/HOTP authentication tokens',
    comparisonTitle: 'SHA-1 vs Other Hash Algorithms',
    codeTitle: 'Code Examples',
    relatedTitle: 'Related Hash Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Why does Git still use SHA-1?',
    faq1a: 'Git uses SHA-1 for content-addressable storage and commit identification, not for security. A collision attack against Git would require creating two different repositories with the same SHA-1 hash, which is extremely difficult in practice. Git is gradually transitioning to SHA-256 (via the SHA-256 object format), but SHA-1 remains the default for backward compatibility.',
    faq2q: 'Is SHA-1 completely broken?',
    faq2a: 'SHA-1 is broken for collision resistance — Google demonstrated a practical collision in 2017 (SHAttered). However, SHA-1 is still considered secure for preimage resistance (finding an input that produces a given hash) and for use in HMAC constructions. For new applications, SHA-256 or SHA-3 should be used instead.',
    faq3q: 'What is the difference between SHA-1 and SHA-256?',
    faq3a: 'SHA-1 produces a 160-bit hash (40 hex chars) while SHA-256 produces a 256-bit hash (64 hex chars). SHA-256 is part of the newer SHA-2 family and is significantly more secure — no practical attacks have been found against SHA-256, while SHA-1 has been broken for collision resistance since 2017.',
  },
  zh: {
    title: 'SHA-1哈希生成器',
    description: '从任何文本生成SHA-1哈希值。所有处理在浏览器本地完成，数据不会离开您的设备。',
    inputLabel: '输入文本', inputPlaceholder: '输入文本以生成SHA-1哈希...', generateBtn: '生成SHA-1哈希', resultLabel: 'SHA-1哈希值（40个十六进制字符）', clear: '清除', uppercase: '大写',
    cheatTitle: 'SHA-1哈希速查表', aboutTitle: '什么是SHA-1？',
    aboutText: 'SHA-1（安全哈希算法1）是NSA设计并于1995年由NIST发布的加密哈希函数。它产生160位（20字节）的哈希值，呈现为40个十六进制字符。虽然SHA-1曾是使用最广泛的哈希函数，但2017年Google展示了实际碰撞攻击（SHAttered攻击）。SHA-1现在被认为不适合安全用途，但仍在遗留系统中使用，并且Git著名地使用SHA-1作为提交标识符。',
    propertiesTitle: '关键属性',
    propOutputLen: '输出长度', propOutputLenVal: '160位（40个十六进制字符）', propBlockSize: '块大小', propBlockSizeVal: '512位（64字节）', propSecurity: '安全状态', propSecurityVal: '已弃用 — 实际碰撞（2017）', propSpeed: '速度', propSpeedVal: '快速（现代CPU约500 MB/s）', propRounds: '轮次', propRoundsVal: '80轮',
    useCasesTitle: '常见用例', useCase1: 'Git提交和对象标识符', useCase2: '遗留证书验证', useCase3: 'HMAC-SHA1（在HMAC上下文中仍安全）', useCase4: '文件完整性检查（遗留系统）', useCase5: 'TOTP/HOTP认证令牌',
    comparisonTitle: 'SHA-1与其他哈希算法比较', codeTitle: '代码示例', relatedTitle: '相关哈希工具', faqTitle: '常见问题',
    faq1q: '为什么Git仍然使用SHA-1？', faq1a: 'Git使用SHA-1进行内容寻址存储和提交标识，而非安全目的。Git正在逐步过渡到SHA-256，但SHA-1仍为默认选项。',
    faq2q: 'SHA-1完全被破解了吗？', faq2a: 'SHA-1在碰撞抵抗方面已被破解（2017年Google展示了实际碰撞），但在原像抵抗和HMAC构造中仍被认为安全。',
    faq3q: 'SHA-1和SHA-256有什么区别？', faq3a: 'SHA-1产生160位哈希（40个十六进制字符），SHA-256产生256位哈希（64个十六进制字符）。SHA-256更安全，目前没有已知的实际攻击。',
  },
  fr: {
    title: 'Generateur de Hash SHA-1',
    description: 'Generez des hashes SHA-1 a partir de texte. Tout le traitement se fait dans votre navigateur.',
    inputLabel: 'Texte a hacher', inputPlaceholder: 'Entrez le texte pour generer le hash SHA-1...', generateBtn: 'Generer le Hash SHA-1', resultLabel: 'Hash SHA-1 (40 caracteres hexadecimaux)', clear: 'Effacer', uppercase: 'Majuscules',
    cheatTitle: 'Reference rapide SHA-1', aboutTitle: "Qu'est-ce que SHA-1 ?",
    aboutText: "SHA-1 est une fonction de hachage cryptographique concue par la NSA et publiee par le NIST en 1995. Elle produit une valeur de 160 bits (40 caracteres hex). Les attaques par collision pratiques ont ete demontrees par Google en 2017. SHA-1 est maintenant considere comme obsolete pour la securite mais reste utilise dans Git.",
    propertiesTitle: 'Proprietes cles',
    propOutputLen: 'Longueur de sortie', propOutputLenVal: '160 bits (40 car. hex)', propBlockSize: 'Taille de bloc', propBlockSizeVal: '512 bits (64 octets)', propSecurity: 'Statut securite', propSecurityVal: 'Obsolete — collisions pratiques (2017)', propSpeed: 'Vitesse', propSpeedVal: 'Rapide (~500 Mo/s)', propRounds: 'Tours', propRoundsVal: '80 tours',
    useCasesTitle: "Cas d'utilisation", useCase1: 'Identifiants de commit Git', useCase2: 'Validation de certificats legacy', useCase3: 'HMAC-SHA1', useCase4: 'Verification d\'integrite legacy', useCase5: 'Tokens TOTP/HOTP',
    comparisonTitle: 'SHA-1 vs autres algorithmes', codeTitle: 'Exemples de code', relatedTitle: 'Outils connexes', faqTitle: 'Questions frequentes',
    faq1q: 'Pourquoi Git utilise-t-il encore SHA-1 ?', faq1a: 'Git utilise SHA-1 pour le stockage adresse par contenu, pas pour la securite. Git transite progressivement vers SHA-256.',
    faq2q: 'SHA-1 est-il completement casse ?', faq2a: 'SHA-1 est casse pour la resistance aux collisions (2017) mais reste sur pour la preimage et HMAC.',
    faq3q: 'Quelle est la difference entre SHA-1 et SHA-256 ?', faq3a: 'SHA-1 produit 160 bits (40 car. hex), SHA-256 produit 256 bits (64 car. hex). SHA-256 est significativement plus sur.',
  },
  de: {
    title: 'SHA-1 Hash Generator',
    description: 'SHA-1 Hashes aus Text generieren. Alle Berechnungen erfolgen lokal in Ihrem Browser.',
    inputLabel: 'Text zum Hashen', inputPlaceholder: 'Text eingeben um SHA-1 Hash zu generieren...', generateBtn: 'SHA-1 Hash generieren', resultLabel: 'SHA-1 Hash (40 Hex-Zeichen)', clear: 'Loeschen', uppercase: 'Grossbuchstaben',
    cheatTitle: 'SHA-1 Hash Kurzreferenz', aboutTitle: 'Was ist SHA-1?',
    aboutText: 'SHA-1 ist eine kryptographische Hash-Funktion, die von der NSA entworfen und 1995 von NIST veroeffentlicht wurde. Sie erzeugt einen 160-Bit Hash-Wert (40 Hex-Zeichen). Praktische Kollisionsangriffe wurden 2017 von Google demonstriert. SHA-1 gilt als veraltet fuer Sicherheitszwecke, wird aber weiterhin in Git verwendet.',
    propertiesTitle: 'Kerneigenschaften',
    propOutputLen: 'Ausgabelaenge', propOutputLenVal: '160 Bit (40 Hex-Zeichen)', propBlockSize: 'Blockgroesse', propBlockSizeVal: '512 Bit (64 Bytes)', propSecurity: 'Sicherheitsstatus', propSecurityVal: 'Veraltet — praktische Kollisionen (2017)', propSpeed: 'Geschwindigkeit', propSpeedVal: 'Schnell (~500 MB/s)', propRounds: 'Runden', propRoundsVal: '80 Runden',
    useCasesTitle: 'Anwendungsfaelle', useCase1: 'Git Commit-Identifikatoren', useCase2: 'Legacy-Zertifikatsvalidierung', useCase3: 'HMAC-SHA1', useCase4: 'Dateiintegritaet (Legacy)', useCase5: 'TOTP/HOTP Token',
    comparisonTitle: 'SHA-1 vs andere Algorithmen', codeTitle: 'Codebeispiele', relatedTitle: 'Verwandte Tools', faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Warum verwendet Git noch SHA-1?', faq1a: 'Git verwendet SHA-1 fuer inhaltsadressierte Speicherung, nicht fuer Sicherheit. Git wechselt schrittweise zu SHA-256.',
    faq2q: 'Ist SHA-1 vollstaendig gebrochen?', faq2a: 'SHA-1 ist fuer Kollisionsresistenz gebrochen (2017), aber fuer Preimage und HMAC noch sicher.',
    faq3q: 'Was ist der Unterschied zwischen SHA-1 und SHA-256?', faq3a: 'SHA-1 erzeugt 160 Bit (40 Hex-Zeichen), SHA-256 erzeugt 256 Bit (64 Hex-Zeichen). SHA-256 ist deutlich sicherer.',
  },
  es: {
    title: 'Generador de Hash SHA-1',
    description: 'Genera hashes SHA-1 de cualquier texto. Todo el procesamiento se realiza en tu navegador.',
    inputLabel: 'Texto a hashear', inputPlaceholder: 'Introduce texto para generar el hash SHA-1...', generateBtn: 'Generar Hash SHA-1', resultLabel: 'Hash SHA-1 (40 caracteres hexadecimales)', clear: 'Limpiar', uppercase: 'Mayusculas',
    cheatTitle: 'Referencia rapida SHA-1', aboutTitle: 'Que es SHA-1?',
    aboutText: 'SHA-1 es una funcion hash criptografica disenada por la NSA y publicada por NIST en 1995. Produce un valor hash de 160 bits (40 caracteres hexadecimales). Los ataques de colision practicos fueron demostrados por Google en 2017. SHA-1 se considera obsoleto para seguridad pero sigue usandose en Git.',
    propertiesTitle: 'Propiedades clave',
    propOutputLen: 'Longitud de salida', propOutputLenVal: '160 bits (40 car. hex)', propBlockSize: 'Tamano de bloque', propBlockSizeVal: '512 bits (64 bytes)', propSecurity: 'Estado de seguridad', propSecurityVal: 'Obsoleto — colisiones practicas (2017)', propSpeed: 'Velocidad', propSpeedVal: 'Rapido (~500 MB/s)', propRounds: 'Rondas', propRoundsVal: '80 rondas',
    useCasesTitle: 'Casos de uso', useCase1: 'Identificadores de commit Git', useCase2: 'Validacion de certificados legacy', useCase3: 'HMAC-SHA1', useCase4: 'Integridad de archivos (legacy)', useCase5: 'Tokens TOTP/HOTP',
    comparisonTitle: 'SHA-1 vs otros algoritmos', codeTitle: 'Ejemplos de codigo', relatedTitle: 'Herramientas relacionadas', faqTitle: 'Preguntas frecuentes',
    faq1q: 'Por que Git todavia usa SHA-1?', faq1a: 'Git usa SHA-1 para almacenamiento direccionado por contenido, no seguridad. Git esta migrando gradualmente a SHA-256.',
    faq2q: 'Esta SHA-1 completamente roto?', faq2a: 'SHA-1 esta roto para resistencia a colisiones (2017) pero sigue seguro para preimagen y HMAC.',
    faq3q: 'Cual es la diferencia entre SHA-1 y SHA-256?', faq3a: 'SHA-1 produce 160 bits (40 car. hex), SHA-256 produce 256 bits (64 car. hex). SHA-256 es significativamente mas seguro.',
  },
  ja: {
    title: 'SHA-1ハッシュジェネレーター',
    description: 'テキストからSHA-1ハッシュを即座に生成。すべての処理はブラウザ内で完結します。',
    inputLabel: 'ハッシュするテキスト', inputPlaceholder: 'SHA-1ハッシュを生成するテキストを入力...', generateBtn: 'SHA-1ハッシュを生成', resultLabel: 'SHA-1ハッシュ（40文字の16進数）', clear: 'クリア', uppercase: '大文字',
    cheatTitle: 'SHA-1ハッシュクイックリファレンス', aboutTitle: 'SHA-1とは？',
    aboutText: 'SHA-1はNSAが設計し1995年にNISTが発行した暗号学的ハッシュ関数です。160ビット（40文字の16進数）のハッシュ値を生成します。2017年にGoogleが実際の衝突攻撃を実証しました。セキュリティ目的では非推奨ですが、Gitのコミット識別子として有名です。',
    propertiesTitle: '主要プロパティ',
    propOutputLen: '出力長', propOutputLenVal: '160ビット（16進数40文字）', propBlockSize: 'ブロックサイズ', propBlockSizeVal: '512ビット（64バイト）', propSecurity: 'セキュリティ状態', propSecurityVal: '非推奨 — 実用的衝突（2017年）', propSpeed: '速度', propSpeedVal: '高速（約500 MB/s）', propRounds: 'ラウンド', propRoundsVal: '80ラウンド',
    useCasesTitle: '一般的な用途', useCase1: 'Gitコミット識別子', useCase2: 'レガシー証明書検証', useCase3: 'HMAC-SHA1', useCase4: 'ファイル整合性（レガシー）', useCase5: 'TOTP/HOTPトークン',
    comparisonTitle: 'SHA-1と他のアルゴリズム', codeTitle: 'コード例', relatedTitle: '関連ツール', faqTitle: 'よくある質問',
    faq1q: 'なぜGitはまだSHA-1を使用していますか？', faq1a: 'Gitはコンテンツアドレス可能ストレージにSHA-1を使用しており、セキュリティ目的ではありません。GitはSHA-256に段階的に移行中です。',
    faq2q: 'SHA-1は完全に破られていますか？', faq2a: 'SHA-1は衝突耐性で破られています（2017年）が、原像耐性とHMACでは安全です。',
    faq3q: 'SHA-1とSHA-256の違いは？', faq3a: 'SHA-1は160ビット（16進数40文字）、SHA-256は256ビット（16進数64文字）を生成します。SHA-256は大幅に安全です。',
  },
  ko: {
    title: 'SHA-1 해시 생성기',
    description: '텍스트에서 SHA-1 해시를 즉시 생성하세요. 모든 처리는 브라우저에서 이루어집니다.',
    inputLabel: '해시할 텍스트', inputPlaceholder: 'SHA-1 해시를 생성할 텍스트를 입력하세요...', generateBtn: 'SHA-1 해시 생성', resultLabel: 'SHA-1 해시 (16진수 40자)', clear: '지우기', uppercase: '대문자',
    cheatTitle: 'SHA-1 해시 빠른 참조', aboutTitle: 'SHA-1이란?',
    aboutText: 'SHA-1은 NSA가 설계하고 1995년 NIST가 발표한 암호화 해시 함수입니다. 160비트(40자의 16진수) 해시 값을 생성합니다. 2017년 Google이 실제 충돌 공격을 시연했습니다. 보안 목적으로는 사용이 중단되었지만 Git 커밋 식별자로 유명합니다.',
    propertiesTitle: '주요 속성',
    propOutputLen: '출력 길이', propOutputLenVal: '160비트 (16진수 40자)', propBlockSize: '블록 크기', propBlockSizeVal: '512비트 (64바이트)', propSecurity: '보안 상태', propSecurityVal: '사용 중단 — 실제 충돌 (2017년)', propSpeed: '속도', propSpeedVal: '빠름 (~500 MB/s)', propRounds: '라운드', propRoundsVal: '80라운드',
    useCasesTitle: '사용 사례', useCase1: 'Git 커밋 식별자', useCase2: '레거시 인증서 검증', useCase3: 'HMAC-SHA1', useCase4: '파일 무결성 (레거시)', useCase5: 'TOTP/HOTP 토큰',
    comparisonTitle: 'SHA-1 vs 다른 알고리즘', codeTitle: '코드 예제', relatedTitle: '관련 도구', faqTitle: '자주 묻는 질문',
    faq1q: '왜 Git은 아직 SHA-1을 사용하나요?', faq1a: 'Git은 보안이 아닌 콘텐츠 주소 지정 저장소에 SHA-1을 사용합니다. Git은 SHA-256으로 점진적으로 전환 중입니다.',
    faq2q: 'SHA-1은 완전히 깨졌나요?', faq2a: 'SHA-1은 충돌 저항성에서 깨졌지만 (2017년), 역상 저항과 HMAC에서는 여전히 안전합니다.',
    faq3q: 'SHA-1과 SHA-256의 차이점은?', faq3a: 'SHA-1은 160비트(16진수 40자), SHA-256은 256비트(16진수 64자)를 생성합니다. SHA-256이 훨씬 더 안전합니다.',
  },
};

export default function SHA1HashGenerator() {
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
    <ToolLayout title={t.title} description={t.description} toolId="sha1-hash-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Tool UI */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 120 }} />
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
          <code style={{ fontSize: 14, wordBreak: 'break-all', color: 'var(--text-primary)', fontFamily: 'monospace', lineHeight: 1.6 }}>
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
          <li>{t.useCase1}</li><li>{t.useCase2}</li><li>{t.useCase3}</li><li>{t.useCase4}</li><li>{t.useCase5}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.comparisonTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Algorithm</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Output</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Security</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Speed</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['MD5', '128 bits', 'Broken', 'Very Fast'],
                ['SHA-1', '160 bits', 'Weak', 'Fast'],
                ['SHA-256', '256 bits', 'Strong', 'Moderate'],
                ['SHA-512', '512 bits', 'Strong', 'Moderate'],
              ].map(([algo, output, security, speed], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', background: i === 1 ? 'var(--bg-input)' : 'transparent' }}>
                  <td style={{ padding: '8px 12px', fontWeight: i === 1 ? 700 : 400 }}>{algo}</td>
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
const hash = crypto.createHash('sha1')
  .update('Hello, World!')
  .digest('hex');
console.log(hash); // 0a0a9f2a6772942557ab5355d76af442f8f65e01`}</code>
          </pre>
        </div>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)' }}>JavaScript (Browser)</span>
          <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', marginTop: 4 }}>
            <code>{`const data = new TextEncoder().encode('Hello, World!');
const hashBuffer = await crypto.subtle.digest('SHA-1', data);
const hex = [...new Uint8Array(hashBuffer)]
  .map(b => b.toString(16).padStart(2, '0')).join('');`}</code>
          </pre>
        </div>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)' }}>Python</span>
          <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', marginTop: 4 }}>
            <code>{`import hashlib
hash = hashlib.sha1('Hello, World!'.encode()).hexdigest()
print(hash)  # 0a0a9f2a6772942557ab5355d76af442f8f65e01`}</code>
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
            { href: `/${lang}/tools/sha256-hash-generator`, label: 'SHA-256 Hash Generator' },
            { href: `/${lang}/tools/sha512-hash-generator`, label: 'SHA-512 Hash Generator' },
          ].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
