'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Base64 Encoder Decoder', description: 'Encode text to Base64 or decode Base64 back to text instantly. Supports UTF-8 characters, emojis, and binary data.',
    inputLabel: 'Input', outputLabel: 'Output', encode: 'Encode', decode: 'Decode', clear: 'Clear', swap: 'Swap',
    inputPlaceholder: 'Enter text to encode or Base64 to decode...',
    intro: 'Base64 is a binary-to-text encoding scheme that converts binary data into a safe ASCII string. This free online Base64 encoder decoder handles both encoding and decoding in your browser with zero data transmission to any server.',
    faq1q: 'What is Base64 encoding used for?', faq1a: 'Base64 encoding is used for embedding images in HTML/CSS (data URIs), encoding email attachments (MIME), transmitting binary data in JSON/XML APIs, HTTP Basic Authentication headers, and storing binary data in text-only databases.',
    faq2q: 'How do I encode text to Base64?', faq2a: 'Paste your text in the input field and click the Encode button. The Base64-encoded result appears instantly. This tool handles UTF-8 characters including emojis and international text.',
    faq3q: 'How do I decode Base64 to text?', faq3a: 'Paste Base64-encoded text in the input field and click the Decode button. The original text is restored instantly. Invalid Base64 strings will show an error message.',
    faq4q: 'Is Base64 encryption?', faq4a: 'No, Base64 is an encoding scheme, not encryption. It does not provide security or confidentiality. Anyone can decode Base64 text. For security, use proper encryption algorithms like AES or RSA.',
    relatedTools: 'Related Tools', errorMsg: 'Error processing input. Please check your text.',
  },
  zh: {
    title: 'Base64 编码解码器', description: '即时将文本编码为 Base64 或将 Base64 解码为文本。支持 UTF-8 字符和表情符号。',
    inputLabel: '输入', outputLabel: '输出', encode: '编码', decode: '解码', clear: '清除', swap: '交换',
    inputPlaceholder: '输入要编码的文本或要解码的 Base64...',
    intro: 'Base64 是一种将二进制数据转换为安全 ASCII 字符串的编码方案。此免费在线 Base64 编码解码器在浏览器中处理编码和解码，不会向任何服务器传输数据。',
    faq1q: 'Base64 编码用于什么？', faq1a: 'Base64 编码用于在 HTML/CSS 中嵌入图片、编码电子邮件附件、在 JSON/XML API 中传输二进制数据等。',
    faq2q: '如何将文本编码为 Base64？', faq2a: '在输入框中粘贴文本，点击编码按钮。结果会立即显示。',
    faq3q: '如何将 Base64 解码为文本？', faq3a: '在输入框中粘贴 Base64 编码文本，点击解码按钮即可还原原始文本。',
    faq4q: 'Base64 是加密吗？', faq4a: '不是，Base64 是编码方案，不是加密。它不提供安全性。任何人都可以解码 Base64 文本。',
    relatedTools: '相关工具', errorMsg: '处理输入时出错。请检查您的文本。',
  },
  ja: { title: 'Base64 エンコーダーデコーダー', description: 'テキストをBase64にエンコードまたはBase64からデコード。', inputLabel: '入力', outputLabel: '出力', encode: 'エンコード', decode: 'デコード', clear: 'クリア', swap: '入れ替え', inputPlaceholder: 'テキストまたはBase64を入力...', intro: 'Base64はバイナリデータをASCII文字列に変換するエンコーディングです。', faq1q: 'Base64エンコーディングの用途は？', faq1a: 'データURI、メール添付ファイル、API通信などに使用されます。', faq2q: 'テキストをBase64にエンコードする方法は？', faq2a: '入力フィールドにテキストを貼り付けてエンコードボタンをクリックします。', faq3q: 'Base64をテキストにデコードする方法は？', faq3a: 'Base64テキストを入力してデコードボタンをクリックします。', faq4q: 'Base64は暗号化ですか？', faq4a: 'いいえ、エンコーディングであり暗号化ではありません。', relatedTools: '関連ツール', errorMsg: 'エラーが発生しました。' },
  ko: { title: 'Base64 인코더 디코더', description: '텍스트를 Base64로 인코딩하거나 Base64를 텍스트로 디코딩합니다.', inputLabel: '입력', outputLabel: '출력', encode: '인코딩', decode: '디코딩', clear: '지우기', swap: '교환', inputPlaceholder: '텍스트 또는 Base64를 입력하세요...', intro: 'Base64는 바이너리 데이터를 ASCII 문자열로 변환하는 인코딩 방식입니다.', faq1q: 'Base64 인코딩의 용도는?', faq1a: '데이터 URI, 이메일 첨부, API 전송 등에 사용됩니다.', faq2q: '텍스트를 Base64로 인코딩하는 방법은?', faq2a: '입력 필드에 텍스트를 붙여넣고 인코딩 버튼을 클릭하세요.', faq3q: 'Base64를 텍스트로 디코딩하는 방법은?', faq3a: 'Base64 텍스트를 입력하고 디코딩 버튼을 클릭하세요.', faq4q: 'Base64는 암호화인가요?', faq4a: '아니요, 인코딩 방식이며 암호화가 아닙니다.', relatedTools: '관련 도구', errorMsg: '오류가 발생했습니다.' },
  fr: { title: 'Encodeur Decodeur Base64', description: 'Encodez et decodez du Base64 en ligne.', inputLabel: 'Entree', outputLabel: 'Sortie', encode: 'Encoder', decode: 'Decoder', clear: 'Effacer', swap: 'Echanger', inputPlaceholder: 'Entrez le texte ou le Base64...', intro: 'Base64 est un schema d\'encodage binaire-vers-texte.', faq1q: 'A quoi sert l\'encodage Base64 ?', faq1a: 'Pour les URI de donnees, les pieces jointes email, les API JSON/XML.', faq2q: 'Comment encoder en Base64 ?', faq2a: 'Collez le texte et cliquez sur Encoder.', faq3q: 'Comment decoder du Base64 ?', faq3a: 'Collez le Base64 et cliquez sur Decoder.', faq4q: 'Base64 est-il du chiffrement ?', faq4a: 'Non, c\'est un encodage, pas du chiffrement.', relatedTools: 'Outils associes', errorMsg: 'Erreur de traitement.' },
  de: { title: 'Base64 Encoder Decoder', description: 'Text zu Base64 kodieren oder Base64 zu Text dekodieren.', inputLabel: 'Eingabe', outputLabel: 'Ausgabe', encode: 'Kodieren', decode: 'Dekodieren', clear: 'Loeschen', swap: 'Tauschen', inputPlaceholder: 'Text oder Base64 eingeben...', intro: 'Base64 ist ein Binaer-zu-Text-Kodierungsschema.', faq1q: 'Wofuer wird Base64 verwendet?', faq1a: 'Fuer Daten-URIs, E-Mail-Anhaenge, JSON/XML APIs.', faq2q: 'Wie kodiere ich zu Base64?', faq2a: 'Text einfuegen und Kodieren klicken.', faq3q: 'Wie dekodiere ich Base64?', faq3a: 'Base64 einfuegen und Dekodieren klicken.', faq4q: 'Ist Base64 Verschluesselung?', faq4a: 'Nein, es ist eine Kodierung, keine Verschluesselung.', relatedTools: 'Verwandte Tools', errorMsg: 'Verarbeitungsfehler.' },
  es: { title: 'Codificador Decodificador Base64', description: 'Codifica y decodifica Base64 en linea.', inputLabel: 'Entrada', outputLabel: 'Salida', encode: 'Codificar', decode: 'Decodificar', clear: 'Limpiar', swap: 'Intercambiar', inputPlaceholder: 'Introduce texto o Base64...', intro: 'Base64 es un esquema de codificacion binario a texto.', faq1q: 'Para que se usa Base64?', faq1a: 'Para URIs de datos, adjuntos de email, APIs JSON/XML.', faq2q: 'Como codificar a Base64?', faq2a: 'Pega el texto y haz clic en Codificar.', faq3q: 'Como decodificar Base64?', faq3a: 'Pega el Base64 y haz clic en Decodificar.', faq4q: 'Es Base64 cifrado?', faq4a: 'No, es codificacion, no cifrado.', relatedTools: 'Herramientas relacionadas', errorMsg: 'Error de procesamiento.' },
  pt: { title: 'Codificador Decodificador Base64', description: 'Codifique e decodifique Base64 online.', inputLabel: 'Entrada', outputLabel: 'Saida', encode: 'Codificar', decode: 'Decodificar', clear: 'Limpar', swap: 'Trocar', inputPlaceholder: 'Digite texto ou Base64...', intro: 'Base64 e um esquema de codificacao binario para texto.', faq1q: 'Para que serve Base64?', faq1a: 'Para URIs de dados, anexos de email, APIs JSON/XML.', faq2q: 'Como codificar em Base64?', faq2a: 'Cole o texto e clique em Codificar.', faq3q: 'Como decodificar Base64?', faq3a: 'Cole o Base64 e clique em Decodificar.', faq4q: 'Base64 e criptografia?', faq4a: 'Nao, e codificacao, nao criptografia.', relatedTools: 'Ferramentas relacionadas', errorMsg: 'Erro de processamento.' },
  it: { title: 'Encoder Decoder Base64', description: 'Codifica e decodifica Base64 online.', inputLabel: 'Input', outputLabel: 'Output', encode: 'Codifica', decode: 'Decodifica', clear: 'Cancella', swap: 'Scambia', inputPlaceholder: 'Inserisci testo o Base64...', intro: 'Base64 e uno schema di codifica da binario a testo.', faq1q: 'A cosa serve Base64?', faq1a: 'Per URI dati, allegati email, API JSON/XML.', faq2q: 'Come codificare in Base64?', faq2a: 'Incolla il testo e clicca Codifica.', faq3q: 'Come decodificare Base64?', faq3a: 'Incolla il Base64 e clicca Decodifica.', faq4q: 'Base64 e crittografia?', faq4a: 'No, e codifica, non crittografia.', relatedTools: 'Strumenti correlati', errorMsg: 'Errore di elaborazione.' },
  nl: { title: 'Base64 Encoder Decoder', description: 'Codeer en decodeer Base64 online.', inputLabel: 'Invoer', outputLabel: 'Uitvoer', encode: 'Coderen', decode: 'Decoderen', clear: 'Wissen', swap: 'Wisselen', inputPlaceholder: 'Voer tekst of Base64 in...', intro: 'Base64 is een binair-naar-tekst codeerschema.', faq1q: 'Waarvoor wordt Base64 gebruikt?', faq1a: 'Voor data-URIs, e-mailbijlagen, JSON/XML APIs.', faq2q: 'Hoe codeer ik naar Base64?', faq2a: 'Plak tekst en klik Coderen.', faq3q: 'Hoe decodeer ik Base64?', faq3a: 'Plak Base64 en klik Decoderen.', faq4q: 'Is Base64 versleuteling?', faq4a: 'Nee, het is codering, geen versleuteling.', relatedTools: 'Gerelateerde tools', errorMsg: 'Verwerkingsfout.' },
  pl: { title: 'Enkoder Dekoder Base64', description: 'Koduj i dekoduj Base64 online.', inputLabel: 'Wejscie', outputLabel: 'Wyjscie', encode: 'Koduj', decode: 'Dekoduj', clear: 'Wyczysc', swap: 'Zamien', inputPlaceholder: 'Wprowadz tekst lub Base64...', intro: 'Base64 to schemat kodowania binarnego na tekst.', faq1q: 'Do czego sluzy Base64?', faq1a: 'Do URI danych, zalacznikow email, API JSON/XML.', faq2q: 'Jak zakodowac do Base64?', faq2a: 'Wklej tekst i kliknij Koduj.', faq3q: 'Jak odkodowac Base64?', faq3a: 'Wklej Base64 i kliknij Dekoduj.', faq4q: 'Czy Base64 to szyfrowanie?', faq4a: 'Nie, to kodowanie, nie szyfrowanie.', relatedTools: 'Powiazane narzedzia', errorMsg: 'Blad przetwarzania.' },
  sv: { title: 'Base64 Encoder Decoder', description: 'Koda och avkoda Base64 online.', inputLabel: 'Indata', outputLabel: 'Utdata', encode: 'Koda', decode: 'Avkoda', clear: 'Rensa', swap: 'Byt', inputPlaceholder: 'Ange text eller Base64...', intro: 'Base64 ar ett binar-till-text kodningsschema.', faq1q: 'Vad anvands Base64 till?', faq1a: 'For data-URIer, e-postbilagor, JSON/XML APIer.', faq2q: 'Hur kodar jag till Base64?', faq2a: 'Klistra in text och klicka Koda.', faq3q: 'Hur avkodar jag Base64?', faq3a: 'Klistra in Base64 och klicka Avkoda.', faq4q: 'Ar Base64 kryptering?', faq4a: 'Nej, det ar kodning, inte kryptering.', relatedTools: 'Relaterade verktyg', errorMsg: 'Bearbetningsfel.' },
  no: { title: 'Base64 Encoder Decoder', description: 'Kod og dekod Base64 online.', inputLabel: 'Inndata', outputLabel: 'Utdata', encode: 'Kod', decode: 'Dekod', clear: 'Slett', swap: 'Bytt', inputPlaceholder: 'Skriv inn tekst eller Base64...', intro: 'Base64 er et binaer-til-tekst kodingsskjema.', faq1q: 'Hva brukes Base64 til?', faq1a: 'For data-URIer, e-postvedlegg, JSON/XML APIer.', faq2q: 'Hvordan koder jeg til Base64?', faq2a: 'Lim inn tekst og klikk Kod.', faq3q: 'Hvordan dekoder jeg Base64?', faq3a: 'Lim inn Base64 og klikk Dekod.', faq4q: 'Er Base64 kryptering?', faq4a: 'Nei, det er koding, ikke kryptering.', relatedTools: 'Relaterte verktoy', errorMsg: 'Behandlingsfeil.' },
  id: { title: 'Base64 Encoder Decoder', description: 'Encode dan decode Base64 online.', inputLabel: 'Input', outputLabel: 'Output', encode: 'Encode', decode: 'Decode', clear: 'Hapus', swap: 'Tukar', inputPlaceholder: 'Masukkan teks atau Base64...', intro: 'Base64 adalah skema encoding biner ke teks.', faq1q: 'Untuk apa Base64 digunakan?', faq1a: 'Untuk data URI, lampiran email, API JSON/XML.', faq2q: 'Bagaimana cara encode ke Base64?', faq2a: 'Tempel teks dan klik Encode.', faq3q: 'Bagaimana cara decode Base64?', faq3a: 'Tempel Base64 dan klik Decode.', faq4q: 'Apakah Base64 enkripsi?', faq4a: 'Tidak, ini encoding, bukan enkripsi.', relatedTools: 'Alat terkait', errorMsg: 'Error pemrosesan.' },
  th: { title: 'Base64 Encoder Decoder', description: 'เข้ารหัสและถอดรหัส Base64 ออนไลน์', inputLabel: 'อินพุต', outputLabel: 'เอาต์พุต', encode: 'เข้ารหัส', decode: 'ถอดรหัส', clear: 'ล้าง', swap: 'สลับ', inputPlaceholder: 'ป้อนข้อความหรือ Base64...', intro: 'Base64 เป็นรูปแบบการเข้ารหัสไบนารีเป็นข้อความ', faq1q: 'Base64 ใช้ทำอะไร?', faq1a: 'สำหรับ data URI, ไฟล์แนบอีเมล, JSON/XML API', faq2q: 'วิธีเข้ารหัสเป็น Base64?', faq2a: 'วางข้อความแล้วคลิกเข้ารหัส', faq3q: 'วิธีถอดรหัส Base64?', faq3a: 'วาง Base64 แล้วคลิกถอดรหัส', faq4q: 'Base64 เป็นการเข้ารหัสลับหรือไม่?', faq4a: 'ไม่ เป็นการเข้ารหัส ไม่ใช่การเข้ารหัสลับ', relatedTools: 'เครื่องมือที่เกี่ยวข้อง', errorMsg: 'ข้อผิดพลาด' },
};

