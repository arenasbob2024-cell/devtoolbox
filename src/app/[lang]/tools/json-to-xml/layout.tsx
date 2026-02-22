import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON to XML Converter Online - Free Tool', description: 'Convert JSON to XML online instantly. Paste JSON data and get well-formatted XML output with customizable indentation.' },
  fr: { title: 'Convertisseur JSON vers XML en Ligne Gratuit', description: 'Convertissez JSON en XML en ligne instantanement. Collez vos donnees JSON et obtenez un XML bien formate.' },
  de: { title: 'JSON zu XML Konverter Online Kostenlos', description: 'JSON sofort online in XML umwandeln. JSON-Daten einfuegen und gut formatiertes XML erhalten.' },
  it: { title: 'Convertitore JSON in XML Online Gratis', description: 'Converti JSON in XML online istantaneamente. Incolla i dati JSON e ottieni XML ben formattato.' },
  es: { title: 'Convertidor JSON a XML en Linea Gratis', description: 'Convierta JSON a XML en linea al instante. Pegue datos JSON y obtenga XML bien formateado.' },
  pt: { title: 'Conversor JSON para XML Online Gratis', description: 'Converta JSON para XML online instantaneamente. Cole dados JSON e obtenha XML bem formatado.' },
  nl: { title: 'JSON naar XML Converter Online Gratis', description: 'Converteer JSON naar XML online direct. Plak JSON-gegevens en krijg goed geformatteerde XML.' },
  pl: { title: 'Konwerter JSON do XML Online Za Darmo', description: 'Konwertuj JSON do XML online natychmiast. Wklej dane JSON i otrzymaj dobrze sformatowany XML.' },
  sv: { title: 'JSON till XML Konverterare Online Gratis', description: 'Konvertera JSON till XML online direkt. Klistra in JSON-data och fa vaalformaterad XML.' },
  no: { title: 'JSON til XML Konverterer Online Gratis', description: 'Konverter JSON til XML online umiddelbart. Lim inn JSON-data og faa velformatert XML.' },
  zh: { title: 'JSON 转 XML 在线转换器 - 免费工具', description: '在线即时将 JSON 转换为 XML。粘贴 JSON 数据，获取格式良好的 XML 输出。' },
  ja: { title: 'JSON から XML コンバーター オンライン 無料', description: 'JSON を XML にオンラインで即座に変換。JSON データを貼り付けて、整形された XML を取得。' },
  ko: { title: 'JSON to XML 변환기 온라인 무료', description: 'JSON을 XML로 온라인에서 즉시 변환. JSON 데이터를 붙여넣고 잘 포맷된 XML을 받으세요.' },
  id: { title: 'Konverter JSON ke XML Online Gratis', description: 'Konversi JSON ke XML online secara instan. Tempel data JSON dan dapatkan XML yang terformat rapi.' },
  th: { title: 'แปลง JSON เป็น XML ออนไลน์ฟรี', description: 'แปลง JSON เป็น XML ออนไลน์ทันที วาง JSON แล้วรับ XML ที่จัดรูปแบบดี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-to-xml`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-to-xml`])), 'x-default': `https://viadreams.cc/en/tools/json-to-xml` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
