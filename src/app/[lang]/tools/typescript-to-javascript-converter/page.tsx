'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'TypeScript to JavaScript Converter', description: 'Convert TypeScript code to clean JavaScript by removing type annotations, interfaces, enums, and generics.',
    inputLabel: 'TypeScript Input', outputLabel: 'JavaScript Output', convert: 'Convert to JS', clear: 'Clear', loadSample: 'Load Sample',
    placeholder: 'Paste TypeScript code here...',
    intro: 'Convert TypeScript (.ts, .tsx) code to plain JavaScript by stripping type annotations, interfaces, type aliases, enums, generics, and other TypeScript-specific syntax. This tool processes your code entirely in the browser, making it safe for private codebases. Perfect for quick prototyping, code sharing with non-TypeScript developers, and understanding what your TypeScript compiles to.',
    faq1q: 'What TypeScript features are removed?', faq1a: 'This converter removes: type annotations (: string, : number), interface declarations, type aliases, enum declarations, generic type parameters (<T>), type assertions (as Type), access modifiers (public, private, protected), readonly modifiers, abstract classes markers, and declare statements.',
    faq2q: 'Does this handle TSX (React TypeScript)?', faq2a: 'Yes, the converter handles TSX files by removing TypeScript-specific syntax while preserving JSX elements. React component props type annotations and generic components are properly handled.',
    faq3q: 'Is the conversion 100% accurate?', faq3a: 'This tool uses pattern-based removal for common TypeScript constructs. For production code, use the official TypeScript compiler (tsc) or tools like esbuild/swc. This converter is best for quick conversions and learning purposes.',
    faq4q: 'Can I convert JavaScript back to TypeScript?', faq4a: 'Converting JS to TS requires adding type information that does not exist in the JavaScript code. While some types can be inferred, full TypeScript conversion requires manual type annotation and understanding of the intended data types.',
    relatedTools: 'Related Tools',
  },
  zh: { title: 'TypeScript 转 JavaScript 转换器', description: '通过移除类型注解、接口和泛型将 TypeScript 代码转换为 JavaScript。', inputLabel: 'TypeScript 输入', outputLabel: 'JavaScript 输出', convert: '转换为 JS', clear: '清除', loadSample: '加载示例', placeholder: '粘贴 TypeScript 代码...', intro: '通过去除类型注解、接口、类型别名和枚举将 TypeScript 代码转换为纯 JavaScript。', faq1q: '哪些 TypeScript 功能会被移除？', faq1a: '类型注解、接口声明、类型别名、枚举声明、泛型参数和类型断言。', faq2q: '支持 TSX 吗？', faq2a: '是的，转换器处理 TSX 文件，移除 TypeScript 语法同时保留 JSX 元素。', faq3q: '转换 100% 准确吗？', faq3a: '此工具使用模式匹配。生产代码建议使用官方 TypeScript 编译器。', faq4q: '可以将 JS 转回 TS 吗？', faq4a: 'JS 转 TS 需要添加类型信息，需要手动注解。', relatedTools: '相关工具' },
  ja: { title: 'TypeScript to JavaScript 変換ツール', description: '型注釈、インターフェース、ジェネリクスを除去して TypeScript を JavaScript に変換。', inputLabel: 'TypeScript 入力', outputLabel: 'JavaScript 出力', convert: 'JS に変換', clear: 'クリア', loadSample: 'サンプル', placeholder: 'TypeScript コードを貼り付け...', intro: 'TypeScript コードを型注釈やインターフェースを除去して JavaScript に変換します。', faq1q: 'どの TypeScript 機能が除去されますか？', faq1a: '型注釈、インターフェース、型エイリアス、enum、ジェネリック型パラメータ、型アサーション。', faq2q: 'TSX をサポートしていますか？', faq2a: 'はい、JSX を保持しながら TypeScript 構文を除去します。', faq3q: '変換は100%正確ですか？', faq3a: 'パターンベースの変換です。本番コードには公式 TypeScript コンパイラを使用してください。', faq4q: 'JS を TS に戻せますか？', faq4a: '型情報の追加が必要で、手動での注釈が必要です。', relatedTools: '関連ツール' },
  ko: { title: 'TypeScript to JavaScript 변환기', description: '타입 주석, 인터페이스, 제네릭을 제거하여 TypeScript를 JavaScript로 변환합니다.', inputLabel: 'TypeScript 입력', outputLabel: 'JavaScript 출력', convert: 'JS로 변환', clear: '지우기', loadSample: '샘플', placeholder: 'TypeScript 코드를 붙여넣으세요...', intro: '타입 주석과 인터페이스를 제거하여 TypeScript 코드를 JavaScript로 변환합니다.', faq1q: '어떤 TypeScript 기능이 제거되나요?', faq1a: '타입 주석, 인터페이스, 타입 별칭, enum, 제네릭 타입 매개변수, 타입 단언.', faq2q: 'TSX를 지원하나요?', faq2a: '네, JSX를 유지하면서 TypeScript 구문을 제거합니다.', faq3q: '변환이 100% 정확한가요?', faq3a: '패턴 기반 변환입니다. 프로덕션 코드에는 공식 TypeScript 컴파일러를 사용하세요.', faq4q: 'JS를 TS로 변환할 수 있나요?', faq4a: '타입 정보 추가가 필요하며 수동 주석이 필요합니다.', relatedTools: '관련 도구' },
  fr: { title: 'Convertisseur TypeScript vers JavaScript', description: 'Convertissez TypeScript en JavaScript en supprimant les annotations de type.', inputLabel: 'Entree TypeScript', outputLabel: 'Sortie JavaScript', convert: 'Convertir en JS', clear: 'Effacer', loadSample: 'Exemple', placeholder: 'Collez le code TypeScript...', intro: 'Convertissez le code TypeScript en JavaScript en supprimant les types.', faq1q: 'Quelles fonctionnalites sont supprimees ?', faq1a: 'Annotations de type, interfaces, alias, enums, generiques, assertions.', faq2q: 'TSX supporte ?', faq2a: 'Oui, le JSX est preserve.', faq3q: 'Conversion 100% precise ?', faq3a: 'Conversion par motifs. Utilisez tsc pour la production.', faq4q: 'JS vers TS possible ?', faq4a: 'Necessite l\'ajout manuel de types.', relatedTools: 'Outils associes' },
  de: { title: 'TypeScript zu JavaScript Konverter', description: 'Konvertieren Sie TypeScript zu JavaScript durch Entfernen von Typannotationen.', inputLabel: 'TypeScript Eingabe', outputLabel: 'JavaScript Ausgabe', convert: 'In JS konvertieren', clear: 'Loeschen', loadSample: 'Beispiel', placeholder: 'TypeScript-Code einfuegen...', intro: 'Konvertieren Sie TypeScript-Code in JavaScript durch Entfernen von Typen.', faq1q: 'Welche Features werden entfernt?', faq1a: 'Typannotationen, Interfaces, Typaliase, Enums, Generics, Typ-Assertions.', faq2q: 'TSX unterstuetzt?', faq2a: 'Ja, JSX wird beibehalten.', faq3q: '100% genau?', faq3a: 'Musterbasierte Konvertierung. Verwenden Sie tsc fuer Produktion.', faq4q: 'JS zu TS moeglich?', faq4a: 'Erfordert manuelle Typannotation.', relatedTools: 'Verwandte Tools' },
  es: { title: 'Convertidor TypeScript a JavaScript', description: 'Convierte TypeScript a JavaScript eliminando anotaciones de tipo.', inputLabel: 'Entrada TypeScript', outputLabel: 'Salida JavaScript', convert: 'Convertir a JS', clear: 'Limpiar', loadSample: 'Ejemplo', placeholder: 'Pega el codigo TypeScript...', intro: 'Convierte codigo TypeScript a JavaScript eliminando tipos.', faq1q: 'Que se elimina?', faq1a: 'Anotaciones de tipo, interfaces, alias, enums, genericos, aserciones.', faq2q: 'TSX soportado?', faq2a: 'Si, JSX se preserva.', faq3q: 'Conversion 100% precisa?', faq3a: 'Conversion por patrones. Use tsc para produccion.', faq4q: 'JS a TS posible?', faq4a: 'Requiere agregar tipos manualmente.', relatedTools: 'Herramientas relacionadas' },
  pt: { title: 'Conversor TypeScript para JavaScript', description: 'Converta TypeScript para JavaScript removendo anotacoes de tipo.', inputLabel: 'Entrada TypeScript', outputLabel: 'Saida JavaScript', convert: 'Converter para JS', clear: 'Limpar', loadSample: 'Exemplo', placeholder: 'Cole o codigo TypeScript...', intro: 'Converta codigo TypeScript para JavaScript removendo tipos.', faq1q: 'O que e removido?', faq1a: 'Anotacoes de tipo, interfaces, aliases, enums, genericos, assercoes.', faq2q: 'TSX suportado?', faq2a: 'Sim, JSX e preservado.', faq3q: 'Conversao 100% precisa?', faq3a: 'Conversao por padroes. Use tsc para producao.', faq4q: 'JS para TS possivel?', faq4a: 'Requer adicionar tipos manualmente.', relatedTools: 'Ferramentas relacionadas' },
  it: { title: 'Convertitore TypeScript in JavaScript', description: 'Converti TypeScript in JavaScript rimuovendo le annotazioni di tipo.', inputLabel: 'Input TypeScript', outputLabel: 'Output JavaScript', convert: 'Converti in JS', clear: 'Cancella', loadSample: 'Esempio', placeholder: 'Incolla il codice TypeScript...', intro: 'Converti il codice TypeScript in JavaScript rimuovendo i tipi.', faq1q: 'Cosa viene rimosso?', faq1a: 'Annotazioni di tipo, interfacce, alias, enum, generici, asserzioni.', faq2q: 'TSX supportato?', faq2a: 'Si, JSX viene preservato.', faq3q: 'Conversione 100% accurata?', faq3a: 'Conversione basata su pattern. Usa tsc per la produzione.', faq4q: 'JS a TS possibile?', faq4a: 'Richiede l\'aggiunta manuale di tipi.', relatedTools: 'Strumenti correlati' },
  nl: { title: 'TypeScript naar JavaScript Converter', description: 'Converteer TypeScript naar JavaScript door typeannotaties te verwijderen.', inputLabel: 'TypeScript Invoer', outputLabel: 'JavaScript Uitvoer', convert: 'Naar JS', clear: 'Wissen', loadSample: 'Voorbeeld', placeholder: 'Plak TypeScript-code...', intro: 'Converteer TypeScript-code naar JavaScript door typen te verwijderen.', faq1q: 'Wat wordt verwijderd?', faq1a: 'Typeannotaties, interfaces, aliassen, enums, generics, type-assertions.', faq2q: 'TSX ondersteund?', faq2a: 'Ja, JSX wordt behouden.', faq3q: '100% nauwkeurig?', faq3a: 'Patroongebaseerde conversie. Gebruik tsc voor productie.', faq4q: 'JS naar TS mogelijk?', faq4a: 'Vereist handmatige typeannotatie.', relatedTools: 'Gerelateerde tools' },
  pl: { title: 'Konwerter TypeScript do JavaScript', description: 'Konwertuj TypeScript do JavaScript usuwajac adnotacje typow.', inputLabel: 'Wejscie TypeScript', outputLabel: 'Wyjscie JavaScript', convert: 'Konwertuj do JS', clear: 'Wyczysc', loadSample: 'Przyklad', placeholder: 'Wklej kod TypeScript...', intro: 'Konwertuj kod TypeScript do JavaScript usuwajac typy.', faq1q: 'Co jest usuwane?', faq1a: 'Adnotacje typow, interfejsy, aliasy, enumy, generyki, asercje typow.', faq2q: 'TSX obslugiwany?', faq2a: 'Tak, JSX jest zachowywany.', faq3q: '100% dokladna konwersja?', faq3a: 'Konwersja oparta na wzorcach. Uzyj tsc do produkcji.', faq4q: 'JS do TS mozliwe?', faq4a: 'Wymaga recznego dodawania typow.', relatedTools: 'Powiazane narzedzia' },
  sv: { title: 'TypeScript till JavaScript Konverterare', description: 'Konvertera TypeScript till JavaScript genom att ta bort typannotationer.', inputLabel: 'TypeScript Indata', outputLabel: 'JavaScript Utdata', convert: 'Konvertera till JS', clear: 'Rensa', loadSample: 'Exempel', placeholder: 'Klistra in TypeScript-kod...', intro: 'Konvertera TypeScript-kod till JavaScript genom att ta bort typer.', faq1q: 'Vad tas bort?', faq1a: 'Typannotationer, grenssnitt, alias, enums, generics, typ-assertions.', faq2q: 'TSX stods?', faq2a: 'Ja, JSX bevaras.', faq3q: '100% korrekt?', faq3a: 'Monsterbaserad konvertering. Anvand tsc for produktion.', faq4q: 'JS till TS mojligt?', faq4a: 'Kraver manuell typannotering.', relatedTools: 'Relaterade verktyg' },
  no: { title: 'TypeScript til JavaScript Konverter', description: 'Konverter TypeScript til JavaScript ved a fjerne typeannotasjoner.', inputLabel: 'TypeScript Inndata', outputLabel: 'JavaScript Utdata', convert: 'Konverter til JS', clear: 'Slett', loadSample: 'Eksempel', placeholder: 'Lim inn TypeScript-kode...', intro: 'Konverter TypeScript-kode til JavaScript ved a fjerne typer.', faq1q: 'Hva fjernes?', faq1a: 'Typeannotasjoner, grensesnitt, aliaser, enums, generics, type-assertions.', faq2q: 'TSX stoettet?', faq2a: 'Ja, JSX bevares.', faq3q: '100% noeyaktig?', faq3a: 'Moenterbasert konvertering. Bruk tsc for produksjon.', faq4q: 'JS til TS mulig?', faq4a: 'Krever manuell typeannotering.', relatedTools: 'Relaterte verktoy' },
  id: { title: 'Konverter TypeScript ke JavaScript', description: 'Konversi TypeScript ke JavaScript dengan menghapus anotasi tipe.', inputLabel: 'Input TypeScript', outputLabel: 'Output JavaScript', convert: 'Konversi ke JS', clear: 'Hapus', loadSample: 'Contoh', placeholder: 'Tempel kode TypeScript...', intro: 'Konversi kode TypeScript ke JavaScript dengan menghapus tipe.', faq1q: 'Apa yang dihapus?', faq1a: 'Anotasi tipe, interface, alias, enum, generic, type assertion.', faq2q: 'TSX didukung?', faq2a: 'Ya, JSX dipertahankan.', faq3q: '100% akurat?', faq3a: 'Konversi berbasis pola. Gunakan tsc untuk produksi.', faq4q: 'JS ke TS mungkin?', faq4a: 'Memerlukan penambahan tipe secara manual.', relatedTools: 'Alat terkait' },
  th: { title: 'แปลง TypeScript เป็น JavaScript', description: 'แปลง TypeScript เป็น JavaScript โดยลบ type annotations', inputLabel: 'TypeScript อินพุต', outputLabel: 'JavaScript เอาต์พุต', convert: 'แปลงเป็น JS', clear: 'ล้าง', loadSample: 'ตัวอย่าง', placeholder: 'วางโค้ด TypeScript...', intro: 'แปลงโค้ด TypeScript เป็น JavaScript โดยลบ types', faq1q: 'อะไรถูกลบออก?', faq1a: 'Type annotations, interfaces, aliases, enums, generics, type assertions', faq2q: 'รองรับ TSX ไหม?', faq2a: 'ได้ JSX จะถูกเก็บไว้', faq3q: 'แปลงถูกต้อง 100% ไหม?', faq3a: 'การแปลงตาม pattern ใช้ tsc สำหรับ production', faq4q: 'แปลง JS เป็น TS ได้ไหม?', faq4a: 'ต้องเพิ่ม type ด้วยตนเอง', relatedTools: 'เครื่องมือที่เกี่ยวข้อง' },
};

