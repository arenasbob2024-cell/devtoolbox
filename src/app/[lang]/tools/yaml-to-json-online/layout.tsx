import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'YAML to JSON Online Converter - Convert YAML to JSON Free', description: 'Free online YAML to JSON converter. Convert YAML data to JSON format instantly in your browser. Supports mappings, sequences, and all YAML types.' },
  fr: { title: 'Convertisseur YAML vers JSON en Ligne Gratuit', description: 'Convertisseur YAML vers JSON gratuit. Convertissez YAML en JSON instantanement dans votre navigateur.' },
  de: { title: 'YAML zu JSON Konverter Online Kostenlos', description: 'Kostenloser YAML zu JSON Konverter. Konvertieren Sie YAML sofort in JSON im Browser.' },
  it: { title: 'Convertitore YAML in JSON Online Gratis', description: 'Convertitore YAML in JSON gratuito. Converti YAML in JSON istantaneamente nel browser.' },
  es: { title: 'Convertidor YAML a JSON en Linea Gratis', description: 'Convertidor YAML a JSON gratuito. Convierte YAML a JSON al instante en tu navegador.' },
  pt: { title: 'Conversor YAML para JSON Online Gratis', description: 'Conversor YAML para JSON gratuito. Converta YAML para JSON instantaneamente no navegador.' },
  nl: { title: 'YAML naar JSON Converter Online Gratis', description: 'Gratis YAML naar JSON converter. Converteer YAML naar JSON direct in uw browser.' },
  pl: { title: 'Konwerter YAML na JSON Online Za Darmo', description: 'Darmowy konwerter YAML na JSON. Konwertuj YAML do JSON natychmiast w przegladarce.' },
  sv: { title: 'YAML till JSON Konverterare Online Gratis', description: 'Gratis YAML till JSON konverterare. Konvertera YAML till JSON direkt i webblaasaren.' },
  no: { title: 'YAML til JSON Konverterer Online Gratis', description: 'Gratis YAML til JSON konverterer. Konverter YAML til JSON umiddelbart i nettleseren.' },
  zh: { title: 'YAML 转 JSON 在线转换器 - 免费 YAML 转 JSON 工具', description: '免费在线 YAML 转 JSON 转换工具。在浏览器中即时将 YAML 数据转换为 JSON 格式。' },
  ja: { title: 'YAML to JSON オンライン変換ツール - 無料変換', description: '無料 YAML to JSON 変換ツール。ブラウザで即座に YAML を JSON に変換。' },
  ko: { title: 'YAML to JSON 온라인 변환기 - 무료 변환', description: '무료 YAML to JSON 변환기. 브라우저에서 즉시 YAML을 JSON으로 변환.' },
  id: { title: 'Konverter YAML ke JSON Online Gratis', description: 'Konverter YAML ke JSON gratis. Konversi YAML ke JSON secara instan di browser.' },
  th: { title: 'ตัวแปลง YAML เป็น JSON ออนไลน์ฟรี', description: 'เครื่องมือแปลง YAML เป็น JSON ออนไลน์ฟรี แปลง YAML เป็น JSON ทันทีในเบราว์เซอร์' },
};

const slug = 'yaml-to-json-online';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title, description: t.description,
    keywords: ['yaml to json', 'yaml to json online', 'yaml converter', 'convert yaml to json', 'yaml json online', 'yaml parser'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
