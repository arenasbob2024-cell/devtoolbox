'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

async function hashText(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'SHA-256 Hash Generator',
    description: 'Generate SHA-256 hashes from any text. All processing happens in your browser — no data leaves your device.',
    inputLabel: 'Text to Hash',
    inputPlaceholder: 'Enter text to generate SHA-256 hash...',
    generateBtn: 'Generate SHA-256 Hash',
    resultLabel: 'SHA-256 Hash (64 hex characters)',
    clear: 'Clear',
    uppercase: 'Uppercase',
    cheatTitle: 'SHA-256 Hash Quick Reference',
    aboutTitle: 'What is SHA-256?',
    aboutText: 'SHA-256 (Secure Hash Algorithm 256-bit) is a member of the SHA-2 family designed by the NSA and published by NIST in 2001. It produces a 256-bit (32-byte) hash value, rendered as a 64-character hexadecimal string. SHA-256 is widely considered one of the most secure hash functions available today and is the backbone of Bitcoin mining, TLS/SSL certificates, code signing, and many other security-critical applications. Unlike MD5 and SHA-1, no practical collision attacks have been demonstrated against SHA-256.',
    propertiesTitle: 'Key Properties',
    propOutputLen: 'Output Length', propOutputLenVal: '256 bits (64 hex chars)',
    propBlockSize: 'Block Size', propBlockSizeVal: '512 bits (64 bytes)',
    propSecurity: 'Security Status', propSecurityVal: 'Strong — no known practical attacks',
    propSpeed: 'Speed', propSpeedVal: 'Moderate (~400 MB/s on modern CPUs)',
    propRounds: 'Rounds', propRoundsVal: '64 rounds',
    useCasesTitle: 'Common Use Cases',
    useCase1: 'Bitcoin mining and blockchain verification',
    useCase2: 'TLS/SSL certificate signing',
    useCase3: 'Code signing and software integrity',
    useCase4: 'Digital signatures (ECDSA, RSA)',
    useCase5: 'Password hashing (as part of PBKDF2)',
    comparisonTitle: 'SHA-256 vs Other Hash Algorithms',
    codeTitle: 'Code Examples',
    relatedTitle: 'Related Hash Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Is SHA-256 used in Bitcoin?',
    faq1a: 'Yes, SHA-256 is the core hash function used in Bitcoin mining (double SHA-256) and in generating Bitcoin addresses. Miners compete to find a nonce that, when combined with the block data and hashed with SHA-256 twice, produces a hash below a target difficulty.',
    faq2q: 'How long is a SHA-256 hash?',
    faq2a: 'A SHA-256 hash is always 256 bits (32 bytes), represented as 64 hexadecimal characters. Regardless of whether you hash a single character or an entire file, the output is always exactly 64 hex characters.',
    faq3q: 'Is SHA-256 quantum-resistant?',
    faq3a: 'SHA-256 offers some resistance to quantum attacks. While Grover\'s algorithm could theoretically reduce its security to 128-bit equivalent against preimage attacks, this still provides strong security. For collision resistance, quantum computers would reduce it from 128-bit to approximately 85-bit security, which remains computationally infeasible for the foreseeable future.',
  },
  zh: {
    title: 'SHA-256哈希生成器',
    description: '从任何文本生成SHA-256哈希值。所有处理在浏览器本地完成，数据不会离开您的设备。',
    inputLabel: '输入文本',
    inputPlaceholder: '输入文本以生成SHA-256哈希...',
    generateBtn: '生成SHA-256哈希',
    resultLabel: 'SHA-256哈希值（64个十六进制字符）',
    clear: '清除',
    uppercase: '大写',
    cheatTitle: 'SHA-256哈希速查表',
    aboutTitle: '什么是SHA-256？',
    aboutText: 'SHA-256（安全哈希算法256位）是SHA-2家族的成员，由NSA设计并于2001年由NIST发布。它产生256位（32字节）的哈希值，呈现为64个十六进制字符。SHA-256被广泛认为是当今最安全的哈希函数之一，是比特币挖矿、TLS/SSL证书、代码签名等安全关键应用的基础。与MD5和SHA-1不同，SHA-256目前没有已知的实际碰撞攻击。',
    propertiesTitle: '关键属性',
    propOutputLen: '输出长度', propOutputLenVal: '256位（64个十六进制字符）',
    propBlockSize: '块大小', propBlockSizeVal: '512位（64字节）',
    propSecurity: '安全状态', propSecurityVal: '强 — 无已知实际攻击',
    propSpeed: '速度', propSpeedVal: '中等（现代CPU约400 MB/s）',
    propRounds: '轮次', propRoundsVal: '64轮',
    useCasesTitle: '常见用例',
    useCase1: '比特币挖矿和区块链验证', useCase2: 'TLS/SSL证书签名', useCase3: '代码签名和软件完整性', useCase4: '数字签名（ECDSA、RSA）', useCase5: '密码哈希（作为PBKDF2的一部分）',
    comparisonTitle: 'SHA-256与其他哈希算法比较', codeTitle: '代码示例', relatedTitle: '相关哈希工具', faqTitle: '常见问题',
    faq1q: 'SHA-256用于比特币吗？', faq1a: '是的，SHA-256是比特币挖矿（双SHA-256）和生成比特币地址中使用的核心哈希函数。',
    faq2q: 'SHA-256哈希值有多长？', faq2a: 'SHA-256哈希值始终为256位（32字节），表示为64个十六进制字符。',
    faq3q: 'SHA-256能抵抗量子计算吗？', faq3a: 'SHA-256对量子攻击有一定抵抗力。虽然Grover算法理论上可以将其安全性降低到128位等效，但这仍然提供强大的安全性。',
  },
  fr: {
    title: 'Generateur de Hash SHA-256',
    description: 'Generez des hashes SHA-256 a partir de texte. Tout le traitement se fait dans votre navigateur.',
    inputLabel: 'Texte a hacher', inputPlaceholder: 'Entrez le texte pour generer le hash SHA-256...', generateBtn: 'Generer le Hash SHA-256', resultLabel: 'Hash SHA-256 (64 caracteres hexadecimaux)', clear: 'Effacer', uppercase: 'Majuscules',
    cheatTitle: 'Reference rapide SHA-256', aboutTitle: "Qu'est-ce que SHA-256 ?",
    aboutText: "SHA-256 est un membre de la famille SHA-2 concu par la NSA et publie par le NIST en 2001. Il produit une valeur de hachage de 256 bits (64 caracteres hexadecimaux). SHA-256 est largement considere comme l'une des fonctions de hachage les plus sures disponibles aujourd'hui.",
    propertiesTitle: 'Proprietes cles',
    propOutputLen: 'Longueur de sortie', propOutputLenVal: '256 bits (64 car. hex)', propBlockSize: 'Taille de bloc', propBlockSizeVal: '512 bits (64 octets)', propSecurity: 'Statut securite', propSecurityVal: 'Fort — aucune attaque pratique connue', propSpeed: 'Vitesse', propSpeedVal: 'Moderee (~400 Mo/s)', propRounds: 'Tours', propRoundsVal: '64 tours',
    useCasesTitle: "Cas d'utilisation", useCase1: 'Minage Bitcoin et blockchain', useCase2: 'Certificats TLS/SSL', useCase3: 'Signature de code', useCase4: 'Signatures numeriques', useCase5: 'Hachage de mots de passe (PBKDF2)',
    comparisonTitle: 'SHA-256 vs autres algorithmes', codeTitle: 'Exemples de code', relatedTitle: 'Outils connexes', faqTitle: 'Questions frequentes',
    faq1q: 'SHA-256 est-il utilise dans Bitcoin ?', faq1a: 'Oui, SHA-256 est la fonction de hachage principale utilisee dans le minage Bitcoin.',
    faq2q: "Quelle est la longueur d'un hash SHA-256 ?", faq2a: 'Un hash SHA-256 fait toujours 256 bits, represente par 64 caracteres hexadecimaux.',
    faq3q: 'SHA-256 est-il resistant aux ordinateurs quantiques ?', faq3a: "SHA-256 offre une certaine resistance aux attaques quantiques, conservant une securite equivalente a 128 bits.",
  },
  de: {
    title: 'SHA-256 Hash Generator',
    description: 'SHA-256 Hashes aus Text generieren. Alle Berechnungen erfolgen lokal in Ihrem Browser.',
    inputLabel: 'Text zum Hashen', inputPlaceholder: 'Text eingeben um SHA-256 Hash zu generieren...', generateBtn: 'SHA-256 Hash generieren', resultLabel: 'SHA-256 Hash (64 Hex-Zeichen)', clear: 'Loeschen', uppercase: 'Grossbuchstaben',
    cheatTitle: 'SHA-256 Hash Kurzreferenz', aboutTitle: 'Was ist SHA-256?',
    aboutText: 'SHA-256 ist ein Mitglied der SHA-2 Familie, entwickelt von der NSA und 2001 von NIST veroeffentlicht. Es erzeugt einen 256-Bit Hash-Wert (64 Hex-Zeichen). SHA-256 gilt als eine der sichersten Hash-Funktionen und ist die Grundlage von Bitcoin-Mining und TLS/SSL-Zertifikaten.',
    propertiesTitle: 'Kerneigenschaften',
    propOutputLen: 'Ausgabelaenge', propOutputLenVal: '256 Bit (64 Hex-Zeichen)', propBlockSize: 'Blockgroesse', propBlockSizeVal: '512 Bit (64 Bytes)', propSecurity: 'Sicherheitsstatus', propSecurityVal: 'Stark — keine bekannten Angriffe', propSpeed: 'Geschwindigkeit', propSpeedVal: 'Mittel (~400 MB/s)', propRounds: 'Runden', propRoundsVal: '64 Runden',
    useCasesTitle: 'Anwendungsfaelle', useCase1: 'Bitcoin-Mining und Blockchain', useCase2: 'TLS/SSL-Zertifikate', useCase3: 'Code-Signierung', useCase4: 'Digitale Signaturen', useCase5: 'Passwort-Hashing (PBKDF2)',
    comparisonTitle: 'SHA-256 vs andere Algorithmen', codeTitle: 'Codebeispiele', relatedTitle: 'Verwandte Tools', faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wird SHA-256 in Bitcoin verwendet?', faq1a: 'Ja, SHA-256 ist die zentrale Hash-Funktion im Bitcoin-Mining.',
    faq2q: 'Wie lang ist ein SHA-256 Hash?', faq2a: 'Ein SHA-256 Hash ist immer 256 Bit lang, dargestellt als 64 Hexadezimalzeichen.',
    faq3q: 'Ist SHA-256 quantenresistent?', faq3a: 'SHA-256 bietet eine gewisse Resistenz gegen Quantenangriffe mit einer effektiven Sicherheit von 128 Bit.',
  },
  es: {
    title: 'Generador de Hash SHA-256',
    description: 'Genera hashes SHA-256 de cualquier texto. Todo el procesamiento se realiza en tu navegador.',
    inputLabel: 'Texto a hashear', inputPlaceholder: 'Introduce texto para generar el hash SHA-256...', generateBtn: 'Generar Hash SHA-256', resultLabel: 'Hash SHA-256 (64 caracteres hexadecimales)', clear: 'Limpiar', uppercase: 'Mayusculas',
    cheatTitle: 'Referencia rapida SHA-256', aboutTitle: 'Que es SHA-256?',
    aboutText: 'SHA-256 es un miembro de la familia SHA-2, disenado por la NSA y publicado por NIST en 2001. Produce un valor hash de 256 bits (64 caracteres hexadecimales). Es la base de la mineria de Bitcoin, certificados TLS/SSL y firma de codigo.',
    propertiesTitle: 'Propiedades clave',
    propOutputLen: 'Longitud de salida', propOutputLenVal: '256 bits (64 car. hex)', propBlockSize: 'Tamano de bloque', propBlockSizeVal: '512 bits (64 bytes)', propSecurity: 'Estado de seguridad', propSecurityVal: 'Fuerte — sin ataques conocidos', propSpeed: 'Velocidad', propSpeedVal: 'Moderada (~400 MB/s)', propRounds: 'Rondas', propRoundsVal: '64 rondas',
    useCasesTitle: 'Casos de uso', useCase1: 'Mineria de Bitcoin y blockchain', useCase2: 'Certificados TLS/SSL', useCase3: 'Firma de codigo', useCase4: 'Firmas digitales', useCase5: 'Hashing de contrasenas (PBKDF2)',
    comparisonTitle: 'SHA-256 vs otros algoritmos', codeTitle: 'Ejemplos de codigo', relatedTitle: 'Herramientas relacionadas', faqTitle: 'Preguntas frecuentes',
    faq1q: 'Se usa SHA-256 en Bitcoin?', faq1a: 'Si, SHA-256 es la funcion hash principal en la mineria de Bitcoin.',
    faq2q: 'Cual es la longitud de un hash SHA-256?', faq2a: 'Un hash SHA-256 siempre tiene 256 bits, representado como 64 caracteres hexadecimales.',
    faq3q: 'Es SHA-256 resistente a la computacion cuantica?', faq3a: 'SHA-256 ofrece cierta resistencia a ataques cuanticos con una seguridad efectiva de 128 bits.',
  },
  ja: {
    title: 'SHA-256ハッシュジェネレーター',
    description: 'テキストからSHA-256ハッシュを即座に生成。すべての処理はブラウザ内で完結します。',
    inputLabel: 'ハッシュするテキスト', inputPlaceholder: 'SHA-256ハッシュを生成するテキストを入力...', generateBtn: 'SHA-256ハッシュを生成', resultLabel: 'SHA-256ハッシュ（64文字の16進数）', clear: 'クリア', uppercase: '大文字',
    cheatTitle: 'SHA-256ハッシュクイックリファレンス', aboutTitle: 'SHA-256とは？',
    aboutText: 'SHA-256はNSAが設計し2001年にNISTが発行したSHA-2ファミリーのメンバーです。256ビット（64文字の16進数）のハッシュ値を生成します。ビットコインマイニング、TLS/SSL証書、コード署名の基盤です。',
    propertiesTitle: '主要プロパティ',
    propOutputLen: '出力長', propOutputLenVal: '256ビット（16進数64文字）', propBlockSize: 'ブロックサイズ', propBlockSizeVal: '512ビット（64バイト）', propSecurity: 'セキュリティ状態', propSecurityVal: '強力 — 既知の実用的な攻撃なし', propSpeed: '速度', propSpeedVal: '中程度（約400 MB/s）', propRounds: 'ラウンド', propRoundsVal: '64ラウンド',
    useCasesTitle: '一般的な用途', useCase1: 'ビットコインマイニング', useCase2: 'TLS/SSL証書', useCase3: 'コード署名', useCase4: 'デジタル署名', useCase5: 'パスワードハッシュ（PBKDF2）',
    comparisonTitle: 'SHA-256と他のアルゴリズム', codeTitle: 'コード例', relatedTitle: '関連ツール', faqTitle: 'よくある質問',
    faq1q: 'SHA-256はビットコインで使われていますか？', faq1a: 'はい、SHA-256はビットコインマイニングのコアハッシュ関数です。',
    faq2q: 'SHA-256ハッシュの長さは？', faq2a: 'SHA-256ハッシュは常に256ビット（16進数64文字）です。',
    faq3q: 'SHA-256は量子耐性がありますか？', faq3a: 'SHA-256は量子攻撃に対して一定の耐性があり、128ビット相当の効果的なセキュリティを提供します。',
  },
  ko: {
    title: 'SHA-256 해시 생성기',
    description: '텍스트에서 SHA-256 해시를 즉시 생성하세요. 모든 처리는 브라우저에서 이루어집니다.',
    inputLabel: '해시할 텍스트', inputPlaceholder: 'SHA-256 해시를 생성할 텍스트를 입력하세요...', generateBtn: 'SHA-256 해시 생성', resultLabel: 'SHA-256 해시 (16진수 64자)', clear: '지우기', uppercase: '대문자',
    cheatTitle: 'SHA-256 해시 빠른 참조', aboutTitle: 'SHA-256이란?',
    aboutText: 'SHA-256은 NSA가 설계하고 2001년 NIST가 발표한 SHA-2 패밀리의 멤버입니다. 256비트(64자의 16진수) 해시 값을 생성합니다. 비트코인 채굴, TLS/SSL 인증서, 코드 서명의 기반입니다.',
    propertiesTitle: '주요 속성',
    propOutputLen: '출력 길이', propOutputLenVal: '256비트 (16진수 64자)', propBlockSize: '블록 크기', propBlockSizeVal: '512비트 (64바이트)', propSecurity: '보안 상태', propSecurityVal: '강함 — 알려진 실용적 공격 없음', propSpeed: '속도', propSpeedVal: '보통 (~400 MB/s)', propRounds: '라운드', propRoundsVal: '64라운드',
    useCasesTitle: '사용 사례', useCase1: '비트코인 채굴 및 블록체인', useCase2: 'TLS/SSL 인증서', useCase3: '코드 서명', useCase4: '디지털 서명', useCase5: '비밀번호 해싱 (PBKDF2)',
    comparisonTitle: 'SHA-256 vs 다른 알고리즘', codeTitle: '코드 예제', relatedTitle: '관련 도구', faqTitle: '자주 묻는 질문',
    faq1q: 'SHA-256은 비트코인에서 사용되나요?', faq1a: '네, SHA-256은 비트코인 채굴의 핵심 해시 함수입니다.',
    faq2q: 'SHA-256 해시의 길이는 얼마인가요?', faq2a: 'SHA-256 해시는 항상 256비트(16진수 64자)입니다.',
    faq3q: 'SHA-256은 양자 내성이 있나요?', faq3a: 'SHA-256은 양자 공격에 대해 128비트 상당의 효과적인 보안을 제공합니다.',
  },
};

export default function SHA256HashGenerator() {
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
    <ToolLayout title={t.title} description={t.description} toolId="sha256-hash-generator">
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
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', background: i === 2 ? 'var(--bg-input)' : 'transparent' }}>
                  <td style={{ padding: '8px 12px', fontWeight: i === 2 ? 700 : 400 }}>{algo}</td>
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
const hash = crypto.createHash('sha256')
  .update('Hello, World!')
  .digest('hex');
console.log(hash);
// dffd6021bb2bd5b0af676290809ec3a5...(64 chars)`}</code>
          </pre>
        </div>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)' }}>JavaScript (Browser)</span>
          <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', marginTop: 4 }}>
            <code>{`const data = new TextEncoder().encode('Hello, World!');
const hashBuffer = await crypto.subtle.digest('SHA-256', data);
const hex = [...new Uint8Array(hashBuffer)]
  .map(b => b.toString(16).padStart(2, '0')).join('');`}</code>
          </pre>
        </div>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)' }}>Python</span>
          <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', marginTop: 4 }}>
            <code>{`import hashlib
hash = hashlib.sha256('Hello, World!'.encode()).hexdigest()
print(hash)`}</code>
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
