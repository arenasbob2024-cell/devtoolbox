'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Base64 vs URL Encoding',
    description: 'A detailed comparison of Base64 encoding and URL encoding to help you understand when to use each.',
    intro: 'Base64 and URL encoding solve different problems. Base64 converts binary data to ASCII text, while URL encoding makes strings safe for use in URLs. Understanding their differences is essential for web developers.',
    tableFeature: 'Feature', tableBase64: 'Base64', tableUrl: 'URL Encoding',
    purpose: 'Purpose', purBase: 'Binary-to-text encoding', purUrl: 'URL-safe character escaping',
    charset: 'Character Set', charBase: 'A-Z, a-z, 0-9, +, /', charUrl: 'Original chars + %XX escapes',
    sizeIncrease: 'Size Increase', sizeBase: '~33% larger', sizeUrl: 'Variable (only special chars)',
    reversible: 'Reversible', revBase: 'Yes, always', revUrl: 'Yes, always',
    useCase: 'Common Use', useBase: 'Email attachments, data URIs, API payloads', useUrl: 'Query parameters, form data, path segments',
    whatIsBase64: 'What is Base64?',
    base64Text: 'Base64 is a binary-to-text encoding scheme that represents binary data using 64 ASCII characters (A-Z, a-z, 0-9, +, /). It is commonly used to embed binary data in text-based formats like JSON, XML, email (MIME), and data URIs in HTML/CSS. Every 3 bytes of input become 4 Base64 characters, resulting in approximately 33% size increase.',
    whatIsUrl: 'What is URL Encoding?',
    urlText: 'URL encoding (also called percent-encoding) replaces unsafe ASCII characters with a % followed by two hexadecimal digits. For example, a space becomes %20 and an ampersand becomes %26. It ensures that special characters in URLs are transmitted correctly without being interpreted as URL delimiters. Only characters that are unsafe in URLs are encoded, so the size increase varies.',
    whenBase64: 'When to Use Base64',
    base64Use1: 'Embedding images in HTML/CSS (data URIs)',
    base64Use2: 'Sending binary data in JSON/XML payloads',
    base64Use3: 'Email attachments (MIME encoding)',
    base64Use4: 'Storing binary data in text-only databases',
    base64Use5: 'Basic HTTP authentication headers',
    whenUrl: 'When to Use URL Encoding',
    urlUse1: 'Query string parameters',
    urlUse2: 'HTML form submissions (application/x-www-form-urlencoded)',
    urlUse3: 'Path segments with special characters',
    urlUse4: 'Cookie values with special characters',
    urlUse5: 'Redirect URLs within URLs',
    verdict: 'TL;DR / Verdict',
    verdictText: 'Use Base64 when you need to represent binary data as text. Use URL encoding when you need to include special characters in URLs. They solve completely different problems and are not interchangeable.',
    tryTools: 'Try Our Encoding Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Can I use Base64 in URLs?',
    faq1a: 'Standard Base64 uses + and / characters which are not URL-safe. Use Base64url variant (RFC 4648) which replaces + with - and / with _ for URL-safe encoding. Most languages have built-in support for Base64url.',
    faq2q: 'Which encoding is more efficient?',
    faq2a: 'URL encoding is more efficient for text with few special characters since it only encodes what needs encoding. Base64 always increases size by 33%. For binary data, Base64 is the only option. For URL parameters, URL encoding is always preferred.',
    faq3q: 'Is Base64 an encryption method?',
    faq3a: 'No, Base64 is not encryption. It is an encoding scheme that is fully reversible without any key. Anyone can decode Base64 data. Never use Base64 to protect sensitive information.',
  },
  zh: {
    title: 'Base64 vs URL 编码',
    description: 'Base64 编码与 URL 编码的详细对比，帮助你理解何时使用哪种编码。',
    intro: 'Base64 和 URL 编码解决不同的问题。Base64 将二进制数据转换为 ASCII 文本，而 URL 编码使字符串在 URL 中安全使用。',
    tableFeature: '特性', tableBase64: 'Base64', tableUrl: 'URL 编码',
    purpose: '用途', purBase: '二进制转文本编码', purUrl: 'URL 安全字符转义',
    charset: '字符集', charBase: 'A-Z, a-z, 0-9, +, /', charUrl: '原始字符 + %XX 转义',
    sizeIncrease: '大小增加', sizeBase: '约增大 33%', sizeUrl: '可变（仅特殊字符）',
    reversible: '可逆', revBase: '是', revUrl: '是',
    useCase: '常见用途', useBase: '邮件附件、数据URI、API载荷', useUrl: '查询参数、表单数据、路径段',
    whatIsBase64: '什么是 Base64？', base64Text: 'Base64 使用 64 个 ASCII 字符表示二进制数据。常用于在 JSON、XML、邮件和数据 URI 中嵌入二进制数据。每 3 字节输入产生 4 个 Base64 字符，大小约增加 33%。',
    whatIsUrl: '什么是 URL 编码？', urlText: 'URL 编码将不安全的 ASCII 字符替换为 % 加两位十六进制数。确保 URL 中的特殊字符被正确传输。',
    whenBase64: '何时使用 Base64', base64Use1: '在 HTML/CSS 中嵌入图片', base64Use2: '在 JSON/XML 中发送二进制数据', base64Use3: '邮件附件', base64Use4: '在纯文本数据库中存储二进制数据', base64Use5: 'HTTP 基本认证头',
    whenUrl: '何时使用 URL 编码', urlUse1: '查询字符串参数', urlUse2: 'HTML 表单提交', urlUse3: '包含特殊字符的路径', urlUse4: 'Cookie 值', urlUse5: 'URL 中的重定向 URL',
    verdict: '总结', verdictText: '需要将二进制数据表示为文本时用 Base64。需要在 URL 中包含特殊字符时用 URL 编码。两者解决完全不同的问题。',
    tryTools: '试试我们的编码工具',
    faqTitle: '常见问题',
    faq1q: '可以在 URL 中使用 Base64 吗？', faq1a: '标准 Base64 使用 + 和 / 字符，不适合 URL。请使用 Base64url 变体。',
    faq2q: '哪种编码更高效？', faq2a: 'URL 编码对少量特殊字符的文本更高效。Base64 始终增加 33% 大小。',
    faq3q: 'Base64 是加密方法吗？', faq3a: '不是。Base64 是可逆编码，不提供任何安全保护。',
  },
  fr: {
    title: 'Base64 vs Encodage URL',
    description: 'Comparaison detaillee de Base64 et de l\'encodage URL.',
    intro: 'Base64 et l\'encodage URL resolvent des problemes differents. Base64 convertit les donnees binaires en texte ASCII, tandis que l\'encodage URL securise les chaines pour les URLs.',
    tableFeature: 'Caracteristique', tableBase64: 'Base64', tableUrl: 'Encodage URL',
    purpose: 'Objectif', purBase: 'Encodage binaire vers texte', purUrl: 'Echappement de caracteres URL',
    charset: 'Jeu de caracteres', charBase: 'A-Z, a-z, 0-9, +, /', charUrl: 'Caracteres originaux + echappements %XX',
    sizeIncrease: 'Augmentation taille', sizeBase: '~33% plus grand', sizeUrl: 'Variable',
    reversible: 'Reversible', revBase: 'Oui', revUrl: 'Oui',
    useCase: 'Utilisation', useBase: 'Pieces jointes, data URIs, API', useUrl: 'Parametres URL, formulaires',
    whatIsBase64: 'Qu\'est-ce que Base64 ?', base64Text: 'Base64 encode les donnees binaires en 64 caracteres ASCII. Augmente la taille de ~33%.',
    whatIsUrl: 'Qu\'est-ce que l\'encodage URL ?', urlText: 'L\'encodage URL remplace les caracteres speciaux par %XX pour les rendre surs dans les URLs.',
    whenBase64: 'Quand utiliser Base64', base64Use1: 'Images dans HTML/CSS', base64Use2: 'Donnees binaires dans JSON/XML', base64Use3: 'Pieces jointes email', base64Use4: 'Stockage binaire en texte', base64Use5: 'Authentification HTTP Basic',
    whenUrl: 'Quand utiliser l\'encodage URL', urlUse1: 'Parametres de requete', urlUse2: 'Soumissions de formulaires', urlUse3: 'Segments de chemin', urlUse4: 'Valeurs de cookies', urlUse5: 'URLs de redirection',
    verdict: 'Resume', verdictText: 'Base64 pour les donnees binaires en texte. Encodage URL pour les caracteres speciaux dans les URLs.',
    tryTools: 'Essayez nos outils d\'encodage',
    faqTitle: 'Questions frequentes',
    faq1q: 'Peut-on utiliser Base64 dans les URLs ?', faq1a: 'Utilisez la variante Base64url qui remplace + par - et / par _.',
    faq2q: 'Quel encodage est le plus efficace ?', faq2a: 'L\'encodage URL est plus efficace pour le texte avec peu de caracteres speciaux.',
    faq3q: 'Base64 est-il une methode de chiffrement ?', faq3a: 'Non, Base64 est un encodage reversible, pas du chiffrement.',
  },
  de: {
    title: 'Base64 vs URL-Encoding',
    description: 'Detaillierter Vergleich von Base64 und URL-Encoding.',
    intro: 'Base64 und URL-Encoding loesen unterschiedliche Probleme. Base64 konvertiert Binaerdaten in ASCII, URL-Encoding macht Strings URL-sicher.',
    tableFeature: 'Eigenschaft', tableBase64: 'Base64', tableUrl: 'URL-Encoding',
    purpose: 'Zweck', purBase: 'Binaer-zu-Text Kodierung', purUrl: 'URL-sichere Zeichenersetzung',
    charset: 'Zeichensatz', charBase: 'A-Z, a-z, 0-9, +, /', charUrl: 'Originalzeichen + %XX',
    sizeIncrease: 'Groessenzunahme', sizeBase: '~33% groesser', sizeUrl: 'Variabel',
    reversible: 'Umkehrbar', revBase: 'Ja', revUrl: 'Ja',
    useCase: 'Verwendung', useBase: 'E-Mail-Anhaenge, Data-URIs, APIs', useUrl: 'Query-Parameter, Formulardaten',
    whatIsBase64: 'Was ist Base64?', base64Text: 'Base64 kodiert Binaerdaten in 64 ASCII-Zeichen. Vergroessert die Daten um ~33%.',
    whatIsUrl: 'Was ist URL-Encoding?', urlText: 'URL-Encoding ersetzt unsichere Zeichen durch %XX fuer die sichere Verwendung in URLs.',
    whenBase64: 'Wann Base64 verwenden', base64Use1: 'Bilder in HTML/CSS einbetten', base64Use2: 'Binaerdaten in JSON/XML', base64Use3: 'E-Mail-Anhaenge', base64Use4: 'Binaerspeicherung in Text-DBs', base64Use5: 'HTTP Basic Auth',
    whenUrl: 'Wann URL-Encoding verwenden', urlUse1: 'Query-Parameter', urlUse2: 'Formular-Submissions', urlUse3: 'Pfadsegmente', urlUse4: 'Cookie-Werte', urlUse5: 'Redirect-URLs',
    verdict: 'Fazit', verdictText: 'Base64 fuer Binaerdaten als Text. URL-Encoding fuer Sonderzeichen in URLs.',
    tryTools: 'Probieren Sie unsere Encoding-Tools',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Kann man Base64 in URLs verwenden?', faq1a: 'Verwenden Sie die Base64url-Variante mit - und _ statt + und /.',
    faq2q: 'Welches Encoding ist effizienter?', faq2a: 'URL-Encoding ist effizienter fuer Text mit wenigen Sonderzeichen.',
    faq3q: 'Ist Base64 eine Verschluesselungsmethode?', faq3a: 'Nein, Base64 ist ein umkehrbares Encoding, keine Verschluesselung.',
  },
  es: {
    title: 'Base64 vs URL Encoding',
    description: 'Comparacion detallada de Base64 y URL encoding.',
    intro: 'Base64 y URL encoding resuelven problemas diferentes. Base64 convierte datos binarios a texto ASCII, URL encoding hace strings seguros para URLs.',
    tableFeature: 'Caracteristica', tableBase64: 'Base64', tableUrl: 'URL Encoding',
    purpose: 'Proposito', purBase: 'Codificacion binario a texto', purUrl: 'Escape de caracteres para URL',
    charset: 'Conjunto de caracteres', charBase: 'A-Z, a-z, 0-9, +, /', charUrl: 'Caracteres originales + %XX',
    sizeIncrease: 'Aumento de tamano', sizeBase: '~33% mas grande', sizeUrl: 'Variable',
    reversible: 'Reversible', revBase: 'Si', revUrl: 'Si',
    useCase: 'Uso comun', useBase: 'Adjuntos email, data URIs, APIs', useUrl: 'Parametros URL, formularios',
    whatIsBase64: 'Que es Base64?', base64Text: 'Base64 codifica datos binarios en 64 caracteres ASCII. Aumenta el tamano ~33%.',
    whatIsUrl: 'Que es URL Encoding?', urlText: 'URL encoding reemplaza caracteres inseguros con %XX para uso seguro en URLs.',
    whenBase64: 'Cuando usar Base64', base64Use1: 'Imagenes en HTML/CSS', base64Use2: 'Datos binarios en JSON/XML', base64Use3: 'Adjuntos de email', base64Use4: 'Almacenamiento binario en texto', base64Use5: 'Autenticacion HTTP Basic',
    whenUrl: 'Cuando usar URL Encoding', urlUse1: 'Parametros de consulta', urlUse2: 'Envio de formularios', urlUse3: 'Segmentos de ruta', urlUse4: 'Valores de cookies', urlUse5: 'URLs de redireccion',
    verdict: 'Resumen', verdictText: 'Base64 para datos binarios como texto. URL encoding para caracteres especiales en URLs.',
    tryTools: 'Prueba nuestras herramientas de codificacion',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Se puede usar Base64 en URLs?', faq1a: 'Use la variante Base64url que usa - y _ en lugar de + y /.',
    faq2q: 'Cual codificacion es mas eficiente?', faq2a: 'URL encoding es mas eficiente para texto con pocos caracteres especiales.',
    faq3q: 'Es Base64 un metodo de encriptacion?', faq3a: 'No, Base64 es una codificacion reversible, no encriptacion.',
  },
  ja: {
    title: 'Base64 vs URLエンコーディング',
    description: 'Base64エンコーディングとURLエンコーディングの詳細な比較。',
    intro: 'Base64とURLエンコーディングは異なる問題を解決します。Base64はバイナリデータをASCIIテキストに変換し、URLエンコーディングは文字列をURL内で安全に使えるようにします。',
    tableFeature: '特性', tableBase64: 'Base64', tableUrl: 'URLエンコーディング',
    purpose: '目的', purBase: 'バイナリ→テキスト変換', purUrl: 'URL安全な文字エスケープ',
    charset: '文字セット', charBase: 'A-Z, a-z, 0-9, +, /', charUrl: '元の文字 + %XX',
    sizeIncrease: 'サイズ増加', sizeBase: '約33%増', sizeUrl: '可変',
    reversible: '可逆', revBase: 'はい', revUrl: 'はい',
    useCase: '用途', useBase: 'メール添付、データURI、API', useUrl: 'クエリパラメータ、フォームデータ',
    whatIsBase64: 'Base64とは？', base64Text: 'Base64は64文字のASCIIでバイナリデータをエンコードします。サイズは約33%増加します。',
    whatIsUrl: 'URLエンコーディングとは？', urlText: 'URLエンコーディングは安全でない文字を%XXに置換してURLで使えるようにします。',
    whenBase64: 'Base64を使う場合', base64Use1: 'HTML/CSSに画像を埋め込む', base64Use2: 'JSON/XMLでバイナリ送信', base64Use3: 'メール添付', base64Use4: 'テキストDBにバイナリ保存', base64Use5: 'HTTP Basic認証',
    whenUrl: 'URLエンコーディングを使う場合', urlUse1: 'クエリパラメータ', urlUse2: 'フォーム送信', urlUse3: 'パスセグメント', urlUse4: 'Cookie値', urlUse5: 'リダイレクトURL',
    verdict: 'まとめ', verdictText: 'バイナリデータのテキスト化にはBase64。URL内の特殊文字にはURLエンコーディング。',
    tryTools: 'エンコーディングツールを試す',
    faqTitle: 'よくある質問',
    faq1q: 'URLでBase64を使えますか？', faq1a: 'Base64url変体（+を-に、/を_に置換）を使用してください。',
    faq2q: 'どちらが効率的ですか？', faq2a: '特殊文字が少ないテキストにはURLエンコーディングが効率的です。',
    faq3q: 'Base64は暗号化ですか？', faq3a: 'いいえ、Base64は可逆エンコーディングで暗号化ではありません。',
  },
  ko: {
    title: 'Base64 vs URL 인코딩',
    description: 'Base64 인코딩과 URL 인코딩의 상세 비교.',
    intro: 'Base64와 URL 인코딩은 서로 다른 문제를 해결합니다. Base64는 바이너리 데이터를 ASCII 텍스트로 변환하고, URL 인코딩은 URL에서 안전하게 사용할 수 있도록 합니다.',
    tableFeature: '특성', tableBase64: 'Base64', tableUrl: 'URL 인코딩',
    purpose: '목적', purBase: '바이너리→텍스트 인코딩', purUrl: 'URL 안전 문자 이스케이프',
    charset: '문자 세트', charBase: 'A-Z, a-z, 0-9, +, /', charUrl: '원래 문자 + %XX',
    sizeIncrease: '크기 증가', sizeBase: '약 33% 증가', sizeUrl: '가변적',
    reversible: '가역성', revBase: '예', revUrl: '예',
    useCase: '용도', useBase: '이메일 첨부, 데이터 URI, API', useUrl: '쿼리 파라미터, 폼 데이터',
    whatIsBase64: 'Base64란?', base64Text: 'Base64는 64개의 ASCII 문자로 바이너리 데이터를 인코딩합니다. 크기가 약 33% 증가합니다.',
    whatIsUrl: 'URL 인코딩이란?', urlText: 'URL 인코딩은 안전하지 않은 문자를 %XX로 대체하여 URL에서 사용할 수 있게 합니다.',
    whenBase64: 'Base64를 사용할 때', base64Use1: 'HTML/CSS에 이미지 삽입', base64Use2: 'JSON/XML에 바이너리 전송', base64Use3: '이메일 첨부', base64Use4: '텍스트 DB에 바이너리 저장', base64Use5: 'HTTP Basic 인증',
    whenUrl: 'URL 인코딩을 사용할 때', urlUse1: '쿼리 파라미터', urlUse2: '폼 제출', urlUse3: '경로 세그먼트', urlUse4: '쿠키 값', urlUse5: '리다이렉트 URL',
    verdict: '요약', verdictText: '바이너리 데이터의 텍스트 표현에는 Base64. URL의 특수 문자에는 URL 인코딩.',
    tryTools: '인코딩 도구 사용해보기',
    faqTitle: '자주 묻는 질문',
    faq1q: 'URL에서 Base64를 사용할 수 있나요?', faq1a: 'Base64url 변형(+를 -로, /를 _로 대체)을 사용하세요.',
    faq2q: '어떤 인코딩이 더 효율적인가요?', faq2a: '특수 문자가 적은 텍스트에는 URL 인코딩이 더 효율적입니다.',
    faq3q: 'Base64는 암호화 방법인가요?', faq3a: '아닙니다. Base64는 가역적 인코딩이며 암호화가 아닙니다.',
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

export default function Base64VsUrlEncoding() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ui.faq1q, acceptedAnswer: { '@type': 'Answer', text: ui.faq1a } },
      { '@type': 'Question', name: ui.faq2q, acceptedAnswer: { '@type': 'Answer', text: ui.faq2a } },
      { '@type': 'Question', name: ui.faq3q, acceptedAnswer: { '@type': 'Answer', text: ui.faq3a } },
    ],
  };

  return (
    <ToolLayout title={ui.title} description={ui.description} toolId="base64-vs-url-encoding">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={pStyle}>{ui.intro}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead><tr><th style={thStyle}>{ui.tableFeature}</th><th style={thStyle}>{ui.tableBase64}</th><th style={thStyle}>{ui.tableUrl}</th></tr></thead>
          <tbody>
            {[[ui.purpose,ui.purBase,ui.purUrl],[ui.charset,ui.charBase,ui.charUrl],[ui.sizeIncrease,ui.sizeBase,ui.sizeUrl],[ui.reversible,ui.revBase,ui.revUrl],[ui.useCase,ui.useBase,ui.useUrl]].map(([f,a,b],i)=>(
              <tr key={i}><td style={{...tdStyle,fontWeight:600}}>{f}</td><td style={tdStyle}>{a}</td><td style={tdStyle}>{b}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={sectionStyle}><h2 style={h2Style}>{ui.whatIsBase64}</h2><p style={pStyle}>{ui.base64Text}</p></div>
      <div style={sectionStyle}><h2 style={h2Style}>{ui.whatIsUrl}</h2><p style={pStyle}>{ui.urlText}</p></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16,...sectionStyle}}>
        <div style={cardStyle}><h3 style={h3Style}>{ui.whenBase64}</h3><ul style={ulStyle}><li>{ui.base64Use1}</li><li>{ui.base64Use2}</li><li>{ui.base64Use3}</li><li>{ui.base64Use4}</li><li>{ui.base64Use5}</li></ul></div>
        <div style={cardStyle}><h3 style={h3Style}>{ui.whenUrl}</h3><ul style={ulStyle}><li>{ui.urlUse1}</li><li>{ui.urlUse2}</li><li>{ui.urlUse3}</li><li>{ui.urlUse4}</li><li>{ui.urlUse5}</li></ul></div>
      </div>
      <div style={{...cardStyle,background:'var(--bg-input)',...sectionStyle}}><h2 style={h2Style}>{ui.verdict}</h2><p style={{...pStyle,fontWeight:500}}>{ui.verdictText}</p></div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>{ui.tryTools}</h2>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {[{href:`/${lang}/tools/base64`,label:'Base64 Encoder/Decoder'},{href:`/${lang}/tools/base64-encoder`,label:'Base64 Encoder'},{href:`/${lang}/tools/url-encoder`,label:'URL Encoder/Decoder'},{href:`/${lang}/tools/percent-encoding-tool`,label:'Percent Encoding Tool'}].map(link=>(
            <Link key={link.href} href={link.href} style={{display:'inline-block',padding:'8px 16px',borderRadius:8,border:'1px solid var(--border-color)',fontSize:13,color:'var(--accent-blue)',textDecoration:'none',background:'var(--bg-input)'}}>{link.label}</Link>
          ))}
        </div>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>{ui.faqTitle}</h2>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[{q:ui.faq1q,a:ui.faq1a},{q:ui.faq2q,a:ui.faq2a},{q:ui.faq3q,a:ui.faq3a}].map((faq,idx)=>(
            <details key={idx} style={{border:'1px solid var(--border-color)',borderRadius:8,overflow:'hidden',background:'var(--bg-input)'}}>
              <summary style={{padding:'14px 16px',cursor:'pointer',fontSize:14,fontWeight:600}}>{faq.q}</summary>
              <div style={{padding:'0 16px 14px',fontSize:13,lineHeight:1.7,color:'var(--text-secondary)'}}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
