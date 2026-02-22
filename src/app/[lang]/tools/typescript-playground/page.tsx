'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: { title: 'TypeScript Playground', description: 'Convert TypeScript to JavaScript by stripping type annotations, interfaces, generics, and enums. Free, private, runs entirely in your browser.', inputLabel: 'TypeScript Input', outputLabel: 'JavaScript Output', convert: 'Convert to JS', clear: 'Clear', loadSample: 'Load Sample', copyLabel: 'Copy JS', introTitle: 'Free Online TypeScript Playground', introText: 'Paste your TypeScript code and instantly strip all type annotations, interfaces, type aliases, generics, and enums to produce clean JavaScript. Everything runs in your browser - no data is sent to a server.', howTitle: 'How to Convert TypeScript to JavaScript', step1: 'Paste or type your TypeScript code in the left panel', step2: 'Click "Convert to JS" to strip types', step3: 'Review the clean JavaScript output on the right', step4: 'Copy the JavaScript to use in your project', featuresTitle: 'Features', feature1: 'Strip type annotations from variables, parameters, and return types', feature2: 'Remove interface and type alias declarations', feature3: 'Convert enum declarations to JavaScript objects', feature4: 'Remove generic type parameters', feature5: 'Handle access modifiers (public, private, protected)', faqTitle: 'Frequently Asked Questions', faq1q: 'What TypeScript features are supported?', faq1a: 'The converter strips type annotations, interfaces, type aliases, generic parameters, access modifiers, and converts enums. It handles most common TypeScript patterns.', faq2q: 'How are enums converted?', faq2a: 'TypeScript enums are converted to plain JavaScript objects with frozen values, preserving the same key-value mapping as the original enum.', faq3q: 'Does this tool run a full TypeScript compiler?', faq3a: 'No. This tool uses regex-based stripping to remove type annotations. For full compilation with advanced features, use the official TypeScript compiler (tsc).', faq4q: 'Is my code sent to a server?', faq4a: 'No. All processing happens entirely in your browser. No code is transmitted to any server, making this safe for sensitive source code.', faq5q: 'What about JSX/TSX code?', faq5a: 'The converter handles basic TSX patterns by stripping type annotations while preserving JSX syntax. Complex generic JSX may need manual adjustment.', relatedTitle: 'Related Tools', errorEmpty: 'Please paste TypeScript code.' },
  zh: { title: 'TypeScript Playground', description: '通过剥离类型注解、接口、泛型和枚举将 TypeScript 转换为 JavaScript。免费、私密，完全在浏览器中运行。', inputLabel: 'TypeScript 输入', outputLabel: 'JavaScript 输出', convert: '转换为 JS', clear: '清除', loadSample: '加载示例', copyLabel: '复制 JS', introTitle: '免费在线 TypeScript Playground', introText: '粘贴 TypeScript 代码，即时剥离所有类型注解生成干净的 JavaScript。一切在浏览器中运行。', howTitle: '如何将 TypeScript 转换为 JavaScript', step1: '在左侧面板粘贴或输入 TypeScript 代码', step2: '点击"转换为 JS"剥离类型', step3: '查看右侧的 JavaScript 输出', step4: '复制 JavaScript 用于项目', featuresTitle: '功能', feature1: '剥离变量、参数和返回类型的类型注解', feature2: '移除接口和类型别名声明', feature3: '将枚举转换为 JavaScript 对象', feature4: '移除泛型类型参数', feature5: '处理访问修饰符', faqTitle: '常见问题', faq1q: '支持哪些 TypeScript 特性？', faq1a: '支持类型注解、接口、类型别名、泛型参数、访问修饰符和枚举转换。', faq2q: '枚举如何转换？', faq2a: '枚举被转换为冻结的 JavaScript 对象。', faq3q: '运行完整的 TypeScript 编译器吗？', faq3a: '不是。使用正则表达式剥离类型注解。', faq4q: '代码会发送到服务器吗？', faq4a: '不会。所有处理在浏览器中完成。', faq5q: 'JSX/TSX 代码怎么处理？', faq5a: '转换器处理基本 TSX 模式，剥离类型注解保留 JSX 语法。', relatedTitle: '相关工具', errorEmpty: '请粘贴 TypeScript 代码。' },
  ja: { title: 'TypeScript Playground', description: '型注釈、インターフェース、ジェネリクス、列挙型を除去してTypeScriptをJavaScriptに変換。', inputLabel: 'TypeScript入力', outputLabel: 'JavaScript出力', convert: 'JSに変換', clear: 'クリア', loadSample: 'サンプル', copyLabel: 'JSをコピー', introTitle: '無料TypeScript Playground', introText: 'TypeScriptコードを貼り付けて型注釈を即座に除去。', howTitle: '変換方法', step1: 'TypeScriptを貼り付け', step2: '「JSに変換」をクリック', step3: 'JavaScript出力を確認', step4: 'コピーして使用', featuresTitle: '機能', feature1: '型注釈の除去', feature2: 'インターフェース削除', feature3: '列挙型変換', feature4: 'ジェネリクス除去', feature5: 'アクセス修飾子処理', faqTitle: 'よくある質問', faq1q: '対応する機能は？', faq1a: '型注釈、インターフェース、型エイリアス、ジェネリクス、アクセス修飾子、列挙型。', faq2q: '列挙型の変換方法？', faq2a: 'JavaScriptオブジェクトに変換。', faq3q: 'コンパイラ使用？', faq3a: 'いいえ、正規表現ベース。', faq4q: 'データ送信？', faq4a: 'いいえ。', faq5q: 'JSX/TSX？', faq5a: '基本パターンに対応。', relatedTitle: '関連ツール', errorEmpty: 'コードを入力してください。' },
  ko: { title: 'TypeScript Playground', description: '타입 주석, 인터페이스, 제네릭, 열거형을 제거하여 TypeScript를 JavaScript로 변환합니다.', inputLabel: 'TypeScript 입력', outputLabel: 'JavaScript 출력', convert: 'JS로 변환', clear: '지우기', loadSample: '샘플', copyLabel: 'JS 복사', introTitle: '무료 TypeScript Playground', introText: 'TypeScript 코드를 붙여넣어 타입 주석을 즉시 제거합니다.', howTitle: '변환 방법', step1: 'TypeScript 붙여넣기', step2: '"JS로 변환" 클릭', step3: 'JavaScript 출력 확인', step4: '복사하여 사용', featuresTitle: '기능', feature1: '타입 주석 제거', feature2: '인터페이스 삭제', feature3: '열거형 변환', feature4: '제네릭 제거', feature5: '접근 제어자 처리', faqTitle: '자주 묻는 질문', faq1q: '지원 기능은?', faq1a: '타입 주석, 인터페이스, 타입 별칭, 제네릭, 접근 제어자, 열거형.', faq2q: '열거형 변환?', faq2a: 'JavaScript 객체로 변환.', faq3q: '컴파일러 사용?', faq3a: '아니요, 정규식 기반.', faq4q: '데이터 전송?', faq4a: '아니요.', faq5q: 'JSX/TSX?', faq5a: '기본 패턴 지원.', relatedTitle: '관련 도구', errorEmpty: '코드를 입력하세요.' },
  fr: { title: 'TypeScript Playground', description: 'Convertissez TypeScript en JavaScript en supprimant les types.', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'Convertir en JS', clear: 'Effacer', loadSample: 'Exemple', copyLabel: 'Copier JS', introTitle: 'TypeScript Playground Gratuit', introText: 'Collez votre code TypeScript pour supprimer les annotations de type.', howTitle: 'Comment convertir', step1: 'Collez le TypeScript', step2: 'Cliquez "Convertir"', step3: 'Verifiez le JavaScript', step4: 'Copiez', featuresTitle: 'Fonctionnalites', feature1: 'Suppression des types', feature2: 'Suppression des interfaces', feature3: 'Conversion des enums', feature4: 'Suppression des generiques', feature5: 'Modificateurs d\'acces', faqTitle: 'FAQ', faq1q: 'Quelles fonctionnalites ?', faq1a: 'Types, interfaces, alias, generiques, modificateurs, enums.', faq2q: 'Conversion des enums ?', faq2a: 'En objets JavaScript.', faq3q: 'Compilateur complet ?', faq3a: 'Non, base sur regex.', faq4q: 'Donnees envoyees ?', faq4a: 'Non.', faq5q: 'JSX/TSX ?', faq5a: 'Patterns basiques supportes.', relatedTitle: 'Outils connexes', errorEmpty: 'Collez du code.' },
  de: { title: 'TypeScript Playground', description: 'Konvertieren Sie TypeScript in JavaScript durch Entfernen der Typen.', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'In JS konvertieren', clear: 'Leeren', loadSample: 'Beispiel', copyLabel: 'JS kopieren', introTitle: 'TypeScript Playground Kostenlos', introText: 'Fuegen Sie TypeScript-Code ein.', howTitle: 'So konvertieren Sie', step1: 'TypeScript einfuegen', step2: '"Konvertieren" klicken', step3: 'JavaScript pruefen', step4: 'Kopieren', featuresTitle: 'Funktionen', feature1: 'Typannotationen entfernen', feature2: 'Interfaces entfernen', feature3: 'Enums konvertieren', feature4: 'Generics entfernen', feature5: 'Zugriffsmodifikatoren', faqTitle: 'FAQ', faq1q: 'Welche Features?', faq1a: 'Typen, Interfaces, Aliase, Generics, Modifikatoren, Enums.', faq2q: 'Enum-Konvertierung?', faq2a: 'Zu JavaScript-Objekten.', faq3q: 'Compiler?', faq3a: 'Nein, Regex-basiert.', faq4q: 'Daten gesendet?', faq4a: 'Nein.', faq5q: 'JSX/TSX?', faq5a: 'Grundmuster unterstuetzt.', relatedTitle: 'Verwandte Tools', errorEmpty: 'Code eingeben.' },
  es: { title: 'TypeScript Playground', description: 'Convierta TypeScript a JavaScript eliminando tipos.', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'Convertir a JS', clear: 'Limpiar', loadSample: 'Ejemplo', copyLabel: 'Copiar JS', introTitle: 'TypeScript Playground Gratis', introText: 'Pegue codigo TypeScript para eliminar anotaciones de tipo.', howTitle: 'Como convertir', step1: 'Pegue TypeScript', step2: 'Clic "Convertir"', step3: 'Revise JavaScript', step4: 'Copie', featuresTitle: 'Caracteristicas', feature1: 'Eliminar tipos', feature2: 'Eliminar interfaces', feature3: 'Convertir enums', feature4: 'Eliminar genericos', feature5: 'Modificadores de acceso', faqTitle: 'FAQ', faq1q: 'Que features?', faq1a: 'Tipos, interfaces, alias, genericos, modificadores, enums.', faq2q: 'Enums?', faq2a: 'A objetos JS.', faq3q: 'Compilador?', faq3a: 'No, regex.', faq4q: 'Datos?', faq4a: 'No.', faq5q: 'JSX/TSX?', faq5a: 'Patrones basicos.', relatedTitle: 'Herramientas', errorEmpty: 'Pegue codigo.' },
  pt: { title: 'TypeScript Playground', description: 'Converta TypeScript para JavaScript removendo tipos.', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'Converter para JS', clear: 'Limpar', loadSample: 'Exemplo', copyLabel: 'Copiar JS', introTitle: 'TypeScript Playground Gratis', introText: 'Cole codigo TypeScript para remover anotacoes de tipo.', howTitle: 'Como converter', step1: 'Cole TypeScript', step2: 'Clique "Converter"', step3: 'Verifique JavaScript', step4: 'Copie', featuresTitle: 'Recursos', feature1: 'Remover tipos', feature2: 'Remover interfaces', feature3: 'Converter enums', feature4: 'Remover genericos', feature5: 'Modificadores de acesso', faqTitle: 'FAQ', faq1q: 'Quais features?', faq1a: 'Tipos, interfaces, alias, genericos, modificadores, enums.', faq2q: 'Enums?', faq2a: 'Para objetos JS.', faq3q: 'Compilador?', faq3a: 'Nao, regex.', faq4q: 'Dados?', faq4a: 'Nao.', faq5q: 'JSX/TSX?', faq5a: 'Padroes basicos.', relatedTitle: 'Ferramentas', errorEmpty: 'Cole codigo.' },
  it: { title: 'TypeScript Playground', description: 'Converti TypeScript in JavaScript rimuovendo i tipi.', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'Converti in JS', clear: 'Cancella', loadSample: 'Esempio', copyLabel: 'Copia JS', introTitle: 'TypeScript Playground Gratis', introText: 'Incolla codice TypeScript per rimuovere le annotazioni di tipo.', howTitle: 'Come convertire', step1: 'Incolla TypeScript', step2: 'Clicca "Converti"', step3: 'Verifica JavaScript', step4: 'Copia', featuresTitle: 'Funzionalita', feature1: 'Rimuovi tipi', feature2: 'Rimuovi interfacce', feature3: 'Converti enum', feature4: 'Rimuovi generics', feature5: 'Modificatori accesso', faqTitle: 'FAQ', faq1q: 'Quali features?', faq1a: 'Tipi, interfacce, alias, generics, modificatori, enum.', faq2q: 'Enum?', faq2a: 'In oggetti JS.', faq3q: 'Compilatore?', faq3a: 'No, regex.', faq4q: 'Dati?', faq4a: 'No.', faq5q: 'JSX/TSX?', faq5a: 'Pattern base.', relatedTitle: 'Strumenti correlati', errorEmpty: 'Incolla codice.' },
  nl: { title: 'TypeScript Playground', description: 'Converteer TypeScript naar JavaScript door types te verwijderen.', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'Naar JS', clear: 'Wissen', loadSample: 'Voorbeeld', copyLabel: 'JS kopieren', introTitle: 'Gratis TypeScript Playground', introText: 'Plak TypeScript code om types te verwijderen.', howTitle: 'Hoe te converteren', step1: 'Plak TypeScript', step2: 'Klik "Naar JS"', step3: 'Controleer JavaScript', step4: 'Kopieer', featuresTitle: 'Functies', feature1: 'Types verwijderen', feature2: 'Interfaces verwijderen', feature3: 'Enums converteren', feature4: 'Generics verwijderen', feature5: 'Access modifiers', faqTitle: 'FAQ', faq1q: 'Welke features?', faq1a: 'Types, interfaces, aliassen, generics, modifiers, enums.', faq2q: 'Enums?', faq2a: 'Naar JS objecten.', faq3q: 'Compiler?', faq3a: 'Nee, regex.', faq4q: 'Data?', faq4a: 'Nee.', faq5q: 'JSX/TSX?', faq5a: 'Basispatronen.', relatedTitle: 'Gerelateerde tools', errorEmpty: 'Plak code.' },
  pl: { title: 'TypeScript Playground', description: 'Konwertuj TypeScript na JavaScript usuwajac typy.', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'Konwertuj na JS', clear: 'Wyczysc', loadSample: 'Przyklad', copyLabel: 'Kopiuj JS', introTitle: 'Darmowy TypeScript Playground', introText: 'Wklej kod TypeScript.', howTitle: 'Jak konwertowac', step1: 'Wklej TypeScript', step2: 'Kliknij "Konwertuj"', step3: 'Sprawdz JavaScript', step4: 'Skopiuj', featuresTitle: 'Funkcje', feature1: 'Usuniecie typow', feature2: 'Usuniecie interfejsow', feature3: 'Konwersja enumow', feature4: 'Usuniecie generykow', feature5: 'Modyfikatory dostepu', faqTitle: 'FAQ', faq1q: 'Jakie features?', faq1a: 'Typy, interfejsy, aliasy, generyki, modyfikatory, enumy.', faq2q: 'Enumy?', faq2a: 'Do obiektow JS.', faq3q: 'Kompilator?', faq3a: 'Nie, regex.', faq4q: 'Dane?', faq4a: 'Nie.', faq5q: 'JSX/TSX?', faq5a: 'Podstawowe wzorce.', relatedTitle: 'Powiazane', errorEmpty: 'Wklej kod.' },
  sv: { title: 'TypeScript Playground', description: 'Konvertera TypeScript till JavaScript genom att ta bort typer.', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'Till JS', clear: 'Rensa', loadSample: 'Exempel', copyLabel: 'Kopiera JS', introTitle: 'Gratis TypeScript Playground', introText: 'Klistra in TypeScript-kod.', howTitle: 'Hur man konverterar', step1: 'Klistra in TypeScript', step2: 'Klicka "Till JS"', step3: 'Granska JavaScript', step4: 'Kopiera', featuresTitle: 'Funktioner', feature1: 'Ta bort typer', feature2: 'Ta bort interfaces', feature3: 'Konvertera enums', feature4: 'Ta bort generics', feature5: 'Accessmodifierare', faqTitle: 'FAQ', faq1q: 'Vilka features?', faq1a: 'Typer, interfaces, alias, generics, modifierare, enums.', faq2q: 'Enums?', faq2a: 'Till JS-objekt.', faq3q: 'Kompilator?', faq3a: 'Nej, regex.', faq4q: 'Data?', faq4a: 'Nej.', faq5q: 'JSX/TSX?', faq5a: 'Grundmoenter.', relatedTitle: 'Relaterade verktyg', errorEmpty: 'Klistra in kod.' },
  no: { title: 'TypeScript Playground', description: 'Konverter TypeScript til JavaScript ved aa fjerne typer.', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'Til JS', clear: 'Toom', loadSample: 'Eksempel', copyLabel: 'Kopier JS', introTitle: 'Gratis TypeScript Playground', introText: 'Lim inn TypeScript-kode.', howTitle: 'Hvordan konvertere', step1: 'Lim inn TypeScript', step2: 'Klikk "Til JS"', step3: 'Sjekk JavaScript', step4: 'Kopier', featuresTitle: 'Funksjoner', feature1: 'Fjerne typer', feature2: 'Fjerne interfaces', feature3: 'Konvertere enums', feature4: 'Fjerne generics', feature5: 'Tilgangsmodifikatorer', faqTitle: 'FAQ', faq1q: 'Hvilke features?', faq1a: 'Typer, interfaces, alias, generics, modifikatorer, enums.', faq2q: 'Enums?', faq2a: 'Til JS-objekter.', faq3q: 'Kompilator?', faq3a: 'Nei, regex.', faq4q: 'Data?', faq4a: 'Nei.', faq5q: 'JSX/TSX?', faq5a: 'Grunnmoenstre.', relatedTitle: 'Relaterte verktoy', errorEmpty: 'Lim inn kode.' },
  id: { title: 'TypeScript Playground', description: 'Konversi TypeScript ke JavaScript dengan menghapus tipe.', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'Ke JS', clear: 'Hapus', loadSample: 'Contoh', copyLabel: 'Salin JS', introTitle: 'TypeScript Playground Gratis', introText: 'Tempel kode TypeScript.', howTitle: 'Cara konversi', step1: 'Tempel TypeScript', step2: 'Klik "Ke JS"', step3: 'Periksa JavaScript', step4: 'Salin', featuresTitle: 'Fitur', feature1: 'Hapus tipe', feature2: 'Hapus interface', feature3: 'Konversi enum', feature4: 'Hapus generic', feature5: 'Modifier akses', faqTitle: 'FAQ', faq1q: 'Fitur apa?', faq1a: 'Tipe, interface, alias, generic, modifier, enum.', faq2q: 'Enum?', faq2a: 'Ke objek JS.', faq3q: 'Compiler?', faq3a: 'Tidak, regex.', faq4q: 'Data?', faq4a: 'Tidak.', faq5q: 'JSX/TSX?', faq5a: 'Pola dasar.', relatedTitle: 'Alat terkait', errorEmpty: 'Tempel kode.' },
  th: { title: 'TypeScript Playground', description: 'แปลง TypeScript เป็น JavaScript โดยลบ type annotations', inputLabel: 'TypeScript', outputLabel: 'JavaScript', convert: 'แปลงเป็น JS', clear: 'ล้าง', loadSample: 'ตัวอย่าง', copyLabel: 'คัดลอก JS', introTitle: 'TypeScript Playground ฟรี', introText: 'วางโค้ด TypeScript เพื่อลบ type annotations', howTitle: 'วิธีแปลง', step1: 'วาง TypeScript', step2: 'คลิก "แปลงเป็น JS"', step3: 'ตรวจสอบ JavaScript', step4: 'คัดลอก', featuresTitle: 'คุณสมบัติ', feature1: 'ลบ type annotations', feature2: 'ลบ interfaces', feature3: 'แปลง enums', feature4: 'ลบ generics', feature5: 'Access modifiers', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'ฟีเจอร์อะไรบ้าง?', faq1a: 'Types, interfaces, aliases, generics, modifiers, enums', faq2q: 'Enums?', faq2a: 'เป็น JS objects', faq3q: 'Compiler?', faq3a: 'ไม่ ใช้ regex', faq4q: 'ส่งข้อมูล?', faq4a: 'ไม่', faq5q: 'JSX/TSX?', faq5a: 'รูปแบบพื้นฐาน', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorEmpty: 'กรุณาวางโค้ด' },
};

