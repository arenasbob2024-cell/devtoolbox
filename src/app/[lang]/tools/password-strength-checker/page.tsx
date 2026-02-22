'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

function analyzePassword(password: string) {
  if (!password) return { score: 0, level: 0, crackTime: '', checks: { length: false, upper: false, lower: false, number: false, special: false, noCommon: true } };

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    noCommon: !['password', '123456', 'qwerty', 'abc123', 'letmein', 'admin', 'welcome', 'monkey', 'dragon', 'master', '111111', 'password1', '12345678', '123456789', '1234567890'].includes(password.toLowerCase()),
  };

  // Calculate charset size
  let charset = 0;
  if (checks.lower) charset += 26;
  if (checks.upper) charset += 26;
  if (checks.number) charset += 10;
  if (checks.special) charset += 33;
  if (charset === 0) charset = 26;

  // Entropy
  const entropy = password.length * Math.log2(charset);

  // Crack time estimation (assuming 10 billion guesses/second)
  const guessesPerSecond = 1e10;
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / guessesPerSecond;

  let crackTime = '';
  if (seconds < 1) crackTime = 'Instant';
  else if (seconds < 60) crackTime = `${Math.ceil(seconds)} seconds`;
  else if (seconds < 3600) crackTime = `${Math.ceil(seconds / 60)} minutes`;
  else if (seconds < 86400) crackTime = `${Math.ceil(seconds / 3600)} hours`;
  else if (seconds < 31536000) crackTime = `${Math.ceil(seconds / 86400)} days`;
  else if (seconds < 31536000 * 100) crackTime = `${Math.ceil(seconds / 31536000)} years`;
  else if (seconds < 31536000 * 1000000) crackTime = `${Math.ceil(seconds / (31536000 * 1000)).toLocaleString()}K years`;
  else crackTime = `${Math.ceil(seconds / (31536000 * 1e9)).toLocaleString()}B+ years`;

  // Score 0-4
  let score = 0;
  if (entropy >= 28) score = 1;
  if (entropy >= 40) score = 2;
  if (entropy >= 60) score = 3;
  if (entropy >= 80) score = 4;
  if (!checks.noCommon) score = 0;

  return { score, level: score, crackTime, checks, entropy: Math.round(entropy) };
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Password Strength Checker',
    description: 'Test your password security with real-time strength scoring, crack time estimation, and detailed analysis. All checks run locally in your browser.',
    inputLabel: 'Enter Password',
    inputPlaceholder: 'Type a password to check its strength...',
    showPassword: 'Show',
    hidePassword: 'Hide',
    strength: 'Strength',
    crackTime: 'Estimated crack time',
    entropy: 'Entropy',
    bits: 'bits',
    level0: 'Very Weak',
    level1: 'Weak',
    level2: 'Fair',
    level3: 'Strong',
    level4: 'Very Strong',
    checksTitle: 'Password Analysis',
    checkLength: 'At least 8 characters',
    checkUpper: 'Contains uppercase letters (A-Z)',
    checkLower: 'Contains lowercase letters (a-z)',
    checkNumber: 'Contains numbers (0-9)',
    checkSpecial: 'Contains special characters (!@#$...)',
    checkCommon: 'Not a common password',
    tipsTitle: 'Tips for Strong Passwords',
    tip1: 'Use at least 12 characters for better security',
    tip2: 'Mix uppercase, lowercase, numbers, and symbols',
    tip3: 'Avoid dictionary words and personal information',
    tip4: 'Use a unique password for each account',
    tip5: 'Consider using a passphrase (e.g., "correct-horse-battery-staple")',
    privacyNote: 'Your password never leaves your browser. All analysis is performed locally.',
    introTitle: 'Free Online Password Strength Checker',
    introText: 'This password strength checker analyzes your password in real-time and provides a security score from Very Weak to Very Strong. It estimates how long it would take to crack your password using brute force at 10 billion guesses per second, and checks for common password patterns. All processing happens locally in your browser, so your password is never transmitted.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does the password strength checker work?',
    faq1a: 'The checker analyzes your password based on length, character diversity (uppercase, lowercase, numbers, symbols), entropy (randomness), and whether it matches common passwords. It calculates the total number of possible combinations and estimates how long a brute-force attack would take at 10 billion guesses per second.',
    faq2q: 'Is my password safe to enter here?',
    faq2a: 'Yes. This tool processes your password entirely in your browser using JavaScript. Your password is never sent to any server, stored, or transmitted over the network. You can verify this by checking the network tab in your browser developer tools.',
    faq3q: 'What makes a strong password?',
    faq3a: 'A strong password should be at least 12 characters long, use a mix of uppercase letters, lowercase letters, numbers, and special characters, avoid common words and patterns, and be unique for each account. Passphrases (multiple random words joined together) are both strong and memorable.',
    faq4q: 'What is password entropy?',
    faq4a: 'Password entropy measures the randomness or unpredictability of a password in bits. Higher entropy means more possible combinations and a harder password to crack. For example, a random 8-character password using uppercase, lowercase, numbers, and symbols has about 52 bits of entropy. A strong password should have at least 60 bits of entropy.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '密码强度检测器',
    description: '实时评估密码安全性，估算破解时间，提供详细分析。所有检测在浏览器本地完成。',
    inputLabel: '输入密码',
    inputPlaceholder: '输入密码以检测强度...',
    showPassword: '显示',
    hidePassword: '隐藏',
    strength: '强度',
    crackTime: '预估破解时间',
    entropy: '熵值',
    bits: '位',
    level0: '非常弱',
    level1: '弱',
    level2: '一般',
    level3: '强',
    level4: '非常强',
    checksTitle: '密码分析',
    checkLength: '至少 8 个字符',
    checkUpper: '包含大写字母 (A-Z)',
    checkLower: '包含小写字母 (a-z)',
    checkNumber: '包含数字 (0-9)',
    checkSpecial: '包含特殊字符 (!@#$...)',
    checkCommon: '不是常见密码',
    tipsTitle: '强密码提示',
    tip1: '使用至少 12 个字符以获得更好的安全性',
    tip2: '混合大小写字母、数字和符号',
    tip3: '避免使用字典单词和个人信息',
    tip4: '为每个账户使用唯一的密码',
    tip5: '考虑使用密码短语',
    privacyNote: '您的密码永远不会离开浏览器。所有分析均在本地执行。',
    introTitle: '免费在线密码强度检测器',
    introText: '这个密码强度检测器可以实时分析您的密码并提供从非常弱到非常强的安全评分。它估算使用每秒100亿次猜测进行暴力破解所需的时间。所有处理在浏览器本地完成。',
    faqTitle: '常见问题',
    faq1q: '密码强度检测器如何工作？',
    faq1a: '检测器根据密码长度、字符多样性、熵值和是否匹配常见密码来分析。它计算可能的组合总数并估算暴力破解时间。',
    faq2q: '在这里输入密码安全吗？',
    faq2a: '是的。此工具完全在浏览器中使用 JavaScript 处理密码，永远不会发送到任何服务器。',
    faq3q: '什么样的密码才是强密码？',
    faq3a: '强密码应至少 12 个字符，混合使用大小写字母、数字和特殊字符，避免常见单词，且每个账户使用唯一密码。',
    faq4q: '什么是密码熵？',
    faq4a: '密码熵以比特为单位衡量密码的随机性。熵值越高意味着更多的可能组合，密码越难破解。强密码应有至少 60 位熵。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Verificateur de Force de Mot de Passe',
    description: 'Testez la securite de votre mot de passe en temps reel. Estimation du temps de craquage et analyse detaillee.',
    inputLabel: 'Entrer le mot de passe', inputPlaceholder: 'Tapez un mot de passe pour verifier sa force...',
    showPassword: 'Afficher', hidePassword: 'Masquer', strength: 'Force', crackTime: 'Temps de craquage estime',
    entropy: 'Entropie', bits: 'bits',
    level0: 'Tres faible', level1: 'Faible', level2: 'Moyen', level3: 'Fort', level4: 'Tres fort',
    checksTitle: 'Analyse du mot de passe',
    checkLength: 'Au moins 8 caracteres', checkUpper: 'Contient des majuscules (A-Z)', checkLower: 'Contient des minuscules (a-z)',
    checkNumber: 'Contient des chiffres (0-9)', checkSpecial: 'Contient des caracteres speciaux (!@#$...)', checkCommon: 'Pas un mot de passe courant',
    tipsTitle: 'Conseils pour des mots de passe forts',
    tip1: 'Utilisez au moins 12 caracteres', tip2: 'Melangez majuscules, minuscules, chiffres et symboles',
    tip3: 'Evitez les mots du dictionnaire', tip4: 'Utilisez un mot de passe unique par compte', tip5: 'Pensez a une phrase de passe',
    privacyNote: 'Votre mot de passe ne quitte jamais votre navigateur.',
    introTitle: 'Verificateur de force gratuit', introText: 'Ce verificateur analyse votre mot de passe en temps reel et fournit un score de securite. Le traitement se fait entierement dans votre navigateur.',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment fonctionne le verificateur ?', faq1a: 'Il analyse la longueur, la diversite des caracteres, l\'entropie et les mots de passe courants.',
    faq2q: 'Mon mot de passe est-il en securite ici ?', faq2a: 'Oui. Tout est traite localement dans votre navigateur, jamais envoye a un serveur.',
    faq3q: 'Qu\'est-ce qu\'un mot de passe fort ?', faq3a: 'Au moins 12 caracteres avec un melange de majuscules, minuscules, chiffres et symboles.',
    faq4q: 'Qu\'est-ce que l\'entropie du mot de passe ?', faq4a: 'L\'entropie mesure l\'imprevisibilite en bits. Plus l\'entropie est elevee, plus le mot de passe est difficile a craquer.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Passwort-Staerke-Pruefer',
    description: 'Testen Sie Ihre Passwortsicherheit in Echtzeit. Schaetzung der Knackzeit und detaillierte Analyse.',
    inputLabel: 'Passwort eingeben', inputPlaceholder: 'Geben Sie ein Passwort ein um die Staerke zu pruefen...',
    showPassword: 'Anzeigen', hidePassword: 'Verbergen', strength: 'Staerke', crackTime: 'Geschaetzte Knackzeit',
    entropy: 'Entropie', bits: 'Bits',
    level0: 'Sehr schwach', level1: 'Schwach', level2: 'Mittel', level3: 'Stark', level4: 'Sehr stark',
    checksTitle: 'Passwort-Analyse',
    checkLength: 'Mindestens 8 Zeichen', checkUpper: 'Grossbuchstaben (A-Z)', checkLower: 'Kleinbuchstaben (a-z)',
    checkNumber: 'Zahlen (0-9)', checkSpecial: 'Sonderzeichen (!@#$...)', checkCommon: 'Kein gaengiges Passwort',
    tipsTitle: 'Tipps fuer starke Passwoerter',
    tip1: 'Mindestens 12 Zeichen verwenden', tip2: 'Gross-/Kleinbuchstaben, Zahlen und Symbole mischen',
    tip3: 'Woerterbuchwoerter vermeiden', tip4: 'Ein einzigartiges Passwort pro Konto', tip5: 'Passphrase erwaegen',
    privacyNote: 'Ihr Passwort verlässt nie Ihren Browser.',
    introTitle: 'Kostenloser Passwort-Staerke-Pruefer', introText: 'Dieser Pruefer analysiert Ihr Passwort in Echtzeit und liefert einen Sicherheitsscore. Die Verarbeitung erfolgt vollstaendig in Ihrem Browser.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie funktioniert der Pruefer?', faq1a: 'Er analysiert Laenge, Zeichenvielfalt, Entropie und gaengige Passwoerter.',
    faq2q: 'Ist mein Passwort hier sicher?', faq2a: 'Ja. Alles wird lokal in Ihrem Browser verarbeitet.',
    faq3q: 'Was macht ein starkes Passwort aus?', faq3a: 'Mindestens 12 Zeichen mit Gross-/Kleinbuchstaben, Zahlen und Symbolen.',
    faq4q: 'Was ist Passwort-Entropie?', faq4a: 'Entropie misst die Unvorhersehbarkeit in Bits. Hoehere Entropie bedeutet schwerer zu knacken.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Verificador de Seguridad de Contrasena',
    description: 'Prueba la seguridad de tu contrasena en tiempo real. Estimacion de tiempo de crackeo y analisis detallado.',
    inputLabel: 'Ingresa la contrasena', inputPlaceholder: 'Escribe una contrasena para verificar su fuerza...',
    showPassword: 'Mostrar', hidePassword: 'Ocultar', strength: 'Fuerza', crackTime: 'Tiempo estimado de crackeo',
    entropy: 'Entropia', bits: 'bits',
    level0: 'Muy debil', level1: 'Debil', level2: 'Regular', level3: 'Fuerte', level4: 'Muy fuerte',
    checksTitle: 'Analisis de contrasena',
    checkLength: 'Al menos 8 caracteres', checkUpper: 'Mayusculas (A-Z)', checkLower: 'Minusculas (a-z)',
    checkNumber: 'Numeros (0-9)', checkSpecial: 'Caracteres especiales (!@#$...)', checkCommon: 'No es una contrasena comun',
    tipsTitle: 'Consejos para contrasenas fuertes',
    tip1: 'Usa al menos 12 caracteres', tip2: 'Mezcla mayusculas, minusculas, numeros y simbolos',
    tip3: 'Evita palabras del diccionario', tip4: 'Usa una contrasena unica por cuenta', tip5: 'Considera usar una frase de paso',
    privacyNote: 'Tu contrasena nunca sale de tu navegador.',
    introTitle: 'Verificador gratuito de fuerza', introText: 'Este verificador analiza tu contrasena en tiempo real y proporciona una puntuacion de seguridad. Todo se procesa localmente en tu navegador.',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como funciona el verificador?', faq1a: 'Analiza longitud, diversidad de caracteres, entropia y contrasenas comunes.',
    faq2q: 'Es seguro ingresar mi contrasena aqui?', faq2a: 'Si. Todo se procesa localmente en tu navegador.',
    faq3q: 'Que hace fuerte a una contrasena?', faq3a: 'Al menos 12 caracteres con mayusculas, minusculas, numeros y simbolos.',
    faq4q: 'Que es la entropia de contrasena?', faq4a: 'La entropia mide la imprevisibilidad en bits. Mayor entropia significa mas dificil de crackear.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'パスワード強度チェッカー',
    description: 'リアルタイムでパスワードセキュリティをテスト。クラック時間推定と詳細分析。',
    inputLabel: 'パスワードを入力', inputPlaceholder: 'パスワードを入力して強度を確認...',
    showPassword: '表示', hidePassword: '非表示', strength: '強度', crackTime: '推定クラック時間',
    entropy: 'エントロピー', bits: 'ビット',
    level0: '非常に弱い', level1: '弱い', level2: '普通', level3: '強い', level4: '非常に強い',
    checksTitle: 'パスワード分析',
    checkLength: '8文字以上', checkUpper: '大文字 (A-Z)', checkLower: '小文字 (a-z)',
    checkNumber: '数字 (0-9)', checkSpecial: '特殊文字 (!@#$...)', checkCommon: '一般的なパスワードでない',
    tipsTitle: '強いパスワードのコツ',
    tip1: '12文字以上を使用', tip2: '大小文字、数字、記号を混ぜる',
    tip3: '辞書の単語を避ける', tip4: 'アカウントごとに固有のパスワード', tip5: 'パスフレーズの使用を検討',
    privacyNote: 'パスワードはブラウザから外に出ません。',
    introTitle: '無料オンラインパスワード強度チェッカー', introText: 'このチェッカーはパスワードをリアルタイムで分析し、セキュリティスコアを提供します。処理はブラウザ内で完結します。',
    faqTitle: 'よくある質問',
    faq1q: 'チェッカーの仕組みは？', faq1a: '長さ、文字の多様性、エントロピー、一般的なパスワードを分析します。',
    faq2q: 'ここにパスワードを入力して安全？', faq2a: 'はい。すべてブラウザ内でローカルに処理されます。',
    faq3q: '強いパスワードとは？', faq3a: '12文字以上で大小文字、数字、記号を含むパスワードです。',
    faq4q: 'パスワードエントロピーとは？', faq4a: 'エントロピーはビット単位で予測不可能性を測定します。高いほどクラックが困難です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '비밀번호 강도 검사기',
    description: '실시간으로 비밀번호 보안을 테스트. 크래킹 시간 추정 및 상세 분석.',
    inputLabel: '비밀번호 입력', inputPlaceholder: '비밀번호를 입력하여 강도를 확인...',
    showPassword: '표시', hidePassword: '숨기기', strength: '강도', crackTime: '예상 크래킹 시간',
    entropy: '엔트로피', bits: '비트',
    level0: '매우 약함', level1: '약함', level2: '보통', level3: '강함', level4: '매우 강함',
    checksTitle: '비밀번호 분석',
    checkLength: '8자 이상', checkUpper: '대문자 (A-Z)', checkLower: '소문자 (a-z)',
    checkNumber: '숫자 (0-9)', checkSpecial: '특수문자 (!@#$...)', checkCommon: '일반적인 비밀번호가 아님',
    tipsTitle: '강한 비밀번호 팁',
    tip1: '12자 이상 사용', tip2: '대소문자, 숫자, 기호 혼합',
    tip3: '사전 단어 피하기', tip4: '계정마다 고유한 비밀번호 사용', tip5: '암호 문구 고려',
    privacyNote: '비밀번호는 브라우저를 벗어나지 않습니다.',
    introTitle: '무료 온라인 비밀번호 강도 검사기', introText: '이 검사기는 비밀번호를 실시간으로 분석하고 보안 점수를 제공합니다. 모든 처리는 브라우저에서 수행됩니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: '검사기는 어떻게 작동하나요?', faq1a: '길이, 문자 다양성, 엔트로피, 일반적인 비밀번호를 분석합니다.',
    faq2q: '여기에 비밀번호를 입력해도 안전한가요?', faq2a: '네. 모든 것이 브라우저에서 로컬로 처리됩니다.',
    faq3q: '강한 비밀번호란?', faq3a: '12자 이상에 대소문자, 숫자, 기호를 포함하는 비밀번호입니다.',
    faq4q: '비밀번호 엔트로피란?', faq4a: '엔트로피는 비트 단위로 예측 불가능성을 측정합니다. 높을수록 크래킹이 어렵습니다.',
    relatedTitle: '관련 도구',
  },
};

