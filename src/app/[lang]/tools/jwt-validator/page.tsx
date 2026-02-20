'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

/* ── JWT validation helpers ─────────────────────────────────── */
const decodeBase64Url = (str: string): string => {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  return atob(b64);
};

interface ValidationCheck {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
}

function validateJwt(token: string, t: Record<string, string>): {
  checks: ValidationCheck[];
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string | null;
  timeInfo: string | null;
} {
  const checks: ValidationCheck[] = [];
  let header: Record<string, unknown> | null = null;
  let payload: Record<string, unknown> | null = null;
  let signature: string | null = null;
  let timeInfo: string | null = null;

  // Check 1: Has 3 parts
  const parts = token.trim().split('.');
  const has3Parts = parts.length === 3;
  checks.push({
    id: 'structure',
    label: t.check1Label,
    passed: has3Parts,
    detail: has3Parts ? t.check1Pass : t.check1Fail.replace('{n}', String(parts.length)),
  });

  if (!has3Parts) return { checks, header, payload, signature, timeInfo };

  // Check 2: Header is valid JSON
  let headerValid = false;
  try {
    const decoded = decodeBase64Url(parts[0]);
    header = JSON.parse(decoded);
    headerValid = typeof header === 'object' && header !== null;
    checks.push({
      id: 'header',
      label: t.check2Label,
      passed: true,
      detail: t.check2Pass,
    });
  } catch {
    checks.push({
      id: 'header',
      label: t.check2Label,
      passed: false,
      detail: t.check2Fail,
    });
  }

  // Check 3: Payload is valid JSON
  try {
    const decoded = decodeBase64Url(parts[1]);
    payload = JSON.parse(decoded);
    const payloadValid = typeof payload === 'object' && payload !== null;
    checks.push({
      id: 'payload',
      label: t.check3Label,
      passed: payloadValid,
      detail: payloadValid ? t.check3Pass : t.check3Fail,
    });
    if (!payloadValid) payload = null;
  } catch {
    checks.push({
      id: 'payload',
      label: t.check3Label,
      passed: false,
      detail: t.check3Fail,
    });
  }

  // Check 4: Has required alg field
  const hasAlg = headerValid && header && typeof header.alg === 'string' && header.alg.length > 0;
  checks.push({
    id: 'alg',
    label: t.check4Label,
    passed: !!hasAlg,
    detail: hasAlg ? t.check4Pass.replace('{alg}', String(header!.alg)) : t.check4Fail,
  });

  // Check 5: Expiration check
  if (payload && typeof payload.exp === 'number') {
    const now = Math.floor(Date.now() / 1000);
    const exp = payload.exp as number;
    const diff = exp - now;
    const isExpired = diff <= 0;

    if (isExpired) {
      const ago = Math.abs(diff);
      const days = Math.floor(ago / 86400);
      const hours = Math.floor((ago % 86400) / 3600);
      const minutes = Math.floor((ago % 3600) / 60);
      timeInfo = t.expiredAgo.replace('{d}', String(days)).replace('{h}', String(hours)).replace('{m}', String(minutes));
      checks.push({
        id: 'expiration',
        label: t.check5Label,
        passed: false,
        detail: `${t.check5Expired} — ${new Date(exp * 1000).toLocaleString()}`,
      });
    } else {
      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      timeInfo = t.expiresIn.replace('{d}', String(days)).replace('{h}', String(hours)).replace('{m}', String(minutes));
      checks.push({
        id: 'expiration',
        label: t.check5Label,
        passed: true,
        detail: `${t.check5Valid} — ${new Date(exp * 1000).toLocaleString()}`,
      });
    }
  } else {
    checks.push({
      id: 'expiration',
      label: t.check5Label,
      passed: true,
      detail: t.check5NoExp,
    });
  }

  signature = parts[2];

  return { checks, header, payload, signature, timeInfo };
}