const SAMPLE_TS = `interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const getUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await fetch('/api/users');
  const data: User[] = await response.json();
  return { data, status: 200, message: 'OK' };
};

class UserService {
  private baseUrl: string;
  public users: User[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchUser(id: number): Promise<User | null> {
    try {
      const res = await fetch(\`\${this.baseUrl}/users/\${id}\`);
      return await res.json() as User;
    } catch (err: unknown) {
      console.error(err);
      return null;
    }
  }
}

const status: Status = Status.Active;
const numbers: number[] = [1, 2, 3];
const tuple: [string, number] = ['hello', 42];`;

function convertTsToJs(ts: string): string {
  let js = ts;

  // Remove single-line interface/type declarations
  js = js.replace(/^(export\s+)?(interface|type)\s+\w+[\s\S]*?\{[\s\S]*?\}\s*;?\s*$/gm, (match) => {
    // Check if it's a multiline block
    const braceCount = (match.match(/\{/g) || []).length;
    if (braceCount <= (match.match(/\}/g) || []).length) return '';
    return match;
  });

  // Remove interface blocks
  js = js.replace(/^(export\s+)?(interface)\s+\w+[^{]*\{[^}]*\}\s*$/gm, '');

  // Remove type alias lines
  js = js.replace(/^(export\s+)?type\s+\w+(\s*<[^>]*>)?\s*=\s*[\s\S]*?;\s*$/gm, '');

  // Convert enums
  js = js.replace(/^(export\s+)?enum\s+(\w+)\s*\{([^}]*)\}/gm, (_match, exp, name, body) => {
    const entries = body.split(',').map((e: string) => e.trim()).filter(Boolean);
    const pairs = entries.map((entry: string) => {
      const parts = entry.split('=').map((s: string) => s.trim());
      if (parts.length === 2) return `  ${parts[0]}: ${parts[1]}`;
      return `  ${parts[0]}: "${parts[0]}"`;
    });
    return `${exp || ''}const ${name} = Object.freeze({\n${pairs.join(',\n')}\n})`;
  });

  // Remove generic type parameters from function declarations
  js = js.replace(/(function\s+\w+)\s*<[^>()]*>/g, '$1');

  // Remove generic type parameters from arrow functions
  js = js.replace(/(const\s+\w+\s*=\s*(?:async\s+)?)\s*<[^>()]*>\s*\(/g, '$1(');

  // Remove return type annotations
  js = js.replace(/\)\s*:\s*[^{=]*?(?=\s*\{|\s*=>)/g, ')');

  // Remove parameter type annotations (simple cases)
  js = js.replace(/(\w+)\s*:\s*(?:string|number|boolean|any|void|null|undefined|unknown|never|object)\b/g, '$1');
  js = js.replace(/(\w+)\s*:\s*\w+\[\]/g, '$1');
  js = js.replace(/(\w+)\s*:\s*\w+\s*\|\s*\w+/g, '$1');
  js = js.replace(/(\w+)\s*:\s*\[[\w\s,]+\]/g, '$1');

  // Remove remaining type annotations after variable declarations
  js = js.replace(/((?:const|let|var)\s+\w+)\s*:\s*[A-Z]\w*(?:<[^>]*>)?(\s*[=;])/g, '$1$2');
  js = js.replace(/((?:const|let|var)\s+\w+)\s*:\s*\w+(?:<[^>]*>)?(\s*[=;])/g, '$1$2');

  // Remove access modifiers
  js = js.replace(/\b(public|private|protected|readonly)\s+/g, '');

  // Remove 'as Type' assertions
  js = js.replace(/\s+as\s+\w+(\[\])?/g, '');

  // Clean up empty lines (reduce multiple blank lines)
  js = js.replace(/\n{3,}/g, '\n\n');

  return js.trim();
}

export default function TypeScriptPlayground() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = useCallback(() => {
    setError('');
    if (!input.trim()) { setError(t.errorEmpty); setOutput(''); return; }
    try {
      const result = convertTsToJs(input);
      setOutput(result);
    } catch {
      setOutput('');
    }
  }, [input, t]);

  const handleClear = useCallback(() => { setInput(''); setOutput(''); setError(''); }, []);
  const handleSample = useCallback(() => { setInput(SAMPLE_TS); setOutput(''); setError(''); }, []);

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="typescript-playground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleConvert} className="btn btn-primary" style={{ fontSize: 13 }}>{t.convert}</button>
        <button onClick={handleSample} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.loadSample}</button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#f43f5e' }}>{'\u2715'} {error}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>TypeScript</span>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.inputLabel} spellCheck={false}
            style={{ flex: 1, minHeight: 400, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} label={t.copyLabel} />
          </div>
          <textarea value={output} readOnly placeholder="// JavaScript output" spellCheck={false}
            style={{ flex: 1, minHeight: 400, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, background: 'var(--bg-card)', opacity: output ? 1 : 0.5, resize: 'vertical' }} />
        </div>
      </div>

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li></ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.feature1}</li><li>{t.feature2}</li><li>{t.feature3}</li><li>{t.feature4}</li><li>{t.feature5}</li></ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[{ href: `/${lang}/tools/json-to-typescript`, label: 'JSON to TypeScript' }, { href: `/${lang}/tools/ts-to-js-converter`, label: 'TS to JS Converter' }, { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' }].map((link) => (
            <a key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</a>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
