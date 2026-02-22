'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'URL Encode Decode', description: 'Encode or decode URL strings online. Handles special characters, spaces, Unicode, and query parameters using percent-encoding.',
    inputLabel: 'Input', outputLabel: 'Output', encode: 'Encode', decode: 'Decode', clear: 'Clear', swap: 'Swap',
    encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI',
    placeholder: 'Enter URL or text to encode/decode...',
    intro: 'URL encoding (percent-encoding) replaces unsafe characters in URLs with a % sign followed by two hexadecimal digits. Spaces become %20, ampersands become %26, and Unicode characters are encoded as UTF-8 byte sequences. This tool supports both encodeURIComponent (for query parameters) and encodeURI (for full URLs).',
    faq1q: 'What is URL encoding?', faq1a: 'URL encoding (percent-encoding) converts characters that are not allowed in URLs into a format using % followed by hex digits. For example, a space becomes %20, & becomes %26, and non-ASCII characters like accented letters are encoded as UTF-8 byte sequences.',
    faq2q: 'What is the difference between encodeURI and encodeURIComponent?', faq2a: 'encodeURI encodes a full URI but preserves characters like :, /, ?, #, and & that have special meaning in URLs. encodeURIComponent encodes everything including those special characters, making it suitable for encoding individual query parameter values.',
    faq3q: 'When should I URL encode?', faq3a: 'URL encode when passing special characters in query string parameters, embedding URLs within other URLs, handling user input in URL paths, or transmitting data that contains characters with special meaning in URLs such as &, =, ?, #, spaces, and non-ASCII characters.',
    relatedTools: 'Related Tools', errorMsg: 'Error processing input.',
  },
  zh: { title: 'URL 编码解码', description: '在线编码或解码 URL 字符串。', inputLabel: '输入', outputLabel: '输出', encode: '编码', decode: '解码', clear: '清除', swap: '交换', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: '输入 URL 或文本...', intro: 'URL 编码将 URL 中不安全的字符替换为百分号编码。', faq1q: '什么是 URL 编码？', faq1a: 'URL 编码将不允许的字符转换为 % 加十六进制数字的格式。', faq2q: 'encodeURI 和 encodeURIComponent 的区别？', faq2a: 'encodeURI 编码完整 URI 但保留特殊字符。encodeURIComponent 编码所有内容。', faq3q: '什么时候需要 URL 编码？', faq3a: '在查询参数中传递特殊字符、处理用户输入或传输包含特殊字符的数据时。', relatedTools: '相关工具', errorMsg: '处理错误。' },
  ja: { title: 'URL エンコード デコード', description: 'URL 文字列をオンラインでエンコード・デコード。', inputLabel: '入力', outputLabel: '出力', encode: 'エンコード', decode: 'デコード', clear: 'クリア', swap: '入れ替え', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'URL またはテキストを入力...', intro: 'URL エンコーディングは安全でない文字をパーセントエンコーディングに変換します。', faq1q: 'URL エンコーディングとは？', faq1a: 'URL で許可されていない文字を %+16進数の形式に変換します。', faq2q: 'encodeURI と encodeURIComponent の違いは？', faq2a: 'encodeURI は完全な URI をエンコードしますが特殊文字を保持します。', faq3q: 'いつ URL エンコードが必要？', faq3a: 'クエリパラメータに特殊文字を渡す時やユーザー入力を処理する時。', relatedTools: '関連ツール', errorMsg: '処理エラー。' },
  ko: { title: 'URL 인코딩 디코딩', description: 'URL 문자열을 온라인으로 인코딩하거나 디코딩합니다.', inputLabel: '입력', outputLabel: '출력', encode: '인코딩', decode: '디코딩', clear: '지우기', swap: '교환', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'URL 또는 텍스트를 입력하세요...', intro: 'URL 인코딩은 URL에서 안전하지 않은 문자를 퍼센트 인코딩으로 변환합니다.', faq1q: 'URL 인코딩이란?', faq1a: 'URL에서 허용되지 않는 문자를 %+16진수 형식으로 변환합니다.', faq2q: 'encodeURI와 encodeURIComponent의 차이?', faq2a: 'encodeURI는 전체 URI를 인코딩하지만 특수 문자를 유지합니다.', faq3q: '언제 URL 인코딩이 필요한가요?', faq3a: '쿼리 매개변수에 특수 문자를 전달하거나 사용자 입력을 처리할 때.', relatedTools: '관련 도구', errorMsg: '처리 오류.' },
  fr: { title: 'URL Encode Decode', description: 'Encodez ou decodez des chaines URL en ligne.', inputLabel: 'Entree', outputLabel: 'Sortie', encode: 'Encoder', decode: 'Decoder', clear: 'Effacer', swap: 'Echanger', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'Entrez l\'URL ou le texte...', intro: 'L\'encodage URL remplace les caracteres non surs par un encodage en pourcentage.', faq1q: 'Qu\'est-ce que l\'encodage URL ?', faq1a: 'Convertit les caracteres non autorises en format %+hexadecimal.', faq2q: 'Difference encodeURI et encodeURIComponent ?', faq2a: 'encodeURI preserve les caracteres speciaux d\'URL, pas encodeURIComponent.', faq3q: 'Quand encoder les URL ?', faq3a: 'Pour les parametres de requete et l\'entree utilisateur.', relatedTools: 'Outils associes', errorMsg: 'Erreur de traitement.' },
  de: { title: 'URL Encode Decode', description: 'URL-Strings online kodieren oder dekodieren.', inputLabel: 'Eingabe', outputLabel: 'Ausgabe', encode: 'Kodieren', decode: 'Dekodieren', clear: 'Loeschen', swap: 'Tauschen', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'URL oder Text eingeben...', intro: 'URL-Kodierung ersetzt unsichere Zeichen durch Prozentkodierung.', faq1q: 'Was ist URL-Kodierung?', faq1a: 'Konvertiert nicht erlaubte Zeichen in %+Hexadezimal-Format.', faq2q: 'Unterschied encodeURI und encodeURIComponent?', faq2a: 'encodeURI bewahrt spezielle URL-Zeichen, encodeURIComponent nicht.', faq3q: 'Wann URL kodieren?', faq3a: 'Bei Query-Parametern und Benutzereingaben.', relatedTools: 'Verwandte Tools', errorMsg: 'Verarbeitungsfehler.' },
  es: { title: 'URL Encode Decode', description: 'Codifica o decodifica cadenas URL en linea.', inputLabel: 'Entrada', outputLabel: 'Salida', encode: 'Codificar', decode: 'Decodificar', clear: 'Limpiar', swap: 'Intercambiar', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'Introduce URL o texto...', intro: 'La codificacion URL reemplaza caracteres inseguros con codificacion porcentual.', faq1q: 'Que es la codificacion URL?', faq1a: 'Convierte caracteres no permitidos en formato %+hexadecimal.', faq2q: 'Diferencia encodeURI y encodeURIComponent?', faq2a: 'encodeURI preserva caracteres especiales de URL, encodeURIComponent no.', faq3q: 'Cuando codificar URLs?', faq3a: 'Para parametros de consulta y entrada de usuario.', relatedTools: 'Herramientas relacionadas', errorMsg: 'Error de procesamiento.' },
  pt: { title: 'URL Encode Decode', description: 'Codifique ou decodifique strings URL online.', inputLabel: 'Entrada', outputLabel: 'Saida', encode: 'Codificar', decode: 'Decodificar', clear: 'Limpar', swap: 'Trocar', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'Digite URL ou texto...', intro: 'A codificacao URL substitui caracteres inseguros por codificacao percentual.', faq1q: 'O que e codificacao URL?', faq1a: 'Converte caracteres nao permitidos em formato %+hexadecimal.', faq2q: 'Diferenca encodeURI e encodeURIComponent?', faq2a: 'encodeURI preserva caracteres especiais de URL, encodeURIComponent nao.', faq3q: 'Quando codificar URLs?', faq3a: 'Para parametros de consulta e entrada do usuario.', relatedTools: 'Ferramentas relacionadas', errorMsg: 'Erro de processamento.' },
  it: { title: 'URL Encode Decode', description: 'Codifica o decodifica stringhe URL online.', inputLabel: 'Input', outputLabel: 'Output', encode: 'Codifica', decode: 'Decodifica', clear: 'Cancella', swap: 'Scambia', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'Inserisci URL o testo...', intro: 'La codifica URL sostituisce i caratteri non sicuri con la codifica percentuale.', faq1q: 'Cos\'e la codifica URL?', faq1a: 'Converte i caratteri non consentiti in formato %+esadecimale.', faq2q: 'Differenza encodeURI e encodeURIComponent?', faq2a: 'encodeURI preserva i caratteri speciali URL, encodeURIComponent no.', faq3q: 'Quando codificare URL?', faq3a: 'Per parametri query e input utente.', relatedTools: 'Strumenti correlati', errorMsg: 'Errore di elaborazione.' },
  nl: { title: 'URL Encode Decode', description: 'Codeer of decodeer URL-strings online.', inputLabel: 'Invoer', outputLabel: 'Uitvoer', encode: 'Coderen', decode: 'Decoderen', clear: 'Wissen', swap: 'Wisselen', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'Voer URL of tekst in...', intro: 'URL-codering vervangt onveilige tekens door procentcodering.', faq1q: 'Wat is URL-codering?', faq1a: 'Converteert niet-toegestane tekens naar %+hexadecimaal formaat.', faq2q: 'Verschil encodeURI en encodeURIComponent?', faq2a: 'encodeURI behoudt speciale URL-tekens, encodeURIComponent niet.', faq3q: 'Wanneer URL coderen?', faq3a: 'Voor queryparameters en gebruikersinvoer.', relatedTools: 'Gerelateerde tools', errorMsg: 'Verwerkingsfout.' },
  pl: { title: 'URL Encode Decode', description: 'Koduj lub dekoduj ciagi URL online.', inputLabel: 'Wejscie', outputLabel: 'Wyjscie', encode: 'Koduj', decode: 'Dekoduj', clear: 'Wyczysc', swap: 'Zamien', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'Wprowadz URL lub tekst...', intro: 'Kodowanie URL zastepuje niebezpieczne znaki kodowaniem procentowym.', faq1q: 'Co to kodowanie URL?', faq1a: 'Konwertuje niedozwolone znaki na format %+szesnastkowy.', faq2q: 'Roznica encodeURI i encodeURIComponent?', faq2a: 'encodeURI zachowuje specjalne znaki URL, encodeURIComponent nie.', faq3q: 'Kiedy kodowac URL?', faq3a: 'Dla parametrow zapytania i danych uzytkownika.', relatedTools: 'Powiazane narzedzia', errorMsg: 'Blad przetwarzania.' },
  sv: { title: 'URL Encode Decode', description: 'Koda eller avkoda URL-strangar online.', inputLabel: 'Indata', outputLabel: 'Utdata', encode: 'Koda', decode: 'Avkoda', clear: 'Rensa', swap: 'Byt', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'Ange URL eller text...', intro: 'URL-kodning ersatter osakra tecken med procentkodning.', faq1q: 'Vad ar URL-kodning?', faq1a: 'Konverterar otilllatna tecken till %+hexadecimalt format.', faq2q: 'Skillnad encodeURI och encodeURIComponent?', faq2a: 'encodeURI bevarar speciella URL-tecken, encodeURIComponent gor det inte.', faq3q: 'Nar URL-koda?', faq3a: 'For frageparametrar och anvandarinmatning.', relatedTools: 'Relaterade verktyg', errorMsg: 'Bearbetningsfel.' },
  no: { title: 'URL Encode Decode', description: 'Kod eller dekod URL-strenger online.', inputLabel: 'Inndata', outputLabel: 'Utdata', encode: 'Kod', decode: 'Dekod', clear: 'Slett', swap: 'Bytt', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'Skriv inn URL eller tekst...', intro: 'URL-koding erstatter usikre tegn med prosentkoding.', faq1q: 'Hva er URL-koding?', faq1a: 'Konverterer ikke-tillatte tegn til %+heksadesimalt format.', faq2q: 'Forskjell encodeURI og encodeURIComponent?', faq2a: 'encodeURI bevarer spesielle URL-tegn, encodeURIComponent gjoer det ikke.', faq3q: 'Naar URL-kode?', faq3a: 'For spoeringsparametere og brukerinndata.', relatedTools: 'Relaterte verktoy', errorMsg: 'Behandlingsfeil.' },
  id: { title: 'URL Encode Decode', description: 'Encode atau decode string URL online.', inputLabel: 'Input', outputLabel: 'Output', encode: 'Encode', decode: 'Decode', clear: 'Hapus', swap: 'Tukar', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'Masukkan URL atau teks...', intro: 'URL encoding mengganti karakter tidak aman dengan persen encoding.', faq1q: 'Apa itu URL encoding?', faq1a: 'Mengubah karakter tidak diizinkan ke format %+heksadesimal.', faq2q: 'Perbedaan encodeURI dan encodeURIComponent?', faq2a: 'encodeURI mempertahankan karakter khusus URL, encodeURIComponent tidak.', faq3q: 'Kapan URL encode?', faq3a: 'Untuk parameter query dan input pengguna.', relatedTools: 'Alat terkait', errorMsg: 'Error pemrosesan.' },
  th: { title: 'URL Encode Decode', description: 'เข้ารหัสหรือถอดรหัสสตริง URL ออนไลน์', inputLabel: 'อินพุต', outputLabel: 'เอาต์พุต', encode: 'เข้ารหัส', decode: 'ถอดรหัส', clear: 'ล้าง', swap: 'สลับ', encodeComponent: 'encodeURIComponent', encodeUri: 'encodeURI', placeholder: 'ป้อน URL หรือข้อความ...', intro: 'URL encoding แทนที่อักขระที่ไม่ปลอดภัยด้วย percent encoding', faq1q: 'URL encoding คืออะไร?', faq1a: 'แปลงอักขระที่ไม่อนุญาตเป็นรูปแบบ %+ฐานสิบหก', faq2q: 'encodeURI กับ encodeURIComponent ต่างกันอย่างไร?', faq2a: 'encodeURI รักษาอักขระพิเศษ URL encodeURIComponent ไม่', faq3q: 'เมื่อไหร่ควร URL encode?', faq3a: 'สำหรับ query parameter และ user input', relatedTools: 'เครื่องมือที่เกี่ยวข้อง', errorMsg: 'ข้อผิดพลาด' },
};

