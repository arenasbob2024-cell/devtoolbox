import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Regex Checker - Test Regular Expressions Online Free', description: 'Check and test regular expressions against text with real-time match highlighting. Free online regex checker with flag toggles and syntax quick reference.' },
  fr: { title: 'Verificateur Regex - Tester les Expressions Regulieres en Ligne', description: 'Verifiez et testez des expressions regulieres sur du texte avec mise en surbrillance des correspondances en temps reel. Verificateur regex gratuit en ligne.' },
  de: { title: 'Regex Checker - Regulaere Ausdruecke Online Testen', description: 'Pruefen und testen Sie regulaere Ausdruecke mit Echtzeit-Hervorhebung der Treffer. Kostenloser Online Regex-Checker mit Flag-Optionen.' },
  it: { title: 'Regex Checker - Testa Espressioni Regolari Online Gratis', description: 'Controlla e testa espressioni regolari sul testo con evidenziazione delle corrispondenze in tempo reale. Regex checker online gratuito.' },
  es: { title: 'Regex Checker - Probar Expresiones Regulares Online Gratis', description: 'Verifica y prueba expresiones regulares contra texto con resaltado de coincidencias en tiempo real. Verificador regex online gratuito.' },
  pt: { title: 'Regex Checker - Testar Expressoes Regulares Online Gratis', description: 'Verifique e teste expressoes regulares contra texto com destaque de correspondencias em tempo real. Verificador regex online gratuito.' },
  nl: { title: 'Regex Checker - Test Reguliere Expressies Online Gratis', description: 'Controleer en test reguliere expressies tegen tekst met real-time markering van overeenkomsten. Gratis online regex checker.' },
  pl: { title: 'Regex Checker - Testuj Wyrazenia Regularne Online Za Darmo', description: 'Sprawdzaj i testuj wyrazenia regularne z podswietlaniem dopasowania w czasie rzeczywistym. Darmowy checker regex online.' },
  sv: { title: 'Regex Checker - Testa Reguljara Uttryck Online Gratis', description: 'Kontrollera och testa reguljara uttryck mot text med realtidsmarkering av matchningar. Gratis online regex-checker.' },
  no: { title: 'Regex Checker - Test Regulaere Uttrykk Online Gratis', description: 'Sjekk og test regulaere uttrykk mot tekst med sanntidsmarkering av treff. Gratis online regex-sjekker.' },
  zh: { title: '正则表达式检查器 - 免费在线正则检查工具', description: '实时检查和测试正则表达式，高亮显示匹配结果。免费在线正则检查器，支持标志切换和语法速查。' },
  ja: { title: '正規表現チェッカー - 無料オンライン正規表現テストツール', description: 'リアルタイムのマッチハイライト付きで正規表現をチェック・テスト。無料オンライン正規表現チェッカー。' },
  ko: { title: '정규식 검사기 - 무료 온라인 정규 표현식 테스트', description: '실시간 매칭 하이라이트로 정규 표현식을 검사하고 테스트합니다. 무료 온라인 정규식 검사기.' },
  id: { title: 'Regex Checker - Uji Ekspresi Reguler Online Gratis', description: 'Periksa dan uji ekspresi reguler terhadap teks dengan penyorotan kecocokan waktu nyata. Pemeriksa regex online gratis.' },
  th: { title: 'Regex Checker - ทดสอบ Regular Expression ออนไลน์ฟรี', description: 'ตรวจสอบและทดสอบ regular expression กับข้อความพร้อมไฮไลท์ผลลัพธ์แบบเรียลไทม์ เครื่องมือตรวจสอบ regex ออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/regex-checker`;
  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: `${t.title} | DevToolBox`,
      description: t.description,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.title} | DevToolBox`,
      description: t.description,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/regex-checker`])
        ),
        'x-default': `https://viadreams.cc/en/tools/regex-checker`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
