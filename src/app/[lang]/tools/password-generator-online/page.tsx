'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Password Generator Online',
    description: 'Generate strong, random passwords with customizable length, uppercase, lowercase, numbers, and symbols. Check password strength instantly.',
    length: 'Password Length',
    uppercase: 'Uppercase (A-Z)',
    lowercase: 'Lowercase (a-z)',
    numbers: 'Numbers (0-9)',
    symbols: 'Symbols (!@#$...)',
    generate: 'Generate Password',
    regenerate: 'Regenerate',
    yourPassword: 'Your Password',
    strength: 'Strength',
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
    veryStrong: 'Very Strong',
    entropy: 'bits of entropy',
    generateMultiple: 'Generate Multiple',
    count: 'Count',
    bulkPasswords: 'Bulk Passwords',
    noOptions: 'Please select at least one character type.',
    introTitle: 'Free Online Password Generator',
    introText: 'Create secure, random passwords in seconds. Our password generator uses cryptographically secure random number generation (crypto.getRandomValues) directly in your browser. No passwords are ever sent to a server. Customize length from 4 to 128 characters, and choose which character types to include. The strength meter shows estimated entropy to help you gauge password security.',
    tipTitle: 'Password Security Tips',
    tip1: 'Use at least 12 characters for important accounts',
    tip2: 'Include a mix of uppercase, lowercase, numbers, and symbols',
    tip3: 'Never reuse passwords across different sites',
    tip4: 'Use a password manager to store complex passwords',
    tip5: 'Enable two-factor authentication when available',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does this password generator work?',
    faq1a: 'This tool uses the Web Crypto API (crypto.getRandomValues) to generate cryptographically secure random passwords directly in your browser. No data is sent to any server, making it completely safe to use.',
    faq2q: 'What makes a strong password?',
    faq2a: 'A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special symbols. The more character types and length, the higher the entropy and the harder it is to crack.',
    faq3q: 'Is it safe to use an online password generator?',
    faq3a: 'Yes, as long as the generator runs entirely in your browser (client-side) without sending data to a server. Our tool generates passwords locally using cryptographically secure randomness, so your passwords never leave your device.',
    faq4q: 'How long should my password be?',
    faq4a: 'For general accounts, 12-16 characters is recommended. For high-security accounts (banking, email), use 16-20+ characters. Each additional character exponentially increases the number of possible combinations.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '在线密码生成器',
    description: '生成强随机密码，可自定义长度、大小写字母、数字和特殊符号。即时检测密码强度。',
    length: '密码长度',
    uppercase: '大写字母 (A-Z)',
    lowercase: '小写字母 (a-z)',
    numbers: '数字 (0-9)',
    symbols: '特殊符号 (!@#$...)',
    generate: '生成密码',
    regenerate: '重新生成',
    yourPassword: '您的密码',
    strength: '强度',
    weak: '弱',
    fair: '一般',
    good: '好',
    strong: '强',
    veryStrong: '非常强',
    entropy: '位熵值',
    generateMultiple: '批量生成',
    count: '数量',
    bulkPasswords: '批量密码',
    noOptions: '请至少选择一种字符类型。',
    introTitle: '免费在线密码生成器',
    introText: '几秒钟内创建安全的随机密码。本工具使用浏览器内置的加密安全随机数生成器(crypto.getRandomValues)，密码不会发送到任何服务器。支持4到128个字符，可选择包含的字符类型。强度指示器显示预估熵值以帮助评估密码安全性。',
    tipTitle: '密码安全提示',
    tip1: '重要账户使用至少12个字符',
    tip2: '混合使用大写、小写、数字和符号',
    tip3: '不要在不同网站重复使用密码',
    tip4: '使用密码管理器存储复杂密码',
    tip5: '尽可能启用双因素认证',
    faqTitle: '常见问题',
    faq1q: '这个密码生成器如何工作？',
    faq1a: '本工具使用Web Crypto API在浏览器中本地生成加密安全的随机密码，不向任何服务器发送数据。',
    faq2q: '什么是强密码？',
    faq2a: '强密码应至少12个字符，包含大写字母、小写字母、数字和特殊符号的组合。字符类型越多、长度越长，熵值越高，越难破解。',
    faq3q: '使用在线密码生成器安全吗？',
    faq3a: '是的，只要生成器完全在浏览器中运行（客户端），不向服务器发送数据。本工具使用加密安全随机数本地生成密码，密码不会离开您的设备。',
    faq4q: '密码应该多长？',
    faq4a: '普通账户建议12-16个字符。高安全级别账户（银行、邮箱）建议16-20个以上字符。每增加一个字符都会指数级增加可能的组合数。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Generateur de Mot de Passe en Ligne',
    description: 'Generez des mots de passe forts et aleatoires. Personnalisez la longueur, les majuscules, les chiffres et les symboles.',
    length: 'Longueur', uppercase: 'Majuscules (A-Z)', lowercase: 'Minuscules (a-z)', numbers: 'Chiffres (0-9)', symbols: 'Symboles (!@#$...)',
    generate: 'Generer', regenerate: 'Regenerer', yourPassword: 'Votre mot de passe', strength: 'Force',
    weak: 'Faible', fair: 'Moyen', good: 'Bon', strong: 'Fort', veryStrong: 'Tres fort', entropy: 'bits d\'entropie',
    generateMultiple: 'Generer plusieurs', count: 'Nombre', bulkPasswords: 'Mots de passe en lot',
    noOptions: 'Veuillez selectionner au moins un type de caractere.',
    introTitle: 'Generateur de mots de passe gratuit', introText: 'Creez des mots de passe securises en quelques secondes. Utilise crypto.getRandomValues directement dans votre navigateur.',
    tipTitle: 'Conseils de securite', tip1: 'Utilisez au moins 12 caracteres', tip2: 'Melangez majuscules, minuscules, chiffres et symboles',
    tip3: 'Ne reutilisez jamais les mots de passe', tip4: 'Utilisez un gestionnaire de mots de passe', tip5: 'Activez l\'authentification a deux facteurs',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment fonctionne ce generateur ?', faq1a: 'Il utilise l\'API Web Crypto pour generer des mots de passe aleatoires dans votre navigateur. Aucune donnee n\'est envoyee a un serveur.',
    faq2q: 'Qu\'est-ce qu\'un mot de passe fort ?', faq2a: 'Un mot de passe fort fait au moins 12 caracteres et melange majuscules, minuscules, chiffres et symboles.',
    faq3q: 'Est-ce securise ?', faq3a: 'Oui, tout est genere localement dans votre navigateur avec un generateur cryptographiquement securise.',
    faq4q: 'Quelle longueur recommandee ?', faq4a: '12-16 caracteres pour les comptes generaux, 16-20+ pour les comptes haute securite.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Passwort Generator Online',
    description: 'Starke, zufaellige Passwoerter generieren. Laenge, Gross-/Kleinbuchstaben, Zahlen und Symbole anpassen.',
    length: 'Laenge', uppercase: 'Grossbuchstaben (A-Z)', lowercase: 'Kleinbuchstaben (a-z)', numbers: 'Zahlen (0-9)', symbols: 'Symbole (!@#$...)',
    generate: 'Generieren', regenerate: 'Neu generieren', yourPassword: 'Ihr Passwort', strength: 'Staerke',
    weak: 'Schwach', fair: 'Mittel', good: 'Gut', strong: 'Stark', veryStrong: 'Sehr stark', entropy: 'Bits Entropie',
    generateMultiple: 'Mehrere generieren', count: 'Anzahl', bulkPasswords: 'Passwort-Stapel',
    noOptions: 'Bitte waehlen Sie mindestens einen Zeichentyp.',
    introTitle: 'Kostenloser Passwort Generator', introText: 'Erstellen Sie sichere Passwoerter in Sekunden. Verwendet crypto.getRandomValues direkt in Ihrem Browser.',
    tipTitle: 'Sicherheitstipps', tip1: 'Mindestens 12 Zeichen verwenden', tip2: 'Gross-/Kleinbuchstaben, Zahlen und Symbole mischen',
    tip3: 'Passwoerter nie wiederverwenden', tip4: 'Passwort-Manager verwenden', tip5: 'Zwei-Faktor-Authentifizierung aktivieren',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie funktioniert dieser Generator?', faq1a: 'Er verwendet die Web Crypto API um kryptografisch sichere Passwoerter in Ihrem Browser zu generieren.',
    faq2q: 'Was macht ein starkes Passwort aus?', faq2a: 'Mindestens 12 Zeichen mit einer Mischung aus Gross-/Kleinbuchstaben, Zahlen und Symbolen.',
    faq3q: 'Ist es sicher?', faq3a: 'Ja, alles wird lokal in Ihrem Browser generiert. Keine Daten werden an Server gesendet.',
    faq4q: 'Welche Laenge wird empfohlen?', faq4a: '12-16 Zeichen fuer allgemeine Konten, 16-20+ fuer Hochsicherheitskonten.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador de Contrasenas en Linea',
    description: 'Genera contrasenas fuertes y aleatorias. Personaliza longitud, mayusculas, numeros y simbolos.',
    length: 'Longitud', uppercase: 'Mayusculas (A-Z)', lowercase: 'Minusculas (a-z)', numbers: 'Numeros (0-9)', symbols: 'Simbolos (!@#$...)',
    generate: 'Generar', regenerate: 'Regenerar', yourPassword: 'Tu contrasena', strength: 'Fuerza',
    weak: 'Debil', fair: 'Regular', good: 'Buena', strong: 'Fuerte', veryStrong: 'Muy fuerte', entropy: 'bits de entropia',
    generateMultiple: 'Generar multiples', count: 'Cantidad', bulkPasswords: 'Contrasenas en lote',
    noOptions: 'Seleccione al menos un tipo de caracter.',
    introTitle: 'Generador de contrasenas gratuito', introText: 'Cree contrasenas seguras en segundos. Usa crypto.getRandomValues directamente en su navegador.',
    tipTitle: 'Consejos de seguridad', tip1: 'Use al menos 12 caracteres', tip2: 'Mezcle mayusculas, minusculas, numeros y simbolos',
    tip3: 'Nunca reutilice contrasenas', tip4: 'Use un gestor de contrasenas', tip5: 'Active la autenticacion de dos factores',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como funciona este generador?', faq1a: 'Usa la API Web Crypto para generar contrasenas aleatorias en su navegador. No se envian datos a ningun servidor.',
    faq2q: 'Que hace una contrasena fuerte?', faq2a: 'Al menos 12 caracteres con mezcla de mayusculas, minusculas, numeros y simbolos.',
    faq3q: 'Es seguro?', faq3a: 'Si, todo se genera localmente en su navegador con generacion criptograficamente segura.',
    faq4q: 'Que longitud se recomienda?', faq4a: '12-16 caracteres para cuentas generales, 16-20+ para alta seguridad.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'オンラインパスワード生成器',
    description: '強力なランダムパスワードを生成。長さ、大文字、小文字、数字、記号をカスタマイズ。',
    length: 'パスワードの長さ', uppercase: '大文字 (A-Z)', lowercase: '小文字 (a-z)', numbers: '数字 (0-9)', symbols: '記号 (!@#$...)',
    generate: '生成', regenerate: '再生成', yourPassword: 'パスワード', strength: '強度',
    weak: '弱い', fair: '普通', good: '良い', strong: '強い', veryStrong: '非常に強い', entropy: 'ビットのエントロピー',
    generateMultiple: '複数生成', count: '個数', bulkPasswords: '一括パスワード',
    noOptions: '少なくとも1つの文字タイプを選択してください。',
    introTitle: '無料オンラインパスワード生成器', introText: '数秒で安全なパスワードを作成。ブラウザ内のcrypto.getRandomValuesを使用し、サーバーにデータを送信しません。',
    tipTitle: 'セキュリティのヒント', tip1: '重要なアカウントは12文字以上', tip2: '大文字、小文字、数字、記号を混ぜる',
    tip3: 'パスワードを使い回さない', tip4: 'パスワードマネージャーを使用', tip5: '二要素認証を有効にする',
    faqTitle: 'よくある質問',
    faq1q: 'このパスワード生成器はどう動きますか？', faq1a: 'Web Crypto APIを使用してブラウザ内で暗号学的に安全なパスワードを生成します。',
    faq2q: '強いパスワードとは？', faq2a: '12文字以上で大文字、小文字、数字、記号を含むパスワードです。',
    faq3q: 'オンラインで安全ですか？', faq3a: 'はい、すべてブラウザ内でローカルに生成されます。',
    faq4q: '推奨の長さは？', faq4a: '一般アカウントは12-16文字、高セキュリティは16-20文字以上。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '온라인 비밀번호 생성기',
    description: '강력한 랜덤 비밀번호를 생성합니다. 길이, 대소문자, 숫자, 기호를 사용자 정의하세요.',
    length: '비밀번호 길이', uppercase: '대문자 (A-Z)', lowercase: '소문자 (a-z)', numbers: '숫자 (0-9)', symbols: '기호 (!@#$...)',
    generate: '생성', regenerate: '재생성', yourPassword: '비밀번호', strength: '강도',
    weak: '약함', fair: '보통', good: '좋음', strong: '강함', veryStrong: '매우 강함', entropy: '비트 엔트로피',
    generateMultiple: '다수 생성', count: '개수', bulkPasswords: '대량 비밀번호',
    noOptions: '최소 하나의 문자 유형을 선택하세요.',
    introTitle: '무료 온라인 비밀번호 생성기', introText: '몇 초 만에 안전한 비밀번호를 생성합니다. 브라우저 내 crypto.getRandomValues를 사용하여 서버로 데이터를 전송하지 않습니다.',
    tipTitle: '보안 팁', tip1: '중요한 계정은 12자 이상 사용', tip2: '대소문자, 숫자, 기호를 혼합',
    tip3: '비밀번호를 재사용하지 마세요', tip4: '비밀번호 관리자 사용', tip5: '이중 인증 활성화',
    faqTitle: '자주 묻는 질문',
    faq1q: '이 비밀번호 생성기는 어떻게 작동하나요?', faq1a: 'Web Crypto API를 사용하여 브라우저에서 암호학적으로 안전한 비밀번호를 생성합니다.',
    faq2q: '강한 비밀번호란?', faq2a: '12자 이상이며 대소문자, 숫자, 기호를 포함하는 비밀번호입니다.',
    faq3q: '온라인에서 안전한가요?', faq3a: '네, 모든 것이 브라우저에서 로컬로 생성됩니다.',
    faq4q: '권장 길이는?', faq4a: '일반 계정은 12-16자, 고보안 계정은 16-20자 이상.',
    relatedTitle: '관련 도구',
  },
};

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function getStrength(length: number, poolSize: number): { level: number; label: string; color: string; entropy: number } {
  const entropy = Math.round(length * Math.log2(poolSize));
  if (entropy < 28) return { level: 1, label: 'weak', color: '#ef4444', entropy };
  if (entropy < 36) return { level: 2, label: 'fair', color: '#f59e0b', entropy };
  if (entropy < 60) return { level: 3, label: 'good', color: '#3b82f6', entropy };
  if (entropy < 80) return { level: 4, label: 'strong', color: '#22c55e', entropy };
  return { level: 5, label: 'veryStrong', color: '#10b981', entropy };
}

