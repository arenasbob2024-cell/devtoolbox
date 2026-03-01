import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'cURL to JavaScript - Convert cURL to JS Fetch Online Free', description: 'Free online cURL to JavaScript converter. Convert cURL commands to JavaScript fetch, axios, and Node.js code. cURL to code converter for developers.' },
  fr: { title: 'cURL vers JavaScript - Convertir cURL en JS Fetch en Ligne', description: 'Convertisseur cURL vers JavaScript gratuit en ligne. Convertissez les commandes cURL en code JavaScript fetch, axios et Node.js.' },
  de: { title: 'cURL zu JavaScript - cURL in JS Fetch Umwandeln', description: 'Kostenloser Online cURL zu JavaScript Konverter. cURL-Befehle in JavaScript fetch, axios und Node.js umwandeln.' },
  it: { title: 'cURL a JavaScript - Converti cURL in JS Fetch Online', description: 'Convertitore cURL a JavaScript online gratuito. Converti comandi cURL in codice JavaScript fetch, axios e Node.js.' },
  es: { title: 'cURL a JavaScript - Convertir cURL a JS Fetch en Linea', description: 'Convertidor cURL a JavaScript gratuito en linea. Convierte comandos cURL a codigo JavaScript fetch, axios y Node.js.' },
  pt: { title: 'cURL para JavaScript - Converter cURL para JS Fetch Online', description: 'Conversor cURL para JavaScript online gratuito. Converta comandos cURL para codigo JavaScript fetch, axios e Node.js.' },
  nl: { title: 'cURL naar JavaScript - cURL naar JS Fetch Omzetten', description: 'Gratis online cURL naar JavaScript converter. Converteer cURL-opdrachten naar JavaScript fetch, axios en Node.js code.' },
  pl: { title: 'cURL do JavaScript - Konwertuj cURL na JS Fetch Online', description: 'Darmowy konwerter cURL do JavaScript online. Konwertuj polecenia cURL na kod JavaScript fetch, axios i Node.js.' },
  sv: { title: 'cURL till JavaScript - Konvertera cURL till JS Fetch', description: 'Gratis online cURL till JavaScript konverterare. Konvertera cURL-kommandon till JavaScript fetch, axios och Node.js kod.' },
  no: { title: 'cURL til JavaScript - Konverter cURL til JS Fetch', description: 'Gratis online cURL til JavaScript konverterer. Konverter cURL-kommandoer til JavaScript fetch, axios og Node.js kode.' },
  zh: { title: 'cURL 转 JavaScript - 免费在线将 cURL 转换为 JS', description: '免费在线 cURL 转 JavaScript 转换器。将 cURL 命令转换为 JavaScript fetch、axios 和 Node.js 代码。' },
  ja: { title: 'cURL から JavaScript - cURL を JS Fetch に変換', description: '無料オンライン cURL から JavaScript コンバーター。cURL コマンドを JavaScript fetch、axios、Node.js コードに変換します。' },
  ko: { title: 'cURL to JavaScript - cURL을 JS Fetch로 변환', description: '무료 온라인 cURL to JavaScript 변환기. cURL 명령을 JavaScript fetch, axios, Node.js 코드로 변환합니다.' },
  id: { title: 'cURL ke JavaScript - Konversi cURL ke JS Fetch Online', description: 'Konverter cURL ke JavaScript online gratis. Konversi perintah cURL ke kode JavaScript fetch, axios, dan Node.js.' },
  th: { title: 'cURL เป็น JavaScript - แปลง cURL เป็น JS Fetch ออนไลน์', description: 'เครื่องมือแปลง cURL เป็น JavaScript ออนไลน์ฟรี แปลงคำสั่ง cURL เป็นโค้ด JavaScript fetch, axios และ Node.js' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/curl-to-javascript`;
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
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/curl-to-javascript`])),
        'x-default': `https://viadreams.cc/en/tools/curl-to-javascript`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
