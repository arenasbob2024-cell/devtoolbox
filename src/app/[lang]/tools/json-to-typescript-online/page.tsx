'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON to TypeScript Online',
    description: 'Convert JSON to TypeScript interfaces instantly. Generate type-safe TypeScript types from any JSON data with configurable root name and optional properties.',
    inputLabel: 'JSON Input',
    outputLabel: 'TypeScript Output',
    convertBtn: 'Convert',
    clearBtn: 'Clear',
    sampleBtn: 'Load Sample',
    placeholder: 'Paste your JSON here...',
    outputPlaceholder: 'TypeScript interfaces will appear here...',
    rootName: 'Root Interface Name',
    optionalProps: 'Optional Properties',
    exportKeyword: 'Export Interfaces',
    errorInvalid: 'Invalid JSON input',
    introTitle: 'Free Online JSON to TypeScript Converter',
    introText: 'Instantly convert any JSON object or array into clean TypeScript interfaces. This tool analyzes your JSON structure and generates properly typed interfaces with nested type support. Configure the root interface name, toggle optional properties, and add export keywords. Perfect for API response typing, data modeling, and TypeScript development workflows.',
    howTitle: 'How to Convert JSON to TypeScript',
    step1: 'Paste your JSON data into the input panel',
    step2: 'Set the root interface name (default: RootObject)',
    step3: 'Toggle optional properties and export keyword as needed',
    step4: 'Click Convert and copy the generated TypeScript interfaces',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What JSON structures are supported?',
    faq1a: 'All valid JSON is supported including nested objects, arrays of objects, mixed-type arrays, primitives, null values, and deeply nested structures. The tool recursively generates interfaces for all nested objects.',
    faq2q: 'How are arrays handled?',
    faq2a: 'Arrays of primitives become typed arrays (string[], number[]). Arrays of objects generate a separate interface. Mixed-type arrays use union types. Empty arrays become any[].',
    faq3q: 'What does Optional Properties do?',
    faq3a: 'When enabled, all properties in generated interfaces are marked with ? (optional). This is useful when your JSON might have missing fields in different API responses.',
    faq4q: 'Can I use the generated code in my project?',
    faq4a: 'Yes, the generated TypeScript interfaces are ready to copy and paste into your project. Enable the Export option to add export keywords for module usage.',
    faq5q: 'Is my JSON data safe?',
    faq5a: 'Absolutely. All conversion happens entirely in your browser using JavaScript. No JSON data is sent to any server. Your data remains completely private.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSON 转 TypeScript 在线工具',
    description: '即时将 JSON 转换为 TypeScript 接口。从任意 JSON 数据生成类型安全的接口。',
    inputLabel: 'JSON 输入', outputLabel: 'TypeScript 输出',
    convertBtn: '转换', clearBtn: '清除', sampleBtn: '加载示例',
    placeholder: '在此粘贴 JSON...', outputPlaceholder: 'TypeScript 接口将显示在此...',
    rootName: '根接口名称', optionalProps: '可选属性', exportKeyword: '导出接口',
    errorInvalid: '无效的 JSON 输入',
    introTitle: '免费在线 JSON 转 TypeScript 工具', introText: '将任意 JSON 对象或数组即时转换为 TypeScript 接口。支持嵌套类型、可选属性和导出关键字。',
    howTitle: '如何转换', step1: '粘贴 JSON 数据', step2: '设置根接口名称', step3: '按需切换选项', step4: '点击转换并复制结果',
    faqTitle: '常见问题',
    faq1q: '支持哪些 JSON 结构？', faq1a: '支持所有有效 JSON，包括嵌套对象、数组和混合类型。',
    faq2q: '数组如何处理？', faq2a: '基本类型数组变为类型数组，对象数组生成独立接口。',
    faq3q: '可选属性有什么用？', faq3a: '启用后所有属性标记为可选，适用于字段可能缺失的 API 响应。',
    faq4q: '生成的代码可以直接用吗？', faq4a: '可以，直接复制粘贴到项目中即可。',
    faq5q: '数据安全吗？', faq5a: '完全安全，所有转换在浏览器中完成。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'JSON to TypeScript オンライン', description: 'JSONをTypeScriptインターフェースに即時変換。',
    inputLabel: 'JSON入力', outputLabel: 'TypeScript出力',
    convertBtn: '変換', clearBtn: 'クリア', sampleBtn: 'サンプル',
    placeholder: 'JSONを貼り付け...', outputPlaceholder: 'TypeScriptインターフェースが表示されます...',
    rootName: 'ルートインターフェース名', optionalProps: 'オプショナルプロパティ', exportKeyword: 'エクスポート',
    errorInvalid: '無効なJSON入力',
    introTitle: '無料JSON to TypeScript変換ツール', introText: 'JSONをTypeScriptインターフェースに即時変換します。',
    howTitle: '使い方', step1: 'JSONデータを貼り付け', step2: 'ルート名を設定', step3: 'オプションを切り替え', step4: '変換をクリックしてコピー',
    faqTitle: 'よくある質問',
    faq1q: '対応JSON構造は？', faq1a: 'すべての有効なJSONに対応。ネストされたオブジェクトや配列も含みます。',
    faq2q: '配列はどう処理？', faq2a: 'プリミティブ配列は型付き配列に、オブジェクト配列は別インターフェースに。',
    faq3q: 'オプショナルとは？', faq3a: '有効にするとすべてのプロパティが?マーク付きになります。',
    faq4q: '生成コードは使える？', faq4a: 'はい、そのままプロジェクトにコピーできます。',
    faq5q: 'データは安全？', faq5a: 'はい、すべてブラウザ内で処理されます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JSON to TypeScript 온라인', description: 'JSON을 TypeScript 인터페이스로 즉시 변환.',
    inputLabel: 'JSON 입력', outputLabel: 'TypeScript 출력',
    convertBtn: '변환', clearBtn: '지우기', sampleBtn: '샘플',
    placeholder: 'JSON을 붙여넣기...', outputPlaceholder: 'TypeScript 인터페이스가 표시됩니다...',
    rootName: '루트 인터페이스 이름', optionalProps: '선택적 속성', exportKeyword: '인터페이스 내보내기',
    errorInvalid: '잘못된 JSON 입력',
    introTitle: '무료 JSON to TypeScript 변환기', introText: 'JSON을 TypeScript 인터페이스로 즉시 변환합니다.',
    howTitle: '사용 방법', step1: 'JSON 데이터 붙여넣기', step2: '루트 이름 설정', step3: '옵션 전환', step4: '변환 클릭 후 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: '지원 JSON 구조는?', faq1a: '모든 유효한 JSON을 지원합니다.',
    faq2q: '배열은 어떻게 처리하나요?', faq2a: '기본 타입 배열은 타입 배열로, 객체 배열은 별도 인터페이스로.',
    faq3q: '선택적 속성이란?', faq3a: '활성화하면 모든 속성에 ? 마크가 추가됩니다.',
    faq4q: '생성된 코드를 사용할 수 있나요?', faq4a: '네, 프로젝트에 바로 복사할 수 있습니다.',
    faq5q: '데이터가 안전한가요?', faq5a: '네, 모든 처리가 브라우저에서 이루어집니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'JSON vers TypeScript en Ligne', description: 'Convertissez JSON en interfaces TypeScript instantanement.',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'Convertir', clearBtn: 'Effacer', sampleBtn: 'Exemple',
    placeholder: 'Collez votre JSON...', outputPlaceholder: 'Interfaces TypeScript...',
    rootName: 'Nom racine', optionalProps: 'Proprietes optionnelles', exportKeyword: 'Exporter',
    errorInvalid: 'JSON invalide',
    introTitle: 'Convertisseur JSON vers TypeScript gratuit', introText: 'Convertissez instantanement JSON en interfaces TypeScript.',
    howTitle: 'Comment convertir', step1: 'Collez votre JSON', step2: 'Definissez le nom racine', step3: 'Configurez les options', step4: 'Cliquez Convertir et copiez',
    faqTitle: 'Questions frequentes',
    faq1q: 'Quelles structures JSON?', faq1a: 'Tout JSON valide est supporte.',
    faq2q: 'Comment sont traites les tableaux?', faq2a: 'Tableaux primitifs deviennent types, tableaux d\'objets generent des interfaces.',
    faq3q: 'Proprietes optionnelles?', faq3a: 'Active les marqueurs ? sur toutes les proprietes.',
    faq4q: 'Code utilisable?', faq4a: 'Oui, copiez directement dans votre projet.',
    faq5q: 'Donnees securisees?', faq5a: 'Oui, tout se passe dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JSON zu TypeScript Online', description: 'Konvertieren Sie JSON sofort in TypeScript-Interfaces.',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'Konvertieren', clearBtn: 'Loeschen', sampleBtn: 'Beispiel',
    placeholder: 'JSON einfuegen...', outputPlaceholder: 'TypeScript-Interfaces...',
    rootName: 'Root-Name', optionalProps: 'Optionale Eigenschaften', exportKeyword: 'Exportieren',
    errorInvalid: 'Ungueltiges JSON',
    introTitle: 'Kostenloser JSON-zu-TypeScript-Konverter', introText: 'Konvertieren Sie JSON sofort in TypeScript-Interfaces.',
    howTitle: 'So konvertieren', step1: 'JSON einfuegen', step2: 'Root-Name festlegen', step3: 'Optionen konfigurieren', step4: 'Konvertieren klicken und kopieren',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Welche JSON-Strukturen?', faq1a: 'Alles gueltige JSON wird unterstuetzt.',
    faq2q: 'Wie werden Arrays behandelt?', faq2a: 'Primitive Arrays werden typisiert, Objekt-Arrays erzeugen Interfaces.',
    faq3q: 'Optionale Eigenschaften?', faq3a: 'Aktiviert ?-Markierungen auf allen Eigenschaften.',
    faq4q: 'Code verwendbar?', faq4a: 'Ja, direkt ins Projekt kopierbar.',
    faq5q: 'Daten sicher?', faq5a: 'Ja, alles laeuft im Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'JSON a TypeScript Online', description: 'Convierte JSON a interfaces TypeScript al instante.',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'Convertir', clearBtn: 'Borrar', sampleBtn: 'Ejemplo',
    placeholder: 'Pega tu JSON...', outputPlaceholder: 'Interfaces TypeScript...',
    rootName: 'Nombre raiz', optionalProps: 'Propiedades opcionales', exportKeyword: 'Exportar',
    errorInvalid: 'JSON invalido',
    introTitle: 'Convertidor JSON a TypeScript gratuito', introText: 'Convierte JSON a interfaces TypeScript instantaneamente.',
    howTitle: 'Como convertir', step1: 'Pega tu JSON', step2: 'Define el nombre raiz', step3: 'Configura las opciones', step4: 'Clic en Convertir y copia',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que estructuras JSON?', faq1a: 'Todo JSON valido es soportado.',
    faq2q: 'Como se tratan los arrays?', faq2a: 'Arrays primitivos se tipan, arrays de objetos generan interfaces.',
    faq3q: 'Propiedades opcionales?', faq3a: 'Activa marcadores ? en todas las propiedades.',
    faq4q: 'Codigo utilizable?', faq4a: 'Si, copia directamente a tu proyecto.',
    faq5q: 'Datos seguros?', faq5a: 'Si, todo se procesa en tu navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'JSON para TypeScript Online', description: 'Converta JSON para interfaces TypeScript instantaneamente.',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'Converter', clearBtn: 'Limpar', sampleBtn: 'Exemplo',
    placeholder: 'Cole seu JSON...', outputPlaceholder: 'Interfaces TypeScript...',
    rootName: 'Nome raiz', optionalProps: 'Propriedades opcionais', exportKeyword: 'Exportar',
    errorInvalid: 'JSON invalido',
    introTitle: 'Conversor JSON para TypeScript gratuito', introText: 'Converta JSON para interfaces TypeScript instantaneamente.',
    howTitle: 'Como converter', step1: 'Cole seu JSON', step2: 'Defina o nome raiz', step3: 'Configure as opcoes', step4: 'Clique Converter e copie',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'Quais estruturas JSON?', faq1a: 'Todo JSON valido e suportado.',
    faq2q: 'Como arrays sao tratados?', faq2a: 'Arrays primitivos sao tipados, arrays de objetos geram interfaces.',
    faq3q: 'Propriedades opcionais?', faq3a: 'Ativa marcadores ? em todas as propriedades.',
    faq4q: 'Codigo utilizavel?', faq4a: 'Sim, copie diretamente para seu projeto.',
    faq5q: 'Dados seguros?', faq5a: 'Sim, tudo e processado no seu navegador.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'JSON a TypeScript Online', description: 'Converti JSON in interfacce TypeScript istantaneamente.',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'Converti', clearBtn: 'Cancella', sampleBtn: 'Esempio',
    placeholder: 'Incolla il tuo JSON...', outputPlaceholder: 'Interfacce TypeScript...',
    rootName: 'Nome radice', optionalProps: 'Proprieta opzionali', exportKeyword: 'Esporta',
    errorInvalid: 'JSON non valido',
    introTitle: 'Convertitore JSON a TypeScript gratuito', introText: 'Converti JSON in interfacce TypeScript istantaneamente.',
    howTitle: 'Come convertire', step1: 'Incolla il tuo JSON', step2: 'Imposta il nome radice', step3: 'Configura le opzioni', step4: 'Clicca Converti e copia',
    faqTitle: 'Domande frequenti',
    faq1q: 'Quali strutture JSON?', faq1a: 'Tutto il JSON valido e supportato.',
    faq2q: 'Come vengono gestiti gli array?', faq2a: 'Array primitivi diventano tipati, array di oggetti generano interfacce.',
    faq3q: 'Proprieta opzionali?', faq3a: 'Attiva i marcatori ? su tutte le proprieta.',
    faq4q: 'Codice utilizzabile?', faq4a: 'Si, copia direttamente nel tuo progetto.',
    faq5q: 'Dati sicuri?', faq5a: 'Si, tutto avviene nel browser.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'JSON naar TypeScript Online', description: 'Converteer JSON direct naar TypeScript-interfaces.',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'Converteren', clearBtn: 'Wissen', sampleBtn: 'Voorbeeld',
    placeholder: 'Plak je JSON...', outputPlaceholder: 'TypeScript-interfaces...',
    rootName: 'Root-naam', optionalProps: 'Optionele eigenschappen', exportKeyword: 'Exporteren',
    errorInvalid: 'Ongeldig JSON',
    introTitle: 'Gratis JSON naar TypeScript converter', introText: 'Converteer JSON direct naar TypeScript-interfaces.',
    howTitle: 'Hoe te converteren', step1: 'Plak je JSON', step2: 'Stel de root-naam in', step3: 'Configureer opties', step4: 'Klik Converteren en kopieer',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Welke JSON-structuren?', faq1a: 'Alle geldige JSON wordt ondersteund.',
    faq2q: 'Hoe worden arrays behandeld?', faq2a: 'Primitieve arrays worden getypeerd, object-arrays genereren interfaces.',
    faq3q: 'Optionele eigenschappen?', faq3a: 'Activeert ? markeringen op alle eigenschappen.',
    faq4q: 'Code bruikbaar?', faq4a: 'Ja, kopieer direct naar je project.',
    faq5q: 'Gegevens veilig?', faq5a: 'Ja, alles draait in je browser.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'JSON do TypeScript Online', description: 'Konwertuj JSON na interfejsy TypeScript natychmiast.',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'Konwertuj', clearBtn: 'Wyczysc', sampleBtn: 'Przyklad',
    placeholder: 'Wklej JSON...', outputPlaceholder: 'Interfejsy TypeScript...',
    rootName: 'Nazwa glowna', optionalProps: 'Opcjonalne wlasciwosci', exportKeyword: 'Eksportuj',
    errorInvalid: 'Nieprawidlowy JSON',
    introTitle: 'Darmowy konwerter JSON do TypeScript', introText: 'Konwertuj JSON na interfejsy TypeScript natychmiast.',
    howTitle: 'Jak konwertowac', step1: 'Wklej JSON', step2: 'Ustaw nazwe glowna', step3: 'Skonfiguruj opcje', step4: 'Kliknij Konwertuj i skopiuj',
    faqTitle: 'FAQ',
    faq1q: 'Jakie struktury JSON?', faq1a: 'Wszystkie prawidlowe JSON sa obslugiwnae.',
    faq2q: 'Jak sa traktowane tablice?', faq2a: 'Tablice prymitywne sa typowane, tablice obiektow generuja interfejsy.',
    faq3q: 'Opcjonalne wlasciwosci?', faq3a: 'Aktywuje znaczniki ? na wszystkich wlasciwosciach.',
    faq4q: 'Kod uzywalny?', faq4a: 'Tak, skopiuj bezposrednio do projektu.',
    faq5q: 'Dane bezpieczne?', faq5a: 'Tak, wszystko dziala w przegladarce.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'JSON till TypeScript Online', description: 'Konvertera JSON till TypeScript-interfaces direkt.',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'Konvertera', clearBtn: 'Rensa', sampleBtn: 'Exempel',
    placeholder: 'Klistra in JSON...', outputPlaceholder: 'TypeScript-interfaces...',
    rootName: 'Rotnamn', optionalProps: 'Valfria egenskaper', exportKeyword: 'Exportera',
    errorInvalid: 'Ogiltigt JSON',
    introTitle: 'Gratis JSON till TypeScript-konverterare', introText: 'Konvertera JSON till TypeScript-interfaces direkt.',
    howTitle: 'Hur man konverterar', step1: 'Klistra in JSON', step2: 'Ange rotnamn', step3: 'Konfigurera alternativ', step4: 'Klicka Konvertera och kopiera',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vilka JSON-strukturer?', faq1a: 'All giltig JSON stoeds.',
    faq2q: 'Hur hanteras arrayer?', faq2a: 'Primitiva arrayer typas, objektarrayer genererar interfaces.',
    faq3q: 'Valfria egenskaper?', faq3a: 'Aktiverar ? markoerer paa alla egenskaper.',
    faq4q: 'Kod anvaendbar?', faq4a: 'Ja, kopiera direkt till ditt projekt.',
    faq5q: 'Data saekert?', faq5a: 'Ja, allt koers i webblaesaren.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'JSON til TypeScript Online', description: 'Konverter JSON til TypeScript-interfaces umiddelbart.',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'Konverter', clearBtn: 'Slett', sampleBtn: 'Eksempel',
    placeholder: 'Lim inn JSON...', outputPlaceholder: 'TypeScript-interfaces...',
    rootName: 'Rotnavn', optionalProps: 'Valgfrie egenskaper', exportKeyword: 'Eksporter',
    errorInvalid: 'Ugyldig JSON',
    introTitle: 'Gratis JSON til TypeScript-konverter', introText: 'Konverter JSON til TypeScript-interfaces umiddelbart.',
    howTitle: 'Hvordan konvertere', step1: 'Lim inn JSON', step2: 'Angi rotnavn', step3: 'Konfigurer alternativer', step4: 'Klikk Konverter og kopier',
    faqTitle: 'Ofte stilte sporsmaal',
    faq1q: 'Hvilke JSON-strukturer?', faq1a: 'All gyldig JSON stoettes.',
    faq2q: 'Hvordan behandles arrays?', faq2a: 'Primitive arrays typifiseres, objektarrays genererer interfaces.',
    faq3q: 'Valgfrie egenskaper?', faq3a: 'Aktiverer ? markoerer paa alle egenskaper.',
    faq4q: 'Kode brukbar?', faq4a: 'Ja, kopier direkte til prosjektet ditt.',
    faq5q: 'Data trygt?', faq5a: 'Ja, alt kjoeres i nettleseren.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'JSON ke TypeScript Online', description: 'Konversi JSON ke interface TypeScript secara instan.',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'Konversi', clearBtn: 'Hapus', sampleBtn: 'Contoh',
    placeholder: 'Tempel JSON Anda...', outputPlaceholder: 'Interface TypeScript...',
    rootName: 'Nama root', optionalProps: 'Properti opsional', exportKeyword: 'Ekspor',
    errorInvalid: 'JSON tidak valid',
    introTitle: 'Konverter JSON ke TypeScript gratis', introText: 'Konversi JSON ke interface TypeScript secara instan.',
    howTitle: 'Cara mengonversi', step1: 'Tempel JSON', step2: 'Atur nama root', step3: 'Konfigurasi opsi', step4: 'Klik Konversi dan salin',
    faqTitle: 'FAQ',
    faq1q: 'Struktur JSON apa saja?', faq1a: 'Semua JSON valid didukung.',
    faq2q: 'Bagaimana array ditangani?', faq2a: 'Array primitif diketik, array objek menghasilkan interface.',
    faq3q: 'Properti opsional?', faq3a: 'Mengaktifkan penanda ? pada semua properti.',
    faq4q: 'Kode bisa digunakan?', faq4a: 'Ya, salin langsung ke proyek Anda.',
    faq5q: 'Data aman?', faq5a: 'Ya, semua proses di browser Anda.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'JSON เป็น TypeScript ออนไลน์', description: 'แปลง JSON เป็น TypeScript interface ทันที',
    inputLabel: 'JSON', outputLabel: 'TypeScript',
    convertBtn: 'แปลง', clearBtn: 'ล้าง', sampleBtn: 'ตัวอย่าง',
    placeholder: 'วาง JSON ของคุณ...', outputPlaceholder: 'TypeScript interface...',
    rootName: 'ชื่อ root', optionalProps: 'คุณสมบัติเสริม', exportKeyword: 'ส่งออก',
    errorInvalid: 'JSON ไม่ถูกต้อง',
    introTitle: 'ตัวแปลง JSON เป็น TypeScript ฟรี', introText: 'แปลง JSON เป็น TypeScript interface ทันที',
    howTitle: 'วิธีแปลง', step1: 'วาง JSON', step2: 'ตั้งชื่อ root', step3: 'ปรับตัวเลือก', step4: 'คลิกแปลงและคัดลอก',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'รองรับ JSON แบบไหน?', faq1a: 'รองรับ JSON ที่ถูกต้องทั้งหมด',
    faq2q: 'อาร์เรย์จัดการอย่างไร?', faq2a: 'อาร์เรย์พื้นฐานจะถูกกำหนดประเภท อาร์เรย์วัตถุจะสร้าง interface',
    faq3q: 'คุณสมบัติเสริมคืออะไร?', faq3a: 'เปิดใช้เครื่องหมาย ? บนคุณสมบัติทั้งหมด',
    faq4q: 'โค้ดใช้ได้เลยไหม?', faq4a: 'ได้ คัดลอกไปใช้ในโปรเจกต์ได้ทันที',
    faq5q: 'ข้อมูลปลอดภัยไหม?', faq5a: 'ใช่ ทุกอย่างทำงานในเบราว์เซอร์',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const SAMPLE_JSON = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "zipCode": "62701",
    "country": "US"
  },
  "tags": ["developer", "typescript"],
  "scores": [95, 87, 92],
  "projects": [
    {
      "name": "Project Alpha",
      "status": "active",
      "stars": 42
    }
  ],
  "metadata": null
}`;

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function jsonToTs(json: unknown, rootName: string, optional: boolean, useExport: boolean): string {
  const interfaces: string[] = [];
  const seen = new Map<string, string>();

  function getType(value: unknown, name: string): string {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const types = new Set(value.map((v, i) => getType(v, name + 'Item')));
      if (types.size === 1) return `${[...types][0]}[]`;
      return `(${[...types].join(' | ')})[]`;
    }
    if (typeof value === 'object') {
      const interfaceName = capitalize(name);
      if (!seen.has(interfaceName)) {
        seen.set(interfaceName, '');
        generateInterface(value as Record<string, unknown>, interfaceName);
      }
      return interfaceName;
    }
    return 'any';
  }

  function generateInterface(obj: Record<string, unknown>, name: string) {
    const prefix = useExport ? 'export ' : '';
    const q = optional ? '?' : '';
    const lines = Object.entries(obj).map(([key, value]) => {
      const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
      const type = getType(value, key);
      return `  ${safeName}${q}: ${type};`;
    });
    interfaces.push(`${prefix}interface ${name} {\n${lines.join('\n')}\n}`);
  }

  if (Array.isArray(json)) {
    if (json.length > 0 && typeof json[0] === 'object' && json[0] !== null) {
      generateInterface(json[0] as Record<string, unknown>, rootName);
      return interfaces.join('\n\n') + `\n\ntype ${rootName}List = ${rootName}[];`;
    }
    return `type ${rootName} = ${getType(json, rootName)};`;
  }

  if (typeof json === 'object' && json !== null) {
    generateInterface(json as Record<string, unknown>, rootName);
    return interfaces.join('\n\n');
  }

  return `type ${rootName} = ${getType(json, rootName)};`;
}

export default function JsonToTypescriptOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('RootObject');
  const [optional, setOptional] = useState(false);
  const [useExport, setUseExport] = useState(true);

  const handleConvert = useCallback(() => {
    setError('');
    setOutput('');
    try {
      const parsed = JSON.parse(input);
      setOutput(jsonToTs(parsed, rootName || 'RootObject', optional, useExport));
    } catch {
      setError(t.errorInvalid);
    }
  }, [input, rootName, optional, useExport, t]);

  const handleClear = () => { setInput(''); setOutput(''); setError(''); };
  const handleSample = () => { setInput(SAMPLE_JSON); setOutput(''); setError(''); };

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
    <ToolLayout title={t.title} description={t.description} toolId="json-to-typescript-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleConvert} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={handleSample} className="btn btn-secondary">{t.sampleBtn}</button>
        <button onClick={handleClear} className="btn btn-secondary">{t.clearBtn}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>{t.rootName}:</label>
            <input type="text" value={rootName} onChange={e => setRootName(e.target.value)}
              style={{ width: 120, padding: '4px 8px', fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)', fontFamily: 'monospace' }} />
          </div>
          <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <input type="checkbox" checked={optional} onChange={e => setOptional(e.target.checked)} />
            {t.optionalProps}
          </label>
          <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <input type="checkbox" checked={useExport} onChange={e => setUseExport(e.target.checked)} />
            {t.exportKeyword}
          </label>
        </div>
      </div>

      {error && <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'rgba(239,68,68,0.1)', borderRadius: 6 }}>{error}</div>}

      {/* Editor panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.placeholder}
            style={{ minHeight: 360, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
            <label style={{ fontSize: 12, fontWeight: 600 }}>{t.outputLabel}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea value={output} readOnly placeholder={t.outputPlaceholder}
            style={{ minHeight: 360, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li>
        </ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, i) => (
            <details key={i} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-to-typescript`, label: 'JSON to TypeScript' },
            { href: `/${lang}/tools/json-to-go`, label: 'JSON to Go' },
            { href: `/${lang}/tools/json-to-java`, label: 'JSON to Java' },
            { href: `/${lang}/tools/json-to-python`, label: 'JSON to Python' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
