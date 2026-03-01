import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Regex Builder & Tester - Build Regular Expressions Online Free', description: 'Free online regex builder and tester. Build, test, and debug regular expressions with real-time matching, pattern explanation, and common templates. JavaScript regex syntax.' },
  fr: { title: 'Constructeur et Testeur de Regex - Expressions Regulieres en Ligne Gratuit', description: 'Constructeur et testeur de regex en ligne gratuit. Construisez, testez et deboguez des expressions regulieres avec correspondance en temps reel et explications.' },
  de: { title: 'Regex Builder & Tester - Regulaere Ausdruecke Online Kostenlos', description: 'Kostenloser Online Regex Builder und Tester. Erstellen, testen und debuggen Sie regulaere Ausdruecke mit Echtzeit-Matching und Mustererklaerungen.' },
  it: { title: 'Costruttore e Tester di Regex - Espressioni Regolari Online Gratis', description: 'Costruttore e tester di regex online gratuito. Costruisci, testa e fai il debug di espressioni regolari con corrispondenza in tempo reale e spiegazioni.' },
  es: { title: 'Constructor y Probador de Regex - Expresiones Regulares Online Gratis', description: 'Constructor y probador de regex en linea gratuito. Construye, prueba y depura expresiones regulares con coincidencia en tiempo real y explicaciones.' },
  pt: { title: 'Construtor e Testador de Regex - Expressoes Regulares Online Gratis', description: 'Construtor e testador de regex online gratuito. Construa, teste e depure expressoes regulares com correspondencia em tempo real e explicacoes.' },
  nl: { title: 'Regex Builder & Tester - Reguliere Expressies Online Gratis', description: 'Gratis online regex builder en tester. Bouw, test en debug reguliere expressies met realtime matching en patroonuitleg.' },
  pl: { title: 'Kreator i Tester Regex - Wyrazenia Regularne Online Za Darmo', description: 'Darmowy kreator i tester regex online. Buduj, testuj i debuguj wyrazenia regularne z dopasowywaniem w czasie rzeczywistym i wyjasnieniami.' },
  sv: { title: 'Regex-byggare & Testare - Reguljara Uttryck Online Gratis', description: 'Gratis online regex-byggare och testare. Bygg, testa och felsok reguljara uttryck med realtidsmatchning och monsterforklaringar.' },
  no: { title: 'Regex-bygger & Tester - Regulaere Uttrykk Online Gratis', description: 'Gratis online regex-bygger og tester. Bygg, test og feilsok regulaere uttrykk med sanntidsmatching og monsterforklaringer.' },
  zh: { title: '正则表达式构建器与测试器 - 免费在线正则工具', description: '免费在线正则表达式构建器和测试器。实时构建、测试和调试正则表达式，提供模式解释和常用模板。JavaScript 正则语法。' },
  ja: { title: '正規表現ビルダー＆テスター - 無料オンライン正規表現ツール', description: '無料オンライン正規表現ビルダーとテスター。リアルタイムマッチング、パターン解説、テンプレート付き。JavaScript正規表現構文。' },
  ko: { title: '정규식 빌더 & 테스터 - 무료 온라인 정규 표현식 도구', description: '무료 온라인 정규식 빌더 및 테스터. 실시간 매칭, 패턴 설명, 일반 템플릿으로 정규 표현식을 구축, 테스트, 디버그합니다.' },
  id: { title: 'Pembuat & Penguji Regex - Ekspresi Reguler Online Gratis', description: 'Pembuat dan penguji regex online gratis. Bangun, uji, dan debug ekspresi reguler dengan pencocokan waktu nyata dan penjelasan pola.' },
  th: { title: 'เครื่องมือสร้างและทดสอบ Regex - นิพจน์ทั่วไปออนไลน์ฟรี', description: 'เครื่องมือสร้างและทดสอบ regex ออนไลน์ฟรี สร้าง ทดสอบ และดีบักนิพจน์ทั่วไปพร้อมการจับคู่แบบเรียลไทม์และคำอธิบายรูปแบบ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/regex-builder`;
  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/regex-builder`])), 'x-default': `https://viadreams.cc/en/tools/regex-builder` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