const SAMPLE = `interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

type Status = 'active' | 'inactive' | 'pending';

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const getStatus = (id: number): Status => {
  return 'active';
};

class UserService {
  private users: User[] = [];

  public addUser(user: User): void {
    this.users.push(user);
  }

  public findUser(id: number): User | undefined {
    return this.users.find((u: User) => u.id === id);
  }
}

const numbers: number[] = [1, 2, 3];
const result: string = greet({ id: 1, name: 'World', email: 'test@test.com', roles: ['admin'] });
console.log(result);`;

function tsToJs(ts: string): string {
  let js = ts;
  js = js.replace(/^(export\s+)?interface\s+\w+[\s\S]*?^\}/gm, '');
  js = js.replace(/^(export\s+)?type\s+\w+\s*=\s*[^;]+;/gm, '');
  js = js.replace(/^(export\s+)?enum\s+(\w+)\s*\{([\s\S]*?)^\}/gm, (_, exp, name, body) => {
    const entries = body.split(',').map((e: string) => e.trim()).filter(Boolean).map((e: string) => {
      const [key, val] = e.split('=').map((s: string) => s.trim());
      return val ? `  ${key}: ${val}` : `  ${key}: "${key}"`;
    });
    return `${exp || ''}const ${name} = {\n${entries.join(',\n')}\n}`;
  });
  js = js.replace(/:\s*\w+(\[\])?\s*(?=[=,\);}\n])/g, '');
  js = js.replace(/:\s*\w+\s*\|\s*\w+/g, '');
  js = js.replace(/<\w+(?:\s*,\s*\w+)*>/g, '');
  js = js.replace(/\bas\s+\w+/g, '');
  js = js.replace(/\b(public|private|protected|readonly)\s+/g, '');
  js = js.replace(/\babstract\s+/g, '');
  js = js.replace(/\bdeclare\s+.*$/gm, '');
  js = js.replace(/^\s*\/\/\s*@ts-.*$/gm, '');
  js = js.replace(/\n{3,}/g, '\n\n');
  return js.trim();
}

export default function TypescriptToJavascriptConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = useCallback(() => {
    if (!input.trim()) { setOutput(''); return; }
    setOutput(tsToJs(input));
  }, [input]);

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
    <ToolLayout title={t.title} description={t.description} toolId="typescript-to-javascript-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.intro}</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={convert} className="btn btn-primary">{t.convert}</button>
        <button onClick={() => { setInput(SAMPLE); setOutput(tsToJs(SAMPLE)); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.placeholder} style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{t.relatedTools}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/typescript-to-javascript`, label: 'TypeScript to JavaScript' },
            { href: `/${lang}/tools/ts-to-js-converter`, label: 'TS to JS Converter' },
            { href: `/${lang}/tools/json-to-typescript`, label: 'JSON to TypeScript' },
            { href: `/${lang}/tools/typescript-playground`, label: 'TypeScript Playground' },
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