export default function Base64EncoderDecoder() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = useCallback(() => {
    try {
      setError('');
      if (!input) { setOutput(''); return; }
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch { setError(t.errorMsg); setOutput(''); }
  }, [input, t.errorMsg]);

  const handleDecode = useCallback(() => {
    try {
      setError('');
      if (!input) { setOutput(''); return; }
      setOutput(decodeURIComponent(escape(atob(input.replace(/\s/g, '')))));
    } catch { setError(t.errorMsg); setOutput(''); }
  }, [input, t.errorMsg]);

  const handleSwap = () => { setInput(output); setOutput(''); setError(''); };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="base64-encoder-decoder">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.intro}</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleEncode} className="btn btn-primary">{t.encode}</button>
        <button onClick={handleDecode} className="btn btn-primary">{t.decode}</button>
        <button onClick={handleSwap} className="btn btn-secondary">{t.swap}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>
      {error && <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 250 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly style={{ minHeight: 250, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{t.relatedTools}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/base64`, label: 'Base64 Tool' },
            { href: `/${lang}/tools/base64-encoder`, label: 'Base64 Encoder' },
            { href: `/${lang}/tools/base64-decoder`, label: 'Base64 Decoder' },
            { href: `/${lang}/tools/base64-to-hex`, label: 'Base64 to Hex' },
            { href: `/${lang}/tools/url-encode-decode`, label: 'URL Encode/Decode' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ fontSize: 12, color: 'var(--accent-blue)', textDecoration: 'none', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