export default function PasswordGeneratorOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [bulkCount, setBulkCount] = useState(5);
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);
  const [error, setError] = useState('');

  const generatePassword = useCallback((len: number): string => {
    let pool = '';
    if (useUpper) pool += UPPER;
    if (useLower) pool += LOWER;
    if (useNumbers) pool += DIGITS;
    if (useSymbols) pool += SYMBOLS;
    if (!pool) return '';
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    return Array.from(arr, (v) => pool[v % pool.length]).join('');
  }, [useUpper, useLower, useNumbers, useSymbols]);

  const handleGenerate = () => {
    if (!useUpper && !useLower && !useNumbers && !useSymbols) {
      setError(t.noOptions);
      return;
    }
    setError('');
    setPassword(generatePassword(length));
    setBulkPasswords([]);
  };

  const handleBulk = () => {
    if (!useUpper && !useLower && !useNumbers && !useSymbols) {
      setError(t.noOptions);
      return;
    }
    setError('');
    setBulkPasswords(Array.from({ length: bulkCount }, () => generatePassword(length)));
  };

  const pool = (useUpper ? 26 : 0) + (useLower ? 26 : 0) + (useNumbers ? 10 : 0) + (useSymbols ? SYMBOLS.length : 0);
  const strength = pool > 0 && password ? getStrength(length, pool) : null;

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
    <ToolLayout title={t.title} description={t.description} toolId="password-generator-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 600, minWidth: 120 }}>{t.length}: {length}</label>
          <input type="range" min={4} max={128} value={length} onChange={e => setLength(Number(e.target.value))}
            style={{ flex: 1 }} />
          <input type="number" min={4} max={128} value={length} onChange={e => setLength(Math.min(128, Math.max(4, Number(e.target.value))))}
            style={{ width: 60, padding: '4px 8px', fontSize: 13, textAlign: 'center' }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {[
            { label: t.uppercase, checked: useUpper, set: setUseUpper },
            { label: t.lowercase, checked: useLower, set: setUseLower },
            { label: t.numbers, checked: useNumbers, set: setUseNumbers },
            { label: t.symbols, checked: useSymbols, set: setUseSymbols },
          ].map(({ label, checked, set }) => (
            <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={checked} onChange={e => set(e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
      </div>

      {error && <div style={{ color: 'var(--accent-rose)', fontSize: 13, marginBottom: 12 }}>{error}</div>}

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleGenerate} className="btn btn-primary">{password ? t.regenerate : t.generate}</button>
      </div>

      {/* Password output */}
      {password && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.yourPassword}</label>
            <CopyButton text={password} />
          </div>
          <div style={{
            padding: '14px 16px', borderRadius: 8, background: 'var(--bg-input)', border: '1px solid var(--border-color)',
            fontFamily: 'monospace', fontSize: 16, wordBreak: 'break-all', letterSpacing: 1,
          }}>
            {password}
          </div>

          {/* Strength meter */}
          {strength && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{t.strength}: {t[strength.label as keyof typeof t]}</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{strength.entropy} {t.entropy}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--border-color)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 3, background: strength.color,
                  width: `${(strength.level / 5) * 100}%`, transition: 'width 0.3s ease',
                }} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bulk generation */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.generateMultiple}:</label>
          <input type="number" min={2} max={50} value={bulkCount} onChange={e => setBulkCount(Math.min(50, Math.max(2, Number(e.target.value))))}
            style={{ width: 60, padding: '4px 8px', fontSize: 13 }} />
          <button onClick={handleBulk} className="btn btn-secondary">{t.generateMultiple}</button>
        </div>
        {bulkPasswords.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{t.bulkPasswords}</label>
              <CopyButton text={bulkPasswords.join('\n')} />
            </div>
            <textarea readOnly value={bulkPasswords.join('\n')} style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 13 }} />
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li>
          <li>{t.tip2}</li>
          <li>{t.tip3}</li>
          <li>{t.tip4}</li>
          <li>{t.tip5}</li>
        </ul>

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
            { href: `/${lang}/tools/password-strength-checker`, label: 'Password Strength Checker' },
            { href: `/${lang}/tools/hash-generator`, label: 'Hash Generator' },
            { href: `/${lang}/tools/uuid-generator`, label: 'UUID Generator' },
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder' },
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
