'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Validator Online', description: 'Validate JSON syntax and check for errors. Get detailed error messages with position info for quick debugging.',
    inputLabel: 'JSON Input', validate: 'Validate JSON', format: 'Format', clear: 'Clear',
    placeholder: '{\n  "name": "value",\n  "count": 42\n}',
    validMsg: 'Valid JSON', invalidMsg: 'Invalid JSON',
    intro: 'Validate your JSON data instantly with this free online JSON validator. It checks for syntax errors including missing commas, unmatched brackets, invalid string escaping, trailing commas, and other common mistakes. Get precise error messages with position information to help you fix issues quickly.',
    faq1q: 'What does a JSON validator check?', faq1a: 'A JSON validator checks for correct syntax according to the JSON specification (RFC 8259): proper use of curly braces and square brackets, correctly quoted string keys and values, valid data types (string, number, boolean, null, object, array), proper comma placement, and no trailing commas.',
    faq2q: 'What are common JSON errors?', faq2a: 'Common JSON errors include: trailing commas after the last element, single quotes instead of double quotes, unquoted keys, missing commas between elements, extra commas, unclosed brackets or braces, and invalid escape sequences in strings.',
    faq3q: 'Can I validate JSON from an API response?', faq3a: 'Yes, paste any JSON text into the validator. It works with API responses, configuration files, package.json, tsconfig.json, or any JSON data. The validator processes everything locally in your browser.',
    faq4q: 'Is JSON5 supported?', faq4a: 'This validator checks strict JSON (RFC 8259). JSON5 extensions like comments, trailing commas, single-quoted strings, and unquoted keys will be flagged as errors. For JSON5 content, remove these extensions before validating.',
    relatedTools: 'Related JSON Tools', loadSample: 'Load Sample',
  },
  zh: { title: 'JSON 在线验证器', description: '验证 JSON 语法并检查错误。', inputLabel: 'JSON 输入', validate: '验证 JSON', format: '格式化', clear: '清除', placeholder: '{\n  "name": "value"\n}', validMsg: 'JSON 有效', invalidMsg: 'JSON 无效', intro: '使用此免费在线工具即时验证 JSON 数据。', faq1q: 'JSON 验证器检查什么？', faq1a: '检查正确的语法，包括花括号、引号、数据类型和逗号。', faq2q: '常见的 JSON 错误有哪些？', faq2a: '末尾逗号、单引号、未引用的键、缺少逗号等。', faq3q: '可以验证 API 响应吗？', faq3a: '可以，粘贴任何 JSON 文本即可验证。', faq4q: '支持 JSON5 吗？', faq4a: '此验证器检查严格的 JSON 规范。', relatedTools: '相关 JSON 工具', loadSample: '加载示例' },
  ja: { title: 'JSON バリデーター オンライン', description: 'JSON 構文を検証してエラーを確認します。', inputLabel: 'JSON 入力', validate: 'JSON を検証', format: 'フォーマット', clear: 'クリア', placeholder: '{\n  "name": "value"\n}', validMsg: '有効な JSON', invalidMsg: '無効な JSON', intro: 'この無料オンラインツールで JSON データを即座に検証します。', faq1q: 'JSON バリデーターは何をチェックしますか？', faq1a: '構文の正確性をチェックします。', faq2q: '一般的な JSON エラーは？', faq2a: '末尾のカンマ、シングルクォート、引用符なしのキーなど。', faq3q: 'API レスポンスを検証できますか？', faq3a: 'はい、任意の JSON テキストを貼り付けてください。', faq4q: 'JSON5 はサポートされていますか？', faq4a: '厳密な JSON 仕様をチェックします。', relatedTools: '関連 JSON ツール', loadSample: 'サンプル' },
  ko: { title: 'JSON 유효성 검사기 온라인', description: 'JSON 구문을 검증하고 오류를 확인합니다.', inputLabel: 'JSON 입력', validate: 'JSON 검증', format: '포맷', clear: '지우기', placeholder: '{\n  "name": "value"\n}', validMsg: '유효한 JSON', invalidMsg: '잘못된 JSON', intro: '이 무료 온라인 도구로 JSON 데이터를 즉시 검증하세요.', faq1q: 'JSON 유효성 검사기는 무엇을 확인하나요?', faq1a: '구문의 정확성을 확인합니다.', faq2q: '일반적인 JSON 오류는?', faq2a: '후행 쉼표, 작은따옴표, 따옴표 없는 키 등.', faq3q: 'API 응답을 검증할 수 있나요?', faq3a: '네, 아무 JSON 텍스트나 붙여넣으세요.', faq4q: 'JSON5를 지원하나요?', faq4a: '엄격한 JSON 사양을 확인합니다.', relatedTools: '관련 JSON 도구', loadSample: '샘플' },
  fr: { title: 'Validateur JSON en Ligne', description: 'Validez la syntaxe JSON et verifiez les erreurs.', inputLabel: 'Entree JSON', validate: 'Valider JSON', format: 'Formater', clear: 'Effacer', placeholder: '{\n  "name": "value"\n}', validMsg: 'JSON valide', invalidMsg: 'JSON invalide', intro: 'Validez vos donnees JSON instantanement.', faq1q: 'Que verifie un validateur JSON ?', faq1a: 'La syntaxe correcte selon la specification JSON.', faq2q: 'Erreurs JSON courantes ?', faq2a: 'Virgules finales, guillemets simples, cles non citees.', faq3q: 'Valider une reponse API ?', faq3a: 'Oui, collez n\'importe quel texte JSON.', faq4q: 'JSON5 supporte ?', faq4a: 'Ce validateur verifie le JSON strict.', relatedTools: 'Outils JSON associes', loadSample: 'Exemple' },
  de: { title: 'JSON Validator Online', description: 'Validieren Sie JSON-Syntax und pruefen Sie auf Fehler.', inputLabel: 'JSON Eingabe', validate: 'JSON validieren', format: 'Formatieren', clear: 'Loeschen', placeholder: '{\n  "name": "value"\n}', validMsg: 'Gueltiges JSON', invalidMsg: 'Ungueltiges JSON', intro: 'Validieren Sie Ihre JSON-Daten sofort.', faq1q: 'Was prueft ein JSON Validator?', faq1a: 'Korrekte Syntax gemaess JSON-Spezifikation.', faq2q: 'Haeufige JSON-Fehler?', faq2a: 'Nachgestellte Kommas, einfache Anfuehrungszeichen, nicht zitierte Schluessel.', faq3q: 'API-Antwort validieren?', faq3a: 'Ja, fuegen Sie beliebigen JSON-Text ein.', faq4q: 'JSON5 unterstuetzt?', faq4a: 'Dieser Validator prueft striktes JSON.', relatedTools: 'Verwandte JSON-Tools', loadSample: 'Beispiel' },
  es: { title: 'Validador JSON en Linea', description: 'Valida la sintaxis JSON y verifica errores.', inputLabel: 'Entrada JSON', validate: 'Validar JSON', format: 'Formatear', clear: 'Limpiar', placeholder: '{\n  "name": "value"\n}', validMsg: 'JSON valido', invalidMsg: 'JSON invalido', intro: 'Valida tus datos JSON al instante.', faq1q: 'Que verifica un validador JSON?', faq1a: 'Sintaxis correcta segun la especificacion JSON.', faq2q: 'Errores JSON comunes?', faq2a: 'Comas finales, comillas simples, claves sin comillas.', faq3q: 'Validar respuesta API?', faq3a: 'Si, pega cualquier texto JSON.', faq4q: 'JSON5 soportado?', faq4a: 'Este validador verifica JSON estricto.', relatedTools: 'Herramientas JSON', loadSample: 'Ejemplo' },
  pt: { title: 'Validador JSON Online', description: 'Valide a sintaxe JSON e verifique erros.', inputLabel: 'Entrada JSON', validate: 'Validar JSON', format: 'Formatar', clear: 'Limpar', placeholder: '{\n  "name": "value"\n}', validMsg: 'JSON valido', invalidMsg: 'JSON invalido', intro: 'Valide seus dados JSON instantaneamente.', faq1q: 'O que um validador JSON verifica?', faq1a: 'Sintaxe correta conforme a especificacao JSON.', faq2q: 'Erros JSON comuns?', faq2a: 'Virgulas finais, aspas simples, chaves sem aspas.', faq3q: 'Validar resposta de API?', faq3a: 'Sim, cole qualquer texto JSON.', faq4q: 'JSON5 suportado?', faq4a: 'Este validador verifica JSON estrito.', relatedTools: 'Ferramentas JSON', loadSample: 'Exemplo' },
  it: { title: 'Validatore JSON Online', description: 'Valida la sintassi JSON e controlla gli errori.', inputLabel: 'Input JSON', validate: 'Valida JSON', format: 'Formatta', clear: 'Cancella', placeholder: '{\n  "name": "value"\n}', validMsg: 'JSON valido', invalidMsg: 'JSON non valido', intro: 'Valida i tuoi dati JSON istantaneamente.', faq1q: 'Cosa verifica un validatore JSON?', faq1a: 'Sintassi corretta secondo la specifica JSON.', faq2q: 'Errori JSON comuni?', faq2a: 'Virgole finali, apici singoli, chiavi non quotate.', faq3q: 'Validare risposta API?', faq3a: 'Si, incolla qualsiasi testo JSON.', faq4q: 'JSON5 supportato?', faq4a: 'Questo validatore controlla JSON rigoroso.', relatedTools: 'Strumenti JSON', loadSample: 'Esempio' },
  nl: { title: 'JSON Validator Online', description: 'Valideer JSON-syntax en controleer op fouten.', inputLabel: 'JSON Invoer', validate: 'Valideer JSON', format: 'Formatteren', clear: 'Wissen', placeholder: '{\n  "name": "value"\n}', validMsg: 'Geldige JSON', invalidMsg: 'Ongeldige JSON', intro: 'Valideer uw JSON-gegevens direct.', faq1q: 'Wat controleert een JSON validator?', faq1a: 'Correcte syntax volgens de JSON-specificatie.', faq2q: 'Veelvoorkomende JSON-fouten?', faq2a: 'Achterliggende komma\'s, enkele aanhalingstekens, niet-gequote sleutels.', faq3q: 'API-respons valideren?', faq3a: 'Ja, plak willekeurige JSON-tekst.', faq4q: 'JSON5 ondersteund?', faq4a: 'Deze validator controleert strikt JSON.', relatedTools: 'Gerelateerde JSON-tools', loadSample: 'Voorbeeld' },
  pl: { title: 'Walidator JSON Online', description: 'Waliduj skladnie JSON i sprawdz bledy.', inputLabel: 'Wejscie JSON', validate: 'Waliduj JSON', format: 'Formatuj', clear: 'Wyczysc', placeholder: '{\n  "name": "value"\n}', validMsg: 'Prawidlowy JSON', invalidMsg: 'Nieprawidlowy JSON', intro: 'Waliduj dane JSON natychmiast.', faq1q: 'Co sprawdza walidator JSON?', faq1a: 'Poprawna skladnia zgodna ze specyfikacja JSON.', faq2q: 'Typowe bledy JSON?', faq2a: 'Koncowe przecinki, pojedyncze cudzyslowy, niecytowane klucze.', faq3q: 'Walidacja odpowiedzi API?', faq3a: 'Tak, wklej dowolny tekst JSON.', faq4q: 'JSON5 obslugiwany?', faq4a: 'Ten walidator sprawdza scisly JSON.', relatedTools: 'Powiazane narzedzia JSON', loadSample: 'Przyklad' },
  sv: { title: 'JSON Validator Online', description: 'Validera JSON-syntax och kontrollera fel.', inputLabel: 'JSON Indata', validate: 'Validera JSON', format: 'Formatera', clear: 'Rensa', placeholder: '{\n  "name": "value"\n}', validMsg: 'Giltig JSON', invalidMsg: 'Ogiltig JSON', intro: 'Validera dina JSON-data direkt.', faq1q: 'Vad kontrollerar en JSON-validator?', faq1a: 'Korrekt syntax enligt JSON-specifikationen.', faq2q: 'Vanliga JSON-fel?', faq2a: 'Efterfoeljande kommatecken, enkla citattecken, icke-citerade nycklar.', faq3q: 'Validera API-svar?', faq3a: 'Ja, klistra in valfri JSON-text.', faq4q: 'JSON5 stods?', faq4a: 'Denna validator kontrollerar strikt JSON.', relatedTools: 'Relaterade JSON-verktyg', loadSample: 'Exempel' },
  no: { title: 'JSON Validator Online', description: 'Valider JSON-syntaks og sjekk for feil.', inputLabel: 'JSON Inndata', validate: 'Valider JSON', format: 'Formater', clear: 'Slett', placeholder: '{\n  "name": "value"\n}', validMsg: 'Gyldig JSON', invalidMsg: 'Ugyldig JSON', intro: 'Valider dine JSON-data umiddelbart.', faq1q: 'Hva sjekker en JSON-validator?', faq1a: 'Korrekt syntaks i henhold til JSON-spesifikasjonen.', faq2q: 'Vanlige JSON-feil?', faq2a: 'Etterfoelgende kommaer, enkle anfoeselstegn, usiterte noekler.', faq3q: 'Validere API-svar?', faq3a: 'Ja, lim inn vilkaarlig JSON-tekst.', faq4q: 'JSON5 stoettet?', faq4a: 'Denne validatoren sjekker strikt JSON.', relatedTools: 'Relaterte JSON-verktoy', loadSample: 'Eksempel' },
  id: { title: 'JSON Validator Online', description: 'Validasi sintaks JSON dan periksa kesalahan.', inputLabel: 'Input JSON', validate: 'Validasi JSON', format: 'Format', clear: 'Hapus', placeholder: '{\n  "name": "value"\n}', validMsg: 'JSON valid', invalidMsg: 'JSON tidak valid', intro: 'Validasi data JSON Anda secara instan.', faq1q: 'Apa yang diperiksa validator JSON?', faq1a: 'Sintaks yang benar sesuai spesifikasi JSON.', faq2q: 'Kesalahan JSON umum?', faq2a: 'Koma trailing, kutipan tunggal, kunci tanpa kutipan.', faq3q: 'Validasi respons API?', faq3a: 'Ya, tempel teks JSON apa pun.', faq4q: 'JSON5 didukung?', faq4a: 'Validator ini memeriksa JSON ketat.', relatedTools: 'Alat JSON terkait', loadSample: 'Contoh' },
  th: { title: 'JSON Validator ออนไลน์', description: 'ตรวจสอบไวยากรณ์ JSON และค้นหาข้อผิดพลาด', inputLabel: 'JSON อินพุต', validate: 'ตรวจสอบ JSON', format: 'จัดรูปแบบ', clear: 'ล้าง', placeholder: '{\n  "name": "value"\n}', validMsg: 'JSON ถูกต้อง', invalidMsg: 'JSON ไม่ถูกต้อง', intro: 'ตรวจสอบข้อมูล JSON ของคุณทันที', faq1q: 'JSON validator ตรวจสอบอะไร?', faq1a: 'ไวยากรณ์ที่ถูกต้องตามข้อกำหนด JSON', faq2q: 'ข้อผิดพลาด JSON ทั่วไป?', faq2a: 'เครื่องหมายจุลภาคปิดท้าย เครื่องหมายอัญประกาศเดี่ยว คีย์ที่ไม่มีเครื่องหมายอัญประกาศ', faq3q: 'ตรวจสอบ API response ได้ไหม?', faq3a: 'ได้ วาง JSON text ใดก็ได้', faq4q: 'รองรับ JSON5 ไหม?', faq4a: 'ตัวตรวจสอบนี้ตรวจ JSON แบบเข้มงวด', relatedTools: 'เครื่องมือ JSON ที่เกี่ยวข้อง', loadSample: 'ตัวอย่าง' },
};

