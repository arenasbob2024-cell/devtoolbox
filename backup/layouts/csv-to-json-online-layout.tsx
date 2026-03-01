import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';
const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSV to JSON Online Converter - Convert CSV to JSON Free', description: 'Free online CSV to JSON converter. Convert CSV data to JSON format instantly. Supports custom delimiters, headers, and large files.' },
  fr: { title: 'Convertisseur CSV vers JSON en Ligne Gratuit', description: 'Convertissez CSV en JSON instantanement. Delimiteurs personnalises et en-tetes.' },
  de: { title: 'CSV zu JSON Konverter Online Kostenlos', description: 'CSV in JSON sofort konvertieren. Benutzerdefinierte Trennzeichen und Header.' },
  it: { title: 'Convertitore CSV in JSON Online Gratis', description: 'Converti CSV in JSON istantaneamente. Delimitatori personalizzati e intestazioni.' },
  es: { title: 'Convertidor CSV a JSON en Linea Gratis', description: 'Convierte CSV a JSON al instante. Delimitadores personalizados y encabezados.' },
  pt: { title: 'Conversor CSV para JSON Online Gratis', description: 'Converta CSV para JSON instantaneamente. Delimitadores personalizados e cabecalhos.' },
  nl: { title: 'CSV naar JSON Converter Online Gratis', description: 'Converteer CSV naar JSON direct. Aangepaste scheidingstekens en headers.' },
  pl: { title: 'Konwerter CSV na JSON Online Za Darmo', description: 'Konwertuj CSV na JSON natychmiast. Niestandardowe separatory i naglowki.' },
  sv: { title: 'CSV till JSON Konverterare Online Gratis', description: 'Konvertera CSV till JSON direkt. Anpassade avgransare och rubriker.' },
  no: { title: 'CSV til JSON Konverterer Online Gratis', description: 'Konverter CSV til JSON umiddelbart. Egendefinerte skilletegn og overskrifter.' },
  zh: { title: 'CSV 转 JSON 在线转换器 - 免费 CSV 转 JSON 工具', description: '免费在线 CSV 转 JSON 转换工具。支持自定义分隔符、标题行和大文件。' },
  ja: { title: 'CSV to JSON オンライン変換ツール', description: '無料 CSV to JSON 変換ツール。カスタム区切り文字とヘッダーに対応。' },
  ko: { title: 'CSV to JSON 온라인 변환기', description: '무료 CSV to JSON 변환기. 사용자 정의 구분자와 헤더 지원.' },
  id: { title: 'Konverter CSV ke JSON Online Gratis', description: 'Konversi CSV ke JSON secara instan. Delimiter kustom dan header.' },
  th: { title: 'ตัวแปลง CSV เป็น JSON ออนไลน์ฟรี', description: 'แปลง CSV เป็น JSON ทันที รองรับตัวคั่นที่กำหนดเองและส่วนหัว' },
};
const slug = 'csv-to-json-online';
export async function generateStaticParams() { return i18n.locales.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params; const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en; const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return { title: t.title, description: t.description, keywords: ['csv to json', 'csv to json online', 'csv converter', 'convert csv to json', 'csv json online', 'csv parser'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } } };
}
export default async function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
