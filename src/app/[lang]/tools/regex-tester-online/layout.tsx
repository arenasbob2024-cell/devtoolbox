import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Regex Tester Online - Test Regular Expressions Free', description: 'Free online regex tester with real-time matching, highlighting, and capture group support. Test JavaScript, Python, and PCRE regular expressions instantly in your browser.' },
  fr: { title: 'Testeur Regex en Ligne - Tester les Expressions Regulieres Gratuit', description: 'Testeur regex gratuit en ligne avec correspondance en temps reel et mise en surbrillance. Testez les expressions regulieres JavaScript et Python.' },
  de: { title: 'Regex Tester Online - Regulaere Ausdruecke Kostenlos Testen', description: 'Kostenloser Online Regex-Tester mit Echtzeit-Matching und Hervorhebung. Testen Sie JavaScript- und Python-Regex sofort.' },
  it: { title: 'Regex Tester Online - Testa Espressioni Regolari Gratis', description: 'Tester regex online gratuito con corrispondenza in tempo reale ed evidenziazione. Testa espressioni regolari JavaScript e Python.' },
  es: { title: 'Regex Tester Online - Probar Expresiones Regulares Gratis', description: 'Tester de regex online gratuito con coincidencias en tiempo real y resaltado. Prueba expresiones regulares de JavaScript y Python al instante.' },
  pt: { title: 'Regex Tester Online - Testar Expressoes Regulares Gratis', description: 'Testador de regex online gratuito com correspondencia em tempo real e destaque. Teste expressoes regulares JavaScript e Python instantaneamente.' },
  nl: { title: 'Regex Tester Online - Reguliere Expressies Gratis Testen', description: 'Gratis online regex-tester met realtime matching en markering. Test JavaScript- en Python-regex direct in uw browser.' },
  pl: { title: 'Regex Tester Online - Testuj Wyrazenia Regularne Za Darmo', description: 'Darmowy tester regex online z dopasowywaniem w czasie rzeczywistym i podswietlaniem. Testuj wyrazenia regularne JavaScript i Python.' },
  sv: { title: 'Regex Tester Online - Testa Reguljaera Uttryck Gratis', description: 'Gratis online regex-testare med realtidsmatchning och markering. Testa JavaScript- och Python-regex direkt i din webblasare.' },
  no: { title: 'Regex Tester Online - Test Regulaere Uttrykk Gratis', description: 'Gratis online regex-tester med sanntidsmatching og utheving. Test JavaScript- og Python-regex direkte i nettleseren.' },
  zh: { title: '正则表达式在线测试器 - 免费测试正则', description: '免费在线正则表达式测试器，支持实时匹配、高亮显示和捕获组。即时在浏览器中测试 JavaScript、Python 和 PCRE 正则表达式。' },
  ja: { title: '正規表現テスター オンライン - 無料で正規表現をテスト', description: '無料オンライン正規表現テスター。リアルタイムマッチング、ハイライト、キャプチャグループ対応。JavaScript、Python正規表現を即座にテスト。' },
  ko: { title: '정규식 테스터 온라인 - 정규 표현식 무료 테스트', description: '무료 온라인 정규식 테스터. 실시간 매칭, 하이라이팅, 캡처 그룹 지원. JavaScript, Python 정규 표현식을 즉시 테스트합니다.' },
  id: { title: 'Regex Tester Online - Tes Ekspresi Reguler Gratis', description: 'Tester regex online gratis dengan pencocokan real-time dan penyorotan. Tes ekspresi reguler JavaScript dan Python secara instan.' },
  th: { title: 'Regex Tester ออนไลน์ - ทดสอบ Regular Expression ฟรี', description: 'เครื่องมือทดสอบ regex ออนไลน์ฟรี พร้อมการจับคู่แบบเรียลไทม์และการไฮไลท์ ทดสอบ JavaScript และ Python regex ได้ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/regex-tester-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/regex-tester-online`])), 'x-default': `https://viadreams.cc/en/tools/regex-tester-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
