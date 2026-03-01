import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HEX to RGBA Converter Online - Convert HEX Color to RGBA Free', description: 'Free online HEX to RGBA converter. Convert HEX color codes to RGBA format with alpha transparency support. Instant preview and copy.' },
  fr: { title: 'Convertisseur HEX vers RGBA en Ligne Gratuit', description: 'Convertissez les codes couleur HEX en RGBA avec support de transparence alpha.' },
  de: { title: 'HEX zu RGBA Konverter Online Kostenlos', description: 'Konvertieren Sie HEX-Farbcodes sofort in RGBA-Format mit Alpha-Transparenz.' },
  it: { title: 'Convertitore HEX in RGBA Online Gratis', description: 'Converti codici colore HEX in formato RGBA con supporto trasparenza alpha.' },
  es: { title: 'Convertidor HEX a RGBA en Linea Gratis', description: 'Convierte codigos de color HEX a formato RGBA con soporte de transparencia alfa.' },
  pt: { title: 'Conversor HEX para RGBA Online Gratis', description: 'Converta codigos de cor HEX para formato RGBA com suporte a transparencia alfa.' },
  nl: { title: 'HEX naar RGBA Converter Online Gratis', description: 'Converteer HEX-kleurcodes naar RGBA-formaat met alpha-transparantie.' },
  pl: { title: 'Konwerter HEX na RGBA Online Za Darmo', description: 'Konwertuj kody kolorow HEX na format RGBA z obsluga przezroczystosci alfa.' },
  sv: { title: 'HEX till RGBA Konverterare Online Gratis', description: 'Konvertera HEX-fargkoder till RGBA-format med alfa-transparens.' },
  no: { title: 'HEX til RGBA Konverterer Online Gratis', description: 'Konverter HEX-fargekoder til RGBA-format med alfa-gjennomsiktighet.' },
  zh: { title: 'HEX 转 RGBA 转换器 - 免费在线颜色转换工具', description: '免费在线 HEX 转 RGBA 转换工具。将 HEX 颜色代码转换为带 Alpha 透明度的 RGBA 格式。' },
  ja: { title: 'HEX to RGBA 変換ツール - 無料オンラインカラー変換', description: '無料 HEX to RGBA 変換ツール。HEX カラーコードをアルファ透明度付き RGBA 形式に変換。' },
  ko: { title: 'HEX to RGBA 변환기 - 무료 온라인 색상 변환', description: '무료 HEX to RGBA 변환기. HEX 색상 코드를 알파 투명도가 있는 RGBA 형식으로 변환.' },
  id: { title: 'Konverter HEX ke RGBA Online Gratis', description: 'Konversi kode warna HEX ke format RGBA dengan dukungan transparansi alfa.' },
  th: { title: 'ตัวแปลง HEX เป็น RGBA ออนไลน์ฟรี', description: 'แปลงรหัสสี HEX เป็นรูปแบบ RGBA พร้อมรองรับความโปร่งใสอัลฟ่า' },
};
const slug = 'hex-to-rgba';
export async function generateStaticParams() { return i18n.locales.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en; const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return { title: t.title, description: t.description, keywords: ['hex to rgba', 'hex to rgba converter', 'color converter', 'hex color to rgba', 'rgba converter online', 'css color converter'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } } };
}
export default async function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
