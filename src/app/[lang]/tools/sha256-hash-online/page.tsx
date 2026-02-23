'use client';
import React, { useState } from 'react';

const t: Record<string, Record<string, string>> = {
  en: { title: 'SHA256 Hash Generator Online', subtitle: 'Generate SHA-256 Hashes Instantly — Free', inputLabel: 'Input Text', outputLabel: 'SHA-256 Hash', generateBtn: 'Generate SHA-256', copyBtn: 'Copy Hash', copied: 'Copied!', placeholder: 'Enter text to hash...', desc: 'SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a 256-bit (32-byte) hash value. It is widely used in digital signatures, certificates, and blockchain applications.', faq: 'FAQ', faq1q: 'Is SHA-256 reversible?', faq1a: 'No. SHA-256 is a one-way function — you cannot compute the original text from the hash. This property makes it useful for password hashing and data integrity verification.', faq2q: 'What is SHA-256 used for?', faq2a: 'SHA-256 is used in Bitcoin\'s proof-of-work, SSL/TLS certificates, code signing, file integrity checks (comparing checksums), and storing password hashes.', faq3q: 'Is SHA-256 still secure?', faq3a: 'Yes. SHA-256 has no known practical attacks. SHA-256 is recommended for most applications. SHA-512 provides additional security margin but SHA-256 is sufficient for virtually all use cases.', relatedTitle: 'Related Tools' },
  fr: { title: 'Générateur SHA256 en Ligne', subtitle: 'Générez des Hachages SHA-256 Instantanément — Gratuit', inputLabel: 'Texte d\'entrée', outputLabel: 'Hachage SHA-256', generateBtn: 'Générer SHA-256', copyBtn: 'Copier', copied: 'Copié!', placeholder: 'Entrez le texte à hacher...', desc: 'SHA-256 est une fonction de hachage cryptographique produisant une valeur de 256 bits.', faq: 'FAQ', faq1q: 'SHA-256 est-il réversible ?', faq1a: 'Non. SHA-256 est une fonction à sens unique — vous ne pouvez pas calculer le texte original à partir du hachage.', faq2q: 'À quoi sert SHA-256 ?', faq2a: 'SHA-256 est utilisé dans Bitcoin, les certificats SSL/TLS, la signature de code et la vérification d\'intégrité.', faq3q: 'SHA-256 est-il encore sécurisé ?', faq3a: 'Oui. SHA-256 n\'a pas d\'attaques pratiques connues.', relatedTitle: 'Outils associés' },
  de: { title: 'SHA256-Hash-Generator Online', subtitle: 'SHA-256-Hashes sofort generieren — Kostenlos', inputLabel: 'Eingabetext', outputLabel: 'SHA-256-Hash', generateBtn: 'SHA-256 generieren', copyBtn: 'Kopieren', copied: 'Kopiert!', placeholder: 'Zu hashenden Text eingeben...', desc: 'SHA-256 ist eine kryptographische Hash-Funktion, die einen 256-Bit-Hashwert erzeugt.', faq: 'FAQ', faq1q: 'Ist SHA-256 umkehrbar?', faq1a: 'Nein. SHA-256 ist eine Einwegfunktion — Sie können den Originaltext nicht aus dem Hash berechnen.', faq2q: 'Wofür wird SHA-256 verwendet?', faq2a: 'SHA-256 wird in Bitcoin, SSL/TLS-Zertifikaten, Code-Signierung und Integritätsprüfungen verwendet.', faq3q: 'Ist SHA-256 noch sicher?', faq3a: 'Ja. SHA-256 hat keine bekannten praktischen Angriffe.', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Generador SHA256 Online', subtitle: 'Genere Hashes SHA-256 Instantáneamente — Gratis', inputLabel: 'Texto de entrada', outputLabel: 'Hash SHA-256', generateBtn: 'Generar SHA-256', copyBtn: 'Copiar', copied: '¡Copiado!', placeholder: 'Ingrese el texto a hashear...', desc: 'SHA-256 es una función hash criptográfica que produce un valor hash de 256 bits.', faq: 'FAQ', faq1q: '¿SHA-256 es reversible?', faq1a: 'No. SHA-256 es una función unidireccional: no puede calcular el texto original a partir del hash.', faq2q: '¿Para qué se usa SHA-256?', faq2a: 'SHA-256 se usa en Bitcoin, certificados SSL/TLS, firma de código y verificación de integridad.', faq3q: '¿SHA-256 sigue siendo seguro?', faq3a: 'Sí. SHA-256 no tiene ataques prácticos conocidos.', relatedTitle: 'Herramientas relacionadas' },
  it: { title: 'Generatore SHA256 Online', subtitle: 'Genera Hash SHA-256 Istantaneamente — Gratis', inputLabel: 'Testo di input', outputLabel: 'Hash SHA-256', generateBtn: 'Genera SHA-256', copyBtn: 'Copia', copied: 'Copiato!', placeholder: 'Inserisci il testo da hashare...', desc: 'SHA-256 è una funzione hash crittografica che produce un valore hash di 256 bit.', faq: 'FAQ', faq1q: 'SHA-256 è reversibile?', faq1a: 'No. SHA-256 è una funzione unidirezionale — non puoi calcolare il testo originale dall\'hash.', faq2q: 'A cosa serve SHA-256?', faq2a: 'SHA-256 è usato in Bitcoin, certificati SSL/TLS, firma del codice e verifica dell\'integrità.', faq3q: 'SHA-256 è ancora sicuro?', faq3a: 'Sì. SHA-256 non ha attacchi pratici noti.', relatedTitle: 'Strumenti correlati' },
  pt: { title: 'Gerador SHA256 Online', subtitle: 'Gere Hashes SHA-256 Instantaneamente — Grátis', inputLabel: 'Texto de entrada', outputLabel: 'Hash SHA-256', generateBtn: 'Gerar SHA-256', copyBtn: 'Copiar', copied: 'Copiado!', placeholder: 'Digite o texto para hash...', desc: 'SHA-256 é uma função hash criptográfica que produz um valor hash de 256 bits.', faq: 'FAQ', faq1q: 'SHA-256 é reversível?', faq1a: 'Não. SHA-256 é uma função unidirecional — você não pode calcular o texto original a partir do hash.', faq2q: 'Para que é usado o SHA-256?', faq2a: 'SHA-256 é usado no Bitcoin, certificados SSL/TLS, assinatura de código e verificação de integridade.', faq3q: 'SHA-256 ainda é seguro?', faq3a: 'Sim. SHA-256 não tem ataques práticos conhecidos.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'SHA256 Hash Generator Online', subtitle: 'Genereer SHA-256 Hashes Onmiddellijk — Gratis', inputLabel: 'Invoertekst', outputLabel: 'SHA-256 Hash', generateBtn: 'SHA-256 genereren', copyBtn: 'Kopiëren', copied: 'Gekopieerd!', placeholder: 'Voer tekst in om te hashen...', desc: 'SHA-256 is een cryptografische hashfunctie die een 256-bit hashwaarde produceert.', faq: 'FAQ', faq1q: 'Is SHA-256 omkeerbaar?', faq1a: 'Nee. SHA-256 is een eenrichtingsfunctie — u kunt de originele tekst niet berekenen uit de hash.', faq2q: 'Waarvoor wordt SHA-256 gebruikt?', faq2a: 'SHA-256 wordt gebruikt in Bitcoin, SSL/TLS-certificaten, code-ondertekening en integriteitscontroles.', faq3q: 'Is SHA-256 nog veilig?', faq3a: 'Ja. SHA-256 heeft geen bekende praktische aanvallen.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Generator SHA256 Online', subtitle: 'Generuj Hashe SHA-256 Natychmiastowo — Bezpłatnie', inputLabel: 'Tekst wejściowy', outputLabel: 'Hash SHA-256', generateBtn: 'Generuj SHA-256', copyBtn: 'Kopiuj', copied: 'Skopiowano!', placeholder: 'Wprowadź tekst do zahashowania...', desc: 'SHA-256 to kryptograficzna funkcja skrótu produkująca 256-bitową wartość skrótu.', faq: 'FAQ', faq1q: 'Czy SHA-256 jest odwracalny?', faq1a: 'Nie. SHA-256 jest funkcją jednokierunkową — nie można obliczyć oryginalnego tekstu z hashu.', faq2q: 'Do czego służy SHA-256?', faq2a: 'SHA-256 jest używany w Bitcoin, certyfikatach SSL/TLS, podpisywaniu kodu i weryfikacji integralności.', faq3q: 'Czy SHA-256 jest nadal bezpieczny?', faq3a: 'Tak. SHA-256 nie ma znanych praktycznych ataków.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'SHA256 Hash Generator Online', subtitle: 'Generera SHA-256 Hashar Omedelbart — Gratis', inputLabel: 'Inmatningstext', outputLabel: 'SHA-256 Hash', generateBtn: 'Generera SHA-256', copyBtn: 'Kopiera', copied: 'Kopierat!', placeholder: 'Ange text att hasha...', desc: 'SHA-256 är en kryptografisk hashfunktion som producerar ett 256-bitars hashvärde.', faq: 'FAQ', faq1q: 'Är SHA-256 reversibel?', faq1a: 'Nej. SHA-256 är en envägsfunktion — du kan inte beräkna originaltexten från hashen.', faq2q: 'Vad används SHA-256 till?', faq2a: 'SHA-256 används i Bitcoin, SSL/TLS-certifikat, kodsignering och integritetskontroller.', faq3q: 'Är SHA-256 fortfarande säker?', faq3a: 'Ja. SHA-256 har inga kända praktiska attacker.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'SHA256 Hash Generator Online', subtitle: 'Generer SHA-256 Hasher Umiddelbart — Gratis', inputLabel: 'Inntekst', outputLabel: 'SHA-256 Hash', generateBtn: 'Generer SHA-256', copyBtn: 'Kopier', copied: 'Kopiert!', placeholder: 'Skriv inn tekst å hashe...', desc: 'SHA-256 er en kryptografisk hashfunksjon som produserer en 256-bit hashverdi.', faq: 'FAQ', faq1q: 'Er SHA-256 reversibel?', faq1a: 'Nei. SHA-256 er en enveisakfunksjon — du kan ikke beregne originalteksten fra hashen.', faq2q: 'Hva brukes SHA-256 til?', faq2a: 'SHA-256 brukes i Bitcoin, SSL/TLS-sertifikater, kodesignering og integritetskontroller.', faq3q: 'Er SHA-256 fortsatt sikker?', faq3a: 'Ja. SHA-256 har ingen kjente praktiske angrep.', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'SHA256哈希生成器在线', subtitle: '即时生成SHA-256哈希值 — 免费', inputLabel: '输入文本', outputLabel: 'SHA-256哈希值', generateBtn: '生成SHA-256', copyBtn: '复制', copied: '已复制！', placeholder: '输入要哈希的文本...', desc: 'SHA-256是一种加密哈希函数，产生256位哈希值，广泛用于数字签名、证书和区块链应用。', faq: '常见问题', faq1q: 'SHA-256可逆吗？', faq1a: '不可逆。SHA-256是单向函数，无法从哈希值计算出原始文本。', faq2q: 'SHA-256用于什么？', faq2a: 'SHA-256用于比特币工作证明、SSL/TLS证书、代码签名和文件完整性检查。', faq3q: 'SHA-256仍然安全吗？', faq3a: '是的。SHA-256没有已知的实际攻击手段。', relatedTitle: '相关工具' },
  ja: { title: 'SHA256ハッシュジェネレーターオンライン', subtitle: 'SHA-256ハッシュを瞬時に生成 — 無料', inputLabel: '入力テキスト', outputLabel: 'SHA-256ハッシュ', generateBtn: 'SHA-256を生成', copyBtn: 'コピー', copied: 'コピーしました！', placeholder: 'ハッシュするテキストを入力...', desc: 'SHA-256は256ビットのハッシュ値を生成する暗号化ハッシュ関数です。', faq: 'よくある質問', faq1q: 'SHA-256は可逆ですか？', faq1a: 'いいえ。SHA-256は一方向関数です。ハッシュから元のテキストを計算することはできません。', faq2q: 'SHA-256は何に使われますか？', faq2a: 'SHA-256はBitcoin、SSL/TLS証明書、コード署名、ファイル整合性チェックに使用されます。', faq3q: 'SHA-256はまだ安全ですか？', faq3a: 'はい。SHA-256には既知の実際的な攻撃はありません。', relatedTitle: '関連ツール' },
  ko: { title: 'SHA256 해시 생성기 온라인', subtitle: 'SHA-256 해시 즉시 생성 — 무료', inputLabel: '입력 텍스트', outputLabel: 'SHA-256 해시', generateBtn: 'SHA-256 생성', copyBtn: '복사', copied: '복사됨!', placeholder: '해시할 텍스트 입력...', desc: 'SHA-256은 256비트 해시 값을 생성하는 암호화 해시 함수입니다.', faq: 'FAQ', faq1q: 'SHA-256은 가역적인가요?', faq1a: '아니요. SHA-256은 단방향 함수입니다. 해시에서 원본 텍스트를 계산할 수 없습니다.', faq2q: 'SHA-256은 어디에 사용되나요?', faq2a: 'SHA-256은 Bitcoin, SSL/TLS 인증서, 코드 서명, 파일 무결성 검사에 사용됩니다.', faq3q: 'SHA-256은 여전히 안전한가요?', faq3a: '예. SHA-256에는 알려진 실질적인 공격이 없습니다.', relatedTitle: '관련 도구' },
  id: { title: 'Generator SHA256 Online', subtitle: 'Hasilkan Hash SHA-256 Secara Instan — Gratis', inputLabel: 'Teks input', outputLabel: 'Hash SHA-256', generateBtn: 'Hasilkan SHA-256', copyBtn: 'Salin', copied: 'Disalin!', placeholder: 'Masukkan teks untuk di-hash...', desc: 'SHA-256 adalah fungsi hash kriptografi yang menghasilkan nilai hash 256-bit.', faq: 'FAQ', faq1q: 'Apakah SHA-256 dapat dibalik?', faq1a: 'Tidak. SHA-256 adalah fungsi satu arah — Anda tidak dapat menghitung teks asli dari hash.', faq2q: 'Untuk apa SHA-256 digunakan?', faq2a: 'SHA-256 digunakan dalam Bitcoin, sertifikat SSL/TLS, penandatanganan kode, dan pemeriksaan integritas.', faq3q: 'Apakah SHA-256 masih aman?', faq3a: 'Ya. SHA-256 tidak memiliki serangan praktis yang diketahui.', relatedTitle: 'Alat terkait' },
  th: { title: 'SHA256 Hash Generator ออนไลน์', subtitle: 'สร้าง SHA-256 Hash ทันที — ฟรี', inputLabel: 'ข้อความนำเข้า', outputLabel: 'SHA-256 Hash', generateBtn: 'สร้าง SHA-256', copyBtn: 'คัดลอก', copied: 'คัดลอกแล้ว!', placeholder: 'ป้อนข้อความที่จะ hash...', desc: 'SHA-256 เป็นฟังก์ชัน hash แบบเข้ารหัสที่ผลิตค่า hash 256 บิต', faq: 'คำถามที่พบบ่อย', faq1q: 'SHA-256 กลับได้หรือไม่?', faq1a: 'ไม่ SHA-256 เป็นฟังก์ชันทางเดียว คุณไม่สามารถคำนวณข้อความต้นฉบับจาก hash ได้', faq2q: 'SHA-256 ใช้สำหรับอะไร?', faq2a: 'SHA-256 ใช้ใน Bitcoin, ใบรับรอง SSL/TLS, การลงนามโค้ด และการตรวจสอบความสมบูรณ์', faq3q: 'SHA-256 ยังปลอดภัยอยู่ไหม?', faq3a: 'ใช่ SHA-256 ไม่มีการโจมตีที่รู้จักในทางปฏิบัติ', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function Sha256HashOnlinePage({ params }: { params: { lang: string } }) {
  const lang = params?.lang || 'en';
  const tr = t[lang] || t.en;
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateHash = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
    } catch {
      setHash('Error generating hash');
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    if (!hash) return;
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{tr.title}</h1>
      <p className="text-blue-600 font-medium mb-6">{tr.subtitle}</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{tr.inputLabel}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tr.placeholder}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={generateHash}
          disabled={!input || loading}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '⏳ Computing...' : tr.generateBtn}
        </button>

        {hash && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">{tr.outputLabel}</label>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {copied ? tr.copied : tr.copyBtn}
              </button>
            </div>
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm break-all">
              {hash}
            </div>
            <p className="text-xs text-gray-500 mt-1">Length: {hash.length} characters = 256 bits = 32 bytes</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <p className="text-gray-700 text-sm leading-relaxed">{tr.desc}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">SHA-256 Properties</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Output Size', value: '256 bits' },
            { label: 'Block Size', value: '512 bits' },
            { label: 'Hex Length', value: '64 chars' },
            { label: 'Standard', value: 'FIPS 180-4' },
          ].map((prop) => (
            <div key={prop.label} className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">{prop.label}</div>
              <div className="font-bold text-gray-900">{prop.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{tr.faq}</h2>
        <div className="space-y-4">
          {[
            { q: tr.faq1q, a: tr.faq1a },
            { q: tr.faq2q, a: tr.faq2a },
            { q: tr.faq3q, a: tr.faq3a },
          ].map((item, i) => (
            <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-600 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.relatedTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: `/${lang}/tools/hash-generator`, label: 'MD5 Generator' },
            { href: `/${lang}/tools/bcrypt-generator`, label: 'Bcrypt Generator' },
            { href: `/${lang}/tools/base64-encode`, label: 'Base64 Encoder' },
            { href: `/${lang}/tools/hmac-generator`, label: 'HMAC Generator' },
            { href: `/${lang}/tools/uuid-generator`, label: 'UUID Generator' },
            { href: `/${lang}/tools/password-generator`, label: 'Password Generator' },
          ].map((link) => (
            <a key={link.href} href={link.href} className="text-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 text-sm font-medium text-gray-700 transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
