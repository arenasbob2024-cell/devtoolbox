import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON to YAML Converter Online - Convert JSON to YAML Free', description: 'Free online JSON to YAML converter. Convert JSON data to YAML format instantly in your browser. Supports nested objects, arrays, and all data types.' },
  fr: { title: 'Convertisseur JSON vers YAML en Ligne Gratuit', description: 'Convertisseur JSON vers YAML gratuit en ligne. Convertissez JSON en YAML instantanement dans votre navigateur.' },
  de: { title: 'JSON zu YAML Konverter Online Kostenlos', description: 'Kostenloser Online JSON zu YAML Konverter. Konvertieren Sie JSON-Daten sofort in YAML-Format im Browser.' },
  it: { title: 'Convertitore JSON in YAML Online Gratis', description: 'Convertitore JSON in YAML gratuito online. Converti dati JSON in formato YAML istantaneamente nel browser.' },
  es: { title: 'Convertidor JSON a YAML en Linea Gratis', description: 'Convertidor JSON a YAML gratuito en linea. Convierte datos JSON a formato YAML al instante en tu navegador.' },
  pt: { title: 'Conversor JSON para YAML Online Gratis', description: 'Conversor JSON para YAML gratuito online. Converta dados JSON para formato YAML instantaneamente no navegador.' },
  nl: { title: 'JSON naar YAML Converter Online Gratis', description: 'Gratis online JSON naar YAML converter. Converteer JSON-gegevens naar YAML-formaat direct in uw browser.' },
  pl: { title: 'Konwerter JSON na YAML Online Za Darmo', description: 'Darmowy konwerter JSON na YAML online. Konwertuj dane JSON na format YAML natychmiast w przegladarce.' },
  sv: { title: 'JSON till YAML Konverterare Online Gratis', description: 'Gratis online JSON till YAML konverterare. Konvertera JSON-data till YAML-format direkt i webblaasaren.' },
  no: { title: 'JSON til YAML Konverterer Online Gratis', description: 'Gratis online JSON til YAML konverterer. Konverter JSON-data til YAML-format umiddelbart i nettleseren.' },
  zh: { title: 'JSON 转 YAML 转换器 - 免费在线 JSON 转 YAML 工具', description: '免费在线 JSON 转 YAML 转换工具。在浏览器中即时将 JSON 数据转换为 YAML 格式。' },
  ja: { title: 'JSON to YAML 変換ツール - 無料オンライン変換', description: '無料オンライン JSON to YAML 変換ツール。ブラウザで即座に JSON データを YAML 形式に変換。' },
  ko: { title: 'JSON to YAML 변환기 - 무료 온라인 변환', description: '무료 온라인 JSON to YAML 변환기. 브라우저에서 즉시 JSON 데이터를 YAML 형식으로 변환.' },
  id: { title: 'Konverter JSON ke YAML Online Gratis', description: 'Konverter JSON ke YAML gratis online. Konversi data JSON ke format YAML secara instan di browser Anda.' },
  th: { title: 'ตัวแปลง JSON เป็น YAML ออนไลน์ฟรี', description: 'เครื่องมือแปลง JSON เป็น YAML ออนไลน์ฟรี แปลงข้อมูล JSON เป็นรูปแบบ YAML ทันทีในเบราว์เซอร์ของคุณ' },
};

const slug = 'json-to-yaml';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['json to yaml', 'json yaml converter', 'convert json to yaml', 'json to yaml online', 'yaml converter', 'json converter'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
