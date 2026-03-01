import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HEX to RGB Converter - Convert HEX Colors to RGB Online Free', description: 'Convert HEX color codes to RGB values instantly. Free online HEX to RGB converter with real-time color preview and CSS output.' },
  zh: { title: 'HEX 转 RGB 转换器 - 免费在线十六进制转 RGB 颜色工具', description: '即时将 HEX 颜色代码转换为 RGB 值。免费在线 HEX 转 RGB 工具。' },
  ja: { title: 'HEX to RGB 変換ツール - HEX カラーを RGB に変換', description: 'HEX カラーコードを RGB 値に即座に変換。無料オンラインツール。' },
  ko: { title: 'HEX to RGB 변환기 - HEX 색상을 RGB로 변환', description: 'HEX 색상 코드를 RGB 값으로 즉시 변환하세요.' },
  fr: { title: 'Convertisseur HEX vers RGB - Convertir Couleurs HEX en RGB', description: 'Convertissez les codes couleur HEX en valeurs RGB instantanement.' },
  de: { title: 'HEX zu RGB Konverter - HEX Farben in RGB Umwandeln', description: 'Konvertieren Sie HEX-Farbcodes sofort in RGB-Werte.' },
  es: { title: 'Convertidor HEX a RGB - Convertir Colores HEX a RGB', description: 'Convierte codigos de color HEX a valores RGB al instante.' },
  pt: { title: 'Conversor HEX para RGB - Converter Cores HEX para RGB', description: 'Converta codigos de cor HEX para valores RGB instantaneamente.' },
  it: { title: 'Convertitore HEX in RGB - Converti Colori HEX in RGB', description: 'Converti codici colore HEX in valori RGB istantaneamente.' },
  nl: { title: 'HEX naar RGB Converter - HEX Kleuren naar RGB Converteren', description: 'Converteer HEX-kleurcodes direct naar RGB-waarden.' },
  pl: { title: 'Konwerter HEX do RGB - Konwertuj Kolory HEX na RGB', description: 'Konwertuj kody kolorow HEX na wartosci RGB natychmiast.' },
  sv: { title: 'HEX till RGB Konverterare - Konvertera HEX Farger till RGB', description: 'Konvertera HEX-fargkoder till RGB-varden direkt.' },
  no: { title: 'HEX til RGB Konverter - Konverter HEX Farger til RGB', description: 'Konverter HEX-fargekoder til RGB-verdier umiddelbart.' },
  id: { title: 'Konverter HEX ke RGB - Konversi Warna HEX ke RGB', description: 'Konversi kode warna HEX ke nilai RGB secara instan.' },
  th: { title: 'แปลง HEX เป็น RGB - แปลงสี HEX เป็น RGB ออนไลน์ฟรี', description: 'แปลงรหัสสี HEX เป็นค่า RGB ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/hex-to-rgb-converter`;
  return {
    title: t.title, description: t.description,
    keywords: ['hex to rgb', 'hex to rgb converter', 'color converter', 'hex rgb', 'hex color to rgb'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/hex-to-rgb-converter`])), 'x-default': 'https://viadreams.cc/en/tools/hex-to-rgb-converter' } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