export default function PasswordStrengthChecker() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const analysis = useMemo(() => analyzePassword(password), [password]);

  const levelLabels = [t.level0, t.level1, t.level2, t.level3, t.level4];
  const levelColors = ['#6b7280', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6'];
  const barColor = levelColors[analysis.level];
  const barWidth = password ? Math.max(5, (analysis.level + 1) * 25) : 0;

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
    <ToolLayout title={t.title} description={t.description} toolId="password-strength-checker">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Password input */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={{ width: '100%', padding: '12px 80px 12px 16px', fontSize: 16, fontFamily: 'monospace' }}
            autoComplete="off"
          />
          <button
            onClick={() => setShowPw(!showPw)}
            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
          >{showPw ? t.hidePassword : t.showPassword}</button>
        </div>
      </div>

      {/* Strength bar */}
      {password && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: barColor }}>{t.strength}: {levelLabels[analysis.level]}</span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.entropy}: {analysis.entropy} {t.bits}</span>
          </div>
          <div style={{ width: '100%', height: 8, borderRadius: 4, background: 'var(--border-color)', overflow: 'hidden' }}>
            <div style={{ width: `${barWidth}%`, height: '100%', borderRadius: 4, background: barColor, transition: 'all 0.3s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t.crackTime}: <strong style={{ color: barColor }}>{analysis.crackTime}</strong></span>
          </div>
        </div>
      )}

      {/* Checks grid */}
      {password && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.checksTitle}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { check: analysis.checks.length, label: t.checkLength },
              { check: analysis.checks.upper, label: t.checkUpper },
              { check: analysis.checks.lower, label: t.checkLower },
              { check: analysis.checks.number, label: t.checkNumber },
              { check: analysis.checks.special, label: t.checkSpecial },
              { check: analysis.checks.noCommon, label: t.checkCommon },
            ].map(({ check, label }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'var(--bg-input)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: 16 }}>{check ? '\u2705' : '\u274C'}</span>
                <span style={{ fontSize: 13, color: check ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.tipsTitle}</h3>
        <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
          <li>{t.tip1}</li>
          <li>{t.tip2}</li>
          <li>{t.tip3}</li>
          <li>{t.tip4}</li>
          <li>{t.tip5}</li>
        </ul>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 12, opacity: 0.7, fontStyle: 'italic' }}>{t.privacyNote}</p>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

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
            { href: `/${lang}/tools/password-generator`, label: 'Password Generator' },
            { href: `/${lang}/tools/hash-generator`, label: 'Hash Generator' },
            { href: `/${lang}/tools/bcrypt-generator`, label: 'Bcrypt Generator' },
            { href: `/${lang}/tools/uuid-generator`, label: 'UUID Generator' },
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