const SAMPLE = `{
  "name": "DevToolBox",
  "version": "1.0.0",
  "description": "Free online developer tools",
  "features": ["JSON", "Base64", "Hash", "Color"],
  "config": {
    "port": 3000,
    "debug": false,
    "database": null
  },
  "active": true
}`;

export default function JsonValidatorOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  const validate = useCallback(() => {
    if (!input.trim()) { setResult(null); return; }
    try {
      JSON.parse(input);
      setResult({ valid: true, message: t.validMsg });
    } catch (e) {
      setResult({ valid: false, message: `${t.invalidMsg}: ${e instanceof Error ? e.message : String(e)}` });
    }
  }, [input, t]);

  const format = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setResult({ valid: true, message: t.validMsg });
    } catch (e) {
      setResult({ valid: false, message: `${t.invalidMsg}: ${e instanceof Error ? e.message : String(e)}` });
    }
  }, [input, t]);

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
    <ToolLayout title={t.title} description={t.description} toolId="json-validator-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.intro}</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={validate} className="btn btn-primary">{t.validate}</button>
        <button onClick={format} className="btn btn-secondary">{t.format}</button>
        <button onClick={() => { setInput(SAMPLE); setResult(null); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setInput(''); setResult(null); }} className="btn btn-secondary">{t.clear}</button>
      </div>
      {result && (
        <div style={{ padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13, fontWeight: 600, background: result.valid ? 'rgba(34,197,94,0.1)' : 'rgba(244,63,94,0.1)', border: `1px solid ${result.valid ? 'rgba(34,197,94,0.3)' : 'rgba(244,63,94,0.3)'}`, color: result.valid ? '#22c55e' : 'var(--accent-rose)' }}>
          {result.valid ? '\u2713' : '\u2717'} {result.message}
        </div>
      )}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          {input && <CopyButton text={input} />}
        </div>
        <textarea value={input} onChange={e => { setInput(e.target.value); setResult(null); }} placeholder={t.placeholder} style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }} />
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{t.relatedTools}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-validator`, label: 'JSON Validator' },
            { href: `/${lang}/tools/json-viewer`, label: 'JSON Viewer' },
            { href: `/${lang}/tools/json-to-yaml`, label: 'JSON to YAML' },
            { href: `/${lang}/tools/json-to-typescript`, label: 'JSON to TypeScript' },
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