export default function UrlEncodeDecode() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'component' | 'uri'>('component');
  const [error, setError] = useState('');

  const handleEncode = useCallback(() => {
    try {
      setError('');
      if (!input) { setOutput(''); return; }
      setOutput(mode === 'component' ? encodeURIComponent(input) : encodeURI(input));
    } catch { setError(t.errorMsg); }
  }, [input, mode, t.errorMsg]);

  const handleDecode = useCallback(() => {
    try {
      setError('');
      if (!input) { setOutput(''); return; }
      setOutput(mode === 'component' ? decodeURIComponent(input) : decodeURI(input));
    } catch { setError(t.errorMsg); }
  }, [input, mode, t.errorMsg]);

  const handleSwap = () => { setInput(output); setOutput(''); setError(''); };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="url-encode-decode">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.intro}</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleEncode} className="btn btn-primary">{t.encode}</button>
        <button onClick={handleDecode} className="btn btn-primary">{t.decode}</button>
        <button onClick={handleSwap} className="btn btn-secondary">{t.swap}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, fontSize: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <input type="radio" checked={mode === 'component'} onChange={() => setMode('component')} /> {t.encodeComponent}
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <input type="radio" checked={mode === 'uri'} onChange={() => setMode('uri')} /> {t.encodeUri}
          </label>
        </div>
      </div>
      {error && <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.placeholder} style={{ minHeight: 250, fontFamily: 'monospace', fontSize: 13 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly style={{ minHeight: 250, fontFamily: 'monospace', fontSize: 13, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{t.relatedTools}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/url-encoder`, label: 'URL Encoder' },
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
            { href: `/${lang}/tools/base64-encoder-decoder`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/url-encode-online`, label: 'URL Encode Online' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ fontSize: 12, color: 'var(--accent-blue)', textDecoration: 'none', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }].map((faq, idx) => (
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