/* ── i18n strings (7 languages) ─────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JWT Validator',
    description: 'Validate JWT token structure and check expiration. Verify header, payload, algorithm, and time-based claims without the secret key.',
    inputLabel: 'Paste JWT Token',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    validateBtn: 'Validate JWT',
    sampleBtn: 'Load Sample JWT',
    sampleExpiredBtn: 'Load Expired JWT',
    clear: 'Clear',
    resultsTitle: 'Validation Results',
    passedAll: 'All checks passed',
    failedSome: '{n} check(s) failed',
    signatureNote: 'Note: Signature verification requires the secret key or public key, which cannot be done client-side. This tool validates token structure and claims only.',
    timeInfoTitle: 'Expiration Details',
    decodedTitle: 'Decoded Token',
    headerLabel: 'Header',
    payloadLabel: 'Payload',
    check1Label: 'Token has 3 parts (Header.Payload.Signature)',
    check1Pass: 'Token correctly has 3 dot-separated parts',
    check1Fail: 'Token has {n} parts instead of 3',
    check2Label: 'Header is valid Base64URL-encoded JSON',
    check2Pass: 'Header successfully decoded as JSON',
    check2Fail: 'Header is not valid Base64URL-encoded JSON',
    check3Label: 'Payload is valid Base64URL-encoded JSON',
    check3Pass: 'Payload successfully decoded as JSON',
    check3Fail: 'Payload is not valid Base64URL-encoded JSON',
    check4Label: 'Header contains required "alg" field',
    check4Pass: 'Algorithm: {alg}',
    check4Fail: 'Missing or empty "alg" field in header',
    check5Label: 'Token expiration check (exp claim)',
    check5Expired: 'Token is EXPIRED',
    check5Valid: 'Token is NOT expired',
    check5NoExp: 'No "exp" claim found (token has no expiration)',
    expiredAgo: 'Expired {d} days, {h} hours, {m} minutes ago',
    expiresIn: 'Expires in {d} days, {h} hours, {m} minutes',
    errorEmpty: 'Please enter a JWT token to validate.',
    cheatTitle: 'JWT Validation Reference',
    checklistTitle: 'JWT Validation Checklist',
    commonErrorsTitle: 'Common JWT Errors',
    signatureExplainTitle: 'Validation vs Verification',
    signatureExplainText: 'JWT validation checks the token structure and claims (format, expiration, required fields). JWT verification confirms the signature using the secret key or public key, ensuring the token was not tampered with. This tool performs validation only — signature verification requires the server-side secret.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Can you validate a JWT without the secret key?',
    faq1a: 'You can validate the structure of a JWT without the secret key — checking that it has 3 parts, valid JSON in header and payload, required fields like "alg", and whether the exp claim indicates expiration. However, you cannot verify the signature without the secret key (for HMAC algorithms) or public key (for RSA/ECDSA algorithms). Signature verification confirms the token was not tampered with.',
    faq2q: 'How do I check if a JWT is expired?',
    faq2a: 'Look at the "exp" claim in the payload. It contains a Unix timestamp (seconds since epoch). Compare it with the current time: if the current Unix timestamp is greater than the exp value, the token has expired. Note that not all JWTs have an exp claim — some are designed to never expire. This validator automatically checks the exp claim for you.',
    faq3q: 'What is the difference between JWT validation and JWT verification?',
    faq3a: 'JWT validation checks the token format and structure: correct number of parts, valid Base64URL encoding, valid JSON, presence of required fields, and claim values (like expiration). JWT verification goes further by cryptographically checking the signature against the header, payload, and secret/public key. Validation can be done anywhere; verification requires the signing key.',
    relatedTitle: 'Related JWT Tools',
  },
  zh: {
    title: 'JWT 验证器',
    description: '验证 JWT 令牌结构并检查过期状态。无需密钥即可验证 Header、Payload、算法和基于时间的声明。',
    inputLabel: '粘贴 JWT Token',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    validateBtn: '验证 JWT',
    sampleBtn: '加载示例 JWT',
    sampleExpiredBtn: '加载已过期 JWT',
    clear: '清除',
    resultsTitle: '验证结果',
    passedAll: '所有检查通过',
    failedSome: '{n} 项检查失败',
    signatureNote: '注意：签名验证需要密钥或公钥，无法在客户端完成。此工具仅验证令牌结构和声明。',
    timeInfoTitle: '过期详情',
    decodedTitle: '解码后的令牌',
    headerLabel: 'Header',
    payloadLabel: 'Payload',
    check1Label: '令牌包含3个部分（Header.Payload.Signature）',
    check1Pass: '令牌正确包含3个由点分隔的部分',
    check1Fail: '令牌有 {n} 个部分而不是3个',
    check2Label: 'Header 是有效的 Base64URL 编码 JSON',
    check2Pass: 'Header 成功解码为 JSON',
    check2Fail: 'Header 不是有效的 Base64URL 编码 JSON',
    check3Label: 'Payload 是有效的 Base64URL 编码 JSON',
    check3Pass: 'Payload 成功解码为 JSON',
    check3Fail: 'Payload 不是有效的 Base64URL 编码 JSON',
    check4Label: 'Header 包含必需的 "alg" 字段',
    check4Pass: '算法: {alg}',
    check4Fail: 'Header 中缺少或为空的 "alg" 字段',
    check5Label: '令牌过期检查（exp 声明）',
    check5Expired: '令牌已过期',
    check5Valid: '令牌未过期',
    check5NoExp: '未找到 "exp" 声明（令牌无过期时间）',
    expiredAgo: '已过期 {d} 天 {h} 小时 {m} 分钟',
    expiresIn: '将在 {d} 天 {h} 小时 {m} 分钟后过期',
    errorEmpty: '请输入要验证的 JWT 令牌。',
    cheatTitle: 'JWT 验证参考',
    checklistTitle: 'JWT 验证清单',
    commonErrorsTitle: '常见 JWT 错误',
    signatureExplainTitle: '验证 vs 签名验证',
    signatureExplainText: 'JWT 验证检查令牌的结构和声明（格式、过期时间、必填字段）。JWT 签名验证使用密钥确认令牌未被篡改。此工具仅执行结构验证。',
    faqTitle: '常见问题',
    faq1q: '可以在没有密钥的情况下验证 JWT 吗？',
    faq1a: '可以验证 JWT 的结构——检查是否有3个部分、有效的JSON、必需的字段和过期状态。但无法在没有密钥的情况下验证签名。',
    faq2q: '如何检查 JWT 是否已过期？',
    faq2a: '查看 Payload 中的 "exp" 声明，它包含 Unix 时间戳。将其与当前时间比较即可判断是否过期。此验证器会自动检查。',
    faq3q: 'JWT 验证和 JWT 签名验证有什么区别？',
    faq3a: 'JWT 验证检查令牌的格式和结构。JWT 签名验证通过密码学方式检查签名。验证可以在任何地方完成；签名验证需要签名密钥。',
    relatedTitle: '相关 JWT 工具',
  },
  fr: {
    title: 'Validateur JWT',
    description: 'Validez la structure des tokens JWT et verifiez l\'expiration. Verifiez le header, le payload et l\'algorithme sans la cle secrete.',
    inputLabel: 'Collez le Token JWT',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    validateBtn: 'Valider JWT',
    sampleBtn: 'Charger un exemple',
    sampleExpiredBtn: 'Charger JWT expire',
    clear: 'Effacer',
    resultsTitle: 'Resultats de validation',
    passedAll: 'Toutes les verifications ont reussi',
    failedSome: '{n} verification(s) echouee(s)',
    signatureNote: 'Note : La verification de signature necessite la cle secrete. Cet outil valide uniquement la structure et les claims.',
    timeInfoTitle: 'Details d\'expiration',
    decodedTitle: 'Token decode',
    headerLabel: 'Header',
    payloadLabel: 'Payload',
    check1Label: 'Le token a 3 parties (Header.Payload.Signature)',
    check1Pass: 'Le token a correctement 3 parties',
    check1Fail: 'Le token a {n} parties au lieu de 3',
    check2Label: 'Le Header est un JSON encode en Base64URL valide',
    check2Pass: 'Header decode avec succes en JSON',
    check2Fail: 'Le Header n\'est pas un JSON Base64URL valide',
    check3Label: 'Le Payload est un JSON encode en Base64URL valide',
    check3Pass: 'Payload decode avec succes en JSON',
    check3Fail: 'Le Payload n\'est pas un JSON Base64URL valide',
    check4Label: 'Le Header contient le champ "alg" requis',
    check4Pass: 'Algorithme : {alg}',
    check4Fail: 'Champ "alg" manquant ou vide dans le header',
    check5Label: 'Verification d\'expiration du token (claim exp)',
    check5Expired: 'Le token est EXPIRE',
    check5Valid: 'Le token n\'est PAS expire',
    check5NoExp: 'Aucun claim "exp" trouve (pas d\'expiration)',
    expiredAgo: 'Expire il y a {d} jours, {h} heures, {m} minutes',
    expiresIn: 'Expire dans {d} jours, {h} heures, {m} minutes',
    errorEmpty: 'Veuillez entrer un token JWT a valider.',
    cheatTitle: 'Reference de validation JWT',
    checklistTitle: 'Liste de verification JWT',
    commonErrorsTitle: 'Erreurs JWT courantes',
    signatureExplainTitle: 'Validation vs Verification',
    signatureExplainText: 'La validation JWT verifie la structure. La verification JWT confirme la signature avec la cle. Cet outil effectue uniquement la validation.',
    faqTitle: 'Questions frequentes',
    faq1q: 'Peut-on valider un JWT sans la cle secrete ?',
    faq1a: 'Oui, on peut valider la structure. La verification de signature necessite la cle secrete ou publique.',
    faq2q: 'Comment verifier si un JWT est expire ?',
    faq2a: 'Regardez le claim "exp" dans le payload. Comparez-le avec l\'heure actuelle. Ce validateur le fait automatiquement.',
    faq3q: 'Quelle est la difference entre validation et verification JWT ?',
    faq3a: 'La validation verifie le format et la structure. La verification confirme la signature cryptographiquement avec la cle.',
    relatedTitle: 'Outils JWT connexes',
  },
  de: {
    title: 'JWT Validator',
    description: 'JWT-Token-Struktur validieren und Ablauf pruefen. Header, Payload und Algorithmus ohne geheimen Schluessel ueberpruefen.',
    inputLabel: 'JWT Token einfuegen',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    validateBtn: 'JWT validieren',
    sampleBtn: 'Beispiel laden',
    sampleExpiredBtn: 'Abgelaufenes JWT laden',
    clear: 'Loeschen',
    resultsTitle: 'Validierungsergebnisse',
    passedAll: 'Alle Pruefungen bestanden',
    failedSome: '{n} Pruefung(en) fehlgeschlagen',
    signatureNote: 'Hinweis: Die Signaturverifizierung erfordert den geheimen Schluessel. Dieses Tool validiert nur die Struktur und Claims.',
    timeInfoTitle: 'Ablaufdetails',
    decodedTitle: 'Dekodierter Token',
    headerLabel: 'Header',
    payloadLabel: 'Payload',
    check1Label: 'Token hat 3 Teile (Header.Payload.Signatur)',
    check1Pass: 'Token hat korrekt 3 durch Punkte getrennte Teile',
    check1Fail: 'Token hat {n} Teile statt 3',
    check2Label: 'Header ist gueltiges Base64URL-kodiertes JSON',
    check2Pass: 'Header erfolgreich als JSON dekodiert',
    check2Fail: 'Header ist kein gueltiges Base64URL-JSON',
    check3Label: 'Payload ist gueltiges Base64URL-kodiertes JSON',
    check3Pass: 'Payload erfolgreich als JSON dekodiert',
    check3Fail: 'Payload ist kein gueltiges Base64URL-JSON',
    check4Label: 'Header enthaelt erforderliches "alg"-Feld',
    check4Pass: 'Algorithmus: {alg}',
    check4Fail: 'Fehlendes oder leeres "alg"-Feld im Header',
    check5Label: 'Token-Ablaufpruefung (exp Claim)',
    check5Expired: 'Token ist ABGELAUFEN',
    check5Valid: 'Token ist NICHT abgelaufen',
    check5NoExp: 'Kein "exp"-Claim gefunden (kein Ablauf)',
    expiredAgo: 'Vor {d} Tagen, {h} Stunden, {m} Minuten abgelaufen',
    expiresIn: 'Laeuft in {d} Tagen, {h} Stunden, {m} Minuten ab',
    errorEmpty: 'Bitte geben Sie einen JWT-Token ein.',
    cheatTitle: 'JWT Validierungsreferenz',
    checklistTitle: 'JWT Validierungs-Checkliste',
    commonErrorsTitle: 'Haeufige JWT-Fehler',
    signatureExplainTitle: 'Validierung vs Verifizierung',
    signatureExplainText: 'JWT-Validierung prueft die Struktur. JWT-Verifizierung bestaetigt die Signatur mit dem Schluessel. Dieses Tool fuehrt nur die Validierung durch.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Kann man ein JWT ohne den geheimen Schluessel validieren?',
    faq1a: 'Ja, die Struktur kann validiert werden. Die Signaturverifizierung erfordert den geheimen oder oeffentlichen Schluessel.',
    faq2q: 'Wie prueft man, ob ein JWT abgelaufen ist?',
    faq2a: 'Pruefen Sie den "exp"-Claim im Payload. Vergleichen Sie ihn mit der aktuellen Zeit. Dieser Validator prueft automatisch.',
    faq3q: 'Was ist der Unterschied zwischen JWT-Validierung und -Verifizierung?',
    faq3a: 'Validierung prueft Format und Struktur. Verifizierung bestaetigt die Signatur kryptographisch mit dem Schluessel.',
    relatedTitle: 'Verwandte JWT-Tools',
  },
  es: {
    title: 'Validador JWT',
    description: 'Valida la estructura de tokens JWT y verifica la expiracion. Comprueba header, payload y algoritmo sin la clave secreta.',
    inputLabel: 'Pegar Token JWT',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    validateBtn: 'Validar JWT',
    sampleBtn: 'Cargar ejemplo',
    sampleExpiredBtn: 'Cargar JWT expirado',
    clear: 'Limpiar',
    resultsTitle: 'Resultados de validacion',
    passedAll: 'Todas las comprobaciones pasaron',
    failedSome: '{n} comprobacion(es) fallida(s)',
    signatureNote: 'Nota: La verificacion de firma requiere la clave secreta. Esta herramienta solo valida estructura y claims.',
    timeInfoTitle: 'Detalles de expiracion',
    decodedTitle: 'Token decodificado',
    headerLabel: 'Header',
    payloadLabel: 'Payload',
    check1Label: 'El token tiene 3 partes (Header.Payload.Signature)',
    check1Pass: 'El token tiene correctamente 3 partes separadas por puntos',
    check1Fail: 'El token tiene {n} partes en lugar de 3',
    check2Label: 'El Header es JSON valido codificado en Base64URL',
    check2Pass: 'Header decodificado exitosamente como JSON',
    check2Fail: 'El Header no es JSON Base64URL valido',
    check3Label: 'El Payload es JSON valido codificado en Base64URL',
    check3Pass: 'Payload decodificado exitosamente como JSON',
    check3Fail: 'El Payload no es JSON Base64URL valido',
    check4Label: 'El Header contiene el campo "alg" requerido',
    check4Pass: 'Algoritmo: {alg}',
    check4Fail: 'Campo "alg" faltante o vacio en el header',
    check5Label: 'Verificacion de expiracion del token (claim exp)',
    check5Expired: 'El token esta EXPIRADO',
    check5Valid: 'El token NO esta expirado',
    check5NoExp: 'No se encontro claim "exp" (sin expiracion)',
    expiredAgo: 'Expiro hace {d} dias, {h} horas, {m} minutos',
    expiresIn: 'Expira en {d} dias, {h} horas, {m} minutos',
    errorEmpty: 'Por favor ingrese un token JWT para validar.',
    cheatTitle: 'Referencia de validacion JWT',
    checklistTitle: 'Lista de verificacion JWT',
    commonErrorsTitle: 'Errores JWT comunes',
    signatureExplainTitle: 'Validacion vs Verificacion',
    signatureExplainText: 'La validacion JWT verifica la estructura. La verificacion JWT confirma la firma con la clave. Esta herramienta solo realiza la validacion.',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Se puede validar un JWT sin la clave secreta?',
    faq1a: 'Si, se puede validar la estructura. La verificacion de firma requiere la clave secreta o publica.',
    faq2q: 'Como verificar si un JWT esta expirado?',
    faq2a: 'Mire el claim "exp" en el payload. Comparelo con la hora actual. Este validador lo hace automaticamente.',
    faq3q: 'Cual es la diferencia entre validacion y verificacion JWT?',
    faq3a: 'La validacion verifica el formato y la estructura. La verificacion confirma la firma criptograficamente con la clave.',
    relatedTitle: 'Herramientas JWT relacionadas',
  },
  ja: {
    title: 'JWT バリデーター',
    description: 'JWTトークンの構造を検証し、有効期限を確認します。秘密鍵なしでヘッダー、ペイロード、アルゴリズムを検証。',
    inputLabel: 'JWTトークンを貼り付け',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    validateBtn: 'JWTを検証',
    sampleBtn: 'サンプルを読み込む',
    sampleExpiredBtn: '期限切れJWTを読み込む',
    clear: 'クリア',
    resultsTitle: '検証結果',
    passedAll: 'すべてのチェックに合格',
    failedSome: '{n}件のチェックに失敗',
    signatureNote: '注意：署名検証には秘密鍵が必要です。このツールは構造とクレームのみを検証します。',
    timeInfoTitle: '有効期限の詳細',
    decodedTitle: 'デコードされたトークン',
    headerLabel: 'ヘッダー',
    payloadLabel: 'ペイロード',
    check1Label: 'トークンに3つの部分がある（Header.Payload.Signature）',
    check1Pass: 'トークンには正しく3つの部分があります',
    check1Fail: 'トークンには3つではなく{n}個の部分があります',
    check2Label: 'ヘッダーが有効なBase64URLエンコードJSON',
    check2Pass: 'ヘッダーをJSONとして正常にデコード',
    check2Fail: 'ヘッダーが有効なBase64URL JSONではありません',
    check3Label: 'ペイロードが有効なBase64URLエンコードJSON',
    check3Pass: 'ペイロードをJSONとして正常にデコード',
    check3Fail: 'ペイロードが有効なBase64URL JSONではありません',
    check4Label: 'ヘッダーに必須の"alg"フィールドがある',
    check4Pass: 'アルゴリズム: {alg}',
    check4Fail: 'ヘッダーに"alg"フィールドがないか空です',
    check5Label: 'トークンの有効期限チェック（expクレーム）',
    check5Expired: 'トークンは期限切れです',
    check5Valid: 'トークンは期限切れではありません',
    check5NoExp: '"exp"クレームが見つかりません（有効期限なし）',
    expiredAgo: '{d}日{h}時間{m}分前に期限切れ',
    expiresIn: '{d}日{h}時間{m}分後に期限切れ',
    errorEmpty: '検証するJWTトークンを入力してください。',
    cheatTitle: 'JWT検証リファレンス',
    checklistTitle: 'JWT検証チェックリスト',
    commonErrorsTitle: '一般的なJWTエラー',
    signatureExplainTitle: '検証 vs 署名検証',
    signatureExplainText: 'JWT検証は構造をチェックします。署名検証は鍵で署名を確認します。このツールは構造検証のみ行います。',
    faqTitle: 'よくある質問',
    faq1q: '秘密鍵なしでJWTを検証できますか？',
    faq1a: '構造は検証できます。署名検証には秘密鍵または公開鍵が必要です。',
    faq2q: 'JWTが期限切れかどうかを確認するには？',
    faq2a: 'ペイロードの"exp"クレームを確認します。このバリデーターは自動的にチェックします。',
    faq3q: 'JWT検証と署名検証の違いは何ですか？',
    faq3a: '検証はフォーマットと構造をチェックします。署名検証は鍵で署名を暗号的に確認します。',
    relatedTitle: '関連JWTツール',
  },
  ko: {
    title: 'JWT 검증기',
    description: 'JWT 토큰 구조를 검증하고 만료를 확인합니다. 비밀 키 없이 헤더, 페이로드, 알고리즘을 검증합니다.',
    inputLabel: 'JWT 토큰 붙여넣기',
    placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    validateBtn: 'JWT 검증',
    sampleBtn: '샘플 로드',
    sampleExpiredBtn: '만료된 JWT 로드',
    clear: '지우기',
    resultsTitle: '검증 결과',
    passedAll: '모든 검사 통과',
    failedSome: '{n}개 검사 실패',
    signatureNote: '참고: 서명 검증에는 비밀 키가 필요합니다. 이 도구는 구조와 클레임만 검증합니다.',
    timeInfoTitle: '만료 세부 정보',
    decodedTitle: '디코딩된 토큰',
    headerLabel: '헤더',
    payloadLabel: '페이로드',
    check1Label: '토큰이 3부분 구조 (Header.Payload.Signature)',
    check1Pass: '토큰이 올바르게 3부분으로 구성되어 있습니다',
    check1Fail: '토큰이 3부분이 아닌 {n}부분입니다',
    check2Label: '헤더가 유효한 Base64URL 인코딩 JSON',
    check2Pass: '헤더를 JSON으로 성공적으로 디코딩',
    check2Fail: '헤더가 유효한 Base64URL JSON이 아닙니다',
    check3Label: '페이로드가 유효한 Base64URL 인코딩 JSON',
    check3Pass: '페이로드를 JSON으로 성공적으로 디코딩',
    check3Fail: '페이로드가 유효한 Base64URL JSON이 아닙니다',
    check4Label: '헤더에 필수 "alg" 필드 포함',
    check4Pass: '알고리즘: {alg}',
    check4Fail: '헤더에 "alg" 필드가 없거나 비어있습니다',
    check5Label: '토큰 만료 확인 (exp 클레임)',
    check5Expired: '토큰이 만료되었습니다',
    check5Valid: '토큰이 만료되지 않았습니다',
    check5NoExp: '"exp" 클레임 없음 (만료 없음)',
    expiredAgo: '{d}일 {h}시간 {m}분 전에 만료됨',
    expiresIn: '{d}일 {h}시간 {m}분 후 만료',
    errorEmpty: '검증할 JWT 토큰을 입력해 주세요.',
    cheatTitle: 'JWT 검증 참조',
    checklistTitle: 'JWT 검증 체크리스트',
    commonErrorsTitle: '일반적인 JWT 오류',
    signatureExplainTitle: '검증 vs 서명 검증',
    signatureExplainText: 'JWT 검증은 구조를 확인합니다. 서명 검증은 키로 서명을 확인합니다. 이 도구는 구조 검증만 수행합니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: '비밀 키 없이 JWT를 검증할 수 있나요?',
    faq1a: '구조는 검증할 수 있습니다. 서명 검증에는 비밀 키 또는 공개 키가 필요합니다.',
    faq2q: 'JWT가 만료되었는지 어떻게 확인하나요?',
    faq2a: '페이로드의 "exp" 클레임을 확인하세요. 이 검증기가 자동으로 확인합니다.',
    faq3q: 'JWT 검증과 서명 검증의 차이점은?',
    faq3a: '검증은 형식과 구조를 확인합니다. 서명 검증은 키로 서명을 암호학적으로 확인합니다.',
    relatedTitle: '관련 JWT 도구',
  },
};

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZ25pbmcta2V5LTEifQ.eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJzdWIiOiIxMjM0NTY3ODkwIiwiYXVkIjoiaHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20iLCJleHAiOjE3MzU2ODk2MDAsIm5iZiI6MTcwNDExNjgwMCwiaWF0IjoxNzA0MTEzMjAwLCJqdGkiOiJ1bmlxdWUtdG9rZW4taWQtMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0.X4bP3Kj5N0mOHYT5PxeL4dSmVsGFNxK-8P7wMuE2cqY';

// An expired sample (exp in the past)
const EXPIRED_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNjA5NDU5MjAwLCJpYXQiOjE2MDk0NTU2MDB9.3TlAaGbJhBbPMjFMM1ReOENkPKH_BBv0Xl4oah82nAU';

interface ValidationResult {
  checks: ValidationCheck[];
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string | null;
  timeInfo: string | null;
}

export default function JwtValidator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState('');

  const validate = () => {
    if (!input.trim()) {
      setError(t.errorEmpty);
      setResult(null);
      return;
    }
    setError('');
    const validationResult = validateJwt(input, t);
    setResult(validationResult);
  };

  const failedCount = result ? result.checks.filter(c => !c.passed).length : 0;
  const allPassed = result ? failedCount === 0 : false;

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
    <ToolLayout title={t.title} description={t.description} toolId="jwt-validator">
      {/* JSON-LD FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Tool UI ────────────────────────────────────────── */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 4 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => { setInput(SAMPLE_JWT); setError(''); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{t.sampleBtn}</button>
            <button onClick={() => { setInput(EXPIRED_JWT); setError(''); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{t.sampleExpiredBtn}</button>
          </div>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.placeholder}
          style={{ minHeight: 100, fontFamily: 'monospace', fontSize: 13 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button onClick={validate} className="btn btn-primary">{t.validateBtn}</button>
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
          {/* Overall Status */}
          <div style={{
            background: allPassed ? 'rgba(34, 197, 94, 0.1)' : 'rgba(244, 63, 94, 0.1)',
            border: `1px solid ${allPassed ? 'rgba(34, 197, 94, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
            borderRadius: 8, padding: '12px 16px', marginBottom: 16,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: allPassed ? '#22c55e' : '#ef4444' }}>
              {allPassed ? t.passedAll : t.failedSome.replace('{n}', String(failedCount))}
            </span>
            <span style={{ fontSize: 24 }}>{allPassed ? '\u2705' : '\u274C'}</span>
          </div>

          {/* Validation Checklist */}
          <div style={{
            background: 'var(--bg-input)', borderRadius: 8, padding: '14px 16px',
            border: '1px solid var(--border-color)', marginBottom: 16,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--accent-blue)' }}>{t.resultsTitle}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.checks.map((check) => (
                <div key={check.id} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  padding: '8px 12px', borderRadius: 6,
                  background: check.passed ? 'rgba(34, 197, 94, 0.05)' : 'rgba(244, 63, 94, 0.05)',
                  border: `1px solid ${check.passed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(244, 63, 94, 0.2)'}`,
                }}>
                  <span style={{ fontSize: 18, lineHeight: '1.2', flexShrink: 0 }}>
                    {check.passed ? '\u2705' : '\u274C'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{check.label}</div>
                    <div style={{ fontSize: 12, color: check.passed ? '#22c55e' : '#ef4444' }}>{check.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Info */}
          {result.timeInfo && (
            <div style={{
              background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
              border: '1px solid var(--border-color)', borderLeft: '3px solid #f59e0b', marginBottom: 16,
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>{t.timeInfoTitle}</h3>
              <div style={{ fontSize: 14, fontFamily: 'monospace' }}>{result.timeInfo}</div>
            </div>
          )}

          {/* Signature Note */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.05)', borderRadius: 8, padding: '10px 14px',
            border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: 16, fontSize: 12,
            color: 'var(--accent-blue)', lineHeight: 1.6,
          }}>
            {t.signatureNote}
          </div>

          {/* Decoded Token */}
          {(result.header || result.payload) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {result.header && (
                <div style={{
                  background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
                  border: '1px solid var(--border-color)', borderLeft: '3px solid #f43f5e',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#f43f5e' }}>{t.headerLabel}</span>
                    <CopyButton text={JSON.stringify(result.header, null, 2)} />
                  </div>
                  <pre style={{ fontSize: 12, fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>
                    {JSON.stringify(result.header, null, 2)}
                  </pre>
                </div>
              )}
              {result.payload && (
                <div style={{
                  background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
                  border: '1px solid var(--border-color)', borderLeft: '3px solid #8b5cf6',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#8b5cf6' }}>{t.payloadLabel}</span>
                    <CopyButton text={JSON.stringify(result.payload, null, 2)} />
                  </div>
                  <pre style={{ fontSize: 12, fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>
                    {JSON.stringify(result.payload, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ── Cheat Sheet ─────────────────────────────────────── */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cheatTitle}</h2>

        {/* Validation Checklist Table */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.checklistTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>#</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Check</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>What to verify</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Requires Key?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1', 'Structure', 'Token has exactly 3 dot-separated parts', 'No'],
                ['2', 'Header JSON', 'First part decodes to valid JSON', 'No'],
                ['3', 'Payload JSON', 'Second part decodes to valid JSON', 'No'],
                ['4', 'Algorithm', 'Header contains "alg" field', 'No'],
                ['5', 'Expiration', 'exp claim vs current time', 'No'],
                ['6', 'Not Before', 'nbf claim vs current time', 'No'],
                ['7', 'Issuer', 'iss matches expected issuer', 'No'],
                ['8', 'Audience', 'aud matches your app', 'No'],
                ['9', 'Signature', 'Cryptographic signature verification', 'Yes'],
              ].map(([num, check, what, key], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', background: i === 8 ? 'rgba(244, 63, 94, 0.05)' : 'transparent' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 700 }}>{num}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{check}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{what}</td>
                  <td style={{ padding: '8px 12px', color: key === 'Yes' ? '#ef4444' : '#22c55e', fontWeight: 600 }}>{key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Common JWT Errors */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.commonErrorsTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Error</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Cause</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Fix</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['jwt expired', 'exp claim is in the past', 'Refresh the token or extend expiry'],
                ['jwt malformed', 'Token does not have 3 parts', 'Check token format and encoding'],
                ['invalid signature', 'Signature does not match', 'Verify the signing key matches'],
                ['jwt not active', 'nbf claim is in the future', 'Wait until the token becomes active'],
                ['invalid algorithm', 'alg does not match expected', 'Ensure consistent algorithm configuration'],
                ['invalid audience', 'aud does not match your app', 'Check audience claim configuration'],
              ].map(([error, cause, fix], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600, color: '#ef4444' }}>{error}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{cause}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Validation vs Verification */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.signatureExplainTitle}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.signatureExplainText}</p>

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
            { href: `/${lang}/tools/jwt-parser`, label: 'JWT Parser' },
            { href: `/${lang}/tools/json-validator`, label: 'JSON Validator' },
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
